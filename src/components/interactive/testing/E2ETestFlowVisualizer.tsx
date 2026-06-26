/**
 * E2ETestFlowVisualizer — Playwright E2E 执行流可视化
 *
 * 以登录流程为例演示 Playwright E2E 测试步骤：
 * goto（访问页面）→ fill（填写表单）→ click（点击按钮）
 *              → assert（断言结果）→ wait（等待跳转）
 *
 * 交互：点击"执行 E2E"按钮，步骤依次穿透，断言点高亮。
 *
 * ⚠️ 教学模拟：不实际启动浏览器，仅演示执行流。
 */
import { useState, useEffect, useRef } from 'react'
import type {
  E2ETestFlowVisualizerData,
  E2ETestStep,
  E2EAction,
} from '../../../lib/testing-visualization-types'
import { cn } from '../../../lib/utils'

interface E2ETestFlowVisualizerProps {
  data?: E2ETestFlowVisualizerData
}

/** 默认登录流程步骤 */
const DEFAULT_STEPS: E2ETestStep[] = [
  {
    id: 'goto',
    action: 'goto',
    target: '/login',
    description: '访问登录页面，等待 DOMContentLoaded 事件触发，确保页面可交互。',
    isAssertion: false,
    color: '#1a6cff',
  },
  {
    id: 'fill-username',
    action: 'fill',
    target: 'input[name="username"]',
    value: 'alice@example.com',
    description: '在用户名输入框中填入 alice@example.com，触发 input/change 事件。',
    isAssertion: false,
    color: '#a78bfa',
  },
  {
    id: 'fill-password',
    action: 'fill',
    target: 'input[name="password"]',
    value: '••••••••',
    description: '在密码输入框中填入密码（已脱敏显示），触发 input/change 事件。',
    isAssertion: false,
    color: '#a78bfa',
  },
  {
    id: 'click-submit',
    action: 'click',
    target: 'button[type="submit"]',
    description: '点击提交按钮，触发表单提交，发起 POST /api/login 请求。',
    isAssertion: false,
    color: '#f59e0b',
  },
  {
    id: 'wait-navigation',
    action: 'wait',
    target: '/dashboard',
    description: '等待页面跳转到 /dashboard，确保登录成功并完成路由切换。',
    isAssertion: false,
    color: '#7d8187',
  },
  {
    id: 'assert-url',
    action: 'assert',
    target: 'page.url()',
    value: '/dashboard',
    description: '断言当前 URL 为 /dashboard，验证登录成功并跳转正确。',
    isAssertion: true,
    color: '#07c160',
  },
  {
    id: 'assert-welcome',
    action: 'assert',
    target: 'h1',
    value: '欢迎，Alice',
    description: '断言页面标题包含"欢迎，Alice"，验证用户信息已加载并显示。',
    isAssertion: true,
    color: '#07c160',
  },
]

const ACTION_LABEL: Record<E2EAction, string> = {
  goto: '访问',
  fill: '填写',
  click: '点击',
  assert: '断言',
  wait: '等待',
}

const ACTION_ICON: Record<E2EAction, string> = {
  goto: '🌐',
  fill: '⌨️',
  click: '👆',
  assert: '✓',
  wait: '⏳',
}

