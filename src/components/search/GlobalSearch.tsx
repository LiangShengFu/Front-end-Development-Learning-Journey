/**
 * GlobalSearch - 全局搜索容器
 *
 * 监听 Cmd/Ctrl + K 快捷键，控制 CommandPalette 开关。
 * 在根布局渲染一次即可。
 */
import { useEffect, useState } from 'react'
import { CommandPalette } from './CommandPalette'

export function GlobalSearch() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd+K (macOS) / Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    // 监听 NavBar 搜索按钮触发的自定义事件
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpen)
    }
  }, [])

  return <CommandPalette open={open} onClose={() => setOpen(false)} />
}
