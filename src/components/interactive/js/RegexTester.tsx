/**
 * RegexTester - 正则表达式实时测试器
 *
 * 输入正则模式与测试文本，实时匹配并用 <mark> 高亮，展示分组捕获。
 */
import { useMemo, useState } from 'react'
import type { RegexTesterData } from '../../../lib/js-visualization-types'
import { DemoCard, ControlRow, GroupLabel, Divider, PillBtn } from './shared'

interface RegexTesterProps {
  data: RegexTesterData
}

interface MatchResult {
  match: string
  index: number
  groups: string[]
}

const FLAG_OPTIONS = ['g', 'gi', 'gim', 'i', 'm'] as const

export function RegexTester({ data }: RegexTesterProps) {
  const [pattern, setPattern] = useState(data.defaultPattern ?? '\\d+')
  const [flags, setFlags] = useState(data.defaultFlags ?? 'g')
  const [testText, setTestText] = useState(
    data.defaultTestText ?? 'abc123def456ghi789',
  )

  const { matches, error, highlighted } = useMemo(() => {
    const results: MatchResult[] = []
    let err: string | null = null
    try {
      const re = new RegExp(pattern, flags)
      if (flags.includes('g')) {
        let m: RegExpExecArray | null
        while ((m = re.exec(testText)) !== null) {
          results.push({ match: m[0], index: m.index, groups: m.slice(1) })
          if (m.index === re.lastIndex) re.lastIndex++
        }
      } else {
        const m = re.exec(testText)
        if (m) results.push({ match: m[0], index: m.index, groups: m.slice(1) })
      }
    } catch (e) {
      err = (e as Error).message
    }

    // 构建高亮文本
    const parts: Array<{ text: string; match: boolean }> = []
    let lastEnd = 0
    for (const r of results) {
      if (r.index > lastEnd) {
        parts.push({ text: testText.slice(lastEnd, r.index), match: false })
      }
      parts.push({ text: r.match, match: true })
      lastEnd = r.index + r.match.length
    }
    if (lastEnd < testText.length) {
      parts.push({ text: testText.slice(lastEnd), match: false })
    }

    return { matches: results, error: err, highlighted: parts }
  }, [pattern, flags, testText])

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>正则</GroupLabel>
        <span className="font-mono text-accent-sunset">/</span>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="flex-1 rounded-xs border border-hairline bg-canvas px-sm py-xxs font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
        />
        <span className="font-mono text-accent-sunset">/</span>
        <input
          type="text"
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          className="w-16 rounded-xs border border-hairline bg-canvas px-sm py-xxs font-mono text-caption-mono-sm text-accent-breeze outline-none focus:border-accent-sunset"
        />
        <Divider />
        {FLAG_OPTIONS.map((f) => (
          <PillBtn key={f} active={flags === f} onClick={() => setFlags(f)}>
            {f}
          </PillBtn>
        ))}
      </ControlRow>

      <div className="flex flex-col gap-sm p-md">
        {/* 测试文本输入 */}
        <div>
          <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">测试文本</label>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={2}
            className="w-full rounded-xs border border-hairline bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
          />
        </div>

        {error ? (
          <div className="rounded-xs border border-red-400 bg-red-400/10 p-sm font-mono text-caption-mono-sm text-red-400">
            错误: {error}
          </div>
        ) : (
          <>
            {/* 高亮结果 */}
            <div>
              <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">匹配高亮</label>
              <div className="rounded-xs border border-hairline bg-canvas-soft p-sm font-mono text-caption-mono-sm leading-relaxed">
                {highlighted.map((p, i) =>
                  p.match ? (
                    <mark key={i} className="rounded-px bg-accent-sunset px-0.5 text-black">
                      {p.text}
                    </mark>
                  ) : (
                    <span key={i} className="text-body">
                      {p.text}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* 匹配详情 */}
            <div>
              <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">
                匹配详情（{matches.length} 个）
              </label>
              <div className="flex flex-col gap-xs">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-sm rounded-xs border border-hairline bg-canvas px-sm py-xs font-mono text-caption-mono-sm"
                  >
                    <span className="text-body-mid">#{i + 1}</span>
                    <span className="text-accent-sunset">"{m.match}"</span>
                    <span className="text-body-mid">@ index {m.index}</span>
                    {m.groups.length > 0 && (
                      <span className="text-accent-breeze">groups: [{m.groups.join(', ')}]</span>
                    )}
                  </div>
                ))}
                {matches.length === 0 && (
                  <div className="rounded-xs border border-hairline bg-canvas px-sm py-xs text-caption-mono-sm text-body-mid">
                    无匹配
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </DemoCard>
  )
}
