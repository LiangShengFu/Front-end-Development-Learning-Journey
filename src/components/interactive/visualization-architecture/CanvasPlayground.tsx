/**
 * CanvasPlayground — Canvas 实时绘图演示
 *
 * 展示 Canvas 2D API 的核心绘图能力：
 * - 矩形（fillRect/strokeRect）
 * - 圆形（arc）
 * - 路径（beginPath/lineTo/moveTo）
 * - 文本（fillText）
 * - 动画（requestAnimationFrame 循环）
 *
 * 交互：点击图形类型切换，左侧实时绘制对应图形，右侧展示代码示例。
 * 支持高 DPI 处理（devicePixelRatio 缩放）与 rAF 动画循环。
 *
 * ⚠️ 教学模拟：所有绘制均为本地 Canvas 渲染，不依赖外部库。
 */
import { useEffect, useRef, useState } from 'react'
import type {
  CanvasPlaygroundData,
  CanvasShape,
  CanvasShapeId,
} from '../../../lib/visualization-architecture-visualization-types'
import { cn } from '../../../lib/utils'

interface CanvasPlaygroundProps {
  data?: CanvasPlaygroundData
}

/** 默认图形数据 */
const DEFAULT_SHAPES: CanvasShape[] = [
  {
    id: 'rect',
    name: '矩形',
    api: 'fillRect / strokeRect / clearRect',
    codeSnippet: `// 矩形绘制
ctx.fillStyle = '#1a6cff'
ctx.fillRect(20, 20, 120, 80)

ctx.strokeStyle = '#ec4899'
ctx.lineWidth = 3
ctx.strokeRect(160, 20, 120, 80)

// 清除区域
ctx.clearRect(40, 40, 40, 40)`,
    description: 'fillRect 填充矩形，strokeRect 描边矩形，clearRect 清除像素。是最基础的绘图 API。',
    color: '#1a6cff',
  },
  {
    id: 'circle',
    name: '圆形',
    api: 'arc / arcTo / ellipse',
    codeSnippet: `// 圆形绘制（arc）
ctx.beginPath()
ctx.arc(100, 100, 50, 0, Math.PI * 2) // 圆心(100,100) 半径50
ctx.fillStyle = '#07c160'
ctx.fill()

ctx.beginPath()
ctx.arc(220, 100, 50, 0, Math.PI) // 半圆
ctx.strokeStyle = '#f59e0b'
ctx.lineWidth = 4
ctx.stroke()`,
    description: 'arc(x, y, radius, startAngle, endAngle) 绘制圆弧。0 起始于右侧，顺时针方向（PI/2 为下方）。',
    color: '#07c160',
  },
  {
    id: 'path',
    name: '路径',
    api: 'beginPath / moveTo / lineTo / closePath',
    codeSnippet: `// 路径绘制（三角形）
ctx.beginPath()
ctx.moveTo(150, 20)   // 移动起点
ctx.lineTo(220, 120)  // 连线
ctx.lineTo(80, 120)   // 连线
ctx.closePath()       // 闭合路径
ctx.fillStyle = '#a78bfa'
ctx.fill()
ctx.strokeStyle = '#1a6cff'
ctx.lineWidth = 2
ctx.stroke()

// 贝塞尔曲线
ctx.beginPath()
ctx.moveTo(20, 160)
ctx.quadraticCurveTo(150, 80, 280, 160)
ctx.stroke()`,
    description: '路径是 Canvas 最灵活的绘图方式。moveTo 定位起点，lineTo 连线，closePath 闭合，fill/stroke 渲染。',
    color: '#a78bfa',
  },
  {
    id: 'text',
    name: '文本',
    api: 'fillText / strokeText / measureText',
    codeSnippet: `// 文本绘制
ctx.font = 'bold 32px sans-serif'
ctx.fillStyle = '#1a6cff'
ctx.textBaseline = 'top'
ctx.fillText('Canvas 文本', 20, 30)

// 描边文本
ctx.lineWidth = 1
ctx.strokeStyle = '#ec4899'
ctx.strokeText('Canvas 文本', 20, 30)

// 测量文本宽度
const width = ctx.measureText('Canvas 文本').width
console.log('文本宽度:', width)`,
    description: 'fillText 填充文本，strokeText 描边文本，measureText 测量宽度。font 属性语法同 CSS font。',
    color: '#ec4899',
  },
  {
    id: 'animation',
    name: '动画',
    api: 'requestAnimationFrame / cancelAnimationFrame',
    codeSnippet: `// rAF 动画循环
let frame = 0
let rafId

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 旋转的方块
  ctx.save()
  ctx.translate(150, 100)
  ctx.rotate((frame * Math.PI) / 180)
  ctx.fillStyle = '#1a6cff'
  ctx.fillRect(-30, -30, 60, 60)
  ctx.restore()

  frame++
  rafId = requestAnimationFrame(draw)
}

draw() // 启动循环
// cancelAnimationFrame(rafId) // 停止`,
    description: 'rAF 在每次重绘前调用回调（约 60fps），配合 clearRect + 状态变换实现动画。save/restore 保护状态。',
    color: '#f59e0b',
  },
]

/** 高 DPI 处理：将 canvas 缩放至设备像素比，避免模糊 */
function setupHighDpi(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: number, height: number) {
  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.scale(dpr, dpr)
}

