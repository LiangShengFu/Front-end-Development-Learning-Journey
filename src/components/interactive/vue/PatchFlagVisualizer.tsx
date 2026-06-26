/**
 * PatchFlagVisualizer — Vue 3 编译优化可视化
 */
import { useMemo, useState } from 'react'
import type { PatchFlagVisualizerData, PatchFlagTemplate } from '../../../lib/vue-visualization-types'
import { cn } from '../../../lib/utils'

interface PatchFlagVisualizerProps {
  data?: PatchFlagVisualizerData
}

const PATCH_FLAG_LEGEND = [
  { flag: 1, name: 'TEXT', desc: '动态文本内容' },
  { flag: 2, name: 'CLASS', desc: '动态 class 绑定' },
  { flag: 4, name: 'STYLE', desc: '动态 style 绑定' },
  { flag: 8, name: 'PROPS', desc: '动态 props/attrs' },
  { flag: 16, name: 'FULL_PROPS', desc: '完整 props 需 diff' },
  { flag: 32, name: 'HYDRATE_EVENTS', desc: '需 hydrate 事件' },
]

const DEFAULT_TEMPLATES: PatchFlagTemplate[] = [
  {
    id: 'static',
    label: '纯静态模板',
    templateCode: `<div class="container">
  <h1>Vue 3</h1>
  <p>静态内容，编译后可完全提升</p>
  <footer>© 2024</footer>
</div>`,
    staticNodes: ['div.container', 'h1', 'p', 'footer'],
    dynamicNodes: [],
    hoistedNodes: ['div.container', 'h1', 'p', 'footer'],
    compiledSnippet: `// 全部静态节点提升到渲染函数外
const _hoisted_1 = /*#__PURE__*/ _createElementVNode("div", ...)
// 运行时零 diff 开销`,
  },
  {
    id: 'mixed',
    label: '混合动静模板',
    templateCode: `<div>
  <h1>{{ title }}</h1>
  <p class="static">不变段落</p>
  <span :class="activeClass">{{ count }}</span>
</div>`,
    staticNodes: ['div', 'p.static'],
    dynamicNodes: [
      { expression: '{{ title }}', patchFlag: 1, flagName: 'TEXT' },
      { expression: ':class="activeClass"', patchFlag: 2, flagName: 'CLASS' },
      { expression: '{{ count }}', patchFlag: 1, flagName: 'TEXT' },
    ],
    hoistedNodes: ['div', 'p.static'],
    compiledSnippet: `// 静态节点提升
const _hoisted_1 = _createElementVNode("p", { class: "static" }, ...)
// 动态节点标记 PatchFlag
_createElementVNode("h1", null, _toDisplayString(title), 1 /* TEXT */)
_createElementVNode("span", { class: activeClass }, ..., 3 /* TEXT | CLASS */)`,
  },
  {
    id: 'dynamic',
    label: '全动态模板',
    templateCode: `<div :style="theme">
  <input v-model="query" @input="search" />
  <component :is="currentComp" v-bind="props" />
</div>`,
    staticNodes: [],
    dynamicNodes: [
      { expression: ':style="theme"', patchFlag: 4, flagName: 'STYLE' },
      { expression: 'v-model="query"', patchFlag: 40, flagName: 'PROPS | HYDRATE_EVENTS' },
      { expression: ':is="currentComp"', patchFlag: 8, flagName: 'PROPS' },
      { expression: 'v-bind="props"', patchFlag: 16, flagName: 'FULL_PROPS' },
    ],
    hoistedNodes: [],
    compiledSnippet: `// 无静态提升，所有节点参与 diff
// Block Tree：仅对比带 PatchFlag 的动态节点
// 传统 diff O(n) → Block Tree 仅 diff 4 个动态节点`,
  },
]

function classifyLine(line: string, template: PatchFlagTemplate) {
  const trimmed = line.trim()
  if (!trimmed) return { kind: 'empty' as const }

  const dynamic = template.dynamicNodes.find((node) => {
    if (trimmed.includes(node.expression)) return true
    const key = node.expression.match(/"([^"]+)"/)?.[1]
    return key ? trimmed.includes(key) : false
  })

  if (dynamic) return { kind: 'dynamic' as const, dynamic }

  const isStatic =
    template.staticNodes.length === 0
      ? trimmed.length > 0
      : template.staticNodes.some((n) => {
          const token = n.replace(/^\w+\./, '')
          return trimmed.includes(token) || trimmed.includes(n)
        })

  if (isStatic && trimmed) return { kind: 'static' as const }
  return { kind: 'plain' as const }
}

