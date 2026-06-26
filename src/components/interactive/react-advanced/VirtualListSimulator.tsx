/**
 * VirtualListSimulator — 虚拟列表原理模拟器
 *
 * 可视化对比「全量渲染」和「虚拟列表」两种策略：
 * - 左侧全量渲染：显示全部条目的灰色方阵示意
 * - 右侧虚拟列表：仅显示可视区域 + 上下缓冲区
 * 可拖动滚动条，实时更新虚拟列表的可视窗口位置。
 * 统计面板对比 DOM 节点数和估算内存。
 *
 * 对应docx中演示 #6
 */
import { useMemo, useState } from 'react'
import type { VirtualListSimulatorData } from '../../../lib/react-advanced-visualization-types'
import { cn } from '../../../lib/utils'

interface VirtualListSimulatorProps {
  data?: VirtualListSimulatorData
}

export function VirtualListSimulator({ data }: VirtualListSimulatorProps) {
  const totalItems = data?.totalItems ?? 5000
  const itemHeight = data?.itemHeight ?? 35
  const containerHeight = data?.containerHeight ?? 350
  const overscan = data?.overscan ?? 4

  const [scrollTop, setScrollTop] = useState(0)

  // 计算虚拟列表的可视窗口
  const { visibleStart, visibleEnd, visibleItems } = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const endIndex = Math.min(
      totalItems - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight) + overscan,
    )
    const items = []
    for (let i = startIndex; i <= endIndex; i++) {
      items.push(i)
    }
    return { visibleStart: startIndex, visibleEnd: endIndex, visibleItems: items }
  }, [scrollTop, itemHeight, containerHeight, overscan, totalItems])

  const totalHeight = totalItems * itemHeight
  const offsetY = visibleStart * itemHeight

  // 估算内存（每节点约 0.5KB）
  const fullMemory = (totalItems * 0.5).toFixed(1)
  const virtualMemory = (visibleItems.length * 0.5).toFixed(1)

  // 全量渲染展示的节点数（压缩显示）
  const displayGridSize = Math.min(100, totalItems)

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 滚动控制 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          滚动位置
        </span>
        <input
          type="range"
          min={0}
          max={Math.max(0, totalHeight - containerHeight)}
          value={scrollTop}
          onChange={(e) => setScrollTop(Number(e.target.value))}
          className="flex-1 accent-accent-sunset"
        />
        <span className="font-mono text-caption-mono-sm text-ink">
          {Math.round((scrollTop / Math.max(1, totalHeight - containerHeight)) * 100)}%
        </span>
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-2">
        {/* 全量渲染 */}
        <div>
          <div className="mb-md flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-red-500">
              全量渲染
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">{totalItems} 个 DOM 节点</span>
          </div>
          <div
            className="overflow-hidden rounded-sm border border-red-500/20 bg-canvas-soft"
            style={{ height: `${containerHeight}px` }}
          >
            <div className="grid grid-cols-10 gap-px p-xs" style={{ gridAutoRows: `${itemHeight}px` }}>
              {Array.from({ length: displayGridSize }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center rounded-xxs bg-red-500/10 font-mono text-caption-mono-sm text-body-mid"
                  style={{ height: `${itemHeight - 4}px` }}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center bg-red-500/5 px-md py-sm text-center">
              <span className="font-mono text-caption-mono-sm text-red-500">
                ... 共 {totalItems} 个节点（仅展示前 {displayGridSize} 个）
              </span>
            </div>
          </div>
          <div className="mt-xs space-y-xs">
            <div className="flex items-center justify-between font-mono text-caption-mono-sm">
              <span className="text-body-mid">DOM 节点数</span>
              <span className="text-red-500">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between font-mono text-caption-mono-sm">
              <span className="text-body-mid">估算内存</span>
              <span className="text-red-500">{fullMemory} KB</span>
            </div>
            <div className="flex items-center justify-between font-mono text-caption-mono-sm">
              <span className="text-body-mid">首次渲染</span>
              <span className="text-red-500">慢（{totalItems} 项）</span>
            </div>
          </div>
        </div>

        {/* 虚拟列表 */}
        <div>
          <div className="mb-md flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
              虚拟列表
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">{visibleItems.length} 个 DOM 节点</span>
          </div>
          <div
            className="relative overflow-hidden rounded-sm border border-accent-dusk/20 bg-canvas-soft"
            style={{ height: `${containerHeight}px` }}
          >
            {/* 占位撑开总高度 */}
            <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
              {/* 可视区域节点 */}
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                {visibleItems.map((idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'flex items-center rounded-xxs px-md font-mono text-caption-mono-sm text-ink',
                      'border-b border-hairline bg-accent-dusk/5',
                    )}
                    style={{ height: `${itemHeight}px` }}
                  >
                    <span className="text-body-mid">#{String(idx).padStart(4, '0')}</span>
                    <span className="ml-md text-ink">Item {idx}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* 可视窗口高亮框 */}
            <div
              className="pointer-events-none absolute left-0 right-0 border-2 border-accent-sunset/40"
              style={{
                top: `${scrollTop}px`,
                height: `${containerHeight}px`,
                background: 'linear-gradient(to bottom, transparent, rgba(255,122,23,0.05), transparent)',
              }}
            >
              <span className="absolute -right-xs -top-xs rounded-pill bg-accent-sunset px-xs py-xxs font-mono text-caption-mono-sm text-on-primary">
                可视区
              </span>
            </div>
          </div>
          <div className="mt-xs space-y-xs">
            <div className="flex items-center justify-between font-mono text-caption-mono-sm">
              <span className="text-body-mid">DOM 节点数</span>
              <span className="text-accent-dusk">{visibleItems.length}</span>
            </div>
            <div className="flex items-center justify-between font-mono text-caption-mono-sm">
              <span className="text-body-mid">估算内存</span>
              <span className="text-accent-dusk">{virtualMemory} KB</span>
            </div>
            <div className="flex items-center justify-between font-mono text-caption-mono-sm">
              <span className="text-body-mid">首次渲染</span>
              <span className="text-accent-dusk">快（仅 {visibleItems.length} 项）</span>
            </div>
          </div>
        </div>
      </div>

      {/* 可视窗口信息 */}
      <div className="mt-xl rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          虚拟列表计算详情
        </div>
        <div className="grid grid-cols-2 gap-md font-mono text-caption-mono-sm sm:grid-cols-4">
          <div>
            <span className="text-body-mid">startIndex</span>
            <div className="text-ink">{visibleStart}</div>
          </div>
          <div>
            <span className="text-body-mid">endIndex</span>
            <div className="text-ink">{visibleEnd}</div>
          </div>
          <div>
            <span className="text-body-mid">overscan</span>
            <div className="text-ink">{overscan}</div>
          </div>
          <div>
            <span className="text-body-mid">offsetY</span>
            <div className="text-ink">{offsetY}px</div>
          </div>
        </div>
      </div>

      <div className="mt-lg rounded-sm border border-accent-dusk/20 bg-accent-dusk/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          💡 虚拟列表核心：用空 div 撑开总高度，仅渲染可视区域 + 缓冲区的节点。
          公式：startIndex = floor(scrollTop / itemHeight) - overscan，
          endIndex = ceil((scrollTop + containerHeight) / itemHeight) + overscan。
        </p>
      </div>
    </div>
  )
}
