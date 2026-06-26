/**
 * ObserverApiShowcase — 三种 Observer API 实时演示
 *
 * 展示 Web 平台三种观察者 API：
 * - IntersectionObserver：目标元素与视口（或根元素）的交集变化，常用于懒加载、滚动动画。
 * - ResizeObserver：目标元素尺寸变化观察，常用于响应式容器、自适应布局。
 * - MutationObserver：DOM 子树结构/属性变化观察，常用于第三方组件同步、编辑器。
 *
 * 交互：切换 Observer 类型，左侧提供对应的真实可操作演示区
 * （滚动/缩放容器/增删节点），右侧展示代码示例，下方实时记录回调日志。
 *
 * ✅ 真实 Observer：本组件真实创建 IntersectionObserver/ResizeObserver/MutationObserver
 * 实例观察演示区，日志由真实回调产生（在浏览器环境）。
 */
import { useEffect, useRef, useState } from 'react'
import type {
  ObserverApiShowcaseData,
  ObserverTypeInfo,
  ObserverTypeId,
} from '../../../lib/web-api-graphql-visualization-types'
import { cn } from '../../../lib/utils'

interface ObserverApiShowcaseProps {
  data?: ObserverApiShowcaseData
}

/** 默认 Observer 类型数据 */
const DEFAULT_OBSERVERS: ObserverTypeInfo[] = [
  {
    id: 'intersection',
    name: 'IntersectionObserver',
    constructor: 'new IntersectionObserver(callback, options)',
    target: '观察目标 element 与根的交集',
    options: '{ root, rootMargin, threshold }',
    codeSnippet: `// 观察目标进入视口时触发（懒加载/滚动动画）
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        io.unobserve(entry.target) // 一次性
      }
    })
  },
  { threshold: 0.5 } // 50% 可见时触发
)
io.observe(document.querySelector('.lazy'))`,
    useCase: '图片懒加载、无限滚动、滚动触发动画、曝光统计。',
    color: '#1a6cff',
  },
  {
    id: 'resize',
    name: 'ResizeObserver',
    constructor: 'new ResizeObserver(callback)',
    target: '观察目标 element 的 contentBoxSize',
    options: '无 options，直接 observe(target)',
    codeSnippet: `// 观察元素尺寸变化（响应式容器）
const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentRect.width
    console.log('容器宽度:', width)
    // 根据宽度切换布局
  }
})
ro.observe(document.querySelector('.container'))`,
    useCase: '自适应组件、图表重绘、Editable 容器、断点切换。',
    color: '#07c160',
  },
  {
    id: 'mutation',
    name: 'MutationObserver',
    constructor: 'new MutationObserver(callback)',
    target: '观察目标子树的结构/属性变化',
    options: '{ childList, attributes, subtree, characterData }',
    codeSnippet: `// 观察 DOM 子树变化（第三方组件同步）
const mo = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    if (m.type === 'childList') {
      console.log('节点增删:', m.addedNodes, m.removedNodes)
    } else if (m.type === 'attributes') {
      console.log('属性变化:', m.attributeName)
    }
  })
})
mo.observe(node, {
  childList: true,
  subtree: true,
  attributes: true,
})`,
    useCase: '编辑器内容同步、第三方 DOM 监听、撤销栈、虚拟列表同步。',
    color: '#f59e0b',
  },
]

interface LogEntry {
  time: string
  msg: string
}

