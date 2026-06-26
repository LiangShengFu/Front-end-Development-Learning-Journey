/**
 * ResourceHintsVisualizer — Resource Hints 策略时序图可视化
 *
 * 展示 5 种 Resource Hints 策略：
 * - preconnect：提前建立连接（DNS+TCP+TLS）
 * - dns-prefetch：提前 DNS 解析
 * - preload：预加载当前页面关键资源（高优先级）
 * - prefetch：预获取下一页面资源（低优先级）
 * - modulepreload：预加载 ES 模块（含依赖）
 *
 * 交互：点击策略切换，展示触发时机 + 时序图 + 代码示例 + 适用场景。
 *
 * ⚠️ 教学模拟：时序图为示意，实际耗时因网络/资源而异。
 */
import { useState } from 'react'
import type {
  ResourceHintsVisualizerData,
  ResourceHintStrategy,
  ResourceHintId,
} from '../../../lib/performance-security-visualization-types'
import { cn } from '../../../lib/utils'

interface ResourceHintsVisualizerProps {
  data?: ResourceHintsVisualizerData
}

/** 默认 5 种 Resource Hints 策略 */
const DEFAULT_STRATEGIES: ResourceHintStrategy[] = [
  {
    id: 'preconnect',
    name: 'preconnect',
    tag: '<link rel="preconnect">',
    timing: '页面加载早期，提前建立完整连接（DNS + TCP + TLS）',
    scope: '跨域关键域名（如 CDN、API 服务器、字体源）',
    description: '提前与目标域名建立完整连接，省去后续请求的 DNS/TCP/TLS 握手时间。适用于跨域关键资源域名。',
    codeSnippet: '<link rel="preconnect" href="https://cdn.example.com" crossorigin>',
    useCase: '关键跨域域名：CDN、API 服务器、字体源（fonts.googleapis.com）。建议限制在 3-4 个，避免过度占用连接。',
    saving: '节省 100-300ms（DNS + TCP + TLS 握手时间）',
    color: '#1a6cff',
  },
  {
    id: 'dns-prefetch',
    name: 'dns-prefetch',
    tag: '<link rel="dns-prefetch">',
    timing: '页面加载早期，仅提前 DNS 解析',
    scope: '跨域域名（非关键，作为 preconnect 的轻量替代）',
    description: '仅提前解析域名 IP 地址，开销最小。当 preconnect 不可用或不需要完整连接时使用。',
    codeSnippet: '<link rel="dns-prefetch" href="//stats.example.com">',
    useCase: '第三方分析、广告、非关键跨域资源。可大量使用，开销极低，兼容性好（IE9+）。',
    saving: '节省 20-120ms（DNS 解析时间）',
    color: '#a78bfa',
  },
  {
    id: 'preload',
    name: 'preload',
    tag: '<link rel="preload">',
    timing: '当前页面加载早期，高优先级预加载关键资源',
    scope: '当前页面必需的关键资源（字体、CSS、JS、图片）',
    description: '强制浏览器以高优先级预加载当前页面必需的关键资源。必须设置 as 属性指定资源类型。',
    codeSnippet: '<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>',
    useCase: '关键字体、首屏大图、关键 CSS/JS、视频首帧。只用于当前页面一定会用到的资源。',
    saving: '节省关键资源等待时间，避免 FOUT/FOIT',
    color: '#07c160',
  },
  {
    id: 'prefetch',
    name: 'prefetch',
    tag: '<link rel="prefetch">',
    timing: '浏览器空闲时，低优先级预获取下一页面资源',
    scope: '下一页面可能需要的资源（HTML/JS/CSS/图片）',
    description: '在浏览器空闲时以最低优先级预获取下一页面可能需要的资源，缓存到 HTTP 缓存。',
    codeSnippet: '<link rel="prefetch" href="/next-page.html">\n<link rel="prefetch" href="/js/checkout.js">',
    useCase: '用户大概率访问的下一页（如购物车→结算）。利用空闲带宽，不与当前页面争抢资源。',
    saving: '下一页面加载时间减少 50-90%（资源已缓存）',
    color: '#f59e0b',
  },
  {
    id: 'modulepreload',
    name: 'modulepreload',
    tag: '<link rel="modulepreload">',
    timing: '页面加载早期，预加载 ES 模块及其依赖',
    scope: '当前页面必需的 ES 模块（import 依赖）',
    description: '专门用于预加载 ES 模块（<script type="module">），会并行预加载模块的依赖图，并执行模块解析。',
    codeSnippet: '<link rel="modulepreload" href="/js/app.mjs" as="script">',
    useCase: 'ESM 应用首屏关键模块。比 preload 更智能：自动解析模块依赖，提前编译，减少 waterfall。',
    saving: '节省模块解析 + 依赖链 waterfall 时间',
    color: '#ec4899',
  },
]

/** 时序图阶段 */
interface TimelineStage {
  label: string
  width: number
  color: string
}

