/**
 * LocationParser - location URL 解析器
 *
 * 输入 URL，实时解析 protocol/host/hostname/port/pathname/search/hash/origin 各部分。
 */
import { useState, useEffect } from 'react'
import type { LocationParserData } from '../../../lib/dom-bom-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, CodeOutput } from './shared'

interface LocationParserProps {
  data: LocationParserData
}

interface ParsedUrl {
  protocol: string
  host: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  origin: string
  params: Array<{ key: string; value: string }>
  error?: string
}

function parseUrl(url: string): ParsedUrl {
  try {
    const u = new URL(url)
    const params: Array<{ key: string; value: string }> = []
    u.searchParams.forEach((value, key) => params.push({ key, value }))
    return {
      protocol: u.protocol,
      host: u.host,
      hostname: u.hostname,
      port: u.port,
      pathname: u.pathname,
      search: u.search,
      hash: u.hash,
      origin: u.origin,
      params,
    }
  } catch (e) {
    return {
      protocol: '',
      host: '',
      hostname: '',
      port: '',
      pathname: '',
      search: '',
      hash: '',
      origin: '',
      params: [],
      error: (e as Error).message,
    }
  }
}

const PART_COLORS: Record<string, string> = {
  protocol: 'text-accent-sunset',
  host: 'text-accent-breeze',
  hostname: 'text-accent-breeze',
  port: 'text-orange-400',
  pathname: 'text-purple-400',
  search: 'text-pink-400',
  hash: 'text-red-400',
  origin: 'text-accent-sunset',
}

export function LocationParser({ data }: LocationParserProps) {
  const [url, setUrl] = useState(data.initialUrl ?? 'https://example.com:8080/path/page?key=value#anchor')
  const [parsed, setParsed] = useState<ParsedUrl>(() => parseUrl(data.initialUrl ?? 'https://example.com:8080/path/page?key=value#anchor'))

  useEffect(() => {
    setParsed(parseUrl(url))
  }, [url])

  const parts = [
    { label: 'protocol', desc: '协议', example: 'https:' },
    { label: 'host', desc: '主机（含端口）', example: 'example.com:8080' },
    { label: 'hostname', desc: '主机名', example: 'example.com' },
    { label: 'port', desc: '端口', example: '8080' },
    { label: 'pathname', desc: '路径', example: '/path/page' },
    { label: 'search', desc: '查询字符串', example: '?key=value' },
    { label: 'hash', desc: '锚点', example: '#anchor' },
    { label: 'origin', desc: '源', example: 'https://example.com:8080' },
  ]

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>URL</GroupLabel>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-xs border border-hairline bg-canvas px-sm py-xxs font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
          placeholder="https://example.com:8080/path?key=value#hash"
        />
      </ControlRow>

      <div className="p-md">
        {parsed.error ? (
          <div className="rounded-xs border border-red-400 bg-red-400/10 p-sm font-mono text-caption-mono-sm text-red-400">
            解析失败: {parsed.error}
          </div>
        ) : (
          <>
            {/* URL 各部分高亮 */}
            <div className="mb-md rounded-xs border border-hairline bg-canvas-soft p-md">
              <div className="mb-1 text-[0.62rem] uppercase text-body-mid">URL 结构</div>
              <div className="flex flex-wrap items-center gap-px font-mono text-caption-mono-sm">
                <span className={cn('rounded-px bg-accent-sunset/20 px-1', PART_COLORS.protocol)}>
                  {parsed.protocol}
                </span>
                <span className="text-body-mid">//</span>
                <span className={cn('rounded-px bg-accent-breeze/20 px-1', PART_COLORS.host)}>
                  {parsed.host}
                </span>
                <span className={cn('rounded-px bg-purple-400/20 px-1', PART_COLORS.pathname)}>
                  {parsed.pathname}
                </span>
                {parsed.search && (
                  <span className={cn('rounded-px bg-pink-400/20 px-1', PART_COLORS.search)}>
                    {parsed.search}
                  </span>
                )}
                {parsed.hash && (
                  <span className={cn('rounded-px bg-red-400/20 px-1', PART_COLORS.hash)}>
                    {parsed.hash}
                  </span>
                )}
              </div>
            </div>

            {/* 各部分详情 */}
            <div className="grid grid-cols-2 gap-xs lg:grid-cols-4">
              {parts.map((p) => {
                const value = parsed[p.label as keyof ParsedUrl]
                return (
                  <div key={p.label} className="rounded-xs border border-hairline bg-canvas-mid px-sm py-xs">
                    <div className="text-[0.62rem] uppercase text-body-mid">{p.desc}</div>
                    <code className={cn('font-mono text-caption-mono-sm', PART_COLORS[p.label])}>
                      {(typeof value === 'string' ? value : '') || <span className="text-body-mid">（空）</span>}
                    </code>
                  </div>
                )
              })}
            </div>

            {/* 查询参数 */}
            {parsed.params.length > 0 && (
              <div className="mt-md rounded-xs border border-hairline bg-canvas-soft p-sm">
                <div className="mb-1 text-[0.62rem] uppercase text-body-mid">
                  查询参数（URLSearchParams 解析）
                </div>
                <div className="flex flex-col gap-px font-mono text-caption-mono-sm">
                  {parsed.params.map((p, i) => (
                    <div key={i} className="flex gap-sm">
                      <span className="text-accent-sunset">{p.key}</span>
                      <span className="text-body-mid">=</span>
                      <span className="text-accent-breeze">{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* location 对应属性 */`}</span>
        {'\n'}
        <span className="text-accent-breeze">const</span> u ={' '}
        <span className="text-accent-breeze">new</span>{' '}
        <span className="text-accent-sunset">URL</span>(url);{'\n'}
        u.protocol  <span className="text-body-mid">{`// ${parsed.protocol}`}</span>{'\n'}
        u.host      <span className="text-body-mid">{`// ${parsed.host}`}</span>{'\n'}
        u.hostname  <span className="text-body-mid">{`// ${parsed.hostname}`}</span>{'\n'}
        u.port      <span className="text-body-mid">{`// ${parsed.port}`}</span>{'\n'}
        u.pathname  <span className="text-body-mid">{`// ${parsed.pathname}`}</span>{'\n'}
        u.search    <span className="text-body-mid">{`// ${parsed.search}`}</span>{'\n'}
        u.hash      <span className="text-body-mid">{`// ${parsed.hash}`}</span>{'\n'}
        u.origin    <span className="text-body-mid">{`// ${parsed.origin}`}</span>
      </CodeOutput>
    </DemoCard>
  )
}
