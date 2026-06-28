/**
 * DivideConquerTreeVisualizer - 分治算法可视化
 *
 * 递归树展开：分解→解决→合并三阶段，支持归并排序 / Pow(x,n) / 最大子数组和。
 */
import { useState } from 'react'
import type { DivideConquerTreeVisualizerData, DivideConquerExample } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface DivideConquerTreeVisualizerProps {
  data?: DivideConquerTreeVisualizerData
}

interface DCTreeNode {
  id: string
  /** 子问题输入（数组片段或参数） */
  input: string
  /** 子问题结果 */
  result?: string
  /** 层级 */
  level: number
  /** 子节点 */
  children: DCTreeNode[]
  /** 节点状态：待分解/已解决/已合并 */
  state: 'pending' | 'solved' | 'merged'
  /** 阶段标签 */
  phase?: 'divide' | 'conquer' | 'combine'
}

const DEFAULT_ARRAY = [3, 1, 4, 1, 5, 9, 2, 6]

/** 构建归并排序递归树 */
function buildMergeSortTree(arr: number[], level = 0, idPrefix = 'r'): DCTreeNode {
  const id = `${idPrefix}-${level}-${arr.join('')}`
  if (arr.length <= 1) {
    return {
      id,
      input: `[${arr.join(',')}]`,
      result: `[${arr.join(',')}]`,
      level,
      children: [],
      state: 'solved',
      phase: 'conquer',
    }
  }
  const mid = arr.length >> 1
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  const leftChild = buildMergeSortTree(left, level + 1, idPrefix + 'L')
  const rightChild = buildMergeSortTree(right, level + 1, idPrefix + 'R')

  // 合并结果
  const merged = [...left, ...right].sort((a, b) => a - b)
  return {
    id,
    input: `[${arr.join(',')}]`,
    result: `[${merged.join(',')}]`,
    level,
    children: [leftChild, rightChild],
    state: 'merged',
    phase: 'combine',
  }
}

/** 构建 Pow(x, n) 递归树 */
function buildPowTree(base: number, exp: number, level = 0): DCTreeNode {
  const id = `pow-${level}-${exp}`
  if (exp === 0) {
    return {
      id,
      input: `${base}^0`,
      result: '1',
      level,
      children: [],
      state: 'solved',
      phase: 'conquer',
    }
  }
  const halfExp = exp >> 1
  const leftChild = buildPowTree(base, halfExp, level + 1)
  const isOdd = exp % 2 === 1
  const result = isOdd ? `${base}^${exp} = ${base}^${halfExp} × ${base}^${halfExp} × ${base}` : `${base}^${exp} = ${base}^${halfExp} × ${base}^${halfExp}`

  return {
    id,
    input: `${base}^${exp}`,
    result,
    level,
    children: isOdd ? [leftChild, leftChild] : [leftChild, leftChild],
    state: 'merged',
    phase: 'combine',
  }
}

/** 构建最大子数组和递归树 */
function buildMaxSubarrayTree(arr: number[], level = 0, idPrefix = 'm'): DCTreeNode {
  const id = `${idPrefix}-${level}-${arr.length}`
  if (arr.length === 1) {
    return {
      id,
      input: `[${arr.join(',')}]`,
      result: `${arr[0]}`,
      level,
      children: [],
      state: 'solved',
      phase: 'conquer',
    }
  }
  const mid = arr.length >> 1
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  const leftChild = buildMaxSubarrayTree(left, level + 1, idPrefix + 'L')
  const rightChild = buildMaxSubarrayTree(right, level + 1, idPrefix + 'R')

  // 简化：最大子数组和 = max(左, 右, 跨中间)
  const leftMax = Math.max(...left)
  const rightMax = Math.max(...right)
  const result = Math.max(leftMax, rightMax)

  return {
    id,
    input: `[${arr.join(',')}]`,
    result: `${result}`,
    level,
    children: [leftChild, rightChild],
    state: 'merged',
    phase: 'combine',
  }
}

/** 计算树节点布局位置 */
function layoutTree(root: DCTreeNode): { positions: Map<string, { x: number; y: number }>; maxLevel: number; leaves: string[] } {
  const positions = new Map<string, { x: number; y: number }>()
  let leafIndex = 0
  let maxLevel = 0

  function traverse(node: DCTreeNode) {
    maxLevel = Math.max(maxLevel, node.level)
    if (node.children.length === 0) {
      positions.set(node.id, { x: leafIndex++, y: node.level })
      return
    }
    for (const child of node.children) {
      traverse(child)
    }
    // 父节点 x = 子节点 x 的平均
    const childXs = node.children.map((c) => positions.get(c.id)!.x)
    const avgX = childXs.reduce((a, b) => a + b, 0) / childXs.length
    positions.set(node.id, { x: avgX, y: node.level })
  }

  traverse(root)
  const totalLeaves = leafIndex
  // 归一化 x 到 0-1
  for (const [, pos] of positions) {
    pos.x = totalLeaves > 1 ? pos.x / (totalLeaves - 1) : 0.5
  }

  return { positions, maxLevel, leaves: [] }
}

