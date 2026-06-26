/**
 * UserTrackingFunnel — 用户行为埋点与漏斗分析
 *
 * 演示用户行为埋点（PV/UV/事件）与漏斗分析：
 * - PV/UV：页面访问与独立访客
 * - 事件埋点：点击/曝光/停留
 * - 漏斗分析：从访问到转化的步骤流失
 * - 采样策略：1% 全量 vs 100% 关键路径
 *
 * 交互：点击漏斗步骤查看转化率与流失原因；
 * 切换采样策略查看上报数据量对比。
 *
 * ⚠️ 教学模型：埋点数据为预设示例。
 */
'use client'

import { useState } from 'react'
import type {
  UserTrackingFunnelData,
  TrackingFunnelStep,
  TrackingStrategy,
} from '../../../lib/monitoring-auth-visualization-types'
import { cn } from '../../../lib/utils'

interface UserTrackingFunnelProps {
  data?: UserTrackingFunnelData
}

const DEFAULT_FUNNEL: TrackingFunnelStep[] = [
  {
    id: 'visit',
    name: '首页访问',
    userCount: 10000,
    pvCount: 12000,
    conversionRate: 100,
    dropReason: '—',
    color: '#1a6cff',
  },
  {
    id: 'search',
    name: '搜索商品',
    userCount: 6500,
    pvCount: 8000,
    conversionRate: 65,
    dropReason: '首页推荐不够吸引、入口不显眼',
    color: '#07c160',
  },
  {
    id: 'detail',
    name: '查看详情',
    userCount: 4200,
    pvCount: 5500,
    conversionRate: 64.6,
    dropReason: '搜索结果相关度低、排序不佳',
    color: '#a78bfa',
  },
  {
    id: 'cart',
    name: '加入购物车',
    userCount: 2100,
    pvCount: 2800,
    conversionRate: 50,
    dropReason: '价格/规格不满意、缺货提示',
    color: '#f59e0b',
  },
  {
    id: 'checkout',
    name: '提交订单',
    userCount: 840,
    pvCount: 1100,
    conversionRate: 40,
    dropReason: '运费高、结算流程繁琐、地址填写',
    color: '#ec4899',
  },
  {
    id: 'paid',
    name: '支付成功',
    userCount: 588,
    pvCount: 700,
    conversionRate: 70,
    dropReason: '支付方式限制、网络问题',
    color: '#ef4444',
  },
]

const DEFAULT_STRATEGIES: TrackingStrategy[] = [
  {
    id: 'all-events',
    name: '全量上报',
    description: '所有用户、所有事件都上报。数据完整但量大，成本高。',
    sampleRate: 100,
    volume: '1,200,000 条/日',
    cost: '高',
    suitable: '小流量产品、关键指标监控',
    codeSnippet: `// 全量上报
tracker.track('button_click', {
  buttonId: 'submit',
  page: '/checkout',
  // 不采样，全部发送
});`,
  },
  {
    id: 'sampled',
    name: '采样上报',
    description: '按用户 ID 哈希采样，1% 用户全量上报，其余不上报。降低成本。',
    sampleRate: 1,
    volume: '12,000 条/日',
    cost: '低',
    suitable: '大数据量场景、趋势分析',
    codeSnippet: `// 基于用户 ID 的稳定采样
function shouldTrack(userId) {
  const hash = hashUserId(userId);
  return hash % 100 < SAMPLE_RATE; // 1%
}
if (shouldTrack(user.id)) {
  tracker.track('button_click', data);
}`,
  },
  {
    id: 'key-path',
    name: '关键路径全量',
    description: '关键转化路径（支付/注册）100% 上报，浏览类事件采样。',
    sampleRate: 50,
    volume: '120,000 条/日',
    cost: '中',
    suitable: '电商、SaaS 转化分析',
    codeSnippet: `// 按事件重要性差异化采样
const KEY_EVENTS = ['checkout', 'pay_success'];
function shouldTrack(eventName, userId) {
  if (KEY_EVENTS.includes(eventName)) return true;
  return hashUserId(userId) % 100 < 5;
}`,
  },
]

