/**
 * 模块 09：React 进阶与生态体系 - 数据完整性测试
 *
 * 验证模块数据结构、知识点数量、可视化组件覆盖、断言沙盒检查项、
 * 面试题/小测题题量、速查表存在性等（对齐《模块标准自查文档》阈值）。
 */
import { describe, it, expect } from 'vitest'
import { reactAdvancedModule } from '../modules/react-advanced'
import { visualizationMeta, isVisualizationBlock } from '../lib/types'
import type {
  SandboxData,
  AccordionData,
  QuizData,
  VisualizationBlock,
  TableBlock,
} from '../lib/types'

describe('React 进阶模块', () => {
  it('模块元数据应正确', () => {
    expect(reactAdvancedModule.number).toBe('09')
    expect(reactAdvancedModule.title).toBe('React 进阶与生态体系')
    expect(reactAdvancedModule.slug).toBe('react-advanced')
    expect(reactAdvancedModule.stage).toBe('react')
    expect(reactAdvancedModule.icon).toBe('09')
  })

  it('模块元数据 knowledgePointCount/visualizationCount 应与实际一致', () => {
    expect(reactAdvancedModule.knowledgePointCount).toBe(21)
    expect(reactAdvancedModule.points).toHaveLength(21)
    const demoCount = reactAdvancedModule.points.flatMap((p) => p.blocks).filter((b) => b.type === 'demo').length
    expect(reactAdvancedModule.visualizationCount).toBe(demoCount)
  })

  it('知识点序号应从 1 到 21 连续', () => {
    const orders = reactAdvancedModule.points.map((p) => p.order)
    for (let i = 0; i < 21; i++) {
      expect(orders[i]).toBe(i + 1)
    }
  })

  it('每个知识点应有标题、难度和内容块', () => {
    reactAdvancedModule.points.forEach((p) => {
      expect(p.title).toBeTruthy()
      expect(p.order).toBeGreaterThan(0)
      expect(p.difficulty).toBeGreaterThanOrEqual(1)
      expect(p.difficulty).toBeLessThanOrEqual(5)
      expect(p.blocks).toBeDefined()
      expect(p.blocks.length).toBeGreaterThan(0)
    })
  })

  it('每个内容块应有 id 和 type', () => {
    reactAdvancedModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toBeTruthy()
        expect(b.type).toBeTruthy()
      })
    })
  })

  it('内容块 id 应在模块内唯一', () => {
    const ids = reactAdvancedModule.points.flatMap((p) =>
      p.blocks.map((b) => b.id),
    )
    expect(new Set(ids).size).toBe(ids.length)
  })

  // ---- A5: block id 命名规范（无 ra- 前缀）----
  it('内容块 id 应为 p{order}-{n} 规范格式（不含 ra- 等模块前缀）', () => {
    reactAdvancedModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toMatch(new RegExp(`^p${p.order}-\\d+$`))
      })
    })
  })

  it('可视化组件块应有有效的 visualizationType', () => {
    reactAdvancedModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          expect(b.visualizationType).toBeTruthy()
          expect(visualizationMeta[b.visualizationType]).toBeDefined()
          expect(b.data).toBeDefined()
        }
      })
    })
  })

  it('应使用多种可视化组件（≥8 种）', () => {
    const usedTypes = new Set<string>()
    reactAdvancedModule.points.forEach((p) => {
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

  it('知识点难度分布应合理（≥3 个不同等级）', () => {
    const difficulties = reactAdvancedModule.points.map((p) => p.difficulty)
    const min = Math.min(...difficulties)
    const max = Math.max(...difficulties)
    expect(min).toBeGreaterThanOrEqual(1)
    expect(max).toBeLessThanOrEqual(5)
    expect(new Set(difficulties).size).toBeGreaterThanOrEqual(3)
  })

  it('每个知识点应至少包含一个段落或标题块', () => {
    reactAdvancedModule.points.forEach((p) => {
      const hasTextContent = p.blocks.some(
        (b) => b.type === 'paragraph' || b.type === 'heading',
      )
      expect(hasTextContent).toBe(true)
    })
  })

  // ---- 维度 C/D：断言沙盒检查项 ----
  it('每个断言沙盒应配置 ≥5 条 checks，且每条含 description/pattern/hint', () => {
    const sandboxBlocks = reactAdvancedModule.points.flatMap((p) =>
      p.blocks.filter(
        (b): b is VisualizationBlock =>
          isVisualizationBlock(b) && b.visualizationType === 'sandbox',
      ),
    )
    expect(sandboxBlocks.length).toBeGreaterThanOrEqual(1)
    sandboxBlocks.forEach((b) => {
      const data = b.data as SandboxData
      expect(data.checks).toBeDefined()
      expect(data.checks!.length).toBeGreaterThanOrEqual(5)
      data.checks!.forEach((c) => {
        expect(c.description).toBeTruthy()
        expect(c.pattern).toBeTruthy()
        expect(c.hint).toBeTruthy()
        expect(() => new RegExp(c.pattern, c.flags ?? 'i')).not.toThrow()
      })
    })
  })

  // ---- 维度 B1/B4/B7：面试题题量、闪卡模式、答案排版样式 ----
  it('面试题应 ≥30 题，启用 flashcard 模式，含场景题与对比题，答案符合排版规范', () => {
    const interview = reactAdvancedModule.points.find(
      (p) => p.title === 'React 进阶面试题精选',
    )
    expect(interview).toBeDefined()
    const demo = interview!.blocks.find(isVisualizationBlock)!
    const data = demo.data as AccordionData
    expect(data.items.length).toBeGreaterThanOrEqual(30)
    expect(data.defaultMode).toBe('flashcard')
    const titles = data.items.map((i) => i.title)
    expect(titles.filter((t) => t.includes('场景题——')).length).toBeGreaterThanOrEqual(2)
    expect(titles.filter((t) => t.includes('对比题——')).length).toBeGreaterThanOrEqual(2)
    titles.forEach((t) => {
      expect(t).toMatch(/^Q\d+[:：]/)
      expect(t).not.toMatch(/【/)
    })
    data.items.forEach((i) => {
      expect(i.content).toBeTruthy()
      expect(i.content.length).toBeGreaterThan(20)
      expect(i.content.includes('\n\n')).toBe(true)
      const hasList = /^\s*(\d+\.|-)/m.test(i.content)
      expect(hasList).toBe(true)
    })
  })

  // ---- 维度 B2/B3：小测题题量与梯度标注 ----
  it('小测验应 ≥20 题，且题目含梯度标注', () => {
    const quiz = reactAdvancedModule.points.find(
      (p) => p.title === 'React 进阶小测验',
    )
    expect(quiz).toBeDefined()
    const demo = quiz!.blocks.find(isVisualizationBlock)!
    const data = demo.data as QuizData
    expect(data.questions.length).toBeGreaterThanOrEqual(20)
    const gradients = ['【记忆】', '【理解】', '【应用】', '【对比】', '【场景】', '【综合】']
    const labeled = data.questions.filter((q) =>
      gradients.some((g) => q.question.includes(g)),
    )
    expect(labeled.length).toBeGreaterThanOrEqual(data.questions.length * 0.8)
    data.questions.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(4)
      expect(q.correctIndex).toBeGreaterThanOrEqual(0)
      expect(q.correctIndex).toBeLessThan(q.options.length)
      expect(q.explanation).toBeTruthy()
    })
  })

  // ---- 维度 E1：知识点速查表 ----
  it('应包含知识点速查表（table 块，≥10 行）', () => {
    const cheatsheet = reactAdvancedModule.points.find(
      (p) => p.title === 'React 进阶速查表',
    )
    expect(cheatsheet).toBeDefined()
    const table = cheatsheet!.blocks.find(
      (b): b is TableBlock => b.type === 'table',
    )
    expect(table).toBeDefined()
    expect(table!.rows.length).toBeGreaterThanOrEqual(10)
  })

  // ---- 维度 D：综合实战沙盒存在 ----
  it('应包含至少 1 个综合实战沙盒', () => {
    const practiceTitles = reactAdvancedModule.points
      .filter((p) => p.title.includes('综合实战'))
      .map((p) => p.title)
    expect(practiceTitles.length).toBeGreaterThanOrEqual(1)
    expect(practiceTitles).toContain('综合实战：列表性能优化')
  })
})
