/**
 * EventLoopVisualizer — Node.js 事件循环六阶段可视化
 *
 * 展示 Node.js 事件循环的六个阶段：
 * timers → pending callbacks → idle/prepare → poll → check → close callbacks
 * 每个阶段处理特定类型的回调，阶段切换之间会清空微任务队列（process.nextTick 优先级最高）。
 *
 * 交互：点击阶段卡片高亮并展示详细回调类型与示例 API；提供自动播放演示阶段流转。
 *
 * ⚠️ 教学模拟：不执行真实 Node.js 进程。
 */
import { useState, useCallback, useEffect } from 'react'
import type {
  EventLoopVisualizerData,
  EventLoopPhase,
} from '../../../lib/nodejs-visualization-types'
import { cn } from '../../../lib/utils'

interface EventLoopVisualizerProps {
  data?: EventLoopVisualizerData
}

/** 默认六阶段数据 */
const DEFAULT_PHASES: EventLoopPhase[] = [
  {
    id: 'timers',
    name: 'timers',
    description: '执行 setTimeout / setInterval 到期的回调。到达时间不等于立即执行——由 poll 阶段实际控制触发时机。',
    callbacks: ['setTimeout 回调', 'setInterval 回调'],
    examples: ['setTimeout(fn, 1000)', 'setInterval(fn, 500)'],
    color: '#1a6cff',
  },
  {
    id: 'pending-callbacks',
    name: 'pending callbacks',
    description: '执行上一轮循环延迟到本轮执行的 I/O 回调。某些系统操作（如 TCP 错误回调）会延迟到此阶段。',
    callbacks: ['延迟的 I/O 错误回调', 'ECONNREFUSED 等网络错误'],
    examples: ['socket.on("error", fn) 的延迟回调'],
    color: '#a78bfa',
  },
  {
    id: 'idle-prepare',
    name: 'idle / prepare',
    description: '内部使用阶段，主要用于 libuv 内部状态准备，仅在内部使用，应用代码通常不在此阶段执行。',
    callbacks: ['libuv 内部管理回调'],
    examples: ['（内部使用，应用层无需关注）'],
    color: '#6b7280',
  },
  {
    id: 'poll',
    name: 'poll',
    description: '核心阶段：获取新的 I/O 事件，执行 I/O 回调。若 poll 队列为空且 timers 阶段无任务，则阻塞等待事件到来。',
    callbacks: ['I/O 完成回调', 'fs.readFile 回调', 'net.Socket data 回调'],
    examples: ['fs.readFile("/path", fn)', 'socket.on("data", fn)'],
    color: '#07c160',
  },
  {
    id: 'check',
    name: 'check',
    description: '执行 setImmediate 回调。setImmediate 在 poll 之后、timers 之前执行，常用于"在 I/O 后立即执行"的场景。',
    callbacks: ['setImmediate 回调'],
    examples: ['setImmediate(fn)'],
    color: '#f59e0b',
  },
  {
    id: 'close-callbacks',
    name: 'close callbacks',
    description: '执行关闭事件的回调。如 socket.on("close", fn) 或 server.close 回调，资源销毁后触发的清理工作。',
    callbacks: ['socket close 回调', 'server close 回调'],
    examples: ['socket.on("close", fn)', 'server.close(fn)'],
    color: '#ec4899',
  },
]

