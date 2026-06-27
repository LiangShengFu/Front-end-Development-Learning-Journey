/**
 * 模块 06：CSS 工程化与样式方案 - 数据完整性测试
 *
 * 验证模块数据结构、知识点数量、可视化组件覆盖，
 * 并校验模块标准自查文档中"以测促学 / 动态反馈闭环 / 任务导向"等关键检查项。
 */
import { describe, it, expect } from 'vitest'
import { cssEngineeringModule } from '../modules/css-engineering'
import {
  visualizationMeta,
  isVisualizationBlock,
  type AccordionData,
  type QuizData,
  type SandboxData,
  type TableBlock,
} from '../lib/types'

describe('CSS 工程化与样式方案 模块', () => {
  it('模块元数据应正确', () => {
    expect(cssEngineeringModule.number).toBe('06')
    expect(cssEngineeringModule.title).toBe('CSS 工程化与样式方案')
    expect(cssEngineeringModule.slug).toBe('css-engineering')
    expect(cssEngineeringModule.stage).toBe('prerequisites')
    expect(cssEngineeringModule.icon).toBe('06')
  })

  it('应包含 21 个知识点（与 knowledgePointCount 一致）', () => {
    expect(cssEngineeringModule.points).toHaveLength(21)
    expect(cssEngineeringModule.knowledgePointCount).toBe(21)
  })

  it('知识点序号应从 1 到 21 连续', () => {
    const orders = cssEngineeringModule.points.map((p) => p.order)
    for (let i = 0; i < 21; i++) {
      expect(orders[i]).toBe(i + 1)
    }
  })

  it('每个知识点应有标题、难度和内容块', () => {
    cssEngineeringModule.points.forEach((p) => {
      expect(p.title).toBeTruthy()
      expect(p.order).toBeGreaterThan(0)
      expect(p.difficulty).toBeGreaterThanOrEqual(1)
      expect(p.difficulty).toBeLessThanOrEqual(5)
      expect(p.blocks).toBeDefined()
      expect(p.blocks.length).toBeGreaterThan(0)
    })
  })

  it('每个内容块应有 id 和 type', () => {
    cssEngineeringModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toBeTruthy()
        expect(b.type).toBeTruthy()
      })
    })
  })

  it('内容块 id 应在模块内唯一', () => {
    const ids = cssEngineeringModule.points.flatMap((p) =>
      p.blocks.map((b) => b.id),
    )
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('可视化组件块应有有效的 visualizationType 并在 visualizationMeta 登记', () => {
    cssEngineeringModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          expect(b.visualizationType).toBeTruthy()
          expect(visualizationMeta[b.visualizationType]).toBeDefined()
          expect(b.data).toBeDefined()
        }
      })
    })
  })

  it('可视化组件多样性 ≥ 8 种', () => {
    const usedTypes = new Set<string>()
    cssEngineeringModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          usedTypes.add(b.visualizationType)
        }
      })
    })
    // 模块标准自查文档 F8：可视化组件多样性 ≥ 8 种
    expect(usedTypes.size).toBeGreaterThanOrEqual(8)
    usedTypes.forEach((type) => {
      expect(
        visualizationMeta[type as keyof typeof visualizationMeta],
      ).toBeDefined()
    })
  })

  it('知识点难度分布应合理（含易题与难题）', () => {
    const difficulties = cssEngineeringModule.points.map((p) => p.difficulty)
    expect(Math.min(...difficulties)).toBeGreaterThanOrEqual(1)
    expect(Math.max(...difficulties)).toBeLessThanOrEqual(5)
    expect(new Set(difficulties).size).toBeGreaterThanOrEqual(3)
    // 模块标准自查文档 A3：进阶内容(4-5)不超过总量的 30%
    const advanced = difficulties.filter((d) => d >= 4).length
    expect(advanced / difficulties.length).toBeLessThanOrEqual(0.3)
  })

  it('每个知识点应至少包含一个段落或标题块', () => {
    cssEngineeringModule.points.forEach((p) => {
      const hasTextContent = p.blocks.some(
        (b) => b.type === 'paragraph' || b.type === 'heading',
      )
      expect(hasTextContent).toBe(true)
    })
  })

  // ---- 模块标准自查文档：评估环节有效性（以测促学） ----

  it('应包含小测验知识点且题目数 ≥ 20（含三梯度）', () => {
    const quizPoint = cssEngineeringModule.points.find(
      (p) => p.visualizationType === 'quiz',
    )
    expect(quizPoint).toBeDefined()
    const demo = quizPoint!.blocks.find((b) => b.type === 'demo')
    expect(demo).toBeDefined()
    const data = demo!.data as QuizData
    // 模块标准自查文档 B2：小测题 ≥ 20 题
    expect(data.questions.length).toBeGreaterThanOrEqual(20)
    // 每题需有梯度标注（【记忆】【理解】【应用】等）
    data.questions.forEach((q) => {
      expect(q.question).toMatch(/^【.+】/)
      expect(q.options.length).toBeGreaterThanOrEqual(2)
      expect(q.correctIndex).toBeGreaterThanOrEqual(0)
      expect(q.correctIndex).toBeLessThan(q.options.length)
      expect(q.explanation).toBeTruthy()
    })
    // B3：含记忆/理解/应用三梯度
    const allTitles = data.questions.map((q) => q.question).join('\n')
    expect(allTitles).toMatch(/【记忆】/)
    expect(allTitles).toMatch(/【理解】/)
    expect(allTitles).toMatch(/【应用】/)
  })

  it('应包含面试题知识点且题数 ≥ 30（含场景题 / 对比题）', () => {
    const accordionPoint = cssEngineeringModule.points.find(
      (p) => p.visualizationType === 'accordion',
    )
    expect(accordionPoint).toBeDefined()
    const demo = accordionPoint!.blocks.find((b) => b.type === 'demo')
    expect(demo).toBeDefined()
    const data = demo!.data as AccordionData
    // 模块标准自查文档 B1：面试题 ≥ 30 题
    expect(data.items.length).toBeGreaterThanOrEqual(30)
    const titles = data.items.map((i) => i.title).join('\n')
    // B4：至少 2 道场景题 + 2 道对比题
    expect(titles.match(/场景题/g)?.length ?? 0).toBeGreaterThanOrEqual(2)
    expect(titles.match(/对比题/g)?.length ?? 0).toBeGreaterThanOrEqual(2)
  })

  it('应包含知识点速查表（table 类型，行数 ≥ 10）', () => {
    const tablePoints = cssEngineeringModule.points.filter((p) =>
      p.blocks.some((b) => b.type === 'table'),
    )
    expect(tablePoints.length).toBeGreaterThanOrEqual(1)
    const cheatSheet = tablePoints
      .map((p) => p.blocks.find((b) => b.type === 'table') as TableBlock)
      .filter((t) => t && t.rows.length >= 10)
    expect(cheatSheet.length).toBeGreaterThanOrEqual(1)
    const tableBlock = cheatSheet[0]
    const headers = tableBlock.headers
    const rows = tableBlock.rows
    expect(headers.length).toBeGreaterThan(0)
    expect(rows.length).toBeGreaterThanOrEqual(10)
    rows.forEach((row) => {
      expect(row.length).toBe(headers.length)
    })
  })

  // ---- 模块标准自查文档：动态反馈闭环（沙盒断言）+ 任务导向（综合实战） ----

  it('应至少包含 2 个带 checks 断言的综合实战沙盒', () => {
    const sandboxPoints = cssEngineeringModule.points.filter(
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
      // CSS 实战沙盒允许 'html' 语言（内嵌 <style>）
      expect(['html', 'js', 'css', 'typescript']).toContain(data.language)
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
    const sandboxPoints = cssEngineeringModule.points.filter(
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
