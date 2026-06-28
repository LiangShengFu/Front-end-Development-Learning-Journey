/**
 * 全局搜索索引
 *
 * 基于 minisearch 构建，支持两级搜索粒度：
 * - 模块级：从 moduleSummaries（同步可用，覆盖 25 模块标题/简介）
 * - 知识点级：从已加载的模块内容中提取知识点（按需扩充）
 *
 * 索引构建策略：
 * - 模块索引在应用启动时立即构建（无 IO）
 * - 知识点索引在用户首次打开搜索时按需构建（避免加载所有模块数据）
 */
import MiniSearch from 'minisearch'
import { moduleSummaries, type ModuleSummary } from './modules'
import type { ModuleMeta, ContentBlock } from './types'
import { getCachedModule, loadModule } from './moduleRegistry'

/**
 * 自定义分词器：同时支持中英文
 *
 * MiniSearch 默认分词器按空格分割，对中文无效（中文无空格）。
 * 此分词器：
 * - 英文：按非字母数字字符分割为词
 * - 中文：生成单字 + bigram，保证"闭包"能匹配"闭包"和"闭"包"
 *
 * 返回小写 term 列表。
 */
function tokenize(text: string): string[] {
  if (!text) return []
  const terms: string[] = []
  // 提取英文词（字母数字序列）
  const enWords = text.match(/[a-zA-Z0-9]+/g) ?? []
  for (const w of enWords) terms.push(w.toLowerCase())
  // 提取中文字符序列，生成单字 + bigram
  const cnSegments = text.match(/[\u4e00-\u9fa5]+/g) ?? []
  for (const seg of cnSegments) {
    for (let i = 0; i < seg.length; i++) {
      terms.push(seg[i]) // 单字
      if (i + 1 < seg.length) {
        terms.push(seg.slice(i, i + 2)) // bigram
      }
    }
  }
  return terms
}

/** 搜索结果条目 */
export interface SearchResult {
  /** 结果类型 */
  type: 'module' | 'knowledge-point'
  /** 模块 slug */
  moduleSlug: string
  /** 模块编号 */
  moduleNumber: string
  /** 模块标题 */
  moduleTitle: string
  /** 知识点序号（仅 knowledge-point 类型） */
  pointOrder?: number
  /** 知识点标题（仅 knowledge-point 类型） */
  pointTitle?: string
  /** 知识点难度（仅 knowledge-point 类型） */
  pointDifficulty?: number
  /** 用于展示的匹配片段 */
  snippet: string
  /** 匹配得分（越高越相关） */
  score: number
}

/** 从内容块提取纯文本用于索引 */
function extractTextFromBlocks(blocks: ContentBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'heading':
          return `${b.eyebrow ?? ''} ${b.text}`
        case 'paragraph':
          return b.text
        case 'code':
          return b.code
        case 'list':
          return b.items.join(' ')
        case 'callout':
          return `${b.title ?? ''} ${b.text}`
        case 'quote':
          return `${b.text} ${b.source ?? ''}`
        case 'table':
          return `${b.caption ?? ''} ${b.headers.join(' ')} ${b.rows.flat().join(' ')}`
        case 'demo':
          return b.visualizationType
        default:
          return ''
      }
    })
    .join(' ')
    .slice(0, 2000) // 限制单知识点索引长度
}

/** 知识点索引文档 */
interface KpDoc {
  id: string
  moduleSlug: string
  moduleNumber: string
  moduleTitle: string
  pointOrder: number
  pointTitle: string
  pointDifficulty: number
  content: string
}

let moduleIndex: MiniSearch<ModuleSummary> | null = null
let kpIndex: MiniSearch<KpDoc> | null = null

/** 已建立索引的模块 slug 集合 */
const indexedModules = new Set<string>()

/** 知识点索引文档缓存 */
const kpDocs = new Map<string, KpDoc>()

/** 构建模块级索引（同步，立即可用） */
function getModuleIndex(): MiniSearch<ModuleSummary> {
  if (moduleIndex) return moduleIndex
  moduleIndex = new MiniSearch({
    idField: 'slug', // 使用 slug 作为文档唯一标识（ModuleSummary 无 id 字段）
    fields: ['title', 'summary', 'number', 'stageLabel'],
    storeFields: ['title', 'slug', 'number', 'summary', 'icon'],
    tokenize,
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      boost: { title: 3, summary: 1 },
    },
  })
  moduleIndex.addAll(moduleSummaries)
  return moduleIndex
}

/**
 * 将单个模块的知识点加入索引
 */
