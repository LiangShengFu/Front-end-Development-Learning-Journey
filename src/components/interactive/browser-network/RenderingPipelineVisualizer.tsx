/**
 * RenderingPipelineVisualizer — 浏览器渲染流水线可视化
 *
 * 分步展示浏览器渲染流程：
 * HTML 解析 → DOM 构建 → CSS 解析 → CSSOM 构建 → Render Tree → Layout → Paint → Composite
 *
 * ⚠️ 教学模拟：展示静态渲染阶段与产物，不执行真实浏览器渲染。
 */
import { useState } from 'react'
import type {
  RenderingPipelineVisualizerData,
  RenderingPipelineStep,
} from '../../../lib/browser-network-visualization-types'
import { cn } from '../../../lib/utils'

interface RenderingPipelineVisualizerProps {
  data?: RenderingPipelineVisualizerData
}

/** 默认渲染流水线步骤数据 */
const DEFAULT_STEPS: RenderingPipelineStep[] = [
  {
    id: 'html-parse',
    name: 'HTML 解析',
    description: '浏览器从网络或缓存获取 HTML 字节流，按字符编码解码为字符，再按 HTML5 规范词法分析为 Token。',
    input: '字节流（UTF-8 编码）',
    output: 'Token 流',
    durationMs: 8,
    color: '#1a6cff',
    codeSnippet: `<!-- HTML 字节流 -->
<html>
  <head><link rel="stylesheet" href="style.css"></head>
  <body><div class="box">Hello</div></body>
</html>`,
    codeLanguage: 'html',
  },
  {
    id: 'dom-build',
    name: 'DOM 构建',
    description: 'Token 经树构造算法生成 DOM Tree。每个标签成为 Element 节点，文本成为 Text 节点。DOM 是文档的对象表示，也是 JS 操作的目标。',
    input: 'Token 流',
    output: 'DOM Tree',
    durationMs: 15,
    color: '#07c160',
    codeSnippet: `document
└── html
    ├── head
    │   └── link[rel=stylesheet]
    └── body
        └── div.box
            └── #text "Hello"`,
    codeLanguage: 'text',
  },
  {
    id: 'css-parse',
    name: 'CSS 解析',
    description: 'CSS 字节流经词法/语法分析生成 CSS Rule。遇到 @import / link 会阻塞渲染（不阻塞 DOM 解析）。',
    input: 'CSS 字节流',
    output: 'CSS Rule 列表',
    durationMs: 6,
    color: '#a78bfa',
    codeSnippet: `/* style.css */
.box {
  width: 100px;
  height: 100px;
  background: #1a6cff;
  color: white;
}`,
    codeLanguage: 'css',
  },
  {
    id: 'cssom-build',
    name: 'CSSOM 构建',
    description: 'CSS Rule 按选择器优先级、层叠规则合并为 CSSOM Tree。CSSOM 是只读的，JS 无法直接修改结构（只能改 style）。CSSOM 完成前页面不会渲染。',
    input: 'CSS Rule 列表',
    output: 'CSSOM Tree',
    durationMs: 4,
    color: '#a78bfa',
    codeSnippet: `CSSOM
└── (默认 UA 样式)
    └── div
        └── .box
            ├── width: 100px
            ├── height: 100px
            ├── background: #1a6cff
            └── color: white`,
    codeLanguage: 'text',
  },
  {
    id: 'render-tree',
    name: 'Render Tree 合并',
    description: 'DOM + CSSOM 合并为 Render Tree。注意：<head>、<meta>、display:none 的元素不会进入 Render Tree。visibility:hidden 会进入（占位但不绘制）。',
    input: 'DOM Tree + CSSOM Tree',
    output: 'Render Tree',
    durationMs: 5,
    color: '#f59e0b',
    codeSnippet: `Render Tree（仅可见节点）
└── div.box
    ├── width: 100px
    ├── height: 100px
    ├── background: #1a6cff
    └── color: white
    └── #text "Hello"

// 注意：head/meta/script 不在 Render Tree
// display:none 的元素也不在`,
    codeLanguage: 'text',
  },
  {
    id: 'layout',
    name: 'Layout 布局计算',
    description: '计算每个 Render Tree 节点的几何信息（位置、大小）。从根节点递归向下，按盒模型、Flex/Grid 规则计算。改变尺寸/位置触发 Reflow（重排）。',
    input: 'Render Tree',
    output: 'Layout Tree（含几何信息）',
    durationMs: 12,
    color: '#ef4444',
    codeSnippet: `Layout Tree
└── div.box
    ├── x: 8, y: 8
    ├── width: 100, height: 100
    ├── padding: 0, margin: 0
    └── #text "Hello" (x:12, y:12)`,
    codeLanguage: 'text',
  },
  {
    id: 'paint',
    name: 'Paint 绘制',
    description: '将 Layout Tree 转换为绘制指令（绘制顺序：背景 → 边框 → 文本 → 阴影）。生成多个绘制图层（Layer）。改变颜色/背景触发 Repaint（重绘，不重排）。',
    input: 'Layout Tree',
    output: 'Paint Records + Layers',
    durationMs: 18,
    color: '#ec4899',
    codeSnippet: `Paint Records:
1. drawRect(8,8,100,100, fill=#1a6cff)
2. drawText("Hello", 12,12, color=white)

Layers:
- Layer #1 (主层)
- Layer #2 (will-change/transform 创建)`,
    codeLanguage: 'text',
  },
  {
    id: 'composite',
    name: 'Composite 合成',
    description: '合成线程将多个 Layer 分块（Tile），栅格化为位图，GPU 按层合成最终图像。transform/opacity 只触发合成，性能最佳（推荐动画属性）。',
    input: 'Paint Records + Layers',
    output: '屏幕像素',
    durationMs: 6,
    color: '#06b6d4',
    codeSnippet: `// 推荐高性能动画属性：
.box {
  transform: translateX(100px);  // 仅合成
  opacity: 0.5;                   // 仅合成
}

// 避免：
.box {
  left: 100px;     // 触发 Layout
  color: red;      // 触发 Paint
}`,
    codeLanguage: 'css',
  },
]

