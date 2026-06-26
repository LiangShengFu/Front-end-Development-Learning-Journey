/**
 * DesignPatternShowcase — 组件设计模式展示
 *
 * 展示 5 种前端组件设计模式的核心思想与代码对比：
 * - Container/Presentational：容器与展示组件分离
 * - HOC：高阶组件
 * - Render Props：渲染属性
 * - Custom Hooks：自定义 Hook
 * - Compound Components：复合组件
 *
 * 交互：点击模式切换，左侧展示模式说明与适用场景，右侧展示代码示例。
 * 每种模式附带优缺点对比，便于选型决策。
 *
 * ⚠️ 教学展示：代码为模式示意，仅展示核心结构。
 */
import { useState } from 'react'
import type {
  DesignPatternShowcaseData,
  DesignPattern,
  DesignPatternId,
} from '../../../lib/visualization-architecture-visualization-types'
import { cn } from '../../../lib/utils'

interface DesignPatternShowcaseProps {
  data?: DesignPatternShowcaseData
}

/** 默认设计模式数据 */
const DEFAULT_PATTERNS: DesignPattern[] = [
  {
    id: 'container-presentational',
    name: 'Container / Presentational',
    shortName: '容器/展示',
    philosophy: '关注点分离：容器负责数据获取与状态，展示组件负责纯渲染。',
    useCase: '数据驱动的页面（列表页、详情页），逻辑与 UI 解耦便于复用。',
    pros: ['展示组件可复用', '逻辑集中在容器，易测试', '职责清晰'],
    cons: ['组件数量翻倍', 'Hooks 时代后逐渐被 Custom Hooks 取代'],
    codeSnippet: `// 📦 容器组件：负责数据
function UserListContainer() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers)
  }, [])
  return <UserList users={users} />
}

// 🎨 展示组件：纯渲染（无副作用）
function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}`,
    color: '#1a6cff',
  },
  {
    id: 'hoc',
    name: 'Higher-Order Component',
    shortName: 'HOC',
    philosophy: '函数接收组件返回新组件，用于横切关注点（鉴权、埋点、数据注入）。',
    useCase: '鉴权守卫、埋点上报、数据预取等跨组件通用逻辑。',
    pros: ['逻辑复用', '不影响原组件', '可组合（withAuth(withTracking(Comp))）'],
    cons: ['嵌套地狱（Wrapper Hell）', 'Props 透传冲突', '类型推导复杂', 'Hooks 时代后不推荐'],
    codeSnippet: `// 🔧 HOC：接收组件返回新组件
function withAuth<P>(Wrapped: ComponentType<P>) {
  return function AuthWrapped(props: P) {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" />
    return <Wrapped {...props} user={user} />
  }
}

// 🎯 使用：包裹目标组件
const ProtectedPage = withAuth(Dashboard)

// ⚠️ 问题：多层 HOC 嵌套导致调试困难
// withAuth(withTracking(withTheme(Dashboard)))`,
    color: '#07c160',
  },
  {
    id: 'render-props',
    name: 'Render Props',
    shortName: 'Render Props',
    philosophy: '通过 prop 传递渲染函数，组件内部调用该函数实现逻辑复用。',
    useCase: '共享状态逻辑（如鼠标位置、动画状态），动态决定渲染内容。',
    pros: ['逻辑复用', '渲染内容灵活', '不增加组件树深度'],
    cons: ['回调地狱（多层 Render Props）', '性能优化复杂（shouldComponentUpdate）', 'Hooks 时代后少用'],
    codeSnippet: `// 🔧 Render Props 组件：暴露状态
class Mouse extends React.Component {
  state = { x: 0, y: 0 }
  handleMove = (e) =>
    this.setState({ x: e.clientX, y: e.clientY })
  render() {
    return (
      <div onMouseMove={this.handleMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

// 🎯 使用：通过 render prop 注入渲染
<Mouse render={({ x, y }) => (
  <h1>鼠标位置: ({x}, {y})</h1>
)} />`,
    color: '#f59e0b',
  },
  {
    id: 'custom-hooks',
    name: 'Custom Hooks',
    shortName: 'Custom Hooks',
    philosophy: '以 use 开头的函数，封装状态与副作用，可在组件间复用。',
    useCase: '数据获取、表单处理、订阅、定时器等可复用逻辑（现代 React 首选）。',
    pros: ['无嵌套地狱', '类型推导友好', '组合自然', 'Hooks 时代官方推荐'],
    cons: ['需遵守 Hooks 规则（顶层调用、不能条件分支）', '需理解依赖数组'],
    codeSnippet: `// 🔧 自定义 Hook：封装数据获取
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(url)
      .then(r => r.json())
      .then(d => !cancelled && setData(d))
      .catch(setError)
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

// 🎯 使用：在任意组件调用
function UserList() {
  const { data, loading } = useFetch<User[]>('/api/users')
  if (loading) return <Spinner />
  return <ul>{data?.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}`,
    color: '#a78bfa',
  },
  {
    id: 'compound-components',
    name: 'Compound Components',
    shortName: '复合组件',
    philosophy: '多个子组件协作共享隐式状态，通过 Context 通信，API 表达力强。',
    useCase: 'UI 库组件（Tabs、Select、Accordion、Menu），声明式组合 API。',
    pros: ['API 表达力强', '子组件灵活组合', '内部状态隐式共享', '扩展性好'],
    cons: ['实现复杂（需 Context 协调）', '子组件需配对使用', '约束相对松散'],
    codeSnippet: `// 🔧 复合组件：通过 Context 共享状态
const TabsContext = createContext<TabsCtx>(null!)

function Tabs({ children, defaultIndex }: TabsProps) {
  const [active, setActive] = useState(defaultIndex ?? 0)
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  )
}

// 子组件消费共享状态
function TabList({ children }) {
  return <div className="flex">{children}</div>
}
function Tab({ index, children }) {
  const { active, setActive } = useContext(TabsContext)
  const isActive = active === index
  return (
    <button onClick={() => setActive(index)}
      className={isActive ? 'active' : ''}>
      {children}
    </button>
  )
}
function TabPanel({ index, children }) {
  const { active } = useContext(TabsContext)
  return active === index ? <div>{children}</div> : null
}

// 🎯 使用：声明式组合，表达力强
<Tabs defaultIndex={0}>
  <TabList>
    <Tab index={0}>详情</Tab>
    <Tab index={1}>评论</Tab>
  </TabList>
  <TabPanel index={0}>详情内容</TabPanel>
  <TabPanel index={1}>评论内容</TabPanel>
</Tabs>`,
    color: '#ec4899',
  },
]

