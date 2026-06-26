/**
 * ServerActionSandbox — Server Action 流程沙盒
 *
 * 步进式展示 Server Action 的完整生命周期：
 * 用户提交表单 → 'use server' 函数被调用 → Zod 校验 → 数据库写入 →
 * revalidatePath 刷新缓存 → redirect 跳转。
 * 每步展示代码位置、执行环境和耗时。
 *
 * ⚠️ 教学模拟：在客户端浏览器中模拟服务端行为，真实 Server Action 在服务端执行。
 *
 * 对应docx中演示 #5
 */
import { useState } from 'react'
import type { ServerActionSandboxData } from '../../../lib/nextjs-visualization-types'
import { CodeBlock } from '../../ui/CodeBlock'
import { cn } from '../../../lib/utils'

interface ServerActionSandboxProps {
  data?: ServerActionSandboxData
}

const DEFAULT_SCENARIOS = [
  {
    id: 'success',
    label: '成功提交',
    outcome: 'success' as const,
    steps: [
      { title: '1. 用户提交表单', code: '<form action={createPost}>...', location: 'client' as const, description: '用户点击提交按钮，表单通过 action 属性触发 Server Action（无需手动 fetch）' },
      { title: "2. 'use server' 函数被调用", code: "'use server'\nasync function createPost(formData) {\n  // 此函数在服务端执行\n}", location: 'server' as const, description: "Next.js 将标记了 'use server' 的函数编译为 Server Action，自动通过 POST 请求调用" },
      { title: '3. Zod 校验输入', code: 'const schema = z.object({\n  title: z.string().min(1),\n  content: z.string().min(10),\n});\nconst data = schema.parse(formData);', location: 'server' as const, description: '使用 Zod 进行服务端校验，确保数据合法性。校验失败抛出 ZodError' },
      { title: '4. 数据库写入', code: 'await db.post.create({\n  data: { title: data.title, content: data.content },\n});', location: 'server' as const, description: '将校验通过的数据写入数据库（Prisma/Drizzle 等 ORM）' },
      { title: '5. revalidatePath 刷新缓存', code: "revalidatePath('/posts');\nrevalidatePath(`/posts/${post.id}`);", location: 'server' as const, description: '清除相关路由的缓存，确保下次访问时重新生成最新内容' },
      { title: '6. redirect 跳转', code: "redirect(`/posts/${post.id}`);", location: 'server' as const, description: '服务端重定向到新创建的文章详情页，用户无感知跳转' },
    ],
  },
  {
    id: 'validation_error',
    label: '校验失败',
    outcome: 'validation_error' as const,
    steps: [
      { title: '1. 用户提交表单', code: '<form action={createPost}>...', location: 'client' as const, description: '用户提交空标题或内容不足的表单' },
      { title: "2. 'use server' 函数被调用", code: "'use server'\nasync function createPost(formData) {", location: 'server' as const, description: 'Server Action 被调用，进入服务端执行' },
      { title: '3. Zod 校验失败', code: 'const schema = z.object({\n  title: z.string().min(1, "标题不能为空"),\n});\nconst data = schema.parse(formData); // ← 抛出 ZodError', location: 'server' as const, description: 'Zod 校验不通过，抛出包含错误信息的 ZodError' },
      { title: '4. 返回错误状态', code: 'return { error: "标题不能为空" };\n// useActionState 接收返回值', location: 'server' as const, description: '捕获错误并返回错误状态，客户端 useActionState 接收并显示错误信息' },
      { title: '5. 客户端显示错误', code: 'const [state, formAction] = useActionState(createPost, {});\n// state.error → 显示错误提示', location: 'client' as const, description: '客户端通过 useActionState 接收错误状态，在表单下方显示错误信息' },
      { title: '6. 流程终止', code: '// 无 revalidate / redirect\n// 数据库未写入', location: 'server' as const, description: '校验失败不执行后续步骤，数据库无变更，缓存不刷新' },
    ],
  },
  {
    id: 'db_error',
    label: '数据库错误',
    outcome: 'db_error' as const,
    steps: [
      { title: '1. 用户提交表单', code: '<form action={createPost}>...', location: 'client' as const, description: '用户提交合法的表单数据' },
      { title: '2-3. 校验通过', code: 'const data = schema.parse(formData);\n// 校验通过 ✓', location: 'server' as const, description: 'Zod 校验通过，进入数据库写入阶段' },
      { title: '4. 数据库写入失败', code: 'await db.post.create({ data });\n// ← PrismaClientKnownRequestError\n// 唯一约束冲突 / 连接超时', location: 'server' as const, description: '数据库操作抛出异常（唯一约束冲突、连接超时等）' },
      { title: '5. 错误处理', code: 'try {\n  await db.post.create({ data });\n} catch (e) {\n  return { error: "发布失败，请重试" };\n}', location: 'server' as const, description: 'try-catch 捕获数据库异常，返回用户友好的错误信息' },
      { title: '6. 客户端提示重试', code: 'return { error: "发布失败，请重试" };', location: 'client' as const, description: '客户端显示错误提示，用户可修正后重新提交' },
    ],
  },
]

