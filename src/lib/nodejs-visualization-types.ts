/**
 * Node.js 与全栈可视化组件类型定义 - 模块 17
 *
 * 定义 5 种模块十七专用 Node.js/全栈教学模拟组件的类型和数据接口：
 * - EventLoopVisualizer：Node.js 事件循环六阶段（timers/pending/idle-prepare/poll/check/close）
 * - ModuleSystemComparator：CommonJS vs ESM 模块系统对比
 * - FileSystemAsyncComparator：异步文件 IO 三种范式（同步/回调/Promise）对比
 * - ExpressMiddlewareFlow：Express 中间件洋葱模型（请求穿透 + 响应逆向）
 * - RestfulApiDesigner：RESTful API 设计矩阵（资源 × HTTP 方法）
 *
 * 另跨模块复用模块十六的 HttpRequestResponseFlow / TcpHandshakeVisualizer（服务端视角）。
 * 所有组件均为教学模拟，不执行真实 Node.js 进程/网络请求。
 */

// ============================================================================
// Node.js 可视化组件类型联合
// ============================================================================

export type NodejsVisualizationType =
  | 'event-loop-visualizer'
  | 'module-system-comparator'
  | 'filesystem-async-comparator'
  | 'express-middleware-flow'
  | 'restful-api-designer'

// ============================================================================
// EventLoopVisualizer — Node.js 事件循环六阶段
// ============================================================================

export type EventLoopPhaseId =
  | 'timers'
  | 'pending-callbacks'
  | 'idle-prepare'
  | 'poll'
  | 'check'
  | 'close-callbacks'

export interface EventLoopPhase {
  /** 阶段标识 */
  id: EventLoopPhaseId
  /** 阶段名称 */
  name: string
  /** 描述 */
  description: string
  /** 处理的回调类型 */
  callbacks: string[]
  /** 示例 API */
  examples: string[]
  /** 主题色 */
  color: string
}

export interface EventLoopVisualizerData {
  phases?: EventLoopPhase[]
  /** 微任务说明（process.nextTick / Promise） */
  microtasksNote?: string
  title?: string
}

// ============================================================================
// ModuleSystemComparator — CommonJS vs ESM 对比
// ============================================================================

export type ModuleSystem = 'commonjs' | 'esm'

export interface ModuleSystemDimension {
  /** 维度标识 */
  id: string
  /** 维度名称 */
  dimension: string
  /** CommonJS 表现 */
  commonjs: string
  /** ESM 表现 */
  esm: string
  /** 推荐方案 */
  recommended: ModuleSystem | 'both' | 'none'
  /** 主题色 */
  color: string
}

export interface ModuleSystemComparatorData {
  dimensions?: ModuleSystemDimension[]
  /** CommonJS 语法示例 */
  commonjsExample?: string
  /** ESM 语法示例 */
  esmExample?: string
  title?: string
}

// ============================================================================
// FileSystemAsyncComparator — 异步文件 IO 三种范式对比
// ============================================================================

export type FileSystemParadigmId = 'sync' | 'callback' | 'promise'

export interface FileSystemParadigm {
  /** 范式标识 */
  id: FileSystemParadigmId
  /** 范式名称 */
  name: string
  /** 描述 */
  description: string
  /** 是否阻塞主线程 */
  blocking: boolean
  /** 代码示例 */
  code: string
  /** 代码语言 */
  codeLanguage?: string
  /** 优点 */
  pros: string[]
  /** 缺点 */
  cons: string[]
  /** 适用场景 */
  useCase: string
  /** 主题色 */
  color: string
}

export interface FileSystemAsyncComparatorData {
  paradigms?: FileSystemParadigm[]
  title?: string
}

// ============================================================================
// ExpressMiddlewareFlow — Express 中间件洋葱模型
// ============================================================================

export type MiddlewareDirection = 'request' | 'response'

export interface MiddlewareLayer {
  /** 中间件标识 */
  id: string
  /** 中间件名称 */
  name: string
  /** 描述 */
  description: string
  /** 代码示例 */
  code?: string
  /** 是否错误处理中间件（4 参数） */
  isErrorHandler?: boolean
  /** 主题色 */
  color: string
}

export interface ExpressMiddlewareFlowData {
  middlewares?: MiddlewareLayer[]
  /** 洋葱模型说明 */
  onionModelNote?: string
  title?: string
}

// ============================================================================
// RestfulApiDesigner — RESTful API 设计矩阵
// ============================================================================

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RestfulApiCell {
  /** HTTP 方法 */
  method: HttpMethod
  /** 资源路径示例 */
  path: string
  /** 语义 */
  semantics: string
  /** 是否幂等 */
  idempotent: boolean
  /** 是否安全（不改变状态） */
  safe: boolean
  /** 典型状态码 */
  statusCodes: string
  /** 主题色 */
  color: string
}

export interface RestfulApiResource {
  /** 资源标识 */
  id: string
  /** 资源名称 */
  name: string
  /** 资源路径 */
  basePath: string
  /** 该资源的 API 单元格（按 GET/POST/PUT/PATCH/DELETE 顺序） */
  cells: RestfulApiCell[]
}

export interface RestfulApiDesignerData {
  resources?: RestfulApiResource[]
  /** 设计原则 */
  principles?: string[]
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const nodejsVisualizationMeta: Record<
  NodejsVisualizationType,
  { type: NodejsVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'event-loop-visualizer': {
    type: 'event-loop-visualizer',
    label: 'Node.js 事件循环六阶段',
    identifier: 'event-loop-visualizer',
    purpose: 'timers/pending/idle-prepare/poll/check/close 六阶段流转 + 微任务优先级',
  },
  'module-system-comparator': {
    type: 'module-system-comparator',
    label: 'CommonJS vs ESM 对比',
    identifier: 'module-system-comparator',
    purpose: '语法/加载时机/循环依赖/tree-shaking 多维度对比 + 推荐方案',
  },
  'filesystem-async-comparator': {
    type: 'filesystem-async-comparator',
    label: '异步文件 IO 三范式',
    identifier: 'filesystem-async-comparator',
    purpose: '同步/回调/Promise 三种范式阻塞特性与适用场景对比',
  },
  'express-middleware-flow': {
    type: 'express-middleware-flow',
    label: 'Express 中间件洋葱模型',
    identifier: 'express-middleware-flow',
    purpose: '请求依次穿透 → 响应逆向返回，含 next() 与错误中间件',
  },
  'restful-api-designer': {
    type: 'restful-api-designer',
    label: 'RESTful API 设计矩阵',
    identifier: 'restful-api-designer',
    purpose: '资源 × HTTP 方法矩阵，点击单元格查看语义/幂等/状态码',
  },
}
