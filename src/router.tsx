/**
 * 路由配置
 *
 * 使用 createBrowserRouter 配置路由，Layout 作为根布局。
 * 模块详情页通过 slug 参数动态匹配。
 */
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { ModulesPage } from './pages/ModulesPage'
import { ModuleDetailPage } from './pages/ModuleDetailPage'
import { AboutPage } from './pages/AboutPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'modules', element: <ModulesPage /> },
      { path: 'modules/:slug', element: <ModuleDetailPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
