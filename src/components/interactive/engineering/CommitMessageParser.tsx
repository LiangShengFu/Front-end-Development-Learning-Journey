/**
 * CommitMessageParser — 约定式提交解析器
 *
 * 实时解析用户输入的 Conventional Commit 消息：
 * <type>(<scope>): <subject>
 * <body>
 * <footer> / BREAKING CHANGE:
 *
 * ⚠️ 教学模拟：仅做本地正则解析，不接入 git hook / commitlint。
 */
import { useMemo, useState } from 'react'
import type { CommitMessageParserData, CommitMessagePart } from '../../../lib/engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface CommitMessageParserProps {
  data?: CommitMessageParserData
}

const DEFAULT_TYPES = [
  { type: 'feat', label: '新功能', color: '#07c160' },
  { type: 'fix', label: 'Bug 修复', color: '#1a6cff' },
  { type: 'docs', label: '文档变更', color: '#7d8590' },
  { type: 'style', label: '代码格式', color: '#a78bfa' },
  { type: 'refactor', label: '重构', color: '#f59e0b' },
  { type: 'perf', label: '性能优化', color: '#ef4444' },
  { type: 'test', label: '测试', color: '#0ea5e9' },
  { type: 'build', label: '构建系统', color: '#e34c26' },
  { type: 'ci', label: 'CI 配置', color: '#5a29e4' },
  { type: 'chore', label: '杂项', color: '#6b7280' },
  { type: 'revert', label: '回滚', color: '#dc2626' },
]

const DEFAULT_EXAMPLES = [
  {
    id: 'feat',
    label: '新功能',
    message: `feat(auth): 新增 OAuth2 第三方登录

- 支持 GitHub / Google 登录
- 自动绑定已有账号
- 失败时降级到原登录方式

Closes #123`,
    explanation: 'feat 类型 + auth 范围 + 简明描述，body 列出实现要点，footer 关联 issue',
  },
  {
    id: 'breaking',
    label: '破坏性变更',
    message: `feat(api)!: 重构用户接口返回结构

BREAKING CHANGE: 用户接口返回从 { code, data, msg } 改为 { success, data, error }
所有调用方需同步更新`,
    explanation: 'type 后 ! 标记破坏性变更，BREAKING CHANGE footer 说明具体影响',
  },
  {
    id: 'fix',
    label: 'Bug 修复',
    message: `fix(cart): 修复购物车数量为 0 时仍可下单的问题

负数判断逻辑遗漏导致边界条件错误`,
    explanation: 'fix 类型 + cart 范围，subject 描述问题，body 解释原因',
  },
  {
    id: 'multi-scope',
    label: '多段 footer',
    message: `feat(checkout): 接入新支付渠道

新增 Stripe 支付，与现有微信/支付宝并列

Reviewed-by: @reviewer1
Co-authored-by: @dev2
Refs #456`,
    explanation: 'body + 多种 footer（Reviewed-by / Co-authored-by / Refs）',
  },
]

const DEFAULT_PARTS = [
  {
    id: 'type',
    label: 'type',
    color: '#07c160',
    bg: 'rgba(7,193,96,0.10)',
    description: '提交类型：feat/fix/docs/style/refactor/perf/test/build/ci/chore/revert',
  },
  {
    id: 'scope',
    label: 'scope',
    color: '#1a6cff',
    bg: 'rgba(26,108,255,0.10)',
    description: '影响范围（可选）：模块/组件/功能名，如 auth / cart / api',
  },
  {
    id: 'breaking',
    label: '!',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.10)',
    description: '破坏性标记（可选）：! 表示 BREAKING CHANGE，影响版本号 major',
  },
  {
    id: 'subject',
    label: 'subject',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.10)',
    description: '简短描述：祈使句、现在时、首字母小写、不超过 50 字',
  },
  {
    id: 'body',
    label: 'body',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.10)',
    description: '详细说明（可选）：解释 what / why / how，每行不超过 72 字',
  },
  {
    id: 'footer',
    label: 'footer',
    color: '#7d8590',
    bg: 'rgba(125,133,144,0.10)',
    description: '脚注（可选）：BREAKING CHANGE: / Closes # / Reviewed-by: 等',
  },
]

/** 解析结果 */
interface ParseResult {
  type?: string
  scope?: string
  breaking?: boolean
  subject?: string
  body?: string
  footer?: string
  isValid: boolean
  errors: string[]
}

