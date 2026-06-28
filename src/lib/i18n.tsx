/**
 * i18n - 轻量国际化方案
 *
 * 设计：
 * - Context + hook，无第三方依赖
 * - localStorage 持久化（fe-journey-locale）
 * - 浏览器语言自动检测（navigator.language）
 * - document.documentElement.lang 同步
 * - 支持插值：t('key', { n: 5 }) → "5 天后复习"
 *
 * 用法：
 *   const { t, locale, setLocale } = useI18n()
 *   <h1>{t('home.title')}</h1>
 *   <span>{t('progress.daysLater', { n: 3 })}</span>
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { zh } from './i18n-messages-zh'
import { en } from './i18n-messages-en'
import { zhModules } from './i18n-messages-modules-zh'
import { enModules } from './i18n-messages-modules-en'

export type Locale = 'zh' | 'en'

/** 翻译资源表（zh / en 共用同一 key 结构） */
const messages: Record<Locale, Record<string, string>> = {
  zh: { ...zh, ...zhModules },
  en: { ...en, ...enModules },
}

const STORAGE_KEY = 'fe-journey-locale'

/** 检测浏览器首选语言 */
function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'zh'
  // 1. localStorage 优先
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'zh' || saved === 'en') return saved
  // 2. 浏览器语言
  const navLang = navigator.language.toLowerCase()
  if (navLang.startsWith('zh')) return 'zh'
  if (navLang.startsWith('en')) return 'en'
  // 3. 默认中文
  return 'zh'
}

interface I18nContextValue {
  locale: Locale
  /** 翻译函数，支持插值 {name} */
  t: (key: string, params?: Record<string, string | number>) => string
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale)

  // 同步 document.lang + localStorage
  useEffect(() => {
    document.documentElement.lang = locale
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const dict = messages[locale] ?? messages.zh
      let value = dict[key] ?? messages.zh[key] ?? key
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
        }
      }
      return value
    },
    [locale],
  )

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t, setLocale }),
    [locale, t, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/** useI18n - 获取当前 locale 与翻译函数 */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n 必须在 I18nProvider 内使用')
  }
  return ctx
}
