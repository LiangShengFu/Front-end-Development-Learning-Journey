/**
 * 模块详情页 - 渲染单个模块的完整知识点内容
 *
 * 使用懒加载获取模块数据，包含：
 * - 模块头部（标题、阶段、统计）
 * - 知识点导航（侧边目录）
 * - 知识点内容列表
 * - 上下模块导航
 */
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Eyebrow } from '../components/layout/Eyebrow'
import { KnowledgePointView } from '../components/content/KnowledgePointView'
import { loadModule } from '../lib/moduleRegistry'
import { getModuleSummary, getAdjacentModules } from '../lib/modules'
import type { ModuleMeta } from '../lib/types'

export function ModuleDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const location = useLocation()
  const [module, setModule] = useState<ModuleMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)
    setModule(null)

    loadModule(slug)
      .then((m) => {
        if (cancelled) return
        if (m) {
          setModule(m)
        } else {
          setNotFound(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  // 哈希锚点滚动：React Router v6 拦截 <a href="#..."> 但不滚动，
  // 需手动监听 location.hash 变化并滚动到对应知识点。
  // 同时兼容模块切换后内容懒加载完成时的滚动。
  useEffect(() => {
    if (loading || !module) return
    const hash = location.hash
    if (!hash) return
    // 移除前缀 '#'
    const id = hash.slice(1)
    if (!id) return
    // 内容懒加载后可能尚未渲染，使用 rAF 等待下一帧
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [location.hash, loading, module])

  // 目录点击：阻止 React Router 默认拦截，手动滚动并更新 URL hash
  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    order: number,
  ) => {
    e.preventDefault()
    const id = `point-${order}`
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // 同步更新 URL hash，便于分享与刷新保留位置
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  const summary = getModuleSummary(slug)
  const adjacent = getAdjacentModules(slug)

  if (loading) {
    return (
      <div className="container-page py-4xl">
        <div className="font-mono text-caption-mono uppercase tracking-[1.4px] text-body-mid">
          加载中...
        </div>
      </div>
    )
  }

  if (notFound || !summary) {
    return (
      <div className="container-page py-4xl">
        <Eyebrow className="mb-md">404</Eyebrow>
        <h1 className="text-display-md tracking-display text-ink">模块未找到</h1>
        <p className="mt-md text-body-md text-body">
          模块 "{slug}" 不存在或尚未实现。
        </p>
        <Link to="/modules" className="btn-pill mt-xl">
          ← 返回模块列表
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Module header */}
      <section className="border-b border-hairline py-3xl">
        <div className="container-page">
          <div className="flex items-center gap-sm text-body-sm text-body-mid">
            <Link to="/modules" className="transition-colors hover:text-ink">
              模块
            </Link>
            <span>/</span>
            <span className="text-ink">{summary.title}</span>
          </div>

          <div className="mt-xl flex flex-col gap-md md:flex-row md:items-baseline md:justify-between">
            <div>
              <Eyebrow index={`${summary.number} /`} className="mb-md">
                {summary.stageLabel}
              </Eyebrow>
              <h1 className="flex items-center gap-md text-display-md tracking-display text-ink">
                <span className="text-display-sm">{summary.icon}</span>
                {summary.title}
              </h1>
              <p className="mt-md max-w-2xl text-body-lg text-body">{summary.summary}</p>
            </div>

            <div className="flex gap-xl">
              <div>
                <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                  知识点
                </div>
                <div className="mt-xs text-display-xs text-ink">
                  {module?.points.length ?? summary.knowledgePointCount}
                </div>
              </div>
              <div>
                <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                  可视化
                </div>
                <div className="mt-xs text-display-xs text-ink">{summary.visualizationCount}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content with sidebar TOC */}
      <section className="py-3xl">
        <div className="container-page grid grid-cols-1 gap-2xl lg:grid-cols-[220px_1fr]">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="mb-lg font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                目录
              </div>
              <nav className="max-h-[calc(100vh-10rem)] space-y-xs overflow-y-auto pr-xs">
                {module?.points.map((p) => (
                  <a
                    key={p.order}
                    href={`#point-${p.order}`}
                    onClick={(e) => handleTocClick(e, p.order)}
                    className="block border-l border-hairline py-xs pl-md text-body-sm text-body-mid transition-colors hover:border-accent-sunset hover:text-ink"
                  >
                    <span className="mr-xs font-mono text-caption-mono-sm text-body-mid/60">
                      {String(p.order).padStart(2, '0')}
                    </span>
                    {p.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {module ? (
              <div className="space-y-0">
                {module.points.map((point) => (
                  <KnowledgePointView key={point.order} point={point} />
                ))}
              </div>
            ) : (
              <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
                <p className="text-body-md text-body">
                  该模块的详细内容正在完善中。请先查看其他已实现的模块。
                </p>
                <Link to="/modules/html-fundamentals" className="btn-pill mt-lg">
                  查看 HTML 基础模块 →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Adjacent navigation */}
      <section className="border-t border-hairline py-3xl">
        <div className="container-page grid grid-cols-1 gap-lg sm:grid-cols-2">
          {adjacent.prev ? (
            <Link
              to={`/modules/${adjacent.prev.slug}`}
              className="group rounded-sm border border-hairline bg-canvas-card p-xl transition-colors hover:border-accent-sunset/40"
            >
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                ← 上一模块
              </div>
              <div className="mt-xs flex items-center gap-sm">
                <span className="font-mono text-caption-mono text-body-mid">{adjacent.prev.number}</span>
                <span className="text-body-md text-ink group-hover:text-accent-sunset">
                  {adjacent.prev.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {adjacent.next ? (
            <Link
              to={`/modules/${adjacent.next.slug}`}
              className="group rounded-sm border border-hairline bg-canvas-card p-xl text-right transition-colors hover:border-accent-sunset/40"
            >
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                下一模块 →
              </div>
              <div className="mt-xs flex items-center justify-end gap-sm">
                <span className="text-body-md text-ink group-hover:text-accent-sunset">
                  {adjacent.next.title}
                </span>
                <span className="font-mono text-caption-mono text-body-mid">{adjacent.next.number}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  )
}
