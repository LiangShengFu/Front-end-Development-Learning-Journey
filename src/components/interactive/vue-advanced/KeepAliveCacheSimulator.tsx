/**
 * KeepAliveCacheSimulator — KeepAlive 缓存策略模拟器
 *
 * 可视化 <KeepAlive> 组件的缓存策略：模拟 5 个 Tab 页面，展示 LRU 缓存淘汰、
 * include/exclude 白名单/黑名单过滤、max 最大缓存数限制。
 * - 被缓存的 Tab 切换回时保持「渲染次数」不重置（缓存命中）
 * - 未缓存/被淘汰的 Tab 重新进入时「渲染次数」+1（重新挂载）
 *
 * ⚠️ 教学模拟：用 useReducer 模拟 KeepAlive 的 LRU 缓存行为，非真实 Vue 运行时。
 */
import { useReducer } from 'react'
import type { KeepAliveCacheSimulatorData, KeepAliveTab } from '../../../lib/vue-advanced-visualization-types'
import { cn } from '../../../lib/utils'

interface KeepAliveCacheSimulatorProps {
  data?: KeepAliveCacheSimulatorData
}

const DEFAULT_TABS: KeepAliveTab[] = [
  { id: 'home', label: 'Home' },
  { id: 'users', label: 'Users' },
  { id: 'settings', label: 'Settings' },
  { id: 'reports', label: 'Reports' },
  { id: 'admin', label: 'Admin' },
]

type FilterMode = 'none' | 'include' | 'exclude'

interface KeepAliveState {
  activeTab: string
  /** 每个 Tab 的渲染（挂载）次数 */
  renderCounts: Record<string, number>
  /** LRU 缓存队列：index 0 = 最久未使用（将被淘汰），末尾 = 最近使用 */
  cacheOrder: string[]
  cacheHits: number
  max: number
  filterMode: FilterMode
  filterSet: string[]
}

type Action =
  | { type: 'SWITCH'; tabId: string }
  | { type: 'SET_MAX'; max: number }
  | { type: 'SET_FILTER'; mode: FilterMode; filterSet: string[] }
  | { type: 'RESET'; initial: KeepAliveState }

/** 判断某 Tab 是否可被缓存 */
function isCacheable(state: KeepAliveState, tabId: string): boolean {
  if (state.filterMode === 'none') return true
  if (state.filterMode === 'include') return state.filterSet.includes(tabId)
  return !state.filterSet.includes(tabId)
}

function createInitial(tabs: KeepAliveTab[], max: number): KeepAliveState {
  const first = tabs[0]?.id ?? ''
  return {
    activeTab: first,
    renderCounts: first ? { [first]: 1 } : {},
    cacheOrder: first ? [first] : [],
    cacheHits: 0,
    max,
    filterMode: 'none',
    filterSet: [],
  }
}

function reducer(state: KeepAliveState, action: Action): KeepAliveState {
  switch (action.type) {
    case 'SWITCH': {
      const { tabId } = action
      if (tabId === state.activeTab) return state
      const cacheable = isCacheable(state, tabId)
      let cacheOrder = [...state.cacheOrder]
      let renderCounts = state.renderCounts
      let cacheHits = state.cacheHits

      if (cacheable && cacheOrder.includes(tabId)) {
        // 缓存命中：移到 MRU，不重新挂载
        cacheOrder = [...cacheOrder.filter((id) => id !== tabId), tabId]
        cacheHits += 1
      } else {
        // 重新挂载：渲染次数 +1
        renderCounts = { ...renderCounts, [tabId]: (renderCounts[tabId] ?? 0) + 1 }
        if (cacheable) {
          cacheOrder = [...cacheOrder, tabId]
          // 超过 max 时淘汰 LRU（队列头部）
          while (cacheOrder.length > state.max) cacheOrder.shift()
        }
      }
      return { ...state, activeTab: tabId, cacheOrder, renderCounts, cacheHits }
    }
    case 'SET_MAX': {
      const cacheOrder = [...state.cacheOrder]
      while (cacheOrder.length > action.max) cacheOrder.shift()
      return { ...state, max: action.max, cacheOrder }
    }
    case 'SET_FILTER': {
      const { mode, filterSet } = action
      const cacheable = (id: string) =>
        mode === 'none' ? true : mode === 'include' ? filterSet.includes(id) : !filterSet.includes(id)
      // 过滤变化后，从缓存中移除不再可缓存的 Tab
      const cacheOrder = state.cacheOrder.filter(cacheable)
      return { ...state, filterMode: mode, filterSet, cacheOrder }
    }
    case 'RESET':
      return action.initial
    default:
      return state
  }
}

