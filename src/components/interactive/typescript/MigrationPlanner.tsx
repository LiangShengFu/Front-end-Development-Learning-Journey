/**
 * MigrationPlanner — JS → TS 渐进迁移规划器
 *
 * 可视化 JavaScript 项目迁移到 TypeScript 的阶段、风险和收益。
 * 展示增量的、风险可控的迁移策略。
 *
 * 对应docx中演示 #14
 */
import { useState } from 'react'
import type { MigrationPlannerData, MigrationStage } from '../../../lib/typescript-visualization-types'
import { cn } from '../../../lib/utils'

interface MigrationPlannerProps {
  data?: MigrationPlannerData
}

const DEFAULT_STAGES: MigrationStage[] = [
  {
    stage: 1,
    name: '添加 TypeScript 编译器',
    description: '在项目中安装 TypeScript，创建基础 tsconfig.json',
    actions: ['npm install -D typescript', '创建 tsconfig.json（allowJs: true）', '添加 tsc --noEmit 到 CI'],
    benefit: '零代码改动，立即获得类型检查能力',
    risk: 'low',
    estimatedTime: '1 小时',
  },
  {
    stage: 2,
    name: 'JS 文件逐步改为 TS',
    description: '将 .js 文件逐个改为 .ts，修复隐式 any 错误',
    actions: ['重命名 .js → .ts（从工具函数开始）', '添加基础类型标注', '使用 noImplicitAny: false 暂时降低门槛'],
    benefit: '核心模块获得类型安全',
    risk: 'low',
    estimatedTime: '1-2 周',
  },
  {
    stage: 3,
    name: '添加类型声明文件',
    description: '为无类型的第三方库创建 .d.ts 声明，定义全局类型',
    actions: ['创建 src/types/ 目录', '为第三方库写 .d.ts', '安装 @types/* 包', '定义业务领域类型'],
    benefit: '完整的 IDE 智能提示和自动补全',
    risk: 'medium',
    estimatedTime: '1 周',
  },
  {
    stage: 4,
    name: '开启严格模式',
    description: '逐步开启 strict 及子选项，修复所有类型错误',
    actions: ['开启 strictNullChecks', '开启 noImplicitAny', '开启 strictFunctionTypes', '修复所有 TS 错误'],
    benefit: '最高级别的类型安全保障',
    risk: 'medium',
    estimatedTime: '2-4 周',
  },
  {
    stage: 5,
    name: '类型优化与重构',
    description: '利用完整类型信息进行架构优化，消除冗余代码',
    actions: ['使用泛型减少重复代码', '引入 discriminated union 替代 if-else', '使用 satisfies 确保类型兼容'],
    benefit: '代码质量与可维护性显著提升',
    risk: 'low',
    estimatedTime: '持续',
  },
]

export function MigrationPlanner({ data }: MigrationPlannerProps) {
  const stages = data?.stages ?? DEFAULT_STAGES
  const [activeStage, setActiveStage] = useState(0)

  const riskBadge = {
    low: 'bg-accent-sunset/20 text-accent-sunset',
    medium: 'bg-accent-dusk/20 text-accent-dusk',
    high: 'bg-red-500/20 text-red-500',
  }

  const riskLabel = {
    low: '低风险',
    medium: '中风险',
    high: '高风险',
  }

  return (
    <div className="space-y-lg">
      {/* Stage timeline */}
      <div className="flex items-center gap-0 overflow-x-auto">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center">
            <button
              type="button"
              onClick={() => setActiveStage(i)}
              className={cn(
                'flex flex-shrink-0 flex-col items-center gap-sm rounded-sm border px-lg py-md text-center transition-colors',
                activeStage === i
                  ? 'border-accent-sunset/50 bg-accent-sunset/10'
                  : i < activeStage
                    ? 'border-accent-sunset/20 bg-accent-sunset/5'
                    : 'border-hairline bg-canvas-soft hover:border-white/30',
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full font-mono text-caption-mono-sm',
                  activeStage === i
                    ? 'bg-accent-sunset text-on-primary'
                    : i < activeStage
                      ? 'bg-accent-sunset/30 text-accent-sunset'
                      : 'bg-canvas-mid text-body-mid',
                )}
              >
                {activeStage > i ? '✓' : stage.stage}
              </span>
              <span className="font-mono text-caption-mono-sm text-body-mid">
                {stage.name}
              </span>
            </button>
            {i < stages.length - 1 && (
              <div className={cn(
                'mx-xs h-[1px] w-6 flex-shrink-0',
                i < activeStage ? 'bg-accent-sunset' : 'bg-hairline',
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Stage detail */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-md">
              <span className="font-mono text-display-xs text-accent-sunset">
                阶段 {stages[activeStage].stage}
              </span>
              <h4 className="text-body-lg text-ink">{stages[activeStage].name}</h4>
            </div>
            <p className="mt-md text-body-md text-body">
              {stages[activeStage].description}
            </p>
          </div>
          <div className="flex flex-col items-end gap-sm">
            <span
              className={cn(
                'rounded-pill px-md py-xxs font-mono text-caption-mono-sm',
                riskBadge[stages[activeStage].risk],
              )}
            >
              {riskLabel[stages[activeStage].risk]}
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">
              ⏱ {stages[activeStage].estimatedTime}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-xl">
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            操作步骤
          </div>
          <div className="space-y-sm">
            {stages[activeStage].actions.map((action, i) => (
              <div
                key={i}
                className="flex items-center gap-md rounded-sm border border-hairline bg-canvas-card p-md"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-canvas-mid font-mono text-caption-mono-sm text-body-mid">
                  {i + 1}
                </span>
                <code className="font-mono text-body-sm text-accent-sunset">{action}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Benefit */}
        <div className="mt-lg rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 p-lg">
          <span className="font-mono text-caption-mono-sm text-accent-sunset">收益</span>
          <p className="mt-xs text-body-sm text-body">{stages[activeStage].benefit}</p>
        </div>

        {/* Progress bar */}
        <div className="mt-lg">
          <div className="mb-sm flex justify-between text-caption-mono-sm text-body-mid">
            <span>迁移进度</span>
            <span>{Math.round(((activeStage + 1) / stages.length) * 100)}%</span>
          </div>
          <div className="h-[2px] w-full rounded-pill bg-canvas-mid">
            <div
              className="h-full rounded-pill bg-accent-sunset transition-all duration-300"
              style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
