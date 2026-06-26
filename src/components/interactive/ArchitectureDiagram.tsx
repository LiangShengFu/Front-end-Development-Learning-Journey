/**
 * ArchitectureDiagram - 分层架构图
 *
 * 展示分层架构，每层包含多个组件/模块。
 * 遵循设计规范：canvas-card 层背景，hairline 边框，accent 色区分层级。
 */
import type { ArchitectureDiagramData } from '../../lib/types'
import { cn } from '../../lib/utils'

interface ArchitectureDiagramProps {
  data: ArchitectureDiagramData
}

const layerAccents = [
  'border-accent-sunset/40',
  'border-accent-dusk/40',
  'border-accent-twilight/40',
  'border-accent-breeze/40',
  'border-body-mid/40',
]

const layerDotColors = [
  'bg-accent-sunset',
  'bg-accent-dusk',
  'bg-accent-twilight',
  'bg-accent-breeze',
  'bg-body-mid',
]

export function ArchitectureDiagram({ data }: ArchitectureDiagramProps) {
  return (
    <div className="space-y-lg">
      {data.title && (
        <div className="text-center">
          <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            架构图
          </div>
          <h4 className="mt-xs text-display-xs text-ink">{data.title}</h4>
        </div>
      )}

      <div className="space-y-sm">
        {data.layers.map((layer, i) => {
          const accentIdx = i % layerAccents.length
          return (
            <div
              key={i}
              className={cn(
                'rounded-sm border bg-canvas-card p-xl',
                layerAccents[accentIdx],
              )}
            >
              <div className="mb-lg flex items-center gap-md">
                <span
                  className={cn('h-[8px] w-[8px] rounded-full', layerDotColors[accentIdx])}
                />
                <div className="flex-1">
                  <div className="flex items-baseline gap-sm">
                    <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                      L{i + 1}
                    </span>
                    <h5 className="text-body-md text-ink">{layer.name}</h5>
                  </div>
                  {layer.description && (
                    <p className="mt-xs text-body-sm text-body-mid">{layer.description}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-3">
                {layer.components.map((comp, ci) => (
                  <div
                    key={ci}
                    className="rounded-sm border border-hairline bg-canvas-soft px-lg py-md"
                  >
                    <div className="text-body-sm text-ink">{comp.name}</div>
                    {comp.description && (
                      <div className="mt-xs text-caption-mono-sm text-body-mid">
                        {comp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {data.flowDirection && (
        <div className="pt-sm text-center font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          {data.flowDirection === 'top-down' && '↓ 数据流向：自顶向下'}
          {data.flowDirection === 'bottom-up' && '↑ 数据流向：自底向上'}
          {data.flowDirection === 'bidirectional' && '↕ 数据流向：双向'}
        </div>
      )}
    </div>
  )
}
