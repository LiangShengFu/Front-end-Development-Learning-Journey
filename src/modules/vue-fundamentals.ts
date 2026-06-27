/**
 * 模块 11：Vue.js 核心基础
 *
 * 严格遵循 docx/模块十一.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 20 个知识点（16 章节 + 1 小测验 + 1 综合实战 + 1 面试题 + 1 速查表）
 * - 23 个可视化演示（6 个新增 Vue 专属组件 + 15 个复用核心组件 + 2 个实战/面试沙盒）
 *
 * 在 React 项目中交付 Vue 3 跨框架教学内容，所有交互均为教学模拟。
 *
 * - KP1 Vue 介绍与核心理念（KnowledgeGraph）
 * - KP2 模板语法与指令（CompareTable）
 * - KP3 计算属性 vs 侦听器（CompareTable）
 * - KP4 响应式系统原理（ProxyReactivityTracker）
 * - KP5 Composition API 与 Composables（CodeStepper）
 * - KP6 组件通信（VueComponentSandbox + DefineEmitsWorkshop）
 * - KP7 插槽（Accordion）
 * - KP8 生命周期钩子（Timeline）
 * - KP9 Options API vs Composition API（CompareTable）
 * - KP10 Vue Router（CodeStepper + Architecture）
 * - KP11 Pinia 状态管理（PiniaStoreExplorer）
 * - KP12 Vue 3 新特性与编译优化（PatchFlagVisualizer）
 * - KP13 虚拟 DOM 与 Diff 算法（CompareTable）
 * - KP14 自定义指令（CodeStepper）
 * - KP15 事件总线 / mitt（Architecture）
 * - KP16 Vue 发展历程（Timeline）
 * - KP17 Vue.js 基础小测验（Quiz 20 题）
 * - KP18 综合实战：组合式函数 useFetch 封装（Sandbox 7 checks）
 * - KP19 Vue.js 基础面试题精选（Accordion 35 题 flashcard）
 * - KP20 Vue.js 基础速查表（Table 24 行）
 */
import type { ModuleMeta } from '../lib/types'

