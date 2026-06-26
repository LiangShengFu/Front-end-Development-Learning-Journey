/**
 * MonorepoTreeVisualizer — pnpm workspace Monorepo 结构可视化
 *
 * 展示 Monorepo 项目树（root / workspace / package / config）+ pnpm-workspace.yaml 配置，
 * 可点击节点查看包的依赖、配置代码。
 *
 * ⚠️ 教学模拟：不扫描真实文件系统，仅展示静态项目树与配置。
 */
import { useState } from 'react'
import type {
  MonorepoTreeVisualizerData,
  MonorepoNode,
  MonorepoNodeType,
} from '../../../lib/engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface MonorepoTreeVisualizerProps {
  data?: MonorepoTreeVisualizerData
}

const TYPE_THEME: Record<MonorepoNodeType, { color: string; bg: string; icon: string; label: string }> = {
  root: { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', icon: '◆', label: '根' },
  workspace: { color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', icon: '◇', label: 'workspace' },
  package: { color: '#07c160', bg: 'rgba(7,193,96,0.10)', icon: '◈', label: 'package' },
  config: { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', icon: '○', label: 'config' },
}

const DEFAULT_ROOT: MonorepoNode = {
  path: 'monorepo/',
  label: 'monorepo/',
  type: 'root',
  description: 'pnpm workspace 根目录',
  children: [
    {
      path: 'monorepo/pnpm-workspace.yaml',
      label: 'pnpm-workspace.yaml',
      type: 'config',
      description: 'workspace 配置，指定 packages/* 与 apps/* 为工作区',
      codeSnippet: `packages:
  - 'apps/*'
  - 'packages/*'
  - 'tools/*'`,
      codeLanguage: 'yaml',
    },
    {
      path: 'monorepo/package.json',
      label: 'package.json (root)',
      type: 'config',
      description: '根 package.json，仅含 devDeps 与 scripts',
      codeSnippet: `{
  "name": "monorepo",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.5.0"
  }
}`,
      codeLanguage: 'json',
    },
    {
      path: 'monorepo/apps/',
      label: 'apps/',
      type: 'workspace',
      description: '应用层工作区',
      children: [
        {
          path: 'monorepo/apps/web/',
          label: 'web/',
          type: 'package',
          description: '面向 C 端用户的 Web 应用',
          dependencies: ['@repo/ui', '@repo/api', '@repo/utils', 'react', 'react-dom'],
          codeSnippet: `{
  "name": "@repo/web",
  "version": "1.0.0",
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/api": "workspace:*",
    "react": "^19.0.0"
  }
}`,
          codeLanguage: 'json',
        },
        {
          path: 'monorepo/apps/admin/',
          label: 'admin/',
          type: 'package',
          description: '后台管理系统',
          dependencies: ['@repo/ui', '@repo/api', '@repo/admin-sdk'],
          codeSnippet: `{
  "name": "@repo/admin",
  "version": "1.0.0",
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/api": "workspace:*"
  }
}`,
          codeLanguage: 'json',
        },
        {
          path: 'monorepo/apps/mobile/',
          label: 'mobile/',
          type: 'package',
          description: 'H5 移动端',
          dependencies: ['@repo/ui', '@repo/api'],
          codeSnippet: `{
  "name": "@repo/mobile",
  "version": "1.0.0",
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/api": "workspace:*"
  }
}`,
          codeLanguage: 'json',
        },
      ],
    },
    {
      path: 'monorepo/packages/',
      label: 'packages/',
      type: 'workspace',
      description: '共享包工作区',
      children: [
        {
          path: 'monorepo/packages/ui/',
          label: 'ui/',
          type: 'package',
          description: 'UI 组件库，被所有 apps 复用',
          dependencies: ['react', 'clsx', 'tailwindcss'],
          codeSnippet: `{
  "name": "@repo/ui",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": {
    "react": "^19.0.0",
    "clsx": "^2.0.0"
  }
}`,
          codeLanguage: 'json',
        },
        {
          path: 'monorepo/packages/api/',
          label: 'api/',
          type: 'package',
          description: 'API 客户端 SDK，封装接口请求',
          dependencies: ['axios', '@repo/utils'],
          codeSnippet: `{
  "name": "@repo/api",
  "version": "0.1.0",
  "dependencies": {
    "axios": "^1.7.0",
    "@repo/utils": "workspace:*"
  }
}`,
          codeLanguage: 'json',
        },
        {
          path: 'monorepo/packages/utils/',
          label: 'utils/',
          type: 'package',
          description: '通用工具函数',
          dependencies: ['lodash'],
          codeSnippet: `{
  "name": "@repo/utils",
  "version": "0.1.0",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}`,
          codeLanguage: 'json',
        },
      ],
    },
    {
      path: 'monorepo/tools/',
      label: 'tools/',
      type: 'workspace',
      description: '工具脚本工作区',
      children: [
        {
          path: 'monorepo/tools/scripts/',
          label: 'scripts/',
          type: 'package',
          description: '构建/部署/数据库脚本',
          dependencies: ['@repo/utils'],
          codeSnippet: `{
  "name": "@repo/scripts",
  "version": "0.0.1",
  "private": true
}`,
          codeLanguage: 'json',
        },
      ],
    },
    {
      path: 'monorepo/turbo.json',
      label: 'turbo.json',
      type: 'config',
      description: 'Turborepo 任务编排配置',
      codeSnippet: `{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": { "cache": false, "persistent": true },
    "lint": {},
    "test": { "dependsOn": ["build"] }
  }
}`,
      codeLanguage: 'json',
    },
  ],
}

/** 收集所有可点击节点（package / config） */
function collectClickable(node: MonorepoNode, result: MonorepoNode[] = []): MonorepoNode[] {
  if (node.type === 'package' || node.type === 'config') {
    result.push(node)
  }
  if (node.children) {
    node.children.forEach((c) => collectClickable(c, result))
  }
  return result
}

/** 树节点渲染（使用 paddingLeft 内缩，避免越界） */
function TreeNode({
  node,
  depth,
  selectedPath,
  onSelect,
}: {
  node: MonorepoNode
  depth: number
  selectedPath: string
  onSelect: (node: MonorepoNode) => void
}) {
  const theme = TYPE_THEME[node.type]
  const isSelected = selectedPath === node.path
  const isClickable = node.type === 'package' || node.type === 'config'
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="min-w-0">
      <button
        onClick={() => isClickable && onSelect(node)}
        disabled={!isClickable}
        className={cn(
          'flex w-full items-center gap-xs rounded-sm border py-xs pr-sm text-left transition-all',
          isClickable
            ? isSelected
              ? 'border-current'
              : 'border-transparent hover:border-hairline'
            : 'border-transparent cursor-default'
        )}
        style={{
          paddingLeft: `${depth * 16 + 12}px`,
          background: isSelected ? theme.bg : 'transparent',
          color: isSelected ? theme.color : undefined,
        }}
      >
        <span className="shrink-0 font-mono text-caption-mono-sm" style={{ color: theme.color }}>
          {hasChildren ? theme.icon : theme.icon}
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 truncate font-mono text-caption-mono-sm',
            isSelected ? 'font-bold' : 'text-body-hi'
          )}
          style={{ color: isSelected ? theme.color : undefined }}
          title={node.label}
        >
          {node.label}
        </span>
        <span
          className="ml-auto shrink-0 rounded-pill px-xs py-xxs font-mono text-caption-mono-sm"
          style={{ background: theme.bg, color: theme.color }}
        >
          {theme.label}
        </span>
      </button>
      {hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function MonorepoTreeVisualizer({ data }: MonorepoTreeVisualizerProps) {
  const root = data?.root ?? DEFAULT_ROOT
  const workspaceConfig = data?.workspaceConfig ?? `packages:
  - 'apps/*'
  - 'packages/*'
  - 'tools/*'`

  const clickableNodes = collectClickable(root)
  const [selectedPath, setSelectedPath] = useState<string>(clickableNodes[0]?.path ?? '')
  const selected = clickableNodes.find((n) => n.path === selectedPath) ?? clickableNodes[0]
  const theme = selected ? TYPE_THEME[selected.type] : TYPE_THEME.package

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：不扫描真实文件系统，仅展示静态项目树与配置。
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* 左：项目树 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">Monorepo 目录树</h4>
          <div className="space-y-xs overflow-x-auto">
            <TreeNode
              node={root}
              depth={0}
              selectedPath={selectedPath}
              onSelect={(n) => setSelectedPath(n.path)}
            />
          </div>

          {/* 节点类型图例 */}
          <div className="mt-lg flex flex-wrap gap-sm">
            {(Object.keys(TYPE_THEME) as MonorepoNodeType[]).map((t) => (
              <div key={t} className="flex items-center gap-xs">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: TYPE_THEME[t].color }}
                />
                <span className="font-mono text-caption-mono-sm text-body-mid">
                  {TYPE_THEME[t].label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 右：节点详情 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          {selected ? (
            <>
              <div className="mb-md flex items-center justify-between">
                <h4 className="break-all font-mono text-body-sm text-body-hi">
                  {selected.label}
                </h4>
                <span
                  className="ml-xs shrink-0 rounded-pill px-sm py-xs font-mono text-caption-mono-sm"
                  style={{ background: theme.bg, color: theme.color }}
                >
                  {theme.label}
                </span>
              </div>

              {selected.description && (
                <p className="mb-md text-body-sm text-body-mid">{selected.description}</p>
              )}

              {/* 依赖列表（仅 package 类型） */}
              {selected.dependencies && selected.dependencies.length > 0 && (
                <div className="mb-md rounded-sm bg-canvas-bg-inset p-sm">
                  <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">
                    依赖（{selected.dependencies.length}）
                  </div>
                  <div className="flex flex-wrap gap-xs">
                    {selected.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className={cn(
                          'rounded-pill px-xs py-xxs font-mono text-caption-mono-sm',
                          dep.startsWith('@repo/')
                            ? 'bg-[#07c160]/15 text-[#07c160]'
                            : 'bg-canvas-bg-hover text-body-mid'
                        )}
                      >
                        {dep}
                        {dep.startsWith('@repo/') && (
                          <span className="ml-xs text-body-mid">workspace:*</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 代码 */}
              {selected.codeSnippet && (
                <div>
                  <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">
                    {selected.codeLanguage ?? 'code'}
                  </div>
                  <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
                    {selected.codeSnippet}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-body-sm text-body-mid">
              点击左侧树节点查看详情
            </div>
          )}
        </div>
      </div>

      {/* pnpm-workspace.yaml */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">pnpm-workspace.yaml</h4>
        <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
          {workspaceConfig}
        </pre>
      </div>

      {/* Monorepo 核心概念 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">Monorepo 核心概念</h4>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#1a6cff]">workspace:*</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              工作区协议，符号链接本地包，无需发布即可引用
            </p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#07c160]">原子提交</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              多包变更一次提交，保证 apps 与 packages 一致性
            </p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#a78bfa]">统一版本</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              changesets 统一管理所有包版本号与发布
            </p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#f59e0b]">依赖复用</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              共享 devDependencies 提升至根，子项目无需重复声明
            </p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#ef4444]">增量构建</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              Turborepo 基于依赖图 + 缓存，仅构建变更影响范围
            </p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#0ea5e9]">任务并行</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">
              不冲突的任务并行执行，缩短 CI 时间
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
