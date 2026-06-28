/**
 * ArrayMethodPlayground - 数组方法 Playground
 *
 * 选择方法 + 输入数组 + 回调函数，实时执行并展示步骤。
 * 使用 Function 构造器安全执行回调。
 */
import { useCallback, useState } from 'react'
import type { ArrayMethodData } from '../../../lib/js-visualization-types'
import { DemoCard, ControlRow, GroupLabel, PillBtn, CodeOutput } from './shared'
import { formatValue } from './shared'

interface ArrayMethodPlaygroundProps {
  data: ArrayMethodData
}

const METHODS = ['map', 'filter', 'reduce', 'forEach', 'find', 'some', 'every'] as const
type Method = (typeof METHODS)[number]

export function ArrayMethodPlayground({ data }: ArrayMethodPlaygroundProps) {
  const [method, setMethod] = useState<Method>(data.defaultMethod ?? 'map')
  const [input, setInput] = useState(data.defaultInput ?? '[1, 2, 3, 4, 5]')
  const [callback, setCallback] = useState(data.defaultCallback ?? 'n => n * 2')
  const [result, setResult] = useState<string>('点击运行查看结果')
  const [steps, setSteps] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const run = useCallback(() => {
    setSteps([])
    setError(null)
    try {
      const arr = JSON.parse(input)
      if (!Array.isArray(arr)) throw new Error('输入必须是数组')
       
      const fn = Function(`"use strict"; return (${callback});`)()
      if (typeof fn !== 'function') throw new Error('回调必须是函数')
      const newSteps: string[] = []
      let res: unknown

      if (method === 'reduce') {
        res = arr.reduce((acc: unknown, val: unknown, i: number) => {
          const r = fn(acc, val, i, [...arr])
          newSteps.push(`步骤 ${i + 1}: acc=${formatValue(acc)}, val=${formatValue(val)} → ${formatValue(r)}`)
          return r
        })
      } else if (method === 'forEach') {
        arr.forEach((val: unknown, i: number) => {
          const r = fn(val, i, [...arr])
          newSteps.push(`索引 ${i}: ${formatValue(val)} → ${formatValue(r)}`)
        })
        res = undefined
      } else {
        const fn2 = fn as (val: unknown, i: number, arr: unknown[]) => unknown
        const arr2 = arr as unknown[]
        const cb = (val: unknown, i: number) => {
          const r = fn2(val, i, [...arr2])
          newSteps.push(`索引 ${i}: ${formatValue(val)} → ${formatValue(r)}`)
          return r
        }
        if (method === 'map') res = arr2.map(cb)
        else if (method === 'filter') res = arr2.filter(cb)
        else if (method === 'find') res = arr2.find(cb)
        else if (method === 'some') res = arr2.some(cb)
        else if (method === 'every') res = arr2.every(cb)
      }

      setSteps(newSteps)
      setResult(formatValue(res))
    } catch (e) {
      setError((e as Error).message)
      setResult('执行失败')
    }
  }, [method, input, callback])

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>方法</GroupLabel>
        {METHODS.map((m) => (
          <PillBtn key={m} active={method === m} onClick={() => setMethod(m)}>
            {m}
          </PillBtn>
        ))}
      </ControlRow>

      <div className="flex flex-col gap-sm p-md">
        <div className="grid grid-cols-1 gap-sm lg:grid-cols-2">
          <div>
            <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">输入数组 (JSON)</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-xs border border-hairline bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
            />
          </div>
          <div>
            <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">回调函数</label>
            <input
              type="text"
              value={callback}
              onChange={(e) => setCallback(e.target.value)}
              className="w-full rounded-xs border border-hairline bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-accent-breeze outline-none focus:border-accent-sunset"
            />
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <button
            type="button"
            onClick={run}
            className="rounded-pill bg-accent-sunset px-md py-xs font-mono text-caption-mono-sm font-bold text-black transition-all hover:scale-105"
          >
            ▶ 运行
          </button>
          {error && <span className="font-mono text-caption-mono-sm text-red-400">错误: {error}</span>}
        </div>

        {/* 执行步骤 */}
        {steps.length > 0 && (
          <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
            <div className="mb-1 text-[0.62rem] uppercase text-body-mid">执行步骤</div>
            <div className="flex flex-col gap-px font-mono text-[0.62rem] text-body">
              {steps.map((s, i) => (
                <div key={i} className="py-px">
                  <span className="text-body-mid">{String(i + 1).padStart(2, '0')}.</span> {s}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* 结果 */`}</span>
        {'\n'}
        <span className="text-accent-sunset">{result}</span>
      </CodeOutput>
    </DemoCard>
  )
}
