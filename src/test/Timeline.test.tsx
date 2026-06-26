/**
 * Timeline 组件测试
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline } from '../components/interactive/Timeline'
import type { TimelineData } from '../lib/types'

const mockData: TimelineData = {
  orientation: 'vertical',
  items: [
    { time: '1993', title: 'HTML 诞生', description: 'Tim Berners-Lee 提案' },
    { time: '2014', title: 'HTML5 发布', description: 'W3C 正式标准' },
  ],
}

describe('Timeline', () => {
  it('垂直方向应渲染所有项目', () => {
    render(<Timeline data={mockData} />)
    expect(screen.getByText('1993')).toBeInTheDocument()
    expect(screen.getByText('HTML 诞生')).toBeInTheDocument()
    expect(screen.getByText('Tim Berners-Lee 提案')).toBeInTheDocument()
    expect(screen.getByText('2014')).toBeInTheDocument()
    expect(screen.getByText('HTML5 发布')).toBeInTheDocument()
  })

  it('水平方向应渲染所有项目', () => {
    render(<Timeline data={{ ...mockData, orientation: 'horizontal' }} />)
    expect(screen.getByText('1993')).toBeInTheDocument()
    expect(screen.getByText('HTML5 发布')).toBeInTheDocument()
  })

  it('默认方向应为垂直', () => {
    const { container } = render(
      <Timeline data={{ ...mockData, orientation: undefined }} />,
    )
    // 垂直时间线有有序列表
    expect(container.querySelector('ol')).toBeInTheDocument()
  })

  it('应正确渲染项目状态', () => {
    render(
      <Timeline
        data={{
          items: [
            { time: 'T1', title: '已完成', status: 'done' },
            { time: 'T2', title: '进行中', status: 'active' },
            { time: 'T3', title: '待开始', status: 'pending' },
          ],
        }}
      />,
    )
    expect(screen.getByText('已完成')).toBeInTheDocument()
    expect(screen.getByText('进行中')).toBeInTheDocument()
    expect(screen.getByText('待开始')).toBeInTheDocument()
  })
})
