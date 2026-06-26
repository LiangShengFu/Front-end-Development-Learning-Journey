/**
 * DiffHighlightBoard — 差异高亮对比面板
 *
 * 左右两栏对比展示「正确」与「错误」做法，高亮差异点。
 * 用于 Hooks 规则、React 性能优化、受控/非受控组件等教学场景。
 *
 * 对应docx中演示 #9
 */
import type { DiffHighlightBoardData } from '../../../lib/react-visualization-types'
import { cn } from '../../../lib/utils'

interface DiffHighlightBoardProps {
  data?: DiffHighlightBoardData
}

const DEFAULT_PAIRS = [
  {
    label: 'Hook 调用位置',
    left: `function Counter() {
  const [count, setCount] = useState(0)
  // ✅ 在组件顶层调用
  if (count > 5) {
    useEffect(() => {}, [count])
  }
}`,
    right: `function Counter() {
  const [count, setCount] = useState(0)
  // ❌ 在条件语句中调用 Hook！
  if (count > 5) {
    useEffect(() => {}, [count])
  }
}`,
    highlight: 'Hook 必须在组件顶层调用，不能在条件/循环中',
  },
  {
    label: 'useEffect 依赖',
    left: `useEffect(() => {
  fetchUser(userId)
}, [userId])
// ✅ 依赖数组正确`,
    right: `useEffect(() => {
  fetchUser(userId)
}, [])
// ❌ 缺少 userId 依赖！
// eslint: react-hooks/exhaustive-deps`,
    highlight: 'useEffect 必须包含所有响应式依赖',
  },
  {
    label: '状态不可变更新',
    left: `setUser(prev => ({
  ...prev,
  name: 'Alice'
}))
// ✅ 展开运算符创建新对象`,
    right: `user.name = 'Alice'
setUser(user)
// ❌ 直接修改原对象！
// React 不会检测到变化`,
    highlight: '状态更新必须返回新对象，不能直接修改',
  },
  {
    label: 'key 属性使用',
    left: `{items.map(item =>
  <Item key={item.id} data={item} />
)}
// ✅ 使用稳定的唯一标识`,
    right: `{items.map((item, idx) =>
  <Item key={idx} data={item} />
)}
// ❌ 使用索引作为 key！
// 列表重排序时会导致 bug`,
    highlight: 'key 应使用稳定的唯一标识，不要用数组索引',
  },
]

export function DiffHighlightBoard({ data }: DiffHighlightBoardProps) {
  const leftTitle = data?.leftTitle ?? '✅ 正确做法'
  const rightTitle = data?.rightTitle ?? '❌ 错误做法'
  const pairs = data?.pairs ?? DEFAULT_PAIRS

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr] rounded-t-sm border border-b-0 border-hairline bg-canvas-soft">
        <div className="px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {leftTitle}
        </div>
        <div className="border-l border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-red-500">
          {rightTitle}
        </div>
      </div>

      {/* Pairs */}
      {pairs.map((pair, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr] border border-t-0 border-hairline last:rounded-b-sm">
          <div className={cn(
            'overflow-x-auto p-lg',
            i % 2 === 0 ? 'bg-canvas-card' : 'bg-canvas-soft',
          )}>
            <div className="mb-sm font-mono text-caption-mono-sm text-body-mid">{pair.label}</div>
            <pre className="font-mono text-caption-mono-sm text-ink leading-relaxed whitespace-pre-wrap">
              {pair.left}
            </pre>
          </div>
          <div className={cn(
            'overflow-x-auto border-l border-hairline p-lg',
            i % 2 === 0 ? 'bg-canvas-card' : 'bg-canvas-soft',
          )}>
            <div className="mb-sm font-mono text-caption-mono-sm text-body-mid">{pair.label}</div>
            <pre className="font-mono text-caption-mono-sm text-ink leading-relaxed whitespace-pre-wrap">
              {pair.right}
            </pre>
          </div>
          {/* Highlight row */}
          {pair.highlight && (
            <div className="col-span-2 border-t border-red-500/20 bg-red-500/5 px-lg py-md">
              <span className="font-mono text-caption-mono-sm text-red-500">⚠ {pair.highlight}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
