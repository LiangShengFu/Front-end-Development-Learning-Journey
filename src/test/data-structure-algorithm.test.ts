/**
 * 模块 24：数据结构与前端算法 - 数据完整性测试
 *
 * 验证模块数据结构、知识点数量、可视化组件覆盖、面试题/小测题题量、
 * 分层递进大纲完整性等（对齐《模块标准自查文档》阈值）。
 */
import { describe, it, expect } from 'vitest'
import { dataStructureAlgorithmModule } from '../modules/data-structure-algorithm'
import { visualizationMeta, isVisualizationBlock } from '../lib/types'
import type {
  AccordionData,
  QuizData,
  FlipCardData,
  VisualizationBlock,
} from '../lib/types'

describe('数据结构与前端算法模块', () => {
  it('模块元数据应正确', () => {
    expect(dataStructureAlgorithmModule.number).toBe('24')
    expect(dataStructureAlgorithmModule.title).toBe('数据结构与前端算法')
    expect(dataStructureAlgorithmModule.slug).toBe('data-structure-algorithm')
    expect(dataStructureAlgorithmModule.stage).toBe('interview')
    expect(dataStructureAlgorithmModule.icon).toBe('24')
  })

  it('模块元数据 knowledgePointCount 应与实际知识点数量一致（30）', () => {
    expect(dataStructureAlgorithmModule.knowledgePointCount).toBe(30)
    expect(dataStructureAlgorithmModule.points).toHaveLength(30)
  })

  it('模块元数据 visualizationCount 应与实际可视化块数量一致（16）', () => {
    const demoBlocks = dataStructureAlgorithmModule.points
      .flatMap((p) => p.blocks)
      .filter((b) => b.type === 'demo').length
    expect(dataStructureAlgorithmModule.visualizationCount).toBe(demoBlocks)
    expect(dataStructureAlgorithmModule.visualizationCount).toBe(16)
  })

  it('知识点序号应从 1 到 30 连续', () => {
    const orders = dataStructureAlgorithmModule.points.map((p) => p.order)
    for (let i = 0; i < 30; i++) {
      expect(orders[i]).toBe(i + 1)
    }
  })

  it('每个知识点应有标题、难度和内容块', () => {
    dataStructureAlgorithmModule.points.forEach((p) => {
      expect(p.title).toBeTruthy()
      expect(p.order).toBeGreaterThan(0)
      expect(p.difficulty).toBeGreaterThanOrEqual(1)
      expect(p.difficulty).toBeLessThanOrEqual(5)
      expect(p.blocks).toBeDefined()
      expect(p.blocks.length).toBeGreaterThan(0)
    })
  })

  it('每个内容块应有 id 和 type', () => {
    dataStructureAlgorithmModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toBeTruthy()
        expect(b.type).toBeTruthy()
      })
    })
  })

  it('内容块 id 应在模块内唯一', () => {
    const ids = dataStructureAlgorithmModule.points.flatMap((p) =>
      p.blocks.map((b) => b.id),
    )
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('内容块 id 应符合 p{order}-{n} 命名规范', () => {
    dataStructureAlgorithmModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toMatch(new RegExp(`^p${p.order}-\\d+$`))
      })
    })
  })

  it('可视化组件块应有有效的 visualizationType', () => {
    dataStructureAlgorithmModule.points.forEach((p) => {
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
    dataStructureAlgorithmModule.points.forEach((p) => {
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
    const difficulties = dataStructureAlgorithmModule.points.map((p) => p.difficulty)
    const min = Math.min(...difficulties)
    const max = Math.max(...difficulties)
    expect(min).toBeGreaterThanOrEqual(1)
    expect(max).toBeLessThanOrEqual(5)
    expect(new Set(difficulties).size).toBeGreaterThanOrEqual(3)
  })

  it('进阶内容（difficulty 4-5）占比应 ≤ 30%', () => {
    const advanced = dataStructureAlgorithmModule.points.filter(
      (p) => p.difficulty >= 4,
    ).length
    expect(advanced / dataStructureAlgorithmModule.points.length).toBeLessThanOrEqual(0.3)
  })

  it('每个知识点应至少包含一个段落或标题块', () => {
    dataStructureAlgorithmModule.points.forEach((p) => {
      const hasTextContent = p.blocks.some(
        (b) => b.type === 'paragraph' || b.type === 'heading',
      )
      expect(hasTextContent).toBe(true)
    })
  })

  // ---- 分层递进大纲完整性 ----
  it('应包含 6 大篇章标题（基础前置/数据结构/算法思想/前端专项/面试实战）', () => {
    const titles = dataStructureAlgorithmModule.points.map((p) => p.title)
    // 第一篇 前置基础
    expect(titles.some((t) => t.includes('总览'))).toBe(true)
    expect(titles.some((t) => t.includes('复杂度'))).toBe(true)
    // 第二篇 基础数据结构
    expect(titles.some((t) => t.includes('栈') && t.includes('队列'))).toBe(true)
    expect(titles.some((t) => t.includes('链表'))).toBe(true)
    expect(titles.some((t) => t.includes('哈希'))).toBe(true)
    // 第三篇 进阶数据结构
    expect(titles.some((t) => t.includes('树'))).toBe(true)
    expect(titles.some((t) => t.includes('堆'))).toBe(true)
    expect(titles.some((t) => t.includes('图'))).toBe(true)
    expect(titles.some((t) => t.includes('Trie') || t.includes('字典树'))).toBe(true)
    expect(titles.some((t) => t.includes('并查集'))).toBe(true)
    // 第四篇 核心算法思想
    expect(titles.some((t) => t.includes('排序'))).toBe(true)
    expect(titles.some((t) => t.includes('二分') || t.includes('查找'))).toBe(true)
    expect(titles.some((t) => t.includes('双指针') || t.includes('滑动窗口'))).toBe(true)
    expect(titles.some((t) => t.includes('回溯'))).toBe(true)
    expect(titles.some((t) => t.includes('分治'))).toBe(true)
    expect(titles.some((t) => t.includes('贪心'))).toBe(true)
    expect(titles.some((t) => t.includes('动态规划') || t.includes('DP'))).toBe(true)
    expect(titles.some((t) => t.includes('位运算'))).toBe(true)
    // 第五篇 前端专项算法
    expect(titles.some((t) => t.includes('手写'))).toBe(true)
    expect(titles.some((t) => t.includes('浏览器') && t.includes('渲染'))).toBe(true)
    expect(titles.some((t) => t.includes('框架') && t.includes('算法'))).toBe(true)
    expect(titles.some((t) => t.includes('业务场景'))).toBe(true)
    expect(titles.some((t) => t.includes('字符串'))).toBe(true)
    // 第六篇 面试与实战
    expect(titles.some((t) => t.includes('刷题'))).toBe(true)
    expect(titles.some((t) => t.includes('方法论') || t.includes('答题'))).toBe(true)
    expect(titles.some((t) => t.includes('易错'))).toBe(true)
    expect(titles.some((t) => t.includes('速查'))).toBe(true)
    expect(titles.some((t) => t.includes('面试题'))).toBe(true)
    expect(titles.some((t) => t.includes('小测') || t.includes('测验'))).toBe(true)
  })

  // ---- 维度 B1/B4/B5/B7/G：面试题题量、场景/对比题计数、闪卡模式、排版规范 ----
  it('面试题应 ≥30 题，启用 flashcard 模式，答案符合排版规范', () => {
    const interview = dataStructureAlgorithmModule.points.find((p) =>
      p.title.includes('面试题'),
    )
    expect(interview).toBeDefined()
    const demo = interview!.blocks.find(isVisualizationBlock)!
    const data = demo.data as AccordionData
    expect(data.items.length).toBeGreaterThanOrEqual(30)
    expect(data.defaultMode).toBe('flashcard')
    data.items.forEach((i) => {
      expect(i.title).toMatch(/^Q\d+(\s+【[^】]+】)?[:：]/)
      expect(i.content).toBeTruthy()
      expect(i.content.length).toBeGreaterThan(20)
      expect(i.content.includes('\n\n')).toBe(true)
    })
    // B4：场景题 ≥ 2 + 对比题 ≥ 2（计数校验，对齐标准）
    const sceneCount = data.items.filter((i) =>
      i.title.includes('【场景题】'),
    ).length
    const compareCount = data.items.filter((i) =>
      i.title.includes('【对比题】'),
    ).length
    expect(sceneCount).toBeGreaterThanOrEqual(2)
    expect(compareCount).toBeGreaterThanOrEqual(2)
  })

  // ---- 维度 B2/B3：小测题题量与梯度标注 ----
  it('小测验应 ≥20 题，且题目含梯度标注（记忆/理解/应用/对比/场景/综合）', () => {
    const quiz = dataStructureAlgorithmModule.points.find((p) =>
      p.title.includes('小测') || p.title.includes('测验'),
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

  // ---- 速查表：翻转卡 + 表格 ----
  it('速查表应包含翻转卡（≥10 张）和复杂度表格', () => {
    const cheatsheet = dataStructureAlgorithmModule.points.find((p) =>
      p.title.includes('速查'),
    )
    expect(cheatsheet).toBeDefined()
    const flipDemo = cheatsheet!.blocks.find(
      (b): b is VisualizationBlock =>
        isVisualizationBlock(b) && b.visualizationType === 'flipcard',
    )
    expect(flipDemo).toBeDefined()
    const flipData = flipDemo!.data as FlipCardData
    expect(flipData.cards.length).toBeGreaterThanOrEqual(10)
    const tables = cheatsheet!.blocks.filter((b) => b.type === 'table')
    expect(tables.length).toBeGreaterThanOrEqual(2)
  })

  // ---- 维度 A4：新增/实战知识点标注 isNew ----
  it('新增知识点应标注 isNew', () => {
    const newPoints = dataStructureAlgorithmModule.points.filter((p) => p.isNew === true)
    expect(newPoints.length).toBeGreaterThanOrEqual(15)
  })

  // ---- 算法可视化组件覆盖 ----
  it('应包含算法专属可视化组件（排序竞技场/树遍历/BFS路径/链表步进/栈队列等）', () => {
    const usedTypes = new Set<string>()
    dataStructureAlgorithmModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) usedTypes.add(b.visualizationType)
      })
    })
    const algorithmViz = [
      'sorting-race-arena',
      'binary-tree-walker',
      'bfs-path-finder',
      'linked-list-stepper',
      'stack-queue-visualizer',
    ]
    algorithmViz.forEach((type) => {
      expect(usedTypes.has(type)).toBe(true)
    })
  })

  // ---- 代码步进组件覆盖核心算法 ----
  it('应使用 codestepper 可视化核心算法实现（≥5 处）', () => {
    const codeSteppers = dataStructureAlgorithmModule.points.flatMap((p) =>
      p.blocks.filter(
        (b): b is VisualizationBlock =>
          isVisualizationBlock(b) && b.visualizationType === 'codestepper',
      ),
    )
    expect(codeSteppers.length).toBeGreaterThanOrEqual(5)
  })
})
