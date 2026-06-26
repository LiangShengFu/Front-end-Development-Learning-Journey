/**
 * EventDelegationDemo - 事件委托演示
 *
 * 动态生成列表项，父元素委托处理点击，对比逐项绑定 vs 事件委托。
 */
import { useState, useRef } from 'react'
import type { EventDelegationData } from '../../../lib/dom-bom-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, PillBtn, CodeOutput } from './shared'

interface EventDelegationDemoProps {
  data: EventDelegationData
}

interface ListItem {
  id: number
  text: string
}

export function EventDelegationDemo({ data }: EventDelegationDemoProps) {
  const initialCount = data.initialCount ?? 10
  const [items, setItems] = useState<ListItem[]>(() =>
    Array.from({ length: initialCount }, (_, i) => ({ id: i + 1, text: `列表项 ${i + 1}` })),
  )
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [log, setLog] = useState<string>('')
  const nextIdRef = useRef(initialCount + 1)

  // 事件委托：父元素统一处理点击
  const handleDelegatedClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement
    const li = target.closest('li')
    if (li && li.dataset.id) {
      const id = Number(li.dataset.id)
      setClickedId(id)
      setLog(`事件委托：通过 e.target.closest('li') 识别 #${id}（仅绑定 1 个监听器）`)
    }
  }

  // 逐项绑定：每个 li 单独绑定
  const handleIndividualClick = (id: number) => {
    setClickedId(id)
    setLog(`逐项绑定：为 #${id} 单独绑定监听器（共 ${items.length} 个监听器）`)
  }

  const [mode, setMode] = useState<'delegation' | 'individual'>('delegation')

  const addItem = () => {
    const newId = nextIdRef.current++
    setItems((prev) => [...prev, { id: newId, text: `列表项 ${newId}` }])
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const resetItems = () => {
    nextIdRef.current = initialCount + 1
    setItems(Array.from({ length: initialCount }, (_, i) => ({ id: i + 1, text: `列表项 ${i + 1}` })))
    setClickedId(null)
    setLog('')
  }

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>模式</GroupLabel>
        <PillBtn active={mode === 'delegation'} onClick={() => setMode('delegation')}>
          事件委托（1 个监听器）
        </PillBtn>
        <PillBtn active={mode === 'individual'} onClick={() => setMode('individual')}>
          逐项绑定（{items.length} 个监听器）
        </PillBtn>
        <span className="ml-auto" />
        <PillBtn variant="primary" active onClick={addItem}>
          + 添加项
        </PillBtn>
        <PillBtn onClick={resetItems}>重置</PillBtn>
      </ControlRow>

      <div className="grid grid-cols-1 gap-md p-md lg:grid-cols-2">
        {/* 列表 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
          <div className="mb-1 text-[0.62rem] uppercase text-body-mid">
            列表（{items.length} 项）· 监听器数：{mode === 'delegation' ? 1 : items.length}
          </div>
          {mode === 'delegation' ? (
            <ul onClick={handleDelegatedClick} className="flex flex-col gap-px">
              {items.map((item) => (
                <li
                  key={item.id}
                  data-id={item.id}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-px px-sm py-xs font-mono text-caption-mono-sm transition-colors',
                    clickedId === item.id ? 'bg-accent-sunset/20 text-accent-sunset' : 'hover:bg-canvas-mid',
                  )}
                >
                  <span>#{item.id} {item.text}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeItem(item.id)
                    }}
                    className="text-red-400 hover:scale-110"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-col gap-px">
              {items.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleIndividualClick(item.id)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-px px-sm py-xs font-mono text-caption-mono-sm transition-colors',
                    clickedId === item.id ? 'bg-accent-sunset/20 text-accent-sunset' : 'hover:bg-canvas-mid',
                  )}
                >
                  <span>#{item.id} {item.text}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeItem(item.id)
                    }}
                    className="text-red-400 hover:scale-110"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 代码对比 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
          <div className="mb-1 text-[0.62rem] uppercase text-body-mid">
            {mode === 'delegation' ? '事件委托实现' : '逐项绑定实现'}
          </div>
          <pre className="overflow-x-auto font-mono text-caption-mono-sm text-body">
            {mode === 'delegation'
              ? `// 仅在父元素绑定 1 个监听器
const ul = document.querySelector('ul');
ul.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (li) {
    const id = li.dataset.id;
    console.log('点击了 #' + id);
  }
});
// 新增项无需重新绑定！`
              : `// 为每个 li 绑定监听器
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    console.log('点击了 #' + li.dataset.id);
  });
});
// 新增项需重新绑定监听器`}
          </pre>
          {log && (
            <div className="mt-2 rounded-xs bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-accent-breeze">
              {log}
            </div>
          )}
        </div>
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* 事件委托优势 */`}</span>
        {'\n'}
        <span className="text-accent-sunset">✓</span> 内存占用少：1 个监听器 vs N 个监听器{'\n'}
        <span className="text-accent-sunset">✓</span> 动态元素无需重新绑定{'\n'}
        <span className="text-accent-sunset">✓</span> 适合大量子元素（如长列表、表格）
      </CodeOutput>
    </DemoCard>
  )
}
