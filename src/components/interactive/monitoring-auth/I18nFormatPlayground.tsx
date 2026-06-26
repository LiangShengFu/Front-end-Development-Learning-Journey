/**
 * I18nFormatPlayground — Intl API 格式化交互演示
 *
 * 演示浏览器原生 Intl API 的本地化格式化能力：
 * - 日期格式化（DateTimeFormat）
 * - 数字格式化（NumberFormat）
 * - 货币格式化（currency）
 * - 复数处理（plural rules）
 *
 * 交互：点击场景按钮切换 locale 与类型，实时显示格式化结果；
 * 可自定义 locale 输入框验证不同语言环境。
 *
 * ⚠️ 教学模型：使用浏览器原生 Intl API，结果依赖运行时环境支持。
 */
'use client'

import { useMemo, useState } from 'react'
import type {
  I18nFormatPlaygroundData,
  I18nFormatScenario,
} from '../../../lib/monitoring-auth-visualization-types'
import { cn } from '../../../lib/utils'

interface I18nFormatPlaygroundProps {
  data?: I18nFormatPlaygroundData
}

/** 默认场景数据 */
const DEFAULT_SCENARIOS: I18nFormatScenario[] = [
  {
    id: 'date-zh',
    label: '日期 zh-CN',
    locale: 'zh-CN',
    type: 'date',
    value: '2026-06-26',
    options: { dateStyle: 'full' },
    expected: '2026年6月26日星期五',
    note: '中文完整日期：年月日 + 星期',
  },
  {
    id: 'date-de',
    label: '日期 de-DE',
    locale: 'de-DE',
    type: 'date',
    value: '2026-06-26',
    options: { dateStyle: 'full' },
    expected: 'Freitag, 26. Juni 2026',
    note: '德语日期：星期在前，逗号分隔',
  },
  {
    id: 'date-ja',
    label: '日期 ja-JP',
    locale: 'ja-JP',
    type: 'date',
    value: '2026-06-26',
    options: { dateStyle: 'long' },
    expected: '2026年6月26日',
    note: '日语日期：无星期，简洁形式',
  },
  {
    id: 'currency-eur',
    label: '货币 de-DE',
    locale: 'de-DE',
    type: 'currency',
    value: 1234.56,
    options: { currency: 'EUR' },
    expected: '1.234,56 €',
    note: '德语货币：千位用点，小数用逗号，€ 在后',
  },
  {
    id: 'currency-jp',
    label: '货币 ja-JP',
    locale: 'ja-JP',
    type: 'currency',
    value: 1234.56,
    options: { currency: 'JPY' },
    expected: '￥1,235',
    note: '日元无小数，四舍五入到整数',
  },
  {
    id: 'compact',
    label: '紧凑数字 en-US',
    locale: 'en-US',
    type: 'number',
    value: 1000000,
    options: { notation: 'compact' },
    expected: '1M',
    note: '紧凑计数法：百万显示为 1M',
  },
  {
    id: 'percent',
    label: '百分比 fr-FR',
    locale: 'fr-FR',
    type: 'number',
    value: 0.875,
    options: { style: 'percent' },
    expected: '87 %',
    note: '法语百分比：数字与 % 间有空格',
  },
]

const DEFAULT_ICU_EXAMPLES = [
  {
    id: 'plural-en',
    label: '复数（英文）',
    template: '{count, plural, =0 {no items} one {# item} other {# items}}',
    params: { count: 1 },
    result: '1 item',
  },
  {
    id: 'plural-zh',
    label: '复数（中文）',
    template: '{count, plural, other {# 件商品}}',
    params: { count: 5 },
    result: '5 件商品',
  },
  {
    id: 'gender',
    label: '性别选择',
    template: '{gender, select, male {他} female {她} other {TA}}发布了动态',
    params: { gender: 'female' },
    result: '她发布了动态',
  },
  {
    id: 'nested',
    label: '嵌套消息',
    template:
      '{count, plural, =0 {无评论} other {# 条来自{gender, select, male {他} female {她} other {TA}}的评论}}',
    params: { count: 3, gender: 'male' },
    result: '3 条来自他的评论',
  },
]

