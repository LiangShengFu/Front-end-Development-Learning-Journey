/**
 * Accordion 组件测试
 */
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Accordion } from '../components/interactive/Accordion'
import type { AccordionData } from '../lib/types'

const mockData: AccordionData = {
  items: [
    { title: '第一项', content: '内容一' },
    { title: '第二项', content: '内容二', code: 'const x = 1', codeLanguage: 'js' },
    { title: '第三项', content: '内容三' },
  ],
}

describe('Accordion', () => {
  it('应渲染所有面板标题', () => {
    render(<Accordion data={mockData} />)
    expect(screen.getByText('第一项')).toBeInTheDocument()
    expect(screen.getByText('第二项')).toBeInTheDocument()
    expect(screen.getByText('第三项')).toBeInTheDocument()
  })

  it('初始状态所有面板应折叠', () => {
    render(<Accordion data={mockData} />)
    expect(screen.queryByText('内容一')).not.toBeInTheDocument()
    expect(screen.queryByText('内容二')).not.toBeInTheDocument()
  })

  it('点击标题应展开对应面板', () => {
    render(<Accordion data={mockData} />)
    fireEvent.click(screen.getByText('第一项'))
    expect(screen.getByText('内容一')).toBeInTheDocument()
  })

  it('再次点击应折叠面板', () => {
    render(<Accordion data={mockData} />)
    const header = screen.getByText('第一项')

    fireEvent.click(header)
    expect(screen.getByText('内容一')).toBeInTheDocument()

    fireEvent.click(header)
    expect(screen.queryByText('内容一')).not.toBeInTheDocument()
  })

  it('单展开模式下，展开新面板应关闭旧面板', () => {
    render(<Accordion data={mockData} />)

    fireEvent.click(screen.getByText('第一项'))
    expect(screen.getByText('内容一')).toBeInTheDocument()

    fireEvent.click(screen.getByText('第二项'))
    expect(screen.queryByText('内容一')).not.toBeInTheDocument()
    expect(screen.getByText('内容二')).toBeInTheDocument()
  })

  it('多展开模式下，可同时展开多个面板', () => {
    render(<Accordion data={{ ...mockData, multiple: true }} />)

    fireEvent.click(screen.getByText('第一项'))
    fireEvent.click(screen.getByText('第二项'))

    expect(screen.getByText('内容一')).toBeInTheDocument()
    expect(screen.getByText('内容二')).toBeInTheDocument()
  })

  it('defaultOpen 应默认展开指定面板', () => {
    render(<Accordion data={{ ...mockData, defaultOpen: [1] }} />)
    expect(screen.getByText('内容二')).toBeInTheDocument()
  })
})
