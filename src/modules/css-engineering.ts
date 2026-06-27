/**
 * 模块 06：CSS 工程化与样式方案
 *
 * 严格遵循 docx/PROJECT_CONTENT.md 与 docx/模块六.md 设计文档：
 * - 21 个知识点（16 章节 + 2 综合实战 + 面试题 + 速查表 + 小测验）
 * - 12 个可视化演示
 *
 * 适配到项目现有 React+TS+Vite 架构，使用 ModuleMeta 数据驱动：
 * - KP1 样式方案发展历程（Timeline 发展历程）
 * - KP2 Sass 预处理器（Sandbox 编译演示，含 KP3 变量嵌套）
 * - KP5 Tailwind CSS 核心用法（Sandbox 实时预览）
 * - KP6 Tailwind 自定义主题配置（CodeStepper 配置步骤）
 * - KP7 响应式断点体系（CompareTable 断点对比）
 * - KP9 CSS-in-JS（CompareTable 方案对比）
 * - KP12 CSS 架构（ArchitectureDiagram BEM/ITCSS/SMACSS）
 * - KP13 CSS 变量与主题系统（Sandbox 主题切换）
 * - KP15 @layer 层叠层（CodeStepper 层级顺序）
 * - KP17 CSS 工程化测验（QuizCard）
 *
 * 覆盖 Sass/Less、Tailwind、Bootstrap、CSS Modules、CSS-in-JS、
 * PostCSS、CSS 架构、容器查询、@layer 等核心 CSS 工程化知识。
 */
import type { ModuleMeta } from '../lib/types'

