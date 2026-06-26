/**
 * FiberWorkLoopSimulator — Fiber 工作循环模拟器
 *
 * 模拟 Fiber 架构的 work loop，可视化展示三个核心机制：
 * 1. 可中断渲染：高优先级任务可打断低优先级工作
 * 2. Lane 优先级调度：SyncLane > DefaultLane > TransitionLane
 * 3. 双缓冲切换：workInProgress 树 → current 树
 *
 * ⚠️ 教学模拟：此演示为 Fiber 架构的教学简化版本，非 React 内部真实实现。
 *
 * 对应docx中演示 #2
 */
import { useEffect, useState } from 'react'
import type { FiberWorkLoopSimulatorData, FiberScenario } from '../../../lib/react-advanced-visualization-types'
import { cn } from '../../../lib/utils'

interface FiberWorkLoopSimulatorProps {
  data?: FiberWorkLoopSimulatorData
}

const DEFAULT_SCENARIOS: FiberScenario[] = [
  {
    id: 'sync-blocking',
    label: '同步阻塞（React 15）',
    description: 'Stack Reconciler 递归同步渲染，一旦开始无法中断。长任务阻塞主线程导致卡顿。',
    tree: [
      { id: 'app', label: 'App', type: 'root' },
      { id: 'header', label: 'Header', type: 'comp', child: 'logo' },
      { id: 'logo', label: 'Logo', type: 'leaf', sibling: 'nav', returnTo: 'header' },
      { id: 'nav', label: 'Nav', type: 'leaf', sibling: 'list', returnTo: 'header' },
      { id: 'list', label: 'List (1000 项)', type: 'comp', returnTo: 'app', sibling: 'footer' },
      { id: 'footer', label: 'Footer', type: 'leaf', returnTo: 'app' },
    ],
    lanes: [
      { id: 't1', lane: 'Default', label: '初始渲染（1000 项列表）', steps: 6 },
    ],
  },
  {
    id: 'time-slice',
    label: '时间切片（React 16+ Fiber）',
    description: 'Fiber 将渲染拆分为多个小任务，每帧预留 5ms，可被高优先级任务中断并恢复。',
    tree: [
      { id: 'app', label: 'App', type: 'root' },
      { id: 'header', label: 'Header', type: 'comp', child: 'logo' },
      { id: 'logo', label: 'Logo', type: 'leaf', sibling: 'nav', returnTo: 'header' },
      { id: 'nav', label: 'Nav', type: 'leaf', sibling: 'list', returnTo: 'header' },
      { id: 'list', label: 'List (1000 项)', type: 'comp', returnTo: 'app', sibling: 'footer' },
      { id: 'footer', label: 'Footer', type: 'leaf', returnTo: 'app' },
    ],
    lanes: [
      { id: 't1', lane: 'Transition', label: '列表过滤（低优先级）', steps: 6 },
      { id: 't2', lane: 'Sync', label: '用户输入（高优先级）', steps: 2 },
    ],
    interruptions: [{ atNode: 'list', newTask: { id: 't2', lane: 'Sync', label: '用户输入中断', steps: 2 } }],
  },
]

type NodeStatus = 'pending' | 'working' | 'done' | 'interrupted'

