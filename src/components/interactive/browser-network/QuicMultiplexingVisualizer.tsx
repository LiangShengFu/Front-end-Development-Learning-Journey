/**
 * QuicMultiplexingVisualizer — HTTP/3 QUIC 多路复用可视化
 *
 * 展示 HTTP/3 基于 QUIC 的多流并行传输、无队头阻塞、0-RTT 等特性。
 *
 * ⚠️ 教学模拟：展示静态流与数据包，不执行真实 QUIC 传输。
 */
import { useState } from 'react'
import type {
  QuicMultiplexingVisualizerData,
  QuicStream,
} from '../../../lib/browser-network-visualization-types'
import { cn } from '../../../lib/utils'

interface QuicMultiplexingVisualizerProps {
  data?: QuicMultiplexingVisualizerData
}

/** 默认 QUIC 流数据 */
const DEFAULT_STREAMS: QuicStream[] = [
  {
    id: 0,
    label: 'Stream 0: HTML',
    packets: [
      { seq: 1, status: 'ack', size: 1200 },
      { seq: 2, status: 'ack', size: 1200 },
      { seq: 3, status: 'ack', size: 800 },
    ],
    durationMs: 30,
    color: '#1a6cff',
  },
  {
    id: 4,
    label: 'Stream 4: CSS',
    packets: [
      { seq: 1, status: 'ack', size: 1200 },
      { seq: 2, status: 'lost', size: 600 },
      { seq: 3, status: 'sent', size: 600 },
    ],
    durationMs: 25,
    color: '#a78bfa',
  },
  {
    id: 8,
    label: 'Stream 8: JS',
    packets: [
      { seq: 1, status: 'ack', size: 1200 },
      { seq: 2, status: 'sent', size: 1200 },
      { seq: 3, status: 'pending', size: 1200 },
    ],
    durationMs: 40,
    color: '#07c160',
  },
  {
    id: 12,
    label: 'Stream 12: 图片',
    packets: [
      { seq: 1, status: 'sent', size: 1200 },
      { seq: 2, status: 'pending', size: 1200 },
      { seq: 3, status: 'pending', size: 1200 },
      { seq: 4, status: 'pending', size: 500 },
    ],
    durationMs: 50,
    color: '#f59e0b',
  },
]

const DEFAULT_FEATURES = [
  '多路复用：单一连接上并行多个独立流，无需建立多个 TCP 连接',
  '无队头阻塞：单个流丢包不影响其他流（HTTP/2 的 TCP 层队头阻塞被消除）',
  '0-RTT 建连：复用之前的握手信息，首包即可携带应用数据',
  '连接迁移：基于 Connection ID，IP 变化（如切换 Wi-Fi/4G）连接不断',
  '前向纠错（FEC）：可选地携带冗余数据，减少重传',
  '集成 TLS 1.3：握手与传输一体化，不再分层 TCP+TLS',
]

const DEFAULT_COMPARISON = {
  http1: 'HTTP/1.1：每个请求一个 TCP 连接，或管线化（实际几乎不用）。多个资源需多连接，存在队头阻塞。',
  http2: 'HTTP/2：单一 TCP 连接多路复用，应用层无队头阻塞，但 TCP 层丢包会阻塞所有流（TCP 队头阻塞）。',
  http3: 'HTTP/3：基于 QUIC（UDP），流级独立，丢包仅影响该流，0-RTT 建连，连接迁移。',
}

