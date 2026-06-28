/**
 * HeapVisualizer - 堆（优先队列）可视化
 *
 * 数组 + 完全二叉树双视图，展示 push 上浮 / pop 下沉过程。
 * 支持小顶堆/大顶堆切换，TopK 维护演示。
 */
import { useEffect, useState } from 'react'
import type { HeapVisualizerData } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface HeapVisualizerProps {
  data?: HeapVisualizerData
}

interface HeapStep {
  heap: number[]
  /** 高亮正在比较/交换的索引 */
  highlight: number[]
  /** 操作描述 */
  desc: string
}

const DEFAULT_HEAP = [5, 2, 7, 1, 9, 3]

/** 生成建堆步骤序列（从最后一个非叶节点开始下沉） */
function buildHeapSteps(input: number[], isMin: boolean): HeapStep[] {
  const steps: HeapStep[] = []
  const heap = [...input]
  const n = heap.length
  steps.push({ heap: [...heap], highlight: [], desc: `初始数组：[${heap.join(', ')}]` })

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({ heap: [...heap], highlight: [i], desc: `从节点 ${i}（值=${heap[i]}）开始下沉` })
    siftDownSteps(heap, i, n, isMin, steps)
  }
  steps.push({ heap: [...heap], highlight: [], desc: '建堆完成' })
  return steps
}

/** 下沉操作，记录每一步 */
function siftDownSteps(heap: number[], i: number, n: number, isMin: boolean, steps: HeapStep[]) {
  while (true) {
    const l = 2 * i + 1
    const r = 2 * i + 2
    let target = i
    if (l < n && (isMin ? heap[l] < heap[target] : heap[l] > heap[target])) target = l
    if (r < n && (isMin ? heap[r] < heap[target] : heap[r] > heap[target])) target = r
    if (target === i) {
      steps.push({ heap: [...heap], highlight: [i], desc: `节点 ${i} 已满足堆序，无需下沉` })
      break
    }
    steps.push({
      heap: [...heap],
      highlight: [i, target],
      desc: `交换 ${heap[i]} ↔ ${heap[target]}（下标 ${i} ↔ ${target}）`,
    })
    ;[heap[i], heap[target]] = [heap[target], heap[i]]
    steps.push({ heap: [...heap], highlight: [i, target], desc: `交换完成，继续从 ${target} 下沉` })
    i = target
  }
}

/** 上浮操作，记录每一步 */
function siftUpSteps(heap: number[], i: number, isMin: boolean, steps: HeapStep[]) {
  while (i > 0) {
    const parent = (i - 1) >> 1
    if (isMin ? heap[i] >= heap[parent] : heap[i] <= heap[parent]) {
      steps.push({ heap: [...heap], highlight: [i, parent], desc: `节点 ${i} 已满足堆序，停止上浮` })
      break
    }
    steps.push({
      heap: [...heap],
      highlight: [i, parent],
      desc: `交换 ${heap[i]} ↔ ${heap[parent]}（下标 ${i} ↔ ${parent}）`,
    })
    ;[heap[i], heap[parent]] = [heap[parent], heap[i]]
    steps.push({ heap: [...heap], highlight: [i, parent], desc: `交换完成，继续从 ${parent} 上浮` })
    i = parent
  }
}

/** 生成 push 步骤 */
function pushSteps(input: number[], val: number, isMin: boolean): HeapStep[] {
  const steps: HeapStep[] = []
  const heap = [...input]
  heap.push(val)
  steps.push({ heap: [...heap], highlight: [heap.length - 1], desc: `push(${val})：追加到数组末尾` })
  siftUpSteps(heap, heap.length - 1, isMin, steps)
  steps.push({ heap: [...heap], highlight: [], desc: `push 完成，堆顶 = ${heap[0]}` })
  return steps
}

