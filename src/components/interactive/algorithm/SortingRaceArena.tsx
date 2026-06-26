/**
 * SortingRaceArena - 排序算法竞技场
 *
 * 对同一随机数组，对比四种排序算法的执行过程：
 * - 冒泡排序 O(n²)
 * - 快速排序 O(n log n)
 * - 归并排序 O(n log n)
 * - 计数排序 O(n+k)
 *
 * 采用预计算策略：初始化时录制每个算法的全部步骤，步进回放时仅读取数组。
 * 颜色编码：未排序=蓝 / 比较中=黄 / 交换中=红 / 已排序=绿
 * 统计比较次数、交换次数、时间复杂度。
 */
import { useEffect, useMemo, useState } from 'react'
import type { SortingRaceArenaData, SortAlgorithm } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface SortingRaceArenaProps {
  data?: SortingRaceArenaData
}

// ============================================================================
// 排序步骤录制
// ============================================================================

interface SortStep {
  /** 当前数组快照 */
  array: number[]
  /** 比较中的索引 */
  comparing: number[]
  /** 交换中的索引 */
  swapping: number[]
  /** 已排序的索引 */
  sorted: number[]
}

interface SortResult {
  steps: SortStep[]
  comparisons: number
  swaps: number
}

const ALGO_META: Record<SortAlgorithm, { label: string; complexity: string; space: string; stable: boolean }> = {
  bubble: { label: '冒泡排序', complexity: 'O(n²)', space: 'O(1)', stable: true },
  quick: { label: '快速排序', complexity: 'O(n log n)', space: 'O(log n)', stable: false },
  merge: { label: '归并排序', complexity: 'O(n log n)', space: 'O(n)', stable: true },
  counting: { label: '计数排序', complexity: 'O(n+k)', space: 'O(k)', stable: true },
}

function recordBubble(arr: number[]): SortResult {
  const steps: SortStep[] = []
  const a = [...arr]
  let comparisons = 0
  let swaps = 0
  const n = a.length
  const sorted: number[] = []

  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [] })

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++
      steps.push({ array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted] })
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swaps++
        steps.push({ array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted] })
      }
    }
    sorted.unshift(n - 1 - i)
  }
  sorted.unshift(0)
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted] })
  return { steps, comparisons, swaps }
}

function recordQuick(arr: number[]): SortResult {
  const steps: SortStep[] = []
  const a = [...arr]
  let comparisons = 0
  let swaps = 0
  const sorted: number[] = []

  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [] })

  function partition(low: number, high: number): number {
    const pivot = a[high]
    let i = low - 1
    for (let j = low; j < high; j++) {
      comparisons++
      steps.push({ array: [...a], comparing: [j, high], swapping: [], sorted: [...sorted] })
      if (a[j] < pivot) {
        i++
        ;[a[i], a[j]] = [a[j], a[i]]
        swaps++
        steps.push({ array: [...a], comparing: [], swapping: [i, j], sorted: [...sorted] })
      }
    }
    ;[a[i + 1], a[high]] = [a[high], a[i + 1]]
    swaps++
    steps.push({ array: [...a], comparing: [], swapping: [i + 1, high], sorted: [...sorted] })
    return i + 1
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high)
      sorted.push(pi)
      quickSort(low, pi - 1)
      quickSort(pi + 1, high)
    } else if (low === high) {
      sorted.push(low)
    }
  }

  quickSort(0, a.length - 1)
  sorted.sort((x, y) => x - y)
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, i) => i) })
  return { steps, comparisons, swaps }
}

function recordMerge(arr: number[]): SortResult {
  const steps: SortStep[] = []
  const a = [...arr]
  let comparisons = 0
  let swaps = 0

  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [] })

  function merge(low: number, mid: number, high: number) {
    const left = a.slice(low, mid + 1)
    const right = a.slice(mid + 1, high + 1)
    let i = 0, j = 0, k = low
    while (i < left.length && j < right.length) {
      comparisons++
      steps.push({ array: [...a], comparing: [low + i, mid + 1 + j], swapping: [], sorted: [] })
      if (left[i] <= right[j]) {
        a[k] = left[i]
        i++
      } else {
        a[k] = right[j]
        j++
        swaps++
      }
      steps.push({ array: [...a], comparing: [], swapping: [k], sorted: [] })
      k++
    }
    while (i < left.length) { a[k] = left[i]; i++; k++; swaps++; steps.push({ array: [...a], comparing: [], swapping: [k - 1], sorted: [] }) }
    while (j < right.length) { a[k] = right[j]; j++; k++; swaps++; steps.push({ array: [...a], comparing: [], swapping: [k - 1], sorted: [] }) }
  }

  function mergeSort(low: number, high: number) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2)
      mergeSort(low, mid)
      mergeSort(mid + 1, high)
      merge(low, mid, high)
    }
  }

  mergeSort(0, a.length - 1)
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, i) => i) })
  return { steps, comparisons, swaps }
}

function recordCounting(arr: number[]): SortResult {
  const steps: SortStep[] = []
  const a = [...arr]
  let comparisons = 0
  const swaps = 0
  const max = Math.max(...a)
  const count = new Array(max + 1).fill(0)

  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [] })

  for (const v of a) {
    count[v]++
    comparisons++
    steps.push({ array: [...a], comparing: [a.indexOf(v)], swapping: [], sorted: [] })
  }

  let idx = 0
  const sortedIdx: number[] = []
  for (let v = 0; v <= max; v++) {
    while (count[v] > 0) {
      a[idx] = v
      sortedIdx.push(idx)
      steps.push({ array: [...a], comparing: [], swapping: [idx], sorted: [...sortedIdx] })
      count[v]--
      idx++
    }
  }
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, i) => i) })
  return { steps, comparisons, swaps }
}

