/**
 * CICDPipelineVisualizer — GitHub Actions CI/CD 流水线可视化
 *
 * 展示端到端流水线：
 * Trigger → Checkout → Install → Lint → Test → Build → Deploy
 *
 * 支持单步执行 / 自动播放 / 模拟失败回放，并展示对应 YAML 片段。
 *
 * ⚠️ 教学模拟：不触发真实 GitHub Actions 工作流，仅展示静态流水线与 YAML。
 */
import { useState } from 'react'
import type {
  CICDPipelineVisualizerData,
  CICDStage,
  CICDStageStatus,
} from '../../../lib/engineering-visualization-types'
import { cn } from '../../../lib/utils'

interface CICDPipelineVisualizerProps {
  data?: CICDPipelineVisualizerData
}

const DEFAULT_TRIGGER_INFO = '触发方式：push 到 main 分支 / Pull Request 合并到 main / 手动 workflow_dispatch / 定时 schedule cron'

const DEFAULT_FULL_YAML = `name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }

      - uses: pnpm/action-setup@v4
        with: { version: 9 }

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build

      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy:
    needs: ci
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist, path: dist }
      - run: npx vercel deploy --prod --token \${{ secrets.VERCEL_TOKEN }}`

const DEFAULT_STAGES: CICDStage[] = [
  {
    id: 'trigger',
    label: 'Trigger',
    description: 'GitHub 事件触发工作流：push/PR/release/schedule/manual',
    status: 'pending',
    durationSec: 1,
    yamlSnippet: `on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:`,
    color: '#1a6cff',
  },
  {
    id: 'checkout',
    label: 'Checkout',
    description: 'actions/checkout@v4 检出代码到 runner，fetch-depth: 0 获取完整历史用于变更检测',
    status: 'pending',
    durationSec: 3,
    yamlSnippet: `- uses: actions/checkout@v4
  with:
    fetch-depth: 0`,
    color: '#7d8590',
  },
  {
    id: 'install',
    label: 'Install',
    description: '配置 pnpm + Node.js，pnpm install --frozen-lockfile 严格按 lockfile 安装依赖',
    status: 'pending',
    durationSec: 18,
    yamlSnippet: `- uses: pnpm/action-setup@v4
  with: { version: 9 }
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: pnpm
- run: pnpm install --frozen-lockfile`,
    color: '#f59e0b',
  },
  {
    id: 'lint',
    label: 'Lint',
    description: 'ESLint + Prettier 检查代码风格与潜在问题，失败则中断流程',
    status: 'pending',
    durationSec: 8,
    yamlSnippet: `- run: pnpm lint`,
    color: '#a78bfa',
    failureTip: '修复 ESLint 错误后重新提交',
  },
  {
    id: 'test',
    label: 'Test',
    description: 'Vitest/Jest 运行单元测试，生成覆盖率报告并上传到 Codecov',
    status: 'pending',
    durationSec: 24,
    yamlSnippet: `- run: pnpm test
- uses: codecov/codecov-action@v4
  with: { token: \${{ secrets.CODECOV_TOKEN }} }`,
    color: '#07c160',
    failureTip: '查看测试日志，修复失败用例',
  },
  {
    id: 'build',
    label: 'Build',
    description: 'Vite/Webpack 生产构建，产物上传为 artifact 供 deploy job 使用',
    status: 'pending',
    durationSec: 32,
    yamlSnippet: `- run: pnpm build
- uses: actions/upload-artifact@v4
  with:
    name: dist
    path: dist/`,
    color: '#0ea5e9',
    failureTip: '检查构建错误，可能为类型错误或导入问题',
  },
  {
    id: 'deploy',
    label: 'Deploy',
    description: '部署到 Vercel/Netlify/CDN，仅 main 分支提交触发（if: github.ref == main）',
    status: 'pending',
    durationSec: 12,
    yamlSnippet: `deploy:
  needs: ci
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/download-artifact@v4
    - run: npx vercel deploy --prod`,
    color: '#ef4444',
    failureTip: '检查部署令牌与项目配置',
  },
]

const STATUS_THEME: Record<CICDStageStatus, { color: string; bg: string; label: string; icon: string }> = {
  pending: { color: '#7d8590', bg: 'rgba(125,133,144,0.10)', label: '待执行', icon: '○' },
  running: { color: '#1a6cff', bg: 'rgba(26,108,255,0.10)', label: '执行中', icon: '◐' },
  success: { color: '#07c160', bg: 'rgba(7,193,96,0.10)', label: '成功', icon: '✓' },
  failed: { color: '#ef4444', bg: 'rgba(239,68,68,0.10)', label: '失败', icon: '✗' },
  skipped: { color: '#7d8590', bg: 'rgba(125,133,144,0.05)', label: '跳过', icon: '⊘' },
}

