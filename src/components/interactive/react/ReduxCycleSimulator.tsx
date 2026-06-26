/**
 * ReduxCycleSimulator — Redux 数据流循环演示
 *
 * 可视化 Redux 单向数据流：Action → Dispatch → Reducer → Store → UI。
 * 分步展示每个环节的代码和作用。
 *
 * 对应docx中演示 #17
 */
import { useState } from 'react'
import type { ReduxCycleSimulatorData } from '../../../lib/react-visualization-types'
import { cn } from '../../../lib/utils'

interface ReduxCycleSimulatorProps {
  data?: ReduxCycleSimulatorData
}

const DEFAULT_STEPS = [
  {
    phase: '1. Action',
    title: '触发 Action',
    code: `// 组件中 dispatch action
dispatch({ type: 'counter/increment', payload: 1 })`,
    description: 'Action 是描述"发生了什么"的普通对象。必须包含 type 字段，可附带 payload 数据。',
    color: '#3b82f6',
  },
  {
    phase: '2. Dispatch',
    title: '分发 Action',
    code: `// store.dispatch 将 action 发送给 reducer
store.dispatch(action)`,
    description: 'dispatch 是唯一触发状态变更的方式。所有状态变更都通过 dispatch → reducer 这条管道。',
    color: '#7c3aed',
  },
  {
    phase: '3. Reducer',
    title: '执行 Reducer',
    code: `// reducer 根据 action.type 计算新状态
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'counter/increment':
      return state + action.payload
    default:
      return state
  }
}`,
    description: 'Reducer 是纯函数：(state, action) → newState。必须是纯函数，不修改原 state，返回新对象。',
    color: '#22c55e',
  },
  {
    phase: '4. Store',
    title: '更新 Store',
    code: `// Store 保存新状态
{
  counter: 1,
  user: { name: 'Alice' },
  todos: [...]
}`,
    description: 'Store 是唯一的状态树。所有组件从 store 中读取状态，保证单一数据源。',
    color: '#f97316',
  },
  {
    phase: '5. UI Rerender',
    title: 'UI 重新渲染',
    code: `// 订阅了 counter 的组件自动重渲染
function Counter() {
  const count = useSelector(s => s.counter)
  return <div>{count}</div>  // 1
}`,
    description: 'useSelector 订阅 store 的特定部分。当对应状态变化时，组件自动重渲染。',
    color: '#ec4899',
  },
]

export function ReduxCycleSimulator({ data }: ReduxCycleSimulatorProps) {
  const steps = data?.steps ?? DEFAULT_STEPS
  const [activeStep, setActiveStep] = useState(0)
  const [running, setRunning] = useState(false)

  const handleAutoPlay = () => {
    if (running) return
    setRunning(true)
    setActiveStep(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i >= steps.length) {
        clearInterval(interval)
        setRunning(false)
        return
      }
      setActiveStep(i)
    }, 1200)
  }

  const step = steps[activeStep]

  return (
    <div className="space-y-lg">
      {/* Auto play */}
      <div className="flex items-center gap-sm">
        <button
          type="button"
          onClick={handleAutoPlay}
          disabled={running}
          className={cn(
            'rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
            running
              ? 'border-hairline bg-canvas-soft text-body-mid opacity-50'
              : 'border-accent-sunset bg-accent-sunset text-on-primary hover:bg-accent-sunset/80',
          )}
        >
          ▶ 自动播放完整流程
        </button>
        <span className="font-mono text-caption-mono-sm text-body-mid">
          步骤 {activeStep + 1}/{steps.length}
        </span>
      </div>

      {/* Cycle visualization */}
      <div className="relative flex flex-wrap items-center justify-center gap-lg py-xl">
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveStep(i)}
            className={cn(
              'flex flex-col items-center gap-sm rounded-sm border px-lg py-md text-center transition-all',
              activeStep === i
                ? 'border-white/40 bg-white/10 scale-105'
                : 'border-hairline bg-canvas-card opacity-50 hover:opacity-80',
            )}
            style={activeStep === i ? { borderColor: s.color } : undefined}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-caption-mono-sm text-white"
              style={{ backgroundColor: s.color }}
            >
              {i + 1}
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Active step detail */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-xl">
        <div className="flex items-center gap-md">
          <span
            className="rounded-pill px-md py-xs font-mono text-caption-mono-sm text-white"
            style={{ backgroundColor: step.color }}
          >
            {step.phase}
          </span>
          <span className="text-body-lg text-ink">{step.title}</span>
        </div>

        <p className="mt-lg text-body-md text-body">{step.description}</p>

        <div className="mt-lg overflow-x-auto rounded-sm border border-hairline bg-canvas-card p-lg">
          <code className="font-mono text-body-sm text-accent-sunset leading-relaxed">
            {step.code}
          </code>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((s) => s - 1)}
          className={cn('btn-pill-sm', activeStep === 0 && 'pointer-events-none opacity-30')}
        >
          ← 上一步
        </button>
        <button
          type="button"
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep((s) => s + 1)}
          className={cn('btn-pill-sm', activeStep === steps.length - 1 && 'pointer-events-none opacity-30')}
        >
          下一步 →
        </button>
      </div>
    </div>
  )
}
