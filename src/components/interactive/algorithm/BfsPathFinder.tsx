/**
 * BfsPathFinder - BFS 最短路径探索器
 *
 * 在网格图上用 BFS 搜索最短路径，可视化队列扩展过程和 visited 标记。
 * 用户可点击放置/移除墙壁，支持步进/自动播放/随机墙壁/清除。
 *
 * 采用预计算策略：BFS 算法在网格状态变化时重新预录制全部步骤。
 * 颜色编码：墙壁=深色 / 未探索=白 / 队列中=浅蓝 / 已访问=蓝 / 最短路径=金
 */
import { useEffect, useMemo, useState } from 'react'
import type { BfsPathFinderData } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface BfsPathFinderProps {
  data?: BfsPathFinderData
}

type CellType = 'empty' | 'wall' | 'start' | 'end'

interface BfsStep {
  /** 当前网格状态：0=空 1=墙 2=队列中 3=已访问 4=路径 */
  grid: number[][]
  /** 队列内容 */
  queue: Array<[number, number]>
  /** 当前处理的节点 */
  current?: [number, number]
  /** 是否找到路径 */
  found: boolean
  /** 描述 */
  desc: string
}

const DIRS: Array<[number, number]> = [[0, 1], [1, 0], [0, -1], [-1, 0]]

function bfsRecord(grid: CellType[][], start: [number, number], end: [number, number]): BfsStep[] {
  const rows = grid.length
  const cols = grid[0].length
  const visited = Array.from({ length: rows }, () => new Array<boolean>(cols).fill(false))
  const parent = Array.from({ length: rows }, () => new Array<[number, number] | null>(cols).fill(null))
  const stateGrid: number[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => (grid[r][c] === 'wall' ? 1 : 0)),
  )

  const steps: BfsStep[] = []
  const queue: Array<[number, number]> = [start]
  visited[start[0]][start[1]] = true
  stateGrid[start[0]][start[1]] = 2

  steps.push({
    grid: stateGrid.map((r) => [...r]),
    queue: [...queue],
    current: start,
    found: false,
    desc: `起点 (${start[0]},${start[1]}) 入队`,
  })

  let found = false
  while (queue.length > 0) {
    const [r, c] = queue.shift()!
    stateGrid[r][c] = 3
    const isEnd = r === end[0] && c === end[1]

    steps.push({
      grid: stateGrid.map((row) => [...row]),
      queue: [...queue],
      current: [r, c],
      found: isEnd,
      desc: isEnd ? `到达终点 (${r},${c})！` : `访问 (${r},${c})，探索邻居`,
    })

    if (isEnd) {
      found = true
      break
    }

    for (const [dr, dc] of DIRS) {
      const nr = r + dr
      const nc = c + dc
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
      if (grid[nr][nc] === 'wall' || visited[nr][nc]) continue
      visited[nr][nc] = true
      parent[nr][nc] = [r, c]
      queue.push([nr, nc])
      stateGrid[nr][nc] = 2
    }
  }

  // 回溯最短路径
  if (found) {
    let cur: [number, number] | null = end
    const path: Array<[number, number]> = []
    while (cur) {
      path.push(cur)
      cur = parent[cur[0]][cur[1]]
    }
    path.reverse()
    for (const [r, c] of path) {
      stateGrid[r][c] = 4
    }
    steps.push({
      grid: stateGrid.map((row) => [...row]),
      queue: [],
      current: end,
      found: true,
      desc: `回溯最短路径，共 ${path.length - 1} 步`,
    })
  } else {
    steps.push({
      grid: stateGrid.map((row) => [...row]),
      queue: [],
      found: false,
      desc: '队列为空，无法到达终点',
    })
  }

  return steps
}

