/**
 * TailwindPlayground — Tailwind CSS 工具类实时预览
 *
 * 输入 Tailwind 类名，实时渲染效果，支持预设代码片段。
 * Tailwind 工具类与 CSS 属性映射表实现原子化类名的即时翻译。
 *
 * 对应docx中演示 #3 和 #5
 */
import { useState, useMemo } from 'react'
import type { TailwindPlaygroundData } from '../../../lib/css-engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface TailwindPlaygroundProps {
  data?: TailwindPlaygroundData
}

// Tailwind 工具类 → CSS 属性映射表（核心 subset）
const CLASS_MAP: Record<string, Record<string, string>> = {
  // 背景色
  'bg-blue-500': { 'background-color': '#3b82f6' },
  'bg-green-500': { 'background-color': '#22c55e' },
  'bg-red-500': { 'background-color': '#ef4444' },
  'bg-purple-500': { 'background-color': '#a855f7' },
  'bg-orange-500': { 'background-color': '#f97316' },
  'bg-gray-800': { 'background-color': '#1f2937' },
  'bg-gray-900': { 'background-color': '#111827' },
  'bg-white': { 'background-color': '#ffffff', color: '#0a0a0a' },
  'bg-black': { 'background-color': '#000000' },
  'bg-transparent': { 'background-color': 'transparent' },
  'bg-gradient-to-r': { 'background-image': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))' },

  // 文字色
  'text-white': { color: '#ffffff' },
  'text-black': { color: '#000000' },
  'text-gray-300': { color: '#d1d5db' },
  'text-gray-500': { color: '#6b7280' },
  'text-blue-500': { color: '#3b82f6' },
  'text-green-500': { color: '#22c55e' },
  'text-red-500': { color: '#ef4444' },

  // 字号
  'text-xs': { 'font-size': '0.75rem', 'line-height': '1rem' },
  'text-sm': { 'font-size': '0.875rem', 'line-height': '1.25rem' },
  'text-base': { 'font-size': '1rem', 'line-height': '1.5rem' },
  'text-lg': { 'font-size': '1.125rem', 'line-height': '1.75rem' },
  'text-xl': { 'font-size': '1.25rem', 'line-height': '1.75rem' },
  'text-2xl': { 'font-size': '1.5rem', 'line-height': '2rem' },

  // 字重
  'font-bold': { 'font-weight': '700' },
  'font-semibold': { 'font-weight': '600' },
  'font-medium': { 'font-weight': '500' },
  'font-normal': { 'font-weight': '400' },

  // 间距 Padding
  'p-0': { padding: '0' },
  'p-1': { padding: '0.25rem' },
  'p-2': { padding: '0.5rem' },
  'p-3': { padding: '0.75rem' },
  'p-4': { padding: '1rem' },
  'p-6': { padding: '1.5rem' },
  'p-8': { padding: '2rem' },
  'px-4': { 'padding-left': '1rem', 'padding-right': '1rem' },
  'py-2': { 'padding-top': '0.5rem', 'padding-bottom': '0.5rem' },

  // 间距 Margin
  'm-4': { margin: '1rem' },
  'mt-4': { 'margin-top': '1rem' },
  'mb-4': { 'margin-bottom': '1rem' },
  'mx-auto': { 'margin-left': 'auto', 'margin-right': 'auto' },

  // 圆角
  'rounded': { 'border-radius': '0.25rem' },
  'rounded-md': { 'border-radius': '0.375rem' },
  'rounded-lg': { 'border-radius': '0.5rem' },
  'rounded-xl': { 'border-radius': '0.75rem' },
  'rounded-full': { 'border-radius': '9999px' },
  'rounded-none': { 'border-radius': '0' },

  // 边框
  'border': { 'border-width': '1px', 'border-style': 'solid' },
  'border-2': { 'border-width': '2px', 'border-style': 'solid' },
  'border-gray-700': { 'border-color': '#374151' },
  'border-blue-500': { 'border-color': '#3b82f6' },

  // 阴影
  'shadow-sm': { 'box-shadow': '0 1px 2px rgba(0,0,0,0.05)' },
  'shadow': { 'box-shadow': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)' },
  'shadow-md': { 'box-shadow': '0 4px 6px rgba(0,0,0,0.1)' },
  'shadow-lg': { 'box-shadow': '0 10px 15px rgba(0,0,0,0.1)' },

  // 布局
  'flex': { display: 'flex' },
  'inline-flex': { display: 'inline-flex' },
  'grid': { display: 'grid' },
  'block': { display: 'block' },
  'inline-block': { display: 'inline-block' },
  'hidden': { display: 'none' },
  'items-center': { 'align-items': 'center' },
  'justify-center': { 'justify-content': 'center' },
  'justify-between': { 'justify-content': 'space-between' },
  'gap-2': { gap: '0.5rem' },
  'gap-4': { gap: '1rem' },
  'flex-col': { 'flex-direction': 'column' },
  'flex-wrap': { 'flex-wrap': 'wrap' },

  // 尺寸
  'w-full': { width: '100%' },
  'w-auto': { width: 'auto' },
  'h-full': { height: '100%' },
  'max-w-md': { 'max-width': '28rem' },
  'max-w-lg': { 'max-width': '32rem' },

  // 过渡与变换
  'transition': { transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)' },
  'transition-colors': { transition: 'color, background-color, border-color 150ms' },
  'hover:scale-105': {},
  'hover:bg-blue-600': {},
  'hover:text-white': {},

  // 光标
  'cursor-pointer': { cursor: 'pointer' },
  'cursor-not-allowed': { cursor: 'not-allowed' },

  // 溢出
  'overflow-hidden': { overflow: 'hidden' },
  'overflow-auto': { overflow: 'auto' },

  // 透明度
  'opacity-50': { opacity: '0.5' },
  'opacity-75': { opacity: '0.75' },
}

