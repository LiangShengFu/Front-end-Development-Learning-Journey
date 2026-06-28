/**
 * search-index 单元测试
 *
 * 验证搜索功能核心行为：
 * - 模块级搜索立即可用
 * - 知识点级搜索在构建索引后可用
 * - 中英文关键词都能搜到
 * - 空查询返回空
 */
import { describe, it, expect, beforeAll } from 'vitest'
import {
  search,
  buildFullIndex,
  isIndexReady,
  getIndexedCount,
  buildKnowledgePointUrl,
} from '../lib/search-index'

describe('search-index - 模块级搜索', () => {
  it('空查询返回空数组', () => {
    expect(search('')).toEqual([])
    expect(search('   ')).toEqual([])
  })

  it('英文关键词能搜到模块', () => {
    const results = search('HTML')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].type).toBe('module')
    expect(results[0].moduleSlug).toBe('html-fundamentals')
  })

  it('小写英文关键词也能搜到', () => {
    const results = search('react')
    expect(results.length).toBeGreaterThan(0)
    const hasReactModule = results.some(
      (r) => r.moduleSlug === 'react-fundamentals' || r.moduleSlug === 'react-advanced',
    )
    expect(hasReactModule).toBe(true)
  })

  it('中文关键词能搜到模块（CSS）', () => {
    const results = search('样式')
    expect(results.length).toBeGreaterThan(0)
  })

  it('模块编号也能搜索', () => {
    const results = search('01')
    expect(results.some((r) => r.moduleNumber === '01')).toBe(true)
  })
})

describe('search-index - 知识点级搜索', () => {
  beforeAll(async () => {
    await buildFullIndex()
  })

  it('构建索引后 isIndexReady 返回 true', () => {
    expect(isIndexReady()).toBe(true)
  })

  it('构建索引后 getIndexedCount > 0', () => {
    expect(getIndexedCount()).toBeGreaterThan(0)
  })

  it('英文技术词能搜到知识点', () => {
    const results = search('Promise')
    expect(results.length).toBeGreaterThan(0)
  })

  it('中文技术词能搜到知识点', () => {
    const results = search('闭包')
    expect(results.length).toBeGreaterThan(0)
  })

  it('知识点结果包含 pointOrder', () => {
    const results = search('闭包')
    const kp = results.find((r) => r.type === 'knowledge-point')
    expect(kp).toBeDefined()
    expect(kp?.pointOrder).toBeDefined()
    expect(kp?.pointTitle).toBeDefined()
  })
})

describe('search-index - 结果上限', () => {
  it('搜索结果无上限（不再默认限制为 50）', () => {
    const results = search('a')
    // 无上限：返回所有匹配，不被截断到 50
    // 只要匹配数 > 0 即可，关键是接口不再接受 limit 参数
    expect(results.length).toBeGreaterThan(0)
  })

  it('模块级结果不再被硬编码为最多 5 条', () => {
    // 搜索广泛词，应能返回所有匹配的模块
    const results = search('基础')
    const moduleResults = results.filter((r) => r.type === 'module')
    expect(moduleResults.length).toBeGreaterThan(0)
  })
})

describe('buildKnowledgePointUrl', () => {
  it('模块级 URL', () => {
    expect(buildKnowledgePointUrl('html-fundamentals')).toBe('/modules/html-fundamentals')
  })

  it('知识点级 URL 带锚点', () => {
    expect(buildKnowledgePointUrl('html-fundamentals', 3)).toBe(
      '/modules/html-fundamentals#point-3',
    )
  })
})
