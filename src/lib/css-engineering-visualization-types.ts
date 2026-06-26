/**
 * CSS 工程化可视化组件类型定义 - 模块 06
 *
 * 定义 5 种 CSS 工程化专用可视化组件的类型和数据接口：
 * - TailwindPlayground：Tailwind 类名实时预览
 * - BreakpointSimulator：响应式断点模拟器
 * - SassPlayground：Sass 变量与 Mixin 实时编译
 * - BootstrapGridDemo：Bootstrap 网格系统演示
 * - ResponsiveNavDemo：响应式导航栏实战
 */

// ============================================================================
// CSS 工程化可视化组件类型联合
// ============================================================================

export type CssEngineeringVisualizationType =
  | 'tailwind-playground'
  | 'breakpoint-simulator'
  | 'sass-playground'
  | 'bootstrap-grid-demo'
  | 'responsive-nav-demo'

// ============================================================================
// 各组件的数据类型定义
// ============================================================================

/** TailwindPlayground — 工具类实时预览 */
export interface TailwindPlaygroundData {
  /** 默认输入的 Tailwind 类名 */
  defaultClasses?: string
  /** 预设代码片段 */
  snippets?: Array<{
    label: string
    classes: string
  }>
}

/** BreakpointSimulator — 响应式断点模拟器 */
export interface BreakpointSimulatorData {
  /** 默认设备宽度（px） */
  defaultWidth?: number
  /** 预设宽度选项 */
  presets?: Array<{ label: string; width: number }>
}

/** SassPlayground — Sass 变量与 Mixin 实时编译 */
export interface SassPlaygroundData {
  /** 默认主色调 */
  defaultColor?: string
  /** 默认圆角（px） */
  defaultRadius?: number
  /** 默认内边距（px） */
  defaultPadding?: number
  /** 可选的颜色预设 */
  colorPresets?: string[]
}

/** BootstrapGridDemo — Bootstrap 12 列网格演示 */
export interface BootstrapGridDemoData {
  /** 默认列数（1-12） */
  defaultColumns?: number
  /** 默认断点 */
  defaultBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

/** ResponsiveNavDemo — 响应式导航栏实战 */
export interface ResponsiveNavDemoData {
  /** 导航菜单项 */
  navItems?: Array<{
    label: string
    href: string
  }>
  /** 默认设备宽度 */
  defaultWidth?: number
}

// ============================================================================
// 组件元信息
// ============================================================================

export const cssEngineeringVisualizationMeta: Record<
  CssEngineeringVisualizationType,
  {
    type: CssEngineeringVisualizationType
    label: string
    identifier: string
    purpose: string
  }
> = {
  'tailwind-playground': {
    type: 'tailwind-playground',
    label: 'Tailwind 演练场',
    identifier: 'tailwind-playground',
    purpose: 'Tailwind 工具类实时预览与映射',
  },
  'breakpoint-simulator': {
    type: 'breakpoint-simulator',
    label: '断点模拟器',
    identifier: 'breakpoint-simulator',
    purpose: '响应式断点可视化与模拟',
  },
  'sass-playground': {
    type: 'sass-playground',
    label: 'Sass 演练场',
    identifier: 'sass-playground',
    purpose: 'Sass 变量与 Mixin 实时编译演示',
  },
  'bootstrap-grid-demo': {
    type: 'bootstrap-grid-demo',
    label: 'Bootstrap 网格演示',
    identifier: 'bootstrap-grid-demo',
    purpose: 'Bootstrap 12 列网格系统交互演示',
  },
  'responsive-nav-demo': {
    type: 'responsive-nav-demo',
    label: '响应式导航栏',
    identifier: 'responsive-nav-demo',
    purpose: '响应式导航栏实战交互演示',
  },
}
