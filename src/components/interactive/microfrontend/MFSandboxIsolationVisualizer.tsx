/**
 * MFSandboxIsolationVisualizer — Proxy 沙箱隔离演示
 *
 * 交互式演示 Proxy 沙箱如何隔离主应用与子应用的 window 读写：
 * - 启用沙箱：子应用写入 proxy.target，全局 window 不受影响
 * - 关闭沙箱：子应用直接写入 window，污染主应用全局状态
 *
 * 交互：选择场景 → 切换沙箱开关 → 点击"运行子应用"查看日志对比。
 *
 * ⚠️ 安全说明：Proxy 沙箱为受控简化版，仅拦截 get/set，不执行任意用户代码。
 *   window 操作均在 useEffect 内执行，确保 SSR 安全。
 */
'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import type {
  MFSandboxIsolationData,
  MFSandboxScenario,
} from '../../../lib/microfrontend-visualization-types'
import { cn } from '../../../lib/utils'

interface MFSandboxIsolationVisualizerProps {
  data?: MFSandboxIsolationData
}

/** 默认场景数据 */
const DEFAULT_SCENARIOS: MFSandboxScenario[] = [
  {
    id: 'global-var',
    label: '全局变量污染',
    description:
      '子应用向 window 写入 __subAppConfig 与 __subAppUser，对比有无沙箱时主应用 window 是否被污染。',
    globalState: { theme: 'light', user: 'Alice' },
    subAppState: { __subAppConfig: { api: '/api/v1' }, __subAppUser: 'Tom' },
    isolated: true,
  },
  {
    id: 'override',
    label: '覆盖主应用变量',
    description:
      '子应用覆盖主应用的 window.theme 与 window.user，演示沙箱如何保护主应用状态不被篡改。',
    globalState: { theme: 'light', user: 'Alice' },
    subAppState: { theme: 'dark', user: 'Bob' },
    isolated: true,
  },
  {
    id: 'mixed',
    label: '混合写入',
    description:
      '子应用同时写入自有变量与覆盖主应用变量，综合演示沙箱对全局 window 的保护能力。',
    globalState: { theme: 'light', user: 'Alice', lang: 'zh-CN' },
    subAppState: { theme: 'dark', __subAppUser: 'Tom', lang: 'en-US' },
    isolated: true,
  },
]

/** 日志条目类型 */
interface LogEntry {
  type: 'ok' | 'warn' | 'info'
  message: string
}

/** 简化版 Proxy 沙箱（仅演示，不执行任意代码） */
function createProxySandbox() {
  const fakeWindow = Object.create(null)
  const log: LogEntry[] = []
  const globalWin = window as unknown as Record<string, unknown>
  const proxy = new Proxy(fakeWindow, {
    get(target, key) {
      // 优先子应用沙箱，兜底全局 window
      return key in target ? target[key] : globalWin[key as string]
    },
    set(target, key, value) {
      target[key] = value
      log.push({
        type: 'ok',
        message: `✓ 沙箱写入: ${String(key)} = ${JSON.stringify(value)}（全局 window 未受影响）`,
      })
      return true
    },
  })
  return { proxy, log, fakeWindow }
}

