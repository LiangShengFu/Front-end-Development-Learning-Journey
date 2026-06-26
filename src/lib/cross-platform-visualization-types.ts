/**
 * 跨平台移动端开发可视化组件类型定义 - 模块 14
 *
 * 定义 7 种模块十四专用跨平台教学模拟组件的类型和数据接口：
 * - MobileAdaptationSandbox：移动端适配沙盒（rem/vw/安全区域/1px 实时预览）
 * - RNArchitectureComparator：React Native 新旧架构对比（Bridge vs JSI）
 * - ExpoRouterTreeVisualizer：Expo Router 文件约定式路由树可视化
 * - CapacitorPluginBridge：Capacitor 插件 Web-to-Native 桥接流程
 * - ServiceWorkerCacheStrategies：Service Worker 缓存策略（CacheFirst/SWR/NetworkOnly）
 * - PwaPushFlowVisualizer：PWA 推送通知端到端流程
 * - CrossPlatformSelector：跨平台方案选型器（加权评分动态排序）
 */

// ============================================================================
// 跨平台可视化组件类型联合
// ============================================================================

export type CrossPlatformVisualizationType =
  | 'mobile-adaptation-sandbox'
  | 'rn-architecture-comparator'
  | 'expo-router-tree-visualizer'
  | 'capacitor-plugin-bridge'
  | 'service-worker-cache-strategies'
  | 'pwa-push-flow-visualizer'
  | 'cross-platform-selector'

// ============================================================================
// MobileAdaptationSandbox — 移动端适配沙盒
// ============================================================================

export type AdaptationScheme = 'rem' | 'vw'

export type SafeAreaType = 'none' | 'notch' | 'home-indicator'

export type OnePixelSolution = 'transform' | 'viewport' | 'border-image'

export interface AdaptationPreset {
  /** 预设标识 */
  id: string
  /** 预设名称 */
  label: string
  /** 适配方案 */
  scheme: AdaptationScheme
  /** 设计稿宽度 */
  designWidth: number
  /** 设备 DPR */
  dpr: number
  /** 安全区域类型 */
  safeArea: SafeAreaType
  /** rem 方案根字号（px） */
  rootFontSize?: number
  /** 1px 问题解决方案 */
  onePixelSolution: OnePixelSolution
}

export interface MobileAdaptationSandboxData {
  presets: AdaptationPreset[]
  title?: string
}

// ============================================================================
// RNArchitectureComparator — RN 新旧架构对比
// ============================================================================

export type RNArchitectureId = 'legacy' | 'new'

export interface RNFlowNode {
  /** 节点标识 */
  id: string
  /** 节点显示名称 */
  label: string
  /** 节点子标题 */
  sub?: string
  /** 节点颜色 */
  color: string
  /** 节点背景色 */
  bg: string
}

export interface RNFlowEdge {
  /** 源节点 */
  from: string
  /** 目标节点 */
  to: string
  /** 边标签 */
  label: string
  /** 是否异步（虚线） */
  async?: boolean
}

export interface RNArchitectureSpec {
  /** 架构标识 */
  id: RNArchitectureId
  /** 架构名称 */
  label: string
  /** 描述 */
  description: string
  /** 通信方式 */
  communication: string
  /** 流程节点 */
  nodes: RNFlowNode[]
  /** 流程边 */
  edges: RNFlowEdge[]
  /** 模拟延迟（ms） */
  latencyMs: number
  /** 是否为新架构 */
  isNew: boolean
}

export interface RNArchitectureComparatorData {
  architectures: RNArchitectureSpec[]
  title?: string
}

// ============================================================================
// ExpoRouterTreeVisualizer — Expo Router 路由树
// ============================================================================

export type ExpoRouteType = 'directory' | 'route' | 'layout' | 'group'

export interface ExpoRouteNode {
  /** 节点路径 */
  path: string
  /** 节点名称 */
  label: string
  /** 节点类型 */
  type: ExpoRouteType
  /** 路由 pattern */
  routePattern?: string
  /** 子节点 */
  children?: ExpoRouteNode[]
  /** 页面代码片段 */
  codeSnippet?: string
  /** 代码语言 */
  codeLanguage?: string
}

export interface ExpoRouterTreeVisualizerData {
  routeTree: ExpoRouteNode
  title?: string
}

// ============================================================================
// CapacitorPluginBridge — Capacitor 插件桥接
// ============================================================================

export type CapacitorPlatform = 'web' | 'ios' | 'android'

export interface BridgeStep {
  /** 步骤标识 */
  id: string
  /** 步骤名称 */
  label: string
  /** 描述 */
  description: string
  /** 代码片段 */
  code?: string
}

export interface BridgePlatformSpec {
  /** 平台标识 */
  id: CapacitorPlatform
  /** 平台名称 */
  label: string
  /** 是否有原生实现 */
  hasNativeImpl: boolean
  /** 桥接步骤 */
  steps: BridgeStep[]
  /** 结果描述 */
  result: string
}