export function ServerActionSandbox({ data }: ServerActionSandboxProps) {
  const scenarios = data?.scenarios ?? DEFAULT_SCENARIOS
  const [scenarioId, setScenarioId] = useState(scenarios[0].id)
  const [stepIdx, setStepIdx] = useState(0)

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]
  const step = scenario.steps[Math.min(stepIdx, scenario.steps.length - 1)]

  const switchScenario = (id: string) => {
    setScenarioId(id)
    setStepIdx(0)
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 教学模拟声明 */}
      <div className="mb-lg rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 教学模拟：在客户端浏览器中模拟服务端行为，真实 Server Action 在服务端/Edge 环境执行。
        </p>
      </div>

      {/* 场景切换 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => switchScenario(s.id)}
            className={cn(
              'rounded-pill border px-md py-xs text-body-sm transition-colors',
              s.id === scenarioId
                ? s.outcome === 'success'
                  ? 'border-accent-dusk/50 bg-accent-dusk/10 text-accent-dusk'
                  : 'border-red-500/50 bg-red-500/10 text-red-500'
                : 'border-hairline bg-canvas-soft text-body-mid',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* 步骤进度条 */}
      <div className="mb-xl">
        <div className="mb-xs flex items-center justify-between font-mono text-caption-mono-sm text-body-mid">
          <span>步骤 {stepIdx + 1} / {scenario.steps.length}</span>
          <span>{step.location === 'server' ? '🖥️ 服务端执行' : '📱 客户端执行'}</span>
        </div>
        <div className="flex gap-xs">
          {scenario.steps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStepIdx(i)}
              className={cn(
                'h-2 flex-1 rounded-pill transition-colors',
                i === stepIdx ? 'bg-accent-sunset' : i < stepIdx ? 'bg-accent-dusk/50' : 'bg-canvas-mid',
              )}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_1fr]">
        {/* 步骤说明 */}
        <div>
          <div className="mb-md flex items-center gap-sm">
            <span className={cn(
              'rounded-pill px-md py-xs font-mono text-caption-mono-sm',
              step.location === 'server' ? 'bg-accent-sunset/20 text-accent-sunset' : 'bg-accent-dusk/20 text-accent-dusk',
            )}>
              {step.location === 'server' ? 'Server' : 'Client'}
            </span>
            <span className="text-body-md text-ink">{step.title}</span>
          </div>
          <p className="text-body-sm text-body">{step.description}</p>
        </div>

        {/* 代码块 */}
        <div>
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            代码位置
          </div>
          <CodeBlock code={step.code} language="javascript" />
        </div>
      </div>

      {/* 导航 */}
      <div className="mt-xl flex items-center justify-between">
        <button type="button" onClick={() => setStepIdx((i) => Math.max(0, i - 1))} disabled={stepIdx === 0} className="btn-pill">
          ◀ 上一步
        </button>
        <button type="button" onClick={() => setStepIdx((i) => Math.min(scenario.steps.length - 1, i + 1))} disabled={stepIdx >= scenario.steps.length - 1} className="btn-pill">
          下一步 ▶
        </button>
      </div>

      {/* 结果提示 */}
      {stepIdx === scenario.steps.length - 1 && (
        <div className={cn(
          'mt-xl rounded-sm border p-md text-center',
          scenario.outcome === 'success'
            ? 'border-accent-dusk/30 bg-accent-dusk/5'
            : 'border-red-500/30 bg-red-500/5',
        )}>
          <p className={cn('text-body-md', scenario.outcome === 'success' ? 'text-accent-dusk' : 'text-red-500')}>
            {scenario.outcome === 'success' ? '✅ 流程完成：数据已写入，缓存已刷新，页面已跳转' : '❌ 流程异常：' + (scenario.outcome === 'validation_error' ? '校验失败，数据未写入' : '数据库错误，已捕获并返回错误信息')}
          </p>
        </div>
      )}
    </div>
  )
}
