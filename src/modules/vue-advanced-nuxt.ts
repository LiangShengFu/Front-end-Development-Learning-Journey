/**
 * 模块 12：Vue 进阶与 Nuxt 全栈
 *
 * 严格遵循 docx/模块十二.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 15 个知识点（7 章节 + 测验，按演示粒度拆分）
 * - 15 个可视化演示（4 个新增 Vue 进阶专属组件 + 4 个复用模块十一组件 + 7 个复用通用组件）
 *
 * 新增专属组件（位于 components/interactive/vue-advanced/）：
 * - NuxtHybridRenderStudio：SSR/SSG/ISR/SPA 四种渲染策略交互对比
 * - ComposableFlowVisualizer：多 Composable 协同流向可视化
 * - CustomDirectiveWorkbench：自定义指令实时效果实践台
 * - KeepAliveCacheSimulator：KeepAlive LRU 缓存策略模拟器
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
  knowledgePointCount: 15,
  visualizationCount: 15,
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
          id: 'va-p1-1',
          type: 'paragraph',
          lead: true,
          text: '模块十二在模块十一（Vue 核心基础）之上，深入响应式原理源码、Composition API 组合模式、自定义指令系统、Nuxt 3 全栈渲染与性能优化演进，形成从「会用」到「精通」的进阶闭环。',
        },
        {
          id: 'va-p1-2',
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
          id: 'va-p1-3',
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
          id: 'va-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 响应式由 reactive() 创建 Proxy，读取属性时 track() 收集当前 activeEffect 到 WeakMap<target, Map<key, Set<effect>>>，写入属性时 trigger() 取出对应 effect 重新执行。effect 是调度的基本单元，computed/ref 底层均基于它构建。',
        },
        {
          id: 'va-p2-2',
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
          id: 'va-p2-3',
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
          id: 'va-p2-4',
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
          id: 'va-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 2 时代的逻辑复用主要靠 Mixins（Options API），存在命名冲突、数据来源不清、类型推断弱等问题。Vue 3 的 Composable 函数（Composition API）通过显式传参和返回响应式引用，解决了上述全部痛点。',
        },
        {
          id: 'va-p3-2',
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
          id: 'va-p3-3',
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
          id: 'va-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Composable 的真正威力在于「组合」：一个 Composable 可以调用并依赖另一个 Composable 的输出，形成显式的依赖链。这种模式让复杂业务逻辑（如认证、权限、路由守卫）被拆解为可测试、可复用的小单元。',
        },
        {
          id: 'va-p4-2',
          type: 'demo',
          visualizationType: 'composable-flow-visualizer',
          data: {
            title: 'Composable 协同流向',
          },
        },
        {
          id: 'va-p4-3',
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
          id: 'va-p5-1',
          type: 'paragraph',
          lead: true,
          text: '自定义指令用于封装「需要直接操作 DOM 的可复用行为」。指令对象包含一组生命周期钩子：mounted（绑定）、updated（依赖更新）、unmounted（解绑），通过 binding.value 接收传参。',
        },
        {
          id: 'va-p5-2',
          type: 'demo',
          visualizationType: 'custom-directive-workbench',
          data: {
            title: '自定义指令实时实践台',
          },
        },
        {
          id: 'va-p5-3',
          type: 'list',
          items: [
            'v-focus：mounted 钩子调用 el.focus()，常用于表单首项自动聚焦',
            'v-debounce：mounted 绑定防抖事件监听，updated 更新回调引用',
            'v-permission：mounted 校验角色移除节点，updated 切换 display',
            'v-lazy：mounted 创建 IntersectionObserver，unmounted disconnect 防泄漏',
          ],
        },
        {
          id: 'va-p5-4',
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
          id: 'va-p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Nuxt 3 基于 Nitro 引擎支持「混合渲染」——可在同一个应用中按路由配置不同的渲染策略：SSR（请求时服务端渲染）、SSG（构建时预渲染）、ISR（SWR 定时重新验证）、SPA（纯客户端渲染）。通过 nuxt.config.ts 的 routeRules 按路径声明。',
        },
        {
          id: 'va-p6-2',
          type: 'demo',
          visualizationType: 'nuxt-hybrid-render-studio',
          data: {
            title: 'Nuxt 混合渲染沙盒',
          },
        },
        {
          id: 'va-p6-3',
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
          id: 'va-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'Pinia 支持两种定义 Store 的语法：Option Store（对象式，类似 Vue 2 习惯）与 Composition Store（setup 函数式，更灵活、TypeScript 推断更好）。两者运行时等价，选择主要看团队风格与复杂度。',
        },
        {
          id: 'va-p7-2',
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
          id: 'va-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Nuxt 3 的服务端请求经过一条清晰的管线：请求到达 Nitro → 执行路由中间件（middleware）→ 渲染 Layout → 渲染 Page（期间 useFetch/useAsyncData 触发 Server API 调用）→ 拼装 HTML 响应返回。理解这条链路是排查 SSR 数据时序问题的关键。',
        },
        {
          id: 'va-p8-2',
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
          id: 'va-p8-3',
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
          id: 'va-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 提供从编译期到运行时的多层优化手段。不同手段作用于不同瓶颈——静态内容用 v-once、列表用 v-memo、大对象用 shallowRef、组件懒加载用 defineAsyncComponent + Suspense、长列表用虚拟滚动。选错手段往往收益甚微。',
        },
        {
          id: 'va-p9-2',
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
          id: 'va-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 编译器在编译期分析模板，为动态节点打上 PatchFlag（如 TEXT=1、CLASS=2、PROPS=8），运行时 diff 只比对标记的部分；纯静态节点被提升（hoist）到渲染函数外，每次渲染复用同一引用，跳过 diff。这是 Vue 3 相比 Vue 2 性能跃升的核心。',
        },
        {
          id: 'va-p10-2',
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
          id: 'va-p10-3',
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
          id: 'va-p11-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 的性能优化手段随版本演进不断细化：从最基础的 v-once，到 computed 缓存、异步组件、Suspense、v-memo、shallowRef，再到虚拟滚动。理解演进脉络有助于在不同场景选择合适层级的优化。',
        },
        {
          id: 'va-p11-2',
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
          id: 'va-p12-1',
          type: 'paragraph',
          lead: true,
          text: '<KeepAlive> 缓存非活动组件实例，避免重复挂载/卸载的开销，常用于 Tab 切换、表单暂存。通过 include/exclude 控制缓存范围，max 限制最大缓存数并按 LRU（最近最少使用）淘汰。被缓存组件触发 onActivated/onDeactivated 而非 onMounted/onUnmounted。',
        },
        {
          id: 'va-p12-2',
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
          id: 'va-p12-3',
          type: 'demo',
          visualizationType: 'keepalive-cache-simulator',
          data: {
            title: 'KeepAlive LRU 缓存模拟器',
          },
        },
        {
          id: 'va-p12-4',
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
          id: 'va-p13-1',
          type: 'paragraph',
          lead: true,
          text: 'Props/Emits 是父子直接通信的标准方式，链路清晰但层级深时需逐层透传（prop drilling）。Provide/Inject 允许祖先跨层级向后代注入数据，适合主题、用户、国际化等全局上下文，但牺牲了显式的依赖链路。',
        },
        {
          id: 'va-p13-2',
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
          id: 'va-p13-3',
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
          id: 'va-p14-1',
          type: 'paragraph',
          lead: true,
          text: '下表汇总 Vue 进阶核心 API 与要点，方便快速回顾。',
        },
        {
          id: 'va-p14-2',
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
    // 知识点 15：Vue 进阶小测验
    // ========================================================================
    {
      order: 15,
      title: 'Vue 进阶小测验',
      difficulty: 2,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'va-p15-1',
          type: 'paragraph',
          lead: true,
          text: '10 题覆盖模块十二全部进阶知识点，含响应式原理、Composable、指令、Nuxt、性能优化。选项可点击查看解析。',
        },
        {
          id: 'va-p15-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'Vue 3 响应式依赖收集的数据结构中，最外层用 WeakMap 的主要原因是？',
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
                question: '关于 activeEffect，下列说法正确的是？',
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
                question: '相比 Mixins，Composable 函数的核心优势是？',
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
                question: '自定义指令 v-lazy 用 IntersectionObserver 实现懒加载，unmounted 钩子的作用是？',
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
                question: 'Nuxt 3 中，要让 /blog/** 路由每小时重新验证一次，routeRules 应配置为？',
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
                question: 'useFetch 在 Nuxt SSR 期间的执行特点是？',
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
                question: 'Vue 3 编译器对 v-bind="obj" 生成的 PatchFlag 通常是？',
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
                question: 'shallowRef 相比 ref 的区别是？',
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
                question: '<KeepAlive> 缓存的组件被切回时，触发的生命周期是？',
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
                question: '下列场景最适合用 Provide/Inject 而非 Props 的是？',
                options: [
                  '父组件向直接子组件传配置',
                  '根组件向 5 层以下的叶子组件注入当前登录用户',
                  '子组件向父组件发事件',
                  '兄弟组件之间共享状态',
                ],
                correctIndex: 1,
                explanation: '深层嵌套（5 层）用 Props 需逐层透传（prop drilling），Provide/Inject 可跨层直接注入，适合用户、主题、i18n 等全局上下文。',
              },
            ],
          },
        },
      ],
    },
  ],
}