export function EventLoopVisualizer({ data }: EventLoopVisualizerProps) {
  const phases = data?.phases ?? DEFAULT_PHASES
  const microtasksNote =
    data?.microtasksNote ??
    '每个阶段切换之间都会清空微任务队列：process.nextTick 优先级高于 Promise.then。微任务队列会在进入下一阶段前完全清空。'

  const [currentIdx, setCurrentIdx] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const phase = phases[currentIdx]

  /** 自动播放阶段流转 */
  const handleAutoRun = useCallback(() => {
    if (isRunning) return
    setIsRunning(true)
    let idx = currentIdx
    const tick = () => {
      if (idx >= phases.length - 1) {
        // 循环回到第一阶，模拟事件循环的循环特性
        idx = 0
        setCurrentIdx(0)
        setTimeout(tick, 1500)
        return
      }
      idx += 1
      setCurrentIdx(idx)
      setTimeout(tick, 1500)
    }
    setTimeout(tick, 1500)
  }, [isRunning, currentIdx, phases.length])

  const handleStop = useCallback(() => {
    setIsRunning(false)
  }, [])

  useEffect(() => {
    return () => setIsRunning(false)
  }, [])

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示事件循环六阶段流转，不执行真实 Node.js 进程。
      </div>

      {/* 循环可视化：圆形排列六阶段 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="mb-md flex flex-wrap items-center justify-between gap-sm">
          <h4 className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            事件循环流转 · Node.js Event Loop
          </h4>
          <div className="flex gap-xs">
            <button
              onClick={isRunning ? handleStop : handleAutoRun}
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm transition-all',
                isRunning
                  ? 'bg-accent-sunset/15 text-accent-sunset'
                  : 'bg-accent-sunset text-white hover:opacity-90',
              )}
            >
              {isRunning ? '⏸ 暂停' : '▶ 自动播放'}
            </button>
          </div>
        </div>

        {/* 六阶段横向排列 */}
        <div className="flex flex-wrap items-stretch gap-xs">
          {phases.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setCurrentIdx(i)}
              className={cn(
                'flex-1 min-w-[140px] rounded-sm border px-sm py-md text-left transition-all',
                i === currentIdx
                  ? 'border-transparent text-white shadow-md'
                  : 'border-hairline bg-canvas-bg-inset hover:bg-canvas-bg-hover',
              )}
              style={i === currentIdx ? { background: p.color } : undefined}
            >
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] opacity-80">
                阶段 {i + 1}
              </div>
              <div className="mt-xs font-mono text-body-sm font-semibold">
                {p.name}
              </div>
            </button>
          ))}
        </div>

        {/* 阶段流转指示线 */}
        <div className="mt-sm flex items-center justify-center gap-xs font-mono text-caption-mono-sm text-body-mid">
          <span>↻ 循环往复</span>
          <span className="text-hairline">|</span>
          <span>当前：阶段 {currentIdx + 1} / {phases.length}</span>
        </div>
      </div>

      {/* 微任务队列说明 */}
      <div className="rounded-sm border border-[#a78bfa]/30 bg-[#a78bfa]/8 p-md">
        <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#a78bfa]">
          阶段切换之间：清空微任务队列
        </div>
        <p className="mt-xs text-body-sm text-body">{microtasksNote}</p>
        <div className="mt-sm flex flex-wrap gap-xs">
          <span className="rounded-pill bg-[#ec4899]/15 px-sm py-xs font-mono text-caption-mono-sm text-[#ec4899]">
            process.nextTick() · 优先级最高
          </span>
          <span className="rounded-pill bg-[#a78bfa]/15 px-sm py-xs font-mono text-caption-mono-sm text-[#a78bfa]">
            Promise.then() · 微任务
          </span>
        </div>
      </div>

      {/* 当前阶段详情 */}
      <div
        className="rounded-sm border p-md"
        style={{
          borderColor: `${phase.color}55`,
          background: `${phase.color}08`,
        }}
      >
        <div className="flex items-baseline gap-sm">
          <span
            className="rounded-pill px-sm py-xxs font-mono text-caption-mono-sm text-white"
            style={{ background: phase.color }}
          >
            阶段 {currentIdx + 1}
          </span>
          <h4 className="font-mono text-body-lg font-semibold text-ink">
            {phase.name}
          </h4>
        </div>

        <p className="mt-sm text-body-sm text-body">{phase.description}</p>

        <div className="mt-md grid gap-md sm:grid-cols-2">
          {/* 回调类型 */}
          <div>
            <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              处理的回调类型
            </div>
            <ul className="mt-xs space-y-xs">
              {phase.callbacks.map((cb, i) => (
                <li
                  key={i}
                  className="flex items-start gap-xs text-body-sm text-body"
                >
                  <span style={{ color: phase.color }}>▸</span>
                  <span>{cb}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 示例 API */}
          <div>
            <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              示例 API
            </div>
            <div className="mt-xs space-y-xs">
              {phase.examples.map((ex, i) => (
                <code
                  key={i}
                  className="block rounded-sm bg-canvas-bg-inset px-sm py-xs font-mono text-caption-mono-sm text-ink"
                >
                  {ex}
                </code>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
