/**
 * CustomDirectiveWorkbench — 自定义指令实时效果实践台
 *
 * 交互式展示 4 种 Vue 自定义指令的效果：
 * - v-focus：自动聚焦（mounted 钩子）
 * - v-debounce：防抖点击（mounted + 事件绑定）
 * - v-permission：权限控制显隐（updated 钩子）
 * - v-lazy：IntersectionObserver 懒加载（mounted + unmounted）
 *
 * ⚠️ 教学模拟：使用 React hooks 模拟 Vue 自定义指令的生命周期行为，非真实指令注册。
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { CustomDirectiveWorkbenchData, DirectiveTemplate } from '../../../lib/vue-advanced-visualization-types'
import { cn } from '../../../lib/utils'

interface CustomDirectiveWorkbenchProps {
  data?: CustomDirectiveWorkbenchData
}

/** 默认指令模板 */
const DEFAULT_TEMPLATES: DirectiveTemplate[] = [
  {
    id: 'v-focus',
    label: 'v-focus',
    description: '页面加载或元素挂载时自动获取焦点，常用于表单首项。',
    code: `const vFocus = {
  mounted(el: HTMLInputElement) {
    el.focus()
  }
}

// <input v-focus />`,
    hooks: [
      { name: 'mounted', description: '元素插入 DOM 后调用 el.focus()' },
    ],
  },
  {
    id: 'v-debounce',
    label: 'v-debounce',
    description: '为点击事件添加防抖，指定时间内多次点击仅触发一次回调。',
    code: `const vDebounce = {
  mounted(el, { value: delay = 500 }) {
    let timer: number
    el.addEventListener('click', () => {
      clearTimeout(timer)
      timer = setTimeout(() => el._debounceCb?.(), delay)
    })
  },
  updated(el, { value }) {
    el._debounceCb = value
  }
}

// <button v-debounce="500" @click="onSave">保存</button>`,
    hooks: [
      { name: 'mounted', description: '绑定 click 监听并启动防抖定时器' },
      { name: 'updated', description: '更新防抖回调函数引用' },
    ],
  },
  {
    id: 'v-permission',
    label: 'v-permission',
    description: '根据用户角色控制元素显隐，无权限则移除 DOM 节点。',
    code: `const vPermission = {
  mounted(el, { value: role }) {
    if (currentUser.role !== role) {
      el.parentNode?.removeChild(el)
    }
  },
  updated(el, { value: role }) {
    el.style.display =
      currentUser.role === role ? '' : 'none'
  }
}

// <button v-permission="'admin'">删除</button>`,
    hooks: [
      { name: 'mounted', description: '首次挂载时校验角色，无权限移除节点' },
      { name: 'updated', description: '角色变化时切换 display' },
    ],
  },
  {
    id: 'v-lazy',
    label: 'v-lazy',
    description: '基于 IntersectionObserver 的懒加载，元素进入视口才加载实际内容。',
    code: `const vLazy = {
  mounted(el, { value: src }) {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.src = src
        io.unobserve(el)
      }
    })
    io.observe(el)
    el._io = io
  },
  unmounted(el) {
    el._io?.disconnect()
  }
}

// <img v-lazy="'/photo.jpg'">`,
    hooks: [
      { name: 'mounted', description: '创建 IntersectionObserver 并观察元素' },
      { name: 'unmounted', description: '组件卸载时断开观察器，防内存泄漏' },
    ],
  },
]

// ----------------------------------------------------------------------------
// 各指令的实时效果预览
// ----------------------------------------------------------------------------

/** v-focus 预览：挂载后自动聚焦，可重新挂载观察效果 */
function FocusPreview() {
  const [mountKey, setMountKey] = useState(0)
  return (
    <div className="space-y-md">
      <p className="text-body-sm text-body-mid">
        输入框在「挂载」时自动获得焦点（光标闪烁），点击「重新挂载」可复现 mounted 钩子。
      </p>
      <input
        key={mountKey}
        // 模拟 v-focus：挂载后自动 focus
        ref={(el) => el?.focus()}
        type="text"
        placeholder="我会在挂载后自动聚焦…"
        className="w-full rounded-sm border border-hairline bg-canvas-soft px-md py-sm text-body-sm text-ink outline-none focus:border-[#42b883]"
      />
      <button type="button" onClick={() => setMountKey((k) => k + 1)} className="btn-pill border-[#42b883] bg-[#42b883]/10 text-[#42b883] hover:bg-[#42b883]/20">
        重新挂载（触发 mounted）
      </button>
    </div>
  )
}

