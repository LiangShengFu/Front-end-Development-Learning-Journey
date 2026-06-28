/**
 * 学习进度持久化 Store
 *
 * 基于 zustand + persist 中间件，使用 SM-2 间隔重复算法调度复习。
 *
 * 三类状态：
 * - 知识点访问记录：访问时间、是否完成
 * - SM-2 复习卡片：每个知识点一张卡片，按到期时间排序
 * - 收藏：知识点书签
 *
 * 持久化到 localStorage，键名 "fe-journey-progress"
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  createInitialCardState,
  review as sm2Review,
  isDue,
  type CardState,
  type RecallQuality,
} from './spaced-repetition'

/** 知识点唯一标识 = `${moduleSlug}:${pointOrder}` */
export type KnowledgePointId = string

/** 单个知识点的访问/学习状态 */
export interface PointProgress {
  /** 模块 slug */
  moduleSlug: string
  /** 知识点序号 */
  pointOrder: number
  /** 访问次数 */
  visits: number
  /** 首次访问时间 */
  firstVisitedAt: number
  /** 最近访问时间 */
  lastVisitedAt: number
  /** 是否完成（用户主动标记） */
  completed: boolean
  /** 完成时间 */
  completedAt: number | null
  /** SM-2 复习卡片状态 */
  card: CardState
}

/** 学习进度 Store 状态 */
interface ProgressState {
  /** 知识点进度映射 */
  points: Record<KnowledgePointId, PointProgress>
  /** 收藏的知识点 ID 集合 */
  bookmarks: KnowledgePointId[]

  /** 标记访问知识点（进入页面时调用） */
  visitPoint: (moduleSlug: string, pointOrder: number) => void
  /** 标记完成/未完成 */
  toggleComplete: (moduleSlug: string, pointOrder: number) => void
  /** 提交复习质量评分，更新 SM-2 状态 */
  review: (moduleSlug: string, pointOrder: number, quality: RecallQuality) => void
  /** 切换收藏 */
  toggleBookmark: (moduleSlug: string, pointOrder: number) => void
  /** 重置所有进度（危险操作，需确认） */
  reset: () => void

  /** 获取单个知识点进度 */
  getPoint: (moduleSlug: string, pointOrder: number) => PointProgress | undefined
  /** 模块完成度 */
  getModuleProgress: (moduleSlug: string, totalPoints: number) => number
  /** 获取所有到期需复习的卡片 */
  getDueCards: () => PointProgress[]
  /** 是否收藏 */
  isBookmarked: (moduleSlug: string, pointOrder: number) => boolean
}

/** 拼接知识点 ID */
export function pointId(moduleSlug: string, pointOrder: number): string {
  return `${moduleSlug}:${pointOrder}`
}

const now = () => Date.now()

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      points: {},
      bookmarks: [],

      visitPoint: (moduleSlug, pointOrder) => {
        const id = pointId(moduleSlug, pointOrder)
        const nowTs = now()
        set((state) => {
          const existing = state.points[id]
          if (existing) {
            return {
              points: {
                ...state.points,
                [id]: {
                  ...existing,
                  visits: existing.visits + 1,
                  lastVisitedAt: nowTs,
                },
              },
            }
          }
          // 新建：首次访问即创建 SM-2 卡片
          const progress: PointProgress = {
            moduleSlug,
            pointOrder,
            visits: 1,
            firstVisitedAt: nowTs,
            lastVisitedAt: nowTs,
            completed: false,
            completedAt: null,
            card: createInitialCardState(),
          }
          return { points: { ...state.points, [id]: progress } }
        })
      },

      toggleComplete: (moduleSlug, pointOrder) => {
        const id = pointId(moduleSlug, pointOrder)
        set((state) => {
          const existing = state.points[id]
          // 若条目不存在，先创建（首次交互即建立进度记录）
          const base =
            existing ?? {
              moduleSlug,
              pointOrder,
              visits: 0,
              firstVisitedAt: now(),
              lastVisitedAt: now(),
              completed: false,
              completedAt: null,
              card: createInitialCardState(),
            }
          const completed = !base.completed
          return {
            points: {
              ...state.points,
              [id]: {
                ...base,
                completed,
                completedAt: completed ? now() : null,
              },
            },
          }
        })
      },

      review: (moduleSlug, pointOrder, quality) => {
        const id = pointId(moduleSlug, pointOrder)
        set((state) => {
          const existing = state.points[id]
          const base =
            existing ?? {
              moduleSlug,
              pointOrder,
              visits: 0,
              firstVisitedAt: now(),
              lastVisitedAt: now(),
              completed: false,
              completedAt: null,
              card: createInitialCardState(),
            }
          const newCard = sm2Review(base.card, quality)
          return {
            points: {
              ...state.points,
              [id]: { ...base, card: newCard },
            },
          }
        })
      },

      toggleBookmark: (moduleSlug, pointOrder) => {
        const id = pointId(moduleSlug, pointOrder)
        set((state) => {
          const isMarked = state.bookmarks.includes(id)
          return {
            bookmarks: isMarked
              ? state.bookmarks.filter((b) => b !== id)
              : [...state.bookmarks, id],
          }
        })
      },

      reset: () => {
        set({ points: {}, bookmarks: [] })
      },

      getPoint: (moduleSlug, pointOrder) => {
        const id = pointId(moduleSlug, pointOrder)
        return get().points[id]
      },

      getModuleProgress: (moduleSlug, totalPoints) => {
        const all = get().points
        const modulePoints = Object.values(all).filter((p) => p.moduleSlug === moduleSlug)
        const completed = modulePoints.filter((p) => p.completed).length
        return totalPoints > 0 ? completed / totalPoints : 0
      },

      getDueCards: () => {
        const all = get().points
        return Object.values(all)
          .filter((p) => isDue(p.card))
          .sort((a, b) => (a.card.nextReviewAt ?? 0) - (b.card.nextReviewAt ?? 0))
      },

      isBookmarked: (moduleSlug, pointOrder) => {
        const id = pointId(moduleSlug, pointOrder)
        return get().bookmarks.includes(id)
      },
    }),
    {
      name: 'fe-journey-progress',
      version: 1,
    },
  ),
)
