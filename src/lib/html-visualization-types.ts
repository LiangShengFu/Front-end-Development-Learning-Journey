/**
 * HTML 可视化组件类型定义
 *
 * 定义 HTML 模块专用可视化组件的数据结构。
 * 这些组件专注于 HTML 特有概念：DOM 结构、语义化、表单、元素解剖等。
 * 作为核心类型系统（types.ts）的扩展，被 VisualizationRenderer 统一调度。
 */

// ============================================================================
// HTML 可视化组件类型标识
// ============================================================================

/** HTML 专用可视化组件类型 */
export type HtmlVisualizationType =
  | 'dom-tree'
  | 'element-anatomy'
  | 'semantic-compare'
  | 'form-playground'
  | 'table-builder'
  | 'a11y-checklist'
  | 'path-parser'
  | 'api-card'

// ============================================================================
// DomTree - DOM 文档结构树
// ============================================================================

export interface DomTreeNode {
  /** 标签名 */
  tag: string
  /** 属性列表 */
  attrs?: Array<{ name: string; value: string }>
  /** 节点描述 */
  desc?: string
  /** 子节点 */
  children?: DomTreeNode[]
}

export interface DomTreeData {
  /** 树根节点 */
  root: DomTreeNode
  /** 可选的标题 */
  title?: string
}

// ============================================================================
// ElementAnatomy - HTML 元素解剖图
// ============================================================================

export interface ElementAnatomyData {
  /** 展示的元素标签名，如 'a'、'img' */
  tag: string
  /** 元素内容文本 */
  content: string
  /** 属性列表 */
  attributes?: Array<{
    name: string
    value: string
    description: string
  }>
  /** 是否为空元素（void element） */
  isVoid?: boolean
  /** 各部分说明 */
  parts: {
    openingTag: string
    content: string
    closingTag: string
  }
}

// ============================================================================
// SemanticCompare - 语义化对比
// ============================================================================

export interface SemanticCompareData {
  /** 对比标题 */
  title?: string
  /** 良好实践侧 */
  good: {
    label: string
    tags: Array<{
      tag: string
      reason: string
    }>
    description: string
  }
  /** 不良实践侧 */
  bad: {
    label: string
    tags: Array<{
      tag: string
      reason: string
    }>
    description: string
  }
}

// ============================================================================
// FormPlayground - 表单交互演示器
// ============================================================================

export interface FormField {
  /** 字段类型 */
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio'
  /** label 文本 */
  label: string
  /** name 属性 */
  name: string
  /** 占位符 */
  placeholder?: string
  /** select 的选项 */
  options?: string[]
  /** 是否必填 */
  required?: boolean
  /** 默认值 */
  defaultValue?: string
}

export interface FormPlaygroundData {
  /** 表单标题 */
  title?: string
  /** 字段列表 */
  fields: FormField[]
  /** 提交按钮文本 */
  submitLabel?: string
}

// ============================================================================
// TableBuilder - 表格构建器动画
// ============================================================================

export interface TableBuilderStep {
  /** 步骤标题 */
  title: string
  /** 步骤描述 */
  description: string
  /** 该步骤显示的区域：caption/thead/tbody/tfoot */
  showRegions?: Array<'caption' | 'thead' | 'tbody' | 'tfoot'>
  /** 该步骤高亮的单元格坐标 [row, col] */
  highlightCells?: Array<[number, number]>
  /** 代码片段 */
  code?: string
}

export interface TableBuilderData {
  /** 表格标题 */
  caption: string
  /** 表头 */
  headers: string[]
  /** 表体行 */
  rows: string[][]
  /** 表脚行 */
  footer?: string[]
  /** 构建步骤 */
  steps: TableBuilderStep[]
}

// ============================================================================
// A11yChecklist - 无障碍检查清单
// ============================================================================

export interface A11yItem {
  /** 检查项标题 */
  title: string
  /** 描述 */
  description: string
  /** 代码示例 */
  code?: string
  /** 是否默认已检查 */
  defaultChecked?: boolean
}

export interface A11yChecklistData {
  /** 清单标题 */
  title?: string
  /** 检查项列表 */
  items: A11yItem[]
}

// ============================================================================
// PathParser - URL 路径解析器
// ============================================================================

export interface PathParserData {
  /** 默认 URL */
  defaultUrl: string
  /** 示例 URL 列表 */
  examples?: string[]
  /** 说明文本 */
  hint?: string
}

// ============================================================================
// ApiCard - HTML5 API 能力图谱
// ============================================================================

export interface ApiCardItem {
  /** API 标识，用于匹配详情 */
  id: string
  /** 图标（emoji） */
  icon: string
  /** API 名称 */
  name: string
  /** 分类标签 */
  tag: string
}

export interface ApiCardDetail {
  /** 详情标题 */
  title: string
  /** 详情 HTML 内容（支持简单内联标签） */
  html: string
}

export interface ApiCardData {
  /** 图谱标题 */
  title?: string
  /** 说明文本 */
  hint?: string
  /** API 卡片列表 */
  cards: ApiCardItem[]
  /** 详情映射，key 为 ApiCardItem.id */
  details: Record<string, ApiCardDetail>
}

// ============================================================================
// HTML 可视化组件元数据
// ============================================================================

export interface HtmlVisualizationMeta {
  type: HtmlVisualizationType
  /** 中文显示名 */
  label: string
  /** 英文标识 */
  identifier: string
  /** 用途说明 */
  purpose: string
}

/** HTML 专用可视化组件的元数据映射 */
export const htmlVisualizationMeta: Record<HtmlVisualizationType, HtmlVisualizationMeta> = {
  'dom-tree': {
    type: 'dom-tree',
    label: 'DOM 树',
    identifier: 'dom-tree',
    purpose: 'DOM 文档结构树可视化',
  },
  'element-anatomy': {
    type: 'element-anatomy',
    label: '元素解剖',
    identifier: 'element-anatomy',
    purpose: 'HTML 元素结构解剖图',
  },
  'semantic-compare': {
    type: 'semantic-compare',
    label: '语义对比',
    identifier: 'semantic-compare',
    purpose: '语义化标签对比演示',
  },
  'form-playground': {
    type: 'form-playground',
    label: '表单演示',
    identifier: 'form-playground',
    purpose: '表单元素交互演示器',
  },
  'table-builder': {
    type: 'table-builder',
    label: '表格构建',
    identifier: 'table-builder',
    purpose: '表格结构分步构建动画',
  },
  'a11y-checklist': {
    type: 'a11y-checklist',
    label: '无障碍清单',
    identifier: 'a11y-checklist',
    purpose: '无障碍检查清单',
  },
  'path-parser': {
    type: 'path-parser',
    label: '路径解析',
    identifier: 'path-parser',
    purpose: 'URL 路径解析器',
  },
  'api-card': {
    type: 'api-card',
    label: 'API 图谱',
    identifier: 'api-card',
    purpose: 'HTML5 API 能力图谱',
  },
}

/** HTML 可视化组件数据联合类型 */
export type HtmlVisualizationData =
  | DomTreeData
  | ElementAnatomyData
  | SemanticCompareData
  | FormPlaygroundData
  | TableBuilderData
  | A11yChecklistData
  | PathParserData
  | ApiCardData
