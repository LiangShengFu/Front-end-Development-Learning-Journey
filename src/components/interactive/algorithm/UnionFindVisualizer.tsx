/**
 * UnionFindVisualizer - 并查集可视化
 *
 * 节点图展示 union 合并过程，find 路径压缩动画，连通分量计数。
 */
import { useEffect, useState } from 'react'
import type { UnionFindVisualizerData, UnionFindEdge } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface UnionFindVisualizerProps {
  data?: UnionFindVisualizerData
}

interface UFStep {
  parent: number[]
  rank: number[]
  /** 高亮的边 (u, v) */
  highlightEdge?: [number, number]
  /** 高亮的节点 */
  highlightNodes?: number[]
  /** 压缩路径 */
  compressPath?: number[]
  desc: string
  count: number
}

const DEFAULT_NODE_COUNT = 8
const DEFAULT_EDGES: UnionFindEdge[] = [
  { u: 0, v: 1 },
  { u: 2, v: 3 },
  { u: 4, v: 5 },
  { u: 1, v: 2 },
  { u: 6, v: 7 },
  { u: 4, v: 6 },
  { u: 3, v: 4 },
  { u: 0, v: 7 },
]

/** 执行 union 序列，记录每一步 */
function runUnionSequence(n: number, edges: UnionFindEdge[]): UFStep[] {
  const steps: UFStep[] = []
  const parent = Array.from({ length: n }, (_, i) => i)
  const rank = new Array(n).fill(1)
  let count = n

  steps.push({
    parent: [...parent],
    rank: [...rank],
    desc: `初始化：${n} 个节点各自为根，连通分量 = ${count}`,
    count,
  })

  function find(x: number, recordPath: number[] = []): number {
    if (parent[x] !== x) {
      recordPath.push(x)
      return find(parent[x], recordPath)
    }
    return x
  }

  for (const edge of edges) {
    const path: number[] = []
    const rootU = find(edge.u, path)
    const rootV = find(edge.v, [])

    if (rootU === rootV) {
      steps.push({
        parent: [...parent],
        rank: [...rank],
        highlightEdge: [edge.u, edge.v],
        highlightNodes: [edge.u, edge.v],
        desc: `union(${edge.u}, ${edge.v}) → 已连通（同根 ${rootU}），跳过`,
        count,
      })
      continue
    }

    // 按秩合并
    let actualRoot: number
    let attachedRoot: number
    if (rank[rootU] < rank[rootV]) {
      parent[rootU] = rootV
      actualRoot = rootV
      attachedRoot = rootU
    } else if (rank[rootU] > rank[rootV]) {
      parent[rootV] = rootU
      actualRoot = rootU
      attachedRoot = rootV
    } else {
      parent[rootV] = rootU
      rank[rootU]++
      actualRoot = rootU
      attachedRoot = rootV
    }
    count--

    steps.push({
      parent: [...parent],
      rank: [...rank],
      highlightEdge: [edge.u, edge.v],
      highlightNodes: [edge.u, edge.v, actualRoot],
      desc: `union(${edge.u}, ${edge.v})：根 ${attachedRoot} 挂到根 ${actualRoot} 下，连通分量 = ${count}`,
      count,
    })
  }

  // 最后做一次全量路径压缩
  const compressSteps: UFStep[] = []
  for (let i = 0; i < n; i++) {
    const path: number[] = []
    find(i, path)
    if (path.length > 1) {
      compressSteps.push({
        parent: [...parent],
        rank: [...rank],
        compressPath: path,
        highlightNodes: [i],
        desc: `find(${i}) 路径压缩：路径 [${path.join(' → ')}] 直接指向根 ${parent[i]}`,
        count,
      })
    }
  }
  steps.push(...compressSteps)

  if (compressSteps.length === 0) {
    steps.push({
      parent: [...parent],
      rank: [...rank],
      desc: '所有节点已直接指向根，无需路径压缩',
      count,
    })
  } else {
    steps.push({
      parent: [...parent],
      rank: [...rank],
      desc: `路径压缩完成，最终连通分量 = ${count}`,
      count,
    })
  }

  return steps
}

/** 计算节点圆形布局位置 */
function getNodePositions(n: number) {
  const positions: { x: number; y: number }[] = []
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2
    positions.push({
      x: 50 + 38 * Math.cos(angle),
      y: 50 + 38 * Math.sin(angle),
    })
  }
  return positions
}

