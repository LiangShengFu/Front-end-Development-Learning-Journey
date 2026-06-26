/**
 * MFArchitectureGraphVisualizer — 微前端架构演进图
 *
 * 展示单体应用 → 微前端架构 → 共享依赖层 的演进关系：
 * - 单体架构：所有功能堆叠在一个应用中
 * - 微前端架构：Host 主应用 + 多个独立子应用
 * - 共享层：shared 依赖、公共组件库
 *
 * 交互：点击层级切换（单体 / 微前端 / 共享），节点高亮并展示详情。
 *
 * ⚠️ 教学模型：节点位置为预设示意，不自动布局。
 */
'use client'

import { useState } from 'react'
import type {
  MFArchitectureGraphData,
  MFArchGraphNode,
  MFArchGraphEdge,
  MFArchLayerId,
} from '../../../lib/microfrontend-visualization-types'
import { cn } from '../../../lib/utils'

interface MFArchitectureGraphVisualizerProps {
  data?: MFArchitectureGraphData
}

/** 默认架构演进数据 */
const DEFAULT_NODES: MFArchGraphNode[] = [
  // 单体架构层
  {
    id: 'monolith',
    label: '单体应用',
    layer: 'monolith',
    description:
      '所有功能模块（用户、订单、商品、支付）堆叠在一个应用中，共享同一份代码库与构建产物。体积膨胀、构建慢、部署耦合。',
    top: '40%',
    left: '40%',
    variant: 'center',
    color: '#ef4444',
  },
  // 微前端架构层
  {
    id: 'host',
    label: 'Host 主应用',
    layer: 'microfrontend',
    description:
      '主应用负责整体外壳、路由分发与子应用编排。通过 Module Federation remotes 或 qiankun registerMicroApps 加载子应用。',
    top: '15%',
    left: '40%',
    variant: 'center',
    color: '#1a6cff',
  },
  {
    id: 'mf-react',
    label: 'React 子应用',
    layer: 'microfrontend',
    description: '用户中心模块，使用 React 18 构建，独立开发部署。',
    top: '55%',
    left: '8%',
    variant: 'secondary',
    color: '#07c160',
  },
  {
    id: 'mf-vue',
    label: 'Vue 子应用',
    layer: 'microfrontend',
    description: '订单模块，使用 Vue 3 构建。技术栈无关是微前端的核心价值。',
    top: '55%',
    left: '38%',
    variant: 'secondary',
    color: '#a78bfa',
  },
  {
    id: 'mf-legacy',
    label: 'Legacy 子应用',
    layer: 'microfrontend',
    description: '旧版 jQuery/AngularJS 模块，通过 iframe 或 qiankun 渐进迁移，无需重写。',
    top: '55%',
    left: '68%',
    variant: 'secondary',
    color: '#f59e0b',
  },
  // 共享层
  {
    id: 'shared',
    label: 'shared 共享依赖',
    layer: 'shared',
    description:
      '通过 shared 配置共享 React/Vue 等依赖，singleton: true 确保全局单例，避免多实例冲突。',
    top: '88%',
    left: '40%',
    variant: 'leaf',
    color: '#6b7280',
  },
]

const DEFAULT_EDGES: MFArchGraphEdge[] = [
  { from: 'host', to: 'mf-react', label: '加载' },
  { from: 'host', to: 'mf-vue', label: '加载' },
  { from: 'host', to: 'mf-legacy', label: '加载' },
  { from: 'mf-react', to: 'shared', label: '共享' },
  { from: 'mf-vue', to: 'shared', label: '共享' },
  { from: 'mf-legacy', to: 'shared', label: '共享' },
]

const LAYER_LABEL: Record<MFArchLayerId, string> = {
  monolith: '单体架构',
  microfrontend: '微前端架构',
  shared: '共享层',
}

const LAYER_COLOR: Record<MFArchLayerId, string> = {
  monolith: '#ef4444',
  microfrontend: '#1a6cff',
  shared: '#6b7280',
}

/** 单体架构的简化节点（替代微前端层节点） */
const MONOLITH_NODES: MFArchGraphNode[] = [
  {
    id: 'mono-shell',
    label: '单体外壳',
    layer: 'monolith',
    description: '单一应用包含所有模块，共享 window、共享依赖、共享路由。',
    top: '15%',
    left: '40%',
    variant: 'center',
    color: '#ef4444',
  },
  {
    id: 'mono-user',
    label: '用户模块',
    layer: 'monolith',
    description: '用户功能直接写在主应用代码中，无独立部署能力。',
    top: '55%',
    left: '12%',
    variant: 'secondary',
    color: '#ef4444',
  },
  {
    id: 'mono-order',
    label: '订单模块',
    layer: 'monolith',
    description: '订单功能与主应用耦合，任何修改需重新部署整体。',
    top: '55%',
    left: '40%',
    variant: 'secondary',
    color: '#ef4444',
  },
  {
    id: 'mono-pay',
    label: '支付模块',
    layer: 'monolith',
    description: '支付模块直接依赖主应用状态，跨团队冲突频繁。',
    top: '55%',
    left: '68%',
    variant: 'secondary',
    color: '#ef4444',
  },
]

