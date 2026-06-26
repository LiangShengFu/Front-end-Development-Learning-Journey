/**
 * PiniaStoreExplorer — Pinia Store 交互探索器
 *
 * 模拟 defineStore → state → getters → actions 的完整 Pinia 使用链路。
 * ⚠️ 教学模拟：用 useReducer 模拟 Pinia 响应式 store，非真实 Pinia 运行时。
 */
import { useCallback, useReducer, useRef, useState } from 'react'
import type { PiniaStoreExplorerData, PiniaStoreTemplate } from '../../../lib/vue-visualization-types'
import { cn } from '../../../lib/utils'

interface PiniaStoreExplorerProps {
  data?: PiniaStoreExplorerData
}

type StoreLog = { id: number; action: string; detail: string }

const DEFAULT_TEMPLATES: PiniaStoreTemplate[] = [
  {
    id: 'counter',
    label: 'Counter Store',
    description: '最基础的计数器 store，演示 state + getter + action',
    defineStoreCode: `export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() { count.value++ }
  function decrement() { count.value-- }
  return { count, double, increment, decrement }
})`,
    initialState: { count: 0 },
    getters: [{ name: 'double', compute: (s) => (s.count as number) * 2 }],
    actions: [
      { name: 'increment', label: '+1', execute: (s) => ({ count: (s.count as number) + 1 }) },
      { name: 'decrement', label: '-1', execute: (s) => ({ count: (s.count as number) - 1 }) },
      { name: 'reset', label: 'Reset', execute: () => ({ count: 0 }) },
    ],
  },
  {
    id: 'user',
    label: 'User Store',
    description: '用户信息 store，演示复杂 state 与 getter',
    defineStoreCode: `export const useUserStore = defineStore('user', () => {
  const name = ref('Guest')
  const loginCount = ref(0)
  const greeting = computed(() => \`Hello, \${name.value}!\`)
  function login(username: string) {
    name.value = username
    loginCount.value++
  }
  return { name, loginCount, greeting, login }
})`,
    initialState: { name: 'Guest', loginCount: 0 },
    getters: [{ name: 'greeting', compute: (s) => `Hello, ${s.name}!` }],
    actions: [
      {
        name: 'login',
        label: 'Login as Alice',
        execute: (s) => ({ name: 'Alice', loginCount: (s.loginCount as number) + 1 }),
      },
      {
        name: 'logout',
        label: 'Logout',
        execute: () => ({ name: 'Guest', loginCount: 0 }),
      },
    ],
  },
  {
    id: 'cart',
    label: 'Cart Store',
    description: '购物车 store，演示 $patch 式批量更新',
    defineStoreCode: `export const useCartStore = defineStore('cart', () => {
  const items = ref(0)
  const total = ref(0)
  const itemTotal = computed(() => items.value * 29.9)
  function addItem() { items.value++; total.value = items.value * 29.9 }
  return { items, total, itemTotal, addItem }
})`,
    initialState: { items: 0, total: 0 },
    getters: [{ name: 'itemTotal', compute: (s) => ((s.items as number) * 29.9).toFixed(2) }],
    actions: [
      {
        name: 'addItem',
        label: 'Add Item',
        execute: (s) => {
          const items = (s.items as number) + 1
          return { items, total: items * 29.9 }
        },
      },
      {
        name: 'clear',
        label: 'Clear Cart',
        execute: () => ({ items: 0, total: 0 }),
      },
    ],
  },
]

export function PiniaStoreExplorer({ data }: PiniaStoreExplorerProps) {
  const templates = data?.templates ?? DEFAULT_TEMPLATES
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? 'counter')
  const template = templates.find((t) => t.id === templateId) ?? templates[0]

  const [state, dispatch] = useReducer(
    (_prev: Record<string, number | string>, action: { type: string; payload?: Record<string, number | string> }) => {
      if (action.type === 'INIT') return action.payload ?? template.initialState
      if (action.type === 'ACTION' && action.payload) return action.payload
      return _prev
    },
    template.initialState,
  )

  const [logs, setLogs] = useState<StoreLog[]>([])
  const logIdRef = useRef(0)

  const addLog = useCallback((action: string, detail: string) => {
    logIdRef.current += 1
    setLogs((prev) => [...prev.slice(-19), { id: logIdRef.current, action, detail }])
  }, [])

  const selectTemplate = (id: string) => {
    const t = templates.find((tpl) => tpl.id === id)
    if (t) {
      setTemplateId(id)
      dispatch({ type: 'INIT', payload: t.initialState })
      setLogs([])
    }
  }

  const runAction = (actionDef: PiniaStoreTemplate['actions'][0]) => {
    const newState = actionDef.execute(state)
    dispatch({ type: 'ACTION', payload: newState })
    addLog(actionDef.name, `$patch → ${JSON.stringify(newState)}`)
  }

  const getterValues = template.getters.map((g) => ({
    name: g.name,
    value: g.compute(state),
  }))

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：用 React useReducer 模拟 Pinia store 的 state/getter/action 响应式更新链路。
      </div>

      {/* 模板切换 */}
      <div className="flex flex-wrap gap-sm">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => selectTemplate(t.id)}
            className={cn(
              'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
              templateId === t.id
                ? 'border-[#42b883] bg-[#42b883]/10 text-[#42b883]'
                : 'border-hairline text-body-mid hover:border-body-mid',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-body-sm text-body-mid">{template.description}</p>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        {/* 左侧：defineStore 代码 */}
        <div>
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            defineStore 定义
          </h4>
          <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink">
            <code>{template.defineStoreCode}</code>
          </pre>
        </div>

        {/* 右侧：运行时面板 */}
        <div className="space-y-md">
          <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
            <h4 className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#42b883]">
              State（storeToRefs）
            </h4>
            <div className="space-y-xs font-mono text-body-sm">
              {Object.entries(state).map(([key, val]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-body-mid">{key}</span>
                  <span className="text-ink">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
            <h4 className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
              Getters（computed）
            </h4>
            <div className="space-y-xs font-mono text-body-sm">
              {getterValues.map((g) => (
                <div key={g.name} className="flex justify-between">
                  <span className="text-body-mid">{g.name}</span>
                  <span className="text-ink">{String(g.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-sm">
            {template.actions.map((action) => (
              <button
                key={action.name}
                type="button"
                onClick={() => runAction(action)}
                className="btn-pill border-[#42b883] bg-[#42b883]/10 text-[#42b883] hover:bg-[#42b883]/20"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 操作日志 */}
      {logs.length > 0 && (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            Store 操作日志
          </h4>
          <div className="space-y-xs font-mono text-caption-mono-sm text-body">
            {logs.map((log) => (
              <div key={log.id}>
                <span className="text-[#42b883]">{log.action}</span>: {log.detail}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
