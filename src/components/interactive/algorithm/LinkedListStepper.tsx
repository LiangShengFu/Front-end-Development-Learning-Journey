/**
 * LinkedListStepper - 链表操作步进器
 *
 * 可视化两个核心链表操作：
 * - 反转链表（prev/curr/next 三指针移动）
 * - 环形检测（slow/fast 快慢指针赛跑，Floyd 判圈算法）
 *
 * 采用预计算策略：初始化时录制所有步骤，步进播放时仅读取数组。
 * SVG 绘制节点圆圈 + 箭头连线。
 */
import { useEffect, useMemo, useState } from 'react'
import type { LinkedListStepperData } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface LinkedListStepperProps {
  data?: LinkedListStepperData
}

// ============================================================================
// 反转链表步骤预计算
// ============================================================================

interface ReverseStep {
  /** prev 指针位置（-1 表示 null） */
  prev: number
  /** curr 指针位置（-1 表示 null） */
  curr: number
  /** next 指针位置 */
  next: number
  /** 已反转的链接（from→to 表示 curr.next 指向 prev） */
  reversedLinks: Array<{ from: number; to: number }>
  /** 描述 */
  desc: string
}

function recordReverseSteps(values: number[]): ReverseStep[] {
  const steps: ReverseStep[] = []
  let prev = -1
  let curr = 0
  const reversedLinks: Array<{ from: number; to: number }> = []

  steps.push({ prev: -1, curr: 0, next: 1, reversedLinks: [], desc: '初始：prev=null, curr=头节点' })

  while (curr !== -1) {
    const next = curr + 1 < values.length ? curr + 1 : -1
    // curr.next = prev
    reversedLinks.push({ from: curr, to: prev })
    steps.push({
      prev,
      curr,
      next,
      reversedLinks: [...reversedLinks],
      desc: `第 ${curr + 1} 步：保存 next=${next === -1 ? 'null' : values[next]}，反转 curr(${values[curr]}).next → prev=${prev === -1 ? 'null' : values[prev]}`,
    })
    prev = curr
    curr = next
  }

  steps.push({
    prev,
    curr: -1,
    next: -1,
    reversedLinks: [...reversedLinks],
    desc: `完成：新头节点 = ${values[prev]}（原尾节点）`,
  })
  return steps
}

// ============================================================================
// 环形检测步骤预计算（Floyd 判圈）
// ============================================================================

interface CycleStep {
  /** slow 指针位置 */
  slow: number
  /** fast 指针位置 */
  fast: number
  /** 是否相遇 */
  met: boolean
  desc: string
}

function recordCycleSteps(values: number[], cycleAt: number): CycleStep[] {
  const steps: CycleStep[] = []
  let slow = 0
  let fast = 0
  const n = values.length

  // 最后一个节点的 next 指回环入口 cycleAt，形成环
  const getNext = (i: number): number => {
    if (i === n - 1) return cycleAt
    return i + 1
  }

  steps.push({ slow, fast, met: false, desc: '初始：slow=fast=头节点' })

  while (true) {
    slow = getNext(slow)
    fast = getNext(getNext(fast))
    if (slow === fast) {
      steps.push({ slow, fast, met: true, desc: `相遇！slow 和 fast 都在节点 ${values[slow]}（索引 ${slow}）→ 存在环` })
      break
    }
    steps.push({
      slow,
      fast,
      met: false,
      desc: `slow → ${values[slow]}（+1），fast → ${values[fast]}（+2）`,
    })
  }
  return steps
}

// ============================================================================
// 组件
// ============================================================================

