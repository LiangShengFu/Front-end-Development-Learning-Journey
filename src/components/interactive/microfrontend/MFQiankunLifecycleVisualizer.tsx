/**
 * MFQiankunLifecycleVisualizer — qiankun 生命周期可视化
 *
 * 展示 qiankun 子应用的四个生命周期阶段：
 * - bootstrap：子应用首次加载时执行一次（初始化）
 * - mount：每次从其他应用切换进来时执行（挂载 DOM）
 * - unmount：每次切走时执行（卸载 DOM、清理副作用）
 * - update：父应用通过 props 传递更新时执行（可选）
 *
 * 交互：点击"执行生命周期"按钮，阶段依次穿透动画。
 *
 * ⚠️ 教学模拟：不实际加载子应用。
 */
'use client'

import { useState, useEffect, useRef } from 'react'
import type {
  MFQiankunLifecycleData,
  MFLifecycleStage,
} from '../../../lib/microfrontend-visualization-types'
import { cn } from '../../../lib/utils'

interface MFQiankunLifecycleVisualizerProps {
  data?: MFQiankunLifecycleData
}

/** 默认四阶段数据 */
const DEFAULT_STAGES: MFLifecycleStage[] = [
  {
    id: 'bootstrap',
    name: 'bootstrap',
    trigger: '子应用首次加载',
    description:
      '子应用首次加载时执行一次。用于全局级别的初始化（如加载公共资源、注册全局变量、初始化 SDK）。多次切换不会重复执行。',
    codeSnippet: `export async function bootstrap(props) {
  console.log('[子应用] bootstrap', props)
  // 全局初始化：仅执行一次
  // 如：加载公共样式、注册全局 API、初始化监控
}`,
    frequency: 'once',
    color: '#1a6cff',
  },
  {
    id: 'mount',
    name: 'mount',
    trigger: '每次切换进入子应用',
    description:
      '每次从其他应用切换进来时执行。用于挂载 DOM、启动应用、恢复状态。可接收 props 用于主子通信。',
    codeSnippet: `export async function mount(props) {
  console.log('[子应用] mount', props)
  // 1. 创建 DOM 容器并挂载应用
  const container = props.container
  ReactDOM.render(<App />, container)
  // 2. 订阅主应用数据
  props.onGlobalStateChange((state, prev) => {
    console.log('收到主应用状态:', state)
  })
  // 3. 上报子应用状态
  props.setGlobalState({ subAppReady: true })
}`,
    frequency: 'every',
    color: '#07c160',
  },
  {
    id: 'unmount',
    name: 'unmount',
    trigger: '每次切走子应用',
    description:
      '每次切走时执行。用于卸载 DOM、清理事件监听、销毁实例、清除定时器。必须彻底清理，避免内存泄漏与全局污染。',
    codeSnippet: `export async function unmount(props) {
  console.log('[子应用] unmount', props)
  // 1. 卸载应用
  const { container } = props
  ReactDOM.unmountComponentAtNode(container)
  // 2. 清理事件监听
  window.removeEventListener('resize', handleResize)
  // 3. 清除定时器
  clearInterval(timerId)
  // 4. 清理全局变量
  delete window.__SUB_APP_DATA__
}`,
    frequency: 'every',
    color: '#f59e0b',
  },
  {
    id: 'update',
    name: 'update',
    trigger: '父应用 props 更新',
    description:
      '父应用通过 setGlobalState 或 props 更新时触发（可选）。用于响应主应用数据变化，无需重新挂载。',
    codeSnippet: `export async function update(props) {
  console.log('[子应用] update', props)
  // 接收主应用传递的更新
  // 如：主题切换、语言切换、用户信息变更
  const { theme, lang, user } = props
  applyTheme(theme)
  applyLang(lang)
}`,
    frequency: 'every',
    color: '#a78bfa',
  },
]

const FREQUENCY_LABEL: Record<'once' | 'every', string> = {
  once: '仅执行一次',
  every: '每次切换执行',
}

const FREQUENCY_ICON: Record<'once' | 'every', string> = {
  once: '①',
  every: '↻',
}

