/**
 * 核心类型系统 - 前端开发学习之旅
 *
 * 定义内容块、可视化组件类型、模块元数据等核心数据结构。
 * 所有模块内容和可视化组件均基于此类型系统构建。
 */
import type {
  DomTreeData,
  ElementAnatomyData,
  SemanticCompareData,
  FormPlaygroundData,
  TableBuilderData,
  A11yChecklistData,
  PathParserData,
  ApiCardData,
  HtmlVisualizationType,
} from './html-visualization-types'
import { htmlVisualizationMeta } from './html-visualization-types'
import type {
  FlexboxPlaygroundData,
  BoxModelPlaygroundData,
  SelectorPlaygroundData,
  AnimationPlaygroundData,
  PositionPlaygroundData,
  DisplayTypePlaygroundData,
  ResponsiveViewportData,
  GridPlaygroundData,
  CssVisualizationType,
} from './css-visualization-types'
import { cssVisualizationMeta } from './css-visualization-types'
import type {
  DataTypeExplorerData,
  EqualityComparatorData,
  TypeConversionData,
  ScopeChainData,
  ArrayMethodData,
  EventPropagationData,
  EventLoopData,
  PromiseFlowData,
  ClassInheritanceData,
  RegexTesterData,
  PrototypeChainData,
  GeneratorFlowData,
  TodoAppData,
  JsVisualizationType,
} from './js-visualization-types'
import { jsVisualizationMeta } from './js-visualization-types'
import type {
  DomTreeVisualizerData,
  EventFlowVisualizerData,
  EventDelegationData,
  LocationParserData,
  HistoryRouterData,
  StoragePlaygroundData,
  GeometryCalculatorData,
  ScrollAnimationData,
  FileUploadData,
  BlobDownloadData,
  RafAnimationData,
  DomBomVisualizationType,
} from './dom-bom-visualization-types'
import { domBomVisualizationMeta } from './dom-bom-visualization-types'
import type {
  TailwindPlaygroundData,
  BreakpointSimulatorData,
  SassPlaygroundData,
  BootstrapGridDemoData,
  ResponsiveNavDemoData,
  CssEngineeringVisualizationType,
} from './css-engineering-visualization-types'
import { cssEngineeringVisualizationMeta } from './css-engineering-visualization-types'
import type {
  TsTypeCheckerData,
  TypeTransformBoardData,
  GenericConstraintFlowData,
  TsConfigPlaygroundData,
  ApiTypingWorkbenchData,
  MigrationPlannerData,
  TypeInferenceTimelineData,
  TypeMatrixTableData,
  TypeScriptVisualizationType,
} from './typescript-visualization-types'
import { typeScriptVisualizationMeta } from './typescript-visualization-types'
import type {
  VdomDiffSimulatorData,
  JsxLivePreviewData,
  DataFetchStateMachineData,
  RerenderTrackerData,
  ReduxCycleSimulatorData,
  SuspenseBoundaryDemoData,
  ComponentLibDeciderData,
  DecisionTreeData,
  DiffHighlightBoardData,
  ReactVisualizationType,
} from './react-visualization-types'
import { reactVisualizationMeta } from './react-visualization-types'
import type {
  StackQueueVisualizerData,
  LruCacheSimulatorData,
  LinkedListStepperData,
  BinaryTreeWalkerData,
  SortingRaceArenaData,
  BfsPathFinderData,
  HandwritingChallengeData,
  AlgorithmVisualizationType,
} from './algorithm-visualization-types'
import { algorithmVisualizationMeta } from './algorithm-visualization-types'
import type {
  FiberWorkLoopSimulatorData,
  MemoEffectComparatorData,
  VirtualListSimulatorData,
  HookExtractionWorkshopData,
  TransitionVsSyncDemoData,
  PatternFactoryData,
  ReactAdvancedVisualizationType,
} from './react-advanced-visualization-types'
import { reactAdvancedVisualizationMeta } from './react-advanced-visualization-types'
import type {
  InterviewQuizEngineData,
  ConceptExplainVizData,
  FlashcardDeckData,
  MockInterviewTimerData,
  ProgressDashboardData,
  SystemDesignBoardData,
  InterviewVisualizationType,
} from './interview-visualization-types'
import { interviewVisualizationMeta } from './interview-visualization-types'
import type {
  RenderModeComparatorData,
  RSCPayloadFlowData,
  ServerActionSandboxData,
  MiddlewareFlowExplorerData,
  FrameworkDecisionWizardData,
  IslandsArchDemoData,
  RouteVsActionDeciderData,
  NextjsVisualizationType,
} from './nextjs-visualization-types'
import { nextjsVisualizationMeta } from './nextjs-visualization-types'
import type {
  VueVsReactComparatorData,
  ProxyReactivityTrackerData,
  VueComponentSandboxData,
  DefineEmitsWorkshopData,
  PiniaStoreExplorerData,
  PatchFlagVisualizerData,
  VueVisualizationType,
} from './vue-visualization-types'
import { vueVisualizationMeta } from './vue-visualization-types'
import type {
  NuxtHybridRenderStudioData,
  ComposableFlowVisualizerData,
  CustomDirectiveWorkbenchData,
  KeepAliveCacheSimulatorData,
  VueAdvancedVisualizationType,
} from './vue-advanced-visualization-types'
import { vueAdvancedVisualizationMeta } from './vue-advanced-visualization-types'
import type {
  DualThreadModelVisualizerData,
  SetDataPerformanceComparatorData,
  MiniComponentWorkbenchData,
  TaroCompileFlowVisualizerData,
  UniAppConditionalCompilerData,
  SubpackageLoadingVisualizerData,
  MiniprogramVisualizationType,
} from './miniprogram-visualization-types'
import { miniprogramVisualizationMeta } from './miniprogram-visualization-types'
import type {
  MobileAdaptationSandboxData,
  RNArchitectureComparatorData,
  ExpoRouterTreeVisualizerData,
  CapacitorPluginBridgeData,
  ServiceWorkerCacheStrategiesData,
  PwaPushFlowVisualizerData,
  CrossPlatformSelectorData,
  CrossPlatformVisualizationType,
} from './cross-platform-visualization-types'
import { crossPlatformVisualizationMeta } from './cross-platform-visualization-types'
import type {
  WebpackBuildFlowVisualizerData,
  ViteEsmLoadingFlowData,
  PnpmHardlinkVisualizerData,
  CommitMessageParserData,
  MonorepoTreeVisualizerData,
  TurborepoTaskFlowData,
  CICDPipelineVisualizerData,
  EngineeringVisualizationType,
} from './engineering-visualization-types'
import { engineeringVisualizationMeta } from './engineering-visualization-types'

