/**
 * A11yChecklist 组件测试
 */
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { A11yChecklist } from '../components/interactive/html/A11yChecklist'
import type { A11yChecklistData } from '../lib/html-visualization-types'

const mockData: A11yChecklistData = {
  title: '无障碍测试',
  items: [
    {
      title: '提供 alt 文本',
      description: '图片应有 alt 属性',
      code: '<img alt="...">',
      defaultChecked: true,
    },
    {
      title: '语义化标签',
      description: '使用 nav、main 等语义元素',
    },
    {
      title: '键盘可访问',
      description: '支持键盘操作',
    },
  ],
}

describe('A11yChecklist', () => {
  it('应渲染标题和所有检查项', () => {
    render(<A11yChecklist data={mockData} />)
    expect(screen.getByText('无障碍测试')).toBeInTheDocument()
    expect(screen.getByText('提供 alt 文本')).toBeInTheDocument()
    expect(screen.getByText('语义化标签')).toBeInTheDocument()
    expect(screen.getByText('键盘可访问')).toBeInTheDocument()
  })

  it('应显示代码示例', () => {
    render(<A11yChecklist data={mockData} />)
    expect(screen.getByText('<img alt="...">')).toBeInTheDocument()
  })

  it('defaultChecked 项应默认勾选', () => {
    render(<A11yChecklist data={mockData} />)
    // 进度应显示 1/3
    expect(screen.getByText('1/3')).toBeInTheDocument()
  })

  it('点击未勾选项应增加进度', () => {
    render(<A11yChecklist data={mockData} />)
    fireEvent.click(screen.getByText('语义化标签'))
    expect(screen.getByText('2/3')).toBeInTheDocument()
  })

  it('点击已勾选项应减少进度', () => {
    render(<A11yChecklist data={mockData} />)
    fireEvent.click(screen.getByText('提供 alt 文本'))
    expect(screen.getByText('0/3')).toBeInTheDocument()
  })

  it('应显示百分比进度', () => {
    render(<A11yChecklist data={mockData} />)
    expect(screen.getByText('33%')).toBeInTheDocument()
  })
})
