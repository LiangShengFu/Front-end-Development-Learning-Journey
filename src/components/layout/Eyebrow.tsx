/**
 * Eyebrow - 上方的大写跟踪 GeistMono 标签
 *
 * 品牌标志性标签样式：GeistMono uppercase，正向字距 1.4px。
 * 用于每个章节标题上方，作为"代码注释"式的标签。
 */
import { cn } from '../../lib/utils'

interface EyebrowProps {
  /** 标签文本 */
  children: React.ReactNode
  /** 可选的序号标记，如 "01 /" */
  index?: string
  /** 尺寸 */
  size?: 'md' | 'sm'
  /** 额外类名 */
  className?: string
}

export function Eyebrow({ children, index, size = 'md', className }: EyebrowProps) {
  return (
    <div
      className={cn(
        'font-mono uppercase text-body-mid',
        size === 'md' ? 'text-caption-mono tracking-[1.4px]' : 'text-caption-mono-sm tracking-[1.2px]',
        className,
      )}
    >
      {index && <span className="mr-sm text-body-mid/60">{index}</span>}
      <span className="text-ink">{children}</span>
    </div>
  )
}