export function LinkedListStepper({ data }: LinkedListStepperProps) {
  const reverseList = useMemo(() => data?.reverseList ?? [1, 2, 3, 4, 5], [data?.reverseList])
  const cycleList = useMemo(() => data?.cycleList ?? { values: [1, 2, 3, 4, 5, 6], cycleAt: 2 }, [data?.cycleList])

  const [mode, setMode] = useState<'reverse' | 'cycle'>('reverse')
  const [stepIdx, setStepIdx] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [speed, setSpeed] = useState(800)

  const reverseSteps = useMemo(() => recordReverseSteps(reverseList), [reverseList])
  const cycleSteps = useMemo(() => recordCycleSteps(cycleList.values, cycleList.cycleAt), [cycleList])

  const steps = mode === 'reverse' ? reverseSteps : cycleSteps
  const current = steps[Math.min(stepIdx, steps.length - 1)]

  const switchMode = (m: 'reverse' | 'cycle') => {
    setMode(m)
    setStepIdx(0)
    setAutoPlay(false)
  }

  // 自动播放
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      if (stepIdx >= steps.length - 1) {
        setAutoPlay(false)
      } else {
        setStepIdx((i) => Math.min(i + 1, steps.length - 1))
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [autoPlay, stepIdx, speed, steps.length])

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 模式切换 */}
      <div className="mb-xl flex gap-sm">
        <button
          type="button"
          onClick={() => switchMode('reverse')}
          className={cn('btn-pill', mode === 'reverse' && 'border-accent-sunset/50 text-accent-sunset')}
        >
          反转链表（三指针）
        </button>
        <button
          type="button"
          onClick={() => switchMode('cycle')}
          className={cn('btn-pill', mode === 'cycle' && 'border-accent-sunset/50 text-accent-sunset')}
        >
          环形检测（快慢指针）
        </button>
      </div>

      {/* SVG 链表可视化 */}
      <div className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-lg">
        <svg width="100%" height="180" viewBox="0 0 720 180" className="min-w-[600px]">
          {mode === 'reverse' ? (
            <ReverseSvg values={reverseList} step={current as ReverseStep} />
          ) : (
            <CycleSvg values={cycleList.values} cycleAt={cycleList.cycleAt} step={current as CycleStep} />
          )}
        </svg>
      </div>

      {/* 步骤说明 */}
      <div className="mt-md rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          步骤 {stepIdx + 1} / {steps.length}
        </div>
        <p className="text-body-sm text-ink">{current.desc}</p>
        {mode === 'reverse' && (
          <div className="mt-sm flex flex-wrap gap-md font-mono text-caption-mono-sm">
            <span className="text-red-400">prev: {(current as ReverseStep).prev === -1 ? 'null' : reverseList[(current as ReverseStep).prev]}</span>
            <span className="text-blue-400">curr: {(current as ReverseStep).curr === -1 ? 'null' : reverseList[(current as ReverseStep).curr]}</span>
            <span className="text-green-400">next: {(current as ReverseStep).next === -1 ? 'null' : reverseList[(current as ReverseStep).next]}</span>
          </div>
        )}
        {mode === 'cycle' && (
          <div className="mt-sm flex flex-wrap gap-md font-mono text-caption-mono-sm">
            <span className="text-green-400">🐢 slow: {cycleList.values[(current as CycleStep).slow]}</span>
            <span className="text-orange-400">🐇 fast: {cycleList.values[(current as CycleStep).fast]}</span>
            {(current as CycleStep).met && <span className="text-accent-sunset">⚡ 相遇！</span>}
          </div>
        )}
      </div>

      {/* 控制栏 */}
      <div className="mt-xl flex flex-wrap items-center gap-sm">
        <button
          type="button"
          onClick={() => { setStepIdx(0); setAutoPlay(false) }}
          className="btn-pill text-body-mid"
        >
          ⏹ 重置
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
          disabled={stepIdx === 0}
          className="btn-pill"
        >
          ◀ 上一步
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((i) => Math.min(steps.length - 1, i + 1))}
          disabled={stepIdx >= steps.length - 1}
          className="btn-pill"
        >
          下一步 ▶
        </button>
        <button type="button" onClick={() => setAutoPlay((v) => !v)} className="btn-pill">
          {autoPlay ? '⏸ 暂停' : '⏯ 自动播放'}
        </button>
        <label className="ml-sm flex items-center gap-xs font-mono text-caption-mono-sm text-body-mid">
          速度
          <input
            type="range"
            min={200}
            max={2000}
            step={100}
            value={2200 - speed}
            onChange={(e) => setSpeed(2200 - Number(e.target.value))}
            className="w-24 accent-accent-sunset"
          />
        </label>
      </div>
    </div>
  )
}

