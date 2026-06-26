/**
 * VdomDiffSimulator — 虚拟 DOM Diff 模拟器
 *
 * 可视化新旧虚拟 DOM 对比，展示 React diff 算法的最小化 DOM 操作策略。
 * 新增/移除/移动节点用不同颜色高亮，展示 DOM 操作次数。
 *
 * 对应docx中演示 #3
 */
import { useState } from 'react'
import type { VdomDiffSimulatorData, VdomNode } from '../../../lib/react-visualization-types'
import { cn } from '../../../lib/utils'

interface VdomDiffSimulatorProps {
  data?: VdomDiffSimulatorData
}

const DEFAULT_SCENES = [
  {
    id: 'add',
    label: '新增节点',
    oldTree: [
      { id: 'a', label: '<div key="a">A</div>' },
      { id: 'b', label: '<div key="b">B</div>' },
    ],
    newTree: [
      { id: 'a', label: '<div key="a">A</div>' },
      { id: 'b', label: '<div key="b">B</div>' },
      { id: 'c', label: '<div key="c">C</div>' },
    ],
    diffDescription: '新增节点 C：key="c" 在旧树中不存在，React 创建新 DOM 节点并插入',
    domOps: 1,
    addedIds: ['c'],
    removedIds: [],
    movedIds: [],
  },
  {
    id: 'remove',
    label: '移除节点',
    oldTree: [
      { id: 'a', label: '<div key="a">A</div>' },
      { id: 'b', label: '<div key="b">B</div>' },
      { id: 'c', label: '<div key="c">C</div>' },
    ],
    newTree: [
      { id: 'a', label: '<div key="a">A</div>' },
      { id: 'c', label: '<div key="c">C</div>' },
    ],
    diffDescription: '移除节点 B：key="b" 在新树中不存在，React 移除对应 DOM 节点',
    domOps: 1,
    addedIds: [],
    removedIds: ['b'],
    movedIds: [],
  },
  {
    id: 'reorder',
    label: '重排序（复用）',
    oldTree: [
      { id: 'a', label: '<div key="a">A</div>' },
      { id: 'b', label: '<div key="b">B</div>' },
      { id: 'c', label: '<div key="c">C</div>' },
    ],
    newTree: [
      { id: 'c', label: '<div key="c">C</div>' },
      { id: 'a', label: '<div key="a">A</div>' },
      { id: 'b', label: '<div key="b">B</div>' },
    ],
    diffDescription: '重排序：React 通过 key 识别节点复用，仅移动 DOM 位置而不销毁重建。DOM 操作 = 2 次移动。',
    domOps: 2,
    addedIds: [],
    removedIds: [],
    movedIds: ['c', 'a', 'b'],
  },
  {
    id: 'mixed',
    label: '混合变更',
    oldTree: [
      { id: 'a', label: '<div key="a">A</div>' },
      { id: 'b', label: '<div key="b">B v1</div>' },
      { id: 'c', label: '<div key="c">C</div>' },
    ],
    newTree: [
      { id: 'b', label: '<div key="b">B v2</div>' },
      { id: 'd', label: '<div key="d">D</div>' },
      { id: 'c', label: '<div key="c">C</div>' },
    ],
    diffDescription: '混合变更：A 移除（1 次操作），B 内容更新（1 次操作），D 新增（1 次操作），C 复用并移动（1 次操作）。总计 4 次 DOM 操作。',
    domOps: 4,
    addedIds: ['d'],
    removedIds: ['a'],
    movedIds: ['c'],
  },
]

export function VdomDiffSimulator({ data }: VdomDiffSimulatorProps) {
  const scenes = data?.scenes ?? DEFAULT_SCENES
  const [activeIdx, setActiveIdx] = useState(0)
  const scene = scenes[activeIdx]

  const getNodeClass = (node: VdomNode) => {
    if (scene.addedIds.includes(node.id)) return 'border-accent-sunset/50 bg-accent-sunset/10'
    if (scene.removedIds.includes(node.id)) return 'border-red-500/30 bg-red-500/5 opacity-60'
    if (scene.movedIds.includes(node.id)) return 'border-accent-dusk/50 bg-accent-dusk/10'
    return 'border-hairline bg-canvas-card'
  }

  const renderTree = (nodes: VdomNode[], treeType: 'old' | 'new') => (
    <div className="space-y-xxs">
      {nodes.map((node) => (
        <div
          key={node.id}
          className={cn(
            'rounded-sm border px-md py-sm font-mono text-caption-mono-sm text-ink',
            getNodeClass(node),
            treeType === 'old' && scene.removedIds.includes(node.id) && 'line-through',
          )}
        >
          {node.label}
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-lg">
      {/* Scene selector */}
      <div className="flex flex-wrap gap-sm">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm uppercase tracking-[1.2px] transition-colors',
              activeIdx === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Diff visualization */}
      <div className="grid gap-lg lg:grid-cols-[1fr_auto_1fr]">
        {/* Old VDOM */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            旧虚拟 DOM
          </div>
          {renderTree(scene.oldTree, 'old')}
        </div>

        {/* Diff arrow */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="font-mono text-display-xs text-accent-sunset">→</div>
            <div className="mt-sm rounded-pill bg-accent-sunset/10 px-md py-xxs font-mono text-caption-mono-sm text-accent-sunset">
              diff
            </div>
          </div>
        </div>

        {/* New VDOM */}
        <div className="rounded-sm border border-accent-sunset/40 bg-canvas-soft p-lg">
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            新虚拟 DOM
          </div>
          {renderTree(scene.newTree, 'new')}
        </div>
      </div>

      {/* Description & Result */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
        <p className="text-body-sm text-body">{scene.diffDescription}</p>
        <div className="mt-md flex items-center gap-xl">
          <div className="flex items-center gap-sm">
            <span className="font-mono text-caption-mono-sm text-body-mid">DOM 操作:</span>
            <span className="font-mono text-body-lg text-accent-sunset">{scene.domOps}</span>
          </div>
          {scene.addedIds.length > 0 && (
            <span className="font-mono text-caption-mono-sm text-accent-sunset">
              +{scene.addedIds.length} 新增
            </span>
          )}
          {scene.removedIds.length > 0 && (
            <span className="font-mono text-caption-mono-sm text-red-500">
              -{scene.removedIds.length} 移除
            </span>
          )}
          {scene.movedIds.length > 0 && (
            <span className="font-mono text-caption-mono-sm text-accent-dusk">
              ⇄{scene.movedIds.length} 移动
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-lg text-caption-mono-sm text-body-mid">
        <span className="flex items-center gap-sm">
          <span className="h-2.5 w-2.5 rounded-sm bg-accent-sunset/50" /> 新增
        </span>
        <span className="flex items-center gap-sm">
          <span className="h-2.5 w-2.5 rounded-sm bg-red-500/50" /> 移除
        </span>
        <span className="flex items-center gap-sm">
          <span className="h-2.5 w-2.5 rounded-sm bg-accent-dusk/50" /> 移动/复用
        </span>
      </div>
    </div>
  )
}
