/**
 * TurborepoTaskFlow — Turborepo 任务编排可视化
 *
 * 展示 turbo run <task> 的依赖图驱动任务编排：
 * - 按依赖图拓扑排序
 * - 不冲突任务并行执行
 * - 增量构建（仅构建变更包）
 * - 本地 + 远程缓存
 *
 * ⚠️ 教学模拟：不执行真实 turbo 命令，仅展示任务编排过程。
 */
import { useMemo, useState } from 'react'
import type {
  TurborepoTaskFlowData,
  TurboTask,
  TurboTaskStatus,
} from '../../../lib/engineering-visualization-types'

interface TurborepoTaskFlowProps {
  data?: TurborepoTaskFlowData
}

const DEFAULT_CONFIG = `{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": { "cache": false, "persistent": true },
    "lint": {},
    "test": { "dependsOn": ["^build"], "outputs": ["coverage/**"] }
  }
}`

const DEFAULT_REMOTE_CACHE_NOTE =
  '远程缓存（Vercel Remote Cache）将 turbo 命中本地缓存的产物同步到云端，团队成员与 CI 共享缓存，可将 CI 时间再降 50%+。'

const DEFAULT_TASKS: TurboTask[] = [
  // build 任务（按依赖图顺序）
  { id: 'utils:build', packageName: '@repo/utils', script: 'build', label: '@repo/utils build', dependsOn: [], status: 'pending', durationMs: 800, color: '#07c160' },
  { id: 'ui:build', packageName: '@repo/ui', script: 'build', label: '@repo/ui build', dependsOn: ['utils:build'], status: 'pending', durationMs: 1500, color: '#a78bfa' },
  { id: 'api:build', packageName: '@repo/api', script: 'build', label: '@repo/api build', dependsOn: ['utils:build'], status: 'pending', durationMs: 600, color: '#1a6cff' },
  { id: 'web:build', packageName: '@repo/web', script: 'build', label: '@repo/web build', dependsOn: ['ui:build', 'api:build'], status: 'pending', durationMs: 2400, color: '#f59e0b' },
  { id: 'admin:build', packageName: '@repo/admin', script: 'build', label: '@repo/admin build', dependsOn: ['ui:build', 'api:build'], status: 'pending', durationMs: 1800, color: '#ef4444' },
  { id: 'mobile:build', packageName: '@repo/mobile', script: 'build', label: '@repo/mobile build', dependsOn: ['ui:build', 'api:build'], status: 'pending', durationMs: 1200, color: '#0ea5e9' },
  // lint 任务（无依赖，可并行）
  { id: 'utils:lint', packageName: '@repo/utils', script: 'lint', label: '@repo/utils lint', dependsOn: [], status: 'pending', durationMs: 300, color: '#07c160' },
  { id: 'ui:lint', packageName: '@repo/ui', script: 'lint', label: '@repo/ui lint', dependsOn: [], status: 'pending', durationMs: 400, color: '#a78bfa' },
  { id: 'api:lint', packageName: '@repo/api', script: 'lint', label: '@repo/api lint', dependsOn: [], status: 'pending', durationMs: 250, color: '#1a6cff' },
  { id: 'web:lint', packageName: '@repo/web', script: 'lint', label: '@repo/web lint', dependsOn: [], status: 'pending', durationMs: 600, color: '#f59e0b' },
]

