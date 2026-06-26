/**
 * BreakpointSimulator — 响应式断点模拟器
 *
 * 可视化 Tailwind CSS 移动优先断点策略，支持调整设备宽度，
 * 实时观察布局变化与断点激活状态。
 *
 * 对应docx中演示 #4
 */
import { useState, useMemo } from 'react'
import type { BreakpointSimulatorData } from '../../../lib/css-engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface BreakpointSimulatorProps {
  data?: BreakpointSimulatorData
}

/** Tailwind 默认断点 */
const BREAKPOINTS = [
  { name: 'base', label: '默认', minWidth: 0, prefix: '', color: '#7d8187' },
  { name: 'sm', label: 'sm', minWidth: 640, prefix: 'sm:', color: '#22c55e' },
  { name: 'md', label: 'md', minWidth: 768, prefix: 'md:', color: '#3b82f6' },
  { name: 'lg', label: 'lg', minWidth: 1024, prefix: 'lg:', color: '#a855f7' },
  { name: 'xl', label: 'xl', minWidth: 1280, prefix: 'xl:', color: '#f97316' },
  { name: '2xl', label: '2xl', minWidth: 1536, prefix: '2xl:', color: '#ef4444' },
]

const DEFAULT_PRESETS = [
  { label: '手机', width: 375 },
  { label: '平板', width: 768 },
  { label: '桌面', width: 1024 },
  { label: '大屏', width: 1440 },
]

/** 根据宽度计算激活的断点 */
function getActiveBreakpoint(width: number) {
  let active = BREAKPOINTS[0]
  for (const bp of BREAKPOINTS) {
    if (width >= bp.minWidth) {
      active = bp
    }
  }
  return active
}

export function BreakpointSimulator({ data }: BreakpointSimulatorProps) {
  const presets = data?.presets ?? DEFAULT_PRESETS
  const [width, setWidth] = useState(data?.defaultWidth ?? 768)

  const activeBp = useMemo(() => getActiveBreakpoint(width), [width])

  // 根据断点决定网格列数
  const gridCols = useMemo(() => {
    if (width >= 1024) return 4
    if (width >= 768) return 3
    if (width >= 640) return 2
    return 1
  }, [width])

  // 生成网格项
  const gridItems = useMemo(
    () => Array.from({ length: 12 }, (_, i) => `项 ${i + 1}`),
    [],
  )

  return (
    <div className="space-y-lg">
      {/* 预设宽度按钮 */}
      <div className="flex flex-wrap items-center gap-sm">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          设备:
        </span>
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setWidth(p.width)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm uppercase tracking-[1.2px] transition-colors',
              width === p.width
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {p.label} ({p.width}px)
          </button>
        ))}

        {/* 自定义宽度滑块 */}
        <div className="ml-auto flex items-center gap-sm">
          <span className="font-mono text-caption-mono-sm text-body-mid">
            自定义:
          </span>
          <input
            type="range"
            min={280}
            max={1600}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="h-1 w-24 cursor-pointer appearance-none rounded-pill bg-canvas-mid accent-accent-sunset"
          />
          <span className="min-w-[3rem] text-right font-mono text-caption-mono-sm text-accent-sunset">
            {width}px
          </span>
        </div>
      </div>

      {/* 断点指示器 */}
      <div className="grid grid-cols-3 gap-sm sm:grid-cols-6">
        {BREAKPOINTS.map((bp) => (
          <div
            key={bp.name}
            className={cn(
              'rounded-sm border p-sm text-center transition-colors',
              activeBp.name === bp.name
                ? 'border-accent-sunset/50 bg-accent-sunset/10'
                : 'border-hairline bg-canvas-soft',
            )}
          >
            <div
              className="font-mono text-caption-mono-sm"
              style={{
                color: activeBp.name === bp.name ? bp.color : undefined,
              }}
            >
              {bp.label}
            </div>
            <div className="mt-xxs text-body-sm text-body-mid">
              {bp.minWidth === 0 ? 'all' : `≥${bp.minWidth}px`}
            </div>
            {activeBp.name === bp.name && (
              <div className="mt-xxs font-mono text-caption-mono-sm text-accent-sunset">
                ● 激活
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 模拟视口 */}
      <div className="overflow-hidden rounded-sm border-2 border-accent-sunset/40">
        {/* 视口信息栏 */}
        <div className="flex items-center justify-between border-b border-hairline bg-canvas-soft px-lg py-sm">
          <span className="font-mono text-caption-mono-sm text-body-mid">
            视口
          </span>
          <div className="flex items-center gap-md">
            <span className="text-body-sm text-body-mid">
              激活断点:{' '}
              <span className="font-mono text-accent-sunset">
                {activeBp.label}
              </span>
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">
              {width}px
            </span>
          </div>
        </div>

        {/* 模拟视口内容 */}
        <div
          className="mx-auto transition-all duration-300 ease-out"
          style={{ maxWidth: Math.min(width, 1200) }}
        >
          <div className="bg-canvas-soft p-lg">
            {/* 响应式网格 */}
            <div
              className="grid gap-sm transition-all duration-300"
              style={{
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
              }}
            >
              {gridItems.slice(0, gridCols * 2).map((item, i) => (
                <div
                  key={i}
                  className="rounded-sm bg-accent-dusk/20 p-md text-center text-body-sm text-ink transition-all"
                >
                  {item}
                  <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">
                    col
                  </div>
                </div>
              ))}
            </div>

            {/* 对应的 Tailwind 类展示 */}
            <div className="mt-lg rounded-sm bg-canvas-card p-md">
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                对应的 Tailwind 类
              </div>
              <code className="mt-sm block font-mono text-body-sm text-accent-sunset">
                {gridCols === 1 &&
                  'grid grid-cols-1'}
                {gridCols === 2 &&
                  'grid grid-cols-1 sm:grid-cols-2'}
                {gridCols === 3 &&
                  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}
                {gridCols >= 4 &&
                  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}
              </code>
              <p className="mt-sm text-body-sm text-body-mid">
                移动优先：先定义最小屏幕样式（默认），再用 sm:/md:/lg:/xl:
                前缀逐级增强。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