function indexModule(module: ModuleMeta): void {
  if (indexedModules.has(module.slug)) return
  for (const point of module.points) {
    const id = `${module.slug}:${point.order}`
    if (kpDocs.has(id)) continue
    const doc: KpDoc = {
      id,
      moduleSlug: module.slug,
      moduleNumber: module.number,
      moduleTitle: module.title,
      pointOrder: point.order,
      pointTitle: point.title,
      pointDifficulty: point.difficulty,
      content: extractTextFromBlocks(point.blocks),
    }
    kpDocs.set(id, doc)
    kpIndex?.add(doc)
  }
  indexedModules.add(module.slug)
}

/**
 * 确保 minisearch 知识点索引已初始化
 */
function ensureKpIndex(): MiniSearch<KpDoc> {
  if (kpIndex) return kpIndex
  kpIndex = new MiniSearch<KpDoc>({
    fields: ['pointTitle', 'content', 'moduleTitle'],
    storeFields: ['moduleSlug', 'moduleNumber', 'moduleTitle', 'pointOrder', 'pointTitle', 'pointDifficulty'],
    tokenize,
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      boost: { pointTitle: 3, content: 1, moduleTitle: 2 },
    },
  })
  return kpIndex
}

/**
 * 预加载并索引所有已缓存的模块
 * 用户首次打开搜索时调用
 */
export async function buildFullIndex(): Promise<void> {
  ensureKpIndex()
  const promises = moduleSummaries.map(async (summary) => {
    let module = getCachedModule(summary.slug)
    if (!module) {
      try {
        module = await loadModule(summary.slug)
      } catch {
        return
      }
    }
    if (module) indexModule(module)
  })
  await Promise.all(promises)
}

/**
 * 索引单个模块（用户访问该模块时调用，使搜索覆盖当前正在学习的内容）
 */
export function indexModuleIfNeeded(slug: string): void {
  if (indexedModules.has(slug)) return
  const module = getCachedModule(slug)
  if (module) {
    ensureKpIndex()
    indexModule(module)
  }
}

/**
 * 执行全局搜索（无上限，返回所有匹配结果）
 *
 * @param query 搜索词
 */
export function search(query: string): SearchResult[] {
  const trimmed = query.trim()
  if (!trimmed) return []

  const results: SearchResult[] = []

  // 1. 模块级搜索（全部纳入）
  const modIndex = getModuleIndex()
  const modHits = modIndex.search(trimmed, { fuzzy: 0.2, prefix: true })
  for (const hit of modHits) {
    results.push({
      type: 'module',
      moduleSlug: hit.slug,
      moduleNumber: hit.number,
      moduleTitle: hit.title,
      snippet: hit.summary,
      score: hit.score,
    })
  }

  // 2. 知识点级搜索（全部纳入，无截断）
  if (kpIndex && kpDocs.size > 0) {
    const kpHits = kpIndex.search(trimmed, { fuzzy: 0.2, prefix: true })
    for (const hit of kpHits) {
      // 从 kpDocs 缓存取 content（storeFields 不含 content 以节省内存）
      const doc = kpDocs.get(hit.id)
      const content = doc?.content ?? ''
      results.push({
        type: 'knowledge-point',
        moduleSlug: hit.moduleSlug,
        moduleNumber: hit.moduleNumber,
        moduleTitle: hit.moduleTitle,
        pointOrder: hit.pointOrder,
        pointTitle: hit.pointTitle,
        pointDifficulty: hit.pointDifficulty,
        snippet: extractSnippet(hit.pointTitle, content, trimmed),
        score: hit.score,
      })
    }
  }

  return results
}

/** 从内容中提取包含查询词的片段 */
function extractSnippet(title: string, content: string, query: string): string {
  if (!content) return title
  const lower = content.toLowerCase()
  const idx = lower.indexOf(query.toLowerCase())
  if (idx === -1) return title
  const start = Math.max(0, idx - 30)
  const end = Math.min(content.length, idx + query.length + 80)
  return `${start > 0 ? '…' : ''}${content.slice(start, end)}${end < content.length ? '…' : ''}`
}

/** 索引是否已就绪（知识点级搜索可用） */
export function isIndexReady(): boolean {
  return kpDocs.size > 0
}

/** 已索引的知识点数 */
export function getIndexedCount(): number {
  return kpDocs.size
}

/** 构建知识点 URL（带锚点） */
export function buildKnowledgePointUrl(moduleSlug: string, pointOrder?: number): string {
  if (pointOrder === undefined) return `/modules/${moduleSlug}`
  return `/modules/${moduleSlug}#point-${pointOrder}`
}
