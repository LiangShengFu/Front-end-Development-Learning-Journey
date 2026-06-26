/**
 * JavaScript 可视化组件类型定义
 *
 * 定义 JS 模块专用交互式 Playground 的数据结构。
 * 这些组件专注于 JS 特有概念：数据类型、相等性、类型转换、作用域、
 * 数组方法、事件传播、事件循环、Promise、原型链、Generator、正则、Todo 应用。
 * 作为核心类型系统（types.ts）的扩展，被 VisualizationRenderer 统一调度。
 */

// ============================================================================
// JS 可视化组件类型标识
// ============================================================================

/** JS 专用可视化组件类型 */
export type JsVisualizationType =
  | 'datatype-explorer'
  | 'equality-comparator'
  | 'type-conversion'
  | 'scope-chain'
  | 'array-method'
  | 'event-propagation'
  | 'event-loop'
  | 'promise-flow'
  | 'class-inheritance'
  | 'regex-tester'
  | 'prototype-chain'
  | 'generator-flow'
  | 'todo-app'

// ============================================================================
// DataTypeExplorer - 数据类型探索器
// ============================================================================

export interface DataTypeItem {
  /** 类型名称 */
  name: string
  /** 示例值字面量 */
  value: string
  /** typeof 返回值 */
  typeofResult: string
  /** 是否可变 */
  mutable: boolean
  /** 分类 */
  category: 'primitive' | 'reference'
  /** 说明 */
  desc: string
}

export interface DataTypeExplorerData {
  title?: string
  types: DataTypeItem[]
}

// ============================================================================
// EqualityComparator - 相等性比较器
// ============================================================================

export interface EqualityComparatorData {
  title?: string
  /** 默认左值 */
  defaultLeft?: string
  /** 默认右值 */
  defaultRight?: string
  /** 默认模式 */
  defaultMode?: 'equality' | 'nullish'
  /** 快捷示例 */
  examples?: Array<{ label: string; left: string; right: string; mode: 'equality' | 'nullish' }>
}

// ============================================================================
// TypeConversionExplorer - 类型转换探索器
// ============================================================================

export interface TypeConversionData {
  title?: string
  /** 默认表达式 */
  defaultExpr?: string
  /** 快捷示例表达式 */
  examples?: string[]
}

// ============================================================================
// ScopeChainVisualizer - 作用域链可视化
// ============================================================================

export interface ScopeVariable {
  name: string
  value: string
  type: 'var' | 'let' | 'const'
}

export interface ScopeLayer {
  /** 作用域名 */
  name: string
  /** 变量列表 */
  variables: ScopeVariable[]
}

export interface ScopeChainData {
  title?: string
  layers: ScopeLayer[]
  /** 默认查找变量 */
  defaultLookup?: string
}

// ============================================================================
// ArrayMethodPlayground - 数组方法 Playground
// ============================================================================

export interface ArrayMethodData {
  title?: string
  /** 默认方法 */
  defaultMethod?: 'map' | 'filter' | 'reduce' | 'forEach' | 'find' | 'some' | 'every'
  /** 默认输入数组（JSON 字符串） */
  defaultInput?: string
  /** 默认回调函数代码 */
  defaultCallback?: string
}

// ============================================================================
// EventPropagationDemo - 事件传播三阶段
// ============================================================================

export interface EventPropagationData {
  title?: string
}

// ============================================================================
// EventLoopVisualizer - Event Loop 可视化
// ============================================================================

export interface EventLoopStep {
  action: 'push' | 'pop' | 'log' | 'move'
  target?: 'stack' | 'micro' | 'macro'
  label?: string
  message?: string
  from?: 'micro' | 'macro'
  to?: 'stack'
}

export interface EventLoopData {
  title?: string
  steps: EventLoopStep[]
}

// ============================================================================
// PromiseFlowDemo - Promise 执行流程
// ============================================================================

export interface PromiseFlowData {
  title?: string
}

// ============================================================================
// ClassInheritanceDiagram - 类继承关系图
// ============================================================================

export interface ClassNode {
  name: string
  methods: string[]
  properties: string[]
  extends?: string
}

export interface ClassInheritanceData {
  title?: string
  classes: ClassNode[]
}

// ============================================================================
// RegexTester - 正则表达式测试器
// ============================================================================

