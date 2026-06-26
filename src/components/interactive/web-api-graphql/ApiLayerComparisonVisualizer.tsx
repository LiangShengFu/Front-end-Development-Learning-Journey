/**
 * ApiLayerComparisonVisualizer — API 层方案对比可视化
 *
 * 展示四种主流 API 层方案：
 * - REST：资源 + HTTP 动词。通用、缓存友好、多端复用，但易过度/不足获取。
 * - GraphQL：单一端点 + 按需字段。前端驱动查询，适合多端复杂数据。
 * - tRPC：端到端类型安全。TS 全栈共享类型，零代码生成，适合内部全栈 TS。
 * - TanStack Query：数据获取/缓存编排库。可搭配 REST/GraphQL，专注客户端缓存。
 *
 * 交互：切换方案，左侧展示核心理念与代码示例，右侧展示优缺点与适用场景，
 * 下方为四方案横向对比表（类型安全/过度获取/缓存/学习成本/适用场景）。
 *
 * ⚠️ 教学模拟：代码示例为静态字符串，对比数据为内置常量。
 */
import { useState } from 'react'
import type {
  ApiLayerComparisonData,
  ApiSolution,
  ApiSolutionId,
} from '../../../lib/web-api-graphql-visualization-types'
import { cn } from '../../../lib/utils'

interface ApiLayerComparisonVisualizerProps {
  data?: ApiLayerComparisonData
}

/** 默认方案数据 */
const DEFAULT_SOLUTIONS: ApiSolution[] = [
  {
    id: 'rest',
    name: 'REST',
    shortName: 'REST',
    philosophy: '资源 + HTTP 动词。每个端点返回固定结构，无状态、可缓存。',
    codeSnippet: `// REST：多端点，固定结构
GET    /api/users/1        // 获取用户
GET    /api/users/1/posts   // 获取用户文章
POST   /api/users           // 创建用户
PUT    /api/users/1         // 更新用户
DELETE /api/users/1         // 删除用户

// 前端调用
const user = await fetch('/api/users/1').then(r => r.json())
// 返回固定结构：{ id, name, email, ... } 可能含不需要的字段`,
    useCase: '通用 CRUD、公开 API、需要 HTTP 缓存、多语言后端。',
    pros: ['简单直观，HTTP 语义清晰', '天然支持缓存（ETag/Cache-Control）', '工具链成熟，门槛低'],
    cons: ['易过度获取（返回不需要的字段）', '易不足获取（需多次请求拼数据）', '类型需手动维护或 codegen'],
    color: '#1a6cff',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    shortName: 'GraphQL',
    philosophy: '单一端点 + 按需字段。前端声明所需数据，服务端只返回选中字段。',
    codeSnippet: `// GraphQL：单端点，按需取字段
POST /graphql
query {
  user(id: 1) {
    id
    name
    posts { title }   // 关联文章只取标题
  }
}

// 前端调用（Apollo Client）
const { data } = useQuery(GET_USER, {
  variables: { id: 1 }
})`,
    useCase: '多端复杂数据、BFF 聚合、前端需要灵活字段组合。',
    pros: ['按需取数，无过度/不足获取', '单请求获取关联数据', 'Schema 即文档，类型自省'],
    cons: ['服务端实现复杂（N+1 问题）', 'HTTP 缓存需额外处理（POST 端点）', '查询深度/复杂度需限制'],
    color: '#ec4899',
  },
  {
    id: 'trpc',
    name: 'tRPC',
    shortName: 'tRPC',
    philosophy: '端到端类型安全。TS 全栈共享类型，无 codegen，过程调用风格。',
    codeSnippet: `// tRPC：服务端定义 router
const userRouter = t.router({
  getById: t.procedure.input(z.string()).query(({ input }) =>
    db.user.findById(input)
  ),
})

// 前端直接调用，类型自动推断
const user = await trpc.user.getById.query('1')
//    ^? User 类型自动推导，无需手动声明`,
    useCase: 'TS 全栈内部应用、Monorepo、追求零 codegen 的类型安全。',
    pros: ['端到端类型安全，无 codegen', '开发体验极佳（IDE 自动补全）', '过程调用风格直观'],
    cons: ['前后端必须同语言（TS）', '不适合公开 API 或跨语言后端', '生态与中间件不如 REST 成熟'],
    color: '#07c160',
  },
  {
    id: 'tanstack-query',
    name: 'TanStack Query',
    shortName: 'Query',
    philosophy: '客户端数据获取/缓存编排。可搭配 REST/GraphQL，专注缓存与状态。',
    codeSnippet: `// TanStack Query：缓存 + 状态管理
const { data, isLoading, error } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetch(\`/api/users/\${id}\`).then(r => r.json()),
  staleTime: 60_000,    // 1 分钟内不重新请求
  enabled: !!id,
})

// 自动处理缓存、去重、重试、后台刷新`,
    useCase: '客户端数据缓存编排，可叠加在 REST/GraphQL/tRPC 之上。',
    pros: ['专注客户端缓存与状态', '自动去重、重试、后台刷新', '与任何传输层兼容'],
    cons: ['不解决类型安全（需配合 TS）', '不解决服务端实现', '需与传输层搭配使用'],
    color: '#f59e0b',
  },
]