export function CICDPipelineVisualizer({ data }: CICDPipelineVisualizerProps) {
  const stages = data?.stages ?? DEFAULT_STAGES
  const triggerInfo = data?.triggerInfo ?? DEFAULT_TRIGGER_INFO
  const fullWorkflowYaml = data?.fullWorkflowYaml ?? DEFAULT_FULL_YAML

  const [stageStates, setStageStates] = useState<Record<string, CICDStageStatus>>(
    Object.fromEntries(stages.map((s) => [s.id, 'pending' as CICDStageStatus]))
  )
  const [selectedStageId, setSelectedStageId] = useState<string>(stages[0]?.id ?? '')
  const [isRunning, setIsRunning] = useState(false)
  const [runLog, setRunLog] = useState<string[]>([])
  const [simulateFailure, setSimulateFailure] = useState(false)

  const selectedStage = stages.find((s) => s.id === selectedStageId) ?? stages[0]
  const totalDuration = stages.reduce((sum, s) => sum + s.durationSec, 0)

  /** 模拟完整流水线执行 */
  const handleRun = () => {
    if (isRunning) return
    setIsRunning(true)
    setRunLog([])
    // 重置状态
    const initial: Record<string, CICDStageStatus> = {}
    stages.forEach((s) => (initial[s.id] = 'pending'))
    setStageStates(initial)

    const log: string[] = [`▶ 触发工作流（${simulateFailure ? '模拟失败模式' : '正常模式'}）`]
    setRunLog([...log])

    let idx = 0
    const runNext = () => {
      if (idx >= stages.length) {
        log.push(`✓ 工作流完成，总耗时 ${totalDuration}s`)
        setRunLog([...log])
        setIsRunning(false)
        return
      }
      const stage = stages[idx]
      // 标记当前阶段为 running
      setStageStates((prev) => ({ ...prev, [stage.id]: 'running' }))
      setSelectedStageId(stage.id)
      log.push(`▶ [${stage.label}] 开始执行...`)
      setRunLog([...log])

      // 模拟执行时间（加速 10x）
      const duration = stage.durationSec * 100
      setTimeout(() => {
        // 模拟失败（如果在 test 阶段且开启了模拟失败）
        const willFail = simulateFailure && stage.id === 'test'
        setStageStates((prev) => ({
          ...prev,
          [stage.id]: willFail ? 'failed' : 'success',
        }))
        if (willFail) {
          log.push(`✗ [${stage.label}] 失败：${stage.failureTip ?? '未知错误'}`)
          log.push('✗ 工作流中断，后续阶段标记为 skipped')
          setRunLog([...log])
          // 标记后续阶段为 skipped
          const skipped: Record<string, CICDStageStatus> = {}
          stages.forEach((s, i) => {
            if (i > idx) skipped[s.id] = 'skipped'
          })
          setStageStates((prev) => ({ ...prev, ...skipped }))
          setIsRunning(false)
          return
        }
        log.push(`✓ [${stage.label}] 成功（${stage.durationSec}s）`)
        setRunLog([...log])
        idx += 1
        setTimeout(runNext, 200)
      }, duration)
    }
    setTimeout(runNext, 400)
  }

  const handleReset = () => {
    setIsRunning(false)
    setRunLog([])
    const initial: Record<string, CICDStageStatus> = {}
    stages.forEach((s) => (initial[s.id] = 'pending'))
    setStageStates(initial)
  }

  return (
    <div className="space-y-lg">
      {/* 教学模拟提示 */}
      <div className="rounded-sm border border-[#f59e0b]/30 bg-[#f59e0b]/8 p-sm text-caption-mono-sm text-[#b45309]">
        ⚠️ 教学模拟：不触发真实 GitHub Actions 工作流，仅展示静态流水线与 YAML。
      </div>

      {/* 控制条 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-md">
        <div className="flex flex-wrap items-center gap-sm">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="rounded-pill bg-[#1a6cff] px-md py-xs font-mono text-caption-mono-sm text-white transition-all hover:bg-[#0f55d4] disabled:opacity-40"
          >
            {isRunning ? '▶ 执行中...' : '▶ 运行工作流'}
          </button>
          <button
            onClick={handleReset}
            disabled={isRunning}
            className="rounded-pill border border-hairline px-md py-xs font-mono text-caption-mono-sm text-body-mid transition-all hover:border-body-hi disabled:opacity-40"
          >
            ↺ 重置
          </button>
          <label className="flex items-center gap-xs rounded-pill border border-hairline px-sm py-xs cursor-pointer">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
              disabled={isRunning}
              className="cursor-pointer"
            />
            <span className="font-mono text-caption-mono-sm text-body-hi">
              模拟 Test 阶段失败
            </span>
          </label>
          <span className="ml-auto font-mono text-caption-mono-sm text-body-mid">
            总耗时 {totalDuration}s · {stages.length} 阶段
          </span>
        </div>
      </div>

      {/* 流水线可视化 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">流水线</h4>
        <div className="overflow-x-auto">
          <div className="flex min-w-max items-stretch gap-xs">
            {stages.map((stage, i) => {
              const status = stageStates[stage.id] ?? 'pending'
              const theme = STATUS_THEME[status]
              return (
                <div key={stage.id} className="flex items-stretch gap-xs">
                  <button
                    onClick={() => setSelectedStageId(stage.id)}
                    className={cn(
                      'min-w-[110px] max-w-[160px] flex-1 rounded-sm border p-sm text-left transition-all',
                      stage.id === selectedStageId ? 'ring-2 ring-offset-1' : ''
                    )}
                    style={{
                      borderColor: theme.color,
                      background: theme.bg,
                      ...(stage.id === selectedStageId ? { boxShadow: `0 0 0 2px ${theme.color}` } : {}),
                    }}
                  >
                    <div className="flex items-center gap-xs">
                      <span className="font-mono text-caption-mono-sm" style={{ color: theme.color }}>
                        {theme.icon}
                      </span>
                      <span
                        className="min-w-0 flex-1 truncate font-mono text-caption-mono-sm font-bold"
                        style={{ color: theme.color }}
                        title={stage.label}
                      >
                        {stage.label}
                      </span>
                    </div>
                    <div className="mt-xs flex items-center justify-between">
                      <span
                        className="rounded-pill px-xs py-xxs font-mono text-caption-mono-sm"
                        style={{ background: theme.bg, color: theme.color }}
                      >
                        {theme.label}
                      </span>
                      <span className="font-mono text-caption-mono-sm text-body-mid">
                        {stage.durationSec}s
                      </span>
                    </div>
                  </button>
                  {i < stages.length - 1 && (
                    <div className="flex items-center font-mono text-caption-mono-sm text-body-mid">
                      →
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 阶段详情 */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* 左：阶段说明 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <div className="mb-md flex items-center justify-between">
            <h4 className="font-mono text-body-sm text-body-hi">{selectedStage.label}</h4>
            <span
              className="rounded-pill px-sm py-xs font-mono text-caption-mono-sm"
              style={{ background: `${selectedStage.color}20`, color: selectedStage.color }}
            >
              {selectedStage.durationSec}s
            </span>
          </div>
          <p className="mb-md text-body-sm text-body-mid">{selectedStage.description}</p>

          {selectedStage.failureTip && (
            <div className="rounded-sm border border-[#ef4444]/30 bg-[#ef4444]/8 p-sm">
              <div className="mb-xs font-mono text-caption-mono-sm font-bold text-[#ef4444]">
                失败处理
              </div>
              <p className="text-caption-mono-sm text-body-hi">{selectedStage.failureTip}</p>
            </div>
          )}
        </div>

        {/* 右：YAML 片段 */}
        <div className="min-w-0 rounded-sm border border-hairline bg-canvas-card p-lg">
          <h4 className="mb-md font-mono text-body-sm text-body-hi">YAML 片段</h4>
          <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
            {selectedStage.yamlSnippet}
          </pre>
        </div>
      </div>

      {/* 执行日志 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">执行日志</h4>
        <div className="h-64 overflow-y-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm">
          {runLog.length === 0 ? (
            <div className="text-body-mid">点击「运行工作流」开始执行</div>
          ) : (
            runLog.map((line, i) => (
              <div key={i} className={cn(
                'text-body-hi',
                line.startsWith('✗') && 'text-[#ef4444]',
                line.startsWith('✓') && 'text-[#07c160]',
                line.startsWith('▶') && 'text-[#1a6cff]'
              )}>
                {line}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 触发方式 */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">触发方式</h4>
        <p className="text-body-sm text-body-mid">{triggerInfo}</p>
      </div>

      {/* 完整工作流 YAML */}
      <div className="rounded-sm border border-hairline bg-canvas-card p-lg">
        <h4 className="mb-md font-mono text-body-sm text-body-hi">完整工作流（.github/workflows/ci.yml）</h4>
        <pre className="overflow-x-auto rounded-sm bg-canvas-bg-inset p-md font-mono text-caption-mono-sm text-body-hi">
          {fullWorkflowYaml}
        </pre>
      </div>
    </div>
  )
}
