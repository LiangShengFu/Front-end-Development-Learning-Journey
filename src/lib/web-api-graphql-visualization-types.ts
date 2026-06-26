/**
 * Web 高级 API 与 GraphQL 可视化组件类型定义 - 模块 21
 *
 * 定义 5 种模块二十一专用高级 API/API 层教学模拟组件的类型和数据接口：
 * - WebComponentsLifecycleVisualizer：Web Components 生命周期回调（constructor/connectedCallback/disconnectedCallback/attributeChangedCallback/adoptedCallback）
 * - WorkerDataTransferVisualizer：Web Workers 三种数据传输方式（结构化克隆/Transferable/SharedArrayBuffer）
 * - ObserverApiShowcase：三种 Observer API 实时演示（Intersection/Resize/Mutation）
 * - GraphQLSchemaExplorer：GraphQL Schema 类型树 + 查询构建器（query/mutation/subscription）
 * - ApiLayerComparisonVisualizer：API 层四种方案对比（REST/GraphQL/tRPC/TanStack Query）
 *
 * 另跨模块复用模块十九 DebounceThrottleVisualizer（Intersection Observer 性能对比视角）
 * 与模块十八 ComponentTestPlayground（Web Components 测试视角）。
 * 所有组件均为教学模拟，Observer/Worker 行为均为本地模拟，不依赖外部服务。
 */

// ============================================================================
// Web 高级 API 与 GraphQL 可视化组件类型联合
// ============================================================================

export type WebApiGraphQLVisualizationType =
  | 'web-components-lifecycle'
  | 'worker-data-transfer'
  | 'observer-api-showcase'
  | 'graphql-schema-explorer'
  | 'api-layer-comparison'

// ============================================================================
// WebComponentsLifecycleVisualizer — Web Components 生命周期流程
// ============================================================================

export type LifecyclePhaseId =
  | 'constructor'
  | 'connectedCallback'
  | 'disconnectedCallback'
  | 'attributeChangedCallback'
  | 'adoptedCallback'

export interface LifecyclePhase {
  /** 阶段标识 */
  id: LifecyclePhaseId
  /** 阶段名称 */
  name: string
  /** 触发时机 */
  trigger: string
  /** 典型用途 */
  useCase: string
  /** 代码示例 */
  codeSnippet: string
  /** 主题色 */
  color: string
}

export interface WebComponentsLifecycleData {
  /** 生命周期阶段列表 */
  phases?: LifecyclePhase[]
  /** 自定义元素标签文本 */
  elementText?: string
  /** 生命周期总览说明 */
  overviewNote?: string
  title?: string
}

// ============================================================================
// WorkerDataTransferVisualizer — Web Workers 数据传输对比
// ============================================================================

export type TransferMethodId = 'structuredClone' | 'transferable' | 'sharedArrayBuffer'

export interface TransferMethod {
  /** 传输方式标识 */
  id: TransferMethodId
  /** 方式名称 */
  name: string
  /** API 概要 */
  api: string
  /** 数据流向说明 */
  flow: string
  /** 所有权变化 */
  ownership: string
  /** 代码示例 */
  codeSnippet: string
  /** 适用场景 */
  useCase: string
  /** 优点 */
  pros: string[]
  /** 缺点 */
  cons: string[]
  /** 主题色 */
  color: string
}

export interface WorkerDataTransferData {
  /** 传输方式列表 */
  methods?: TransferMethod[]
  /** 数据传输总览说明 */
  overviewNote?: string
  title?: string
}

// ============================================================================
// ObserverApiShowcase — 三种 Observer 实时演示
// ============================================================================

export type ObserverTypeId = 'intersection' | 'resize' | 'mutation'

export interface ObserverTypeInfo {
  /** Observer 标识 */
  id: ObserverTypeId
  /** 名称 */
  name: string
  /** 构造函数 */
  constructor: string
  /** 观察目标 */
  target: string
  /** 配置选项 */
  options: string
  /** 代码示例 */
  codeSnippet: string
  /** 典型应用 */
  useCase: string
  /** 主题色 */
  color: string
}

