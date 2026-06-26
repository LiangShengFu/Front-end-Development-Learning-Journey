/**
 * MockFlowVisualizer — Mock 三种范式可视化
 *
 * 展示 Vitest 三种 Mock 范式的替换 + 调用验证流程：
 * - vi.fn()：函数 Mock，替换函数并断言调用次数/参数
 * - vi.mock()：模块 Mock，替换整个模块的导出
 * - vi.useFakeTimers()：定时器 Mock，控制 setTimeout/setInterval 时间流转
 *
 * 交互：点击范式切换，展示 Mock 替换流程与调用验证链。
 *
 * ⚠️ 教学模拟：不实际执行 Mock 代码。
 */
import { useState } from 'react'
import type {
  MockFlowVisualizerData,
  MockParadigm,
} from '../../../lib/testing-visualization-types'
import { cn } from '../../../lib/utils'

interface MockFlowVisualizerProps {
  data?: MockFlowVisualizerData
}

/** 默认三种 Mock 范式数据 */
const DEFAULT_PARADIGMS: MockParadigm[] = [
  {
    id: 'function',
    name: '函数 Mock',
    api: 'vi.fn()',
    target: '单个函数（如回调、依赖函数）',
    codeSnippet: `// 1. 创建 Mock 函数
const mockCallback = vi.fn()

// 2. 传入被测函数
runWithCallback(data, mockCallback)

// 3. 断言调用次数与参数
expect(mockCallback).toHaveBeenCalledTimes(2)
expect(mockCallback).toHaveBeenCalledWith('expected-arg')`,
    assertion: 'toHaveBeenCalledWith / toHaveBeenCalledTimes',
    callVerification: 'mockCallback.mock.calls[0][0] === "expected-arg"',
    useCase: '验证回调是否被调用、调用次数、调用参数；模拟依赖函数的返回值。',
    pros: ['轻量级', '调用记录完整', '可自定义返回值'],
    cons: ['仅函数级，无法替换模块导出', '过度使用导致测试与实现耦合'],
    color: '#1a6cff',
  },
  {
    id: 'module',
    name: '模块 Mock',
    api: 'vi.mock()',
    target: '整个模块的导出（如 api、utils）',
    codeSnippet: `// 1. Mock 整个模块（提升到文件顶部）
vi.mock('@/api/user', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
}))

// 2. 导入被 Mock 的模块
import { fetchUser } from '@/api/user'

// 3. 测试中使用（实际不会发请求）
const user = await fetchUser(1)
expect(user.name).toBe('Alice')`,
    assertion: 'mockResolvedValue / mockRejectedValue',
    callVerification: 'fetchUser.mock.calls[0][0] === 1',
    useCase: '隔离外部依赖（API 请求、数据库访问、第三方库），让单元测试不依赖网络与环境。',
    pros: ['隔离外部依赖彻底', '可控制任意返回值', '适合单元测试'],
    cons: ['提升到顶部，时序有坑', '过度 Mock 让测试失去意义', '路径解析可能出错'],
    color: '#a78bfa',
  },
  {
    id: 'timer',
    name: '定时器 Mock',
    api: 'vi.useFakeTimers()',
    target: 'setTimeout / setInterval / Date.now / performance.now',
    codeSnippet: `// 1. 启用假定时器
beforeEach(() => {
  vi.useFakeTimers()
})

// 2. 触发被测代码
scheduleCallback(1000)

// 3. 快进时间触发回调
vi.advanceTimersByTime(1000)

// 4. 断言回调已执行
expect(callback).toHaveBeenCalled()

// 5. 恢复真实定时器
afterEach(() => {
  vi.useRealTimers()
})`,
    assertion: 'advanceTimersByTime / runAllTimers',
    callVerification: 'callback.mock.calls.length === 1',
    useCase: '测试定时任务、防抖节流、过期检测、动画延时，无需真实等待时间。',
    pros: ['测试速度快（无需真实等待）', '可控制时间快进', '避免 flaky 测试'],
    cons: ['需手动恢复真实定时器', '与真实时间相关的边界可能漏测', '异步边界处理复杂'],
    color: '#f59e0b',
  },
]

