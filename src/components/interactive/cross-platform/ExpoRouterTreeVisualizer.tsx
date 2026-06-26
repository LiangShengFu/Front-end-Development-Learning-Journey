/**
 * ExpoRouterTreeVisualizer — Expo Router 路由树可视化
 *
 * 展示 Expo Router 文件约定式路由结构：app/ 目录树 → 路由 pattern 映射。
 * 可点击树节点查看对应的路由 pattern 与页面代码。
 *
 * ⚠️ 教学模拟：展示静态路由树结构与代码，不执行真实 Expo Router 编译。
 */
import { useState } from 'react'
import type { ExpoRouterTreeVisualizerData, ExpoRouteNode, ExpoRouteType } from '../../../lib/cross-platform-visualization-types'
import { cn } from '../../../lib/utils'

interface ExpoRouterTreeVisualizerProps {
  data?: ExpoRouterTreeVisualizerData
}

const TYPE_THEME: Record<ExpoRouteType, { color: string; bg: string; icon: string; label: string }> = {
  directory: { color: '#7d8590', bg: 'rgba(125,133,144,0.08)', icon: 'folder', label: '目录' },
  route: { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', icon: 'file', label: '路由' },
  layout: { color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', icon: 'layout', label: '布局' },
  group: { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', icon: 'group', label: '分组' },
}

/** 默认路由树 */
const DEFAULT_TREE: ExpoRouteNode = {
  path: 'app/',
  label: 'app/',
  type: 'directory',
  children: [
    {
      path: '_layout.tsx',
      label: '_layout.tsx',
      type: 'layout',
      routePattern: '根布局',
      codeSnippet: `import { Stack } from 'expo-router'

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />
}`,
      codeLanguage: 'tsx',
    },
    {
      path: 'index.tsx',
      label: 'index.tsx',
      type: 'route',
      routePattern: '/',
      codeSnippet: `import { Text, View } from 'react-native'

export default function Home() {
  return (
    <View>
      <Text>首页</Text>
    </View>
  )
}`,
      codeLanguage: 'tsx',
    },
    {
      path: '(tabs)/',
      label: '(tabs)/',
      type: 'group',
      routePattern: '/tabs（不出现在 URL）',
      children: [
        {
          path: '_layout.tsx',
          label: '_layout.tsx',
          type: 'layout',
          routePattern: 'Tab 布局',
          codeSnippet: `import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="profile" />
    </Tabs>
  )
}`,
          codeLanguage: 'tsx',
        },
        {
          path: 'home.tsx',
          label: 'home.tsx',
          type: 'route',
          routePattern: '/tabs/home',
          codeSnippet: `export default function HomeTab() {
  return <Text>Home Tab</Text>
}`,
          codeLanguage: 'tsx',
        },
        {
          path: 'search.tsx',
          label: 'search.tsx',
          type: 'route',
          routePattern: '/tabs/search',
          codeSnippet: `export default function SearchTab() {
  return <Text>Search Tab</Text>
}`,
          codeLanguage: 'tsx',
        },
        {
          path: 'profile.tsx',
          label: 'profile.tsx',
          type: 'route',
          routePattern: '/tabs/profile',
          codeSnippet: `export default function ProfileTab() {
  return <Text>Profile Tab</Text>
}`,
          codeLanguage: 'tsx',
        },
      ],
    },
    {
      path: 'profile/[id].tsx',
      label: 'profile/[id].tsx',
      type: 'route',
      routePattern: '/profile/:id',
      codeSnippet: `import { useLocalSearchParams } from 'expo-router'

export default function Profile() {
  const { id } = useLocalSearchParams()
  return <Text>用户 ID: {id}</Text>
}`,
      codeLanguage: 'tsx',
    },
    {
      path: 'settings/',
      label: 'settings/',
      type: 'directory',
      children: [
        {
          path: 'index.tsx',
          label: 'index.tsx',
          type: 'route',
          routePattern: '/settings',
          codeSnippet: `export default function Settings() {
  return <Text>设置页</Text>
}`,
          codeLanguage: 'tsx',
        },
        {
          path: 'account.tsx',
          label: 'account.tsx',
          type: 'route',
          routePattern: '/settings/account',
          codeSnippet: `export default function AccountSettings() {
  return <Text>账号设置</Text>
}`,
          codeLanguage: 'tsx',
        },
      ],
    },
  ],
}

/** 树节点渲染 */
function TreeNode({
  node,
  depth,
  selectedPath,
  onSelect,
}: {
  node: ExpoRouteNode
  depth: number
  selectedPath: string
  onSelect: (node: ExpoRouteNode) => void
}) {
  const theme = TYPE_THEME[node.type]
  const isSelected = selectedPath === node.path
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="min-w-0">
      <button
        onClick={() => onSelect(node)}
        className={cn(
          'flex w-full items-center gap-xs rounded-sm border py-xs pr-sm text-left transition-all',
          isSelected ? 'border-current' : 'border-transparent hover:border-hairline'
        )}
        style={{
          // 使用 paddingLeft 内缩而非 marginLeft 外推，避免按钮实际宽度 = 100% + margin 造成越界
          paddingLeft: `${depth * 16 + 12}px`,
          background: isSelected ? theme.bg : 'transparent',
          color: isSelected ? theme.color : undefined,
        }}
      >
        <span className="shrink-0 font-mono text-caption-mono-sm" style={{ color: theme.color }}>
          {node.type === 'directory' || node.type === 'group' ? '▸' : '◇'}
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
          className="ml-auto shrink-0 rounded-pill px-xs py-xxs text-caption-mono-sm"
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

/** 查找所有可点击的路由/布局节点 */
function findClickableNodes(node: ExpoRouteNode, result: ExpoRouteNode[] = []): ExpoRouteNode[] {
  if (node.type === 'route' || node.type === 'layout') {
    result.push(node)
  }
  if (node.children) {
    node.children.forEach((child) => findClickableNodes(child, result))
  }
  return result
}

export function ExpoRouterTreeVisualizer({ data }: ExpoRouterTreeVisualizerProps) {
  const tree = data?.routeTree ?? DEFAULT_TREE
  const clickableNodes = findClickableNodes(tree)
  const [selectedPath, setSelectedPath] = useState<string>(clickableNodes[0]?.path ?? '')

  const selected = clickableNodes.find((n) => n.path === selectedPath) ?? clickableNodes[0]
  const theme = selected ? TYPE_THEME[selected.type] : TYPE_THEME.route

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示静态路由树结构与代码，不执行真实 Expo Router 文件系统扫描与编译。
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* 路由树 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">app/ 目录树</h4>
          {/* overflow-x-auto 作为深层节点保险，正常情况下 paddingLeft 已避免越界 */}
          <div className="space-y-xs overflow-x-auto">
            <TreeNode
              node={tree}
              depth={0}
              selectedPath={selectedPath}
              onSelect={(n) => setSelectedPath(n.path)}
            />
          </div>

          {/* 节点类型图例 */}
          <div className="mt-lg flex flex-wrap gap-sm">
            {(Object.keys(TYPE_THEME) as ExpoRouteType[]).map((t) => (
              <div key={t} className="flex items-center gap-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: TYPE_THEME[t].color }} />
                <span className="text-caption-mono-sm text-body-mid">{TYPE_THEME[t].label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 路由详情 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          {selected ? (
            <>
              <div className="mb-md flex items-center justify-between">
                <h4 className="font-mono text-body-sm text-body-hi">{selected.label}</h4>
                <span className="rounded-pill px-sm py-xs text-caption-mono-sm" style={{ background: theme.bg, color: theme.color }}>
                  {theme.label}
                </span>
              </div>

              {/* 路由 pattern */}
              {selected.routePattern && (
                <div className="mb-md rounded-sm bg-canvas-bg-inset p-sm">
                  <div className="text-caption-mono-sm text-body-mid">路由 Pattern</div>
                  <div className="mt-xs font-mono text-body-sm font-bold" style={{ color: theme.color }}>
                    {selected.routePattern}
                  </div>
                </div>
              )}

              {/* 页面代码 */}
              {selected.codeSnippet && (
                <div>
                  <div className="mb-xs text-caption-mono-sm text-body-mid">页面代码</div>
                  <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
                    {selected.codeSnippet}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-body-sm text-body-mid">
              点击左侧树节点查看路由详情
            </div>
          )}
        </div>
      </div>

      {/* 约定规则说明 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">Expo Router 文件约定规则</h4>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#1a6cff]">index.tsx</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">目录的默认路由，映射为 /</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#a78bfa]">_layout.tsx</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">布局组件，包裹同层及子路由</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#f59e0b]">(group)/</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">路由分组，不出现在 URL 路径中</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#1a6cff]">[id].tsx</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">动态路由参数，映射为 :id</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#1a6cff]">[...slug].tsx</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">Catch-all 路由，匹配多级路径</p>
          </div>
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="font-mono text-caption-mono-sm font-bold text-[#7d8590]">+not-found.tsx</div>
            <p className="mt-xs text-caption-mono-sm text-body-mid">404 页面，未匹配路由时展示</p>
          </div>
        </div>
      </div>
    </div>
  )
}
