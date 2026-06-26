/**
 * CodeBlock - 代码块组件
 *
 * 简单的语法高亮代码展示，支持行号和文件名标签。
 * 遵循设计规范：canvas-mid 背景，hairline 边框，mono 字体。
 */
import { useState } from 'react'
import { cn } from '../../lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  /** 高亮的行号（1-based） */
  highlightLines?: number[]
  className?: string
}

export function CodeBlock({
  code,
  language = 'text',
  filename,
  showLineNumbers = false,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const lines = code.replace(/\n$/, '').split('\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div className={cn('overflow-hidden rounded-sm border border-hairline bg-canvas-mid', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline px-lg py-sm">
        <div className="flex items-center gap-sm">
          <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            {language}
          </span>
          {filename && (
            <>
              <span className="text-body-mid">·</span>
              <span className="font-mono text-caption-mono-sm text-body">{filename}</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid transition-colors hover:text-ink"
          aria-label="复制代码"
        >
          {copied ? '已复制' : '复制'}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-lg">
          <code className="font-mono text-[13px] leading-[20px] text-body">
            {lines.map((line, i) => {
              const lineNum = i + 1
              const isHighlighted = highlightLines.includes(lineNum)
              return (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    isHighlighted && '-mx-lg bg-accent-sunset/10 px-lg',
                  )}
                >
                  {showLineNumbers && (
                    <span className="mr-lg inline-block w-8 select-none text-right text-body-mid/50">
                      {lineNum}
                    </span>
                  )}
                  <span className={cn(isHighlighted && 'text-ink')}>{line || ' '}</span>
                </div>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}
