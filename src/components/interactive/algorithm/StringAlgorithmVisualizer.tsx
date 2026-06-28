/**
 * StringAlgorithmVisualizer - 字符串专项算法可视化
 *
 * 四种模式：反转双指针、回文判断、最长回文子串（中心扩展）、KMP 匹配。
 */
import { useEffect, useState } from 'react'
import type { StringAlgorithmVisualizerData, StringAlgorithmMode } from '../../../lib/algorithm-visualization-types'
import { cn } from '../../../lib/utils'

interface StringAlgorithmVisualizerProps {
  data?: StringAlgorithmVisualizerData
}

interface StringStep {
  /** 字符数组（便于高亮） */
  chars: string[]
  /** 高亮索引 */
  highlight: number[]
  /** 标记索引（如中心点、匹配位置） */
  markers: { index: number; label: string; color: 'sunset' | 'breeze' }[]
  /** 当前步骤描述 */
  desc: string
  /** 当前匹配范围 [start, end] */
  range?: [number, number]
}

const DEFAULT_TEXT = 'A man a plan a canal Panama'
const DEFAULT_PATTERN = 'ABABCABAB'

/** 反转字符串步骤 */
function reverseSteps(text: string): StringStep[] {
  const steps: StringStep[] = []
  const chars = [...text]
  let l = 0
  let r = chars.length - 1
  steps.push({
    chars: [...chars],
    highlight: [l, r],
    markers: [
      { index: l, label: 'L', color: 'sunset' },
      { index: r, label: 'R', color: 'breeze' },
    ],
    desc: `初始化：L=0, R=${r}，对撞指针向中间靠拢`,
  })
  while (l < r) {
    steps.push({
      chars: [...chars],
      highlight: [l, r],
      markers: [
        { index: l, label: 'L', color: 'sunset' },
        { index: r, label: 'R', color: 'breeze' },
      ],
      desc: `比较 chars[${l}]="${chars[l]}" 与 chars[${r}]="${chars[r]}"，交换`,
    })
    ;[chars[l], chars[r]] = [chars[r], chars[l]]
    steps.push({
      chars: [...chars],
      highlight: [l, r],
      markers: [
        { index: l, label: 'L', color: 'sunset' },
        { index: r, label: 'R', color: 'breeze' },
      ],
      desc: `交换完成：[${l}]↔[${r}]`,
    })
    l++
    r--
  }
  steps.push({
    chars: [...chars],
    highlight: [],
    markers: [],
    desc: `L >= R，反转完成`,
  })
  return steps
}

/** 回文判断步骤 */
function palindromeSteps(text: string): StringStep[] {
  const steps: StringStep[] = []
  // 预处理：转小写、去非字母数字
  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '')
  const chars = [...cleaned]
  let l = 0
  let r = chars.length - 1
  steps.push({
    chars,
    highlight: [l, r],
    markers: [
      { index: l, label: 'L', color: 'sunset' },
      { index: r, label: 'R', color: 'breeze' },
    ],
    desc: `预处理后："${cleaned}"（转小写 + 去非字母数字），L=0, R=${r}`,
  })
  while (l < r) {
    if (chars[l] !== chars[r]) {
      steps.push({
        chars,
        highlight: [l, r],
        markers: [
          { index: l, label: 'L', color: 'sunset' },
          { index: r, label: 'R', color: 'breeze' },
        ],
        desc: `chars[${l}]="${chars[l]}" ≠ chars[${r}]="${chars[r]}"，不是回文`,
      })
      return steps
    }
    steps.push({
      chars,
      highlight: [l, r],
      markers: [
        { index: l, label: 'L', color: 'sunset' },
        { index: r, label: 'R', color: 'breeze' },
      ],
      desc: `chars[${l}]="${chars[l]}" === chars[${r}]="${chars[r]}"，继续`,
    })
    l++
    r--
  }
  steps.push({
    chars,
    highlight: [],
    markers: [],
    desc: `L >= R，是回文`,
  })
  return steps
}