import type {
  RenderingPipelineVisualizerData,
  ReflowRepaintComparatorData,
  HttpRequestResponseFlowData,
  CacheDecisionTreeData,
  TcpHandshakeVisualizerData,
  HttpsHandshakeFlowData,
  QuicMultiplexingVisualizerData,
  BrowserNetworkVisualizationType,
} from './browser-network-visualization-types'
import { browserNetworkVisualizationMeta } from './browser-network-visualization-types'
import type {
  EventLoopVisualizerData,
  ModuleSystemComparatorData,
  FileSystemAsyncComparatorData,
  ExpressMiddlewareFlowData,
  RestfulApiDesignerData,
  NodejsVisualizationType,
} from './nodejs-visualization-types'
import { nodejsVisualizationMeta } from './nodejs-visualization-types'
import type {
  TestPyramidVisualizerData,
  MockFlowVisualizerData,
  TestingLibraryQueryPriorityData,
  ComponentTestPlaygroundData,
  E2ETestFlowVisualizerData,
  TestingVisualizationType,
} from './testing-visualization-types'
import { testingVisualizationMeta } from './testing-visualization-types'
import type {
  CoreWebVitalsVisualizerData,
  ResourceHintsVisualizerData,
  DebounceThrottleVisualizerData,
  VirtualListVisualizerData,
  SecurityAttackFlowVisualizerData,
  PerformanceSecurityVisualizationType,
} from './performance-security-visualization-types'
import { performanceSecurityVisualizationMeta } from './performance-security-visualization-types'
import type {
  CanvasPlaygroundData,
  SvgVsCanvasCompareData,
  D3DataBindingFlowData,
  EChartsConfigVisualizerData,
  DesignPatternShowcaseData,
  VisualizationArchitectureVisualizationType,
} from './visualization-architecture-visualization-types'
import { visualizationArchitectureVisualizationMeta } from './visualization-architecture-visualization-types'
import type {
  WebComponentsLifecycleData,
  WorkerDataTransferData,
  ObserverApiShowcaseData,
  GraphQLSchemaData,
  ApiLayerComparisonData,
  WebApiGraphQLVisualizationType,
} from './web-api-graphql-visualization-types'
import { webApiGraphQLVisualizationMeta } from './web-api-graphql-visualization-types'
import type {
  MFArchitectureGraphData,
  MFSandboxIsolationData,
  MFModuleFederationData,
  MFQiankunLifecycleData,
  MFCssIsolationData,
  MicrofrontendVisualizationType,
} from './microfrontend-visualization-types'
import { microfrontendVisualizationMeta } from './microfrontend-visualization-types'
import type {
  I18nFormatPlaygroundData,
  AuthFlowGraphData,
  JWTPayloadDecoderData,
  ErrorMonitoringDashboardData,
  PerformanceObserverDemoData,
  UserTrackingFunnelData,
  RBACPermissionMatrixData,
  MonitoringAuthVisualizationType,
} from './monitoring-auth-visualization-types'
import { monitoringAuthVisualizationMeta } from './monitoring-auth-visualization-types'

