/**
 * ElementAnatomy - HTML 元素解剖图
 *
 * 将 HTML 元素拆解为可视化部分：开始标签、内容、结束标签。
 * 点击各部分显示详细说明，支持空元素（void element）展示。
 *
 * 设计规范：使用三色区分元素各部分（sunset/twilight/breeze），
 * 激活态上浮 + 缩放，GeistMono 字体显示代码。
 */
import { useState } from 'react'
import type { ElementAnatomyData } from '../../../lib/html-visualization-types'
import { cn } from '../../../lib/utils'

interface ElementAnatomyProps {
  data: ElementAnatomyData
}

type PartType = 'opening' | 'content' | 'closing' | 'attribute'

export function ElementAnatomy({ data }: ElementAnatomyProps) {
  const [activePart, setActivePart] = useState<PartType | null>(null)

  const partInfo: Record<PartType, { label: string; desc: string }> = {
    opening: {
      label: '开始标签',
      desc: data.parts.openingTag,
    },
    content: {
      label: '内容',
      desc: data.parts.content,
    },
    closing: {
      label: '结束标签',
      desc: data.parts.closingTag,
    },
    attribute: {
      label: '属性',
      desc: '属性提供元素的附加信息，以 name="value" 形式出现在开始标签中。',
    },
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 元素展示区 */}
      <div className="flex flex-wrap items-center justify-center gap-xs py-xl">
        {/* 开始标签 */}
        <button
          type="button"
          onClick={() => setActivePart(activePart === 'opening' ? null : 'opening')}
          className={cn(
            'relative rounded-xxs border px-sm py-xs font-mono text-body-md transition-all duration-200',
            'border-accent-sunset/30 bg-accent-sunset/10 text-accent-sunset',
            activePart === 'opening' && '-translate-y-1 scale-105 border-accent-sunset',
          )}
        >
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid opacity-0 transition-opacity"
            style={{ opacity: activePart === 'opening' ? 1 : 0 }}
          >
            opening
          </span>
          &lt;{data.tag}
          {/* 属性 */}
          {data.attributes?.map((attr, i) => (
            <span
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                setActivePart(activePart === 'attribute' ? null : 'attribute')
              }}
              className="ml-xs cursor-pointer rounded-xxs px-xxs text-accent-twilight hover:bg-accent-twilight/10"
            >
              {attr.name}=<span className="text-accent-breeze">"{attr.value}"</span>
            </span>
          ))}
          &gt;
        </button>

        {/* 内容 */}
        {!data.isVoid && (
          <button
            type="button"
            onClick={() => setActivePart(activePart === 'content' ? null : 'content')}
            className={cn(
              'relative rounded-xxs border px-sm py-xs font-mono text-body-md transition-all duration-200',
              'border-accent-twilight/30 bg-accent-twilight/10 text-accent-twilight',
              activePart === 'content' && '-translate-y-1 scale-105 border-accent-twilight',
            )}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid opacity-0 transition-opacity"
              style={{ opacity: activePart === 'content' ? 1 : 0 }}
            >
              content
            </span>
            {data.content}
          </button>
        )}

        {/* 结束标签 */}
        {!data.isVoid && (
          <button
            type="button"
            onClick={() => setActivePart(activePart === 'closing' ? null : 'closing')}
            className={cn(
              'relative rounded-xxs border px-sm py-xs font-mono text-body-md transition-all duration-200',
              'border-accent-breeze/30 bg-accent-breeze/10 text-accent-breeze',
              activePart === 'closing' && '-translate-y-1 scale-105 border-accent-breeze',
            )}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid opacity-0 transition-opacity"
              style={{ opacity: activePart === 'closing' ? 1 : 0 }}
            >
              closing
            </span>
            &lt;/{data.tag}&gt;
          </button>
        )}

        {/* 空元素自闭合标识 */}
        {data.isVoid && (
          <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            /&gt;
          </span>
        )}
      </div>

      {/* 详情面板 */}
      <div className="mt-lg rounded-sm border border-hairline bg-canvas-soft p-lg">
        {activePart ? (
          <div>
            <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
              {partInfo[activePart].label}
            </div>
            <p className="mt-xs text-body-sm text-body">{partInfo[activePart].desc}</p>
            {activePart === 'attribute' && data.attributes && (
              <div className="mt-md space-y-xs">
                {data.attributes.map((attr, i) => (
                  <div key={i} className="flex items-baseline gap-sm">
                    <code className="rounded-xxs bg-canvas px-xs py-xxs font-mono text-caption-mono-sm text-accent-twilight">
                      {attr.name}
                    </code>
                    <span className="text-body-sm text-body-mid">{attr.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-body-sm text-body-mid">
            点击元素的各个部分（开始标签、内容、结束标签）查看详细说明。
            {data.isVoid && ' 这是一个空元素（void element），没有结束标签和内容。'}
          </p>
        )}
      </div>

      {/* 空元素列表 */}
      {data.isVoid && (
        <div className="mt-lg border-t border-hairline pt-md">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            常见空元素
          </div>
          <div className="flex flex-wrap gap-xs">
            {['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'].map((tag) => (
              <span
                key={tag}
                className="rounded-xxs border border-accent-sunset/30 bg-accent-sunset/5 px-xs py-xxs font-mono text-caption-mono-sm text-accent-sunset"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
