/**
 * BacktrackingTreeVisualizer - 回溯算法可视化
 *
 * 三种经典题目：全排列 / N 皇后 / 子集。
 * 通过递归树展示「选择 → 递归 → 撤销」的过程，标注剪枝与解。
 */
import { useEffect, useState } from 'react'
import type { BacktrackingTreeVisualizerData, BacktrackingProblem } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface BacktrackingTreeVisualizerProps {
  data?: BacktrackingTreeVisualizerData
}

interface BTNode {
  id: string
  /** 当前路径（已选元素） */
  path: number[]
  /** 层级 */
  level: number
  /** 父节点 id */
  parentId: string | null
  /** 是否为剪枝（不合法分支） */
  pruned: boolean
  /** 是否为解 */
  isSolution: boolean
  /** 子节点 id */
  children: string[]
  /** 节点注释 */
  note: string
}

interface BTStep {
  /** 进入节点 id */
  nodeId: string
  /** 动作：enter / backtrack / solution / prune */
  action: 'enter' | 'backtrack' | 'solution' | 'prune'
  /** 当前所有节点 */
  nodes: Record<string, BTNode>
  /** 步骤描述 */
  desc: string
}

const PROBLEM_LABELS: Record<BacktrackingProblem, string> = {
  permutations: '全排列',
  'n-queens': 'N 皇后',
  subsets: '子集',
}

/** 全排列回溯 */
function permutationsSteps(n: number): BTStep[] {
  const steps: BTStep[] = []
  const nodes: Record<string, BTNode> = {}
  const used: number[] = []

  function makeNode(path: number[], parentId: string | null, note: string): string {
    const id = `n${Object.keys(nodes).length}`
    nodes[id] = {
      id,
      path: [...path],
      level: path.length,
      parentId,
      pruned: false,
      isSolution: path.length === n,
      children: [],
      note,
    }
    if (parentId) nodes[parentId].children.push(id)
    return id
  }

  const rootId = makeNode([], null, '起点')
  steps.push({
    nodeId: rootId,
    action: 'enter',
    nodes: { ...nodes },
    desc: `开始全排列：n=${n}，从空路径出发`,
  })

  function backtrack(path: number[], parentId: string) {
    if (path.length === n) {
      steps.push({
        nodeId: parentId,
        action: 'solution',
        nodes: { ...nodes },
        desc: `找到一个解：[${path.join(',')}]`,
      })
      return
    }
    for (let i = 1; i <= n; i++) {
      if (used.includes(i)) {
        // 剪枝：已使用
        const pruneId = makeNode([...path, i], parentId, `${i} 已使用，剪枝`)
        nodes[pruneId].pruned = true
        steps.push({
          nodeId: pruneId,
          action: 'prune',
          nodes: { ...nodes },
          desc: `尝试选 ${i}，但已在路径中，剪枝`,
        })
        continue
      }
      const childId = makeNode([...path, i], parentId, `选 ${i}`)
      steps.push({
        nodeId: childId,
        action: 'enter',
        nodes: { ...nodes },
        desc: `路径 [${path.join(',')}] → 选 ${i} → [${[...path, i].join(',')}]`,
      })
      used.push(i)
      backtrack([...path, i], childId)
      used.pop()
      steps.push({
        nodeId: childId,
        action: 'backtrack',
        nodes: { ...nodes },
        desc: `撤销 ${i}，从 [${[...path, i].join(',')}] 回到 [${path.join(',')}]`,
      })
    }
  }

  backtrack([], rootId)
  return steps
}

/** 子集回溯 */
function subsetsSteps(n: number): BTStep[] {
  const steps: BTStep[] = []
  const nodes: Record<string, BTNode> = {}

  function makeNode(path: number[], parentId: string | null, note: string): string {
    const id = `n${Object.keys(nodes).length}`
    nodes[id] = {
      id,
      path: [...path],
      level: path.length,
      parentId,
      pruned: false,
      isSolution: true,
      children: [],
      note,
    }
    if (parentId) nodes[parentId].children.push(id)
    return id
  }

  const rootId = makeNode([], null, '空集')
  steps.push({
    nodeId: rootId,
    action: 'enter',
    nodes: { ...nodes },
    desc: `开始子集：n=${n}，从空集开始`,
  })
  steps.push({
    nodeId: rootId,
    action: 'solution',
    nodes: { ...nodes },
    desc: `空集也是一个子集：[]`,
  })

  function backtrack(start: number, path: number[], parentId: string) {
    for (let i = start; i <= n; i++) {
      const childId = makeNode([...path, i], parentId, `加入 ${i}`)
      steps.push({
        nodeId: childId,
        action: 'enter',
        nodes: { ...nodes },
        desc: `从位置 ${start} 开始选，加入 ${i} → [${[...path, i].join(',')}]`,
      })
      steps.push({
        nodeId: childId,
        action: 'solution',
        nodes: { ...nodes },
        desc: `子集：[${[...path, i].join(',')}]`,
      })
      backtrack(i + 1, [...path, i], childId)
      steps.push({
        nodeId: childId,
        action: 'backtrack',
        nodes: { ...nodes },
        desc: `撤销 ${i}，回到 [${path.join(',')}]`,
      })
    }
  }

  backtrack(1, [], rootId)
  return steps
}

