/**
 * BoxModelVisualizer - 盒模型可视化
 *
 * 复刻旧项目 bm-visualizer 的交互逻辑：
 * - 嵌套的 margin / border / padding / content 四层盒子
 * - box-sizing 切换（content-box / border-box）
 * - margin / border / padding / width 滑块控制
 * - 实时尺寸标注与代码输出
 */
import { useState } from 'react'
import type { BoxModelPlaygroundData } from '../../../lib/css-visualization-types'
import { ControlRow, GroupLabel, Divider, PillBtn, RangeRow, CodeOutput, PropLine, CommentLine } from './shared'

interface BoxModelVisualizerProps {
  data: BoxModelPlaygroundData
}

export function BoxModelVisualizer({ data }: BoxModelVisualizerProps) {
  const [sizing, setSizing] = useState<'content-box' | 'border-box'>(data.defaultSizing ?? 'content-box')
  const [margin, setMargin] = useState(data.defaultMargin ?? 20)
  const [border, setBorder] = useState(data.defaultBorder ?? 8)
  const [padding, setPadding] = useState(data.defaultPadding ?? 16)
  const [width, setWidth] = useState(data.defaultWidth ?? 200)

  // 计算实际渲染尺寸
  // content-box: content=width, total = width + 2*(border+padding+margin)
  // border-box:  content=width-2*(border+padding), total = width + 2*margin
  const contentW = sizing === 'content-box' ? width : Math.max(0, width - 2 * (border + padding))
  const totalW = width + 2 * (sizing === 'content-box' ? border + padding + margin : margin)

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card">
      {data.title && (
        <div className="border-b border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}

      {/* 可视化区域 */}
      <div className="flex items-center justify-center overflow-x-auto bg-canvas p-xl">
        <div
          className="bg-accent-sunset/20"
          style={{ padding: `${margin}px` }}
          title="margin"
        >
          <div
            className="border border-accent-sunset bg-accent-sunset/30"
            style={{ borderWidth: `${border}px` }}
            title="border"
          >
            <div
              className="bg-accent-breeze/20"
              style={{ padding: `${padding}px` }}
              title="padding"
            >
              <div
                className="flex items-center justify-center bg-accent-breeze/60 font-mono text-caption-mono-sm font-bold text-black"
                style={{
                  width: `${contentW}px`,
                  height: '80px',
                  boxSizing: 'content-box',
                }}
                title="content"
              >
                {contentW}×80
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 尺寸标注 */}
      <div className="flex flex-wrap items-center justify-center gap-md border-t border-hairline bg-canvas-mid px-md py-sm font-mono text-caption-mono-sm">
        <span className="text-body-mid">content: <b className="text-accent-breeze">{contentW}px</b></span>
        <span className="text-body-mid">·</span>
        <span className="text-body-mid">padding: <b className="text-accent-sunset-soft">{padding * 2}px</b></span>
        <span className="text-body-mid">·</span>
        <span className="text-body-mid">border: <b className="text-accent-sunset">{border * 2}px</b></span>
        <span className="text-body-mid">·</span>
        <span className="text-body-mid">margin: <b className="text-body">{margin * 2}px</b></span>
        <span className="text-body-mid">·</span>
        <span className="text-body-mid">total: <b className="text-ink">{totalW}px</b></span>
      </div>

      {/* 控制区 */}
      <ControlRow>
        <GroupLabel>box-sizing</GroupLabel>
        <PillBtn active={sizing === 'content-box'} onClick={() => setSizing('content-box')}>
          content-box
        </PillBtn>
        <PillBtn active={sizing === 'border-box'} onClick={() => setSizing('border-box')}>
          border-box
        </PillBtn>
      </ControlRow>

      <ControlRow>
        <RangeRow label="margin" value={margin} min={0} max={60} onChange={setMargin} suffix="px" />
        <Divider />
        <RangeRow label="border" value={border} min={0} max={30} onChange={setBorder} suffix="px" />
        <Divider />
        <RangeRow label="padding" value={padding} min={0} max={50} onChange={setPadding} suffix="px" />
        <Divider />
        <RangeRow label="width" value={width} min={80} max={400} onChange={setWidth} suffix="px" />
      </ControlRow>

      {/* 代码输出 */}
      <CodeOutput>
        <CommentLine>box-sizing: {sizing}</CommentLine>
        {'\n.box {\n'}
        <PropLine name="box-sizing" value={sizing} />
        <PropLine name="width" value={`${width}px`} />
        <PropLine name="margin" value={`${margin}px`} />
        <PropLine name="border" value={`${border}px solid #f3727f`} />
        <PropLine name="padding" value={`${padding}px`} />
        {'}\n\n'}
        <CommentLine>
          实际 content 宽度 = {contentW}px | 元素占据总宽度 = {totalW}px
        </CommentLine>
      </CodeOutput>
    </div>
  )
}
