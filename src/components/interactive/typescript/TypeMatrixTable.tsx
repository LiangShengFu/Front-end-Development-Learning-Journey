/**
 * TypeMatrixTable — 类型对比矩阵表
 *
 * 多维度对比 TypeScript 核心类型，帮助理解易混淆概念。
 * 如 any vs unknown vs never、interface vs type、映射类型等。
 *
 * 对应docx中演示 #3 和 #11
 */
import type { TypeMatrixTableData } from '../../../lib/typescript-visualization-types'
import { cn } from '../../../lib/utils'

interface TypeMatrixTableProps {
  data?: TypeMatrixTableData
}

const DEFAULT_ROWS = [
  {
    type: 'any',
    description: '任意类型，关闭类型检查',
    assignable: 'yes' as const,
    nullable: 'yes' as const,
    typeofResult: '—（关闭检查）',
    recommendation: '🚫 避免使用，丢失所有类型安全',
    example: 'let x: any = 42\nx = "hello"  // OK\nx.foo()     // 不报错',
  },
  {
    type: 'unknown',
    description: '安全的 any 替代品',
    assignable: 'yes' as const,
    nullable: 'yes' as const,
    typeofResult: '—（需类型收窄）',
    recommendation: '✅ 替代 any 的安全选择',
    example: 'let x: unknown = 42\nx.foo()     // ❌ 报错\nif (typeof x === "string") {\n  x.toUpperCase()  // ✅\n}',
  },
  {
    type: 'never',
    description: '永远不存在的值类型',
    assignable: 'yes' as const,
    nullable: 'no' as const,
    typeofResult: 'never',
    recommendation: '✅ 用于穷尽性检查和错误分支',
    example: 'function error(): never {\n  throw new Error()\n}',
  },
  {
    type: 'void',
    description: '无返回值（undefined）',
    assignable: 'no' as const,
    nullable: 'no' as const,
    typeofResult: 'undefined',
    recommendation: '✅ 标注无返回值的函数',
    example: 'function log(msg: string): void {\n  console.log(msg)\n  // 无 return\n}',
  },
  {
    type: 'null',
    description: '空值（需 strictNullChecks）',
    assignable: 'conditional' as const,
    nullable: 'yes' as const,
    typeofResult: 'object',
    recommendation: '⚠ 开启 strictNullChecks 后严格区分',
    example: 'let x: null = null\nif (strictNullChecks) {\n  let y: string = x  // ❌\n}',
  },
  {
    type: 'undefined',
    description: '未定义值',
    assignable: 'conditional' as const,
    nullable: 'yes' as const,
    typeofResult: 'undefined',
    recommendation: '⚠ 注意与 null 区分',
    example: 'let x: undefined = undefined\nlet y: string | undefined\nif (y !== undefined) y.toUpperCase()',
  },
]

export function TypeMatrixTable({ data }: TypeMatrixTableProps) {
  const rows = data?.rows ?? DEFAULT_ROWS

  const yesNoIcon = (val: string) => {
    if (val === 'yes') return <span className="text-accent-sunset">✓</span>
    if (val === 'no') return <span className="text-red-500">✕</span>
    return <span className="text-accent-dusk">~</span>
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-hairline">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-canvas-soft">
            <th className="border-b border-hairline px-lg py-md text-left font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink">
              类型
            </th>
            <th className="border-b border-hairline px-lg py-md text-left font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink">
              含义
            </th>
            <th className="border-b border-hairline px-lg py-md text-center font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink">
              可赋值
            </th>
            <th className="border-b border-hairline px-lg py-md text-center font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink">
              可为空
            </th>
            <th className="border-b border-hairline px-lg py-md text-left font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink">
              typeof
            </th>
            <th className="border-b border-hairline px-lg py-md text-left font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink">
              使用建议
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-b border-hairline last:border-b-0 transition-colors',
                data?.highlightRow === i ? 'bg-accent-sunset/5' : undefined,
              )}
            >
              <td className="whitespace-nowrap px-lg py-md">
                <code className="font-mono text-body-sm text-accent-sunset">{row.type}</code>
              </td>
              <td className="px-lg py-md text-body-sm text-body">{row.description}</td>
              <td className="px-lg py-md text-center">{yesNoIcon(row.assignable)}</td>
              <td className="px-lg py-md text-center">{yesNoIcon(row.nullable)}</td>
              <td className="px-lg py-md">
                <code className="font-mono text-caption-mono-sm text-body-mid">{row.typeofResult}</code>
              </td>
              <td className="px-lg py-md text-body-sm text-body-mid">{row.recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Example codes */}
      <div className="border-t border-hairline bg-canvas-soft">
        <div className="px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          示例代码
        </div>
        <div className="grid gap-sm p-lg sm:grid-cols-2">
          {rows.filter((r) => r.example).map((row) => (
            <div key={row.type} className="rounded-sm border border-hairline bg-canvas-card p-md">
              <code className="block font-mono text-caption-mono-sm text-accent-sunset">
                {row.type}
              </code>
              <pre className="mt-sm overflow-x-auto font-mono text-body-sm text-ink leading-relaxed">
                {row.example}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