export interface RegexTesterData {
  title?: string
  /** 默认正则模式 */
  defaultPattern?: string
  /** 默认标志 */
  defaultFlags?: string
  /** 默认测试文本 */
  defaultTestText?: string
}

// ============================================================================
// PrototypeChainVisualizer - 原型链可视化
// ============================================================================

export interface PrototypeProperty {
  name: string
  type: 'own' | 'inherited'
  value?: string
}

export interface PrototypeLayer {
  name: string
  properties: PrototypeProperty[]
}

export interface PrototypeChainData {
  title?: string
  chain: PrototypeLayer[]
  defaultLookup?: string
}

// ============================================================================
// GeneratorFlowDemo - Generator 执行流程
// ============================================================================

export interface GeneratorFlowData {
  title?: string
}

// ============================================================================
// TodoAppDemo - 待办事项应用
// ============================================================================

export interface TodoAppData {
  title?: string
  /** 初始待办事项（为空则使用默认示例） */
  initialTodos?: Array<{ text: string; completed: boolean }>
}

// ============================================================================
// JS 可视化组件元数据
// ============================================================================

export interface JsVisualizationMeta {
  type: JsVisualizationType
  /** 中文显示名 */
  label: string
  /** 英文标识 */
  identifier: string
  /** 用途说明 */
  purpose: string
}

/** JS 专用可视化组件的元数据映射 */
export const jsVisualizationMeta: Record<JsVisualizationType, JsVisualizationMeta> = {
  'datatype-explorer': {
    type: 'datatype-explorer',
    label: '数据类型探索',
    identifier: 'datatype-explorer',
    purpose: 'JS 数据类型交互式探索',
  },
  'equality-comparator': {
    type: 'equality-comparator',
    label: '相等性比较',
    identifier: 'equality-comparator',
    purpose: '== vs === 与 ?? vs || 实时比较',
  },
  'type-conversion': {
    type: 'type-conversion',
    label: '类型转换',
    identifier: 'type-conversion',
    purpose: 'JS 隐式类型转换探索',
  },
  'scope-chain': {
    type: 'scope-chain',
    label: '作用域链',
    identifier: 'scope-chain',
    purpose: '作用域链变量查找可视化',
  },
  'array-method': {
    type: 'array-method',
    label: '数组方法',
    identifier: 'array-method',
    purpose: '数组方法 map/filter/reduce 实时执行',
  },
  'event-propagation': {
    type: 'event-propagation',
    label: '事件传播',
    identifier: 'event-propagation',
    purpose: '事件捕获/目标/冒泡三阶段演示',
  },
  'event-loop': {
    type: 'event-loop',
    label: '事件循环',
    identifier: 'event-loop',
    purpose: 'Event Loop Call Stack/微任务/宏任务可视化',
  },
  'promise-flow': {
    type: 'promise-flow',
    label: 'Promise 流程',
    identifier: 'promise-flow',
    purpose: 'Promise 状态流转与链式调用',
  },
  'class-inheritance': {
    type: 'class-inheritance',
    label: '类继承',
    identifier: 'class-inheritance',
    purpose: '类继承关系图与方法查找',
  },
  'regex-tester': {
    type: 'regex-tester',
    label: '正则测试',
    identifier: 'regex-tester',
    purpose: '正则表达式实时匹配与高亮',
  },
  'prototype-chain': {
    type: 'prototype-chain',
    label: '原型链',
    identifier: 'prototype-chain',
    purpose: '原型链层级与属性查找',
  },
  'generator-flow': {
    type: 'generator-flow',
    label: 'Generator 流程',
    identifier: 'generator-flow',
    purpose: 'Generator next() 步进执行',
  },
  'todo-app': {
    type: 'todo-app',
    label: '待办事项',
    identifier: 'todo-app',
    purpose: '完整 CRUD Todo 应用',
  },
}

/** JS 可视化组件数据联合类型 */
export type JsVisualizationData =
  | DataTypeExplorerData
  | EqualityComparatorData
  | TypeConversionData
  | ScopeChainData
  | ArrayMethodData
  | EventPropagationData
  | EventLoopData
  | PromiseFlowData
  | ClassInheritanceData
  | RegexTesterData
  | PrototypeChainData
  | GeneratorFlowData
  | TodoAppData
