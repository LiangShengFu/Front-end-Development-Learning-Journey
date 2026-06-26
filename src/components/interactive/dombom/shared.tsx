/**
 * DOM/BOM 交互组件共享 UI 辅助
 *
 * 复用项目设计语言，提供 DOM/BOM Playground 统一视觉风格。
 */
import type { ReactNode } from 'react'
import { cn } from '../../../lib/utils'

/** 演示卡片容器（带标题栏） */
export function DemoCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-sm border border-hairline bg-canvas-card">
      {title && (
        <div className="border-b border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

/** 控制行 */
export function ControlRow({ children, flat }: { children: ReactNode; flat?: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-xs px-md py-xs',
        !flat && 'border-t border-hairline bg-canvas-mid',
      )}
    >
      {children}
    </div>
  )
}

export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('mr-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid', className)}>
      {children}
    </span>
  )
}

export function Divider() {
  return <span className="mx-xs h-5 w-px bg-hairline" />
}

export function PillBtn({
  children,
  active,
  onClick,
  variant = 'default',
}: {
  children: ReactNode
  active?: boolean
  onClick: () => void
  variant?: 'default' | 'primary'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-pill border px-sm py-xxs font-mono text-caption-mono-sm uppercase tracking-[1.2px] transition-all hover:scale-105',
        variant === 'primary' && active
          ? 'border-accent-sunset bg-accent-sunset text-black'
          : active
            ? 'border-ink bg-ink text-canvas'
            : 'border-hairline bg-canvas-mid text-body hover:border-ink',
      )}
    >
      {children}
    </button>
  )
}

/** 代码输出区 */
export function CodeOutput({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto border-t border-hairline bg-canvas-soft p-md font-mono text-caption-mono leading-relaxed text-body">
      {children}
    </div>
  )
}

/** 输入框 */
export function TextInput({
  value,
  onChange,
  placeholder,
  mono = true,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  mono?: boolean
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'flex-1 rounded-xs border border-hairline bg-canvas px-sm py-xxs text-caption-sm text-body outline-none focus:border-accent-sunset',
        mono && 'font-mono',
      )}
    />
  )
}
