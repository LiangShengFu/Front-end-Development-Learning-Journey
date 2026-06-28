/**
 * 工具函数测试
 */
import { describe, it, expect } from 'vitest'
import { cn, padModuleNumber, difficultyStars, difficultyLabel } from '../lib/utils'

describe('cn', () => {
  it('应合并多个类名', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('应处理条件类名', () => {
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn('base', false && 'no', true && 'yes', null, undefined)).toBe('base yes')
  })

  it('应处理对象语法', () => {
    expect(cn({ active: true, disabled: false })).toBe('active')
  })
})

describe('padModuleNumber', () => {
  it('应将个位数补零为两位', () => {
    expect(padModuleNumber(1)).toBe('01')
    expect(padModuleNumber(5)).toBe('05')
    expect(padModuleNumber(9)).toBe('09')
  })

  it('两位数应保持不变', () => {
    expect(padModuleNumber(10)).toBe('10')
    expect(padModuleNumber(25)).toBe('25')
  })
})

describe('difficultyStars', () => {
  it('应返回对应数量的星号', () => {
    expect(difficultyStars(1)).toBe('⭐')
    expect(difficultyStars(3)).toBe('⭐⭐⭐')
    expect(difficultyStars(5)).toBe('⭐⭐⭐⭐⭐')
  })

  it('应限制在 0-5 范围', () => {
    expect(difficultyStars(0)).toBe('')
    expect(difficultyStars(-1)).toBe('')
    expect(difficultyStars(10)).toBe('⭐⭐⭐⭐⭐')
  })
})

describe('difficultyLabel', () => {
  it('应返回对应的难度标签', () => {
    expect(difficultyLabel(1)).toBe('入门')
    expect(difficultyLabel(2)).toBe('基础')
    expect(difficultyLabel(3)).toBe('进阶')
    expect(difficultyLabel(4)).toBe('高级')
    expect(difficultyLabel(5)).toBe('专家')
  })

  it('超出范围应被限制到有效区间', () => {
    expect(difficultyLabel(0)).toBe('')
    expect(difficultyLabel(6)).toBe('专家') // 被限制到 5
    expect(difficultyLabel(-1)).toBe('') // 被限制到 0
  })
})
