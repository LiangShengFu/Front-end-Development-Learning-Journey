/**
 * GridPlayground - CSS Grid 交互式演示
 *
 * 复刻 FlexboxPlayground 的交互范式，针对 Grid 二维布局特性扩展：
 * - 容器属性：grid-template-columns / grid-template-rows / gap / justify-items / align-items
 * - 子项属性：grid-column span / grid-row span / justify-self / align-self
 * - 列轨道预设快捷切换（含 auto-fill + minmax 响应式一行代码）
 * - 实时代码输出
 *
 * 设计规范：复用 shared.tsx 的 PillBtn / RangeRow / CodeOutput，视觉与 Flex 演练场一致。
 */
import { useState } from 'react'
import type { GridPlaygroundData } from '../../../lib/css-visualization-types'
import { cn } from '../../../lib/utils'
import { ControlRow, GroupLabel, Divider, PillBtn, RangeRow, CodeOutput, PropLine, CommentLine } from './shared'

interface GridPlaygroundProps {
  data: GridPlaygroundData
}

interface GridItemState {
  colSpan: number
  rowSpan: number
  js: string // justify-self
  as: string // align-self
}

const COLORS = [
  'bg-accent-sunset',
  'bg-accent-breeze',
  'bg-accent-sunset-soft',
  'bg-red-400',
  'bg-zinc-400',
  'bg-amber-400',
  'bg-emerald-400',
  'bg-sky-400',
]

const COLUMN_PRESETS = [
  '1fr',
  '1fr 1fr',
  '1fr 1fr 1fr',
  'repeat(3, 1fr)',
  'repeat(4, 1fr)',
  'repeat(auto-fill, minmax(80px, 1fr))',
  '200px 1fr',
  'minmax(100px, auto)',
] as const

const ROW_PRESETS = ['auto', '1fr 1fr', '100px 100px', 'auto auto auto'] as const

const JUSTIFY_ITEMS = ['start', 'center', 'end', 'stretch'] as const
const ALIGN_ITEMS = ['start', 'center', 'end', 'stretch'] as const
const JUSTIFY_SELF = ['auto', 'start', 'center', 'end', 'stretch'] as const
const ALIGN_SELF = ['auto', 'start', 'center', 'end', 'stretch'] as const

