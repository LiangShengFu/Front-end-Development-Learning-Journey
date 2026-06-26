/**
 * GraphQLSchemaExplorer — GraphQL Schema 类型树 + 查询构建器
 *
 * 展示 GraphQL Schema 的核心组成：
 * - 类型系统：ObjectType / ScalarType / EnumType / InputType
 * - 操作类型：Query（读）/ Mutation（写）/ Subscription（订阅）
 * - 字段选择：按需选取字段，服务端只返回选中字段（避免过度获取）
 *
 * 交互：左侧类型树浏览（点击类型查看字段），勾选 Query 字段，
 * 右侧实时生成 GraphQL 查询语句，下方展示 Schema 定义代码。
 *
 * ⚠️ 教学模拟：Schema 与字段为静态数据，查询语句由本地勾选状态拼接。
 */
import { useMemo, useState } from 'react'
import type {
  GraphQLSchemaData,
  GraphQLTypeNode,
  GraphQLOperationType,
} from '../../../lib/web-api-graphql-visualization-types'
import { cn } from '../../../lib/utils'

interface GraphQLSchemaExplorerProps {
  data?: GraphQLSchemaData
}

/** 默认 Schema 类型数据 */
const DEFAULT_TYPES: GraphQLTypeNode[] = [
  {
    name: 'Query',
    kind: 'ObjectType',
    description: '查询根类型，所有读操作入口。',
    color: '#1a6cff',
    fields: [
      { name: 'user', type: 'User', description: '按 ID 查询用户', queryable: true },
      { name: 'users', type: '[User]!', description: '用户列表（分页）', queryable: true },
      { name: 'posts', type: '[Post]!', description: '文章列表', queryable: true },
    ],
  },
  {
    name: 'Mutation',
    kind: 'ObjectType',
    description: '变更根类型，所有写操作入口。',
    color: '#07c160',
    fields: [
      { name: 'createUser', type: 'User', description: '创建用户（input: CreateUserInput）', queryable: true },
      { name: 'updatePost', type: 'Post', description: '更新文章', queryable: true },
      { name: 'deleteUser', type: 'Boolean', description: '删除用户', queryable: true },
    ],
  },
  {
    name: 'Subscription',
    kind: 'ObjectType',
    description: '订阅根类型，长连接实时推送。',
    color: '#a78bfa',
    fields: [
      { name: 'messageAdded', type: 'Message', description: '新消息推送', queryable: true },
      { name: 'postUpdated', type: 'Post', description: '文章更新推送', queryable: true },
    ],
  },
  {
    name: 'User',
    kind: 'ObjectType',
    description: '用户实体类型。',
    color: '#f59e0b',
    fields: [
      { name: 'id', type: 'ID!', description: '用户唯一标识', queryable: true },
      { name: 'name', type: 'String!', description: '用户名', queryable: true },
      { name: 'email', type: 'String', description: '邮箱（可空）', queryable: true },
      { name: 'posts', type: '[Post]', description: '该用户发表的文章', queryable: true },
    ],
  },
  {
    name: 'Post',
    kind: 'ObjectType',
    description: '文章实体类型。',
    color: '#ec4899',
    fields: [
      { name: 'id', type: 'ID!', description: '文章 ID', queryable: true },
      { name: 'title', type: 'String!', description: '标题', queryable: true },
      { name: 'content', type: 'String', description: '正文', queryable: true },
      { name: 'author', type: 'User!', description: '作者', queryable: true },
    ],
  },
]

const DEFAULT_SCHEMA_SNIPPET = `# GraphQL Schema 定义（SDL）
type Query {
  user(id: ID!): User
  users(limit: Int = 10): [User]!
  posts: [Post]!
}

type Mutation {
  createUser(input: CreateUserInput!): User
  updatePost(id: ID!, input: UpdatePostInput!): Post
  deleteUser(id: ID!): Boolean
}

type Subscription {
  messageAdded: Message
  postUpdated: Post
}

type User {
  id: ID!
  name: String!
  email: String
  posts: [Post]
}

type Post {
  id: ID!
  title: String!
  content: String
  author: User!
}`

const OPERATION_KEYWORD: Record<GraphQLOperationType, string> = {
  query: 'query',
  mutation: 'mutation',
  subscription: 'subscription',
}

