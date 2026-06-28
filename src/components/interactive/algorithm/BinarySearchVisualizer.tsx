/**
 * BinarySearchVisualizer - 二分查找可视化
 *
 * 支持四种变体：经典查找 / 下界 / 上界 / 旋转数组。
 */
import { useEffect, useState } from 'react'
import type { BinarySearchVisualizerData, BinarySearchVariant } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface BinarySearchVisualizerProps {
  data?: BinarySearchVisualizerData
}

interface BSStep {
  /** 当前数组 */
  array: number[]
  /** 左边界 */
  lo: number
  /** 右边界 */
  hi: number
  /** 中点 */
  mid: number
  /** 已排除区间 */
  eliminated: number[]
  /** 命中位置（找到时） */
  found?: number
  /** 当前比较的目标值 */
  target: number
  /** 步骤描述 */
  desc: string
}

const DEFAULT_ARRAY = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
const ROTATED_ARRAY = [13, 15, 17, 19, 1, 3, 5, 7, 9, 11]

/** 经典二分查找 */
function classicSearch(arr: number[], target: number): BSStep[] {
  const steps: BSStep[] = []
  let lo = 0
  let hi = arr.length - 1
  const eliminated: number[] = []

  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    steps.push({
      array: arr,
      lo,
      hi,
      mid,
      eliminated: [...eliminated],
      target,
      desc: `lo=${lo}, hi=${hi}, mid=${mid}，比较 arr[${mid}]=${arr[mid]} 与 target=${target}`,
    })
    if (arr[mid] === target) {
      steps.push({
        array: arr,
        lo,
        hi,
        mid,
        eliminated: [...eliminated],
        target,
        found: mid,
        desc: `命中！arr[${mid}] = ${target}`,
      })
      return steps
    } else if (arr[mid] < target) {
      for (let i = lo; i <= mid; i++) eliminated.push(i)
      steps.push({
        array: arr,
        lo,
        hi,
        mid,
        eliminated: [...eliminated],
        target,
        desc: `arr[${mid}]=${arr[mid]} < ${target}，丢弃左半（lo = mid + 1 = ${mid + 1}）`,
      })
      lo = mid + 1
    } else {
      for (let i = mid; i <= hi; i++) eliminated.push(i)
      steps.push({
        array: arr,
        lo,
        hi,
        mid,
        eliminated: [...eliminated],
        target,
        desc: `arr[${mid}]=${arr[mid]} > ${target}，丢弃右半（hi = mid - 1 = ${mid - 1}）`,
      })
      hi = mid - 1
    }
  }
  steps.push({
    array: arr,
    lo,
    hi,
    mid: -1,
    eliminated: [...eliminated],
    target,
    desc: `lo > hi，未找到 ${target}`,
  })
  return steps
}

/** 下界：第一个 >= target 的位置 */
function lowerBound(arr: number[], target: number): BSStep[] {
  const steps: BSStep[] = []
  let lo = 0
  let hi = arr.length
  const eliminated: number[] = []
  let result = arr.length

  while (lo < hi) {
    const mid = (lo + hi) >> 1
    steps.push({
      array: arr,
      lo,
      hi: hi - 1,
      mid,
      eliminated: [...eliminated],
      target,
      desc: `lo=${lo}, hi=${hi}, mid=${mid}，比较 arr[${mid}]=${arr[mid]} 与 ${target}（寻找第一个 ≥）`,
    })
    if (arr[mid] >= target) {
      result = mid
      for (let i = mid + 1; i < hi; i++) eliminated.push(i)
      steps.push({
        array: arr,
        lo,
        hi: hi - 1,
        mid,
        eliminated: [...eliminated],
        target,
        desc: `arr[${mid}]=${arr[mid]} ≥ ${target}，候选答案=${mid}，继续向左（hi = mid = ${mid}）`,
      })
      hi = mid
    } else {
      for (let i = lo; i <= mid; i++) eliminated.push(i)
      steps.push({
        array: arr,
        lo,
        hi: hi - 1,
        mid,
        eliminated: [...eliminated],
        target,
        desc: `arr[${mid}]=${arr[mid]} < ${target}，丢弃左半（lo = mid + 1 = ${mid + 1}）`,
      })
      lo = mid + 1
    }
  }
  steps.push({
    array: arr,
    lo,
    hi: hi - 1,
    mid: -1,
    eliminated: [...eliminated],
    target,
    found: result < arr.length ? result : undefined,
    desc: `下界 = ${result}${result < arr.length ? `（arr[${result}] = ${arr[result]} ≥ ${target}）` : '（不存在，所有元素 < target）'}`,
  })
  return steps
}

