/**
 * AnimationPlayground - 动画与过渡演示
 *
 * 复刻旧项目 anim-playground 的交互逻辑：
 * - 两种模式切换：Transition 过渡 / Animation 关键帧
 * - Transition：property / duration / delay / timing-function + 触发按钮
 * - Animation：@keyframes（spin/bounce/pulse）/ duration / delay / timing / iteration / direction
 * - 缓动曲线 SVG 预览
 * - 实时代码输出
 */
import { useState } from 'react'
import type { AnimationPlaygroundData } from '../../../lib/css-visualization-types'
import { cn } from '../../../lib/utils'
import { ControlRow, GroupLabel, Divider, PillBtn, RangeRow, CodeOutput, PropLine, CommentLine } from './shared'

interface AnimationPlaygroundProps {
  data: AnimationPlaygroundData
}

const TRANSITION_PROPS = ['all', 'transform', 'background', 'border-radius'] as const
const TIMING_FUNCTIONS = [
  'ease',
  'linear',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'cubic-bezier(0.68,-0.55,0.27,1.55)',
] as const
const KEYFRAMES = ['spin', 'bounce', 'pulse'] as const
const ANIM_TIMING = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'] as const
const ITERATIONS = ['infinite', '1', '3'] as const
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse'] as const

// 缓动曲线 SVG 路径
const CURVES: Record<string, string> = {
  ease: 'M0 20 C 8 20, 12 0, 32 0',
  linear: 'M0 20 L 32 0',
  'ease-in': 'M0 20 C 16 20, 20 0, 32 0',
  'ease-out': 'M0 20 C 12 20, 16 0, 32 0',
  'ease-in-out': 'M0 20 C 10 20, 22 0, 32 0',
  'cubic-bezier(0.68,-0.55,0.27,1.55)': 'M0 20 C 8 28, 24 -8, 32 0',
}

