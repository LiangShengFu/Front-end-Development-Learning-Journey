/**
 * TransitionVsSyncDemo — startTransition vs 同步更新对比
 *
 * 并排对比「同步更新」和「startTransition 更新」两种模式下，
 * 输入框响应速度和大列表过滤的卡顿差异。
 * 实时显示两栏的 FPS 模拟值和操作日志。
 *
 * ⚠️ 教学模拟：FPS 为简化模拟值，非真实浏览器帧率。
 *
 * 对应docx中演示 #9
 */
import { useEffect, useState } from 'react'
import type { TransitionVsSyncDemoData } from '../../../lib/react-advanced-visualization-types'
import { cn } from '../../../lib/utils'

interface TransitionVsSyncDemoProps {
  data?: TransitionVsSyncDemoData
}

interface LogEntry {
  timestamp: number
  event: string
  priority: 'urgent' | 'normal'
  interrupted: boolean
}

/** FPS 条形图组件 */
function FpsBar({ fps, color }: { fps: number; color: string }) {
  return (
    <div className="flex items-center gap-sm">
      <div className="h-2 flex-1 overflow-hidden rounded-pill bg-canvas-mid">
        <div
          className="h-full rounded-pill transition-all duration-300"
          style={{ width: `${(fps / 60) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-mono text-caption-mono-sm" style={{ color }}>{fps} FPS</span>
    </div>
  )
}

export function TransitionVsSyncDemo({ data }: TransitionVsSyncDemoProps) {
  const listSize = data?.listSize ?? 10000

  // 同步模式状态
  const [syncQuery, setSyncQuery] = useState('')
  const [syncList, setSyncList] = useState<string[]>(() => generateList(listSize))
  const [syncFps, setSyncFps] = useState(60)
  const [syncLogs, setSyncLogs] = useState<LogEntry[]>([])

  // Transition 模式状态
  const [transQuery, setTransQuery] = useState('')
  const [transList, setTransList] = useState<string[]>(() => generateList(listSize))
  const [transFps, setTransFps] = useState(60)
  const [transLogs, setTransLogs] = useState<LogEntry[]>([])

  // 生成大列表数据
  function generateList(size: number): string[] {
    return Array.from({ length: size }, (_, i) => `Item ${String(i).padStart(5, '0')}`)
  }

  // 同步模式处理：立即过滤（模拟阻塞）
  const handleSyncChange = (value: string) => {
    setSyncQuery(value)
    const start = performance.now()
    // 模拟同步大列表过滤（阻塞主线程）
    const filtered = generateList(listSize).filter((item) => item.includes(value))
    setSyncList(filtered)
    const duration = performance.now() - start

    // 模拟 FPS 下降
    const fps = Math.max(5, Math.round(60 - duration * 2))
    setSyncFps(fps)
    setSyncLogs((prev) => [{
      timestamp: Date.now(),
      event: `过滤 "${value}" → ${filtered.length} 项`,
      priority: 'normal' as const,
      interrupted: false,
    }, ...prev].slice(0, 5))
  }

  // Transition 模式处理：query 立即更新，过滤延迟
  const handleTransChange = (value: string) => {
    setTransQuery(value) // 紧急更新：立即
    setTransFps(60) // 输入框不卡顿

    // 非紧急更新：模拟 startTransition（延迟执行）
    setTimeout(() => {
      const filtered = generateList(listSize).filter((item) => item.includes(value))
      setTransList(filtered)
      setTransLogs((prev) => [{
        timestamp: Date.now(),
        event: `过滤 "${value}" → ${filtered.length} 项`,
        priority: 'normal' as const,
        interrupted: false,
      }, ...prev].slice(0, 5))
    }, 300)

    setTransLogs((prev) => [{
      timestamp: Date.now(),
      event: `输入 "${value}"（紧急，立即响应）`,
      priority: 'urgent' as const,
      interrupted: false,
    }, ...prev].slice(0, 5))
  }

  const reset = () => {
    setSyncQuery('')
    setSyncList(generateList(listSize))
    setSyncFps(60)
    setSyncLogs([])
    setTransQuery('')
    setTransList(generateList(listSize))
    setTransFps(60)
    setTransLogs([])
  }

  // FPS 模拟器：同步模式在输入时持续低 FPS
  useEffect(() => {
    if (syncFps >= 60) return
    const timer = setTimeout(() => setSyncFps((f) => Math.min(60, f + 5)), 200)
    return () => clearTimeout(timer)
  }, [syncFps])

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 教学模拟声明 */}
      <div className="mb-lg rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 教学模拟：FPS 为简化模拟值，非真实浏览器帧率。在输入框中输入，观察两栏响应差异。
        </p>
      </div>

      <div className="mb-xl flex items-center justify-between">
        <span className="font-mono text-caption-mono-sm text-body-mid">
          大列表数据量：{listSize.toLocaleString()} 项
        </span>
        <button type="button" onClick={reset} className="btn-pill text-body-mid">⏹ 重置</button>
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-2">
        {/* 同步更新 */}
        <div className="rounded-sm border border-red-500/20 bg-canvas-soft p-lg">
          <div className="mb-md flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-red-500">
              同步更新（阻塞）
            </span>
            <FpsBar fps={syncFps} color="#f87171" />
          </div>
          <input
            value={syncQuery}
            onChange={(e) => handleSyncChange(e.target.value)}
            placeholder="输入过滤..."
            className="mb-md w-full rounded-sm border border-hairline bg-canvas px-md py-xs text-body-sm text-ink outline-none focus:border-red-500/40"
          />
          <div className="h-[120px] overflow-y-auto rounded-sm border border-hairline bg-canvas p-sm">
            {syncList.slice(0, 50).map((item, i) => (
              <div key={i} className="py-xxs font-mono text-caption-mono-sm text-body-mid">{item}</div>
            ))}
            {syncList.length > 50 && (
              <div className="py-xxs text-center font-mono text-caption-mono-sm text-body-mid">
                ... 还有 {syncList.length - 50} 项
              </div>
            )}
          </div>
          <div className="mt-md">
            <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">操作日志</div>
            <div className="space-y-xs">
              {syncLogs.length === 0 && <div className="font-mono text-caption-mono-sm text-body-mid/50">暂无日志</div>}
              {syncLogs.map((log, i) => (
                <div key={i} className="font-mono text-caption-mono-sm text-body-mid">
                  <span className="text-body-mid/60">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  {' '}{log.event}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transition 更新 */}
        <div className="rounded-sm border border-accent-dusk/20 bg-canvas-soft p-lg">
          <div className="mb-md flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
              startTransition（可中断）
            </span>
            <FpsBar fps={transFps} color="#a78bfa" />
          </div>
          <input
            value={transQuery}
            onChange={(e) => handleTransChange(e.target.value)}
            placeholder="输入过滤..."
            className="mb-md w-full rounded-sm border border-hairline bg-canvas px-md py-xs text-body-sm text-ink outline-none focus:border-accent-dusk/40"
          />
          <div className="h-[120px] overflow-y-auto rounded-sm border border-hairline bg-canvas p-sm">
            {transList.slice(0, 50).map((item, i) => (
              <div key={i} className="py-xxs font-mono text-caption-mono-sm text-body-mid">{item}</div>
            ))}
            {transList.length > 50 && (
              <div className="py-xxs text-center font-mono text-caption-mono-sm text-body-mid">
                ... 还有 {transList.length - 50} 项
              </div>
            )}
          </div>
          <div className="mt-md">
            <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">操作日志</div>
            <div className="space-y-xs">
              {transLogs.length === 0 && <div className="font-mono text-caption-mono-sm text-body-mid/50">暂无日志</div>}
              {transLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-xs font-mono text-caption-mono-sm">
                  <span className="text-body-mid/60">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  <span
                    className={cn(
                      'rounded-pill px-xs py-xxs',
                      log.priority === 'urgent' ? 'bg-accent-sunset/20 text-accent-sunset' : 'bg-accent-dusk/20 text-accent-dusk',
                    )}
                  >
                    {log.priority === 'urgent' ? '紧急' : '非紧急'}
                  </span>
                  <span className="text-body-mid">{log.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 对比说明 */}
      <div className="mt-xl rounded-sm border border-hairline bg-canvas-soft p-md">
        <p className="text-caption-mono-sm text-body-mid">
          💡 左侧同步更新：输入和过滤在同一事件中执行，大列表过滤阻塞主线程导致 FPS 下降、输入卡顿。
          右侧 startTransition：输入立即更新（紧急），列表过滤延迟执行（非紧急、可中断），输入框始终保持流畅。
        </p>
      </div>
    </div>
  )
}
