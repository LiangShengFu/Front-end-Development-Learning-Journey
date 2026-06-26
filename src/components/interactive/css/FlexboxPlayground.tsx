/**
 * FlexboxPlayground - Flexbox 交互式演示
 *
 * 完整复刻旧项目 fb-playground 的交互逻辑：
 * - 容器属性：direction / wrap / justify-content / align-items / align-content / gap
 * - 子项属性：align-self / order / flex-grow / flex-shrink / flex-basis
 * - 主轴/交叉轴指示器
 * - 实时代码输出
 *
 * 设计规范：胶囊按钮、深色画布、绿色激活态，与旧项目视觉一致。
 */
import { useState } from 'react'
import type { FlexboxPlaygroundData } from '../../../lib/css-visualization-types'
import { cn } from '../../../lib/utils'
import { ControlRow, GroupLabel, Divider, PillBtn, RangeRow, CodeOutput, PropLine, CommentLine } from './shared'

interface FlexboxPlaygroundProps {
  data: FlexboxPlaygroundData
}

interface ItemState {
  as: string
  order: number
  grow: number
  shrink: number
  basis: number
}

const COLORS = [
  'bg-accent-sunset',
  'bg-accent-breeze',
  'bg-accent-sunset-soft',
  'bg-red-400',
  'bg-zinc-400',
]

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const
const WRAPS = ['nowrap', 'wrap', 'wrap-reverse'] as const
const JUSTIFY = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const
const ALIGN_ITEMS = ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'] as const
const ALIGN_CONTENT = ['normal', 'flex-start', 'center', 'flex-end', 'space-between', 'space-around'] as const
const ALIGN_SELF = ['auto', 'flex-start', 'center', 'flex-end', 'stretch'] as const

