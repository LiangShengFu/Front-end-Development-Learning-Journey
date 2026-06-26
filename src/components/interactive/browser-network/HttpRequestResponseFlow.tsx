/**
 * HttpRequestResponseFlow — HTTP 请求响应流可视化
 *
 * 展示从输入 URL 到收到响应的完整流程：
 * DNS 解析 → TCP 三次握手 → TLS 握手（HTTPS） → 发送请求 → 接收响应
 *
 * ⚠️ 教学模拟：展示静态阶段与报文示例，不执行真实网络请求。
 */
import { useState } from 'react'
import type {
  HttpRequestResponseFlowData,
  HttpRequestStage,
} from '../../../lib/browser-network-visualization-types'
import { cn } from '../../../lib/utils'

interface HttpRequestResponseFlowProps {
  data?: HttpRequestResponseFlowData
}

/** 默认 HTTP 请求响应阶段数据 */
const DEFAULT_STAGES: HttpRequestStage[] = [
  {
    id: 'dns',
    name: 'DNS 解析',
    description: '浏览器将域名解析为 IP 地址。查询顺序：浏览器 DNS 缓存 → 操作系统缓存 → hosts 文件 → 本地 DNS 服务器 → 递归查询根/顶级/权威服务器。',
    direction: 'bidirectional',
    durationMs: 20,
    color: '#1a6cff',
    payload: `浏览器：www.example.com 的 IP 是？
本地 DNS：缓存未命中，递归查询...
根服务器 → .com 顶级服务器 → 权威服务器
DNS：www.example.com → 93.184.216.34 (TTL: 3600s)`,
  },
  {
    id: 'tcp',
    name: 'TCP 三次握手',
    description: '建立 TCP 连接。客户端与服务端通过 SYN/ACK 三次交互建立可靠连接，协商初始 seq 序号。',
    direction: 'bidirectional',
    durationMs: 30,
    color: '#07c160',
    payload: `客户端 → SYN seq=x → 服务端
客户端 ← SYN seq=y, ACK ack=x+1 ← 服务端
客户端 → ACK ack=y+1 → 服务端
连接建立（ESTABLISHED）`,
  },
  {
    id: 'tls',
    name: 'TLS 握手（HTTPS）',
    description: 'HTTPS 在 TCP 之上进行 TLS 握手：ClientHello → ServerHello + 证书 → 密钥交换 → Finished。完成后使用对称加密通信。',
    direction: 'bidirectional',
    durationMs: 60,
    color: '#a78bfa',
    payload: `客户端 → ClientHello（支持的加密套件、随机数）→ 服务端
客户端 ← ServerHello + 证书 + 公钥 ← 服务端
客户端 → 用公钥加密 PreMasterSecret → 服务端
双方计算会话密钥 → Finished
后续使用 AES-GCM 对称加密`,
  },
  {
    id: 'request',
    name: '发送 HTTP 请求',
    description: '浏览器构造 HTTP 请求报文：请求行（方法/URL/版本）+ 请求头 + 空行 + 请求体。通过已建立的连接发送给服务端。',
    direction: 'request',
    durationMs: 5,
    color: '#f59e0b',
    payload: `GET /api/users HTTP/2
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: application/json
Cookie: session=abc123

(请求体为空，GET 方法通常无 body)`,
  },
  {
    id: 'response',
    name: '接收 HTTP 响应',
    description: '服务端处理请求后返回响应：状态行（版本/状态码/原因短语）+ 响应头 + 空行 + 响应体。浏览器根据 Content-Type 解析响应。',
    direction: 'response',
    durationMs: 80,
    color: '#ec4899',
    payload: `HTTP/2 200 OK
Content-Type: application/json
Content-Length: 42
Cache-Control: max-age=3600
ETag: "abc123"

{"id":1,"name":"Alice","email":"a@x.com"}`,
  },
]

