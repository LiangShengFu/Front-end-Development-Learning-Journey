/**
 * MockInterviewTimer — 模拟面试计时器
 *
 * 模拟真实面试场景：选择领域→随机抽题→每题限时回答→倒计时器→时间到自动展示答案。
 * 状态机：idle → ready → answering → reviewing → finished
 *
 * 对应docx中演示 #5
 */
import { useEffect, useReducer, useState } from 'react'
import type { MockInterviewTimerData, InterviewQuestion, QuestionDomain } from '../../../lib/interview-visualization-types'
import { CodeBlock } from '../../ui/CodeBlock'
import { cn } from '../../../lib/utils'

interface MockInterviewTimerProps {
  data?: MockInterviewTimerData
}

type Phase = 'idle' | 'ready' | 'answering' | 'reviewing' | 'finished'

interface State {
  phase: Phase
  questions: InterviewQuestion[]
  currentIdx: number
  timeLeft: number
  results: Array<{ questionId: string; rating: 'mastered' | 'review' | 'unlearned' }>
}

type Action =
  | { type: 'START'; questions: InterviewQuestion[]; timePerQuestion: number }
  | { type: 'READY'; timePerQuestion: number }
  | { type: 'ANSWER' }
  | { type: 'TICK' }
  | { type: 'TIMEUP' }
  | { type: 'RATE'; rating: 'mastered' | 'review' | 'unlearned' }
  | { type: 'NEXT' }
  | { type: 'FINISH' }
  | { type: 'RESET' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return {
        phase: 'ready',
        questions: action.questions,
        currentIdx: 0,
        timeLeft: 3,
        results: [],
      }
    case 'READY':
      return { ...state, phase: 'answering', timeLeft: action.timePerQuestion ?? state.timeLeft }
    case 'ANSWER':
      return { ...state, phase: 'reviewing' }
    case 'TICK':
      if (state.timeLeft <= 1) {
        return { ...state, phase: 'reviewing' }
      }
      return { ...state, timeLeft: state.timeLeft - 1 }
    case 'TIMEUP':
      return { ...state, phase: 'reviewing' }
    case 'RATE': {
      const current = state.questions[state.currentIdx]
      const results = [...state.results, { questionId: current.id, rating: action.rating }]
      if (state.currentIdx >= state.questions.length - 1) {
        return { ...state, results, phase: 'finished' }
      }
      return {
        ...state,
        results,
        currentIdx: state.currentIdx + 1,
        phase: 'ready',
        timeLeft: 3,
      }
    }
    case 'FINISH':
      return { ...state, phase: 'finished' }
    case 'RESET':
      return { phase: 'idle', questions: [], currentIdx: 0, timeLeft: 0, results: [] }
    default:
      return state
  }
}

