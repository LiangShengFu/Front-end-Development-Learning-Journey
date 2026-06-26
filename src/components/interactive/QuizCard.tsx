/**
 * QuizCard - 交互式测验卡片
 *
 * 提供选择题测验，支持即时反馈和解析。
 * 遵循设计规范：canvas-card 背景，正确/错误用 accent 色区分。
 */
import { useState } from 'react'
import type { QuizData } from '../../lib/types'
import { cn } from '../../lib/utils'

interface QuizCardProps {
  data: QuizData
}

export function QuizCard({ data }: QuizCardProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const question = data.questions[currentQ]
  const isCorrect = selected === question?.correctIndex

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === question.correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentQ < data.questions.length - 1) {
      setCurrentQ((q) => q + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQ(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setCompleted(false)
  }

  if (completed) {
    const percentage = Math.round((score / data.questions.length) * 100)
    return (
      <div className="rounded-sm border border-hairline bg-canvas-card p-2xl text-center">
        <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          测验完成
        </div>
        <div className="mt-md text-display-md tracking-display text-ink">{percentage}%</div>
        <p className="mt-md text-body-md text-body">
          答对 {score} / {data.questions.length} 题
        </p>
        <button type="button" onClick={handleRestart} className="btn-pill mt-xl">
          重新测验
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* Progress */}
      <div className="mb-lg flex items-center justify-between">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          问题 {currentQ + 1} / {data.questions.length}
        </span>
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          得分 {score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-xl h-[2px] w-full bg-canvas-mid">
        <div
          className="h-full bg-accent-sunset transition-all duration-300"
          style={{ width: `${((currentQ + (answered ? 1 : 0)) / data.questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h4 className="text-body-lg text-ink">{question.question}</h4>

      {/* Options */}
      <div className="mt-lg space-y-sm">
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx
          const isCorrectOpt = idx === question.correctIndex
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={cn(
                'flex w-full items-center gap-md rounded-sm border px-lg py-md text-left text-body-md transition-colors',
                !answered && 'border-hairline bg-canvas-soft hover:border-white/30',
                answered && isCorrectOpt && 'border-accent-sunset/50 bg-accent-sunset/10 text-ink',
                answered && isSelected && !isCorrectOpt && 'border-red-500/40 bg-red-500/10 text-body',
                answered && !isSelected && !isCorrectOpt && 'border-hairline bg-canvas-soft text-body-mid',
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border font-mono text-caption-mono-sm',
                  !answered && 'border-hairline text-body-mid',
                  answered && isCorrectOpt && 'border-accent-sunset bg-accent-sunset text-on-primary',
                  answered && isSelected && !isCorrectOpt && 'border-red-500 text-red-500',
                  answered && !isSelected && !isCorrectOpt && 'border-hairline text-body-mid',
                )}
              >
                {answered && isCorrectOpt ? '✓' : answered && isSelected ? '✗' : String.fromCharCode(65 + idx)}
              </span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div
          className={cn(
            'mt-lg rounded-sm border p-lg',
            isCorrect ? 'border-accent-sunset/30 bg-accent-sunset/5' : 'border-red-500/30 bg-red-500/5',
          )}
        >
          <div
            className={cn(
              'mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px]',
              isCorrect ? 'text-accent-sunset' : 'text-red-500',
            )}
          >
            {isCorrect ? '回答正确' : '回答错误'}
          </div>
          <p className="text-body-sm text-body">{question.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <div className="mt-lg flex justify-end">
          <button type="button" onClick={handleNext} className="btn-pill">
            {currentQ < data.questions.length - 1 ? '下一题 →' : '查看结果 →'}
          </button>
        </div>
      )}
    </div>
  )
}
