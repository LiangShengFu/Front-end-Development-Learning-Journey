/**
 * TcpHandshakeVisualizer — TCP 三次握手与四次挥手可视化
 *
 * 展示建立连接的三次握手和断开连接的四次挥手，包含 seq/ack 序号变化。
 *
 * ⚠️ 教学模拟：展示静态握手阶段与状态变化，不执行真实 TCP 连接。
 */
import { useState } from 'react'
import type {
  TcpHandshakeVisualizerData,
  TcpPhase,
} from '../../../lib/browser-network-visualization-types'
import { cn } from '../../../lib/utils'

interface TcpHandshakeVisualizerProps {
  data?: TcpHandshakeVisualizerData
}

/** 默认三次握手阶段 */
const DEFAULT_HANDSHAKE_PHASES: TcpPhase[] = [
  {
    id: 'closed',
    name: '初始状态',
    description: '客户端与服务端都处于 CLOSED 状态。服务端被动打开，监听端口；客户端主动打开，准备发起连接。',
    clientState: 'CLOSED',
    serverState: 'LISTEN',
    color: '#7d8590',
  },
  {
    id: 'syn-sent',
    name: '第一次握手：客户端发送 SYN',
    description: '客户端发送 SYN=1, seq=x 报文，进入 SYN_SENT 状态，等待服务端确认。SYN 不携带数据但消耗一个序号。',
    clientState: 'SYN_SENT',
    serverState: 'LISTEN',
    direction: 'c2s',
    seq: 1000,
    ack: 0,
    flags: ['SYN'],
    color: '#1a6cff',
  },
  {
    id: 'syn-received',
    name: '第二次握手：服务端发送 SYN+ACK',
    description: '服务端收到 SYN，发送 SYN=1, ACK=1, seq=y, ack=x+1 报文，进入 SYN_RCVD 状态。同时确认客户端的 SYN 并发起自己的 SYN。',
    clientState: 'SYN_SENT',
    serverState: 'SYN_RCVD',
    direction: 's2c',
    seq: 2000,
    ack: 1001,
    flags: ['SYN', 'ACK'],
    color: '#07c160',
  },
  {
    id: 'established',
    name: '第三次握手：客户端发送 ACK',
    description: '客户端收到 SYN+ACK，发送 ACK=1, seq=x+1, ack=y+1 报文，进入 ESTABLISHED 状态。服务端收到后也进入 ESTABLISHED。连接建立，可双向传输数据。',
    clientState: 'ESTABLISHED',
    serverState: 'ESTABLISHED',
    direction: 'c2s',
    seq: 1001,
    ack: 2001,
    flags: ['ACK'],
    color: '#a78bfa',
  },
]

/** 默认四次挥手阶段 */
const DEFAULT_TEARDOWN_PHASES: TcpPhase[] = [
  {
    id: 'fin-wait-1',
    name: '第一次挥手：客户端发送 FIN',
    description: '客户端（主动关闭方）发送 FIN=1, seq=u，进入 FIN_WAIT_1。表示客户端没有数据要发送了，但仍可接收。',
    clientState: 'FIN_WAIT_1',
    serverState: 'ESTABLISHED',
    direction: 'c2s',
    seq: 5000,
    ack: 2001,
    flags: ['FIN', 'ACK'],
    color: '#f59e0b',
  },
  {
    id: 'fin-wait-2',
    name: '第二次挥手：服务端发送 ACK',
    description: '服务端收到 FIN，发送 ACK=1, seq=v, ack=u+1，进入 CLOSE_WAIT。客户端收到后进入 FIN_WAIT_2。此时是"半关闭"状态，服务端仍可发送数据。',
    clientState: 'FIN_WAIT_2',
    serverState: 'CLOSE_WAIT',
    direction: 's2c',
    seq: 2001,
    ack: 5001,
    flags: ['ACK'],
    color: '#ec4899',
  },
  {
    id: 'time-wait',
    name: '第三次挥手：服务端发送 FIN',
    description: '服务端数据发送完毕后，发送 FIN=1, seq=w, ack=u+1，进入 LAST_ACK。表示服务端也没有数据要发送了。',
    clientState: 'FIN_WAIT_2',
    serverState: 'LAST_ACK',
    direction: 's2c',
    seq: 3000,
    ack: 5001,
    flags: ['FIN', 'ACK'],
    color: '#06b6d4',
  },
  {
    id: 'closed-2',
    name: '第四次挥手：客户端发送 ACK + TIME_WAIT',
    description: '客户端收到 FIN，发送 ACK=1, seq=u+1, ack=w+1，进入 TIME_WAIT。等待 2*MSL（最大报文段寿命，通常 60-120s）后进入 CLOSED。服务端收到 ACK 后立即进入 CLOSED。',
    clientState: 'TIME_WAIT → CLOSED',
    serverState: 'CLOSED',
    direction: 'c2s',
    seq: 5001,
    ack: 3001,
    flags: ['ACK'],
    color: '#ef4444',
  },
]

