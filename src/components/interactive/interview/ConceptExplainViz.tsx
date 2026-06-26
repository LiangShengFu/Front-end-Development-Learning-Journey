/**
 * ConceptExplainViz — 概念阐释可视化
 *
 * 将面试答题方法论「先结论后分析→举例说明→对比分析→结合实际」
 * 转化为可视化的表达框架。四步结构化展示，每一步可独立折叠/展开。
 * 学习者可以练习「只看到第 1 步，自己补全后续」。
 *
 * 对应docx中演示 #3
 */
import { useState } from 'react'
import type { ConceptExplainVizData } from '../../../lib/interview-visualization-types'
import { CodeBlock } from '../../ui/CodeBlock'
import { cn } from '../../../lib/utils'

interface ConceptExplainVizProps {
  data?: ConceptExplainVizData
}

const STEP_LABELS = [
  { num: '01', title: '结论', icon: '🎯', desc: '一句话答案（面试时先说结论）' },
  { num: '02', title: '分析', icon: '🔬', desc: '原理阐释（展开说为什么）' },
  { num: '03', title: '举例', icon: '💡', desc: '代码/场景（用具体示例佐证）' },
  { num: '04', title: '延伸', icon: '🔗', desc: '对比/延伸（相关概念异同）' },
]

export function ConceptExplainViz({ data }: ConceptExplainVizProps) {
  const templates = data?.templates ?? []
  const [activeId, setActiveId] = useState(templates[0]?.id ?? '')
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([0]))

  const active = templates.find((t) => t.id === activeId) ?? templates[0]

  if (!active) {
    return <div className="text-body-mid">暂无概念阐释模板</div>
  }

  const toggleStep = (idx: number) => {
    setOpenSteps((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        next.add(idx)
      }
      return next
    })
  }

  const steps = [active.conclusion, active.analysis, active.examples, active.extension]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 概念切换 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => { setActiveId(t.id); setOpenSteps(new Set([0])) }}
            className={cn(
              'rounded-pill border px-md py-xs text-body-sm transition-colors',
              t.id === activeId
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* 答题结构说明 */}
      <div className="mb-xl rounded-sm border border-accent-sunset/20 bg-accent-sunset/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          💡 面试答题四步法：先说结论让面试官知道你懂，再展开分析展示深度，
          用举例佐证理解，最后延伸对比展现广度。点击各步骤折叠/展开，练习只看结论自己补全后续。
        </p>
      </div>

      {/* 四步结构化展示 */}
      <div className="space-y-sm">
        {STEP_LABELS.map((step, idx) => {
          const isOpen = openSteps.has(idx)
          const content = steps[idx]
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
                <span className="font-mono text-caption-mono-sm text-accent-sunset">{step.num}</span>
                <span className="text-lg">{step.icon}</span>
                <div className="flex-1">
                  <span className="text-body-md text-ink">{step.title}</span>
                  <span className="ml-sm text-caption-mono-sm text-body-mid">{step.desc}</span>
                </div>
                <span className={cn('text-body-mid transition-transform duration-200', isOpen && 'rotate-45')}>+</span>
              </button>

              {/* 步骤内容 */}
              {isOpen && (
                <div className="border-t border-hairline px-lg py-lg">
                  {/* 判断是否是代码内容（以 < 或 function 或 const 开头） */}
                  {idx === 2 && active.examples.trim().startsWith('<') || active.examples.trim().startsWith('function') || active.examples.trim().startsWith('const') || active.examples.trim().startsWith('//')
                    ? <CodeBlock code={content} language="javascript" />
                    : <p className="text-body-sm text-body whitespace-pre-wrap">{content}</p>
                  }
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 练习提示 */}
      <div className="mt-xl rounded-sm border border-hairline bg-canvas-soft p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ✏️ 练习建议：先只展开「结论」步骤，自己尝试说出分析、举例和延伸，再展开对比。
        </p>
      </div>
    </div>
  )
}
