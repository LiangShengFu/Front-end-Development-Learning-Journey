/**
 * CoreWebVitalsVisualizer — Core Web Vitals 指标矩阵可视化
 *
 * 展示 Core Web Vitals 性能指标体系：
 * - LCP（最大内容绘制）：加载性能
 * - INP（交互到下一次绘制）：交互响应
 * - CLS（累计布局偏移）：视觉稳定
 * - FCP（首次内容绘制）：加载起点
 * - TTI（可交互时间）：可交互
 * - TBT（总阻塞时间）：主线程阻塞
 *
 * 交互：点击指标卡片展示优秀/需改进/较差阈值 + 测量方式 + 优化方向。
 *
 * ⚠️ 教学模型：阈值为 Google 官方标准（2024）。
 */
import { useState } from 'react'
import type {
  CoreWebVitalsVisualizerData,
  CoreWebVitalMetric,
  CoreWebVitalId,
} from '../../../lib/performance-security-visualization-types'
import { cn } from '../../../lib/utils'

interface CoreWebVitalsVisualizerProps {
  data?: CoreWebVitalsVisualizerData
}

/** 默认 Core Web Vitals 指标数据 */
const DEFAULT_METRICS: CoreWebVitalMetric[] = [
  {
    id: 'lcp',
    name: '最大内容绘制',
    abbr: 'LCP',
    category: 'loading',
    description: '测量页面主要内容加载完成的时间点。即视口内最大的文本块或图像元素完成渲染的时刻。',
    goodThreshold: '≤ 2.5s',
    needsImprovementThreshold: '2.5s - 4.0s',
    poorThreshold: '> 4.0s',
    measurement: 'PerformanceObserver 监听 largest-contentful-paint 条目',
    optimizations: [
      '预加载关键资源（preload 关键字体/图片）',
      '使用 CDN 加速静态资源',
      '优化图片格式（WebP/AVIF）+ 响应式图片 srcset',
      '减少阻塞渲染的 CSS/JS（关键 CSS 内联）',
      '使用 Resource Hints（preconnect/dns-prefetch）',
    ],
    isCore: true,
    color: '#1a6cff',
  },
  {
    id: 'inp',
    name: '交互到下一次绘制',
    abbr: 'INP',
    category: 'interactivity',
    description: '测量页面生命周期内所有用户交互的响应速度，取最差值。2024 年 3 月取代 FID 成为 Core Web Vitals。',
    goodThreshold: '≤ 200ms',
    needsImprovementThreshold: '200ms - 500ms',
    poorThreshold: '> 500ms',
    measurement: 'PerformanceObserver 监听 interaction 事件（pointerdown/keydow 等）',
    optimizations: [
      '减少长任务（Long Task > 50ms）',
      '使用 requestIdleCallback 延迟非关键任务',
      '防抖节流高频事件（scroll/resize/input）',
      '使用 Web Worker 处理重计算',
      '拆分大组件，使用 React.memo / useMemo 减少重渲染',
    ],
    isCore: true,
    color: '#07c160',
  },
  {
    id: 'cls',
    name: '累计布局偏移',
    abbr: 'CLS',
    category: 'visual-stability',
    description: '测量页面整个生命周期中发生的所有意外布局偏移的累计分数。越小越稳定。',
    goodThreshold: '≤ 0.1',
    needsImprovementThreshold: '0.1 - 0.25',
    poorThreshold: '> 0.25',
    measurement: 'PerformanceObserver 监听 layout-shift 条目，累计 impact fraction × distance fraction',
    optimizations: [
      '为图片/视频/广告位预留尺寸（aspect-ratio / width+height）',
      '避免在已渲染内容上方动态插入元素',
      '使用 transform 动画代替改变布局的属性（top/left/width）',
      '字体加载使用 font-display: swap + 预留回退字体尺寸',
      '避免使用自定义字体后布局跳动（size-adjust）',
    ],
    isCore: true,
    color: '#ec4899',
  },
  {
    id: 'fcp',
    name: '首次内容绘制',
    abbr: 'FCP',
    category: 'loading',
    description: '测量浏览器首次渲染任何文本、图像、SVG 等内容的时间点。是用户感知加载的起点。',
    goodThreshold: '≤ 1.8s',
    needsImprovementThreshold: '1.8s - 3.0s',
    poorThreshold: '> 3.0s',
    measurement: 'PerformanceObserver 监听 paint 条目 first-contentful-paint',
    optimizations: [
      '内联关键 CSS，异步加载非关键 CSS',
      '减少首屏 JS 体积（代码分割、Tree Shaking）',
      '使用 SSR/SSG 提前生成 HTML',
      '预连接关键域名（preconnect）',
      '减少重定向链',
    ],
    color: '#a78bfa',
  },
  {
    id: 'tti',
    name: '可交互时间',
    abbr: 'TTI',
    category: 'interactivity',
    description: '测量页面完全可交互的时间点：主线程空闲且能响应用户输入。FCP 之后首次有 5s 长空闲窗口的起点。',
    goodThreshold: '≤ 3.8s',
    needsImprovementThreshold: '3.8s - 7.3s',
    poorThreshold: '> 7.3s',
    measurement: '基于 FCP + 主线程任务流 + 网络请求静默窗口计算',
    optimizations: [
      '减少首屏 JS 体积，按路由懒加载',
      '延迟加载非关键脚本（defer/async）',
      '拆包：vendor / polyfill / 路由级 chunk',
      '使用 Service Worker 缓存资源',
      '减少第三方脚本（分析/广告）阻塞',
    ],
    color: '#f59e0b',
  },
  {
    id: 'tbt',
    name: '总阻塞时间',
    abbr: 'TBT',
    category: 'interactivity',
    description: '测量 FCP 与 TTI 之间主线程被长任务阻塞的总时长。是 TTI 的实验室辅助指标。',
    goodThreshold: '≤ 200ms',
    needsImprovementThreshold: '200ms - 600ms',
    poorThreshold: '> 600ms',
    measurement: 'PerformanceObserver 监听 longtask，累加 (duration - 50ms)',
    optimizations: [
      '拆分长任务（scheduler.yield / setTimeout 分片）',
      '使用 requestIdleCallback 调度低优先级任务',
      '代码分割，按需加载非首屏逻辑',
      '避免同步布局抖动（强制回流）',
      '使用 Web Worker 卸载主线程计算',
    ],
    color: '#14b8a6',
  },
]