export function FlexboxPlayground({ data }: FlexboxPlaygroundProps) {
  const itemCount = data.itemCount ?? 5
  const [dir, setDir] = useState<string>(data.defaultDirection ?? 'row')
  const [wrap, setWrap] = useState<string>('nowrap')
  const [jc, setJc] = useState<string>(data.defaultJustifyContent ?? 'flex-start')
  const [ai, setAi] = useState<string>(data.defaultAlignItems ?? 'flex-start')
  const [ac, setAc] = useState<string>('normal')
  const [gap, setGap] = useState<number>(data.defaultGap ?? 8)
  const [showAxis, setShowAxis] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [panelVisible, setPanelVisible] = useState(false)
  const [items, setItems] = useState<ItemState[]>(() =>
    Array.from({ length: itemCount }, () => ({ as: 'auto', order: 0, grow: 0, shrink: 1, basis: 0 })),
  )

  const isRow = dir.indexOf('row') === 0
  const mainAxisText = isRow
    ? dir === 'row-reverse'
      ? '← row-reverse'
      : 'row →'
    : dir === 'column-reverse'
      ? '↑ column-reverse'
      : 'column ↓'
  const crossAxisText = isRow ? 'column ↓' : 'row →'

  const selectItem = (i: number) => {
    setSelectedIdx(i)
    setPanelVisible(true)
  }

  const updateItem = (key: keyof ItemState, value: number | string) => {
    setItems((prev) => prev.map((it, idx) => (idx === selectedIdx ? { ...it, [key]: value } : it)))
  }

  const reset = () => {
    setDir(data.defaultDirection ?? 'row')
    setWrap('nowrap')
    setJc(data.defaultJustifyContent ?? 'flex-start')
    setAi(data.defaultAlignItems ?? 'flex-start')
    setAc('normal')
    setGap(data.defaultGap ?? 8)
    setItems(Array.from({ length: itemCount }, () => ({ as: 'auto', order: 0, grow: 0, shrink: 1, basis: 0 })))
    setPanelVisible(false)
    setShowAxis(false)
  }

  const sel = items[selectedIdx]
  const basisStr = sel.basis === 0 ? 'auto' : `${sel.basis}px`

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
          <span>主轴: <b className="text-accent-sunset">{mainAxisText}</b></span>
          <span>交叉轴: <b className="text-accent-sunset">{crossAxisText}</b></span>
        </div>
        <div
          className="relative flex min-h-[180px] w-full overflow-hidden rounded-sm border border-hairline bg-canvas p-xs"
          style={{
            flexDirection: dir as React.CSSProperties['flexDirection'],
            flexWrap: wrap as React.CSSProperties['flexWrap'],
            justifyContent: jc as React.CSSProperties['justifyContent'],
            alignItems: ai as React.CSSProperties['alignItems'],
            alignContent: ac as React.CSSProperties['alignContent'],
            gap: `${gap}px`,
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
                'relative flex min-w-[44px] min-h-[44px] cursor-pointer items-center justify-center rounded-xs font-bold text-black transition-all',
                COLORS[i % COLORS.length],
                selectedIdx === i && panelVisible && 'outline outline-2 outline-offset-2 outline-white',
              )}
              style={{
                alignSelf: (items[i].as === 'auto' ? undefined : items[i].as) as React.CSSProperties['alignSelf'],
                order: items[i].order,
                flex: `${items[i].grow} ${items[i].shrink} ${items[i].basis === 0 ? 'auto' : items[i].basis + 'px'}`,
              }}
            >
              <span className="absolute left-1 top-0.5 text-[10px] font-bold opacity-70">{i + 1}</span>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* 容器属性控制 */}
      <ControlRow>
        <GroupLabel>direction</GroupLabel>
        {DIRECTIONS.map((v) => (
          <PillBtn key={v} active={dir === v} onClick={() => setDir(v)}>
            {v}
          </PillBtn>
        ))}
        <Divider />
        <GroupLabel>wrap</GroupLabel>
        {WRAPS.map((v) => (
          <PillBtn key={v} active={wrap === v} onClick={() => setWrap(v)}>
            {v}
          </PillBtn>
        ))}
      </ControlRow>

      <ControlRow>
        <GroupLabel>justify-content</GroupLabel>
        {JUSTIFY.map((v) => (
          <PillBtn key={v} active={jc === v} onClick={() => setJc(v)}>
            {v.replace('flex-', '').replace('space-', '')}
          </PillBtn>
        ))}
        <Divider />
        <GroupLabel>align-items</GroupLabel>
        {ALIGN_ITEMS.map((v) => (
          <PillBtn key={v} active={ai === v} onClick={() => setAi(v)}>
            {v.replace('flex-', '')}
          </PillBtn>
        ))}
      </ControlRow>

      <ControlRow>
        <GroupLabel>align-content</GroupLabel>
        {ALIGN_CONTENT.map((v) => (
          <PillBtn key={v} active={ac === v} onClick={() => setAc(v)}>
            {v === 'normal' ? 'normal' : v.replace('flex-', '').replace('space-', '')}
          </PillBtn>
        ))}
        <Divider />
        <RangeRow label="gap" value={gap} min={0} max={40} onChange={setGap} suffix="px" />
        <Divider />
        <PillBtn active={showAxis} onClick={() => setShowAxis(!showAxis)}>
          {showAxis ? '隐藏主轴' : '显示主轴'}
        </PillBtn>
        <PillBtn onClick={reset}>重置</PillBtn>
      </ControlRow>

      {/* 子项控制面板 */}
      {panelVisible && (
        <div className="border-t border-hairline bg-canvas-soft p-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            子项 #{selectedIdx + 1} 属性
          </div>
          <ControlRow flat>
            <GroupLabel>align-self</GroupLabel>
            {ALIGN_SELF.map((v) => (
              <PillBtn key={v} active={sel.as === v} onClick={() => updateItem('as', v)}>
                {v === 'auto' ? 'auto' : v.replace('flex-', '')}
              </PillBtn>
            ))}
            <Divider />
            <RangeRow label="order" value={sel.order} min={-5} max={5} onChange={(v) => updateItem('order', v)} />
          </ControlRow>
          <ControlRow flat>
            <RangeRow label="flex-grow" value={sel.grow} min={0} max={5} onChange={(v) => updateItem('grow', v)} />
            <Divider />
            <RangeRow label="flex-shrink" value={sel.shrink} min={0} max={5} onChange={(v) => updateItem('shrink', v)} />
            <Divider />
            <RangeRow
              label="flex-basis"
              value={sel.basis}
              min={0}
              max={200}
              onChange={(v) => updateItem('basis', v)}
              displayValue={basisStr}
            />
          </ControlRow>
        </div>
      )}

      {/* 代码输出 */}
      <CodeOutput>
        <CommentLine>Flex 容器</CommentLine>
        {'\n.container {\n'}
        <PropLine name="display" value="flex" />
        <PropLine name="flex-direction" value={dir} />
        <PropLine name="flex-wrap" value={wrap} />
        <PropLine name="justify-content" value={jc} comment="主轴对齐" />
        <PropLine name="align-items" value={ai} comment="交叉轴对齐" />
        <PropLine name="align-content" value={ac} comment="多行对齐" />
        <PropLine name="gap" value={`${gap}px`} />
        {'}\n\n'}
        <CommentLine>主轴: {isRow ? '水平' : '垂直'} | 交叉轴: {isRow ? '垂直' : '水平'}</CommentLine>
        {(sel.as !== 'auto' || sel.order !== 0 || sel.grow !== 0 || sel.shrink !== 1 || sel.basis !== 0) && (
          <>
            {'\n\n'}
            <CommentLine>子项 #{selectedIdx + 1}</CommentLine>
            {`\n.item-${selectedIdx + 1} {\n`}
            {sel.as !== 'auto' && <PropLine name="align-self" value={sel.as} />}
            {sel.order !== 0 && <PropLine name="order" value={String(sel.order)} />}
            <PropLine name="flex" value={`${sel.grow} ${sel.shrink} ${basisStr}`} />
            {'}'}
          </>
        )}
      </CodeOutput>
    </div>
  )
}