/** 最长回文子串步骤（中心扩展） */
function longestPalindromeSteps(text: string): StringStep[] {
  const steps: StringStep[] = []
  const chars = [...text]
  let maxStart = 0
  let maxLen = 1

  for (let i = 0; i < chars.length; i++) {
    // 奇数中心
    let l = i
    let r = i
    while (l >= 0 && r < chars.length && chars[l] === chars[r]) {
      if (r - l + 1 > maxLen) {
        maxStart = l
        maxLen = r - l + 1
      }
      steps.push({
        chars,
        highlight: [l, r],
        markers: [{ index: i, label: '中心', color: 'sunset' }],
        range: [l, r],
        desc: `奇数中心 ${i}：扩展 [${l}, ${r}]，chars[${l}]="${chars[l]}" === chars[${r}]="${chars[r]}"${r - l + 1 > maxLen ? '（更新最长）' : ''}`,
      })
      l--
      r++
    }
    // 偶数中心
    l = i
    r = i + 1
    while (l >= 0 && r < chars.length && chars[l] === chars[r]) {
      if (r - l + 1 > maxLen) {
        maxStart = l
        maxLen = r - l + 1
      }
      steps.push({
        chars,
        highlight: [l, r],
        markers: [{ index: i, label: '中心L', color: 'breeze' }, { index: i + 1, label: '中心R', color: 'breeze' }],
        range: [l, r],
        desc: `偶数中心 ${i},${i + 1}：扩展 [${l}, ${r}]，chars[${l}]="${chars[l]}" === chars[${r}]="${chars[r]}"${r - l + 1 > maxLen ? '（更新最长）' : ''}`,
      })
      l--
      r++
    }
  }
  steps.push({
    chars,
    highlight: [],
    markers: [],
    range: [maxStart, maxStart + maxLen - 1],
    desc: `完成：最长回文子串 = "${chars.slice(maxStart, maxStart + maxLen).join('')}"（位置 [${maxStart}, ${maxStart + maxLen - 1}]，长度 ${maxLen}）`,
  })
  return steps
}

/** KMP 匹配步骤 */
function kmpSteps(text: string, pattern: string): StringStep[] {
  const steps: StringStep[] = []
  const t = [...text]
  const p = [...pattern]

  // 构建 next 数组
  const next = [-1]
  let i = 0
  let j = -1
  while (i < p.length - 1) {
    if (j === -1 || p[i] === p[j]) {
      next[++i] = ++j
    } else {
      j = next[j]
    }
  }
  steps.push({
    chars: p,
    highlight: [],
    markers: [],
    desc: `构建 next 数组：[${next.join(', ')}]（next[j] = 模式串前 j 个字符的最长相等前后缀长度）`,
  })

  // 匹配
  i = 0
  j = 0
  while (i < t.length && j < p.length) {
    if (j === -1 || t[i] === p[j]) {
      steps.push({
        chars: t,
        highlight: [i],
        markers: [{ index: i, label: 'i', color: 'sunset' }],
        range: j > 0 ? [i - j, i] : undefined,
        desc: `text[${i}]="${t[i]}" === pattern[${j}]="${p[j]}"，i++, j++（已匹配 ${j + 1} 个）`,
      })
      i++
      j++
    } else {
      steps.push({
        chars: t,
        highlight: [i],
        markers: [{ index: i, label: 'i', color: 'sunset' }],
        desc: `text[${i}]="${t[i]}" ≠ pattern[${j}]="${p[j]}"，j = next[${j}] = ${next[j]}（利用已知前缀，避免回退 i）`,
      })
      j = next[j]
    }
  }
  if (j === p.length) {
    const pos = i - j
    steps.push({
      chars: t,
      highlight: [],
      markers: [],
      range: [pos, pos + p.length - 1],
      desc: `匹配成功！位置 = ${pos}（text[${pos}..${pos + p.length - 1}]）`,
    })
  } else {
    steps.push({
      chars: t,
      highlight: [],
      markers: [],
      desc: `匹配失败（text 遍历完毕，pattern 未完全匹配）`,
    })
  }
  return steps
}

