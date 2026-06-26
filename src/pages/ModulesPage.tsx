/**
 * 模块列表页 - 展示所有 25 个模块
 *
 * 模块卡片使用 MagicBento 动效（粒子/倾斜/聚光灯/边框发光），
 * 发光色用品牌 accent-dusk (#7c3aed)，遵循 DESIGN.md"无阴影，hairline 承载层次"规范。
 */
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/layout/Eyebrow'
import { MagicCard, MagicSpotlightScope, useMobileDetection } from '../components/ui/MagicBento'
import { stages } from '../lib/stages'
import { moduleSummaries } from '../lib/modules'

export function ModulesPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  return (
    <>
      <section className="border-b border-hairline py-3xl">
        <div className="container-page">
          <Eyebrow index="ALL /" className="mb-md">
            Modules
          </Eyebrow>
          <h1 className="text-display-md tracking-display text-ink">全部模块</h1>
          <p className="mt-md max-w-2xl text-body-lg text-body">
            25 个模块覆盖前端开发完整知识体系，按 8 个学习阶段组织。点击任意模块开始学习。
          </p>
        </div>
      </section>

      <section className="py-3xl mb-section">
        {/* 全局聚光灯 — 仅在桌面端启用 */}
        <MagicSpotlightScope
          gridRef={sectionRef}
          disableAnimations={isMobile}
          enabled={!isMobile}
          glowColor="124, 58, 237"
        />
        <div className="container-page space-y-3xl" ref={sectionRef}>
          {stages.map((stage) => {
            const stageModules = moduleSummaries.filter(
              (m) =>
                Number(m.number) >= stage.moduleRange[0] &&
                Number(m.number) <= stage.moduleRange[1],
            )
            return (
              <div key={stage.id}>
                <div className="mb-xl flex items-baseline gap-md">
                  <span className="text-display-xs">{stage.icon}</span>
                  <div>
                    <h2 className="text-display-xs text-ink">{stage.label}</h2>
                    <p className="mt-xs text-body-sm text-body-mid">{stage.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-3">
                  {stageModules.map((m) => (
                    <Link key={m.slug} to={`/modules/${m.slug}`} className="group block">
                      <MagicCard
                        disableAnimations={isMobile}
                        enableTilt={!isMobile}
                        enableMagnetism={false}
                        enableStars={!isMobile}
                        clickEffect={!isMobile}
                        enableBorderGlow={!isMobile}
                        particleCount={8}
                        glowColor="124, 58, 237"
                        className="flex h-full flex-col rounded-sm border border-hairline bg-canvas-card p-xl transition-colors hover:border-accent-sunset/40"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="font-mono text-caption-mono uppercase tracking-[1.4px] text-body-mid">
                            {m.number}
                          </span>
                          <span className="text-display-xs">{m.icon}</span>
                        </div>
                        <h3 className="mt-md text-body-lg text-ink group-hover:text-accent-sunset">
                          {m.title}
                        </h3>
                        <p className="mt-xs flex-1 text-body-sm text-body-mid">{m.summary}</p>
                        <div className="mt-lg flex items-center gap-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
                          <span>{m.knowledgePointCount} 知识点</span>
                          <span>·</span>
                          <span>{m.visualizationCount} 可视化</span>
                        </div>
                      </MagicCard>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
