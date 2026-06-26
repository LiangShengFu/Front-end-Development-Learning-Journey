/**
 * 首页 - 项目概览与模块导航
 *
 * 遵循 DESIGN.md 的 hero-band + content-band 规范：
 * - Hero 区：display-xl 标题 + eyebrow 标签
 * - 01 区：学习路径（路径式可视化，节点 + 箭头 + 连线，MagicBento 动效）
 *
 * 动效：模块卡片使用 MagicBento（粒子/倾斜/磁吸/聚光灯/边框发光），
 * 发光色用品牌 accent-dusk (#7c3aed)，遵循"无阴影，hairline 承载层次"规范。
 */
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Eyebrow } from '../components/layout/Eyebrow'
import { CollapsibleSection } from '../components/ui/CollapsibleSection'
import { MagicCard, MagicSpotlightScope, useMobileDetection } from '../components/ui/MagicBento'
import { CountUp } from '../components/ui/CountUp'
import { stages } from '../lib/stages'
import { moduleSummaries } from '../lib/modules'
import { visualizationMeta } from '../lib/types'
import { cn } from '../lib/utils'

export function HomePage() {
  const totalPoints = moduleSummaries.reduce((sum, m) => sum + m.knowledgePointCount, 0)
  const pathGridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  return (
    <>
      {/* Hero */}
      <section className="border-b border-hairline py-4xl md:py-[120px]">
        <div className="container-page">
          <Eyebrow index="00 /" className="mb-xl">
            Front-end Development Learning Journey
          </Eyebrow>
          <h1 className="text-display-xl tracking-display-lg text-ink md:text-display-lg">
            前端开发
            <br />
            学习之旅
          </h1>
          <p className="mt-2xl max-w-2xl text-body-lg text-body">
            25 个模块 · 13 种可视化组件 · {totalPoints}+ 知识点的交互式前端学习平台。
            从 HTML 基础到面试冲刺，系统化覆盖前端工程师的完整知识体系。
          </p>
          <div className="mt-3xl flex flex-wrap gap-sm">
            <Link to="/modules/html-fundamentals" className="btn-primary">
              从 HTML 基础开始 →
            </Link>
            <Link to="/modules" className="btn-pill">
              浏览全部模块
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-4xl grid grid-cols-2 gap-lg md:grid-cols-4">
            <Stat label="模块数" to={25} />
            <Stat label="知识点" to={totalPoints} suffix="+" />
            <Stat label="可视化组件" to={Object.keys(visualizationMeta).length} />
            <Stat label="学习阶段" to={stages.length} />
          </div>
        </div>
      </section>

      {/* 学习路径 - 路径式可视化（MagicBento 动效） */}
      <CollapsibleSection
        index="01 /"
        eyebrow="学习路径"
        title="8 个阶段 · 25 个模块"
        description="从基础到面试冲刺，循序渐进的完整学习路径。每个阶段聚焦一个核心能力域。"
        defaultOpen
        className="border-b-0 mb-section"
      >
        <MagicSpotlightScope
          gridRef={pathGridRef}
          disableAnimations={isMobile}
          enabled={!isMobile}
          glowColor="124, 58, 237"
        />
        <div ref={pathGridRef}>
          <LearningPath isMobile={isMobile} />
        </div>
      </CollapsibleSection>
    </>
  )
}

// ============================================================================
// 学习路径 - 路径式可视化（节点 + 箭头 + 连线，MagicBento 动效卡片）
// ============================================================================

/** 阶段路径节点配色（按阶段顺序渐变，取自品牌调色板） */
const STAGE_COLORS = [
  '#ff7a17', // accent-sunset
  '#ff9a4a', // sunset-light
  '#a78bfa', // accent-twilight
  '#7c3aed', // accent-dusk
  '#a0c3ec', // accent-breeze
  '#07c160', // green
  '#1a6cff', // blue
  '#ec4899', // pink
]

