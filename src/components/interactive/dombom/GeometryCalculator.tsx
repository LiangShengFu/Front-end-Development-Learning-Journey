/**
 * GeometryCalculator - 几何尺寸计算器
 *
 * 拖动改变元素尺寸，实时显示 offsetWidth/clientWidth/scrollWidth/getBoundingClientRect。
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import type { GeometryCalculatorData } from '../../../lib/dom-bom-visualization-types'
import { DemoCard, ControlRow, GroupLabel, PillBtn, CodeOutput } from './shared'

interface GeometryCalculatorProps {
  data: GeometryCalculatorData
}

interface Geometry {
  offsetWidth: number
  offsetHeight: number
  clientWidth: number
  clientHeight: number
  scrollWidth: number
  scrollHeight: number
  rectTop: number
  rectLeft: number
  rectWidth: number
  rectHeight: number
}

export function GeometryCalculator({ data }: GeometryCalculatorProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(data.initialWidth ?? 200)
  const [height, setHeight] = useState(data.initialHeight ?? 100)
  const [padding, setPadding] = useState(20)
  const [border, setBorder] = useState(4)
  const [geometry, setGeometry] = useState<Geometry | null>(null)
  const [showOverflow, setShowOverflow] = useState(false)

  const measure = useCallback(() => {
    const el = targetRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setGeometry({
      offsetWidth: el.offsetWidth,
      offsetHeight: el.offsetHeight,
      clientWidth: el.clientWidth,
      clientHeight: el.clientHeight,
      scrollWidth: el.scrollWidth,
      scrollHeight: el.scrollHeight,
      rectTop: Math.round(rect.top),
      rectLeft: Math.round(rect.left),
      rectWidth: Math.round(rect.width),
      rectHeight: Math.round(rect.height),
    })
  }, [])

  useEffect(() => {
    measure()
  }, [measure, width, height, padding, border, showOverflow])

  // ResizeObserver 监听
  useEffect(() => {
    const el = targetRef.current
    if (!el) return
    const observer = new ResizeObserver(() => measure())
    observer.observe(el)
    return () => observer.disconnect()
  }, [measure])

  const metrics = geometry
    ? [
        { group: 'offset', items: [
          { label: 'offsetWidth', value: geometry.offsetWidth, desc: '含 padding+border' },
          { label: 'offsetHeight', value: geometry.offsetHeight, desc: '含 padding+border' },
        ]},
        { group: 'client', items: [
          { label: 'clientWidth', value: geometry.clientWidth, desc: '含 padding，不含 border' },
          { label: 'clientHeight', value: geometry.clientHeight, desc: '含 padding，不含 border' },
        ]},
        { group: 'scroll', items: [
          { label: 'scrollWidth', value: geometry.scrollWidth, desc: '含溢出内容' },
          { label: 'scrollHeight', value: geometry.scrollHeight, desc: '含溢出内容' },
        ]},
        { group: 'rect', items: [
          { label: 'rect.width', value: geometry.rectWidth, desc: 'getBoundingClientRect' },
          { label: 'rect.height', value: geometry.rectHeight, desc: 'getBoundingClientRect' },
          { label: 'rect.top', value: geometry.rectTop, desc: '相对视口' },
          { label: 'rect.left', value: geometry.rectLeft, desc: '相对视口' },
        ]},
      ]
    : []

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>width</GroupLabel>
        <input
          type="range"
          min={50}
          max={400}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-32 accent-accent-sunset"
        />
        <span className="w-10 font-mono text-caption-mono-sm text-accent-sunset">{width}px</span>
        <GroupLabel>height</GroupLabel>
        <input
          type="range"
          min={30}
          max={300}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-24 accent-accent-sunset"
        />
        <span className="w-10 font-mono text-caption-mono-sm text-accent-sunset">{height}px</span>
        <GroupLabel>padding</GroupLabel>
        <input
          type="range"
          min={0}
          max={60}
          value={padding}
          onChange={(e) => setPadding(Number(e.target.value))}
          className="w-24 accent-accent-breeze"
        />
        <span className="w-10 font-mono text-caption-mono-sm text-accent-breeze">{padding}px</span>
        <GroupLabel>border</GroupLabel>
        <input
          type="range"
          min={0}
          max={20}
          value={border}
          onChange={(e) => setBorder(Number(e.target.value))}
          className="w-20 accent-orange-400"
        />
        <span className="w-10 font-mono text-caption-mono-sm text-orange-400">{border}px</span>
      </ControlRow>

      <ControlRow>
        <PillBtn active={showOverflow} onClick={() => setShowOverflow(!showOverflow)}>
          {showOverflow ? '隐藏溢出内容' : '显示溢出内容'}
        </PillBtn>
      </ControlRow>

      <div className="grid grid-cols-1 gap-md p-md lg:grid-cols-2">
        {/* 目标元素 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-md">
          <div className="mb-2 text-[0.62rem] uppercase text-body-mid">目标元素（含 padding/border）</div>
          <div className="flex items-center justify-center" style={{ minHeight: 160 }}>
            <div
              ref={targetRef}
              style={{
                width,
                height,
                padding,
                border: `${border}px solid #1ed760`,
                overflow: 'auto',
                boxSizing: 'content-box',
              }}
              className="bg-accent-sunset/10 font-mono text-caption-mono-sm text-accent-sunset"
            >
              {showOverflow ? 'A'.repeat(80) : '内容'}
            </div>
          </div>
        </div>

        {/* 尺寸数据 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
          <div className="mb-1 text-[0.62rem] uppercase text-body-mid">实时尺寸</div>
          <div className="flex flex-col gap-xs">
            {metrics.map((group) => (
              <div key={group.group} className="rounded-px bg-canvas px-sm py-xs">
                <div className="mb-px text-[0.62rem] uppercase text-body-mid">{group.group}</div>
                <div className="grid grid-cols-2 gap-xs font-mono text-caption-mono-sm">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-body">{item.label}</span>
                      <span className="text-accent-sunset">{item.value}px</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* 尺寸 API 对比 */`}</span>
        {'\n'}
        el.offsetWidth     <span className="text-body-mid">{`// = content + padding + border = ${geometry?.offsetWidth ?? '-'}`}</span>{'\n'}
        el.clientWidth     <span className="text-body-mid">{`// = content + padding（不含 border）= ${geometry?.clientWidth ?? '-'}`}</span>{'\n'}
        el.scrollWidth     <span className="text-body-mid">{`// = 含溢出的可滚动宽度 = ${geometry?.scrollWidth ?? '-'}`}</span>{'\n'}
        el.getBoundingClientRect()<span className="text-body-mid">{` // 相对视口，含小数`}</span>
      </CodeOutput>
    </DemoCard>
  )
}
