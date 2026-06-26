/**
 * Sandbox - 代码沙盒
 *
 * 可编辑并运行代码的沙盒环境。
 * - JS：使用 iframe 沙箱执行，捕获 console 输出
 * - HTML：iframe 实时渲染页面（可见预览）
 * - CSS：iframe 应用样式到示例 HTML，实时预览效果
 *
 * 实现要点（修复运行不成功问题）：
 * 1. 使用 iframe `srcDoc` + ref 直接操作，绕过 React 对 srcDoc 的更新检测
 * 2. JS 模式：用 runCount 作为 key，每次点击运行强制重新挂载 iframe，确保脚本执行
 * 3. CSS/HTML 模式：用 iframeDoc 作为 key，srcDoc 变化时重新挂载 iframe，确保预览刷新
 * 4. 首次挂载立即设置 srcDoc，避免初始空白
 * 5. postMessage 捕获 console 输出（JS 模式）
 *
 * 遵循设计规范：canvas-mid 代码区，hairline 边框。
 */
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import type { SandboxData } from '../../lib/types'
import { cn } from '../../lib/utils'

interface SandboxProps {
  data: SandboxData
}

interface LogEntry {
  type: 'log' | 'error' | 'warn' | 'info'
  args: string[]
}

/** CSS 模式下用于演示样式效果的示例 HTML */
const CSS_DEMO_HTML = `<div class="demo-box">
  <h1>标题示例</h1>
  <p>这是一个段落，用于演示 CSS 样式效果。</p>
  <button class="btn">按钮</button>
  <ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </ul>
  <div class="card">
    <h2>卡片标题</h2>
    <p>卡片内容区域，可被样式控制。</p>
  </div>
</div>`

