/**
 * 算法可视化组件 Smoke Test
 *
 * 验证每个可视化组件用默认/典型数据渲染时不抛错、不出现 undefined.children 等运行时崩溃。
 * 覆盖用户历史上撞过的 bug 模式：浅拷贝共享引用、未声明变量、step 切换越界。
 *
 * 重点：BacktrackingTreeVisualizer 和 DynamicProgrammingVisualizer 两次撞过崩溃，
 * 除了默认渲染外，额外测试 step 切换（prev/next/autoPlay）。
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import type { VisualizationBlock } from '../lib/types'

import { HeapVisualizer } from '../components/interactive/algorithm/HeapVisualizer'
import { TrieVisualizer } from '../components/interactive/algorithm/TrieVisualizer'
import { UnionFindVisualizer } from '../components/interactive/algorithm/UnionFindVisualizer'
import { DivideConquerTreeVisualizer } from '../components/interactive/algorithm/DivideConquerTreeVisualizer'
import { StringAlgorithmVisualizer } from '../components/interactive/algorithm/StringAlgorithmVisualizer'
import { HashTableVisualizer } from '../components/interactive/algorithm/HashTableVisualizer'
import { BinarySearchVisualizer } from '../components/interactive/algorithm/BinarySearchVisualizer'
import { SlidingWindowVisualizer } from '../components/interactive/algorithm/SlidingWindowVisualizer'
import { BacktrackingTreeVisualizer } from '../components/interactive/algorithm/BacktrackingTreeVisualizer'
import { DynamicProgrammingVisualizer } from '../components/interactive/algorithm/DynamicProgrammingVisualizer'

/**
 * 辅助：渲染组件并断言不抛错。
 * 用 try/catch 包裹，确保即使组件内部 console.error 也不影响断言。
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function expectRenderNoThrow(Component: React.ComponentType<any>, data: any) {
  let renderResult: ReturnType<typeof render> | null = null
  expect(() => {
    renderResult = render(<Component data={data} />)
  }).not.toThrow()
  expect(renderResult).not.toBeNull()
  return renderResult!
}

describe('算法可视化组件 Smoke Test', () => {
  describe('默认渲染不抛错', () => {
    it('HeapVisualizer 默认堆渲染', () => {
      expectRenderNoThrow(HeapVisualizer, undefined)
    })

    it('TrieVisualizer 默认单词列表渲染', () => {
      expectRenderNoThrow(TrieVisualizer, undefined)
    })

    it('UnionFindVisualizer 默认节点数渲染', () => {
      expectRenderNoThrow(UnionFindVisualizer, undefined)
    })

    it('DivideConquerTreeVisualizer 归并排序示例', () => {
      expectRenderNoThrow(DivideConquerTreeVisualizer, {
        example: 'merge-sort',
        inputArray: [3, 1, 4, 1, 5, 9, 2, 6],
      })
    })

    it('StringAlgorithmVisualizer reverse 模式', () => {
      expectRenderNoThrow(StringAlgorithmVisualizer, {
        mode: 'reverse',
        text: 'hello world',
      })
    })

    it('HashTableVisualizer 链地址法', () => {
      expectRenderNoThrow(HashTableVisualizer, {
        bucketCount: 7,
        strategy: 'chaining',
      })
    })

    it('BinarySearchVisualizer classic 模式', () => {
      expectRenderNoThrow(BinarySearchVisualizer, {
        variant: 'classic',
        array: [1, 3, 5, 7, 9, 11, 13, 15],
        target: 7,
      })
    })

    it('SlidingWindowVisualizer 定长最大和', () => {
      expectRenderNoThrow(SlidingWindowVisualizer, {
        problem: 'fixed-max-sum',
        array: [1, 4, 2, 10, 23, 3, 1, 0, 6],
        k: 4,
      })
    })

    it('BacktrackingTreeVisualizer 全排列', () => {
      // 用户历史 bug：layoutNodes 访问 undefined.children
      expectRenderNoThrow(BacktrackingTreeVisualizer, {
        problem: 'permutations',
        n: 3,
      })
    })

    it('DynamicProgrammingVisualizer LCS 模式', () => {
      // 用户历史 bug：steps is not defined
      expectRenderNoThrow(DynamicProgrammingVisualizer, {
        problem: 'lcs',
        text1: 'abcde',
        text2: 'ace',
      })
    })

    it('DynamicProgrammingVisualizer climbing-stairs 模式', () => {
      expectRenderNoThrow(DynamicProgrammingVisualizer, {
        problem: 'climbing-stairs',
        n: 5,
      })
    })

    it('DynamicProgrammingVisualizer knapsack01 模式', () => {
      expectRenderNoThrow(DynamicProgrammingVisualizer, {
        problem: 'knapsack01',
        capacity: 10,
        weights: [2, 3, 4, 5],
        values: [3, 4, 5, 6],
      })
    })
  })

  describe('Step 切换不抛错（针对历史崩溃点）', () => {
    // 自动播放定时器需要 mock
    beforeEach(() => {
      vi.useFakeTimers()
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it('BacktrackingTreeVisualizer：点击下一步/上一步不抛错', () => {
      const { container } = render(
        <BacktrackingTreeVisualizer data={{ problem: 'permutations', n: 3 }} />,
      )
      expect(container).toBeTruthy()

      // 查找下一步按钮（通常含"下一步"或"›"文案）
      const nextButtons = screen.queryAllByRole('button', { name: /下一步|next|›|→/i })
      const prevButtons = screen.queryAllByRole('button', { name: /上一步|prev|‹|←/i })

      // 至少应能找到控制按钮
      const allButtons = container.querySelectorAll('button')
      expect(allButtons.length).toBeGreaterThan(0)

      // 尝试点击下一步若干次，再点上一步，不应抛错
      if (nextButtons.length > 0) {
        for (let i = 0; i < 5; i++) {
          expect(() => fireEvent.click(nextButtons[0])).not.toThrow()
        }
      }
      if (prevButtons.length > 0) {
        for (let i = 0; i < 3; i++) {
          expect(() => fireEvent.click(prevButtons[0])).not.toThrow()
        }
      }
    })

    it('DynamicProgrammingVisualizer：点击下一步/上一步不抛错', () => {
      const { container } = render(
        <DynamicProgrammingVisualizer
          data={{ problem: 'lcs', text1: 'abcde', text2: 'ace' }}
        />,
      )
      expect(container).toBeTruthy()

      const allButtons = container.querySelectorAll('button')
      expect(allButtons.length).toBeGreaterThan(0)

      const nextButtons = screen.queryAllByRole('button', { name: /下一步|next|›|→/i })
      const prevButtons = screen.queryAllByRole('button', { name: /上一步|prev|‹|←/i })

      if (nextButtons.length > 0) {
        for (let i = 0; i < 10; i++) {
          expect(() => fireEvent.click(nextButtons[0])).not.toThrow()
        }
      }
      if (prevButtons.length > 0) {
        for (let i = 0; i < 5; i++) {
          expect(() => fireEvent.click(prevButtons[0])).not.toThrow()
        }
      }
    })

    it('BacktrackingTreeVisualizer：自动播放推进不抛错', () => {
      const { container } = render(
        <BacktrackingTreeVisualizer data={{ problem: 'n-queens', n: 4 }} />,
      )
      expect(container).toBeTruthy()

      // 查找自动播放按钮并触发
      const autoButtons = screen.queryAllByRole('button', { name: /自动|播放|auto|play/i })
      if (autoButtons.length > 0) {
        fireEvent.click(autoButtons[0])
        // 推进定时器若干次
        expect(() => {
          act(() => {
            vi.advanceTimersByTime(2000)
          })
        }).not.toThrow()
      }
    })
  })

  describe('可视化块类型与数据契约一致性', () => {
    // 验证 VisualizationBlock 的 visualizationType 与 data 字段在模块数据中匹配
    // 这类问题之前导致运行时崩溃（如 mode: 'reverse' 未被 StringAlgorithmMode 联合包含）
    it('StringAlgorithmVisualizer 所有 mode 均可渲染', () => {
      const modes = ['reverse', 'palindrome', 'longest-palindrome', 'kmp'] as const
      modes.forEach((mode) => {
        expect(() => render(<StringAlgorithmVisualizer data={{ mode, text: 'abcba' }} />)).not.toThrow()
      })
    })

    it('BinarySearchVisualizer 所有 variant 均可渲染', () => {
      const variants = ['classic', 'lower-bound', 'upper-bound', 'rotated'] as const
      variants.forEach((variant) => {
        expect(() =>
          render(
            <BinarySearchVisualizer
              data={{ variant, array: [1, 3, 5, 7, 9], target: 5 }}
            />,
          ),
        ).not.toThrow()
      })
    })

    it('BacktrackingTreeVisualizer 所有 problem 均可渲染', () => {
      const problems = [
        { problem: 'permutations', n: 3 },
        { problem: 'n-queens', n: 4 },
        { problem: 'subsets', n: 4 },
      ] as const
      problems.forEach((data) => {
        expect(() => render(<BacktrackingTreeVisualizer data={data} />)).not.toThrow()
      })
    })
  })
})

// 占位 import 避免 TS 报未使用
export type { VisualizationBlock }