// ============================================================================
// 可视化组件类型（11 种核心 + 7 HTML + 7 CSS + 13 JS + 11 DOM/BOM + 5 CSS工程 + 8 TS + 9 React + 7 算法 + 6 React进阶 + 6 面试备考 + 7 Next.js全栈）
// ============================================================================

/** 11 种核心可视化组件类型 */
export type CoreVisualizationType =
  | 'knowledgegraph'
  | 'flipcard'
  | 'skillbar'
  | 'sandbox'
  | 'drag'
  | 'timeline'
  | 'comparetable'
  | 'codestepper'
  | 'architecture'
  | 'quiz'
  | 'accordion'

/** 全部可视化组件类型联合（核心 + HTML 专用 + CSS 专用 + JS 专用 + DOM/BOM 专用 + CSS 工程化专用 + TypeScript 专用 + React 专用 + 算法专用 + React 进阶专用 + 面试备考专用 + Next.js 全栈专用） */
export type VisualizationType =
  | CoreVisualizationType
  | HtmlVisualizationType
  | CssVisualizationType
  | JsVisualizationType
  | DomBomVisualizationType
  | CssEngineeringVisualizationType
  | TypeScriptVisualizationType
  | ReactVisualizationType
  | AlgorithmVisualizationType
  | ReactAdvancedVisualizationType
  | InterviewVisualizationType
  | NextjsVisualizationType
  | VueVisualizationType
  | VueAdvancedVisualizationType
  | MiniprogramVisualizationType
  | CrossPlatformVisualizationType
  | EngineeringVisualizationType
  | BrowserNetworkVisualizationType
  | NodejsVisualizationType
  | TestingVisualizationType
  | PerformanceSecurityVisualizationType
  | VisualizationArchitectureVisualizationType
  | WebApiGraphQLVisualizationType
  | MicrofrontendVisualizationType
  | MonitoringAuthVisualizationType

// ============================================================================
// 内容块类型系统
// ============================================================================

/** 内容块基础类型 */
export interface BaseBlock {
  /** 唯一标识 */
  id: string
  /** 内容块类型 */
  type: BlockType
}

/** 内容块类型联合 */
export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'list'
  | 'callout'
  | 'demo'
  | 'table'
  | 'quote'
  | 'divider'

