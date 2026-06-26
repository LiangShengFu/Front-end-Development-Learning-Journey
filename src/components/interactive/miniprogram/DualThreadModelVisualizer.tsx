/**
 * DualThreadModelVisualizer — 小程序双线程通信模拟器
 *
 * 可视化微信小程序的双线程架构：JsCore（逻辑层）发起 setData → 经微信原生中转 →
 * WebView（渲染层）接收并重渲染。点击「触发 setData」观察数据包在三层间的传输路径
 * 与通信延迟。
 *
 * ⚠️ 教学模拟：用 React state 模拟跨线程通信，不执行真实 JsCore ↔ WebView 通信。
 */
import { useEffect, useRef, useState } from 'react'
import type { DualThreadModelVisualizerData, DualThreadScenario } from '../../../lib/miniprogram-visualization-types'
import { cn } from '../../../lib/utils'

interface DualThreadModelVisualizerProps {
  data?: DualThreadModelVisualizerData
}

/** 默认双线程通信场景 */
const DEFAULT_SCENARIOS: DualThreadScenario[] = [
  {
    id: 'basic-setData',
    label: '基础 setData',
    description: '点击按钮触发一次 setData，数据从逻辑层同步到渲染层。',
    trigger: "this.setData({ count: this.data.count + 1 })",
    payload: { key: 'count', value: '1' },
    delayMs: 80,
    renderResult: '渲染层 count 文本更新为 1，触发一次重渲染。',
  },
  {
    id: 'event-trigger',
    label: '事件触发 setData',
    description: '用户在 WebView 点击按钮，事件先回传 JsCore，再 setData 回流。',
    trigger: "handleTap() { this.setData({ liked: !this.data.liked }) }",
    payload: { key: 'liked', value: 'true' },
    delayMs: 120,
    renderResult: '渲染层「点赞」按钮高亮，整个过程经历 4 次跨线程通信。',
  },
  {
    id: 'frequent-setData',
    label: '频繁 setData',
    description: '循环或滚动场景高频 setData，跨线程通信成为性能瓶颈。',
    trigger: "onScroll(e) { this.setData({ scrollTop: e.detail.scrollTop }) }",
    payload: { key: 'scrollTop', value: '128' },
    delayMs: 60,
    renderResult: '渲染层每帧重渲染，通信队列堆积，出现卡顿（jank）。',
  },
]

