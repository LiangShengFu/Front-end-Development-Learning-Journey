/**
 * HashTableVisualizer - 哈希表可视化
 *
 * 展示哈希函数计算 + 冲突解决（链地址法 / 线性探测）。
 */
import { useEffect, useState } from 'react'
import type { HashTableVisualizerData } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface HashTableVisualizerProps {
  data?: HashTableVisualizerData
}

interface HashStep {
  /** 当前操作：insert / search / delete */
  action: 'insert' | 'search' | 'delete'
  /** 操作的键 */
  key: string
  /** 哈希值 */
  hash: number
  /** 桶索引 */
  bucketIdx: number
  /** 桶内容快照（链地址：每个桶是数组；线性探测：桶数组中部分被占） */
  buckets: string[][]
  /** 高亮桶索引 */
  highlightBucket: number
  /** 探测序列（线性探测用） */
  probePath: number[]
  /** 当前步骤描述 */
  desc: string
  /** 是否成功 */
  success?: boolean
}

const DEFAULT_KEYS = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape']

/** 简单哈希函数：字符码累加 + 取模 */
function hashModulo(key: string, bucketCount: number): number {
  let h = 0
  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) >>> 0
  }
  return h % bucketCount
}

/** 生成插入步骤 */
function buildInsertSteps(
  keys: string[],
  bucketCount: number,
  strategy: 'chaining' | 'linear-probing',
): HashStep[] {
  const steps: HashStep[] = []
  // 链地址：buckets[i] 是链表；线性探测：buckets[i] 单元素或空
  const buckets: string[][] = Array.from({ length: bucketCount }, () => [])

  for (const key of keys) {
    const hash = hashModulo(key, bucketCount)
    const startIdx = hash

    if (strategy === 'chaining') {
      // 链地址法：直接加到链尾
      const existIdx = buckets[startIdx].indexOf(key)
      const probePath: number[] = [startIdx]
      steps.push({
        action: 'insert',
        key,
        hash,
        bucketIdx: startIdx,
        buckets: buckets.map((b) => [...b]),
        highlightBucket: startIdx,
        probePath,
        desc: `插入 "${key}"：hash("${key}") = ${hash}，定位桶 ${startIdx}${
          existIdx >= 0 ? '（已存在，跳过）' : `，加到链尾（链长度 ${buckets[startIdx].length + 1}）`
        }`,
      })
      if (existIdx < 0) buckets[startIdx].push(key)
      steps.push({
        action: 'insert',
        key,
        hash,
        bucketIdx: startIdx,
        buckets: buckets.map((b) => [...b]),
        highlightBucket: startIdx,
        probePath,
        desc: `完成插入 "${key}"`,
        success: true,
      })
    } else {
      // 线性探测：找到第一个空桶
      let idx = startIdx
      let probe = 0
      const probePath: number[] = []
      let foundEmpty = false
      let alreadyExist = false
      while (probe < bucketCount) {
        probePath.push(idx)
        if (buckets[idx].length === 0) {
          foundEmpty = true
          break
        }
        if (buckets[idx][0] === key) {
          alreadyExist = true
          break
        }
        steps.push({
          action: 'insert',
          key,
          hash,
          bucketIdx: idx,
          buckets: buckets.map((b) => [...b]),
          highlightBucket: idx,
          probePath: [...probePath],
          desc: `插入 "${key}"：探测桶 ${idx}（已占用：${buckets[idx][0]}），继续向后探测`,
        })
        idx = (idx + 1) % bucketCount
        probe++
      }
      if (alreadyExist) {
        steps.push({
          action: 'insert',
          key,
          hash,
          bucketIdx: idx,
          buckets: buckets.map((b) => [...b]),
          highlightBucket: idx,
          probePath,
          desc: `插入 "${key}"：在桶 ${idx} 找到重复键，跳过`,
          success: true,
        })
      } else if (foundEmpty) {
        buckets[idx] = [key]
        steps.push({
          action: 'insert',
          key,
          hash,
          bucketIdx: idx,
          buckets: buckets.map((b) => [...b]),
          highlightBucket: idx,
          probePath,
          desc: `插入 "${key}"：在桶 ${idx} 找到空位（探测 ${probePath.length} 次）`,
          success: true,
        })
      } else {
        steps.push({
          action: 'insert',
          key,
          hash,
          bucketIdx: startIdx,
          buckets: buckets.map((b) => [...b]),
          highlightBucket: startIdx,
          probePath,
          desc: `插入 "${key}" 失败：哈希表已满`,
        })
      }
    }
  }
  return steps
}

