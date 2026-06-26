/**
 * FormPlayground - 表单元素交互演示器
 *
 * 左侧实时表单，右侧显示表单数据的序列化输出。
 * 输入时实时更新输出，直观展示表单元素的数据收集机制。
 *
 * 设计规范：表单输入框使用 canvas-soft 背景，focus 时 accent-sunset 边框；
 * 输出区使用 GeistMono 字体，键值对色彩区分。
 */
import { useState } from 'react'
import type { FormPlaygroundData, FormField } from '../../../lib/html-visualization-types'
import { cn } from '../../../lib/utils'

interface FormPlaygroundProps {
  data: FormPlaygroundData
}

export function FormPlayground({ data }: FormPlaygroundProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    data.fields.forEach((f) => {
      init[f.name] = f.defaultValue ?? ''
    })
    return init
  })

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
      {data.title && (
        <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        {/* 表单预览 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            表单预览
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-sm"
          >
            {data.fields.map((field) => (
              <FormFieldView
                key={field.name}
                field={field}
                value={values[field.name] ?? ''}
                onChange={(v) => handleChange(field.name, v)}
              />
            ))}
            <button
              type="submit"
              className="mt-sm rounded-pill border border-ink bg-ink px-md py-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-canvas transition-colors hover:bg-transparent hover:text-ink"
            >
              {data.submitLabel ?? '提交'}
            </button>
          </form>
        </div>

        {/* 数据输出 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-twilight">
            表单数据输出
          </div>
          <div className="space-y-xs font-mono text-caption-mono">
            <div className="text-body-mid">{'{'}</div>
            {data.fields.map((field) => (
              <div key={field.name} className="pl-md">
                <span className="text-accent-sunset">"{field.name}"</span>
                <span className="text-body-mid">: </span>
                <span className="text-accent-breeze">"{values[field.name] ?? ''}"</span>
                {field.required && <span className="text-red-400"> *</span>}
              </div>
            ))}
            <div className="text-body-mid">{'}'}</div>
          </div>
          <div className="mt-md border-t border-hairline pt-sm">
            <p className="text-caption-mono-sm text-body-mid">
              实时同步 · 输入时自动更新
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FormFieldViewProps {
  field: FormField
  value: string
  onChange: (value: string) => void
}

function FormFieldView({ field, value, onChange }: FormFieldViewProps) {
  const inputClass = cn(
    'w-full rounded-xxs border border-hairline bg-canvas px-sm py-xs',
    'font-mono text-caption-mono text-ink',
    'outline-none transition-colors',
    'focus:border-accent-sunset focus:bg-canvas-soft',
  )

  return (
    <div>
      <label className="mb-xxs block font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
        {field.label}
        {field.required && <span className="ml-xxs text-accent-sunset">*</span>}
      </label>
      {field.type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">-- 选择 --</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={cn(inputClass, 'min-h-[60px] resize-y')}
        />
      ) : field.type === 'checkbox' ? (
        <input
          type="checkbox"
          checked={value === 'true'}
          onChange={(e) => onChange(e.target.checked ? 'true' : 'false')}
          className="h-4 w-4 rounded-xxs border-hairline"
        />
      ) : (
        <input
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          className={inputClass}
        />
      )}
    </div>
  )
}
