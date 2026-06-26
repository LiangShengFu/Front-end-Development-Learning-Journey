/**
 * PositionPlayground - 定位演示
 *
 * 复刻旧项目 pos-playground 的交互逻辑：
 * - 五种定位模式：static / relative / absolute / fixed / sticky
 * - top / left / z-index 滑块控制
 * - 参考容器 + 定位目标 + 兄弟元素
 * - 实时代码输出与定位说明
 */
import { useState } from 'react'
import type { PositionPlaygroundData } from '../../../lib/css-visualization-types'
import { cn } from '../../../lib/utils'
import { ControlRow, GroupLabel, Divider, PillBtn, RangeRow, CodeOutput, PropLine, CommentLine } from './shared'

interface PositionPlaygroundProps {
  data: PositionPlaygroundData
}

const POSITIONS = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const

const POSITION_DESC: Record<string, string> = {
  static: '默认值，按文档流排列，top/left/z-index 无效',
  relative: '相对自身原位置偏移，不脱离文档流',
  absolute: '脱离文档流，相对最近的非 static 祖先定位',
  fixed: '脱离文档流，相对视口定位，不随滚动移动',
  sticky: '在阈值内按文档流，超出后变为 fixed 定位',
}

export function PositionPlayground({ data }: PositionPlaygroundProps) {
  const [position, setPosition] = useState<string>(data.defaultPosition ?? 'relative')
  const [top, setTop] = useState(data.defaultTop ?? 20)
  const [left, setLeft] = useState(data.defaultLeft ?? 20)
  const [zIndex, setZIndex] = useState(data.defaultZIndex ?? 1)

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card">
      {data.title && (
        <div className="border-b border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}

      {/* 演示舞台 */}
      <div className="bg-canvas p-md">
        <div className="relative h-[260px] overflow-hidden rounded-sm border border-hairline bg-canvas-mid">
          {/* 参考标记 */}
          <div className="absolute left-4 top-4 font-mono text-caption-mono-sm text-body-mid">
            参考容器（position: relative）
          </div>

          {/* 普通流兄弟元素 */}
          <div className="absolute left-4 top-12 rounded-xs border border-hairline bg-canvas-soft px-sm py-xs font-mono text-caption-mono-sm text-body-mid">
            兄弟元素 1（static）
          </div>
          <div className="absolute left-4 top-28 rounded-xs border border-hairline bg-canvas-soft px-sm py-xs font-mono text-caption-mono-sm text-body-mid">
            兄弟元素 2（static）
          </div>

          {/* 定位目标 */}
          <div
            className={cn(
              'flex items-center justify-center rounded-xs bg-accent-sunset font-bold text-canvas',
              position === 'sticky' && 'sticky',
            )}
            style={{
              position: position as React.CSSProperties['position'],
              top: position === 'static' ? undefined : `${top}px`,
              left: position === 'static' ? undefined : `${left}px`,
              zIndex,
              width: '80px',
              height: '80px',
              margin: '60px auto',
            }}
          >
            目标
          </div>
        </div>
      </div>

      {/* 控制区 */}
      <ControlRow>
        <GroupLabel>position</GroupLabel>
        {POSITIONS.map((v) => (
          <PillBtn key={v} active={position === v} onClick={() => setPosition(v)}>
            {v}
          </PillBtn>
        ))}
      </ControlRow>

      <ControlRow>
        <RangeRow label="top" value={top} min={-50} max={150} onChange={setTop} suffix="px" />
        <Divider />
        <RangeRow label="left" value={left} min={-50} max={150} onChange={setLeft} suffix="px" />
        <Divider />
        <RangeRow label="z-index" value={zIndex} min={-5} max={10} onChange={setZIndex} />
      </ControlRow>

      {/* 说明 */}
      <div className="border-t border-hairline bg-canvas-soft px-md py-sm font-mono text-caption-mono-sm text-body-mid">
        {POSITION_DESC[position]}
      </div>

      {/* 代码输出 */}
      <CodeOutput>
        <CommentLine>position: {position}</CommentLine>
        {'\n.target {\n'}
        <PropLine name="position" value={position} />
        {position !== 'static' && <PropLine name="top" value={`${top}px`} />}
        {position !== 'static' && <PropLine name="left" value={`${left}px`} />}
        <PropLine name="z-index" value={String(zIndex)} />
        {'}'}
      </CodeOutput>
    </div>
  )
}