type Tab = 'handshake' | 'teardown'

export function TcpHandshakeVisualizer({ data }: TcpHandshakeVisualizerProps) {
  const handshakePhases = data?.handshakePhases ?? DEFAULT_HANDSHAKE_PHASES
  const teardownPhases = data?.teardownPhases ?? DEFAULT_TEARDOWN_PHASES

  const [tab, setTab] = useState<Tab>('handshake')
  const [currentIdx, setCurrentIdx] = useState(0)

  const phases = tab === 'handshake' ? handshakePhases : teardownPhases
  const phase = phases[currentIdx]

  /** 切换 Tab 时重置索引 */
  const handleTabChange = (next: Tab) => {
    setTab(next)
    setCurrentIdx(0)
  }

  const directionLabel = {
    'c2s': '客户端 → 服务端',
    's2c': '服务端 → 客户端',
    'both': '双向',
  }

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示静态握手阶段与状态变化，不执行真实 TCP 连接。
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-xs">
        <button
          onClick={() => handleTabChange('handshake')}
          className={cn(
            'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-all',
            tab === 'handshake'
              ? 'bg-[#1a6cff] text-white'
              : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
          )}
        >
          三次握手（建立连接）
        </button>
        <button
          onClick={() => handleTabChange('teardown')}
          className={cn(
            'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-all',
            tab === 'teardown'
              ? 'bg-[#1a6cff] text-white'
              : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
          )}
        >
          四次挥手（断开连接）
        </button>
      </div>

      {/* 阶段导航条 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap items-center gap-xs">
          {phases.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setCurrentIdx(i)}
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm transition-all',
                i === currentIdx
                  ? 'text-white'
                  : i < currentIdx
                    ? 'bg-[#07c160]/15 text-[#07c160]'
                    : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
              )}
              style={i === currentIdx ? { background: p.color } : undefined}
              title={p.name}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-xs flex items-center justify-between font-mono text-caption-mono-sm text-body-mid">
          <span>阶段 {currentIdx + 1} / {phases.length}</span>
          <span>{tab === 'handshake' ? '建立连接' : '断开连接'}</span>
        </div>
      </div>

      {/* 客户端/服务端状态可视化 */}
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <div className="rounded-sm border border-[#1a6cff]/30 bg-[#1a6cff]/5 p-lg">
          <div className="mb-sm font-mono text-caption-mono-sm text-[#1a6cff]">客户端 Client</div>
          <div className="font-mono text-body-md text-body-hi">{phase.clientState}</div>
        </div>
        <div className="rounded-sm border border-[#07c160]/30 bg-[#07c160]/5 p-lg">
          <div className="mb-sm font-mono text-caption-mono-sm text-[#07c160]">服务端 Server</div>
          <div className="font-mono text-body-md text-body-hi">{phase.serverState}</div>
        </div>
      </div>

      {/* 当前阶段详情 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* 左：阶段说明 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-center gap-sm">
            <span className="inline-block h-3 w-3 rounded-full" style={{ background: phase.color }} />
            <h4 className="font-mono text-body-sm text-body-hi">{phase.name}</h4>
          </div>
          <p className="mb-md text-body-sm text-body-mid leading-relaxed">{phase.description}</p>
          {phase.direction && (
            <div className="flex items-start gap-sm">
              <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">方向</span>
              <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{directionLabel[phase.direction]}</span>
            </div>
          )}
        </div>

        {/* 右：报文信息 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">报文信息</h4>
          {phase.flags && phase.flags.length > 0 ? (
            <div className="space-y-sm">
              <div className="flex items-center gap-sm">
                <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">标志位</span>
                <div className="flex gap-xs">
                  {phase.flags.map((f) => (
                    <span
                      key={f}
                      className="rounded-pill px-sm py-xxs font-mono text-caption-mono-sm text-white"
                      style={{ background: phase.color }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-sm">
                <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">seq</span>
                <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{phase.seq}</span>
              </div>
              <div className="flex items-center gap-sm">
                <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">ack</span>
                <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{phase.ack}</span>
              </div>
            </div>
          ) : (
            <div className="font-mono text-caption-mono-sm text-body-mid">无报文（初始状态）</div>
          )}
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
            onClick={() => currentIdx < phases.length - 1 && setCurrentIdx((i) => i + 1)}
            disabled={currentIdx === phases.length - 1}
            className="rounded-pill bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-hi transition-all hover:bg-canvas-bg-hover disabled:opacity-40"
          >
            下一步 →
          </button>
        </div>
        <button
          onClick={() => setCurrentIdx(0)}
          className="rounded-pill bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-all hover:bg-canvas-bg-hover"
        >
          ↺ 重置
        </button>
      </div>
    </div>
  )
}
