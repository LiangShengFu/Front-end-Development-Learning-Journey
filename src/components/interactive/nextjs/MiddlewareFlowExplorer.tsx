/**
 * MiddlewareFlowExplorer — Middleware 流程探索器
 *
 * 交互式探索 Next.js Middleware 的三个核心场景：
 * 鉴权重定向、A/B 测试 Cookie 注入、国际化路由重写。
 * 用户选择场景，观察请求→Middleware→路由处理的完整链路。
 *
 * ⚠️ 教学模拟：请求模拟不发起真实 HTTP 请求。
 *
 * 对应docx中演示 #6
 */
import { useState } from 'react'
import type { MiddlewareFlowExplorerData } from '../../../lib/nextjs-visualization-types'
import { CodeBlock } from '../../ui/CodeBlock'
import { cn } from '../../../lib/utils'

interface MiddlewareFlowExplorerProps {
  data?: MiddlewareFlowExplorerData
}

const DEFAULT_SCENARIOS = [
  {
    id: 'auth',
    label: '鉴权重定向',
    description: '未登录用户访问 /dashboard 时重定向到 /login',
    matcher: "config = { matcher: ['/dashboard/:path*'] }",
    code: `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token) {
    // 未登录 → 重定向到登录页
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next() // 已登录 → 放行
}`,
    testUrls: [
      { url: '/dashboard', expectedOutcome: '✅ 重定向到 /login（无 token）' },
      { url: '/dashboard/settings', expectedOutcome: '✅ 重定向到 /login（无 token）' },
      { url: '/login', expectedOutcome: '⏭️ 不匹配 matcher，直接放行' },
    ],
  },
  {
    id: 'ab-test',
    label: 'A/B 测试',
    description: '通过 Cookie 分配用户到 A 或 B 版本',
    matcher: "config = { matcher: ['/'] }",
    code: `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  let variant = request.cookies.get('ab-variant')
  if (!variant) {
    // 首次访问：随机分配 A/B
    variant = Math.random() > 0.5 ? 'A' : 'B'
    const response = NextResponse.next()
    response.cookies.set('ab-variant', variant)
    return response
  }
  // 已有 Cookie → 直接放行
  return NextResponse.next()
}`,
    testUrls: [
      { url: '/（首次访问）', expectedOutcome: '🍪 设置 ab-variant Cookie（A 或 B）' },
      { url: '/（已有 Cookie A）', expectedOutcome: '⏭️ 放行，版本 A' },
      { url: '/about', expectedOutcome: '⏭️ 不匹配 matcher，直接放行' },
    ],
  },
  {
    id: 'i18n',
    label: '国际化路由',
    description: '根据 Accept-Language 重写到对应语言路径',
    matcher: "config = { matcher: ['/((?!api|_next|favicon).*)'] }",
    code: `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['zh', 'en', 'ja']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // 检查路径是否已有语言前缀
  const hasLocale = locales.some(l => pathname.startsWith(\`/\${l}\`))
  if (hasLocale) return NextResponse.next()

  // 根据 Accept-Language 选择语言
  const lang = request.headers.get('accept-language')?.startsWith('zh') ? 'zh' : 'en'
  // 重写到对应语言路径
  return NextResponse.rewrite(new URL(\`/\${lang}\${pathname}\`, request.url))
}`,
    testUrls: [
      { url: '/（Accept-Language: zh-CN）', expectedOutcome: '✏️ 重写到 /zh' },
      { url: '/about（Accept-Language: en）', expectedOutcome: '✏️ 重写到 /en/about' },
      { url: '/zh/dashboard', expectedOutcome: '⏭️ 已有语言前缀，放行' },
    ],
  },
]

export function MiddlewareFlowExplorer({ data }: MiddlewareFlowExplorerProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [scenarioId, setScenarioId] = useState(scenarios[0].id)
  const [selectedUrlIdx, setSelectedUrlIdx] = useState(0)

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]
  const testUrl = scenario.testUrls[Math.min(selectedUrlIdx, scenario.testUrls.length - 1)]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 教学模拟声明 */}
      <div className="mb-lg rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 教学模拟：请求模拟不发起真实 HTTP 请求。
        </p>
      </div>

      {/* 场景切换 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => { setScenarioId(s.id); setSelectedUrlIdx(0) }}
            className={cn(
              'rounded-pill border px-md py-xs text-body-sm transition-colors',
              s.id === scenarioId
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="mb-xl text-body-sm text-body">{scenario.description}</p>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_1fr]">
        {/* 左侧：请求 + 流程 */}
        <div className="space-y-lg">
          {/* 测试 URL 选择 */}
          <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              测试请求
            </div>
            <div className="space-y-sm">
              {scenario.testUrls.map((tu, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedUrlIdx(i)}
                  className={cn(
                    'block w-full rounded-sm border px-md py-sm text-left font-mono text-caption-mono-sm transition-colors',
                    i === selectedUrlIdx
                      ? 'border-accent-sunset/40 bg-accent-sunset/10 text-ink'
                      : 'border-hairline bg-canvas-card text-body-mid',
                  )}
                >
                  {tu.url}
                </button>
              ))}
            </div>
          </div>

          {/* 处理流程 */}
          <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
            <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              处理流程
            </div>
            <div className="space-y-sm">
              <div className="rounded-sm border border-hairline bg-canvas-card px-md py-sm">
                <span className="font-mono text-caption-mono-sm text-accent-sunset">① 请求到达</span>
                <div className="mt-xs font-mono text-caption-mono-sm text-body">{testUrl.url}</div>
              </div>
              <div className="rounded-sm border border-hairline bg-canvas-card px-md py-sm">
                <span className="font-mono text-caption-mono-sm text-accent-sunset">② Matcher 匹配</span>
                <div className="mt-xs font-mono text-caption-mono-sm text-body">{scenario.matcher}</div>
              </div>
              <div className="rounded-sm border border-accent-sunset/30 bg-accent-sunset/5 px-md py-sm">
                <span className="font-mono text-caption-mono-sm text-accent-sunset">③ Middleware 执行</span>
                <div className="mt-xs font-mono text-caption-mono-sm text-body">执行自定义逻辑</div>
              </div>
              <div className="rounded-sm border border-accent-dusk/30 bg-accent-dusk/5 px-md py-sm">
                <span className="font-mono text-caption-mono-sm text-accent-dusk">④ 路由结果</span>
                <div className="mt-xs font-mono text-caption-mono-sm text-ink">{testUrl.expectedOutcome}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：Middleware 代码 */}
        <div>
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            Middleware 代码
          </div>
          <CodeBlock code={scenario.code} language="javascript" />
        </div>
      </div>
    </div>
  )
}
