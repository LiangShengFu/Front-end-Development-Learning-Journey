/**
 * WorkerDataTransferVisualizer — Web Workers 数据传输方式可视化
 *
 * 展示主线程与 Worker 之间三种数据传输方式：
 * - structuredClone：结构化克隆（默认）。postMessage 自动深拷贝，原数据保留。
 * - transferable：Transferable Objects。ArrayBuffer/MessagePort 所有权转移，原数据失效。
 * - sharedArrayBuffer：SharedArrayBuffer。多线程共享内存，需配合 Atomics 同步。
 *
 * 交互：切换传输方式，左侧展示主线程→Worker 的数据流向与所有权变化，
 * 右侧展示代码示例与优缺点，下方为「发送」模拟按钮，触发数据包动画。
 *
 * ⚠️ 教学模拟：不真实创建 Worker，数据包动画为本地状态驱动。
 */
import { useState } from 'react'
import type {
  WorkerDataTransferData,
  TransferMethod,
  TransferMethodId,
} from '../../../lib/web-api-graphql-visualization-types'
import { cn } from '../../../lib/utils'

interface WorkerDataTransferVisualizerProps {
  data?: WorkerDataTransferData
}

/** 默认传输方式数据 */
const DEFAULT_METHODS: TransferMethod[] = [
  {
    id: 'structuredClone',
    name: '结构化克隆',
    api: 'postMessage(data)',
    flow: '主线程 → 拷贝 → Worker（原数据保留）',
    ownership: '两份独立副本，互不影响',
    codeSnippet: `// 主线程
const worker = new Worker('worker.js')
const data = { nums: [1, 2, 3], buf: new ArrayBuffer(8) }

// 默认结构化克隆：深拷贝一份数据
worker.postMessage(data)

// 原数据仍可使用
console.log(data.nums) // [1, 2, 3] ✓`,
    useCase: '小对象、配置、JSON 数据等通用场景。无需关心所有权，最安全。',
    pros: ['通用性强，支持绝大多数 JS 对象', '原数据保留，无副作用', 'API 最简单'],
    cons: ['大数据深拷贝性能差', '内存占用翻倍', '无法传输函数/DOM 节点'],
    color: '#1a6cff',
  },
  {
    id: 'transferable',
    name: 'Transferable 转移',
    api: 'postMessage(data, [transferables])',
    flow: '主线程 → 所有权转移 → Worker（原 Buffer 失效）',
    ownership: '零拷贝，原 ArrayBuffer 被掏空（byteLength=0）',
    codeSnippet: `// 主线程
const worker = new Worker('worker.js')
const buffer = new ArrayBuffer(1024 * 1024) // 1MB

// 第二参数：转移列表，所有权移交给 Worker
worker.postMessage({ buffer }, [buffer])

// 原 buffer 失效
console.log(buffer.byteLength) // 0 ✗ 已被掏空`,
    useCase: '大数据传输：图像处理、音频解码、大 Buffer 计算，需零拷贝性能。',
    pros: ['零拷贝，大数据性能极佳', '无内存翻倍', '适合二进制处理'],
    cons: ['仅 ArrayBuffer/MessagePort/ImageBitmap 等可转移', '原数据失效，使用需谨慎', '不适用于普通对象'],
    color: '#f59e0b',
  },
  {
    id: 'sharedArrayBuffer',
    name: 'SharedArrayBuffer',
    api: 'postMessage(sab) + Atomics',
    flow: '主线程 ↔ 共享内存 ↔ Worker（双向读写）',
    ownership: '同一块内存，多线程共享，需 Atomics 同步',
    codeSnippet: `// 主线程（需 COOP/COEP 安全头）
const sab = new SharedArrayBuffer(1024)
const view = new Int32Array(sab)
worker.postMessage(sab)

// Worker 中也能读写同一块内存
// 必须用 Atomics 防止竞态
Atomics.store(view, 0, 42)
Atomics.notify(view, 0, 1) // 唤醒等待者`,
    useCase: 'WebAssembly 多线程、音视频实时处理、高性能计算。需要严格同步控制。',
    pros: ['真正的多线程共享内存', '双向通信无需拷贝', '配合 Atomics 可实现锁'],
    cons: ['需 COOP/COEP 跨域隔离头', '竞态条件风险高', '浏览器兼容与安全要求严格'],
    color: '#a78bfa',
  },
]

