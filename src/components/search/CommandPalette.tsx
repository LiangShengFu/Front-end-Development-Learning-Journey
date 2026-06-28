/**
 * CommandPalette - Cmd+K 全局搜索命令面板
 *
 * 功能：
 * - Cmd/Ctrl + K 唤起，Esc 关闭
 * - 实时搜索（防抖 120ms）
 * - 模块级 + 知识点级两级结果
 * - 键盘导航：↑↓ 选择、Enter 跳转、Esc 关闭
 * - 首次打开时异步构建知识点索引（懒加载所有模块）
 *
 * 集成方式：在根渲染处放置一次，监听全局快捷键。
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { useI18n } from '../../lib/i18n'
import {
  buildKnowledgePointUrl,
  buildFullIndex,
  search,
  isIndexReady,
  type SearchResult,
} from '../../lib/search-index'

interface CommandPaletteProps {
  /** 受控开关 */
  open: boolean
  /** 关闭回调 */
  onClose: () => void
}

/** 防抖延迟 */
const DEBOUNCE_MS = 120

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate()
  const { t } = useI18n()
  const inputRef = useRef<HTMLInputElement>(null)
  /** 结果项 DOM 引用，用于键盘导航时滚动到可视区 */
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [activeIdx, setActiveIdx] = useState(0)
  const [indexBuilding, setIndexBuilding] = useState(false)

  // 打开时清空状态 + 聚焦 + 异步构建索引
  useEffect(() => {
    if (!open) return
    setQuery('')
    setResults([])
    setActiveIdx(0)
    itemRefs.current = []
    requestAnimationFrame(() => inputRef.current?.focus())

    if (!isIndexReady() && !indexBuilding) {
      setIndexBuilding(true)
      buildFullIndex()
        .catch(() => {
          // 索引构建失败时仍允许模块级搜索，不抛错
        })
        .finally(() => setIndexBuilding(false))
    }
  }, [open, indexBuilding])

  // 防抖搜索
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      setResults(search(query))
      setActiveIdx(0)
    }, DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [query, open])

  // Esc 关闭
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // 跳转到搜索结果
  const goto = useCallback(
    (result: SearchResult) => {
      const url = buildKnowledgePointUrl(result.moduleSlug, result.pointOrder)
      navigate(url)
      onClose()
    },
    [navigate, onClose],
  )

  // 键盘导航
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && results[activeIdx]) {
        e.preventDefault()
        goto(results[activeIdx])
      }
    },
    [results, activeIdx, goto],
  )

  // 选中项变化时滚动到可视区
  useEffect(() => {
    const el = itemRefs.current[activeIdx]
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('search.ariaLabel')}
    >
      <div
        className="mt-[15vh] flex max-h-[70vh] w-[92vw] max-w-2xl flex-col overflow-hidden rounded-sm border border-hairline bg-canvas-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* 输入框 */}
        <div className="flex items-center gap-md border-b border-hairline px-lg py-md">
          <SearchIcon className="h-4 w-4 shrink-0 text-body-mid" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 bg-transparent text-body-md text-ink outline-none placeholder:text-body-mid"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden rounded-sm border border-hairline px-xs py-[2px] font-mono text-caption-mono-sm text-body-mid md:inline">
            ESC
          </kbd>
        </div>

        {/* 结果列表 */}
        <div className="flex-1 overflow-y-auto py-xs">
          {results.length === 0 && query.trim() && (
            <div className="px-lg py-xl text-center text-body-sm text-body-mid">
              {t('search.empty')}
            </div>
          )}
          {results.length === 0 && !query.trim() && (
            <div className="px-lg py-xl text-center text-body-sm text-body-mid">
              {t('search.hint')}
              {indexBuilding && t('search.buildingIndex')}
            </div>
          )}
          {results.map((result, idx) => (
            <button
              key={`${result.type}-${result.moduleSlug}-${result.pointOrder ?? 'mod'}`}
              ref={(el) => {
                itemRefs.current[idx] = el
              }}
              type="button"
              onClick={() => goto(result)}
              onMouseEnter={() => setActiveIdx(idx)}
              aria-current={idx === activeIdx ? 'true' : undefined}
              className={cn(
                'relative flex w-full items-start gap-md border-l-2 px-lg py-md text-left transition-colors',
                idx === activeIdx
                  ? 'border-l-accent-sunset bg-canvas-bg-inset'
                  : 'border-l-transparent hover:bg-canvas-bg-inset',
              )}
            >
              <span
                className={cn(
                  'mt-[2px] font-mono text-caption-mono',
                  idx === activeIdx ? 'text-accent-sunset' : 'text-body-mid',
                )}
              >
                {result.type === 'module' ? 'MOD' : 'KP'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-sm">
                  <span
                    className={cn(
                      'font-mono text-caption-mono',
                      idx === activeIdx ? 'text-accent-sunset' : 'text-body-mid',
                    )}
                  >
                    {result.moduleNumber}
                  </span>
                  <span
                    className={cn(
                      'truncate text-body-sm',
                      idx === activeIdx ? 'text-ink font-medium' : 'text-ink',
                    )}
                  >
                    {result.pointTitle ?? t(`module.${result.moduleSlug}.title`)}
                  </span>
                  {result.pointDifficulty !== undefined && (
                    <span className="text-caption-mono-sm text-body-mid">
                      {'★'.repeat(result.pointDifficulty)}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'mt-[2px] line-clamp-2 text-caption',
                    idx === activeIdx ? 'text-body' : 'text-body-mid',
                  )}
                >
                  {result.snippet}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="flex items-center justify-between border-t border-hairline px-lg py-xs text-caption-mono-sm text-body-mid">
          <span>{t('search.navHint')}</span>
          <span>{t('search.resultsCount', { n: results.length })}</span>
        </div>
      </div>
    </div>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
