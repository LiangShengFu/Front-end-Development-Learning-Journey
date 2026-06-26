/**
 * CSS 可视化组件类型定义
 *
 * 定义 CSS 模块专用可视化组件的数据结构。
 * 这些组件专注于 CSS 特有概念：盒模型、选择器、定位、Flexbox、
 * 显示类型、响应式视口、动画等，均为实时交互式 Playground。
 * 作为核心类型系统（types.ts）的扩展，被 VisualizationRenderer 统一调度。
 */

// ============================================================================
// CSS 可视化组件类型标识
// ============================================================================

/** CSS 专用可视化组件类型 */
export type CssVisualizationType =
  | 'flexbox-playground'
  | 'box-model'
  | 'selector-playground'
  | 'animation-playground'
  | 'position-playground'
  | 'display-type'
  | 'responsive-viewport'
  | 'grid-playground'

// ============================================================================
// FlexboxPlayground - Flexbox 交互式演示
// ============================================================================

export interface FlexboxPlaygroundData {
  /** 演示标题 */
  title?: string
  /** 子项数量 */
  itemCount?: number
  /** 初始 flex-direction */
  defaultDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  /** 初始 justify-content */
  defaultJustifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  /** 初始 align-items */
  defaultAlignItems?:
    | 'stretch'
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'baseline'
  /** 初始 gap（px） */
  defaultGap?: number
}

// ============================================================================
// BoxModelVisualizer - 盒模型可视化
// ============================================================================

export interface BoxModelPlaygroundData {
  /** 演示标题 */
  title?: string
  /** 初始 box-sizing */
  defaultSizing?: 'content-box' | 'border-box'
  /** 初始 margin（px） */
  defaultMargin?: number
  /** 初始 border（px） */
  defaultBorder?: number
  /** 初始 padding（px） */
  defaultPadding?: number
  /** 初始 width（px） */
  defaultWidth?: number
}

// ============================================================================
// SelectorPlayground - 选择器实时匹配
// ============================================================================

export interface SelectorSampleElement {
  /** 元素标签名，如 'div' / 'a' / 'span' */
  tag: string
  /** id 属性（可选） */
  id?: string
  /** class 列表（可选） */
  classes?: string[]
  /** 文本内容（可选） */
  text?: string
  /** 缩进层级（0=顶层） */
  indent?: number
  /** 是否独占一行 */
  block?: boolean
}

export interface SelectorPlaygroundData {
  /** 演示标题 */
  title?: string
  /** 默认选择器 */
  defaultSelector?: string
  /** 快捷示例选择器列表 */
  quickSelectors?: string[]
  /** 样例 DOM 元素列表（渲染为真实 DOM 供 querySelectorAll 匹配） */
  sampleElements: SelectorSampleElement[]
}

// ============================================================================
// AnimationPlayground - 动画与过渡演示
// ============================================================================

export interface AnimationPlaygroundData {
  /** 演示标题 */
  title?: string
  /** 初始模式 */
  defaultMode?: 'transition' | 'animation'
  /** 初始 transition 属性 */
  defaultTransitionProperty?: string
  /** 初始 transition 时长（ms） */
  defaultTransitionDuration?: number
  /** 初始 transition 缓动函数 */
  defaultTransitionTiming?: string
  /** 初始 keyframes 名称 */
  defaultKeyframe?: 'spin' | 'bounce' | 'pulse'
  /** 初始 animation 时长（ms） */
  defaultAnimationDuration?: number
}

// ============================================================================
// PositionPlayground - 定位演示
// ============================================================================

export interface PositionPlaygroundData {
  /** 演示标题 */
  title?: string
  /** 初始定位类型 */
  defaultPosition?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  /** 初始 top（px） */
  defaultTop?: number
  /** 初始 left（px） */
  defaultLeft?: number
  /** 初始 z-index */
  defaultZIndex?: number
}

// ============================================================================
// DisplayTypeDemo - 显示类型对比
// ============================================================================

export interface DisplayTypePlaygroundData {
  /** 演示标题 */
  title?: string
  /** 初始显示类型 */
  defaultDisplay?: 'inline' | 'block' | 'inline-block'
}

