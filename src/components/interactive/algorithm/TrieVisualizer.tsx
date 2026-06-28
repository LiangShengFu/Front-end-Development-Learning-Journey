/**
 * TrieVisualizer - Trie 字典树可视化
 *
 * 逐字符插入构建前缀树，高亮前缀路径，区分 search（精确）与 startsWith（前缀）。
 */
import { useEffect, useState } from 'react'
import type { TrieVisualizerData } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface TrieVisualizerProps {
  data?: TrieVisualizerData
}

interface TrieNode {
  char: string
  children: Map<string, TrieNode>
  isEnd: boolean
  /** 临时高亮标记（插入/搜索时） */
  highlight?: 'insert' | 'search' | 'prefix' | 'miss'
}

const DEFAULT_WORDS = ['app', 'apple', 'apply', 'bat', 'bath']

/** 创建 Trie 节点 */
function createNode(char: string): TrieNode {
  return { char, children: new Map(), isEnd: false }
}

/** 构建完整 Trie，返回根节点和所有节点列表 */
function buildTrie(words: string[]): { root: TrieNode; allNodes: { node: TrieNode; parentId: string | null; id: string }[] } {
  const root = createNode('')
  const allNodes: { node: TrieNode; parentId: string | null; id: string }[] = []
  let idCounter = 0

  function addNode(node: TrieNode, parentId: string | null) {
    const id = `n${idCounter++}`
    allNodes.push({ node, parentId, id })
    for (const [, child] of node.children) {
      addNode(child, id)
    }
  }

  for (const word of words) {
    let node = root
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, createNode(ch))
      }
      node = node.children.get(ch)!
    }
    node.isEnd = true
  }

  addNode(root, null)
  return { root, allNodes }
}

/** 计算 Trie 节点位置（按层级布局） */
function layoutTrie(allNodes: { node: TrieNode; parentId: string | null; id: string }[]) {
  const levelMap = new Map<string, number>()
  levelMap.set('n0', 0)

  // 计算每个节点的层级
  for (const item of allNodes) {
    if (item.id === 'n0') continue
    let level = 0
    let parentId = item.parentId
    while (parentId !== null) {
      level++
      const parent = allNodes.find((n) => n.id === parentId)
      if (!parent) break
      parentId = parent.parentId
    }
    levelMap.set(item.id, level)
  }

  // 按层级分组，计算 x 位置
  const byLevel = new Map<number, string[]>()
  for (const [id, level] of levelMap) {
    if (!byLevel.has(level)) byLevel.set(level, [])
    byLevel.get(level)!.push(id)
  }

  const positions = new Map<string, { x: number; y: number }>()
  const maxLevel = Math.max(...levelMap.values(), 0)
  for (const [level, ids] of byLevel) {
    ids.forEach((id, idx) => {
      positions.set(id, {
        x: (idx + 0.5) / ids.length,
        y: level,
      })
    })
  }

  return { positions, maxLevel }
}

