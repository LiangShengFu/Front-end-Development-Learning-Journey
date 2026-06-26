/**
 * DecisionTree — 通用决策树组件
 *
 * 可视化多级决策路径，展示不同选择走向不同方案的决策过程。
 * 用于状态管理选型、组件库选型、路由方案选型等决策场景。
 *
 * 对应docx中演示 #18
 */
import { useState } from 'react'
import type { DecisionTreeData, DecisionNode } from '../../../lib/react-visualization-types'

interface DecisionTreeProps {
  data?: DecisionTreeData
}

const DEFAULT_TREE: DecisionNode = {
  question: '是否有多个组件共享状态？',
  yesLabel: '是 → 需要全局状态管理',
  noLabel: '否',
  noNext: {
    question: '状态是否跟随组件生命周期？',
    yesLabel: '是 → 组件卸载时状态可丢弃',
    noLabel: '否 → 状态需要跨组件持久化',
    yesResult: '推荐：useState（组件内部状态）',
    noNext: {
      question: '状态是否需要在多个不相关组件间传递？',
      yesLabel: '是',
      noLabel: '否 → 父组件提升状态',
      noResult: '推荐：Props drilling 或 useContext',
      yesResult: '推荐：Context + useReducer 或 Zustand',
    },
  },
  yesResult: '推荐：Zustand（轻量）/ Redux Toolkit（复杂应用）',
}

export function DecisionTree({ data }: DecisionTreeProps) {
  const root = data?.root ?? DEFAULT_TREE
  const startLabel = data?.startLabel ?? '开始选型'
  const [path, setPath] = useState<Array<{ node: DecisionNode; choice: 'yes' | 'no' }>>([])
  const currentNode = path.length === 0 ? root : (path[path.length - 1].choice === 'yes' ? null : path[path.length - 1].node.noNext ?? null)
  const result = path.length > 0 ? (path[path.length - 1].choice === 'yes' ? path[path.length - 1].node.yesResult : null) : null

  const handleChoice = (choice: 'yes' | 'no') => {
    if (!currentNode) return
    const newPath = [...path, { node: currentNode, choice }]
    setPath(newPath)
  }

  const handleReset = () => setPath([])

  const handleBack = () => {
    if (path.length > 0) {
      setPath(path.slice(0, -1))
    }
  }

  return (
    <div className="space-y-lg">
      {/* Controls */}
      <div className="flex items-center gap-sm">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-colors hover:border-white/30"
        >
          ↺ 重新开始
        </button>
        {path.length > 0 && !result && (
          <button
            type="button"
            onClick={handleBack}
            className="rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-colors hover:border-white/30"
          >
            ← 返回上一步
          </button>
        )}
        <span className="ml-auto font-mono text-caption-mono-sm text-body-mid">
          决策步数: {path.length}
        </span>
      </div>

      {/* Decision tree path */}
      <div className="space-y-sm">
        {path.map((p, i) => (
          <div key={i} className="rounded-sm border border-hairline bg-canvas-soft p-md opacity-60">
            <span className="font-mono text-caption-mono-sm text-body-mid">
              步骤 {i + 1}: {p.node.question}
            </span>
            <span className="ml-md font-mono text-caption-mono-sm text-accent-sunset">
              → {p.choice === 'yes' ? '是' : '否'}
            </span>
          </div>
        ))}
      </div>

      {/* Current question or result */}
      {result ? (
        <div className="rounded-sm border border-accent-sunset/40 bg-accent-sunset/10 p-xl text-center">
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            决策结果
          </div>
          <p className="text-body-lg text-ink">{result}</p>
        </div>
      ) : currentNode ? (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-xl">
          <div className="mb-lg text-center">
            <span className="font-mono text-caption-mono-sm text-body-mid">
              {path.length === 0 ? startLabel : `步骤 ${path.length + 1}`}
            </span>
            <h4 className="mt-md text-body-lg text-ink">{currentNode.question}</h4>
          </div>
          <div className="grid grid-cols-2 gap-lg">
            <button
              type="button"
              onClick={() => handleChoice('yes')}
              className="rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-xl text-center transition-colors hover:bg-accent-sunset/10"
            >
              <span className="font-mono text-caption-mono-sm text-accent-sunset">是</span>
              <p className="mt-sm text-body-sm text-body">{currentNode.yesLabel}</p>
            </button>
            <button
              type="button"
              onClick={() => handleChoice('no')}
              className="rounded-sm border border-accent-dusk/30 bg-accent-dusk/5 p-xl text-center transition-colors hover:bg-accent-dusk/10"
            >
              <span className="font-mono text-caption-mono-sm text-accent-dusk">否</span>
              <p className="mt-sm text-body-sm text-body">{currentNode.noLabel}</p>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
