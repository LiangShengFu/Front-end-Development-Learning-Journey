/**
 * SkillBar - 技能条进度动画
 *
 * 展示技能掌握程度的进度条，带动画效果。
 * 遵循设计规范：canvas-card 背景，accent-sunset 进度条。
 */
import { useEffect, useRef, useState } from 'react'
import type { SkillBarData } from '../../lib/types'
import { cn } from '../../lib/utils'

interface SkillBarProps {
  data: SkillBarData
}

export function SkillBar({ data }: SkillBarProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="space-y-xl">
      {data.skills.map((skill, i) => (
        <div key={i}>
          <div className="mb-sm flex items-baseline justify-between">
            <span className="text-body-md text-ink">{skill.name}</span>
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              {skill.level}%
            </span>
          </div>
          <div className="h-[6px] w-full overflow-hidden rounded-pill bg-canvas-mid">
            <div
              className={cn(
                'h-full rounded-pill bg-gradient-to-r from-accent-sunset to-accent-sunset-soft transition-all duration-1000 ease-out',
                visible ? 'w-0' : 'w-0',
              )}
              style={{
                width: visible ? `${skill.level}%` : '0%',
                transitionDelay: `${i * 100}ms`,
              }}
            />
          </div>
          {skill.description && (
            <p className="mt-xs text-body-sm text-body-mid">{skill.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