/** 三层节点配置：颜色 / 标签 */
const LAYERS = [
  { id: 'jscore', label: 'JsCore', sub: '逻辑层', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
  { id: 'native', label: '微信原生', sub: '中转层', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
  { id: 'webview', label: 'WebView', sub: '渲染层', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
] as const

/** 数据包动画阶段 */
type Phase = 'idle' | 'to-native' | 'to-webview' | 'done'

export function DualThreadModelVisualizer({ data }: DualThreadModelVisualizerProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? 'basic-setData')
  const [phase, setPhase] = useState<Phase>('idle')
  const [runCount, setRunCount] = useState(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]

  // 清理所有定时器（防内存泄漏）
  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  /** 触发 setData 通信动画 */
  const triggerSetData = () => {
    if (!scenario) return
    clearTimers()
    setPhase('idle')
    // 阶段 1：JsCore → 微信原生
    const t1 = setTimeout(() => setPhase('to-native'), 50)
    // 阶段 2：微信原生 → WebView（按场景延迟）
    const t2 = setTimeout(() => setPhase('to-webview'), 50 + scenario.delayMs)
    // 阶段 3：完成
    const t3 = setTimeout(() => {
      setPhase('done')
      setRunCount((n) => n + 1)
    }, 50 + scenario.delayMs + scenario.delayMs)
    timersRef.current = [t1, t2, t3]
  }

  const handleSwitch = (id: string) => {
    clearTimers()
    setScenarioId(id)
    setPhase('idle')
  }

  /** 当前数据包所在位置（0=JsCore, 1=原生, 2=WebView） */
  const packetPos = phase === 'to-native' ? 1 : phase === 'to-webview' || phase === 'done' ? 2 : 0

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：用 React state 模拟跨线程通信，不执行真实 JsCore ↔ WebView 通信。
      </div>

      {/* 场景选择器 */}
      <div>
        <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          选择通信场景
        </h4>
        <div className="flex flex-wrap gap-sm">
          {scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSwitch(s.id)}
              className={cn(
                'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
                scenarioId === s.id
                  ? 'border-[#07c160] bg-[#07c160]/10 text-[#07c160]'
                  : 'border-hairline text-body-mid hover:border-body-mid',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        {scenario && <p className="mt-sm text-body-sm text-body-mid">{scenario.description}</p>}
      </div>

      {/* 双线程架构图 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <div className="grid grid-cols-3 gap-md">
          {LAYERS.map((layer, i) => {
            const isPacket = packetPos === i && phase !== 'idle'
            return (
              <div
                key={layer.id}
                className="rounded-sm border p-md text-center transition-all"
                style={{
                  borderColor: isPacket ? layer.color : 'rgba(125,125,125,0.2)',
                  background: isPacket ? layer.bg : 'transparent',
                }}
              >
                <div className="font-mono text-body-sm font-bold" style={{ color: layer.color }}>
                  {layer.label}
                </div>
                <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">{layer.sub}</div>
                {/* 数据包指示 */}
                <div className="mt-md flex h-[28px] items-center justify-center">
                  {isPacket ? (
                    <span
                      className="rounded-pill px-sm py-xs font-mono text-caption-mono-sm text-white"
                      style={{ background: layer.color }}
                    >
                      📦 {scenario?.payload.key}
                    </span>
                  ) : (
                    <span className="font-mono text-caption-mono-sm text-body-mid/40">—</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* 流向箭头标注 */}
        <div className="mt-md grid grid-cols-2 gap-md font-mono text-caption-mono-sm text-body-mid">
          <div className="text-center">
            <span style={{ color: LAYERS[0].color }}>JsCore</span>
            <span className="mx-xs">→ setData →</span>
            <span style={{ color: LAYERS[1].color }}>微信原生</span>
            <div className="mt-xs">
              {phase === 'to-native' ? '⏳ 数据传输中…' : '✓ 已序列化'}
            </div>
          </div>
          <div className="text-center">
            <span style={{ color: LAYERS[1].color }}>微信原生</span>
            <span className="mx-xs">→ 注入 →</span>
            <span style={{ color: LAYERS[2].color }}>WebView</span>
            <div className="mt-xs">
              {phase === 'to-webview' ? '⏳ 重渲染中…' : phase === 'done' ? '✓ 已更新' : '等待中'}
            </div>
          </div>
        </div>
      </div>

      {/* 触发控制 + 触发代码 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-md">
          <button
            type="button"
            onClick={triggerSetData}
            disabled={phase !== 'idle' && phase !== 'done'}
            className="w-full rounded-pill border border-[#07c160] bg-[#07c160]/10 px-lg py-md font-mono text-body-sm text-[#07c160] transition-colors hover:bg-[#07c160]/20 disabled:opacity-50"
          >
            {phase === 'idle' || phase === 'done' ? '触发 setData' : '通信中…'}
          </button>
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-caption-mono-sm text-body">
            <div className="flex justify-between">
              <span className="text-body-mid">模拟延迟</span>
              <span className="text-amber-500">{scenario?.delayMs}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-mid">已触发次数</span>
              <span className="text-[#07c160]">{runCount}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            触发代码
          </h4>
          <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink">
            <code>{scenario?.trigger}</code>
          </pre>
        </div>
      </div>

      {/* 渲染结果 */}
      {phase === 'done' && scenario && (
        <div className="rounded-sm border border-[#07c160]/40 bg-[#07c160]/5 p-md">
          <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#07c160]">
            WebView 渲染结果
          </div>
          <p className="mt-xs text-body-sm text-ink">{scenario.renderResult}</p>
          <div className="mt-sm font-mono text-caption-mono-sm text-body-mid">
            payload: <span className="text-[#1a6cff]">{scenario.payload.key}</span> ={' '}
            <span className="text-[#07c160]">{scenario.payload.value}</span>
          </div>
        </div>
      )}
    </div>
  )
}
