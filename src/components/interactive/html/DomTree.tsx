/**
 * DomTree - DOM 文档结构树
 *
 * 以可折叠树形结构展示 HTML 文档的 DOM 层级关系。
 * 点击节点可展开/折叠子节点，并显示该元素的属性与说明。
 *
 * 设计规范：canvas-card 背景，hairline 边框，accent-sunset 高亮激活节点。
 * 字体使用 GeistMono 显示标签名，模拟"代码注释"式标识。
 */
import { useState } from 'react'
import type { DomTreeData, DomTreeNode } from '../../../lib/html-visualization-types'
import { cn } from '../../../lib/utils'

interface DomTreeProps {
  data: DomTreeData
}

export function DomTree({ data }: DomTreeProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1fr_240px]">
      {/* 树形结构 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        {data.title && (
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            {data.title}
          </div>
        )}
        <div className="font-mono text-caption-mono leading-[1.8]">
          <DomTreeNodeView
            node={data.root}
            depth={0}
            selectedTag={selectedTag}
            onSelect={setSelectedTag}
          />
        </div>
      </div>

      {/* 详情面板 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          {selectedTag ? '节点详情' : '操作提示'}
        </div>
        {selectedTag ? (
          <div className="mt-md space-y-sm">
            <div className="text-body-md text-ink">
              &lt;{selectedTag}&gt;
            </div>
            <p className="text-body-sm text-body">
              点击其他节点查看详情。这是一个 DOM 节点，代表 HTML 文档中的一个元素。
            </p>
          </div>
        ) : (
          <p className="mt-md text-body-sm text-body">
            点击树中的任意节点查看其详细信息。展开/折叠图标可切换子节点显示。
          </p>
        )}
      </div>
    </div>
  )
}

interface DomTreeNodeViewProps {
  node: DomTreeNode
  depth: number
  selectedTag: string | null
  onSelect: (tag: string) => void
}

function DomTreeNodeView({ node, depth, selectedTag, onSelect }: DomTreeNodeViewProps) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedTag === node.tag

  return (
    <div>
      <div
        className={cn(
          'flex cursor-pointer items-center gap-xs rounded-xxs px-xs py-xxs transition-colors',
          isSelected
            ? 'bg-accent-sunset/10 border-l-2 border-accent-sunset'
            : 'hover:bg-canvas-soft border-l-2 border-transparent',
        )}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onClick={() => onSelect(node.tag)}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setExpanded(!expanded)
            }}
            className="w-4 flex-shrink-0 text-body-mid hover:text-ink"
            aria-label={expanded ? '折叠' : '展开'}
          >
            {expanded ? '▾' : '▸'}
          </button>
        ) : (
          <span className="w-4 flex-shrink-0" />
        )}
        <span className="text-accent-sunset">&lt;</span>
        <span className="text-ink">{node.tag}</span>
        {node.attrs?.map((attr, i) => (
          <span key={i} className="text-accent-twilight">
            {' '}
            {attr.name}
            <span className="text-body-mid">=</span>
            <span className="text-accent-breeze">"{attr.value}"</span>
          </span>
        ))}
        <span className="text-accent-sunset">&gt;</span>
        {node.desc && (
          <span className="ml-auto pl-md text-caption-mono-sm text-body-mid">
            {node.desc}
          </span>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="border-l border-hairline ml-2">
          {node.children!.map((child, i) => (
            <DomTreeNodeView
              key={i}
              node={child}
              depth={depth + 1}
              selectedTag={selectedTag}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
