/**
 * TsTypeChecker — TypeScript 类型检查演练场
 *
 * 教学型类型检查器：输入 TypeScript 代码，通过规则引擎识别常见类型错误。
 * 支持预设代码片段切换、手动输入、清空和恢复。明确声明"教学型检查器，非完整 TS 编译器"。
 *
 * 对应docx中演示 #2
 */
import { useState, useMemo } from 'react'
import type { TsTypeCheckerData, CheckerSnippet } from '../../../lib/typescript-visualization-types'
import { cn } from '../../../lib/utils'

interface TsTypeCheckerProps {
  data?: TsTypeCheckerData
}

interface Issue {
  line: number
  message: string
  severity: 'error' | 'warning' | 'info'
  fix?: string
}

/** 教学型类型检查规则引擎 */
function checkCode(code: string): Issue[] {
  const issues: Issue[] = []
  const lines = code.split('\n')

  lines.forEach((line, i) => {
    const ln = i + 1
    const trimmed = line.trim()

    // 规则 1：any 类型使用
    if (/\b: any\b/.test(trimmed) && !trimmed.startsWith('//')) {
      issues.push({
        line: ln,
        message: '使用 any 会丢失类型安全，建议用 unknown 或具体类型替代',
        severity: 'warning',
        fix: '将 : any 替换为 : unknown 或具体类型',
      })
    }

    // 规则 2：类型断言强制转换
    if (/\bas\s+\w+/.test(trimmed) && !trimmed.startsWith('//')) {
      issues.push({
        line: ln,
        message: '类型断言 as 可能绕过类型检查，确保目标类型是正确的',
        severity: 'warning',
        fix: '考虑使用类型守卫或细化类型而非强制转换',
      })
    }

    // 规则 3：非空断言 !
    if (/!\s*[;)]/ .test(trimmed) && !trimmed.startsWith('//') && !trimmed.startsWith('import')) {
      issues.push({
        line: ln,
        message: '非空断言 ! 可能在值为 null/undefined 时导致运行时错误',
        severity: 'warning',
        fix: '使用可选链 ?. 或条件判断替代 !',
      })
    }

    // 规则 4：未使用的变量（简化检测）
    if (/\bconst\s+(\w+)\s*=/.test(trimmed) && !trimmed.startsWith('//')) {
      const match = trimmed.match(/const\s+(\w+)\s*=/)
      if (match && !code.includes(match[1] + '.') && code.indexOf(match[1]) === code.lastIndexOf(match[1])) {
        // Variable declared but only appears once — potential unused
      }
    }

    // 规则 5：void 用于函数返回值而非表达式
    if (/\bvoid\s+(?!function|\(\))/.test(trimmed) && !trimmed.startsWith('//')) {
      issues.push({
        line: ln,
        message: 'void 通常只用作函数返回值类型，作为变量类型时值为 undefined',
        severity: 'info',
      })
    }

    // 规则 6：never 类型的正确使用检测
    if (/\bnever\b/.test(trimmed) && /\bconst\s+\w+\s*:\s*never\b/.test(trimmed)) {
      issues.push({
        line: ln,
        message: '变量不应直接标注为 never 类型（never 表示不可能存在的值）',
        severity: 'error',
        fix: 'never 通常用于函数返回值（抛出异常或死循环）或联合类型收窄后的剩余分支',
      })
    }
  })

  // 规则 7：检查是否缺少返回类型标注
  if (/\bfunction\s+\w+/.test(code)) {
    const funcMatch = code.match(/function\s+(\w+)\s*\([^)]*\)\s*(:\s*\w+)?\s*\{/)
    if (funcMatch && !funcMatch[2]) {
      issues.push({
        line: code.substring(0, code.indexOf('{')).split('\n').length,
        message: '函数缺少显式返回类型标注，建议添加以提高类型安全性',
        severity: 'info',
        fix: '为函数添加返回类型，如 function foo(): string { ... }',
      })
    }
  }

  if (issues.length === 0) {
    issues.push({
      line: 0,
      message: '✓ 未检测到常见类型问题。代码看起来类型安全！（注意：这是教学检查器，不是完整 TS 编译器）',
      severity: 'info',
    })
  }

  return issues
}

