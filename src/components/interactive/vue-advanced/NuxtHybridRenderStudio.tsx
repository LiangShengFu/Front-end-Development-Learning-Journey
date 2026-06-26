/**
 * NuxtHybridRenderStudio — Nuxt 3 混合渲染策略交互沙盒
 *
 * 交互式对比 Nuxt 3 的四种渲染策略：SSR / SSG / ISR / SPA。
 * 选择页面路径与渲染模式，观察首屏时间、数据传输路径、SEO 评分的变化，
 * 并实时生成对应的 routeRules 配置代码。
 *
 * ⚠️ 教学模拟：所有 TTFB/SEO 为预设教学数据，不发起真实请求，非 Nuxt 3 实际运行时行为。
 */
import { useMemo, useState } from 'react'
import type {
  NuxtHybridRenderStudioData,
  NuxtRouteScenario,
  NuxtRenderMode,
} from '../../../lib/vue-advanced-visualization-types'
import { cn } from '../../../lib/utils'

interface NuxtHybridRenderStudioProps {
  data?: NuxtHybridRenderStudioData
}

/** 渲染模式元信息：颜色 / 时机 / routeRules 配置片段 */
const MODE_META: Record<
  NuxtRenderMode,
  { color: string; bg: string; border: string; timing: string; rule: string; comment: string }
> = {
  SSR: {
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.10)',
    border: 'rgba(99,102,241,0.45)',
    timing: '请求时',
    rule: "{ ssr: true }",
    comment: 'SSR - 每次请求服务端渲染',
  },
  SSG: {
    color: '#42b883',
    bg: 'rgba(66,184,131,0.10)',
    border: 'rgba(66,184,131,0.45)',
    timing: '构建时',
    rule: "{ prerender: true }",
    comment: 'SSG - 构建时预渲染',
  },
  ISR: {
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.10)',
    border: 'rgba(245,158,11,0.45)',
    timing: '定时验证',
    rule: "{ swr: 3600 }",
    comment: 'ISR - SWR 每小时重新验证',
  },
  SPA: {
    color: '#64748b',
    bg: 'rgba(100,116,139,0.10)',
    border: 'rgba(100,116,139,0.45)',
    timing: '客户端',
    rule: "{ ssr: false }",
    comment: 'SPA - 纯客户端渲染',
  },
}

const MODE_ORDER: NuxtRenderMode[] = ['SSR', 'SSG', 'ISR', 'SPA']

/** 默认路由场景（未传 data 时使用） */
const DEFAULT_SCENARIOS: NuxtRouteScenario[] = [
  {
    path: '/',
    label: '首页',
    description: '营销首页，强 SEO、内容更新频率低。',
    metrics: {
      SSR: { ttfb: 220, seo: 5, serverLoad: 4, freshness: 5, dataFlow: ['Browser', 'Server (Nitro)', '渲染 HTML', 'Browser'] },
      SSG: { ttfb: 40, seo: 5, serverLoad: 1, freshness: 2, dataFlow: ['Browser', 'CDN', '预渲染 HTML'] },
      ISR: { ttfb: 60, seo: 5, serverLoad: 2, freshness: 4, dataFlow: ['Browser', 'CDN', '缓存 HTML', '后台重新验证'] },
      SPA: { ttfb: 90, seo: 1, serverLoad: 1, freshness: 5, dataFlow: ['Browser', '下载 JS', '客户端渲染', '调用 API'] },
    },
  },
  {
    path: '/blog/post-1',
    label: '博客详情',
    description: '文章页，SEO 重要、发布后偶尔修订。',
    metrics: {
      SSR: { ttfb: 260, seo: 5, serverLoad: 4, freshness: 5, dataFlow: ['Browser', 'Server', '查 DB 渲染', 'Browser'] },
      SSG: { ttfb: 45, seo: 5, serverLoad: 1, freshness: 2, dataFlow: ['Browser', 'CDN', '预渲染 HTML'] },
      ISR: { ttfb: 65, seo: 5, serverLoad: 2, freshness: 4, dataFlow: ['Browser', 'CDN', '缓存 HTML', 'SWR 重新验证'] },
      SPA: { ttfb: 110, seo: 1, serverLoad: 1, freshness: 5, dataFlow: ['Browser', '下载 JS', '客户端渲染', '调用 API'] },
    },
  },
  {
    path: '/admin/dashboard',
    label: '管理后台',
    description: '登录后的数据面板，无需 SEO、实时性强。',
    metrics: {
      SSR: { ttfb: 300, seo: 1, serverLoad: 5, freshness: 5, dataFlow: ['Browser', 'Server', '鉴权 + 渲染', 'Browser'] },
      SSG: { ttfb: 40, seo: 1, serverLoad: 1, freshness: 1, dataFlow: ['Browser', 'CDN', '静态 HTML（无数据）'] },
      ISR: { ttfb: 60, seo: 1, serverLoad: 2, freshness: 3, dataFlow: ['Browser', 'CDN', '缓存 HTML', '后台验证'] },
      SPA: { ttfb: 95, seo: 1, serverLoad: 1, freshness: 5, dataFlow: ['Browser', '下载 JS', '鉴权 + 客户端渲染', 'API'] },
    },
  },
  {
    path: '/api/users',
    label: 'API 路由',
    description: 'Server API，返回 JSON 而非 HTML。',
    metrics: {
      SSR: { ttfb: 80, seo: 0, serverLoad: 3, freshness: 5, dataFlow: ['Browser', 'Server API', 'JSON 响应'] },
      SSG: { ttfb: 30, seo: 0, serverLoad: 1, freshness: 1, dataFlow: ['Browser', 'CDN', '静态 JSON'] },
      ISR: { ttfb: 50, seo: 0, serverLoad: 2, freshness: 4, dataFlow: ['Browser', 'CDN', '缓存 JSON', '后台验证'] },
      SPA: { ttfb: 90, seo: 0, serverLoad: 1, freshness: 5, dataFlow: ['Browser', 'Server API', 'JSON 响应'] },
    },
  },
]

