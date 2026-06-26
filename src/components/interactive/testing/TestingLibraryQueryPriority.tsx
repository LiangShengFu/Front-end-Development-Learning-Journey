/**
 * TestingLibraryQueryPriority — Testing Library 查询优先级阶梯
 *
 * 展示 Testing Library 推荐的查询方法优先级：
 * getByRole > getByLabelText > getByText > getByDisplayValue
 *           > getByAltText > getByTitle > getByTestId
 *
 * 原则：优先用"用户视角"的查询（Role/Text），最后才用 TestId。
 * 因为用户使用屏幕阅读器看角色、看文本，看不到 TestId。
 *
 * 交互：点击查询方法展示示例/描述/适用场景，推荐方法高亮。
 *
 * ⚠️ 教学模型：实际项目可根据场景灵活调整。
 */
import { useState } from 'react'
import type {
  TestingLibraryQueryPriorityData,
  QueryMethod,
} from '../../../lib/testing-visualization-types'
import { cn } from '../../../lib/utils'

interface TestingLibraryQueryPriorityProps {
  data?: TestingLibraryQueryPriorityData
}

/** 默认 7 种查询方法数据（按优先级从高到低） */
const DEFAULT_QUERIES: QueryMethod[] = [
  {
    id: 'getByRole',
    name: 'getByRole',
    priority: 1,
    recommended: true,
    example: `screen.getByRole('button', { name: /提交/i })`,
    description: '通过 ARIA 角色查询元素。最佳实践，因为它反映了用户和辅助技术如何感知页面。',
    useCase: '按钮、链接、表单控件、对话框等带语义角色的元素。',
    color: '#07c160',
  },
  {
    id: 'getByLabelText',
    name: 'getByLabelText',
    priority: 2,
    recommended: true,
    example: `screen.getByLabelText('用户名')`,
    description: '通过关联的 label 文本查询表单控件。表单元素的最佳查询方式。',
    useCase: 'input、select、textarea 等带 label 关联的表单元素。',
    color: '#07c160',
  },
  {
    id: 'getByText',
    name: 'getByText',
    priority: 3,
    recommended: true,
    example: `screen.getByText('登录')`,
    description: '通过可见文本查询元素。适合查找链接、按钮、段落等非交互元素的文本。',
    useCase: '链接、段落、span 等展示型元素的文本查询。',
    color: '#07c160',
  },
  {
    id: 'getByDisplayValue',
    name: 'getByDisplayValue',
    priority: 4,
    recommended: false,
    example: `screen.getByDisplayValue('alice@example.com')`,
    description: '通过表单元素的当前值查询。适合查找已填充的 input/select。',
    useCase: '已填充值的 input、textarea、select 等表单元素。',
    color: '#f59e0b',
  },
  {
    id: 'getByAltText',
    name: 'getByAltText',
    priority: 5,
    recommended: false,
    example: `screen.getByAltText('登录logo')`,
    description: '通过 alt 文本查询图片、area、input[type=image]。',
    useCase: 'img、area、input[type=image] 等带 alt 属性的元素。',
    color: '#f59e0b',
  },
  {
    id: 'getByTitle',
    name: 'getByTitle',
    priority: 6,
    recommended: false,
    example: `screen.getByTitle('关闭对话框')`,
    description: '通过 title 属性查询元素。title 通常用作悬浮提示，可见性较差。',
    useCase: '带 title 属性的元素，svg 元素的 title 子元素。',
    color: '#f59e0b',
  },
  {
    id: 'getByTestId',
    name: 'getByTestId',
    priority: 7,
    recommended: false,
    example: `screen.getByTestId('user-avatar')`,
    description: '通过 data-testid 属性查询。最后手段，仅当其他方式都无法定位时使用。',
    useCase: '动态内容、无明显语义的元素、其他查询方式失效的场景。',
    color: '#ec4899',
  },
]

