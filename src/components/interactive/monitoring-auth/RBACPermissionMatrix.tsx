/**
 * RBACPermissionMatrix — RBAC 角色权限矩阵演示
 *
 * 演示基于角色的访问控制（RBAC）：
 * - 角色：admin / editor / viewer
 * - 资源：文章/用户/系统设置
 * - 操作：查看/编辑/删除
 *
 * 交互：选择角色查看权限矩阵；切换用户角色实时展示
 * 按钮级别与路由级别的权限控制效果。
 *
 * ⚠️ 教学模型：权限规则为预设示例。
 */
'use client'

import { useState } from 'react'
import type {
  RBACPermissionMatrixData,
  RBACRole,
  RBACResource,
  RBACPermission,
  RBACRoute,
} from '../../../lib/monitoring-auth-visualization-types'
import { cn } from '../../../lib/utils'

interface RBACPermissionMatrixProps {
  data?: RBACPermissionMatrixData
}

const DEFAULT_ROLES: RBACRole[] = [
  {
    id: 'admin',
    name: '管理员',
    description: '拥有所有权限，可管理用户与系统',
    color: '#ef4444',
    level: 3,
  },
  {
    id: 'editor',
    name: '编辑',
    description: '可管理内容，不能管理用户与系统',
    color: '#07c160',
    level: 2,
  },
  {
    id: 'viewer',
    name: '访客',
    description: '仅可查看，无任何修改权限',
    color: '#1a6cff',
    level: 1,
  },
]

const DEFAULT_RESOURCES: RBACResource[] = [
  { id: 'article', name: '文章', icon: '📄' },
  { id: 'user', name: '用户', icon: '👤' },
  { id: 'system', name: '系统设置', icon: '⚙️' },
]

const DEFAULT_PERMISSIONS: RBACPermission[] = [
  // admin
  { roleId: 'admin', resourceId: 'article', actions: ['view', 'edit', 'delete'] },
  { roleId: 'admin', resourceId: 'user', actions: ['view', 'edit', 'delete'] },
  { roleId: 'admin', resourceId: 'system', actions: ['view', 'edit', 'delete'] },
  // editor
  { roleId: 'editor', resourceId: 'article', actions: ['view', 'edit', 'delete'] },
  { roleId: 'editor', resourceId: 'user', actions: ['view'] },
  { roleId: 'editor', resourceId: 'system', actions: [] },
  // viewer
  { roleId: 'viewer', resourceId: 'article', actions: ['view'] },
  { roleId: 'viewer', resourceId: 'user', actions: [] },
  { roleId: 'viewer', resourceId: 'system', actions: [] },
]

const DEFAULT_ROUTES: RBACRoute[] = [
  { path: '/dashboard', name: '仪表盘', requiredRoles: ['admin', 'editor', 'viewer'] },
  { path: '/articles', name: '文章列表', requiredRoles: ['admin', 'editor', 'viewer'] },
  { path: '/articles/edit', name: '编辑文章', requiredRoles: ['admin', 'editor'] },
  { path: '/users', name: '用户管理', requiredRoles: ['admin'] },
  { path: '/settings', name: '系统设置', requiredRoles: ['admin'] },
]

const ACTION_LABELS: Record<string, string> = {
  view: '查看',
  edit: '编辑',
  delete: '删除',
}

