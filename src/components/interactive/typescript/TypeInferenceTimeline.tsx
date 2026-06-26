/**
 * TypeInferenceTimeline — 泛型类型推断时间线
 *
 * 可视化 TypeScript 类型推断的分步过程，展示编译器如何
 * 从调用处信息逐步缩小类型范围，最终确定实际类型。
 *
 * 对应docx中演示 #6
 */
import { useState } from 'react'
import type { TypeInferenceTimelineData, InferenceStep } from '../../../lib/typescript-visualization-types'
import { cn } from '../../../lib/utils'

interface TypeInferenceTimelineProps {
  data?: TypeInferenceTimelineData
}

const DEFAULT_STEPS: InferenceStep[] = [
  {
    step: 1,
    title: '调用处传入值',
    status: 'start',
    code: `const result = identity("hello")`,
    description: '函数 identity 被调用，传入实参 "hello"。TypeScript 引擎开始类型推断。',
  },
  {
    step: 2,
    title: '泛型占位符',
    status: 'constrain',
    code: `function identity<T>(arg: T): T {
  return arg
}`,
    description: '函数签名声明了泛型 T。此时 T 是一个占位符，等待从调用处推断。',
  },
  {
    step: 3,
    title: '类型收窄',
    status: 'constrain',
    code: `T extends "hello" → string
arg: T → "hello"
返回: T → "hello"`,
    description: '从实参 "hello" 推断 T 为字面量类型 "hello"。因为 "hello" extends string，所以 T 也满足 string。',
  },
  {
    step: 4,
    title: '推断结果',
    status: 'resolve',
    code: `// T = "hello"
const result = identity("hello")
// result: "hello"`,
    description: '推断完成！T 被确定为字面量类型 "hello"，result 获得精确类型。',
  },
  {
    step: 5,
    title: '类型安全验证',
    status: 'done',
    code: `result.toUpperCase()  // ✅ "HELLO"
result.length       // ✅ 5
result.push(1)      // ❌ "hello" 不是数组`,
    description: '由于类型信息完整，TypeScript 可以验证所有后续操作的正确性。',
  },
]

export function TypeInferenceTimeline({ data }: TypeInferenceTimelineProps) {
  const steps = data?.steps ?? DEFAULT_STEPS
  const [expandedStep, setExpandedStep] = useState<number | null>(0)

  const statusConfig = {
    start: { color: 'bg-blue-500/20 border-blue-500/40', dot: 'bg-blue-500', label: '开始' },
    constrain: { color: 'bg-accent-sunset/10 border-accent-sunset/30', dot: 'bg-accent-sunset', label: '收窄' },
    resolve: { color: 'bg-accent-dusk/10 border-accent-dusk/30', dot: 'bg-accent-dusk', label: '确定' },
    done: { color: 'bg-green-500/10 border-green-500/30', dot: 'bg-green-500', label: '完成' },
    error: { color: 'bg-red-500/10 border-red-500/30', dot: 'bg-red-500', label: '错误' },
  }

  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const config = statusConfig[step.status]
        const isExpanded = expandedStep === i
        const isLast = i === steps.length - 1

        return (
          <div key={i} className="flex gap-lg">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className={cn('h-3 w-3 rounded-full', config.dot)} />
              {!isLast && <div className="w-[1px] flex-1 bg-hairline" />}
            </div>

            {/* Step content */}
            <div className={cn('flex-1 pb-xl', isExpanded ? undefined : 'pb-xl')}>
              <button
                type="button"
                onClick={() => setExpandedStep(isExpanded ? null : i)}
                className={cn(
                  'w-full rounded-sm border p-lg text-left transition-colors',
                  config.color,
                  isExpanded ? undefined : 'cursor-pointer hover:border-white/20',
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <span className="font-mono text-caption-mono-sm text-body-mid">
                      步骤 {step.step}
                    </span>
                    <span
                      className={cn(
                        'rounded-pill px-sm py-xxs font-mono text-caption-mono-sm',
                        config.color,
                      )}
                    >
                      {config.label}
                    </span>
                    <span className="text-body-sm text-ink">{step.title}</span>
                  </div>
                  <span
                    className={cn(
                      'font-mono text-caption-mono-sm text-body-mid transition-transform',
                      isExpanded && 'rotate-90',
                    )}
                  >
                    ▶
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="ml-0 mt-sm rounded-sm border border-hairline bg-canvas-soft p-lg">
                  <p className="text-body-sm text-body">{step.description}</p>
                  <div className="mt-md overflow-x-auto rounded-sm border border-hairline bg-canvas-card p-md">
                    <code className="font-mono text-body-sm text-accent-sunset leading-relaxed">
                      {step.code}
                    </code>
                  </div>

                  {/* Type inference visualization */}
                  {step.status === 'resolve' && (
                    <div className="mt-md rounded-sm border border-accent-dusk/30 bg-accent-dusk/5 p-md">
                      <span className="font-mono text-caption-mono-sm text-accent-dusk">
                        ✓ 类型已确定
                      </span>
                      <p className="mt-xs text-body-sm text-body-mid">
                        此时 TypeScript 已获得完整的类型信息，后续代码可获得精确的类型检查和智能提示。
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* Summary */}
      <div className="flex gap-lg">
        <div className="flex flex-col items-center">
          <div className="h-3 w-3 rounded-full bg-accent-sunset" />
        </div>
        <div className="flex-1 rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-lg">
          <span className="font-mono text-caption-mono-sm text-accent-sunset">推断总结</span>
          <p className="mt-sm text-body-sm text-body">
            TypeScript 的类型推断从调用处开始，通过泛型占位符、约束检查、类型收窄，
            最终确定精确类型。整个过程在编译时完成，不产生运行时开销。
          </p>
        </div>
      </div>
    </div>
  )
}
