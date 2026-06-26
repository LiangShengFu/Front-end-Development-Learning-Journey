/**
 * RerenderTracker — 重渲染追踪器
 *
 * 可视化 React 组件重渲染的原因、优化手段（React.memo、useMemo、useCallback）。
 * 展示在不同优化策略下的重渲染次数对比。
 *
 * 对应docx中演示 #20
 */
import { useState } from 'react'
import type { RerenderTrackerData } from '../../../lib/react-visualization-types'
import { cn } from '../../../lib/utils'

interface RerenderTrackerProps {
  data?: RerenderTrackerData
}

const DEFAULT_SCENARIOS: Record<string, RerenderTrackerData['steps']> = {
  '无优化': [
    { id: '1', component: 'App', action: 'count 状态更新', reRenders: 1, blocked: false, reason: '状态变化触发重渲染' },
    { id: '2', component: 'ChildA', action: '父组件重渲染 → 子组件跟随', reRenders: 1, blocked: false, reason: '默认行为：父组件渲染，所有子组件都渲染' },
    { id: '3', component: 'ChildB', action: '父组件重渲染 → 子组件跟随', reRenders: 1, blocked: false, reason: '即使 props 没变，也会重渲染' },
    { id: '4', component: 'ExpensiveList', action: '父组件重渲染 → 大量子组件', reRenders: 100, blocked: false, reason: '100 个列表项全部重渲染！' },
  ],
  'React.memo': [
    { id: '1', component: 'App', action: 'count 状态更新', reRenders: 1, blocked: false },
    { id: '2', component: 'ChildA', action: 'props 未变化 → 跳过渲染', reRenders: 0, blocked: true, reason: 'React.memo 浅比较 props，未变化则跳过' },
    { id: '3', component: 'ChildB', action: 'props 未变化 → 跳过渲染', reRenders: 0, blocked: true, reason: 'React.memo 阻止了不必要的重渲染' },
    { id: '4', component: 'ExpensiveList', action: '列表数据未变化 → 跳过', reRenders: 0, blocked: true, reason: 'memo 包装后仅当 items 引用变化时才渲染' },
  ],
  'useMemo + useCallback': [
    { id: '1', component: 'App', action: 'count 状态更新', reRenders: 1, blocked: false },
    { id: '2', component: 'ChildA', action: 'useCallback 保持函数引用稳定', reRenders: 0, blocked: true, reason: 'onClick 引用不变 → memo 判定 props 未变' },
    { id: '3', component: 'ChildB', action: 'useMemo 保持对象引用稳定', reRenders: 0, blocked: true, reason: 'config 对象引用不变 → memo 判定未变' },
    { id: '4', component: 'ExpensiveList', action: 'useMemo 缓存计算结果', reRenders: 0, blocked: true, reason: 'filteredItems 仅在 items 变化时重新计算' },
  ],
}

export function RerenderTracker({ data }: RerenderTrackerProps) {
  const [scenario, setScenario] = useState(data?.defaultScenario ?? '无优化')
  const steps = (DEFAULT_SCENARIOS[scenario] ?? data?.steps ?? DEFAULT_SCENARIOS['无优化'])!

  return (
    <div className="space-y-lg">
      {/* Scenario selector */}
      <div className="flex flex-wrap gap-sm">
        {Object.keys(DEFAULT_SCENARIOS).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setScenario(key)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
              scenario === key
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Component tree + re-render visualization */}
      <div className="space-y-sm">
        {steps?.map((step, i) => (
          <div
            key={step.id}
            className={cn(
              'flex items-center gap-lg rounded-sm border p-lg transition-colors',
              step.blocked
                ? 'border-accent-dusk/30 bg-accent-dusk/5'
                : step.reRenders > 10
                  ? 'border-red-500/30 bg-red-500/5'
                  : 'border-hairline bg-canvas-soft',
            )}
            style={{ marginLeft: i > 0 ? `${i * 20}px` : 0 }}
          >
            <div className="flex items-center gap-md">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full font-mono text-caption-mono-sm',
                  step.blocked
                    ? 'bg-accent-dusk/20 text-accent-dusk'
                    : step.reRenders > 10
                      ? 'bg-red-500/20 text-red-500'
                      : 'bg-canvas-mid text-body-mid',
                )}
              >
                {step.blocked ? '✓' : '↻'}
              </span>
              <div>
                <span className="font-mono text-body-sm text-ink">{step.component}</span>
                <p className="text-caption-mono-sm text-body-mid">{step.action}</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-xl">
              <div className="text-right">
                <div className="font-mono text-caption-mono-sm text-body-mid">重渲染</div>
                <div className={cn(
                  'font-mono text-body-lg',
                  step.reRenders === 0 ? 'text-accent-dusk' : step.reRenders > 10 ? 'text-red-500' : 'text-accent-sunset',
                )}>
                  {step.reRenders} 次
                </div>
              </div>
              {step.reason && (
                <div className="max-w-xs text-body-sm text-body-mid">{step.reason}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-lg">
        <div className="flex items-center justify-between">
          <span className="font-mono text-caption-mono-sm text-accent-sunset">总重渲染次数</span>
          <span className="font-mono text-display-xs text-accent-sunset">
            {steps?.reduce((sum, s) => sum + s.reRenders, 0) ?? 0}
          </span>
        </div>
      </div>
    </div>
  )
}
