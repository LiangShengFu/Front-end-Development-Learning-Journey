/**
 * TypeTransformBoard — Utility Types 类型转换器
 *
 * 展示 TypeScript 内置 Utility Types 如何转换类型模型。
 * 选择一个 Utility Type，观察其如何重塑属性的必填性、只读性和类型。
 *
 * 对应docx中演示 #8
 */
import { useState } from 'react'
import type { TypeTransformBoardData, TransformableProperty } from '../../../lib/typescript-visualization-types'
import { cn } from '../../../lib/utils'

interface TypeTransformBoardProps {
  data?: TypeTransformBoardData
}

const DEFAULT_SOURCE = {
  name: 'User',
  properties: [
    { name: 'id', type: 'number', required: true, description: '用户唯一标识' },
    { name: 'name', type: 'string', required: true, description: '用户名' },
    { name: 'email', type: 'string', required: true, description: '邮箱地址' },
    { name: 'age', type: 'number | undefined', required: false, description: '年龄（可选）' },
    { name: 'role', type: "'admin' | 'user'", required: false, description: '角色' },
    { name: 'tags', type: 'string[]', required: false, description: '标签' },
  ],
}

const DEFAULT_TRANSFORMS = [
  {
    name: 'Partial<User>',
    applies: '所有属性变为可选',
    fn: 'Partial',
    description: '将类型的所有属性转换为可选的。常用于更新操作。',
    resultProperties: [
      { name: 'id', type: 'number', required: false },
      { name: 'name', type: 'string', required: false },
      { name: 'email', type: 'string', required: false },
      { name: 'age', type: 'number | undefined', required: false },
      { name: 'role', type: "'admin' | 'user' | undefined", required: false },
      { name: 'tags', type: 'string[] | undefined', required: false },
    ],
  },
  {
    name: 'Required<User>',
    applies: '所有属性变为必填',
    fn: 'Required',
    description: '将类型的所有可选属性转换为必填。',
    resultProperties: [
      { name: 'id', type: 'number', required: true },
      { name: 'name', type: 'string', required: true },
      { name: 'email', type: 'string', required: true },
      { name: 'age', type: 'number', required: true },
      { name: 'role', type: "'admin' | 'user'", required: true },
      { name: 'tags', type: 'string[]', required: true },
    ],
  },
  {
    name: 'Readonly<User>',
    applies: '所有属性变为只读',
    fn: 'Readonly',
    description: '将类型的所有属性转换为只读。防止意外修改。',
    resultProperties: [
      { name: 'id', type: 'number', required: true },
      { name: 'name', type: 'string', required: true },
      { name: 'email', type: 'string', required: true },
      { name: 'age', type: 'number | undefined', required: false },
      { name: 'role', type: "'admin' | 'user' | undefined", required: false },
      { name: 'tags', type: 'string[] | undefined', required: false },
    ],
  },
  {
    name: 'Pick<User, "name" | "email">',
    applies: '选取指定属性',
    fn: 'Pick',
    description: '从类型中选取指定的属性子集。',
    resultProperties: [
      { name: 'name', type: 'string', required: true },
      { name: 'email', type: 'string', required: true },
    ],
  },
  {
    name: 'Omit<User, "id" | "tags">',
    applies: '排除指定属性',
    fn: 'Omit',
    description: '从类型中排除指定的属性。flexible 地去字段。',
    resultProperties: [
      { name: 'name', type: 'string', required: true },
      { name: 'email', type: 'string', required: true },
      { name: 'age', type: 'number | undefined', required: false },
      { name: 'role', type: "'admin' | 'user' | undefined", required: false },
    ],
  },
]

export function TypeTransformBoard({ data }: TypeTransformBoardProps) {
  const sourceModel = data?.sourceModel ?? DEFAULT_SOURCE
  const transforms = data?.transforms ?? DEFAULT_TRANSFORMS
  const [activeIdx, setActiveIdx] = useState(0)

  const activeTransform = transforms[activeIdx]

  const renderProperty = (prop: TransformableProperty, isChanged: boolean) => (
    <div
      key={prop.name}
      className={cn(
        'flex items-center justify-between rounded-sm p-sm',
        isChanged ? 'bg-accent-sunset/10' : undefined,
      )}
    >
      <div className="flex items-center gap-sm">
        <span className="font-mono text-body-sm text-ink">{prop.name}</span>
        {prop.required && (
          <span className="rounded-pill bg-red-500/20 px-xxs font-mono text-caption-mono-sm text-red-500">
            *
          </span>
        )}
      </div>
      <span
        className={cn(
          'font-mono text-caption-mono-sm',
          isChanged ? 'text-accent-sunset' : 'text-body-mid',
        )}
      >
        {prop.type}
      </span>
    </div>
  )

  return (
    <div className="space-y-lg">
      {/* Transform selector */}
      <div className="flex flex-wrap gap-sm">
        {transforms.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={cn(
              'rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
              activeIdx === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {t.fn}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="rounded-sm border border-accent-dusk/30 bg-accent-dusk/5 p-lg">
        <div className="flex items-baseline gap-sm">
          <span className="font-mono text-caption-mono-sm text-accent-dusk">
            {activeTransform.fn}
          </span>
          <span className="text-body-sm text-body">{activeTransform.description}</span>
        </div>
      </div>

      {/* Three-column comparison */}
      <div className="grid gap-lg lg:grid-cols-3">
        {/* Source */}
        <div className="rounded-sm border border-hairline bg-canvas-soft">
          <div className="border-b border-hairline px-lg py-md">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              原始类型
            </span>
            <div className="mt-xs font-mono text-body-sm text-accent-sunset">
              {sourceModel.name}
            </div>
          </div>
          <div className="space-y-xxs p-lg">
            {sourceModel.properties.map((p) => renderProperty(p, false))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="font-mono text-display-xs text-accent-sunset">→</div>
            <div className="mt-sm font-mono text-caption-mono-sm text-body-mid">
              {activeTransform.applies}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-sm border border-accent-sunset/40 bg-canvas-soft">
          <div className="border-b border-accent-sunset/30 px-lg py-md">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              转换结果
            </span>
            <div className="mt-xs font-mono text-body-sm text-accent-sunset">
              {activeTransform.name}
            </div>
          </div>
          <div className="space-y-xxs p-lg">
            {activeTransform.resultProperties.map((p) => {
              const original = sourceModel.properties.find((op) => op.name === p.name)
              const isChanged =
                !original ||
                original.required !== p.required ||
                original.type !== p.type
              return renderProperty(p, isChanged)
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
