/**
 * MemoEffectComparator — memo / useMemo / useCallback 效果对比器
 *
 * 四栏对比「无优化」「React.memo」「+ useMemo」「+ useCallback」四种策略下的渲染次数。
 * 每栏包含一个父组件（含 count 和 text 两个 state）+ 子组件，
 * 点击「更新 count」或「更新 text」按钮触发渲染，实时统计每栏的渲染次数和跳过次数。
 *
 * 对应docx中演示 #5
 */
import { useState } from 'react'
import type { MemoEffectComparatorData, MemoStrategy } from '../../../lib/react-advanced-visualization-types'
import { cn } from '../../../lib/utils'

interface MemoEffectComparatorProps {
  data?: MemoEffectComparatorData
}

const DEFAULT_STRATEGIES: MemoStrategy[] = [
  { id: 'none', label: '无优化', useReactMemo: false, useMemo: false, useCallback: false },
  { id: 'memo', label: 'React.memo', useReactMemo: true, useMemo: false, useCallback: false },
  { id: 'memo-usememo', label: '+ useMemo', useReactMemo: true, useMemo: true, useCallback: false },
  { id: 'full', label: '+ useCallback', useReactMemo: true, useMemo: true, useCallback: true },
]

/** 子组件：根据策略决定是否跳过渲染 */
function ChildComponent({
  label,
  strategy,
  config,
  onClick,
  counts,
}: {
  label: string
  strategy: MemoStrategy
  config: { value: string }
  onClick: () => void
  counts: { render: number; skip: number }
}) {
  // 模拟 memo 行为：如果 useReactMemo 且 props 引用未变，则跳过
  // 这里用计数器模拟，实际 memo 由 React 内部处理
  return (
    <div
      className={cn(
        'rounded-sm border p-sm transition-colors',
        counts.render > 0 ? 'border-accent-sunset/30 bg-accent-sunset/5' : 'border-hairline bg-canvas-card',
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-caption-mono-sm text-ink">{label}</span>
        <span className="font-mono text-caption-mono-sm text-body-mid">
          渲染 {counts.render} · 跳过 {counts.skip}
        </span>
      </div>
      <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">
        config.value = {config.value}
      </div>
      <button
        type="button"
        onClick={onClick}
        disabled={!strategy.useCallback}
        className={cn(
          'mt-xs rounded-pill border px-xs py-xxs font-mono text-caption-mono-sm transition-colors',
          strategy.useCallback
            ? 'border-accent-sunset/40 text-accent-sunset hover:bg-accent-sunset/10'
            : 'border-hairline text-body-mid opacity-50',
        )}
      >
        onClick {strategy.useCallback ? '（useCallback 缓存）' : '（每次新引用）'}
      </button>
    </div>
  )
}

export function MemoEffectComparator({ data }: MemoEffectComparatorProps) {
  const strategies = data?.strategies ?? DEFAULT_STRATEGIES

  // 全局触发：更新 count 或 text
  const [count, setCount] = useState(0)
  const [text, setText] = useState('hello')
  const [triggerCount, setTriggerCount] = useState(0)
  // 每栏的渲染统计（用 state 管理，触发更新后重新计算）
  const [stats, setStats] = useState<Record<string, { render: number; skip: number }>>(() =>
    Object.fromEntries(strategies.map((s) => [s.id, { render: 0, skip: 0 }])),
  )

  /** 计算一次触发后各策略的渲染统计增量 */
  function computeStats(
    prev: Record<string, { render: number; skip: number }>,
    changedField: 'count' | 'text',
  ): Record<string, { render: number; skip: number }> {
    const next = { ...prev }
    for (const s of strategies) {
      const stat = { ...next[s.id] }
      if (!s.useReactMemo) {
        // 无 memo：总是渲染
        stat.render++
      } else {
        // 有 memo：检查 props 是否变化
        // 简化模型：如果 useMemo 缓存了 config 且只有 count 变，则跳过
        // 如果 useCallback 缓存了 onClick，则它不触发重渲染
        const configChanged = changedField === 'text' || !s.useMemo
        const handlerChanged = !s.useCallback // 没用 useCallback 则 onClick 每次新引用
        if (configChanged || handlerChanged) {
          stat.render++
        } else {
          stat.skip++
        }
      }
      next[s.id] = stat
    }
    return next
  }

  const updateCount = () => {
    setCount((c) => c + 1)
    setTriggerCount((t) => t + 1)
    setStats((prev) => computeStats(prev, 'count'))
  }

  const updateText = () => {
    setText((t) => t + '!')
    setTriggerCount((t) => t + 1)
    setStats((prev) => computeStats(prev, 'text'))
  }

  const reset = () => {
    setCount(0)
    setText('hello')
    setTriggerCount(0)
    setStats(Object.fromEntries(strategies.map((s) => [s.id, { render: 0, skip: 0 }])))
  }

  // 估算配置对象
  const configs = strategies.map((s) => ({
    value: s.useMemo ? text : `${text} (new ref)`,
  }))

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 全局触发按钮 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={updateCount} className="btn-pill">
          更新 count（{count}）
        </button>
        <button type="button" onClick={updateText} className="btn-pill">
          更新 text（{text}）
        </button>
        <button type="button" onClick={reset} className="btn-pill text-body-mid">
          ⏹ 重置统计
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          已触发 {triggerCount} 次
        </span>
      </div>

      {/* 四栏对比 */}
      <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4">
        {strategies.map((strategy, i) => {
          const stat = stats[strategy.id]
          const intensity = Math.min(stat.render / 10, 1)
          return (
            <div
              key={strategy.id}
              className={cn(
                'rounded-sm border p-lg transition-all',
                stat.render > 0 && stat.skip === 0
                  ? 'border-red-500/30'
                  : stat.skip > 0
                    ? 'border-accent-dusk/30'
                    : 'border-hairline',
              )}
              style={{
                backgroundColor: `rgba(248, 113, 113, ${intensity * 0.1})`,
              }}
            >
              {/* 策略标题 */}
              <div className="mb-md">
                <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
                  {strategy.label}
                </div>
                <div className="mt-xs flex gap-xs">
                  <span className={cn('rounded-pill px-xs py-xxs font-mono text-caption-mono-sm', strategy.useReactMemo ? 'bg-accent-dusk/20 text-accent-dusk' : 'bg-canvas-mid text-body-mid')}>
                    {strategy.useReactMemo ? 'memo ✓' : 'memo ✗'}
                  </span>
                  <span className={cn('rounded-pill px-xs py-xxs font-mono text-caption-mono-sm', strategy.useMemo ? 'bg-accent-dusk/20 text-accent-dusk' : 'bg-canvas-mid text-body-mid')}>
                    {strategy.useMemo ? 'useMemo ✓' : 'useMemo ✗'}
                  </span>
                  <span className={cn('rounded-pill px-xs py-xxs font-mono text-caption-mono-sm', strategy.useCallback ? 'bg-accent-dusk/20 text-accent-dusk' : 'bg-canvas-mid text-body-mid')}>
                    {strategy.useCallback ? 'useCallback ✓' : 'useCallback ✗'}
                  </span>
                </div>
              </div>

              {/* 模拟组件树 */}
              <div className="space-y-sm">
                <div className="rounded-sm border border-hairline bg-canvas-soft px-sm py-xs font-mono text-caption-mono-sm text-ink">
                  {'<Parent count=' + count + ' />'}
                </div>
                <ChildComponent
                  label="<Child config={} />"
                  strategy={strategy}
                  config={configs[i]}
                  onClick={() => {}}
                  counts={stat}
                />
              </div>

              {/* 统计 */}
              <div className="mt-md border-t border-hairline pt-md">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-caption-mono-sm text-body-mid">渲染次数</span>
                  <span className={cn('font-mono text-body-lg', stat.render > 5 ? 'text-red-500' : 'text-accent-sunset')}>
                    {stat.render}
                  </span>
                </div>
                <div className="mt-xs flex items-center justify-between">
                  <span className="font-mono text-caption-mono-sm text-body-mid">跳过次数</span>
                  <span className="font-mono text-body-lg text-accent-dusk">{stat.skip}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 说明 */}
      <div className="mt-xl rounded-sm border border-hairline bg-canvas-soft p-md">
        <p className="text-caption-mono-sm text-body-mid">
          💡 模拟规则：无 memo 时子组件总是重渲染；React.memo + useMemo + useCallback 三者齐备时，
          仅当 text 变化才渲染子组件（count 变化时 config 引用稳定 → 跳过）。
          颜色深浅表示渲染频率（越红=渲染越多）。
        </p>
      </div>
    </div>
  )
}
