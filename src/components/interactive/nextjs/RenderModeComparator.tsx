/**
 * RenderModeComparator — 渲染模式对比矩阵
 *
 * 交互式对比 CSR/SSR/SSG/ISR 四种渲染模式。
 * 选择应用场景（博客/电商/后台/新闻），展示四种模式的时序图和指标对比，
 * 底部 SVG 雷达图对比 SEO/新鲜度/首屏速度/服务器负载/开发复杂度。
 *
 * ⚠️ 教学模拟：TTFB/FCP/LCP 为预设的教学模拟值，非真实测量。
 *
 * 对应docx中演示 #2
 */
import { useMemo, useState } from 'react'
import type { RenderModeComparatorData, RenderMode } from '../../../lib/nextjs-visualization-types'
import { cn } from '../../../lib/utils'

interface RenderModeComparatorProps {
  data?: RenderModeComparatorData
}

const MODE_COLORS: Record<RenderMode, string> = {
  CSR: '#f87171',
  SSR: '#539df5',
  SSG: '#34d399',
  ISR: '#a78bfa',
}

const MODE_LABELS: Record<RenderMode, string> = {
  CSR: 'CSR 客户端渲染',
  SSR: 'SSR 服务端渲染',
  SSG: 'SSG 静态生成',
  ISR: 'ISR 增量静态再生',
}

const DEFAULT_SCENARIOS = [
  {
    id: 'blog',
    label: '博客',
    description: '内容为主，更新频率低，SEO 重要',
    metrics: {
      CSR: { ttfb: 50, fcp: 800, lcp: 1800, seo: 20, freshness: 90, serverLoad: 10, devComplexity: 30 },
      SSR: { ttfb: 400, fcp: 600, lcp: 1000, seo: 90, freshness: 95, serverLoad: 70, devComplexity: 60 },
      SSG: { ttfb: 80, fcp: 300, lcp: 500, seo: 100, freshness: 30, serverLoad: 10, devComplexity: 40 },
      ISR: { ttfb: 100, fcp: 350, lcp: 550, seo: 95, freshness: 80, serverLoad: 20, devComplexity: 55 },
    },
  },
  {
    id: 'ecommerce',
    label: '电商',
    description: '商品页需 SEO，购物车需实时，库存需新鲜',
    metrics: {
      CSR: { ttfb: 60, fcp: 900, lcp: 2200, seo: 20, freshness: 95, serverLoad: 15, devComplexity: 30 },
      SSR: { ttfb: 500, fcp: 700, lcp: 1200, seo: 90, freshness: 95, serverLoad: 80, devComplexity: 65 },
      SSG: { ttfb: 90, fcp: 350, lcp: 600, seo: 100, freshness: 20, serverLoad: 10, devComplexity: 50 },
      ISR: { ttfb: 110, fcp: 400, lcp: 650, seo: 95, freshness: 85, serverLoad: 25, devComplexity: 60 },
    },
  },
  {
    id: 'admin',
    label: '后台管理',
    description: '登录后使用，SEO 不重要，交互密集',
    metrics: {
      CSR: { ttfb: 50, fcp: 700, lcp: 1500, seo: 10, freshness: 100, serverLoad: 10, devComplexity: 20 },
      SSR: { ttfb: 450, fcp: 650, lcp: 1100, seo: 50, freshness: 100, serverLoad: 75, devComplexity: 70 },
      SSG: { ttfb: 80, fcp: 300, lcp: 500, seo: 10, freshness: 10, serverLoad: 10, devComplexity: 80 },
      ISR: { ttfb: 100, fcp: 350, lcp: 550, seo: 10, freshness: 70, serverLoad: 20, devComplexity: 75 },
    },
  },
  {
    id: 'news',
    label: '新闻列表',
    description: '内容频繁更新，SEO 极重要，新鲜度要求高',
    metrics: {
      CSR: { ttfb: 55, fcp: 850, lcp: 1900, seo: 20, freshness: 95, serverLoad: 12, devComplexity: 30 },
      SSR: { ttfb: 420, fcp: 620, lcp: 1050, seo: 90, freshness: 98, serverLoad: 78, devComplexity: 62 },
      SSG: { ttfb: 85, fcp: 320, lcp: 520, seo: 100, freshness: 25, serverLoad: 10, devComplexity: 45 },
      ISR: { ttfb: 105, fcp: 370, lcp: 570, seo: 95, freshness: 88, serverLoad: 22, devComplexity: 58 },
    },
  },
]