/** 生成 pop 步骤 */
function popSteps(input: number[], isMin: boolean): HeapStep[] {
  const steps: HeapStep[] = []
  const heap = [...input]
  if (heap.length === 0) {
    steps.push({ heap: [], highlight: [], desc: '堆为空，pop 返回 undefined' })
    return steps
  }
  const top = heap[0]
  const last = heap.pop()!
  steps.push({ heap: [...heap], highlight: [], desc: `pop：取出堆顶 ${top}，弹出末尾 ${last}` })
  if (heap.length > 0) {
    heap[0] = last
    steps.push({ heap: [...heap], highlight: [0], desc: `将末尾 ${last} 移到堆顶，开始下沉` })
    siftDownSteps(heap, 0, heap.length, isMin, steps)
  }
  steps.push({ heap: [...heap], highlight: [], desc: `pop 完成，返回 ${top}` })
  return steps
}

/** 计算树节点的层级与位置 */
function getTreePositions(heap: number[]) {
  const nodes: { val: number; index: number; level: number; x: number }[] = []
  const n = heap.length
  if (n === 0) return { nodes: [], edges: [], maxLevel: 0 }
  const maxLevel = Math.floor(Math.log2(n)) + 1
  for (let i = 0; i < n; i++) {
    const level = Math.floor(Math.log2(i + 1))
    const levelStart = Math.pow(2, level) - 1
    const posInLevel = i - levelStart
    const levelCount = Math.pow(2, level)
    const x = (posInLevel + 0.5) / levelCount
    nodes.push({ val: heap[i], index: i, level, x })
  }
  const edges: { from: number; to: number }[] = []
  for (let i = 1; i < n; i++) {
    edges.push({ from: (i - 1) >> 1, to: i })
  }
  return { nodes, edges, maxLevel }
}

