/**
 * QuizCard 组件测试
 */
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizCard } from '../components/interactive/QuizCard'
import type { QuizData } from '../lib/types'

const mockData: QuizData = {
  questions: [
    {
      question: 'HTML 表示什么？',
      options: ['超文本标记语言', '编程语言', '数据库', '操作系统'],
      correctIndex: 0,
      explanation: 'HTML 是 HyperText Markup Language 的缩写。',
    },
    {
      question: '哪个标签用于段落？',
      options: ['<div>', '<p>', '<span>', '<a>'],
      correctIndex: 1,
      explanation: '<p> 是 paragraph 段落的缩写。',
    },
  ],
}

describe('QuizCard', () => {
  it('应显示第一道题目', () => {
    render(<QuizCard data={mockData} />)
    expect(screen.getByText('HTML 表示什么？')).toBeInTheDocument()
    expect(screen.getByText('超文本标记语言')).toBeInTheDocument()
    expect(screen.getByText('编程语言')).toBeInTheDocument()
  })

  it('应显示进度信息', () => {
    render(<QuizCard data={mockData} />)
    expect(screen.getByText(/问题 1 \/ 2/)).toBeInTheDocument()
    expect(screen.getByText(/得分 0/)).toBeInTheDocument()
  })

  it('选择正确答案应显示正确反馈', () => {
    render(<QuizCard data={mockData} />)
    fireEvent.click(screen.getByText('超文本标记语言'))
    expect(screen.getByText('回答正确')).toBeInTheDocument()
    expect(screen.getByText(/HTML 是 HyperText/)).toBeInTheDocument()
  })

  it('选择错误答案应显示错误反馈和正确答案', () => {
    render(<QuizCard data={mockData} />)
    fireEvent.click(screen.getByText('编程语言'))
    expect(screen.getByText('回答错误')).toBeInTheDocument()
  })

  it('答完一题后应显示下一题按钮', () => {
    render(<QuizCard data={mockData} />)
    fireEvent.click(screen.getByText('超文本标记语言'))
    expect(screen.getByText('下一题 →')).toBeInTheDocument()
  })

  it('完成所有题目应显示结果', () => {
    render(<QuizCard data={mockData} />)

    // 第一题答对
    fireEvent.click(screen.getByText('超文本标记语言'))
    fireEvent.click(screen.getByText('下一题 →'))

    // 第二题答对
    fireEvent.click(screen.getByText('<p>'))
    fireEvent.click(screen.getByText('查看结果 →'))

    expect(screen.getByText('测验完成')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText(/答对 2 \/ 2 题/)).toBeInTheDocument()
  })

  it('点击重新测验应回到第一题', () => {
    render(<QuizCard data={mockData} />)

    fireEvent.click(screen.getByText('超文本标记语言'))
    fireEvent.click(screen.getByText('下一题 →'))
    fireEvent.click(screen.getByText('<p>'))
    fireEvent.click(screen.getByText('查看结果 →'))
    fireEvent.click(screen.getByText('重新测验'))

    expect(screen.getByText('HTML 表示什么？')).toBeInTheDocument()
  })
})
