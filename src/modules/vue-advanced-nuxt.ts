/**
 * 模块 12：Vue 进阶与 Nuxt 全栈
 *
 * 严格遵循 docx/模块十二.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 17 个知识点（13 章节 + 1 综合实战 + 1 面试题 + 1 速查 + 1 小测验）
 * - 17 个可视化演示（4 个新增 Vue 进阶专属组件 + 4 个复用模块十一组件 + 8 个复用通用组件 + 1 个实战沙盒）
 *
 * 新增专属组件（位于 components/interactive/vue-advanced/）：
 * - NuxtHybridRenderStudio：SSR/SSG/ISR/SPA 四种渲染策略交互对比
 * - ComposableFlowVisualizer：多 Composable 协同流向可视化
 * - CustomDirectiveWorkbench：自定义指令实时效果实践台
 * - KeepAliveCacheSimulator：KeepAlive LRU 缓存策略模拟器
 *
 * 知识点编排：
 * - KP1 Vue 进阶总览（KnowledgeGraph）
 * - KP2 响应式原理深入：track/trigger/effect（ProxyReactivityTracker）
 * - KP3 Options API vs Composable 逻辑复用对比（CompareTable）
 * - KP4 Composable 组合模式：多函数协同（ComposableFlowVisualizer）
 * - KP5 自定义指令系统（CustomDirectiveWorkbench）
 * - KP6 Nuxt 3 混合渲染：SSR/SSG/ISR/SPA（NuxtHybridRenderStudio）
 * - KP7 Pinia 双模式 Store（PiniaStoreExplorer）
 * - KP8 Nuxt 请求生命周期（Architecture）
 * - KP9 Vue 性能优化手段对比矩阵（CompareTable）
 * - KP10 编译优化：PatchFlag 与静态提升（PatchFlagVisualizer）
 * - KP11 性能优化演进时间线（Timeline）
 * - KP12 KeepAlive 缓存策略（KeepAliveCacheSimulator）
 * - KP13 Provide/Inject vs Props/Emits（CompareTable）
 * - KP14 Vue 进阶速查（Accordion）
 * - KP15 综合实战：Composable useMouseTracker 封装（Sandbox 7 checks）
 * - KP16 Vue 进阶面试题精选（Accordion 32 题 flashcard）
 * - KP17 Vue 进阶小测验（Quiz 20 题）
 *
 * 所有交互均为教学模拟，在 React 项目中交付 Vue 3 跨框架教学内容。
 */
import type { ModuleMeta } from '../lib/types'

