/**
 * ApiTypingWorkbench — 类型安全 API 工作台
 *
 * 对比三种 API 封装策略：无类型（基础）、泛型约束、完整类型安全。
 * 帮助理解类型系统如何提升 API 调用的安全性和开发体验。
 *
 * 对应docx中演示 #13
 */
import { useState } from 'react'
import type { ApiTypingWorkbenchData } from '../../../lib/typescript-visualization-types'
import { cn } from '../../../lib/utils'

interface ApiTypingWorkbenchProps {
  data?: ApiTypingWorkbenchData
}

const DEFAULT_SCENARIOS = [
  {
    name: '用户 API',
    level: 'full' as const,
    unsafe: `// ❌ 无类型：返回值完全不可预测
function fetchUser(id) {
  return fetch('/api/user/' + id)
    .then(r => r.json())
}

const user = await fetchUser(42)
user.nme  // 拼写错误，不报错
user.role  // 运行时才知道有没有`,
    safe: `// ✅ 完整类型安全
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch('/api/user/' + id)
  if (!res.ok) throw new Error('Failed')
  return res.json() as Promise<User>
}

const user = await fetchUser(42)
user.nme  // ❌ TS 报错！
user.role.toUpperCase()  // ✅ 自动补全`,
    description: '对比无类型 vs 完整类型安全的 API 调用',
  },
  {
    name: '通用请求封装',
    level: 'generic' as const,
    unsafe: `// ❌ 无泛型：每次需手动处理
function get(url) {
  return fetch(url).then(r => r.json())
}
// 调用时只能猜测返回值类型
const data = await get('/api/users')`,
    safe: `// ✅ 泛型 Request<T>
interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

async function request<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url)
  return res.json()
}

// 调用时指定类型
const { data } = await request<User[]>('/api/users')
// data 自动推断为 User[]`,
    description: '泛型 request<T> 封装 vs 无类型 fetch',
  },
  {
    name: '表单提交',
    level: 'basic' as const,
    unsafe: `// ❌ 无类型约束的提交
function submitForm(data) {
  return fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(r => r.json())
}
// 可能少传字段、类型错误`,
    safe: `// ✅ 类型安全的表单
interface FormData {
  title: string
  content: string
  tags: string[]
}

async function submitForm<T extends Record<string, unknown>>(
  data: T
): Promise<{ id: number }> {
  return fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json())
}

// 调用时完全类型安全
const result = await submitForm<FormData>({
  title: 'Hello',
  content: 'World',
  tags: ['ts', 'api']
})`,
    description: '类型安全的表单提交 vs 无约束',
  },
]

export function ApiTypingWorkbench({ data }: ApiTypingWorkbenchProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [activeIdx, setActiveIdx] = useState(data?.defaultScenario ?? 0)
  const scenario = scenarios[activeIdx]

  const levelBadge = {
    basic: 'bg-red-500/20 text-red-500',
    generic: 'bg-accent-sunset/20 text-accent-sunset',
    full: 'bg-accent-dusk/20 text-accent-dusk',
  }

  const levelLabel = {
    basic: '基础类型',
    generic: '泛型约束',
    full: '完整类型安全',
  }

  return (
    <div className="space-y-lg">
      {/* Scenario selector */}
      <div className="flex flex-wrap gap-sm">
        {scenarios.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
              activeIdx === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
        <div className="flex items-center gap-sm">
          <span
            className={cn(
              'rounded-pill px-md py-xxs font-mono text-caption-mono-sm',
              levelBadge[scenario.level],
            )}
          >
            {levelLabel[scenario.level]}
          </span>
          <span className="text-body-sm text-body">{scenario.description}</span>
        </div>
      </div>

      {/* Code comparison */}
      <div className="grid gap-lg lg:grid-cols-2">
        {/* Unsafe */}
        <div className="rounded-sm border border-red-500/30">
          <div className="border-b border-red-500/20 bg-red-500/5 px-lg py-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-red-500">
                不安全代码
              </span>
              <span className="text-red-500 text-caption-mono-sm">⚠ 运行时风险</span>
            </div>
          </div>
          <pre className="overflow-x-auto p-lg font-mono text-body-sm text-ink leading-relaxed">
            {scenario.unsafe}
          </pre>
        </div>

        {/* Safe */}
        <div className="rounded-sm border border-accent-sunset/40">
          <div className="border-b border-accent-sunset/30 bg-accent-sunset/5 px-lg py-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
                类型安全代码
              </span>
              <span className="text-accent-sunset-soft text-caption-mono-sm">✓ 编译时检查</span>
            </div>
          </div>
          <pre className="overflow-x-auto p-lg font-mono text-body-sm text-ink leading-relaxed">
            {scenario.safe}
          </pre>
        </div>
      </div>
    </div>
  )
}
