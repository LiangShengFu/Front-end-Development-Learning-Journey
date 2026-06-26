/**
 * Section - 章节容器
 *
 * 遵循 DESIGN.md 的 content-band 规范：
 * - 背景 canvas，padding 4xl xl
 * - 章节标题 display-md，前置 eyebrow-mono 标签
 */
import { cn } from '../../lib/utils'
import { Eyebrow } from '../layout/Eyebrow'

interface SectionProps {
  /** eyebrow 标签文本 */
  eyebrow?: string
  /** eyebrow 序号 */
  index?: string
  /** 章节标题 */
  title?: string
  /** 标题级别 */
  titleLevel?: 'display-md' | 'display-sm' | 'display-xs'
  /** 章节描述 */
  description?: string
  /** 内容 */
  children: React.ReactNode
  /** 额外类名 */
  className?: string
  /** 内容容器类名 */
  contentClassName?: string
  /** 是否带顶部 hairline 分隔 */
  hairline?: boolean
}

const titleSizeMap = {
  'display-md': 'text-display-md tracking-display',
  'display-sm': 'text-display-sm tracking-display',
  'display-xs': 'text-display-xs',
}

export function Section({
  eyebrow,
  index,
  title,
  titleLevel = 'display-sm',
  description,
  children,
  className,
  contentClassName,
  hairline: showHairline = false,
}: SectionProps) {
  return (
    <section className={cn('py-3xl md:py-4xl', showHairline && 'border-t border-hairline', className)}>
      <div className="container-page">
        {(eyebrow || title) && (
          <header className="mb-2xl">
            {eyebrow && (
              <Eyebrow index={index} className="mb-md">
                {eyebrow}
              </Eyebrow>
            )}
            {title && (
              <h2 className={cn('font-sans font-normal text-ink', titleSizeMap[titleLevel])}>
                {title}
              </h2>
            )}
            {description && <p className="mt-md max-w-2xl text-body-lg text-body">{description}</p>}
          </header>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  )
}
