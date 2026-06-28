/**
 * 模块 02：CSS 基础与核心原理
 *
 * 完整实现 24 个知识点，涵盖 CSS 发展历程、选择器、盒模型、Flex/Grid、
 * 定位、层叠上下文、响应式、单位体系、动画、CSS 变量、继承、浮动等核心概念，
 * 含 2 个综合实战项目、面试题、速查表与小测验。使用 30 个可视化组件辅助理解。
 */
import type { ModuleMeta } from '../lib/types'

export const cssFundamentalsModule: ModuleMeta = {
  number: '02',
  title: 'CSS 基础与核心原理',
  slug: 'css-fundamentals',
  stage: 'basics',
  stageLabel: '基础阶段 · 第 2 模块',
  icon: '02',
  summary: '选择器、盒模型、Flex/Grid、定位、层叠上下文、响应式与动画。',
  knowledgePointCount: 24,
  visualizationCount: 30,
  points: [
    // ========================================================================
    // 知识点 1：CSS 引入方式
    // ========================================================================
    {
      order: 1,
      title: 'CSS 引入方式',
      difficulty: 1,
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS（Cascading Style Sheets，层叠样式表）负责网页的视觉表现。将样式与结构分离是 Web 标准的核心理念。CSS 有三种引入方式，各有适用场景。',
        },
        {
          id: 'p1-2',
          type: 'heading',
          level: 3,
          text: '三种引入方式',
        },
        {
          id: 'p1-3',
          type: 'code',
          language: 'html',
          filename: '三种引入方式对比',
          code: `<!-- 1. 行内样式（Inline）：直接写在 HTML 元素的 style 属性中 -->
<p style="color: red; font-size: 16px;">行内样式文本</p>

<!-- 2. 内部样式（Internal）：写在 <style> 标签中，位于 <head> 内 -->
<style>
  p { color: blue; font-size: 16px; }
</style>

<!-- 3. 外部样式（External）：通过 <link> 引入独立 .css 文件（推荐） -->
<link rel="stylesheet" href="styles.css" />`,
        },
        {
          id: 'p1-4',
          type: 'callout',
          variant: 'tip',
          title: '推荐使用外部样式',
          text: '外部样式表实现了结构与样式的完全分离，可被多个页面复用，浏览器缓存后加快后续加载。行内样式仅用于一次性、动态计算的样式覆盖。',
        },
        {
          id: 'p1-5',
          type: 'heading',
          level: 3,
          text: '@import 导入',
        },
        {
          id: 'p1-6',
          type: 'code',
          language: 'css',
          code: `/* 在 CSS 文件中导入其他 CSS 文件 */
@import url('reset.css');
@import url('variables.css');

/* 注意：@import 必须出现在文件顶部，否则无效 */
/* @import 会阻塞并行下载，性能不如 <link>，不推荐大量使用 */`,
        },
        {
          id: 'p1-7',
          type: 'list',
          items: [
            '行内样式：优先级最高，但无法复用，维护困难，不推荐。',
            '内部样式：适合单页面的少量样式，无需额外请求。',
            '外部样式：推荐方式，支持缓存、复用、并行下载。',
            '@import：CSS 内部导入，性能较差，避免使用。',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 2：CSS 发展历程（Timeline）
    // ========================================================================
    {
      order: 2,
      title: 'CSS 发展历程',
      difficulty: 1,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p2-hist-1',
          type: 'paragraph',
          text: 'CSS 从 1996 年的 CSS 1 发展到今天的现代 CSS，经历了多个重要版本演进。了解 CSS 发展历程有助于理解当前特性的设计动机与最佳实践。',
        },
        {
          id: 'p2-hist-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              {
                time: '1996',
                title: 'CSS 1',
                description: 'W3C 推荐标准。基础选择器与属性，支持字体/颜色/背景/文本样式。',
                status: 'done',
              },
              {
                time: '1998',
                title: 'CSS 2',
                description: '引入 position 定位、伪元素 ::before/::after、表格布局、媒体类型。',
                status: 'done',
              },
              {
                time: '2011',
                title: 'CSS 2.1',
                description: 'CSS 2 的修订版，移除不常用特性，成为浏览器实现基础。',
                status: 'done',
              },
              {
                time: '2017',
                title: 'CSS3 模块化',
                description: 'Flexbox 弹性布局、Grid 网格布局、动画与过渡、圆角/阴影/渐变。',
                status: 'done',
              },
              {
                time: '2023',
                title: '现代 CSS',
                description: '容器查询 @container、CSS 嵌套、:has() 父选择器、@layer 级联层。',
                status: 'active',
              },
              {
                time: '2025',
                title: 'CSS 新纪元',
                description: 'View Transitions API、light-dark() 原生主题、color-mix() 颜色混合、Baseline 标准。',
                status: 'active',
              },
            ],
          },
        },
        {
          id: 'p2-hist-3',
          type: 'callout',
          variant: 'tip',
          title: '模块化演进',
          text: 'CSS3 之后不再有单一大版本，而是分模块独立演进（Flexbox、Grid、Animations 等各自迭代）。现代 CSS 通过 Baseline 标准标识浏览器兼容性，开发者可放心使用 Widely Available 特性。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：选择器体系（KnowledgeGraph + SelectorPlayground）
    // ========================================================================
    {
      order: 3,
      title: '选择器体系（10+ 种选择器）',
      difficulty: 2,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'CSS 选择器是匹配 HTML 元素的模式。掌握选择器体系是精确控制样式的基础。选择器从基础到高级可分为五大类。',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'basic', label: '基础选择器', group: 'core', weight: 3 },
              { id: 'universal', label: '通配 *', group: 'basic' },
              { id: 'type', label: '标签 div', group: 'basic' },
              { id: 'class', label: '类 .box', group: 'basic' },
              { id: 'id', label: 'ID #app', group: 'basic' },
              { id: 'attr', label: '属性 [type]', group: 'basic' },
              { id: 'combinator', label: '组合选择器', group: 'core', weight: 3 },
              { id: 'descendant', label: '后代 A B', group: 'combinator' },
              { id: 'child', label: '子代 A>B', group: 'combinator' },
              { id: 'adjacent', label: '相邻 A+B', group: 'combinator' },
              { id: 'general', label: '兄弟 A~B', group: 'combinator' },
              { id: 'pseudo', label: '伪类与伪元素', group: 'core', weight: 3 },
              { id: 'pc-state', label: '状态 :hover', group: 'pseudo' },
              { id: 'pc-struct', label: '结构 :nth-child', group: 'pseudo' },
              { id: 'pc-not', label: '否定 :not()', group: 'pseudo' },
              { id: 'pe', label: '伪元素 ::before', group: 'pseudo' },
              { id: 'group', label: '分组 A, B', group: 'core', weight: 2 },
            ],
            edges: [
              { source: 'basic', target: 'universal' },
              { source: 'basic', target: 'type' },
              { source: 'basic', target: 'class' },
              { source: 'basic', target: 'id' },
              { source: 'basic', target: 'attr' },
              { source: 'combinator', target: 'descendant' },
              { source: 'combinator', target: 'child' },
              { source: 'combinator', target: 'adjacent' },
              { source: 'combinator', target: 'general' },
              { source: 'pseudo', target: 'pc-state' },
              { source: 'pseudo', target: 'pc-struct' },
              { source: 'pseudo', target: 'pc-not' },
              { source: 'pseudo', target: 'pe' },
            ],
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'css',
          filename: '选择器示例',
          code: `/* 基础选择器 */
* { margin: 0; }              /* 通配选择器 */
div { display: block; }       /* 标签选择器 */
.card { padding: 16px; }      /* 类选择器 */
#header { height: 60px; }     /* ID 选择器 */
[type="text"] { border: 1px solid; } /* 属性选择器 */

/* 组合选择器 */
.list .item { }      /* 后代：.list 内所有 .item */
.list > .item { }    /* 子代：.list 的直接子级 .item */
h2 + p { }           /* 相邻兄弟：h2 后紧邻的 p */
h2 ~ p { }           /* 通用兄弟：h2 后所有同级 p */

/* 伪类与伪元素 */
a:hover { color: red; }              /* 状态伪类 */
li:nth-child(odd) { }                /* 结构伪类 */
input:not([disabled]) { }            /* 否定伪类 */
p::before { content: ''; }           /* 伪元素 */

/* 分组选择器 */
h1, h2, h3 { font-weight: bold; }`,
        },
        {
          id: 'p2-4',
          type: 'demo',
          visualizationType: 'selector-playground',
          data: {
            title: '选择器演练场 · 实时匹配',
            defaultSelector: '.link',
            quickSelectors: ['div', '.link', '#header', '.item', 'a', 'div > .item', '.list .link', ':not(.item)'],
            sampleElements: [
              { tag: 'div', id: 'header', text: 'Header', indent: 0, block: true },
              { tag: 'div', classes: ['nav'], indent: 1, block: true },
              { tag: 'a', classes: ['link'], text: '首页', indent: 2 },
              { tag: 'a', classes: ['link'], text: '产品', indent: 2 },
              { tag: 'a', classes: ['link', 'active'], text: '关于', indent: 2 },
              { tag: 'div', classes: ['list'], indent: 1, block: true },
              { tag: 'div', classes: ['item'], text: 'Item 1', indent: 2, block: true },
              { tag: 'div', classes: ['item'], text: 'Item 2', indent: 2, block: true },
              { tag: 'span', classes: ['badge'], text: 'New', indent: 2 },
            ],
          },
        },
        {
          id: 'p2-5',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            title: '选择器分类速查',
            items: [
              {
                title: '基础选择器',
                content: '通配 *、标签 div、类 .box、ID #app、属性 [type="text"]。属性选择器支持 ^=、$=、*= 等模糊匹配。',
              },
              {
                title: '组合选择器',
                content: '后代 A B、子代 A>B、相邻兄弟 A+B、通用兄弟 A~B。组合选择器用于表达元素间的结构关系。',
              },
              {
                title: '伪类（状态与结构）',
                content: '状态伪类：:hover、:focus、:active、:checked。结构伪类：:nth-child(n)、:first-child、:last-child、:not()、:is()、:where()。',
              },
              {
                title: '伪元素',
                content: '::before、::after、::first-line、::first-letter、::selection。伪元素用于插入生成内容或样式化特定文本片段。',
              },
              {
                title: '分组选择器',
                content: 'A, B, C 用逗号分隔，将同一规则应用于多个选择器。CSS 原生嵌套（2023+）可在选择器内部直接写嵌套规则。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 4：选择器优先级计算（CodeStepper）
    // ========================================================================
    {
      order: 4,
      title: '选择器优先级计算',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          text: '当多条规则匹配同一元素时，浏览器通过优先级（Specificity）决定应用哪条规则。优先级用四位数 (a, b, c, d) 表示，从左到右依次比较。',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '#nav .item { color: red; }      /* (0,1,1,0) */',
              'div.item { color: blue; }       /* (0,0,1,1) */',
              '.item { color: green; }         /* (0,0,1,0) */',
              'div { color: gray; }            /* (0,0,0,1) */',
            ],
            language: 'css',
            steps: [
              {
                title: '优先级四位数规则',
                description: 'a = 行内样式（style 属性）记 1，否则 0。b = ID 选择器数量。c = 类、属性、伪类数量。d = 标签、伪元素数量。通配 * 和继承不计优先级。',
                highlightLines: [1, 2, 3, 4],
              },
              {
                title: '#nav .item → (0,1,1,0)',
                description: '1 个 ID（#nav）→ b=1；1 个类（.item）→ c=1。优先级最高，color 为 red。',
                highlightLines: [1],
              },
              {
                title: 'div.item → (0,0,1,1)',
                description: '1 个类（.item）→ c=1；1 个标签（div）→ d=1。优先级第二。',
                highlightLines: [2],
              },
              {
                title: '.item → (0,0,1,0)',
                description: '1 个类（.item）→ c=1。优先级第三。',
                highlightLines: [3],
              },
              {
                title: 'div → (0,0,0,1)',
                description: '1 个标签（div）→ d=1。优先级最低。',
                highlightLines: [4],
              },
              {
                title: '!important 覆盖一切',
                description: '!important 会打破正常优先级，强制应用。但应尽量避免使用，维护困难。行内样式 + !important 是最高优先级。',
                highlightLines: [1, 2, 3, 4],
              },
            ],
          },
        },
        {
          id: 'p3-3',
          type: 'callout',
          variant: 'warning',
          title: '优先级比较方向',
          text: '从左到右逐位比较，左边大的整体就大。(0,1,0,0) > (0,0,99,99) — 一个 ID 选择器优先级高于任意数量的类选择器。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：伪类与伪元素（CompareTable）
    // ========================================================================
    {
      order: 5,
      title: '伪类与伪元素',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          text: '伪类（pseudo-class）是选择器，匹配处于特定状态的元素；伪元素（pseudo-element）创建不存在于文档树中的虚拟元素。CSS3 规范用单冒号表示伪类，双冒号表示伪元素。',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['伪类（:）', '伪元素（::）'],
            rows: [
              { feature: '语法', values: ['单冒号 :hover', '双冒号 ::before'] },
              { feature: '作用', values: ['匹配已有元素的特定状态', '创建虚拟元素'] },
              { feature: '文档树', values: ['元素存在于 DOM 中', '元素不存在于 DOM 中'] },
              { feature: '数量限制', values: ['一个元素可有多个伪类', '一个元素最多一个 ::before 和一个 ::after'] },
              { feature: '常见示例', values: [':hover :focus :nth-child :not() :first-child', '::before ::after ::first-line ::first-letter ::selection'] },
              { feature: '必须配合', values: ['content 属性不需要', 'content 属性（::before/::after 必须）'] },
            ],
            highlightColumn: 1,
          },
        },
        {
          id: 'p4-3',
          type: 'code',
          language: 'css',
          filename: '伪类与伪元素示例',
          code: `/* 伪类：匹配状态 */
a:link { color: blue; }         /* 未访问链接 */
a:hover { color: red; }         /* 鼠标悬停 */
a:visited { color: purple; }    /* 已访问链接 */
input:focus { border-color: blue; } /* 获得焦点 */
li:nth-child(odd) { background: #f5f5f5; } /* 奇数行 */
li:not(:last-child) { border-bottom: 1px solid; } /* 非末项 */

/* 伪元素：创建虚拟元素 */
.quote::before { content: '"'; color: gray; }     /* 前置引号 */
.quote::after { content: '"'; color: gray; }      /* 后置引号 */
p::first-line { font-weight: bold; }              /* 首行加粗 */
p::first-letter { font-size: 2em; float: left; }  /* 首字母放大 */
::selection { background: yellow; }               /* 选中文本样式 */`,
        },
        {
          id: 'p4-4',
          type: 'callout',
          variant: 'note',
          title: '兼容性说明',
          text: 'CSS2 时代伪元素也用单冒号（:before），CSS3 规范改为双冒号以区分。现代浏览器两种写法都支持 ::before，但推荐使用双冒号。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：盒模型（BoxModel）
    // ========================================================================
    {
      order: 6,
      title: '盒模型（标准/怪异 box-sizing）',
      difficulty: 2,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          text: '每个 HTML 元素都是一个矩形盒子，由内容（content）、内边距（padding）、边框（border）和外边距（margin）四层构成。盒模型决定了元素的尺寸计算方式。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'CSS 盒模型结构',
            flowDirection: 'top-down',
            layers: [
              {
                name: 'margin（外边距）',
                description: '盒子外部透明区域，推开相邻元素。margin 不计入元素可见尺寸，但影响布局间距。margin 可以为负值。',
                components: [
                  { name: 'margin-top', description: '上外边距' },
                  { name: 'margin-right', description: '右外边距' },
                  { name: 'margin-bottom', description: '下外边距' },
                  { name: 'margin-left', description: '左外边距' },
                ],
              },
              {
                name: 'border（边框）',
                description: '围绕 padding 的线框，有宽度、样式、颜色三个属性。',
                components: [
                  { name: 'border-width', description: '边框宽度' },
                  { name: 'border-style', description: 'solid/dashed/dotted/none' },
                  { name: 'border-color', description: '边框颜色' },
                ],
              },
              {
                name: 'padding（内边距）',
                description: '内容与边框之间的透明区域。padding 背景与 content 相同。',
                components: [
                  { name: 'padding-top', description: '上内边距' },
                  { name: 'padding-right', description: '右内边距' },
                  { name: 'padding-bottom', description: '下内边距' },
                  { name: 'padding-left', description: '左内边距' },
                ],
              },
              {
                name: 'content（内容）',
                description: '盒子的核心区域，显示文本、图片等实际内容。width/height 默认作用于 content。',
                components: [
                  { name: 'width', description: '内容宽度' },
                  { name: 'height', description: '内容高度' },
                ],
              },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'heading',
          level: 3,
          text: 'box-sizing：两种盒模型',
        },
        {
          id: 'p5-4',
          type: 'code',
          language: 'css',
          filename: 'box-sizing 对比',
          code: `/* 标准盒模型（默认）：width = content 宽度 */
.box-standard {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 1px solid;
  /* 实际占用宽度 = 200 + 20*2 + 1*2 = 242px */
}

/* 怪异盒模型（IE）：width = content + padding + border */
.box-border {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 1px solid;
  /* 实际占用宽度 = 200px（content 自动缩小为 158px） */
}

/* 全局推荐设置 */
*, *::before, *::after {
  box-sizing: border-box;
}`,
        },
        {
          id: 'p5-5',
          type: 'callout',
          variant: 'tip',
          title: '推荐 border-box',
          text: 'border-box 让 width/height 就是元素的最终可见尺寸，计算更直观。几乎所有现代项目都在全局重置中使用 border-box。',
        },
        {
          id: 'p5-6',
          type: 'demo',
          visualizationType: 'box-model',
          data: {
            title: '盒模型可视化 · margin / border / padding / content',
            defaultSizing: 'content-box',
            defaultMargin: 20,
            defaultBorder: 8,
            defaultPadding: 16,
            defaultWidth: 200,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 7：BFC / IFC 格式化上下文（Architecture）
    // ========================================================================
    {
      order: 7,
      title: 'BFC / IFC 格式化上下文',
      difficulty: 4,
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: '格式化上下文（Formatting Context）是 CSS 视觉渲染的基本规则。BFC（Block Formatting Context）和 IFC（Inline Formatting Context）决定了盒子在容器中如何排列、如何相互作用。',
        },
        {
          id: 'p6-2',
          type: 'heading',
          level: 3,
          text: 'BFC 的触发条件',
        },
        {
          id: 'p6-3',
          type: 'list',
          items: [
            '根元素 <html> 本身就是一个 BFC',
            'float 不为 none（left / right / both）',
            'position 为 absolute 或 fixed',
            'display 为 inline-block / flex / grid / table-cell / flow-root',
            'overflow 不为 visible（hidden / auto / scroll）',
            'contain 为 layout / content / paint',
          ],
        },
        {
          id: 'p6-4',
          type: 'heading',
          level: 3,
          text: 'BFC 的核心特性',
        },
        {
          id: 'p6-5',
          type: 'code',
          language: 'css',
          filename: 'BFC 应用场景',
          code: `/* 1. 清除浮动：父元素触发 BFC，包裹浮动子元素 */
.parent { overflow: hidden; } /* 或 display: flow-root; */

/* 2. 避免 margin 折叠：相邻块级元素的 margin 会折叠，BFC 隔离 */
.sidebar { overflow: hidden; }

/* 3. 阻止文字环绕浮动：BFC 区域不与 float 重叠 */
.main { overflow: hidden; } /* 不被旁边 float 元素覆盖 */

/* 推荐方式：display: flow-root 专门触发 BFC，无副作用 */
.container { display: flow-root; }`,
        },
        {
          id: 'p6-6',
          type: 'callout',
          variant: 'note',
          title: 'margin 折叠规则',
          text: '相邻块级元素的垂直 margin 会折叠（取较大值）。触发 BFC 可以隔离元素，避免折叠。父子元素之间也可能发生 margin 折叠。',
        },
        {
          id: 'p6-7',
          type: 'heading',
          level: 3,
          text: 'IFC 简介',
        },
        {
          id: 'p6-8',
          type: 'paragraph',
          text: 'IFC（Inline Formatting Context）管理行内元素的布局。行内元素在 IFC 中水平排列，通过 vertical-align 对齐，自动换行。line-height 控制行高。',
        },
        {
          id: 'p6-9',
          type: 'demo',
          visualizationType: 'display-type',
          data: {
            title: '显示类型对比 · inline / block / inline-block',
            defaultDisplay: 'inline-block',
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 8：Flexbox 布局（FlexboxPlayground）
    // ========================================================================
    {
      order: 8,
      title: 'Flexbox 布局',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          text: 'Flexbox 是一维布局方案，擅长处理单行或单列的元素排列。它解决了浮动布局的诸多痛点，是现代布局的首选工具。',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'css',
            hint: '修改 CSS 属性，观察 Flex 布局变化',
            initialCode: `/* 容器属性 */
.flex-container {
  display: flex;
  flex-direction: row;       /* row | row-reverse | column | column-reverse */
  justify-content: center;   /* flex-start | center | space-between | space-around | space-evenly */
  align-items: center;       /* flex-start | center | stretch | baseline */
  flex-wrap: nowrap;         /* nowrap | wrap | wrap-reverse */
  gap: 12px;
}

/* 子项属性 */
.flex-item {
  flex: 1;                   /* flex-grow | flex-shrink | flex-basis */
  /* flex: 0 1 auto; 默认值 */
  /* flex: 1 1 0; 等分容器 */
  align-self: stretch;       /* 覆盖容器的 align-items */
  order: 0;                  /* 排序，默认 0 */
}`,
          },
        },
        {
          id: 'p7-3',
          type: 'heading',
          level: 3,
          text: '核心概念',
        },
        {
          id: 'p7-4',
          type: 'list',
          items: [
            '主轴（main axis）：flex-direction 定义的方向，默认水平从左到右。',
            '交叉轴（cross axis）：与主轴垂直的方向，默认垂直从上到下。',
            'justify-content：控制主轴方向的对齐与间距。',
            'align-items：控制交叉轴方向的对齐。',
            'flex 简写：flex-grow（放大）、flex-shrink（缩小）、flex-basis（基准尺寸）。',
          ],
        },
        {
          id: 'p7-5',
          type: 'callout',
          variant: 'tip',
          title: 'flex: 1 的含义',
          text: 'flex: 1 等价于 flex: 1 1 0%，表示子项可放大、可缩小、基准尺寸为 0。多个子项设置 flex: 1 会等分容器剩余空间。',
        },
        {
          id: 'p7-6',
          type: 'demo',
          visualizationType: 'flexbox-playground',
          data: {
            title: 'Flexbox 演练场 · 完整属性交互演示',
            itemCount: 5,
            defaultDirection: 'row',
            defaultJustifyContent: 'flex-start',
            defaultAlignItems: 'flex-start',
            defaultGap: 8,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 9：Grid 布局（GridPlayground）
    // ========================================================================
    {
      order: 9,
      title: 'Grid 布局',
      difficulty: 3,
      visualizationType: 'grid-playground',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          text: 'CSS Grid 是二维布局方案，可同时控制行和列。它比 Flexbox 更强大，适合复杂的页面级布局。Flexbox 适合一维，Grid 适合二维。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'grid-playground',
          data: {
            title: 'Grid 演练场 · 二维布局交互演示',
            itemCount: 6,
            defaultColumns: 'repeat(3, 1fr)',
            defaultRows: 'auto',
            defaultGap: 8,
            defaultJustifyItems: 'stretch',
            defaultAlignItems: 'stretch',
          },
        },
        {
          id: 'p8-3',
          type: 'heading',
          level: 3,
          text: '常用单位',
        },
        {
          id: 'p8-4',
          type: 'list',
          items: [
            'fr：分数单位，按比例分配剩余空间。1fr 2fr 表示 1:2 分配。',
            'auto：自动尺寸，由内容决定。',
            'minmax(min, max)：最小最大值约束。minmax(200px, 1fr) 表示最小 200px，最大等分。',
            'repeat(n, size)：重复 n 次。repeat(auto-fill, 100px) 自动填充。',
          ],
        },
        {
          id: 'p8-5',
          type: 'callout',
          variant: 'tip',
          title: '响应式 Grid 一行代码',
          text: 'grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) 实现自动响应式卡片布局，无需媒体查询。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：定位体系（5 种定位）（PositionPlayground）
    // ========================================================================
    {
      order: 10,
      title: '定位体系（5 种定位）',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          text: 'CSS position 属性控制元素的定位方式。理解 5 种定位值及其参照系是精确控制元素位置的关键。',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
            rows: [
              { feature: '默认值', values: ['是', '否', '否', '否', '否'] },
              { feature: '脱离文档流', values: ['否', '否', '是', '是', '否（滚动时脱离）'] },
              { feature: '参照系', values: ['正常文档流位置', '自身原位置', '最近的非 static 祖先', '视口（浏览器窗口）', '最近的滚动祖先'] },
              { feature: 'top/right/bottom/left', values: ['无效', '相对自身偏移', '相对参照系定位', '相对视口定位', '滚动到阈值前为 relative，之后为 fixed'] },
              { feature: '影响其他元素', values: ['不脱离，占位', '不脱离，占位', '脱离，不占位', '脱离，不占位', '不脱离，占位'] },
              { feature: '典型用途', values: ['默认布局', '微调位置/做参照', '弹窗/tooltip/图标', '固定导航/回到顶部', '粘性表头/侧边栏'] },
            ],
          },
        },
        {
          id: 'p9-3',
          type: 'code',
          language: 'css',
          filename: '定位示例',
          code: `/* relative：相对定位，做 absolute 的参照 */
.parent { position: relative; }

/* absolute：绝对定位，脱离文档流 */
.tooltip {
  position: absolute;
  top: 100%;      /* 相对父元素底部 */
  left: 50%;
  transform: translateX(-50%);
}

/* fixed：固定定位，相对视口 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* sticky：粘性定位，滚动到阈值前 relative，之后 fixed */
.table-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}`,
        },
        {
          id: 'p9-4',
          type: 'callout',
          variant: 'warning',
          title: 'sticky 的前提条件',
          text: 'sticky 生效需要：1) 父容器没有 overflow: hidden/auto；2) 父容器高度足够滚动；3) 必须设置 top/right/bottom/left 至少一个。',
        },
        {
          id: 'p9-5',
          type: 'demo',
          visualizationType: 'position-playground',
          data: {
            title: '定位演练场 · 五种 position 模式',
            defaultPosition: 'relative',
            defaultTop: 20,
            defaultLeft: 20,
            defaultZIndex: 1,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 11：层叠上下文（z-index）（CodeStepper）
    // ========================================================================
    {
      order: 11,
      title: '层叠上下文（z-index）',
      difficulty: 4,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          text: '层叠上下文（Stacking Context）是 CSS 中三维概念 — z 轴上的元素层级。z-index 只在同一层叠上下文中比较。理解层叠上下文是解决 z-index 失效问题的关键。',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '<div class="parent" style="z-index: 1;">',
              '  <div class="child" style="z-index: 999;"></div>',
              '</div>',
              '<div class="other" style="z-index: 2;"></div>',
              '',
              '/* .child 的 z-index:999 只在 .parent 内部生效 */',
              '/* .parent (z-index:1) < .other (z-index:2) */',
              '/* 所以 .child 仍然在 .other 下方 */',
            ],
            language: 'css',
            steps: [
              {
                title: '层叠上下文的创建',
                description: '以下属性会创建新的层叠上下文：position 非 static 且 z-index 非 auto；opacity < 1；transform 非 none；filter 非 none；will-change；isolation: isolate。',
                highlightLines: [1, 4],
              },
              {
                title: 'z-index 只在同一上下文比较',
                description: '.parent 创建了层叠上下文（z-index:1），.child 的 z-index:999 只在 .parent 内部生效。外部比较时，.parent 整体参与。',
                highlightLines: [1, 2],
              },
              {
                title: '父级层叠上下文决定整体层级',
                description: '.parent (z-index:1) 与 .other (z-index:2) 在同一层叠上下文中比较。1 < 2，所以 .parent 及其所有子元素都在 .other 下方。',
                highlightLines: [1, 4],
              },
              {
                title: '子元素无法超越父级层叠上下文',
                description: '无论 .child 的 z-index 多大，都无法超过 .other — 因为 .child 被困在 .parent 的层叠上下文中。这是 z-index 失效的最常见原因。',
                highlightLines: [2, 4, 7],
              },
              {
                title: '解决思路',
                description: '方案一：提升 .parent 的 z-index 到 2 以上。方案二：移除 .parent 的层叠上下文创建条件（如去掉 transform）。方案三：重构 DOM 结构。',
                highlightLines: [1, 4],
              },
            ],
          },
        },
        {
          id: 'p10-3',
          type: 'callout',
          variant: 'warning',
          title: 'z-index 失效排查清单',
          text: '1) 检查元素是否设置了 position；2) 检查父级是否创建了层叠上下文；3) 检查同级元素的 z-index 比较；4) 检查是否有 opacity/transform/filter 等隐式创建上下文的属性。',
        },
      ],
    },

    // ========================================================================
    // 知识点 12：响应式基础与媒体查询（ResponsiveViewport）
    // ========================================================================
    {
      order: 12,
      title: '响应式基础与媒体查询',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          text: '响应式设计让页面在不同设备尺寸下都有良好体验。媒体查询（Media Query）是响应式的核心，根据视口条件应用不同样式。',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '断点',
            columns: ['移动端', '平板', '桌面', '大屏'],
            rows: [
              { feature: '典型宽度', values: ['< 640px', '640px - 1024px', '1024px - 1280px', '> 1280px'] },
              { feature: 'Tailwind 前缀', values: ['默认（无前缀）', 'sm: / md:', 'lg: / xl:', '2xl:'] },
              { feature: '布局策略', values: ['单列堆叠', '双列/三列', '多列网格', '固定宽度居中'] },
              { feature: '字号基准', values: ['14px 基准', '15px 基准', '16px 基准', '16px 基准'] },
              { feature: '导航形式', values: ['汉堡菜单', '底部 Tab', '水平导航栏', '水平导航栏'] },
            ],
          },
        },
        {
          id: 'p11-3',
          type: 'code',
          language: 'css',
          filename: '媒体查询语法',
          code: `/* 基本语法 */
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}

/* 移动优先（推荐）：从小到大 */
.container { padding: 16px; }

@media (min-width: 640px) {
  .container { padding: 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 32px; }
}

/* 复合条件 */
@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar { display: block; }
}

/* 横屏 */
@media (orientation: landscape) { }

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  body { background: #1a1a1a; color: #e5e5e5; }
}`,
        },
        {
          id: 'p11-4',
          type: 'callout',
          variant: 'tip',
          title: '移动优先策略',
          text: '推荐使用 min-width 媒体查询（从小到大覆盖），让移动端作为基础样式，大屏逐步增强。这符合渐进增强理念，移动端加载更少代码。',
        },
        {
          id: 'p11-5',
          type: 'demo',
          visualizationType: 'responsive-viewport',
          data: {
            title: '响应式视口 Demo · 拖拽宽度观察布局变化',
            defaultWidth: 320,
            minWidth: 280,
            maxWidth: 1160,
            presets: [
              { label: '手机', width: 320 },
              { label: '平板', width: 768 },
              { label: '桌面', width: 1024 },
            ],
          },
        },
        {
          id: 'p11-6',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              {
                time: '手机',
                title: '< 640px',
                description: '单列布局，导航折叠为汉堡菜单，字号略小，触摸目标 ≥ 44px。',
                status: 'done',
              },
              {
                time: '平板',
                title: '640px - 1024px',
                description: '可双列布局，导航展开，侧边栏可选显示，图片自适应宽度。',
                status: 'done',
              },
              {
                time: '桌面',
                title: '1024px - 1440px',
                description: '多列布局，固定侧边栏，hover 交互可用，内容容器最大宽度限制。',
                status: 'done',
              },
              {
                time: '大屏',
                title: '> 1440px',
                description: '内容居中，最大宽度限制（如 1200px），避免行宽过长影响阅读。',
                status: 'active',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 13：CSS 单位体系（CompareTable）
    // ========================================================================
    {
      order: 13,
      title: 'CSS 单位体系（px/em/rem/vw/vh）',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          text: 'CSS 有绝对单位和相对单位。选择合适的单位对响应式设计和可访问性至关重要。',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '单位',
            columns: ['px', 'em', 'rem', 'vw/vh', '%'],
            rows: [
              { feature: '类型', values: ['绝对单位', '相对单位（父级字号）', '相对单位（根字号）', '相对单位（视口）', '相对单位（父级尺寸）'] },
              { feature: '参照基准', values: ['物理像素', '父元素 font-size', 'html 根元素 font-size', '视口宽/高', '父元素对应尺寸'] },
              { feature: '嵌套问题', values: ['无', '有（逐级乘积）', '无', '无', '有'] },
              { feature: '响应式', values: ['差', '中', '好', '好', '好'] },
              { feature: '推荐用途', values: ['边框/细线', '组件内部间距', '字号/间距/布局', '全屏布局', '弹性布局'] },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'p12-3',
          type: 'code',
          language: 'css',
          filename: '单位使用建议',
          code: `/* rem：推荐用于字号和间距 */
html { font-size: 16px; } /* 根字号 */
h1 { font-size: 2rem; }   /* 32px */
p { font-size: 1rem; }    /* 16px */
.section { padding: 1.5rem; } /* 24px */

/* em：适合组件内部相对缩放 */
.button {
  font-size: 1rem;
  padding: 0.75em 1.5em;  /* 相对自身字号 */
  border-radius: 0.25em;
}

/* vw/vh：全屏视口 */
.hero { height: 100vh; }       /* 满屏高度 */
.title { font-size: 5vw; }     /* 视口宽度 5% */

/* clamp()：响应式字号利器 */
h1 { font-size: clamp(1.5rem, 4vw, 3rem); } /* 最小1.5rem，最大3rem */

/* %：弹性布局 */
.col { width: 50%; }`,
        },
        {
          id: 'p12-4',
          type: 'callout',
          variant: 'tip',
          title: 'clamp() 响应式字号',
          text: 'clamp(min, preferred, max) 在小屏取 min，大屏取 max，中间取 preferred。一行代码实现流式响应字号，无需媒体查询。',
        },
        {
          id: 'p12-5',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            title: '单位体系速查',
            items: [
              {
                title: '绝对单位 px',
                content: '1px = 1/96 英寸。固定大小，不随父级或视口变化。适合边框、细线、阴影偏移等需要精确像素的场景。响应式能力差。',
              },
              {
                title: '相对单位 em',
                content: '相对父元素 font-size。1em = 父级字号。嵌套时会逐级相乘，容易失控。适合组件内部相对缩放（按钮 padding、icon 尺寸）。',
              },
              {
                title: '相对单位 rem（推荐）',
                content: '相对根元素 html 的 font-size。1rem = 根字号（默认 16px）。无嵌套问题，全局一致。推荐用于字号、间距、布局。',
              },
              {
                title: '视口单位 vw/vh/vmin/vmax',
                content: '1vw = 视口宽度的 1%。vh 同理。vmin 取较小边，vmax 取较大边。适合全屏布局、Hero 区域、视口相关字号。',
              },
              {
                title: '百分比 %',
                content: '相对父元素对应尺寸。width: 50% = 父级宽度的一半。注意 padding/margin 的百分比始终相对父级宽度（非高度）。',
              },
              {
                title: '函数 clamp() / min() / max()',
                content: 'clamp(min, preferred, max) 实现流式响应。min(a, b) 取较小值，max(a, b) 取较大值。可混合不同单位，浏览器自动选择。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 14：动画与变换（AnimationPlayground）
    // ========================================================================
    {
      order: 14,
      title: '动画与变换',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          text: 'CSS 动画体系由三个核心属性构成：transition（过渡）、transform（变换）、animation（关键帧动画）。它们让页面动起来，提升用户体验。',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'css',
            hint: '修改动画属性，观察过渡效果',
            initialCode: `/* transition：状态变化的过渡动画 */
.button {
  transition: transform 0.3s ease, background 0.2s;
}
.button:hover {
  transform: scale(1.05);
  background: #1ed760;
}

/* transform：变换（不触发布局重排，性能好） */
.card {
  transform: translate(10px, 20px) rotate(5deg) scale(1.1);
  transform-origin: center; /* 变换原点 */
}

/* animation：关键帧动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.modal {
  animation: fadeIn 0.4s ease-out;
  /* animation: name duration timing-function delay iteration-count direction */
}`,
          },
        },
        {
          id: 'p13-3',
          type: 'heading',
          level: 3,
          text: 'transition vs animation',
        },
        {
          id: 'p13-4',
          type: 'list',
          items: [
            'transition：需要触发条件（如 :hover），只有起止两帧，不可中途暂停。',
            'animation：可自动执行，支持多关键帧（@keyframes），可循环、可暂停。',
            'transform：translate/rotate/scale/skew，由 GPU 加速，不触发 reflow，性能最佳。',
            '避免动画 top/left/margin/width/height 等触发 reflow 的属性。',
          ],
        },
        {
          id: 'p13-5',
          type: 'callout',
          variant: 'tip',
          title: '性能优化',
          text: '只动画 transform 和 opacity 两个属性 — 它们由合成器线程处理，不触发布局和绘制。配合 will-change: transform 提示浏览器优化。',
        },
        {
          id: 'p13-6',
          type: 'demo',
          visualizationType: 'animation-playground',
          data: {
            title: '动画与过渡 Playground · Transition & Animation',
            defaultMode: 'transition',
            defaultTransitionProperty: 'all',
            defaultTransitionDuration: 500,
            defaultTransitionTiming: 'ease',
            defaultKeyframe: 'spin',
            defaultAnimationDuration: 1000,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 15：CSS 变量与自定义属性（Sandbox）
    // ========================================================================
    {
      order: 15,
      title: 'CSS 变量与自定义属性',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          text: 'CSS 自定义属性（变量）以 -- 开头定义，通过 var() 引用。它让 CSS 具备了动态性和可编程性，是实现主题切换、设计令牌的基础。',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'css',
            hint: '修改变量值，观察全局样式变化',
            initialCode: `:root {
  /* 设计令牌 */
  --color-primary: #1ed760;
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --spacing-unit: 8px;
  --radius: 6px;
  --font-size-base: 16px;
}

/* 使用变量 */
.button {
  background: var(--color-primary);
  padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
  border-radius: var(--radius);
  font-size: var(--font-size-base);
  color: white;
}

/* 主题切换：覆盖变量 */
[data-theme="dark"] {
  --color-primary: #1ed760;
  --color-bg: #1a1a1a;
  --color-text: #e5e5e5;
}

/* 带回退值 */
color: var(--color-text, #333);`,
          },
        },
        {
          id: 'p14-3',
          type: 'heading',
          level: 3,
          text: 'CSS 变量 vs Sass 变量',
        },
        {
          id: 'p14-4',
          type: 'list',
          items: [
            'CSS 变量运行时求值，Sass 变量编译时替换。',
            'CSS 变量可被 JS 动态修改（element.style.setProperty），Sass 不行。',
            'CSS 变量遵循级联规则，可被覆盖；Sass 变量是静态的。',
            'CSS 变量支持媒体查询内重定义，Sass 不行。',
          ],
        },
        {
          id: 'p14-5',
          type: 'code',
          language: 'javascript',
          filename: 'JS 操作 CSS 变量',
          code: `// 读取变量
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary')

// 设置变量（全局）
document.documentElement.style.setProperty('--color-primary', '#ff0000')

// 设置变量（局部）
element.style.setProperty('--spacing', '16px')`,
        },
      ],
    },

    // ========================================================================
    // 知识点 16：继承与可继承属性（Accordion）
    // ========================================================================
    {
      order: 16,
      title: '继承与可继承属性',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          text: 'CSS 继承是指子元素自动获得父元素的某些属性值。并非所有属性都会继承 — 了解哪些属性可继承，有助于编写简洁的样式代码。',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0],
            items: [
              {
                title: '可继承属性（Inherited）',
                content: '这些属性会从父元素传递到子元素，除非子元素显式覆盖。在 body 上设置一次，全页生效。',
                code: `/* 文本相关 */
color, font, font-family, font-size, font-weight,
font-style, line-height, text-align, text-indent,
letter-spacing, word-spacing, white-space, direction

/* 列表相关 */
list-style, list-style-type, list-style-position

/* 表格相关 */
border-collapse, border-spacing

/* 可见性 */
visibility, cursor

/* 其他 */
quotes, content`,
              },
              {
                title: '不可继承属性',
                content: '这些属性不会传递到子元素。每个元素需要独立设置。',
                code: `/* 盒模型 */
width, height, margin, padding, border

/* 背景 */
background, background-color, background-image

/* 定位 */
position, top, right, bottom, left, z-index

/* 布局 */
display, float, clear, overflow

/* 其他 */
opacity, box-shadow, transform`,
              },
              {
                title: '控制继承的关键字',
                content: 'CSS 提供四个关键字来精确控制继承行为。',
                code: `/* inherit：强制继承（即使默认不继承） */
a { color: inherit; } /* 链接继承父级颜色 */

/* initial：重置为 CSS 规范默认值 */
div { display: initial; } /* 重置为 inline */

/* unset：可继承属性用 inherit，不可继承用 initial */
* { all: unset; } /* 清除所有样式 */

/* revert：重置为浏览器默认样式 */
button { all: revert; } /* 恢复浏览器默认按钮样式 */`,
              },
              {
                title: 'all 属性',
                content: 'all 属性可一次性重置所有属性（除 direction 和 unicode-bidi），常用于组件隔离。',
                code: `/* 重置第三方组件的所有样式 */
.widget {
  all: unset;       /* 清除所有 */
  all: initial;     /* 重置为规范默认 */
  all: revert;      /* 恢复浏览器默认 */
}`,
              },
            ],
          },
        },
        {
          id: 'p15-3',
          type: 'callout',
          variant: 'tip',
          title: '善用继承减少代码',
          text: '在 body 或根容器上设置 font-family、color、line-height，子元素自动继承。避免在每个元素上重复设置这些属性。',
        },
      ],
    },

    // ========================================================================
    // 知识点 17：浮动与清除浮动
    // ========================================================================
    {
      order: 17,
      title: '浮动与清除浮动',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          text: '浮动（float）曾是 CSS 布局的主要手段，现已被 Flex/Grid 取代。但理解浮动和清除浮动仍有必要 — 它们在文字环绕图片等场景仍有用武之地。',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '清除浮动方案',
            columns: ['overflow: hidden', 'clearfix（::after）', 'display: flow-root', 'clear: both'],
            rows: [
              { feature: '原理', values: ['触发 BFC 包裹浮动', '伪元素清除', '现代 BFC 方案', '在浮动元素后添加空元素'] },
              { feature: '代码量', values: ['1 行', '4-5 行', '1 行', '需额外 HTML'] },
              { feature: '副作用', values: ['可能裁剪子元素', '无', '无', '多余 DOM 节点'] },
              { feature: '兼容性', values: ['全兼容', '全兼容', 'IE11+ 不支持', '全兼容'] },
              { feature: '推荐度', values: ['中', '高（兼容场景）', '高（现代项目）', '低'] },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'p16-3',
          type: 'code',
          language: 'css',
          filename: '清除浮动实现',
          code: `/* 方案一：overflow 触发 BFC（有副作用） */
.parent { overflow: hidden; }

/* 方案二：clearfix 经典方案（推荐兼容场景） */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

/* 方案三：flow-root（现代推荐） */
.parent { display: flow-root; }

/* 方案四：额外元素（不推荐） */
<div style="clear: both;"></div>

/* float 的合理用途：文字环绕图片 */
.article img {
  float: left;
  margin-right: 16px;
  margin-bottom: 8px;
}`,
        },
        {
          id: 'p16-4',
          type: 'callout',
          variant: 'note',
          title: 'float 已退出布局舞台',
          text: '现代布局用 Flex/Grid，float 仅保留其原始用途 — 让文字环绕图片。不要再用 float 做整体页面布局。',
        },
      ],
    },

    // ========================================================================
    // 知识点 18：背景与渐变
    // ========================================================================
    {
      order: 18,
      title: '背景与渐变',
      difficulty: 2,
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS 背景属性控制元素的背景层。背景支持纯色、图片、渐变，并可叠加多层。渐变是 CSS 中最强大的视觉表现能力之一。',
        },
        {
          id: 'p17-2',
          type: 'code',
          language: 'css',
          filename: '背景属性',
          code: `/* 背景简写 */
.box {
  background: #fff url('bg.png') no-repeat center/cover;
  /* 等价于： */
  background-color: #fff;
  background-image: url('bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; /* cover 填满 | contain 完整显示 */
}

/* 多层背景（逗号分隔，第一层在最上） */
.card {
  background:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), /* 遮罩层 */
    url('photo.jpg') center/cover;                       /* 图片层 */
}`,
        },
        {
          id: 'p17-3',
          type: 'heading',
          level: 3,
          text: '线性渐变',
        },
        {
          id: 'p17-4',
          type: 'code',
          language: 'css',
          code: `/* 基本线性渐变 */
background: linear-gradient(to right, #1ed760, #1a1a1a);
background: linear-gradient(90deg, #1ed760, #1a1a1a);

/* 多色渐变 */
background: linear-gradient(to right, red, yellow, green);

/* 色标控制位置 */
background: linear-gradient(to right, #1ed760 0%, #1a1a1a 100%);
background: linear-gradient(45deg, #1ed760 20%, #1a1a1a 80%);

/* 重复线性渐变 */
background: repeating-linear-gradient(45deg, #1ed760, #1ed760 10px, #1a1a1a 10px, #1a1a1a 20px);`,
        },
        {
          id: 'p17-5',
          type: 'heading',
          level: 3,
          text: '径向渐变与圆锥渐变',
        },
        {
          id: 'p17-6',
          type: 'code',
          language: 'css',
          code: `/* 径向渐变：从中心向外 */
background: radial-gradient(circle, #1ed760, #1a1a1a);
background: radial-gradient(circle at top left, #1ed760, #1a1a1a);
background: radial-gradient(circle 100px at 50% 50%, #1ed760, #1a1a1a);

/* 圆锥渐变：绕中心旋转 */
background: conic-gradient(from 0deg, red, yellow, green, blue, red);

/* 实用：棋盘格背景 */
background:
  conic-gradient(#ccc 25%, transparent 0 50%, #ccc 0 75%, transparent 0) 0 0/20px 20px;`,
        },
      ],
    },

    // ========================================================================
    // 知识点 19：CSS 各知识点掌握建议（SkillBar）
    // ========================================================================
    {
      order: 19,
      title: 'CSS 各知识点掌握建议',
      difficulty: 1,
      visualizationType: 'skillbar',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          text: 'CSS 知识点众多，不同知识点的使用频率和重要性不同。以下是各核心知识点的掌握建议，帮助你合理分配学习精力。',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'skillbar',
          data: {
            skills: [
              { name: '选择器与优先级', level: 95, description: '日常开发高频使用，必须精通' },
              { name: '盒模型与 box-sizing', level: 95, description: '布局基础，必须精通' },
              { name: 'Flexbox 布局', level: 90, description: '现代布局首选，必须熟练' },
              { name: 'Grid 布局', level: 85, description: '二维布局利器，推荐掌握' },
              { name: '定位体系', level: 85, description: '弹窗/固定导航常用，必须熟练' },
              { name: '响应式与媒体查询', level: 80, description: '移动端必备，推荐熟练' },
              { name: 'CSS 变量', level: 75, description: '主题系统基础，推荐掌握' },
              { name: '动画与变换', level: 70, description: '提升体验，按需学习' },
              { name: 'BFC / 层叠上下文', level: 60, description: '排查问题用，理解概念即可' },
              { name: '渐变与背景', level: 55, description: '视觉增强，按需查阅' },
            ],
          },
        },
        {
          id: 'p18-3',
          type: 'callout',
          variant: 'tip',
          title: '学习建议',
          text: '优先精通选择器、盒模型、Flexbox 三大基石，它们覆盖 80% 的日常布局需求。BFC 和层叠上下文以理解概念为主，遇到问题时能排查即可。',
        },
      ],
    },

    // ========================================================================
    // 知识点 20：综合实战 — 响应式卡片布局页（任务导向，断言沙盒）
    // ========================================================================
    {
      order: 20,
      title: '综合实战：响应式卡片布局页',
      difficulty: 3,
      blocks: [
        {
          id: 'p20proj-1',
          type: 'paragraph',
          lead: true,
          text: '前面我们学了选择器、盒模型、Flex/Grid、响应式、单位体系——这些是离散的积木。现在该拿「拼装图纸」把它们拼起来了。这一节是第一个综合实战：从零搭建一个响应式卡片布局页。你要综合运用 CSS 变量（主题色）、Grid 二维布局、媒体查询响应式、单位体系（rem/clamp）。右侧沙盒已内置「任务检查清单」——你写代码时它会实时告诉你哪条没达标、该怎么改，这是从「看懂」到「写会」的关键一步。',
        },
        {
          id: 'p20proj-2',
          type: 'paragraph',
          text: '任务要求：用 Grid 实现卡片网格（桌面 3 列、平板 2 列、手机 1 列），用 CSS 变量定义主题色，卡片含圆角与阴影，标题用 clamp() 自适应字号。',
        },
        {
          id: 'p20proj-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '在下方编辑器中编写 HTML + 内联 CSS。任务检查清单会实时校验你的代码并给出提示——逐条通过即完成任务。可随时点击「重置」回退到初始骨架。',
            initialCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>响应式卡片布局</title>
  <style>
    /* 用 CSS 变量定义主题色 */

    /* 卡片网格容器：用 Grid 布局 */

    /* 单张卡片样式：圆角 + 阴影 */

    /* 标题：clamp 自适应字号 */

    /* 响应式：平板 2 列、手机 1 列 */

  </style>
</head>
<body>
  <h1>卡片布局</h1>
  <div class="grid">
    <article class="card">卡片 1</article>
    <article class="card">卡片 2</article>
    <article class="card">卡片 3</article>
  </div>
</body>
</html>`,
            checks: [
              {
                description: '使用 :root 定义 CSS 变量（如 --primary）',
                pattern: ':root\\s*\\{[^}]*--[a-z]',
                hint: '在 :root { --primary: #3366cc; } 内定义主题色变量。CSS 变量以 -- 开头，:root 是全局作用域。',
              },
              {
                description: '使用 var() 引用 CSS 变量',
                pattern: 'var\\(--',
                hint: '用 var(--primary) 引用变量，而非硬编码颜色值。这是主题化的关键。',
              },
              {
                description: '使用 display: grid 定义网格容器',
                pattern: 'display:\\s*grid',
                hint: '网格容器设 display: grid。Grid 适合二维布局（行列同时控制），比 Flex 更适合卡片网格。',
              },
              {
                description: '使用 grid-template-columns 定义列（含 repeat/auto-fit/minmax）',
                pattern: 'grid-template-columns\\s*:\\s*[^;]*(repeat|auto-fit|minmax)',
                hint: '推荐 grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); —— 这一行实现自动响应式：屏幕宽时多列，窄时少列，无需媒体查询。',
              },
              {
                description: '使用 gap 设置网格间距',
                pattern: 'gap\\s*:\\s*\\d',
                hint: '用 gap: 16px; 设置行列间距。gap 替代了旧的 margin 间距方案，Flex/Grid 通用。',
              },
              {
                description: '卡片有圆角 border-radius',
                pattern: 'border-radius\\s*:\\s*\\d',
                hint: '卡片加 border-radius: 12px; 让视觉更柔和。圆角是现代 UI 的基础语言。',
              },
              {
                description: '卡片有阴影 box-shadow',
                pattern: 'box-shadow\\s*:',
                hint: '卡片加 box-shadow: 0 2px 8px rgba(0,0,0,0.1); 制造层次感。阴影让卡片「浮」起来。',
              },
              {
                description: '标题使用 clamp() 自适应字号',
                pattern: 'clamp\\s*\\(',
                hint: '标题用 font-size: clamp(1.5rem, 4vw, 2.5rem); 让字号在小屏 1.5rem、大屏封顶 2.5rem，自动流动。',
              },
              {
                description: '使用 @media 媒体查询（或 auto-fit 已隐含响应式）',
                pattern: '@media|minmax\\s*\\(\\s*\\d',
                hint: '若用 auto-fit+minmax 已隐含响应式；也可显式加 @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }。',
              },
            ],
          },
        },
        {
          id: 'p20proj-4',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '它把「Grid + 响应式 + CSS 变量 + 单位体系」四章串联成一个真实产物。完成后你会发现：repeat(auto-fit, minmax(...)) 一行代码就能实现无需媒体查询的响应式网格——这是现代 CSS 的威力。这种「拼装」经验，是单纯背属性无法替代的工程思维。',
        },
      ],
    },

    // ========================================================================
    // 知识点 21：综合实战 — 主题化导航栏（任务导向，断言沙盒）
    // ========================================================================
    {
      order: 21,
      title: '综合实战：主题化导航栏',
      difficulty: 3,
      blocks: [
        {
          id: 'p21proj-1',
          type: 'paragraph',
          lead: true,
          text: '上一个实战我们搭了展示型布局。现在做交互型——一个主题化导航栏，综合运用 CSS 变量（主题切换）、定位体系（sticky 固定）、层叠上下文（z-index 层级）、Flexbox（导航项排列）。这是第二个「拼装图纸」：把「变量 + 定位 + 层叠 + Flex」四章焊在一起。同样地，右侧沙盒的任务检查清单会实时校验你的代码并给教学反馈。',
        },
        {
          id: 'p21proj-2',
          type: 'paragraph',
          text: '任务要求：实现一个固定在顶部的导航栏，用 CSS 变量定义主题色（主色 + 悬停色），用 Flexbox 横向排列导航项，用 position: sticky 固定，用 z-index 确保不被内容遮挡，悬停有过渡动画。',
        },
        {
          id: 'p21proj-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '编写主题化导航栏 HTML + CSS。任务检查清单会实时校验——逐条通过即完成。重点关注 CSS 变量、sticky 定位与 z-index 层级。',
            initialCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>主题化导航栏</title>
  <style>
    /* 用 CSS 变量定义主题色 */

    /* 导航栏：sticky 固定 + z-index 层级 */

    /* 用 Flexbox 横向排列导航项 */

    /* 悬停过渡动画 */

  </style>
</head>
<body>
  <nav class="navbar">
    <a href="#" class="nav-item">首页</a>
    <a href="#" class="nav-item">文章</a>
    <a href="#" class="nav-item">关于</a>
  </nav>
  <main style="height: 2000px;">滚动页面观察导航栏固定效果</main>
</body>
</html>`,
            checks: [
              {
                description: '使用 :root 定义至少 2 个 CSS 变量（主色 + 悬停色）',
                pattern: ':root\\s*\\{[^}]*--[a-z][^}]*--[a-z]',
                hint: '在 :root 内定义 --primary 和 --primary-hover 两个变量，便于主题切换。如 :root { --primary: #3366cc; --primary-hover: #2a5299; }',
              },
              {
                description: '使用 var() 引用 CSS 变量',
                pattern: 'var\\(--',
                hint: '导航栏背景或文字色用 var(--primary) 引用变量，而非硬编码。',
              },
              {
                description: '使用 position: sticky 固定导航栏',
                pattern: 'position:\\s*sticky',
                hint: '导航栏用 position: sticky; top: 0; 固定在顶部。sticky 不脱离文档流，比 fixed 更适合导航栏（不会遮挡内容）。',
              },
              {
                description: '使用 top: 0 配合 sticky',
                pattern: 'top:\\s*0',
                hint: 'sticky 必须配 top: 0 才能在滚动到顶部时「粘住」。没有 top 值 sticky 不生效。',
              },
              {
                description: '使用 display: flex 横向排列导航项',
                pattern: 'display:\\s*flex',
                hint: '导航栏用 display: flex; 横向排列 .nav-item。可用 gap 设置项间距，justify-content 控制对齐。',
              },
              {
                description: '使用 z-index 确保导航栏层级最高',
                pattern: 'z-index\\s*:\\s*\\d',
                hint: '导航栏加 z-index: 100; 确保滚动时不被后续内容遮挡。注意 sticky/fixed 配 z-index 才生效（需先有定位）。',
              },
              {
                description: '使用 transition 实现悬停过渡动画',
                pattern: 'transition\\s*:',
                hint: '导航项加 transition: background-color 0.2s, color 0.2s; 让悬停状态切换更平滑。transition 是「状态变化的过渡」。',
              },
              {
                description: '导航项有 :hover 悬停状态',
                pattern: ':hover\\s*\\{',
                hint: '用 .nav-item:hover { ... } 定义悬停样式，如变色或下划线。:hover 是用户交互反馈的基础。',
              },
            ],
          },
        },
        {
          id: 'p21proj-4',
          type: 'callout',
          variant: 'warning',
          title: '实战后的反思：sticky 与层叠上下文的陷阱',
          text: '完成这个练习后请注意两个常见坑：① sticky 失效——若父容器有 overflow: hidden 或高度不够，sticky 不会生效，这是最高频的「为什么不粘」问题；② z-index 无效——若导航栏父元素创建了新的层叠上下文且 z-index 较低，子导航栏 z-index 再大也越不过父级边界。调试时先检查父链上的 overflow 和层叠上下文。',
        },
      ],
    },

    // ========================================================================
    // 知识点 22：面试题
    // ========================================================================
    {
      order: 22,
      title: '面试题',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p22iv-1',
          type: 'paragraph',
          text: '精选 CSS 基础高频面试题，涵盖选择器、盒模型、布局、定位、响应式、动画等核心考点。点击展开查看参考答案。',
        },
        {
          id: 'p22iv-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: CSS 选择器优先级如何计算？',
                content: '优先级用四位数表示 (a, b, c, d)：\n- a=行内样式(1/0)\n- b=ID 数量\n- c=类/伪类/属性选择器数量\n- d=元素/伪元素数量\n\n比较时从左到右逐位比较，如 (0,1,1,0) > (0,0,2,1)。!important 覆盖一切。优先级相同时后写的覆盖先写的（源码顺序）。',
              },
              {
                title: 'Q2: 盒模型是什么？标准模式与怪异模式（IE 盒模型）有何不同？',
                content: '盒模型四层：content → padding → border → margin。\n\n标准模式（W3C）：\n- width 只含 content。\n- 实际占宽 = width + padding + border + margin。\n\n怪异模式（IE 盒模型）：\n- width 含 content + padding + border。\n- 实际占宽 = width + margin。\n\n用 box-sizing: border-box 切换为 IE 盒模型，让 width 即「可见宽」，更直观。推荐全局设置 *{box-sizing:border-box}。',
              },
              {
                title: 'Q3: BFC 是什么？如何触发？有什么应用？',
                content: 'BFC（块级格式化上下文）是一个独立的渲染区域，内部元素不影响外部。\n\n触发条件：\n- float 非 none\n- position:absolute/fixed\n- overflow 非 visible\n- display:flow-root/flex/grid 等\n\n应用：\n1. 清除浮动——BFC 计算高度含浮动子元素。\n2. 避免 margin 折叠——不同 BFC 不折叠。\n3. 阻止文字环绕浮动——BFC 不与浮动重叠。\n\n现代推荐用 display:flow-root 触发，无副作用。',
              },
              {
                title: 'Q4: margin 折叠（合并）的条件是什么？如何避免？',
                content: '折叠条件：\n1. 相邻块级元素（兄弟或父子）的垂直 margin。\n2. 在同一 BFC 内。\n\n折叠取较大值（非相加）。\n\n避免方法：\n1. 触发新 BFC（overflow:hidden / display:flow-root）。\n2. 用 padding/border 隔开。\n3. 用 Flex/Grid 布局（子项不折叠）。\n4. 元素间加行内元素或空隙。\n\n注意：水平 margin 不折叠，浮动/绝对定位元素不折叠。',
              },
              {
                title: 'Q5: Flexbox 和 Grid 的区别？什么时候用哪个？',
                content: '两者维度不同：\n\nFlexbox：\n- 一维布局（一次处理一行或一列）。\n- 适合组件内部线性排列：导航栏、工具栏、按钮组、表单项。\n\nGrid：\n- 二维布局（同时控制行列）。\n- 适合页面整体骨架：页头主体页脚、卡片网格、复杂表格布局。\n\n组合使用最佳：Grid 做页面骨架，Flex 做组件内部。\n\n经验：若「一行/一列」用 Flex，若「行列网格」用 Grid。',
              },
              {
                title: 'Q6: position 的五个值区别？sticky 的触发条件？',
                content: '五个值：\n1. static——默认，文档流。\n2. relative——相对自身原位置，不脱离流。\n3. absolute——相对最近非 static 祖先，脱离流。\n4. fixed——相对视口，脱离流。\n5. sticky——滚动到阈值前是 static，到阈值后变 fixed，不脱离流。\n\nsticky 触发条件：\n1. 必须设 top/right/bottom/left 之一。\n2. 父容器不能有 overflow:hidden/auto。\n3. 父容器高度需大于 sticky 元素。\n\nsticky 失效 90% 是父容器 overflow 问题。',
              },
              {
                title: 'Q7: 什么是层叠上下文？z-index 失效是怎么回事？',
                content: '层叠上下文是元素在 Z 轴上的渲染层级容器。\n\n创建条件：\n- position+z-index 非 auto\n- opacity<1\n- transform/filter/perspective 非 none\n- position:fixed/sticky\n- will-change 等\n\n关键规则：z-index 只在同一层叠上下文内比较。若父元素创建了层叠上下文，子元素的 z-index 只在父级内有效，整体作为一个单元参与父级比较。\n\n排查：z-index:999 子元素被 z-index:1 遮挡，多半是父级层叠上下文更低——排查父链。',
              },
              {
                title: 'Q8: 实现垂直居中有哪些方法？',
                content: '常见方法：\n1. Flex：display:flex; align-items:center; justify-content:center;（推荐，最简单）\n2. Grid：display:grid; place-items:center;（最短）\n3. 绝对定位 + transform：position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);（适合已知尺寸）\n4. 绝对定位 + margin:auto（需设宽高）\n5. line-height（单行文本）\n6. table-cell + vertical-align（老方案）\n\nFlex/Grid 是现代首选。',
              },
              {
                title: 'Q9: 响应式设计的核心方案？移动优先 vs 桌面优先？',
                content: '核心方案：\n1. 媒体查询 @media（断点切换样式）\n2. 弹性布局 Flex/Grid\n3. 响应式单位 rem/em/vw/vh/%\n4. 响应式图片 srcset/<picture>\n5. clamp()/min()/max() 函数\n\n移动优先：默认样式针对小屏，用 min-width 向上增强（默认即最小，渐进增强）。\n桌面优先：默认针对大屏，用 max-width 向下兼容。\n\n推荐移动优先——默认样式更精简，且符合「内容优先」理念。',
              },
              {
                title: 'Q10: CSS 变量（自定义属性）与 Sass/Less 变量的区别？',
                content: 'CSS 变量（--var）：\n1. 运行时动态，可被 JS 读写（getPropertyValue/setProperty）。\n2. 遵循继承与层叠规则。\n3. 浏览器原生支持，无需编译。\n4. 可在媒体查询内重定义实现响应式。\n\nSass/Less 变量（$var/@var）：\n1. 编译时静态，编译后不可变。\n2. 不遵循继承。\n3. 需预处理编译。\n\n现代项目优先用 CSS 变量，Sass 变量用于编译期逻辑（如循环生成样式）。两者可共存。',
              },
              {
                title: 'Q11: em、rem、px、vw/vh 的区别？什么时候用哪个？',
                content: '单位对比：\n- px：绝对单位，精确但不缩放。\n- em：相对父元素 font-size，嵌套时层层放大易失控。\n- rem：相对根 html 的 font-size，全局可调，推荐做字号。\n- vw/vh：视口宽/高 1%，做全屏布局。\n- %：相对父元素。\n- clamp(最小, 首选, 最大)：响应式字号。\n\n推荐：\n- 字号用 rem（配 html{font-size:62.5%} 让 1rem=10px 好算）\n- 间距用 px/rem\n- 全屏用 vw/vh\n- 响应式字号用 clamp()',
              },
              {
                title: 'Q12: transition 和 animation 的区别？',
                content: 'transition：\n- 状态切换的过渡（需触发条件如 :hover）。\n- 只有起止两帧，自动触发。\n- 适合「状态 A→B」的平滑切换（按钮 hover）。\n\nanimation：\n- 关键帧动画（@keyframes）。\n- 可定义多帧，可自动播放、循环、暂停。\n- 适合「持续/复杂」的动画（loading 旋转、弹跳）。\n\n性能：优先 transform/opacity（GPU 加速），避免 animating width/height/top/left（触发重排）。',
              },
              {
                title: 'Q13: 场景题——页面卡顿，从 CSS 角度你会排查哪些性能问题？',
                content: '从 CSS 角度排查：\n1. 触发重排的属性：避免 animating width/height/top/left/margin，改用 transform（仅重绘）。\n2. 复杂选择器：避免深层嵌套（如 .a .b .c .d），选择器从右向左匹配，越深越慢。\n3. 大量盒阴影/滤镜：box-shadow/filter 耗 GPU，大面积使用会卡。\n4. will-change 滥用：只在动画元素上加，不要全局加。\n5. @import 阻塞：CSS 用 @import 串行加载，改 <link> 并行。\n6. 未用 contain/content-visibility 优化长列表。\n\n用 DevTools Performance 面板定位。',
              },
              {
                title: 'Q14: 场景题——重构一个用 float + 清除浮动写的布局，你会怎么改？为什么？',
                content: '把 float 布局改为 Flexbox 或 Grid。\n\n理由：\n1. float 设计初衷是文字环绕图片，做布局是「误用」，需额外清除浮动（clearfix hack）。\n2. Flex/Grid 是为布局设计，无需清除浮动，代码更少更直观。\n3. Flex/Grid 子项不会 margin 折叠，行为更可预期。\n4. Flex/Grid 支持对齐/排序/换行等 float 无法实现的能力。\n\n改完后删除所有 clearfix、float、clear 相关代码。',
              },
              {
                title: 'Q15: 对比题——display:none、visibility:hidden、opacity:0 的区别？',
                content: '三者差异：\n\ndisplay:none：\n- 完全移出渲染树，不占空间。\n- 不可交互。\n- 触发重排（重排重绘都发生）。\n\nvisibility:hidden：\n- 保留空间。\n- 不可交互。\n- 仅重绘。\n\nopacity:0：\n- 保留空间。\n- 仍可交互（可点击！）。\n- 仅重绘，性能最好。\n\n应用：\n1. 彻底隐藏用 display:none。\n2. 占位隐藏用 visibility:hidden。\n3. 透明过渡用 opacity:0 + transition。\n\n注意 opacity:0 的元素仍接收事件，需配 pointer-events:none。',
              },
              {
                title: 'Q16: 对比题——伪类与伪元素的区别？各自举例。',
                content: '伪类（:）：选择处于特定状态的元素，单冒号。\n- :hover（悬停）\n- :focus（聚焦）\n- :first-child（第一个子元素）\n- :nth-child(n)\n\n伪元素（::）：创建不存在于 DOM 的虚拟元素，双冒号。\n- ::before/::after（在元素前后插入内容）\n- ::first-letter（首字母）\n- ::selection（选中文本样式）\n\n区别：伪类是「选择已有元素的状态」，伪元素是「创建新元素」。CSS3 规定伪元素用双冒号，伪类用单冒号（兼容性上 ::before 也接受 :before）。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 23：知识点速查表
    // ========================================================================
    {
      order: 23,
      title: '知识点速查表',
      difficulty: 1,
      blocks: [
        {
          id: 'p23cs-1',
          type: 'paragraph',
          text: 'CSS 基础核心知识点速查表，快速回顾关键概念与用法。',
        },
        {
          id: 'p23cs-2',
          type: 'table',
          caption: 'CSS 基础速查表',
          headers: ['知识点', '关键要点', '常用属性/值'],
          rows: [
            ['引入方式', '外部样式表优先，样式结构分离', '<link> <style> style=""'],
            ['选择器', '基础/组合/伪类/伪元素', '.class #id :hover ::before [attr]'],
            ['优先级', '四位数 (a,b,c,d)，!important 覆盖一切', '行内>ID>类>元素'],
            ['盒模型', 'content→padding→border→margin', 'box-sizing width padding border'],
            ['BFC', '独立渲染区域，清除浮动/避免 margin 折叠', 'overflow:hidden display:flow-root float'],
            ['Flexbox', '一维布局，主轴/交叉轴', 'display:flex justify-content align-items flex:1'],
            ['Grid', '二维布局，同时控制行列', 'display:grid grid-template-columns gap'],
            ['定位', 'static/relative/absolute/fixed/sticky', 'position top/right/bottom/left z-index'],
            ['层叠上下文', 'z-index 只在同一上下文比较', 'opacity<1 transform position+z-index'],
            ['响应式', '媒体查询+弹性布局+响应式单位', '@media clamp() vw/vh rem'],
            ['单位', 'px绝对/em相对父/rem相对根/vw视口', 'px em rem vw vh % clamp()'],
            ['动画', 'transition过渡/animation关键帧', 'transition @keyframes animation transform'],
            ['CSS 变量', '运行时动态，可被 JS 读写', '--var: value; var(--var)'],
            ['继承', '部分属性自动继承（color/font等）', 'inherit initial unset all'],
            ['浮动', '已退出布局舞台，用 Flex/Grid 替代', 'float clear display:flow-root'],
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 24：CSS 小测验（QuizCard）
    // ========================================================================
    {
      order: 24,
      title: 'CSS 小测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          text: '通过以下测验检验你对 CSS 核心概念的掌握程度。每题附有详细解析。',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '以下选择器优先级最高的是？',
                options: [
                  '#nav .item',
                  'div.item:hover',
                  '.list > .item',
                  'nav div.item',
                ],
                correctIndex: 0,
                explanation: '#nav .item 的优先级为 (0,1,1,0)，含 1 个 ID。其余选项最高也只有 (0,0,2,1) 或 (0,0,1,2)，均低于 ID 选择器。一个 ID 的优先级高于任意数量的类。',
              },
              {
                question: 'box-sizing: border-box 下，width: 200px、padding: 20px、border: 1px 的元素，其实际内容宽度是多少？',
                options: ['200px', '242px', '158px', '160px'],
                correctIndex: 2,
                explanation: 'border-box 下 width 包含 padding 和 border。内容宽度 = 200 - 20*2 - 1*2 = 158px。元素占用的总宽度仍为 200px。',
              },
              {
                question: '以下哪个属性会创建新的层叠上下文？',
                options: [
                  'position: relative; z-index: auto;',
                  'opacity: 0.99;',
                  'overflow: hidden;',
                  'display: block;',
                ],
                correctIndex: 1,
                explanation: 'opacity 小于 1 会创建新的层叠上下文。position: relative 需配合 z-index 非 auto 才创建。overflow 和 display: block 不创建层叠上下文。',
              },
              {
                question: '清除浮动的现代推荐方案是？',
                options: [
                  'overflow: hidden',
                  '额外空元素 clear: both',
                  'display: flow-root',
                  'float: clear',
                ],
                correctIndex: 2,
                explanation: 'display: flow-root 是专门为触发 BFC 设计的属性，无副作用，是现代项目清除浮动的推荐方案。overflow: hidden 可能裁剪子元素，空元素方案需要额外 DOM。',
              },
              {
                question: 'flex: 1 等价于？',
                options: [
                  'flex: 1 1 auto',
                  'flex: 1 1 0%',
                  'flex: 0 1 1%',
                  'flex: 1 0 auto',
                ],
                correctIndex: 1,
                explanation: 'flex: 1 等价于 flex: 1 1 0%，即 flex-grow:1（可放大）、flex-shrink:1（可缩小）、flex-basis:0%（基准尺寸为 0）。多个子项设置 flex:1 会等分容器空间。',
              },
              {
                question: '【理解】关于 BFC（块级格式化上下文），下列说法正确的是？',
                options: [
                  'BFC 内外元素会相互影响 margin',
                  'BFC 区域不会与浮动元素重叠',
                  'BFC 内子元素会脱离文档流',
                  'float 元素天然就是 BFC',
                ],
                correctIndex: 1,
                explanation: 'BFC 是一个独立的渲染区域，内部元素不影响外部。关键特性：① 内部 margin 不会与外部折叠；② BFC 区域不与浮动元素重叠（这是清除浮动原理）；③ 计算高度时包含浮动子元素。触发 BFC：overflow 非 visible、float、position:absolute/fixed、display:flow-root 等。',
              },
              {
                question: '【理解】标准盒模型下，元素 width:300px、padding:15px、border:5px，实际占据宽度是？',
                options: ['300px', '330px', '340px', '320px'],
                correctIndex: 2,
                explanation: '标准模式 width 只含 content。实际占宽 = 300 + 左右padding(15×2=30) + 左右border(5×2=10) = 340px。若用 box-sizing:border-box 则实际占宽 = 300px（width 含 padding+border）。',
              },
              {
                question: '【对比】Flexbox 和 Grid 的核心区别是？',
                options: [
                  'Flex 是二维布局，Grid 是一维布局',
                  'Flex 是一维布局，Grid 是二维布局',
                  '两者完全相同，只是名字不同',
                  'Flex 用于响应式，Grid 用于固定布局',
                ],
                correctIndex: 1,
                explanation: 'Flexbox 是一维布局（一次处理一行或一列），适合导航栏、工具栏等线性排列；Grid 是二维布局（同时处理行和列），适合整体页面骨架、卡片网格。两者互补，常组合使用：Grid 做页面骨架，Flex 做组件内部排列。',
              },
              {
                question: '【对比】em 和 rem 的区别？',
                options: [
                  'em 相对根元素，rem 相对父元素',
                  'em 相对父元素字号，rem 相对根元素 html 字号',
                  '两者都相对根元素',
                  'em 是绝对单位，rem 是相对单位',
                ],
                correctIndex: 1,
                explanation: 'em 相对父元素（或当前元素自身）的 font-size 计算，嵌套时会层层放大，易失控；rem 始终相对根元素 html 的 font-size，全局可调，更可控。推荐用 rem 做字号、em 做组件内局部缩放（如图标与文字对齐）。',
              },
              {
                question: '【应用】实现一个固定在页面顶部、滚动时不消失的导航栏，应使用？',
                options: [
                  'position: absolute; top: 0;',
                  'position: relative; top: 0;',
                  'position: sticky; top: 0;',
                  'position: static; top: 0;',
                ],
                correctIndex: 2,
                explanation: 'position: sticky 在滚动到 top:0 时「粘住」，相对最近滚动祖先定位，不脱离文档流（不占位问题），是固定导航栏首选。absolute 会脱离文档流且滚动时消失；relative/static 无法固定。sticky 需父容器无 overflow:hidden 且高度足够。',
              },
              {
                question: '【应用】让一段文字在不同屏幕宽度下自动缩放字号（最小 16px、首选 4vw、最大 24px），应使用？',
                options: [
                  'font-size: 4vw;',
                  'font-size: calc(16px + 4vw);',
                  'font-size: clamp(16px, 4vw, 24px);',
                  'font-size: min(16px, 4vw);',
                ],
                correctIndex: 2,
                explanation: 'clamp(最小值, 首选值, 最大值) 让值在范围内流动：屏幕小时取 16px（不小于最小），中等时取 4vw，屏幕大时封顶 24px。这是响应式字号的标准写法，避免极端屏幕下文字过大或过小。',
              },
              {
                question: '【场景】两个相邻块级元素的上下 margin 发生折叠（20px + 30px 只显示 30px），如何避免？',
                options: [
                  '给元素加 display: inline',
                  '给其中一个元素加 overflow: hidden 或 display: flow-root 触发 BFC',
                  '加大 margin 值',
                  '用 padding 代替 margin（无效）',
                ],
                correctIndex: 1,
                explanation: 'margin 折叠只发生在同一 BFC 内的相邻块级元素。给其中一个元素触发新 BFC（overflow:hidden / display:flow-root / float 等）即可让两者处于不同 BFC，折叠消失。注意：Flex/Grid 子项不会 margin 折叠，这也是用 Flex 替代传统布局的好处之一。',
              },
              {
                question: '【场景】给子元素设 z-index: 999 但仍被另一个 z-index: 1 的元素遮挡，最可能的原因是？',
                options: [
                  'z-index 数值还不够大',
                  '父元素创建了新的层叠上下文，子元素的 z-index 只在父级上下文内有效',
                  '浏览器不支持 z-index',
                  '需要加 position: relative',
                ],
                correctIndex: 1,
                explanation: 'z-index 只在同一层叠上下文内比较。若父元素创建了层叠上下文（如 opacity<1 / transform / position+z-index），则子元素整体作为一个层叠单元参与父级比较，子元素的 z-index:999 不会越过父级边界。排查：检查父链上谁创建了层叠上下文。',
              },
              {
                question: '【场景】移动端按钮点击区域过小（< 44px），从 CSS 角度应如何改善？',
                options: [
                  '只调小 font-size',
                  '设置 min-height/min-width ≥ 44px，并用 padding 扩大可点击区域',
                  '用 transform: scale 放大视觉但不动尺寸',
                  '加 cursor: pointer',
                ],
                correctIndex: 1,
                explanation: 'WCAG 建议触摸目标 ≥ 44×44px（Apple HIG 标准）。应设 min-height/min-width 保证最小尺寸，用 padding 扩大可点击区域而非仅视觉。transform: scale 只缩放视觉不影响布局点击区。同时避免在移动端用 hover 触发关键交互（无鼠标）。',
              },
              {
                question: '【综合】关于 CSS 变量（自定义属性），下列说法错误的是？',
                options: [
                  '可在 :root 定义全局变量，用 var() 引用',
                  '变量可参与运行时计算，支持 JS 动态修改',
                  'CSS 变量遵循继承规则，可在子元素覆盖父元素值',
                  'CSS 变量必须以 $ 开头声明',
                ],
                correctIndex: 3,
                explanation: 'CSS 变量以 -- 开头声明（如 --primary: #3366cc），用 var(--primary) 引用。$ 是 Sass 等 CSS 预处理器的变量语法，不是原生 CSS。CSS 变量优势：运行时动态、可被 JS 读写（getPropertyValue/setProperty）、遵循继承、支持回退值 var(--x, fallback)。',
              },
            ],
          },
        },
        {
          id: 'p19-3',
          type: 'callout',
          variant: 'tip',
          title: '测验完成',
          text: '如果全部答对，说明你已掌握 CSS 核心概念。如果有错题，建议回顾对应知识点的详细内容。CSS 的关键在于实践 — 多写多调试。',
        },
      ],
    },
  ],
}
