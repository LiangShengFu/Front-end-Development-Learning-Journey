/**
 * PatternFactory — 设计模式工厂
 *
 * 并排展示 HOC / Render Props / Custom Hooks（三种逻辑复用模式）
 * 解决同一问题的不同实现，可切换查看。
 * 问题场景：「鼠标位置追踪」——同一个需求，三种模式三种实现。
 *
 * 对应docx中演示 #12
 */
import { useState } from 'react'
import type { PatternFactoryData, PatternDemo } from '../../../lib/react-advanced-visualization-types'
import { CodeBlock } from '../../ui/CodeBlock'
import { cn } from '../../../lib/utils'

interface PatternFactoryProps {
  data?: PatternFactoryData
}

const DEFAULT_PATTERNS: PatternDemo[] = [
  {
    id: 'hoc',
    label: 'HOC 模式',
    description: '高阶组件接收一个组件，返回一个增强后的新组件。通过包裹注入额外 props。',
    code: `// HOC：高阶组件 — 接收 Component，返回增强后的新组件
function withMousePosition(WrappedComponent) {
  return class extends React.Component {
    state = { x: 0, y: 0 };

    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouse);
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouse);
    }

    handleMouse = (e) => {
      this.setState({ x: e.clientX, y: e.clientY });
    };

    render() {
      // 将鼠标位置作为 props 注入
      return <WrappedComponent {...this.props} mouse={this.state} />;
    }
  };
}

// 使用：包裹组件即可获得 mouse prop
const MouseTracker = withMousePosition(({ mouse }) => (
  <div>鼠标位置: {mouse.x}, {mouse.y}</div>
));`,
    usage: `// 使用 HOC 增强任意组件
const Display = withMousePosition(MyComponent);
const Logger = withMousePosition(AnotherComponent);

// 优点：使用简单，只需包裹
// 缺点：多层嵌套（Wrapper Hell），props 来源不清晰`,
    pros: ['使用简单，只需包裹组件', '可链式组合（withRouter(withTheme(Comp))）', '兼容类组件和函数组件'],
    cons: ['Wrapper Hell（多层嵌套）', 'props 来源不清晰（隐式注入）', 'refs 转发复杂（需 forwardRef）', '命名冲突风险'],
  },
  {
    id: 'render-props',
    label: 'Render Props 模式',
    description: '组件通过一个函数 prop（通常叫 render）告知要渲染什么，将共享状态通过回调传给子组件。',
    code: `// Render Props：通过 render 函数 prop 共享状态
class MousePosition extends React.Component {
  state = { x: 0, y: 0 };

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouse);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouse);
  }

  handleMouse = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };

  render() {
    // 调用 render prop，传入当前状态
    return this.props.render(this.state);
  }
}

// 使用：通过 render prop 自定义渲染
<MousePosition render={({ x, y }) => (
  <div>鼠标位置: {x}, {y}</div>
)} />`,
    usage: `// 使用 Render Props 自定义渲染
<MousePosition render={mouse => <Display mouse={mouse} />} />
<MousePosition render={mouse => <Logger mouse={mouse} />} />

// 优点：props 来源清晰
// 缺点：回调嵌套，JSX 可读性差`,
    pros: ['props 来源清晰（显式传参）', '无需担心命名冲突', '灵活性高（可自定义渲染）', '类型推导较好'],
    cons: ['回调嵌套深（多层 Render Props）', 'JSX 可读性较差', '函数每次创建可能触发重渲染', '仅限 React 组件内使用'],
  },
  {
    id: 'custom-hook',
    label: 'Custom Hook 模式',
    description: '自定义 Hook 是以 use 开头的函数，可在内部调用其他 Hook，返回状态和操作。React 16.8+ 推荐方式。',
    code: `// Custom Hook：以 use 开头，内部使用其他 Hooks
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return position; // 返回状态
}

// 使用：在函数组件中调用 Hook
function MouseTracker() {
  const { x, y } = useMousePosition();
  return <div>鼠标位置: {x}, {y}</div>;
}`,
    usage: `// 使用 Custom Hook 复用逻辑
function Display() {
  const mouse = useMousePosition();
  return <div>{mouse.x}, {mouse.y}</div>;
}

function Logger() {
  const mouse = useMousePosition();
  useEffect(() => console.log(mouse), [mouse]);
  return null;
}

// 优点：最简洁，无嵌套
// 缺点：仅限函数组件使用`,
    pros: ['最简洁（无嵌套、无包裹）', '组合自由（可调用多个 Hook）', '支持 SSR / Suspense', 'TypeScript 类型推导最佳', 'React 官方推荐'],
    cons: ['仅限函数组件使用', '需遵守 Hooks 规则（不能条件调用）', '调试时调用栈较深'],
  },
]

const DEFAULT_PROBLEM = '鼠标位置追踪：同一需求，三种逻辑复用模式的不同实现'

export function PatternFactory({ data }: PatternFactoryProps) {
  const patterns = data?.patterns ?? DEFAULT_PATTERNS
  const problemStatement = data?.problemStatement ?? DEFAULT_PROBLEM
  const [activeId, setActiveId] = useState(patterns[0]?.id ?? 'hoc')
  const activePattern = patterns.find((p) => p.id === activeId) ?? patterns[0]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 问题描述 */}
      <div className="mb-xl rounded-sm border border-accent-sunset/20 bg-accent-sunset/5 p-lg">
        <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          统一问题场景
        </div>
        <p className="text-body-md text-ink">{problemStatement}</p>
      </div>

      {/* 模式切换 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        {patterns.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            className={cn(
              'rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
              activeId === p.id
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 模式说明 */}
      <p className="mb-lg text-body-sm text-body">{activePattern.description}</p>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-2">
        {/* 模式实现代码 */}
        <div>
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            模式实现
          </div>
          <CodeBlock code={activePattern.code} language="javascript" />
        </div>

        {/* 使用示例 */}
        <div>
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
            使用示例
          </div>
          <CodeBlock code={activePattern.usage} language="javascript" />
        </div>
      </div>

      {/* 优缺点对比 */}
      <div className="mt-xl grid grid-cols-1 gap-lg sm:grid-cols-2">
        <div className="rounded-sm border border-accent-dusk/30 bg-accent-dusk/5 p-lg">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
            ✓ 优点
          </div>
          <ul className="space-y-xs">
            {activePattern.pros.map((pro, i) => (
              <li key={i} className="flex gap-xs text-body-sm text-body">
                <span className="text-accent-dusk">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-sm border border-red-500/30 bg-red-500/5 p-lg">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-red-500">
            ✗ 缺点
          </div>
          <ul className="space-y-xs">
            {activePattern.cons.map((con, i) => (
              <li key={i} className="flex gap-xs text-body-sm text-body">
                <span className="text-red-500">✗</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 推荐建议 */}
      <div className="mt-xl rounded-sm border border-accent-sunset/20 bg-accent-sunset/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          💡 React 官方推荐：新项目优先使用 Custom Hooks 模式。
          HOC 和 Render Props 主要在维护旧代码或使用第三方库时遇到。
          Custom Hooks 在组合性、可读性、类型安全上均优于前两者。
        </p>
      </div>
    </div>
  )
}