/** 注入到 iframe 的基础样式，确保预览区域有合理默认外观 */
const BASE_PREVIEW_STYLE = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #1a1a1a;
    background: #ffffff;
    line-height: 1.6;
  }
  .demo-box { max-width: 480px; }
  .btn {
    display: inline-block;
    padding: 6px 16px;
    background: #1ed760;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  .btn:hover { background: #1db954; }
  .card {
    margin-top: 16px;
    padding: 16px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
  }
`

/** JS 模式下注入的 console 捕获脚本 */
const JS_CONSOLE_HOOK = `<script>
  (function() {
    var methods = ['log', 'error', 'warn', 'info'];
    methods.forEach(function(method) {
      var orig = console[method];
      console[method] = function() {
        var args = Array.prototype.slice.call(arguments).map(function(a) {
          try {
            if (a === null) return 'null';
            if (a === undefined) return 'undefined';
            if (typeof a === 'object') return JSON.stringify(a);
            return String(a);
          } catch(e) { return String(a); }
        });
        window.parent.postMessage({ __sandbox: true, log: { type: method, args: args } }, '*');
        orig.apply(console, arguments);
      };
    });
    window.addEventListener('error', function(e) {
      window.parent.postMessage({ __sandbox: true, log: { type: 'error', args: [e.message + (e.lineno ? ' (line ' + e.lineno + ')') : ''] } }, '*');
    });
    window.addEventListener('unhandledrejection', function(e) {
      window.parent.postMessage({ __sandbox: true, log: { type: 'error', args: ['Unhandled Promise Rejection: ' + (e.reason && e.reason.message ? e.reason.message : String(e.reason))] } }, '*');
    });
  })();
<\/script>`

export function Sandbox({ data }: SandboxProps) {
  const [code, setCode] = useState(data.initialCode)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [hasRun, setHasRun] = useState(false)
  const [autoRun, setAutoRun] = useState(true)
  /** iframe 实际使用的 srcDoc 内容 */
  const [iframeDoc, setIframeDoc] = useState<string>('')
  /** 运行计数器，作为 iframe 的 key 强制重新挂载 */
  const [runCount, setRunCount] = useState(0)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const language = data.language ?? 'js'
  const isPreviewMode = language === 'html' || language === 'css'

  /** 实时断言检查：对当前代码运行 checks，返回通过/未通过状态 + 教学提示。
   *  这构成「动态反馈闭环」——学习者改代码即时看到哪里没达标、该怎么修。 */
  const checkResults = useMemo(() => {
    if (!data.checks || data.checks.length === 0) return null
    return data.checks.map((check) => {
      let passed = false
      try {
        const re = new RegExp(check.pattern, check.flags ?? 'i')
        passed = re.test(code)
      } catch {
        passed = false
      }
      return { description: check.description, hint: check.hint, passed }
    })
  }, [code, data.checks])

  const passedCount = checkResults ? checkResults.filter((r) => r.passed).length : 0
  const allPassed = checkResults ? passedCount === checkResults.length : false

  /** 构建 iframe 文档内容 */
  const buildIframeDoc = useCallback(
    (userCode: string): string => {
      if (language === 'html') {
        const trimmed = userCode.trim()
        if (!trimmed) {
          return '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'
        }
        if (/<html[\s>]/i.test(trimmed) || /<!DOCTYPE/i.test(trimmed)) {
          return userCode
        }
        return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>${BASE_PREVIEW_STYLE}</style></head>
<body>
${userCode}
</body>
</html>`
      }
      if (language === 'css') {
        return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>${BASE_PREVIEW_STYLE}</style>
<style>${userCode}</style>
</head>
<body>${CSS_DEMO_HTML}</body>
</html>`
      }
      // JS 模式：捕获 console 并执行
      return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
${JS_CONSOLE_HOOK}
<script>
  try {
${userCode}
  } catch (e) {
    window.parent.postMessage({ __sandbox: true, log: { type: 'error', args: [e.message] } }, '*');
  }
<\/script>
</body>
</html>`
    },
    [language],
  )

  /** 执行代码：递增 runCount 强制 iframe 重新挂载 */
  const runCode = useCallback(() => {
    setLogs([])
    setHasRun(true)
    setIframeDoc(buildIframeDoc(code))
    setRunCount((c) => c + 1)
  }, [code, buildIframeDoc])

  /** 重置代码 */
  const resetCode = useCallback(() => {
    setCode(data.initialCode)
    setLogs([])
    setHasRun(false)
    setIframeDoc(buildIframeDoc(data.initialCode))
    setRunCount((c) => c + 1)
  }, [data.initialCode, buildIframeDoc])

  // 监听 iframe 内的 console 消息（JS 模式）
  useEffect(() => {
    if (isPreviewMode) return
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.__sandbox === true && e.data.log) {
        setLogs((prev) => [...prev, e.data.log])
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isPreviewMode])

  // 自动运行：代码变化时防抖执行（仅预览模式默认开启）
  useEffect(() => {
    if (!autoRun || !isPreviewMode) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setIframeDoc(buildIframeDoc(code))
      setRunCount((c) => c + 1)
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [code, autoRun, isPreviewMode, buildIframeDoc])

  // 首次挂载 + data.initialCode 变化时重置
  useEffect(() => {
    setCode(data.initialCode)
    setIframeDoc(buildIframeDoc(data.initialCode))
    setLogs([])
    setHasRun(false)
    setRunCount((c) => c + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.initialCode, language])

  return (
    <div className="space-y-lg">
      {data.hint && (
        <div className="rounded-sm border border-hairline bg-canvas-soft px-lg py-sm text-body-sm text-body-mid">
          {data.hint}
        </div>
      )}

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        {/* Editor */}
        <div className="overflow-hidden rounded-sm border border-hairline bg-canvas-mid">
          <div className="flex items-center justify-between border-b border-hairline px-lg py-sm">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              {language} · 编辑器
            </span>
            <div className="flex items-center gap-md">
              {isPreviewMode && (
                <label className="flex cursor-pointer items-center gap-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                  <input
                    type="checkbox"
                    checked={autoRun}
                    onChange={(e) => setAutoRun(e.target.checked)}
                    className="h-3 w-3 cursor-pointer accent-accent-breeze"
                  />
                  自动运行
                </label>
              )}
              <button
                type="button"
                onClick={resetCode}
                className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid transition-colors hover:text-ink"
              >
                重置
              </button>
              <button
                type="button"
                onClick={runCode}
                className="rounded-pill border border-accent-sunset/40 px-md py-xxs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset transition-colors hover:bg-accent-sunset/10"
              >
                运行 ▶
              </button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="h-[320px] w-full resize-none bg-transparent p-lg font-mono text-[13px] leading-[20px] text-body outline-none"
          />
        </div>

        {/* Output / Preview */}
        <div className="overflow-hidden rounded-sm border border-hairline bg-canvas-mid">
          <div className="border-b border-hairline px-lg py-sm">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              {isPreviewMode ? '预览' : '输出'}
            </span>
          </div>
          {isPreviewMode ? (
            // 预览模式：可见 iframe 实时渲染 HTML/CSS
            // key={runCount} 确保每次更新都重新挂载 iframe，可靠加载新 srcDoc
            <iframe
              key={`preview-${runCount}`}
              title="sandbox-preview"
              srcDoc={iframeDoc}
              sandbox="allow-scripts allow-modals"
              className="h-[320px] w-full bg-white"
            />
          ) : (
            <div className="flex h-[320px] flex-col">
              {/* JS 模式：隐藏 iframe 执行代码，key 强制每次运行重新挂载 */}
              {hasRun && (
                <iframe
                  key={`exec-${runCount}`}
                  title="sandbox-exec"
                  srcDoc={iframeDoc}
                  sandbox="allow-scripts"
                  className="hidden"
                  aria-hidden
                />
              )}
              <div className="flex-1 overflow-y-auto p-lg">
                {logs.length === 0 ? (
                  <div className="font-mono text-caption-mono-sm text-body-mid">
                    {hasRun ? '（无输出）' : '点击"运行"查看输出结果...'}
                  </div>
                ) : (
                  <div className="space-y-xs">
                    {logs.map((log, i) => (
                      <div
                        key={i}
                        className={cn(
                          'flex gap-md font-mono text-[13px] leading-[20px]',
                          log.type === 'error' && 'text-red-400',
                          log.type === 'warn' && 'text-accent-sunset-soft',
                          log.type === 'info' && 'text-accent-breeze',
                          log.type === 'log' && 'text-body',
                        )}
                      >
                        <span className="select-none text-body-mid/50">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="whitespace-pre-wrap break-all">{log.args.join(' ')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 断言检查面板：实时校验代码并给出教学反馈（动态反馈闭环） */}
      {checkResults && (
        <div className="overflow-hidden rounded-sm border border-hairline bg-canvas-soft">
          <div className="flex items-center justify-between border-b border-hairline px-lg py-sm">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              任务检查清单
            </span>
            <span
              className={cn(
                'font-mono text-caption-mono-sm uppercase tracking-[1.2px]',
                allPassed ? 'text-green-400' : 'text-body-mid',
              )}
            >
              {passedCount} / {checkResults.length} 通过
            </span>
          </div>
          <ul className="divide-y divide-hairline">
            {checkResults.map((r, i) => (
              <li key={i} className="flex gap-md px-lg py-sm">
                <span
                  className={cn(
                    'mt-[2px] select-none font-mono text-caption-mono-sm',
                    r.passed ? 'text-green-400' : 'text-body-mid/50',
                  )}
                  aria-hidden
                >
                  {r.passed ? '✓' : '○'}
                </span>
                <div className="flex-1">
                  <div
                    className={cn(
                      'text-body-sm',
                      r.passed ? 'text-ink' : 'text-body',
                    )}
                  >
                    {r.description}
                  </div>
                  {!r.passed && (
                    <div className="mt-xs text-caption-mono-sm text-body-mid">
                      <span className="text-accent-sunset-soft">提示：</span>
                      {r.hint}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {allPassed && (
            <div className="border-t border-hairline bg-green-500/5 px-lg py-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-green-400">
              全部通过 — 任务完成 🎉
            </div>
          )}
        </div>
      )}
    </div>
  )
}
