/**
 * SystemDesignBoard — 系统设计题面板
 *
 * 针对前端系统设计题（如「设计一个前端监控系统」），提供结构化的答题模板——
 * 需求分析 → 架构设计 → 技术选型 → 关键细节 → 权衡取舍。
 * 5 步结构化面板，每步有提示问题引导思考 + 参考答案折叠区。
 *
 * 对应docx中演示 #7
 */
import { useState } from 'react'
import type { SystemDesignBoardData } from '../../../lib/interview-visualization-types'
import { cn } from '../../../lib/utils'

interface SystemDesignBoardProps {
  data?: SystemDesignBoardData
}

const STEP_LABELS = [
  { num: '01', title: '需求分析', icon: '📋' },
  { num: '02', title: '架构设计', icon: '🏗️' },
  { num: '03', title: '技术选型', icon: '⚙️' },
  { num: '04', title: '关键细节', icon: '🔧' },
  { num: '05', title: '权衡取舍', icon: '⚖️' },
]

export function SystemDesignBoard({ data }: SystemDesignBoardProps) {
  const problems = data?.problems ?? []
  const [activeId, setActiveId] = useState(problems[0]?.id ?? '')
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set())

  const active = problems.find((p) => p.id === activeId) ?? problems[0]

  if (!active) {
    return <div className="text-body-mid">暂无系统设计题</div>
  }

  const toggleStep = (idx: number) => {
    setOpenSteps((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 题目切换 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        {problems.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => { setActiveId(p.id); setOpenSteps(new Set()) }}
            className={cn(
              'rounded-pill border px-md py-xs text-body-sm transition-colors',
              p.id === activeId
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* 问题描述 */}
      <div className="mb-xl rounded-sm border border-accent-sunset/20 bg-accent-sunset/5 p-lg">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          系统设计题
        </div>
        <p className="text-body-md text-ink">{active.description}</p>
      </div>

      {/* 五步结构化面板 */}
      <div className="space-y-sm">
        {active.steps.map((step, idx) => {
          const label = STEP_LABELS[idx] ?? { num: String(idx + 1).padStart(2, '0'), title: '', icon: '' }
          const isOpen = openSteps.has(idx)
          return (
            <div
              key={idx}
              className={cn(
                'overflow-hidden rounded-sm border transition-colors',
                isOpen ? 'border-accent-sunset/30' : 'border-hairline',
              )}
            >
              {/* 步骤标题栏 */}
              <button
                type="button"
                onClick={() => toggleStep(idx)}
                className="flex w-full items-center gap-md px-lg py-md text-left"
              >
                <span className="font-mono text-caption-mono-sm text-accent-sunset">{label.num}</span>
                <span className="text-lg">{label.icon}</span>
                <div className="flex-1">
                  <span className="text-body-md text-ink">{label.title}</span>
                </div>
                <span className={cn('text-body-mid transition-transform duration-200', isOpen && 'rotate-45')}>+</span>
              </button>

              {/* 步骤内容 */}
              {isOpen && (
                <div className="border-t border-hairline px-lg py-lg">
                  {/* 提示问题 */}
                  <div className="mb-md">
                    <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                      思考提示
                    </div>
                    <p className="text-body-sm text-body">{step.prompt}</p>
                  </div>

                  {/* 参考答案 */}
                  <div className="rounded-sm border border-accent-dusk/20 bg-accent-dusk/5 p-md">
                    <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
                      参考答案
                    </div>
                    <p className="text-body-sm text-body whitespace-pre-wrap">{step.reference}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 答题建议 */}
      <div className="mt-xl rounded-sm border border-hairline bg-canvas-soft p-md">
        <p className="text-caption-mono-sm text-body-mid">
          💡 系统设计题没有标准答案，关键是展示结构化思维。先理清需求边界，
          再从高到低分层设计，技术选型要说明理由，最后主动讨论权衡取舍。
        </p>
      </div>
    </div>
  )
}
