/**
 * PromiseFlowDemo - Promise 执行流程
 *
 * 模拟 Promise 状态流转（Pending → Resolved/Rejected）与链式调用，
 * 步进执行展示 then/catch/finally 的执行顺序。
 */
import { useEffect, useState } from 'react'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, PillBtn } from './shared'

interface ChainStep {
  label: string
  state: 'pending' | 'resolved' | 'rejected'
  value?: string
}

interface PromiseFlowDemoProps {
  title?: string
}

const SCENARIO = [
  { label: 'new Promise((resolve, reject) => { setTimeout(resolve, 0, 42) })', state: 'pending' as const },
  { label: '→ pending', state: 'pending' as const },
  { label: 'resolve(42)', state: 'resolved' as const, value: '42' },
  { label: '.then(v => v + 1)', state: 'resolved' as const, value: '43' },
  { label: '.then(v => { throw new Error("x") })', state: 'rejected' as const, value: 'Error: x' },
  { label: '.catch(e => "recovered")', state: 'resolved' as const, value: '"recovered"' },
  { label: '.finally(() => console.log("done"))', state: 'resolved' as const, value: '"recovered"' },
]

export function PromiseFlowDemo({ title }: PromiseFlowDemoProps) {
  const [stepIdx, setStepIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [chain, setChain] = useState<ChainStep[]>([])

  const reset = () => {
    setStepIdx(0)
    setChain([])
    setIsPlaying(false)
  }

  const nextStep = () => {
    if (stepIdx >= SCENARIO.length) {
      setIsPlaying(false)
      return
    }
    setChain((prev) => [...prev, SCENARIO[stepIdx]])
    setStepIdx((i) => i + 1)
  }

  useEffect(() => {
    if (!isPlaying) return
    if (stepIdx >= SCENARIO.length) {
      setIsPlaying(false)
      return
    }
    const timer = setTimeout(() => {
      nextStep()
    }, 800)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, stepIdx])

  const isDone = stepIdx >= SCENARIO.length
  const currentState = chain.length > 0 ? chain[chain.length - 1].state : 'pending'

  return (
    <DemoCard title={title}>
      <ControlRow>
        <GroupLabel>步骤 {stepIdx}/{SCENARIO.length}</GroupLabel>
        <PillBtn active={isPlaying} onClick={() => !isDone && setIsPlaying(!isPlaying)}>
          {isPlaying ? '⏸ 暂停' : '▶ 播放'}
        </PillBtn>
        <PillBtn onClick={nextStep}>⏭ 单步</PillBtn>
        <PillBtn onClick={reset}>↺ 重置</PillBtn>
      </ControlRow>

      <div className="p-md">
        {/* 状态节点 */}
        <div className="mb-md flex items-center justify-center gap-sm">
          <StateNode label="Pending" active={currentState === 'pending'} variant="start" />
          <span className="text-body-mid">→</span>
          <StateNode label="Resolved" active={currentState === 'resolved'} variant="success" />
          <span className="text-body-mid">|</span>
          <StateNode label="Rejected" active={currentState === 'rejected'} variant="error" />
        </div>

        {/* 链式调用 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
          <div className="mb-1 text-[0.62rem] uppercase text-body-mid">执行链</div>
          {chain.length === 0 ? (
            <div className="font-mono text-caption-mono-sm text-body-mid">// 点击播放开始</div>
          ) : (
            <div className="flex flex-col gap-px font-mono text-caption-mono-sm">
              {chain.map((step, i) => (
                <div key={i} className="flex items-center gap-sm py-px">
                  <span
                    className={cn(
                      'rounded-pill px-sm py-px text-[0.62rem] font-bold',
                      step.state === 'resolved' && 'bg-accent-breeze/20 text-accent-breeze',
                      step.state === 'rejected' && 'bg-red-400/20 text-red-400',
                      step.state === 'pending' && 'bg-body-mid/20 text-body-mid',
                    )}
                  >
                    {step.state}
                  </span>
                  <span className="text-body">{step.label}</span>
                  {step.value && (
                    <span className="text-accent-sunset">→ {step.value}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DemoCard>
  )
}

function StateNode({
  label,
  active,
  variant,
}: {
  label: string
  active: boolean
  variant: 'start' | 'success' | 'error'
}) {
  const colorMap = {
    start: 'border-body-mid text-body-mid',
    success: 'border-accent-breeze text-accent-breeze',
    error: 'border-red-400 text-red-400',
  }
  return (
    <div
      className={cn(
        'rounded-pill border-2 px-md py-xs font-mono text-caption-mono-sm font-bold transition-all',
        colorMap[variant],
        active && 'scale-110 bg-canvas-soft',
      )}
    >
      {label}
    </div>
  )
}
