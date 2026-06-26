/**
 * 小程序开发可视化组件类型定义 - 模块 13
 *
 * 定义 6 种模块十三专用小程序教学模拟组件的类型和数据接口：
 * - DualThreadModelVisualizer：双线程（JsCore ↔ WebView）setData 通信模拟
 * - SetDataPerformanceComparator：全量/局部/合并三种 setData 模式性能对比
 * - MiniComponentWorkbench：Component() 构造器 properties/data/methods/lifetimes 工作台
 * - TaroCompileFlowVisualizer：Taro 3+ 多端编译管线可视化
 * - UniAppConditionalCompiler：uni-app 条件编译（#ifdef/#ifndef）平台切换预览
 * - SubpackageLoadingVisualizer：主包/分包/独立分包拖拽配置与体积校验
 */

// ============================================================================
// 小程序可视化组件类型联合
// ============================================================================

export type MiniprogramVisualizationType =
  | 'dual-thread-model-visualizer'
  | 'setdata-performance-comparator'
  | 'mini-component-workbench'
  | 'taro-compile-flow-visualizer'
  | 'uniapp-conditional-compiler'
  | 'subpackage-loading-visualizer'

// ============================================================================
// DualThreadModelVisualizer — 双线程通信模拟器
// ============================================================================

export interface DualThreadScenario {
  /** 场景唯一标识 */
  id: string
  /** 场景名称 */
  label: string
  /** 场景描述 */
  description: string
  /** 触发 setData 的调用代码 */
  trigger: string
  /** 传输的数据负载 */
  payload: { key: string; value: string }
  /** 模拟通信延迟（ms） */
  delayMs: number
  /** 渲染层更新后的结果描述 */
  renderResult: string
}

export interface DualThreadModelVisualizerData {
  scenarios: DualThreadScenario[]
  title?: string
}

// ============================================================================
// SetDataPerformanceComparator — setData 性能对比器
// ============================================================================

export type SetDataMode = 'full-transfer' | 'path-update' | 'merged-call'

export interface SetDataPerformanceCase {
  /** 模式标识 */
  id: SetDataMode
  /** 模式名称 */
  label: string
  /** 模式描述 */
  description: string
  /** 对应模式的 setData 代码 */
  code: string
  /** 性能指标 */
  metrics: {
    /** 传输字节数（模拟值） */
    transferBytes: number
    /** 通信次数 */
    callCount: number
    /** 模拟渲染耗时（ms） */
    renderMs: number
    /** 性能评分（1-5） */
    score: number
  }
  /** 是否为最优模式 */
  isOptimal: boolean
}

export interface SetDataPerformanceComparatorData {
  cases: SetDataPerformanceCase[]
  title?: string
}

// ============================================================================
// MiniComponentWorkbench — 自定义组件工作台
// ============================================================================

export type MiniComponentTab = 'properties' | 'data' | 'methods' | 'lifetimes'

export interface MiniComponentField {
  /** 字段名 */
  name: string
  /** 字段类型 */
  type: string
  /** 默认值 */
  defaultValue: string
  /** 描述 */
  description: string
}

export interface MiniComponentSpec {
  /** 标签页标识 */
  id: MiniComponentTab
  /** 标签页名称 */
  label: string
  /** 描述 */
  description: string
  /** Component() 定义代码 */
  code: string
  /** 字段列表 */
  fields: MiniComponentField[]
}

export interface MiniComponentWorkbenchData {
  specs: MiniComponentSpec[]
  title?: string
}

// ============================================================================
// TaroCompileFlowVisualizer — Taro 多端编译流程
// ============================================================================

export type TaroPlatform = 'wechat' | 'alipay' | 'h5' | 'rn'

export interface TaroCompileFile {
  /** 文件名 */
  name: string
  /** 文件内容 */
  content: string
  /** 语言标识 */
  language: string
}

export interface TaroCompileOutput {
  /** 目标平台 */
  platform: TaroPlatform
  /** 平台名称 */
  label: string
  /** 产物文件列表 */
  files: TaroCompileFile[]
}

