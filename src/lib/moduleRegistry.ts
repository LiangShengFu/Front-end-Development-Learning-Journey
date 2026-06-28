/**
 * 模块内容注册中心
 *
 * 统一管理所有模块的详细内容数据。
 * 当前已实现模块 01-23，其余模块按需扩展。
 * 使用动态 import 实现懒加载，避免首屏加载所有模块内容。
 *
 * i18n 策略：
 * - 中文（默认）：加载 `src/modules/<slug>.ts`
 * - 英文：优先加载 `src/modules/<slug>.en.ts`，若不存在则回退到中文版
 * - 通过 loadModule(slug, locale) 选择版本
 */
import type { ModuleMeta } from './types'
import type { Locale } from './i18n'

/** 中文模块加载器映射（默认） */
const moduleLoaders: Record<string, () => Promise<{ default: ModuleMeta }>> = {
  'html-fundamentals': () => import('../modules/html-fundamentals').then((m) => ({ default: m.htmlFundamentalsModule })),
  'css-fundamentals': () => import('../modules/css-fundamentals').then((m) => ({ default: m.cssFundamentalsModule })),
  'javascript-core': () => import('../modules/javascript-core').then((m) => ({ default: m.javascriptCoreModule })),
  'dom-bom-webapi': () => import('../modules/dom-bom-webapi').then((m) => ({ default: m.domBomWebApiModule })),
  'debugging-tools': () => import('../modules/debugging-tools').then((m) => ({ default: m.debuggingToolsModule })),
  'css-engineering': () => import('../modules/css-engineering').then((m) => ({ default: m.cssEngineeringModule })),
  'typescript-core': () => import('../modules/typescript-core').then((m) => ({ default: m.typescriptCoreModule })),
  'react-fundamentals': () => import('../modules/react-fundamentals').then((m) => ({ default: m.reactFundamentalsModule })),
  'react-advanced': () => import('../modules/react-advanced').then((m) => ({ default: m.reactAdvancedModule })),
  'nextjs-ssr': () => import('../modules/nextjs-ssr').then((m) => ({ default: m.nextjsSsrModule })),
  'vue-fundamentals': () => import('../modules/vue-fundamentals').then((m) => ({ default: m.vueFundamentalsModule })),
  'vue-advanced-nuxt': () => import('../modules/vue-advanced-nuxt').then((m) => ({ default: m.vueAdvancedNuxtModule })),
  'mini-program': () => import('../modules/miniprogram').then((m) => ({ default: m.miniprogramModule })),
  'cross-platform-mobile': () => import('../modules/cross-platform').then((m) => ({ default: m.crossPlatformModule })),
  'engineering': () => import('../modules/engineering').then((m) => ({ default: m.engineeringModule })),
  'browser-network': () => import('../modules/browser-network').then((m) => ({ default: m.browserNetworkModule })),
  'nodejs-fullstack': () => import('../modules/nodejs-fullstack').then((m) => ({ default: m.nodejsFullstackModule })),
  'testing-system': () => import('../modules/testing-system').then((m) => ({ default: m.testingSystemModule })),
  'performance-security': () => import('../modules/performance-security').then((m) => ({ default: m.performanceSecurityModule })),
  'visualization-architecture': () => import('../modules/visualization-architecture').then((m) => ({ default: m.visualizationArchitectureModule })),
  'web-advanced-api': () => import('../modules/web-advanced-api').then((m) => ({ default: m.webAdvancedApiModule })),
  'microfrontend-architecture': () => import('../modules/microfrontend-architecture').then((m) => ({ default: m.microfrontendModule })),
  'monitoring-auth': () => import('../modules/monitoring-auth').then((m) => ({ default: m.monitoringAuthModule })),
  'data-structure-algorithm': () => import('../modules/data-structure-algorithm').then((m) => ({ default: m.dataStructureAlgorithmModule })),
  'interview-prep': () => import('../modules/interview-prep').then((m) => ({ default: m.interviewPrepModule })),
}

/**
 * 英文模块加载器映射
 * 仅包含已翻译的模块；未列出的 slug 会回退到中文版
 */
const moduleLoadersEn: Record<string, () => Promise<{ default: ModuleMeta }>> = {
  'html-fundamentals': () =>
    import('../modules/html-fundamentals.en').then((m) => ({ default: m.htmlFundamentalsModule })),
  'css-fundamentals': () =>
    import('../modules/css-fundamentals.en').then((m) => ({ default: m.cssFundamentalsModule })),
  'javascript-core': () =>
    import('../modules/javascript-core.en').then((m) => ({ default: m.javascriptCoreModule })),
  'dom-bom-webapi': () =>
    import('../modules/dom-bom-webapi.en').then((m) => ({ default: m.domBomWebApiModule })),
  'debugging-tools': () =>
    import('../modules/debugging-tools.en').then((m) => ({ default: m.debuggingToolsModule })),
  'css-engineering': () =>
    import('../modules/css-engineering.en').then((m) => ({ default: m.cssEngineeringModule })),
  'typescript-core': () =>
    import('../modules/typescript-core.en').then((m) => ({ default: m.typescriptCoreModule })),
}

/** 模块内容缓存（key: `${locale}:${slug}`） */
const moduleCache = new Map<string, ModuleMeta>()

/**
 * 异步加载模块完整内容
 * @param slug 模块 slug
 * @param locale 目标语言；非中英文时回退到中文
 * @returns 模块元数据（含完整知识点）
 */
export async function loadModule(
  slug: string,
  locale: Locale = 'zh',
): Promise<ModuleMeta | undefined> {
  const cacheKey = `${locale}:${slug}`
  // 命中缓存
  const cached = moduleCache.get(cacheKey)
  if (cached) return cached

  // 英文优先尝试英文版加载器；若未提供则回退中文
  let loader = moduleLoaders[slug]
  if (locale === 'en' && moduleLoadersEn[slug]) {
    loader = moduleLoadersEn[slug]
  }
  if (!loader) {
    return undefined
  }

  const mod = await loader()
  moduleCache.set(cacheKey, mod.default)
  // 同步缓存中文版作为兜底（避免英文加载完成后中文仍重复请求）
  if (locale === 'en' && !moduleCache.has(`zh:${slug}`)) {
    moduleCache.set(`zh:${slug}`, mod.default)
  }
  return mod.default
}

/** 同步获取已缓存的模块（若未加载返回 undefined） */
export function getCachedModule(slug: string, locale: Locale = 'zh'): ModuleMeta | undefined {
  return moduleCache.get(`${locale}:${slug}`)
}
