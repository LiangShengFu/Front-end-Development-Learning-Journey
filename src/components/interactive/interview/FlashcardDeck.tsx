/**
 * FlashcardDeck — 闪卡记忆系统
 *
 * 基于简化 SM-2 间隔重复算法的闪卡记忆系统。
 * 正面显示题目，点击翻转显示核心答案，
 * 学习者根据回忆难度（简单/困难/遗忘）选择，算法自动计算下次复习时间。
 *
 * SM-2 简化参数：
 * - 初始 EF = 2.5，最小 EF = 1.3
 * - 初始间隔 = 1 天，最大间隔 = 90 天
 * - easy：间隔 × EF × 1.3，EF + 0.1
 * - hard：间隔 × 1.5
 * - forgot：间隔重置为 1 天，连续正确归零
 *
 * 对应docx中演示 #4
 */
import { useState } from 'react'
import type { FlashcardDeckData } from '../../../lib/interview-visualization-types'
import { cn } from '../../../lib/utils'

interface FlashcardDeckProps {
  data?: FlashcardDeckData
}

interface FlashcardSchedule {
  questionId: string
  interval: number
  easeFactor: number
  nextReview: string
  lastReview: string
  repetitions: number
}

const STORAGE_KEY = 'interview_flashcard_v1'

function loadSchedules(): Record<string, FlashcardSchedule> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveSchedules(schedules: Record<string, FlashcardSchedule>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules))
  } catch {
    // 忽略
  }
}

/** 计算 SM-2 排程 */
function computeSchedule(
  prev: FlashcardSchedule | undefined,
  rating: 'easy' | 'hard' | 'forgot',
): FlashcardSchedule {
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)
  const schedule: FlashcardSchedule = prev
    ? { ...prev }
    : { questionId: '', interval: 1, easeFactor: 2.5, nextReview: todayStr, lastReview: '', repetitions: 0 }

  if (rating === 'forgot') {
    schedule.interval = 1
    schedule.repetitions = 0
  } else {
    schedule.repetitions++
    if (rating === 'easy') {
      schedule.interval = Math.min(
        Math.round(schedule.interval * schedule.easeFactor * 1.3),
        90,
      )
      schedule.easeFactor = Math.min(schedule.easeFactor + 0.1, 3.0)
    } else {
      schedule.interval = Math.min(Math.round(schedule.interval * 1.5), 90)
      schedule.easeFactor = Math.max(schedule.easeFactor - 0.2, 1.3)
    }
  }

  const next = new Date(today.getTime() + schedule.interval * 86400000)
  schedule.nextReview = next.toISOString().slice(0, 10)
  schedule.lastReview = todayStr
  return schedule
}