export function MockInterviewTimer({ data }: MockInterviewTimerProps) {
  const allQuestions = data?.questions ?? []
  const defaultTime = (data?.defaultTimePerQuestion ?? 3) * 60

  const [selectedDomains, setSelectedDomains] = useState<Set<QuestionDomain>>(new Set())
  const [questionCount, setQuestionCount] = useState(5)
  const [timePerQuestion, setTimePerQuestion] = useState(defaultTime)
  const [state, dispatch] = useReducer(reducer, {
    phase: 'idle' as Phase,
    questions: [],
    currentIdx: 0,
    timeLeft: 0,
    results: [],
  })

  const toggleDomain = (domain: QuestionDomain) => {
    setSelectedDomains((prev) => {
      const next = new Set(prev)
      if (next.has(domain)) next.delete(domain)
      else next.add(domain)
      return next
    })
  }

  const startInterview = () => {
    const pool = allQuestions.filter((q) => selectedDomains.size === 0 || selectedDomains.has(q.domain))
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, questionCount)
    dispatch({ type: 'START', questions: shuffled, timePerQuestion })
  }

  // 准备倒计时（3-2-1）
  useEffect(() => {
    if (state.phase !== 'ready') return
    if (state.timeLeft <= 0) {
      dispatch({ type: 'READY', timePerQuestion })
      return
    }
    const timer = setTimeout(() => dispatch({ type: 'TICK' }), 1000)
    return () => clearTimeout(timer)
  }, [state.phase, state.timeLeft, timePerQuestion])

  // 答题倒计时
  useEffect(() => {
    if (state.phase !== 'answering') return
    if (state.timeLeft <= 0) {
      dispatch({ type: 'TIMEUP' })
      return
    }
    const timer = setTimeout(() => dispatch({ type: 'TICK' }), 1000)
    return () => clearTimeout(timer)
  }, [state.phase, state.timeLeft])

  const domains: QuestionDomain[] = ['javascript', 'css', 'react', 'network', 'security', 'engineering', 'react19', 'testing', 'handwriting']

  // ============ 设置面板 ============
  if (state.phase === 'idle') {
    return (
      <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
        <h4 className="mb-xl text-body-lg text-ink">模拟面试设置</h4>

        {/* 领域选择 */}
        <div className="mb-xl">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            选择领域（不选则随机混合）
          </div>
          <div className="flex flex-wrap gap-sm">
            {domains.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => toggleDomain(d)}
                className={cn(
                  'rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
                  selectedDomains.has(d)
                    ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                    : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 题目数量 */}
        <div className="mb-xl">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            题目数量
          </div>
          <div className="flex gap-sm">
            {[3, 5, 10].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setQuestionCount(n)}
                className={cn(
                  'rounded-pill border px-md py-xs text-body-sm transition-colors',
                  questionCount === n
                    ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                    : 'border-hairline bg-canvas-soft text-body-mid',
                )}
              >
                {n} 题
              </button>
            ))}
          </div>
        </div>

        {/* 每题时间 */}
        <div className="mb-xl">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            每题时间
          </div>
          <div className="flex gap-sm">
            {[2, 3, 5].map((min) => (
              <button
                key={min}
                type="button"
                onClick={() => setTimePerQuestion(min * 60)}
                className={cn(
                  'rounded-pill border px-md py-xs text-body-sm transition-colors',
                  timePerQuestion === min * 60
                    ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                    : 'border-hairline bg-canvas-soft text-body-mid',
                )}
              >
                {min} 分钟
              </button>
            ))}
          </div>
        </div>

        <button type="button" onClick={startInterview} className="btn-primary w-full">
          🚀 开始模拟面试
        </button>
      </div>
    )
  }

  // ============ 统计面板 ============
  if (state.phase === 'finished') {
    const mastered = state.results.filter((r) => r.rating === 'mastered').length
    const review = state.results.filter((r) => r.rating === 'review').length
    const unlearned = state.results.filter((r) => r.rating === 'unlearned').length
    const percent = Math.round((mastered / state.results.length) * 100)

    return (
      <div className="rounded-sm border border-hairline bg-canvas-card p-xl text-center">
        <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          模拟面试完成
        </div>
        <div className="text-display-md tracking-display text-ink">{percent}%</div>
        <p className="mt-md text-body-md text-body">共 {state.results.length} 题 · 已掌握 {mastered} · 需复习 {review} · 未掌握 {unlearned}</p>
        <div className="mt-xl space-y-sm text-left">
          {state.results.map((r, i) => {
            const q = state.questions.find((q) => q.id === r.questionId)
            return (
              <div key={i} className="flex items-center gap-md rounded-sm border border-hairline bg-canvas-soft px-md py-sm">
                <span className="font-mono text-caption-mono-sm text-body-mid">{i + 1}</span>
                <span className="flex-1 text-body-sm text-ink">{q?.question}</span>
                <span className={cn(
                  'rounded-pill px-md py-xs font-mono text-caption-mono-sm',
                  r.rating === 'mastered' && 'bg-accent-dusk/20 text-accent-dusk',
                  r.rating === 'review' && 'bg-accent-sunset/20 text-accent-sunset',
                  r.rating === 'unlearned' && 'bg-red-500/20 text-red-500',
                )}>
                  {r.rating === 'mastered' ? '✅' : r.rating === 'review' ? '🟡' : '❌'}
                </span>
              </div>
            )
          })}
        </div>
        <button type="button" onClick={() => dispatch({ type: 'RESET' })} className="btn-pill mt-xl">
          重新模拟
        </button>
      </div>
    )
  }

  // ============ 面试进行中 ============
  const current = state.questions[state.currentIdx]
  const minutes = Math.floor(state.timeLeft / 60)
  const seconds = state.timeLeft % 60
  const timePercent = state.phase === 'answering' ? (state.timeLeft / timePerQuestion) * 100 : 0
  const isWarning = state.phase === 'answering' && state.timeLeft <= 60

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 进度 */}
      <div className="mb-xl flex items-center justify-between">
        <span className="font-mono text-caption-mono-sm text-body-mid">
          第 {state.currentIdx + 1} / {state.questions.length} 题
        </span>
        <span className="rounded-pill bg-accent-sunset/20 px-md py-xs font-mono text-caption-mono-sm text-accent-sunset">
          {state.phase === 'ready' ? '准备' : state.phase === 'answering' ? '作答中' : '回顾'}
        </span>
      </div>

      {/* 倒计时 */}
      {state.phase !== 'reviewing' && (
        <div className="mb-xl text-center">
          <div className={cn(
            'font-mono text-display-md tracking-display',
            state.phase === 'ready' ? 'text-accent-sunset' : isWarning ? 'text-red-500 animate-pulse' : 'text-ink',
          )}>
            {state.phase === 'ready' ? state.timeLeft : `${minutes}:${String(seconds).padStart(2, '0')}`}
          </div>
          {state.phase === 'answering' && (
            <div className="mt-md h-2 overflow-hidden rounded-pill bg-canvas-mid">
              <div
                className={cn(
                  'h-full rounded-pill transition-all duration-1000',
                  isWarning ? 'bg-red-500' : timePercent < 50 ? 'bg-accent-sunset' : 'bg-accent-dusk',
                )}
                style={{ width: `${timePercent}%` }}
              />
            </div>
          )}
          {state.phase === 'ready' && <p className="mt-md text-body-sm text-body-mid">准备作答...</p>}
        </div>
      )}

      {/* 题目 */}
      {state.phase === 'ready' || state.phase === 'answering' ? (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-xl text-center">
          <div className="mb-md flex items-center justify-center gap-sm">
            <span className="rounded-pill bg-accent-sunset/20 px-md py-xs font-mono text-caption-mono-sm text-accent-sunset">
              {current.domain}
            </span>
            <span className={cn(
              'rounded-pill px-md py-xs font-mono text-caption-mono-sm',
              current.difficulty === 'easy' && 'bg-accent-dusk/20 text-accent-dusk',
              current.difficulty === 'medium' && 'bg-accent-sunset/20 text-accent-sunset',
              current.difficulty === 'hard' && 'bg-red-500/20 text-red-500',
            )}>
              {current.difficulty === 'easy' ? '易' : current.difficulty === 'medium' ? '中' : '难'}
            </span>
          </div>
          <p className="text-body-lg text-ink">{current.question}</p>
          {state.phase === 'answering' && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'ANSWER' })}
              className="btn-pill mt-xl"
            >
              提前结束作答 →
            </button>
          )}
        </div>
      ) : null}

      {/* 回顾答案 */}
      {state.phase === 'reviewing' && current && (
        <div className="space-y-lg">
          <div className="rounded-sm border border-hairline bg-canvas-soft p-xl">
            <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              面试题目
            </div>
            <p className="text-body-md text-ink">{current.question}</p>
          </div>
          <div className="rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-lg">
            <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              核心答案
            </div>
            <p className="text-body-md text-ink">{current.shortAnswer}</p>
          </div>
          <div>
            <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              详细阐释
            </div>
            <p className="text-body-sm text-body">{current.detailedAnswer}</p>
          </div>
          {current.codeExample && (
            <CodeBlock code={current.codeExample} language="javascript" />
          )}
          <div>
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              自评
            </div>
            <div className="flex gap-sm">
              <button type="button" onClick={() => dispatch({ type: 'RATE', rating: 'mastered' })} className="flex-1 rounded-pill border border-accent-dusk/40 bg-accent-dusk/10 px-md py-sm text-body-sm text-accent-dusk">
                ✅ 已掌握
              </button>
              <button type="button" onClick={() => dispatch({ type: 'RATE', rating: 'review' })} className="flex-1 rounded-pill border border-accent-sunset/40 bg-accent-sunset/10 px-md py-sm text-body-sm text-accent-sunset">
                🟡 需复习
              </button>
              <button type="button" onClick={() => dispatch({ type: 'RATE', rating: 'unlearned' })} className="flex-1 rounded-pill border border-red-500/40 bg-red-500/10 px-md py-sm text-body-sm text-red-500">
                ❌ 未掌握
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 放弃按钮 */}
      {state.phase !== 'reviewing' && (
        <div className="mt-xl text-center">
          <button type="button" onClick={() => dispatch({ type: 'RESET' })} className="btn-pill text-body-mid">
            放弃面试
          </button>
        </div>
      )}
    </div>
  )
}
