/**
 * PnpmHardlinkVisualizer — pnpm 硬链接机制可视化
 *
 * 展示 pnpm 全局 store → 硬链接 → 项目 node_modules 符号链接 三层结构，
 * 突出 pnpm 节省磁盘空间 + 消除幽灵依赖的核心优势。
 *
 * ⚠️ 教学模拟：不执行真实 pnpm install，仅展示静态结构与数据。
 */
import { useState } from 'react'
import type {
  PnpmHardlinkVisualizerData,
  PnpmStoreData,
  StorePackage,
  PnpmProjectData,
} from '../../../lib/engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface PnpmHardlinkVisualizerProps {
  data?: PnpmHardlinkVisualizerData
}

/** 默认 pnpm store 数据 */
const DEFAULT_STORE: PnpmStoreData = {
  path: '~/.pnpm-store/v3',
  packages: [
    { name: 'react', version: '19.2.7', size: 245, hardlinkCount: 3, color: '#61dafb' },
    { name: 'react-dom', version: '19.2.7', size: 1240, hardlinkCount: 3, color: '#61dafb' },
    { name: 'lodash', version: '4.17.21', size: 1240, hardlinkCount: 4, color: '#3492ff' },
    { name: 'axios', version: '1.7.0', size: 132, hardlinkCount: 2, color: '#5a29e4' },
    { name: 'typescript', version: '5.5.4', size: 68420, hardlinkCount: 3, color: '#3178c6' },
    { name: 'zustand', version: '5.0.14', size: 28, hardlinkCount: 2, color: '#a78bfa' },
  ],
}

/** 默认项目数据 */
const DEFAULT_PROJECTS: PnpmProjectData[] = [
  {
    name: 'web-app',
    path: '~/projects/web-app',
    color: '#1a6cff',
    dependencies: [
      { name: 'react', version: '19.2.7', linkType: 'symlink' },
      { name: 'react-dom', version: '19.2.7', linkType: 'symlink' },
      { name: 'axios', version: '1.7.0', linkType: 'symlink' },
      { name: 'zustand', version: '5.0.14', linkType: 'symlink' },
    ],
  },
  {
    name: 'admin-panel',
    path: '~/projects/admin-panel',
    color: '#07c160',
    dependencies: [
      { name: 'react', version: '19.2.7', linkType: 'symlink' },
      { name: 'react-dom', version: '19.2.7', linkType: 'symlink' },
      { name: 'lodash', version: '4.17.21', linkType: 'symlink' },
      { name: 'axios', version: '1.7.0', linkType: 'symlink' },
    ],
  },
  {
    name: 'mobile-h5',
    path: '~/projects/mobile-h5',
    color: '#f59e0b',
    dependencies: [
      { name: 'react', version: '19.2.7', linkType: 'symlink' },
      { name: 'lodash', version: '4.17.21', linkType: 'symlink' },
      { name: 'typescript', version: '5.5.4', linkType: 'symlink' },
    ],
  },
]

const DEFAULT_COMPARISON_NOTES: string[] = [
  'npm/yarn：扁平化 node_modules，所有依赖提升到顶层 → 幽灵依赖（项目可访问未声明的包）',
  'npm/yarn：每个项目独立拷贝，react@19.2.7 在 3 个项目中重复占 3×245=735KB',
  'pnpm：全局 store 唯一一份物理拷贝，各项目通过硬链接共享文件内容',
  'pnpm：node_modules/.pnpm/ 中通过符号链接组织依赖树，未声明的包无法访问',
  'pnpm：硬链接共享 inode，节省 50%+ 磁盘空间，安装速度更快',
]

/** 计算两视角下空间占用 */
function calcDiskUsage(store: PnpmStoreData, projects: PnpmProjectData[]) {
  const pnpmSize = store.packages.reduce((sum, p) => sum + p.size, 0)
  // npm/yarn：每个项目都拷贝一份
  const npmSize = projects.reduce(
    (sum, proj) =>
      sum +
      proj.dependencies.reduce((s, d) => {
        const pkg = store.packages.find((p) => p.name === d.name)
        return s + (pkg?.size ?? 0)
      }, 0),
    0
  )
  return { pnpmSize, npmSize, saved: npmSize - pnpmSize, savedPct: Math.round(((npmSize - pnpmSize) / npmSize) * 100) }
}