export const vueAdvancedNuxtModule: ModuleMeta = {
  number: '12',
  title: 'Vue 进阶与 Nuxt 全栈',
  slug: 'vue-advanced-nuxt',
  stage: 'vue',
  stageLabel: 'Vue 技术栈 · 第 2 模块',
  icon: '12',
  summary: '自定义指令、Teleport、KeepAlive、Nuxt 3、Nitro、编译优化、性能演进。',
  knowledgePointCount: 17,
  visualizationCount: 17,
  points: [
    // ========================================================================
    // 知识点 1：Vue 进阶总览
    // ========================================================================
    {
      order: 1,
      title: 'Vue 进阶总览',
      difficulty: 1,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: '模块十二在模块十一（Vue 核心基础）之上，深入响应式原理源码、Composition API 组合模式、自定义指令系统、Nuxt 3 全栈渲染与性能优化演进，形成从「会用」到「精通」的进阶闭环。',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'vue-advanced', label: 'Vue 进阶', group: 'core', weight: 3 },
              { id: 'reactivity', label: '响应式原理', group: 'related', weight: 2 },
              { id: 'composition', label: 'Composition API', group: 'related', weight: 2 },
              { id: 'directive', label: '自定义指令', group: 'related', weight: 2 },
              { id: 'pinia', label: 'Pinia', group: 'related', weight: 2 },
              { id: 'nuxt', label: 'Nuxt 3', group: 'related', weight: 2 },
              { id: 'plugin', label: '插件系统', group: 'related', weight: 1 },
              { id: 'perf', label: '性能优化', group: 'related', weight: 2 },
            ],
            edges: [
              { source: 'vue-advanced', target: 'reactivity' },
              { source: 'vue-advanced', target: 'composition' },
              { source: 'vue-advanced', target: 'directive' },
              { source: 'vue-advanced', target: 'pinia' },
              { source: 'vue-advanced', target: 'nuxt' },
              { source: 'vue-advanced', target: 'plugin' },
              { source: 'vue-advanced', target: 'perf' },
              { source: 'composition', target: 'reactivity' },
              { source: 'nuxt', target: 'reactivity' },
              { source: 'nuxt', target: 'pinia' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'list',
          items: [
            '响应式原理：Proxy + WeakMap 依赖收集 + activeEffect 调度',
            'Composition API：Composable 函数组合，逻辑复用与类型推断',
            '自定义指令：mounted/updated 钩子封装 DOM 行为复用',
            'Nuxt 3：基于 Nitro 的 SSR/SSG/ISR/SPA 混合渲染全栈',
            '性能优化：v-once/v-memo/shallowRef/KeepAlive/虚拟列表',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 2：响应式原理深入（track/trigger/effect/WeakMap）
    // ========================================================================
    {
      order: 2,
      title: '响应式原理深入：track / trigger / effect',
      difficulty: 4,
      visualizationType: 'proxy-reactivity-tracker',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 响应式由 reactive() 创建 Proxy，读取属性时 track() 收集当前 activeEffect 到 WeakMap<target, Map<key, Set<effect>>>，写入属性时 trigger() 取出对应 effect 重新执行。effect 是调度的基本单元，computed/ref 底层均基于它构建。',
        },
        {
          id: 'p2-2',
          type: 'code',
          language: 'typescript',
          filename: 'reactivity-core.ts',
          code: `let activeEffect: EffectFn | null = null
const targetMap = new WeakMap<object, Map<string, Set<EffectFn>>>()

export function track(target: object, key: string) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, (depsMap = new Map()))
  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, (dep = new Set()))
  dep.add(activeEffect)
}

export function trigger(target: object, key: string) {
  const depsMap = targetMap.get(target)
  depsMap?.get(key)?.forEach((fn) => fn())
}

export function effect(fn: EffectFn) {
  const _effect = () => { activeEffect = _effect; fn(); activeEffect = null }
  _effect()
}`,
        },
        {
          id: 'p2-3',
          type: 'demo',
          visualizationType: 'proxy-reactivity-tracker',
          data: {
            scenarios: [
              {
                id: 'basic-effect',
                label: '基础使用模式',
                initialData: { count: 0, msg: 'hello' },
                effects: [
                  { name: 'effectA', dependencies: ['count'] },
                  { name: 'effectB', dependencies: ['count', 'msg'] },
                ],
              },
              {
                id: 'raw-source',
                label: '源码模式（Raw）',
                initialData: { user: { name: '张三', age: 18 }, list: [1, 2, 3] },
                effects: [
                  { name: 'activeEffect = renderEffect', dependencies: ['user.name', 'user.age'] },
                  { name: 'activeEffect = computedEffect', dependencies: ['user.age'] },
                  { name: 'activeEffect = watchEffect', dependencies: ['list'] },
                ],
              },
            ],
          },
        },
        {
          id: 'p2-4',
          type: 'callout',
          variant: 'tip',
          title: 'WeakMap 的关键作用',
          text: 'targetMap 用 WeakMap 以 target 对象为键：当响应式对象被回收，对应的依赖记录自动被 GC 清除，避免内存泄漏。这是 Vue 3 相比 Vue 2（用 Object.defineProperty + 闭包）的核心改进之一。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：Options API vs Composable 逻辑复用对比
    // ========================================================================
    {
      order: 3,
      title: 'Options API vs Composable 逻辑复用对比',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 2 时代的逻辑复用主要靠 Mixins（Options API），存在命名冲突、数据来源不清、类型推断弱等问题。Vue 3 的 Composable 函数（Composition API）通过显式传参和返回响应式引用，解决了上述全部痛点。',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['Options API（Mixins）', 'Composable 函数'],
            rows: [
              { feature: '逻辑复用方式', values: ['混入选项对象', '调用函数返回响应式引用'] },
              { feature: '命名冲突', values: ['易冲突，后者覆盖', '显式命名，无冲突'] },
              { feature: '数据来源清晰度', values: ['来源分散在 mixins 数组', '一目了然来自哪个函数'] },
              { feature: 'TypeScript 支持', values: ['弱，需 vue-class-component', '强，原生泛型推断'] },
              { feature: '代码组织', values: ['按选项（data/methods）切分', '按功能聚合'] },
              { feature: '跨组件传参', values: ['困难，依赖 this', '直接函数参数传递'] },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'p3-3',
          type: 'code',
          language: 'typescript',
          filename: 'composable-vs-mixin.ts',
          code: `// ❌ Mixin：来源不清、易冲突
const mouseMixin = {
  data: () => ({ x: 0, y: 0 }),
  mounted() { window.addEventListener('mousemove', this.onMove) },
}

// ✅ Composable：显式、可传参、类型安全
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  function onMove(e: MouseEvent) { x.value = e.clientX; y.value = e.clientY }
  onMounted(() => window.addEventListener('mousemove', onMove))
  onUnmounted(() => window.removeEventListener('mousemove', onMove))
  return { x, y }
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 4：Composable 组合模式
    // ========================================================================
    {
      order: 4,
      title: 'Composable 组合模式：多函数协同',
      difficulty: 3,
      isNew: true,
      visualizationType: 'composable-flow-visualizer',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Composable 的真正威力在于「组合」：一个 Composable 可以调用并依赖另一个 Composable 的输出，形成显式的依赖链。这种模式让复杂业务逻辑（如认证、权限、路由守卫）被拆解为可测试、可复用的小单元。',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'composable-flow-visualizer',
          data: {
            title: 'Composable 协同流向',
          },
        },
        {
          id: 'p4-3',
          type: 'callout',
          variant: 'note',
          title: '组合优于继承',
          text: 'useRouteGuard(useAuth(), usePermissions(auth)) 这样的显式传参，让依赖关系在函数签名中可见，比 Options API 的隐式 this 链路更易测试与维护。点击交互组件中的节点可查看每个 Composable 的输入/输出与上下游联动。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：自定义指令系统
    // ========================================================================
    {
      order: 5,
      title: '自定义指令系统',
      difficulty: 3,
      isNew: true,
      visualizationType: 'custom-directive-workbench',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: '自定义指令用于封装「需要直接操作 DOM 的可复用行为」。指令对象包含一组生命周期钩子：mounted（绑定）、updated（依赖更新）、unmounted（解绑），通过 binding.value 接收传参。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'custom-directive-workbench',
          data: {
            title: '自定义指令实时实践台',
          },
        },
        {
          id: 'p5-3',
          type: 'list',
          items: [
            'v-focus：mounted 钩子调用 el.focus()，常用于表单首项自动聚焦',
            'v-debounce：mounted 绑定防抖事件监听，updated 更新回调引用',
            'v-permission：mounted 校验角色移除节点，updated 切换 display',
            'v-lazy：mounted 创建 IntersectionObserver，unmounted disconnect 防泄漏',
          ],
        },
        {
          id: 'p5-4',
          type: 'callout',
          variant: 'warning',
          title: '何时该用指令而非组件',
          text: '指令适合「无独立 UI、仅需操作宿主元素 DOM」的场景（聚焦、懒加载、权限隐藏）。若逻辑需要独立模板/状态，应优先抽成组件。滥用指令会牺牲可维护性。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：Nuxt 3 混合渲染
    // ========================================================================
    {
      order: 6,
      title: 'Nuxt 3 混合渲染：SSR / SSG / ISR / SPA',
      difficulty: 4,
      isNew: true,
      visualizationType: 'nuxt-hybrid-render-studio',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Nuxt 3 基于 Nitro 引擎支持「混合渲染」——可在同一个应用中按路由配置不同的渲染策略：SSR（请求时服务端渲染）、SSG（构建时预渲染）、ISR（SWR 定时重新验证）、SPA（纯客户端渲染）。通过 nuxt.config.ts 的 routeRules 按路径声明。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'nuxt-hybrid-render-studio',
          data: {
            title: 'Nuxt 混合渲染沙盒',
          },
        },
        {
          id: 'p6-3',
          type: 'callout',
          variant: 'tip',
          title: 'routeRules 决策口诀',
          text: '强 SEO + 内容稳定 → SSG（prerender）；强 SEO + 实时数据 → SSR（ssr:true）；CDN 加速 + 周期更新 → ISR（swr:3600）；登录后/无 SEO → SPA（ssr:false）。下方交互沙盒可切换页面与模式实时对比。',
        },
      ],
    },

    // ========================================================================
    // 知识点 7：Pinia 双模式 Store（Option Store vs Composition Store）
    // ========================================================================
    {
      order: 7,
      title: 'Pinia 双模式 Store',
      difficulty: 3,
      visualizationType: 'pinia-store-explorer',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: 'Pinia 支持两种定义 Store 的语法：Option Store（对象式，类似 Vue 2 习惯）与 Composition Store（setup 函数式，更灵活、TypeScript 推断更好）。两者运行时等价，选择主要看团队风格与复杂度。',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'pinia-store-explorer',
          data: {
            templates: [
              {
                id: 'option-cart',
                label: 'Option Store',
                description: '对象式：state/getters/actions 三段式，结构清晰、上手简单。',
                defineStoreCode: `export const useCartStore = defineStore('cart', {
  state: () => ({ count: 0, price: 10 }),
  getters: {
    total: (state) => state.count * state.price,
  },
  actions: {
    add() { this.count++ },
    remove() { if (this.count > 0) this.count-- },
  },
})`,
                initialState: { count: 0, price: 10 },
                getters: [
                  { name: 'total', compute: (s) => (s.count as number) * (s.price as number) },
                ],
                actions: [
                  {
                    name: 'add',
                    label: 'add() +1',
                    execute: (s) => ({ ...s, count: (s.count as number) + 1 }),
                  },
                  {
                    name: 'remove',
                    label: 'remove() -1',
                    execute: (s) => ({ ...s, count: Math.max(0, (s.count as number) - 1) }),
                  },
                ],
              },
              {
                id: 'composition-counter',
                label: 'Composition Store',
                description: 'setup 函数式：用 ref/computed 自由组合，更接近 Composable 风格，类型推断更强。',
                defineStoreCode: `export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() { count.value++ }
  function reset() { count.value = 0 }
  return { count, double, increment, reset }
})`,
                initialState: { count: 0 },
                getters: [
                  { name: 'double', compute: (s) => (s.count as number) * 2 },
                ],
                actions: [
                  {
                    name: 'increment',
                    label: 'increment() +1',
                    execute: (s) => ({ ...s, count: (s.count as number) + 1 }),
                  },
                  {
                    name: 'reset',
                    label: 'reset()',
                    execute: (s) => ({ ...s, count: 0 }),
                  },
                ],
              },
            ],
            title: 'Pinia 双模式 Store 探索器',
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 8：Nuxt 请求生命周期
    // ========================================================================
    {
      order: 8,
      title: 'Nuxt 请求生命周期',
      difficulty: 3,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Nuxt 3 的服务端请求经过一条清晰的管线：请求到达 Nitro → 执行路由中间件（middleware）→ 渲染 Layout → 渲染 Page（期间 useFetch/useAsyncData 触发 Server API 调用）→ 拼装 HTML 响应返回。理解这条链路是排查 SSR 数据时序问题的关键。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'Nuxt 3 请求生命周期',
            flowDirection: 'top-down',
            layers: [
              {
                name: '1. 请求到达',
                description: '浏览器请求进入 Nitro 服务端',
                components: [
                  { name: 'Nitro Server', description: '基于 h3/nitropack 的服务端引擎' },
                  { name: 'Route Match', description: '匹配页面路由' },
                ],
              },
              {
                name: '2. Middleware',
                description: '全局/路由中间件，可重定向或中止',
                components: [
                  { name: 'plugins/*.ts', description: '应用初始化插件' },
                  { name: 'middleware/auth.ts', description: '鉴权、重定向到 /login' },
                ],
              },
              {
                name: '3. Layout & Page',
                description: '依次渲染布局与页面组件',
                components: [
                  { name: 'layouts/default.vue', description: '页面外壳（导航/页脚）' },
                  { name: 'pages/index.vue', description: '页面组件 setup 执行' },
                ],
              },
              {
                name: '4. Data Fetching',
                description: 'useFetch / useAsyncData 触发服务端数据请求',
                components: [
                  { name: 'useFetch("/api/x")', description: 'SSR 期间在服务端执行一次' },
                  { name: 'Server API (Nitro)', description: 'server/api/*.ts 处理请求' },
                ],
              },
              {
                name: '5. 响应返回',
                description: '拼装 HTML + payload 返回客户端',
                components: [
                  { name: 'HTML + Payload', description: '服务端渲染 HTML 与序列化数据' },
                  { name: 'Hydration', description: '客户端注水接管，转为响应式' },
                ],
              },
            ],
          },
        },
        {
          id: 'p8-3',
          type: 'callout',
          variant: 'note',
          title: 'useFetch 的双重执行',
          text: 'useFetch 在 SSR 阶段服务端执行一次，结果随 payload 返回；客户端 hydration 时不会重复请求，直接复用 payload 数据，避免二次请求。这与 React Query 的 SSR 模式（prefetch + dehydrate）思路一致。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：Vue 性能优化手段对比矩阵
    // ========================================================================
    {
      order: 9,
      title: 'Vue 性能优化手段对比矩阵',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 提供从编译期到运行时的多层优化手段。不同手段作用于不同瓶颈——静态内容用 v-once、列表用 v-memo、大对象用 shallowRef、组件懒加载用 defineAsyncComponent + Suspense、长列表用虚拟滚动。选错手段往往收益甚微。',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '优化手段',
            columns: ['原理', '适用场景', '收益', '注意事项'],
            rows: [
              { feature: 'v-once', values: ['编译期标记只渲染一次', '静态展示内容', '跳过后续 diff', '状态变化不更新'] },
              { feature: 'v-memo', values: ['依赖数组不变则跳过子树 diff', '大列表项局部更新', '减少 diff 范围', '依赖数组要精确'] },
              { feature: 'shallowRef', values: ['只对 .value 浅响应', '大对象/第三方实例', '避免深度代理开销', '内部修改需 triggerRef'] },
              { feature: 'shallowReactive', values: ['仅顶层属性响应式', '树形大数据', '降低代理成本', '嵌套属性不触发更新'] },
              { feature: 'defineAsyncComponent', values: ['按需加载组件', '路由级/弹窗组件', '减小首屏 bundle', '需配合 Suspense 处理加载态'] },
              { feature: 'Suspense', values: ['协调异步组件 fallback', '配合异步 setup', '统一加载/错误态', '嵌套需谨慎避免抖动'] },
              { feature: 'KeepAlive', values: ['缓存组件实例', 'Tab 切换/表单暂存', '避免重复挂载开销', '注意 max 与内存'] },
              { feature: '虚拟列表', values: ['只渲染可视区域', '长列表 (1000+ 项)', 'DOM 节点数恒定', '需处理动态高度'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 10：编译优化可视化（PatchFlag / 静态提升）
    // ========================================================================
    {
      order: 10,
      title: '编译优化：PatchFlag 与静态提升',
      difficulty: 4,
      visualizationType: 'patch-flag-visualizer',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 编译器在编译期分析模板，为动态节点打上 PatchFlag（如 TEXT=1、CLASS=2、PROPS=8），运行时 diff 只比对标记的部分；纯静态节点被提升（hoist）到渲染函数外，每次渲染复用同一引用，跳过 diff。这是 Vue 3 相比 Vue 2 性能跃升的核心。',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'patch-flag-visualizer',
          data: {
            templates: [
              {
                id: 'patchflag-memo',
                label: 'v-memo + 静态提升',
                templateCode: `<template>
  <header>
    <h1>固定标题</h1>
    <p>{{ greeting }}</p>
  </header>
  <div v-memo="[item.id, item.selected]">
    <span>{{ item.name }}</span>
    <span :class="{ active: item.selected }">{{ item.label }}</span>
  </div>
</template>`,
                staticNodes: ['<h1>固定标题</h1>（纯文本，提升并跳过 diff）'],
                dynamicNodes: [
                  { expression: '{{ greeting }}', patchFlag: 1, flagName: 'TEXT' },
                  { expression: ':class="{ active: item.selected }"', patchFlag: 2, flagName: 'CLASS' },
                  { expression: '{{ item.label }}', patchFlag: 1, flagName: 'TEXT' },
                ],
                hoistedNodes: ['<h1>固定标题</h1>', '<header> 容器（仅含一个动态子节点）'],
                compiledSnippet: `// 编译产物（简化）
const _hoisted_1 = createElementVNode("h1", null, "固定标题")

function render(_ctx, _cache) {
  return [
    createVNode("header", null, [
      _hoisted_1,                              // 提升复用，跳过 diff
      createTextVNode(_ctx.greeting, 1 /* TEXT */)
    ]),
    withMemo([_ctx.item.id, _ctx.item.selected], () => [
      createVNode("div", null, [
        createTextVNode(_ctx.item.name, 1 /* TEXT */),
        createVNode("span", { class: { active: _ctx.item.selected } },
          toDisplayString(_ctx.item.label), 2 /* CLASS */)
      ])
    ], _cache, 0)
  ]
}`,
              },
              {
                id: 'patchflag-fullprops',
                label: '动态 props 与 FULL_PROPS',
                templateCode: `<template>
  <UserCard v-bind="user" />
  <p>共 {{ users.length }} 位用户</p>
</template>`,
                staticNodes: ['<p> 容器（结构静态，仅文本动态）'],
                dynamicNodes: [
                  { expression: 'v-bind="user"', patchFlag: 16, flagName: 'FULL_PROPS' },
                  { expression: '{{ users.length }}', patchFlag: 1, flagName: 'TEXT' },
                ],
                hoistedNodes: [],
                compiledSnippet: `// v-bind="user" 整体绑定 → FULL_PROPS(16)
// diff 时需比对全部 props，无法靶向优化
createVNode(UserCard, _ctx.user, null, 16 /* FULL_PROPS */)
createTextVNode("共 " + _ctx.users.length + " 位用户", 1 /* TEXT */)`,
              },
            ],
            title: '编译优化可视化',
          },
        },
        {
          id: 'p10-3',
          type: 'callout',
          variant: 'tip',
          title: 'v-bind vs 单独 :prop',
          text: 'v-bind="obj" 会触发 FULL_PROPS(16)，diff 全部属性；而 :name="obj.name" :age="obj.age" 会触发 PROPS(8)，只比对该 props 数组。性能敏感场景优先用单独绑定。',
        },
      ],
    },

    // ========================================================================
    // 知识点 11：性能优化演进时间线
    // ========================================================================
    {
      order: 11,
      title: '性能优化演进时间线',
      difficulty: 2,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 的性能优化手段随版本演进不断细化：从最基础的 v-once，到 computed 缓存、异步组件、Suspense、v-memo、shallowRef，再到虚拟滚动。理解演进脉络有助于在不同场景选择合适层级的优化。',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '基础', title: 'v-once', description: '编译期标记只渲染一次，跳过后续全部 diff。', status: 'done' },
              { time: '派生', title: 'computed 缓存', description: '依赖不变时复用计算结果，避免重复求值。', status: 'done' },
              { time: '加载', title: 'defineAsyncComponent', description: '按需加载组件，减小首屏 bundle 体积。', status: 'done' },
              { time: '协调', title: 'Suspense', description: '统一管理异步组件的加载/错误 fallback。', status: 'done' },
              { time: '子树', title: 'v-memo', description: '依赖数组不变跳过整棵子树 diff，适合大列表。', status: 'done' },
              { time: '响应式', title: 'shallowRef / shallowReactive', description: '降低深度代理开销，适合大数据对象。', status: 'active' },
              { time: '渲染', title: '虚拟滚动 (virtual scroller)', description: '只渲染可视区域，DOM 节点数恒定。', status: 'pending' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 12：KeepAlive 缓存策略
    // ========================================================================
    {
      order: 12,
      title: 'KeepAlive 缓存策略',
      difficulty: 3,
      isNew: true,
      visualizationType: 'keepalive-cache-simulator',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: '<KeepAlive> 缓存非活动组件实例，避免重复挂载/卸载的开销，常用于 Tab 切换、表单暂存。通过 include/exclude 控制缓存范围，max 限制最大缓存数并按 LRU（最近最少使用）淘汰。被缓存组件触发 onActivated/onDeactivated 而非 onMounted/onUnmounted。',
        },
        {
          id: 'p12-2',
          type: 'code',
          language: 'html',
          filename: 'keepalive-usage.vue',
          code: `<KeepAlive :include="['Home', 'Users']" :exclude="['Admin']" :max="3">
  <component :is="currentTab" />
</KeepAlive>

<!-- 被缓存组件的生命周期 -->
<script setup>
import { onActivated, onDeactivated } from 'vue'
onActivated(() => console.log('从缓存恢复'))
onDeactivated(() => console.log('进入缓存（未销毁）'))
</script>`,
        },
        {
          id: 'p12-3',
          type: 'demo',
          visualizationType: 'keepalive-cache-simulator',
          data: {
            title: 'KeepAlive LRU 缓存模拟器',
          },
        },
        {
          id: 'p12-4',
          type: 'callout',
          variant: 'warning',
          title: 'max 与内存权衡',
          text: '缓存越多切换越流畅，但内存占用上升。max 触发 LRU 淘汰最久未访问的组件。下方模拟器可调整 max、切换 include/exclude，观察「渲染次数」：被缓存 Tab 回切时计数不变（命中），被淘汰 Tab 重新进入则计数 +1（重新挂载）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 13：Provide/Inject vs Props/Emits
    // ========================================================================
    {
      order: 13,
      title: 'Provide/Inject vs Props/Emits',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: 'Props/Emits 是父子直接通信的标准方式，链路清晰但层级深时需逐层透传（prop drilling）。Provide/Inject 允许祖先跨层级向后代注入数据，适合主题、用户、国际化等全局上下文，但牺牲了显式的依赖链路。',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['Provide/Inject', 'Props/Emits'],
            rows: [
              { feature: '数据流向', values: ['祖先 → 任意后代（跨层）', '父 → 子（逐层）'] },
              { feature: '适用层级', values: ['深层嵌套（3 层以上）', '直接父子或浅层'] },
              { feature: '类型安全', values: ['需 InjectionKey<T> 显式标注', 'defineProps 泛型原生推断'] },
              { feature: '响应式保持', values: ['需 provide(ref) 或 reactive', 'ref 直接传递保持响应式'] },
              { feature: '适用场景', values: ['主题、用户、i18n 等全局上下文', '组件配置、事件回调、表单值'] },
              { feature: '可测试性', values: ['后代隐式依赖，难单独测试', '依赖显式，易 mock'] },
            ],
          },
        },
        {
          id: 'p13-3',
          type: 'code',
          language: 'typescript',
          filename: 'provide-inject-typed.ts',
          code: `import { inject, provide, type InjectionKey, type Ref } from 'vue'

// 用 InjectionKey 保证 provide/inject 类型一致
export const userKey: InjectionKey<Ref<User>> = Symbol('user')

// 祖先
provide(userKey, user)

// 任意深层后代
const user = inject(userKey) // Ref<User> | undefined`,
        },
      ],
    },

    // ========================================================================
    // 知识点 14：Vue 进阶速查
    // ========================================================================
    {
      order: 14,
      title: 'Vue 进阶速查',
      difficulty: 1,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: '下表汇总 Vue 进阶核心 API 与要点，方便快速回顾。',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: true,
            defaultOpen: [0],
            items: [
              {
                title: '响应式 API',
                content: 'reactive（对象深度响应式）、ref（任意值，.value 访问）、computed（缓存计算属性）、watch/watchEffect（副作用）、shallowRef/shallowReactive（浅响应式，优化大对象）。',
                code: `const state = reactive({ count: 0 })
const double = computed(() => state.count * 2)
watchEffect(() => console.log(state.count))`,
                codeLanguage: 'typescript',
              },
              {
                title: 'Composable 约定',
                content: '函数名以 use 开头；在 setup 内调用；返回响应式引用（ref/computed）；显式清理副作用（onUnmounted）。可调用其他 Composable 形成组合链。',
                code: `export function useFetch<T>(url: Ref<string>) {
  const data = ref<T | null>(null)
  watch(url, () => fetchData(), { immediate: true })
  return { data }
}`,
                codeLanguage: 'typescript',
              },
              {
                title: '自定义指令钩子',
                content: 'mounted（绑定）、updated（依赖更新）、unmounted（解绑）。binding.value 取传参，binding.oldValue 取旧值。el 是宿主 DOM。',
                code: `const vFocus = { mounted: (el) => el.focus() }
// <input v-focus />`,
                codeLanguage: 'typescript',
              },
              {
                title: 'Nuxt 3 routeRules',
                content: '按路径声明渲染策略：prerender:true（SSG）、ssr:true（SSR）、swr:秒数（ISR）、ssr:false（SPA）。支持通配符 /blog/**。',
                code: `routeRules: {
  '/': { prerender: true },
  '/admin/**': { ssr: false },
  '/blog/**': { swr: 3600 },
}`,
                codeLanguage: 'typescript',
              },
              {
                title: 'KeepAlive 属性',
                content: 'include/exclude（字符串/正则/数组，匹配组件 name）、max（最大缓存数，LRU 淘汰）。缓存组件走 onActivated/onDeactivated。',
                code: `<KeepAlive :max="3" :include="['Home','Users']">`,
                codeLanguage: 'html',
              },
              {
                title: '性能优化速记',
                content: '静态→v-once；列表局部更新→v-memo；大对象→shallowRef；懒加载→defineAsyncComponent+Suspense；Tab 暂存→KeepAlive；长列表→虚拟滚动。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 15：综合实战：Composable useMouseTracker 封装
    // ========================================================================
    {
      order: 15,
      title: '综合实战：Composable useMouseTracker 封装',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: '把 ref、computed、watch、生命周期、effectScope、清理副作用焊在一起的综合实战：封装一个跟踪鼠标位置 + 节流 + 自动清理的 Composable。这是 Vue 进阶逻辑复用的典型场景，掌握后可举一反三写 useScroll、useResize、useIntersection 等。',
        },
        {
          id: 'p15-2',
          type: 'callout',
          variant: 'tip',
          title: '为什么练这个？',
          text: 'useMouseTracker 浓缩了 Composable 的全部要素：响应式状态（ref/computed）、副作用注册与清理（addEventListener/removeEventListener）、生命周期接入（onMounted/onUnmounted 或 onScopeDispose）、参数化（节流时间）。练完即掌握「状态 + 副作用 + 清理 + 参数化」四件套，是写任何 Composable 的通用骨架。',
        },
        {
          id: 'p15-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'typescript',
            hint: '在下方编辑器中补全 useMouseTracker 的实现，让鼠标移动时 x/y 实时更新、computed 节流、卸载时自动清理监听。任务检查清单会实时校验——逐条通过即完成。重点关注 ref/computed/onMounted/onUnmounted/addEventListener/removeEventListener/return。',
            initialCode: `import { ref, computed, onMounted, onUnmounted } from 'vue'

// 封装鼠标位置跟踪 Composable
// 要求：响应式 x/y、节流派生 throttled、自动清理
export function useMouseTracker(throttleMs = 100) {
  // 1. 用 ref 定义响应式 x/y
  const x = ref(0)
  const y = ref(0)

  // 2. 用 computed 派生节流后的坐标（throttled 对象）
  // 提示：用 lastTime 记录上次更新时间
  let lastTime = 0
  const throttled = computed(() => {
    const now = Date.now()
    if (now - lastTime >= throttleMs) {
      lastTime = now
      return { x: x.value, y: y.value }
    }
    return { x: x.value, y: y.value }
  })

  // 3. 鼠标移动 handler
  const handler = (e: MouseEvent) => {
    x.value = e.clientX
    y.value = e.clientY
  }

  // 4. onMounted 注册监听
  onMounted(() => {
    window.addEventListener('mousemove', handler)
  })

  // 5. onUnmounted 清理监听（防内存泄漏）
  onUnmounted(() => {
    window.removeEventListener('mousemove', handler)
  })

  return { x, y, throttled }
}`,
            checks: [
              {
                description: '用 ref 定义响应式 x 坐标',
                pattern: 'const\\s+x\\s*=\\s*ref\\(',
                hint: '响应式状态必须用 ref 包装：const x = ref(0)。这样 x.value 的修改才能触发更新。',
              },
              {
                description: '用 ref 定义响应式 y 坐标',
                pattern: 'const\\s+y\\s*=\\s*ref\\(',
                hint: 'y 同样需要 ref 包装：const y = ref(0)。',
              },
              {
                description: '用 computed 派生节流坐标 throttled',
                pattern: 'const\\s+throttled\\s*=\\s*computed\\(',
                hint: '派生值用 computed 缓存：const throttled = computed(() => ...)。computed 基于依赖缓存，避免每次读都重算。',
              },
              {
                description: 'handler 中更新 x.value / y.value',
                pattern: 'x\\.value\\s*=|y\\.value\\s*=',
                hint: '修改 ref 必须用 .value：x.value = e.clientX。直接 x = ... 会丢失响应式。',
              },
              {
                description: 'onMounted 注册 mousemove 监听',
                pattern: 'onMounted\\([\\s\\S]*addEventListener\\([\\s\\S]*mousemove',
                hint: '在 onMounted 中 window.addEventListener("mousemove", handler)。DOM 监听需在挂载后注册（此时 window 可用）。',
              },
              {
                description: 'onUnmounted 移除监听（清理副作用）',
                pattern: 'onUnmounted\\([\\s\\S]*removeEventListener',
                hint: 'onUnmounted 中 window.removeEventListener("mousemove", handler)。组件卸载后必须移除监听，否则监听器持有已销毁组件的引用造成内存泄漏。',
              },
              {
                description: '返回 x/y/throttled 供调用方使用',
                pattern: 'return\\s*\\{[^}]*x[^}]*y[^}]*throttled',
                hint: 'Composable 必须返回响应式引用：return { x, y, throttled }。调用方解构后仍保持响应式（ref 解构安全）。',
              },
            ],
          },
        },
        {
          id: 'p15-4',
          type: 'callout',
          variant: 'warning',
          title: '实战反思：副作用清理的边界',
          text: '本例用 onUnmounted 清理，但若 Composable 在 effectScope 中使用（如被另一个 Composable 调用），更推荐 onScopeDispose —— 它能在 scope.stop() 时自动清理，不依赖组件生命周期。原则：组件级用 onUnmounted，可复用/嵌套用 onScopeDispose。另外节流这里用 computed + lastTime 是简化版，生产环境推荐 lodash-es 的 throttle 或 vueuse 的 useThrottleFn。',
        },
      ],
    },

    // ========================================================================
    // 知识点 16：Vue 进阶面试题精选
    // ========================================================================
    {
      order: 16,
      title: 'Vue 进阶面试题精选',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: '32 道 Vue 进阶与 Nuxt 全栈核心面试题，覆盖响应式源码、Composable 设计、自定义指令、KeepAlive、Nuxt 渲染策略、编译优化、性能演进、场景排查与方案对比。点击卡片翻转查看答案，建议先自答再对照。',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: true,
            defaultMode: 'flashcard',
            defaultOpen: [],
            items: [
              {
                title: 'Q1: Vue 3 响应式原理？track/trigger/effect 三件套如何协作？',
                content: '响应式三件套：\n\n- effect(fn)：把 fn 包成响应式副作用，执行前设为 activeEffect，执行期间的属性读取触发 track 收集该 effect。\n- track(target, key)：在依赖 Map（targetMap → keyMap → effectSet）中把 activeEffect 加入 key 对应的集合。\n- trigger(target, key)：从依赖 Map 取出 key 的 effectSet，逐个执行（调度器决定同步/异步）。\n\n协作流程：\n1. effect(fn) 执行 fn，设 activeEffect = 当前 effect。\n2. fn 内读 obj.x → Proxy get 拦截 → track(obj, "x") 把 activeEffect 存入依赖。\n3. 后续 obj.x = newVal → Proxy set 拦截 → trigger(obj, "x") 取出依赖执行 effect。\n\n结论：track 收集、trigger 通知、effect 是被收集的执行单元，三者通过 targetMap 串联。',
              },
              {
                title: 'Q2: 为什么用 WeakMap 作 targetMap 的最外层？',
                content: '原因：\n\n- WeakMap 以对象为键，键对象被 GC 回收时对应条目自动清除。\n- 响应式对象销毁后（如组件卸载），其依赖记录自动消失，避免内存泄漏。\n- 对比 Map：Map 持有键的强引用，对象即使无其它引用也不会被回收，造成依赖记录残留。\n\n结构：\ntargetMap: WeakMap<target, Map<key, Set<effect>>>\n\n结论：WeakMap 是响应式对象生命周期与依赖记录生命周期的天然绑定，Vue 3 相比 Vue 2 的关键改进。',
              },
              {
                title: 'Q3: ref vs reactive 的区别？何时用哪个？',
                content: '区别：\n\n- ref：包装任意值（含基本类型），通过 .value 访问/修改；模板中自动解包。\n- reactive：只包装对象，返回 Proxy 代理，直接访问属性（不需 .value）。\n\n何时用：\n\n- 基本类型（string/number/boolean）：必须 ref。\n- 对象且不需要整体替换：reactive 更自然（state.count）。\n- 对象需整体替换（如 fetch 后重新赋值）：ref（data.value = newObj），reactive 整体替换会丢失响应式。\n- Composable 返回值：推荐 ref（解构安全）或 toRefs(reactive)。\n\n结论：基本类型用 ref，对象看是否需整体替换，Composable 返回优先 ref。',
              },
              {
                title: 'Q4: 为什么解构 reactive 会丢失响应式？怎么解决？',
                content: '原因：\n\n- reactive 返回的是 Proxy 对象，解构（const { count } = state）得到的是原始值的快照，与 Proxy 断开连接，后续 state.count 变化解构出的 count 不更新。\n\n解决：\n\n1. toRefs：把 reactive 的每个属性转成 ref，解构后仍引用原属性。\n   const { count } = toRefs(state) // count 是 ref，保持响应式\n2. toRef：单个属性转 ref。\n3. 不解构，直接用 state.count（但模板/调用方写法稍繁）。\n\nPinia 的 storeToRefs 本质就是 toRefs（跳过 actions/getters）。\n\n结论：reactive 解构必丢响应式，用 toRefs/toRef 桥接。',
              },
              {
                title: 'Q5: computed 的缓存机制？何时重新计算？',
                content: '缓存机制：\n\n- computed 返回一个 lazy effect，首次访问 .value 才执行计算并缓存结果 + 标记 dirty=false。\n- 访问 .value 时若 dirty=false 直接返回缓存；dirty=true 才重算。\n- 内部依赖变化时 trigger 把 dirty 置 true（不立即重算），下次访问才重算（惰性）。\n\n何时重算：\n\n1. 依赖的 ref/reactive 变化（触发 dirty=true）。\n2. 下次访问 .value。\n\n注意：computed 不接受参数（依赖闭包内的响应式源）；需要传参用 methods。\n\n结论：computed 是「依赖变化标记 dirty + 访问时惰性重算」的缓存 effect。',
              },
              {
                title: 'Q6: watch vs watchEffect 区别？',
                content: '区别：\n\n- 依赖声明：\n  - watch 显式指定监听源（ref/getter/数组），精确控制。\n  - watchEffect 自动收集内部读取的响应式依赖。\n- 执行时机：\n  - watch 默认 lazy（依赖变化才触发），可设 immediate: true。\n  - watchEffect 立即执行一次（收集依赖 + 初始运行）。\n- 新旧值：\n  - watch 回调拿到 (newVal, oldVal)。\n  - watchEffect 无旧值（只有副作用）。\n- 场景：\n  - watch：需精确控制依赖、需旧值、需惰性。\n  - watchEffect：无脑追踪副作用、初始化也要执行。\n\n结论：精确+惰性用 watch，自动+立即用 watchEffect。',
              },
              {
                title: 'Q7: Composable 的最佳实践？',
                content: '实践：\n\n1. 命名：use 开头（useFetch、useMouse）。\n2. 仅在 setup/sync 调用：保证生命周期钩子（onMounted）正常注册。\n3. 返回 ref/computed：保持响应式，解构安全。\n4. 显式清理副作用：onUnmounted 或 onScopeDispose 移除监听/定时器。\n5. 参数化：接收 ref 或原始值，提升复用性。\n6. 不直接修改全局状态：通过 Pinia 或参数传入。\n7. 类型完整：泛型 + interface，调用方有 TS 推断。\n8. 可组合：Composable 内可调用其它 Composable。\n\n反例：在异步回调后注册 onMounted（已脱离 setup，钩子失效）。\n\n结论：use 命名 + setup 内调用 + 返回 ref + 清理副作用 + 类型完整。',
              },
              {
                title: 'Q8: effectScope 的作用？何时用？',
                content: '作用：\n\n- effectScope 创建独立作用域，内部注册的 effect/watch/computed 都被该 scope 收集。\n- scope.stop() 一次性停止所有副作用，无需逐个清理。\n\n何时用：\n\n1. Composable 嵌套调用时集中清理（比 onUnmounted 更通用，不依赖组件）。\n2. 全局副作用（非组件内）需统一停止。\n3. 测试中隔离副作用。\n\n对比 onUnmounted：\n- onUnmounted 仅组件级，effectScope 可在任意上下文。\n- onScopeDispose 在 effectScope 内自动注册清理（若有 scope），否则回退到 onUnmounted。\n\n结论：可复用/嵌套 Composable 优先 onScopeDispose + effectScope，组件级用 onUnmounted。',
              },
              {
                title: 'Q9: 自定义指令的钩子有哪些？与组件生命周期关系？',
                content: '钩子：\n\n- created：绑定前，元素属性已设置但未挂载。\n- beforeMount：挂载前。\n- mounted：元素挂载到 DOM（常用，可访问 el）。\n- beforeUpdate：更新前。\n- updated：更新后（常用，读取最新 binding.value）。\n- beforeUnmount：卸载前。\n- unmounted：卸载后（常用，清理监听/观察器）。\n\n与组件关系：指令钩子绑定在宿主组件上，跟随宿主组件生命周期触发。\n\nbinding 对象：value（传参）、oldValue、arg（v-my:foo 的 foo）、modifiers（v-my.foo 的 {foo:true}）。\n\n结论：常用 mounted/updated/unmounted 三件套，对应「初始化/更新/清理」。',
              },
              {
                title: 'Q10: 自定义指令 vs 组件？何时用指令？',
                content: '区别：\n\n- 指令：复用 DOM 行为（focus、lazy、permission、drag），无模板，轻量。\n- 组件：有模板/状态/生命周期，复用 UI + 逻辑。\n\n何时用指令：\n\n1. 纯 DOM 行为（v-focus 自动聚焦、v-lazy 图片懒加载）。\n2. 权限控制（v-permission 按角色隐藏元素）。\n3. 埋点（v-track 自动上报曝光）。\n4. 第三方库桥接（v-tooltip 接 tippy.js）。\n\n何时不该用：\n\n1. 需要模板/插槽 → 用组件。\n2. 复杂状态管理 → 用组件 + Composable。\n3. 需要跨组件通信 → 用组件 props/emit。\n\n结论：纯 DOM 行为复用用指令，UI + 逻辑复用用组件。',
              },
              {
                title: 'Q11: Teleport 的作用？典型场景？',
                content: '作用：\n\n- <Teleport to="body"> 把组件逻辑保持在父组件（props/emit 正常），但 DOM 渲染到指定容器（通常是 body）。\n- 解决父组件 overflow:hidden / transform / z-index 限制导致子组件（如 Modal/Tooltip）被裁剪或层级错乱。\n\n典型场景：\n\n1. Modal/Dialog：渲染到 body，脱离父级 overflow。\n2. Tooltip/Popover：避免父级 transform 影响定位上下文。\n3. Notification：全局通知堆叠在右上角。\n4. 全屏 Loading：覆盖整个视口。\n\n注意：Teleport 不改变组件关系，props/emit/inject 正常工作。\n\n结论：Teleport 解决「逻辑位置与 DOM 位置不一致」问题，是 Modal 类组件的标准方案。',
              },
              {
                title: 'Q12: KeepAlive 的原理？max 如何工作？',
                content: '原理：\n\n- KeepAlive 缓存组件实例（vnode + 状态），切走时不卸载而是缓存，切回时复用。\n- 缓存组件走 onActivated（恢复）/ onDeactivated（进入缓存），不触发 onMounted/onUnmounted。\n\nmax 工作机制：\n\n- 设置 max 后，缓存数超过 max 时用 LRU（最近最少使用）淘汰最久未访问的缓存。\n- 例如 max=3，切到第 4 个组件时，最早缓存的被销毁。\n\n属性：\n\n- include/exclude：字符串/正则/数组，匹配组件 name 决定是否缓存。\n- max：最大缓存数。\n\n场景：Tab 切换暂存状态、列表页返回详情页保持滚动位置。\n\n结论：KeepAlive 用 LRU 缓存组件实例，max 控制上限防内存膨胀。',
              },
              {
                title: 'Q13: Provide/Inject 的原理？如何保持响应式？',
                content: '原理：\n\n- 父组件 provide(key, value) 注入值，后代组件 inject(key) 取值。\n- 跨层传递，无需逐层 props 透传。\n- 默认非响应式：注入的是值快照，父组件修改后代不更新。\n\n保持响应式：\n\n1. provide ref/reactive：注入的是 ref 对象，后代读 .value 保持响应。\n   provide("user", ref(user)) → inject("user").value\n2. provide readonly(ref)：只读响应式，防止后代误改。\n3. provide 函数让后代通知父组件修改（单向数据流）。\n\n场景：主题、用户、i18n、表单组件 + 子字段。\n\n结论：provide 响应式引用（ref/reactive）+ readonly 保护，inject 解构保持响应。',
              },
              {
                title: 'Q14: Pinia setup store vs options store？',
                content: '区别：\n\n- options store：\n  defineStore("id", { state, getters, actions })\n  - state: () => ({})，getters: {}，actions: {}\n  - 类似 Vuex 写法，this 访问 state/getters。\n- setup store：\n  defineStore("id", () => { const x = ref(); const y = computed(); function z(){}; return {x,y,z} })\n  - 用 Composition API，更灵活，可调用其它 Composable。\n  - state 用 ref，getters 用 computed，actions 用普通函数。\n\n选型：\n\n- 简单 store、习惯 Vuex：options store。\n- 复杂逻辑、需组合 Composable：setup store。\n\n两者都支持 storeToRefs、devtools、HMR。\n\n结论：新项目推荐 setup store（与 Composition API 一致），旧项目可 options store。',
              },
              {
                title: 'Q15: storeToRefs 的作用？为什么不能直接解构 store？',
                content: '作用：\n\n- storeToRefs(store) 返回只含 state + getters 的 ref 对象，解构后保持响应式。\n- 跳过 actions（函数解构无意义）。\n\n为什么不能直接解构：\n\n- Pinia store 是 reactive 对象，直接解构（const { count } = store）得到的是值快照，丢失响应式。\n- storeToRefs 内部用 toRefs 转换 state/getters，解构后是 ref。\n\n用法：\nconst { count, double } = storeToRefs(store) // 响应式\nconst { increment } = store // actions 直接解构（函数无需响应式）\n\n结论：state/getters 用 storeToRefs 解构，actions 直接解构。',
              },
              {
                title: 'Q16: Nuxt 3 的渲染策略有哪些？routeRules 如何配置？',
                content: '渲染策略：\n\n- SSR（ssr: true）：请求时服务端渲染，动态内容。\n- SSG（prerender: true）：构建时预渲染为静态 HTML，CDN 直发。\n- ISR（swr: 秒数）：stale-while-revalidate，CDN 返回缓存 + 后台定期重新生成。\n- SPA（ssr: false）：纯客户端渲染，无需 SEO 的页面。\n- CSR/Hybrid：混合，按路由选择策略。\n\nrouteRules 配置：\n\nrouteRules: {\n  "/": { prerender: true }, // 首页 SSG\n  "/blog/**": { swr: 3600 }, // 博客 ISR\n  "/admin/**": { ssr: false }, // 后台 SPA\n  "/api/**": { cors: true }, // API 跨域\n}\n\n支持通配符，按路径声明渲染策略，是 Nuxt 3 混合渲染的核心。\n\n结论：SSR/SSG/ISR/SPA 四策略 + routeRules 按路径声明，Nuxt 3 灵活混合。',
              },
              {
                title: 'Q17: useFetch vs useAsyncData 的区别？',
                content: '区别：\n\n- useAsyncData(key, handler)：通用异步数据获取，handler 返回任意数据，需手动用 $fetch。\n- useFetch(url)：useAsyncData 的封装，自动用 $fetch 请求 url，默认 key 为 url。\n\nuseFetch 简化：\nconst { data } = await useFetch("/api/users")\n等价于 useAsyncData("/api/users", () => $fetch("/api/users"))\n\n何时用 useAsyncData：\n\n1. 需要 $fetch 之外的逻辑（如多个请求聚合）。\n2. 自定义 key 避免冲突。\n3. 数据转换在 handler 内完成。\n\n两者都支持 SSR 一次执行 + payload 复用 + refresh/options。\n\n结论：简单请求用 useFetch，复杂逻辑/聚合用 useAsyncData。',
              },
              {
                title: 'Q18: Nuxt 3 的请求生命周期？',
                content: '生命周期（服务端 + 客户端）：\n\n1. setup（插件）：nuxt.config 加载 → plugins 执行（SSR + 客户端各一次）。\n2. app:create：创建 Vue app 实例。\n3. router 中间件（routeMiddleware）：路由切换前，可重定向/鉴权。\n4. page setup：页面组件 setup 执行，useFetch/useAsyncData 触发（SSR 时服务端执行）。\n5. SSR 渲染：服务端渲染 HTML + 序列化 payload。\n6. 客户端 hydration：客户端接收 HTML + payload，复用 payload 不重复请求。\n7. mounted：客户端挂载，可访问 DOM。\n\n注意：\n- useFetch 在 SSR 时服务端执行，结果进 payload，客户端 hydration 复用（不重复请求）。\n- 插件分 .server.ts / .client.ts 控制执行环境。\n\n结论：插件 → 中间件 → setup → SSR 渲染 → hydration → mounted，payload 是 SSR 与客户端的数据桥梁。',
              },
              {
                title: 'Q19: PatchFlag 是什么？有哪些类型？',
                content: 'PatchFlag：\n\n- Vue 3 编译器为每个 vnode 标记的更新类型，diff 时按 flag 只比对变化的部分，跳过未变。\n- 编译时静态分析模板，生成 PatchFlag 常量。\n\n类型：\n\n- TEXT (1)：动态文本节点，只比对 textContent。\n- CLASS (2)：动态 class，只比对 class。\n- STYLE (4)：动态 style。\n- PROPS (8)：动态 props（含具体 prop 名）。\n- FULL_PROPS (16)：props 整体变化（v-bind="obj"），全比对。\n- HYDRATE_EVENTS (32)：事件监听需 hydrate。\n- STABLE_FRAGMENT (64)：子节点顺序稳定。\n- KEYED_FRAGMENT (128)：带 key 的子节点。\n- UNKEYED_FRAGMENT (256)：无 key 的子节点。\n- HOISTED (-1/-2)：静态节点，跳过 diff。\n\n结论：PatchFlag 让 diff 只关注变化部分，是 Vue 3 编译优化的核心。',
              },
              {
                title: 'Q20: 静态提升（hoistStatic）是什么？',
                content: '静态提升：\n\n- Vue 3 编译器把模板中的静态节点（无动态绑定）提升到 render 函数外，只创建一次，后续渲染复用引用。\n- 避免每次渲染重新创建 vnode，减少 GC 压力。\n\n示例：\n<div><h1>标题</h1><p>{{msg}}</p></div>\n- <h1>标题</h1> 是静态，提升到 render 外：const _hoisted_1 = createVNode("h1", null, "标题")\n- render 内直接引用 _hoisted_1，不重新创建。\n\n配合 PatchFlag：\n- 静态节点提升 + PatchFlag 标记动态节点 → diff 时跳过静态、只比对动态。\n\n结论：静态提升把静态节点创建移出 render，复用 vnode 引用，减少渲染开销。',
              },
              {
                title: 'Q21: Block Tree 是什么？为什么需要？',
                content: 'Block Tree：\n\n- Vue 3 把模板编译为 Block 树，每个 Block 收集内部所有动态子节点（dynamicChildren），diff 时只遍历动态子节点，不遍历静态节点。\n- 对比 Vue 2 的全量 diff：遍历所有子节点逐个比较。\n\n为什么需要：\n\n- 模板中静态节点占比通常很高（>90%），全量 diff 浪费在静态节点上。\n- Block Tree 让 diff 只走动态节点，性能从 O(n) 降到 O(m)（m 为动态节点数）。\n\n结构：\n- 根节点是 Block，收集所有后代动态节点（扁平化）。\n- v-if/v-for 内部是子 Block（nested Block）。\n\n结论：Block Tree + PatchFlag + 静态提升 = Vue 3 编译时优化三件套，diff 性能远超 Vue 2。',
              },
              {
                title: 'Q22: 场景题——Composable 内异步请求竞态如何处理？',
                content: '问题：\n\n- 用户快速切换路由/输入，触发多次 fetch，后发先至的请求覆盖先到的结果（旧响应覆盖新响应）。\n\n方案：\n\n1. AbortController 取消旧请求：\n   let controller\n   watch(url, () => {\n     controller?.abort()\n     controller = new AbortController()\n     fetch(url, { signal: controller.signal })\n   })\n   组件卸载时 abort 防内存泄漏。\n2. 请求序号 + 忽略过期响应：\n   let reqId = 0\n   const current = ++reqId\n   const res = await fetch(url)\n   if (current !== reqId) return // 忽略过期响应\n3. 防抖/节流减少请求频率。\n\n推荐：AbortController（真正取消网络请求、节省带宽）。\n\n结论：竞态用 AbortController 取消旧请求 + 序号兜底，组件卸载必 abort。',
              },
              {
                title: 'Q23: 场景题——KeepAlive 缓存的表单页返回后状态错乱？',
                content: '问题：\n\n- KeepAlive 缓存表单页，切换路由返回后表单残留旧数据，但用户期望新数据。\n\n方案：\n\n1. onActivated 重置/重新获取数据：\n   onActivated(() => { resetForm(); fetchData() })\n   利用 KeepAlive 的 activated 钩子，切回时刷新。\n2. exclude 排除表单页：\n   <KeepAlive :exclude="["FormPage"]">，不缓存表单页。\n3. include 只缓存需要的页面（如列表页保滚动位置）。\n4. 路由 meta 标记：meta.keepAlive = false 控制。\n\n选型：\n- 需保留状态（如多步表单）：用 onActivated 局部刷新。\n- 不需保留：exclude 排除。\n\n结论：KeepAlive 缓存用 onActivated 控制切回行为，或 exclude 排除不需缓存的页面。',
              },
              {
                title: 'Q24: 场景题——Nuxt SSR 时 window/document 未定义报错？',
                content: '问题：\n\n- 三方库（如 swiper、jquery）在模块顶层访问 window，SSR 时 window 未定义报错。\n\n方案：\n\n1. 客户端插件：把库初始化放 plugins/xxx.client.ts，只在客户端执行。\n2. 动态导入 + onMounted：\n   onMounted(async () => {\n     const Swiper = (await import("swiper")).default\n     new Swiper(...)\n   })\n   onMounted 后客户端 + DOM 就绪。\n3. process.client 判断：\n   if (process.client) { /* window 操作 */ }\n4. ClientOnly 组件：<ClientOnly><SwiperComponent /></ClientOnly>，SSR 时跳过。\n\n推荐：ClientOnly + 动态导入（SSR 安全 + 减小 bundle）。\n\n结论：SSR 访问浏览器 API 用 ClientOnly / 动态导入 / process.client 守卫。',
              },
              {
                title: 'Q25: 场景题——大型 Vue 应用首屏慢，如何优化？',
                content: '优化方向：\n\n1. 路由懒加载：component: () => import()，按需加载减小首屏 bundle。\n2. 代码分割：Vite/Webpack 自动分割 + 手动 import() 分割大模块。\n3. SSR/SSG：用 Nuxt 服务端渲染/静态生成，首屏直出 HTML。\n4. 预取/预加载：router prefetch、<link rel="preload">。\n5. Tree-shaking：按需引入 UI 库（Element Plus 按需）、lodash-es。\n6. 压缩：gzip/brotli、图片压缩/webp。\n7. 缓存：HTTP 强缓存/协商缓存、Service Worker。\n8. KeepAlive：Tab 切换缓存，避免重复渲染。\n9. 虚拟滚动：长列表用 vue-virtual-scroller。\n10. shallowRef/markRaw：大对象不需深层响应式。\n\n结论：懒加载 + 代码分割 + 压缩是基础，SSR/SSG（Nuxt）是终极方案。',
              },
              {
                title: 'Q26: 场景题——Pinia 状态持久化（刷新不丢失）？',
                content: '方案：\n\n1. pinia-plugin-persistedstate 插件：\n   defineStore("user", { persist: true, state: () => ({...}) })\n   自动同步到 localStorage，刷新恢复。\n2. 手动持久化：\n   watch(() => store.$state, (val) => localStorage.setItem("user", JSON.stringify(val)), { deep: true })\n   初始化时 localStorage.getItem 恢复。\n3. 按需持久化：persist: { paths: ["token"] } 只持久化部分字段。\n4. 安全存储：敏感数据（token）用 sessionStorage / cookie httpOnly，非敏感用 localStorage。\n\n注意：\n- 持久化的数据需考虑版本兼容（schema 变更）。\n- 大对象持久化影响性能，只存必要字段。\n\n结论：用 pinia-plugin-persistedstate 插件 + paths 按需持久化，敏感数据单独处理。',
              },
              {
                title: 'Q27: 场景题——Vue 3 项目升级 Vue 2 的迁移要点？',
                content: '迁移要点：\n\n1. 响应式：\n   - Vue.set / this.$set → 直接赋值（Proxy 支持）。\n   - data 返回对象 → Composition API ref/reactive。\n2. 生命周期：\n   - beforeDestroy/destroyed → beforeUnmount/unmounted。\n   - Options 钩子 → onXxx 函数。\n3. 模板：\n   - v-model 默认 prop 从 value 改为 modelValue（多 v-model 支持）。\n   - .sync 移除，用 v-model:propName。\n   - filter 移除，用 computed/methods。\n4. 全局 API：\n   - new Vue() → createApp()。\n   - Vue.use / Vue.mixin → app.use / app.mixin（仅当前 app）。\n5. 路由/状态：\n   - Vue Router 3 → 4（createRouter/createWebHistory）。\n   - Vuex → Pinia（推荐）。\n6. 依赖：\n   - UI 库需 Vue 3 版本（Element Plus、Ant Design Vue 3）。\n   - 三方插件检查 Vue 3 兼容。\n\n结论：响应式 + 生命周期 + 模板 + 全局 API + 生态（Router/Pinia/UI）全面升级。',
              },
              {
                title: 'Q28: 场景题——i18n 在 Nuxt SSR 中如何避免闪烁？',
                content: '问题：\n\n- SSR 渲染时 locale 已定，但客户端 hydration 前可能闪现默认语言。\n\n方案：\n\n1. SSR 时确定 locale：\n   - 用 route 前缀（/en/、/zh/）或 cookie 检测 Accept-Language。\n   - 在插件/i18n 配置中设置初始 locale。\n2. payload 注入：\n   - SSR 把 locale 序列化进 payload，hydration 复用。\n3. @nuxtjs/i18n 模块：\n   - 自动处理 SSR + hydration 一致性。\n   - 配置 detectBrowserLanguage + seo 优化。\n4. 避免动态切换闪烁：\n   - 切换 locale 用 await loadLocaleMessages 预加载。\n   - 用 Suspense 或 loading 占位。\n\n推荐：@nuxtjs/i18n 模块（SSR/SEO/payload 全处理）。\n\n结论：SSR 时确定 locale + payload 注入 + @nuxtjs/i18n 模块，避免 hydration 闪烁。',
              },
              {
                title: 'Q29: 对比题——Vue 3 vs Vue 2 的核心改进？',
                content: '改进：\n\n1. 响应式：\n   - Vue 2：Object.defineProperty（劫持已存在属性，新增/删除需 Vue.set）。\n   - Vue 3：Proxy（拦截全部操作，新增/删除自动响应）。\n2. API：\n   - Vue 2：Options API（data/methods/computed）。\n   - Vue 3：Composition API（setup + ref/reactive）+ Options API 兼容。\n3. 编译：\n   - Vue 2：运行时全量 diff。\n   - Vue 3：编译时 PatchFlag + 静态提升 + Block Tree，diff 只走动态节点。\n4. 体积：\n   - Vue 3 Tree-shaking 更好（按需引入 API）。\n5. TS：\n   - Vue 3 原生 TS 支持（defineComponent + 类型推断）。\n6. 新特性：\n   - Teleport、Suspense、Fragment、多 v-model。\n   - Pinia 取代 Vuex。\n\n结论：Vue 3 在响应式（Proxy）+ API（Composition）+ 编译优化 + TS + 体积全面升级。',
              },
              {
                title: 'Q30: 对比题——SSR vs SSG vs ISR vs SPA？',
                content: '对比：\n\n- SSR（服务端渲染）：\n  - 请求时服务端渲染 HTML，客户端 hydration。\n  - 优点：SEO 好、首屏快、动态内容。\n  - 缺点：每次请求服务端开销、服务器负载高。\n- SSG（静态生成）：\n  - 构建时生成静态 HTML，CDN 直发。\n  - 优点：最快、CDN 缓存、服务器零负载。\n  - 缺点：内容构建后固定，更新需重新构建。\n- ISR（增量静态再生）：\n  - SSG + 定期重新验证（swr: 秒数）。\n  - 优点：CDN 缓存 + 后台定期更新。\n  - 缺点：首次请求后才有缓存，有短暂过期数据。\n- SPA（单页应用）：\n  - 纯客户端渲染，JS bundle 加载后渲染。\n  - 优点：部署简单、交互流畅。\n  - 缺点：SEO 差、首屏白屏久。\n\n选型：\n- 内容站（博客/文档）：SSG + ISR。\n- 动态应用（后台/工具）：SPA 或 SSR。\n- 电商/社交：SSR（SEO + 动态）。\n\n结论：Nuxt 3 用 routeRules 混合四策略，按页面特性选择。',
              },
              {
                title: 'Q31: 对比题——Pinia vs Vuex？',
                content: '区别：\n\n- mutations：Vuex 必须通过 mutations 改 state（同步）；Pinia 直接在 actions 改（同步/异步）。\n- modules：Vuex 嵌套 modules（命名空间复杂）；Pinia 扁平独立 store（按需 import）。\n- TS：Vuex 类型推断弱（需 ModuleTree 泛型）；Pinia 完整推断。\n- 体积：Pinia 约 1KB，Vuex 较大。\n- Composition：Pinia 与 setup 自然融合；Vuex 需 mapState/mapActions。\n- devtools：两者都支持，Pinia 集成更好。\n\n迁移：Vuex store 可逐步迁移到 Pinia，新项目直接 Pinia。\n\n结论：Pinia 是 Vuex 的简化升级版，Vue 3 官方推荐。',
              },
              {
                title: 'Q32: 对比题——Options API vs Composition API？',
                content: '组织方式：\n\n- Options：按选项分散（data/methods/computed/mounted），逻辑跨选项跳跃。\n- Composition：按功能聚合（一个功能的状态+方法+生命周期在一起），逻辑内聚。\n\n复用：\n\n- Options：mixins（命名冲突、来源不清、无类型）。\n- Composition：composable 函数（显式 import、类型安全、可测试）。\n\n类型：\n\n- Options：TS 推断弱（需 vue-class-component 或 defineComponent）。\n- Composition：TS 推断自然（顶层变量）。\n\n学习曲线：\n\n- Options：简单直观（新手友好）。\n- Composition：需理解响应式/ref/reactive（稍陡）。\n\n结论：新项目/大型项目用 Composition，简单 demo/旧项目可 Options。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 17：Vue 进阶小测验
    // ========================================================================
    {
      order: 17,
      title: 'Vue 进阶小测验',
      difficulty: 2,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: '通过 20 道精选测验题检验对 Vue 进阶与 Nuxt 全栈核心概念的掌握程度，含响应式原理、Composable、指令、Nuxt、性能优化。题干前缀标注【记忆】【理解】【应用】【对比】【场景】【综合】梯度，选项可点击查看解析。',
        },
        {
          id: 'p17-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '【理解】Vue 3 响应式依赖收集的数据结构中，最外层用 WeakMap 的主要原因是？',
                options: [
                  'WeakMap 查询比 Map 更快',
                  '响应式对象被回收时依赖记录自动被 GC，避免内存泄漏',
                  'WeakMap 支持任意类型键',
                  'WeakMap 是线程安全的',
                ],
                correctIndex: 1,
                explanation: 'WeakMap 以对象为键，键对象被回收时对应条目自动清除，避免响应式对象销毁后依赖记录残留。这是 Vue 3 相比 Vue 2 的关键改进。',
              },
              {
                question: '【理解】关于 activeEffect，下列说法正确的是？',
                options: [
                  'activeEffect 是一个永久存在的全局 effect',
                  'track() 时把 activeEffect 收集进依赖；effect 执行前后设置/清除它',
                  'activeEffect 只在 computed 中存在',
                  'trigger() 时设置 activeEffect',
                ],
                correctIndex: 1,
                explanation: 'effect 执行前将自身设为 activeEffect，执行期间的属性读取在 track() 中把它加入依赖集合，执行后清除。trigger() 取出集合执行。',
              },
              {
                question: '【对比】相比 Mixins，Composable 函数的核心优势是？',
                options: [
                  '运行时性能更高',
                  '可以定义模板',
                  '显式传参、命名无冲突、TypeScript 推断更强',
                  '只能在 setup 中使用',
                ],
                correctIndex: 2,
                explanation: 'Composable 通过函数参数和返回值显式声明依赖，避免 Mixins 的命名冲突与来源不清，且原生支持 TS 泛型推断。',
              },
              {
                question: '【应用】自定义指令 v-lazy 用 IntersectionObserver 实现懒加载，unmounted 钩子的作用是？',
                options: [
                  '重新观察元素',
                  '断开观察器（disconnect）防止内存泄漏',
                  '加载图片',
                  '设置 el.src',
                ],
                correctIndex: 1,
                explanation: 'unmounted 时组件已销毁，需 disconnect 观察器并释放引用，否则观察器持有已移除 DOM 的引用造成内存泄漏。',
              },
              {
                question: '【应用】Nuxt 3 中，要让 /blog/** 路由每小时重新验证一次，routeRules 应配置为？',
                options: [
                  "{ '/blog/**': { prerender: true } }",
                  "{ '/blog/**': { ssr: true } }",
                  "{ '/blog/**': { swr: 3600 } }",
                  "{ '/blog/**': { ssr: false } }",
                ],
                correctIndex: 2,
                explanation: 'swr: 3600 表示 stale-while-revalidate，CDN 返回缓存 HTML，后台每 3600 秒重新验证生成新版本，兼顾性能与新鲜度。',
              },
              {
                question: '【理解】useFetch 在 Nuxt SSR 期间的执行特点是？',
                options: [
                  '服务端和客户端各执行一次',
                  '仅服务端执行，结果随 payload 返回，客户端 hydration 复用',
                  '仅客户端执行',
                  '每次路由变化都重新请求',
                ],
                correctIndex: 1,
                explanation: 'SSR 阶段服务端执行一次，数据序列化进 payload；客户端 hydration 直接复用 payload，不重复请求，避免二次开销。',
              },
              {
                question: '【记忆】Vue 3 编译器对 v-bind="obj" 生成的 PatchFlag 通常是？',
                options: [
                  'TEXT (1)',
                  'CLASS (2)',
                  'FULL_PROPS (16)',
                  'HOISTED (-2)',
                ],
                correctIndex: 2,
                explanation: 'v-bind="obj" 整体绑定 props，编译器无法确定具体哪些 prop 变化，标记 FULL_PROPS(16)，diff 时比对全部 props。',
              },
              {
                question: '【对比】shallowRef 相比 ref 的区别是？',
                options: [
                  'shallowRef 没有 .value',
                  'shallowRef 只对 .value 浅响应，内部修改需 triggerRef',
                  'shallowRef 不支持响应式',
                  'shallowRef 性能更差',
                ],
                correctIndex: 1,
                explanation: 'shallowRef 仅追踪 .value 的替换，不对内部属性深度代理；修改内部属性需手动 triggerRef 强制触发更新，常用于大对象优化。',
              },
              {
                question: '【记忆】<KeepAlive> 缓存的组件被切回时，触发的生命周期是？',
                options: [
                  'onMounted',
                  'onActivated',
                  'onBeforeMount',
                  'onUnmounted',
                ],
                correctIndex: 1,
                explanation: 'KeepAlive 缓存的组件切换时触发 onActivated（恢复）和 onDeactivated（进入缓存），不会重复触发 onMounted/onUnmounted。',
              },
              {
                question: '【场景】下列场景最适合用 Provide/Inject 而非 Props 的是？',
                options: [
                  '父组件向直接子组件传配置',
                  '根组件向 5 层以下的叶子组件注入当前登录用户',
                  '子组件向父组件发事件',
                  '兄弟组件之间共享状态',
                ],
                correctIndex: 1,
                explanation: '深层嵌套（5 层）用 Props 需逐层透传（prop drilling），Provide/Inject 可跨层直接注入，适合用户、主题、i18n 等全局上下文。',
              },
              {
                question: '【记忆】Vue 3 中 effectScope 的作用是？',
                options: [
                  '替代 computed 缓存计算结果',
                  '收集并统一停止其内部的 effect/watch/computed，便于批量清理',
                  '限制 effect 只能在指定组件内执行',
                  '创建一个新的响应式根对象',
                ],
                correctIndex: 1,
                explanation: 'effectScope 创建独立作用域，内部注册的 effect/watch 都可被 scope.stop() 一次性停止，常用于 Composable 中集中清理副作用，避免逐个 onScopeDispose。',
              },
              {
                question: '【记忆】自定义指令的钩子执行顺序，正确的是？',
                options: [
                  'created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted',
                  'mounted → updated → unmounted',
                  'beforeMount → mounted → unmounted',
                  'created → mounted → beforeUnmount',
                ],
                correctIndex: 0,
                explanation: 'Vue 3 指令完整钩子链：created（绑定前）→ beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted。常用 mounted/updated/unmounted 三件套。',
              },
              {
                question: '【理解】Composable 中用 toRefs 包装 reactive 返回的原因是？',
                options: [
                  '提升运行时性能',
                  '让解构后的属性仍保持响应式（保持与原 reactive 的连接）',
                  '把对象转成 ref 数组',
                  '避免 TypeScript 类型推断',
                ],
                correctIndex: 1,
                explanation: '直接解构 reactive 会丢失响应式；toRefs 把每个属性转成 ref，解构后仍引用原对象属性，保持响应式连接，调用方使用更自然。',
              },
              {
                question: '【理解】Nuxt 3 中 plugins/ 目录下的插件，默认执行时机是？',
                options: [
                  '仅在客户端 hydration 后执行',
                  '仅在服务端 SSR 时执行',
                  '服务端和客户端都执行一次（SSR 时服务端，hydration 时客户端）',
                  '每次路由切换都重新执行',
                ],
                correctIndex: 2,
                explanation: 'Nuxt 插件默认 SSR 与客户端各执行一次；若只需客户端执行，需命名 xxx.client.ts。插件常用于注册 $fetch 拦截、注入 provide 等。',
              },
              {
                question: '【对比】SSR vs SSG 的关键区别是？',
                options: [
                  'SSR 请求时服务端渲染，SSG 构建时预渲染为静态 HTML',
                  'SSR 比 SSG 更快',
                  'SSG 必须用数据库',
                  'SSR 不支持 SEO',
                ],
                correctIndex: 0,
                explanation: 'SSR 每次请求服务端实时渲染（动态、有运行时开销）；SSG 构建时生成静态 HTML（CDN 直发、最快，但内容构建后固定）。Nuxt 用 routeRules 混用两者。',
              },
              {
                question: '【对比】watch vs watchEffect 的核心区别是？',
                options: [
                  'watch 不能监听多个源',
                  'watch 显式声明依赖且默认惰性（不立即执行）；watchEffect 自动追踪依赖且立即执行',
                  'watch 性能更差',
                  'watchEffect 支持 async',
                ],
                correctIndex: 1,
                explanation: 'watch 需显式指定监听源，默认 lazy（依赖变化才触发），可拿到新旧值；watchEffect 自动收集内部响应式依赖，立即执行一次，适合无脑追踪副作用。',
              },
              {
                question: '【应用】要实现「组件首次加载 + url 变化时都请求数据」，应使用？',
                options: [
                  'onMounted 单独调用 fetch',
                  'watch(url, fetch)（不立即执行）',
                  'watch(url, fetch, { immediate: true })',
                  'watchEffect 不带 immediate',
                ],
                correctIndex: 2,
                explanation: 'immediate: true 让 watch 在首次注册时立即执行一次回调，之后 url 变化再触发，正好覆盖「首次 + 后续依赖变化」场景，比 onMounted + watch 分写更简洁。',
              },
              {
                question: '【应用】Pinia store 中定义异步 action 修改 state，正确写法是？',
                options: [
                  '必须用 mutations 包裹',
                  '在 actions 中直接 async 函数，用 this.state.x = y 修改',
                  '只能通过 getters 修改',
                  '异步逻辑必须放在组件中',
                ],
                correctIndex: 1,
                explanation: 'Pinia 取消 mutations，actions 可直接是 async 函数，内部用 this.x = y 修改 state（setup store 用 ref.value）。这是 Pinia 相比 Vuex 的简化点。',
              },
              {
                question: '【场景】首屏 LCP 指标差，下列 Vue 侧优化最有效的是？',
                options: [
                  '把所有组件改为 Options API',
                  '路由懒加载 + 关键路由预取 + 减少首屏组件体积',
                  '增加更多 computed',
                  '用 v-for 替代 v-if',
                ],
                correctIndex: 1,
                explanation: 'LCP 差多为 JS bundle 过大导致 hydration 慢；路由懒加载（() => import）按需加载、关键路由 prefetch、Tree-shaking 减体积是 Vue 侧最有效手段，终极方案是 Nuxt SSR/SSG。',
              },
              {
                question: '【综合】一个 Nuxt 3 博客站点：首页高频访问、文章页需定期更新、后台需登录且纯客户端。routeRules 最佳配置是？',
                options: [
                  "全站 ssr: true",
                  "首页 prerender、文章页 swr、后台 ssr:false",
                  "全站 ssr: false",
                  "全站 prerender: true",
                ],
                correctIndex: 1,
                explanation: '首页 prerender（SSG，CDN 直发最快）；文章页 swr: 3600（ISR，定期重新生成，兼顾新鲜度与性能）；后台 ssr: false（SPA，纯客户端无需 SEO）。混合渲染正是 Nuxt 3 的核心优势。',
              },
            ],
          },
        },
      ],
    },
  ],
}
