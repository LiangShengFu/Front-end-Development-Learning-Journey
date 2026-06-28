/**
 * SlidingWindowVisualizer - 滑动窗口可视化
 *
 * 三种题目：定长最大和 / 最长无重复子串 / 最小覆盖子串。
 */
import { useEffect, useState } from 'react'
import type { SlidingWindowVisualizerData, SlidingWindowProblem } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface SlidingWindowVisualizerProps {
  data?: SlidingWindowVisualizerData
}

interface SWStep {
  /** 字符或数字数组 */
  tokens: string[]
  /** 当前窗口左边界（含） */
  left: number
  /** 当前窗口右边界（含） */
  right: number
  /** 最优窗口 */
  bestLeft: number
  bestRight: number
  /** 当前窗口统计信息 */
  windowInfo: string
  /** 步骤描述 */
  desc: string
  /** 是否更新了最优 */
  improved?: boolean
}

const DEFAULT_ARRAY = [2, 1, 5, 1, 3, 2, 4, 6, 1, 2]
const DEFAULT_TEXT = 'abcabcbb'
const MIN_WINDOW_TEXT = 'ADOBECODEBANC'
const MIN_WINDOW_PATTERN = 'ABC'

/** 定长最大和 */
function maxSumK(arr: number[], k: number): SWStep[] {
  const steps: SWStep[] = []
  const tokens = arr.map(String)
  let windowSum = 0
  let bestSum: number
  let bestLeft = 0
  let bestRight = k - 1

  // 初始化第一个窗口
  for (let i = 0; i < k && i < arr.length; i++) windowSum += arr[i]
  bestSum = windowSum
  steps.push({
    tokens,
    left: 0,
    right: Math.min(k - 1, arr.length - 1),
    bestLeft: 0,
    bestRight: Math.min(k - 1, arr.length - 1),
    windowInfo: `窗口 [0, ${k - 1}]，和 = ${windowSum}`,
    desc: `初始化第一个窗口，sum = ${windowSum}`,
    improved: true,
  })

  // 滑动
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]
    const left = i - k + 1
    const right = i
    const improved = windowSum > bestSum
    steps.push({
      tokens,
      left,
      right,
      bestLeft: improved ? left : bestLeft,
      bestRight: improved ? right : bestRight,
      windowInfo: `窗口 [${left}, ${right}]，和 = ${windowSum}（入 arr[${i}]=${arr[i]}，出 arr[${i - k}]=${arr[i - k]}）`,
      desc: improved
        ? `滑动到 [${left}, ${right}]，和 = ${windowSum} > ${bestSum}，更新最优`
        : `滑动到 [${left}, ${right}]，和 = ${windowSum} ≤ ${bestSum}，跳过`,
      improved,
    })
    if (improved) {
      bestSum = windowSum
      bestLeft = left
      bestRight = right
    }
  }
  steps.push({
    tokens,
    left: -1,
    right: -1,
    bestLeft,
    bestRight,
    windowInfo: `最大和 = ${bestSum}`,
    desc: `完成：最大和 = ${bestSum}，窗口 [${bestLeft}, ${bestRight}]`,
  })
  return steps
}

/** 最长无重复字符子串 */
function longestUniqueSubstring(s: string): SWStep[] {
  const steps: SWStep[] = []
  const tokens = [...s]
  const charIdx = new Map<string, number>()
  let left = 0
  let bestLen = 0
  let bestLeft = 0
  let bestRight = 0

  for (let right = 0; right < s.length; right++) {
    const ch = s[right]
    if (charIdx.has(ch) && charIdx.get(ch)! >= left) {
      const oldLeft = left
      left = charIdx.get(ch)! + 1
      steps.push({
        tokens,
        left,
        right,
        bestLeft,
        bestRight,
        windowInfo: `right=${right}（"${ch}"）重复于 ${charIdx.get(ch)}，收缩 left ${oldLeft} → ${left}`,
        desc: `"${ch}" 在窗口内重复（位置 ${charIdx.get(ch)}），left 跳到 ${left}`,
      })
    } else {
      const curLen = right - left + 1
      const improved = curLen > bestLen
      steps.push({
        tokens,
        left,
        right,
        bestLeft: improved ? left : bestLeft,
        bestRight: improved ? right : bestRight,
        windowInfo: `窗口 [${left}, ${right}]，长度 = ${curLen}`,
        desc: improved
          ? `"${ch}" 不重复，扩展窗口 → 长度 ${curLen}，更新最优`
          : `"${ch}" 不重复，扩展窗口 → 长度 ${curLen}`,
        improved,
      })
      if (improved) {
        bestLen = curLen
        bestLeft = left
        bestRight = right
      }
    }
    charIdx.set(ch, right)
  }
  steps.push({
    tokens,
    left: -1,
    right: -1,
    bestLeft,
    bestRight,
    windowInfo: `最长无重复子串长度 = ${bestLen}`,
    desc: `完成：最长 = ${bestLen}，子串 "${s.slice(bestLeft, bestRight + 1)}"`,
  })
  return steps
}

