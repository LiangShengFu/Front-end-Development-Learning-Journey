/**
 * RNArchitectureComparator — React Native 新旧架构对比
 *
 * 可切换旧架构（Bridge 序列化异步通信）与新架构（Fabric + TurboModules + JSI 同步通信），
 * 展示数据流节点与通信延迟差异。
 *
 * ⚠️ 教学模拟：用静态流程图展示通信路径，不执行真实 RN 运行时。
 */
import { useEffect, useRef, useState } from 'react'
import type {
  RNArchitectureComparatorData,
  RNArchitectureSpec,
  RNArchitectureId,
} from '../../../lib/cross-platform-visualization-types'
import { cn } from '../../../lib/utils'

interface RNArchitectureComparatorProps {
  data?: RNArchitectureComparatorData
}

/** 默认架构数据 */
const DEFAULT_ARCHITECTURES: RNArchitectureSpec[] = [
  {
    id: 'legacy',
    label: '旧架构（Bridge）',
    description: 'JS 线程与原生线程通过异步 Bridge 通信，数据需 JSON 序列化/反序列化，跨线程通信有延迟。',
    communication: '异步序列化通信',
    latencyMs: 8,
    isNew: false,
    nodes: [
      { id: 'js', label: 'JS 线程', sub: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.12)' },
      { id: 'bridge', label: 'Bridge', sub: '序列化队列', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
      { id: 'shadow', label: 'Shadow 线程', sub: 'Yoga 布局', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
      { id: 'native', label: '原生线程', sub: 'UI 渲染', color: '#07c160', bg: 'rgba(7,193,96,0.12)' },
    ],
    edges: [
      { from: 'js', to: 'bridge', label: '序列化', async: true },
      { from: 'bridge', to: 'shadow', label: '异步分发', async: true },
      { from: 'bridge', to: 'native', label: '异步分发', async: true },
    ],
  },
  {
    id: 'new',
    label: '新架构（Fabric + TurboModules）',
    description: 'JSI（JavaScript Interface）实现 JS 与原生直接同步通信，无需序列化。Fabric 新渲染器直接对接 C++ 层。',
    communication: 'JSI 同步通信',
    latencyMs: 1,
    isNew: true,
    nodes: [
      { id: 'js', label: 'JS 线程', sub: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.12)' },
      { id: 'jsi', label: 'JSI', sub: 'C++ 直接调用', color: '#1a6cff', bg: 'rgba(26,108,255,0.12)' },
      { id: 'fabric', label: 'Fabric', sub: '新渲染器', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
      { id: 'native', label: '原生线程', sub: 'UI 渲染', color: '#07c160', bg: 'rgba(7,193,96,0.12)' },
    ],
    edges: [
      { from: 'js', to: 'jsi', label: '同步调用' },
      { from: 'jsi', to: 'fabric', label: '同步' },
      { from: 'jsi', to: 'native', label: '同步（TurboModules）' },
    ],
  },
]

/** 通信模拟阶段 */
type Phase = 'idle' | 'active' | 'done'

export function RNArchitectureComparator({ data }: RNArchitectureComparatorProps) {
  const architectures = data?.architectures ?? DEFAULT_ARCHITECTURES
  const [archId, setArchId] = useState<RNArchitectureId>('new')
  const [phase, setPhase] = useState<Phase>('idle')
  const [runCount, setRunCount] = useState(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const arch = architectures.find((a) => a.id === archId) ?? architectures[0]

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const trigger = () => {
    clearTimers()
    setPhase('idle')
    const t1 = setTimeout(() => setPhase('active'), 50)
    const t2 = setTimeout(() => {
      setPhase('done')
      setRunCount((n) => n + 1)
    }, 50 + arch.latencyMs * 20)
    timersRef.current = [t1, t2]
  }

  useEffect(() => () => clearTimers(), [])

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：用静态流程图与延迟模拟展示通信差异，不执行真实 RN Bridge / JSI 调用。
      </div>

      {/* 架构切换 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        {architectures.map((a) => (
          <button
            key={a.id}
            onClick={() => {
              setArchId(a.id)
              setPhase('idle')
            }}
            className={cn(
              'rounded-sm border p-md text-left transition-all',
              archId === a.id ? 'border-current' : 'border-hairline'
            )}
            style={{
              borderColor: archId === a.id ? a.nodes[1].color : undefined,
              background: archId === a.id ? a.nodes[1].bg : 'transparent',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-body-sm font-bold" style={{ color: a.nodes[1].color }}>
                {a.label}
              </span>
              {a.isNew && (
                <span className="rounded-pill bg-[#07c160]/15 px-sm py-xs text-caption-mono-sm text-[#07c160]">新架构</span>
              )}
            </div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">{a.description}</p>
          </button>
        ))}
      </div>

      {/* 数据流可视化 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <div className="mb-md flex items-center justify-between">
          <h4 className="font-mono text-body-sm text-body-hi">通信数据流</h4>
          <button
            onClick={trigger}
            className="rounded-pill px-md py-xs text-caption-mono-sm text-canvas transition-opacity hover:opacity-80"
            style={{ background: arch.nodes[1].color }}
          >
            触发调用
          </button>
        </div>

        {/* 节点流程图 */}
        <div className="flex flex-wrap items-center justify-center gap-sm">
          {arch.nodes.map((node, i) => (
            <div key={node.id} className="flex items-center gap-sm">
              <div
                className={cn(
                  'rounded-sm border px-md py-sm text-center transition-all',
                  phase === 'active' && 'scale-105'
                )}
                style={{
                  borderColor: node.color,
                  background: phase !== 'idle' ? node.bg : 'transparent',
                  minWidth: '100px',
                }}
              >
                <div className="font-mono text-body-sm font-bold" style={{ color: node.color }}>
                  {node.label}
                </div>
                {node.sub && <div className="text-caption-mono-sm text-body-mid">{node.sub}</div>}
              </div>
              {/* 连线 */}
              {i < arch.nodes.length - 1 && arch.edges.find((e) => e.from === node.id) && (
                <div className="flex flex-col items-center">
                  <div
                    className={cn('h-px transition-all', phase === 'active' ? 'w-12' : 'w-8')}
                    style={{ background: arch.edges.find((e) => e.from === node.id)?.async ? 'repeating-linear-gradient(90deg, #999 0, #999 3px, transparent 3px, transparent 6px)' : arch.nodes[1].color }}
                  />
                  <div className="text-caption-mono-sm text-body-mid">
                    {arch.edges.find((e) => e.from === node.id)?.label}
                    {arch.edges.find((e) => e.from === node.id)?.async && ' (异步)'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 延迟对比 */}
        <div className="mt-lg grid grid-cols-1 gap-md sm:grid-cols-3">
          <div className="rounded-sm bg-canvas-bg-inset p-sm text-center">
            <div className="text-caption-mono-sm text-body-mid">通信延迟</div>
            <div className="mt-xs font-mono text-body-lg font-bold" style={{ color: arch.nodes[1].color }}>
              {arch.latencyMs}ms
            </div>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm text-center">
            <div className="text-caption-mono-sm text-body-mid">通信方式</div>
            <div className="mt-xs font-mono text-body-sm text-body-hi">{arch.communication}</div>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm text-center">
            <div className="text-caption-mono-sm text-body-mid">模拟调用次数</div>
            <div className="mt-xs font-mono text-body-lg font-bold text-body-hi">{runCount}</div>
          </div>
        </div>
      </div>

      {/* 对比说明 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-md">
          <div className="font-mono text-body-sm font-bold text-[#b45309]">旧架构痛点</div>
          <ul className="mt-xs space-y-xs text-caption-mono-sm text-body-mid">
            <li>• Bridge 异步通信，JSON 序列化开销大</li>
            <li>• 三线程模型（JS / Shadow / Native）跨线程通信</li>
            <li>• 大列表滚动卡顿（异步批次渲染）</li>
            <li>• 手势响应延迟（需跨线程传递事件）</li>
          </ul>
        </div>
        <div className="rounded-sm border border-[#07c160]/30 bg-[#07c160]/8 p-md">
          <div className="font-mono text-body-sm font-bold text-[#07c160]">新架构优势</div>
          <ul className="mt-xs space-y-xs text-caption-mono-sm text-body-mid">
            <li>• JSI 同步调用，C++ 直接对接，无序列化</li>
            <li>• Fabric 渲染器支持同步布局与优先级</li>
            <li>• TurboModules 按需加载，启动更快</li>
            <li>• Concurrent Features 支持（React 18 并发）</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