export function HttpRequestResponseFlow({ data }: HttpRequestResponseFlowProps) {
  const stages = data?.stages ?? DEFAULT_STAGES
  const urlExample = data?.urlExample ?? 'https://www.example.com/api/users'
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const stage = stages[currentIdx]
  const totalDuration = stages.reduce((sum, s) => sum + s.durationMs, 0)
  const accumulatedDuration = stages.slice(0, currentIdx + 1).reduce((sum, s) => sum + s.durationMs, 0)

  /** 自动播放 */
  const handleAutoRun = () => {
    if (isRunning) return
    setIsRunning(true)
    let idx = currentIdx
    const tick = () => {
      if (idx >= stages.length - 1) {
        setIsRunning(false)
        return
      }
      idx += 1
      setCurrentIdx(idx)
      setTimeout(tick, 1200)
    }
    setTimeout(tick, 1200)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentIdx(0)
  }

  const directionLabel = {
    'request': '→ 客户端 → 服务端',
    'response': '← 服务端 → 客户端',
    'bidirectional': '↔ 双向交互',
  }

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示静态阶段与报文示例，不执行真实网络请求。
      </div>

      {/* URL 示例 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap items-center gap-sm">
          <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">请求 URL</span>
          <code className="min-w-0 flex-1 truncate font-mono text-caption-mono-sm text-body-hi">{urlExample}</code>
        </div>
      </div>

      {/* 阶段导航条 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap items-center gap-xs">
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentIdx(i)}
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm transition-all',
                i === currentIdx
                  ? 'text-white'
                  : i < currentIdx
                    ? 'bg-[#07c160]/15 text-[#07c160]'
                    : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
              )}
              style={i === currentIdx ? { background: s.color } : undefined}
              title={s.name}
            >
              {i + 1}. {s.name}
            </button>
          ))}
        </div>
        {/* 进度条 */}
        <div className="mt-md h-1 w-full overflow-hidden rounded-pill bg-canvas-bg-inset">
          <div
            className="h-full rounded-pill transition-all duration-500"
            style={{
              width: `${(accumulatedDuration / totalDuration) * 100}%`,
              background: stage.color,
            }}
          />
        </div>
        <div className="mt-xs flex items-center justify-between font-mono text-caption-mono-sm text-body-mid">
          <span>累计耗时：{accumulatedDuration}ms / {totalDuration}ms</span>
          <span>阶段 {currentIdx + 1} / {stages.length}</span>
        </div>
      </div>

      {/* 当前阶段详情 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* 左：阶段说明 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-center gap-sm">
            <span className="inline-block h-3 w-3 rounded-full" style={{ background: stage.color }} />
            <h4 className="font-mono text-body-sm text-body-hi">{stage.name}</h4>
          </div>
          <p className="mb-md text-body-sm text-body-mid leading-relaxed">{stage.description}</p>
          <div className="space-y-sm">
            <div className="flex items-start gap-sm">
              <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">方向</span>
              <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{directionLabel[stage.direction]}</span>
            </div>
            <div className="flex items-start gap-sm">
              <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">耗时</span>
              <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{stage.durationMs}ms</span>
            </div>
          </div>
        </div>

        {/* 右：报文示例 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">报文/交互示例</h4>
          <pre className="min-w-0 overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
            <code>{stage.payload}</code>
          </pre>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex flex-wrap items-center justify-between gap-sm rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap gap-xs">
          <button
            onClick={() => currentIdx > 0 && setCurrentIdx((i) => i - 1)}
            disabled={currentIdx === 0}
            className="rounded-pill bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-hi transition-all hover:bg-canvas-bg-hover disabled:opacity-40"
          >
            ← 上一步
          </button>
          <button
            onClick={() => currentIdx < stages.length - 1 && setCurrentIdx((i) => i + 1)}
            disabled={currentIdx === stages.length - 1}
            className="rounded-pill bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-hi transition-all hover:bg-canvas-bg-hover disabled:opacity-40"
          >
            下一步 →
          </button>
        </div>
        <div className="flex gap-xs">
          <button
            onClick={handleAutoRun}
            disabled={isRunning}
            className="rounded-pill bg-[#07c160] px-md py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-[#06a050] disabled:opacity-40"
          >
            {isRunning ? '▶ 自动播放中...' : '▶ 自动播放'}
          </button>
          <button
            onClick={handleReset}
            className="rounded-pill bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-all hover:bg-canvas-bg-hover"
          >
            ↺ 重置
          </button>
        </div>
      </div>
    </div>
  )
}
