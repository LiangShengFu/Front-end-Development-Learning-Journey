/**
 * ExpressMiddlewareFlow — Express 中间件洋葱模型可视化
 *
 * 展示 Express 中间件的洋葱模型：
 * 请求 → 中间件1 → 中间件2 → 中间件3 → 路由处理器 → 中间件3 → 中间件2 → 中间件1 → 响应
 * 每个中间件通过 next() 把控制权交给下一个中间件，"响应"阶段以逆序执行。
 *
 * 交互：点击中间件节点高亮，展示其代码示例；提供"请求/响应"方向切换演示。
 *
 * ⚠️ 教学模拟：不启动真实 Express 服务。
 */
import { useState, useCallback } from 'react'
import type {
  ExpressMiddlewareFlowData,
  MiddlewareLayer,
} from '../../../lib/nodejs-visualization-types'
import { cn } from '../../../lib/utils'

interface ExpressMiddlewareFlowProps {
  data?: ExpressMiddlewareFlowData
}

/** 默认中间件栈 */
const DEFAULT_MIDDLEWARES: MiddlewareLayer[] = [
  {
    id: 'logger',
    name: 'morgan 日志',
    description: '记录请求方法、URL、状态码、响应时间。是最早执行的中间件之一，记录请求开始时间，在响应阶段写入日志。',
    code: `app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    console.log(\`\${req.method} \${req.url} \${res.statusCode} \${Date.now() - start}ms\`)
  })
  next() // ← 把控制权交给下一个中间件
})`,
    color: '#1a6cff',
  },
  {
    id: 'cors',
    name: 'CORS',
    description: '处理跨域请求：设置 Access-Control-Allow-Origin 等响应头，处理 OPTIONS 预检请求。',
    code: `app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }
  next()
})`,
    color: '#a78bfa',
  },
  {
    id: 'body-parser',
    name: 'body-parser',
    description: '解析请求体：根据 Content-Type 解析 JSON / urlencoded / raw 等格式，挂载到 req.body。',
    code: `app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 解析后 req.body 即为请求体对象`,
    color: '#07c160',
  },
  {
    id: 'auth',
    name: '认证中间件',
    description: '校验 JWT token 或 session：从 Authorization 头读取 token，验证签名，挂载 req.user。失败则返回 401。',
    code: `app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: '未登录' })
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch (e) {
    res.status(401).json({ error: 'token 无效' })
  }
})`,
    color: '#f59e0b',
  },
  {
    id: 'route',
    name: '路由处理器',
    description: '业务路由：根据方法和路径匹配处理器，执行业务逻辑，调用 res.send / res.json 返回响应。通常位于中间件链末端。',
    code: `app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ error: '未找到' })
  res.json(user) // ← 触发响应阶段，逆序穿过中间件
})`,
    color: '#ec4899',
  },
  {
    id: 'error-handler',
    name: '错误处理中间件',
    description: '错误处理中间件（4 个参数）：捕获 next(err) 抛出的错误，统一返回 500 错误响应。必须放在所有中间件之后。',
    code: `app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
})`,
    isErrorHandler: true,
    color: '#f43f5e',
  },
]

type Direction = 'request' | 'response'

