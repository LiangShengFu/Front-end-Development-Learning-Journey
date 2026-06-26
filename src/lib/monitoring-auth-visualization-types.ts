/**
 * 监控埋点与认证授权可视化组件类型定义 - 模块 23
 *
 * 定义 7 种模块二十三专用监控/认证教学模拟组件的类型和数据接口：
 * - I18nFormatPlayground：Intl API 格式化交互演示（日期/数字/货币/复数）
 * - AuthFlowGraph：OAuth 2.0 授权流程可视化（授权码 / PKCE / JWT 模式切换）
 * - JWTPayloadDecoder：JWT 结构解码与安全演示（Header.Payload.Signature）
 * - ErrorMonitoringDashboard：前端错误监控面板（error / unhandledrejection / 资源错误）
 * - PerformanceObserverDemo：PerformanceObserver + Web Vitals 采集演示
 * - UserTrackingFunnel：用户行为埋点漏斗（PV / UV / 点击 / 转化）
 * - RBACPermissionMatrix：RBAC 权限矩阵 + 按钮级权限控制演示
 *
 * 另复用通用组件池：KnowledgeGraph / CompareTable / Timeline / QuizCard / Accordion。
 * 所有组件均为教学模拟，不执行真实网络请求与身份认证。
 */

// ============================================================================
// 监控认证可视化组件类型联合
// ============================================================================

export type MonitoringAuthVisualizationType =
  | 'i18n-format-playground'
  | 'auth-flow-graph'
  | 'jwt-payload-decoder'
  | 'error-monitoring-dashboard'
  | 'performance-observer-demo'
  | 'user-tracking-funnel'
  | 'rbac-permission-matrix'

// ============================================================================
// I18nFormatPlayground — Intl API 格式化交互演示
// ============================================================================

export type I18nFormatType = 'date' | 'number' | 'currency' | 'plural'

export interface I18nFormatScenario {
  /** 场景标识 */
  id: string
  /** 场景标签 */
  label: string
  /** BCP 47 语言标签，如 zh-CN / de-DE / ja-JP */
  locale: string
  /** 格式化类型 */
  type: I18nFormatType
  /** 输入值（日期为 ISO 字符串，数字/货币为数值） */
  value: string | number
  /** Intl 格式化选项 */
  options: Record<string, unknown>
  /** 预期输出（用于教学对照） */
  expected: string
  /** 场景说明 */
  note?: string
}

export interface I18nFormatPlaygroundData {
  /** 默认场景 id */
  defaultScenario?: string
  /** 场景列表 */
  scenarios?: I18nFormatScenario[]
  /** ICU MessageFormat 示例 */
  icuExamples?: Array<{
    /** 示例标识 */
    id: string
    /** 示例说明 */
    label: string
    /** ICU 模板 */
    template: string
    /** 参数 */
    params: Record<string, string | number>
    /** 解析结果 */
    result: string
  }>
  /** 演示说明 */
  note?: string
  title?: string
}

// ============================================================================
// AuthFlowGraph — OAuth 2.0 授权流程可视化
// ============================================================================

export type AuthFlowMode = 'auth-code' | 'auth-code-pkce' | 'jwt-flow' | 'client-credentials'

export type AuthFlowActor = 'user' | 'client' | 'auth-server' | 'resource-server'

export type AuthFlowStepVariant = 'start' | 'process' | 'decision' | 'end' | 'highlight'

export interface AuthFlowStep {
  /** 步骤标识 */
  id: string
  /** 步骤名称 */
  label: string
  /** 参与角色 */
  actor: AuthFlowActor
  /** 顶部位置（百分比） */
  top: string
  /** 左侧位置（百分比） */
  left: string
  /** 视觉变体 */
  variant?: AuthFlowStepVariant
  /** 描述（选中展示） */
  description?: string
}

export interface AuthFlowEdge {
  /** 起点步骤 id */
  from: string
  /** 终点步骤 id */
  to: string
  /** 连线标签 */
  label?: string
  /** 是否高亮（PKCE 模式下额外步骤） */
  highlight?: boolean
}

export interface AuthFlowModeConfig {
  /** 模式标识 */
  id: AuthFlowMode
  /** 模式名称 */
  name: string
  /** 模式说明 */
  description: string
  /** 适用场景 */
  useCase: string
  /** 安全要点 */
  securityNote: string
  /** 步骤列表 */
  steps: AuthFlowStep[]
  /** 连线列表 */
  edges: AuthFlowEdge[]
  /** 主题色 */
  color: string
}