/** 渲染星级（1-5） */
function Stars({ value, color }: { value: number; color: string }) {
  return (
    <span className="font-mono text-caption-mono-sm" style={{ color }} aria-label={`${value}/5`}>
      {'★'.repeat(Math.max(0, Math.min(5, value)))}
      <span className="text-body-mid/40">{'★'.repeat(Math.max(0, 5 - Math.min(5, value)))}</span>
    </span>
  )
}

export function NuxtHybridRenderStudio({ data }: NuxtHybridRenderStudioProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [scenarioPath, setScenarioPath] = useState(scenarios[0]?.path ?? '/')
  const [mode, setMode] = useState<NuxtRenderMode>('SSR')

  const scenario = scenarios.find((s) => s.path === scenarioPath) ?? scenarios[0]
  const metrics = scenario?.metrics[mode]
  const meta = MODE_META[mode]

  /** 根据当前路径 + 模式生成 routeRules 配置 */
  const routeRulesCode = useMemo(() => {
    const rulePath = scenario?.path ?? '/'
    return `// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    // ${meta.comment}
    '${rulePath}': ${meta.rule}
  }
})`
  }, [scenario, meta])

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：非 Nuxt 3 实际运行时行为，用于理解渲染策略差异。所有指标为预设教学数据。
      </div>

      {/* 页面路径选择器 */}
      <div>
        <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          选择页面路径
        </h4>
        <div className="flex flex-wrap gap-sm">
          {scenarios.map((s) => (
            <button
              key={s.path}
              type="button"
              onClick={() => setScenarioPath(s.path)}
              className={cn(
                'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
                scenarioPath === s.path
                  ? 'border-[#42b883] bg-[#42b883]/10 text-[#42b883]'
                  : 'border-hairline text-body-mid hover:border-body-mid',
              )}
            >
              {s.label} <span className="opacity-60">{s.path}</span>
            </button>
          ))}
        </div>
        {scenario && <p className="mt-sm text-body-sm text-body-mid">{scenario.description}</p>}
      </div>

      {/* 渲染模式卡片 */}
      <div>
        <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          切换渲染模式
        </h4>
        <div className="grid grid-cols-2 gap-md lg:grid-cols-4">
          {MODE_ORDER.map((m) => {
            const mm = MODE_META[m]
            const active = mode === m
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  'rounded-sm border p-md text-left transition-all',
                  active ? 'shadow-sm' : 'hover:border-body-mid',
                )}
                style={{
                  borderColor: active ? mm.border : undefined,
                  background: active ? mm.bg : undefined,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-body-sm font-bold" style={{ color: mm.color }}>
                    {m}
                  </span>
                  <span
                    className="h-[10px] w-[10px] rounded-full"
                    style={{ background: mm.color, opacity: active ? 1 : 0.35 }}
                  />
                </div>
                <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">
                  渲染时机：{mm.timing}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        {/* 指标面板 */}
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4
            className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px]"
            style={{ color: meta.color }}
          >
            {mode} · 性能指标
          </h4>
          {metrics && (
            <div className="space-y-md">
              <div className="flex items-baseline justify-between">
                <span className="text-body-sm text-body-mid">首屏 TTFB</span>
                <span className="font-mono text-display-xs text-ink">
                  {metrics.ttfb}
                  <span className="ml-xs text-body-sm text-body-mid">ms</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-body-mid">SEO 友好度</span>
                <Stars value={metrics.seo} color={meta.color} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-body-mid">服务端负载</span>
                <Stars value={metrics.serverLoad} color={meta.color} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-body-mid">内容新鲜度</span>
                <Stars value={metrics.freshness} color={meta.color} />
              </div>
            </div>
          )}
        </div>

        {/* 数据传输路径 */}
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4
            className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px]"
            style={{ color: meta.color }}
          >
            {mode} · 数据传输路径
          </h4>
          {metrics && (
            <div className="flex flex-wrap items-center gap-xs">
              {metrics.dataFlow.map((step, i) => (
                <div key={i} className="flex items-center gap-xs">
                  <span
                    className="rounded-sm border px-sm py-xs font-mono text-caption-mono-sm"
                    style={{ borderColor: meta.border, color: meta.color, background: meta.bg }}
                  >
                    {step}
                  </span>
                  {i < metrics.dataFlow.length - 1 && (
                    <span className="text-body-mid">→</span>
                  )}
                </div>
              ))}
            </div>
          )}
          <p className="mt-md text-body-sm text-body-mid">
            {mode === 'SSR' && '每次请求由 Nitro 服务端渲染完整 HTML，首屏直出但服务器压力大。'}
            {mode === 'SSG' && '构建时预渲染为静态 HTML，CDN 分发，最快但内容滞后于数据更新。'}
            {mode === 'ISR' && 'CDN 返回缓存 HTML，后台按 swr 时间窗口重新验证，兼顾性能与新鲜度。'}
            {mode === 'SPA' && '仅返回空 HTML + JS bundle，客户端接管渲染，SEO 弱但实时性高。'}
          </p>
        </div>
      </div>

      {/* routeRules 配置面板 */}
      <div>
        <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          routeRules 配置（nuxt.config.ts）
        </h4>
        <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink">
          <code>{routeRulesCode}</code>
        </pre>
      </div>
    </div>
  )
}
