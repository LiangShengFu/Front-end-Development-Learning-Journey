/**
 * NavBar - 顶部粘性导航栏
 *
 * 遵循 DESIGN.md 的 nav-bar 规范：
 * - 背景 canvas (#0a0a0a)，文字 ink (#ffffff)
 * - padding md xl
 * - 文字 body-sm
 * - 链接为 nav-link 规范
 */
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { useI18n, type Locale } from '../../lib/i18n'

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { t, locale, setLocale } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 路由变化时关闭移动菜单
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/modules', label: t('nav.modules') },
    { to: '/progress', label: t('nav.progress') },
    { to: '/about', label: t('nav.about') },
  ]

  const toggleLang = () => setLocale(locale === 'zh' ? 'en' : 'zh')

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-canvas/90 backdrop-blur-md transition-colors duration-200',
        scrolled ? 'border-b border-hairline' : 'border-b border-transparent',
      )}
    >
      <nav className="container-page flex items-center justify-between py-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-sm" aria-label={t('common.backToHome')}>
          <span className="font-mono text-caption-mono uppercase tracking-[1.4px] text-ink">
            FE·Journey
          </span>
          <span className="hidden text-caption-mono-sm text-body-mid sm:inline">
            {t('nav.brandSubtitle')}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-lg md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'text-body-sm transition-colors duration-200',
                  isActive ? 'text-ink' : 'text-body-mid hover:text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="flex items-center gap-xs rounded-sm border border-hairline px-sm py-xs text-caption-mono-sm text-body-mid transition-colors hover:text-ink"
            aria-label={t('nav.search')}
          >
            <span aria-hidden="true">⌕</span>
            {t('nav.search')}
            <kbd className="font-mono text-caption-mono-sm text-body-mid/60">⌘K</kbd>
          </button>
          <LangToggle locale={locale} onToggle={toggleLang} ariaLabel={t('nav.toggleLang')} />
          <Link to="/modules" className="btn-pill-sm">
            {t('nav.startLearning')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-hairline md:hidden"
          aria-label={t('nav.toggleMenu')}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <div className="flex flex-col gap-[3px]">
            <span
              className={cn(
                'h-[1.5px] w-5 bg-ink transition-transform duration-200',
                mobileOpen && 'translate-y-[4.5px] rotate-45',
              )}
            />
            <span
              className={cn(
                'h-[1.5px] w-5 bg-ink transition-opacity duration-200',
                mobileOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'h-[1.5px] w-5 bg-ink transition-transform duration-200',
                mobileOpen && '-translate-y-[4.5px] -rotate-45',
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-hairline md:hidden">
          <div className="container-page flex flex-col gap-md py-lg">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'text-body-md transition-colors',
                    isActive ? 'text-ink' : 'text-body-mid hover:text-ink',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                window.dispatchEvent(new CustomEvent('open-command-palette'))
              }}
              className="flex items-center gap-sm text-body-md text-body-mid transition-colors hover:text-ink"
              aria-label={t('nav.search')}
            >
              <span aria-hidden="true">⌕</span>
              {t('nav.search')}
            </button>
            <LangToggle locale={locale} onToggle={toggleLang} ariaLabel={t('nav.toggleLang')} />
          </div>
        </div>
      )}
    </header>
  )
}

/** 语言切换器（ZH / EN） */
function LangToggle({
  locale,
  onToggle,
  ariaLabel,
}: {
  locale: Locale
  onToggle: () => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      className="flex items-center gap-xs rounded-sm border border-hairline px-sm py-xs text-caption-mono-sm text-body-mid transition-colors hover:text-ink"
    >
      <span className={locale === 'zh' ? 'text-ink' : ''}>ZH</span>
      <span aria-hidden="true" className="text-body-mid/40">/</span>
      <span className={locale === 'en' ? 'text-ink' : ''}>EN</span>
    </button>
  )
}