export function PnpmHardlinkVisualizer({ data }: PnpmHardlinkVisualizerProps) {
  const store = data?.store ?? DEFAULT_STORE
  const projects = data?.projects ?? DEFAULT_PROJECTS
  const comparisonNotes = data?.comparisonNotes ?? DEFAULT_COMPARISON_NOTES

  const [selectedPkg, setSelectedPkg] = useState<string>(store.packages[0]?.name ?? '')
  const [view, setView] = useState<'pnpm' | 'npm'>('pnpm')

  const usage = calcDiskUsage(store, projects)
  const selectedPackage = store.packages.find((p) => p.name === selectedPkg)
  const linkedProjects = projects.filter((p) =>
    p.dependencies.some((d) => d.name === selectedPkg)
  )

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：不执行真实 pnpm install，仅展示静态结构与数据。
      </div>

      {/* 视角切换 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <div className="flex gap-xs">
            <button
              onClick={() => setView('pnpm')}
              className={cn(
                'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-all',
                view === 'pnpm'
                  ? 'bg-[#f59e0b] text-white'
                  : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
              )}
            >
              pnpm 视角
            </button>
            <button
              onClick={() => setView('npm')}
              className={cn(
                'rounded-pill px-md py-xs font-mono text-caption-mono-sm transition-all',
                view === 'npm'
                  ? 'bg-[#cb3837] text-white'
                  : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
              )}
            >
              npm/yarn 视角
            </button>
          </div>
          {/* 空间占用对比 */}
          <div className="flex items-center gap-sm font-mono text-caption-mono-sm">
            <span className="text-body-mid">磁盘占用：</span>
            <span className="rounded-pill bg-[#f59e0b]/15 px-sm py-xs text-[#b45309]">
              pnpm {(usage.pnpmSize / 1024).toFixed(1)}MB
            </span>
            <span className="text-body-mid">vs</span>
            <span className="rounded-pill bg-[#cb3837]/15 px-sm py-xs text-[#cb3837]">
              npm/yarn {(usage.npmSize / 1024).toFixed(1)}MB
            </span>
            <span className="rounded-pill bg-[#07c160]/15 px-sm py-xs text-[#07c160]">
              省 {usage.savedPct}%
            </span>
          </div>
        </div>
      </div>

      {/* 主视图：store + 项目 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        {/* 左：全局 store */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">
            {view === 'pnpm' ? '全局 Store（物理拷贝唯一）' : 'npm 缓存（每项目独立拷贝）'}
          </h4>
          <div className="mb-sm font-mono text-caption-mono-sm text-body-mid">
            {view === 'pnpm' ? store.path : '~/.npm/_cacache（仅缓存，项目内拷贝）'}
          </div>
          <div className="space-y-xs">
            {store.packages.map((pkg: StorePackage) => {
              const isSelected = pkg.name === selectedPkg
              return (
                <button
                  key={pkg.name}
                  onClick={() => setSelectedPkg(pkg.name)}
                  className={cn(
                    'flex w-full items-center gap-sm rounded-sm border px-sm py-xs text-left transition-all',
                    isSelected ? 'border-current' : 'border-hairline hover:border-body-hi'
                  )}
                  style={{
                    background: isSelected ? pkg.bg : 'transparent',
                    color: isSelected ? pkg.color : undefined,
                  }}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: pkg.color }}
                  />
                  <span className="min-w-0 flex-1 truncate font-mono text-caption-mono-sm">
                    {pkg.name}@{pkg.version}
                  </span>
                  <span className="shrink-0 font-mono text-caption-mono-sm text-body-mid">
                    {(pkg.size / 1024).toFixed(1)}MB
                  </span>
                  {view === 'pnpm' && (
                    <span
                      className="shrink-0 rounded-pill px-xs py-xxs font-mono text-caption-mono-sm"
                      style={{ background: pkg.bg, color: pkg.color }}
                    >
                      ×{pkg.hardlinkCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          <div className="mt-md rounded-sm bg-canvas-bg-inset p-sm font-mono text-caption-mono-sm text-body-mid">
            {view === 'pnpm'
              ? '硬链接：所有项目共享同一份 inode，仅占 1 份磁盘空间'
              : '文件拷贝：每个项目独立拷贝，磁盘占用 = 项目数 × 包大小'}
          </div>
        </div>

        {/* 右：项目视图 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">
            项目 node_modules
            {selectedPackage && (
              <span className="ml-xs text-body-mid">→ 高亮 {selectedPackage.name}</span>
            )}
          </h4>
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj) => {
              const hasLink = proj.dependencies.some((d) => d.name === selectedPkg)
              return (
                <div
                  key={proj.name}
                  className={cn(
                    'rounded-sm border p-sm transition-all',
                    hasLink ? 'border-current' : 'border-hairline opacity-60'
                  )}
                  style={{
                    background: hasLink ? `${proj.color}10` : 'transparent',
                    borderColor: hasLink ? proj.color : undefined,
                  }}
                >
                  <div className="mb-xs flex items-center gap-xs">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: proj.color }}
                    />
                    <span className="min-w-0 flex-1 truncate font-mono text-caption-mono-sm font-bold">
                      {proj.name}
                    </span>
                  </div>
                  <div className="space-y-xxs">
                    {proj.dependencies.map((d) => {
                      const pkg = store.packages.find((p) => p.name === d.name)
                      const isSelected = d.name === selectedPkg
                      return (
                        <div
                          key={d.name}
                          className={cn(
                            'flex items-center gap-xs font-mono text-caption-mono-sm',
                            isSelected ? 'font-bold' : 'text-body-mid'
                          )}
                          style={{ color: isSelected ? pkg?.color : undefined }}
                        >
                          <span className="shrink-0">
                            {view === 'pnpm' ? '↪' : '📄'}
                          </span>
                          <span className="min-w-0 flex-1 truncate">
                            {d.name}
                          </span>
                          <span className="shrink-0 text-body-mid">
                            {view === 'pnpm' ? 'symlink' : 'copy'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 选中包详情 */}
      {selectedPackage && (
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex flex-wrap items-baseline justify-between gap-sm">
            <h4 className="font-mono text-body-sm text-body-hi">
              {selectedPackage.name}@{selectedPackage.version}
            </h4>
            <span className="font-mono text-caption-mono-sm text-body-mid">
              被 {linkedProjects.length} 个项目引用 · 共享 inode · 节省{' '}
              {((linkedProjects.length - 1) * selectedPackage.size / 1024).toFixed(1)}MB
            </span>
          </div>
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-sm bg-canvas-bg-inset p-sm">
              <div className="font-mono text-caption-mono-sm text-body-mid">物理大小</div>
              <div className="mt-xs font-mono text-body-sm font-bold">
                {(selectedPackage.size / 1024).toFixed(1)}MB
              </div>
            </div>
            <div className="rounded-sm bg-canvas-bg-inset p-sm">
              <div className="font-mono text-caption-mono-sm text-body-mid">硬链接数</div>
              <div className="mt-xs font-mono text-body-sm font-bold text-[#07c160]">
                {selectedPackage.hardlinkCount}
              </div>
            </div>
            <div className="rounded-sm bg-canvas-bg-inset p-sm">
              <div className="font-mono text-caption-mono-sm text-body-mid">pnpm 占用</div>
              <div className="mt-xs font-mono text-body-sm font-bold text-[#07c160]">
                {(selectedPackage.size / 1024).toFixed(1)}MB
              </div>
            </div>
            <div className="rounded-sm bg-canvas-bg-inset p-sm">
              <div className="font-mono text-caption-mono-sm text-body-mid">npm/yarn 占用</div>
              <div className="mt-xs font-mono text-body-sm font-bold text-[#cb3837]">
                {((selectedPackage.hardlinkCount * selectedPackage.size) / 1024).toFixed(1)}MB
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 与 npm/yarn 差异 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">pnpm vs npm/yarn 关键差异</h4>
        <div className="space-y-xs">
          {comparisonNotes.map((note, i) => (
            <div key={i} className="flex gap-xs rounded-sm bg-canvas-bg-inset p-sm">
              <span className="shrink-0 font-mono text-caption-mono-sm text-body-mid">{i + 1}.</span>
              <span className="text-caption-mono-sm text-body-hi">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
