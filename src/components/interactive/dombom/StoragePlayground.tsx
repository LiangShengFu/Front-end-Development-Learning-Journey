/**
 * StoragePlayground - 存储 Playground
 *
 * localStorage/sessionStorage CRUD 操作，显示当前存储内容与容量估算。
 */
import { useState, useEffect, useCallback } from 'react'
import type { StoragePlaygroundData } from '../../../lib/dom-bom-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, PillBtn } from './shared'

interface StoragePlaygroundProps {
  data: StoragePlaygroundData
}

interface StorageItem {
  key: string
  value: string
}

const STORAGE_PREFIX = 'demo_'

export function StoragePlayground({ data }: StoragePlaygroundProps) {
  const [storageType, setStorageType] = useState<'local' | 'session'>(data.storageType ?? 'local')
  const [items, setItems] = useState<StorageItem[]>([])
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const [editKey, setEditKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const getStorage = useCallback(() => {
    if (typeof window === 'undefined') return null
    return storageType === 'local' ? window.localStorage : window.sessionStorage
  }, [storageType])

  const loadItems = useCallback(() => {
    const storage = getStorage()
    if (!storage) return
    const loaded: StorageItem[] = []
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (key && key.startsWith(STORAGE_PREFIX)) {
        loaded.push({ key: key.slice(STORAGE_PREFIX.length), value: storage.getItem(key) ?? '' })
      }
    }
    setItems(loaded)
  }, [getStorage])

  useEffect(() => {
    loadItems()
  }, [loadItems, storageType])

  const addItem = useCallback(() => {
    if (!newKey.trim()) return
    const storage = getStorage()
    if (!storage) return
    storage.setItem(STORAGE_PREFIX + newKey.trim(), newValue)
    setNewKey('')
    setNewValue('')
    loadItems()
  }, [newKey, newValue, getStorage, loadItems])

  const removeItem = useCallback(
    (key: string) => {
      const storage = getStorage()
      if (!storage) return
      storage.removeItem(STORAGE_PREFIX + key)
      loadItems()
    },
    [getStorage, loadItems],
  )

  const clearAll = useCallback(() => {
    const storage = getStorage()
    if (!storage) return
    items.forEach((item) => storage.removeItem(STORAGE_PREFIX + item.key))
    loadItems()
  }, [items, getStorage, loadItems])

  const startEdit = (item: StorageItem) => {
    setEditKey(item.key)
    setEditValue(item.value)
  }

  const saveEdit = () => {
    if (editKey === null) return
    const storage = getStorage()
    if (!storage) return
    storage.setItem(STORAGE_PREFIX + editKey, editValue)
    setEditKey(null)
    setEditValue('')
    loadItems()
  }

  // 容量估算
  const totalSize = items.reduce((sum, item) => sum + (STORAGE_PREFIX + item.key + item.value).length, 0)
  const maxSize = 5 * 1024 * 1024 // 5MB
  const sizePercent = Math.min((totalSize / maxSize) * 100, 100)

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>存储类型</GroupLabel>
        <PillBtn active={storageType === 'local'} onClick={() => setStorageType('local')}>
          localStorage（持久）
        </PillBtn>
        <PillBtn active={storageType === 'session'} onClick={() => setStorageType('session')}>
          sessionStorage（会话）
        </PillBtn>
        <span className="ml-auto" />
        <PillBtn onClick={clearAll}>清空全部</PillBtn>
      </ControlRow>

      <div className="p-md">
        {/* 添加新项 */}
        <div className="mb-md flex flex-wrap items-end gap-sm">
          <div className="flex-1">
            <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">key</label>
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="username"
              className="w-full rounded-xs border border-hairline bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">value</label>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Alice"
              className="w-full rounded-xs border border-hairline bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
            />
          </div>
          <PillBtn variant="primary" active onClick={addItem}>
            setItem
          </PillBtn>
        </div>

        {/* 存储项列表 */}
        <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
          <div className="mb-1 flex items-center justify-between text-[0.62rem] uppercase text-body-mid">
            <span>当前存储（{items.length} 项）</span>
            <span>容量 {totalSize}B / 5MB</span>
          </div>
          {/* 容量条 */}
          <div className="mb-2 h-1 overflow-hidden rounded-pill bg-canvas-mid">
            <div
              className={cn(
                'h-full transition-all',
                sizePercent > 80 ? 'bg-red-400' : 'bg-accent-breeze',
              )}
              style={{ width: `${Math.max(sizePercent, 1)}%` }}
            />
          </div>

          {items.length === 0 ? (
            <div className="py-md text-center font-mono text-caption-mono-sm text-body-mid">暂无存储项</div>
          ) : (
            <div className="flex flex-col gap-px">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-sm rounded-px bg-canvas px-sm py-xs font-mono text-caption-mono-sm"
                >
                  {editKey === item.key ? (
                    <>
                      <span className="text-accent-sunset">{item.key}</span>
                      <span className="text-body-mid">=</span>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 rounded-xs border border-hairline bg-canvas-mid px-sm py-px text-accent-breeze outline-none focus:border-accent-sunset"
                        autoFocus
                      />
                      <PillBtn variant="primary" active onClick={saveEdit}>
                        保存
                      </PillBtn>
                    </>
                  ) : (
                    <>
                      <span className="text-accent-sunset">{item.key}</span>
                      <span className="text-body-mid">=</span>
                      <span className="flex-1 truncate text-accent-breeze">{item.value}</span>
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="text-body-mid hover:text-accent-sunset"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-red-400 hover:scale-110"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-md font-mono text-caption-mono-sm text-body-mid">
          {`// 实际 key 前缀为 "${STORAGE_PREFIX}"，避免污染其他应用数据`}
        </div>
      </div>
    </DemoCard>
  )
}
