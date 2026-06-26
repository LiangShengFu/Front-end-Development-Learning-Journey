/**
 * StackQueueVisualizer - 栈与队列可视化
 *
 * 交互式 Push/Pop/Enqueue/Dequeue 操作，展示 LIFO vs FIFO 的行为差异。
 * 使用 useReducer 管理 stack/queue/counter/log 状态，元素退出动画通过 CSS class 实现。
 * 颜色从 8 色循环色板取值，底部日志面板显示当前内容。
 */
import { useEffect, useReducer } from 'react'
import type { StackQueueVisualizerData } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface StackQueueVisualizerProps {
  data?: StackQueueVisualizerData
}

// 8 色循环色板
const COLORS = [
  '#539df5', '#a78bfa', '#34d399', '#fbbf24',
  '#f87171', '#e879f9', '#22d3ee', '#facc15',
]

interface State {
  counter: number
  stack: Array<{ id: number; val: number; color: string; removing?: boolean }>
  queue: Array<{ id: number; val: number; color: string; removing?: boolean }>
  log: string[]
}

type Action =
  | { type: 'push' }
  | { type: 'pop' }
  | { type: 'enqueue' }
  | { type: 'dequeue' }
  | { type: 'remove'; where: 'stack' | 'queue'; id: number }
  | { type: 'reset' }

function colorFor(index: number) {
  return COLORS[index % COLORS.length]
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'push': {
      const id = state.counter
      const val = Math.floor(Math.random() * 90) + 10
      const newEntry = { id, val, color: colorFor(id) }
      return {
        ...state,
        counter: state.counter + 1,
        stack: [...state.stack, newEntry],
        log: [`Push(${val}) → 栈顶`, ...state.log].slice(0, 8),
      }
    }
    case 'pop': {
      if (state.stack.length === 0) {
        return { ...state, log: ['Pop → 栈为空（underflow）', ...state.log].slice(0, 8) }
      }
      const top = state.stack[state.stack.length - 1]
      // 标记移除动画
      const stack = state.stack.map((e) => (e.id === top.id ? { ...e, removing: true } : e))
      return { ...state, stack, log: [`Pop() → ${top.val}（LIFO 栈顶出栈）`, ...state.log].slice(0, 8) }
    }
    case 'enqueue': {
      const id = state.counter
      const val = Math.floor(Math.random() * 90) + 10
      const newEntry = { id, val, color: colorFor(id) }
      return {
        ...state,
        counter: state.counter + 1,
        queue: [...state.queue, newEntry],
        log: [`Enqueue(${val}) → 队尾`, ...state.log].slice(0, 8),
      }
    }
    case 'dequeue': {
      if (state.queue.length === 0) {
        return { ...state, log: ['Dequeue → 队列为空（underflow）', ...state.log].slice(0, 8) }
      }
      const front = state.queue[0]
      const queue = state.queue.map((e) => (e.id === front.id ? { ...e, removing: true } : e))
      return { ...state, queue, log: [`Dequeue() → ${front.val}（FIFO 队首出队）`, ...state.log].slice(0, 8) }
    }
    case 'remove': {
      if (action.where === 'stack') {
        return { ...state, stack: state.stack.filter((e) => e.id !== action.id) }
      }
      return { ...state, queue: state.queue.filter((e) => e.id !== action.id) }
    }
    case 'reset':
      return { counter: 0, stack: [], queue: [], log: ['已重置'] }
    default:
      return state
  }
}

