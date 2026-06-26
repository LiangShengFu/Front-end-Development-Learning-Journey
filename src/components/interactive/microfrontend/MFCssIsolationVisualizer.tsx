/**
 * MFCssIsolationVisualizer — CSS 隔离方案对比
 *
 * 展示微前端四种 CSS 隔离方案：
 * - Shadow DOM：浏览器原生隔离，样式作用域封闭
 * - CSS Scoped：Vue/Angular 的 scoped 属性选择器
 * - 前缀（Prefix）：BEM/OOCSS 命名前缀
 * - CSS Modules：构建时生成哈希类名
 *
 * 交互：点击方案切换，展示原理、代码示例、优缺点对比。
 *
 * ⚠️ 教学模拟：不实际渲染样式。
 */
'use client'

import { useState } from 'react'
import type {
  MFCssIsolationData,
  MFCssIsolationScheme,
  MFCssIsolationId,
} from '../../../lib/microfrontend-visualization-types'
import { cn } from '../../../lib/utils'

interface MFCssIsolationVisualizerProps {
  data?: MFCssIsolationData
}

/** 默认四种 CSS 隔离方案数据 */
const DEFAULT_SCHEMES: MFCssIsolationScheme[] = [
  {
    id: 'shadow-dom',
    name: 'Shadow DOM',
    principle:
      '浏览器原生隔离：使用 attachShadow({ mode: \'open\' }) 创建 Shadow Root，内部样式不会泄漏到外部，外部样式也不会渗透进来。Web Components 与 micro-app 的核心隔离机制。',
    codeSnippet: `class MicroElement extends HTMLElement {
  constructor() {
    super()
    // 创建 Shadow Root，样式天然隔离
    const shadow = this.attachShadow({ mode: 'open' })
    // 内部样式不会影响外部
    shadow.innerHTML = \`
      <style>
        .btn { background: #1a6cff; color: white; }
        /* 只作用于 Shadow 内部 */
      </style>
      <button class="btn">子应用按钮</button>
    \`
  }
}
customElements.define('micro-app', MicroElement)`,
    isolation: 'strong',
    pros: [
      '浏览器原生支持，隔离最彻底',
      '外部样式无法渗透，内部样式无法泄漏',
      'Web Components 标准，长期可靠',
    ],
    cons: [
      'Shadow 内部事件需冒泡穿透',
      '第三方 UI 库可能不兼容 Shadow DOM',
      '全局样式（如字体、主题）需特殊处理',
    ],
    useCase: 'Web Components / micro-app 自定义元素方案，需要最强隔离的场景。',
    color: '#1a6cff',
  },
  {
    id: 'scoped',
    name: 'CSS Scoped',
    principle:
      'Vue 的 <style scoped> 与 Angular 的 :host 通过给元素添加 data-v-xxx 或 _ngcontent-xxx 属性，将样式限定在组件作用域内。属性选择器自动生成，开发者无感知。',
    codeSnippet: `<!-- Vue SFC -->
<template>
  <button class="btn">子应用按钮</button>
</template>

<style scoped>
/* 编译后：.btn[data-v-abc123] */
.btn {
  background: #1a6cff;
  color: white;
}
</style>

<!-- 编译结果 -->
<button class="btn" data-v-abc123>子应用按钮</button>
<style>
.btn[data-v-abc123] {
  background: #1a6cff;
  color: white;
}
</style>`,
    isolation: 'medium',
    pros: [
      '框架自动处理，开发无感知',
      '类名可保持简洁，无需手动加前缀',
      'Vue/Angular 原生支持，生态成熟',
    ],
    cons: [
      '仅组件级隔离，全局样式仍可能冲突',
      '跨组件引用样式需 :deep() / ::ng-deep',
      '运行时动态添加的元素可能漏加属性',
    ],
    useCase: 'Vue/Angular 应用内部组件样式隔离，配合微前端使用。',
    color: '#a78bfa',
  },
  {
    id: 'prefix',
    name: '命名前缀',
    principle:
      '通过 BEM/OOCSS 等命名约定，给所有类名添加应用前缀（如 mf-user-__btn--primary），避免命名冲突。qiankun 的 experimentalStyleIsolation 也支持自动加前缀。',
    codeSnippet: `/* 手动 BEM 命名前缀 */
.mf-user__btn--primary {
  background: #1a6cff;
  color: white;
}
.mf-user__btn--secondary {
  background: #6b7280;
  color: white;
}

<!-- qiankun 自动加前缀 -->
<div data-qiankun="user-app">
  <button class="btn">子应用按钮</button>
</div>
<!-- 编译后所有选择器自动加 div[data-qiankun="user-app"] 前缀 */`,
    isolation: 'weak',
    pros: [
      '实现简单，无需框架支持',
      '兼容性最好，任何技术栈可用',
      '可读性强，类名即文档',
    ],
    cons: [
      '依赖人工约定，易遗漏',
      '类名冗长，HTML 体积增大',
      '全局样式（如 reset.css）无法隔离',
    ],
    useCase: '简单项目或临时方案，qiankun 自动前缀模式。',
    color: '#f59e0b',
  },
  {
    id: 'css-modules',
    name: 'CSS Modules',
    principle:
      '构建时为每个类名生成唯一的哈希值（如 .btn → .btn_abc123），确保类名全局唯一。在 JS 中通过 import styles from \'./style.css\' 获取映射后的类名。',
    codeSnippet: `/* style.css */
.btn {
  background: #1a6cff;
  color: white;
}

/* 构建后自动生成 */
.btn_abc123xyz {
  background: #1a6cff;
  color: white;
}

// Component.tsx
import styles from './style.css'

function Button() {
  // 使用映射后的类名
  return <button className={styles.btn}>按钮</button>
}`,
    isolation: 'medium',
    pros: [
      '构建时生成，无运行时开销',
      '类名自动唯一，无需人工约定',
      'JS 中按需引用，按需加载',
    ],
    cons: [
      '需构建工具支持（webpack/css-loader）',
      '动态类名（如主题切换）需特殊处理',
      '全局样式需 :global() 显式声明',
    ],
    useCase: 'React/Next.js 项目，配合构建工具使用的样式隔离。',
    color: '#07c160',
  },
]

