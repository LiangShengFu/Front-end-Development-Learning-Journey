/**
 * DomTreeVisualizer - DOM 树结构可视化
 *
 * 点击按钮增删改 DOM 节点，左侧实时渲染 DOM 树，右侧同步显示 HTML 结构字符串。
 */
import { useState, useCallback } from 'react'
import type { DomTreeVisualizerData } from '../../../lib/dom-bom-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, PillBtn, CodeOutput } from './shared'

interface DomTreeVisualizerProps {
  data: DomTreeVisualizerData
}

interface TreeNode {
  id: string
  tag: string
  text?: string
  children: TreeNode[]
}

let idCounter = 0
const genId = () => `n${++idCounter}`

const initialTree: TreeNode = {
  id: genId(),
  tag: 'div',
  children: [
    { id: genId(), tag: 'h1', text: '标题', children: [] },
    { id: genId(), tag: 'p', text: '段落', children: [] },
  ],
}

/** 递归渲染树节点为缩进文本 */
function treeToHtml(node: TreeNode, depth = 0): string {
  const indent = '  '.repeat(depth)
  if (node.text !== undefined) {
    return `${indent}<${node.tag}>${node.text}</${node.tag}>`
  }
  if (node.children.length === 0) {
    return `${indent}<${node.tag}></${node.tag}>`
  }
  const inner = node.children.map((c) => treeToHtml(c, depth + 1)).join('\n')
  return `${indent}<${node.tag}>\n${inner}\n${indent}</${node.tag}>`
}

/** 在指定节点下添加子节点 */
function addChild(tree: TreeNode, parentId: string, newChild: TreeNode): TreeNode {
  if (tree.id === parentId) {
    return { ...tree, children: [...tree.children, newChild] }
  }
  return { ...tree, children: tree.children.map((c) => addChild(c, parentId, newChild)) }
}

/** 删除节点 */
function removeNode(tree: TreeNode, nodeId: string): TreeNode {
  return {
    ...tree,
    children: tree.children
      .filter((c) => c.id !== nodeId)
      .map((c) => removeNode(c, nodeId)),
  }
}

const TAG_OPTIONS = ['div', 'span', 'p', 'h1', 'h2', 'ul', 'li', 'button']

export function DomTreeVisualizer({ data }: DomTreeVisualizerProps) {
  const [tree, setTree] = useState<TreeNode>(initialTree)
  const [selectedId, setSelectedId] = useState<string>(tree.id)
  const [newTag, setNewTag] = useState('div')

  const handleAdd = useCallback(() => {
    const child: TreeNode = { id: genId(), tag: newTag, text: newTag, children: [] }
    setTree((prev) => addChild(prev, selectedId, child))
  }, [selectedId, newTag])

  const handleRemove = useCallback(() => {
    if (selectedId === tree.id) return // 根节点不可删除
    setTree((prev) => removeNode(prev, selectedId))
    setSelectedId(tree.id)
  }, [selectedId, tree.id])

  const handleReset = useCallback(() => {
    idCounter = 0
    const fresh: TreeNode = {
      id: genId(),
      tag: 'div',
      children: [
        { id: genId(), tag: 'h1', text: '标题', children: [] },
        { id: genId(), tag: 'p', text: '段落', children: [] },
      ],
    }
    setTree(fresh)
    setSelectedId(fresh.id)
  }, [])

  const renderNode = (node: TreeNode, depth = 0) => (
    <div key={node.id} style={{ marginLeft: depth * 16 }}>
      <button
        type="button"
        onClick={() => setSelectedId(node.id)}
        className={cn(
          'flex items-center gap-xs rounded-px px-sm py-xxs font-mono text-caption-mono-sm transition-colors',
          selectedId === node.id
            ? 'bg-accent-sunset/20 text-accent-sunset'
            : 'text-body hover:bg-canvas-mid',
        )}
      >
        <span className="text-body-mid">&lt;</span>
        <span className="font-bold">{node.tag}</span>
        {node.text && <span className="text-body-mid"> {node.text} </span>}
        <span className="text-body-mid">&gt;</span>
      </button>
      {node.children.map((c) => renderNode(c, depth + 1))}
    </div>
  )

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>添加子节点</GroupLabel>
        <select
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="rounded-xs border border-hairline bg-canvas px-sm py-xxs font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
        >
          {TAG_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <PillBtn variant="primary" active onClick={handleAdd}>
          + 添加
        </PillBtn>
        <PillBtn onClick={handleRemove}>删除选中</PillBtn>
        <PillBtn onClick={handleReset}>重置</PillBtn>
      </ControlRow>

      <div className="grid grid-cols-1 gap-md p-md lg:grid-cols-2">
        {/* DOM 树 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
          <div className="mb-1 text-[0.62rem] uppercase text-body-mid">DOM 树（点击选择）</div>
          <div className="flex flex-col gap-px">{renderNode(tree)}</div>
        </div>

        {/* HTML 结构 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
          <div className="mb-1 text-[0.62rem] uppercase text-body-mid">HTML 结构</div>
          <pre className="overflow-x-auto font-mono text-caption-mono-sm text-body">
            {treeToHtml(tree)}
          </pre>
        </div>
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* 等价 DOM API */`}</span>
        {'\n'}
        <span className="text-accent-breeze">const</span> parent ={' '}
        <span className="text-accent-sunset">document.querySelector</span>(
        <span className="text-accent-sunset-soft">'{selectedId === tree.id ? 'div' : '.' + selectedId}'</span>);{'\n'}
        parent.<span className="text-accent-sunset">appendChild</span>(
        <span className="text-accent-breeze">document</span>.createElement(
        <span className="text-accent-sunset-soft">'{newTag}'</span>));
      </CodeOutput>
    </DemoCard>
  )
}
