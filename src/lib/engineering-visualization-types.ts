/**
 * 前端工程化可视化组件类型定义 - 模块 15
 *
 * 定义 7 种模块十五专用工程化教学模拟组件的类型和数据接口：
 * - WebpackBuildFlowVisualizer：Webpack 构建流程（Entry → Resolve → Loader → Plugin → Output）
 * - ViteEsmLoadingFlow：Vite 开发模式原生 ESM 加载流程
 * - PnpmHardlinkVisualizer：pnpm 全局 store + 硬链接 + 符号链接结构
 * - CommitMessageParser：约定式提交解析器（实时解析 type/scope/breaking/footer）
 * - MonorepoTreeVisualizer：pnpm workspace Monorepo 项目结构树
 * - TurborepoTaskFlow：Turborepo 任务编排（依赖图 + 增量构建 + 远程缓存）
 * - CICDPipelineVisualizer：CI/CD 流水线（GitHub Actions 端到端流程）
 *
 * 所有组件均为教学模拟，不执行真实构建/安装/CI 运行时。
 */

// ============================================================================
// 工程化可视化组件类型联合
// ============================================================================

export type EngineeringVisualizationType =
  | 'webpack-build-flow-visualizer'
  | 'vite-esm-loading-flow'
  | 'pnpm-hardlink-visualizer'
  | 'commit-message-parser'
  | 'monorepo-tree-visualizer'
  | 'turborepo-task-flow'
  | 'cicd-pipeline-visualizer'

// ============================================================================
// 通用流程图类型（Webpack/Vite/Turborepo/CI-CD 复用）
// ============================================================================

