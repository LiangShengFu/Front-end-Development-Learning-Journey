/**
 * ReflowRepaintComparator — 重排 vs 重绘对比
 *
 * 触发不同操作对比 Reflow（重排）/ Repaint（重绘）/ Composite-only 代价与优化建议。
 *
 * ⚠️ 教学模拟：展示静态操作代价与优化建议，不执行真实 DOM 操作。
 */
import { useState } from 'react'
import type {
  ReflowRepaintComparatorData,
  ReflowRepaintOperation,
  OperationType,
} from '../../../lib/browser-network-visualization-types'
import { cn } from '../../../lib/utils'

interface ReflowRepaintComparatorProps {
  data?: ReflowRepaintComparatorData
}

/** 默认操作列表 */
const DEFAULT_OPERATIONS: ReflowRepaintOperation[] = [
  {
    id: 'width',
    label: '修改 width/height',
    type: 'reflow',
    cost: 'high',
    costDescription: '触发 Layout → Paint → Composite 全流程，需重新计算所有受影响节点的几何信息',
    code: `// 高代价：触发重排
element.style.width = '200px';`,
    codeLanguage: 'js',
    optimization: '使用 transform: scale() 代替尺寸变化；或使用 CSS transition 配合 will-change',
    color: '#ef4444',
  },
  {
    id: 'left',
    label: '修改 left/top',
    type: 'reflow',
    cost: 'high',
    costDescription: '修改定位属性触发重排，影响兄弟节点位置计算',
    code: `// 高代价：触发重排
element.style.left = '100px';`,
    codeLanguage: 'js',
    optimization: '使用 transform: translate() 代替 left/top，仅触发合成',
    color: '#ef4444',
  },
  {
    id: 'color',
    label: '修改 color/background',
    type: 'repaint',
    cost: 'medium',
    costDescription: '触发 Paint → Composite，不重新计算几何信息，但需重新绘制像素',
    code: `// 中代价：触发重绘
element.style.color = 'red';
element.style.background = '#1a6cff';`,
    codeLanguage: 'js',
    optimization: '减少重绘频率；动画时使用 opacity 代替 visibility',
    color: '#f59e0b',
  },
  {
    id: 'visibility',
    label: '修改 visibility',
    type: 'repaint',
    cost: 'medium',
    costDescription: '触发重绘，元素仍在 Render Tree 中（与 display:none 不同）',
    code: `// 中代价：触发重绘
element.style.visibility = 'hidden';`,
    codeLanguage: 'js',
    optimization: '需要保留布局位置时使用 visibility；否则用 opacity 触发合成',
    color: '#f59e0b',
  },
  {
    id: 'transform',
    label: '修改 transform',
    type: 'composite-only',
    cost: 'low',
    costDescription: '仅触发合成，由 GPU 处理，性能最佳（推荐动画属性）',
    code: `// 低代价：仅合成
element.style.transform = 'translateX(100px)';`,
    codeLanguage: 'js',
    optimization: '动画优先使用 transform 和 opacity，配合 will-change 提示浏览器',
    color: '#07c160',
  },
  {
    id: 'opacity',
    label: '修改 opacity',
    type: 'composite-only',
    cost: 'low',
    costDescription: '仅触发合成，GPU 直接处理图层透明度，性能最佳',
    code: `// 低代价：仅合成
element.style.opacity = '0.5';`,
    codeLanguage: 'js',
    optimization: '淡入淡出动画使用 opacity，避免 visibility 切换',
    color: '#07c160',
  },
]

const DEFAULT_CONCEPTS = {
  reflow: 'Reflow（重排/Layout）：当改变几何属性（尺寸、位置）时，浏览器需重新计算所有受影响节点的布局。代价最高，可能引发整个文档的重新布局。',
  repaint: 'Repaint（重绘/Paint）：当改变视觉属性（颜色、背景）时，浏览器需重新绘制像素，但不重新计算布局。代价中等。',
  composite: 'Composite（合成）：当改变 transform/opacity 时，仅由 GPU 合成图层，不触发 Layout 和 Paint。代价最低，是动画首选。',
}

const TYPE_LABEL: Record<OperationType, string> = {
  'reflow': '重排 Reflow',
  'repaint': '重绘 Repaint',
  'composite-only': '仅合成 Composite',
}