// ============================================================================
// ResponsiveViewport - 响应式视口演示
// ============================================================================

export interface ResponsiveBreakpoint {
  /** 断点名称 */
  name: string
  /** 最大宽度（px），最后一个用 Infinity */
  maxWidth: number
  /** 断点描述 */
  description: string
}

export interface ResponsiveViewportData {
  /** 演示标题 */
  title?: string
  /** 初始视口宽度（px） */
  defaultWidth?: number
  /** 最小宽度（px） */
  minWidth?: number
  /** 最大宽度（px） */
  maxWidth?: number
  /** 断点定义 */
  breakpoints?: ResponsiveBreakpoint[]
  /** 预设宽度按钮 */
  presets?: Array<{ label: string; width: number }>
}

// ============================================================================
// GridPlayground - CSS Grid 交互式演示
// ============================================================================

/** Grid 列/行轨道预设 */
export type GridTrackPreset =
  | '1fr'
  | '1fr 1fr'
  | '1fr 1fr 1fr'
  | 'repeat(3, 1fr)'
  | 'repeat(4, 1fr)'
  | 'repeat(auto-fill, minmax(80px, 1fr))'
  | '200px 1fr'
  | 'minmax(100px, auto)'

export interface GridPlaygroundData {
  /** 演示标题 */
  title?: string
  /** 子项数量 */
  itemCount?: number
  /** 初始 grid-template-columns 值 */
  defaultColumns?: string
  /** 初始 grid-template-rows 值 */
  defaultRows?: string
  /** 初始 gap（px） */
  defaultGap?: number
  /** 初始 justify-items */
  defaultJustifyItems?: 'start' | 'center' | 'end' | 'stretch'
  /** 初始 align-items */
  defaultAlignItems?: 'start' | 'center' | 'end' | 'stretch'
}

// ============================================================================
// CSS 可视化组件元数据
// ============================================================================

export interface CssVisualizationMeta {
  type: CssVisualizationType
  /** 中文显示名 */
  label: string
  /** 英文标识 */
  identifier: string
  /** 用途说明 */
  purpose: string
}

/** CSS 专用可视化组件的元数据映射 */
export const cssVisualizationMeta: Record<CssVisualizationType, CssVisualizationMeta> = {
  'flexbox-playground': {
    type: 'flexbox-playground',
    label: 'Flex 演练场',
    identifier: 'flexbox-playground',
    purpose: 'Flexbox 布局交互式演示',
  },
  'box-model': {
    type: 'box-model',
    label: '盒模型',
    identifier: 'box-model',
    purpose: 'CSS 盒模型可视化与 box-sizing 对比',
  },
  'selector-playground': {
    type: 'selector-playground',
    label: '选择器演练场',
    identifier: 'selector-playground',
    purpose: 'CSS 选择器实时匹配可视化',
  },
  'animation-playground': {
    type: 'animation-playground',
    label: '动画演练场',
    identifier: 'animation-playground',
    purpose: 'Transition 与 Animation 交互演示',
  },
  'position-playground': {
    type: 'position-playground',
    label: '定位演练场',
    identifier: 'position-playground',
    purpose: '五种定位模式交互演示',
  },
  'display-type': {
    type: 'display-type',
    label: '显示类型',
    identifier: 'display-type',
    purpose: 'inline/block/inline-block 对比演示',
  },
  'responsive-viewport': {
    type: 'responsive-viewport',
    label: '响应式视口',
    identifier: 'responsive-viewport',
    purpose: '响应式布局视口拖拽演示',
  },
  'grid-playground': {
    type: 'grid-playground',
    label: 'Grid 演练场',
    identifier: 'grid-playground',
    purpose: 'CSS Grid 二维布局交互式演示',
  },
}

/** CSS 可视化组件数据联合类型 */
export type CssVisualizationData =
  | FlexboxPlaygroundData
  | BoxModelPlaygroundData
  | SelectorPlaygroundData
  | AnimationPlaygroundData
  | PositionPlaygroundData
  | DisplayTypePlaygroundData
  | ResponsiveViewportData
  | GridPlaygroundData
