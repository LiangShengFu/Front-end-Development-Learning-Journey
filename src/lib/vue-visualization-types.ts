/**
 * Vue.js 基础可视化组件类型定义 - 模块 11
 *
 * 定义 6 种模块十一专用 Vue 教学模拟组件的类型和数据接口：
 * - VueVsReactComparator：五维度 Vue vs React 交互对比
 * - ProxyReactivityTracker：Proxy 响应式依赖收集追踪器
 * - VueComponentSandbox：SFC 组件通信可视化沙盒
 * - DefineEmitsWorkshop：defineProps/defineEmits 工作台
 * - PiniaStoreExplorer：Pinia Store 交互探索器
 * - PatchFlagVisualizer：编译优化（PatchFlag/静态提升）可视化
 */

// ============================================================================
// Vue 可视化组件类型联合
// ============================================================================

export type VueVisualizationType =
  | 'vue-vs-react-comparator'
  | 'proxy-reactivity-tracker'
  | 'vue-component-sandbox'
  | 'define-emits-workshop'
  | 'pinia-store-explorer'
  | 'patch-flag-visualizer'

// ============================================================================
// VueVsReactComparator — Vue vs React 交互对比器
// ============================================================================

export type ComparisonDimension =
  | 'reactivity'
  | 'template'
  | 'composition'
  | 'update'
  | 'compile'

export interface FrameworkComparisonPoint {
  id: ComparisonDimension
  label: string
  characteristic: string
  vueCode: string
  vueExplanation: string
  reactCode: string
  reactExplanation: string
  diffHighlights: string[]
}

export interface VueVsReactComparatorData {
  comparisonPoints: FrameworkComparisonPoint[]
  title?: string
}

// ============================================================================
// ProxyReactivityTracker — Proxy 响应式追踪器
// ============================================================================

export interface ProxyTrackingScenario {
  id: string
  label: string
  initialData: Record<string, unknown>
  /** effect 名称及其依赖的属性路径 */
  effects: Array<{ name: string; dependencies: string[] }>
}

export interface ProxyReactivityTrackerData {
  scenarios: ProxyTrackingScenario[]
  title?: string
}

// ============================================================================
// VueComponentSandbox — SFC 组件通信沙盒
// ============================================================================

export type CommunicationFlow = 'props' | 'emits' | 'slots' | 'provide-inject'

export interface VueComponentSandboxData {
  title?: string
}

// ============================================================================
// DefineEmitsWorkshop — Props/Emits 工作台
// ============================================================================

export interface PropsEmitsTemplate {
  id: string
  label: string
  propsInterface: string
  emitsSignature: string
}

export interface DefineEmitsWorkshopData {
  templates: PropsEmitsTemplate[]
  title?: string
}

// ============================================================================
// PiniaStoreExplorer — Pinia Store 探索器
// ============================================================================

export interface PiniaGetterDef {
  name: string
  /** 基于 state 计算 getter 值的函数 */
  compute: (state: Record<string, number | string>) => unknown
}

export interface PiniaActionDef {
  name: string
  label: string
  /** 执行 action 后返回新 state */
  execute: (state: Record<string, number | string>) => Record<string, number | string>
}

export interface PiniaStoreTemplate {
  id: string
  label: string
  description: string
  defineStoreCode: string
  initialState: Record<string, number | string>
  getters: PiniaGetterDef[]
  actions: PiniaActionDef[]
}

export interface PiniaStoreExplorerData {
  templates: PiniaStoreTemplate[]
  title?: string
}

// ============================================================================
// PatchFlagVisualizer — 编译优化可视化
// ============================================================================

export interface PatchFlagDynamicNode {
  expression: string
  patchFlag: number
  flagName: string
}

export interface PatchFlagTemplate {
  id: string
  label: string
  templateCode: string
  staticNodes: string[]
  dynamicNodes: PatchFlagDynamicNode[]
  hoistedNodes: string[]
  compiledSnippet: string
}

export interface PatchFlagVisualizerData {
  templates: PatchFlagTemplate[]
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const vueVisualizationMeta: Record<
  VueVisualizationType,
  { type: VueVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'vue-vs-react-comparator': {
    type: 'vue-vs-react-comparator',
    label: 'Vue vs React 对比器',
    identifier: 'vue-vs-react-comparator',
    purpose: '五维度可切换的 Vue 3 与 React 18+ 框架对比',
  },
  'proxy-reactivity-tracker': {
    type: 'proxy-reactivity-tracker',
    label: 'Proxy 响应式追踪器',
    identifier: 'proxy-reactivity-tracker',
    purpose: '依赖收集与触发更新的 Proxy 教学模拟',
  },
  'vue-component-sandbox': {
    type: 'vue-component-sandbox',
    label: 'SFC 组件通信沙盒',
    identifier: 'vue-component-sandbox',
    purpose: 'Props/Emits/Slots/provide-inject 数据流可视化',
  },
  'define-emits-workshop': {
    type: 'define-emits-workshop',
    label: 'Props/Emits 工作台',
    identifier: 'define-emits-workshop',
    purpose: 'TypeScript 类型定义实时生成父组件调用代码',
  },
  'pinia-store-explorer': {
    type: 'pinia-store-explorer',
    label: 'Pinia Store 探索器',
    identifier: 'pinia-store-explorer',
    purpose: 'defineStore → state/getter/action 完整交互链路',
  },
  'patch-flag-visualizer': {
    type: 'patch-flag-visualizer',
    label: '编译优化可视化',
    identifier: 'patch-flag-visualizer',
    purpose: '静态提升、PatchFlag 标记与 Block Tree diff 教学模拟',
  },
}
