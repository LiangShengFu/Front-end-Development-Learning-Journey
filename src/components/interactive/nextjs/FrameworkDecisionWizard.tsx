/**
 * FrameworkDecisionWizard — 框架选型决策向导
 *
 * 多维度评分向导，帮助学习者在四个框架（Next.js / Nuxt / Astro / Remix）
 * 之间做出理性选择。四个维度可调整权重，实时看到推荐得分和雷达图变化。
 *
 * ⚠️ 仅供参考：评分基于一般性经验，非绝对标准。实际选型需结合团队和项目具体情况。
 *
 * 对应docx中演示 #7
 */
import { useMemo, useState } from 'react'
import type { FrameworkDecisionWizardData, FrameworkId } from '../../../lib/nextjs-visualization-types'
import { cn } from '../../../lib/utils'

interface FrameworkDecisionWizardProps {
  data?: FrameworkDecisionWizardData
}

const DEFAULT_FRAMEWORKS = [
  {
    id: 'nextjs' as FrameworkId,
    label: 'Next.js',
    description: 'React 全栈框架，App Router + RSC + Server Actions',
    scores: { performance: 85, seo: 90, devEfficiency: 80, ecosystem: 95 },
    bestFor: 'React 生态、全栈 SaaS、需要 SSR/SSG/ISR 灵活切换的项目',
  },
  {
    id: 'nuxt' as FrameworkId,
    label: 'Nuxt 3',
    description: 'Vue 全栈框架，Nitro 引擎 + 约定式路由',
    scores: { performance: 82, seo: 88, devEfficiency: 85, ecosystem: 75 },
    bestFor: 'Vue 生态、内容站、快速开发',
  },
  {
    id: 'astro' as FrameworkId,
    label: 'Astro',
    description: '内容优先框架，Islands Architecture + 零 JS 默认',
    scores: { performance: 95, seo: 92, devEfficiency: 70, ecosystem: 60 },
    bestFor: '博客、文档站、营销页、内容为主的站点',
  },
  {
    id: 'remix' as FrameworkId,
    label: 'Remix',
    description: 'Web 标准优先，loader/action 模型 + 渐进增强',
    scores: { performance: 80, seo: 85, devEfficiency: 75, ecosystem: 65 },
    bestFor: '全栈应用、重视 Web 标准、表单密集型应用',
  },
]

const PROJECT_TYPES = [
  { id: 'blog', label: '博客/文档站', weights: { performance: 90, seo: 95, devEfficiency: 60, ecosystem: 40 } },
  { id: 'ecommerce', label: '电商/商品页', weights: { performance: 80, seo: 90, devEfficiency: 70, ecosystem: 70 } },
  { id: 'admin', label: '后台管理系统', weights: { performance: 60, seo: 20, devEfficiency: 90, ecosystem: 80 } },
  { id: 'saas', label: '全栈 SaaS', weights: { performance: 75, seo: 70, devEfficiency: 80, ecosystem: 85 } },
  { id: 'content', label: '内容站/营销页', weights: { performance: 95, seo: 90, devEfficiency: 65, ecosystem: 50 } },
]

const TEAM_STACKS = [
  { id: 'react', label: 'React 团队', boost: { nextjs: 15, nuxt: -20, astro: 0, remix: 10 } },
  { id: 'vue', label: 'Vue 团队', boost: { nextjs: -20, nuxt: 15, astro: 0, remix: -15 } },
  { id: 'both', label: 'React + Vue', boost: { nextjs: 0, nuxt: 0, astro: 10, remix: 0 } },
  { id: 'any', label: '不限定', boost: { nextjs: 0, nuxt: 0, astro: 0, remix: 0 } },
]

