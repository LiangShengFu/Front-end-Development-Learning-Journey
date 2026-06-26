/**
 * Accordion - 手风琴折叠面板 / 面试题闪卡
 *
 * 两种视图模式，学习者可自由切换：
 * - list      手风琴列表：全部题目平铺，点击展开/折叠（原默认行为）
 * - flashcard 闪卡模式：一题一屏，正面看题、翻转看答案，上下题导航
 *
 * 题量较多（如面试题 16+ 道）时，默认闪卡模式可避免列表过长。
 * 初始模式由 data.defaultMode 决定，未指定则为 'list'。
 *
 * 遵循设计规范：canvas-card 背景，hairline 边框，展开/翻转时 accent 条。
 */
import { useState } from 'react'
import type { AccordionData } from '../../lib/types'
import { cn } from '../../lib/utils'
import { CodeBlock } from '../ui/CodeBlock'

type ViewMode = 'list' | 'flashcard'

interface AccordionProps {
  data: AccordionData
}

export function Accordion({ data }: AccordionProps) {
  const [mode, setMode] = useState<ViewMode>(data.defaultMode ?? 'list')

  return (
    <div>
      {/* 视图切换栏 */}
      <div className="mb-lg flex items-center justify-between gap-md">
        <div
          role="tablist"
          aria-label="视图模式切换"
          className="inline-flex rounded-pill border border-hairline bg-canvas-soft p-xxs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'list'}
            onClick={() => setMode('list')}
            className={cn(
              'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-colors',
              mode === 'list'
                ? 'bg-canvas-card text-ink shadow-sm'
                : 'text-body-mid hover:text-ink',
            )}
          >
            列表
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'flashcard'}
            onClick={() => setMode('flashcard')}
            className={cn(
              'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-colors',
              mode === 'flashcard'
                ? 'bg-canvas-card text-ink shadow-sm'
                : 'text-body-mid hover:text-ink',
            )}
          >
            闪卡
          </button>
        </div>
        {mode === 'flashcard' && (
          <span className="font-mono text-caption-mono-sm text-body-mid">
            共 {data.items.length} 题
          </span>
        )}
      </div>

      {mode === 'list' ? (
        <ListView data={data} />
      ) : (
        <FlashcardView data={data} />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// 列表模式（原手风琴）
// ---------------------------------------------------------------------------

function ListView({ data }: AccordionProps) {
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
                <p className="whitespace-pre-line text-body-md text-body">{item.content}</p>
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

// ---------------------------------------------------------------------------
// 闪卡模式（一题一屏）
// ---------------------------------------------------------------------------

function FlashcardView({ data }: AccordionProps) {
  const total = data.items.length
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (total === 0) {
    return (
      <div className="rounded-sm border border-hairline bg-canvas-card p-xl text-center">
        <p className="text-body-md text-body-mid">暂无题目</p>
      </div>
    )
  }

  const clamp = (n: number) => ((n % total) + total) % total
  const go = (delta: number) => {
    setFlipped(false)
    setPos((p) => clamp(p + delta))
  }
  const prev = () => go(-1)
  const next = () => go(1)
  const flip = () => setFlipped((f) => !f)

  const current = data.items[pos]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 进度栏 */}
      <div className="mb-xl flex flex-wrap items-center justify-between gap-sm">
        <div className="flex items-center gap-sm">
          <span className="rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid">
            第 {pos + 1} / {total} 题
          </span>
          <span
            className={cn(
              'rounded-pill px-md py-xs font-mono text-caption-mono-sm',
              flipped
                ? 'border border-accent-dusk/40 bg-accent-dusk/10 text-accent-dusk'
                : 'border border-accent-sunset/40 bg-accent-sunset/10 text-accent-sunset',
            )}
          >
            {flipped ? '答案' : '题目'}
          </span>
        </div>
        {/* 进度条 */}
        <div className="h-xxs w-32 overflow-hidden rounded-pill bg-canvas-soft">
          <div
            className="h-full bg-accent-sunset transition-all duration-300"
            style={{ width: `${((pos + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* 闪卡区域：点击翻转 */}
      <div className="mb-xl" style={{ perspective: '1000px' }}>
        <button
          type="button"
          onClick={flip}
          aria-label={flipped ? '收起答案' : '翻转查看答案'}
          className="relative block w-full cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s ease',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '260px',
          }}
        >
          {/* 正面：题目 */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-sm border border-hairline bg-canvas-soft p-2xl"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              面试题 {String(pos + 1).padStart(2, '0')}
            </div>
            <p className="text-center text-body-lg text-ink">{current.title}</p>
            <p className="mt-xl text-caption-mono-sm text-body-mid">
              点击卡片翻转查看答案 →
            </p>
          </div>

          {/* 反面：答案 */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-auto rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-2xl"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              参考答案
            </div>
            <p className="whitespace-pre-line text-center text-body-md text-ink">
              {current.content}
            </p>
            {current.code && (
              <div className="mt-lg w-full max-w-2xl text-left">
                <CodeBlock code={current.code} language={current.codeLanguage ?? 'text'} />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* 导航 */}
      <div className="flex items-center justify-between gap-md">
        <button type="button" onClick={prev} className="btn-pill">
          ◀ 上一题
        </button>
        <button type="button" onClick={flip} className="btn-pill">
          {flipped ? '收起' : '翻转'}
        </button>
        <button type="button" onClick={next} className="btn-pill">
          下一题 ▶
        </button>
      </div>
    </div>
  )
}
