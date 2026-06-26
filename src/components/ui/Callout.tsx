/**
 * Callout - 提示/强调块
 *
 * 用于在内容流中突出重要信息。
 * 遵循设计规范：canvas-soft 背景，hairline 边框，左侧 accent 色条。
 */
import { cn } from '../../lib/utils'

interface CalloutProps {
  title?: string
  children: React.ReactNode
  variant?: 'info' | 'warning' | 'tip' | 'note'
  className?: string
}

const variantConfig = {
  info: { bar: 'bg-accent-breeze', label: '信息', labelColor: 'text-accent-breeze' },
  warning: { bar: 'bg-accent-sunset', label: '注意', labelColor: 'text-accent-sunset' },
  tip: { bar: 'bg-accent-twilight', label: '提示', labelColor: 'text-accent-twilight' },
  note: { bar: 'bg-body-mid', label: '说明', labelColor: 'text-body-mid' },
}

export function Callout({ title, children, variant = 'info', className }: CalloutProps) {
  const config = variantConfig[variant]
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm border border-hairline bg-canvas-soft p-xl pl-2xl',
        className,
      )}
    >
      <div className={cn('absolute left-0 top-0 h-full w-[2px]', config.bar)} />
      <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px]">
        <span className={config.labelColor}>{config.label}</span>
        {title && <span className="ml-sm text-ink">{title}</span>}
      </div>
      <div className="text-body-md text-body">{children}</div>
    </div>
  )
}
