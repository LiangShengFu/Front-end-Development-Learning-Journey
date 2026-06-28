/**
 * 模块 10：Next.js 与 SSR/SSG 全栈 - 数据完整性测试
 *
 * 验证模块数据结构、知识点数量、可视化组件覆盖、断言沙盒检查项、
 * 面试题/小测题题量、速查表存在性等（对齐《模块标准自查文档》阈值）。
 */
import { describe, it, expect } from 'vitest'
import { nextjsSsrModule } from '../modules/nextjs-ssr'
import { visualizationMeta, isVisualizationBlock } from '../lib/types'
import type {
  SandboxData,
  AccordionData,
  QuizData,
  VisualizationBlock,
  TableBlock,
} from '../lib/types'

describe('Next.js 与 SSR/SSG 全栈模块', () => {
  it('模块元数据应正确', () => {
    expect(nextjsSsrModule.number).toBe('10')
    expect(nextjsSsrModule.title).toBe('Next.js 与 SSR/SSG 全栈')
    expect(nextjsSsrModule.slug).toBe('nextjs-ssr')
    expect(nextjsSsrModule.stage).toBe('react')
    expect(nextjsSsrModule.icon).toBe('10')
  })

  it('模块元数据 knowledgePointCount 应与实际知识点数量一致（19）', () => {
    expect(nextjsSsrModule.knowledgePointCount).toBe(19)
    expect(nextjsSsrModule.points).toHaveLength(19)
  })

  it('知识点序号应从 1 到 19 连续', () => {
    const orders = nextjsSsrModule.points.map((p) => p.order)
    for (let i = 0; i < 19; i++) {
      expect(orders[i]).toBe(i + 1)
    }
  })

  it('每个知识点应有标题、难度和内容块', () => {
    nextjsSsrModule.points.forEach((p) => {
      expect(p.title).toBeTruthy()
      expect(p.order).toBeGreaterThan(0)
      expect(p.difficulty).toBeGreaterThanOrEqual(1)
      expect(p.difficulty).toBeLessThanOrEqual(5)
      expect(p.blocks).toBeDefined()
      expect(p.blocks.length).toBeGreaterThan(0)
    })
  })

  it('每个内容块应有 id 和 type', () => {
    nextjsSsrModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toBeTruthy()
        expect(b.type).toBeTruthy()
      })
    })
  })

  it('内容块 id 应在模块内唯一', () => {
    const ids = nextjsSsrModule.points.flatMap((p) => p.blocks.map((b) => b.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('内容块 id 应符合 p{order}-{n} 命名规范', () => {
    nextjsSsrModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toMatch(new RegExp(`^p${p.order}-\\d+$`))
      })
    })
  })

  it('可视化组件块应有有效的 visualizationType', () => {
    nextjsSsrModule.points.forEach((p) => {
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
    nextjsSsrModule.points.forEach((p) => {
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
    const difficulties = nextjsSsrModule.points.map((p) => p.difficulty)
    const min = Math.min(...difficulties)
    const max = Math.max(...difficulties)
    expect(min).toBeGreaterThanOrEqual(1)
    expect(max).toBeLessThanOrEqual(5)
    expect(new Set(difficulties).size).toBeGreaterThanOrEqual(3)
  })

  it('进阶内容（difficulty 4-5）占比应 ≤ 30%', () => {
    const advanced = nextjsSsrModule.points.filter(
      (p) => p.difficulty >= 4,
    ).length
    expect(advanced / nextjsSsrModule.points.length).toBeLessThanOrEqual(0.3)
  })

  it('每个知识点应至少包含一个段落或标题块', () => {
    nextjsSsrModule.points.forEach((p) => {
      const hasTextContent = p.blocks.some(
        (b) => b.type === 'paragraph' || b.type === 'heading',
      )
      expect(hasTextContent).toBe(true)
    })
  })

  // ---- 维度 C/D：断言沙盒检查项 ----
  it('每个断言沙盒应配置 ≥5 条 checks，且每条含 description/pattern/hint', () => {
    const sandboxBlocks = nextjsSsrModule.points.flatMap((p) =>
      p.blocks.filter(
        (b): b is VisualizationBlock =>
          isVisualizationBlock(b) && b.visualizationType === 'sandbox',
      ),
    )
    // 模块应至少含 1 个带 checks 的实战沙盒
    expect(sandboxBlocks.length).toBeGreaterThanOrEqual(1)
    sandboxBlocks.forEach((b) => {
      const data = b.data as SandboxData
      expect(data.checks).toBeDefined()
      expect(data.checks!.length).toBeGreaterThanOrEqual(5)
      data.checks!.forEach((c) => {
        expect(c.description).toBeTruthy()
        expect(c.pattern).toBeTruthy()
        expect(c.hint).toBeTruthy()
        // pattern 必须是合法正则
        expect(() => new RegExp(c.pattern, c.flags ?? 'i')).not.toThrow()
      })
    })
  })

  // ---- 维度 B1/B4/B5/B7/F10：面试题题量、闪卡模式、答案排版样式 ----
  it('面试题应 ≥30 题，启用 flashcard 模式，含场景题与对比题，答案符合排版规范', () => {
    const interview = nextjsSsrModule.points.find(
      (p) => p.title === 'Next.js 全栈面试题精选',
    )
    expect(interview).toBeDefined()
    const demo = interview!.blocks.find(isVisualizationBlock)!
    const data = demo.data as AccordionData
    expect(data.items.length).toBeGreaterThanOrEqual(30)
    expect(data.defaultMode).toBe('flashcard')
    const titles = data.items.map((i) => i.title)
    // 标题用「场景题——」「对比题——」前缀标注（对齐模块 1-7 样式，不用【】梯度标注）
    expect(titles.filter((t) => t.includes('场景题——')).length).toBeGreaterThanOrEqual(2)
    expect(titles.filter((t) => t.includes('对比题——')).length).toBeGreaterThanOrEqual(2)
    // 标题格式为 Q{n}: ...（面试题不带【】梯度标注，梯度标注仅用于小测题）
    titles.forEach((t) => {
      expect(t).toMatch(/^Q\d+[:：]/)
      expect(t).not.toMatch(/【/)
    })
    // 答案排版规范：用 \n\n 分段、含编号或项目符号列表、非单段长文
    data.items.forEach((i) => {
      expect(i.content).toBeTruthy()
      expect(i.content.length).toBeGreaterThan(20)
      // 答案须分段（含至少一个空行分隔），不能是单段长文
      expect(i.content.includes('\n\n')).toBe(true)
      // 答案须含列表结构（编号 1. 或项目符号 - ）
      const hasList = /^\s*(\d+\.|-)/m.test(i.content)
      expect(hasList).toBe(true)
    })
  })

  // ---- 维度 B2/B3：小测题题量与梯度标注 ----
  it('小测验应 ≥20 题，且题目含梯度标注（记忆/理解/应用/对比/场景/综合）', () => {
    const quiz = nextjsSsrModule.points.find(
      (p) => p.title === '全栈框架小测验',
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
    // 每题 4 选项 + 正确索引有效 + 解析非空
    data.questions.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(4)
      expect(q.correctIndex).toBeGreaterThanOrEqual(0)
      expect(q.correctIndex).toBeLessThan(q.options.length)
      expect(q.explanation).toBeTruthy()
    })
  })

  // ---- 维度 E1：知识点速查表 ----
  it('应包含知识点速查表（table 块，≥10 行）', () => {
    const cheatsheet = nextjsSsrModule.points.find(
      (p) => p.title === 'Next.js 全栈速查表',
    )
    expect(cheatsheet).toBeDefined()
    const table = cheatsheet!.blocks.find(
      (b): b is TableBlock => b.type === 'table',
    )
    expect(table).toBeDefined()
    // table 块结构由类型约束，这里断言行数
    expect(table!.rows.length).toBeGreaterThanOrEqual(10)
  })

  // ---- 维度 D：综合实战沙盒存在 ----
  it('应包含至少 1 个综合实战沙盒（Server Action 表单提交）', () => {
    const practiceTitles = nextjsSsrModule.points
      .filter((p) => p.title.includes('综合实战'))
      .map((p) => p.title)
    expect(practiceTitles.length).toBeGreaterThanOrEqual(1)
    expect(practiceTitles).toContain('综合实战：Server Action 表单提交')
    // 实战沙盒应有 callout 说明练习价值
    const practice = nextjsSsrModule.points.find(
      (p) => p.title === '综合实战：Server Action 表单提交',
    )
    const hasCallout = practice!.blocks.some((b) => b.type === 'callout')
    expect(hasCallout).toBe(true)
  })
})
