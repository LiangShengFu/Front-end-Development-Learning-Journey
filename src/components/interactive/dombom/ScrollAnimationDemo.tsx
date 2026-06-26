/**
 * ScrollAnimationDemo - 滚动动画演示
 *
 * 可滚动容器，演示 scrollTo/scrollIntoView/rAF 节流滚动事件，对比触发次数。
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import type { ScrollAnimationData } from '../../../lib/dom-bom-visualization-types'
import { DemoCard, ControlRow, GroupLabel, PillBtn, CodeOutput } from './shared'

interface ScrollAnimationDemoProps {
  data: ScrollAnimationData
}

const COLORS = ['#1ed760', '#1db954', '#0d7d3a', '#ffa500', '#ff6b35', '#f7931e']

export function ScrollAnimationDemo({ data }: ScrollAnimationDemoProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [scrollTop, setScrollTop] = useState(0)
  const [directCount, setDirectCount] = useState(0)
  const [rafCount, setRafCount] = useState(0)
  const rafPendingRef = useRef(false)

  // 直接监听（每次滚动事件触发多次）
  const handleScrollDirect = useCallback(() => {
    setDirectCount((c) => c + 1)
  }, [])

  // rAF 节流监听
  const handleScrollRaf = useCallback(() => {
    if (rafPendingRef.current) return
    rafPendingRef.current = true
    requestAnimationFrame(() => {
      const el = scrollRef.current
      if (el) {
        setScrollTop(Math.round(el.scrollTop))
        setRafCount((c) => c + 1)
      }
      rafPendingRef.current = false
    })
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleScrollDirect)
    el.addEventListener('scroll', handleScrollRaf)
    return () => {
      el.removeEventListener('scroll', handleScrollDirect)
      el.removeEventListener('scroll', handleScrollRaf)
    }
  }, [handleScrollDirect, handleScrollRaf])

  const scrollToPos = (pos: number, behavior: ScrollBehavior = 'auto') => {
    scrollRef.current?.scrollTo({ top: pos, behavior })
  }

  const scrollIntoView = (idx: number) => {
    itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const resetCounts = () => {
    setDirectCount(0)
    setRafCount(0)
  }

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>scrollTo</GroupLabel>
        <PillBtn onClick={() => scrollToPos(0, 'smooth')}>顶部</PillBtn>
        <PillBtn onClick={() => scrollToPos(9999, 'smooth')}>底部</PillBtn>
        <PillBtn onClick={() => scrollToPos(200, 'smooth')}>200px</PillBtn>
        <GroupLabel>scrollIntoView</GroupLabel>
        {[0, 2, 4].map((idx) => (
          <PillBtn key={idx} variant="primary" active onClick={() => scrollIntoView(idx)}>
            第 {idx + 1} 块
          </PillBtn>
        ))}
        <PillBtn onClick={resetCounts}>重置计数</PillBtn>
      </ControlRow>

      <div className="grid grid-cols-1 gap-md p-md lg:grid-cols-2">
        {/* 可滚动容器 */}
        <div>
          <div className="mb-1 flex items-center justify-between text-[0.62rem] uppercase text-body-mid">
            <span>可滚动容器</span>
            <span>scrollTop = <span className="font-mono text-accent-sunset">{scrollTop}</span>px</span>
          </div>
          <div
            ref={scrollRef}
            className="h-[240px] overflow-y-auto rounded-xs border border-hairline bg-canvas-soft p-sm"
          >
            <div className="flex flex-col gap-sm">
              {COLORS.map((color, i) => (
                <div
                  key={i}
                  ref={(el) => { itemRefs.current[i] = el }}
                  className="flex h-[100px] items-center justify-center rounded-xs font-mono text-caption-mono-sm font-bold text-black"
                  style={{ background: color }}
                >
                  色块 {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 触发次数对比 */}
        <div className="flex flex-col gap-sm">
          <div className="rounded-xs border border-hairline bg-canvas-soft p-md">
            <div className="mb-1 text-[0.62rem] uppercase text-body-mid">事件触发次数对比</div>
            <div className="flex flex-col gap-sm font-mono text-caption-mono-sm">
              <div className="flex items-center justify-between">
                <span className="text-body">直接监听（每次都触发）</span>
                <span className="rounded-pill bg-red-400/20 px-sm py-px text-red-400">{directCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body">rAF 节流（每帧最多 1 次）</span>
                <span className="rounded-pill bg-accent-breeze/20 px-sm py-px text-accent-breeze">{rafCount}</span>
              </div>
            </div>
            <div className="mt-2 text-[0.62rem] text-body-mid">
              滚动时观察：直接监听触发次数远多于 rAF 节流（约 3-5 倍）
            </div>
          </div>

          <div className="rounded-xs border border-hairline bg-canvas-soft p-md">
            <div className="mb-1 text-[0.62rem] uppercase text-body-mid">rAF 节流原理</div>
            <pre className="overflow-x-auto font-mono text-caption-mono-sm text-body">
{`let ticking = false;
el.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update(el.scrollTop);
    ticking = false;
  });
});`}
            </pre>
          </div>
        </div>
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* 滚动 API */`}</span>
        {'\n'}
        el.<span className="text-accent-sunset">scrollTo</span>(&#123; top: 200, behavior: <span className="text-accent-sunset-soft">'smooth'</span> &#125;);{'  '}
        <span className="text-body-mid">{`// 平滑滚动到指定位置`}</span>{'\n'}
        target.<span className="text-accent-sunset">scrollIntoView</span>(&#123; behavior: <span className="text-accent-sunset-soft">'smooth'</span>, block: <span className="text-accent-sunset-soft">'center'</span> &#125;);{'\n'}
        {'\n'}
        <span className="text-accent-breeze">window</span>.addEventListener(
        <span className="text-accent-sunset-soft">'scroll'</span>, fn, &#123; passive: <span className="text-orange-400">true</span> &#125;);{'  '}
        <span className="text-body-mid">{`// passive 提升滚动性能`}</span>
      </CodeOutput>
    </DemoCard>
  )
}
