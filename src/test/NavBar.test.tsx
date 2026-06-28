/**
 * NavBar 组件测试
 *
 * NavBar 使用 useI18n，渲染时需包裹 I18nProvider。
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NavBar } from '../components/layout/NavBar'
import { I18nProvider } from '../lib/i18n'

const STORAGE_KEY = 'fe-journey-locale'

function renderWithProviders(node: React.ReactNode) {
  return render(
    <MemoryRouter>
      <I18nProvider>{node}</I18nProvider>
    </MemoryRouter>,
  )
}

describe('NavBar', () => {
  beforeEach(() => {
    // 强制中文（jsdom 默认 navigator.language = en-US）
    localStorage.setItem(STORAGE_KEY, 'zh')
  })

  it('应渲染项目名称', () => {
    renderWithProviders(<NavBar />)
    expect(screen.getByText('FE·Journey')).toBeInTheDocument()
  })

  it('应包含导航链接（中文）', () => {
    renderWithProviders(<NavBar />)
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('模块')).toBeInTheDocument()
    expect(screen.getByText('关于')).toBeInTheDocument()
  })

  it('导航链接应指向正确路径', () => {
    renderWithProviders(<NavBar />)
    const homeLink = screen.getByText('首页').closest('a')
    const modulesLink = screen.getByText('模块').closest('a')
    const aboutLink = screen.getByText('关于').closest('a')

    expect(homeLink).toHaveAttribute('href', '/')
    expect(modulesLink).toHaveAttribute('href', '/modules')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('包含语言切换按钮', () => {
    renderWithProviders(<NavBar />)
    // ZH / EN 切换器同时存在
    expect(screen.getByText('ZH')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })
})