export interface TaroCompileTarget {
  /** 场景标识 */
  id: string
  /** 场景名称 */
  label: string
  /** 描述 */
  description: string
  /** Taro React 源代码 */
  sourceCode: string
  /** 各平台编译产物 */
  outputs: TaroCompileOutput[]
}

export interface TaroCompileFlowVisualizerData {
  targets: TaroCompileTarget[]
  title?: string
}

// ============================================================================
// UniAppConditionalCompiler — uni-app 条件编译演示
// ============================================================================

export type UniAppPlatform = 'MP-WEIXIN' | 'H5' | 'APP-PLUS'

export interface ConditionalCompilePlatform {
  /** 平台标识 */
  id: UniAppPlatform
  /** 平台名称 */
  label: string
  /** 编译后代码（仅保留当前平台生效的代码） */
  compiledCode: string
  /** 当前平台生效的代码块标识 */
  activeBlocks: string[]
}

export interface ConditionalCompileExample {
  /** 示例标识 */
  id: string
  /** 示例名称 */
  label: string
  /** 描述 */
  description: string
  /** 原始 Vue 模板代码（含 #ifdef/#ifndef 注释） */
  sourceCode: string
  /** 各平台编译结果 */
  platforms: ConditionalCompilePlatform[]
}

export interface UniAppConditionalCompilerData {
  examples: ConditionalCompileExample[]
  title?: string
}

// ============================================================================
// SubpackageLoadingVisualizer — 分包加载可视化
// ============================================================================

export interface SubpackagePage {
  /** 页面标识 */
  id: string
  /** 页面名称 */
  label: string
  /** 模拟体积（KB） */
  sizeKb: number
}

export interface SubpackageGroup {
  /** 分包根路径 */
  root: string
  /** 分包名称 */
  name?: string
  /** 包含的页面 id 列表 */
  pages: string[]
  /** 是否独立分包 */
  independent?: boolean
}

export interface PreloadRule {
  /** 触发预加载的页面 */
  page: string
  /** 预加载的分包 root 列表 */
  packages: string[]
}

export interface SubpackageConfig {
  /** 主包页面 id 列表 */
  mainPackage: string[]
  /** 分包列表 */
  subpackages: SubpackageGroup[]
  /** 预加载规则 */
  preloadRule: PreloadRule[]
}

export interface SubpackageLoadingVisualizerData {
  pages: SubpackagePage[]
  initialConfig: SubpackageConfig
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const miniprogramVisualizationMeta: Record<
  MiniprogramVisualizationType,
  { type: MiniprogramVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'dual-thread-model-visualizer': {
    type: 'dual-thread-model-visualizer',
    label: '双线程通信模拟器',
    identifier: 'dual-thread-model-visualizer',
    purpose: 'JsCore 逻辑层 ↔ 微信原生 ↔ WebView 渲染层 setData 通信路径可视化',
  },
  'setdata-performance-comparator': {
    type: 'setdata-performance-comparator',
    label: 'setData 性能对比器',
    identifier: 'setdata-performance-comparator',
    purpose: '全量/局部/合并三种 setData 模式的传输量与渲染耗时对比',
  },
  'mini-component-workbench': {
    type: 'mini-component-workbench',
    label: '自定义组件工作台',
    identifier: 'mini-component-workbench',
    purpose: 'Component() 构造器 properties/data/methods/lifetimes 交互式探索',
  },
  'taro-compile-flow-visualizer': {
    type: 'taro-compile-flow-visualizer',
    label: 'Taro 多端编译流程',
    identifier: 'taro-compile-flow-visualizer',
    purpose: 'React 源码 → Taro 编译器 → 微信/支付宝/H5/RN 多端产物',
  },
  'uniapp-conditional-compiler': {
    type: 'uniapp-conditional-compiler',
    label: 'uni-app 条件编译',
    identifier: 'uniapp-conditional-compiler',
    purpose: '#ifdef/#ifndef 平台切换与编译后代码实时预览',
  },
  'subpackage-loading-visualizer': {
    type: 'subpackage-loading-visualizer',
    label: '分包加载可视化',
    identifier: 'subpackage-loading-visualizer',
    purpose: '主包/分包/独立分包拖拽配置与体积限制校验',
  },
}
