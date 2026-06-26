/**
 * ComponentTestPlayground — 组件测试 render-act-assert 三阶段
 *
 * 以 Counter 组件为例演示组件测试的标准三阶段：
 * 1. render：渲染组件到 DOM 容器
 * 2. act：触发用户交互（click / type / submit）
 * 3. assert：断言渲染结果与预期一致
 *
 * 交互：点击"运行测试"按钮，三阶段依次推进，展示每阶段代码与结果。
 *
 * ⚠️ 教学模拟：不实际渲染组件，只演示测试流程。
 */
import { useState, useEffect, useRef } from 'react'
import type {
  ComponentTestPlaygroundData,
  ComponentTestStage,
} from '../../../lib/testing-visualization-types'
import { cn } from '../../../lib/utils'

interface ComponentTestPlaygroundProps {
  data?: ComponentTestPlaygroundData
}

/** 默认三阶段数据 */
const DEFAULT_STAGES: ComponentTestStage[] = [
  {
    id: 'render',
    name: 'render 渲染',
    description: '使用 render() 将 Counter 组件挂载到虚拟 DOM 容器，并通过 screen 查询 DOM 节点。',
    codeSnippet: `import { render, screen } from '@testing-library/react'
import Counter from './Counter'

test('Counter 应该正确递增', () => {
  // 1️⃣ render：渲染组件
  render(<Counter initial={0} />)

  // 通过 screen 查询渲染结果
  expect(screen.getByText('Count: 0')).toBeInTheDocument()
})`,
    result: '组件已挂载到虚拟 DOM，screen.getByText("Count: 0") 查询成功。',
    color: '#1a6cff',
  },
  {
    id: 'act',
    name: 'act 触发',
    description: '使用 fireEvent 或 userEvent 触发用户交互（如点击 +1 按钮）。所有状态更新都包裹在 act() 中，确保 React 完成渲染。',
    codeSnippet: `import { fireEvent } from '@testing-library/react'

test('Counter 应该正确递增', () => {
  render(<Counter initial={0} />)

  // 2️⃣ act：触发用户点击
  const button = screen.getByRole('button', { name: /递增/i })
  fireEvent.click(button)  // 内部自动包裹 act()
})`,
    result: 'click 事件已触发，React 已完成重渲染，按钮文本变为 "Count: 1"。',
    color: '#f59e0b',
  },
  {
    id: 'assert',
    name: 'assert 断言',
    description: '使用 expect() 断言渲染结果与预期一致。Testing Library 的断言来自 @testing-library/jest-dom（toBeInTheDocument 等）。',
    codeSnippet: `test('Counter 应该正确递增', () => {
  render(<Counter initial={0} />)
  fireEvent.click(screen.getByRole('button', { name: /递增/i }))

  // 3️⃣ assert：断言最终结果
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
  expect(screen.getByRole('button')).toHaveTextContent('递增')
})`,
    result: '✅ 测试通过！断言 Count: 1 已存在，按钮文本正确。',
    color: '#07c160',
  },
]

const DEFAULT_COMPONENT_CODE = `// 被测组件：Counter.tsx
import { useState } from 'react'

export function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        递增
      </button>
    </div>
  )
}`

const DEFAULT_TEST_CODE = `// 测试文件：Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Counter } from './Counter'

test('Counter 应该正确递增', () => {
  // 1️⃣ render
  render(<Counter initial={0} />)

  // 2️⃣ act
  fireEvent.click(screen.getByRole('button', { name: /递增/i }))

  // 3️⃣ assert
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})`

