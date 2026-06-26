/**
 * SassPlayground — Sass 变量与 Mixin 实时编译演示
 *
 * 调整 Sass 变量（颜色、圆角、内边距），实时预览编译效果
 * 并展示生成的 CSS 代码。
 *
 * 对应docx中演示 #9
 */
import { useState, useMemo } from 'react'
import type { SassPlaygroundData } from '../../../lib/css-engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface SassPlaygroundProps {
  data?: SassPlaygroundData
}

const DEFAULT_COLORS = [
  '#3b82f6', // blue-500
  '#22c55e', // green-500
  '#ef4444', // red-500
  '#a855f7', // purple-500
  '#f97316', // orange-500
  '#ec4899', // pink-500
]

export function SassPlayground({ data }: SassPlaygroundProps) {
  const [color, setColor] = useState(data?.defaultColor ?? '#3b82f6')
  const [radius, setRadius] = useState(data?.defaultRadius ?? 8)
  const [padding, setPadding] = useState(data?.defaultPadding ?? 16)
  const colorPresets = data?.colorPresets ?? DEFAULT_COLORS

  // 生成模拟的 SCSS 源码
  const scssCode = useMemo(
    () => `// Sass 变量定义
$primary-color: ${color};
$border-radius: ${radius}px;
$btn-padding: ${padding}px;

// Mixin 定义
@mixin btn-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: $border-radius;
  padding: $btn-padding calc($btn-padding * 1.5);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

// 使用变量和 Mixin
.btn-primary {
  @include btn-base;
  background: $primary-color;
  color: white;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
}`,
    [color, radius, padding],
  )

  // 生成编译后的 CSS
  const compiledCss = useMemo(
    () => `.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${radius}px;
  padding: ${padding}px ${Math.round(padding * 1.5)}px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${color};
  color: white;
}

.btn-primary:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}`,
    [color, radius, padding],
  )

  return (
    <div className="space-y-lg">
      {/* 变量控制面板 */}
      <div className="grid gap-lg sm:grid-cols-3">
        {/* 颜色选择 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            $primary-color
          </div>
          <div className="flex flex-wrap gap-sm">
            {colorPresets.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={cn(
                  'h-7 w-7 rounded-full border-2 transition-transform hover:scale-110',
                  color === c ? 'border-white' : 'border-transparent',
                )}
                style={{ backgroundColor: c }}
                aria-label={`选择颜色 ${c}`}
              />
            ))}
          </div>
          <div className="mt-md flex items-center gap-sm">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent"
            />
            <span className="font-mono text-body-sm text-accent-sunset">
              {color}
            </span>
          </div>
        </div>

        {/* 圆角 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            $border-radius
          </div>
          <div className="flex items-center gap-md">
            <input
              type="range"
              min={0}
              max={24}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-pill bg-canvas-mid accent-accent-dusk"
            />
            <span className="min-w-[3rem] text-right font-mono text-body-sm text-accent-dusk">
              {radius}px
            </span>
          </div>
        </div>

        {/* 内边距 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
          <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            $btn-padding
          </div>
          <div className="flex items-center gap-md">
            <input
              type="range"
              min={4}
              max={32}
              step={4}
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-pill bg-canvas-mid accent-accent-dusk"
            />
            <span className="min-w-[3rem] text-right font-mono text-body-sm text-accent-dusk">
              {padding}px
            </span>
          </div>
        </div>
      </div>

      {/* 输出区域 */}
      <div className="grid gap-lg lg:grid-cols-2">
        {/* 实时预览 */}
        <div className="flex flex-col gap-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
              实时预览
            </span>
            <span className="font-mono text-caption-mono-sm text-accent-sunset">
              .btn-primary
            </span>
          </div>
          <div className="flex min-h-[100px] items-center justify-center rounded-sm border border-hairline bg-canvas-soft p-xl">
            <button
              type="button"
              className="transition-all duration-200 hover:brightness-110"
              style={{
                background: color,
                color: 'white',
                borderRadius: radius,
                padding: `${padding}px ${Math.round(padding * 1.5)}px`,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Sass Button
            </button>
          </div>
        </div>

        {/* SCSS / CSS 代码 */}
        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-sm">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('sass-code-view')
                if (el) {
                  el.dataset.view =
                    el.dataset.view === 'scss' ? 'css' : 'scss'
                  el.textContent =
                    el.dataset.view === 'scss' ? scssCode : compiledCss
                }
              }}
              className="rounded-pill border border-hairline bg-canvas-soft px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-colors hover:border-white/30"
            >
              切换 SCSS / CSS
            </button>
            <span className="font-mono text-caption-mono-sm text-accent-dusk">
              .scss → .css
            </span>
          </div>
          <pre
            id="sass-code-view"
            data-view="scss"
            className="min-h-[160px] overflow-auto rounded-sm border border-hairline bg-canvas-soft p-lg font-mono text-body-sm text-body leading-relaxed"
          >
            {scssCode}
          </pre>
        </div>
      </div>

      {/* 特性说明 */}
      <div className="grid grid-cols-1 gap-sm sm:grid-cols-3">
        {[
          {
            title: '变量 $variable',
            desc: '存储可复用的值（颜色、尺寸），统一修改，全局生效。',
          },
          {
            title: '嵌套 Nesting',
            desc: '选择器嵌套在父级内，减少重复，结构清晰。& 引用父选择器。',
          },
          {
            title: 'Mixin @mixin / @include',
            desc: '定义可复用的样式块，支持传参，类似函数。@include 调用。',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-sm border border-hairline bg-canvas-soft p-lg"
          >
            <div className="font-mono text-caption-mono-sm text-accent-dusk">
              {item.title}
            </div>
            <p className="mt-sm text-body-sm text-body-mid">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
