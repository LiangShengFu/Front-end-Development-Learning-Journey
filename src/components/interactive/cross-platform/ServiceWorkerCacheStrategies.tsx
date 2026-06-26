/**
 * ServiceWorkerCacheStrategies — Service Worker 缓存策略对比
 *
 * 可触发模拟请求，展示 CacheFirst / StaleWhileRevalidate / NetworkOnly 三种策略的
 * 缓存命中、网络请求、响应来源与延迟差异。
 *
 * ⚠️ 教学模拟：用 React state 模拟请求流程，不注册真实 Service Worker。
 */
import { useEffect, useRef, useState } from 'react'
import type {
  ServiceWorkerCacheStrategiesData,
  CacheStrategySpec,
  CacheStrategyId,
} from '../../../lib/cross-platform-visualization-types'
import { cn } from '../../../lib/utils'

interface ServiceWorkerCacheStrategiesProps {
  data?: ServiceWorkerCacheStrategiesData
}

const STRATEGY_THEME: Record<CacheStrategyId, { color: string; bg: string; border: string }> = {
  'cache-first': { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', border: 'rgba(26,108,255,0.35)' },
  'stale-while-revalidate': { color: '#07c160', bg: 'rgba(7,193,96,0.10)', border: 'rgba(7,193,96,0.35)' },
  'network-only': { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.35)' },
}

const STEP_KIND_THEME: Record<string, { color: string; bg: string; icon: string }> = {
  'check-cache': { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', icon: '?' },
  'cache-hit': { color: '#07c160', bg: 'rgba(7,193,96,0.10)', icon: '✓' },
  'cache-miss': { color: '#ef4444', bg: 'rgba(239,68,68,0.10)', icon: '✗' },
  'fetch-network': { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', icon: '→' },
  'store-cache': { color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', icon: '↓' },
  'respond': { color: '#07c160', bg: 'rgba(7,193,96,0.10)', icon: '←' },
  'background-update': { color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', icon: '↻' },
}

const DEFAULT_STRATEGIES: CacheStrategySpec[] = [
  {
    id: 'cache-first',
    label: 'Cache First',
    description: '优先读缓存，缓存未命中才请求网络。适合不常变化的静态资源。',
    code: `// Workbox CacheFirst
new CacheFirst({
  cacheName: 'static-assets',
  plugins: [
    new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 86400 })
  ]
})`,
    steps: [
      { id: '1', label: '检查缓存', description: '在 Cache Storage 中查找匹配请求', kind: 'check-cache' },
      { id: '2', label: '缓存命中', description: '找到缓存响应，直接返回', kind: 'cache-hit' },
      { id: '3', label: '返回缓存', description: '立即返回缓存内容，不请求网络', kind: 'respond' },
    ],
    cacheHit: true,
    responseSource: 'cache',
    latencyMs: 5,
    useCase: '静态资源（CSS/JS/字体/图标）',
    isRecommended: true,
  },
  {
    id: 'stale-while-revalidate',
    label: 'Stale While Revalidate',
    description: '先返回缓存，同时后台更新缓存。兼顾速度与新鲜度。',
    code: `// Workbox StaleWhileRevalidate
new StaleWhileRevalidate({
  cacheName: 'api-cache',
  plugins: [
    new ExpirationPlugin({ maxAgeSeconds: 3600 })
  ]
})`,
    steps: [
      { id: '1', label: '检查缓存', description: '在 Cache Storage 中查找匹配请求', kind: 'check-cache' },
      { id: '2', label: '缓存命中', description: '找到缓存响应', kind: 'cache-hit' },
      { id: '3', label: '返回缓存', description: '立即返回缓存内容（stale）', kind: 'respond' },
      { id: '4', label: '后台更新', description: '同时发起网络请求更新缓存（revalidate）', kind: 'background-update' },
    ],
    cacheHit: true,
    responseSource: 'both',
    latencyMs: 8,
    useCase: 'API 数据（列表/详情，可容忍短暂过期）',
    isRecommended: true,
  },
  {
    id: 'network-only',
    label: 'Network Only',
    description: '始终请求网络，不读缓存。适合实时性要求高的数据。',
    code: `// Workbox NetworkOnly
new NetworkOnly({
  cacheName: 'realtime-api',
  plugins: [
    new NetworkOnly({ networkTimeoutSeconds: 10 })
  ]
})`,
    steps: [
      { id: '1', label: '请求网络', description: '直接发起网络请求，不检查缓存', kind: 'fetch-network' },
      { id: '2', label: '网络响应', description: '等待网络返回响应', kind: 'respond' },
    ],
    cacheHit: false,
    responseSource: 'network',
    latencyMs: 120,
    useCase: '实时数据（股价/消息/支付）',
    isRecommended: false,
  },
]

/** 请求模拟状态 */
type RequestState = 'idle' | 'running' | 'done'

export function ServiceWorkerCacheStrategies({ data }: ServiceWorkerCacheStrategiesProps) {
  const strategies = data?.strategies ?? DEFAULT_STRATEGIES
  const [strategyId, setStrategyId] = useState<CacheStrategyId>('cache-first')
  const [requestState, setRequestState] = useState<RequestState>('idle')
  const [activeStepIndex, setActiveStepIndex] = useState(-1)
  const [requestLog, setRequestLog] = useState<Array<{ strategy: string; source: string; latency: number; ts: number }>>([])
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const strategy = strategies.find((s) => s.id === strategyId) ?? strategies[0]
  const theme = STRATEGY_THEME[strategyId]

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const triggerRequest = () => {
    if (!strategy) return
    clearTimers()
    setRequestState('idle')
    setActiveStepIndex(-1)

    // 按步骤依次高亮
    const stepDelay = Math.max(30, strategy.latencyMs * 8)
    strategy.steps.forEach((_, i) => {
      const t = setTimeout(() => {
        setActiveStepIndex(i)
        setRequestState('running')
      }, 50 + i * stepDelay)
      timersRef.current.push(t)
    })

    // 完成
    const tDone = setTimeout(() => {
      setRequestState('done')
      setRequestLog((prev) => [
        { strategy: strategy.label, source: strategy.responseSource, latency: strategy.latencyMs, ts: Date.now() },
        ...prev.slice(0, 9),
      ])
    }, 50 + strategy.steps.length * stepDelay + 100)
    timersRef.current.push(tDone)
  }

  useEffect(() => () => clearTimers(), [])

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：用 React state 模拟请求流程，不注册真实 Service Worker / Cache Storage。
      </div>

      {/* 策略切换 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-3">
        {strategies.map((s) => {
          const t = STRATEGY_THEME[s.id]
          return (
            <button
              key={s.id}
              onClick={() => {
                setStrategyId(s.id)
                setRequestState('idle')
                setActiveStepIndex(-1)
              }}
              className={cn('rounded-sm border p-md text-left transition-all')}
              style={{
                borderColor: strategyId === s.id ? t.border : 'rgba(125,125,125,0.2)',
                background: strategyId === s.id ? t.bg : 'transparent',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-body-sm font-bold" style={{ color: t.color }}>{s.label}</span>
                {s.isRecommended && (
                  <span className="rounded-pill bg-[#07c160]/15 px-sm py-xs text-caption-mono-sm text-[#07c160]">推荐</span>
                )}
              </div>
              <p className="mt-xs text-caption-mono-sm text-body-mid">{s.description}</p>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1.3fr_1fr]">
        {/* 流程可视化 */}
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-center justify-between">
            <h4 className="font-mono text-body-sm text-body-hi">请求流程</h4>
            <button
              onClick={triggerRequest}
              className="rounded-pill px-md py-xs text-caption-mono-sm text-canvas transition-opacity hover:opacity-80"
              style={{ background: theme.color }}
            >
              触发请求
            </button>
          </div>

          {/* 步骤序列 */}
          <div className="space-y-sm">
            {strategy?.steps.map((step, i) => {
              const stepTheme = STEP_KIND_THEME[step.kind] ?? STEP_KIND_THEME['respond']
              const isActive = i === activeStepIndex && requestState !== 'idle'
              const isPast = i < activeStepIndex
              return (
                <div
                  key={step.id}
                  className={cn(
                    'flex items-start gap-sm rounded-sm border p-sm transition-all',
                    isActive && 'scale-[1.02]'
                  )}
                  style={{
                    borderColor: isActive ? stepTheme.color : 'rgba(125,125,125,0.15)',
                    background: isActive ? stepTheme.bg : isPast ? 'rgba(125,125,125,0.04)' : 'transparent',
                    opacity: requestState === 'idle' ? 0.6 : 1,
                  }}
                >
                  <div
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-caption-mono-sm text-canvas"
                    style={{ background: isActive || isPast ? stepTheme.color : 'rgba(125,125,125,0.3)' }}
                  >
                    {stepTheme.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-caption-mono-sm font-bold" style={{ color: isActive ? stepTheme.color : undefined }}>
                      {step.label}
                    </div>
                    <div className="text-caption-mono-sm text-body-mid">{step.description}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 响应来源 + 延迟 */}
          {requestState === 'done' && (
            <div className="mt-md grid grid-cols-2 gap-sm">
              <div className="rounded-sm bg-canvas-bg-inset p-sm text-center">
                <div className="text-caption-mono-sm text-body-mid">响应来源</div>
                <div className="mt-xs font-mono text-body-sm font-bold" style={{ color: theme.color }}>
                  {strategy.responseSource === 'cache' ? '📦 缓存' : strategy.responseSource === 'network' ? '🌐 网络' : '📦+🌐 缓存+后台'}
                </div>
              </div>
              <div className="rounded-sm bg-canvas-bg-inset p-sm text-center">
                <div className="text-caption-mono-sm text-body-mid">模拟延迟</div>
                <div className="mt-xs font-mono text-body-sm font-bold text-body-hi">{strategy.latencyMs}ms</div>
              </div>
            </div>
          )}
        </div>

        {/* Workbox 代码 + 适用场景 */}
        <div className="space-y-md">
          <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
            <h4 className="mb-xs font-mono text-body-sm text-body-hi">Workbox 代码</h4>
            <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
              {strategy?.code}
            </pre>
          </div>
          <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
            <h4 className="mb-xs font-mono text-body-sm text-body-hi">适用场景</h4>
            <p className="text-caption-mono-sm text-body-mid">{strategy?.useCase}</p>
          </div>
        </div>
      </div>

      {/* 请求日志 */}
      {requestLog.length > 0 && (
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">请求日志（最近 {requestLog.length} 次）</h4>
          <div className="space-y-xs">
            {requestLog.map((log, i) => (
              <div key={i} className="flex items-center gap-md rounded-sm bg-canvas-bg-inset px-sm py-xs font-mono text-caption-mono-sm">
                <span className="text-body-mid">#{requestLog.length - i}</span>
                <span className="text-body-hi">{log.strategy}</span>
                <span className="text-body-mid">→</span>
                <span style={{ color: log.source === 'cache' ? '#1a6cff' : log.source === 'network' ? '#f59e0b' : '#07c160' }}>
                  {log.source === 'cache' ? '📦 缓存' : log.source === 'network' ? '🌐 网络' : '📦+🌐'}
                </span>
                <span className="ml-auto text-body-mid">{log.latency}ms</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