export function StackQueueVisualizer({ data }: StackQueueVisualizerProps) {
  const [state, dispatch] = useReducer(reducer, {
    counter: 0,
    stack: [],
    queue: [],
    log: ['就绪 · 点击操作按钮开始'],
  })

  // 处理退出动画后真正移除元素
  const handleRemove = (where: 'stack' | 'queue', id: number) => {
    dispatch({ type: 'remove', where, id })
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 控制按钮 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        <button type="button" onClick={() => dispatch({ type: 'push' })} className="btn-pill">
          Push（入栈）
        </button>
        <button type="button" onClick={() => dispatch({ type: 'pop' })} className="btn-pill">
          Pop（出栈）
        </button>
        <span className="mx-sm self-center text-body-mid/40">|</span>
        <button type="button" onClick={() => dispatch({ type: 'enqueue' })} className="btn-pill">
          Enqueue（入队）
        </button>
        <button type="button" onClick={() => dispatch({ type: 'dequeue' })} className="btn-pill">
          Dequeue（出队）
        </button>
        <span className="mx-sm self-center text-body-mid/40">|</span>
        <button type="button" onClick={() => dispatch({ type: 'reset' })} className="btn-pill text-body-mid">
          重置
        </button>
      </div>

      <div className="grid grid-cols-1 gap-xl md:grid-cols-2">
        {/* Stack - LIFO 纵向（底部为栈顶） */}
        <div>
          <div className="mb-md flex items-baseline justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              Stack · LIFO
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">size: {state.stack.length}</span>
          </div>
          <div className="flex min-h-[200px] flex-col-reverse gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
            {state.stack.length === 0 && (
              <div className="flex flex-1 items-center justify-center py-xl text-body-sm text-body-mid">
                栈为空
              </div>
            )}
            {state.stack.map((entry) => (
              <StackQueueItem
                key={entry.id}
                entry={entry}
                label="栈顶"
                onRemove={() => handleRemove('stack', entry.id)}
              />
            ))}
          </div>
          <p className="mt-xs text-caption-mono-sm text-body-mid">↑ 栈顶方向（后进先出）</p>
        </div>

        {/* Queue - FIFO 横向（左为队首） */}
        <div>
          <div className="mb-md flex items-baseline justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              Queue · FIFO
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">size: {state.queue.length}</span>
          </div>
          <div className="flex min-h-[200px] flex-wrap items-start gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
            {state.queue.length === 0 && (
              <div className="flex flex-1 items-center justify-center py-xl text-body-sm text-body-mid">
                队列为空
              </div>
            )}
            {state.queue.map((entry, idx) => (
              <StackQueueItem
                key={entry.id}
                entry={entry}
                label={idx === 0 ? '队首' : undefined}
                onRemove={() => handleRemove('queue', entry.id)}
              />
            ))}
          </div>
          <p className="mt-xs text-caption-mono-sm text-body-mid">→ 出队方向（先进先出）</p>
        </div>
      </div>

      {/* 日志面板 */}
      <div className="mt-xl rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          操作日志
        </div>
        <div className="space-y-xs">
          {state.log.map((line, i) => (
            <div key={i} className={cn('font-mono text-caption-mono-sm', i === 0 ? 'text-ink' : 'text-body-mid')}>
              <span className="text-body-mid/60">{String(state.log.length - i).padStart(2, '0')}.</span> {line}
            </div>
          ))}
        </div>
      </div>
      {data && Object.keys(data).length === 0 && null}
    </div>
  )
}

/** 单个栈/队列元素（带退出动画） */
function StackQueueItem({
  entry,
  label,
  onRemove,
}: {
  entry: { id: number; val: number; color: string; removing?: boolean }
  label?: string
  onRemove: () => void
}) {
  // 退出动画：removing 时触发缩放+淡出，280ms 后回调移除
  useEffect(() => {
    if (!entry.removing) return
    const timer = setTimeout(onRemove, 280)
    return () => clearTimeout(timer)
  }, [entry.removing, onRemove])

  return (
    <div
      className={cn(
        'flex items-center gap-sm rounded-sm border px-md py-sm transition-all duration-280',
        entry.removing ? 'scale-75 opacity-0' : 'scale-100 opacity-100',
      )}
      style={{
        borderColor: entry.color + '60',
        backgroundColor: entry.color + '15',
      }}
    >
      <span
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm font-mono text-caption-mono text-on-primary"
        style={{ backgroundColor: entry.color, color: '#0a0a0a' }}
      >
        {entry.val}
      </span>
      {label && (
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {label}
        </span>
      )}
    </div>
  )
}