export function HashTableVisualizer({ data }: HashTableVisualizerProps) {
  const initialBucketCount = data?.bucketCount ?? 7
  const initialStrategy = data?.strategy ?? 'chaining'
  const initialKeys = data?.keys ?? DEFAULT_KEYS

  const [bucketCount, setBucketCount] = useState(initialBucketCount)
  const [strategy, setStrategy] = useState<'chaining' | 'linear-probing'>(initialStrategy)
  const [keys, setKeys] = useState<string[]>(initialKeys)
  const [inputKey, setInputKey] = useState('')
  const [steps, setSteps] = useState<HashStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)

  const rerun = (newKeys?: string[], newStrategy?: 'chaining' | 'linear-probing', newCount?: number) => {
    const k = newKeys ?? keys
    const s = newStrategy ?? strategy
    const c = newCount ?? bucketCount
    const newSteps = buildInsertSteps(k, c, s)
    setSteps(newSteps)
    setStepIndex(0)
  }

  useEffect(() => {
    rerun(initialKeys, initialStrategy, initialBucketCount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const switchStrategy = (s: 'chaining' | 'linear-probing') => {
    setStrategy(s)
    rerun(keys, s, bucketCount)
    setAutoPlay(false)
  }

  const switchBucketCount = (c: number) => {
    setBucketCount(c)
    rerun(keys, strategy, c)
    setAutoPlay(false)
  }

  const addKey = () => {
    const k = inputKey.trim()
    if (!k) return
    const newKeys = [...keys, k]
    setKeys(newKeys)
    setInputKey('')
    rerun(newKeys, strategy, bucketCount)
    setAutoPlay(true)
  }

  const reset = () => {
    setKeys([])
    setSteps([])
    setStepIndex(0)
    setAutoPlay(false)
  }

  const goToStep = (idx: number) => {
    if (idx < 0 || idx >= steps.length) return
    setStepIndex(idx)
  }

  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      if (stepIndex >= steps.length - 1) {
        setAutoPlay(false)
      } else {
        goToStep(stepIndex + 1)
      }
    }, 500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, stepIndex])

  const currentStep = steps[stepIndex]
  const loadFactor = keys.length / bucketCount

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 控制面板 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <div className="flex items-center gap-xs">
          <span className="font-mono text-caption-mono-sm text-body-mid">策略</span>
          {(['chaining', 'linear-probing'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => switchStrategy(s)}
              className={cn('btn-pill', strategy === s && 'border-accent-sunset text-accent-sunset')}
            >
              {s === 'chaining' ? '链地址法' : '线性探测'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-xs">
          <span className="font-mono text-caption-mono-sm text-body-mid">桶数</span>
          {[5, 7, 11].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => switchBucketCount(c)}
              className={cn('btn-pill', bucketCount === c && 'border-accent-sunset text-accent-sunset')}
            >
              {c}
            </button>
          ))}
        </div>
        <button type="button" onClick={reset} className="btn-pill ml-auto">
          重置
        </button>
      </div>

      {/* 输入区 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
        <input
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addKey()}
          placeholder="输入键名（如 apple）"
          className="flex-1 min-w-[180px] rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        <button type="button" onClick={addKey} className="btn-pill">
          插入
        </button>
        <span className="font-mono text-caption-mono-sm text-body-mid">
          已插入 {keys.length} / 负载因子 {loadFactor.toFixed(2)}
        </span>
      </div>

      {/* 步进控制 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={() => goToStep(stepIndex - 1)} disabled={stepIndex <= 0} className="btn-pill">
          上一步
        </button>
        <button
          type="button"
          onClick={() => goToStep(stepIndex + 1)}
          disabled={stepIndex >= steps.length - 1}
          className="btn-pill"
        >
          下一步
        </button>
        <button type="button" onClick={() => setAutoPlay((v) => !v)} className="btn-pill">
          {autoPlay ? '暂停' : '自动播放'}
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          步骤 {stepIndex} / {Math.max(0, steps.length - 1)}
        </span>
      </div>

      {/* 哈希表可视化 */}
      {currentStep && (
        <div className="mb-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            哈希表（{strategy === 'chaining' ? '链地址法' : '线性探测'}）
          </div>
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            {currentStep.buckets.map((bucket, idx) => {
              const isHighlight = currentStep.highlightBucket === idx
              const isProbe = currentStep.probePath.includes(idx) && !isHighlight
              return (
                <div
                  key={idx}
                  className={cn(
                    'mb-xs flex items-center gap-md rounded-sm border px-md py-xs transition-all duration-300',
                    isHighlight
                      ? 'border-accent-sunset bg-accent-sunset/10'
                      : isProbe
                        ? 'border-accent-breeze/40 bg-accent-breeze/5'
                        : 'border-hairline bg-canvas-card',
                  )}
                >
                  <div className="flex h-8 w-12 flex-col items-center justify-center rounded-sm border border-hairline bg-canvas-soft">
                    <span className="font-mono text-caption-mono-sm text-body-mid">桶</span>
                    <span className="font-mono text-caption-mono text-ink">{idx}</span>
                  </div>
                  <div className="flex flex-1 flex-wrap items-center gap-xs">
                    {bucket.length === 0 ? (
                      <span className="font-mono text-caption-mono-sm text-body-mid">∅</span>
                    ) : (
                      bucket.map((k, i) => (
                        <span
                          key={i}
                          className={cn(
                            'rounded-sm border px-md py-xs font-mono text-caption-mono',
                            isHighlight && k === currentStep.key
                              ? 'border-accent-sunset bg-accent-sunset/15 text-accent-sunset'
                              : 'border-hairline bg-canvas-card text-ink',
                          )}
                        >
                          {k}
                          {strategy === 'chaining' && i < bucket.length - 1 && (
                            <span className="ml-md text-body-mid">→</span>
                          )}
                        </span>
                      ))
                    )}
                  </div>
                  {isHighlight && (
                    <span className="font-mono text-caption-mono-sm text-accent-sunset">
                      {currentStep.probePath.length > 1 ? `探测 ${currentStep.probePath.length} 次` : '命中'}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 哈希函数 */}
      <div className="mb-md rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          哈希函数
        </div>
        <code className="font-mono text-caption-mono text-ink">
          h(key) = (Σ key[i] · 31ⁱ) mod {bucketCount}
        </code>
      </div>

      {/* 当前步骤描述 */}
      {currentStep && (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            当前步骤
          </div>
          <div className="font-mono text-caption-mono text-ink">{currentStep.desc}</div>
        </div>
      )}
    </div>
  )
}