export function E2ETestFlowVisualizer({ data }: E2ETestFlowVisualizerProps) {
  const steps = data?.steps ?? DEFAULT_STEPS
  const scenarioNote =
    data?.scenarioNote ??
    '场景：用户登录流程 E2E 测试。Playwright 自动化驱动真实浏览器，模拟用户从访问页面到登录成功的完整路径，并在关键节点设置断言。'

  const [activeIndex, setActiveIndex] = useState<number>(-1) // -1 = 未开始
  const [isRunning, setIsRunning] = useState(false)
  const [completed, setCompleted] = useState<boolean[]>(steps.map(() => false))
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

  const runE2E = () => {
    if (isRunning) return
    setIsRunning(true)
    setActiveIndex(-1)
    setCompleted(steps.map(() => false))
    clearAllTimers()

    steps.forEach((_, i) => {
      const timer = setTimeout(() => {
        setActiveIndex(i)
        setCompleted((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
        if (i === steps.length - 1) {
          setIsRunning(false)
        }
      }, (i + 1) * 1000)
      timersRef.current.push(timer)
    })
  }

  const reset = () => {
    clearAllTimers()
    setActiveIndex(-1)
    setCompleted(steps.map(() => false))
    setIsRunning(false)
  }

  const allDone = completed.every(Boolean) && !isRunning

  return (
    <div className="space-y-lg">
      {/* 场景说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {scenarioNote}
      </p>

      {/* 运行控制 */}
      <div className="flex items-center gap-sm">
        <button
          onClick={runE2E}
          disabled={isRunning}
          className={cn(
            'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
            isRunning
              ? 'cursor-not-allowed border-hairline bg-canvas-soft text-body'
              : 'border-transparent bg-accent-sunset text-white hover:bg-accent-sunset/90',
          )}
        >
          {isRunning ? '▶ E2E 执行中...' : '▶ 执行 E2E'}
        </button>
        <button
          onClick={reset}
          className="rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono-sm text-ink hover:border-ink/30"
        >
          ↺ 重置
        </button>
        {allDone && (
          <span className="rounded-sm bg-accent-sunset/10 px-sm py-xs font-mono text-caption-mono-sm text-accent-sunset">
            ✅ 全部 {steps.length} 步通过
          </span>
        )}
      </div>

      {/* 步骤穿透流 */}
      <div className="space-y-xs">
        {steps.map((step, i) => {
          const isActive = i === activeIndex
          const isDone = completed[i] && i !== activeIndex
          return (
            <div
              key={step.id}
              className={cn(
                'flex items-stretch gap-md rounded-sm border p-md transition-all',
                isActive
                  ? 'border-transparent shadow-md'
                  : isDone
                    ? 'border-hairline bg-canvas-soft'
                    : 'border-hairline bg-canvas opacity-50',
              )}
              style={
                isActive
                  ? {
                      backgroundColor: `${step.color}10`,
                      borderColor: step.color,
                    }
                  : undefined
              }
            >
              {/* 步骤编号 */}
              <div
                className="flex w-xl shrink-0 flex-col items-center justify-center rounded-sm font-mono text-caption-mono-sm font-bold text-white"
                style={{
                  backgroundColor: isActive || isDone ? step.color : '#9ca3af',
                }}
              >
                <span className="text-body-sm">{i + 1}</span>
              </div>

              {/* 动作信息 */}
              <div className="flex-1 space-y-xs">
                <div className="flex flex-wrap items-center gap-xs">
                  <span
                    className="rounded-sm px-xs py-xxs font-mono text-caption-mono-xs text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {ACTION_ICON[step.action]} {ACTION_LABEL[step.action]}
                  </span>
                  {step.isAssertion && (
                    <span className="rounded-sm bg-accent-sunset/10 px-xs py-xxs font-mono text-caption-mono-xs text-accent-sunset">
                      断言点
                    </span>
                  )}
                  <code className="font-mono text-caption-mono-sm text-ink">
                    {step.action}({step.target}
                    {step.value ? `, "${step.value}"` : ''})
                  </code>
                  {isDone && <span className="ml-auto text-accent-sunset">✓</span>}
                  {isActive && (
                    <span
                      className="ml-auto animate-pulse font-mono text-caption-mono-xs"
                      style={{ color: step.color }}
                    >
                      执行中
                    </span>
                  )}
                </div>
                <p className="text-caption text-body">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 步骤间连线说明 */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-md text-caption text-body">
        <strong className="text-ink">执行模式说明：</strong>
        Playwright 默认开启 <code className="font-mono text-ink">auto-wait</code>，在每个动作前自动等待元素可交互（可见、可点击、稳定），无需手动 <code className="font-mono text-ink">waitFor</code>。断言点会自动重试直到超时（默认 5s）。
      </div>

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模拟 · 不实际启动浏览器
      </p>
    </div>
  )
}