/** v-debounce 预览：500ms 内多次点击仅触发一次 */
function DebouncePreview() {
  const [rawClicks, setRawClicks] = useState(0)
  const [fired, setFired] = useState(0)
  const [pending, setPending] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = () => {
    setRawClicks((n) => n + 1)
    setPending(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    // 模拟 v-debounce：500ms 防抖
    timerRef.current = setTimeout(() => {
      setFired((n) => n + 1)
      setPending(false)
    }, 500)
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return (
    <div className="space-y-md">
      <p className="text-body-sm text-body-mid">
        快速连续点击按钮，原始事件计数累加，但防抖回调在停止点击 500ms 后才触发一次。
      </p>
      <button
        type="button"
        onClick={handleClick}
        className="btn-pill border-[#42b883] bg-[#42b883]/10 text-[#42b883] hover:bg-[#42b883]/20"
      >
        点击保存（防抖 500ms）
      </button>
      <div className="grid grid-cols-3 gap-md font-mono text-body-sm">
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">原始点击</div>
          <div className="mt-xs text-display-xs text-ink">{rawClicks}</div>
        </div>
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">防抖触发</div>
          <div className="mt-xs text-display-xs text-[#42b883]">{fired}</div>
        </div>
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">等待中</div>
          <div className="mt-xs text-display-xs text-amber-500">{pending ? '…' : '—'}</div>
        </div>
      </div>
    </div>
  )
}

/** v-permission 预览：切换角色，受控元素显隐 */
function PermissionPreview() {
  const [role, setRole] = useState<'user' | 'admin'>('user')
  return (
    <div className="space-y-md">
      <p className="text-body-sm text-body-mid">
        切换当前用户角色，观察「删除」按钮（需 admin 权限）的显隐变化（模拟 updated 钩子）。
      </p>
      <div className="flex flex-wrap items-center gap-md">
        <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">当前角色</span>
        <div className="flex gap-sm">
          {(['user', 'admin'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                'rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
                role === r
                  ? 'border-[#42b883] bg-[#42b883]/10 text-[#42b883]'
                  : 'border-hairline text-body-mid hover:border-body-mid',
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
        {/* 模拟 v-permission="'admin'" */}
        {role === 'admin' ? (
          <button type="button" className="btn-pill border-red-500/60 bg-red-500/10 text-red-500 hover:bg-red-500/20">
            删除（admin 专属）
          </button>
        ) : (
          <p className="font-mono text-caption-mono-sm text-body-mid">
            ⛔ 当前角色无权限，节点已被移除（v-permission）
          </p>
        )}
      </div>
    </div>
  )
}

/** v-lazy 预览：滚动至视口时加载内容 */
function LazyPreview() {
  const [loaded, setLoaded] = useState(false)
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = targetRef.current
    if (!el) return
    // SSR 安全：无 IntersectionObserver 时直接加载
    if (typeof IntersectionObserver === 'undefined') {
      setLoaded(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoaded(true)
          io.disconnect()
        }
      },
      { root: el.parentElement, threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="space-y-md">
      <p className="text-body-sm text-body-mid">
        下方为可滚动容器，向下滚动直至占位元素进入视口，模拟图片在进入视口时才加载实际内容。
      </p>
      <div className="h-[200px] overflow-y-auto rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="flex h-[420px] flex-col items-center justify-between">
          <span className="self-start font-mono text-caption-mono-sm text-body-mid">↓ 向下滚动</span>
          <div
            ref={targetRef}
            className={cn(
              'flex h-[140px] w-full items-center justify-center rounded-sm border-2 border-dashed transition-colors',
              loaded ? 'border-[#42b883]/60 bg-[#42b883]/10' : 'border-hairline bg-canvas-card',
            )}
          >
            {loaded ? (
              <div className="text-center">
                <div className="text-display-xs text-[#42b883]">✓ 已加载</div>
                <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">
                  IntersectionObserver 触发，src 已赋值
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-body-sm text-body-mid">占位符 loading…</div>
                <div className="mt-xs font-mono text-caption-mono-sm text-body-mid/60">
                  尚未进入视口
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/** 根据指令 id 渲染对应预览 */
function DirectivePreview({ id }: { id: string }) {
  switch (id) {
    case 'v-focus':
      return <FocusPreview />
    case 'v-debounce':
      return <DebouncePreview />
    case 'v-permission':
      return <PermissionPreview />
    case 'v-lazy':
      return <LazyPreview />
    default:
      return null
  }
}

export function CustomDirectiveWorkbench({ data }: CustomDirectiveWorkbenchProps) {
  const templates = data?.templates ?? DEFAULT_TEMPLATES
  const [activeId, setActiveId] = useState(templates[0]?.id ?? 'v-focus')
  const active = templates.find((t) => t.id === activeId) ?? templates[0]

  const handleSelect = useCallback((id: string) => setActiveId(id), [])

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：使用 React hooks 模拟 Vue 自定义指令的生命周期行为，非真实指令注册。
      </div>

      {/* 指令选择器 */}
      <div className="flex flex-wrap gap-sm">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => handleSelect(t.id)}
            className={cn(
              'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
              activeId === t.id
                ? 'border-[#42b883] bg-[#42b883]/10 text-[#42b883]'
                : 'border-hairline text-body-mid hover:border-body-mid',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        {/* 左侧：指令定义代码 + 钩子 */}
        <div className="space-y-md">
          <div>
            <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              指令定义
            </h4>
            <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink">
              <code>{active.code}</code>
            </pre>
          </div>
          <div className="rounded-sm border border-hairline bg-canvas-card p-md">
            <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#42b883]">
              生命周期钩子
            </h4>
            <ul className="space-y-xs">
              {active.hooks.map((h) => (
                <li key={h.name} className="font-mono text-caption-mono-sm text-body">
                  <span className="text-[#42b883]">{h.name}</span>
                  <span className="text-body-mid"> — {h.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 右侧：实时效果预览 */}
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-dusk">
            实时效果预览
          </h4>
          <p className="mb-md text-body-sm text-ink">{active.description}</p>
          <DirectivePreview id={active.id} />
        </div>
      </div>
    </div>
  )
}