/** 标题块 */
export interface HeadingBlock extends BaseBlock {
  type: 'heading'
  /** 标题级别 1-4 */
  level: 1 | 2 | 3 | 4
  /** 标题文本 */
  text: string
  /** 可选的 eyebrow 标签（GeistMono uppercase） */
  eyebrow?: string
}

/** 段落块 */
export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph'
  /** 段落文本，支持简单内联标记 */
  text: string
  /** 是否为引导段落（body-lg） */
  lead?: boolean
}

/** 代码块 */
export interface CodeBlock extends BaseBlock {
  type: 'code'
  /** 代码内容 */
  code: string
  /** 语言标识，如 'html' | 'css' | 'js' | 'ts' | 'jsx' */
  language: string
  /** 可选的文件名标签 */
  filename?: string
  /** 是否显示行号 */
  showLineNumbers?: boolean
}

/** 列表块 */
export interface ListBlock extends BaseBlock {
  type: 'list'
  /** 列表项 */
  items: string[]
  /** 是否有序列表 */
  ordered?: boolean
}

/** 提示/强调块 */
export interface CalloutBlock extends BaseBlock {
  type: 'callout'
  /** 标题 */
  title?: string
  /** 内容 */
  text: string
  /** 提示类型 */
  variant?: 'info' | 'warning' | 'tip' | 'note'
}

/** 引用块 */
export interface QuoteBlock extends BaseBlock {
  type: 'quote'
  text: string
  /** 引用来源 */
  source?: string
}

/** 表格块 */
export interface TableBlock extends BaseBlock {
  type: 'table'
  /** 表头 */
  headers: string[]
  /** 表格行 */
  rows: string[][]
  /** 可选的标题 */
  caption?: string
}

/** 分隔线块 */
export interface DividerBlock extends BaseBlock {
  type: 'divider'
}

/** 可视化组件块 - 嵌入交互式组件 */
export interface VisualizationBlock extends BaseBlock {
  type: 'demo'
  /** 可视化组件类型 */
  visualizationType: VisualizationType
  /** 组件配置数据（由各组件自行解析） */
  data: VisualizationData
}

/** 内容块联合类型 */
export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | CodeBlock
  | ListBlock
  | CalloutBlock
  | VisualizationBlock
  | TableBlock
  | QuoteBlock
  | DividerBlock

// ============================================================================
// 各可视化组件的数据类型定义
// ============================================================================

/** KnowledgeGraph - 知识节点关系图 */
export interface KnowledgeGraphData {
  nodes: Array<{
    id: string
    label: string
    /** 节点分组（用于着色） */
    group?: string
    /** 节点大小权重 */
    weight?: number
  }>
  edges: Array<{
    source: string
    target: string
    /** 关系标签 */
    label?: string
  }>
}

/** FlipCard - 翻转卡片 */
export interface FlipCardData {
  cards: Array<{
    /** 正面标题 */
    front: string
    /** 正面副标题/图标 */
    frontSub?: string
    /** 背面内容 */
    back: string
  }>
}

/** SkillBar - 技能条 */
export interface SkillBarData {
  skills: Array<{
    name: string
    /** 0-100 进度值 */
    level: number
    /** 可选描述 */
    description?: string
  }>
}

/** Sandbox - 代码沙盒 */
export interface SandboxData {
  /** 初始代码 */
  initialCode: string
  /** 语言 */
  language?: 'js' | 'html' | 'css'
  /** 可选的提示说明 */
  hint?: string
  /** 可选的断言检查：实时校验学习者代码并给出教学反馈，形成动态反馈闭环 */
  checks?: SandboxCheck[]
}

/** 沙盒断言检查项 — 用于实战项目的引导式反馈 */
export interface SandboxCheck {
  /** 检查项描述（向学习者展示的任务要求） */
  description: string
  /** 正则表达式字符串（对源码做匹配，命中即通过）。注意转义 */
  pattern: string
  /** 正则标志，默认 'i'（忽略大小写） */
  flags?: string
  /** 未通过时的教学提示（指出该怎么做/易错点） */
  hint: string
}

