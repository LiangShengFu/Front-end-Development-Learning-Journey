/**
 * VirtualListVisualizer — 虚拟列表原理可视化
 *
 * 展示虚拟列表的核心原理：只渲染可视区域的 DOM 节点。
 * - 滚动演示：1000 条数据，仅渲染可视区域 + 缓冲条数
 * - 可视区域高亮：绿色边框标识当前可视窗口
 * - DOM 数量对比：虚拟列表 vs 传统列表的 DOM 节点数
 *
 * 交互：
 * - 拖动滚动条或滚轮滚动列表
 * - 实时显示渲染范围 / DOM 数量 / 节省比例
 *
 * ⚠️ 教学模拟：简化实现，未处理动态高度。
 */
import { useRef, useState, useCallback, useEffect } from 'react'
import type { VirtualListVisualizerData } from '../../../lib/performance-security-visualization-types'

interface VirtualListVisualizerProps {
  data?: VirtualListVisualizerData
}

interface Config {
  totalCount: number
  viewportHeight: number
  itemHeight: number
  overscan: number
}

const DEFAULT_CONFIG: Config = {
  totalCount: 1000,
  viewportHeight: 280,
  itemHeight: 32,
  overscan: 3,
}

/** 模拟数据项 */
function makeItem(index: number): { id: number; label: string; color: string } {
  const colors = ['#1a6cff', '#07c160', '#a78bfa', '#f59e0b', '#ec4899', '#14b8a6']
  return {
    id: index,
    label: `Item ${index + 1}`,
    color: colors[index % colors.length],
  }
}

