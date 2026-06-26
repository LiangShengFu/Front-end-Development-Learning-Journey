/**
 * TableBuilder - 表格构建器动画
 *
 * 分步展示 HTML 表格的构建过程：caption → thead → tbody → tfoot。
 * 点击步骤按钮逐步显示表格区域，直观理解表格结构。
 *
 * 设计规范：步骤按钮使用 pill 形态，表格区域用不同 accent 色区分，
 * 单元格淡入动画，GeistMono 显示代码片段。
 */
import { useState } from 'react'
import type { TableBuilderData } from '../../../lib/html-visualization-types'
import { cn } from '../../../lib/utils'

interface TableBuilderProps {
  data: TableBuilderData
}

type Region = 'caption' | 'thead' | 'tbody' | 'tfoot'

export function TableBuilder({ data }: TableBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = data.steps[currentStep]
  const visibleRegions = new Set<Region>(step?.showRegions ?? [])

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
      {/* 步骤控制 */}
      <div className="mb-md flex flex-wrap items-center gap-xs">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          步骤
        </span>
        {data.steps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentStep(i)}
            className={cn(
              'rounded-pill border px-sm py-xxs font-mono text-caption-mono-sm uppercase tracking-[1.2px] transition-colors',
              i === currentStep
                ? 'border-ink bg-ink text-canvas'
                : 'border-hairline text-body-mid hover:border-ink hover:text-ink',
            )}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1fr_280px]">
        {/* 表格预览 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <table className="w-full border-collapse text-body-sm">
            {visibleRegions.has('caption') && (
              <caption className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
                {data.caption}
              </caption>
            )}
            {visibleRegions.has('thead') && (
              <thead>
                <tr>
                  {data.headers.map((h, i) => (
                    <th
                      key={i}
                      className="border border-hairline bg-accent-sunset/10 px-sm py-xs text-accent-sunset"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            {visibleRegions.has('tbody') && (
              <tbody>
                {data.rows.map((row, ri) => (
                  <tr key={ri} className="even:bg-canvas">
                    {row.map((cell, ci) => {
                      const isHighlighted = step?.highlightCells?.some(
                        ([r, c]) => r === ri && c === ci,
                      )
                      return (
                        <td
                          key={ci}
                          className={cn(
                            'border border-hairline px-sm py-xs text-ink transition-colors',
                            isHighlighted && 'bg-accent-twilight/20 text-accent-twilight',
                          )}
                        >
                          {cell}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            )}
            {visibleRegions.has('tfoot') && data.footer && (
              <tfoot>
                <tr>
                  {data.footer.map((cell, i) => (
                    <td
                      key={i}
                      className="border border-hairline bg-accent-twilight/10 px-sm py-xs font-mono text-caption-mono text-accent-twilight"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* 步骤说明 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            {String(currentStep + 1).padStart(2, '0')} / {String(data.steps.length).padStart(2, '0')}
          </div>
          <h4 className="mt-xs text-body-md text-ink">{step?.title}</h4>
          <p className="mt-xs text-body-sm text-body">{step?.description}</p>
          {step?.code && (
            <pre className="mt-sm overflow-x-auto rounded-xxs bg-canvas p-sm font-mono text-caption-mono text-accent-breeze">
              <code>{step.code}</code>
            </pre>
          )}
          <div className="mt-md flex gap-xs">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="rounded-pill border border-hairline px-sm py-xxs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid transition-colors hover:border-ink hover:text-ink disabled:opacity-40"
            >
              ← 上一步
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(Math.min(data.steps.length - 1, currentStep + 1))}
              disabled={currentStep === data.steps.length - 1}
              className="rounded-pill border border-hairline px-sm py-xxs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid transition-colors hover:border-ink hover:text-ink disabled:opacity-40"
            >
              下一步 →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