/** 解析提交消息 */
function parseCommitMessage(message: string): ParseResult {
  const errors: string[] = []
  const lines = message.split('\n')
  const header = lines[0] ?? ''

  // Header 正则：type(scope)!?: subject
  const headerRegex = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/
  const match = header.match(headerRegex)

  if (!match) {
    return {
      isValid: false,
      errors: ['Header 格式错误，应为 type(scope)!?: subject'],
    }
  }

  const [, type, scope, breakingMark, subject] = match
  const breaking = breakingMark === '!'

  // 校验 type
  const knownTypes = DEFAULT_TYPES.map((t) => t.type)
  if (!knownTypes.includes(type)) {
    errors.push(`未知 type "${type}"，建议使用：${knownTypes.join('/')}`)
  }

  // 校验 subject
  if (subject.length > 72) {
    errors.push(`subject 长度 ${subject.length} > 72，建议精简`)
  }
  if (subject.endsWith('。') || subject.endsWith('.')) {
    errors.push('subject 末尾不应有句号')
  }

  // 提取 body 和 footer
  let body = ''
  let footer = ''
  if (lines.length > 2) {
    const rest = lines.slice(2).join('\n')
    const footerMatch = rest.match(/\n?(BREAKING CHANGE:|[\w-]+:|Closes #|Fixes #|Refs #|Reviewed-by:|Co-authored-by:)[\s\S]*$/)
    if (footerMatch && footerMatch.index !== undefined) {
      body = rest.slice(0, footerMatch.index).trim()
      footer = rest.slice(footerMatch.index).trim()
    } else {
      body = rest.trim()
    }
  }

  // 校验 body 行宽
  if (body) {
    const longLines = body.split('\n').filter((l) => l.length > 100)
    if (longLines.length > 0) {
      errors.push(`body 存在 ${longLines.length} 行超过 100 字符`)
    }
  }

  return {
    type,
    scope,
    breaking,
    subject,
    body: body || undefined,
    footer: footer || undefined,
    isValid: errors.length === 0,
    errors,
  }
}

/** 高亮 header 各部分 */
function highlightHeader(header: string, parts: CommitMessagePart[]) {
  if (!header) return null
  const headerRegex = /^(\w+)(\([^)]+\))?(!)?(:\s*)(.+)$/
  const match = header.match(headerRegex)
  if (!match) {
    return <span className="text-body-hi">{header}</span>
  }
  const [, type, scope, breaking, colon, subject] = match
  const typePart = parts.find((p) => p.id === 'type')
  const scopePart = parts.find((p) => p.id === 'scope')
  const breakingPart = parts.find((p) => p.id === 'breaking')
  const subjectPart = parts.find((p) => p.id === 'subject')

  return (
    <span className="font-mono">
      <span style={{ color: typePart?.color, background: typePart?.bg, padding: '0 4px', borderRadius: 3 }}>
        {type}
      </span>
      {scope && (
        <span style={{ color: scopePart?.color, background: scopePart?.bg, padding: '0 4px', borderRadius: 3 }}>
          {scope}
        </span>
      )}
      {breaking && (
        <span style={{ color: breakingPart?.color, background: breakingPart?.bg, padding: '0 4px', borderRadius: 3 }}>
          {breaking}
        </span>
      )}
      <span className="text-body-mid">{colon}</span>
      <span style={{ color: subjectPart?.color, background: subjectPart?.bg, padding: '0 4px', borderRadius: 3 }}>
        {subject}
      </span>
    </span>
  )
}

export function CommitMessageParser({ data }: CommitMessageParserProps) {
  const types = data?.types ?? DEFAULT_TYPES
  const examples = data?.examples ?? DEFAULT_EXAMPLES
  const parts = data?.parts ?? DEFAULT_PARTS

  const [message, setMessage] = useState(examples[0].message)
  const [selectedExampleId, setSelectedExampleId] = useState(examples[0].id)

  const parsed = useMemo(() => parseCommitMessage(message), [message])
  const lines = message.split('\n')
  const header = lines[0] ?? ''
  const typeMeta = types.find((t) => t.type === parsed.type)

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：仅做本地正则解析，不接入 git hook / commitlint。
      </div>

      {/* 预设示例 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="mb-sm font-mono text-caption-mono-sm text-body-mid">预设示例</div>
        <div className="flex flex-wrap gap-xs">
          {examples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => {
                setMessage(ex.message)
                setSelectedExampleId(ex.id)
              }}
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm transition-all',
                selectedExampleId === ex.id
                  ? 'bg-[#1a6cff] text-white'
                  : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
              )}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* 左：输入 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-center justify-between">
            <h4 className="font-mono text-body-sm text-body-hi">提交消息</h4>
            <span
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm',
                parsed.isValid
                  ? 'bg-[#07c160]/15 text-[#07c160]'
                  : 'bg-[#ef4444]/15 text-[#ef4444]'
              )}
            >
              {parsed.isValid ? '✓ 格式正确' : '✗ 格式错误'}
            </span>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            className="w-full resize-y rounded-sm border border-hairline bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi focus:border-[#1a6cff] focus:outline-none"
            spellCheck={false}
          />

          {/* 错误提示 */}
          {parsed.errors.length > 0 && (
            <div className="mt-md rounded-sm border border-[#ef4444]/30 bg-[#ef4444]/8 p-sm">
              <div className="mb-xs font-mono text-caption-mono-sm font-bold text-[#ef4444]">
                校验警告
              </div>
              <ul className="space-y-xxs">
                {parsed.errors.map((err, i) => (
                  <li key={i} className="font-mono text-caption-mono-sm text-body-hi">
                    · {err}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 右：解析结果 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">解析结果</h4>

          {/* Header 高亮 */}
          <div className="mb-md rounded-sm bg-canvas-bg-inset p-md">
            <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">Header</div>
            <div className="break-all">{highlightHeader(header, parts)}</div>
          </div>

          {/* 解析字段 */}
          <div className="space-y-xs">
            {parsed.type && (
              <div className="flex items-baseline gap-sm">
                <span
                  className="rounded-pill px-xs py-xxs font-mono text-caption-mono-sm"
                  style={{ background: typeMeta?.color ? `${typeMeta.color}20` : undefined, color: typeMeta?.color }}
                >
                  type: {parsed.type}
                </span>
                <span className="text-caption-mono-sm text-body-mid">{typeMeta?.label ?? '未知'}</span>
              </div>
            )}
            {parsed.scope && (
              <div className="flex items-baseline gap-sm">
                <span className="rounded-pill bg-[#1a6cff]/15 px-xs py-xxs font-mono text-caption-mono-sm text-[#1a6cff]">
                  scope: {parsed.scope}
                </span>
              </div>
            )}
            {parsed.breaking && (
              <div className="flex items-baseline gap-sm">
                <span className="rounded-pill bg-[#ef4444]/15 px-xs py-xxs font-mono text-caption-mono-sm text-[#ef4444]">
                  ! 破坏性变更
                </span>
                <span className="text-caption-mono-sm text-body-mid">影响 major 版本号</span>
              </div>
            )}
            {parsed.subject && (
              <div className="flex items-baseline gap-sm">
                <span className="rounded-pill bg-[#a78bfa]/15 px-xs py-xxs font-mono text-caption-mono-sm text-[#a78bfa]">
                  subject
                </span>
                <span className="min-w-0 flex-1 break-words text-caption-mono-sm text-body-hi">
                  {parsed.subject}
                </span>
              </div>
            )}
            {parsed.body && (
              <div className="rounded-sm bg-canvas-bg-inset p-sm">
                <div className="mb-xs font-mono text-caption-mono-sm text-[#f59e0b]">body</div>
                <pre className="whitespace-pre-wrap break-words font-mono text-caption-mono-sm text-body-hi">
                  {parsed.body}
                </pre>
              </div>
            )}
            {parsed.footer && (
              <div className="rounded-sm bg-canvas-bg-inset p-sm">
                <div className="mb-xs font-mono text-caption-mono-sm text-[#7d8590]">footer</div>
                <pre className="whitespace-pre-wrap break-words font-mono text-caption-mono-sm text-body-hi">
                  {parsed.footer}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 字段说明 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">字段说明</h4>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((part) => (
            <div
              key={part.id}
              className="rounded-sm border p-sm"
              style={{ borderColor: part.color, background: part.bg }}
            >
              <div className="font-mono text-caption-mono-sm font-bold" style={{ color: part.color }}>
                {part.label}
              </div>
              <p className="mt-xs text-caption-mono-sm text-body-hi">{part.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* type 类型表 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">type 类型全表</h4>
        <div className="grid grid-cols-2 gap-xs sm:grid-cols-3 lg:grid-cols-4">
          {types.map((t) => (
            <div key={t.type} className="flex items-center gap-xs rounded-sm bg-canvas-bg-inset p-sm">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: t.color }}
              />
              <span className="min-w-0 flex-1">
                <span className="font-mono text-caption-mono-sm font-bold" style={{ color: t.color }}>
                  {t.type}
                </span>
                <span className="ml-xs text-caption-mono-sm text-body-mid">{t.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 自动版本号推断 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">语义化版本号推断</h4>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-3">
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm text-body-mid">PATCH（0.0.X）</div>
            <div className="mt-xs font-mono text-caption-mono-sm font-bold text-[#7d8590]">
              fix / docs / style / chore / refactor
            </div>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm text-body-mid">MINOR（0.X.0）</div>
            <div className="mt-xs font-mono text-caption-mono-sm font-bold text-[#07c160]">
              feat
            </div>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm text-body-mid">MAJOR（X.0.0）</div>
            <div className="mt-xs font-mono text-caption-mono-sm font-bold text-[#ef4444]">
              ! 标记 / BREAKING CHANGE
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
