/**
 * VueVsReactComparator — Vue vs React 交互式框架对比器
 *
 * 五维度可切换对比 Vue 3 与 React 18+ 的核心差异。
 * ⚠️ 教学模拟：在 React 项目中展示 Vue 概念对比，非框架实际运行。
 */
import { useState } from 'react'
import type {
  VueVsReactComparatorData,
  ComparisonDimension,
  FrameworkComparisonPoint,
} from '../../../lib/vue-visualization-types'
import { cn } from '../../../lib/utils'

interface VueVsReactComparatorProps {
  data?: VueVsReactComparatorData
}

const VUE_COLOR = '#42b883'
const REACT_COLOR = '#61dafb'

const DEFAULT_POINTS: FrameworkComparisonPoint[] = [
  {
    id: 'reactivity',
    label: '响应式模型',
    characteristic: '数据变化如何被框架感知并驱动 UI 更新',
    vueCode: `const state = reactive({ count: 0 })
// 自动追踪：读取 count 时收集依赖
// 修改 count 时自动触发相关 effect
state.count++`,
    vueExplanation: 'Vue 3 基于 Proxy 自动追踪依赖。访问响应式属性时收集依赖，修改时精确通知相关 effect，实现细粒度更新。',
    reactCode: `const [count, setCount] = useState(0)
// 手动触发：必须调用 setState
setCount(c => c + 1)`,
    reactExplanation: 'React 采用手动不可变更新。调用 setState 后触发组件重渲染，由 React 调度决定何时 commit。',
    diffHighlights: ['Proxy 自动追踪 vs 手动 setState', '细粒度 effect 更新 vs 组件级重渲染'],
  },
  {
    id: 'template',
    label: '模板语法',
    characteristic: 'UI 描述方式与编译策略',
    vueCode: `<template>
  <div v-if="show">{{ msg }}</div>
  <button @click="count++">+</button>
</template>`,
    vueExplanation: 'Vue 使用 HTML 模板 + 指令（v-if/v-for/@click）。模板在编译期优化，运行时开销小。',
    reactCode: `function App() {
  return show ? (
    <div>{msg}</div>
  ) : null
}`,
    reactExplanation: 'React 使用 JSX（JavaScript 语法扩展），UI 即 JavaScript 表达式，灵活性高但需运行时处理。',
    diffHighlights: ['模板编译 + 指令 vs JSX 表达式', '编译期优化 vs 运行时 createElement'],
  },
  {
    id: 'composition',
    label: '组件逻辑组织',
    characteristic: '逻辑复用与代码组织方式',
    vueCode: `<script setup>
const count = ref(0)
const doubled = computed(() => count.value * 2)
onMounted(() => console.log('mounted'))
</script>`,
    vueExplanation: 'Composition API + script setup：相关逻辑聚合在一起，通过 composables 复用，类型推导友好。',
    reactCode: `function Counter() {
  const [count, setCount] = useState(0)
  const doubled = useMemo(() => count * 2, [count])
  useEffect(() => console.log('mounted'), [])
}`,
    reactExplanation: 'React Hooks：每个 hook 独立调用，逻辑分散在组件函数体中，通过自定义 Hook 复用。',
    diffHighlights: ['script setup 语法糖 vs Hooks 规则', 'composables vs 自定义 Hook'],
  },
  {
    id: 'update',
    label: '状态更新',
    characteristic: '状态变更后的更新粒度',
    vueCode: `// 仅依赖 count 的 computed 和 DOM 更新
state.count++
// 不依赖 count 的部分不会重渲染`,
    vueExplanation: '细粒度更新：Proxy 追踪到具体属性，仅通知依赖该属性的 effect（render/computed/watch）。',
    reactCode: `setCount(c => c + 1)
// 整个函数组件重新执行
// 子组件可能因 props 引用变化而重渲染`,
    reactExplanation: '整体重渲染：setState 后函数组件完整重执行，React.memo/useMemo 用于优化跳过。',
    diffHighlights: ['属性级精确更新 vs 组件级重渲染', '自动依赖追踪 vs 手动 memo 优化'],
  },
  {
    id: 'compile',
    label: '编译优化',
    characteristic: '编译器如何减少运行时开销',
    vueCode: `// 编译器标记 PatchFlag
// 静态节点提升到渲染函数外
// Block Tree 扁平化 diff`,
    vueExplanation: 'Vue 编译器分析模板，标记动态节点 PatchFlag，静态提升减少 diff 范围，靶向更新。',
    reactCode: `// JSX 编译为 createElement
// Fiber 架构调度优先级
// useMemo 手动缓存计算`,
    reactExplanation: 'React 依赖 Fiber 架构做运行时调度（优先级/可中断），编译优化相对较弱，靠手动 memo。',
    diffHighlights: ['PatchFlag 靶向 diff vs Fiber 调度', '编译期静态提升 vs 运行时优先级'],
  },
]

