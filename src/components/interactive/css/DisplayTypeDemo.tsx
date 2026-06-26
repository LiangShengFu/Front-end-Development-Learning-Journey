/**
 * DisplayTypeDemo - 显示类型对比
 *
 * 复刻旧项目 display-demo 的交互逻辑：
 * - 三种显示类型对比：inline / block / inline-block
 * - 同一组元素应用不同 display，观察布局差异
 * - 宽高/margin/padding 属性在不同 display 下的表现
 * - 实时代码输出
 */
import { useState } from 'react'
import type { DisplayTypePlaygroundData } from '../../../lib/css-visualization-types'
import { cn } from '../../../lib/utils'
import { ControlRow, GroupLabel, Divider, PillBtn, RangeRow, CodeOutput, PropLine, CommentLine } from './shared'

interface DisplayTypeDemoProps {
  data: DisplayTypePlaygroundData
}

const DISPLAYS = ['inline', 'block', 'inline-block'] as const

const DISPLAY_DESC: Record<string, string> = {
  inline: '行内元素，不独占一行，width/height/margin-top/bottom 无效',
  block: '块级元素，独占一行，width/height/margin 全部生效',
  'inline-block': '行内块，可与其他元素并排，width/height/margin 全部生效',
}

export function DisplayTypeDemo({ data }: DisplayTypeDemoProps) {
  const [display, setDisplay] = useState<string>(data.defaultDisplay ?? 'inline-block')
  const [width, setWidth] = useState(120)
  const [height, setHeight] = useState(60)
  const [margin, setMargin] = useState(8)

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card">
      {data.title && (
        <div className="border-b border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}

      {/* 演示舞台 */}
      <div className="bg-canvas p-md">
        <div className="rounded-sm border border-hairline bg-canvas-mid p-md">
          <div className="mb-sm font-mono text-caption-mono-sm text-body-mid">
            观察三个相同元素在不同 display 下的布局差异：
          </div>
          <div className="leading-relaxed">
            前置文本
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={cn(
                  'flex items-center justify-center rounded-xs bg-accent-sunset font-bold text-canvas',
                  display === 'block' && 'my-0',
                )}
                style={{
                  display: display as React.CSSProperties['display'],
                  width: display === 'inline' ? undefined : `${width}px`,
                  height: display === 'inline' ? undefined : `${height}px`,
                  margin: `${margin}px`,
                  verticalAlign: 'top',
                }}
              >
                {n}
              </span>
            ))}
            后置文本
          </div>
        </div>
      </div>

      {/* 控制区 */}
      <ControlRow>
        <GroupLabel>display</GroupLabel>
        {DISPLAYS.map((v) => (
          <PillBtn key={v} active={display === v} onClick={() => setDisplay(v)}>
            {v}
          </PillBtn>
        ))}
      </ControlRow>

      <ControlRow>
        <RangeRow label="width" value={width} min={40} max={240} onChange={setWidth} suffix="px" />
        <Divider />
        <RangeRow label="height" value={height} min={30} max={120} onChange={setHeight} suffix="px" />
        <Divider />
        <RangeRow label="margin" value={margin} min={0} max={30} onChange={setMargin} suffix="px" />
      </ControlRow>

      {/* 说明 */}
      <div className="border-t border-hairline bg-canvas-soft px-md py-sm font-mono text-caption-mono-sm text-body-mid">
        {DISPLAY_DESC[display]}
      </div>

      {/* 代码输出 */}
      <CodeOutput>
        <CommentLine>display: {display}</CommentLine>
        {'\n.box {\n'}
        <PropLine name="display" value={display} />
        {display !== 'inline' && <PropLine name="width" value={`${width}px`} />}
        {display !== 'inline' && <PropLine name="height" value={`${height}px`} />}
        <PropLine name="margin" value={`${margin}px`} />
        {'}\n\n'}
        <CommentLine>
          {display === 'inline'
            ? 'width/height 被忽略，仅 margin-left/right 生效'
            : '所有盒模型属性均生效'}
        </CommentLine>
      </CodeOutput>
    </div>
  )
}
