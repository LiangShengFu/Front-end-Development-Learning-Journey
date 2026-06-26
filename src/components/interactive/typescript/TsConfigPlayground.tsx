/**
 * TsConfigPlayground — tsconfig 严格模式配置交互面板
 *
 * 可视化展示 TypeScript strict 相关编译选项及其对代码检查的影响。
 * 开启/关闭各项 strict 子选项，实时预览对应的代码示例和错误信息。
 *
 * 对应docx中演示 #12
 */
import { useState } from 'react'
import type { TsConfigPlaygroundData, StrictFlag } from '../../../lib/typescript-visualization-types'
import { cn } from '../../../lib/utils'

interface TsConfigPlaygroundProps {
  data?: TsConfigPlaygroundData
}

const DEFAULT_FLAGS: StrictFlag[] = [
  {
    key: 'strict',
    label: 'strict',
    description: '启用所有严格类型检查选项（主开关）。开启后相当于同时开启所有子选项。',
    impact: 'type-check',
    isStrict: true,
    examples: {
      on: {
        code: `// strict: true — 全部严格检查
function add(a, b) {    // ❌ 参数缺少类型
  return a + b
}`,
        message: '报错：Parameter "a" implicitly has an "any" type',
      },
      off: {
        code: `// strict: false — 宽松模式
function add(a, b) {    // ⚠️ 不报错，a/b 为 any
  return a + b
}`,
        message: '不报错，但失去了类型安全',
      },
    },
  },
  {
    key: 'noImplicitAny',
    label: 'noImplicitAny',
    description: '禁止隐式 any 类型。当 TypeScript 无法推断类型时，强制要求显式标注。',
    impact: 'type-check',
    isStrict: true,
    examples: {
      on: {
        code: `function greet(name) {  // ❌ Parameter 'name' implicitly has 'any'
  return "Hello " + name
}`,
        message: '必须显式标注参数类型：function greet(name: string)',
      },
      off: {
        code: `function greet(name) {  // ⚠️ name 隐式为 any
  return "Hello " + name
}`,
        message: '不报错，但 name 类型为 any，失去了所有类型安全',
      },
    },
  },
  {
    key: 'strictNullChecks',
    label: 'strictNullChecks',
    description: '严格空值检查。null 和 undefined 不能赋值给其他类型。',
    impact: 'type-check',
    isStrict: true,
    examples: {
      on: {
        code: `let name: string = null  // ❌ null 不能赋值给 string
let age: number | null = null  // ✅ 必须显式包含 null`,
        message: 'null 和 undefined 拥有独立的类型，不能赋值给其他类型',
      },
      off: {
        code: `let name: string = null  // ⚠️ 不报错，null 是 string 的子类型
// 可能产生运行时错误
name.toUpperCase()  // TypeError!`,
        message: 'null 是所有类型的子类型，容易引入运行时错误',
      },
    },
  },
  {
    key: 'strictFunctionTypes',
    label: 'strictFunctionTypes',
    description: '严格函数类型检查。函数参数类型按逆变（contravariant）检查。',
    impact: 'type-check',
    isStrict: true,
    examples: {
      on: {
        code: `type Handler = (x: string) => void
const h: Handler = (x: string | number) => {}  // ✅
const h2: Handler = (x: "a") => {}  // ❌ 参数类型不兼容`,
        message: '函数参数类型必须与声明完全兼容（逆变检查）',
      },
      off: {
        code: `type Handler = (x: string) => void
const h: Handler = (x: "a") => {}  // ⚠️ 不报错
h("hello")  // 运行时问题！`,
        message: '参数类型检查放宽，可能引入运行时问题',
      },
    },
  },
  {
    key: 'noUnusedLocals',
    label: 'noUnusedLocals',
    description: '检测未使用的局部变量，减少代码冗余。',
    impact: 'compile',
    isStrict: false,
    examples: {
      on: {
        code: `function calc() {
  const x = 10  // ❌ 'x' is declared but never used
  return 42
}`,
        message: '编译报错，确保代码整洁',
      },
      off: {
        code: `function calc() {
  const x = 10  // 不报错，但 x 浪费了
  return 42
}`,
        message: '编译通过，但存在代码冗余',
      },
    },
  },
]

