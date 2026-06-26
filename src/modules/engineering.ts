/**
 * 模块 15：前端工程化体系
 *
 * 严格遵循 docx/模块十五.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 15 个知识点（对应 15 个可视化演示，含小测验）
 * - 7 个新增工程化专属组件（位于 components/interactive/engineering/）
 * - 跨模块复用模块十四 CrossPlatformSelector（构建工具选型器）
 * - 复用通用组件池：KnowledgeGraph / CompareTable × 3 / Timeline / Accordion / QuizCard
 *
 * 章节映射（来自文档 8.2）：
 * - 章节1 构建工具：#1 知识图谱 / #2 Webpack流程 / #3 Vite ESM / #4 Webpack vs Vite
 * - 章节2 包管理器：#5 pnpm 硬链接 / #6 包管理器对比
 * - 章节3 代码规范：（理论）
 * - 章节4 Git 工作流：#7 约定式提交 / #8 Git 工作流时间线
 * - 章节5 现代工程化工具：#9 Monorepo / #10 Turborepo / #11 CI/CD
 * - 章节6 现代构建工具：#12 选型器 / #13 性能对比
 * - 章节7 速查：#14 工程化速查
 * - 测验：#15 工程化小测验
 *
 * 所有交互均为教学模拟，不运行真实构建/git/CI。
 */
import type { ModuleMeta } from '../lib/types'

