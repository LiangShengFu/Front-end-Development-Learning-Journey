/**
 * EventLoopVisualizer - Event Loop 可视化
 *
 * 步进执行预设步骤，可视化 Call Stack / Microtask Queue / Macrotask Queue
 * 三列与控制台输出。
 */
import { useEffect, useState } from 'react'
import type { EventLoopData, EventLoopStep } from '../../../lib/js-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, PillBtn } from './shared'

interface EventLoopVisualizerProps {
  data: EventLoopData
}

interface State {
  stack: string[]
  micro: string[]
  macro: string[]
  output: string[]
}

const initialState: State = { stack: [], micro: [], macro: [], output: [] }

export function EventLoopVisualizer({ data }: EventLoopVisualizerProps) {
  const [state, setState] = useState<State>(initialState)
  const [stepIdx, setStepIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const reset = () => {
    setState(initialState)
    setStepIdx(0)
    setIsPlaying(false)
  }

  const executeStep = (step: EventLoopStep, prev: State): State => {
    const next: State = { ...prev, stack: [...prev.stack], micro: [...prev.micro], macro: [...prev.macro], output: [...prev.output] }
    switch (step.action) {
      case 'push':
        if (step.target === 'stack') next.stack.push(step.label ?? '')
        else if (step.target === 'micro') next.micro.push(step.label ?? '')
        else if (step.target === 'macro') next.macro.push(step.label ?? '')
        break
      case 'pop':
        if (step.target === 'stack') next.stack.pop()
        else if (step.target === 'micro') next.micro.shift()
        else if (step.target === 'macro') next.macro.shift()
        break
      case 'log':
        next.output.push(step.message ?? '')
        break
      case 'move': {
        const fromArr = step.from === 'micro' ? next.micro : next.macro
        const item = fromArr.shift()
        if (item) next.stack.push(item)
        break
      }
    }
    return next
  }

  const nextStep = () => {
    if (stepIdx >= data.steps.length) {
      setIsPlaying(false)
      return
    }
    setState((prev) => executeStep(data.steps[stepIdx], prev))
    setStepIdx((i) => i + 1)
  }

  // 自动播放
  useEffect(() => {
    if (!isPlaying) return
    if (stepIdx >= data.steps.length) {
      setIsPlaying(false)
      return
    }
    const timer = setTimeout(() => {
      nextStep()
    }, 700)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, stepIdx])

  const isDone = stepIdx >= data.steps.length

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>步骤 {stepIdx}/{data.steps.length}</GroupLabel>
        <PillBtn active={isPlaying} onClick={() => !isDone && setIsPlaying(!isPlaying)}>
          {isPlaying ? '⏸ 暂停' : '▶ 播放'}
        </PillBtn>
        <PillBtn onClick={nextStep}>⏭ 单步</PillBtn>
        <PillBtn onClick={reset}>↺ 重置</PillBtn>
      </ControlRow>

      <div className="grid grid-cols-3 gap-xs p-md">
        <QueueColumn title="Call Stack" items={state.stack} color="accent-sunset" behavior="stack" />
        <QueueColumn title="Microtask Queue" items={state.micro} color="accent-breeze" behavior="queue" />
        <QueueColumn title="Macrotask Queue" items={state.macro} color="orange" behavior="queue" />
      </div>

      {/* 控制台输出 */}
      <div className="border-t border-hairline bg-canvas-soft p-md">
        <div className="mb-1 text-[0.62rem] uppercase text-body-mid">Console Output</div>
        <div className="font-mono text-caption-mono-sm">
          {state.output.length === 0 ? (
            <span className="text-body-mid">// 暂无输出</span>
          ) : (
            state.output.map((line, i) => (
              <div key={i} className="text-accent-breeze">
                <span className="text-body-mid">{'>'} </span>
                {line}
              </div>
            ))
          )}
        </div>
      </div>
    </DemoCard>
  )
}

function QueueColumn({
  title,
  items,
  color,
  behavior,
}: {
  title: string
  items: string[]
  color: 'accent-sunset' | 'accent-breeze' | 'orange'
  behavior: 'stack' | 'queue'
}) {
  const colorMap = {
    'accent-sunset': 'bg-accent-sunset text-black',
    'accent-breeze': 'bg-accent-breeze text-black',
    orange: 'bg-orange-400 text-black',
  }
  return (
    <div className="rounded-xs border border-hairline bg-canvas-mid p-xs">
      <div className="mb-1 text-center text-[0.62rem] uppercase tracking-[1.2px] text-body-mid">
        {title}
        <span className="ml-1 text-body-mid/60">{behavior === 'stack' ? 'LIFO' : 'FIFO'}</span>
      </div>
      <div className="flex min-h-[120px] flex-col items-center justify-end gap-px">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'w-full rounded-px px-sm py-px text-center font-mono text-[0.62rem] font-bold',
              colorMap[color],
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
