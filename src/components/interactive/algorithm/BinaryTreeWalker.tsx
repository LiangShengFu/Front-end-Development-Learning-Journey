/**
 * BinaryTreeWalker - 二叉树遍历动画
 *
 * 在预设二叉树上可视化四种遍历方式：
 * - 前序（根→左→右）
 * - 中序（左→根→右）
 * - 后序（左→右→根）
 * - 层序（BFS 逐层）
 *
 * 采用预计算策略：初始化时计算四种遍历的访问序列，步进播放时高亮当前节点。
 * SVG 绘制树结构，当前访问节点用橙色脉冲动画高亮。
 */
import { useEffect, useMemo, useState } from 'react'
import type { BinaryTreeWalkerData, TreeNodeData } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface BinaryTreeWalkerProps {
  data?: BinaryTreeWalkerData
}

/** 默认 7 节点完全二叉树 */
const DEFAULT_TREE: TreeNodeData = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4 },
    right: { val: 5 },
  },
  right: {
    val: 3,
    left: { val: 6 },
    right: { val: 7 },
  },
}

type TraversalType = 'preorder' | 'inorder' | 'postorder' | 'levelorder'

// ============================================================================
// 遍历序列预计算
// ============================================================================

function preorder(node: TreeNodeData | undefined, result: number[]): void {
  if (!node) return
  result.push(node.val)
  preorder(node.left, result)
  preorder(node.right, result)
}

function inorder(node: TreeNodeData | undefined, result: number[]): void {
  if (!node) return
  inorder(node.left, result)
  result.push(node.val)
  inorder(node.right, result)
}

function postorder(node: TreeNodeData | undefined, result: number[]): void {
  if (!node) return
  postorder(node.left, result)
  postorder(node.right, result)
  result.push(node.val)
}

