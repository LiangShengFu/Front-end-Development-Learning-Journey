/**
 * 模块 10：Next.js 与 SSR/SSG 全栈
 *
 * 严格遵循 docx/PROJECT_CONTENT.md 与 docx/模块十.md 设计文档：
 * - 16 个知识点（15 章节 + 1 小测验）
 * - 16 个可视化演示（7 个新增 Next.js 专属组件 + 9 个复用核心组件）
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
 * - KP16 全栈框架小测验（QuizCard 10 题）
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
  knowledgePointCount: 16,
  visualizationCount: 16,
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
          id: 'nx-p1-1',
          type: 'paragraph',
          lead: true,
          text: '前端渲染模式经历了「CSR 统一 → SSR 复兴 → SSG/ISR 混合」的演进。理解每种模式的「渲染时机」和「数据新鲜度」是全栈架构的基础。CSR 在客户端渲染，SSR 每次请求服务端渲染，SSG 构建时生成静态文件，ISR 在 SSG 基础上定时更新。',
        },
        {
          id: 'nx-p1-2',
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
          id: 'nx-p1-3',
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
          id: 'nx-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js 13 引入 App Router（app/ 目录），替代原有的 Pages Router（pages/ 目录）。App Router 基于 React Server Components，支持嵌套布局、流式渲染、Server Actions 等新特性。',
        },
        {
          id: 'nx-p2-2',
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
          id: 'nx-p2-3',
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
          id: 'nx-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'Server Components（RSC）在服务端渲染，不打包到客户端 JS bundle，可直接访问数据库/文件系统。Client Components 用 "use client" 声明，在客户端运行，可使用 useState/useEffect/事件处理等浏览器 API。',
        },
        {
          id: 'nx-p3-2',
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
          id: 'nx-p3-3',
          type: 'demo',
          visualizationType: 'rsc-payload-flow',
          data: { mode: 'streaming' },
        },
        {
          id: 'nx-p3-4',
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
          id: 'nx-p4-1',
          type: 'paragraph',
          lead: true,
          text: "Server Actions 是 Next.js 14+ 的核心特性，允许直接在 Server Component 中定义服务端执行的函数。通过 'use server' 标记，Next.js 自动编译为 HTTP 端点，表单通过 action 属性直接调用，无需手写 fetch/API Route。",
        },
        {
          id: 'nx-p4-2',
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
          id: 'nx-p4-3',
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
          id: 'nx-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Route Handlers（app/api/ 目录下的 route.ts）是 Next.js 的 HTTP API 端点，替代 Pages Router 的 API Routes。支持 GET/POST/PUT/DELETE 等方法，适合公开 API、Webhook、文件上传等场景。与 Server Actions 互为补充。',
        },
        {
          id: 'nx-p5-2',
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
          id: 'nx-p5-3',
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
          id: 'nx-p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js App Router 中，Server Component 直接用 async/await 获取数据。fetch API 默认缓存（force-cache），可通过 cache/revalidate/next.tags 控制。Server Action 中用 revalidatePath/revalidateTag 按需刷新。',
        },
        {
          id: 'nx-p6-2',
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
          id: 'nx-p6-3',
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
          id: 'nx-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'SSG（Static Site Generation）在构建时生成静态 HTML，部署到 CDN 实现极速访问。适合内容不频繁变化的页面（博客、文档、营销页）。Next.js App Router 中 Server Component 默认就是 SSG。',
        },
        {
          id: 'nx-p7-2',
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
          id: 'nx-p7-3',
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
          id: 'nx-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'ISR（Incremental Static Regeneration）在 SSG 基础上允许定时更新静态页面。首次请求返回缓存的静态页，后台 revalidate 时间到后下次请求触发重新生成。兼顾 SSG 的速度和 SSR 的新鲜度。',
        },
        {
          id: 'nx-p8-2',
          type: 'demo',
          visualizationType: 'rsc-payload-flow',
          data: { mode: 'streaming' },
        },
        {
          id: 'nx-p8-3',
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
          id: 'nx-p8-4',
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
          id: 'nx-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js App Router 通过 metadata API 管理 SEO。在 layout.tsx 或 page.tsx 中导出 metadata 对象或 generateMetadata 函数，自动生成 <title>/<meta>/<link> 等标签。支持模板、动态生成、Open Graph、Twitter Card。',
        },
        {
          id: 'nx-p9-2',
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
          id: 'nx-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'next/image 组件自动优化图片：按设备尺寸生成响应式图片、WebP/AVIF 格式转换、懒加载、防 CLS（设置宽高比）、占位符模糊。生产环境通过 Next.js Image Optimization API 或 loader 处理。',
        },
        {
          id: 'nx-p10-2',
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
          id: 'nx-p10-3',
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
          id: 'nx-p11-1',
          type: 'paragraph',
          lead: true,
          text: 'App Router 的路由系统基于文件系统，支持动态路由（[param]）、嵌套布局（layout.tsx）、并行路由（@slot）、拦截路由（(..)）、路由组（(group)）等高级特性。',
        },
        {
          id: 'nx-p11-2',
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
          id: 'nx-p11-3',
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
          id: 'nx-p12-1',
          type: 'paragraph',
          lead: true,
          text: 'Middleware 在请求完成前运行，可重写/重定向/修改请求头和响应头。常用于鉴权、A/B 测试、国际化、特征开关。在 Edge Runtime 运行，延迟极低。通过 matcher 配置匹配的路径。',
        },
        {
          id: 'nx-p12-2',
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
          id: 'nx-p13-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js 全栈开发模式：Server Component 获取数据 + Client Component 处理交互 + Server Action 处理变更 + Route Handler 处理 API + Middleware 处理拦截。以下框架选型向导帮助你在 Next.js / Nuxt / Astro / Remix 间做理性决策。',
        },
        {
          id: 'nx-p13-2',
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
          id: 'nx-p13-3',
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
          id: 'nx-p14-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js 和 Nuxt 分别是 React 和 Vue 生态的全栈框架。两者设计理念相似（SSR/SSG/ISR、文件路由、API 路由），但底层框架不同导致 API 风格和生态有差异。',
        },
        {
          id: 'nx-p14-2',
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
          id: 'nx-p14-3',
          type: 'demo',
          visualizationType: 'islands-arch-demo',
          data: {},
        },
        {
          id: 'nx-p14-4',
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
          id: 'nx-p15-1',
          type: 'paragraph',
          lead: true,
          text: 'Next.js 全栈开发的核心技巧速查，涵盖渲染模式选择、Server/Client 组件边界、缓存策略、SEO 等高频知识点。',
        },
        {
          id: 'nx-p15-2',
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
          id: 'nx-p16-1',
          type: 'paragraph',
          lead: true,
          text: '通过 10 道精选测验题检验对 Next.js 全栈框架的掌握程度，覆盖 SSR/SSG/ISR、Server Components、Server Actions、Middleware、路由系统等核心考点。',
        },
        {
          id: 'nx-p16-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'SSG（静态站点生成）的渲染时机是？',
                options: ['每次请求时', '构建时', '运行时定时', '客户端加载后'],
                correctIndex: 1,
                explanation: 'SSG 在构建时（build time）生成静态 HTML 文件，部署到 CDN 后每次请求直接返回静态文件，无需服务端渲染。适合博客、文档等内容不频繁变化的页面。',
              },
              {
                question: 'Server Component 的主要优势是？',
                options: ['可以使用 useState', '不打包到客户端 JS bundle', '支持事件处理', '可直接操作 DOM'],
                correctIndex: 1,
                explanation: 'Server Component 在服务端渲染，其代码不打包到客户端 JS bundle，减少客户端 JS 体积。还可以直接访问数据库/文件系统，但不能使用 useState/useEffect/事件处理等客户端 API。',
              },
              {
                question: 'ISR 的 revalidate: 60 表示什么？',
                options: ['每 60 秒强制刷新', '60 秒后标记为 stale，下次请求触发重新生成', '60 分钟后删除缓存', '每 60 个请求刷新一次'],
                correctIndex: 1,
                explanation: 'revalidate: 60 表示 60 秒后缓存标记为 stale（过期）。下次请求时仍返回旧缓存（stale-while-revalidate），但后台触发重新生成。生成完成后后续请求返回新内容。',
              },
              {
                question: "Server Action 中 'use server' 的作用是？",
                options: ['标记为服务端组件', '标记函数在服务端执行，编译为 HTTP 端点', '禁用客户端渲染', '启用 SSR'],
                correctIndex: 1,
                explanation: "use server 标记的函数会被 Next.js 编译为 Server Action，自动创建 HTTP 端点。表单通过 action 属性直接调用，无需手写 fetch。函数在服务端执行，可访问数据库/文件系统。",
              },
              {
                question: 'Next.js Middleware 的运行环境是？',
                options: ['Node.js Runtime', 'Edge Runtime', '浏览器', 'Web Worker'],
                correctIndex: 1,
                explanation: 'Middleware 在 Edge Runtime 运行，启动极快、延迟低，适合鉴权/重定向/A-B测试等轻量逻辑。但不能使用 Node.js API（如 fs/crypto），仅支持 Web API 和 Next.js 特定 API。',
              },
              {
                question: '关于 Server Component 和 Client Component 的边界，以下正确的是？',
                options: ['Client 可直接导入 Server', 'Server 可导入 Client（传可序列化 props）', '两者可互相导入', '不能互相导入'],
                correctIndex: 1,
                explanation: 'Server Component 可导入 Client Component 并传递可序列化的 props。但 Client Component 不能直接导入 Server Component（因为客户端没有服务端环境），可通过 children prop 间接传入。',
              },
              {
                question: 'revalidatePath 和 revalidateTag 的区别是？',
                options: ['功能完全相同', 'revalidatePath 刷新路径缓存，revalidateTag 刷新标签缓存', 'revalidatePath 更快', 'revalidateTag 只能用于 SSR'],
                correctIndex: 1,
                explanation: 'revalidatePath("/posts") 刷新指定路径的缓存。revalidateTag("posts") 刷新所有标记了 next: { tags: ["posts"] } 的 fetch 缓存。Tag 更灵活，可跨路径刷新相关数据。',
              },
              {
                question: 'Astro Islands Architecture 的核心思想是？',
                options: ['全部组件在服务端渲染', '仅交互组件按需水合，静态 HTML 零 JS', '使用 Web Components', '不支持任何客户端 JS'],
                correctIndex: 1,
                explanation: 'Islands Architecture 将页面分为静态 HTML（海洋）和交互组件（岛屿）。静态部分零 JS，只有岛屿组件按需水合。client:load/idle/visible/media 控制水合时机，大幅减少 JS 体积。',
              },
              {
                question: 'Next.js App Router 中 layout.tsx 的特性是？',
                options: ['每次导航都重新渲染', '持久化，导航时不重渲染', '只在 SSG 中可用', '不能有子组件'],
                correctIndex: 1,
                explanation: 'layout.tsx 是持久化布局，在路由切换时不会重新渲染（只有 children 部分变化）。这使得导航栏、侧边栏等公共 UI 保持状态不丢失，提升用户体验。template.tsx 则每次导航都重新渲染。',
              },
              {
                question: 'generateMetadata 函数的作用是？',
                options: ['生成静态 HTML', '动态生成页面的 SEO 元数据', '生成路由参数', '生成 Server Action'],
                correctIndex: 1,
                explanation: 'generateMetadata 是异步函数，接收 params/searchParams，返回 Metadata 对象。用于动态生成 <title>/<meta>/<link> 等 SEO 标签，支持 Open Graph、Twitter Card 等。在 Server Component 中可用。',
              },
            ],
          },
        },
      ],
    },
  ],
}
