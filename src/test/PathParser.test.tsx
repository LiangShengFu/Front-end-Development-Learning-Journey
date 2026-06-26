/**
 * PathParser 组件测试
 */
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PathParser } from '../components/interactive/html/PathParser'
import type { PathParserData } from '../lib/html-visualization-types'

const mockData: PathParserData = {
  defaultUrl: 'https://example.com/path?name=hello#section',
  examples: [
    'https://example.com/path?name=hello#section',
    'http://localhost:3000/api',
  ],
  hint: '输入 URL',
}

describe('PathParser', () => {
  it('应显示默认 URL', () => {
    render(<PathParser data={mockData} />)
    expect(screen.getByDisplayValue('https://example.com/path?name=hello#section')).toBeInTheDocument()
  })

  it('应解析协议', () => {
    render(<PathParser data={mockData} />)
    // 协议在详情区显示为 https:
    expect(screen.getAllByText('https:').length).toBeGreaterThan(0)
  })

  it('应解析路径', () => {
    render(<PathParser data={mockData} />)
    expect(screen.getAllByText('/path').length).toBeGreaterThan(0)
  })

  it('应解析查询参数', () => {
    render(<PathParser data={mockData} />)
    // 查询参数解析区显示键值
    expect(screen.getByText('name')).toBeInTheDocument()
    expect(screen.getByText('"hello"')).toBeInTheDocument()
  })

  it('点击示例按钮应更新 URL', () => {
    render(<PathParser data={mockData} />)
    const exampleBtn = screen.getByText('http://localhost:3000/api')
    fireEvent.click(exampleBtn)
    expect(screen.getByDisplayValue('http://localhost:3000/api')).toBeInTheDocument()
    // localhost 应在解析结果中出现
    expect(screen.getAllByText('localhost:3000').length).toBeGreaterThan(0)
  })

  it('无效 URL 应显示错误提示', () => {
    render(<PathParser data={mockData} />)
    const input = screen.getByDisplayValue('https://example.com/path?name=hello#section')
    fireEvent.change(input, { target: { value: 'invalid-url' } })
    expect(screen.getByText(/无法解析 URL/)).toBeInTheDocument()
  })
})