/** DragInteraction - 拖拽交互演示 */
export interface DragInteractionData {
  /** 可拖拽项目 */
  items: Array<{
    id: string
    label: string
  }>
  /** 目标区域标签 */
  targetLabel?: string
}

/** Timeline - 时间线/步骤流程 */
export interface TimelineData {
  /** 方向 */
  orientation?: 'vertical' | 'horizontal'
  /** 时间线项目 */
  items: Array<{
    /** 时间/步骤标签 */
    time: string
    /** 标题 */
    title: string
    /** 描述 */
    description?: string
    /** 可选的状态标记 */
    status?: 'done' | 'active' | 'pending'
  }>
}

/** CompareTable - 多列对比表格 */
export interface CompareTableData {
  /** 对比维度列标题 */
  featureColumn: string
  /** 对比对象列标题 */
  columns: string[]
  /** 对比行 */
  rows: Array<{
    feature: string
    values: string[]
  }>
  /** 可选高亮列索引 */
  highlightColumn?: number
}

/** CodeStepper - 代码分步执行演示 */
export interface CodeStepperData {
  /** 代码行数组（每行一个元素，便于高亮） */
  lines: string[]
  /** 步骤定义 */
  steps: Array<{
    /** 标题 */
    title: string
    /** 描述 */
    description: string
    /** 高亮的行号（1-based） */
    highlightLines?: number[]
    /** 可选的输出结果 */
    output?: string
  }>
  /** 语言 */
  language?: string
}

/** ArchitectureDiagram - 分层架构图 */
export interface ArchitectureDiagramData {
  /** 层级标题 */
  title?: string
  /** 架构层 */
  layers: Array<{
    /** 层名 */
    name: string
    /** 层描述 */
    description?: string
    /** 该层的组件/模块 */
    components: Array<{
      name: string
      description?: string
    }>
  }>
  /** 可选的数据流向标注 */
  flowDirection?: 'top-down' | 'bottom-up' | 'bidirectional'
}

/** QuizCard - 交互式测验卡片 */
export interface QuizData {
  questions: Array<{
    /** 题目 */
    question: string
    /** 选项 */
    options: string[]
    /** 正确答案索引（0-based） */
    correctIndex: number
    /** 解析 */
    explanation: string
  }>
}

/** Accordion - 手风琴折叠面板 */
export interface AccordionData {
  /** 是否允许多个同时展开 */
  multiple?: boolean
  /** 默认展开项索引 */
  defaultOpen?: number[]
  /** 面板项 */
  items: Array<{
    /** 标题 */
    title: string
    /** 内容（支持多段落） */
    content: string
    /** 可选的代码示例 */
    code?: string
    /** 代码语言 */
    codeLanguage?: string
  }>
}

