/**
 * SubpackageLoadingVisualizer — 小程序分包加载可视化
 *
 * 交互式配置小程序分包策略：8 个页面可拖拽分配到主包 / 分包 A / 分包 B / 独立分包，
 * 实时显示各包体积、总体积校验（主包 ≤ 2M、总包 ≤ 20M）、预加载规则配置，
 * 右侧实时生成 app.json 配置。
 *
 * 着色：主包=蓝 / 分包=绿 / 独立分包=紫 / 超限警告=红
 *
 * ⚠️ 教学模拟：页面体积为预设值，非真实包体积。
 */
import { useMemo, useState } from 'react'
import type {
  SubpackageLoadingVisualizerData,
  SubpackagePage,
  SubpackageConfig,
} from '../../../lib/miniprogram-visualization-types'
import { cn } from '../../../lib/utils'

interface SubpackageLoadingVisualizerProps {
  data?: SubpackageLoadingVisualizerData
}

/** 默认页面池（8 个页面） */
const DEFAULT_PAGES: SubpackagePage[] = [
  { id: 'index', label: '首页', sizeKb: 120 },
  { id: 'logs', label: '日志页', sizeKb: 40 },
  { id: 'user', label: '用户页', sizeKb: 180 },
  { id: 'detail', label: '详情页', sizeKb: 220 },
  { id: 'cart', label: '购物车', sizeKb: 160 },
  { id: 'order', label: '订单页', sizeKb: 140 },
  { id: 'search', label: '搜索页', sizeKb: 90 },
  { id: 'settings', label: '设置页', sizeKb: 60 },
]

/** 默认初始配置 */
const DEFAULT_CONFIG: SubpackageConfig = {
  mainPackage: ['index', 'logs'],
  subpackages: [
    { root: 'packageA', name: '分包A', pages: ['user', 'detail'] },
    { root: 'packageB', name: '分包B', pages: ['cart', 'order'], independent: true },
  ],
  preloadRule: [{ page: 'index', packages: ['packageA'] }],
}

/** 包容器定义 */
const BUCKETS = [
  { id: 'main', label: '主包', root: 'main', color: '#1a6cff', independent: false },
  { id: 'packageA', label: '分包 A', root: 'packageA', color: '#07c160', independent: false },
  { id: 'packageB', label: '分包 B', root: 'packageB', color: '#8b5cf6', independent: true },
] as const

/** 体积限制（KB） */
const MAIN_LIMIT_KB = 2 * 1024 // 2M
const TOTAL_LIMIT_KB = 20 * 1024 // 20M

/** 将 KB 格式化为 M */
const formatKb = (kb: number) => (kb >= 1024 ? `${(kb / 1024).toFixed(2)}M` : `${kb}KB`)

