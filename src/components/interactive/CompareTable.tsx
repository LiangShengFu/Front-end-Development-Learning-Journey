/**
 * CompareTable - 多列对比表格
 *
 * 用于对比多个对象在不同维度上的差异。
 * 遵循设计规范：canvas-soft 表头，hairline 行边框，mono 表头字体。
 */
import type { CompareTableData } from '../../lib/types'
import { cn } from '../../lib/utils'

interface CompareTableProps {
  data: CompareTableData
}

export function CompareTable({ data }: CompareTableProps) {
  const { featureColumn, columns, rows, highlightColumn } = data

  return (
    <div className="overflow-x-auto rounded-sm border border-hairline">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-canvas-soft">
            <th className="border-b border-hairline px-lg py-md text-left font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink">
              {featureColumn}
            </th>
            {columns.map((col, i) => (
              <th
                key={i}
                className={cn(
                  'border-b border-hairline px-lg py-md text-left font-mono text-caption-mono-sm uppercase tracking-[1.2px]',
                  highlightColumn === i ? 'text-accent-sunset' : 'text-ink',
                )}
              >
                {col}
                {highlightColumn === i && (
                  <span className="ml-xs font-mono text-caption-mono-sm text-accent-sunset">
                    ★
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-hairline last:border-b-0">
              <td className="px-lg py-md text-body-sm text-ink">{row.feature}</td>
              {row.values.map((val, ci) => (
                <td
                  key={ci}
                  className={cn(
                    'px-lg py-md text-body-sm',
                    highlightColumn === ci ? 'bg-accent-sunset/5 text-ink' : 'text-body',
                  )}
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
