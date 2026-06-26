/**
 * ComposableFlowVisualizer — Composable 协同流向可视化
 *
 * 可视化多个 Composable 函数如何组合工作。以依赖链（如
 * useAuth → usePermissions → useRouteGuard）为例，展示每个 Composable 的
 * 输入/输出类型与响应式联动关系。点击节点高亮其上下游依赖。
 *
 * ⚠️ 教学模拟：用 React state 模拟 Composable 之间的数据流向，非真实 Vue 运行时。
 */
import { useMemo, useState } from 'react'
import type {
  ComposableFlowVisualizerData,
  ComposableChain,
} from '../../../lib/vue-advanced-visualization-types'
import { cn } from '../../../lib/utils'

interface ComposableFlowVisualizerProps {
  data?: ComposableFlowVisualizerData
}

/** 默认组合链场景 */
const DEFAULT_SCENARIOS: ComposableChain[] = [
  {
    id: 'auth',
    label: '用户认证链',
    description: 'useAuth 提供登录态，usePermissions 基于角色计算权限，useRouteGuard 据此拦截路由。',
    composables: [
      {
        name: 'useAuth',
        inputs: ['localStorage', 'loginApi()'],
        outputs: ['user', 'isLoggedIn', 'login()', 'logout()'],
        code: `export function useAuth() {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  async function login(credentials) {
    user.value = await loginApi(credentials)
  }
  function logout() { user.value = null }

  return { user, isLoggedIn, login, logout }
}`,
      },
      {
        name: 'usePermissions',
        inputs: ['user (from useAuth)'],
        outputs: ['permissions', 'can(action)'],
        code: `export function usePermissions(auth: ReturnType<typeof useAuth>) {
  const permissions = computed(() =>
    auth.user.value?.roles.flatMap(r => roleMap[r]) ?? []
  )
  function can(action: string) {
    return permissions.value.includes(action)
  }
  return { permissions, can }
}`,
      },
      {
        name: 'useRouteGuard',
        inputs: ['isLoggedIn', 'can()'],
        outputs: ['guard(route)'],
        code: `export function useRouteGuard(
  auth: ReturnType<typeof useAuth>,
  perm: ReturnType<typeof usePermissions>,
) {
  function guard(route: RouteLocation) {
    if (!auth.isLoggedIn.value) return '/login'
    if (route.meta.requires && !perm.can(route.meta.requires))
      return '/403'
  }
  return { guard }
}`,
      },
    ],
    connections: [
      { from: 'useAuth', to: 'usePermissions', label: 'user / isLoggedIn' },
      { from: 'useAuth', to: 'useRouteGuard', label: 'isLoggedIn' },
      { from: 'usePermissions', to: 'useRouteGuard', label: 'can()' },
    ],
  },
  {
    id: 'fetch',
    label: '数据获取链',
    description: 'useFetch 拉取数据，usePagination 管理分页，useTableState 组合为表格状态。',
    composables: [
      {
        name: 'useFetch',
        inputs: ['url', 'options'],
        outputs: ['data', 'pending', 'error', 'refresh()'],
        code: `export function useFetch<T>(url: MaybeRef<string>) {
  const data = ref<T | null>(null)
  const pending = ref(false)
  const error = ref(null)

  async function refresh() {
    pending.value = true
    try { data.value = await $fetch(unref(url)) }
    catch (e) { error.value = e }
    finally { pending.value = false }
  }
  watchEffect(refresh)
  return { data, pending, error, refresh }
}`,
      },
      {
        name: 'usePagination',
        inputs: ['total', 'pageSize'],
        outputs: ['page', 'totalPages', 'next()', 'prev()'],
        code: `export function usePagination(total: Ref<number>, pageSize = 10) {
  const page = ref(1)
  const totalPages = computed(() => Math.ceil(total.value / pageSize))
  const next = () => { if (page.value < totalPages.value) page.value++ }
  const prev = () => { if (page.value > 1) page.value-- }
  return { page, totalPages, next, prev }
}`,
      },
      {
        name: 'useTableState',
        inputs: ['data', 'page', 'totalPages'],
        outputs: ['rows', 'isLoading', 'hasNext'],
        code: `export function useTableState(
  fetch: ReturnType<typeof useFetch>,
  pager: ReturnType<typeof usePagination>,
) {
  const rows = computed(() => fetch.data.value ?? [])
  const isLoading = computed(() => fetch.pending.value)
  const hasNext = computed(() => pager.page.value < pager.totalPages.value)
  return { rows, isLoading, hasNext }
}`,
      },
    ],
    connections: [
      { from: 'useFetch', to: 'usePagination', label: 'data.length → total' },
      { from: 'useFetch', to: 'useTableState', label: 'data / pending' },
      { from: 'usePagination', to: 'useTableState', label: 'page / totalPages' },
    ],
  },
  {
    id: 'form',
    label: '表单验证链',
    description: 'useField 管理单字段，useValidation 汇总校验，useSubmit 控制提交态。',
    composables: [
      {
        name: 'useField',
        inputs: ['initialValue', 'rules[]'],
        outputs: ['value', 'error', 'touched', 'validate()'],
        code: `export function useField(initial: string, rules: Rule[]) {
  const value = ref(initial)
  const error = ref('')
  const touched = ref(false)
  function validate() {
    error.value = rules.find(r => !r.test(value.value))?.message ?? ''
    return !error.value
  }
  return { value, error, touched, validate }
}`,
      },
      {
        name: 'useValidation',
        inputs: ['fields[]'],
        outputs: ['isValid', 'errors', 'validateAll()'],
        code: `export function useValidation(fields: Record<string, ReturnType<typeof useField>>) {
  const isValid = computed(() =>
    Object.values(fields).every(f => !f.error.value)
  )
  const errors = computed(() =>
    Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v.error.value]))
  )
  function validateAll() {
    return Object.values(fields).every(f => f.validate())
  }
  return { isValid, errors, validateAll }
}`,
      },
      {
        name: 'useSubmit',
        inputs: ['isValid', 'validateAll()', 'submitFn'],
        outputs: ['submit()', 'submitting', 'success'],
        code: `export function useSubmit(
  validation: ReturnType<typeof useValidation>,
  submitFn: () => Promise<void>,
) {
  const submitting = ref(false)
  const success = ref(false)
  async function submit() {
    if (!validation.validateAll()) return
    submitting.value = true
    try { await submitFn(); success.value = true }
    finally { submitting.value = false }
  }
  return { submit, submitting, success }
}`,
      },
    ],
    connections: [
      { from: 'useField', to: 'useValidation', label: 'fields' },
      { from: 'useValidation', to: 'useSubmit', label: 'isValid / validateAll' },
    ],
  },
]

