/**
 * 模块 25：面试八股与综合能力 - 数据完整性测试
 *
 * 验证模块数据结构、知识点数量、可视化组件覆盖、各 domain 题量平衡、
 * 软技能/业务理解新增知识点、STAR 差异化、progress-dashboard 数据一致性等
 * （对齐《模块标准自查文档》阈值，并覆盖用户提出的改进项验收）。
 */
import { describe, it, expect } from 'vitest'
import { interviewPrepModule } from '../modules/interview-prep'
import { visualizationMeta, isVisualizationBlock } from '../lib/types'
import type {
  VisualizationBlock,
  QuizData,
  CodeStepperData,
  CompareTableData,
} from '../lib/types'
import type {
  InterviewQuizEngineData,
  ProgressDashboardData,
} from '../lib/interview-visualization-types'

/** 收集模块内所有 quiz-engine 题目（含 mock-interview-timer 中的题） */
function collectQuizEngineQuestions() {
  const result: { source: string; questions: { id: string; domain: string }[] }[] = []
  interviewPrepModule.points.forEach((p) => {
    p.blocks.forEach((b) => {
      if (!isVisualizationBlock(b)) return
      if (b.visualizationType === 'interview-quiz-engine') {
        const data = b.data as InterviewQuizEngineData
        if (data.questions?.length) {
          result.push({
            source: `KP${p.order}`,
            questions: data.questions.map((q) => ({ id: q.id, domain: q.domain })),
          })
        }
      }
      if (b.visualizationType === 'mock-interview-timer') {
        const data = b.data as { questions?: { id: string; domain: string }[] }
        if (data.questions?.length) {
          result.push({
            source: `KP${p.order}-mock`,
            questions: data.questions.map((q) => ({ id: q.id, domain: q.domain })),
          })
        }
      }
    })
  })
  return result
}

