/**
 * PathParser - URL 路径解析器
 *
 * 输入 URL 实时解析为各组成部分：协议、主机、路径、查询参数、哈希。
 * 使用不同颜色区分各部分，直观展示 URL 结构。
 *
 * 设计规范：输入框使用 canvas-soft 背景，解析结果用多色区分，
 * GeistMono 字体显示 URL 各部分。
 */
import { useState } from 'react'
import type { PathParserData } from '../../../lib/html-visualization-types'

interface PathParserProps {
  data: PathParserData
}

interface ParsedUrl {
  protocol: string
  host: string
  pathname: string
  search: string
  hash: string
  params: Array<[string, string]>
}

function parseUrl(url: string): ParsedUrl | null {
  try {
    const u = new URL(url)
    const params: Array<[string, string]> = []
    u.searchParams.forEach((value, key) => {
      params.push([key, value])
    })
    return {
      protocol: u.protocol,
      host: u.host,
      pathname: u.pathname,
      search: u.search,
      hash: u.hash,
      params,
    }
  } catch {
    return null
  }
}

export function PathParser({ data }: PathParserProps) {
  const [url, setUrl] = useState(data.defaultUrl)
  const parsed = parseUrl(url)

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
      {data.hint && (
        <div className="mb-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.hint}
        </div>
      )}

      {/* 输入区 */}
      <div className="flex gap-xs">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-xxs border border-hairline bg-canvas-soft px-md py-xs font-mono text-body-sm text-ink outline-none transition-colors focus:border-accent-sunset"
          placeholder="输入 URL..."
        />
      </div>

      {/* 示例按钮 */}
      {data.examples && data.examples.length > 0 && (
        <div className="mt-sm flex flex-wrap gap-xs">
          <span className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            示例:
          </span>
          {data.examples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setUrl(ex)}
              className="rounded-pill border border-hairline px-xs py-xxs font-mono text-caption-mono-sm text-body-mid transition-colors hover:border-accent-sunset hover:text-accent-sunset"
            >
              {ex.length > 30 ? ex.slice(0, 30) + '...' : ex}
            </button>
          ))}
        </div>
      )}

      {/* 解析结果 */}
      <div className="mt-lg rounded-sm border border-hairline bg-canvas-soft p-md">
        {parsed ? (
          <>
            {/* 可视化 URL */}
            <div className="mb-md flex flex-wrap items-center gap-xxs font-mono text-body-sm">
              <span className="rounded-xxs bg-accent-sunset/15 px-xs py-xxs text-accent-sunset">
                {parsed.protocol}//
              </span>
              <span className="rounded-xxs bg-accent-twilight/15 px-xs py-xxs text-accent-twilight">
                {parsed.host}
              </span>
              {parsed.pathname && (
                <span className="rounded-xxs bg-accent-breeze/15 px-xs py-xxs text-accent-breeze">
                  {parsed.pathname}
                </span>
              )}
              {parsed.search && (
                <span className="rounded-xxs bg-purple-500/15 px-xs py-xxs text-purple-400">
                  {parsed.search}
                </span>
              )}
              {parsed.hash && (
                <span className="rounded-xxs bg-red-500/15 px-xs py-xxs text-red-400">
                  {parsed.hash}
                </span>
              )}
            </div>

            {/* 详细解析 */}
            <div className="space-y-xs">
              <ParsedRow label="protocol" value={parsed.protocol} color="sunset" />
              <ParsedRow label="host" value={parsed.host} color="twilight" />
              <ParsedRow label="pathname" value={parsed.pathname} color="breeze" />
              {parsed.search && (
                <ParsedRow label="search" value={parsed.search} color="purple" />
              )}
              {parsed.hash && <ParsedRow label="hash" value={parsed.hash} color="red" />}

              {/* 查询参数 */}
              {parsed.params.length > 0 && (
                <div className="pt-sm">
                  <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                    查询参数解析
                  </div>
                  <div className="space-y-xs">
                    {parsed.params.map(([key, value], i) => (
                      <div key={i} className="flex items-baseline gap-sm font-mono text-caption-mono">
                        <span className="text-purple-400">{key}</span>
                        <span className="text-body-mid">=</span>
                        <span className="text-accent-breeze">"{value}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-body-sm text-body-mid">
            无法解析 URL，请输入完整的 URL（包含协议，如 https://）
          </p>
        )}
      </div>
    </div>
  )
}

interface ParsedRowProps {
  label: string
  value: string
  color: 'sunset' | 'twilight' | 'breeze' | 'purple' | 'red'
}

function ParsedRow({ label, value, color }: ParsedRowProps) {
  const colorMap = {
    sunset: 'text-accent-sunset',
    twilight: 'text-accent-twilight',
    breeze: 'text-accent-breeze',
    purple: 'text-purple-400',
    red: 'text-red-400',
  }
  return (
    <div className="flex items-baseline gap-sm border-b border-hairline py-xs last:border-b-0">
      <span className="min-w-[80px] font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
        {label}
      </span>
      <span className={`font-mono text-caption-mono ${colorMap[color]}`}>{value}</span>
    </div>
  )
}
