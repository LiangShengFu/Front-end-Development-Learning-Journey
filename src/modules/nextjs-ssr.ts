/**
 * 模块 10：Next.js 与 SSR/SSG 全栈
 *
 * 严格遵循 docx/PROJECT_CONTENT.md 与 docx/模块十.md 设计文档：
 * - 19 个知识点（15 章节 + 1 小测验 + 1 综合实战 + 1 面试题 + 1 速查表）
 * - 18 个可视化演示（7 个新增 Next.js 专属组件 + 9 个复用核心组件 + 2 个实战/面试沙盒）
 *
 * 适配到项目现有 React+TS+Vite 架构，使用 ModuleMeta 数据驱动：
 * - KP1 SSR vs SSG vs ISR 原理对比（RenderModeComparator 渲染模式对比矩阵）
 * - KP2 Next.js App Router vs Pages Router（CompareTable）
 * - KP3 Server Components vs Client Components（CompareTable）
 * - KP4 Server Actions（ServerActionSandbox 流程沙盒）
 * - KP5 Route Handlers（RouteVsActionDecider 决策器）
 * - KP6 数据获取与缓存策略（CodeStepper 数据获取步骤）
 * - KP7 静态站点生成（SSG）（CodeBlock + 说明）
 * - KP8 增量静态再生（ISR）（RSCPayloadFlow 数据流）
 * - KP9 SEO 优化与元数据配置（CodeBlock generateMetadata）
 * - KP10 图像优化（Image 组件）（CompareTable）
 * - KP11 路由系统（ArchitectureDiagram 路由结构）
 * - KP12 中间件 Middleware（MiddlewareFlowExplorer 流程探索器）
 * - KP13 全栈开发模式（FrameworkDecisionWizard 框架选型向导）
 * - KP14 Nuxt 与 Next.js 对比（CompareTable）
 * - KP15 全栈框架技巧速查（Accordion）
 * - KP16 全栈框架小测验（QuizCard 20 题）
 * - KP17 综合实战：Server Action 表单提交（Sandbox 6 checks）
 * - KP18 Next.js 全栈面试题精选（Accordion 32 题 flashcard）
 * - KP19 Next.js 全栈速查表（Table 24 行）
 *
 * 覆盖 SSR/SSG/ISR、App Router、Server Components、Server Actions、
 * Middleware、路由系统等 Next.js 全栈核心知识体系。
 */
import type { ModuleMeta } from '../lib/types'