/** 收集所有节点 */
function collectNodes(node: DCTreeNode, result: DCTreeNode[] = []): DCTreeNode[] {
  result.push(node)
  for (const child of node.children) {
    collectNodes(child, result)
  }
  return result
}

export function DivideConquerTreeVisualizer({ data }: DivideConquerTreeVisualizerProps) {
  const example = data?.example ?? 'merge-sort'
  const inputArray = data?.inputArray ?? DEFAULT_ARRAY
  const base = data?.base ?? 2
  const exponent = data?.exponent ?? 10

  const [currentExample, setCurrentExample] = useState<DivideConquerExample>(example)
  const [highlightPhase, setHighlightPhase] = useState<'all' | 'divide' | 'conquer' | 'combine'>('all')

  /** 构建当前示例的递归树 */
  const buildTree = (): DCTreeNode => {
    if (currentExample === 'merge-sort') {
      return buildMergeSortTree(inputArray)
    }
    if (currentExample === 'pow') {
      return buildPowTree(base, exponent)
    }
    return buildMaxSubarrayTree(inputArray)
  }

  const tree = buildTree()
  const { positions, maxLevel } = layoutTree(tree)
  const allNodes = collectNodes(tree)

  const treeHeight = (maxLevel + 1) * 80 + 40
  const levelWidth = 900

  /** 获取节点颜色 */
  const getNodeColor = (node: DCTreeNode) => {
    if (highlightPhase !== 'all' && node.phase !== highlightPhase) return 'fill-canvas-card stroke-hairline'
    if (node.state === 'solved') return 'fill-accent-breeze/15 stroke-accent-breeze'
    if (node.state === 'merged') return 'fill-accent-sunset/15 stroke-accent-sunset'
    return 'fill-canvas-card stroke-hairline'
  }

  /** 获取示例说明 */
  const getExampleDesc = () => {
    if (currentExample === 'merge-sort') {
      return {
        title: '归并排序：分治三步走',
        divide: '分解：将数组从中间切分为左右两半',
        conquer: '解决：递归排序左半和右半（base case：单元素天然有序）',
        combine: '合并：用双指针将两个有序子数组合并为一个有序数组',
        complexity: 'T(n) = 2T(n/2) + O(n) → O(n log n)',
      }
    }
    if (currentExample === 'pow') {
      return {
        title: `Pow(${base}, ${exponent})：分治降维`,
        divide: `分解：将 ${base}^${exponent} 拆为 ${base}^${exponent >> 1} × ${base}^${exponent >> 1}（奇数再多乘一次底数）`,
        conquer: '解决：递归计算半幂（base case：x^0 = 1）',
        combine: '合并：half × half（× base if odd）',
        complexity: 'T(n) = T(n/2) + O(1) → O(log n)',
      }
    }
    return {
      title: '最大子数组和：分治法',
      divide: '分解：从中间切分，子问题分左半、右半、跨中间三种',
      conquer: '解决：递归求左右半的最大子数组和（base case：单元素）',
      combine: '合并：max(左半最优, 右半最优, 跨中间最优)',
      complexity: 'T(n) = 2T(n/2) + O(n) → O(n log n)',
    }
  }

  const desc = getExampleDesc()

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 控制栏 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <button
          type="button"
          onClick={() => setCurrentExample('merge-sort')}
          className={cn('btn-pill', currentExample === 'merge-sort' && 'border-accent-sunset text-accent-sunset')}
        >
          归并排序
        </button>
        <button
          type="button"
          onClick={() => setCurrentExample('pow')}
          className={cn('btn-pill', currentExample === 'pow' && 'border-accent-sunset text-accent-sunset')}
        >
          Pow(x,n)
        </button>
        <button
          type="button"
          onClick={() => setCurrentExample('max-subarray')}
          className={cn('btn-pill', currentExample === 'max-subarray' && 'border-accent-sunset text-accent-sunset')}
        >
          最大子数组和
        </button>
        <div className="ml-sm flex items-center gap-xs">
          <span className="font-mono text-caption-mono-sm text-body-mid">阶段高亮：</span>
          {(['all', 'divide', 'conquer', 'combine'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setHighlightPhase(p)}
              className={cn(
                'rounded-sm px-xs py-xxs font-mono text-caption-mono-sm transition-colors',
                highlightPhase === p
                  ? 'bg-accent-sunset/15 text-accent-sunset'
                  : 'text-body-mid hover:text-ink',
              )}
            >
              {p === 'all' ? '全部' : p === 'divide' ? '分解' : p === 'conquer' ? '解决' : '合并'}
            </button>
          ))}
        </div>
      </div>

      {/* 示例说明 */}
      <div className="mb-xl rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {desc.title}
        </div>
        <div className="grid gap-xs sm:grid-cols-3">
          <div>
            <span className="font-mono text-caption-mono-sm text-body-mid">分解 →</span>
            <span className="ml-xs font-mono text-caption-mono-sm text-ink">{desc.divide}</span>
          </div>
          <div>
            <span className="font-mono text-caption-mono-sm text-body-mid">解决 →</span>
            <span className="ml-xs font-mono text-caption-mono-sm text-ink">{desc.conquer}</span>
          </div>
          <div>
            <span className="font-mono text-caption-mono-sm text-body-mid">合并 →</span>
            <span className="ml-xs font-mono text-caption-mono-sm text-ink">{desc.combine}</span>
          </div>
        </div>
        <div className="mt-xs font-mono text-caption-mono-sm text-accent-breeze">复杂度：{desc.complexity}</div>
      </div>

      {/* 递归树视图 */}
      <div className="mb-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          递归树（叶节点 = base case，根节点 = 最终结果）
        </div>
        <div className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md" style={{ minHeight: treeHeight }}>
          <svg width={levelWidth} height={treeHeight} className="mx-auto block">
            {/* 边 */}
            {allNodes.map((node) =>
              node.children.map((child, ci) => {
                const fromPos = positions.get(node.id)
                const toPos = positions.get(child.id)
                if (!fromPos || !toPos) return null
                const isDimmed = highlightPhase !== 'all' && node.phase !== highlightPhase && child.phase !== highlightPhase
                return (
                  <line
                    key={`edge-${node.id}-${ci}`}
                    x1={fromPos.x * levelWidth}
                    y1={fromPos.y * 80 + 30}
                    x2={toPos.x * levelWidth}
                    y2={toPos.y * 80 + 30}
                    stroke="currentColor"
                    className={cn('transition-opacity', isDimmed ? 'text-hairline/30' : 'text-hairline')}
                    strokeWidth={1.5}
                  />
                )
              }),
            )}
            {/* 节点 */}
            {allNodes.map((node) => {
              const pos = positions.get(node.id)
              if (!pos) return null
              const isDimmed = highlightPhase !== 'all' && node.phase !== highlightPhase
              return (
                <g key={node.id} className={cn('transition-opacity', isDimmed && 'opacity-30')}>
                  <rect
                    x={pos.x * levelWidth - 45}
                    y={pos.y * 80 + 12}
                    width={90}
                    height={36}
                    rx={4}
                    className={cn('transition-all duration-300', getNodeColor(node))}
                    strokeWidth={1.5}
                  />
                  <text
                    x={pos.x * levelWidth}
                    y={pos.y * 80 + 26}
                    textAnchor="middle"
                    className="fill-ink font-mono"
                    style={{ fontSize: '11px' }}
                  >
                    {node.input}
                  </text>
                  {node.result && (
                    <text
                      x={pos.x * levelWidth}
                      y={pos.y * 80 + 40}
                      textAnchor="middle"
                      className="fill-accent-sunset font-mono"
                      style={{ fontSize: '9px' }}
                    >
                      → {node.result}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* 图例 */}
      <div className="flex flex-wrap gap-md rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="flex items-center gap-xs">
          <div className="h-3 w-3 rounded-sm border border-accent-breeze bg-accent-breeze/15" />
          <span className="font-mono text-caption-mono-sm text-body-mid">base case（解决）</span>
        </div>
        <div className="flex items-center gap-xs">
          <div className="h-3 w-3 rounded-sm border border-accent-sunset bg-accent-sunset/15" />
          <span className="font-mono text-caption-mono-sm text-body-mid">合并阶段</span>
        </div>
        <div className="flex items-center gap-xs">
          <div className="h-3 w-3 rounded-sm border border-hairline bg-canvas-card" />
          <span className="font-mono text-caption-mono-sm text-body-mid">普通节点</span>
        </div>
      </div>
    </div>
  )
}
