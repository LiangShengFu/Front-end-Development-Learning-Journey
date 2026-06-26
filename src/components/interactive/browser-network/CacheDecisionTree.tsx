/**
 * CacheDecisionTree — HTTP 缓存决策树
 *
 * 交互式推导缓存策略：强缓存 / 协商缓存 / no-store / 浏览器前进后退缓存。
 *
 * ⚠️ 教学模拟：展示静态决策路径与 HTTP 头，不执行真实请求。
 */
import { useState } from 'react'
import type {
  CacheDecisionTreeData,
  CacheDecisionNode,
} from '../../../lib/browser-network-visualization-types'
import { cn } from '../../../lib/utils'

interface CacheDecisionTreeProps {
  data?: CacheDecisionTreeData
}

/** 默认决策节点 */
const DEFAULT_NODES: CacheDecisionNode[] = [
  {
    id: 'root',
    type: 'question',
    question: '请求是否包含缓存相关头（Cache-Control / Expires）？',
    yesId: 'has-cache',
    noId: 'no-cache-header',
    color: '#1a6cff',
  },
  {
    id: 'no-cache-header',
    type: 'action',
    strategy: 'no-store',
    strategyLabel: '默认无缓存',
    strategyDescription: '响应未声明缓存策略，浏览器每次都重新请求。建议服务端显式设置 Cache-Control。',
    headers: ['无 Cache-Control / Expires'],
    color: '#7d8590',
  },
  {
    id: 'has-cache',
    type: 'question',
    question: 'Cache-Control 是否为 no-store 或 no-cache？',
    yesId: 'check-no-cache',
    noId: 'check-strong',
    color: '#1a6cff',
  },
  {
    id: 'check-no-cache',
    type: 'question',
    question: '是 no-store 还是 no-cache？',
    yesId: 'no-store-leaf',
    noId: 'no-cache-leaf',
    color: '#1a6cff',
  },
  {
    id: 'no-store-leaf',
    type: 'action',
    strategy: 'no-store',
    strategyLabel: 'no-store 绝不缓存',
    strategyDescription: '浏览器与代理均不存储任何响应内容，每次请求都重新获取。适用于敏感数据（银行余额、验证码）。',
    headers: ['Cache-Control: no-store'],
    color: '#ef4444',
  },
  {
    id: 'no-cache-leaf',
    type: 'action',
    strategy: 'no-cache',
    strategyLabel: 'no-cache 协商缓存',
    strategyDescription: '浏览器存储响应但每次使用前必须向服务端验证（304 才可用本地副本）。适用于需要实时性但可省带宽的场景。',
    headers: ['Cache-Control: no-cache', 'ETag / Last-Modified'],
    color: '#f59e0b',
  },
  {
    id: 'check-strong',
    type: 'question',
    question: '缓存是否过期（对比 Date / max-age / Expires）？',
    yesId: 'stale',
    noId: 'fresh',
    color: '#1a6cff',
  },
  {
    id: 'fresh',
    type: 'action',
    strategy: 'strong-cache',
    strategyLabel: '强缓存命中',
    strategyDescription: '缓存未过期，浏览器直接使用本地副本，不发请求（200 from cache）。适用于静态资源（JS/CSS/图片）。',
    headers: ['Cache-Control: max-age=3600', 'Expires: ...', '状态：200 (from cache)'],
    color: '#07c160',
  },
  {
    id: 'stale',
    type: 'question',
    question: '响应是否包含 ETag 或 Last-Modified？',
    yesId: 'negotiation',
    noId: 're-fetch',
    color: '#1a6cff',
  },
  {
    id: 'negotiation',
    type: 'action',
    strategy: 'negotiation-cache',
    strategyLabel: '协商缓存',
    strategyDescription: '缓存已过期，浏览器发送条件请求（If-None-Match / If-Modified-Since）。资源未变返回 304，可继续用本地副本；变了返回 200 + 新资源。',
    headers: ['请求：If-None-Match / If-Modified-Since', '响应：304 Not Modified 或 200'],
    color: '#a78bfa',
  },
  {
    id: 're-fetch',
    type: 'action',
    strategy: 'no-cache',
    strategyLabel: '重新获取',
    strategyDescription: '缓存过期且无验证标识，浏览器重新完整请求资源。建议服务端补充 ETag 或 Last-Modified。',
    headers: ['无 ETag / Last-Modified', '状态：200'],
    color: '#f59e0b',
  },
]

