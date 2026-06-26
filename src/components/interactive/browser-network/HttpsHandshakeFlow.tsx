/**
 * HttpsHandshakeFlow — HTTPS TLS 握手流程可视化
 *
 * 展示 TLS 1.2 握手过程：
 * ClientHello → ServerHello + 证书 → 密钥交换 → Finished → 对称加密通信
 *
 * ⚠️ 教学模拟：展示静态握手阶段与加密类型，不执行真实 TLS 握手。
 */
import { useState } from 'react'
import type {
  HttpsHandshakeFlowData,
  TlsHandshakeStage,
  EncryptionType,
} from '../../../lib/browser-network-visualization-types'
import { cn } from '../../../lib/utils'

interface HttpsHandshakeFlowProps {
  data?: HttpsHandshakeFlowData
}

/** 默认 TLS 握手阶段 */
const DEFAULT_STAGES: TlsHandshakeStage[] = [
  {
    id: 'client-hello',
    name: 'ClientHello',
    description: '客户端发送 ClientHello，包含：支持的 TLS 版本、客户端随机数（Client Random）、支持的加密套件列表、SNI（域名）。明文传输。',
    direction: 'c2s',
    encryption: 'plaintext',
    payload: [
      'TLS 版本：TLS 1.2',
      '客户端随机数：Client Random（32 字节）',
      '支持的加密套件：TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 等',
      'SNI：www.example.com',
    ],
    durationMs: 5,
    color: '#1a6cff',
  },
  {
    id: 'server-hello',
    name: 'ServerHello + Certificate',
    description: '服务端回应 ServerHello（选定加密套件、服务端随机数）+ Certificate（X.509 证书链，含公钥）+ ServerKeyExchange（DH 参数）。明文传输（除密钥交换参数）。',
    direction: 's2c',
    encryption: 'plaintext',
    payload: [
      'TLS 版本：TLS 1.2',
      '服务端随机数：Server Random（32 字节）',
      '选定加密套件：TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384',
      '证书链：服务器证书 → 中间证书 → 根证书',
      'ServerKeyExchange：DH 公共参数',
    ],
    durationMs: 10,
    color: '#07c160',
  },
  {
    id: 'certificate',
    name: '证书验证',
    description: '客户端验证证书：1) 检查证书链是否由可信 CA 签发；2) 检查域名匹配；3) 检查有效期；4) 检查吊销列表（CRL/OCSP）。验证失败会中断连接。',
    direction: 'both',
    encryption: 'asymmetric',
    payload: [
      '验证证书链：服务器证书 → 中间 CA → 根 CA（系统内置）',
      '验证域名：CN/SAN 是否匹配 www.example.com',
      '验证有效期：notBefore ≤ now ≤ notAfter',
      '验证吊销状态：OCSP / CRL',
      '提取服务器公钥',
    ],
    durationMs: 15,
    color: '#a78bfa',
  },
  {
    id: 'key-exchange',
    name: '密钥交换（ECDHE）',
    description: '客户端生成 PreMasterSecret，用服务器公钥加密发送（RSA）或通过 ECDHE 计算共享密钥。双方用 Client Random + Server Random + PreMasterSecret 派生会话密钥。',
    direction: 'both',
    encryption: 'asymmetric',
    payload: [
      '客户端生成 PreMasterSecret（48 字节随机数）',
      'RSA 模式：用服务器公钥加密 PreMasterSecret 发送',
      'ECDHE 模式：双方交换 DH 公钥，计算共享密钥',
      '派生会话密钥：PRF(ClientRandom + ServerRandom + PreMasterSecret)',
      '客户端发送 ChangeCipherSpec（切换到加密通信）',
    ],
    durationMs: 20,
    color: '#f59e0b',
  },
  {
    id: 'finished',
    name: 'Finished（双向验证）',
    description: '客户端发送 Finished（用会话密钥加密的握手摘要），服务端验证后也发送 Finished。双方确认握手未被篡改，密钥协商完成。',
    direction: 'both',
    encryption: 'symmetric',
    payload: [
      '客户端 → Finished：encrypt(handshake_messages)',
      '服务端验证 Finished 完整性',
      '服务端 → Finished：encrypt(handshake_messages)',
      '客户端验证 Finished 完整性',
      '握手完成，进入应用数据阶段',
    ],
    durationMs: 10,
    color: '#ec4899',
  },
  {
    id: 'encrypted',
    name: '对称加密通信',
    description: '后续应用数据使用协商的对称密钥加密（如 AES-256-GCM）。对称加密性能远高于非对称加密，适合大量数据传输。',
    direction: 'both',
    encryption: 'symmetric',
    payload: [
      '加密算法：AES-256-GCM',
      '会话密钥：双方共享，仅本次会话有效',
      '应用数据：HTTP 请求/响应',
      '会话结束：销毁会话密钥',
    ],
    durationMs: 0,
    color: '#06b6d4',
  },
]

const ENCRYPTION_LABEL: Record<EncryptionType, { label: string; color: string; bg: string }> = {
  'plaintext': { label: '明文', color: '#7d8590', bg: 'rgba(125,133,144,0.12)' },
  'asymmetric': { label: '非对称加密', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  'symmetric': { label: '对称加密', color: '#07c160', bg: 'rgba(7,193,96,0.12)' },
}

const directionLabel = {
  'c2s': '客户端 → 服务端',
  's2c': '服务端 → 客户端',
  'both': '双向交互',
}

export function HttpsHandshakeFlow({ data }: HttpsHandshakeFlowProps) {
  const stages = data?.stages ?? DEFAULT_STAGES
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

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示静态握手阶段与加密类型，不执行真实 TLS 握手。
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
              width: `${totalDuration > 0 ? (accumulatedDuration / totalDuration) * 100 : 100}%`,
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
              <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">加密</span>
              <span
                className="rounded-pill px-sm py-xxs font-mono text-caption-mono-sm"
                style={{ background: ENCRYPTION_LABEL[stage.encryption].bg, color: ENCRYPTION_LABEL[stage.encryption].color }}
              >
                {ENCRYPTION_LABEL[stage.encryption].label}
              </span>
            </div>
            <div className="flex items-start gap-sm">
              <span className="shrink-0 rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">耗时</span>
              <span className="min-w-0 flex-1 font-mono text-caption-mono-sm text-body-hi">{stage.durationMs}ms</span>
            </div>
          </div>
        </div>

        {/* 右：携带信息 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">携带的关键信息</h4>
          <div className="space-y-xs">
            {stage.payload?.map((p, i) => (
              <div
                key={i}
                className="rounded-sm bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-hi"
              >
                {p}
              </div>
            ))}
          </div>
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
