/**
 * DataTypeExplorer - 数据类型探索器
 *
 * 点击类型卡片切换，右侧显示 typeof 结果、可变性标识、分类与说明。
 * 直观对比原始类型与引用类型的差异。
 */
import { useState } from 'react'
import type { DataTypeExplorerData } from '../../../lib/js-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, GroupLabel } from './shared'

interface DataTypeExplorerProps {
  data: DataTypeExplorerData
}

export function DataTypeExplorer({ data }: DataTypeExplorerProps) {
  const [selected, setSelected] = useState(0)
  const current = data.types[selected]

  if (!current) return null

  return (
    <DemoCard title={data.title}>
      <div className="grid grid-cols-1 gap-md p-md lg:grid-cols-[1fr_1.2fr]">
        {/* 类型网格 */}
        <div className="grid grid-cols-2 gap-xs sm:grid-cols-3">
          {data.types.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setSelected(i)}
              className={cn(
                'rounded-xs border px-sm py-sm text-left transition-all',
                selected === i
                  ? 'border-accent-sunset bg-canvas-soft'
                  : 'border-hairline bg-canvas hover:border-accent-sunset',
              )}
            >
              <div className="font-mono text-caption-mono-sm font-bold text-body">{t.name}</div>
              <div className="text-[0.62rem] text-body-mid">
                {t.category === 'primitive' ? '原始' : '引用'}
              </div>
            </button>
          ))}
        </div>

        {/* 详情面板 */}
        <div className="flex flex-col gap-sm rounded-xs border border-hairline bg-canvas-soft p-md">
          <div className="flex items-center justify-between">
            <span className="font-mono text-body font-bold text-accent-sunset">{current.name}</span>
            <span
              className={cn(
                'rounded-pill px-sm py-px text-[0.62rem] font-bold',
                current.category === 'primitive'
                  ? 'bg-accent-breeze/20 text-accent-breeze'
                  : 'bg-accent-sunset/20 text-accent-sunset',
              )}
            >
              {current.category === 'primitive' ? '原始类型' : '引用类型'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-xs">
            <div className="rounded-xs bg-canvas px-sm py-xs">
              <div className="text-[0.62rem] uppercase text-body-mid">示例值</div>
              <code className="font-mono text-caption-mono-sm text-accent-sunset">{current.value}</code>
            </div>
            <div className="rounded-xs bg-canvas px-sm py-xs">
              <div className="text-[0.62rem] uppercase text-body-mid">typeof 返回</div>
              <code className="font-mono text-caption-mono-sm text-accent-breeze">
                "{current.typeofResult}"
              </code>
            </div>
          </div>

          <div className="flex items-center gap-xs">
            <GroupLabel>可变性</GroupLabel>
            <span
              className={cn(
                'rounded-pill px-sm py-px text-[0.62rem] font-bold',
                current.mutable ? 'bg-red-400/20 text-red-400' : 'bg-accent-breeze/20 text-accent-breeze',
              )}
            >
              {current.mutable ? '可变' : '不可变'}
            </span>
          </div>

          <p className="text-caption-sm text-body">{current.desc}</p>
        </div>
      </div>
    </DemoCard>
  )
}
