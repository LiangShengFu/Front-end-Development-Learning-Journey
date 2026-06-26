/**
 * PwaPushFlowVisualizer — PWA 推送通知端到端流程
 *
 * 展示 PWA 推送通知的完整链路：订阅（Subscribe）→ 服务端推送（Server Push）→
 * Service Worker 接收（SW Receive）→ 展示通知（Notify）。
 * 点击「模拟推送」按钮按阶段依次高亮，展示对应代码。
 *
 * ⚠️ 教学模拟：用 React state 模拟推送流程，不调用真实 Push API / Notification API。
 */
import { useEffect, useRef, useState } from 'react'
import type {
  PwaPushFlowVisualizerData,
  PushStageSpec,
  PushStageId,
} from '../../../lib/cross-platform-visualization-types'
import { cn } from '../../../lib/utils'

interface PwaPushFlowVisualizerProps {
  data?: PwaPushFlowVisualizerData
}

const STAGE_THEME: Record<PushStageId, { color: string; bg: string; border: string; icon: string }> = {
  subscribe: { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', border: 'rgba(26,108,255,0.35)', icon: '📡' },
  'server-push': { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.35)', icon: '📤' },
  'sw-receive': { color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.35)', icon: '📨' },
  notify: { color: '#07c160', bg: 'rgba(7,193,96,0.10)', border: 'rgba(7,193,96,0.35)', icon: '🔔' },
}

const DEFAULT_STAGES: PushStageSpec[] = [
  {
    id: 'subscribe',
    label: '1. 订阅推送',
    description: '用户授权后，浏览器生成订阅对象（endpoint + keys），发送到服务端保存。',
    code: `// 前端：订阅推送
const reg = await navigator.serviceWorker.ready
const subscription = await reg.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: VAPID_PUBLIC_KEY
})

// 发送订阅对象到服务端
await fetch('/api/subscribe', {
  method: 'POST',
  body: JSON.stringify(subscription)
})`,
    codeLanguage: 'javascript',
  },
  {
    id: 'server-push',
    label: '2. 服务端推送',
    description: '服务端用 VAPID 私钥签名，通过 Web Push 协议向订阅 endpoint 发送推送消息。',
    code: `// 服务端：发送推送（Node.js + web-push）
const webpush = require('web-push')

webpush.setVapidDetails(
  'mailto:admin@example.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
)

await webpush.sendNotification(subscription, JSON.stringify({
  title: '新消息',
  body: '你有一条新通知',
  icon: '/icon.png'
}))`,
    codeLanguage: 'javascript',
  },
  {
    id: 'sw-receive',
    label: '3. SW 接收',
    description: 'Service Worker 的 push 事件接收推送消息，即使页面不可见也能收到。',
    code: `// Service Worker：接收 push 事件
self.addEventListener('push', (event) => {
  const data = event.data.json()

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: '/badge.png',
      tag: 'new-message'
    })
  )
})`,
    codeLanguage: 'javascript',
  },
  {
    id: 'notify',
    label: '4. 展示通知',
    description: '系统通知栏展示通知，用户点击后通过 notificationclick 事件跳转到对应页面。',
    code: `// Service Worker：通知点击
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow('/messages/123')
  )
})

// 用户看到系统通知并可点击交互`,
    codeLanguage: 'javascript',
  },
]

export function PwaPushFlowVisualizer({ data }: PwaPushFlowVisualizerProps) {
  const stages = data?.stages ?? DEFAULT_STAGES
  const [activeStage, setActiveStage] = useState<number>(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [runCount, setRunCount] = useState(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const triggerPush = () => {
    clearTimers()
    setActiveStage(-1)
    setIsRunning(true)

    stages.forEach((_, i) => {
      const t = setTimeout(() => setActiveStage(i), 50 + i * 800)
      timersRef.current.push(t)
    })

    const tDone = setTimeout(() => {
      setIsRunning(false)
      setRunCount((n) => n + 1)
    }, 50 + stages.length * 800 + 200)
    timersRef.current.push(tDone)
  }

  useEffect(() => () => clearTimers(), [])

  const activeSpec = activeStage >= 0 ? stages[activeStage] : null

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：用 React state 模拟推送流程，不调用真实 Push API / Notification API / Service Worker。
      </div>

      {/* 触发按钮 */}
      <div className="flex items-center justify-between">
        <h4 className="font-mono text-body-sm text-body-hi">端到端推送流程</h4>
        <button
          onClick={triggerPush}
          disabled={isRunning}
          className={cn(
            'rounded-pill px-md py-xs text-caption-mono-sm text-canvas transition-opacity',
            isRunning ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'
          )}
          style={{ background: '#07c160' }}
        >
          {isRunning ? '推送中...' : '模拟推送'}
        </button>
      </div>

      {/* 流程节点 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, i) => {
          const theme = STAGE_THEME[stage.id]
          const isActive = i === activeStage
          const isPast = i < activeStage
          return (
            <div
              key={stage.id}
              className={cn(
                'rounded-sm border p-md transition-all',
                isActive && 'scale-105'
              )}
              style={{
                borderColor: isActive || isPast ? theme.border : 'rgba(125,125,125,0.2)',
                background: isActive ? theme.bg : isPast ? 'rgba(125,125,125,0.04)' : 'transparent',
              }}
            >
              <div className="text-lg">{theme.icon}</div>
              <div className="mt-xs font-mono text-body-sm font-bold" style={{ color: theme.color }}>
                {stage.label}
              </div>
              <p className="mt-xs text-caption-mono-sm text-body-mid">{stage.description}</p>
              {/* 连线指示 */}
              {i < stages.length - 1 && (
                <div className="mt-sm hidden lg:block text-caption-mono-sm" style={{ color: theme.color }}>
                  ↓
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 当前阶段代码 */}
      {activeSpec && (
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-xs flex items-center gap-sm">
            <span className="text-lg">{STAGE_THEME[activeSpec.id].icon}</span>
            <h4 className="font-mono text-body-sm font-bold" style={{ color: STAGE_THEME[activeSpec.id].color }}>
              {activeSpec.label}
            </h4>
          </div>
          <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
            {activeSpec.code}
          </pre>
        </div>
      )}

      {/* 参与角色 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-3">
        <div className="rounded-sm border border-[#1a6cff]/30 bg-[#1a6cff]/8 p-md text-center">
          <div className="text-lg">🌐</div>
          <div className="mt-xs font-mono text-body-sm font-bold text-[#1a6cff]">浏览器 / PWA</div>
          <p className="mt-xs text-caption-mono-sm text-body-mid">PushManager 订阅 + Service Worker 接收</p>
        </div>
        <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-md text-center">
          <div className="text-lg">🖥️</div>
          <div className="mt-xs font-mono text-body-sm font-bold text-[#b45309]">服务端</div>
          <p className="mt-xs text-caption-mono-sm text-body-mid">VAPID 签名 + Web Push 协议发送</p>
        </div>
        <div className="rounded-sm border border-[#a78bfa]/30 bg-[#a78bfa]/8 p-md text-center">
          <div className="text-lg">📤</div>
          <div className="mt-xs font-mono text-body-sm font-bold text-[#7c3aed]">推送服务</div>
          <p className="mt-xs text-caption-mono-sm text-body-mid">FCM (Android) / APNs (iOS) 中转</p>
        </div>
      </div>

      {/* 模拟次数 */}
      {runCount > 0 && (
        <div className="text-center text-caption-mono-sm text-body-mid">
          已模拟推送 {runCount} 次
        </div>
      )}
    </div>
  )
}
