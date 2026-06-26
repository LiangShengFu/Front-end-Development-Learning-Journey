/**
 * 前端测试可视化组件类型定义 - 模块 18
 *
 * 定义 5 种模块十八专用前端测试教学模拟组件的类型和数据接口：
 * - TestPyramidVisualizer：测试金字塔（E2E 少 / 集成适量 / 单元大量）
 * - MockFlowVisualizer：Mock 三种范式（vi.fn / vi.mock / vi.useFakeTimers）
 * - TestingLibraryQueryPriority：Testing Library 查询优先级阶梯
 * - ComponentTestPlayground：组件测试 render-act-assert 三阶段
 * - E2ETestFlowVisualizer：Playwright E2E 执行流（goto/fill/click/assert）
 *
 * 另跨模块复用模块十六 HttpRequestResponseFlow（E2E 测试视角）
 * 与模块十七 ExpressMiddlewareFlow（中间件测试视角）。
 * 所有组件均为教学模拟，不实际执行测试代码。
 */

// ============================================================================
// 测试可视化组件类型联合
// ============================================================================

export type TestingVisualizationType =
  | 'test-pyramid-visualizer'
  | 'mock-flow-visualizer'
  | 'testing-library-query-priority'
  | 'component-test-playground'
  | 'e2e-test-flow-visualizer'

// ============================================================================
// TestPyramidVisualizer — 测试金字塔
// ============================================================================

export type TestPyramidLayerId = 'e2e' | 'integration' | 'unit'
export type TestSpeed = 'slow' | 'medium' | 'fast'
export type TestStability = 'low' | 'medium' | 'high'

export interface TestPyramidLayer {
  /** 层级标识 */
  id: TestPyramidLayerId
  /** 层级名称 */
  name: string
  /** 描述 */
  description: string
  /** 数量占比（百分比） */
  ratio: number
  /** 执行速度 */
  speed: TestSpeed
  /** 稳定性 */
  stability: TestStability
  /** 投入策略 */
  strategy: string
  /** 推荐工具 */
  tools: string[]
  /** 主题色 */
  color: string
}

export interface TestPyramidVisualizerData {
  layers?: TestPyramidLayer[]
  /** 金字塔原则说明 */
  principleNote?: string
  title?: string
}

// ============================================================================
// MockFlowVisualizer — Mock 三种范式
// ============================================================================

export type MockParadigmId = 'function' | 'module' | 'timer'

export interface MockParadigm {
  /** 范式标识 */
  id: MockParadigmId
  /** 范式名称 */
  name: string
  /** Mock API（vi.fn / vi.mock / vi.useFakeTimers） */
  api: string
  /** 替换目标说明 */
  target: string
  /** 代码示例 */
  codeSnippet: string
  /** 断言方式 */
  assertion: string
  /** 调用验证示例 */
  callVerification: string
  /** 适用场景 */
  useCase: string
  /** 优点 */
  pros: string[]
  /** 缺点 */
  cons: string[]
  /** 主题色 */
  color: string
}

export interface MockFlowVisualizerData {
  paradigms?: MockParadigm[]
  /** Mock 核心思想说明 */
  coreIdeaNote?: string
  title?: string
}

// ============================================================================
// TestingLibraryQueryPriority — 查询优先级阶梯
// ============================================================================

export interface QueryMethod {
  /** 查询方法标识 */
  id: string
  /** 方法名（getByRole / getByText 等） */
  name: string
  /** 优先级（1 = 最高） */
  priority: number
  /** 是否推荐 */
  recommended: boolean
  /** 代码示例 */
  example: string
  /** 描述 */
  description: string
  /** 适用场景 */
  useCase: string
  /** 主题色（推荐高亮） */
  color: string
}

export interface TestingLibraryQueryPriorityData {
  queries?: QueryMethod[]
  /** 优先级原则说明 */
  principleNote?: string
  title?: string
}

// ============================================================================
// ComponentTestPlayground — 组件测试三阶段
// ============================================================================

export type ComponentTestStageId = 'render' | 'act' | 'assert'

export interface ComponentTestStage {
  /** 阶段标识 */
  id: ComponentTestStageId
  /** 阶段名称 */
  name: string
  /** 描述 */
  description: string
  /** 代码片段 */
  codeSnippet: string
  /** 阶段结果说明 */
  result: string
  /** 主题色 */
  color: string
}

export interface ComponentTestPlaygroundData {
  stages?: ComponentTestStage[]
  /** 被测组件代码（如 Counter） */
  componentCode?: string
  /** 完整测试代码 */
  testCode?: string
  /** render-act-assert 三段式说明 */
  threePhaseNote?: string
  title?: string
}

// ============================================================================
// E2ETestFlowVisualizer — Playwright E2E 执行流
// ============================================================================

export type E2EAction = 'goto' | 'fill' | 'click' | 'assert' | 'wait'

export interface E2ETestStep {
  /** 步骤标识 */
  id: string
  /** 动作类型 */
  action: E2EAction
  /** 操作目标（选择器/URL） */
  target: string
  /** 输入值（fill 动作使用） */
  value?: string
  /** 步骤描述 */
  description: string
  /** 是否为断言点 */
  isAssertion: boolean
  /** 主题色 */
  color: string
}

export interface E2ETestFlowVisualizerData {
  steps?: E2ETestStep[]
  /** 测试场景说明（如登录流程） */
  scenarioNote?: string
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const testingVisualizationMeta: Record<
  TestingVisualizationType,
  { type: TestingVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'test-pyramid-visualizer': {
    type: 'test-pyramid-visualizer',
    label: '测试金字塔模型',
    identifier: 'test-pyramid-visualizer',
    purpose: 'E2E/集成/单元三层金字塔层级切换 + 占比/速度/稳定性/策略',
  },
  'mock-flow-visualizer': {
    type: 'mock-flow-visualizer',
    label: 'Mock 三种范式',
    identifier: 'mock-flow-visualizer',
    purpose: 'vi.fn/vi.mock/vi.useFakeTimers 三种 Mock 替换 + 调用验证流程',
  },
  'testing-library-query-priority': {
    type: 'testing-library-query-priority',
    label: 'Testing Library 查询优先级',
    identifier: 'testing-library-query-priority',
    purpose: 'getByRole > getByLabelText > getByText > ... > getByTestId 优先级阶梯',
  },
  'component-test-playground': {
    type: 'component-test-playground',
    label: '组件测试 render-act-assert',
    identifier: 'component-test-playground',
    purpose: 'render 渲染 → act 触发 → assert 断言三阶段动画推进',
  },
  'e2e-test-flow-visualizer': {
    type: 'e2e-test-flow-visualizer',
    label: 'Playwright E2E 执行流',
    identifier: 'e2e-test-flow-visualizer',
    purpose: 'goto/fill/click/assert 步骤穿透动画 + 断言点高亮',
  },
}