export function SubpackageLoadingVisualizer({ data }: SubpackageLoadingVisualizerProps) {
  const pages = data?.pages ?? DEFAULT_PAGES
  const initialConfig = data?.initialConfig ?? DEFAULT_CONFIG
  const [config, setConfig] = useState<SubpackageConfig>(initialConfig)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverBucket, setDragOverBucket] = useState<string | null>(null)

  /** 页面 id → 页面对象映射 */
  const pageMap = useMemo(() => new Map(pages.map((p) => [p.id, p])), [pages])

  /** 未分配到任何包的页面（页面池剩余） */
  const unassignedPages = useMemo(() => {
    const assigned = new Set<string>([...config.mainPackage, ...config.subpackages.flatMap((s) => s.pages)])
    return pages.filter((p) => !assigned.has(p.id))
  }, [pages, config])

  /** 各包体积计算 */
  const bucketSizes = useMemo(() => {
    const mainSize = config.mainPackage.reduce((sum, id) => sum + (pageMap.get(id)?.sizeKb ?? 0), 0)
    const subSizes = config.subpackages.map((s) => ({
      root: s.root,
      size: s.pages.reduce((sum, id) => sum + (pageMap.get(id)?.sizeKb ?? 0), 0),
      independent: s.independent,
    }))
    const totalSize = mainSize + subSizes.reduce((sum, s) => sum + s.size, 0)
    return { mainSize, subSizes, totalSize }
  }, [config, pageMap])

  const mainOverflow = bucketSizes.mainSize > MAIN_LIMIT_KB
  const totalOverflow = bucketSizes.totalSize > TOTAL_LIMIT_KB

  /** 将页面移动到目标包 */
  const moveToBucket = (pageId: string, bucketRoot: string) => {
    setConfig((prev) => {
      const next: SubpackageConfig = {
        mainPackage: prev.mainPackage.filter((id) => id !== pageId),
        subpackages: prev.subpackages.map((s) => ({ ...s, pages: s.pages.filter((id) => id !== pageId) })),
        preloadRule: prev.preloadRule,
      }
      if (bucketRoot === 'main') {
        next.mainPackage = [...next.mainPackage, pageId]
      } else {
        next.subpackages = next.subpackages.map((s) =>
          s.root === bucketRoot ? { ...s, pages: [...s.pages, pageId] } : s,
        )
      }
      return next
    })
  }

  /** 移回页面池（即从所有包中移除） */
  const removeFromBucket = (pageId: string) => {
    setConfig((prev) => ({
      mainPackage: prev.mainPackage.filter((id) => id !== pageId),
      subpackages: prev.subpackages.map((s) => ({ ...s, pages: s.pages.filter((id) => id !== pageId) })),
      preloadRule: prev.preloadRule,
    }))
  }

  /** 切换独立分包标记 */
  const toggleIndependent = (root: string) => {
    setConfig((prev) => ({
      ...prev,
      subpackages: prev.subpackages.map((s) => (s.root === root ? { ...s, independent: !s.independent } : s)),
    }))
  }

  /** 重置配置 */
  const reset = () => setConfig(initialConfig)

  /** 生成 app.json 配置文本 */
  const appJsonCode = useMemo(() => {
    const subpackages = config.subpackages
      .filter((s) => s.pages.length > 0)
      .map((s) => {
        const pagesField = s.pages.map((p) => `'pages/${p}/${p}'`).join(', ')
        const ind = s.independent ? ',\n      "independent": true' : ''
        return `    {\n      "root": "${s.root}",\n      "name": "${s.name ?? s.root}",\n      "pages": [${pagesField}]${ind}\n    }`
      })
      .join(',\n')

    const preloadRule = config.preloadRule
      .map((r) => `    "${r.page}": { "network": "all", "packages": [${r.packages.map((p) => `"${p}"`).join(', ')}] }`)
      .join(',\n')

    return `{
  "pages": [
${config.mainPackage.map((p) => `    "pages/${p}/${p}"`).join(',\n')}
  ],
  "subPackages": [
${subpackages}
  ],
  "preloadRule": {
${preloadRule}
  }
}`
  }, [config])

  /** 获取某包的页面列表 */
  const getBucketPages = (root: string): SubpackagePage[] => {
    const ids = root === 'main' ? config.mainPackage : config.subpackages.find((s) => s.root === root)?.pages ?? []
    return ids.map((id) => pageMap.get(id)).filter(Boolean) as SubpackagePage[]
  }

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：页面体积为预设值，非真实包体积。拖拽页面卡片到目标包容器即可分配。
      </div>

      {/* 总体积进度条 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex items-center justify-between font-mono text-caption-mono-sm">
          <span className="text-body-mid">总体积</span>
          <span className={cn('font-bold', totalOverflow ? 'text-red-500' : 'text-ink')}>
            {formatKb(bucketSizes.totalSize)} / 20M
            {totalOverflow && ' ⚠️ 超出 20M 限制'}
          </span>
        </div>
        <div className="mt-xs h-sm overflow-hidden rounded-pill bg-hairline/30">
          <div
            className="h-full rounded-pill transition-all"
            style={{
              width: `${Math.min(100, (bucketSizes.totalSize / TOTAL_LIMIT_KB) * 100)}%`,
              background: totalOverflow ? '#ef4444' : '#07c160',
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1.4fr_1fr]">
        {/* 左：页面池 + 包容器 */}
        <div className="space-y-md">
          {/* 页面池 */}
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              页面池（未分配）· {unassignedPages.length} 个
            </div>
            <div className="flex flex-wrap gap-sm">
              {unassignedPages.length ? (
                unassignedPages.map((p) => (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={() => setDraggingId(p.id)}
                    onDragEnd={() => {
                      setDraggingId(null)
                      setDragOverBucket(null)
                    }}
                    className="cursor-grab rounded-pill border border-hairline bg-canvas-card px-sm py-xs font-mono text-caption-mono-sm text-ink active:cursor-grabbing"
                  >
                    {p.label} <span className="text-body-mid">({formatKb(p.sizeKb)})</span>
                  </div>
                ))
              ) : (
                <span className="font-mono text-caption-mono-sm text-body-mid">所有页面已分配</span>
              )}
            </div>
          </div>

          {/* 包容器 */}
          <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
            {BUCKETS.map((bucket) => {
              const bucketPages = getBucketPages(bucket.root)
              const size = bucket.root === 'main'
                ? bucketSizes.mainSize
                : bucketSizes.subSizes.find((s) => s.root === bucket.root)?.size ?? 0
              const overflow = bucket.root === 'main' && mainOverflow
              const isDragOver = dragOverBucket === bucket.id
              return (
                <div
                  key={bucket.id}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOverBucket(bucket.id)
                  }}
                  onDragLeave={() => setDragOverBucket(null)}
                  onDrop={(e) => {
                    e.preventDefault()
                    if (draggingId) moveToBucket(draggingId, bucket.root)
                    setDraggingId(null)
                    setDragOverBucket(null)
                  }}
                  className={cn(
                    'min-h-[120px] rounded-sm border-2 border-dashed p-md transition-colors',
                    isDragOver ? 'bg-canvas-soft' : 'border-hairline',
                  )}
                  style={isDragOver ? { borderColor: bucket.color } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-body-sm font-bold" style={{ color: bucket.color }}>
                      {bucket.label}
                    </span>
                    <span className={cn('font-mono text-caption-mono-sm', overflow ? 'text-red-500' : 'text-body-mid')}>
                      {formatKb(size)} / 2M{overflow && ' ⚠️'}
                    </span>
                  </div>
                  {bucket.independent && (
                    <div className="mt-xs inline-block rounded-pill bg-[#8b5cf6]/15 px-sm py-xs font-mono text-caption-mono-sm text-[#8b5cf6]">
                      独立分包 · 不依赖主包
                    </div>
                  )}
                  {bucket.id !== 'main' && (
                    <button
                      type="button"
                      onClick={() => toggleIndependent(bucket.root)}
                      className="mt-xs ml-xs rounded-pill border border-hairline px-sm py-xs font-mono text-caption-mono-sm text-body-mid hover:border-body-mid"
                    >
                      {bucket.independent ? '设为普通分包' : '设为独立分包'}
                    </button>
                  )}
                  <div className="mt-sm flex flex-wrap gap-xs">
                    {bucketPages.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => removeFromBucket(p.id)}
                        className="rounded-pill border px-sm py-xs font-mono text-caption-mono-sm transition-colors"
                        style={{ borderColor: bucket.color, color: bucket.color }}
                        title="点击移回页面池"
                      >
                        {p.label} ✕
                      </button>
                    ))}
                    {!bucketPages.length && (
                      <span className="font-mono text-caption-mono-sm text-body-mid">拖入页面…</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            onClick={reset}
            className="rounded-pill border border-hairline px-lg py-sm font-mono text-caption-mono-sm text-body-mid hover:border-body-mid"
          >
            重置配置
          </button>
        </div>

        {/* 右：app.json 配置预览 */}
        <div>
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            app.json 配置预览
          </h4>
          <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-caption-mono-sm text-ink">
            <code>{appJsonCode}</code>
          </pre>
          <div className="mt-md space-y-sm rounded-sm border border-hairline bg-canvas-card p-md font-mono text-caption-mono-sm">
            <div className="flex justify-between">
              <span className="text-body-mid">主包体积</span>
              <span className={mainOverflow ? 'text-red-500' : 'text-[#1a6cff]'}>{formatKb(bucketSizes.mainSize)} / 2M</span>
            </div>
            {bucketSizes.subSizes.map((s) => (
              <div key={s.root} className="flex justify-between">
                <span className="text-body-mid">{s.root}{s.independent ? '（独立）' : ''}</span>
                <span className={s.independent ? 'text-[#8b5cf6]' : 'text-[#07c160]'}>{formatKb(s.size)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-hairline pt-sm">
              <span className="text-body-mid">总包体积</span>
              <span className={totalOverflow ? 'text-red-500' : 'text-ink'}>{formatKb(bucketSizes.totalSize)} / 20M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
