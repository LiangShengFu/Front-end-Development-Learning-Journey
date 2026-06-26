/**
 * GenericConstraintFlow — 泛型约束流程图
 *
 * 可视化 TypeScript 泛型约束（T extends Constraint）的推断流程。
 * 展示从输入参数到类型推断决定的完整链路。
 *
 * 对应docx中演示 #5
 */
import { useState } from 'react'
import type { GenericConstraintFlowData } from '../../../lib/typescript-visualization-types'
import { cn } from '../../../lib/utils'

interface GenericConstraintFlowProps {
  data?: GenericConstraintFlowData
}

const DEFAULT_STEPS = [
  {
    step: 1,
    title: '泛型参数声明',
    code: '<T extends HasLength>',
    description: '声明泛型参数 T，并通过 extends 约束 T 必须满足 HasLength 接口（具备 length: number 属性）。',
    highlight: 'input' as const,
  },
  {
    step: 2,
    title: '函数参数绑定',
    code: 'function longest<T>(a: T, b: T): T',
    description: '函数的两个参数 a 和 b 均声明为类型 T。调用时 TypeScript 根据传入的实参推断 T 的具体类型。',
    highlight: 'input' as const,
  },
  {
    step: 3,
    title: '约束检查',
    code: 'T extends { length: number } → ✓',
    description: '传入的实参类型被检查是否满足约束。若实参是 number[]，则满足（数组有 length）。若实参是 number，则不满足 → 编译错误。',
    highlight: 'check' as const,
  },
  {
    step: 4,
    title: '类型推断',
    code: 'longest([1,2,3], [4,5,6,7]) → T = number[]',
    description: 'TypeScript 从两个参数中推断出共同类型 number[]，并赋给 T。',
    highlight: 'resolve' as const,
  },
  {
    step: 5,
    title: '返回类型确定',
    code: '返回值: number[]（即 T）',
    description: '函数返回类型跟随推断出的 T，因此 longest 返回 number[]。调用方可安全使用返回值的数组方法。',
    highlight: 'resolve' as const,
  },
]

export function GenericConstraintFlow({ data }: GenericConstraintFlowProps) {
  const steps = data?.steps ?? DEFAULT_STEPS
  const [currentStep, setCurrentStep] = useState(0)

  const step = steps[currentStep]

  const highlightColor = {
    input: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
    check: 'border-accent-sunset/40 bg-accent-sunset/10 text-accent-sunset',
    resolve: 'border-accent-dusk/40 bg-accent-dusk/10 text-accent-dusk',
    error: 'border-red-500/40 bg-red-500/10 text-red-500',
  }

  return (
    <div className="space-y-lg">
      {/* Flow navigation */}
      <div className="flex items-center gap-sm overflow-x-auto">
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentStep(i)}
            className={cn(
              'flex flex-shrink-0 items-center gap-sm rounded-pill border px-lg py-sm transition-colors',
              currentStep === i
                ? 'border-accent-sunset bg-accent-sunset/10 text-accent-sunset'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            <span
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full font-mono text-caption-mono-sm',
                currentStep === i
                  ? 'bg-accent-sunset text-on-primary'
                  : 'bg-canvas-mid text-body-mid',
              )}
            >
              {s.step}
            </span>
            <span className="font-mono text-caption-mono-sm">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Current step detail */}
      <div className={cn('rounded-sm border p-xl', highlightColor[step.highlight ?? 'input'])}>
        <div className="flex items-baseline justify-between">
          <h4 className="text-body-lg font-semibold text-ink">
            步骤 {step.step}：{step.title}
          </h4>
          <span className="font-mono text-caption-mono-sm text-body-mid">
            {currentStep + 1} / {steps.length}
          </span>
        </div>

        <p className="mt-lg text-body-md text-body">{step.description}</p>

        {/* Code block */}
        <div className="mt-lg overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-lg">
          <code className="font-mono text-body-sm text-accent-sunset">{step.code}</code>
        </div>

        {/* Constraint visualization */}
        <div className="mt-lg rounded-sm border border-hairline bg-canvas-soft p-lg">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            约束关系图
          </div>
          <div className="flex items-center justify-center gap-xl py-lg">
            {/* Input */}
            <div className="rounded-sm border border-hairline bg-canvas-card px-xl py-lg text-center">
              <div className="font-mono text-caption-mono-sm text-body-mid">实参类型</div>
              <div className="mt-xs font-mono text-body-sm text-ink">number[]</div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <span className="font-mono text-caption-mono-sm text-accent-sunset">
                extends
              </span>
              <svg className="mt-xs h-6 w-16" viewBox="0 0 64 24">
                <line x1="0" y1="12" x2="58" y2="12" stroke="#ff7a17" strokeWidth="1.5" />
                <polygon points="58,8 64,12 58,16" fill="#ff7a17" />
              </svg>
            </div>

            {/* Constraint */}
            <div
              className={cn(
                'rounded-sm border px-xl py-lg text-center',
                currentStep === 2
                  ? 'border-accent-sunset/50 bg-accent-sunset/10'
                  : 'border-hairline bg-canvas-card',
              )}
            >
              <div className="font-mono text-caption-mono-sm text-body-mid">约束条件</div>
              <div className="mt-xs font-mono text-body-sm text-ink">
                {'{'} length: number {'}'}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <span className="font-mono text-caption-mono-sm text-accent-dusk">infer</span>
              <svg className="mt-xs h-6 w-16" viewBox="0 0 64 24">
                <line x1="0" y1="12" x2="58" y2="12" stroke="#7c3aed" strokeWidth="1.5" />
                <polygon points="58,8 64,12 58,16" fill="#7c3aed" />
              </svg>
            </div>

            {/* Result */}
            <div
              className={cn(
                'rounded-sm border px-xl py-lg text-center',
                currentStep >= 3
                  ? 'border-accent-dusk/50 bg-accent-dusk/10'
                  : 'border-hairline bg-canvas-card',
              )}
            >
              <div className="font-mono text-caption-mono-sm text-body-mid">推断结果 T</div>
              <div className="mt-xs font-mono text-body-sm text-ink">number[]</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((s) => s - 1)}
          className={cn(
            'btn-pill-sm',
            currentStep === 0 && 'pointer-events-none opacity-30',
          )}
        >
          ← 上一步
        </button>
        <button
          type="button"
          disabled={currentStep === steps.length - 1}
          onClick={() => setCurrentStep((s) => s + 1)}
          className={cn(
            'btn-pill-sm',
            currentStep === steps.length - 1 && 'pointer-events-none opacity-30',
          )}
        >
          下一步 →
        </button>
      </div>
    </div>
  )
}