export const engineeringModule: ModuleMeta = {
  number: '15',
  title: '前端工程化体系',
  slug: 'engineering',
  stage: 'engineering',
  stageLabel: '工程化与协作 · 第 1 模块',
  icon: '15',
  summary:
    'Webpack/Vite 构建工具、pnpm 包管理、ESLint/Prettier 规范、Git 约定式提交、Monorepo + Turborepo、CI/CD。',
  knowledgePointCount: 15,
  visualizationCount: 15,
  points: [
    // ========================================================================
    // 章节 1 · 构建工具
    // 知识点 1：前端工程化知识图谱
    // ========================================================================
    {
      order: 1,
      title: '前端工程化总览',
      difficulty: 1,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'eng-p1-1',
          type: 'paragraph',
          lead: true,
          text: '模块十五是「工程化与协作」阶段的开篇模块，承担「从单文件开发到团队工程化协作」的能力跃迁。从构建工具（Webpack/Vite）出发，覆盖包管理器（pnpm）、代码规范（ESLint/Prettier）、Git 工作流（约定式提交）、现代工程化工具（Monorepo/Turborepo/CI-CD）与 Rust/Zig 新一代构建工具（Rspack/Bun/SWC），形成完整的工程化教学链路。',
        },
        {
          id: 'eng-p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'engineering', label: '前端工程化', group: 'core', weight: 3 },
              { id: 'build', label: '构建工具', group: 'related', weight: 2 },
              { id: 'pkg', label: '包管理器', group: 'related', weight: 2 },
              { id: 'lint', label: '代码规范', group: 'related', weight: 2 },
              { id: 'git', label: 'Git 工作流', group: 'related', weight: 2 },
              { id: 'monorepo', label: 'Monorepo', group: 'related', weight: 2 },
              { id: 'cicd', label: 'CI/CD', group: 'related', weight: 2 },
              { id: 'rust-tools', label: 'Rust 构建工具', group: 'related', weight: 1 },
            ],
            edges: [
              { source: 'engineering', target: 'build' },
              { source: 'engineering', target: 'pkg' },
              { source: 'engineering', target: 'lint' },
              { source: 'engineering', target: 'git' },
              { source: 'engineering', target: 'monorepo' },
              { source: 'engineering', target: 'cicd' },
              { source: 'build', target: 'rust-tools' },
              { source: 'monorepo', target: 'cicd' },
              { source: 'pkg', target: 'monorepo' },
            ],
          },
        },
        {
          id: 'eng-p1-3',
          type: 'list',
          items: [
            '构建工具：Webpack（Entry/Loader/Plugin/Output）、Vite（原生 ESM + Rollup）、Turbopack/Rspack（Rust）',
            '包管理器：npm / yarn / pnpm（硬链接 + 符号链接 + workspace）',
            '代码规范：ESLint 语法规则 + Prettier 格式化 + EditorConfig 编辑器配置',
            'Git 工作流：约定式提交（feat/fix/!）、分支策略（Git Flow / Trunk-based）、Code Review',
            '现代工程化：Monorepo（pnpm workspace）+ Turborepo（任务编排 + 增量构建 + 远程缓存）',
            'CI/CD：GitHub Actions 端到端流水线（lint → test → build → deploy）',
            'Rust/Zig 工具：Rspack（Rust Webpack）、Bun（Zig 全栈）、SWC（Rust 编译器）',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 2：Webpack 构建流程
    // ========================================================================
    {
      order: 2,
      title: 'Webpack 构建流程：Entry → Resolve → Loader → Plugin → Output',
      difficulty: 3,
      isNew: true,
      visualizationType: 'webpack-build-flow-visualizer',
      blocks: [
        {
          id: 'eng-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Webpack 是经典的打包式构建工具，核心流程 5 步：Entry（入口）→ Resolve（路径解析）→ Loader 链（按文件类型转换）→ Plugin 钩子（贯穿全流程的扩展点）→ Output（输出 bundle）。理解这 5 步是掌握 Webpack 配置与性能优化的基础。',
        },
        {
          id: 'eng-p2-2',
          type: 'demo',
          visualizationType: 'webpack-build-flow-visualizer',
          data: {
            steps: [
              {
                id: 'entry',
                name: 'Entry 入口',
                description:
                  'Webpack 从 entry 配置的文件开始，构建依赖图。entry 是依赖图的根节点，决定了打包起点与 chunk 划分。',
                nodes: [
                  { id: 'cfg', label: 'webpack.config.js', sub: 'entry: ./src/index.js', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
                  { id: 'entry', label: './src/index.js', sub: '入口模块', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
                ],
                edges: [{ from: 'cfg', to: 'entry' }],
                codeSnippet: `// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: { path: path.resolve('dist'), filename: '[name].[contenthash].js' }
}`,
                codeLanguage: 'js',
                durationMs: 50,
              },
              {
                id: 'resolve',
                name: 'Resolve 路径解析',
                description:
                  'enhanced-resolve 解析 import / require 路径： extensions 补全后缀、alias 别名替换、mainFields 字段选择、modules 搜索目录。',
                nodes: [
                  { id: 'entry', label: 'index.js', sub: 'import "./utils"', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
                  { id: 'resolver', label: 'enhanced-resolve', sub: '路径解析器', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
                  { id: 'resolved', label: 'utils.js', sub: '解析结果', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
                ],
                edges: [
                  { from: 'entry', to: 'resolver' },
                  { from: 'resolver', to: 'resolved' },
                ],
                codeSnippet: `resolve: {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  alias: { '@': path.resolve('src') },
  mainFields: ['browser', 'module', 'main']
}`,
                codeLanguage: 'js',
                durationMs: 300,
              },
              {
                id: 'loader',
                name: 'Loader 链转换',
                description:
                  '按文件类型匹配 rules，loader 链从右向左执行：babel-loader 转 JS、css-loader 处理 @import、style-loader 注入 style 标签。',
                nodes: [
                  { id: 'file', label: 'App.tsx', sub: '源文件', color: '#ef4444', bg: 'rgba(239,68,68,0.10)' },
                  { id: 'babel', label: 'babel-loader', sub: 'TSX → JS', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
                  { id: 'ast', label: 'AST 转换', sub: 'JSX → createElement', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
                  { id: 'out', label: 'module', sub: 'Webpack 模块', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
                ],
                edges: [
                  { from: 'file', to: 'babel' },
                  { from: 'babel', to: 'ast' },
                  { from: 'ast', to: 'out' },
                ],
                codeSnippet: `module: {
  rules: [
    { test: /\\.tsx?$/, use: 'babel-loader' },
    { test: /\\.css$/, use: ['style-loader', 'css-loader'] },
    { test: /\\.(png|svg)$/, type: 'asset/resource' }
  ]
}`,
                codeLanguage: 'js',
                durationMs: 2000,
              },
              {
                id: 'plugin',
                name: 'Plugin 钩子',
                description:
                  'Plugin 通过 Tapable 事件系统贯穿整个构建生命周期：HtmlWebpackPlugin 生成 HTML、DefinePlugin 注入环境变量、MiniCssExtractPlugin 抽离 CSS。',
                nodes: [
                  { id: 'hook', label: 'Tapable 钩子', sub: 'compiler.emit', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)' },
                  { id: 'html', label: 'HtmlWebpackPlugin', sub: '生成 HTML', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
                  { id: 'css', label: 'MiniCssExtract', sub: '抽离 CSS', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
                  { id: 'define', label: 'DefinePlugin', sub: '注入 env', color: '#ef4444', bg: 'rgba(239,68,68,0.10)' },
                ],
                edges: [
                  { from: 'hook', to: 'html' },
                  { from: 'hook', to: 'css' },
                  { from: 'hook', to: 'define' },
                ],
                codeSnippet: `plugins: [
  new HtmlWebpackPlugin({ template: './index.html' }),
  new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  new DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
]`,
                codeLanguage: 'js',
                durationMs: 800,
              },
              {
                id: 'output',
                name: 'Output 输出',
                description:
                  '将编译后的模块组装成 chunk，写入 output.path 目录。文件名通过 [contenthash] 启用长期缓存，通过 splitChunks 拆分vendor。',
                nodes: [
                  { id: 'chunks', label: 'chunks', sub: 'main + vendor', color: '#07c160', bg: 'rgba(7,193,96,0.10)' },
                  { id: 'hash', label: '[contenthash]', sub: '内容哈希', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
                  { id: 'dist', label: 'dist/', sub: '产物目录', color: '#ef4444', bg: 'rgba(239,68,68,0.10)' },
                ],
                edges: [
                  { from: 'chunks', to: 'hash' },
                  { from: 'hash', to: 'dist' },
                ],
                codeSnippet: `output: {
  path: path.resolve('dist'),
  filename: '[name].[contenthash:8].js',
  clean: true
},
optimization: {
  splitChunks: { chunks: 'all', cacheGroups: { vendor: { test: /node_modules/ } } }
}`,
                codeLanguage: 'js',
                durationMs: 500,
              },
            ],
          },
        },
        {
          id: 'eng-p2-3',
          type: 'callout',
          variant: 'tip',
          title: '核心心智模型',
          text: 'Webpack = 依赖图（Graph）+ Loader（转换）+ Plugin（扩展）。理解依赖图的构建时机（Entry → Resolve → Loader）与 Plugin 钩子的触发时机是关键。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：Vite ESM 加载流程
    // ========================================================================
    {
      order: 3,
      title: 'Vite ESM 加载流程：浏览器原生 ESM + 按需编译',
      difficulty: 3,
      isNew: true,
      visualizationType: 'vite-esm-loading-flow',
      blocks: [
        {
          id: 'eng-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'Vite 在开发模式下利用浏览器原生 ESM，请求一个模块才编译一个模块（按需编译），启动时间恒定 O(1)。生产构建用 Rollup 输出优化后的 bundle。这与 Webpack 的全量打包（O(n) 启动）形成鲜明对比。',
        },
        {
          id: 'eng-p3-2',
          type: 'demo',
          visualizationType: 'vite-esm-loading-flow',
          data: {},
        },
        {
          id: 'eng-p3-3',
          type: 'callout',
          variant: 'note',
          title: '为什么 Vite 快',
          text: '1) 浏览器原生 ESM，无需打包；2) esbuild（Go）做 TS/JSX 转换，比 babel（JS）快 10-100 倍；3) 依赖预构建（prebundle）一次性打包 node_modules；4) HMR 精确到模块边界，不重新打包整个 bundle。',
        },
      ],
    },

    // ========================================================================
    // 知识点 4：Webpack vs Vite 对比
    // ========================================================================
    {
      order: 4,
      title: 'Webpack vs Vite 构建工具对比',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'eng-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Webpack 与 Vite 代表两种构建思路：Webpack 是「打包式」（先打包再运行），Vite 是「原生 ESM 式」（浏览器直接运行源码）。两者在开发启动、HMR、生产构建、生态上有显著差异。',
        },
        {
          id: 'eng-p4-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '维度',
            columns: ['Webpack', 'Vite'],
            rows: [
              { feature: '开发启动', values: ['O(n) 全量打包，项目越大越慢', 'O(1) 按需编译，启动恒定'] },
              { feature: 'HMR 速度', values: ['重新打包受影响 chunk', '精确到模块，毫秒级'] },
              { feature: '底层语言', values: ['JavaScript', 'esbuild(Go) + Rollup(JS)'] },
              { feature: '生产构建', values: ['Webpack 自身打包', 'Rollup 打包'] },
              { feature: '生态成熟度', values: ['极成熟，Loader/Plugin 海量', '快速成长'] },
              { feature: '配置复杂度', values: ['高（entry/output/rules/plugins）', '低（开箱即用）'] },
              { feature: 'CJS 支持', values: ['原生支持', '需预构建转换'] },
              { feature: '适用场景', values: ['大型老项目、CJS 重度依赖', '新项目、ESM 优先'] },
            ],
          },
        },
        {
          id: 'eng-p4-3',
          type: 'callout',
          variant: 'tip',
          title: '选型建议',
          text: '新项目首选 Vite；老项目可逐步迁移或用 Rspack（Rust 版 Webpack）保留配置兼容性获得 10 倍速度。',
        },
      ],
    },

    // ========================================================================
    // 章节 2 · 包管理器
    // 知识点 5：pnpm 硬链接机制
    // ========================================================================
    {
      order: 5,
      title: 'pnpm 硬链接机制：全局 store + 硬链接 + 符号链接',
      difficulty: 4,
      isNew: true,
      visualizationType: 'pnpm-hardlink-visualizer',
      blocks: [
        {
          id: 'eng-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'pnpm 通过三层结构颠覆了 npm/yarn 的扁平 node_modules：1) 全局 store（~/.pnpm-store）按内容寻址存储所有包版本；2) 项目 node_modules/.pnpm 用硬链接指向 store；3) 顶层 node_modules 用符号链接指向 .pnpm，形成非扁平结构，根治幽灵依赖。',
        },
        {
          id: 'eng-p5-2',
          type: 'demo',
          visualizationType: 'pnpm-hardlink-visualizer',
          data: {},
        },
        {
          id: 'eng-p5-3',
          type: 'callout',
          variant: 'tip',
          title: '硬链接 vs 符号链接 vs 复制',
          text: '硬链接：同一文件系统的多个 inode 指向同一数据块，0 字节额外占用；符号链接：路径指针，跨文件系统；复制：完整复制一份，占用双倍空间。pnpm 用硬链接省空间，用符号链接组织依赖拓扑。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：包管理器对比
    // ========================================================================
    {
      order: 6,
      title: 'npm / yarn / pnpm 包管理器对比',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'eng-p6-1',
          type: 'paragraph',
          lead: true,
          text: '三大包管理器在 node_modules 结构、磁盘占用、安装速度、Monorepo 支持、幽灵依赖处理上有显著差异。pnpm 是 2025 年的首选方案。',
        },
        {
          id: 'eng-p6-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '维度',
            columns: ['npm', 'yarn (classic)', 'pnpm'],
            rows: [
              { feature: 'node_modules 结构', values: ['扁平', '扁平', '非扁平（符号链接）'] },
              { feature: '磁盘占用', values: ['每个项目复制一份', '每个项目复制一份', '全局 store + 硬链接'] },
              { feature: '安装速度', values: ['中等', '快（并行 + 缓存）', '最快（硬链接 + 并行）'] },
              { feature: '幽灵依赖', values: ['存在', '存在', '不存在'] },
              { feature: 'Monorepo', values: ['workspaces（v7+）', 'workspaces', 'workspace（原生）'] },
              { feature: 'lockfile', values: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'] },
              { feature: 'peer deps', values: ['扁平安装', '扁平安装', '正确隔离'] },
              { feature: '2025 推荐', values: ['兼容性首选', '不推荐新项目', '⭐ 首选'] },
            ],
          },
        },
        {
          id: 'eng-p6-3',
          type: 'callout',
          variant: 'warning',
          title: '幽灵依赖（Phantom Dependency）',
          text: '扁平 node_modules 让项目能 import 未在 package.json 声明但被其他包间接安装的依赖。一旦上游包移除该依赖，项目就会构建失败。pnpm 非扁平结构从根本上杜绝此问题。',
        },
      ],
    },

    // ========================================================================
    // 章节 3 · 代码规范（理论）
    // 知识点 7：ESLint + Prettier + EditorConfig
    // ========================================================================
    {
      order: 7,
      title: '代码规范：ESLint + Prettier + EditorConfig',
      difficulty: 2,
      blocks: [
        {
          id: 'eng-p7-1',
          type: 'paragraph',
          lead: true,
          text: '代码规范是团队协作的基石。ESLint 负责语法规则与潜在 Bug 检测，Prettier 负责代码格式化，EditorConfig 负责统一编辑器配置（缩进/换行/编码）。三者各司其职，通过 eslint-config-prettier 解析冲突。',
        },
        {
          id: 'eng-p7-2',
          type: 'code',
          language: 'json',
          filename: '.eslintrc.json',
          code: `{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier"  // 必须放最后，关闭与 Prettier 冲突的规则
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}`,
        },
        {
          id: 'eng-p7-3',
          type: 'code',
          language: 'json',
          filename: '.prettierrc',
          code: `{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "arrowParens": "always"
}`,
        },
        {
          id: 'eng-p7-4',
          type: 'code',
          language: 'ini',
          filename: '.editorconfig',
          code: `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false`,
        },
        {
          id: 'eng-p7-5',
          type: 'list',
          items: [
            'ESLint：发现代码问题（未使用变量、 hooks 规则、类型错误）',
            'Prettier：统一格式化（分号、引号、缩进、换行）',
            'EditorConfig：跨编辑器统一基础配置',
            'Husky + lint-staged：commit 前自动 lint + format',
            'commitlint：校验 commit message 是否符合约定式提交',
          ],
        },
      ],
    },

    // ========================================================================
    // 章节 4 · Git 工作流
    // 知识点 8：约定式提交解析器
    // ========================================================================
    {
      order: 8,
      title: '约定式提交（Conventional Commits）解析',
      difficulty: 3,
      isNew: true,
      visualizationType: 'commit-message-parser',
      blocks: [
        {
          id: 'eng-p8-1',
          type: 'paragraph',
          lead: true,
          text: '约定式提交通过结构化的 commit message 规范（type(scope)!?: subject + body + footer）让提交历史可读、可自动生成 CHANGELOG、可自动推断语义化版本号。配合 commitlint + husky 可强制校验。',
        },
        {
          id: 'eng-p8-2',
          type: 'demo',
          visualizationType: 'commit-message-parser',
          data: {
            types: [
              { type: 'feat', label: '新功能', color: '#07c160' },
              { type: 'fix', label: 'Bug 修复', color: '#1a6cff' },
              { type: 'docs', label: '文档变更', color: '#7d8590' },
              { type: 'style', label: '代码格式', color: '#a78bfa' },
              { type: 'refactor', label: '重构', color: '#f59e0b' },
              { type: 'perf', label: '性能优化', color: '#ef4444' },
              { type: 'test', label: '测试', color: '#0ea5e9' },
              { type: 'build', label: '构建系统', color: '#e34c26' },
              { type: 'ci', label: 'CI 配置', color: '#5a29e4' },
              { type: 'chore', label: '杂项', color: '#6b7280' },
              { type: 'revert', label: '回滚', color: '#dc2626' },
            ],
            examples: [
              {
                id: 'feat',
                label: '新功能',
                message: `feat(auth): 新增 OAuth2 第三方登录

- 支持 GitHub / Google 登录
- 自动绑定已有账号

Closes #123`,
                explanation: 'feat 类型 + auth 范围 + 简明描述，body 列出实现要点，footer 关联 issue',
              },
              {
                id: 'breaking',
                label: '破坏性变更',
                message: `feat(api)!: 重构用户接口返回结构

BREAKING CHANGE: 用户接口返回从 { code, data, msg } 改为 { success, data, error }
所有调用方需同步更新`,
                explanation: 'type 后 ! 标记破坏性变更，BREAKING CHANGE footer 说明具体影响',
              },
            ],
            parts: [
              { id: 'type', label: 'type', color: '#07c160', bg: 'rgba(7,193,96,0.10)', description: '提交类型：feat/fix/docs/style/refactor/perf/test/build/ci/chore/revert' },
              { id: 'scope', label: 'scope', color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', description: '影响范围（可选）：模块/组件/功能名' },
              { id: 'breaking', label: '!', color: '#ef4444', bg: 'rgba(239,68,68,0.10)', description: '破坏性标记（可选）：! 表示 BREAKING CHANGE，影响 major' },
              { id: 'subject', label: 'subject', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', description: '简短描述：祈使句、现在时、首字母小写、≤50 字' },
              { id: 'body', label: 'body', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', description: '详细说明（可选）：解释 what / why / how，每行 ≤72 字' },
              { id: 'footer', label: 'footer', color: '#7d8590', bg: 'rgba(125,133,144,0.10)', description: '脚注（可选）：BREAKING CHANGE: / Closes # / Reviewed-by:' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 9：Git 工作流时间线
    // ========================================================================
    {
      order: 9,
      title: 'Git 工作流时间线：Git Flow / GitHub Flow / Trunk-based',
      difficulty: 2,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'eng-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'Git 工作流是团队协作的分支策略。Git Flow 适合发布周期长的产品（多分支），GitHub Flow 适合持续部署（main + feature），Trunk-based 适合高频部署的精英团队（主干 + 短期 feature）。选择取决于团队规模与发布节奏。',
        },
        {
          id: 'eng-p9-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            items: [
              {
                time: '2010',
                title: 'Git Flow',
                description: 'Vincent Driessen 提出，包含 main / develop / feature / release / hotfix 5 类分支，适合版本发布产品。',
              },
              {
                time: '2011',
                title: 'GitHub Flow',
                description: 'GitHub 提出，main + feature 两类分支，PR 合并即部署，适合 Web 产品持续部署。',
              },
              {
                time: '2013',
                title: 'Trunk-based Development',
                description: '所有人向 main 提交，feature 分支存活不超过 24 小时，配合 feature flag，适合精英团队高频部署。',
              },
              {
                time: '2018',
                title: 'Conventional Commits 1.0',
                description: '约定式提交规范发布，结构化 commit message 自动生成 CHANGELOG 与语义化版本号。',
              },
              {
                time: '2022',
                title: 'Monorepo + Turborepo',
                description: 'pnpm workspace + Turborepo 让多包仓库统一分支策略，原子提交跨包变更，CI 增量构建。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 章节 5 · 现代工程化工具
    // 知识点 10：Monorepo 结构
    // ========================================================================
    {
      order: 10,
      title: 'Monorepo 结构：pnpm workspace 多包仓库',
      difficulty: 3,
      isNew: true,
      visualizationType: 'monorepo-tree-visualizer',
      blocks: [
        {
          id: 'eng-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'Monorepo 将多个相关包放在同一仓库，通过 pnpm workspace + workspace:* 协议符号链接本地包，无需发布即可互相引用。优点：原子提交、统一版本、依赖复用、增量构建。',
        },
        {
          id: 'eng-p10-2',
          type: 'demo',
          visualizationType: 'monorepo-tree-visualizer',
          data: {
            root: {
              path: 'monorepo/',
              label: 'monorepo/',
              type: 'root',
              description: 'pnpm workspace 根目录',
              children: [
                {
                  path: 'monorepo/pnpm-workspace.yaml',
                  label: 'pnpm-workspace.yaml',
                  type: 'config',
                  description: 'workspace 配置，指定 packages/* 与 apps/* 为工作区',
                  codeSnippet: `packages:
  - 'apps/*'
  - 'packages/*'
  - 'tools/*'`,
                  codeLanguage: 'yaml',
                },
                {
                  path: 'monorepo/apps/',
                  label: 'apps/',
                  type: 'workspace',
                  description: '应用层工作区',
                  children: [
                    {
                      path: 'monorepo/apps/web/',
                      label: 'web/',
                      type: 'package',
                      description: '面向 C 端用户的 Web 应用',
                      dependencies: ['@repo/ui', '@repo/api', '@repo/utils', 'react'],
                      codeSnippet: `{
  "name": "@repo/web",
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/api": "workspace:*"
  }
}`,
                      codeLanguage: 'json',
                    },
                    {
                      path: 'monorepo/apps/admin/',
                      label: 'admin/',
                      type: 'package',
                      description: '后台管理系统',
                      dependencies: ['@repo/ui', '@repo/api'],
                    },
                  ],
                },
                {
                  path: 'monorepo/packages/',
                  label: 'packages/',
                  type: 'workspace',
                  description: '共享包工作区',
                  children: [
                    {
                      path: 'monorepo/packages/ui/',
                      label: 'ui/',
                      type: 'package',
                      description: 'UI 组件库，被所有 apps 复用',
                      dependencies: ['react', 'clsx', 'tailwindcss'],
                    },
                    {
                      path: 'monorepo/packages/api/',
                      label: 'api/',
                      type: 'package',
                      description: 'API 客户端 SDK',
                      dependencies: ['axios', '@repo/utils'],
                    },
                    {
                      path: 'monorepo/packages/utils/',
                      label: 'utils/',
                      type: 'package',
                      description: '通用工具函数',
                      dependencies: ['lodash'],
                    },
                  ],
                },
                {
                  path: 'monorepo/turbo.json',
                  label: 'turbo.json',
                  type: 'config',
                  description: 'Turborepo 任务编排配置',
                  codeSnippet: `{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "lint": {},
    "test": { "dependsOn": ["build"] }
  }
}`,
                  codeLanguage: 'json',
                },
              ],
            },
            workspaceConfig: `packages:
  - 'apps/*'
  - 'packages/*'
  - 'tools/*'`,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 11：Turborepo 任务编排
    // ========================================================================
    {
      order: 11,
      title: 'Turborepo 任务编排：依赖图 + 增量构建 + 远程缓存',
      difficulty: 4,
      isNew: true,
      visualizationType: 'turborepo-task-flow',
      blocks: [
        {
          id: 'eng-p11-1',
          type: 'paragraph',
          lead: true,
          text: 'Turborepo 是 Monorepo 的任务编排器，三大核心能力：1) 依赖图驱动，按 ^build 拓扑排序；2) 任务并行，同批次无冲突任务并行执行；3) 增量构建 + 远程缓存，未变更任务直接命中缓存。可让 CI 时间从 10 分钟降到 1 分钟。',
        },
        {
          id: 'eng-p11-2',
          type: 'demo',
          visualizationType: 'turborepo-task-flow',
          data: {
            turboConfig: `{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": { "cache": false, "persistent": true },
    "lint": {},
    "test": { "dependsOn": ["^build"], "outputs": ["coverage/**"] }
  }
}`,
            remoteCacheNote:
              '远程缓存（Vercel Remote Cache）将 turbo 命中本地缓存的产物同步到云端，团队成员与 CI 共享缓存，可将 CI 时间再降 50%+。',
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 12：CI/CD 流水线
    // ========================================================================
    {
      order: 12,
      title: 'CI/CD 流水线：GitHub Actions 端到端流程',
      difficulty: 4,
      isNew: true,
      visualizationType: 'cicd-pipeline-visualizer',
      blocks: [
        {
          id: 'eng-p12-1',
          type: 'paragraph',
          lead: true,
          text: 'CI/CD 是工程化的最后一公里。GitHub Actions 通过 YAML 定义工作流：Trigger → Checkout → Install → Lint → Test → Build → Deploy。每一步失败即中断，保证主分支质量。生产部署通常拆为 ci / deploy 两个 job，deploy 用 needs: ci 串行且仅 main 分支触发。',
        },
        {
          id: 'eng-p12-2',
          type: 'demo',
          visualizationType: 'cicd-pipeline-visualizer',
          data: {
            triggerInfo:
              '触发方式：push 到 main 分支 / Pull Request 合并到 main / 手动 workflow_dispatch / 定时 schedule cron',
            fullWorkflowYaml: `name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with: { name: dist, path: dist/ }

  deploy:
    needs: ci
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist, path: dist }
      - run: npx vercel deploy --prod --token \${{ secrets.VERCEL_TOKEN }}`,
          },
        },
      ],
    },

    // ========================================================================
    // 章节 6 · 现代构建工具
    // 知识点 13：构建工具选型器（跨模块复用模块十四 CrossPlatformSelector）
    // ========================================================================
    {
      order: 13,
      title: '构建工具选型器：Webpack / Vite / Rspack / Turbopack',
      difficulty: 3,
      visualizationType: 'cross-platform-selector',
      blocks: [
        {
          id: 'eng-p13-1',
          type: 'paragraph',
          lead: true,
          text: '2025 年构建工具呈现多元化：Webpack（生态成熟）、Vite（ESM 开发体验）、Rspack（Rust 版 Webpack，兼容配置）、Turbopack（Rust，Next.js 内置）、Bun（Zig 全栈）。按项目场景加权评分动态排序，找到最优解。',
        },
        {
          id: 'eng-p13-2',
          type: 'demo',
          visualizationType: 'cross-platform-selector',
          data: {
            title: '构建工具选型器',
            dimensions: [
              { id: 'startup', label: '开发启动速度', defaultWeight: 3 },
              { id: 'ecosystem', label: '生态成熟度', defaultWeight: 2 },
              { id: 'config', label: '配置复杂度', defaultWeight: 1 },
              { id: 'prod', label: '生产构建优化', defaultWeight: 2 },
              { id: 'rust', label: 'Rust/Zig 加持', defaultWeight: 1 },
            ],
            solutions: [
              {
                id: 'webpack',
                name: 'Webpack',
                language: 'JavaScript',
                color: '#1a6cff',
                scores: { startup: 2, ecosystem: 5, config: 2, prod: 4, rust: 1 },
                pros: ['生态成熟', 'Loader/Plugin 海量', '配置灵活'],
                cons: ['启动慢', '配置复杂', '生产构建慢'],
              },
              {
                id: 'vite',
                name: 'Vite',
                language: 'JS + esbuild(Go) + Rollup',
                color: '#07c160',
                scores: { startup: 5, ecosystem: 4, config: 5, prod: 4, rust: 3 },
                pros: ['启动快（O(1)）', 'HMR 毫秒级', '配置简单'],
                cons: ['生产构建依赖 Rollup', 'CJS 支持需预构建'],
              },
              {
                id: 'rspack',
                name: 'Rspack',
                language: 'Rust',
                color: '#ef4444',
                scores: { startup: 5, ecosystem: 4, config: 4, prod: 5, rust: 5 },
                pros: ['Rust 编译', '兼容 Webpack 配置', '构建快 10 倍'],
                cons: ['生态建设中', '部分 Loader 不兼容'],
              },
              {
                id: 'turbopack',
                name: 'Turbopack',
                language: 'Rust',
                color: '#a78bfa',
                scores: { startup: 5, ecosystem: 2, config: 4, prod: 3, rust: 5 },
                pros: ['Rust 编写', 'Next.js 内置', '增量编译快'],
                cons: ['仅 Next.js 生态', '仍 beta', '独立使用受限'],
              },
              {
                id: 'bun',
                name: 'Bun',
                language: 'Zig',
                color: '#f59e0b',
                scores: { startup: 5, ecosystem: 2, config: 4, prod: 3, rust: 4 },
                pros: ['Zig 全栈', '安装极快', '内置 runtime'],
                cons: ['生态早期', 'Windows 支持改进中', '兼容性待验证'],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 14：构建工具性能对比
    // ========================================================================
    {
      order: 14,
      title: '构建工具性能对比：Rust/Zig 工具链革命',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'eng-p14-1',
          type: 'paragraph',
          lead: true,
          text: '2025 年构建工具迎来 Rust/Zig 革命：esbuild(Go) 比 babel(JS) 快 10-100 倍，Rspack(Rust) 比 Webpack(JS) 快 10 倍，SWC(Rust) 比 babel 快 20 倍，Bun(Zig) 比 node 快 4 倍。底层语言决定了性能上限。',
        },
        {
          id: 'eng-p14-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '工具',
            columns: ['底层语言', '启动速度', '构建速度', 'vs Webpack'],
            rows: [
              { feature: 'Webpack', values: ['JavaScript', '1x（基准）', '1x（基准）', '—'] },
              { feature: 'esbuild', values: ['Go', '100x', '10-100x', '快 10-100 倍'] },
              { feature: 'SWC', values: ['Rust', '20x', '20x', '快 20 倍（编译）'] },
              { feature: 'Rspack', values: ['Rust', '10x', '10x', '快 10 倍，兼容配置'] },
              { feature: 'Turbopack', values: ['Rust', '10x', '5-10x', '快 5-10 倍（增量）'] },
              { feature: 'Vite', values: ['esbuild + Rollup', 'O(1) 恒定', '3-5x', '快 3-5 倍（生产）'] },
              { feature: 'Bun', values: ['Zig', '4x', '4x', '快 4 倍（全栈）'] },
            ],
          },
        },
        {
          id: 'eng-p14-3',
          type: 'callout',
          variant: 'note',
          title: '为什么 Rust/Zig 快',
          text: '1) 编译型语言无 GC 暂停；2) 零成本抽象，内存布局紧凑；3) 多线程友好，无 GIL；4) 接近 C 的性能。前端工具用 Rust/Zig 重写已成为不可逆趋势。',
        },
      ],
    },

    // ========================================================================
    // 章节 7 · 速查
    // 知识点 15：工程化速查 + 小测验（合并）
    // ========================================================================
    {
      order: 15,
      title: '工程化速查 + 小测验',
      difficulty: 1,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'eng-p15-1',
          type: 'paragraph',
          lead: true,
          text: '最后用速查表浓缩模块十五的核心知识，并通过小测验检验掌握程度。',
        },
        {
          id: 'eng-p15-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: 'Webpack 5 步流程',
                content:
                  'Entry（入口）→ Resolve（路径解析）→ Loader 链（按文件类型转换）→ Plugin 钩子（Tapable 事件贯穿全流程）→ Output（输出 bundle）。核心：依赖图 + Loader 转换 + Plugin 扩展。',
              },
              {
                title: 'Vite 为何快',
                content:
                  '1) 浏览器原生 ESM，无需打包；2) esbuild(Go) 做 TS/JSX 转换，比 babel 快 10-100 倍；3) 依赖预构建（prebundle）；4) HMR 精确到模块边界。生产用 Rollup。',
              },
              {
                title: 'pnpm 三层结构',
                content:
                  '1) 全局 store（~/.pnpm-store）按内容寻址存储所有版本；2) 项目 node_modules/.pnpm 用硬链接指向 store（0 字节额外占用）；3) 顶层 node_modules 用符号链接指向 .pnpm，非扁平结构根治幽灵依赖。',
              },
              {
                title: '约定式提交格式',
                content:
                  'type(scope)!?: subject\\n\\nbody\\n\\nfooter。type 决定版本号：feat → MINOR，fix → PATCH，! / BREAKING CHANGE → MAJOR。',
              },
              {
                title: 'Monorepo 三大优势',
                content:
                  '1) 原子提交：多包变更一次提交保证一致性；2) 统一版本：changesets 管理所有包版本；3) 依赖复用：workspace:* 符号链接本地包。配合 Turborepo 实现增量构建。',
              },
              {
                title: 'Turborepo 三大能力',
                content:
                  '1) 依赖图驱动：dependsOn: [^build] 拓扑排序；2) 任务并行：同批次无冲突任务并行执行；3) 增量构建 + 远程缓存：未变更任务命中缓存，Vercel Remote Cache 团队/CI 共享。',
              },
              {
                title: 'CI/CD 7 阶段',
                content:
                  'Trigger → Checkout → Install（pnpm install --frozen-lockfile）→ Lint（ESLint）→ Test（Vitest）→ Build（Vite build）→ Deploy（Vercel）。每步失败即中断，deploy 仅 main 分支触发。',
              },
              {
                title: 'Rust 工具链革命',
                content:
                  'esbuild(Go) 比 babel 快 10-100 倍，SWC(Rust) 比 babel 快 20 倍，Rspack(Rust) 比 Webpack 快 10 倍，Bun(Zig) 比 node 快 4 倍。编译型语言无 GC + 零成本抽象 + 多线程友好。',
              },
            ],
          },
        },
        {
          id: 'eng-p15-3',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'Webpack 构建流程的正确顺序是？',
                options: [
                  'Entry → Loader → Resolve → Plugin → Output',
                  'Entry → Resolve → Loader → Plugin → Output',
                  'Resolve → Entry → Loader → Plugin → Output',
                  'Entry → Plugin → Resolve → Loader → Output',
                ],
                correctIndex: 1,
                explanation: 'Entry 入口 → Resolve 路径解析 → Loader 链转换 → Plugin 钩子扩展 → Output 输出。',
              },
              {
                question: 'Vite 开发模式下启动时间复杂度是？',
                options: ['O(n) 全量打包', 'O(n log n)', 'O(1) 按需编译', 'O(n²)'],
                correctIndex: 2,
                explanation: 'Vite 利用浏览器原生 ESM，请求一个模块才编译一个，启动恒定 O(1)。',
              },
              {
                question: 'pnpm 节省磁盘空间的核心机制是？',
                options: ['压缩包', '硬链接到全局 store', '云缓存', '增量下载'],
                correctIndex: 1,
                explanation: 'pnpm 全局 store 按内容寻址，项目通过硬链接指向 store，0 字节额外占用。',
              },
              {
                question: '约定式提交 feat(api)!: refactor  会触发哪个版本号变更？',
                options: ['PATCH（0.0.X）', 'MINOR（0.X.0）', 'MAJOR（X.0.0）', '不触发版本变更'],
                correctIndex: 2,
                explanation: '! 标记破坏性变更，触发 MAJOR 版本号变更。',
              },
              {
                question: 'Turborepo 的三大核心能力是？',
                options: [
                  '依赖图驱动 + 任务并行 + 远程缓存',
                  '热更新 + 代码分割 + 树摇',
                  '类型检查 + Lint + 测试',
                  '打包 + 压缩 + 部署',
                ],
                correctIndex: 0,
                explanation: 'Turborepo = 依赖图拓扑排序 + 同批次并行 + 增量构建（本地+远程缓存）。',
              },
              {
                question: '以下哪个工具是 Rust 编写、兼容 Webpack 配置的？',
                options: ['esbuild', 'Vite', 'Rspack', 'Bun'],
                correctIndex: 2,
                explanation: 'Rspack 是 Rust 版 Webpack，兼容大部分 Webpack 配置，构建速度提升 10 倍。',
              },
            ],
          },
        },
      ],
    },
  ],
}