export function VirtualListVisualizer({ data }: VirtualListVisualizerProps) {
  const config: Config = {
    totalCount: data?.totalCount ?? DEFAULT_CONFIG.totalCount,
    viewportHeight: data?.viewportHeight ?? DEFAULT_CONFIG.viewportHeight,
    itemHeight: data?.itemHeight ?? DEFAULT_CONFIG.itemHeight,
    overscan: data?.overscan ?? DEFAULT_CONFIG.overscan,
  }
  const note =
    data?.note ??
    '虚拟列表只渲染可视区域内的 DOM 节点（+ 上下缓冲条数），而非全部数据。1 万条数据也只渲染约 10-20 个 DOM，性能恒定。'

  const [scrollTop, setScrollTop] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // 计算可视范围
  const startIndex = Math.max(0, Math.floor(scrollTop / config.itemHeight) - config.overscan)
  const visibleCount = Math.ceil(config.viewportHeight / config.itemHeight) + config.overscan * 2
  const endIndex = Math.min(
    config.totalCount - 1,
    startIndex + visibleCount,
  )

  // 实际渲染的项
  const renderItems = []
  for (let i = startIndex; i <= endIndex; i++) {
    renderItems.push(makeItem(i))
  }

  // 总高度（撑开滚动条）
  const totalHeight = config.totalCount * config.itemHeight
  // 偏移量（撑起可视区域上方的高度）
  const offsetY = startIndex * config.itemHeight

  /** 滚动到底部 */
  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTo({ top: totalHeight, behavior: 'smooth' })
    }
  }, [totalHeight])

  /** 滚动到中部 */
  const scrollToMiddle = useCallback(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTo({ top: totalHeight / 2, behavior: 'smooth' })
    }
  }, [totalHeight])

  /** 回到顶部 */
  const scrollToTop = useCallback(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  // 自动滚动演示（首次挂载时滚动一段距离）
  const [autoDemo, setAutoDemo] = useState(false)
  useEffect(() => {
    if (!autoDemo) return
    const el = scrollRef.current
    if (!el) return
    let raf: number
    let start = 0
    const duration = 3000
    const targetScroll = totalHeight * 0.5
    const animate = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      el.scrollTop = targetScroll * progress
      if (progress < 1) {
        raf = requestAnimationFrame(animate)
      } else {
        setAutoDemo(false)
      }
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [autoDemo, totalHeight])

  // 实际 DOM 数量 vs 传统列表 DOM 数量
  const renderedDomCount = endIndex - startIndex + 1
  const traditionalDomCount = config.totalCount
  const savingRatio = Math.round((1 - renderedDomCount / traditionalDomCount) * 100)

  return (
    <div className="space-y-lg">
      {/* 说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">{note}</p>

      {/* 控制栏 */}
      <div className="flex flex-wrap items-center gap-md rounded-md border border-hairline bg-canvas-soft p-md">
        <button
          onClick={() => setAutoDemo(true)}
          disabled={autoDemo}
          className="rounded-sm bg-accent-sunset px-md py-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-white transition-colors hover:bg-accent-sunset/80 disabled:opacity-50"
        >
          ▶ 自动滚动演示
        </button>
        <button
          onClick={scrollToTop}
          className="rounded-sm border border-hairline bg-canvas px-sm py-xs font-mono text-caption-mono-xs text-body hover:border-ink/30"
        >
          ↑ 顶部
        </button>
        <button
          onClick={scrollToMiddle}
          className="rounded-sm border border-hairline bg-canvas px-sm py-xs font-mono text-caption-mono-xs text-body hover:border-ink/30"
        >
          → 中部
        </button>
        <button
          onClick={scrollToBottom}
          className="rounded-sm border border-hairline bg-canvas px-sm py-xs font-mono text-caption-mono-xs text-body hover:border-ink/30"
        >
          ↓ 底部
        </button>
      </div>

      {/* 虚拟列表 + DOM 对比 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-[1fr_240px]">
        {/* 虚拟列表容器 */}
        <div className="rounded-md border-2 border-green-500/40 bg-canvas-card p-md">
          <div className="mb-sm flex items-center justify-between">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-green-600">
              可视区域（虚拟列表）
            </span>
            <span className="font-mono text-caption-mono-xs text-body-mid">
              {config.totalCount} 条数据
            </span>
          </div>
          {/* 滚动容器 */}
          <div
            ref={scrollRef}
            onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
            className="overflow-y-auto rounded-sm border border-hairline bg-canvas"
            style={{ height: config.viewportHeight }}
          >
            {/* 撑开总高度的占位层 */}
            <div style={{ height: totalHeight, position: 'relative' }}>
              {/* 实际渲染的项 */}
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                {renderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-sm border-b border-hairline/50 px-md"
                    style={{ height: config.itemHeight }}
                  >
                    <span
                      className="inline-block h-xxs w-xs rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-mono text-caption-mono-sm text-ink">{item.label}</span>
                    <span className="ml-auto font-mono text-caption-mono-xs text-body-mid">
                      index: {item.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-xs text-center text-caption-mono-xs text-body-mid">
            ↑ 滚动列表查看渲染范围变化
          </p>
        </div>

        {/* DOM 数量对比面板 */}
        <div className="space-y-sm">
          {/* 渲染范围 */}
          <div className="rounded-md border border-hairline bg-canvas-card p-md">
            <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              当前渲染范围
            </div>
            <div className="mt-xs font-mono text-body-sm text-ink">
              [{startIndex} ~ {endIndex}]
            </div>
            <div className="mt-xxs font-mono text-caption-mono-xs text-body-mid">
              scrollTop: {Math.round(scrollTop)}px
            </div>
          </div>

          {/* DOM 数量对比 */}
          <div className="rounded-md border border-hairline bg-canvas-card p-md">
            <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              DOM 节点数对比
            </div>
            <div className="mt-xs space-y-xs">
              {/* 虚拟列表 */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-caption text-green-600">虚拟列表</span>
                  <span className="font-mono text-body-sm font-semibold text-green-600">
                    {renderedDomCount}
                  </span>
                </div>
                <div className="mt-xxs h-xxs w-full overflow-hidden rounded-full bg-canvas-soft">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${Math.min((renderedDomCount / traditionalDomCount) * 100, 100)}%` }}
                  />
                </div>
              </div>
              {/* 传统列表 */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-caption text-red-500">传统列表</span>
                  <span className="font-mono text-body-sm font-semibold text-red-500">
                    {traditionalDomCount}
                  </span>
                </div>
                <div className="mt-xxs h-xxs w-full overflow-hidden rounded-full bg-canvas-soft">
                  <div className="h-full bg-red-500" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
            <div className="mt-sm rounded-sm bg-green-500/10 px-sm py-xs text-center">
              <span className="font-mono text-caption-mono-sm text-green-600">
                节省 {savingRatio}% DOM 节点
              </span>
            </div>
          </div>

          {/* 配置信息 */}
          <div className="rounded-md border border-hairline bg-canvas-card p-md">
            <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              配置
            </div>
            <dl className="mt-xs space-y-xxs font-mono text-caption-mono-xs text-body">
              <div className="flex justify-between">
                <dt>total</dt>
                <dd className="text-ink">{config.totalCount}</dd>
              </div>
              <div className="flex justify-between">
                <dt>itemHeight</dt>
                <dd className="text-ink">{config.itemHeight}px</dd>
              </div>
              <div className="flex justify-between">
                <dt>viewport</dt>
                <dd className="text-ink">{config.viewportHeight}px</dd>
              </div>
              <div className="flex justify-between">
                <dt>overscan</dt>
                <dd className="text-ink">{config.overscan}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* 核心代码 */}
      <div className="rounded-md border border-hairline bg-canvas-card p-md">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          核心实现
        </div>
        <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-sm text-canvas">
          <code>{`function VirtualList({ items, itemHeight, viewportHeight, overscan }) {
  const [scrollTop, setScrollTop] = useState(0)
  // 计算可视范围
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const visibleCount = Math.ceil(viewportHeight / itemHeight) + overscan * 2
  const endIndex = Math.min(items.length, startIndex + visibleCount)
  // 只渲染可视范围的项
  const visibleItems = items.slice(startIndex, endIndex)
  return (
    <div onScroll={e => setScrollTop(e.target.scrollTop)} style={{ height: viewportHeight, overflowY: 'auto' }}>
      {/* 撑开总高度 */}
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {/* 偏移到正确位置 */}
        <div style={{ transform: \`translateY(\${startIndex * itemHeight}px)\` }}>
          {visibleItems.map(item => <Row key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  )
}`}</code>
        </pre>
      </div>

      <p className="text-center text-caption-mono-xs text-body-mid">
        ⚠️ 教学模拟 · 简化实现，未处理动态高度
      </p>
    </div>
  )
}
