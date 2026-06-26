/**
 * JWTPayloadDecoder — JWT 结构解码与安全演示
 *
 * 演示 JWT 的三段式结构：
 * - Header：算法与类型
 * - Payload：声明（sub/exp/iat 等标准声明）
 * - Signature：签名（HMAC/RSA）
 *
 * 交互：点击各段展示解码后的 JSON 内容与字段说明；
 * 高亮敏感字段警告；展示安全提示。
 *
 * ⚠️ 教学模型：仅解码展示，不验证签名，不执行真实认证。
 */
'use client'

import { useState } from 'react'
import type {
  JWTPayloadDecoderData,
  JWTSegment,
  JWTSecurityTip,
} from '../../../lib/monitoring-auth-visualization-types'
import { cn } from '../../../lib/utils'

interface JWTPayloadDecoderProps {
  data?: JWTPayloadDecoderData
}

/** 默认 JWT 段数据 */
const DEFAULT_SEGMENTS: JWTSegment[] = [
  {
    id: 'header',
    name: 'Header',
    raw: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    decoded: '{"alg":"HS256","typ":"JWT"}',
    fields: [
      { name: 'alg', value: 'HS256', description: '签名算法：HMAC-SHA256（对称密钥）' },
      { name: 'typ', value: 'JWT', description: '令牌类型，固定为 JWT' },
    ],
    color: '#1a6cff',
  },
  {
    id: 'payload',
    name: 'Payload',
    raw: 'eyJzdWIiOiIxMjMiLCJ1c2VyIjoiVG9tIiwiYWRtaW4iOnRydWUsImlhdCI6MTczNTY4OTYwMCwiZXhwIjoxNzM1Nzc2MDAwfQ',
    decoded:
      '{"sub":"123","user":"Tom","admin":true,"iat":1735689600,"exp":1735776000}',
    fields: [
      { name: 'sub', value: '123', description: 'Subject：用户唯一标识' },
      { name: 'user', value: 'Tom', description: '自定义声明：用户名' },
      {
        name: 'admin',
        value: 'true',
        description: '自定义声明：管理员标记',
        sensitive: true,
      },
      { name: 'iat', value: '1735689600', description: 'Issued At：签发时间（Unix 时间戳）' },
      {
        name: 'exp',
        value: '1735776000',
        description: 'Expiration：过期时间（必填，过期后 token 失效）',
        sensitive: true,
      },
    ],
    color: '#07c160',
  },
  {
    id: 'signature',
    name: 'Signature',
    raw: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    decoded:
      'HMACSHA256(\n  base64UrlEncode(header) + "." +\n  base64UrlEncode(payload),\n  secret\n)',
    fields: [
      {
        name: '算法',
        value: 'HMAC-SHA256',
        description: '使用密钥对 header.payload 计算 HMAC',
      },
      {
        name: '密钥',
        value: 'secret',
        description: '服务端保管，绝不暴露给客户端',
        sensitive: true,
      },
      {
        name: '作用',
        value: '完整性校验',
        description: '保证 token 未被篡改，不保证机密性',
      },
    ],
    color: '#ec4899',
  },
]

const DEFAULT_SECURITY_TIPS: JWTSecurityTip[] = [
  {
    id: 'not-encrypted',
    title: 'Payload 不是加密的',
    content:
      'Payload 仅 Base64URL 编码，任何人都能解码查看。绝不要在 Payload 放敏感信息（密码、密钥、支付信息）。',
    level: 'danger',
  },
  {
    id: 'exp',
    title: '必须设置 exp 过期时间',
    content:
      '无 exp 的 JWT 永久有效，泄露后无法撤销。推荐 access_token 15-30 分钟，refresh_token 7-30 天。',
    level: 'warning',
  },
  {
    id: 'storage',
    title: '存储位置权衡',
    content:
      'localStorage 易被 XSS 窃取；HttpOnly Cookie 防 XSS 但有 CSRF 风险。推荐：access_token 内存存储，refresh_token HttpOnly Cookie。',
    level: 'warning',
  },
  {
    id: 'revoke',
    title: '撤销困难',
    content:
      'JWT 无状态，无法主动撤销（除非等到期）。需黑名单机制或缩短有效期 + refresh token 轮转。',
    level: 'info',
  },
  {
    id: 'alg-none',
    title: '警惕 alg=none 攻击',
    content:
      '老旧实现可能接受 alg=none 跳过签名校验。服务端必须白名单允许的算法，拒绝 none。',
    level: 'danger',
  },
]