/** 横向对比表数据 */
const COMPARE_ROWS = [
  { dimension: '类型安全', rest: '手动/codegen', graphql: 'Schema 自省', trpc: '端到端原生', tanstack: '依赖搭配' },
  { dimension: '过度获取', rest: '常见', graphql: '可避免', trpc: '可避免', tanstack: '依赖搭配' },
  { dimension: '客户端缓存', rest: 'HTTP 缓存', graphql: '需 Apollo', trpc: '需搭配', tanstack: '原生强项' },
  { dimension: '学习成本', rest: '低', graphql: '中', trpc: '中', tanstack: '低-中' },
  { dimension: '跨语言后端', rest: '支持', graphql: '支持', trpc: '不支持', tanstack: '支持' },
]

export function ApiLayerComparisonVisualizer({ data }: ApiLayerComparisonVisualizerProps) {
  const solutions = data?.solutions ?? DEFAULT_SOLUTIONS
  const selectionNote =
    data?.selectionNote ??
    'API 层选型需权衡：通用公开 API 选 REST；多端复杂数据选 GraphQL；TS 全栈内部应用选 tRPC；任何方案都可用 TanStack Query 做客户端缓存编排。下方切换方案对比核心理念与代码。'

  const [activeId, setActiveId] = useState<ApiSolutionId>('rest')
  const selected = solutions.find((s) => s.id === activeId) ?? solutions[0]

  return (
    <div className="space-y-lg">
      {/* 选型说明 */}
      <div className="rounded-sm border-l-4 border-[#f59e0b] bg-[#f59e0b]/8 px-md py-sm">
        <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#f59e0b]">
          API 层方案选型
        </div>
        <p className="mt-xs text-caption text-ink">{selectionNote}</p>
      </div>

      {/* 方案切换按钮 */}
      <div className="flex flex-wrap gap-xs">
        {solutions.map((solution) => {
          const isActive = activeId === solution.id
          return (
            <button
              key={solution.id}
              onClick={() => setActiveId(solution.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: solution.color } : undefined}
            >
              {solution.shortName}
            </button>
          )
        })}
      </div>

      {/* 双栏：左 核心理念 + 代码 + 右 优缺点 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center justify-between">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              核心理念与代码
            </span>
            <span
              className="rounded-pill px-sm py-xxs font-mono text-caption-mono-xs text-white"
              style={{ backgroundColor: selected.color }}
            >
              {selected.name}
            </span>
          </div>
          <p className="text-caption text-ink">{selected.philosophy}</p>
          <pre className="mt-sm overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
            <code>{selected.codeSnippet}</code>
          </pre>
          <div className="mt-sm">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              适用场景
            </span>
            <p className="mt-xs text-caption text-ink">{selected.useCase}</p>
          </div>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
            优缺点对比
          </div>
          <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
            <div className="rounded-sm border border-hairline px-sm py-xs">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-green-600">
                优点
              </div>
              <ul className="mt-xs space-y-xs">
                {selected.pros.map((pro) => (
                  <li key={pro} className="text-caption text-ink">
                    + {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm border border-hairline px-sm py-xs">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-red-500">
                缺点
              </div>
              <ul className="mt-xs space-y-xs">
                {selected.cons.map((con) => (
                  <li key={con} className="text-caption text-ink">
                    - {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 横向对比表 */}
      <div className="overflow-x-auto rounded-md border border-hairline bg-canvas-card">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-hairline">
              <th className="px-md py-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                维度
              </th>
              {solutions.map((s) => (
                <th
                  key={s.id}
                  className="px-md py-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px]"
                  style={{ color: s.color }}
                >
                  {s.shortName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.dimension} className="border-b border-hairline last:border-b-0">
                <td className="px-md py-xs font-mono text-caption-mono-xs text-body-mid">
                  {row.dimension}
                </td>
                <td className="px-md py-xs text-caption text-ink">{row.rest}</td>
                <td className="px-md py-xs text-caption text-ink">{row.graphql}</td>
                <td className="px-md py-xs text-caption text-ink">{row.trpc}</td>
                <td className="px-md py-xs text-caption text-ink">{row.tanstack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
