/**
 * VisualizationRenderer - 可视化组件分发器
 *
 * 根据 VisualizationBlock 的 visualizationType 渲染对应的可视化组件。
 * 包含组件标题栏（显示组件类型标签）。
 */
import type { VisualizationBlock, VisualizationType } from '../../lib/types'
import { visualizationMeta } from '../../lib/types'
import { KnowledgeGraph } from '../interactive/KnowledgeGraph'
import { FlipCard } from '../interactive/FlipCard'
import { SkillBar } from '../interactive/SkillBar'
import { Sandbox } from '../interactive/Sandbox'
import { DragInteraction } from '../interactive/DragInteraction'
import { Timeline } from '../interactive/Timeline'
import { CompareTable } from '../interactive/CompareTable'
import { CodeStepper } from '../interactive/CodeStepper'
import { ArchitectureDiagram } from '../interactive/ArchitectureDiagram'
import { QuizCard } from '../interactive/QuizCard'
import { Accordion } from '../interactive/Accordion'
import { DomTree } from '../interactive/html/DomTree'
import { ElementAnatomy } from '../interactive/html/ElementAnatomy'
import { SemanticCompare } from '../interactive/html/SemanticCompare'
import { FormPlayground } from '../interactive/html/FormPlayground'
import { TableBuilder } from '../interactive/html/TableBuilder'
import { A11yChecklist } from '../interactive/html/A11yChecklist'
import { PathParser } from '../interactive/html/PathParser'
import { ApiCard } from '../interactive/html/ApiCard'
import { FlexboxPlayground } from '../interactive/css/FlexboxPlayground'
import { BoxModelVisualizer } from '../interactive/css/BoxModelVisualizer'
import { SelectorPlayground } from '../interactive/css/SelectorPlayground'
import { AnimationPlayground } from '../interactive/css/AnimationPlayground'
import { PositionPlayground } from '../interactive/css/PositionPlayground'
import { DisplayTypeDemo } from '../interactive/css/DisplayTypeDemo'
import { ResponsiveViewport } from '../interactive/css/ResponsiveViewport'
import { GridPlayground } from '../interactive/css/GridPlayground'
import { DataTypeExplorer } from '../interactive/js/DataTypeExplorer'
import { EqualityComparator } from '../interactive/js/EqualityComparator'
import { RegexTester } from '../interactive/js/RegexTester'
import { ArrayMethodPlayground } from '../interactive/js/ArrayMethodPlayground'
import { EventLoopVisualizer } from '../interactive/js/EventLoopVisualizer'
import { PromiseFlowDemo } from '../interactive/js/PromiseFlowDemo'
import { TodoAppDemo } from '../interactive/js/TodoAppDemo'
import { DomTreeVisualizer } from '../interactive/dombom/DomTreeVisualizer'
import { EventFlowVisualizer } from '../interactive/dombom/EventFlowVisualizer'
import { EventDelegationDemo } from '../interactive/dombom/EventDelegationDemo'
import { LocationParser } from '../interactive/dombom/LocationParser'
import { HistoryRouterDemo } from '../interactive/dombom/HistoryRouterDemo'
import { StoragePlayground } from '../interactive/dombom/StoragePlayground'
import { GeometryCalculator } from '../interactive/dombom/GeometryCalculator'
import { ScrollAnimationDemo } from '../interactive/dombom/ScrollAnimationDemo'
import { FileUploadDemo } from '../interactive/dombom/FileUploadDemo'
import { BlobDownloadDemo } from '../interactive/dombom/BlobDownloadDemo'
import { RafAnimationDemo } from '../interactive/dombom/RafAnimationDemo'
import { TailwindPlayground } from '../interactive/css-eng/TailwindPlayground'
import { BreakpointSimulator } from '../interactive/css-eng/BreakpointSimulator'
import { SassPlayground } from '../interactive/css-eng/SassPlayground'
import { BootstrapGridDemo } from '../interactive/css-eng/BootstrapGridDemo'
import { ResponsiveNavDemo } from '../interactive/css-eng/ResponsiveNavDemo'
import { TsTypeChecker } from '../interactive/typescript/TsTypeChecker'
import { TypeTransformBoard } from '../interactive/typescript/TypeTransformBoard'
import { GenericConstraintFlow } from '../interactive/typescript/GenericConstraintFlow'
import { TsConfigPlayground } from '../interactive/typescript/TsConfigPlayground'
import { ApiTypingWorkbench } from '../interactive/typescript/ApiTypingWorkbench'
import { MigrationPlanner } from '../interactive/typescript/MigrationPlanner'
import { TypeInferenceTimeline } from '../interactive/typescript/TypeInferenceTimeline'
import { TypeMatrixTable } from '../interactive/typescript/TypeMatrixTable'
import { VdomDiffSimulator } from '../interactive/react/VdomDiffSimulator'
import { JsxLivePreview } from '../interactive/react/JsxLivePreview'
import { DataFetchStateMachine } from '../interactive/react/DataFetchStateMachine'
import { RerenderTracker } from '../interactive/react/RerenderTracker'
import { ReduxCycleSimulator } from '../interactive/react/ReduxCycleSimulator'
import { SuspenseBoundaryDemo } from '../interactive/react/SuspenseBoundaryDemo'
import { ComponentLibDecider } from '../interactive/react/ComponentLibDecider'
import { DecisionTree } from '../interactive/react/DecisionTree'
import { DiffHighlightBoard } from '../interactive/react/DiffHighlightBoard'
import { StackQueueVisualizer } from '../interactive/algorithm/StackQueueVisualizer'
import { LruCacheSimulator } from '../interactive/algorithm/LruCacheSimulator'
import { LinkedListStepper } from '../interactive/algorithm/LinkedListStepper'
import { BinaryTreeWalker } from '../interactive/algorithm/BinaryTreeWalker'
import { SortingRaceArena } from '../interactive/algorithm/SortingRaceArena'
import { BfsPathFinder } from '../interactive/algorithm/BfsPathFinder'
import { HandwritingChallenge } from '../interactive/algorithm/HandwritingChallenge'
import { HeapVisualizer } from '../interactive/algorithm/HeapVisualizer'
import { TrieVisualizer } from '../interactive/algorithm/TrieVisualizer'
import { UnionFindVisualizer } from '../interactive/algorithm/UnionFindVisualizer'
import { DivideConquerTreeVisualizer } from '../interactive/algorithm/DivideConquerTreeVisualizer'
import { StringAlgorithmVisualizer } from '../interactive/algorithm/StringAlgorithmVisualizer'
import { HashTableVisualizer } from '../interactive/algorithm/HashTableVisualizer'
import { BinarySearchVisualizer } from '../interactive/algorithm/BinarySearchVisualizer'
import { SlidingWindowVisualizer } from '../interactive/algorithm/SlidingWindowVisualizer'
import { BacktrackingTreeVisualizer } from '../interactive/algorithm/BacktrackingTreeVisualizer'
import { DynamicProgrammingVisualizer } from '../interactive/algorithm/DynamicProgrammingVisualizer'
import { FiberWorkLoopSimulator } from '../interactive/react-advanced/FiberWorkLoopSimulator'
import { MemoEffectComparator } from '../interactive/react-advanced/MemoEffectComparator'
import { VirtualListSimulator } from '../interactive/react-advanced/VirtualListSimulator'
import { HookExtractionWorkshop } from '../interactive/react-advanced/HookExtractionWorkshop'
import { TransitionVsSyncDemo } from '../interactive/react-advanced/TransitionVsSyncDemo'
import { PatternFactory } from '../interactive/react-advanced/PatternFactory'
import { InterviewQuizEngine } from '../interactive/interview/InterviewQuizEngine'
import { ConceptExplainViz } from '../interactive/interview/ConceptExplainViz'
import { FlashcardDeck } from '../interactive/interview/FlashcardDeck'
import { MockInterviewTimer } from '../interactive/interview/MockInterviewTimer'
import { ProgressDashboard } from '../interactive/interview/ProgressDashboard'
import { SystemDesignBoard } from '../interactive/interview/SystemDesignBoard'
import { RenderModeComparator } from '../interactive/nextjs/RenderModeComparator'
import { RSCPayloadFlow } from '../interactive/nextjs/RSCPayloadFlow'
import { ServerActionSandbox } from '../interactive/nextjs/ServerActionSandbox'
import { MiddlewareFlowExplorer } from '../interactive/nextjs/MiddlewareFlowExplorer'
import { FrameworkDecisionWizard } from '../interactive/nextjs/FrameworkDecisionWizard'
import { IslandsArchDemo } from '../interactive/nextjs/IslandsArchDemo'
import { RouteVsActionDecider } from '../interactive/nextjs/RouteVsActionDecider'
import { VueVsReactComparator } from '../interactive/vue/VueVsReactComparator'
import { ProxyReactivityTracker } from '../interactive/vue/ProxyReactivityTracker'
import { VueComponentSandbox } from '../interactive/vue/VueComponentSandbox'
import { DefineEmitsWorkshop } from '../interactive/vue/DefineEmitsWorkshop'
import { PiniaStoreExplorer } from '../interactive/vue/PiniaStoreExplorer'
import { PatchFlagVisualizer } from '../interactive/vue/PatchFlagVisualizer'
import { NuxtHybridRenderStudio } from '../interactive/vue-advanced/NuxtHybridRenderStudio'
import { ComposableFlowVisualizer } from '../interactive/vue-advanced/ComposableFlowVisualizer'
import { CustomDirectiveWorkbench } from '../interactive/vue-advanced/CustomDirectiveWorkbench'
import { KeepAliveCacheSimulator } from '../interactive/vue-advanced/KeepAliveCacheSimulator'
import { DualThreadModelVisualizer } from '../interactive/miniprogram/DualThreadModelVisualizer'
import { SetDataPerformanceComparator } from '../interactive/miniprogram/SetDataPerformanceComparator'
import { MiniComponentWorkbench } from '../interactive/miniprogram/MiniComponentWorkbench'
import { TaroCompileFlowVisualizer } from '../interactive/miniprogram/TaroCompileFlowVisualizer'
import { UniAppConditionalCompiler } from '../interactive/miniprogram/UniAppConditionalCompiler'
import { SubpackageLoadingVisualizer } from '../interactive/miniprogram/SubpackageLoadingVisualizer'
import { MobileAdaptationSandbox } from '../interactive/cross-platform/MobileAdaptationSandbox'
import { RNArchitectureComparator } from '../interactive/cross-platform/RNArchitectureComparator'
import { ExpoRouterTreeVisualizer } from '../interactive/cross-platform/ExpoRouterTreeVisualizer'
import { CapacitorPluginBridge } from '../interactive/cross-platform/CapacitorPluginBridge'
import { ServiceWorkerCacheStrategies } from '../interactive/cross-platform/ServiceWorkerCacheStrategies'
import { PwaPushFlowVisualizer } from '../interactive/cross-platform/PwaPushFlowVisualizer'
import { CrossPlatformSelector } from '../interactive/cross-platform/CrossPlatformSelector'
import { WebpackBuildFlowVisualizer } from '../interactive/engineering/WebpackBuildFlowVisualizer'
import { ViteEsmLoadingFlow } from '../interactive/engineering/ViteEsmLoadingFlow'
import { PnpmHardlinkVisualizer } from '../interactive/engineering/PnpmHardlinkVisualizer'
import { CommitMessageParser } from '../interactive/engineering/CommitMessageParser'
import { MonorepoTreeVisualizer } from '../interactive/engineering/MonorepoTreeVisualizer'
import { TurborepoTaskFlow } from '../interactive/engineering/TurborepoTaskFlow'
import { CICDPipelineVisualizer } from '../interactive/engineering/CICDPipelineVisualizer'

