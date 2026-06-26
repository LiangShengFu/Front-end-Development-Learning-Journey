/**
 * 模块 01：HTML 基础 - 数据完整性测试
 *
 * 验证模块数据结构、知识点数量、可视化组件覆盖等。
 */
import { describe, it, expect } from 'vitest'
import { htmlFundamentalsModule } from '../modules/html-fundamentals'
import { visualizationMeta, isVisualizationBlock } from '../lib/types'

describe('HTML 基础模块', () => {
  it('模块元数据应正确', () => {
    expect(htmlFundamentalsModule.number).toBe('01')
    expect(htmlFundamentalsModule.title).toBe('HTML 基础')
    expect(htmlFundamentalsModule.slug).toBe('html-fundamentals')
    expect(htmlFundamentalsModule.stage).toBe('basics')
    expect(htmlFundamentalsModule.icon).toBe('01')
  })

  it('应包含 26 个知识点', () => {
    expect(htmlFundamentalsModule.points).toHaveLength(26)
  })

  it('知识点序号应从 1 到 26 连续', () => {
    const orders = htmlFundamentalsModule.points.map((p) => p.order)
    for (let i = 0; i < 26; i++) {
      expect(orders[i]).toBe(i + 1)
    }
  })

  it('每个知识点应有标题、难度和内容块', () => {
    htmlFundamentalsModule.points.forEach((p) => {
      expect(p.title).toBeTruthy()
      expect(p.order).toBeGreaterThan(0)
      expect(p.difficulty).toBeGreaterThanOrEqual(1)
      expect(p.difficulty).toBeLessThanOrEqual(5)
      expect(p.blocks).toBeDefined()
      expect(p.blocks.length).toBeGreaterThan(0)
    })
  })

  it('每个内容块应有 id 和 type', () => {
    htmlFundamentalsModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toBeTruthy()
        expect(b.type).toBeTruthy()
      })
    })
  })

  it('可视化组件块应有有效的 visualizationType', () => {
    htmlFundamentalsModule.points.forEach((p) => {
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
    htmlFundamentalsModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          usedTypes.add(b.visualizationType)
        }
      })
    })
    // 模块按内容需要配置可视化组件，应使用至少 8 种
    expect(usedTypes.size).toBeGreaterThanOrEqual(8)
    // 所有使用的 visualizationType 都应在 visualizationMeta 中注册
    usedTypes.forEach((type) => {
      expect(visualizationMeta[type as keyof typeof visualizationMeta]).toBeDefined()
    })
  })

  it('知识点难度分布应合理', () => {
    const difficulties = htmlFundamentalsModule.points.map((p) => p.difficulty)
    const min = Math.min(...difficulties)
    const max = Math.max(...difficulties)
    expect(min).toBeGreaterThanOrEqual(1)
    expect(max).toBeLessThanOrEqual(5)
    // 应包含至少 3 个不同难度等级
    expect(new Set(difficulties).size).toBeGreaterThanOrEqual(3)
  })

  it('内容块 id 应在模块内唯一', () => {
    const ids = htmlFundamentalsModule.points.flatMap((p) =>
      p.blocks.map((b) => b.id),
    )
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('每个知识点应至少包含一个段落或标题块', () => {
    htmlFundamentalsModule.points.forEach((p) => {
      const hasTextContent = p.blocks.some(
        (b) => b.type === 'paragraph' || b.type === 'heading',
      )
      expect(hasTextContent).toBe(true)
    })
  })
})
