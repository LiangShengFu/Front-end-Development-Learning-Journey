/**
 * 数据可视化与前端架构设计模式可视化组件类型定义 - 模块 20
 *
 * 定义 5 种模块二十专用可视化/架构教学模拟组件的类型和数据接口：
 * - CanvasPlayground：Canvas 实时绘图演示（图形切换 + 高 DPI + requestAnimationFrame 动画）
 * - SVGvsCanvasCompare：SVG 与 Canvas 双栏对比（渲染/事件/性能差异）
 * - D3DataBindingFlow：D3 数据绑定三态流程（enter/update/exit）
 * - EChartsConfigVisualizer：ECharts 配置切换可视化（配置 → 图表实时渲染）
 * - DesignPatternShowcase：组件设计模式展示（Container/Presentational/HOC/Render Props/Hooks/Compound）
 *
 * 另跨模块复用模块十九 DebounceThrottleVisualizer（Canvas 动画演示视角）
 * 与模块十八 ComponentTestPlayground（设计模式测试视角）。
 * 所有组件均为教学模拟，Canvas/ECharts 渲染均为本地模拟，不依赖外部库。
 */

// ============================================================================
// 可视化与架构可视化组件类型联合
// ============================================================================

export type VisualizationArchitectureVisualizationType =
  | 'canvas-playground'
  | 'svg-vs-canvas-compare'
  | 'd3-data-binding-flow'
  | 'echarts-config-visualizer'
  | 'design-pattern-showcase'

// ============================================================================
// CanvasPlayground — Canvas 实时绘图演示
// ============================================================================

export type CanvasShapeId = 'rect' | 'circle' | 'path' | 'text' | 'animation'

export interface CanvasShape {
  /** 图形标识 */
  id: CanvasShapeId
  /** 图形名称 */
  name: string
  /** Canvas API 概要 */
  api: string
  /** 代码示例 */
  codeSnippet: string
  /** 描述 */
  description: string
  /** 主题色 */
  color: string
}

export interface CanvasPlaygroundData {
  shapes?: CanvasShape[]
  /** 高 DPI 处理说明 */
  highDpiNote?: string
  /** 动画说明 */
  animationNote?: string
  title?: string
}

// ============================================================================
// SVGvsCanvasCompare — SVG 与 Canvas 双栏对比
// ============================================================================

export type SvgCanvasFeatureId =
  | 'rendering'
  | 'dom'
  | 'events'
  | 'performance'
  | 'scalability'
  | 'use-case'

export interface SvgCanvasFeature {
  /** 特性标识 */
  id: SvgCanvasFeatureId
  /** 特性名称 */
  name: string
  /** SVG 表现 */
  svg: string
  /** Canvas 表现 */
  canvas: string
  /** 推荐选择 */
  recommendation: 'svg' | 'canvas' | 'either'
  /** 主题色 */
  color: string
}

export interface SvgVsCanvasCompareData {
  features?: SvgCanvasFeature[]
  /** 对比说明 */
  compareNote?: string
  title?: string
}

// ============================================================================
// D3DataBindingFlow — D3 数据绑定三态流程
// ============================================================================

export type D3PhaseId = 'update' | 'enter' | 'exit'

export interface D3Phase {
  /** 阶段标识 */
  id: D3PhaseId
  /** 阶段名称 */
  name: string
  /** D3 API */
  api: string
  /** 描述 */
  description: string
  /** 代码示例 */
  codeSnippet: string
  /** 触发条件 */
  trigger: string
  /** 主题色 */
  color: string
}

export interface D3DataBindingFlowData {
  phases?: D3Phase[]
  /** 三态说明 */
  threePhaseNote?: string
  title?: string
}

// ============================================================================
// EChartsConfigVisualizer — ECharts 配置切换可视化
// ============================================================================

export type EChartsTypeId = 'bar' | 'line' | 'pie' | 'scatter'

export interface EChartsTypeConfig {
  /** 图表类型标识 */
  id: EChartsTypeId
  /** 图表类型名称 */
  name: string
  /** series.type 值 */
  seriesType: string
  /** 配置代码示例 */
  configSnippet: string
  /** 适用场景 */
  useCase: string
  /** 主题色 */
  color: string
}

export interface EChartsConfigVisualizerData {
  types?: EChartsTypeConfig[]
  /** 配置驱动说明 */
  configDrivenNote?: string
  title?: string
}

// ============================================================================
// DesignPatternShowcase — 组件设计模式展示
// ============================================================================

export type DesignPatternId =
  | 'container-presentational'
  | 'hoc'
  | 'render-props'
  | 'custom-hooks'
  | 'compound-components'

export interface DesignPattern {
  /** 模式标识 */
  id: DesignPatternId
  /** 模式名称 */
  name: string
  /** 简称 */
  shortName: string
  /** 核心思想 */
  philosophy: string
  /** 代码示例 */
  codeSnippet: string
  /** 适用场景 */
  useCase: string
  /** 优点 */
  pros: string[]
  /** 缺点 */
  cons: string[]
  /** 主题色 */
  color: string
}

export interface DesignPatternShowcaseData {
  patterns?: DesignPattern[]
  /** 模式演进说明 */
  architectureNote?: string
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const visualizationArchitectureVisualizationMeta: Record<
  VisualizationArchitectureVisualizationType,
  {
    type: VisualizationArchitectureVisualizationType
    label: string
    identifier: string
    purpose: string
  }
> = {
  'canvas-playground': {
    type: 'canvas-playground',
    label: 'Canvas 绘图演示',
    identifier: 'canvas-playground',
    purpose: 'Canvas 图形切换 + 高 DPI 处理 + requestAnimationFrame 动画演示',
  },
  'svg-vs-canvas-compare': {
    type: 'svg-vs-canvas-compare',
    label: 'SVG 与 Canvas 对比',
    identifier: 'svg-vs-canvas-compare',
    purpose: 'SVG 与 Canvas 双栏渲染 + 事件/性能/缩放差异切换',
  },
  'd3-data-binding-flow': {
    type: 'd3-data-binding-flow',
    label: 'D3 数据绑定流程',
    identifier: 'd3-data-binding-flow',
    purpose: 'D3 enter/update/exit 三态动画 + 数据绑定演示',
  },
  'echarts-config-visualizer': {
    type: 'echarts-config-visualizer',
    label: 'ECharts 配置可视化',
    identifier: 'echarts-config-visualizer',
    purpose: 'ECharts 图表类型切换 + 配置 → 实时渲染演示',
  },
  'design-pattern-showcase': {
    type: 'design-pattern-showcase',
    label: '设计模式展示',
    identifier: 'design-pattern-showcase',
    purpose: 'Container/HOC/Render Props/Hooks/Compound 模式切换 + 代码对比',
  },
}