export function FiberWorkLoopSimulator({ data }: FiberWorkLoopSimulatorProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const scenario = scenarios[scenarioIdx]

  const [currentNodeIdx, setCurrentNodeIdx] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [interrupted, setInterrupted] = useState(false)
  const [committed, setCommitted] = useState(false)
  const [speed, setSpeed] = useState(800)

  const totalNodes = scenario.tree.length
  const currentNode = scenario.tree[currentNodeIdx]

  // 节点状态计算
  const getNodeStatus = (idx: number): NodeStatus => {
    if (committed) return 'done'
    if (interrupted && idx === currentNodeIdx) return 'interrupted'
    if (idx === currentNodeIdx && !interrupted) return 'working'
    if (idx < currentNodeIdx) return 'done'
    return 'pending'
  }

  const reset = () => {
    setCurrentNodeIdx(0)
    setAutoPlay(false)
    setInterrupted(false)
    setCommitted(false)
  }

  const switchScenario = (idx: number) => {
    setScenarioIdx(idx)
    reset()
  }

  const stepForward = () => {
    if (currentNodeIdx >= totalNodes - 1) {
      setAutoPlay(false)
      return
    }
    // 检查是否有中断点
    const interruption = scenario.interruptions?.find((i) => i.atNode === currentNode?.id)
    if (interruption && !interrupted) {
      setInterrupted(true)
      return
    }
    if (interrupted) {
      setInterrupted(false)
    }
    setCurrentNodeIdx((i) => Math.min(i + 1, totalNodes - 1))
  }

  const commit = () => {
    setCommitted(true)
    setAutoPlay(false)
  }

  // 自动播放
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      if (currentNodeIdx >= totalNodes - 1 && !interrupted) {
        setAutoPlay(false)
      } else {
        stepForward()
      }
    }, speed)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, currentNodeIdx, interrupted, speed, totalNodes])

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 教学模拟声明 */}
      <div className="mb-lg rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 教学模拟：此演示为 Fiber 架构的教学简化版本，非 React 内部真实实现。
        </p>
      </div>

      {/* 场景切换 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => switchScenario(i)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm uppercase tracking-[1.2px] transition-colors',
              scenarioIdx === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="mb-xl text-body-sm text-body">{scenario.description}</p>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_220px]">
        {/* Fiber 树可视化 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
          <div className="mb-md flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              Fiber 树（{committed ? 'current' : 'workInProgress'}）
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">
              节点 {currentNodeIdx + 1} / {totalNodes}
            </span>
          </div>
          <div className="space-y-sm">
            {scenario.tree.map((node, idx) => {
              const status = getNodeStatus(idx)
              const depth = node.returnTo ? scenario.tree.findIndex((n) => n.id === node.returnTo) >= 0 ? 1 : 0 : 0
              return (
                <div
                  key={node.id}
                  className={cn(
                    'flex items-center gap-md rounded-sm border px-md py-sm transition-all duration-300',
                    status === 'working' && 'border-accent-sunset/60 bg-accent-sunset/10',
                    status === 'done' && 'border-accent-dusk/40 bg-accent-dusk/5',
                    status === 'interrupted' && 'border-red-500/50 bg-red-500/10',
                    status === 'pending' && 'border-hairline bg-canvas-card opacity-50',
                  )}
                  style={{ marginLeft: `${depth * 24}px` }}
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-sm font-mono text-caption-mono-sm',
                      status === 'working' && 'bg-accent-sunset text-on-primary animate-pulse',
                      status === 'done' && 'bg-accent-dusk/30 text-accent-dusk',
                      status === 'interrupted' && 'bg-red-500/30 text-red-500',
                      status === 'pending' && 'bg-canvas-mid text-body-mid',
                    )}
                  >
                    {status === 'done' ? '✓' : status === 'interrupted' ? '✗' : status === 'working' ? '●' : '○'}
                  </span>
                  <span className={cn('font-mono text-caption-mono-sm', status === 'pending' ? 'text-body-mid' : 'text-ink')}>
                    {node.label}
                  </span>
                  {status === 'working' && (
                    <span className="ml-auto font-mono text-caption-mono-sm text-accent-sunset">处理中...</span>
                  )}
                  {status === 'interrupted' && (
                    <span className="ml-auto font-mono text-caption-mono-sm text-red-500">被中断</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 优先级队列面板 */}
        <div className="space-y-md">
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              优先级队列
            </div>
            <div className="space-y-xs">
              {scenario.lanes.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    'rounded-sm border px-sm py-xs',
                    task.lane === 'Sync' && 'border-red-500/40 bg-red-500/5',
                    task.lane === 'Default' && 'border-accent-sunset/40 bg-accent-sunset/5',
                    task.lane === 'Transition' && 'border-accent-dusk/40 bg-accent-dusk/5',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-caption-mono-sm text-ink">{task.label}</span>
                  </div>
                  <div className="mt-xs flex items-center gap-xs">
                    <span
                      className={cn(
                        'rounded-pill px-xs py-xxs font-mono text-caption-mono-sm',
                        task.lane === 'Sync' && 'bg-red-500/20 text-red-500',
                        task.lane === 'Default' && 'bg-accent-sunset/20 text-accent-sunset',
                        task.lane === 'Transition' && 'bg-accent-dusk/20 text-accent-dusk',
                      )}
                    >
                      {task.lane}Lane
                    </span>
                    <span className="font-mono text-caption-mono-sm text-body-mid">{task.steps} 节点</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 状态指示 */}
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              当前状态
            </div>
            <div className="space-y-xs">
              <div className="flex items-center justify-between font-mono text-caption-mono-sm">
                <span className="text-body-mid">阶段</span>
                <span className="text-ink">{committed ? 'Commit' : 'Render'}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-caption-mono-sm">
                <span className="text-body-mid">中断</span>
                <span className={interrupted ? 'text-red-500' : 'text-accent-dusk'}>
                  {interrupted ? '是' : '否'}
                </span>
              </div>
              <div className="flex items-center justify-between font-mono text-caption-mono-sm">
                <span className="text-body-mid">双缓冲</span>
                <span className="text-ink">{committed ? '已切换' : '工作中'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 控制栏 */}
      <div className="mt-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={reset} className="btn-pill text-body-mid">⏹ 重置</button>
        <button type="button" onClick={stepForward} disabled={committed} className="btn-pill">
          执行一步 ▶
        </button>
        <button type="button" onClick={() => setAutoPlay((v) => !v)} className="btn-pill">
          {autoPlay ? '⏸ 暂停' : '⏯ 自动播放'}
        </button>
        {scenario.interruptions && (
          <button
            type="button"
            onClick={() => setInterrupted(true)}
            disabled={interrupted || committed}
            className="btn-pill border-red-500/40 text-red-500"
          >
            ⚡ 模拟用户输入
          </button>
        )}
        <button
          type="button"
          onClick={commit}
          disabled={committed || currentNodeIdx < totalNodes - 1}
          className="btn-pill border-accent-dusk/40 text-accent-dusk"
        >
          ✓ Commit（双缓冲切换）
        </button>
        <label className="ml-sm flex items-center gap-xs font-mono text-caption-mono-sm text-body-mid">
          速度
          <input
            type="range"
            min={200}
            max={2000}
            step={100}
            value={2200 - speed}
            onChange={(e) => setSpeed(2200 - Number(e.target.value))}
            className="w-24 accent-accent-sunset"
          />
        </label>
      </div>

      {/* 图例 */}
      <div className="mt-lg flex flex-wrap gap-lg font-mono text-caption-mono-sm text-body-mid">
        <span className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-canvas-mid" />待处理</span>
        <span className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-accent-sunset/60" />工作中</span>
        <span className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-accent-dusk/40" />已完成</span>
        <span className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-red-500/50" />被中断</span>
      </div>
    </div>
  )
}
