/**
 * UniAppConditionalCompiler — uni-app 条件编译演示
 *
 * 交互式展示 uni-app 的条件编译机制。可切换目标平台（MP-WEIXIN / H5 / APP-PLUS），
 * 左侧显示原始 Vue 模板代码（高亮当前平台生效的代码块，灰化不生效的代码块），
 * 右侧显示编译后代码（仅保留当前平台生效的代码）。
 *
 * ⚠️ 教学模拟：条件编译为纯前端模拟，不调用 uni-app 编译器。
 */
import { useState } from 'react'
import type {
  UniAppConditionalCompilerData,
  ConditionalCompileExample,
  UniAppPlatform,
} from '../../../lib/miniprogram-visualization-types'
import { cn } from '../../../lib/utils'

interface UniAppConditionalCompilerProps {
  data?: UniAppConditionalCompilerData
}

/** 默认条件编译示例 */
const DEFAULT_EXAMPLES: ConditionalCompileExample[] = [
  {
    id: 'request-api',
    label: 'API 适配',
    description: '不同平台调用不同的网络请求 API。',
    sourceCode: `<template>
  <view>请求结果：{{ result }}</view>
</template>

<script>
export default {
  methods: {
    fetch() {
      // #ifdef MP-WEIXIN
      wx.request({ url: '/api' })
      // #endif
      // #ifdef H5
      fetch('/api')
      // #endif
      // #ifdef APP-PLUS
      plus.net.XMLHttpRequest('/api')
      // #endif
    }
  }
}
</script>`,
    platforms: [
      {
        id: 'MP-WEIXIN',
        label: '微信小程序',
        compiledCode: `// 编译后（MP-WEIXIN）
wx.request({ url: '/api' })`,
        activeBlocks: ['wx.request({ url: \'/api\' })'],
      },
      {
        id: 'H5',
        label: 'H5',
        compiledCode: `// 编译后（H5）
fetch('/api')`,
        activeBlocks: ['fetch(\'/api\')'],
      },
      {
        id: 'APP-PLUS',
        label: 'App',
        compiledCode: `// 编译后（APP-PLUS）
plus.net.XMLHttpRequest('/api')`,
        activeBlocks: ['plus.net.XMLHttpRequest(\'/api\')'],
      },
    ],
  },
  {
    id: 'ui-platform',
    label: 'UI 平台差异',
    description: '同一界面在不同平台使用不同的标题栏样式。',
    sourceCode: `<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="wx-nav">微信自定义导航栏</view>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <view class="default-nav">默认导航栏</view>
    <!-- #endif -->
  </view>
</template>`,
    platforms: [
      {
        id: 'MP-WEIXIN',
        label: '微信小程序',
        compiledCode: `// 编译后（MP-WEIXIN）
<view class="wx-nav">微信自定义导航栏</view>`,
        activeBlocks: ['<view class="wx-nav">微信自定义导航栏</view>'],
      },
      {
        id: 'H5',
        label: 'H5',
        compiledCode: `// 编译后（H5）
<view class="default-nav">默认导航栏</view>`,
        activeBlocks: ['<view class="default-nav">默认导航栏</view>'],
      },
      {
        id: 'APP-PLUS',
        label: 'App',
        compiledCode: `// 编译后（APP-PLUS）
<view class="default-nav">默认导航栏</view>`,
        activeBlocks: ['<view class="default-nav">默认导航栏</view>'],
      },
    ],
  },
]

/** 平台配置 */
const PLATFORMS: { id: UniAppPlatform; label: string; icon: string; color: string }[] = [
  { id: 'MP-WEIXIN', label: '微信小程序', icon: '💬', color: '#07c160' },
  { id: 'H5', label: 'H5', icon: '🌐', color: '#f59e0b' },
  { id: 'APP-PLUS', label: 'App', icon: '📱', color: '#2b9939' },
]

/** 条件编译指令速查 */
const DIRECTIVES = [
  { syntax: '#ifdef PLATFORM', desc: '仅当为 PLATFORM 平台时编译' },
  { syntax: '#ifndef PLATFORM', desc: '仅当不为 PLATFORM 平台时编译' },
  { syntax: '#endif', desc: '结束条件编译块' },
]

/** 平台标识速查 */
const PLATFORM_IDS = ['MP-WEIXIN', 'MP-ALIPAY', 'H5', 'APP-PLUS', 'APP-ANDROID', 'APP-IOS']

/**
 * 根据当前平台与 activeBlocks，给原始源码的每一行打标记：
 * - active：生效（绿色背景）
 * - inactive：不生效（灰色删除线）
 * - normal：普通行（注释指令行 / 模板外层）
 */