export function GridPlayground({ data }: GridPlaygroundProps) {
  const itemCount = data.itemCount ?? 6
  const [cols, setCols] = useState<string>(data.defaultColumns ?? 'repeat(3, 1fr)')
  const [rows, setRows] = useState<string>(data.defaultRows ?? 'auto')
  const [gap, setGap] = useState<number>(data.defaultGap ?? 8)
  const [ji, setJi] = useState<string>(data.defaultJustifyItems ?? 'stretch')
  const [ai, setAi] = useState<string>(data.defaultAlignItems ?? 'stretch')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [panelVisible, setPanelVisible] = useState(false)
  const [items, setItems] = useState<GridItemState[]>(() =>
    Array.from({ length: itemCount }, () => ({ colSpan: 1, rowSpan: 1, js: 'auto', as: 'auto' })),
  )

  const selectItem = (i: number) => {
    setSelectedIdx(i)
    setPanelVisible(true)
  }

  const updateItem = (key: keyof GridItemState, value: number | string) => {
    setItems((prev) => prev.map((it, idx) => (idx === selectedIdx ? { ...it, [key]: value } : it)))
  }

  const reset = () => {
    setCols(data.defaultColumns ?? 'repeat(3, 1fr)')
    setRows(data.defaultRows ?? 'auto')
    setGap(data.defaultGap ?? 8)
    setJi(data.defaultJustifyItems ?? 'stretch')
    setAi(data.defaultAlignItems ?? 'stretch')
    setItems(Array.from({ length: itemCount }, () => ({ colSpan: 1, rowSpan: 1, js: 'auto', as: 'auto' })))
    setPanelVisible(false)
  }

  const sel = items[selectedIdx]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card">
      {data.title && (
        <div className="border-b border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}

      {/* 画布 */}
      <div className="flex flex-col gap-sm p-md">
        <div className="inline-flex items-center gap-md rounded-pill bg-canvas-mid px-md py-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          <span>列: <b className="text-accent-sunset">{cols}</b></span>
          <span>行: <b className="text-accent-sunset">{rows}</b></span>
        </div>
        <div
          className="grid min-h-[200px] w-full rounded-sm border border-hairline bg-canvas p-xs"
          style={{
            gridTemplateColumns: cols,
            gridTemplateRows: rows,
            gap: `${gap}px`,
            justifyItems: ji as React.CSSProperties['justifyItems'],
            alignItems: ai as React.CSSProperties['alignItems'],
          }}
        >
          {Array.from({ length: itemCount }, (_, i) => (
            <div
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                selectItem(i)
              }}
              className={cn(
                'flex min-w-[40px] min-h-[40px] cursor-pointer items-center justify-center rounded-xs font-bold text-black transition-all',
                COLORS[i % COLORS.length],
                selectedIdx === i && panelVisible && 'outline outline-2 outline-offset-2 outline-white',
              )}
              style={{
                gridColumn:
                  items[i].colSpan > 1 ? `span ${items[i].colSpan}` : undefined,
                gridRow: items[i].rowSpan > 1 ? `span ${items[i].rowSpan}` : undefined,
                justifySelf:
                  items[i].js === 'auto' ? undefined : (items[i].js as React.CSSProperties['justifySelf']),
                alignSelf:
                  items[i].as === 'auto' ? undefined : (items[i].as as React.CSSProperties['alignSelf']),
              }}
            >
              <span className="absolute left-1 top-0.5 text-[10px] font-bold opacity-70">{i + 1}</span>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* 列模板控制 */}
      <ControlRow>
        <GroupLabel>grid-template-columns</GroupLabel>
        {COLUMN_PRESETS.map((v) => (
          <PillBtn key={v} active={cols === v} onClick={() => setCols(v)}>
            {v}
          </PillBtn>
        ))}
      </ControlRow>

      {/* 行模板控制 */}
      <ControlRow>
        <GroupLabel>grid-template-rows</GroupLabel>
        {ROW_PRESETS.map((v) => (
          <PillBtn key={v} active={rows === v} onClick={() => setRows(v)}>
            {v}
          </PillBtn>
        ))}
        <Divider />
        <GroupLabel>justify-items</GroupLabel>
        {JUSTIFY_ITEMS.map((v) => (
          <PillBtn key={v} active={ji === v} onClick={() => setJi(v)}>
            {v}
          </PillBtn>
        ))}
        <Divider />
        <GroupLabel>align-items</GroupLabel>
        {ALIGN_ITEMS.map((v) => (
          <PillBtn key={v} active={ai === v} onClick={() => setAi(v)}>
            {v}
          </PillBtn>
        ))}
      </ControlRow>

      <ControlRow>
        <RangeRow label="gap" value={gap} min={0} max={40} onChange={setGap} suffix="px" />
        <Divider />
        <PillBtn onClick={reset}>重置</PillBtn>
      </ControlRow>

      {/* 子项控制面板 */}
      {panelVisible && (
        <div className="border-t border-hairline bg-canvas-soft p-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            子项 #{selectedIdx + 1} 属性
          </div>
          <ControlRow flat>
            <GroupLabel>grid-column span</GroupLabel>
            <RangeRow label="" value={sel.colSpan} min={1} max={6} onChange={(v) => updateItem('colSpan', v)} />
            <Divider />
            <GroupLabel>grid-row span</GroupLabel>
            <RangeRow label="" value={sel.rowSpan} min={1} max={4} onChange={(v) => updateItem('rowSpan', v)} />
          </ControlRow>
          <ControlRow flat>
            <GroupLabel>justify-self</GroupLabel>
            {JUSTIFY_SELF.map((v) => (
              <PillBtn key={v} active={sel.js === v} onClick={() => updateItem('js', v)}>
                {v}
              </PillBtn>
            ))}
            <Divider />
            <GroupLabel>align-self</GroupLabel>
            {ALIGN_SELF.map((v) => (
              <PillBtn key={v} active={sel.as === v} onClick={() => updateItem('as', v)}>
                {v}
              </PillBtn>
            ))}
          </ControlRow>
        </div>
      )}

      {/* 代码输出 */}
      <CodeOutput>
        <CommentLine>Grid 容器</CommentLine>
        {'\n.container {\n'}
        <PropLine name="display" value="grid" />
        <PropLine name="grid-template-columns" value={cols} />
        <PropLine name="grid-template-rows" value={rows} />
        <PropLine name="gap" value={`${gap}px`} />
        <PropLine name="justify-items" value={ji} comment="水平对齐" />
        <PropLine name="align-items" value={ai} comment="垂直对齐" />
        {'}'}
        {(sel.colSpan > 1 || sel.rowSpan > 1 || sel.js !== 'auto' || sel.as !== 'auto') && (
          <>
            {'\n\n'}
            <CommentLine>子项 #{selectedIdx + 1}</CommentLine>
            {`\n.item-${selectedIdx + 1} {\n`}
            {sel.colSpan > 1 && <PropLine name="grid-column" value={`span ${sel.colSpan}`} />}
            {sel.rowSpan > 1 && <PropLine name="grid-row" value={`span ${sel.rowSpan}`} />}
            {sel.js !== 'auto' && <PropLine name="justify-self" value={sel.js} />}
            {sel.as !== 'auto' && <PropLine name="align-self" value={sel.as} />}
            {'}'}
          </>
        )}
      </CodeOutput>
    </div>
  )
}