/** 上界：第一个 > target 的位置 */
function upperBound(arr: number[], target: number): BSStep[] {
  const steps: BSStep[] = []
  let lo = 0
  let hi = arr.length
  const eliminated: number[] = []
  let result = arr.length

  while (lo < hi) {
    const mid = (lo + hi) >> 1
    steps.push({
      array: arr,
      lo,
      hi: hi - 1,
      mid,
      eliminated: [...eliminated],
      target,
      desc: `lo=${lo}, hi=${hi}, mid=${mid}，比较 arr[${mid}]=${arr[mid]} 与 ${target}（寻找第一个 >）`,
    })
    if (arr[mid] > target) {
      result = mid
      for (let i = mid + 1; i < hi; i++) eliminated.push(i)
      steps.push({
        array: arr,
        lo,
        hi: hi - 1,
        mid,
        eliminated: [...eliminated],
        target,
        desc: `arr[${mid}]=${arr[mid]} > ${target}，候选答案=${mid}，继续向左（hi = mid = ${mid}）`,
      })
      hi = mid
    } else {
      for (let i = lo; i <= mid; i++) eliminated.push(i)
      steps.push({
        array: arr,
        lo,
        hi: hi - 1,
        mid,
        eliminated: [...eliminated],
        target,
        desc: `arr[${mid}]=${arr[mid]} ≤ ${target}，丢弃左半（lo = mid + 1 = ${mid + 1}）`,
      })
      lo = mid + 1
    }
  }
  steps.push({
    array: arr,
    lo,
    hi: hi - 1,
    mid: -1,
    eliminated: [...eliminated],
    target,
    found: result < arr.length ? result : undefined,
    desc: `上界 = ${result}${result < arr.length ? `（arr[${result}] = ${arr[result]} > ${target}）` : '（不存在，所有元素 ≤ target）'}`,
  })
  return steps
}

/** 旋转数组查找 */
function rotatedSearch(arr: number[], target: number): BSStep[] {
  const steps: BSStep[] = []
  let lo = 0
  let hi = arr.length - 1
  const eliminated: number[] = []

  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    steps.push({
      array: arr,
      lo,
      hi,
      mid,
      eliminated: [...eliminated],
      target,
      desc: `lo=${lo}, hi=${hi}, mid=${mid}，arr[${mid}]=${arr[mid]}`,
    })
    if (arr[mid] === target) {
      steps.push({
        array: arr,
        lo,
        hi,
        mid,
        eliminated: [...eliminated],
        target,
        found: mid,
        desc: `命中！arr[${mid}] = ${target}`,
      })
      return steps
    }
    // 判断 mid 在哪一段
    if (arr[lo] <= arr[mid]) {
      // 左段有序
      if (arr[lo] <= target && target < arr[mid]) {
        for (let i = mid; i <= hi; i++) eliminated.push(i)
        steps.push({
          array: arr,
          lo,
          hi,
          mid,
          eliminated: [...eliminated],
          target,
          desc: `左段有序 [${lo}..${mid}]，target 在左段，丢弃右半（hi = ${mid - 1}）`,
        })
        hi = mid - 1
      } else {
        for (let i = lo; i <= mid; i++) eliminated.push(i)
        steps.push({
          array: arr,
          lo,
          hi,
          mid,
          eliminated: [...eliminated],
          target,
          desc: `左段有序但 target 不在左段，丢弃左半（lo = ${mid + 1}）`,
        })
        lo = mid + 1
      }
    } else {
      // 右段有序
      if (arr[mid] < target && target <= arr[hi]) {
        for (let i = lo; i <= mid; i++) eliminated.push(i)
        steps.push({
          array: arr,
          lo,
          hi,
          mid,
          eliminated: [...eliminated],
          target,
          desc: `右段有序 [${mid}..${hi}]，target 在右段，丢弃左半（lo = ${mid + 1}）`,
        })
        lo = mid + 1
      } else {
        for (let i = mid; i <= hi; i++) eliminated.push(i)
        steps.push({
          array: arr,
          lo,
          hi,
          mid,
          eliminated: [...eliminated],
          target,
          desc: `右段有序但 target 不在右段，丢弃右半（hi = ${mid - 1}）`,
        })
        hi = mid - 1
      }
    }
  }
  steps.push({
    array: arr,
    lo,
    hi,
    mid: -1,
    eliminated: [...eliminated],
    target,
    desc: `lo > hi，未找到 ${target}`,
  })
  return steps
}

function buildSteps(variant: BinarySearchVariant, arr: number[], target: number): BSStep[] {
  if (variant === 'classic') return classicSearch(arr, target)
  if (variant === 'lower-bound') return lowerBound(arr, target)
  if (variant === 'upper-bound') return upperBound(arr, target)
  return rotatedSearch(arr, target)
}

