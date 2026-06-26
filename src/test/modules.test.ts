/**
 * 模块注册表测试
 */
import { describe, it, expect } from 'vitest'
import { moduleSummaries, getModuleSummary, getAdjacentModules } from '../lib/modules'
import { stages } from '../lib/stages'

describe('moduleSummaries', () => {
  it('应包含全部 25 个模块', () => {
    expect(moduleSummaries).toHaveLength(25)
  })

  it('每个模块应有完整的元数据', () => {
    moduleSummaries.forEach((m) => {
      expect(m.number).toMatch(/^\d{2}$/)
      expect(m.title).toBeTruthy()
      expect(m.slug).toBeTruthy()
      expect(m.stage).toBeTruthy()
      expect(m.stageLabel).toBeTruthy()
      expect(m.icon).toBeTruthy()
      expect(m.summary).toBeTruthy()
      expect(m.knowledgePointCount).toBeGreaterThan(0)
      expect(m.visualizationCount).toBeGreaterThan(0)
    })
  })

  it('模块编号应从 01 到 25 连续', () => {
    const numbers = moduleSummaries.map((m) => Number(m.number))
    for (let i = 0; i < 25; i++) {
      expect(numbers[i]).toBe(i + 1)
    }
  })

  it('slug 应唯一', () => {
    const slugs = moduleSummaries.map((m) => m.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('getModuleSummary', () => {
  it('应根据 slug 返回模块', () => {
    const m = getModuleSummary('html-fundamentals')
    expect(m).toBeDefined()
    expect(m?.title).toBe('HTML 基础')
    expect(m?.number).toBe('01')
  })

  it('不存在的 slug 应返回 undefined', () => {
    expect(getModuleSummary('non-existent')).toBeUndefined()
  })
})

describe('getAdjacentModules', () => {
  it('第一个模块应无前驱', () => {
    const { prev, next } = getAdjacentModules('html-fundamentals')
    expect(prev).toBeUndefined()
    expect(next).toBeDefined()
    expect(next?.slug).toBe('css-fundamentals')
  })

  it('最后一个模块应无后继', () => {
    const { prev, next } = getAdjacentModules('interview-prep')
    expect(prev).toBeDefined()
    expect(prev?.slug).toBe('data-structure-algorithm')
    expect(next).toBeUndefined()
  })

  it('中间模块应有前后模块', () => {
    const { prev, next } = getAdjacentModules('javascript-core')
    expect(prev?.slug).toBe('css-fundamentals')
    expect(next?.slug).toBe('dom-bom-webapi')
  })
})

describe('stages', () => {
  it('应包含 8 个学习阶段', () => {
    expect(stages).toHaveLength(8)
  })

  it('阶段模块范围应覆盖 1-25', () => {
    const first = stages[0].moduleRange[0]
    const last = stages[stages.length - 1].moduleRange[1]
    expect(first).toBe(1)
    expect(last).toBe(25)
  })

  it('阶段范围应连续无重叠', () => {
    for (let i = 1; i < stages.length; i++) {
      expect(stages[i].moduleRange[0]).toBe(stages[i - 1].moduleRange[1] + 1)
    }
  })
})
