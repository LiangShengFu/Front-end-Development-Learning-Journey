/**
 * 模块 22：微前端与前端架构设计
 *
 * 严格遵循 docx/模块二十二.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 7 个知识点（微前端概念 / Module Federation / qiankun / Web Components / 核心问题 / 方案对比 / 速查与小测验）
 * - 5 个新增微前端专属组件（位于 components/interactive/microfrontend/）：
 *   MFArchitectureGraphVisualizer / MFSandboxIsolationVisualizer /
 *   MFModuleFederationVisualizer / MFQiankunLifecycleVisualizer / MFCssIsolationVisualizer
 * - 复用通用组件池：KnowledgeGraph / CompareTable / Accordion / QuizCard
 *
 * 章节映射：
 * - #1 微前端概念：总览图谱 + 概念奠基
 * - #2 Module Federation：MF 配置演示
 * - #3 qiankun：生命周期可视化
 * - #4 Web Components 方案：CSS 隔离对比
 * - #5 微前端核心问题：沙箱隔离演示 + 核心问题表
 * - #6 方案对比表：架构演进图 + 四方案对比
 * - #7 知识点速查表：速查 Accordion + 小测验
 *
 * 技术栈适配：文档原使用静态 HTML，本项目采用结构化 ContentBlock 数据模型，
 * 由 VisualizationRenderer 统一渲染。所有交互均为教学模拟，Proxy 沙箱为受控简化版。
 */
import type { ModuleMeta } from '../lib/types'

