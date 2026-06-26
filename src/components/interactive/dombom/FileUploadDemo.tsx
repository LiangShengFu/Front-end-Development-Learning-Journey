/**
 * FileUploadDemo - 文件上传与预览
 *
 * 选择图片/文本文件，FileReader 读取并预览，显示文件元信息与读取进度。
 * 支持拖拽上传。
 */
import { useState, useRef, useCallback } from 'react'
import type { FileUploadData } from '../../../lib/dom-bom-visualization-types'
import { cn } from '../../../lib/utils'
import { DemoCard, ControlRow, GroupLabel, CodeOutput } from './shared'

interface FileUploadDemoProps {
  data: FileUploadData
}

interface FileInfo {
  name: string
  size: number
  type: string
  lastModified: number
}

interface PreviewState {
  kind: 'image' | 'text' | 'binary' | 'none'
  content: string
  progress: number
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function FileUploadDemo({ data }: FileUploadDemoProps) {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const [preview, setPreview] = useState<PreviewState>({ kind: 'none', content: '', progress: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const readFile = useCallback((file: File) => {
    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type || 'unknown',
      lastModified: file.lastModified,
    })
    setPreview({ kind: 'none', content: '', progress: 0 })

    const reader = new FileReader()

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setPreview((prev) => ({ ...prev, progress: Math.round((e.loaded / e.total) * 100) }))
      }
    }

    reader.onload = () => {
      const result = reader.result as string
      if (file.type.startsWith('image/')) {
        setPreview({ kind: 'image', content: result, progress: 100 })
      } else if (file.type.startsWith('text/') || file.type === 'application/json') {
        setPreview({ kind: 'text', content: result, progress: 100 })
      } else {
        setPreview({ kind: 'binary', content: `(二进制文件，大小 ${formatSize(file.size)})`, progress: 100 })
      }
    }

    reader.onerror = () => {
      setPreview({ kind: 'text', content: '读取失败: ' + (reader.error?.message ?? '未知错误'), progress: 100 })
    }

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file)
    } else {
      reader.readAsText(file)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) readFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) readFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <DemoCard title={data.title}>
      <ControlRow>
        <GroupLabel>选择文件</GroupLabel>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-pill border border-accent-sunset/40 px-md py-xxs font-mono text-caption-mono-sm text-accent-sunset hover:bg-accent-sunset/10"
        >
          选择文件
        </button>
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,text/*,.json,.csv,.txt"
        />
      </ControlRow>

      <div className="p-md">
        {/* 拖拽区域 */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'mb-md flex h-[100px] cursor-pointer items-center justify-center rounded-xs border-2 border-dashed transition-colors',
            isDragging ? 'border-accent-sunset bg-accent-sunset/10' : 'border-hairline bg-canvas-soft',
          )}
          onClick={() => inputRef.current?.click()}
        >
          <div className="text-center font-mono text-caption-mono-sm text-body-mid">
            {isDragging ? '松开以上传文件' : '拖拽文件到此处，或点击选择'}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
          {/* 文件元信息 */}
          <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
            <div className="mb-1 text-[0.62rem] uppercase text-body-mid">文件元信息（File 对象）</div>
            {fileInfo ? (
              <div className="flex flex-col gap-xs font-mono text-caption-mono-sm">
                <div className="flex justify-between"><span className="text-body-mid">name</span><span className="text-accent-sunset">{fileInfo.name}</span></div>
                <div className="flex justify-between"><span className="text-body-mid">size</span><span className="text-accent-breeze">{formatSize(fileInfo.size)}</span></div>
                <div className="flex justify-between"><span className="text-body-mid">type</span><span className="text-orange-400">{fileInfo.type}</span></div>
                <div className="flex justify-between"><span className="text-body-mid">lastModified</span><span className="text-purple-400">{new Date(fileInfo.lastModified).toLocaleString()}</span></div>
              </div>
            ) : (
              <div className="py-md text-center text-caption-mono-sm text-body-mid">未选择文件</div>
            )}
          </div>

          {/* 读取进度 + 预览 */}
          <div className="rounded-xs border border-hairline bg-canvas-soft p-sm">
            <div className="mb-1 text-[0.62rem] uppercase text-body-mid">FileReader 读取结果</div>
            {fileInfo ? (
              <>
                <div className="mb-2 flex items-center gap-sm">
                  <div className="h-1 flex-1 overflow-hidden rounded-pill bg-canvas-mid">
                    <div
                      className="h-full bg-accent-sunset transition-all"
                      style={{ width: `${preview.progress}%` }}
                    />
                  </div>
                  <span className="font-mono text-caption-mono-sm text-accent-sunset">{preview.progress}%</span>
                </div>
                <div className="h-[140px] overflow-auto rounded-xs bg-canvas p-xs">
                  {preview.kind === 'image' && (
                    <img src={preview.content} alt="预览" className="max-h-full max-w-full object-contain" />
                  )}
                  {preview.kind === 'text' && (
                    <pre className="whitespace-pre-wrap break-all font-mono text-caption-mono-sm text-body">{preview.content}</pre>
                  )}
                  {preview.kind === 'binary' && (
                    <div className="font-mono text-caption-mono-sm text-body-mid">{preview.content}</div>
                  )}
                  {preview.kind === 'none' && (
                    <div className="font-mono text-caption-mono-sm text-body-mid">读取中...</div>
                  )}
                </div>
              </>
            ) : (
              <div className="py-md text-center text-caption-mono-sm text-body-mid">未选择文件</div>
            )}
          </div>
        </div>
      </div>

      <CodeOutput>
        <span className="text-body-mid">{`/* FileReader API */`}</span>
        {'\n'}
        <span className="text-accent-breeze">const</span> reader ={' '}
        <span className="text-accent-breeze">new</span>{' '}
        <span className="text-accent-sunset">FileReader</span>();{'\n'}
        reader.onload = (e) =&gt; {'{'} console.log(e.target.result); {'}'};{'\n'}
        reader.onprogress = (e) =&gt; {'{'} console.log(e.loaded / e.total); {'}'};{'\n'}
        {'\n'}
        reader.<span className="text-accent-sunset">readAsDataURL</span>(file);{'  '}
        <span className="text-body-mid">{`// 图片 → base64`}</span>{'\n'}
        reader.<span className="text-accent-sunset">readAsText</span>(file);{'     '}
        <span className="text-body-mid">{`// 文本 → 字符串`}</span>{'\n'}
        reader.<span className="text-accent-sunset">readAsArrayBuffer</span>(file);{' '}
        <span className="text-body-mid">{`// 二进制 → ArrayBuffer`}</span>
      </CodeOutput>
    </DemoCard>
  )
}