export function KeepAliveCacheSimulator({ data }: KeepAliveCacheSimulatorProps) {
  const tabs = data?.tabs ?? DEFAULT_TABS
  const defaultMax = data?.defaultMax ?? 3
  const [state, dispatch] = useReducer(reducer, { tabs, max: defaultMax }, (init) =>
    createInitial(init.tabs, init.max),
  )

  const tabLabel = (id: string) => tabs.find((t) => t.id === id)?.label ?? id

  const toggleFilterMember = (id: string) => {
    const set = state.filterSet.includes(id)
      ? state.filterSet.filter((x) => x !== id)
      : [...state.filterSet, id]
    dispatch({ type: 'SET_FILTER', mode: state.filterMode, filterSet: set })
  }

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：用 React useReducer 模拟 KeepAlive 的 LRU 缓存行为。切换 Tab 观察缓存命中与淘汰。
      </div>

      {/* 控制面板 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
        {/* max 缓存数 */}
        <div className="rounded-sm border border-hairline bg-canvas-card p-md">
          <div className="mb-xs flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              max 缓存数
            </span>
            <span className="font-mono text-display-xs text-[#42b883]">{state.max}</span>
          </div>
          <input
            type="range"
            min={1}
            max={tabs.length}
            step={1}
            value={state.max}
            onChange={(e) => dispatch({ type: 'SET_MAX', max: Number(e.target.value) })}
            className="w-full accent-[#42b883]"
            aria-label="最大缓存数"
          />
        </div>

        {/* include/exclude 过滤模式 */}
        <div className="rounded-sm border border-hairline bg-canvas-card p-md lg:col-span-2">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            include / exclude 过滤
          </div>
          <div className="flex flex-wrap items-center gap-sm">
            {(['none', 'include', 'exclude'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => dispatch({ type: 'SET_FILTER', mode: m, filterSet: state.filterSet })}
                className={cn(
                  'rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
                  state.filterMode === m
                    ? 'border-[#42b883] bg-[#42b883]/10 text-[#42b883]'
                    : 'border-hairline text-body-mid hover:border-body-mid',
                )}
              >
                {m === 'none' ? '全部缓存' : m === 'include' ? '白名单' : '黑名单'}
              </button>
            ))}
            {state.filterMode !== 'none' && (
              <div className="flex flex-wrap gap-xs">
                {tabs.map((t) => {
                  const on = state.filterSet.includes(t.id)
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleFilterMember(t.id)}
                      className={cn(
                        'rounded-sm border px-sm py-xs font-mono text-caption-mono-sm transition-colors',
                        on
                          ? 'border-accent-dusk bg-accent-dusk/10 text-accent-dusk'
                          : 'border-hairline text-body-mid hover:border-body-mid',
                      )}
                    >
                      {on ? '✓ ' : ''}
                      {t.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1fr_260px]">
        {/* 左侧：Tab 区 */}
        <div className="space-y-md">
          {/* Tab 按钮 */}
          <div className="flex flex-wrap gap-sm">
            {tabs.map((t) => {
              const isActive = state.activeTab === t.id
              const cached = state.cacheOrder.includes(t.id)
              const cacheable = isCacheable(state, t.id)
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => dispatch({ type: 'SWITCH', tabId: t.id })}
                  className={cn(
                    'rounded-sm border px-md py-sm font-mono text-caption-mono-sm transition-all',
                    isActive
                      ? 'border-[#42b883] bg-[#42b883]/10 text-[#42b883] shadow-sm'
                      : cached
                        ? 'border-[#61dafb]/50 bg-[#61dafb]/5 text-ink'
                        : 'border-hairline text-body-mid hover:border-body-mid',
                  )}
                >
                  {t.label}
                  {cached && <span className="ml-xs text-[#61dafb]">●</span>}
                  {!cacheable && <span className="ml-xs text-body-mid/50">⊘</span>}
                </button>
              )
            })}
          </div>

          {/* 当前 Tab 内容（模拟组件） */}
          <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
            <div className="flex items-baseline justify-between">
              <h4 className="font-mono text-body-sm font-bold text-ink">
                {tabLabel(state.activeTab)} 组件
              </h4>
              <span className="font-mono text-caption-mono-sm text-body-mid">
                渲染次数：
                <span className="text-[#42b883]">{state.renderCounts[state.activeTab] ?? 0}</span>
              </span>
            </div>
            <div className="mt-md space-y-xs font-mono text-caption-mono-sm text-body">
              <div>
                <span className="text-body-mid">缓存状态：</span>
                {state.cacheOrder.includes(state.activeTab) ? (
                  <span className="text-[#61dafb]">已缓存（命中后不重置计数）</span>
                ) : (
                  <span className="text-amber-500">未缓存（每次进入重新挂载）</span>
                )}
              </div>
              <div>
                <span className="text-body-mid">是否可缓存：</span>
                {isCacheable(state, state.activeTab) ? '是' : '否（被 include/exclude 排除）'}
              </div>
            </div>
            <p className="mt-md text-body-sm text-body-mid">
              点击上方 Tab 切换：被缓存的 Tab 回到时「渲染次数」不变；未缓存或被 LRU 淘汰的 Tab
              重新进入时「渲染次数」+1。
            </p>
          </div>
        </div>

        {/* 右侧：缓存状态面板 */}
        <div className="space-y-md">
          <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
            <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#61dafb]">
              缓存状态（LRU 队列）
            </h4>
            {state.cacheOrder.length === 0 ? (
              <p className="text-body-sm text-body-mid">缓存为空</p>
            ) : (
              <ol className="space-y-xs">
                {state.cacheOrder.map((id, i) => (
                  <li
                    key={id}
                    className={cn(
                      'flex items-center justify-between rounded-sm border px-sm py-xs font-mono text-caption-mono-sm',
                      i === 0
                        ? 'border-red-500/40 bg-red-500/5 text-red-500'
                        : 'border-hairline text-body',
                    )}
                  >
                    <span>
                      <span className="text-body-mid/60">{i + 1}.</span> {tabLabel(id)}
                    </span>
                    <span className="text-body-mid/60">
                      {i === 0 ? 'LRU ↓ 淘汰' : i === state.cacheOrder.length - 1 ? 'MRU' : ''}
                    </span>
                  </li>
                ))}
              </ol>
            )}
            <div className="mt-md border-t border-hairline pt-md font-mono text-caption-mono-sm text-body">
              <div className="flex justify-between">
                <span className="text-body-mid">缓存命中</span>
                <span className="text-[#42b883]">{state.cacheHits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body-mid">已缓存 / max</span>
                <span>
                  {state.cacheOrder.length} / {state.max}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: 'RESET', initial: createInitial(tabs, defaultMax) })}
            className="btn-pill w-full border-hairline text-body-mid hover:border-body-mid"
          >
            重置缓存
          </button>
        </div>
      </div>
    </div>
  )
}
