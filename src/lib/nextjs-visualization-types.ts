/**
 * Next.js 全栈框架可视化组件类型定义 - 模块 10
 *
 * 定义 7 种模块十专用全栈框架可视化组件的类型和数据接口：
 * - RenderModeComparator：渲染模式对比矩阵（CSR/SSR/SSG/ISR 时序模拟）
 * - RSCPayloadFlow：RSC Payload 数据流图
 * - ServerActionSandbox：Server Action 流程沙盒
 * - MiddlewareFlowExplorer：Middleware 流程探索器
 * - FrameworkDecisionWizard：框架选型决策向导
 * - IslandsArchDemo：Islands 架构水合演示
 * - RouteVsActionDecider：Route Handler vs Server Action 决策器
 */

// ============================================================================
// Next.js 全栈框架可视化组件类型联合
// ============================================================================

export type NextjsVisualizationType =
  | 'render-mode-comparator'
  | 'rsc-payload-flow'
  | 'server-action-sandbox'
  | 'middleware-flow-explorer'
  | 'framework-decision-wizard'
  | 'islands-arch-demo'
  | 'route-vs-action-decider'

// ============================================================================
// 渲染模式类型
// ============================================================================

export type RenderMode = 'CSR' | 'SSR' | 'SSG' | 'ISR'

// ============================================================================
// RenderModeComparator — 渲染模式对比矩阵
// ============================================================================

export interface RenderModeMetrics {
  /** 首字节时间（ms） */
  ttfb: number
  /** 首次内容绘制（ms） */
  fcp: number
  /** 最大内容绘制（ms） */
  lcp: number
  /** SEO 评分（0-100） */
  seo: number
  /** 数据新鲜度（0-100） */
  freshness: number
  /** 服务器负载（0-100，越高越重） */
  serverLoad: number
  /** 开发复杂度（0-100，越高越复杂） */
  devComplexity: number
}

export interface RenderScenario {
  id: string
  label: string
  description: string
  metrics: Record<RenderMode, RenderModeMetrics>
}

export interface RenderModeComparatorData {
  scenarios: RenderScenario[]
  title?: string
}

// ============================================================================
// RSCPayloadFlow — RSC Payload 数据流图
// ============================================================================

export interface RSCPayloadFlowData {
  /** 流式传输或完整传输 */
  mode?: 'streaming' | 'full'
  title?: string
}

// ============================================================================
// ServerActionSandbox — Server Action 流程沙盒
// ============================================================================

export interface ActionStep {
  title: string
  code: string
  /** 执行环境：服务端或客户端 */
  location: 'server' | 'client'
  description: string
}

export interface ActionScenario {
  id: string
  label: string
  outcome: 'success' | 'validation_error' | 'db_error'
  steps: ActionStep[]
}

export interface ServerActionSandboxData {
  scenarios: ActionScenario[]
  title?: string
}

// ============================================================================
// MiddlewareFlowExplorer — Middleware 流程探索器
// ============================================================================

export interface MiddlewareTestUrl {
  url: string
  expectedOutcome: string
}

export interface MiddlewareScenario {
  id: string
  label: string
  description: string
  matcher: string
  code: string
  testUrls: MiddlewareTestUrl[]
}

export interface MiddlewareFlowExplorerData {
  scenarios: MiddlewareScenario[]
  title?: string
}

// ============================================================================
// FrameworkDecisionWizard — 框架选型决策向导
// ============================================================================

export type FrameworkId = 'nextjs' | 'nuxt' | 'astro' | 'remix'

export interface FrameworkScores {
  performance: number
  seo: number
  devEfficiency: number
  ecosystem: number
}

export interface FrameworkProfile {
  id: FrameworkId
  label: string
  description: string
  scores: FrameworkScores
  bestFor: string
}

export interface FrameworkDecisionWizardData {
  frameworks: FrameworkProfile[]
  title?: string
}

// ============================================================================
// IslandsArchDemo — Islands 架构水合演示
// ============================================================================

export type HydrationDirective = 'client:load' | 'client:idle' | 'client:visible' | 'client:media'

export interface IslandsArchDemoData {
  title?: string
}

// ============================================================================
// RouteVsActionDecider — Route Handler vs Server Action 决策器
// ============================================================================

export interface RouteVsActionScenario {
  id: string
  label: string
  description: string
  recommendation: 'server-action' | 'route-handler'
  reason: string
  codeExample: string
}

export interface RouteVsActionDeciderData {
  scenarios: RouteVsActionScenario[]
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const nextjsVisualizationMeta: Record<
  NextjsVisualizationType,
  { type: NextjsVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'render-mode-comparator': {
    type: 'render-mode-comparator',
    label: '渲染模式对比矩阵',
    identifier: 'render-mode-comparator',
    purpose: 'CSR/SSR/SSG/ISR 时序模拟与指标对比',
  },
  'rsc-payload-flow': {
    type: 'rsc-payload-flow',
    label: 'RSC Payload 数据流',
    identifier: 'rsc-payload-flow',
    purpose: 'Server Component 序列化传输可视化',
  },
  'server-action-sandbox': {
    type: 'server-action-sandbox',
    label: 'Server Action 流程沙盒',
    identifier: 'server-action-sandbox',
    purpose: '提交→校验→写库→revalidate→redirect 步进',
  },
  'middleware-flow-explorer': {
    type: 'middleware-flow-explorer',
    label: 'Middleware 流程探索器',
    identifier: 'middleware-flow-explorer',
    purpose: '鉴权/A-B测试/国际化路由链路',
  },
  'framework-decision-wizard': {
    type: 'framework-decision-wizard',
    label: '框架选型决策向导',
    identifier: 'framework-decision-wizard',
    purpose: '四维度权重调整的框架推荐',
  },
  'islands-arch-demo': {
    type: 'islands-arch-demo',
    label: 'Islands 架构演示',
    identifier: 'islands-arch-demo',
    purpose: 'Astro 四种水合策略可视化',
  },
  'route-vs-action-decider': {
    type: 'route-vs-action-decider',
    label: 'Route vs Action 决策器',
    identifier: 'route-vs-action-decider',
    purpose: 'Server Action 与 Route Handler 选型',
  },
}