export interface AuthFlowGraphData {
  /** 模式列表 */
  modes?: AuthFlowModeConfig[]
  /** 默认模式 id */
  defaultMode?: AuthFlowMode
  /** 流程对比说明 */
  compareNote?: string
  title?: string
}

// ============================================================================
// JWTPayloadDecoder — JWT 结构解码与安全演示
// ============================================================================

export interface JWTSegment {
  /** 段标识 */
  id: 'header' | 'payload' | 'signature'
  /** 段名称 */
  name: string
  /** 原始 Base64URL 内容 */
  raw: string
  /** 解码后的 JSON / 说明 */
  decoded: string
  /** 关键字段说明 */
  fields?: Array<{
    /** 字段名 */
    name: string
    /** 值 */
    value: string
    /** 说明 */
    description: string
    /** 是否敏感 */
    sensitive?: boolean
  }>
  /** 主题色 */
  color: string
}

export interface JWTSecurityTip {
  /** 提示标识 */
  id: string
  /** 提示标题 */
  title: string
  /** 提示内容 */
  content: string
  /** 严重等级 */
  level: 'info' | 'warning' | 'danger'
}

export interface JWTPayloadDecoderData {
  /** 完整 JWT 字符串 */
  token?: string
  /** 三段解码内容 */
  segments?: JWTSegment[]
  /** 安全提示 */
  securityTips?: JWTSecurityTip[]
  /** 演示说明 */
  note?: string
  title?: string
}

// ============================================================================
// ErrorMonitoringDashboard — 前端错误监控面板
// ============================================================================

export type ErrorType = 'js-error' | 'unhandled-rejection' | 'resource-error' | 'console-error'

export type ErrorSeverity = 'fatal' | 'error' | 'warning' | 'info'

export interface ErrorEvent {
  /** 事件标识 */
  id: string
  /** 错误类型 */
  type: ErrorType
  /** 错误消息 */
  message: string
  /** 源文件 */
  source?: string
  /** 行列号 */
  line?: number
  /** 列号 */
  col?: number
  /** 堆栈 */
  stack?: string
  /** 严重等级 */
  severity: ErrorSeverity
  /** 发生时间 */
  timestamp: string
  /** 用户代理 */
  userAgent?: string
  /** Source Map 还原后位置 */
  originalSource?: string
  /** 触发次数 */
  count?: number
}

export interface ErrorCaptureStrategy {
  /** 策略标识 */
  id: string
  /** 策略名称 */
  name: string
  /** 监听方式 */
  listener: string
  /** 代码示例 */
  codeSnippet: string
  /** 捕获范围 */
  scope: string
  /** 注意事项 */
  caveat: string
  /** 主题色 */
  color: string
}

export interface ErrorMonitoringDashboardData {
  /** 错误事件列表 */
  events?: ErrorEvent[]
  /** 捕获策略列表 */
  strategies?: ErrorCaptureStrategy[]
  /** Source Map 说明 */
  sourceMapNote?: string
  /** 演示说明 */
  note?: string
  title?: string
}

// ============================================================================
// PerformanceObserverDemo — PerformanceObserver + Web Vitals 采集
// ============================================================================

export type WebVitalCategory = 'loading' | 'interactivity' | 'visual-stability'

export interface PerformanceMetricEntry {
  /** 指标标识 */
  id: string
  /** 指标名称 */
  name: string
  /** 缩写 */
  abbr: string
  /** 类别 */
  category: WebVitalCategory
  /** PerformanceObserver entry type */
  entryType: string
  /** 采集代码 */
  codeSnippet: string
  /** 模拟采集值 */
  sampleValue: string
  /** 评分（good/needs-improvement/poor） */
  rating: 'good' | 'needs-improvement' | 'poor'
  /** 说明 */
  description: string
  /** 主题色 */
  color: string
}

export interface PerformanceObserverDemoData {
  /** 指标列表 */
  metrics?: PerformanceMetricEntry[]
  /** PerformanceObserver 基础代码 */
  baseCode?: string
  /** 采集说明 */
  collectNote?: string
  /** 演示说明 */
  note?: string
  title?: string
}

// ============================================================================
// UserTrackingFunnel — 用户行为埋点漏斗
// ============================================================================

export type TrackingEventType = 'pv' | 'uv' | 'click' | 'expose' | 'conversion' | 'custom'

