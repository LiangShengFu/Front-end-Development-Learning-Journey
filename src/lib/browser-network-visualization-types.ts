/**
 * 浏览器原理与网络可视化组件类型定义 - 模块 16
 *
 * 定义 7 种模块十六专用浏览器/网络教学模拟组件的类型和数据接口：
 * - RenderingPipelineVisualizer：浏览器渲染流水线（DOM/CSSOM/Render Tree/Layout/Paint/Composite）
 * - ReflowRepaintComparator：重排 vs 重绘对比（触发操作对比代价）
 * - HttpRequestResponseFlow：HTTP 请求响应流（DNS/TCP/TLS/Request/Response）
 * - CacheDecisionTree：HTTP 缓存决策树（强缓存/协商缓存决策路径）
 * - TcpHandshakeVisualizer：TCP 三次握手与四次挥手
 * - HttpsHandshakeFlow：HTTPS TLS 握手流程（非对称+对称加密）
 * - QuicMultiplexingVisualizer：HTTP/3 QUIC 多路复用（流可视化、无队头阻塞）
 *
 * 所有组件均为教学模拟，不执行真实网络请求/握手。
 */

// ============================================================================
// 浏览器/网络可视化组件类型联合
// ============================================================================

export type BrowserNetworkVisualizationType =
  | 'rendering-pipeline-visualizer'
  | 'reflow-repaint-comparator'
  | 'http-request-response-flow'
  | 'cache-decision-tree'
  | 'tcp-handshake-visualizer'
  | 'https-handshake-flow'
  | 'quic-multiplexing-visualizer'

// ============================================================================
// 通用流程图类型（复用工程化模块的 FlowNode/FlowEdge 设计）
// ============================================================================