function LearningPath({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="relative">
      {/* 路径连线 - 垂直渐变线 */}
      <div
        className="absolute left-[19px] top-lg bottom-lg w-[2px] md:left-[27px]"
        style={{
          background: `linear-gradient(to bottom, ${STAGE_COLORS[0]}, ${STAGE_COLORS[2]}, ${STAGE_COLORS[4]}, ${STAGE_COLORS[6]})`,
          opacity: 0.3,
        }}
        aria-hidden
      />

      <div className="space-y-md">
        {stages.map((stage, i) => {
          const stageModules = moduleSummaries.filter(
            (m) =>
              m.number >= String(stage.moduleRange[0]).padStart(2, '0') &&
              m.number <= String(stage.moduleRange[1]).padStart(2, '0'),
          )
          return (
            <PathStageNode
              key={stage.id}
              stage={stage}
              modules={stageModules}
              index={i}
              color={STAGE_COLORS[i % STAGE_COLORS.length]}
              isLast={i === stages.length - 1}
              isMobile={isMobile}
            />
          )
        })}
      </div>
    </div>
  )
}

/** 单个阶段路径节点 */
function PathStageNode({
  stage,
  modules,
  index,
  color,
  isLast,
  isMobile,
}: {
  stage: (typeof stages)[number]
  modules: typeof moduleSummaries
  index: number
  color: string
  isLast: boolean
  isMobile: boolean
}) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div className="relative flex gap-lg">
      {/* 节点圆点 + 箭头 */}
      <div className="relative flex flex-col items-center">
        {/* 节点圆 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-pill border-2 bg-canvas font-mono text-caption-mono-sm font-bold transition-all hover:scale-110 md:h-14 md:w-14 md:text-body-sm"
          style={{ borderColor: color, color }}
        >
          {String(stage.moduleRange[0]).padStart(2, '0')}
        </button>

        {/* 向下箭头（非最后一个阶段） */}
        {!isLast && (
          <div className="flex flex-1 items-center justify-center pt-xs" aria-hidden>
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
              <path
                d="M7 0V16M2 12L7 17L12 12"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 阶段内容卡片 */}
      <div className="flex-1 pb-md">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full rounded-sm border border-hairline bg-canvas-card px-lg py-md text-left transition-colors hover:border-accent-sunset/30"
        >
          <div className="flex flex-col gap-xs md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-sm">
              <span className="text-display-xs">{stage.icon}</span>
              <h3 className="text-body-lg text-ink">{stage.label}</h3>
            </div>
            <div className="flex items-center gap-sm">
              <span
                className="rounded-pill border px-sm py-xxs font-mono text-caption-mono-sm"
                style={{ borderColor: `${color}40`, color }}
              >
                模块 {stage.moduleRange[0]}-{stage.moduleRange[1]}
              </span>
              <span className="font-mono text-caption-mono-sm text-body-mid">
                {modules.length} 个模块
              </span>
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-pill border border-hairline text-body-mid transition-all duration-200',
                  open && 'rotate-180',
                )}
                style={open ? { borderColor: `${color}40`, color } : undefined}
                aria-hidden
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 4L6 7.5L9.5 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <p className="mt-xs text-body-sm text-body-mid">{stage.description}</p>
        </button>

        {/* 模块列表 - 展开动画 */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-sm grid grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((m) => (
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
                      className="flex h-full items-center gap-md rounded-sm border border-hairline bg-canvas-card px-lg py-md transition-colors hover:border-accent-sunset/40"
                    >
                      <span
                        className="font-mono text-caption-mono"
                        style={{ color }}
                      >
                        {m.number}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-xs">
                          <span>{m.icon}</span>
                          <span className="text-body-sm text-ink group-hover:text-accent-sunset">
                            {m.title}
                          </span>
                        </div>
                        <div className="mt-xs text-caption-mono-sm text-body-mid">
                          {m.knowledgePointCount} 知识点 · {m.visualizationCount} 可视化
                        </div>
                      </div>
                    </MagicCard>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Stat({
  label,
  to,
  suffix = '',
}: {
  label: string
  to: number
  suffix?: string
}) {
  return (
    <div className="border-l border-hairline pl-lg">
      <div className="font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
        {label}
      </div>
      <div className="mt-xs text-display-sm tracking-display text-ink">
        <CountUp
          from={0}
          to={to}
          duration={1.6}
          separator=","
          className="count-up-text"
        />
        {suffix}
      </div>
    </div>
  )
}
