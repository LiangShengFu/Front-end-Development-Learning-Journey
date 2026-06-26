/**
 * IslandsArchDemo — Islands 架构水合演示
 *
 * 可视化 Astro Islands Architecture。页面中静态 HTML 为灰色，
 * 交互组件（岛屿）根据 client:* 指令在不同时机变为蓝色（水合完成）。
 * 展示 client:load / client:idle / client:visible / client:media 四种水合策略。
 *
 * ⚠️ 教学模拟：水合可视化使用 CSS transition + setTimeout 模拟。
 *
 * 对应docx中演示 #10
 */
import { useState } from 'react'
import type { IslandsArchDemoData } from '../../../lib/nextjs-visualization-types'
import { cn } from '../../../lib/utils'

interface IslandsArchDemoProps {
  data?: IslandsArchDemoData
}

type HydrationState = 'static' | 'pending' | 'hydrated'

interface Island {
  id: string
  label: string
  directive: 'client:load' | 'client:idle' | 'client:visible' | 'client:media'
  description: string
  delay: number
}

const ISLANDS: Island[] = [
  { id: 'counter', label: 'Counter 计数器', directive: 'client:load', description: '页面加载后立即水合', delay: 100 },
  { id: 'comments', label: 'Comments 评论框', directive: 'client:idle', description: '浏览器空闲时水合', delay: 800 },
  { id: 'back-to-top', label: 'BackToTop 回到顶部', directive: 'client:visible', description: '滚动到可见时水合', delay: 1500 },
  { id: 'theme-toggle', label: 'ThemeToggle 主题切换', directive: 'client:media', description: '匹配媒体查询时水合（移动端）', delay: 1200 },
]

const STATIC_PARTS = ['Header 导航', 'Article 文章内容', 'Footer 页脚']

export function IslandsArchDemo({ data }: IslandsArchDemoProps) {
  const title = data?.title
  const [hydrating, setHydrating] = useState(false)
  const [states, setStates] = useState<Record<string, HydrationState>>(
    Object.fromEntries(ISLANDS.map((i) => [i.id, 'pending'])),
  )

  const startHydration = () => {
    setHydrating(true)
    setStates(Object.fromEntries(ISLANDS.map((i) => [i.id, 'pending'])))
    ISLANDS.forEach((island) => {
      setTimeout(() => {
        setStates((prev) => ({ ...prev, [island.id]: 'hydrated' }))
      }, island.delay)
    })
    setTimeout(() => setHydrating(false), 2000)
  }

  const reset = () => {
    setStates(Object.fromEntries(ISLANDS.map((i) => [i.id, 'pending'])))
  }

  const hydratedCount = Object.values(states).filter((s) => s === 'hydrated').length

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {title && <div className="mb-md font-mono text-caption-mono-sm text-body-mid">{title}</div>}
      {/* 教学模拟声明 */}
      <div className="mb-lg rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 教学模拟：水合可视化使用 CSS transition + setTimeout 模拟，非真实 Astro 运行时。
        </p>
      </div>

      {/* 控制栏 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={startHydration} disabled={hydrating} className="btn-primary">
          {hydrating ? '⏳ 水合中...' : '▶ 模拟页面加载'}
        </button>
        <button type="button" onClick={reset} className="btn-pill text-body-mid">
          ⏹ 重置
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          已水合 {hydratedCount} / {ISLANDS.length} 个岛屿
        </span>
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_280px]">
        {/* 页面布局模拟 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            页面布局
          </div>
          <div className="space-y-sm">
            {/* 静态部分 */}
            {STATIC_PARTS.map((part) => (
              <div key={part} className="rounded-sm border border-hairline bg-canvas-card px-md py-sm">
                <span className="font-mono text-caption-mono-sm text-body-mid">{part}</span>
                <span className="ml-sm rounded-pill bg-canvas-mid px-xs py-xxs font-mono text-caption-mono-sm text-body-mid">
                  静态 HTML
                </span>
              </div>
            ))}

            {/* 岛屿组件 */}
            {ISLANDS.map((island) => {
              const state = states[island.id]
              return (
                <div
                  key={island.id}
                  className={cn(
                    'rounded-sm border px-md py-sm transition-all duration-500',
                    state === 'pending' && 'border-hairline bg-canvas-card opacity-60',
                    state === 'hydrated' && 'border-accent-dusk/40 bg-accent-dusk/10',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn('font-mono text-caption-mono-sm', state === 'hydrated' ? 'text-ink' : 'text-body-mid')}>
                      {island.label}
                    </span>
                    <span className={cn(
                      'rounded-pill px-xs py-xxs font-mono text-caption-mono-sm',
                      island.directive === 'client:load' && 'bg-red-500/20 text-red-500',
                      island.directive === 'client:idle' && 'bg-accent-sunset/20 text-accent-sunset',
                      island.directive === 'client:visible' && 'bg-accent-dusk/20 text-accent-dusk',
                      island.directive === 'client:media' && 'bg-accent-breeze/20 text-accent-breeze',
                    )}>
                      {island.directive}
                    </span>
                  </div>
                  <div className="mt-xs flex items-center gap-sm">
                    <span className={cn(
                      'h-2 w-2 rounded-full transition-colors',
                      state === 'pending' && 'bg-canvas-mid',
                      state === 'hydrated' && 'bg-accent-dusk',
                    )} />
                    <span className="font-mono text-caption-mono-sm text-body-mid">
                      {state === 'pending' ? '⏳ 等待水合...' : '✅ 已水合（可交互）'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 统计 + 说明 */}
        <div className="space-y-lg">
          {/* JS 体积对比 */}
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              JS 体积对比
            </div>
            <div className="space-y-sm">
              <div>
                <div className="flex items-center justify-between font-mono text-caption-mono-sm">
                  <span className="text-body-mid">全量水合（SPA）</span>
                  <span className="text-red-500">~250 KB</span>
                </div>
                <div className="mt-xs h-2 overflow-hidden rounded-pill bg-canvas-mid">
                  <div className="h-full rounded-pill bg-red-500/60" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between font-mono text-caption-mono-sm">
                  <span className="text-body-mid">Islands 架构</span>
                  <span className="text-accent-dusk">~45 KB</span>
                </div>
                <div className="mt-xs h-2 overflow-hidden rounded-pill bg-canvas-mid">
                  <div className="h-full rounded-pill bg-accent-dusk/60" style={{ width: '18%' }} />
                </div>
              </div>
            </div>
            <p className="mt-sm text-caption-mono-sm text-body-mid">
              仅加载岛屿组件的 JS，静态 HTML 零 JS。
            </p>
          </div>

          {/* 水合策略说明 */}
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              四种水合策略
            </div>
            <div className="space-y-xs">
              {ISLANDS.map((island) => (
                <div key={island.id} className="font-mono text-caption-mono-sm">
                  <span className={cn(
                    'rounded-pill px-xs py-xxs',
                    island.directive === 'client:load' && 'bg-red-500/20 text-red-500',
                    island.directive === 'client:idle' && 'bg-accent-sunset/20 text-accent-sunset',
                    island.directive === 'client:visible' && 'bg-accent-dusk/20 text-accent-dusk',
                    island.directive === 'client:media' && 'bg-accent-breeze/20 text-accent-breeze',
                  )}>
                    {island.directive}
                  </span>
                  <span className="ml-xs text-body-mid">{island.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