export function RBACPermissionMatrix({ data }: RBACPermissionMatrixProps) {
  const roles = data?.roles ?? DEFAULT_ROLES
  const resources = data?.resources ?? DEFAULT_RESOURCES
  const permissions = data?.permissions ?? DEFAULT_PERMISSIONS
  const routes = data?.routes ?? DEFAULT_ROUTES

  const [currentRole, setCurrentRole] = useState<RBACRole['id']>('viewer')
  const [activeView, setActiveView] = useState<'matrix' | 'button' | 'route'>('matrix')

  const role = roles.find((r) => r.id === currentRole) ?? roles[0]
  if (!role) return null

  /** 判断角色对资源的操作权限 */
  const hasPermission = (resourceId: string, action: string): boolean => {
    const perm = permissions.find((p) => p.roleId === currentRole && p.resourceId === resourceId)
    return perm?.actions.includes(action as any) ?? false
  }

  /** 判断路由是否可访问 */
  const canAccessRoute = (path: string): boolean => {
    const route = routes.find((r) => r.path === path)
    if (!route) return false
    return route.requiredRoles.includes(currentRole)
  }

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface p-md">
      {/* 角色切换 */}
      <div className="mb-md">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          当前登录角色
        </div>
        <div className="flex flex-wrap gap-sm">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setCurrentRole(r.id)}
              className={cn(
                'flex items-center gap-sm rounded-md border px-md py-xs text-body-sm transition-all',
                r.id === currentRole
                  ? 'text-white shadow-sm'
                  : 'border-border-subtle text-body-mid hover:border-accent-sunset',
              )}
              style={r.id === currentRole ? { backgroundColor: r.color, borderColor: r.color } : undefined}
              aria-pressed={r.id === currentRole}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: r.id === currentRole ? '#fff' : r.color }}
              />
              {r.name}
              <span className="text-caption opacity-80">L{r.level}</span>
            </button>
          ))}
        </div>
        <div className="mt-xs text-caption text-body-mid">{role.description}</div>
      </div>

      {/* 视图切换 */}
      <div className="mb-md flex flex-wrap gap-xs">
        {[
          { id: 'matrix', label: '权限矩阵' },
          { id: 'button', label: '按钮级控制' },
          { id: 'route', label: '路由级控制' },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id as any)}
            className={cn(
              'rounded-md border px-sm py-xs text-caption transition-colors',
              v.id === activeView
                ? 'border-accent-sunset bg-accent-sunset/10 text-accent-sunset'
                : 'border-border-subtle text-body-mid hover:border-accent-sunset',
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* 权限矩阵视图 */}
      {activeView === 'matrix' && (
        <div className="mb-md overflow-x-auto">
          <table className="w-full border-collapse text-body-sm">
            <thead>
              <tr>
                <th className="border border-border-subtle bg-bg-base p-sm text-left text-caption-mono-sm uppercase text-body-mid">
                  资源 ＼ 角色
                </th>
                {roles.map((r) => (
                  <th
                    key={r.id}
                    className="border border-border-subtle p-sm text-center font-mono text-caption"
                    style={{
                      backgroundColor: r.id === currentRole ? `${r.color}20` : undefined,
                      color: r.color,
                    }}
                  >
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td className="border border-border-subtle bg-bg-base p-sm">
                    <span className="mr-xs">{resource.icon}</span>
                    {resource.name}
                  </td>
                  {roles.map((r) => {
                    const perm = permissions.find(
                      (p) => p.roleId === r.id && p.resourceId === resource.id,
                    )
                    const actions = perm?.actions ?? []
                    return (
                      <td
                        key={r.id}
                        className={cn(
                          'border border-border-subtle p-sm text-center',
                          r.id === currentRole && 'bg-accent-sunset/5',
                        )}
                      >
                        <div className="flex flex-wrap justify-center gap-xs">
                          {(['view', 'edit', 'delete'] as const).map((action) => {
                            const has = actions.includes(action)
                            return (
                              <span
                                key={action}
                                className={cn(
                                  'rounded px-1 text-caption-mono-sm',
                                  has
                                    ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                                    : 'bg-red-100 text-red-700 line-through dark:bg-red-950/30 dark:text-red-400',
                                )}
                              >
                                {ACTION_LABELS[action]}
                              </span>
                            )
                          })}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 按钮级控制视图 */}
      {activeView === 'button' && (
        <div className="mb-md">
          <div className="mb-sm text-caption text-body-mid">
            以「文章管理」页面为例，按钮根据角色权限显示/禁用/隐藏：
          </div>
          <div className="rounded-md border border-border-subtle bg-bg-base p-md">
            <div className="mb-sm flex items-center gap-sm">
              <span className="text-h5">📄</span>
              <span className="text-body-base font-medium">文章列表</span>
            </div>
            <div className="flex flex-wrap gap-sm">
              <button
                disabled={!hasPermission('article', 'view')}
                className={cn(
                  'rounded-md border px-md py-xs text-body-sm',
                  hasPermission('article', 'view')
                    ? 'border-accent-sunset text-accent-sunset hover:bg-accent-sunset hover:text-white'
                    : 'cursor-not-allowed border-border-subtle text-body-mid opacity-50',
                )}
              >
                👁 查看文章
              </button>
              <button
                disabled={!hasPermission('article', 'edit')}
                className={cn(
                  'rounded-md border px-md py-xs text-body-sm',
                  hasPermission('article', 'edit')
                    ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                    : 'cursor-not-allowed border-border-subtle text-body-mid opacity-50',
                )}
              >
                ✏ 编辑
              </button>
              <button
                disabled={!hasPermission('article', 'delete')}
                className={cn(
                  'rounded-md border px-md py-xs text-body-sm',
                  hasPermission('article', 'delete')
                    ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                    : 'cursor-not-allowed border-border-subtle text-body-mid opacity-50',
                )}
              >
                🗑 删除
              </button>
            </div>

            <div className="mt-md rounded-md bg-bg-surface p-sm">
              <div className="text-caption-mono-sm uppercase text-body-mid">实现代码</div>
              <pre className="mt-xs overflow-x-auto font-mono text-caption text-text-base">
{`// 权限指令 / Hook
const { hasPermission } = useRBAC();

<Button disabled={!hasPermission('article', 'edit')}>
  编辑
</Button>

// 或条件渲染（更安全）
{hasPermission('article', 'delete') && (
  <DeleteButton />
)}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 路由级控制视图 */}
      {activeView === 'route' && (
        <div className="mb-md">
          <div className="mb-sm text-caption text-body-mid">
            路由守卫：当前角色（{role.name}）可访问以下路由：
          </div>
          <div className="space-y-xs">
            {routes.map((route) => {
              const canAccess = canAccessRoute(route.path)
              return (
                <div
                  key={route.path}
                  className={cn(
                    'flex items-center justify-between rounded-md border p-sm',
                    canAccess
                      ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
                      : 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/20',
                  )}
                >
                  <div className="flex items-center gap-sm">
                    <span className={canAccess ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                      {canAccess ? '✓' : '✗'}
                    </span>
                    <code className="font-mono text-body-sm text-text-base">{route.path}</code>
                    <span className="text-caption text-body-mid">{route.name}</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    {route.requiredRoles.map((rid) => {
                      const r = roles.find((x) => x.id === rid)
                      return (
                        <span
                          key={rid}
                          className="rounded px-1 text-caption-mono-sm"
                          style={{
                            backgroundColor: `${r?.color}20`,
                            color: r?.color,
                          }}
                        >
                          {r?.name}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-md rounded-md border border-border-subtle bg-bg-base p-md">
            <div className="text-caption-mono-sm uppercase text-body-mid">路由守卫实现</div>
            <pre className="mt-xs overflow-x-auto font-mono text-caption text-text-base">
{`// Next.js middleware
export function middleware(req: NextRequest) {
  const user = getUserFromCookie(req);
  const path = req.nextUrl.pathname;

  const route = routes.find(r => r.path === path);
  if (route && !route.requiredRoles.includes(user.role)) {
    return NextResponse.redirect(new URL('/403', req.url));
  }
}

// React Router 守卫
<Route
  path="/users"
  element={
    <RequireRole roles={['admin']}>
      <UserManagement />
    </RequireRole>
  }
/>`}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-md rounded-md bg-accent-sunset/5 p-sm text-caption text-body-mid">
        💡 RBAC 三原则：1）用户关联角色，角色关联权限（不直接关联用户）；2）前端控制仅为体验优化，后端必须二次校验；3）权限粒度：路由级 &gt; 按钮/接口级 &gt; 数据级（行/字段）。
      </div>
    </div>
  )
}