/** 流程节点 */
export interface FlowNode {
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
export interface FlowEdge {
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
// WebpackBuildFlowVisualizer — Webpack 构建流程
// ============================================================================

export type WebpackBuildStepId = 'entry' | 'resolve' | 'loader' | 'plugin' | 'output'

export interface WebpackBuildStep {
  /** 步骤标识 */
  id: WebpackBuildStepId
  /** 步骤名称 */
  name: string
  /** 描述 */
  description: string
  /** 流程节点 */
  nodes: FlowNode[]
  /** 流程边 */
  edges: FlowEdge[]
  /** 代码片段 */
  codeSnippet?: string
  /** 代码语言 */
  codeLanguage?: string
  /** 模拟耗时（ms） */
  durationMs: number
}

export interface WebpackBuildFlowVisualizerData {
  steps?: WebpackBuildStep[]
  title?: string
}

// ============================================================================
// ViteEsmLoadingFlow — Vite ESM 加载流程
// ============================================================================

export type ViteEsmStageId =
  | 'browser-request'
  | 'vite-intercept'
  | 'on-demand-compile'
  | 'return-esm'

export interface ViteEsmStage {
  /** 阶段标识 */
  id: ViteEsmStageId
  /** 阶段名称 */
  name: string
  /** 描述 */
  description: string
  /** 流程节点 */
  nodes: FlowNode[]
  /** 流程边 */
  edges: FlowEdge[]
  /** 代码片段 */
  codeSnippet?: string
  /** 代码语言 */
  codeLanguage?: string
  /** 与 Webpack 的关键差异 */
  highlightDiff: string
  /** 模拟耗时（ms） */
  durationMs: number
}

export interface ViteEsmLoadingFlowData {
  stages?: ViteEsmStage[]
  title?: string
}

// ============================================================================
// PnpmHardlinkVisualizer — pnpm 硬链接机制
// ============================================================================

export interface StorePackage {
  /** 包名 */
  name: string
  /** 版本 */
  version: string
  /** 占用空间（KB） */
  size: number
  /** 硬链接引用次数 */
  hardlinkCount: number
  /** 主题色 */
  color: string
  /** 背景色（可选，用于选中态） */
  bg?: string
}

export interface PnpmStoreData {
  /** 全局 store 路径 */
  path: string
  /** store 中的包 */
  packages: StorePackage[]
}

export interface PnpmProjectDependency {
  /** 包名 */
  name: string
  /** 版本 */
  version: string
  /** 链接类型 */
  linkType: 'hardlink' | 'symlink'
}

export interface PnpmProjectData {
  /** 项目名称 */
  name: string
  /** 项目路径 */
  path: string
  /** 项目依赖 */
  dependencies: PnpmProjectDependency[]
  /** 主题色 */
  color: string
}

export interface PnpmHardlinkVisualizerData {
  store?: PnpmStoreData
  projects?: PnpmProjectData[]
  /** 对比说明（与 npm/yarn 的差异） */
  comparisonNotes?: string[]
  title?: string
}

// ============================================================================
// CommitMessageParser — 约定式提交解析器
// ============================================================================

export interface CommitMessageExample {
  /** 示例标识 */
  id: string
  /** 示例标签 */
  label: string
  /** 提交消息原文 */
  message: string
  /** 解析说明 */
  explanation: string
}

export interface CommitMessagePart {
  /** 部分标识 */
  id: string
  /** 部分名称 */
  label: string
  /** 颜色 */
  color: string
  /** 背景色 */
  bg: string
  /** 说明 */
  description: string
}

export interface CommitMessageParserData {
  /** 类型列表 */
  types?: Array<{ type: string; label: string; color: string }>
  /** 预设示例 */
  examples?: CommitMessageExample[]
  /** 解析后的各部分说明 */
  parts?: CommitMessagePart[]
  title?: string
}

// ============================================================================
// MonorepoTreeVisualizer — Monorepo 结构
// ============================================================================

export type MonorepoNodeType = 'root' | 'workspace' | 'package' | 'config'

export interface MonorepoNode {
  /** 节点路径 */
  path: string
  /** 节点名称 */
  label: string
  /** 节点类型 */
  type: MonorepoNodeType
  /** 描述 */
  description?: string
  /** 包的依赖（仅 package 类型） */
  dependencies?: string[]
  /** 子节点 */
  children?: MonorepoNode[]
  /** 代码片段 */
  codeSnippet?: string
  /** 代码语言 */
  codeLanguage?: string
}

export interface MonorepoTreeVisualizerData {
  root?: MonorepoNode
  /** pnpm-workspace.yaml 内容 */
  workspaceConfig?: string
  title?: string
}

// ============================================================================
// TurborepoTaskFlow — Turborepo 任务编排
// ============================================================================

export type TurboTaskStatus = 'pending' | 'running' | 'success' | 'cached' | 'failed'

export interface TurboTask {
  /** 任务标识（包名:脚本名） */
  id: string
  /** 包名 */
  packageName: string
  /** 脚本名 */
  script: string
  /** 任务名称 */
  label: string
  /** 依赖任务 */
  dependsOn: string[]
  /** 状态 */
  status: TurboTaskStatus
  /** 模拟耗时（ms） */
  durationMs: number
  /** 是否命中缓存 */
  cached?: boolean
  /** 输出 */
  output?: string
  /** 主题色 */
  color: string
}

export interface TurborepoTaskFlowData {
  tasks?: TurboTask[]
  /** turbo.json 配置 */
  turboConfig?: string
  /** 远程缓存说明 */
  remoteCacheNote?: string
  title?: string
}

// ============================================================================
// CICDPipelineVisualizer — CI/CD 流水线
// ============================================================================

export type CICDStageStatus = 'pending' | 'running' | 'success' | 'failed' | 'skipped'

export type CICDStageId =
  | 'trigger'
  | 'checkout'
  | 'install'
  | 'lint'
  | 'test'
  | 'build'
  | 'deploy'

export interface CICDStage {
  /** 阶段标识 */
  id: CICDStageId
  /** 阶段名称 */
  label: string
  /** 描述 */
  description: string
  /** 状态 */
  status: CICDStageStatus
  /** 模拟耗时（s） */
  durationSec: number
  /** GitHub Actions 工作流 YAML 片段 */
  yamlSnippet: string
  /** 主题色 */
  color: string
  /** 失败时的提示 */
  failureTip?: string
}

export interface CICDPipelineVisualizerData {
  stages?: CICDStage[]
  /** 触发方式说明 */
  triggerInfo?: string
  /** 完整工作流文件 */
  fullWorkflowYaml?: string
  title?: string
}

// ============================================================================
// 组件元信息
// ============================================================================

export const engineeringVisualizationMeta: Record<
  EngineeringVisualizationType,
  { type: EngineeringVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'webpack-build-flow-visualizer': {
    type: 'webpack-build-flow-visualizer',
    label: 'Webpack 构建流程',
    identifier: 'webpack-build-flow-visualizer',
    purpose: 'Entry → Resolve → Loader 链 → Plugin 钩子 → Output 分步执行可视化',
  },
  'vite-esm-loading-flow': {
    type: 'vite-esm-loading-flow',
    label: 'Vite ESM 加载流程',
    identifier: 'vite-esm-loading-flow',
    purpose: '浏览器请求 → Vite 拦截 → 按需编译 → 返回 ESM 模块，对比 Webpack 差异',
  },
  'pnpm-hardlink-visualizer': {
    type: 'pnpm-hardlink-visualizer',
    label: 'pnpm 硬链接机制',
    identifier: 'pnpm-hardlink-visualizer',
    purpose: '全局 store → 硬链接 → 项目 node_modules 符号链接结构可视化',
  },
  'commit-message-parser': {
    type: 'commit-message-parser',
    label: '约定式提交解析器',
    identifier: 'commit-message-parser',
    purpose: '实时解析 type(scope): subject / BREAKING CHANGE / footer',
  },
  'monorepo-tree-visualizer': {
    type: 'monorepo-tree-visualizer',
    label: 'Monorepo 结构',
    identifier: 'monorepo-tree-visualizer',
    purpose: 'pnpm workspace Monorepo 项目树 + 工作区配置',
  },
  'turborepo-task-flow': {
    type: 'turborepo-task-flow',
    label: 'Turborepo 任务编排',
    identifier: 'turborepo-task-flow',
    purpose: '依赖图驱动任务编排 + 增量构建 + 远程缓存',
  },
  'cicd-pipeline-visualizer': {
    type: 'cicd-pipeline-visualizer',
    label: 'CI/CD 流水线',
    identifier: 'cicd-pipeline-visualizer',
    purpose: 'GitHub Actions 端到端流程：触发 → 检出 → 安装 → Lint → 测试 → 构建 → 部署',
  },
}
