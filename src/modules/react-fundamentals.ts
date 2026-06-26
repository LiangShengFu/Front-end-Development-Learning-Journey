/**
 * 模块 08：React 基础与核心能力
 *
 * 完整实现 22 个知识点，涵盖 React 核心概念、JSX、虚拟 DOM、Props/State、
 * Hooks 体系、表单处理、数据获取、路由、状态管理、React 19 特性、
 * RSC、性能优化、面试题、速查表和小测验。
 * 使用 22 个可视化组件辅助理解（含 9 个新增 React 专属组件）。
 */
import type { ModuleMeta } from '../lib/types'

export const reactFundamentalsModule: ModuleMeta = {
  number: '08',
  title: 'React 基础与核心能力',
  slug: 'react-fundamentals',
  stage: 'react',
  stageLabel: 'React 技术栈 · 第 1 模块',
  icon: '08',
  summary: 'JSX、组件、Props/State、Hooks、虚拟 DOM、表单、Router、Redux。',
  knowledgePointCount: 22,
  visualizationCount: 22,
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
          id: 'r-p1-1',
          type: 'paragraph',
          lead: true,
          text: 'React 是 Facebook 开源的用于构建用户界面的 JavaScript 库。核心思想是组件化和声明式编程——描述 UI 应该是什么样，而非如何操作 DOM 去实现。',
        },
        {
          id: 'r-p1-2',
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
          id: 'r-p1-3',
          type: 'heading',
          level: 3,
          text: 'React 四大核心原则',
        },
        {
          id: 'r-p1-4',
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
          id: 'r-p1-5',
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
          id: 'r-p2-1',
          type: 'paragraph',
          text: 'JSX 是 JavaScript 的语法扩展，看起来像 HTML 但本质上是 React.createElement 的语法糖。编译工具（Babel/TypeScript）在构建时将 JSX 转换为标准 JavaScript 函数调用。',
        },
        {
          id: 'r-p2-2',
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
          id: 'r-p2-3',
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
          id: 'r-p2-4',
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
          id: 'r-p3-1',
          type: 'paragraph',
          text: '虚拟 DOM 是真实 DOM 的 JavaScript 对象表示。当状态变化时，React 先创建新的虚拟 DOM 树，与旧的比较（diff），计算出最小 DOM 操作集，最后批量更新真实 DOM。',
        },
        {
          id: 'r-p3-2',
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
          id: 'r-p3-3',
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
          id: 'r-p4-1',
          type: 'paragraph',
          text: '组件是 React 应用的基本构建块。Props 是父组件向子组件传递数据的只读通道——React 遵循单向数据流，props 永远由父组件流向子组件。',
        },
        {
          id: 'r-p4-2',
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
          id: 'r-p4-3',
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
          id: 'r-p4-4',
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
          id: 'r-p5-1',
          type: 'paragraph',
          text: 'State 是组件的"记忆"——当状态改变时，React 自动重新渲染组件。React 的数据流是单向的：state → UI，用户操作 → setState → 新 state → 新 UI。',
        },
        {
          id: 'r-p5-2',
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
          id: 'r-p5-3',
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
          id: 'r-p6-1',
          type: 'paragraph',
          text: 'useState 适合简单状态，useReducer 适合复杂状态逻辑——当多个状态相互关联或状态更新逻辑复杂时，useReducer 更易维护。',
        },
        {
          id: 'r-p6-2',
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
          id: 'r-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'useEffect 是 React 处理副作用的主要 Hook——数据获取、订阅、DOM 操作等。它统一了类组件的 componentDidMount、componentDidUpdate 和 componentWillUnmount。',
        },
        {
          id: 'r-p7-2',
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
          id: 'r-p7-3',
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
          id: 'r-p8-1',
          type: 'paragraph',
          text: 'Hooks 有两项铁律：只在组件顶层调用、只在 React 函数中调用。违反规则会导致 Hook 调用顺序错乱，产生难以调试的 bug。',
        },
        {
          id: 'r-p8-2',
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
          id: 'r-p9-1',
          type: 'paragraph',
          text: '这四个 Hook 各有专长：useMemo 缓存计算结果，useCallback 缓存函数引用，useRef 持有可变值不触发渲染，useContext 跨组件共享数据。',
        },
        {
          id: 'r-p9-2',
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
          id: 'r-p9-3',
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
          id: 'r-p10-1',
          type: 'paragraph',
          text: '受控组件：表单值由 React state 控制（推荐）。非受控组件：表单值由 DOM 自身管理，通过 ref 读取。两种模式各有适用场景。',
        },
        {
          id: 'r-p10-2',
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
    // 知识点 11：表单处理实战
    // ========================================================================
    {
      order: 11,
      title: '表单处理实战',
      difficulty: 3,
      blocks: [
        {
          id: 'r-p11-1',
          type: 'paragraph',
          text: 'React 表单开发涉及状态管理、验证、错误展示、提交处理。常见的模式包括：受控组件 + 自定义验证、useReducer 管理复杂表单、第三方库（React Hook Form / Formik）。',
        },
        {
          id: 'r-p11-2',
          type: 'code',
          language: 'tsx',
          filename: 'useReducer 表单',
          code: `// useReducer 管理复杂表单状态
type FormState = { username: string; email: string; errors: Record<string, string> }
type Action = { type: 'setField'; field: string; value: string } | { type: 'setErrors'; errors: Record<string, string> }

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'setField':
      return { ...state, [action.field]: action.value }
    case 'setErrors':
      return { ...state, errors: action.errors }
    default:
      return state
  }
}

function validate(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {}
  if (!state.username) errors.username = '用户名不能为空'
  if (!state.email.includes('@')) errors.email = '邮箱格式不正确'
  return errors
}`,
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
          id: 'r-p12-1',
          type: 'paragraph',
          text: '数据请求的标准模式：loading（展示骨架屏或 Spinner）、success（渲染数据）、error（展示错误信息和重试按钮）。正确处理三态和竞态条件是前端质量的基础。',
        },
        {
          id: 'r-p12-2',
          type: 'demo',
          visualizationType: 'data-fetch-state-machine',
          data: ({
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
          } as any),
        },
        {
          id: 'r-p12-3',
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
          id: 'r-p13-1',
          type: 'paragraph',
          text: 'React Router 是 React 生态中最流行的路由库。v6+ 采用声明式路由配置，支持嵌套路由、动态参数、懒加载和导航守卫。',
        },
        {
          id: 'r-p13-2',
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
          id: 'r-p14-1',
          type: 'paragraph',
          text: '当多个层级的组件需要共享数据时，Props Drilling 会将 props 一层层传递，导致中间组件耦合不需要的数据。Context API 提供"广播"机制，让深层组件直接消费数据。',
        },
        {
          id: 'r-p14-2',
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
          id: 'r-p14-3',
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
          id: 'r-p15-1',
          type: 'paragraph',
          text: 'React 状态管理方案众多：useState、Context、Zustand、Redux Toolkit、Jotai、Recoil。选型的核心问题是"状态的作用域和复杂度"。跟着决策树找到最合适的方案。',
        },
        {
          id: 'r-p15-2',
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
          id: 'r-p16-1',
          type: 'paragraph',
          text: 'Redux 是经典的 JavaScript 状态管理库，Redux Toolkit 是其官方推荐工具集。核心概念：Store（单一状态树）、Action（描述事件）、Reducer（纯函数更新状态）、Dispatch（触发更新）、Selector（读取状态）。',
        },
        {
          id: 'r-p16-2',
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
          id: 'r-p16-3',
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
          id: 'r-p17-1',
          type: 'paragraph',
          text: 'React 19 是继 Hooks 之后最重要的更新，带来了 Server Components 稳定版、Actions、useFormStatus、useOptimistic、Document Metadata 等重大特性。',
        },
        {
          id: 'r-p17-2',
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
          id: 'r-p18-1',
          type: 'paragraph',
          lead: true,
          text: 'React 18 引入并发渲染——React 可以在渲染过程中"暂停"和"恢复"，优先处理用户交互，让应用保持响应。useTransition 和 useDeferredValue 是主要的并发 Hook。',
        },
        {
          id: 'r-p18-2',
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
          id: 'r-p19-1',
          type: 'paragraph',
          text: 'React 性能优化的核心是减少不必要的重渲染。通过 React.memo、useMemo、useCallback 和合理的组件拆分，可以显著提升大型应用的性能。',
        },
        {
          id: 'r-p19-2',
          type: 'demo',
          visualizationType: 'rerender-tracker',
          data: {
            defaultScenario: '无优化',
          },
        },
        {
          id: 'r-p19-3',
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
          id: 'r-p20-1',
          type: 'paragraph',
          text: 'Suspense 让组件在加载异步数据时展示 fallback UI。ErrorBoundary 捕获子组件渲染错误并展示降级 UI。两者配合构成完整的异步组件错误处理体系。',
        },
        {
          id: 'r-p20-2',
          type: 'demo',
          visualizationType: 'suspense-boundary-demo',
          data: {},
        },
        {
          id: 'r-p20-3',
          type: 'callout',
          variant: 'tip',
          title: 'Suspense 最佳实践',
          text: '将 Suspense 边界放在独立的数据加载组件外层。多个数据源用独立 Suspense，避免一个慢请求阻塞整个页面。配合 ErrorBoundary 处理请求失败。',
        },
      ],
    },

    // ========================================================================
    // 知识点 21：React 面试题精选（Accordion）
    // ========================================================================
    {
      order: 21,
      title: 'React 面试题精选',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'r-p21-1',
          type: 'paragraph',
          text: '精选 React 高频面试题，涵盖核心概念、Hooks、状态管理、性能优化、React 19 等。点击展开查看答案。',
        },
        {
          id: 'r-p21-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: 'Q1: 虚拟 DOM 的原理和优势？',
                content: '虚拟 DOM 是真实 DOM 的 JS 对象映射。当状态变化时：1) 创建新虚拟 DOM 树；2) 与旧树 diff 找出差异；3) 批量更新真实 DOM。优势：减少真实 DOM 操作（最昂贵的操作）、跨平台（虚拟 DOM → 原生/iOS/Android）、声明式编程（只描述 UI 状态，不操作 DOM）。',
              },
              {
                title: 'Q2: React 中的 key 有什么作用？为什么不能用 index？',
                content: 'key 帮助 React 识别列表中哪些元素改变了、添加了或移除了。使用 index 的问题：1) 列表重排序时，index 不变但内容变了，React 会错误地复用 DOM（导致输入框内容残留等 bug）；2) 插入/删除元素时，后续所有元素的 index 都变了，导致整个列表重渲染。应该使用稳定的唯一 id。',
              },
              {
                title: 'Q3: useEffect 的 cleanup 函数何时执行？',
                content: 'cleanup 函数在两个时机执行：1) 组件卸载前；2) 下一次 useEffect 执行前（依赖变化时先执行上一次的 cleanup）。用途：取消订阅、清除定时器、取消 fetch 请求（通过标记变量或 AbortController）。',
              },
              {
                title: 'Q4: React.memo、useMemo、useCallback 的区别？',
                content: 'React.memo：高阶组件，浅比较 props，props 未变则跳过渲染。useMemo：缓存计算结果，依赖不变返回缓存值。useCallback：缓存函数引用，useCallback(fn, deps) = useMemo(() => fn, deps)。三者目标一致：避免不必要的重渲染和重计算。',
              },
              {
                title: 'Q5: React 18 的自动批处理（Automatic Batching）是什么？',
                content: 'React 18 之前，只有事件处理函数中的多个 setState 会被批处理（合并为一次渲染）。setTimeout、Promise 中的 setState 不会批处理。React 18 实现了自动批处理——无论在哪里调用 setState（事件、timeout、Promise），都会被自动合并为一次渲染。',
              },
              {
                title: 'Q6: Server Components 和 Client Components 的区别？',
                content: 'Server Components（默认）：在服务器渲染，不能使用 useState/useEffect/事件处理；可直接访问数据库和文件系统；零 bundle 体积。Client Components（"use client"）：在浏览器渲染，可使用所有 React 功能；具备交互能力。两者可在组件树中混合——服务器组件嵌套客户端组件作为"岛屿"。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 22：React 小测验（QuizCard）
    // ========================================================================
    {
      order: 22,
      title: 'React 基础小测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'r-p22-1',
          type: 'paragraph',
          text: '通过以下测验检验你对 React 核心概念的掌握程度。每题附有详细解析。',
        },
        {
          id: 'r-p22-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '以下关于 JSX 的说法正确的是？',
                options: ['JSX 可以直接在浏览器中运行', 'JSX 会被编译为 React.createElement 调用', 'JSX 是 HTML 的扩展', 'JSX 只能用于 React'],
                correctIndex: 1,
                explanation: 'JSX 需要被 Babel 或 tsc 编译为 React.createElement 调用。浏览器不能直接理解 JSX。JSX 也可以用于其他框架（如 Vue 的 render 函数、Solid.js），不限于 React。',
              },
              {
                question: 'React 中以下哪个不会触发组件重渲染？',
                options: ['setState 调用', '父组件重渲染', 'useRef.current 修改', 'Context Provider value 变化'],
                correctIndex: 2,
                explanation: '修改 useRef 的 .current 属性不会触发重渲染，这是它与 state 的核心区别。其他三项都会触发：setState 直接触发、父组件渲染连带子组件、Context 变化通知所有消费者。',
              },
              {
                question: '以下 useEffect 代码有什么问题？\nuseEffect(() => {\n  setCount(count + 1)\n}, [count])',
                options: ['缺少 cleanup 函数', '会导致无限循环', '应该用 useMemo 代替', '代码没有语法错误'],
                correctIndex: 1,
                explanation: 'effect 中修改依赖项 count → effect 重新执行 → 再次修改 count → 无限循环！这是典型的 useEffect 陷阱：在 effect 中修改依赖项。需要用函数式更新：setCount(prev => prev + 1) 配合空依赖数组。',
              },
              {
                question: 'React 19 中不再需要 forwardRef 的原因是？',
                options: ['ref 的 API 被移除了', 'ref 现在可以作为普通 prop 传递', 'forwardRef 被合并到 createElement 中', 'React 19 不再支持 ref'],
                correctIndex: 1,
                explanation: 'React 19 中 ref 可以作为普通 prop 传递（像 className 一样），不再需要 forwardRef 包装。这是最大的开发者体验改进之一，减少了许多样板代码。',
              },
              {
                question: '列表渲染时用什么作为 key 最安全？',
                options: ['数组索引 index', 'Math.random()', '稳定的唯一 id（如数据库 id）', 'item.toString()'],
                correctIndex: 2,
                explanation: '稳定的唯一 id（如 item.id）是最佳选择。index 在排序/插入时导致错误复用；Math.random() 每次渲染都变，导致全部重建；toString() 不保证唯一性。key 必须稳定且唯一。',
              },
              {
                question: '以下哪个不是 React 18+ 的新特性？',
                options: ['自动批处理（Automatic Batching）', '并发模式（Concurrent Mode）', 'useTransition', 'Class 组件支持 Hooks'],
                correctIndex: 3,
                explanation: 'Class 组件不支持 Hooks——Hooks 是函数组件的专属能力。React 16.8 引入 Hooks 时就规定 Hooks 只能在函数组件和自定义 Hook 中使用。',
              },
            ],
          },
        },
      ],
    },
  ],
}
