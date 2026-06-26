/**
 * ProxyReactivityTracker — Proxy 响应式依赖收集追踪器
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  ProxyReactivityTrackerData,
  ProxyTrackingScenario,
} from '../../../lib/vue-visualization-types'
import { cn } from '../../../lib/utils'

interface ProxyReactivityTrackerProps {
  data?: ProxyReactivityTrackerData
}

type LogEntry = {
  id: number
  type: 'get' | 'set' | 'effect'
  property: string
  detail: string
}

const DEFAULT_SCENARIOS: ProxyTrackingScenario[] = [
  {
    id: 'basic',
    label: '基础对象',
    initialData: { name: 'Vue', count: 0 },
    effects: [
      { name: 'render', dependencies: ['name', 'count'] },
      { name: 'logCount', dependencies: ['count'] },
    ],
  },
  {
    id: 'nested',
    label: '嵌套对象',
    initialData: { user: { name: 'Evan', age: 38 }, active: true },
    effects: [
      { name: 'render', dependencies: ['user.name', 'user.age', 'active'] },
      { name: 'ageWatcher', dependencies: ['user.age'] },
    ],
  },
  {
    id: 'array',
    label: '数组操作',
    initialData: { items: ['a', 'b', 'c'], total: 3 },
    effects: [
      { name: 'render', dependencies: ['items', 'total'] },
      { name: 'lengthEffect', dependencies: ['items'] },
    ],
  },
]

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key]
    return undefined
  }, obj)
}

function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.')
  const last = keys.pop()!
  const target = keys.reduce<Record<string, unknown>>((acc, key) => {
    if (!(key in acc) || typeof acc[key] !== 'object') acc[key] = {}
    return acc[key] as Record<string, unknown>
  }, obj)
  target[last] = value
}

/** 计算依赖图 SVG 布局，避免节点与连线重叠 */
function buildDepGraphLayout(depGraph: Record<string, string[]>) {
  const props = Object.keys(depGraph)
  const effects = [...new Set(Object.values(depGraph).flat())]
  const rowHeight = 40
  const paddingTop = 28
  const rowCount = Math.max(props.length, effects.length, 1)
  const height = paddingTop + rowCount * rowHeight + 16
  const width = 300

  const propY = (index: number) => paddingTop + index * rowHeight + rowHeight / 2
  const effectIndex = (name: string) => effects.indexOf(name)
  const effectY = (name: string) => paddingTop + effectIndex(name) * rowHeight + rowHeight / 2

  const propPositions = props.map((prop, i) => {
    const top = paddingTop + i * rowHeight
    return { prop, x: 8, top, cy: top + 14 }
  })
  const effectPositions = effects.map((effect, i) => {
    const top = paddingTop + i * rowHeight
    return { effect, x: 208, top, cy: top + 14 }
  })

  const edges = Object.entries(depGraph).flatMap(([prop, linkedEffects]) => {
    const pi = props.indexOf(prop)
    if (pi < 0) return []
    const y1 = propY(pi)
    return linkedEffects.map((effect) => ({
      prop,
      effect,
      x1: 88,
      y1,
      x2: 200,
      y2: effectY(effect),
    }))
  })

  return { width, height, propPositions, effectPositions, edges, props, effects }
}

