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

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

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
    { to: '/', label: '首页' },
    { to: '/modules', label: '模块' },
    { to: '/about', label: '关于' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-canvas/90 backdrop-blur-md transition-colors duration-200',
        scrolled ? 'border-b border-hairline' : 'border-b border-transparent',
      )}
    >
      <nav className="container-page flex items-center justify-between py-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-sm" aria-label="返回首页">
          <span className="font-mono text-caption-mono uppercase tracking-[1.4px] text-ink">
            FE·Journey
          </span>
          <span className="hidden text-caption-mono-sm text-body-mid sm:inline">/ 前端学习之旅</span>
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
          <Link to="/modules" className="btn-pill-sm">
            开始学习
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-hairline md:hidden"
          aria-label="切换菜单"
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
          </div>
        </div>
      )}
    </header>
  )
}