const LEVEL_STYLES: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  danger: { bg: 'bg-red-50 dark:bg-red-950/20', border: 'border-red-300 dark:border-red-800', text: 'text-red-700 dark:text-red-400', icon: '⛔' },
  warning: { bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-300 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-400', icon: '⚠️' },
  info: { bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-300 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-400', icon: '💡' },
}

export function JWTPayloadDecoder({ data }: JWTPayloadDecoderProps) {
  const segments = data?.segments ?? DEFAULT_SEGMENTS
  const securityTips = data?.securityTips ?? DEFAULT_SECURITY_TIPS
  const token = data?.token ?? segments.map((s) => s.raw).join('.')

  const [activeSegment, setActiveSegment] = useState<JWTSegment['id']>('header')
  const [showDecoded, setShowDecoded] = useState(true)

  const currentSegment = segments.find((s) => s.id === activeSegment) ?? segments[0]
  if (!currentSegment) return null

  /** 将 token 按段着色 */
  const renderToken = () => {
    const parts = token.split('.')
    return (
      <div className="break-all font-mono text-caption">
        {parts.map((part, i) => {
          const seg = segments[i]
          const isActive = seg?.id === activeSegment
          return (
            <span key={i}>
              <button
                onClick={() => seg && setActiveSegment(seg.id)}
                className={cn(
                  'rounded px-0.5 transition-colors',
                  isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                )}
                style={{
                  backgroundColor: isActive ? `${seg?.color}20` : 'transparent',
                  color: seg?.color,
                }}
                aria-label={seg?.name}
              >
                {part}
              </button>
              {i < parts.length - 1 && <span className="text-body-mid">.</span>}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface p-md">
      {/* JWT 完整令牌 */}
      <div className="mb-md">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          JWT 完整令牌（Header.Payload.Signature）
        </div>
        <div className="rounded-md border border-border-subtle bg-bg-base p-sm overflow-x-auto">
          {renderToken()}
        </div>
        <div className="mt-xs flex flex-wrap gap-xs">
          {segments.map((seg) => (
            <button
              key={seg.id}
              onClick={() => setActiveSegment(seg.id)}
              className={cn(
                'rounded-md border px-sm py-xs text-caption transition-colors',
                seg.id === activeSegment
                  ? 'text-white'
                  : 'border-border-subtle text-body-mid hover:border-accent-sunset',
              )}
              style={
                seg.id === activeSegment
                  ? { backgroundColor: seg.color, borderColor: seg.color }
                  : undefined
              }
            >
              {seg.name}
            </button>
          ))}
          <button
            onClick={() => setShowDecoded(!showDecoded)}
            className="rounded-md border border-border-subtle px-sm py-xs text-caption text-body-mid hover:border-accent-sunset"
          >
            {showDecoded ? '显示原始 Base64' : '显示解码 JSON'}
          </button>
        </div>
      </div>

      {/* 当前段详情 */}
      <div className="mb-md rounded-md border p-md" style={{ borderColor: `${currentSegment.color}40` }}>
        <div className="mb-xs flex items-center gap-sm">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: currentSegment.color }}
          />
          <span className="font-mono text-body-sm font-semibold" style={{ color: currentSegment.color }}>
            {currentSegment.name}
          </span>
        </div>

        <div className="mb-sm">
          <div className="text-caption-mono-sm uppercase text-body-mid">
            {showDecoded ? '解码内容' : '原始 Base64URL'}
          </div>
          <pre className="mt-xs overflow-x-auto rounded bg-bg-base p-sm font-mono text-caption text-text-base">
            {showDecoded ? currentSegment.decoded : currentSegment.raw}
          </pre>
        </div>

        {currentSegment.fields && currentSegment.fields.length > 0 && (
          <div>
            <div className="text-caption-mono-sm uppercase text-body-mid">字段说明</div>
            <div className="mt-xs space-y-xs">
              {currentSegment.fields.map((field) => (
                <div
                  key={field.name}
                  className={cn(
                    'flex flex-wrap items-center gap-sm rounded border p-xs',
                    field.sensitive
                      ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
                      : 'border-border-subtle bg-bg-base',
                  )}
                >
                  <code
                    className={cn(
                      'font-mono text-caption font-semibold',
                      field.sensitive ? 'text-red-700 dark:text-red-400' : 'text-accent-sunset',
                    )}
                  >
                    {field.name}
                  </code>
                  <code className="font-mono text-caption text-body-mid">= {field.value}</code>
                  {field.sensitive && (
                    <span className="rounded bg-red-100 px-1 text-caption-mono-sm uppercase text-red-700 dark:bg-red-900 dark:text-red-300">
                      敏感
                    </span>
                  )}
                  <span className="text-caption text-body-mid">{field.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 安全提示 */}
      <div>
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          JWT 安全要点
        </div>
        <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
          {securityTips.map((tip) => {
            const style = LEVEL_STYLES[tip.level] ?? LEVEL_STYLES.info
            return (
              <div key={tip.id} className={cn('rounded-md border p-sm', style.bg, style.border)}>
                <div className={cn('mb-xs flex items-center gap-sm text-body-sm font-semibold', style.text)}>
                  <span>{style.icon}</span>
                  <span>{tip.title}</span>
                </div>
                <div className="text-caption text-body-mid">{tip.content}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
