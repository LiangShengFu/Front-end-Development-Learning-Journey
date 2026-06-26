/**
 * BlobDownloadDemo - Blob 下载演示
 *
 * 输入文本内容，选择 MIME 类型，生成 Blob 并下载文件。
 */
import { useState, useCallback } from 'react'
import type { BlobDownloadData } from '../../../lib/dom-bom-visualization-types'
import { DemoCard, ControlRow, GroupLabel, PillBtn, CodeOutput } from './shared'

interface BlobDownloadDemoProps {
  data: BlobDownloadData
}

const MIME_OPTIONS = [
  { value: 'text/plain', label: 'text/plain (.txt)', ext: 'txt' },
  { value: 'application/json', label: 'application/json (.json)', ext: 'json' },
  { value: 'text/csv', label: 'text/csv (.csv)', ext: 'csv' },
  { value: 'text/html', label: 'text/html (.html)', ext: 'html' },
] as const

export function BlobDownloadDemo({ data }: BlobDownloadDemoProps) {
  const [content, setContent] = useState(
    data.defaultContent ?? 'name,age,city\nAlice,28,Beijing\nBob,32,Shanghai\nCarol,25,Guangzhou',
  )
  const [mimeIdx, setMimeIdx] = useState(2)
  const [filename, setFilename] = useState(data.defaultFilename ?? 'data')
  const [blobInfo, setBlobInfo] = useState<{ size: number; type: string; url: string } | null>(null)
  const [error, setError] = useState('')

  const selectedMime = MIME_OPTIONS[mimeIdx]

  const generateBlob = useCallback(() => {
    try {
      setError('')
      const blob = new Blob([content], { type: selectedMime.value })
      const url = URL.createObjectURL(blob)
      // 释放之前的 URL
      if (blobInfo?.url) URL.revokeObjectURL(blobInfo.url)
      setBlobInfo({ size: blob.size, type: blob.type, url })
    } catch (e) {
      setError((e as Error).message)
    }
  }, [content, selectedMime, blobInfo])

  const download = useCallback(() => {
    if (!blobInfo) return
    const a = document.createElement('a')
    a.href = blobInfo.url
    a.download = `${filename || 'data'}.${selectedMime.ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [blobInfo, filename, selectedMime])

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>文件名</GroupLabel>
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="w-32 rounded-xs border border-hairline bg-canvas px-sm py-xxs font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
        />
        <span className="font-mono text-caption-mono-sm text-body-mid">.{selectedMime.ext}</span>
        <GroupLabel className="ml-md">MIME</GroupLabel>
        <select
          value={mimeIdx}
          onChange={(e) => setMimeIdx(Number(e.target.value))}
          className="rounded-xs border border-hairline bg-canvas px-sm py-xxs font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
        >
          {MIME_OPTIONS.map((m, i) => (
            <option key={m.value} value={i}>
              {m.label}
            </option>
          ))}
        </select>
      </ControlRow>

      <div className="p-md">
        {/* 文本输入 */}
        <div className="mb-md">
          <label className="mb-1 block text-[0.62rem] uppercase text-body-mid">内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full rounded-xs border border-hairline bg-canvas-soft p-sm font-mono text-caption-mono-sm text-body outline-none focus:border-accent-sunset"
          />
        </div>

        <ControlRow flat>
          <PillBtn variant="primary" active onClick={generateBlob}>
            生成 Blob
          </PillBtn>
          <PillBtn active={!!blobInfo} onClick={download} >
            下载文件
          </PillBtn>
        </ControlRow>

        {/* Blob 信息 */}
        {blobInfo && (
          <div className="mt-md grid grid-cols-1 gap-md lg:grid-cols-2">
            <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
              <div className="mb-1 text-[0.62rem] uppercase text-body-mid">Blob 元信息</div>
              <div className="flex flex-col gap-xs font-mono text-caption-mono-sm">
                <div className="flex justify-between">
                  <span className="text-body-mid">size</span>
                  <span className="text-accent-sunset">{blobInfo.size} B ({(blobInfo.size / 1024).toFixed(2)} KB)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body-mid">type</span>
                  <span className="text-accent-breeze">{blobInfo.type}</span>
                </div>
                <div className="flex justify-between gap-sm">
                  <span className="text-body-mid">url</span>
                  <span className="truncate text-orange-400">{blobInfo.url}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
              <div className="mb-1 text-[0.62rem] uppercase text-body-mid">实际下载链接</div>
              <a
                href={blobInfo.url}
                download={`${filename || 'data'}.${selectedMime.ext}`}
                className="block break-all rounded-xs bg-canvas px-sm py-xs font-mono text-caption-mono-sm text-accent-sunset underline hover:bg-canvas-mid"
              >
                {blobInfo.url}
              </a>
              <div className="mt-2 text-[0.62rem] text-body-mid">
                点击上方链接或"下载文件"按钮触发下载
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-md rounded-xs border border-red-400 bg-red-400/10 p-sm font-mono text-caption-mono-sm text-red-400">
            错误: {error}
          </div>
        )}
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* Blob 与下载 */`}</span>
        {'\n'}
        <span className="text-accent-breeze">const</span> blob ={' '}
        <span className="text-accent-breeze">new</span>{' '}
        <span className="text-accent-sunset">Blob</span>([content], &#123; type: <span className="text-accent-sunset-soft">'{selectedMime.value}'</span> &#125;);{'\n'}
        <span className="text-accent-breeze">const</span> url ={' '}
        <span className="text-accent-breeze">URL</span>.<span className="text-accent-sunset">createObjectURL</span>(blob);{'\n'}
        {'\n'}
        <span className="text-accent-breeze">const</span> a ={' '}
        <span className="text-accent-breeze">document</span>.createElement(<span className="text-accent-sunset-soft">'a'</span>);{'\n'}
        a.href = url;{'\n'}
        a.download = <span className="text-accent-sunset-soft">'{filename}.{selectedMime.ext}'</span>;{'\n'}
        a.click();{'\n'}
        {'\n'}
        <span className="text-accent-breeze">URL</span>.<span className="text-accent-sunset">revokeObjectURL</span>(url);{'  '}
        <span className="text-body-mid">{`// 释放内存`}</span>
      </CodeOutput>
    </DemoCard>
  )
}
