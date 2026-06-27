/**
 * 类型系统测试
 *
 * 验证 visualizationMeta 完整性和类型守卫正确性。
 */
import { describe, it, expect } from 'vitest'
import {
  visualizationMeta,
  isVisualizationBlock,
  isHeadingBlock,
  isCodeBlock,
  type VisualizationType,
  type ContentBlock,
} from '../lib/types'

describe('visualizationMeta', () => {
  it('应包含全部核心可视化组件的元数据', () => {
    const expectedTypes: VisualizationType[] = [
      'knowledgegraph',
      'flipcard',
      'skillbar',
      'sandbox',
      'drag',
      'timeline',
      'comparetable',
      'codestepper',
      'architecture',
      'quiz',
      'accordion',
      'dom-tree',
      'element-anatomy',
      'semantic-compare',
      'form-playground',
      'table-builder',
      'a11y-checklist',
      'path-parser',
      'api-card',
      'flexbox-playground',
      'box-model',
      'selector-playground',
      'animation-playground',
      'position-playground',
      'display-type',
      'responsive-viewport',
      'grid-playground',
      'datatype-explorer',
      'equality-comparator',
      'type-conversion',
      'scope-chain',
      'array-method',
      'event-propagation',
      'event-loop',
      'promise-flow',
      'class-inheritance',
      'regex-tester',
      'prototype-chain',
      'generator-flow',
      'todo-app',
      'dom-tree-visualizer',
      'event-flow-visualizer',
      'event-delegation',
      'location-parser',
      'history-router',
      'storage-playground',
      'geometry-calculator',
      'scroll-animation',
      'file-upload',
      'blob-download',
      'raf-animation',
      'tailwind-playground',
      'breakpoint-simulator',
      'sass-playground',
      'bootstrap-grid-demo',
      'responsive-nav-demo',
      'ts-type-checker',
      'type-transform-board',
      'generic-constraint-flow',
      'ts-config-playground',
      'api-typing-workbench',
      'migration-planner',
      'type-inference-timeline',
      'type-matrix-table',
      'vdom-diff-simulator',
      'jsx-live-preview',
      'data-fetch-state-machine',
      'rerender-tracker',
      'redux-cycle-simulator',
      'suspense-boundary-demo',
      'component-lib-decider',
      'decision-tree',
      'diff-highlight-board',
      'stack-queue-visualizer',
      'lru-cache-simulator',
      'linked-list-stepper',
      'binary-tree-walker',
      'sorting-race-arena',
      'bfs-path-finder',
      'handwriting-challenge',
      'fiber-work-loop-simulator',
      'memo-effect-comparator',
      'virtual-list-simulator',
      'hook-extraction-workshop',
      'transition-vs-sync-demo',
      'pattern-factory',
      'interview-quiz-engine',
      'concept-explain-viz',
      'flashcard-deck',
      'mock-interview-timer',
      'progress-dashboard',
      'system-design-board',
      'render-mode-comparator',
      'rsc-payload-flow',
      'server-action-sandbox',
      'middleware-flow-explorer',
      'framework-decision-wizard',
      'islands-arch-demo',
      'route-vs-action-decider',
      'vue-vs-react-comparator',
      'proxy-reactivity-tracker',
      'vue-component-sandbox',
      'define-emits-workshop',
      'pinia-store-explorer',
      'patch-flag-visualizer',
    ]
    expect(Object.keys(visualizationMeta).length).toBeGreaterThanOrEqual(expectedTypes.length)
    expectedTypes.forEach((type) => {
      expect(visualizationMeta[type]).toBeDefined()
      expect(visualizationMeta[type].type).toBe(type)
      expect(visualizationMeta[type].label).toBeTruthy()
      expect(visualizationMeta[type].identifier).toBe(type)
      expect(visualizationMeta[type].purpose).toBeTruthy()
    })
  })

  it('每个组件元数据的 label 应为中文', () => {
    Object.values(visualizationMeta).forEach((meta) => {
      // 中文标签应包含中文字符
      expect(/[\u4e00-\u9fa5]/.test(meta.label)).toBe(true)
    })
  })
})

describe('类型守卫', () => {
  const visualizationBlock: ContentBlock = {
    id: 'test',
    type: 'demo',
    visualizationType: 'quiz',
    data: { questions: [] },
  }

  const headingBlock: ContentBlock = {
    id: 'test',
    type: 'heading',
    level: 2,
    text: '标题',
  }

  const codeBlock: ContentBlock = {
    id: 'test',
    type: 'code',
    code: 'const x = 1',
    language: 'js',
  }

  const paragraphBlock: ContentBlock = {
    id: 'test',
    type: 'paragraph',
    text: '段落',
  }

  it('isVisualizationBlock 正确识别可视化组件块', () => {
    expect(isVisualizationBlock(visualizationBlock)).toBe(true)
    expect(isVisualizationBlock(headingBlock)).toBe(false)
    expect(isVisualizationBlock(paragraphBlock)).toBe(false)
  })

  it('isHeadingBlock 正确识别 heading 块', () => {
    expect(isHeadingBlock(headingBlock)).toBe(true)
    expect(isHeadingBlock(visualizationBlock)).toBe(false)
  })

  it('isCodeBlock 正确识别 code 块', () => {
    expect(isCodeBlock(codeBlock)).toBe(true)
    expect(isCodeBlock(headingBlock)).toBe(false)
  })
})