const DEFAULT_ROOT_ID = 'root'

export function CacheDecisionTree({ data }: CacheDecisionTreeProps) {
  const nodes = data?.nodes ?? DEFAULT_NODES
  const rootId = data?.rootId ?? DEFAULT_ROOT_ID
  const [path, setPath] = useState<string[]>([rootId])

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const currentNode = nodeMap.get(path[path.length - 1]) ?? nodes[0]

  /** 选择是/否分支 */
  const handleChoose = (branch: 'yes' | 'no') => {
    const nextId = branch === 'yes' ? currentNode.yesId : currentNode.noId
    if (nextId) {
      setPath([...path, nextId])
    }
  }

  /** 重置决策路径 */
  const handleReset = () => {
    setPath([rootId])
  }

  /** 回退到某一步 */
  const handleJumpTo = (idx: number) => {
    setPath(path.slice(0, idx + 1))
  }

  const isLeaf = currentNode.type === 'action'

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：展示静态决策路径与 HTTP 头，不执行真实请求。
      </div>

      {/* 决策路径面包屑 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="mb-sm font-mono text-caption-mono-sm text-body-mid">决策路径</div>
        <div className="flex flex-wrap items-center gap-xs">
          {path.map((nodeId, idx) => {
            const n = nodeMap.get(nodeId)
            const isLast = idx === path.length - 1
            return (
              <div key={nodeId} className="flex items-center gap-xs">
                <button
                  onClick={() => !isLast && handleJumpTo(idx)}
                  disabled={isLast}
                  className={cn(
                    'rounded-pill px-sm py-xxs font-mono text-caption-mono-sm transition-all',
                    isLast
                      ? 'text-white'
                      : 'bg-canvas-bg-inset text-body-mid hover:bg-canvas-bg-hover'
                  )}
                  style={isLast ? { background: n?.color ?? '#1a6cff' } : undefined}
                >
                  {idx + 1}. {n?.type === 'question' ? (n.question?.slice(0, 16) + '...') : n?.strategyLabel}
                </button>
                {!isLast && <span className="text-body-mid">→</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* 当前节点 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        {currentNode.type === 'question' ? (
          <div className="space-y-md">
            <div className="flex items-center gap-sm">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: currentNode.color }} />
              <span className="rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">决策问题</span>
            </div>
            <h4 className="text-body-sm text-body-hi leading-relaxed">{currentNode.question}</h4>
            <div className="flex flex-wrap gap-sm pt-sm">
              <button
                onClick={() => handleChoose('yes')}
                className="rounded-pill bg-[#07c160] px-lg py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-[#06a050]"
              >
                ✓ 是
              </button>
              <button
                onClick={() => handleChoose('no')}
                className="rounded-pill bg-[#ef4444] px-lg py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-[#dc2626]"
              >
                ✗ 否
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-md">
            <div className="flex items-center gap-sm">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: currentNode.color }} />
              <span className="rounded-pill bg-canvas-bg-inset px-sm py-xxs font-mono text-caption-mono-sm text-body-mid">缓存策略（叶子节点）</span>
            </div>
            <h4 className="font-mono text-body-md text-body-hi">{currentNode.strategyLabel}</h4>
            <p className="text-body-sm text-body-mid leading-relaxed">{currentNode.strategyDescription}</p>
            {currentNode.headers && currentNode.headers.length > 0 && (
              <div className="rounded-sm bg-canvas-bg-inset p-md">
                <div className="mb-xs font-mono text-caption-mono-sm text-body-mid">相关 HTTP 头</div>
                <div className="space-y-xxs">
                  {currentNode.headers.map((h, i) => (
                    <div key={i} className="font-mono text-caption-mono-sm text-body-hi">{h}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 控制按钮 */}
      <div className="flex flex-wrap items-center justify-between gap-sm rounded-sm border border-hairline bg-canvas-card p-md">
        <span className="font-mono text-caption-mono-sm text-body-mid">
          {isLeaf ? '已到达叶子节点（缓存策略已确定）' : `当前是决策节点（${path.length}/${nodes.length}）`}
        </span>
        <button
          onClick={handleReset}
          disabled={path.length <= 1}
          className="rounded-pill bg-canvas-bg-inset px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-all hover:bg-canvas-bg-hover disabled:opacity-40"
        >
          ↺ 重新决策
        </button>
      </div>
    </div>
  )
}