export function MFSandboxIsolationVisualizer({ data }: MFSandboxIsolationVisualizerProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const defaultScenarioId =
    data?.defaultScenario ?? scenarios[0]?.id ?? 'global-var'
  const principleNote =
    data?.principleNote ??
    'Proxy 沙箱原理：为子应用创建一个 fakeWindow，用 Proxy 拦截 window 的 get/set。读取时优先沙箱、兜底全局；写入时只落在沙箱，不污染全局 window。qiankun 的 legacySandbox/proxySandbox 即基于此实现。'

  const [scenarioId, setScenarioId] = useState(defaultScenarioId)
  const [isolated, setIsolated] = useState(true)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [globalSnapshot, setGlobalSnapshot] = useState<Record<string, unknown>>({})
  const [sandboxSnapshot, setSandboxSnapshot] = useState<Record<string, unknown>>({})
  // 用于在卸载时回滚 window 上的临时变量，避免污染主应用
  const rollbackKeysRef = useRef<string[]>([])

  // 安全回退：若 selectedId 与数据不匹配，回退到第一个场景
  const scenario = useMemo(
    () => scenarios.find((s) => s.id === scenarioId) ?? scenarios[0],
    [scenarios, scenarioId],
  )

  // 切换场景：事件处理器中原子重置状态，避免在 effect 中调用 setState（React 19 规范）
  const selectScenario = (id: string) => {
    if (id === scenarioId) return
    const next = scenarios.find((s) => s.id === id) ?? scenarios[0]
    setScenarioId(id)
    setLogs([])
    setGlobalSnapshot({ ...next.globalState })
    setSandboxSnapshot({})
  }

  // 卸载时清理 window 上残留的临时变量
  useEffect(() => {
    return () => {
      const globalWin = window as unknown as Record<string, unknown>
      rollbackKeysRef.current.forEach((k) => {
        try {
          delete globalWin[k]
        } catch {
          // 忽略删除失败
        }
      })
      rollbackKeysRef.current = []
    }
  }, [])

  const runScenario = () => {
    if (!scenario) return
    const newLogs: LogEntry[] = []

    if (isolated) {
      // 启用沙箱：使用 Proxy 拦截
      const { proxy, log, fakeWindow } = createProxySandbox()
      // 模拟子应用在沙箱中执行写入
      const sandboxProxy = proxy as unknown as Record<string, unknown>
      Object.entries(scenario.subAppState).forEach(([k, v]) => {
        sandboxProxy[k] = v
      })
      newLogs.push(...log)
      newLogs.push({
        type: 'info',
        message: `📦 沙箱状态：${JSON.stringify({ ...fakeWindow })}`,
      })
      newLogs.push({
        type: 'info',
        message: `🏠 主应用 window：${JSON.stringify({ ...scenario.globalState })}（未污染）`,
      })
      setSandboxSnapshot({ ...fakeWindow })
      setGlobalSnapshot({ ...scenario.globalState })
    } else {
      // 关闭沙箱：直接写入 window（演示污染）
      const pollutedKeys: string[] = []
      const globalWin = window as unknown as Record<string, unknown>
      Object.entries(scenario.subAppState).forEach(([k, v]) => {
        globalWin[k] = v
        pollutedKeys.push(k)
        newLogs.push({
          type: 'warn',
          message: `⚠ 直接写入全局: ${k} = ${JSON.stringify(v)}（污染了主应用 window）`,
        })
      })
      rollbackKeysRef.current = pollutedKeys
      // 计算污染后的 window 状态
      const polluted = { ...scenario.globalState, ...scenario.subAppState }
      setGlobalSnapshot(polluted)
      setSandboxSnapshot({})
      newLogs.push({
        type: 'info',
        message: `🏠 主应用 window：${JSON.stringify(polluted)}（已被污染）`,
      })
    }

    setLogs(newLogs)
  }

  const reset = () => {
    setLogs([])
    setGlobalSnapshot({ ...scenario.globalState })
    setSandboxSnapshot({})
    // 清理 window 上的临时变量
    const globalWin = window as unknown as Record<string, unknown>
    rollbackKeysRef.current.forEach((k) => {
      try {
        delete globalWin[k]
      } catch {
        // 忽略删除失败
      }
    })
    rollbackKeysRef.current = []
  }

  if (!scenario) {
    return <div className="text-body-sm text-body-mid">无可用场景</div>
  }

  return (
    <div className="space-y-lg">
      {/* 沙箱原理说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {principleNote}
      </p>

      {/* 场景选择 */}
      <div
        className="flex flex-wrap items-center gap-xs"
        role="group"
        aria-label="场景选择"
      >
        {scenarios.map((s) => {
          const isActive = s.id === scenarioId
          return (
            <button
              key={s.id}
              onClick={() => selectScenario(s.id)}
              aria-pressed={isActive}
              style={
                isActive
                  ? { backgroundColor: '#1a6cff', borderColor: '#1a6cff' }
                  : undefined
              }
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas text-ink hover:border-ink/30',
              )}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      {/* 场景描述 */}
      <p className="text-body-sm text-body">{scenario.description}</p>

      {/* 沙箱开关与运行按钮 */}
      <div className="flex flex-wrap items-center gap-md rounded-sm border border-hairline bg-canvas-soft p-md">
        <label className="flex cursor-pointer items-center gap-sm text-body-sm text-ink">
          <input
            type="checkbox"
            checked={isolated}
            onChange={(e) => setIsolated(e.target.checked)}
            className="h-4 w-4 cursor-pointer"
            aria-label="启用 Proxy 沙箱隔离"
          />
          <span className="font-mono text-caption-mono-sm">
            {isolated ? '✓ 启用 Proxy 沙箱' : '✗ 关闭沙箱（直写 window）'}
          </span>
        </label>
        <button
          onClick={runScenario}
          className="rounded-sm border border-transparent bg-accent-sunset px-md py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-accent-sunset/90"
        >
          ▶ 运行子应用
        </button>
        <button
          onClick={reset}
          className="rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono-sm text-ink hover:border-ink/30"
        >
          ↺ 重置
        </button>
      </div>

      {/* 状态快照对比 */}
      <div className="grid gap-md sm:grid-cols-2">
        <div className="rounded-sm border border-hairline bg-canvas p-md">
          <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
            🏠 主应用 window
          </div>
          <pre className="overflow-x-auto rounded-sm bg-canvas-soft p-sm font-mono text-caption-mono-sm text-ink">
            {JSON.stringify(globalSnapshot, null, 2)}
          </pre>
        </div>
        <div className="rounded-sm border border-hairline bg-canvas p-md">
          <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
            📦 子应用沙箱
          </div>
          <pre className="overflow-x-auto rounded-sm bg-canvas-soft p-sm font-mono text-caption-mono-sm text-ink">
            {Object.keys(sandboxSnapshot).length === 0
              ? '(未运行或未启用沙箱)'
              : JSON.stringify(sandboxSnapshot, null, 2)}
          </pre>
        </div>
      </div>

      {/* 执行日志 */}
      <div
        className="max-h-xs-sm overflow-y-auto rounded-sm border border-hairline bg-canvas-soft p-md"
        aria-live="polite"
      >
        {logs.length === 0 ? (
          <div className="text-caption text-body">点击「运行子应用」查看效果</div>
        ) : (
          <div className="space-y-xs">
            {logs.map((l, i) => (
              <div
                key={i}
                className={cn(
                  'font-mono text-caption-mono-sm',
                  l.type === 'ok' && 'text-accent-sunset',
                  l.type === 'warn' && 'text-red-600',
                  l.type === 'info' && 'text-body',
                )}
              >
                {l.message}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模拟 · 沙箱为受控简化版，不执行任意代码
      </p>
    </div>
  )
}
