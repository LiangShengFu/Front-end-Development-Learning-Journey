/**
 * DebounceThrottleVisualizer — 防抖节流可视化
 *
 * 从原模块十九内联 demo-dt IIFE 完整迁移为 React 组件。
 * 展示防抖（debounce）与节流（throttle）两种性能优化策略：
 * - 防抖：事件停止触发 n 秒后执行一次（搜索框联想）
 * - 节流：每 n 秒最多执行一次（滚动/resize）
 *
 * 交互：
 * - 双栏对比（无优化 / 防抖 / 节流）
 * - 点击触发按钮记录触发次数
 * - 点状指示器可视化每次触发
 * - 滑块调节防抖延迟/节流间隔
 *
 * ⚠️ 教学模拟：使用 setTimeout 模拟，不依赖 lodash。
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import type { DebounceThrottleVisualizerData } from '../../../lib/performance-security-visualization-types'

interface DebounceThrottleVisualizerProps {
  data?: DebounceThrottleVisualizerData
}

/** 单次触发记录 */
interface TriggerDot {
  id: number
  time: number
}

/** 防抖函数实现（教学版） */
function createDebounce<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number,
): { call: (...args: A) => void; cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null
  return {
    call(...args: A) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
        timer = null
      }, wait)
    },
    cancel() {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    },
  }
}

/** 节流函数实现（教学版，基于时间戳） */
function createThrottle<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number,
): { call: (...args: A) => void; cancel: () => void } {
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null
  return {
    call(...args: A) {
      const now = Date.now()
      const remaining = wait - (now - lastTime)
      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        lastTime = now
        fn(...args)
      } else if (!timer) {
        timer = setTimeout(() => {
          lastTime = Date.now()
          timer = null
          fn(...args)
        }, remaining)
      }
    },
    cancel() {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = 0
    },
  }
}

type ColumnMode = 'none' | 'debounce' | 'throttle'

interface ColumnState {
  /** 触发次数（用户点击次数） */
  triggerCount: number
  /** 执行次数（实际执行次数） */
  executeCount: number
  /** 触发点指示器 */
  dots: TriggerDot[]
}

const COLUMN_LABEL: Record<ColumnMode, string> = {
  none: '无优化',
  debounce: '防抖 debounce',
  throttle: '节流 throttle',
}

const COLUMN_DESC: Record<ColumnMode, string> = {
  none: '每次触发立即执行，可能造成性能问题',
  debounce: '停止触发后等待 wait ms 才执行，适合搜索联想',
  throttle: '每 wait ms 最多执行一次，适合 scroll/resize',
}

const COLUMN_COLOR: Record<ColumnMode, string> = {
  none: '#ec4899',
  debounce: '#1a6cff',
  throttle: '#07c160',
}

