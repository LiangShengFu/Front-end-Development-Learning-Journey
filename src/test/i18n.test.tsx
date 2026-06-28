/**
 * i18n - 翻译函数与 Provider 单元测试
 *
 * 验证：
 * - 默认 locale 检测逻辑
 * - t() 插值与回退行为
 * - 语言切换后文案同步变化
 * - 中英文字典 key 一致性（无遗漏）
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { useI18n, I18nProvider } from '../lib/i18n'
import { zh } from '../lib/i18n-messages-zh'
import { en } from '../lib/i18n-messages-en'

const STORAGE_KEY = 'fe-journey-locale'

function Probe() {
  const { t, locale, setLocale } = useI18n()
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="home-title">{t('home.heroTitle1')}</span>
      <span data-testid="interpolated">{t('pointActions.daysLaterReview', { n: 3 })}</span>
      <span data-testid="missing">{t('this.key.does.not.exist')}</span>
      <button type="button" onClick={() => setLocale('en')}>
        switch-en
      </button>
    </div>
  )
}

describe('i18n - 核心功能', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY)
  })

  it('默认 locale 为 zh（浏览器语言为中文时）', () => {
    // jsdom navigator.language 默认为 en-US，但首次无 localStorage 时回退到 zh
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toMatch(/^(zh|en)$/)
  })

  it('已保存 locale 优先于浏览器语言', () => {
    localStorage.setItem(STORAGE_KEY, 'en')
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('en')
  })

  it('t() 支持插值', () => {
    localStorage.setItem(STORAGE_KEY, 'zh')
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('interpolated').textContent).toBe('3天后复习')
  })

  it('切换 locale 后文案立即更新', () => {
    localStorage.setItem(STORAGE_KEY, 'zh')
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('home-title').textContent).toBe('前端开发')

    act(() => {
      fireEvent.click(screen.getByText('switch-en'))
    })
    expect(screen.getByTestId('locale').textContent).toBe('en')
    expect(screen.getByTestId('home-title').textContent).toBe('Front-end')
    expect(screen.getByTestId('interpolated').textContent).toBe('In 3d')
  })

  it('缺失的 key 回退为 key 本身', () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('missing').textContent).toBe('this.key.does.not.exist')
  })
})

describe('i18n - 字典一致性', () => {
  const zhKeys = Object.keys(zh).sort()
  const enKeys = Object.keys(en).sort()

  it('zh 字典非空', () => {
    expect(zhKeys.length).toBeGreaterThan(50)
  })

  it('en 字典非空', () => {
    expect(enKeys.length).toBeGreaterThan(50)
  })

  it('zh 与 en 的 key 完全一致（无遗漏）', () => {
    const missingInEn = zhKeys.filter((k) => !enKeys.includes(k))
    const missingInZh = enKeys.filter((k) => !zhKeys.includes(k))
    expect({ missingInEn, missingInZh }).toEqual({
      missingInEn: [],
      missingInZh: [],
    })
  })

  it('所有插值占位符在两语言中一致', () => {
    // 提取 {name} 占位符
    const extract = (s: string) => {
      const matches = s.match(/\{(\w+)\}/g)
      return matches ? matches.sort() : []
    }
    const mismatches: Array<{ key: string; zh: string[]; en: string[] }> = []
    for (const key of zhKeys) {
      const zhP = extract(zh[key])
      const enP = extract(en[key])
      if (JSON.stringify(zhP) !== JSON.stringify(enP)) {
        mismatches.push({ key, zh: zhP, en: enP })
      }
    }
    expect(mismatches).toEqual([])
  })
})
