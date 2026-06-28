/**
 * PointActions - 知识点内联操作按钮
 *
 * 显示在 KnowledgePointView 标题区域：
 * - 标记完成/未完成
 * - 收藏/取消收藏
 * - SM-2 复习评分（仅当卡片已到期或已存在时显示）
 *
 * 状态从 progress-store 读取，自动持久化。
 */
import { useState } from 'react'
import { cn } from '../../lib/utils'
import { useProgressStore } from '../../lib/progress-store'
import { isDue, daysUntilReview, type RecallQuality } from '../../lib/spaced-repetition'
import { useI18n } from '../../lib/i18n'

interface PointActionsProps {
  moduleSlug: string
  pointOrder: number
}

export function PointActions({ moduleSlug, pointOrder }: PointActionsProps) {
  const { t } = useI18n()
  const point = useProgressStore((s) => s.points[`${moduleSlug}:${pointOrder}`])
  const toggleComplete = useProgressStore((s) => s.toggleComplete)
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark)
  const review = useProgressStore((s) => s.review)
  const [showReview, setShowReview] = useState(false)

  const completed = point?.completed ?? false
  const bookmarked = useProgressStore((s) => s.bookmarks.includes(`${moduleSlug}:${pointOrder}`))
  const card = point?.card
  const due = card ? isDue(card) : false
  const daysLeft = card ? daysUntilReview(card) : null

  return (
    <div className="flex flex-wrap items-center gap-sm">
      {/* 完成按钮 */}
      <button
        type="button"
        onClick={() => toggleComplete(moduleSlug, pointOrder)}
        className={cn(
          'inline-flex items-center gap-xs rounded-sm border px-sm py-xs text-caption-mono-sm transition-colors',
          completed
            ? 'border-accent-sunset/40 bg-accent-sunset/10 text-accent-sunset'
            : 'border-hairline text-body-mid hover:text-ink',
        )}
        aria-pressed={completed}
      >
        <span aria-hidden="true">{completed ? '✓' : '○'}</span>
        {completed ? t('pointActions.completed') : t('pointActions.markComplete')}
      </button>

      {/* 收藏按钮 */}
      <button
        type="button"
        onClick={() => toggleBookmark(moduleSlug, pointOrder)}
        className={cn(
          'inline-flex items-center gap-xs rounded-sm border px-sm py-xs text-caption-mono-sm transition-colors',
          bookmarked
            ? 'border-accent-sunset/40 text-accent-sunset'
            : 'border-hairline text-body-mid hover:text-ink',
        )}
        aria-pressed={bookmarked}
        aria-label={bookmarked ? t('pointActions.unbookmark') : t('pointActions.bookmark')}
      >
        <span aria-hidden="true">{bookmarked ? '★' : '☆'}</span>
        {bookmarked ? t('pointActions.bookmarked') : t('pointActions.bookmark')}
      </button>

      {/* 复习状态 */}
      {card && card.nextReviewAt !== null && (
        <button
          type="button"
          onClick={() => setShowReview((v) => !v)}
          className={cn(
            'inline-flex items-center gap-xs rounded-sm border px-sm py-xs text-caption-mono-sm transition-colors',
            due
              ? 'border-accent-sunset/60 bg-accent-sunset/10 text-accent-sunset animate-pulse'
              : 'border-hairline text-body-mid hover:text-ink',
          )}
        >
          <span aria-hidden="true">↻</span>
          {due
            ? t('pointActions.dueReview')
            : daysLeft !== null && daysLeft > 0
              ? t('pointActions.daysLaterReview', { n: daysLeft })
              : t('pointActions.todayReview')}
        </button>
      )}

      {/* 复习评分面板 */}
      {showReview && (
        <ReviewPanel
          onRate={(q) => {
            review(moduleSlug, pointOrder, q)
            setShowReview(false)
          }}
          onClose={() => setShowReview(false)}
        />
      )}
    </div>
  )
}

/** 复习评分面板：让用户自评回忆质量 0-5 */
function ReviewPanel({
  onRate,
  onClose,
}: {
  onRate: (q: RecallQuality) => void
  onClose: () => void
}) {
  const { t } = useI18n()
  const qualities: Array<{ q: RecallQuality; label: string; desc: string }> = [
    { q: 0, label: '0', desc: t('pointActions.q0') },
    { q: 2, label: '2', desc: t('pointActions.q2') },
    { q: 3, label: '3', desc: t('pointActions.q3') },
    { q: 4, label: '4', desc: t('pointActions.q4') },
    { q: 5, label: '5', desc: t('pointActions.q5') },
  ]
  return (
    <div className="w-full rounded-sm border border-hairline bg-canvas-card p-md">
      <div className="mb-sm flex items-center justify-between">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          {t('pointActions.reviewTitle')}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-caption-mono-sm text-body-mid hover:text-ink"
          aria-label={t('pointActions.closeReview')}
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-5 gap-xs">
        {qualities.map(({ q, label, desc }) => (
          <button
            key={q}
            type="button"
            onClick={() => onRate(q)}
            className="flex flex-col items-center gap-[2px] rounded-sm border border-hairline px-xs py-sm text-center transition-colors hover:border-accent-sunset/60 hover:text-accent-sunset"
          >
            <span className="font-mono text-body-sm">{label}</span>
            <span className="text-caption-mono-sm text-body-mid">{desc}</span>
          </button>
        ))}
      </div>
      <p className="mt-sm text-caption text-body-mid">{t('pointActions.reviewHint')}</p>
    </div>
  )
}