const ALL_MODES: RenderMode[] = ['CSR', 'SSR', 'SSG', 'ISR']

export function RenderModeComparator({ data }: RenderModeComparatorProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? 'blog')
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]

  // 雷达图数据
  const radarData = useMemo(() => {
    const axes = [
      { key: 'seo' as const, label: 'SEO', max: 100 },
      { key: 'freshness' as const, label: '新鲜度', max: 100 },
      { key: 'lcp' as const, label: '首屏速度', max: 2500, inverse: true },
      { key: 'serverLoad' as const, label: '低负载', max: 100, inverse: true },
      { key: 'devComplexity' as const, label: '易开发', max: 100, inverse: true },
    ]
    const cx = 130
    const cy = 130
    const maxRadius = 95
    const angleStep = (Math.PI * 2) / axes.length

    const modeData = ALL_MODES.map((mode) => {
      const m = scenario.metrics[mode]
      const points = axes.map((axis, i) => {
        const raw = m[axis.key]
        const value = axis.inverse ? axis.max - raw : raw
        const ratio = Math.max(0, Math.min(1, value / axis.max))
        const angle = angleStep * i - Math.PI / 2
        return {
          x: cx + maxRadius * ratio * Math.cos(angle),
          y: cy + maxRadius * ratio * Math.sin(angle),
        }
      })
      return { mode, points, polygon: points.map((p) => `${p.x},${p.y}`).join(' ') }
    })

    return { axes, modeData, cx, cy, maxRadius, angleStep }
  }, [scenario])

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 教学模拟声明 */}
      <div className="mb-lg rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 教学模拟：TTFB/FCP/LCP 为预设的教学模拟值，非真实浏览器测量。
        </p>
      </div>

      {/* 场景切换 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setScenarioId(s.id)}
            className={cn(
              'rounded-pill border px-md py-xs text-body-sm transition-colors',
              s.id === scenarioId
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="mb-xl text-body-sm text-body">{scenario.description}</p>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_280px]">
        {/* 时序图 + 指标表 */}
        <div className="space-y-lg">
          {/* 时序条形图 */}
          <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
            <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              渲染时序模拟（ms）
            </div>
            <div className="space-y-md">
              {ALL_MODES.map((mode) => {
                const m = scenario.metrics[mode]
                const maxTime = 2500
                return (
                  <div key={mode} className="flex items-center gap-md">
                    <span className="w-20 font-mono text-caption-mono-sm" style={{ color: MODE_COLORS[mode] }}>
                      {mode}
                    </span>
                    <div className="relative h-6 flex-1 overflow-hidden rounded-sm bg-canvas-mid">
                      {/* TTFB 段 */}
                      <div
                        className="absolute h-full opacity-40"
                        style={{ width: `${(m.ttfb / maxTime) * 100}%`, backgroundColor: MODE_COLORS[mode] }}
                      />
                      {/* TTFB → FCP 段 */}
                      <div
                        className="absolute h-full opacity-60"
                        style={{ left: `${(m.ttfb / maxTime) * 100}%`, width: `${((m.fcp - m.ttfb) / maxTime) * 100}%`, backgroundColor: MODE_COLORS[mode] }}
                      />
                      {/* FCP → LCP 段 */}
                      <div
                        className="absolute h-full"
                        style={{ left: `${(m.fcp / maxTime) * 100}%`, width: `${((m.lcp - m.fcp) / maxTime) * 100}%`, backgroundColor: MODE_COLORS[mode] }}
                      />
                    </div>
                    <span className="w-20 text-right font-mono text-caption-mono-sm text-ink">
                      LCP {m.lcp}ms
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="mt-md flex gap-lg font-mono text-caption-mono-sm text-body-mid">
              <span>■ TTFB</span>
              <span>■ FCP</span>
              <span>■ LCP</span>
            </div>
          </div>

          {/* 指标表格 */}
          <div className="overflow-x-auto rounded-sm border border-hairline">
            <table className="w-full">
              <thead className="bg-canvas-soft">
                <tr>
                  <th className="border-b border-hairline px-md py-sm text-left font-mono text-caption-mono-sm text-ink">指标</th>
                  {ALL_MODES.map((mode) => (
                    <th key={mode} className="border-b border-hairline px-md py-sm text-left font-mono text-caption-mono-sm" style={{ color: MODE_COLORS[mode] }}>
                      {mode}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-hairline">
                  <td className="px-md py-sm text-body-sm text-body-mid">TTFB (ms)</td>
                  {ALL_MODES.map((mode) => <td key={mode} className="px-md py-sm font-mono text-caption-mono-sm text-ink">{scenario.metrics[mode].ttfb}</td>)}
                </tr>
                <tr className="border-b border-hairline">
                  <td className="px-md py-sm text-body-sm text-body-mid">FCP (ms)</td>
                  {ALL_MODES.map((mode) => <td key={mode} className="px-md py-sm font-mono text-caption-mono-sm text-ink">{scenario.metrics[mode].fcp}</td>)}
                </tr>
                <tr className="border-b border-hairline">
                  <td className="px-md py-sm text-body-sm text-body-mid">LCP (ms)</td>
                  {ALL_MODES.map((mode) => <td key={mode} className="px-md py-sm font-mono text-caption-mono-sm text-ink">{scenario.metrics[mode].lcp}</td>)}
                </tr>
                <tr className="border-b border-hairline">
                  <td className="px-md py-sm text-body-sm text-body-mid">SEO 评分</td>
                  {ALL_MODES.map((mode) => <td key={mode} className="px-md py-sm font-mono text-caption-mono-sm text-ink">{scenario.metrics[mode].seo}/100</td>)}
                </tr>
                <tr>
                  <td className="px-md py-sm text-body-sm text-body-mid">数据新鲜度</td>
                  {ALL_MODES.map((mode) => <td key={mode} className="px-md py-sm font-mono text-caption-mono-sm text-ink">{scenario.metrics[mode].freshness}/100</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 雷达图 */}
        <div className="flex items-center justify-center">
          <svg width="260" height="260" viewBox="0 0 260 260">
            {/* 背景网格 */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => {
              const points = radarData.axes.map((_, i) => {
                const angle = radarData.angleStep * i - Math.PI / 2
                const r = radarData.maxRadius * ratio
                return `${radarData.cx + r * Math.cos(angle)},${radarData.cy + r * Math.sin(angle)}`
              }).join(' ')
              return <polygon key={ratio} points={points} fill="none" stroke="#363a3f" strokeWidth="1" opacity="0.4" />
            })}
            {/* 轴线 */}
            {radarData.axes.map((_, i) => {
              const angle = radarData.angleStep * i - Math.PI / 2
              return (
                <line
                  key={i}
                  x1={radarData.cx}
                  y1={radarData.cy}
                  x2={radarData.cx + radarData.maxRadius * Math.cos(angle)}
                  y2={radarData.cy + radarData.maxRadius * Math.sin(angle)}
                  stroke="#363a3f"
                  strokeWidth="1"
                  opacity="0.3"
                />
              )
            })}
            {/* 数据多边形 */}
            {radarData.modeData.map((md) => (
              <polygon
                key={md.mode}
                points={md.polygon}
                fill={MODE_COLORS[md.mode] + '20'}
                stroke={MODE_COLORS[md.mode]}
                strokeWidth="2"
              />
            ))}
            {/* 轴标签 */}
            {radarData.axes.map((axis, i) => {
              const angle = radarData.angleStep * i - Math.PI / 2
              const lx = radarData.cx + (radarData.maxRadius + 18) * Math.cos(angle)
              const ly = radarData.cy + (radarData.maxRadius + 18) * Math.sin(angle)
              return (
                <text key={axis.key} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="#7d8187" fontSize="10" fontFamily="monospace">
                  {axis.label}
                </text>
              )
            })}
          </svg>
        </div>
      </div>

      {/* 图例 */}
      <div className="mt-lg flex flex-wrap gap-lg font-mono text-caption-mono-sm text-body-mid">
        {ALL_MODES.map((mode) => (
          <span key={mode} className="flex items-center gap-xs">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: MODE_COLORS[mode] }} />
            {MODE_LABELS[mode]}
          </span>
        ))}
      </div>
    </div>
  )
}
