/**
 * RestfulApiDesigner — RESTful API 设计矩阵可视化
 *
 * 展示 RESTful API 资源 × HTTP 方法的设计矩阵：
 * 每行一个资源（如 users、posts），每列一个 HTTP 方法（GET/POST/PUT/PATCH/DELETE）。
 * 点击单元格查看该操作的语义、幂等性、安全性、典型状态码。
 *
 * ⚠️ 教学模拟：静态展示，不发起真实 HTTP 请求。
 */
import { useState } from 'react'
import type {
  RestfulApiDesignerData,
  RestfulApiResource,
  RestfulApiCell,
  HttpMethod,
} from '../../../lib/nodejs-visualization-types'
import { cn } from '../../../lib/utils'

interface RestfulApiDesignerProps {
  data?: RestfulApiDesignerData
}

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

/** 默认资源数据 */
const DEFAULT_RESOURCES: RestfulApiResource[] = [
  {
    id: 'users',
    name: '用户',
    basePath: '/api/users',
    cells: [
      {
        method: 'GET',
        path: '/api/users',
        semantics: '获取用户列表（支持分页、过滤）',
        idempotent: true,
        safe: true,
        statusCodes: '200 / 400 / 401 / 403',
        color: '#1a6cff',
      },
      {
        method: 'POST',
        path: '/api/users',
        semantics: '创建新用户',
        idempotent: false,
        safe: false,
        statusCodes: '201 / 400 / 409 / 422',
        color: '#07c160',
      },
      {
        method: 'PUT',
        path: '/api/users/:id',
        semantics: '整体替换用户（需提供完整字段）',
        idempotent: true,
        safe: false,
        statusCodes: '200 / 204 / 400 / 404',
        color: '#f59e0b',
      },
      {
        method: 'PATCH',
        path: '/api/users/:id',
        semantics: '部分更新用户（仅提供修改字段）',
        idempotent: false,
        safe: false,
        statusCodes: '200 / 204 / 400 / 404',
        color: '#a78bfa',
      },
      {
        method: 'DELETE',
        path: '/api/users/:id',
        semantics: '删除用户',
        idempotent: true,
        safe: false,
        statusCodes: '204 / 404 / 409',
        color: '#ec4899',
      },
    ],
  },
  {
    id: 'posts',
    name: '文章',
    basePath: '/api/posts',
    cells: [
      {
        method: 'GET',
        path: '/api/posts/:id',
        semantics: '获取单篇文章',
        idempotent: true,
        safe: true,
        statusCodes: '200 / 404',
        color: '#1a6cff',
      },
      {
        method: 'POST',
        path: '/api/posts',
        semantics: '创建新文章',
        idempotent: false,
        safe: false,
        statusCodes: '201 / 400 / 401',
        color: '#07c160',
      },
      {
        method: 'PUT',
        path: '/api/posts/:id',
        semantics: '整体更新文章',
        idempotent: true,
        safe: false,
        statusCodes: '200 / 204 / 404',
        color: '#f59e0b',
      },
      {
        method: 'PATCH',
        path: '/api/posts/:id',
        semantics: '部分更新文章（如仅修改标题）',
        idempotent: false,
        safe: false,
        statusCodes: '200 / 204 / 404',
        color: '#a78bfa',
      },
      {
        method: 'DELETE',
        path: '/api/posts/:id',
        semantics: '删除文章',
        idempotent: true,
        safe: false,
        statusCodes: '204 / 404',
        color: '#ec4899',
      },
    ],
  },
]

const DEFAULT_PRINCIPLES = [
  '资源用名词复数（/users 而非 /user），方法用 HTTP 动词表达操作',
  'URL 表达"是什么"，HTTP 方法表达"做什么"',
  '幂等性：GET/PUT/DELETE 幂等，POST/PATCH 不幂等',
  '安全性：GET/HEAD/OPTIONS 安全（不改变状态），其他不安全',
  '状态码语义化：2xx 成功 / 3xx 重定向 / 4xx 客户端错误 / 5xx 服务端错误',
  '版本化：通过 URL（/v1/users）或 Header（Accept: application/vnd.api.v1+json）',
  '分页、过滤、排序通过 query string：?page=1&size=20&sort=created_at:desc',
  '嵌套资源表达从属关系：/users/:id/posts 获取某用户的文章',
]