/** 最小覆盖子串 */
function minWindow(s: string, t: string): SWStep[] {
  const steps: SWStep[] = []
  const tokens = [...s]
  const need = new Map<string, number>()
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1)
  const needCount = need.size
  const window = new Map<string, number>()
  let valid = 0
  let left = 0
  let bestLen = Infinity
  let bestLeft = -1
  let bestRight = -1

  for (let right = 0; right < s.length; right++) {
    const ch = s[right]
    if (need.has(ch)) {
      window.set(ch, (window.get(ch) || 0) + 1)
      if (window.get(ch) === need.get(ch)) valid++
    }

    // 当窗口满足条件，尝试收缩
    while (valid === needCount && left <= right) {
      const curLen = right - left + 1
      const improved = curLen < bestLen
      steps.push({
        tokens,
        left,
        right,
        bestLeft: improved ? left : bestLeft,
        bestRight: improved ? right : bestRight,
        windowInfo: `窗口 [${left}, ${right}]，长度 ${curLen}，已覆盖（valid=${valid}/${needCount}）`,
        desc: improved ? `窗口满足，长度 ${curLen} < ${bestLen}，更新最优` : `窗口满足，长度 ${curLen} ≥ ${bestLen}，尝试收缩`,
        improved,
      })
      if (improved) {
        bestLen = curLen
        bestLeft = left
        bestRight = right
      }
      // 收缩 left
      const outCh = s[left]
      if (need.has(outCh)) {
        if (window.get(outCh) === need.get(outCh)) valid--
        window.set(outCh, window.get(outCh)! - 1)
      }
      left++
    }
    if (left <= right) {
      steps.push({
        tokens,
        left,
        right,
        bestLeft,
        bestRight,
        windowInfo: `扩展 right=${right}（"${ch}"），窗口未覆盖（valid=${valid}/${needCount}）`,
        desc: `加入 "${ch}"，valid=${valid}/${needCount}，继续扩展`,
      })
    }
  }
  steps.push({
    tokens,
    left: -1,
    right: -1,
    bestLeft,
    bestRight,
    windowInfo: bestLen === Infinity ? '未找到覆盖子串' : `最小覆盖长度 = ${bestLen}`,
    desc:
      bestLen === Infinity
        ? '完成：未找到覆盖子串'
        : `完成：最小覆盖长度 = ${bestLen}，子串 "${s.slice(bestLeft, bestRight + 1)}"`,
  })
  return steps
}

const PROBLEM_LABELS: Record<SlidingWindowProblem, string> = {
  'max-sum-k': '定长最大和',
  'longest-substring': '最长无重复子串',
  'min-window': '最小覆盖子串',
}

