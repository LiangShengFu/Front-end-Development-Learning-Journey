/**
 * ErrorMonitoringDashboard — 前端错误监控面板
 *
 * 演示前端错误监控的三大捕获方式：
 * - window.onerror：同步 JS 错误
 * - unhandledrejection：Promise 异常
 * - addEventListener('error', capture)：资源加载错误
 *
 * 交互：点击错误事件查看详情（堆栈、Source Map 还原）；
 * 切换捕获策略查看代码示例与注意事项。
 *
 * ⚠️ 教学模型：错误事件为预设示例，不触发真实异常。
 */
'use client'

import { useState } from 'react'
import type {
  ErrorMonitoringDashboardData,
  ErrorEvent,
  ErrorCaptureStrategy,
} from '../../../lib/monitoring-auth-visualization-types'
import { cn } from '../../../lib/utils'

interface ErrorMonitoringDashboardProps {
  data?: ErrorMonitoringDashboardData
}

const DEFAULT_EVENTS: ErrorEvent[] = [
  {
    id: 'err-1',
    type: 'js-error',
    message: "Cannot read properties of undefined (reading 'map')",
    source: 'app.chunk.js',
    line: 42,
    col: 18,
    stack: 'TypeError: Cannot read properties of undefined (reading "map")\n    at UserList (app.chunk.js:42:18)\n    at render (main.js:128:10)',
    severity: 'error',
    timestamp: '2026-06-26 10:23:45',
    userAgent: 'Chrome 126 / macOS',
    originalSource: 'UserList.tsx:28:12',
    count: 23,
  },
  {
    id: 'err-2',
    type: 'unhandled-rejection',
    message: 'Network request failed (status 500)',
    source: 'api.js',
    line: 156,
    col: 8,
    stack: 'Error: Network request failed\n    at fetchWithRetry (api.js:156:8)\n    at async loadData (api.js:180:14)',
    severity: 'error',
    timestamp: '2026-06-26 10:24:12',
    userAgent: 'Chrome 126 / Windows',
    originalSource: 'api.ts:142:8',
    count: 5,
  },
  {
    id: 'err-3',
    type: 'resource-error',
    message: 'Failed to load image: https://cdn.example.com/banner.png (404)',
    source: 'https://cdn.example.com/banner.png',
    severity: 'warning',
    timestamp: '2026-06-26 10:25:03',
    userAgent: 'Safari 17 / iOS',
    count: 42,
  },
  {
    id: 'err-4',
    type: 'js-error',
    message: "Unexpected token '<' (JSON.parse)",
    source: 'parser.js',
    line: 8,
    col: 22,
    stack: 'SyntaxError: Unexpected token < in JSON at position 0\n    at JSON.parse (<anonymous>)\n    at parseResponse (parser.js:8:22)',
    severity: 'fatal',
    timestamp: '2026-06-26 10:25:48',
    userAgent: 'Chrome 126 / Android',
    originalSource: 'parser.ts:5:22',
    count: 1,
  },
  {
    id: 'err-5',
    type: 'console-error',
    message: 'React Warning: Each child in a list should have a unique key prop',
    source: 'react-dom.development.js',
    severity: 'warning',
    timestamp: '2026-06-26 10:26:15',
    userAgent: 'Chrome 126 / macOS',
    count: 100,
  },
]

const DEFAULT_STRATEGIES: ErrorCaptureStrategy[] = [
  {
    id: 'onerror',
    name: 'window.onerror',
    listener: 'window.onerror = (msg, src, line, col, err) => {}',
    codeSnippet: `// 捕获同步 JS 错误（运行时异常）
window.onerror = (msg, src, line, col, err) => {
  tracker.report({
    type: 'js-error',
    message: msg,
    source: src,
    line, col,
    stack: err?.stack,
  });
};`,
    scope: '同步 JS 错误、未捕获异常',
    caveat: '无法捕获资源加载错误（img/script 404）与 Promise 异常',
    color: '#1a6cff',
  },
  {
    id: 'unhandledrejection',
    name: 'unhandledrejection',
    listener: "window.addEventListener('unhandledrejection', e => {})",
    codeSnippet: `// 捕获未处理的 Promise rejection
window.addEventListener('unhandledrejection', (e) => {
  tracker.report({
    type: 'unhandled-rejection',
    message: e.reason?.message || String(e.reason),
    stack: e.reason?.stack,
  });
});`,
    scope: 'Promise reject 未 catch、async/await 异常',
    caveat: '已 catch 的 Promise 不会触发；旧浏览器不支持',
    color: '#07c160',
  },
  {
    id: 'resource-error',
    name: 'addEventListener(error, capture)',
    listener: "window.addEventListener('error', e => {}, true)",
    codeSnippet: `// 捕获阶段监听资源加载错误（img/script/link 404）
window.addEventListener('error', (e) => {
  const target = e.target;
  if (target instanceof HTMLElement) {
    tracker.report({
      type: 'resource-error',
      message: \`Failed to load \${target.tagName}: \${target.src || target.href}\`,
      source: target.src || target.href,
    });
  }
}, true); // 🌟 必须用捕获阶段！`,
    scope: 'img/script/link/CSS 资源加载失败',
    caveat: '必须用 capture: true（捕获阶段）；window.onerror 捕获不到资源错误',
    color: '#ec4899',
  },
]

