/**
 * ResponsiveNavDemo — 响应式导航栏实战
 *
 * 可交互的响应式导航栏组件，支持桌面/移动端切换、汉堡菜单展开、
 * 暗色模式切换，展示 Tailwind 响应式类的实际应用效果。
 *
 * 对应docx中演示 #11
 */
import { useState } from 'react'
import type { ResponsiveNavDemoData } from '../../../lib/css-engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface ResponsiveNavDemoProps {
  data?: ResponsiveNavDemoData
}

const DEFAULT_NAV_ITEMS = [
  { label: '首页', href: '#' },
  { label: '产品', href: '#' },
  { label: '文档', href: '#' },
  { label: '关于', href: '#' },
  { label: '联系', href: '#' },
]

const DEVICE_PRESETS = [
  { label: '手机', width: 375, icon: '📱' },
  { label: '平板', width: 768, icon: '📋' },
  { label: '桌面', width: 1100, icon: '🖥️' },
]

export function ResponsiveNavDemo({ data }: ResponsiveNavDemoProps) {
  const navItems = data?.navItems ?? DEFAULT_NAV_ITEMS
  const [deviceWidth, setDeviceWidth] = useState(data?.defaultWidth ?? 768)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeItem, setActiveItem] = useState(0)

  const isMobile = deviceWidth < 768

  // 切换设备宽度时自动处理菜单状态
  const handleDeviceChange = (width: number) => {
    setDeviceWidth(width)
    if (width >= 768) {
      setMenuOpen(false)
    }
  }

  return (
    <div className="space-y-lg">
      {/* 设备预设按钮 */}
      <div className="flex flex-wrap items-center gap-sm">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          设备:
        </span>
        {DEVICE_PRESETS.map((d) => (
          <button
            key={d.label}
            type="button"
            onClick={() => handleDeviceChange(d.width)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
              deviceWidth === d.width
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {d.icon} {d.label} ({d.width}px)
          </button>
        ))}

        {/* 暗色模式切换 */}
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={cn(
            'ml-auto rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
            isDarkMode
              ? 'border-accent-dusk bg-accent-dusk text-white'
              : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
          )}
        >
          {isDarkMode ? '🌙 暗色' : '☀️ 亮色'}
        </button>
      </div>

      {/* 模拟导航栏视口 */}
      <div
        className="mx-auto overflow-hidden rounded-sm border-2 border-accent-sunset/40 transition-all duration-300"
        style={{ maxWidth: Math.min(deviceWidth, 1100) }}
      >
        {/* 导航栏 */}
        <nav
          className={cn(
            'flex items-center justify-between px-lg py-md transition-colors',
            isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
          )}
          style={{
            borderBottom: isDarkMode
              ? '1px solid #374151'
              : '1px solid #e5e7eb',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-sm">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-sm font-bold',
                isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white',
              )}
            >
              L
            </div>
            <span
              className={cn(
                'font-semibold',
                isMobile ? 'text-sm' : 'text-base',
              )}
            >
              Logo
            </span>
          </div>

          {/* 桌面端水平导航 */}
          {!isMobile && (
            <div className="flex items-center gap-lg">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveItem(i)
                  }}
                  className={cn(
                    'text-sm transition-colors hover:text-blue-500',
                    activeItem === i
                      ? 'font-semibold text-blue-500'
                      : isDarkMode
                        ? 'text-gray-300'
                        : 'text-gray-600',
                  )}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                className="rounded-sm bg-blue-500 px-md py-xs text-sm text-white transition-colors hover:bg-blue-600"
              >
                登录
              </button>
            </div>
          )}

          {/* 移动端汉堡菜单按钮 */}
          {isMobile && (
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                'flex h-8 w-8 flex-col items-center justify-center gap-1 rounded-sm transition-colors',
                isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100',
              )}
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            >
              <span
                className={cn(
                  'block h-0.5 w-5 transition-all',
                  isDarkMode ? 'bg-white' : 'bg-gray-900',
                  menuOpen && 'translate-y-[6px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-5 transition-all',
                  isDarkMode ? 'bg-white' : 'bg-gray-900',
                  menuOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-5 transition-all',
                  isDarkMode ? 'bg-white' : 'bg-gray-900',
                  menuOpen && '-translate-y-[6px] -rotate-45',
                )}
              />
            </button>
          )}
        </nav>

        {/* 移动端展开菜单 */}
        {isMobile && menuOpen && (
          <div
            className={cn(
              'space-y-0 border-t px-lg py-md',
              isDarkMode
                ? 'border-gray-800 bg-gray-900'
                : 'border-gray-200 bg-white',
            )}
          >
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveItem(i)
                  setMenuOpen(false)
                }}
                className={cn(
                  'block py-sm text-sm transition-colors',
                  activeItem === i
                    ? 'font-semibold text-blue-500'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900',
                )}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-sm w-full rounded-sm bg-blue-500 py-sm text-sm text-white transition-colors hover:bg-blue-600"
            >
              登录
            </button>
          </div>
        )}
      </div>

      {/* 对应的 Tailwind 类代码 */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          {isMobile ? '移动端 Tailwind 类' : '桌面端 Tailwind 类'}
        </div>
        <code className="block font-mono text-body-sm text-accent-sunset leading-relaxed">
          {isMobile
            ? `{/* 导航栏 */}
<nav class="flex items-center justify-between px-4 py-3">
  {/* 汉堡菜单按钮 — 仅移动端显示 */}
  <button class="md:hidden flex flex-col gap-1">
    ...
  </button>
  {/* 移动端菜单 — 条件渲染 */}
  <div class="absolute top-full left-0 w-full bg-white dark:bg-gray-900">
    <a class="block py-2">首页</a>
    ...
  </div>
</nav>`
            : `{/* 导航栏 — 桌面端 */}
<nav class="flex items-center justify-between px-6 py-3">
  {/* 水平导航 — 仅桌面端显示 */}
  <div class="hidden md:flex items-center gap-6">
    <a class="text-sm hover:text-blue-500">首页</a>
    <a class="text-sm hover:text-blue-500">产品</a>
    ...
  </div>
  <button class="bg-blue-500 text-white px-3 py-1 rounded">
    登录
  </button>
</nav>`}
        </code>

        <div className="mt-md grid grid-cols-2 gap-sm">
          <div className="text-body-sm text-accent-sunset">
            md:hidden — 移动端可见
          </div>
          <div className="text-body-sm text-accent-dusk">
            hidden md:flex — 桌面端可见
          </div>
          <div className="text-body-sm text-body-mid">
            dark:bg-gray-900 — 暗色模式
          </div>
          <div className="text-body-sm text-body-mid">
            dark:text-white — 暗色文字
          </div>
        </div>
      </div>
    </div>
  )
}