export function WorkerDataTransferVisualizer({ data }: WorkerDataTransferVisualizerProps) {
  const methods = data?.methods ?? DEFAULT_METHODS
  const overviewNote =
    data?.overviewNote ??
    'Web Workers 与主线程通信只能通过 postMessage。数据传输有三种方式：结构化克隆（默认拷贝）、Transferable（所有权转移）、SharedArrayBuffer（共享内存）。切换下方方式观察数据流向与所有权变化。'

  const [activeId, setActiveId] = useState<TransferMethodId>('structuredClone')
  const [sentCount, setSentCount] = useState(0)
  const [animating, setAnimating] = useState(false)

  const selected = methods.find((m) => m.id === activeId) ?? methods[0]

  const handleSend = () => {
    setAnimating(true)
    setSentCount((c) => c + 1)
    setTimeout(() => setAnimating(false), 900)
  }

  return (
    <div className="space-y-lg">
      {/* 总览说明 */}
      <div className="rounded-sm border-l-4 border-[#1a6cff] bg-[#1a6cff]/8 px-md py-sm">
        <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#1a6cff]">
          Workers 数据传输
        </div>
        <p className="mt-xs text-caption text-ink">{overviewNote}</p>
      </div>

      {/* 传输方式切换按钮 */}
      <div className="flex flex-wrap gap-xs">
        {methods.map((method) => {
          const isActive = activeId === method.id
          return (
            <button
              key={method.id}
              onClick={() => setActiveId(method.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: method.color } : undefined}
            >
              {method.name}
            </button>
          )
        })}
      </div>

      {/* 双栏：左 数据流向 + 右 代码示例 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        {/* 数据流向可视化 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center justify-between">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              数据流向
            </span>
            <button
              onClick={handleSend}
              className="rounded-sm border border-hairline px-sm py-xxs font-mono text-caption-mono-xs text-ink transition-colors hover:border-ink/30"
            >
              发送数据 →
            </button>
          </div>
          <div className="flex items-center justify-between gap-sm rounded-sm border border-hairline bg-[repeating-conic-gradient(#f3f4f6_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-md">
            {/* 主线程 */}
            <div className="flex flex-col items-center">
              <div className="rounded-md border-2 border-[#1a6cff] px-md py-sm font-mono text-caption-mono-sm text-[#1a6cff]">
                主线程
              </div>
              <span className="mt-xs font-mono text-caption-mono-xs text-body-mid">
                {selected.id === 'sharedArrayBuffer' ? '读写共享' : '发送方'}
              </span>
            </div>

            {/* 传输通道与数据包 */}
            <div className="relative flex flex-1 items-center">
              <div className="h-1 w-full rounded-full bg-hairline" />
              <div
                className={cn(
                  'absolute left-0 h-3 w-3 rounded-full transition-all duration-700',
                  animating ? 'translate-x-[calc(100%-12px)]' : 'translate-x-0',
                )}
                style={{ backgroundColor: selected.color }}
              />
              <span className="absolute left-1/2 -translate-x-1/2 -top-md whitespace-nowrap font-mono text-caption-mono-xs text-body-mid">
                {selected.api}
              </span>
            </div>

            {/* Worker */}
            <div className="flex flex-col items-center">
              <div
                className="rounded-md border-2 px-md py-sm font-mono text-caption-mono-sm"
                style={{ borderColor: selected.color, color: selected.color }}
              >
                Worker
              </div>
              <span className="mt-xs font-mono text-caption-mono-xs text-body-mid">
                {selected.id === 'sharedArrayBuffer' ? '读写共享' : '接收方'}
              </span>
            </div>
          </div>
          <div className="mt-sm space-y-xs">
            <div>
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                所有权变化
              </span>
              <p className="mt-xs text-caption text-ink">{selected.ownership}</p>
            </div>
            <div>
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                适用场景
              </span>
              <p className="mt-xs text-caption text-ink">{selected.useCase}</p>
            </div>
            <div className="font-mono text-caption-mono-xs text-body-mid">
              已模拟发送 {sentCount} 次
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
              {selected.api}
            </span>
          </div>
          <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
            <code>{selected.codeSnippet}</code>
          </pre>
          {/* 优缺点对比 */}
          <div className="mt-sm grid grid-cols-1 gap-sm sm:grid-cols-2">
            <div className="rounded-sm border border-hairline px-sm py-xs">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-green-600">
                优点
              </div>
              <ul className="mt-xs space-y-xs">
                {selected.pros.map((pro) => (
                  <li key={pro} className="text-caption text-ink">
                    + {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm border border-hairline px-sm py-xs">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-red-500">
                缺点
              </div>
              <ul className="mt-xs space-y-xs">
                {selected.cons.map((con) => (
                  <li key={con} className="text-caption text-ink">
                    - {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
