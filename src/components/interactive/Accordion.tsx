/**
 * Accordion - 手风琴折叠面板
 *
 * 可折叠的内容面板，支持单展开/多展开模式。
 * 遵循设计规范：canvas-card 背景，hairline 边框，展开时左侧 accent 条。
 */
import { useState } from 'react'
import type { AccordionData } from '../../lib/types'
import { cn } from '../../lib/utils'
import { CodeBlock } from '../ui/CodeBlock'

interface AccordionProps {
  data: AccordionData
}

export function Accordion({ data }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    () => new Set(data.defaultOpen ?? []),
  )

  const toggle = (idx: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        if (!data.multiple) {
          next.clear()
        }
        next.add(idx)
      }
      return next
    })
  }

  return (
    <div className="space-y-sm">
      {data.items.map((item, i) => {
        const isOpen = openItems.has(i)
        return (
          <div
            key={i}
            className={cn(
              'overflow-hidden rounded-sm border bg-canvas-card transition-colors',
              isOpen ? 'border-accent-sunset/40' : 'border-hairline',
            )}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-lg px-xl py-lg text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-md">
                <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-body-md text-ink">{item.title}</span>
              </div>
              <span
                className={cn(
                  'flex h-6 w-6 flex-shrink-0 items-center justify-center text-body-mid transition-transform duration-200',
                  isOpen && 'rotate-45',
                )}
                aria-hidden
              >
                +
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-hairline px-xl py-lg">
                <p className="text-body-md text-body">{item.content}</p>
                {item.code && (
                  <div className="mt-lg">
                    <CodeBlock code={item.code} language={item.codeLanguage ?? 'text'} />
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
