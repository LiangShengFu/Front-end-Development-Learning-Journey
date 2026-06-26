/**
 * EqualityComparator - 相等性比较器
 *
 * 双栏输入实时比较 == vs === 或 ?? vs ||，安全执行字面量表达式。
 */
import { useMemo, useState } from 'react'
import type { EqualityComparatorData } from '../../../lib/js-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, PillBtn, TextInput, GroupLabel, safeEval, formatValue } from './shared'

interface EqualityComparatorProps {
  data: EqualityComparatorData
}

export function EqualityComparator({ data }: EqualityComparatorProps) {
  const [left, setLeft] = useState(data.defaultLeft ?? '0')
  const [right, setRight] = useState(data.defaultRight ?? '""')
  const [mode, setMode] = useState<'equality' | 'nullish'>(data.defaultMode ?? 'equality')

  const result = useMemo(() => {
    const l = safeEval(left)
    const r = safeEval(right)
    if (mode === 'equality') {
      return {
        items: [
          {
            op: '==',
            value: l == r,
            explain: '== 进行类型转换后比较（隐式转换）',
          },
          {
            op: '===',
            value: l === r,
            explain: '=== 不转换类型直接比较（严格相等）',
          },
        ],
      }
    }
    return {
      items: [
        {
          op: '??',
          value: formatValue(l ?? r),
          explain: '?? 仅在 null/undefined 时使用右侧',
        },
        {
          op: '||',
          value: formatValue(l || r),
          explain: '|| 在所有 falsy 值时使用右侧',
        },
      ],
    }
  }, [left, right, mode])

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>模式</GroupLabel>
        <PillBtn active={mode === 'equality'} onClick={() => setMode('equality')}>
          == vs ===
        </PillBtn>
        <PillBtn active={mode === 'nullish'} onClick={() => setMode('nullish')}>
          ?? vs ||
        </PillBtn>
      </ControlRow>

      <div className="flex flex-col gap-sm p-md">
        <div className="flex items-center gap-sm">
          <div className="flex-1">
            <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">左值</label>
            <TextInput value={left} onChange={setLeft} placeholder="如 0、''、null" />
          </div>
          <span className="mt-4 font-mono text-body font-bold text-accent-sunset">
            {mode === 'equality' ? '?' : '?'}
          </span>
          <div className="flex-1">
            <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">右值</label>
            <TextInput value={right} onChange={setRight} placeholder="如 false、''、0" />
          </div>
        </div>

        {/* 快捷示例 */}
        {data.examples && (
          <div className="flex flex-wrap gap-xs">
            {data.examples.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => {
                  setLeft(ex.left)
                  setRight(ex.right)
                  setMode(ex.mode)
                }}
                className="rounded-pill border border-hairline bg-canvas-mid px-sm py-px text-[0.62rem] font-mono text-body-mid hover:border-accent-sunset hover:text-accent-sunset"
              >
                {ex.label}
              </button>
            ))}
          </div>
        )}

        {/* 结果对比 */}
        <div className="grid grid-cols-2 gap-sm">
          {result.items.map((item) => (
            <div key={item.op} className="rounded-xs border border-hairline bg-canvas-soft p-sm">
              <div className="flex items-center justify-between">
                <code className="font-mono text-body font-bold text-accent-sunset">{item.op}</code>
                <span
                  className={cn(
                    'rounded-pill px-sm py-px font-mono text-caption-mono-sm font-bold',
                    typeof item.value === 'boolean'
                      ? item.value
                        ? 'bg-accent-breeze/20 text-accent-breeze'
                        : 'bg-red-400/20 text-red-400'
                      : 'bg-accent-sunset/20 text-accent-sunset',
                  )}
                >
                  {String(item.value)}
                </span>
              </div>
              <p className="mt-1 text-[0.62rem] text-body-mid">{item.explain}</p>
            </div>
          ))}
        </div>
      </div>
    </DemoCard>
  )
}