export const cssEngineeringModule: ModuleMeta = {
  number: '06',
  title: 'CSS 工程化与样式方案',
  slug: 'css-engineering',
  stage: 'prerequisites',
  stageLabel: '通用前置 · 第 1 模块',
  icon: '06',
  summary: 'Sass/Less、Tailwind、CSS Modules、CSS-in-JS、PostCSS、CSS 架构。',
  knowledgePointCount: 21,
  visualizationCount: 12,
  points: [
    // ========================================================================
    // 知识点 1：样式方案发展历程
    // ========================================================================
    {
      order: 1,
      title: '样式方案发展历程',
      difficulty: 1,
      isNew: true,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS 样式方案从原始的行内样式、外部样式表，发展到预处理器（Sass/Less）、原子化框架（Tailwind）、CSS-in-JS、CSS Modules，再到现代的容器查询与 @layer。理解演进脉络有助于选型决策。',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'horizontal',
            items: [
              { time: '阶段1', title: '原生 CSS', description: '行内样式、内部样式表、外部样式表。简单易用，但缺乏变量、嵌套、复用机制，大型项目难以维护。', status: 'done' },
              { time: '阶段2', title: '预处理器', description: 'Sass/Less 引入变量、嵌套、Mixin、继承。提升复用性，但需编译，运行时无变量。', status: 'done' },
              { time: '阶段3', title: '命名规范', description: 'BEM/ITCSS/SMACSS 方法论。解决命名冲突与样式复用，但依赖人工遵守。', status: 'done' },
              { time: '阶段4', title: 'CSS Modules', description: '自动生成唯一类名，彻底解决命名冲突。编译时局部作用域，但跨组件复用较弱。', status: 'done' },
              { time: '阶段5', title: 'CSS-in-JS', description: 'styled-components/emotion 将样式写入 JS，支持动态主题。运行时开销，SSR 复杂。', status: 'active' },
              { time: '阶段6', title: '原子化 CSS', description: 'Tailwind/Windi 实用优先，约束设计系统，体积小。学习曲线，类名冗长。', status: 'active' },
              { time: '阶段7', title: '现代 CSS', description: '容器查询 @container、@layer 层叠层、CSS 变量、:has() 选择器。原生能力增强，减少对工具依赖。', status: 'pending' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'callout',
          variant: 'tip',
          title: '没有银弹',
          text: '各方案各有优劣：原生 CSS 适合小型项目，Tailwind 适合快速开发，CSS Modules 适合组件化项目，CSS-in-JS 适合高度动态主题。选型需考虑团队、项目规模、性能要求。',
        },
      ],
    },

    // ========================================================================
    // 知识点 2：Sass/Less 预处理器
    // ========================================================================
    {
      order: 2,
      title: 'Sass/Less 预处理器',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'Sass（SCSS）是最流行的 CSS 预处理器，提供变量、嵌套、Mixin、继承、函数等能力，编译为原生 CSS。Less 语法类似但使用 JS 实现。',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Sass 编译演示：变量、嵌套、Mixin 的实际效果',
            initialCode: `<!-- 编译后的 CSS 效果演示（Sass 源码见代码块） -->
<style>
  /* 等价 Sass:
   * $primary: #3b82f6;
   * .btn {
   *   background: $primary;
   *   &:hover { background: darken($primary, 10%); }
   * }
   */
  .btn {
    padding: 8px 16px;
    border-radius: 6px;
    background: #3b82f6;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn:hover { background: #2563eb; }
  .btn-secondary {
    background: #6b7280;
  }
  .btn-secondary:hover { background: #4b5563; }
</style>

<button class="btn">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>`,
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'scss',
          filename: 'Sass 语法',
          code: `// === Sass 变量 ===
$primary-color: #3b82f6;
$spacing-unit: 8px;
$breakpoint-md: 768px;

// === 嵌套 ===
.navbar {
  display: flex;
  padding: $spacing-unit * 2;

  // & 引用父选择器
  &__item {
    margin-left: $spacing-unit;
    color: white;

    &:hover { color: $primary-color; }
    &--active { font-weight: bold; }
  }
}

// === Mixin（复用样式块）===
@mixin button-variant($bg) {
  background: $bg;
  &:hover { background: darken($bg, 10%); }
  &:active { background: darken($bg, 20%); }
}

.btn-primary { @include button-variant($primary-color); }
.btn-danger { @include button-variant(#ef4444); }

// === 继承（@extend）===
%card-base {
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.info-card { @extend %card-base; background: white; }
.error-card { @extend %card-base; background: #fef2f2; }

// === 函数与循环 ===
@for $i from 1 through 12 {
  .col-#{$i} { width: percentage($i / 12); }
}

// === 条件与循环 ===
@mixin respond-to($breakpoint) {
  @if $breakpoint == md { @media (min-width: 768px) { @content; } }
  @else if $breakpoint == lg { @media (min-width: 1024px) { @content; } }
}

.container {
  width: 100%;
  @include respond-to(md) { max-width: 720px; }
  @include respond-to(lg) { max-width: 960px; }
}`,
        },
        {
          id: 'p2-4',
          type: 'callout',
          variant: 'warning',
          title: '@extend 的陷阱',
          text: '@extend 会生成分组选择器（.a, .b），可能导致选择器爆炸。复杂场景用 Mixin 替代，虽然输出略多但更可控。Dart Sass 已不推荐 @extend。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：Sass 变量与嵌套
    // ========================================================================
    {
      order: 3,
      title: 'Sass 变量与嵌套',
      difficulty: 2,
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          text: '变量和嵌套是 Sass 最常用的两个特性。变量统一管理主题色、间距、断点；嵌套反映 DOM 层级，但过深嵌套会增加选择器特异性，降低可维护性。',
        },
        {
          id: 'p3-2',
          type: 'code',
          language: 'scss',
          filename: '变量与嵌套最佳实践',
          code: `// === 变量组织 ===
// 按类别分组，前缀语义化
$color-primary: #3b82f6;
$color-success: #10b981;
$color-warning: #f59e0b;
$color-danger: #ef4444;

$space-1: 4px;
$space-2: 8px;
$space-3: 16px;
$space-4: 24px;
$space-5: 32px;

$font-sm: 12px;
$font-base: 14px;
$font-lg: 16px;
$font-xl: 20px;

// === Sass Maps（结构化变量）===
$theme: (
  primary: #3b82f6,
  secondary: #6b7280,
  success: #10b981,
);

// 使用 map-get 读取
.button { background: map-get($theme, primary); }

// === 嵌套深度控制（不超过 3 层）===
// ✗ 过深嵌套（避免）
.nav > .nav__list > .nav__item > .nav__link > span {
  color: red;
}

// ✓ 推荐：扁平化
.nav__link-text {
  color: red;
}

// ✓ 合理嵌套（2-3 层）
.card {
  padding: 16px;

  &__title { font-size: 18px; }
  &__body { margin-top: 8px; }

  &--highlight {
    border: 2px solid $color-primary;

    .card__title { color: $color-primary; }
  }
}

// === 局部变量（!default）===
// 允许使用者覆盖默认值
$primary: blue !default;
.button { background: $primary; }

// 使用者可先定义自己的 $primary 再 import`,
        },
        {
          id: 'p3-3',
          type: 'list',
          items: [
            '变量命名：按类别前缀（$color-/$space-/$font-），语义化',
            '结构化：用 Sass Maps 组织相关变量（主题色、断点）',
            '嵌套深度：不超过 3 层，避免选择器特异性过高',
            'BEM + 嵌套：用 & 拼接 BEM 修饰符（&--active）',
            '!default：库/主题开发允许使用者覆盖默认值',
            '模块化：用 @use/@forward 替代 @import（Dart Sass）',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 4：Sass Mixin / Function / 继承
    // ========================================================================
    {
      order: 4,
      title: 'Sass Mixin / Function / 继承',
      difficulty: 3,
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          text: 'Mixin 复用样式块、Function 返回值、@extend 继承选择器。三者是 Sass 代码复用的核心机制，合理使用可大幅减少重复代码。',
        },
        {
          id: 'p4-2',
          type: 'code',
          language: 'scss',
          filename: 'Mixin / Function / Extend',
          code: `// === Mixin：复用样式块（可带参数）===
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@mixin truncate($line: 1) {
  @if $line == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $line;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@mixin respond-to($bp) {
  @media (min-width: $bp) { @content; }
}

// 使用
.modal { @include absolute-center; }
.title { @include truncate(2); }
.sidebar {
  width: 100%;
  @include respond-to(768px) {
    width: 250px;
  };
}

// === Function：返回值 ===
@function rem($px) {
  @return $px / 16px * 1rem;
}

@function color-yiq($color) {
  $r: red($color);
  $g: green($color);
  $b: blue($color);
  $yiq: (($r * 299) + ($g * 587) + ($b * 114)) / 1000;
  @if $yiq >= 150 { @return #000; }
  @else { @return #fff; }
}

// 使用
.text { font-size: rem(20px); }  // 1.25rem
.btn-primary {
  background: #3b82f6;
  color: color-yiq(#3b82f6);  // 自动选择黑/白文字
}

// === @extend：继承选择器 ===
// 共享基础样式
.message {
  padding: 10px;
  border-radius: 4px;
}

.message-error {
  @extend .message;
  background: #fef2f2;
  color: #ef4444;
}

// === 占位符选择器 %（不输出未使用的样式）===
%card-base {
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-card { @extend %card-base; }
.user-card { @extend %card-base; }`,
        },
        {
          id: 'p4-3',
          type: 'callout',
          variant: 'tip',
          title: 'Mixin vs Extend 选择',
          text: '需要参数用 Mixin，纯共享样式用 @extend。但 @extend 生成分组选择器可能扩散到意外位置，复杂场景优先 Mixin。Dart Sass 中 @extend 性能已优化，但仍建议谨慎使用。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：Tailwind CSS 核心用法
    // ========================================================================
    {
      order: 5,
      title: 'Tailwind CSS 核心用法',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          text: 'Tailwind CSS 采用实用优先（Utility-first）理念，提供原子化工具类直接在 HTML 中组合，无需编写自定义 CSS。通过配置文件约束设计系统，保证视觉一致性。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Tailwind 工具类实时预览：按钮、卡片、徽章、表单、布局',
            initialCode: `<!-- Tailwind 工具类组合示例（CDN 模拟效果） -->
<style>
  .bg-blue-500 { background-color: #3b82f6; }
  .bg-green-500 { background-color: #10b981; }
  .bg-gray-100 { background-color: #f3f4f6; }
  .text-white { color: white; }
  .text-blue-600 { color: #2563eb; }
  .px-4 { padding-left: 16px; padding-right: 16px; }
  .py-2 { padding-top: 8px; padding-bottom: 8px; }
  .p-4 { padding: 16px; }
  .rounded { border-radius: 4px; }
  .rounded-lg { border-radius: 8px; }
  .font-bold { font-weight: 700; }
  .text-sm { font-size: 14px; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .gap-2 { gap: 8px; }
  .shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .border { border: 1px solid #e5e7eb; }
  .mt-4 { margin-top: 16px; }
  .hover\:bg-blue-600:hover { background-color: #2563eb; }
</style>

<!-- 按钮 -->
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  点击按钮
</button>

<!-- 卡片 -->
<div class="bg-gray-100 p-4 rounded-lg shadow mt-4">
  <div class="font-bold text-blue-600">Tailwind 卡片</div>
  <div class="text-sm">使用工具类组合，无需自定义 CSS</div>
</div>

<!-- 徽章 + Flex 布局 -->
<div class="flex items-center gap-2 mt-4">
  <span class="bg-green-500 text-white px-2 py-1 rounded text-sm">已激活</span>
  <span class="border px-2 py-1 rounded text-sm">待审核</span>
</div>`,
          },
        },
        {
          id: 'p5-3',
          type: 'code',
          language: 'html',
          filename: 'Tailwind 响应式与状态变体',
          code: `<!-- 响应式前缀：sm: md: lg: xl:（移动优先）-->
<div class="w-full md:w-1/2 lg:w-1/3">
  移动端全宽，平板 1/2，桌面 1/3
</div>

<!-- 状态变体 -->
<button class="bg-blue-500 hover:bg-blue-600 focus:ring-2 active:bg-blue-700">
  悬停/聚焦/按下
</button>

<!-- 暗色模式 -->
<div class="bg-white dark:bg-gray-800 dark:text-white">
  亮色/暗色自适应
</div>

<!-- 常用工具类速查 -->
<!--
布局：flex grid block inline-flex items-center justify-center gap-4
间距：p-4 px-4 py-2 m-4 mt-2 mx-auto space-y-4
尺寸：w-full h-screen max-w-7xl w-1/2
颜色：bg-blue-500 text-white border-gray-200
圆角：rounded rounded-lg rounded-full rounded-xl
阴影：shadow shadow-md shadow-lg
文本：text-sm font-bold text-center truncate
过渡：transition duration-200 ease-in-out
-->`,
        },
        {
          id: 'p5-4',
          type: 'callout',
          variant: 'tip',
          title: '实用优先的优势',
          text: '无需命名 CSS 类、约束设计系统（颜色/间距统一）、CSS 体积小（按需生成）、上下文清晰（样式在 HTML 中可见）。缺点：类名冗长、学习曲线、团队需统一规范。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：Tailwind 自定义主题配置
    // ========================================================================
    {
      order: 6,
      title: 'Tailwind 自定义主题配置',
      difficulty: 3,
      isNew: true,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          text: '通过 tailwind.config.js 自定义主题：扩展颜色、间距、字体、断点。Tailwind v4 推荐用 CSS 变量配置，更简洁灵活。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '// tailwind.config.js',
              'module.exports = {',
              '  // 1. 扩展主题',
              '  theme: {',
              '    extend: {',
              '      colors: {',
              '        primary: "#3b82f6",',
              '        brand: {',
              '          light: "#60a5fa",',
              '          DEFAULT: "#3b82f6",',
              '          dark: "#2563eb",',
              '        },',
              '      },',
              '      spacing: {',
              '        18: "4.5rem",  // 72px',
              '      },',
              '      fontFamily: {',
              '        sans: ["Inter", "sans-serif"],',
              '      },',
              '    },',
              '  },',
              '  // 2. 暗色模式策略',
              '  darkMode: "class",',
              '  // 3. 内容扫描（按需生成）',
              '  content: [',
              '    "./src/**/*.{js,ts,jsx,tsx}",',
              '  ],',
              '  // 4. 自定义插件',
              '  plugins: [',
              '    require("@tailwindcss/forms"),',
              '  ],',
              '};',
            ],
            language: 'javascript',
            steps: [
              {
                title: '扩展主题（extend）',
                description: 'theme.extend 在默认主题基础上追加，不覆盖原有值。colors.brand.DEFAULT 使 bg-brand 生效，brand.light 使 bg-brand-light 生效。',
                highlightLines: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
              },
              {
                title: '自定义间距',
                description: 'spacing 影响所有间距工具类（p-/m-/gap-/w-/h-）。spacing.18 生成 p-18、m-18、w-18 等工具类。',
                highlightLines: [19, 20, 21, 22],
              },
              {
                title: '暗色模式策略',
                description: 'darkMode: "class" 通过 .dark 类切换暗色模式（需手动管理）。"media" 跟随系统偏好。"selector"（v3.4+）类似 class 但更灵活。',
                highlightLines: [26],
              },
              {
                title: '内容扫描（按需生成）',
                description: 'content 指定扫描的文件，Tailwind 仅生成用到的工具类，减小体积。务必包含所有使用 Tailwind 类的文件。',
                highlightLines: [27, 28, 29, 30, 31],
              },
              {
                title: '插件扩展',
                description: 'plugins 添加官方或第三方插件，如 @tailwindcss/forms 提供表单样式、@tailwindcss/typography 提供富文本样式。',
                highlightLines: [32, 33, 34, 35, 36],
              },
            ],
          },
        },
        {
          id: 'p6-3',
          type: 'code',
          language: 'css',
          filename: 'Tailwind v4 CSS 变量配置',
          code: `/* Tailwind v4 推荐：CSS 变量配置，无需 JS 配置文件 */
/* src/styles.css */
@import "tailwindcss";

/* 自定义主题变量 */
@theme {
  --color-primary: #3b82f6;
  --color-brand-light: #60a5fa;
  --color-brand-dark: #2563eb;

  --spacing-18: 4.5rem;

  --font-sans: "Inter", sans-serif;

  --breakpoint-3xl: 1920px;
}

/* 使用：自动生成 bg-primary、text-brand-light 等工具类 */
/* <button class="bg-primary text-white p-18">v4 配置</button> */

/* 暗色模式：CSS 变量覆盖 */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-primary: #60a5fa;
  }
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 7：响应式断点体系
    // ========================================================================
    {
      order: 7,
      title: '响应式断点体系',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          text: 'Tailwind 采用移动优先策略，默认样式针对移动端，通过 sm:/md:/lg:/xl:/2xl: 前缀覆盖更大屏幕。理解断点体系是响应式开发的基础。',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '断点',
            columns: ['sm', 'md', 'lg', 'xl', '2xl'],
            rows: [
              { feature: '最小宽度', values: ['640px', '768px', '1024px', '1280px', '1536px'] },
              { feature: '设备', values: ['大手机', '平板', '笔记本', '桌面', '大屏'] },
              { feature: 'CSS 媒体查询', values: ['min-width: 640px', 'min-width: 768px', 'min-width: 1024px', 'min-width: 1280px', 'min-width: 1536px'] },
              { feature: '典型布局', values: ['单列', '2 列', '3 列', '侧边栏+主区', '宽布局'] },
            ],
          },
        },
        {
          id: 'p7-3',
          type: 'code',
          language: 'html',
          filename: '移动优先响应式',
          code: `<!-- 移动优先：默认移动端，逐级覆盖大屏 -->
<!-- 移动端 1 列 → 平板 2 列 → 桌面 3 列 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-blue-100 p-4">卡片 1</div>
  <div class="bg-blue-100 p-4">卡片 2</div>
  <div class="bg-blue-100 p-4">卡片 3</div>
</div>

<!-- 隐藏/显示 -->
<div class="block md:hidden">仅移动端显示</div>
<div class="hidden md:block">仅平板及以上显示</div>

<!-- 字号响应式 -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">
  响应式标题
</h1>

<!-- 间距响应式 -->
<main class="px-4 md:px-8 lg:px-16">
  内容区
</main>

<!-- 自定义断点（tailwind.config.js）-->
<!--
module.exports = {
  theme: {
    screens: {
      xs: "475px",   // 小手机
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      3xl: "1920px", // 超大屏
    }
  }
}
-->
<div class="grid grid-cols-2 xs:grid-cols-3 3xl:grid-cols-6">
  自定义断点
</div>`,
        },
        {
          id: 'p7-4',
          type: 'callout',
          variant: 'warning',
          title: '移动优先 vs 桌面优先',
          text: 'Tailwind 默认移动优先（min-width 媒体查询）。若需桌面优先（max-width），需自定义配置或使用 max-sm:/max-md: 前缀（v3.2+）。保持项目内策略统一。',
        },
      ],
    },

    // ========================================================================
    // 知识点 8：CSS Modules
    // ========================================================================
    {
      order: 8,
      title: 'CSS Modules',
      difficulty: 2,
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          text: 'CSS Modules 在编译时为类名添加唯一哈希，实现局部作用域，彻底解决命名冲突。Next.js、Vite 等现代框架原生支持。',
        },
        {
          id: 'p8-2',
          type: 'code',
          language: 'tsx',
          filename: 'CSS Modules 用法',
          code: `// Button.module.css
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
}
.primary { composes: btn; background: #3b82f6; }
.danger { composes: btn; background: #ef4444; }

// Button.tsx
import styles from './Button.module.css'

export function Button({ variant = 'primary', children }) {
  // styles.primary 编译为 Button_primary__a1b2c
  return <button className={styles[variant]}>{children}</button>
}

// composes 组合样式（类似 @extend）
// .primary { composes: btn; ... }
// 编译后 className="Button_btn__a1b2 Button_primary__d3e4"

// 全局类名（:global）
:global(.reset) {
  margin: 0;
  padding: 0;
}

// 定义 CSS 变量（可被父组件覆盖）
.card {
  --card-padding: 16px;
  padding: var(--card-padding);
}
// 父组件：<div style={{ '--card-padding': '24px' }}>`,
        },
        {
          id: 'p8-3',
          type: 'list',
          items: [
            '局部作用域：类名自动添加哈希，无命名冲突',
            'composes：组合其他样式，类似 Sass @extend',
            ':global：定义全局类名（reset、第三方库样式）',
            'CSS 变量：通过 style 属性动态覆盖，实现主题化',
            'TypeScript：需声明 *.module.css 模块类型',
            'Vite/Next.js 原生支持，无需额外配置',
          ],
        },
        {
          id: 'p8-4',
          type: 'callout',
          variant: 'tip',
          title: 'CSS Modules vs Tailwind',
          text: 'CSS Modules 适合需要语义化类名的场景（复杂组件、团队协作）。Tailwind 适合快速开发和设计系统约束。两者可混用：Tailwind 做布局，CSS Modules 做复杂组件。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：CSS-in-JS
    // ========================================================================
    {
      order: 9,
      title: 'CSS-in-JS（styled-components/emotion）',
      difficulty: 3,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          text: 'CSS-in-JS 将样式写入 JavaScript，支持动态主题、props 驱动样式、自动前缀。代表库：styled-components、emotion、Stitches。运行时方案有性能开销，Zero-Runtime CSS-in-JS（Linaria/vanilla-extract）是趋势。',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比',
            columns: ['styled-components', 'emotion', 'Stitches', 'vanilla-extract'],
            rows: [
              { feature: '类型', values: ['运行时', '运行时', '运行时', 'Zero-Runtime'] },
              { feature: 'API 风格', values: ['模板字符串', '模板字符串/对象', '对象', '对象'] },
              { feature: '性能', values: ['中等', '中等', '较好', '优秀（编译时）'] },
              { feature: 'SSR 支持', values: ['需配置', '良好', '良好', '优秀'] },
              { feature: 'TypeScript', values: ['一般', '良好', '优秀', '优秀'] },
              { feature: '体积', values: ['较大', '中等', '较小', '小（按需）'] },
              { feature: '主题', values: ['ThemeProvider', 'ThemeProvider', 'createTheme', 'createTheme'] },
            ],
            highlightColumn: 3,
          },
        },
        {
          id: 'p9-3',
          type: 'code',
          language: 'tsx',
          filename: 'styled-components 与 emotion',
          code: `// === styled-components ===
import styled, { css } from 'styled-components'

const Button = styled.button\`
  padding: 8px 16px;
  border-radius: 6px;
  background: \${props => props.variant === 'primary' ? '#3b82f6' : '#6b7280'};
  color: white;

  \${props => props.size === 'lg' && css\`
    padding: 12px 24px;
    font-size: 18px;
  \`}

  &:hover { opacity: 0.9; }
\`

// 主题
const theme = {
  colors: { primary: '#3b82f6', danger: '#ef4444' }
}
<ThemeProvider theme={theme}>
  <Button variant="primary">按钮</Button>
</ThemeProvider>

// === emotion ===
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Button = styled.button\`
  background: \${props => props.theme.colors.primary};
\`

// 对象语法（类型安全）
const card = css({
  padding: 16,
  borderRadius: 8,
  background: 'white'
})

// === vanilla-extract（Zero-Runtime）===
// styles.css.ts
import { style, createTheme } from '@vanilla-extract/css'

export const button = style({
  padding: '8px 16px',
  borderRadius: 6,
  background: 'blue'
})

// 使用
import { button } from './styles.css'
<button className={button}>按钮</button>`,
        },
        {
          id: 'p9-4',
          type: 'callout',
          variant: 'warning',
          title: 'React 18 + CSS-in-JS',
          text: '运行时 CSS-in-JS（styled-components/emotion）在 React 18 并发渲染下有兼容问题（样式注入时机）。推荐迁移到 Zero-Runtime 方案（vanilla-extract/Linaria）或 CSS Modules/Tailwind。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：PostCSS 生态
    // ========================================================================
    {
      order: 10,
      title: 'PostCSS 生态（autoprefixer/cssnano）',
      difficulty: 2,
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          text: 'PostCSS 是 CSS 后处理器，通过插件转换 CSS。autoprefixer 自动添加浏览器前缀，cssnano 压缩 CSS，postcss-preset-env 启用未来 CSS 语法。',
        },
        {
          id: 'p10-2',
          type: 'code',
          language: 'javascript',
          filename: 'PostCSS 配置',
          code: `// postcss.config.js
module.exports = {
  plugins: [
    // 1. 自动添加浏览器前缀
    require('autoprefixer')({
      overrideBrowserslist: ['> 1%', 'last 2 versions']
    }),

    // 2. 启用未来 CSS 语法（按阶段）
    require('postcss-preset-env')({
      stage: 2,  // 0-4，越小越稳定
      features: {
        'nesting-rules': true,  // 原生嵌套
        'custom-properties': true  // CSS 变量
      }
    }),

    // 3. CSS 压缩（生产环境）
    require('cssnano')({
      preset: 'default'
    })
  ]
}

// === autoprefixer 效果 ===
// 输入：
// .flex { display: flex; user-select: none; }

// 输出（根据 browserslist）：
// .flex {
//   display: -webkit-box;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// }

// === Tailwind 基于 PostCSS ===
// Tailwind 本身是 PostCSS 插件
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}

// === browserslist 配置 ===
// package.json 或 .browserslistrc
{
  "browserslist": [
    "> 1%",           // 全球使用率 > 1%
    "last 2 versions", // 每个浏览器最近 2 个版本
    "not dead",       // 排除已停止支持的浏览器
    "not ie 11"       // 排除 IE 11
  ]
}`,
        },
        {
          id: 'p10-3',
          type: 'list',
          items: [
            'autoprefixer：根据 browserslist 自动添加 -webkit-/-ms- 前缀',
            'cssnano：压缩 CSS（移除注释、空白、重复规则）',
            'postcss-preset-env：按 stage 启用未来 CSS 语法',
            'postcss-import：内联 @import，合并多个 CSS 文件',
            'postcss-nested：支持原生嵌套语法（Sass 风格）',
            'Tailwind 本身是 PostCSS 插件，基于 PostCSS 生态',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 11：UI 组件库选型
    // ========================================================================
    {
      order: 11,
      title: 'UI 组件库选型',
      difficulty: 1,
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          text: 'UI 组件库提供预制组件（按钮/表单/弹窗），加速开发。React 生态：Ant Design/Material-UI/Chakra UI。选型需考虑设计风格、体积、定制性、维护活跃度。',
        },
        {
          id: 'p11-2',
          type: 'code',
          language: 'tsx',
          filename: '主流 UI 组件库',
          code: `// === Ant Design（企业级，中文友好）===
import { Button, Form, Input, Table } from 'antd'
<Button type="primary" size="large">按钮</Button>
// 特点：组件丰富、表单强大、中文文档完善
// 体积：较大（支持按需引入）
// 适合：中后台系统

// === Material-UI（Google 设计）===
import { Button, TextField, Card } from '@mui/material'
<Button variant="contained" color="primary">按钮</Button>
// 特点：Material Design 规范、主题系统强大
// 体积：较大（支持 Tree-shaking）
// 适合：国际化项目、Material 风格

// === Chakra UI（开发者友好）===
import { Button, Box, VStack } from '@chakra-ui/react'
<Button colorScheme="blue" size="md">按钮</Button>
// 特点：Style props（类似 Tailwind）、可访问性优秀
// 体积：中等
// 适合：快速原型、SSR 项目

// === Radix UI + Tailwind（Headless）===
import * as Dialog from '@radix-ui/react-dialog'
<Dialog.Root>
  <Dialog.Trigger>打开</Dialog.Trigger>
  <Dialog.Content className="bg-white p-4 rounded">
    <Dialog.Title>标题</Dialog.Title>
  </Dialog.Content>
</Dialog.Root>
// 特点：无样式（Headless）、可访问性极佳
// 体积：小（按需引入）
// 适合：定制化设计系统、shadcn/ui 模式`,
        },
        {
          id: 'p11-3',
          type: 'list',
          items: [
            'Ant Design：企业级中后台，组件丰富，中文友好',
            'Material-UI：Google Material 规范，国际化项目',
            'Chakra UI：开发者友好，Style props + 可访问性',
            'Radix UI：Headless 组件，配合 Tailwind 定制',
            'shadcn/ui：基于 Radix + Tailwind，复制源码到项目',
            '选型因素：设计风格、体积、定制性、可访问性、维护活跃度',
          ],
        },
        {
          id: 'p11-4',
          type: 'callout',
          variant: 'tip',
          title: 'Headless 趋势',
          text: '现代趋势是 Headless UI（Radix/Headless UI）+ Tailwind 模式，只提供行为和可访问性，样式完全自定义。shadcn/ui 将此模式推向主流，组件源码复制到项目，完全可控。',
        },
      ],
    },

    // ========================================================================
    // 知识点 12：CSS 架构（BEM/ITCSS/SMACSS）
    // ========================================================================
    {
      order: 12,
      title: 'CSS 架构（BEM/ITCSS/SMACSS）',
      difficulty: 3,
      isNew: true,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          text: '大型项目的 CSS 需要架构方法论。BEM 提供命名规范，ITCSS 分层管理，SMACSS 分类规则。三者可组合使用，提升 CSS 可维护性。',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'CSS 架构方法论对比',
            layers: [
              {
                name: 'BEM（命名规范）',
                description: 'Block__Element--Modifier',
                components: [
                  { name: 'Block', description: '独立的块（.card）' },
                  { name: 'Element', description: '块的组成部分（.card__title）' },
                  { name: 'Modifier', description: '修饰状态（.card--highlight）' },
                ],
              },
              {
                name: 'ITCSS（分层管理）',
                description: '从通用到具体，7 层倒三角',
                components: [
                  { name: 'Settings', description: '变量、配置（$color-primary）' },
                  { name: 'Tools', description: 'Mixin、Function' },
                  { name: 'Generic', description: 'Reset、Normalize' },
                  { name: 'Elements', description: 'HTML 元素样式（a、button）' },
                  { name: 'Objects', description: '无外观的布局模式（.o-container）' },
                  { name: 'Components', description: 'UI 组件（.c-card）' },
                  { name: 'Utilities', description: '工具类（.u-text-center）' },
                ],
              },
              {
                name: 'SMACSS（分类规则）',
                description: '5 类样式规则',
                components: [
                  { name: 'Base', description: '元素默认样式（reset）' },
                  { name: 'Layout', description: '布局结构（.l-header）' },
                  { name: 'Module', description: '可复用组件（.modal）' },
                  { name: 'State', description: '状态类（.is-active、.is-hidden）' },
                  { name: 'Theme', description: '主题样式（.theme-dark）' },
                ],
              },
            ],
            flowDirection: 'top-down',
          },
        },
        {
          id: 'p12-3',
          type: 'code',
          language: 'scss',
          filename: 'BEM 命名实践',
          code: `// === BEM 命名规范 ===
// Block：独立的可复用组件
.card {
  padding: 16px;
  border-radius: 8px;

  // Element：块的组成部分（双下划线）
  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  &__body {
    margin-top: 8px;
  }

  &__footer {
    margin-top: 16px;
    text-align: right;
  }

  // Modifier：修饰状态（双连字符）
  &--highlight {
    border: 2px solid blue;
  }

  &--compact {
    padding: 8px;

    .card__title { font-size: 14px; }
  }
}

// === ITCSS 文件组织 ===
// styles/
// ├── settings/      变量
// ├── tools/         Mixin/Function
// ├── generic/       Reset
// ├── elements/      元素样式
// ├── objects/       布局（.o-container）
// ├── components/    组件（.c-card）
// └── utilities/     工具类（.u-text-center）

// === SMACSS 状态类 ===
.tab {
  display: inline-block;
  padding: 8px 16px;
}
.tab.is-active {
  background: blue;
  color: white;
}
// JS 切换：element.classList.toggle('is-active')`,
        },
        {
          id: 'p12-4',
          type: 'callout',
          variant: 'tip',
          title: '方法论组合使用',
          text: 'BEM 提供命名规范，ITCSS 提供分层组织，SMACSS 提供分类规则。实际项目常组合：ITCSS 分层 + BEM 命名 + SMACSS 状态类。现代项目用 CSS Modules/Tailwind 后，方法论更多是思维模型。',
        },
      ],
    },

    // ========================================================================
    // 知识点 13：CSS 变量与主题系统
    // ========================================================================
    {
      order: 13,
      title: 'CSS 变量与主题系统',
      difficulty: 2,
      isNew: true,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          text: 'CSS 自定义属性（变量）是原生 CSS 的重大增强。与 Sass 变量不同，CSS 变量在运行时生效，可动态切换主题，无需重新编译。',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'CSS 变量主题切换：通过 data-theme 属性切换亮/暗主题',
            initialCode: `<!-- CSS 变量实现主题切换 -->
<style>
  :root {
    --color-bg: #ffffff;
    --color-text: #1f2937;
    --color-primary: #3b82f6;
    --color-border: #e5e7eb;
    --space-md: 16px;
  }

  [data-theme="dark"] {
    --color-bg: #1f2937;
    --color-text: #f3f4f6;
    --color-primary: #60a5fa;
    --color-border: #374151;
  }

  body {
    background: var(--color-bg);
    color: var(--color-text);
    padding: 24px;
    transition: background 0.3s, color 0.3s;
  }

  .card {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: var(--space-md);
    margin-bottom: 16px;
  }

  .btn {
    background: var(--color-primary);
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .toggle {
    margin-bottom: 16px;
  }
</style>

<div class="toggle">
  <button class="btn" onclick="
    const cur = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = cur === 'dark' ? '' : 'dark';
  ">切换主题</button>
</div>

<div class="card">
  <h3>CSS 变量主题演示</h3>
  <p>点击按钮切换亮/暗主题，所有颜色通过 CSS 变量驱动。</p>
</div>`,
          },
        },
        {
          id: 'p13-3',
          type: 'code',
          language: 'css',
          filename: 'CSS 变量进阶',
          code: `/* === 定义与使用 === */
:root {
  --color-primary: #3b82f6;
  --spacing: 16px;
  --radius: 8px;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing);
  border-radius: var(--radius);
}

/* === 默认值（fallback）=== */
.button {
  /* 若 --color-primary 未定义，使用 #007bff */
  background: var(--color-primary, #007bff);
}

/* === JS 操作 CSS 变量 === */
// 读取
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary')

// 设置
document.documentElement.style.setProperty('--color-primary', '#ef4444')

/* === 响应式变量（不同断点不同值）=== */
:root {
  --container-width: 100%;
}
@media (min-width: 768px) {
  :root {
    --container-width: 720px;
  }
}
@media (min-width: 1024px) {
  :root {
    --container-width: 960px;
  }
}
.container { width: var(--container-width); }

/* === 组件级变量（可被父组件覆盖）=== */
.card {
  --card-padding: 16px;  /* 默认值 */
  padding: var(--card-padding);
}
/* 父组件覆盖 */
.hero .card {
  --card-padding: 32px;
}`,
        },
        {
          id: 'p13-4',
          type: 'callout',
          variant: 'tip',
          title: 'CSS 变量 vs Sass 变量',
          text: 'Sass 变量编译时确定，无法运行时修改。CSS 变量运行时生效，可动态切换主题、JS 操作、响应式适配。现代主题系统优先用 CSS 变量，Sass 变量用于编译时常量。',
        },
      ],
    },

    // ========================================================================
    // 知识点 14：容器查询 @container
    // ========================================================================
    {
      order: 14,
      title: '容器查询 @container',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          text: '容器查询根据父容器宽度（而非视口宽度）应用样式，实现真正的组件级响应式。组件可在任何位置自适应，不再依赖视口断点。',
        },
        {
          id: 'p14-2',
          type: 'code',
          language: 'css',
          filename: '@container 用法',
          code: `/* === 基础用法 === */
/* 1. 声明容器 */
.sidebar {
  container-type: inline-size;
  /* 或简写：container: sidebar / inline-size; */
}

/* 2. 根据容器宽度应用样式 */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

@container (max-width: 399px) {
  .card {
    display: block;
  }
}

/* === 命名容器 === */
.layout {
  container: layout / inline-size;
}

@container layout (min-width: 768px) {
  .sidebar { width: 250px; }
}

/* === 容器查询单位 === */
/* cqw/cqh/cqi/cqb/cqmin/cqmax（1cqw = 容器宽度的 1%）*/
.title {
  font-size: 5cqi;  /* 容器宽度的 5% */
}

/* === 实战：组件级响应式 === */
.card-container {
  container-type: inline-size;
}

.card {
  display: flex;
  flex-direction: column;
}

@container (min-width: 500px) {
  .card {
    flex-direction: row;
  }
  .card__image {
    width: 200px;
  }
}

@container (min-width: 800px) {
  .card__title {
    font-size: 24px;
  }
}`,
        },
        {
          id: 'p14-3',
          type: 'callout',
          variant: 'tip',
          title: '容器查询 vs 媒体查询',
          text: '媒体查询基于视口，组件在不同布局位置表现一致。容器查询基于父容器，组件根据可用空间自适应。可复用组件（设计系统、卡片库）优先用容器查询，页面级布局用媒体查询。',
        },
        {
          id: 'p14-4',
          type: 'callout',
          variant: 'warning',
          title: '浏览器兼容性',
          text: '@container 已被所有主流浏览器支持（2023 起）。container-type 会创建新的包含块和格式化上下文，注意对子元素布局的影响。size 类型需显式设置容器尺寸。',
        },
      ],
    },

    // ========================================================================
    // 知识点 15：@layer 层叠层
    // ========================================================================
    {
      order: 15,
      title: '@layer 层叠层',
      difficulty: 3,
      isNew: true,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          text: '@layer 声明层叠层，显式控制样式优先级。低优先级层的规则即使特异性高，也会被高优先级层的规则覆盖。解决第三方库样式覆盖难题。',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '/* 1. 声明层（顺序决定优先级，后者更高）*/',
              '@layer reset, base, components, utilities;',
              '',
              '/* 2. reset 层（最低优先级）*/',
              '@layer reset {',
              '  * { margin: 0; padding: 0; box-sizing: border-box; }',
              '  body { font-family: sans-serif; }',
              '}',
              '',
              '/* 3. base 层（元素样式）*/',
              '@layer base {',
              '  a { color: blue; }',
              '  button { padding: 8px; }',
              '}',
              '',
              '/* 4. components 层（组件样式）*/',
              '@layer components {',
              '  .btn { background: blue; color: white; }',
              '  .card { border-radius: 8px; }',
              '}',
              '',
              '/* 5. utilities 层（最高优先级）*/',
              '@layer utilities {',
              '  .hidden { display: none; }',
              '  .text-center { text-align: center; }',
              '}',
              '',
              '/* 未分层样式优先级最高 */',
              '.emergency { color: red !important; }',
            ],
            language: 'css',
            steps: [
              {
                title: '声明层顺序',
                description: '@layer reset, base, components, utilities; 声明顺序决定优先级，后面的层优先级更高。reset 最低，utilities 最高。',
                highlightLines: [2],
              },
              {
                title: 'reset 层（最低）',
                description: '放置全局重置样式。即使 * { margin: 0 } 特异性最低，也在 reset 层内，不会覆盖其他层。',
                highlightLines: [5, 6, 7, 8],
              },
              {
                title: 'base 层',
                description: '元素基础样式（a、button）。覆盖 reset 层的同属性，但被 components 层覆盖。',
                highlightLines: [11, 12, 13, 14, 15],
              },
              {
                title: 'components 层',
                description: '组件样式（.btn、.card）。优先级高于 base，可放心覆盖元素默认样式，无需提高特异性。',
                highlightLines: [18, 19, 20, 21, 22],
              },
              {
                title: 'utilities 层（最高）',
                description: '工具类（.hidden、.text-center）。优先级最高，确保工具类总能覆盖组件样式，无需 !important。',
                highlightLines: [25, 26, 27, 28, 29],
              },
              {
                title: '未分层样式',
                description: '未分层的样式优先级高于所有层。可用于紧急修复，但不推荐大量使用，破坏层叠层级管理。',
                highlightLines: [32],
              },
            ],
          },
        },
        {
          id: 'p15-3',
          type: 'callout',
          variant: 'tip',
          title: '@layer 解决的问题',
          text: '无需 !important 或提高特异性即可覆盖第三方库样式。将第三方库放入低优先级层，自定义样式放入高优先级层，自然覆盖。Tailwind v4 已采用 @layer 架构。',
        },
      ],
    },

    // ========================================================================
    // 知识点 16：CSS 工程化知识图谱
    // ========================================================================
    {
      order: 16,
      title: 'CSS 工程化知识图谱',
      difficulty: 1,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS 工程化涵盖预处理器、原子化框架、CSS Modules、CSS-in-JS、PostCSS、CSS 架构方法论、现代 CSS 特性等。理解各方案定位与适用场景，才能做出合理选型。',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'css-eng', label: 'CSS 工程化', group: 0 },
              { id: 'preprocess', label: '预处理器', group: 1 },
              { id: 'sass', label: 'Sass/Less', group: 1 },
              { id: 'atomic', label: '原子化', group: 1 },
              { id: 'tailwind', label: 'Tailwind', group: 1 },
              { id: 'modules', label: 'CSS Modules', group: 1 },
              { id: 'cinjs', label: 'CSS-in-JS', group: 1 },
              { id: 'postcss', label: 'PostCSS', group: 1 },
              { id: 'arch', label: 'CSS 架构', group: 1 },
              { id: 'bem', label: 'BEM/ITCSS/SMACSS', group: 2 },
              { id: 'modern', label: '现代 CSS', group: 1 },
              { id: 'container', label: '@container', group: 2 },
              { id: 'layer', label: '@layer', group: 2 },
              { id: 'var', label: 'CSS 变量', group: 2 },
              { id: 'has', label: ':has()', group: 2 },
            ],
            edges: [
              { from: 'css-eng', to: 'preprocess' },
              { from: 'css-eng', to: 'atomic' },
              { from: 'css-eng', to: 'modules' },
              { from: 'css-eng', to: 'cinjs' },
              { from: 'css-eng', to: 'postcss' },
              { from: 'css-eng', to: 'arch' },
              { from: 'css-eng', to: 'modern' },
              { from: 'preprocess', to: 'sass' },
              { from: 'atomic', to: 'tailwind' },
              { from: 'arch', to: 'bem' },
              { from: 'modern', to: 'container' },
              { from: 'modern', to: 'layer' },
              { from: 'modern', to: 'var' },
              { from: 'modern', to: 'has' },
            ],
          },
        },
        {
          id: 'p16-3',
          type: 'list',
          items: [
            '预处理器（Sass/Less）：变量、嵌套、Mixin，编译时增强',
            '原子化（Tailwind）：实用优先，约束设计系统，按需生成',
            'CSS Modules：局部作用域，编译时哈希类名',
            'CSS-in-JS：样式写入 JS，动态主题，运行时/零运行时',
            'PostCSS：CSS 后处理器，autoprefixer/cssnano/preset-env',
            'CSS 架构：BEM 命名、ITCSS 分层、SMACSS 分类',
            '现代 CSS：容器查询 @container、@layer 层叠层、CSS 变量',
            'UI 组件库：Ant Design/MUI/Chakra/Radix（Headless）',
          ],
        },
        {
          id: 'p16-4',
          type: 'callout',
          variant: 'tip',
          title: '选型决策树',
          text: '小型项目→原生 CSS；中后台→Ant Design + CSS Modules；快速原型→Tailwind + Chakra；设计系统→Radix + Tailwind（shadcn/ui）；高度动态主题→CSS 变量 + Zero-Runtime CSS-in-JS。',
        },
        {
          id: 'p16-5',
          type: 'callout',
          variant: 'info',
          title: '现代趋势',
          text: 'CSS 原生能力增强（容器查询、@layer、:has()、CSS 变量）正在减少对预处理器的依赖。Tailwind + Headless UI + CSS 变量成为主流组合，兼顾开发效率、性能、可访问性。',
        },
      ],
    },

    // ========================================================================
    // 知识点 17：综合实战 - BEM 命名重构卡片组件
    // ========================================================================
    {
      order: 17,
      title: '综合实战：用 BEM 命名规范重构卡片组件',
      difficulty: 3,
      isNew: true,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: 'BEM（Block__Element--Modifier）是 CSS 工程化最基础的命名规范。本实战串联 BEM 命名、CSS 变量主题、修饰符复用，构建一个可复用、可主题化的卡片组件，从"能跑"到"可维护"。',
        },
        {
          id: 'p17-2',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '命名冲突是 CSS 工程化的头号痛点。BEM 通过 Block__Element--Modifier 显式表达层级与状态，让类名自文档化、零冲突、易复用。掌握 BEM 是理解 CSS Modules 自动哈希方案价值的前提，也是团队协作的最低公约数。',
        },
        {
          id: 'p17-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '在下方骨架中实现 BEM 卡片：.card 块、.card__title/.card__body 元素、.card--featured 修饰符，配合 CSS 变量支持主题化。',
            initialCode: `<!-- 综合实战：BEM 命名重构卡片组件 -->
<!-- 目标：用 BEM 规范重构卡片，支持 featured 修饰符 + CSS 变量主题 -->

<style>
  :root {
    /* TODO: 定义 --card-bg / --card-border / --card-accent 等主题变量 */
  }

  /* TODO: .card 块样式（含 padding、border、radius、background） */
  /* TODO: .card__title 元素样式 */
  /* TODO: .card__body 元素样式 */
  /* TODO: .card--featured 修饰符（覆盖 accent 色、加阴影） */
</style>

<!-- TODO: 渲染两张卡片，一张普通、一张带 card--featured 修饰符 -->
<!-- <article class="card">...</article> -->
<!-- <article class="card card--featured">...</article> -->
`,
            checks: [
              {
                description: '定义 .card 块样式',
                pattern: '\\.card\\s*\\{',
                hint: 'BEM 的 Block 是独立可复用单元，应定义 .card { ... } 作为容器样式（padding/border/radius/background）。',
              },
              {
                description: '使用 __ 命名元素（card__title / card__body）',
                pattern: 'card__title|card__body',
                hint: 'BEM 元素用 Block__Element 命名，如 .card__title、.card__body，表示块内子部分，不可独立使用。',
              },
              {
                description: '使用 -- 命名修饰符（card--featured）',
                pattern: 'card--featured',
                hint: 'BEM 修饰符用 Block--Modifier 命名，如 .card--featured 表示卡片的"特色"变体，覆盖块的样式（颜色、阴影等）。',
              },
              {
                description: '使用 CSS 变量定义主题色',
                pattern: '--[a-z-]+\\s*:',
                hint: '在 :root 定义 --card-bg、--card-border、--card-accent 等变量，样式块用 var() 引用，便于切换主题。',
              },
              {
                description: '修饰符通过 var() 覆盖主题变量',
                pattern: 'card--featured[\\s\\S]*--card-accent|--accent',
                hint: '.card--featured 应覆盖 --card-accent 等变量（而非直接写死颜色），让修饰符也能跟随主题系统。',
              },
              {
                description: 'HTML 中正确使用 BEM 类名组合',
                pattern: 'class="card[\\s"\\S]*card--featured',
                hint: 'HTML 中修饰符需与块名同时出现：class="card card--featured"（修饰符不能脱离块单独使用）。',
              },
            ],
          },
        },
        {
          id: 'p17-4',
          type: 'callout',
          variant: 'warning',
          title: '实战反思：BEM 的边界',
          text: 'BEM 解决命名冲突但靠人工遵守，深层嵌套（.block__element1__element2）是反模式。现代项目用 CSS Modules 自动哈希（编译时保证唯一）或 Tailwind 原子类（无命名）替代手工 BEM。但理解 BEM 仍是团队规范与设计系统命名的基础，且与 CSS 变量、CSS Modules 完全兼容。',
        },
      ],
    },

    // ========================================================================
    // 知识点 18：综合实战 - Tailwind 响应式导航栏
    // ========================================================================
    {
      order: 18,
      title: '综合实战：Tailwind 搭建响应式导航栏',
      difficulty: 3,
      isNew: true,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: 'Tailwind 是当前最流行的原子化 CSS 方案。本实战串联移动优先响应式断点（sm/md/lg）、flex 布局、hover/dark 变体、配色系统，搭建一个在桌面展开、移动端折叠的导航栏。',
        },
        {
          id: 'p18-2',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '响应式是前端刚需，Tailwind 的移动优先断点（sm/md/lg/xl）是其核心生产力。手写一遍能区分"断点前缀的工作机制""暗色模式策略""flex 布局组合"，是从"会用类名"到"会设计响应式系统"的关键一步。生产中 Tailwind + Headless UI 是 shadcn/ui 等主流方案的基础。',
        },
        {
          id: 'p18-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '在下方骨架中实现响应式导航栏：默认（移动）垂直折叠，md: 以上水平展开，支持 hover 与 dark 变体。',
            initialCode: `<!-- 综合实战：Tailwind 响应式导航栏 -->
<!-- 目标：移动端垂直折叠，md: 以上水平展开，支持 dark 模式 -->

<nav class="...">
  <!-- TODO: Logo 区域 -->
  <!-- TODO: 导航链接列表（默认垂直 flex-col，md: 以上水平 md:flex-row） -->
  <!-- TODO: 链接 hover 变体（hover:text-blue-500） -->
  <!-- TODO: 暗色模式变体（dark:text-gray-200） -->
</nav>
`,
            checks: [
              {
                description: '使用移动优先响应式断点 md:',
                pattern: 'md:',
                hint: 'Tailwind 移动优先：默认样式针对最小屏，md: 前缀（min-width: 768px）针对平板及以上。应出现 md:flex-row 或 md:flex 等断点类名。',
              },
              {
                description: '默认样式针对移动端（垂直布局）',
                pattern: 'flex-col|flex\\s+flex-col',
                hint: '默认（无断点前缀）应为移动端垂直布局：class 含 flex flex-col，桌面端用 md:flex-row 覆盖为水平。',
              },
              {
                description: '使用 hover 变体实现交互反馈',
                pattern: 'hover:',
                hint: '导航链接应有 hover:text-xxx 或 hover:bg-xxx 等悬停反馈，Tailwind 用 hover: 前缀实现。',
              },
              {
                description: '使用 dark 变体支持暗色模式',
                pattern: 'dark:',
                hint: '应包含 dark:bg-xxx / dark:text-xxx 等暗色模式类名，配合 Tailwind config 的 darkMode:"class" 策略切换。',
              },
              {
                description: '使用 flex 布局组合',
                pattern: 'flex\\s|items-center|justify-between',
                hint: '导航栏布局用 flex + items-center + justify-between：logo 与链接分两端对齐，垂直居中。',
              },
              {
                description: '导航链接使用语义化标签',
                pattern: '<a\\s|<nav',
                hint: '应用 <nav> 包裹导航，内部用 <a> 标签（而非 div）做链接，保证无障碍与 SEO。',
              },
            ],
          },
        },
        {
          id: 'p18-4',
          type: 'callout',
          variant: 'warning',
          title: '实战反思：原子化的取舍',
          text: 'Tailwind 类名冗长（class="flex items-center..."）是主要批评点，但得益于约束设计系统（限定配色/间距/字号）反而提升一致性。生产实践：复杂组件抽出 @apply 或组件封装（如 shadcn/ui），避免重复类名；暗色模式推荐 class 策略（手动切换）而非 media 策略（跟随系统），便于用户选择。',
        },
      ],
    },

    // ========================================================================
    // 知识点 19：面试题
    // ========================================================================
    {
      order: 19,
      title: '面试题',
      difficulty: 3,
      isNew: true,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          text: 'CSS 工程化面试高频考点：预处理器、原子化、CSS Modules、CSS-in-JS、CSS 架构、现代 CSS 特性。理解各方案的定位与取舍比背结论更重要。',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            title: '高频面试题（含场景题 / 对比题）',
            items: [
              {
                title: 'Q1: CSS 样式方案的发展历程与各阶段解决的核心问题',
                content: '阶段1 原生 CSS：解决样式与结构分离，但缺变量/复用。阶段2 预处理器(Sass/Less)：解决变量/嵌套/Mixin，编译时增强。阶段3 命名规范(BEM)：解决命名冲突，靠人工遵守。阶段4 CSS Modules：编译时自动哈希，彻底解决命名冲突。阶段5 CSS-in-JS：样式与组件耦合，支持动态主题，但运行时开销。阶段6 原子化(Tailwind)：实用优先，约束设计系统，按需生成。阶段7 现代 CSS(@container/@layer/CSS 变量)：原生能力增强，减少对工具依赖。每阶段解决前一阶段的痛点。',
              },
              {
                title: 'Q2: Sass 变量与 CSS 变量的区别',
                content: 'Sass 变量：编译时确定为静态值，无法运行时修改，编译后消失（变成字面值）；支持多种数据类型（颜色、数字、列表、map）；作用域分全局与局部（块级）。CSS 变量：运行时生效的自定义属性，可通过 JS 操作（getPropertyValue/setProperty）、媒体查询覆盖、父级覆盖；继承 DOM 树；支持 fallback（var(--x, fallback)）。选型：需运行时主题切换用 CSS 变量；需复杂计算（循环、函数）用 Sass 变量。现代项目优先 CSS 变量做主题，Sass 变量做编译期常量。',
              },
              {
                title: 'Q3: @mixin 与 @extend 的区别与选择',
                content: '@mixin：复用样式块，支持参数，输出到每个使用位置（重复输出，体积略大）。@extend：继承选择器，生成分组选择器（.a, .b 共享样式），不重复输出但可能选择器爆炸。选择原则：需要参数用 Mixin（如 @include button-variant($color)）；纯共享样式且选择器可控用 extend；复杂场景或担心选择器爆炸用 Mixin。Dart Sass 已弱化 @extend，社区倾向 Mixin + placeholder 占位类。',
              },
              {
                title: 'Q4: Tailwind 的核心理念与适用场景',
                content: '核心理念：实用优先（Utility-first），提供 bg-blue-500/p-4/flex 等原子工具类，直接在 HTML 组合，无需写自定义 CSS。优势：1) 约束设计系统（配色/间距/字号统一）；2) 按需生成（PurgeCSS 移除未用类，体积小）；3) 无命名冲突；4) 切换主题/暗色模式方便。劣势：类名冗长、学习曲线、HTML 可读性下降。适用：中后台、快速原型、设计系统约束的项目。不适用：高度定制视觉、强语义化类名需求、团队抗拒原子化的项目。',
              },
              {
                title: 'Q5: Tailwind 的响应式断点机制',
                content: 'Tailwind 移动优先：默认样式针对最小屏，断点前缀（sm/md/lg/xl/2xl）针对 min-width 升级。默认断点：sm=640px、md=768px、lg=1024px、xl=1280px、2xl=1536px。如 class="flex-col md:flex-row" 表示移动端垂直、md 及以上水平。自定义：tailwind.config.js 的 theme.screens 覆盖。注意：max-* 前缀（max-md:）针对 max-width 桌面优先，现代项目用得少。响应式组合：class="text-sm md:text-base lg:text-lg"。',
              },
              {
                title: 'Q6: CSS Modules 的工作原理',
                content: 'CSS Modules 在编译时为类名添加唯一哈希（如 .btn → .Button_btn__a1b2c），实现局部作用域，彻底解决命名冲突。文件命名约定：*.module.css。编译产物：类名被替换为哈希形式，CSS 与 JS 各自维护映射。composes: btn 复用其他样式（类似 @extend），:global(.reset) 定义全局类名。Vite/Next.js 原生支持，无需配置。TypeScript 需声明 *.module.css 模块类型。优势：编译时保证唯一、零运行时、与框架解耦。劣势：跨组件复用较弱（需 composes 或 CSS 变量）。',
              },
              {
                title: 'Q7: CSS-in-JS 的运行时与零运行时方案对比',
                content: '运行时方案（styled-components/emotion）：在浏览器中动态生成类名与样式表，支持完全动态主题（props 驱动），但有运行时开销（~10-30KB）、SSR 复杂（需提取样式表）。零运行时方案（Vanilla Extract/Linaria/Panda CSS）：编译时生成静态 CSS，无运行时开销，但动态主题受限（需用 CSS 变量传值）。React 18 + 并发渲染下，运行时 CSS-in-JS 因 hook 调用顺序问题受诟病（styled-components 曾警告），社区转向零运行时或 Tailwind。选型：SSR/性能敏感用零运行时；需完全动态样式用运行时但谨慎评估。',
              },
              {
                title: 'Q8: PostCSS 的作用与典型插件',
                content: 'PostCSS 是 CSS 后处理器（不是预处理器），用 JS 插件转换 CSS AST。典型插件：autoprefixer（自动加浏览器前缀）、cssnano（压缩）、postcss-preset-env（用未来 CSS 语法，自动降级）、tailwindcss（Tailwind 本身是 PostCSS 插件）、postcss-modules（实现 CSS Modules）。与 Sass 区别：Sass 增强语法（变量/嵌套/Mixin），PostCSS 转换现有 CSS（前缀/降级/优化）。现代项目 PostCSS 是事实标准，Tailwind/autoprefixer 都基于它。配置：postcss.config.js。',
              },
              {
                title: 'Q9: BEM 命名规范的语法与优劣',
                content: '语法：Block__Element--Modifier。Block 是独立可复用单元（.card）；Element 是块内子部分（.card__title）；Modifier 是块或元素的状态变体（.card--featured / .card__title--large）。HTML 中修饰符需与块名同时出现：class="card card--featured"。优势：类名自文档化、零命名冲突、表达层级与状态、易复用。劣势：类名冗长、深层嵌套是反模式（.block__e1__e2 错误）、靠人工遵守。现代替代：CSS Modules 自动哈希、Tailwind 原子类无命名。但 BEM 仍是团队规范与设计系统命名的基础。',
              },
              {
                title: 'Q10: ITCSS 与 SMACSS 的分层思想',
                content: 'ITCSS（Inverted Triangle CSS）：从通用到具体分 7 层 - Settings/Tokens（变量）、Tools（Mixin/Function）、Generic（reset/normalize）、Elements（标签样式）、Objects（无视觉的布局类）、Components（组件样式）、Utilities（工具类）。下层可使用上层，不可反向。SMACSS（Scalable Modular CSS）：分 5 类 - Base（标签样式）、Layout（布局）、Module（组件）、State（状态类 .is-active）、Theme（主题）。两者都是"分层 + 限定依赖方向"思想，解决大项目的样式组织。现代项目用 CSS Modules/Tailwind 后，分层思想体现在 tokens 层（CSS 变量）与组件层。',
              },
              {
                title: 'Q11: 容器查询 @container 与媒体查询 @media 的区别',
                content: '@media 基于视口宽度，组件在不同位置表现一致（无法感知容器），适合页面级响应式。@container 基于父容器宽度（需先 container-type: inline-size），组件根据可用空间自适应，适合可复用组件。使用：1) 父级声明 container-type: inline-size；2) 子级用 @container (min-width: 400px) { ... }。优势：组件级响应式，真正解耦组件与页面布局。劣势：兼容性较新（2023 年主流浏览器支持），旧项目需 polyfill。选型：可复用组件（卡片、侧边栏、表格）用容器查询；页面整体布局用媒体查询。',
              },
              {
                title: 'Q12: @layer 层叠层的作用与使用',
                content: '@layer 声明层叠层，显式控制样式优先级。声明顺序决定优先级：后声明的层优先级高。如 @layer reset, base, components, utilities; 中 utilities 层优先级最高，即使特异性低也会覆盖其他层。用途：1) 覆盖第三方库样式无需 !important；2) 组织样式架构（reset/base/components/utilities）；3) 解决样式覆盖难题。注意：未声明在层中的样式优先级高于所有层（"未分层样式"最强）。浏览器兼容性 2022 年后主流支持。选型：大型项目组织样式层；覆盖第三方库优先用 @layer 而非 !important。',
              },
              {
                title: 'Q13: CSS 变量如何实现主题切换',
                content: '原理：CSS 变量（自定义属性）运行时生效，可被 JS 操作与选择器覆盖。实现：1) :root 定义默认变量（--color-bg、--color-text 等）；2) [data-theme="dark"] 或 .dark 选择器覆盖变量值；3) 样式用 var() 引用变量。切换：JS 操作 document.documentElement.dataset.theme = "dark" 或 classList.toggle("dark")。优势：零运行时开销（纯 CSS）、切换瞬时、SSR 友好、可与 Tailwind dark: 变体配合。注意：变量继承 DOM 树，组件级变量可被父级覆盖（.hero { --card-padding: 32px }）；fallback 语法 var(--x, #fff) 防未定义。',
              },
              {
                title: 'Q14: CSS 作用域与样式隔离的方案',
                content: '方案一 Shadow DOM：Web Components 原生隔离，样式与子树完全封闭，外部无法渗透（除非用 ::part）。方案二 CSS Modules：编译时哈希类名，逻辑隔离（仍全局样式表，但类名唯一）。方案三 CSS-in-JS：运行时生成唯一类名（styled-components）或作用域容器（emotion css={...}）。方案四 @scope（新）：CSS 原生作用域，@scope (.card) { ... } 限定样式作用范围。方案五 iframe：物理隔离，但通信与样式注入复杂。选型：Web Components 用 Shadow DOM；React 组件用 CSS Modules 或 CSS-in-JS；样式隔离实验用 @scope（兼容性较新）。',
              },
              {
                title: 'Q15: CSS 性能优化方案',
                content: '1) 减少选择器复杂度：避免深层嵌套（.a .b .c .d）、避免通用选择器（*）、避免属性选择器过度使用。2) 减少回流重绘：transform/opacity 代替 top/left/width（触发合成层而非回流）；批量改样式用 class 切换；脱离文档流（display:none）操作。3) 减少样式表体积：PurgeCSS/Tailwind 按需生成移除未用类；cssnano 压缩；@import 改为 <link>（避免串行加载）。4) 关键 CSS 内联：首屏样式 inline 到 <head>，非关键 CSS 异步加载。5) CSS containment：contain: layout paint 隔离重排范围。6) will-careful 用 will-change 提示浏览器优化（但勿滥用）。',
              },
              {
                title: 'Q16: will-change 的作用与陷阱',
                content: 'will-change: transform 提示浏览器该元素即将变化，提前优化（创建合成层、预分配资源），用于动画/拖拽元素提升流畅度。陷阱：1) 滥用导致内存爆炸（每个 will-change 元素都创建合成层）；2) 长期保留 will-change 浪费资源（应在变化结束后移除）；3) 已用 transform 做动画时无需 will-change（浏览器已优化）。正确用法：在动画开始前设置（如 hover 时），动画结束后移除；或仅对频繁动画的元素长期设置。替代：CSS containment（contain）隔离重排范围，更轻量。',
              },
              {
                title: 'Q17: CSS Houdini 的能力与限制',
                content: 'CSS Houdini 让 JS 直接操作 CSS 引擎，扩展 CSS 能力。API：1) Paint API（自定义绘制，如实现气泡箭头、复杂背景）；2) Layout API（自定义布局，如实现 masonry 瀑布流）；3) Properties & Values API（注册自定义属性类型，如 @property --angle { syntax: "<angle>"; ... } 让变量参与动画）；4) Worklet（在独立线程跑自定义渲染逻辑）。优势：突破 CSS 原生限制，性能优（独立线程）。限制：兼容性差（Chrome 较好，Safari/Firefox 部分支持），生产用得少。@property 是最实用的子集，已用于高级动画（如渐变角度动画）。',
              },
              {
                title: 'Q18: :has() 选择器的作用与场景',
                content: ':has() 是父选择器（实际是"关系选择器"），让 CSS 能根据子元素状态选父级。如 .card:has(img) 选中含 img 的 .card；.form:has(input:invalid) 高亮含非法输入的表单。场景：1) 根据子元素状态样式化父级（以前需 JS）；2) 实现复杂条件样式（如"前一个兄弟是 h1 的 p 加 margin"）。兼容性 2023 年主流浏览器支持。注意：性能敏感场景慎用（需回溯检查），但浏览器已优化。:has() 是 CSS 选择器近年最大增强，替代大量 JS 交互逻辑。',
              },
              {
                title: 'Q19: CSS 调试技巧',
                content: '1) Chrome DevTools Elements 面板：实时编辑样式、查看计算值（Computed）、盒模型可视化。2) :hover/:focus 调试：在 Styles 面板点 :hov 触发伪类，无需实际交互。3) 选择器特异性：Styles 面板显示被覆盖规则（划线），可判断为何样式未生效。4) 层叠层调试：@layer 顺序影响优先级，用 Layers 面板查看。5) 未生效排查：检查选择器拼写、特异性、层叠层顺序、!important 滥用、CSS Modules 哈希、Tailwind 类名拼写。6) 性能：Performance 面板看 Layout/Recalculate Style 耗时，定位回流重绘热点。7) CSS overview 面板：统计配色/字号/对比度，发现设计系统不一致。',
              },
              {
                title: 'Q20: CSS 样式覆盖的优先级规则',
                content: '优先级（从低到高）：1) 浏览器默认样式（user-agent）；2) 用户样式（浏览器设置）；3) 作者样式（开发者写的 CSS）。作者样式内：1) !important > 普通；2) 层叠层（@layer）：未分层 > 后声明层 > 先声明层；3) 特异性：内联 style > ID > 类/属性/伪类 > 元素/伪元素（计算 a,b,c,d）；4) 来源顺序：后写的覆盖先写的。注意：!important 会破坏正常层叠，应优先用 @layer 或调整特异性；CSS Modules 哈希不影响特异性（仍是类选择器）；内联 style 可被 !important 覆盖但不可被普通规则覆盖。',
              },
              {
                title: 'Q21: CSS 加载与渲染阻塞',
                content: 'CSS 是渲染阻塞资源：浏览器需等 CSSOM 构建完才会渲染，避免 FOUC（无样式闪烁）。优化：1) 关键 CSS 内联到 <head>（首屏样式）；2) 非关键 CSS 异步加载（media="print" onload="this.media=\'all\'" 或 preload）；3) 减少 CSS 体积（PurgeCSS/压缩）；4) 避免 @import（串行加载，改用 <link> 并行）；5) preload 关键 CSS（<link rel="preload" as="style">）。注意：JS 执行会等 CSSOM（因 JS 可能读样式），CSS 阻塞渲染也间接阻塞 JS 执行。SSR 项目尤其要控制首屏 CSS 体积。',
              },
              {
                title: 'Q22: CSS 与 SEO/无障碍的关系',
                content: 'SEO：1) 语义化标签（<nav>/<main>/<article>）优于 div + class，搜索引擎理解结构；2) 隐藏内容用 .visually-hidden（clip/position）而非 display:none（后者不索引）；3) 关键内容在 DOM 前部（CSS 定位调整视觉顺序不影响 DOM 顺序）。无障碍：1) 颜色对比度（WCAG AA 4.5:1 文本、3:1 大文本）；2) :focus-visible 显示焦点轮廓（勿 outline:none 无替代）；3) 动画尊重 prefers-reduced-motion；4) 暗色模式对比度。CSS 工程化应将这些标准内置到设计 tokens（--color-text-contrast 等）。',
              },
              {
                title: 'Q23: 设计系统的 CSS 实现方案',
                content: '设计系统（Design System）包含 tokens、组件、规范，CSS 实现核心是 tokens 层。方案：1) CSS 变量做 tokens（--color-primary、--space-md、--radius），运行时可切换；2) Sass/Less 变量做编译期 tokens（配色/字号），编译后静态；3) Tailwind config 做 tokens（theme.extend.colors/spacing），约束设计系统；4) Style Dictionary 跨平台 tokens（Web/iOS/Android 共享）。组件层：CSS Modules 或 CSS-in-JS 或 Tailwind 组件类。现代主流：CSS 变量做主题 tokens + Tailwind 做工具类 + shadcn/ui 做组件层（基于 Radix Headless + Tailwind）。',
              },
              {
                title: 'Q24: Tailwind 的 @apply 指令',
                content: '@apply 在 CSS 中复用 Tailwind 工具类，如 .btn { @apply bg-blue-500 text-white p-4 rounded; }。用途：1) 抽取重复工具类组合为语义化类名（组件类）；2) 在第三方库样式中应用 Tailwind；3) 与 CSS 变量结合做主题化组件。争议：过度使用 @apply 会失去 Tailwind 的"无命名"优势，回到传统语义化类名。社区建议：简单组合用 @apply，复杂逻辑直接写工具类；@apply 适合组件封装层（如 .btn-primary），不适合业务页面。注意：@apply 不能应用 @screen、@variant 等特殊指令；Tailwind v4 调整了 @apply 语义。',
              },
              {
                title: 'Q25: CSS Modules 的 composes 用法',
                content: 'composes 复用其他类样式，类似 Sass @extend 但作用域在模块内。用法：1) 同文件 composes: btn;（.primary { composes: btn; background: blue; }）；2) 跨文件 composes: btn from "./button.module.css";。编译后类名组合：class="Button_btn__a1b2 Button_primary__d3e4"，样式叠加。优势：编译时保证唯一、无运行时、与框架解耦。与 @extend 区别：composes 是模块级（不跨文件除非显式 import），@extend 是全局（易选择器爆炸）。与 Tailwind 区别：composes 仍是语义化类名，Tailwind 是原子类无命名。',
              },
              {
                title: 'Q26 【场景题】: 老项目从 Sass 迁移到 Tailwind，如何评估与执行',
                content: '评估：1) 项目规模与团队熟悉度（团队抗拒则失败）；2) 现有设计系统是否约束（Sass 自由配色难迁移）；3) 组件复用程度（高复用适合 Tailwind 约束）。执行步骤：1) 渐进迁移，非大爆炸重写（先新页面用 Tailwind，旧页面保留 Sass）；2) 配置 tailwind.config.js 映射现有设计 tokens（colors 映射 Sass 变量值）；3) 提取重复工具类组合为组件类（@apply）；4) 旧 Sass 文件用 PurgeCSS 移除未用样式；5) 团队培训与代码评审。风险：类名冗长可读性下降、设计系统漂移、与 CSS Modules 兼容（混用）。回退方案：保留 Sass，仅新项目用 Tailwind。',
              },
              {
                title: 'Q27 【场景题】: 首屏 LCP 慢，定位到 CSS 阻塞，如何优化',
                content: '排查：1) DevTools Network 看 CSS 加载顺序与体积；2) Performance 看渲染阻塞时间（CSSOM 构建耗时）；3) Lighthouse 看 LCP 元素与阻塞资源。优化方案：1) 关键 CSS（首屏用到的样式）内联到 <head>（<style> 标签），消除阻塞；2) 非关键 CSS 异步加载（media="print" onload、preload）；3) 压缩 CSS（cssnano）、移除未用样式（PurgeCSS）；4) 避免 @import（串行加载，改 <link> 并行）；5) 拆分 CSS 按路由加载（如 Vue/React 路由级 CSS）；6) preload 关键 CSS（<link rel="preload" as="style">）；7) 减少选择器复杂度加速 CSSOM 解析。验证：Lighthouse LCP < 2.5s，Coverage 工具看未用 CSS 占比。',
              },
              {
                title: 'Q28 【对比题】: CSS Modules vs CSS-in-JS',
                content: 'CSS Modules：编译时哈希类名，零运行时，与框架解耦（Vue/React/原生都支持），SSR 友好。劣势：动态主题需借 CSS 变量，跨组件复用较弱（composes）。CSS-in-JS：运行时（styled-components）或零运行时（Vanilla Extract），样式与组件耦合，支持完全动态主题（props 驱动），TypeScript 类型安全。劣势：运行时方案有性能开销与 SSR 复杂，React 18 并发渲染下受诟病。选型：SSR/性能敏感用 CSS Modules；需完全动态样式（如根据 props 变色）用零运行时 CSS-in-JS；纯静态项目两者皆可，CSS Modules 更轻。',
              },
              {
                title: 'Q29 【对比题】: Tailwind vs 传统 BEM + Sass',
                content: 'Tailwind：原子类无命名，约束设计系统，按需生成体积小，移动优先响应式便捷。劣势：类名冗长、HTML 可读性差、学习曲线、强约束可能限制创意。BEM + Sass：语义化类名可读，Sass 提供变量/嵌套/Mixin 增强表达力，团队熟悉。劣势：命名靠人工遵守易冲突，样式体积大（写多少用多少），设计系统约束弱。选型：快速开发/中后台/设计系统约束用 Tailwind；复杂视觉/团队抗拒原子化/需强语义化用 BEM + Sass。现代实践：两者可混用，Tailwind 做布局与原子，BEM 做复杂组件，Sass 变量做编译期常量。',
              },
              {
                title: 'Q30 【对比题】: 媒体查询 @media vs 容器查询 @container',
                content: '@media：基于视口宽度（min-width: 768px），全局唯一参照系，组件在不同位置表现一致。优势：兼容性好（IE9+）、简单。劣势：无法感知容器，组件在窄侧边栏与宽主区域表现一致。@container：基于父容器宽度（需先 container-type: inline-size），组件根据可用空间自适应。优势：组件级响应式、真正解耦组件与页面、可复用。劣势：兼容性较新（2023 年主流支持）、需显式声明 container-type。选型：可复用组件（卡片、表格、侧边栏）用容器查询；页面整体布局用媒体查询；两者可配合（页面用媒体查询，组件内用容器查询）。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 20：知识点速查表
    // ========================================================================
    {
      order: 20,
      title: '知识点速查表',
      difficulty: 1,
      isNew: true,
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          lead: true,
          text: '浓缩 CSS 工程化各方案的核心语法与要点，复习时快速定位关键点。',
        },
        {
          id: 'p20-2',
          type: 'table',
          caption: 'CSS 工程化核心知识点速查',
          headers: ['主题', '核心语法 / API', '要点提示'],
          rows: [
            ['Sass 变量', '$primary: #3b82f6;', '编译时确定；支持颜色/数字/列表/map；块级作用域'],
            ['CSS 变量', '--color-primary: #3b82f6; var(--color-primary)', '运行时生效；可被 JS 操作与选择器覆盖；继承 DOM 树'],
            ['Sass 嵌套', '.card { &__title { } }', '& 引用父选择器；避免深层嵌套（>3 层反模式）'],
            ['Sass Mixin', '@mixin name($arg) { } @include name(x);', '复用样式块支持参数；输出到每个使用位置'],
            ['Sass extend', '%base { } .a { @extend %base; }', '继承选择器生成分组（.a, .b）；易选择器爆炸'],
            ['BEM', '.block__element--modifier', 'Block 独立单元；__Element 子部分；--Modifier 状态变体'],
            ['Tailwind 断点', 'sm: md: lg: xl: 2xl: (640/768/1024/1280/1536)', '移动优先；默认针对最小屏；前缀针对 min-width'],
            ['Tailwind 变体', 'hover: focus: dark: group-hover:', '变体前缀实现交互/状态/暗色模式；可叠加 hover:dark:bg-x'],
            ['Tailwind @apply', '.btn { @apply bg-blue-500 p-4; }', 'CSS 中复用工具类；适合组件封装层；勿滥用'],
            ['CSS Modules', '*.module.css; .btn 哈希为 Button_btn__a1b2', '编译时自动哈希；composes 复用；:global 全局类'],
            ['CSS-in-JS', 'styled.button`color: red` (运行时)', '样式与组件耦合；支持动态主题；SSR 复杂'],
            ['Zero-Runtime', 'Vanilla Extract/Linaria/Panda CSS', '编译时生成静态 CSS；无运行时开销；动态主题受限'],
            ['PostCSS', 'postcss.config.js + 插件', 'CSS 后处理器；autoprefixer/cssnano/preset-env'],
            ['autoprefixer', '自动加 -webkit-/-moz- 等前缀', '基于 browserslist；无需手写前缀'],
            ['@container', 'container-type: inline-size; @container (min-width: 400px)', '基于父容器宽度；组件级响应式；2023 主流支持'],
            ['@layer', '@layer reset, base, components;', '显式控制优先级；后声明层优先；未分层样式最强'],
            [':has()', '.card:has(img) { }', '父选择器（关系选择器）；根据子元素状态选父级'],
            ['CSS 变量主题', ':root { --x } [data-theme="dark"] { --x }', '切换 data-theme 或 class 即切换主题；零运行时'],
            ['composes', '.primary { composes: btn; }', 'CSS Modules 内复用样式；编译为类名组合'],
            ['prefers-color-scheme', '@media (prefers-color-scheme: dark)', '跟随系统暗色模式；可配合 class 策略手动切换'],
            ['contain', 'contain: layout paint style;', '隔离重排重绘范围；性能优化；will-change 替代'],
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 21：CSS 工程化小测验
    // ========================================================================
    {
      order: 21,
      title: 'CSS 工程化小测验',
      difficulty: 3,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p21-1',
          type: 'paragraph',
          lead: true,
          text: '通过以下 20 道题目巩固 CSS 工程化核心知识点，涵盖 Sass、Tailwind、CSS Modules、CSS-in-JS、CSS 架构、现代 CSS 特性，含记忆/理解/应用三梯度。',
        },
        {
          id: 'p21-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '【记忆】Tailwind CSS 的设计理念是什么？',
                options: [
                  '组件优先，提供预制组件',
                  '实用优先，提供原子化工具类',
                  'OOCSS，分离结构与皮肤',
                  'BEM，严格的命名规范',
                ],
                correctIndex: 1,
                explanation: 'Tailwind 采用实用优先（Utility-first）理念，提供 bg-blue-500、p-4 等原子化工具类，直接在 HTML 中组合，无需编写自定义 CSS。',
              },
              {
                question: '【记忆】Sass 中 @extend 和 @mixin 的主要区别是什么？',
                options: [
                  '@extend 支持参数，@mixin 不支持',
                  '@mixin 复用样式块（支持参数），@extend 继承选择器',
                  '@extend 性能更好，@mixin 已废弃',
                  '两者完全等价，可互换使用',
                ],
                correctIndex: 1,
                explanation: '@mixin 复用样式块且支持参数，输出到每个使用位置；@extend 继承选择器，生成分组选择器（.a, .b）。需要参数用 Mixin，纯共享样式用 extend。',
              },
              {
                question: '【记忆】CSS Modules 如何解决命名冲突？',
                options: [
                  '使用 BEM 命名规范',
                  '编译时为类名添加唯一哈希',
                  '通过 JavaScript 动态生成类名',
                  '使用 CSS 变量隔离作用域',
                ],
                correctIndex: 1,
                explanation: 'CSS Modules 在编译时为类名添加唯一哈希（如 Button_primary__a1b2c），实现局部作用域，彻底解决命名冲突，无需人工遵守命名规范。',
              },
              {
                question: '【记忆】Tailwind 的移动优先响应式中，md: 前缀对应的最小宽度是多少？',
                options: ['640px', '768px', '1024px', '1280px'],
                correctIndex: 1,
                explanation: 'Tailwind 默认断点：sm=640px、md=768px、lg=1024px、xl=1280px、2xl=1536px。md: 对应 min-width: 768px，针对平板设备。',
              },
              {
                question: '【记忆】CSS 变量与 Sass 变量的关键区别是什么？',
                options: [
                  'CSS 变量性能更好',
                  'CSS 变量运行时生效，Sass 变量编译时确定',
                  'Sass 变量支持更多数据类型',
                  'CSS 变量需要浏览器插件支持',
                ],
                correctIndex: 1,
                explanation: 'Sass 变量在编译时确定为静态值，无法运行时修改。CSS 变量（自定义属性）在运行时生效，可通过 JS 操作、媒体查询覆盖，实现动态主题切换。',
              },
              {
                question: '【记忆】@layer 层叠层的主要作用是什么？',
                options: [
                  '压缩 CSS 文件体积',
                  '自动添加浏览器前缀',
                  '显式控制样式优先级，解决样式覆盖难题',
                  '实现 CSS 模块化导入',
                ],
                correctIndex: 2,
                explanation: '@layer 声明层叠层，显式控制优先级。低优先级层的规则即使特异性高也会被高优先级层覆盖，无需 !important 即可覆盖第三方库样式。',
              },
              {
                question: '【记忆】BEM 命名规范中，.card__title--active 表示什么？',
                options: [
                  'card 组件的 title 元素的 active 修饰符',
                  'card 组件的 active 元素',
                  'title 组件的 card 修饰符',
                  'active 组件的 title 元素',
                ],
                correctIndex: 0,
                explanation: 'BEM 格式 Block__Element--Modifier。.card__title--active 中 card 是块（Block），title 是元素（Element），active 是修饰符（Modifier）。',
              },
              {
                question: '【记忆】容器查询 @container 与媒体查询 @media 的核心区别是什么？',
                options: [
                  '容器查询性能更好',
                  '容器查询基于父容器宽度，媒体查询基于视口宽度',
                  '容器查询支持更多条件',
                  '媒体查询已废弃，应使用容器查询',
                ],
                correctIndex: 1,
                explanation: '媒体查询基于视口宽度，组件在不同位置表现一致。容器查询基于父容器宽度，组件根据可用空间自适应，实现真正的组件级响应式，适合可复用组件。',
              },
              {
                question: '【理解】PostCSS 与 Sass 的本质区别是什么？',
                options: [
                  'PostCSS 是预处理器，Sass 是后处理器',
                  'PostCSS 是后处理器转换 CSS AST，Sass 是预处理器增强语法',
                  '两者都是预处理器，仅语法不同',
                  'PostCSS 只能压缩，Sass 才能加前缀',
                ],
                correctIndex: 1,
                explanation: 'Sass 增强语法（变量/嵌套/Mixin），生成新 CSS；PostCSS 是后处理器，转换现有 CSS 的 AST（前缀/降级/优化）。现代项目 PostCSS 是事实标准，autoprefixer/Tailwind 都基于它。',
              },
              {
                question: '【理解】CSS-in-JS 运行时方案与零运行时方案的主要区别是什么？',
                options: [
                  '运行时方案体积更小',
                  '零运行时方案编译时生成静态 CSS，无运行时开销但动态主题受限',
                  '零运行时方案已废弃',
                  '运行时方案不支持动态主题',
                ],
                correctIndex: 1,
                explanation: '运行时方案（styled-components）浏览器动态生成样式，支持完全动态主题但有开销；零运行时方案（Vanilla Extract）编译时生成静态 CSS，无开销但动态主题需借 CSS 变量。',
              },
              {
                question: '【理解】Tailwind 移动优先响应式与桌面优先的根本区别是什么？',
                options: [
                  '移动优先默认样式针对最小屏，断点前缀针对 min-width 升级',
                  '移动优先只支持手机，不支持桌面',
                  '移动优先体积更小',
                  '桌面优先性能更好',
                ],
                correctIndex: 0,
                explanation: '移动优先：默认样式针对最小屏，md: 前缀（min-width: 768px）针对平板及以上升级。桌面优先相反，默认针对桌面，max-md: 针对 max-width 降级。现代项目主流移动优先。',
              },
              {
                question: '【理解】CSS Modules 的 composes 与 Sass @extend 的关键区别是什么？',
                options: [
                  'composes 是全局的，@extend 是模块级的',
                  'composes 是模块级（除非显式 import），@extend 是全局易选择器爆炸',
                  'composes 不支持跨文件，@extend 支持',
                  '两者完全等价',
                ],
                correctIndex: 1,
                explanation: 'composes 作用域在模块内（除非 from 显式 import），编译为类名组合；@extend 是全局的，生成分组选择器（.a, .b），易选择器爆炸。composes 更安全可控。',
              },
              {
                question: '【理解】@layer 中"未分层样式"与"分层样式"的优先级关系是什么？',
                options: [
                  '未分层样式优先级最低',
                  '未分层样式优先级最高，覆盖所有层',
                  '两者优先级相同',
                  '取决于声明顺序',
                ],
                correctIndex: 1,
                explanation: '@layer 中，未声明在任何层中的样式（"未分层样式"）优先级最高，覆盖所有分层样式。分层样式间，后声明的层优先级高于先声明的层。这是 @layer 的关键规则。',
              },
              {
                question: '【理解】ITCSS 的分层思想是什么？',
                options: [
                  '从具体到通用分层，上层依赖下层',
                  '从通用到具体分层（Settings→Tools→Generic→Elements→Objects→Components→Utilities），下层可用上层',
                  '不分层，所有样式平等',
                  '只分两层：基础与组件',
                ],
                correctIndex: 1,
                explanation: 'ITCSS（倒三角 CSS）从通用到具体分 7 层：Settings/Tokens（变量）→Tools（Mixin）→Generic（reset）→Elements（标签）→Objects（布局）→Components（组件）→Utilities（工具类）。下层可用上层，不可反向。',
              },
              {
                question: '【应用】以下哪个场景最适合用容器查询 @container？',
                options: [
                  '页面整体布局随视口变化',
                  '可复用卡片组件在不同容器宽度下自适应',
                  '主题色切换',
                  '压缩 CSS 体积',
                ],
                correctIndex: 1,
                explanation: '容器查询基于父容器宽度，适合可复用组件（卡片、表格、侧边栏）在不同位置自适应。页面整体布局用媒体查询；主题切换用 CSS 变量；压缩用 PostCSS。',
              },
              {
                question: '【应用】实现暗色模式切换，最佳方案是什么？',
                options: [
                  '用 Sass 变量定义两套主题，编译切换',
                  '用 CSS 变量 + [data-theme="dark"] 选择器覆盖，JS 切换 data 属性',
                  '用 @media 强制覆盖所有样式',
                  '用 !important 强制切换颜色',
                ],
                correctIndex: 1,
                explanation: 'CSS 变量运行时生效，:root 定义默认值，[data-theme="dark"] 覆盖变量值，样式用 var() 引用。JS 切换 document.documentElement.dataset.theme 即瞬时切换，零运行时开销，SSR 友好。',
              },
              {
                question: '【应用】要覆盖第三方库样式但不污染全局，最佳实践是？',
                options: [
                  '直接用 !important 强制覆盖',
                  '用 @layer 声明层叠层，将覆盖样式放在更高优先级层',
                  '删除第三方库样式表',
                  '用内联 style 覆盖',
                ],
                correctIndex: 1,
                explanation: '@layer 显式控制优先级，将覆盖样式放在更高优先级层，即使特异性低也能覆盖第三方库样式，无需 !important。注意未分层样式优先级最高，第三方库若未分层需把覆盖也放未分层或更高层。',
              },
              {
                question: '【应用】CSS Modules 中要复用其他文件的 .btn 样式，正确写法是？',
                options: [
                  '.primary { @extend btn; }',
                  '.primary { composes: btn from "./button.module.css"; }',
                  'import btn from "./button.module.css"',
                  '.primary { @apply btn; }',
                ],
                correctIndex: 1,
                explanation: 'composes 跨文件复用语法：composes: btn from "./button.module.css";。编译后类名组合（Button_btn__a1b2 Button_primary__d3e4）。同文件用 composes: btn;。@extend 是 Sass 语法，@apply 是 Tailwind 语法。',
              },
              {
                question: '【对比】CSS Modules 与 CSS-in-JS 的核心区别是什么？',
                options: [
                  'CSS Modules 有运行时开销，CSS-in-JS 没有',
                  'CSS Modules 编译时哈希零运行时，CSS-in-JS 运行时方案支持完全动态主题',
                  '两者完全等价',
                  'CSS Modules 只支持 Vue，CSS-in-JS 只支持 React',
                ],
                correctIndex: 1,
                explanation: 'CSS Modules 编译时哈希类名，零运行时，与框架解耦，SSR 友好，但动态主题需借 CSS 变量。CSS-in-JS 运行时方案（styled-components）支持 props 驱动完全动态主题，但有开销与 SSR 复杂。',
              },
              {
                question: '【对比】媒体查询 @media 与容器查询 @container 的核心区别是什么？',
                options: [
                  '媒体查询基于视口宽度，容器查询基于父容器宽度',
                  '媒体查询性能更好',
                  '容器查询已废弃',
                  '两者完全等价',
                ],
                correctIndex: 0,
                explanation: '@media 基于视口宽度，组件在不同位置表现一致，适合页面级响应式。@container 基于父容器宽度（需 container-type: inline-size），组件根据可用空间自适应，适合可复用组件。可配合使用。',
              },
            ],
          },
        },
      ],
    },
  ],
}
