/**
 * KnowledgePointView - 知识点视图
 *
 * 渲染单个知识点：标题、难度标记、内容块列表。
 * 每个知识点带有序号锚点，便于模块内导航。
 * 标题区集成 PointActions：完成标记、收藏、SM-2 复习。
 */
import type { KnowledgePoint } from '../../lib/types'
import { ContentBlockRenderer } from './ContentBlockRenderer'
import { difficultyStars } from '../../lib/utils'
import { PointActions } from '../progress/PointActions'
import { useI18n } from '../../lib/i18n'

interface KnowledgePointViewProps {
  point: KnowledgePoint
  /** 模块 slug，用于学习进度记录 */
  moduleSlug: string
}

export function KnowledgePointView({ point, moduleSlug }: KnowledgePointViewProps) {
  const { t } = useI18n()
  const anchorId = `point-${point.order}`

  return (
    <section
      id={anchorId}
      className="scroll-mt-20 border-t border-hairline py-2xl first:border-t-0"
    >
      {/* Header */}
      <header className="mb-xl">
        <div className="flex flex-wrap items-baseline gap-md">
          <span className="font-mono text-caption-mono uppercase tracking-[1.4px] text-accent-sunset">
            {String(point.order).padStart(2, '0')}
          </span>
          <h3 className="text-display-xs text-ink">{point.title}</h3>
        </div>

        {/* Meta */}
        <div className="mt-xs flex flex-wrap items-center gap-lg font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          <span>
            {t('kp.difficulty')} <span className="text-body">{difficultyStars(point.difficulty)}</span>
          </span>
          <span className="text-body-mid/60">·</span>
          <span>{t(`kp.difficultyLevel${point.difficulty}`)}</span>
          {point.visualizationType && (
            <>
              <span className="text-body-mid/60">·</span>
              <span className="text-accent-breeze">{t('kp.withVisualization')}</span>
            </>
          )}
        </div>

        {/* 学习进度操作 */}
        <div className="mt-md">
          <PointActions moduleSlug={moduleSlug} pointOrder={point.order} />
        </div>
      </header>

      {/* Content blocks */}
      <div className="space-y-lg">
        {point.blocks.map((block) => (
          <ContentBlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </section>
  )
}
