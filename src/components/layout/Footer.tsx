/**
 * Footer - 页脚
 *
 * 遵循 DESIGN.md 的 footer 规范：
 * - 背景 canvas，文字 body
 * - padding 3xl xl
 * - 文字 body-sm
 */
import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="container-page py-3xl">
        <div className="grid grid-cols-1 gap-2xl md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-mono text-caption-mono uppercase tracking-[1.4px] text-ink">
              FE·Journey
            </div>
            <p className="mt-md max-w-md text-body-sm text-body">
              前端开发学习之旅 — 交互式学习平台。
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="eyebrow-sm mb-md">导航</div>
            <ul className="space-y-sm text-body-sm">
              <li>
                <Link to="/" className="text-body transition-colors hover:text-ink">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/modules" className="text-body transition-colors hover:text-ink">
                  全部模块
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-body transition-colors hover:text-ink">
                  关于项目
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech */}
          <div>
            <div className="eyebrow-sm mb-md">技术栈</div>
            <ul className="space-y-sm text-body-sm text-body">
              <li>React 19 + TypeScript</li>
              <li>Vite + Tailwind CSS</li>
              <li>React Router + Framer Motion</li>
            </ul>
          </div>
        </div>

        <div className="mt-3xl flex flex-col items-start justify-between gap-sm border-t border-hairline pt-xl text-caption-mono-sm text-body-mid md:flex-row md:items-center">
          <span>© {year} Front-end Development Learning Journey</span>
          <span className="uppercase tracking-[1.2px]">Built with inspired design language</span>
        </div>
      </div>
    </footer>
  )
}
