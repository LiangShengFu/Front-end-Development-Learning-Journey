/**
 * D3DataBindingFlow — D3 数据绑定三态流程
 *
 * 展示 D3.js 的核心思想：数据绑定与 enter/update/exit 三态模式。
 * - update：数据已绑定到 DOM 的部分（数据量 = DOM 量）
 * - enter：数据多于 DOM，需新增 DOM 节点
 * - exit：DOM 多于数据，需移除多余 DOM 节点
 *
 * 交互：点击「增加数据/减少数据/重置」按钮，观察三态变化与 DOM 同步。
 * 上方实时渲染柱状图（模拟 D3 选择集），下方展示三阶段代码与说明。
 *
 * ⚠️ 教学模拟：使用 React 渲染模拟 D3 选择集，不依赖 d3 库。
 */
import { useState } from 'react'
import type {
  D3DataBindingFlowData,
  D3Phase,
  D3PhaseId,
} from '../../../lib/visualization-architecture-visualization-types'
import { cn } from '../../../lib/utils'

interface D3DataBindingFlowProps {
  data?: D3DataBindingFlowData
}

/** 默认三态阶段数据 */
const DEFAULT_PHASES: D3Phase[] = [
  {
    id: 'update',
    name: 'Update（更新）',
    api: '.data(data)',
    description: '数据已绑定到现有 DOM 节点的部分。新旧数据量相等时全部为 update，可平滑过渡更新属性。',
    codeSnippet: `// 数据绑定：将 data 绑定到 selection
const update = d3.select('svg')
  .selectAll('rect')
  .data(data) // 返回 update 选择集

update
  .attr('width', d => d * 10) // 更新已有矩形宽度
  .attr('fill', '#1a6cff')`,
    trigger: '数据量 ≤ DOM 量时，已有节点进入 update 态',
    color: '#1a6cff',
  },
  {
    id: 'enter',
    name: 'Enter（进入）',
    api: '.enter()',
    description: '数据多于 DOM 的部分，需新增 DOM 节点。enter() 返回 enter 选择集，append 创建占位节点。',
    codeSnippet: `// enter 选择集：数据多于 DOM
const enter = update.enter()

// 追加新矩形并初始化
enter
  .append('rect')
  .attr('y', (d, i) => i * 25)
  .attr('width', 0) // 初始宽度 0
  .attr('fill', '#07c160')
  .merge(update) // 合并回 update 统一处理
  .transition()
  .attr('width', d => d * 10) // 过渡到目标宽度`,
    trigger: '数据量 > DOM 量时，多余数据进入 enter 态',
    color: '#07c160',
  },
  {
    id: 'exit',
    name: 'Exit（退出）',
    api: '.exit().remove()',
    description: 'DOM 多于数据的部分，需移除多余节点。exit() 返回 exit 选择集，remove 删除节点。',
    codeSnippet: `// exit 选择集：DOM 多于数据
const exit = update.exit()

// 移除多余矩形（带过渡动画）
exit
  .transition()
  .attr('width', 0) // 先收缩到 0
  .remove() // 再移除 DOM 节点`,
    trigger: '数据量 < DOM 量时，多余 DOM 进入 exit 态',
    color: '#ef4444',
  },
]

const COLOR_BY_VALUE = ['#1a6cff', '#07c160', '#f59e0b', '#a78bfa', '#ec4899', '#7d8187']