export function HeapVisualizer({ data }: HeapVisualizerProps) {
  const initialHeap = data?.initialHeap ?? DEFAULT_HEAP
  const initialType = data?.heapType ?? 'min-heap'

  const [heap, setHeap] = useState<number[]>([])
  const [steps, setSteps] = useState<HeapStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [heapType, setHeapType] = useState<'min-heap' | 'max-heap'>(initialType)
  const [highlight, setHighlight] = useState<number[]>([])

  /** 初始化：建堆 */
  const initHeap = () => {
    const isMinCurrent = heapType === 'min-heap'
    const s = buildHeapSteps(initialHeap, isMinCurrent)
    setSteps(s)
    setStepIndex(0)
    setAutoPlay(false)
    // 直接跳到建堆完成
    const last = s[s.length - 1]
    setHeap(last.heap)
    setHighlight([])
  }

  useEffect(() => {
    initHeap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 跳转到指定步骤 */
  const goToStep = (idx: number) => {
    if (idx < 0 || idx >= steps.length) return
    setStepIndex(idx)
    setHeap(steps[idx].heap)
    setHighlight(steps[idx].highlight)
  }

  /** push 操作 */
  const handlePush = () => {
    const val = parseInt(inputVal, 10)
    if (isNaN(val)) return
    const s = pushSteps(heap, val, heapType === 'min-heap')
    setSteps(s)
    setStepIndex(0)
    setAutoPlay(true)
    setInputVal('')
  }

  /** pop 操作 */
  const handlePop = () => {
    if (heap.length === 0) return
    const s = popSteps(heap, heapType === 'min-heap')
    setSteps(s)
    setStepIndex(0)
    setAutoPlay(true)
  }

  /** 切换堆类型 */
  const toggleType = () => {
    const newType = heapType === 'min-heap' ? 'max-heap' : 'min-heap'
    setHeapType(newType)
    const s = buildHeapSteps(heap.length > 0 ? heap : initialHeap, newType === 'min-heap')
    setSteps(s)
    setStepIndex(0)
    const last = s[s.length - 1]
    setHeap(last.heap)
    setHighlight([])
  }

  // 自动播放
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      if (stepIndex >= steps.length - 1) {
        setAutoPlay(false)
      } else {
        goToStep(stepIndex + 1)
      }
    }, 700)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, stepIndex])

  const { nodes, edges, maxLevel } = getTreePositions(heap)
  const treeHeight = maxLevel * 60 + 40

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 控制栏 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={() => goToStep(stepIndex - 1)} disabled={stepIndex <= 0} className="btn-pill">
          上一步
        </button>
        <button
          type="button"
          onClick={() => goToStep(stepIndex + 1)}
          disabled={stepIndex >= steps.length - 1}
          className="btn-pill"
        >
          下一步
        </button>
        <button type="button" onClick={() => setAutoPlay((v) => !v)} className="btn-pill">
          {autoPlay ? '暂停' : '自动播放'}
        </button>
        <button type="button" onClick={initHeap} className="btn-pill text-body-mid">
          重建堆
        </button>
        <button type="button" onClick={toggleType} className="btn-pill">
          {heapType === 'min-heap' ? '当前：小顶堆' : '当前：大顶堆'}
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          步骤 {stepIndex} / {Math.max(0, steps.length - 1)}
        </span>
      </div>

      {/* 操作区 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="数值"
          className="w-20 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        <button type="button" onClick={handlePush} className="btn-pill">
          push
        </button>
        <button type="button" onClick={handlePop} className="btn-pill">
          pop
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          peek() = {heap.length > 0 ? heap[0] : 'undefined'} · size = {heap.length}
        </span>
      </div>

      {/* 树视图 */}
      <div className="mb-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          完全二叉树视图
        </div>
        <div className="relative overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md" style={{ minHeight: treeHeight }}>
          <svg width="100%" height={treeHeight} className="block">
            {/* 边 */}
            {edges.map((e, i) => {
              const fromNode = nodes[e.from]
              const toNode = nodes[e.to]
              if (!fromNode || !toNode) return null
              const x1 = fromNode.x * 100
              const y1 = fromNode.level * 60 + 30
              const x2 = toNode.x * 100
              const y2 = toNode.level * 60 + 30
              return (
                <line
                  key={i}
                  x1={`${x1}%`}
                  y1={y1}
                  x2={`${x2}%`}
                  y2={y2}
                  stroke="currentColor"
                  className="text-hairline"
                  strokeWidth={1.5}
                />
              )
            })}
            {/* 节点 */}
            {nodes.map((node) => {
              const x = node.x * 100
              const y = node.level * 60 + 30
              const isHighlight = highlight.includes(node.index)
              return (
                <g key={node.index}>
                  <circle
                    cx={`${x}%`}
                    cy={y}
                    r={18}
                    className={cn(
                      'transition-all duration-300',
                      isHighlight ? 'fill-accent-sunset/20 stroke-accent-sunset' : 'fill-canvas-card stroke-hairline',
                    )}
                    strokeWidth={isHighlight ? 2 : 1}
                  />
                  <text
                    x={`${x}%`}
                    y={y + 5}
                    textAnchor="middle"
                    className="fill-ink font-mono text-caption-mono-sm"
                  >
                    {node.val}
                  </text>
                  <text
                    x={`${x}%`}
                    y={y + 32}
                    textAnchor="middle"
                    className="fill-body-mid font-mono text-caption-mono-sm"
                    style={{ fontSize: '9px' }}
                  >
                    [{node.index}]
                  </text>
                </g>
              )
            })}
          </svg>
          {nodes.length === 0 && (
            <div className="flex h-20 items-center justify-center text-body-sm text-body-mid">堆为空</div>
          )}
        </div>
      </div>

      {/* 数组视图 */}
      <div className="mb-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          数组视图（下标 i → 父 (i-1)/2，左子 2i+1，右子 2i+2）
        </div>
        <div className="flex flex-wrap gap-xs rounded-sm border border-hairline bg-canvas-soft p-md">
          {heap.length === 0 && <span className="text-body-sm text-body-mid">空数组</span>}
          {heap.map((val, idx) => (
            <div
              key={idx}
              className={cn(
                'flex h-12 w-12 flex-col items-center justify-center rounded-sm border transition-all duration-300',
                highlight.includes(idx)
                  ? 'border-accent-sunset bg-accent-sunset/10'
                  : idx === 0
                    ? 'border-accent-breeze/40 bg-accent-breeze/5'
                    : 'border-hairline bg-canvas-card',
              )}
            >
              <span className="font-mono text-body-sm text-ink">{val}</span>
              <span className="font-mono text-caption-mono-sm text-body-mid">{idx}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 当前步骤描述 */}
      {steps[stepIndex] && (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            当前步骤
          </div>
          <div className="font-mono text-caption-mono text-ink">{steps[stepIndex].desc}</div>
        </div>
      )}
    </div>
  )
}
