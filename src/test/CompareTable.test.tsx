/**
 * CompareTable 组件测试
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CompareTable } from '../components/interactive/CompareTable'
import type { CompareTableData } from '../lib/types'

const mockData: CompareTableData = {
  featureColumn: '特性',
  columns: ['React', 'Vue', 'Angular'],
  rows: [
    { feature: '学习曲线', values: ['中等', '平缓', '陡峭'] },
    { feature: '性能', values: ['优秀', '优秀', '良好'] },
  ],
  highlightColumn: 1,
}

describe('CompareTable', () => {
  it('应渲染表头', () => {
    render(<CompareTable data={mockData} />)
    expect(screen.getByText('特性')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
    expect(screen.getByText('Angular')).toBeInTheDocument()
  })

  it('应渲染所有数据行', () => {
    render(<CompareTable data={mockData} />)
    expect(screen.getByText('学习曲线')).toBeInTheDocument()
    expect(screen.getByText('中等')).toBeInTheDocument()
    expect(screen.getByText('平缓')).toBeInTheDocument()
    expect(screen.getByText('陡峭')).toBeInTheDocument()
    expect(screen.getByText('性能')).toBeInTheDocument()
  })

  it('高亮列应显示星标', () => {
    const { container } = render(<CompareTable data={mockData} />)
    // Vue 列被高亮，应有星标
    expect(container.textContent).toContain('★')
  })

  it('无高亮列时不应显示星标', () => {
    const { container } = render(
      <CompareTable data={{ ...mockData, highlightColumn: undefined }} />,
    )
    expect(container.textContent).not.toContain('★')
  })
})
