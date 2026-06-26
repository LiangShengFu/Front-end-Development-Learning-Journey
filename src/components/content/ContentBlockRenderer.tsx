/**
 * ContentBlockRenderer - 内容块渲染器
 *
 * 将 ContentBlock 数据结构渲染为对应的 React 组件。
 * 这是模块内容展示的核心：所有知识点的 blocks 都通过此组件渲染。
 */
import type { ContentBlock } from '../../lib/types'
import { CodeBlock } from '../ui/CodeBlock'
import { Callout } from '../ui/Callout'
import { VisualizationRenderer } from './VisualizationRenderer'
import { cn } from '../../lib/utils'

interface ContentBlockRendererProps {
  block: ContentBlock
}

export function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  switch (block.type) {
    case 'heading':
      return <HeadingRenderer block={block} />

    case 'paragraph':
      return (
        <p className={cn('text-body-md text-body', block.lead && 'text-body-lg')}>{block.text}</p>
      )

    case 'code':
      return (
        <CodeBlock
          code={block.code}
          language={block.language}
          filename={block.filename}
          showLineNumbers={block.showLineNumbers}
        />
      )

    case 'list':
      return block.ordered ? (
        <ol className="space-y-sm text-body-md text-body">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-md">
              <span className="font-mono text-caption-mono text-body-mid">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-sm text-body-md text-body">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-md">
              <span className="mt-[8px] h-[1px] w-sm flex-shrink-0 bg-body-mid" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'callout':
      return (
        <Callout title={block.title} variant={block.variant ?? 'info'}>
          {block.text}
        </Callout>
      )

    case 'quote':
      return (
        <blockquote className="border-l-2 border-accent-sunset pl-xl text-body-lg text-ink">
          <p>{block.text}</p>
          {block.source && (
            <footer className="mt-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              — {block.source}
            </footer>
          )}
        </blockquote>
      )

    case 'table':
      return (
        <div className="overflow-x-auto rounded-sm border border-hairline">
          <table className="w-full">
            {block.caption && (
              <caption className="px-lg py-sm text-left font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                {block.caption}
              </caption>
            )}
            <thead className="bg-canvas-soft">
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-hairline px-lg py-md text-left font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-hairline last:border-b-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-lg py-md text-body-sm text-body">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'divider':
      return <hr className="border-t border-hairline" />

    case 'demo':
      return <VisualizationRenderer block={block} />

    default:
      return null
  }
}

function HeadingRenderer({ block }: { block: Extract<ContentBlock, { type: 'heading' }> }) {
  const className = cn(
    'font-sans font-normal text-ink',
    block.level === 1 && 'text-display-md tracking-display',
    block.level === 2 && 'text-display-sm tracking-display',
    block.level === 3 && 'text-display-xs',
    block.level === 4 && 'text-body-lg',
  )

  return (
    <div>
      {block.eyebrow && (
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          {block.eyebrow}
        </div>
      )}
      {block.level === 1 && <h1 className={className}>{block.text}</h1>}
      {block.level === 2 && <h2 className={className}>{block.text}</h2>}
      {block.level === 3 && <h3 className={className}>{block.text}</h3>}
      {block.level === 4 && <h4 className={className}>{block.text}</h4>}
    </div>
  )
}