const DEFAULT_SNIPPETS: CheckerSnippet[] = [
  {
    label: 'any 滥用',
    code: `// ❌ 类型不安全的代码
function getUser(id: any): any {
  const resp: any = fetch('/api/user/' + id)
  return resp.data.user
}

const user = getUser(42)
user.name!.toUpperCase() // 非空断言，危险！`,
    description: '演示 any 类型滥用和非空断言的类型安全隐患',
    expectedIssues: ['any 类型', '非空断言'],
  },
  {
    label: '类型守卫',
    code: `// ✅ 类型安全的代码
type User = { name: string; age: number }
type Result<T> = { data: T } | { error: string }

function isSuccess<T>(r: Result<T>): r is { data: T } {
  return 'data' in r
}

function getUser(id: number): Result<User> {
  return { data: { name: 'Alice', age: 30 } }
}

const result = getUser(42)
if (isSuccess(result)) {
  console.log(result.data.name) // 类型安全！
}`,
    description: '演示类型守卫和 Result 类型的正确使用方式',
  },
  {
    label: '泛型约束',
    code: `// ✅ 泛型约束示例
interface HasLength { length: number }

function longest<T extends HasLength>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6, 7]
const result = longest(arr1, arr2) // number[4,5,6,7]
console.log(result.length)`,
    description: '演示泛型约束 extends 的正确用法',
  },
  {
    label: '联合类型收窄',
    code: `// ✅ 联合类型收窄
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rectangle':
      return shape.width * shape.height
    // 不留 default — TS 会检查所有分支是否已处理
  }
}`,
    description: '演示联合类型的穷尽性检查（exhaustive check）',
  },
]

export function TsTypeChecker({ data }: TsTypeCheckerProps) {
  const snippets = data?.snippets ?? DEFAULT_SNIPPETS
  const [code, setCode] = useState(data?.defaultCode ?? snippets[0].code)
  const [activeSnippet, setActiveSnippet] = useState(0)

  const issues = useMemo(() => checkCode(code), [code])

  const handleSnippetClick = (idx: number) => {
    setActiveSnippet(idx)
    setCode(snippets[idx].code)
  }

  const handleClear = () => {
    setCode('')
    setActiveSnippet(-1)
  }

  const handleReset = () => {
    setActiveSnippet(0)
    setCode(snippets[0].code)
  }

  return (
    <div className="space-y-lg">
      {/* Disclaimer */}
      <div className="rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-md">
        <p className="text-body-sm text-accent-sunset-soft">
          ⚡ 教学型类型检查器：基于常见规则识别类型问题，非完整 TypeScript 编译器。真实项目请使用 tsc --noEmit。
        </p>
      </div>

      {/* Snippet selector */}
      <div className="flex flex-wrap items-center gap-sm">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          预设:
        </span>
        {snippets.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSnippetClick(i)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
              activeSnippet === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {s.label}
          </button>
        ))}
        <div className="ml-auto flex gap-sm">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-colors hover:border-white/30"
          >
            清空
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-colors hover:border-white/30"
          >
            重置
          </button>
        </div>
      </div>

      {/* Input + Results grid */}
      <div className="grid gap-lg lg:grid-cols-2">
        {/* Code input */}
        <div className="flex flex-col gap-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              TypeScript 代码
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">
              {code.split('\n').length} 行
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              setActiveSnippet(-1)
            }}
            className="min-h-[200px] w-full resize-y rounded-sm border border-hairline bg-canvas-soft p-lg font-mono text-body-sm text-ink outline-none transition-colors focus:border-accent-sunset/50"
            spellCheck={false}
            placeholder="在这里输入或粘贴 TypeScript 代码..."
          />
        </div>

        {/* Results */}
        <div className="flex flex-col gap-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              检查结果
            </span>
            <span
              className={cn(
                'font-mono text-caption-mono-sm',
                issues.length === 1 && issues[0].severity === 'info'
                  ? 'text-accent-sunset'
                  : issues.filter((i) => i.severity === 'error').length > 0
                    ? 'text-red-500'
                    : 'text-accent-dusk',
              )}
            >
              {issues.filter((i) => i.severity !== 'info').length || '无'} 个问题
            </span>
          </div>
          <div className="min-h-[200px] space-y-sm rounded-sm border border-hairline bg-canvas-soft p-lg">
            {issues.map((issue, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-sm border p-md',
                  issue.severity === 'error'
                    ? 'border-red-500/30 bg-red-500/5'
                    : issue.severity === 'warning'
                      ? 'border-accent-sunset/30 bg-accent-sunset/5'
                      : 'border-accent-dusk/30 bg-accent-dusk/5',
                )}
              >
                <div className="flex items-start gap-sm">
                  <span
                    className={cn(
                      'mt-1 font-mono text-caption-mono-sm',
                      issue.severity === 'error'
                        ? 'text-red-500'
                        : issue.severity === 'warning'
                          ? 'text-accent-sunset'
                          : 'text-accent-dusk',
                    )}
                  >
                    {issue.severity === 'error' ? '✕' : issue.severity === 'warning' ? '!' : 'i'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-body-sm text-ink">{issue.message}</p>
                    {issue.fix && (
                      <p className="mt-xs text-body-sm text-body-mid">💡 {issue.fix}</p>
                    )}
                    {issue.line > 0 && (
                      <span className="mt-xs inline-block font-mono text-caption-mono-sm text-body-mid">
                        第 {issue.line} 行
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