const MONOLITH_EDGES: MFArchGraphEdge[] = [
  { from: 'mono-shell', to: 'mono-user' },
  { from: 'mono-shell', to: 'mono-order' },
  { from: 'mono-shell', to: 'mono-pay' },
]

export function MFArchitectureGraphVisualizer({ data }: MFArchitectureGraphVisualizerProps) {
  const baseNodes = data?.nodes ?? DEFAULT_NODES
  const baseEdges = data?.edges ?? DEFAULT_EDGES
  const evolutionNote =
    data?.evolutionNote ??
    '演进路径：单体应用（耦合）→ 微前端架构（独立开发部署）→ 共享层（依赖治理）。每一步演进都解决上一阶段的痛点，但也引入新的复杂度（沙箱、通信、路由同步）。'

  const [activeLayer, setActiveLayer] = useState<MFArchLayerId>('microfrontend')

  // 根据当前层级选择展示的节点与连线
  // 单体层展示简化的单体节点；微前端/共享层展示完整微前端架构
  const nodes =
    activeLayer === 'monolith'
      ? MONOLITH_NODES
      : baseNodes.filter((n) => n.layer !== 'monolith')
  const edges = activeLayer === 'monolith' ? MONOLITH_EDGES : baseEdges

  // 节点位置映射，用于连线坐标计算
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  return (
    <div className="space-y-lg">
      {/* 层级切换控制 */}
      <div
        className="flex flex-wrap items-center gap-xs"
        role="group"
        aria-label="架构层级切换"
      >
        {(['monolith', 'microfrontend', 'shared'] as const).map((layer) => {
          const isActive = activeLayer === layer
          return (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              aria-pressed={isActive}
              style={
                isActive
                  ? { backgroundColor: LAYER_COLOR[layer], borderColor: LAYER_COLOR[layer] }
                  : undefined
              }
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas text-ink hover:border-ink/30',
              )}
            >
              {LAYER_LABEL[layer]}
            </button>
          )
        })}
      </div>

      {/* 架构画布 */}
      <div
        className="relative w-full overflow-hidden rounded-md border border-hairline bg-canvas-soft"
        style={{ minHeight: '320px', height: '360px' }}
        aria-label={`${LAYER_LABEL[activeLayer]} 架构图`}
      >
        {/* SVG 连线层 */}
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {edges.map((edge, i) => {
            const from = nodeMap.get(edge.from)
            const to = nodeMap.get(edge.to)
            if (!from || !to) return null
            // 百分比坐标转像素（基于画布尺寸近似计算）
            return (
              <g key={`edge-${i}`}>
                <line
                  x1={`${from.left}`}
                  y1={`${from.top}`}
                  x2={`${to.left}`}
                  y2={`${to.top}`}
                  stroke={LAYER_COLOR[activeLayer]}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
              </g>
            )
          })}
        </svg>

        {/* 节点层 */}
        {nodes.map((node) => {
          const isCenter = node.variant === 'center'
          const isSecondary = node.variant === 'secondary'
          const nodeColor = node.color ?? LAYER_COLOR[node.layer]
          // 共享层激活时，高亮 shared 节点；微前端层激活时高亮全部微前端节点
          const highlight =
            activeLayer === 'shared'
              ? node.layer === 'shared'
              : node.layer !== 'shared'
          return (
            <div
              key={node.id}
              className={cn(
                'absolute -translate-x-1/2 -translate-y-1/2 rounded-md border-2 px-md py-sm text-center transition-all',
                isCenter && 'text-body-sm font-bold',
                isSecondary && 'text-caption-mono-sm',
                highlight ? 'opacity-100' : 'opacity-40',
              )}
              style={{
                top: node.top,
                left: node.left,
                borderColor: nodeColor,
                backgroundColor: highlight ? `${nodeColor}15` : 'var(--canvas-soft)',
                color: nodeColor,
              }}
            >
              {node.label}
            </div>
          )
        })}
      </div>

      {/* 演进说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {evolutionNote}
      </p>

      {/* 当前层级节点详情 */}
      <div className="space-y-sm">
        <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
          {LAYER_LABEL[activeLayer]} · 节点说明
        </div>
        <div className="grid gap-sm sm:grid-cols-2">
          {nodes
            .filter((n) => (activeLayer === 'shared' ? n.layer === 'shared' : n.layer !== 'shared'))
            .map((node) => (
              <div
                key={node.id}
                className="rounded-sm border-l-4 p-sm"
                style={{
                  borderLeftColor: node.color ?? LAYER_COLOR[node.layer],
                  backgroundColor: `${node.color ?? LAYER_COLOR[node.layer]}08`,
                }}
              >
                <div className="mb-xxs text-body-sm font-semibold text-ink">
                  {node.label}
                </div>
                <p className="text-caption text-body">{node.description}</p>
              </div>
            ))}
        </div>
      </div>

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模型 · 节点位置为预设示意
      </p>
    </div>
  )
}
