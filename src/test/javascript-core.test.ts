/**
 * 模块 03：JavaScript 核心语法 - 数据完整性测试
 *
 * 验证模块数据结构、知识点数量、可视化组件覆盖，
 * 并校验模块标准自查文档中"以测促学 / 动态反馈闭环 / 任务导向"等关键检查项。
 */
import { describe, it, expect } from 'vitest'
import { javascriptCoreModule } from '../modules/javascript-core'
import {
  visualizationMeta,
  isVisualizationBlock,
  type AccordionData,
  type QuizData,
  type SandboxData,
  type TableBlock,
} from '../lib/types'

describe('JavaScript 核心语法模块', () => {
  it('模块元数据应正确', () => {
    expect(javascriptCoreModule.number).toBe('03')
    expect(javascriptCoreModule.title).toBe('JavaScript 核心语法')
    expect(javascriptCoreModule.slug).toBe('javascript-core')
    expect(javascriptCoreModule.stage).toBe('basics')
    expect(javascriptCoreModule.icon).toBe('03')
  })

  it('应包含 21 个知识点', () => {
    expect(javascriptCoreModule.points).toHaveLength(21)
  })

  it('知识点序号应从 1 到 21 连续', () => {
    const orders = javascriptCoreModule.points.map((p) => p.order)
    for (let i = 0; i < 21; i++) {
      expect(orders[i]).toBe(i + 1)
    }
  })

  it('每个知识点应有标题、难度和内容块', () => {
    javascriptCoreModule.points.forEach((p) => {
      expect(p.title).toBeTruthy()
      expect(p.order).toBeGreaterThan(0)
      expect(p.difficulty).toBeGreaterThanOrEqual(1)
      expect(p.difficulty).toBeLessThanOrEqual(5)
      expect(p.blocks).toBeDefined()
      expect(p.blocks.length).toBeGreaterThan(0)
    })
  })

  it('每个内容块应有 id 和 type', () => {
    javascriptCoreModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toBeTruthy()
        expect(b.type).toBeTruthy()
      })
    })
  })

  it('内容块 id 应在模块内唯一', () => {
    const ids = javascriptCoreModule.points.flatMap((p) =>
      p.blocks.map((b) => b.id),
    )
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('可视化组件块应有有效的 visualizationType 并在 visualizationMeta 登记', () => {
    javascriptCoreModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          expect(b.visualizationType).toBeTruthy()
          expect(visualizationMeta[b.visualizationType]).toBeDefined()
          expect(b.data).toBeDefined()
        }
      })
    })
  })

  it('应使用至少 8 种可视化组件', () => {
    const usedTypes = new Set<string>()
    javascriptCoreModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          usedTypes.add(b.visualizationType)
        }
      })
    })
    expect(usedTypes.size).toBeGreaterThanOrEqual(8)
    usedTypes.forEach((type) => {
      expect(
        visualizationMeta[type as keyof typeof visualizationMeta],
      ).toBeDefined()
    })
  })

  it('知识点难度分布应合理（含易题与难题）', () => {
    const difficulties = javascriptCoreModule.points.map((p) => p.difficulty)
    expect(Math.min(...difficulties)).toBeGreaterThanOrEqual(1)
    expect(Math.max(...difficulties)).toBeLessThanOrEqual(5)
    expect(new Set(difficulties).size).toBeGreaterThanOrEqual(3)
  })

  it('每个知识点应至少包含一个段落或标题块', () => {
    javascriptCoreModule.points.forEach((p) => {
      const hasTextContent = p.blocks.some(
        (b) => b.type === 'paragraph' || b.type === 'heading',
      )
      expect(hasTextContent).toBe(true)
    })
  })

  // ---- 模块标准自查文档：评估环节有效性（以测促学） ----

  it('应包含小测验知识点且题目数 ≥ 10', () => {
    const quizPoint = javascriptCoreModule.points.find(
      (p) => p.visualizationType === 'quiz',
    )
    expect(quizPoint).toBeDefined()
    const demo = quizPoint!.blocks.find((b) => b.type === 'demo')
    expect(demo).toBeDefined()
    const data = demo!.data as QuizData
    expect(data.questions.length).toBeGreaterThanOrEqual(10)
    // 每题需有梯度标注（【记忆】【理解】【应用】等）
    data.questions.forEach((q) => {
      expect(q.question).toMatch(/^【.+】/)
      expect(q.options.length).toBeGreaterThanOrEqual(2)
      expect(q.correctIndex).toBeGreaterThanOrEqual(0)
      expect(q.correctIndex).toBeLessThan(q.options.length)
      expect(q.explanation).toBeTruthy()
    })
  })

  it('应包含面试题知识点且题数 ≥ 12（含场景题 / 对比题）', () => {
    const accordionPoint = javascriptCoreModule.points.find(
      (p) => p.visualizationType === 'accordion',
    )
    expect(accordionPoint).toBeDefined()
    const demo = accordionPoint!.blocks.find((b) => b.type === 'demo')
    expect(demo).toBeDefined()
    const data = demo!.data as AccordionData
    expect(data.items.length).toBeGreaterThanOrEqual(12)
    const titles = data.items.map((i) => i.title).join('\n')
    expect(titles).toMatch(/场景题/)
    expect(titles).toMatch(/对比题/)
  })

  it('应包含知识点速查表（table 类型）', () => {
    const tablePoint = javascriptCoreModule.points.find((p) =>
      p.blocks.some((b) => b.type === 'table'),
    )
    expect(tablePoint).toBeDefined()
    const tableBlock = tablePoint!.blocks.find(
      (b) => b.type === 'table',
    ) as TableBlock | undefined
    expect(tableBlock).toBeDefined()
    // 表头与每行单元格数量一致
    const headers = tableBlock!.headers
    const rows = tableBlock!.rows
    expect(headers.length).toBeGreaterThan(0)
    expect(rows.length).toBeGreaterThanOrEqual(8)
    rows.forEach((row) => {
      expect(row.length).toBe(headers.length)
    })
  })

  // ---- 模块标准自查文档：动态反馈闭环（沙盒断言）+ 任务导向（综合实战） ----

  it('应至少包含 2 个带 checks 断言的综合实战沙盒', () => {
    const sandboxPoints = javascriptCoreModule.points.filter(
      (p) => p.visualizationType === 'sandbox',
    )
    // 仅考察配置了 checks 断言的"综合实战"沙盒（区别于纯演示沙盒）
    const practiceSandboxes = sandboxPoints.filter((p) => {
      const demo = p.blocks.find((b) => b.type === 'demo')
      return demo && (demo.data as SandboxData).checks
    })
    expect(practiceSandboxes.length).toBeGreaterThanOrEqual(2)
    practiceSandboxes.forEach((p) => {
      const demo = p.blocks.find((b) => b.type === 'demo')
      const data = demo!.data as SandboxData
      // 沙盒必须提供初始骨架代码
      expect(data.initialCode).toBeTruthy()
      expect(data.language).toBe('js')
      // 沙盒必须配置 checks 断言（≥ 5 项）形成动态反馈闭环
      expect(data.checks).toBeDefined()
      expect(data.checks!.length).toBeGreaterThanOrEqual(5)
      data.checks!.forEach((c) => {
        expect(c.description).toBeTruthy()
        expect(c.pattern).toBeTruthy()
        expect(c.hint).toBeTruthy()
      })
      // 实战项目前后应有 callout 说明（练习价值 / 反思）
      const hasCallout = p.blocks.some((b) => b.type === 'callout')
      expect(hasCallout).toBe(true)
    })
  })

  it('综合实战沙盒的初始骨架应含 TODO 引导注释', () => {
    const sandboxPoints = javascriptCoreModule.points.filter(
      (p) => p.visualizationType === 'sandbox',
    )
    const practiceSandboxes = sandboxPoints.filter((p) => {
      const demo = p.blocks.find((b) => b.type === 'demo')
      return demo && (demo.data as SandboxData).checks
    })
    practiceSandboxes.forEach((p) => {
      const demo = p.blocks.find((b) => b.type === 'demo')
      const data = demo!.data as SandboxData
      expect(data.initialCode).toMatch(/TODO/)
    })
  })
})