export function GraphQLSchemaExplorer({ data }: GraphQLSchemaExplorerProps) {
  const types = data?.types ?? DEFAULT_TYPES
  const schemaSnippet = data?.schemaSnippet ?? DEFAULT_SCHEMA_SNIPPET
  const queryBuilderNote =
    data?.queryBuilderNote ??
    'GraphQL 的核心优势是「按需取数」。客户端在 Query/Mutation/Subscription 中勾选需要的字段，服务端只返回这些字段。下方勾选根类型的字段，右侧实时生成对应的 GraphQL 操作语句。'

  const [activeTypeName, setActiveTypeName] = useState('Query')
  const [selectedFields, setSelectedFields] = useState<Record<string, Set<string>>>({
    Query: new Set(['user']),
  })

  const activeType = types.find((t) => t.name === activeTypeName) ?? types[0]
  const isRootType =
    activeType.name === 'Query' || activeType.name === 'Mutation' || activeType.name === 'Subscription'

  const activeOpType = activeType.name.toLowerCase() as GraphQLOperationType

  const toggleField = (typeName: string, fieldName: string) => {
    setSelectedFields((prev) => {
      const next = { ...prev }
      const set = new Set(next[typeName] ?? [])
      if (set.has(fieldName)) {
        set.delete(fieldName)
      } else {
        set.add(fieldName)
      }
      next[typeName] = set
      return next
    })
  }

  /** 生成查询语句（含 User/Post 子字段） */
  const generatedQuery = useMemo(() => {
    const rootFields = selectedFields[activeType.name]
    if (!rootFields || rootFields.size === 0) {
      return `# 请在左侧勾选 ${activeType.name} 的字段`
    }
    const fieldsList = Array.from(rootFields)
    const body = fieldsList
      .map((f) => {
        // 对返回 User/Post 类型的字段，附加子字段选择
        const fieldMeta = activeType.fields.find((x) => x.name === f)
        if (!fieldMeta) return `  ${f}`
        const retType = fieldMeta.type.replace(/[\[\]!]/g, '')
        if (retType === 'User') {
          return `  ${f} {\n    id\n    name\n    email\n  }`
        }
        if (retType === 'Post') {
          return `  ${f} {\n    id\n    title\n    content\n  }`
        }
        return `  ${f}`
      })
      .join('\n')
    return `${OPERATION_KEYWORD[activeOpType]} {\n${body}\n}`
  }, [selectedFields, activeType, activeOpType])

  return (
    <div className="space-y-lg">
      {/* 总览说明 */}
      <div className="rounded-sm border-l-4 border-[#ec4899] bg-[#ec4899]/8 px-md py-sm">
        <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-[#ec4899]">
          GraphQL Schema 与查询构建
        </div>
        <p className="mt-xs text-caption text-ink">{queryBuilderNote}</p>
      </div>

      {/* 三栏：左 类型树 + 中 字段勾选 + 右 查询生成 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
        {/* 类型树 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
            Schema 类型树
          </div>
          <div className="space-y-xs">
            {types.map((type) => {
              const isActive = type.name === activeTypeName
              const fieldCount = selectedFields[type.name]?.size ?? 0
              return (
                <button
                  key={type.name}
                  onClick={() => setActiveTypeName(type.name)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-sm border px-sm py-xs text-left transition-all',
                    isActive
                      ? 'border-transparent bg-ink text-canvas'
                      : 'border-hairline text-ink hover:border-ink/30',
                  )}
                >
                  <span className="font-mono text-caption-mono-sm">{type.name}</span>
                  <span
                    className="rounded-pill px-xs py-xxs font-mono text-caption-mono-xs"
                    style={{
                      backgroundColor: isActive ? type.color : 'transparent',
                      color: isActive ? '#fff' : type.color,
                      border: isActive ? 'none' : `1px solid ${type.color}40`,
                    }}
                  >
                    {type.kind}
                  </span>
                  {fieldCount > 0 && (
                    <span className="ml-xs font-mono text-caption-mono-xs text-body-mid">
                      ✓{fieldCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          <div className="mt-sm">
            <p className="text-caption text-ink">{activeType.description}</p>
          </div>
        </div>

        {/* 字段勾选 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center justify-between">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              {activeType.name} 字段
            </span>
            {isRootType && (
              <span
                className="rounded-pill px-sm py-xxs font-mono text-caption-mono-xs text-white"
                style={{ backgroundColor: activeType.color }}
              >
                {OPERATION_KEYWORD[activeOpType]}
              </span>
            )}
          </div>
          <div className="space-y-xs">
            {activeType.fields.map((field) => {
              const checked = selectedFields[activeType.name]?.has(field.name) ?? false
              return (
                <label
                  key={field.name}
                  className={cn(
                    'flex cursor-pointer items-start gap-sm rounded-sm border px-sm py-xs transition-colors',
                    checked
                      ? 'border-transparent bg-canvas-soft'
                      : 'border-hairline hover:border-ink/30',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleField(activeType.name, field.name)}
                    className="mt-xxs"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-xs">
                      <span className="font-mono text-caption-mono-sm text-ink">{field.name}</span>
                      <span className="font-mono text-caption-mono-xs text-body-mid">{field.type}</span>
                    </div>
                    <p className="mt-xs text-caption text-body-mid">{field.description}</p>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {/* 查询生成 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center gap-sm">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              生成查询语句
            </span>
            <span className="rounded-pill bg-canvas-soft px-sm py-xxs font-mono text-caption-mono-xs text-ink">
              {OPERATION_KEYWORD[activeOpType]}
            </span>
          </div>
          <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
            <code>{generatedQuery}</code>
          </pre>
          <p className="mt-sm text-caption text-body-mid">
            ↑ 勾选字段后实时生成。GraphQL 只返回选中的字段，避免 REST 的过度/不足获取。
          </p>
        </div>
      </div>

      {/* Schema 定义代码 */}
      <div className="rounded-md border border-hairline bg-canvas-card p-md">
        <div className="mb-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
          Schema 定义（SDL）
        </div>
        <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
          <code>{schemaSnippet}</code>
        </pre>
      </div>
    </div>
  )
}