/** 反转链表 SVG 渲染 */
function ReverseSvg({ values, step }: { values: number[]; step: ReverseStep }) {
  const nodeW = 70
  const gap = 20
  const startX = 20
  const y = 70

  return (
    <g>
      {values.map((val, i) => {
        const x = startX + i * (nodeW + gap)
        const isCurr = step.curr === i
        const isPrev = step.prev === i
        const isNext = step.next === i
        const isReversed = step.reversedLinks.some((l) => l.from === i)
        return (
          <g key={i}>
            {/* 指针标注 */}
            {isPrev && (
              <text x={x + nodeW / 2} y={y - 35} textAnchor="middle" fill="#f87171" fontSize="12" fontFamily="monospace">prev</text>
            )}
            {isCurr && (
              <text x={x + nodeW / 2} y={y - 50} textAnchor="middle" fill="#539df5" fontSize="12" fontFamily="monospace">curr</text>
            )}
            {isNext && (
              <text x={x + nodeW / 2} y={y - 35} textAnchor="middle" fill="#34d399" fontSize="12" fontFamily="monospace">next</text>
            )}
            {/* 节点矩形 */}
            <rect
              x={x}
              y={y}
              width={nodeW}
              height={40}
              rx={6}
              fill={isCurr ? '#539df520' : isPrev ? '#f8717120' : '#1a1c20'}
              stroke={isCurr ? '#539df5' : isPrev ? '#f87171' : '#363a3f'}
              strokeWidth={isCurr || isPrev ? 2 : 1}
            />
            <text x={x + nodeW / 2} y={y + 25} textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="monospace">{val}</text>
            {/* 箭头：正常方向 → 或反转方向 ← */}
            {i < values.length - 1 && (
              <g>
                {!isReversed ? (
                  <path d={`M ${x + nodeW} ${y + 20} L ${x + nodeW + gap} ${y + 20}`} stroke="#7d8187" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />
                ) : (
                  <path d={`M ${x + nodeW + gap} ${y + 30} L ${x + nodeW} ${y + 30}`} stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-green)" />
                )}
              </g>
            )}
            {/* 反转后指回 prev */}
            {isReversed && step.prev === -1 && (
              <text x={x + nodeW / 2} y={y + 60} textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">→ null</text>
            )}
          </g>
        )
      })}
      {/* null 标注 */}
      {step.curr === -1 && (
        <text x={startX + values.length * (nodeW + gap)} y={y + 25} fill="#7d8187" fontSize="12" fontFamily="monospace">null</text>
      )}
      <defs>
        <marker id="arrow-gray" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#7d8187" />
        </marker>
        <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#34d399" />
        </marker>
      </defs>
    </g>
  )
}

/** 环形检测 SVG 渲染 */
function CycleSvg({ values, cycleAt, step }: { values: number[]; cycleAt: number; step: CycleStep }) {
  const nodeR = 22
  const cx = 360
  const cy = 90
  const radius = 60
  const n = values.length

  // 计算节点位置：环入口之前的节点排成直线，环内节点排成圆形
  const positions = values.map((_, i) => {
    if (i < cycleAt) {
      // 环外：水平排列
      return { x: 40 + i * 55, y: cy }
    }
    // 环内：圆形排列
    const angle = ((i - cycleAt) / (n - cycleAt)) * Math.PI * 2 - Math.PI / 2
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
  })

  return (
    <g>
      {/* 连线 */}
      {values.map((_, i) => {
        const next = i === n - 1 ? cycleAt : i + 1
        const p1 = positions[i]
        const p2 = positions[next]
        return (
          <line
            key={'line-' + i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={i === n - 1 ? '#f87171' : '#363a3f'}
            strokeWidth={i === n - 1 ? 2 : 1.5}
            strokeDasharray={i === n - 1 ? '4 2' : undefined}
          />
        )
      })}
      {/* 节点 */}
      {values.map((val, i) => {
        const pos = positions[i]
        const isSlow = step.slow === i
        const isFast = step.fast === i
        const isBoth = isSlow && isFast
        return (
          <g key={i}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={nodeR}
              fill={isBoth ? '#fbbf2420' : isSlow ? '#34d39920' : isFast ? '#f8717120' : '#1a1c20'}
              stroke={isBoth ? '#fbbf24' : isSlow ? '#34d399' : isFast ? '#f87171' : '#363a3f'}
              strokeWidth={isSlow || isFast ? 2 : 1}
            />
            <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="monospace">{val}</text>
            {/* 图标 */}
            {isSlow && !isBoth && (
              <text x={pos.x - nodeR - 5} y={pos.y + 5} textAnchor="middle" fontSize="16">🐢</text>
            )}
            {isFast && !isBoth && (
              <text x={pos.x + nodeR + 5} y={pos.y + 5} textAnchor="middle" fontSize="16">🐇</text>
            )}
            {isBoth && (
              <text x={pos.x} y={pos.y - nodeR - 8} textAnchor="middle" fontSize="16">⚡</text>
            )}
          </g>
        )
      })}
      {/* 环入口标注 */}
      <text x={positions[cycleAt].x} y={positions[cycleAt].y + nodeR + 15} textAnchor="middle" fill="#f87171" fontSize="10" fontFamily="monospace">环入口</text>
    </g>
  )
}