export function AnimationPlayground({ data }: AnimationPlaygroundProps) {
  const [mode, setMode] = useState<'transition' | 'animation'>(data.defaultMode ?? 'transition')

  // Transition 状态
  const [tProp, setTProp] = useState<string>(data.defaultTransitionProperty ?? 'all')
  const [tDur, setTDur] = useState(data.defaultTransitionDuration ?? 500)
  const [tTf, setTTf] = useState<string>(data.defaultTransitionTiming ?? 'ease')
  const [tDelay, setTDelay] = useState(0)
  const [tActive, setTActive] = useState(false)

  // Animation 状态
  const [aKf, setAKf] = useState<'spin' | 'bounce' | 'pulse'>(data.defaultKeyframe ?? 'spin')
  const [aDur, setADur] = useState(data.defaultAnimationDuration ?? 1000)
  const [aTf, setATf] = useState<string>('linear')
  const [aDelay, setADelay] = useState(0)
  const [aIter, setAIter] = useState<string>('infinite')
  const [aDir, setADir] = useState<string>('normal')

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card">
      {data.title && (
        <div className="border-b border-hairline px-lg py-md font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
          {data.title}
        </div>
      )}

      {/* 模式切换 + 演示舞台 */}
      <div className="bg-canvas p-md">
        <div className="mb-md inline-flex rounded-pill border border-hairline bg-canvas-mid p-xxs">
          <button
            type="button"
            onClick={() => setMode('transition')}
            className={cn(
              'rounded-pill px-md py-xxs font-mono text-caption-mono-sm uppercase tracking-[1.2px] transition-colors',
              mode === 'transition' ? 'bg-ink text-canvas' : 'text-body-mid hover:text-ink',
            )}
          >
            Transition 过渡
          </button>
          <button
            type="button"
            onClick={() => setMode('animation')}
            className={cn(
              'rounded-pill px-md py-xxs font-mono text-caption-mono-sm uppercase tracking-[1.2px] transition-colors',
              mode === 'animation' ? 'bg-ink text-canvas' : 'text-body-mid hover:text-ink',
            )}
          >
            Animation 关键帧
          </button>
        </div>

        {/* 演示舞台 */}
        <div className="flex h-[160px] items-center justify-center rounded-sm border border-hairline bg-canvas-mid">
          {mode === 'transition' ? (
            <div
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-sm bg-accent-sunset font-bold text-canvas transition-all',
                tActive && 'anim-t-active',
              )}
              style={{
                transition: `${tProp} ${tDur}ms ${tTf} ${tDelay}ms`,
              }}
            >
              A
            </div>
          ) : (
            <div
              key={`${aKf}-${aDur}-${aTf}-${aDelay}-${aIter}-${aDir}`}
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-sm bg-accent-breeze font-bold text-canvas',
                `anim-kf-${aKf}`,
              )}
              style={
                {
                  animation: `${aKf} ${aDur}ms ${aTf} ${aDelay}ms ${aIter === 'infinite' ? 'infinite' : aIter} ${aDir}`,
                  ['--anim-dur' as string]: `${aDur}ms`,
                  ['--anim-tf' as string]: aTf,
                  ['--anim-delay' as string]: `${aDelay}ms`,
                  ['--anim-iter' as string]: aIter,
                  ['--anim-dir' as string]: aDir,
                } as React.CSSProperties
              }
            >
              A
            </div>
          )}
        </div>
      </div>

      {/* Transition 控制区 */}
      {mode === 'transition' && (
        <>
          <ControlRow>
            <GroupLabel>property</GroupLabel>
            {TRANSITION_PROPS.map((v) => (
              <PillBtn key={v} active={tProp === v} onClick={() => setTProp(v)}>
                {v}
              </PillBtn>
            ))}
            <Divider />
            <RangeRow label="duration" value={tDur} min={0} max={3000} step={50} onChange={setTDur} suffix="ms" />
            <Divider />
            <RangeRow label="delay" value={tDelay} min={0} max={1000} step={50} onChange={setTDelay} suffix="ms" />
          </ControlRow>
          <ControlRow>
            <GroupLabel>timing-function</GroupLabel>
            {TIMING_FUNCTIONS.map((v) => (
              <PillBtn key={v} active={tTf === v} onClick={() => setTTf(v)}>
                {v === 'cubic-bezier(0.68,-0.55,0.27,1.55)' ? 'bounce' : v}
              </PillBtn>
            ))}
            <Divider />
            <span className="inline-flex items-center gap-xs">
              <svg className="h-5 w-8" viewBox="0 0 32 20">
                <path d={CURVES[tTf] ?? CURVES.ease} stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-sunset" />
              </svg>
              <span className="font-mono text-caption-mono-sm text-body-mid">缓动曲线</span>
            </span>
            <Divider />
            <PillBtn active={tActive} onClick={() => setTActive(!tActive)}>
              {tActive ? '◀ 回退' : '▶ 触发过渡'}
            </PillBtn>
          </ControlRow>
        </>
      )}

      {/* Animation 控制区 */}
      {mode === 'animation' && (
        <>
          <ControlRow>
            <GroupLabel>@keyframes</GroupLabel>
            {KEYFRAMES.map((v) => (
              <PillBtn key={v} active={aKf === v} onClick={() => setAKf(v)}>
                {v}
              </PillBtn>
            ))}
            <Divider />
            <RangeRow label="duration" value={aDur} min={100} max={3000} step={50} onChange={setADur} suffix="ms" />
            <Divider />
            <RangeRow label="delay" value={aDelay} min={0} max={1000} step={50} onChange={setADelay} suffix="ms" />
          </ControlRow>
          <ControlRow>
            <GroupLabel>timing</GroupLabel>
            {ANIM_TIMING.map((v) => (
              <PillBtn key={v} active={aTf === v} onClick={() => setATf(v)}>
                {v}
              </PillBtn>
            ))}
            <Divider />
            <GroupLabel>iteration</GroupLabel>
            {ITERATIONS.map((v) => (
              <PillBtn key={v} active={aIter === v} onClick={() => setAIter(v)}>
                {v}
              </PillBtn>
            ))}
            <Divider />
            <GroupLabel>direction</GroupLabel>
            {DIRECTIONS.map((v) => (
              <PillBtn key={v} active={aDir === v} onClick={() => setADir(v)}>
                {v === 'alternate-reverse' ? 'alt-reverse' : v}
              </PillBtn>
            ))}
          </ControlRow>
        </>
      )}

      {/* 代码输出 */}
      <CodeOutput>
        {mode === 'transition' ? (
          <>
            <CommentLine>Transition 过渡</CommentLine>
            {'\n.box {\n'}
            <PropLine name="transition" value={`${tProp} ${tDur}ms ${tTf} ${tDelay}ms`} />
            {'}\n\n'}
            <CommentLine>触发态（:hover / .active）</CommentLine>
            {'\n.box.active {\n'}
            {tProp === 'all' && <PropLine name="transform" value="scale(1.5) rotate(45deg)" />}
            {tProp === 'transform' && <PropLine name="transform" value="scale(1.5) rotate(45deg)" />}
            {tProp === 'background' && <PropLine name="background" value="#539df5" />}
            {tProp === 'border-radius' && <PropLine name="border-radius" value="50%" />}
            {'}'}
          </>
        ) : (
          <>
            <CommentLine>Animation 关键帧</CommentLine>
            {'\n.box {\n'}
            <PropLine
              name="animation"
              value={`${aKf} ${aDur}ms ${aTf} ${aDelay}ms ${aIter === 'infinite' ? 'infinite' : aIter} ${aDir}`}
            />
            {'}\n\n'}
            <CommentLine>@keyframes {aKf}</CommentLine>
            {`\n@keyframes ${aKf} {\n`}
            {aKf === 'spin' && (
              <>
                {'  '}
                <span className="text-accent-sunset-soft">from</span>
                <span className="text-body-mid"> {'{ '} </span>
                <span className="text-accent-sunset-soft">transform</span>
                <span className="text-body-mid">: </span>
                <span className="text-accent-sunset">rotate(0deg)</span>
                <span className="text-body-mid">; {'}'} </span>
                {'\n  '}
                <span className="text-accent-sunset-soft">to</span>
                <span className="text-body-mid"> {'{ '} </span>
                <span className="text-accent-sunset-soft">transform</span>
                <span className="text-body-mid">: </span>
                <span className="text-accent-sunset">rotate(360deg)</span>
                <span className="text-body-mid">; {'}'} </span>
              </>
            )}
            {aKf === 'bounce' && (
              <>
                {'  '}
                <span className="text-accent-sunset-soft">0%, 100%</span>
                <span className="text-body-mid"> {'{ '} </span>
                <span className="text-accent-sunset-soft">transform</span>
                <span className="text-body-mid">: </span>
                <span className="text-accent-sunset">translateY(0)</span>
                <span className="text-body-mid">; {'}'} </span>
                {'\n  '}
                <span className="text-accent-sunset-soft">50%</span>
                <span className="text-body-mid"> {'{ '} </span>
                <span className="text-accent-sunset-soft">transform</span>
                <span className="text-body-mid">: </span>
                <span className="text-accent-sunset">translateY(-30px)</span>
                <span className="text-body-mid">; {'}'} </span>
              </>
            )}
            {aKf === 'pulse' && (
              <>
                {'  '}
                <span className="text-accent-sunset-soft">0%, 100%</span>
                <span className="text-body-mid"> {'{ '} </span>
                <span className="text-accent-sunset-soft">transform</span>
                <span className="text-body-mid">: </span>
                <span className="text-accent-sunset">scale(1)</span>
                <span className="text-body-mid">; {'}'} </span>
                {'\n  '}
                <span className="text-accent-sunset-soft">50%</span>
                <span className="text-body-mid"> {'{ '} </span>
                <span className="text-accent-sunset-soft">transform</span>
                <span className="text-body-mid">: </span>
                <span className="text-accent-sunset">scale(1.2)</span>
                <span className="text-body-mid">; {'}'} </span>
              </>
            )}
            {'\n}'}
          </>
        )}
      </CodeOutput>
    </div>
  )
}
