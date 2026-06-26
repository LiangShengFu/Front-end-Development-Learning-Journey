/**
 * DOM / BOM / Web API 可视化组件类型定义
 *
 * 定义模块四专用交互式 Playground 的数据结构。
 * 覆盖 DOM 节点、事件流、BOM、存储、几何、文件、调度等 Web API 核心知识点。
 * 作为核心类型系统（types.ts）的扩展，被 VisualizationRenderer 统一调度。
 */

// ============================================================================
// DOM/BOM 可视化组件类型标识
// ============================================================================

/** DOM/BOM 专用可视化组件类型 */
export type DomBomVisualizationType =
  | 'dom-tree-visualizer'
  | 'event-flow-visualizer'
  | 'event-delegation'
  | 'location-parser'
  | 'history-router'
  | 'storage-playground'
  | 'geometry-calculator'
  | 'scroll-animation'
  | 'file-upload'
  | 'blob-download'
  | 'raf-animation'

// ============================================================================
// DomTreeVisualizer - DOM 树结构可视化
// ============================================================================

export interface DomTreeVisualizerData {
  title?: string
}

// ============================================================================
// EventFlowVisualizer - 事件流三阶段可视化
// ============================================================================

export interface EventFlowVisualizerData {
  title?: string
}

// ============================================================================
// EventDelegationDemo - 事件委托演示
// ============================================================================

export interface EventDelegationData {
  title?: string
  /** 初始列表项数量 */
  initialCount?: number
}

// ============================================================================
// LocationParser - location URL 解析器
// ============================================================================

export interface LocationParserData {
  title?: string
  /** 默认 URL */
  initialUrl?: string
}

// ============================================================================
// HistoryRouterDemo - History 路由演示
// ============================================================================

export interface HistoryRouterData {
  title?: string
  /** 可路由路径列表 */
  routes?: string[]
}

// ============================================================================
// StoragePlayground - 存储 Playground
// ============================================================================

export interface StoragePlaygroundData {
  title?: string
  /** 存储类型 */
  storageType?: 'local' | 'session'
}

// ============================================================================
// GeometryCalculator - 几何尺寸计算器
// ============================================================================

export interface GeometryCalculatorData {
  title?: string
  initialWidth?: number
  initialHeight?: number
}

// ============================================================================
// ScrollAnimationDemo - 滚动动画演示
// ============================================================================

export interface ScrollAnimationData {
  title?: string
}

// ============================================================================
// FileUploadDemo - 文件上传与预览
// ============================================================================

export interface FileUploadData {
  title?: string
}

// ============================================================================
// BlobDownloadDemo - Blob 下载演示
// ============================================================================

export interface BlobDownloadData {
  title?: string
  /** 默认文本内容 */
  defaultContent?: string
  /** 默认 MIME 类型 */
  defaultMime?: 'text/plain' | 'application/json' | 'text/csv'
  /** 默认文件名 */
  defaultFilename?: string
}

// ============================================================================
// RafAnimationDemo - rAF 动画演示
// ============================================================================

export interface RafAnimationData {
  title?: string
}

// ============================================================================
// DOM/BOM 可视化组件元数据
// ============================================================================

export interface DomBomVisualizationMeta {
  type: DomBomVisualizationType
  /** 中文显示名 */
  label: string
  /** 英文标识 */
  identifier: string
  /** 用途说明 */
  purpose: string
}

/** DOM/BOM 专用可视化组件的元数据映射 */
export const domBomVisualizationMeta: Record<DomBomVisualizationType, DomBomVisualizationMeta> = {
  'dom-tree-visualizer': {
    type: 'dom-tree-visualizer',
    label: 'DOM 树',
    identifier: 'dom-tree-visualizer',
    purpose: 'DOM 节点增删改实时可视化',
  },
  'event-flow-visualizer': {
    type: 'event-flow-visualizer',
    label: '事件流',
    identifier: 'event-flow-visualizer',
    purpose: '事件捕获/目标/冒泡三阶段演示',
  },
  'event-delegation': {
    type: 'event-delegation',
    label: '事件委托',
    identifier: 'event-delegation',
    purpose: '事件委托 vs 逐项绑定对比',
  },
  'location-parser': {
    type: 'location-parser',
    label: 'URL 解析',
    identifier: 'location-parser',
    purpose: 'location 各部分实时解析',
  },
  'history-router': {
    type: 'history-router',
    label: 'History 路由',
    identifier: 'history-router',
    purpose: 'pushState/replaceState 历史栈演示',
  },
  'storage-playground': {
    type: 'storage-playground',
    label: '存储演练',
    identifier: 'storage-playground',
    purpose: 'localStorage/sessionStorage CRUD',
  },
  'geometry-calculator': {
    type: 'geometry-calculator',
    label: '几何尺寸',
    identifier: 'geometry-calculator',
    purpose: 'offset/client/scroll 尺寸实时计算',
  },
  'scroll-animation': {
    type: 'scroll-animation',
    label: '滚动动画',
    identifier: 'scroll-animation',
    purpose: 'scrollTo/scrollIntoView + rAF 节流',
  },
  'file-upload': {
    type: 'file-upload',
    label: '文件上传',
    identifier: 'file-upload',
    purpose: 'FileReader 读取与预览',
  },
  'blob-download': {
    type: 'blob-download',
    label: 'Blob 下载',
    identifier: 'blob-download',
    purpose: 'Blob URL 创建与下载',
  },
  'raf-animation': {
    type: 'raf-animation',
    label: 'rAF 动画',
    identifier: 'raf-animation',
    purpose: 'rAF vs setInterval 流畅度对比',
  },
}

/** DOM/BOM 可视化组件数据联合类型 */
export type DomBomVisualizationData =
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