export function MFQiankunLifecycleVisualizer({ data }: MFQiankunLifecycleVisualizerProps) {
  const stages = data?.stages ?? DEFAULT_STAGES
  const communicationNote =
    data?.communicationNote ??
    '通信机制：qiankun 提供 initGlobalState API，主子应用通过 onGlobalStateChange / setGlobalState 双向通信。也可通过 mount 的 props 直接传递数据，或使用 CustomEvent 跨应用事件。'

  const [activeIndex, setActiveIndex] = useState<number>(-1) // -1 = 未开始
  const [isRunning, setIsRunning] = useState(false)
  const [completed, setCompleted] = useState<boolean[]>(stages.map(() => false))
  // 使用数组保存所有定时器 ID，避免 forEach 覆盖导致早期定时器泄漏
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
  }

  // 卸载时清理全部定时器，防止状态更新到已卸载组件
  useEffect(() => {
    return () => clearAllTimers()
  }, [])

  const runLifecycle = () => {
    if (isRunning) return
    setIsRunning(true)
    setActiveIndex(-1)
    setCompleted(stages.map(() => false))
    clearAllTimers()

    stages.forEach((_, i) => {
      const timer = setTimeout(() => {
        setActiveIndex(i)
        setCompleted((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
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
    setCompleted(stages.map(() => false))
    setIsRunning(false)
  }

  const allDone = completed.every(Boolean) && !isRunning

  // 安全回退：若 activeIndex 越界，回退到 -1
  const activeStage = activeIndex >= 0 && activeIndex < stages.length ? stages[activeIndex] : null

  return (
    <div className="space-y-lg">
      {/* 通信机制说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {communicationNote}
      </p>

      {/* 运行控制 */}
      <div className="flex flex-wrap items-center gap-sm">
        <button
          onClick={runLifecycle}
          disabled={isRunning}
          className={cn(
            'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
            isRunning
              ? 'cursor-not-allowed border-hairline bg-canvas-soft text-body'
              : 'border-transparent bg-accent-sunset text-white hover:bg-accent-sunset/90',
          )}
        >
          {isRunning ? '▶ 生命周期执行中...' : '▶ 执行生命周期'}
        </button>
        <button
          onClick={reset}
          className="rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono-sm text-ink hover:border-ink/30"
        >
          ↺ 重置
        </button>
        {allDone && (
          <span className="rounded-sm bg-accent-sunset/10 px-sm py-xs font-mono text-caption-mono-sm text-accent-sunset">
            ✅ 生命周期完成
          </span>
        )}
      </div>

      {/* 生命周期阶段流 */}
      <div className="space-y-xs">
        {stages.map((stage, i) => {
          const isActive = i === activeIndex
          const isDone = completed[i] && i !== activeIndex
          return (
            <div
              key={stage.id}
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
                      backgroundColor: `${stage.color}10`,
                      borderColor: stage.color,
                    }
                  : undefined
              }
            >
              {/* 阶段编号 */}
              <div
                className="flex w-xl shrink-0 flex-col items-center justify-center rounded-sm font-mono text-caption-mono-sm font-bold text-white"
                style={{
                  backgroundColor: isActive || isDone ? stage.color : '#9ca3af',
                }}
              >
                <span className="text-body-sm">{i + 1}</span>
              </div>

              {/* 阶段信息 */}
              <div className="flex-1 space-y-xs">
                <div className="flex flex-wrap items-center gap-xs">
                  <span
                    className="rounded-sm px-xs py-xxs font-mono text-caption-mono-xs text-white"
                    style={{ backgroundColor: stage.color }}
                  >
                    {FREQUENCY_ICON[stage.frequency]} {stage.name}()
                  </span>
                  <span className="rounded-sm bg-canvas-soft px-xs py-xxs font-mono text-caption-mono-xs text-body">
                    {FREQUENCY_LABEL[stage.frequency]}
                  </span>
                  <span className="rounded-sm bg-canvas-soft px-xs py-xxs font-mono text-caption-mono-xs text-body">
                    触发：{stage.trigger}
                  </span>
                  {isDone && <span className="ml-auto text-accent-sunset">✓</span>}
                  {isActive && (
                    <span
                      className="ml-auto animate-pulse font-mono text-caption-mono-xs"
                      style={{ color: stage.color }}
                    >
                      执行中
                    </span>
                  )}
                </div>
                <p className="text-caption text-body">{stage.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 当前阶段代码示例 */}
      {activeStage && (
        <div>
          <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
            {activeStage.name}() 代码示例
          </div>
          <pre className="overflow-x-auto rounded-md border border-hairline bg-canvas-soft p-md">
            <code
              className="font-mono text-caption-mono-sm text-ink"
              style={{ color: activeStage.color }}
            >
              {activeStage.codeSnippet}
            </code>
          </pre>
        </div>
      )}

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模拟 · 不实际加载子应用
      </p>
    </div>
  )
}