export function MockFlowVisualizer({ data }: MockFlowVisualizerProps) {
  const paradigms = data?.paradigms ?? DEFAULT_PARADIGMS
  const coreIdeaNote =
    data?.coreIdeaNote ??
    'Mock 的核心思想：用可控的"假实现"替换"真依赖"，让被测代码在隔离环境下运行，并通过 mock.calls 断言调用情况。'
  const [selectedId, setSelectedId] = useState<MockParadigm['id']>('function')
  // 安全回退：若 selectedId 与数据不匹配（如外部 data 切换），回退到第一个范式，避免渲染崩溃
  const selected = paradigms.find((p) => p.id === selectedId) ?? paradigms[0]

  return (
    <div className="space-y-lg">
      {/* 核心思想 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {coreIdeaNote}
      </p>

      {/* 范式切换 Tab */}
      <div className="flex flex-wrap gap-xs">
        {paradigms.map((p) => {
          const isActive = p.id === selectedId
          return (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              aria-pressed={isActive}
              style={isActive ? { backgroundColor: p.color, borderColor: p.color } : undefined}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'text-white'
                  : 'border-hairline bg-canvas text-body hover:border-ink/30',
              )}
            >
              <span className="font-semibold">{p.api}</span>
              <span className={cn('ml-xs', isActive ? 'text-white/80' : 'text-body')}>
                · {p.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* 选中范式详情 */}
      <div className="grid gap-md md:grid-cols-2">
        {/* 左侧：替换目标与流程 */}
        <div
          className="rounded-md border-l-4 p-md"
          style={{ borderLeftColor: selected.color }}
        >
          <h4 className="mb-sm text-heading-4 text-ink">{selected.name}</h4>
          <div className="space-y-sm text-body-sm">
            <div>
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                Mock API
              </span>
              <code
                className="ml-xs rounded-sm bg-canvas-soft px-xs py-xxs font-mono text-caption-mono-sm text-ink"
              >
                {selected.api}
              </code>
            </div>
            <div>
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                替换目标
              </span>
              <p className="text-ink">{selected.target}</p>
            </div>
            <div>
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                适用场景
              </span>
              <p className="text-ink">{selected.useCase}</p>
            </div>
          </div>
        </div>

        {/* 右侧：调用验证链 */}
        <div
          className="rounded-md border-l-4 p-md"
          style={{ borderLeftColor: selected.color, backgroundColor: `${selected.color}08` }}
        >
          <h4 className="mb-sm text-heading-4 text-ink">调用验证链</h4>
          <div className="space-y-sm text-body-sm">
            <div>
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                断言 API
              </span>
              <code className="ml-xs rounded-sm bg-canvas-soft px-xs py-xxs font-mono text-caption-mono-sm text-ink">
                {selected.assertion}
              </code>
            </div>
            <div>
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                调用记录访问
              </span>
              <pre className="mt-xs overflow-x-auto rounded-sm bg-canvas-soft px-sm py-xs font-mono text-caption-mono-sm text-ink">
                {selected.callVerification}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div>
        <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
          代码示例
        </div>
        <pre className="mt-xs overflow-x-auto rounded-sm bg-ink-soft px-md py-md font-mono text-caption-mono-sm text-canvas">
          {selected.codeSnippet}
        </pre>
      </div>

      {/* 优缺点 */}
      <div className="grid gap-md md:grid-cols-2">
        <div className="rounded-sm border border-hairline p-md">
          <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-accent-sunset">
            优点
          </div>
          <ul className="space-y-xs text-body-sm text-ink">
            {selected.pros.map((pro) => (
              <li key={pro} className="flex gap-xs">
                <span className="text-accent-sunset">+</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-sm border border-hairline p-md">
          <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-accent-rose">
            缺点
          </div>
          <ul className="space-y-xs text-body-sm text-ink">
            {selected.cons.map((con) => (
              <li key={con} className="flex gap-xs">
                <span className="text-accent-rose">-</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模拟 · 不实际执行 Mock 代码
      </p>
    </div>
  )
}
