/**
 * ProgressPanel - 学习进度面板
 *
 * 展示学习状态总览：
 * - 顶部统计：已访问/已完成/待复习/收藏数
 * - 待复习卡片列表（按到期时间排序）
 * - 收藏列表
 * - 各模块完成进度条
 *
 * 数据从 progress-store 读取，自动持久化到 localStorage。
 */
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProgressStore } from '../../lib/progress-store'
import { moduleSummaries } from '../../lib/modules'
import { isDue, daysUntilReview } from '../../lib/spaced-repetition'
import { cn } from '../../lib/utils'
import { useI18n } from '../../lib/i18n'

export function ProgressPanel() {
  const { t } = useI18n()
  const points = useProgressStore((s) => s.points)
  const bookmarks = useProgressStore((s) => s.bookmarks)
  const reset = useProgressStore((s) => s.reset)

  const stats = useMemo(() => {
    const all = Object.values(points)
    const visited = all.length
    const completed = all.filter((p) => p.completed).length
    const dueCards = all.filter((p) => isDue(p.card)).length
    const totalKp = moduleSummaries.reduce((sum, m) => sum + m.knowledgePointCount, 0)
    return { visited, completed, dueCards, bookmarkCount: bookmarks.length, totalKp }
  }, [points, bookmarks])

  const dueCards = useMemo(() => {
    return Object.values(points)
      .filter((p) => isDue(p.card))
      .sort((a, b) => (a.card.nextReviewAt ?? 0) - (b.card.nextReviewAt ?? 0))
  }, [points])

  const bookmarkedPoints = useMemo(() => {
    return bookmarks
      .map((id) => points[id])
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
  }, [bookmarks, points])

  const moduleProgress = useMemo(() => {
    return moduleSummaries.map((m) => {
      const modulePoints = Object.values(points).filter((p) => p.moduleSlug === m.slug)
      const completed = modulePoints.filter((p) => p.completed).length
      return {
        ...m,
        completed,
        progress: m.knowledgePointCount > 0 ? completed / m.knowledgePointCount : 0,
      }
    })
  }, [points])

  return (
    <div className="container-page py-xl">
      {/* 标题 */}
      <header className="mb-2xl">
        <span className="font-mono text-caption-mono uppercase tracking-[1.4px] text-accent-sunset">
          {t('progress.eyebrow')}
        </span>
        <h1 className="mt-xs text-display-sm text-ink">{t('progress.title')}</h1>
        <p className="mt-sm text-body-sm text-body-mid">{t('progress.desc')}</p>
      </header>

      {/* 统计卡片 */}
      <section className="mb-2xl grid grid-cols-2 gap-md md:grid-cols-4">
        <StatCard label={t('progress.visited')} value={stats.visited} total={stats.totalKp} accent="sunset" />
        <StatCard label={t('progress.completed')} value={stats.completed} total={stats.totalKp} accent="sunset" />
        <StatCard label={t('progress.due')} value={stats.dueCards} accent="sunset" highlight={stats.dueCards > 0} />
        <StatCard label={t('progress.bookmarks')} value={stats.bookmarkCount} accent="sunset" />
      </section>

      {/* 待复习卡片 */}
      <section className="mb-2xl">
        <h2 className="mb-md text-display-xs text-ink">
          {t('progress.dueTitle')}
          {stats.dueCards > 0 && (
            <span className="ml-sm text-accent-sunset">({stats.dueCards})</span>
          )}
        </h2>
        {dueCards.length === 0 ? (
          <EmptyHint text={t('progress.dueEmpty')} />
        ) : (
          <ul className="flex flex-col gap-sm">
            {dueCards.map((p) => {
              const summary = moduleSummaries.find((m) => m.slug === p.moduleSlug)
              const daysOverdue = daysUntilReview(p.card)
              return (
                <li key={`${p.moduleSlug}:${p.pointOrder}`}>
                  <Link
                    to={`/modules/${p.moduleSlug}#point-${p.pointOrder}`}
                    className="flex items-center justify-between rounded-sm border border-hairline px-md py-md transition-colors hover:border-accent-sunset/40"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-sm">
                        <span className="font-mono text-caption-mono text-body-mid">
                          {summary?.number ?? '--'}
                        </span>
                        <span className="truncate text-body-sm text-ink">
                          {t('progress.knowledgePoint', { n: p.pointOrder })}
                        </span>
                        {daysOverdue !== null && daysOverdue < 0 && (
                          <span className="text-caption-mono-sm text-accent-sunset">
                            {t('progress.overdue', { n: Math.abs(daysOverdue) })}
                          </span>
                        )}
                      </div>
                      <p className="mt-[2px] truncate text-caption text-body-mid">
                        {summary ? t(`module.${summary.slug}.title`) : p.moduleSlug}
                      </p>
                    </div>
                    <span className="ml-md shrink-0 font-mono text-caption-mono-sm text-accent-sunset">
                      {t('progress.reviewCta')}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      {/* 收藏列表 */}
      {bookmarkedPoints.length > 0 && (
        <section className="mb-2xl">
          <h2 className="mb-md text-display-xs text-ink">
            {t('progress.bookmarksTitle', { n: bookmarkedPoints.length })}
          </h2>
          <ul className="grid grid-cols-1 gap-sm sm:grid-cols-2">
            {bookmarkedPoints.map((p) => {
              const summary = moduleSummaries.find((m) => m.slug === p.moduleSlug)
              return (
                <li key={`${p.moduleSlug}:${p.pointOrder}`}>
                  <Link
                    to={`/modules/${p.moduleSlug}#point-${p.pointOrder}`}
                    className="block rounded-sm border border-hairline px-md py-md transition-colors hover:border-accent-sunset/40"
                  >
                    <div className="flex items-baseline gap-sm">
                      <span className="font-mono text-caption-mono text-body-mid">
                        {summary?.number ?? '--'}
                      </span>
                      <span className="truncate text-body-sm text-ink">
                        {summary ? t(`module.${summary.slug}.title`) : p.moduleSlug}
                      </span>
                    </div>
                    <p className="mt-[2px] text-caption text-body-mid">
                      {t('progress.bookmarkPoint', { n: p.pointOrder })}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* 模块进度 */}
      <section className="mb-2xl">
        <h2 className="mb-md text-display-xs text-ink">{t('progress.moduleProgress')}</h2>
        <div className="flex flex-col gap-xs">
          {moduleProgress.map((m) => (
            <div key={m.slug} className="flex items-center gap-md">
              <span className="w-8 shrink-0 font-mono text-caption-mono text-body-mid">
                {m.number}
              </span>
              <Link
                to={`/modules/${m.slug}`}
                className="w-40 shrink-0 truncate text-body-sm text-ink hover:text-accent-sunset"
              >
                {t(`module.${m.slug}.title`)}
              </Link>
              <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-canvas-bg-inset">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    m.progress === 1 ? 'bg-accent-sunset' : 'bg-accent-sunset/60',
                  )}
                  style={{ width: `${Math.max(m.progress * 100, m.progress > 0 ? 4 : 0)}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right font-mono text-caption-mono-sm text-body-mid">
                {m.completed}/{m.knowledgePointCount}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 危险操作 */}
      {stats.visited > 0 && (
        <section className="border-t border-hairline pt-xl">
          <details>
            <summary className="cursor-pointer text-caption-mono-sm text-body-mid hover:text-ink">
              {t('progress.dangerZone')}
            </summary>
            <div className="mt-md">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(t('progress.confirmClear'))) {
                    reset()
                  }
                }}
                className="rounded-sm border border-accent-sunset/40 px-md py-xs text-caption-mono-sm text-accent-sunset hover:bg-accent-sunset/10"
              >
                {t('progress.clearAll')}
              </button>
            </div>
          </details>
        </section>
      )}
    </div>
  )
}

function StatCard({
  label,
  value,
  total,
  accent,
  highlight,
}: {
  label: string
  value: number
  total?: number
  accent?: 'sunset'
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-sm border px-md py-md',
        highlight ? 'border-accent-sunset/40 bg-accent-sunset/5' : 'border-hairline',
      )}
    >
      <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
        {label}
      </div>
      <div className="mt-xs flex items-baseline gap-xs">
        <span
          className={cn(
            'font-mono text-display-xs',
            accent === 'sunset' ? 'text-accent-sunset' : 'text-ink',
          )}
        >
          {value}
        </span>
        {total !== undefined && (
          <span className="text-caption-mono-sm text-body-mid">/ {total}</span>
        )}
      </div>
    </div>
  )
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="rounded-sm border border-dashed border-hairline px-md py-xl text-center text-body-sm text-body-mid">
      {text}
    </div>
  )
}
