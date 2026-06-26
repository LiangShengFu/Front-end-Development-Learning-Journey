/**
 * ApiCard - HTML5 API 能力图谱
 *
 * 4 列网格展示 HTML5 核心 API 卡片，点击卡片显示详情面板。
 * 卡片悬停时顶部出现彩色进度条，详情面板显示 API 用途、关键方法和典型场景。
 *
 * 设计规范：复刻旧项目 viz-html.css 的 api-grid / api-card / api-detail-panel 样式，
 * 使用当前项目的设计令牌（border-hairline / canvas-card / accent-sunset）。
 */
import { useState } from 'react'
import type { ApiCardData, ApiCardDetail } from '../../../lib/html-visualization-types'
import { cn } from '../../../lib/utils'

interface ApiCardProps {
  data: ApiCardData
}

export function ApiCard({ data }: ApiCardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeDetail: ApiCardDetail | undefined = activeId ? data.details[activeId] : undefined

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card">
      {data.title && (
        <div className="border-b border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}

      <div className="bg-canvas p-lg">
        {data.hint && (
          <p className="mb-md text-caption-sm text-body-mid">{data.hint}</p>
        )}

        {/* API 卡片网格 */}
        <div className="grid grid-cols-2 gap-xs sm:grid-cols-3 lg:grid-cols-4">
          {data.cards.map((card) => {
            const isActive = activeId === card.id
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveId(isActive ? null : card.id)}
                className={cn(
                  'relative overflow-hidden rounded-xs border bg-canvas-soft px-sm py-md text-center transition-all',
                  isActive
                    ? 'border-accent-sunset shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
                    : 'border-hairline hover:border-accent-sunset hover:-translate-y-0.5',
                )}
              >
                {/* 顶部进度条（悬停/激活时展开） */}
                <span
                  className={cn(
                    'absolute left-0 right-0 top-0 h-[3px] origin-left bg-accent-sunset transition-transform duration-150',
                    isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100',
                  )}
                />
                <div className="mb-1 text-[1.4rem] leading-none">{card.icon}</div>
                <div className="mb-0.5 text-caption-sm font-bold text-body">{card.name}</div>
                <span className="inline-block rounded-xs bg-canvas px-xs py-px text-[0.62rem] text-body-mid">
                  {card.tag}
                </span>
              </button>
            )
          })}
        </div>

        {/* 详情面板 */}
        {activeDetail && (
          <div className="mt-md rounded-xs border border-accent-sunset bg-canvas-soft p-md text-caption-sm leading-relaxed">
            <div className="mb-1.5 text-body font-bold text-accent-sunset">{activeDetail.title}</div>
            <div
              className="text-body [&_b]:font-bold [&_code]:mx-0.5 [&_code]:rounded-xs [&_code]:bg-canvas [&_code]:px-1 [&_code]:py-px [&_code]:font-mono [&_code]:text-[0.72rem]"
              dangerouslySetInnerHTML={{ __html: activeDetail.html }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
