/**
 * WebpackBuildFlowVisualizer — Webpack 构建流程可视化
 *
 * 可分步执行 Webpack 构建流程：
 * Entry → Module Resolution → Loader 链 → Plugin 钩子 → Output
 *
 * ⚠️ 教学模拟：展示静态流程节点与代码片段，不执行真实 Webpack 编译。
 */
import { useState } from 'react'
import type {
  WebpackBuildFlowVisualizerData,
  WebpackBuildStep,
  FlowNode,
  FlowEdge,
} from '../../../lib/engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface WebpackBuildFlowVisualizerProps {
  data?: WebpackBuildFlowVisualizerData
}

/** 默认 Webpack 构建步骤数据 */
const DEFAULT_STEPS: WebpackBuildStep[] = [
  {
    id: 'entry',
    name: 'Entry 入口',
    description: 'Webpack 从配置的入口起点开始，构建依赖图。Entry 是依赖图的根节点，每个入口生成一个 Chunk。',
    durationMs: 12,
    codeSnippet: `// webpack.config.js
module.exports = {
  entry: {
    main: './src/index.tsx',
    vendor: './src/vendor.ts',
  },
}`,
    codeLanguage: 'js',
    nodes: [
      { id: 'config', label: 'webpack.config.js', sub: '入口配置', color: '#7d8590', bg: 'rgba(125,133,144,0.10)' },
      { id: 'entry', label: 'Entry', sub: 'main / vendor', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
      { id: 'chunk', label: 'Chunk', sub: '依赖图根', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
    ],
    edges: [
      { from: 'config', to: 'entry', label: '读取' },
      { from: 'entry', to: 'chunk', label: '创建' },
    ],
  },
  {
    id: 'resolve',
    name: 'Module Resolution 模块解析',
    description: '从 Entry 出发，递归解析 import / require，依据 resolve.extensions / alias / modules 定位文件真实路径。',
    durationMs: 280,
    codeSnippet: `// 解析规则
resolve: {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  alias: { '@': path.resolve('src') },
  modules: ['node_modules', 'src'],
}`,
    codeLanguage: 'js',
    nodes: [
      { id: 'entry', label: 'Entry', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
      { id: 'resolve', label: 'Resolver', sub: 'enhanced-resolve', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
      { id: 'file', label: '/src/App.tsx', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
      { id: 'file2', label: '/src/utils.ts', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
    ],
    edges: [
      { from: 'entry', to: 'resolve', label: 'import' },
      { from: 'resolve', to: 'file' },
      { from: 'resolve', to: 'file2', label: '递归' },
    ],
  },
  {
    id: 'loader',
    name: 'Loader 链 转换',
    description: '匹配 module.rules 后，按"从右到左、从下到上"的顺序执行 Loader 链，将非 JS 资源转换为 JS 模块。',
    durationMs: 1850,
    codeSnippet: `module: {
  rules: [
    { test: /\\.tsx?$/, use: ['babel-loader', 'ts-loader'] },
    { test: /\\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
    { test: /\\.svg$/, type: 'asset/inline' },
  ],
}`,
    codeLanguage: 'js',
    nodes: [
      { id: 'src', label: 'App.tsx', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
      { id: 'ts', label: 'ts-loader', sub: 'TS → JS', color: '#3178c6', bg: 'rgba(49,120,198,0.10)' },
      { id: 'babel', label: 'babel-loader', sub: 'JS → 兼容 JS', color: '#f5da55', bg: 'rgba(245,218,85,0.10)' },
      { id: 'ast', label: 'AST Module', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
    ],
    edges: [
      { from: 'src', to: 'ts', label: '1' },
      { from: 'ts', to: 'babel', label: '2' },
      { from: 'babel', to: 'ast', label: '3' },
    ],
  },
  {
    id: 'plugin',
    name: 'Plugin 钩子触发',
    description: '在构建生命周期不同阶段触发 Compiler / Compilation 钩子，执行代码分割、压缩、HTML 生成等扩展任务。',
    durationMs: 940,
    codeSnippet: `class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, cb) => {
      // 在产物输出前修改 assets
      cb()
    })
  }
}
// 常用插件：HtmlWebpackPlugin / MiniCssExtractPlugin / DefinePlugin`,
    codeLanguage: 'js',
    nodes: [
      { id: 'compile', label: 'Compiler', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
      { id: 'hook', label: 'emit 钩子', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
      { id: 'html', label: 'HtmlWebpackPlugin', color: '#e34c26', bg: 'rgba(227,76,38,0.10)' },
      { id: 'split', label: 'SplitChunksPlugin', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
      { id: 'assets', label: 'Assets', sub: '修改后产物', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
    ],
    edges: [
      { from: 'compile', to: 'hook' },
      { from: 'hook', to: 'html', label: '并行' },
      { from: 'hook', to: 'split', label: '并行' },
      { from: 'html', to: 'assets' },
      { from: 'split', to: 'assets' },
    ],
  },
  {
    id: 'output',
    name: 'Output 产物输出',
    description: '将最终 Chunks 写入 output.path 目录，按 filename / chunkFilename 命名规则生成 .js / .css / .html 等产物文件。',
    durationMs: 320,
    codeSnippet: `output: {
  path: path.resolve('dist'),
  filename: '[name].[contenthash:8].js',
  chunkFilename: '[name].[contenthash:8].chunk.js',
  assetModuleFilename: 'assets/[hash][ext]',
  clean: true, // 构建前清空目录
}`,
    codeLanguage: 'js',
    nodes: [
      { id: 'assets', label: 'Assets', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
      { id: 'seal', label: 'Seal', sub: '产物封装', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
      { id: 'dist', label: '/dist/', sub: 'main.[hash].js', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
      { id: 'dist2', label: '/dist/', sub: 'vendor.[hash].js', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
      { id: 'dist3', label: '/dist/', sub: 'index.html', color: '#e34c26', bg: 'rgba(227,76,38,0.10)' },
    ],
    edges: [
      { from: 'assets', to: 'seal' },
      { from: 'seal', to: 'dist' },
      { from: 'seal', to: 'dist2' },
      { from: 'seal', to: 'dist3' },
    ],
  },
]

/** 节点位置布局（按列分组） */
function layoutNodes(nodes: FlowNode[]): Record<string, FlowNode & { col: number; row: number }> {
  // 简单按入参顺序横向排布
  const result = {} as Record<string, FlowNode & { col: number; row: number }>
  nodes.forEach((n, i) => {
    result[n.id] = { ...n, col: i, row: 0 }
  })
  return result
}

export function WebpackBuildFlowVisualizer({ data }: WebpackBuildFlowVisualizerProps) {
  const steps = data?.steps ?? DEFAULT_STEPS
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const step = steps[currentIdx]
  const layouted = layoutNodes(step.nodes)

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
      setTimeout(tick, 800)
    }
    setTimeout(tick, 800)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentIdx(0)
  }

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示静态构建流程节点与代码片段，不执行真实 Webpack 编译。
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
                  ? 'bg-[#1a6cff] text-white'
                  : i < currentIdx
                    ? 'bg-[#07c160]/15 text-[#07c160]'
                    : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
              )}
              title={s.name}
            >
              {i + 1}. {s.name}
            </button>
          ))}
        </div>
        {/* 进度条 */}
        <div className="mt-md h-1 w-full overflow-hidden rounded-pill bg-canvas-bg-inset">
          <div
            className="h-full rounded-pill bg-[#1a6cff] transition-all duration-500"
            style={{ width: `${(accumulatedDuration / totalDuration) * 100}%` }}
          />
        </div>
        <div className="mt-xs flex items-center justify-between font-mono text-caption-mono-sm text-body-mid">
          <span>累计耗时：{accumulatedDuration}ms / {totalDuration}ms</span>
          <span>步骤 {currentIdx + 1} / {steps.length}</span>
        </div>
      </div>

      {/* 当前步骤详情 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* 左：流程图 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-baseline justify-between">
            <h4 className="font-mono text-body-sm text-body-hi">步骤 {currentIdx + 1} · {step.name}</h4>
            <span className="font-mono text-caption-mono-sm text-body-mid">~{step.durationMs}ms</span>
          </div>
          <p className="mb-md text-body-sm text-body-mid">{step.description}</p>

          {/* 节点流程图（横向 flex，箭头连接） */}
          <div className="overflow-x-auto">
            <div className="flex min-w-max items-stretch gap-xs">
              {step.nodes.map((n, i) => (
                <div key={n.id} className="flex items-center gap-xs">
                  <div
                    className="min-w-[88px] max-w-[140px] rounded-sm border p-sm text-center"
                    style={{ borderColor: n.color, background: n.bg }}
                  >
                    <div className="font-mono text-caption-mono-sm font-bold" style={{ color: n.color }}>
                      {n.label}
                    </div>
                    {n.sub && (
                      <div className="mt-xxs truncate text-caption-mono-sm text-body-mid" title={n.sub}>
                        {n.sub}
                      </div>
                    )}
                  </div>
                  {i < step.nodes.length - 1 && (
                    <span className="font-mono text-caption-mono-sm text-body-mid">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 边标签说明 */}
          <div className="mt-md rounded-sm bg-canvas-bg-inset p-sm">
            <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">数据流向</div>
            <div className="space-y-xxs">
              {step.edges.map((e: FlowEdge, i: number) => (
                <div key={i} className="flex items-center gap-xs font-mono text-caption-mono-sm">
                  <span className="text-body-hi">{layouted[e.from]?.label ?? e.from}</span>
                  <span className="text-body-mid">─[{e.label ?? 'flow'}]→</span>
                  <span className="text-body-hi">{layouted[e.to]?.label ?? e.to}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右：代码片段 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">配置代码</h4>
          {step.codeSnippet ? (
            <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
              {step.codeSnippet}
            </pre>
          ) : (
            <div className="text-body-sm text-body-mid">无代码示例</div>
          )}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex flex-wrap items-center gap-sm">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="rounded-pill border border-hairline px-md py-xs font-mono text-caption-mono-sm transition-all hover:border-body-hi disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← 上一步
        </button>
        <button
          onClick={handleNext}
          disabled={currentIdx === steps.length - 1}
          className="rounded-pill bg-[#1a6cff] px-md py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-[#0f55d4] disabled:cursor-not-allowed disabled:opacity-40"
        >
          下一步 →
        </button>
        <button
          onClick={handleAutoRun}
          disabled={isRunning}
          className="rounded-pill border border-[#07c160]/40 bg-[#07c160]/10 px-md py-xs font-mono text-caption-mono-sm text-[#07c160] transition-all hover:bg-[#07c160]/20 disabled:opacity-40"
        >
          {isRunning ? '▶ 播放中...' : '▶ 自动播放'}
        </button>
        <button
          onClick={handleReset}
          className="rounded-pill border border-hairline px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-all hover:border-body-hi"
        >
          ↺ 重置
        </button>
      </div>

      {/* Webpack 5 关键概念速查 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">Webpack 5 关键概念</h4>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#1a6cff]">Entry</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">依赖图起点，多入口生成多 Chunk</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#07c160]">Resolver</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">enhanced-resolve 解析模块路径</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#3178c6]">Loader</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">从右到左链式调用，转换非 JS 资源</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#f59e0b]">Plugin</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">基于 Tapable 事件钩子扩展构建流程</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#a78bfa]">Chunk</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">依赖图分割的代码块，含入口/异步/分包</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#e34c26]">Output</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">产物输出，支持 contenthash 长缓存</p>
          </div>
        </div>
      </div>
    </div>
  )
}