function annotateSource(source: string, activeBlocks: string[]): Array<{ text: string; state: 'active' | 'inactive' | 'normal' }> {
  const lines = source.split('\n')
  const result: Array<{ text: string; state: 'active' | 'inactive' | 'normal' }> = []
  let inBlock: 'active' | 'inactive' | null = null
  let blockPlatform = ''

  for (const line of lines) {
    const trimmed = line.trim()
    // 检测条件编译指令开始
    const ifdefMatch = trimmed.match(/^\/\/\s*#ifdef\s+(\S+)/)
    const ifndefMatch = trimmed.match(/^\/\/\s*#ifndef\s+(\S+)/)
    const endifMatch = trimmed.match(/^\/\/\s*#endif/)

    if (ifdefMatch) {
      blockPlatform = ifdefMatch[1]
      // activeBlocks 非空表示当前平台命中此块；若 activeBlocks 为空，按平台名匹配
      const isActive = activeBlocks.some((b) => b.trim()) ? true : blockPlatform.includes('WEIXIN')
      inBlock = isActive ? 'active' : 'inactive'
      result.push({ text: line, state: 'normal' })
      continue
    }
    if (ifndefMatch) {
      blockPlatform = ifndefMatch[1]
      // ifndef：非该平台时编译
      const isActive = !blockPlatform.includes('WEIXIN')
      inBlock = isActive ? 'active' : 'inactive'
      result.push({ text: line, state: 'normal' })
      continue
    }
    if (endifMatch) {
      inBlock = null
      blockPlatform = ''
      result.push({ text: line, state: 'normal' })
      continue
    }
    if (inBlock) {
      result.push({ text: line, state: inBlock })
    } else {
      result.push({ text: line, state: 'normal' })
    }
  }
  return result
}

export function UniAppConditionalCompiler({ data }: UniAppConditionalCompilerProps) {
  const examples = data?.examples ?? DEFAULT_EXAMPLES
  const [exampleId, setExampleId] = useState(examples[0]?.id ?? 'request-api')
  const [platform, setPlatform] = useState<UniAppPlatform>('MP-WEIXIN')

  const example = examples.find((e) => e.id === exampleId) ?? examples[0]
  const platformInfo = example?.platforms.find((p) => p.id === platform) ?? example?.platforms[0]
  const annotated = annotateSource(example?.sourceCode ?? '', platformInfo?.activeBlocks ?? [])
  const color = PLATFORMS.find((p) => p.id === platform)?.color ?? '#07c160'

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：条件编译为纯前端模拟，不调用 uni-app 编译器。
      </div>

      {/* 示例选择 + 平台切换 */}
      <div className="flex flex-wrap items-center gap-md">
        {examples.length > 1 && (
          <select
            value={exampleId}
            onChange={(e) => setExampleId(e.target.value)}
            className="rounded-sm border border-hairline bg-canvas-soft px-md py-sm font-mono text-body-sm text-ink focus:border-[#2b9939] focus:outline-none"
          >
            {examples.map((ex) => (
              <option key={ex.id} value={ex.id}>{ex.label}</option>
            ))}
          </select>
        )}
        <div className="flex flex-wrap gap-sm">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              className={cn(
                'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
                platform === p.id
                  ? 'border-transparent text-white'
                  : 'border-hairline text-body-mid hover:border-body-mid',
              )}
              style={platform === p.id ? { background: p.color } : undefined}
            >
              {p.icon} {p.label}
            </button>
          ))}
        </div>
      </div>
      {example && <p className="text-body-sm text-body-mid">{example.description}</p>}

      {/* 左：原始代码（带条件编译标记） / 右：编译后代码 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        <div>
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            原始代码（含条件编译注释）
          </h4>
          <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-caption-mono-sm">
            <code>
              {annotated.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    'px-sm',
                    line.state === 'active' && 'rounded-sm bg-[#07c160]/15 text-[#07c160]',
                    line.state === 'inactive' && 'text-body-mid/40 line-through',
                    line.state === 'normal' && 'text-ink',
                  )}
                >
                  {line.text || ' '}
                </div>
              ))}
            </code>
          </pre>
        </div>
        <div>
          <h4 className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            <span style={{ color }}>编译后代码</span> · {platformInfo?.label}
          </h4>
          <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink">
            <code>{platformInfo?.compiledCode}</code>
          </pre>
          <div className="mt-md rounded-sm border border-[#2b9939]/30 bg-[#2b9939]/5 p-md font-mono text-caption-mono-sm text-[#2b9939]">
            ✓ 当前平台生效代码块：{platformInfo?.activeBlocks.length ?? 0} 处
          </div>
        </div>
      </div>

      {/* 条件编译指令速查 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <h4 className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
          条件编译指令速查
        </h4>
        <div className="grid grid-cols-1 gap-sm md:grid-cols-3">
          {DIRECTIVES.map((d) => (
            <div key={d.syntax} className="rounded-sm border border-hairline bg-canvas-soft p-sm">
              <code className="font-mono text-caption-mono-sm text-[#2b9939]">{d.syntax}</code>
              <p className="mt-xs font-mono text-caption-mono-sm text-body-mid">{d.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-md flex flex-wrap gap-xs">
          {PLATFORM_IDS.map((id) => (
            <span key={id} className="rounded-pill bg-hairline/30 px-sm py-xs font-mono text-caption-mono-sm text-body-mid">
              {id}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
