/**
 * KnowledgeGraph - 知识节点关系图
 *
 * 以力导向图样式展示知识节点之间的关系。
 * 使用简单的 SVG 布局（环形分布），无需额外依赖。
 * 遵循设计规范：canvas-card 背景，accent 色节点。
 */
import { useMemo, useState } from 'react'
import type { KnowledgeGraphData } from '../../lib/types'

interface KnowledgeGraphProps {
  data: KnowledgeGraphData
}

const groupColors: Record<string, string> = {
  default: '#ff7a17',
  core: '#ff7a17',
  related: '#7c3aed',
  detail: '#a0c3ec',
  example: '#c4b5fd',
}

export function KnowledgeGraph({ data }: KnowledgeGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  // 环形布局计算节点位置
  const layout = useMemo(() => {
    const nodes = data.nodes
    const n = nodes.length
    const cx = 250
    const cy = 200
    const radius = n > 1 ? 140 : 0

    return nodes.map((node, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2
      return {
        ...node,
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        color: groupColors[node.group ?? 'default'] ?? groupColors.default,
      }
    })
  }, [data.nodes])

  const nodeMap = useMemo(() => {
    const map = new Map(layout.map((n) => [n.id, n]))
    return map
  }, [layout])

  const activeNode = hoveredNode ?? selectedNode
  const connectedIds = useMemo(() => {
    if (!activeNode) return new Set<string>()
    const ids = new Set<string>([activeNode])
    data.edges.forEach((e) => {
      if (e.source === activeNode) ids.add(e.target)
      if (e.target === activeNode) ids.add(e.source)
    })
    return ids
  }, [activeNode, data.edges])

  return (
    <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1fr_240px]">
      {/* Graph */}
      <div className="overflow-hidden rounded-sm border border-hairline bg-canvas-card">
        <svg viewBox="0 0 500 400" className="h-full w-full" style={{ minHeight: '320px' }}>
          {/* Edges */}
          {data.edges.map((edge, i) => {
            const source = nodeMap.get(edge.source)
            const target = nodeMap.get(edge.target)
            if (!source || !target) return null
            const isActive =
              activeNode && (edge.source === activeNode || edge.target === activeNode)
            return (
              <g key={i}>
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isActive ? '#ff7a17' : '#212327'}
                  strokeWidth={isActive ? 1.5 : 1}
                  className="transition-all duration-200"
                />
                {edge.label && isActive && (
                  <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2 - 4}
                    fill="#7d8187"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {layout.map((node) => {
            const isActive = activeNode === node.id
            const isConnected = connectedIds.has(node.id)
            const r = 6 + (node.weight ?? 1) * 4
            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(isActive ? null : node.id)}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r + (isActive ? 4 : 0)}
                  fill={node.color}
                  fillOpacity={activeNode ? (isConnected ? 0.9 : 0.2) : 0.7}
                  stroke={node.color}
                  strokeWidth={isActive ? 2 : 0}
                  className="transition-all duration-200"
                />
                <text
                  x={node.x}
                  y={node.y + r + 14}
                  fill={isActive ? '#ffffff' : '#dadbdf'}
                  fontSize="11"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  className="transition-all duration-200"
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Side panel */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          {activeNode ? '节点详情' : '图例'}
        </div>
        {activeNode ? (
          <div className="mt-md">
            <div className="text-body-md text-ink">{nodeMap.get(activeNode)?.label}</div>
            <div className="mt-sm font-mono text-caption-mono-sm text-body-mid">
              ID: {activeNode}
            </div>
            {nodeMap.get(activeNode)?.group && (
              <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">
                分组: {nodeMap.get(activeNode)?.group}
              </div>
            )}
            <div className="mt-lg border-t border-hairline pt-md">
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                关联节点
              </div>
              <ul className="mt-sm space-y-xs">
                {data.edges
                  .filter((e) => e.source === activeNode || e.target === activeNode)
                  .map((e, i) => {
                    const otherId = e.source === activeNode ? e.target : e.source
                    const other = nodeMap.get(otherId)
                    return (
                      <li key={i} className="text-body-sm text-body">
                        {other?.label}
                        {e.label && (
                          <span className="ml-xs font-mono text-caption-mono-sm text-body-mid">
                            ({e.label})
                          </span>
                        )}
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-md space-y-sm">
            <p className="text-body-sm text-body">悬停或点击节点查看关联关系。</p>
            <div className="space-y-xs pt-sm">
              {Object.entries(groupColors)
                .filter(([k]) => data.nodes.some((n) => (n.group ?? 'default') === k))
                .map(([group, color]) => (
                  <div key={group} className="flex items-center gap-sm">
                    <span
                      className="h-[8px] w-[8px] rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                      {group}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
