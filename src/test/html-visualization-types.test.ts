/**
 * HTML 可视化组件类型系统测试
 */
import { describe, it, expect } from 'vitest'
import { htmlVisualizationMeta } from '../lib/html-visualization-types'
import type { HtmlVisualizationType } from '../lib/html-visualization-types'

describe('htmlVisualizationMeta', () => {
  it('应包含全部 8 种 HTML 可视化组件的元数据', () => {
    const expectedTypes: HtmlVisualizationType[] = [
      'dom-tree',
      'element-anatomy',
      'semantic-compare',
      'form-playground',
      'table-builder',
      'a11y-checklist',
      'path-parser',
      'api-card',
    ]
    expect(Object.keys(htmlVisualizationMeta)).toHaveLength(expectedTypes.length)
    expectedTypes.forEach((type) => {
      expect(htmlVisualizationMeta[type]).toBeDefined()
      expect(htmlVisualizationMeta[type].type).toBe(type)
      expect(htmlVisualizationMeta[type].label).toBeTruthy()
      expect(htmlVisualizationMeta[type].identifier).toBe(type)
      expect(htmlVisualizationMeta[type].purpose).toBeTruthy()
    })
  })

  it('每个组件元数据的 label 应为中文', () => {
    Object.values(htmlVisualizationMeta).forEach((meta) => {
      expect(/[\u4e00-\u9fa5]/.test(meta.label)).toBe(true)
    })
  })
})