/** 所有可视化组件数据类型的联合 */
export type VisualizationData =
  | KnowledgeGraphData
  | FlipCardData
  | SkillBarData
  | SandboxData
  | DragInteractionData
  | TimelineData
  | CompareTableData
  | CodeStepperData
  | ArchitectureDiagramData
  | QuizData
  | AccordionData
  | DomTreeData
  | ElementAnatomyData
  | SemanticCompareData
  | FormPlaygroundData
  | TableBuilderData
  | A11yChecklistData
  | PathParserData
  | ApiCardData
  | FlexboxPlaygroundData
  | BoxModelPlaygroundData
  | SelectorPlaygroundData
  | AnimationPlaygroundData
  | PositionPlaygroundData
  | DisplayTypePlaygroundData
  | ResponsiveViewportData
  | GridPlaygroundData
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
  | DomTreeVisualizerData
  | EventFlowVisualizerData
  | EventDelegationData
  | LocationParserData
  | HistoryRouterData
  | StoragePlaygroundData
  | GeometryCalculatorData
  | ScrollAnimationData
  | FileUploadData
  | BlobDownloadData
  | RafAnimationData
  | TailwindPlaygroundData
  | BreakpointSimulatorData
  | SassPlaygroundData
  | BootstrapGridDemoData
  | ResponsiveNavDemoData
  | TsTypeCheckerData
  | TypeTransformBoardData
  | GenericConstraintFlowData
  | TsConfigPlaygroundData
  | ApiTypingWorkbenchData
  | MigrationPlannerData
  | TypeInferenceTimelineData
  | TypeMatrixTableData
  | VdomDiffSimulatorData
  | JsxLivePreviewData
  | DataFetchStateMachineData
  | RerenderTrackerData
  | ReduxCycleSimulatorData
  | SuspenseBoundaryDemoData
  | ComponentLibDeciderData
  | DecisionTreeData
  | DiffHighlightBoardData
  | StackQueueVisualizerData
  | LruCacheSimulatorData
  | LinkedListStepperData
  | BinaryTreeWalkerData
  | SortingRaceArenaData
  | BfsPathFinderData
  | HandwritingChallengeData
  | FiberWorkLoopSimulatorData
  | MemoEffectComparatorData
  | VirtualListSimulatorData
  | HookExtractionWorkshopData
  | TransitionVsSyncDemoData
  | PatternFactoryData
  | InterviewQuizEngineData
  | ConceptExplainVizData
  | FlashcardDeckData
  | MockInterviewTimerData
  | ProgressDashboardData
  | SystemDesignBoardData
  | RenderModeComparatorData
  | RSCPayloadFlowData
  | ServerActionSandboxData
  | MiddlewareFlowExplorerData
  | FrameworkDecisionWizardData
  | IslandsArchDemoData
  | RouteVsActionDeciderData
  | VueVsReactComparatorData
  | ProxyReactivityTrackerData
  | VueComponentSandboxData
  | DefineEmitsWorkshopData
  | PiniaStoreExplorerData
  | PatchFlagVisualizerData
  | NuxtHybridRenderStudioData
  | ComposableFlowVisualizerData
  | CustomDirectiveWorkbenchData
  | KeepAliveCacheSimulatorData
  | DualThreadModelVisualizerData
  | SetDataPerformanceComparatorData
  | MiniComponentWorkbenchData
  | TaroCompileFlowVisualizerData
  | UniAppConditionalCompilerData
  | SubpackageLoadingVisualizerData
  | MobileAdaptationSandboxData
  | RNArchitectureComparatorData
  | ExpoRouterTreeVisualizerData
  | CapacitorPluginBridgeData
  | ServiceWorkerCacheStrategiesData
  | PwaPushFlowVisualizerData
  | CrossPlatformSelectorData
  | WebpackBuildFlowVisualizerData
  | ViteEsmLoadingFlowData
  | PnpmHardlinkVisualizerData
  | CommitMessageParserData
  | MonorepoTreeVisualizerData
  | TurborepoTaskFlowData
  | CICDPipelineVisualizerData
  | RenderingPipelineVisualizerData
  | ReflowRepaintComparatorData
  | HttpRequestResponseFlowData
  | CacheDecisionTreeData
  | TcpHandshakeVisualizerData
  | HttpsHandshakeFlowData
  | QuicMultiplexingVisualizerData
  | EventLoopVisualizerData
  | ModuleSystemComparatorData
  | FileSystemAsyncComparatorData
  | ExpressMiddlewareFlowData
  | RestfulApiDesignerData
  | TestPyramidVisualizerData
  | MockFlowVisualizerData
  | TestingLibraryQueryPriorityData
  | ComponentTestPlaygroundData
  | E2ETestFlowVisualizerData
  | CoreWebVitalsVisualizerData
  | ResourceHintsVisualizerData
  | DebounceThrottleVisualizerData
  | VirtualListVisualizerData
  | SecurityAttackFlowVisualizerData
  | CanvasPlaygroundData
  | SvgVsCanvasCompareData
  | D3DataBindingFlowData
  | EChartsConfigVisualizerData
  | DesignPatternShowcaseData
  | WebComponentsLifecycleData
  | WorkerDataTransferData
  | ObserverApiShowcaseData
  | GraphQLSchemaData
  | ApiLayerComparisonData
  | MFArchitectureGraphData
  | MFSandboxIsolationData
  | MFModuleFederationData
  | MFQiankunLifecycleData
  | MFCssIsolationData
  | I18nFormatPlaygroundData
  | AuthFlowGraphData
  | JWTPayloadDecoderData
  | ErrorMonitoringDashboardData
  | PerformanceObserverDemoData
  | UserTrackingFunnelData
  | RBACPermissionMatrixData

