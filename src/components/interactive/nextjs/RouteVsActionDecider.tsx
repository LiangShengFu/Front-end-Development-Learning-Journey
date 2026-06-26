/**
 * RouteVsActionDecider — Route Handler vs Server Action 决策器
 *
 * 交互式对比 Next.js 中两种服务端处理方式，
 * 根据使用场景推荐选择 Route Handler 或 Server Action。
 *
 * 对应docx中演示 #8
 */
import { useState } from 'react'
import type { RouteVsActionDeciderData } from '../../../lib/nextjs-visualization-types'
import { CodeBlock } from '../../ui/CodeBlock'
import { cn } from '../../../lib/utils'

interface RouteVsActionDeciderProps {
  data?: RouteVsActionDeciderData
}

const DEFAULT_SCENARIOS = [
  {
    id: 'form-submit',
    label: '表单提交',
    description: '用户填写表单后提交数据（如创建文章、更新设置）',
    recommendation: 'server-action' as const,
    reason: 'Server Action 与 <form action={}> 原生集成，无需手写 fetch，自动处理 CSRF、支持渐进增强（JS 未加载时也能提交），配合 useActionState 管理状态最自然。',
    codeExample: `// ✅ 推荐：Server Action
'use server'
async function createPost(formData: FormData) {
  const title = formData.get('title')
  await db.post.create({ data: { title } })
  revalidatePath('/posts')
  redirect('/posts')
}

// 组件中直接使用
<form action={createPost}>
  <input name="title" />
  <button type="submit">提交</button>
</form>`,
  },
  {
    id: 'webhook',
    label: 'Webhook 接收',
    description: '接收第三方服务（Stripe/GitHub）的 Webhook 回调',
    recommendation: 'route-handler' as const,
    reason: 'Webhook 是第三方服务端发起的 HTTP 请求，需要标准 HTTP 端点。Server Action 依赖 React 的调用机制，不适合非浏览器请求。',
    codeExample: `// ✅ 推荐：Route Handler
// app/api/stripe/webhook/route.ts
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  const event = stripe.webhooks.constructEvent(
    body, signature, process.env.STRIPE_WEBHOOK_SECRET
  )

  switch (event.type) {
    case 'payment_succeeded':
      await handlePayment(event.data.object)
      break
  }

  return Response.json({ received: true })
}`,
  },
  {
    id: 'api-callback',
    label: '第三方 API 回调',
    description: 'OAuth 回调、支付回调等需要 URL 的场景',
    recommendation: 'route-handler' as const,
    reason: 'OAuth/支付回调需要注册到第三方的固定 URL（如 /api/auth/callback），必须使用 Route Handler 提供标准 HTTP 端点。',
    codeExample: `// ✅ 推荐：Route Handler
// app/api/auth/callback/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const token = await exchangeCodeForToken(code)
  // 设置 Cookie 并重定向
  const response = NextResponse.redirect(new URL('/dashboard', request.url))
  response.cookies.set('token', token)
  return response
}`,
  },
  {
    id: 'file-upload',
    label: '文件上传',
    description: '用户上传图片/文件到服务器或对象存储',
    recommendation: 'route-handler' as const,
    reason: '文件上传通常涉及 multipart/form-data 流式处理、大文件分片上传、直接上传到 S3 等场景，Route Handler 提供更底层的 Request 对象控制。',
    codeExample: `// ✅ 推荐：Route Handler
// app/api/upload/route.ts
export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  // 流式上传到 S3
  const buffer = await file.arrayBuffer()
  await s3.putObject({
    Bucket: 'my-bucket',
    Key: file.name,
    Body: buffer,
    ContentType: file.type,
  })

  return Response.json({ url: \`https://.../\${file.name}\` })
}`,
  },
  {
    id: 'public-api',
    label: '公开 REST API',
    description: '为移动端/第三方提供公开 API 接口',
    recommendation: 'route-handler' as const,
    reason: '公开 API 需要标准 HTTP 方法（GET/POST/PUT/DELETE）、版本管理、API 文档、限流等，Route Handler 是标准 RESTful 端点的正确选择。',
    codeExample: `// ✅ 推荐：Route Handler
// app/api/v1/users/route.ts
export async function GET(request: Request) {
  const users = await db.user.findMany()
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await db.user.create({ data: body })
  return Response.json(user, { status: 201 })
}`,
  },
]

export function RouteVsActionDecider({ data }: RouteVsActionDeciderProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [selectedId, setSelectedId] = useState(scenarios[0].id)
  const selected = scenarios.find((s) => s.id === selectedId) ?? scenarios[0]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      <div className="mb-xl flex flex-wrap gap-sm">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedId(s.id)}
            className={cn(
              'rounded-pill border px-md py-xs text-body-sm transition-colors',
              s.id === selectedId
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_1fr]">
        {/* 场景说明 + 推荐 */}
        <div className="space-y-lg">
          <div>
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              使用场景
            </div>
            <p className="text-body-md text-ink">{selected.description}</p>
          </div>

          {/* 推荐结果 */}
          <div className={cn(
            'rounded-sm border p-lg',
            selected.recommendation === 'server-action'
              ? 'border-accent-sunset/30 bg-accent-sunset/5'
              : 'border-accent-dusk/30 bg-accent-dusk/5',
          )}>
            <div className={cn(
              'mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px]',
              selected.recommendation === 'server-action' ? 'text-accent-sunset' : 'text-accent-dusk',
            )}>
              推荐方案
            </div>
            <div className={cn(
              'text-body-lg',
              selected.recommendation === 'server-action' ? 'text-accent-sunset' : 'text-accent-dusk',
            )}>
              {selected.recommendation === 'server-action' ? '⚡ Server Action' : '🌐 Route Handler'}
            </div>
            <p className="mt-sm text-body-sm text-body">{selected.reason}</p>
          </div>

          {/* 对比表 */}
          <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              两种方案对比
            </div>
            <div className="space-y-xs font-mono text-caption-mono-sm">
              <div className="flex justify-between">
                <span className="text-accent-sunset">Server Action</span>
                <span className="text-body-mid">表单/突变 · 渐进增强 · CSRF 内置</span>
              </div>
              <div className="flex justify-between">
                <span className="text-accent-dusk">Route Handler</span>
                <span className="text-body-mid">公开 API · Webhook · 标准 REST</span>
              </div>
            </div>
          </div>
        </div>

        {/* 代码示例 */}
        <div>
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            代码示例
          </div>
          <CodeBlock code={selected.codeExample} language="javascript" />
        </div>
      </div>
    </div>
  )
}
