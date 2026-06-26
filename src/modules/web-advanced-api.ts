/**
 * 模块 21：Web 高级 API 与 GraphQL
 *
 * 严格遵循 docx/模块二十一.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 15 个知识点（2 大主题：Web 高级 API 8 章 + GraphQL 与 API 层 6 章 + 速查与小测验）
 * - 5 个新增高级 API/API 层专属组件（位于 components/interactive/web-api-graphql/）
 * - 复用通用组件池：KnowledgeGraph / CompareTable / Accordion / QuizCard
 * - 跨模块复用模块十九 DebounceThrottleVisualizer（Intersection Observer 性能对比视角）
 * - 跨模块复用模块十八 ComponentTestPlayground（Web Components 测试视角）
 *
 * 章节映射：
 * - 主题一·Web 高级 API（#1-#8）：总览图谱 / Web Components 生命周期 / Workers 数据传输 / Observer API / WebAssembly 性能 / Intersection Observer 性能 / Web Components 测试 / 速查
 * - 主题二·GraphQL 与 API 层（#9-#15）：Schema 探索 / GraphQL vs REST / API 层对比 / tRPC vs GraphQL / TanStack Query 缓存 / 速查 / 小测验
 *
 * 技术栈适配：文档原使用 Redux+CSS Modules，本项目采用 Tailwind+本地状态，
 * 组件交互均由各可视化组件内部 useState 管理，无需全局状态。
 * 所有交互均为教学模拟，Observer/Worker 行为在浏览器环境真实执行。
 */
import type { ModuleMeta } from '../lib/types'

