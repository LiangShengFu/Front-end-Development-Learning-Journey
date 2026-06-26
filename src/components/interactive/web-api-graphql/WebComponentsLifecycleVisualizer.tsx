/**
 * WebComponentsLifecycleVisualizer — Web Components 生命周期可视化
 *
 * 展示自定义元素的 5 个生命周期回调：
 * - constructor：实例创建时调用，用于初始化状态与 Shadow DOM。
 * - connectedCallback：插入文档时调用，用于添加副作用与渲染。
 * - disconnectedCallback：从文档移除时调用，用于清理副作用。
 * - attributeChangedCallback：observedAttributes 中属性变化时调用。
 * - adoptedCallback：通过 adoptNode 移到新文档时调用。
 *
 * 交互：点击生命周期按钮「触发」对应回调，左侧自定义元素卡片实时
 * 切换状态（created/connected/disconnected/attribute-changed/adopted），
 * 右侧代码示例同步切换，下方触发日志按时间倒序记录最近 10 条。
 *
 * ⚠️ 教学模拟：不真实注册 customElements.define，避免污染全局。
 */
import { useState } from 'react'
import type {
  WebComponentsLifecycleData,
  LifecyclePhase,
  LifecyclePhaseId,
} from '../../../lib/web-api-graphql-visualization-types'
import { cn } from '../../../lib/utils'

interface WebComponentsLifecycleVisualizerProps {
  data?: WebComponentsLifecycleData
}

/** 默认生命周期阶段数据 */
const DEFAULT_PHASES: LifecyclePhase[] = [
  {
    id: 'constructor',
    name: 'constructor',
    trigger: 'new MyElement() 或文档解析时创建实例',
    useCase: '初始化状态、附加 Shadow DOM、设置默认属性。不可读取属性或访问子节点。',
    codeSnippet: `class MyElement extends HTMLElement {
  constructor() {
    super() // 必须先调用 super()
    this._count = 0
    // 附加 Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = '<p>hello</p>'
  }
}`,
    color: '#1a6cff',
  },
  {
    id: 'connectedCallback',
    name: 'connectedCallback',
    trigger: '元素插入到 document（append/insertBefore）',
    useCase: '启动副作用：定时器、事件监听、数据请求。此时可访问属性与父节点。',
    codeSnippet: `connectedCallback() {
  this._timer = setInterval(() => {
    this._count++
    this.render()
  }, 1000)
  window.addEventListener('resize', this.onResize)
}`,
    color: '#07c160',
  },
  {
    id: 'disconnectedCallback',
    name: 'disconnectedCallback',
    trigger: '元素从 document 中移除（remove/removeChild）',
    useCase: '清理副作用：清除定时器、移除监听器、释放资源，避免内存泄漏。',
    codeSnippet: `disconnectedCallback() {
  clearInterval(this._timer)
  window.removeEventListener('resize', this.onResize)
  this._timer = null
}`,
    color: '#ef4444',
  },
  {
    id: 'attributeChangedCallback',
    name: 'attributeChangedCallback',
    trigger: 'observedAttributes 中的属性被 set/remove/change',
    useCase: '响应属性变化并更新渲染。必须声明 static observedAttributes。',
    codeSnippet: `static get observedAttributes() {
  return ['count', 'theme']
}
attributeChangedCallback(name, oldVal, newVal) {
  if (name === 'count') {
    this._count = Number(newVal)
    this.render()
  }
}`,
    color: '#f59e0b',
  },
  {
    id: 'adoptedCallback',
    name: 'adoptedCallback',
    trigger: 'document.adoptNode 将元素移到新文档',
    useCase: '跨 document（如 iframe）迁移时重建上下文。日常开发极少触发。',
    codeSnippet: `adoptedCallback() {
  // 跨 document 迁移时重建依赖
  // 例如重新绑定到新 document 的全局事件
  this._ownerDoc = this.ownerDocument
}`,
    color: '#a78bfa',
  },
]

/** 状态标签映射 */
const STATE_LABEL: Record<LifecyclePhaseId, string> = {
  constructor: '已创建 · created',
  connectedCallback: '已连接 · connected',
  disconnectedCallback: '已断开 · disconnected',
  attributeChangedCallback: '属性变化 · attribute-changed',
  adoptedCallback: '已迁移 · adopted',
}

interface LogEntry {
  time: string
  phase: LifecyclePhaseId
}