export function TrieVisualizer({ data }: TrieVisualizerProps) {
  const words = data?.words ?? DEFAULT_WORDS

  const [insertedWords, setInsertedWords] = useState<string[]>([])
  const [inputWord, setInputWord] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [searchMode, setSearchMode] = useState<'search' | 'startsWith'>('search')
  const [searchResult, setSearchResult] = useState<string>('')
  const [highlightPath, setHighlightPath] = useState<Set<string>>(new Set())

  const { root, allNodes } = buildTrie(insertedWords)
  const { positions, maxLevel } = layoutTrie(allNodes)

  /** 插入单词（逐字符动画） */
  const insertWord = (word: string) => {
    if (!word || insertedWords.includes(word)) return
    setInsertedWords([...insertedWords, word])
    setInputWord('')
  }

  /** 批量插入预设单词 */
  const insertAll = () => {
    setInsertedWords([...words])
  }

  /** 搜索 / 前缀查询 */
  const handleSearch = () => {
    if (!searchWord) return
    let node = root
    const path = new Set<string>()
    path.add('n0')

    for (const ch of searchWord) {
      const child = node.children.get(ch)
      const currentId = allNodes.find((n) => n.node === node)?.id
      if (currentId) path.add(currentId)
      if (!child) {
        setHighlightPath(path)
        setSearchResult(`${searchMode === 'search' ? 'search' : 'startsWith'}("${searchWord}") → false（路径不存在）`)
        setTimeout(() => setHighlightPath(new Set()), 2000)
        return
      }
      node = child
    }
    const lastId = allNodes.find((n) => n.node === node)?.id
    if (lastId) path.add(lastId)
    setHighlightPath(path)

    if (searchMode === 'search') {
      const found = node.isEnd
      setSearchResult(`search("${searchWord}") → ${found}${found ? '（完整单词）' : '（路径存在但非完整单词）'}`)
    } else {
      setSearchResult(`startsWith("${searchWord}") → true（前缀存在）`)
    }
    setTimeout(() => setHighlightPath(new Set()), 3000)
  }

  const reset = () => {
    setInsertedWords([])
    setInputWord('')
    setSearchWord('')
    setSearchResult('')
    setHighlightPath(new Set())
  }

  useEffect(() => {
    insertAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const treeHeight = (maxLevel + 1) * 60 + 40

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 控制栏 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={insertAll} className="btn-pill">
          插入预设单词
        </button>
        <button type="button" onClick={reset} className="btn-pill text-body-mid">
          清空
        </button>
      </div>

      {/* 插入区 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">插入：</span>
        <input
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && insertWord(inputWord)}
          placeholder="单词"
          className="w-32 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        <button type="button" onClick={() => insertWord(inputWord)} className="btn-pill">
          insert
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          已插入：{insertedWords.length > 0 ? insertedWords.join(', ') : '（空）'}
        </span>
      </div>

      {/* 搜索区 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">查询：</span>
        <select
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value as 'search' | 'startsWith')}
          className="rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none"
        >
          <option value="search">search（精确）</option>
          <option value="startsWith">startsWith（前缀）</option>
        </select>
        <input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="查询词"
          className="w-32 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        <button type="button" onClick={handleSearch} className="btn-pill">
          查询
        </button>
        {searchResult && (
          <span className="ml-sm font-mono text-caption-mono-sm text-accent-sunset">{searchResult}</span>
        )}
      </div>

      {/* Trie 树视图 */}
      <div className="mb-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          Trie 字典树（根节点 = 空字符串）
        </div>
        <div className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md" style={{ minHeight: treeHeight }}>
          {allNodes.length <= 1 ? (
            <div className="flex h-20 items-center justify-center text-body-sm text-body-mid">
              点击"插入预设单词"开始构建
            </div>
          ) : (
            <svg width="100%" height={treeHeight} className="block">
              {/* 边 */}
              {allNodes.map((item) => {
                if (item.parentId === null) return null
                const parentPos = positions.get(item.parentId)
                const childPos = positions.get(item.id)
                if (!parentPos || !childPos) return null
                return (
                  <line
                    key={`edge-${item.id}`}
                    x1={`${parentPos.x * 100}%`}
                    y1={parentPos.y * 60 + 30}
                    x2={`${childPos.x * 100}%`}
                    y2={childPos.y * 60 + 30}
                    stroke="currentColor"
                    className="text-hairline"
                    strokeWidth={1.5}
                  />
                )
              })}
              {/* 节点 */}
              {allNodes.map((item) => {
                const pos = positions.get(item.id)
                if (!pos) return null
                const isRoot = item.id === 'n0'
                const isInPath = highlightPath.has(item.id)
                return (
                  <g key={item.id}>
                    <circle
                      cx={`${pos.x * 100}%`}
                      cy={pos.y * 60 + 30}
                      r={isRoot ? 14 : 16}
                      className={cn(
                        'transition-all duration-300',
                        isInPath
                          ? 'fill-accent-sunset/20 stroke-accent-sunset'
                          : item.node.isEnd
                            ? 'fill-accent-breeze/15 stroke-accent-breeze'
                            : 'fill-canvas-card stroke-hairline',
                      )}
                      strokeWidth={isInPath ? 2.5 : item.node.isEnd ? 2 : 1}
                    />
                    <text
                      x={`${pos.x * 100}%`}
                      y={pos.y * 60 + 35}
                      textAnchor="middle"
                      className={cn(
                        'font-mono text-caption-mono',
                        isRoot ? 'fill-body-mid' : 'fill-ink',
                      )}
                    >
                      {isRoot ? '∅' : item.node.char}
                    </text>
                    {item.node.isEnd && (
                      <text
                        x={`${pos.x * 100}%`}
                        y={pos.y * 60 + 52}
                        textAnchor="middle"
                        className="fill-accent-breeze font-mono text-caption-mono-sm"
                        style={{ fontSize: '9px' }}
                      >
                        ●end
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          )}
        </div>
      </div>

      {/* 图例 */}
      <div className="flex flex-wrap gap-md rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="flex items-center gap-xs">
          <div className="h-3 w-3 rounded-full border border-accent-breeze bg-accent-breeze/15" />
          <span className="font-mono text-caption-mono-sm text-body-mid">isEnd = true（完整单词结尾）</span>
        </div>
        <div className="flex items-center gap-xs">
          <div className="h-3 w-3 rounded-full border border-accent-sunset bg-accent-sunset/20" />
          <span className="font-mono text-caption-mono-sm text-body-mid">查询高亮路径</span>
        </div>
        <div className="flex items-center gap-xs">
          <div className="h-3 w-3 rounded-full border border-hairline bg-canvas-card" />
          <span className="font-mono text-caption-mono-sm text-body-mid">普通节点</span>
        </div>
      </div>
    </div>
  )
}