export function TestingLibraryQueryPriority({ data }: TestingLibraryQueryPriorityProps) {
  const queries = data?.queries ?? DEFAULT_QUERIES
  const principleNote =
    data?.principleNote ??
    '优先用"用户视角"查询（Role/LabelText/Text），最后才用 TestId——因为用户通过角色、文本感知页面，看不到 TestId。'
  const [selectedId, setSelectedId] = useState<string>('getByRole')
  // 安全回退：若 selectedId 与数据不匹配（如外部 data 切换），回退到第一个查询方法，避免渲染崩溃
  const selected = queries.find((q) => q.id === selectedId) ?? queries[0]

  return (
    <div className="space-y-lg">
      {/* 原则说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {principleNote}
      </p>

      {/* 优先级阶梯（从高到低） */}
      <div className="space-y-xs">
        {queries.map((q) => {
          const isActive = q.id === selectedId
          return (
            <button
              key={q.id}
              onClick={() => setSelectedId(q.id)}
              aria-pressed={isActive}
              style={isActive ? { backgroundColor: q.color, borderColor: q.color } : undefined}
              className={cn(
                'flex w-full items-center gap-md rounded-sm border px-md py-sm text-left transition-all',
                isActive
                  ? 'text-white'
                  : 'border-hairline bg-canvas text-ink hover:border-ink/30',
              )}
            >
              {/* 优先级编号 */}
              <span
                className={cn(
                  'flex h-lg w-lg shrink-0 items-center justify-center rounded-full font-mono text-caption-mono-sm font-semibold',
                  isActive ? 'bg-white/20 text-white' : 'bg-canvas-soft text-body',
                )}
              >
                {q.priority}
              </span>
              {/* 方法名 */}
              <code
                className={cn(
                  'font-mono text-body-sm font-semibold',
                  isActive ? 'text-white' : 'text-ink',
                )}
              >
                {q.name}
              </code>
              {/* 推荐徽章 */}
              {q.recommended && (
                <span
                  className={cn(
                    'rounded-sm px-xs py-xxs font-mono text-caption-mono-xs',
                    isActive ? 'bg-white/20 text-white' : 'bg-accent-sunset/10 text-accent-sunset',
                  )}
                >
                  推荐
                </span>
              )}
              {!q.recommended && q.priority <= 6 && (
                <span
                  className={cn(
                    'rounded-sm px-xs py-xxs font-mono text-caption-mono-xs',
                    isActive ? 'bg-white/20 text-white' : 'bg-accent-sunset/5 text-accent-sunset/80',
                  )}
                >
                  备选
                </span>
              )}
              {!q.recommended && q.priority === 7 && (
                <span
                  className={cn(
                    'rounded-sm px-xs py-xxs font-mono text-caption-mono-xs',
                    isActive ? 'bg-white/20 text-white' : 'bg-accent-rose/10 text-accent-rose',
                  )}
                >
                  最后手段
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 选中方法详情 */}
      <div
        className="rounded-md border-l-4 p-md"
        style={{ borderLeftColor: selected.color, backgroundColor: `${selected.color}08` }}
      >
        <div className="mb-sm flex items-center gap-sm">
          <h4 className="text-heading-4 text-ink">{selected.name}</h4>
          <span className="font-mono text-caption-mono-xs text-body">
            优先级 #{selected.priority}
          </span>
        </div>
        <p className="mb-md text-body-sm text-ink">{selected.description}</p>

        {/* 代码示例 */}
        <div className="mb-md">
          <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
            代码示例
          </div>
          <pre className="mt-xs overflow-x-auto rounded-sm bg-canvas-soft px-md py-sm font-mono text-caption-mono-sm text-ink">
            {selected.example}
          </pre>
        </div>

        {/* 适用场景 */}
        <div>
          <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
            适用场景
          </div>
          <p className="text-body-sm text-ink">{selected.useCase}</p>
        </div>
      </div>

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模型 · 实际项目可根据场景灵活调整
      </p>
    </div>
  )
}