const SEVERITY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  fatal: { bg: 'bg-red-100 dark:bg-red-950/30', text: 'text-red-700 dark:text-red-400', label: '致命' },
  error: { bg: 'bg-orange-100 dark:bg-orange-950/30', text: 'text-orange-700 dark:text-orange-400', label: '错误' },
  warning: { bg: 'bg-amber-100 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-400', label: '警告' },
  info: { bg: 'bg-blue-100 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-400', label: '信息' },
}

const TYPE_LABELS: Record<string, string> = {
  'js-error': 'JS 错误',
  'unhandled-rejection': 'Promise 异常',
  'resource-error': '资源错误',
  'console-error': 'Console 错误',
}

export function ErrorMonitoringDashboard({ data }: ErrorMonitoringDashboardProps) {
  const events = data?.events ?? DEFAULT_EVENTS
  const strategies = data?.strategies ?? DEFAULT_STRATEGIES

  const [selectedEvent, setSelectedEvent] = useState<string | null>(events[0]?.id ?? null)
  const [activeStrategy, setActiveStrategy] = useState<string>(strategies[0]?.id ?? 'onerror')

  const currentEvent = events.find((e) => e.id === selectedEvent) ?? events[0]
  const currentStrategy = strategies.find((s) => s.id === activeStrategy) ?? strategies[0]

  if (!currentEvent || !currentStrategy) return null

  /** 统计信息 */
  const stats = {
    total: events.reduce((sum, e) => sum + (e.count ?? 1), 0),
    fatal: events.filter((e) => e.severity === 'fatal').length,
    error: events.filter((e) => e.severity === 'error').length,
    warning: events.filter((e) => e.severity === 'warning').length,
  }

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface p-md">
      {/* 统计概览 */}
      <div className="mb-md grid grid-cols-2 gap-sm md:grid-cols-4">
        <div className="rounded-md border border-border-subtle bg-bg-base p-sm">
          <div className="text-caption-mono-sm uppercase text-body-mid">总错误数</div>
          <div className="mt-xs font-mono text-h4 text-text-base">{stats.total}</div>
        </div>
        <div className="rounded-md border border-red-300 bg-red-50 p-sm dark:border-red-800 dark:bg-red-950/20">
          <div className="text-caption-mono-sm uppercase text-body-mid">致命</div>
          <div className="mt-xs font-mono text-h4 text-red-700 dark:text-red-400">{stats.fatal}</div>
        </div>
        <div className="rounded-md border border-orange-300 bg-orange-50 p-sm dark:border-orange-800 dark:bg-orange-950/20">
          <div className="text-caption-mono-sm uppercase text-body-mid">错误</div>
          <div className="mt-xs font-mono text-h4 text-orange-700 dark:text-orange-400">{stats.error}</div>
        </div>
        <div className="rounded-md border border-amber-300 bg-amber-50 p-sm dark:border-amber-800 dark:bg-amber-950/20">
          <div className="text-caption-mono-sm uppercase text-body-mid">警告</div>
          <div className="mt-xs font-mono text-h4 text-amber-700 dark:text-amber-400">{stats.warning}</div>
        </div>
      </div>

      {/* 错误列表 + 详情 */}
      <div className="mb-md grid grid-cols-1 gap-md lg:grid-cols-2">
        {/* 错误列表 */}
        <div>
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            错误事件列表
          </div>
          <div className="space-y-xs">
            {events.map((event) => {
              const severity = SEVERITY_STYLES[event.severity] ?? SEVERITY_STYLES.info
              return (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event.id)}
                  className={cn(
                    'w-full rounded-md border p-sm text-left transition-colors',
                    event.id === selectedEvent
                      ? 'border-accent-sunset bg-accent-sunset/5'
                      : 'border-border-subtle bg-bg-base hover:border-accent-sunset',
                  )}
                >
                  <div className="flex items-center justify-between gap-sm">
                    <span className={cn('rounded px-1 text-caption-mono-sm uppercase', severity.bg, severity.text)}>
                      {severity.label}
                    </span>
                    <span className="text-caption text-body-mid">{event.timestamp}</span>
                  </div>
                  <div className="mt-xs truncate text-body-sm text-text-base">{event.message}</div>
                  <div className="mt-xs flex items-center gap-sm text-caption text-body-mid">
                    <span>{TYPE_LABELS[event.type]}</span>
                    {event.count && event.count > 1 && (
                      <span className="rounded bg-bg-surface px-1">×{event.count}</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 错误详情 */}
        <div>
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            错误详情
          </div>
          <div className="rounded-md border border-border-subtle bg-bg-base p-md">
            <div className="mb-sm">
              <div className="text-caption-mono-sm uppercase text-body-mid">错误消息</div>
              <div className="mt-xs font-mono text-body-sm text-text-base">{currentEvent.message}</div>
            </div>

            <div className="mb-sm grid grid-cols-2 gap-sm">
              <div>
                <div className="text-caption-mono-sm uppercase text-body-mid">类型</div>
                <div className="mt-xs text-body-sm">{TYPE_LABELS[currentEvent.type]}</div>
              </div>
              <div>
                <div className="text-caption-mono-sm uppercase text-body-mid">发生时间</div>
                <div className="mt-xs text-body-sm">{currentEvent.timestamp}</div>
              </div>
            </div>

            {currentEvent.source && (
              <div className="mb-sm">
                <div className="text-caption-mono-sm uppercase text-body-mid">
                  源文件（压缩后）
                </div>
                <div className="mt-xs font-mono text-caption text-text-base">
                  {currentEvent.source}
                  {currentEvent.line && `:${currentEvent.line}`}
                  {currentEvent.col && `:${currentEvent.col}`}
                </div>
              </div>
            )}

            {currentEvent.originalSource && (
              <div className="mb-sm rounded-md border border-accent-sunset/40 bg-accent-sunset/5 p-sm">
                <div className="text-caption-mono-sm uppercase text-accent-sunset">
                  Source Map 还原
                </div>
                <div className="mt-xs font-mono text-caption text-text-base">
                  {currentEvent.originalSource}
                </div>
              </div>
            )}

            {currentEvent.stack && (
              <div className="mb-sm">
                <div className="text-caption-mono-sm uppercase text-body-mid">调用栈</div>
                <pre className="mt-xs overflow-x-auto rounded bg-bg-surface p-sm font-mono text-caption text-text-base">
                  {currentEvent.stack}
                </pre>
              </div>
            )}

            {currentEvent.userAgent && (
              <div>
                <div className="text-caption-mono-sm uppercase text-body-mid">用户代理</div>
                <div className="mt-xs text-caption text-body-mid">{currentEvent.userAgent}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 捕获策略 */}
      <div>
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          错误捕获策略
        </div>
        <div className="mb-sm flex flex-wrap gap-xs">
          {strategies.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStrategy(s.id)}
              className={cn(
                'rounded-md border px-sm py-xs font-mono text-caption transition-colors',
                s.id === activeStrategy
                  ? 'text-white'
                  : 'border-border-subtle text-body-mid hover:border-accent-sunset',
              )}
              style={s.id === activeStrategy ? { backgroundColor: s.color, borderColor: s.color } : undefined}
              aria-pressed={s.id === activeStrategy}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="rounded-md border border-border-subtle bg-bg-base p-md">
          <div className="mb-sm grid grid-cols-1 gap-sm md:grid-cols-2">
            <div>
              <div className="text-caption-mono-sm uppercase text-body-mid">监听方式</div>
              <code className="mt-xs block font-mono text-caption text-accent-sunset">
                {currentStrategy.listener}
              </code>
            </div>
            <div>
              <div className="text-caption-mono-sm uppercase text-body-mid">捕获范围</div>
              <div className="mt-xs text-body-sm">{currentStrategy.scope}</div>
            </div>
          </div>

          <div className="mb-sm">
            <div className="text-caption-mono-sm uppercase text-body-mid">代码示例</div>
            <pre className="mt-xs overflow-x-auto rounded bg-bg-surface p-sm font-mono text-caption text-text-base">
              {currentStrategy.codeSnippet}
            </pre>
          </div>

          <div className="rounded-md border border-amber-300 bg-amber-50 p-sm dark:border-amber-800 dark:bg-amber-950/20">
            <span className="text-caption-mono-sm uppercase text-amber-700 dark:text-amber-400">⚠️ 注意</span>
            <span className="ml-sm text-caption text-body-mid">{currentStrategy.caveat}</span>
          </div>
        </div>
      </div>

      {data?.sourceMapNote && (
        <div className="mt-md rounded-md bg-accent-sunset/5 p-sm text-caption text-body-mid">
          {data.sourceMapNote}
        </div>
      )}
    </div>
  )
}