export function ProxyReactivityTracker({ data }: ProxyReactivityTrackerProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? 'basic')
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]

  const [displayData, setDisplayData] = useState<Record<string, unknown>>({})
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [depGraph, setDepGraph] = useState<Record<string, string[]>>({})
  const [flashProp, setFlashProp] = useState<string | null>(null)

  const logIdRef = useRef(0)
  const activeEffectRef = useRef<string | null>(null)
  const proxyRef = useRef<Record<string, unknown> | null>(null)
  const graphRef = useRef<Record<string, string[]>>({})

  const addLog = useCallback((type: LogEntry['type'], property: string, detail: string) => {
    logIdRef.current += 1
    setLogs((prev) => [...prev.slice(-49), { id: logIdRef.current, type, property, detail }])
  }, [])

  const runEffects = useCallback(
    (changedProp: string) => {
      scenario.effects.forEach((effect) => {
        if (effect.dependencies.some((dep) => dep === changedProp || changedProp.startsWith(`${dep}.`))) {
          addLog('effect', changedProp, `[触发更新] 通知 effect: '${effect.name}'`)
          setFlashProp(changedProp)
          setTimeout(() => setFlashProp(null), 600)
        }
      })
    },
    [scenario.effects, addLog],
  )

  const createReactive = useCallback(
    (target: Record<string, unknown>): Record<string, unknown> => {
      const graph: Record<string, string[]> = {}

      const syncGraph = () => {
        graphRef.current = { ...graph }
        setDepGraph(graphRef.current)
      }

      const track = (prop: string) => {
        const effect = activeEffectRef.current
        if (effect) {
          if (!graph[prop]) graph[prop] = []
          if (!graph[prop].includes(effect)) {
            graph[prop].push(effect)
            syncGraph()
          }
          addLog('get', prop, `[依赖收集] 读取 '${prop}'，当前 effect: '${effect}'`)
        }
      }

      const handler: ProxyHandler<Record<string, unknown>> = {
        get(obj, key) {
          const prop = String(key)
          track(prop)
          const val = obj[prop]
          if (val && typeof val === 'object' && !Array.isArray(val)) {
            return createReactive(val as Record<string, unknown>)
          }
          return val
        },
        set(obj, key, value) {
          const prop = String(key)
          const oldVal = obj[prop]
          obj[prop] = value
          addLog('set', prop, `[触发更新] 设置 '${prop}' = ${JSON.stringify(value)}（旧值: ${JSON.stringify(oldVal)}）`)
          runEffects(prop)
          setDisplayData({ ...target })
          return true
        },
      }

      return new Proxy(target, handler)
    },
    [addLog, runEffects],
  )

  useEffect(() => {
    const raw = JSON.parse(JSON.stringify(scenario.initialData)) as Record<string, unknown>
    logIdRef.current = 0
    setLogs([])

    const initialGraph: Record<string, string[]> = {}
    scenario.effects.forEach((effect) => {
      effect.dependencies.forEach((dep) => {
        if (!initialGraph[dep]) initialGraph[dep] = []
        if (!initialGraph[dep].includes(effect.name)) initialGraph[dep].push(effect.name)
      })
    })
    setDepGraph(initialGraph)
    graphRef.current = initialGraph

    scenario.effects.forEach((effect) => {
      activeEffectRef.current = effect.name
      effect.dependencies.forEach((dep) => getNestedValue(raw, dep))
    })
    activeEffectRef.current = null

    const proxy = createReactive(raw)
    proxyRef.current = proxy
    setDisplayData({ ...raw })

    return () => {
      proxyRef.current = null
    }
  }, [scenario, createReactive])

  const flatProps = useMemo(() => {
    const result: Array<{ path: string; value: string }> = []
    const walk = (obj: Record<string, unknown>, prefix = '') => {
      Object.entries(obj).forEach(([key, val]) => {
        const path = prefix ? `${prefix}.${key}` : key
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          walk(val as Record<string, unknown>, path)
        } else {
          result.push({ path, value: JSON.stringify(val) })
        }
      })
    }
    walk(displayData)
    return result
  }, [displayData])

  const graphLayout = useMemo(() => buildDepGraphLayout(depGraph), [depGraph])

  const handleEdit = (path: string, rawValue: string) => {
    if (!proxyRef.current) return
    let parsed: unknown = rawValue
    try {
      parsed = JSON.parse(rawValue)
    } catch {
      /* 保持字符串 */
    }
    if (path.includes('.')) {
      setNestedValue(proxyRef.current, path, parsed)
      setDisplayData({ ...proxyRef.current })
    } else {
      proxyRef.current[path] = parsed
    }
  }

  const logColor = { get: 'text-blue-400', set: 'text-orange-400', effect: 'text-emerald-400' }

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：基于浏览器原生 Proxy，模拟 Vue 3 reactive 的依赖收集与触发更新，非 Vue 源码。
      </div>

      <div className="flex flex-wrap gap-sm">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setScenarioId(s.id)}
            className={cn(
              'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
              scenarioId === s.id
                ? 'border-[#42b883] bg-[#42b883]/10 text-[#42b883]'
                : 'border-hairline text-body-mid hover:border-body-mid',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-lg xl:grid-cols-3">
        {/* 属性面板 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            对象属性面板
          </h4>
          <div className="space-y-sm">
            {flatProps.map(({ path, value }) => (
              <div key={path} className="flex flex-col gap-xs sm:flex-row sm:items-center sm:gap-sm">
                <label className="shrink-0 font-mono text-caption-mono-sm text-[#42b883] sm:w-[88px]">
                  {path}
                </label>
                <input
                  type="text"
                  defaultValue={value.replace(/^"|"$/g, '')}
                  onBlur={(e) => handleEdit(path, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEdit(path, (e.target as HTMLInputElement).value)
                  }}
                  className="min-w-0 flex-1 rounded-sm border border-hairline bg-canvas-soft px-sm py-xs font-mono text-body-sm text-ink"
                  aria-label={`编辑属性 ${path}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 拦截日志 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            Proxy 拦截日志
          </h4>
          <div className="max-h-[280px] space-y-xs overflow-y-auto overflow-x-hidden font-mono text-caption-mono-sm">
            {logs.length === 0 && <p className="text-body-mid">修改属性以观察 get/set 拦截…</p>}
            {logs.map((log) => (
              <div key={log.id} className={cn('break-words leading-relaxed', logColor[log.type])}>
                {log.detail}
              </div>
            ))}
          </div>
        </div>

        {/* 依赖图 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg xl:col-span-1">
          <h4 className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            依赖关系图
          </h4>
          {graphLayout.props.length === 0 ? (
            <p className="text-body-sm text-body-mid">切换场景后将自动展示属性 → effect 依赖关系</p>
          ) : (
            <div className="overflow-x-auto">
              <svg
                viewBox={`0 0 ${graphLayout.width} ${graphLayout.height}`}
                className="mx-auto w-full max-w-[300px]"
                style={{ minHeight: graphLayout.height }}
                aria-label="属性到 effect 的依赖关系"
                preserveAspectRatio="xMidYMid meet"
              >
                {graphLayout.edges.map(({ prop, effect, x1, y1, x2, y2 }) => (
                  <line
                    key={`${prop}-${effect}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={flashProp === prop ? '#42b883' : '#666'}
                    strokeWidth={flashProp === prop ? 2 : 1}
                    strokeDasharray={flashProp === prop ? undefined : '4 2'}
                    className={flashProp === prop ? 'animate-pulse' : undefined}
                  />
                ))}
                {graphLayout.propPositions.map(({ prop, x, top, cy }) => (
                  <g key={prop}>
                    <rect x={x} y={top} width={80} height={28} rx={4} fill="#42b88333" stroke="#42b883" />
                    <text
                      x={x + 40}
                      y={cy + 4}
                      textAnchor="middle"
                      fill="#42b883"
                      fontSize="9"
                      style={{ pointerEvents: 'none' }}
                    >
                      {prop.length > 10 ? `${prop.slice(0, 9)}…` : prop}
                    </text>
                  </g>
                ))}
                {graphLayout.effectPositions.map(({ effect, x, top, cy }) => (
                  <g key={effect}>
                    <rect x={x} y={top} width={84} height={28} rx={4} fill="#61dafb33" stroke="#61dafb" />
                    <text
                      x={x + 42}
                      y={cy + 4}
                      textAnchor="middle"
                      fill="#61dafb"
                      fontSize="9"
                      style={{ pointerEvents: 'none' }}
                    >
                      {effect.length > 11 ? `${effect.slice(0, 10)}…` : effect}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          )}
          <div className="mt-sm flex flex-wrap gap-md text-caption-mono-sm text-body-mid">
            <span className="text-[#42b883]">■ 响应式属性</span>
            <span className="text-[#61dafb]">■ 依赖 effect</span>
          </div>
        </div>
      </div>
    </div>
  )
}