export function ExpressMiddlewareFlow({ data }: ExpressMiddlewareFlowProps) {
  const middlewares = data?.middlewares ?? DEFAULT_MIDDLEWARES
  const onionModelNote =
    data?.onionModelNote ??
    '中间件呈"洋葱模型"：请求依次穿过外层 → 内层，到达路由处理器；响应则从内层 → 外层逆序返回。每个中间件通过 next() 把控制权交给下一个中间件。'

  const [selectedId, setSelectedId] = useState(middlewares[0]?.id ?? '')
  const [direction, setDirection] = useState<Direction>('request')

  const selected = middlewares.find((m) => m.id === selectedId) ?? middlewares[0]

  /** 切换方向并高亮对应阶段的中间件 */
  const handleToggleDirection = useCallback(() => {
    setDirection((d) => (d === 'request' ? 'response' : 'request'))
  }, [])

  /** 请求方向遍历顺序（正向，跳过错误处理） */
  const requestOrder = middlewares.filter((m) => !m.isErrorHandler)
  /** 响应方向遍历顺序（逆序，跳过错误处理和路由） */
  const responseOrder = middlewares
    .filter((m) => !m.isErrorHandler && m.id !== 'route')
    .slice()
    .reverse()

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示中间件洋葱模型，不启动真实 Express 服务。
      </div>

      {/* 洋葱模型说明 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          洋葱模型 · Onion Model
        </div>
        <p className="mt-xs text-body-sm text-body">{onionModelNote}</p>

        {/* 方向切换 */}
        <div className="mt-md flex flex-wrap items-center gap-md">
          <button
            onClick={handleToggleDirection}
            className="rounded-pill bg-accent-sunset px-sm py-xs font-mono text-caption-mono-sm text-white transition-all hover:opacity-90"
          >
            切换方向 · 当前：{direction === 'request' ? '→ 请求阶段' : '← 响应阶段'}
          </button>
          <span className="font-mono text-caption-mono-sm text-body-mid">
            {direction === 'request'
              ? `请求依次穿过：${requestOrder.map((m) => m.name).join(' → ')}`
              : `响应逆序返回：${responseOrder.map((m) => m.name).join(' → ')}`}
          </span>
        </div>
      </div>

      {/* 洋葱模型可视化（嵌套层） */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          中间件栈 · 共 {middlewares.length} 层（点击选中查看详情）
        </div>

        {/* 中间件列表（横向嵌套展示） */}
        <div className="flex flex-wrap gap-xs">
          {middlewares.map((m, i) => {
            const isCurrentInDirection =
              direction === 'request'
                ? !m.isErrorHandler
                : !m.isErrorHandler && m.id !== 'route'
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={cn(
                  'flex-1 min-w-[120px] rounded-sm border px-sm py-md text-left transition-all',
                  m.id === selectedId
                    ? 'border-transparent text-white shadow-md'
                    : 'border-hairline bg-canvas-bg-inset hover:bg-canvas-bg-hover',
                  isCurrentInDirection ? '' : 'opacity-50',
                )}
                style={m.id === selectedId ? { background: m.color } : undefined}
              >
                <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] opacity-80">
                  层 {i + 1}
                  {m.isErrorHandler && ' · 错误处理'}
                </div>
                <div className="mt-xs font-mono text-body-sm font-semibold">
                  {m.name}
                </div>
                {/* 方向指示箭头 */}
                <div className="mt-xs font-mono text-caption-mono-sm opacity-80">
                  {direction === 'request' ? '↓ 进入' : '↑ 返回'}
                  {!isCurrentInDirection && '（不参与）'}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 选中中间件详情 */}
      {selected && (
        <div
          className="rounded-sm border p-md"
          style={{ borderColor: `${selected.color}55`, background: `${selected.color}08` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-sm">
            <h4 className="font-mono text-body-lg font-semibold text-ink">
              {selected.name}
            </h4>
            {selected.isErrorHandler && (
              <span className="rounded-pill bg-[#f43f5e]/15 px-sm py-xs font-mono text-caption-mono-sm text-[#f43f5e]">
                错误处理中间件（4 参数）
              </span>
            )}
          </div>

          <p className="mt-sm text-body-sm text-body">{selected.description}</p>

          {selected.code && (
            <div className="mt-md rounded-sm border border-hairline bg-canvas-card overflow-hidden">
              <div
                className="border-b border-hairline px-md py-sm"
                style={{ background: `${selected.color}10` }}
              >
                <span
                  className="font-mono text-caption-mono-sm uppercase tracking-[1.2px]"
                  style={{ color: selected.color }}
                >
                  代码示例
                </span>
              </div>
              <pre className="overflow-x-auto p-md font-mono text-caption-mono-sm text-ink">
                <code>{selected.code}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
