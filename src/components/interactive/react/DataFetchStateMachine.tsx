/**
 * DataFetchStateMachine — 数据获取三态机
 *
 * 可视化数据请求的 loading → error/success 状态转换。
 * 支持竞态场景演示，展示 useEffect + cleanup 的重要性。
 *
 * 对应docx中演示 #12（原 #13）
 */
import { useState, useEffect, useRef } from 'react'
import type { DataFetchStateMachineData } from '../../../lib/react-visualization-types'
import { cn } from '../../../lib/utils'

interface DataFetchStateMachineProps {
  data?: DataFetchStateMachineData
}

type FetchState = 'idle' | 'loading' | 'success' | 'error'

const DEFAULT_SCENARIOS = [
  {
    id: 'normal',
    label: '正常请求',
    description: '请求正常完成：idle → loading → success',
    initialState: 'idle' as const,
    transitionSequence: [
      { from: 'idle', to: 'loading', trigger: '点击按钮', delay: 1500 },
      { from: 'loading', to: 'success', trigger: '请求成功', delay: 1500 },
    ],
  },
  {
    id: 'error',
    label: '请求失败',
    description: '请求失败：idle → loading → error',
    initialState: 'idle' as const,
    transitionSequence: [
      { from: 'idle', to: 'loading', trigger: '点击按钮', delay: 1000 },
      { from: 'loading', to: 'error', trigger: '网络错误', delay: 1500 },
    ],
  },
  {
    id: 'race',
    label: '竞态条件',
    description: '快速切换导致旧请求覆盖新结果',
    initialState: 'idle' as const,
    transitionSequence: [
      { from: 'idle', to: 'loading', trigger: '请求用户 1', delay: 2000 },
      { from: 'loading', to: 'success', trigger: '用户 1 返回', delay: 2000 },
    ],
    hasRaceCondition: true,
  },
]

export function DataFetchStateMachine({ data }: DataFetchStateMachineProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [activeIdx, setActiveIdx] = useState(0)
  const [state, setState] = useState<FetchState>('idle')
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const scenario = scenarios[activeIdx]

  useEffect(() => {
    setState('idle')
    setStep(0)
    setMessage('')
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeIdx])

  const handleStart = () => {
    setState('loading')
    setStep(1)
    setMessage(scenario.transitionSequence[0].trigger)

    const t = scenario.transitionSequence[0]
    timerRef.current = setTimeout(() => {
      setState(t.to as FetchState)
      setStep(2)
      setMessage(t.to === 'error' ? '请求失败：500 Internal Server Error' : '数据加载完成 ✓')
    }, t.delay)
  }

  const handleRace = () => {
    setState('loading')
    setStep(1)
    setMessage('发起第二次请求（用户 2）...前一次请求将被取消')

    // Simulate race: first request completes after second starts
    timerRef.current = setTimeout(() => {
      // Cleanup would have cancelled the first request
      setState('loading')
      setMessage('第二次请求处理中...（第一次请求已被 cleanup 取消）')
      const t2 = setTimeout(() => {
        setState('success')
        setStep(2)
        setMessage('用户 2 数据返回 ✓（竞态已处理）')
      }, 1500)
      timerRef.current = t2
    }, 800)
  }

  const stateConfig: Record<FetchState, { color: string; label: string; icon: string }> = {
    idle: { color: 'border-hairline bg-canvas-soft', label: '等待中', icon: '⏸' },
    loading: { color: 'border-accent-dusk/40 bg-accent-dusk/10', label: '加载中...', icon: '⏳' },
    success: { color: 'border-accent-sunset/40 bg-accent-sunset/10', label: '成功 ✓', icon: '✅' },
    error: { color: 'border-red-500/40 bg-red-500/10', label: '失败 ✕', icon: '❌' },
  }

  const config = stateConfig[state]

  return (
    <div className="space-y-lg">
      {/* Scenario selector */}
      <div className="flex flex-wrap gap-sm">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
              activeIdx === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {s.label}
          </button>
        ))}
        <button
          type="button"
          onClick={scenario.hasRaceCondition ? handleRace : handleStart}
          disabled={state === 'loading'}
          className={cn(
            'ml-auto rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
            state === 'loading'
              ? 'border-hairline bg-canvas-soft text-body-mid opacity-50'
              : 'border-accent-sunset bg-accent-sunset text-on-primary hover:bg-accent-sunset/80',
          )}
        >
          {scenario.hasRaceCondition ? '🔥 触发竞态' : '▶ 开始请求'}
        </button>
      </div>

      {/* State machine visualization */}
      <div className="flex items-center justify-center gap-lg py-xl">
        {(['idle', 'loading', 'success', 'error'] as FetchState[]).map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                'flex flex-col items-center gap-sm rounded-sm border px-xl py-lg text-center transition-all',
                state === s ? config.color : 'border-hairline bg-canvas-card opacity-50',
              )}
            >
              <span className="text-display-xs">{stateConfig[s].icon}</span>
              <span className="font-mono text-caption-mono-sm text-body-mid">
                {stateConfig[s].label}
              </span>
            </div>
            {i < 3 && (
              <div className={cn(
                'mx-sm h-[1px] w-8',
                step > i ? 'bg-accent-sunset' : 'bg-hairline',
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Status message */}
      {message && (
        <div className={cn('rounded-sm border p-lg', config.color)}>
          <p className="text-body-sm text-ink">{message}</p>
          {scenario.hasRaceCondition && state === 'loading' && step === 1 && (
            <p className="mt-sm text-body-sm text-accent-sunset">
              ⚠ 竞态条件：第二次请求可能在第一次请求完成前到达，导致 UI 显示过期数据。
              解决方案：使用 useEffect cleanup 函数取消前一次请求，或使用 AbortController。
            </p>
          )}
        </div>
      )}

      {/* Best practices */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          最佳实践
        </div>
        <code className="block font-mono text-body-sm text-accent-sunset leading-relaxed">
{`useEffect(() => {
  let cancelled = false
  setLoading(true)
  fetchUser(id).then(data => {
    if (!cancelled) {
      setUser(data)
      setLoading(false)
    }
  })
  return () => { cancelled = true }  // cleanup!
}, [id])`}
        </code>
      </div>
    </div>
  )
}
