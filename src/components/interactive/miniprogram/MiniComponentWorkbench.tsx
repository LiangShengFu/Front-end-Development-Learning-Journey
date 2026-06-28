/**
 * MiniComponentWorkbench — 微信小程序自定义组件工作台
 *
 * 交互式展示 Component() 构造器的四大组成部分：properties / data / methods / lifetimes。
 * 以 custom-button 组件为例，可切换标签页查看每部分定义代码，右侧实时预览：
 * - properties：可调 text / type 属性，按钮实时更新
 * - data：count 计数器，点击触发递增
 * - methods：handleTap 方法触发 triggerEvent 的事件日志
 * - lifetimes：attached → detached 生命周期触发时间线
 *
 * ⚠️ 教学模拟：使用 React hooks 模拟微信小程序 Component() 的行为。
 */
import { useState } from 'react'
import type {
  MiniComponentWorkbenchData,
  MiniComponentSpec,
  MiniComponentTab,
} from '../../../lib/miniprogram-visualization-types'
import { cn } from '../../../lib/utils'

interface MiniComponentWorkbenchProps {
  data?: MiniComponentWorkbenchData
}

/** 默认组件规格 */
const DEFAULT_SPECS: MiniComponentSpec[] = [
  {
    id: 'properties',
    label: 'properties',
    description: '组件对外属性，父组件通过 WXML 传入。',
    code: `Component({
  properties: {
    text: { type: String, value: '按钮' },
    type: { type: String, value: 'primary' }
  }
})`,
    fields: [
      { name: 'text', type: 'String', defaultValue: "'按钮'", description: '按钮显示文本' },
      { name: 'type', type: 'String', defaultValue: "'primary'", description: '按钮类型：primary / default / warn' },
    ],
  },
  {
    id: 'data',
    label: 'data',
    description: '组件内部数据，仅组件自身可读写。',
    code: `Component({
  data: { count: 0 }
})`,
    fields: [{ name: 'count', type: 'Number', defaultValue: '0', description: '点击计数器' }],
  },
  {
    id: 'methods',
    label: 'methods',
    description: '组件方法，可通过 triggerEvent 向父组件抛出事件。',
    code: `Component({
  methods: {
    handleTap() {
      this.setData({ count: this.data.count + 1 })
      this.triggerEvent('tap', { count: this.data.count })
    }
  }
})`,
    fields: [{ name: 'handleTap', type: 'Function', defaultValue: '—', description: '点击处理，递增 count 并抛出 tap 事件' }],
  },
  {
    id: 'lifetimes',
    label: 'lifetimes',
    description: '组件生命周期钩子，在组件实例进入/离开不同阶段时触发。',
    code: `Component({
  lifetimes: {
    attached() { console.log('组件挂载到页面') },
    detached() { console.log('组件从页面卸载') }
  }
})`,
    fields: [
      { name: 'attached', type: 'Function', defaultValue: '—', description: '组件进入页面节点树时触发' },
      { name: 'ready', type: 'Function', defaultValue: '—', description: '组件布局完成时触发' },
      { name: 'detached', type: 'Function', defaultValue: '—', description: '组件离开页面节点树时触发' },
    ],
  },
]

const TAB_ORDER: MiniComponentTab[] = ['properties', 'data', 'methods', 'lifetimes']

