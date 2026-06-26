/**
 * TypeScript 可视化组件类型定义 - 模块 07
 *
 * 定义 8 种 TypeScript 专用可视化组件的类型和数据接口：
 * - TsTypeChecker：类型检查演练场
 * - TypeTransformBoard：Utility Types 类型转换器
 * - GenericConstraintFlow：泛型约束流程图
 * - TsConfigPlayground：tsconfig 配置面板
 * - ApiTypingWorkbench：类型安全 API 工作台
 * - MigrationPlanner：JS → TS 迁移规划器
 * - TypeInferenceTimeline：泛型推断时间线
 * - TypeMatrixTable：类型对比矩阵表
 */

// ============================================================================
// TypeScript 可视化组件类型联合
// ============================================================================

export type TypeScriptVisualizationType =
  | 'ts-type-checker'
  | 'type-transform-board'
  | 'generic-constraint-flow'
  | 'ts-config-playground'
  | 'api-typing-workbench'
  | 'migration-planner'
  | 'type-inference-timeline'
  | 'type-matrix-table'

// ============================================================================
// TsTypeChecker — 类型检查演练场
// ============================================================================

export interface CheckerSnippet {
  label: string
  code: string
  description: string
  /** 期望的错误（用于教学演示） */
  expectedIssues?: string[]
}

export interface TsTypeCheckerData {
  title?: string
  defaultCode?: string
  snippets?: CheckerSnippet[]
}

// ============================================================================
// TypeTransformBoard — Utility Types 类型转换器
// ============================================================================

export interface TransformableProperty {
  name: string
  type: string
  required: boolean
  description?: string
}

export interface UtilityTransform {
  name: string
  applies: string
  description: string
  /** 应用的转换函数名（展示用） */
  fn: string
  resultProperties: TransformableProperty[]
}

export interface TypeTransformBoardData {
  title?: string
  /** 原始类型模型 */
  sourceModel: {
    name: string
    properties: TransformableProperty[]
  }
  /** 可用转换列表 */
  transforms: UtilityTransform[]
}

// ============================================================================
// GenericConstraintFlow — 泛型约束流程图
// ============================================================================

export interface ConstraintFlowStep {
  step: number
  title: string
  code: string
  description: string
  highlight?: 'input' | 'check' | 'resolve' | 'error'
}

export interface GenericConstraintFlowData {
  title?: string
  /** 流程步骤 */
  steps: ConstraintFlowStep[]
  /** 可选：预设场景 */
  scenarios?: Array<{ name: string; input: string }>
}

// ============================================================================
// TsConfigPlayground — tsconfig 配置面板
// ============================================================================

export interface StrictFlag {
  key: string
  label: string
  description: string
  /** 影响范围 */
  impact: 'compile' | 'type-check' | 'runtime'
  /** 严格模式下默认值 */
  isStrict: boolean
  /** 代码示例（开启 vs 关闭） */
  examples: {
    on: { code: string; message: string }
    off: { code: string; message: string }
  }
}

export interface TsConfigPlaygroundData {
  title?: string
  flags: StrictFlag[]
  /** 默认开启的 flag keys */
  defaultEnabled?: string[]
}

// ============================================================================
// ApiTypingWorkbench — 类型安全 API 工作台
// ============================================================================

export interface ApiTypingScenario {
  name: string
  level: 'basic' | 'generic' | 'full'
  /** 不安全的代码 */
  unsafe: string
  /** 类型安全的代码 */
  safe: string
  description: string
}

export interface ApiTypingWorkbenchData {
  title?: string
  scenarios: ApiTypingScenario[]
  /** 默认选中场景 */
  defaultScenario?: number
}

// ============================================================================
// MigrationPlanner — JS → TS 迁移规划器
// ============================================================================

export interface MigrationStage {
  stage: number
  name: string
  description: string
  /** 该阶段的操作 */
  actions: string[]
  /** 收益 */
  benefit: string
  /** 风险等级 */
  risk: 'low' | 'medium' | 'high'
  /** 预计时间 */
  estimatedTime: string
}

export interface MigrationPlannerData {
  title?: string
  stages: MigrationStage[]
  /** 当前项目假设规模 */
  projectSize?: string
}

// ============================================================================
// TypeInferenceTimeline — 泛型推断时间线
// ============================================================================

export interface InferenceStep {
  /** 步骤序号 */
  step: number
  /** 步骤标题 */
  title: string
  /** 代码片段 */
  code: string
  /** 说明 */
  description: string
  /** 推断状态 */
  status: 'start' | 'constrain' | 'resolve' | 'done' | 'error'
}

export interface TypeInferenceTimelineData {
  title?: string
  steps: InferenceStep[]
  /** 可选：推断场景名称 */
  scenario?: string
}

// ============================================================================
// TypeMatrixTable — 类型对比矩阵表
// ============================================================================

export interface TypeMatrixRow {
  /** 类型名称 */
  type: string
  /** 描述 */
  description: string
  /** 能否赋值给 unknown */
  assignable: 'yes' | 'no' | 'conditional'
  /** 能否包含 null/undefined */
  nullable: 'yes' | 'no' | 'strictonly' | 'conditional'
  /** typeof 结果 */
  typeofResult: string
  /** 使用建议 */
  recommendation: string
  /** 代码示例 */
  example?: string
}

export interface TypeMatrixTableData {
  title?: string
  rows: TypeMatrixRow[]
  /** 可选高亮行索引 */
  highlightRow?: number
}

// ============================================================================
// 组件元信息
// ============================================================================

export const typeScriptVisualizationMeta: Record<
  TypeScriptVisualizationType,
  {
    type: TypeScriptVisualizationType
    label: string
    identifier: string
    purpose: string
  }
> = {
  'ts-type-checker': {
    type: 'ts-type-checker',
    label: 'TS 类型检查',
    identifier: 'ts-type-checker',
    purpose: 'TypeScript 类型检查演练场',
  },
  'type-transform-board': {
    type: 'type-transform-board',
    label: '类型转换板',
    identifier: 'type-transform-board',
    purpose: 'Utility Types 类型转换器交互演示',
  },
  'generic-constraint-flow': {
    type: 'generic-constraint-flow',
    label: '泛型约束流程',
    identifier: 'generic-constraint-flow',
    purpose: '泛型约束与推断边界流程图',
  },
  'ts-config-playground': {
    type: 'ts-config-playground',
    label: 'TS 配置演练',
    identifier: 'ts-config-playground',
    purpose: 'tsconfig strict 配置交互面板',
  },
  'api-typing-workbench': {
    type: 'api-typing-workbench',
    label: 'API 类型工作台',
    identifier: 'api-typing-workbench',
    purpose: '类型安全 API 封装策略对比',
  },
  'migration-planner': {
    type: 'migration-planner',
    label: '迁移规划器',
    identifier: 'migration-planner',
    purpose: 'JS 到 TS 渐进迁移规划器',
  },
  'type-inference-timeline': {
    type: 'type-inference-timeline',
    label: '类型推断时间线',
    identifier: 'type-inference-timeline',
    purpose: '泛型类型推断步骤时间线',
  },
  'type-matrix-table': {
    type: 'type-matrix-table',
    label: '类型矩阵表',
    identifier: 'type-matrix-table',
    purpose: '多类型特性对比矩阵表',
  },
}