/** 解析类名列表为 CSS 样式对象 */
function parseClasses(classStr: string): Record<string, string> {
  const classes = classStr.trim().split(/\s+/).filter(Boolean)
  const style: Record<string, string> = {}

  for (const cls of classes) {
    // 跳过状态变体前缀（hover:/focus:/dark: 等），查找对应的基础样式
    const baseClass = cls.replace(/^(hover|focus|active|disabled|dark|sm|md|lg|xl|2xl):/, '')

    // 查找映射
    const props = CLASS_MAP[cls] ?? CLASS_MAP[baseClass]
    if (props) {
      Object.assign(style, props)
    }
  }

  return style
}

const DEFAULT_SNIPPETS = [
  {
    label: '按钮',
    classes:
      'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer',
  },
  {
    label: '卡片',
    classes:
      'bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg max-w-md',
  },
  {
    label: '徽章',
    classes:
      'bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full',
  },
  {
    label: '表单',
    classes:
      'bg-gray-900 border border-gray-700 rounded-lg p-3 text-white w-full',
  },
  {
    label: '布局',
    classes:
      'flex items-center justify-between gap-4 p-4 bg-gray-800 rounded-lg',
  },
]

export function TailwindPlayground({ data }: TailwindPlaygroundProps) {
  const snippets = data?.snippets ?? DEFAULT_SNIPPETS
  const [classInput, setClassInput] = useState(
    data?.defaultClasses ?? snippets[0].classes,
  )
  const [activeSnippet, setActiveSnippet] = useState(0)
  const [showMapping, setShowMapping] = useState(false)

  const style = useMemo(() => parseClasses(classInput), [classInput])
  const parsedClasses = useMemo(
    () => classInput.trim().split(/\s+/).filter(Boolean),
    [classInput],
  )

  const handleSnippetClick = (idx: number) => {
    setActiveSnippet(idx)
    setClassInput(snippets[idx].classes)
  }

  return (
    <div className="space-y-lg">
      {/* 代码片段选择器 */}
      <div className="flex flex-wrap gap-sm">
        {snippets.map((snippet, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSnippetClick(i)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm uppercase tracking-[1.2px] transition-colors',
              activeSnippet === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {snippet.label}
          </button>
        ))}

        {/* 映射模式切换 */}
        <button
          type="button"
          onClick={() => setShowMapping(!showMapping)}
          className={cn(
            'ml-auto rounded-pill border px-md py-xs text-caption-mono-sm uppercase tracking-[1.2px] transition-colors',
            showMapping
              ? 'border-accent-dusk bg-accent-dusk text-white'
              : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
          )}
        >
          {showMapping ? '实时预览' : '类名映射'}
        </button>
      </div>

      {showMapping ? (
        /* 类名映射模式 */
        <div className="grid grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-3">
          {parsedClasses.map((cls) => {
            const baseClass = cls.replace(
              /^(hover|focus|active|disabled|dark|sm|md|lg|xl|2xl):/,
              '',
            )
            const props = CLASS_MAP[cls] ?? CLASS_MAP[baseClass]
            const hasVariant = cls !== baseClass

            return (
              <div
                key={cls}
                className={cn(
                  'rounded-sm border p-md transition-colors',
                  props
                    ? 'border-hairline bg-canvas-soft'
                    : 'border-red-500/20 bg-red-500/5',
                )}
              >
                <div className="flex items-center gap-sm">
                  {hasVariant && (
                    <span className="rounded-pill border border-accent-dusk/40 bg-accent-dusk/10 px-xs font-mono text-caption-mono-sm text-accent-dusk">
                      {cls.replace(/:.*/, ':')}
                    </span>
                  )}
                  <span
                    className={cn(
                      'font-mono text-caption-mono-sm',
                      props ? 'text-accent-sunset' : 'text-red-500',
                    )}
                  >
                    {cls}
                  </span>
                </div>
                {props ? (
                  <div className="mt-sm space-y-xxs">
                    {Object.entries(props).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center justify-between text-body-sm"
                      >
                        <span className="text-body-mid">{k}</span>
                        <span className="font-mono text-ink">{v}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-sm text-body-sm text-red-500">
                    未识别的类名
                  </p>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* 实时预览模式 */
        <div className="grid gap-lg md:grid-cols-2">
          {/* 输入面板 */}
          <div className="flex flex-col gap-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                类名输入
              </span>
              <span className="h-2 w-2 rounded-full bg-accent-sunset" />
            </div>
            <textarea
              value={classInput}
              onChange={(e) => {
                setClassInput(e.target.value)
                setActiveSnippet(-1)
              }}
              className="min-h-[120px] w-full resize-y rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink outline-none transition-colors focus:border-accent-sunset/50"
              spellCheck={false}
              placeholder="输入 Tailwind 类名，如: bg-blue-500 text-white p-4 rounded-lg"
            />
            <p className="text-caption-mono-sm text-body-mid">
              {parsedClasses.length} 个类名 ·{' '}
              {Object.keys(style).length} 个 CSS 属性
            </p>
          </div>

          {/* 预览面板 */}
          <div className="flex flex-col gap-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                实时预览
              </span>
              <span className="font-mono text-caption-mono-sm text-accent-sunset">
                Preview
              </span>
            </div>
            <div className="flex min-h-[120px] items-center justify-center rounded-sm border border-hairline bg-canvas-soft p-lg">
              <div style={style} className="transition-all duration-200">
                Styled Element
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