export const nextjsSsrModule: ModuleMeta = {
  number: '10',
  title: 'Next.js 与 SSR/SSG 全栈',
  slug: 'nextjs-ssr',
  stage: 'react',
  stageLabel: 'React 技术栈 · 第 3 模块',
  icon: '10',
  summary: 'SSR/SSG/ISR、App Router、Server Components、Server Actions、中间件。',
  knowledgePointCount: 19,
  visualizationCount: 18,
  points: [
    // ========================================================================
    // 知识点 1：SSR vs SSG vs ISR 原理对比
    // ========================================================================
    {
      order: 1,
      title: 'SSR vs SSG vs ISR 原理对比',
      difficulty: 3,
      visualizationType: 'render-mode-comparator',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: '前端渲染模式经历了「CSR 统一 → SSR 复兴 → SSG/ISR 混合」的演进。理解每种模式的「渲染时机」和「数据新鲜度」是全栈架构的基础。CSR 在客户端渲染，SSR 每次请求服务端渲染，SSG 构建时生成静态文件，ISR 在 SSG 基础上定时更新。',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'render-mode-comparator',
          data: {
            scenarios: [
              {
                id: 'blog',
                label: '博客',
                description: '内容为主，更新频率低，SEO 重要。SSG 最佳（构建时生成，CDN 分发）。',
                metrics: {
                  CSR: { ttfb: 50, fcp: 800, lcp: 1800, seo: 20, freshness: 90, serverLoad: 10, devComplexity: 30 },
                  SSR: { ttfb: 400, fcp: 600, lcp: 1000, seo: 90, freshness: 95, serverLoad: 70, devComplexity: 60 },
                  SSG: { ttfb: 80, fcp: 300, lcp: 500, seo: 100, freshness: 30, serverLoad: 10, devComplexity: 40 },
                  ISR: { ttfb: 100, fcp: 350, lcp: 550, seo: 95, freshness: 80, serverLoad: 20, devComplexity: 55 },
                },
              },
              {
                id: 'ecommerce',
                label: '电商',
                description: '商品页需 SEO，购物车需实时，库存需新鲜。ISR 平衡 SEO 与新鲜度。',
                metrics: {
                  CSR: { ttfb: 60, fcp: 900, lcp: 2200, seo: 20, freshness: 95, serverLoad: 15, devComplexity: 30 },
                  SSR: { ttfb: 500, fcp: 700, lcp: 1200, seo: 90, freshness: 95, serverLoad: 80, devComplexity: 65 },
                  SSG: { ttfb: 90, fcp: 350, lcp: 600, seo: 100, freshness: 20, serverLoad: 10, devComplexity: 50 },
                  ISR: { ttfb: 110, fcp: 400, lcp: 650, seo: 95, freshness: 85, serverLoad: 25, devComplexity: 60 },
                },
              },
              {
                id: 'admin',
                label: '后台管理',
                description: '登录后使用，SEO 不重要，交互密集。CSR 最佳（无需 SEO，交互流畅）。',
                metrics: {
                  CSR: { ttfb: 50, fcp: 700, lcp: 1500, seo: 10, freshness: 100, serverLoad: 10, devComplexity: 20 },
                  SSR: { ttfb: 450, fcp: 650, lcp: 1100, seo: 50, freshness: 100, serverLoad: 75, devComplexity: 70 },
                  SSG: { ttfb: 80, fcp: 300, lcp: 500, seo: 10, freshness: 10, serverLoad: 10, devComplexity: 80 },
                  ISR: { ttfb: 100, fcp: 350, lcp: 550, seo: 10, freshness: 70, serverLoad: 20, devComplexity: 75 },
                },
              },
              {
                id: 'news',
                label: '新闻列表',
                description: '内容频繁更新，SEO 极重要，新鲜度要求高。ISR 兼顾 SEO 与新鲜度。',
                metrics: {
                  CSR: { ttfb: 55, fcp: 850, lcp: 1900, seo: 20, freshness: 95, serverLoad: 12, devComplexity: 30 },
                  SSR: { ttfb: 420, fcp: 620, lcp: 1050, seo: 90, freshness: 98, serverLoad: 78, devComplexity: 62 },
                  SSG: { ttfb: 85, fcp: 320, lcp: 520, seo: 100, freshness: 25, serverLoad: 10, devComplexity: 45 },
                  ISR: { ttfb: 105, fcp: 370, lcp: 570, seo: 95, freshness: 88, serverLoad: 22, devComplexity: 58 },
                },
              },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'callout',
          variant: 'tip',
          title: '渲染模式选择口诀',
          text: '内容为主选 SSG（博客/文档）；数据频繁选 SSR（电商/社交）；兼顾两者选 ISR（新闻/商品）；登录后用 CSR（后台/Dashboard）。Next.js 的 routeRules 可在同一项目中混用不同模式。',
        },
      ],
    },

    // ========================================================================
    // 知识点 2：Next.js App Router vs Pages Router
    // ========================================================================
    {
      order: 2,
      title: 'Next.js App Router vs Pages Router',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js 13 引入 App Router（app/ 目录），替代原有的 Pages Router（pages/ 目录）。App Router 基于 React Server Components，支持嵌套布局、流式渲染、Server Actions 等新特性。',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['App Router (app/)', 'Pages Router (pages/)'],
            highlightColumn: 0,
            rows: [
              { feature: '目录结构', values: ['app/ 目录，基于文件系统路由', 'pages/ 目录，基于文件系统路由'] },
              { feature: '布局系统', values: ['layout.tsx 嵌套布局（持久化）', '无内置布局（需 _app.tsx）'] },
              { feature: '数据获取', values: ['Server Component 直接 async/await', 'getServerSideProps / getStaticProps'] },
              { feature: 'Server Components', values: ['默认 Server Component', '不支持（所有都是 Client）'] },
              { feature: '流式渲染', values: ['支持 Suspense 流式 SSR', '不支持'] },
              { feature: '路由组', values: ['(group) 目录分组不影响 URL', '无'] },
              { feature: '加载状态', values: ['loading.tsx 自动 Suspense', '需手动处理'] },
              { feature: '错误处理', values: ['error.tsx 自动 ErrorBoundary', '需 _error.tsx'] },
              { feature: '状态', values: ['推荐（新项目）', '维护中（旧项目）'] },
            ],
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'javascript',
          filename: 'App Router 目录结构',
          code: `app/
├── layout.tsx          # 根布局（持久化，不重渲染）
├── page.tsx            # 首页 /
├── loading.tsx         # 首页加载状态
├── error.tsx           # 首页错误边界
├── blog/
│   ├── layout.tsx      # 博客布局（嵌套）
│   ├── page.tsx        # /blog
│   └── [slug]/
│       └── page.tsx    # /blog/:slug 动态路由
├── (dashboard)/        # 路由组（不影响 URL）
│   ├── admin/page.tsx  # /admin
│   └── settings/page.tsx # /settings
└── api/
    └── users/route.ts  # /api/users Route Handler`,
        },
      ],
    },

    // ========================================================================
    // 知识点 3：Server Components vs Client Components
    // ========================================================================
    {
      order: 3,
      title: 'Server Components vs Client Components',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: 'Server Components（RSC）在服务端渲染，不打包到客户端 JS bundle，可直接访问数据库/文件系统。Client Components 用 "use client" 声明，在客户端运行，可使用 useState/useEffect/事件处理等浏览器 API。',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['Server Component', 'Client Component'],
            highlightColumn: 0,
            rows: [
              { feature: '声明方式', values: ['默认（无需声明）', "'use client' 顶部声明"] },
              { feature: '执行环境', values: ['服务端（Node.js/Edge）', '客户端（浏览器）'] },
              { feature: 'Bundle 体积', values: ['不打包到客户端 JS', '打包到客户端 JS'] },
              { feature: '可使用 Hooks', values: ['仅 Server Hooks', 'useState/useEffect/useRef 等全部'] },
              { feature: '事件处理', values: ['不支持 onClick 等', '支持所有事件'] },
              { feature: '数据获取', values: ['直接 async/await 数据库', '需 fetch/useEffect'] },
              { feature: '文件系统', values: ['可直接 fs.readFile', '不可访问文件系统'] },
              { feature: '敏感信息', values: ['可访问环境变量/密钥', '代码暴露给客户端'] },
              { feature: '适用场景', values: ['数据展示/静态内容', '交互/状态/浏览器 API'] },
            ],
          },
        },
        {
          id: 'p3-3',
          type: 'demo',
          visualizationType: 'rsc-payload-flow',
          data: { mode: 'streaming' },
        },
        {
          id: 'p3-4',
          type: 'callout',
          variant: 'warning',
          title: '组件边界规则',
          text: 'Server Component 可导入 Client Component（传可序列化 props）。Client Component 不能直接导入 Server Component（但可通过 children prop 传入）。跨边界的 props 必须可序列化（不能传函数/Class 实例）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 4：Server Actions
    // ========================================================================
    {
      order: 4,
      title: 'Server Actions',
      difficulty: 3,
      visualizationType: 'server-action-sandbox',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: "Server Actions 是 Next.js 14+ 的核心特性，允许直接在 Server Component 中定义服务端执行的函数。通过 'use server' 标记，Next.js 自动编译为 HTTP 端点，表单通过 action 属性直接调用，无需手写 fetch/API Route。",
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'server-action-sandbox',
          data: {
            scenarios: [
              {
                id: 'success',
                label: '成功提交',
                outcome: 'success',
                steps: [
                  { title: '1. 用户提交表单', code: '<form action={createPost}>...', location: 'client', description: '表单通过 action 属性触发 Server Action，无需手动 fetch' },
                  { title: "2. 'use server' 函数被调用", code: "'use server'\nasync function createPost(formData) {", location: 'server', description: "标记了 'use server' 的函数在服务端执行" },
                  { title: '3. Zod 校验输入', code: 'const data = schema.parse(formData);', location: 'server', description: '服务端校验确保数据合法性' },
                  { title: '4. 数据库写入', code: 'await db.post.create({ data });', location: 'server', description: '将数据写入数据库' },
                  { title: '5. revalidatePath', code: "revalidatePath('/posts');", location: 'server', description: '清除相关路由缓存' },
                  { title: '6. redirect', code: "redirect(`/posts/${id}`);", location: 'server', description: '服务端重定向到详情页' },
                ],
              },
              {
                id: 'validation_error',
                label: '校验失败',
                outcome: 'validation_error',
                steps: [
                  { title: '1. 用户提交表单', code: '<form action={createPost}>...', location: 'client', description: '用户提交空标题表单' },
                  { title: '2. Server Action 调用', code: "'use server'\nasync function createPost(formData) {", location: 'server', description: 'Server Action 被调用' },
                  { title: '3. Zod 校验失败', code: 'schema.parse(formData); // ZodError', location: 'server', description: '校验不通过，抛出错误' },
                  { title: '4. 返回错误状态', code: 'return { error: "标题不能为空" };', location: 'server', description: '返回错误信息' },
                  { title: '5. 客户端显示错误', code: 'useActionState 接收 error', location: 'client', description: '表单下方显示错误提示' },
                  { title: '6. 流程终止', code: '// 无 revalidate / redirect', location: 'server', description: '数据库未写入，缓存不刷新' },
                ],
              },
            ],
          },
        },
        {
          id: 'p4-3',
          type: 'code',
          language: 'javascript',
          filename: 'Server Action 完整示例',
          code: `// app/actions.ts
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

const schema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(10, '内容至少 10 字'),
})

export async function createPost(formData: FormData) {
  const data = schema.parse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  const post = await db.post.create({ data })

  revalidatePath('/posts')        // 刷新列表页缓存
  redirect(\`/posts/\${post.id}\`)  // 重定向到详情页
}

// 组件中使用
// <form action={createPost}>
//   <input name="title" />
//   <textarea name="content" />
//   <button type="submit">发布</button>
// </form>`,
        },
      ],
    },

    // ========================================================================
    // 知识点 5：Route Handlers
    // ========================================================================
    {
      order: 5,
      title: 'Route Handlers',
      difficulty: 3,
      visualizationType: 'route-vs-action-decider',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Route Handlers（app/api/ 目录下的 route.ts）是 Next.js 的 HTTP API 端点，替代 Pages Router 的 API Routes。支持 GET/POST/PUT/DELETE 等方法，适合公开 API、Webhook、文件上传等场景。与 Server Actions 互为补充。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'route-vs-action-decider',
          data: {
            scenarios: [
              {
                id: 'form-submit',
                label: '表单提交',
                description: '用户填写表单后提交数据',
                recommendation: 'server-action',
                reason: 'Server Action 与 <form> 原生集成，无需手写 fetch，自动处理 CSRF，支持渐进增强。',
                codeExample: `// ✅ Server Action
'use server'
async function createPost(formData: FormData) {
  await db.post.create({ data: { title: formData.get('title') } })
  revalidatePath('/posts')
}`,
              },
              {
                id: 'webhook',
                label: 'Webhook 接收',
                description: '接收第三方服务的 Webhook 回调',
                recommendation: 'route-handler',
                reason: 'Webhook 是服务端发起的 HTTP 请求，需要标准 HTTP 端点。',
                codeExample: `// ✅ Route Handler
// app/api/stripe/webhook/route.ts
export async function POST(request: Request) {
  const event = stripe.webhooks.constructEvent(...)
  await handlePayment(event)
  return Response.json({ received: true })
}`,
              },
              {
                id: 'public-api',
                label: '公开 REST API',
                description: '为移动端/第三方提供公开 API',
                recommendation: 'route-handler',
                reason: '公开 API 需要标准 HTTP 方法和版本管理，Route Handler 是正确选择。',
                codeExample: `// ✅ Route Handler
// app/api/v1/users/route.ts
export async function GET() {
  const users = await db.user.findMany()
  return Response.json(users)
}`,
              },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'code',
          language: 'javascript',
          filename: 'Route Handler 示例',
          code: `// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({ where: { id: params.id } })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(user)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const user = await db.user.update({
    where: { id: params.id },
    data: body,
  })
  return NextResponse.json(user)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.user.delete({ where: { id: params.id } })
  return new NextResponse(null, { status: 204 })
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 6：数据获取与缓存策略
    // ========================================================================
    {
      order: 6,
      title: '数据获取与缓存策略',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js App Router 中，Server Component 直接用 async/await 获取数据。fetch API 默认缓存（force-cache），可通过 cache/revalidate/next.tags 控制。Server Action 中用 revalidatePath/revalidateTag 按需刷新。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '// 1. Server Component 中直接 async 获取数据',
              'async function PostList() {',
              "  const res = await fetch('https://api.example.com/posts')",
              '  const posts = await res.json()',
              '  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>',
              '}',
              '',
              '// 2. 缓存控制',
              "// 默认：force-cache（SSG，构建时缓存）",
              "fetch('/api/data') // 等价 cache: 'force-cache'",
              '',
              "// 每次请求都获取（SSR）",
              "fetch('/api/data', { cache: 'no-store' })",
              '',
              "// 定时重新验证（ISR）",
              "fetch('/api/data', { next: { revalidate: 60 } }) // 60 秒",
              '',
              '// 3. 按需刷新（Server Action 中）',
              "import { revalidatePath, revalidateTag } from 'next/cache'",
              "revalidatePath('/posts')    // 刷新 /posts 路由缓存",
              "revalidateTag('posts')      // 刷新所有 tag 为 posts 的缓存",
            ],
            steps: [
              { title: 'Server Component 数据获取', description: '在 Server Component 中直接 async/await fetch，无需 useEffect', highlightLines: [1, 2, 3, 4, 5, 6] },
              { title: '默认缓存（SSG）', description: 'fetch 默认 force-cache，构建时获取并缓存', highlightLines: [9, 10] },
              { title: '不缓存（SSR）', description: 'cache: no-store 每次请求都重新获取', highlightLines: [13, 14] },
              { title: '定时验证（ISR）', description: 'next.revalidate: N 秒后标记为 stale，下次请求重新获取', highlightLines: [17, 18] },
              { title: '按需刷新', description: 'revalidatePath/revalidateTag 在 Server Action 中主动清除缓存', highlightLines: [21, 22, 23, 24] },
            ],
            language: 'javascript',
          },
        },
        {
          id: 'p6-3',
          type: 'callout',
          variant: 'tip',
          title: '缓存策略选择',
          text: '静态内容：force-cache（默认 SSG）。实时数据：no-store（SSR）。准实时：revalidate: N（ISR）。用户操作后刷新：revalidatePath/revalidateTag（on-demand ISR）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 7：静态站点生成（SSG）
    // ========================================================================
    {
      order: 7,
      title: '静态站点生成（SSG）',
      difficulty: 2,
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: 'SSG（Static Site Generation）在构建时生成静态 HTML，部署到 CDN 实现极速访问。适合内容不频繁变化的页面（博客、文档、营销页）。Next.js App Router 中 Server Component 默认就是 SSG。',
        },
        {
          id: 'p7-2',
          type: 'code',
          language: 'javascript',
          filename: 'SSG：generateStaticParams + 静态生成',
          code: `// app/blog/[slug]/page.tsx
// SSG：构建时生成所有博客文章的静态页面

// 1. 指定要预渲染的动态路由参数
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 2. Server Component 默认 SSG（构建时获取数据）
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

export default BlogPost

// 构建时生成 /blog/hello-world、/blog/nextjs-15 等静态页面
// 部署到 CDN，访问速度极快（TTFB < 100ms）`,
        },
        {
          id: 'p7-3',
          type: 'callout',
          variant: 'info',
          title: 'SSG 适用场景',
          text: '博客文章、产品文档、营销着陆页、帮助中心。这些内容更新频率低（一天/一周一次），SEO 重要，访问量大。SSG + CDN 是性能最优的方案。',
        },
      ],
    },

    // ========================================================================
    // 知识点 8：增量静态再生（ISR）
    // ========================================================================
    {
      order: 8,
      title: '增量静态再生（ISR）',
      difficulty: 3,
      visualizationType: 'rsc-payload-flow',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: 'ISR（Incremental Static Regeneration）在 SSG 基础上允许定时更新静态页面。首次请求返回缓存的静态页，后台 revalidate 时间到后下次请求触发重新生成。兼顾 SSG 的速度和 SSR 的新鲜度。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'rsc-payload-flow',
          data: { mode: 'streaming' },
        },
        {
          id: 'p8-3',
          type: 'code',
          language: 'javascript',
          filename: 'ISR：定时 revalidate + 按需 revalidatePath',
          code: `// 方式 1：定时 revalidate（TTL）
// app/blog/[slug]/page.tsx
async function BlogPost({ params }) {
  // revalidate: 60 表示 60 秒后标记为 stale
  const post = await fetch(\`/api/posts/\${params.slug}\`, {
    next: { revalidate: 60 }
  })
  return <article>{post.title}</article>
}

// ISR 流程：
// 1. 首次请求 → 返回缓存的静态页（stale）
// 2. 60 秒后再次请求 → 仍返回缓存页（stale），但后台触发重新生成
// 3. 生成完成后 → 下次请求返回新页面（fresh）

// 方式 2：按需 revalidate（on-demand）
// app/actions.ts
'use server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function updatePost(formData) {
  await db.post.update({ where: { id }, data: { ... } })
  // 主动刷新，无需等待 TTL
  revalidatePath(\`/blog/\${slug}\`)
  revalidateTag('posts') // 刷新所有标记了 posts tag 的 fetch
}`,
        },
        {
          id: 'p8-4',
          type: 'callout',
          variant: 'tip',
          title: 'ISR vs SSR vs SSG',
          text: 'SSG：构建时生成，永不更新（除非重新部署）。SSR：每次请求都渲染，新鲜但慢。ISR：定时/按需更新静态页，兼顾速度与新鲜度。ISR 是 Next.js 的杀手锏。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：SEO 优化与元数据配置
    // ========================================================================
    {
      order: 9,
      title: 'SEO 优化与元数据配置',
      difficulty: 2,
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js App Router 通过 metadata API 管理 SEO。在 layout.tsx 或 page.tsx 中导出 metadata 对象或 generateMetadata 函数，自动生成 <title>/<meta>/<link> 等标签。支持模板、动态生成、Open Graph、Twitter Card。',
        },
        {
          id: 'p9-2',
          type: 'code',
          language: 'javascript',
          filename: 'Metadata API 完整示例',
          code: `// app/layout.tsx — 静态 metadata（全局）
export const metadata = {
  title: {
    template: '%s | 我的博客',  // 模板：子页面 title 自动拼接
    default: '我的博客',          // 默认 title
  },
  description: '分享前端技术文章',
  openGraph: {
    title: '我的博客',
    type: 'website',
    locale: 'zh_CN',
    siteName: '我的博客',
  },
}

// app/blog/[slug]/page.tsx — 动态 generateMetadata
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,           // 自动应用模板：'文章标题 | 我的博客'
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: \`/blog/\${params.slug}\`,
    },
  }
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 10：图像优化（Image 组件）
    // ========================================================================
    {
      order: 10,
      title: '图像优化（Image 组件）',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: 'next/image 组件自动优化图片：按设备尺寸生成响应式图片、WebP/AVIF 格式转换、懒加载、防 CLS（设置宽高比）、占位符模糊。生产环境通过 Next.js Image Optimization API 或 loader 处理。',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['next/image', '原生 <img>'],
            highlightColumn: 0,
            rows: [
              { feature: '响应式图片', values: ['自动按设备 srcset 生成', '需手写 srcset'] },
              { feature: '格式优化', values: ['自动 WebP/AVIF', '不转换'] },
              { feature: '懒加载', values: ['默认 loading="lazy"', '需加 loading="lazy"'] },
              { feature: '防 CLS', values: ['需指定 width/height', '易导致布局偏移'] },
              { feature: '占位符', values: ['placeholder="blur" 模糊占位', '无'] },
              { feature: 'CDN 集成', values: ['支持各 loader 配置', '需手动配置'] },
              { feature: '优先加载', values: ['priority 属性', '需 preload 手动'] },
            ],
          },
        },
        {
          id: 'p10-3',
          type: 'code',
          language: 'javascript',
          filename: 'next/image 使用',
          code: `import Image from 'next/image'

// 基本用法：必须指定 width/height（防 CLS）
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={630}
  priority  // LCP 图片加 priority（加入 preload）
/>

// 响应式填充（fill + 父容器定位）
<div className="relative w-full h-64">
  <Image
    src="/cover.jpg"
    alt="Cover"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>

// 模糊占位符
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // 低分辨率 base64
/>`,
        },
      ],
    },

    // ========================================================================
    // 知识点 11：路由系统（动态/嵌套/并行路由）
    // ========================================================================
    {
      order: 11,
      title: '路由系统（动态 / 嵌套 / 并行路由）',
      difficulty: 3,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: 'App Router 的路由系统基于文件系统，支持动态路由（[param]）、嵌套布局（layout.tsx）、并行路由（@slot）、拦截路由（(..)）、路由组（(group)）等高级特性。',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'App Router 路由系统全景',
            flowDirection: 'top-down',
            layers: [
              {
                name: '基础路由',
                description: '文件系统映射 URL',
                components: [
                  { name: 'page.tsx', description: '页面组件（必需）' },
                  { name: 'layout.tsx', description: '布局组件（持久化，嵌套）' },
                  { name: 'loading.tsx', description: '加载状态（Suspense）' },
                  { name: 'error.tsx', description: '错误边界' },
                  { name: 'not-found.tsx', description: '404 页面' },
                ],
              },
              {
                name: '动态路由',
                description: 'URL 参数映射',
                components: [
                  { name: '[slug]/page.tsx', description: '动态参数 /blog/:slug' },
                  { name: '[...slug]/page.tsx', description: '捕获所有 /docs/**' },
                  { name: '[[...slug]]/page.tsx', description: '可选捕获所有' },
                ],
              },
              {
                name: '高级路由',
                description: '并行/拦截/路由组',
                components: [
                  { name: '@slot/page.tsx', description: '并行路由（同 URL 多区域）' },
                  { name: '(..)photo/page.tsx', description: '拦截路由（模态框）' },
                  { name: '(group)/page.tsx', description: '路由组（不影响 URL）' },
                ],
              },
              {
                name: '特殊文件',
                description: '约定文件',
                components: [
                  { name: 'route.ts', description: 'Route Handler（API）' },
                  { name: 'middleware.ts', description: '中间件（请求拦截）' },
                  { name: 'template.tsx', description: '模板（每次导航重新渲染）' },
                ],
              },
            ],
          },
        },
        {
          id: 'p11-3',
          type: 'code',
          language: 'javascript',
          filename: '嵌套布局示例',
          code: `// app/layout.tsx — 根布局（所有页面共享）
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}  {/* 子布局/页面注入此处 */}
        <Footer />
      </body>
    </html>
  )
}