export function DebounceThrottleVisualizer({ data }: DebounceThrottleVisualizerProps) {
  const debounceWait = data?.defaultDebounceWait ?? 500
  const note =
    data?.note ??
    '防抖：事件停止触发 n 秒后执行一次（合并连续触发）。节流：每 n 秒最多执行一次（稀释触发频率）。'

  const [wait, setWait] = useState(debounceWait)

  // 三列状态
  const [noneState, setNoneState] = useState<ColumnState>({
    triggerCount: 0,
    executeCount: 0,
    dots: [],
  })
  const [debounceState, setDebounceState] = useState<ColumnState>({
    triggerCount: 0,
    executeCount: 0,
    dots: [],
  })
  const [throttleState, setThrottleState] = useState<ColumnState>({
    triggerCount: 0,
    executeCount: 0,
    dots: [],
  })

  // 防抖/节流函数引用（依赖 wait 变化时重建）
  const debounceRef = useRef<ReturnType<typeof createDebounce> | null>(null)
  const throttleRef = useRef<ReturnType<typeof createThrottle> | null>(null)

  // dot id 自增
  const dotIdRef = useRef(0)

  /** 创建一个触发点 */
  const makeDot = useCallback((): TriggerDot => {
    dotIdRef.current += 1
    return { id: dotIdRef.current, time: Date.now() }
  }, [])

  /** 清理过期 dots（保留最近 12 个） */
  const trimDots = (dots: TriggerDot[]): TriggerDot[] => dots.slice(-12)

  /** 防抖执行回调 */
  const onDebounceExecute = useCallback(() => {
    setDebounceState((s) => ({
      ...s,
      executeCount: s.executeCount + 1,
      dots: trimDots([...s.dots, makeDot()]),
    }))
  }, [makeDot])

  /** 节流执行回调 */
  const onThrottleExecute = useCallback(() => {
    setThrottleState((s) => ({
      ...s,
      executeCount: s.executeCount + 1,
      dots: trimDots([...s.dots, makeDot()]),
    }))
  }, [makeDot])

  // 重建防抖/节流函数（wait 变化时）
  useEffect(() => {
    debounceRef.current = createDebounce(onDebounceExecute, wait)
    throttleRef.current = createThrottle(onThrottleExecute, wait)
    return () => {
      debounceRef.current?.cancel()
      throttleRef.current?.cancel()
    }
  }, [wait, onDebounceExecute, onThrottleExecute])

  /** 触发一次（三列同时触发） */
  const handleTrigger = useCallback(() => {
    // 无优化列：立即执行
    setNoneState((s) => ({
      triggerCount: s.triggerCount + 1,
      executeCount: s.executeCount + 1,
      dots: trimDots([...s.dots, makeDot()]),
    }))
    // 防抖列：记录触发，延迟执行
    setDebounceState((s) => ({ ...s, triggerCount: s.triggerCount + 1 }))
    debounceRef.current?.call()
    // 节流列：记录触发，限频执行
    setThrottleState((s) => ({ ...s, triggerCount: s.triggerCount + 1 }))
    throttleRef.current?.call()
  }, [makeDot])

  /** 重置所有 */
  const handleReset = useCallback(() => {
    debounceRef.current?.cancel()
    throttleRef.current?.cancel()
    setNoneState({ triggerCount: 0, executeCount: 0, dots: [] })
    setDebounceState({ triggerCount: 0, executeCount: 0, dots: [] })
    setThrottleState({ triggerCount: 0, executeCount: 0, dots: [] })
  }, [])

  const columns: Array<{ mode: ColumnMode; state: ColumnState }> = [
    { mode: 'none', state: noneState },
    { mode: 'debounce', state: debounceState },
    { mode: 'throttle', state: throttleState },
  ]

  return (
    <div className="space-y-lg">
      {/* 控制栏 */}
      <div className="flex flex-wrap items-center gap-md rounded-md border border-hairline bg-canvas-soft p-md">
        <button
          onClick={handleTrigger}
          className="rounded-sm bg-accent-sunset px-lg py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-white transition-colors hover:bg-accent-sunset/80"
        >
          ▶ 触发事件
        </button>
        <button
          onClick={handleReset}
          className="rounded-sm border border-hairline bg-canvas px-md py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body transition-colors hover:border-ink/30"
        >
          ↺ 重置
        </button>
        {/* 间隔滑块 */}
        <div className="flex items-center gap-sm">
          <label
            htmlFor="dt-wait-slider"
            className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid"
          >
            wait / 间隔
          </label>
          <input
            id="dt-wait-slider"
            type="range"
            min={200}
            max={1500}
            step={100}
            value={wait}
            onChange={(e) => setWait(Number(e.target.value))}
            aria-valuetext={`${wait} 毫秒`}
            className="w-32 accent-accent-sunset"
          />
          <span className="w-16 font-mono text-caption-mono-sm text-ink" aria-hidden="true">
            {wait}ms
          </span>
        </div>
      </div>

      {/* 说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">{note}</p>

      {/* 三列对比 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-3">
        {columns.map(({ mode, state }) => (
          <div
            key={mode}
            className="overflow-hidden rounded-md border-2 bg-canvas-card"
            style={{ borderColor: `${COLUMN_COLOR[mode]}40` }}
          >
            {/* 列标题 */}
            <div
              className="px-md py-sm text-white"
              style={{ backgroundColor: COLUMN_COLOR[mode] }}
            >
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px]">
                {COLUMN_LABEL[mode]}
              </div>
              <div className="mt-xxs text-caption text-white/80">{COLUMN_DESC[mode]}</div>
            </div>

            {/* 计数器 */}
            <div className="grid grid-cols-2 gap-xs p-md">
              <div className="rounded-sm bg-canvas-soft px-sm py-xs">
                <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                  触发次数
                </div>
                <div className="font-mono text-display-xs text-ink">{state.triggerCount}</div>
              </div>
              <div className="rounded-sm bg-canvas-soft px-sm py-xs">
                <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                  执行次数
                </div>
                <div
                  className="font-mono text-display-xs"
                  style={{ color: COLUMN_COLOR[mode] }}
                >
                  {state.executeCount}
                </div>
              </div>
            </div>

            {/* 点状指示器 */}
            <div className="px-md pb-md">
              <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                执行点
              </div>
              <div className="flex min-h-[2rem] flex-wrap items-center gap-xs">
                {state.dots.length === 0 ? (
                  <span className="text-caption-mono-xs text-body-mid/60">—</span>
                ) : (
                  state.dots.map((dot) => (
                    <span
                      key={dot.id}
                      className="inline-block h-md w-md rounded-full"
                      style={{ backgroundColor: COLUMN_COLOR[mode] }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 代码实现 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            debounce 实现
          </div>
          <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-sm text-canvas">
            <code>{`function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}`}</code>
          </pre>
        </div>
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            throttle 实现
          </div>
          <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-sm text-canvas">
            <code>{`function throttle(fn, wait) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      fn.apply(this, args)
    }
  }
}`}</code>
          </pre>
        </div>
      </div>

      <p className="text-center text-caption-mono-xs text-body-mid">
        ⚠️ 教学模拟 · 连续点击「触发事件」观察三列执行次数差异
      </p>
    </div>
  )
}
