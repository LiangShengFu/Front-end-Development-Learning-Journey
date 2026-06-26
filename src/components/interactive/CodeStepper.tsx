/**
 * CodeStepper - 代码分步执行演示
 *
 * 将代码按步骤分步展示，高亮当前步骤对应的代码行，并显示说明和输出。
 * 遵循设计规范：canvas-mid 代码背景，accent-sunset 高亮行。
 */
import { useState } from 'react'
import type { CodeStepperData } from '../../lib/types'
import { cn } from '../../lib/utils'

interface CodeStepperProps {
  data: CodeStepperData
}

export function CodeStepper({ data }: CodeStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = data.steps[currentStep]
  const highlightLines = step?.highlightLines ?? []

  return (
    <div className="space-y-lg">
      {/* Code display */}
      <div className="overflow-hidden rounded-sm border border-hairline bg-canvas-mid">
        <div className="border-b border-hairline px-lg py-sm">
          <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            {data.language ?? 'code'} · 步骤 {currentStep + 1}/{data.steps.length}
          </span>
        </div>
        <pre className="p-lg">
          <code className="font-mono text-[13px] leading-[20px]">
            {data.lines.map((line, i) => {
              const lineNum = i + 1
              const isHighlighted = highlightLines.includes(lineNum)
              return (
                <div
                  key={i}
                  className={cn(
                    'flex transition-colors duration-200',
                    isHighlighted ? '-mx-lg bg-accent-sunset/15 px-lg' : 'bg-transparent',
                  )}
                >
                  <span
                    className={cn(
                      'mr-lg inline-block w-8 select-none text-right',
                      isHighlighted ? 'text-accent-sunset' : 'text-body-mid/50',
                    )}
                  >
                    {lineNum}
                  </span>
                  <span className={cn(isHighlighted ? 'text-ink' : 'text-body')}>{line || ' '}</span>
                </div>
              )
            })}
          </code>
        </pre>
      </div>

      {/* Step controls */}
      <div className="flex items-center justify-between gap-lg">
        <button
          type="button"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="btn-pill-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← 上一步
        </button>

        {/* Step indicators */}
        <div className="flex items-center gap-xs">
          {data.steps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentStep(i)}
              className={cn(
                'h-[6px] rounded-pill transition-all',
                i === currentStep ? 'w-6 bg-accent-sunset' : 'w-[6px] bg-canvas-mid hover:bg-body-mid',
              )}
              aria-label={`跳转到步骤 ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep((s) => Math.min(data.steps.length - 1, s + 1))}
          disabled={currentStep === data.steps.length - 1}
          className="btn-pill-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          下一步 →
        </button>
      </div>

      {/* Step description */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          步骤 {currentStep + 1}
        </div>
        <h4 className="text-body-lg text-ink">{step?.title}</h4>
        <p className="mt-sm text-body-md text-body">{step?.description}</p>
        {step?.output && (
          <div className="mt-lg border-t border-hairline pt-lg">
            <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              输出
            </div>
            <pre className="font-mono text-[13px] text-accent-breeze">{step.output}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
