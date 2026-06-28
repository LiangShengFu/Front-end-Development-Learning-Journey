/**
 * DynamicProgrammingVisualizer - 动态规划可视化
 *
 * 三种经典 DP 题型：
 * - climbing-stairs（一维 DP）：LC70 爬楼梯，dp[i] = dp[i-1] + dp[i-2]
 * - lcs（二维 DP）：LC1143 最长公共子序列，dp[i][j] 依赖左/上/左上
 * - knapsack01（一维滚动数组）：0-1 背包，逆序遍历防重复选
 *
 * 每个 step 携带当前 DP 表的「快照拷贝」，避免后续修改污染早期 step。
 */
import { useEffect, useState } from 'react'
import type {
  DynamicProgrammingVisualizerData,
  DPProblem,
} from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface DynamicProgrammingVisualizerProps {
  data?: DynamicProgrammingVisualizerData
}

/** 单步状态：当前 DP 表 + 当前填充位置 + 依赖位置 + 描述 */
interface DPStep {
  /** 当前 DP 表快照（深拷贝，null 表示尚未填充） */
  table: (number | null)[][]
  /** 行/列表头（仅展示用） */
  rowHeader: string[]
  colHeader: string[]
  /** 当前正在填充的格子 */
  current?: { i: number; j: number }
  /** 当前格子依赖的格子（用于高亮） */
  deps?: Array<{ i: number; j: number }>
  /** 步骤描述 */
  desc: string
  /** 递推公式或当前操作说明 */
  formula: string
  /** 是否最终答案步骤 */
  isFinal?: boolean
  /** 最终答案 */
  answer?: number
}

const DEFAULT_N = 5
const DEFAULT_TEXT1 = 'abcde'
const DEFAULT_TEXT2 = 'ace'
const DEFAULT_CAPACITY = 4
const DEFAULT_WEIGHTS = [1, 3, 4]
const DEFAULT_VALUES = [15, 20, 30]

/** 深拷贝 DP 表 */
function cloneTable(t: (number | null)[][]): (number | null)[][] {
  return t.map((row) => [...row])
}

// ============================================================================
// climbing-stairs：一维 DP，dp[i] = dp[i-1] + dp[i-2]
// ============================================================================
function climbingStairsSteps(n: number): DPStep[] {
  const steps: DPStep[] = []
  // dp[0..n]，dp[0]=0, dp[1]=1, dp[2]=2, dp[i]=dp[i-1]+dp[i-2]
  const dp: number[] = new Array(n + 1).fill(0)
  // 单列二维表：table[i][0] = dp[i]
  const makeTable = (filled: number): (number | null)[][] => {
    const t: (number | null)[][] = []
    for (let i = 0; i <= n; i++) {
      t.push([i <= filled ? dp[i] : null])
    }
    return t
  }
  const rowHeader: string[] = []
  for (let i = 0; i <= n; i++) rowHeader.push(`i=${i}`)
  const colHeader: string[] = ['dp[i]']

  // 初始化 dp[0]=0
  dp[0] = 0
  steps.push({
    table: makeTable(0),
    rowHeader,
    colHeader,
    current: { i: 0, j: 0 },
    desc: `初始化 dp[0] = 0（0 阶有 0 种方式，base case）`,
    formula: 'dp[0] = 0',
  })

  // dp[1]=1
  dp[1] = 1
  steps.push({
    table: makeTable(1),
    rowHeader,
    colHeader,
    current: { i: 1, j: 0 },
    desc: `初始化 dp[1] = 1（1 阶有 1 种方式：爬 1 步）`,
    formula: 'dp[1] = 1',
  })

  if (n >= 2) {
    dp[2] = 2
    steps.push({
      table: makeTable(2),
      rowHeader,
      colHeader,
      current: { i: 2, j: 0 },
      desc: `初始化 dp[2] = 2（2 阶有 2 种方式：1+1 或 2）`,
      formula: 'dp[2] = 2',
    })
  }

  // 递推
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
    steps.push({
      table: makeTable(i),
      rowHeader,
      colHeader,
      current: { i, j: 0 },
      deps: [
        { i: i - 1, j: 0 },
        { i: i - 2, j: 0 },
      ],
      desc: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
      formula: `dp[i] = dp[i-1] + dp[i-2]`,
    })
  }

  steps.push({
    table: makeTable(n),
    rowHeader,
    colHeader,
    desc: `完成：爬 ${n} 阶楼梯共有 ${dp[n]} 种方式`,
    formula: `答案 = dp[${n}] = ${dp[n]}`,
    isFinal: true,
    answer: dp[n],
  })
  return steps
}

