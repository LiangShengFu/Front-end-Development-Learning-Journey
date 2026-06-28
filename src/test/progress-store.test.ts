/**
 * 学习进度 Store 测试
 *
 * 验证 zustand persist store 的核心行为：
 * - 访问/完成/收藏/复习操作
 * - 条目自动创建
 * - 模块进度计算
 * - 到期卡片查询
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { useProgressStore, pointId } from '../lib/progress-store'

/** 重置 store 并清空 localStorage */
function resetStore() {
  useProgressStore.setState({ points: {}, bookmarks: [] })
  localStorage.removeItem('fe-journey-progress')
}

describe('progress-store', () => {
  beforeEach(() => {
    resetStore()
  })

  describe('toggleComplete', () => {
    it('首次标记完成时自动创建条目', () => {
      const { toggleComplete, getPoint } = useProgressStore.getState()
      toggleComplete('html-fundamentals', 1)
      const point = getPoint('html-fundamentals', 1)
      expect(point).toBeDefined()
      expect(point?.completed).toBe(true)
      expect(point?.completedAt).not.toBeNull()
    })

    it('再次点击取消完成', () => {
      const { toggleComplete, getPoint } = useProgressStore.getState()
      toggleComplete('html-fundamentals', 1)
      toggleComplete('html-fundamentals', 1)
      const point = getPoint('html-fundamentals', 1)
      expect(point?.completed).toBe(false)
      expect(point?.completedAt).toBeNull()
    })
  })

  describe('toggleBookmark', () => {
    it('添加收藏', () => {
      const { toggleBookmark, isBookmarked } = useProgressStore.getState()
      toggleBookmark('html-fundamentals', 1)
      expect(isBookmarked('html-fundamentals', 1)).toBe(true)
    })

    it('取消收藏', () => {
      const { toggleBookmark, isBookmarked } = useProgressStore.getState()
      toggleBookmark('html-fundamentals', 1)
      toggleBookmark('html-fundamentals', 1)
      expect(isBookmarked('html-fundamentals', 1)).toBe(false)
    })
  })

  describe('review', () => {
    it('首次复习自动创建条目并更新卡片', () => {
      const { review, getPoint } = useProgressStore.getState()
      review('css-fundamentals', 5, 5)
      const point = getPoint('css-fundamentals', 5)
      expect(point).toBeDefined()
      expect(point?.card.repetitions).toBe(1)
      expect(point?.card.interval).toBe(1)
      expect(point?.card.eFactor).toBeGreaterThan(2.5)
    })

    it('连续复习推进间隔', () => {
      const { review, getPoint } = useProgressStore.getState()
      // 第一次复习：repetitions 0 -> 1，interval = 1
      review('css-fundamentals', 1, 5)
      // 第二次复习：repetitions 1 -> 2，interval = 6
      useProgressStore.getState().review('css-fundamentals', 1, 5)
      const point = getPoint('css-fundamentals', 1)
      expect(point?.card.repetitions).toBe(2)
      expect(point?.card.interval).toBe(6)
    })
  })

  describe('getModuleProgress', () => {
    it('无进度时返回 0', () => {
      const { getModuleProgress } = useProgressStore.getState()
      expect(getModuleProgress('html-fundamentals', 24)).toBe(0)
    })

    it('完成 2/4 返回 0.5', () => {
      const { toggleComplete, getModuleProgress } = useProgressStore.getState()
      toggleComplete('html-fundamentals', 1)
      toggleComplete('html-fundamentals', 2)
      expect(getModuleProgress('html-fundamentals', 4)).toBe(0.5)
    })

    it('totalPoints=0 返回 0', () => {
      const { getModuleProgress } = useProgressStore.getState()
      expect(getModuleProgress('html-fundamentals', 0)).toBe(0)
    })
  })

  describe('getDueCards', () => {
    it('无卡片时返回空数组', () => {
      const { getDueCards } = useProgressStore.getState()
      expect(getDueCards()).toEqual([])
    })

    it('返回到期的卡片', () => {
      const { review, getDueCards } = useProgressStore.getState()
      // 正常复习一次
      review('html-fundamentals', 1, 5)
      // 手动将下次复习时间改为过去，使卡片立即到期
      const state = useProgressStore.getState()
      const id = pointId('html-fundamentals', 1)
      useProgressStore.setState({
        points: {
          ...state.points,
          [id]: {
            ...state.points[id],
            card: {
              ...state.points[id].card,
              nextReviewAt: Date.now() - 1000,
            },
          },
        },
      })
      const due = getDueCards()
      expect(due).toHaveLength(1)
      expect(due[0].moduleSlug).toBe('html-fundamentals')
    })
  })

  describe('pointId', () => {
    it('拼接模块 slug 与序号', () => {
      expect(pointId('html-fundamentals', 1)).toBe('html-fundamentals:1')
      expect(pointId('css-fundamentals', 10)).toBe('css-fundamentals:10')
    })
  })

  describe('reset', () => {
    it('清空所有进度', () => {
      const { toggleComplete, toggleBookmark, reset, getPoint, isBookmarked } =
        useProgressStore.getState()
      toggleComplete('html-fundamentals', 1)
      toggleBookmark('html-fundamentals', 2)
      reset()
      expect(getPoint('html-fundamentals', 1)).toBeUndefined()
      expect(isBookmarked('html-fundamentals', 2)).toBe(false)
    })
  })
})
