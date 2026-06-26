/**
 * SVGvsCanvasCompare — SVG 与 Canvas 双栏对比
 *
 * 展示 SVG 与 Canvas 两大绘图方案的核心差异：
 * - 渲染方式：SVG 矢量（DOM 节点）vs Canvas 位图（像素）
 * - DOM 结构：SVG 每个图形是 DOM 节点 vs Canvas 单一 canvas 元素
 * - 事件处理：SVG 直接绑定 vs Canvas 命中检测
 * - 性能表现：SVG 少量图形优 vs Canvas 大量图形优
 * - 缩放表现：SVG 无损 vs Canvas 模糊（需高 DPI 处理）
 * - 适用场景：交互图表 vs 游戏热力图
 *
 * 交互：点击特性切换，双栏实时渲染 SVG 与 Canvas 图形对比。
 *
 * ⚠️ 教学模拟：双栏均使用真实的 SVG 与 Canvas 渲染。
 */
import { useEffect, useRef, useState } from 'react'
import type {
  SvgVsCanvasCompareData,
  SvgCanvasFeature,
  SvgCanvasFeatureId,
} from '../../../lib/visualization-architecture-visualization-types'
import { cn } from '../../../lib/utils'

interface SvgVsCanvasCompareProps {
  data?: SvgVsCanvasCompareData
}

/** 默认特性对比数据 */
const DEFAULT_FEATURES: SvgCanvasFeature[] = [
  {
    id: 'rendering',
    name: '渲染方式',
    svg: '矢量图形，每个图形是独立 DOM 节点，浏览器原生渲染',
    canvas: '位图像素，JS 绘制后变为像素，无 DOM 结构',
    recommendation: 'either',
    color: '#1a6cff',
  },
  {
    id: 'dom',
    name: 'DOM 结构',
    svg: '保留 DOM，可 inspect 调试，可被搜索引擎索引',
    canvas: '单一 <canvas> 元素，内部像素无 DOM',
    recommendation: 'svg',
    color: '#07c160',
  },
  {
    id: 'events',
    name: '事件处理',
    svg: '直接绑定到图形（onclick），事件委托自然支持',
    canvas: '需手动命中检测（isPointInPath），事件绑定在 canvas 元素',
    recommendation: 'svg',
    color: '#a78bfa',
  },
  {
    id: 'performance',
    name: '性能表现',
    svg: '图形多时 DOM 节点爆炸，>1000 个节点卡顿',
    canvas: '像素绘制，10000 个图形仍流畅',
    recommendation: 'canvas',
    color: '#f59e0b',
  },
  {
    id: 'scalability',
    name: '缩放表现',
    svg: '矢量无损放大，任意分辨率清晰',
    canvas: '位图放大模糊，需高 DPI 处理（devicePixelRatio）',
    recommendation: 'svg',
    color: '#ec4899',
  },
  {
    id: 'use-case',
    name: '适用场景',
    svg: '图标、图表、地图、可交互图形（<1000 节点）',
    canvas: '游戏、热力图、粒子、图像处理（>1000 节点）',
    recommendation: 'either',
    color: '#6b7280',
  },
]

const REC_LABEL: Record<string, string> = {
  svg: 'SVG 胜',
  canvas: 'Canvas 胜',
  either: '均可',
}

const REC_COLOR: Record<string, string> = {
  svg: '#1a6cff',
  canvas: '#f59e0b',
  either: '#6b7280',
}