function levelorder(root: TreeNodeData, result: number[]): void {
  const queue: TreeNodeData[] = [root]
  while (queue.length > 0) {
    const node = queue.shift()!
    result.push(node.val)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
}

// ============================================================================
// 树节点位置计算（用于 SVG 布局）
// ============================================================================

interface PositionedNode {
  val: number
  x: number
  y: number
  left?: PositionedNode
  right?: PositionedNode
}

function layoutTree(node: TreeNodeData, depth: number, leftBound: number, rightBound: number): PositionedNode {
  const x = (leftBound + rightBound) / 2
  const y = 40 + depth * 70
  return {
    val: node.val,
    x,
    y,
    left: node.left ? layoutTree(node.left, depth + 1, leftBound, x) : undefined,
    right: node.right ? layoutTree(node.right, depth + 1, x, rightBound) : undefined,
  }
}

/** 收集所有节点位置 */
function collectNodes(node: PositionedNode | undefined, list: PositionedNode[]): void {
  if (!node) return
  list.push(node)
  collectNodes(node.left, list)
  collectNodes(node.right, list)
}

/** 收集所有边 */
function collectEdges(node: PositionedNode | undefined, edges: Array<{ from: PositionedNode; to: PositionedNode }>): void {
  if (!node) return
  if (node.left) {
    edges.push({ from: node, to: node.left })
    collectEdges(node.left, edges)
  }
  if (node.right) {
    edges.push({ from: node, to: node.right })
    collectEdges(node.right, edges)
  }
}

// ============================================================================
// 组件
// ============================================================================

export function BinaryTreeWalker({ data }: BinaryTreeWalkerProps) {
  const tree = data?.tree ?? DEFAULT_TREE
  const [traversalType, setTraversalType] = useState<TraversalType>('preorder')
  const [stepIdx, setStepIdx] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [speed, setSpeed] = useState(700)

  // 预计算四种遍历序列
  const sequences = useMemo(() => {
    const pre: number[] = []
    const ino: number[] = []
    const post: number[] = []
    const level: number[] = []
    preorder(tree, pre)
    inorder(tree, ino)
    postorder(tree, post)
    levelorder(tree, level)
    return { preorder: pre, inorder: ino, postorder: post, levelorder: level }
  }, [tree])

  const sequence = sequences[traversalType]
  const visited = sequence.slice(0, stepIdx + 1)
  const current = sequence[stepIdx]

  // 树布局
  const positioned = useMemo(() => layoutTree(tree, 0, 30, 690), [tree])
  const nodes = useMemo(() => { const l: PositionedNode[] = []; collectNodes(positioned, l); return l }, [positioned])
  const edges = useMemo(() => { const e: Array<{ from: PositionedNode; to: PositionedNode }> = []; collectEdges(positioned, e); return e }, [positioned])

  const switchType = (t: TraversalType) => {
    setTraversalType(t)
    setStepIdx(0)
    setAutoPlay(false)
  }

  // 自动播放
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      if (stepIdx >= sequence.length - 1) {
        setAutoPlay(false)
      } else {
        setStepIdx((i) => Math.min(i + 1, sequence.length - 1))
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [autoPlay, stepIdx, speed, sequence.length])

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 遍历方式切换 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        {([
          ['preorder', '前序（根→左→右）'],
          ['inorder', '中序（左→根→右）'],
          ['postorder', '后序（左→右→根）'],
          ['levelorder', '层序（BFS）'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => switchType(key)}
            className={cn('btn-pill', traversalType === key && 'border-accent-sunset/50 text-accent-sunset')}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_200px]">
        {/* SVG 树 */}
        <div className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md">
          <svg width="100%" height="260" viewBox="0 0 720 260" className="min-w-[500px]">
            {/* 边 */}
            {edges.map((edge, i) => (
              <line
                key={i}
                x1={edge.from.x}
                y1={edge.from.y}
                x2={edge.to.x}
                y2={edge.to.y}
                stroke="#363a3f"
                strokeWidth="1.5"
              />
            ))}
            {/* 节点 */}
            {nodes.map((node) => {
              const isCurrent = node.val === current
              const isVisited = visited.includes(node.val) && !isCurrent
              return (
                <g key={node.val}>
                  {isCurrent && (
                    <circle cx={node.x} cy={node.y} r={26} fill="none" stroke="#ff7a17" strokeWidth="2" opacity="0.4">
                      <animate attributeName="r" values="22;28;22" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill={isCurrent ? '#ff7a1720' : isVisited ? '#34d39920' : '#1a1c20'}
                    stroke={isCurrent ? '#ff7a17' : isVisited ? '#34d399' : '#363a3f'}
                    strokeWidth={isCurrent || isVisited ? 2 : 1}
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill={isCurrent ? '#ff7a17' : isVisited ? '#34d399' : '#ffffff'}
                    fontSize="14"
                    fontFamily="monospace"
                  >
                    {node.val}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* 访问序列面板 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            访问序列
          </div>
          <div className="flex flex-wrap gap-xs">
            {visited.map((val, i) => (
              <span
                key={i}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-sm border font-mono text-caption-mono',
                  i === visited.length - 1
                    ? 'border-accent-sunset bg-accent-sunset/10 text-accent-sunset'
                    : 'border-accent-sunset/30 bg-accent-sunset/5 text-ink',
                )}
              >
                {val}
              </span>
            ))}
            {visited.length === 0 && <span className="text-body-sm text-body-mid">尚未访问</span>}
          </div>
          <div className="mt-md border-t border-hairline pt-md font-mono text-caption-mono-sm text-body-mid">
            步骤 {stepIdx + 1} / {sequence.length}
          </div>
          {traversalType === 'levelorder' && (
            <div className="mt-sm text-caption-mono-sm text-body-mid">
              💡 层序遍历使用队列：入队→出队→访问→子节点入队
            </div>
          )}
        </div>
      </div>

      {/* 控制栏 */}
      <div className="mt-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={() => { setStepIdx(0); setAutoPlay(false) }} className="btn-pill text-body-mid">
          ⏹ 重置
        </button>
        <button type="button" onClick={() => setStepIdx((i) => Math.max(0, i - 1))} disabled={stepIdx === 0} className="btn-pill">
          ◀ 上一步
        </button>
        <button type="button" onClick={() => setStepIdx((i) => Math.min(sequence.length - 1, i + 1))} disabled={stepIdx >= sequence.length - 1} className="btn-pill">
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
