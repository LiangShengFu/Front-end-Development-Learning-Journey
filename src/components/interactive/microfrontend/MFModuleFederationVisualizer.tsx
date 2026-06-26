/**
 * MFModuleFederationVisualizer — Module Federation 配置演示
 *
 * 展示 Webpack 5 Module Federation 的三角色配置：
 * - Host（宿主）：通过 remotes 引用远程模块
 * - Remote（远程）：通过 exposes 暴露自身模块
 * - Shared（共享）：通过 shared 协商共享依赖（React/Vue 等）
 *
 * 交互：点击角色切换，展示对应 Webpack 配置与关键字段说明。
 *
 * ⚠️ 教学模拟：不实际执行构建。
 */
'use client'

import { useState } from 'react'
import type {
  MFModuleFederationData,
  MFConfigRole,
  MFRoleId,
} from '../../../lib/microfrontend-visualization-types'
import { cn } from '../../../lib/utils'

interface MFModuleFederationVisualizerProps {
  data?: MFModuleFederationData
}

/** 默认三角色配置数据 */
const DEFAULT_ROLES: MFConfigRole[] = [
  {
    id: 'host',
    name: 'Host 宿主应用',
    description:
      '主应用通过 remotes 声明引用的远程模块，构建时生成容器引用，运行时从远程加载 remoteEntry.js。',
    codeSnippet: `// webpack.config.js (host)
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true },
      },
    }),
  ],
}

// host 使用远程模块（React.lazy 异步加载）
import { lazy, Suspense } from 'react'
const RemoteApp = lazy(() => import('remoteApp/App'))

function App() {
  return (
    <Suspense fallback="Loading...">
      <RemoteApp />
    </Suspense>
  )
}`,
    fields: [
      { name: 'name', purpose: '当前应用名称，作为容器标识' },
      { name: 'remotes', purpose: '引用的远程模块映射（key=别名，value=远程入口）' },
      { name: 'shared', purpose: '共享依赖配置，避免多实例冲突' },
      { name: 'singleton', purpose: '强制全局单例（React 必须开启）' },
      { name: 'requiredVersion', purpose: '协商最低版本，不匹配时告警' },
    ],
    color: '#1a6cff',
  },
  {
    id: 'remote',
    name: 'Remote 远程应用',
    description:
      '子应用通过 exposes 暴露自身的模块/组件，构建时生成 remoteEntry.js 供 Host 加载。',
    codeSnippet: `// webpack.config.js (remote)
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
        './utils': './src/utils',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true },
      },
    }),
  ],
}

// remote 应用本身也可独立运行
export default function App() {
  return <div>Remote App</div>
}`,
    fields: [
      { name: 'name', purpose: '远程应用名称，需与 Host remotes 配置一致' },
      { name: 'filename', purpose: '远程入口文件名（默认 remoteEntry.js）' },
      { name: 'exposes', purpose: '对外暴露的模块映射（key=路径，value=源码路径）' },
      { name: 'shared', purpose: '声明可共享的依赖，与 Host 协商' },
    ],
    color: '#a78bfa',
  },
  {
    id: 'shared',
    name: 'Shared 共享依赖',
    description:
      'shared 配置让多个应用共享同一份依赖（如 React），singleton: true 确保全局只有一个实例，避免多实例冲突。',
    codeSnippet: `// 共享依赖协商机制
shared: {
  react: {
    singleton: true,        // 全局单例
    requiredVersion: '^18.0.0',
    eager: false,           // 是否同步加载（false 推荐）
  },
  'react-dom': {
    singleton: true,
  },
  'lodash': {
    singleton: false,       // 允许多实例
    version: '^4.17.0',
  }
}

// 协商流程：
// 1. Host 启动，注册 shared react@18.2.0
// 2. Remote 加载，发现已有 react@18.2.0，复用
// 3. 若版本不匹配且 singleton=true，使用已注册版本并告警
// 4. 若 singleton=false，各自加载自己的版本`,
    fields: [
      { name: 'singleton', purpose: '是否强制单例（React 必须为 true）' },
      { name: 'requiredVersion', purpose: '要求的最小版本，semver 范围' },
      { name: 'eager', purpose: '是否在入口同步加载（false 推荐异步）' },
      { name: 'version', purpose: '当前提供的版本号' },
    ],
    color: '#07c160',
  },
]

export function MFModuleFederationVisualizer({ data }: MFModuleFederationVisualizerProps) {
  const roles = data?.roles ?? DEFAULT_ROLES
  const sharedNote =
    data?.sharedNote ??
    '运行时共享：shared 配置让多个应用共享同一份依赖（如 React），singleton: true 确保全局只有一个实例，避免 React 多实例导致的 Hooks 报错。版本不匹配时按 requiredVersion 协商。'

  const [selectedId, setSelectedId] = useState<MFRoleId>('host')
  // 安全回退：若 selectedId 与数据不匹配，回退到第一个角色
  const selected = roles.find((r) => r.id === selectedId) ?? roles[0]

  if (!selected) {
    return <div className="text-body-sm text-body-mid">无可用角色</div>
  }

  return (
    <div className="space-y-lg">
      {/* 角色切换 */}
      <div
        className="flex flex-wrap items-center gap-xs"
        role="group"
        aria-label="Module Federation 角色切换"
      >
        {roles.map((r) => {
          const isActive = r.id === selectedId
          return (
            <button
              key={r.id}
              onClick={() => setSelectedId(r.id)}
              aria-pressed={isActive}
              style={
                isActive
                  ? { backgroundColor: r.color, borderColor: r.color }
                  : undefined
              }
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas text-ink hover:border-ink/30',
              )}
            >
              {r.name}
            </button>
          )
        })}
      </div>

      {/* 角色描述 */}
      <div
        className="rounded-sm border-l-4 p-md"
        style={{
          borderLeftColor: selected.color,
          backgroundColor: `${selected.color}10`,
        }}
      >
        <h4 className="mb-sm text-heading-4 text-ink">{selected.name}</h4>
        <p className="text-body-sm text-body">{selected.description}</p>
      </div>

      {/* 代码示例 */}
      <div>
        <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
          Webpack 配置示例
        </div>
        <pre className="overflow-x-auto rounded-md border border-hairline bg-canvas-soft p-md">
          <code className="font-mono text-caption-mono-sm text-ink">
            {selected.codeSnippet}
          </code>
        </pre>
      </div>

      {/* 关键字段说明 */}
      <div>
        <div className="mb-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
          关键字段说明
        </div>
        <div className="space-y-xs">
          {selected.fields.map((field) => (
            <div
              key={field.name}
              className="flex flex-col gap-xxs rounded-sm border border-hairline bg-canvas p-sm sm:flex-row sm:items-center sm:gap-md"
            >
              <code
                className="rounded-sm px-xs py-xxs font-mono text-caption-mono-sm text-white"
                style={{ backgroundColor: selected.color }}
              >
                {field.name}
              </code>
              <span className="text-body-sm text-body">{field.purpose}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 共享说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {sharedNote}
      </p>

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模拟 · 不实际执行构建
      </p>
    </div>
  )
}