export function D3DataBindingFlow({ data }: D3DataBindingFlowProps) {
  const phases = data?.phases ?? DEFAULT_PHASES
  const threePhaseNote =
    data?.threePhaseNote ??
    'D3 数据绑定核心：.data(data) 返回 update 选择集，.enter() 返回新增选择集，.exit() 返回移除选择集。三者覆盖数据与 DOM 同步的所有情况。'

  // 模拟数据集与 DOM 集
  const [dataset, setDataset] = useState<number[]>([12, 28, 18, 35, 22])
  const [domSet, setDomSet] = useState<number[]>([12, 28, 18, 35, 22])
  const [selectedPhase, setSelectedPhase] = useState<D3PhaseId>('update')

  /** 计算三态 */
  const dataLen = dataset.length
  const domLen = domSet.length
  const updateCount = Math.min(dataLen, domLen)
  const enterCount = Math.max(0, dataLen - domLen)
  const exitCount = Math.max(0, domLen - dataLen)

  /** 应用数据变更：先更新 DOM（模拟 D3 同步） */
  const applyChange = (newData: number[]) => {
    setDataset(newData)
    // 延迟同步 DOM，让用户先看到三态差异
    setTimeout(() => setDomSet(newData), 800)
  }

  const handleAdd = () => {
    const newVal = Math.floor(Math.random() * 30) + 10
    applyChange([...dataset, newVal])
    setSelectedPhase('enter')
  }

  const handleRemove = () => {
    if (dataset.length <= 1) return
    applyChange(dataset.slice(0, -1))
    setSelectedPhase('exit')
  }

  const handleUpdate = () => {
    const newData = dataset.map((v) => Math.max(5, v + Math.floor(Math.random() * 20) - 10))
    setDataset(newData)
    setTimeout(() => setDomSet(newData), 800)
    setSelectedPhase('update')
  }

  const handleReset = () => {
    const initial = [12, 28, 18, 35, 22]
    setDataset(initial)
    setDomSet(initial)
    setSelectedPhase('update')
  }

  const selected = phases.find((p) => p.id === selectedPhase)
  const maxValue = Math.max(...dataset, ...domSet, 1)

  return (
    <div className="space-y-lg">
      {/* 三态说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {threePhaseNote}
      </p>

      {/* 控制栏 */}
      <div className="flex flex-wrap items-center gap-xs rounded-md border border-hairline bg-canvas-soft p-md">
        <button
          onClick={handleUpdate}
          className="rounded-sm bg-[#1a6cff] px-md py-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-white transition-colors hover:bg-[#1a6cff]/80"
        >
          ⟳ Update 更新
        </button>
        <button
          onClick={handleAdd}
          className="rounded-sm bg-[#07c160] px-md py-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-white transition-colors hover:bg-[#07c160]/80"
        >
          + Enter 增加
        </button>
        <button
          onClick={handleRemove}
          disabled={dataset.length <= 1}
          className="rounded-sm bg-[#ef4444] px-md py-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-white transition-colors hover:bg-[#ef4444]/80 disabled:opacity-50"
        >
          − Exit 减少
        </button>
        <button
          onClick={handleReset}
          className="rounded-sm border border-hairline bg-canvas-card px-md py-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink transition-colors hover:border-ink/30"
        >
          ↺ 重置
        </button>
      </div>

      {/* 三态计数器 */}
      <div className="grid grid-cols-3 gap-sm">
        {phases.map((phase) => {
          const count = phase.id === 'update' ? updateCount : phase.id === 'enter' ? enterCount : exitCount
          const isActive = selectedPhase === phase.id
          return (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              className={cn(
                'rounded-md border-2 p-md text-left transition-all',
                isActive ? 'text-white shadow-md' : 'bg-canvas-card hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: phase.color, borderColor: 'transparent' } : { borderColor: `${phase.color}40` }}
            >
              <div
                className="font-mono text-caption-mono-xs uppercase tracking-[1.2px]"
                style={isActive ? { color: 'rgba(255,255,255,0.8)' } : { color: phase.color }}
              >
                {phase.name}
              </div>
              <div className="mt-xs flex items-baseline gap-xs">
                <span className="text-heading-3 font-bold">{count}</span>
                <span className={cn('text-caption', isActive ? 'text-white/70' : 'text-body-mid')}>个</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* 柱状图实时渲染 */}
      <div className="rounded-md border border-hairline bg-canvas-card p-md">
        <div className="mb-sm flex items-center justify-between">
          <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
            选择集模拟（SVG 柱状图）
          </span>
          <span className="font-mono text-caption-mono-xs text-body-mid">
            数据: {dataLen} · DOM: {domLen}
          </span>
        </div>
        <svg width="100%" height={Math.max(dataset.length, domSet.length) * 28 + 20} className="overflow-visible">
          {/* exit 节点（DOM 多于数据，待移除） */}
          {domSet.slice(dataset.length).map((v, i) => (
            <g key={`exit-${i}`} style={{ transition: 'all 0.4s' }}>
              <rect
                x={0}
                y={(dataset.length + i) * 28 + 5}
                width={(v / maxValue) * 280}
                height={22}
                fill="#ef4444"
                opacity={0.4}
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="4 2"
              />
              <text
                x={(v / maxValue) * 280 + 8}
                y={(dataset.length + i) * 28 + 20}
                fontSize="11"
                fontFamily="monospace"
                fill="#ef4444"
              >
                exit · DOM 待移除
              </text>
            </g>
          ))}
          {/* update + enter 节点 */}
          {dataset.map((v, i) => {
            const isNew = i >= domSet.length
            const color = isNew ? '#07c160' : COLOR_BY_VALUE[i % COLOR_BY_VALUE.length]
            return (
              <g key={`data-${i}`} style={{ transition: 'all 0.4s' }}>
                <rect
                  x={0}
                  y={i * 28 + 5}
                  width={(v / maxValue) * 280}
                  height={22}
                  fill={color}
                  opacity={isNew ? 0.7 : 1}
                  stroke={isNew ? '#07c160' : 'none'}
                  strokeWidth={isNew ? 2 : 0}
                  strokeDasharray={isNew ? '4 2' : 'none'}
                />
                <text
                  x={8}
                  y={i * 28 + 20}
                  fontSize="11"
                  fontFamily="monospace"
                  fill="white"
                >
                  {v}
                  {isNew && ' (enter)'}
                </text>
              </g>
            )
          })}
        </svg>
        <div className="mt-sm flex flex-wrap gap-md text-caption-mono-xs">
          <span className="flex items-center gap-xs">
            <span className="inline-block h-xs w-md bg-[#1a6cff]" /> update（已绑定）
          </span>
          <span className="flex items-center gap-xs">
            <span className="inline-block h-xs w-md border-2 border-dashed border-[#07c160] bg-[#07c160]/40" /> enter（新增）
          </span>
          <span className="flex items-center gap-xs">
            <span className="inline-block h-xs w-md border-2 border-dashed border-[#ef4444] bg-[#ef4444]/40" /> exit（移除）
          </span>
        </div>
      </div>

      {/* 选中阶段详情 */}
      {selected && (
        <div
          className="rounded-md border-l-4 p-md"
          style={{ borderLeftColor: selected.color, backgroundColor: `${selected.color}10` }}
        >
          <div className="mb-sm flex items-center gap-sm">
            <h4 className="text-heading-4 text-ink">{selected.name}</h4>
            <span
              className="rounded-sm px-xs py-xxs font-mono text-caption-mono-xs text-white"
              style={{ backgroundColor: selected.color }}
            >
              {selected.api}
            </span>
          </div>
          <p className="mb-sm text-body-sm text-body">{selected.description}</p>
          <div className="mb-sm rounded-sm bg-canvas px-md py-xs">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              触发条件
            </span>
            <p className="mt-xxs text-caption text-ink">{selected.trigger}</p>
          </div>
          <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
            <code>{selected.codeSnippet}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
