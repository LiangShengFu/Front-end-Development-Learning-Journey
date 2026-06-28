/**
 * ProgressDashboard — 答题进度仪表盘
 *
 * 全局可见的备考进度面板——展示 9 个领域的掌握率
 * （已掌握/需复习/未学习 三态统计）、综合雷达图、连续学习天数和学习建议。
 * 数据来源：localStorage 中的备考进度（questionId → masteryLevel）。
 *
 * 对应docx中演示 #6
 */
import { useEffect, useMemo, useState } from 'react'
import type { ProgressDashboardData, MasteryLevel, QuestionDomain } from '../../../lib/interview-visualization-types'
import { cn } from '../../../lib/utils'

interface ProgressDashboardProps {
  data?: ProgressDashboardData
}

/** 领域总数映射（带索引签名） */
type DomainTotals = Partial<Record<QuestionDomain, number>>

const PROGRESS_KEY = 'interview_progress_v1'

const DOMAIN_LABELS: Record<QuestionDomain, string> = {
  javascript: 'JavaScript',
  css: 'CSS',
  react: 'React',
  vue: 'Vue',
  network: '网络',
  security: '安全',
  engineering: '工程化',
  react19: 'React 19',
  testing: '测试',
  handwriting: '手写题',
}

function loadProgress(): Record<string, MasteryLevel> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function ProgressDashboard({ data }: ProgressDashboardProps) {
  const domainTotals: DomainTotals = useMemo(() => data?.domainTotals ?? {}, [data?.domainTotals])
  const [progress, setProgress] = useState<Record<string, MasteryLevel>>(() =>
    typeof window !== 'undefined' ? loadProgress() : {},
  )

  // 定期从 localStorage 刷新进度（其他组件可能更新了数据）
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(loadProgress())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // 聚合统计
  const stats = useMemo(() => {
    const allDomains = Object.keys(domainTotals) as QuestionDomain[]
    const domainStats = allDomains.map((domain) => {
      const total = domainTotals[domain] || 0
      // 从 progress 中统计该领域的掌握情况（通过 questionId 前缀匹配 domain）
      let mastered = 0
      let review = 0
      let unlearned = 0
      for (const [qid, level] of Object.entries(progress)) {
        if (qid.startsWith(`${domain}-`)) {
          if (level === 'mastered') mastered++
          else if (level === 'review') review++
          else unlearned++
        }
      }
      const learnedTotal = mastered + review + unlearned
      const masteryRate = learnedTotal > 0 ? mastered / learnedTotal : 0
      return { domain, total, mastered, review, unlearned, learned: learnedTotal, masteryRate }
    })

    const totalQuestions = domainStats.reduce((s, d) => s + d.total, 0)
    const totalMastered = domainStats.reduce((s, d) => s + d.mastered, 0)
    const totalReview = domainStats.reduce((s, d) => s + d.review, 0)
    const totalUnlearned = totalQuestions - totalMastered - totalReview

    return {
      domainStats,
      totalQuestions,
      totalMastered,
      totalReview,
      totalUnlearned,
      overallRate: totalQuestions > 0 ? totalMastered / totalQuestions : 0,
    }
  }, [progress, domainTotals])

  // 雷达图 SVG 计算
  const radarData = useMemo(() => {
    const domains = Object.keys(domainTotals) as QuestionDomain[]
    const cx = 120
    const cy = 120
    const maxRadius = 90
    const angleStep = (Math.PI * 2) / domains.length

    const points = domains.map((domain, i) => {
      const stat = stats.domainStats.find((d) => d.domain === domain)
      const rate = stat?.masteryRate ?? 0
      const angle = angleStep * i - Math.PI / 2
      const r = maxRadius * rate
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        labelX: cx + (maxRadius + 15) * Math.cos(angle),
        labelY: cy + (maxRadius + 15) * Math.sin(angle),
        domain,
        rate,
      }
    })

    const polygonPath = points.map((p) => `${p.x},${p.y}`).join(' ')

    return { points, polygonPath, cx, cy, maxRadius }
  }, [stats, domainTotals])

  // 学习建议
  const suggestion = useMemo(() => {
    const weakDomain = stats.domainStats
      .filter((d) => d.learned > 0)
      .sort((a, b) => a.masteryRate - b.masteryRate)[0]
    if (!weakDomain || weakDomain.masteryRate >= 0.8) {
      return '🎉 整体掌握情况良好！建议继续保持每日复习，巩固记忆。'
    }
    return `📌 ${DOMAIN_LABELS[weakDomain.domain]}领域掌握率仅 ${Math.round(weakDomain.masteryRate * 100)}%，建议优先复习。`
  }, [stats])

  const statCards = [
    { label: '总题数', value: stats.totalQuestions, color: 'text-ink' },
    { label: '已掌握', value: stats.totalMastered, color: 'text-accent-dusk' },
    { label: '需复习', value: stats.totalReview, color: 'text-accent-sunset' },
    { label: '未学习', value: stats.totalUnlearned, color: 'text-body-mid' },
  ]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      <div className="mb-xl flex items-center justify-between">
        <h4 className="text-body-lg text-ink">备考进度仪表盘</h4>
        <span className="font-mono text-caption-mono-sm text-body-mid">
          总掌握率 {Math.round(stats.overallRate * 100)}%
        </span>
      </div>

      {/* 统计卡片 */}
      <div className="mb-xl grid grid-cols-2 gap-sm sm:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-sm border border-hairline bg-canvas-soft p-md text-center">
            <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              {card.label}
            </div>
            <div className={cn('mt-xs text-display-xs', card.color)}>{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[280px_1fr]">
        {/* 雷达图 */}
        <div className="flex items-center justify-center">
          <svg width="240" height="240" viewBox="0 0 240 240">
            {/* 背景网格 */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => {
              const domains = Object.keys(domainTotals) as QuestionDomain[]
              const angleStep = (Math.PI * 2) / domains.length
              const r = radarData.maxRadius * ratio
              const gridPoints = domains.map((_, i) => {
                const angle = angleStep * i - Math.PI / 2
                return `${radarData.cx + r * Math.cos(angle)},${radarData.cy + r * Math.sin(angle)}`
              }).join(' ')
              return (
                <polygon
                  key={ratio}
                  points={gridPoints}
                  fill="none"
                  stroke="#363a3f"
                  strokeWidth="1"
                  opacity="0.5"
                />
              )
            })}
            {/* 数据多边形 */}
            <polygon
              points={radarData.polygonPath}
              fill="rgba(255, 122, 23, 0.15)"
              stroke="#ff7a17"
              strokeWidth="2"
            />
            {/* 数据点 */}
            {radarData.points.map((p) => (
              <circle key={p.domain} cx={p.x} cy={p.y} r="3" fill="#ff7a17" />
            ))}
            {/* 标签 */}
            {radarData.points.map((p) => (
              <text
                key={p.domain}
                x={p.labelX}
                y={p.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#7d8187"
                fontSize="10"
                fontFamily="monospace"
              >
                {DOMAIN_LABELS[p.domain]}
              </text>
            ))}
          </svg>
        </div>

        {/* 领域列表 */}
        <div className="space-y-sm">
          {stats.domainStats.map((stat) => (
            <div key={stat.domain} className="rounded-sm border border-hairline bg-canvas-soft p-md">
              <div className="mb-xs flex items-center justify-between">
                <span className="text-body-sm text-ink">{DOMAIN_LABELS[stat.domain]}</span>
                <span className="font-mono text-caption-mono-sm text-body-mid">
                  {stat.mastered}/{stat.total} 已掌握 · {Math.round(stat.masteryRate * 100)}%
                </span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-pill bg-canvas-mid">
                <div className="bg-accent-dusk/60" style={{ width: `${(stat.mastered / stat.total) * 100}%` }} />
                <div className="bg-accent-sunset/60" style={{ width: `${(stat.review / stat.total) * 100}%` }} />
              </div>
              <div className="mt-xs flex gap-lg font-mono text-caption-mono-sm text-body-mid">
                <span><span className="text-accent-dusk">●</span> 已掌握 {stat.mastered}</span>
                <span><span className="text-accent-sunset">●</span> 需复习 {stat.review}</span>
                <span><span className="text-body-mid">●</span> 未学习 {stat.total - stat.mastered - stat.review}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 学习建议 */}
      <div className="mt-xl rounded-sm border border-accent-sunset/20 bg-accent-sunset/5 p-md">
        <p className="text-body-sm text-body">{suggestion}</p>
      </div>
    </div>
  )
}