export const vueFundamentalsModule: ModuleMeta = {
  number: '11',
  title: 'Vue.js 核心基础',
  slug: 'vue-fundamentals',
  stage: 'vue',
  stageLabel: 'Vue 技术栈 · 第 1 模块',
  icon: '11',
  summary: 'Composition API、响应式原理、组件通信、Vue Router、Pinia、编译优化。',
  knowledgePointCount: 20,
  visualizationCount: 23,
  points: [
    // ========================================================================
    // 知识点 1：Vue 介绍与核心理念
    // ========================================================================
    {
      order: 1,
      title: 'Vue 介绍与核心理念',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue.js 是 Evan You 创建的渐进式 JavaScript 框架。核心哲学是「渐进式增强」——可以从简单的页面交互逐步扩展到完整 SPA。Vue 3 以 Composition API + Proxy 响应式 + 编译优化为核心，是国内存量最大的前端框架之一。',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'vue', label: 'Vue.js', group: 'core', weight: 3 },
              { id: 'template', label: '模板语法', group: 'related', weight: 2 },
              { id: 'reactivity', label: '响应式', group: 'related', weight: 2 },
              { id: 'components', label: '组件', group: 'related', weight: 2 },
              { id: 'composition', label: 'Composition API', group: 'related', weight: 2 },
              { id: 'pinia', label: 'Pinia', group: 'related', weight: 2 },
              { id: 'router', label: 'Vue Router', group: 'related', weight: 2 },
              { id: 'ssr', label: 'SSR/Nuxt', group: 'related', weight: 1 },
            ],
            edges: [
              { source: 'vue', target: 'template' },
              { source: 'vue', target: 'reactivity' },
              { source: 'vue', target: 'components' },
              { source: 'vue', target: 'composition' },
              { source: 'vue', target: 'pinia' },
              { source: 'vue', target: 'router' },
              { source: 'vue', target: 'ssr' },
              { source: 'composition', target: 'reactivity' },
              { source: 'components', target: 'composition' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'demo',
          visualizationType: 'vue-vs-react-comparator',
          data: {},
        },
        {
          id: 'p1-4',
          type: 'list',
          ordered: true,
          items: [
            '渐进式：可按需引入，从 CDN 脚本到完整工程化',
            '响应式：Proxy 自动依赖追踪，细粒度更新',
            '组件化：SFC 单文件组件，script/template/style 三要素',
            '编译优化：PatchFlag 靶向 diff，静态提升减少运行时开销',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 2：模板语法与指令
    // ========================================================================
    {
      order: 2,
      title: '模板语法与指令',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 使用基于 HTML 的模板语法，通过插值 {{ }} 和指令（v-if、v-for、v-model、@click 等）声明式地描述 UI。模板在编译期被优化为渲染函数。',
        },
        {
          id: 'p2-2',
          type: 'code',
          language: 'html',
          filename: 'template-example.vue',
          code: `<template>
  <div>
    <p>{{ message }}</p>
    <button @click="count++">Clicked {{ count }} times</button>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
    <input v-model="query" placeholder="搜索..." />
  </div>
</template>`,
        },
        {
          id: 'p2-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '指令',
            columns: ['语法', '作用'],
            rows: [
              { feature: 'v-if / v-else', values: ['v-if="show"', '条件渲染'] },
              { feature: 'v-for', values: [':key="item.id"', '列表渲染（key 必传）'] },
              { feature: 'v-model', values: ['v-model="value"', '双向绑定（语法糖）'] },
              { feature: 'v-bind', values: [':prop="value"', '动态属性绑定'] },
              { feature: 'v-on', values: ['@event="handler"', '事件监听'] },
              { feature: 'v-show', values: ['v-show="visible"', 'CSS display 切换'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 3：计算属性 vs 侦听器
    // ========================================================================
    {
      order: 3,
      title: '计算属性 vs 侦听器',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: 'computed 基于依赖缓存，仅当依赖变化时重新计算；watch/watchEffect 用于执行副作用（API 调用、DOM 操作等）。computed 适合派生状态，watch 适合响应数据变化执行逻辑。',
        },
        {
          id: 'p3-2',
          type: 'code',
          language: 'typescript',
          code: `const firstName = ref('张')
const lastName = ref('三')

// computed：缓存计算属性
const fullName = computed(() => \`\${firstName.value}\${lastName.value}\`)

// watch：显式监听，可获取新旧值
watch(firstName, (newVal, oldVal) => {
  console.log(\`\${oldVal} → \${newVal}\`)
})

// watchEffect：自动收集依赖
watchEffect(() => {
  console.log(\`fullName: \${fullName.value}\`)
})`,
        },
        {
          id: 'p3-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['computed', 'watch / watchEffect'],
            highlightColumn: 0,
            rows: [
              { feature: '用途', values: ['派生状态（模板中使用的计算值）', '执行副作用（API/日志/DOM）'] },
              { feature: '缓存', values: ['有缓存，依赖不变不重新计算', '无缓存，每次触发都执行回调'] },
              { feature: '返回值', values: ['返回计算结果', '无返回值（或 async）'] },
              { feature: '新旧值', values: ['不支持', 'watch 支持 (newVal, oldVal)'] },
              { feature: '依赖收集', values: ['自动（读取的 ref/reactive）', 'watch 手动指定；watchEffect 自动'] },
              { feature: '典型场景', values: ['filteredList、fullName、isValid', '搜索防抖、路由监听、数据持久化'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 4：响应式系统原理（Proxy）
    // ========================================================================
    {
      order: 4,
      title: '响应式系统原理（Proxy/依赖收集）',
      difficulty: 4,
      visualizationType: 'proxy-reactivity-tracker',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 响应式核心是 reactive（基于 Proxy）和 ref（基于对象包装 + .value）。Proxy 拦截 get/set 操作：get 时收集依赖（track），set 时触发更新（trigger）。这是 Vue 区别于 React 手动 setState 的核心机制，也是面试最高频考点。',
        },
        {
          id: 'p4-2',
          type: 'code',
          language: 'typescript',
          code: `import { ref, reactive, computed, watch, watchEffect } from 'vue'

const name = ref('Vue')
const state = reactive({ user: { name: 'Evan', age: 38 } })

const fullName = computed(() => \`\${state.user.name} - \${name.value}\`)

watch(() => state.user.age, (newVal, oldVal) => {
  console.log(\`age: \${oldVal} -> \${newVal}\`)
})`,
        },
        {
          id: 'p4-3',
          type: 'demo',
          visualizationType: 'proxy-reactivity-tracker',
          data: {},
        },
        {
          id: 'p4-4',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'Vue 响应式数据流',
            layers: [
              {
                name: '数据源',
                description: 'ref / reactive 创建响应式数据',
                components: [
                  { name: 'ref()', description: '基本类型 + 对象包装，.value 访问' },
                  { name: 'reactive()', description: 'Proxy 代理对象，深层响应' },
                ],
              },
              {
                name: '依赖收集',
                description: 'get 拦截 → track → 建立 dep 关联',
                components: [
                  { name: 'track()', description: '读取属性时收集当前 activeEffect' },
                  { name: 'trigger()', description: '设置属性时通知所有 dep' },
                ],
              },
              {
                name: '消费者',
                description: 'computed / watch / render effect',
                components: [
                  { name: 'computed', description: '缓存派生值，依赖变化时重算' },
                  { name: 'watch', description: '显式监听，执行副作用' },
                  { name: 'render effect', description: '组件渲染函数，细粒度更新 DOM' },
                ],
              },
            ],
          },
        },
        {
          id: 'p4-5',
          type: 'callout',
          variant: 'tip',
          title: 'ref vs reactive 选型',
          text: '基本类型用 ref；对象/数组用 reactive 或 ref。reactive 不能替换整个对象（会丢失响应式），需 Object.assign 或 ref。模板中 ref 自动解包，reactive 直接访问属性。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：Composition API 与 Composables
    // ========================================================================
    {
      order: 5,
      title: 'Composition API 与 Composables',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Composition API 是 Vue 3 的核心逻辑组织方式。`<script setup>` 语法糖简化 boilerplate，Composables（组合式函数）实现逻辑复用，类似 React 自定义 Hook。',
        },
        {
          id: 'p5-2',
          type: 'code',
          language: 'typescript',
          filename: 'useCounter.ts',
          code: `// Composable：可复用的组合式函数
export function useCounter(initial = 0) {
  const count = ref(initial)
  const double = computed(() => count.value * 2)
  function increment() { count.value++ }
  function decrement() { count.value-- }
  return { count, double, increment, decrement }
}

// 在组件中使用
const { count, double, increment } = useCounter(10)`,
        },
        {
          id: 'p5-3',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              "import { ref, onMounted, onUnmounted } from 'vue'",
              '',
              'export function useMouse() {',
              '  const x = ref(0)',
              '  const y = ref(0)',
              '',
              '  function update(e: MouseEvent) {',
              '    x.value = e.pageX',
              '    y.value = e.pageY',
              '  }',
              '',
              '  onMounted(() => window.addEventListener("mousemove", update))',
              '  onUnmounted(() => window.removeEventListener("mousemove", update))',
              '',
              '  return { x, y }',
              '}',
            ],
            steps: [
              { title: '声明响应式状态', highlightLines: [3, 4], description: '用 ref 创建 x/y 坐标' },
              { title: '定义更新函数', highlightLines: [6, 7, 8, 9], description: 'mousemove 事件更新坐标' },
              { title: '注册生命周期', highlightLines: [11, 12], description: 'onMounted 绑定，onUnmounted 清理' },
              { title: '暴露接口', highlightLines: [14], description: 'return { x, y } 供组件解构使用' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 6：组件通信（Props/Emits/Slots）
    // ========================================================================
    {
      order: 6,
      title: '组件通信（props/emit/provide/inject）',
      difficulty: 2,
      visualizationType: 'vue-component-sandbox',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 组件通信遵循单向数据流：Props 向下传递数据，Emits 向上通知事件，Slots 实现内容分发，provide/inject 实现跨层级依赖注入。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'vue-component-sandbox',
          data: {},
        },
        {
          id: 'p6-3',
          type: 'demo',
          visualizationType: 'define-emits-workshop',
          data: {},
        },
        {
          id: 'p6-4',
          type: 'code',
          language: 'typescript',
          filename: 'ChildComponent.vue',
          code: `<script setup lang="ts">
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), { count: 0 })

const emit = defineEmits<{
  update: [value: number]
}>()

function handleClick() {
  emit('update', props.count + 1)
}
</script>`,
        },
      ],
    },

    // ========================================================================
    // 知识点 7：插槽（Slots）
    // ========================================================================
    {
      order: 7,
      title: '插槽（默认/具名/作用域）',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: 'Slots 让父组件向子组件注入内容。默认插槽用于简单内容分发，具名插槽用于多区域布局，作用域插槽允许子组件向 slot 回传数据。',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: '默认插槽',
                content:
                  '<!-- 子组件 -->\n<slot>默认内容</slot>\n\n<!-- 父组件 -->\n<MyCard>自定义内容</MyCard>',
              },
              {
                title: '具名插槽',
                content:
                  '<!-- 子组件 -->\n<slot name="header" />\n<slot />\n<slot name="footer" />\n\n<!-- 父组件 -->\n<template #header>标题</template>\n正文\n<template #footer>底部</template>',
              },
              {
                title: '作用域插槽',
                content:
                  '<!-- 子组件 -->\n<slot :item="item" :index="i" />\n\n<!-- 父组件 -->\n<template #default="{ item, index }">\n  {{ index }}: {{ item.name }}\n</template>',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 8：生命周期钩子
    // ========================================================================
    {
      order: 8,
      title: '生命周期钩子',
      difficulty: 2,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 Composition API 的生命周期钩子与 Options API 一一对应。setup() 在 beforeCreate 和 created 之间执行，不再有 beforeCreate/created 钩子。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: 'setup()', title: 'setup()', description: 'Composition API 入口，替代 beforeCreate/created', status: 'done' },
              { time: 'onBeforeMount', title: 'onBeforeMount ↔ beforeMount', description: 'DOM 挂载前', status: 'done' },
              { time: 'onMounted', title: 'onMounted ↔ mounted', description: 'DOM 挂载后，可访问 DOM', status: 'active' },
              { time: 'onBeforeUpdate', title: 'onBeforeUpdate ↔ beforeUpdate', description: '响应式数据变化，DOM 更新前', status: 'pending' },
              { time: 'onUpdated', title: 'onUpdated ↔ updated', description: 'DOM 更新后', status: 'pending' },
              { time: 'onBeforeUnmount', title: 'onBeforeUnmount ↔ beforeUnmount', description: '组件卸载前，清理副作用', status: 'pending' },
              { time: 'onUnmounted', title: 'onUnmounted ↔ unmounted', description: '组件卸载后', status: 'pending' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 9：Options API vs Composition API
    // ========================================================================
    {
      order: 9,
      title: 'Options API vs Composition API',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: 'Options API 按选项（data/methods/computed）组织代码，适合简单组件。Composition API 按逻辑功能聚合，适合复杂组件和逻辑复用。Vue 3 推荐 Composition API + script setup。',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['Options API', 'Composition API'],
            highlightColumn: 1,
            rows: [
              { feature: '代码组织', values: ['按选项类型分散', '按逻辑功能聚合'] },
              { feature: '逻辑复用', values: ['Mixins（命名冲突）', 'Composables（清晰）'] },
              { feature: 'TypeScript', values: ['类型推导较弱', '类型推导友好'] },
              { feature: 'this 指向', values: ['依赖 this 上下文', '无 this，直接使用变量'] },
              { feature: '学习曲线', values: ['较低，类似传统 OOP', '中等，需理解 ref/reactive'] },
              { feature: '推荐场景', values: ['简单组件、快速原型', '复杂组件、逻辑复用、TS 项目'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 10：Vue Router
    // ========================================================================
    {
      order: 10,
      title: 'Vue Router',
      difficulty: 2,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue Router 是 Vue 官方路由管理器，支持嵌套路由、动态路由、导航守卫和路由懒加载。Vue 3 使用 createRouter + createWebHistory 创建路由实例。',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              "import { createRouter, createWebHistory } from 'vue-router'",
              '',
              'const routes = [',
              "  { path: '/', component: Home },",
              "  { path: '/user/:id', component: User, props: true },",
              "  { path: '/about', component: () => import('./About.vue') },",
              ']',
              '',
              'const router = createRouter({',
              '  history: createWebHistory(),',
              '  routes,',
              '})',
              '',
              "router.beforeEach((to, from, next) => {",
              '  if (to.meta.requiresAuth && !isLoggedIn()) next("/login")',
              '  else next()',
              '})',
            ],
            steps: [
              { title: '定义路由表', highlightLines: [3, 4, 5, 6], description: 'path + component，动态路由 :id，懒加载 import()' },
              { title: '创建路由实例', highlightLines: [8, 9, 10, 11], description: 'createWebHistory 启用 HTML5 History 模式' },
              { title: '全局导航守卫', highlightLines: [13, 14, 15, 16], description: 'beforeEach 鉴权拦截，meta.requiresAuth 标记' },
            ],
          },
        },
        {
          id: 'p10-3',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: '导航守卫执行顺序',
            layers: [
              {
                name: '全局守卫',
                components: [
                  { name: 'beforeEach', description: '路由切换前，鉴权/重定向' },
                  { name: 'beforeResolve', description: '所有组件内守卫和异步路由组件解析后' },
                  { name: 'afterEach', description: '路由切换后，不可改变导航' },
                ],
              },
              {
                name: '路由独享守卫',
                components: [{ name: 'beforeEnter', description: '路由配置中定义，仅对该路由生效' }],
              },
              {
                name: '组件内守卫',
                components: [
                  { name: 'beforeRouteEnter', description: '进入前，无法访问 this' },
                  { name: 'beforeRouteUpdate', description: '路由参数变化时（同组件复用）' },
                  { name: 'beforeRouteLeave', description: '离开前，确认未保存更改' },
                ],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 11：Pinia 状态管理
    // ========================================================================
    {
      order: 11,
      title: 'Pinia 状态管理',
      difficulty: 3,
      visualizationType: 'pinia-store-explorer',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: 'Pinia 是 Vue 官方推荐的状态管理方案，替代 Vuex。API 更简洁：无 mutations、完整 TypeScript 支持、DevTools 集成。Setup Store 模式与 Composition API 风格一致。',
        },
        {
          id: 'p11-2',
          type: 'code',
          language: 'typescript',
          code: `import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, double, increment }
})

// 组件中使用
const store = useCounterStore()
const { count } = storeToRefs(store) // 保持响应式`,
        },
        {
          id: 'p11-3',
          type: 'demo',
          visualizationType: 'pinia-store-explorer',
          data: {},
        },
        {
          id: 'p11-4',
          type: 'callout',
          variant: 'tip',
          title: 'Pinia vs Vuex',
          text: 'Pinia 无 mutations（直接在 actions 中修改 state）、无 modules 嵌套（多 store 文件）、更好的 TS 支持。Vue 3 新项目直接使用 Pinia，Vuex 仅维护旧项目。',
        },
      ],
    },

    // ========================================================================
    // 知识点 12：Vue 3 新特性与编译优化
    // ========================================================================
    {
      order: 12,
      title: 'Vue 3 新特性与编译优化',
      difficulty: 3,
      visualizationType: 'patch-flag-visualizer',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 引入 Teleport（传送门）、Suspense（异步组件）、Fragment（多根节点）等内置能力。编译器通过 PatchFlag 标记动态节点、静态提升和 Block Tree 扁平化 diff 大幅减少运行时开销。',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'patch-flag-visualizer',
          data: {},
        },
        {
          id: 'p12-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['作用', '使用场景', '示例'],
            rows: [
              { feature: 'Teleport', values: ['将内容渲染到 DOM 其他位置', 'Modal/Toast/Drawer', '<Teleport to="body">'] },
              { feature: 'Suspense', values: ['异步组件加载态', '懒加载 + loading 占位', '<Suspense><AsyncComp /></Suspense>'] },
              { feature: 'Fragment', values: ['多根节点（无需包裹 div）', '列表项、表格行', '<template> 多根'] },
              { feature: 'defineAsyncComponent', values: ['异步组件定义', '路由懒加载、条件加载', 'defineAsyncComponent(() => import(...))'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 13：虚拟 DOM 与 Diff
    // ========================================================================
    {
      order: 13,
      title: '虚拟 DOM 与 Diff 算法',
      difficulty: 4,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 同样使用虚拟 DOM，但编译优化使 diff 范围大幅缩小。Block Tree 仅对比带 PatchFlag 的动态节点，静态子树完全跳过。这与 React Fiber 的运行时调度策略形成对比。',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['Vue 3', 'React 18'],
            rows: [
              { feature: 'Diff 策略', values: ['Block Tree + PatchFlag 靶向 diff', 'Fiber 双缓冲 + 优先级调度'] },
              { feature: '静态优化', values: ['编译期静态提升', '运行时全量 diff（靠 memo 优化）'] },
              { feature: '更新触发', values: ['Proxy 自动追踪，细粒度', 'setState 触发组件重渲染'] },
              { feature: 'key 作用', values: ['列表 diff 节点复用', '列表 diff 节点复用'] },
              { feature: '性能优化手段', values: ['编译优化为主', 'memo/useMemo/useCallback 手动'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 14：自定义指令
    // ========================================================================
    {
      order: 14,
      title: '自定义指令',
      difficulty: 2,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: '自定义指令用于直接操作 DOM 元素。Vue 3 中钩子函数重命名：bind→beforeMount、inserted→mounted、update→beforeUpdate 等。推荐优先使用组件而非指令。',
        },
        {
          id: 'p14-2',
          type: 'code',
          language: 'typescript',
          code: `// 全局注册
app.directive('focus', {
  mounted(el) { el.focus() }
})

// 局部注册（script setup）
const vFocus = {
  mounted: (el: HTMLElement) => el.focus()
}

// 使用
<input v-focus />`,
        },
      ],
    },

    // ========================================================================
    // 知识点 15：事件总线与 mitt
    // ========================================================================
    {
      order: 15,
      title: '事件总线 / mitt',
      difficulty: 2,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 移除了实例事件 API（$on/$off/$emit），跨组件通信推荐使用 Pinia 或 mitt 事件总线。mitt 是 200 字节的微型 pub/sub 库，适合非父子组件的轻量通信。',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: '组件通信方案选型',
            layers: [
              {
                name: '父子通信',
                components: [
                  { name: 'Props ↓', description: '父 → 子数据传递' },
                  { name: 'Emits ↑', description: '子 → 父事件通知' },
                ],
              },
              {
                name: '跨层级',
                components: [
                  { name: 'provide/inject', description: '祖先 → 后代依赖注入' },
                  { name: 'Pinia Store', description: '全局状态，任意组件访问' },
                ],
              },
              {
                name: '非关系组件',
                components: [
                  { name: 'mitt 事件总线', description: '轻量 pub/sub，适合低频通信' },
                  { name: 'Pinia / Composable', description: '推荐方案，可测试可追踪' },
                ],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 16：Vue 发展历程
    // ========================================================================
    {
      order: 16,
      title: 'Vue 发展历程',
      difficulty: 1,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 从 2014 年的个人项目发展为全球主流框架。Vue 3 是一次彻底重写，Proxy 响应式、Composition API 和编译优化使其在性能和 DX 上全面超越 Vue 2。',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '2014', title: 'Vue 0.x', description: 'Evan You 发布，受 Angular/React 启发', status: 'done' },
              { time: '2016', title: 'Vue 2.0', description: '引入 Virtual DOM、SSR、vue-router/vuex 生态', status: 'done' },
              { time: '2019', title: 'Vue 3 Alpha', description: 'Proxy 响应式、Composition API、Tree-shaking', status: 'done' },
              { time: '2020', title: 'Vue 3 正式版', description: '性能提升、更好的 TS 支持、Fragment/Teleport', status: 'done' },
              { time: '2022', title: 'Pinia 成为官方推荐', description: '替代 Vuex，更简洁的状态管理', status: 'done' },
              { time: '2024', title: 'Vue 3.4+', description: 'defineModel、useTemplateRef 等 DX 改进', status: 'active' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 17：Vue.js 基础小测验
    // ========================================================================
    {
      order: 17,
      title: 'Vue.js 基础小测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: '通过 20 道精选测验题检验对 Vue 3 核心概念的掌握程度，覆盖响应式原理、Composition API、组件通信、Pinia、Vue Router、编译优化等高频考点。题目按【记忆】【理解】【应用】【对比】【场景】【综合】梯度分布，每题附详细解析。',
        },
        {
          id: 'p17-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '【记忆】Vue 3 响应式系统的核心实现是？',
                options: ['Object.defineProperty', 'Proxy', 'Publish-Subscribe', 'EventEmitter'],
                correctIndex: 1,
                explanation: 'Vue 3 使用 Proxy 拦截 get/set 实现响应式，相比 Vue 2 的 Object.defineProperty 可以监听数组索引变化、属性新增/删除，且性能更好。',
              },
              {
                question: '【对比】ref 和 reactive 的主要区别是？',
                options: ['ref 不能用于对象', 'ref 需要 .value 访问，reactive 直接访问属性', 'reactive 不能用于数组', '没有区别'],
                correctIndex: 1,
                explanation: 'ref 包装任意值，通过 .value 访问（模板中自动解包）；reactive 仅用于对象/数组，Proxy 代理后直接访问属性。基本类型必须用 ref。',
              },
              {
                question: '【对比】computed 和 watch 的核心区别是？',
                options: ['computed 更快', 'computed 有缓存且返回派生值，watch 执行副作用', 'watch 不能监听 ref', 'computed 不能用于模板'],
                correctIndex: 1,
                explanation: 'computed 基于依赖缓存，返回计算结果，适合模板中的派生状态。watch/watchEffect 用于执行副作用（API 调用、日志等），无缓存。',
              },
              {
                question: '【记忆】defineProps 和 defineEmits 是什么？',
                options: ['运行时函数', '编译宏，编译时处理', 'Vuex actions', 'Router 守卫'],
                correctIndex: 1,
                explanation: 'defineProps 和 defineEmits 是 `<script setup>` 中的编译宏，在编译阶段处理，不需要 import，也不是运行时函数调用。',
              },
              {
                question: '【对比】Pinia 相比 Vuex 的主要优势不包括？',
                options: ['无 mutations', '更好的 TypeScript 支持', '内置 modules 嵌套', '更简洁的 API'],
                correctIndex: 2,
                explanation: 'Pinia 没有 modules 嵌套概念（用多个独立 store 文件替代），也没有 mutations。它提供更简洁的 API 和更好的 TS 支持。',
              },
              {
                question: '【记忆】Vue Router 中 beforeEach 守卫的作用是？',
                options: ['路由渲染后执行', '路由切换前执行，可做鉴权拦截', '仅对组件内守卫生效', '替代 component 配置'],
                correctIndex: 1,
                explanation: 'beforeEach 是全局前置守卫，在每次路由切换前执行。可通过 next() 控制导航：放行、重定向或取消。常用于登录鉴权。',
              },
              {
                question: '【记忆】PatchFlag 的作用是？',
                options: ['标记 CSS 类名', '编译器标记动态节点类型，靶向 diff', '路由元信息', 'Pinia store ID'],
                correctIndex: 1,
                explanation: 'PatchFlag 是 Vue 3 编译器为动态节点设置的位掩码标记（TEXT/CLASS/STYLE/PROPS 等），运行时仅 diff 带 PatchFlag 的节点，跳过静态子树。',
              },
              {
                question: '【记忆】Teleport 组件的作用是？',
                options: ['路由跳转', '将内容渲染到 DOM 其他位置', '状态管理', '异步加载'],
                correctIndex: 1,
                explanation: 'Teleport 将组件内容渲染到 DOM 树的其他位置（如 body），常用于 Modal、Toast 等需要脱离父组件 overflow/z-index 限制的场景。',
              },
              {
                question: '【理解】storeToRefs 的作用是？',
                options: ['创建新 store', '解构 store 时保持响应式', '重置 store 状态', '订阅 store 变化'],
                correctIndex: 1,
                explanation: '直接解构 Pinia store 会丢失响应式。storeToRefs 将 state 和 getters 转为 ref，解构后仍保持响应式。actions 可直接解构（无需 storeToRefs）。',
              },
              {
                question: '【理解】Vue 3 中 setup() 的执行时机是？',
                options: ['mounted 之后', 'beforeCreate 和 created 之间', 'beforeMount 之前', '组件卸载时'],
                correctIndex: 1,
                explanation: 'setup() 在 beforeCreate 和 created 之间执行，此时 props 已解析但 DOM 未挂载。`<script setup>` 是 setup() 的语法糖。',
              },
              {
                question: '【理解】Vue 3 的 Proxy 响应式相比 Vue 2 的 Object.defineProperty 优势不包括？',
                options: ['能监听属性新增/删除', '能监听数组索引变化', '兼容 IE11', '性能更好（惰性收集依赖）'],
                correctIndex: 2,
                explanation: 'Proxy 不兼容 IE11（Vue 3 已放弃 IE11 支持）。Proxy 的优势：能监听属性增删、数组索引/length 变化、惰性收集依赖（按需 track，不全量劫持），性能更好。',
              },
              {
                question: '【应用】要在 <script setup> 中接收父组件传入的 title，正确写法是？',
                options: ["defineProps(['title'])", "const props = defineProps({ title: String })", "this.$props.title", "useState('title')"],
                correctIndex: 1,
                explanation: "defineProps 是编译宏，返回 props 对象。可传运行时声明 { title: String } 或类型声明 defineProps<{ title: string }>()。模板中可直接用 title，JS 中用 props.title。",
              },
              {
                question: '【理解】watchEffect 和 watch 的区别是？',
                options: ['完全相同', 'watchEffect 自动收集依赖无需指定，watch 需显式指定监听源', 'watch 是同步的', 'watchEffect 有缓存'],
                correctIndex: 1,
                explanation: 'watchEffect 立即执行一次自动收集依赖，适合「只要依赖变就执行」的场景。watch 需显式指定监听源，可拿到新旧值，惰性执行（依赖变化才触发），适合需要旧值的场景。',
              },
              {
                question: '【对比】v-if 和 v-show 的区别是？',
                options: ['v-if 用 display:none，v-show 移除 DOM', 'v-show 首次开销大，v-if 切换开销大', '两者完全相同', 'v-show 不能用于组件'],
                correctIndex: 1,
                explanation: 'v-if 真正条件渲染（false 时 DOM 不存在），切换开销大。v-show 始终渲染，用 display:none 切换（CSS），首次开销大但切换快。频繁切换用 v-show，条件很少改变用 v-if。',
              },
              {
                question: '【场景】组件需要"首次进入触发、之后依赖变化才触发"的副作用，应选？',
                options: ['watchEffect', 'watch + immediate: true', 'computed', 'onMounted'],
                correctIndex: 1,
                explanation: 'watch 默认惰性（不立即执行），加 immediate: true 可首次执行一次，之后依赖变化再触发。watchEffect 总是立即执行且无法关闭，不适合「只首次」场景。',
              },
              {
                question: '【应用】Pinia store 中定义一个异步 action 获取用户列表，正确？',
                options: ['必须在 mutations 中', '直接在 actions 中写 async 函数', '用 computed 包装', '不能用 async'],
                correctIndex: 1,
                explanation: 'Pinia 没有 mutations，actions 可直接是 async 函数，内部用 this 访问/修改 state。const useStore = defineStore("user", { state, actions: { async fetchList() { this.list = await api.get() } } })。',
              },
              {
                question: '【场景】父组件传给子组件的 props 是对象，子组件直接修改了对象属性，会发生什么？',
                options: ['报错', '修改成功且父组件响应式更新', '修改成功但违反单向数据流，难以追踪', '子组件重新渲染'],
                correctIndex: 2,
                explanation: '对象/数组 props 是引用传递，子组件修改属性会改到父组件状态（响应式更新），但严重违反单向数据流，难以追踪数据变化来源。正确做法：子组件 emit 事件让父组件改，或用 computed 本地副本。',
              },
              {
                question: '【理解】Vue 3 编译优化的「静态提升」是指？',
                options: ['静态节点提升到组件外', '静态节点创建函数提升到 render 外，复用同一引用', '静态 CSS 提升', '静态 props 提升'],
                correctIndex: 1,
                explanation: '静态提升（hoistStatic）把无动态绑定的静态节点（如 <div>静态文本</div>）的 createVNode 调用提升到 render 函数外，多次渲染复用同一 vnode 引用，跳过 diff，提升性能。',
              },
              {
                question: '【综合】关于 Vue 3 最佳实践，以下错误的是？',
                options: ['优先用 Composition API 组织逻辑', '基本类型用 ref，对象/数组用 reactive', '所有状态都放 Pinia 全局管理', '用 <script setup> 替代 setup() 函数'],
                correctIndex: 2,
                explanation: '并非所有状态都该放 Pinia。组件局部状态（如表单输入、展开折叠）用 ref/reactive 局部管理即可；跨组件共享状态才用 Pinia。滥用全局 store 会增加耦合、降低可测试性。',
              },
              {
                question: '【综合】为一个中后台管理系统选 Vue 3 状态管理与路由方案，合理的是？',
                options: ['Vuex + vue-router 3', 'Pinia + Vue Router 4 + 路由懒加载', '不用状态库 + 手写 hash 路由', 'Redux + React Router'],
                correctIndex: 1,
                explanation: 'Vue 3 项目推荐 Pinia（官方状态库，无 mutations，TS 友好）+ Vue Router 4（配套路由，支持 Composition API）。路由懒加载（import()）减少首屏 bundle。Vuex 仍可用但新项目推荐 Pinia。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 18：综合实战：组合式函数 useFetch 封装
    // ========================================================================
    {
      order: 18,
      title: '综合实战：组合式函数 useFetch 封装',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: '把 ref、computed、watch、生命周期、组合式函数提取焊在一起的综合实战。你要实现一个通用的 useFetch<T> composable：传入 url 返回 { data, error, loading, retry }，自动在挂载时请求、url 变化时重新请求、卸载时取消未完成的请求（AbortController）。右侧沙盒的任务检查清单会实时校验你的代码并给教学反馈。',
        },
        {
          id: 'p18-2',
          type: 'paragraph',
          text: '任务要求：data/error/loading 用 ref 包装；用 computed 派生 isEmpty（data 为空且非 loading）；onMounted 触发首次请求；watch 监听 url 变化重新请求；用 AbortController 在 onBeforeUnmount 取消请求；暴露 retry 方法手动重试。',
        },
        {
          id: 'p18-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'typescript',
            hint: '在下方编辑器中编写 useFetch 组合式函数（关注关键 API 使用）。任务检查清单会实时校验——逐条通过即完成。重点关注 ref/computed/watch/onMounted/onBeforeUnmount/AbortController。',
            initialCode: `// composables/useFetch.ts
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

export function useFetch<T>(url: () => string) {
  // TODO: 用 ref 包装 data/error/loading
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  // TODO: 用 computed 派生 isEmpty（data 为空且非 loading）
  const isEmpty = computed(() => !data.value && !loading.value)

  let controller: AbortController | null = null

  async function fetchData() {
    // TODO: 用 AbortController 取消上一次未完成请求
    controller?.abort()
    controller = new AbortController()
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url(), { signal: controller.signal })
      data.value = await res.json() as T
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  // TODO: 暴露 retry 方法手动重试
  const retry = fetchData

  // TODO: onMounted 触发首次请求
  // TODO: watch 监听 url 变化重新请求
  // TODO: onBeforeUnmount 取消未完成请求

  return { data, error, loading, isEmpty, retry }
}`,
            checks: [
              {
                description: '用 ref 包装 data/error/loading 响应式状态',
                pattern: 'ref\\(',
                hint: 'const data = ref<T | null>(null)。ref 包装的值在模板中自动解包、JS 中用 .value 访问。data/error/loading 三个状态都必须是 ref，否则响应式丢失。',
              },
              {
                description: '用 computed 派生 isEmpty（data 为空且非 loading）',
                pattern: 'computed\\(',
                hint: 'const isEmpty = computed(() => !data.value && !loading.value)。computed 基于依赖缓存，返回派生值，适合「派生状态」。不要在 watch 里手动维护 isEmpty（容易漏更新）。',
              },
              {
                description: '用 AbortController 取消上一次未完成请求',
                pattern: 'AbortController',
                hint: 'controller?.abort() 先取消上一次，再 new AbortController()。fetch 第二参传 { signal: controller.signal }。避免 url 快速变化时的竞态：旧请求返回覆盖新请求。',
              },
              {
                description: '暴露 retry 方法供手动重试',
                pattern: 'retry',
                hint: 'const retry = fetchData（或 retry: fetchData）。composable 的核心价值是「返回可复用的响应式状态 + 方法」，retry 让调用方在出错时手动重试，提升 UX。',
              },
              {
                description: 'onMounted 触发首次请求',
                pattern: 'onMounted\\(',
                hint: 'onMounted(() => fetchData())。setup 阶段不要直接发请求（DOM 未挂载、可能 SSR）。onMounted 确保客户端才请求，避免 SSR 水合不一致。',
              },
              {
                description: 'watch 监听 url 变化重新请求',
                pattern: 'watch\\(',
                hint: 'watch(url, fetchData)。url 是函数（getter 形式），watch 会跟踪其返回值变化。变化时自动重新请求。不要用 watchEffect（无法精确控制监听源，且会立即执行一次重复 onMounted 的工作）。',
              },
              {
                description: 'onBeforeUnmount 取消未完成请求',
                pattern: 'onBeforeUnmount\\(',
                hint: 'onBeforeUnmount(() => controller?.abort())。组件卸载时取消未完成请求，避免「卸载后 setState」警告和内存泄漏。这是组合式函数管理副作用的核心收尾。',
              },
            ],
          },
        },
        {
          id: 'p18-4',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '它把 Composition API 的完整闭环串起来：ref 状态 + computed 派生 + watch 监听 + 生命周期收尾 + composable 提取复用。完成后你会理解「组合式函数」不是语法糖，而是 Vue 3 组织业务逻辑、实现复用的核心范式——逻辑关注点聚合成一个可复用的函数，替代 Options API 的 mixins（命名冲突、来源不清）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 19：Vue.js 基础面试题精选
    // ========================================================================
    {
      order: 19,
      title: 'Vue.js 基础面试题精选',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          lead: true,
          text: '35 道 Vue 3 核心面试题，覆盖响应式原理、Composition API、组件通信、Pinia、Vue Router、编译优化、性能、场景排查与方案对比。点击卡片翻转查看答案，建议先自答再对照。',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: Vue 3 的响应式原理？为什么用 Proxy 替代 Object.defineProperty？',
                content: 'Vue 3 响应式原理：\n\n- reactive(obj)：用 new Proxy(obj, { get, set }) 拦截属性读写。\n- get 时 track(target, key)：收集当前 effect 到依赖 Map。\n- set 时 trigger(target, key)：通知该 key 的所有 effect 重新执行。\n- ref(value)：用对象 { value } + get/set 拦持，基本类型也能响应式。\n\n为什么换 Proxy：\n1. Object.defineProperty 只能劫持已存在属性，新增/删除需 Vue.set/Vue.delete。\n2. 无法监听数组索引/length 变化（Vue 2 重写了 7 个数组方法 hack）。\n3. 初始化时全量递归遍历，性能差；Proxy 惰性收集（访问时才 track）。\n4. Proxy 不兼容 IE11（Vue 3 已放弃 IE11）。\n\n结论：Proxy 更强大、更优雅、性能更好，是 Vue 3 响应式的根基。',
              },
              {
                title: 'Q2: ref 和 reactive 的区别？何时用哪个？',
                content: '区别：\n\n- ref：包装任意值（基本类型/对象），通过 .value 访问（模板自动解包）。底层用对象 + get/set。\n- reactive：仅用于对象/数组，返回 Proxy 代理，直接访问属性。深层响应式（嵌套对象也代理）。\n\n选型：\n1. 基本类型（string/number/boolean）：必须用 ref。\n2. 对象/数组：reactive 更自然（无需 .value），但重新赋值会丢失响应式（需 Object.assign 或整体替换 ref）。\n3. 需要整体替换（如重新赋值新对象）：用 ref。\n4. 组合式函数返回：推荐 ref（解构后仍响应式）。\n\n结论：基本类型用 ref，对象优先 reactive，需要整体替换用 ref。',
              },
              {
                title: 'Q3: computed 和 watch 的区别？',
                content: 'computed：\n\n- 基于依赖缓存，返回派生值，依赖不变时读缓存。\n- 适合模板中的派生状态（如 fullName = first + last）。\n- 必须有返回值，无副作用。\n\nwatch：\n\n- 显式指定监听源，依赖变化时执行副作用（API、日志）。\n- 可拿到新旧值，默认惰性（不立即执行，加 immediate: true 立即执行）。\n- 适合「数据变化 → 执行操作」场景。\n\n结论：派生值用 computed，副作用用 watch。',
              },
              {
                title: 'Q4: watch 和 watchEffect 的区别？',
                content: '区别：\n\n- watchEffect：立即执行一次自动收集依赖，无需指定监听源；无法拿到旧值；适合「只要依赖变就执行」。\n- watch：显式指定监听源（ref/getter/数组），惰性执行（依赖变化才触发）；可拿到新旧值；适合需要旧值或精确控制。\n\n场景：\n1. 自动追踪多个依赖、不需旧值 → watchEffect。\n2. 需要旧值、监听特定源、需要 immediate 控制 → watch。\n\n结论：watch 更可控，watchEffect 更简洁，按需选择。',
              },
              {
                title: 'Q5: Composition API 相比 Options API 的优势？',
                content: '优势：\n\n1. 逻辑复用：提取 composable 函数复用，替代 mixins（无命名冲突、来源清晰、类型安全）。\n2. 逻辑组织：按功能聚合（响应式状态+方法+生命周期在一起），而非按选项分散（data/methods/mounted 分离）。\n3. 类型推断：TS 友好，无需 vue-class-component 装饰器。\n4. Tree-shaking：按需引入 API，bundle 更小。\n5. 更好的压缩：变量名可被压缩，Options API 的 this 难压缩。\n\n结论：新项目推荐 Composition API + <script setup>，旧项目可渐进迁移。',
              },
              {
                title: 'Q6: <script setup> 相比 setup() 函数的优势？',
                content: '优势：\n\n1. 更简洁：顶层变量/函数自动暴露给模板，无需 return。\n2. 更好的性能：编译时优化，省去 return 对象的开销。\n3. 更好的 TS：顶层类型推断更自然。\n4. 编译宏：defineProps/defineEmits/defineExpose/defineSlots 编译时处理，无需 import。\n5. import 组件直接用：无需 components 注册。\n\n注意：<script setup> 默认不暴露内部，需用 defineExpose 显式暴露给父组件 ref 访问。\n\n结论：<script setup> 是 Vue 3 SFC 推荐写法。',
              },
              {
                title: 'Q7: defineProps 和 defineEmits 是什么？',
                content: '说明：\n\n- 它们是 <script setup> 中的编译宏（compile-time macros），编译阶段处理。\n- 不需要 import，也不是运行时函数调用。\n- defineProps 返回 props 对象，支持运行时声明 { title: String } 或类型声明 defineProps<{ title: string }>()。\n- defineEmits 返回 emit 函数，支持 defineEmits<{ update: [value: number] }>()。\n- 编译后等价于 Options API 的 props/emits 选项。\n\n结论：编译宏是 <script setup> 的语法糖，让类型声明更自然。',
              },
              {
                title: 'Q8: Vue 组件通信有哪些方式？',
                content: '通信方式：\n\n1. Props / Emits：父子，单向数据流（最常用）。\n2. v-model：父子双向绑定，本质是 :modelValue + @update:modelValue。\n3. provide / inject：祖孙跨层级依赖注入。\n4. ref / expose：父直接访问子组件暴露的方法（defineExpose）。\n5. mitt / 事件总线：任意组件，轻量但难追踪（Vue 3 移除了 $on/$emit，推荐 mitt 库）。\n6. Pinia：全局状态管理，任意组件共享。\n7. $attrs：透传属性给根元素或子组件。\n\n选型：父子用 props/emit，跨层级用 provide/inject，全局用 Pinia，临时事件用 mitt。',
              },
              {
                title: 'Q9: provide/inject 如何保持响应式？',
                content: `关键点：\n\n- 直接 provide 一个 reactive 对象：inject 后保持响应式（因为是同一 Proxy 引用）。\n- provide 一个 ref：inject 拿到 ref，需 .value 访问。\n- provide 一个原始值：inject 后丢失响应式（基本类型无法代理）。\n- 推荐用 readonly() 包裹 provide 的值，防止子组件直接修改（单向数据流）。\n\n示例：\nprovide('key', readonly(reactive({ count: 0 })))\nconst state = inject('key')\n\n结论：provide 响应式对象或 ref，子组件 inject 后保持响应式；用 readonly 防篡改。`,
              },
              {
                title: 'Q10: 插槽（Slot）有哪几种？作用域插槽是什么？',
                content: '类型：\n\n1. 默认插槽：<slot />，父组件传入内容填充。\n2. 具名插槽：<slot name="header" />，父用 #header 精确填充。\n3. 作用域插槽：子组件向插槽内容传数据，父组件用 v-slot 接收。\n\n作用域插槽示例：\n- 子：<slot :item="item" :index="index" />\n- 父：<template #default="{ item, index }">{{ item }}</template>\n\n用途：列表组件让父决定每行如何渲染（如 v-for + 作用域插槽），组件复用性极强。\n\n结论：作用域插槽是 Vue 实现渲染作用域反转的核心机制。',
              },
              {
                title: 'Q11: Pinia 相比 Vuex 的优势？',
                content: '优势：\n\n1. 无 mutations：actions 可直接改 state（同步/异步都行），简化心智模型。\n2. 无 modules 嵌套：每个 store 独立文件，按需 import，扁平化。\n3. 更好的 TS：完整类型推断，无需 CreateStateMachine。\n4. 更轻量：约 1KB，比 Vuex 小。\n5. Composition API 友好：const store = useStore() 在 setup 中自然使用。\n6. 支持 SSR、HMR、devtools。\n\n结论：Pinia 是 Vue 3 官方推荐状态库，新项目首选，替代 Vuex。',
              },
              {
                title: 'Q12: Pinia store 如何定义和使用？',
                content: `定义（两种风格）：\n\n- Options 风格：\n  const useCounter = defineStore('counter', {\n    state: () => ({ count: 0 }),\n    getters: { double: (state) => state.count * 2 },\n    actions: { increment() { this.count++ } },\n  })\n\n- Setup 风格（推荐 Composition）：\n  const useCounter = defineStore('counter', () => {\n    const count = ref(0)\n    const double = computed(() => count.value * 2)\n    function increment() { count.value++ }\n    return { count, double, increment }\n  })\n\n使用：\nconst store = useCounter()\nstore.count / store.double / store.increment()\nconst { count, double } = storeToRefs(store)  // 解构保持响应式\n\n结论：Setup 风格与 Composition API 一致，推荐。`,
              },
              {
                title: 'Q13: 为什么解构 Pinia store 会丢失响应式？如何解决？',
                content: '原因：\n\n- store 是 reactive 代理对象，直接解构（const { count } = store）得到的是当时值的快照，丢失响应式（类似解构 reactive 对象）。\n\n解决：\n\n- state/getters：用 storeToRefs(store) 解构，内部用 toRefs 转为 ref。\n  const { count, double } = storeToRefs(store)\n- actions：直接解构（函数不依赖 this 的响应式，且 storeToRefs 会跳过 actions）。\n  const { increment } = store\n\n结论：state/getters 用 storeToRefs，actions 直接解构。',
              },
              {
                title: 'Q14: Vue Router 4 的路由模式有哪些？',
                content: '模式：\n\n1. createWebHistory()：HTML5 History 模式，URL 无 #（如 /about），需服务端配置 fallback 到 index.html。SEO 友好。\n2. createWebHashHistory()：Hash 模式，URL 带 #（如 #/about），无需服务端配置，但 SEO 不友好。\n3. createMemoryHistory()：内存模式，无 URL 变化，适合 SSR 或测试。\n\n选型：\n- 生产 + 需要 SEO → createWebHistory（配置服务端 fallback）。\n- 简单部署/无服务端配置 → createWebHashHistory。\n- SSR/测试 → createMemoryHistory。\n\n结论：Vue 3 + Vue Router 4 推荐 createWebHistory。',
              },
              {
                title: 'Q15: Vue Router 的导航守卫执行顺序？',
                content: '完整顺序（从全局到组件到路由）：\n\n1. 全局前置：router.beforeEach\n2. 路由独享：beforeEnter（路由配置里）\n3. 组件内：beforeRouteEnter（组件配置，setup 中用 onBeforeRouteEnter）\n4. 全局解析：router.beforeResolve\n5. 导航确认 → 组件挂载 → 组件内 beforeRouteUpdate/Leave\n6. 全局后置：router.afterEach（无 next，仅通知）\n\n鉴权场景：在 beforeEach 检查 meta.requiresAuth + 登录态，未登录跳 /login。\n\n结论：beforeEach 最常用（全局鉴权），afterEach 用于埋点/标题设置。',
              },
              {
                title: 'Q16: Vue Router 动态路由和懒加载如何实现？',
                content: `动态路由：\n\n- path: '/user/:id'，组件内用 route.params.id 获取。\n- 多参数：path: '/user/:id/post/:postId'。\n- 可选：path: '/user/:id?'。\n\n懒加载（代码分割）：\n\n- component: () => import('./User.vue')。\n- Webpack/Vite 自动分割为独立 chunk，按需加载，减小首屏 bundle。\n- 配合 <Suspense> 或路由 loading 状态。\n\n结论：动态路由 + 懒加载是中大型 SPA 路由标配。`,
              },
              {
                title: 'Q17: Vue 3 的编译优化有哪些？',
                content: '编译优化：\n\n1. PatchFlag：编译器为动态节点标记类型（TEXT/CLASS/STYLE/PROPS/FULL），运行时靶向 diff，跳过静态节点。\n2. 静态提升（hoistStatic）：静态节点的 createVNode 提升到 render 外，复用同一引用，跳过 diff。\n3. 事件缓存（cacheHandlers）：内联事件函数缓存，避免每次 render 重建。\n4. Block Tree：以动态节点为根组织 block，diff 时只遍历 block 内动态节点，而非整棵树。\n5. Tree-shaking：按需引入 API（nextTick、computed 等可被摇掉未使用的）。\n\n结论：Vue 3 编译时已知信息运行时复用，性能远超 Vue 2 的全量 diff。',
              },
              {
                title: 'Q18: 虚拟 DOM 的 Diff 算法？Vue 3 的优化？',
                content: 'Diff 算法：\n\n- 同层比较：只对比同层级节点，不跨层。\n- 类型不同直接替换，类型相同复用 DOM 更新属性。\n- 列表 diff：用 key 标识节点，双端比较/最长递增子序列，最小化 DOM 操作。\n\nVue 3 优化：\n\n1. PatchFlag 靶向 diff：只 diff 标记的动态部分（如只 diff class 不 diff 文本）。\n2. Block Tree：动态节点扁平化为 block，diff 只遍历动态节点数组。\n3. 最长递增子序列：列表移动用 LIS 算法，最小化移动次数。\n\n结论：Vue 3 在编译时分析模板，运行时跳过静态部分，diff 性能大幅提升。',
              },
              {
                title: 'Q19: Teleport 和 Suspense 的作用？',
                content: 'Teleport：\n\n- <Teleport to="body"> 将内容渲染到 DOM 其他位置（如 body）。\n- 用途：Modal、Toast、Notification 脱离父组件 overflow/z-index 限制。\n- 逻辑上仍是子组件（props/emit 正常），仅物理 DOM 位置不同。\n\nSuspense：\n\n- <Suspense> 等待异步组件/async setup 完成，显示 fallback。\n- 用途：路由懒加载、异步数据获取的 loading 状态。\n- <template #fallback>加载中...</template>\n\n结论：Teleport 解决 DOM 位置，Suspense 解决异步等待，都是 Vue 3 内置组件。',
              },
              {
                title: 'Q20: v-if 和 v-show 的区别？',
                content: '区别：\n\n- v-if：真正条件渲染，false 时 DOM 不存在；切换时重建/销毁；切换开销大。\n- v-show：始终渲染，用 display:none 切换（CSS）；首次开销大但切换快。\n\n选型：\n1. 频繁切换 → v-show（避免重建 DOM）。\n2. 条件很少改变、初始条件可能为 false → v-if（避免初始渲染开销）。\n3. v-if 可配合 v-else/v-else-if；v-show 不能。\n4. v-if 在编译时决定是否生成 vnode；v-show 运行时切 style。\n\n结论：频繁切用 v-show，低概率显示用 v-if。',
              },
              {
                title: 'Q21: v-for 中 key 的作用？为什么不能用 index？',
                content: '作用：\n\n- key 是 vnode 的唯一标识，diff 时复用 DOM（同 key 复用，不同重建）。\n- 帮助 diff 算法识别节点移动/增删，最小化 DOM 操作。\n\n为什么不用 index：\n\n1. 列表顺序变化（插入/删除/排序）时，index 不变但数据变了，Vue 会复用错误 DOM，导致状态错乱（如表单输入残留）。\n2. 触发不必要的 DOM 更新，性能下降。\n\n正确做法：用数据的唯一 id（如 item.id）。\n\n结论：key 必须稳定且唯一，禁止用 index（除非列表纯展示且永不变化）。',
              },
              {
                title: 'Q22: 场景题——商品列表页性能差，如何用 Vue 3 优化？',
                content: '排查与优化：\n\n1. 渲染优化：\n   - 大列表用虚拟滚动（vue-virtual-scroller），只渲染可视区域。\n   - 静态内容用 v-once（只渲染一次）或 v-memo（依赖不变跳过更新）。\n   - 复杂项用 defineAsyncComponent 懒加载。\n\n2. 数据优化：\n   - 分页加载 / 无限滚动，避免一次渲染过多。\n   - 用 shallowRef 替代 ref（大对象不需深层响应式）。\n\n3. 网络优化：\n   - 图片懒加载（v-lazy 或 Intersection Observer）。\n   - 请求并发 + 缓存（用 composable 复用数据）。\n\n4. 编译优化：\n   - 确认 PatchFlag 生效（模板编译产物检查）。\n   - 避免不必要的响应式（markRaw 标记不需要响应式的对象）。\n\n结论：渲染（虚拟滚动）+ 数据（分页/shallowRef）+ 网络（懒加载）+ 编译（PatchFlag）四管齐下。',
              },
              {
                title: 'Q23: 场景题——表单输入后页面不更新，如何排查？',
                content: '排查路径：\n\n1. 检查是否响应式：\n   - 是否用 ref/reactive 包装？直接赋值原始值不响应式。\n   - reactive 对象整体替换（state = newObj）会丢失响应式，需 Object.assign 或用 ref。\n\n2. 检查解构：\n   - 直接解构 reactive（const { count } = state）丢失响应式，用 toRefs 或 storeToRefs。\n\n3. 检查更新方式：\n   - ref 用 .value（data.value = x），不是 data = x。\n   - 数组直接改索引（arr[0] = x）在 Vue 2 不响应式，Vue 3 Proxy 下可以。\n\n4. 检查 key：\n   - v-for 用 index 作 key 可能导致状态错乱。\n\n5. 检查 nextTick：\n   - DOM 更新是异步的，操作更新后的 DOM 需 nextTick。\n\n结论：响应式丢失和解构是最常见原因，优先检查 ref/reactive 使用方式。',
              },
              {
                title: 'Q24: 场景题——SPA 首屏白屏久，如何优化？',
                content: '优化方向：\n\n1. 路由懒加载：component: () => import()，按需加载，减小首屏 bundle。\n2. 代码分割：Vite/Webpack 自动分割，配合 import() 手动分割大模块。\n3. SSR/SSG：用 Nuxt 服务端渲染/静态生成，首屏直出 HTML（SEO + 速度）。\n4. 预加载/预取：路由用 prefetch（router 配置），关键资源用 <link rel="preload">。\n5. 体积优化：\n   - Tree-shaking（按需引入 Element Plus 等 UI 库）。\n   - 按需引入 Lodash（lodash-es）。\n   - gzip/brotli 压缩。\n6. 缓存：HTTP 缓存（强缓存/协商缓存）、Service Worker。\n7. 骨架屏/Loading：用 Suspense fallback 或骨架屏，提升感知速度。\n\n结论：懒加载 + 代码分割 + 压缩是基础，SSR/SSG 是终极方案（Nuxt）。',
              },
              {
                title: 'Q25: 场景题——组件需要"首次进入触发、之后依赖变化才触发"的副作用？',
                content: '方案：\n\n- 用 watch + immediate: true：\n  watch(url, fetchData, { immediate: true })\n  immediate: true 首次立即执行一次，之后依赖变化再触发。\n\n- 不用 watchEffect：\n  watchEffect 总是立即执行且无法关闭，且会自动追踪内部所有响应式依赖（可能意外触发）。\n\n- 不用 onMounted + watch 分开写：\n  两者逻辑重复（onMounted 调一次，watch 依赖变化再调），用 immediate 合并更简洁。\n\n结论：watch + immediate: true 是「首次 + 后续依赖」场景的标准答案。',
              },
              {
                title: 'Q26: 场景题——多个组件共享状态，该用 provide/inject 还是 Pinia？',
                content: '选型：\n\n- provide/inject：\n  - 适合：组件树局部共享（如表单组件 + 子字段），作用域小、不需要跨路由。\n  - 优点：轻量，无需额外库。\n  - 缺点：仅组件树内可用，无 devtools，无持久化，调试难。\n\n- Pinia：\n  - 适合：全局共享（用户信息、购物车、主题），跨路由/组件树。\n  - 优点：devtools 可视化、HMR、持久化插件、TS 友好、可测试。\n  - 缺点：需引入库（约 1KB）。\n\n结论：局部用 provide/inject，全局用 Pinia。复杂状态/跨路由一律 Pinia。',
              },
              {
                title: 'Q27: 场景题——Modal 弹窗被父组件 overflow:hidden 裁剪，如何解决？',
                content: '方案：\n\n- 用 <Teleport to="body">：\n  <Teleport to="body">\n    <Modal v-if="show" />\n  </Teleport>\n  将 Modal 渲染到 body 下，脱离父组件的 overflow/z-index 限制。\n\n- 逻辑不变：\n  - props/emit 正常工作（仍是父子关系）。\n  - v-if 控制显示隐藏。\n  - z-index 在 Modal 组件内设置，确保在最上层。\n\n- 替代方案（不推荐）：\n  - 改父组件 overflow:visible（可能破坏布局）。\n  - 用 fixed 定位 + 高 z-index（仍受父级 transform/filter 影响定位上下文）。\n\n结论：Teleport 是 Vue 3 解决「组件逻辑位置与 DOM 位置不一致」的官方方案。',
              },
              {
                title: 'Q28: 场景题——用户切换路由后，旧页面的请求返回报错，如何处理？',
                content: '问题：\n\n- 组件卸载后请求返回，执行 setState 触发「卸载后更新」警告/报错。\n\n方案：\n\n1. AbortController 取消请求：\n   const controller = new AbortController()\n   fetch(url, { signal: controller.signal })\n   onBeforeUnmount(() => controller.abort())\n\n2. 卸载标志位：\n   let isUnmounted = false\n   onBeforeUnmount(() => { isUnmounted = true })\n   if (!isUnmounted) { data.value = ... }\n\n3. 路由守卫取消（不推荐，组件粒度更合适）。\n\n推荐：AbortController（语义清晰、真正取消网络请求、节省带宽）。\n\n结论：组件卸载时清理副作用（请求/定时器/事件监听）是 Vue 最佳实践。',
              },
              {
                title: 'Q29: 场景题——大型 Vue 项目逻辑复用混乱，如何重构？',
                content: '重构方案：\n\n1. 提取 composable：\n   - 把 mixins 重写为 useXxx 函数（src/composables/）。\n   - 命名：useFetch、useAuth、usePagination。\n   - 返回 ref + 方法，类型完整。\n\n2. 替代 mixins：\n   - mixins 问题：命名冲突、来源不清、无类型、难调试。\n   - composable：显式 import、来源清晰、TS 推断、可测试。\n\n3. 状态管理分层：\n   - 组件局部状态：ref/reactive（表单、UI）。\n   - 跨组件共享：Pinia store（用户、主题）。\n   - 服务端数据：useFetch + 缓存（或 VueQuery）。\n\n4. 目录组织：\n   - composables/（通用逻辑）\n   - stores/（Pinia）\n   - components/（UI）\n   - views/（页面）\n\n结论：mixins → composable 是 Vue 3 逻辑复用的标准重构路径。',
              },
              {
                title: 'Q30: 场景题——i18n 国际化方案选型？',
                content: `方案：\n\n- 推荐vue-i18n@9（Vue 3 版本）：\n  - Composition API：const { t } = useI18n()，t('message.hello')。\n  - 响应式：切换 locale 自动更新所有 t()。\n  - 懒加载：按语言分包 import()。\n\n集成要点：\n1. 创建 i18n 实例，locale + messages。\n2. app.use(i18n)。\n3. 组件内 useI18n() 或模板 $t()。\n4. 持久化用户选择（localStorage）。\n5. 路由/SEO 配合（hreflang、路径前缀 /en/）。\n\n替代：自研轻量方案（reactive locale + 字典），但生态/DX 不如 vue-i18n。\n\n结论：vue-i18n@9 是 Vue 3 国际化标准方案。`,
              },
              {
                title: 'Q31: 对比题——Vue 3 vs React（响应式、模板、编译）？',
                content: '响应式：\n\n- Vue：Proxy 自动追踪依赖，修改即更新（data.value++ 直接改）。\n- React：setState 触发重渲染，不可变数据（setData(d => d+1)）。\n\n模板：\n\n- Vue：模板语法（v-if/v-for），编译优化，DX 友好。\n- React：JSX（JS 表达式），灵活但需手写优化（useMemo）。\n\n编译：\n\n- Vue：编译时分析模板，PatchFlag/静态提升，运行时优化。\n- React：运行时 Virtual DOM diff，React Compiler（实验中）补编译优化。\n\n心智：\n\n- Vue：响应式 + 模板，声明式「数据→视图」。\n- React：函数式 + 不可变，UI = f(state)。\n\n结论：Vue 编译时优化更强，React 灵活性更高，各有取舍。',
              },
              {
                title: 'Q32: 对比题——Pinia vs Vuex？',
                content: '区别：\n\n- mutations：Vuex 必须通过 mutations 改 state（同步）；Pinia 直接在 actions 改（同步/异步）。\n- modules：Vuex 嵌套 modules（命名空间复杂）；Pinia 扁平独立 store（按需 import）。\n- TS：Vuex 类型推断弱（需 ModuleTree 泛型）；Pinia 完整推断。\n- 体积：Pinia 约 1KB，Vuex 较大。\n- Composition：Pinia 与 setup 自然融合；Vuex 需 mapState/mapActions。\n- devtools：两者都支持，Pinia 集成更好。\n\n迁移：Vuex store 可逐步迁移到 Pinia，新项目直接 Pinia。\n\n结论：Pinia 是 Vuex 的简化升级版，Vue 3 官方推荐。',
              },
              {
                title: 'Q33: 对比题——Composition API vs Options API？',
                content: '组织方式：\n\n- Options：按选项分散（data/methods/computed/mounted），逻辑跨选项跳跃。\n- Composition：按功能聚合（一个功能的状态+方法+生命周期在一起），逻辑内聚。\n\n复用：\n\n- Options：mixins（命名冲突、来源不清、无类型）。\n- Composition：composable 函数（显式 import、类型安全、可测试）。\n\n类型：\n\n- Options：TS 推断弱（需 vue-class-component 或 defineComponent）。\n- Composition：TS 推断自然（顶层变量）。\n\n学习曲线：\n\n- Options：简单直观（新手友好）。\n- Composition：需理解响应式/ref/reactive（稍陡）。\n\n结论：新项目/大型项目用 Composition，简单 demo/旧项目可 Options。',
              },
              {
                title: 'Q34: 对比题——computed vs methods？',
                content: '区别：\n\n- computed：基于依赖缓存，依赖不变时读缓存（不重新计算）；必须有返回值；适合派生状态。\n- methods：每次调用都执行；可有副作用；适合事件处理/操作。\n\n场景：\n\n- 派生值（如 fullName = first + last）：用 computed（模板多次用只算一次）。\n- 事件处理（如 submit、toggle）：用 methods。\n- 需传参计算（如 format(date)）：用 methods（computed 不接受参数）。\n\n性能：\n\n- computed 缓存避免重复计算，模板中多次引用同一 computed 只算一次。\n- methods 每次渲染都重新调用。\n\n结论：派生值用 computed，操作/传参用 methods。',
              },
              {
                title: 'Q35: 对比题——provide/inject vs Pinia？',
                content: '区别：\n\n- provide/inject：组件树局部依赖注入；父 provide 子 inject；无 devtools；无持久化；作用域限于组件树。\n- Pinia：全局状态管理；任意组件 useStore；devtools 可视化；HMR；持久化插件；跨路由。\n\n选型：\n\n- provide/inject：表单组件 + 子字段、Modal + 内容、组件库内部传参（如 ConfigProvider）。\n- Pinia：用户信息、购物车、主题、全局配置。\n\n边界：\n\n- 组件树内、作用域小 → provide/inject（轻量）。\n- 跨路由、全局共享 → Pinia（功能全）。\n\n结论：按作用域和功能需求选择，provide/inject 局部，Pinia 全局。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 20：Vue.js 基础速查表
    // ========================================================================
    {
      order: 20,
      title: 'Vue.js 基础速查表',
      difficulty: 1,
      isNew: true,
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          text: 'Vue.js 核心基础知识点速查表，快速回顾响应式、Composition API、组件通信、Pinia、Vue Router、编译优化等关键概念。',
        },
        {
          id: 'p20-2',
          type: 'table',
          caption: 'Vue.js 基础速查表',
          headers: ['知识点', '关键要点', '常用 API / 写法'],
          rows: [
            ['响应式原理', 'Proxy 拦截 get/set，track 收集/trigger 通知', 'reactive(obj) / ref(value)'],
            ['ref', '包装任意值，.value 访问（模板自动解包）', "const count = ref(0); count.value++"],
            ['reactive', '对象/数组 Proxy 代理，深层响应式', "const state = reactive({ count: 0 })"],
            ['computed', '基于依赖缓存的派生值', 'const double = computed(() => count.value * 2)'],
            ['watch', '监听源变化执行副作用，可拿新旧值', "watch(count, (n, o) => {}, { immediate: true })"],
            ['watchEffect', '立即执行自动收集依赖，无旧值', 'watchEffect(() => { /* 用到 count */ })'],
            ['<script setup>', 'SFC 推荐写法，顶层自动暴露', "defineProps / defineEmits / defineExpose"],
            ['defineProps', '编译宏，接收 props', "defineProps<{ title: string }>()"],
            ['defineEmits', '编译宏，声明事件', "defineEmits<{ update: [number] }>()"],
            ['Props/Emits', '父子单向数据流', ':title="x" / @update="onUpdate"'],
            ['v-model', '父子双向绑定（:modelValue + @update）', 'v-model="count" / v-model:title="x"'],
            ['provide/inject', '跨层级依赖注入', "provide('key', readonly(state)) / inject('key')"],
            ['插槽', '默认/具名/作用域', "<slot /> / <slot name=\"h\" /> / v-slot=\"{ item }\""],
            ['Teleport', '渲染到 DOM 其他位置（Modal）', "<Teleport to=\"body\">...</Teleport>"],
            ['Suspense', '等待异步组件/async setup', "<Suspense> #fallback"],
            ['生命周期', 'setup/onMounted/onUpdated/onUnmounted', "onMounted(() => {}) / onBeforeUnmount(() => {})"],
            ['Vue Router 4', '路由库（History/Hash/Memory）', "createWebHistory() / router.beforeEach"],
            ['动态路由', 'path 参数 / 懒加载', "path: '/user/:id' / () => import('./User.vue')"],
            ['Pinia', '官方状态库（无 mutations）', "defineStore('id', () => { ... })"],
            ['storeToRefs', '解构 store 保持响应式', "const { count } = storeToRefs(store)"],
            ['PatchFlag', '编译器标记动态节点类型，靶向 diff', "编译产物带 PatchFlag 标记"],
            ['静态提升', '静态节点提升到 render 外复用', 'hoistStatic 编译优化'],
            ['v-if vs v-show', 'v-if 真渲染（切换贵），v-show CSS（首次贵）', '频繁切 v-show，低概率 v-if'],
            ['key', 'v-for 唯一标识，复用 DOM', ':key="item.id"（禁用 index）'],
          ],
        },
      ],
    },
  ],
}
