/**
 * SelectorPlayground - 选择器实时匹配
 *
 * 复刻旧项目 sel-playground 的交互逻辑：
 * - 输入 CSS 选择器，实时高亮匹配的 DOM 元素
 * - 样例元素渲染为真实 DOM，直接在其上运行 querySelectorAll
 * - 快捷示例选择器按钮
 * - 匹配数量统计与代码输出
 */
import { useEffect, useRef, useState, createElement as h } from 'react'
import type { SelectorPlaygroundData, SelectorSampleElement } from '../../../lib/css-visualization-types'
import { cn } from '../../../lib/utils'
import { ControlRow, GroupLabel, Divider, PillBtn, CodeOutput, CommentLine } from './shared'

interface SelectorPlaygroundProps {
  data: SelectorPlaygroundData
}

export function SelectorPlayground({ data }: SelectorPlaygroundProps) {
  const [selector, setSelector] = useState(data.defaultSelector ?? '.link')
  const [matchCount, setMatchCount] = useState(0)
  const [matchedKeys, setMatchedKeys] = useState<Set<string>>(new Set())
  const [error, setError] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  // 每个样例元素的唯一 key
  const elements = data.sampleElements.map((el, i) => ({ ...el, key: `sel-el-${i}` }))

  const computeMatches = (sel: string) => {
    const stage = stageRef.current
    if (!stage) return
    if (!sel.trim()) {
      setMatchedKeys(new Set())
      setMatchCount(0)
      setError(false)
      return
    }
    try {
      const matched = stage.querySelectorAll(sel)
      const keys = new Set<string>()
      matched.forEach((node) => {
        const key = (node as HTMLElement).dataset.selKey
        if (key) keys.add(key)
      })
      setMatchedKeys(keys)
      setMatchCount(matched.length)
      setError(false)
    } catch {
      setMatchedKeys(new Set())
      setMatchCount(0)
      setError(true)
    }
  }

  // 选择器变化时重新匹配 DOM（同步外部 DOM 状态到 React，属于 effect 的合理用途）
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    computeMatches(selector)
  }, [selector])

  const handleInput = (value: string) => {
    setSelector(value)
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card">
      {data.title && (
        <div className="border-b border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}

      {/* 样例 DOM 展示区（同时作为 querySelectorAll 的目标） */}
      <div className="bg-canvas p-lg">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          样例 DOM
        </div>
        <div ref={stageRef} className="space-y-xs">
          {elements.map((el) => (
            <SampleElement
              key={el.key}
              element={el}
              matched={matchedKeys.has(el.key)}
            />
          ))}
        </div>
      </div>

      {/* 输入区 */}
      <ControlRow>
        <GroupLabel>选择器</GroupLabel>
        <input
          type="text"
          value={selector}
          onChange={(e) => handleInput(e.target.value)}
          className={cn(
            'flex-1 rounded-pill border bg-canvas px-md py-xxs font-mono text-caption-mono text-body outline-none transition-colors',
            error ? 'border-red-400' : 'border-hairline focus:border-accent-sunset',
          )}
          placeholder="输入 CSS 选择器..."
        />
        <Divider />
        <span className={cn('font-mono text-caption-mono-sm', error ? 'text-red-400' : 'text-accent-sunset')}>
          {error ? '无效选择器' : `匹配 ${matchCount} 个`}
        </span>
      </ControlRow>

      {/* 快捷选择器 */}
      {data.quickSelectors && data.quickSelectors.length > 0 && (
        <ControlRow>
          <GroupLabel>快捷示例</GroupLabel>
          {data.quickSelectors.map((sel) => (
            <PillBtn key={sel} active={selector === sel} onClick={() => handleInput(sel)}>
              {sel}
            </PillBtn>
          ))}
        </ControlRow>
      )}

      {/* 代码输出 */}
      <CodeOutput>
        <CommentLine>当前选择器</CommentLine>
        {'\n'}
        <span className="text-accent-sunset">{selector}</span>
        <span className="text-body-mid"> {'{'}</span>
        {'\n  '}
        <span className="text-accent-sunset-soft">outline</span>
        <span className="text-body-mid">: </span>
        <span className="text-accent-sunset">2px solid #f3727f</span>
        <span className="text-body-mid">;</span>
        {'\n'}
        <span className="text-body-mid">{'}'}</span>
        {'\n\n'}
        <CommentLine>
          匹配 {matchCount} 个元素{error ? '（选择器语法错误）' : ''}
        </CommentLine>
      </CodeOutput>
    </div>
  )
}

/** 渲染单个样例元素为真实 DOM 节点 */
function SampleElement({
  element,
  matched,
}: {
  element: SelectorSampleElement & { key: string }
  matched: boolean
}) {
  const { tag, id, classes, text, indent, block, key } = element
  // 构建标签显示文本
  const idPart = id ? `#${id}` : ''
  const classPart = classes && classes.length > 0 ? `.${classes.join('.')}` : ''
  const label = `<${tag}${idPart}${classPart}>`

  // 使用 createElement 渲染真实标签名，确保 querySelectorAll('tag') 能匹配
  return h(
    tag,
    {
      'data-sel-key': key,
      id,
      className: cn(classes, block && 'block'),
      style: { marginLeft: `${(indent ?? 0) * 20}px`, display: block ? 'block' : 'inline-block' },
    },
    <span
      className={cn(
        'inline-block rounded-xs border px-sm py-xxs font-mono text-caption-mono transition-all',
        matched
          ? 'border-accent-sunset bg-accent-sunset/20 text-accent-sunset'
          : 'border-hairline bg-canvas-mid text-body-mid',
      )}
    >
      {label}
      {text && <span className="ml-xs text-body-mid">{text}</span>}
    </span>,
  )
}
