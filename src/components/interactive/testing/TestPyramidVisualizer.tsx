/**
 * TestPyramidVisualizer — 测试金字塔可视化
 *
 * 展示测试金字塔三层模型：
 * - E2E（少）：慢、不稳定，但能验证真实用户流程
 * - 集成（适量）：验证多个模块协作
 * - 单元（大量）：快、稳定，覆盖核心逻辑
 *
 * 交互：点击层级高亮并展示占比/速度/稳定性/策略/工具。
 *
 * ⚠️ 教学模型：实际比例因项目而异，并非固定数值。
 */
import { useState } from 'react'
import type {
  TestPyramidVisualizerData,
  TestPyramidLayer,
} from '../../../lib/testing-visualization-types'
import { cn } from '../../../lib/utils'

interface TestPyramidVisualizerProps {
  data?: TestPyramidVisualizerData
}

/** 默认三层金字塔数据 */
const DEFAULT_LAYERS: TestPyramidLayer[] = [
  {
    id: 'e2e',
    name: 'E2E 测试',
    description: '端到端测试模拟真实用户操作流程（如登录、下单、CRUD），覆盖关键路径，验证整体业务可用性。',
    ratio: 10,
    speed: 'slow',
    stability: 'low',
    strategy: '少而精：聚焦核心用户路径（如登录、支付），不追求高覆盖率',
    tools: ['Playwright', 'Cypress', 'Puppeteer'],
    color: '#ec4899',
  },
  {
    id: 'integration',
    name: '集成测试',
    description: '验证多个模块协作是否符合预期，例如组件 + API + 数据库的组合行为，发现接口契约问题。',
    ratio: 30,
    speed: 'medium',
    stability: 'medium',
    strategy: '适量覆盖：重点测试模块边界与接口契约，弥补单元测试盲区',
    tools: ['Vitest', 'Testing Library', 'MSW'],
    color: '#f59e0b',
  },
  {
    id: 'unit',
    name: '单元测试',
    description: '测试最小可测试单元（函数/方法/组件）的输入输出，速度最快、最稳定，是测试金字塔的基石。',
    ratio: 60,
    speed: 'fast',
    stability: 'high',
    strategy: '大量覆盖：核心逻辑、纯函数、工具函数必须有单元测试',
    tools: ['Vitest', 'Jest', 'uvu'],
    color: '#07c160',
  },
]

const SPEED_LABEL: Record<string, string> = {
  slow: '慢',
  medium: '中',
  fast: '快',
}

const STABILITY_LABEL: Record<string, string> = {
  low: '低',
  medium: '中',
  high: '高',
}

export function TestPyramidVisualizer({ data }: TestPyramidVisualizerProps) {
  const layers = data?.layers ?? DEFAULT_LAYERS
  const principleNote =
    data?.principleNote ??
    '测试金字塔原则：单元测试多、E2E 测试少。E2E 测试慢且不稳定，单元测试快且可靠——按金字塔比例分配测试投入。'
  const [selectedId, setSelectedId] = useState<TestPyramidLayer['id'] | null>('unit')
  const selected = layers.find((l) => l.id === selectedId)

  return (
    <div className="space-y-lg">
      {/* 金字塔图形（自上而下：E2E → 集成 → 单元） */}
      <div className="flex flex-col items-center gap-xs">
        {layers.map((layer, idx) => {
          // 自上而下宽度递增：顶部最窄、底部最宽。
          // 优先使用与默认数据匹配的预设宽度；若自定义数据 ID 不同，则按索引等比计算，保证始终有有效宽度。
          const presetWidth: Record<string, string> = {
            e2e: '40%',
            integration: '70%',
            unit: '100%',
          }
          const fallbackWidth = `${40 + (idx * 60) / Math.max(layers.length - 1, 1)}%`
          const width = presetWidth[layer.id] ?? fallbackWidth
          const isActive = selectedId === layer.id
          return (
            <button
              key={layer.id}
              onClick={() => setSelectedId(layer.id)}
              aria-pressed={isActive}
              style={{ width, backgroundColor: isActive ? layer.color : undefined }}
              className={cn(
                'flex items-center justify-center rounded-md border-2 px-md py-md text-body-sm font-semibold transition-all',
                isActive
                  ? 'border-transparent text-white shadow-md'
                  : 'border-hairline bg-canvas-soft text-ink hover:border-ink/30',
              )}
            >
              <span className="font-mono text-caption-mono-sm">{layer.name}</span>
              <span
                className={cn(
                  'ml-xs rounded-sm px-xs py-xxs font-mono text-caption-mono-xs',
                  isActive ? 'bg-white/20 text-white' : 'bg-canvas text-body',
                )}
              >
                {layer.ratio}%
              </span>
            </button>
          )
        })}
      </div>

      {/* 金字塔原则说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {principleNote}
      </p>

      {/* 选中层级详情 */}
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
              占比 {selected.ratio}%
            </span>
          </div>
          <p className="mb-md text-body-sm text-body">{selected.description}</p>

          {/* 速度 / 稳定性指标 */}
          <div className="mb-md grid grid-cols-2 gap-md">
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                执行速度
              </div>
              <div className="text-body-sm font-semibold text-ink">
                {SPEED_LABEL[selected.speed]}
              </div>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                稳定性
              </div>
              <div className="text-body-sm font-semibold text-ink">
                {STABILITY_LABEL[selected.stability]}
              </div>
            </div>
          </div>

          {/* 投入策略 */}
          <div className="mb-md">
            <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
              投入策略
            </div>
            <p className="text-body-sm text-ink">{selected.strategy}</p>
          </div>

          {/* 推荐工具 */}
          <div>
            <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
              推荐工具
            </div>
            <div className="mt-xs flex flex-wrap gap-xs">
              {selected.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-sm border border-hairline bg-canvas px-sm py-xxs font-mono text-caption-mono-sm text-ink"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模型 · 实际比例因项目而异
      </p>
    </div>
  )
}
