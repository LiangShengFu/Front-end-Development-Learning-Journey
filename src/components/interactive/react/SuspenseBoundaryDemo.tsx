/**
 * SuspenseBoundaryDemo — Suspense 边界模拟
 *
 * 可视化 React Suspense fallback 与 ErrorBoundary 的行为。
 * 模拟异步组件加载、超时和错误场景。
 *
 * 对应docx中演示 #21
 */
import { useState, useEffect, useRef } from 'react'
import type { SuspenseBoundaryDemoData } from '../../../lib/react-visualization-types'
import { cn } from '../../../lib/utils'

interface SuspenseBoundaryDemoProps {
  data?: SuspenseBoundaryDemoData
}

type DemoState = 'idle' | 'suspending' | 'resolved' | 'errored'

export function SuspenseBoundaryDemo(_props: SuspenseBoundaryDemoProps) {
  const [state, setState] = useState<DemoState>('idle')
  const [message, setMessage] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const handleLoadNormal = () => {
    setState('suspending')
    setMessage('组件正在异步加载... Suspense 捕获 Promise，显示 fallback UI')
    timerRef.current = setTimeout(() => {
      setState('resolved')
      setMessage('✅ 组件加载完成！Suspense 自动切换到实际内容')
    }, 2500)
  }

  const handleLoadError = () => {
    setState('suspending')
    setMessage('组件正在加载...')
    timerRef.current = setTimeout(() => {
      setState('errored')
      setMessage('❌ 组件加载失败！ErrorBoundary 捕获错误，显示降级 UI')
    }, 2000)
  }

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setState('idle')
    setMessage('')
  }

  return (
    <div className="space-y-lg">
      {/* Controls */}
      <div className="flex flex-wrap gap-sm">
        <button
          type="button"
          onClick={handleLoadNormal}
          disabled={state === 'suspending'}
          className={cn(
            'rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
            state === 'suspending'
              ? 'border-hairline bg-canvas-soft text-body-mid opacity-50'
              : 'border-accent-sunset bg-accent-sunset text-on-primary hover:bg-accent-sunset/80',
          )}
        >
          ▶ 正常加载
        </button>
        <button
          type="button"
          onClick={handleLoadError}
          disabled={state === 'suspending'}
          className={cn(
            'rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
            state === 'suspending'
              ? 'border-hairline bg-canvas-soft text-body-mid opacity-50'
              : 'border-red-500 bg-red-500 text-white hover:bg-red-500/80',
          )}
        >
          ▶ 模拟错误
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={cn(
            'rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-colors hover:border-white/30',
          )}
        >
          ↺ 重置
        </button>
      </div>

      {/* Visualization */}
      <div className="grid gap-lg lg:grid-cols-3">
        {/* Suspense Boundary */}
        <div className={cn(
          'rounded-sm border p-lg',
          state === 'suspending' ? 'border-accent-dusk/50 bg-accent-dusk/5' : 'border-hairline bg-canvas-soft',
        )}>
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
            Suspense fallback
          </div>
          <div className={cn(
            'flex min-h-[80px] items-center justify-center rounded-sm border p-md text-center transition-all',
            state === 'suspending'
              ? 'border-accent-dusk/30 bg-accent-dusk/10'
              : 'border-hairline bg-canvas-card',
          )}>
            {state === 'suspending' ? (
              <div className="animate-pulse">
                <div className="font-mono text-body-sm text-accent-dusk">Loading...</div>
                <div className="mt-sm h-2 w-24 rounded-pill bg-accent-dusk/30" />
              </div>
            ) : state === 'resolved' ? (
              <div className="font-mono text-body-sm text-accent-sunset">✓ 内容已显示</div>
            ) : (
              <div className="text-body-sm text-body-mid">等待加载...</div>
            )}
          </div>
        </div>

        {/* Actual Component */}
        <div className={cn(
          'rounded-sm border p-lg',
          state === 'resolved' ? 'border-accent-sunset/50 bg-accent-sunset/5' : 'border-hairline bg-canvas-soft',
        )}>
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            实际组件
          </div>
          <div className={cn(
            'flex min-h-[80px] items-center justify-center rounded-sm border p-md text-center transition-all',
            state === 'resolved'
              ? 'border-accent-sunset/30 bg-accent-sunset/10'
              : 'border-hairline bg-canvas-card',
          )}>
            {state === 'resolved' ? (
              <div>
                <div className="font-mono text-body-sm text-accent-sunset">UserProfile</div>
                <div className="mt-xs text-caption-mono-sm text-body-mid">
                  Name: Alice · Age: 30
                </div>
              </div>
            ) : (
              <div className="text-body-sm text-body-mid">
                {state === 'suspending' ? '⏳ 加载中...' : '等待触发'}
              </div>
            )}
          </div>
        </div>

        {/* Error Boundary */}
        <div className={cn(
          'rounded-sm border p-lg',
          state === 'errored' ? 'border-red-500/50 bg-red-500/5' : 'border-hairline bg-canvas-soft',
        )}>
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-red-500">
            ErrorBoundary
          </div>
          <div className={cn(
            'flex min-h-[80px] items-center justify-center rounded-sm border p-md text-center transition-all',
            state === 'errored'
              ? 'border-red-500/30 bg-red-500/10'
              : 'border-hairline bg-canvas-card',
          )}>
            {state === 'errored' ? (
              <div>
                <div className="font-mono text-body-sm text-red-500">Something went wrong</div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-sm rounded-pill border border-red-500/30 px-md py-xxs font-mono text-caption-mono-sm text-red-500 hover:bg-red-500/10"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="text-body-sm text-body-mid">无错误</div>
            )}
          </div>
        </div>
      </div>

      {/* Status */}
      {message && (
        <div className={cn(
          'rounded-sm border p-lg',
          state === 'errored' ? 'border-red-500/30 bg-red-500/5' : 'border-accent-sunset/30 bg-accent-sunset/5',
        )}>
          <p className="text-body-sm text-ink">{message}</p>
        </div>
      )}

      {/* Code example */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          Suspense + ErrorBoundary 用法
        </div>
        <code className="block font-mono text-body-sm text-accent-sunset leading-relaxed">
{`<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<Loading />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>`}
        </code>
      </div>
    </div>
  )
}