const RECORDERS: Record<SortAlgorithm, (arr: number[]) => SortResult> = {
  bubble: recordBubble,
  quick: recordQuick,
  merge: recordMerge,
  counting: recordCounting,
}

// ============================================================================
// 组件
// ============================================================================

export function SortingRaceArena({ data }: SortingRaceArenaProps) {
  const arraySize = data?.arraySize ?? 24
  const algorithms = useMemo<SortAlgorithm[]>(() => data?.algorithms ?? ['bubble', 'quick', 'merge', 'counting'], [data?.algorithms])

  const [baseArray, setBaseArray] = useState<number[]>(() => generateArray(arraySize))
  const [stepIdx, setStepIdx] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [speed, setSpeed] = useState(200)
  const [finished, setFinished] = useState(false)

  // 预录制所有算法
  const results = useMemo(() => {
    const map = {} as Record<SortAlgorithm, SortResult>
    for (const algo of algorithms) {
      map[algo] = RECORDERS[algo]([...baseArray])
    }
    return map
  }, [baseArray, algorithms])

  const maxSteps = Math.max(...algorithms.map((a) => results[a].steps.length))

  const regenerate = () => {
    setBaseArray(generateArray(arraySize))
    setStepIdx(0)
    setAutoPlay(false)
    setFinished(false)
  }

  // 自动播放
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      if (stepIdx >= maxSteps - 1) {
        setAutoPlay(false)
        setFinished(true)
      } else {
        setStepIdx((i) => i + 1)
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [autoPlay, stepIdx, speed, maxSteps])

  // 找最快的算法（最少比较次数）
  const fastest = algorithms.reduce((min, a) =>
    results[a].comparisons < results[min].comparisons ? a : min, algorithms[0])

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 控制栏 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={regenerate} className="btn-pill">
          🎲 重新生成数组
        </button>
        <button type="button" onClick={() => { setStepIdx(0); setAutoPlay(false); setFinished(false) }} className="btn-pill text-body-mid">
          ⏹ 重置
        </button>
        <button
          type="button"
          onClick={() => { if (stepIdx >= maxSteps - 1) setStepIdx(0); setAutoPlay((v) => !v); setFinished(false) }}
          className="btn-pill"
        >
          {autoPlay ? '⏸ 暂停' : '⏯ 播放'}
        </button>
        <button type="button" onClick={() => setStepIdx((i) => Math.min(maxSteps - 1, i + 5))} className="btn-pill">
          ⏩ +5 步
        </button>
        <label className="ml-sm flex items-center gap-xs font-mono text-caption-mono-sm text-body-mid">
          速度
          <input
            type="range"
            min={50}
            max={800}
            step={50}
            value={850 - speed}
            onChange={(e) => setSpeed(850 - Number(e.target.value))}
            className="w-24 accent-accent-sunset"
          />
        </label>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          步骤 {Math.min(stepIdx + 1, maxSteps)} / {maxSteps}
        </span>
      </div>

      {/* 四栏排序动画 */}
      <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
        {algorithms.map((algo) => {
          const result = results[algo]
          const step = result.steps[Math.min(stepIdx, result.steps.length - 1)]
          const isFastest = finished && algo === fastest
          return (
            <div
              key={algo}
              className={cn(
                'rounded-sm border bg-canvas-soft p-md transition-colors',
                isFastest ? 'border-accent-sunset/60' : 'border-hairline',
              )}
            >
              {/* 算法标题 */}
              <div className="mb-sm flex items-center justify-between">
                <div className="flex items-center gap-xs">
                  <span className="text-body-sm text-ink">{ALGO_META[algo].label}</span>
                  {isFastest && <span title="最快">🏆</span>}
                </div>
                <span className="font-mono text-caption-mono-sm text-body-mid">{ALGO_META[algo].complexity}</span>
              </div>

              {/* 柱状图 */}
              <div className="flex h-[140px] items-end gap-[2px]">
                {step.array.map((val, i) => {
                  const isComparing = step.comparing.includes(i)
                  const isSwapping = step.swapping.includes(i)
                  const isSorted = step.sorted.includes(i)
                  const height = (val / Math.max(...baseArray)) * 100
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all duration-100"
                      style={{
                        height: `${height}%`,
                        backgroundColor: isSwapping ? '#f87171' : isComparing ? '#fbbf24' : isSorted ? '#34d399' : '#539df5',
                        opacity: isComparing || isSwapping ? 1 : 0.7,
                      }}
                      title={String(val)}
                    />
                  )
                })}
              </div>

              {/* 统计 */}
              <div className="mt-sm flex gap-lg font-mono text-caption-mono-sm text-body-mid">
                <span>比较: <span className="text-ink">{result.comparisons}</span></span>
                <span>交换: <span className="text-ink">{result.swaps}</span></span>
                <span>空间: <span className="text-ink">{ALGO_META[algo].space}</span></span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 图例 */}
      <div className="mt-lg flex flex-wrap gap-lg font-mono text-caption-mono-sm text-body-mid">
        <span className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-[#539df5]" />未排序</span>
        <span className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-[#fbbf24]" />比较中</span>
        <span className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-[#f87171]" />交换中</span>
        <span className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-[#34d399]" />已排序</span>
      </div>
    </div>
  )
}

function generateArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10)
}
