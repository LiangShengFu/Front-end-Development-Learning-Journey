/**
 * DragInteraction - 拖拽交互演示
 *
 * 演示 HTML5 拖拽 API，可在项目与目标区域之间拖拽。
 * 遵循设计规范：canvas-card 背景，拖拽时 accent-sunset 高亮。
 */
import { useState } from 'react'
import type { DragInteractionData } from '../../lib/types'
import { cn } from '../../lib/utils'

interface DragInteractionProps {
  data: DragInteractionData
}

export function DragInteraction({ data }: DragInteractionProps) {
  const [available, setAvailable] = useState(data.items)
  const [dropped, setDropped] = useState<typeof data.items>([])
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [isOver, setIsOver] = useState(false)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
    setDraggingId(id)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setIsOver(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsOver(true)
  }

  const handleDragLeave = () => {
    setIsOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    const item = available.find((it) => it.id === id)
    if (item) {
      setAvailable((prev) => prev.filter((it) => it.id !== id))
      setDropped((prev) => [...prev, item])
    }
    setIsOver(false)
    setDraggingId(null)
  }

  const handleReset = () => {
    setAvailable(data.items)
    setDropped([])
  }

  return (
    <div className="space-y-lg">
      <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
        {/* Source */}
        <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
          <div className="mb-lg font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            可拖拽项目
          </div>
          <div className="flex flex-wrap gap-sm">
            {available.length === 0 ? (
              <span className="text-body-sm text-body-mid">所有项目已拖出</span>
            ) : (
              available.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    'cursor-grab rounded-pill border border-hairline bg-canvas-soft px-md py-xs text-body-sm text-ink transition-all active:cursor-grabbing',
                    draggingId === item.id && 'opacity-40',
                  )}
                >
                  {item.label}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Drop target */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'rounded-sm border-2 border-dashed p-xl transition-colors',
            isOver
              ? 'border-accent-sunset bg-accent-sunset/5'
              : 'border-hairline bg-canvas-card',
          )}
        >
          <div className="mb-lg font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            {data.targetLabel ?? '拖放到此处'}
          </div>
          <div className="flex flex-wrap gap-sm">
            {dropped.length === 0 ? (
              <span className="text-body-sm text-body-mid">将项目拖到这里</span>
            ) : (
              dropped.map((item) => (
                <div
                  key={item.id}
                  className="rounded-pill border border-accent-sunset/40 bg-accent-sunset/10 px-md py-xs text-body-sm text-ink"
                >
                  {item.label}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={handleReset} className="btn-pill-sm">
          重置
        </button>
      </div>
    </div>
  )
}