export const microfrontendModule: ModuleMeta = {
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
  points: [
    // ========================================================================
    // 知识点 1：微前端概念与总览
    // ========================================================================
    {
      order: 1,
      title: '微前端概念与总览',
      difficulty: 2,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'mf-p1-1',
          type: 'paragraph',
          lead: true,
          text: '微前端是一种将庞大前端应用拆分为多个独立开发、独立部署、独立运行的小应用，再组合成整体呈现的架构模式。它借鉴后端微服务思想，目标是「技术栈无关、独立开发部署、增量升级」，解决单体应用体积膨胀、构建慢、部署耦合、跨团队冲突等痛点。',
        },
        {
          id: 'mf-p1-2',
          type: 'paragraph',
          text: '下方知识图谱展示模块二十二的核心节点与关联。三大主流方案（Module Federation / qiankun / Web Components）各有侧重，五大核心难题（JS 隔离 / CSS 隔离 / 通信 / 路由同步 / 公共依赖）是架构落地的关键挑战。',
        },
        {
          id: 'mf-p1-3',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'mf', label: '微前端', group: 'core', weight: 3 },
              { id: 'concept', label: '核心思想', group: 'concept', weight: 2 },
              { id: 'conway', label: '康威定律', group: 'concept' },
              { id: 'mf-fed', label: 'Module Federation', group: 'scheme', weight: 2 },
              { id: 'qiankun', label: 'qiankun', group: 'scheme', weight: 2 },
              { id: 'wc', label: 'Web Components', group: 'scheme', weight: 2 },
              { id: 'iframe', label: 'iframe', group: 'scheme' },
              { id: 'isolation', label: 'JS/CSS 隔离', group: 'problem', weight: 2 },
              { id: 'comm', label: '通信机制', group: 'problem' },
              { id: 'router', label: '路由同步', group: 'problem' },
              { id: 'deps', label: '公共依赖', group: 'problem' },
            ],
            edges: [
              { source: 'mf', target: 'concept', label: '基础' },
              { source: 'concept', target: 'conway', label: '组织映射' },
              { source: 'mf', target: 'mf-fed', label: 'Webpack 5' },
              { source: 'mf', target: 'qiankun', label: 'single-spa' },
              { source: 'mf', target: 'wc', label: '原生组件' },
              { source: 'mf', target: 'iframe', label: '完全隔离' },
              { source: 'mf', target: 'isolation', label: '核心难题' },
              { source: 'mf', target: 'comm', label: '核心难题' },
              { source: 'mf', target: 'router', label: '核心难题' },
              { source: 'mf', target: 'deps', label: '核心难题' },
            ],
          },
        },
        {
          id: 'mf-p1-4',
          type: 'callout',
          variant: 'info',
          title: '📌 康威定律',
          text: '设计系统的组织，其产生的设计等同于组织之内、组织之间的沟通结构。微前端本质上是把「组织架构」映射到「应用架构」——当团队按业务垂直拆分时，应用也应随之拆分，避免跨团队代码冲突。',
        },
        {
          id: 'mf-p1-5',
          type: 'callout',
          variant: 'warning',
          title: '💡 不适用场景',
          text: '小型项目、单一团队、技术栈统一的应用，引入微前端反而增加复杂度。微前端是「最后的手段」，不是默认选择。评估标准：是否多团队、是否大型应用、是否需要技术栈无关、是否需要独立部署。',
        },
      ],
    },

    // ========================================================================
    // 知识点 2：Module Federation
    // ========================================================================
    {
      order: 2,
      title: 'Module Federation',
      difficulty: 4,
      visualizationType: 'mf-module-federation',
      blocks: [
        {
          id: 'mf-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Module Federation 是 Webpack 5 原生支持的模块联邦方案，允许在运行时从另一个独立构建的应用中加载模块，并通过 shared 配置共享依赖。它是最贴近现代构建工具的微前端方案，无需额外框架，开箱即用。',
        },
        {
          id: 'mf-p2-2',
          type: 'paragraph',
          text: '下方可视化展示 Module Federation 的三角色配置。点击切换 Host / Remote / Shared，查看对应 Webpack 配置代码与关键字段说明。重点关注 remotes（引用远程）、exposes（暴露自身）、shared（共享依赖）三组配置的协作关系。',
        },
        {
          id: 'mf-p2-3',
          type: 'demo',
          visualizationType: 'mf-module-federation',
          data: {},
        },
        {
          id: 'mf-p2-4',
          type: 'code',
          code: `// webpack.config.js (host)
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true },
      },
    }),
  ],
}`,
          language: 'js',
          filename: 'webpack.host.config.js',
        },
        {
          id: 'mf-p2-5',
          type: 'code',
          code: `// host 中使用 React.lazy 加载远程模块
import { lazy, Suspense } from 'react'

const RemoteApp = lazy(() => import('remoteApp/App'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteApp />
    </Suspense>
  )
}`,
          language: 'jsx',
          filename: 'host-lazy-load.jsx',
        },
        {
          id: 'mf-p2-6',
          type: 'callout',
          variant: 'tip',
          title: '💡 运行时共享',
          text: 'shared 配置让多个应用共享同一份依赖（如 React），singleton: true 确保全局只有一个实例，避免 React 多实例导致的 Hooks 报错。版本不匹配时按 requiredVersion 协商，协商失败时使用已注册版本并告警。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：qiankun
    // ========================================================================
    {
      order: 3,
      title: 'qiankun 微前端框架',
      difficulty: 4,
      visualizationType: 'mf-qiankun-lifecycle',
      blocks: [
        {
          id: 'mf-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'qiankun 是基于 single-spa 的开箱即用微前端框架，提供 Proxy 沙箱隔离、样式隔离、预加载、通信 API 等完整能力。它技术栈无关，支持 React/Vue/jQuery/AngularJS 等任意技术栈接入，是国内最流行的微前端方案之一。',
        },
        {
          id: 'mf-p3-2',
          type: 'paragraph',
          text: '下方可视化展示 qiankun 子应用的四个生命周期阶段。点击「执行生命周期」按钮，观察 bootstrap → mount → unmount → update 的穿透动画。注意 bootstrap 仅执行一次，mount/unmount 每次切换都会执行，必须彻底清理副作用。',
        },
        {
          id: 'mf-p3-3',
          type: 'demo',
          visualizationType: 'mf-qiankun-lifecycle',
          data: {},
        },
        {
          id: 'mf-p3-4',
          type: 'code',
          code: `// 主应用注册子应用
import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'react-app',
    entry: '//localhost:7100',
    container: '#subapp-container',
    activeRule: '/react',
    props: { theme: 'dark', user: 'Alice' },
  },
  {
    name: 'vue-app',
    entry: '//localhost:7101',
    container: '#subapp-container',
    activeRule: '/vue',
  },
])

start({ prefetch: true, sandbox: { experimentalStyleIsolation: true } })`,
          language: 'js',
          filename: 'main-register.js',
        },
        {
          id: 'mf-p3-5',
          type: 'code',
          code: `// 子应用导出生命周期
import ReactDOM from 'react-dom'
import App from './App'

let root = null

// 1. bootstrap：首次加载时执行一次
export async function bootstrap() {
  console.log('[react-app] bootstrap')
}

// 2. mount：每次切换进入时执行
export async function mount(props) {
  console.log('[react-app] mount', props)
  const { container } = props
  root = ReactDOM.createRoot(container)
  root.render(<App {...props} />)
  // 订阅主应用状态
  props.onGlobalStateChange((state) => {
    console.log('收到主应用状态:', state)
  })
}

// 3. unmount：每次切走时执行（必须彻底清理）
export async function unmount(props) {
  console.log('[react-app] unmount')
  if (root) {
    root.unmount()
    root = null
  }
}`,
          language: 'js',
          filename: 'subapp-lifecycle.js',
        },
        {
          id: 'mf-p3-6',
          type: 'callout',
          variant: 'info',
          title: '通信机制',
          text: 'qiankun 提供 initGlobalState API，主子应用通过 onGlobalStateChange / setGlobalState 双向通信。也可通过 mount 的 props 直接传递数据，或使用 CustomEvent 跨应用事件。大型应用建议封装统一的通信层。',
        },
      ],
    },

    // ========================================================================
    // 知识点 4：Web Components / micro-app 方案
    // ========================================================================
    {
      order: 4,
      title: 'Web Components / micro-app 方案',
      difficulty: 3,
      visualizationType: 'mf-css-isolation',
      blocks: [
        {
          id: 'mf-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Web Components 是浏览器原生的组件化标准（Custom Elements + Shadow DOM + HTML Templates），micro-app 是基于 Web Components 的轻量微前端框架。Shadow DOM 提供天然 CSS 隔离，是组件级微前端的理想方案。',
        },
        {
          id: 'mf-p4-2',
          type: 'paragraph',
          text: '下方可视化展示四种 CSS 隔离方案的对比。点击切换 Shadow DOM / CSS Scoped / 命名前缀 / CSS Modules，查看原理、代码示例、优缺点与适用场景。微前端场景通常组合使用：qiankun 用 Shadow DOM/前缀，内部用 Scoped/Modules。',
        },
        {
          id: 'mf-p4-3',
          type: 'demo',
          visualizationType: 'mf-css-isolation',
          data: {},
        },
        {
          id: 'mf-p4-4',
          type: 'code',
          code: `<!-- micro-app 使用示例：基于 Web Components 的自定义元素 -->
<micro-app
  name="user-app"
  url="http://localhost:3000/"
  data="{ theme: 'dark' }"
></micro-app>

<!-- micro-app 自动创建 Shadow Root，样式天然隔离 -->
<!-- 子应用内部样式不会泄漏到主应用 -->`,
          language: 'html',
          filename: 'micro-app-usage.html',
        },
        {
          id: 'mf-p4-5',
          type: 'code',
          code: `// 原生 Web Components 自定义元素
class MicroElement extends HTMLElement {
  constructor() {
    super()
    // 创建 Shadow Root，样式天然隔离
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = \`
      <style>
        /* 只作用于 Shadow 内部，不影响外部 */
        .container {
          padding: 16px;
          background: #f5f5f5;
        }
        .btn {
          background: #1a6cff;
          color: white;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
        }
      </style>
      <div class="container">
        <button class="btn">子应用按钮</button>
      </div>
    \`
  }

  connectedCallback() {
    console.log('子应用已挂载')
  }

  disconnectedCallback() {
    console.log('子应用已卸载')
  }
}

customElements.define('micro-element', MicroElement)`,
          language: 'js',
          filename: 'custom-elements.js',
        },
        {
          id: 'mf-p4-6',
          type: 'callout',
          variant: 'tip',
          title: 'Shadow DOM 限制',
          text: 'Shadow DOM 隔离最强但有成本：第三方 UI 库可能不兼容（如 Portal、Modal 需挂载到 body）、全局事件需冒泡穿透、字体与主题等全局样式需特殊处理。生产环境需评估兼容性成本。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：微前端核心问题
    // ========================================================================
    {
      order: 5,
      title: '微前端核心问题与沙箱隔离',
      difficulty: 5,
      visualizationType: 'mf-sandbox-isolation',
      blocks: [
        {
          id: 'mf-p5-1',
          type: 'paragraph',
          lead: true,
          text: '微前端落地的核心挑战是五大难题：JS 隔离、CSS 隔离、通信机制、路由同步、公共依赖治理。其中 JS 隔离是最关键也最难的问题，qiankun 通过 Proxy 沙箱实现子应用 window 读写隔离。',
        },
        {
          id: 'mf-p5-2',
          type: 'paragraph',
          text: '下方交互演示 Proxy 沙箱隔离原理。选择场景 → 切换沙箱开关 → 点击「运行子应用」查看日志对比。启用沙箱时子应用写入 proxy.target，全局 window 不受影响；关闭沙箱时直接写入 window，污染主应用。',
        },
        {
          id: 'mf-p5-3',
          type: 'demo',
          visualizationType: 'mf-sandbox-isolation',
          data: {},
        },
        {
          id: 'mf-p5-4',
          type: 'table',
          headers: ['问题', '难点', '常见方案'],
          rows: [
            ['JS 隔离', '子应用污染全局 window', 'Proxy 沙箱（qiankun）、iframe 天然隔离'],
            ['CSS 隔离', '样式冲突、全局污染', 'Shadow DOM、CSS Scoped、动态加前缀'],
            ['通信机制', '跨应用数据传递', '全局状态、CustomEvent、postMessage'],
            ['路由同步', '主子路由联动', 'base 路径约定、history 拦截'],
            ['公共依赖', '重复加载、版本冲突', 'shared 共享、externals、CDN 统一'],
          ],
          caption: '微前端核心问题与方案',
        },
        {
          id: 'mf-p5-5',
          type: 'paragraph',
          text: 'JS 沙箱原理（Proxy）：',
        },
        {
          id: 'mf-p5-6',
          type: 'code',
          code: `// 简化版 Proxy 沙箱
class ProxySandbox {
  constructor() {
    const fakeWindow = Object.create(null)
    this.proxy = new Proxy(fakeWindow, {
      get(target, key) {
        // 优先子应用沙箱，兜底全局 window
        return key in target ? target[key] : window[key]
      },
      set(target, key, value) {
        // 写入沙箱，不污染全局
        target[key] = value
        return true
      },
    })
  }
}

// 使用：子应用在沙箱中执行，写入不影响全局
const sandbox = new ProxySandbox()
const code = 'window.__subAppConfig = { api: "/api/v1" }'
// 通过 new Function 在沙箱上下文中执行
const fn = new Function('window', 'self', 'globalThis', code)
fn(sandbox.proxy, sandbox.proxy, sandbox.proxy)
console.log(window.__subAppConfig) // undefined，全局未污染`,
          language: 'js',
          filename: 'proxy-sandbox.js',
        },
        {
          id: 'mf-p5-7',
          type: 'callout',
          variant: 'warning',
          title: '⚠ 沙箱局限性',
          text: 'Proxy 沙箱无法拦截：1) 通过 document.body 直接操作 DOM；2) 通过原生 API（fetch、localStorage）的副作用；3) 通过 setInterval/setTimeout 注册的定时器（需在 unmount 时手动清理）。生产环境需配合副作用清理清单。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：方案对比表与架构演进
    // ========================================================================
    {
      order: 6,
      title: '方案对比表与架构演进',
      difficulty: 3,
      visualizationType: 'mf-architecture-graph',
      blocks: [
        {
          id: 'mf-p6-1',
          type: 'paragraph',
          lead: true,
          text: '微前端四大方案各有侧重：Module Federation 适合同技术栈拆分，qiankun 适合异构系统集成，Web Components 适合组件级微前端，iframe 提供最强隔离。下方架构演进图展示从单体到微前端的演进路径。',
        },
        {
          id: 'mf-p6-2',
          type: 'paragraph',
          text: '点击下方「单体架构 / 微前端架构 / 共享层」切换查看演进过程。单体应用所有模块耦合在一起；微前端架构拆分为 Host + 多个子应用；共享层通过 shared 配置统一管理公共依赖，避免重复加载与版本冲突。',
        },
        {
          id: 'mf-p6-3',
          type: 'demo',
          visualizationType: 'mf-architecture-graph',
          data: {},
        },
        {
          id: 'mf-p6-4',
          type: 'paragraph',
          text: '四方案横向对比表：',
        },
        {
          id: 'mf-p6-5',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '维度',
            columns: ['Module Federation', 'qiankun', 'Web Components/micro-app', 'iframe'],
            rows: [
              {
                feature: '隔离性',
                values: ['弱（共享全局）', '强（Proxy 沙箱）', '中（Shadow DOM）', '最强'],
              },
              {
                feature: '通信成本',
                values: ['低（直接 import）', '中（globalState）', '中（数据属性）', '高（postMessage）'],
              },
              {
                feature: '技术栈要求',
                values: ['Webpack 5 / Vite', '任意', '任意', '任意'],
              },
              {
                feature: '构建耦合',
                values: ['中（需 shared 协商）', '低', '低', '无'],
              },
              {
                feature: '适用场景',
                values: ['同技术栈拆分', '异构系统集成', '组件级微前端', '完全隔离的第三方'],
              },
            ],
          },
        },
        {
          id: 'mf-p6-6',
          type: 'callout',
          variant: 'tip',
          title: '🌟 选型决策',
          text: '选型原则：同栈用 Module Federation（最贴近现代构建）、异构用 qiankun（沙箱隔离完善）、组件级用 Web Components/micro-app（轻量原生）、完全隔离用 iframe（最安全但体验差）。大型项目可组合使用：主应用 MF，子应用 qiankun，组件级 Web Components。',
        },
      ],
    },

    // ========================================================================
    // 知识点 7：知识点速查表与小测验
    // ========================================================================
    {
      order: 7,
      title: '知识点速查表与小测验',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'mf-p7-1',
          type: 'paragraph',
          lead: true,
          text: '微前端核心知识点速查表，覆盖概念、三大方案、核心难题、选型决策四大主题。点击展开查看详情，完成下方小测验检验掌握程度。',
        },
        {
          id: 'mf-p7-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: '康威定律与微前端核心思想',
                content:
                  '康威定律：设计系统的组织，其产生的设计等同于组织之内、组织之间的沟通结构。微前端本质是把「组织架构」映射到「应用架构」。核心思想：独立开发、独立部署、独立运行。适用场景：大型企业后台、旧系统渐进重构、SaaS 多租户。不适用：小型项目、单一团队。',
              },
              {
                title: 'Module Federation 核心配置',
                content:
                  'Webpack 5 原生方案。三组配置：name（应用名）、remotes（引用远程模块）、exposes（暴露自身模块）、shared（共享依赖）。singleton: true 确保单例（React 必须），requiredVersion 协商版本。Host 用 React.lazy 异步加载远程模块。',
              },
              {
                title: 'qiankun 生命周期与沙箱',
                content:
                  '基于 single-spa。四个生命周期：bootstrap（首次，仅一次）、mount（每次进入）、unmount（每次切走，需清理）、update（props 更新）。Proxy 沙箱拦截 window get/set，子应用写入 fakeWindow 不污染全局。通信：initGlobalState / onGlobalStateChange / setGlobalState。',
              },
              {
                title: 'Web Components 与 Shadow DOM',
                content:
                  '浏览器原生标准：Custom Elements + Shadow DOM + HTML Templates。attachShadow({ mode: "open" }) 创建隔离 DOM，样式天然不泄漏。micro-app 基于此实现轻量微前端。局限：第三方库兼容性、全局事件穿透、字体主题处理。',
              },
              {
                title: 'CSS 隔离四方案',
                content:
                  'Shadow DOM（最强，浏览器原生）、CSS Scoped（Vue/Angular 组件级，属性选择器）、命名前缀（BEM/OOCSS，依赖人工约定）、CSS Modules（构建时哈希，React 友好）。组合使用：qiankun 用 Shadow DOM/前缀，内部用 Scoped/Modules。',
              },
              {
                title: '五大核心难题速查',
                content:
                  'JS 隔离：Proxy 沙箱（qiankun）/ iframe 天然隔离。CSS 隔离：Shadow DOM / Scoped / 前缀。通信：globalState / CustomEvent / postMessage。路由同步：base 路径约定 / history 拦截。公共依赖：shared 共享 / externals / CDN 统一。',
              },
              {
                title: '四方案选型决策',
                content:
                  'Module Federation：同技术栈拆分，Webpack 5 原生，shared 共享。qiankun：异构系统集成，Proxy 沙箱，技术栈无关。Web Components/micro-app：组件级微前端，Shadow DOM 隔离。iframe：完全隔离第三方，postMessage 通信。选型原则：同栈 MF、异构 qiankun、组件 WC、隔离 iframe。',
              },
              {
                title: '生产环境注意事项',
                content:
                  '1) 子应用 unmount 必须彻底清理：定时器、事件监听、全局变量、DOM 节点。2) 公共依赖协商：shared singleton 避免多实例。3) 路由同步：base 路径约定 + history 拦截。4) 样式隔离：Shadow DOM 或自动前缀。5) 通信层封装：统一 API，避免直接操作全局。6) 预加载优化：qiankun prefetch、MF eager 加载。',
              },
            ],
          },
        },
        {
          id: 'mf-p7-3',
          type: 'paragraph',
          text: '小测验：检验你对微前端核心概念的掌握程度。',
        },
        {
          id: 'mf-p7-4',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '微前端的核心思想不包括以下哪一项？',
                options: ['独立开发', '独立部署', '独立运行', '统一技术栈'],
                correctIndex: 3,
                explanation:
                  '微前端的核心思想是「技术栈无关、独立开发部署、增量升级」。统一技术栈是单体应用的特征，微前端正是为了解决多技术栈协作而生。',
              },
              {
                question: 'Module Federation 中 shared 配置 singleton: true 的作用是？',
                options: [
                  '确保依赖全局单例，避免多实例冲突',
                  '减少打包体积',
                  '加速构建',
                  '禁用依赖加载',
                ],
                correctIndex: 0,
                explanation:
                  'singleton: true 确保全局只有一个实例，避免 React 多实例导致的 Hooks 报错（Invalid Hook Call Warning）。React/react-dom 必须设置为 singleton。',
              },
              {
                question: 'qiankun 的 Proxy 沙箱如何实现 JS 隔离？',
                options: [
                  '创建 fakeWindow，用 Proxy 拦截 window 读写',
                  '使用 iframe 隔离',
                  '重写所有全局 API',
                  '通过 CSS 隔离',
                ],
                correctIndex: 0,
                explanation:
                  'Proxy 沙箱为子应用创建一个 fakeWindow，用 Proxy 拦截 window 的 get/set。读取时优先沙箱、兜底全局；写入时只落在沙箱，不污染全局 window。',
              },
              {
                question: 'qiankun 生命周期中，哪个阶段必须彻底清理副作用？',
                options: ['bootstrap', 'mount', 'unmount', 'update'],
                correctIndex: 2,
                explanation:
                  'unmount 阶段必须彻底清理：卸载 DOM、清除定时器、移除事件监听、销毁实例、删除全局变量。否则会导致内存泄漏与状态污染，影响下次 mount。',
              },
              {
                question: '以下哪种 CSS 隔离方案的隔离强度最强？',
                options: ['命名前缀（BEM）', 'CSS Scoped', 'CSS Modules', 'Shadow DOM'],
                correctIndex: 3,
                explanation:
                  'Shadow DOM 是浏览器原生隔离，外部样式无法渗透，内部样式无法泄漏，隔离强度最强。但兼容性成本较高，第三方 UI 库可能不兼容。',
              },
              {
                question: '微前端方案选型，异构系统集成（React + Vue + jQuery）应优先选择？',
                options: ['Module Federation', 'qiankun', 'Web Components', '统一迁移为 React'],
                correctIndex: 1,
                explanation:
                  '异构系统集成首选 qiankun：技术栈无关、Proxy 沙箱隔离完善、生命周期管理成熟。Module Federation 依赖 Webpack 5 且需要 shared 协商，适合同技术栈。Web Components 适合组件级而非应用级。',
              },
            ],
          },
        },
      ],
    },
  ],
}