export function TsConfigPlayground({ data }: TsConfigPlaygroundProps) {
  const flags = data?.flags ?? DEFAULT_FLAGS
  const defaultOn = data?.defaultEnabled ?? flags.filter((f) => f.isStrict).map((f) => f.key)
  const [enabled, setEnabled] = useState<Set<string>>(new Set(defaultOn))
  const [selectedFlag, setSelectedFlag] = useState(0)

  const toggle = (key: string) => {
    setEnabled((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const currentFlag = flags[selectedFlag]

  return (
    <div className="space-y-lg">
      {/* Config matrix */}
      <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
        {flags.map((flag, i) => (
          <button
            key={flag.key}
            type="button"
            onClick={() => setSelectedFlag(i)}
            className={cn(
              'flex items-center justify-between rounded-sm border p-lg text-left transition-colors',
              selectedFlag === i
                ? 'border-accent-sunset/50 bg-accent-sunset/5'
                : 'border-hairline bg-canvas-soft hover:border-white/30',
            )}
          >
            <div>
              <div className="flex items-center gap-sm">
                <span className="font-mono text-caption-mono-sm text-accent-sunset">
                  {flag.key}
                </span>
                {flag.isStrict && (
                  <span className="rounded-pill bg-accent-sunset/20 px-xxs font-mono text-caption-mono-sm text-accent-sunset">
                    strict
                  </span>
                )}
              </div>
              <p className="mt-xs text-body-sm text-body-mid">{flag.description}</p>
            </div>
            {/* Toggle */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                toggle(flag.key)
              }}
              className={cn(
                'flex h-6 w-10 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors',
                enabled.has(flag.key) ? 'bg-accent-sunset' : 'bg-canvas-mid',
              )}
            >
              <div
                className={cn(
                  'h-4 w-4 rounded-full bg-white transition-transform',
                  enabled.has(flag.key) ? 'translate-x-5' : 'translate-x-1',
                )}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Detail view for selected flag */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-xl">
        <div className="flex items-baseline justify-between">
          <h4 className="font-mono text-body-lg text-accent-sunset">{currentFlag.key}</h4>
          <span className={cn(
            'font-mono text-caption-mono-sm',
            enabled.has(currentFlag.key) ? 'text-accent-sunset' : 'text-body-mid',
          )}>
            {enabled.has(currentFlag.key) ? '● 已开启' : '○ 已关闭'}
          </span>
        </div>

        <div className="mt-lg grid gap-lg lg:grid-cols-2">
          {/* ON state */}
          <div className={cn(
            'rounded-sm border p-lg',
            enabled.has(currentFlag.key)
              ? 'border-accent-sunset/40 bg-accent-sunset/5'
              : 'border-hairline opacity-60',
          )}>
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              {currentFlag.key}: true
            </div>
            <pre className="overflow-x-auto font-mono text-body-sm text-ink">
              {currentFlag.examples.on.code}
            </pre>
            <p className="mt-sm text-body-sm text-accent-sunset">
              {currentFlag.examples.on.message}
            </p>
          </div>

          {/* OFF state */}
          <div className={cn(
            'rounded-sm border p-lg',
            !enabled.has(currentFlag.key)
              ? 'border-accent-sunset/40 bg-accent-sunset/5'
              : 'border-hairline opacity-60',
          )}>
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              {currentFlag.key}: false
            </div>
            <pre className="overflow-x-auto font-mono text-body-sm text-ink">
              {currentFlag.examples.off.code}
            </pre>
            <p className="mt-sm text-body-sm text-body-mid">
              {currentFlag.examples.off.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
