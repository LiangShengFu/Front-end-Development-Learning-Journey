/**
 * CollapsibleSection - 可折叠内容区块
 *
 * 为首页各可视化区块提供统一的折叠/展开交互：
 * - 点击标题栏切换折叠状态，折叠时仅显示标题栏
 * - 使用 framer-motion 实现高度过渡动画，流畅自然
 * - 折叠状态下保持子组件挂载（display:none 包裹），
 *   确保再次展开时数据准确、状态不丢失
 * - 标题栏固定高度，折叠/展开时不会引起页面其他元素位移抖动
 */
import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface CollapsibleSectionProps {
  /** 标题栏 eyebrow 序号，如 "01 /" */
  index?: string
  /** eyebrow 标签文本 */
  eyebrow: ReactNode
  /** 主标题 */
  title: ReactNode
  /** 副标题/描述（折叠时隐藏） */
  description?: ReactNode
  /** 折叠区内容 */
  children: ReactNode
  /** 默认是否展开，默认 true */
  defaultOpen?: boolean
  /** 额外类名（作用于最外层） */
  className?: string
}

export function CollapsibleSection({
  index,
  eyebrow,
  title,
  description,
  children,
  defaultOpen = true,
  className,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className={cn('border-b border-hairline', open ? 'py-3xl' : 'py-xl', className)}>
      <div className="container-page">
        {/* 标题栏 - 可点击切换折叠 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-xl text-left"
        >
          <div className="min-w-0 flex-1">
            <div className="font-mono text-caption-mono uppercase tracking-[1.4px] text-body-mid">
              {index && <span className="mr-sm text-body-mid/60">{index}</span>}
              <span className="text-ink">{eyebrow}</span>
            </div>
            <h2 className="mt-md text-display-sm tracking-display text-ink">{title}</h2>
            {description && (
              <AnimatePresence initial={false}>
                {open && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-md max-w-2xl overflow-hidden text-body-md text-body"
                  >
                    {description}
                  </motion.p>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* 折叠指示器图标 */}
          <span
            className={cn(
              'mt-xs flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-pill border border-hairline text-body-mid transition-all duration-200',
              open ? 'rotate-180 border-accent-sunset/40 text-accent-sunset' : 'hover:border-white/30',
            )}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 5L7 9L11 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* 折叠内容区 - 使用 framer-motion 高度动画 */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              {/* children 始终挂载，仅通过动画显隐，保证折叠时数据更新逻辑不中断 */}
              <div className="mt-2xl">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