export function FrameworkDecisionWizard({ data }: FrameworkDecisionWizardProps) {
  const frameworks = data?.frameworks ?? DEFAULT_FRAMEWORKS
  const [projectType, setProjectType] = useState('saas')
  const [teamStack, setTeamStack] = useState('react')
  const [weights, setWeights] = useState({ performance: 75, seo: 70, devEfficiency: 80, ecosystem: 75 })

  // 计算得分
  const scores = useMemo(() => {
    const projectWeights = PROJECT_TYPES.find((p) => p.id === projectType)?.weights ?? weights
    const boost = TEAM_STACKS.find((t) => t.id === teamStack)?.boost ?? { nextjs: 0, nuxt: 0, astro: 0, remix: 0 }

    return frameworks.map((fw) => {
      // 基础得分 = 各维度评分 × 权重 / 100
      const baseScore =
        (fw.scores.performance * projectWeights.performance +
          fw.scores.seo * projectWeights.seo +
          fw.scores.devEfficiency * projectWeights.devEfficiency +
          fw.scores.ecosystem * projectWeights.ecosystem) /
        (projectWeights.performance + projectWeights.seo + projectWeights.devEfficiency + projectWeights.ecosystem)
      // 加上团队技术栈调整
      const finalScore = Math.max(0, Math.min(100, Math.round(baseScore + (boost[fw.id] ?? 0))))
      return { ...fw, score: finalScore }
    }).sort((a, b) => b.score - a.score)
  }, [frameworks, projectType, teamStack, weights])

  const recommended = scores[0]

  // 雷达图数据
  const radarData = useMemo(() => {
    const axes = [
      { key: 'performance' as const, label: '性能' },
      { key: 'seo' as const, label: 'SEO' },
      { key: 'devEfficiency' as const, label: '开发效率' },
      { key: 'ecosystem' as const, label: '生态' },
    ]
    const cx = 100
    const cy = 100
    const maxRadius = 75
    const angleStep = (Math.PI * 2) / axes.length

    const fwData = frameworks.map((fw) => {
      const points = axes.map((axis, i) => {
        const ratio = fw.scores[axis.key] / 100
        const angle = angleStep * i - Math.PI / 2
        return { x: cx + maxRadius * ratio * Math.cos(angle), y: cy + maxRadius * ratio * Math.sin(angle) }
      })
      return { id: fw.id, label: fw.label, points, polygon: points.map((p) => `${p.x},${p.y}`).join(' ') }
    })

    return { axes, fwData, cx, cy, maxRadius, angleStep }
  }, [frameworks])

  const colors: Record<FrameworkId, string> = {
    nextjs: '#ffffff',
    nuxt: '#34d399',
    astro: '#ff7a17',
    remix: '#539df5',
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 声明 */}
      <div className="mb-lg rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 仅供参考：评分基于一般性经验，非绝对标准。实际选型需结合团队和项目具体情况。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_320px]">
        {/* 配置区 */}
        <div className="space-y-xl">
          {/* 项目类型 */}
          <div>
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              项目类型
            </div>
            <div className="flex flex-wrap gap-sm">
              {PROJECT_TYPES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => { setProjectType(p.id); setWeights(p.weights) }}
                  className={cn(
                    'rounded-pill border px-md py-xs text-body-sm transition-colors',
                    projectType === p.id
                      ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                      : 'border-hairline bg-canvas-soft text-body-mid',
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 团队技术栈 */}
          <div>
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              团队技术栈
            </div>
            <div className="flex flex-wrap gap-sm">
              {TEAM_STACKS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTeamStack(t.id)}
                  className={cn(
                    'rounded-pill border px-md py-xs text-body-sm transition-colors',
                    teamStack === t.id
                      ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                      : 'border-hairline bg-canvas-soft text-body-mid',
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 权重滑块 */}
          <div>
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              维度权重调整
            </div>
            <div className="space-y-md">
              {([
                { key: 'performance' as const, label: '性能' },
                { key: 'seo' as const, label: 'SEO' },
                { key: 'devEfficiency' as const, label: '开发效率' },
                { key: 'ecosystem' as const, label: '生态丰富度' },
              ]).map((dim) => (
                <div key={dim.key} className="flex items-center gap-md">
                  <span className="w-24 font-mono text-caption-mono-sm text-body-mid">{dim.label}</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights[dim.key]}
                    onChange={(e) => setWeights((w) => ({ ...w, [dim.key]: Number(e.target.value) }))}
                    className="flex-1 accent-accent-sunset"
                  />
                  <span className="w-10 text-right font-mono text-caption-mono-sm text-ink">{weights[dim.key]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 得分排名 */}
          <div>
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              推荐得分排名
            </div>
            <div className="space-y-sm">
              {scores.map((fw, i) => (
                <div key={fw.id} className={cn(
                  'flex items-center gap-md rounded-sm border p-md',
                  i === 0 ? 'border-accent-sunset/40 bg-accent-sunset/5' : 'border-hairline bg-canvas-soft',
                )}>
                  <span className="font-mono text-caption-mono-sm text-body-mid">#{i + 1}</span>
                  <span className="w-16 text-body-sm text-ink" style={{ color: colors[fw.id] }}>{fw.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-pill bg-canvas-mid">
                    <div className="h-full rounded-pill" style={{ width: `${fw.score}%`, backgroundColor: colors[fw.id] }} />
                  </div>
                  <span className="w-10 text-right font-mono text-body-sm text-ink">{fw.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 雷达图 + 推荐 */}
        <div className="space-y-lg">
          <div className="flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
              {[0.25, 0.5, 0.75, 1].map((ratio) => {
                const points = radarData.axes.map((_, i) => {
                  const angle = radarData.angleStep * i - Math.PI / 2
                  const r = radarData.maxRadius * ratio
                  return `${radarData.cx + r * Math.cos(angle)},${radarData.cy + r * Math.sin(angle)}`
                }).join(' ')
                return <polygon key={ratio} points={points} fill="none" stroke="#363a3f" strokeWidth="1" opacity="0.3" />
              })}
              {radarData.fwData.map((fw) => (
                <polygon
                  key={fw.id}
                  points={fw.polygon}
                  fill={colors[fw.id] + '15'}
                  stroke={colors[fw.id]}
                  strokeWidth="1.5"
                />
              ))}
              {radarData.axes.map((axis, i) => {
                const angle = radarData.angleStep * i - Math.PI / 2
                return (
                  <text
                    key={axis.key}
                    x={radarData.cx + (radarData.maxRadius + 15) * Math.cos(angle)}
                    y={radarData.cy + (radarData.maxRadius + 15) * Math.sin(angle)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#7d8187"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {axis.label}
                  </text>
                )
              })}
            </svg>
          </div>

          {/* 推荐结果 */}
          <div className="rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-lg">
            <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              推荐框架
            </div>
            <div className="text-body-lg text-ink" style={{ color: colors[recommended.id] }}>
              {recommended.label}（{recommended.score} 分）
            </div>
            <p className="mt-sm text-caption-mono-sm text-body-mid">{recommended.bestFor}</p>
          </div>

          {/* 图例 */}
          <div className="space-y-xs">
            {frameworks.map((fw) => (
              <div key={fw.id} className="flex items-center gap-xs font-mono text-caption-mono-sm text-body-mid">
                <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: colors[fw.id] }} />
                {fw.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
