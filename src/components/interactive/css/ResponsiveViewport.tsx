/**
 * ResponsiveViewport - 响应式视口演示
 *
 * 复刻旧项目 rq-playground 的交互逻辑：
 * - 可拖拽视口宽度，观察布局变化
 * - 四个断点：mobile / tablet / desktop / wide
 * - 响应式导航条 + 卡片网格（使用容器查询）
 * - 断点标尺条 + 预设按钮
 * - 实时代码输出
 */
import { useState } from 'react'
import type { ResponsiveViewportData, ResponsiveBreakpoint } from '../../../lib/css-visualization-types'
import { cn } from '../../../lib/utils'
import { ControlRow, Divider, PillBtn, RangeRow, CodeOutput, PropLine, CommentLine } from './shared'

interface ResponsiveViewportProps {
  data: ResponsiveViewportData
}

const DEFAULT_BREAKPOINTS: ResponsiveBreakpoint[] = [
  { name: 'mobile', maxWidth: 480, description: '单列布局，导航纵向堆叠' },
  { name: 'tablet', maxWidth: 720, description: '2列卡片，导航仍可纵向' },
  { name: 'desktop', maxWidth: 960, description: '3列卡片，导航横向排列' },
  { name: 'wide', maxWidth: Infinity, description: '4列卡片，完整桌面布局' },
]

const DEFAULT_PRESETS = [
  { label: '手机', width: 320 },
  { label: '平板', width: 768 },
  { label: '桌面', width: 1024 },
]

const BP_COLORS: Record<string, string> = {
  mobile: 'border-accent-sunset',
  tablet: 'border-accent-breeze',
  desktop: 'border-accent-sunset-soft',
  wide: 'border-zinc-400',
}