export function MiniComponentWorkbench({ data }: MiniComponentWorkbenchProps) {
  const specs = data?.specs ?? DEFAULT_SPECS
  const [tab, setTab] = useState<MiniComponentTab>(specs[0]?.id ?? 'properties')
  const active = specs.find((s) => s.id === tab) ?? specs[0]

  // 模拟 properties 状态
  const [text, setText] = useState('按钮')
  const [btnType, setBtnType] = useState<'primary' | 'default' | 'warn'>('primary')
  // 模拟 data 状态
  const [count, setCount] = useState(0)
  // 模拟 methods 事件日志
  const [events, setEvents] = useState<string[]>([])
  // 模拟 lifetimes 时间线
  const [lifecycle, setLifecycle] = useState<{ stage: string; ts: number }[]>([])
  const [mounted, setMounted] = useState(false)

  /** 触发 handleTap */
  const fireTap = () => {
    setCount((c) => c + 1)
    const next = count + 1
    const ts = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    setEvents((prev) => [`[${ts}] triggerEvent('tap', { count: ${next} })`, ...prev].slice(0, 5))
  }

  /** 模拟组件挂载/卸载，记录生命周期 */
  const toggleMount = () => {
    if (!mounted) {
      setMounted(true)
      const ts = Date.now()
      setLifecycle([{ stage: 'attached · 组件挂载', ts }])
      // ready 紧随其后
      setTimeout(() => setLifecycle((prev) => [...prev, { stage: 'ready · 布局完成', ts: Date.now() }]), 300)
    } else {
      setMounted(false)
      setLifecycle((prev) => [...prev, { stage: 'detached · 组件卸载', ts: Date.now() }])
    }
  }

  /** 重置 */
  const reset = () => {
    setText('按钮')
    setBtnType('primary')
    setCount(0)
    setEvents([])
    setLifecycle([])
    setMounted(false)
  }

  /** 按钮类型样式 */
  const btnClass = cn(
    'rounded-pill px-lg py-sm font-mono text-body-sm transition-all',
    btnType === 'primary' && 'bg-[#07c160] text-white',
    btnType === 'default' && 'border border-hairline bg-canvas-card text-ink',
    btnType === 'warn' && 'bg-amber-500 text-white',
  )

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：使用 React hooks 模拟微信小程序 Component() 的行为。
      </div>

      {/* 标签页切换 */}
      <div className="flex flex-wrap gap-sm">
        {TAB_ORDER.map((t) => {
          const spec = specs.find((s) => s.id === t)
          if (!spec) return null
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
                tab === t
                  ? 'border-[#07c160] bg-[#07c160]/10 text-[#07c160]'
                  : 'border-hairline text-body-mid hover:border-body-mid',
              )}
            >
              {spec.label}
            </button>
          )
        })}
      </div>
      <p className="text-body-sm text-body-mid">{active?.description}</p>

      {/* 代码 + 预览 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            Component() 定义
          </h4>
          <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink">
            <code>{active?.code}</code>
          </pre>
          {active?.fields.length ? (
            <div className="mt-md overflow-hidden rounded-sm border border-hairline">
              <table className="w-full font-mono text-caption-mono-sm">
                <thead className="bg-canvas-soft text-body-mid">
                  <tr>
                    <th className="px-md py-sm text-left">字段</th>
                    <th className="px-md py-sm text-left">类型</th>
                    <th className="px-md py-sm text-left">默认值</th>
                    <th className="px-md py-sm text-left">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {active.fields.map((f) => (
                    <tr key={f.name} className="border-t border-hairline">
                      <td className="px-md py-sm text-[#07c160]">{f.name}</td>
                      <td className="px-md py-sm text-body-mid">{f.type}</td>
                      <td className="px-md py-sm text-body-mid">{f.defaultValue}</td>
                      <td className="px-md py-sm text-ink">{f.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>

        <div>
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            实时效果预览
          </h4>
          <div className="rounded-sm border border-hairline bg-canvas-card p-md">
            {tab === 'properties' && (
              <div className="space-y-md">
                <button type="button" className={btnClass}>{text}</button>
                <div className="space-y-sm">
                  <label className="block font-mono text-caption-mono-sm text-body-mid">
                    text
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="mt-xs block w-full rounded-sm border border-hairline bg-canvas-soft px-sm py-xs font-mono text-body-sm text-ink focus:border-[#07c160] focus:outline-none"
                    />
                  </label>
                  <label className="block font-mono text-caption-mono-sm text-body-mid">
                    type
                    <select
                      value={btnType}
                      onChange={(e) => setBtnType(e.target.value as typeof btnType)}
                      className="mt-xs block w-full rounded-sm border border-hairline bg-canvas-soft px-sm py-xs font-mono text-body-sm text-ink focus:border-[#07c160] focus:outline-none"
                    >
                      <option value="primary">primary</option>
                      <option value="default">default</option>
                      <option value="warn">warn</option>
                    </select>
                  </label>
                </div>
              </div>
            )}

            {tab === 'data' && (
              <div className="space-y-md text-center">
                <div className="font-mono text-display-md font-bold text-[#07c160]">{count}</div>
                <button
                  type="button"
                  onClick={() => setCount((c) => c + 1)}
                  className="rounded-pill bg-[#07c160] px-lg py-sm font-mono text-body-sm text-white"
                >
                  count++
                </button>
                <p className="font-mono text-caption-mono-sm text-body-mid">data.count = {count}</p>
              </div>
            )}

            {tab === 'methods' && (
              <div className="space-y-md">
                <button
                  type="button"
                  onClick={fireTap}
                  className="rounded-pill bg-[#07c160] px-lg py-sm font-mono text-body-sm text-white"
                >
                  调用 handleTap()
                </button>
                <div className="font-mono text-caption-mono-sm text-body-mid">事件日志（最近 5 条）：</div>
                <pre className="min-h-[80px] overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-sm font-mono text-caption-mono-sm text-ink">
                  <code>{events.length ? events.join('\n') : '// 暂无事件，点击按钮触发 handleTap'}</code>
                </pre>
              </div>
            )}

            {tab === 'lifetimes' && (
              <div className="space-y-md">
                <div className="flex gap-sm">
                  <button
                    type="button"
                    onClick={toggleMount}
                    className="rounded-pill border border-[#07c160] bg-[#07c160]/10 px-lg py-sm font-mono text-caption-mono-sm text-[#07c160]"
                  >
                    {mounted ? '卸载组件' : '挂载组件'}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-pill border border-hairline px-lg py-sm font-mono text-caption-mono-sm text-body-mid"
                  >
                    重置
                  </button>
                </div>
                <div className="space-y-sm">
                  {lifecycle.length ? (
                    lifecycle.map((l, i) => (
                      <div key={i} className="flex items-center gap-sm font-mono text-caption-mono-sm">
                        <span className="rounded-pill bg-[#07c160]/15 px-sm py-xs text-[#07c160]">{i + 1}</span>
                        <span className="text-ink">{l.stage}</span>
                        <span className="text-body-mid">{new Date(l.ts).toLocaleTimeString('zh-CN', { hour12: false })}</span>
                      </div>
                    ))
                  ) : (
                    <p className="font-mono text-caption-mono-sm text-body-mid">// 点击「挂载组件」观察生命周期</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
