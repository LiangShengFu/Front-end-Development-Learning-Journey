/**
 * i18n 模块数据中文资源
 *
 * 包含 25 个模块的标题、简介、阶段标签，以及 8 个学习阶段的标签与描述。
 * Key 命名：module.<slug>.title | module.<slug>.summary | module.<slug>.stageLabel
 *          stage.<id>.label | stage.<id>.description
 */
export const zhModules: Record<string, string> = {
  // ============ 模块标题与简介 ============
  'module.html-fundamentals.title': 'HTML 基础',
  'module.html-fundamentals.summary': 'HTML 文档结构、语义化标签、表单、无障碍与 HTML5 API。',
  'module.html-fundamentals.stageLabel': '基础阶段 · 第 1 模块',

  'module.css-fundamentals.title': 'CSS 基础与核心原理',
  'module.css-fundamentals.summary': '选择器、盒模型、Flex/Grid、定位、层叠上下文、响应式与动画。',
  'module.css-fundamentals.stageLabel': '基础阶段 · 第 2 模块',

  'module.javascript-core.title': 'JavaScript 核心语法',
  'module.javascript-core.summary': '数据类型、作用域、闭包、原型链、this、事件循环、Promise、ES6+。',
  'module.javascript-core.stageLabel': '基础阶段 · 第 3 模块',

  'module.dom-bom-webapi.title': 'DOM / BOM 与 Web API',
  'module.dom-bom-webapi.summary': 'DOM 操作、事件体系、BOM、存储 API、History API、各种 Web API。',
  'module.dom-bom-webapi.stageLabel': '基础阶段 · 第 4 模块',

  'module.debugging-tools.title': '前端调试与排错基础',
  'module.debugging-tools.summary': 'Chrome DevTools 各面板、断点调试、性能与内存分析、调试方法论。',
  'module.debugging-tools.stageLabel': '基础阶段 · 第 5 模块',

  'module.css-engineering.title': 'CSS 工程化与样式方案',
  'module.css-engineering.summary': 'Sass/Less、Tailwind、CSS Modules、CSS-in-JS、PostCSS、CSS 架构。',
  'module.css-engineering.stageLabel': '通用前置 · 第 1 模块',

  'module.typescript-core.title': 'TypeScript 核心与进阶',
  'module.typescript-core.summary': '类型系统、泛型、工具类型、条件类型、映射类型、类型守卫、tsconfig。',
  'module.typescript-core.stageLabel': '通用前置 · 第 2 模块',

  'module.react-fundamentals.title': 'React 基础与核心能力',
  'module.react-fundamentals.summary': 'JSX、组件、Props/State、Hooks、虚拟 DOM、表单、Router、Redux。',
  'module.react-fundamentals.stageLabel': 'React 技术栈 · 第 1 模块',

  'module.react-advanced.title': 'React 进阶与生态体系',
  'module.react-advanced.summary': '并发模式、Fiber、Suspense、状态管理库、性能优化、生态全景。',
  'module.react-advanced.stageLabel': 'React 技术栈 · 第 2 模块',

  'module.nextjs-ssr.title': 'Next.js 与 SSR/SSG 全栈',
  'module.nextjs-ssr.summary': 'SSR/SSG/ISR、App Router、Server Components、Server Actions、中间件。',
  'module.nextjs-ssr.stageLabel': 'React 技术栈 · 第 3 模块',

  'module.vue-fundamentals.title': 'Vue.js 核心基础',
  'module.vue-fundamentals.summary': 'Composition API、响应式原理、组件通信、Vue Router、Pinia、编译优化。',
  'module.vue-fundamentals.stageLabel': 'Vue 技术栈 · 第 1 模块',

  'module.vue-advanced-nuxt.title': 'Vue 进阶与 Nuxt 全栈',
  'module.vue-advanced-nuxt.summary':
    '响应式原理、Composable 组合、自定义指令、Nuxt 3 混合渲染、Pinia、KeepAlive、编译优化。',
  'module.vue-advanced-nuxt.stageLabel': 'Vue 技术栈 · 第 2 模块',

  'module.mini-program.title': '小程序开发与工程化',
  'module.mini-program.summary':
    '双线程模型、Page/Component、Taro/uni-app 跨端、分包加载、setData 性能优化。',
  'module.mini-program.stageLabel': '跨端移动端 · 第 1 模块',

  'module.cross-platform-mobile.title': '跨平台开发与移动端适配',
  'module.cross-platform-mobile.summary':
    'React Native、Flutter、Hybrid、PWA、rem/vw 适配、移动端性能。',
  'module.cross-platform-mobile.stageLabel': '跨端移动端 · 第 2 模块',

  'module.engineering.title': '前端工程化体系',
  'module.engineering.summary':
    'Webpack/Vite 构建工具、pnpm 包管理、ESLint/Prettier 规范、Git 约定式提交、Monorepo + Turborepo、CI/CD。',
  'module.engineering.stageLabel': '工程化与协作 · 第 1 模块',

  'module.browser-network.title': '浏览器原理与网络协议',
  'module.browser-network.summary': '浏览器架构、渲染流程、HTTP/2/3、缓存、TCP/IP、DNS、CORS。',
  'module.browser-network.stageLabel': '工程化全栈 · 第 2 模块',

  'module.nodejs-fullstack.title': 'Node.js 全栈基础',
  'module.nodejs-fullstack.summary': '模块系统、Buffer/Stream、事件循环、Express/Koa、ORM、Nest.js。',
  'module.nodejs-fullstack.stageLabel': '工程化全栈 · 第 3 模块',

  'module.testing-system.title': '前端测试体系',
  'module.testing-system.summary':
    '测试金字塔、Jest/Vitest、RTL、Cypress/Playwright、TDD/BDD、覆盖率。',
  'module.testing-system.stageLabel': '工程化全栈 · 第 4 模块',

  'module.performance-security.title': '性能优化与安全防护',
  'module.performance-security.summary':
    'Core Web Vitals、Resource Hints、防抖节流、虚拟列表、Service Worker/PWA、XSS/CSRF 攻击与防御、CSP、安全响应头、Cookie 安全。',
  'module.performance-security.stageLabel': '高级专项 · 第 1 模块',

  'module.visualization-architecture.title': '数据可视化与前端架构设计模式',
  'module.visualization-architecture.summary':
    'Canvas/SVG/D3/ECharts/Three.js 数据可视化方案选型，Container/HOC/Render Props/Hooks/Compound 组件设计模式，Redux/Zustand/Signals 状态管理，BEM/SMACSS/CSS Modules/Tailwind CSS 架构，Feature-Sliced Design/Monorepo 分层，SOLID 设计原则。',
  'module.visualization-architecture.stageLabel': '高级专项 · 第 2 模块',

  'module.web-advanced-api.title': 'Web 高级 API 与 GraphQL',
  'module.web-advanced-api.summary':
    'Web Components 生命周期与 Shadow DOM、Web Workers 三种数据传输、Intersection/Resize/Mutation Observer、WebAssembly 性能与互操作、GraphQL Schema 与查询构建、Apollo/tRPC/TanStack Query API 层选型。',
  'module.web-advanced-api.stageLabel': '高级专项 · 第 3 模块',

  'module.microfrontend-architecture.title': '微前端与前端架构设计',
  'module.microfrontend-architecture.summary':
    '微前端核心思想与康威定律、Module Federation 运行时模块共享、qiankun Proxy 沙箱与生命周期、Web Components/micro-app 方案、JS/CSS 隔离与通信机制、路由同步与公共依赖治理、四方案选型决策。',
  'module.microfrontend-architecture.stageLabel': '高级专项 · 第 4 模块',

  'module.monitoring-auth.title': '监控埋点与认证授权',
  'module.monitoring-auth.summary':
    '埋点体系、Sentry、Web Vitals 采集、JWT、OAuth 2.0、RBAC/ABAC、SSO。',
  'module.monitoring-auth.stageLabel': '高级专项 · 第 5 模块',

  'module.data-structure-algorithm.title': '数据结构与前端算法',
  'module.data-structure-algorithm.summary':
    '分层递进体系：基础前置→核心数据结构→算法思想→前端专项→面试实战，覆盖栈队列链表树图堆Trie并查集、排序查找双指针滑窗回溯分治贪心DP位运算、手写题浏览器框架业务字符串、刷题路线与面试题精选。',
  'module.data-structure-algorithm.stageLabel': '面试冲刺 · 第 1 模块',

  'module.interview-prep.title': '面试八股与综合能力',
  'module.interview-prep.summary':
    'JS/CSS/框架/网络/浏览器/安全八股、STAR 法则、系统设计、软技能协作、业务产品思维、简历面试技巧。',
  'module.interview-prep.stageLabel': '面试冲刺 · 第 2 模块',

  // ============ 学习阶段 ============
  'stage.basics.label': '基础阶段',
  'stage.basics.description': 'HTML、CSS、JavaScript、DOM、调试工具 — 前端开发的五大基石。',

  'stage.prerequisites.label': '通用前置能力',
  'stage.prerequisites.description': 'CSS 工程化与 TypeScript — 进入框架世界前的通用能力储备。',

  'stage.react.label': 'React 技术栈',
  'stage.react.description': 'React 基础、进阶生态、Next.js 全栈 — 主流 React 技术栈完整路径。',

  'stage.vue.label': 'Vue 技术栈',
  'stage.vue.description': 'Vue.js 核心与 Nuxt 全栈 — Vue 生态的完整学习路线。',

  'stage.cross-platform.label': '跨端与移动端',
  'stage.cross-platform.description': '小程序开发与跨平台移动端适配 — 多端覆盖的工程能力。',

  'stage.engineering.label': '工程化与全栈',
  'stage.engineering.description': '前端工程化、浏览器原理、Node.js、测试体系 — 工程化全栈能力。',

  'stage.advanced.label': '高级专项与架构',
  'stage.advanced.description': '性能安全、可视化、Web API、微前端、监控认证 — 高级架构专项。',

  'stage.interview.label': '面试冲刺',
  'stage.interview.description': '数据结构算法与面试八股 — 系统化面试冲刺准备。',

  // ============ 模块详情页 ============
  'detail.loading': '加载中...',
  'detail.notFoundEyebrow': '404',
  'detail.notFoundTitle': '模块未找到',
  'detail.notFoundDesc': '模块 "{slug}" 不存在或尚未实现。',
  'detail.backToModules': '← 返回模块列表',
  'detail.breadcrumbModules': '模块',
  'detail.toc': '目录',
  'detail.kpLabel': '知识点',
  'detail.vizLabel': '可视化',
  'detail.prevModule': '← 上一模块',
  'detail.nextModule': '下一模块 →',
  'detail.emptyContent': '该模块的详细内容正在完善中。请先查看其他已实现的模块。',
  'detail.viewHtmlModule': '查看 HTML 基础模块 →',

  // ============ 知识点视图 ============
  'kp.difficulty': '难度',
  'kp.difficultyLevel1': '入门',
  'kp.difficultyLevel2': '基础',
  'kp.difficultyLevel3': '进阶',
  'kp.difficultyLevel4': '高级',
  'kp.difficultyLevel5': '专家',
  'kp.withVisualization': '含可视化',
}