export function ObserverApiShowcase({ data }: ObserverApiShowcaseProps) {
  const observers = data?.observers ?? DEFAULT_OBSERVERS
  const overviewNote =
    data?.overviewNote ??
    'Observer API 是 Web 平台提供的「被动观察」机制，相比轮询或事件监听更高效。三种 Observer 分别观察交集、尺寸、DOM 变化。下方为真实可操作的演示区，日志由真实回调产生。'

  const [activeId, setActiveId] = useState<ObserverTypeId>('intersection')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [scrollPos, setScrollPos] = useState(0)
  const [boxSize, setBoxSize] = useState(160)
  const [nodeCount, setNodeCount] = useState(3)
  const [attrFlip, setAttrFlip] = useState(false)

  const targetRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const selected = observers.find((o) => o.id === activeId) ?? observers[0]

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString()
    setLogs((prev) => [{ time, msg }, ...prev].slice(0, 12))
  }

  // IntersectionObserver：真实观察目标元素
  useEffect(() => {
    if (activeId !== 'intersection') return
    if (!targetRef.current || !scrollContainerRef.current) return
    setLogs([])
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          addLog(
            `isIntersecting=${entry.isIntersecting} · intersectionRatio=${entry.intersectionRatio.toFixed(2)}`,
          )
        })
      },
      { root: scrollContainerRef.current, threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    io.observe(targetRef.current)
    return () => io.disconnect()
  }, [activeId])

  // ResizeObserver：真实观察目标元素尺寸
  useEffect(() => {
    if (activeId !== 'resize') return
    if (!targetRef.current) return
    setLogs([])
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width)
        addLog(`width=${w}px · height=${Math.round(entry.contentRect.height)}px`)
      }
    })
    ro.observe(targetRef.current)
    return () => ro.disconnect()
  }, [activeId])

  // MutationObserver：真实观察目标子树
  useEffect(() => {
    if (activeId !== 'mutation') return
    if (!targetRef.current) return
    setLogs([])
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'childList') {
          const added = m.addedNodes.length
          const removed = m.removedNodes.length
          addLog(`childList · added=${added} · removed=${removed}`)
        } else if (m.type === 'attributes') {
          addLog(`attributes · ${m.attributeName}`)
        }
      })
    })
    mo.observe(targetRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state'],
    })
    return () => mo.disconnect()
  }, [activeId])

  return (
    <div className="space-y-lg">
      {/* 总览说明 */}
      <div className="rounded-sm border-l-4 border-[#1a6cff] bg-[#1a6cff]/8 px-md py-sm">
        <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#1a6cff]">
          Observer API 三剑客
        </div>
        <p className="mt-xs text-caption text-ink">{overviewNote}</p>
      </div>

      {/* Observer 类型切换按钮 */}
      <div className="flex flex-wrap gap-xs">
        {observers.map((observer) => {
          const isActive = activeId === observer.id
          return (
            <button
              key={observer.id}
              onClick={() => setActiveId(observer.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: observer.color } : undefined}
            >
              {observer.name}
            </button>
          )
        })}
      </div>

      {/* 双栏：左 真实演示区 + 右 代码示例 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        {/* 演示区 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center justify-between">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              演示区（真实 Observer）
            </span>
            <span
              className="rounded-pill px-sm py-xxs font-mono text-caption-mono-xs text-white"
              style={{ backgroundColor: selected.color }}
            >
              {selected.name}
            </span>
          </div>

          {/* Intersection 演示：滚动容器 */}
          {activeId === 'intersection' && (
            <div>
              <div
                ref={scrollContainerRef}
                className="h-[180px] overflow-y-auto rounded-sm border border-hairline bg-[repeating-conic-gradient(#f3f4f6_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]"
              >
                <div className="h-[300px] flex items-center justify-center">
                  <div
                    ref={targetRef}
                    className="rounded-md border-2 border-[#1a6cff] px-xl py-lg font-mono text-caption-mono-sm text-[#1a6cff]"
                  >
                    观察目标（滚动到此）
                  </div>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={120}
                value={scrollPos}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setScrollPos(v)
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTop = (v / 120) * 180
                  }
                }}
                className="mt-sm w-full"
              />
              <p className="mt-xs text-caption text-body-mid">
                拖动滑块滚动容器，目标进入/离开视口时触发回调。
              </p>
            </div>
          )}

          {/* Resize 演示：可调尺寸盒子 */}
          {activeId === 'resize' && (
            <div>
              <div className="flex h-[180px] items-center justify-center rounded-sm border border-hairline bg-[repeating-conic-gradient(#f3f4f6_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-sm">
                <div
                  ref={targetRef}
                  className="flex items-center justify-center rounded-md border-2 border-[#07c160] font-mono text-caption-mono-xs text-[#07c160]"
                  style={{ width: boxSize, height: boxSize / 2 }}
                >
                  {boxSize}px
                </div>
              </div>
              <input
                type="range"
                min={80}
                max={260}
                value={boxSize}
                onChange={(e) => setBoxSize(Number(e.target.value))}
                className="mt-sm w-full"
              />
              <p className="mt-xs text-caption text-body-mid">
                拖动滑块改变目标尺寸，触发 ResizeObserver 回调。
              </p>
            </div>
          )}

          {/* Mutation 演示：增删节点 + 属性切换 */}
          {activeId === 'mutation' && (
            <div>
              <div
                ref={targetRef}
                className="flex h-[140px] flex-wrap content-start gap-xs overflow-y-auto rounded-sm border border-hairline bg-[repeating-conic-gradient(#f3f4f6_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-sm"
              >
                {Array.from({ length: nodeCount }).map((_, i) => (
                  <span
                    key={i}
                    data-state={attrFlip ? 'on' : 'off'}
                    className="rounded-sm border border-[#f59e0b] px-sm py-xxs font-mono text-caption-mono-xs text-[#f59e0b]"
                  >
                    节点{i}
                  </span>
                ))}
              </div>
              <div className="mt-sm flex flex-wrap gap-xs">
                <button
                  onClick={() => setNodeCount((c) => c + 1)}
                  className="rounded-sm border border-hairline px-sm py-xxs font-mono text-caption-mono-xs text-ink hover:border-ink/30"
                >
                  + 添加节点
                </button>
                <button
                  onClick={() => setNodeCount((c) => Math.max(0, c - 1))}
                  className="rounded-sm border border-hairline px-sm py-xxs font-mono text-caption-mono-xs text-ink hover:border-ink/30"
                >
                  - 删除节点
                </button>
                <button
                  onClick={() => setAttrFlip((f) => !f)}
                  className="rounded-sm border border-hairline px-sm py-xxs font-mono text-caption-mono-xs text-ink hover:border-ink/30"
                >
                  切换 data-state
                </button>
              </div>
              <p className="mt-xs text-caption text-body-mid">
                增删节点或切换属性，触发 MutationObserver 回调。
              </p>
            </div>
          )}

          <div className="mt-sm">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              构造与配置
            </span>
            <p className="mt-xs font-mono text-caption-mono-xs text-ink">{selected.constructor}</p>
            <p className="mt-xs text-caption text-body-mid">options: {selected.options}</p>
            <p className="mt-xs text-caption text-ink">用途：{selected.useCase}</p>
          </div>
        </div>

        {/* 代码示例区 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center gap-sm">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              代码示例
            </span>
            <span className="rounded-pill bg-canvas-soft px-sm py-xxs font-mono text-caption-mono-xs text-ink">
              {selected.target}
            </span>
          </div>
          <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
            <code>{selected.codeSnippet}</code>
          </pre>
        </div>
      </div>

      {/* 回调日志面板 */}
      <div className="rounded-md border border-hairline bg-canvas-card p-md">
        <div className="mb-sm flex items-center justify-between">
          <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
            回调日志（最近 12 条）
          </span>
          <button
            onClick={() => setLogs([])}
            className="rounded-sm border border-hairline px-sm py-xxs font-mono text-caption-mono-xs text-body-mid transition-colors hover:border-ink/30 hover:text-ink"
          >
            清空
          </button>
        </div>
        {logs.length === 0 ? (
          <p className="text-caption text-body-mid">
            暂无回调，操作左侧演示区（{selected.name} 将触发真实回调）。
          </p>
        ) : (
          <div className="space-y-xs">
            {logs.map((log, idx) => (
              <div
                key={`${log.time}-${idx}`}
                className="flex items-center gap-sm font-mono text-caption-mono-xs"
              >
                <span className="text-body-mid">[{log.time}]</span>
                <span className="text-ink">{log.msg}</span>
                {idx === 0 && <span className="text-body-mid">← 最近</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
