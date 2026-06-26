/**
 * HistoryRouterDemo - History 路由演示
 *
 * 模拟 SPA 路由，pushState/replaceState/back/forward 操作，显示历史栈。
 */
import { useState, useCallback } from 'react'
import type { HistoryRouterData } from '../../../lib/dom-bom-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, PillBtn, CodeOutput } from './shared'

interface HistoryRouterDemoProps {
  data: HistoryRouterData
}

interface HistoryEntry {
  path: string
  title: string
}

export function HistoryRouterDemo({ data }: HistoryRouterDemoProps) {
  const routes = data.routes ?? ['/', '/about', '/users', '/contact']
  const [history, setHistory] = useState<HistoryEntry[]>([{ path: '/', title: '首页' }])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [lastOp, setLastOp] = useState<string>('初始化')

  const routeTitles: Record<string, string> = {
    '/': '首页',
    '/about': '关于',
    '/users': '用户',
    '/contact': '联系',
  }

  const pushState = useCallback((path: string) => {
    setHistory((prev) => {
      // 截断当前索引之后的历史
      const truncated = prev.slice(0, currentIdx + 1)
      const newEntry = { path, title: routeTitles[path] ?? path }
      const next = [...truncated, newEntry]
      setCurrentIdx(next.length - 1)
      setLastOp(`pushState('${path}')：新增历史记录`)
      return next
    })
  }, [currentIdx, routeTitles])

  const replaceState = useCallback((path: string) => {
    setHistory((prev) => {
      const next = [...prev]
      next[currentIdx] = { path, title: routeTitles[path] ?? path }
      setLastOp(`replaceState('${path}')：替换当前记录`)
      return next
    })
  }, [currentIdx, routeTitles])

  const back = useCallback(() => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1)
      setLastOp('back()：后退一步')
    }
  }, [currentIdx])

  const forward = useCallback(() => {
    if (currentIdx < history.length - 1) {
      setCurrentIdx((i) => i + 1)
      setLastOp('forward()：前进一步')
    }
  }, [currentIdx, history.length])

  const go = useCallback((delta: number) => {
    const newIdx = currentIdx + delta
    if (newIdx >= 0 && newIdx < history.length) {
      setCurrentIdx(newIdx)
      setLastOp(`go(${delta})：跳转 ${delta} 步`)
    }
  }, [currentIdx, history.length])

  const reset = useCallback(() => {
    setHistory([{ path: '/', title: '首页' }])
    setCurrentIdx(0)
    setLastOp('重置')
  }, [])

  const current = history[currentIdx]

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>导航</GroupLabel>
        <PillBtn onClick={back}>← back()</PillBtn>
        <PillBtn onClick={forward}>forward() →</PillBtn>
        <PillBtn onClick={() => go(-2)}>go(-2)</PillBtn>
        <PillBtn onClick={reset}>重置</PillBtn>
      </ControlRow>

      <ControlRow>
        <GroupLabel>pushState</GroupLabel>
        {routes.map((r) => (
          <PillBtn key={r} variant="primary" active={current.path === r} onClick={() => pushState(r)}>
            {r}
          </PillBtn>
        ))}
      </ControlRow>

      <ControlRow>
        <GroupLabel>replaceState</GroupLabel>
        {routes.map((r) => (
          <PillBtn key={r} active={current.path === r} onClick={() => replaceState(r)}>
            {r}
          </PillBtn>
        ))}
      </ControlRow>

      <div className="grid grid-cols-1 gap-md p-md lg:grid-cols-2">
        {/* 当前页面 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-md">
          <div className="mb-1 text-[0.62rem] uppercase text-body-mid">当前页面（location.pathname）</div>
          <div className="font-mono text-body font-bold text-accent-sunset">{current.path}</div>
          <div className="text-caption-sm text-body">{current.title}</div>
          <div className="mt-2 text-[0.62rem] text-body-mid">
            history.length = <span className="font-mono text-accent-breeze">{history.length}</span>
            {'  '}|  当前索引 = <span className="font-mono text-accent-breeze">{currentIdx}</span>
          </div>
          <div className="mt-2 rounded-xs bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-accent-breeze">
            {lastOp}
          </div>
        </div>

        {/* 历史栈 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
          <div className="mb-1 text-[0.62rem] uppercase text-body-mid">历史栈</div>
          <div className="flex flex-col gap-px font-mono text-caption-mono-sm">
            {history.map((entry, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-sm rounded-px px-sm py-xxs',
                  i === currentIdx ? 'bg-accent-sunset/20 text-accent-sunset' : 'text-body',
                )}
              >
                <span className="w-6 text-body-mid">{i}</span>
                <span className={cn(i === currentIdx && 'font-bold')}>{entry.path}</span>
                {i === currentIdx && <span className="ml-auto text-[0.62rem]">← 当前</span>}
                {i === 0 && <span className="ml-auto text-[0.62rem] text-body-mid">最早</span>}
                {i === history.length - 1 && i !== 0 && (
                  <span className="ml-auto text-[0.62rem] text-body-mid">最新</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* History API */`}</span>
        {'\n'}
        history.<span className="text-accent-sunset">pushState</span>(state, title, url);{'  '}
        <span className="text-body-mid">{'// 新增历史记录'}</span>{'\n'}
        history.<span className="text-accent-sunset">replaceState</span>(state, title, url);{'  '}
        <span className="text-body-mid">{'// 替换当前记录'}</span>{'\n'}
        history.<span className="text-accent-sunset">back</span>();{'  '}
        history.<span className="text-accent-sunset">forward</span>();{'  '}
        history.<span className="text-accent-sunset">go</span>(delta);{'\n'}
        {'\n'}
        <span className="text-accent-breeze">window</span>.addEventListener(
        <span className="text-accent-sunset-soft">'popstate'</span>, (e) =&gt; {'{'}{' '}
        <span className="text-body-mid">{`/* back/forward 触发 */`}</span>{' }'});
      </CodeOutput>
    </DemoCard>
  )
}
