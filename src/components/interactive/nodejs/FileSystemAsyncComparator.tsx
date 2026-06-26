/**
 * FileSystemAsyncComparator — 异步文件 IO 三种范式对比
 *
 * 对比 Node.js fs 模块的三种使用范式：
 * 1. 同步 API（fs.readFileSync）：阻塞主线程，仅用于启动期加载配置
 * 2. 回调 API（fs.readFile）：传统异步，易陷入回调地狱
 * 3. Promise API（fs.promises.readFile）：async/await 配合，推荐方案
 *
 * 交互：点击范式切换；展示阻塞特性、代码示例、优缺点、适用场景。
 *
 * ⚠️ 教学模拟：不执行真实文件读取。
 */
import { useState } from 'react'
import type {
  FileSystemAsyncComparatorData,
  FileSystemParadigm,
} from '../../../lib/nodejs-visualization-types'
import { cn } from '../../../lib/utils'

interface FileSystemAsyncComparatorProps {
  data?: FileSystemAsyncComparatorData
}

/** 默认三范式数据 */
const DEFAULT_PARADIGMS: FileSystemParadigm[] = [
  {
    id: 'sync',
    name: '同步 API',
    description: 'fs.readFileSync / fs.writeFileSync 等。调用后阻塞主线程，直到操作完成才返回。会阻塞事件循环，影响所有连接的请求。',
    blocking: true,
    codeLanguage: 'js',
    code: `const fs = require('fs')

// 同步读取，主线程被阻塞
try {
  const data = fs.readFileSync('/path/to/file', 'utf-8')
  console.log(data)
} catch (err) {
  console.error(err)
}

// 下一行代码必须等待读取完成才会执行
console.log('done')`,
    pros: [
      '代码简单直观，类似普通函数调用',
      '调试方便，调用栈完整',
    ],
    cons: [
      '阻塞主线程，事件循环停滞',
      '高并发下严重影响吞吐量',
      '一个慢 IO 影响所有请求',
    ],
    useCase: '启动期加载配置文件、构建脚本、CLI 工具',
    color: '#ec4899',
  },
  {
    id: 'callback',
    name: '回调 API',
    description: 'fs.readFile / fs.writeFile 等。Node.js 原生异步风格，回调函数在事件循环的 poll 阶段执行。错误优先回调：第一个参数为 err。',
    blocking: false,
    codeLanguage: 'js',
    code: `const fs = require('fs')

// 异步读取，不阻塞主线程
fs.readFile('/path/to/file', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
  // 继续处理 data...
})

// 立即执行，无需等待读取
console.log('reading started')`,
    pros: [
      '不阻塞主线程，事件循环可继续',
      'Node.js 经典异步模式',
      '无需 Promise 运行时支持',
    ],
    cons: [
      '回调地狱（多层嵌套难以阅读）',
      '错误处理分散，try/catch 无法捕获',
      '无法用 async/await',
    ],
    useCase: '兼容旧代码、性能敏感且需精细控制时序',
    color: '#f59e0b',
  },
  {
    id: 'promise',
    name: 'Promise API（推荐）',
    description: 'fs.promises.readFile / fs.promises.writeFile 或 util.promisify 包装。基于 Promise，可使用 async/await，是现代 Node.js 推荐方案。',
    blocking: false,
    codeLanguage: 'js',
    code: `const fsp = require('fs').promises
// 或：const { promises: fsp } = require('fs')

async function readFile() {
  try {
    // async/await，看起来像同步代码
    const data = await fsp.readFile('/path/to/file', 'utf-8')
    console.log(data)
    // 继续处理 data...
  } catch (err) {
    console.error(err)
  }
}

readFile()
console.log('reading started')`,
    pros: [
      'async/await 语法，代码清晰',
      'try/catch 统一错误处理',
      'Promise.all 并发执行多个 IO',
      '易于组合与链式调用',
    ],
    cons: [
      '相比直接回调，有极小的运行时开销',
      'Node.js 10+ 才原生提供 fs.promises',
    ],
    useCase: '现代应用首选，特别是 Web 服务、需要并发的场景',
    color: '#07c160',
  },
]

