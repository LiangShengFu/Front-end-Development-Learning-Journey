/**
 * i18n 模块数据英文资源
 *
 * 与 i18n-messages-modules-zh.ts 一一对应。
 */
export const enModules: Record<string, string> = {
  // ============ Module titles & summaries ============
  'module.html-fundamentals.title': 'HTML Fundamentals',
  'module.html-fundamentals.summary':
    'HTML document structure, semantic tags, forms, accessibility, and HTML5 APIs.',
  'module.html-fundamentals.stageLabel': 'Basics · Module 1',

  'module.css-fundamentals.title': 'CSS Fundamentals & Core Principles',
  'module.css-fundamentals.summary':
    'Selectors, box model, Flex/Grid, positioning, stacking context, responsive design & animations.',
  'module.css-fundamentals.stageLabel': 'Basics · Module 2',

  'module.javascript-core.title': 'JavaScript Core Syntax',
  'module.javascript-core.summary':
    'Data types, scope, closures, prototype chain, this, event loop, Promise, ES6+.',
  'module.javascript-core.stageLabel': 'Basics · Module 3',

  'module.dom-bom-webapi.title': 'DOM / BOM & Web API',
  'module.dom-bom-webapi.summary':
    'DOM manipulation, event system, BOM, storage APIs, History API, and various Web APIs.',
  'module.dom-bom-webapi.stageLabel': 'Basics · Module 4',

  'module.debugging-tools.title': 'Front-end Debugging & Troubleshooting',
  'module.debugging-tools.summary':
    'Chrome DevTools panels, breakpoint debugging, performance & memory analysis, debugging methodology.',
  'module.debugging-tools.stageLabel': 'Basics · Module 5',

  'module.css-engineering.title': 'CSS Engineering & Styling Solutions',
  'module.css-engineering.summary':
    'Sass/Less, Tailwind, CSS Modules, CSS-in-JS, PostCSS, CSS architecture.',
  'module.css-engineering.stageLabel': 'Prerequisites · Module 1',

  'module.typescript-core.title': 'TypeScript Core & Advanced',
  'module.typescript-core.summary':
    'Type system, generics, utility types, conditional types, mapped types, type guards, tsconfig.',
  'module.typescript-core.stageLabel': 'Prerequisites · Module 2',

  'module.react-fundamentals.title': 'React Fundamentals & Core Capabilities',
  'module.react-fundamentals.summary':
    'JSX, components, Props/State, Hooks, Virtual DOM, forms, Router, Redux.',
  'module.react-fundamentals.stageLabel': 'React Stack · Module 1',

  'module.react-advanced.title': 'React Advanced & Ecosystem',
  'module.react-advanced.summary':
    'Concurrent mode, Fiber, Suspense, state management libraries, performance optimization, ecosystem overview.',
  'module.react-advanced.stageLabel': 'React Stack · Module 2',

  'module.nextjs-ssr.title': 'Next.js & SSR/SSG Full-stack',
  'module.nextjs-ssr.summary':
    'SSR/SSG/ISR, App Router, Server Components, Server Actions, middleware.',
  'module.nextjs-ssr.stageLabel': 'React Stack · Module 3',

  'module.vue-fundamentals.title': 'Vue.js Core Fundamentals',
  'module.vue-fundamentals.summary':
    'Composition API, reactivity principles, component communication, Vue Router, Pinia, compilation optimization.',
  'module.vue-fundamentals.stageLabel': 'Vue Stack · Module 1',

  'module.vue-advanced-nuxt.title': 'Vue Advanced & Nuxt Full-stack',
  'module.vue-advanced-nuxt.summary':
    'Reactivity principles, Composable composition, custom directives, Nuxt 3 hybrid rendering, Pinia, KeepAlive, compilation optimization.',
  'module.vue-advanced-nuxt.stageLabel': 'Vue Stack · Module 2',

  'module.mini-program.title': 'Mini Program Development & Engineering',
  'module.mini-program.summary':
    'Dual-thread model, Page/Component, Taro/uni-app cross-platform, subpackage loading, setData performance optimization.',
  'module.mini-program.stageLabel': 'Cross-platform · Module 1',

  'module.cross-platform-mobile.title': 'Cross-platform Development & Mobile Adaptation',
  'module.cross-platform-mobile.summary':
    'React Native, Flutter, Hybrid, PWA, rem/vw adaptation, mobile performance.',
  'module.cross-platform-mobile.stageLabel': 'Cross-platform · Module 2',

  'module.engineering.title': 'Front-end Engineering System',
  'module.engineering.summary':
    'Webpack/Vite build tools, pnpm package management, ESLint/Prettier conventions, Git conventional commits, Monorepo + Turborepo, CI/CD.',
  'module.engineering.stageLabel': 'Engineering · Module 1',

  'module.browser-network.title': 'Browser Principles & Network Protocols',
  'module.browser-network.summary':
    'Browser architecture, rendering pipeline, HTTP/2/3, caching, TCP/IP, DNS, CORS.',
  'module.browser-network.stageLabel': 'Engineering · Module 2',

  'module.nodejs-fullstack.title': 'Node.js Full-stack Fundamentals',
  'module.nodejs-fullstack.summary':
    'Module system, Buffer/Stream, event loop, Express/Koa, ORM, Nest.js.',
  'module.nodejs-fullstack.stageLabel': 'Engineering · Module 3',

  'module.testing-system.title': 'Front-end Testing System',
  'module.testing-system.summary':
    'Testing pyramid, Jest/Vitest, RTL, Cypress/Playwright, TDD/BDD, coverage.',
  'module.testing-system.stageLabel': 'Engineering · Module 4',

  'module.performance-security.title': 'Performance Optimization & Security',
  'module.performance-security.summary':
    'Core Web Vitals, Resource Hints, debounce/throttle, virtual lists, Service Worker/PWA, XSS/CSRF attacks & defense, CSP, security headers, Cookie security.',
  'module.performance-security.stageLabel': 'Advanced · Module 1',

  'module.visualization-architecture.title': 'Data Visualization & Front-end Architecture Patterns',
  'module.visualization-architecture.summary':
    'Canvas/SVG/D3/ECharts/Three.js visualization solution selection, Container/HOC/Render Props/Hooks/Compound component patterns, Redux/Zustand/Signals state management, BEM/SMACSS/CSS Modules/Tailwind CSS architecture, Feature-Sliced Design/Monorepo layering, SOLID design principles.',
  'module.visualization-architecture.stageLabel': 'Advanced · Module 2',

  'module.web-advanced-api.title': 'Web Advanced API & GraphQL',
  'module.web-advanced-api.summary':
    'Web Components lifecycle & Shadow DOM, Web Workers three data transfer modes, Intersection/Resize/Mutation Observer, WebAssembly performance & interop, GraphQL Schema & query construction, Apollo/tRPC/TanStack Query API layer selection.',
  'module.web-advanced-api.stageLabel': 'Advanced · Module 3',

  'module.microfrontend-architecture.title': 'Micro-frontend & Front-end Architecture Design',
  'module.microfrontend-architecture.summary':
    'Micro-frontend core ideas & Conway\'s Law, Module Federation runtime module sharing, qiankun Proxy sandbox & lifecycle, Web Components/micro-app solutions, JS/CSS isolation & communication mechanisms, route synchronization & shared dependency governance, four-solution selection decisions.',
  'module.microfrontend-architecture.stageLabel': 'Advanced · Module 4',

  'module.monitoring-auth.title': 'Monitoring & Authentication',
  'module.monitoring-auth.summary':
    'Tracking system, Sentry, Web Vitals collection, JWT, OAuth 2.0, RBAC/ABAC, SSO.',
  'module.monitoring-auth.stageLabel': 'Advanced · Module 5',

  'module.data-structure-algorithm.title': 'Data Structures & Front-end Algorithms',
  'module.data-structure-algorithm.summary':
    'Layered progression system: prerequisites → core data structures → algorithm paradigms → front-end specific → interview practice. Covers stacks/queues/linked lists/trees/graphs/heaps/Trie/union-find, sorting/search/two-pointer/sliding-window/backtracking/divide-and-conquer/greedy/DP/bit-manipulation, hand-written problems across browser/framework/business/strings, practice routes & curated interview questions.',
  'module.data-structure-algorithm.stageLabel': 'Interview Prep · Module 1',

  'module.interview-prep.title': 'Interview Q&A & Comprehensive Skills',
  'module.interview-prep.summary':
    'JS/CSS/framework/network/browser/security Q&A, STAR method, system design, soft skills & collaboration, business & product thinking, resume & interview techniques.',
  'module.interview-prep.stageLabel': 'Interview Prep · Module 2',

  // ============ Learning stages ============
  'stage.basics.label': 'Fundamentals',
  'stage.basics.description':
    'HTML, CSS, JavaScript, DOM, debugging tools — the five pillars of front-end development.',

  'stage.prerequisites.label': 'Common Prerequisites',
  'stage.prerequisites.description':
    'CSS engineering & TypeScript — common capabilities before entering the framework world.',

  'stage.react.label': 'React Stack',
  'stage.react.description':
    'React fundamentals, advanced ecosystem, Next.js full-stack — the complete mainstream React stack.',

  'stage.vue.label': 'Vue Stack',
  'stage.vue.description':
    'Vue.js core & Nuxt full-stack — the complete Vue ecosystem learning path.',

  'stage.cross-platform.label': 'Cross-platform & Mobile',
  'stage.cross-platform.description':
    'Mini program development & cross-platform mobile adaptation — engineering for multi-platform coverage.',

  'stage.engineering.label': 'Engineering & Full-stack',
  'stage.engineering.description':
    'Front-end engineering, browser principles, Node.js, testing systems — full-stack engineering capabilities.',

  'stage.advanced.label': 'Advanced Topics & Architecture',
  'stage.advanced.description':
    'Performance & security, visualization, Web API, micro-frontend, monitoring & auth — advanced architecture topics.',

  'stage.interview.label': 'Interview Prep',
  'stage.interview.description':
    'Data structures & algorithms, interview Q&A — systematic interview preparation.',

  // ============ Module detail page ============
  'detail.loading': 'Loading...',
  'detail.notFoundEyebrow': '404',
  'detail.notFoundTitle': 'Module Not Found',
  'detail.notFoundDesc': 'Module "{slug}" does not exist or has not been implemented yet.',
  'detail.backToModules': '← Back to Modules',
  'detail.breadcrumbModules': 'Modules',
  'detail.toc': 'Contents',
  'detail.kpLabel': 'Knowledge Points',
  'detail.vizLabel': 'Visualizations',
  'detail.prevModule': '← Previous Module',
  'detail.nextModule': 'Next Module →',
  'detail.emptyContent':
    'The detailed content for this module is still being refined. Please check other implemented modules first.',
  'detail.viewHtmlModule': 'View HTML Fundamentals module →',

  // ============ Knowledge point view ============
  'kp.difficulty': 'Difficulty',
  'kp.difficultyLevel1': 'Beginner',
  'kp.difficultyLevel2': 'Basic',
  'kp.difficultyLevel3': 'Intermediate',
  'kp.difficultyLevel4': 'Advanced',
  'kp.difficultyLevel5': 'Expert',
  'kp.withVisualization': 'With visualization',
}
