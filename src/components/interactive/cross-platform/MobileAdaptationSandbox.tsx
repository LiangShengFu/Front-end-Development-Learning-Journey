/**
 * MobileAdaptationSandbox — 移动端适配沙盒
 *
 * 交互式预览移动端适配方案的渲染效果：可切换 rem/vw 方案、调整设计稿宽度（375/750）、
 * 模拟不同 DPR（1/2/3）与安全区域（无/刘海/底部 Home 条），实时对比 1px 问题解决方案。
 *
 * ⚠️ 教学模拟：用 React state 模拟适配方案，不执行真实 PostCSS 编译。
 */
import { useMemo, useState } from 'react'
import type {
  MobileAdaptationSandboxData,
  AdaptationPreset,
  AdaptationScheme,
  SafeAreaType,
  OnePixelSolution,
} from '../../../lib/cross-platform-visualization-types'
import { cn } from '../../../lib/utils'

interface MobileAdaptationSandboxProps {
  data?: MobileAdaptationSandboxData
}

/** 默认适配预设 */
const DEFAULT_PRESETS: AdaptationPreset[] = [
  {
    id: 'rem-375',
    label: 'rem · 375 设计稿',
    scheme: 'rem',
    designWidth: 375,
    dpr: 2,
    safeArea: 'notch',
    rootFontSize: 37.5,
    onePixelSolution: 'transform',
  },
  {
    id: 'vw-750',
    label: 'vw · 750 设计稿',
    scheme: 'vw',
    designWidth: 750,
    dpr: 3,
    safeArea: 'home-indicator',
    onePixelSolution: 'viewport',
  },
  {
    id: 'rem-750',
    label: 'rem · 750 设计稿',
    scheme: 'rem',
    designWidth: 750,
    dpr: 3,
    safeArea: 'none',
    rootFontSize: 75,
    onePixelSolution: 'border-image',
  },
]

