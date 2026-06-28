/**
 * SM-2 间隔重复算法测试
 *
 * 验证 eFactor 调整、间隔推进、答错重置、到期判断。
 */
import { describe, it, expect } from 'vitest'
import {
  createInitialCardState,
  review,
  isDue,
  daysUntilReview,
} from '../lib/spaced-repetition'

const DAY_MS = 24 * 60 * 60 * 1000

describe('createInitialCardState', () => {
  it('初始 eFactor 为 2.5', () => {
    expect(createInitialCardState().eFactor).toBe(2.5)
  })

  it('初始 repetitions 为 0', () => {
    expect(createInitialCardState().repetitions).toBe(0)
  })

  it('初始 nextReviewAt 为 null（未学习）', () => {
    expect(createInitialCardState().nextReviewAt).toBeNull()
  })
})

describe('review - 首次复习', () => {
  it('quality=5（完美）：repetitions=1, interval=1, eFactor 上升', () => {
    const initial = createInitialCardState()
    const result = review(initial, 5, 0)
    expect(result.repetitions).toBe(1)
    expect(result.interval).toBe(1)
    expect(result.eFactor).toBeGreaterThan(2.5)
    expect(result.nextReviewAt).toBe(DAY_MS)
  })

  it('quality=3（勉强）：repetitions=1, interval=1', () => {
    const initial = createInitialCardState()
    const result = review(initial, 3, 0)
    expect(result.repetitions).toBe(1)
    expect(result.interval).toBe(1)
  })

  it('quality=5 后 nextReviewAt = now + 1 天', () => {
    const initial = createInitialCardState()
    const now = 1000000
    const result = review(initial, 5, now)
    expect(result.lastReviewedAt).toBe(now)
    expect(result.nextReviewAt).toBe(now + DAY_MS)
  })
})

describe('review - 第二次复习', () => {
  it('quality=5 连续两次：第二次 interval=6', () => {
    const initial = createInitialCardState()
    const first = review(initial, 5, 0)
    const second = review(first, 5, DAY_MS)
    expect(second.repetitions).toBe(2)
    expect(second.interval).toBe(6)
  })
})

describe('review - 第三次及以后', () => {
  it('第三次 interval = prev.interval * newEF', () => {
    const initial = createInitialCardState()
    const first = review(initial, 5, 0)
    const second = review(first, 5, DAY_MS)
    const third = review(second, 5, 2 * DAY_MS)
    expect(third.repetitions).toBe(3)
    // SM-2: 第三次 interval = prev.interval * newEF（第三次复习后的 eFactor）
    expect(third.interval).toBe(Math.round(6 * third.eFactor))
  })
})

describe('review - 答错重置', () => {
  it('quality=2（答错）：repetitions=0, interval=1', () => {
    const initial = createInitialCardState()
    const first = review(initial, 5, 0)
    const second = review(first, 5, DAY_MS)
    const wrong = review(second, 2, 7 * DAY_MS)
    expect(wrong.repetitions).toBe(0)
    expect(wrong.interval).toBe(1)
    expect(wrong.nextReviewAt).toBe(7 * DAY_MS + DAY_MS)
  })

  it('quality=0（完全不会）：同样重置', () => {
    const initial = createInitialCardState()
    const first = review(initial, 5, 0)
    const wrong = review(first, 0, DAY_MS)
    expect(wrong.repetitions).toBe(0)
    expect(wrong.interval).toBe(1)
  })
})

describe('review - eFactor 下限', () => {
  it('连续答错 eFactor 不低于 1.3', () => {
    let state = createInitialCardState()
    // 连续 5 次答错
    for (let i = 0; i < 5; i++) {
      state = review(state, 0, i * DAY_MS)
    }
    expect(state.eFactor).toBeGreaterThanOrEqual(1.3)
  })
})

describe('isDue', () => {
  it('未学习的卡片（nextReviewAt=null）不需要复习', () => {
    const state = createInitialCardState()
    expect(isDue(state, 0)).toBe(false)
  })

  it('到期时间已过 -> true', () => {
    const initial = createInitialCardState()
    const reviewed = review(initial, 5, 0)
    expect(isDue(reviewed, DAY_MS + 1)).toBe(true)
  })

  it('到期时间未到 -> false', () => {
    const initial = createInitialCardState()
    const reviewed = review(initial, 5, 0)
    expect(isDue(reviewed, DAY_MS - 1)).toBe(false)
  })

  it('恰好到期 -> true', () => {
    const initial = createInitialCardState()
    const reviewed = review(initial, 5, 0)
    expect(isDue(reviewed, DAY_MS)).toBe(true)
  })
})

describe('daysUntilReview', () => {
  it('未学习的卡片返回 null', () => {
    const state = createInitialCardState()
    expect(daysUntilReview(state, 0)).toBeNull()
  })

  it('到期时间在未来 -> 正数天数', () => {
    const initial = createInitialCardState()
    const reviewed = review(initial, 5, 0)
    expect(daysUntilReview(reviewed, 0)).toBe(1)
  })

  it('已过期 -> 负数', () => {
    const initial = createInitialCardState()
    const reviewed = review(initial, 5, 0)
    expect(daysUntilReview(reviewed, 2 * DAY_MS)).toBeLessThan(0)
  })
})

describe('review - eFactor 趋势', () => {
  it('高质量评分使 eFactor 上升', () => {
    const initial = createInitialCardState()
    const result = review(initial, 5, 0)
    expect(result.eFactor).toBeGreaterThan(initial.eFactor)
  })

  it('低质量评分使 eFactor 下降', () => {
    const initial = createInitialCardState()
    // 先学习一次
    const first = review(initial, 5, 0)
    // 然后答错
    const wrong = review(first, 2, DAY_MS)
    expect(wrong.eFactor).toBeLessThan(first.eFactor)
  })
})
