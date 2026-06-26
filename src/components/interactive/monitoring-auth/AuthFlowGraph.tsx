/**
 * AuthFlowGraph — OAuth 2.0 授权流程可视化
 *
 * 展示四种主流认证授权流程：
 * - 授权码模式（Authorization Code）：最常用，code 换 token
 * - 授权码 + PKCE：SPA/移动端必备，code_verifier 替代 client_secret
 * - JWT 流程：登录获取 token，请求携带 Authorization header
 * - 客户端模式（Client Credentials）：服务间通信，无用户参与
 *
 * 交互：点击模式切换按钮，展示对应流程的步骤节点与连线，
 * PKCE 模式下额外步骤高亮显示。
 *
 * ⚠️ 教学模型：节点位置预设，不执行真实授权请求。
 */
'use client'

import { useState } from 'react'
import type {
  AuthFlowGraphData,
  AuthFlowMode,
  AuthFlowModeConfig,
} from '../../../lib/monitoring-auth-visualization-types'
import { cn } from '../../../lib/utils'

interface AuthFlowGraphProps {
  data?: AuthFlowGraphData
}

/** 默认模式配置 */
const DEFAULT_MODES: AuthFlowModeConfig[] = [
  {
    id: 'auth-code',
    name: '授权码模式',
    description: '最常用的 OAuth 模式，通过授权码 code 交换 access_token，client_secret 保存在服务端。',
    useCase: '有后端的传统 Web 应用（SSR）',
    securityNote: 'client_secret 必须保存在服务端，不能暴露给前端',
    color: '#1a6cff',
    steps: [
      { id: 'user', label: '用户', actor: 'user', top: '12%', left: '8%', variant: 'start', description: '终端用户，资源所有者' },
      { id: 'client', label: '客户端\n(前端+后端)', actor: 'client', top: '12%', left: '38%', variant: 'process', description: '客户端应用，前后端一体' },
      { id: 'auth', label: '授权服务器', actor: 'auth-server', top: '12%', left: '72%', variant: 'process', description: 'GitHub/Google 等 IdP' },
      { id: 'resource', label: '资源服务器', actor: 'resource-server', top: '72%', left: '38%', variant: 'end', description: 'API 资源提供方' },
    ],
    edges: [
      { from: 'user', to: 'client', label: '1. 点击登录' },
      { from: 'client', to: 'auth', label: '2. 重定向授权页\n(client_id, redirect_uri, state)' },
      { from: 'auth', to: 'user', label: '3. 展示授权页' },
      { from: 'user', to: 'auth', label: '4. 同意授权' },
      { from: 'auth', to: 'client', label: '5. 重定向回 redirect_uri\n(携带 code)' },
      { from: 'client', to: 'auth', label: '6. code + client_secret\n换 access_token' },
      { from: 'auth', to: 'client', label: '7. 返回 access_token' },
      { from: 'client', to: 'resource', label: '8. 携带 token 请求资源' },
    ],
  },
  {
    id: 'auth-code-pkce',
    name: '授权码 + PKCE',
    description: 'OAuth 2.1 强制要求所有公开客户端使用 PKCE。用 code_verifier/challenge 替代 client_secret，SPA/移动端必备。',
    useCase: 'SPA（单页应用）、移动端 App、无后端应用',
    securityNote: 'PKCE 防止授权码截获攻击，即使 code 被窃取也无法换取 token',
    color: '#07c160',
    steps: [
      { id: 'user', label: '用户', actor: 'user', top: '12%', left: '8%', variant: 'start', description: '终端用户' },
      { id: 'client', label: 'SPA 客户端\n(无后端)', actor: 'client', top: '12%', left: '38%', variant: 'process', description: '纯前端应用，无法保存 secret' },
      { id: 'auth', label: '授权服务器', actor: 'auth-server', top: '12%', left: '72%', variant: 'process', description: '支持 PKCE 的 IdP' },
      { id: 'resource', label: '资源服务器', actor: 'resource-server', top: '72%', left: '38%', variant: 'end', description: 'API 资源' },
    ],
    edges: [
      { from: 'client', to: 'client', label: '0. 生成 code_verifier\n+ code_challenge', highlight: true },
      { from: 'user', to: 'client', label: '1. 点击登录' },
      { from: 'client', to: 'auth', label: '2. 重定向\n(code_challenge, S256)', highlight: true },
      { from: 'auth', to: 'user', label: '3. 授权页' },
      { from: 'user', to: 'auth', label: '4. 同意' },
      { from: 'auth', to: 'client', label: '5. 返回 code' },
      { from: 'client', to: 'auth', label: '6. code + code_verifier\n换 token（无需 secret）', highlight: true },
      { from: 'auth', to: 'client', label: '7. 校验 challenge\n返回 access_token', highlight: true },
      { from: 'client', to: 'resource', label: '8. 携带 token 请求' },
    ],
  },
  {
    id: 'jwt-flow',
    name: 'JWT 流程',
    description: '登录获取 JWT，后续请求携带 Authorization: Bearer token。无状态认证，服务端不存储 session。',
    useCase: '前后端分离应用、API 网关、微服务架构',
    securityNote: 'JWT Payload 仅 Base64 编码，不是加密；绝不要放敏感信息',
    color: '#a78bfa',
    steps: [
      { id: 'user', label: '用户', actor: 'user', top: '12%', left: '8%', variant: 'start', description: '终端用户' },
      { id: 'client', label: '前端', actor: 'client', top: '12%', left: '38%', variant: 'process', description: 'SPA / App' },
      { id: 'auth', label: '认证服务', actor: 'auth-server', top: '12%', left: '72%', variant: 'process', description: '签发 JWT 的服务' },
      { id: 'resource', label: 'API 服务', actor: 'resource-server', top: '72%', left: '38%', variant: 'end', description: '业务 API' },
    ],
    edges: [
      { from: 'user', to: 'client', label: '1. 输入账号密码' },
      { from: 'client', to: 'auth', label: '2. POST /login\n(account, password)' },
      { from: 'auth', to: 'client', label: '3. 返回 JWT\n(access + refresh)' },
      { from: 'client', to: 'resource', label: '4. Authorization:\nBearer <token>' },
      { from: 'resource', to: 'resource', label: '5. 验证签名 + exp' },
      { from: 'resource', to: 'client', label: '6. 返回数据' },
      { from: 'client', to: 'auth', label: '7. token 过期时\nrefresh_token 换新' },
    ],
  },
  {
    id: 'client-credentials',
    name: '客户端模式',
    description: '无用户参与的机器间通信，客户端直接用 client_id + client_secret 获取 token。',
    useCase: '后端服务间调用、定时任务、CI/CD',
    securityNote: '仅限可信后端，client_secret 必须安全存储',
    color: '#ec4899',
    steps: [
      { id: 'client', label: '服务 A\n(客户端)', actor: 'client', top: '15%', left: '15%', variant: 'start', description: '调用方服务' },
      { id: 'auth', label: '授权服务器', actor: 'auth-server', top: '15%', left: '60%', variant: 'process', description: 'IdP' },
      { id: 'resource', label: '服务 B\n(资源)', actor: 'resource-server', top: '70%', left: '38%', variant: 'end', description: '被调用的 API' },
    ],
    edges: [
      { from: 'client', to: 'auth', label: '1. client_id + secret\ngrant_type=client_credentials' },
      { from: 'auth', to: 'client', label: '2. 返回 access_token' },
      { from: 'client', to: 'resource', label: '3. Bearer token 请求' },
      { from: 'resource', to: 'client', label: '4. 返回数据' },
    ],
  },
]