// ============================================================================
// lcs：二维 DP，dp[i][j] 依赖左/上/左上
// ============================================================================
function lcsSteps(text1: string, text2: string): DPStep[] {
  const steps: DPStep[] = []
  const m = text1.length
  const n = text2.length
  // dp[0..m][0..n]，dp[i][j] = t1[0..i-1] 与 t2[0..j-1] 的 LCS 长度
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  )
  const rowHeader: string[] = ['∅', ...[...text1].map((c) => `"${c}"`)]
  const colHeader: string[] = ['∅', ...[...text2].map((c) => `"${c}"`)]

  // 初始化第 0 行/0 列为 0
  {
    const t: (number | null)[][] = []
    for (let i = 0; i <= m; i++) {
      const row: (number | null)[] = []
      for (let j = 0; j <= n; j++) {
        if (i === 0 || j === 0) row.push(0)
        else row.push(null)
      }
      t.push(row)
    }
    steps.push({
      table: t,
      rowHeader,
      colHeader,
      desc: `初始化：dp[0][*] = dp[*][0] = 0（空串与任何串的 LCS 长度为 0）`,
      formula: 'dp[0][j] = dp[i][0] = 0',
    })
  }

  // 填表
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const prevTable = cloneTable(steps[steps.length - 1].table)
      // 计算当前格子
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        // 更新快照
        prevTable[i][j] = dp[i][j]
        steps.push({
          table: prevTable,
          rowHeader,
          colHeader,
          current: { i, j },
          deps: [{ i: i - 1, j: j - 1 }],
          desc: `t1[${i - 1}]="${text1[i - 1]}" == t2[${j - 1}]="${text2[j - 1]}"，匹配：dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i - 1][j - 1]} + 1 = ${dp[i][j]}`,
          formula: `dp[i][j] = dp[i-1][j-1] + 1（字符相等）`,
        })
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
        prevTable[i][j] = dp[i][j]
        steps.push({
          table: prevTable,
          rowHeader,
          colHeader,
          current: { i, j },
          deps: [
            { i: i - 1, j },
            { i, j: j - 1 },
          ],
          desc: `t1[${i - 1}]="${text1[i - 1]}" != t2[${j - 1}]="${text2[j - 1]}"，不匹配：dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
          formula: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])（字符不等）`,
        })
      }
    }
  }

  // 最终快照
  const finalTable: (number | null)[][] = []
  for (let i = 0; i <= m; i++) {
    finalTable.push([...dp[i]])
  }
  steps.push({
    table: finalTable,
    rowHeader,
    colHeader,
    desc: `完成：LCS("${text1}", "${text2}") = ${dp[m][n]}`,
    formula: `答案 = dp[${m}][${n}] = ${dp[m][n]}`,
    isFinal: true,
    answer: dp[m][n],
  })
  return steps
}

// ============================================================================
// knapsack01：一维滚动数组，逆序遍历防重复选
// ============================================================================
function knapsack01Steps(
  capacity: number,
  weights: number[],
  values: number[],
): DPStep[] {
  const steps: DPStep[] = []
  const items = weights.length
  // dp[w] = 容量 w 下的最大价值
  const dp: number[] = new Array(capacity + 1).fill(0)
  const rowHeader: string[] = []
  for (let w = 0; w <= capacity; w++) rowHeader.push(`w=${w}`)
  const colHeader: string[] = ['dp[w]']

  const makeTable = (): (number | null)[][] => {
    const t: (number | null)[][] = []
    for (let w = 0; w <= capacity; w++) t.push([dp[w]])
    return t
  }

  // 初始化
  steps.push({
    table: makeTable(),
    rowHeader,
    colHeader,
    desc: `初始化：dp[0..W] = 0（容量为 0 时无价值，滚数组从 0 起步）`,
    formula: 'dp[w] = 0',
  })

  // 逐物品处理
  for (let i = 0; i < items; i++) {
    const wi = weights[i]
    const vi = values[i]
    // 逆序遍历：保证每个物品只选一次
    for (let w = capacity; w >= wi; w--) {
      const oldDpW = dp[w]
      const candidate = dp[w - wi] + vi
      const improved = candidate > dp[w]
      dp[w] = Math.max(dp[w], candidate)
      steps.push({
        table: makeTable(),
        rowHeader,
        colHeader,
        current: { i: w, j: 0 },
        deps: [{ i: w - wi, j: 0 }],
        desc: `物品 ${i + 1}（w=${wi}, v=${vi}）: dp[${w}] = max(dp[${w}]=${oldDpW}, dp[${w - wi}]+${vi}=${dp[w - wi] + vi}) = ${dp[w]}${improved ? '（更新）' : ''}`,
        formula: `dp[w] = max(dp[w], dp[w-wi] + vi)  ← 逆序 w=${w}`,
      })
    }
    // 该物品处理完的总结步
    steps.push({
      table: makeTable(),
      rowHeader,
      colHeader,
      desc: `物品 ${i + 1}（w=${wi}, v=${vi}）处理完毕，dp 数组更新如上`,
      formula: `完成物品 ${i + 1}`,
    })
  }

  steps.push({
    table: makeTable(),
    rowHeader,
    colHeader,
    desc: `完成：容量 ${capacity} 下最大价值 = ${dp[capacity]}`,
    formula: `答案 = dp[${capacity}] = ${dp[capacity]}`,
    isFinal: true,
    answer: dp[capacity],
  })
  return steps
}

