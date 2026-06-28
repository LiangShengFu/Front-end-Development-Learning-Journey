/**
 * VisualizationRenderer - 可视化组件分发器
 *
 * 根据 VisualizationBlock 的 visualizationType 渲染对应的可视化组件。
 * 包含组件标题栏（显示组件类型标签）。
 */
import type { VisualizationBlock, VisualizationType } from '../../lib/types'
import { visualizationMeta } from '../../lib/types'
import type {
  HeapVisualizerData,
  TrieVisualizerData,
  UnionFindVisualizerData,
  DivideConquerTreeVisualizerData,
  StringAlgorithmVisualizerData,
  HashTableVisualizerData,
  BinarySearchVisualizerData,
  SlidingWindowVisualizerData,
  BacktrackingTreeVisualizerData,
  DynamicProgrammingVisualizerData,
  StackQueueVisualizerData,
  LruCacheSimulatorData,
  LinkedListStepperData,
  BinaryTreeWalkerData,
  SortingRaceArenaData,
  BfsPathFinderData,
  HandwritingChallengeData,
} from '../../lib/algorithm-visualization-types'
import type {
  KnowledgeGraphData,
  FlipCardData,
  SkillBarData,
  SandboxData,
  DragInteractionData,
  TimelineData,
  CompareTableData,
  CodeStepperData,
  ArchitectureDiagramData,
  QuizData,
  AccordionData,
} from '../../lib/types'
import type {
  DomTreeData,
  ElementAnatomyData,
  SemanticCompareData,
  FormPlaygroundData,
  TableBuilderData,
  A11yChecklistData,
  PathParserData,
  ApiCardData,
} from '../../lib/html-visualization-types'
import type {
  FlexboxPlaygroundData,
  BoxModelPlaygroundData,
  SelectorPlaygroundData,
  AnimationPlaygroundData,
  PositionPlaygroundData,
  DisplayTypePlaygroundData,
  ResponsiveViewportData,
  GridPlaygroundData,
} from '../../lib/css-visualization-types'
import type {
  DataTypeExplorerData,
  EqualityComparatorData,
  ArrayMethodData,
  EventLoopData,
  PromiseFlowData,
  RegexTesterData,
  TodoAppData,
} from '../../lib/js-visualization-types'
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
} from '../../lib/dom-bom-visualization-types'
import type {
  TailwindPlaygroundData,
  BreakpointSimulatorData,
  SassPlaygroundData,
  BootstrapGridDemoData,
  ResponsiveNavDemoData,
} from '../../lib/css-engineering-visualization-types'
import type {
  TsTypeCheckerData,
  TypeTransformBoardData,
  GenericConstraintFlowData,
  TsConfigPlaygroundData,
  ApiTypingWorkbenchData,
  MigrationPlannerData,
  TypeInferenceTimelineData,
  TypeMatrixTableData,
} from '../../lib/typescript-visualization-types'
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
} from '../../lib/react-visualization-types'
import type {
  FiberWorkLoopSimulatorData,
  MemoEffectComparatorData,
  VirtualListSimulatorData,
  HookExtractionWorkshopData,
  TransitionVsSyncDemoData,
  PatternFactoryData,
} from '../../lib/react-advanced-visualization-types'
import type {
  InterviewQuizEngineData,
  ConceptExplainVizData,
  FlashcardDeckData,
  MockInterviewTimerData,
  ProgressDashboardData,
  SystemDesignBoardData,
} from '../../lib/interview-visualization-types'
import type {
  RenderModeComparatorData,
  RSCPayloadFlowData,
  ServerActionSandboxData,
  MiddlewareFlowExplorerData,
  FrameworkDecisionWizardData,
  IslandsArchDemoData,
  RouteVsActionDeciderData,
} from '../../lib/nextjs-visualization-types'
import type {
  VueVsReactComparatorData,
  ProxyReactivityTrackerData,
  VueComponentSandboxData,
  DefineEmitsWorkshopData,
  PiniaStoreExplorerData,
  PatchFlagVisualizerData,
} from '../../lib/vue-visualization-types'
import type {
  NuxtHybridRenderStudioData,
  ComposableFlowVisualizerData,
  CustomDirectiveWorkbenchData,
  KeepAliveCacheSimulatorData,
} from '../../lib/vue-advanced-visualization-types'
import type {
  DualThreadModelVisualizerData,
  SetDataPerformanceComparatorData,
  MiniComponentWorkbenchData,
  TaroCompileFlowVisualizerData,
  UniAppConditionalCompilerData,
  SubpackageLoadingVisualizerData,
} from '../../lib/miniprogram-visualization-types'
import type {
  MobileAdaptationSandboxData,
  RNArchitectureComparatorData,
  ExpoRouterTreeVisualizerData,
  CapacitorPluginBridgeData,
  ServiceWorkerCacheStrategiesData,
  PwaPushFlowVisualizerData,
  CrossPlatformSelectorData,
} from '../../lib/cross-platform-visualization-types'
import type {
  WebpackBuildFlowVisualizerData,
  ViteEsmLoadingFlowData,
  PnpmHardlinkVisualizerData,
  CommitMessageParserData,
  MonorepoTreeVisualizerData,
  TurborepoTaskFlowData,
  CICDPipelineVisualizerData,
} from '../../lib/engineering-visualization-types'
import type {
  RenderingPipelineVisualizerData,
  ReflowRepaintComparatorData,
  HttpRequestResponseFlowData,
  CacheDecisionTreeData,
  TcpHandshakeVisualizerData,
  HttpsHandshakeFlowData,
  QuicMultiplexingVisualizerData,
} from '../../lib/browser-network-visualization-types'
import type {
  EventLoopVisualizerData,
  ModuleSystemComparatorData,
  FileSystemAsyncComparatorData,
  ExpressMiddlewareFlowData,
  RestfulApiDesignerData,
} from '../../lib/nodejs-visualization-types'
import type {
  TestPyramidVisualizerData,
  MockFlowVisualizerData,
  TestingLibraryQueryPriorityData,
  ComponentTestPlaygroundData,
  E2ETestFlowVisualizerData,
} from '../../lib/testing-visualization-types'
import type {
  CoreWebVitalsVisualizerData,
  ResourceHintsVisualizerData,
  DebounceThrottleVisualizerData,
  VirtualListVisualizerData,
  SecurityAttackFlowVisualizerData,
} from '../../lib/performance-security-visualization-types'
import type {
  CanvasPlaygroundData,
  SvgVsCanvasCompareData,
  D3DataBindingFlowData,
  EChartsConfigVisualizerData,
  DesignPatternShowcaseData,
} from '../../lib/visualization-architecture-visualization-types'
import type {
  WebComponentsLifecycleData,
  WorkerDataTransferData,
  ObserverApiShowcaseData,
  GraphQLSchemaData,
  ApiLayerComparisonData,
} from '../../lib/web-api-graphql-visualization-types'
import type {
  MFArchitectureGraphData,
  MFSandboxIsolationData,
  MFModuleFederationData,
  MFQiankunLifecycleData,
  MFCssIsolationData,
} from '../../lib/microfrontend-visualization-types'
import type {
  I18nFormatPlaygroundData,
  AuthFlowGraphData,
  JWTPayloadDecoderData,
  ErrorMonitoringDashboardData,
  PerformanceObserverDemoData,
  UserTrackingFunnelData,
  RBACPermissionMatrixData,
} from '../../lib/monitoring-auth-visualization-types'
import { ErrorBoundary } from '../ui/ErrorBoundary'
import { lazy, Suspense } from 'react'
const KnowledgeGraph = lazy(() => import('../interactive/KnowledgeGraph').then(m => ({ default: m.KnowledgeGraph })))
const FlipCard = lazy(() => import('../interactive/FlipCard').then(m => ({ default: m.FlipCard })))
const SkillBar = lazy(() => import('../interactive/SkillBar').then(m => ({ default: m.SkillBar })))
const Sandbox = lazy(() => import('../interactive/Sandbox').then(m => ({ default: m.Sandbox })))
const DragInteraction = lazy(() => import('../interactive/DragInteraction').then(m => ({ default: m.DragInteraction })))
const Timeline = lazy(() => import('../interactive/Timeline').then(m => ({ default: m.Timeline })))
const CompareTable = lazy(() => import('../interactive/CompareTable').then(m => ({ default: m.CompareTable })))
const CodeStepper = lazy(() => import('../interactive/CodeStepper').then(m => ({ default: m.CodeStepper })))
const ArchitectureDiagram = lazy(() => import('../interactive/ArchitectureDiagram').then(m => ({ default: m.ArchitectureDiagram })))
const QuizCard = lazy(() => import('../interactive/QuizCard').then(m => ({ default: m.QuizCard })))
const Accordion = lazy(() => import('../interactive/Accordion').then(m => ({ default: m.Accordion })))
const DomTree = lazy(() => import('../interactive/html/DomTree').then(m => ({ default: m.DomTree })))
const ElementAnatomy = lazy(() => import('../interactive/html/ElementAnatomy').then(m => ({ default: m.ElementAnatomy })))
const SemanticCompare = lazy(() => import('../interactive/html/SemanticCompare').then(m => ({ default: m.SemanticCompare })))
const FormPlayground = lazy(() => import('../interactive/html/FormPlayground').then(m => ({ default: m.FormPlayground })))
const TableBuilder = lazy(() => import('../interactive/html/TableBuilder').then(m => ({ default: m.TableBuilder })))
const A11yChecklist = lazy(() => import('../interactive/html/A11yChecklist').then(m => ({ default: m.A11yChecklist })))
const PathParser = lazy(() => import('../interactive/html/PathParser').then(m => ({ default: m.PathParser })))
const ApiCard = lazy(() => import('../interactive/html/ApiCard').then(m => ({ default: m.ApiCard })))
const FlexboxPlayground = lazy(() => import('../interactive/css/FlexboxPlayground').then(m => ({ default: m.FlexboxPlayground })))
const BoxModelVisualizer = lazy(() => import('../interactive/css/BoxModelVisualizer').then(m => ({ default: m.BoxModelVisualizer })))
const SelectorPlayground = lazy(() => import('../interactive/css/SelectorPlayground').then(m => ({ default: m.SelectorPlayground })))
const AnimationPlayground = lazy(() => import('../interactive/css/AnimationPlayground').then(m => ({ default: m.AnimationPlayground })))
const PositionPlayground = lazy(() => import('../interactive/css/PositionPlayground').then(m => ({ default: m.PositionPlayground })))
const DisplayTypeDemo = lazy(() => import('../interactive/css/DisplayTypeDemo').then(m => ({ default: m.DisplayTypeDemo })))
const ResponsiveViewport = lazy(() => import('../interactive/css/ResponsiveViewport').then(m => ({ default: m.ResponsiveViewport })))
const GridPlayground = lazy(() => import('../interactive/css/GridPlayground').then(m => ({ default: m.GridPlayground })))
const DataTypeExplorer = lazy(() => import('../interactive/js/DataTypeExplorer').then(m => ({ default: m.DataTypeExplorer })))
const EqualityComparator = lazy(() => import('../interactive/js/EqualityComparator').then(m => ({ default: m.EqualityComparator })))
const RegexTester = lazy(() => import('../interactive/js/RegexTester').then(m => ({ default: m.RegexTester })))
const ArrayMethodPlayground = lazy(() => import('../interactive/js/ArrayMethodPlayground').then(m => ({ default: m.ArrayMethodPlayground })))
const EventLoopVisualizer = lazy(() => import('../interactive/js/EventLoopVisualizer').then(m => ({ default: m.EventLoopVisualizer })))
const PromiseFlowDemo = lazy(() => import('../interactive/js/PromiseFlowDemo').then(m => ({ default: m.PromiseFlowDemo })))
const TodoAppDemo = lazy(() => import('../interactive/js/TodoAppDemo').then(m => ({ default: m.TodoAppDemo })))
const DomTreeVisualizer = lazy(() => import('../interactive/dombom/DomTreeVisualizer').then(m => ({ default: m.DomTreeVisualizer })))
const EventFlowVisualizer = lazy(() => import('../interactive/dombom/EventFlowVisualizer').then(m => ({ default: m.EventFlowVisualizer })))
const EventDelegationDemo = lazy(() => import('../interactive/dombom/EventDelegationDemo').then(m => ({ default: m.EventDelegationDemo })))
const LocationParser = lazy(() => import('../interactive/dombom/LocationParser').then(m => ({ default: m.LocationParser })))
const HistoryRouterDemo = lazy(() => import('../interactive/dombom/HistoryRouterDemo').then(m => ({ default: m.HistoryRouterDemo })))
const StoragePlayground = lazy(() => import('../interactive/dombom/StoragePlayground').then(m => ({ default: m.StoragePlayground })))
const GeometryCalculator = lazy(() => import('../interactive/dombom/GeometryCalculator').then(m => ({ default: m.GeometryCalculator })))
const ScrollAnimationDemo = lazy(() => import('../interactive/dombom/ScrollAnimationDemo').then(m => ({ default: m.ScrollAnimationDemo })))
const FileUploadDemo = lazy(() => import('../interactive/dombom/FileUploadDemo').then(m => ({ default: m.FileUploadDemo })))
const BlobDownloadDemo = lazy(() => import('../interactive/dombom/BlobDownloadDemo').then(m => ({ default: m.BlobDownloadDemo })))
const RafAnimationDemo = lazy(() => import('../interactive/dombom/RafAnimationDemo').then(m => ({ default: m.RafAnimationDemo })))
const TailwindPlayground = lazy(() => import('../interactive/css-eng/TailwindPlayground').then(m => ({ default: m.TailwindPlayground })))
const BreakpointSimulator = lazy(() => import('../interactive/css-eng/BreakpointSimulator').then(m => ({ default: m.BreakpointSimulator })))
const SassPlayground = lazy(() => import('../interactive/css-eng/SassPlayground').then(m => ({ default: m.SassPlayground })))
const BootstrapGridDemo = lazy(() => import('../interactive/css-eng/BootstrapGridDemo').then(m => ({ default: m.BootstrapGridDemo })))
const ResponsiveNavDemo = lazy(() => import('../interactive/css-eng/ResponsiveNavDemo').then(m => ({ default: m.ResponsiveNavDemo })))
const TsTypeChecker = lazy(() => import('../interactive/typescript/TsTypeChecker').then(m => ({ default: m.TsTypeChecker })))
const TypeTransformBoard = lazy(() => import('../interactive/typescript/TypeTransformBoard').then(m => ({ default: m.TypeTransformBoard })))
const GenericConstraintFlow = lazy(() => import('../interactive/typescript/GenericConstraintFlow').then(m => ({ default: m.GenericConstraintFlow })))
const TsConfigPlayground = lazy(() => import('../interactive/typescript/TsConfigPlayground').then(m => ({ default: m.TsConfigPlayground })))
const ApiTypingWorkbench = lazy(() => import('../interactive/typescript/ApiTypingWorkbench').then(m => ({ default: m.ApiTypingWorkbench })))
const MigrationPlanner = lazy(() => import('../interactive/typescript/MigrationPlanner').then(m => ({ default: m.MigrationPlanner })))
const TypeInferenceTimeline = lazy(() => import('../interactive/typescript/TypeInferenceTimeline').then(m => ({ default: m.TypeInferenceTimeline })))
const TypeMatrixTable = lazy(() => import('../interactive/typescript/TypeMatrixTable').then(m => ({ default: m.TypeMatrixTable })))
const VdomDiffSimulator = lazy(() => import('../interactive/react/VdomDiffSimulator').then(m => ({ default: m.VdomDiffSimulator })))
const JsxLivePreview = lazy(() => import('../interactive/react/JsxLivePreview').then(m => ({ default: m.JsxLivePreview })))
const DataFetchStateMachine = lazy(() => import('../interactive/react/DataFetchStateMachine').then(m => ({ default: m.DataFetchStateMachine })))
const RerenderTracker = lazy(() => import('../interactive/react/RerenderTracker').then(m => ({ default: m.RerenderTracker })))
const ReduxCycleSimulator = lazy(() => import('../interactive/react/ReduxCycleSimulator').then(m => ({ default: m.ReduxCycleSimulator })))
const SuspenseBoundaryDemo = lazy(() => import('../interactive/react/SuspenseBoundaryDemo').then(m => ({ default: m.SuspenseBoundaryDemo })))
const ComponentLibDecider = lazy(() => import('../interactive/react/ComponentLibDecider').then(m => ({ default: m.ComponentLibDecider })))
const DecisionTree = lazy(() => import('../interactive/react/DecisionTree').then(m => ({ default: m.DecisionTree })))
const DiffHighlightBoard = lazy(() => import('../interactive/react/DiffHighlightBoard').then(m => ({ default: m.DiffHighlightBoard })))
const StackQueueVisualizer = lazy(() => import('../interactive/algorithm/StackQueueVisualizer').then(m => ({ default: m.StackQueueVisualizer })))
const LruCacheSimulator = lazy(() => import('../interactive/algorithm/LruCacheSimulator').then(m => ({ default: m.LruCacheSimulator })))
const LinkedListStepper = lazy(() => import('../interactive/algorithm/LinkedListStepper').then(m => ({ default: m.LinkedListStepper })))
const BinaryTreeWalker = lazy(() => import('../interactive/algorithm/BinaryTreeWalker').then(m => ({ default: m.BinaryTreeWalker })))
const SortingRaceArena = lazy(() => import('../interactive/algorithm/SortingRaceArena').then(m => ({ default: m.SortingRaceArena })))
const BfsPathFinder = lazy(() => import('../interactive/algorithm/BfsPathFinder').then(m => ({ default: m.BfsPathFinder })))
const HandwritingChallenge = lazy(() => import('../interactive/algorithm/HandwritingChallenge').then(m => ({ default: m.HandwritingChallenge })))
const HeapVisualizer = lazy(() => import('../interactive/algorithm/HeapVisualizer').then(m => ({ default: m.HeapVisualizer })))
const TrieVisualizer = lazy(() => import('../interactive/algorithm/TrieVisualizer').then(m => ({ default: m.TrieVisualizer })))
const UnionFindVisualizer = lazy(() => import('../interactive/algorithm/UnionFindVisualizer').then(m => ({ default: m.UnionFindVisualizer })))
const DivideConquerTreeVisualizer = lazy(() => import('../interactive/algorithm/DivideConquerTreeVisualizer').then(m => ({ default: m.DivideConquerTreeVisualizer })))
const StringAlgorithmVisualizer = lazy(() => import('../interactive/algorithm/StringAlgorithmVisualizer').then(m => ({ default: m.StringAlgorithmVisualizer })))
const HashTableVisualizer = lazy(() => import('../interactive/algorithm/HashTableVisualizer').then(m => ({ default: m.HashTableVisualizer })))
const BinarySearchVisualizer = lazy(() => import('../interactive/algorithm/BinarySearchVisualizer').then(m => ({ default: m.BinarySearchVisualizer })))
const SlidingWindowVisualizer = lazy(() => import('../interactive/algorithm/SlidingWindowVisualizer').then(m => ({ default: m.SlidingWindowVisualizer })))
const BacktrackingTreeVisualizer = lazy(() => import('../interactive/algorithm/BacktrackingTreeVisualizer').then(m => ({ default: m.BacktrackingTreeVisualizer })))
const DynamicProgrammingVisualizer = lazy(() => import('../interactive/algorithm/DynamicProgrammingVisualizer').then(m => ({ default: m.DynamicProgrammingVisualizer })))
const FiberWorkLoopSimulator = lazy(() => import('../interactive/react-advanced/FiberWorkLoopSimulator').then(m => ({ default: m.FiberWorkLoopSimulator })))
const MemoEffectComparator = lazy(() => import('../interactive/react-advanced/MemoEffectComparator').then(m => ({ default: m.MemoEffectComparator })))
const VirtualListSimulator = lazy(() => import('../interactive/react-advanced/VirtualListSimulator').then(m => ({ default: m.VirtualListSimulator })))
const HookExtractionWorkshop = lazy(() => import('../interactive/react-advanced/HookExtractionWorkshop').then(m => ({ default: m.HookExtractionWorkshop })))
const TransitionVsSyncDemo = lazy(() => import('../interactive/react-advanced/TransitionVsSyncDemo').then(m => ({ default: m.TransitionVsSyncDemo })))
const PatternFactory = lazy(() => import('../interactive/react-advanced/PatternFactory').then(m => ({ default: m.PatternFactory })))
const InterviewQuizEngine = lazy(() => import('../interactive/interview/InterviewQuizEngine').then(m => ({ default: m.InterviewQuizEngine })))
const ConceptExplainViz = lazy(() => import('../interactive/interview/ConceptExplainViz').then(m => ({ default: m.ConceptExplainViz })))
const FlashcardDeck = lazy(() => import('../interactive/interview/FlashcardDeck').then(m => ({ default: m.FlashcardDeck })))
const MockInterviewTimer = lazy(() => import('../interactive/interview/MockInterviewTimer').then(m => ({ default: m.MockInterviewTimer })))
const ProgressDashboard = lazy(() => import('../interactive/interview/ProgressDashboard').then(m => ({ default: m.ProgressDashboard })))
const SystemDesignBoard = lazy(() => import('../interactive/interview/SystemDesignBoard').then(m => ({ default: m.SystemDesignBoard })))
const RenderModeComparator = lazy(() => import('../interactive/nextjs/RenderModeComparator').then(m => ({ default: m.RenderModeComparator })))
const RSCPayloadFlow = lazy(() => import('../interactive/nextjs/RSCPayloadFlow').then(m => ({ default: m.RSCPayloadFlow })))
const ServerActionSandbox = lazy(() => import('../interactive/nextjs/ServerActionSandbox').then(m => ({ default: m.ServerActionSandbox })))
const MiddlewareFlowExplorer = lazy(() => import('../interactive/nextjs/MiddlewareFlowExplorer').then(m => ({ default: m.MiddlewareFlowExplorer })))
const FrameworkDecisionWizard = lazy(() => import('../interactive/nextjs/FrameworkDecisionWizard').then(m => ({ default: m.FrameworkDecisionWizard })))
const IslandsArchDemo = lazy(() => import('../interactive/nextjs/IslandsArchDemo').then(m => ({ default: m.IslandsArchDemo })))
const RouteVsActionDecider = lazy(() => import('../interactive/nextjs/RouteVsActionDecider').then(m => ({ default: m.RouteVsActionDecider })))
const VueVsReactComparator = lazy(() => import('../interactive/vue/VueVsReactComparator').then(m => ({ default: m.VueVsReactComparator })))
const ProxyReactivityTracker = lazy(() => import('../interactive/vue/ProxyReactivityTracker').then(m => ({ default: m.ProxyReactivityTracker })))
const VueComponentSandbox = lazy(() => import('../interactive/vue/VueComponentSandbox').then(m => ({ default: m.VueComponentSandbox })))
const DefineEmitsWorkshop = lazy(() => import('../interactive/vue/DefineEmitsWorkshop').then(m => ({ default: m.DefineEmitsWorkshop })))
const PiniaStoreExplorer = lazy(() => import('../interactive/vue/PiniaStoreExplorer').then(m => ({ default: m.PiniaStoreExplorer })))
const PatchFlagVisualizer = lazy(() => import('../interactive/vue/PatchFlagVisualizer').then(m => ({ default: m.PatchFlagVisualizer })))
const NuxtHybridRenderStudio = lazy(() => import('../interactive/vue-advanced/NuxtHybridRenderStudio').then(m => ({ default: m.NuxtHybridRenderStudio })))
const ComposableFlowVisualizer = lazy(() => import('../interactive/vue-advanced/ComposableFlowVisualizer').then(m => ({ default: m.ComposableFlowVisualizer })))
const CustomDirectiveWorkbench = lazy(() => import('../interactive/vue-advanced/CustomDirectiveWorkbench').then(m => ({ default: m.CustomDirectiveWorkbench })))
const KeepAliveCacheSimulator = lazy(() => import('../interactive/vue-advanced/KeepAliveCacheSimulator').then(m => ({ default: m.KeepAliveCacheSimulator })))
const DualThreadModelVisualizer = lazy(() => import('../interactive/miniprogram/DualThreadModelVisualizer').then(m => ({ default: m.DualThreadModelVisualizer })))
const SetDataPerformanceComparator = lazy(() => import('../interactive/miniprogram/SetDataPerformanceComparator').then(m => ({ default: m.SetDataPerformanceComparator })))
const MiniComponentWorkbench = lazy(() => import('../interactive/miniprogram/MiniComponentWorkbench').then(m => ({ default: m.MiniComponentWorkbench })))
const TaroCompileFlowVisualizer = lazy(() => import('../interactive/miniprogram/TaroCompileFlowVisualizer').then(m => ({ default: m.TaroCompileFlowVisualizer })))
const UniAppConditionalCompiler = lazy(() => import('../interactive/miniprogram/UniAppConditionalCompiler').then(m => ({ default: m.UniAppConditionalCompiler })))
const SubpackageLoadingVisualizer = lazy(() => import('../interactive/miniprogram/SubpackageLoadingVisualizer').then(m => ({ default: m.SubpackageLoadingVisualizer })))
const MobileAdaptationSandbox = lazy(() => import('../interactive/cross-platform/MobileAdaptationSandbox').then(m => ({ default: m.MobileAdaptationSandbox })))
const RNArchitectureComparator = lazy(() => import('../interactive/cross-platform/RNArchitectureComparator').then(m => ({ default: m.RNArchitectureComparator })))
const ExpoRouterTreeVisualizer = lazy(() => import('../interactive/cross-platform/ExpoRouterTreeVisualizer').then(m => ({ default: m.ExpoRouterTreeVisualizer })))
const CapacitorPluginBridge = lazy(() => import('../interactive/cross-platform/CapacitorPluginBridge').then(m => ({ default: m.CapacitorPluginBridge })))
const ServiceWorkerCacheStrategies = lazy(() => import('../interactive/cross-platform/ServiceWorkerCacheStrategies').then(m => ({ default: m.ServiceWorkerCacheStrategies })))
const PwaPushFlowVisualizer = lazy(() => import('../interactive/cross-platform/PwaPushFlowVisualizer').then(m => ({ default: m.PwaPushFlowVisualizer })))
const CrossPlatformSelector = lazy(() => import('../interactive/cross-platform/CrossPlatformSelector').then(m => ({ default: m.CrossPlatformSelector })))
const WebpackBuildFlowVisualizer = lazy(() => import('../interactive/engineering/WebpackBuildFlowVisualizer').then(m => ({ default: m.WebpackBuildFlowVisualizer })))
const ViteEsmLoadingFlow = lazy(() => import('../interactive/engineering/ViteEsmLoadingFlow').then(m => ({ default: m.ViteEsmLoadingFlow })))
const PnpmHardlinkVisualizer = lazy(() => import('../interactive/engineering/PnpmHardlinkVisualizer').then(m => ({ default: m.PnpmHardlinkVisualizer })))
const CommitMessageParser = lazy(() => import('../interactive/engineering/CommitMessageParser').then(m => ({ default: m.CommitMessageParser })))
const MonorepoTreeVisualizer = lazy(() => import('../interactive/engineering/MonorepoTreeVisualizer').then(m => ({ default: m.MonorepoTreeVisualizer })))
const TurborepoTaskFlow = lazy(() => import('../interactive/engineering/TurborepoTaskFlow').then(m => ({ default: m.TurborepoTaskFlow })))
const CICDPipelineVisualizer = lazy(() => import('../interactive/engineering/CICDPipelineVisualizer').then(m => ({ default: m.CICDPipelineVisualizer })))
const RenderingPipelineVisualizer = lazy(() => import('../interactive/browser-network/RenderingPipelineVisualizer').then(m => ({ default: m.RenderingPipelineVisualizer })))
const ReflowRepaintComparator = lazy(() => import('../interactive/browser-network/ReflowRepaintComparator').then(m => ({ default: m.ReflowRepaintComparator })))
const HttpRequestResponseFlow = lazy(() => import('../interactive/browser-network/HttpRequestResponseFlow').then(m => ({ default: m.HttpRequestResponseFlow })))
const CacheDecisionTree = lazy(() => import('../interactive/browser-network/CacheDecisionTree').then(m => ({ default: m.CacheDecisionTree })))
const TcpHandshakeVisualizer = lazy(() => import('../interactive/browser-network/TcpHandshakeVisualizer').then(m => ({ default: m.TcpHandshakeVisualizer })))
const HttpsHandshakeFlow = lazy(() => import('../interactive/browser-network/HttpsHandshakeFlow').then(m => ({ default: m.HttpsHandshakeFlow })))
const QuicMultiplexingVisualizer = lazy(() => import('../interactive/browser-network/QuicMultiplexingVisualizer').then(m => ({ default: m.QuicMultiplexingVisualizer })))
const NodejsEventLoopVisualizer = lazy(() => import('../interactive/nodejs/EventLoopVisualizer').then(m => ({ default: m.EventLoopVisualizer })))
const ModuleSystemComparator = lazy(() => import('../interactive/nodejs/ModuleSystemComparator').then(m => ({ default: m.ModuleSystemComparator })))
const FileSystemAsyncComparator = lazy(() => import('../interactive/nodejs/FileSystemAsyncComparator').then(m => ({ default: m.FileSystemAsyncComparator })))
const ExpressMiddlewareFlow = lazy(() => import('../interactive/nodejs/ExpressMiddlewareFlow').then(m => ({ default: m.ExpressMiddlewareFlow })))
const RestfulApiDesigner = lazy(() => import('../interactive/nodejs/RestfulApiDesigner').then(m => ({ default: m.RestfulApiDesigner })))
const TestPyramidVisualizer = lazy(() => import('../interactive/testing/TestPyramidVisualizer').then(m => ({ default: m.TestPyramidVisualizer })))
const MockFlowVisualizer = lazy(() => import('../interactive/testing/MockFlowVisualizer').then(m => ({ default: m.MockFlowVisualizer })))
const TestingLibraryQueryPriority = lazy(() => import('../interactive/testing/TestingLibraryQueryPriority').then(m => ({ default: m.TestingLibraryQueryPriority })))
const ComponentTestPlayground = lazy(() => import('../interactive/testing/ComponentTestPlayground').then(m => ({ default: m.ComponentTestPlayground })))
const E2ETestFlowVisualizer = lazy(() => import('../interactive/testing/E2ETestFlowVisualizer').then(m => ({ default: m.E2ETestFlowVisualizer })))
const CoreWebVitalsVisualizer = lazy(() => import('../interactive/performance-security/CoreWebVitalsVisualizer').then(m => ({ default: m.CoreWebVitalsVisualizer })))
const ResourceHintsVisualizer = lazy(() => import('../interactive/performance-security/ResourceHintsVisualizer').then(m => ({ default: m.ResourceHintsVisualizer })))
const DebounceThrottleVisualizer = lazy(() => import('../interactive/performance-security/DebounceThrottleVisualizer').then(m => ({ default: m.DebounceThrottleVisualizer })))
const VirtualListVisualizer = lazy(() => import('../interactive/performance-security/VirtualListVisualizer').then(m => ({ default: m.VirtualListVisualizer })))
const SecurityAttackFlowVisualizer = lazy(() => import('../interactive/performance-security/SecurityAttackFlowVisualizer').then(m => ({ default: m.SecurityAttackFlowVisualizer })))
const CanvasPlayground = lazy(() => import('../interactive/visualization-architecture/CanvasPlayground').then(m => ({ default: m.CanvasPlayground })))
const SvgVsCanvasCompare = lazy(() => import('../interactive/visualization-architecture/SVGvsCanvasCompare').then(m => ({ default: m.SvgVsCanvasCompare })))
const D3DataBindingFlow = lazy(() => import('../interactive/visualization-architecture/D3DataBindingFlow').then(m => ({ default: m.D3DataBindingFlow })))
const EChartsConfigVisualizer = lazy(() => import('../interactive/visualization-architecture/EChartsConfigVisualizer').then(m => ({ default: m.EChartsConfigVisualizer })))
const DesignPatternShowcase = lazy(() => import('../interactive/visualization-architecture/DesignPatternShowcase').then(m => ({ default: m.DesignPatternShowcase })))
const WebComponentsLifecycleVisualizer = lazy(() => import('../interactive/web-api-graphql/WebComponentsLifecycleVisualizer').then(m => ({ default: m.WebComponentsLifecycleVisualizer })))
const WorkerDataTransferVisualizer = lazy(() => import('../interactive/web-api-graphql/WorkerDataTransferVisualizer').then(m => ({ default: m.WorkerDataTransferVisualizer })))
const ObserverApiShowcase = lazy(() => import('../interactive/web-api-graphql/ObserverApiShowcase').then(m => ({ default: m.ObserverApiShowcase })))
const GraphQLSchemaExplorer = lazy(() => import('../interactive/web-api-graphql/GraphQLSchemaExplorer').then(m => ({ default: m.GraphQLSchemaExplorer })))
const ApiLayerComparisonVisualizer = lazy(() => import('../interactive/web-api-graphql/ApiLayerComparisonVisualizer').then(m => ({ default: m.ApiLayerComparisonVisualizer })))
const MFArchitectureGraphVisualizer = lazy(() => import('../interactive/microfrontend/MFArchitectureGraphVisualizer').then(m => ({ default: m.MFArchitectureGraphVisualizer })))
const MFSandboxIsolationVisualizer = lazy(() => import('../interactive/microfrontend/MFSandboxIsolationVisualizer').then(m => ({ default: m.MFSandboxIsolationVisualizer })))
const MFModuleFederationVisualizer = lazy(() => import('../interactive/microfrontend/MFModuleFederationVisualizer').then(m => ({ default: m.MFModuleFederationVisualizer })))
const MFQiankunLifecycleVisualizer = lazy(() => import('../interactive/microfrontend/MFQiankunLifecycleVisualizer').then(m => ({ default: m.MFQiankunLifecycleVisualizer })))
const MFCssIsolationVisualizer = lazy(() => import('../interactive/microfrontend/MFCssIsolationVisualizer').then(m => ({ default: m.MFCssIsolationVisualizer })))
const I18nFormatPlayground = lazy(() => import('../interactive/monitoring-auth/I18nFormatPlayground').then(m => ({ default: m.I18nFormatPlayground })))
const AuthFlowGraph = lazy(() => import('../interactive/monitoring-auth/AuthFlowGraph').then(m => ({ default: m.AuthFlowGraph })))
const JWTPayloadDecoder = lazy(() => import('../interactive/monitoring-auth/JWTPayloadDecoder').then(m => ({ default: m.JWTPayloadDecoder })))
const ErrorMonitoringDashboard = lazy(() => import('../interactive/monitoring-auth/ErrorMonitoringDashboard').then(m => ({ default: m.ErrorMonitoringDashboard })))
const PerformanceObserverDemo = lazy(() => import('../interactive/monitoring-auth/PerformanceObserverDemo').then(m => ({ default: m.PerformanceObserverDemo })))
const UserTrackingFunnel = lazy(() => import('../interactive/monitoring-auth/UserTrackingFunnel').then(m => ({ default: m.UserTrackingFunnel })))
const RBACPermissionMatrix = lazy(() => import('../interactive/monitoring-auth/RBACPermissionMatrix').then(m => ({ default: m.RBACPermissionMatrix })))