const COST_LABEL = {
  low: { text: '低代价', color: '#07c160', bg: 'rgba(7,193,96,0.12)' },
  medium: { text: '中代价', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  high: { text: '高代价', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
}

export function ReflowRepaintComparator({ data }: ReflowRepaintComparatorProps) {
  const operations = data?.operations ?? DEFAULT_OPERATIONS
  const concepts = data?.concepts ?? DEFAULT_CONCEPTS
  const [selectedId, setSelectedId] = useState<string>(operations[0]?.id ?? '')

  const selected = operations.find((op) => op.id === selectedId) ?? operations[0]

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示静态操作代价与优化建议，不执行真实 DOM 操作。
      </div>

      {/* 概念说明 */}
      <div className="grid grid-cols-1 gap-sm md:grid-cols-3">
        <div className="rounded-sm border border-[#ef4444]/30 bg-[#ef4444]/5 p-md">
          <h4 className="mb-xs font-mono text-caption-mono-sm text-[#ef4444]">Reflow 重排</h4>
          <p className="text-caption-sm text-body-mid leading-relaxed">{concepts.reflow}</p>
        </div>
        <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/5 p-md">
          <h4 className="mb-xs font-mono text-caption-mono-sm text-[#f59e0b]">Repaint 重绘</h4>
          <p className="text-caption-sm text-body-mid leading-relaxed">{concepts.repaint}</p>
        </div>
        <div className="rounded-sm border border-[#07c160]/30 bg-[#07c160]/5 p-md">
          <h4 className="mb-xs font-mono text-caption-mono-sm text-[#07c160]">Composite 合成</h4>
          <p className="text-caption-sm text-body-mid leading-relaxed">{concepts.composite}</p>
        </div>
      </div>

      {/* 操作选择 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <h4 className="mb-sm font-mono text-body-sm text-body-hi">选择操作对比代价</h4>
        <div className="flex flex-wrap gap-xs">
          {operations.map((op) => {
            const isActive = op.id === selectedId
            const cost = COST_LABEL[op.cost]
            return (
              <button
                key={op.id}
                onClick={() => setSelectedId(op.id)}
                className={cn(
                  'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-all',
                  isActive
                    ? 'text-white'
                    : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
                )}
                style={isActive ? { background: op.color } : undefined}
              >
                {op.label}
                <span
                  className={cn('ml-xs rounded-pill px-xs py-xxs', !isActive && '')}
                  style={!isActive ? { background: cost.bg, color: cost.color } : undefined}
                >
                  {cost.text}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 选中操作详情 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* 左：代价分析 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: selected.color }} />
              <h4 className="font-mono text-body-sm text-body-hi">{selected.label}</h4>
            </div>
            <span
              className="rounded-pill px-sm py-xxs font-mono text-caption-mono-sm"
              style={{ background: COST_LABEL[selected.cost].bg, color: COST_LABEL[selected.cost].color }}
            >
              {COST_LABEL[selected.cost].text}
            </span>
          </div>
          <div className="mb-md space-y-sm">
            <div className="flex items-start gap-sm">
              <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">类型</span>
              <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{TYPE_LABEL[selected.type]}</span>
            </div>
            <div className="flex items-start gap-sm">
              <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">代价</span>
              <span className="min-w-0 flex-1 text-caption-sm text-body-mid leading-relaxed">{selected.costDescription}</span>
            </div>
          </div>
          {/* 渲染管线影响示意 */}
          <div className="rounded-sm bg-canvas-bg-inset p-md">
            <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">渲染管线影响</div>
            <div className="flex flex-wrap items-center gap-xs font-mono text-caption-mono-sm">
              {(['Layout', 'Paint', 'Composite'] as const).map((stage) => {
                const isAffected =
                  (selected.type === 'reflow') ||
                  (selected.type === 'repaint' && (stage === 'Paint' || stage === 'Composite')) ||
                  (selected.type === 'composite-only' && stage === 'Composite')
                return (
                  <span
                    key={stage}
                    className={cn(
                      'rounded-pill px-sm py-xxs',
                      isAffected ? 'text-white' : 'bg-canvas-bg-inset text-body-mid line-through'
                    )}
                    style={isAffected ? { background: selected.color } : undefined}
                  >
                    {stage}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        {/* 右：代码 + 优化建议 */}
        <div className="min-w-0 space-y-md">
          <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
            <div className="mb-sm flex items-center justify-between">
              <h4 className="font-mono text-body-sm text-body-hi">触发代码</h4>
              {selected.codeLanguage && (
                <span className="rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">
                  {selected.codeLanguage}
                </span>
              )}
            </div>
            <pre className="min-w-0 overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
              <code>{selected.code}</code>
            </pre>
          </div>
          <div className="rounded-sm border border-[#07c160]/30 bg-[#07c160]/5 p-lg">
            <h4 className="mb-sm font-mono text-caption-mono-sm text-[#07c160]">✓ 优化建议</h4>
            <p className="text-caption-sm text-body-mid leading-relaxed">{selected.optimization}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