/** N 皇后回溯 */
function nQueensSteps(n: number): BTStep[] {
  const steps: BTStep[] = []
  const nodes: Record<string, BTNode> = {}
  const queens: number[] = [] // queens[row] = col

  function makeNode(path: number[], parentId: string | null, note: string, pruned = false): string {
    const id = `n${Object.keys(nodes).length}`
    nodes[id] = {
      id,
      path: [...path],
      level: path.length,
      parentId,
      pruned,
      isSolution: !pruned && path.length === n,
      children: [],
      note,
    }
    if (parentId) nodes[parentId].children.push(id)
    return id
  }

  const rootId = makeNode([], null, '起点')
  steps.push({
    nodeId: rootId,
    action: 'enter',
    nodes: { ...nodes },
    desc: `开始 N 皇后：n=${n}，逐行放置皇后`,
  })

  function isValid(row: number, col: number): boolean {
    for (let r = 0; r < row; r++) {
      const c = queens[r]
      if (c === col || Math.abs(r - row) === Math.abs(c - col)) return false
    }
    return true
  }

  function backtrack(row: number, parentId: string) {
    if (row === n) {
      steps.push({
        nodeId: parentId,
        action: 'solution',
        nodes: { ...nodes },
        desc: `找到一个解：${queens.map((q, i) => `(${i},${q})`).join(' ')}`,
      })
      return
    }
    for (let col = 0; col < n; col++) {
      if (!isValid(row, col)) {
        const pruneId = makeNode([...queens, col], parentId, `(${row},${col}) 冲突`, true)
        steps.push({
          nodeId: pruneId,
          action: 'prune',
          nodes: { ...nodes },
          desc: `尝试放 (${row},${col})，与已有皇后冲突，剪枝`,
        })
        continue
      }
      const childId = makeNode([...queens, col], parentId, `放 (${row},${col})`)
      steps.push({
        nodeId: childId,
        action: 'enter',
        nodes: { ...nodes },
        desc: `第 ${row} 行放皇后到列 ${col}`,
      })
      queens.push(col)
      backtrack(row + 1, childId)
      queens.pop()
      steps.push({
        nodeId: childId,
        action: 'backtrack',
        nodes: { ...nodes },
        desc: `撤销 (${row},${col})，回到第 ${row} 行尝试下一列`,
      })
    }
  }

  backtrack(0, rootId)
  return steps
}

function buildSteps(problem: BacktrackingProblem, n: number): BTStep[] {
  if (problem === 'permutations') return permutationsSteps(n)
  if (problem === 'subsets') return subsetsSteps(n)
  return nQueensSteps(n)
}

/** 层级布局：BFS 分层 */
function layoutNodes(nodes: Record<string, BTNode>, rootId: string) {
  const positions: Record<string, { x: number; y: number }> = {}
  const WIDTH = 1100
  const ROW_H = 70
  // 按层组织
  const layers: string[][] = []
  const queue: { id: string; level: number }[] = [{ id: rootId, level: 0 }]
  const visited = new Set<string>([rootId])
  while (queue.length > 0) {
    const { id, level } = queue.shift()!
    // 防御：节点可能在当前步骤的快照中不存在（children 数组是共享可变引用，
    // 会包含后续步骤才创建的子节点 id）
    if (!nodes[id]) continue
    if (!layers[level]) layers[level] = []
    layers[level].push(id)
    for (const childId of nodes[id].children) {
      if (!nodes[childId]) continue
      if (!visited.has(childId)) {
        visited.add(childId)
        queue.push({ id: childId, level: level + 1 })
      }
    }
  }
  layers.forEach((layer, level) => {
    const count = layer.length
    layer.forEach((id, i) => {
      positions[id] = {
        x: (WIDTH / (count + 1)) * (i + 1),
        y: 40 + level * ROW_H,
      }
    })
  })
  return { positions, maxLevel: layers.length }
}

