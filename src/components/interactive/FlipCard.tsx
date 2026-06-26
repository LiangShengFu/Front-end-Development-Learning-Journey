/**
 * FlipCard - 翻转卡片
 *
 * 点击翻转展示正反两面内容。
 * 遵循设计规范：canvas-card 背景，hairline 边框，8px 圆角。
 */
import { useState } from 'react'
import type { FlipCardData } from '../../lib/types'
import { cn } from '../../lib/utils'

interface FlipCardProps {
  data: FlipCardData
}

export function FlipCard({ data }: FlipCardProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-3">
      {data.cards.map((card, i) => {
        const isFlipped = flippedIndex === i
        return (
          <button
            key={i}
            type="button"
            onClick={() => setFlippedIndex(isFlipped ? null : i)}
            className="group relative h-[200px] [perspective:1200px] focus:outline-none"
            aria-label={`翻转卡片 ${i + 1}`}
          >
            <div
              className={cn(
                'relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]',
                isFlipped && '[transform:rotateY(180deg)]',
              )}
            >
              {/* Front */}
              <div
                className={cn(
                  'absolute inset-0 flex flex-col items-center justify-center rounded-sm border border-hairline bg-canvas-card p-xl text-center [backface-visibility:hidden]',
                )}
              >
                <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                  {card.frontSub ?? '点击翻转'}
                </div>
                <div className="mt-sm text-display-xs text-ink">{card.front}</div>
                <div className="mt-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset opacity-0 transition-opacity group-hover:opacity-100">
                  翻转 →
                </div>
              </div>

              {/* Back */}
              <div
                className={cn(
                  'absolute inset-0 flex flex-col items-center justify-center rounded-sm border border-accent-sunset/30 bg-canvas-soft p-xl text-center [backface-visibility:hidden] [transform:rotateY(180deg)]',
                )}
              >
                <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
                  背面
                </div>
                <p className="mt-sm text-body-sm text-body">{card.back}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