export function ComposableFlowVisualizer({ data }: ComposableFlowVisualizerProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [chainId, setChainId] = useState(scenarios[0]?.id ?? 'auth')
  const [selectedName, setSelectedName] = useState<string | null>(null)

  const chain = scenarios.find((s) => s.id === chainId) ?? scenarios[0]

  /** 选中节点的上下游 Composable 名称集合 */
  const connectedNames = useMemo(() => {
    if (!selectedName) return new Set<string>()
    const set = new Set<string>([selectedName])
    chain?.connections.forEach((c) => {
      if (c.from === selectedName) set.add(c.to)
      if (c.to === selectedName) set.add(c.from)
    })
    return set
  }, [selectedName, chain])

  const selected = chain?.composables.find((c) => c.name === selectedName) ?? null

  // 切换场景时重置选中
  const handleSwitch = (id: string) => {
    setChainId(id)
    setSelectedName(null)
  }

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：用 React state 模拟 Composable 之间的数据流向，用于理解组合式逻辑复用模式。
      </div>

      {/* 场景选择器 */}
      <div className="flex flex-wrap gap-sm">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => handleSwitch(s.id)}
            className={cn(
              'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
              chainId === s.id
                ? 'border-[#42b883] bg-[#42b883]/10 text-[#42b883]'
                : 'border-hairline text-body-mid hover:border-body-mid',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      {chain && <p className="text-body-sm text-body-mid">{chain.description}</p>}

      {/* Composable 流向图 */}
      <div className="overflow-x-auto rounded-sm border border-hairline bg-canvas-card p-lg">
        <div className="flex min-w-max items-stretch gap-xs">
          {chain?.composables.map((node, i) => {
            const isSelected = selectedName === node.name
            const isConnected = connectedNames.has(node.name) && !isSelected
            return (
              <div key={node.name} className="flex items-center gap-xs">
                <button
                  type="button"
                  onClick={() => setSelectedName(isSelected ? null : node.name)}
                  className={cn(
                    'w-[180px] shrink-0 rounded-sm border p-md text-left transition-all',
                    isSelected && 'border-[#42b883] bg-[#42b883]/10 shadow-sm',
                    isConnected && 'border-[#61dafb]/60 bg-[#61dafb]/5',
                    !isSelected && !isConnected && 'border-hairline hover:border-body-mid',
                  )}
                >
                  <div
                    className={cn(
                      'font-mono text-body-sm font-bold',
                      isSelected ? 'text-[#42b883]' : 'text-ink',
                    )}
                  >
                    {node.name}()
                  </div>
                  <div className="mt-xs space-y-xs">
                    <div className="font-mono text-caption-mono-sm text-body-mid">
                      <span className="text-accent-dusk">in</span> {node.inputs.join(', ')}
                    </div>
                    <div className="font-mono text-caption-mono-sm text-body-mid">
                      <span className="text-[#42b883]">out</span> {node.outputs.join(', ')}
                    </div>
                  </div>
                </button>
                {i < chain.composables.length - 1 && (
                  <span className="shrink-0 text-body-mid" aria-hidden>
                    →
                  </span>
                )}
              </div>
            )
          })}
        </div>
        <p className="mt-md font-mono text-caption-mono-sm text-body-mid">
          点击节点查看实现代码与上下游依赖；高亮 <span className="text-[#61dafb]">蓝色</span> 表示与当前选中节点直接联动。
        </p>
      </div>

      {/* 选中节点的实现代码 */}
      {selected ? (
        <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
          <div>
            <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#42b883]">
              {selected.name}() · 实现
            </h4>
            <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink">
              <code>{selected.code}</code>
            </pre>
          </div>
          <div className="space-y-md">
            <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
              <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
                输入依赖
              </h4>
              <div className="flex flex-wrap gap-xs">
                {selected.inputs.map((inp) => (
                  <span
                    key={inp}
                    className="rounded-sm border border-accent-dusk/40 bg-accent-dusk/5 px-sm py-xs font-mono text-caption-mono-sm text-accent-dusk"
                  >
                    {inp}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
              <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#42b883]">
                输出（暴露的响应式接口）
              </h4>
              <div className="flex flex-wrap gap-xs">
                {selected.outputs.map((out) => (
                  <span
                    key={out}
                    className="rounded-sm border border-[#42b883]/40 bg-[#42b883]/5 px-sm py-xs font-mono text-caption-mono-sm text-[#42b883]"
                  >
                    {out}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
              <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                联动连线
              </h4>
              <ul className="space-y-xs font-mono text-caption-mono-sm text-body">
                {chain?.connections
                  .filter((c) => c.from === selected.name || c.to === selected.name)
                  .map((c, i) => (
                    <li key={i}>
                      <span className="text-[#42b883]">{c.from}</span>
                      <span className="text-body-mid"> → </span>
                      <span className="text-[#61dafb]">{c.to}</span>
                      <span className="text-body-mid"> · {c.label}</span>
                    </li>
                  ))}
                {chain?.connections.every((c) => c.from !== selected.name && c.to !== selected.name) && (
                  <li className="text-body-mid">该 Composable 为链路起点，无上游依赖。</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-hairline bg-canvas-soft p-lg text-center">
          <p className="text-body-sm text-body-mid">选择上方任一 Composable 节点，查看其实现代码与依赖关系。</p>
        </div>
      )}
    </div>
  )
}