const ACTOR_COLORS: Record<string, string> = {
  user: '#1a6cff',
  client: '#07c160',
  'auth-server': '#ec4899',
  'resource-server': '#a78bfa',
}

export function AuthFlowGraph({ data }: AuthFlowGraphProps) {
  const modes = data?.modes ?? DEFAULT_MODES
  const defaultMode = data?.defaultMode ?? 'auth-code'
  const [mode, setMode] = useState<AuthFlowMode>(defaultMode)
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  const currentMode = modes.find((m) => m.id === mode) ?? modes[0]
  if (!currentMode) return null

  const steps = currentMode.steps
  const edges = currentMode.edges

  /** 获取步骤位置（像素坐标，基于 600x360 画布） */
  const getStepPos = (id: string) => {
    const step = steps.find((s) => s.id === id)
    if (!step) return { x: 0, y: 0 }
    return {
      x: (parseFloat(step.left) / 100) * 600,
      y: (parseFloat(step.top) / 100) * 360,
    }
  }

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface p-md">
      {/* 模式切换 */}
      <div className="mb-md">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          认证授权流程模式
        </div>
        <div className="flex flex-wrap gap-xs">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id)
                setSelectedStep(null)
              }}
              className={cn(
                'rounded-md border px-sm py-xs text-body-sm transition-colors',
                m.id === mode
                  ? 'border-accent-sunset bg-accent-sunset/10 text-accent-sunset'
                  : 'border-border-subtle text-body-mid hover:border-accent-sunset',
              )}
              style={m.id === mode ? { borderColor: m.color, color: m.color } : undefined}
              aria-pressed={m.id === mode}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* 模式说明 */}
      <div className="mb-md grid grid-cols-1 gap-sm md:grid-cols-3">
        <div className="rounded-md border border-border-subtle bg-bg-base p-sm">
          <div className="text-caption-mono-sm uppercase text-body-mid">适用场景</div>
          <div className="mt-xs text-body-sm text-text-base">{currentMode.useCase}</div>
        </div>
        <div className="rounded-md border border-border-subtle bg-bg-base p-sm">
          <div className="text-caption-mono-sm uppercase text-body-mid">安全要点</div>
          <div className="mt-xs text-body-sm text-text-base">{currentMode.securityNote}</div>
        </div>
        <div className="rounded-md border border-border-subtle bg-bg-base p-sm" style={{ borderColor: currentMode.color }}>
          <div className="text-caption-mono-sm uppercase text-body-mid">流程描述</div>
          <div className="mt-xs text-body-sm text-text-base">{currentMode.description}</div>
        </div>
      </div>

      {/* 流程画布 */}
      <div className="mb-md overflow-x-auto">
        <div className="relative mx-auto" style={{ width: '600px', height: '400px', maxWidth: '100%' }}>
          {/* SVG 连线层 */}
          <svg
            className="absolute inset-0"
            width="600"
            height="400"
            viewBox="0 0 600 400"
            preserveAspectRatio="xMidYMid meet"
            style={{ pointerEvents: 'none' }}
          >
            <defs>
              <marker id="arrow-auth" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
              </marker>
              <marker id="arrow-auth-hl" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
              </marker>
            </defs>
            {edges.map((edge, i) => {
              if (edge.from === edge.to) return null
              const from = getStepPos(edge.from)
              const to = getStepPos(edge.to)
              const midX = (from.x + to.x) / 2
              const midY = (from.y + to.y) / 2 - 12
              return (
                <g key={i}>
                  <path
                    d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                    fill="none"
                    stroke={edge.highlight ? '#f59e0b' : '#6b7280'}
                    strokeWidth={edge.highlight ? 2 : 1.5}
                    strokeDasharray={edge.highlight ? '5,3' : 'none'}
                    markerEnd={edge.highlight ? 'url(#arrow-auth-hl)' : 'url(#arrow-auth)'}
                    opacity={0.7}
                  />
                  <text
                    x={midX}
                    y={midY - 4}
                    textAnchor="middle"
                    fontSize="10"
                    fill={edge.highlight ? '#f59e0b' : '#6b7280'}
                    fontWeight={edge.highlight ? 600 : 400}
                  >
                    {edge.label?.split('\n')[0]}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* 步骤节点 */}
          {steps.map((step) => {
            const color = ACTOR_COLORS[step.actor] ?? '#6b7280'
            const isSelected = selectedStep === step.id
            return (
              <button
                key={step.id}
                onClick={() => setSelectedStep(isSelected ? null : step.id)}
                className={cn(
                  'absolute -translate-x-1/2 -translate-y-1/2 rounded-md border-2 px-sm py-xs text-center text-caption font-medium transition-all',
                  isSelected ? 'scale-110 shadow-lg' : 'hover:scale-105',
                )}
                style={{
                  top: step.top,
                  left: step.left,
                  borderColor: color,
                  backgroundColor: isSelected ? color : 'var(--bg-base, #ffffff)',
                  color: isSelected ? '#fff' : color,
                  whiteSpace: 'pre-line',
                  minWidth: '80px',
                }}
                aria-label={step.label.replace('\n', ' ')}
              >
                {step.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 步骤详情 */}
      {selectedStep && (
        <div className="mb-md rounded-md border border-accent-sunset/40 bg-accent-sunset/5 p-sm">
          {(() => {
            const step = steps.find((s) => s.id === selectedStep)
            if (!step) return null
            return (
              <>
                <div className="text-caption-mono-sm uppercase text-accent-sunset">
                  {step.label.replace('\n', ' ')}
                </div>
                <div className="mt-xs text-body-sm text-text-base">{step.description}</div>
              </>
            )
          })()}
        </div>
      )}

      {/* 边列表 */}
      <div className="rounded-md border border-border-subtle bg-bg-base p-sm">
        <div className="mb-xs text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          流程步骤
        </div>
        <ol className="space-y-xs">
          {edges.map((edge, i) => (
            <li key={i} className="flex items-start gap-sm text-caption">
              <span
                className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: edge.highlight ? '#f59e0b' : '#6b7280' }}
              />
              <span className={edge.highlight ? 'text-accent-sunset' : 'text-body-mid'}>
                {edge.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {mode === 'auth-code-pkce' && (
        <div className="mt-md rounded-md bg-accent-sunset/5 p-sm text-caption text-body-mid">
          💡 PKCE 用 code_verifier/challenge 替代 client_secret，即使授权码被截获，没有 code_verifier 也无法换取 token。OAuth 2.1 将 PKCE 列为所有公开客户端的强制要求。
        </div>
      )}
    </div>
  )
}
