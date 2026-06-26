/**
 * 404 页面
 */
import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/layout/Eyebrow'

export function NotFoundPage() {
  return (
    <div className="container-page py-4xl">
      <Eyebrow className="mb-md">404 / Not Found</Eyebrow>
      <h1 className="text-display-md tracking-display text-ink">页面未找到</h1>
      <p className="mt-md text-body-md text-body">
        你访问的页面不存在。可能链接已失效或输入有误。
      </p>
      <div className="mt-xl flex gap-sm">
        <Link to="/" className="btn-primary">
          返回首页
        </Link>
        <Link to="/modules" className="btn-pill">
          浏览模块
        </Link>
      </div>
    </div>
  )
}
