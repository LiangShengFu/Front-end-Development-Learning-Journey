/**
 * RSCPayloadFlow — RSC Payload 数据流图
 *
 * 可视化 React Server Component 的渲染输出——RSC Payload
 * （序列化的 JSX 树 + props 引用 + Client Component 占位符）
 * 如何从服务端流式传输到客户端。
 *
 * ⚠️ 教学模拟：简化版的 RSC Payload 格式，非真实 React 内部实现。
 *
 * 对应docx中演示 #3
 */
import { useState } from 'react'
import type { RSCPayloadFlowData } from '../../../lib/nextjs-visualization-types'
import { cn } from '../../../lib/utils'

interface RSCPayloadFlowProps {
  data?: RSCPayloadFlowData
}

const SERVER_NODES = [
  { id: 's1', label: 'Server Component 渲染', detail: 'async function Page() { ... }' },
  { id: 's2', label: '序列化为 RSC Payload', detail: 'J 标签格式（非 HTML）' },
  { id: 's3', label: '流式发送 chunks', detail: 'Content-Type: text/x-component' },
]

const CLIENT_NODES = [
  { id: 'c1', label: '接收 Payload chunks', detail: '逐步解析流式数据' },
  { id: 'c2', label: '反序列化构建 React 树', detail: 'Server 节点 → 已渲染内容' },
  { id: 'c3', label: 'Client Component 水合', detail: '占位符 → 交互组件' },
  { id: 'c4', label: 'Suspense 渐进替换', detail: 'fallback → 实际内容' },
]

const SAMPLE_PAYLOAD = `// RSC Payload 简化示意（流式 chunk）
0:["$","div",null,{"className":"page"}
1:["$","h1",null,{"children":"Hello RSC"}]
2:["$","$L","LikeButton",{"id":42}]
  ↑ $L = Client Component 占位符
3:I["./Counter.js",["Counter"]]
  ↑ I = Component 引用映射
4:["$","p",null,{"children":"服务端渲染的静态内容"}]`

export function RSCPayloadFlow({ data }: RSCPayloadFlowProps) {
  const mode = data?.mode ?? 'streaming'
  const [activeMode, setActiveMode] = useState<'streaming' | 'full'>(mode)
  const [streamProgress, setStreamProgress] = useState(0)

  const startStream = () => {
    setStreamProgress(0)
    const steps = [25, 50, 75, 100]
    steps.forEach((p, i) => {
      setTimeout(() => setStreamProgress(p), (i + 1) * 600)
    })
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 教学模拟声明 */}
      <div className="mb-lg rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 教学模拟：简化版的 RSC Payload 格式，非真实 React 内部实现。
        </p>
      </div>

      {/* 模式切换 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <div className="flex gap-xs rounded-sm border border-hairline p-xs">
          <button
            type="button"
            onClick={() => { setActiveMode('streaming'); setStreamProgress(0) }}
            className={cn(
              'rounded-sm px-md py-xs font-mono text-caption-mono-sm transition-colors',
              activeMode === 'streaming' ? 'bg-accent-sunset/20 text-accent-sunset' : 'text-body-mid',
            )}
          >
            流式传输（Streaming）
          </button>
          <button
            type="button"
            onClick={() => { setActiveMode('full'); setStreamProgress(100) }}
            className={cn(
              'rounded-sm px-md py-xs font-mono text-caption-mono-sm transition-colors',
              activeMode === 'full' ? 'bg-accent-sunset/20 text-accent-sunset' : 'text-body-mid',
            )}
          >
            完整传输（Full）
          </button>
        </div>
        {activeMode === 'streaming' && (
          <button type="button" onClick={startStream} className="btn-pill">
            ▶ 模拟流式传输
          </button>
        )}
        {activeMode === 'streaming' && (
          <span className="font-mono text-caption-mono-sm text-body-mid">
            传输进度：{streamProgress}%
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_auto_1fr]">
        {/* Server 端 */}
        <div className="rounded-sm border border-accent-sunset/20 bg-accent-sunset/5 p-lg">
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            🖥️ Server 端
          </div>
          <div className="space-y-sm">
            {SERVER_NODES.map((node, i) => (
              <div
                key={node.id}
                className={cn(
                  'rounded-sm border px-md py-sm transition-all duration-300',
                  activeMode === 'streaming' && streamProgress >= (i + 1) * 33
                    ? 'border-accent-sunset/40 bg-accent-sunset/10'
                    : 'border-hairline bg-canvas-card opacity-60',
                )}
              >
                <div className="font-mono text-caption-mono-sm text-ink">{node.label}</div>
                <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">{node.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 网络层 */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="font-mono text-display-xs text-accent-sunset">→</div>
            <div className={cn(
              'mt-sm rounded-pill px-md py-xs font-mono text-caption-mono-sm',
              streamProgress > 0 ? 'bg-accent-sunset/20 text-accent-sunset' : 'bg-canvas-mid text-body-mid',
            )}>
              {activeMode === 'streaming' ? `chunks ${streamProgress}%` : 'full payload'}
            </div>
            <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">
              {activeMode === 'streaming' ? 'text/x-component' : '完整 JSON'}
            </div>
          </div>
        </div>

        {/* Client 端 */}
        <div className="rounded-sm border border-accent-dusk/20 bg-accent-dusk/5 p-lg">
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
            📱 Client 端
          </div>
          <div className="space-y-sm">
            {CLIENT_NODES.map((node, i) => {
              const threshold = activeMode === 'streaming' ? (i + 1) * 25 : 100
              const isActive = streamProgress >= threshold
              return (
                <div
                  key={node.id}
                  className={cn(
                    'rounded-sm border px-md py-sm transition-all duration-300',
                    isActive
                      ? 'border-accent-dusk/40 bg-accent-dusk/10'
                      : 'border-hairline bg-canvas-card opacity-60',
                  )}
                >
                  <div className="font-mono text-caption-mono-sm text-ink">{node.label}</div>
                  <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">{node.detail}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* RSC Payload 示例 */}
      <div className="mt-xl">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          RSC Payload 格式示意
        </div>
        <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-lg font-mono text-caption-mono-sm text-body">
          {SAMPLE_PAYLOAD}
        </pre>
      </div>

      <div className="mt-lg rounded-sm border border-hairline bg-canvas-soft p-md">
        <p className="text-caption-mono-sm text-body-mid">
          💡 流式传输：服务端边渲染边发送，客户端边接收边构建，配合 Suspense 实现渐进式显示。
          完整传输：等全部渲染完再一次性发送，首屏延迟更高但实现简单。
        </p>
      </div>
    </div>
  )
}
