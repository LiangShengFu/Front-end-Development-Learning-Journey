/**
 * InterviewQuizEngine — 面试问答引擎
 *
 * 自测驱动：隐藏答案→自主回答→展开对比→自评掌握程度。
 * 支持三种模式：顺序学习 / 随机抽查 / 错题回顾。
 * 备考进度通过 localStorage 持久化（questionId → masteryLevel）。
 *
 * 对应docx中演示 #2
 */
import { useState } from 'react'
import type { InterviewQuizEngineData, MasteryLevel } from '../../../lib/interview-visualization-types'
import { CodeBlock } from '../../ui/CodeBlock'
import { cn } from '../../../lib/utils'

interface InterviewQuizEngineProps {
  data?: InterviewQuizEngineData
}

const STORAGE_KEY = 'interview_progress_v1'

/** 读取 localStorage 中的备考进度 */
function loadProgress(): Record<string, MasteryLevel> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

/** 写入备考进度到 localStorage */
function saveProgress(progress: Record<string, MasteryLevel>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // 忽略存储错误
  }
}

export function InterviewQuizEngine({ data }: InterviewQuizEngineProps) {
  const questions = data?.questions ?? []
  const mode = data?.mode ?? 'sequential'

  const [order, setOrder] = useState<number[]>(() =>
    mode === 'random' ? shuffle(questions.map((_, i) => i)) : questions.map((_, i) => i),
  )
  const [pos, setPos] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  // 客户端首次渲染时从 localStorage 加载备考进度
  const [progress, setProgress] = useState<Record<string, MasteryLevel>>(() =>
    typeof window !== 'undefined' ? loadProgress() : {},
  )

  // 错题回顾模式：仅展示 masteryLevel === 'review' 的题目
  const effectiveQuestions =
    mode === 'review'
      ? questions.filter((q) => progress[q.id] === 'review')
      : questions

  const effectiveOrder =
    mode === 'review'
      ? effectiveQuestions.map((q) => questions.indexOf(q))
      : order

  const effectivePos = Math.min(pos, effectiveOrder.length - 1)
  const effectiveCurrentIdx = effectiveOrder[effectivePos]
  const effectiveCurrent = questions[effectiveCurrentIdx]

  const next = () => {
    setShowAnswer(false)
    setPos((p) => Math.min(p + 1, effectiveOrder.length - 1))
  }

  const prev = () => {
    setShowAnswer(false)
    setPos((p) => Math.max(p - 1, 0))
  }

  const rate = (level: MasteryLevel) => {
    if (!effectiveCurrent) return
    const newProgress = { ...progress, [effectiveCurrent.id]: level }
    setProgress(newProgress)
    saveProgress(newProgress)
    next()
  }

  const reshuffle = () => {
    setOrder(shuffle(questions.map((_, i) => i)))
    setPos(0)
    setShowAnswer(false)
  }

  if (effectiveQuestions.length === 0 || !effectiveCurrent) {
    return (
      <div className="rounded-sm border border-hairline bg-canvas-card p-xl text-center">
        <p className="text-body-md text-body-mid">
          {mode === 'review' ? '暂无需复习的题目。先在其他模式中标记「需复习」吧！' : '暂无题目。'}
        </p>
      </div>
    )
  }

  const masteredCount = effectiveQuestions.filter((q) => progress[q.id] === 'mastered').length
  const reviewCount = effectiveQuestions.filter((q) => progress[q.id] === 'review').length
  const masteryPercent = Math.round((masteredCount / effectiveQuestions.length) * 100)

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 模式切换 + 进度 */}
      <div className="mb-xl flex flex-wrap items-center justify-between gap-sm">
        <div className="flex gap-xs">
          <span className="rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid">
            {mode === 'sequential' ? '顺序学习' : mode === 'random' ? '随机抽查' : '错题回顾'}
          </span>
          <span className="rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid">
            {effectivePos + 1} / {effectiveOrder.length}
          </span>
        </div>
        {mode === 'random' && (
          <button type="button" onClick={reshuffle} className="btn-pill text-body-mid">
            🎲 重新打乱
          </button>
        )}
      </div>

      {/* 进度条 */}
      <div className="mb-xl">
        <div className="mb-xs flex items-center justify-between font-mono text-caption-mono-sm text-body-mid">
          <span>掌握进度</span>
          <span>{masteredCount} 已掌握 · {reviewCount} 需复习 · {effectiveQuestions.length - masteredCount - reviewCount} 未学习</span>
        </div>
        <div className="flex h-2 overflow-hidden rounded-pill bg-canvas-mid">
          <div className="bg-accent-dusk/60" style={{ width: `${(masteredCount / effectiveQuestions.length) * 100}%` }} />
          <div className="bg-accent-sunset/60" style={{ width: `${(reviewCount / effectiveQuestions.length) * 100}%` }} />
        </div>
        <div className="mt-xs text-right font-mono text-caption-mono-sm text-accent-dusk">{masteryPercent}%</div>
      </div>

      {/* 题目卡片 */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-xl">
        {/* 题目头部 */}
        <div className="mb-md flex flex-wrap items-center gap-sm">
          <span className="rounded-pill bg-accent-sunset/20 px-md py-xs font-mono text-caption-mono-sm text-accent-sunset">
            {effectiveCurrent.domain}
          </span>
          <DifficultyBadge difficulty={effectiveCurrent.difficulty} />
          {progress[effectiveCurrent.id] && (
            <span
              className={cn(
                'rounded-pill px-md py-xs font-mono text-caption-mono-sm',
                progress[effectiveCurrent.id] === 'mastered' && 'bg-accent-dusk/20 text-accent-dusk',
                progress[effectiveCurrent.id] === 'review' && 'bg-accent-sunset/20 text-accent-sunset',
                progress[effectiveCurrent.id] === 'unlearned' && 'bg-canvas-mid text-body-mid',
              )}
            >
              {progress[effectiveCurrent.id] === 'mastered' ? '✅ 已掌握' : progress[effectiveCurrent.id] === 'review' ? '🟡 需复习' : '❌ 未掌握'}
            </span>
          )}
        </div>

        {/* 题目内容 */}
        <h4 className="text-body-lg text-ink">{effectiveCurrent.question}</h4>

        {/* 标签 */}
        <div className="mt-sm flex flex-wrap gap-xs">
          {effectiveCurrent.tags.map((tag) => (
            <span key={tag} className="rounded-pill border border-hairline px-xs py-xxs font-mono text-caption-mono-sm text-body-mid">
              #{tag}
            </span>
          ))}
        </div>

        {/* 答案区 */}
        {!showAnswer ? (
          <div className="mt-xl text-center">
            <p className="mb-md text-body-sm text-body-mid">先自己思考答案，准备好后点击展开</p>
            <button type="button" onClick={() => setShowAnswer(true)} className="btn-primary">
              显示答案 →
            </button>
          </div>
        ) : (
          <div className="mt-xl space-y-lg">
            {/* 核心答案 */}
            <div className="rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-lg">
              <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
                核心答案
              </div>
              <p className="text-body-md text-ink">{effectiveCurrent.shortAnswer}</p>
            </div>

            {/* 详细阐释 */}
            <div>
              <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                详细阐释
              </div>
              <p className="text-body-sm text-body">{effectiveCurrent.detailedAnswer}</p>
            </div>

            {/* 代码示例 */}
            {effectiveCurrent.codeExample && (
              <div>
                <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                  代码示例
                </div>
                <CodeBlock code={effectiveCurrent.codeExample} language="javascript" />
              </div>
            )}

            {/* 回答要点 */}
            <div>
              <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                回答要点
              </div>
              <ul className="space-y-xs">
                {effectiveCurrent.keyPoints.map((point, i) => (
                  <li key={i} className="flex gap-xs text-body-sm text-body">
                    <span className="text-accent-sunset">{i + 1}.</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* 自评面板 */}
            <div className="rounded-sm border border-hairline bg-canvas p-lg">
              <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                自评掌握程度
              </div>
              <div className="flex flex-wrap gap-sm">
                <button
                  type="button"
                  onClick={() => rate('mastered')}
                  className="flex-1 rounded-pill border border-accent-dusk/40 bg-accent-dusk/10 px-md py-sm text-body-sm text-accent-dusk transition-colors hover:bg-accent-dusk/20"
                >
                  ✅ 已掌握
                </button>
                <button
                  type="button"
                  onClick={() => rate('review')}
                  className="flex-1 rounded-pill border border-accent-sunset/40 bg-accent-sunset/10 px-md py-sm text-body-sm text-accent-sunset transition-colors hover:bg-accent-sunset/20"
                >
                  🟡 需复习
                </button>
                <button
                  type="button"
                  onClick={() => rate('unlearned')}
                  className="flex-1 rounded-pill border border-red-500/40 bg-red-500/10 px-md py-sm text-body-sm text-red-500 transition-colors hover:bg-red-500/20"
                >
                  ❌ 未掌握
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航 */}
      <div className="mt-xl flex items-center justify-between">
        <button type="button" onClick={prev} disabled={effectivePos === 0} className="btn-pill">
          ◀ 上一题
        </button>
        <button type="button" onClick={next} disabled={effectivePos >= effectiveOrder.length - 1} className="btn-pill">
          下一题 ▶
        </button>
      </div>
    </div>
  )
}

/** 难度徽章组件 */
function DifficultyBadge({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) {
  const config = {
    easy: { label: '易', color: 'bg-accent-dusk/20 text-accent-dusk' },
    medium: { label: '中', color: 'bg-accent-sunset/20 text-accent-sunset' },
    hard: { label: '难', color: 'bg-red-500/20 text-red-500' },
  }
  const { label, color } = config[difficulty]
  return (
    <span className={cn('rounded-pill px-md py-xs font-mono text-caption-mono-sm', color)}>
      {label}
    </span>
  )
}

/** 洗牌算法 */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