export function BfsPathFinder({ data }: BfsPathFinderProps) {
  const gridSize = data?.gridSize ?? 10
  const obstacleDensity = data?.obstacleDensity ?? 0.25

  const [grid, setGrid] = useState<CellType[][]>(() => initGrid(gridSize))
  const [start, setStart] = useState<[number, number]>([0, 0])
  const [end, setEnd] = useState<[number, number]>([gridSize - 1, gridSize - 1])
  const [mode, setMode] = useState<'wall' | 'start' | 'end'>('wall')
  const [stepIdx, setStepIdx] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [speed, setSpeed] = useState(150)

  // 预录制 BFS 步骤
  const steps = useMemo(() => bfsRecord(grid, start, end), [grid, start, end])
  const current = steps[Math.min(stepIdx, steps.length - 1)]

  function initGrid(size: number): CellType[][] {
    return Array.from({ length: size }, () => new Array<CellType>(size).fill('empty'))
  }

  function randomWalls() {
    const newGrid = initGrid(gridSize)
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if ((r === start[0] && c === start[1]) || (r === end[0] && c === end[1])) continue
        if (Math.random() < obstacleDensity) newGrid[r][c] = 'wall'
      }
    }
    setGrid(newGrid)
    setStepIdx(0)
    setAutoPlay(false)
  }

  function clearGrid() {
    setGrid(initGrid(gridSize))
    setStepIdx(0)
    setAutoPlay(false)
  }

  function handleCellClick(r: number, c: number) {
    if (mode === 'wall') {
      if ((r === start[0] && c === start[1]) || (r === end[0] && c === end[1])) return
      setGrid((g) => {
        const ng = g.map((row) => [...row])
        ng[r][c] = ng[r][c] === 'wall' ? 'empty' : 'wall'
        return ng
      })
    } else if (mode === 'start') {
      if (grid[r][c] === 'wall' || (r === end[0] && c === end[1])) return
      setStart([r, c])
    } else {
      if (grid[r][c] === 'wall' || (r === start[0] && c === start[1])) return
      setEnd([r, c])
    }
    setStepIdx(0)
    setAutoPlay(false)
  }

  // 自动播放
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      if (stepIdx >= steps.length - 1) {
        setAutoPlay(false)
      } else {
        setStepIdx((i) => i + 1)
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [autoPlay, stepIdx, speed, steps.length])

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 控制栏 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <div className="flex gap-xs rounded-sm border border-hairline p-xs">
          {(['wall', 'start', 'end'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                'rounded-sm px-md py-xs font-mono text-caption-mono-sm transition-colors',
                mode === m ? 'bg-accent-sunset/20 text-accent-sunset' : 'text-body-mid hover:text-ink',
              )}
            >
              {m === 'wall' ? '放置墙壁' : m === 'start' ? '设置起点' : '设置终点'}
            </button>
          ))}
        </div>
        <button type="button" onClick={randomWalls} className="btn-pill">
          🎲 随机墙壁
        </button>
        <button type="button" onClick={clearGrid} className="btn-pill text-body-mid">
          清除
        </button>
        <span className="mx-sm text-body-mid/40">|</span>
        <button type="button" onClick={() => { setStepIdx(0); setAutoPlay(false) }} className="btn-pill text-body-mid">
          ⏹ 重置
        </button>
        <button type="button" onClick={() => setStepIdx((i) => Math.max(0, i - 1))} className="btn-pill">
          ◀
        </button>
        <button type="button" onClick={() => setAutoPlay((v) => !v)} className="btn-pill">
          {autoPlay ? '⏸ 暂停' : '⏯ 播放'}
        </button>
        <button type="button" onClick={() => setStepIdx((i) => Math.min(steps.length - 1, i + 1))} className="btn-pill">
          ▶
        </button>
        <label className="ml-sm flex items-center gap-xs font-mono text-caption-mono-sm text-body-mid">
          速度
          <input
            type="range"
            min={50}
            max={600}
            step={50}
            value={650 - speed}
            onChange={(e) => setSpeed(650 - Number(e.target.value))}
            className="w-20 accent-accent-sunset"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_180px]">
        {/* 网格 */}
        <div className="overflow-x-auto">
          <div
            className="inline-grid gap-[2px] rounded-sm border border-hairline bg-canvas-soft p-sm"
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {current.grid.map((row, r) =>
              row.map((cell, c) => {
                const isStart = r === start[0] && c === start[1]
                const isEnd = r === end[0] && c === end[1]
                const isCurrent = current.current?.[0] === r && current.current?.[1] === c
                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    onClick={() => handleCellClick(r, c)}
                    className={cn(
                      'flex aspect-square w-7 items-center justify-center rounded-sm text-caption-mono-sm transition-colors',
                      cell === 1 && 'bg-canvas-mid',
                      cell === 0 && 'bg-canvas-card hover:bg-canvas-mid/40',
                      cell === 2 && 'bg-accent-breeze/40',
                      cell === 3 && 'bg-accent-breeze/80',
                      cell === 4 && 'bg-accent-sunset',
                      isStart && 'bg-green-500/80 text-on-primary',
                      isEnd && 'bg-red-500/80 text-on-primary',
                    )}
                    title={`(${r}, ${c})`}
                  >
                    {isStart ? 'S' : isEnd ? 'E' : isCurrent ? '●' : ''}
                  </button>
                )
              }),
            )}
          </div>
        </div>

        {/* 统计面板 */}
        <div className="space-y-md">
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              步骤
            </div>
            <div className="text-body-sm text-ink">
              {Math.min(stepIdx + 1, steps.length)} / {steps.length}
            </div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">{current.desc}</p>
          </div>

          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              队列大小
            </div>
            <div className="text-body-sm text-ink">{current.queue.length}</div>
          </div>

          {current.found && (
            <div className="rounded-sm border border-accent-sunset/40 bg-accent-sunset/10 p-md">
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
                找到路径 ✓
              </div>
            </div>
          )}

          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              图例
            </div>
            <div className="space-y-xs text-caption-mono-sm text-body-mid">
              <div className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-green-500/80" />起点</div>
              <div className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-red-500/80" />终点</div>
              <div className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-canvas-mid" />墙壁</div>
              <div className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-accent-breeze/40" />队列中</div>
              <div className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-accent-breeze/80" />已访问</div>
              <div className="flex items-center gap-xs"><span className="inline-block h-3 w-3 rounded-sm bg-accent-sunset" />最短路径</div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-lg text-caption-mono-sm text-body-mid">
        💡 无权图 BFS 最短路径：从起点逐层扩展，首次到达终点即为最短路径。
      </p>
    </div>
  )
}
