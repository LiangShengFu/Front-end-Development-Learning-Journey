/**
 * Vue.js 进阶可视化组件类型定义 - 模块 12
 *
 * 定义 4 种模块十二专用 Vue 进阶 + Nuxt 全栈教学模拟组件的类型与数据接口：
 * - NuxtHybridRenderStudio：Nuxt 3 混合渲染策略交互沙盒（SSR/SSG/ISR/SPA 对比）
 * - ComposableFlowVisualizer：Composable 函数协同流向可视化
 * - CustomDirectiveWorkbench：自定义指令实时效果实践台
 * - KeepAliveCacheSimulator：KeepAlive 缓存策略（LRU/include/exclude/max）模拟器
 *
 * 与模块十一（vue-visualization-types.ts）共享 Vue 教学组件体系，
 * 模块十一的 ProxyReactivityTracker / PiniaStoreExplorer / PatchFlagVisualizer 等
 * 通过 data 扩展场景，零修改复用。
 */

// ============================================================================
// Vue 进阶可视化组件类型联合
// ============================================================================

export type VueAdvancedVisualizationType =
  | 'nuxt-hybrid-render-studio'
  | 'composable-flow-visualizer'
  | 'custom-directive-workbench'
  | 'keepalive-cache-simulator'

// ============================================================================
// NuxtHybridRenderStudio — Nuxt 3 混合渲染策略沙盒
// ============================================================================

/** 渲染模式标识 */
export type NuxtRenderMode = 'SSR' | 'SSG' | 'ISR' | 'SPA'

/** 单个路由在某种渲染模式下的性能指标 */
export interface NuxtRouteMetrics {
  /** 首屏字节时间（ms），教学模拟值 */
  ttfb: number
  /** SEO 友好度评分 1-5 */
  seo: number
  /** 服务端负载评分 1-5（越高越重） */
  serverLoad: number
  /** 内容新鲜度评分 1-5 */
  freshness: number
  /** 数据传输路径步骤描述 */
  dataFlow: string[]
}

/** 一个页面路径在四种渲染模式下的完整指标 */
export interface NuxtRouteScenario {
  /** 路由路径，如 '/' 或 '/blog/**' */
  path: string
  /** 路径显示名 */
  label: string
  /** 路径说明 */
  description: string
  /** 四种渲染模式对应的指标 */
  metrics: Record<NuxtRenderMode, NuxtRouteMetrics>
}

export interface NuxtHybridRenderStudioData {
  scenarios: NuxtRouteScenario[]
  title?: string
}

// ============================================================================
// ComposableFlowVisualizer — Composable 协同流向可视化
// ============================================================================

/** 单个 Composable 函数节点 */
export interface ComposableNode {
  /** 函数名，如 useAuth */
  name: string
  /** 输入依赖（响应式来源） */
  inputs: string[]
  /** 输出（暴露的响应式状态/方法） */
  outputs: string[]
  /** 函数实现代码 */
  code: string
}

/** Composable 之间的依赖连线 */
export interface ComposableConnection {
  /** 来源 Composable 名称 */
  from: string
  /** 目标 Composable 名称 */
  to: string
  /** 连线说明（传递的数据） */
  label: string
}

/** 一条 Composable 组合链 */
export interface ComposableChain {
  id: string
  label: string
  description: string
  composables: ComposableNode[]
  connections: ComposableConnection[]
}

export interface ComposableFlowVisualizerData {
  scenarios: ComposableChain[]
  title?: string
}

// ============================================================================
// CustomDirectiveWorkbench — 自定义指令实践台
// ============================================================================

/** 指令生命周期钩子说明 */
export interface DirectiveHook {
  name: string
  description: string
}

/** 单个自定义指令模板 */
export interface DirectiveTemplate {
  id: string
  label: string
  description: string
  /** 指令定义代码 */
  code: string
  hooks: DirectiveHook[]
}

export interface CustomDirectiveWorkbenchData {
  templates: DirectiveTemplate[]
  title?: string
}

// ============================================================================
// KeepAliveCacheSimulator — KeepAlive 缓存策略模拟器
// ============================================================================

/** 模拟的可缓存 Tab 页 */
export interface KeepAliveTab {
  id: string
  label: string
}

export interface KeepAliveCacheSimulatorData {
  /** 模拟的 Tab 列表，默认内置 5 个 */
  tabs?: KeepAliveTab[]
  /** 默认最大缓存数，默认 3 */
  defaultMax?: number
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const vueAdvancedVisualizationMeta: Record<
  VueAdvancedVisualizationType,
  { type: VueAdvancedVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'nuxt-hybrid-render-studio': {
    type: 'nuxt-hybrid-render-studio',
    label: 'Nuxt 混合渲染沙盒',
    identifier: 'nuxt-hybrid-render-studio',
    purpose: 'SSR/SSG/ISR/SPA 四种渲染策略交互式对比',
  },
  'composable-flow-visualizer': {
    type: 'composable-flow-visualizer',
    label: 'Composable 协同图',
    identifier: 'composable-flow-visualizer',
    purpose: '多个 Composable 函数依赖联动与逻辑复用流向',
  },
  'custom-directive-workbench': {
    type: 'custom-directive-workbench',
    label: '自定义指令实践台',
    identifier: 'custom-directive-workbench',
    purpose: 'v-focus/v-debounce/v-permission/v-lazy 效果实时预览',
  },
  'keepalive-cache-simulator': {
    type: 'keepalive-cache-simulator',
    label: 'KeepAlive 缓存模拟器',
    identifier: 'keepalive-cache-simulator',
    purpose: 'LRU 缓存淘汰、include/exclude/max 策略可视化',
  },
}
