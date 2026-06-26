/**
 * ModuleSystemComparator — CommonJS vs ESM 模块系统对比
 *
 * 从多个维度（语法、加载时机、循环依赖处理、tree-shaking、顶层 this 等）对比
 * CommonJS 与 ESM（ECMAScript Modules）两种模块系统。
 *
 * 交互：点击维度卡片切换；同时展示两种语法的代码示例对照。
 *
 * ⚠️ 教学模拟：静态对比，不执行真实模块加载。
 */
import { useState } from 'react'
import type {
  ModuleSystemComparatorData,
  ModuleSystemDimension,
} from '../../../lib/nodejs-visualization-types'
import { cn } from '../../../lib/utils'

interface ModuleSystemComparatorProps {
  data?: ModuleSystemComparatorData
}

/** 默认对比维度数据 */
const DEFAULT_DIMENSIONS: ModuleSystemDimension[] = [
  {
    id: 'syntax',
    dimension: '语法',
    commonjs: 'require() / module.exports / exports',
    esm: 'import / export / export default',
    recommended: 'both',
    color: '#1a6cff',
  },
  {
    id: 'loading',
    dimension: '加载时机',
    commonjs: '运行时加载（动态）：require 时才执行模块代码，可放在函数/条件分支中',
    esm: '编译时确定（静态）：import 必须在顶层，模块在执行前已加载完毕',
    recommended: 'esm',
    color: '#07c160',
  },
  {
    id: 'circular',
    dimension: '循环依赖处理',
    commonjs: '返回已执行部分的快照（可能为 {}），易出现"部分导出"问题',
    esm: '通过"活绑定"（live binding）引用，能拿到最终值，但执行顺序仍需谨慎',
    recommended: 'esm',
    color: '#a78bfa',
  },
  {
    id: 'tree-shaking',
    dimension: 'Tree-shaking',
    commonjs: '难以静态分析，打包工具基本无法 tree-shaking',
    esm: '静态结构便于分析，Webpack/Rollup/Vite 可有效消除未使用导出',
    recommended: 'esm',
    color: '#f59e0b',
  },
  {
    id: 'top-level-this',
    dimension: '顶层 this',
    commonjs: 'this 指向 module.exports（即当前模块）',
    esm: 'this 为 undefined（严格模式）',
    recommended: 'esm',
    color: '#ec4899',
  },
  {
    id: 'strict-mode',
    dimension: '严格模式',
    commonjs: '默认非严格模式（除非文件顶部声明 "use strict"）',
    esm: '默认严格模式，不可关闭',
    recommended: 'esm',
    color: '#06b6d4',
  },
  {
    id: 'async-import',
    dimension: '动态导入',
    commonjs: 'require 本身即动态，但同步阻塞',
    esm: 'import() 返回 Promise，可异步加载（懒加载、按需加载）',
    recommended: 'esm',
    color: '#10b981',
  },
  {
    id: 'interop',
    dimension: '互操作',
    commonjs: '通过 require(esm) 有限支持（Node ≥ 22 较好）',
    esm: '通过 import(cjs) 将 module.exports 视为 default 导出',
    recommended: 'esm',
    color: '#f43f5e',
  },
]

const DEFAULT_COMMONJS_EXAMPLE = `// CommonJS - math.js
function add(a, b) { return a + b }
function sub(a, b) { return a - b }
module.exports = { add, sub }

// 使用方
const { add } = require('./math')
console.log(add(1, 2)) // 3`

const DEFAULT_ESM_EXAMPLE = `// ESM - math.js
export function add(a, b) { return a + b }
export function sub(a, b) { return a - b }
export default { add, sub }

// 使用方
import { add } from './math.js'
console.log(add(1, 2)) // 3`

export function ModuleSystemComparator({ data }: ModuleSystemComparatorProps) {
  const dimensions = data?.dimensions ?? DEFAULT_DIMENSIONS
  const commonjsExample = data?.commonjsExample ?? DEFAULT_COMMONJS_EXAMPLE
  const esmExample = data?.esmExample ?? DEFAULT_ESM_EXAMPLE

  const [selectedId, setSelectedId] = useState(dimensions[0]?.id ?? '')
  const selected = dimensions.find((d) => d.id === selectedId) ?? dimensions[0]

  const recommendLabel = (rec: ModuleSystemDimension['recommended']) => {
    if (rec === 'esm') return { text: '推荐 ESM', color: '#07c160' }
    if (rec === 'commonjs') return { text: '推荐 CommonJS', color: '#1a6cff' }
    if (rec === 'both') return { text: '两者皆可', color: '#f59e0b' }
    return { text: '不推荐', color: '#6b7280' }
  }
  const rec = recommendLabel(selected?.recommended)

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：静态对比两种模块系统，不执行真实模块加载。
      </div>

      {/* 维度导航 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          对比维度 · 共 {dimensions.length} 项
        </div>
        <div className="flex flex-wrap gap-xs">
          {dimensions.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm transition-all',
                d.id === selectedId
                  ? 'text-white'
                  : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover',
              )}
              style={d.id === selectedId ? { background: d.color } : undefined}
            >
              {d.dimension}
            </button>
          ))}
        </div>
      </div>

      {/* 选中维度详细对比 */}
      {selected && (
        <div
          className="rounded-sm border p-md"
          style={{ borderColor: `${selected.color}55`, background: `${selected.color}08` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-sm">
            <h4 className="font-mono text-body-lg font-semibold text-ink">
              {selected.dimension}
            </h4>
            <span
              className="rounded-pill px-sm py-xs font-mono text-caption-mono-sm text-white"
              style={{ background: rec.color }}
            >
              {rec.text}
            </span>
          </div>

          <div className="mt-md grid gap-md sm:grid-cols-2">
            {/* CommonJS */}
            <div className="rounded-sm border border-hairline bg-canvas-bg-inset p-md">
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#1a6cff]">
                CommonJS
              </div>
              <p className="mt-xs text-body-sm text-body">{selected.commonjs}</p>
            </div>

            {/* ESM */}
            <div className="rounded-sm border border-hairline bg-canvas-bg-inset p-md">
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#07c160]">
                ESM
              </div>
              <p className="mt-xs text-body-sm text-body">{selected.esm}</p>
            </div>
          </div>
        </div>
      )}

      {/* 代码示例对照 */}
      <div className="grid gap-md sm:grid-cols-2">
        <div className="rounded-sm border border-hairline bg-canvas-card overflow-hidden">
          <div className="border-b border-hairline bg-[#1a6cff]/8 px-md py-sm">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#1a6cff]">
              CommonJS 示例
            </span>
          </div>
          <pre className="overflow-x-auto p-md font-mono text-caption-mono-sm text-ink">
            <code>{commonjsExample}</code>
          </pre>
        </div>

        <div className="rounded-sm border border-hairline bg-canvas-card overflow-hidden">
          <div className="border-b border-hairline bg-[#07c160]/8 px-md py-sm">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#07c160]">
              ESM 示例
            </span>
          </div>
          <pre className="overflow-x-auto p-md font-mono text-caption-mono-sm text-ink">
            <code>{esmExample}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
