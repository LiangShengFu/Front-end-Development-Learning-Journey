/**
 * 模块注册表 - 所有 25 个模块的元数据索引
 *
 * 注意：此文件仅包含模块的元数据（标题、slug、阶段、数量统计等），
 * 不包含各模块的详细知识点内容。详细内容由各模块文件按需懒加载。
 */
import type { ModuleMeta } from './types'

/** 模块元数据列表（不含 points 详细内容，由各模块文件提供） */
export interface ModuleSummary {
  number: string
  title: string
  slug: string
  stage: ModuleMeta['stage']
  stageLabel: string
  icon: string
  summary: string
  knowledgePointCount: number
  visualizationCount: number
}

export const moduleSummaries: ModuleSummary[] = [
  // 第一阶段：基础
  {
    number: '01',
    title: 'HTML 基础',
    slug: 'html-fundamentals',
    stage: 'basics',
    stageLabel: '基础阶段 · 第 1 模块',
    icon: '01',
    summary: 'HTML 文档结构、语义化标签、表单、无障碍与 HTML5 API。',
    knowledgePointCount: 24,
    visualizationCount: 27,
  },
  {
    number: '02',
    title: 'CSS 基础与核心原理',
    slug: 'css-fundamentals',
    stage: 'basics',
    stageLabel: '基础阶段 · 第 2 模块',
    icon: '02',
    summary: '选择器、盒模型、Flex/Grid、定位、层叠上下文、响应式与动画。',
    knowledgePointCount: 20,
    visualizationCount: 27,
  },
  {
    number: '03',
    title: 'JavaScript 核心语法',
    slug: 'javascript-core',
    stage: 'basics',
    stageLabel: '基础阶段 · 第 3 模块',
    icon: '03',
    summary: '数据类型、作用域、闭包、原型链、this、事件循环、Promise、ES6+。',
    knowledgePointCount: 19,
    visualizationCount: 25,
  },
  {
    number: '04',
    title: 'DOM / BOM 与 Web API',
    slug: 'dom-bom-webapi',
    stage: 'basics',
    stageLabel: '基础阶段 · 第 4 模块',
    icon: '04',
    summary: 'DOM 操作、事件体系、BOM、存储 API、History API、各种 Web API。',
    knowledgePointCount: 19,
    visualizationCount: 19,
  },
  {
    number: '05',
    title: '前端调试与排错基础',
    slug: 'debugging-tools',
    stage: 'basics',
    stageLabel: '基础阶段 · 第 5 模块',
    icon: '05',
    summary: 'Chrome DevTools 各面板、断点调试、性能与内存分析、调试方法论。',
    knowledgePointCount: 16,
    visualizationCount: 7,
  },
  // 第二阶段：通用前置
  {
    number: '06',
    title: 'CSS 工程化与样式方案',
    slug: 'css-engineering',
    stage: 'prerequisites',
    stageLabel: '通用前置 · 第 1 模块',
    icon: '06',
    summary: 'Sass/Less、Tailwind、CSS Modules、CSS-in-JS、PostCSS、CSS 架构。',
    knowledgePointCount: 17,
    visualizationCount: 10,
  },
  {
    number: '07',
    title: 'TypeScript 核心与进阶',
    slug: 'typescript-core',
    stage: 'prerequisites',
    stageLabel: '通用前置 · 第 2 模块',
    icon: '07',
    summary: '类型系统、泛型、工具类型、条件类型、映射类型、类型守卫、tsconfig。',
    knowledgePointCount: 17,
    visualizationCount: 16,
  },
  // 第三阶段：React
  {
    number: '08',
    title: 'React 基础与核心能力',
    slug: 'react-fundamentals',
    stage: 'react',
    stageLabel: 'React 技术栈 · 第 1 模块',
    icon: '08',
    summary: 'JSX、组件、Props/State、Hooks、虚拟 DOM、表单、Router、Redux。',
    knowledgePointCount: 24,
    visualizationCount: 23,
  },
  {
    number: '09',
    title: 'React 进阶与生态体系',
    slug: 'react-advanced',
    stage: 'react',
    stageLabel: 'React 技术栈 · 第 2 模块',
    icon: '09',
    summary: '并发模式、Fiber、Suspense、状态管理库、性能优化、生态全景。',
    knowledgePointCount: 21,
    visualizationCount: 15,
  },
  {
    number: '10',
    title: 'Next.js 与 SSR/SSG 全栈',
    slug: 'nextjs-ssr',
    stage: 'react',
    stageLabel: 'React 技术栈 · 第 3 模块',
    icon: '10',
    summary: 'SSR/SSG/ISR、App Router、Server Components、Server Actions、中间件。',
    knowledgePointCount: 19,
    visualizationCount: 18,
  },
  // 第四阶段：Vue
  {
    number: '11',
    title: 'Vue.js 核心基础',
    slug: 'vue-fundamentals',
    stage: 'vue',
    stageLabel: 'Vue 技术栈 · 第 1 模块',
    icon: '11',
    summary: 'Composition API、响应式原理、组件通信、Vue Router、Pinia、编译优化。',
    knowledgePointCount: 20,
    visualizationCount: 23,
  },
  {
    number: '12',
    title: 'Vue 进阶与 Nuxt 全栈',
    slug: 'vue-advanced-nuxt',
    stage: 'vue',
    stageLabel: 'Vue 技术栈 · 第 2 模块',
    icon: '12',
    summary: '响应式原理、Composable 组合、自定义指令、Nuxt 3 混合渲染、Pinia、KeepAlive、编译优化。',
    knowledgePointCount: 17,
    visualizationCount: 17,
  },
  // 第五阶段：跨端移动端
  {
    number: '13',
    title: '小程序开发与工程化',
    slug: 'mini-program',
    stage: 'cross-platform',
    stageLabel: '跨端移动端 · 第 1 模块',
    icon: '13',
    summary: '双线程模型、Page/Component、Taro/uni-app 跨端、分包加载、setData 性能优化。',
    knowledgePointCount: 12,
    visualizationCount: 12,
  },
  {
    number: '14',
    title: '跨平台开发与移动端适配',
    slug: 'cross-platform-mobile',
    stage: 'cross-platform',
    stageLabel: '跨端移动端 · 第 2 模块',
    icon: '14',
    summary: 'React Native、Flutter、Hybrid、PWA、rem/vw 适配、移动端性能。',
    knowledgePointCount: 14,
    visualizationCount: 14,
  },
  // 第六阶段：工程化全栈
  {
    number: '15',
    title: '前端工程化体系',
    slug: 'engineering',
    stage: 'engineering',
    stageLabel: '工程化与协作 · 第 1 模块',
    icon: '15',
    summary: 'Webpack/Vite 构建工具、pnpm 包管理、ESLint/Prettier 规范、Git 约定式提交、Monorepo + Turborepo、CI/CD。',
    knowledgePointCount: 15,
    visualizationCount: 15,
  },
  {
    number: '16',
    title: '浏览器原理与网络协议',
    slug: 'browser-network',
    stage: 'engineering',
    stageLabel: '工程化全栈 · 第 2 模块',
    icon: '16',
    summary: '浏览器架构、渲染流程、HTTP/2/3、缓存、TCP/IP、DNS、CORS。',
    knowledgePointCount: 15,
    visualizationCount: 15,
  },
  {
    number: '17',
    title: 'Node.js 全栈基础',
    slug: 'nodejs-fullstack',
    stage: 'engineering',
    stageLabel: '工程化全栈 · 第 3 模块',
    icon: '17',
    summary: '模块系统、Buffer/Stream、事件循环、Express/Koa、ORM、Nest.js。',
    knowledgePointCount: 12,
    visualizationCount: 12,
  },
  {
    number: '18',
    title: '前端测试体系',
    slug: 'testing-system',
    stage: 'engineering',
    stageLabel: '工程化全栈 · 第 4 模块',
    icon: '18',
    summary: '测试金字塔、Jest/Vitest、RTL、Cypress/Playwright、TDD/BDD、覆盖率。',
    knowledgePointCount: 12,
    visualizationCount: 12,
  },
  // 第七阶段：高级专项
  {
    number: '19',
    title: '性能优化与安全防护',
    slug: 'performance-security',
    stage: 'advanced',
    stageLabel: '高级专项 · 第 1 模块',
    icon: '19',
    summary: 'Core Web Vitals、Resource Hints、防抖节流、虚拟列表、Service Worker/PWA、XSS/CSRF 攻击与防御、CSP、安全响应头、Cookie 安全。',
    knowledgePointCount: 12,
    visualizationCount: 12,
  },
  {
    number: '20',
    title: '数据可视化与前端架构设计模式',
    slug: 'visualization-architecture',
    stage: 'advanced',
    stageLabel: '高级专项 · 第 2 模块',
    icon: '20',
    summary:
      'Canvas/SVG/D3/ECharts/Three.js 数据可视化方案选型，Container/HOC/Render Props/Hooks/Compound 组件设计模式，Redux/Zustand/Signals 状态管理，BEM/SMACSS/CSS Modules/Tailwind CSS 架构，Feature-Sliced Design/Monorepo 分层，SOLID 设计原则。',
    knowledgePointCount: 14,
    visualizationCount: 18,
  },
  {
    number: '21',
    title: 'Web 高级 API 与 GraphQL',
    slug: 'web-advanced-api',
    stage: 'advanced',
    stageLabel: '高级专项 · 第 3 模块',
    icon: '21',
    summary:
      'Web Components 生命周期与 Shadow DOM、Web Workers 三种数据传输、Intersection/Resize/Mutation Observer、WebAssembly 性能与互操作、GraphQL Schema 与查询构建、Apollo/tRPC/TanStack Query API 层选型。',
    knowledgePointCount: 15,
    visualizationCount: 15,
  },
  {
    number: '22',
    title: '微前端与前端架构设计',
    slug: 'microfrontend-architecture',
    stage: 'advanced',
    stageLabel: '高级专项 · 第 4 模块',
    icon: '22',
    summary:
      '微前端核心思想与康威定律、Module Federation 运行时模块共享、qiankun Proxy 沙箱与生命周期、Web Components/micro-app 方案、JS/CSS 隔离与通信机制、路由同步与公共依赖治理、四方案选型决策。',
    knowledgePointCount: 7,
    visualizationCount: 9,
  },
  {
    number: '23',
    title: '监控埋点与认证授权',
    slug: 'monitoring-auth',
    stage: 'advanced',
    stageLabel: '高级专项 · 第 5 模块',
    icon: '23',
    summary: '埋点体系、Sentry、Web Vitals 采集、JWT、OAuth 2.0、RBAC/ABAC、SSO。',
    knowledgePointCount: 13,
    visualizationCount: 7,
  },
  // 第八阶段：面试冲刺
  {
    number: '24',
    title: '数据结构与前端算法',
    slug: 'data-structure-algorithm',
    stage: 'interview',
    stageLabel: '面试冲刺 · 第 1 模块',
    icon: '24',
    summary: '分层递进体系：基础前置→核心数据结构→算法思想→前端专项→面试实战，覆盖栈队列链表树图堆Trie并查集、排序查找双指针滑窗回溯分治贪心DP位运算、手写题浏览器框架业务字符串、刷题路线与面试题精选。',
    knowledgePointCount: 30,
    visualizationCount: 16,
  },
  {
    number: '25',
    title: '面试八股与综合能力',
    slug: 'interview-prep',
    stage: 'interview',
    stageLabel: '面试冲刺 · 第 2 模块',
    icon: '25',
    summary: 'JS/CSS/框架/网络/浏览器/安全八股、STAR 法则、系统设计、简历面试技巧。',
    knowledgePointCount: 15,
    visualizationCount: 6,
  },
]

/** 根据 slug 获取模块摘要 */
export function getModuleSummary(slug: string): ModuleSummary | undefined {
  return moduleSummaries.find((m) => m.slug === slug)
}

/** 根据编号获取模块摘要 */
export function getModuleSummaryByNumber(num: string): ModuleSummary | undefined {
  return moduleSummaries.find((m) => m.number === num)
}

/** 获取相邻模块（上一个、下一个） */
export function getAdjacentModules(slug: string): {
  prev: ModuleSummary | undefined
  next: ModuleSummary | undefined
} {
  const idx = moduleSummaries.findIndex((m) => m.slug === slug)
  if (idx === -1) return { prev: undefined, next: undefined }
  return {
    prev: idx > 0 ? moduleSummaries[idx - 1] : undefined,
    next: idx < moduleSummaries.length - 1 ? moduleSummaries[idx + 1] : undefined,
  }
}
