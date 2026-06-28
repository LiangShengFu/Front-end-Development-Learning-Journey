/**
 * TodoAppDemo - 待办事项应用
 *
 * 完整 CRUD + 筛选 + localStorage 持久化。
 * 使用 useState 管理（项目无 Redux，简化实现）。
 */
import { useEffect, useState } from 'react'
import type { TodoAppData } from '../../../lib/js-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard } from './shared'

interface TodoAppDemoProps {
  data: TodoAppData
}

interface Todo {
  id: number
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

const STORAGE_KEY = 'demo_todos_v1'

const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: '学习 JavaScript 基础', completed: true },
  { id: 2, text: '掌握异步编程', completed: false },
  { id: 3, text: '理解原型链', completed: false },
]

export function TodoAppDemo({ data }: TodoAppDemoProps) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === 'undefined') {
      return data.initialTodos?.map((t, i) => ({ id: i + 1, ...t })) ?? DEFAULT_TODOS
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // 忽略解析错误
    }
    return data.initialTodos?.map((t, i) => ({ id: i + 1, ...t })) ?? DEFAULT_TODOS
  })
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  // 持久化
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // 忽略存储错误（如隐私模式）
    }
  }, [todos])

  const addTodo = () => {
    const text = input.trim()
    if (!text) return
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }])
    setInput('')
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }

  const visibleTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <DemoCard title={data.title}>
      <div className="mx-auto max-w-md p-md">
        {/* 输入区 */}
        <div className="mb-md flex gap-xs">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="添加新任务..."
            className="flex-1 rounded-xs border border-hairline bg-canvas px-sm py-xs text-caption-sm text-body outline-none focus:border-accent-sunset"
          />
          <button
            type="button"
            onClick={addTodo}
            className="rounded-xs bg-accent-sunset px-md py-xs font-mono text-caption-mono-sm font-bold text-black hover:scale-105"
          >
            添加
          </button>
        </div>

        {/* 筛选区 */}
        <div className="mb-md flex items-center gap-xs">
          {(['all', 'active', 'completed'] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-pill border px-sm py-px font-mono text-caption-mono-sm',
                filter === f
                  ? 'border-accent-sunset bg-accent-sunset text-black'
                  : 'border-hairline bg-canvas-mid text-body-mid hover:border-accent-sunset',
              )}
            >
              {f === 'all' ? '全部' : f === 'active' ? '未完成' : '已完成'} ({counts[f]})
            </button>
          ))}
          <button
            type="button"
            onClick={clearCompleted}
            className="ml-auto rounded-pill border border-hairline px-sm py-px font-mono text-caption-mono-sm text-red-400 hover:border-red-400"
          >
            清除已完成
          </button>
        </div>

        {/* 列表 */}
        <ul className="flex flex-col gap-xs">
          {visibleTodos.map((todo) => (
            <li
              key={todo.id}
              className={cn(
                'flex items-center gap-sm rounded-xs border border-hairline bg-canvas-mid px-sm py-xs transition-opacity',
                todo.completed && 'opacity-50',
              )}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 cursor-pointer accent-accent-sunset"
              />
              <span
                className={cn(
                  'flex-1 text-caption-sm text-body',
                  todo.completed && 'line-through',
                )}
              >
                {todo.text}
              </span>
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="text-red-400 hover:scale-110"
                aria-label="删除"
              >
                ✕
              </button>
            </li>
          ))}
          {visibleTodos.length === 0 && (
            <li className="py-md text-center text-caption-sm text-body-mid">暂无任务</li>
          )}
        </ul>

        <div className="mt-md border-t border-hairline pt-xs text-center text-[0.62rem] text-body-mid">
          数据已保存到 localStorage（key: {STORAGE_KEY}）
        </div>
      </div>
    </DemoCard>
  )
}
