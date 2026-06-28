/**
 * 性能优化与安全防护可视化组件类型定义 - 模块 19
 *
 * 定义 5 种模块十九专用性能/安全教学模拟组件的类型和数据接口：
 * - CoreWebVitalsVisualizer：Core Web Vitals 指标矩阵（LCP/INP/CLS/FCP/TTI）
 * - ResourceHintsVisualizer：Resource Hints 策略时序图（preconnect/dns-prefetch/preload/prefetch/modulepreload）
 * - DebounceThrottleVisualizer：防抖节流可视化（双栏对比 + 计数器 + 点状指示器）
 * - VirtualListVisualizer：虚拟列表原理（滚动演示 + 可视区域高亮）
 * - SecurityAttackFlowVisualizer：XSS 攻击向量流程（反射/存储/DOM 三型）
 *
 * 另跨模块复用模块十六 HttpRequestResponseFlow（CSRF 攻击链视角）
 * 与模块十八 MockFlowVisualizer（CSRF 攻击向量替换视角）。
 * 所有组件均为教学模拟，不执行真实攻击代码。
 */

// ============================================================================
// 性能与安全可视化组件类型联合
// ============================================================================

export type PerformanceSecurityVisualizationType =
  | 'core-web-vitals-visualizer'
  | 'resource-hints-visualizer'
  | 'debounce-throttle-visualizer'
  | 'virtual-list-visualizer'
  | 'security-attack-flow-visualizer'

// ============================================================================
// CoreWebVitalsVisualizer — Core Web Vitals 指标矩阵
// ============================================================================

export type CoreWebVitalId = 'lcp' | 'inp' | 'cls' | 'fcp' | 'tti' | 'tbt'

export type MetricRating = 'good' | 'needs-improvement' | 'poor'

export interface CoreWebVitalMetric {
  /** 指标标识 */
  id: CoreWebVitalId
  /** 指标全称 */
  name: string
  /** 缩写 */
  abbr: string
  /** 类别（加载/交互/视觉稳定） */
  category: 'loading' | 'interactivity' | 'visual-stability'
  /** 描述 */
  description: string
  /** 优秀阈值 */
  goodThreshold: string
  /** 需改进阈值 */
  needsImprovementThreshold: string
  /** 较差阈值 */
  poorThreshold: string
  /** 测量方式 */
  measurement: string
  /** 优化方向 */
  optimizations: string[]
  /** 是否为核心指标（Core Web Vitals 三件套） */
  isCore?: boolean
  /** 主题色 */
  color: string
}

export interface CoreWebVitalsVisualizerData {
  metrics?: CoreWebVitalMetric[]
  /** Core Web Vitals 三件套说明 */
  coreNote?: string
  title?: string
}

// ============================================================================
// ResourceHintsVisualizer — Resource Hints 策略时序图
// ============================================================================

export type ResourceHintId =
  | 'preconnect'
  | 'dns-prefetch'
  | 'preload'
  | 'prefetch'
  | 'modulepreload'

export interface ResourceHintStrategy {
  /** 策略标识 */
  id: ResourceHintId
  /** 策略名称 */
  name: string
  /** HTML 标签 */
  tag: string
  /** 触发时机 */
  timing: string
  /** 作用范围 */
  scope: string
  /** 描述 */
  description: string
  /** 代码示例 */
  codeSnippet: string
  /** 适用场景 */
  useCase: string
  /** 节省的时间说明 */
  saving: string
  /** 主题色 */
  color: string
}

export interface ResourceHintsVisualizerData {
  strategies?: ResourceHintStrategy[]
  /** 时序图说明 */
  timelineNote?: string
  title?: string
}

// ============================================================================
// DebounceThrottleVisualizer — 防抖节流可视化
// ============================================================================

export type DebounceThrottleMode = 'none' | 'debounce' | 'throttle'

export interface DebounceThrottleConfig {
  /** 默认防抖延迟（ms） */
  defaultDebounceWait?: number
  /** 默认节流间隔（ms） */
  defaultThrottleWait?: number
  /** 演示说明 */
  note?: string
  title?: string
}

export type DebounceThrottleVisualizerData = DebounceThrottleConfig

// ============================================================================
// VirtualListVisualizer — 虚拟列表原理
// ============================================================================

export interface VirtualListConfig {
  /** 总数据条数 */
  totalCount?: number
  /** 可视区域高度（px） */
  viewportHeight?: number
  /** 每项高度（px） */
  itemHeight?: number
  /** 预渲染缓冲条数（上下各多少条） */
  overscan?: number
  /** 演示说明 */
  note?: string
  title?: string
}

export type VirtualListVisualizerData = VirtualListConfig

// ============================================================================
// SecurityAttackFlowVisualizer — XSS 攻击向量流程
// ============================================================================

export type AttackTypeId = 'reflected' | 'stored' | 'dom'

export type AttackStageId = 'inject' | 'deliver' | 'execute' | 'steal'

export interface AttackStage {
  /** 阶段标识 */
  id: AttackStageId
  /** 阶段名称 */
  name: string
  /** 描述 */
  description: string
  /** 代码/载荷示例 */
  payload: string
  /** 代码语言 */
  codeLanguage?: string
  /** 防御点 */
  defense: string
  /** 主题色 */
  color: string
}

export interface AttackType {
  /** 攻击类型标识 */
  id: AttackTypeId
  /** 类型名称 */
  name: string
  /** 危害等级 */
  severity: 'high' | 'critical'
  /** 触发方式 */
  trigger: string
  /** 持久性（是否持久化） */
  persistence: string
  /** 影响范围 */
  impact: string
  /** 攻击流程阶段 */
  stages: AttackStage[]
  /** 主题色 */
  color: string
}

export interface SecurityAttackFlowVisualizerData {
  attackTypes?: AttackType[]
  /** 攻击链说明 */
  chainNote?: string
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const performanceSecurityVisualizationMeta: Record<
  PerformanceSecurityVisualizationType,
  {
    type: PerformanceSecurityVisualizationType
    label: string
    identifier: string
    purpose: string
  }
> = {
  'core-web-vitals-visualizer': {
    type: 'core-web-vitals-visualizer',
    label: 'Core Web Vitals 指标矩阵',
    identifier: 'core-web-vitals-visualizer',
    purpose: 'LCP/INP/CLS/FCP/TTI 指标卡片 + 优秀标准高亮 + 优化方向',
  },
  'resource-hints-visualizer': {
    type: 'resource-hints-visualizer',
    label: 'Resource Hints 策略',
    identifier: 'resource-hints-visualizer',
    purpose: 'preconnect/dns-prefetch/preload/prefetch/modulepreload 策略切换 + 时序图',
  },
  'debounce-throttle-visualizer': {
    type: 'debounce-throttle-visualizer',
    label: '防抖节流可视化',
    identifier: 'debounce-throttle-visualizer',
    purpose: '防抖 vs 节流双栏对比 + 触发计数 + 点状指示器 + 间隔滑块',
  },
  'virtual-list-visualizer': {
    type: 'virtual-list-visualizer',
    label: '虚拟列表原理',
    identifier: 'virtual-list-visualizer',
    purpose: '滚动演示虚拟列表 + 可视区域高亮 + DOM 数量对比',
  },
  'security-attack-flow-visualizer': {
    type: 'security-attack-flow-visualizer',
    label: 'XSS 攻击向量流程',
    identifier: 'security-attack-flow-visualizer',
    purpose: '反射/存储/DOM 三型 XSS 攻击向量切换 + 注入→执行→窃取流程',
  },
}
