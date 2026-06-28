/**
 * SM-2 间隔重复算法
 *
 * 经典 SuperMemo 2 算法实现，用于学习卡片/知识点的复习调度。
 *
 * 核心思路：
 * - 根据用户对知识点的回忆质量（0-5 分）调整易度因子 eFactor
 * - eFactor 越高，下次复习间隔越长
 * - 答错（quality < 3）重置间隔为 1 天，重新学习
 *
 * @see https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method
 */

/** 用户回忆质量评分（0=完全不会，5=完美回忆） */
export type RecallQuality = 0 | 1 | 2 | 3 | 4 | 5

/** 单个知识点/卡片的复习状态 */
export interface CardState {
  /** 易度因子，初始 2.5，范围 [1.3, 2.5+] */
  eFactor: number
  /** 当前重复次数（首次学习为 0） */
  repetitions: number
  /** 当前间隔天数 */
  interval: number
  /** 上次复习时间戳（ms） */
  lastReviewedAt: number | null
  /** 下次应复习时间戳（ms） */
  nextReviewAt: number | null
}

/** 一天的毫秒数 */
const DAY_MS = 24 * 60 * 60 * 1000

/** 默认初始状态 */
export function createInitialCardState(): CardState {
  return {
    eFactor: 2.5,
    repetitions: 0,
    interval: 0,
    lastReviewedAt: null,
    nextReviewAt: null,
  }
}

/**
 * 根据复习质量计算下一次状态
 *
 * @param prev 前一次状态
 * @param quality 本次回忆质量 0-5
 * @param now 当前时间戳（ms），默认 Date.now()
 */
export function review(
  prev: CardState,
  quality: RecallQuality,
  now: number = Date.now(),
): CardState {
  // 更新 eFactor：q 越高 eFactor 越大，下限 1.3
  const newEF = Math.max(
    1.3,
    prev.eFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  )

  // 答错（quality < 3）：重置重复次数和间隔
  if (quality < 3) {
    return {
      eFactor: newEF,
      repetitions: 0,
      interval: 1,
      lastReviewedAt: now,
      nextReviewAt: now + 1 * DAY_MS,
    }
  }

  // 答对：按重复次数推进间隔
  const newRepetitions = prev.repetitions + 1
  let newInterval: number
  if (newRepetitions === 1) {
    newInterval = 1
  } else if (newRepetitions === 2) {
    newInterval = 6
  } else {
    newInterval = Math.round(prev.interval * newEF)
  }

  return {
    eFactor: newEF,
    repetitions: newRepetitions,
    interval: newInterval,
    lastReviewedAt: now,
    nextReviewAt: now + newInterval * DAY_MS,
  }
}

/**
 * 判断当前是否到期需要复习
 */
export function isDue(state: CardState, now: number = Date.now()): boolean {
  if (state.nextReviewAt === null) return false
  return now >= state.nextReviewAt
}

/**
 * 获取距离下次复习的天数（负数表示已过期）
 */
export function daysUntilReview(state: CardState, now: number = Date.now()): number | null {
  if (state.nextReviewAt === null) return null
  return Math.ceil((state.nextReviewAt - now) / DAY_MS)
}
