/**
 * CSS 基础模块数据完整性测试
 */
import { describe, it, expect } from 'vitest'
import { cssFundamentalsModule } from '../modules/css-fundamentals'
import { visualizationMeta, isVisualizationBlock } from '../lib/types'

describe('CSS 基础模块', () => {
  it('模块元数据应正确', () => {
    expect(cssFundamentalsModule.number).toBe('02')
    expect(cssFundamentalsModule.title).toBe('CSS 基础与核心原理')
    expect(cssFundamentalsModule.slug).toBe('css-fundamentals')
    expect(cssFundamentalsModule.stage).toBe('basics')
    expect(cssFundamentalsModule.icon).toBe('02')
  })

  it('应包含 24 个知识点', () => {
    expect(cssFundamentalsModule.points).toHaveLength(24)
  })

  it('知识点序号应从 1 到 24 连续', () => {
    const orders = cssFundamentalsModule.points.map((p) => p.order)
    for (let i = 0; i < 24; i++) {
      expect(orders[i]).toBe(i + 1)
    }
  })

  it('每个知识点应有标题、难度和内容块', () => {
    cssFundamentalsModule.points.forEach((p) => {
      expect(p.title).toBeTruthy()
      expect(p.order).toBeGreaterThan(0)
      expect(p.difficulty).toBeGreaterThanOrEqual(1)
      expect(p.difficulty).toBeLessThanOrEqual(4)
      expect(p.blocks.length).toBeGreaterThan(0)
    })
  })

  it('每个内容块应有唯一 ID', () => {
    const ids = cssFundamentalsModule.points.flatMap((p) =>
      p.blocks.map((b) => b.id),
    )
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('可视化组件块应有有效的 visualizationType', () => {
    cssFundamentalsModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          expect(b.visualizationType).toBeTruthy()
          expect(visualizationMeta[b.visualizationType]).toBeDefined()
          expect(b.data).toBeDefined()
        }
      })
    })
  })

  it('应使用多种可视化组件', () => {
    const usedTypes = new Set<string>()
    cssFundamentalsModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          usedTypes.add(b.visualizationType)
        }
      })
    })
    expect(usedTypes.size).toBeGreaterThanOrEqual(8)
    usedTypes.forEach((type) => {
      expect(visualizationMeta[type as keyof typeof visualizationMeta]).toBeDefined()
    })
  })

  it('应包含测验知识点', () => {
    const quizPoint = cssFundamentalsModule.points.find(
      (p) => p.visualizationType === 'quiz',
    )
    expect(quizPoint).toBeDefined()
  })

  it('应包含技能条知识点', () => {
    const skillPoint = cssFundamentalsModule.points.find(
      (p) => p.visualizationType === 'skillbar',
    )
    expect(skillPoint).toBeDefined()
  })

  it('难度分布应合理', () => {
    const difficulties = cssFundamentalsModule.points.map((p) => p.difficulty)
    const hasEasy = difficulties.some((d) => d <= 2)
    const hasHard = difficulties.some((d) => d >= 3)
    expect(hasEasy).toBe(true)
    expect(hasHard).toBe(true)
  })
})
