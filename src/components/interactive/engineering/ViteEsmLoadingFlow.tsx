/**
 * ViteEsmLoadingFlow — Vite 开发模式原生 ESM 加载流程
 *
 * 展示浏览器请求 → Vite 拦截 → 按需编译 → 返回 ESM 模块四阶段流程，
 * 并与 Webpack 的"全量打包后启动"形成对比。
 *
 * ⚠️ 教学模拟：不启动真实 Vite Dev Server，仅展示静态流程节点与代码。
 */
import { useState } from 'react'
import type {
  ViteEsmLoadingFlowData,
  ViteEsmStage,
} from '../../../lib/engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface ViteEsmLoadingFlowProps {
  data?: ViteEsmLoadingFlowData
}

/** 默认 Vite ESM 加载流程数据 */
const DEFAULT_STAGES: ViteEsmStage[] = [
  {
    id: 'browser-request',
    name: '浏览器请求',
    description: '浏览器加载 index.html 后，遇到 <script type="module" src="/src/main.tsx"> 直接发起 HTTP 请求，无需等待打包。',
    durationMs: 8,
    codeSnippet: `<!-- index.html -->
<script type="module" src="/src/main.tsx"></script>

<!-- 浏览器发出的请求 -->
GET /src/main.tsx
GET /src/App.tsx
GET /src/utils.ts`,
    codeLanguage: 'html',
    highlightDiff: 'Webpack 需先打包整个依赖图后才能启动；Vite 让浏览器直接按 ESM import 关系发起请求。',
    nodes: [
      { id: 'browser', label: 'Browser', sub: 'ESM 解析器', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
      { id: 'html', label: 'index.html', color: '#e34c26', bg: 'rgba(227,76,38,0.10)' },
      { id: 'req', label: 'HTTP GET', sub: '/src/main.tsx', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
    ],
    edges: [
      { from: 'browser', to: 'html', label: '加载' },
      { from: 'html', to: 'req', label: 'module src' },
    ],
  },
  {
    id: 'vite-intercept',
    name: 'Vite Dev Server 拦截',
    description: 'Vite Dev Server 中间件拦截 /src/ 开头的请求，识别 .ts/.tsx/.vue/.scss 等扩展名，转入按需编译流程。',
    durationMs: 5,
    codeSnippet: `// Vite Dev Server 中间件（简化）
server.middlewares.use(async (req, res, next) => {
  if (req.url.startsWith('/src/') && !req.url.includes('?import')) {
    const file = path.resolve(root, req.url.slice(1))
    const transformed = await transformWithEsbuild(file, { loader: 'tsx' })
    res.setHeader('Content-Type', 'application/javascript')
    return res.end(transformed.code)
  }
  next()
})`,
    codeLanguage: 'js',
    highlightDiff: 'Webpack 用内存中的 Chunk 服务；Vite 用原生 ESM + 服务端 transform，无需打包。',
    nodes: [
      { id: 'req', label: 'HTTP GET', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
      { id: 'middleware', label: 'Vite Middleware', sub: '拦截 /src/', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
      { id: 'router', label: 'Transform Router', sub: 'esbuild / Vue SFC', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
    ],
    edges: [
      { from: 'req', to: 'middleware' },
      { from: 'middleware', to: 'router', label: '路由' },
    ],
  },
  {
    id: 'on-demand-compile',
    name: '按需编译',
    description: 'esbuild（TS/JSX）或 @vitejs/plugin-vue（SFC）对单文件进行转译，将 import 路径改写为带 ?import 查询的 URL，递归触发后续请求。',
    durationMs: 12,
    codeSnippet: `// 转译后 main.tsx 内容（浏览器实际收到的 JS）
import React from '/node_modules/.vite/react.js?v=abc123'
import { App } from '/src/App.tsx?t=1690000000000'

// 路径改写：相对路径 → 绝对 URL，触发浏览器递归 ESM 请求`,
    codeLanguage: 'js',
    highlightDiff: 'esbuild 比 Babel 快 10-100 倍；按需编译只编译当前请求的文件，冷启动 < 1s。',
    nodes: [
      { id: 'file', label: 'main.tsx', sub: '原始 TS', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
      { id: 'esbuild', label: 'esbuild', sub: 'TSX → JS', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
      { id: 'rewrite', label: 'Import Rewrite', sub: '路径改写', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
    ],
    edges: [
      { from: 'file', to: 'esbuild' },
      { from: 'esbuild', to: 'rewrite' },
    ],
  },
  {
    id: 'return-esm',
    name: '返回 ESM 模块',
    description: 'Vite 设置 Content-Type: application/javascript，浏览器将其作为 ESM 模块解析，遇到 import 语句递归发起新请求，形成依赖图。',
    durationMs: 6,
    codeSnippet: `HTTP/1.1 200 OK
Content-Type: application/javascript
Cache-Control: max-age=31536000, immutable
ETag: W/"abc123"

import React from '/node_modules/.vite/react.js?v=abc123'
import { App } from '/src/App.tsx'
// 浏览器递归发起上面两个请求`,
    codeLanguage: 'http',
    highlightDiff: 'Webpack 全量打包成 bundle；Vite 让浏览器原生 ESM 递归加载，依赖越大优势越明显。',
    nodes: [
      { id: 'js', label: 'JS Module', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
      { id: 'browser', label: 'Browser', sub: 'ESM 解析', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
      { id: 'import', label: '递归 import', sub: '触发新请求', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
    ],
    edges: [
      { from: 'js', to: 'browser', label: '200 OK' },
      { from: 'browser', to: 'import', label: '解析 import' },
    ],
  },
]

export function ViteEsmLoadingFlow({ data }: ViteEsmLoadingFlowProps) {
  const stages = data?.stages ?? DEFAULT_STAGES
  const [currentIdx, setCurrentIdx] = useState(0)
  const [requestLog, setRequestLog] = useState<string[]>([])

  const stage = stages[currentIdx]

  /** 模拟一次完整的 ESM 请求 */
  const handleSimulateRequest = () => {
    const logs: string[] = []
    stages.forEach((s, i) => {
      logs.push(`[${new Date().toISOString().slice(11, 23)}] 阶段 ${i + 1} ${s.name} (${s.durationMs}ms)`)
    })
    setRequestLog(logs)
    setCurrentIdx(0)
    let idx = 0
    const tick = () => {
      if (idx >= stages.length - 1) return
      idx += 1
      setCurrentIdx(idx)
      setTimeout(tick, 700)
    }
    setTimeout(tick, 700)
  }

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：不启动真实 Vite Dev Server，仅展示静态流程节点与代码。
      </div>

      {/* 阶段切换 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap items-center gap-xs">
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentIdx(i)}
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm transition-all',
                i === currentIdx
                  ? 'bg-[#a78bfa] text-white'
                  : i < currentIdx
                    ? 'bg-[#07c160]/15 text-[#07c160]'
                    : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
              )}
            >
              {i + 1}. {s.name}
            </button>
          ))}
          <button
            onClick={handleSimulateRequest}
            className="ml-auto rounded-pill bg-[#07c160] px-md py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-[#058a4a]"
          >
            ▶ 模拟请求
          </button>
        </div>
      </div>

      {/* 当前阶段详情 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* 左：流程图 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-baseline justify-between">
            <h4 className="font-mono text-body-sm text-body-hi">阶段 {currentIdx + 1} · {stage.name}</h4>
            <span className="font-mono text-caption-mono-sm text-body-mid">~{stage.durationMs}ms</span>
          </div>
          <p className="mb-md text-body-sm text-body-mid">{stage.description}</p>

          <div className="overflow-x-auto">
            <div className="flex min-w-max items-stretch gap-xs">
              {stage.nodes.map((n, i) => (
                <div key={n.id} className="flex items-center gap-xs">
                  <div
                    className="min-w-[96px] max-w-[140px] rounded-sm border p-sm text-center"
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
                  {i < stage.nodes.length - 1 && (
                    <span className="font-mono text-caption-mono-sm text-body-mid">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 与 Webpack 差异 */}
          <div className="mt-md rounded-sm border border-[#a78bfa]/30 bg-[#a78bfa]/8 p-sm">
            <div className="mb-xs font-mono text-caption-mono-sm font-bold text-[#7c3aed]">
              与 Webpack 关键差异
            </div>
            <p className="text-caption-mono-sm text-body-hi">{stage.highlightDiff}</p>
          </div>
        </div>

        {/* 右：代码片段 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">实现代码</h4>
          {stage.codeSnippet && (
            <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
              {stage.codeSnippet}
            </pre>
          )}
        </div>
      </div>

      {/* 请求日志（模拟） */}
      {requestLog.length > 0 && (
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">模拟请求日志</h4>
          <div className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm">
            {requestLog.map((line, i) => (
              <div key={i} className={cn(i === currentIdx ? 'text-[#a78bfa]' : 'text-body-mid')}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vite vs Webpack 性能对比 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">Vite vs Webpack 开发模式对比</h4>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm text-body-mid">冷启动</div>
            <div className="mt-xs font-mono text-body-sm font-bold text-[#07c160]">&lt; 1s</div>
            <div className="text-caption-mono-sm text-body-mid">vs Webpack 10-60s</div>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm text-body-mid">HMR 速度</div>
            <div className="mt-xs font-mono text-body-sm font-bold text-[#07c160]">毫秒级</div>
            <div className="text-caption-mono-sm text-body-mid">不受项目规模影响</div>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm text-body-mid">编译工具</div>
            <div className="mt-xs font-mono text-body-sm font-bold text-[#f59e0b]">esbuild</div>
            <div className="text-caption-mono-sm text-body-mid">Go 实现，比 Babel 快 10-100x</div>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm text-body-mid">生产构建</div>
            <div className="mt-xs font-mono text-body-sm font-bold text-[#1a6cff]">Rollup</div>
            <div className="text-caption-mono-sm text-body-mid">Tree-shaking 更彻底</div>
          </div>
        </div>
      </div>
    </div>
  )
}