export function RenderingPipelineVisualizer({ data }: RenderingPipelineVisualizerProps) {
  const steps = data?.steps ?? DEFAULT_STEPS
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const step = steps[currentIdx]
  const totalDuration = steps.reduce((sum, s) => sum + s.durationMs, 0)
  const accumulatedDuration = steps.slice(0, currentIdx + 1).reduce((sum, s) => sum + s.durationMs, 0)

  /** 单步前进 */
  const handleNext = () => {
    if (currentIdx < steps.length - 1) setCurrentIdx((i) => i + 1)
  }
  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1)
  }

  /** 自动播放全部步骤 */
  const handleAutoRun = () => {
    if (isRunning) return
    setIsRunning(true)
    let idx = currentIdx
    const tick = () => {
      if (idx >= steps.length - 1) {
        setIsRunning(false)
        return
      }
      idx += 1
      setCurrentIdx(idx)
      setTimeout(tick, 900)
    }
    setTimeout(tick, 900)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentIdx(0)
  }

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示静态渲染阶段与产物，不执行真实浏览器渲染。
      </div>

      {/* 步骤导航条 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap items-center gap-xs">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentIdx(i)}
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm transition-all',
                i === currentIdx
                  ? 'text-white'
                  : i < currentIdx
                    ? 'bg-[#07c160]/15 text-[#07c160]'
                    : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
              )}
              style={i === currentIdx ? { background: s.color } : undefined}
              title={s.name}
            >
              {i + 1}. {s.name}
            </button>
          ))}
        </div>
        {/* 进度条 */}
        <div className="mt-md h-1 w-full overflow-hidden rounded-pill bg-canvas-bg-inset">
          <div
            className="h-full rounded-pill transition-all duration-500"
            style={{
              width: `${(accumulatedDuration / totalDuration) * 100}%`,
              background: step.color,
            }}
          />
        </div>
        <div className="mt-xs flex items-center justify-between font-mono text-caption-mono-sm text-body-mid">
          <span>累计耗时：{accumulatedDuration}ms / {totalDuration}ms</span>
          <span>步骤 {currentIdx + 1} / {steps.length}</span>
        </div>
      </div>

      {/* 当前步骤详情 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* 左：阶段说明 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-center gap-sm">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: step.color }}
            />
            <h4 className="font-mono text-body-sm text-body-hi">{step.name}</h4>
          </div>
          <p className="mb-md text-body-sm text-body-mid leading-relaxed">{step.description}</p>
          <div className="space-y-sm">
            {step.input && (
              <div className="flex items-start gap-sm">
                <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">输入</span>
                <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{step.input}</span>
              </div>
            )}
            <div className="flex items-start gap-sm">
              <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">输出</span>
              <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{step.output}</span>
            </div>
            <div className="flex items-start gap-sm">
              <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">耗时</span>
              <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{step.durationMs}ms</span>
            </div>
          </div>
        </div>

        {/* 右：代码示例 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-center justify-between">
            <h4 className="font-mono text-body-sm text-body-hi">阶段产物示例</h4>
            {step.codeLanguage && (
              <span className="rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">
                {step.codeLanguage}
              </span>
            )}
          </div>
          <pre className="min-w-0 overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
            <code>{step.codeSnippet}</code>
          </pre>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex flex-wrap items-center justify-between gap-sm rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap gap-xs">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="rounded-pill bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-hi transition-all hover:bg-canvas-bg-hover disabled:opacity-40"
          >
            ← 上一步
          </button>
          <button
            onClick={handleNext}
            disabled={currentIdx === steps.length - 1}
            className="rounded-pill bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-hi transition-all hover:bg-canvas-bg-hover disabled:opacity-40"
          >
            下一步 →
          </button>
        </div>
        <div className="flex gap-xs">
          <button
            onClick={handleAutoRun}
            disabled={isRunning}
            className="rounded-pill bg-[#07c160] px-md py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-[#06a050] disabled:opacity-40"
          >
            {isRunning ? '▶ 自动播放中...' : '▶ 自动播放'}
          </button>
          <button
            onClick={handleReset}
            className="rounded-pill bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-all hover:bg-canvas-bg-hover"
          >
            ↺ 重置
          </button>
        </div>
      </div>
    </div>
  )
}
