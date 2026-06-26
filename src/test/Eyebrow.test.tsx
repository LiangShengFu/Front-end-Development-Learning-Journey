/**
 * Eyebrow 组件测试
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Eyebrow } from '../components/layout/Eyebrow'

describe('Eyebrow', () => {
  it('应渲染子文本', () => {
    render(<Eyebrow>Section Title</Eyebrow>)
    expect(screen.getByText('Section Title')).toBeInTheDocument()
  })

  it('有 index 时应显示编号', () => {
    render(<Eyebrow index="01 /">Section Title</Eyebrow>)
    expect(screen.getByText('01 /')).toBeInTheDocument()
    expect(screen.getByText('Section Title')).toBeInTheDocument()
  })

  it('应使用 mono 字体样式（通过类名检查）', () => {
    const { container } = render(<Eyebrow>Test</Eyebrow>)
    const eyebrow = container.querySelector('div')
    expect(eyebrow?.className).toContain('font-mono')
    expect(eyebrow?.className).toContain('uppercase')
    expect(eyebrow?.className).toContain('tracking-')
  })

  it('应支持自定义 className', () => {
    const { container } = render(
      <Eyebrow className="custom-class">Test</Eyebrow>,
    )
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})