const CATEGORY_LABEL: Record<CoreWebVitalMetric['category'], string> = {
  loading: '加载性能',
  interactivity: '交互响应',
  'visual-stability': '视觉稳定',
}

export function CoreWebVitalsVisualizer({ data }: CoreWebVitalsVisualizerProps) {
  const metrics = data?.metrics ?? DEFAULT_METRICS
  const coreNote =
    data?.coreNote ??
    'Core Web Vitals 三件套（LCP + INP + CLS）是 Google 评估页面体验的核心指标，直接影响搜索排名。其余指标为辅助诊断指标。'
  const [selectedId, setSelectedId] = useState<CoreWebVitalId>('lcp')
  const selected = metrics.find((m) => m.id === selectedId)

  return (
    <div className="space-y-lg">
      {/* 指标卡片网格 */}
      <div className="grid grid-cols-2 gap-sm sm:grid-cols-3">
        {metrics.map((metric) => {
          const isActive = selectedId === metric.id
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedId(metric.id)}
              className={cn(
                'group relative overflow-hidden rounded-md border-2 p-md text-left transition-all',
                isActive
                  ? 'border-transparent text-white shadow-md'
                  : 'border-hairline bg-canvas-card hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: metric.color } : undefined}
            >
              {/* 核心指标角标 */}
              {metric.isCore && (
                <span
                  className={cn(
                    'absolute right-xs top-xs rounded-full px-xxs py-xxs font-mono text-caption-mono-xs',
                    isActive ? 'bg-white/25 text-white' : 'bg-accent-sunset/15 text-accent-sunset',
                  )}
                >
                  核心
                </span>
              )}
              <div
                className={cn(
                  'font-mono text-display-xs tracking-display',
                  isActive ? 'text-white' : 'text-ink',
                )}
                style={!isActive ? { color: metric.color } : undefined}
              >
                {metric.abbr}
              </div>
              <div
                className={cn(
                  'mt-xs text-caption',
                  isActive ? 'text-white/90' : 'text-body-mid',
                )}
              >
                {metric.name}
              </div>
              <div
                className={cn(
                  'mt-xxs font-mono text-caption-mono-xs uppercase tracking-[1.2px]',
                  isActive ? 'text-white/70' : 'text-body-mid/70',
                )}
              >
                {CATEGORY_LABEL[metric.category]}
              </div>
            </button>
          )
        })}
      </div>

      {/* Core Web Vitals 说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {coreNote}
      </p>

      {/* 选中指标详情 */}
      {selected && (
        <div
          className="rounded-md border-l-4 p-md"
          style={{ borderLeftColor: selected.color, backgroundColor: `${selected.color}10` }}
        >
          {/* 标题行 */}
          <div className="mb-sm flex flex-wrap items-center gap-sm">
            <h4 className="text-heading-4 text-ink">
              {selected.abbr} · {selected.name}
            </h4>
            <span
              className="rounded-sm px-xs py-xxs font-mono text-caption-mono-xs text-white"
              style={{ backgroundColor: selected.color }}
            >
              {CATEGORY_LABEL[selected.category]}
            </span>
            {selected.isCore && (
              <span className="rounded-sm bg-accent-sunset/15 px-xs py-xxs font-mono text-caption-mono-xs text-accent-sunset">
                Core Web Vital
              </span>
            )}
          </div>

          {/* 描述 */}
          <p className="mb-md text-body-sm text-body">{selected.description}</p>

          {/* 优秀标准三档 */}
          <div className="mb-md grid grid-cols-1 gap-sm sm:grid-cols-3">
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                优秀
              </div>
              <div className="text-body-sm font-semibold text-green-600">{selected.goodThreshold}</div>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                需改进
              </div>
              <div className="text-body-sm font-semibold text-amber-600">
                {selected.needsImprovementThreshold}
              </div>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                较差
              </div>
              <div className="text-body-sm font-semibold text-red-600">{selected.poorThreshold}</div>
            </div>
          </div>

          {/* 测量方式 */}
          <div className="mb-md">
            <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
              测量方式
            </div>
            <p className="mt-xs rounded-sm bg-canvas-soft px-sm py-xs font-mono text-caption-mono-sm text-ink">
              {selected.measurement}
            </p>
          </div>

          {/* 优化方向 */}
          <div>
            <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
              优化方向
            </div>
            <ul className="mt-xs space-y-xs">
              {selected.optimizations.map((opt, i) => (
                <li key={i} className="flex items-start gap-xs text-body-sm text-ink">
                  <span
                    className="mt-xs inline-block h-xxs w-xs shrink-0 rounded-full"
                    style={{ backgroundColor: selected.color }}
                  />
                  <span>{opt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-center text-caption-mono-xs text-body-mid">
        ⚠️ 阈值基于 Google Chromium 团队 2024 标准 · Lighthouse / CrUX 实测
      </p>
    </div>
  )
}
