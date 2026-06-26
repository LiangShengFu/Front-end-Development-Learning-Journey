/**
 * SetDataPerformanceComparator — setData 性能对比器
 *
 * 量化对比三种 setData 模式的性能差异：
 * - full-transfer（全量传输，红色）：每次传整个大对象
 * - path-update（路径局部更新，绿色）：用路径表达式只改局部
 * - merged-call（合并调用，蓝色）：多个 setData 合并成一次
 *
 * 展示模拟传输字节数 / 通信次数 / 渲染耗时 / 性能评分 + 对比柱状图。
 *
 * ⚠️ 教学模拟：性能数据为预设值，非真实 benchmark 结果。
 */
import { useState } from 'react'
import type {
  SetDataPerformanceComparatorData,
  SetDataPerformanceCase,
  SetDataMode,
} from '../../../lib/miniprogram-visualization-types'
import { cn } from '../../../lib/utils'

interface SetDataPerformanceComparatorProps {
  data?: SetDataPerformanceComparatorData
}

/** 默认性能对比用例 */
const DEFAULT_CASES: SetDataPerformanceCase[] = [
  {
    id: 'full-transfer',
    label: '全量传输',
    description: '把整个大数组重新 setData，跨线程传输完整数据。',
    code: `// ❌ 全量传输：12.3KB 数据反复传输
this.setData({
  list: this.data.list.map((item) =>
    item.id === id ? { ...item, name: newName } : item
  )
})`,
    metrics: { transferBytes: 12300, callCount: 3, renderMs: 28, score: 1 },
    isOptimal: false,
  },
  {
    id: 'path-update',
    label: '路径局部更新',
    description: '用路径表达式只更新数组的某一个元素字段。',
    code: `// ✅ 局部更新：仅 0.1KB 数据
this.setData({
  [\`list[\${index}].name\`]: newName
})`,
    metrics: { transferBytes: 100, callCount: 1, renderMs: 4, score: 5 },
    isOptimal: true,
  },
  {
    id: 'merged-call',
    label: '合并调用',
    description: '把多次 setData 合并成一次，减少跨线程通信次数。',
    code: `// ✅ 合并调用：1 次通信完成多处更新
this.setData({
  a: 1,
  b: 2,
  [\`list[\${index}].name\`]: newName
})`,
    metrics: { transferBytes: 300, callCount: 1, renderMs: 8, score: 4 },
    isOptimal: false,
  },
]

/** 模式主题色（全量=红 / 局部=绿 / 合并=蓝） */
const MODE_THEME: Record<SetDataMode, { color: string; bg: string; border: string }> = {
  'full-transfer': { color: '#ef4444', bg: 'rgba(239,68,68,0.10)', border: 'rgba(239,68,68,0.4)' },
  'path-update': { color: '#07c160', bg: 'rgba(7,193,96,0.10)', border: 'rgba(7,193,96,0.4)' },
  'merged-call': { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', border: 'rgba(26,108,255,0.4)' },
}

/** 柱状图最大值（用于归一化） */
const MAX_BYTES = 12300
const MAX_RENDER_MS = 28

export function SetDataPerformanceComparator({ data }: SetDataPerformanceComparatorProps) {
  const cases = data?.cases ?? DEFAULT_CASES
  const [activeId, setActiveId] = useState<SetDataMode>(cases[0]?.id ?? 'full-transfer')

  const active = cases.find((c) => c.id === activeId) ?? cases[0]
  const theme = MODE_THEME[active.id]

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：性能数据为预设教学值，非真实 benchmark 结果。
      </div>

      {/* 模式切换卡片 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-3">
        {cases.map((c) => {
          const t = MODE_THEME[c.id]
          const isActive = c.id === activeId
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={cn('rounded-sm border p-md text-left transition-all')}
              style={{
                borderColor: isActive ? t.border : 'rgba(125,125,125,0.2)',
                background: isActive ? t.bg : 'transparent',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-body-sm font-bold" style={{ color: t.color }}>
                  {c.label}
                </span>
                {c.isOptimal && (
                  <span className="rounded-pill bg-[#07c160]/15 px-sm py-xs font-mono text-caption-mono-sm text-[#07c160]">
                    最优
                  </span>
                )}
              </div>
              <p className="mt-xs text-caption-mono-sm text-body-mid">{c.description}</p>
            </button>
          )
        })}
      </div>

      {/* 代码 + 指标 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            代码示例
          </h4>
          <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink">
            <code>{active.code}</code>
          </pre>
        </div>
        <div>
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            性能指标
          </h4>
          <div className="space-y-md rounded-sm border border-hairline bg-canvas-card p-md">
            <MetricRow label="传输字节" value={`${(active.metrics.transferBytes / 1024).toFixed(2)}KB`} color={theme.color} />
            <MetricRow label="通信次数" value={`${active.metrics.callCount} 次`} color={theme.color} />
            <MetricRow label="渲染耗时" value={`${active.metrics.renderMs}ms`} color={theme.color} />
            <div>
              <div className="flex items-center justify-between font-mono text-caption-mono-sm text-body-mid">
                <span>性能评分</span>
                <span className="text-ink">{active.metrics.score} / 5</span>
              </div>
              <div className="mt-xs flex gap-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-xs flex-1 rounded-pill"
                    style={{
                      background: i < active.metrics.score ? theme.color : 'rgba(125,125,125,0.2)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 对比柱状图 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          三种模式开销对比
        </h4>
        <div className="space-y-md">
          {cases.map((c) => {
            const t = MODE_THEME[c.id]
            const bytePct = (c.metrics.transferBytes / MAX_BYTES) * 100
            const renderPct = (c.metrics.renderMs / MAX_RENDER_MS) * 100
            return (
              <div key={c.id} className="space-y-xs">
                <div className="flex items-center justify-between font-mono text-caption-mono-sm">
                  <span style={{ color: t.color }}>{c.label}</span>
                  <span className="text-body-mid">
                    {(c.metrics.transferBytes / 1024).toFixed(2)}KB · {c.metrics.renderMs}ms
                  </span>
                </div>
                {/* 字节柱 */}
                <div className="flex items-center gap-sm">
                  <span className="w-xs shrink-0 font-mono text-caption-mono-sm text-body-mid">字节</span>
                  <div className="h-sm flex-1 overflow-hidden rounded-pill bg-hairline/30">
                    <div className="h-full rounded-pill transition-all" style={{ width: `${bytePct}%`, background: t.color }} />
                  </div>
                </div>
                {/* 渲染柱 */}
                <div className="flex items-center gap-sm">
                  <span className="w-xs shrink-0 font-mono text-caption-mono-sm text-body-mid">耗时</span>
                  <div className="h-sm flex-1 overflow-hidden rounded-pill bg-hairline/30">
                    <div className="h-full rounded-pill transition-all" style={{ width: `${renderPct}%`, background: t.color, opacity: 0.7 }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/** 单行指标 */
function MetricRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between font-mono text-caption-mono-sm">
      <span className="text-body-mid">{label}</span>
      <span className="font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  )
}