export function ResponsiveViewport({ data }: ResponsiveViewportProps) {
  const breakpoints = data.breakpoints ?? DEFAULT_BREAKPOINTS
  const presets = data.presets ?? DEFAULT_PRESETS
  const minWidth = data.minWidth ?? 280
  const maxWidth = data.maxWidth ?? 1160

  const [width, setWidth] = useState(data.defaultWidth ?? 320)

  // 根据宽度获取当前断点
  const currentBp = breakpoints.find((bp) => width < bp.maxWidth) ?? breakpoints[breakpoints.length - 1]
  const cardColumns =
    currentBp.name === 'mobile' ? 1 : currentBp.name === 'tablet' ? 2 : currentBp.name === 'desktop' ? 3 : 4

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card">
      {data.title && (
        <div className="border-b border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}

      {/* 可拖拽视口 */}
      <div className="bg-canvas p-md">
        <div className="flex justify-center">
          <div
            className={cn(
              'overflow-hidden rounded-sm border-2 bg-canvas-mid transition-[width] duration-200',
              BP_COLORS[currentBp.name] ?? 'border-hairline',
            )}
            style={{ width: `${width}px`, maxWidth: '100%' }}
          >
            {/* 宽度标尺 */}
            <div className="flex items-center justify-between border-b border-hairline px-sm py-xs font-mono text-caption-mono-sm">
              <span className="text-body-mid">视口宽度: <b className="text-accent-sunset">{width}px</b></span>
              <span className={cn('rounded-pill px-sm py-xxs uppercase tracking-[1.2px]', `bg-${currentBp.name === 'mobile' ? 'accent-sunset' : currentBp.name === 'tablet' ? 'accent-breeze' : 'accent-sunset-soft'} text-canvas`)}>
                {currentBp.name}
              </span>
            </div>

            {/* 响应式内容 */}
            <div className="p-sm">
              {/* 响应式导航条 */}
              <div
                className={cn(
                  'mb-sm flex gap-xs',
                  currentBp.name === 'mobile' || currentBp.name === 'tablet'
                    ? 'flex-col'
                    : 'flex-row items-center justify-between',
                )}
              >
                <span className="rounded-xs bg-canvas-soft px-sm py-xs font-mono text-caption-mono-sm font-bold text-body">
                  MyApp
                </span>
                <div className="flex gap-xs">
                  {['首页', '产品', '关于'].map((link) => (
                    <span key={link} className="rounded-xs bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-body-mid">
                      {link}
                    </span>
                  ))}
                </div>
              </div>

              {/* 响应式卡片网格 */}
              <div
                className="grid gap-xs"
                style={{ gridTemplateColumns: `repeat(${cardColumns}, 1fr)` }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="rounded-xs border border-hairline bg-canvas p-xs">
                    <div className="font-mono text-caption-mono-sm font-bold text-accent-sunset">卡片 {n}</div>
                    <div className="font-mono text-caption-mono-sm text-body-mid">
                      {n}列 → {cardColumns}列布局
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 断点标尺条 */}
        <div className="mt-md flex overflow-hidden rounded-xs border border-hairline">
          {breakpoints.map((bp, i) => (
            <div
              key={bp.name}
              className={cn(
                'flex-1 px-sm py-xs text-center font-mono text-caption-mono-sm transition-colors',
                currentBp.name === bp.name
                  ? 'bg-ink text-canvas'
                  : 'bg-canvas-mid text-body-mid',
              )}
            >
              {bp.name}
              {i < breakpoints.length - 1 ? ` <${bp.maxWidth}` : ` ≥${breakpoints[i - 1]?.maxWidth ?? 0}`}
            </div>
          ))}
        </div>
      </div>

      {/* 控制区 */}
      <ControlRow>
        <RangeRow label="视口宽度" value={width} min={minWidth} max={maxWidth} onChange={setWidth} suffix="px" />
        <Divider />
        {presets.map((preset) => (
          <PillBtn key={preset.label} active={width === preset.width} onClick={() => setWidth(preset.width)}>
            {preset.label}
          </PillBtn>
        ))}
      </ControlRow>

      {/* 说明 */}
      <div className="border-t border-hairline bg-canvas-soft px-md py-sm font-mono text-caption-mono-sm text-body-mid">
        当前断点: {currentBp.name} ({width}px) · {currentBp.description}
      </div>

      {/* 代码输出 */}
      <CodeOutput>
        <CommentLine>当前断点: {currentBp.name} ({width}px) · {currentBp.description}</CommentLine>
        {'\n'}
        <CommentLine>使用 @container 实现组件级响应式</CommentLine>
        {'\n.rq-content {\n'}
        <PropLine name="container-type" value="inline-size" />
        {'}\n\n'}
        {currentBp.name === 'mobile' ? (
          <>
            <CommentLine>默认：单列</CommentLine>
            {'\n.rq-cards { '}
            <span className="text-accent-sunset-soft">grid-template-columns</span>
            <span className="text-body-mid">: </span>
            <span className="text-accent-sunset">1fr</span>
            <span className="text-body-mid">; {'}'}</span>
          </>
        ) : (
          <>
            <span className="text-accent-sunset">@container</span>
            <span className="text-body-mid"> {'('}min-width: {breakpoints[0].maxWidth}px{') {'}</span>
            {'\n  .rq-cards { '}
            <span className="text-accent-sunset-soft">grid-template-columns</span>
            <span className="text-body-mid">: </span>
            <span className="text-accent-sunset">repeat({cardColumns}, 1fr)</span>
            <span className="text-body-mid">; {'}'}</span>
            {currentBp.name !== 'tablet' && (
              <>
                {'\n  .rq-nav { '}
                <span className="text-accent-sunset-soft">flex-direction</span>
                <span className="text-body-mid">: </span>
                <span className="text-accent-sunset">row</span>
                <span className="text-body-mid">; {'}'}</span>
              </>
            )}
            {'\n}'}
          </>
        )}
      </CodeOutput>
    </div>
  )
}