import { RenderingPipelineVisualizer } from '../interactive/browser-network/RenderingPipelineVisualizer'
import { ReflowRepaintComparator } from '../interactive/browser-network/ReflowRepaintComparator'
import { HttpRequestResponseFlow } from '../interactive/browser-network/HttpRequestResponseFlow'
import { CacheDecisionTree } from '../interactive/browser-network/CacheDecisionTree'
import { TcpHandshakeVisualizer } from '../interactive/browser-network/TcpHandshakeVisualizer'
import { HttpsHandshakeFlow } from '../interactive/browser-network/HttpsHandshakeFlow'
import { QuicMultiplexingVisualizer } from '../interactive/browser-network/QuicMultiplexingVisualizer'
import { EventLoopVisualizer as NodejsEventLoopVisualizer } from '../interactive/nodejs/EventLoopVisualizer'
import { ModuleSystemComparator } from '../interactive/nodejs/ModuleSystemComparator'
import { FileSystemAsyncComparator } from '../interactive/nodejs/FileSystemAsyncComparator'
import { ExpressMiddlewareFlow } from '../interactive/nodejs/ExpressMiddlewareFlow'
import { RestfulApiDesigner } from '../interactive/nodejs/RestfulApiDesigner'
import { TestPyramidVisualizer } from '../interactive/testing/TestPyramidVisualizer'
import { MockFlowVisualizer } from '../interactive/testing/MockFlowVisualizer'
import { TestingLibraryQueryPriority } from '../interactive/testing/TestingLibraryQueryPriority'
import { ComponentTestPlayground } from '../interactive/testing/ComponentTestPlayground'
import { E2ETestFlowVisualizer } from '../interactive/testing/E2ETestFlowVisualizer'
import { CoreWebVitalsVisualizer } from '../interactive/performance-security/CoreWebVitalsVisualizer'
import { ResourceHintsVisualizer } from '../interactive/performance-security/ResourceHintsVisualizer'
import { DebounceThrottleVisualizer } from '../interactive/performance-security/DebounceThrottleVisualizer'
import { VirtualListVisualizer } from '../interactive/performance-security/VirtualListVisualizer'
import { SecurityAttackFlowVisualizer } from '../interactive/performance-security/SecurityAttackFlowVisualizer'
import { CanvasPlayground } from '../interactive/visualization-architecture/CanvasPlayground'
import { SvgVsCanvasCompare } from '../interactive/visualization-architecture/SVGvsCanvasCompare'
import { D3DataBindingFlow } from '../interactive/visualization-architecture/D3DataBindingFlow'
import { EChartsConfigVisualizer } from '../interactive/visualization-architecture/EChartsConfigVisualizer'
import { DesignPatternShowcase } from '../interactive/visualization-architecture/DesignPatternShowcase'
import { WebComponentsLifecycleVisualizer } from '../interactive/web-api-graphql/WebComponentsLifecycleVisualizer'
import { WorkerDataTransferVisualizer } from '../interactive/web-api-graphql/WorkerDataTransferVisualizer'
import { ObserverApiShowcase } from '../interactive/web-api-graphql/ObserverApiShowcase'
import { GraphQLSchemaExplorer } from '../interactive/web-api-graphql/GraphQLSchemaExplorer'
import { ApiLayerComparisonVisualizer } from '../interactive/web-api-graphql/ApiLayerComparisonVisualizer'
import { MFArchitectureGraphVisualizer } from '../interactive/microfrontend/MFArchitectureGraphVisualizer'
import { MFSandboxIsolationVisualizer } from '../interactive/microfrontend/MFSandboxIsolationVisualizer'
import { MFModuleFederationVisualizer } from '../interactive/microfrontend/MFModuleFederationVisualizer'
import { MFQiankunLifecycleVisualizer } from '../interactive/microfrontend/MFQiankunLifecycleVisualizer'
import { MFCssIsolationVisualizer } from '../interactive/microfrontend/MFCssIsolationVisualizer'
import { I18nFormatPlayground } from '../interactive/monitoring-auth/I18nFormatPlayground'
import { AuthFlowGraph } from '../interactive/monitoring-auth/AuthFlowGraph'
import { JWTPayloadDecoder } from '../interactive/monitoring-auth/JWTPayloadDecoder'
import { ErrorMonitoringDashboard } from '../interactive/monitoring-auth/ErrorMonitoringDashboard'
import { PerformanceObserverDemo } from '../interactive/monitoring-auth/PerformanceObserverDemo'
import { UserTrackingFunnel } from '../interactive/monitoring-auth/UserTrackingFunnel'
import { RBACPermissionMatrix } from '../interactive/monitoring-auth/RBACPermissionMatrix'

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

      {/* 组件内容 */}
      <div>{renderVisualization(block.visualizationType, block.data)}</div>
    </div>
  )
}