function buildSteps(
  problem: DPProblem,
  data: {
    n: number
    text1: string
    text2: string
    capacity: number
    weights: number[]
    values: number[]
  },
): DPStep[] {
  if (problem === 'climbing-stairs') return climbingStairsSteps(data.n)
  if (problem === 'lcs') return lcsSteps(data.text1, data.text2)
  return knapsack01Steps(data.capacity, data.weights, data.values)
}

const PROBLEM_LABELS: Record<DPProblem, string> = {
  'climbing-stairs': '一维 DP · 爬楼梯',
  lcs: '二维 DP · LCS',
  knapsack01: '滚动数组 · 0-1 背包',
}

export function DynamicProgrammingVisualizer({ data }: DynamicProgrammingVisualizerProps) {
  const initialProblem = data?.problem ?? 'climbing-stairs'
  const initialN = data?.n ?? DEFAULT_N
  const initialText1 = data?.text1 ?? DEFAULT_TEXT1
  const initialText2 = data?.text2 ?? DEFAULT_TEXT2
  const initialCapacity = data?.capacity ?? DEFAULT_CAPACITY
  const initialWeights = data?.weights ?? DEFAULT_WEIGHTS
  const initialValues = data?.values ?? DEFAULT_VALUES

  const [problem, setProblem] = useState<DPProblem>(initialProblem)
  const [nInput, setNInput] = useState(String(initialN))
  const [text1Input, setText1Input] = useState(initialText1)
  const [text2Input, setText2Input] = useState(initialText2)
  const [capacityInput, setCapacityInput] = useState(String(initialCapacity))
  const [weightsInput, setWeightsInput] = useState(initialWeights.join(','))
  const [valuesInput, setValuesInput] = useState(initialValues.join(','))
  const [steps, setSteps] = useState<DPStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)

  const parseData = () => {
    const n = Math.max(1, Math.min(15, parseInt(nInput, 10) || DEFAULT_N))
    const capacity = Math.max(1, Math.min(20, parseInt(capacityInput, 10) || DEFAULT_CAPACITY))
    const weights = weightsInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((x) => !Number.isNaN(x) && x > 0)
    const values = valuesInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((x) => !Number.isNaN(x))
    // 保证 weights/values 等长
    const len = Math.min(weights.length, values.length)
    return {
      n,
      text1: text1Input || DEFAULT_TEXT1,
      text2: text2Input || DEFAULT_TEXT2,
      capacity,
      weights: len > 0 ? weights.slice(0, len) : DEFAULT_WEIGHTS,
      values: len > 0 ? values.slice(0, len) : DEFAULT_VALUES,
    }
  }

  const rerun = (p: DPProblem = problem) => {
    setSteps(buildSteps(p, parseData()))
    setStepIndex(0)
  }

  useEffect(() => {
    rerun(initialProblem)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const switchProblem = (p: DPProblem) => {
    setProblem(p)
    // 切换时复位输入为默认值，避免遗留输入污染
    if (p === 'climbing-stairs') setNInput(String(DEFAULT_N))
    if (p === 'lcs') {
      setText1Input(DEFAULT_TEXT1)
      setText2Input(DEFAULT_TEXT2)
    }
    if (p === 'knapsack01') {
      setCapacityInput(String(DEFAULT_CAPACITY))
      setWeightsInput(DEFAULT_WEIGHTS.join(','))
      setValuesInput(DEFAULT_VALUES.join(','))
    }
    setSteps(
      buildSteps(p, {
        n: DEFAULT_N,
        text1: DEFAULT_TEXT1,
        text2: DEFAULT_TEXT2,
        capacity: DEFAULT_CAPACITY,
        weights: DEFAULT_WEIGHTS,
        values: DEFAULT_VALUES,
      }),
    )
    setStepIndex(0)
    setAutoPlay(false)
  }

  const applyInput = () => {
    setSteps(buildSteps(problem, parseData()))
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
    }, 700)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, stepIndex])

  const currentStep = steps[stepIndex]
  const isDep = (i: number, j: number) =>
    currentStep?.deps?.some((d) => d.i === i && d.j === j) ?? false
  const isCurrent = (i: number, j: number) =>
    currentStep?.current?.i === i && currentStep?.current?.j === j

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 题目切换 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        {(['climbing-stairs', 'lcs', 'knapsack01'] as const).map((p) => (
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
        {problem === 'climbing-stairs' && (
          <div className="flex items-center gap-xs">
            <span className="font-mono text-caption-mono-sm text-body-mid">n 阶</span>
            <input
              value={nInput}
              onChange={(e) => setNInput(e.target.value)}
              type="number"
              min={1}
              max={15}
              className="w-20 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
            />
          </div>
        )}
        {problem === 'lcs' && (
          <>
            <input
              value={text1Input}
              onChange={(e) => setText1Input(e.target.value)}
              placeholder="字符串 1"
              className="flex-1 min-w-[120px] rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
            />
            <input
              value={text2Input}
              onChange={(e) => setText2Input(e.target.value)}
              placeholder="字符串 2"
              className="flex-1 min-w-[120px] rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
            />
          </>
        )}
        {problem === 'knapsack01' && (
          <>
            <div className="flex items-center gap-xs">
              <span className="font-mono text-caption-mono-sm text-body-mid">容量 W</span>
              <input
                value={capacityInput}
                onChange={(e) => setCapacityInput(e.target.value)}
                type="number"
                min={1}
                max={20}
                className="w-20 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
              />
            </div>
            <input
              value={weightsInput}
              onChange={(e) => setWeightsInput(e.target.value)}
              placeholder="重量数组"
              className="flex-1 min-w-[120px] rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
            />
            <input
              value={valuesInput}
              onChange={(e) => setValuesInput(e.target.value)}
              placeholder="价值数组"
              className="flex-1 min-w-[120px] rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
            />
          </>
        )}
        <button type="button" onClick={applyInput} className="btn-pill">
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
        <button
          type="button"
          onClick={() => {
            setStepIndex(0)
            setAutoPlay(false)
          }}
          className="btn-pill"
        >
          重置
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          步骤 {stepIndex} / {Math.max(0, steps.length - 1)}
        </span>
      </div>

      {/* DP 表可视化 */}
      {currentStep && (
        <div className="mb-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            {PROBLEM_LABELS[problem]}
            {currentStep.isFinal && (
              <span className="ml-sm text-accent-breeze">★ 答案 = {currentStep.answer}</span>
            )}
          </div>
          <div className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="w-12 border border-hairline bg-canvas-card px-md py-xs font-mono text-caption-mono-sm text-body-mid">
                    dp
                  </th>
                  {currentStep.colHeader.map((h, j) => (
                    <th
                      key={j}
                      className="min-w-[3rem] border border-hairline bg-canvas-card px-md py-xs font-mono text-caption-mono text-ink"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentStep.table.map((row, i) => (
                  <tr key={i}>
                    <td className="border border-hairline bg-canvas-card px-md py-xs font-mono text-caption-mono-sm text-body-mid">
                      {currentStep.rowHeader[i]}
                    </td>
                    {row.map((cell, j) => {
                      const isCur = isCurrent(i, j)
                      const isDepCell = isDep(i, j)
                      return (
                        <td
                          key={j}
                          className={cn(
                            'min-w-[3rem] border px-md py-xs text-center font-mono text-caption-mono transition-all duration-200',
                            cell === null
                              ? 'border-hairline bg-canvas text-body-mid/40'
                              : isCur
                                ? 'border-accent-sunset bg-accent-sunset/20 text-accent-sunset font-bold'
                                : isDepCell
                                  ? 'border-accent-breeze/60 bg-accent-breeze/15 text-accent-breeze'
                                  : 'border-hairline bg-canvas-card text-ink',
                          )}
                        >
                          {cell === null ? '·' : cell}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-xs flex items-center gap-md font-mono text-caption-mono-sm text-body-mid">
            <span className="flex items-center gap-xs">
              <span className="inline-block h-3 w-3 rounded-sm border border-accent-sunset bg-accent-sunset/20" />
              当前填充
            </span>
            <span className="flex items-center gap-xs">
              <span className="inline-block h-3 w-3 rounded-sm border border-accent-breeze/60 bg-accent-breeze/15" />
              依赖格子
            </span>
            <span className="flex items-center gap-xs">
              <span className="inline-block h-3 w-3 rounded-sm border border-hairline bg-canvas-card" />
              已填充
            </span>
            <span className="flex items-center gap-xs">
              <span className="inline-block h-3 w-3 rounded-sm border border-hairline bg-canvas" />·
              未填充
            </span>
          </div>
        </div>
      )}

      {/* 当前步骤描述 */}
      {currentStep && (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            当前步骤
          </div>
          <div className="mb-xs font-mono text-caption-mono text-accent-sunset">
            {currentStep.formula}
          </div>
          <div className="font-mono text-caption-mono text-ink">{currentStep.desc}</div>
        </div>
      )}
    </div>
  )
}