export function UserTrackingFunnel({ data }: UserTrackingFunnelProps) {
  const funnel = data?.funnel ?? DEFAULT_FUNNEL
  const strategies = data?.strategies ?? DEFAULT_STRATEGIES

  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [activeStrategy, setActiveStrategy] = useState<string>(strategies[0]?.id ?? 'all-events')

  const currentStrategy = strategies.find((s) => s.id === activeStrategy) ?? strategies[0]
  if (!currentStrategy) return null

  const maxCount = funnel[0]?.userCount ?? 1

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface p-md">
      {/* PV/UV 概览 */}
      <div className="mb-md grid grid-cols-2 gap-sm md:grid-cols-4">
        <div className="rounded-md border border-border-subtle bg-bg-base p-sm">
          <div className="text-caption-mono-sm uppercase text-body-mid">总 PV</div>
          <div className="mt-xs font-mono text-h4 text-accent-sunset">
            {funnel.reduce((sum, s) => sum + s.pvCount, 0).toLocaleString()}
          </div>
        </div>
        <div className="rounded-md border border-border-subtle bg-bg-base p-sm">
          <div className="text-caption-mono-sm uppercase text-body-mid">总 UV</div>
          <div className="mt-xs font-mono text-h4 text-accent-sunset">{funnel[0]?.userCount.toLocaleString()}</div>
        </div>
        <div className="rounded-md border border-border-subtle bg-bg-base p-sm">
          <div className="text-caption-mono-sm uppercase text-body-mid">最终转化</div>
          <div className="mt-xs font-mono text-h4 text-green-700 dark:text-green-400">
            {((funnel[funnel.length - 1]?.userCount / funnel[0]?.userCount) * 100).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-md border border-border-subtle bg-bg-base p-sm">
          <div className="text-caption-mono-sm uppercase text-body-mid">最大流失</div>
          <div className="mt-xs font-mono text-h4 text-red-700 dark:text-red-400">
            {(() => {
              let maxDrop = 0
              let maxDropStep = ''
              funnel.forEach((s, i) => {
                if (i > 0) {
                  const drop = funnel[i - 1].userCount - s.userCount
                  if (drop > maxDrop) {
                    maxDrop = drop
                    maxDropStep = s.name
                  }
                }
              })
              return maxDropStep
            })()}
          </div>
        </div>
      </div>

      {/* 漏斗图 */}
      <div className="mb-md">
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          转化漏斗
        </div>
        <div className="space-y-xs">
          {funnel.map((step, i) => {
            const widthPercent = (step.userCount / maxCount) * 100
            const prevStep = i > 0 ? funnel[i - 1] : null
            const dropRate = prevStep
              ? (((prevStep.userCount - step.userCount) / prevStep.userCount) * 100).toFixed(1)
              : '0'
            const isActive = activeStep === step.id
            return (
              <div key={step.id}>
                <button
                  onClick={() => setActiveStep(isActive ? null : step.id)}
                  className={cn(
                    'w-full rounded-md border p-sm text-left transition-all',
                    isActive ? 'border-2 shadow-sm' : 'border-border-subtle hover:border-accent-sunset',
                  )}
                  style={isActive ? { borderColor: step.color } : undefined}
                >
                  <div className="flex items-center justify-between gap-sm">
                    <div className="flex items-center gap-sm">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full font-mono text-caption font-bold text-white"
                        style={{ backgroundColor: step.color }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-body-sm font-medium text-text-base">{step.name}</span>
                    </div>
                    <div className="flex items-center gap-sm text-caption">
                      <span className="text-body-mid">
                        UV: <span className="font-mono text-text-base">{step.userCount.toLocaleString()}</span>
                      </span>
                      <span className="text-body-mid">|</span>
                      <span className="text-body-mid">
                        转化率: <span className="font-mono text-green-700 dark:text-green-400">{step.conversionRate}%</span>
                      </span>
                    </div>
                  </div>
                  {/* 漏斗条 */}
                  <div className="mt-xs h-6 w-full overflow-hidden rounded bg-bg-surface">
                    <div
                      className="flex h-full items-center justify-end px-xs text-white transition-all"
                      style={{ width: `${widthPercent}%`, backgroundColor: step.color }}
                    >
                      <span className="font-mono text-caption-mono-sm">{step.userCount.toLocaleString()}</span>
                    </div>
                  </div>
                  {prevStep && (
                    <div className="mt-xs flex items-center gap-sm text-caption">
                      <span className="text-red-700 dark:text-red-400">↓ 流失 {dropRate}%</span>
                      <span className="text-body-mid">({(prevStep.userCount - step.userCount).toLocaleString()} 人)</span>
                    </div>
                  )}
                </button>

                {isActive && (
                  <div className="mt-xs rounded-md border border-accent-sunset/40 bg-accent-sunset/5 p-sm">
                    <div className="text-caption-mono-sm uppercase text-accent-sunset">流失原因分析</div>
                    <div className="mt-xs text-body-sm text-text-base">{step.dropReason}</div>
                    <div className="mt-xs grid grid-cols-2 gap-sm md:grid-cols-3">
                      <div>
                        <div className="text-caption-mono-sm uppercase text-body-mid">UV</div>
                        <div className="font-mono text-body-sm">{step.userCount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-caption-mono-sm uppercase text-body-mid">PV</div>
                        <div className="font-mono text-body-sm">{step.pvCount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-caption-mono-sm uppercase text-body-mid">PV/UV</div>
                        <div className="font-mono text-body-sm">
                          {(step.pvCount / step.userCount).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 采样策略 */}
      <div>
        <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          埋点采样策略
        </div>
        <div className="mb-sm flex flex-wrap gap-xs">
          {strategies.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStrategy(s.id)}
              className={cn(
                'rounded-md border px-sm py-xs text-body-sm transition-colors',
                s.id === activeStrategy
                  ? 'border-accent-sunset bg-accent-sunset/10 text-accent-sunset'
                  : 'border-border-subtle text-body-mid hover:border-accent-sunset',
              )}
              aria-pressed={s.id === activeStrategy}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="rounded-md border border-border-subtle bg-bg-base p-md">
          <div className="mb-sm text-body-sm text-text-base">{currentStrategy.description}</div>

          <div className="mb-sm grid grid-cols-2 gap-sm md:grid-cols-4">
            <div>
              <div className="text-caption-mono-sm uppercase text-body-mid">采样率</div>
              <div className="mt-xs font-mono text-h5 text-accent-sunset">{currentStrategy.sampleRate}%</div>
            </div>
            <div>
              <div className="text-caption-mono-sm uppercase text-body-mid">数据量</div>
              <div className="mt-xs font-mono text-body-sm">{currentStrategy.volume}</div>
            </div>
            <div>
              <div className="text-caption-mono-sm uppercase text-body-mid">成本</div>
              <div className="mt-xs font-mono text-body-sm">{currentStrategy.cost}</div>
            </div>
            <div>
              <div className="text-caption-mono-sm uppercase text-body-mid">适用</div>
              <div className="mt-xs text-caption text-body-mid">{currentStrategy.suitable}</div>
            </div>
          </div>

          <div>
            <div className="text-caption-mono-sm uppercase text-body-mid">代码示例</div>
            <pre className="mt-xs overflow-x-auto rounded bg-bg-surface p-sm font-mono text-caption text-text-base">
              {currentStrategy.codeSnippet}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-md rounded-md bg-accent-sunset/5 p-sm text-caption text-body-mid">
        💡 采样必须基于用户 ID 哈希（稳定采样），保证同一用户行为完整；不能随机采样，否则漏斗会断裂。
      </div>
    </div>
  )
}