export function VueVsReactComparator({ data }: VueVsReactComparatorProps) {
  const points = data?.comparisonPoints ?? DEFAULT_POINTS
  const [dimension, setDimension] = useState<ComparisonDimension>(points[0]?.id ?? 'reactivity')
  const current = points.find((p) => p.id === dimension) ?? points[0]

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：此演示在 React 项目中对比 Vue 3 与 React 18+ 的设计差异，帮助建立跨框架认知。
      </div>

      {/* 维度切换 */}
      <div className="flex flex-wrap gap-sm" role="tablist" aria-label="对比维度">
        {points.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={dimension === p.id}
            onClick={() => setDimension(p.id)}
            className={cn(
              'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] transition-colors',
              dimension === p.id
                ? 'border-accent-sunset bg-accent-sunset/10 text-accent-sunset'
                : 'border-hairline text-body-mid hover:border-body-mid',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 特性描述 */}
      <div className="rounded-sm border border-hairline bg-canvas-soft px-lg py-md">
        <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          对比焦点
        </div>
        <p className="mt-xs text-body-md text-ink">{current.characteristic}</p>
      </div>

      {/* 差异高亮 */}
      <div className="flex flex-wrap gap-sm">
        {current.diffHighlights.map((h) => (
          <span
            key={h}
            className="rounded-pill border border-accent-dusk/40 bg-accent-dusk/10 px-md py-xs font-mono text-caption-mono-sm text-accent-dusk"
          >
            {h}
          </span>
        ))}
      </div>

      {/* 双栏对比 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        {/* Vue 侧 */}
        <div className="rounded-sm border-2 bg-canvas-card p-lg" style={{ borderColor: `${VUE_COLOR}66` }}>
          <div className="mb-md flex items-center gap-sm">
            <span
              className="rounded-pill px-md py-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-white"
              style={{ backgroundColor: VUE_COLOR }}
            >
              Vue 3
            </span>
          </div>
          <pre className="overflow-x-auto rounded-sm bg-canvas-soft p-md font-mono text-body-sm text-ink">
            <code>{current.vueCode}</code>
          </pre>
          <p className="mt-md text-body-sm text-body">{current.vueExplanation}</p>
        </div>

        {/* React 侧 */}
        <div className="rounded-sm border-2 bg-canvas-card p-lg" style={{ borderColor: `${REACT_COLOR}66` }}>
          <div className="mb-md flex items-center gap-sm">
            <span
              className="rounded-pill px-md py-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink"
              style={{ backgroundColor: REACT_COLOR }}
            >
              React 18+
            </span>
          </div>
          <pre className="overflow-x-auto rounded-sm bg-canvas-soft p-md font-mono text-body-sm text-ink">
            <code>{current.reactCode}</code>
          </pre>
          <p className="mt-md text-body-sm text-body">{current.reactExplanation}</p>
        </div>
      </div>
    </div>
  )
}