export interface TrackingFunnelStep {
  /** 阶段标识 */
  id: string
  /** 阶段名称 */
  name: string
  /** 用户数（UV） */
  userCount: number
  /** 页面浏览数（PV） */
  pvCount: number
  /** 转化率（相对上一阶段，百分比） */
  conversionRate: number
  /** 流失原因 */
  dropReason: string
  /** 主题色 */
  color: string
}

export interface TrackingStrategy {
  /** 策略标识 */
  id: string
  /** 策略名称 */
  name: string
  /** 策略说明 */
  description: string
  /** 采样率（百分比） */
  sampleRate: number
  /** 预估数据量 */
  volume: string
  /** 成本等级 */
  cost: string
  /** 适用场景 */
  suitable: string
  /** 代码示例 */
  codeSnippet: string
}

export interface UserTrackingFunnelData {
  /** 漏斗阶段列表 */
  funnel?: TrackingFunnelStep[]
  /** 埋点策略对比 */
  strategies?: TrackingStrategy[]
  /** 采样与冷却说明 */
  samplingNote?: string
  /** 演示说明 */
  note?: string
  title?: string
}

// ============================================================================
// RBACPermissionMatrix — RBAC 权限矩阵 + 按钮级权限
// ============================================================================

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'export' | 'admin'

export type PermissionDecision = 'allow' | 'deny' | 'own'

export interface RBACRole {
  /** 角色标识 */
  id: string
  /** 角色名称 */
  name: string
  /** 角色描述 */
  description: string
  /** 主题色 */
  color: string
  /** 角色等级（用于展示） */
  level?: number
}

export interface RBACResource {
  /** 资源标识 */
  id: string
  /** 资源名称 */
  name: string
  /** 资源图标 */
  icon?: string
}

export interface RBACPermission {
  /** 角色标识 */
  roleId: string
  /** 资源标识 */
  resourceId: string
  /** 允许的操作列表 */
  actions: PermissionAction[]
}

export interface RBACRoute {
  /** 路由路径 */
  path: string
  /** 页面名称 */
  name: string
  /** 允许访问的角色 id 列表 */
  requiredRoles: string[]
}

export interface RBACPermissionMatrixData {
  /** 角色列表 */
  roles?: RBACRole[]
  /** 资源列表 */
  resources?: RBACResource[]
  /** 权限矩阵 */
  permissions?: RBACPermission[]
  /** 路由守卫列表 */
  routes?: RBACRoute[]
  /** 鉴权说明 */
  authNote?: string
  /** 演示说明 */
  note?: string
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const monitoringAuthVisualizationMeta: Record<
  MonitoringAuthVisualizationType,
  {
    type: MonitoringAuthVisualizationType
    label: string
    identifier: string
    purpose: string
  }
> = {
  'i18n-format-playground': {
    type: 'i18n-format-playground',
    label: 'Intl API 格式化演示',
    identifier: 'i18n-format-playground',
    purpose: '日期/数字/货币/复数 Intl 格式化 + locale 切换 + ICU MessageFormat 示例',
  },
  'auth-flow-graph': {
    type: 'auth-flow-graph',
    label: 'OAuth 授权流程图',
    identifier: 'auth-flow-graph',
    purpose: '授权码 / PKCE / JWT / 客户端模式四流程切换 + 步骤高亮',
  },
  'jwt-payload-decoder': {
    type: 'jwt-payload-decoder',
    label: 'JWT 解码器',
    identifier: 'jwt-payload-decoder',
    purpose: 'Header.Payload.Signature 三段解码 + 安全提示',
  },
  'error-monitoring-dashboard': {
    type: 'error-monitoring-dashboard',
    label: '错误监控面板',
    identifier: 'error-monitoring-dashboard',
    purpose: 'JS 错误 / Promise 异常 / 资源错误捕获 + Source Map 还原',
  },
  'performance-observer-demo': {
    type: 'performance-observer-demo',
    label: 'Web Vitals 采集',
    identifier: 'performance-observer-demo',
    purpose: 'PerformanceObserver 监听 LCP/INP/CLS + 评分矩阵',
  },
  'user-tracking-funnel': {
    type: 'user-tracking-funnel',
    label: '埋点漏斗',
    identifier: 'user-tracking-funnel',
    purpose: 'PV/UV/点击/转化漏斗 + 埋点策略对比',
  },
  'rbac-permission-matrix': {
    type: 'rbac-permission-matrix',
    label: 'RBAC 权限矩阵',
    identifier: 'rbac-permission-matrix',
    purpose: '角色 × 资源权限矩阵 + 路由守卫 + 按钮级权限',
  },
}
