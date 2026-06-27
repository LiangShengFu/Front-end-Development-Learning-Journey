/**
 * 模块 01：HTML 基础
 *
 * 完整实现 24 个知识点 + 26 种可视化组件（11 核心 + 7 HTML 专用 + 7 CSS 专用）。
 *
 * 严格遵循 docx/模块一.md 设计文档：
 * - 11 章节内容覆盖（基础概念 / 语义化 / 表单 / 表格 / 路径 / 无障碍 / 实战 / HTML5 API / 面试题 / 速查表 / 小测验）
 * - 26 个可视化演示（对应文档 #1-#26）
 * - 6 种新增组件：Timeline / CompareTable / CodeStepper / ArchitectureDiagram / Accordion / QuizCard
 */
import type { ModuleMeta } from '../lib/types'

export const htmlFundamentalsModule: ModuleMeta = {
  number: '01',
  title: 'HTML 基础',
  slug: 'html-fundamentals',
  stage: 'basics',
  stageLabel: '基础阶段 · 第 1 模块',
  icon: '01',
  summary: 'HTML 文档结构、语义化标签、表单、无障碍与 HTML5 API。',
  knowledgePointCount: 24,
  visualizationCount: 27,
  points: [
    // ========================================================================
    // 知识点 1：HTML 定义与作用
    // ========================================================================
    {
      order: 1,
      title: 'HTML 定义与作用',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'HTML（HyperText Markup Language，超文本标记语言）是构建 Web 页面的标准标记语言。它描述了网页的结构和内容，由浏览器解析后呈现为用户可见的页面。',
        },
        {
          id: 'p1-kg',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'html', label: 'HTML 核心', group: 'core', weight: 3 },
              { id: 'semantic', label: '语义化标签', group: 'related', weight: 2 },
              { id: 'form', label: '表单元素', group: 'related', weight: 2 },
              { id: 'table', label: '表格', group: 'related', weight: 2 },
              { id: 'a11y', label: '无障碍 a11y', group: 'related', weight: 2 },
              { id: 'media', label: '多媒体', group: 'related', weight: 2 },
              { id: 'api', label: 'HTML5 API', group: 'related', weight: 2 },
              { id: 'path', label: '路径与链接', group: 'detail' },
            ],
            edges: [
              { source: 'html', target: 'semantic', label: '结构' },
              { source: 'html', target: 'form', label: '输入' },
              { source: 'html', target: 'table', label: '数据' },
              { source: 'html', target: 'a11y', label: '包容' },
              { source: 'html', target: 'media', label: '富媒体' },
              { source: 'html', target: 'api', label: '能力' },
              { source: 'html', target: 'path', label: '导航' },
            ],
          },
        },
        {
          id: 'p1-2',
          type: 'heading',
          level: 3,
          text: '三个关键词的理解',
        },
        {
          id: 'p1-3',
          type: 'list',
          items: [
            '超文本（HyperText）：指超越普通文本的能力，可以通过链接跳转到其他文档或资源。',
            '标记（Markup）：使用一组标签（tag）来标注内容，告诉浏览器如何展示这些内容。',
            '语言（Language）：HTML 是一种规范化的标记语言，有严格的语法规则（由 W3C / WHATWG 维护）。',
          ],
        },
        {
          id: 'p1-4',
          type: 'callout',
          variant: 'note',
          title: 'HTML 不是编程语言',
          text: 'HTML 是标记语言而非编程语言 — 它没有变量、循环、条件判断等逻辑控制能力。它的职责是"描述内容是什么"，而非"如何计算"。逻辑由 JavaScript 负责，样式由 CSS 负责。',
        },
        {
          id: 'p1-5',
          type: 'heading',
          level: 3,
          text: 'HTML 的核心作用',
        },
        {
          id: 'p1-6',
          type: 'list',
          ordered: true,
          items: [
            '定义文档结构：标题、段落、列表、表格等内容的组织方式。',
            '承载超链接：实现页面之间、资源之间的跳转。',
            '嵌入多媒体：图片、视频、音频、Canvas、SVG 等。',
            '构建表单：收集用户输入并提交到服务器。',
            '提供语义信息：让浏览器、搜索引擎、辅助技术理解内容含义。',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 2：HTML 元素结构（CodeStepper）
    // ========================================================================
    {
      order: 2,
      title: 'HTML 元素结构（起始/内容/结束）',
      difficulty: 1,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'HTML 元素由起始标签、内容和结束标签三部分组成。标签用尖括号包裹，结束标签在标签名前加斜杠。',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '<p class="greeting">Hello, HTML!</p>',
            ],
            language: 'html',
            steps: [
              {
                title: '起始标签（Opening Tag）',
                description: '<p> 是起始标签，由尖括号包裹标签名组成。标签名 p 表示这是一个段落元素。起始标签内还可以包含属性。',
                highlightLines: [1],
              },
              {
                title: '属性（Attribute）',
                description: 'class="greeting" 是属性，写在起始标签内。属性采用 name="value" 格式，用于为元素附加额外信息。这里 class 用于标识元素的类名，便于 CSS/JS 选用。',
                highlightLines: [1],
              },
              {
                title: '内容（Content）',
                description: 'Hello, HTML! 是元素的内容，位于起始标签和结束标签之间。内容可以是文本，也可以嵌套其他元素。',
                highlightLines: [1],
              },
              {
                title: '结束标签（Closing Tag）',
                description: '</p> 是结束标签，在标签名前加斜杠 /。每个有内容的元素都需要结束标签。少数元素（如 <br>、<img>）是自闭合的，没有结束标签。',
                highlightLines: [1],
              },
            ],
          },
        },
        {
          id: 'p2-3',
          type: 'callout',
          variant: 'tip',
          title: '空元素',
          text: '部分元素没有内容也不需要结束标签，称为空元素（void elements），如 <br>、<hr>、<img>、<input>、<meta>、<link>。HTML5 中可写成 <br> 或 <br/>，两者等价。',
        },
        {
          id: 'p2-4',
          type: 'demo',
          visualizationType: 'element-anatomy',
          data: {
            tag: 'a',
            content: '点击这里',
            attributes: [
              { name: 'href', value: 'https://example.com', description: '指定链接目标 URL' },
              { name: 'target', value: '_blank', description: '在新标签页打开链接' },
              { name: 'rel', value: 'noopener', description: '安全属性，防止新页面访问 window.opener' },
            ],
            isVoid: false,
            parts: {
              openingTag: '开始标签 <a>，包含元素名和属性',
              content: '元素内容，即链接的可见文本',
              closingTag: '结束标签 </a>，标记元素结束',
            },
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 3：HTML 文档结构（ArchitectureDiagram）
    // ========================================================================
    {
      order: 3,
      title: 'HTML 文档结构（head/body）',
      difficulty: 2,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们拆解了单个元素的「标签 + 属性 + 内容」三段式结构。但一个元素不能孤立存在——它必须住进一份完整的文档里。HTML 文档就像一封信：信封（<!DOCTYPE> + <html>）声明「这是一封 HTML5 信件、用什么语言写」；信头（<head>）写收发信息、标题、编码声明，收信人看不到；信体（<body>）才是真正给人读的内容。这一节我们看这份「信」的标准骨架，以及 head 里两个最关键、最容易被忽略的 meta 声明。',
        },
        {
          id: 'p3-1b',
          type: 'paragraph',
          text: '一个完整的 HTML 文档由 <!DOCTYPE> 声明、<html> 根元素、<head> 头部和 <body> 主体四部分构成。head 提供文档元信息，body 承载可见内容。',
        },
        {
          id: 'p3-2',
          type: 'code',
          language: 'html',
          filename: 'document.html',
          code: `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>页面标题</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>页面内容</p>
  </body>
</html>`,
        },
        {
          id: 'p3-code-parse',
          type: 'paragraph',
          text: '代码解析：第一行 <!DOCTYPE html> 是给浏览器的「模式开关」——写了它进入标准模式，不写会进入怪异模式（Quirks Mode），此时盒模型按老式 IE 规则计算（width 包含 padding 和 border），布局会全面错乱，所以永远要写。<html lang="zh-CN"> 的 lang 不只是摆设：读屏器靠它决定用什么语言的语音引擎朗读，搜索引擎靠它判断页面语言。head 里 <meta charset="UTF-8"> 必须在前 1024 字节内，否则可能触发编码嗅探导致乱码。<meta name="viewport" ...> 是移动端的命门——下一句专门讲它。',
        },
        {
          id: 'p3-viewport-parse',
          type: 'callout',
          variant: 'tip',
          title: 'meta viewport 逐字段拆解',
          text: 'content="width=device-width, initial-scale=1.0" 中：width=device-width 表示「把视口宽度设为设备物理宽度」（手机默认视口是 980px，会把页面缩小塞进屏幕，导致字小到看不清）；initial-scale=1.0 表示初始缩放为 1（不放大不缩小）。还可加 maximum-scale/minimum-scale 限制缩放范围、user-scalable=no 禁用缩放（但会损害无障碍，慎用）。没有这行，你的响应式 CSS 媒体查询会全部失效，因为浏览器会假装视口是 980px。',
        },
        {
          id: 'p3-defer-async',
          type: 'callout',
          variant: 'note',
          title: '脚本怎么放：defer vs async 的用户感知差异',
          text: '脚本标签 <script> 放在 head 里会阻塞页面渲染——用户会看到「白屏几秒后突然全部出现」。两种异步加载能解决：① defer：下载不阻塞解析，等 HTML 解析完才按顺序执行——用户看到的是「页面先完整渲染，最后脚本悄悄生效」，适合有依赖的业务脚本；② async：一下载完就立即执行（暂停解析）——用户看到的是「页面渲染中途卡一下」，执行顺序不可控，适合独立的统计/广告脚本。一句话：业务脚本用 defer 放 head 末尾，独立脚本用 async。都不写（普通 script）放 body 末尾也行，但会推迟首屏可交互。',
        },
        {
          id: 'p3-3',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'HTML 文档结构',
            flowDirection: 'top-down',
            layers: [
              {
                name: 'DOCTYPE 声明',
                description: '告诉浏览器使用 HTML5 标准解析文档',
                components: [
                  { name: '<!DOCTYPE html>', description: 'HTML5 标准模式声明' },
                ],
              },
              {
                name: '根元素 <html>',
                description: '整个文档的根，lang 属性声明文档语言',
                components: [
                  { name: 'lang 属性', description: '声明文档语言，辅助 SEO 和读屏器' },
                ],
              },
              {
                name: '头部 <head>',
                description: '文档元信息，用户不可见',
                components: [
                  { name: '<meta charset>', description: '字符编码声明' },
                  { name: '<meta viewport>', description: '移动端视口配置' },
                  { name: '<title>', description: '页面标题，显示在浏览器标签' },
                  { name: '<link>', description: '外部资源引入（CSS、图标）' },
                  { name: '<style>', description: '内联样式' },
                ],
              },
              {
                name: '主体 <body>',
                description: '用户可见的所有内容',
                components: [
                  { name: '语义化标签', description: 'header/nav/main/section/article 等' },
                  { name: '文本内容', description: 'h1-h6、p、ul/ol、table 等' },
                  { name: '多媒体', description: 'img/video/audio/canvas/svg' },
                  { name: '交互元素', description: 'form/input/button/a 等' },
                ],
              },
            ],
          },
        },
        {
          id: 'p3-4',
          type: 'callout',
          variant: 'info',
          title: 'viewport 元信息',
          text: '<meta name="viewport" content="width=device-width, initial-scale=1.0"> 是移动端适配的关键声明，缺失会导致移动端页面被缩小显示。这是响应式设计的必备配置。',
        },
        {
          id: 'p3-5',
          type: 'demo',
          visualizationType: 'dom-tree',
          data: {
            title: 'HTML 文档结构',
            root: {
              tag: 'html',
              desc: '根元素',
              children: [
                {
                  tag: 'head',
                  desc: '元数据',
                  children: [
                    { tag: 'meta', attrs: [{ name: 'charset', value: 'UTF-8' }] },
                    { tag: 'title', desc: '页面标题' },
                  ],
                },
                {
                  tag: 'body',
                  desc: '文档主体',
                  children: [
                    { tag: 'header', desc: '页眉' },
                    { tag: 'main', desc: '主内容' },
                    { tag: 'footer', desc: '页脚' },
                  ],
                },
              ],
            },
          },
        },
        {
          id: 'p3-sandbox',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '结构沙盒：修改下方 HTML 代码并运行，实时查看渲染结果与 DOM 结构。',
            initialCode: `<div class="card">
  <h2>卡片标题</h2>
  <p>这是一段卡片内容。</p>
  <button>点击我</button>
</div>`,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 4：常见 HTML 元素分类（CompareTable）
    // ========================================================================
    {
      order: 4,
      title: '常见 HTML 元素分类',
      difficulty: 1,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们搭好了文档骨架（head/body）。骨架里要填什么？HTML 提供了上百个标签，乍看眼花缭乱，但其实它们按「职责」分成了几大类：有的管内容分区（section/article），有的管文本（p/h1），有的管表单（input），有的管多媒体（img/video）。这一节我们按类别理一遍，建立「标签全景图」，后面再逐类深入。不用背——记住「每类负责什么」即可，具体标签用到时查文档。',
        },
        {
          id: 'p4-1b',
          type: 'paragraph',
          text: 'HTML 元素按功能可分为根元素、元数据、内容分区、文本内容、内联文本、图片与多媒体、嵌入内容、表单、表格、交互元素等类别。',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '元素分类',
            columns: ['用途', '代表元素', '是否块级'],
            rows: [
              { feature: '根元素', values: ['文档根节点', '<html>', '是'] },
              { feature: '元数据', values: ['文档配置信息', '<head> <title> <meta> <link>', '否'] },
              { feature: '内容分区', values: ['页面结构划分', '<header> <nav> <main> <footer>', '是'] },
              { feature: '标题', values: ['标题层级', '<h1> ~ <h6>', '是'] },
              { feature: '文本内容', values: ['段落与列表', '<p> <ul> <ol> <blockquote>', '是'] },
              { feature: '内联文本', values: ['行内文本标记', '<a> <strong> <em> <span> <code>', '否'] },
              { feature: '多媒体', values: ['图片音视频', '<img> <video> <audio>', '是'] },
              { feature: '表单', values: ['用户输入', '<form> <input> <button> <select>', '是'] },
              { feature: '表格', values: ['表格数据', '<table> <tr> <td> <th>', '是'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 5：块级 vs 行内 vs 行内块
    // ========================================================================
    {
      order: 5,
      title: '块级 vs 行内 vs 行内块',
      difficulty: 2,
      visualizationType: 'flipcard',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们认识了 HTML 元素的属性体系。但你写完标签后会发现：有的标签自动换行独占一行，有的却挤在一起——这背后的「导演」叫做文档流（normal flow）。文档流是浏览器默认的元素排列规则：块级元素像书架上的书一本本竖着摞，行内元素像一句话里的字横着排。理解文档流，是理解一切布局的起点，也是后面 CSS 布局（Flex/Grid）要「打破」和「重组」的对象。',
        },
        {
          id: 'p5-1b',
          type: 'paragraph',
          text: 'HTML 元素按显示特性分为块级（block）、行内（inline）和行内块（inline-block）三类。这决定了元素如何占据空间和与其他元素并排排列。',
        },
        {
          id: 'p5-2',
          type: 'table',
          caption: '三种显示特性对比',
          headers: ['特性', '块级 block', '行内 inline', '行内块 inline-block'],
          rows: [
            ['换行', '独占一行', '不换行', '不换行'],
            ['宽高', '可设置', '不可设置', '可设置'],
            ['默认宽度', '父容器宽度', '内容宽度', '内容宽度'],
            ['margin/padding', '四向生效', '水平生效，垂直不占空间', '四向生效'],
            ['代表元素', 'div p h1 ul', 'span a strong em', 'img input button'],
          ],
        },
        {
          id: 'p5-flip',
          type: 'demo',
          visualizationType: 'flipcard',
          data: {
            cards: [
              {
                front: '块级 block',
                frontSub: '独占一行',
                back: 'div / p / h1-h6 / ul / section 等独占一行，可设置宽高，默认宽度为父容器宽度。',
              },
              {
                front: '行内 inline',
                frontSub: '并排显示',
                back: 'span / a / strong / em 等并排显示，无法设置宽高，宽高由内容决定。',
              },
              {
                front: '行内块 inline-block',
                frontSub: '并排 + 可设宽高',
                back: 'img / input / button 等并排显示且可设置宽高，兼具块级与行内特性。',
              },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'callout',
          variant: 'warning',
          title: 'HTML5 不再使用 block/inline 分类',
          text: 'HTML5 规范移除了 block/inline 的元素分类，改为按内容模型（Content Model）分类。但 CSS 的 display 属性仍沿用 block/inline/inline-block 概念，实际开发中仍以此理解布局行为。',
        },
        {
          id: 'p5-4',
          type: 'code',
          language: 'html',
          code: `<!-- 块级：独占一行 -->
<div style="background:#333">块级元素 1</div>
<div style="background:#444">块级元素 2</div>

<!-- 行内：并排显示，无法设置宽高 -->
<span style="background:#333">行内 1</span>
<span style="background:#444">行内 2</span>

<!-- 行内块：并排显示，可设置宽高 -->
<button style="width:120px">按钮 1</button>
<button style="width:120px">按钮 2</button>`,
        },
        {
          id: 'p5-code-parse',
          type: 'paragraph',
          text: '代码解析：两个 <div> 各自独占一行，从上到下堆叠——这就是块级的「换行」特性；两个 <span> 紧挨着排在一行，中间只有空格分隔，且即使给 span 设置 width 也不会生效——这是行内的「不可设宽高」；两个 <button> 同样并排，但 width:120px 生效了——这就是行内块「并排 + 可设宽高」的混合优势。日常布局中，导航按钮、图标按钮多依赖行内块特性。',
        },
        {
          id: 'p5-misconception',
          type: 'callout',
          variant: 'warning',
          title: '常见误区',
          text: '误区一：「行内元素设置宽高无效是 bug」——不是 bug，是规范：行内元素的宽高由内容决定，强行设宽请用 display:inline-block 或 block。误区二：「用 <br> 给行内元素换行」——<br> 是语义上的文本换行，不是布局工具；要做布局请用 CSS（display/flex），否则响应式下会错乱。',
        },
        {
          id: 'p5-box-model',
          type: 'callout',
          variant: 'tip',
          title: '底层原理：盒模型计算',
          text: '块级 vs 行内的差异，本质是「盒模型」在两者上的处理不同。每个元素都是一个矩形盒子，由内到外四层：content（内容）→ padding（内边距）→ border（边框）→ margin（外边距）。标准模式下，CSS 的 width 只含 content；整个盒子实际占宽 = width + 左右padding + 左右border + 左右margin。块级盒子的四层都生效且能撑开父容器；行内盒子却只「水平方向」生效——左右 padding/margin 会推开邻居，但上下 padding/margin 不影响行高（不会把上下行推开），上下 border 也只是画在那但不占布局空间。这就是为什么给 <span> 设 padding-top 看起来「无效」——它画了但没占位。理解这一点，后面 CSS 布局的很多「诡异现象」就都解释通了。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：HTML 属性体系（Accordion）
    // ========================================================================
    {
      order: 6,
      title: 'HTML 属性体系（id/class/data-/aria-）',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们看了元素的「三段式」结构。但光有标签名还不够——同一种标签（比如 <div>）可能有几十个，怎么区分它们？怎么给某个特定的 div 加样式？怎么在它身上存点数据给 JS 用？这就需要属性（attribute）。属性写在起始标签里，是 name="value" 形式的「附加信息」。这一节我们看四个最常用的属性家族：id（唯一身份证）、class（类名标签）、data-*（自定义数据兜底）、aria-*（无障碍补丁）。',
        },
        {
          id: 'p6-1b',
          type: 'paragraph',
          text: 'HTML 属性为元素附加额外信息。核心属性包括通用属性（id/class/style）、数据属性（data-*）、无障碍属性（aria-*）和事件属性（on*）。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: 'id 属性 — 全局唯一标识',
                content: 'id 为元素指定文档内唯一的标识符。用于锚点跳转、CSS/JS 选用、表单 label 关联。同一文档内 id 不可重复。',
                code: '<div id="header">...</div>\n<label for="email">邮箱</label>\n<input id="email" type="email" />',
                codeLanguage: 'html',
              },
              {
                title: 'class 属性 — 类名标识',
                content: 'class 为元素指定一个或多个类名，用于 CSS 样式和 JS 选用。同一类名可被多个元素共用，一个元素可有多个类名（空格分隔）。',
                code: '<div class="card card--featured active">...</div>',
                codeLanguage: 'html',
              },
              {
                title: 'data-* 属性 — 自定义数据',
                content: 'data-* 用于在元素上存储自定义数据，供 JS 读取。通过 element.dataset 访问。命名建议用小写连字符。',
                code: '<button data-id="42" data-action="delete">删除</button>\n// JS 读取\nconst id = btn.dataset.id;       // "42"\nconst action = btn.dataset.action; // "delete"',
                codeLanguage: 'html',
              },
              {
                title: 'aria-* 属性 — 无障碍',
                content: 'aria-*（Accessible Rich Internet Applications）为辅助技术（读屏器）提供语义信息。当原生 HTML 语义不足时使用，如动态组件的状态、角色、标签。',
                code: '<button aria-label="关闭对话框" aria-expanded="false">×</button>\n<div role="alert" aria-live="polite">操作成功</div>',
                codeLanguage: 'html',
              },
              {
                title: 'style 属性 — 内联样式',
                content: 'style 直接在元素上写 CSS，优先级最高（除 !important 外）。不推荐大量使用，会破坏样式与结构分离的原则。',
                code: '<div style="color:#fff;background:#0a0a0a">内联样式</div>',
                codeLanguage: 'html',
              },
            ],
          },
        },
        {
          id: 'p6-misconception',
          type: 'callout',
          variant: 'warning',
          title: '常见误区：class vs id 怎么选',
          text: '初学者最爱纠结「用 class 还是 id」。一句话原则：默认用 class，只在「全文档唯一」时才用 id。原因是 id 不能重复——如果你给列表每一项都用 id="item"，第二个就失效；而 class 天生支持复用。什么时候必须用 id？① 锚点跳转（<a href="#top">）；② 表单 label 关联（<label for="email">）；③ JS getElementById 定位唯一元素。除此之外，样式一律用 class，避免 id 选择器优先级过高导致样式难覆盖。',
        },
      ],
    },

    // ========================================================================
    // 知识点 7：HTML 发展历程（Timeline）
    // ========================================================================
    {
      order: 7,
      title: 'HTML 发展历程',
      difficulty: 1,
      isNew: true,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: '前面几节我们学了元素、属性、文档结构——这些都是 HTML5 的现状。但 HTML 不是一天建成的：它从 1993 年的一个简单文档标记语言，长成了今天能做应用、做游戏、做实时通信的平台。为什么要回看历史？因为很多「看起来很怪」的语法都是历史遗留——比如 <br>、<img> 不闭合（HTML4 时代的宽松习惯）、<form> 的某些默认行为、HTML5 为什么要新增那么多语义标签和 API。理解演进，你才能理解现状为什么是这样。',
        },
        {
          id: 'p7-1b',
          type: 'paragraph',
          text: 'HTML 自 1993 年诞生以来经历了 30 余年演进，从简单的文档标记发展为支撑现代 Web 应用的标准。',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              {
                time: '1993',
                title: 'HTML 首个提案',
                description: 'Tim Berners-Lee 发布 HTML 首个提案，基于 SGML，定义了超文本和基础标签。',
                status: 'done',
              },
              {
                time: '1995',
                title: 'HTML 2.0',
                description: 'IETF 发布 HTML 2.0 规范，统一了表单、邮件功能，成为第一个正式标准。',
                status: 'done',
              },
              {
                time: '1997',
                title: 'HTML 3.2 / 4.0',
                description: 'W3C 接管后发布 HTML 3.2 和 4.0，引入脚本、样式表、框架等能力。',
                status: 'done',
              },
              {
                time: '1999',
                title: 'HTML 4.01',
                description: 'HTML 4.01 成为广泛使用的稳定版本，奠定了后续十年的基础。',
                status: 'done',
              },
              {
                time: '2000',
                title: 'XHTML 1.0',
                description: '将 HTML 改造为 XML 严格语法，要求标签小写、必须闭合。因过于严格未被广泛采纳。',
                status: 'done',
              },
              {
                time: '2004-2014',
                title: 'WHATWG 与 HTML5',
                description: '浏览器厂商组建 WHATWG 推动 HTML5，2014 年 W3C 正式发布 HTML5 标准，引入语义化标签、Canvas、视频、本地存储等。',
                status: 'done',
              },
              {
                time: '2019-至今',
                title: 'HTML Living Standard',
                description: 'W3C 与 WHATWG 联合，HTML 进入"活标准"时代，持续演进。新增 dialog、popover、容器查询等特性。',
                status: 'active',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 8：语义化标签（CompareTable + 表格）
    // ========================================================================
    {
      order: 8,
      title: '语义化标签（8种核心标签）',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: '前面我们用 div/span 搭出了页面，但 div 是个「万能容器」——它什么都不说，就像一本书每一页都写着「内容」两个字。语义化标签（semantic tags）则是给内容「贴对标签」：header 就是页眉，nav 就是导航，article 就是一篇文章。为什么要这样做？因为搜索引擎、屏幕阅读器、甚至半年后的你自己，都需要靠标签来理解「这块是什么」。语义化让 HTML 从「能看」变成「能被读懂」。',
        },
        {
          id: 'p8-1b',
          type: 'paragraph',
          text: 'HTML5 引入了一批语义化标签，让结构本身表达内容含义，而非依赖 div + class。语义化对 SEO、无障碍、可维护性都有重要价值。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '语义化标签',
            columns: ['用途', '使用场景'],
            highlightColumn: 1,
            rows: [
              { feature: '<header>', values: ['页眉/区块头部', '页面顶部、文章头部、section 头部'] },
              { feature: '<nav>', values: ['导航链接区', '主导航、面包屑、分页'] },
              { feature: '<main>', values: ['主要内容', '页面主体，每页仅一个'] },
              { feature: '<article>', values: ['独立完整内容', '文章、评论、卡片'] },
              { feature: '<section>', values: ['内容分区', '按主题划分的区块，通常带标题'] },
              { feature: '<aside>', values: ['附属内容', '侧边栏、相关推荐、广告'] },
              { feature: '<footer>', values: ['页脚/区块尾部', '版权、联系方式、相关链接'] },
              { feature: '<figure>/<figcaption>', values: ['图文组合', '插图、代码示例、图表及其标题'] },
            ],
          },
        },
        {
          id: 'p8-3',
          type: 'code',
          language: 'html',
          filename: 'semantic-layout.html',
          code: `<body>
  <header>
    <nav><!-- 主导航 --></nav>
  </header>
  <main>
    <article>
      <h1>文章标题</h1>
      <section>
        <h2>第一节</h2>
        <p>正文内容...</p>
      </section>
    </article>
    <aside><!-- 侧边推荐 --></aside>
  </main>
  <footer><!-- 版权信息 --></footer>
</body>`,
        },
        {
          id: 'p8-code-parse',
          type: 'paragraph',
          text: '代码解析：这份骨架里，<header> 包裹页面顶部和导航，<main> 是页面主体（每页只能有一个），<article> 表示一篇独立文章，<section> 按主题再划分小节且必须带标题，<aside> 是与正文相关的附属内容（侧边推荐），<footer> 收尾版权信息。注意它们都没有任何 class，但读代码的人一眼就能看出结构——这就是语义化的可读性红利。',
        },
        {
          id: 'p8-misconception',
          type: 'callout',
          variant: 'warning',
          title: '常见误区',
          text: '误区：「语义化就是用 header/nav/footer 替换 div 就行」——错。语义化要求标签匹配内容本质：把一段独立文章塞进 <section>、把导航链接塞进 <aside> 都是误用。判断标准是「这块内容能否独立存在 / 是否对应这个标签的定义」，而非「位置像不像」。另外 <section> 必须包含标题（h1-h6），否则应直接用 div。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：语义化文本元素（FlipCard）
    // ========================================================================
    {
      order: 9,
      title: '语义化文本元素（em/strong/blockquote 等）',
      difficulty: 2,
      isNew: true,
      visualizationType: 'flipcard',
      blocks: [
        {
          id: 'p9sem-1',
          type: 'paragraph',
          text: '除了结构化语义标签，HTML 还提供一批行内语义化文本元素，用于标注文本的强调、引用、术语、上下标等含义，让文本自带语义而非仅靠样式区分。',
        },
        {
          id: 'p9sem-2',
          type: 'demo',
          visualizationType: 'flipcard',
          data: {
            cards: [
              {
                front: 'em vs i',
                frontSub: '强调 vs 斜体',
                back: '<em> 表示语义上的强调（读屏器会改变语调），<i> 仅视觉斜体（术语、外文）。两者都渲染为斜体，但 em 带语义。',
              },
              {
                front: 'strong vs b',
                frontSub: '重要 vs 粗体',
                back: '<strong> 表示内容重要（读屏器会加重语气），<b> 仅视觉粗体（如关键词）。两者都渲染为粗体，但 strong 带语义。',
              },
              {
                front: 'blockquote vs q',
                frontSub: '块引用 vs 行内引用',
                back: '<blockquote> 用于块级引用（带缩进），<q> 用于行内短引用（自动加引号）。两者都可配合 cite 属性标注来源。',
              },
              {
                front: 'abbr',
                frontSub: '缩写术语',
                back: '<abbr title="HyperText Markup Language">HTML</abbr> 标注缩写，hover 显示全称，辅助读屏器正确朗读。',
              },
              {
                front: 'sup / sub',
                frontSub: '上标 / 下标',
                back: '<sup> 上标（如 x²、注脚），<sub> 下标（如 H₂O、化学式）。用于数学公式与化学方程式。',
              },
              {
                front: 'code vs s',
                frontSub: '代码 vs 删除',
                back: '<code> 标注代码片段（等宽字体），<s> 表示不再相关或已删除的内容（删除线），<del> 表示被删除的文档改动。',
              },
            ],
          },
        },
        {
          id: 'p9sem-3',
          type: 'callout',
          variant: 'tip',
          title: '语义优先，样式其次',
          text: '选择文本标签时应优先考虑语义而非外观：需要强调用 em/strong，需要引用用 blockquote/q，需要术语用 abbr/cite。外观交给 CSS 控制，不要用 <b>/<i> 仅为加粗斜体。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：语义化 vs 非语义化对比（CompareTable）
    // ========================================================================
    {
      order: 10,
      title: '语义化 vs 非语义化对比',
      difficulty: 2,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们认识了 8 个语义化标签和文本元素。你可能会问：用 <div class="header"> 不也能实现 <header> 的效果吗？功能上确实等价，但差别在「谁能读懂」。想象一位视障用户用屏幕阅读器浏览你的页面：遇到 <header>，读屏器会提示「页眉区域，可按快捷键跳过」；遇到 <div class="header">，读屏器只会念「div」——用户既不知道这是页眉，也无法快速跳过。这一节我们用一张对比表，看清语义化在可读性、SEO、无障碍上的真实差距。',
        },
        {
          id: 'p9-1b',
          type: 'paragraph',
          text: '非语义化使用 div/span 通用容器，语义化使用有含义的标签。两者在功能上等价，但在可读性、SEO、无障碍上差异显著。',
        },
        {
          id: 'p9-screenreader',
          type: 'callout',
          variant: 'note',
          title: '真实场景：屏幕阅读器如何朗读',
          text: '把一个「提交」按钮分别用两种写法，启动 NVDA 读屏器按 Tab 聚焦，听听差别：\n① 非语义化 <div class="btn" onclick="submit()">提交</div> —— 读屏器朗读：「提交，分组」（只把它当成普通容器，不提示可点击，回车键不触发，键盘用户根本用不了）。\n② 语义化 <button type="submit">提交</button> —— 读屏器朗读：「提交，按钮」（明确告知是按钮，Tab 可聚焦，回车/空格可触发，焦点环自动显示）。\n再看导航：用 <div class="nav"> 包裹的链接，读屏器用户得逐条 Tab 听完所有链接才能跳过；用 <nav> 包裹，读屏器会提示「导航区域」，用户可一键跳到正文。这就是语义化的真实价值——它不是给视觉用户看的，是给「机器和辅助技术」读的。',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['非语义化 (div)', '语义化 (header/nav/...)'],
            highlightColumn: 2,
            rows: [
              { feature: '可读性', values: ['需依赖 class 名推断含义', '标签本身即含义'] },
              { feature: 'SEO', values: ['搜索引擎难以理解结构', '搜索引擎能识别内容权重'] },
              { feature: '无障碍', values: ['读屏器需额外 aria 标注', '原生支持读屏器导航'] },
              { feature: '代码量', values: ['需大量 class 命名', '标签即结构，class 更少'] },
              { feature: '维护性', values: ['结构含义不直观', '结构一目了然'] },
              { feature: '适用场景', values: ['无对应语义标签时使用', '优先使用语义标签'] },
            ],
          },
        },
        {
          id: 'p9-3',
          type: 'callout',
          variant: 'tip',
          title: '语义化原则',
          text: '优先使用语义化标签，仅在无合适语义标签时才用 div（布局容器）或 span（行内文本包裹）。不要为了语义化而语义化 — 一个简单的按钮就用 <button>，不需要 <div role="button">。',
        },
        {
          id: 'p9-4',
          type: 'demo',
          visualizationType: 'semantic-compare',
          data: {
            title: '导航栏的语义化实现',
            good: {
              label: '语义化',
              tags: [
                { tag: '<nav>', reason: '语义化导航区域' },
                { tag: '<ul>', reason: '列表结构' },
                { tag: '<li>', reason: '列表项' },
                { tag: '<a>', reason: '链接元素' },
              ],
              description: '使用语义化标签，屏幕阅读器可识别导航结构，SEO 友好。',
            },
            bad: {
              label: '非语义化',
              tags: [
                { tag: '<div>', reason: '无语义容器' },
                { tag: '<span>', reason: '无语义行内元素' },
              ],
              description: '全部使用 div/span，无法表达结构语义，可访问性差。',
            },
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 11：表单元素与验证（Sandbox）
    // ========================================================================
    {
      order: 11,
      title: '表单元素与验证',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: '前面我们搭好了页面骨架、读懂了语义化。但网页大多是「单向展示」，如果要用户输入信息——注册、登录、提交订单——就需要表单。表单是前端与用户「对话」的入口：它收集输入、校验合法性、再把数据交给服务器。HTML5 给表单装上了「原生验证」能力：不用写 JS，用 required、min、pattern 等属性就能让浏览器自动挡住非法输入。这一节我们看这些属性怎么用，以及为什么它们不能替代后端验证。',
        },
        {
          id: 'p10-1b',
          type: 'paragraph',
          text: '表单是收集用户输入的核心机制。HTML5 提供了丰富的 input 类型、原生验证属性和约束验证 API。',
        },
        {
          id: 'p10-2',
          type: 'code',
          language: 'html',
          filename: 'form.html',
          code: `<form novalidate>
  <!-- type="email" 让浏览器自动校验邮箱格式；required 表示不能为空 -->
  <input type="email" required placeholder="邮箱" />

  <!-- minlength/maxlength 限制字符长度，密码至少 8 位、最多 20 位 -->
  <input type="password" minlength="8" maxlength="20" required />

  <!-- type="number" 弹出数字键盘；min/max 限定范围；step 控制步长 -->
  <input type="number" min="0" max="150" step="1" value="18" />

  <!-- pattern 用正则约束格式；title 在校验失败时作为提示文案 -->
  <input type="text" pattern="[A-Za-z]{3,}" title="至少3个字母" />

  <!-- select 下拉：value="" 的空选项配合 required 可强制用户选择 -->
  <select required>
    <option value="">请选择</option>
    <option value="cn">中国</option>
  </select>

  <button type="submit">提交</button>
</form>`,
        },
        {
          id: 'p10-code-parse',
          type: 'paragraph',
          text: '代码解析：最外层 <form novalidate> 的 novalidate 表示「先别让浏览器自动校验」——通常用于你想用 JS 接管校验逻辑时。每个 input 的 type 决定了键盘形态和基础校验（email 检查 @ 、number 检查数字）。required 是「必填开关」，minlength/maxlength/min/max/pattern 是「约束条件」——它们组合起来就能在不写 JS 的情况下挡住大多数非法输入。注意 <select required> 必须配一个 value="" 的占位选项，否则用户没选也会通过校验。',
        },
        {
          id: 'p10-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: '使用约束验证 API 检查表单。修改代码后点击运行查看效果。',
            initialCode: `// 约束验证 API 示例
const form = {
  email: 'user@example.com',
  age: 25,
};

// 模拟验证
function validate(data) {
  const errors = [];
  if (!data.email || !/^[^@]+@[^@]+/.test(data.email)) {
    errors.push('邮箱格式错误');
  }
  if (!data.age || data.age < 0 || data.age > 150) {
    errors.push('年龄必须在 0-150 之间');
  }
  return errors;
}

const errors = validate(form);
if (errors.length === 0) {
  console.log('[验证通过]');
  console.log('数据:', form);
} else {
  console.log('[验证失败]:');
  errors.forEach(e => console.log('  -', e));
}`,
          },
        },
        {
          id: 'p10-4',
          type: 'callout',
          variant: 'warning',
          title: '前端验证不能替代后端验证',
          text: 'HTML5 原生验证可被 novalidate 属性或 JS 绕过。任何前端验证都仅用于改善用户体验，真正的数据校验必须在服务器端进行，防止恶意请求。',
        },
        {
          id: 'p10-5',
          type: 'demo',
          visualizationType: 'form-playground',
          data: {
            title: '用户注册表单',
            fields: [
              { type: 'text', label: '用户名', name: 'username', placeholder: '输入用户名', required: true },
              { type: 'email', label: '邮箱', name: 'email', placeholder: 'user@example.com', required: true },
              { type: 'password', label: '密码', name: 'password', required: true },
              {
                type: 'select',
                label: '角色',
                name: 'role',
                options: ['开发者', '设计师', '产品经理'],
              },
            ],
            submitLabel: '注册',
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 12：HTML5 input 类型大全（Accordion）
    // ========================================================================
    {
      order: 12,
      title: 'HTML5 input 类型大全',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们用 required/pattern 等属性做了表单校验。但表单体验的另一半在「输入」本身——怎么让用户少打字、少出错。HTML5 给 input 加了 20 多种 type：date 直接弹日历选日期、color 弹调色板、range 弹滑块、tel 在手机上自动弹数字键盘。这些类型的好处不只是 UI，更重要的是移动端键盘适配和原生校验——你不用写一行 JS，浏览器就帮你优化了体验。',
        },
        {
          id: 'p11-1b',
          type: 'paragraph',
          text: 'HTML5 大幅扩展了 input 类型，从原有的 text/password 扩展到 20+ 种，覆盖日期、颜色、范围、文件等场景，并自带原生验证和移动端键盘适配。',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: true,
            items: [
              {
                title: '文本类 — text / password / search / url / email / tel',
                content: '基础文本输入。email/url 自带格式验证；tel 在移动端唤起数字键盘；search 在部分浏览器带清除按钮。',
                code: '<input type="email" required />\n<input type="tel" pattern="[0-9]{11}" />',
                codeLanguage: 'html',
              },
              {
                title: '数字类 — number / range',
                content: 'number 输入数字，支持 min/max/step；range 是滑块选择器，适合范围值选择。',
                code: '<input type="number" min="0" max="100" step="0.1" />\n<input type="range" min="0" max="100" value="50" />',
                codeLanguage: 'html',
              },
              {
                title: '日期时间类 — date / time / datetime-local / month / week',
                content: '原生日期选择器，无需 JS 库。datetime-local 选择日期和时间；month/week 选择月/周。各浏览器 UI 略有差异。',
                code: '<input type="date" />\n<input type="datetime-local" />\n<input type="month" />',
                codeLanguage: 'html',
              },
              {
                title: '选择类 — checkbox / radio / color / file',
                content: 'checkbox 多选；radio 单选（同 name 一组）；color 颜色选择器；file 文件上传（accept 限制类型，multiple 多选）。',
                code: '<input type="checkbox" checked />\n<input type="radio" name="gender" />\n<input type="color" value="#ff7a17" />\n<input type="file" accept="image/*" multiple />',
                codeLanguage: 'html',
              },
              {
                title: '特殊类 — hidden / submit / button / reset / image',
                content: 'hidden 隐藏字段（存数据不显示）；submit/button/reset 是按钮变体；image 用图片作为提交按钮。',
                code: '<input type="hidden" name="id" value="42" />\n<input type="submit" value="提交" />\n<input type="image" src="submit.png" alt="提交" />',
                codeLanguage: 'html',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 13：表格结构（thead/tbody/tr/th/td）
    // ========================================================================
    {
      order: 13,
      title: '表格结构（thead/tbody/tr/th/td）',
      difficulty: 2,
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们让用户用表单输入数据。但数据收集来要展示，而有些数据是「二维」的——行与列交叉，比如课程表、价格对比、财务报表。用列表会很别扭，HTML 提供了 <table> 专门承载表格数据。先记住一条铁律：表格只用于「展示数据」，绝不用来做页面布局（分栏、对齐那是 CSS Flex/Grid 的活）——这是初学者最常犯、也最影响无障碍的错。',
        },
        {
          id: 'p12-1b',
          type: 'paragraph',
          text: 'HTML 表格用于展示二维数据。完整结构包括 caption（标题）、thead（表头）、tbody（主体）、tfoot（表尾）、tr（行）、th（表头单元格）、td（数据单元格）。',
        },
        {
          id: 'p12-2',
          type: 'code',
          language: 'html',
          filename: 'table.html',
          code: `<table>
  <caption>用户列表</caption>
  <thead>
    <tr>
      <th scope="col">姓名</th>
      <th scope="col">年龄</th>
      <th scope="col">邮箱</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>28</td>
      <td>zhangsan@example.com</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>32</td>
      <td>lisi@example.com</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">共 2 条记录</td>
    </tr>
  </tfoot>
</table>`,
        },
        {
          id: 'p12-3',
          type: 'callout',
          variant: 'tip',
          title: 'scope 属性提升无障碍',
          text: 'th 元素的 scope="col" 或 scope="row" 告诉读屏器该表头对应的是列还是行，让读屏器能正确朗读单元格与表头的对应关系。',
        },
        {
          id: 'p12-4',
          type: 'callout',
          variant: 'warning',
          title: '表格不要用于布局',
          text: '过去用 table 做页面布局是反模式。现代开发应使用 Flex/Grid 布局，table 仅用于展示真正的表格数据。',
        },
        {
          id: 'p12-5',
          type: 'demo',
          visualizationType: 'table-builder',
          data: {
            caption: '前端框架对比',
            headers: ['框架', '类型', '学习曲线', '性能'],
            rows: [
              ['React', '库', '中等', '优秀'],
              ['Vue', '框架', '平缓', '优秀'],
              ['Angular', '框架', '陡峭', '良好'],
            ],
            footer: ['共 3 个框架', '-', '-', '-'],
            steps: [
              {
                title: '表格标题 caption',
                description: 'caption 元素为表格提供标题，描述表格内容。',
                showRegions: ['caption'],
                code: '<table>\n  <caption>前端框架对比</caption>',
              },
              {
                title: '表头 thead',
                description: 'thead 定义表格的表头行，通常包含列标题。',
                showRegions: ['caption', 'thead'],
                code: '  <thead>\n    <tr><th>框架</th>...</tr>\n  </thead>',
              },
              {
                title: '表体 tbody',
                description: 'tbody 包含表格的主要数据行。',
                showRegions: ['caption', 'thead', 'tbody'],
                code: '  <tbody>\n    <tr><td>React</td>...</tr>\n  </tbody>',
              },
              {
                title: '表脚 tfoot',
                description: 'tfoot 定义表格的页脚，常用于汇总行。',
                showRegions: ['caption', 'thead', 'tbody', 'tfoot'],
                code: '  <tfoot>\n    <tr><td>共 3 个</td>...</tr>\n  </tfoot>\n</table>',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 14：描述列表 dl/dt/dd
    // ========================================================================
    {
      order: 14,
      title: '描述列表 dl/dt/dd',
      difficulty: 1,
      visualizationType: 'flipcard',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们用表格展示二维数据。但有种数据是「术语-解释」成对的——比如词汇表、商品参数（键→值）、FAQ（问题→答案）。用 ul 列表也行，但 HTML 提供了更贴切的 <dl> 描述列表：dt 放术语、dd 放解释，语义分明，读屏器和搜索引擎都能识别这种「对应关系」。这一节看它的结构和适用场景。',
        },
        {
          id: 'p13-1b',
          type: 'paragraph',
          text: '描述列表（Definition List）用于术语-描述的成对数据，如词汇表、元数据键值对。由 dl（列表）、dt（术语）、dd（描述）组成。',
        },
        {
          id: 'p13-flip',
          type: 'demo',
          visualizationType: 'flipcard',
          data: {
            cards: [
              {
                front: 'dl',
                frontSub: '描述列表容器',
                back: '<dl> 是描述列表容器，包裹一组或多组 dt/dd，语义为"这是一个术语-描述的成对列表"。',
              },
              {
                front: 'dt',
                frontSub: '术语 term',
                back: '<dt> 定义被描述的术语，通常为关键词。一个 dl 内可有多个 dt。',
              },
              {
                front: 'dd',
                frontSub: '描述 description',
                back: '<dd> 是对 dt 的描述，默认有缩进。一个 dt 可对应多个 dd，一个 dd 也可对应多个 dt。',
              },
            ],
          },
        },
        {
          id: 'p13-2',
          type: 'code',
          language: 'html',
          code: `<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言，用于构建网页结构。</dd>

  <dt>CSS</dt>
  <dd>层叠样式表，用于描述页面样式。</dd>

  <dt>JavaScript</dt>
  <dd>脚本语言，为网页添加交互能力。</dd>
</dl>`,
        },
        {
          id: 'p13-3',
          type: 'callout',
          variant: 'info',
          title: '一个 dt 可对应多个 dd',
          text: '一个术语可以有多个描述（多个 dd），一个描述也可对应多个术语（多个 dt）。这种灵活性使描述列表适合表达多对多关系。',
        },
      ],
    },

    // ========================================================================
    // 知识点 15：无障碍 WCAG POUR 四原则（Timeline）
    // ========================================================================
    {
      order: 15,
      title: '无障碍 WCAG POUR 四原则',
      difficulty: 3,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: '前面我们多次提到「语义化有利于无障碍」，但无障碍（a11y）到底是什么？想象这些真实用户：一位视障程序员用屏幕阅读器「听」你的页面；一位手部震颤的用户只能用键盘 Tab 键操作，无法精准点鼠标；一位色盲用户分不清红绿，全靠颜色提示的错误他看不见；一位在强光下看手机的用户，对比度太低就什么都看不清。无障碍不是「给盲人做特殊功能」，而是让所有人——包括残障人士、老年人、临时受伤的人——都能用你的页面。WCAG（Web Content Accessibility Guidelines）就是国际通用的无障碍标准，它的核心 POUR 四原则就是评估「你的页面到底能不能被所有人用」的框架。',
        },
        {
          id: 'p14-1b',
          type: 'paragraph',
          text: 'WCAG（Web Content Accessibility Guidelines）是无障碍的国际标准。其核心 POUR 四原则是评估 Web 内容无障碍性的基础框架。',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              {
                time: 'P',
                title: '可感知（Perceivable）',
                description: '信息和界面必须能被用户感知。不能被感知的内容等于不存在。用户故事：视障用户看不到图片，但读屏器能朗读 alt 文本，他就能「听」到图片内容；聋人用户听不到视频声音，但有了字幕就能看懂。如果图片没 alt、视频没字幕，这部分内容对这些用户而言「不存在」。',
                status: 'done',
              },
              {
                time: 'O',
                title: '可操作（Operable）',
                description: '界面元素必须可操作。不能仅依赖鼠标 — 所有功能都应能通过键盘完成。用户故事：手部震颤的用户点不准鼠标，只能用 Tab 键移动焦点、回车确认。如果你的按钮是 <div onclick>，Tab 键根本到不了，这个功能对他就是「锁死」的。',
                status: 'done',
              },
              {
                time: 'U',
                title: '可理解（Understandable）',
                description: '内容和操作必须可理解。使用清晰的语言，输入有错误提示，行为可预测。用户故事：老年用户填表输错邮箱，如果只显示红色边框（他可能看不清颜色），他会困惑「为什么提交不了」；改成红色边框 + 文字提示「请输入有效邮箱」，他才知道如何修正。',
                status: 'done',
              },
              {
                time: 'R',
                title: '健壮（Robust）',
                description: '内容必须能被各种用户代理（包括辅助技术）可靠解析。用户故事：读屏器软件版本各异，如果你的 HTML 标签嵌套错误、ARIA 用法不规范，不同读屏器可能朗读出完全不同的结果。用标准 HTML + 正确 ARIA，才能保证「同一份页面，所有工具都能正确解读」。',
                status: 'active',
              },
            ],
          },
        },
        {
          id: 'p14-3',
          type: 'callout',
          variant: 'note',
          title: 'WCAG 分级',
          text: 'WCAG 每条准则分 A、AA、AAA 三个等级。A 是最低要求，AA 是行业主流目标（多数法规要求），AAA 是最高标准。商业项目通常以 AA 为目标。',
        },
        {
          id: 'p14-4',
          type: 'demo',
          visualizationType: 'a11y-checklist',
          data: {
            title: '无障碍最佳实践',
            items: [
              {
                title: '为图片提供 alt 文本',
                description: '所有 img 元素应有 alt 属性描述图片内容。',
                code: '<img src="logo.png" alt="公司标志">',
                defaultChecked: true,
              },
              {
                title: '使用语义化标签',
                description: '优先使用 nav、main、article 等语义化元素而非 div。',
                code: '<nav>...</nav> 代替 <div class="nav">',
                defaultChecked: true,
              },
              {
                title: '表单元素关联 label',
                description: '每个表单控件都应有关联的 label 元素。',
                code: '<label for="email">邮箱</label>\n<input id="email" type="email">',
              },
              {
                title: '确保颜色对比度',
                description: '文本与背景对比度应达到 WCAG AA 标准（4.5:1）。',
              },
              {
                title: '键盘可访问性',
                description: '所有交互元素应可通过键盘操作（Tab/Enter/Space）。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 16：ARIA 属性使用
    // ========================================================================
    {
      order: 16,
      title: 'ARIA 属性使用',
      difficulty: 3,
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们用 WCAG POUR 框架理解了无障碍的四原则。但有时候原生 HTML 的语义不够用——比如你做了一个自定义的 Tab 切换、模态弹窗、下拉菜单，这些「富交互组件」HTML 没有现成标签。这时候 ARIA（Accessible Rich Internet Applications）就派上用场：它是一套额外属性，给那些「长着 div 的脸、干着按钮的活」的元素补上语义，让屏幕阅读器知道「这是个按钮」「这个弹窗打开了」「这个选项被选中了」。',
        },
        {
          id: 'p15-1b',
          type: 'paragraph',
          text: 'ARIA（Accessible Rich Internet Applications）为动态 Web 应用补充语义信息。当原生 HTML 语义不足时使用，让辅助技术理解组件的角色、状态和属性。',
        },
        {
          id: 'p15-2',
          type: 'heading',
          level: 3,
          text: 'ARIA 三大维度',
        },
        {
          id: 'p15-3',
          type: 'list',
          items: [
            'role — 角色定义：告诉辅助技术这是什么。如 role="button"、role="dialog"、role="tablist"。',
            'aria-* 状态 — 动态状态：如 aria-expanded（展开）、aria-checked（选中）、aria-hidden（隐藏）。',
            'aria-* 属性 — 静态属性：如 aria-label（标签）、aria-describedby（描述）、aria-live（实时区域）。',
          ],
        },
        {
          id: 'p15-4',
          type: 'code',
          language: 'html',
          code: `<!-- 模拟按钮（无原生 button 时） -->
<div role="button" tabindex="0" aria-pressed="false"
     aria-label="切换菜单" onclick="toggle()">
  菜单
</div>

<!-- 模态对话框 -->
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">确认删除</h2>
  <p>此操作不可撤销</p>
</div>

<!-- 实时通知 -->
<div role="alert" aria-live="assertive">
  保存成功
</div>

<!-- Tab 组件 -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">标签 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">标签 2</button>
</div>
<div role="tabpanel" id="panel-1">内容 1</div>`,
        },
        {
          id: 'p15-code-parse',
          type: 'paragraph',
          text: '代码解析：第一个例子用 <div role="button"> 模拟按钮——role 告诉读屏器「这是按钮」，tabindex="0" 让它能被 Tab 键聚焦，aria-pressed 表示按下状态，aria-label 提供可朗读的名字。第二个模态对话框用 role="dialog" + aria-modal="true" 表示「这是一个需要聚焦的弹窗」，aria-labelledby 指向标题让读屏器朗读。第三个 role="alert" 是实时区域，内容变化时读屏器会立即播报「保存成功」。最后 Tab 组件用 aria-selected 标记当前选中的标签，aria-controls 关联它控制的面板——这样键盘和读屏器用户也能流畅切换。',
        },
        {
          id: 'p15-5',
          type: 'callout',
          variant: 'warning',
          title: 'ARIA 第一法则',
          text: '如果能用原生 HTML 元素或属性实现所需语义和无障碍体验，就不要用 ARIA。例如用 <button> 而非 <div role="button">。ARIA 是补充，不是替代。',
        },
      ],
    },

    // ========================================================================
    // 知识点 17：多媒体 video/audio
    // ========================================================================
    {
      order: 17,
      title: '多媒体 video/audio',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: '前面我们搭好了文档骨架、学会了用表单收集输入。但一个纯文字的页面是枯燥的——我们需要图片、视频、音频来承载更丰富的信息。为什么要在「骨架」之后讲媒体？因为媒体资源是页面里体积最大的部分，一张未优化的图片可能比整个 HTML 还大，直接拖慢首屏加载。这一节我们看 HTML 如何引入媒体，以及 video/audio 的属性如何平衡「体验」与「性能」。',
        },
        {
          id: 'p16-1b',
          type: 'paragraph',
          text: 'HTML5 原生支持视频和音频播放，无需 Flash 等插件。video/audio 元素提供播放控制 API，支持多种格式。',
        },
        {
          id: 'p16-2',
          type: 'code',
          language: 'html',
          code: `<!-- 视频 -->
<video
  src="movie.mp4"
  width="640"
  controls
  poster="cover.jpg"
  preload="metadata"
>
  您的浏览器不支持 video 标签。
</video>

<!-- 多源视频（兼容不同浏览器） -->
<video controls>
  <source src="movie.webm" type="video/webm" />
  <source src="movie.mp4" type="video/mp4" />
  <track src="subtitles.vtt" kind="subtitles"
         srclang="zh" label="中文字幕" />
</video>

<!-- 音频 -->
<audio controls>
  <source src="audio.ogg" type="audio/ogg" />
  <source src="audio.mp3" type="audio/mpeg" />
</audio>`,
        },
        {
          id: 'p16-code-parse',
          type: 'paragraph',
          text: '代码解析：第一个 video 用单一 src，controls 显示播放控件，poster 是「封面图」（视频加载前显示），preload="metadata" 表示只预加载元数据（不预下载整个视频，省流量）。第二个 video 用多个 <source>——浏览器会从上到下找第一个能解码的格式（WebP/WebM 体积小但老 Safari 不支持，所以回退到 MP4）。<track> 引入字幕文件，kind="subtitles" 是字幕，srclang 指定语言——这正是上一节无障碍「可感知」原则的落地。音频 <audio> 用法相同，只是没有画面。',
        },
        {
          id: 'p16-picture-intro',
          type: 'paragraph',
          text: '除了视频音频，图片才是页面里体积最大的媒体资源。一张高清大图可能 2MB，如果手机也加载它，首屏会慢得难以忍受。<img> 只能给一个固定图，而 <picture> + srcset 能让浏览器「按屏幕情况挑图」——手机下小图、Retina 屏下高清图、支持 WebP 的浏览器下压缩图。这是响应式图片的核心，初学者最容易看不懂的就是 srcset 里的描述符，下面逐行拆解。',
        },
        {
          id: 'p16-picture-code',
          type: 'code',
          language: 'html',
          filename: 'responsive-image.html',
          code: `<!-- 写法一：srcset + 像素密度描述符（1x/2x） -->
<img
  src="photo.jpg"
  srcset="photo.jpg 1x, photo@2x.jpg 2x, photo@3x.jpg 3x"
  alt="示例图"
/>
<!-- 普通屏（1x）用 photo.jpg；Retina 屏（2x）用 photo@2x.jpg，更清晰 -->

<!-- 写法二：srcset + 宽度描述符（w）+ sizes -->
<img
  src="photo.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="示例图"
/>
<!-- 浏览器根据视口宽 + sizes 约定，挑最合适的宽度版本 -->

<!-- 写法三：<picture> 艺术指导 + 格式回退 -->
<picture>
  <source media="(max-width: 600px)" srcset="mobile.jpg" />
  <source type="image/webp" srcset="photo.webp" />
  <img src="photo.jpg" alt="示例图" />
</picture>
<!-- 手机用 mobile.jpg（可裁不同构图）；支持 webp 用 webp（更小）；否则回退 jpg -->`,
        },
        {
          id: 'p16-picture-parse',
          type: 'paragraph',
          text: '代码解析——这是本节最需要细读的部分：\n• 写法一的 1x/2x/3x 叫「像素密度描述符」，对应屏幕的 devicePixelRatio。普通显示器是 1x（一个 CSS 像素 = 一个物理像素），iPhone 是 2x 或 3x（一个 CSS 像素 = 2~3 个物理像素），所以 Retina 屏需要 2 倍像素的图才清晰。浏览器自己探测屏幕密度挑图。\n• 写法二的 400w/800w/1200w 叫「宽度描述符」，w 表示「这张图实际宽 400 像素」。光给图宽还不够，浏览器不知道你要把图显示多大——sizes 属性就是告诉它「显示宽度」：sizes="(max-width: 600px) 100vw, 50vw" 意思是「视口≤600px 时图占满屏宽（100vw），否则占一半（50vw）」。浏览器综合视口宽 + devicePixelRatio + sizes，挑最接近的一张，避免下大图浪费流量。\n• 写法三的 <picture> 用 <source> 的 media 做艺术指导（手机/桌面用完全不同的图，比如手机用竖构图裁剪）、用 type 做格式回退（webp 比 jpg 小 30% 但老浏览器不支持，放第一个，不支持的自动跳过）。最后的 <img> 是兜底，所有 source 都不匹配时用它，且必须写 alt。\n一句话记忆：密度适配用 1x/2x，尺寸适配用 w + sizes，格式/构图适配用 <picture> + source。',
        },
        {
          id: 'p16-2-demo',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '交互式 video 属性演示：勾选属性切换实时查看效果，点击 API 按钮调用播放控制方法（需联网加载测试视频）。',
            initialCode: `<style>
  .panel { font-family: -apple-system, sans-serif; color: #1f2937; }
  .video-wrap { text-align: center; margin-bottom: 10px; }
  video { max-width: 100%; border-radius: 6px; background: #000; }
  .status { font-size: 12px; color: #6b7280; margin-bottom: 8px; font-family: monospace; }
  .api-btns { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
  .api-btns button {
    padding: 4px 10px; background: #10b981; color: #fff;
    border: none; border-radius: 4px; cursor: pointer; font-size: 12px;
  }
  .api-btns button:hover { background: #059669; }
  .controls { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
  .controls label {
    display: flex; align-items: center; gap: 4px;
    padding: 4px 10px; background: #f3f4f6; border-radius: 4px;
    font-size: 12px; cursor: pointer; user-select: none;
    transition: background 0.15s;
  }
  .controls label.active { background: #3b82f6; color: #fff; }
  .controls input { display: none; }
  .code-out {
    background: #1f2937; color: #d1d5db; padding: 8px;
    border-radius: 4px; font-family: monospace; font-size: 11px;
    white-space: pre-wrap; word-break: break-all;
  }
</style>

<div class="panel">
  <div class="video-wrap">
    <video id="v" width="280" controls preload="metadata"
      poster="https://www.w3schools.com/html/pic_trulli.jpg">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      您的浏览器不支持 video 标签。
    </video>
  </div>

  <div class="status" id="status">当前：paused · 0s / 0s</div>

  <div class="api-btns">
    <button onclick="document.getElementById('v').play()">▶ play()</button>
    <button onclick="document.getElementById('v').pause()">⏸ pause()</button>
    <button onclick="document.getElementById('v').load()">↻ load()</button>
    <button onclick="document.getElementById('v').currentTime += 5">⏩ +5s</button>
  </div>

  <div class="controls" id="ctrls">
    <label><input type="checkbox" data-attr="controls" checked> controls</label>
    <label><input type="checkbox" data-attr="loop"> loop</label>
    <label><input type="checkbox" data-attr="muted"> muted</label>
    <label><input type="checkbox" data-attr="autoplay"> autoplay</label>
  </div>

  <div class="code-out" id="codeOut"></div>
</div>

<script>
  (function() {
    var v = document.getElementById('v');
    var status = document.getElementById('status');
    var codeOut = document.getElementById('codeOut');

    function updateCode() {
      var attrs = [];
      document.querySelectorAll('#ctrls input').forEach(function(cb) {
        if (cb.checked) attrs.push(cb.dataset.attr);
      });
      var attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
      codeOut.textContent = '<video' + attrStr + ' src="mov_bbb.mp4"></video>';
    }

    document.querySelectorAll('#ctrls input').forEach(function(cb) {
      cb.addEventListener('change', function() {
        var attr = cb.dataset.attr;
        if (cb.checked) v.setAttribute(attr, '');
        else v.removeAttribute(attr);
        cb.parentElement.classList.toggle('active', cb.checked);
        if (attr === 'autoplay' && cb.checked && !v.muted) {
          status.textContent = '⚠ autoplay 通常需配合 muted 才能生效';
        }
        updateCode();
      });
      if (cb.checked) cb.parentElement.classList.add('active');
    });

    function updateTime() {
      var cur = Math.floor(v.currentTime || 0);
      var dur = Math.floor(v.duration || 0);
      var state = v.paused ? 'paused' : 'playing';
      status.textContent = '当前：' + state + ' · ' + cur + 's / ' + dur + 's';
    }
    v.addEventListener('timeupdate', updateTime);
    v.addEventListener('play', updateTime);
    v.addEventListener('pause', updateTime);
    v.addEventListener('loadedmetadata', updateTime);

    updateCode();
  })();
</script>`,
          },
        },
        {
          id: 'p16-3',
          type: 'table',
          caption: '常用属性',
          headers: ['属性', '作用', '默认值'],
          rows: [
            ['controls', '显示播放控件', 'false'],
            ['autoplay', '自动播放（多数浏览器已禁用）', 'false'],
            ['loop', '循环播放', 'false'],
            ['muted', '静音', 'false'],
            ['poster', '视频封面图（仅 video）', '—'],
            ['preload', '预加载策略：none/metadata/auto', 'metadata'],
          ],
        },
        {
          id: 'p16-4',
          type: 'callout',
          variant: 'warning',
          title: 'autoplay 限制',
          text: '现代浏览器禁止带声音的自动播放，必须 muted 才能 autoplay。这是为改善用户体验、避免噪音骚扰。设计时不要依赖自动播放。',
        },
      ],
    },

    // ========================================================================
    // 知识点 18：Canvas 与 SVG 概述
    // ========================================================================
    {
      order: 18,
      title: 'Canvas 与 SVG 概述',
      difficulty: 1,
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: '上一节我们用 img/video 引入了「现成」的媒体资源。但有时候你想「现场画」——画个动态图表、一个可交互的图标、一个签名板。HTML5 提供两条路：Canvas（用 JS 逐像素画位图，画完就是一张图）和 SVG（用 XML 标签声明矢量图，每个图形都是 DOM 节点）。这一节看两者的本质区别，以及什么场景该选谁——选错会导致性能问题或维护噩梦。',
        },
        {
          id: 'p17-1b',
          type: 'paragraph',
          text: 'HTML5 提供两种图形绘制方案：Canvas（位图，命令式）和 SVG（矢量，声明式）。两者各有适用场景。',
        },
        {
          id: 'p17-2',
          type: 'table',
          caption: 'Canvas vs SVG',
          headers: ['维度', 'Canvas', 'SVG'],
          rows: [
            ['类型', '位图（栅格）', '矢量图'],
            ['API 风格', '命令式（JS 绘制）', '声明式（XML 标签）'],
            ['DOM 节点', '单个 canvas 元素', '每个图形都是 DOM 节点'],
            ['事件', '需手动计算坐标命中', '原生支持事件绑定'],
            ['缩放', '失真（像素化）', '无损（矢量）'],
            ['性能', '大量元素时更优', '元素少时更优'],
            ['适用', '游戏、图像处理、复杂动画', '图标、图表、地图、可交互图形'],
          ],
        },
        {
          id: 'p17-3',
          type: 'code',
          language: 'html',
          code: `<!-- Canvas：JS 绘制 -->
<canvas id="c" width="200" height="200"></canvas>
<script>
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ff7a17';
  ctx.fillRect(50, 50, 100, 100);
</script>

<!-- SVG：标签声明 -->
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="50" width="100" height="100" fill="#ff7a17" />
</svg>`,
        },
      ],
    },

    // ========================================================================
    // 知识点 19：HTML5 API 能力图谱（KnowledgeGraph）
    // ========================================================================
    {
      order: 19,
      title: 'HTML5 API 能力图谱',
      difficulty: 2,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: '前面我们讲的都是「标签」——用标签描述内容和结构。但现代网页要存数据（购物车）、要实时通信（聊天）、要定位（地图）、要离线可用（PWA）……光靠标签远远不够。HTML5 的真正威力在于它带了一整套 Web API：localStorage 存数据、WebSocket 实时通信、Geolocation 定位、Web Worker 多线程、Service Worker 离线缓存。这一节用知识图谱纵览这些能力，建立「浏览器原生能做什么」的全景——遇到需求时，先想想是不是有原生 API 能省掉一个第三方库。',
        },
        {
          id: 'p18-1b',
          type: 'paragraph',
          text: 'HTML5 不只是标签，更是一组 Web API 集合，赋予浏览器原生能力：存储、通信、设备访问、图形、离线等。',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'html5', label: 'HTML5 API', group: 'core', weight: 2 },
              { id: 'storage', label: '存储', group: 'related' },
              { id: 'comm', label: '通信', group: 'related' },
              { id: 'device', label: '设备', group: 'related' },
              { id: 'graphics', label: '图形', group: 'related' },
              { id: 'offline', label: '离线', group: 'related' },
              { id: 'localstorage', label: 'localStorage', group: 'detail' },
              { id: 'sessionstorage', label: 'sessionStorage', group: 'detail' },
              { id: 'indexeddb', label: 'IndexedDB', group: 'detail' },
              { id: 'websocket', label: 'WebSocket', group: 'detail' },
              { id: 'webrtc', label: 'WebRTC', group: 'detail' },
              { id: 'geo', label: 'Geolocation', group: 'detail' },
              { id: 'media', label: 'MediaDevices', group: 'detail' },
              { id: 'canvas', label: 'Canvas', group: 'detail' },
              { id: 'svg', label: 'SVG', group: 'detail' },
              { id: 'webgl', label: 'WebGL', group: 'detail' },
              { id: 'sw', label: 'Service Worker', group: 'detail' },
            ],
            edges: [
              { source: 'html5', target: 'storage' },
              { source: 'html5', target: 'comm' },
              { source: 'html5', target: 'device' },
              { source: 'html5', target: 'graphics' },
              { source: 'html5', target: 'offline' },
              { source: 'storage', target: 'localstorage' },
              { source: 'storage', target: 'sessionstorage' },
              { source: 'storage', target: 'indexeddb' },
              { source: 'comm', target: 'websocket' },
              { source: 'comm', target: 'webrtc' },
              { source: 'device', target: 'geo' },
              { source: 'device', target: 'media' },
              { source: 'graphics', target: 'canvas' },
              { source: 'graphics', target: 'svg' },
              { source: 'graphics', target: 'webgl' },
              { source: 'offline', target: 'sw' },
            ],
          },
        },
        {
          id: 'p18-3',
          type: 'demo',
          visualizationType: 'api-card',
          data: {
            title: 'HTML5 API 能力图谱',
            hint: '点击卡片查看 API 详情、关键方法和典型应用场景。',
            cards: [
              { id: 'canvas', icon: '🎨', name: 'Canvas', tag: '2D 绘图' },
              { id: 'workers', icon: '⚙️', name: 'Web Workers', tag: '多线程' },
              { id: 'websocket', icon: '🔌', name: 'WebSocket', tag: '实时通信' },
              { id: 'geo', icon: '📍', name: 'Geolocation', tag: '定位' },
              { id: 'drag', icon: '✋', name: 'Drag & Drop', tag: '拖拽' },
              { id: 'picture', icon: '🖼️', name: 'picture', tag: '响应式图片' },
              { id: 'dialog', icon: '💬', name: 'dialog', tag: '原生对话框' },
              { id: 'details', icon: '📋', name: 'details', tag: '折叠面板' },
            ],
            details: {
              canvas: {
                title: 'Canvas — 2D 图形绘制',
                html: '<b>用途：</b>像素级 2D 图形绘制，适合图表、游戏、图像处理<br><b>关键方法：</b><code>getContext("2d")</code> <code>fillRect()</code> <code>arc()</code> <code>fillText()</code><br><b>注意：</b>Canvas 是位图，缩放会失真；SVG 是矢量图，缩放不失真<br><b>典型场景：</b>数据可视化图表、2D 游戏、图片滤镜、签名板',
              },
              workers: {
                title: 'Web Workers — 后台线程计算',
                html: '<b>用途：</b>在独立线程中执行耗时计算，不阻塞 UI 主线程<br><b>关键方法：</b><code>new Worker("file.js")</code> <code>postMessage()</code> <code>onmessage</code><br><b>限制：</b>不能操作 DOM，不能访问 window/document 对象<br><b>典型场景：</b>大数据排序、图像处理、加密计算、复杂数学运算',
              },
              websocket: {
                title: 'WebSocket — 全双工实时通信',
                html: '<b>用途：</b>建立持久双向连接，适合实时数据推送<br><b>关键方法：</b><code>new WebSocket("wss://...")</code> <code>send()</code> <code>onmessage</code> <code>close()</code><br><b>vs HTTP 轮询：</b>一次握手持久连接，低延迟低开销<br><b>典型场景：</b>聊天应用、实时协作、股票行情、多人游戏',
              },
              geo: {
                title: 'Geolocation — 获取地理位置',
                html: '<b>用途：</b>获取用户经纬度坐标，支持一次性获取和持续监听<br><b>关键方法：</b><code>getCurrentPosition()</code> <code>watchPosition()</code> <code>clearWatch()</code><br><b>前提：</b>需 HTTPS 环境 + 用户授权，注意隐私合规<br><b>典型场景：</b>地图导航、附近搜索、位置签到、天气查询',
              },
              drag: {
                title: 'Drag & Drop — 原生拖拽交互',
                html: '<b>用途：</b>实现拖拽排序、文件上传等交互，无需第三方库<br><b>关键属性/事件：</b><code>draggable="true"</code> <code>dragstart</code> <code>dragover</code> <code>drop</code> <code>dataTransfer</code><br><b>注意：</b>dragover 必须调用 <code>preventDefault()</code> 才能触发 drop<br><b>典型场景：</b>文件拖拽上传、看板拖拽排序、图片拖放排列',
              },
              picture: {
                title: 'picture — 响应式图片',
                html: '<b>用途：</b>根据屏幕尺寸和格式支持加载不同图片<br><b>关键元素：</b><code>&lt;picture&gt;</code> <code>&lt;source&gt;</code> <code>srcset</code> <code>media</code> <code>type</code><br><b>优势：</b>艺术指导（不同尺寸不同构图）+ 格式回退（webp → jpg）<br><b>典型场景：</b>移动端小图/桌面端大图、WebP 格式优先、Retina 屏幕适配',
              },
              dialog: {
                title: 'dialog — 原生对话框',
                html: '<b>用途：</b>原生模态/非模态对话框，无需 JS 实现遮罩和焦点管理<br><b>关键方法：</b><code>showModal()</code>（模态） <code>show()</code>（非模态） <code>close()</code> <code>returnValue</code><br><b>特性：</b>自带 ESC 关闭、焦点陷阱、<code>::backdrop</code> 伪元素<br><b>典型场景：</b>确认对话框、表单弹窗、提示信息、图片预览',
              },
              details: {
                title: 'details/summary — 原生折叠面板',
                html: '<b>用途：</b>无需 JavaScript 的可折叠内容区域<br><b>关键元素/属性：</b><code>&lt;details&gt;</code> <code>&lt;summary&gt;</code> <code>open</code> 属性<br><b>特性：</b>点击 summary 自动切换展开/收起，<code>open</code> 属性默认展开<br><b>典型场景：</b>FAQ 页面、设置面板、侧边栏折叠、代码折叠',
              },
            },
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 20：URL 结构解析
    // ========================================================================
    {
      order: 20,
      title: 'URL 结构解析',
      difficulty: 1,
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          lead: true,
          text: '前面我们学了 HTML 的标签、文档、API。但所有 Web 资源——页面、图片、接口——都靠一个东西定位：URL。前端的每一项工作底层都绕不开它：路由跳转（/users/123）、接口请求（https://api.example.com/v1/list?page=2）、SEO（规范的 URL 结构）、甚至<a>链接的 href。这一节我们把 URL 像拆快递一样拆开：协议、主机、端口、路径、查询参数、锚点各是什么，前端开发中怎么拼装和解析它们。',
        },
        {
          id: 'p19-1b',
          type: 'paragraph',
          text: 'URL（Uniform Resource Locator）统一资源定位符，是 Web 资源的地址。理解 URL 结构对前端路由、API 调用、SEO 都很重要。',
        },
        {
          id: 'p19-2',
          type: 'code',
          language: 'text',
          code: `https://user:pass@www.example.com:8080/path/to/page?name=html&lang=zh#section1
  │       │     │        │         │    │            │              │
  │       │     │        │         │    │            │              └─ fragment 锚点
  │       │     │        │         │    │            └─ query 查询参数
  │       │     │        │         │    └─ path 路径
  │       │     │        │         └─ port 端口
  │       │     │        └─ host 主机名
  │       │     └─ password（已废弃，不推荐）
  │       └─ username
  └─ scheme 协议`,
        },
        {
          id: 'p19-3',
          type: 'table',
          caption: 'URL 各部分说明',
          headers: ['部分', '名称', '示例', '说明'],
          rows: [
            ['scheme', '协议', 'https', 'http/https/ftp/ws 等'],
            ['host', '主机名', 'www.example.com', '域名或 IP'],
            ['port', '端口', '8080', 'http 默认 80，https 默认 443'],
            ['path', '路径', '/path/to/page', '资源在服务器上的路径'],
            ['query', '查询参数', '?name=html&lang=zh', '键值对，& 分隔'],
            ['fragment', '锚点', '#section1', '页面内位置，不发送到服务器'],
          ],
        },
        {
          id: 'p19-4',
          type: 'callout',
          variant: 'tip',
          title: 'URL API',
          text: '现代浏览器内置 URL 构造函数，可方便地解析 URL：new URL("https://example.com/path?q=1") 返回的对象含 protocol/host/pathname/search/hash 等属性。',
        },
        {
          id: 'p19-5',
          type: 'demo',
          visualizationType: 'path-parser',
          data: {
            defaultUrl: 'https://example.com/path/to/page?name=hello&age=25#section',
            examples: [
              'https://example.com/path/to/page?name=hello&age=25#section',
              'http://localhost:3000/api/users?id=123',
              'https://developer.mozilla.org/zh-CN/docs/Web/HTML',
            ],
            hint: '输入 URL 实时解析各组成部分',
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 21：实战案例：无障碍注册表单
    // ========================================================================
    {
      order: 21,
      title: '实战案例：无障碍注册表单',
      difficulty: 3,
      blocks: [
        {
          id: 'p21case-1',
          type: 'paragraph',
          text: '综合运用 fieldset/legend 分组、label 关联、aria-describedby 提示、aria-required 标注，构建一个对辅助技术友好的注册表单。',
        },
        {
          id: 'p21case-2',
          type: 'code',
          language: 'html',
          filename: 'accessible-register.html',
          code: `<form action="/register" method="post" novalidate>
  <fieldset>
    <legend>账户信息</legend>
    <div>
      <label for="username">用户名 <span aria-hidden="true">*</span></label>
      <input id="username" name="username" type="text"
             required aria-required="true"
             aria-describedby="username-hint" />
      <small id="username-hint">3-20 个字符，仅限字母数字下划线</small>
    </div>
    <div>
      <label for="email">邮箱 <span aria-hidden="true">*</span></label>
      <input id="email" name="email" type="email"
             required aria-required="true"
             aria-describedby="email-hint" />
      <small id="email-hint">用于接收验证邮件</small>
    </div>
  </fieldset>
  <fieldset>
    <legend>安全设置</legend>
    <div>
      <label for="password">密码</label>
      <input id="password" name="password" type="password"
             minlength="8" required aria-required="true" />
    </div>
    <div>
      <label for="confirm">确认密码</label>
      <input id="confirm" name="confirm" type="password" required />
    </div>
  </fieldset>
  <button type="submit">注册</button>
</form>`,
        },
        {
          id: 'p21case-3',
          type: 'callout',
          variant: 'tip',
          title: '无障碍表单要点',
          text: 'fieldset/legend 分组语义化；label[for] 关联输入控件；aria-describedby 链接提示文本；aria-required 标注必填；novalidate 关闭浏览器原生验证以便自定义验证逻辑。',
        },
      ],
    },

    // ========================================================================
    // 知识点 22：综合实战 — 搭建博客文章页（任务导向，断言沙盒）
    // ========================================================================
    {
      order: 22,
      title: '综合实战：搭建博客文章页',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p21proj-1',
          type: 'paragraph',
          lead: true,
          text: '前面我们学了文档结构、语义化、多媒体——这些是离散的积木。现在该拿「拼装图纸」把它们拼起来了。这一节是第一个综合实战：从零搭建一篇博客文章页。你要综合运用 head 元信息、语义化骨架（header/nav/main/article/aside/footer）、图片与响应式资源。右侧沙盒已内置「任务检查清单」——你写代码时它会实时告诉你哪条没达标、该怎么改，这是从「看懂」到「写会」的关键一步。',
        },
        {
          id: 'p21proj-2',
          type: 'paragraph',
          text: '任务要求：用语义化标签搭出完整文章页骨架，包含页眉导航、主文章（标题+正文+一张带 alt 的图片）、侧边相关推荐、页脚版权。head 内配齐字符编码与移动端视口。',
        },
        {
          id: 'p21proj-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '在下方编辑器中编写博客文章页 HTML。任务检查清单会实时校验你的代码并给出提示——逐条通过即完成任务。可随时点击「重置」回退到初始骨架。',
            initialCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- 补充字符编码与移动端视口 -->

  <title>我的第一篇博客</title>
</head>
<body>
  <!-- 页眉 + 导航 -->

  <main>
    <!-- 文章：标题 + 正文 + 图片 -->

  </main>

  <!-- 侧边相关推荐 -->

  <!-- 页脚版权 -->

</body>
</html>`,
            checks: [
              {
                description: 'head 内声明字符编码 <meta charset="UTF-8">',
                pattern: '<meta\\s+charset=["\']?utf-8["\']?',
                hint: '在 <head> 内加 <meta charset="UTF-8" />，防止中文乱码。注意 charset 要在 1024 字节内。',
              },
              {
                description: 'head 内配置移动端视口 <meta name="viewport" ...>',
                pattern: '<meta\\s+name=["\']viewport["\'][^>]*width=device-width',
                hint: '加 <meta name="viewport" content="width=device-width, initial-scale=1.0" />，否则移动端会被缩小显示。',
              },
              {
                description: '使用 <header> 语义化页眉',
                pattern: '<header[\\s>]',
                hint: '页面顶部用 <header> 包裹，而非 <div class="header">。语义化让读屏器可识别页眉区域。',
              },
              {
                description: '使用 <nav> 包裹导航',
                pattern: '<nav[\\s>]',
                hint: '导航链接区域用 <nav>，读屏器会提示「导航区域」，用户可一键跳过直达正文。',
              },
              {
                description: '使用 <main> 作为页面主体（且只有一个）',
                pattern: '<main[\\s>]',
                hint: '主体内容用 <main>，每页只能有一个。它告诉辅助技术「这是核心内容」。',
              },
              {
                description: '使用 <article> 包裹文章内容',
                pattern: '<article[\\s>]',
                hint: '文章本身是可独立分发的内容，用 <article> 包裹，里面有标题（h1/h2）和正文。',
              },
              {
                description: '文章内包含一张图片且带 alt 属性（无障碍）',
                pattern: '<img[^>]*\\salt=["\'][^"\']+["\']',
                hint: '图片用 <img> 且必须写 alt（描述图片内容）。无 alt 的图片对视障用户「不存在」，违反 WCAG 可感知原则。',
              },
              {
                description: '使用 <aside> 承载侧边相关推荐',
                pattern: '<aside[\\s>]',
                hint: '与正文相关但非核心的内容（侧边推荐、广告）用 <aside>。',
              },
              {
                description: '使用 <footer> 页脚',
                pattern: '<footer[\\s>]',
                hint: '版权信息、联系方式等收尾内容用 <footer>。',
              },
            ],
          },
        },
        {
          id: 'p21proj-4',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '它把「文档结构 + 语义化 + 多媒体无障碍」三章串联成一个真实产物。完成后你会发现：语义化不是抽象规范，而是让页面「能被机器读懂」的具体动作；alt 不只是属性，而是视障用户「看到」图片的唯一途径。这种「拼装」经验，是单纯背标签无法替代的工程思维。',
        },
      ],
    },

    // ========================================================================
    // 知识点 23：综合实战 — 带验证的注册表单（任务导向，断言沙盒）
    // ========================================================================
    {
      order: 23,
      title: '综合实战：带验证的注册表单',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p21b-1',
          type: 'paragraph',
          lead: true,
          text: '上一个实战我们搭了展示型页面。现在做交互型——一个带验证的注册表单，综合运用表单控件、原生验证属性、无障碍表单实践（label 关联、必填标注）。这是第二个「拼装图纸」：把「表单 + 验证 + 无障碍」三章焊在一起。同样地，右侧沙盒的任务检查清单会实时校验你的代码并给教学反馈。',
        },
        {
          id: 'p21b-2',
          type: 'paragraph',
          text: '任务要求：实现一个注册表单，含用户名（必填）、邮箱（必填+格式校验）、密码（必填+最少8位）、角色选择下拉，以及提交按钮。所有输入都要用 label 关联，必填项要标注。',
        },
        {
          id: 'p21b-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '编写带验证的注册表单 HTML。任务检查清单会实时校验——逐条通过即完成。重点关注 label 关联与原生验证属性。',
            initialCode: `<form>
  <!-- 用户名：必填 -->

  <!-- 邮箱：必填 + 格式校验 -->

  <!-- 密码：必填 + 最少 8 位 -->

  <!-- 角色下拉选择 -->

  <!-- 提交按钮 -->

</form>`,
            checks: [
              {
                description: '使用 <form> 包裹表单',
                pattern: '<form[\\s>]',
                hint: '所有表单控件要在 <form> 内，才能统一提交和验证。',
              },
              {
                description: '用户名输入框 type="text" 且 required 必填',
                pattern: '<input[^>]*type=["\']text["\'][^>]*required',
                hint: '用户名用 <input type="text" required>。required 让浏览器自动挡住空值提交。注意顺序：required 要在 input 标签内。',
              },
              {
                description: '邮箱输入框 type="email" 且 required',
                pattern: '<input[^>]*type=["\']email["\'][^>]*required',
                hint: '邮箱用 <input type="email" required>。type="email" 让浏览器自动校验邮箱格式（含 @），移动端还会唤起带 @ 的键盘。',
              },
              {
                description: '密码输入框 type="password" 且 minlength="8" required',
                pattern: '<input[^>]*type=["\']password["\'][^>]*(minlength=["\']8["\']|required)',
                hint: '密码用 <input type="password" minlength="8" required>。minlength 限制最少字符数。注意检查要同时有 minlength 和 required。',
              },
              {
                description: '使用 <select> 下拉选择（带占位空选项）',
                pattern: '<select[\\s>]',
                hint: '角色选择用 <select>，配合 <option value="">请选择</option> 占位，再加 required 才能强制用户选择。',
              },
              {
                description: '使用 <button type="submit"> 提交按钮',
                pattern: '<button[^>]*type=["\']submit["\']',
                hint: '提交用 <button type="submit">，而非 <div onclick> 或 <input type="submit">。button 原生支持键盘操作和读屏器语义。',
              },
              {
                description: '所有输入框用 <label for> 关联（无障碍）',
                pattern: '<label[^>]*for=["\'][a-zA-Z0-9_-]+["\']',
                hint: '每个输入框配一个 <label for="id">，for 值等于 input 的 id。这让点击 label 聚焦输入框，读屏器朗读时告知「这是什么字段」。',
              },
              {
                description: '至少一个输入框带 aria-required 或 required 标注必填',
                pattern: 'aria-required=["\'](?:true|false)["\']|required',
                hint: '必填字段除了 required，也可加 aria-required="true" 让读屏器明确告知「必填」。原生 required 已隐含此语义，二选一即可。',
              },
            ],
          },
        },
        {
          id: 'p21b-4',
          type: 'callout',
          variant: 'warning',
          title: '实战后的反思：前端验证的边界',
          text: '完成这个练习后请记住：以上所有验证（required/minlength/type）都只是「用户体验层」的拦截——恶意用户可用 novalidate 或直接用 Postman 绕过。真实项目里，这个表单还要在后端做一遍完整校验。前端验证负责「让正常用户少犯错」，后端验证负责「保证数据安全」，两者缺一不可。',
        },
      ],
    },

    // ========================================================================
    // 知识点 24：面试题
    // ========================================================================
    {
      order: 24,
      title: '面试题',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p22iv-1',
          type: 'paragraph',
          text: '精选 HTML 基础高频面试题，涵盖概念理解与实战应用。点击展开查看参考答案。',
        },
        {
          id: 'p22iv-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: HTML 语义化是什么？为什么重要？',
                content: '语义化是指使用有含义的标签（如 header/nav/main/article）来描述内容结构，而非用无语义的 div。\n\n重要性：\n1. 提升 SEO——搜索引擎能理解内容权重。\n2. 改善无障碍——读屏器可导航。\n3. 增强可读性和可维护性。\n4. 便于团队协作。',
              },
              {
                title: 'Q2: src 和 href 的区别？',
                content: '两者都用于引用外部资源，但加载行为不同。\n\nsrc（Source）：\n- 用于替换当前元素，如 img/script/iframe。\n- 浏览器会暂停解析去加载资源，阻塞文档。\n\nhref（Hypertext Reference）：\n- 用于建立链接关系，如 a/link。\n- 浏览器并行加载，不阻塞。\n\n结论：src 会阻塞，href 不会。',
              },
              {
                title: 'Q3: script 标签的 defer 和 async 区别？',
                content: '两者都异步下载脚本，但执行时机不同。\n\ndefer：\n- 下载不阻塞 HTML 解析。\n- 执行等 HTML 解析完成后按顺序执行。\n- 适合有依赖的脚本。\n\nasync：\n- 下载不阻塞。\n- 下载完立即执行（暂停 HTML 解析）。\n- 执行顺序不确定。\n- 适合独立脚本如统计代码。',
              },
              {
                title: 'Q4: HTML5 的离线存储方案有哪些？',
                content: '常见方案各有适用场景：\n1. localStorage——5-10MB，永久存储。\n2. sessionStorage——5-10MB，标签页关闭即清除。\n3. IndexedDB——大容量结构化数据，异步 API。\n4. Cookie——4KB，随请求发送。\n5. Cache API——配合 Service Worker，用于 PWA 离线缓存。',
              },
              {
                title: 'Q5: 什么是 DOCTYPE？不写会怎样？',
                content: '<!DOCTYPE html> 声明文档类型为 HTML5，触发标准模式（Standards Mode）。\n\n不写会触发怪异模式（Quirks Mode）：\n- 浏览器按旧规则渲染。\n- 导致盒模型、布局等行为异常。\n\n结论：始终在文档首行写 DOCTYPE。',
              },
              {
                title: 'Q6: meta viewport 的作用？',
                content: '<meta name="viewport" content="width=device-width, initial-scale=1"> 告诉移动端浏览器：\n- 以设备宽度作为视口宽度。\n- 初始缩放为 1。\n\n缺失会导致移动端页面被缩小显示（默认 980px 视口）。这是响应式设计的必备配置。',
              },
              {
                title: 'Q7: 什么是文档流（normal flow）？块级和行内元素在文档流中的区别？',
                content: '文档流是浏览器默认的元素排列规则：元素按 HTML 顺序、按显示特性自动排版。\n\n块级元素（div/p/h1）：\n- 独占一行，从上到下堆叠。\n- 可设宽高。\n\n行内元素（span/a/strong）：\n- 在一行内从左到右排列。\n- 宽高由内容决定，上下 margin/padding 不影响行高。\n\n理解文档流是理解所有 CSS 布局的基础——Flex/Grid 本质都是「脱离或重组」文档流。',
              },
              {
                title: 'Q8: 简述盒模型，标准模式与怪异模式（IE 盒模型）有何不同？',
                content: '盒模型由内到外四层：content → padding → border → margin。\n\n标准模式（W3C）：\n- CSS 的 width 只含 content。\n- 盒子实际占宽 = width + 左右padding + 左右border + 左右margin。\n\n怪异模式（IE 盒模型）：\n- width 包含 content + padding + border。\n- 实际占宽 = width + 左右margin。\n\n现代开发可用 box-sizing: border-box 切换为 IE 盒模型，让 width 即「可见宽」，更直观。',
              },
              {
                title: 'Q9: HTML5 表单原生验证有哪些？为什么不能替代后端验证？',
                content: '原生验证包括：\n1. required——必填。\n2. type 校验——email/number/url 自动校验格式。\n3. min/max/step——数值范围。\n4. minlength/maxlength——长度。\n5. pattern——正则。\n\n可用 novalidate 关闭。\n\n不能替代后端的原因：\n1. 前端验证可被 novalidate 或 JS 绕过。\n2. 请求可绕过浏览器直接构造（如 curl/Postman）。\n3. 存在恶意用户篡改数据。\n\n前端验证只为改善体验，真正的数据校验必须在服务器端进行。',
              },
              {
                title: 'Q10: 无障碍（a11y）的 WCAG 四原则 POUR 是什么？举例说明。',
                content: 'POUR 四原则：\n1. Perceivable 可感知——内容能被感知（图片加 alt、视频加字幕）。\n2. Operable 可操作——可用键盘完成所有操作（不能只靠鼠标，按钮用 <button> 而非 <div onclick>）。\n3. Understandable 可理解——语言清晰、错误有明确提示、行为可预测。\n4. Robust 健壮——能被各种辅助技术解析（标准 HTML + 正确 ARIA）。\n\n核心思想：无障碍不是「给盲人做特殊功能」，而是让所有人（含残障、老年、临时受伤）都能用。',
              },
              {
                title: 'Q11: ARIA 的使用原则？什么时候该用、什么时候不该用？',
                content: 'ARIA 第一法则：能用原生 HTML 实现就不要用 ARIA。\n\n该用：原生 HTML 无对应标签的富交互组件：\n- Tab 切换（role="tab"）。\n- 模态框（role="dialog"）。\n- 实时提示（role="alert"）。\n\n不该用：\n- 用 <button> 而非 <div role="button">——原生 button 自带键盘操作、焦点、读屏器语义。\n- 用 ARIA 重复原生语义（如 <button role="button">）。\n- 只加 role 不补键盘行为。\n\n错误用法会带来更大维护成本与可访问性倒退。',
              },
              {
                title: 'Q12: 响应式图片怎么做？srcset 的 1x/2x 和 w 描述符有何区别？',
                content: '三种方案：\n1. srcset + 密度描述符（1x/2x/3x）：按屏幕 devicePixelRatio 选图，Retina 屏下高清。\n2. srcset + 宽度描述符（400w/800w）+ sizes：按视口宽 + 显示尺寸选最合适的图宽，省流量。\n3. <picture> + <source>：用 media 做艺术指导（手机/桌面不同构图）、用 type 做格式回退（webp→jpg）。\n\n区别：\n- 1x/2x 只关心屏幕密度。\n- w + sizes 关心实际显示尺寸。\n- <picture> 还能按条件换完全不同的图。\n\n三者可组合使用。',
              },
              {
                title: 'Q13: 行内元素、块级元素、行内块元素的区别？举例说明哪些是空元素。',
                content: '三类元素显示特性不同：\n\n块级（div/p/h1/ul/table）：独占一行、可设宽高、默认宽 100%。\n行内（span/a/strong/em）：不换行、宽高由内容定、上下 margin/padding 不占布局。\n行内块（button/input/img）：不换行、可设宽高。\n\n空元素（void element）无内容无结束标签：<br>、<hr>、<img>、<input>、<meta>、<link>、<source>、<track>。\n\n注意 <img> 是行内块（替换元素），行为接近行内块。',
              },
              {
                title: 'Q14: 场景题——页面加载缓慢且交互卡顿，你会从 HTML 层面排查哪些问题？',
                content: '从 HTML 层面排查：\n1. script 位置：head 里的普通 <script> 阻塞渲染，应改 defer（业务脚本）或 async（独立脚本），或移到 body 末尾。\n2. 资源体积：大图未压缩、未用响应式图片（srcset/<picture>），手机加载了桌面大图。\n3. 未懒加载：<img> 加 loading="lazy"、<iframe> 同理。\n4. CSS 阻塞：<link rel="stylesheet"> 阻塞渲染，关键 CSS 内联、非关键 CSS 异步加载。\n5. 资源未压缩、未开 CDN。\n6. preload/prefetch 预加载关键资源。\n\n先看 Network 面板定位最慢的资源。',
              },
              {
                title: 'Q15: 场景题——重构一个全用 <div> 写的导航栏，你会怎么改？为什么？',
                content: '把 <div class="nav"> 改为 <nav>，里面的链接用 <ul><li><a> 结构。\n\n理由：\n1. <nav> 让读屏器识别「导航区域」，用户可一键跳过导航直达正文。\n2. <ul> 表达「列表」语义，读屏器会播报「列表，N 项」。\n3. <a> 是原生链接，Tab 可聚焦、回车可跳转，而 <div onclick> 键盘不可达。\n\n改完后还需：\n- 加 aria-label="主导航"（多个 nav 时区分）。\n- 确保当前页链接加 aria-current="page"。',
              },
              {
                title: 'Q16: 对比题——<b>/<strong>、<i>/<em>、<br>/<p> 各有什么区别？',
                content: '<b> vs <strong>：\n- <b> 只是视觉加粗（无语义）。\n- <strong> 表示「重要」（语义化，读屏器会强调朗读），SEO 权重更高。\n\n同理 <i> 只是斜体，<em> 表示「强调」。\n\n<br> vs <p>：\n- <br> 是文本内换行（用于诗歌、地址等）。\n- <p> 是段落（块级，语义上是独立段落）。\n\n初学者误区：用 <br><br> 制造段落间距——应改用 <p> + CSS margin。\n\n原则：能表达语义就别只用样式标签。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 25：知识点速查表
    // ========================================================================
    {
      order: 25,
      title: '知识点速查表',
      difficulty: 1,
      blocks: [
        {
          id: 'p23cs-1',
          type: 'paragraph',
          text: 'HTML 基础核心知识点速查表，快速回顾关键概念与用法。',
        },
        {
          id: 'p23cs-2',
          type: 'table',
          caption: 'HTML 基础速查表',
          headers: ['知识点', '关键要点', '常用标签/属性'],
          rows: [
            ['文档结构', 'DOCTYPE + html + head + body', '<!DOCTYPE> <html> <head> <body>'],
            ['元信息', '编码、视口、标题', '<meta charset> <meta viewport> <title>'],
            ['语义化结构', '用语义标签替代 div', '<header> <nav> <main> <article> <section> <aside> <footer>'],
            ['文本语义', '强调、引用、术语', '<em> <strong> <blockquote> <q> <abbr> <code>'],
            ['表单', '用户输入与验证', '<form> <input> <select> <textarea> <button>'],
            ['input 类型', '20+ 种原生类型', 'text email password number date color range file'],
            ['表格', '二维数据展示', '<table> <thead> <tbody> <tr> <th> <td>'],
            ['描述列表', '术语-描述成对', '<dl> <dt> <dd>'],
            ['多媒体', '原生音视频播放', '<video> <audio> <source> <track>'],
            ['图形', 'Canvas 位图 vs SVG 矢量', '<canvas> <svg>'],
            ['无障碍', 'WCAG POUR 四原则', 'alt aria-* role tabindex <label>'],
            ['HTML5 API', '存储/通信/设备/图形', 'localStorage WebSocket Geolocation Worker'],
            ['路径', '绝对/相对/锚点', '<a href> <img src>'],
            ['空元素', '无闭合标签', '<br> <hr> <img> <input> <meta> <link>'],
            ['全局属性', '所有元素可用', 'id class style data-* aria-* hidden'],
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 26：小测验：HTML 基础（QuizCard）
    // ========================================================================
    {
      order: 26,
      title: '小测验：HTML 基础',
      difficulty: 1,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          text: '通过以下测验检验你对 HTML 基础的掌握程度。每题答错后会显示解析，帮助你查漏补缺。',
        },
        {
          id: 'p20-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'HTML 中的 <br> 标签属于哪种类型？',
                options: ['块级元素', '行内元素', '空元素（自闭合）', '表单元素'],
                correctIndex: 2,
                explanation: '<br> 是空元素（void element），没有内容也不需要结束标签。类似的还有 <hr>、<img>、<input>、<meta>、<link>。',
              },
              {
                question: '下列哪个标签用于定义文档的主标题？',
                options: ['<head>', '<header>', '<h1>', '<title>'],
                correctIndex: 2,
                explanation: '<h1> 是页面主标题，每个页面建议只有一个 <h1>。<title> 是浏览器标签显示的标题（在 head 内），<header> 是语义化的页眉区块，<head> 是文档头部。',
              },
              {
                question: '关于语义化标签，下列说法错误的是？',
                options: [
                  '语义化标签能改善 SEO',
                  '语义化标签能提升无障碍体验',
                  '应该完全用 div 替代语义化标签',
                  'nav 标签用于导航链接区域',
                ],
                correctIndex: 2,
                explanation: '语义化标签的价值正是 div 无法提供的：SEO、无障碍、可读性。应优先使用语义化标签，仅在无合适语义标签时才用 div。',
              },
              {
                question: 'ARIA 的第一法则是什么？',
                options: [
                  '所有元素都必须加 ARIA 属性',
                  '能用原生 HTML 实现就不要用 ARIA',
                  'ARIA 可以替代所有 HTML 语义',
                  'ARIA 只能用于表单元素',
                ],
                correctIndex: 1,
                explanation: 'ARIA 第一法则：如果能用原生 HTML 元素或属性实现所需语义，就不要用 ARIA。ARIA 是补充而非替代。例如用 <button> 而非 <div role="button">。',
              },
              {
                question: '下列哪个 input 类型在移动端会唤起数字键盘？',
                options: ['type="text"', 'type="tel"', 'type="password"', 'type="email"'],
                correctIndex: 1,
                explanation: 'type="tel" 在移动端唤起数字键盘（带 # 和 *），适合电话号码输入。type="number" 也会唤起数字键盘但带小数点。type="email" 唤起带 @ 符号的键盘。',
              },
              {
                question: '关于 HTML5 的 video 元素，下列说法正确的是？',
                options: [
                  'autoplay 属性可以无条件自动播放带声音的视频',
                  'poster 属性用于设置视频封面图',
                  '一个 video 元素只能有一个 source',
                  'video 元素不支持字幕',
                ],
                correctIndex: 1,
                explanation: 'poster 属性指定视频加载前显示的封面图。现代浏览器禁止带声音自动播放（需 muted）。video 可包含多个 source 兼容不同格式，并通过 <track> 添加字幕。',
              },
              {
                question: '【理解】关于文档流（normal flow），下列描述正确的是？',
                options: [
                  '块级元素默认从左到右排列',
                  '行内元素的上下 margin 会把相邻行推开',
                  '块级元素默认独占一行、从上到下堆叠',
                  '文档流只影响行内元素，不影响块级元素',
                ],
                correctIndex: 2,
                explanation: '文档流中块级元素独占一行、从上到下堆叠，可设宽高；行内元素从左到右排列，上下 margin/padding 不影响行高（不推开相邻行）。这也是为什么给 <span> 设 margin-top「看起来无效」。',
              },
              {
                question: '【理解】标准盒模型下，元素 width:100px、padding:10px、border:2px，实际占据的宽度是？',
                options: ['100px', '112px', '124px', '110px'],
                correctIndex: 2,
                explanation: '标准模式 width 只含 content。实际占宽 = width(100) + 左右padding(10×2=20) + 左右border(2×2=4) = 124px。若用 box-sizing:border-box 则 width 含 padding+border，实际占宽 = 100 + 左右margin。',
              },
              {
                question: '【应用】移动端页面文字显示过小、被缩小，最可能缺少的 head 声明是？',
                options: [
                  '<meta charset="UTF-8">',
                  '<meta name="viewport" content="width=device-width, initial-scale=1">',
                  '<!DOCTYPE html>',
                  '<title>',
                ],
                correctIndex: 1,
                explanation: '缺少 meta viewport 时，移动浏览器默认视口 980px，会把页面缩小塞进屏幕导致字小。加上 width=device-width 让视口等于设备宽度，响应式才能正常工作。',
              },
              {
                question: '【应用】下列哪种写法在键盘无障碍上是正确的？',
                options: [
                  '<div class="btn" onclick="save()">保存</div>',
                  '<span class="btn" onclick="save()">保存</span>',
                  '<button type="button" onclick="save()">保存</button>',
                  '<a href="javascript:save()">保存</a>',
                ],
                correctIndex: 2,
                explanation: '<button> 原生支持 Tab 聚焦、回车/空格触发、读屏器朗读「按钮」。<div onclick>/<span onclick> 键盘不可达；<a href="javascript:"> 语义错误且键盘行为异常。无障碍第一原则：用原生交互元素。',
              },
              {
                question: '【对比】需要让 Retina 屏显示高清图，应使用 srcset 的哪种描述符？',
                options: [
                  'srcset="img.jpg 400w"',
                  'srcset="img.jpg 1x, img@2x.jpg 2x"',
                  'srcset="img.jpg 100%"',
                  'sizes="2x"',
                ],
                correctIndex: 1,
                explanation: '1x/2x/3x 是像素密度描述符，按 devicePixelRatio 选图，Retina 屏（2x）会选 img@2x.jpg。w 描述符（400w）是按图片实际宽度选，需配合 sizes 表示显示尺寸。',
              },
              {
                question: '【对比】<strong> 和 <b> 的核心区别是？',
                options: [
                  '<strong> 加粗，<b> 不加粗',
                  '<strong> 表示语义上的「重要」，<b> 只是视觉加粗无语义',
                  '<strong> 是块级，<b> 是行内',
                  '两者完全相同',
                ],
                correctIndex: 1,
                explanation: '<strong> 语义是「重要」，读屏器会强调朗读，SEO 权重更高；<b> 只是视觉加粗，无语义。同理 <em>（强调）vs <i>（斜体）。原则：表达语义用语义标签，纯样式交给 CSS。',
              },
              {
                question: '【场景】用户提交表单后，后端报「邮箱格式错误」，但前端已用 type="email"。最可能的原因是？',
                options: [
                  'type="email" 没生效',
                  '前端验证可被绕过，后端必须独立校验',
                  '浏览器不支持 type="email"',
                  '表单没有 name 属性',
                ],
                correctIndex: 1,
                explanation: '前端验证（含 type="email"）可被 novalidate 或直接构造请求绕过。前端验证只为体验，真正的数据校验必须在后端进行。这是安全基本原则。',
              },
              {
                question: '【场景】想让视频在移动端自动播放且不报错，正确的做法是？',
                options: [
                  '只加 autoplay 属性',
                  '加 autoplay 和 muted 属性',
                  '加 autoplay 和 loop 属性',
                  '加 autoplay 和 controls 属性',
                ],
                correctIndex: 1,
                explanation: '现代浏览器禁止带声音自动播放（避免噪音骚扰），必须同时 muted 才能 autoplay。这是用户体验策略，设计时不应依赖自动播放作为核心交互。',
              },
              {
                question: '【综合】关于 <picture> + <source>，下列说法错误的是？',
                options: [
                  '可用 media 属性做艺术指导（不同屏幕不同图）',
                  '可用 type 属性做格式回退（webp→jpg）',
                  '<picture> 内必须包含一个 <img> 作为兜底',
                  '<picture> 可以完全替代 <img>，无需 alt',
                ],
                correctIndex: 3,
                explanation: '<picture> 内必须有一个 <img> 作为兜底（所有 <source> 都不匹配时显示），且 <img> 必须写 alt 用于无障碍。<picture> 本身不替代 <img> 的语义和无障碍义务。',
              },
            ],
          },
        },
      ],
    },
  ],
}