export function FlashcardDeck({ data }: FlashcardDeckProps) {
  const questions = data?.questions ?? []
  const [flipped, setFlipped] = useState(false)
  const [pos, setPos] = useState(0)
  const [schedules, setSchedules] = useState<Record<string, FlashcardSchedule>>(() =>
    typeof window !== 'undefined' ? loadSchedules() : {},
  )
  const [rated, setRated] = useState(false)

  const current = questions[pos]

  if (!current) {
    return (
      <div className="rounded-sm border border-hairline bg-canvas-card p-xl text-center">
        <p className="text-body-md text-body-mid">暂无闪卡</p>
      </div>
    )
  }

  // 统计今日待复习
  const today = new Date().toISOString().slice(0, 10)
  const dueToday = questions.filter((q) => {
    const s = schedules[q.id]
    return !s || s.nextReview <= today
  }).length

  const handleRate = (rating: 'easy' | 'hard' | 'forgot') => {
    const newSchedule = computeSchedule(schedules[current.id], rating)
    newSchedule.questionId = current.id
    const newSchedules = { ...schedules, [current.id]: newSchedule }
    setSchedules(newSchedules)
    saveSchedules(newSchedules)
    setRated(true)

    setTimeout(() => {
      setFlipped(false)
      setRated(false)
      setPos((p) => (p + 1) % questions.length)
    }, 500)
  }

  const nextCard = () => {
    setFlipped(false)
    setRated(false)
    setPos((p) => (p + 1) % questions.length)
  }

  const prevCard = () => {
    setFlipped(false)
    setRated(false)
    setPos((p) => (p - 1 + questions.length) % questions.length)
  }

  const schedule = schedules[current.id]
  const isDue = !schedule || schedule.nextReview <= today

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 统计栏 */}
      <div className="mb-xl flex flex-wrap items-center justify-between gap-sm">
        <div className="flex gap-sm">
          <span className="rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid">
            卡片 {pos + 1} / {questions.length}
          </span>
          <span className={cn(
            'rounded-pill border px-md py-xs font-mono text-caption-mono-sm',
            dueToday > 0 ? 'border-accent-sunset/40 bg-accent-sunset/10 text-accent-sunset' : 'border-accent-dusk/40 bg-accent-dusk/10 text-accent-dusk',
          )}>
            今日待复习 {dueToday} 张
          </span>
        </div>
        {schedule && (
          <span className="font-mono text-caption-mono-sm text-body-mid">
            下次复习：{schedule.nextReview}（间隔 {schedule.interval} 天）
          </span>
        )}
      </div>

      {/* 闪卡区域 */}
      <div className="mb-xl" style={{ perspective: '1000px' }}>
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="relative w-full min-h-[260px] cursor-pointer"
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.5s', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* 正面：题目 */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-sm border border-hairline bg-canvas-soft p-2xl"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="mb-md flex items-center gap-sm">
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
              {isDue && <span className="rounded-pill bg-accent-sunset/20 px-xs py-xxs font-mono text-caption-mono-sm text-accent-sunset">待复习</span>}
            </div>
            <p className="text-center text-body-lg text-ink">{current.question}</p>
            <p className="mt-xl text-caption-mono-sm text-body-mid">点击翻转查看答案 →</p>
          </div>

          {/* 反面：答案 */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-2xl"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              核心答案
            </div>
            <p className="text-center text-body-md text-ink">{current.shortAnswer}</p>
            <div className="mt-lg w-full max-w-md">
              <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">回答要点</div>
              <ul className="space-y-xs">
                {current.keyPoints.slice(0, 3).map((point, i) => (
                  <li key={i} className="text-caption-mono-sm text-body-mid">• {point}</li>
                ))}
              </ul>
            </div>
          </div>
        </button>
      </div>

      {/* 评分按钮（翻转后显示） */}
      {flipped && (
        <div className={cn('mb-xl transition-opacity duration-300', rated ? 'opacity-50' : 'opacity-100')}>
          <div className="mb-sm text-center font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            回忆难度自评
          </div>
          <div className="flex gap-sm">
            <button
              type="button"
              onClick={() => handleRate('forgot')}
              disabled={rated}
              className="flex-1 rounded-pill border border-red-500/40 bg-red-500/10 px-md py-md text-body-sm text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-50"
            >
              🔴 遗忘
              <div className="mt-xs text-caption-mono-sm">重置间隔</div>
            </button>
            <button
              type="button"
              onClick={() => handleRate('hard')}
              disabled={rated}
              className="flex-1 rounded-pill border border-accent-sunset/40 bg-accent-sunset/10 px-md py-md text-body-sm text-accent-sunset transition-colors hover:bg-accent-sunset/20 disabled:opacity-50"
            >
              🟡 困难
              <div className="mt-xs text-caption-mono-sm">间隔 ×1.5</div>
            </button>
            <button
              type="button"
              onClick={() => handleRate('easy')}
              disabled={rated}
              className="flex-1 rounded-pill border border-accent-dusk/40 bg-accent-dusk/10 px-md py-md text-body-sm text-accent-dusk transition-colors hover:bg-accent-dusk/20 disabled:opacity-50"
            >
              🟢 简单
              <div className="mt-xs text-caption-mono-sm">间隔 ×EF×1.3</div>
            </button>
          </div>
        </div>
      )}

      {/* 导航 */}
      <div className="flex items-center justify-between">
        <button type="button" onClick={prevCard} className="btn-pill">◀ 上一张</button>
        <button type="button" onClick={() => setFlipped((f) => !f)} className="btn-pill">
          {flipped ? '收起' : '翻转'}
        </button>
        <button type="button" onClick={nextCard} className="btn-pill">下一张 ▶</button>
      </div>
    </div>
  )
}