export function I18nFormatPlayground({ data }: I18nFormatPlaygroundProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const icuExamples = data?.icuExamples ?? DEFAULT_ICU_EXAMPLES
  const defaultId = data?.defaultScenario ?? scenarios[0]?.id ?? 'date-zh'

  const [scenarioId, setScenarioId] = useState<string>(defaultId)
  const [customLocale, setCustomLocale] = useState<string>('')
  const [activeIcu, setActiveIcu] = useState<string>(icuExamples[0]?.id ?? 'plural-en')

  const current = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]
  const effectiveLocale = customLocale.trim() || current?.locale || 'zh-CN'

  /** 执行格式化 */
  const formatted = useMemo(() => {
    if (!current) return '⚠ 无场景'
    try {
      const locale = effectiveLocale || current.locale
      if (current.type === 'date') {
        const date = new Date(current.value as string)
        if (isNaN(date.getTime())) return '⚠ 日期无效'
        return new Intl.DateTimeFormat(locale, current.options as Intl.DateTimeFormatOptions).format(
          date,
        )
      }
      if (current.type === 'currency') {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          ...(current.options as object),
        }).format(current.value as number)
      }
      return new Intl.NumberFormat(locale, current.options as Intl.NumberFormatOptions).format(
        current.value as number,
      )
    } catch {
      return '⚠ 格式化失败（locale 可能不支持）'
    }
  }, [current, effectiveLocale])

  const activeIcuExample = icuExamples.find((e) => e.id === activeIcu) ?? icuExamples[0]

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface p-md">
      {/* 场景选择器 */}
      <div className="mb-md">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          Intl API 格式化场景
        </div>
        <div className="flex flex-wrap gap-xs">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setScenarioId(s.id)
                setCustomLocale('')
              }}
              className={cn(
                'rounded-md border px-sm py-xs text-body-sm transition-colors',
                s.id === scenarioId
                  ? 'border-accent-sunset bg-accent-sunset/10 text-accent-sunset'
                  : 'border-border-subtle text-body-mid hover:border-accent-sunset hover:text-accent-sunset',
              )}
              aria-pressed={s.id === scenarioId}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* locale 输入 */}
      <div className="mb-md flex flex-wrap items-center gap-sm">
        <label className="text-body-sm text-body-mid" htmlFor="i18n-locale-input">
          自定义 locale：
        </label>
        <input
          id="i18n-locale-input"
          type="text"
          value={customLocale}
          onChange={(e) => setCustomLocale(e.target.value)}
          placeholder={current?.locale ?? 'zh-CN'}
          className="rounded-md border border-border-subtle bg-bg-base px-sm py-xs font-mono text-body-sm text-text-base outline-none focus:border-accent-sunset"
        />
        <span className="text-caption text-body-mid">
          当前生效：<code className="font-mono text-accent-sunset">{effectiveLocale}</code>
        </span>
      </div>

      {/* 格式化结果 */}
      <div className="mb-md rounded-md border border-border-subtle bg-bg-base p-md">
        <div className="mb-xs text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          格式化结果
        </div>
        <div className="font-mono text-h4 text-text-base" aria-live="polite">
          {formatted}
        </div>
        {current?.expected && (
          <div className="mt-xs text-caption text-body-mid">
            预期（{current.locale}）：<code className="font-mono">{current.expected}</code>
          </div>
        )}
        {current?.note && (
          <div className="mt-xs text-caption text-body-mid">{current.note}</div>
        )}
      </div>

      {/* ICU MessageFormat 示例 */}
      <div>
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          ICU MessageFormat 示例
        </div>
        <div className="mb-sm flex flex-wrap gap-xs">
          {icuExamples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveIcu(ex.id)}
              className={cn(
                'rounded-md border px-sm py-xs text-caption transition-colors',
                ex.id === activeIcu
                  ? 'border-accent-sunset bg-accent-sunset/10 text-accent-sunset'
                  : 'border-border-subtle text-body-mid hover:border-accent-sunset',
              )}
              aria-pressed={ex.id === activeIcu}
            >
              {ex.label}
            </button>
          ))}
        </div>
        {activeIcuExample && (
          <div className="rounded-md border border-border-subtle bg-bg-base p-md">
            <div className="mb-xs text-caption text-body-mid">模板：</div>
            <pre className="mb-sm overflow-x-auto rounded bg-bg-surface p-sm font-mono text-caption text-text-base">
              {activeIcuExample.template}
            </pre>
            <div className="mb-xs text-caption text-body-mid">
              参数：<code className="font-mono">{JSON.stringify(activeIcuExample.params)}</code>
            </div>
            <div className="text-body-sm text-body-mid">
              结果：<span className="font-mono text-accent-sunset">{activeIcuExample.result}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-md rounded-md bg-accent-sunset/5 p-sm text-caption text-body-mid">
        💡 Intl API 是浏览器原生能力，无需第三方库。复数规则因语言而异（阿拉伯语有 6 种复数形式），ICU MessageFormat 能正确处理。
      </div>
    </div>
  )
}
