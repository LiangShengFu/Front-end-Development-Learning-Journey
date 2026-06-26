/**
 * NavBar 组件测试
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NavBar } from '../components/layout/NavBar'

describe('NavBar', () => {
  it('应渲染项目名称', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    )
    expect(screen.getByText('FE·Journey')).toBeInTheDocument()
  })

  it('应包含导航链接', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    )
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('模块')).toBeInTheDocument()
    expect(screen.getByText('关于')).toBeInTheDocument()
  })

  it('导航链接应指向正确路径', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    )
    const homeLink = screen.getByText('首页').closest('a')
    const modulesLink = screen.getByText('模块').closest('a')
    const aboutLink = screen.getByText('关于').closest('a')

    expect(homeLink).toHaveAttribute('href', '/')
    expect(modulesLink).toHaveAttribute('href', '/modules')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })
})
