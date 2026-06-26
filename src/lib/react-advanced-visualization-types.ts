/**
 * React 进阶可视化组件类型定义 - 模块 09
 *
 * 定义 6 种模块九专用进阶可视化组件的类型和数据接口：
 * - FiberWorkLoopSimulator：Fiber 工作循环模拟器（可中断渲染 / Lane 优先级 / 双缓冲）
 * - MemoEffectComparator：memo / useMemo / useCallback 效果对比器
 * - VirtualListSimulator：虚拟列表原理模拟器
 * - HookExtractionWorkshop：自定义 Hook 提取工作台
 * - TransitionVsSyncDemo：startTransition vs 同步更新对比
 * - PatternFactory：设计模式工厂（HOC / Render Props / Custom Hooks）
 */

// ============================================================================
// React 进阶可视化组件类型联合
// ============================================================================

export type ReactAdvancedVisualizationType =
  | 'fiber-work-loop-simulator'
  | 'memo-effect-comparator'
  | 'virtual-list-simulator'
  | 'hook-extraction-workshop'
  | 'transition-vs-sync-demo'
  | 'pattern-factory'

// ============================================================================
// FiberWorkLoopSimulator — Fiber 工作循环模拟器
// ============================================================================

export interface FiberNodeData {
  id: string
  label: string
  type: string
  child?: string
  sibling?: string
  returnTo?: string
  flags?: 'Placement' | 'Update' | 'Deletion' | null
}

export interface LaneTask {
  id: string
  /** 优先级通道：Sync（最高）/ Default / Transition（最低） */
  lane: 'Sync' | 'Default' | 'Transition'
  label: string
  /** 该任务需要处理的 Fiber 节点数 */
  steps: number
}

export interface FiberScenario {
  id: string
  label: string
  description: string
  tree: FiberNodeData[]
  lanes: LaneTask[]
  /** 高优先级中断点：在处理到某节点时插入 SyncLane 任务 */
  interruptions?: Array<{ atNode: string; newTask: LaneTask }>
}

export interface FiberWorkLoopSimulatorData {
  scenarios: FiberScenario[]
  title?: string
}

// ============================================================================
// MemoEffectComparator — memo 效果对比器
// ============================================================================

export interface MemoStrategy {
  id: string
  label: string
  /** 是否使用 React.memo 包装子组件 */
  useReactMemo: boolean
  /** 是否使用 useMemo 缓存对象/数组 props */
  useMemo: boolean
  /** 是否使用 useCallback 缓存函数 props */
  useCallback: boolean
}

export interface MemoEffectComparatorData {
  strategies: MemoStrategy[]
  title?: string
}

// ============================================================================
// VirtualListSimulator — 虚拟列表原理模拟器
// ============================================================================

export interface VirtualListSimulatorData {
  /** 总条目数，默认 10000 */
  totalItems?: number
  /** 每项高度（px），默认 35 */
  itemHeight?: number
  /** 容器高度（px），默认 400 */
  containerHeight?: number
  /** 缓冲区项数，默认 4 */
  overscan?: number
  title?: string
}

// ============================================================================
// HookExtractionWorkshop — 自定义 Hook 提取工作台
// ============================================================================

export interface HookWorkshopTab {
  id: string
  label: string
  hookName: string
  /** 提取前：逻辑耦合在组件内 */
  beforeCode: string
  /** 提取后：封装为自定义 Hook */
  afterCode: string
  /** 实时操作区说明 */
  demoDescription: string
}

export interface HookExtractionWorkshopData {
  tabs: HookWorkshopTab[]
  title?: string
}

// ============================================================================
// TransitionVsSyncDemo — startTransition vs 同步更新对比
// ============================================================================

export interface TransitionVsSyncDemoData {
  /** 大列表数据量，默认 10000 */
  listSize?: number
  title?: string
}

// ============================================================================
// PatternFactory — 设计模式工厂
// ============================================================================

export interface PatternDemo {
  id: string
  label: string
  description: string
  /** 模式实现代码 */
  code: string
  /** 使用示例代码 */
  usage: string
  pros: string[]
  cons: string[]
}

export interface PatternFactoryData {
  patterns: PatternDemo[]
  /** 问题描述（三种模式解决同一问题） */
  problemStatement: string
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const reactAdvancedVisualizationMeta: Record<
  ReactAdvancedVisualizationType,
  { type: ReactAdvancedVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'fiber-work-loop-simulator': {
    type: 'fiber-work-loop-simulator',
    label: 'Fiber 工作循环模拟',
    identifier: 'fiber-work-loop-simulator',
    purpose: '可中断渲染 / Lane 优先级 / 双缓冲可视化',
  },
  'memo-effect-comparator': {
    type: 'memo-effect-comparator',
    label: 'memo 效果对比器',
    identifier: 'memo-effect-comparator',
    purpose: '四种优化策略渲染次数对比',
  },
  'virtual-list-simulator': {
    type: 'virtual-list-simulator',
    label: '虚拟列表模拟器',
    identifier: 'virtual-list-simulator',
    purpose: '全量渲染 vs 虚拟列表 DOM 节点对比',
  },
  'hook-extraction-workshop': {
    type: 'hook-extraction-workshop',
    label: 'Hook 提取工作台',
    identifier: 'hook-extraction-workshop',
    purpose: '自定义 Hook 提取过程与实时操作',
  },
  'transition-vs-sync-demo': {
    type: 'transition-vs-sync-demo',
    label: 'Transition 对比演示',
    identifier: 'transition-vs-sync-demo',
    purpose: '同步更新 vs startTransition 响应差异',
  },
  'pattern-factory': {
    type: 'pattern-factory',
    label: '设计模式工厂',
    identifier: 'pattern-factory',
    purpose: 'HOC / Render Props / Custom Hooks 对比',
  },
}
