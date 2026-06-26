/**
 * 微前端与前端架构设计可视化组件类型定义 - 模块 22
 *
 * 定义 5 种模块二十二专用微前端教学模拟组件的类型和数据接口：
 * - MFArchitectureGraphVisualizer：微前端架构演进图（单体 → 微前端 + 共享层切换）
 * - MFSandboxIsolationVisualizer：Proxy 沙箱隔离演示（有沙箱 vs 无沙箱对比）
 * - MFModuleFederationVisualizer：Module Federation 配置演示（Host / Remote / Shared）
 * - MFQiankunLifecycleVisualizer：qiankun 生命周期（bootstrap → mount → unmount）
 * - MFCssIsolationVisualizer：CSS 隔离方案对比（Shadow DOM / Scoped / 前缀）
 *
 * 另复用通用组件池：KnowledgeGraph / CompareTable / Accordion / QuizCard。
 * 所有组件均为教学模拟，Proxy 沙箱为受控简化版，不执行任意用户代码。
 */

// ============================================================================
// 微前端可视化组件类型联合
// ============================================================================

export type MicrofrontendVisualizationType =
  | 'mf-architecture-graph'
  | 'mf-sandbox-isolation'
  | 'mf-module-federation'
  | 'mf-qiankun-lifecycle'
  | 'mf-css-isolation'

// ============================================================================
// MFArchitectureGraphVisualizer — 微前端架构演进图
// ============================================================================

/** 架构层级标识 */
export type MFArchLayerId = 'monolith' | 'microfrontend' | 'shared'

/** 节点视觉变体 */
export type MFArchNodeVariant = 'center' | 'secondary' | 'leaf'

export interface MFArchGraphNode {
  /** 节点标识 */
  id: string
  /** 节点名称 */
  label: string
  /** 所属层级 */
  layer: MFArchLayerId
  /** 描述（选中时展示） */
  description?: string
  /** 顶部位置（百分比，如 '10%'） */
  top: string
  /** 左侧位置（百分比，如 '40%'） */
  left: string
  /** 视觉变体（center 主节点 / secondary 子节点 / leaf 叶子节点） */
  variant?: MFArchNodeVariant
  /** 主题色 */
  color?: string
}

export interface MFArchGraphEdge {
  /** 起点节点 id */
  from: string
  /** 终点节点 id */
  to: string
  /** 连线标签 */
  label?: string
}

export interface MFArchitectureGraphData {
  /** 架构图标题 */
  title?: string
  /** 节点列表 */
  nodes?: MFArchGraphNode[]
  /** 连线列表 */
  edges?: MFArchGraphEdge[]
  /** 演进说明 */
  evolutionNote?: string
}

// ============================================================================
// MFSandboxIsolationVisualizer — Proxy 沙箱隔离演示
// ============================================================================

export interface MFSandboxScenario {
  /** 场景标识 */
  id: string
  /** 场景名称 */
  label: string
  /** 场景描述 */
  description: string
  /** 主应用全局状态（演示前） */
  globalState: Record<string, unknown>
  /** 子应用尝试写入的状态 */
  subAppState: Record<string, unknown>
  /** 是否默认启用隔离 */
  isolated: boolean
}

export interface MFSandboxIsolationData {
  /** 场景列表 */
  scenarios?: MFSandboxScenario[]
  /** 默认场景 id */
  defaultScenario?: string
  /** 沙箱原理说明 */
  principleNote?: string
  title?: string
}

// ============================================================================
// MFModuleFederationVisualizer — Module Federation 配置演示
// ============================================================================

/** 配置角色标识 */
export type MFRoleId = 'host' | 'remote' | 'shared'

export interface MFConfigRole {
  /** 角色标识 */
  id: MFRoleId
  /** 角色名称 */
  name: string
  /** 角色说明 */
  description: string
  /** Webpack 配置代码示例 */
  codeSnippet: string
  /** 关键字段说明 */
  fields: Array<{
    /** 字段名 */
    name: string
    /** 作用说明 */
    purpose: string
  }>
  /** 主题色 */
  color: string
}

export interface MFModuleFederationData {
  /** 角色列表 */
  roles?: MFConfigRole[]
  /** 运行时共享说明 */
  sharedNote?: string
  title?: string
}

// ============================================================================
// MFQiankunLifecycleVisualizer — qiankun 生命周期
// ============================================================================

/** 生命周期阶段标识 */
export type MFLifecycleStageId = 'bootstrap' | 'mount' | 'unmount' | 'update'

export interface MFLifecycleStage {
  /** 阶段标识 */
  id: MFLifecycleStageId
  /** 阶段名称 */
  name: string
  /** 触发时机 */
  trigger: string
  /** 描述 */
  description: string
  /** 代码示例 */
  codeSnippet: string
  /** 执行次数（once / every） */
  frequency: 'once' | 'every'
  /** 主题色 */
  color: string
}

export interface MFQiankunLifecycleData {
  /** 阶段列表 */
  stages?: MFLifecycleStage[]
  /** 通信机制说明 */
  communicationNote?: string
  title?: string
}

// ============================================================================
// MFCssIsolationVisualizer — CSS 隔离方案对比
// ============================================================================

/** CSS 隔离方案标识 */
export type MFCssIsolationId = 'shadow-dom' | 'scoped' | 'prefix' | 'css-modules'

export interface MFCssIsolationScheme {
  /** 方案标识 */
  id: MFCssIsolationId
  /** 方案名称 */
  name: string
  /** 核心原理 */
  principle: string
  /** 代码示例 */
  codeSnippet: string
  /** 隔离强度（weak / medium / strong） */
  isolation: 'weak' | 'medium' | 'strong'
  /** 优点 */
  pros: string[]
  /** 缺点 */
  cons: string[]
  /** 适用场景 */
  useCase: string
  /** 主题色 */
  color: string
}

export interface MFCssIsolationData {
  /** 方案列表 */
  schemes?: MFCssIsolationScheme[]
  /** 对比说明 */
  compareNote?: string
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const microfrontendVisualizationMeta: Record<
  MicrofrontendVisualizationType,
  {
    type: MicrofrontendVisualizationType
    label: string
    identifier: string
    purpose: string
  }
> = {
  'mf-architecture-graph': {
    type: 'mf-architecture-graph',
    label: '微前端架构演进图',
    identifier: 'mf-architecture-graph',
    purpose: '单体 → 微前端 → 共享层三层架构演进 + 节点高亮切换',
  },
  'mf-sandbox-isolation': {
    type: 'mf-sandbox-isolation',
    label: 'Proxy 沙箱隔离演示',
    identifier: 'mf-sandbox-isolation',
    purpose: '有沙箱 vs 无沙箱对比 + 子应用写入 window 的隔离效果',
  },
  'mf-module-federation': {
    type: 'mf-module-federation',
    label: 'Module Federation 配置',
    identifier: 'mf-module-federation',
    purpose: 'Host / Remote / Shared 三角色配置切换 + shared 共享演示',
  },
  'mf-qiankun-lifecycle': {
    type: 'mf-qiankun-lifecycle',
    label: 'qiankun 生命周期',
    identifier: 'mf-qiankun-lifecycle',
    purpose: 'bootstrap → mount → unmount 生命周期阶段穿透动画',
  },
  'mf-css-isolation': {
    type: 'mf-css-isolation',
    label: 'CSS 隔离方案对比',
    identifier: 'mf-css-isolation',
    purpose: 'Shadow DOM / Scoped / 前缀 / CSS Modules 四方案切换对比',
  },
}
