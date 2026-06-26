/**
 * DefineEmitsWorkshop — defineProps / defineEmits 工作台
 *
 * 输入 TypeScript Props/Emits 类型定义，实时生成父组件调用代码。
 * ⚠️ 教学模拟：编译宏 defineProps/defineEmits 的类型推导演示。
 */
import { useMemo, useState } from 'react'
import type { DefineEmitsWorkshopData, PropsEmitsTemplate } from '../../../lib/vue-visualization-types'
import { cn } from '../../../lib/utils'

interface DefineEmitsWorkshopProps {
  data?: DefineEmitsWorkshopData
}

const DEFAULT_TEMPLATES: PropsEmitsTemplate[] = [
  {
    id: 'basic',
    label: '基础 Props',
    propsInterface: `interface Props {
  name: string
  age?: number
}`,
    emitsSignature: `const emit = defineEmits<{
  update: [value: string]
}>()`,
  },
  {
    id: 'defaults',
    label: '带默认值',
    propsInterface: `interface Props {
  title: string
  count?: number
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  count: 0,
  disabled: false,
})`,
    emitsSignature: `const emit = defineEmits<{
  change: [count: number]
  reset: []
}>()`,
  },
  {
    id: 'complex',
    label: '复杂 Emits',
    propsInterface: `interface Props {
  modelValue: string
  items: string[]
}`,
    emitsSignature: `const emit = defineEmits<{
  'update:modelValue': [value: string]
  select: [item: string, index: number]
  delete: [id: number]
}>()`,
  },
]

function parsePropsInterface(source: string): Array<{ name: string; optional: boolean; type: string }> {
  const props: Array<{ name: string; optional: boolean; type: string }> = []
  const regex = /(\w+)(\?)?:\s*([^;\n]+)/g
  let match
  while ((match = regex.exec(source)) !== null) {
    if (match[1] === 'interface' || match[1] === 'Props') continue
    props.push({ name: match[1], optional: !!match[2], type: match[3].trim() })
  }
  return props
}

function parseEmits(source: string): string[] {
  const events: string[] = []
  const regex = /['"]?(\w+(?::\w+)?)['"]?\s*:/g
  let match
  while ((match = regex.exec(source)) !== null) {
    if (!['defineEmits', 'const', 'emit'].includes(match[1])) {
      events.push(match[1])
    }
  }
  return events
}

function generateParentCode(
  props: Array<{ name: string; optional: boolean; type: string }>,
  events: string[],
  componentName = 'UserCard',
): string {
  const propAttrs = props
    .map((p) => {
      const sample =
        p.type.includes('string') || p.type.includes('String')
          ? `"Alice"`
          : p.type.includes('number') || p.type.includes('Number')
            ? '25'
            : p.type.includes('boolean')
              ? 'false'
              : p.type.includes('[]')
                ? '["a", "b"]'
                : '{}'
      const prefix = p.type.includes('string') && !p.type.includes('[]') ? '' : ':'
      return `${prefix}${p.name}=${sample}`
    })
    .join('\n  ')

  const eventHandlers = events
    .map((e) => `@${e}="handle${e.charAt(0).toUpperCase() + e.slice(1).replace(/:/g, '')}"`)
    .join('\n  ')

  return `<template>
  <${componentName}
  ${propAttrs}${events.length ? '\n  ' + eventHandlers : ''}
  />
</template>

<script setup lang="ts">
function handleUpdate(value: string) {
  console.log('收到 update 事件:', value)
}
</script>`
}

export function DefineEmitsWorkshop({ data }: DefineEmitsWorkshopProps) {
  const templates = data?.templates ?? DEFAULT_TEMPLATES
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? 'basic')
  const [propsText, setPropsText] = useState(templates[0]?.propsInterface ?? '')
  const [emitsText, setEmitsText] = useState(templates[0]?.emitsSignature ?? '')

  const selectTemplate = (id: string) => {
    const t = templates.find((tpl) => tpl.id === id)
    if (t) {
      setTemplateId(id)
      setPropsText(t.propsInterface)
      setEmitsText(t.emitsSignature)
    }
  }

  const generatedCode = useMemo(() => {
    const props = parsePropsInterface(propsText)
    const events = parseEmits(emitsText)
    return generateParentCode(props, events)
  }, [propsText, emitsText])

  return (
    <div className="isolate space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：defineProps / defineEmits 是编译宏，此处演示 TypeScript 类型定义与父组件调用的对应关系。
      </div>

      {/* 模板切换 */}
      <div className="flex flex-wrap gap-sm">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => selectTemplate(t.id)}
            className={cn(
              'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
              templateId === t.id
                ? 'border-[#42b883] bg-[#42b883]/10 text-[#42b883]'
                : 'border-hairline text-body-mid hover:border-body-mid',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-xl lg:grid-cols-2">
        {/* 左侧：类型定义输入 */}
        <div className="min-w-0 space-y-md">
          <div>
            <label className="mb-sm block font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              Props 类型定义
            </label>
            <textarea
              value={propsText}
              onChange={(e) => setPropsText(e.target.value)}
              rows={8}
              className="w-full rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink"
              aria-label="Props 类型定义"
            />
          </div>
          <div>
            <label className="mb-sm block font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              Emits 类型定义
            </label>
            <textarea
              value={emitsText}
              onChange={(e) => setEmitsText(e.target.value)}
              rows={6}
              className="w-full rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink"
              aria-label="Emits 类型定义"
            />
          </div>
        </div>

        {/* 右侧：生成的父组件代码 */}
        <div className="min-w-0">
          <label className="mb-sm block font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            生成的父组件调用代码
          </label>
          <pre className="max-h-[480px] min-h-[280px] overflow-auto rounded-sm border border-[#42b883]/40 bg-canvas-card p-lg font-mono text-body-sm text-ink">
            <code className="block whitespace-pre-wrap break-words">{generatedCode}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
