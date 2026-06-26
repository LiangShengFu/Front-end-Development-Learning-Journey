/**
 * 模块 11：Vue.js 核心基础
 *
 * 严格遵循 docx/模块十一.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 17 个知识点（16 章节 + 1 小测验）
 * - 17 个可视化演示（6 个新增 Vue 专属组件 + 11 个复用核心组件）
 *
 * 在 React 项目中交付 Vue 3 跨框架教学内容，所有交互均为教学模拟。
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
  knowledgePointCount: 17,
  visualizationCount: 17,
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
          id: 'vue-p1-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue.js 是 Evan You 创建的渐进式 JavaScript 框架。核心哲学是「渐进式增强」——可以从简单的页面交互逐步扩展到完整 SPA。Vue 3 以 Composition API + Proxy 响应式 + 编译优化为核心，是国内存量最大的前端框架之一。',
        },
        {
          id: 'vue-p1-2',
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
          id: 'vue-p1-3',
          type: 'demo',
          visualizationType: 'vue-vs-react-comparator',
          data: {},
        },
        {
          id: 'vue-p1-4',
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
          id: 'vue-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 使用基于 HTML 的模板语法，通过插值 {{ }} 和指令（v-if、v-for、v-model、@click 等）声明式地描述 UI。模板在编译期被优化为渲染函数。',
        },
        {
          id: 'vue-p2-2',
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
          id: 'vue-p2-3',
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
          id: 'vue-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'computed 基于依赖缓存，仅当依赖变化时重新计算；watch/watchEffect 用于执行副作用（API 调用、DOM 操作等）。computed 适合派生状态，watch 适合响应数据变化执行逻辑。',
        },
        {
          id: 'vue-p3-2',
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
          id: 'vue-p3-3',
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
          id: 'vue-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 响应式核心是 reactive（基于 Proxy）和 ref（基于对象包装 + .value）。Proxy 拦截 get/set 操作：get 时收集依赖（track），set 时触发更新（trigger）。这是 Vue 区别于 React 手动 setState 的核心机制，也是面试最高频考点。',
        },
        {
          id: 'vue-p4-2',
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
          id: 'vue-p4-3',
          type: 'demo',
          visualizationType: 'proxy-reactivity-tracker',
          data: {},
        },
        {
          id: 'vue-p4-4',
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
          id: 'vue-p4-5',
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
          id: 'vue-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Composition API 是 Vue 3 的核心逻辑组织方式。`<script setup>` 语法糖简化 boilerplate，Composables（组合式函数）实现逻辑复用，类似 React 自定义 Hook。',
        },
        {
          id: 'vue-p5-2',
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
          id: 'vue-p5-3',
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
          id: 'vue-p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 组件通信遵循单向数据流：Props 向下传递数据，Emits 向上通知事件，Slots 实现内容分发，provide/inject 实现跨层级依赖注入。',
        },
        {
          id: 'vue-p6-2',
          type: 'demo',
          visualizationType: 'vue-component-sandbox',
          data: {},
        },
        {
          id: 'vue-p6-3',
          type: 'demo',
          visualizationType: 'define-emits-workshop',
          data: {},
        },
        {
          id: 'vue-p6-4',
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
          id: 'vue-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'Slots 让父组件向子组件注入内容。默认插槽用于简单内容分发，具名插槽用于多区域布局，作用域插槽允许子组件向 slot 回传数据。',
        },
        {
          id: 'vue-p7-2',
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
          id: 'vue-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 Composition API 的生命周期钩子与 Options API 一一对应。setup() 在 beforeCreate 和 created 之间执行，不再有 beforeCreate/created 钩子。',
        },
        {
          id: 'vue-p8-2',
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
          id: 'vue-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'Options API 按选项（data/methods/computed）组织代码，适合简单组件。Composition API 按逻辑功能聚合，适合复杂组件和逻辑复用。Vue 3 推荐 Composition API + script setup。',
        },
        {
          id: 'vue-p9-2',
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
          id: 'vue-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue Router 是 Vue 官方路由管理器，支持嵌套路由、动态路由、导航守卫和路由懒加载。Vue 3 使用 createRouter + createWebHistory 创建路由实例。',
        },
        {
          id: 'vue-p10-2',
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
          id: 'vue-p10-3',
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
          id: 'vue-p11-1',
          type: 'paragraph',
          lead: true,
          text: 'Pinia 是 Vue 官方推荐的状态管理方案，替代 Vuex。API 更简洁：无 mutations、完整 TypeScript 支持、DevTools 集成。Setup Store 模式与 Composition API 风格一致。',
        },
        {
          id: 'vue-p11-2',
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
          id: 'vue-p11-3',
          type: 'demo',
          visualizationType: 'pinia-store-explorer',
          data: {},
        },
        {
          id: 'vue-p11-4',
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
          id: 'vue-p12-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 引入 Teleport（传送门）、Suspense（异步组件）、Fragment（多根节点）等内置能力。编译器通过 PatchFlag 标记动态节点、静态提升和 Block Tree 扁平化 diff 大幅减少运行时开销。',
        },
        {
          id: 'vue-p12-2',
          type: 'demo',
          visualizationType: 'patch-flag-visualizer',
          data: {},
        },
        {
          id: 'vue-p12-3',
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
          id: 'vue-p13-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 同样使用虚拟 DOM，但编译优化使 diff 范围大幅缩小。Block Tree 仅对比带 PatchFlag 的动态节点，静态子树完全跳过。这与 React Fiber 的运行时调度策略形成对比。',
        },
        {
          id: 'vue-p13-2',
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
          id: 'vue-p14-1',
          type: 'paragraph',
          lead: true,
          text: '自定义指令用于直接操作 DOM 元素。Vue 3 中钩子函数重命名：bind→beforeMount、inserted→mounted、update→beforeUpdate 等。推荐优先使用组件而非指令。',
        },
        {
          id: 'vue-p14-2',
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
          id: 'vue-p15-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 3 移除了实例事件 API（$on/$off/$emit），跨组件通信推荐使用 Pinia 或 mitt 事件总线。mitt 是 200 字节的微型 pub/sub 库，适合非父子组件的轻量通信。',
        },
        {
          id: 'vue-p15-2',
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
          id: 'vue-p16-1',
          type: 'paragraph',
          lead: true,
          text: 'Vue 从 2014 年的个人项目发展为全球主流框架。Vue 3 是一次彻底重写，Proxy 响应式、Composition API 和编译优化使其在性能和 DX 上全面超越 Vue 2。',
        },
        {
          id: 'vue-p16-2',
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
          id: 'vue-p17-1',
          type: 'paragraph',
          lead: true,
          text: '通过 10 道精选测验题检验对 Vue 3 核心概念的掌握程度，覆盖响应式原理、Composition API、组件通信、Pinia、Vue Router、编译优化等高频考点。',
        },
        {
          id: 'vue-p17-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'Vue 3 响应式系统的核心实现是？',
                options: ['Object.defineProperty', 'Proxy', 'Publish-Subscribe', 'EventEmitter'],
                correctIndex: 1,
                explanation: 'Vue 3 使用 Proxy 拦截 get/set 实现响应式，相比 Vue 2 的 Object.defineProperty 可以监听数组索引变化、属性新增/删除，且性能更好。',
              },
              {
                question: 'ref 和 reactive 的主要区别是？',
                options: ['ref 不能用于对象', 'ref 需要 .value 访问，reactive 直接访问属性', 'reactive 不能用于数组', '没有区别'],
                correctIndex: 1,
                explanation: 'ref 包装任意值，通过 .value 访问（模板中自动解包）；reactive 仅用于对象/数组，Proxy 代理后直接访问属性。基本类型必须用 ref。',
              },
              {
                question: 'computed 和 watch 的核心区别是？',
                options: ['computed 更快', 'computed 有缓存且返回派生值，watch 执行副作用', 'watch 不能监听 ref', 'computed 不能用于模板'],
                correctIndex: 1,
                explanation: 'computed 基于依赖缓存，返回计算结果，适合模板中的派生状态。watch/watchEffect 用于执行副作用（API 调用、日志等），无缓存。',
              },
              {
                question: 'defineProps 和 defineEmits 是什么？',
                options: ['运行时函数', '编译宏，编译时处理', 'Vuex actions', 'Router 守卫'],
                correctIndex: 1,
                explanation: 'defineProps 和 defineEmits 是 `<script setup>` 中的编译宏，在编译阶段处理，不需要 import，也不是运行时函数调用。',
              },
              {
                question: 'Pinia 相比 Vuex 的主要优势不包括？',
                options: ['无 mutations', '更好的 TypeScript 支持', '内置 modules 嵌套', '更简洁的 API'],
                correctIndex: 2,
                explanation: 'Pinia 没有 modules 嵌套概念（用多个独立 store 文件替代），也没有 mutations。它提供更简洁的 API 和更好的 TS 支持。',
              },
              {
                question: 'Vue Router 中 beforeEach 守卫的作用是？',
                options: ['路由渲染后执行', '路由切换前执行，可做鉴权拦截', '仅对组件内守卫生效', '替代 component 配置'],
                correctIndex: 1,
                explanation: 'beforeEach 是全局前置守卫，在每次路由切换前执行。可通过 next() 控制导航：放行、重定向或取消。常用于登录鉴权。',
              },
              {
                question: 'PatchFlag 的作用是？',
                options: ['标记 CSS 类名', '编译器标记动态节点类型，靶向 diff', '路由元信息', 'Pinia store ID'],
                correctIndex: 1,
                explanation: 'PatchFlag 是 Vue 3 编译器为动态节点设置的位掩码标记（TEXT/CLASS/STYLE/PROPS 等），运行时仅 diff 带 PatchFlag 的节点，跳过静态子树。',
              },
              {
                question: 'Teleport 组件的作用是？',
                options: ['路由跳转', '将内容渲染到 DOM 其他位置', '状态管理', '异步加载'],
                correctIndex: 1,
                explanation: 'Teleport 将组件内容渲染到 DOM 树的其他位置（如 body），常用于 Modal、Toast 等需要脱离父组件 overflow/z-index 限制的场景。',
              },
              {
                question: 'storeToRefs 的作用是？',
                options: ['创建新 store', '解构 store 时保持响应式', '重置 store 状态', '订阅 store 变化'],
                correctIndex: 1,
                explanation: '直接解构 Pinia store 会丢失响应式。storeToRefs 将 state 和 getters 转为 ref，解构后仍保持响应式。actions 可直接解构（无需 storeToRefs）。',
              },
              {
                question: 'Vue 3 中 setup() 的执行时机是？',
                options: ['mounted 之后', 'beforeCreate 和 created 之间', 'beforeMount 之前', '组件卸载时'],
                correctIndex: 1,
                explanation: 'setup() 在 beforeCreate 和 created 之间执行，此时 props 已解析但 DOM 未挂载。`<script setup>` 是 setup() 的语法糖。',
              },
            ],
          },
        },
      ],
    },
  ],
}