// ============================================================================
// 模块元数据类型
// ============================================================================

/** 学习阶段 */
export type LearningStage =
  | 'basics' // 第一阶段：基础
  | 'prerequisites' // 第二阶段：通用前置
  | 'react' // 第三阶段：React 技术栈
  | 'vue' // 第四阶段：Vue 技术栈
  | 'cross-platform' // 第五阶段：跨端移动端
  | 'engineering' // 第六阶段：工程化全栈
  | 'advanced' // 第七阶段：高级专项
  | 'interview' // 第八阶段：面试冲刺

/** 知识点难度 */
export type Difficulty = 1 | 2 | 3 | 4 | 5

/** 知识点定义 */
export interface KnowledgePoint {
  /** 序号 */
  order: number
  /** 知识点标题 */
  title: string
  /** 难度 1-5 */
  difficulty: Difficulty
  /** 是否为新增知识点 */
  isNew?: boolean
  /** 对应的可视化组件类型（可选） */
  visualizationType?: VisualizationType
  /** 该知识点的详细内容块 */
  blocks: ContentBlock[]
}

/** 模块元数据 */
export interface ModuleMeta {
  /** 模块编号 01-25 */
  number: string
  /** 模块标题 */
  title: string
  /** URL slug */
  slug: string
  /** 所属阶段 */
  stage: LearningStage
  /** 阶段显示名 */
  stageLabel: string
  /** 模块图标（emoji） */
  icon: string
  /** 模块简介 */
  summary: string
  /** 知识点数量 */
  knowledgePointCount: number
  /** 可视化组件数量 */
  visualizationCount: number
  /** 模块包含的知识点 */
  points: KnowledgePoint[]
}

/** 阶段定义 */
export interface StageInfo {
  id: LearningStage
  label: string
  /** 阶段图标 */
  icon: string
  /** 阶段描述 */
  description: string
  /** 该阶段的模块编号范围 */
  moduleRange: [number, number]
}

// ============================================================================
// visualizationMeta - 各组件的配置元数据
// ============================================================================

/** 组件元信息 */
export interface VisualizationMeta {
  type: VisualizationType
  /** 中文显示名 */
  label: string
  /** 英文标识 */
  identifier: string
  /** 用途说明 */
  purpose: string
}

