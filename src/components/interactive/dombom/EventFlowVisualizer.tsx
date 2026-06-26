/**
 * EventFlowVisualizer - 事件流三阶段可视化
 *
 * 三层嵌套元素演示捕获→目标→冒泡三阶段，点击中心元素显示事件传播路径。
 */
import { useState } from 'react'
import type { EventFlowVisualizerData } from '../../../lib/dom-bom-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, PillBtn, CodeOutput } from './shared'

interface EventFlowVisualizerProps {
  data: EventFlowVisualizerData
}

interface LogEntry {
  phase: 'capture' | 'target' | 'bubble'
  element: string
}

export function EventFlowVisualizer({ data }: EventFlowVisualizerProps) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [useCapture, setUseCapture] = useState(false)

  const elements = [
    { name: 'document', label: 'document' },
    { name: 'outer', label: '#outer (div)' },
    { name: 'middle', label: '#middle (div)' },
    { name: 'inner', label: '#inner (button)' },
  ]

  const handleClick = (target: string) => {
    const newLogs: LogEntry[] = []
    // 找到目标在元素链中的位置
    const idx = elements.findIndex((e) => e.name === target)
    // 捕获阶段：从 document 到目标
    for (let i = 0; i <= idx; i++) {
      if (i < idx) newLogs.push({ phase: 'capture', element: elements[i].label })
    }
    // 目标阶段
    newLogs.push({ phase: 'target', element: elements[idx].label })
    // 冒泡阶段：从目标到 document
    for (let i = idx - 1; i >= 0; i--) {
      newLogs.push({ phase: 'bubble', element: elements[i].label })
    }
    setLogs(newLogs)
  }

  const phaseColor = (phase: LogEntry['phase']) =>
    phase === 'capture'
      ? 'text-accent-breeze'
      : phase === 'target'
        ? 'text-accent-sunset'
        : 'text-orange-400'

  const phaseLabel = (phase: LogEntry['phase']) =>
    phase === 'capture' ? '捕获' : phase === 'target' ? '目标' : '冒泡'

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>addEventListener 第三参数</GroupLabel>
        <PillBtn active={!useCapture} onClick={() => setUseCapture(false)}>
          useCapture=false（默认）
        </PillBtn>
        <PillBtn active={useCapture} onClick={() => setUseCapture(true)}>
          useCapture=true
        </PillBtn>
      </ControlRow>

      <div className="grid grid-cols-1 gap-md p-md lg:grid-cols-2">
        {/* 嵌套元素可视化 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-md">
          <div className="mb-2 text-[0.62rem] uppercase text-body-mid">点击下方任意元素</div>
          <div className="flex flex-col items-center gap-xs">
            <div
              onClick={() => handleClick('document')}
              className="w-full cursor-pointer rounded-xs border-2 border-dashed border-accent-breeze p-sm text-center font-mono text-caption-mono-sm text-accent-breeze hover:bg-accent-breeze/10"
            >
              document
            </div>
            <div
              onClick={() => handleClick('outer')}
              className="w-[85%] cursor-pointer rounded-xs border-2 border-accent-sunset bg-accent-sunset/10 p-sm"
            >
              <div className="mb-1 text-center font-mono text-caption-mono-sm text-accent-sunset">#outer</div>
              <div
                onClick={() => handleClick('middle')}
                className="cursor-pointer rounded-xs border-2 border-orange-400 bg-orange-400/10 p-sm"
              >
                <div className="mb-1 text-center font-mono text-caption-mono-sm text-orange-400">#middle</div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClick('inner')
                  }}
                  className="block w-full cursor-pointer rounded-xs border-2 border-ink bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-ink hover:bg-ink hover:text-canvas"
                >
                  #inner（目标）
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 事件传播路径 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
          <div className="mb-1 text-[0.62rem] uppercase text-body-mid">事件传播路径</div>
          {logs.length === 0 ? (
            <div className="font-mono text-caption-mono-sm text-body-mid">// 点击元素查看传播路径</div>
          ) : (
            <div className="flex flex-col gap-px font-mono text-caption-mono-sm">
              {logs.map((log, i) => (
                <div key={i} className="flex items-center gap-sm py-px">
                  <span className="w-8 text-body-mid">{String(i + 1).padStart(2, '0')}.</span>
                  <span className={cn('rounded-pill px-sm py-px text-[0.62rem] font-bold', phaseColor(log.phase))}>
                    {phaseLabel(log.phase)}
                  </span>
                  <span className="text-body">{log.element}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* 事件流三阶段 */`}</span>
        {'\n'}
        <span className="text-accent-sunset">1. 捕获阶段</span>（Capture）：从 document 向下到目标元素的父级{'\n'}
        <span className="text-accent-sunset">2. 目标阶段</span>（Target）：事件到达目标元素{'\n'}
        <span className="text-accent-sunset">3. 冒泡阶段</span>（Bubble）：从目标元素向上到 document{'\n'}
        {'\n'}
        <span className="text-accent-breeze">element</span>.addEventListener(
        <span className="text-accent-sunset-soft">'click'</span>, fn,{' '}
        <span className="text-orange-400">{String(useCapture)}</span>
        );{'  '}
        <span className="text-body-mid">{useCapture ? '// 在捕获阶段触发' : '// 在冒泡阶段触发'}</span>
      </CodeOutput>
    </DemoCard>
  )
}
