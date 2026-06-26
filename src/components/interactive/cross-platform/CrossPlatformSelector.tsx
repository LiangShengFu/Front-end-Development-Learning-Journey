/**
 * CrossPlatformSelector — 跨平台方案加权评分选择器
 *
 * 用户对项目维度（性能/开发效率/原生能力/生态/学习成本/包体积）按重要程度打分（1-5），
 * 系统对 RN / Flutter / Taro / Capacitor / PWA 五种方案加权计算总分并排序。
 *
 * ⚠️ 教学模拟：评分模型为示意性加权，仅用于教学对比，不替代真实方案选型决策。
 */
import { useMemo, useState } from 'react'
import type {
  CrossPlatformSelectorData,
  CrossPlatformSolution,
  SelectionDimension,
} from '../../../lib/cross-platform-visualization-types'
import { cn } from '../../../lib/utils'

interface CrossPlatformSelectorProps {
  data?: CrossPlatformSelectorData
}

const DIMENSION_THEME: Record<string, { color: string; bg: string; higherBetter: boolean; label: string }> = {
  performance: { color: '#07c160', bg: 'rgba(7,193,96,0.10)', higherBetter: true, label: '运行性能' },
  'dev-efficiency': { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', higherBetter: true, label: '开发效率' },
  'native-capability': { color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', higherBetter: true, label: '原生能力' },
  ecosystem: { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', higherBetter: true, label: '生态成熟度' },
  'learning-cost': { color: '#ef4444', bg: 'rgba(239,68,68,0.10)', higherBetter: false, label: '学习成本' },
  'bundle-size': { color: '#7d8590', bg: 'rgba(125,133,144,0.10)', higherBetter: false, label: '包体积' },
}

const DEFAULT_DIMENSIONS: SelectionDimension[] = [
  { id: 'performance', label: '运行性能', defaultWeight: 5, description: '渲染性能、启动速度、内存占用' },
  { id: 'dev-efficiency', label: '开发效率', defaultWeight: 4, description: '热更新、组件复用、调试体验' },
  { id: 'native-capability', label: '原生能力', defaultWeight: 4, description: '设备 API、原生模块集成' },
  { id: 'ecosystem', label: '生态成熟度', defaultWeight: 3, description: '社区、第三方库、文档完善度' },
  { id: 'learning-cost', label: '学习成本', defaultWeight: 3, description: '概念复杂度、DSL/语言学习成本' },
  { id: 'bundle-size', label: '包体积', defaultWeight: 2, description: '基础包大小、增量体积' },
]

const DEFAULT_SOLUTIONS: CrossPlatformSolution[] = [
  {
    id: 'rn',
    name: 'React Native',
    language: 'JavaScript / TypeScript',
    scores: { performance: 4, 'dev-efficiency': 5, 'native-capability': 4, ecosystem: 5, 'learning-cost': 4, 'bundle-size': 3 },
    pros: ['复用 React 生态', '热更新支持好', '原生组件渲染'],
    cons: ['Bridge 旧架构性能瓶颈', '升级痛点明显'],
    color: '#61dafb',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    language: 'Dart',
    scores: { performance: 5, 'dev-efficiency': 4, 'native-capability': 4, ecosystem: 4, 'learning-cost': 2, 'bundle-size': 2 },
    pros: ['自绘引擎性能强', 'UI 一致性高', 'Hot Reload 体验好'],
    cons: ['Dart 语言学习成本', '包体积大', '原生模块集成复杂'],
    color: '#02569b',
  },
  {
    id: 'taro',
    name: 'Taro',
    language: 'JavaScript / TypeScript',
    scores: { performance: 3, 'dev-efficiency': 5, 'native-capability': 2, ecosystem: 4, 'learning-cost': 4, 'bundle-size': 4 },
    pros: ['多端覆盖（小程序+H5+RN）', 'React/Vue 双支持', '生态完善'],
    cons: ['性能受限于小程序', '原生能力需依赖平台'],
    color: '#5cebf5',
  },
  {
    id: 'capacitor',
    name: 'Capacitor',
    language: 'JavaScript / TypeScript',
    scores: { performance: 3, 'dev-efficiency': 5, 'native-capability': 3, ecosystem: 3, 'learning-cost': 5, 'bundle-size': 4 },
    pros: ['Web 技术栈直接复用', 'PWA 与原生共存', '学习成本极低'],
    cons: ['性能不及原生', '复杂动画卡顿'],
    color: '#119eff',
  },
  {
    id: 'pwa',
    name: 'PWA',
    language: 'JavaScript / TypeScript',
    scores: { performance: 2, 'dev-efficiency': 5, 'native-capability': 2, ecosystem: 5, 'learning-cost': 5, 'bundle-size': 5 },
    pros: ['零安装分发', 'SEO 友好', 'Web 技术栈'],
    cons: ['iOS 限制多', '原生能力受限', '后台能力弱'],
    color: '#a855f7',
  },
]

export function CrossPlatformSelector({ data }: CrossPlatformSelectorProps) {
  const dimensions = data?.dimensions ?? DEFAULT_DIMENSIONS
  const solutions = data?.solutions ?? DEFAULT_SOLUTIONS

  // 用户权重 1-5
  const [weights, setWeights] = useState<Record<string, number>>(() => {
    const w: Record<string, number> = {}
    dimensions.forEach((d) => { w[d.id] = d.defaultWeight })
    return w
  })

  // 加权评分计算
  const rankedSolutions = useMemo(() => {
    const results = solutions.map((sol) => {
      let totalScore = 0
      let totalWeight = 0
      dimensions.forEach((d) => {
        const score = sol.scores[d.id] ?? 3
        const theme = DIMENSION_THEME[d.id]
        // 对 "lower is better" 维度反转分数
        const adjustedScore = theme?.higherBetter === false ? 6 - score : score
        totalScore += adjustedScore * weights[d.id]
        totalWeight += weights[d.id]
      })
      const weightedAvg = totalWeight > 0 ? totalScore / totalWeight : 0
      return { ...sol, weightedAvg: Math.round(weightedAvg * 100) / 100 }
    })
    return results.sort((a, b) => b.weightedAvg - a.weightedAvg)
  }, [solutions, dimensions, weights])

  const topSolution = rankedSolutions[0]
  const maxScore = 5

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：评分模型为示意性加权，仅用于教学对比，不替代真实方案选型决策。
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1fr_1.5fr]">
        {/* 权重设置 */}
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">维度权重设置（1-5）</h4>
          <div className="space-y-md">
            {dimensions.map((d) => {
              const theme = DIMENSION_THEME[d.id]
              return (
                <div key={d.id}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-caption-mono-sm" style={{ color: theme?.color }}>
                      {d.label}
                    </span>
                    <span className="font-mono text-body-sm font-bold text-body-hi">{weights[d.id]}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={weights[d.id]}
                    onChange={(e) => setWeights((prev) => ({ ...prev, [d.id]: Number(e.target.value) }))}
                    className="mt-xs w-full"
                    style={{ accentColor: theme?.color }}
                  />
                  <p className="mt-xs text-caption-mono-sm text-body-low">{d.description}</p>
                  {!theme?.higherBetter && (
                    <span className="text-caption-mono-sm text-body-low">（分数越低越优）</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 排序结果 */}
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">方案排名（加权评分）</h4>
          <div className="space-y-sm">
            {rankedSolutions.map((sol, i) => (
              <div
                key={sol.id}
                className={cn(
                  'rounded-sm border p-sm transition-all',
                  i === 0 ? 'border-current' : 'border-hairline'
                )}
                style={i === 0 ? { borderColor: sol.color, background: `${sol.color}10` } : undefined}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <span
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full font-mono text-caption-mono-sm',
                        i === 0 ? 'text-canvas' : 'bg-canvas-bg-inset text-body-mid'
                      )}
                      style={i === 0 ? { background: sol.color } : undefined}
                    >
                      {i + 1}
                    </span>
                    <span className="font-mono text-body-sm font-bold" style={{ color: sol.color }}>
                      {sol.name}
                    </span>
                    <span className="text-caption-mono-sm text-body-low">{sol.language}</span>
                  </div>
                  <span className="font-mono text-body-sm font-bold text-body-hi">{sol.weightedAvg.toFixed(2)}</span>
                </div>
                {/* 评分条 */}
                <div className="mt-xs h-1.5 overflow-hidden rounded-full bg-canvas-bg-inset">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(sol.weightedAvg / maxScore) * 100}%`,
                      background: sol.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 推荐方案详情 */}
      {topSolution && (
        <div className="rounded-sm border p-lg" style={{ borderColor: topSolution.color, background: `${topSolution.color}08` }}>
          <div className="flex items-center gap-sm">
            <span className="rounded-pill px-sm py-xs text-caption-mono-sm text-canvas" style={{ background: topSolution.color }}>
              推荐方案
            </span>
            <h4 className="font-mono text-body-sm font-bold" style={{ color: topSolution.color }}>
              {topSolution.name}
            </h4>
            <span className="text-caption-mono-sm text-body-mid">综合评分 {topSolution.weightedAvg.toFixed(2)} / 5</span>
          </div>

          <div className="mt-md grid grid-cols-1 gap-md sm:grid-cols-2">
            <div className="rounded-sm bg-canvas-bg-inset p-sm">
              <div className="font-mono text-caption-mono-sm font-bold text-[#07c160]">优势</div>
              <ul className="mt-xs space-y-xs text-caption-mono-sm text-body-mid">
                {topSolution.pros.map((p, i) => <li key={i}>+ {p}</li>)}
              </ul>
            </div>
            <div className="rounded-sm bg-canvas-bg-inset p-sm">
              <div className="font-mono text-caption-mono-sm font-bold text-[#ef4444]">劣势</div>
              <ul className="mt-xs space-y-xs text-caption-mono-sm text-body-mid">
                {topSolution.cons.map((c, i) => <li key={i}>- {c}</li>)}
              </ul>
            </div>
          </div>

          {/* 各维度得分明细 */}
          <div className="mt-md">
            <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">各维度原始得分</div>
            <div className="grid grid-cols-2 gap-xs sm:grid-cols-3 lg:grid-cols-6">
              {dimensions.map((d) => {
                const score = topSolution.scores[d.id] ?? 3
                const theme = DIMENSION_THEME[d.id]
                return (
                  <div key={d.id} className="rounded-sm bg-canvas-bg-inset p-xs text-center">
                    <div className="text-caption-mono-sm text-body-mid">{theme?.label ?? d.label}</div>
                    <div className="mt-xs font-mono text-body-sm font-bold" style={{ color: theme?.color }}>
                      {score} / 5
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
