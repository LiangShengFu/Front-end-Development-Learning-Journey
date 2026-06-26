/**
 * Timeline - 时间线/步骤流程
 *
 * 支持垂直和水平方向，展示时间序列或步骤流程。
 * 遵循设计规范：canvas-card 背景，accent-sunset 节点。
 */
import type { TimelineData } from '../../lib/types'
import { cn } from '../../lib/utils'

interface TimelineProps {
  data: TimelineData
}

export function Timeline({ data }: TimelineProps) {
  const orientation = data.orientation ?? 'vertical'

  if (orientation === 'horizontal') {
    return <HorizontalTimeline data={data} />
  }
  return <VerticalTimeline data={data} />
}

function VerticalTimeline({ data }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-hairline" />

      <ol className="space-y-2xl">
        {data.items.map((item, i) => (
          <li key={i} className="relative pl-2xl">
            {/* Node */}
            <div
              className={cn(
                'absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2',
                item.status === 'done' && 'border-accent-sunset bg-accent-sunset',
                item.status === 'active' && 'border-accent-sunset bg-canvas',
                (!item.status || item.status === 'pending') && 'border-hairline bg-canvas',
              )}
            />

            <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              {item.time}
            </div>
            <h4 className="mt-xs text-body-lg text-ink">{item.title}</h4>
            {item.description && (
              <p className="mt-xs text-body-sm text-body">{item.description}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function HorizontalTimeline({ data }: TimelineProps) {
  return (
    <div className="overflow-x-auto pb-sm">
      <div className="flex min-w-full gap-0">
        {data.items.map((item, i) => (
          <div key={i} className="relative flex-1 min-w-[200px] px-sm">
            {/* Horizontal line */}
            {i < data.items.length - 1 && (
              <div className="absolute left-[60%] top-[7px] right-[-20%] h-[1px] bg-hairline" />
            )}

            {/* Node */}
            <div
              className={cn(
                'relative z-10 mb-lg h-[15px] w-[15px] rounded-full border-2',
                item.status === 'done' && 'border-accent-sunset bg-accent-sunset',
                item.status === 'active' && 'border-accent-sunset bg-canvas',
                (!item.status || item.status === 'pending') && 'border-hairline bg-canvas',
              )}
            />

            <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              {item.time}
            </div>
            <h4 className="mt-xs text-body-md text-ink">{item.title}</h4>
            {item.description && (
              <p className="mt-xs text-body-sm text-body-mid">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
