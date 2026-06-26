/**
 * ComponentLibDecider — 组件库对比决策
 *
 * 多维度对比主流 React 组件库（Ant Design / MUI / Chakra UI / Radix + Tailwind），
 * 帮助开发者根据项目需求做出选型决策。
 *
 * 对应docx中演示 #22
 */
import { useState } from 'react'
import type { ComponentLibDeciderData } from '../../../lib/react-visualization-types'
import { cn } from '../../../lib/utils'

interface ComponentLibDeciderProps {
  data?: ComponentLibDeciderData
}

const DEFAULT_CRITERIA = ['学习曲线', '组件丰富度', '定制性', '体积', '可访问性', 'TypeScript', '中文文档']

const DEFAULT_OPTIONS = [
  {
    name: 'Ant Design',
    scores: { '学习曲线': 4, '组件丰富度': 5, '定制性': 3, '体积': 2, '可访问性': 3, 'TypeScript': 5, '中文文档': 5 },
    pros: ['组件最丰富（60+）', '中文文档质量最高', '企业级表单方案', 'TypeScript 支持极好'],
    cons: ['体积较大（需按需引入）', '定制主题成本高', '设计风格辨识度强'],
    bestFor: '中后台管理系统、企业级应用',
  },
  {
    name: 'MUI (Material UI)',
    scores: { '学习曲线': 3, '组件丰富度': 5, '定制性': 4, '体积': 2, '可访问性': 4, 'TypeScript': 4, '中文文档': 3 },
    pros: ['Material Design 规范', '主题系统强大', '国际化支持好'],
    cons: ['Material 风格辨识度强', '定制需理解 sx 系统'],
    bestFor: '国际化项目、Material 风格应用',
  },
  {
    name: 'Chakra UI',
    scores: { '学习曲线': 5, '组件丰富度': 3, '定制性': 4, '体积': 3, '可访问性': 5, 'TypeScript': 4, '中文文档': 2 },
    pros: ['Style props 直观', '可访问性极佳（WAI-ARIA）', '暗色模式内置'],
    cons: ['组件不如 AntD 丰富', '中文社区较小'],
    bestFor: '快速原型、可访问性要求高的项目',
  },
  {
    name: 'Radix + Tailwind',
    scores: { '学习曲线': 3, '组件丰富度': 3, '定制性': 5, '体积': 5, '可访问性': 5, 'TypeScript': 5, '中文文档': 2 },
    pros: ['完全可定制样式', 'Headless 无样式约束', '可访问性一流', '体积最小'],
    cons: ['需要自己写样式', '组件数量有限', '中文资源少'],
    bestFor: '设计系统、定制化要求高的产品',
  },
]

export function ComponentLibDecider({ data }: ComponentLibDeciderProps) {
  const criteria = data?.criteria ?? DEFAULT_CRITERIA
  const options = data?.options ?? DEFAULT_OPTIONS
  const [selected, setSelected] = useState(0)
  const option = options[selected]

  return (
    <div className="space-y-lg">
      {/* Option selector */}
      <div className="flex flex-wrap gap-sm">
        {options.map((o, i) => (
          <button
            key={o.name}
            type="button"
            onClick={() => setSelected(i)}
            className={cn(
              'rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
              selected === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {o.name}
          </button>
        ))}
      </div>

      {/* Score radar (simplified as bar chart) */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
        <div className="mb-lg font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          能力评分
        </div>
        <div className="space-y-md">
          {criteria.map((c) => {
            const score = (option.scores as Record<string, number>)[c] ?? 3
            return (
              <div key={c} className="flex items-center gap-md">
                <span className="w-20 flex-shrink-0 text-body-sm text-body-mid">{c}</span>
                <div className="flex-1 h-2 rounded-pill bg-canvas-mid">
                  <div
                    className="h-full rounded-pill bg-accent-sunset transition-all duration-300"
                    style={{ width: `${(score / 5) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-caption-mono-sm text-accent-sunset">
                  {score}/5
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pros / Cons / Best For */}
      <div className="grid gap-lg sm:grid-cols-3">
        <div className="rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-lg">
          <div className="mb-sm font-mono text-caption-mono-sm text-accent-sunset">优点</div>
          <ul className="space-y-xs">
            {option.pros.map((p, i) => (
              <li key={i} className="text-body-sm text-body">✓ {p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-sm border border-red-500/20 bg-red-500/5 p-lg">
          <div className="mb-sm font-mono text-caption-mono-sm text-red-500">缺点</div>
          <ul className="space-y-xs">
            {option.cons.map((c, i) => (
              <li key={i} className="text-body-sm text-body">✕ {c}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-sm border border-accent-dusk/30 bg-accent-dusk/5 p-lg">
          <div className="mb-sm font-mono text-caption-mono-sm text-accent-dusk">最适合</div>
          <p className="text-body-sm text-body">{option.bestFor}</p>
        </div>
      </div>
    </div>
  )
}