export function UnionFindVisualizer({ data }: UnionFindVisualizerProps) {
  const nodeCount = data?.nodeCount ?? DEFAULT_NODE_COUNT
  const edges = data?.edges ?? DEFAULT_EDGES

  const [steps, setSteps] = useState<UFStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [customU, setCustomU] = useState('')
  const [customV, setCustomV] = useState('')

  const init = () => {
    const s = runUnionSequence(nodeCount, edges)
    setSteps(s)
    setStepIndex(0)
    setAutoPlay(false)
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goToStep = (idx: number) => {
    if (idx < 0 || idx >= steps.length) return
    setStepIndex(idx)
  }

  /** 自定义 union */
  const handleCustomUnion = () => {
    const u = parseInt(customU, 10)
    const v = parseInt(customV, 10)
    if (isNaN(u) || isNaN(v) || u < 0 || v < 0 || u >= nodeCount || v >= nodeCount) return
    const newEdges = [...edges, { u, v }]
    const s = runUnionSequence(nodeCount, newEdges)
    setSteps(s)
    setStepIndex(0)
    setAutoPlay(true)
    setCustomU('')
    setCustomV('')
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
    }, 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, stepIndex])

  const currentStep = steps[stepIndex]
  const positions = getNodePositions(nodeCount)
  const svgSize = 100

  /** 获取节点颜色（按根分组） */
  const getNodeColor = (idx: number): string => {
    if (!currentStep) return 'border-hairline'
    let root = idx
    while (currentStep.parent[root] !== root) root = currentStep.parent[root]
    const colors = [
      'border-accent-sunset bg-accent-sunset/10',
      'border-accent-breeze bg-accent-breeze/10',
      'border-purple-400 bg-purple-400/10',
      'border-amber-400 bg-amber-400/10',
      'border-emerald-400 bg-emerald-400/10',
      'border-pink-400 bg-pink-400/10',
      'border-cyan-400 bg-cyan-400/10',
      'border-indigo-400 bg-indigo-400/10',
    ]
    return colors[root % colors.length]
  }

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
        <button type="button" onClick={init} className="btn-pill text-body-mid">
          重置
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          步骤 {stepIndex} / {Math.max(0, steps.length - 1)}
        </span>
        {currentStep && (
          <span className="font-mono text-caption-mono-sm text-accent-sunset">
            连通分量：{currentStep.count}
          </span>
        )}
      </div>

      {/* 自定义 union */}
      <div className="mb-xl flex flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">自定义 union：</span>
        <input
          value={customU}
          onChange={(e) => setCustomU(e.target.value)}
          placeholder="u"
          className="w-16 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        <input
          value={customV}
          onChange={(e) => setCustomV(e.target.value)}
          placeholder="v"
          className="w-16 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        <button type="button" onClick={handleCustomUnion} className="btn-pill">
          union
        </button>
      </div>

      {/* 节点图 */}
      {currentStep && (
        <div className="mb-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            并查集森林（同色 = 同一连通分量）
          </div>
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="mx-auto block" style={{ maxHeight: '360px' }}>
              {/* parent 指向边 */}
              {currentStep.parent.map((p, i) => {
                if (p === i) return null
                const from = positions[i]
                const to = positions[p]
                const isCompress = currentStep.compressPath?.includes(i)
                const isHighlight = currentStep.highlightNodes?.includes(i)
                return (
                  <line
                    key={`p-${i}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="currentColor"
                    className={cn(
                      isCompress ? 'text-accent-sunset' : isHighlight ? 'text-accent-breeze' : 'text-hairline',
                    )}
                    strokeWidth={isCompress ? 2 : 1}
                    strokeDasharray={isCompress ? '3 2' : 'none'}
                    markerEnd="url(#arrow)"
                  />
                )
              })}
              {/* 高亮 union 边 */}
              {currentStep.highlightEdge && (
                <line
                  x1={positions[currentStep.highlightEdge[0]].x}
                  y1={positions[currentStep.highlightEdge[0]].y}
                  x2={positions[currentStep.highlightEdge[1]].x}
                  y2={positions[currentStep.highlightEdge[1]].y}
                  stroke="currentColor"
                  className="text-accent-sunset"
                  strokeWidth={2.5}
                  strokeDasharray="4 2"
                />
              )}
              {/* 节点 */}
              {positions.map((pos, i) => {
                const isRoot = currentStep.parent[i] === i
                const isHighlight = currentStep.highlightNodes?.includes(i)
                const isCompress = currentStep.compressPath?.includes(i)
                return (
                  <g key={i}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isRoot ? 5 : 4}
                      className={cn(
                        'transition-all duration-300',
                        isCompress
                          ? 'fill-accent-sunset stroke-accent-sunset'
                          : isHighlight
                            ? 'fill-accent-breeze stroke-accent-breeze'
                            : isRoot
                              ? 'fill-canvas-card stroke-accent-sunset'
                              : 'fill-canvas-card stroke-hairline',
                      )}
                      strokeWidth={isRoot || isHighlight ? 2 : 1}
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 7}
                      textAnchor="middle"
                      className="fill-ink font-mono"
                      style={{ fontSize: '6px' }}
                    >
                      {i}
                    </text>
                    {isRoot && (
                      <text
                        x={pos.x}
                        y={pos.y + 9}
                        textAnchor="middle"
                        className="fill-accent-sunset font-mono"
                        style={{ fontSize: '5px' }}
                      >
                        root·r{currentStep.rank[i]}
                      </text>
                    )}
                  </g>
                )
              })}
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" className="fill-hairline" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      )}

      {/* parent 数组 */}
      {currentStep && (
        <div className="mb-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            parent 数组（parent[i] = 父节点下标，i = parent[i] 时为根）
          </div>
          <div className="flex flex-wrap gap-xs rounded-sm border border-hairline bg-canvas-soft p-md">
            {currentStep.parent.map((p, i) => (
              <div
                key={i}
                className={cn(
                  'flex h-12 w-12 flex-col items-center justify-center rounded-sm border transition-all duration-300',
                  currentStep.highlightNodes?.includes(i)
                    ? 'border-accent-sunset bg-accent-sunset/10'
                    : 'border-hairline bg-canvas-card',
                )}
              >
                <span className="font-mono text-body-sm text-ink">{p}</span>
                <span className="font-mono text-caption-mono-sm text-body-mid">i={i}</span>
              </div>
            ))}
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