const STATUS_THEME: Record<TurboTaskStatus, { color: string; bg: string; label: string; icon: string }> = {
  pending: { color: '#7d8590', bg: 'rgba(125,133,144,0.10)', label: '待执行', icon: '○' },
  running: { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', label: '执行中', icon: '◐' },
  success: { color: '#07c160', bg: 'rgba(7,193,96,0.10)', label: '成功', icon: '✓' },
  cached: { color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', label: '缓存命中', icon: '⚡' },
  failed: { color: '#ef4444', bg: 'rgba(239,68,68,0.10)', label: '失败', icon: '✗' },
}

/** 拓扑排序后的执行批次 */
function computeExecutionBatches(tasks: TurboTask[]): TurboTask[][] {
  const batches: TurboTask[][] = []
  const done = new Set<string>()

  let remaining = [...tasks]
  while (remaining.length > 0) {
    // 本批次：依赖全部 done 的任务
    const batch = remaining.filter((t) => t.dependsOn.every((d) => done.has(d)))
    if (batch.length === 0) {
      // 死锁/循环依赖，把剩余全部塞进最后一批
      batches.push(remaining)
      break
    }
    batches.push(batch)
    batch.forEach((t) => done.add(t.id))
    remaining = remaining.filter((t) => !done.has(t.id))
  }
  return batches
}

export function TurborepoTaskFlow({ data }: TurborepoTaskFlowProps) {
  const tasks = data?.tasks ?? DEFAULT_TASKS
  const turboConfig = data?.turboConfig ?? DEFAULT_CONFIG
  const remoteCacheNote = data?.remoteCacheNote ?? DEFAULT_REMOTE_CACHE_NOTE

  const [taskStates, setTaskStates] = useState<Record<string, TurboTaskStatus>>(
    Object.fromEntries(tasks.map((t) => [t.id, 'pending' as TurboTaskStatus]))
  )
  const [isRunning, setIsRunning] = useState(false)
  const [useRemoteCache, setUseRemoteCache] = useState(true)
  const [runLog, setRunLog] = useState<string[]>([])

  const batches = useMemo(() => computeExecutionBatches(tasks), [tasks])

  /** 模拟执行 turbo run build */
  const handleRun = () => {
    if (isRunning) return
    setIsRunning(true)
    setRunLog([])
    // 重置所有任务状态
    const initial: Record<string, TurboTaskStatus> = {}
    tasks.forEach((t) => (initial[t.id] = 'pending'))
    setTaskStates(initial)

    const log: string[] = [`> turbo run build${useRemoteCache ? ' --remote-cache' : ''}`]
    setRunLog([...log])

    let batchIdx = 0
    const runBatch = () => {
      if (batchIdx >= batches.length) {
        log.push(`✓ 任务全部完成（共 ${tasks.length} 个）`)
        setRunLog([...log])
        setIsRunning(false)
        return
      }
      const batch = batches[batchIdx]
      log.push(`▶ 批次 ${batchIdx + 1}：${batch.map((t) => t.label).join(' / ')}（并行 ${batch.length}）`)
      setRunLog([...log])

      // 标记当前批次为 running
      setTaskStates((prev) => {
        const next = { ...prev }
        batch.forEach((t) => (next[t.id] = 'running'))
        return next
      })

      // 模拟并行执行，按各自 duration 排序完成
      const sortedByDuration = [...batch].sort((a, b) => a.durationMs - b.durationMs)
      sortedByDuration.forEach((task, i) => {
        const finishAt = task.durationMs
        setTimeout(() => {
          // 模拟缓存命中（30% 概率，远程缓存开启时提升到 60%）
          const cacheHitRate = useRemoteCache ? 0.6 : 0.3
          const isCached = Math.random() < cacheHitRate && batchIdx > 0
          setTaskStates((prev) => ({
            ...prev,
            [task.id]: isCached ? 'cached' : 'success',
          }))
          log.push(`  ${isCached ? '⚡' : '✓'} ${task.label} 完成 (${isCached ? '缓存' : `${task.durationMs}ms`})`)
          setRunLog([...log])

          // 最后一个完成时进入下一批
          if (i === sortedByDuration.length - 1) {
            batchIdx += 1
            setTimeout(runBatch, 300)
          }
        }, finishAt)
      })
    }
    setTimeout(runBatch, 500)
  }

  const handleReset = () => {
    setIsRunning(false)
    setRunLog([])
    const initial: Record<string, TurboTaskStatus> = {}
    tasks.forEach((t) => (initial[t.id] = 'pending'))
    setTaskStates(initial)
  }

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：不执行真实 turbo 命令，仅展示任务编排过程与缓存命中模拟。
      </div>

      {/* 控制条 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap items-center gap-sm">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="rounded-pill bg-[#1a6cff] px-md py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-[#0f55d4] disabled:opacity-40"
          >
            {isRunning ? '▶ 执行中...' : '▶ turbo run build'}
          </button>
          <button
            onClick={handleReset}
            disabled={isRunning}
            className="rounded-pill border border-hairline px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-all hover:border-body-hi disabled:opacity-40"
          >
            ↺ 重置
          </button>
          <label className="flex items-center gap-xs rounded-pill border border-hairline px-sm py-xs cursor-pointer">
            <input
              type="checkbox"
              checked={useRemoteCache}
              onChange={(e) => setUseRemoteCache(e.target.checked)}
              disabled={isRunning}
              className="cursor-pointer"
            />
            <span className="font-mono text-caption-mono-sm text-body-hi">
              远程缓存 {useRemoteCache ? 'ON' : 'OFF'}
            </span>
          </label>
          <span className="ml-auto font-mono text-caption-mono-sm text-body-mid">
            共 {tasks.length} 任务 · {batches.length} 批次
          </span>
        </div>
      </div>

      {/* 任务执行批次图 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">任务依赖图（按批次执行）</h4>
        <div className="space-y-md overflow-x-auto">
          {batches.map((batch, batchIdx) => (
            <div key={batchIdx} className="flex items-stretch gap-sm">
              <div className="flex w-16 shrink-0 flex-col justify-center">
                <div className="rounded-pill bg-canvas-bg-inset px-xs py-xs text-center font-mono text-caption-mono-sm text-body-mid">
                  批次 {batchIdx + 1}
                </div>
              </div>
              <div className="flex flex-1 flex-wrap gap-xs">
                {batch.map((task) => {
                  const status = taskStates[task.id] ?? 'pending'
                  const theme = STATUS_THEME[status]
                  return (
                    <div
                      key={task.id}
                      className="min-w-[140px] flex-1 rounded-sm border p-sm"
                      style={{ borderColor: theme.color, background: theme.bg }}
                    >
                      <div className="flex items-center gap-xs">
                        <span className="font-mono text-caption-mono-sm" style={{ color: theme.color }}>
                          {theme.icon}
                        </span>
                        <span className="min-w-0 flex-1 truncate font-mono text-caption-mono-sm font-bold text-body-hi" title={task.label}>
                          {task.label}
                        </span>
                      </div>
                      <div className="mt-xs flex items-center justify-between">
                        <span
                          className="rounded-pill px-xs py-xxs font-mono text-caption-mono-sm"
                          style={{ background: theme.bg, color: theme.color }}
                        >
                          {theme.label}
                        </span>
                        <span className="font-mono text-caption-mono-sm text-body-mid">
                          {task.durationMs}ms
                        </span>
                      </div>
                      {task.dependsOn.length > 0 && (
                        <div className="mt-xxs truncate font-mono text-caption-mono-sm text-body-mid" title={`depends: ${task.dependsOn.join(', ')}`}>
                          depends: {task.dependsOn.join(', ')}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* 左：执行日志 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">执行日志</h4>
          <div className="h-64 overflow-y-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm">
            {runLog.length === 0 ? (
              <div className="text-body-mid">点击「turbo run build」开始执行</div>
            ) : (
              runLog.map((line, i) => (
                <div key={i} className="text-body-hi">{line}</div>
              ))
            )}
          </div>
        </div>

        {/* 右：turbo.json 配置 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">turbo.json 配置</h4>
          <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
            {turboConfig}
          </pre>
        </div>
      </div>

      {/* 远程缓存说明 */}
      <div className="rounded-sm border border-[#a78bfa]/30 bg-[#a78bfa]/8 p-md">
        <div className="mb-xs font-mono text-caption-mono-sm font-bold text-[#7c3aed]">
          远程缓存（Remote Cache）
        </div>
        <p className="text-caption-mono-sm text-body-hi">{remoteCacheNote}</p>
      </div>

      {/* Turborepo 核心能力 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">Turborepo 核心能力</h4>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#1a6cff]">依赖图驱动</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              dependsOn: [^build] 自动按依赖关系拓扑排序
            </p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#07c160]">任务并行</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              同批次无冲突任务并行执行，缩短总时间
            </p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#a78bfa]">增量构建</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              仅构建变更影响范围，未变更任务直接缓存命中
            </p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#f59e0b]">远程缓存</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              Vercel Remote Cache 团队/CI 共享缓存
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
