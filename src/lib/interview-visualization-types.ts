/**
 * 面试备考可视化组件类型定义 - 模块 25
 *
 * 定义 6 种模块二十五专用面试备考可视化组件的类型和数据接口：
 * - InterviewQuizEngine：面试问答引擎（隐藏答案→自主回答→展开对比→自评掌握程度）
 * - ConceptExplainViz：概念阐释可视化（先结论后分析→举例→对比的表达结构）
 * - FlashcardDeck：闪卡记忆系统（基于 SM-2 间隔重复算法）
 * - MockInterviewTimer：模拟面试计时器（随机抽题 + 限时回答）
 * - ProgressDashboard：答题进度仪表盘（9 领域雷达图 + 统计）
 * - SystemDesignBoard：系统设计题面板（结构化答题模板）
 */

// ============================================================================
// 面试备考可视化组件类型联合
// ============================================================================

export type InterviewVisualizationType =
  | 'interview-quiz-engine'
  | 'concept-explain-viz'
  | 'flashcard-deck'
  | 'mock-interview-timer'
  | 'progress-dashboard'
  | 'system-design-board'

// ============================================================================
// 通用类型定义
// ============================================================================

/** 题目领域 */
export type QuestionDomain =
  | 'javascript'
  | 'css'
  | 'react'
  | 'vue'
  | 'network'
  | 'security'
  | 'engineering'
  | 'react19'
  | 'testing'
  | 'handwriting'

/** 掌握程度 */
export type MasteryLevel = 'mastered' | 'review' | 'unlearned'

/** 难度等级 */
export type Difficulty = 'easy' | 'medium' | 'hard'

/** 结构化面试题 */
export interface InterviewQuestion {
  id: string
  domain: QuestionDomain
  question: string
  /** 核心答案（30-50 字，用于表格速查） */
  shortAnswer: string
  /** 详细阐释（展开学习用） */
  detailedAnswer: string
  /** 可选代码示例 */
  codeExample?: string
  difficulty: Difficulty
  /** 标签，如 ["闭包", "作用域"] */
  tags: string[]
  /** 相关问题 id（用于关联学习） */
  relatedQuestions?: string[]
  /** 回答要点（用于自评打分） */
  keyPoints: string[]
}

// ============================================================================
// InterviewQuizEngine — 面试问答引擎
// ============================================================================

export interface InterviewQuizEngineData {
  questions: InterviewQuestion[]
  domain: QuestionDomain
  /** 模式：顺序学习 / 随机抽查 / 错题回顾 */
  mode?: 'sequential' | 'random' | 'review'
  title?: string
}

// ============================================================================
// ConceptExplainViz — 概念阐释可视化
// ============================================================================

export interface ConceptExplainTemplate {
  id: string
  title: string
  /** Step 1：结论（一句话答案） */
  conclusion: string
  /** Step 2：分析（原理阐释） */
  analysis: string
  /** Step 3：举例（代码/场景） */
  examples: string
  /** Step 4：对比/延伸（相关概念异同） */
  extension: string
}

export interface ConceptExplainVizData {
  templates: ConceptExplainTemplate[]
  title?: string
}

// ============================================================================
// FlashcardDeck — 闪卡记忆系统
// ============================================================================

export interface FlashcardDeckData {
  questions: InterviewQuestion[]
  /** 不传则跨领域混合 */
  domain?: QuestionDomain
  /** 每日新卡上限，默认 20 */
  dailyLimit?: number
  title?: string
}

// ============================================================================
// MockInterviewTimer — 模拟面试计时器
// ============================================================================

export interface MockInterviewTimerData {
  /** 题目数据（若不传则使用组件内置的跨领域题目） */
  questions?: InterviewQuestion[]
  /** 默认每题时间（分钟），默认 3 */
  defaultTimePerQuestion?: number
  title?: string
}

// ============================================================================
// ProgressDashboard — 答题进度仪表盘
// ============================================================================

export interface ProgressDashboardData {
  /** 各领域题目总数（用于计算掌握率） */
  domainTotals: Record<QuestionDomain, number>
  title?: string
}

// ============================================================================
// SystemDesignBoard — 系统设计题面板
// ============================================================================

export interface SystemDesignStep {
  label: string
  prompt: string
  reference: string
}

export interface SystemDesignProblem {
  id: string
  title: string
  description: string
  steps: SystemDesignStep[]
}

export interface SystemDesignBoardData {
  problems: SystemDesignProblem[]
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const interviewVisualizationMeta: Record<
  InterviewVisualizationType,
  { type: InterviewVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'interview-quiz-engine': {
    type: 'interview-quiz-engine',
    label: '面试问答引擎',
    identifier: 'interview-quiz-engine',
    purpose: '隐藏答案→自主回答→展开对比→自评掌握',
  },
  'concept-explain-viz': {
    type: 'concept-explain-viz',
    label: '概念阐释可视化',
    identifier: 'concept-explain-viz',
    purpose: '先结论后分析→举例→对比的表达结构',
  },
  'flashcard-deck': {
    type: 'flashcard-deck',
    label: '闪卡记忆系统',
    identifier: 'flashcard-deck',
    purpose: '基于 SM-2 间隔重复的闪卡记忆',
  },
  'mock-interview-timer': {
    type: 'mock-interview-timer',
    label: '模拟面试计时器',
    identifier: 'mock-interview-timer',
    purpose: '随机抽题 + 限时回答 + 自动展示答案',
  },
  'progress-dashboard': {
    type: 'progress-dashboard',
    label: '答题进度仪表盘',
    identifier: 'progress-dashboard',
    purpose: '9 领域掌握率雷达图 + 统计',
  },
  'system-design-board': {
    type: 'system-design-board',
    label: '系统设计题面板',
    identifier: 'system-design-board',
    purpose: '结构化系统设计答题模板',
  },
}