export function StringAlgorithmVisualizer({ data }: StringAlgorithmVisualizerProps) {
  const initialMode = data?.mode ?? 'reverse'
  const initialText = data?.text ?? DEFAULT_TEXT
  const initialPattern = data?.pattern ?? DEFAULT_PATTERN

  const [mode, setMode] = useState<StringAlgorithmMode>(initialMode)
  const [text, setText] = useState(initialText)
  const [pattern, setPattern] = useState(initialPattern)
  const [steps, setSteps] = useState<StringStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)

  /** 生成步骤 */
  const generateSteps = (m: StringAlgorithmMode, t: string, p: string) => {
    let s: StringStep[] = []
    if (m === 'reverse') s = reverseSteps(t)
    else if (m === 'palindrome') s = palindromeSteps(t)
    else if (m === 'longest-palindrome') s = longestPalindromeSteps(t)
    else s = kmpSteps(t, p)
    setSteps(s)
    setStepIndex(0)
  }

  useEffect(() => {
    generateSteps(initialMode, initialText, initialPattern)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 切换模式 */
  const switchMode = (m: StringAlgorithmMode) => {
    setMode(m)
    generateSteps(m, text, pattern)
    setAutoPlay(false)
  }

  /** 重新运行 */
  const rerun = () => {
    generateSteps(mode, text, pattern)
    setAutoPlay(true)
  }

  const goToStep = (idx: number) => {
    if (idx < 0 || idx >= steps.length) return
    setStepIndex(idx)
  }

  // 自动播放
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      if (stepIndex >= steps.length - 1) {
        setAutoPlay(false)
      } else {
        goToStep(stepIndex + 1)
      }
    }, 600)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, stepIndex])

  const currentStep = steps[stepIndex]
  const markerColors = {
    sunset: 'border-accent-sunset bg-accent-sunset/15 text-accent-sunset',
    breeze: 'border-accent-breeze bg-accent-breeze/15 text-accent-breeze',
  }

  const modeLabels: Record<StringAlgorithmMode, string> = {
    reverse: '反转字符串',
    palindrome: '回文判断',
    'longest-palindrome': '最长回文子串',
    kmp: 'KMP 匹配',
  }

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 模式切换 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        {(['reverse', 'palindrome', 'longest-palindrome', 'kmp'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={cn('btn-pill', mode === m && 'border-accent-sunset text-accent-sunset')}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      {/* 输入区 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm rounded-sm border border-hairline bg-canvas-soft p-md">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入字符串"
          className="flex-1 min-w-[200px] rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
        />
        {mode === 'kmp' && (
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="模式串"
            className="w-32 rounded-sm border border-hairline bg-canvas px-md py-xs font-mono text-caption-mono text-ink outline-none focus:border-accent-sunset/40"
          />
        )}
        <button type="button" onClick={rerun} className="btn-pill">
          运行
        </button>
      </div>

      {/* 控制栏 */}
      <div className="mb-xl flex flex-wrap items-center gap-sm">
        <button type="button" onClick={() => goToStep(stepIndex - 1)} disabled={stepIndex <= 0} className="btn-pill">
          上一步
        </button>
        <button
          type="button"
          onClick={() => goToStep(stepIndex + 1)}
          disabled={stepIndex >= steps.length - 1}
          className="btn-pill"
        >
          下一步
        </button>
        <button type="button" onClick={() => setAutoPlay((v) => !v)} className="btn-pill">
          {autoPlay ? '暂停' : '自动播放'}
        </button>
        <span className="ml-sm font-mono text-caption-mono-sm text-body-mid">
          步骤 {stepIndex} / {Math.max(0, steps.length - 1)}
        </span>
      </div>

      {/* 字符可视化 */}
      {currentStep && (
        <div className="mb-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            {modeLabels[mode]}
          </div>
          <div className="flex flex-wrap gap-xs rounded-sm border border-hairline bg-canvas-soft p-md">
            {currentStep.chars.map((ch, idx) => {
              const isHighlight = currentStep.highlight.includes(idx)
              const marker = currentStep.markers.find((m) => m.index === idx)
              const inRange = currentStep.range && idx >= currentStep.range[0] && idx <= currentStep.range[1]
              return (
                <div
                  key={idx}
                  className={cn(
                    'flex h-12 w-10 flex-col items-center justify-center rounded-sm border transition-all duration-300',
                    marker
                      ? markerColors[marker.color]
                      : isHighlight
                        ? 'border-accent-sunset bg-accent-sunset/10'
                        : inRange
                          ? 'border-accent-breeze/40 bg-accent-breeze/5'
                          : 'border-hairline bg-canvas-card',
                  )}
                >
                  <span className="font-mono text-body-sm text-ink">{ch === ' ' ? '␣' : ch}</span>
                  <span className="font-mono text-caption-mono-sm text-body-mid">{idx}</span>
                  {marker && (
                    <span className="font-mono text-caption-mono-sm" style={{ fontSize: '8px' }}>
                      {marker.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 当前步骤描述 */}
      {currentStep && (
        <div className="rounded-sm border border-hairline bg-canvas-soft p-md">
          <div className="mb-xs font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            当前步骤
          </div>
          <div className="font-mono text-caption-mono text-ink">{currentStep.desc}</div>
        </div>
      )}
    </div>
  )
}