const PACKET_STATUS_LABEL = {
  'pending': { label: '待发送', color: '#7d8590', bg: 'rgba(125,133,144,0.15)' },
  'sent': { label: '已发送', color: '#1a6cff', bg: 'rgba(26,108,255,0.15)' },
  'ack': { label: '已确认', color: '#07c160', bg: 'rgba(7,193,96,0.15)' },
  'lost': { label: '丢包', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
}

type Tab = 'streams' | 'features' | 'comparison'

export function QuicMultiplexingVisualizer({ data }: QuicMultiplexingVisualizerProps) {
  const streams = data?.streams ?? DEFAULT_STREAMS
  const features = data?.features ?? DEFAULT_FEATURES
  const comparison = data?.comparison ?? DEFAULT_COMPARISON

  const [tab, setTab] = useState<Tab>('streams')
  const [tick, setTick] = useState(0)

  /** 模拟时间推进（演示用，不执行真实传输） */
  const handleTick = () => {
    setTick((t) => t + 1)
  }

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示静态流与数据包，不执行真实 QUIC 传输。
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-xs">
        <button
          onClick={() => setTab('streams')}
          className={cn(
            'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-all',
            tab === 'streams'
              ? 'bg-[#1a6cff] text-white'
              : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
          )}
        >
          多流传输
        </button>
        <button
          onClick={() => setTab('features')}
          className={cn(
            'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-all',
            tab === 'features'
              ? 'bg-[#1a6cff] text-white'
              : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
          )}
        >
          核心特性
        </button>
        <button
          onClick={() => setTab('comparison')}
          className={cn(
            'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-all',
            tab === 'comparison'
              ? 'bg-[#1a6cff] text-white'
              : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
          )}
        >
          HTTP/1.1 vs 2 vs 3
        </button>
      </div>

      {/* Tab 内容 */}
      {tab === 'streams' && (
        <div className="space-y-md">
          {/* 流可视化 */}
          <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
            <div className="mb-md flex items-center justify-between">
              <h4 className="font-mono text-body-sm text-body-hi">QUIC 流（单连接多路复用）</h4>
              <button
                onClick={handleTick}
                className="rounded-pill bg-[#07c160] px-md py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-[#06a050]"
              >
                ▶ 推进时间 (tick: {tick})
              </button>
            </div>
            <div className="space-y-md">
              {streams.map((stream) => (
                <div key={stream.id} className="rounded-sm bg-canvas-bg-inset p-md">
                  <div className="mb-sm flex items-center justify-between">
                    <div className="flex items-center gap-sm">
                      <span className="inline-block h-3 w-3 rounded-full" style={{ background: stream.color }} />
                      <span className="font-mono text-caption-mono-sm text-body-hi">{stream.label}</span>
                    </div>
                    <span className="font-mono text-caption-mono-sm text-body-mid">{stream.durationMs}ms</span>
                  </div>
                  {/* 数据包序列 */}
                  <div className="flex flex-wrap gap-xs">
                    {stream.packets.map((pkt, idx) => {
                      const status = PACKET_STATUS_LABEL[pkt.status]
                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-xxs rounded-sm px-sm py-xs"
                          style={{ background: status.bg, border: `1px solid ${status.color}40` }}
                        >
                          <span className="font-mono text-caption-mono-sm" style={{ color: status.color }}>
                            #{pkt.seq}
                          </span>
                          <span className="font-mono text-caption-mono-sm text-body-mid">{pkt.size}B</span>
                          <span
                            className="rounded-pill px-xs py-xxs font-mono text-caption-mono-sm"
                            style={{ background: status.color, color: '#fff' }}
                          >
                            {status.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            {/* 图例 */}
            <div className="mt-md flex flex-wrap gap-xs border-t border-hairline pt-md">
              {Object.entries(PACKET_STATUS_LABEL).map(([key, val]) => (
                <div key={key} className="flex items-center gap-xs">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: val.color }} />
                  <span className="font-mono text-caption-mono-sm text-body-mid">{val.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 关键说明 */}
          <div className="rounded-sm border border-[#07c160]/30 bg-[#07c160]/5 p-md">
            <p className="text-caption-sm text-body-mid leading-relaxed">
              <span className="font-mono text-[#07c160]">关键点：</span>
              Stream 4 的 packet #2 丢包，仅影响 Stream 4 自身（需要重传），其他流（0/8/12）继续传输。这就是 QUIC 相对 HTTP/2 的核心优势——无 TCP 层队头阻塞。
            </p>
          </div>
        </div>
      )}

      {tab === 'features' && (
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">QUIC 核心特性</h4>
          <div className="grid grid-cols-1 gap-md md:grid-cols-2">
            {features.map((f, i) => (
              <div key={i} className="rounded-sm bg-canvas-bg-inset p-md">
                <div className="mb-xs font-mono text-caption-mono-sm text-[#1a6cff]">特性 {i + 1}</div>
                <p className="text-caption-sm text-body-mid leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'comparison' && (
        <div className="space-y-md">
          <div className="rounded-sm border border-[#ef4444]/30 bg-[#ef4444]/5 p-lg">
            <h4 className="mb-sm font-mono text-body-sm text-[#ef4444]">HTTP/1.1</h4>
            <p className="text-body-sm text-body-mid leading-relaxed">{comparison.http1}</p>
          </div>
          <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/5 p-lg">
            <h4 className="mb-sm font-mono text-body-sm text-[#f59e0b]">HTTP/2</h4>
            <p className="text-body-sm text-body-mid leading-relaxed">{comparison.http2}</p>
          </div>
          <div className="rounded-sm border border-[#07c160]/30 bg-[#07c160]/5 p-lg">
            <h4 className="mb-sm font-mono text-body-sm text-[#07c160]">HTTP/3 (QUIC)</h4>
            <p className="text-body-sm text-body-mid leading-relaxed">{comparison.http3}</p>
          </div>
        </div>
      )}
    </div>
  )
}
