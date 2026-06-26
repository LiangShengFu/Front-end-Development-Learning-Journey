/**
 * VueComponentSandbox — SFC 组件通信可视化沙盒
 */
import { useState } from 'react'
import type { CommunicationFlow, VueComponentSandboxData } from '../../../lib/vue-visualization-types'
import { cn } from '../../../lib/utils'

interface VueComponentSandboxProps {
  data?: VueComponentSandboxData
}

const FLOW_CONFIG: Record<
  CommunicationFlow,
  { label: string; color: string; description: string }
> = {
  props: {
    label: 'Props',
    color: '#42b883',
    description: '父 → 子：数据通过 props 向下传递（单向数据流）',
  },
  emits: {
    label: 'Emits',
    color: '#f97316',
    description: '子 → 父：子组件通过 emit 事件向上通知父组件',
  },
  slots: {
    label: 'Slots',
    color: '#3b82f6',
    description: '父 → 子：父组件通过 slot 向子组件注入内容（作用域插槽可回传数据）',
  },
  'provide-inject': {
    label: 'Provide/Inject',
    color: '#a855f7',
    description: '祖先 → 后代：跨层级依赖注入，跳过中间组件',
  },
}

const COMPONENTS = [
  { id: 'user-card', label: 'UserCard', level: 0, role: '父组件' },
  { id: 'user-info', label: 'UserInfo', level: 1, role: '子组件' },
  { id: 'user-avatar', label: 'UserAvatar', level: 2, role: '孙组件' },
]

function isHighlighted(flow: CommunicationFlow, level: number): boolean {
  switch (flow) {
    case 'props':
      return level > 0
    case 'emits':
      return level > 0 && level < 2
    case 'slots':
      return level > 0
    case 'provide-inject':
      return level === 0 || level === 2
    default:
      return false
  }
}

function Connector({
  flow,
  fromLevel,
  toLevel,
}: {
  flow: CommunicationFlow
  fromLevel: number
  toLevel: number
}) {
  const config = FLOW_CONFIG[flow]
  const indent = toLevel * 40 + 20

  if (flow === 'provide-inject' && fromLevel === 0 && toLevel === 2) {
    return (
      <div className="relative my-sm h-12" style={{ marginLeft: indent - 40 }}>
        <div
          className="absolute left-0 top-1/2 h-[2px] w-[calc(100%-40px)] -translate-y-1/2 border-t-2 border-dashed"
          style={{ borderColor: config.color }}
        />
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-pill px-sm py-xs font-mono text-caption-mono-sm"
          style={{ color: config.color, backgroundColor: `${config.color}18` }}
        >
          provide → inject（跨层）
        </span>
      </div>
    )
  }

  const label =
    flow === 'props' ? '↓ props' : flow === 'emits' ? '↑ emit' : flow === 'slots' ? '↓ slot' : ''

  return (
    <div className="flex h-10 items-center" style={{ marginLeft: indent }}>
      <div
        className={cn('h-8 w-[2px]', flow === 'slots' ? 'border-l-2 border-dashed' : '')}
        style={{
          backgroundColor: flow !== 'slots' ? config.color : undefined,
          borderColor: flow === 'slots' ? config.color : undefined,
        }}
      />
      {label && (
        <span
          className="ml-sm rounded-pill px-sm py-xs font-mono text-caption-mono-sm"
          style={{ color: config.color, backgroundColor: `${config.color}18` }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export function VueComponentSandbox({ data: _data }: VueComponentSandboxProps) {
  const [activeFlow, setActiveFlow] = useState<CommunicationFlow>('props')
  const flow = FLOW_CONFIG[activeFlow]

  return (
    <div className="isolate space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：此演示用 React 组件模拟 Vue SFC 的 Props/Emits/Slots/provide-inject 通信模式。
      </div>

      <div className="flex flex-wrap gap-sm" role="tablist" aria-label="通信模式">
        {(Object.keys(FLOW_CONFIG) as CommunicationFlow[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeFlow === key}
            onClick={() => setActiveFlow(key)}
            className={cn(
              'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
              activeFlow === key ? 'text-white' : 'border-hairline text-body-mid hover:border-body-mid',
            )}
            style={
              activeFlow === key
                ? { backgroundColor: FLOW_CONFIG[key].color, borderColor: FLOW_CONFIG[key].color }
                : undefined
            }
          >
            {FLOW_CONFIG[key].label}
          </button>
        ))}
      </div>

      <p className="text-body-sm text-body">{flow.description}</p>

      <div className="overflow-x-auto rounded-sm border border-hairline bg-canvas-card p-lg sm:p-xl">
        <div className="min-w-[280px]">
          {COMPONENTS.map((comp, i) => {
            const prev = COMPONENTS[i - 1]
            const showProvideSkip = activeFlow === 'provide-inject' && comp.level === 2

            return (
              <div key={comp.id}>
                {i > 0 && !showProvideSkip && prev && (
                  <Connector flow={activeFlow} fromLevel={prev.level} toLevel={comp.level} />
                )}
                {showProvideSkip && (
                  <Connector flow="provide-inject" fromLevel={0} toLevel={2} />
                )}

                <div style={{ marginLeft: comp.level * 40 }} className="py-xs">
                  <div
                    className={cn(
                      'inline-flex max-w-full flex-col rounded-sm border-2 bg-canvas-soft px-lg py-md transition-colors',
                      isHighlighted(activeFlow, comp.level)
                        ? 'shadow-sm ring-2 ring-offset-2 ring-offset-canvas-card'
                        : 'opacity-55',
                    )}
                    style={{
                      borderColor: flow.color,
                      ...(isHighlighted(activeFlow, comp.level)
                        ? { ['--tw-ring-color' as string]: `${flow.color}55` }
                        : {}),
                    }}
                  >
                    <span className="font-mono text-body-md text-ink">{comp.label}</span>
                    <span className="mt-xs font-mono text-caption-mono-sm text-body-mid">{comp.role}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-xl grid grid-cols-1 gap-sm border-t border-hairline pt-lg sm:grid-cols-3">
          {[
            { tag: '<script setup>', desc: 'Composition API 逻辑' },
            { tag: '<template>', desc: '声明式 UI 模板' },
            { tag: '<style scoped>', desc: '组件级样式隔离' },
          ].map(({ tag, desc }) => (
            <div key={tag} className="rounded-sm border border-hairline bg-canvas-soft px-md py-sm text-center">
              <code className="font-mono text-body-sm text-[#42b883]">{tag}</code>
              <p className="mt-xs text-caption-mono-sm text-body-mid">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