export function FileSystemAsyncComparator({ data }: FileSystemAsyncComparatorProps) {
  const paradigms = data?.paradigms ?? DEFAULT_PARADIGMS
  const [selectedId, setSelectedId] = useState(paradigms[0]?.id ?? '')
  const selected = paradigms.find((p) => p.id === selectedId) ?? paradigms[0]

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示三种 IO 范式的特性与代码示例，不执行真实文件读取。
      </div>

      {/* 范式选择 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          三种 IO 范式 · 点击切换查看详情
        </div>
        <div className="flex flex-wrap gap-xs">
          {paradigms.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm transition-all',
                p.id === selectedId
                  ? 'text-white'
                  : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover',
              )}
              style={p.id === selectedId ? { background: p.color } : undefined}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* 阻塞特性指示 */}
        <div className="mt-md flex flex-wrap items-center gap-md">
          {paradigms.map((p) => (
            <div
              key={p.id}
              className={cn(
                'flex items-center gap-xs rounded-pill px-sm py-xs font-mono text-caption-mono-sm',
                p.id === selectedId ? 'text-white' : '',
              )}
              style={
                p.id === selectedId
                  ? { background: p.color }
                  : { background: `${p.color}15`, color: p.color }
              }
            >
              <span
                className={cn(
                  'inline-block h-2 w-2 rounded-full',
                  p.blocking ? 'animate-pulse' : '',
                )}
                style={{
                  background: p.id === selectedId ? '#fff' : p.color,
                }}
              />
              {p.name}
              <span className="opacity-80">
                {p.blocking ? '· 阻塞主线程' : '· 不阻塞'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 选中范式详情 */}
      {selected && (
        <div
          className="rounded-sm border p-md"
          style={{ borderColor: `${selected.color}55`, background: `${selected.color}08` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-sm">
            <h4 className="font-mono text-body-lg font-semibold text-ink">
              {selected.name}
            </h4>
            <span
              className={cn(
                'rounded-pill px-sm py-xs font-mono text-caption-mono-sm text-white',
              )}
              style={{ background: selected.blocking ? '#ec4899' : '#07c160' }}
            >
              {selected.blocking ? '⛔ 阻塞主线程' : '✓ 不阻塞'}
            </span>
          </div>

          <p className="mt-sm text-body-sm text-body">{selected.description}</p>

          {/* 代码示例 */}
          <div className="mt-md rounded-sm border border-hairline bg-canvas-card overflow-hidden">
            <div
              className="border-b border-hairline px-md py-sm"
              style={{ background: `${selected.color}10` }}
            >
              <span
                className="font-mono text-caption-mono-sm uppercase tracking-[1.2px]"
                style={{ color: selected.color }}
              >
                代码示例 · {selected.codeLanguage ?? 'js'}
              </span>
            </div>
            <pre className="overflow-x-auto p-md font-mono text-caption-mono-sm text-ink">
              <code>{selected.code}</code>
            </pre>
          </div>

          {/* 优缺点 */}
          <div className="mt-md grid gap-md sm:grid-cols-2">
            <div>
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#07c160]">
                ✓ 优点
              </div>
              <ul className="mt-xs space-y-xs">
                {selected.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-xs text-body-sm text-body">
                    <span className="text-[#07c160]">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-[#ec4899]">
                ✗ 缺点
              </div>
              <ul className="mt-xs space-y-xs">
                {selected.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-xs text-body-sm text-body">
                    <span className="text-[#ec4899]">−</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 适用场景 */}
          <div className="mt-md rounded-sm border border-hairline bg-canvas-bg-inset p-md">
            <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              适用场景
            </div>
            <p className="mt-xs text-body-sm text-ink">{selected.useCase}</p>
          </div>
        </div>
      )}
    </div>
  )
}
