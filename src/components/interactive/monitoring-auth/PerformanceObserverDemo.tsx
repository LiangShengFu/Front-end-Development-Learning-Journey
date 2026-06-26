/**
 * PerformanceObserverDemo — PerformanceObserver + Web Vitals 采集演示
 *
 * 演示如何用 PerformanceObserver 采集核心 Web Vitals 指标：
 * - LCP（最大内容绘制）：largest-contentful-paint
 * - INP（交互到下一次绘制）：event
 * - CLS（累计布局偏移）：layout-shift
 * - FCP（首次内容绘制）：paint
 * - TTFB（首字节时间）：navigation
 *
 * 交互：点击指标查看采集代码与评分标准；
 * 模拟"开始采集"流程展示上报数据格式。
 *
 * ⚠️ 教学模型：采集值为模拟数据，不执行真实 PerformanceObserver。
 */
'use client'

import { useState } from 'react'
import type {
  PerformanceObserverDemoData,
  PerformanceMetricEntry,
} from '../../../lib/monitoring-auth-visualization-types'
import { cn } from '../../../lib/utils'

interface PerformanceObserverDemoProps {
  data?: PerformanceObserverDemoData
}

const DEFAULT_METRICS: PerformanceMetricEntry[] = [
  {
    id: 'lcp',
    name: '最大内容绘制',
    abbr: 'LCP',
    category: 'loading',
    entryType: 'largest-contentful-paint',
    codeSnippet: `new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  reportLCP(lastEntry.startTime);
}).observe({ type: 'largest-contentful-paint', buffered: true });`,
    sampleValue: '2.1s',
    rating: 'good',
    description: '视口内最大元素渲染完成的时间点，衡量加载体验',
    color: '#1a6cff',
  },
  {
    id: 'inp',
    name: '交互到下一次绘制',
    abbr: 'INP',
    category: 'interactivity',
    entryType: 'event',
    codeSnippet: `new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // processingStart - startTime + renderTime
    const duration = entry.duration;
    trackInteraction(entry.name, duration);
  }
}).observe({ type: 'event', buffered: true });`,
    sampleValue: '180ms',
    rating: 'good',
    description: '所有交互响应的最差值，2024 年 3 月取代 FID',
    color: '#07c160',
  },
  {
    id: 'cls',
    name: '累计布局偏移',
    abbr: 'CLS',
    category: 'visual-stability',
    entryType: 'layout-shift',
    codeSnippet: `let clsValue = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  reportCLS(clsValue);
}).observe({ type: 'layout-shift', buffered: true });`,
    sampleValue: '0.08',
    rating: 'good',
    description: '累计布局偏移分数，越小越稳定',
    color: '#ec4899',
  },
  {
    id: 'fcp',
    name: '首次内容绘制',
    abbr: 'FCP',
    category: 'loading',
    entryType: 'paint',
    codeSnippet: `new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      reportFCP(entry.startTime);
    }
  }
}).observe({ type: 'paint', buffered: true });`,
    sampleValue: '1.5s',
    rating: 'good',
    description: '首次渲染文本/图像的时间点',
    color: '#a78bfa',
  },
  {
    id: 'ttfb',
    name: '首字节时间',
    abbr: 'TTFB',
    category: 'loading',
    entryType: 'navigation',
    codeSnippet: `new PerformanceObserver((list) => {
  const [nav] = list.getEntries();
  // responseStart - requestStart
  reportTTFB(nav.responseStart - nav.requestStart);
}).observe({ type: 'navigation', buffered: true });`,
    sampleValue: '420ms',
    rating: 'needs-improvement',
    description: '从请求到首字节响应的时间，衡量网络/服务端性能',
    color: '#f59e0b',
  },
  {
    id: 'tbt',
    name: '总阻塞时间',
    abbr: 'TBT',
    category: 'interactivity',
    entryType: 'longtask',
    codeSnippet: `let tbt = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // 超过 50ms 的部分计入阻塞
    tbt += Math.max(0, entry.duration - 50);
  }
}).observe({ type: 'longtask', buffered: true });`,
    sampleValue: '350ms',
    rating: 'needs-improvement',
    description: 'FCP 到 TTI 之间主线程阻塞总时长',
    color: '#ef4444',
  },
]

