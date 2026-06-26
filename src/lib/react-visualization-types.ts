/**
 * React 可视化组件类型定义 - 模块 08
 *
 * 定义 9 种 React 模块专用可视化组件的类型和数据接口：
 * - VdomDiffSimulator：虚拟 DOM Diff 模拟器
 * - JsxLivePreview：JSX 实时预览
 * - DataFetchStateMachine：数据获取三态机
 * - RerenderTracker：重渲染追踪器
 * - ReduxCycleSimulator：Redux 数据流循环
 * - SuspenseBoundaryDemo：Suspense 边界模拟
 * - ComponentLibDecider：组件库对比决策
 * - DecisionTree：通用决策树
 * - DiffHighlightBoard：差异高亮对比面板
 */

// ============================================================================
// React 可视化组件类型联合
// ============================================================================

export type ReactVisualizationType =
  | 'vdom-diff-simulator'
  | 'jsx-live-preview'
  | 'data-fetch-state-machine'
  | 'rerender-tracker'
  | 'redux-cycle-simulator'
  | 'suspense-boundary-demo'
  | 'component-lib-decider'
  | 'decision-tree'
  | 'diff-highlight-board'

// ============================================================================
// VdomDiffSimulator — 虚拟 DOM Diff 模拟器
// ============================================================================

export interface VdomNode {
  id: string
  label: string
}

export interface VdomDiffScene {
  id: string
  label: string
  oldTree: VdomNode[]
  newTree: VdomNode[]
  diffDescription: string
  domOps: number
  addedIds: string[]
  removedIds: string[]
  movedIds: string[]
}

export interface VdomDiffSimulatorData {
  scenes: VdomDiffScene[]
  title?: string
}

// ============================================================================
// JsxLivePreview — JSX 实时预览
// ============================================================================

export interface JsxSnippet {
  label: string
  code: string
  description?: string
}

export interface JsxLivePreviewData {
  defaultCode?: string
  presets?: JsxSnippet[]
  title?: string
}

// ============================================================================
// DataFetchStateMachine — 数据获取三态机
// ============================================================================

export interface FetchScenario {
  id: string
  label: string
  description: string
  initialState: 'loading' | 'success' | 'error'
  transitionSequence: Array<{
    from: string
    to: string
    trigger: string
    delay: number
  }>
  hasRaceCondition?: boolean
}

export interface DataFetchStateMachineData {
  scenarios: FetchScenario[]
  title?: string
}

// ============================================================================
// RerenderTracker — 重渲染追踪器
// ============================================================================

export interface RerenderStep {
  id: string
  component: string
  action: string
  reRenders: number
  blocked: boolean
  reason?: string
}

export interface RerenderTrackerData {
  steps?: RerenderStep[]
  title?: string
  defaultScenario?: string
}

// ============================================================================
// ReduxCycleSimulator — Redux 数据流循环
// ============================================================================

export interface ReduxCycleStep {
  phase: string
  title: string
  code: string
  description: string
  color: string
}

export interface ReduxCycleSimulatorData {
  steps: ReduxCycleStep[]
  title?: string
}

// ============================================================================
// SuspenseBoundaryDemo — Suspense 边界模拟
// ============================================================================

export interface SuspenseScenario {
  id: string
  label: string
  delay: number
  success: boolean
  description: string
}

export interface SuspenseBoundaryDemoData {
  scenarios?: SuspenseScenario[]
  title?: string
}

// ============================================================================
// ComponentLibDecider — 组件库对比决策
// ============================================================================

export interface LibOption {
  name: string
  scores: Record<string, number>
  pros: string[]
  cons: string[]
  bestFor: string
}

export interface ComponentLibDeciderData {
  criteria: string[]
  options: LibOption[]
  title?: string
}

// ============================================================================
// DecisionTree — 通用决策树
// ============================================================================

export interface DecisionNode {
  question: string
  yesLabel: string
  noLabel: string
  yesResult?: string
  noNext?: DecisionNode
  noResult?: string
}

export interface DecisionTreeData {
  root: DecisionNode
  startLabel: string
  title?: string
}

// ============================================================================
// DiffHighlightBoard — 差异高亮对比面板
// ============================================================================

export interface DiffPair {
  label: string
  left: string
  right: string
  highlight?: string
}

export interface DiffHighlightBoardData {
  leftTitle: string
  rightTitle: string
  pairs: DiffPair[]
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const reactVisualizationMeta: Record<
  ReactVisualizationType,
  {
    type: ReactVisualizationType
    label: string
    identifier: string
    purpose: string
  }
> = {
  'vdom-diff-simulator': {
    type: 'vdom-diff-simulator',
    label: '虚拟 DOM Diff 模拟',
    identifier: 'vdom-diff-simulator',
    purpose: '新旧虚拟 DOM 对比与最小化操作可视化',
  },
  'jsx-live-preview': {
    type: 'jsx-live-preview',
    label: 'JSX 实时预览',
    identifier: 'jsx-live-preview',
    purpose: 'JSX 代码输入与实时编译预览',
  },
  'data-fetch-state-machine': {
    type: 'data-fetch-state-machine',
    label: '数据获取三态机',
    identifier: 'data-fetch-state-machine',
    purpose: 'loading / error / success 状态转换可视化',
  },
  'rerender-tracker': {
    type: 'rerender-tracker',
    label: '重渲染追踪器',
    identifier: 'rerender-tracker',
    purpose: '组件重渲染原因与优化分析',
  },
  'redux-cycle-simulator': {
    type: 'redux-cycle-simulator',
    label: 'Redux 数据流',
    identifier: 'redux-cycle-simulator',
    purpose: 'Redux action → reducer → store → UI 循环演示',
  },
  'suspense-boundary-demo': {
    type: 'suspense-boundary-demo',
    label: 'Suspense 边界演示',
    identifier: 'suspense-boundary-demo',
    purpose: 'Suspense fallback 与 ErrorBoundary 行为可视化',
  },
  'component-lib-decider': {
    type: 'component-lib-decider',
    label: '组件库决策',
    identifier: 'component-lib-decider',
    purpose: '多维度组件库对比与选型',
  },
  'decision-tree': {
    type: 'decision-tree',
    label: '决策树',
    identifier: 'decision-tree',
    purpose: '多级决策路径可视化',
  },
  'diff-highlight-board': {
    type: 'diff-highlight-board',
    label: '差异对比板',
    identifier: 'diff-highlight-board',
    purpose: '正确与错误做法左右对比高亮',
  },
}