interface VisualizationRendererProps {
  block: VisualizationBlock
}

export function VisualizationRenderer({ block }: VisualizationRendererProps) {
  const meta = visualizationMeta[block.visualizationType]

  return (
    <div className="my-xl">
      {/* 组件标题栏 */}
      <div className="mb-lg flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            {meta.identifier}
          </span>
          <span className="text-body-mid">·</span>
          <span className="text-body-sm text-body-mid">{meta.purpose}</span>
        </div>
      </div>

      {/* 组件内容（局部 ErrorBoundary：单组件崩溃不影响同 KP 其他内容块） */}
      <ErrorBoundary label={block.visualizationType}>
        <Suspense
          fallback={
            <div className="flex min-h-[200px] items-center justify-center text-body-sm text-body-mid">
              加载中…
            </div>
          }
        >
          <div>{renderVisualization(block.visualizationType, block.data)}</div>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

function renderVisualization(type: VisualizationType, data: VisualizationBlock['data']) {
  switch (type) {
    case 'knowledgegraph':
      return <KnowledgeGraph data={data as KnowledgeGraphData} />
    case 'flipcard':
      return <FlipCard data={data as FlipCardData} />
    case 'skillbar':
      return <SkillBar data={data as SkillBarData} />
    case 'sandbox':
      return <Sandbox data={data as SandboxData} />
    case 'drag':
      return <DragInteraction data={data as DragInteractionData} />
    case 'timeline':
      return <Timeline data={data as TimelineData} />
    case 'comparetable':
      return <CompareTable data={data as CompareTableData} />
    case 'codestepper':
      return <CodeStepper data={data as CodeStepperData} />
    case 'architecture':
      return <ArchitectureDiagram data={data as ArchitectureDiagramData} />
    case 'quiz':
      return <QuizCard data={data as QuizData} />
    case 'accordion':
      return <Accordion data={data as AccordionData} />
    case 'dom-tree':
      return <DomTree data={data as DomTreeData} />
    case 'element-anatomy':
      return <ElementAnatomy data={data as ElementAnatomyData} />
    case 'semantic-compare':
      return <SemanticCompare data={data as SemanticCompareData} />
    case 'form-playground':
      return <FormPlayground data={data as FormPlaygroundData} />
    case 'table-builder':
      return <TableBuilder data={data as TableBuilderData} />
    case 'a11y-checklist':
      return <A11yChecklist data={data as A11yChecklistData} />
    case 'path-parser':
      return <PathParser data={data as PathParserData} />
    case 'api-card':
      return <ApiCard data={data as ApiCardData} />
    case 'flexbox-playground':
      return <FlexboxPlayground data={data as FlexboxPlaygroundData} />
    case 'box-model':
      return <BoxModelVisualizer data={data as BoxModelPlaygroundData} />
    case 'selector-playground':
      return <SelectorPlayground data={data as SelectorPlaygroundData} />
    case 'animation-playground':
      return <AnimationPlayground data={data as AnimationPlaygroundData} />
    case 'position-playground':
      return <PositionPlayground data={data as PositionPlaygroundData} />
    case 'display-type':
      return <DisplayTypeDemo data={data as DisplayTypePlaygroundData} />
    case 'responsive-viewport':
      return <ResponsiveViewport data={data as ResponsiveViewportData} />
    case 'grid-playground':
      return <GridPlayground data={data as GridPlaygroundData} />
    case 'datatype-explorer':
      return <DataTypeExplorer data={data as DataTypeExplorerData} />
    case 'equality-comparator':
      return <EqualityComparator data={data as EqualityComparatorData} />
    case 'regex-tester':
      return <RegexTester data={data as RegexTesterData} />
    case 'array-method':
      return <ArrayMethodPlayground data={data as ArrayMethodData} />
    case 'event-loop':
      return <EventLoopVisualizer data={data as EventLoopData} />
    case 'promise-flow':
      return <PromiseFlowDemo title={(data as PromiseFlowData)?.title} />
    case 'todo-app':
      return <TodoAppDemo data={data as TodoAppData} />
    case 'dom-tree-visualizer':
      return <DomTreeVisualizer data={data as DomTreeVisualizerData} />
    case 'event-flow-visualizer':
      return <EventFlowVisualizer data={data as EventFlowVisualizerData} />
    case 'event-delegation':
      return <EventDelegationDemo data={data as EventDelegationData} />
    case 'location-parser':
      return <LocationParser data={data as LocationParserData} />
    case 'history-router':
      return <HistoryRouterDemo data={data as HistoryRouterData} />
    case 'storage-playground':
      return <StoragePlayground data={data as StoragePlaygroundData} />
    case 'geometry-calculator':
      return <GeometryCalculator data={data as GeometryCalculatorData} />
    case 'scroll-animation':
      return <ScrollAnimationDemo data={data as ScrollAnimationData} />
    case 'file-upload':
      return <FileUploadDemo data={data as FileUploadData} />
    case 'blob-download':
      return <BlobDownloadDemo data={data as BlobDownloadData} />
    case 'raf-animation':
      return <RafAnimationDemo data={data as RafAnimationData} />
    case 'tailwind-playground':
      return <TailwindPlayground data={data as TailwindPlaygroundData} />
    case 'breakpoint-simulator':
      return <BreakpointSimulator data={data as BreakpointSimulatorData} />
    case 'sass-playground':
      return <SassPlayground data={data as SassPlaygroundData} />
    case 'bootstrap-grid-demo':
      return <BootstrapGridDemo data={data as BootstrapGridDemoData} />
    case 'responsive-nav-demo':
      return <ResponsiveNavDemo data={data as ResponsiveNavDemoData} />
    case 'ts-type-checker':
      return <TsTypeChecker data={data as TsTypeCheckerData} />
    case 'type-transform-board':
      return <TypeTransformBoard data={data as TypeTransformBoardData} />
    case 'generic-constraint-flow':
      return <GenericConstraintFlow data={data as GenericConstraintFlowData} />
    case 'ts-config-playground':
      return <TsConfigPlayground data={data as TsConfigPlaygroundData} />
    case 'api-typing-workbench':
      return <ApiTypingWorkbench data={data as ApiTypingWorkbenchData} />
    case 'migration-planner':
      return <MigrationPlanner data={data as MigrationPlannerData} />
    case 'type-inference-timeline':
      return <TypeInferenceTimeline data={data as TypeInferenceTimelineData} />
    case 'type-matrix-table':
      return <TypeMatrixTable data={data as TypeMatrixTableData} />
    case 'vdom-diff-simulator':
      return <VdomDiffSimulator data={data as VdomDiffSimulatorData} />
    case 'jsx-live-preview':
      return <JsxLivePreview data={data as JsxLivePreviewData} />
    case 'data-fetch-state-machine':
      return <DataFetchStateMachine data={data as DataFetchStateMachineData} />
    case 'rerender-tracker':
      return <RerenderTracker data={data as RerenderTrackerData} />
    case 'redux-cycle-simulator':
      return <ReduxCycleSimulator data={data as ReduxCycleSimulatorData} />
    case 'suspense-boundary-demo':
      return <SuspenseBoundaryDemo data={data as SuspenseBoundaryDemoData} />
    case 'component-lib-decider':
      return <ComponentLibDecider data={data as ComponentLibDeciderData} />
    case 'decision-tree':
      return <DecisionTree data={data as DecisionTreeData} />
    case 'diff-highlight-board':
      return <DiffHighlightBoard data={data as DiffHighlightBoardData} />
    case 'stack-queue-visualizer':
      return <StackQueueVisualizer data={data as StackQueueVisualizerData} />
    case 'lru-cache-simulator':
      return <LruCacheSimulator data={data as LruCacheSimulatorData} />
    case 'linked-list-stepper':
      return <LinkedListStepper data={data as LinkedListStepperData} />
    case 'binary-tree-walker':
      return <BinaryTreeWalker data={data as BinaryTreeWalkerData} />
    case 'sorting-race-arena':
      return <SortingRaceArena data={data as SortingRaceArenaData} />
    case 'bfs-path-finder':
      return <BfsPathFinder data={data as BfsPathFinderData} />
    case 'handwriting-challenge':
      return <HandwritingChallenge data={data as HandwritingChallengeData} />
    case 'heap-visualizer':
      return <HeapVisualizer data={data as HeapVisualizerData} />
    case 'trie-visualizer':
      return <TrieVisualizer data={data as TrieVisualizerData} />
    case 'union-find-visualizer':
      return <UnionFindVisualizer data={data as UnionFindVisualizerData} />
    case 'divide-conquer-tree-visualizer':
      return <DivideConquerTreeVisualizer data={data as DivideConquerTreeVisualizerData} />
    case 'string-algorithm-visualizer':
      return <StringAlgorithmVisualizer data={data as StringAlgorithmVisualizerData} />
    case 'hash-table-visualizer':
      return <HashTableVisualizer data={data as HashTableVisualizerData} />
    case 'binary-search-visualizer':
      return <BinarySearchVisualizer data={data as BinarySearchVisualizerData} />
    case 'sliding-window-visualizer':
      return <SlidingWindowVisualizer data={data as SlidingWindowVisualizerData} />
    case 'backtracking-tree-visualizer':
      return <BacktrackingTreeVisualizer data={data as BacktrackingTreeVisualizerData} />
    case 'dynamic-programming-visualizer':
      return <DynamicProgrammingVisualizer data={data as DynamicProgrammingVisualizerData} />
    case 'fiber-work-loop-simulator':
      return <FiberWorkLoopSimulator data={data as FiberWorkLoopSimulatorData} />
    case 'memo-effect-comparator':
      return <MemoEffectComparator data={data as MemoEffectComparatorData} />
    case 'virtual-list-simulator':
      return <VirtualListSimulator data={data as VirtualListSimulatorData} />
    case 'hook-extraction-workshop':
      return <HookExtractionWorkshop data={data as HookExtractionWorkshopData} />
    case 'transition-vs-sync-demo':
      return <TransitionVsSyncDemo data={data as TransitionVsSyncDemoData} />
    case 'pattern-factory':
      return <PatternFactory data={data as PatternFactoryData} />
    case 'interview-quiz-engine':
      return <InterviewQuizEngine data={data as InterviewQuizEngineData} />
    case 'concept-explain-viz':
      return <ConceptExplainViz data={data as ConceptExplainVizData} />
    case 'flashcard-deck':
      return <FlashcardDeck data={data as FlashcardDeckData} />
    case 'mock-interview-timer':
      return <MockInterviewTimer data={data as MockInterviewTimerData} />
    case 'progress-dashboard':
      return <ProgressDashboard data={data as ProgressDashboardData} />
    case 'system-design-board':
      return <SystemDesignBoard data={data as SystemDesignBoardData} />
    case 'render-mode-comparator':
      return <RenderModeComparator data={data as RenderModeComparatorData} />
    case 'rsc-payload-flow':
      return <RSCPayloadFlow data={data as RSCPayloadFlowData} />
    case 'server-action-sandbox':
      return <ServerActionSandbox data={data as ServerActionSandboxData} />
    case 'middleware-flow-explorer':
      return <MiddlewareFlowExplorer data={data as MiddlewareFlowExplorerData} />
    case 'framework-decision-wizard':
      return <FrameworkDecisionWizard data={data as FrameworkDecisionWizardData} />
    case 'islands-arch-demo':
      return <IslandsArchDemo data={data as IslandsArchDemoData} />
    case 'route-vs-action-decider':
      return <RouteVsActionDecider data={data as RouteVsActionDeciderData} />
    case 'vue-vs-react-comparator':
      return <VueVsReactComparator data={data as VueVsReactComparatorData} />
    case 'proxy-reactivity-tracker':
      return <ProxyReactivityTracker data={data as ProxyReactivityTrackerData} />
    case 'vue-component-sandbox':
      return <VueComponentSandbox data={data as VueComponentSandboxData} />
    case 'define-emits-workshop':
      return <DefineEmitsWorkshop data={data as DefineEmitsWorkshopData} />
    case 'pinia-store-explorer':
      return <PiniaStoreExplorer data={data as PiniaStoreExplorerData} />
    case 'patch-flag-visualizer':
      return <PatchFlagVisualizer data={data as PatchFlagVisualizerData} />
    case 'nuxt-hybrid-render-studio':
      return <NuxtHybridRenderStudio data={data as NuxtHybridRenderStudioData} />
    case 'composable-flow-visualizer':
      return <ComposableFlowVisualizer data={data as ComposableFlowVisualizerData} />
    case 'custom-directive-workbench':
      return <CustomDirectiveWorkbench data={data as CustomDirectiveWorkbenchData} />
    case 'keepalive-cache-simulator':
      return <KeepAliveCacheSimulator data={data as KeepAliveCacheSimulatorData} />
    // 小程序开发专用组件（模块十三）
    case 'dual-thread-model-visualizer':
      return <DualThreadModelVisualizer data={data as DualThreadModelVisualizerData} />
    case 'setdata-performance-comparator':
      return <SetDataPerformanceComparator data={data as SetDataPerformanceComparatorData} />
    case 'mini-component-workbench':
      return <MiniComponentWorkbench data={data as MiniComponentWorkbenchData} />
    case 'taro-compile-flow-visualizer':
      return <TaroCompileFlowVisualizer data={data as TaroCompileFlowVisualizerData} />
    case 'uniapp-conditional-compiler':
      return <UniAppConditionalCompiler data={data as UniAppConditionalCompilerData} />
    case 'subpackage-loading-visualizer':
      return <SubpackageLoadingVisualizer data={data as SubpackageLoadingVisualizerData} />
    // 跨平台移动端开发专用组件（模块十四）
    case 'mobile-adaptation-sandbox':
      return <MobileAdaptationSandbox data={data as MobileAdaptationSandboxData} />
    case 'rn-architecture-comparator':
      return <RNArchitectureComparator data={data as RNArchitectureComparatorData} />
    case 'expo-router-tree-visualizer':
      return <ExpoRouterTreeVisualizer data={data as ExpoRouterTreeVisualizerData} />
    case 'capacitor-plugin-bridge':
      return <CapacitorPluginBridge data={data as CapacitorPluginBridgeData} />
    case 'service-worker-cache-strategies':
      return <ServiceWorkerCacheStrategies data={data as ServiceWorkerCacheStrategiesData} />
    case 'pwa-push-flow-visualizer':
      return <PwaPushFlowVisualizer data={data as PwaPushFlowVisualizerData} />
    case 'cross-platform-selector':
      return <CrossPlatformSelector data={data as CrossPlatformSelectorData} />
    // 前端工程化专用组件（模块十五）
    case 'webpack-build-flow-visualizer':
      return <WebpackBuildFlowVisualizer data={data as WebpackBuildFlowVisualizerData} />
    case 'vite-esm-loading-flow':
      return <ViteEsmLoadingFlow data={data as ViteEsmLoadingFlowData} />
    case 'pnpm-hardlink-visualizer':
      return <PnpmHardlinkVisualizer data={data as PnpmHardlinkVisualizerData} />
    case 'commit-message-parser':
      return <CommitMessageParser data={data as CommitMessageParserData} />
    case 'monorepo-tree-visualizer':
      return <MonorepoTreeVisualizer data={data as MonorepoTreeVisualizerData} />
    case 'turborepo-task-flow':
      return <TurborepoTaskFlow data={data as TurborepoTaskFlowData} />
    case 'cicd-pipeline-visualizer':
      return <CICDPipelineVisualizer data={data as CICDPipelineVisualizerData} />
    // 浏览器原理与网络专用组件（模块十六）
    case 'rendering-pipeline-visualizer':
      return <RenderingPipelineVisualizer data={data as RenderingPipelineVisualizerData} />
    case 'reflow-repaint-comparator':
      return <ReflowRepaintComparator data={data as ReflowRepaintComparatorData} />
    case 'http-request-response-flow':
      return <HttpRequestResponseFlow data={data as HttpRequestResponseFlowData} />
    case 'cache-decision-tree':
      return <CacheDecisionTree data={data as CacheDecisionTreeData} />
    case 'tcp-handshake-visualizer':
      return <TcpHandshakeVisualizer data={data as TcpHandshakeVisualizerData} />
    case 'https-handshake-flow':
      return <HttpsHandshakeFlow data={data as HttpsHandshakeFlowData} />
    case 'quic-multiplexing-visualizer':
      return <QuicMultiplexingVisualizer data={data as QuicMultiplexingVisualizerData} />
    case 'event-loop-visualizer':
      return <NodejsEventLoopVisualizer data={data as EventLoopVisualizerData} />
    case 'module-system-comparator':
      return <ModuleSystemComparator data={data as ModuleSystemComparatorData} />
    case 'filesystem-async-comparator':
      return <FileSystemAsyncComparator data={data as FileSystemAsyncComparatorData} />
    case 'express-middleware-flow':
      return <ExpressMiddlewareFlow data={data as ExpressMiddlewareFlowData} />
    case 'restful-api-designer':
      return <RestfulApiDesigner data={data as RestfulApiDesignerData} />
    case 'test-pyramid-visualizer':
      return <TestPyramidVisualizer data={data as TestPyramidVisualizerData} />
    case 'mock-flow-visualizer':
      return <MockFlowVisualizer data={data as MockFlowVisualizerData} />
    case 'testing-library-query-priority':
      return <TestingLibraryQueryPriority data={data as TestingLibraryQueryPriorityData} />
    case 'component-test-playground':
      return <ComponentTestPlayground data={data as ComponentTestPlaygroundData} />
    case 'e2e-test-flow-visualizer':
      return <E2ETestFlowVisualizer data={data as E2ETestFlowVisualizerData} />
    case 'core-web-vitals-visualizer':
      return <CoreWebVitalsVisualizer data={data as CoreWebVitalsVisualizerData} />
    case 'resource-hints-visualizer':
      return <ResourceHintsVisualizer data={data as ResourceHintsVisualizerData} />
    case 'debounce-throttle-visualizer':
      return <DebounceThrottleVisualizer data={data as DebounceThrottleVisualizerData} />
    case 'virtual-list-visualizer':
      return <VirtualListVisualizer data={data as VirtualListVisualizerData} />
    case 'security-attack-flow-visualizer':
      return <SecurityAttackFlowVisualizer data={data as SecurityAttackFlowVisualizerData} />
    // 数据可视化与前端架构专用组件（模块二十）
    case 'canvas-playground':
      return <CanvasPlayground data={data as CanvasPlaygroundData} />
    case 'svg-vs-canvas-compare':
      return <SvgVsCanvasCompare data={data as SvgVsCanvasCompareData} />
    case 'd3-data-binding-flow':
      return <D3DataBindingFlow data={data as D3DataBindingFlowData} />
    case 'echarts-config-visualizer':
      return <EChartsConfigVisualizer data={data as EChartsConfigVisualizerData} />
    case 'design-pattern-showcase':
      return <DesignPatternShowcase data={data as DesignPatternShowcaseData} />
    // Web 高级 API 与 GraphQL 专用组件（模块二十一）
    case 'web-components-lifecycle':
      return <WebComponentsLifecycleVisualizer data={data as WebComponentsLifecycleData} />
    case 'worker-data-transfer':
      return <WorkerDataTransferVisualizer data={data as WorkerDataTransferData} />
    case 'observer-api-showcase':
      return <ObserverApiShowcase data={data as ObserverApiShowcaseData} />
    case 'graphql-schema-explorer':
      return <GraphQLSchemaExplorer data={data as GraphQLSchemaData} />
    case 'api-layer-comparison':
      return <ApiLayerComparisonVisualizer data={data as ApiLayerComparisonData} />
    // 微前端与前端架构设计专用组件（模块二十二）
    case 'mf-architecture-graph':
      return <MFArchitectureGraphVisualizer data={data as MFArchitectureGraphData} />
    case 'mf-sandbox-isolation':
      return <MFSandboxIsolationVisualizer data={data as MFSandboxIsolationData} />
    case 'mf-module-federation':
      return <MFModuleFederationVisualizer data={data as MFModuleFederationData} />
    case 'mf-qiankun-lifecycle':
      return <MFQiankunLifecycleVisualizer data={data as MFQiankunLifecycleData} />
    case 'mf-css-isolation':
      return <MFCssIsolationVisualizer data={data as MFCssIsolationData} />
    // 监控埋点与认证授权专用组件（模块二十三）
    case 'i18n-format-playground':
      return <I18nFormatPlayground data={data as I18nFormatPlaygroundData} />
    case 'auth-flow-graph':
      return <AuthFlowGraph data={data as AuthFlowGraphData} />
    case 'jwt-payload-decoder':
      return <JWTPayloadDecoder data={data as JWTPayloadDecoderData} />
    case 'error-monitoring-dashboard':
      return <ErrorMonitoringDashboard data={data as ErrorMonitoringDashboardData} />
    case 'performance-observer-demo':
      return <PerformanceObserverDemo data={data as PerformanceObserverDemoData} />
    case 'user-tracking-funnel':
      return <UserTrackingFunnel data={data as UserTrackingFunnelData} />
    case 'rbac-permission-matrix':
      return <RBACPermissionMatrix data={data as RBACPermissionMatrixData} />
    default:
      return <div className="text-body-sm text-body-mid">未知组件类型: {type}</div>
  }
}