export interface CapacitorPluginExample {
  /** 示例标识 */
  id: string
  /** 示例名称 */
  label: string
  /** 描述 */
  description: string
  /** 插件名 */
  pluginName: string
  /** Web 调用代码 */
  webCallCode: string
  /** 各平台桥接详情 */
  platforms: BridgePlatformSpec[]
}

export interface CapacitorPluginBridgeData {
  examples: CapacitorPluginExample[]
  title?: string
}

// ============================================================================
// ServiceWorkerCacheStrategies — SW 缓存策略
// ============================================================================

export type CacheStrategyId = 'cache-first' | 'stale-while-revalidate' | 'network-only'

export interface CacheFlowStep {
  /** 步骤标识 */
  id: string
  /** 步骤名称 */
  label: string
  /** 描述 */
  description: string
  /** 步骤类型 */
  kind: 'check-cache' | 'cache-hit' | 'cache-miss' | 'fetch-network' | 'store-cache' | 'respond' | 'background-update'
}

export interface CacheStrategySpec {
  /** 策略标识 */
  id: CacheStrategyId
  /** 策略名称 */
  label: string
  /** 描述 */
  description: string
  /** Workbox 代码 */
  code: string
  /** 步骤序列 */
  steps: CacheFlowStep[]
  /** 是否命中缓存 */
  cacheHit: boolean
  /** 响应来源 */
  responseSource: 'cache' | 'network' | 'both'
  /** 模拟延迟（ms） */
  latencyMs: number
  /** 适用场景 */
  useCase: string
  /** 是否推荐 */
  isRecommended?: boolean
}

export interface ServiceWorkerCacheStrategiesData {
  strategies: CacheStrategySpec[]
  title?: string
}

// ============================================================================
// PwaPushFlowVisualizer — PWA 推送流程
// ============================================================================

export type PushStageId = 'subscribe' | 'server-push' | 'sw-receive' | 'notify'

export interface PushStageSpec {
  /** 阶段标识 */
  id: PushStageId
  /** 阶段名称 */
  label: string
  /** 描述 */
  description: string
  /** 代码片段 */
  code: string
  /** 代码语言 */
  codeLanguage?: string
}

export interface PwaPushFlowVisualizerData {
  stages: PushStageSpec[]
  title?: string
}

// ============================================================================
// CrossPlatformSelector — 跨平台方案选型器
// ============================================================================

export interface SelectionDimension {
  /** 维度标识 */
  id: string
  /** 维度名称 */
  label: string
  /** 默认权重（1-5） */
  defaultWeight: number
  /** 维度说明 */
  description?: string
}

export interface CrossPlatformSolution {
  /** 方案标识 */
  id: string
  /** 方案名称 */
  name: string
  /** 实现语言 */
  language: string
  /** 各维度评分（1-5） */
  scores: Record<string, number>
  /** 优势 */
  pros: string[]
  /** 劣势 */
  cons: string[]
  /** 主题色 */
  color: string
}

export interface CrossPlatformSelectorData {
  dimensions: SelectionDimension[]
  solutions: CrossPlatformSolution[]
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const crossPlatformVisualizationMeta: Record<
  CrossPlatformVisualizationType,
  { type: CrossPlatformVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'mobile-adaptation-sandbox': {
    type: 'mobile-adaptation-sandbox',
    label: '移动端适配沙盒',
    identifier: 'mobile-adaptation-sandbox',
    purpose: 'rem/vw 方案切换、设计稿宽度/DPR/安全区域调整、1px 问题实时预览',
  },
  'rn-architecture-comparator': {
    type: 'rn-architecture-comparator',
    label: 'RN 新旧架构对比',
    identifier: 'rn-architecture-comparator',
    purpose: 'Bridge 序列化异步通信 vs JSI 同步通信的数据流与延迟对比',
  },
  'expo-router-tree-visualizer': {
    type: 'expo-router-tree-visualizer',
    label: 'Expo Router 路由树',
    identifier: 'expo-router-tree-visualizer',
    purpose: 'app/ 目录文件约定式路由树 → 路由 pattern 映射，可点击查看页面代码',
  },
  'capacitor-plugin-bridge': {
    type: 'capacitor-plugin-bridge',
    label: 'Capacitor 插件桥接',
    identifier: 'capacitor-plugin-bridge',
    purpose: 'Web 调用 → registerPlugin 分发 → Web fallback/原生实现 → 返回结果',
  },
  'service-worker-cache-strategies': {
    type: 'service-worker-cache-strategies',
    label: 'SW 缓存策略',
    identifier: 'service-worker-cache-strategies',
    purpose: 'CacheFirst / StaleWhileRevalidate / NetworkOnly 三种策略可触发请求对比',
  },
  'pwa-push-flow-visualizer': {
    type: 'pwa-push-flow-visualizer',
    label: 'PWA 推送流程',
    identifier: 'pwa-push-flow-visualizer',
    purpose: '订阅 → 服务端推送 → SW 接收 → 展示通知端到端流程',
  },
  'cross-platform-selector': {
    type: 'cross-platform-selector',
    label: '跨平台方案选型器',
    identifier: 'cross-platform-selector',
    purpose: '按需求维度加权评分动态排序，高亮推荐方案',
  },
}