/** 流程节点 */
export interface BnFlowNode {
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

/** 流程边 */
export interface BnFlowEdge {
  /** 源节点 */
  from: string
  /** 目标节点 */
  to: string
  /** 边标签 */
  label?: string
  /** 是否异步（虚线） */
  async?: boolean
}

// ============================================================================
// RenderingPipelineVisualizer — 浏览器渲染流水线
// ============================================================================

export type RenderingPipelineStepId =
  | 'html-parse'
  | 'dom-build'
  | 'css-parse'
  | 'cssom-build'
  | 'render-tree'
  | 'layout'
  | 'paint'
  | 'composite'

export interface RenderingPipelineStep {
  /** 步骤标识 */
  id: RenderingPipelineStepId
  /** 步骤名称 */
  name: string
  /** 描述 */
  description: string
  /** 输入产物 */
  input?: string
  /** 输出产物 */
  output: string
  /** 代码片段 */
  codeSnippet?: string
  /** 代码语言 */
  codeLanguage?: string
  /** 模拟耗时（ms） */
  durationMs: number
  /** 主题色 */
  color: string
}

export interface RenderingPipelineVisualizerData {
  steps?: RenderingPipelineStep[]
  title?: string
}

// ============================================================================
// ReflowRepaintComparator — 重排 vs 重绘对比
// ============================================================================

export type OperationType = 'reflow' | 'repaint' | 'composite-only'
export type CostLevel = 'low' | 'medium' | 'high'

export interface ReflowRepaintOperation {
  /** 操作标识 */
  id: string
  /** 操作名称 */
  label: string
  /** 操作类型 */
  type: OperationType
  /** 代价等级 */
  cost: CostLevel
  /** 代价说明 */
  costDescription: string
  /** 触发的 CSS/JS 代码 */
  code: string
  /** 代码语言 */
  codeLanguage?: string
  /** 优化建议 */
  optimization: string
  /** 主题色 */
  color: string
}

export interface ReflowRepaintComparatorData {
  operations?: ReflowRepaintOperation[]
  /** 概念说明 */
  concepts?: {
    reflow: string
    repaint: string
    composite: string
  }
  title?: string
}

// ============================================================================
// HttpRequestResponseFlow — HTTP 请求响应流
// ============================================================================

export type HttpRequestStageId =
  | 'dns'
  | 'tcp'
  | 'tls'
  | 'request'
  | 'response'

export interface HttpRequestStage {
  /** 阶段标识（标准 HTTP 阶段用 HttpRequestStageId；自定义流程可用任意 string） */
  id: string
  /** 阶段名称（标准 HTTP 阶段用 name；自定义流程可用 title） */
  name?: string
  /** 阶段标题（自定义流程用，如 "① 测试触发"） */
  title?: string
  /** 描述 */
  description: string
  /** 详细说明（自定义流程用） */
  detail?: string
  /** 方向（请求/响应） */
  direction?: 'request' | 'response' | 'bidirectional'
  /** 模拟耗时（ms） */
  durationMs?: number
  /** 数据包/报文示例 */
  payload?: string
  /** 主题色 */
  color: string
}

export interface HttpRequestResponseFlowData {
  stages?: HttpRequestStage[]
  /** 完整 URL 示例 */
  urlExample?: string
  title?: string
  /** 流程说明（自定义流程用，如 E2E 测试视角的补充说明） */
  note?: string
}

// ============================================================================
// CacheDecisionTree — HTTP 缓存决策树
// ============================================================================

export type CacheDecisionType = 'question' | 'action'
export type CacheStrategy =
  | 'strong-cache'
  | 'negotiation-cache'
  | 'no-cache'
  | 'no-store'
  | 'browser-back'

export interface CacheDecisionNode {
  /** 节点标识 */
  id: string
  /** 节点类型 */
  type: CacheDecisionType
  /** 问题/动作描述 */
  question?: string
  /** 缓存策略（叶子节点） */
  strategy?: CacheStrategy
  /** 策略说明 */
  strategyLabel?: string
  /** 策略详细说明 */
  strategyDescription?: string
  /** 相关 HTTP 头 */
  headers?: string[]
  /** 是分支目标节点 id */
  yesId?: string
  /** 否分支目标节点 id */
  noId?: string
  /** 主题色 */
  color?: string
}

export interface CacheDecisionTreeData {
  /** 根节点 id */
  rootId?: string
  /** 决策节点列表 */
  nodes?: CacheDecisionNode[]
  title?: string
}

// ============================================================================
// TcpHandshakeVisualizer — TCP 三次握手与四次挥手
// ============================================================================

export type TcpPhaseId =
  | 'closed'
  | 'syn-sent'
  | 'syn-received'
  | 'established'
  | 'fin-wait-1'
  | 'fin-wait-2'
  | 'time-wait'
  | 'closed-2'

export interface TcpPhase {
  /** 阶段标识 */
  id: TcpPhaseId
  /** 阶段名称 */
  name: string
  /** 描述 */
  description: string
  /** 客户端状态 */
  clientState: string
  /** 服务端状态 */
  serverState: string
  /** 报文方向 */
  direction?: 'c2s' | 's2c' | 'both'
  /** seq 序号 */
  seq?: number
  /** ack 确认号 */
  ack?: number
  /** 标志位（SYN/ACK/FIN） */
  flags?: string[]
  /** 主题色 */
  color: string
}

export interface TcpHandshakeVisualizerData {
  /** 三次握手阶段 */
  handshakePhases?: TcpPhase[]
  /** 四次挥手阶段 */
  teardownPhases?: TcpPhase[]
  title?: string
}

// ============================================================================
// HttpsHandshakeFlow — HTTPS TLS 握手流程
// ============================================================================

export type TlsStageId =
  | 'client-hello'
  | 'server-hello'
  | 'certificate'
  | 'key-exchange'
  | 'finished'
  | 'encrypted'

export type EncryptionType = 'plaintext' | 'asymmetric' | 'symmetric'

export interface TlsHandshakeStage {
  /** 阶段标识 */
  id: TlsStageId
  /** 阶段名称 */
  name: string
  /** 描述 */
  description: string
  /** 方向 */
  direction: 'c2s' | 's2c' | 'both'
  /** 加密类型 */
  encryption: EncryptionType
  /** 携带的关键信息 */
  payload?: string[]
  /** 模拟耗时（ms） */
  durationMs: number
  /** 主题色 */
  color: string
}

export interface HttpsHandshakeFlowData {
  stages?: TlsHandshakeStage[]
  /** 证书链示例 */
  certificateChain?: string
  title?: string
}

// ============================================================================
// QuicMultiplexingVisualizer — HTTP/3 QUIC 多路复用
// ============================================================================

export type QuicStreamStatus = 'pending' | 'running' | 'completed' | 'blocked'

export interface QuicStream {
  /** 流标识 */
  id: number
  /** 流名称 */
  label: string
  /** 数据包列表 */
  packets: {
    seq: number
    status: 'pending' | 'sent' | 'ack' | 'lost'
    size: number
  }[]
  /** 模拟耗时（ms） */
  durationMs: number
  /** 主题色 */
  color: string
}

export interface QuicMultiplexingVisualizerData {
  streams?: QuicStream[]
  /** QUIC 特性说明 */
  features?: string[]
  /** 对比 HTTP/1.1 / HTTP/2 说明 */
  comparison?: {
    http1: string
    http2: string
    http3: string
  }
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const browserNetworkVisualizationMeta: Record<
  BrowserNetworkVisualizationType,
  { type: BrowserNetworkVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'rendering-pipeline-visualizer': {
    type: 'rendering-pipeline-visualizer',
    label: '浏览器渲染流水线',
    identifier: 'rendering-pipeline-visualizer',
    purpose: 'HTML/CSS 解析 → DOM/CSSOM → Render Tree → Layout → Paint → Composite 分步可视化',
  },
  'reflow-repaint-comparator': {
    type: 'reflow-repaint-comparator',
    label: '重排 vs 重绘对比',
    identifier: 'reflow-repaint-comparator',
    purpose: '触发不同操作对比 Reflow/Repaint/Composite 代价与优化建议',
  },
  'http-request-response-flow': {
    type: 'http-request-response-flow',
    label: 'HTTP 请求响应流',
    identifier: 'http-request-response-flow',
    purpose: 'DNS → TCP → TLS → Request → Response 全流程动画',
  },
  'cache-decision-tree': {
    type: 'cache-decision-tree',
    label: 'HTTP 缓存决策树',
    identifier: 'cache-decision-tree',
    purpose: '强缓存 / 协商缓存 / no-store 决策路径交互式推导',
  },
  'tcp-handshake-visualizer': {
    type: 'tcp-handshake-visualizer',
    label: 'TCP 三次握手',
    identifier: 'tcp-handshake-visualizer',
    purpose: '三次握手建立连接 + 四次挥手断开连接，含 seq/ack 变化',
  },
  'https-handshake-flow': {
    type: 'https-handshake-flow',
    label: 'HTTPS TLS 握手',
    identifier: 'https-handshake-flow',
    purpose: 'ClientHello → 证书 → 密钥交换 → Finished → 对称加密通信',
  },
  'quic-multiplexing-visualizer': {
    type: 'quic-multiplexing-visualizer',
    label: 'HTTP/3 QUIC 多路复用',
    identifier: 'quic-multiplexing-visualizer',
    purpose: 'QUIC 多流并行传输、无队头阻塞、0-RTT 可视化',
  },
}