const ISOLATION_LABEL: Record<'weak' | 'medium' | 'strong', string> = {
  weak: '弱',
  medium: '中',
  strong: '强',
}

const ISOLATION_COLOR: Record<'weak' | 'medium' | 'strong', string> = {
  weak: '#ef4444',
  medium: '#f59e0b',
  strong: '#07c160',
}

export function MFCssIsolationVisualizer({ data }: MFCssIsolationVisualizerProps) {
  const schemes = data?.schemes ?? DEFAULT_SCHEMES
  const compareNote =
    data?.compareNote ??
    '对比结论：Shadow DOM 隔离最强但兼容性成本高；CSS Scoped 与 CSS Modules 是框架级中等隔离；命名前缀最轻量但依赖人工约定。微前端场景通常组合使用：qiankun 用 Shadow DOM/前缀，内部用 Scoped/Modules。'

  const [selectedId, setSelectedId] = useState<MFCssIsolationId>('shadow-dom')
  // 安全回退：若 selectedId 与数据不匹配，回退到第一个方案
  const selected = schemes.find((s) => s.id === selectedId) ?? schemes[0]

  if (!selected) {
    return <div className="text-body-sm text-body-mid">无可用方案</div>
  }

  return (
    <div className="space-y-lg">
      {/* 方案切换 */}
      <div
        className="flex flex-wrap items-center gap-xs"
        role="group"
        aria-label="CSS 隔离方案切换"
      >
        {schemes.map((s) => {
          const isActive = s.id === selectedId
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              aria-pressed={isActive}
              style={
                isActive
                  ? { backgroundColor: s.color, borderColor: s.color }
                  : undefined
              }
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas text-ink hover:border-ink/30',
              )}
            >
              {s.name}
            </button>
          )
        })}
      </div>

      {/* 方案详情 */}
      <div
        className="rounded-sm border-l-4 p-md"
        style={{
          borderLeftColor: selected.color,
          backgroundColor: `${selected.color}10`,
        }}
      >
        <div className="mb-sm flex flex-wrap items-center gap-sm">
          <h4 className="text-heading-4 text-ink">{selected.name}</h4>
          <span
            className="rounded-sm px-xs py-xxs font-mono text-caption-mono-xs text-white"
            style={{ backgroundColor: ISOLATION_COLOR[selected.isolation] }}
          >
            隔离强度：{ISOLATION_LABEL[selected.isolation]}
          </span>
        </div>
        <p className="text-body-sm text-body">{selected.principle}</p>
      </div>

      {/* 代码示例 */}
      <div>
        <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
          代码示例
        </div>
        <pre className="overflow-x-auto rounded-md border border-hairline bg-canvas-soft p-md">
          <code className="font-mono text-caption-mono-sm text-ink">
            {selected.codeSnippet}
          </code>
        </pre>
      </div>

      {/* 优缺点对比 */}
      <div className="grid gap-md sm:grid-cols-2">
        <div className="rounded-sm border border-l-4 border-accent-sunset bg-accent-sunset/5 p-md">
          <div className="mb-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-accent-sunset">
            ✓ 优点
          </div>
          <ul className="space-y-xs">
            {selected.pros.map((pro, i) => (
              <li key={i} className="text-caption text-body">
                <span className="mr-xs text-accent-sunset">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-sm border border-l-4 border-red-500 bg-red-50 p-md">
          <div className="mb-sm font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-red-600">
            ✗ 缺点
          </div>
          <ul className="space-y-xs">
            {selected.cons.map((con, i) => (
              <li key={i} className="text-caption text-body">
                <span className="mr-xs text-red-600">✗</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 适用场景 */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
        <div className="mb-xs font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body">
          适用场景
        </div>
        <p className="text-body-sm text-ink">{selected.useCase}</p>
      </div>

      {/* 对比说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {compareNote}
      </p>

      <p className="text-center text-caption-mono-xs text-body">
        ⚠️ 教学模拟 · 不实际渲染样式
      </p>
    </div>
  )
}