export function SvgVsCanvasCompare({ data }: SvgVsCanvasCompareProps) {
  const features = data?.features ?? DEFAULT_FEATURES
  const compareNote =
    data?.compareNote ??
    'SVG 与 Canvas 的核心差异：SVG 是保留模式（DOM），Canvas 是立即模式（像素）。选型取决于图形数量、交互需求与缩放场景。'

  const [selectedId, setSelectedId] = useState<SvgCanvasFeatureId>('rendering')
  const [circleCount, setCircleCount] = useState(20)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const selected = features.find((f) => f.id === selectedId)

  /** 在 Canvas 上绘制圆圈群 */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 240
    const H = 160
    const dpr = window.devicePixelRatio || 1
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, W, H)
    // 确定性伪随机（避免每次渲染抖动）
    let seed = 42
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let i = 0; i < circleCount; i++) {
      ctx.beginPath()
      ctx.arc(rand() * (W - 20) + 10, rand() * (H - 20) + 10, 6, 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${rand() * 360}, 70%, 60%)`
      ctx.fill()
    }
  }, [circleCount])

  return (
    <div className="space-y-lg">
      {/* 对比说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {compareNote}
      </p>

      {/* 特性切换按钮 */}
      <div className="flex flex-wrap gap-xs">
        {features.map((feature) => {
          const isActive = selectedId === feature.id
          return (
            <button
              key={feature.id}
              onClick={() => setSelectedId(feature.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: feature.color } : undefined}
            >
              {feature.name}
            </button>
          )
        })}
      </div>

      {/* 双栏渲染对比 */}
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        {/* SVG 渲染栏 */}
        <div className="overflow-hidden rounded-md border-2 border-[#1a6cff]/40 bg-canvas-card">
          <div className="flex items-center justify-between bg-[#1a6cff]/8 px-md py-sm">
            <span className="font-mono text-caption-mono-sm text-[#1a6cff]">SVG</span>
            <span className="font-mono text-caption-mono-xs text-body-mid">
              {circleCount} 个 DOM 节点
            </span>
          </div>
          <div className="flex items-center justify-center bg-[repeating-conic-gradient(#f3f4f6_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-md">
            <svg width={240} height={160} className="overflow-visible">
              {Array.from({ length: circleCount }).map((_, i) => {
                const seed = (i + 1) * 42
                const x = ((seed * 9301 + 49297) % 233280) / 233280 * 220 + 10
                const y = ((seed * 17 * 9301 + 49297) % 233280) / 233280 * 140 + 10
                const hue = ((seed * 13) % 360)
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={6}
                    fill={`hsl(${hue}, 70%, 60%)`}
                    className="cursor-pointer transition-transform hover:scale-150"
                  />
                )
              })}
            </svg>
          </div>
          <p className="px-md py-sm text-caption text-body">
            矢量图形 · 可缩放 · 每个 circle 是 DOM 节点 · 可绑定事件
          </p>
        </div>

        {/* Canvas 渲染栏 */}
        <div className="overflow-hidden rounded-md border-2 border-[#f59e0b]/40 bg-canvas-card">
          <div className="flex items-center justify-between bg-[#f59e0b]/8 px-md py-sm">
            <span className="font-mono text-caption-mono-sm text-[#f59e0b]">Canvas</span>
            <span className="font-mono text-caption-mono-xs text-body-mid">
              1 个 canvas 元素
            </span>
          </div>
          <div className="flex items-center justify-center bg-[repeating-conic-gradient(#f3f4f6_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-md">
            <canvas ref={canvasRef} className="rounded-sm" />
          </div>
          <p className="px-md py-sm text-caption text-body">
            位图像素 · 高性能 · 单一 DOM · 需命中检测
          </p>
        </div>
      </div>

      {/* 节点数量调节 */}
      <div className="flex flex-wrap items-center gap-md rounded-md border border-hairline bg-canvas-soft p-md">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body">
          图形数量
        </span>
        <input
          type="range"
          min={5}
          max={100}
          step={5}
          value={circleCount}
          onChange={(e) => setCircleCount(Number(e.target.value))}
          className="h-xs flex-1 cursor-pointer appearance-none rounded-full bg-canvas-bg-inset accent-[#1a6cff]"
        />
        <span className="w-lg rounded-sm bg-canvas-card px-sm py-xs text-center font-mono text-caption-mono-sm text-ink">
          {circleCount}
        </span>
        <span className="text-caption text-body-mid">
          （{'> '}50 个时 SVG 开始卡顿，Canvas 仍流畅）
        </span>
      </div>

      {/* 选中特性详情 */}
      {selected && (
        <div
          className="rounded-md border-l-4 p-md"
          style={{ borderLeftColor: selected.color, backgroundColor: `${selected.color}10` }}
        >
          <div className="mb-sm flex items-center gap-sm">
            <h4 className="text-heading-4 text-ink">{selected.name}</h4>
            <span
              className="rounded-sm px-xs py-xxs font-mono text-caption-mono-xs text-white"
              style={{ backgroundColor: REC_COLOR[selected.recommendation] }}
            >
              {REC_LABEL[selected.recommendation]}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#1a6cff]">
                SVG
              </div>
              <p className="mt-xs text-body-sm text-ink">{selected.svg}</p>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#f59e0b]">
                Canvas
              </div>
              <p className="mt-xs text-body-sm text-ink">{selected.canvas}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
