/**
 * TableBuilder 组件测试
 */
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TableBuilder } from '../components/interactive/html/TableBuilder'
import type { TableBuilderData } from '../lib/html-visualization-types'

const mockData: TableBuilderData = {
  caption: '测试表格',
  headers: ['列1', '列2'],
  rows: [['数据1', '数据2']],
  footer: ['合计', '-'],
  steps: [
    {
      title: '第一步',
      description: '显示标题',
      showRegions: ['caption'],
    },
    {
      title: '第二步',
      description: '显示表头',
      showRegions: ['caption', 'thead'],
    },
    {
      title: '第三步',
      description: '显示全部',
      showRegions: ['caption', 'thead', 'tbody', 'tfoot'],
    },
  ],
}

describe('TableBuilder', () => {
  it('应渲染步骤按钮', () => {
    render(<TableBuilder data={mockData} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
  })

  it('初始应显示第一步内容', () => {
    render(<TableBuilder data={mockData} />)
    expect(screen.getByText('第一步')).toBeInTheDocument()
    expect(screen.getByText('显示标题')).toBeInTheDocument()
  })

  it('第一步应只显示 caption', () => {
    render(<TableBuilder data={mockData} />)
    expect(screen.getByText('测试表格')).toBeInTheDocument()
    // 表头不应显示
    expect(screen.queryByText('列1')).not.toBeInTheDocument()
  })

  it('点击第二步应显示表头', () => {
    render(<TableBuilder data={mockData} />)
    fireEvent.click(screen.getByText('02'))
    expect(screen.getByText('列1')).toBeInTheDocument()
    expect(screen.getByText('列2')).toBeInTheDocument()
  })

  it('点击第三步应显示全部区域', () => {
    render(<TableBuilder data={mockData} />)
    fireEvent.click(screen.getByText('03'))
    expect(screen.getByText('数据1')).toBeInTheDocument()
    expect(screen.getByText('合计')).toBeInTheDocument()
  })

  it('上一步/下一步按钮应正常工作', () => {
    render(<TableBuilder data={mockData} />)
    // 初始在第一步，上一步应禁用
    const prevBtn = screen.getByText('← 上一步')
    expect(prevBtn).toBeDisabled()

    // 点击下一步
    fireEvent.click(screen.getByText('下一步 →'))
    expect(screen.getByText('第二步')).toBeInTheDocument()

    // 现在上一步可用
    expect(prevBtn).not.toBeDisabled()
  })
})
