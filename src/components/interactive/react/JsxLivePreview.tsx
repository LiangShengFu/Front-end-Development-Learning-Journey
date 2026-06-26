/**
 * JsxLivePreview — JSX 实时预览
 *
 * 输入 JSX 代码，实时转换为 React.createElement 调用展示编译结果。
 * 教学型预览器，演示 JSX 到 JavaScript 的转换过程。
 *
 * 对应docx中演示 #4
 */
import { useState, useMemo } from 'react'
import type { JsxLivePreviewData } from '../../../lib/react-visualization-types'
import { cn } from '../../../lib/utils'

interface JsxLivePreviewProps {
  data?: JsxLivePreviewData
}

/** 教学型 JSX → createElement 转换器 */
function jsxToCreateElement(code: string): string {
  let result = code
  // 转换自闭合标签 <Comp prop={val} />
  result = result.replace(
    /<(\w+)\s+([^>]*?)\s*\/>/g,
    (_, tag, attrs) => {
      const props = parseJsxAttrs(attrs)
      return `React.createElement("${tag}"${props ? ', ' + props : ''})`
    },
  )
  // 转换有子元素的标签
  result = result.replace(
    /<(\w+)\s+([^>]*)>\s*(.+?)\s*<\/\1>/gs,
    (_, tag, attrs, children) => {
      const props = parseJsxAttrs(attrs)
      const childStr = children.trim()
      if (childStr.startsWith('{') && childStr.endsWith('}')) {
        return `React.createElement("${tag}"${props ? ', ' + props : ''}, ${childStr.slice(1, -1)})`
      }
      return `React.createElement("${tag}"${props ? ', ' + props : ''}, "${childStr}")`
    },
  )
  return result
}

function parseJsxAttrs(attrs: string): string {
  if (!attrs.trim()) return ''
  const pairs = attrs.match(/(\w+)=\{([^}]+)\}/g) || []
  return pairs.map((p) => p.replace('=', ': ')).join(', ')
}

const DEFAULT_SNIPPETS = [
  {
    label: '按钮',
    code: `<button className="btn" onClick={handleClick}>
  点击我
</button>`,
    description: 'JSX 元素 + 事件处理',
  },
  {
    label: '列表渲染',
    code: `<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>`,
    description: 'JSX 中嵌入 JS 表达式',
  },
  {
    label: '条件渲染',
    code: `<div>
  {isLoggedIn ? <UserMenu /> : <LoginButton />}
</div>`,
    description: '三元表达式条件渲染',
  },
  {
    label: 'Fragment',
    code: `<>
  <Header />
  <Main />
  <Footer />
</>`,
    description: 'Fragment 简写语法',
  },
]

export function JsxLivePreview({ data }: JsxLivePreviewProps) {
  const snippets = data?.presets ?? DEFAULT_SNIPPETS
  const [code, setCode] = useState(data?.defaultCode ?? snippets[0].code)
  const [activeSnippet, setActiveSnippet] = useState(0)

  const compiled = useMemo(() => {
    try {
      return jsxToCreateElement(code)
    } catch {
      return '// 编译错误：请检查 JSX 语法'
    }
  }, [code])

  return (
    <div className="space-y-lg">
      {/* Snippets */}
      <div className="flex flex-wrap gap-sm">
        {snippets.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setActiveSnippet(i); setCode(s.code) }}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-colors',
              activeSnippet === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Code + Compiled */}
      <div className="grid gap-lg lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col gap-sm">
          <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            JSX 代码
          </span>
          <textarea
            value={code}
            onChange={(e) => { setCode(e.target.value); setActiveSnippet(-1) }}
            className="min-h-[140px] w-full resize-y rounded-sm border border-hairline bg-canvas-soft p-lg font-mono text-body-sm text-ink outline-none transition-colors focus:border-accent-sunset/50"
            spellCheck={false}
          />
        </div>

        {/* Compiled output */}
        <div className="flex flex-col gap-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              编译结果
            </span>
            <span className="font-mono text-caption-mono-sm text-accent-sunset">
              React.createElement
            </span>
          </div>
          <pre className="min-h-[140px] overflow-auto rounded-sm border border-hairline bg-canvas-soft p-lg font-mono text-body-sm text-accent-sunset leading-relaxed">
            {compiled}
          </pre>
        </div>
      </div>

      {/* Note */}
      <div className="rounded-sm border border-accent-dusk/30 bg-accent-dusk/5 p-md">
        <p className="text-body-sm text-body-mid">
          💡 JSX 是 React.createElement 的语法糖。编译工具（Babel/TypeScript）在构建时将 JSX
          转换为 createElement 调用。这是教学型预览器，真实编译由 Babel/tsc 处理。
        </p>
      </div>
    </div>
  )
}