export function DesignPatternShowcase({ data }: DesignPatternShowcaseProps) {
  const patterns = data?.patterns ?? DEFAULT_PATTERNS
  const architectureNote =
    data?.architectureNote ??
    '设计模式演进：HOC → Render Props → Custom Hooks，本质都是「逻辑复用」。Hooks 是 React 官方推荐方案，Compound Components 则用于复杂 UI 库组件的声明式 API。'

  const [selectedId, setSelectedId] = useState<DesignPatternId>('custom-hooks')
  const selected = patterns.find((p) => p.id === selectedId)

  return (
    <div className="space-y-lg">
      {/* 架构说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {architectureNote}
      </p>

      {/* 模式切换按钮 */}
      <div className="flex flex-wrap gap-xs">
        {patterns.map((pattern) => {
          const isActive = selectedId === pattern.id
          return (
            <button
              key={pattern.id}
              onClick={() => setSelectedId(pattern.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: pattern.color } : undefined}
            >
              {pattern.shortName}
            </button>
          )
        })}
      </div>

      {/* 双栏：左 模式说明 + 右 代码示例 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        {/* 模式说明区 */}
        <div className="space-y-md">
          {selected && (
            <>
              <div
                className="rounded-md border-l-4 p-md"
                style={{ borderLeftColor: selected.color, backgroundColor: `${selected.color}10` }}
              >
                <h4 className="text-heading-4 text-ink">{selected.name}</h4>
                <p className="mt-xs text-body-sm text-body">{selected.philosophy}</p>
              </div>

              <div className="rounded-md border border-hairline bg-canvas-card p-md">
                <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                  适用场景
                </div>
                <p className="mt-xs text-body-sm text-ink">{selected.useCase}</p>
              </div>

              {/* 优缺点对比 */}
              <div className="grid grid-cols-2 gap-sm">
                <div className="rounded-md border border-[#07c160]/40 bg-[#07c160]/8 p-md">
                  <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#07c160]">
                    ✓ 优点
                  </div>
                  <ul className="space-y-xs">
                    {selected.pros.map((pro, i) => (
                      <li key={i} className="flex gap-xs text-caption text-ink">
                        <span className="text-[#07c160]">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-[#ef4444]/40 bg-[#ef4444]/8 p-md">
                  <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#ef4444]">
                    ✗ 缺点
                  </div>
                  <ul className="space-y-xs">
                    {selected.cons.map((con, i) => (
                      <li key={i} className="flex gap-xs text-caption text-ink">
                        <span className="text-[#ef4444]">-</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 代码示例区 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center gap-sm">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              代码示例
            </span>
            {selected && (
              <span
                className="rounded-pill px-sm py-xxs font-mono text-caption-mono-xs text-white"
                style={{ backgroundColor: selected.color }}
              >
                {selected.shortName}
              </span>
            )}
          </div>
          {selected && (
            <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
              <code>{selected.codeSnippet}</code>
            </pre>
          )}
        </div>
      </div>

      {/* 模式对比速查表 */}
      <div className="overflow-x-auto rounded-md border border-hairline bg-canvas-card">
        <table className="w-full text-left text-caption">
          <thead className="bg-canvas-soft">
            <tr>
              <th className="px-md py-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                模式
              </th>
              <th className="px-md py-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                推荐度
              </th>
              <th className="px-md py-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                适用场景
              </th>
            </tr>
          </thead>
          <tbody>
            {patterns.map((p) => (
              <tr
                key={p.id}
                className={cn(
                  'cursor-pointer border-t border-hairline transition-colors',
                  selectedId === p.id ? 'bg-canvas-soft' : 'hover:bg-canvas-soft/50',
                )}
                onClick={() => setSelectedId(p.id)}
              >
                <td className="px-md py-sm">
                  <span
                    className="inline-block h-xs w-xs rounded-full align-middle"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="ml-xs font-mono text-caption-mono-sm text-ink">{p.shortName}</span>
                </td>
                <td className="px-md py-sm">
                  {p.id === 'custom-hooks' || p.id === 'compound-components' ? (
                    <span className="rounded-pill bg-[#07c160]/15 px-sm py-xxs font-mono text-caption-mono-xs text-[#07c160]">
                      ★ 推荐
                    </span>
                  ) : (
                    <span className="rounded-pill bg-[#f59e0b]/15 px-sm py-xxs font-mono text-caption-mono-xs text-[#f59e0b]">
                      ⚠ 历史方案
                    </span>
                  )}
                </td>
                <td className="px-md py-sm text-body-mid">{p.useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
