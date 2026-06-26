/**
 * TaroCompileFlowVisualizer — Taro 多端编译流程可视化
 *
 * 可视化 Taro 3+ 的多端编译管线：React 源码 → Taro 编译器 → 微信/支付宝/H5/RN 产物。
 * 顶部展示 Taro React 源码，中间是编译器节点（可切换目标平台），底部展示该平台的编译产物文件。
 *
 * ⚠️ 教学模拟：编译产物为预设示例，非 Taro CLI 实际编译输出。
 */
import { useState } from 'react'
import type {
  TaroCompileFlowVisualizerData,
  TaroCompileTarget,
  TaroPlatform,
} from '../../../lib/miniprogram-visualization-types'
import { cn } from '../../../lib/utils'

interface TaroCompileFlowVisualizerProps {
  data?: TaroCompileFlowVisualizerData
}

/** 默认编译目标 */
const DEFAULT_TARGETS: TaroCompileTarget[] = [
  {
    id: 'hello',
    label: 'Hello 组件',
    description: '最简单的 Taro React 组件，编译到各端查看产物差异。',
    sourceCode: `import { View, Text } from '@tarojs/components'

export default function Hello() {
  return (
    <View className="wrap">
      <Text>Hello Taro</Text>
    </View>
  )
}`,
    outputs: [
      {
        platform: 'wechat',
        label: '微信小程序',
        files: [
          { name: 'index.wxml', content: '<view class="wrap"><text>Hello Taro</text></view>', language: 'xml' },
          { name: 'index.wxss', content: '.wrap { display: block; }', language: 'css' },
          { name: 'index.js', content: "Component({ render() { return null } })", language: 'javascript' },
        ],
      },
      {
        platform: 'alipay',
        label: '支付宝小程序',
        files: [
          { name: 'index.axml', content: '<view class="wrap"><text>Hello Taro</text></view>', language: 'xml' },
          { name: 'index.acss', content: '.wrap { display: block; }', language: 'css' },
          { name: 'index.js', content: "Component({ render() { return null } })", language: 'javascript' },
        ],
      },
      {
        platform: 'h5',
        label: 'H5',
        files: [
          { name: 'index.html', content: '<div class="wrap"><span>Hello Taro</span></div>', language: 'html' },
          { name: 'index.css', content: '.wrap { display: block; }', language: 'css' },
          { name: 'index.js', content: "export default function Hello() { return <div><span>Hello Taro</span></div> }", language: 'javascript' },
        ],
      },
      {
        platform: 'rn',
        label: 'React Native',
        files: [
          { name: 'index.js', content: "import { View, Text } from 'react-native'\nexport default function Hello() {\n  return (<View><Text>Hello Taro</Text></View>)\n}", language: 'javascript' },
        ],
      },
    ],
  },
]

/** 平台主题色 */
const PLATFORM_COLOR: Record<TaroPlatform, string> = {
  wechat: '#07c160',
  alipay: '#1677ff',
  h5: '#f59e0b',
  rn: '#61dafb',
}

const PLATFORMS: { id: TaroPlatform; label: string; icon: string }[] = [
  { id: 'wechat', label: '微信', icon: '💬' },
  { id: 'alipay', label: '支付宝', icon: '💰' },
  { id: 'h5', label: 'H5', icon: '🌐' },
  { id: 'rn', label: 'RN', icon: '📱' },
]

export function TaroCompileFlowVisualizer({ data }: TaroCompileFlowVisualizerProps) {
  const targets = data?.targets ?? DEFAULT_TARGETS
  const [targetId, setTargetId] = useState(targets[0]?.id ?? 'hello')
  const [platform, setPlatform] = useState<TaroPlatform>('wechat')

  const target = targets.find((t) => t.id === targetId) ?? targets[0]
  const output = target?.outputs.find((o) => o.platform === platform) ?? target?.outputs[0]
  const color = PLATFORM_COLOR[platform]

  return (
    <div className="space-y-lg">
      <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 px-lg py-md text-body-sm text-amber-700 dark:text-amber-300">
        ⚠️ 教学模拟：编译产物为预设示例，非 Taro CLI 实际编译输出。
      </div>

      {/* 场景选择 */}
      {targets.length > 1 && (
        <div className="flex flex-wrap gap-sm">
          {targets.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTargetId(t.id)}
              className={cn(
                'rounded-pill border px-lg py-sm font-mono text-caption-mono-sm transition-colors',
                targetId === t.id
                  ? 'border-[#1a6cff] bg-[#1a6cff]/10 text-[#1a6cff]'
                  : 'border-hairline text-body-mid hover:border-body-mid',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* 编译流程图：源码 → 编译器 → 产物 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        {/* 源码层 */}
        <div>
          <div className="mb-sm flex items-center gap-sm">
            <span className="rounded-pill bg-[#1a6cff]/10 px-sm py-xs font-mono text-caption-mono-sm text-[#1a6cff]">
              ① Taro React 源码
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">{target?.label}</span>
          </div>
          <pre className="overflow-x-auto rounded-sm border border-hairline bg-canvas-soft p-md font-mono text-body-sm text-ink">
            <code>{target?.sourceCode}</code>
          </pre>
        </div>

        {/* 编译器节点 */}
        <div className="my-md flex flex-col items-center gap-xs">
          <div className="text-body-mid">↓</div>
          <div className="rounded-pill border border-[#1a6cff]/40 bg-[#1a6cff]/5 px-lg py-sm text-center font-mono text-caption-mono-sm text-[#1a6cff]">
            ⚙️ Taro Compiler · 3+ React 语法 → 多端产物
          </div>
          <div className="text-body-mid">↓</div>
        </div>

        {/* 平台切换 */}
        <div className="mb-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            ② 选择目标平台
          </div>
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
                style={platform === p.id ? { background: PLATFORM_COLOR[p.id] } : undefined}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 产物文件 */}
        <div>
          <div className="mb-sm flex items-center gap-sm">
            <span
              className="rounded-pill px-sm py-xs font-mono text-caption-mono-sm text-white"
              style={{ background: color }}
            >
              ③ {output?.label} 产物
            </span>
            <span className="font-mono text-caption-mono-sm text-body-mid">{output?.files.length} 个文件</span>
          </div>
          <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
            {output?.files.map((f) => (
              <div key={f.name} className="overflow-hidden rounded-sm border border-hairline">
                <div className="flex items-center justify-between border-b border-hairline bg-canvas-soft px-md py-xs">
                  <span className="font-mono text-caption-mono-sm text-ink">{f.name}</span>
                  <span className="font-mono text-caption-mono-sm text-body-mid">{f.language}</span>
                </div>
                <pre className="overflow-x-auto p-md font-mono text-caption-mono-sm text-ink">
                  <code>{f.content}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