export function PatchFlagVisualizer({ data }: PatchFlagVisualizerProps) {
  const templates = data?.templates ?? DEFAULT_TEMPLATES
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? 'mixed')
  const template = templates.find((t) => t.id === templateId) ?? templates[0]

  const lines = useMemo(
    () =>
      template.templateCode.split('\n').map((line, index) => ({
        index,
        line,
        ...classifyLine(line, template),
      })),
    [template],
  )

  return (
    <div className="isolate space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：编译结果和 PatchFlag 位掩码为简化展示，非 Vue 编译器真实输出。
      </div>

      <div className="flex flex-wrap gap-sm">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTemplateId(t.id)}
            className={cn(
              'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
              templateId === t.id
                ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                : 'border-hairline text-body-mid hover:border-body-mid',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-xl lg:grid-cols-2">
        {/* 原始模板 */}
        <div className="min-w-0">
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            原始模板
          </h4>
          <div className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md">
            <div className="min-w-0 space-y-1 font-mono text-body-sm">
              {lines.map(({ index, line, kind, dynamic }) => {
                if (kind === 'empty') {
                  return <div key={index} className="h-2" aria-hidden />
                }
                return (
                  <div
                    key={index}
                    className={cn(
                      'rounded-sm px-sm py-xs',
                      kind === 'dynamic' && 'border-l-2 border-orange-400 bg-orange-400/10',
                      kind === 'static' && 'border-l-2 border-gray-400 bg-gray-400/10',
                    )}
                  >
                    <code
                      className={cn(
                        'block break-all whitespace-pre-wrap',
                        kind === 'dynamic' ? 'text-orange-400' : kind === 'static' ? 'text-gray-400' : 'text-ink',
                      )}
                    >
                      {line}
                    </code>
                    {kind === 'dynamic' && dynamic && (
                      <span className="mt-xs block font-mono text-caption-mono-sm text-orange-400">
                        PatchFlag={dynamic.patchFlag} ({dynamic.flagName})
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-sm flex flex-wrap gap-md text-caption-mono-sm">
            <span className="text-gray-400">■ 静态节点</span>
            <span className="text-orange-400">■ 动态节点</span>
          </div>
        </div>

        {/* 编译优化后 */}
        <div className="min-w-0">
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            编译优化后
          </h4>
          <pre className="max-h-[360px] overflow-auto rounded-sm border border-purple-500/40 bg-canvas-card p-md font-mono text-body-sm text-ink">
            <code className="whitespace-pre-wrap break-words">{template.compiledSnippet}</code>
          </pre>

          {template.hoistedNodes.length > 0 && (
            <div className="mt-md rounded-sm border border-purple-500/30 bg-purple-500/5 p-md">
              <div className="font-mono text-caption-mono-sm text-purple-400">静态提升节点</div>
              <div className="mt-xs flex flex-wrap gap-sm">
                {template.hoistedNodes.map((n) => (
                  <span
                    key={n}
                    className="rounded-pill border border-purple-500/40 px-md py-xs font-mono text-caption-mono-sm text-purple-400"
                  >
                    ↑ {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PatchFlag 图例 */}
      <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
        <h4 className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          PatchFlag 位掩码图例
        </h4>
        <div className="grid grid-cols-1 gap-sm sm:grid-cols-2 xl:grid-cols-3">
          {PATCH_FLAG_LEGEND.map(({ flag, name, desc }) => (
            <div
              key={flag}
              className="flex min-w-0 flex-col gap-xs rounded-sm border border-hairline bg-canvas-card px-md py-sm sm:flex-row sm:items-center sm:gap-sm"
            >
              <span className="shrink-0 font-mono text-body-sm text-orange-400">{flag}</span>
              <span className="shrink-0 font-mono text-caption-mono-sm text-ink">{name}</span>
              <span className="min-w-0 text-caption-mono-sm text-body-mid">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Diff 对比说明 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
          <h5 className="font-mono text-caption-mono-sm text-body-mid">传统逐节点 diff</h5>
          <p className="mt-sm text-body-sm text-body">
            全量遍历 VNode 树，时间复杂度 O(n)。静态节点也参与比较，浪费性能。
          </p>
        </div>
        <div className="rounded-sm border border-[#42b883]/40 bg-[#42b883]/5 p-lg">
          <h5 className="font-mono text-caption-mono-sm text-[#42b883]">Block Tree 扁平化 diff</h5>
          <p className="mt-sm text-body-sm text-body">
            编译器标记动态节点，运行时仅 diff 带 PatchFlag 的节点，跳过静态子树。
          </p>
        </div>
      </div>
    </div>
  )
}
