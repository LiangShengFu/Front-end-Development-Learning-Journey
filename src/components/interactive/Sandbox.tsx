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
import { useEffect, useLayoutEffect, useRef, useState, useCallback, useMemo } from 'react'
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
    // 安全的对象序列化：处理循环引用、函数、Symbol、DOM 节点等
    function safeStringify(obj, depth) {
      depth = depth || 0;
      if (depth > 3) return '[深度限制]';
      if (obj === null) return 'null';
      if (obj === undefined) return 'undefined';
      var type = typeof obj;
      if (type === 'function') {
        var fnStr = String(obj);
        return fnStr.length > 80 ? fnStr.slice(0, 80) + '...' : fnStr;
      }
      if (type === 'symbol') return obj.toString();
      if (type === 'bigint') return obj.toString() + 'n';
      if (type === 'string') return obj;
      if (type === 'number' || type === 'boolean') return String(obj);
      if (obj instanceof Error) return obj.name + ': ' + obj.message;
      if (obj instanceof RegExp) return obj.toString();
      if (obj instanceof Date) return obj.toISOString();
      if (obj instanceof Element || obj instanceof HTMLElement) {
        var tag = '<' + obj.tagName.toLowerCase();
        if (obj.id) tag += ' #' + obj.id;
        if (obj.className && typeof obj.className === 'string') tag += '.' + obj.className.split(/\\s+/).filter(Boolean).join('.');
        tag += '>';
        return tag;
      }
      if (type === 'object') {
        if (obj instanceof Array || Object.prototype.toString.call(obj) === '[object Array]') {
          if (obj.length > 100) return '[Array(' + obj.length + ')]';
          var arr = [];
          for (var i = 0; i < obj.length; i++) {
            try { arr.push(safeStringify(obj[i], depth + 1)); }
            catch(e) { arr.push('[不可访问]'); }
          }
          return '[' + arr.join(', ') + ']';
        }
        if (obj instanceof Map) return 'Map(' + obj.size + ')';
        if (obj instanceof Set) return 'Set(' + obj.size + ')';
        if (obj instanceof WeakMap) return 'WeakMap {}';
        if (obj instanceof WeakSet) return 'WeakSet {}';
        if (obj instanceof Promise) return 'Promise';
        // 普通对象：尝试 JSON.stringify，失败则手动序列化（避免循环引用崩溃）
        try {
          var json = JSON.stringify(obj, function(key, val) {
            if (typeof val === 'function') return '[Function]';
            if (typeof val === 'symbol') return val.toString();
            if (val === undefined) return 'undefined';
            return val;
          }, 0);
          if (json && json.length > 500) return json.slice(0, 500) + '...';
          return json;
        } catch(e) {
          // 循环引用兜底：手动遍历对象键
          var pairs = [];
          var keys = [];
          try { keys = Object.keys(obj); } catch(e2) { return '[不可枚举对象]'; }
          for (var k = 0; k < keys.length && k < 20; k++) {
            try {
              var v = obj[keys[k]];
              var vs = typeof v === 'object' && v !== null ? '[Object]' : safeStringify(v, depth + 1);
              pairs.push(keys[k] + ': ' + vs);
            } catch(e3) { pairs.push(keys[k] + ': [不可访问]'); }
          }
          return '{' + pairs.join(', ') + (keys.length > 20 ? ', ...' : '') + '}';
        }
      }
      try { return String(obj); } catch(e) { return '[不可序列化]'; }
    }
    var methods = ['log', 'error', 'warn', 'info'];
    methods.forEach(function(method) {
      var orig = console[method];
      console[method] = function() {
        var args = Array.prototype.slice.call(arguments).map(function(a) {
          try { return safeStringify(a); }
          catch(e) { return '[序列化失败]'; }
        });
        try {
          window.parent.postMessage({ __sandbox: true, log: { type: method, args: args } }, '__SANDBOX_TARGET_ORIGIN__');
        } catch(postErr) {
          // postMessage 失败时降级到原始 console（至少能看到输出）
        }
        try { orig.apply(console, arguments); } catch(e) {}
      };
    });
    window.addEventListener('error', function(e) {
      var msg = e.message || 'Script error';
      var detail = msg;
      if (e.filename) detail += ' (' + e.filename;
      if (e.lineno) detail += (e.filename ? ':' : ' (') + e.lineno + (e.colno ? ':' + e.colno : '');
      if (e.filename || e.lineno) detail += ')';
      // 跨源脚本错误（sandbox 限制）只暴露 "Script error."
      if (msg === 'Script error.' && !e.filename) {
        detail = 'Script error.（跨源限制：sandbox 模式下无法获取详细错误信息，请检查代码是否有语法错误或运行时异常）';
      }
      window.parent.postMessage({ __sandbox: true, log: { type: 'error', args: [detail] } }, '__SANDBOX_TARGET_ORIGIN__');
    });
    window.addEventListener('unhandledrejection', function(e) {
      var reason = e.reason;
      var msg = reason && reason.message ? reason.message : String(reason);
      window.parent.postMessage({ __sandbox: true, log: { type: 'error', args: ['Unhandled Promise Rejection: ' + msg] } }, '__SANDBOX_TARGET_ORIGIN__');
    });
  })();