export function WebComponentsLifecycleVisualizer({ data }: WebComponentsLifecycleVisualizerProps) {
  const phases = data?.phases ?? DEFAULT_PHASES
  const elementText = data?.elementText ?? '<my-element>'
  const overviewNote =
    data?.overviewNote ??
    'Web Components 通过 Custom Elements 规范提供 5 个生命周期回调，让原生元素具备组件化能力。点击下方按钮模拟各阶段的触发，观察元素状态与代码。'

  const [activePhase, setActivePhase] = useState<LifecyclePhaseId>('constructor')
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: new Date().toLocaleTimeString(), phase: 'constructor' },
  ])

  const selected = phases.find((p) => p.id === activePhase) ?? phases[0]

  const handleTrigger = (phase: LifecyclePhaseId) => {
    setActivePhase(phase)
    const time = new Date().toLocaleTimeString()
    setLogs((prev) => [{ time, phase }, ...prev].slice(0, 10))
  }

  return (
    <div className="space-y-lg">
      {/* 生命周期总览说明 */}
      <div className="rounded-sm border-l-4 border-[#1a6cff] bg-[#1a6cff]/8 px-md py-sm">
        <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#1a6cff]">
          Custom Elements 生命周期
        </div>
        <p className="mt-xs text-caption text-ink">{overviewNote}</p>
      </div>

      {/* 生命周期阶段切换按钮 */}
      <div className="flex flex-wrap gap-xs">
        {phases.map((phase) => {
          const isActive = activePhase === phase.id
          return (
            <button
              key={phase.id}
              onClick={() => handleTrigger(phase.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: phase.color } : undefined}
            >
              {phase.name}
            </button>
          )
        })}
      </div>

      {/* 双栏：左 自定义元素状态 + 右 代码示例 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        {/* 自定义元素状态卡片 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center justify-between">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              自定义元素状态
            </span>
            <span
              className="rounded-pill px-sm py-xxs font-mono text-caption-mono-xs text-white"
              style={{ backgroundColor: selected.color }}
            >
              {STATE_LABEL[selected.id]}
            </span>
          </div>
          {/* 元素 DOM 树可视化 */}
          <div className="flex flex-col items-center justify-center rounded-sm border border-hairline bg-[repeating-conic-gradient(#f3f4f6_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-lg">
            <div
              className="rounded-md border-2 px-xl py-lg font-mono text-body-sm shadow-sm transition-all"
              style={{ borderColor: selected.color, color: selected.color }}
            >
              {elementText}
            </div>
            <div className="mt-sm font-mono text-caption-mono-xs text-body-mid">
              ↑ 当前生命周期回调
            </div>
          </div>
          <div className="mt-sm space-y-xs">
            <div>
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                触发时机
              </span>
              <p className="mt-xs text-caption text-ink">{selected.trigger}</p>
            </div>
            <div>
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                典型用途
              </span>
              <p className="mt-xs text-caption text-ink">{selected.useCase}</p>
            </div>
          </div>
        </div>

        {/* 代码示例区 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center gap-sm">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              代码示例
            </span>
            <span className="rounded-pill bg-canvas-soft px-sm py-xxs font-mono text-caption-mono-xs text-ink">
              {selected.name}()
            </span>
          </div>
          <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
            <code>{selected.codeSnippet}</code>
          </pre>
        </div>
      </div>

      {/* 触发日志面板 */}
      <div className="rounded-md border border-hairline bg-canvas-card p-md">
        <div className="mb-sm flex items-center justify-between">
          <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
            触发日志（最近 10 条）
          </span>
          <button
            onClick={() => setLogs([])}
            className="rounded-sm border border-hairline px-sm py-xxs font-mono text-caption-mono-xs text-body-mid transition-colors hover:border-ink/30 hover:text-ink"
          >
            清空
          </button>
        </div>
        {logs.length === 0 ? (
          <p className="text-caption text-body-mid">暂无触发记录，点击上方生命周期按钮开始模拟。</p>
        ) : (
          <div className="space-y-xs">
            {logs.map((log, idx) => {
              const phaseMeta = phases.find((p) => p.id === log.phase)
              return (
                <div
                  key={`${log.time}-${idx}`}
                  className="flex items-center gap-sm font-mono text-caption-mono-xs"
                >
                  <span className="text-body-mid">[{log.time}]</span>
                  <span
                    className="rounded-pill px-sm py-xxs text-white"
                    style={{ backgroundColor: phaseMeta?.color ?? '#6b7280' }}
                  >
                    {log.phase}()
                  </span>
                  {idx === 0 && (
                    <span className="text-body-mid">← 最近一次触发</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
