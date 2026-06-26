/**
 * Layout - 应用主布局
 *
 * 包含 ShapeGrid 全局背景、NavBar、主内容区、Footer。
 * 主内容区使用 Outlet 渲染子路由。
 *
 * 背景层说明：
 * - ShapeGrid 渲染为 fixed 定位的 Canvas，置于 z-index 最底层
 * - 覆盖一层半透明径向渐变，避免背景影响前景内容可读性
 * - 前景内容置于 relative z-10，确保交互不受背景影响
 */
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import ShapeGrid from '../background/ShapeGrid'

export function Layout() {
  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      {/* 全局形状网格背景层 */}
      <div
        className="pointer-events-auto fixed inset-0 z-0"
        aria-hidden="true"
      >
        <ShapeGrid
          direction="diagonal"
          speed={0.1}
          squareSize={50}
          shape="square"
          hoverTrailAmount={15}
          borderColor="#212327"
          hoverFillColor="#ff7a17"
        />
      </div>

      {/* 内容层：确保在背景之上，可读性良好 */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
      </div>
    </div>
  )
}
