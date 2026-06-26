/**
 * 关于页 - 项目介绍与设计规范说明
 */
import { Eyebrow } from '../components/layout/Eyebrow'
import { Section } from '../components/ui/Section'
import { Callout } from '../components/ui/Callout'

export function AboutPage() {
  return (
    <>
      <section className="border-b border-hairline py-3xl">
        <div className="container-page">
          <Eyebrow index="ABOUT /" className="mb-md">
            About This Project
          </Eyebrow>
          <h1 className="text-display-md tracking-display text-ink">关于本项目</h1>
          <p className="mt-md max-w-2xl text-body-lg text-body">
            一个系统化的前端开发学习平台，以交互式可视化组件为核心，覆盖前端工程师完整知识体系。
          </p>
        </div>
      </section>

      <Section eyebrow="项目愿景" title="让前端学习可交互、可感知">
        <div className="space-y-lg">
          <p className="text-body-md text-body">
            传统的前端学习资料以文字为主，抽象概念难以理解。本项目通过 13 种可视化组件，
            将每一个知识点都配以相应的交互式演示，让学习者在"看"和"操作"中建立直觉。
          </p>
          <p className="text-body-md text-body">
            25 个模块覆盖从 HTML 基础到面试冲刺的完整路径，470+ 知识点循序渐进。
            每个知识点都标注难度等级，便于按需学习。
          </p>
        </div>
      </Section>

      <Section eyebrow="技术栈" title="现代前端技术栈构建">
        <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
          {[
            { name: 'React 19', desc: 'UI 框架，函数组件 + Hooks' },
            { name: 'TypeScript', desc: '类型安全，完整类型系统' },
            { name: 'Vite', desc: '极速构建与热更新' },
            { name: 'Tailwind CSS', desc: '原子化 CSS，设计系统落地' },
            { name: 'React Router', desc: '客户端路由，懒加载' },
            { name: 'Vitest + RTL', desc: '单元测试与组件测试' },
          ].map((tech) => (
            <div key={tech.name} className="rounded-sm border border-hairline bg-canvas-card p-lg">
              <div className="text-body-md text-ink">{tech.name}</div>
              <div className="mt-xs text-body-sm text-body-mid">{tech.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="设计语言" title="暗色设计系统">
        <div className="space-y-lg">
          <p className="text-body-md text-body">
            本项目遵循的设计语言：近黑色画布（#0a0a0a）为唯一底色，
            白色描边胶囊按钮作为统一的交互元素，无阴影、无渐变背景。
          </p>
          <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
            {[
              { name: 'Canvas', value: '#0a0a0a', color: 'bg-canvas' },
              { name: 'Card', value: '#191919', color: 'bg-canvas-card' },
              { name: 'Hairline', value: '#212327', color: 'bg-hairline' },
              { name: 'Ink', value: '#ffffff', color: 'bg-ink' },
              { name: 'Sunset', value: '#ff7a17', color: 'bg-accent-sunset' },
              { name: 'Dusk', value: '#7c3aed', color: 'bg-accent-dusk' },
              { name: 'Twilight', value: '#c4b5fd', color: 'bg-accent-twilight' },
              { name: 'Breeze', value: '#a0c3ec', color: 'bg-accent-breeze' },
            ].map((c) => (
              <div key={c.name} className="rounded-sm border border-hairline bg-canvas-card p-md">
                <div className={`h-10 w-full rounded-sm ${c.color}`} />
                <div className="mt-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink">
                  {c.name}
                </div>
                <div className="font-mono text-caption-mono-sm text-body-mid">{c.value}</div>
              </div>
            ))}
          </div>
          <Callout variant="note" title="设计原则">
            字重 400 贯穿全局，负字距 + 字号层级承担强调职责；GeistMono 大写跟踪标签作为"代码注释"式标识；
            胶囊形（pill 9999px）是所有按钮的统一形态；卡片为 8px 圆角矩形配发丝边框，无阴影。
          </Callout>
        </div>
      </Section>


    </>
  )
}
