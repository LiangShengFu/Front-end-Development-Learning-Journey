/**
 * BootstrapGridDemo — Bootstrap 12 列网格系统交互演示
 *
 * 可视化 Bootstrap 的 12 列响应式网格，支持调整列宽分配和断点选择。
 * 实时展示对应的 Bootstrap class 名称。
 *
 * 对应docx中演示 #7
 */
import { useState } from 'react'
import type { BootstrapGridDemoData } from '../../../lib/css-engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface BootstrapGridDemoProps {
  data?: BootstrapGridDemoData
}

const BREAKPOINTS = [
  { value: 'xs', label: 'xs (默认)', minWidth: 0 },
  { value: 'sm', label: 'sm ≥576px', minWidth: 576 },
  { value: 'md', label: 'md ≥768px', minWidth: 768 },
  { value: 'lg', label: 'lg ≥992px', minWidth: 992 },
  { value: 'xl', label: 'xl ≥1200px', minWidth: 1200 },
] as const

/** 常用列分配预设 */
const COLUMN_PRESETS = [
  { label: '12 (满宽)', cols: [12] },
  { label: '6 + 6', cols: [6, 6] },
  { label: '4 + 4 + 4', cols: [4, 4, 4] },
  { label: '3 + 3 + 3 + 3', cols: [3, 3, 3, 3] },
  { label: '8 + 4', cols: [8, 4] },
  { label: '3 + 6 + 3', cols: [3, 6, 3] },
]

export function BootstrapGridDemo({ data }: BootstrapGridDemoProps) {
  const [breakpoint, setBreakpoint] = useState<
    'xs' | 'sm' | 'md' | 'lg' | 'xl'
  >(data?.defaultBreakpoint ?? 'md')
  const [selectedPreset, setSelectedPreset] = useState(2) // 4+4+4

  const cols = COLUMN_PRESETS[selectedPreset].cols

  const bpPrefix = breakpoint === 'xs' ? '' : `-${breakpoint}`

  return (
    <div className="space-y-lg">
      {/* 断点控制 */}
      <div className="flex flex-wrap items-center gap-sm">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          断点:
        </span>
        {BREAKPOINTS.map((bp) => (
          <button
            key={bp.value}
            type="button"
            onClick={() => setBreakpoint(bp.value)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
              breakpoint === bp.value
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {bp.label}
          </button>
        ))}
      </div>

      {/* 列预设 */}
      <div className="flex flex-wrap items-center gap-sm">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          列分配:
        </span>
        {COLUMN_PRESETS.map((preset, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedPreset(i)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
              selectedPreset === i
                ? 'border-accent-dusk bg-accent-dusk text-white'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* 网格预览 */}
      <div className="overflow-hidden rounded-sm border border-hairline">
        <div className="flex items-center justify-between border-b border-hairline bg-canvas-soft px-lg py-sm">
          <span className="font-mono text-caption-mono-sm text-body-mid">
            .row
          </span>
          <span className="font-mono text-caption-mono-sm text-accent-sunset">
            12 列网格系统
          </span>
        </div>

        <div className="bg-canvas-soft p-lg">
          {/* 网格行 */}
          <div className="flex gap-sm">
            {cols.map((n, i) => (
              <div
                key={i}
                className="rounded-sm p-md text-center transition-all"
                style={{
                  flex: `0 0 ${((n / 12) * 100).toFixed(1)}%`,
                  width: `${((n / 12) * 100).toFixed(1)}%`,
                  backgroundColor: `hsl(${220 + i * 40}, 70%, 30%)`,
                }}
              >
                <div className="font-mono text-body-sm font-semibold text-white">
                  col{bpPrefix}-{n}
                </div>
                <div className="mt-xs text-caption-mono-sm text-white/60">
                  {n}/12
                </div>
              </div>
            ))}
          </div>

          {/* Bootstrap class 代码展示 */}
          <div className="mt-lg rounded-sm bg-canvas-card p-lg">
            <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              Bootstrap HTML
            </div>
            <code className="mt-sm block font-mono text-body-sm text-accent-sunset">
              {`<div class="row">\n${cols
                .map((n) => `  <div class="col${bpPrefix}-${n}">...</div>`)
                .join('\n')}\n</div>`}
            </code>
          </div>
        </div>
      </div>

      {/* Bootstrap 网格系统说明 */}
      <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
        <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
          <div className="font-mono text-caption-mono-sm text-accent-sunset">
            Bootstrap 网格
          </div>
          <ul className="mt-sm space-y-xs text-body-sm text-body-mid">
            <li>• 每行 12 列，任意组合</li>
            <li>• 5 个响应式断点</li>
            <li>• Flexbox 实现</li>
            <li>• 组件优先，提供完整 UI 组件</li>
          </ul>
        </div>
        <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
          <div className="font-mono text-caption-mono-sm text-accent-dusk">
            Tailwind 对应
          </div>
          <ul className="mt-sm space-y-xs text-body-sm text-body-mid">
            <li>• 任意列数，无 12 列限制</li>
            <li>• grid-cols-{'{n}'} 直接定义</li>
            <li>• CSS Grid 实现</li>
            <li>• 工具优先，原子化类名自由组合</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