function renderVisualization(type: VisualizationType, data: VisualizationBlock['data']) {
  switch (type) {
    case 'knowledgegraph':
      return <KnowledgeGraph data={data as any} />
    case 'flipcard':
      return <FlipCard data={data as any} />
    case 'skillbar':
      return <SkillBar data={data as any} />
    case 'sandbox':
      return <Sandbox data={data as any} />
    case 'drag':
      return <DragInteraction data={data as any} />
    case 'timeline':
      return <Timeline data={data as any} />
    case 'comparetable':
      return <CompareTable data={data as any} />
    case 'codestepper':
      return <CodeStepper data={data as any} />
    case 'architecture':
      return <ArchitectureDiagram data={data as any} />
    case 'quiz':
      return <QuizCard data={data as any} />
    case 'accordion':
      return <Accordion data={data as any} />
    case 'dom-tree':
      return <DomTree data={data as any} />
    case 'element-anatomy':
      return <ElementAnatomy data={data as any} />
    case 'semantic-compare':
      return <SemanticCompare data={data as any} />
    case 'form-playground':
      return <FormPlayground data={data as any} />
    case 'table-builder':
      return <TableBuilder data={data as any} />
    case 'a11y-checklist':
      return <A11yChecklist data={data as any} />
    case 'path-parser':
      return <PathParser data={data as any} />
    case 'api-card':
      return <ApiCard data={data as any} />
    case 'flexbox-playground':
      return <FlexboxPlayground data={data as any} />
    case 'box-model':
      return <BoxModelVisualizer data={data as any} />
    case 'selector-playground':
      return <SelectorPlayground data={data as any} />
    case 'animation-playground':
      return <AnimationPlayground data={data as any} />
    case 'position-playground':
      return <PositionPlayground data={data as any} />
    case 'display-type':
      return <DisplayTypeDemo data={data as any} />
    case 'responsive-viewport':
      return <ResponsiveViewport data={data as any} />
    case 'grid-playground':
      return <GridPlayground data={data as any} />
    case 'datatype-explorer':
      return <DataTypeExplorer data={data as any} />
    case 'equality-comparator':
      return <EqualityComparator data={data as any} />
    case 'regex-tester':
      return <RegexTester data={data as any} />
    case 'array-method':
      return <ArrayMethodPlayground data={data as any} />
    case 'event-loop':
      return <EventLoopVisualizer data={data as any} />
    case 'promise-flow':
      return <PromiseFlowDemo title={(data as any)?.title} />
    case 'todo-app':
      return <TodoAppDemo data={data as any} />
    case 'dom-tree-visualizer':
      return <DomTreeVisualizer data={data as any} />
    case 'event-flow-visualizer':
      return <EventFlowVisualizer data={data as any} />
    case 'event-delegation':
      return <EventDelegationDemo data={data as any} />
    case 'location-parser':
      return <LocationParser data={data as any} />
    case 'history-router':
      return <HistoryRouterDemo data={data as any} />
    case 'storage-playground':
      return <StoragePlayground data={data as any} />
    case 'geometry-calculator':
      return <GeometryCalculator data={data as any} />
    case 'scroll-animation':
      return <ScrollAnimationDemo data={data as any} />
    case 'file-upload':
      return <FileUploadDemo data={data as any} />
    case 'blob-download':
      return <BlobDownloadDemo data={data as any} />
    case 'raf-animation':
      return <RafAnimationDemo data={data as any} />
    case 'tailwind-playground':
      return <TailwindPlayground data={data as any} />
    case 'breakpoint-simulator':
      return <BreakpointSimulator data={data as any} />
    case 'sass-playground':
      return <SassPlayground data={data as any} />
    case 'bootstrap-grid-demo':
      return <BootstrapGridDemo data={data as any} />
    case 'responsive-nav-demo':
      return <ResponsiveNavDemo data={data as any} />
    case 'ts-type-checker':
      return <TsTypeChecker data={data as any} />
    case 'type-transform-board':
      return <TypeTransformBoard data={data as any} />
    case 'generic-constraint-flow':
      return <GenericConstraintFlow data={data as any} />
    case 'ts-config-playground':
      return <TsConfigPlayground data={data as any} />
    case 'api-typing-workbench':
      return <ApiTypingWorkbench data={data as any} />
    case 'migration-planner':
      return <MigrationPlanner data={data as any} />
    case 'type-inference-timeline':
      return <TypeInferenceTimeline data={data as any} />
    case 'type-matrix-table':
      return <TypeMatrixTable data={data as any} />
    case 'vdom-diff-simulator':
      return <VdomDiffSimulator data={data as any} />
    case 'jsx-live-preview':
      return <JsxLivePreview data={data as any} />
    case 'data-fetch-state-machine':
      return <DataFetchStateMachine data={data as any} />
    case 'rerender-tracker':
      return <RerenderTracker data={data as any} />
    case 'redux-cycle-simulator':
      return <ReduxCycleSimulator data={data as any} />
    case 'suspense-boundary-demo':
      return <SuspenseBoundaryDemo data={data as any} />
    case 'component-lib-decider':
      return <ComponentLibDecider data={data as any} />
    case 'decision-tree':
      return <DecisionTree data={data as any} />
    case 'diff-highlight-board':
      return <DiffHighlightBoard data={data as any} />
    case 'stack-queue-visualizer':
      return <StackQueueVisualizer data={data as any} />
    case 'lru-cache-simulator':
      return <LruCacheSimulator data={data as any} />
    case 'linked-list-stepper':
      return <LinkedListStepper data={data as any} />
    case 'binary-tree-walker':
      return <BinaryTreeWalker data={data as any} />
    case 'sorting-race-arena':
      return <SortingRaceArena data={data as any} />
    case 'bfs-path-finder':
      return <BfsPathFinder data={data as any} />
    case 'handwriting-challenge':
      return <HandwritingChallenge data={data as any} />
    case 'heap-visualizer':
      return <HeapVisualizer data={data as any} />
    case 'trie-visualizer':
      return <TrieVisualizer data={data as any} />
    case 'union-find-visualizer':
      return <UnionFindVisualizer data={data as any} />
    case 'divide-conquer-tree-visualizer':
      return <DivideConquerTreeVisualizer data={data as any} />
    case 'string-algorithm-visualizer':
      return <StringAlgorithmVisualizer data={data as any} />
    case 'hash-table-visualizer':
      return <HashTableVisualizer data={data as any} />
    case 'binary-search-visualizer':
      return <BinarySearchVisualizer data={data as any} />
    case 'sliding-window-visualizer':
      return <SlidingWindowVisualizer data={data as any} />
    case 'backtracking-tree-visualizer':
      return <BacktrackingTreeVisualizer data={data as any} />
    case 'dynamic-programming-visualizer':
      return <DynamicProgrammingVisualizer data={data as any} />
    case 'fiber-work-loop-simulator':
      return <FiberWorkLoopSimulator data={data as any} />
    case 'memo-effect-comparator':
      return <MemoEffectComparator data={data as any} />
    case 'virtual-list-simulator':
      return <VirtualListSimulator data={data as any} />
    case 'hook-extraction-workshop':
      return <HookExtractionWorkshop data={data as any} />
    case 'transition-vs-sync-demo':
      return <TransitionVsSyncDemo data={data as any} />
    case 'pattern-factory':
      return <PatternFactory data={data as any} />
    case 'interview-quiz-engine':
      return <InterviewQuizEngine data={data as any} />
    case 'concept-explain-viz':
      return <ConceptExplainViz data={data as any} />
    case 'flashcard-deck':
      return <FlashcardDeck data={data as any} />
    case 'mock-interview-timer':
      return <MockInterviewTimer data={data as any} />
    case 'progress-dashboard':
      return <ProgressDashboard data={data as any} />
    case 'system-design-board':
      return <SystemDesignBoard data={data as any} />
    case 'render-mode-comparator':
      return <RenderModeComparator data={data as any} />
    case 'rsc-payload-flow':
      return <RSCPayloadFlow data={data as any} />
    case 'server-action-sandbox':
      return <ServerActionSandbox data={data as any} />
    case 'middleware-flow-explorer':
      return <MiddlewareFlowExplorer data={data as any} />
    case 'framework-decision-wizard':
      return <FrameworkDecisionWizard data={data as any} />
    case 'islands-arch-demo':
      return <IslandsArchDemo data={data as any} />
    case 'route-vs-action-decider':
      return <RouteVsActionDecider data={data as any} />
    case 'vue-vs-react-comparator':
      return <VueVsReactComparator data={data as any} />
    case 'proxy-reactivity-tracker':
      return <ProxyReactivityTracker data={data as any} />
    case 'vue-component-sandbox':
      return <VueComponentSandbox data={data as any} />
    case 'define-emits-workshop':
      return <DefineEmitsWorkshop data={data as any} />
    case 'pinia-store-explorer':
      return <PiniaStoreExplorer data={data as any} />
    case 'patch-flag-visualizer':
      return <PatchFlagVisualizer data={data as any} />
    case 'nuxt-hybrid-render-studio':
      return <NuxtHybridRenderStudio data={data as any} />
    case 'composable-flow-visualizer':
      return <ComposableFlowVisualizer data={data as any} />
    case 'custom-directive-workbench':
      return <CustomDirectiveWorkbench data={data as any} />
    case 'keepalive-cache-simulator':
      return <KeepAliveCacheSimulator data={data as any} />
    // 小程序开发专用组件（模块十三）
    case 'dual-thread-model-visualizer':
      return <DualThreadModelVisualizer data={data as any} />
    case 'setdata-performance-comparator':
      return <SetDataPerformanceComparator data={data as any} />
    case 'mini-component-workbench':
      return <MiniComponentWorkbench data={data as any} />
    case 'taro-compile-flow-visualizer':
      return <TaroCompileFlowVisualizer data={data as any} />
    case 'uniapp-conditional-compiler':
      return <UniAppConditionalCompiler data={data as any} />
    case 'subpackage-loading-visualizer':
      return <SubpackageLoadingVisualizer data={data as any} />
    // 跨平台移动端开发专用组件（模块十四）
    case 'mobile-adaptation-sandbox':
      return <MobileAdaptationSandbox data={data as any} />
    case 'rn-architecture-comparator':
      return <RNArchitectureComparator data={data as any} />
    case 'expo-router-tree-visualizer':
      return <ExpoRouterTreeVisualizer data={data as any} />
    case 'capacitor-plugin-bridge':
      return <CapacitorPluginBridge data={data as any} />
    case 'service-worker-cache-strategies':
      return <ServiceWorkerCacheStrategies data={data as any} />
    case 'pwa-push-flow-visualizer':
      return <PwaPushFlowVisualizer data={data as any} />
    case 'cross-platform-selector':
      return <CrossPlatformSelector data={data as any} />
    // 前端工程化专用组件（模块十五）
    case 'webpack-build-flow-visualizer':
      return <WebpackBuildFlowVisualizer data={data as any} />
    case 'vite-esm-loading-flow':
      return <ViteEsmLoadingFlow data={data as any} />
    case 'pnpm-hardlink-visualizer':
      return <PnpmHardlinkVisualizer data={data as any} />
    case 'commit-message-parser':
      return <CommitMessageParser data={data as any} />
    case 'monorepo-tree-visualizer':
      return <MonorepoTreeVisualizer data={data as any} />
    case 'turborepo-task-flow':
      return <TurborepoTaskFlow data={data as any} />
    case 'cicd-pipeline-visualizer':
      return <CICDPipelineVisualizer data={data as any} />
    // 浏览器原理与网络专用组件（模块十六）
    case 'rendering-pipeline-visualizer':
      return <RenderingPipelineVisualizer data={data as any} />
    case 'reflow-repaint-comparator':
      return <ReflowRepaintComparator data={data as any} />
    case 'http-request-response-flow':
      return <HttpRequestResponseFlow data={data as any} />
    case 'cache-decision-tree':
      return <CacheDecisionTree data={data as any} />
    case 'tcp-handshake-visualizer':
      return <TcpHandshakeVisualizer data={data as any} />
    case 'https-handshake-flow':
      return <HttpsHandshakeFlow data={data as any} />
    case 'quic-multiplexing-visualizer':
      return <QuicMultiplexingVisualizer data={data as any} />
    case 'event-loop-visualizer':
      return <NodejsEventLoopVisualizer data={data as any} />
    case 'module-system-comparator':
      return <ModuleSystemComparator data={data as any} />
    case 'filesystem-async-comparator':
      return <FileSystemAsyncComparator data={data as any} />
    case 'express-middleware-flow':
      return <ExpressMiddlewareFlow data={data as any} />
    case 'restful-api-designer':
      return <RestfulApiDesigner data={data as any} />
    case 'test-pyramid-visualizer':
      return <TestPyramidVisualizer data={data as any} />
    case 'mock-flow-visualizer':
      return <MockFlowVisualizer data={data as any} />
    case 'testing-library-query-priority':
      return <TestingLibraryQueryPriority data={data as any} />
    case 'component-test-playground':
      return <ComponentTestPlayground data={data as any} />
    case 'e2e-test-flow-visualizer':
      return <E2ETestFlowVisualizer data={data as any} />
    case 'core-web-vitals-visualizer':
      return <CoreWebVitalsVisualizer data={data as any} />
    case 'resource-hints-visualizer':
      return <ResourceHintsVisualizer data={data as any} />
    case 'debounce-throttle-visualizer':
      return <DebounceThrottleVisualizer data={data as any} />
    case 'virtual-list-visualizer':
      return <VirtualListVisualizer data={data as any} />
    case 'security-attack-flow-visualizer':
      return <SecurityAttackFlowVisualizer data={data as any} />
    // 数据可视化与前端架构专用组件（模块二十）
    case 'canvas-playground':
      return <CanvasPlayground data={data as any} />
    case 'svg-vs-canvas-compare':
      return <SvgVsCanvasCompare data={data as any} />
    case 'd3-data-binding-flow':
      return <D3DataBindingFlow data={data as any} />
    case 'echarts-config-visualizer':
      return <EChartsConfigVisualizer data={data as any} />
    case 'design-pattern-showcase':
      return <DesignPatternShowcase data={data as any} />
    // Web 高级 API 与 GraphQL 专用组件（模块二十一）
    case 'web-components-lifecycle':
      return <WebComponentsLifecycleVisualizer data={data as any} />
    case 'worker-data-transfer':
      return <WorkerDataTransferVisualizer data={data as any} />
    case 'observer-api-showcase':
      return <ObserverApiShowcase data={data as any} />
    case 'graphql-schema-explorer':
      return <GraphQLSchemaExplorer data={data as any} />
    case 'api-layer-comparison':
      return <ApiLayerComparisonVisualizer data={data as any} />
    // 微前端与前端架构设计专用组件（模块二十二）
    case 'mf-architecture-graph':
      return <MFArchitectureGraphVisualizer data={data as any} />
    case 'mf-sandbox-isolation':
      return <MFSandboxIsolationVisualizer data={data as any} />
    case 'mf-module-federation':
      return <MFModuleFederationVisualizer data={data as any} />
    case 'mf-qiankun-lifecycle':
      return <MFQiankunLifecycleVisualizer data={data as any} />
    case 'mf-css-isolation':
      return <MFCssIsolationVisualizer data={data as any} />
    // 监控埋点与认证授权专用组件（模块二十三）
    case 'i18n-format-playground':
      return <I18nFormatPlayground data={data as any} />
    case 'auth-flow-graph':
      return <AuthFlowGraph data={data as any} />
    case 'jwt-payload-decoder':
      return <JWTPayloadDecoder data={data as any} />
    case 'error-monitoring-dashboard':
      return <ErrorMonitoringDashboard data={data as any} />
    case 'performance-observer-demo':
      return <PerformanceObserverDemo data={data as any} />
    case 'user-tracking-funnel':
      return <UserTrackingFunnel data={data as any} />
    case 'rbac-permission-matrix':
      return <RBACPermissionMatrix data={data as any} />
    default:
      return <div className="text-body-sm text-body-mid">未知组件类型: {type}</div>
  }
}
