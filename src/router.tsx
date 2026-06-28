/**
 * 路由配置
 *
 * 使用 createBrowserRouter 配置路由，Layout 作为根布局。
 * 模块详情页通过 slug 参数动态匹配。
 * 根路由 errorElement 捕获整页未处理错误，避免白屏。
 *
 * 代码分割：页面组件使用 React.lazy 按需加载，减小首屏 bundle。
 */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ErrorBoundary } from './components/ui/ErrorBoundary'

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const ModulesPage = lazy(() => import('./pages/ModulesPage').then(m => ({ default: m.ModulesPage })))
const ModuleDetailPage = lazy(() =>
  import('./pages/ModuleDetailPage').then(m => ({ default: m.ModuleDetailPage })),
)
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))
const ProgressPage = lazy(() => import('./pages/ProgressPage').then(m => ({ default: m.ProgressPage })))

const pageFallback = (
  <div className="flex min-h-[50vh] items-center justify-center text-body-sm text-body-mid">
    页面加载中…
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <ErrorBoundary
        label="路由级"
        fallback={(error, reset) => (
          <div className="min-h-screen flex items-center justify-center p-xl">
            <div className="max-w-lg rounded-sm border border-hairline bg-canvas-card p-xl">
              <p className="font-semibold text-accent-sunset">页面加载失败</p>
              <p className="mt-xs text-body-sm text-body-mid">
                页面渲染时出现错误，可尝试刷新或返回首页。
              </p>
              <details className="mt-md">
                <summary className="cursor-pointer text-body-sm text-body-mid">查看错误详情</summary>
                <pre className="mt-sm overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
                  {error.message}
                </pre>
              </details>
              <div className="mt-md flex gap-sm">
                <button type="button" onClick={reset} className="btn-pill">重试</button>
                <a href="/" className="btn-pill-secondary">返回首页</a>
              </div>
            </div>
          </div>
        )}
      />
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={pageFallback}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'modules',
        element: (
          <Suspense fallback={pageFallback}>
            <ModulesPage />
          </Suspense>
        ),
      },
      {
        path: 'modules/:slug',
        element: (
          <Suspense fallback={pageFallback}>
            <ModuleDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={pageFallback}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'progress',
        element: (
          <Suspense fallback={pageFallback}>
            <ProgressPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={pageFallback}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])
