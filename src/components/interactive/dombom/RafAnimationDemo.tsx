/**
 * RafAnimationDemo - rAF 动画演示
 *
 * 对比 requestAnimationFrame 与 setInterval 动画流畅度，显示帧率统计。
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import type { RafAnimationData } from '../../../lib/dom-bom-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, PillBtn, CodeOutput } from './shared'

interface RafAnimationDemoProps {
  data: RafAnimationData
}

export function RafAnimationDemo({ data }: RafAnimationDemoProps) {
  const [mode, setMode] = useState<'raf' | 'setInterval'>('raf')
  const [running, setRunning] = useState(false)
  const [fps, setFps] = useState(0)
  const [rafProgress, setRafProgress] = useState(0)
  const [intervalProgress, setIntervalProgress] = useState(0)

  const rafRef = useRef<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const frameCountRef = useRef(0)
  const lastFpsUpdateRef = useRef(0)
  const rafStartRef = useRef(0)
  // 用 ref 持有最新回调，避免循环引用
  const rafLoopRef = useRef<(timestamp: number) => void>(undefined)

  useEffect(() => {
    lastFpsUpdateRef.current = performance.now()
  }, [])

  // rAF 动画循环
  const rafLoop = useCallback((timestamp: number) => {
    if (!rafStartRef.current) rafStartRef.current = timestamp
    const elapsed = timestamp - rafStartRef.current
    const progress = (elapsed / 30) % 100 // 30ms 一周期
    setRafProgress(progress)

    // FPS 计算
    frameCountRef.current++
    const now = performance.now()
    if (now - lastFpsUpdateRef.current >= 1000) {
      setFps(frameCountRef.current)
      frameCountRef.current = 0
      lastFpsUpdateRef.current = now
    }

    if (running && mode === 'raf') {
      rafRef.current = requestAnimationFrame((t) => rafLoopRef.current?.(t))
    }
  }, [running, mode])

  useEffect(() => {
    rafLoopRef.current = rafLoop
  }, [rafLoop])

  // 启动 rAF
  useEffect(() => {
    if (running && mode === 'raf') {
      rafStartRef.current = 0
      frameCountRef.current = 0
      lastFpsUpdateRef.current = performance.now()
      rafRef.current = requestAnimationFrame(rafLoop)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [running, mode, rafLoop])

  // setInterval 动画
  useEffect(() => {
    if (running && mode === 'setInterval') {
      frameCountRef.current = 0
      lastFpsUpdateRef.current = performance.now()
      intervalRef.current = setInterval(() => {
        setIntervalProgress((p) => (p + 3) % 100)

        // FPS 计算
        frameCountRef.current++
        const now = performance.now()
        if (now - lastFpsUpdateRef.current >= 1000) {
          setFps(frameCountRef.current)
          frameCountRef.current = 0
          lastFpsUpdateRef.current = now
        }
      }, 16) // ~60fps 目标
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, mode])

  const toggle = () => setRunning((r) => !r)
  const reset = () => {
    setRunning(false)
    setRafProgress(0)
    setIntervalProgress(0)
    setFps(0)
  }

  const currentProgress = mode === 'raf' ? rafProgress : intervalProgress
  const fpsColor = fps >= 55 ? 'text-accent-breeze' : fps >= 30 ? 'text-orange-400' : 'text-red-400'

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>动画方式</GroupLabel>
        <PillBtn active={mode === 'raf'} onClick={() => { setMode('raf'); reset(); }}>
          requestAnimationFrame
        </PillBtn>
        <PillBtn active={mode === 'setInterval'} onClick={() => { setMode('setInterval'); reset(); }}>
          setInterval(16ms)
        </PillBtn>
        <span className="ml-auto" />
        <PillBtn variant="primary" active={running} onClick={toggle}>
          {running ? '暂停' : '运行'}
        </PillBtn>
        <PillBtn onClick={reset}>重置</PillBtn>
      </ControlRow>

      <div className="grid grid-cols-1 gap-md p-md lg:grid-cols-2">
        {/* 动画可视化 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-md">
          <div className="mb-2 flex items-center justify-between text-[0.62rem] uppercase text-body-mid">
            <span>{mode === 'raf' ? 'requestAnimationFrame' : 'setInterval'} 动画</span>
            <span>progress = <span className="font-mono text-accent-sunset">{currentProgress.toFixed(1)}%</span></span>
          </div>
          {/* 移动球 */}
          <div className="relative h-[60px] overflow-hidden rounded-xs bg-canvas">
            <div
              className="absolute top-1/2 h-[28px] w-[28px] -translate-y-1/2 rounded-full bg-accent-sunset shadow-[0_0_12px_rgba(30,215,96,0.6)]"
              style={{ left: `calc(${currentProgress}% - 14px)` }}
            />
            {/* 进度条 */}
            <div className="absolute bottom-0 left-0 h-px bg-accent-breeze" style={{ width: `${currentProgress}%` }} />
          </div>
          {/* FPS 显示 */}
          <div className="mt-md flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm text-body-mid">实际帧率</span>
            <span className={cn('font-mono text-body font-bold', fpsColor)}>
              {running ? `${fps} FPS` : '未运行'}
            </span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-pill bg-canvas-mid">
            <div
              className={cn('h-full transition-all', fpsColor.replace('text-', 'bg-'))}
              style={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* 对比说明 */}
        <div className="flex flex-col gap-sm">
          <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
            <div className="mb-1 text-[0.62rem] uppercase text-body-mid">requestAnimationFrame</div>
            <ul className="space-y-1 font-mono text-caption-mono-sm text-body">
              <li><span className="text-accent-breeze">✓</span> 与浏览器刷新率同步（通常 60fps）</li>
              <li><span className="text-accent-breeze">✓</span> 后台标签自动暂停，节省 CPU</li>
              <li><span className="text-accent-breeze">✓</span> 帧率稳定，无丢帧</li>
              <li><span className="text-accent-breeze">✓</span> 适合视觉动画</li>
            </ul>
          </div>

          <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
            <div className="mb-1 text-[0.62rem] uppercase text-body-mid">setInterval(fn, 16)</div>
            <ul className="space-y-1 font-mono text-caption-mono-sm text-body">
              <li><span className="text-red-400">✗</span> 不与刷新同步，可能丢帧或过度绘制</li>
              <li><span className="text-red-400">✗</span> 后台标签继续运行，浪费 CPU</li>
              <li><span className="text-red-400">✗</span> 主线程阻塞时帧率不稳</li>
              <li><span className="text-orange-400">!</span> 适合非视觉定时任务</li>
            </ul>
          </div>
        </div>
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* rAF 动画循环 */`}</span>
        {'\n'}
        <span className="text-accent-breeze">function</span>{' '}
        <span className="text-accent-sunset">animate</span>(timestamp) {'{'}{'\n'}
        {'  '}update(timestamp);{'\n'}
        {'  '}requestAnimationFrame(animate);{'\n'}
        {'}'}{'\n'}
        requestAnimationFrame(animate);{'\n'}
        {'\n'}
        <span className="text-body-mid">{`/* FPS 计算 */`}</span>{'\n'}
        <span className="text-accent-breeze">const</span> delta = timestamp - lastTime;{'\n'}
        <span className="text-accent-breeze">const</span> fps = <span className="text-accent-sunset">Math.round</span>(1000 / delta);
      </CodeOutput>
    </DemoCard>
  )
}
