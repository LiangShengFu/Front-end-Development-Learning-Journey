/**
 * LruCacheSimulator - LRU 缓存模拟器
 *
 * 可视化 LRU 缓存的 get / put 操作，展示 Map 的内部顺序变化。
 * 最近访问的 key 移到末尾，超出 capacity 时删除第一个（最久未使用）。
 * 支持单步执行预设序列和手动操作。
 */
import { useEffect, useState } from 'react'
import type { LruCacheSimulatorData, LruOperation } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface LruCacheSimulatorProps {
  data?: LruCacheSimulatorData
}

interface CacheEntry {
  key: string
  value: string
  /** 最近一次操作类型，用于颜色高亮 */
  lastOp: 'get' | 'put' | 'evicted' | 'idle'
}

const DEFAULT_OPERATIONS: LruOperation[] = [
  { type: 'put', key: '1', value: 'A' },
  { type: 'put', key: '2', value: 'B' },
  { type: 'put', key: '3', value: 'C' },
  { type: 'get', key: '2' },
  { type: 'put', key: '4', value: 'D' },
  { type: 'get', key: '1' },
  { type: 'put', key: '5', value: 'E' },
]

export function LruCacheSimulator({ data }: LruCacheSimulatorProps) {
  const capacity = data?.capacity ?? 3
  const operations = data?.operations ?? DEFAULT_OPERATIONS

  const [cache, setCache] = useState<CacheEntry[]>([])
  const [log, setLog] = useState<string[]>(['就绪 · capacity = ' + capacity])
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [inputKey, setInputKey] = useState('')
  const [inputValue, setInputValue] = useState('')

  /** 执行单个 LRU 操作，返回新缓存和日志 */
  function executeOp(op: LruOperation, currentCache: CacheEntry[]): { cache: CacheEntry[]; log: string } {
    if (op.type === 'get') {
      const idx = currentCache.findIndex((e) => e.key === op.key)
      if (idx === -1) {
        return { cache: currentCache, log: `get(${op.key}) → -1（未命中）` }
      }
      // 命中：移到末尾（最近使用）
      const entry = currentCache[idx]
      const rest = currentCache.filter((_, i) => i !== idx)
      const newCache = [...rest, { ...entry, lastOp: 'get' as const }]
      return { cache: newCache, log: `get(${op.key}) → ${entry.value}（命中，刷新到最近使用）` }
    }
    // put 操作
    const idx = currentCache.findIndex((e) => e.key === op.key)
    let newCache: CacheEntry[]
    if (idx >= 0) {
      // 已存在：更新值并移到末尾
      const rest = currentCache.filter((_, i) => i !== idx)
      newCache = [...rest, { key: op.key, value: op.value ?? '', lastOp: 'put' as const }]
      return { cache: newCache, log: `put(${op.key}, ${op.value}) → 更新并刷新` }
    }
    // 新增
    newCache = [...currentCache, { key: op.key, value: op.value ?? '', lastOp: 'put' as const }]
    if (newCache.length > capacity) {
      // 淘汰最久未使用（第一个）
      const evicted = newCache[0]
      newCache = newCache.slice(1)
      return { cache: newCache, log: `put(${op.key}, ${op.value}) → 淘汰 key=${evicted.key}（LRU）` }
    }
    return { cache: newCache, log: `put(${op.key}, ${op.value}) → 新增` }
  }

  /** 单步执行预设序列的下一个操作 */
  const stepForward = () => {
    if (stepIndex >= operations.length) return
    const op = operations[stepIndex]
    setCache((prev) => {
      const result = executeOp(op, prev)
      setLog((l) => [result.log, ...l].slice(0, 8))
      return result.cache.map((e) => ({ ...e, lastOp: 'idle' }))
    })
    setStepIndex((i) => i + 1)
  }

  /** 手动执行 put/get */
  const handleManual = (type: 'get' | 'put') => {
    if (!inputKey) return
    const op: LruOperation = { type, key: inputKey, value: inputValue }
    setCache((prev) => {
      const result = executeOp(op, prev)
      setLog((l) => [result.log, ...l].slice(0, 8))
      return result.cache.map((e) => ({ ...e, lastOp: 'idle' }))
    })
    setInputKey('')
    setInputValue('')
  }

  const reset = () => {
    setCache([])
    setLog(['已重置 · capacity = ' + capacity])
    setStepIndex(0)
    setAutoPlay(false)
  }

  // 自动播放
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      if (stepIndex >= operations.length) {
        setAutoPlay(false)
      } else {
        stepForward()
      }
    }, 900)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, stepIndex])

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 控制栏 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={stepForward} disabled={stepIndex >= operations.length} className="btn-pill">
          单步 ▶
        </button>
        <button type="button" onClick={() => setAutoPlay((v) => !v)} className="btn-pill">
          {autoPlay ? '暂停 ⏸' : '自动播放 ⏯'}
        </button>
        <button type="button" onClick={reset} className="btn-pill text-body-mid">
          重置 ⏹
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          步骤 {stepIndex} / {operations.length}
        </span>
      </div>

      {/* 手动操作区 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">手动操作：</span>
        <input
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="key"
          className="w-20 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="value"
          className="w-20 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        <button type="button" onClick={() => handleManual('put')} className="btn-pill">
          put
        </button>
        <button type="button" onClick={() => handleManual('get')} className="btn-pill">
          get
        </button>
      </div>

      {/* Map 内部顺序可视化 */}
      <div className="mb-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          Map 内部顺序（最左=最久未使用 → 最右=最近使用）
        </div>
        <div className="flex min-h-[72px] flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
          {cache.length === 0 && (
            <span className="py-md text-body-sm text-body-mid">缓存为空</span>
          )}
          {cache.map((entry, idx) => (
            <div
              key={entry.key + idx}
              className={cn(
                'flex flex-col items-center rounded-sm border px-md py-sm transition-all duration-300',
                entry.lastOp === 'get' && 'border-accent-breeze/60 bg-accent-breeze/10',
                entry.lastOp === 'put' && 'border-accent-sunset/60 bg-accent-sunset/10',
                entry.lastOp === 'idle' && 'border-hairline bg-canvas-card',
              )}
            >
              <span className="font-mono text-caption-mono-sm text-body-mid">key: {entry.key}</span>
              <span className="mt-xs font-mono text-body-sm text-ink">val: {entry.value}</span>
              {idx === 0 && cache.length === capacity && (
                <span className="mt-xs font-mono text-caption-mono-sm text-body-mid">← 下次淘汰</span>
              )}
              {idx === cache.length - 1 && cache.length > 0 && (
                <span className="mt-xs font-mono text-caption-mono-sm text-accent-sunset">最近使用</span>
              )}
            </div>
          ))}
          {Array.from({ length: Math.max(0, capacity - cache.length) }).map((_, i) => (
            <div
              key={'empty-' + i}
              className="flex h-[60px] w-[80px] items-center justify-center rounded-sm border border-dashed border-hairline text-body-mid/40"
            >
              空
            </div>
          ))}
        </div>
        <div className="mt-xs flex justify-between font-mono text-caption-mono-sm text-body-mid">
          <span>容量: {cache.length} / {capacity}</span>
          <span>← 淘汰方向</span>
        </div>
      </div>

      {/* 日志面板 */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          操作日志
        </div>
        <div className="space-y-xs">
          {log.map((line, i) => (
            <div key={i} className={cn('font-mono text-caption-mono-sm', i === 0 ? 'text-ink' : 'text-body-mid')}>
              <span className="text-body-mid/60">{String(log.length - i).padStart(2, '0')}.</span> {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