export function CanvasPlayground({ data }: CanvasPlaygroundProps) {
  const shapes = data?.shapes ?? DEFAULT_SHAPES
  const highDpiNote =
    data?.highDpiNote ??
    '高 DPI 处理：canvas.width = cssWidth * devicePixelRatio，再 ctx.scale(dpr, dpr)，避免 Retina 屏模糊。'
  const animationNote =
    data?.animationNote ??
    '动画核心：requestAnimationFrame 在每次重绘前调用回调，配合 clearRect 清屏 + save/restore 状态变换。'

  const [selectedId, setSelectedId] = useState<CanvasShapeId>('rect')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  const selected = shapes.find((s) => s.id === selectedId)

  /** 绘制当前选中图形 */
  const drawShape = (ctx: CanvasRenderingContext2D, shape: CanvasShape, frame: number) => {
    const W = 300
    const H = 180
    ctx.clearRect(0, 0, W, H)

    switch (shape.id) {
      case 'rect': {
        ctx.fillStyle = '#1a6cff'
        ctx.fillRect(20, 30, 120, 80)
        ctx.strokeStyle = '#ec4899'
        ctx.lineWidth = 3
        ctx.strokeRect(160, 30, 120, 80)
        ctx.clearRect(40, 50, 40, 40)
        break
      }
      case 'circle': {
        ctx.beginPath()
        ctx.arc(90, 90, 50, 0, Math.PI * 2)
        ctx.fillStyle = '#07c160'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(210, 90, 50, 0, Math.PI)
        ctx.strokeStyle = '#f59e0b'
        ctx.lineWidth = 4
        ctx.stroke()
        break
      }
      case 'path': {
        ctx.beginPath()
        ctx.moveTo(150, 30)
        ctx.lineTo(220, 130)
        ctx.lineTo(80, 130)
        ctx.closePath()
        ctx.fillStyle = '#a78bfa'
        ctx.fill()
        ctx.strokeStyle = '#1a6cff'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(20, 160)
        ctx.quadraticCurveTo(150, 80, 280, 160)
        ctx.strokeStyle = '#ec4899'
        ctx.lineWidth = 2
        ctx.stroke()
        break
      }
      case 'text': {
        ctx.font = 'bold 28px sans-serif'
        ctx.fillStyle = '#1a6cff'
        ctx.textBaseline = 'top'
        ctx.fillText('Canvas 文本', 20, 40)
        ctx.lineWidth = 1
        ctx.strokeStyle = '#ec4899'
        ctx.strokeText('Canvas 文本', 20, 40)
        ctx.font = '14px monospace'
        ctx.fillStyle = '#7d8187'
        const w = ctx.measureText('Canvas 文本').width
        ctx.fillText(`measureText 宽度: ${Math.round(w)}px`, 20, 90)
        break
      }
      case 'animation': {
        ctx.save()
        ctx.translate(150, 90)
        ctx.rotate((frame * Math.PI) / 180)
        ctx.fillStyle = '#1a6cff'
        ctx.fillRect(-30, -30, 60, 60)
        ctx.restore()
        ctx.font = '12px monospace'
        ctx.fillStyle = '#7d8187'
        ctx.textBaseline = 'top'
        ctx.fillText(`frame: ${frame}`, 10, 10)
        break
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !selected) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setupHighDpi(canvas, ctx, 300, 180)

    // 清理上一次动画
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    if (selected.id === 'animation') {
      let frame = 0
      const tick = () => {
        drawShape(ctx, selected, frame)
        frame++
        rafRef.current = requestAnimationFrame(tick)
      }
      tick()
    } else {
      drawShape(ctx, selected, 0)
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  return (
    <div className="space-y-lg">
      {/* 图形切换按钮 */}
      <div className="flex flex-wrap gap-xs">
        {shapes.map((shape) => {
          const isActive = selectedId === shape.id
          return (
            <button
              key={shape.id}
              onClick={() => setSelectedId(shape.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: shape.color } : undefined}
            >
              {shape.name}
            </button>
          )
        })}
      </div>

      {/* 双栏：左 Canvas 实时渲染 + 右 代码示例 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        {/* Canvas 实时渲染区 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center justify-between">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              实时渲染
            </span>
            {selectedId === 'animation' && (
              <span className="rounded-pill bg-green-500/10 px-sm py-xxs font-mono text-caption-mono-xs text-green-600">
                ● rAF 运行中
              </span>
            )}
          </div>
          <div className="flex items-center justify-center rounded-sm border border-hairline bg-[repeating-conic-gradient(#f3f4f6_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-md">
            <canvas ref={canvasRef} className="rounded-sm" />
          </div>
          {selected && (
            <p className="mt-sm text-caption text-body">{selected.description}</p>
          )}
        </div>

        {/* 代码示例区 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center gap-sm">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              代码示例
            </span>
            {selected && (
              <span className="rounded-pill bg-canvas-soft px-sm py-xxs font-mono text-caption-mono-xs text-ink">
                {selected.api}
              </span>
            )}
          </div>
          {selected && (
            <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
              <code>{selected.codeSnippet}</code>
            </pre>
          )}
        </div>
      </div>

      {/* 高 DPI 与动画说明 */}
      <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
        <div className="rounded-sm border-l-4 border-[#1a6cff] bg-[#1a6cff]/8 px-md py-sm">
          <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#1a6cff]">
            高 DPI 处理
          </div>
          <p className="mt-xs text-caption text-ink">{highDpiNote}</p>
        </div>
        <div className="rounded-sm border-l-4 border-[#f59e0b] bg-[#f59e0b]/8 px-md py-sm">
          <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#f59e0b]">
            动画循环
          </div>
          <p className="mt-xs text-caption text-ink">{animationNote}</p>
        </div>
      </div>
    </div>
  )
}