/** 全部可视化组件的元数据映射（核心 11 种 + HTML 专用 7 种 + CSS 专用 7 种 + JS 专用 13 种 + DOM/BOM 专用 11 种） */
export const visualizationMeta: Record<VisualizationType, VisualizationMeta> = {
  knowledgegraph: {
    type: 'knowledgegraph',
    label: '知识图谱',
    identifier: 'knowledgegraph',
    purpose: '知识节点关系图',
  },
  flipcard: {
    type: 'flipcard',
    label: '翻转卡片',
    identifier: 'flipcard',
    purpose: '翻转卡片（正反两面）',
  },
  skillbar: {
    type: 'skillbar',
    label: '技能条',
    identifier: 'skillbar',
    purpose: '技能条进度动画',
  },
  sandbox: {
    type: 'sandbox',
    label: '代码沙盒',
    identifier: 'sandbox',
    purpose: '代码沙盒（可运行 JS）',
  },
  drag: {
    type: 'drag',
    label: '拖拽演示',
    identifier: 'drag',
    purpose: '拖拽交互演示',
  },
  timeline: {
    type: 'timeline',
    label: '时间线',
    identifier: 'timeline',
    purpose: '时间线/步骤流程（垂直/水平）',
  },
  comparetable: {
    type: 'comparetable',
    label: '对比表格',
    identifier: 'comparetable',
    purpose: '多列对比表格',
  },
  codestepper: {
    type: 'codestepper',
    label: '代码分步',
    identifier: 'codestepper',
    purpose: '代码分步执行演示',
  },
  architecture: {
    type: 'architecture',
    label: '架构图',
    identifier: 'architecture',
    purpose: '分层架构图',
  },
  quiz: {
    type: 'quiz',
    label: '测验卡片',
    identifier: 'quiz',
    purpose: '交互式测验卡片',
  },
  accordion: {
    type: 'accordion',
    label: '手风琴',
    identifier: 'accordion',
    purpose: '手风琴折叠面板',
  },
  // HTML 专用组件元数据复用 htmlVisualizationMeta
  ...htmlVisualizationMeta,
  // CSS 专用组件元数据复用 cssVisualizationMeta
  ...cssVisualizationMeta,
  // JS 专用组件元数据复用 jsVisualizationMeta
  ...jsVisualizationMeta,
  // DOM/BOM 专用组件元数据复用 domBomVisualizationMeta
  ...domBomVisualizationMeta,
  // CSS 工程化专用组件元数据复用 cssEngineeringVisualizationMeta
  ...cssEngineeringVisualizationMeta,
  // TypeScript 专用组件元数据复用 typeScriptVisualizationMeta
  ...typeScriptVisualizationMeta,
  // React 专用组件元数据复用 reactVisualizationMeta
  ...reactVisualizationMeta,
  // 算法专用组件元数据复用 algorithmVisualizationMeta
  ...algorithmVisualizationMeta,
  // React 进阶专用组件元数据复用 reactAdvancedVisualizationMeta
  ...reactAdvancedVisualizationMeta,
  // 面试备考专用组件元数据复用 interviewVisualizationMeta
  ...interviewVisualizationMeta,
  // Next.js 全栈专用组件元数据复用 nextjsVisualizationMeta
  ...nextjsVisualizationMeta,
  // Vue.js 基础专用组件元数据复用 vueVisualizationMeta
  ...vueVisualizationMeta,
  // Vue.js 进阶专用组件元数据复用 vueAdvancedVisualizationMeta
  ...vueAdvancedVisualizationMeta,
  // 小程序开发专用组件元数据复用 miniprogramVisualizationMeta
  ...miniprogramVisualizationMeta,
  // 跨平台移动端开发专用组件元数据复用 crossPlatformVisualizationMeta
  ...crossPlatformVisualizationMeta,
  // 前端工程化专用组件元数据复用 engineeringVisualizationMeta
  ...engineeringVisualizationMeta,
  // 浏览器原理与网络专用组件元数据复用 browserNetworkVisualizationMeta
  ...browserNetworkVisualizationMeta,
  // Node.js 与全栈专用组件元数据复用 nodejsVisualizationMeta
  ...nodejsVisualizationMeta,
  // 前端测试专用组件元数据复用 testingVisualizationMeta
  ...testingVisualizationMeta,
  // 性能优化与安全防护专用组件元数据复用 performanceSecurityVisualizationMeta
  ...performanceSecurityVisualizationMeta,
  // 数据可视化与前端架构专用组件元数据复用 visualizationArchitectureVisualizationMeta
  ...visualizationArchitectureVisualizationMeta,
  // Web 高级 API 与 GraphQL 专用组件元数据复用 webApiGraphQLVisualizationMeta
  ...webApiGraphQLVisualizationMeta,
  // 微前端与前端架构设计专用组件元数据复用 microfrontendVisualizationMeta
  ...microfrontendVisualizationMeta,
  // 监控埋点与认证授权专用组件元数据复用 monitoringAuthVisualizationMeta
  ...monitoringAuthVisualizationMeta,
}

// ============================================================================
// 辅助类型守卫
// ============================================================================

export function isVisualizationBlock(block: ContentBlock): block is VisualizationBlock {
  return block.type === 'demo'
}

export function isHeadingBlock(block: ContentBlock): block is HeadingBlock {
  return block.type === 'heading'
}

export function isCodeBlock(block: ContentBlock): block is CodeBlock {
  return block.type === 'code'
}
