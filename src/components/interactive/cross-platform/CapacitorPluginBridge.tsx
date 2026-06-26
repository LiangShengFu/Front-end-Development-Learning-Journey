/**
 * CapacitorPluginBridge — Capacitor 插件 Web-to-Native 桥接流程
 *
 * 展示 Capacitor 的 registerPlugin 桥接机制：Web 调用 → registerPlugin 分发 →
 * Web fallback / 原生实现（iOS Swift / Android Kotlin）→ 返回结果。
 * 可切换平台（Web/iOS/Android）查看不同桥接路径。
 *
 * ⚠️ 教学模拟：用步骤序列展示桥接流程，不执行真实 registerPlugin 调用。
 */
import { useState } from 'react'
import type {
  CapacitorPluginBridgeData,
  CapacitorPluginExample,
  CapacitorPlatform,
} from '../../../lib/cross-platform-visualization-types'
import { cn } from '../../../lib/utils'

interface CapacitorPluginBridgeProps {
  data?: CapacitorPluginBridgeData
}

const PLATFORM_THEME: Record<CapacitorPlatform, { color: string; bg: string; border: string; label: string }> = {
  web: { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', border: 'rgba(26,108,255,0.35)', label: 'Web' },
  ios: { color: '#7d8590', bg: 'rgba(125,133,144,0.10)', border: 'rgba(125,133,144,0.35)', label: 'iOS (Swift)' },
  android: { color: '#07c160', bg: 'rgba(7,193,96,0.10)', border: 'rgba(7,193,96,0.35)', label: 'Android (Kotlin)' },
}

const DEFAULT_EXAMPLES: CapacitorPluginExample[] = [
  {
    id: 'camera',
    label: 'Camera 插件',
    description: '调用设备摄像头拍照，Web 端回退到 input file。',
    pluginName: 'Camera',
    webCallCode: `import { Camera, CameraResultType } from '@capacitor/camera'

const photo = await Camera.getPhoto({
  quality: 90,
  resultType: CameraResultType.Uri
})`,
    platforms: [
      {
        id: 'web',
        label: 'Web',
        hasNativeImpl: false,
        steps: [
          { id: '1', label: 'Web 调用', description: 'Camera.getPhoto()', code: "Camera.getPhoto({ quality: 90 })" },
          { id: '2', label: 'registerPlugin 分发', description: '检测平台：无原生实现', code: "@capacitor/camera Web 实现" },
          { id: '3', label: 'Web Fallback', description: '使用 input[type=file] 拍照', code: '<input type="file" accept="image/*" capture="environment">' },
          { id: '4', label: '返回结果', description: '返回 base64/URI', code: 'return { webPath: dataURL }' },
        ],
        result: 'Web 端通过 input[type=file] 模拟拍照，返回 base64 图片。',
      },
      {
        id: 'ios',
        label: 'iOS',
        hasNativeImpl: true,
        steps: [
          { id: '1', label: 'Web 调用', description: 'Camera.getPhoto()', code: "Camera.getPhoto({ quality: 90 })" },
          { id: '2', label: 'registerPlugin 分发', description: '检测到 iOS 原生实现', code: '@capacitor/camera iOS Plugin' },
          { id: '3', label: 'Swift 原生执行', description: '调用 UIImagePickerController', code: 'let picker = UIImagePickerController()' },
          { id: '4', label: '返回结果', description: '原生回调返回 URI', code: 'call.resolve(["webPath": path])' },
        ],
        result: 'iOS 端通过 UIImagePickerController 调用系统相机，返回 URI。',
      },
      {
        id: 'android',
        label: 'Android',
        hasNativeImpl: true,
        steps: [
          { id: '1', label: 'Web 调用', description: 'Camera.getPhoto()', code: "Camera.getPhoto({ quality: 90 })" },
          { id: '2', label: 'registerPlugin 分发', description: '检测到 Android 原生实现', code: '@capacitor/camera Android Plugin' },
          { id: '3', label: 'Kotlin 原生执行', description: '调用 Intent ACTION_IMAGE_CAPTURE', code: 'val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)' },
          { id: '4', label: '返回结果', description: '原生回调返回 URI', code: 'call.resolve(mapOf("webPath" to path))' },
        ],
        result: 'Android 端通过 Intent 调用系统相机，返回 URI。',
      },
    ],
  },
  {
    id: 'haptics',
    label: 'Haptics 插件',
    description: '触发设备震动反馈，Web 端回退到 Navigator.vibrate()。',
    pluginName: 'Haptics',
    webCallCode: `import { Haptics, ImpactStyle } from '@capacitor/haptics'

await Haptics.impact({ style: ImpactStyle.Medium })`,
    platforms: [
      {
        id: 'web',
        label: 'Web',
        hasNativeImpl: false,
        steps: [
          { id: '1', label: 'Web 调用', description: 'Haptics.impact()', code: "Haptics.impact({ style: 'Medium' })" },
          { id: '2', label: 'registerPlugin 分发', description: '检测平台：无原生实现', code: "@capacitor/haptics Web 实现" },
          { id: '3', label: 'Web Fallback', description: '使用 Navigator.vibrate()', code: 'navigator.vibrate(30)' },
          { id: '4', label: '返回结果', description: 'Promise resolve', code: 'return Promise.resolve()' },
        ],
        result: 'Web 端通过 Navigator.vibrate() 模拟震动反馈。',
      },
      {
        id: 'ios',
        label: 'iOS',
        hasNativeImpl: true,
        steps: [
          { id: '1', label: 'Web 调用', description: 'Haptics.impact()', code: "Haptics.impact({ style: 'Medium' })" },
          { id: '2', label: 'registerPlugin 分发', description: '检测到 iOS 原生实现', code: '@capacitor/haptics iOS Plugin' },
          { id: '3', label: 'Swift 原生执行', description: '调用 UIImpactFeedbackGenerator', code: 'let generator = UIImpactFeedbackGenerator(style: .medium)' },
          { id: '4', label: '返回结果', description: '原生回调', code: 'call.resolve()' },
        ],
        result: 'iOS 端通过 UIImpactFeedbackGenerator 触发 Taptic Engine 震动。',
      },
      {
        id: 'android',
        label: 'Android',
        hasNativeImpl: true,
        steps: [
          { id: '1', label: 'Web 调用', description: 'Haptics.impact()', code: "Haptics.impact({ style: 'Medium' })" },
          { id: '2', label: 'registerPlugin 分发', description: '检测到 Android 原生实现', code: '@capacitor/haptics Android Plugin' },
          { id: '3', label: 'Kotlin 原生执行', description: '调用 Vibrator API', code: 'val vibrator = getSystemService(Vibrator::class.java)' },
          { id: '4', label: '返回结果', description: '原生回调', code: 'call.resolve()' },
        ],
        result: 'Android 端通过 Vibrator API 触发系统震动。',
      },
    ],
  },
]

export function CapacitorPluginBridge({ data }: CapacitorPluginBridgeProps) {
  const examples = data?.examples ?? DEFAULT_EXAMPLES
  const [exampleId, setExampleId] = useState(examples[0]?.id ?? 'camera')
  const [platform, setPlatform] = useState<CapacitorPlatform>('web')

  const example = examples.find((e) => e.id === exampleId) ?? examples[0]
  const platformSpec = example?.platforms.find((p) => p.id === platform) ?? example?.platforms[0]
  const theme = PLATFORM_THEME[platform]

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：用步骤序列展示桥接流程，不执行真实 registerPlugin / 原生代码调用。
      </div>

      {/* 示例选择 */}
      <div className="flex flex-wrap gap-sm">
        {examples.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setExampleId(ex.id)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-all',
              exampleId === ex.id ? 'text-canvas' : 'border-hairline text-body-mid hover:text-body-hi'
            )}
            style={exampleId === ex.id ? { background: '#119eff', borderColor: '#119eff' } : undefined}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Web 调用代码 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <div className="mb-xs text-caption-mono-sm text-body-mid">Web 端调用（统一 API）</div>
        <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
          {example?.webCallCode}
        </pre>
      </div>

      {/* 平台切换 + 桥接流程 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <div className="mb-md flex flex-wrap items-center justify-between gap-sm">
          <h4 className="font-mono text-body-sm text-body-hi">桥接流程</h4>
          <div className="flex gap-xs">
            {(['web', 'ios', 'android'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={cn(
                  'rounded-pill border px-sm py-xs font-mono text-caption-mono-sm transition-all',
                  platform === p ? 'text-canvas' : 'text-body-mid'
                )}
                style={platform === p ? { background: PLATFORM_THEME[p].color, borderColor: PLATFORM_THEME[p].color } : { borderColor: 'rgba(125,125,125,0.2)' }}
              >
                {PLATFORM_THEME[p].label}
              </button>
            ))}
          </div>
        </div>

        {/* 步骤序列 */}
        <div className="space-y-sm">
          {platformSpec?.steps.map((step, i) => (
            <div
              key={step.id}
              className="flex items-start gap-md rounded-sm border p-sm"
              style={{ borderColor: theme.border, background: theme.bg }}
            >
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-caption-mono-sm text-canvas"
                style={{ background: theme.color }}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="font-mono text-body-sm font-bold" style={{ color: theme.color }}>
                  {step.label}
                </div>
                <div className="mt-xs text-caption-mono-sm text-body-mid">{step.description}</div>
                {step.code && (
                  <pre className="mt-xs overflow-x-auto rounded-sm bg-canvas-bg-inset p-sm font-mono text-caption-mono-sm text-body-hi">
                    {step.code}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 结果 */}
        <div className="mt-md rounded-sm bg-canvas-bg-inset p-sm">
          <div className="text-caption-mono-sm text-body-mid">执行结果</div>
          <p className="mt-xs text-caption-mono-sm text-body-hi">{platformSpec?.result}</p>
          {!platformSpec?.hasNativeImpl && (
            <div className="mt-xs inline-block rounded-pill bg-[#f59e0b]/15 px-sm py-xs text-caption-mono-sm text-[#b45309]">
              Web Fallback（无原生实现）
            </div>
          )}
        </div>
      </div>

      {/* registerPlugin 原理 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">registerPlugin 原理</h4>
        <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
{`// Capacitor 自动生成的 Proxy
import { registerPlugin } from '@capacitor/core'

const Camera = registerPlugin('Camera', {
  web: () => import('./web').then(m => new m.CameraWeb()),
  ios: () => import('./ios').then(m => new m.CameraIOS()),
  android: () => import('./android').then(m => new m.CameraAndroid())
})

// 调用时自动分发到对应平台实现
// Web 端加载 CameraWeb（fallback）
// iOS 端加载 CameraIOS（Swift 原生）
// Android 端加载 CameraAndroid（Kotlin 原生）`}
        </pre>
      </div>
    </div>
  )
}