const SCHEME_THEME: Record<AdaptationScheme, { color: string; bg: string; border: string }> = {
  rem: { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', border: 'rgba(26,108,255,0.35)' },
  vw: { color: '#07c160', bg: 'rgba(7,193,96,0.10)', border: 'rgba(7,193,96,0.35)' },
}

const SAFE_AREA_LABEL: Record<SafeAreaType, string> = {
  none: '无安全区域',
  notch: '刘海屏（顶部）',
  'home-indicator': 'Home 条（底部）',
}

const ONE_PIXEL_LABEL: Record<OnePixelSolution, string> = {
  transform: 'transform: scaleY(0.5)',
  viewport: 'viewport 缩放',
  'border-image': 'border-image',
}

export function MobileAdaptationSandbox({ data }: MobileAdaptationSandboxProps) {
  const presets = data?.presets ?? DEFAULT_PRESETS
  const [presetId, setPresetId] = useState(presets[0]?.id ?? 'rem-375')
  const [scheme, setScheme] = useState<AdaptationScheme>(presets[0]?.scheme ?? 'rem')
  const [designWidth, setDesignWidth] = useState<number>(presets[0]?.designWidth ?? 375)
  const [dpr, setDpr] = useState<number>(presets[0]?.dpr ?? 2)
  const [safeArea, setSafeArea] = useState<SafeAreaType>(presets[0]?.safeArea ?? 'notch')
  const [onePixel, setOnePixel] = useState<OnePixelSolution>(presets[0]?.onePixelSolution ?? 'transform')

  const theme = SCHEME_THEME[scheme]

  /** 根据当前方案计算根字号 / vw 值 */
  const computedValues = useMemo(() => {
    const rootFontSize = designWidth / 10
    const vwRatio = 100 / designWidth
    return { rootFontSize, vwRatio }
  }, [designWidth])

  /** 应用预设 */
  const applyPreset = (preset: AdaptationPreset) => {
    setPresetId(preset.id)
    setScheme(preset.scheme)
    setDesignWidth(preset.designWidth)
    setDpr(preset.dpr)
    setSafeArea(preset.safeArea)
    setOnePixel(preset.onePixelSolution)
  }

  /** 1px 边框样式 */
  const onePixelStyle = useMemo(() => {
    switch (onePixel) {
      case 'transform':
        return { borderBottom: '1px solid currentColor', transform: 'scaleY(0.5)', transformOrigin: '0 0' }
      case 'viewport':
        return { borderBottom: '1px solid currentColor' }
      case 'border-image':
        return { borderBottom: '2px solid', borderImage: 'linear-gradient(currentColor, currentColor) 1' }
    }
  }, [onePixel])

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：用 React state 模拟适配方案渲染，实际项目通过 PostCSS 插件（postcss-pxtorem / postcss-px-to-viewport）自动处理。
      </div>

      {/* 预设切换 */}
      <div className="flex flex-wrap gap-sm">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => applyPreset(p)}
            className={cn(
              'rounded-pill border px-md py-xs text-caption-mono-sm transition-all',
              presetId === p.id ? 'text-canvas' : 'border-hairline text-body-mid hover:text-body-hi'
            )}
            style={presetId === p.id ? { background: theme.color, borderColor: theme.color } : undefined}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[1fr_1.2fr]">
        {/* 控制面板 */}
        <div className="space-y-md rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="font-mono text-body-sm text-body-hi">控制面板</h4>

          {/* 方案切换 */}
          <div>
            <label className="text-caption-mono-sm text-body-mid">适配方案</label>
            <div className="mt-xs flex gap-sm">
              {(['rem', 'vw'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setScheme(s)}
                  className={cn(
                    'flex-1 rounded-sm border py-xs font-mono text-caption-mono-sm transition-all',
                    scheme === s ? 'text-canvas' : 'border-hairline text-body-mid'
                  )}
                  style={scheme === s ? { background: SCHEME_THEME[s].color, borderColor: SCHEME_THEME[s].color } : undefined}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* 设计稿宽度 */}
          <div>
            <label className="text-caption-mono-sm text-body-mid">设计稿宽度</label>
            <div className="mt-xs flex gap-sm">
              {[375, 750].map((w) => (
                <button
                  key={w}
                  onClick={() => setDesignWidth(w)}
                  className={cn(
                    'flex-1 rounded-sm border py-xs font-mono text-caption-mono-sm transition-all',
                    designWidth === w ? 'text-canvas' : 'border-hairline text-body-mid'
                  )}
                  style={designWidth === w ? { background: theme.color, borderColor: theme.color } : undefined}
                >
                  {w}px
                </button>
              ))}
            </div>
          </div>

          {/* DPR */}
          <div>
            <label className="text-caption-mono-sm text-body-mid">设备 DPR</label>
            <div className="mt-xs flex gap-sm">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  onClick={() => setDpr(d)}
                  className={cn(
                    'flex-1 rounded-sm border py-xs font-mono text-caption-mono-sm transition-all',
                    dpr === d ? 'text-canvas' : 'border-hairline text-body-mid'
                  )}
                  style={dpr === d ? { background: theme.color, borderColor: theme.color } : undefined}
                >
                  {d}x
                </button>
              ))}
            </div>
          </div>

          {/* 安全区域 */}
          <div>
            <label className="text-caption-mono-sm text-body-mid">安全区域</label>
            <div className="mt-xs flex flex-wrap gap-xs">
              {(['none', 'notch', 'home-indicator'] as const).map((sa) => (
                <button
                  key={sa}
                  onClick={() => setSafeArea(sa)}
                  className={cn(
                    'rounded-pill border px-sm py-xs text-caption-mono-sm transition-all',
                    safeArea === sa ? 'text-canvas' : 'border-hairline text-body-mid'
                  )}
                  style={safeArea === sa ? { background: theme.color, borderColor: theme.color } : undefined}
                >
                  {SAFE_AREA_LABEL[sa]}
                </button>
              ))}
            </div>
          </div>

          {/* 1px 解决方案 */}
          <div>
            <label className="text-caption-mono-sm text-body-mid">1px 问题解决</label>
            <div className="mt-xs flex flex-wrap gap-xs">
              {(['transform', 'viewport', 'border-image'] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => setOnePixel(op)}
                  className={cn(
                    'rounded-pill border px-sm py-xs font-mono text-caption-mono-sm transition-all',
                    onePixel === op ? 'text-canvas' : 'border-hairline text-body-mid'
                  )}
                  style={onePixel === op ? { background: theme.color, borderColor: theme.color } : undefined}
                >
                  {ONE_PIXEL_LABEL[op]}
                </button>
              ))}
            </div>
          </div>

          {/* 计算结果 */}
          <div className="mt-md rounded-sm bg-canvas-bg-inset p-sm font-mono text-caption-mono-sm" style={{ color: theme.color }}>
            {scheme === 'rem' ? (
              <span>rootFontSize = {designWidth} / 10 = <strong>{computedValues.rootFontSize}px</strong></span>
            ) : (
              <span>1px = {computedValues.vwRatio.toFixed(4)}vw（{designWidth}px → 100vw）</span>
            )}
          </div>
        </div>

        {/* 预览区 */}
        <div className="space-y-md rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="font-mono text-body-sm text-body-hi">实时预览</h4>

          {/* 设备模拟框 */}
          <div
            className="relative mx-auto overflow-hidden rounded-sm border-2"
            style={{
              width: '100%',
              maxWidth: '280px',
              aspectRatio: '9 / 16',
              background: '#fff',
              borderColor: theme.border,
            }}
          >
            {/* 刘海 */}
            {safeArea === 'notch' && (
              <div
                className="absolute left-1/2 top-0 z-10 -translate-x-1/2 bg-black"
                style={{ width: '40%', height: '18px', borderRadius: '0 0 6px 6px' }}
              />
            )}
            {/* Home 条 */}
            {safeArea === 'home-indicator' && (
              <div
                className="absolute bottom-1 left-1/2 z-10 -translate-x-1/2 rounded-pill bg-black/30"
                style={{ width: '35%', height: '4px' }}
              />
            )}

            {/* 内容区 */}
            <div className="flex h-full flex-col items-center justify-center gap-sm p-md" style={{ paddingTop: safeArea === 'notch' ? '24px' : '12px', paddingBottom: safeArea === 'home-indicator' ? '20px' : '12px' }}>
              <div
                className="text-center font-bold"
                style={{ fontSize: scheme === 'rem' ? '1rem' : '4vw', color: theme.color }}
              >
                {scheme === 'rem' ? '1rem = 16px' : '4vw'}
              </div>
              <div className="text-caption-mono-sm text-body-mid">
                DPR {dpr}x · {designWidth}px
              </div>
              {/* 1px 边框对比 */}
              <div className="mt-sm w-full space-y-xs">
                <div className="text-caption-mono-sm text-body-mid">1px 边框（{ONE_PIXEL_LABEL[onePixel]}）</div>
                <div className="w-full" style={{ ...onePixelStyle, color: theme.color }} />
                <div className="text-caption-mono-sm text-body-mid">普通 1px 边框</div>
                <div className="w-full border-b" style={{ borderColor: '#ccc' }} />
              </div>
            </div>
          </div>

          {/* viewport meta 代码 */}
          <div className="rounded-sm bg-canvas-bg-inset p-sm">
            <div className="text-caption-mono-sm text-body-mid">viewport meta</div>
            <pre className="mt-xs overflow-x-auto font-mono text-caption-mono-sm text-body-hi">
{`<meta name="viewport" content="width=${designWidth / dpr},initial-scale=${dpr},viewport-fit=cover" />`}
            </pre>
          </div>
        </div>
      </div>

      {/* 方案对比说明 */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <div className="rounded-sm border p-md" style={{ borderColor: SCHEME_THEME.rem.border, background: SCHEME_THEME.rem.bg }}>
          <div className="font-mono text-body-sm font-bold" style={{ color: SCHEME_THEME.rem.color }}>rem 方案</div>
          <p className="mt-xs text-caption-mono-sm text-body-mid">
            通过 JS 动态设置 root font-size（如 lib-flexible），CSS 用 rem 单位。需配合 PostCSS postcss-pxtorem 自动转换。
          </p>
        </div>
        <div className="rounded-sm border p-md" style={{ borderColor: SCHEME_THEME.vw.border, background: SCHEME_THEME.vw.bg }}>
          <div className="font-mono text-body-sm font-bold" style={{ color: SCHEME_THEME.vw.color }}>vw 方案</div>
          <p className="mt-xs text-caption-mono-sm text-body-mid">
            纯 CSS 方案，1vw = 视口宽度的 1%。配合 PostCSS postcss-px-to-viewport 自动转换，无需 JS。
          </p>
        </div>
      </div>
    </div>
  )
}
