/**
 * SemanticCompare - 语义化标签对比
 *
 * 左右对比展示"良好实践"与"不良实践"的 HTML 标签使用。
 * 悬停标签显示使用原因，直观体现语义化的重要性。
 *
 * 设计规范：good 侧使用 accent-sunset，bad 侧使用 red 色调，
 * 卡片顶部彩色边框区分，标签使用 GeistMono 字体。
 */
import type { SemanticCompareData } from '../../../lib/html-visualization-types'

interface SemanticCompareProps {
  data: SemanticCompareData
}

export function SemanticCompare({ data }: SemanticCompareProps) {
  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
      {data.title && (
        <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        {/* 良好实践 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md border-t-2 border-t-accent-sunset">
          <div className="mb-sm flex items-center gap-xs">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-sunset text-caption-mono-sm text-canvas">
              ✓
            </span>
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              {data.good.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-xxs">
            {data.good.tags.map((item, i) => (
              <span
                key={i}
                title={item.reason}
                className="cursor-default rounded-xxs border border-accent-sunset/30 bg-accent-sunset/10 px-xs py-xxs font-mono text-caption-mono-sm text-accent-sunset transition-transform hover:-translate-y-px"
              >
                {item.tag}
              </span>
            ))}
          </div>
          <p className="mt-sm border-t border-hairline pt-sm text-caption-mono-sm text-body-mid">
            {data.good.description}
          </p>
        </div>

        {/* 不良实践 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md border-t-2 border-t-red-500">
          <div className="mb-sm flex items-center gap-xs">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-caption-mono-sm text-canvas">
              ✗
            </span>
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-red-400">
              {data.bad.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-xxs">
            {data.bad.tags.map((item, i) => (
              <span
                key={i}
                title={item.reason}
                className="cursor-default rounded-xxs border border-red-500/30 bg-red-500/10 px-xs py-xxs font-mono text-caption-mono-sm text-red-400 transition-transform hover:-translate-y-px"
              >
                {item.tag}
              </span>
            ))}
          </div>
          <p className="mt-sm border-t border-hairline pt-sm text-caption-mono-sm text-body-mid">
            {data.bad.description}
          </p>
        </div>
      </div>
    </div>
  )
}