describe('面试八股与综合能力模块（模块25）', () => {
  // ---- A. 元数据与基本结构 ----
  it('模块元数据应正确', () => {
    expect(interviewPrepModule.number).toBe('25')
    expect(interviewPrepModule.title).toBe('面试八股与综合能力')
    expect(interviewPrepModule.slug).toBe('interview-prep')
    expect(interviewPrepModule.stage).toBe('interview')
    expect(interviewPrepModule.icon).toBeTruthy()
  })

  it('模块元数据 knowledgePointCount 应与实际知识点数量一致（17）', () => {
    expect(interviewPrepModule.knowledgePointCount).toBe(17)
    expect(interviewPrepModule.points).toHaveLength(17)
  })

  it('模块元数据 visualizationCount 应与实际可视化块数量一致（30）', () => {
    const demoBlocks = interviewPrepModule.points
      .flatMap((p) => p.blocks)
      .filter((b) => b.type === 'demo').length
    expect(interviewPrepModule.visualizationCount).toBe(demoBlocks)
    expect(interviewPrepModule.visualizationCount).toBe(30)
  })

  it('知识点序号应从 1 到 17 连续', () => {
    const orders = interviewPrepModule.points.map((p) => p.order)
    for (let i = 0; i < 17; i++) {
      expect(orders[i]).toBe(i + 1)
    }
  })

  it('每个知识点应有标题、难度和内容块', () => {
    interviewPrepModule.points.forEach((p) => {
      expect(p.title).toBeTruthy()
      expect(p.order).toBeGreaterThan(0)
      expect(p.difficulty).toBeGreaterThanOrEqual(1)
      expect(p.difficulty).toBeLessThanOrEqual(5)
      expect(p.blocks).toBeDefined()
      expect(p.blocks.length).toBeGreaterThan(0)
    })
  })

  it('每个内容块应有 id 和 type', () => {
    interviewPrepModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toBeTruthy()
        expect(b.type).toBeTruthy()
      })
    })
  })

  it('内容块 id 应在模块内唯一', () => {
    const ids = interviewPrepModule.points.flatMap((p) =>
      p.blocks.map((b) => b.id),
    )
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('内容块 id 应符合 iv-p{order}-{n} 命名规范', () => {
    interviewPrepModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        expect(b.id).toMatch(new RegExp(`^iv-p${p.order}-\\d+$`))
      })
    })
  })

  // ---- B. 可视化组件覆盖 ----
  it('可视化组件块应有有效的 visualizationType', () => {
    interviewPrepModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          expect(b.visualizationType).toBeTruthy()
          expect(visualizationMeta[b.visualizationType]).toBeDefined()
          expect(b.data).toBeDefined()
        }
      })
    })
  })

  it('应使用多种可视化组件（≥6 种）', () => {
    const usedTypes = new Set<string>()
    interviewPrepModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) {
          usedTypes.add(b.visualizationType)
        }
      })
    })
    expect(usedTypes.size).toBeGreaterThanOrEqual(6)
    usedTypes.forEach((type) => {
      expect(visualizationMeta[type as keyof typeof visualizationMeta]).toBeDefined()
    })
  })

  it('应包含 interview-quiz-engine / comparetable / codestepper / accordion 等核心可视化', () => {
    const usedTypes = new Set<string>()
    interviewPrepModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (isVisualizationBlock(b)) usedTypes.add(b.visualizationType)
      })
    })
    expect(usedTypes.has('interview-quiz-engine')).toBe(true)
    expect(usedTypes.has('comparetable')).toBe(true)
    expect(usedTypes.has('codestepper')).toBe(true)
    expect(usedTypes.has('accordion')).toBe(true)
    expect(usedTypes.has('mock-interview-timer')).toBe(true)
    expect(usedTypes.has('progress-dashboard')).toBe(true)
  })

  // ---- C. 知识点覆盖（关键 KP 存在性）----
  it('应覆盖核心八股知识点（JS/CSS/框架/网络/浏览器/安全）', () => {
    const titles = interviewPrepModule.points.map((p) => p.title)
    expect(titles.some((t) => t.includes('JavaScript'))).toBe(true)
    expect(titles.some((t) => t.includes('CSS'))).toBe(true)
    expect(titles.some((t) => t.includes('框架'))).toBe(true)
    expect(titles.some((t) => t.includes('网络'))).toBe(true)
    expect(titles.some((t) => t.includes('浏览器'))).toBe(true)
    expect(titles.some((t) => t.includes('安全'))).toBe(true)
  })

  it('应包含 STAR 法则与系统设计知识点', () => {
    const titles = interviewPrepModule.points.map((p) => p.title)
    expect(titles.some((t) => t.includes('STAR'))).toBe(true)
    expect(titles.some((t) => t.includes('系统设计'))).toBe(true)
  })

  // ---- D. 新增知识点（软技能 + 业务理解，E1/E2 验收）----
  it('应新增 KP16 软技能与协作知识点', () => {
    const kp16 = interviewPrepModule.points.find((p) => p.order === 16)
    expect(kp16).toBeDefined()
    expect(kp16!.title).toContain('软技能')
    const hasAccordion = kp16!.blocks.some(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'accordion',
    )
    expect(hasAccordion).toBe(true)
    const hasQuiz = kp16!.blocks.some(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'interview-quiz-engine',
    )
    expect(hasQuiz).toBe(true)
  })

  it('应新增 KP17 业务理解与产品思维知识点', () => {
    const kp17 = interviewPrepModule.points.find((p) => p.order === 17)
    expect(kp17).toBeDefined()
    expect(kp17!.title).toMatch(/业务|产品/)
    const hasCompare = kp17!.blocks.some(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'comparetable',
    )
    expect(hasCompare).toBe(true)
    const hasQuiz = kp17!.blocks.some(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'interview-quiz-engine',
    )
    expect(hasQuiz).toBe(true)
  })

  it('KP16 软技能应覆盖沟通协作/冲突解决/向上管理场景', () => {
    const kp16 = interviewPrepModule.points.find((p) => p.order === 16)!
    const allText = kp16.blocks
      .map((b) => JSON.stringify(b))
      .join('')
    expect(allText).toContain('协作')
    expect(allText).toContain('冲突')
    expect(allText).toContain('向上管理')
  })

  it('KP17 业务理解应覆盖业务理解/产品思维/数据驱动维度', () => {
    const kp17 = interviewPrepModule.points.find((p) => p.order === 17)!
    const allText = kp17.blocks
      .map((b) => JSON.stringify(b))
      .join('')
    expect(allText).toContain('业务理解')
    expect(allText).toContain('产品思维')
    expect(allText).toContain('数据驱动')
  })

  // ---- E. 题量平衡（A2 验收：各核心 domain ≥5 题）----
  it('核心技术 domain 题量应基本平衡（javascript/react/network/security/css 各 ≥5 题）', () => {
    const allQuestions = collectQuizEngineQuestions().flatMap((r) => r.questions)
    const byDomain = (d: string) => allQuestions.filter((q) => q.domain === d).length
    expect(byDomain('javascript')).toBeGreaterThanOrEqual(5)
    expect(byDomain('react')).toBeGreaterThanOrEqual(5)
    expect(byDomain('network')).toBeGreaterThanOrEqual(5)
    expect(byDomain('security')).toBeGreaterThanOrEqual(5)
    expect(byDomain('css')).toBeGreaterThanOrEqual(5)
  })

  it('JS/React/Network 各 domain 题量应 ≥8 题（核心八股加强）', () => {
    const allQuestions = collectQuizEngineQuestions().flatMap((r) => r.questions)
    const byDomain = (d: string) => allQuestions.filter((q) => q.domain === d).length
    expect(byDomain('javascript')).toBeGreaterThanOrEqual(8)
    expect(byDomain('react')).toBeGreaterThanOrEqual(8)
    expect(byDomain('network')).toBeGreaterThanOrEqual(8)
  })

  // ---- E2. 各 section（KP）题量 ≥30（模块 25 验收：01 部分 JS 八股 ≥30）----
  it('KP1 JavaScript 八股 section 题量应 ≥30 题', () => {
    const kp1 = interviewPrepModule.points.find((p) => p.order === 1)!
    const quiz = kp1.blocks.find(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'interview-quiz-engine',
    )
    expect(quiz).toBeDefined()
    const data = (quiz as VisualizationBlock)!.data as InterviewQuizEngineData
    expect(data.questions.length).toBeGreaterThanOrEqual(30)
    // 验证难度分布合理（含至少 2 种难度）
    const difficulties = new Set(data.questions.map((q) => q.difficulty))
    expect(difficulties.size).toBeGreaterThanOrEqual(2)
    // 验证所有题目字段完整（tags/keyPoints/difficulty）
    data.questions.forEach((q) => {
      expect(q.tags.length).toBeGreaterThan(0)
      expect(q.keyPoints.length).toBeGreaterThan(0)
      expect(q.difficulty).toMatch(/^(easy|medium|hard)$/)
      expect(q.shortAnswer).toBeTruthy()
      expect(q.detailedAnswer).toBeTruthy()
    })
  })

  // ---- E2. 各 section（KP）题量 ≥30（模块 25 验收：02 部分 CSS 八股 ≥30）----
  it('KP2 CSS 八股 section 题量应 ≥30 题', () => {
    const kp2 = interviewPrepModule.points.find((p) => p.order === 2)!
    const quiz = kp2.blocks.find(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'interview-quiz-engine',
    )
    expect(quiz).toBeDefined()
    const data = (quiz as VisualizationBlock)!.data as InterviewQuizEngineData
    expect(data.questions.length).toBeGreaterThanOrEqual(30)
    // 验证难度分布合理（含至少 2 种难度）
    const difficulties = new Set(data.questions.map((q) => q.difficulty))
    expect(difficulties.size).toBeGreaterThanOrEqual(2)
    // 验证所有题目字段完整（tags/keyPoints/difficulty）
    data.questions.forEach((q) => {
      expect(q.tags.length).toBeGreaterThan(0)
      expect(q.keyPoints.length).toBeGreaterThan(0)
      expect(q.difficulty).toMatch(/^(easy|medium|hard)$/)
      expect(q.shortAnswer).toBeTruthy()
      expect(q.detailedAnswer).toBeTruthy()
    })
  })

  // ---- E2. 各 section（KP）题量 ≥30（模块 25 验收：03 部分 React 框架八股 ≥30）----
  it('KP3 React 框架八股 section 题量应 ≥30 题', () => {
    const kp3 = interviewPrepModule.points.find((p) => p.order === 3)!
    const quizzes = kp3.blocks.filter(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'interview-quiz-engine',
    ) as VisualizationBlock[]
    // 找到 domain 为 react 的 quiz block
    const reactQuiz = quizzes.find((q) => (q.data as InterviewQuizEngineData).domain === 'react')
    expect(reactQuiz).toBeDefined()
    const data = (reactQuiz as VisualizationBlock)!.data as InterviewQuizEngineData
    expect(data.questions.length).toBeGreaterThanOrEqual(30)
    // 验证所有题目 domain 为 react
    data.questions.forEach((q) => {
      expect(q.domain).toBe('react')
    })
    // 验证难度分布合理（含至少 2 种难度）
    const difficulties = new Set(data.questions.map((q) => q.difficulty))
    expect(difficulties.size).toBeGreaterThanOrEqual(2)
    // 验证所有题目字段完整（tags/keyPoints/difficulty）
    data.questions.forEach((q) => {
      expect(q.tags.length).toBeGreaterThan(0)
      expect(q.keyPoints.length).toBeGreaterThan(0)
      expect(q.difficulty).toMatch(/^(easy|medium|hard)$/)
      expect(q.shortAnswer).toBeTruthy()
      expect(q.detailedAnswer).toBeTruthy()
    })
  })

  // ---- E2. 各 section（KP）题量 ≥30（模块 25 验收：03 部分 Vue 框架八股 ≥30）----
  it('KP3 Vue 框架八股 section 题量应 ≥30 题', () => {
    const kp3 = interviewPrepModule.points.find((p) => p.order === 3)!
    const quizzes = kp3.blocks.filter(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'interview-quiz-engine',
    ) as VisualizationBlock[]
    // 找到 domain 为 vue 的 quiz block
    const vueQuiz = quizzes.find((q) => (q.data as InterviewQuizEngineData).domain === 'vue')
    expect(vueQuiz).toBeDefined()
    const data = (vueQuiz as VisualizationBlock)!.data as InterviewQuizEngineData
    expect(data.questions.length).toBeGreaterThanOrEqual(30)
    // 验证所有题目 domain 为 vue
    data.questions.forEach((q) => {
      expect(q.domain).toBe('vue')
    })
    // 验证难度分布合理（含至少 2 种难度）
    const difficulties = new Set(data.questions.map((q) => q.difficulty))
    expect(difficulties.size).toBeGreaterThanOrEqual(2)
    // 验证所有题目字段完整（tags/keyPoints/difficulty）
    data.questions.forEach((q) => {
      expect(q.tags.length).toBeGreaterThan(0)
      expect(q.keyPoints.length).toBeGreaterThan(0)
      expect(q.difficulty).toMatch(/^(easy|medium|hard)$/)
      expect(q.shortAnswer).toBeTruthy()
      expect(q.detailedAnswer).toBeTruthy()
    })
  })

  // ---- E2. 各 section（KP）题量 ≥30（模块 25 验收：04 部分 网络八股 ≥30）----
  it('KP4 网络八股 section 题量应 ≥30 题', () => {
    const kp4 = interviewPrepModule.points.find((p) => p.order === 4)!
    const quizzes = kp4.blocks.filter(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'interview-quiz-engine',
    ) as VisualizationBlock[]
    // 找到 domain 为 network 的 quiz block
    const networkQuiz = quizzes.find((q) => (q.data as InterviewQuizEngineData).domain === 'network')
    expect(networkQuiz).toBeDefined()
    const data = (networkQuiz as VisualizationBlock)!.data as InterviewQuizEngineData
    expect(data.questions.length).toBeGreaterThanOrEqual(30)
    // 验证所有题目 domain 为 network
    data.questions.forEach((q) => {
      expect(q.domain).toBe('network')
    })
    // 验证难度分布合理（含至少 2 种难度）
    const difficulties = new Set(data.questions.map((q) => q.difficulty))
    expect(difficulties.size).toBeGreaterThanOrEqual(2)
    // 验证所有题目字段完整（tags/keyPoints/difficulty）
    data.questions.forEach((q) => {
      expect(q.tags.length).toBeGreaterThan(0)
      expect(q.keyPoints.length).toBeGreaterThan(0)
      expect(q.difficulty).toMatch(/^(easy|medium|hard)$/)
      expect(q.shortAnswer).toBeTruthy()
      expect(q.detailedAnswer).toBeTruthy()
    })
    // 验证题目 id 唯一
    const ids = data.questions.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
    // 验证题型覆盖面：覆盖传输层/应用层/安全/性能等关键领域
    const allTags = data.questions.flatMap((q) => q.tags)
    expect(allTags.some((t) => /TCP|UDP|HTTP|HTTPS|TLS/.test(t))).toBe(true)
    expect(allTags.some((t) => /缓存|Cache|CDN/.test(t))).toBe(true)
    expect(allTags.some((t) => /跨域|CORS|Cookie|安全/.test(t))).toBe(true)
  })

  // ---- F. 动态可视化补强（A1 验收：浏览器/安全有 codestepper）----
  it('KP5 浏览器应包含 codestepper 动态演示渲染流程', () => {
    const kp5 = interviewPrepModule.points.find((p) => p.order === 5)!
    const codestepper = kp5.blocks.find(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'codestepper',
    )
    expect(codestepper).toBeDefined()
    const data = (codestepper as VisualizationBlock)!.data as CodeStepperData
    expect(data.steps?.length).toBeGreaterThanOrEqual(4)
    expect(data.lines?.length).toBeGreaterThan(0)
  })

  it('KP6 安全应包含 codestepper 动态演示攻击流程', () => {
    const kp6 = interviewPrepModule.points.find((p) => p.order === 6)!
    const codestepper = kp6.blocks.find(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'codestepper',
    )
    expect(codestepper).toBeDefined()
    const data = (codestepper as VisualizationBlock)!.data as CodeStepperData
    expect(data.steps?.length).toBeGreaterThanOrEqual(4)
  })

  it('KP5/KP6 浏览器与安全应同时含 quiz-engine 深入题（不再仅对比表）', () => {
    ;[5, 6].forEach((order) => {
      const kp = interviewPrepModule.points.find((p) => p.order === order)!
      const quiz = kp.blocks.find(
        (b) => isVisualizationBlock(b) && b.visualizationType === 'interview-quiz-engine',
      )
      expect(quiz).toBeDefined()
      const data = (quiz as VisualizationBlock)!.data as InterviewQuizEngineData
      expect(data.questions.length).toBeGreaterThanOrEqual(5)
    })
  })

  // ---- G. STAR 差异化（C2 验收：ToB/ToC/基建对比）----
  it('KP8 STAR 应包含 ToB/ToC/基建差异化对比表', () => {
    const kp8 = interviewPrepModule.points.find((p) => p.order === 8)!
    const compare = kp8.blocks.find(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'comparetable',
    )
    expect(compare).toBeDefined()
    const data = (compare as VisualizationBlock)!.data as CompareTableData
    expect(data.columns?.length).toBeGreaterThanOrEqual(3)
    const allText = JSON.stringify(data)
    expect(allText).toContain('ToB')
    expect(allText).toContain('ToC')
    expect(allText).toContain('基建')
  })

  // ---- H. progress-dashboard 数据一致性（D 验收）----
  it('KP15 progress-dashboard domainTotals 应与实际 quiz 题量一致', () => {
    const kp15 = interviewPrepModule.points.find((p) => p.order === 15)!
    const dashboard = kp15.blocks.find(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'progress-dashboard',
    )
    expect(dashboard).toBeDefined()
    const data = (dashboard as VisualizationBlock)!.data as ProgressDashboardData
    const allQuestions = collectQuizEngineQuestions().flatMap((r) => r.questions)
    const actualByDomain = new Map<string, number>()
    allQuestions.forEach((q) => {
      actualByDomain.set(q.domain, (actualByDomain.get(q.domain) || 0) + 1)
    })
    // 校验：dashboard 中声明的 domain 总数应等于实际该 domain 题量
    Object.entries(data.domainTotals).forEach(([domain, declared]) => {
      const actual = actualByDomain.get(domain) || 0
      expect(declared).toBe(actual)
    })
  })

  // ---- I. 难度分布与内容质量 ----
  it('知识点难度分布应合理（≥3 个不同等级）', () => {
    const difficulties = interviewPrepModule.points.map((p) => p.difficulty)
    const min = Math.min(...difficulties)
    const max = Math.max(...difficulties)
    expect(min).toBeGreaterThanOrEqual(1)
    expect(max).toBeLessThanOrEqual(5)
    expect(new Set(difficulties).size).toBeGreaterThanOrEqual(3)
  })

  it('每个知识点应至少包含一个段落或标题块', () => {
    interviewPrepModule.points.forEach((p) => {
      const hasTextContent = p.blocks.some(
        (b) => b.type === 'paragraph' || b.type === 'heading',
      )
      expect(hasTextContent).toBe(true)
    })
  })

  // ---- J. 题目字段完整性（B1/D1 验收：tags + keyPoints 已就绪）----
  it('所有 quiz-engine 题目应包含 tags 和 keyPoints 字段（标签筛选与自评数据层就绪）', () => {
    interviewPrepModule.points.forEach((p) => {
      p.blocks.forEach((b) => {
        if (!isVisualizationBlock(b)) return
        if (b.visualizationType === 'interview-quiz-engine') {
          const data = b.data as InterviewQuizEngineData
          data.questions.forEach((q) => {
            expect(q.tags).toBeDefined()
            expect(q.tags.length).toBeGreaterThan(0)
            expect(q.keyPoints).toBeDefined()
            expect(q.keyPoints.length).toBeGreaterThan(0)
            expect(q.difficulty).toMatch(/^(easy|medium|hard)$/)
          })
        }
      })
    })
  })

  // ---- K. 模拟面试计时器题量 ----
  it('KP15 模拟面试计时器应至少包含 6 道跨 domain 题', () => {
    const kp15 = interviewPrepModule.points.find((p) => p.order === 15)!
    const mock = kp15.blocks.find(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'mock-interview-timer',
    )
    expect(mock).toBeDefined()
    const data = (mock as VisualizationBlock)!.data as { questions: { domain: string }[]; defaultTimePerQuestion: number }
    expect(data.questions.length).toBeGreaterThanOrEqual(6)
    expect(data.defaultTimePerQuestion).toBeGreaterThan(0)
    const domains = new Set(data.questions.map((q) => q.domain))
    expect(domains.size).toBeGreaterThanOrEqual(3)
  })

  // ---- L. 综合测验题量 ----
  it('KP15 综合测验应至少包含 8 道选择题', () => {
    const kp15 = interviewPrepModule.points.find((p) => p.order === 15)!
    const quiz = kp15.blocks.find(
      (b) => isVisualizationBlock(b) && b.visualizationType === 'quiz',
    )
    expect(quiz).toBeDefined()
    const data = (quiz as VisualizationBlock)!.data as QuizData
    expect(data.questions.length).toBeGreaterThanOrEqual(8)
    data.questions.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(4)
      expect(q.correctIndex).toBeGreaterThanOrEqual(0)
      expect(q.correctIndex).toBeLessThan(q.options.length)
      expect(q.explanation).toBeTruthy()
    })
  })

  // ---- M. 系统设计 board 存在性 ----
  it('应包含 system-design-board 可视化', () => {
    const hasSystemDesign = interviewPrepModule.points.some((p) =>
      p.blocks.some(
        (b) => isVisualizationBlock(b) && b.visualizationType === 'system-design-board',
      ),
    )
    expect(hasSystemDesign).toBe(true)
  })
})
