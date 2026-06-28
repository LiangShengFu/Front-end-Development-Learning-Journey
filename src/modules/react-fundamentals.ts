/**
 * 模块 08：React 基础与核心能力
 *
 * 完整实现 24 个知识点，涵盖 React 核心概念、JSX、虚拟 DOM、Props/State、
 * Hooks 体系、表单处理、数据获取、路由、状态管理、React 19 特性、
 * RSC、性能优化、综合实战（断言沙盒）、面试题、速查表和小测验。
 * 使用 23 个可视化组件辅助理解（含 9 个新增 React 专属组件）。
 */
import type { ModuleMeta } from '../lib/types'
import type { DataFetchStateMachineData } from '../lib/react-visualization-types'

export const reactFundamentalsModule: ModuleMeta = {
  number: '08',
  title: 'React 基础与核心能力',
  slug: 'react-fundamentals',
  stage: 'react',
  stageLabel: 'React 技术栈 · 第 1 模块',
  icon: '08',
  summary: 'JSX、组件、Props/State、Hooks、虚拟 DOM、表单、Router、Redux。',
  knowledgePointCount: 24,
  visualizationCount: 23,
  points: [
    // ========================================================================
    // 知识点 1：React 概述与设计哲学（KnowledgeGraph + Timeline）
    // ========================================================================
    {
      order: 1,
      title: 'React 概述与设计哲学',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'React 是 Facebook 开源的用于构建用户界面的 JavaScript 库。核心思想是组件化和声明式编程——描述 UI 应该是什么样，而非如何操作 DOM 去实现。',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'react', label: 'React', group: 'core', weight: 3 },
              { id: 'jsx', label: 'JSX', group: 'related', weight: 2 },
              { id: 'vdom', label: '虚拟 DOM', group: 'related', weight: 2 },
              { id: 'hooks', label: 'Hooks', group: 'related', weight: 2 },
              { id: 'state', label: '状态管理', group: 'related', weight: 2 },
              { id: 'router', label: '路由', group: 'related', weight: 2 },
              { id: 'rsc', label: 'RSC', group: 'related', weight: 1 },
              { id: 'createElement', label: 'createElement', group: 'detail' },
              { id: 'diff', label: 'Diff 算法', group: 'detail' },
              { id: 'useState', label: 'useState', group: 'detail' },
              { id: 'redux', label: 'Redux', group: 'detail' },
              { id: 'concurrent', label: '并发模式', group: 'detail' },
            ],
            edges: [
              { source: 'react', target: 'jsx' },
              { source: 'react', target: 'vdom' },
              { source: 'react', target: 'hooks' },
              { source: 'react', target: 'state' },
              { source: 'react', target: 'router' },
              { source: 'react', target: 'rsc' },
              { source: 'jsx', target: 'createElement' },
              { source: 'vdom', target: 'diff' },
              { source: 'hooks', target: 'useState' },
              { source: 'state', target: 'redux' },
              { source: 'rsc', target: 'concurrent' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'heading',
          level: 3,
          text: 'React 四大核心原则',
        },
        {
          id: 'p1-4',
          type: 'list',
          ordered: true,
          items: [
            '组件化：将 UI 拆分为独立、可复用的组件，每个组件管理自己的状态和渲染',
            '声明式：描述 UI 在不同状态下应该是什么样，React 负责高效更新 DOM',
            '单向数据流：数据从父组件通过 props 向子组件流动，状态变更通过回调向上通知',
            '虚拟 DOM：在内存中维护 UI 的轻量表示，通过 diff 算法最小化真实 DOM 操作',
          ],
        },
        {
          id: 'p1-5',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '2013', title: 'React 开源', description: 'Facebook 发布 React，引入 JSX 和虚拟 DOM', status: 'done' },
              { time: '2015', title: 'React Native', description: '用 React 构建原生移动应用', status: 'done' },
              { time: '2016', title: 'React 15', description: '改进 SVG 支持，移除 data-reactid', status: 'done' },
              { time: '2017', title: 'React 16 (Fiber)', description: '重写核心算法为 Fiber 架构，支持异步渲染', status: 'done' },
              { time: '2019', title: 'React 16.8 (Hooks)', description: '引入 Hooks，函数组件获得状态和副作用能力', status: 'done' },
              { time: '2022', title: 'React 18', description: '并发模式、自动批处理、Suspense 改进、useTransition', status: 'done' },
              { time: '2024', title: 'React 19', description: 'Server Components 稳定、Actions、useFormStatus、useOptimistic', status: 'active' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 2：JSX 语法与编译（JsxLivePreview）
    // ========================================================================
    {
      order: 2,
      title: 'JSX 语法与编译',
      difficulty: 1,
      visualizationType: 'jsx-live-preview',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'JSX 是 JavaScript 的语法扩展，看起来像 HTML 但本质上是 React.createElement 的语法糖。编译工具（Babel/TypeScript）在构建时将 JSX 转换为标准 JavaScript 函数调用。',
        },
        {
          id: 'p2-2',
          type: 'code',
          language: 'tsx',
          filename: 'JSX 基础语法',
          code: `// JSX：在 JS 中编写类 HTML 语法
function Greeting({ name }: { name: string }) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      {/* 条件渲染 */}
      {name ? <p>欢迎回来</p> : <p>请登录</p>}
      {/* 列表渲染 */}
      {[1, 2, 3].map(n => <span key={n}>{n}</span>)}
    </div>
  )
}

// 编译后等价于：
function Greeting({ name }) {
  return React.createElement('div', { className: 'greeting' },
    React.createElement('h1', null, 'Hello, ', name, '!'),
    name ? React.createElement('p', null, '欢迎回来') : React.createElement('p', null, '请登录'),
    [1, 2, 3].map(n => React.createElement('span', { key: n }, n))
  )
}`,
        },
        {
          id: 'p2-3',
          type: 'demo',
          visualizationType: 'jsx-live-preview',
          data: {
            defaultCode: `<div className="card">
  <h2>{title}</h2>
  <p>{description}</p>
  <button onClick={handleClick}>确认</button>
</div>`,
            presets: [
              { label: '元素', code: '<button className="btn" onClick={handleClick}>\n  点击我\n</button>', description: '基本 JSX 元素' },
              { label: '列表', code: '<ul>\n  {items.map(item => <li key={item.id}>{item.name}</li>)}\n</ul>', description: '列表渲染+key' },
              { label: '条件', code: '<div>\n  {isLoading ? <Spinner /> : <Content />}\n</div>', description: '条件渲染' },
              { label: 'Fragment', code: '<>\n  <Header />\n  <Main />\n  <Footer />\n</>', description: 'Fragment 简写' },
            ],
          },
        },
        {
          id: 'p2-4',
          type: 'callout',
          variant: 'tip',
          title: 'JSX 规则速记',
          text: '1) 必须有一个根元素（可用 <>...</> Fragment）；2) 用 {} 嵌入 JS 表达式；3) class → className，for → htmlFor；4) 自闭合标签必须写 />（如 <br />）；5) key 是列表渲染的必需品。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：虚拟 DOM 与 Diff 算法（VdomDiffSimulator）
    // ========================================================================
    {
      order: 3,
      title: '虚拟 DOM 与 Diff 算法',
      difficulty: 3,
      visualizationType: 'vdom-diff-simulator',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          text: '虚拟 DOM 是真实 DOM 的 JavaScript 对象表示。当状态变化时，React 先创建新的虚拟 DOM 树，与旧的比较（diff），计算出最小 DOM 操作集，最后批量更新真实 DOM。',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'vdom-diff-simulator',
          data: {
            scenes: [
              {
                id: 'add', label: '新增节点',
                oldTree: [{ id: 'a', label: '<div key="a">A</div>' }, { id: 'b', label: '<div key="b">B</div>' }],
                newTree: [{ id: 'a', label: '<div key="a">A</div>' }, { id: 'b', label: '<div key="b">B</div>' }, { id: 'c', label: '<div key="c">C</div>' }],
                diffDescription: '新增节点 C：key="c" 在旧树中不存在，React 创建新 DOM 节点并插入', domOps: 1, addedIds: ['c'], removedIds: [], movedIds: [],
              },
              {
                id: 'remove', label: '移除节点',
                oldTree: [{ id: 'a', label: '<div key="a">A</div>' }, { id: 'b', label: '<div key="b">B</div>' }, { id: 'c', label: '<div key="c">C</div>' }],
                newTree: [{ id: 'a', label: '<div key="a">A</div>' }, { id: 'c', label: '<div key="c">C</div>' }],
                diffDescription: '移除节点 B：通过 key 识别，React 移除对应 DOM 节点', domOps: 1, addedIds: [], removedIds: ['b'], movedIds: [],
              },
              {
                id: 'reorder', label: '重排序（复用）',
                oldTree: [{ id: 'a', label: '<div key="a">A</div>' }, { id: 'b', label: '<div key="b">B</div>' }, { id: 'c', label: '<div key="c">C</div>' }],
                newTree: [{ id: 'c', label: '<div key="c">C</div>' }, { id: 'a', label: '<div key="a">A</div>' }, { id: 'b', label: '<div key="b">B</div>' }],
                diffDescription: '重排序：React 通过 key 识别节点复用，仅移动 DOM 位置不销毁重建', domOps: 2, addedIds: [], removedIds: [], movedIds: ['c', 'a', 'b'],
              },
              {
                id: 'mixed', label: '混合变更',
                oldTree: [{ id: 'a', label: '<div key="a">A</div>' }, { id: 'b', label: '<div key="b">B v1</div>' }, { id: 'c', label: '<div key="c">C</div>' }],
                newTree: [{ id: 'b', label: '<div key="b">B v2</div>' }, { id: 'd', label: '<div key="d">D</div>' }, { id: 'c', label: '<div key="c">C</div>' }],
                diffDescription: 'A 移除 + B 更新 + D 新增 + C 移动 = 4 次 DOM 操作', domOps: 4, addedIds: ['d'], removedIds: ['a'], movedIds: ['c'],
              },
            ],
          },
        },
        {
          id: 'p3-3',
          type: 'callout',
          variant: 'tip',
          title: 'key 的重要性',
          text: 'key 帮助 React 识别元素是否改变。必须使用稳定且唯一的标识（如 id），不要用数组索引——当列表重排序时索引不变但内容变了，React 无法正确 diff。',
        },
      ],
    },

    // ========================================================================
    // 知识点 4：组件与 Props（CompareTable + FlipCard）
    // ========================================================================
    {
      order: 4,
      title: '组件与 Props',
      difficulty: 1,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          text: '组件是 React 应用的基本构建块。Props 是父组件向子组件传递数据的只读通道——React 遵循单向数据流，props 永远由父组件流向子组件。',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['函数组件', '类组件（历史）'],
            highlightColumn: 0,
            rows: [
              { feature: '定义方式', values: ['function Comp(props) { return JSX }', 'class Comp extends React.Component'] },
              { feature: '状态管理', values: ['useState / useReducer Hooks', 'this.state + this.setState'] },
              { feature: '生命周期', values: ['useEffect 统一管理', 'componentDidMount / DidUpdate / WillUnmount'] },
              { feature: '代码量', values: ['少（简洁）', '多（模板代码）'] },
              { feature: 'TypeScript', values: ['类型推导好', '需额外类型声明'] },
              { feature: '性能', values: ['可配合 memo 优化', 'PureComponent 内置浅比较'] },
              { feature: '推荐度', values: ['✅ 现代 React 首选', '⚠ 遗留代码中可见'] },
            ],
          },
        },
        {
          id: 'p4-3',
          type: 'code',
          language: 'tsx',
          filename: 'Props 示例',
          code: `// 类型安全的 Props 定义
interface CardProps {
  title: string
  content: string
  variant?: 'default' | 'featured'
  onClick?: () => void
  children?: React.ReactNode
}

function Card({ title, content, variant = 'default', onClick, children }: CardProps) {
  return (
    <div className={\`card card--\${variant}\`} onClick={onClick}>
      <h3>{title}</h3>
      <p>{content}</p>
      {children}
    </div>
  )
}

// 使用
<Card title="Hello" content="World" variant="featured" onClick={handleClick}>
  <button>额外内容</button>
</Card>`,
        },
        {
          id: 'p4-4',
          type: 'callout',
          variant: 'warning',
          title: 'Props 是只读的',
          text: '子组件绝对不能修改 props。需要根据用户输入改变的值应该用 state。如果需要子组件通知父组件，通过回调 props（如 onClick）向上传递。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：State 与单向数据流（Timeline）
    // ========================================================================
    {
      order: 5,
      title: 'State 与单向数据流',
      difficulty: 2,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          text: 'State 是组件的"记忆"——当状态改变时，React 自动重新渲染组件。React 的数据流是单向的：state → UI，用户操作 → setState → 新 state → 新 UI。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '1', title: 'State 初始化', description: 'useState(initialValue) 创建状态变量和更新函数', status: 'done' },
              { time: '2', title: '用户交互', description: '点击按钮/输入文字/提交表单 → 触发事件处理函数', status: 'done' },
              { time: '3', title: 'setState 调用', description: 'setCount(count + 1) — React 将状态更新加入队列', status: 'done' },
              { time: '4', title: '重新渲染', description: 'React 用新 state 重新调用组件函数，生成新 JSX', status: 'done' },
              { time: '5', title: '虚拟 DOM Diff', description: '新旧虚拟 DOM 树对比，计算最小 DOM 操作', status: 'done' },
              { time: '6', title: 'DOM 更新', description: 'React 批量执行 DOM 操作，浏览器重绘', status: 'active' },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'code',
          language: 'tsx',
          filename: 'useState 示例',
          code: `// 基础用法
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(prev => prev - 1)}>-1</button>
    </div>
  )
}

// 状态更新是异步的（React 18+ 自动批处理）
function Form() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  // 同一事件中的两个 setState 会合并为一次渲染
  const handleSubmit = () => {
    setName('')     // 不会立即触发渲染
    setAge(0)       // React 18 自动批处理：只渲染一次
  }
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 6：useState 与 useReducer
    // ========================================================================
    {
      order: 6,
      title: 'useState 与 useReducer',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          text: 'useState 适合简单状态，useReducer 适合复杂状态逻辑——当多个状态相互关联或状态更新逻辑复杂时，useReducer 更易维护。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '维度',
            columns: ['useState', 'useReducer'],
            rows: [
              { feature: '适用场景', values: ['简单状态（数字/字符串/布尔）', '复杂状态对象、多状态联动'] },
              { feature: '更新方式', values: ['setState(newValue)', 'dispatch({ type, payload })'] },
              { feature: '状态逻辑位置', values: ['分散在事件处理中', '集中在 reducer 函数中'] },
              { feature: '可测试性', values: ['中等', '高（reducer 是纯函数）'] },
              { feature: '代码量', values: ['少', '多（需要定义 action 和 reducer）'] },
              { feature: '推荐', values: ['简单控件、表单字段', '购物车、表单多字段、状态机'] },
            ],
            highlightColumn: 0,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 7：useEffect 与副作用管理
    // ========================================================================
    {
      order: 7,
      title: 'useEffect 与副作用管理',
      difficulty: 3,
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: 'useEffect 是 React 处理副作用的主要 Hook——数据获取、订阅、DOM 操作等。它统一了类组件的 componentDidMount、componentDidUpdate 和 componentWillUnmount。',
        },
        {
          id: 'p7-2',
          type: 'code',
          language: 'tsx',
          filename: 'useEffect 模式',
          code: `// 1. 每次渲染后执行（无依赖数组）
useEffect(() => {
  console.log('每次渲染后执行')
})

// 2. 仅挂载时执行一次（空依赖数组）
useEffect(() => {
  const subscription = api.subscribe()
  return () => subscription.unsubscribe()  // cleanup！
}, [])

// 3. 依赖变化时执行
useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count])  // count 变化时重新执行

// 4. cleanup 函数（防止内存泄漏）
useEffect(() => {
  let cancelled = false
  fetchUser(id).then(user => {
    if (!cancelled) setUser(user)
  })
  return () => { cancelled = true }  // 组件卸载或依赖变化前执行
}, [id])`,
        },
        {
          id: 'p7-3',
          type: 'callout',
          variant: 'warning',
          title: 'useEffect 常见陷阱',
          text: '1) 忘记依赖数组导致死循环；2) 缺少 cleanup 导致内存泄漏；3) 在 useEffect 中修改依赖项；4) 竞态条件（快速切换导致旧请求覆盖新结果）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 8：Hooks 规则与对比（DiffHighlightBoard）
    // ========================================================================
    {
      order: 8,
      title: 'Hooks 规则与常见反模式',
      difficulty: 3,
      visualizationType: 'diff-highlight-board',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          text: 'Hooks 有两项铁律：只在组件顶层调用、只在 React 函数中调用。违反规则会导致 Hook 调用顺序错乱，产生难以调试的 bug。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'diff-highlight-board',
          data: {
            leftTitle: '✅ 正确做法',
            rightTitle: '❌ 错误做法',
            pairs: [
              {
                label: 'Hook 调用位置',
                left: `function Comp() {\n  const [x, setX] = useState(0)\n  // ✅ 组件顶层调用\n  useEffect(() => {}, [x])\n  return <div>{x}</div>\n}`,
                right: `function Comp() {\n  if (condition) {\n    const [x, setX] = useState(0)\n  }\n  // ❌ 条件语句中调用 Hook！\n  return <div>{x}</div>\n}`,
                highlight: 'Hook 必须在组件顶层调用，不能在条件/循环中',
              },
              {
                label: 'useEffect 依赖',
                left: `useEffect(() => {\n  fetchUser(userId)\n}, [userId])\n// ✅ 依赖数组完整`,
                right: `useEffect(() => {\n  fetchUser(userId)\n}, [])\n// ❌ 缺少 userId 依赖！`,
                highlight: 'useEffect 必须包含所有响应式依赖（eslint-plugin-react-hooks 会警告）',
              },
              {
                label: '状态不可变更新',
                left: `setUser(prev => ({...prev, name: 'Alice'}))\n// ✅ 展开运算符创建新对象`,
                right: `user.name = 'Alice'\nsetUser(user)\n// ❌ 直接修改原对象，React 无法检测变化`,
                highlight: '状态更新必须返回新对象/新数组，不能直接修改',
              },
              {
                label: '列表 key',
                left: `{items.map(item =>\n  <Item key={item.id} data={item} />\n)}\n// ✅ 稳定的唯一标识`,
                right: `{items.map((item, idx) =>\n  <Item key={idx} data={item} />\n)}\n// ❌ 索引作为 key，重排序出 bug`,
                highlight: 'key 应使用稳定的唯一标识（如 id），不要用数组索引',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 9：useMemo / useCallback / useRef / useContext（FlipCard）
    // ========================================================================
    {
      order: 9,
      title: 'useMemo / useCallback / useRef / useContext',
      difficulty: 3,
      visualizationType: 'flipcard',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          text: '这四个 Hook 各有专长：useMemo 缓存计算结果，useCallback 缓存函数引用，useRef 持有可变值不触发渲染，useContext 跨组件共享数据。',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'flipcard',
          data: {
            cards: [
              {
                front: 'useMemo',
                frontSub: '缓存计算结果',
                back: 'useMemo(() => computeExpensiveValue(a, b), [a, b]) — 依赖不变时返回缓存值，避免重复计算。适合：大数据过滤/排序、复杂派生状态。',
              },
              {
                front: 'useCallback',
                frontSub: '缓存函数引用',
                back: 'useCallback(fn, deps) 等价于 useMemo(() => fn, deps)。配合 React.memo 使用——如果回调引用不变，子组件不会因回调重建而重渲染。',
              },
              {
                front: 'useRef',
                frontSub: '可变值容器',
                back: 'useRef(initial) 返回 { current: initial }。修改 .current 不触发重渲染。适合：DOM 引用、存储 interval ID、保存上一次的值。',
              },
              {
                front: 'useContext',
                frontSub: '跨组件共享',
                back: 'const value = useContext(MyContext) — 读取最近的 <MyContext.Provider> 提供的值。适合：主题、语言、认证信息等全局状态。避免过度使用——Provider 值变化会导致所有消费者重渲染。',
              },
            ],
          },
        },
        {
          id: 'p9-3',
          type: 'callout',
          variant: 'tip',
          title: '性能优化提示',
          text: '不要过早优化——useMemo/useCallback 本身也有开销。只有当计算确实昂贵、或传递给 memo 组件的 props 引用需要稳定时再使用。React 19 的 Compiler 可能在未来自动完成这些优化。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：受控组件 vs 非受控组件（CompareTable）
    // ========================================================================
    {
      order: 10,
      title: '受控组件 vs 非受控组件',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          text: '受控组件：表单值由 React state 控制（推荐）。非受控组件：表单值由 DOM 自身管理，通过 ref 读取。两种模式各有适用场景。',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '维度',
            columns: ['受控组件（Controlled）', '非受控组件（Uncontrolled）'],
            highlightColumn: 0,
            rows: [
              { feature: '数据源', values: ['React state（value + onChange）', 'DOM 自身（ref 读取）'] },
              { feature: '实时验证', values: ['✅ 每次输入都可验证', '⚠ 仅在提交时验证'] },
              { feature: '动态联动', values: ['✅ 一个字段变化可联动其他', '❌ 难以实现'] },
              { feature: '代码量', values: ['多（需维护 state）', '少（原生行为）'] },
              { feature: '适用场景', values: ['复杂表单、实时验证', '简单表单、文件上传'] },
              { feature: '推荐度', values: ['✅ React 官方推荐', '⚠ 特定场景'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 11：综合实战 — 受控注册表单（任务导向，断言沙盒）
    // ========================================================================
    {
      order: 11,
      title: '综合实战：受控注册表单',
      difficulty: 3,
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: '前面学了 State、useReducer、受控组件——现在是把它们焊在一起的时候。这一节是第一个综合实战：从零实现一个带实时验证的受控注册表单。你要综合运用 useState 管理表单状态、受控输入（value + onChange）、提交校验与错误展示。右侧沙盒内置「任务检查清单」，你写代码时它会实时告诉你哪条没达标、该怎么改——这是从「看懂 Hook」到「会写表单」的关键一步。',
        },
        {
          id: 'p11-2',
          type: 'paragraph',
          text: '任务要求：用 React 实现注册表单，包含用户名（必填）、邮箱（必填 + 格式校验）、密码（必填 + 至少 8 位）。表单状态用 useState 管理（受控组件）；提交时调用 validate 校验，校验失败在输入框下方展示错误信息；提交按钮阻止默认行为（preventDefault）。',
        },
        {
          id: 'p11-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '在下方编辑器中编写 React 受控表单（已内置 React 18 + Babel，可直接写 JSX）。任务检查清单会实时校验你的代码并给出提示——逐条通过即完成任务。可随时点击「重置」回退到初始骨架。',
            initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 16px; }
    .err { color: #d33; font-size: 12px; margin: 2px 0 8px; }
    label { display: block; margin: 8px 0 2px; font-size: 14px; }
    input { padding: 6px; width: 220px; }
    button { margin-top: 12px; padding: 8px 16px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React

    // 校验函数：返回错误对象（字段名 -> 错误信息）
    function validate(values) {
      const errors = {}
      // TODO: 用户名必填
      // TODO: 邮箱必填且包含 @
      // TODO: 密码至少 8 位
      return errors
    }

    function RegisterForm() {
      const [values, setValues] = useState({ username: '', email: '', password: '' })
      const [errors, setErrors] = useState({})

      const handleChange = (e) => {
        // TODO: 受控更新对应字段
      }

      const handleSubmit = (e) => {
        // TODO: 阻止默认行为 + 校验 + 设置错误
      }

      return (
        <form onSubmit={handleSubmit}>
          {/* 用户名输入（受控）+ 错误展示 */}
          {/* 邮箱输入（受控）+ 错误展示 */}
          {/* 密码输入（受控）+ 错误展示 */}
          <button type="submit">注册</button>
        </form>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<RegisterForm />)
  </script>
</body>
</html>`,
            checks: [
              {
                description: '使用 useState 管理表单状态（values 与 errors）',
                pattern: 'useState\\(',
                hint: '在组件内用 const [values, setValues] = useState({...}) 管理表单字段，用 const [errors, setErrors] = useState({}) 管理错误。这是受控组件的基础。',
              },
              {
                description: '实现受控输入：input 同时绑定 value 与 onChange',
                pattern: 'value=\\{[\\w.]+\\}[\\s\\S]{0,80}onChange=\\{',
                hint: '每个 <input> 必须同时有 value={values.字段} 和 onChange={handleChange}。只有 value 没有 onChange 的 input 是只读的，会报警告。',
              },
              {
                description: 'handleChange 用展开运算符不可变更新对应字段',
                pattern: '\\.\\.\\.values|\\.\\.\\.prev',
                hint: '更新状态时返回新对象：setValues(prev => ({ ...prev, [name]: value }))。直接修改 values.字段 = value 不会触发重渲染，违反状态不可变原则。',
              },
              {
                description: '实现 validate 校验函数（用户名必填 / 邮箱含 @ / 密码 ≥ 8 位）',
                pattern: 'password\\.length\\s*<\\s*8|password\\.length\\s*>=?\\s*8',
                hint: 'validate 中校验密码长度：if (values.password.length < 8) errors.password = ...。同时校验用户名非空、邮箱含 @。',
              },
              {
                description: 'handleSubmit 调用 e.preventDefault() 阻止默认提交',
                pattern: 'preventDefault\\(\\)',
                hint: '提交处理函数首行写 e.preventDefault()，否则点击按钮会刷新页面（表单默认提交行为），React 状态被重置。',
              },
              {
                description: '在输入框下方展示对应字段的错误信息（errors[字段]）',
                pattern: 'errors\\.[\\w]+|errors\\[',
                hint: '在每个 input 下方渲染 {errors.username && <div className="err">{errors.username}</div>}。让用户即时看到校验失败原因，是无障碍与体验的基本要求。',
              },
              {
                description: '提交按钮使用 type="submit" 并置于 form 内',
                pattern: '<button[^>]*type=["\']submit["\']',
                hint: '用 <button type="submit">注册</button> 放在 <form onSubmit={handleSubmit}> 内。靠 form 的 onSubmit 统一处理提交，比给按钮加 onClick 更语义化、也支持回车提交。',
              },
            ],
          },
        },
        {
          id: 'p11-4',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '它把「State + 受控组件 + 事件处理 + 校验」四章串联成一个真实产物。完成后你会发现：受控组件的本质是「state 即真相」——输入框的值永远由 state 决定，onChange 只是更新 state 的通道；校验不是表单的附属，而是数据可信的第一道防线。这种「拼装」经验，是单看 Hook 文档无法替代的工程思维。',
        },
        {
          id: 'p11-5',
          type: 'callout',
          variant: 'warning',
          title: '前端验证的边界',
          text: '前端验证只为体验——让用户即时看到错误，减少无效请求。但前端校验可被绕过（禁用 JS / 改请求体），所以服务端必须独立校验。永远不要信任客户端传来的数据。',
        },
      ],
    },

    // ========================================================================
    // 知识点 12：数据获取与三态处理（DataFetchStateMachine）
    // ========================================================================
    {
      order: 12,
      title: '数据获取与三态处理',
      difficulty: 3,
      visualizationType: 'data-fetch-state-machine',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          text: '数据请求的标准模式：loading（展示骨架屏或 Spinner）、success（渲染数据）、error（展示错误信息和重试按钮）。正确处理三态和竞态条件是前端质量的基础。',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'data-fetch-state-machine',
          data: {
            title: '数据获取三态机',
            scenarios: [
              {
                id: 'normal', label: '正常请求', description: 'idle → loading → success',
                initialState: 'idle',
                transitionSequence: [
                  { from: 'idle', to: 'loading', trigger: '触发请求', delay: 1500 },
                  { from: 'loading', to: 'success', trigger: '请求成功', delay: 1500 },
                ],
              },
              {
                id: 'error', label: '请求失败', description: 'idle → loading → error',
                initialState: 'idle',
                transitionSequence: [
                  { from: 'idle', to: 'loading', trigger: '触发请求', delay: 1000 },
                  { from: 'loading', to: 'error', trigger: '网络错误', delay: 1500 },
                ],
              },
              {
                id: 'race', label: '竞态条件', description: '快速切换 → 旧请求覆盖新结果',
                initialState: 'idle',
                transitionSequence: [
                  { from: 'idle', to: 'loading', trigger: '请求用户1', delay: 3000 },
                ],
                hasRaceCondition: true,
              },
            ],
          } as DataFetchStateMachineData,
        },
        {
          id: 'p12-3',
          type: 'callout',
          variant: 'warning',
          title: '竞态条件处理',
          text: '快速切换 tab 或搜索框实时请求时，旧请求可能在新的之后返回，导致 UI 显示错误数据。解决方案：useEffect cleanup 取消标记 或 AbortController 取消请求。',
        },
      ],
    },

    // ========================================================================
    // 知识点 13：React Router 基础（ArchitectureDiagram）
    // ========================================================================
    {
      order: 13,
      title: 'React Router 基础',
      difficulty: 2,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          text: 'React Router 是 React 生态中最流行的路由库。v6+ 采用声明式路由配置，支持嵌套路由、动态参数、懒加载和导航守卫。',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'React Router 嵌套路由结构',
            flowDirection: 'top-down',
            layers: [
              {
                name: 'BrowserRouter',
                description: '根组件，基于 HTML5 History API 管理路由',
                components: [{ name: '<BrowserRouter>', description: '包裹整个应用' }],
              },
              {
                name: 'Routes / Route',
                description: '路由配置——path 匹配 URL，element 指定渲染组件',
                components: [
                  { name: '<Routes>', description: '路由容器' },
                  { name: '<Route path="/" element={<Layout />}>', description: '根路由 + 布局' },
                ],
              },
              {
                name: '嵌套路由（Outlet）',
                description: '子路由渲染在父组件的 <Outlet /> 位置',
                components: [
                  { name: '<Route index element={<Home />}>', description: '索引路由（/）' },
                  { name: '<Route path="users/:id" element={<User />}>', description: '动态路由参数' },
                ],
              },
              {
                name: '导航',
                description: '<Link> 和 <NavLink> 实现客户端导航，不刷新页面',
                components: [
                  { name: '<Link to="/about">', description: '基础链接' },
                  { name: '<NavLink>', description: '带激活状态的链接' },
                  { name: 'useNavigate()', description: '编程式导航' },
                ],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 14：Context API vs Props Drilling
    // ========================================================================
    {
      order: 14,
      title: 'Context API vs Props Drilling',
      difficulty: 2,
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          text: '当多个层级的组件需要共享数据时，Props Drilling 会将 props 一层层传递，导致中间组件耦合不需要的数据。Context API 提供"广播"机制，让深层组件直接消费数据。',
        },
        {
          id: 'p14-2',
          type: 'code',
          language: 'tsx',
          filename: 'Context 示例',
          code: `// 创建 Context
const ThemeContext = createContext<Theme>('light')

// 提供值
function App() {
  const [theme, setTheme] = useState<Theme>('light')
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

// 消费值（任意深度）
function ThemedButton() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>按钮</button>
}

// 注意：Provider value 变化会导致所有消费者重渲染
// 优化：将 value 用 useMemo 缓存，或将 Context 拆分为多个细粒度 Context`,
        },
        {
          id: 'p14-3',
          type: 'callout',
          variant: 'warning',
          title: 'Context 不是状态管理',
          text: 'Context 只是依赖注入机制，解决 props 传递问题。频繁变化的状态（如输入框值）不应放在 Context 中——每次变化都会导致所有消费者重渲染。高频更新用 Zustand/Redux。',
        },
      ],
    },

    // ========================================================================
    // 知识点 15：状态管理方案决策（DecisionTree）
    // ========================================================================
    {
      order: 15,
      title: '状态管理方案选型',
      difficulty: 3,
      visualizationType: 'decision-tree',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          text: 'React 状态管理方案众多：useState、Context、Zustand、Redux Toolkit、Jotai、Recoil。选型的核心问题是"状态的作用域和复杂度"。跟着决策树找到最合适的方案。',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'decision-tree',
          data: {
            startLabel: '状态管理选型',
            root: {
              question: '状态是否被多个组件共享？',
              yesLabel: '是 → 需要全局/共享状态方案',
              noLabel: '否 → 组件内部状态',
              yesResult: '下一步：状态是否频繁更新且需要精细订阅？',
              noResult: '推荐：useState（组件内部状态）。简单、零依赖。',
            },
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 16：Redux Toolkit 数据流（ReduxCycleSimulator）
    // ========================================================================
    {
      order: 16,
      title: 'Redux Toolkit 数据流',
      difficulty: 3,
      visualizationType: 'redux-cycle-simulator',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          text: 'Redux 是经典的 JavaScript 状态管理库，Redux Toolkit 是其官方推荐工具集。核心概念：Store（单一状态树）、Action（描述事件）、Reducer（纯函数更新状态）、Dispatch（触发更新）、Selector（读取状态）。',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'redux-cycle-simulator',
          data: {
            steps: [
              { phase: '1. Action', title: '触发 Action', code: 'dispatch({ type: "counter/increment", payload: 1 })', description: 'Action 描述"发生了什么"，必须包含 type', color: '#3b82f6' },
              { phase: '2. Dispatch', title: '分发 Action', code: 'store.dispatch(action)', description: 'dispatch 是唯一触发状态变更的方式', color: '#7c3aed' },
              { phase: '3. Reducer', title: '执行 Reducer', code: 'function reducer(state, action) { switch(action.type) { ... } }', description: 'Reducer 是纯函数 (state, action) → newState', color: '#22c55e' },
              { phase: '4. Store', title: '更新 Store', code: '{ counter: 1, user: {...}, todos: [...] }', description: 'Store 是唯一的状态树，保证单一数据源', color: '#f97316' },
              { phase: '5. UI Rerender', title: 'UI 重新渲染', code: 'const count = useSelector(s => s.counter)', description: '订阅了相关状态的组件自动重渲染', color: '#ec4899' },
            ],
          },
        },
        {
          id: 'p16-3',
          type: 'callout',
          variant: 'tip',
          title: 'Redux Toolkit 最佳实践',
          text: '使用 createSlice 简化 reducer 和 action 定义。配合 createAsyncThunk 处理异步逻辑。配合 RTK Query 进行数据获取和缓存管理。只在真正需要全局状态时使用。',
        },
      ],
    },

    // ========================================================================
    // 知识点 17：React 19 新特性（Accordion）
    // ========================================================================
    {
      order: 17,
      title: 'React 19 新特性',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          text: 'React 19 是继 Hooks 之后最重要的更新，带来了 Server Components 稳定版、Actions、useFormStatus、useOptimistic、Document Metadata 等重大特性。',
        },
        {
          id: 'p17-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: 'Server Components（RSC）稳定版',
                content: '组件在服务器端渲染，零 bundle 体积。可以直接访问数据库和文件系统，无需 API 层。客户端组件用 "use client" 标记。',
                code: '// Server Component（默认）\nasync function UserList() {\n  const users = await db.user.findMany()  // 直接访问 DB\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>\n}',
                codeLanguage: 'tsx',
              },
              {
                title: 'Actions（useFormStatus / useActionState）',
                content: 'Actions 是用异步函数处理表单提交的简洁方式。useFormStatus 提供提交状态，useActionState 管理表单状态。',
                code: 'function Form() {\n  const [state, formAction] = useActionState(submit, null)\n  const { pending } = useFormStatus()\n  return <form action={formAction}><input name="title" /><button disabled={pending}>提交</button></form>\n}',
                codeLanguage: 'tsx',
              },
              {
                title: 'useOptimistic',
                content: '在服务端响应前立即更新 UI，实现"乐观更新"。提交失败时自动回滚。极大改善用户感知的响应速度。',
                code: 'const [optimisticMessages, addOptimistic] = useOptimistic(\n  messages,\n  (state, newMsg) => [...state, { ...newMsg, sending: true }]\n)',
                codeLanguage: 'tsx',
              },
              {
                title: 'ref 作为 props',
                content: 'React 19 中 ref 可以作为普通 prop 传递，不再需要 forwardRef 包装。这是一个巨大的人机工程学改进。',
                code: '// React 19：ref 即 prop\nfunction Input({ ref, placeholder }: { ref: Ref<HTMLInputElement>; placeholder: string }) {\n  return <input ref={ref} placeholder={placeholder} />\n}',
                codeLanguage: 'tsx',
              },
              {
                title: 'use() API',
                content: 'use() 可以在渲染中读取 Promise 和 Context。与 Suspense 配合，可以在条件分支中读取异步数据。',
                code: 'function UserProfile({ id }: { id: string }) {\n  const user = use(fetchUser(id))  // 读取 Promise\n  return <div>{user.name}</div>\n}',
                codeLanguage: 'tsx',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 18：并发模式与 useTransition
    // ========================================================================
    {
      order: 18,
      title: '并发模式与 useTransition',
      difficulty: 4,
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: 'React 18 引入并发渲染——React 可以在渲染过程中"暂停"和"恢复"，优先处理用户交互，让应用保持响应。useTransition 和 useDeferredValue 是主要的并发 Hook。',
        },
        {
          id: 'p18-2',
          type: 'code',
          language: 'tsx',
          filename: 'useTransition 示例',
          code: `function SearchPage() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 紧急更新：输入框立即响应
    setQuery(e.target.value)
    // 非紧急更新：搜索结果可延迟
    startTransition(() => {
      setSearchResults(filterData(e.target.value))
    })
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <SearchResults data={searchResults} />
    </>
  )
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 19：性能优化与重渲染追踪（RerenderTracker）
    // ========================================================================
    {
      order: 19,
      title: '性能优化与重渲染追踪',
      difficulty: 4,
      visualizationType: 'rerender-tracker',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          text: 'React 性能优化的核心是减少不必要的重渲染。通过 React.memo、useMemo、useCallback 和合理的组件拆分，可以显著提升大型应用的性能。',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'rerender-tracker',
          data: {
            defaultScenario: '无优化',
          },
        },
        {
          id: 'p19-3',
          type: 'callout',
          variant: 'tip',
          title: '优化优先级',
          text: '1) 先拆分组件（隔离重渲染范围）；2) 再用 React.memo 跳过不变的子组件；3) 用 useMemo/useCallback 稳定引用；4) 列表使用虚拟滚动；5) 用 React DevTools Profiler 找到真正的性能瓶颈。',
        },
      ],
    },

    // ========================================================================
    // 知识点 20：Suspense 边界与 ErrorBoundary（SuspenseBoundaryDemo）
    // ========================================================================
    {
      order: 20,
      title: 'Suspense 边界与 ErrorBoundary',
      difficulty: 3,
      visualizationType: 'suspense-boundary-demo',
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          text: 'Suspense 让组件在加载异步数据时展示 fallback UI。ErrorBoundary 捕获子组件渲染错误并展示降级 UI。两者配合构成完整的异步组件错误处理体系。',
        },
        {
          id: 'p20-2',
          type: 'demo',
          visualizationType: 'suspense-boundary-demo',
          data: {},
        },
        {
          id: 'p20-3',
          type: 'callout',
          variant: 'tip',
          title: 'Suspense 最佳实践',
          text: '将 Suspense 边界放在独立的数据加载组件外层。多个数据源用独立 Suspense，避免一个慢请求阻塞整个页面。配合 ErrorBoundary 处理请求失败。',
        },
      ],
    },

    // ========================================================================
    // 知识点 21：综合实战 — Hooks 数据获取与列表（任务导向，断言沙盒）
    // ========================================================================
    {
      order: 21,
      title: '综合实战：Hooks 数据获取与列表',
      difficulty: 3,
      blocks: [
        {
          id: 'p21-1',
          type: 'paragraph',
          lead: true,
          text: '第二个综合实战把「useState/useEffect + 数据三态 + 列表渲染 + key + 竞态处理」焊在一起。你要实现一个用户列表：挂载时请求数据，正确展示 loading / 成功列表 / 错误重试，列表项用稳定 key 渲染，并处理快速切换导致的竞态。右侧沙盒的任务检查清单会实时校验你的代码并给教学反馈。',
        },
        {
          id: 'p21-2',
          type: 'paragraph',
          text: '任务要求：用 useState 管理 users / loading / error 三态；用 useEffect 在挂载时发起请求（用 setTimeout 模拟异步）；请求成功后 setUsers，失败后 setError；列表用 .map 渲染且每项有稳定 key；在 useEffect 中用 cancelled 标记或 AbortController 防止卸载后 setState 与竞态覆盖。',
        },
        {
          id: 'p21-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '在下方编辑器中编写 React 用户列表（已内置 React 18 + Babel，可直接写 JSX）。任务检查清单会实时校验——逐条通过即完成。重点关注三态处理、列表 key 与竞态清理。',
            initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 16px; }
    ul { list-style: none; padding: 0; }
    li { padding: 6px 0; border-bottom: 1px solid #eee; }
    .err { color: #d33; }
    button { padding: 6px 12px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React

    // 模拟异步请求：返回 Promise，1.2s 后 resolve 用户列表
    function fetchUsers() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 模拟成功：resolve([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }])
          // 模拟失败：reject(new Error('网络错误'))
          resolve([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Carol' }])
        }, 1200)
      })
    }

    function UserList() {
      // TODO: 用 useState 管理 users / loading / error 三态

      // TODO: 用 useEffect 挂载时请求，注意 cancelled 标记防竞态
      useEffect(() => {
        // ...
      }, [])

      return (
        <div>
          {/* loading 展示 */}
          {/* error 展示 + 重试按钮 */}
          {/* 成功：列表渲染（每项带稳定 key） */}
        </div>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<UserList />)
  </script>
</body>
</html>`,
            checks: [
              {
                description: '用 useState 管理三态：users / loading / error',
                pattern: 'useState\\(',
                hint: '组件内声明三个状态：const [users, setUsers] = useState([])、const [loading, setLoading] = useState(true)、const [error, setError] = useState(null)。三态分离是数据获取的标准模式。',
              },
              {
                description: '用 useEffect 在挂载时发起请求（空依赖数组）',
                pattern: 'useEffect\\([\\s\\S]{0,40}\\(\\)[\\s\\S]{0,80}\\[\\s*\\]',
                hint: 'useEffect(() => { fetchUsers().then(...) }, [])。空依赖数组确保只在挂载时请求一次，否则每次渲染都请求会死循环。',
              },
              {
                description: '正确处理 loading 态（请求前 setLoading(true)，结束后 setLoading(false)）',
                pattern: 'setLoading',
                hint: '请求开始前 setLoading(true)，请求结束（无论成功失败）在 finally 中 setLoading(false)。忘记重置 loading 会导致永远转圈。',
              },
              {
                description: '正确处理 error 态（catch 中 setError）',
                pattern: 'catch|setError',
                hint: '用 .catch(err => setError(err.message)) 捕获失败。没有 catch 的 Promise 链会产生未处理拒绝，且错误无法展示给用户。',
              },
              {
                description: '列表用 .map 渲染，且每项带稳定 key（key={item.id} 或 user.id）',
                pattern: '\\.map\\([\\s\\S]{0,120}key=\\{[\\w.]+\\.id\\}',
                hint: '用 users.map(u => <li key={u.id}>{u.name}</li>)。key 必须是稳定唯一的 id，不能用数组索引——重排序/插入时索引会错位导致复用错误。',
              },
              {
                description: '在 useEffect 中用 cancelled 标记或 AbortController 防竞态/卸载后 setState',
                pattern: 'cancelled|AbortController|abort\\(\\)',
                hint: 'useEffect 内声明 let cancelled = false，resolve 后 if (!cancelled) setUsers(...)，cleanup 返回 () => { cancelled = true }。防止组件卸载后仍 setState（内存泄漏警告）与快速切换时旧请求覆盖新结果（竞态）。',
              },
            ],
          },
        },
        {
          id: 'p21-4',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '它把「Hooks + 三态 + 列表 + key + 竞态」五个高频痛点串成一个真实场景。完成后你会理解：数据获取不是写个 fetch 就完事——三态决定了 UI 的可信度，key 决定了列表的正确性，cleanup 决定了组件的健壮性。这三者正是 React 工程师面试与日常开发的高发区。',
        },
        {
          id: 'p21-5',
          type: 'callout',
          variant: 'warning',
          title: '实战后的反思',
          text: '手动管理三态与竞态是基础功，但生产环境别重复造轮子——TanStack Query（React Query）与 SWR 已把 loading/error/缓存/重试/竞态封装好，配合 Suspense 还能进一步声明式化。理解底层原理后，再上工具才能用得明白。',
        },
      ],
    },

    // ========================================================================
    // 知识点 22：React 面试题精选（Accordion · flashcard 模式）
    // ========================================================================
    {
      order: 22,
      title: 'React 面试题精选',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p22-1',
          type: 'paragraph',
          text: '精选 React 高频面试题，涵盖核心概念、Hooks、状态管理、性能优化、React 19、场景排查与方案对比。题量较多，已切换为闪卡模式（一题一屏，翻转看答案 + 上下题导航），也可切回列表模式。点击展开查看参考答案。',
        },
        {
          id: 'p22-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: 虚拟 DOM 的原理和优势？',
                content: '虚拟 DOM 是真实 DOM 的 JS 对象映射。\n\n工作流程：\n1. 状态变化时创建新虚拟 DOM 树。\n2. 与旧树 diff 找出差异。\n3. 批量更新真实 DOM。\n\n优势：\n- 减少真实 DOM 操作（DOM 操作最昂贵）。\n- 跨平台（虚拟 DOM → 原生/iOS/Android）。\n- 声明式编程（只描述 UI 状态，不操作 DOM）。\n\n注意：虚拟 DOM 不一定比直接操作 DOM 快，它的价值在于「可维护性 + 跨平台 + 声明式」的工程权衡。',
              },
              {
                title: 'Q2: React 中的 key 有什么作用？为什么不能用 index？',
                content: 'key 帮助 React 识别列表中哪些元素改变了、添加了或移除了。\n\n用 index 的问题：\n1. 列表重排序时，index 不变但内容变了，React 会错误复用 DOM（输入框内容残留等 bug）。\n2. 插入/删除元素时，后续所有元素 index 都变了，导致整个列表重渲染。\n\n结论：应使用稳定的唯一 id。',
              },
              {
                title: 'Q3: useEffect 的 cleanup 函数何时执行？',
                content: 'cleanup 在两个时机执行：\n1. 组件卸载前。\n2. 下一次 useEffect 执行前（依赖变化时先执行上一次的 cleanup）。\n\n用途：取消订阅、清除定时器、取消 fetch 请求（通过标记变量或 AbortController）。',
              },
              {
                title: 'Q4: React.memo、useMemo、useCallback 的区别？',
                content: '三者目标一致：避免不必要的重渲染和重计算，区别在作用对象：\n\n- React.memo：高阶组件，浅比较 props，props 未变则跳过渲染。\n- useMemo：缓存计算结果，依赖不变返回缓存值。\n- useCallback：缓存函数引用，useCallback(fn, deps) = useMemo(() => fn, deps)。\n\n记忆：memo 作用于组件、useMemo 作用于值、useCallback 作用于函数。',
              },
              {
                title: 'Q5: React 18 的自动批处理（Automatic Batching）是什么？',
                content: 'React 18 之前，只有事件处理函数中的多个 setState 会被批处理（合并为一次渲染）。setTimeout、Promise 中的 setState 不会批处理。\n\nReact 18 实现了自动批处理：\n- 无论在哪里调用 setState（事件、timeout、Promise）。\n- 都会被自动合并为一次渲染。\n\n结论：减少不必要的渲染次数。如需立即刷新可用 flushSync。',
              },
              {
                title: 'Q6: Server Components 和 Client Components 的区别？',
                content: 'Server Components（默认）：\n- 在服务器渲染，不能用 useState/useEffect/事件处理。\n- 可直接访问数据库和文件系统。\n- 零 bundle 体积。\n\nClient Components（"use client"）：\n- 在浏览器渲染，可使用所有 React 功能。\n- 具备交互能力。\n\n两者可在组件树中混合——服务器组件嵌套客户端组件作为"岛屿"。\n\n选型原则：尽量用 Server Component，只在需要交互/状态处加 "use client"。',
              },
              {
                title: 'Q7: useState 与 useReducer 的取舍？',
                content: 'useState：\n- 适合简单独立状态（数字/字符串/布尔）。\n\nuseReducer：\n- 适合多个相互关联的状态、状态更新逻辑复杂或需集中可测试时。\n- 把更新逻辑收口到纯函数 reducer，可测试、可预测、易复用。\n\n判断标准：当一个状态的变化牵动其它状态、或 setState 散落多处难以维护时，迁到 useReducer。',
              },
              {
                title: 'Q8: Context API 与 Redux 的区别？何时用哪个？',
                content: 'Context 是依赖注入机制：\n- 解决 props 传递问题。\n- 本身不提供状态管理（无 reducer、无中间件、无时间旅行）。\n- 值变化会让所有消费者重渲染。\n\nRedux 是完整状态管理库：\n- 单一 store、纯函数 reducer、可中间件、可订阅、可时间旅行。\n- 支持精细订阅，高频更新不拖性能。\n\n选型：\n1. 低频全局数据（主题/语言/用户信息）用 Context。\n2. 高频更新、需中间件/持久化/调试的大型应用用 Redux Toolkit。',
              },
              {
                title: 'Q9: 受控组件与非受控组件的区别？',
                content: '受控组件：\n- 表单值由 React state 控制（value + onChange）。\n- React 是数据源，可实时验证与联动。\n- 适合复杂表单/实时验证。\n\n非受控组件：\n- 表单值由 DOM 管理，通过 ref 读取，只在提交时取值。\n- 代码量少，适合简单表单或文件上传（file input 只能非受控）。\n\n两者可混用：大部分受控，file 用 ref。',
              },
              {
                title: 'Q10: React 17 与 React 18 的关键差异？',
                content: '主要差异：\n1. 自动批处理：18 在所有上下文批处理，17 仅事件处理。\n2. 并发特性：18 引入 useTransition/useDeferredValue/Suspense for data fetching。\n3. 新的 createRoot API：替代 ReactDOM.render。\n4. Strict Mode 更严格：卸载重挂载检测副作用。\n5. Suspense 支持 SSR。\n\n升级注意：改用 createRoot，检查 Strict Mode 下的副作用幂等性。',
              },
              {
                title: 'Q11: 场景题——列表渲染后输入框内容"串到别的行"，如何排查？',
                content: '根因几乎总是用 index 作为 key。\n\n原理：列表重排序/插入/删除时，index 与内容错位，React 按 key 复用 DOM，导致输入框等带内部状态的 DOM 节点被错误复用。\n\n排查：\n1. 检查 .map 是否用了 (item, index) 作为 key。\n2. 修复：换成稳定的 item.id。\n\n若数据无 id，在数据源头补 id（用 nanoid 或基于内容 hash），不要用 Math.random()（每次渲染都变导致全部重建）。',
              },
              {
                title: 'Q12: 场景题——组件出现 useEffect 死循环（无限渲染），如何排查？',
                content: '典型成因：useEffect 在 effect 中修改了依赖项。\n\n排查路径：\n1. 看依赖数组是否包含被 setState 的状态——effect 依赖 X，effect 内 setX → X 变 → effect 再执行 → 死循环。\n2. 依赖数组里放了对象/数组/函数引用，每次渲染都是新引用导致 effect 反复触发。\n\n修复：\n- 用函数式更新 setX(prev => ...) 配合空依赖。\n- 或把对象/函数用 useMemo/useCallback 稳定引用。\n- 或重新审视该 effect 是否真的需要这个依赖。',
              },
              {
                title: 'Q13: 场景题——组件卸载后异步请求返回导致 setState 警告，如何处理？',
                content: '根因：异步请求未在卸载时取消，返回后仍 setState，触发 "Can\'t perform a React state update on unmounted component" 警告。\n\n修复方案：\n1. 标记变量——useEffect 内 let cancelled = false，resolve 后 if (!cancelled) setState，cleanup 返回 () => { cancelled = true }。\n2. AbortController——fetch(url, { signal })，cleanup 中 controller.abort()（更彻底，连请求都取消，还省带宽）。\n\n推荐方案 2。',
              },
              {
                title: 'Q14: 场景题——大型列表渲染卡顿，如何优化？',
                content: '分层优化：\n1. 虚拟滚动（react-window/react-virtual）只渲染可见区，万级数据也能流畅。\n2. 列表项用 React.memo + 稳定 key，避免整体重渲染。\n3. 传给列表项的回调用 useCallback 稳定引用。\n4. 避免在 .map 中内联创建大对象。\n5. 复杂项分页或懒加载。\n\n先用 React DevTools Profiler 定位瓶颈，再针对性优化，不要盲目 memo。',
              },
              {
                title: 'Q15: 场景题——父组件频繁重渲染导致子组件变慢，如何排查与优化？',
                content: '排查：\n- 用 React DevTools Profiler 录制，看哪些子组件被"连坐"渲染。\n- why-did-you-render 插件可报错重渲染原因。\n\n优化：\n1. 拆分组件，把变化的部分隔离到小组件，缩小重渲染范围。\n2. 子组件用 React.memo 浅比较 props。\n3. 传给子组件的回调用 useCallback、对象用 useMemo 稳定引用，否则 memo 失效。\n4. 高频更新用 useTransition 标记为非紧急。\n5. 状态下放到使用处，避免顶层 state 牵动全树。',
              },
              {
                title: 'Q16: 为什么不能在条件语句/循环里调用 Hook？',
                content: 'React 依赖 Hook 的调用顺序来对应 state。\n\n原理：\n- 每次渲染 Hook 必须以相同顺序、相同数量调用。\n- React 用内部链表按顺序存取每个 Hook 的状态。\n- 若在条件中调用，某次渲染跳过了某个 Hook，后续 Hook 顺序错位，state 对应错乱。\n\n结论：Hook 必须在组件顶层无条件调用，把条件逻辑放进 Hook 内部（如 useEffect 内 if）。',
              },
              {
                title: 'Q17: useEffect 依赖数组：空数组、无数组、有依赖的区别？',
                content: '三种情况：\n\n- 无依赖数组：每次渲染后都执行（少用，易死循环）。\n- 空数组 []：仅挂载时执行一次（适合初始订阅/请求，配合 cleanup 卸载）。\n- 有依赖 [a, b]：a/b 变化时执行（effect 前会先跑上一次 cleanup）。\n\n原则：依赖数组应包含 effect 中用到的所有响应式变量（props/state），否则会读到 stale closure（过时值）。配合 eslint-plugin-react-hooks 的 exhaustive-deps 规则自动补全。',
              },
              {
                title: 'Q18: Hooks 的两项规则是什么？',
                content: 'Hooks 的两项规则：\n\n1. 只在 React 函数（函数组件或自定义 Hook）顶层调用 Hook，不在普通 JS 函数/条件/循环/嵌套函数中调用。\n2. 只在 React 函数或自定义 Hook 中调用 Hook（非 React 函数里不能调）。\n\n补充：自定义 Hook 必须以 use 开头命名，便于 linter 识别并校验规则。',
              },
              {
                title: 'Q19: useMemo/useCallback 何时该用、何时不该用？',
                content: '该用：\n1. 计算昂贵（大数据过滤/排序）的派生值用 useMemo。\n2. 传给 React.memo 子组件的 props（尤其是函数/对象）用 useCallback/useMemo 稳定引用，否则 memo 失效。\n\n不该用：\n1. 简单计算（加减法、小数组）——memo 本身有开销，得不偿失。\n2. 没传给 memo 组件的普通函数——重新创建几乎无成本。\n\n原则：先测后优，用 Profiler 找到瓶颈再 memo，不要无脑包。React 19 Compiler 未来可自动优化。',
              },
              {
                title: 'Q20: useRef 的用途有哪些？',
                content: 'useRef 返回 { current: initialValue }，修改 .current 不触发重渲染。\n\n主要用途：\n1. 访问 DOM 元素（如聚焦 input、测量尺寸）。\n2. 保存可变值且不希望触发渲染（定时器 ID、上一次的值）。\n3. 存储跨渲染需保持但与渲染无关的数据。\n\n注意：不要在渲染过程中读写 ref.current（除首次初始化），ref 的读写应放在事件处理或 effect 中，否则破坏纯渲染。',
              },
              {
                title: 'Q21: 为什么 React 要求状态不可变更新？',
                content: 'React 用 Object.is 浅比较判断状态是否变化来决定重渲染。\n\n直接修改原对象（state.push() / state.x = 1）：\n- 引用不变，React 检测不到变化，不会重渲染。\n\n返回新对象/新数组（展开运算符、map/filter、immer）：\n- 引用变化，React 才知道状态变了。\n\n不可变更新还带来：可撤销/重做（历史快照）、.memo 浅比较有效、并发模式下渲染可中断且无副作用。用 immer 的 produce 可简化写法。',
              },
              {
                title: 'Q22: 手写一个 useDebounce 防抖 Hook',
                content: '实现：\nfunction useDebounce(value, delay) {\n  const [debounced, setDebounced] = useState(value)\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay)\n    return () => clearTimeout(t)\n  }, [value, delay])\n  return debounced\n}\n\n关键点：\n- effect 依赖 value，每次 value 变化重启定时器。\n- cleanup 清掉上一个定时器。\n- 只有最后一次变化后 delay 内无新变化才 setDebounced。\n\n这是"取消上一次副作用"的经典 cleanup 模式。',
              },
              {
                title: 'Q23: 手写一个 usePrevious Hook（保存上一次的值）',
                content: '实现：\nfunction usePrevious(value) {\n  const ref = useRef()\n  useEffect(() => { ref.current = value })\n  return ref.current\n}\n\n原理：\n- useEffect 在渲染提交后执行。\n- 此时 ref.current 还是"上一次渲染的值"，把它返回，再把新 value 写入 ref。\n- 注意首次返回 undefined。\n\n体现了 ref 跨渲染保持值且不触发渲染的特性。',
              },
              {
                title: 'Q24: 对比题——高阶组件（HOC）与自定义 Hook 的取舍？',
                content: 'HOC（withRouter(Comp)）：\n- Class 时代的复用手段，通过包裹组件注入 props。\n- 缺点：props 嵌套地狱、类型推导难、displayName 混乱。\n\n自定义 Hook（useRouter()）：\n- Hooks 时代的复用手段，直接在组件内调用。\n- 优点：逻辑扁平、类型友好、无嵌套。\n\n结论：\n- 新代码优先用自定义 Hook 复用逻辑。\n- HOC 仅在需要拦截渲染/操作 JSX 时（如权限拦截包裹）才考虑。\n- Render Props 也是历史方案，同样被 Hook 取代。',
              },
              {
                title: 'Q25: 函数组件的主要"生命周期"对应关系？',
                content: '对应关系：\n- 挂载：useEffect(..., []) → componentDidMount。\n- 更新：useEffect(..., [deps]) → componentDidUpdate。\n- 卸载：useEffect 的 cleanup → componentWillUnmount。\n\n补充：\n- useLayoutEffect 在 DOM 变更后同步执行，适合测量 DOM。\n- memo 对应 shouldComponentUpdate/PureComponent。\n- 函数组件无 constructor，初始化直接在函数体或用 lazy useState 初值。',
              },
              {
                title: 'Q26: Fiber 是什么？为什么需要？',
                content: 'Fiber 是 React 16 重写的核心架构。\n\n原理：\n- 把渲染工作拆成可中断、可恢复的小单元（Fiber 节点链表）。\n- 使 React 能在渲染过程中暂停去处理更高优先级的用户交互，再恢复渲染——这是并发模式的基础。\n\n为什么需要：\n- 之前递归渲染（栈式）一旦开始无法中断，大组件树会阻塞主线程导致掉帧。\n- Fiber 还支持优先级调度、时间切片（每帧 5ms 渲染预算），让交互保持响应。',
              },
              {
                title: 'Q27: Suspense 与 ErrorBoundary 如何配合？',
                content: '两者各司其职：\n\n- Suspense：包裹异步组件，数据未就绪时展示 fallback（如 Spinner）。\n- ErrorBoundary（class 组件或 react-error-boundary）：捕获子树渲染错误展示降级 UI。\n\n配合模式：Suspense 内嵌 ErrorBoundary——Suspense 处理"加载中"、ErrorBoundary 处理"加载失败"。\n\n注意：ErrorBoundary 只捕获渲染/生命周期错误，不捕获事件处理与异步错误（后者需 try/catch 或在 effect 中处理）。',
              },
              {
                title: 'Q28: 对比题——SSR、CSR、SSG、ISR 的区别？',
                content: '四种渲染模式：\n\n- CSR（客户端渲染）：浏览器拉 JS 后渲染，首屏慢、SEO 差，交互好。\n- SSR（服务端渲染）：每次请求服务器生成 HTML，首屏快、SEO 好，服务器压力大。\n- SSG（静态生成）：构建时生成 HTML，最快、可 CDN，适合内容不变的博客/文档。\n- ISR（增量静态再生）：SSG + 按需后台再生成，兼顾静态速度与内容更新。\n\nNext.js 同时支持四种，按页面选型：\n1. 首页/营销用 SSG。\n2. 仪表盘用 CSR。\n3. 个性化用 SSR。\n4. 频繁更新用 ISR。',
              },
              {
                title: 'Q29: 场景题——如何为新项目选型状态管理方案？',
                content: '决策路径：\n1. 状态是否跨组件共享？否 → useState 组件内部。\n2. 是 → 跨多少层？少量层且低频 → Context + useReducer。\n3. 高频更新/需精细订阅 → Zustand（轻量、按需订阅）。\n4. 大型团队/需中间件/时间旅行/持久化 → Redux Toolkit。\n5. 原子化细粒度 → Jotai/Recoil。\n6. 服务端状态（API 数据）单列 → TanStack Query/SWR，不要塞进全局状态。\n\n原则：避免"一把梭"全放 Redux。',
              },
              {
                title: 'Q30: 手写一个简化版 useState？',
                content: '实现：\nlet state\nfunction useState(initial) {\n  state = state ?? initial\n  const setState = (next) => {\n    state = typeof next === "function" ? next(state) : next\n    triggerRender()\n  }\n  return [state, setState]\n}\n\n原理：\n- 模块级变量存当前 state，setState 更新它并触发重渲染。\n- 真实 React 用 Fiber 节点链表按调用顺序存每个 Hook 的状态，支持多组件多 Hook 并存。\n\n说明：Hook 本质是"函数 + 闭包 + 调用顺序"。',
              },
              {
                title: 'Q31: React 19 的 Actions / useActionState 解决什么问题？',
                content: 'Actions 把表单提交统一为"异步函数处理"。\n\n核心 API：\n- useActionState：管理 action 的返回状态（成功/失败/数据）。\n- useFormStatus：在表单内部子组件读取 pending 状态（如提交按钮显示 loading）。\n\n解决的问题：\n- 消除手写 pending/isLoading 状态、手动 try/catch、手动 disabled 按钮的样板代码。\n- 配合 Server Actions 还能直接提交到服务端，无需写 API 端点。\n\n这是 React 19 最大的 DX 提升之一。',
              },
              {
                title: 'Q32: 列表 key 的取值规范？',
                content: 'key 必须满足：\n1. 稳定——同一项在不同次渲染间 key 不变。\n2. 唯一——兄弟节点间 key 不重复（不同父节点下可重复）。\n\n最佳来源：数据 id（数据库主键、uuid）。\n\n禁止：\n- 用 index（重排序错位）。\n- 用 Math.random()（每次变导致全重建）。\n- 用不稳定的拼接。\n\n注意：key 不需要全局唯一，只需兄弟间唯一；key 也不会进 props，无法在子组件通过 props.key 读取。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 23：React 基础速查表
    // ========================================================================
    {
      order: 23,
      title: 'React 基础速查表',
      difficulty: 1,
      blocks: [
        {
          id: 'p23-1',
          type: 'paragraph',
          text: 'React 基础核心知识点速查表，快速回顾关键概念、Hook 与最佳实践。',
        },
        {
          id: 'p23-2',
          type: 'table',
          caption: 'React 基础速查表',
          headers: ['知识点', '关键要点', '常用 API / 写法'],
          rows: [
            ['JSX', 'JS 的语法糖，编译为 createElement', '<div className> {表达式} <>Fragment</>'],
            ['虚拟 DOM', '真实 DOM 的 JS 对象映射，diff 后批量更新', 'React.createElement / key'],
            ['组件', '函数组件为现代首选，props 只读', 'function Comp(props) {} / React.memo'],
            ['Props', '父→子单向数据流，只读不可变', 'props / children / 默认参数'],
            ['State', '组件内部记忆，setState 触发重渲染', 'useState / useReducer'],
            ['useState', '简单状态', 'const [x, setX] = useState(0)'],
            ['useReducer', '复杂/联动状态，纯函数更新', 'const [s, dispatch] = useReducer(reducer, init)'],
            ['useEffect', '副作用（请求/订阅/DOM），需 cleanup', 'useEffect(fn, [deps]) / return () => {}'],
            ['useMemo', '缓存计算结果', 'useMemo(() => compute(a,b), [a,b])'],
            ['useCallback', '缓存函数引用', 'useCallback(fn, [deps])'],
            ['useRef', '可变值/DOM 引用，不触发渲染', 'const ref = useRef(null)'],
            ['useContext', '跨组件共享，低频全局数据', 'useContext(MyContext)'],
            ['Hooks 规则', '顶层调用、只在 React 函数中调用', '不可在条件/循环中调用'],
            ['受控组件', 'value + onChange，state 为数据源', '<input value={v} onChange={e=>setV(e.target.value)} />'],
            ['非受控组件', 'ref 读取，DOM 为数据源', 'useRef / defaultValue'],
            ['列表渲染', '.map 渲染，key 稳定唯一', 'items.map(i => <Item key={i.id} />)'],
            ['条件渲染', '&& / 三元 / 立即执行函数', '{ok && <X/>} / {ok ? <A/> : <B/>}'],
            ['Context', '依赖注入，避免 props drilling', 'createContext / Provider / useContext'],
            ['状态管理选型', '简单 useState / 共享 Context / 高频 Zustand/Redux', 'useState / Context / Zustand / RTK'],
            ['React Router', '声明式路由，嵌套 + Outlet', '<Routes><Route path element>'],
            ['React 19', 'RSC 稳定 / Actions / useOptimistic / ref 即 prop', '"use client" / useActionState / useFormStatus'],
            ['性能优化', 'memo + 稳定引用 + 虚拟列表 + Profiler', 'React.memo / useMemo / useCallback / react-window'],
            ['并发模式', 'useTransition 标记非紧急更新', 'useTransition / useDeferredValue'],
            ['Suspense', '异步 fallback，配合 ErrorBoundary', '<Suspense fallback={<Spinner/>}>'],
            ['常见陷阱', 'effect 改依赖→死循环；index 当 key→错位', '函数式更新 / 稳定 key / cleanup'],
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 24：React 基础小测验（QuizCard）
    // ========================================================================
    {
      order: 24,
      title: 'React 基础小测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p24-1',
          type: 'paragraph',
          text: '通过以下测验检验你对 React 核心概念的掌握程度。题目按【记忆】【理解】【应用】【对比】【场景】【综合】梯度分布，每题附有详细解析。',
        },
        {
          id: 'p24-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '【记忆】JSX 最终会被编译为什么？',
                options: ['可直接被浏览器执行的 HTML', 'React.createElement 调用', '虚拟 DOM 对象', '模板字符串'],
                correctIndex: 1,
                explanation: 'JSX 被 Babel/tsc 编译为 React.createElement（或 jsx 运行时）调用，再执行得到虚拟 DOM 对象。浏览器不能直接理解 JSX，需先编译。',
              },
              {
                question: '【记忆】Hooks 的两项规则之一是"只在顶层调用"，其原因是？',
                options: ['避免性能问题', 'React 依赖调用顺序对应 state', '防止变量提升', '为了代码可读性'],
                correctIndex: 1,
                explanation: 'React 用内部链表按 Hook 调用顺序存取每个 Hook 的状态。若在条件/循环中调用导致顺序变化，state 对应错乱。所以必须顶层无条件调用。',
              },
              {
                question: '【理解】以下哪个不会触发组件重渲染？',
                options: ['setState 调用', '父组件重渲染', 'useRef.current 修改', 'Context Provider value 变化'],
                correctIndex: 2,
                explanation: '修改 useRef.current 不触发重渲染，这是它与 state 的核心区别。setState、父组件渲染、Context 变化都会触发。',
              },
              {
                question: '【理解】useEffect 的 cleanup 函数在何时执行？',
                options: ['只在组件卸载时', '每次渲染后', '下一次 effect 执行前 + 卸载前', '仅在依赖变化时'],
                correctIndex: 2,
                explanation: 'cleanup 在两个时机执行：下一次 effect 执行前（依赖变化时先清理上一次）和组件卸载前。这保证副作用的"取消"语义完整。',
              },
              {
                question: '【理解】为什么状态更新必须返回新对象而非直接修改？',
                options: ['JavaScript 限制', 'React 用引用比较判断变化，直接改引用不变检测不到', '直接修改会报错', '性能更差'],
                correctIndex: 1,
                explanation: 'React 用 Object.is 浅比较判断 state 是否变化。直接修改原对象引用不变，React 检测不到变化不会重渲染。返回新对象/数组引用变化才能触发渲染，且利于撤销/重做与 memo。',
              },
              {
                question: '【对比】useState 与 useReducer 的主要区别？',
                options: ['useState 异步、useReducer 同步', 'useReducer 适合复杂联动状态，逻辑集中在 reducer', 'useReducer 不能用于函数组件', 'useState 性能更差'],
                correctIndex: 1,
                explanation: 'useState 适合简单独立状态；useReducer 适合多个相互关联状态或复杂更新逻辑，把更新逻辑收口到纯函数 reducer，可测试、可预测、易复用。',
              },
              {
                question: '【对比】React.memo、useMemo、useCallback 的作用对象分别是？',
                options: ['组件 / 值 / 函数', '函数 / 组件 / 值', '值 / 函数 / 组件', '三者都是组件'],
                correctIndex: 0,
                explanation: 'React.memo 作用于组件（浅比较 props 跳过渲染），useMemo 缓存值，useCallback 缓存函数引用。useCallback(fn, deps) 等价于 useMemo(() => fn, deps)。',
              },
              {
                question: '【对比】Context 与 Redux 的核心区别？',
                options: ['Context 更快', 'Context 是依赖注入机制，Redux 是完整状态管理库', 'Redux 只能用 class 组件', 'Context 支持时间旅行'],
                correctIndex: 1,
                explanation: 'Context 只解决 props 传递（依赖注入），无 reducer/中间件/时间旅行，值变化让所有消费者重渲染。Redux 是完整状态管理（单一 store、纯函数 reducer、中间件、可订阅）。低频用 Context，高频/大型用 Redux。',
              },
              {
                question: '【对比】Server Components 与 Client Components 的关键差异？',
                options: ['Server 组件能用 useState', 'Server 组件零 bundle 体积且可访问数据库，Client 组件可交互', 'Client 组件运行更快', '两者无区别'],
                correctIndex: 1,
                explanation: 'Server Components 在服务器渲染，零 bundle、可直访 DB/文件系统，但不能用 state/effect/事件。Client Components（"use client"）在浏览器渲染，可交互。尽量用 Server，需要交互处才标 Client。',
              },
              {
                question: '【应用】以下 useEffect 代码有什么问题？\nuseEffect(() => {\n  setCount(count + 1)\n}, [count])',
                options: ['缺少 cleanup', '会导致无限循环', '应该用 useMemo', '没有问题'],
                correctIndex: 1,
                explanation: 'effect 修改依赖项 count → effect 重执行 → 再改 count → 死循环。修复：用函数式更新 setCount(prev => prev + 1) 配合空依赖数组，或重新审视是否真需要这个 effect。',
              },
              {
                question: '【应用】实现受控输入，input 需要同时绑定哪两个属性？',
                options: ['defaultValue + ref', 'value + onChange', 'name + id', 'type + placeholder'],
                correctIndex: 1,
                explanation: '受控组件 input 必须同时有 value={state} 和 onChange={更新 state}。只有 value 没 onChange 是只读的；只有 onChange 没 value 是非受控。两者结合让 state 成为数据源。',
              },
              {
                question: '【应用】列表渲染的 key 应该用什么？',
                options: ['数组索引 index', 'Math.random()', '稳定的唯一 id（如 item.id）', 'item.toString()'],
                correctIndex: 2,
                explanation: '稳定的唯一 id 是最佳选择。index 在排序/插入时错位导致错误复用；Math.random() 每次变导致全部重建；toString() 不保证唯一。key 须稳定且兄弟间唯一。',
              },
              {
                question: '【应用】React 19 中 ref 如何传递给子组件？',
                options: ['必须用 forwardRef 包装', 'ref 可作为普通 prop 直接传递', 'ref 被移除了', '需要 createRef'],
                correctIndex: 1,
                explanation: 'React 19 中 ref 可作为普通 prop 传递（像 className），不再需要 forwardRef 包装。这是重要的 DX 改进，减少样板代码。',
              },
              {
                question: '【场景】组件卸载后异步请求返回触发 setState 警告，最佳修复是？',
                options: ['忽略警告', '用 AbortController 在 cleanup 中取消请求', '把请求移到 setTimeout 外', '禁用 useEffect'],
                correctIndex: 1,
                explanation: '用 AbortController：fetch(url, { signal })，cleanup 返回 () => controller.abort()。既防止卸载后 setState 警告，又取消请求省带宽。退一步可用 cancelled 标记变量跳过 setState。',
              },
              {
                question: '【场景】列表重排序后输入框内容"串行"，根因是？',
                options: ['用了 useState', '用 index 作为 key', '没有用 memo', '用了 Fragment'],
                correctIndex: 1,
                explanation: '用 index 作 key 时，重排序后 index 与内容错位，React 按 key 复用 DOM，导致带内部状态的 DOM（如 input 的输入值）被错误复用。修复：改用稳定的 item.id 作 key。',
              },
              {
                question: '【场景】大型列表卡顿，最有效的优化手段是？',
                options: ['给所有组件加 memo', '虚拟滚动（只渲染可见区）', '用 class 组件', '减少 useState'],
                correctIndex: 1,
                explanation: '虚拟滚动（react-window/react-virtual）只渲染可见区域的少量 DOM，万级数据也能流畅。这是最有效的手段。配合列表项 memo + 稳定 key/callback 进一步优化。先用 Profiler 定位再优化。',
              },
              {
                question: '【综合】以下代码为何会内存泄漏？如何修复？\nuseEffect(() => {\n  setInterval(() => setData(Date.now()), 1000)\n}, [])',
                options: ['setInterval 本身有 bug', '缺少 cleanup 清除定时器，卸载后仍运行', '应该用 setTimeout', '依赖数组错误'],
                correctIndex: 1,
                explanation: '空依赖 effect 启动 interval 但没 cleanup，组件卸载后 interval 仍在跑并 setState。修复：const id = setInterval(...)；return () => clearInterval(id)。cleanup 在卸载前清掉定时器。',
              },
              {
                question: '【综合】关于 React 18 自动批处理，下列说法正确的是？',
                options: ['只在事件处理中批处理', '在事件、setTimeout、Promise 中都批处理', '只在 Promise 中批处理', '需手动 flushSync'],
                correctIndex: 1,
                explanation: 'React 18 实现自动批处理：无论在事件处理、setTimeout、Promise 还是其它异步上下文中的多个 setState 都会被合并为一次渲染。React 17 只在事件处理中批处理。如需立即刷新可用 flushSync。',
              },
              {
                question: '【综合】useTransition 的作用是？',
                options: ['让组件过渡动画更流畅', '把非紧急更新标记为可中断，保持交互响应', '替代 useState', '用于服务端渲染'],
                correctIndex: 1,
                explanation: 'useTransition 把昂贵的非紧急更新（如搜索结果过滤）标记为可中断的低优先级，紧急更新（如输入框值）立即响应。startTransition 包裹非紧急 setState，isPending 显示 loading。这是并发模式的核心 API。',
              },
              {
                question: '【综合】选用状态管理方案时，高频更新的全局状态应优先考虑？',
                options: ['Context + useState', 'Zustand 或 Redux Toolkit（支持精细订阅）', '全部用 useRef', '放进 URL'],
                correctIndex: 1,
                explanation: 'Context 值变化会让所有消费者重渲染，高频状态放 Context 会拖性能。高频全局状态用 Zustand（按需订阅、轻量）或 Redux Toolkit（中间件、时间旅行、大型团队约定）。服务端状态另用 TanStack Query。',
              },
            ],
          },
        },
      ],
    },
  ],
}
