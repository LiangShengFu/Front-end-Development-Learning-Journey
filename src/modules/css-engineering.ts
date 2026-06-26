/**
 * 模块 06：CSS 工程化与样式方案
 *
 * 严格遵循 docx/PROJECT_CONTENT.md 与 docx/模块六.md 设计文档：
 * - 17 个知识点（16 章节 + 1 小测验）
 * - 10 个可视化演示
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
  knowledgePointCount: 17,
  visualizationCount: 10,
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
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS 工程化涵盖预处理器、原子化框架、CSS Modules、CSS-in-JS、PostCSS、CSS 架构方法论、现代 CSS 特性等。理解各方案定位与适用场景，才能做出合理选型。',
        },
        {
          id: 'p16-2',
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
          id: 'p16-3',
          type: 'callout',
          variant: 'tip',
          title: '选型决策树',
          text: '小型项目→原生 CSS；中后台→Ant Design + CSS Modules；快速原型→Tailwind + Chakra；设计系统→Radix + Tailwind（shadcn/ui）；高度动态主题→CSS 变量 + Zero-Runtime CSS-in-JS。',
        },
        {
          id: 'p16-4',
          type: 'callout',
          variant: 'info',
          title: '现代趋势',
          text: 'CSS 原生能力增强（容器查询、@layer、:has()、CSS 变量）正在减少对预处理器的依赖。Tailwind + Headless UI + CSS 变量成为主流组合，兼顾开发效率、性能、可访问性。',
        },
      ],
    },

    // ========================================================================
    // 知识点 17：CSS 工程化测验
    // ========================================================================
    {
      order: 17,
      title: 'CSS 工程化测验',
      difficulty: 1,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: '通过以下 8 道题目巩固 CSS 工程化核心知识点，涵盖 Sass、Tailwind、CSS Modules、CSS-in-JS、CSS 架构、现代 CSS 特性。',
        },
        {
          id: 'p17-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'Tailwind CSS 的设计理念是什么？',
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
                question: 'Sass 中 @extend 和 @mixin 的主要区别是什么？',
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
                question: 'CSS Modules 如何解决命名冲突？',
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
                question: 'Tailwind 的移动优先响应式中，md: 前缀对应的最小宽度是多少？',
                options: ['640px', '768px', '1024px', '1280px'],
                correctIndex: 1,
                explanation: 'Tailwind 默认断点：sm=640px、md=768px、lg=1024px、xl=1280px、2xl=1536px。md: 对应 min-width: 768px，针对平板设备。',
              },
              {
                question: 'CSS 变量与 Sass 变量的关键区别是什么？',
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
                question: '@layer 层叠层的主要作用是什么？',
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
                question: 'BEM 命名规范中，.card__title--active 表示什么？',
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
                question: '容器查询 @container 与媒体查询 @media 的核心区别是什么？',
                options: [
                  '容器查询性能更好',
                  '容器查询基于父容器宽度，媒体查询基于视口宽度',
                  '容器查询支持更多条件',
                  '媒体查询已废弃，应使用容器查询',
                ],
                correctIndex: 1,
                explanation: '媒体查询基于视口宽度，组件在不同位置表现一致。容器查询基于父容器宽度，组件根据可用空间自适应，实现真正的组件级响应式，适合可复用组件。',
              },
            ],
          },
        },
      ],
    },
  ],
}