export function SlidingWindowVisualizer({ data }: SlidingWindowVisualizerProps) {
  const initialProblem = data?.problem ?? 'max-sum-k'
  const initialArray = data?.array ?? DEFAULT_ARRAY
  const initialText = data?.text ?? DEFAULT_TEXT
  const initialK = data?.k ?? 3

  const [problem, setProblem] = useState<SlidingWindowProblem>(initialProblem)
  const [arrayInput, setArrayInput] = useState(initialArray.join(','))
  const [textInput, setTextInput] = useState(initialText)
  const [k, setK] = useState(initialK)
  const [steps, setSteps] = useState<SWStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)

  const generateSteps = (
    p: SlidingWindowProblem,
    arr: number[],
    text: string,
    windowK: number,
  ): SWStep[] => {
    if (p === 'max-sum-k') return maxSumK(arr, windowK)
    if (p === 'longest-substring') return longestUniqueSubstring(text)
    return minWindow(text, MIN_WINDOW_PATTERN)
  }

  const rerun = (
    p: SlidingWindowProblem = problem,
    arr: number[] = initialArray,
    text: string = initialText,
  ) => {
    setSteps(generateSteps(p, arr, text, k))
    setStepIndex(0)
  }

  useEffect(() => {
    rerun(initialProblem, initialArray, initialText)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const switchProblem = (p: SlidingWindowProblem) => {
    setProblem(p)
    const arr = p === 'max-sum-k' ? DEFAULT_ARRAY : initialArray
    const text = p === 'longest-substring' ? DEFAULT_TEXT : p === 'min-window' ? MIN_WINDOW_TEXT : initialText
    setArrayInput(arr.join(','))
    setTextInput(text)
    setSteps(generateSteps(p, arr, text, k))
    setStepIndex(0)
    setAutoPlay(false)
  }

  const applyInput = () => {
    const arr = arrayInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !Number.isNaN(n))
    setSteps(generateSteps(problem, arr.length ? arr : initialArray, textInput, k))
    setStepIndex(0)
    setAutoPlay(true)
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
    }, 600)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, stepIndex])

  const currentStep = steps[stepIndex]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 题目切换 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        {(['max-sum-k', 'longest-substring', 'min-window'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => switchProblem(p)}
            className={cn('btn-pill', problem === p && 'border-accent-sunset text-accent-sunset')}
          >
            {PROBLEM_LABELS[p]}
          </button>
        ))}
      </div>

      {/* 输入区 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
        {problem === 'max-sum-k' ? (
          <>
            <input
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              placeholder="数字数组（逗号分隔）"
              className="flex-1 min-w-[200px] rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
            />
            <div className="flex items-center gap-xs">
              <span className="font-mono text-caption-mono-sm text-body-mid">k</span>
              <input
                value={k}
                onChange={(e) => setK(parseInt(e.target.value, 10) || 1)}
                type="number"
                className="w-16 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
              />
            </div>
          </>
        ) : (
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="输入字符串"
            className="flex-1 min-w-[200px] rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
          />
        )}
        <button type="button" onClick={applyInput} className="btn-pill">
          运行
        </button>
        {problem === 'min-window' && (
          <span className="font-mono text-caption-mono-sm text-body-mid">模式串：{MIN_WINDOW_PATTERN}</span>
        )}
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

      {/* 窗口可视化 */}
      {currentStep && (
        <div className="mb-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            {PROBLEM_LABELS[problem]}
          </div>
          <div className="flex flex-wrap gap-xs rounded-sm border border-hairline bg-canvas-soft p-md">
            {currentStep.tokens.map((tok, idx) => {
              const inWindow = idx >= currentStep.left && idx <= currentStep.right
              const inBest =
                currentStep.bestLeft >= 0 && idx >= currentStep.bestLeft && idx <= currentStep.bestRight
              const isLeft = idx === currentStep.left
              const isRight = idx === currentStep.right
              return (
                <div
                  key={idx}
                  className={cn(
                    'flex h-14 w-10 flex-col items-center justify-center rounded-sm border transition-all duration-300',
                    inWindow
                      ? 'border-accent-sunset bg-accent-sunset/15 text-accent-sunset'
                      : inBest
                        ? 'border-accent-breeze/60 bg-accent-breeze/10 text-ink'
                        : 'border-hairline bg-canvas-card text-body-mid',
                  )}
                >
                  <span className="font-mono text-body-sm">{tok}</span>
                  <span className="font-mono text-caption-mono-sm">
                    {isLeft && isRight ? 'LR' : isLeft ? 'L' : isRight ? 'R' : idx}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">{currentStep.windowInfo}</div>
        </div>
      )}

      {/* 当前步骤描述 */}
      {currentStep && (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            当前步骤
            {currentStep.improved && (
              <span className="ml-sm text-accent-breeze">★ 已更新最优</span>
            )}
          </div>
          <div className="font-mono text-caption-mono text-ink">{currentStep.desc}</div>
        </div>
      )}
    </div>
  )
}
