/**
 * CSS 交互组件共享 UI 辅助组件
 *
 * 提供 PillBtn / RangeRow / CodeOutput / ControlRow 等通用控件，
 * 供 CSS 模块的 7 个交互式 Playground 复用，确保视觉风格统一。
 */
import type { ReactNode } from 'react'
import { cn } from '../../../lib/utils'

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

export function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mr-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
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
}: {
  children: ReactNode
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-pill border px-sm py-xxs font-mono text-caption-mono-sm uppercase tracking-[1.2px] transition-all hover:scale-105',
        active
          ? 'border-ink bg-ink text-canvas'
          : 'border-hairline bg-canvas-mid text-body hover:border-ink',
      )}
    >
      {children}
    </button>
  )
}

export function RangeRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
  displayValue,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  suffix?: string
  displayValue?: string
}) {
  return (
    <div className="flex items-center gap-xs">
      <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-20 accent-accent-sunset"
      />
      <span className="min-w-[28px] font-mono text-caption-mono-sm text-accent-sunset">
        {displayValue ?? `${value}${suffix ?? ''}`}
      </span>
    </div>
  )
}

export function CodeOutput({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto border-t border-hairline bg-canvas-soft p-md font-mono text-caption-mono leading-relaxed text-body">
      {children}
    </div>
  )
}

export function PropLine({ name, value, comment }: { name: string; value: string; comment?: string }) {
  return (
    <>
      <span className="text-accent-sunset-soft">  {name}</span>
      <span className="text-body-mid">: </span>
      <span className="text-accent-sunset">{value}</span>
      <span className="text-body-mid">;</span>
      {comment && <span className="text-body-mid">  {'/* '}{comment}{' */'}</span>}
      {'\n'}
    </>
  )
}

export function CommentLine({ children }: { children: ReactNode }) {
  return <span className="text-body-mid">{`/* ${children} */`}</span>
}