export function BacktrackingTreeVisualizer({ data }: BacktrackingTreeVisualizerProps) {
  const initialProblem = data?.problem ?? 'permutations'
  const initialN = data?.n ?? 3

  const [problem, setProblem] = useState<BacktrackingProblem>(initialProblem)
  const [n, setN] = useState(initialN)
  const [steps, setSteps] = useState<BTStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)

  const rerun = (p: BacktrackingProblem, newN: number) => {
    setSteps(buildSteps(p, newN))
    setStepIndex(0)
  }

  useEffect(() => {
    rerun(initialProblem, initialN)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const switchProblem = (p: BacktrackingProblem) => {
    setProblem(p)
    const defaultN = p === 'n-queens' ? 4 : 3
    setN(defaultN)
    rerun(p, defaultN)
    setAutoPlay(false)
  }

  const changeN = (newN: number) => {
    setN(newN)
    rerun(problem, newN)
    setAutoPlay(false)
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
    }, 400)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, stepIndex])

  const currentStep = steps[stepIndex]
  const rootId = 'n0'
  const { positions, maxLevel } = currentStep
    ? layoutNodes(currentStep.nodes, rootId)
    : { positions: {}, maxLevel: 0 }

  const actionColors = {
    enter: 'border-accent-sunset bg-accent-sunset/15 text-accent-sunset',
    solution: 'border-accent-breeze bg-accent-breeze/15 text-accent-breeze',
    prune: 'border-ink-strike bg-ink-strike/10 text-ink-strike',
    backtrack: 'border-hairline bg-canvas-card text-body-mid',
  }

  // 统计解数量
  const solutionCount = currentStep
    ? Object.values(currentStep.nodes).filter((nd) => nd.isSolution && !nd.pruned).length
    : 0

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 题目切换 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        {(['permutations', 'subsets', 'n-queens'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => switchProblem(p)}
            className={cn('btn-pill', problem === p && 'border-accent-sunset text-accent-sunset')}
          >
            {PROBLEM_LABELS[p]}
          </button>
        ))}
        <div className="flex items-center gap-xs ml-md">
          <span className="font-mono text-caption-mono-sm text-body-mid">n</span>
          {(problem === 'n-queens' ? [4, 5, 6] : [2, 3, 4]).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => changeN(val)}
              className={cn('btn-pill', n === val && 'border-accent-sunset text-accent-sunset')}
            >
              {val}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-caption-mono-sm text-body-mid">
          解数：{solutionCount}
        </span>
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

      {/* 递归树可视化 */}
      {currentStep && (
        <div className="mb-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            {PROBLEM_LABELS[problem]} · 递归搜索树
          </div>
          <div className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md">
            <svg width="1100" height={Math.max(150, (maxLevel + 1) * 70 + 20)} className="block">
              {/* 连线 */}
              {Object.values(currentStep.nodes)
                .filter((nd) => nd.parentId)
                .map((nd) => {
                  const p = positions[nd.id]
                  const pp = positions[nd.parentId!]
                  if (!p || !pp) return null
                  const isPath =
                    currentStep.action === 'enter' &&
                    (nd.id === currentStep.nodeId ||
                      currentStep.nodes[currentStep.nodeId]?.path.slice(0, nd.level).join(',') === nd.path.join(','))
                  return (
                    <line
                      key={`${nd.parentId}-${nd.id}`}
                      x1={pp.x}
                      y1={pp.y}
                      x2={p.x}
                      y2={p.y}
                      stroke={isPath ? '#e07a5f' : '#d4d4d4'}
                      strokeWidth={isPath ? 2 : 1}
                      strokeDasharray={nd.pruned ? '4 4' : undefined}
                    />
                  )
                })}
              {/* 节点 */}
              {Object.values(currentStep.nodes).map((nd) => {
                const p = positions[nd.id]
                if (!p) return null
                const isCurrent = nd.id === currentStep.nodeId
                const isInPath =
                  currentStep.action === 'enter' &&
                  currentStep.nodes[currentStep.nodeId]?.path.slice(0, nd.level).join(',') === nd.path.join(',')
                const label = nd.path.length === 0 ? '∅' : `[${nd.path.join(',')}]`
                const nodeColor = nd.pruned
                  ? actionColors.prune
                  : nd.isSolution && currentStep.action === 'solution' && isCurrent
                    ? actionColors.solution
                    : isCurrent
                      ? actionColors[currentStep.action as keyof typeof actionColors] || actionColors.backtrack
                      : isInPath
                        ? 'border-accent-sunset/60 bg-accent-sunset/5 text-ink'
                        : 'border-hairline bg-canvas-card text-body-mid'
                return (
                  <g key={nd.id}>
                    <rect
                      x={p.x - 50}
                      y={p.y - 18}
                      width={100}
                      height={36}
                      rx={4}
                      className={nodeColor}
                      stroke="currentColor"
                      fill="currentColor"
                      fillOpacity={isCurrent ? 0.15 : 0.05}
                      strokeWidth={isCurrent ? 2 : 1}
                    />
                    <text
                      x={p.x}
                      y={p.y + 4}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize="11"
                      fill="currentColor"
                    >
                      {label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      )}

      {/* 当前步骤描述 */}
      {currentStep && (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-xs flex items-center gap-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            <span>当前步骤</span>
            <span className={actionColors[currentStep.action as keyof typeof actionColors]}>
              {currentStep.action === 'enter' && '进入'}
              {currentStep.action === 'backtrack' && '回溯'}
              {currentStep.action === 'solution' && '★ 找到解'}
              {currentStep.action === 'prune' && '剪枝'}
            </span>
          </div>
          <div className="font-mono text-caption-mono text-ink">{currentStep.desc}</div>
        </div>
      )}
    </div>
  )
}