export function ComponentTestPlayground({ data }: ComponentTestPlaygroundProps) {
  const stages = data?.stages ?? DEFAULT_STAGES
  const componentCode = data?.componentCode ?? DEFAULT_COMPONENT_CODE
  const testCode = data?.testCode ?? DEFAULT_TEST_CODE
  const threePhaseNote =
    data?.threePhaseNote ??
    '组件测试三段式：render（渲染）→ act（触发）→ assert（断言）。每个测试用例都遵循这个流程，act() 确保 React 完成所有状态更新后再断言。'

  const [activeIndex, setActiveIndex] = useState<number>(-1) // -1 = 未开始
  const [isRunning, setIsRunning] = useState(false)
  // 使用数组保存所有定时器 ID，避免 forEach 覆盖导致早期定时器泄漏
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // 清理全部定时器
  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
  }

  // 卸载时清理全部定时器，防止状态更新到已卸载组件
  useEffect(() => {
    return () => clearAllTimers()
  }, [])

  const runTest = () => {
    if (isRunning) return
    setIsRunning(true)
    setActiveIndex(-1)
    clearAllTimers()

    // 依次推进三阶段
    stages.forEach((_, i) => {
      const timer = setTimeout(() => {
        setActiveIndex(i)
        if (i === stages.length - 1) {
          setIsRunning(false)
        }
      }, (i + 1) * 1200)
      timersRef.current.push(timer)
    })
  }

  const reset = () => {
    clearAllTimers()
    setActiveIndex(-1)
    setIsRunning(false)
  }

  return (
    <div className="space-y-lg">
      {/* 三段式说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {threePhaseNote}
      </p>

      {/* 被测组件 + 测试代码 */}
      <div className="grid gap-md md:grid-cols-2">
        <div>
          <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
            被测组件
          </div>
          <pre className="mt-xs overflow-x-auto rounded-sm bg-ink-soft px-md py-md font-mono text-caption-mono-sm text-canvas">
            {componentCode}
          </pre>
        </div>
        <div>
          <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
            完整测试代码
          </div>
          <pre className="mt-xs overflow-x-auto rounded-sm bg-ink-soft px-md py-md font-mono text-caption-mono-sm text-canvas">
            {testCode}
          </pre>
        </div>
      </div>

      {/* 运行控制 */}
      <div className="flex items-center gap-sm">
        <button
          onClick={runTest}
          disabled={isRunning}
          className={cn(
            'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
            isRunning
              ? 'cursor-not-allowed border-hairline bg-canvas-soft text-body'
              : 'border-transparent bg-accent-sunset text-white hover:bg-accent-sunset/90',
          )}
        >
          {isRunning ? '▶ 测试运行中...' : '▶ 运行测试'}
        </button>
        <button
          onClick={reset}
          className="rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono-sm text-ink hover:border-ink/30"
        >
          ↺ 重置
        </button>
      </div>

      {/* 三阶段流程 */}
      <div className="grid gap-md md:grid-cols-3">
        {stages.map((stage, i) => {
          const isActive = i === activeIndex
          const isDone = i < activeIndex
          return (
            <div
              key={stage.id}
              className={cn(
                'rounded-md border-2 p-md transition-all',
                isActive
                  ? 'border-transparent shadow-md'
                  : isDone
                    ? 'border-hairline bg-canvas-soft opacity-80'
                    : 'border-hairline bg-canvas opacity-50',
              )}
              style={
                isActive
                  ? { backgroundColor: `${stage.color}15`, borderColor: stage.color }
                  : undefined
              }
            >
              {/* 阶段编号 + 名称 */}
              <div className="mb-sm flex items-center gap-sm">
                <span
                  className="flex h-md w-md shrink-0 items-center justify-center rounded-full font-mono text-caption-mono-sm font-bold text-white"
                  style={{ backgroundColor: isActive || isDone ? stage.color : '#9ca3af' }}
                >
                  {i + 1}
                </span>
                <h4 className="text-body-sm font-semibold text-ink">{stage.name}</h4>
                {isDone && <span className="ml-auto text-accent-sunset">✓</span>}
                {isActive && (
                  <span
                    className="ml-auto animate-pulse font-mono text-caption-mono-xs"
                    style={{ color: stage.color }}
                  >
                    运行中
                  </span>
                )}
              </div>
              <p className="mb-sm text-caption text-body">{stage.description}</p>
              {/* 代码片段 */}
              <pre className="overflow-x-auto rounded-sm bg-ink-soft px-sm py-sm font-mono text-caption-mono-xs text-canvas">
                {stage.codeSnippet}
              </pre>
              {/* 阶段结果 */}
              {(isActive || isDone) && (
                <div
                  className="mt-sm rounded-sm px-sm py-xs text-caption"
                  style={{ backgroundColor: `${stage.color}10`, color: stage.color }}
                >
                  {stage.result}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模拟 · 不实际执行测试代码
      </p>
    </div>
  )
}