const RATING_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  good: { bg: 'bg-green-100 dark:bg-green-950/30', text: 'text-green-700 dark:text-green-400', label: '良好' },
  'needs-improvement': { bg: 'bg-amber-100 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-400', label: '需改进' },
  poor: { bg: 'bg-red-100 dark:bg-red-950/30', text: 'text-red-700 dark:text-red-400', label: '较差' },
}

const CATEGORY_LABELS: Record<string, string> = {
  loading: '加载性能',
  interactivity: '交互响应',
  'visual-stability': '视觉稳定',
}

const DEFAULT_BASE_CODE = `// 基础采集框架：统一上报到监控平台
class WebVitalsReporter {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.queue = [];
  }

  report(metric, value) {
    this.queue.push({
      metric,
      value,
      url: location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
    });
    this.flush();
  }

  flush() {
    // 使用 sendBeacon 确保页面卸载时也能上报
    navigator.sendBeacon(
      this.endpoint,
      JSON.stringify(this.queue)
    );
    this.queue = [];
  }
}

const reporter = new WebVitalsReporter('/api/metrics');`

export function PerformanceObserverDemo({ data }: PerformanceObserverDemoProps) {
  const metrics = data?.metrics ?? DEFAULT_METRICS
  const baseCode = data?.baseCode ?? DEFAULT_BASE_CODE

  const [activeMetric, setActiveMetric] = useState<string>(metrics[0]?.id ?? 'lcp')
  const [collecting, setCollecting] = useState(false)

  const currentMetric = metrics.find((m) => m.id === activeMetric) ?? metrics[0]
  if (!currentMetric) return null

  /** 模拟采集流程 */
  const handleCollect = () => {
    setCollecting(true)
    setTimeout(() => setCollecting(false), 1500)
  }

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface p-md">
      {/* 采集控制 */}
      <div className="mb-md flex flex-wrap items-center justify-between gap-sm">
        <div>
          <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            PerformanceObserver 采集
          </div>
          <div className="mt-xs text-caption text-body-mid">
            点击指标查看采集代码与评分标准
          </div>
        </div>
        <button
          onClick={handleCollect}
          disabled={collecting}
          className={cn(
            'rounded-md border px-md py-xs text-body-sm font-medium transition-colors',
            collecting
              ? 'border-accent-sunset bg-accent-sunset text-white'
              : 'border-accent-sunset text-accent-sunset hover:bg-accent-sunset hover:text-white',
          )}
        >
          {collecting ? '采集中...' : '▶ 模拟采集'}
        </button>
      </div>

      {/* 指标卡片矩阵 */}
      <div className="mb-md grid grid-cols-2 gap-sm md:grid-cols-3">
        {metrics.map((metric) => {
          const rating = RATING_STYLES[metric.rating] ?? RATING_STYLES['needs-improvement']
          const isActive = metric.id === activeMetric
          return (
            <button
              key={metric.id}
              onClick={() => setActiveMetric(metric.id)}
              className={cn(
                'rounded-md border p-sm text-left transition-all',
                isActive
                  ? 'border-2 shadow-sm'
                  : 'border-border-subtle hover:border-accent-sunset',
              )}
              style={isActive ? { borderColor: metric.color } : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-body-sm font-bold" style={{ color: metric.color }}>
                  {metric.abbr}
                </span>
                <span className={cn('rounded px-1 text-caption-mono-sm uppercase', rating.bg, rating.text)}>
                  {rating.label}
                </span>
              </div>
              <div className="mt-xs font-mono text-h5 text-text-base">{metric.sampleValue}</div>
              <div className="mt-xs text-caption text-body-mid">{CATEGORY_LABELS[metric.category]}</div>
            </button>
          )
        })}
      </div>

      {/* 当前指标详情 */}
      <div className="mb-md rounded-md border border-border-subtle bg-bg-base p-md">
        <div className="mb-sm flex flex-wrap items-center justify-between gap-sm">
          <div className="flex items-center gap-sm">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: currentMetric.color }}
            />
            <span className="font-mono text-body-sm font-semibold" style={{ color: currentMetric.color }}>
              {currentMetric.abbr} — {currentMetric.name}
            </span>
          </div>
          <span className="text-caption text-body-mid">
            entryType: <code className="font-mono text-accent-sunset">{currentMetric.entryType}</code>
          </span>
        </div>

        <div className="mb-sm text-body-sm text-body-mid">{currentMetric.description}</div>

        <div className="mb-sm">
          <div className="text-caption-mono-sm uppercase text-body-mid">采集代码</div>
          <pre className="mt-xs overflow-x-auto rounded bg-bg-surface p-sm font-mono text-caption text-text-base">
            {currentMetric.codeSnippet}
          </pre>
        </div>

        <div className="grid grid-cols-2 gap-sm md:grid-cols-3">
          <div className="rounded border border-green-300 bg-green-50 p-xs dark:border-green-800 dark:bg-green-950/20">
            <div className="text-caption-mono-sm uppercase text-green-700 dark:text-green-400">良好</div>
            <div className="mt-xs text-caption text-body-mid">
              {currentMetric.id === 'lcp' && '≤ 2.5s'}
              {currentMetric.id === 'inp' && '≤ 200ms'}
              {currentMetric.id === 'cls' && '≤ 0.1'}
              {currentMetric.id === 'fcp' && '≤ 1.8s'}
              {currentMetric.id === 'ttfb' && '≤ 800ms'}
              {currentMetric.id === 'tbt' && '≤ 200ms'}
            </div>
          </div>
          <div className="rounded border border-amber-300 bg-amber-50 p-xs dark:border-amber-800 dark:bg-amber-950/20">
            <div className="text-caption-mono-sm uppercase text-amber-700 dark:text-amber-400">需改进</div>
            <div className="mt-xs text-caption text-body-mid">
              {currentMetric.id === 'lcp' && '2.5 - 4.0s'}
              {currentMetric.id === 'inp' && '200 - 500ms'}
              {currentMetric.id === 'cls' && '0.1 - 0.25'}
              {currentMetric.id === 'fcp' && '1.8 - 3.0s'}
              {currentMetric.id === 'ttfb' && '800 - 1800ms'}
              {currentMetric.id === 'tbt' && '200 - 600ms'}
            </div>
          </div>
          <div className="rounded border border-red-300 bg-red-50 p-xs dark:border-red-800 dark:bg-red-950/20">
            <div className="text-caption-mono-sm uppercase text-red-700 dark:text-red-400">较差</div>
            <div className="mt-xs text-caption text-body-mid">
              {currentMetric.id === 'lcp' && '> 4.0s'}
              {currentMetric.id === 'inp' && '> 500ms'}
              {currentMetric.id === 'cls' && '> 0.25'}
              {currentMetric.id === 'fcp' && '> 3.0s'}
              {currentMetric.id === 'ttfb' && '> 1800ms'}
              {currentMetric.id === 'tbt' && '> 600ms'}
            </div>
          </div>
        </div>
      </div>

      {/* 采集上报框架 */}
      <div>
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          采集上报框架
        </div>
        <pre className="overflow-x-auto rounded-md border border-border-subtle bg-bg-base p-md font-mono text-caption text-text-base">
          {baseCode}
        </pre>
      </div>

      {/* 模拟采集结果 */}
      {collecting && (
        <div className="mt-md rounded-md border border-accent-sunset/40 bg-accent-sunset/5 p-md">
          <div className="mb-xs text-caption-mono-sm uppercase text-accent-sunset">采集上报数据（示例）</div>
          <pre className="overflow-x-auto font-mono text-caption text-text-base">
{`POST /api/metrics
[
  { "metric": "LCP", "value": 2100, "rating": "good" },
  { "metric": "INP", "value": 180,  "rating": "good" },
  { "metric": "CLS", "value": 0.08, "rating": "good" },
  { "metric": "FCP", "value": 1500, "rating": "good" },
  { "metric": "TTFB","value": 420,  "rating": "needs-improvement" }
]`}
          </pre>
        </div>
      )}

      <div className="mt-md rounded-md bg-accent-sunset/5 p-sm text-caption text-body-mid">
        💡 使用 sendBeacon 而非 fetch 上报，确保页面卸载时数据不丢失。Web Vitals 三件套：LCP（加载）+ INP（交互）+ CLS（稳定）。
      </div>
    </div>
  )
}