export interface ObserverApiShowcaseData {
  /** Observer 类型列表 */
  observers?: ObserverTypeInfo[]
  /** Observer API 总览说明 */
  overviewNote?: string
  title?: string
}

// ============================================================================
// GraphQLSchemaExplorer — GraphQL Schema 类型树 + 查询构建器
// ============================================================================

export type GraphQLOperationType = 'query' | 'mutation' | 'subscription'

export type GraphQLTypeKind = 'ObjectType' | 'ScalarType' | 'EnumType' | 'InputType'

export interface GraphQLField {
  /** 字段名 */
  name: string
  /** 字段类型（String/ID/Int/Boolean/[Type]! 等） */
  type: string
  /** 字段描述 */
  description: string
  /** 是否可查询 */
  queryable: boolean
}

export interface GraphQLTypeNode {
  /** 类型名 */
  name: string
  /** 类型种类 */
  kind: GraphQLTypeKind
  /** 类型描述 */
  description: string
  /** 字段列表 */
  fields: GraphQLField[]
  /** 主题色 */
  color: string
}

export interface GraphQLSchemaData {
  /** Schema 类型节点列表 */
  types?: GraphQLTypeNode[]
  /** Schema 定义代码 */
  schemaSnippet?: string
  /** 查询构建说明 */
  queryBuilderNote?: string
  title?: string
}

// ============================================================================
// ApiLayerComparisonVisualizer — API 层方案对比
// ============================================================================

export type ApiSolutionId = 'rest' | 'graphql' | 'trpc' | 'tanstack-query'

export interface ApiSolution {
  /** 方案标识 */
  id: ApiSolutionId
  /** 方案名称 */
  name: string
  /** 简称 */
  shortName: string
  /** 核心思想 */
  philosophy: string
  /** 代码示例 */
  codeSnippet: string
  /** 适用场景 */
  useCase: string
  /** 优点 */
  pros: string[]
  /** 缺点 */
  cons: string[]
  /** 主题色 */
  color: string
}

export interface ApiLayerComparisonData {
  /** API 方案列表 */
  solutions?: ApiSolution[]
  /** 选型说明 */
  selectionNote?: string
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const webApiGraphQLVisualizationMeta: Record<
  WebApiGraphQLVisualizationType,
  {
    type: WebApiGraphQLVisualizationType
    label: string
    identifier: string
    purpose: string
  }
> = {
  'web-components-lifecycle': {
    type: 'web-components-lifecycle',
    label: 'Web Components 生命周期',
    identifier: 'web-components-lifecycle',
    purpose: '5 个生命周期回调点击触发 + 自定义元素状态 + 触发日志',
  },
  'worker-data-transfer': {
    type: 'worker-data-transfer',
    label: 'Workers 数据传输',
    identifier: 'worker-data-transfer',
    purpose: '结构化克隆/Transferable/SharedArrayBuffer 三种传输方式切换 + 数据流向',
  },
  'observer-api-showcase': {
    type: 'observer-api-showcase',
    label: 'Observer API 演示',
    identifier: 'observer-api-showcase',
    purpose: 'Intersection/Resize/Mutation 三种 Observer 实时观察 + 日志记录',
  },
  'graphql-schema-explorer': {
    type: 'graphql-schema-explorer',
    label: 'GraphQL Schema 探索',
    identifier: 'graphql-schema-explorer',
    purpose: 'Schema 类型树浏览 + 字段选择 + 查询语句实时构建',
  },
  'api-layer-comparison': {
    type: 'api-layer-comparison',
    label: 'API 层方案对比',
    identifier: 'api-layer-comparison',
    purpose: 'REST/GraphQL/tRPC/TanStack Query 四种方案切换 + 代码与特性对比',
  },
}
