/**
 * A11yChecklist - 无障碍检查清单
 *
 * 可交互的 a11y 检查项列表，点击切换勾选状态，实时显示完成进度。
 * 每项包含标题、描述和代码示例，帮助理解无障碍最佳实践。
 *
 * 设计规范：勾选框使用 accent-sunset，进度条动画，
 * 代码片段使用 GeistMono 字体显示。
 */
import { useState } from 'react'
import type { A11yChecklistData } from '../../../lib/html-visualization-types'
import { cn } from '../../../lib/utils'

interface A11yChecklistProps {
  data: A11yChecklistData
}

export function A11yChecklist({ data }: A11yChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(() => {
    const init = new Set<number>()
    data.items.forEach((item, i) => {
      if (item.defaultChecked) init.add(i)
    })
    return init
  })

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        next.add(idx)
      }
      return next
    })
  }

  const progress = Math.round((checked.size / data.items.length) * 100)

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
      {data.title && (
        <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}

      {/* 检查项列表 */}
      <div className="space-y-xs">
        {data.items.map((item, i) => {
          const isChecked = checked.has(i)
          return (
            <div
              key={i}
              className={cn(
                'flex items-start gap-sm rounded-sm border p-md transition-colors cursor-pointer',
                isChecked
                  ? 'border-accent-sunset/40 bg-accent-sunset/5'
                  : 'border-hairline bg-canvas-soft hover:border-accent-sunset/30',
              )}
              onClick={() => toggle(i)}
            >
              {/* 勾选框 */}
              <span
                className={cn(
                  'mt-xxs flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-xxs border-2 transition-colors',
                  isChecked
                    ? 'border-accent-sunset bg-accent-sunset text-canvas'
                    : 'border-hairline text-transparent',
                )}
              >
                ✓
              </span>

              {/* 内容 */}
              <div className="flex-1">
                <div className="text-body-sm text-ink">{item.title}</div>
                <p className="mt-xs text-caption-mono-sm text-body-mid">{item.description}</p>
                {item.code && (
                  <code className="mt-xs inline-block rounded-xxs bg-canvas px-xs py-xxs font-mono text-caption-mono-sm text-accent-sunset">
                    {item.code}
                  </code>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 进度条 */}
      <div className="mt-lg flex items-center gap-md rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="flex-1">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            完成进度
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-canvas">
            <div
              className="h-full rounded-full bg-accent-sunset transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="font-mono text-body-md text-accent-sunset">
          {checked.size}/{data.items.length}
        </div>
        <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          {progress}%
        </div>
      </div>
    </div>
  )
}