</script>`

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
  /** JS 模式下执行代码的 iframe 引用，用于 message 事件来源校验（M-01） */
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const language = data.language ?? 'js'
  const isPreviewMode = language === 'html' || language === 'css'

  /** 实时断言检查：对当前代码运行 checks，返回通过/未通过状态 + 教学提示。
   *  这构成「动态反馈闭环」——学习者改代码即时看到哪里没达标、该怎么修。 */
  const checkResults = useMemo(() => {
    if (!data.checks || data.checks.length === 0) return null
    return data.checks.map((check) => {
      let passed: boolean
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
      // 安全加固 L-02：postMessage targetOrigin 使用父页面真实 origin，防止页面被恶意嵌入时日志泄露
      // file:// 协议下 window.location.origin 是字符串 "null"，JSON.stringify 后为 "null"，postMessage 能匹配
      // 非 file:// 时使用真实 origin；跨源场景回退到 '*'
      const origin = window.location.origin
      const targetOrigin = origin && origin !== 'null' ? JSON.stringify(origin) : "'*'"
      const consoleHook = JS_CONSOLE_HOOK.replace(/'__SANDBOX_TARGET_ORIGIN__'/g, targetOrigin)
      // 转义用户代码中的 </script 序列，防止提前关闭 script 标签导致脚本不执行
      // 替换为 <\/script：在 HTML 解析器看来不是标签关闭符，在 JS 字符串中 \/ 等价于 /，语义不变
      const escapedUserCode = userCode.replace(/<\/script/gi, '<\\/script')
      return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
${consoleHook}
<script>
  try {
${escapedUserCode}
  } catch (e) {
    window.parent.postMessage({ __sandbox: true, log: { type: 'error', args: [String(e && e.message ? e.message : e)] } }, ${targetOrigin});
  }
</script>
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
  // 使用 useLayoutEffect 确保监听器在浏览器绘制前注册，避免 iframe 首次 postMessage 时监听器未就绪的竞态
  useLayoutEffect(() => {
    if (isPreviewMode) return
    const handleMessage = (e: MessageEvent) => {
      // 安全加固 M-01：校验消息来源，拒绝跨源消息注入伪造日志
      // 注意：sandbox="allow-scripts" 的 iframe 是跨源的，但仍可比较 contentWindow 引用
      // iframeRef.current 为 null 时拒绝所有消息（iframe 未挂载）
      const cw = iframeRef.current?.contentWindow
      if (!cw || e.source !== cw) return
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
              {/* JS 模式：隐藏 iframe 执行代码，key 强制每次运行重新挂载
                  使用视觉隐藏（absolute + 屏幕外）而非 display:none，
                  确保 iframe 在所有浏览器中可靠加载 srcDoc 并执行脚本 */}
              {hasRun && (
                <iframe
                  key={`exec-${runCount}`}
                  ref={iframeRef}
                  title="sandbox-exec"
                  srcDoc={iframeDoc}
                  sandbox="allow-scripts"
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    left: '-9999px',
                    top: '0',
                    border: '0',
                    overflow: 'hidden',
                  }}
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