/** 各策略的时序图阶段（宽度按比例） */
function getTimeline(strategyId: ResourceHintId): TimelineStage[] {
  switch (strategyId) {
    case 'preconnect':
      return [
        { label: 'DNS', width: 15, color: '#1a6cff' },
        { label: 'TCP', width: 20, color: '#07c160' },
        { label: 'TLS', width: 25, color: '#a78bfa' },
        { label: '请求', width: 40, color: '#f59e0b' },
      ]
    case 'dns-prefetch':
      return [
        { label: 'DNS', width: 15, color: '#a78bfa' },
        { label: 'TCP', width: 20, color: '#07c160' },
        { label: 'TLS', width: 25, color: '#1a6cff' },
        { label: '请求', width: 40, color: '#f59e0b' },
      ]
    case 'preload':
      return [{ label: '高优先级预加载', width: 100, color: '#07c160' }]
    case 'prefetch':
      return [{ label: '低优先级预获取', width: 100, color: '#f59e0b' }]
    case 'modulepreload':
      return [
        { label: '加载模块', width: 40, color: '#ec4899' },
        { label: '解析依赖', width: 30, color: '#a78bfa' },
        { label: '编译', width: 30, color: '#1a6cff' },
      ]
  }
}

export function ResourceHintsVisualizer({ data }: ResourceHintsVisualizerProps) {
  const strategies = data?.strategies ?? DEFAULT_STRATEGIES
  const timelineNote =
    data?.timelineNote ??
    'Resource Hints 的核心是「时机 + 作用域」：preconnect/dns-prefetch 提前建立连接，preload/prefetch/modulepreload 控制资源加载优先级。'
  const [selectedId, setSelectedId] = useState<ResourceHintId>('preconnect')
  const selected = strategies.find((s) => s.id === selectedId)
  const timeline = getTimeline(selectedId)

  return (
    <div className="space-y-lg">
      {/* 策略切换按钮 */}
      <div className="flex flex-wrap gap-xs">
        {strategies.map((strategy) => {
          const isActive = selectedId === strategy.id
          return (
            <button
              key={strategy.id}
              onClick={() => setSelectedId(strategy.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: strategy.color } : undefined}
            >
              {strategy.name}
            </button>
          )
        })}
      </div>

      {/* 时序图说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {timelineNote}
      </p>

      {/* 时序图 */}
      {selected && (
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center justify-between">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              加载时序图
            </span>
            <span
              className="rounded-sm px-xs py-xxs font-mono text-caption-mono-xs text-white"
              style={{ backgroundColor: selected.color }}
            >
              {selected.tag}
            </span>
          </div>
          {/* 时序条 */}
          <div className="flex h-xl w-full overflow-hidden rounded-sm">
            {timeline.map((stage, i) => (
              <div
                key={i}
                className="flex items-center justify-center font-mono text-caption-mono-xs text-white"
                style={{ width: `${stage.width}%`, backgroundColor: stage.color }}
              >
                {stage.width >= 15 ? stage.label : ''}
              </div>
            ))}
          </div>
          {/* 时序图例 */}
          <div className="mt-xs flex flex-wrap gap-md">
            {timeline.map((stage, i) => (
              <div key={i} className="flex items-center gap-xs">
                <span
                  className="inline-block h-xxs w-xs rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="font-mono text-caption-mono-xs text-body-mid">{stage.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 选中策略详情 */}
      {selected && (
        <div
          className="rounded-md border-l-4 p-md"
          style={{ borderLeftColor: selected.color, backgroundColor: `${selected.color}10` }}
        >
          {/* 标题行 */}
          <div className="mb-sm flex flex-wrap items-center gap-sm">
            <h4 className="text-heading-4 text-ink">{selected.name}</h4>
            <span
              className="rounded-sm px-xs py-xxs font-mono text-caption-mono-xs text-white"
              style={{ backgroundColor: selected.color }}
            >
              {selected.saving}
            </span>
          </div>

          {/* 描述 */}
          <p className="mb-md text-body-sm text-body">{selected.description}</p>

          {/* 触发时机 + 作用范围 */}
          <div className="mb-md grid grid-cols-1 gap-sm sm:grid-cols-2">
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                触发时机
              </div>
              <p className="mt-xs text-body-sm text-ink">{selected.timing}</p>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                作用范围
              </div>
              <p className="mt-xs text-body-sm text-ink">{selected.scope}</p>
            </div>
          </div>

          {/* 代码示例 */}
          <div className="mb-md">
            <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
              代码示例
            </div>
            <pre className="mt-xs overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-sm text-canvas">
              <code>{selected.codeSnippet}</code>
            </pre>
          </div>

          {/* 适用场景 */}
          <div>
            <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
              适用场景
            </div>
            <p className="mt-xs text-body-sm text-ink">{selected.useCase}</p>
          </div>
        </div>
      )}

      <p className="text-center text-caption-mono-xs text-body-mid">
        ⚠️ 时序图为示意 · 实际耗时因网络/资源而异
      </p>
    </div>
  )
}
