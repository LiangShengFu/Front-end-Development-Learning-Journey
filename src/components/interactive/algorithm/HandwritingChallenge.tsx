/**
 * HandwritingChallenge - 手写题挑战
 *
 * 交互式学习 5 道前端高频手写题。每道题展示题目描述、边界条件测试用例、标准答案。
 * 学习者可「遮住答案→自己写→对比标准答案」。
 *
 * ⚠️ 教学验证：非真实代码执行环境，测试用例展示标准实现的预期行为。
 *    请在本地环境实际运行验证。
 */
import { useState } from 'react'
import type { HandwritingChallengeData } from '../../../lib/algorithm-visualization-types'
import { CodeBlock } from '../../ui/CodeBlock'
import { cn } from '../../../lib/utils'

interface HandwritingChallengeProps {
  data: HandwritingChallengeData
}

export function HandwritingChallenge({ data }: HandwritingChallengeProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [showSolution, setShowSolution] = useState<Record<number, boolean>>({})
  const [expandedCase, setExpandedCase] = useState<string | null>(null)

  const problem = data.problems[activeIdx]

  const toggleSolution = (idx: number) => {
    setShowSolution((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 题目标签页 */}
      <div className="mb-xl flex flex-wrap gap-xs">
        {data.problems.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={cn(
              'rounded-sm border px-md py-xs text-body-sm transition-colors',
              i === activeIdx
                ? 'border-accent-sunset/50 bg-accent-sunset/10 text-accent-sunset'
                : 'border-hairline bg-canvas-soft text-body-mid hover:text-ink',
            )}
          >
            <span className="mr-xs font-mono text-caption-mono-sm">{String(i + 1).padStart(2, '0')}</span>
            {p.title}
          </button>
        ))}
      </div>

      {/* 题目描述 */}
      <div className="mb-xl">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          题目描述
        </div>
        <p className="text-body-md text-body">{problem.description}</p>
      </div>

      {/* 关键考点 */}
      <div className="mb-xl rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          关键考点
        </div>
        <div className="flex flex-wrap gap-sm">
          {problem.keyPoints.map((point, i) => (
            <span
              key={i}
              className="rounded-pill border border-accent-sunset/30 bg-accent-sunset/5 px-md py-xs text-caption-mono-sm text-body"
            >
              {point}
            </span>
          ))}
        </div>
      </div>

      {/* 边界条件测试用例 */}
      <div className="mb-xl">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          边界条件测试用例（点击展开查看预期输出）
        </div>
        <div className="space-y-sm">
          {problem.testCases.map((tc, i) => {
            const caseId = `${problem.id}-${i}`
            const isOpen = expandedCase === caseId
            return (
              <div key={i} className="overflow-hidden rounded-sm border border-hairline bg-canvas-soft">
                <button
                  type="button"
                  onClick={() => setExpandedCase(isOpen ? null : caseId)}
                  className="flex w-full items-center justify-between gap-md px-lg py-md text-left"
                >
                  <div className="flex items-center gap-md">
                    <span className="font-mono text-caption-mono-sm text-body-mid">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body-sm text-ink">{tc.label}</span>
                  </div>
                  <span className={cn('text-body-mid transition-transform duration-200', isOpen && 'rotate-45')}>+</span>
                </button>
                {isOpen && (
                  <div className="border-t border-hairline px-lg py-md">
                    <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                      输入
                    </div>
                    <pre className="overflow-x-auto rounded-sm bg-canvas p-md font-mono text-caption-mono-sm text-body">{tc.input}</pre>
                    <div className="mb-sm mt-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
                      预期输出
                    </div>
                    <pre className="overflow-x-auto rounded-sm bg-canvas p-md font-mono text-caption-mono-sm text-accent-sunset">{tc.expected}</pre>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 标准答案 */}
      <div>
        <div className="mb-sm flex items-center justify-between">
          <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            标准实现
          </div>
          <button
            type="button"
            onClick={() => toggleSolution(activeIdx)}
            className="btn-pill-sm"
          >
            {showSolution[activeIdx] ? '隐藏答案' : '显示答案'}
          </button>
        </div>
        {showSolution[activeIdx] ? (
          <CodeBlock code={problem.solution} language="javascript" />
        ) : (
          <div className="rounded-sm border border-dashed border-hairline bg-canvas-soft p-2xl text-center">
            <p className="text-body-sm text-body-mid">
              🔒 先尝试自己实现，再点击「显示答案」对比标准实现
            </p>
          </div>
        )}
      </div>

      {/* 教学提示 */}
      <div className="mt-xl rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 教学验证：非真实代码执行环境，测试用例展示标准实现的预期行为。请在本地环境实际运行验证。
        </p>
      </div>
    </div>
  )
}
