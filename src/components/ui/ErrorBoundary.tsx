/**
 * ErrorBoundary - React 错误边界
 *
 * 捕获子组件树渲染期间的运行时错误，展示降级 UI，避免整页白屏。
 * - 局部用：包裹单个可视化组件，错误时显示占位卡片，不影响同 KP 其他内容块。
 * - 路由级用：作为 router errorElement，捕获整页未处理错误。
 */
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  /** 自定义降级 UI */
  fallback?: (error: Error, reset: () => void) => ReactNode
  /** 错误来源标签（用于占位卡片展示，便于定位） */
  label?: string
  /** 子节点；作为 router errorElement 时可不传（仅作错误边界） */
  children?: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // 控制台输出便于调试；生产环境可接入监控上报
    console.error('[ErrorBoundary]', this.props.label ?? 'unknown', error, info.componentStack)
  }

  reset = (): void => {
    this.setState({ error: null })
  }

  render(): ReactNode {
    const { error } = this.state
    if (!error) return this.props.children ?? null

    if (this.props.fallback) {
      return this.props.fallback(error, this.reset)
    }

    // 默认降级 UI
    return (
      <div className="my-xl rounded-sm border border-hairline bg-canvas-card p-xl">
        <div className="flex items-start gap-md">
          <div className="flex-1">
            <p className="font-semibold text-accent-sunset">
              该组件加载失败
              {this.props.label ? <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">({this.props.label})</span> : null}
            </p>
            <p className="mt-xs text-body-sm text-body-mid">
              该内容块渲染时出现错误，不影响其他内容。可尝试刷新页面或返回上级。
            </p>
            <details className="mt-md">
              <summary className="cursor-pointer text-body-sm text-body-mid">查看错误详情</summary>
              <pre className="mt-sm overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
                {error.message}
                {error.stack ? `\n\n${error.stack}` : ''}
              </pre>
            </details>
          </div>
          <button type="button" onClick={this.reset} className="btn-pill shrink-0">
            重试
          </button>
        </div>
      </div>
    )
  }
}