export const webAdvancedApiModule: ModuleMeta = {
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
  points: [
    // ========================================================================
    // 主题一 · Web 高级 API
    // ========================================================================

    // 知识点 1：Web 高级 API 与 GraphQL 总览知识图谱
    {
      order: 1,
      title: 'Web 高级 API 与 GraphQL 总览',
      difficulty: 1,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'wa-p1-1',
          type: 'paragraph',
          lead: true,
          text: '当框架抽象到极致，回归 Web 平台原生能力成为高级前端的核心竞争力。模块二十一串联两大主题：Web 高级 API（Web Components、Web Workers、Observer API、WebAssembly）让前端突破主线程与 DOM 抽象的限制；GraphQL 与 API 层（GraphQL、Apollo、tRPC、TanStack Query）重塑前后端数据契约。',
        },
        {
          id: 'wa-p1-2',
          type: 'paragraph',
          text: '下方知识图谱展示模块二十一的核心节点与关联。Web 高级 API 侧重「能力扩展」（并发、观察、原生组件、跨语言），GraphQL 与 API 层侧重「数据契约」（按需取数、类型安全、缓存编排）。两者共同构成现代前端的「平台能力 + 数据层」双支柱。',
        },
        {
          id: 'wa-p1-3',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'webapi', label: 'Web 高级 API', group: 'core', weight: 3 },
              { id: 'wc', label: 'Web Components', group: 'platform', weight: 2 },
              { id: 'workers', label: 'Web Workers', group: 'platform', weight: 2 },
              { id: 'observer', label: 'Observer API', group: 'platform', weight: 2 },
              { id: 'wasm', label: 'WebAssembly', group: 'platform', weight: 2 },
              { id: 'graphql', label: 'GraphQL API 层', group: 'core', weight: 3 },
              { id: 'gql', label: 'GraphQL', group: 'data', weight: 2 },
              { id: 'apollo', label: 'Apollo Client', group: 'data' },
              { id: 'trpc', label: 'tRPC', group: 'data' },
              { id: 'tanstack', label: 'TanStack Query', group: 'data' },
            ],
            edges: [
              { source: 'webapi', target: 'wc', label: '原生组件' },
              { source: 'webapi', target: 'workers', label: '多线程' },
              { source: 'webapi', target: 'observer', label: '观察机制' },
              { source: 'webapi', target: 'wasm', label: '跨语言' },
              { source: 'graphql', target: 'gql', label: '查询语言' },
              { source: 'graphql', target: 'apollo', label: '客户端' },
              { source: 'graphql', target: 'trpc', label: '类型安全' },
              { source: 'graphql', target: 'tanstack', label: '缓存编排' },
              { source: 'observer', target: 'tanstack', label: '数据驱动' },
            ],
          },
        },
      ],
    },

    // 知识点 2：Web Components 生命周期
    {
      order: 2,
      title: 'Web Components 生命周期',
      difficulty: 3,
      isNew: true,
      visualizationType: 'web-components-lifecycle',
      blocks: [
        {
          id: 'wa-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Web Components 由 Custom Elements、Shadow DOM、HTML Templates 三套规范组成。Custom Elements 通过继承 HTMLElement 定义原生组件，并提供 5 个生命周期回调，让组件具备「创建 → 连接 → 断开 → 属性变化 → 迁移」全流程的可控性。',
        },
        {
          id: 'wa-p2-2',
          type: 'paragraph',
          text: '下方可视化展示 5 个生命周期回调。点击按钮「触发」对应回调，观察自定义元素的状态切换与触发日志。注意 constructor 中只能初始化状态与附加 Shadow DOM，不能读取属性或访问子节点；connectedCallback 才是启动副作用的正确时机。',
        },
        {
          id: 'wa-p2-3',
          type: 'demo',
          visualizationType: 'web-components-lifecycle',
          data: {},
        },
        {
          id: 'wa-p2-4',
          type: 'callout',
          variant: 'info',
          title: 'Shadow DOM 与样式隔离',
          text: 'attachShadow({ mode: "open" | "closed" }) 创建封装的 DOM 子树，外部样式与选择器无法穿透，实现真正的样式隔离。open 模式允许外部通过 element.shadowRoot 访问，closed 则返回 null，适合版权保护场景。',
        },
      ],
    },

    // 知识点 3：Web Workers 数据传输
    {
      order: 3,
      title: 'Web Workers 数据传输',
      difficulty: 3,
      isNew: true,
      visualizationType: 'worker-data-transfer',
      blocks: [
        {
          id: 'wa-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'Web Workers 让 JavaScript 拥有多线程能力，但主线程与 Worker 之间只能通过 postMessage 通信。数据传输有三种方式：结构化克隆（默认深拷贝）、Transferable（所有权转移，零拷贝）、SharedArrayBuffer（共享内存，需 Atomics 同步）。',
        },
        {
          id: 'wa-p3-2',
          type: 'paragraph',
          text: '下方可视化对比三种传输方式。切换方式观察主线程→Worker 的数据流向与所有权变化。大数据（图像/音频 Buffer）应优先 Transferable 零拷贝；多线程共享计算需 SharedArrayBuffer（注意需配置 COOP/COEP 跨域隔离头）。',
        },
        {
          id: 'wa-p3-3',
          type: 'demo',
          visualizationType: 'worker-data-transfer',
          data: {},
        },
      ],
    },

    // 知识点 4：Observer API 三剑客
    {
      order: 4,
      title: 'Observer API 三剑客',
      difficulty: 3,
      isNew: true,
      visualizationType: 'observer-api-showcase',
      blocks: [
        {
          id: 'wa-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Observer API 是 Web 平台的「被动观察」机制，相比轮询或事件监听更高效。IntersectionObserver 观察元素与视口的交集（懒加载/滚动动画），ResizeObserver 观察元素尺寸变化（响应式容器），MutationObserver 观察 DOM 子树结构与属性变化（编辑器/第三方同步）。',
        },
        {
          id: 'wa-p4-2',
          type: 'paragraph',
          text: '下方为真实可操作的演示区。切换 Observer 类型，操作左侧演示区（滚动容器/缩放盒子/增删节点），回调日志由真实 Observer 实例产生。这是模块中少数在浏览器环境真实执行的高级 API 演示。',
        },
        {
          id: 'wa-p4-3',
          type: 'demo',
          visualizationType: 'observer-api-showcase',
          data: {},
        },
      ],
    },

    // 知识点 5：WebAssembly 性能对比
    {
      order: 5,
      title: 'WebAssembly 性能与互操作',
      difficulty: 4,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'wa-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'WebAssembly（Wasm）是一种低级二进制指令格式，可在浏览器中近原生速度执行 C/C++/Rust 编译产物。它不是 JavaScript 的替代，而是补充——适合计算密集型任务（图像/视频处理、游戏引擎、加密计算），并通过 JS 互操作调用。',
        },
        {
          id: 'wa-p5-2',
          type: 'paragraph',
          text: '下方对比表展示 Wasm 与 JavaScript 在执行模型、性能、适用场景等维度的差异。Wasm 的加载/编译有一次性成本，适合长驻计算；JS 适合 UI 交互与快速迭代。两者通过 WebAssembly.instantiate 互操作。',
        },
        {
          id: 'wa-p5-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '维度',
            columns: ['JavaScript', 'WebAssembly'],
            highlightColumn: 1,
            rows: [
              { feature: '执行模型', values: ['JIT 即时编译', 'AOT 预编译为二进制'] },
              { feature: '运行性能', values: ['基线（受 GC/动态类型影响）', '近原生速度（1.5-3x 提升）'] },
              { feature: '加载方式', values: ['源码直接执行', '需下载+编译（流式编译优化）'] },
              { feature: '内存管理', values: ['GC 自动回收', '手动管理（线性内存）'] },
              { feature: '类型系统', values: ['动态类型', '强类型（值类型 i32/i64/f32/f64）'] },
              { feature: '适用场景', values: ['UI 交互、DOM 操作、业务逻辑', '图像/视频处理、游戏、加密、AI 推理'] },
              { feature: '互操作成本', values: ['原生', '跨边界需序列化（避免频繁调用）'] },
              { feature: '调试体验', values: ['DevTools 完善', '需 source map，工具链较新'] },
            ],
          },
        },
        {
          id: 'wa-p5-4',
          type: 'callout',
          variant: 'warning',
          title: '互操作陷阱',
          text: 'JS 与 Wasm 之间每次调用都有边界开销。频繁的小数据交互反而比纯 JS 慢。最佳实践是「批量传递 + 单次计算」：用 Transferable 一次性传入大 Buffer，Wasm 内部完成全部计算后返回结果。',
        },
      ],
    },

    // 知识点 6：Intersection Observer 性能对比（跨模块复用模块十九）
    {
      order: 6,
      title: 'Intersection Observer 性能对比',
      difficulty: 3,
      isNew: true,
      visualizationType: 'debounce-throttle-visualizer',
      blocks: [
        {
          id: 'wa-p6-1',
          type: 'paragraph',
          lead: true,
          text: '本知识点跨模块复用模块十九的 DebounceThrottleVisualizer，切换为「Intersection Observer vs scroll 事件监听」性能对比视角。传统 scroll 监听需手动计算 getBoundingClientRect 并配合防抖，而 IntersectionObserver 由浏览器在主线程之外计算交集，性能更优。',
        },
        {
          id: 'wa-p6-2',
          type: 'paragraph',
          text: '下方复用模块十九的防抖节流可视化器。scroll 事件高频触发（每帧多次），需 debounce/throttle 节流；IntersectionObserver 只在交集变化时回调，天然低频。点击触发观察两种方案的回调频率差异。',
        },
        {
          id: 'wa-p6-3',
          type: 'demo',
          visualizationType: 'debounce-throttle-visualizer',
          data: {
            defaultDebounceWait: 200,
            defaultThrottleWait: 100,
            note: 'scroll 监听：高频触发需节流（throttle 100ms）或防抖（debounce 200ms）。IntersectionObserver：浏览器主线程外计算，仅在阈值跨越时回调，无需节流，性能更优。懒加载/曝光统计应优先使用 IntersectionObserver。',
            title: 'Intersection Observer vs scroll 监听性能对比',
          },
        },
      ],
    },

    // 知识点 7：Web Components 测试流程（跨模块复用模块十八）
    {
      order: 7,
      title: 'Web Components 测试流程',
      difficulty: 3,
      isNew: true,
      visualizationType: 'component-test-playground',
      blocks: [
        {
          id: 'wa-p7-1',
          type: 'paragraph',
          lead: true,
          text: '本知识点跨模块复用模块十八的 ComponentTestPlayground，切换为「Web Components 生命周期测试」视角。测试 Custom Elements 遵循 render-act-assert 三段式：渲染元素 → 触发生命周期（连接/断开/属性变化）→ 断言副作用与状态。',
        },
        {
          id: 'wa-p7-2',
          type: 'paragraph',
          text: '下方复用模块十八的组件测试台。展示如何用 Testing Library 测试 <my-counter> 自定义元素：渲染后断言初始状态，act 中触发 attribute 变化，断言 connectedCallback/attributeChangedCallback 的副作用。',
        },
        {
          id: 'wa-p7-3',
          type: 'demo',
          visualizationType: 'component-test-playground',
          data: {
            title: 'Web Components 生命周期测试',
            threePhaseNote:
              '测试 Custom Elements 的三段式：render 创建元素并触发 constructor+connectedCallback → act 修改属性触发 attributeChangedCallback → assert 验证 Shadow DOM 渲染与副作用清理。',
            componentCode: `// 被测自定义元素
class MyCounter extends HTMLElement {
  static get observedAttributes() {
    return ['count']
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._count = 0
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'count') {
      this._count = Number(newVal)
      this.render()
    }
  }
  render() {
    this.shadowRoot.innerHTML =
      \`<p>count: \${this._count}</p>\`
  }
}
customElements.define('my-counter', MyCounter)`,
            testCode: `import { fixture, expect } from '@open-wc/testing'

it('my-counter 生命周期测试', async () => {
  // render：创建并连接，触发 constructor + connectedCallback
  const el = await fixture(\`<my-counter></my-counter>\`)
  expect(el.shadowRoot.textContent).to.include('count: 0')

  // act：修改属性，触发 attributeChangedCallback
  el.setAttribute('count', '5')
  await el.updateComplete

  // assert：验证 Shadow DOM 已更新
  expect(el.shadowRoot.textContent).to.include('count: 5')
})`,
            stages: [
              {
                id: 'render',
                name: 'render 渲染',
                description: 'fixture 创建 <my-counter>，触发 constructor 与 connectedCallback，Shadow DOM 初始化。',
                codeSnippet: `const el = await fixture(\`<my-counter></my-counter>\`)`,
                result: '元素已连接，shadowRoot 渲染 count: 0',
                color: '#1a6cff',
              },
              {
                id: 'act',
                name: 'act 触发',
                description: 'setAttribute 修改 count 属性，触发 attributeChangedCallback 重新渲染。',
                codeSnippet: `el.setAttribute('count', '5')\nawait el.updateComplete`,
                result: '属性变化回调执行，内部状态更新为 5',
                color: '#f59e0b',
              },
              {
                id: 'assert',
                name: 'assert 断言',
                description: '验证 Shadow DOM 文本已更新为 count: 5，确认渲染同步。',
                codeSnippet: `expect(el.shadowRoot.textContent).to.include('count: 5')`,
                result: '断言通过，生命周期正确联动渲染',
                color: '#07c160',
              },
            ],
          },
        },
      ],
    },

    // 知识点 8：Web 高级 API 知识点速查
    {
      order: 8,
      title: 'Web 高级 API 知识点速查',
      difficulty: 2,
      isNew: true,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'wa-p8-1',
          type: 'paragraph',
          lead: true,
          text: '下方手风琴汇总 Web 高级 API 的核心要点，涵盖 Web Components、Workers、Observer、WebAssembly 四大方向的高频考点。点击展开查看详细说明与代码示例。',
        },
        {
          id: 'wa-p8-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0],
            items: [
              {
                title: 'Custom Elements 生命周期',
                content:
                  'constructor（初始化+Shadow DOM）、connectedCallback（启动副作用）、disconnectedCallback（清理副作用）、attributeChangedCallback（需声明 observedAttributes）、adoptedCallback（跨 document 迁移）。',
                code: `static get observedAttributes() { return ['count'] }
attributeChangedCallback(name, old, newVal) { /* ... */ }`,
              },
              {
                title: 'Shadow DOM 封装',
                content:
                  'attachShadow({ mode: "open" | "closed" }) 创建隔离 DOM 子树，外部样式与选择器无法穿透。open 允许 element.shadowRoot 访问，closed 返回 null。',
                code: `const shadow = this.attachShadow({ mode: 'open' })
shadow.innerHTML = '<style>:host{display:block}</style><p>hi</p>'`,
              },
              {
                title: 'Workers 数据传输三方式',
                content:
                  '结构化克隆（postMessage(data)，默认深拷贝）、Transferable（postMessage(data, [buf])，零拷贝所有权转移）、SharedArrayBuffer（共享内存，需 Atomics 同步与 COOP/COEP 头）。',
                code: `worker.postMessage({ buf }, [buf]) // Transferable`,
              },
              {
                title: 'IntersectionObserver',
                content:
                  '观察元素与视口/根元素的交集变化。配置 { root, rootMargin, threshold }。用于懒加载、滚动动画、曝光统计。比 scroll 监听性能更好（主线程外计算）。',
                code: `new IntersectionObserver(cb, { threshold: 0.5 }).observe(el)`,
              },
              {
                title: 'ResizeObserver',
                content:
                  '观察元素 contentBoxSize 变化。用于响应式容器、图表重绘、自适应布局。注意首次 observe 会立即触发一次回调（初始尺寸）。',
                code: `new ResizeObserver(entries => {
  entries.forEach(e => console.log(e.contentRect.width))
}).observe(el)`,
              },
              {
                title: 'MutationObserver',
                content:
                  '观察 DOM 子树结构/属性变化。配置 { childList, attributes, subtree, characterData }。用于编辑器同步、第三方 DOM 监听、撤销栈。',
                code: `new MutationObserver(cb).observe(node, {
  childList: true, subtree: true, attributes: true
})`,
              },
              {
                title: 'WebAssembly 互操作',
                content:
                  'WebAssembly.instantiate(wasmBytes, imports) 加载模块，导出的函数可被 JS 调用。注意跨边界调用有开销，应批量传递数据。线性内存通过 WebAssembly.Memory 共享。',
                code: `const { instance } = await WebAssembly.instantiate(bytes)
instance.exports.compute(bufferPtr, len)`,
              },
              {
                title: 'Web Components vs 框架组件',
                content:
                  'Web Components 是浏览器原生标准，跨框架复用（React/Vue/Angular 都能直接用）；框架组件依赖运行时但提供响应式/模板。两者可共存：用 Web Components 封装跨框架通用组件。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 主题二 · GraphQL 与 API 层
    // ========================================================================

    // 知识点 9：GraphQL Schema 探索
    {
      order: 9,
      title: 'GraphQL Schema 与查询构建',
      difficulty: 3,
      isNew: true,
      visualizationType: 'graphql-schema-explorer',
      blocks: [
        {
          id: 'wa-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'GraphQL 是一种用于 API 的查询语言，核心是「按需取数」。Schema 定义类型系统（ObjectType/ScalarType/EnumType/InputType），客户端在 query/mutation/subscription 中声明所需字段，服务端只返回这些字段，避免 REST 的过度获取与不足获取。',
        },
        {
          id: 'wa-p9-2',
          type: 'paragraph',
          text: '下方可视化展示 GraphQL Schema 类型树与查询构建器。点击左侧类型查看字段，勾选 Query 根类型的字段，右侧实时生成对应的 GraphQL 操作语句。注意返回 User/Post 类型的字段会自动展开子字段选择。',
        },
        {
          id: 'wa-p9-3',
          type: 'demo',
          visualizationType: 'graphql-schema-explorer',
          data: {},
        },
      ],
    },

    // 知识点 10：GraphQL 与 REST 对比
    {
      order: 10,
      title: 'GraphQL 与 REST 对比',
      difficulty: 2,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'wa-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'GraphQL 与 REST 是两种主流的 API 风格。REST 以资源 + HTTP 动词为核心，端点固定、可缓存；GraphQL 以单一端点 + 按需字段为核心，前端驱动查询。下方对比表从 8 个维度展示两者差异。',
        },
        {
          id: 'wa-p10-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '维度',
            columns: ['REST', 'GraphQL'],
            rows: [
              { feature: '端点', values: ['多个（/users, /posts）', '单一（/graphql）'] },
              { feature: '数据获取', values: ['固定结构，可能过度获取', '按需字段，精确获取'] },
              { feature: '请求方式', values: ['GET/POST/PUT/DELETE', 'POST（query/mutation）'] },
              { feature: '版本管理', values: ['URL 版本（/v1/）', 'Schema 演进（废弃字段）'] },
              { feature: '缓存', values: ['HTTP 缓存（ETag/Cache-Control）', '需 Apollo 客户端缓存'] },
              { feature: '学习成本', values: ['低，HTTP 语义直观', '中，需学 Schema/查询语法'] },
              { feature: '服务端实现', values: ['简单，资源映射', '复杂，需解析器+ N+1 处理'] },
              { feature: '适用场景', values: ['通用 CRUD、公开 API', '多端复杂数据、BFF 聚合'] },
            ],
          },
        },
      ],
    },

    // 知识点 11：API 层方案对比
    {
      order: 11,
      title: 'API 层方案对比',
      difficulty: 3,
      isNew: true,
      visualizationType: 'api-layer-comparison',
      blocks: [
        {
          id: 'wa-p11-1',
          type: 'paragraph',
          lead: true,
          text: '现代前端 API 层有四种主流方案：REST（通用）、GraphQL（按需）、tRPC（端到端类型安全）、TanStack Query（客户端缓存编排）。下方可视化切换方案，对比核心理念、代码示例与优缺点，并提供横向对比表。',
        },
        {
          id: 'wa-p11-2',
          type: 'paragraph',
          text: '选型建议：通用公开 API 选 REST；多端复杂数据选 GraphQL；TS 全栈内部应用选 tRPC；任何方案都可用 TanStack Query 做客户端缓存编排（它可叠加在 REST/GraphQL/tRPC 之上）。',
        },
        {
          id: 'wa-p11-3',
          type: 'demo',
          visualizationType: 'api-layer-comparison',
          data: {},
        },
      ],
    },

    // 知识点 12：tRPC 与 GraphQL 对比
    {
      order: 12,
      title: 'tRPC 与 GraphQL 对比',
      difficulty: 4,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'wa-p12-1',
          type: 'paragraph',
          lead: true,
          text: 'tRPC 与 GraphQL 都解决 REST 的类型安全问题，但路径不同。tRPC 依赖 TS 全栈共享类型，零 codegen，过程调用风格；GraphQL 通过 Schema 自描述，跨语言但需 codegen 同步类型。下方对比表展示两者差异。',
        },
        {
          id: 'wa-p12-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '维度',
            columns: ['tRPC', 'GraphQL'],
            rows: [
              { feature: '类型安全', values: ['端到端原生（TS 共享）', '需 codegen 同步'] },
              { feature: '端点', values: ['过程调用（router.tree）', '单一端点 + 查询'] },
              { feature: '按需取数', values: ['不支持（返回固定结构）', '支持（前端选字段）'] },
              { feature: '跨语言后端', values: ['不支持（仅 TS）', '支持（任意语言）'] },
              { feature: '学习成本', values: ['低（TS 开发者即会）', '中（Schema + 查询语法）'] },
              { feature: '适用场景', values: ['TS 全栈内部应用、Monorepo', '多端、公开 API、BFF'] },
            ],
          },
        },
      ],
    },

    // 知识点 13：TanStack Query 缓存策略
    {
      order: 13,
      title: 'TanStack Query 缓存策略',
      difficulty: 3,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'wa-p13-1',
          type: 'paragraph',
          lead: true,
          text: 'TanStack Query（React Query）是客户端数据获取/缓存编排库，可叠加在 REST/GraphQL/tRPC 之上。核心是 queryKey 缓存键 + staleTime/gcTime 两个时间阈值。下方对比表展示五种核心配置的作用。',
        },
        {
          id: 'wa-p13-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '配置项',
            columns: ['作用', '典型值'],
            highlightColumn: 1,
            rows: [
              { feature: 'queryKey', values: ['缓存键，相同 key 共享缓存与请求去重', "['user', id]"] },
              { feature: 'staleTime', values: ['数据新鲜期，期内不重新请求', '60_000（1 分钟）'] },
              { feature: 'gcTime (cacheTime)', values: ['无人使用后缓存保留时长，过期回收', '300_000（5 分钟）'] },
              { feature: 'refetchOnWindowFocus', values: ['窗口重新聚焦时是否后台刷新', 'true'] },
              { feature: 'enabled', values: ['是否启用查询（依赖参数时控制）', '!!id'] },
            ],
          },
        },
        {
          id: 'wa-p13-3',
          type: 'callout',
          variant: 'info',
          title: 'Apollo Client 与 TanStack Query',
          text: 'Apollo Client 是 GraphQL 专用客户端，内置缓存与状态管理；TanStack Query 是传输层无关的缓存编排库。使用 GraphQL 时二选一：需要深度集成 GraphQL 缓存选 Apollo，需要统一缓存层（混合 REST+GraphQL）选 TanStack Query。',
        },
      ],
    },

    // 知识点 14：GraphQL 与 API 层知识点速查
    {
      order: 14,
      title: 'GraphQL 与 API 层知识点速查',
      difficulty: 2,
      isNew: true,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'wa-p14-1',
          type: 'paragraph',
          lead: true,
          text: '下方手风琴汇总 GraphQL 与 API 层的核心要点，涵盖 Schema、查询类型、Apollo、tRPC、TanStack Query 等高频考点。点击展开查看详细说明。',
        },
        {
          id: 'wa-p14-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0],
            items: [
              {
                title: 'GraphQL 三种操作类型',
                content:
                  'query（读，可并行）、mutation（写，串行执行）、subscription（长连接实时推送，通常基于 WebSocket）。三者共享 Schema 类型系统。',
                code: `query { user(id:1){ name } }
mutation { createUser(input: {...}){ id } }
subscription { messageAdded{ text } }`,
              },
              {
                title: 'Schema 类型系统',
                content:
                  'ObjectType（实体）、ScalarType（ID/String/Int/Float/Boolean）、EnumType（枚举）、InputType（mutation 入参）。! 表示非空，[Type] 表示列表。',
                code: `type User { id: ID! name: String! posts: [Post] }`,
              },
              {
                title: 'N+1 问题与 DataLoader',
                content:
                  'GraphQL 解析器并行执行易引发 N+1 查询（如查 N 个用户各自的文章）。解法是 DataLoader 批量合并请求，按主键一次性查询后分发。',
                code: `const loader = new DataLoader(ids => db.posts.findByUserIds(ids))`,
              },
              {
                title: 'Apollo Client 核心',
                content:
                  'useQuery/useMutation Hooks，内置 normalize 缓存（按 __typename:id 缓存实体）。支持乐观更新、分页、轮询、refetch。cacheRedirects 可自定义缓存读取。',
                code: `const { data, loading } = useQuery(GET_USER, {
  variables: { id }, fetchPolicy: 'cache-first'
})`,
              },
              {
                title: 'tRPC 过程调用',
                content:
                  '服务端定义 router，前端通过类型代理直接调用，参数与返回值类型自动推断。无需 codegen，开发体验极佳，但前后端必须同语言（TS）。',
                code: `const user = await trpc.user.getById.query('1')`,
              },
              {
                title: 'TanStack Query 核心',
                content:
                  'useQuery（读，自动缓存去重）、useMutation（写，可失效缓存）。queryKey 是缓存键，staleTime 控制新鲜期，gcTime 控制回收。传输层无关。',
                code: `useQuery({
  queryKey: ['user', id],
  queryFn: () => fetch('/api/users/'+id).then(r=>r.json()),
  staleTime: 60_000
})`,
              },
              {
                title: 'API 层选型决策',
                content:
                  '公开 API/多语言后端 → REST；多端复杂数据 → GraphQL；TS 全栈内部 → tRPC；任何方案 + 客户端缓存编排 → TanStack Query。可组合：GraphQL + TanStack Query 或 REST + TanStack Query。',
              },
            ],
          },
        },
      ],
    },

    // 知识点 15：模块小测验
    {
      order: 15,
      title: '模块二十一小测验',
      difficulty: 2,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'wa-p15-1',
          type: 'paragraph',
          lead: true,
          text: '通过下方测验检验模块二十一的掌握情况，涵盖 Web Components、Workers、Observer、WebAssembly、GraphQL、API 层选型等核心知识点。',
        },
        {
          id: 'wa-p15-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'Web Components 的 connectedCallback 中最适合做什么？',
                options: [
                  '初始化内部状态与附加 Shadow DOM',
                  '启动定时器、事件监听等副作用',
                  '读取子节点并渲染',
                  '声明 observedAttributes',
                ],
                correctIndex: 1,
                explanation:
                  'constructor 用于初始化状态与附加 Shadow DOM；connectedCallback 在元素插入文档后触发，此时可访问父节点，适合启动副作用。disconnectedCallback 负责清理这些副作用。',
              },
              {
                question: '下列哪种 Web Workers 数据传输方式是零拷贝且原数据会失效？',
                options: ['结构化克隆', 'Transferable 转移', 'SharedArrayBuffer', 'JSON 序列化'],
                correctIndex: 1,
                explanation:
                  'Transferable（postMessage(data, [buffer])）将 ArrayBuffer 等所有权转移给 Worker，零拷贝但原 buffer 的 byteLength 变为 0。结构化克隆是深拷贝，原数据保留；SharedArrayBuffer 是共享内存不转移。',
              },
              {
                question: '懒加载图片应优先使用哪种 Observer？',
                options: ['MutationObserver', 'ResizeObserver', 'IntersectionObserver', 'PerformanceObserver'],
                correctIndex: 2,
                explanation:
                  'IntersectionObserver 观察元素与视口的交集，图片进入视口时触发回调加载 src。相比 scroll 监听，它在主线程外计算，性能更优，且无需手动节流。',
              },
              {
                question: 'GraphQL 相比 REST 的核心优势是什么？',
                options: [
                  'HTTP 缓存更友好',
                  '端点更多更清晰',
                  '按需取字段，避免过度/不足获取',
                  '服务端实现更简单',
                ],
                correctIndex: 2,
                explanation:
                  'GraphQL 让前端在查询中声明所需字段，服务端只返回这些字段，避免 REST 的过度获取（返回不需要的字段）与不足获取（需多次请求拼数据）。代价是 HTTP 缓存需额外处理、服务端需解析器。',
              },
              {
                question: 'TS 全栈内部应用，追求零 codegen 的端到端类型安全，应选哪种 API 方案？',
                options: ['REST', 'GraphQL', 'tRPC', 'SOAP'],
                correctIndex: 2,
                explanation:
                  'tRPC 依赖 TS 全栈共享类型，前端通过类型代理直接调用后端过程，参数与返回值类型自动推断，无需 codegen。但仅限 TS 全栈，不适合公开 API 或跨语言后端。',
              },
              {
                question: 'TanStack Query 的 staleTime 配置项作用是？',
                options: [
                  '无人使用后缓存保留时长',
                  '数据新鲜期，期内不重新请求',
                  '查询失败重试次数',
                  '请求超时时间',
                ],
                correctIndex: 1,
                explanation:
                  'staleTime 是数据新鲜期，在该时间内组件重新挂载或窗口聚焦时不会重新发起请求。gcTime（原 cacheTime）才是无人使用后缓存保留时长，过期后回收。',
              },
            ],
          },
        },
      ],
    },
  ],
}