// app/blog/layout.tsx — 博客布局（嵌套在根布局内）
export default function BlogLayout({ children }) {
  return (
    <div className="blog">
      <BlogSidebar />
      {children}  {/* /blog/* 的页面注入此处 */}
    </div>
  )
}

// 渲染层级：RootLayout > BlogLayout > BlogPost
// 导航 /blog/123 → /blog/123/page.tsx 时
// Header/Footer 不重渲染，BlogSidebar 不重渲染（布局持久化）`,
        },
      ],
    },

    // ========================================================================
    // 知识点 12：中间件 Middleware
    // ========================================================================
    {
      order: 12,
      title: '中间件 Middleware',
      difficulty: 3,
      visualizationType: 'middleware-flow-explorer',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: 'Middleware 在请求完成前运行，可重写/重定向/修改请求头和响应头。常用于鉴权、A/B 测试、国际化、特征开关。在 Edge Runtime 运行，延迟极低。通过 matcher 配置匹配的路径。',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'middleware-flow-explorer',
          data: {
            scenarios: [
              {
                id: 'auth',
                label: '鉴权重定向',
                description: '未登录用户访问 /dashboard 时重定向到 /login',
                matcher: "config = { matcher: ['/dashboard/:path*'] }",
                code: `export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}`,
                testUrls: [
                  { url: '/dashboard', expectedOutcome: '✅ 重定向到 /login（无 token）' },
                  { url: '/dashboard/settings', expectedOutcome: '✅ 重定向到 /login' },
                  { url: '/login', expectedOutcome: '⏭️ 不匹配 matcher，放行' },
                ],
              },
              {
                id: 'ab-test',
                label: 'A/B 测试',
                description: '通过 Cookie 分配用户到 A 或 B 版本',
                matcher: "config = { matcher: ['/'] }",
                code: `export function middleware(request: NextRequest) {
  let variant = request.cookies.get('ab-variant')
  if (!variant) {
    variant = Math.random() > 0.5 ? 'A' : 'B'
    const response = NextResponse.next()
    response.cookies.set('ab-variant', variant)
    return response
  }
  return NextResponse.next()
}`,
                testUrls: [
                  { url: '/（首次访问）', expectedOutcome: '🍪 设置 ab-variant Cookie' },
                  { url: '/（已有 Cookie）', expectedOutcome: '⏭️ 放行' },
                ],
              },
              {
                id: 'i18n',
                label: '国际化路由',
                description: '根据 Accept-Language 重写到对应语言路径',
                matcher: "config = { matcher: ['/((?!api|_next).*)'] }",
                code: `export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some(l => pathname.startsWith(\`/\${l}\`))
  if (hasLocale) return NextResponse.next()
  const lang = request.headers.get('accept-language')?.startsWith('zh') ? 'zh' : 'en'
  return NextResponse.rewrite(new URL(\`/\${lang}\${pathname}\`, request.url))
}`,
                testUrls: [
                  { url: '/（zh-CN）', expectedOutcome: '✏️ 重写到 /zh' },
                  { url: '/about（en）', expectedOutcome: '✏️ 重写到 /en/about' },
                ],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 13：全栈开发模式
    // ========================================================================
    {
      order: 13,
      title: '全栈开发模式',
      difficulty: 2,
      visualizationType: 'framework-decision-wizard',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js 全栈开发模式：Server Component 获取数据 + Client Component 处理交互 + Server Action 处理变更 + Route Handler 处理 API + Middleware 处理拦截。以下框架选型向导帮助你在 Next.js / Nuxt / Astro / Remix 间做理性决策。',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'framework-decision-wizard',
          data: {
            frameworks: [
              { id: 'nextjs', label: 'Next.js', description: 'React 全栈框架', scores: { performance: 85, seo: 90, devEfficiency: 80, ecosystem: 95 }, bestFor: 'React 生态、全栈 SaaS' },
              { id: 'nuxt', label: 'Nuxt 3', description: 'Vue 全栈框架', scores: { performance: 82, seo: 88, devEfficiency: 85, ecosystem: 75 }, bestFor: 'Vue 生态、内容站' },
              { id: 'astro', label: 'Astro', description: '内容优先，Islands 架构', scores: { performance: 95, seo: 92, devEfficiency: 70, ecosystem: 60 }, bestFor: '博客、文档、营销页' },
              { id: 'remix', label: 'Remix', description: 'Web 标准优先', scores: { performance: 80, seo: 85, devEfficiency: 75, ecosystem: 65 }, bestFor: '全栈应用、Web 标准' },
            ],
          },
        },
        {
          id: 'p13-3',
          type: 'code',
          language: 'javascript',
          filename: '全栈开发模式：数据流',
          code: `// 1. Server Component 获取数据（SSR/SSG/ISR）
async function ProductPage({ params }) {
  const product = await db.product.findUnique({ where: { id: params.id } })
  return <ProductDetail product={product} />
}

// 2. Client Component 处理交互
'use client'
function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1)
  return (
    <div>
      <h1>{product.name}</h1>
      <Counter value={quantity} onChange={setQuantity} />
      <AddToCart productId={product.id} quantity={quantity} />
    </div>
  )
}

// 3. Server Action 处理变更
'use server'
async function addToCart(formData: FormData) {
  const productId = formData.get('productId')
  const quantity = Number(formData.get('quantity'))
  await db.cartItem.create({ data: { productId, quantity } })
  revalidatePath('/cart')
}

// 4. Middleware 处理拦截（鉴权）
export function middleware(request: NextRequest) {
  if (!request.cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 14：Nuxt 与 Next.js 对比
    // ========================================================================
    {
      order: 14,
      title: 'Nuxt 与 Next.js 对比',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js 和 Nuxt 分别是 React 和 Vue 生态的全栈框架。两者设计理念相似（SSR/SSG/ISR、文件路由、API 路由），但底层框架不同导致 API 风格和生态有差异。',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['Next.js 15', 'Nuxt 3'],
            rows: [
              { feature: '底层框架', values: ['React 18+', 'Vue 3'] },
              { feature: '路由方案', values: ['App Router（app/ 目录）', '约定式路由（pages/ 目录）'] },
              { feature: '数据获取', values: ['Server Component async/await', 'useFetch / useAsyncData'] },
              { feature: '服务端变更', values: ['Server Actions', 'Server API routes'] },
              { feature: '状态管理', values: ['外部库（Zustand/Redux）', 'useState（内置）'] },
              { feature: '渲染模式', values: ['SSR/SSG/ISR + RSC', 'SSR/SSG/ISR + Hybrid'] },
              { feature: '服务引擎', values: ['Node.js / Edge', 'Nitro（多平台部署）'] },
              { feature: '自动导入', values: ['不支持', '支持（components/composables 自动导入）'] },
              { feature: '生态', values: ['Vercel 生态 + 社区', 'NuxtLabs 生态 + Vue 社区'] },
              { feature: '适合团队', values: ['React 技术栈', 'Vue 技术栈'] },
            ],
          },
        },
        {
          id: 'p14-3',
          type: 'demo',
          visualizationType: 'islands-arch-demo',
          data: {},
        },
        {
          id: 'p14-4',
          type: 'callout',
          variant: 'info',
          title: 'Astro Islands 架构',
          text: 'Astro 采用 Islands Architecture：页面默认是静态 HTML（零 JS），只有交互组件（岛屿）按需水合。client:load（立即）/ client:idle（空闲）/ client:visible（可见时）/ client:media（媒体匹配时）四种水合策略，大幅减少 JS 体积。',
        },
      ],
    },

    // ========================================================================
    // 知识点 15：全栈框架技巧速查
    // ========================================================================
    {
      order: 15,
      title: '全栈框架技巧速查',
      difficulty: 1,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js 全栈开发的核心技巧速查，涵盖渲染模式选择、Server/Client 组件边界、缓存策略、SEO 等高频知识点。',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0],
            items: [
              {
                title: '渲染模式速查',
                content: 'CSR：后台管理（不需 SEO）。SSR：电商/社交（实时数据 + SEO）。SSG：博客/文档（静态内容 + SEO）。ISR：新闻/商品（准实时 + SEO）。Next.js routeRules 可在同一项目混用。',
                code: `// next.config.ts 混合渲染
routeRules: {
  '/': { prerender: true },        // SSG
  '/blog/**': { swr: 3600 },      // ISR（1小时）
  '/admin/**': { ssr: false },     // CSR
  '/api/**': { cors: true },       // API
}`,
                codeLanguage: 'javascript',
              },
              {
                title: 'Server/Client 组件边界',
                content: '默认 Server Component（不打包到客户端）。需要交互/状态/浏览器 API 时加 "use client"。Server 可导入 Client，Client 不能直接导入 Server（可通过 children 传入）。',
                code: `// ✅ Server Component
async function Page() {
  const data = await db.query()  // 服务端直接数据库
  return <ClientView data={data} />  // 传给 Client
}

// ✅ Client Component
'use client'
function ClientView({ data }) {
  const [state, setState] = useState(data)  // 客户端状态
  return <button onClick={() => setState(...)}>click</button>
}`,
                codeLanguage: 'javascript',
              },
              {
                title: '缓存策略速查',
                content: 'fetch 默认 force-cache（SSG）。no-store 不缓存（SSR）。revalidate: N 定时刷新（ISR）。revalidatePath/revalidateTag 按需刷新。Server Action 中用 revalidatePath 刷新缓存。',
                code: `// SSG（默认）
fetch('/api/data')

// SSR（不缓存）
fetch('/api/data', { cache: 'no-store' })

// ISR（定时）
fetch('/api/data', { next: { revalidate: 60 } })

// 按需刷新
'use server'
revalidatePath('/posts')
revalidateTag('posts')`,
                codeLanguage: 'javascript',
              },
              {
                title: 'SEO 元数据速查',
                content: 'metadata 对象（静态）或 generateMetadata 函数（动态）。支持 title 模板、description、openGraph、twitter、canonical、robots 等。自动生成 <meta> 标签。',
                code: `export const metadata = {
  title: { template: '%s | 站点', default: '站点' },
  description: '描述',
  openGraph: { title: 'OG标题', images: ['/og.png'] },
  robots: { index: true, follow: true },
}`,
                codeLanguage: 'javascript',
              },
              {
                title: '常见陷阱',
                content: '1) Server Component 不能用 useState/useEffect。2) 跨边界的 props 必须可序列化。3) use client 不意味着只在客户端渲染（仍会 SSR）。4) dynamic import 的 ssr: false 只能在 Client Component 中用。5) middleware 只能用 Edge Runtime API。',
                code: '',
                codeLanguage: 'text',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 16：全栈框架小测验
    // ========================================================================
    {
      order: 16,
      title: '全栈框架小测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: '通过 20 道精选测验题检验对 Next.js 全栈框架的掌握程度，覆盖 SSR/SSG/ISR、Server Components、Server Actions、Middleware、路由系统、缓存策略等核心考点。题目按【记忆】【理解】【应用】【对比】【场景】【综合】梯度分布，每题附详细解析。',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '【记忆】SSG（静态站点生成）的渲染时机是？',
                options: ['每次请求时', '构建时', '运行时定时', '客户端加载后'],
                correctIndex: 1,
                explanation: 'SSG 在构建时（build time）生成静态 HTML 文件，部署到 CDN 后每次请求直接返回静态文件，无需服务端渲染。适合博客、文档等内容不频繁变化的页面。',
              },
              {
                question: '【理解】Server Component 的主要优势是？',
                options: ['可以使用 useState', '不打包到客户端 JS bundle', '支持事件处理', '可直接操作 DOM'],
                correctIndex: 1,
                explanation: 'Server Component 在服务端渲染，其代码不打包到客户端 JS bundle，减少客户端 JS 体积。还可以直接访问数据库/文件系统，但不能使用 useState/useEffect/事件处理等客户端 API。',
              },
              {
                question: '【理解】ISR 的 revalidate: 60 表示什么？',
                options: ['每 60 秒强制刷新', '60 秒后标记为 stale，下次请求触发重新生成', '60 分钟后删除缓存', '每 60 个请求刷新一次'],
                correctIndex: 1,
                explanation: 'revalidate: 60 表示 60 秒后缓存标记为 stale（过期）。下次请求时仍返回旧缓存（stale-while-revalidate），但后台触发重新生成。生成完成后后续请求返回新内容。',
              },
              {
                question: '【记忆】Server Action 中 "use server" 的作用是？',
                options: ['标记为服务端组件', '标记函数在服务端执行，编译为 HTTP 端点', '禁用客户端渲染', '启用 SSR'],
                correctIndex: 1,
                explanation: "use server 标记的函数会被 Next.js 编译为 Server Action，自动创建 HTTP 端点。表单通过 action 属性直接调用，无需手写 fetch。函数在服务端执行，可访问数据库/文件系统。",
              },
              {
                question: '【记忆】Next.js Middleware 的运行环境是？',
                options: ['Node.js Runtime', 'Edge Runtime', '浏览器', 'Web Worker'],
                correctIndex: 1,
                explanation: 'Middleware 在 Edge Runtime 运行，启动极快、延迟低，适合鉴权/重定向/A-B测试等轻量逻辑。但不能使用 Node.js API（如 fs/crypto），仅支持 Web API 和 Next.js 特定 API。',
              },
              {
                question: '【对比】关于 Server Component 和 Client Component 的边界，以下正确的是？',
                options: ['Client 可直接导入 Server', 'Server 可导入 Client（传可序列化 props）', '两者可互相导入', '不能互相导入'],
                correctIndex: 1,
                explanation: 'Server Component 可导入 Client Component 并传递可序列化的 props。但 Client Component 不能直接导入 Server Component（因为客户端没有服务端环境），可通过 children prop 间接传入。',
              },
              {
                question: '【对比】revalidatePath 和 revalidateTag 的区别是？',
                options: ['功能完全相同', 'revalidatePath 刷新路径缓存，revalidateTag 刷新标签缓存', 'revalidatePath 更快', 'revalidateTag 只能用于 SSR'],
                correctIndex: 1,
                explanation: 'revalidatePath("/posts") 刷新指定路径的缓存。revalidateTag("posts") 刷新所有标记了 next: { tags: ["posts"] } 的 fetch 缓存。Tag 更灵活，可跨路径刷新相关数据。',
              },
              {
                question: '【理解】Astro Islands Architecture 的核心思想是？',
                options: ['全部组件在服务端渲染', '仅交互组件按需水合，静态 HTML 零 JS', '使用 Web Components', '不支持任何客户端 JS'],
                correctIndex: 1,
                explanation: 'Islands Architecture 将页面分为静态 HTML（海洋）和交互组件（岛屿）。静态部分零 JS，只有岛屿组件按需水合。client:load/idle/visible/media 控制水合时机，大幅减少 JS 体积。',
              },
              {
                question: '【理解】Next.js App Router 中 layout.tsx 的特性是？',
                options: ['每次导航都重新渲染', '持久化，导航时不重渲染', '只在 SSG 中可用', '不能有子组件'],
                correctIndex: 1,
                explanation: 'layout.tsx 是持久化布局，在路由切换时不会重新渲染（只有 children 部分变化）。这使得导航栏、侧边栏等公共 UI 保持状态不丢失，提升用户体验。template.tsx 则每次导航都重新渲染。',
              },
              {
                question: '【应用】generateMetadata 函数的作用是？',
                options: ['生成静态 HTML', '动态生成页面的 SEO 元数据', '生成路由参数', '生成 Server Action'],
                correctIndex: 1,
                explanation: 'generateMetadata 是异步函数，接收 params/searchParams，返回 Metadata 对象。用于动态生成 <title>/<meta>/<link> 等 SEO 标签，支持 Open Graph、Twitter Card 等。在 Server Component 中可用。',
              },
              {
                question: '【记忆】App Router 中动态路由 [id] 的写法对应 Pages Router 的？',
                options: ['[id].js', 'pages/post/[id].js', 'app/[id]/page.tsx', '两者无对应关系'],
                correctIndex: 1,
                explanation: 'Pages Router 用 pages/post/[id].js，App Router 用 app/post/[id]/page.tsx。App Router 基于文件夹嵌套，每个文件夹是路由段，page.tsx 是该段 UI。两者都能用 params.id 获取动态参数。',
              },
              {
                question: '【对比】App Router 和 Pages Router 的核心差异？',
                options: ['完全相同', 'App Router 基于文件夹嵌套+布局系统，默认 RSC', 'Pages Router 基于 React Router', 'App Router 不支持 API'],
                correctIndex: 1,
                explanation: 'App Router（app/ 目录）基于文件夹嵌套，layout 加载UI持久化，默认 Server Components，支持流式渲染。Pages Router（pages/ 目录）基于文件路由，无持久布局，默认 Client Components。新项目推荐 App Router。',
              },
              {
                question: '【理解】fetch 在 App Router 中的默认缓存行为是？',
                options: ['默认不缓存', '默认 force-cache（SSG）', '默认 no-store（SSR）', '默认 ISR 60 秒'],
                correctIndex: 1,
                explanation: 'App Router 中 fetch 默认 force-cache（等价于 SSG，构建时获取并缓存）。需手动指定 cache: "no-store"（SSR）或 next: { revalidate: N }（ISR）。这是 App Router 与 Pages Router 的关键差异。',
              },
              {
                question: '【应用】要在客户端组件中使用 useState，文件顶部需声明？',
                options: ["'use client'", "'use server'", "'use strict'", "无需声明"],
                correctIndex: 0,
                explanation: "'use client' 标记文件为 Client Component，才能使用 useState/useEffect/事件处理等浏览器 API。默认（不声明）是 Server Component。注意 'use client' 不意味着只在客户端运行，仍会 SSR。",
              },
              {
                question: '【场景】一个电商商品页需要 SEO + 准实时库存，最佳渲染策略是？',
                options: ['SSG（构建时生成）', 'SSR（每次请求渲染）', 'ISR（定时重新生成）', 'CSR（客户端渲染）'],
                correctIndex: 2,
                explanation: 'ISR 兼顾 SEO（静态 HTML）与准实时性（定时重新生成）。商品页需 SEO，库存变化频繁但可容忍分钟级延迟，ISR 是最佳选择。SSG 无法更新库存，SSR 服务器压力大，CSR 无 SEO。',
              },
              {
                question: '【场景】Server Action 提交表单后想刷新列表页缓存，应调用？',
                options: ['router.refresh()', 'revalidatePath("/posts")', 'window.location.reload()', 'setState 重新拉取'],
                correctIndex: 1,
                explanation: "Server Action 中用 revalidatePath('/posts') 刷新指定路径缓存，Next.js 会让该路径的缓存失效，下次请求重新生成。revalidateTag 刷新标签缓存。redirect 可在刷新后重定向。",
              },
              {
                question: '【理解】Next.js Image 组件相比原生 <img> 的优势不包括？',
                options: ['自动响应式 srcset', '懒加载', '防止布局偏移（CLS）', '自动上传到 CDN'],
                correctIndex: 3,
                explanation: 'next/image 提供自动 srcset、懒加载、占位防 CLS、按需优化格式（webp/avif）。但它不负责"自动上传到 CDN"，需配置 loader 指向你的图片服务（如 Vercel CDN、Cloudinary、自建）。',
              },
              {
                question: '【对比】layout.tsx 和 template.tsx 的区别？',
                options: ['功能完全相同', 'layout 持久化不重渲染，template 每次导航重渲染', 'layout 只能用于 SSR', 'template 不能有子组件'],
                correctIndex: 1,
                explanation: 'layout.tsx 在路由切换时保持不变（持久化，状态保留）。template.tsx 每次导航都重新创建实例（状态重置）。需要保留导航栏状态用 layout，需要每次进入页面重置状态用 template。',
              },
              {
                question: '【综合】关于 Next.js 全栈开发的最佳实践，以下错误的是？',
                options: ['尽量用 Server Component 减少客户端 JS', 'Server Action 处理表单提交与数据库写入', '所有页面都用 SSR 保证最新', '用 ISR 兼顾 SEO 与准实时'],
                correctIndex: 2,
                explanation: '并非所有页面都该用 SSR。静态内容用 SSG（最快、可 CDN），准实时用 ISR，个性化/实时才用 SSR。无脑 SSR 会增加服务器压力、降低性能。选型应按页面特性：静态优先，动态按需。',
              },
              {
                question: '【综合】为一个内容站（博客+文档+营销页）选 Next.js 渲染策略，合理的是？',
                options: ['全站 SSR', '博客/文档 SSG + 营销页 SSG + 评论组件 Client', '全站 CSR', '全站 ISR 1 秒'],
                correctIndex: 1,
                explanation: '内容站以静态为主：博客/文档/营销页用 SSG（最快、SEO 好、可 CDN）。少量交互（评论、点赞）用 Client Component 岛屿。无需 SSR（无个性化实时数据）。ISR 仅用于频繁更新的内容（如新闻）。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 17：综合实战 — Server Action 表单提交（断言沙盒）
    // ========================================================================
    {
      order: 17,
      title: '综合实战：Server Action 表单提交',
      difficulty: 3,
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: '把 Server Action、Zod 校验、revalidatePath、useActionState 焊在一起的综合实战。你要实现一个"创建文章"表单：客户端通过 action 属性直接调用服务端函数（无需 fetch），服务端用 Zod 校验输入、写入数据库、刷新列表缓存、重定向到详情页。右侧沙盒的任务检查清单会实时校验你的代码并给教学反馈。',
        },
        {
          id: 'p17-2',
          type: 'paragraph',
          text: '任务要求：函数标记 "use server"；用 Zod schema 校验 title/content；校验失败返回 error 状态（不抛异常）；成功后调用 revalidatePath 刷新列表缓存；用 redirect 跳转详情页；客户端用 useActionState 接收返回状态。',
        },
        {
          id: 'p17-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '在下方编辑器中编写 Server Action 创建文章流程（伪代码，关注关键 API 使用）。任务检查清单会实时校验——逐条通过即完成。重点关注 use server/Zod/revalidatePath/redirect/useActionState。',
            initialCode: `// app/actions.ts
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

// TODO: 标记为 Server Action
export async function createPost(formData: FormData) {
  // TODO: 用 Zod 校验 title（非空）/ content（≥10 字）
  const schema = z.object({
    title: z.string(),
    content: z.string(),
  })

  const data = schema.parse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  const post = await db.post.create({ data })

  // TODO: 刷新列表页缓存
  // TODO: 重定向到详情页
}

// app/posts/new/page.tsx（客户端表单）
'use client'
import { useActionState } from 'react'
import { createPost } from '@/app/actions'

function NewPostForm() {
  // TODO: 用 useActionState 接收 Server Action 返回状态
  const [state, formAction] = useActionState(createPost, null)

  return (
    <form action={formAction}>
      <input name="title" />
      <textarea name="content"></textarea>
      {state?.error && <p>{state.error}</p>}
      <button type="submit">发布</button>
    </form>
  )
}`,
            checks: [
              {
                description: '函数标记 "use server"',
                pattern: "use server",
                hint: '在 createPost 函数上方或文件顶部加 "use server" 标记。Next.js 会把它编译为 HTTP 端点，客户端可通过 action 属性直接调用，无需手写 fetch。这是 Server Action 的核心标记。',
              },
              {
                description: '用 Zod schema 校验输入',
                pattern: 'z\\.object',
                hint: 'const schema = z.object({ title: z.string().min(1, "标题不能为空"), content: z.string().min(10, "内容至少 10 字") })。Zod 在服务端校验输入，确保数据合法性，避免直接信任客户端数据。',
              },
              {
                description: '校验失败返回 error 状态（用 safeParse 不抛异常）',
                pattern: 'safeParse|return.*error',
                hint: '用 schema.safeParse(data) 而非 parse（后者抛异常）。safeParse 返回 { success, data, error }，失败时 return { error: ... } 让 useActionState 接收，避免异常中断流程。',
              },
              {
                description: '成功后调用 revalidatePath 刷新列表缓存',
                pattern: 'revalidatePath\\(',
                hint: "revalidatePath('/posts') 让列表页缓存失效，下次请求重新生成。否则新文章不会出现在列表。也可用 revalidateTag('posts') 按标签刷新。",
              },
              {
                description: '用 redirect 重定向到详情页',
                pattern: 'redirect\\(',
                hint: "redirect(`/posts/${post.id}`) 在服务端重定向到详情页。redirect 必须在 revalidatePath 之后调用，且需在 try/catch 外（它内部抛特殊异常被 Next.js 捕获）。",
              },
              {
                description: '客户端用 useActionState 接收返回状态',
                pattern: 'useActionState\\(',
                hint: 'const [state, formAction] = useActionState(createPost, null)。useActionState（React 19）管理 Server Action 的返回值（成功数据/错误），formAction 传给 <form action={...}>。替代手写 pending/error 状态。',
              },
            ],
          },
        },
        {
          id: 'p17-4',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '它把 Server Action 的完整闭环串起来：客户端表单 → 服务端校验 → 数据库写入 → 缓存刷新 → 重定向 → 客户端状态接收。完成后你会理解 Server Action 不是"代替 fetch"那么简单，而是"表单+校验+缓存+导航"的一体化方案，是 Next.js 全栈开发的核心范式。',
        },
      ],
    },

    // ========================================================================
    // 知识点 18：Next.js 全栈面试题精选（Accordion · flashcard 模式）
    // ========================================================================
    {
      order: 18,
      title: 'Next.js 全栈面试题精选',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          text: '精选 Next.js 全栈高频面试题，涵盖 SSR/SSG/ISR、App Router、Server Components、Server Actions、Middleware、缓存策略、SEO、场景排查与方案对比。题量较多，已切换为闪卡模式（一题一屏，翻转看答案 + 上下题导航），也可切回列表模式。点击展开查看参考答案。',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: SSR、SSG、ISR、CSR 的区别？分别适用什么场景？',
                content: '四种渲染模式：\n\n- CSR（客户端渲染）：浏览器拉 JS 后渲染，首屏慢、SEO 差，交互好。\n- SSR（服务端渲染）：每次请求服务器生成 HTML，首屏快、SEO 好，服务器压力大。\n- SSG（静态生成）：构建时生成 HTML，最快、可 CDN，适合内容不变的博客/文档。\n- ISR（增量静态再生）：SSG + 按需后台再生成，兼顾静态速度与内容更新。\n\n适用场景：\n1. CSR：后台管理（不需 SEO）。\n2. SSR：电商/社交（实时数据 + SEO）。\n3. SSG：博客/文档（静态 + SEO）。\n4. ISR：新闻/商品（准实时 + SEO）。\n\n结论：Next.js 可在同一项目混用，按页面特性选型。',
              },
              {
                title: 'Q2: App Router 和 Pages Router 的核心差异？',
                content: '核心差异：\n\n- 路由模型：\n  - Pages Router：基于 pages/ 目录的文件路由。\n  - App Router：基于 app/ 目录的文件夹嵌套，layout 加载UI持久化。\n\n- 默认组件：\n  - Pages Router：默认 Client Component。\n  - App Router：默认 Server Component（RSC）。\n\n- 布局系统：\n  - Pages Router：_app.tsx 全局布局，无嵌套持久布局。\n  - App Router：layout.tsx 嵌套持久化，导航不重渲染。\n\n- 数据获取：\n  - Pages Router：getServerSideProps/getStaticProps。\n  - App Router：Server Component 直接 await fetch/db。\n\n结论：新项目推荐 App Router，是 Next.js 未来方向。',
              },
              {
                title: 'Q3: Server Component 和 Client Component 的边界规则？',
                content: '边界规则：\n\n- 默认 Server Component（不打包到客户端 bundle）。\n- 需要交互/状态/浏览器 API 时加 "use client"。\n- Server 可导入 Client，传可序列化 props。\n- Client 不能直接导入 Server（客户端无服务端环境）。\n- 可通过 children prop 间接传 Server 组件给 Client。\n\n选型原则：\n1. 尽量用 Server Component（减客户端 JS）。\n2. 只在需要交互处加 "use client"。\n3. 把交互逻辑下放到叶子组件，保持上层 Server。\n\n注意："use client" 不意味着只在客户端运行，仍会 SSR。',
              },
              {
                title: 'Q4: Server Action 是什么？相比传统 API Route 有什么优势？',
                content: 'Server Action：\n- 标记 "use server" 的函数，Next.js 编译为 HTTP 端点。\n- 表单通过 action 属性直接调用，无需手写 fetch。\n- 在服务端执行，可访问数据库/文件系统。\n\n相比 API Route 的优势：\n1. 类型安全——函数签名即接口契约，端到端类型推导。\n2. 无样板——无需写 fetch/请求体解析/错误处理。\n3. 表单原生——progressive enhancement，JS 未加载也能提交。\n4. 自动重验证——配合 revalidatePath/redirect 一体化。\n\n适用：表单提交、数据变更。复杂 REST API（第三方调用、webhook）仍用 Route Handler。',
              },
              {
                title: 'Q5: 对比题——revalidatePath、revalidateTag、router.refresh 的区别？',
                content: '三者都能刷新缓存，但粒度与场景不同：\n\n- revalidatePath("/posts")：\n  - 刷新指定路径的缓存。\n  - 在 Server Action 内调用。\n  - 适合"改了某数据，刷新相关页面"。\n\n- revalidateTag("posts")：\n  - 刷新所有标记 next: { tags: ["posts"] } 的 fetch 缓存。\n  - 跨路径，更灵活。\n  - 适合"一数据多页面消费"。\n\n- router.refresh()：\n  - 客户端调用，刷新当前路由的所有 Server Component。\n  - 不传参，刷新整个路由树。\n  - 适合"客户端触发服务端重新获取"。\n\n结论：Server Action 内用前两者，客户端交互用 router.refresh。',
              },
              {
                title: 'Q6: Next.js 缓存策略有哪些层级？',
                content: '四个缓存层级：\n\n1. fetch 缓存（数据层）：\n   - force-cache（默认，SSG）。\n   - no-store（SSR）。\n   - revalidate: N（ISR）。\n\n2. 全文路由缓存（Full Route Cache）：\n   - 路由级 HTML + RSC Payload 缓存。\n   - 静态路由构建时生成，可 CDN。\n\n3. 客户端导航缓存（Router Cache）：\n   - 客户端缓存已访问路由的 RSC Payload。\n   - session 期间导航不重新请求。\n\n4. 数据缓存（Data Cache）：\n   - fetch 跨部署持久化（除非 revalidate）。\n\n结论：理解四层才能精准控制缓存行为。',
              },
              {
                title: 'Q7: Middleware 能做什么？不能做什么？',
                content: '能做（Edge Runtime）：\n1. 鉴权——检查 token，未登录重定向到 /login。\n2. 重定向——基于路径/地域/设备跳转。\n3. A/B 测试——按 cookie 分流。\n4. i18n——根据 Accept-Language 设置 locale。\n5. 请求头修改——注入自定义 header。\n\n不能做：\n1. 用 Node.js API（fs/crypto/数据库）。\n2. 执行重计算（Edge 有 CPU/内存限制）。\n3. 直接渲染页面（只能重定向/重写）。\n4. 长连接（WebSocket）。\n\n注意：middleware 在每个请求前执行，要轻量，否则拖慢所有请求。',
              },
              {
                title: 'Q8: Next.js Image 组件相比 <img> 有什么优势？',
                content: '优势：\n\n1. 自动响应式 srcset——按设备宽度生成多尺寸，节省带宽。\n2. 懒加载——默认 loading="lazy"，视口外不加载。\n3. 防 CLS——要求 width/height，预留空间避免布局偏移。\n4. 格式优化——自动转 webp/avif，浏览器支持时优先用。\n5. 占位符——placeholder="blur" 模糊占位，提升体验。\n6. loader 配置——对接 Vercel CDN/Cloudinary/自建。\n\n注意：\n- 静态 import 的图片自动优化尺寸。\n- 远程图片需在 next.config 配置 remotePatterns。\n- 不负责"上传到 CDN"，需 loader 指向你的图片服务。',
              },
              {
                title: 'Q9: 场景题——商品页需要 SEO + 准实时库存，怎么选渲染策略？',
                content: '分析需求：\n- SEO：必须有（商品页要被搜索引擎收录）。\n- 准实时库存：可容忍分钟级延迟。\n\n方案：\n1. 主页面用 ISR（revalidate: 60）——SEO + 准实时，CDN 缓存。\n2. 库存数字用 Client Component 岛屿——实时 fetch（库存变化频繁）。\n3. 加购物车按钮用 "use client"——交互逻辑。\n\n为什么不用 SSR：\n- 每次请求渲染服务器压力大。\n- 大部分商品信息变化不频繁，ISR 足够。\n- 只有库存需要实时，用客户端岛屿补足。\n\n结论：ISR + 客户端岛屿是电商商品页的最佳实践。',
              },
              {
                title: 'Q10: 场景题——Server Action 提交表单后页面没更新，可能原因？',
                content: '可能原因：\n\n1. 忘了 revalidatePath/revalidateTag——缓存未失效，列表页仍显示旧数据。\n2. redirect 位置错误——redirect 在 try/catch 内被吞掉，需放外面。\n3. useActionState 没用——返回的状态没被接收，UI 不更新。\n4. 客户端组件没标 "use client"——useActionState 在 Server Component 中不可用。\n5. form 的 action 没传 formAction——用了 onSubmit 手动 fetch 反而绕过 Server Action。\n\n排查：\n- 看网络请求，确认走的是 Server Action 端点。\n- 看服务端日志，确认 revalidatePath 执行。\n- 看客户端，确认 useActionState 接收到返回值。\n\n结论：90% 是忘了 revalidatePath 或没用 useActionState。',
              },
              {
                title: 'Q11: generateMetadata 怎么用？动态 SEO 怎么做？',
                content: '用法：\n\n- 静态 metadata：\n  export const metadata = { title: "首页", description: "..." }\n\n- 动态 generateMetadata：\n  export async function generateMetadata({ params }) {\n    const post = await getPost(params.id)\n    return { title: post.title, description: post.summary }\n  }\n\n支持的字段：\n- title（支持 template 模板）\n- description\n- openGraph（Facebook 分享卡）\n- twitter（Twitter 卡片）\n- canonical（规范 URL）\n- robots（index/follow）\n- alternates（多语言/移动版）\n\n注意：generateMetadata 只在 Server Component 可用，它是异步的，可 await 数据库/fetch。Next.js 会等它返回再发送 HTML，确保 <head> 标签正确。',
              },
              {
                title: 'Q12: layout.tsx 和 template.tsx 的区别？',
                content: '区别在持久化：\n\n- layout.tsx：\n  - 路由切换时保持不变（持久化）。\n  - 状态保留（如导航栏展开状态）。\n  - 适合导航栏、侧边栏、Footer 等公共 UI。\n\n- template.tsx：\n  - 每次导航都重新创建实例。\n  - 状态重置。\n  - 适合需要每次进入页面重置的场景（如表单页、动画）。\n\n使用：\n- 默认用 layout.tsx（大多数场景）。\n- 只在需要"每次进入重置状态"时才用 template.tsx。\n- 两者可共存，template 嵌套在 layout 内。\n\n结论：layout 是默认，template 是特例。',
              },
              {
                title: 'Q13: 对比题——getServerSideProps 和 App Router 的 Server Component 数据获取？',
                content: '两者都做服务端数据获取，但范式不同：\n\n- getServerSideProps（Pages Router）：\n  - 特殊函数，每次请求执行。\n  - 返回 { props } 传给页面组件。\n  - 页面组件仍是 Client Component（需水合）。\n  - 样板代码多。\n\n- Server Component（App Router）：\n  - 组件本身是 async，直接 await fetch/db。\n  - 无需特殊函数，数据获取即组件逻辑。\n  - 默认不水合（除非加 "use client"）。\n  - 类型推导端到端。\n\n结论：App Router 把数据获取"组件化"，更直观、更少样板、更易复用。新项目用 App Router。',
              },
              {
                title: 'Q14: 场景题——页面加载慢（LCP 差），从 Next.js 角度如何优化？',
                content: '优化方向：\n\n1. 渲染策略：\n   - 静态内容用 SSG（最快）。\n   - 准实时用 ISR。\n   - 避免无谓 SSR（服务器渲染慢）。\n\n2. 图片：\n   - 用 next/image（自动 srcset/懒加载/webp）。\n   - 设 width/height 防 CLS。\n   - 关键图片 priority。\n\n3. 字体：\n   - 用 next/font（自托管、自动优化、无布局偏移）。\n\n4. 代码分割：\n   - 动态 import 大组件（dynamic()）。\n   - 路由级自动分割。\n\n5. 第三方脚本：\n   - 用 next/script 策略加载（afterInteractive/lazyOnload）。\n\n6. Server Component：\n   - 尽量用 RSC 减少客户端 JS。\n\n排查：用 Lighthouse 看 LCP，用 Next.js built-in analyzer 看 bundle。',
              },
              {
                title: 'Q15: 对比题——Route Handler 和 Server Action 的取舍？',
                content: '两者都是服务端代码，但定位不同：\n\n- Route Handler（app/api/.../route.ts）：\n  - REST API 端点。\n  - 处理 GET/POST 等所有方法。\n  - 适合：第三方调用、webhook、公开 API。\n  - 客户端需手动 fetch。\n\n- Server Action（"use server"）：\n  - 表单提交/数据变更。\n  - 只处理 POST（表单提交）。\n  - 适合：表单、内部数据操作。\n  - 客户端通过 action 属性直接调用。\n\n取舍：\n- 表单提交 → Server Action（类型安全、无样板）。\n- 公开 API/webhook → Route Handler。\n- 复杂 REST 语义 → Route Handler。\n\n结论：Server Action 是表单的进化，不是 API 的替代。',
              },
              {
                title: 'Q16: 场景题——迁移 Pages Router 到 App Router，主要改动？',
                content: '主要改动：\n\n1. 目录结构：\n   - pages/ → app/，每个路由是文件夹，page.tsx 是 UI。\n\n2. 数据获取：\n   - getServerSideProps/getStaticProps → Server Component 直接 await。\n   - getStaticPaths → generateStaticParams。\n\n3. 布局：\n   - _app.tsx/_document.tsx → app/layout.tsx（根布局）。\n   - 自定义 Document → layout.tsx 的 <html><body>。\n\n4. 组件默认：\n   - 默认变 Server Component，需交互的加 "use client"。\n\n5. 路由钩子：\n   - useRouter（next/router）→ useRouter（next/navigation）。\n   - 顶层数据用 searchParams/useSearchParams。\n\n6. API：\n   - pages/api → app/api/route.ts（Route Handler）。\n\n结论：渐进迁移，可共存，按路由逐步切换。',
              },
              {
                title: 'Q17: Next.js 的 Streaming（流式渲染）是什么？',
                content: 'Streaming（流式渲染）：\n\n- 服务端边渲染边发送 HTML，不等所有数据就绪。\n- 用 React Suspense 包裹慢部分，先发送已就绪部分。\n- 客户端逐步接收并渲染，提升首屏感知速度。\n\n用法：\n1. Server Component 中用 Suspense 包裹慢组件。\n2. 慢组件 await 数据，加载期间显示 fallback。\n3. Next.js 流式发送已就绪 HTML + Suspense fallback。\n\n好处：\n- TTFB（首字节时间）大幅降低。\n- 用户更快看到内容，不用等所有数据。\n- 慢部分不阻塞快部分。\n\n适用：仪表盘、聚合页（多数据源）、个性化页。配合 RSC 使用效果最佳。',
              },
              {
                title: 'Q18: 场景题——Server Component 中 fetch 报错 "use client 才能用"，怎么排查？',
                content: '根因：在 Server Component 中用了客户端 API。\n\n常见错误：\n1. 用了 useState/useEffect——只能在 Client Component。\n2. 用了 onClick/onChange 等事件——只能在 Client Component。\n3. 用了 window/document/localStorage——浏览器 API，服务端没有。\n4. 用了 useRouter（next/navigation 的客户端版本）——需 "use client"。\n\n排查：\n1. 看报错行，确认是哪个 API。\n2. 该 API 是否需要客户端环境？\n3. 是 → 把用到它的部分拆到 Client Component 子组件，加 "use client"。\n4. 否 → 检查是否误用（如服务端不该用 window）。\n\n修复模式：上层 Server Component 取数据，传 props 给下层 Client Component 做交互。',
              },
              {
                title: 'Q19: 对比题——Next.js 和 Nuxt 的核心差异？',
                content: '核心差异：\n\n- 生态基础：\n  - Next.js：基于 React。\n  - Nuxt：基于 Vue。\n\n- 组件模型：\n  - Next.js：Server Components（RSC）。\n  - Nuxt：组件 islands + 混合渲染（无 RSC 对等物）。\n\n- 路由：\n  - Next.js：App Router 文件夹嵌套。\n  - Nuxt：基于 Vue Router，文件路由 + 配置。\n\n- 数据获取：\n  - Next.js：Server Component async await。\n  - Nuxt：useFetch/useAsyncData（组合式 API）。\n\n- 市场定位：\n  - Next.js：React 生态最大、Vercel 支持、企业采用多。\n  - Nuxt：Vue 生态首选、DX 好、欧洲流行。\n\n结论：技术栈选 React 用 Next，选 Vue 用 Nuxt。能力上两者都覆盖 SSR/SSG/ISR/全栈。',
              },
              {
                title: 'Q20: 场景题——如何为一个多页面应用选 ISR 的 revalidate 时间？',
                content: '选 revalidate 的考量：\n\n1. 数据新鲜度要求：\n   - 秒级（股票）→ 不用 ISR，用 SSR/客户端实时。\n   - 分钟级（新闻、库存）→ revalidate: 60。\n   - 小时级（商品价格）→ revalidate: 3600。\n   - 天级（博客、文档）→ SSG 即可，无需 ISR。\n\n2. 流量与成本：\n   - 高流量页面 revalidate 短，避免用户看到旧数据。\n   - 低流量页面 revalidate 长，减少重新生成次数（省钱）。\n\n3. 按需刷新：\n   - 数据变更时用 revalidateTag 主动刷新，不依赖定时。\n   - 用户发布内容后立即可见。\n\n最佳实践：\n- 大部分页面用 SSG。\n- 频繁更新的用 ISR + 按需刷新（revalidateTag）。\n- 实时性强的用客户端补足。\n\n结论：ISR revalidate 不是越短越好，按数据特性与流量平衡。',
              },
              {
                title: 'Q21: Next.js 的 route segment config（routeRules）是什么？',
                content: 'routeRules（next.config.ts）：\n\n- 声明式配置每个路由的渲染策略。\n- 在同一项目混用 SSG/SSR/ISR/CSR。\n\n示例：\n- "/": { prerender: true }——SSG。\n- "/blog/**": { swr: 3600 }——ISR（1 小时）。\n- "/admin/**": { ssr: false }——CSR。\n- "/api/**": { cors: true }——API。\n\n好处：\n1. 集中管理路由策略，一目了然。\n2. 不用在每个页面写 fetch 的 cache 选项。\n3. 支持通配符，批量配置。\n\n注意：routeRules 是 Pages Router 的 ISR/SSG 标记的进化，App Router 仍可用，也可在页面用 fetch 选项细控。',
              },
              {
                title: 'Q22: 手写一个 ISR 页面（带按需刷新）？',
                content: '实现：\n\n// app/posts/[id]/page.tsx\nexport async function generateStaticParams() {\n  const posts = await db.post.findMany()\n  return posts.map((p) => ({ id: String(p.id) }))\n}\n\nexport const revalidate = 60  // 60 秒 ISR\n\nexport default async function Page({ params }) {\n  const post = await db.post.findUnique({ where: { id: params.id } })\n  return <article>{post.title}</article>\n}\n\n// app/actions.ts\n"use server"\nimport { revalidateTag } from "next/cache"\nexport async function updatePost(id, data) {\n  await db.post.update({ where: { id }, data })\n  revalidateTag(`post-${id}`)  // 按需刷新\n}\n\n原理：\n- generateStaticParams 预生成静态页。\n- revalidate=60 定时刷新。\n- revalidateTag 按需刷新（数据变更时）。\n\n结论：ISR = 静态 + 定时 + 按需，兼顾性能与新鲜度。',
              },
              {
                title: 'Q23: 场景题——客户端组件需要服务端数据，怎么做？',
                content: '几种方案：\n\n1. 父级 Server Component 取数据，传 props：\n   - 推荐，props 必须可序列化。\n   - <ClientView data={data} />\n\n2. 客户端用 fetch + useEffect（传统）：\n   - 失去 SEO、有加载闪烁。\n   - 仅用于纯客户端数据（如用户操作后获取）。\n\n3. React Query / SWR：\n   - 客户端缓存/失效。\n   - 适合交互后按需获取。\n\n4. Server Action：\n   - 客户端触发，服务端执行，返回数据。\n   - 适合"操作后获取"（如搜索）。\n\n最佳实践：\n- 首屏数据用方案 1（Server 取，传 props）。\n- 交互后数据用方案 3 或 4。\n\n结论：不要在 Client Component 用 useEffect 取首屏数据，那失去了 RSC 的意义。',
              },
              {
                title: 'Q24: 对比题——next/dynamic 和 React.lazy 的区别？',
                content: '两者都做代码分割，但场景不同：\n\n- React.lazy：\n  - 通用 React，客户端分割。\n  - 需配 Suspense。\n  - 只支持默认导出。\n  - 不关心 SSR。\n\n- next/dynamic：\n  - Next.js 专属。\n  - 支持 ssr: false（仅客户端渲染，适合图表/编辑器等依赖 window 的组件）。\n  - 支持命名导出。\n  - 可指定 loading 占位。\n  - 自动处理 SSR。\n\n取舍：\n- Next.js 项目用 next/dynamic（功能更全）。\n- 纯 React 项目用 React.lazy。\n- 需"仅客户端渲染"（如 CodeMirror）用 next/dynamic + ssr: false。\n\n注意：ssr: false 只能在 Client Component 中用。',
              },
              {
                title: 'Q25: 场景题——如何为 Next.js 项目做 SEO 优化？',
                content: 'SEO 优化清单：\n\n1. 元数据：\n   - 用 metadata/generateMetadata 配 title/description。\n   - 配 openGraph/twitter 卡片。\n   - 配 canonical 防重复内容。\n\n2. 渲染策略：\n   - 内容页用 SSG/SSR（保证 HTML 可抓取）。\n   - 避免纯 CSR（爬虫看不到内容）。\n\n3. 结构化数据：\n   - 用 JSON-LD 标记文章/产品/面包屑。\n   - 帮助搜索引擎理解内容。\n\n4. 站点地图：\n   - 用 app/sitemap.ts 自动生成。\n   - 提交到 Google Search Console。\n\n5. robots：\n   - 用 app/robots.ts 配置爬虫规则。\n\n6. 性能：\n   - LCP/FID/CLS 达标（搜索引擎排名因素）。\n   - 用 next/image/next/font 优化。\n\n7. URL 结构：\n   - 语义化 URL（/posts/react-hooks 而非 /posts/123）。\n\n结论：Next.js 内置大部分 SEO 能力，配 metadata + SSG/SSR + sitemap 即可。',
              },
              {
                title: 'Q26: 场景题——多语言（i18n）站点在 Next.js 怎么实现？',
                content: 'App Router i18n 方案：\n\n1. 路由结构：\n   app/[locale]/page.tsx\n   app/[locale]/blog/page.tsx\n\n2. 中间件协商：\n   middleware.ts 根据 Accept-Language / cookie 重定向到对应 locale。\n\n3. generateStaticParams：\n   预生成所有 locale 的静态页。\n\n4. 字典：\n   用 Server Component 加载对应 locale 的 JSON 字典。\n   const dict = await import(`/dictionaries/${locale}.json`)\n\n5. hreflang：\n   metadata.alternates.languages 配多语言版本。\n\n6. 内容翻译：\n   - UI 文案用字典。\n   - 内容（文章）按 locale 存数据库。\n\n注意：\n- SSR/SSG 都要按 locale 生成。\n- 日期/数字用 Intl 格式化。\n\n结论：App Router 的 i18n 更灵活，社区方案如 next-intl/next-i18next 简化实现。',
              },
              {
                title: 'Q27: Next.js 部署方式有哪些？',
                content: '部署方式：\n\n1. Vercel（首选）：\n   - Next.js 母公司，零配置。\n   - 自动 ISR/Edge/SSR 全支持。\n   - 预览部署、分析、监控一体化。\n\n2. Node.js 服务器：\n   - next build && next start。\n   - 适合自建/云主机。\n   - 需自己管 CDN/缓存。\n\n3. Docker：\n   - 容器化部署到 K8s/云。\n   - 适合企业内网/混合云。\n\n4. 静态导出（output: export）：\n   - 纯 SSG，无 SSR/ISR/Server Action。\n   - 部署到任何静态主机（GitHub Pages/S3）。\n   - 限制大，仅适合纯内容站。\n\n5. Edge（实验）：\n   - 部分路由跑 Edge Runtime。\n   - 全球低延迟，但 API 限制多。\n\n结论：Vercel 最省心，自建用 Node/Docker，纯静态用 export。',
              },
              {
                title: 'Q28: 对比题——SSG 和 ISR 何时选哪个？',
                content: '两者都是静态生成，区别在更新机制：\n\n- SSG：\n  - 构建时生成，部署后不变。\n  - 更新需重新构建部署。\n  - 适合：博客、文档、营销页（内容很少变）。\n\n- ISR：\n  - 构建时生成 + 运行时按需重新生成。\n  - revalidate: N 定时刷新，或 revalidateTag 按需刷新。\n  - 适合：新闻、商品、商品价格（内容频繁变）。\n\n判断标准：\n1. 内容多久变一次？\n   - 几乎不变 → SSG。\n   - 分钟/小时级变 → ISR。\n2. 是否需要"发布后立即生效"？\n   - 是 → ISR + 按需刷新（revalidateTag）。\n   - 否（可等下次构建）→ SSG。\n\n结论：静态优先 SSG，需要更新用 ISR。SSG 更快更省，ISR 兼顾新鲜度。',
              },
              {
                title: 'Q29: 场景题——Next.js 项目首屏 JS bundle 过大，如何优化？',
                content: '优化方向：\n\n1. 用 Server Component：\n   - 默认 RSC 不打包到客户端。\n   - 把交互逻辑下放到叶子 Client Component。\n\n2. 代码分割：\n   - 路由级自动分割。\n   - 大组件用 next/dynamic 懒加载。\n   - 图表/编辑器等重组件 ssr: false + dynamic。\n\n3. 第三方库：\n   - 按需引入（lodash-es 而非 lodash）。\n   - 用轻量替代（date-fns 替代 moment）。\n   - next/script 策略加载第三方脚本。\n\n4. 分析：\n   - @next/bundle-analyzer 看 bundle 组成。\n   - 找出大依赖，针对性优化。\n\n5. Tree Shaking：\n   - 确保用 ESM 导入。\n   - 避免 import * 全量导入。\n\n结论：RSC + 按需分割 + 轻量依赖是减 bundle 的三件套。先分析再优化，避免盲目。',
              },
              {
                title: 'Q30: 场景题——Server Action 中 redirect 报错 "redirect 之外有代码"，怎么处理？',
                content: '根因：redirect 必须是 Server Action 的最后一步，且不能在 try/catch 内。\n\nredirect 的特殊性：\n- 内部抛一个特殊异常（NEXT_REDIRECT）。\n- Next.js 捕获后执行重定向。\n- try/catch 会吞掉这个异常，导致不重定向。\n\n正确写法：\n\n"use server"\nasync function createPost(formData) {\n  const data = schema.parse(formData)  // 校验\n  const post = await db.post.create({ data })\n  revalidatePath("/posts")\n  redirect(`/posts/${post.id}`)  // 最后，不在 try 内\n}\n\n错误模式：\n- try { ... redirect(...) } catch {}  // 异常被吞\n- redirect 后还有代码  // 不会执行\n\n结论：redirect 放函数末尾，不在 try 内。校验失败用 return（不抛异常），成功才到 redirect。',
              },
              {
                title: 'Q31: Next.js 15 的主要新特性有哪些？',
                content: 'Next.js 15 关键特性：\n\n1. React 19 支持：\n   - 默认 React 19。\n   - useActionState/useOptimistic 等。\n\n2. 缓存默认值变更：\n   - fetch 默认从 force-cache 改为 no-store（更直觉）。\n   - GET Route Handler 默认不缓存。\n\n3. 部分预渲染（PPR）：\n   - 静态壳 + 动态洞，按需组合。\n   - 兼顾 SSG 速度与 SSR 动态。\n\n4. Turbopack 稳定：\n   - next dev --turbo 默认。\n   - 构建更快。\n\n5. async cookies/headers/params：\n   - 这些 API 变异步，明确动态边界。\n\n6. 文件改进：\n   - 缓存标签可视化。\n   - 更好的错误提示。\n\n结论：Next.js 15 强化"动态与静态混搭"（PPR）与 DX（Turbopack、异步 API）。',
              },
              {
                title: 'Q32: 场景题——如何为 Next.js 全栈项目做技术选型？',
                content: '选型决策：\n\n1. 是否需要 SSR/SSG？\n   - 否（纯 SPA）→ Vite + React。\n   - 是 → Next.js。\n\n2. 路由模式：\n   - 新项目 → App Router（未来方向）。\n   - 老项目迁移 → Pages Router 共存，逐步切。\n\n3. 数据获取：\n   - 服务端数据 → Server Component await。\n   - 客户端交互后数据 → React Query/SWR。\n   - 表单提交 → Server Action。\n   - 公开 API → Route Handler。\n\n4. 状态管理：\n   - 客户端 UI 状态 → Zustand。\n   - 服务端状态 → React Query。\n   - 跨页全局 → Context + Server Component。\n\n5. 样式：\n   - Tailwind CSS（与 Next.js 集成最好）。\n\n6. 数据库：\n   - ORM（Prisma/Drizzle）+ Server Component/Action。\n\n7. 部署：\n   - Vercel（首选）。\n   - 自建 → Docker + Node。\n\n结论：Next.js 全栈 = App Router + RSC + Server Action + Tailwind + ORM，按需引入 React Query/Zustand。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 19：Next.js 全栈速查表
    // ========================================================================
    {
      order: 19,
      title: 'Next.js 全栈速查表',
      difficulty: 1,
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          text: 'Next.js 全栈核心知识点速查表，快速回顾渲染模式、App Router、Server/Client 边界、缓存策略、SEO、Server Action 等关键概念。',
        },
        {
          id: 'p19-2',
          type: 'table',
          caption: 'Next.js 全栈速查表',
          headers: ['知识点', '关键要点', '常用 API / 写法'],
          rows: [
            ['CSR', '客户端渲染，首屏慢、SEO 差', '无（默认 React 行为）'],
            ['SSR', '每次请求服务端渲染，SEO 好', 'Server Component / cache: no-store'],
            ['SSG', '构建时生成静态 HTML，最快', '默认 / generateStaticParams'],
            ['ISR', 'SSG + 定时/按需重新生成', 'revalidate: N / revalidateTag'],
            ['App Router', 'app/ 文件夹嵌套路由', 'app/page.tsx / layout.tsx'],
            ['Pages Router', 'pages/ 文件路由（旧）', 'pages/index.js'],
            ['Server Component', '默认，服务端渲染不打包到客户端', 'async function Page() {}'],
            ['Client Component', '需交互/状态，加 "use client"', "'use client' / useState"],
            ['Server Action', '表单提交到服务端，类型安全', "'use server' / action={fn}"],
            ['Route Handler', 'REST API 端点', 'app/api/.../route.ts'],
            ['Middleware', 'Edge 鉴权/重定向/A-B', 'middleware.ts (Edge Runtime)'],
            ['fetch 缓存', 'force-cache/no-store/revalidate', 'fetch(url, { next: { revalidate: 60 } })'],
            ['revalidatePath', '刷新路径缓存', "revalidatePath('/posts')"],
            ['revalidateTag', '按标签刷新缓存（跨路径）', 'revalidateTag("posts")'],
            ['layout.tsx', '持久化布局，导航不重渲染', 'app/layout.tsx'],
            ['template.tsx', '每次导航重渲染（状态重置）', 'app/template.tsx'],
            ['generateMetadata', '动态 SEO 元数据', 'export async function generateMetadata({ params })'],
            ['next/image', '自动 srcset/懒加载/防 CLS', '<Image src=... width=... height=... />'],
            ['next/font', '自托管字体，无布局偏移', 'const font = Inter({ subsets: ["latin"] })'],
            ['next/dynamic', '组件懒加载/代码分割', "dynamic(() => import('./X'), { ssr: false })"],
            ['routeRules', '声明式路由策略配置', "next.config.ts routeRules: { '/': { prerender: true } }"],
            ['Streaming', '流式渲染，Suspense 边发边送', '<Suspense fallback={...}>'],
            ['useActionState', '管理 Server Action 状态', 'const [state, action] = useActionState(fn, null)'],
            ['部署', 'Vercel/Node/Docker/静态导出', 'next build && next start'],
          ],
        },
      ],
    },
  ],
}