const VARIANT_LABELS: Record<BinarySearchVariant, string> = {
  classic: '经典查找',
  'lower-bound': '下界（第一个 ≥）',
  'upper-bound': '上界（第一个 >）',
  rotated: '旋转数组查找',
}

export function BinarySearchVisualizer({ data }: BinarySearchVisualizerProps) {
  const initialVariant = data?.variant ?? 'classic'
  const initialArray = data?.array ?? (initialVariant === 'rotated' ? ROTATED_ARRAY : DEFAULT_ARRAY)
  const initialTarget = data?.target ?? 11

  const [variant, setVariant] = useState<BinarySearchVariant>(initialVariant)
  const [, setArray] = useState<number[]>(initialArray)
  const [arrayInput, setArrayInput] = useState(initialArray.join(','))
  const [target, setTarget] = useState(initialTarget)
  const [steps, setSteps] = useState<BSStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)

  const rerun = (v: BinarySearchVariant, arr: number[], t: number) => {
    setSteps(buildSteps(v, arr, t))
    setStepIndex(0)
  }

  useEffect(() => {
    rerun(initialVariant, initialArray, initialTarget)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const switchVariant = (v: BinarySearchVariant) => {
    setVariant(v)
    const defaultArr = v === 'rotated' ? ROTATED_ARRAY : DEFAULT_ARRAY
    setArray(defaultArr)
    setArrayInput(defaultArr.join(','))
    rerun(v, defaultArr, target)
    setAutoPlay(false)
  }

  const applyArray = () => {
    const parsed = arrayInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !Number.isNaN(n))
    if (parsed.length > 0) {
      setArray(parsed)
      rerun(variant, parsed, target)
      setAutoPlay(true)
    }
  }

  const goToStep = (idx: number) => {
    if (idx < 0 || idx >= steps.length) return
    setStepIndex(idx)
  }

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

  const currentStep = steps[stepIndex]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 变体切换 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        {(['classic', 'lower-bound', 'upper-bound', 'rotated'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => switchVariant(v)}
            className={cn('btn-pill', variant === v && 'border-accent-sunset text-accent-sunset')}
          >
            {VARIANT_LABELS[v]}
          </button>
        ))}
      </div>

      {/* 输入区 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
        <input
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="有序数组（逗号分隔）"
          className="flex-1 min-w-[200px] rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        <div className="flex items-center gap-xs">
          <span className="font-mono text-caption-mono-sm text-body-mid">target</span>
          <input
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value, 10) || 0)}
            type="number"
            className="w-20 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
          />
        </div>
        <button type="button" onClick={applyArray} className="btn-pill">
          运行
        </button>
      </div>

      {/* 步进控制 */}
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
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          步骤 {stepIndex} / {Math.max(0, steps.length - 1)}
        </span>
      </div>

      {/* 数组可视化 */}
      {currentStep && (
        <div className="mb-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            {VARIANT_LABELS[variant]}（target = {currentStep.target}）
          </div>
          <div className="flex flex-wrap gap-xs rounded-sm border border-hairline bg-canvas-soft p-md">
            {currentStep.array.map((val, idx) => {
              const isMid = idx === currentStep.mid
              const isLo = idx === currentStep.lo
              const isHi = idx === currentStep.hi
              const isEliminated = currentStep.eliminated.includes(idx)
              const isFound = currentStep.found === idx
              return (
                <div
                  key={idx}
                  className={cn(
                    'flex h-16 w-12 flex-col items-center justify-center rounded-sm border transition-all duration-300',
                    isFound
                      ? 'border-accent-breeze bg-accent-breeze/15 text-accent-breeze'
                      : isMid
                        ? 'border-accent-sunset bg-accent-sunset/15 text-accent-sunset'
                        : isEliminated
                          ? 'border-hairline bg-canvas-soft text-body-mid opacity-50'
                          : 'border-hairline bg-canvas-card text-ink',
                  )}
                >
                  <span className="font-mono text-body-sm">{val}</span>
                  <span className="font-mono text-caption-mono-sm text-body-mid">{idx}</span>
                  <div className="flex gap-[2px] mt-[2px]">
                    {isLo && <span className="font-mono text-caption-mono-sm text-accent-sunset">L</span>}
                    {isHi && <span className="font-mono text-caption-mono-sm text-accent-sunset">H</span>}
                    {isMid && <span className="font-mono text-caption-mono-sm text-accent-sunset">M</span>}
                    {isFound && <span className="font-mono text-caption-mono-sm text-accent-breeze">✓</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 当前步骤描述 */}
      {currentStep && (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            当前步骤
          </div>
          <div className="font-mono text-caption-mono text-ink">{currentStep.desc}</div>
        </div>
      )}
    </div>
  )
}