export function RestfulApiDesigner({ data }: RestfulApiDesignerProps) {
  const resources = data?.resources ?? DEFAULT_RESOURCES
  const principles = data?.principles ?? DEFAULT_PRINCIPLES

  const [selectedKey, setSelectedKey] = useState<string>('')
  // selectedKey 格式: `${resourceId}-${methodIndex}`
  const [selectedResourceIdx, setSelectedResourceIdx] = useState(0)

  const selectedResource = resources[selectedResourceIdx] ?? resources[0]
  const selectedCell: RestfulApiCell | undefined = selectedKey
    ? (() => {
        const [rid, mIdx] = selectedKey.split('-')
        const r = resources.find((r) => r.id === rid)
        return r?.cells[Number(mIdx)]
      })()
    : undefined

  const methodColor = (method: HttpMethod): string => {
    const map: Record<HttpMethod, string> = {
      GET: '#1a6cff',
      POST: '#07c160',
      PUT: '#f59e0b',
      PATCH: '#a78bfa',
      DELETE: '#ec4899',
    }
    return map[method]
  }

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示 RESTful API 设计矩阵，不发起真实 HTTP 请求。
      </div>

      {/* 资源切换 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          资源选择 · 共 {resources.length} 个
        </div>
        <div className="flex flex-wrap gap-xs">
          {resources.map((r, i) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedResourceIdx(i)
                setSelectedKey('')
              }}
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm transition-all',
                i === selectedResourceIdx
                  ? 'bg-accent-sunset text-white'
                  : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover',
              )}
            >
              {r.name} · {r.basePath}
            </button>
          ))}
        </div>
      </div>

      {/* 矩阵表格 */}
      {selectedResource && (
        <div className="rounded-sm border border-hairline bg-canvas-card overflow-hidden">
          <div className="border-b border-hairline bg-canvas-soft px-md py-sm">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              {selectedResource.name} 资源 · API 矩阵 · 点击单元格查看详情
            </span>
          </div>

          {/* 表头 */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-hairline">
            <div className="bg-canvas-soft px-sm py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              方法
            </div>
            {METHODS.map((m) => (
              <div
                key={m}
                className="px-sm py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-white"
                style={{ background: methodColor(m) }}
              >
                {m}
              </div>
            ))}
          </div>

          {/* 行：路径 */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-hairline">
            <div className="bg-canvas-soft px-sm py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              路径
            </div>
            {selectedResource.cells.map((cell, i) => {
              const key = `${selectedResource.id}-${i}`
              const isSelected = selectedKey === key
              return (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={cn(
                    'border-l border-hairline px-sm py-sm text-left font-mono text-caption-mono-sm transition-all',
                    isSelected ? 'text-white' : 'text-ink hover:bg-canvas-bg-hover',
                  )}
                  style={isSelected ? { background: cell.color } : undefined}
                >
                  {cell.path}
                </button>
              )
            })}
          </div>

          {/* 行：语义 */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-hairline">
            <div className="bg-canvas-soft px-sm py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              语义
            </div>
            {selectedResource.cells.map((cell, i) => {
              const key = `${selectedResource.id}-${i}`
              const isSelected = selectedKey === key
              return (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={cn(
                    'border-l border-hairline px-sm py-sm text-left text-body-sm transition-all',
                    isSelected ? 'text-white' : 'text-body hover:bg-canvas-bg-hover',
                  )}
                  style={isSelected ? { background: cell.color } : undefined}
                >
                  {cell.semantics}
                </button>
              )
            })}
          </div>

          {/* 行：幂等性 */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-hairline">
            <div className="bg-canvas-soft px-sm py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              幂等
            </div>
            {selectedResource.cells.map((cell, i) => {
              const key = `${selectedResource.id}-${i}`
              const isSelected = selectedKey === key
              return (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={cn(
                    'border-l border-hairline px-sm py-sm text-left font-mono text-caption-mono-sm transition-all',
                    isSelected ? 'text-white' : 'text-body hover:bg-canvas-bg-hover',
                  )}
                  style={isSelected ? { background: cell.color } : undefined}
                >
                  {cell.idempotent ? '✓ 幂等' : '✗ 不幂等'}
                </button>
              )
            })}
          </div>

          {/* 行：安全性 */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)]">
            <div className="bg-canvas-soft px-sm py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              安全
            </div>
            {selectedResource.cells.map((cell, i) => {
              const key = `${selectedResource.id}-${i}`
              const isSelected = selectedKey === key
              return (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={cn(
                    'border-l border-hairline px-sm py-sm text-left font-mono text-caption-mono-sm transition-all',
                    isSelected ? 'text-white' : 'text-body hover:bg-canvas-bg-hover',
                  )}
                  style={isSelected ? { background: cell.color } : undefined}
                >
                  {cell.safe ? '✓ 安全' : '✗ 不安全'}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 选中单元格详情 */}
      {selectedCell && (
        <div
          className="rounded-sm border p-md"
          style={{ borderColor: `${selectedCell.color}55`, background: `${selectedCell.color}08` }}
        >
          <div className="flex flex-wrap items-center gap-sm">
            <span
              className="rounded-pill px-sm py-xs font-mono text-caption-mono-sm text-white"
              style={{ background: selectedCell.color }}
            >
              {selectedCell.method}
            </span>
            <code className="font-mono text-body-lg text-ink">{selectedCell.path}</code>
          </div>

          <p className="mt-sm text-body-sm text-body">{selectedCell.semantics}</p>

          <div className="mt-md grid gap-md sm:grid-cols-3">
            <div className="rounded-sm border border-hairline bg-canvas-bg-inset p-sm">
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                幂等性
              </div>
              <div className="mt-xs font-mono text-body-sm text-ink">
                {selectedCell.idempotent ? '✓ 幂等' : '✗ 不幂等'}
              </div>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas-bg-inset p-sm">
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                安全性
              </div>
              <div className="mt-xs font-mono text-body-sm text-ink">
                {selectedCell.safe ? '✓ 安全（不改变状态）' : '✗ 不安全'}
              </div>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas-bg-inset p-sm">
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                典型状态码
              </div>
              <div className="mt-xs font-mono text-body-sm text-ink">
                {selectedCell.statusCodes}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 设计原则 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          RESTful API 设计原则
        </div>
        <ul className="mt-md space-y-sm">
          {principles.map((p, i) => (
            <li key={i} className="flex items-start gap-xs text-body-sm text-body">
              <span className="text-accent-sunset">{i + 1}.</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
