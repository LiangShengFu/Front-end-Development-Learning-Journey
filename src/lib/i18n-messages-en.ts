/**
 * i18n 英文资源
 *
 * 与 i18n-messages-zh.ts 共享相同的 key 列表（一一对应）。
 * 模块标题/知识点内容仍为中文（来源数据），仅 UI 文案英文化。
 */
export const en: Record<string, string> = {
  // ============ common ============
  'common.backToHome': 'Back to Home',
  'common.browseModules': 'Browse Modules',
  'common.browseAllModules': 'Browse all modules',
  'common.startWithHtml': 'Start with HTML basics →',

  // ============ nav ============
  'nav.home': 'Home',
  'nav.modules': 'Modules',
  'nav.progress': 'Progress',
  'nav.about': 'About',
  'nav.search': 'Search',
  'nav.startLearning': 'Start Learning',
  'nav.brandSubtitle': '/ FE Learning Journey',
  'nav.toggleMenu': 'Toggle Menu',
  'nav.toggleLang': 'Switch Language',

  // ============ footer ============
  'footer.tagline': 'Interactive frontend learning platform.',
  'footer.navTitle': 'Navigation',
  'footer.home': 'Home',
  'footer.allModules': 'All Modules',
  'footer.about': 'About Project',
  'footer.techStack': 'Tech Stack',
  'footer.copyright': '© {year} Front-end Development Learning Journey',
  'footer.builtWith': 'Built with inspired design language',

  // ============ home ============
  'home.heroEyebrow': 'Front-end Development Learning Journey',
  'home.heroTitle1': 'Front-end',
  'home.heroTitle2': 'Journey',
  'home.heroDesc':
    'Interactive frontend learning platform with 25 modules · 13 visualization components · {totalPoints}+ knowledge points. From HTML basics to interview prep, systematic coverage of the complete frontend knowledge system.',
  'home.statModules': 'Modules',
  'home.statPoints': 'Knowledge Points',
  'home.statVisualizations': 'Visualizations',
  'home.statStages': 'Learning Stages',
  'home.pathEyebrow': 'Learning Path',
  'home.pathTitle': '8 Stages · 25 Modules',
  'home.pathDesc':
    'A progressive learning path from fundamentals to interview prep. Each stage focuses on a core capability area.',
  'home.stageModule': 'Modules {from}-{to}',
  'home.stageModulesCount': '{count} modules',
  'home.kpVizCount': '{kp} KP · {viz} viz',

  // ============ modules ============
  'modules.allEyebrow': 'Modules',
  'modules.allTitle': 'All Modules',
  'modules.allDesc':
    '25 modules covering the complete frontend knowledge system, organized by 8 learning stages. Click any module to start.',
  'modules.kpCount': '{count} KP',
  'modules.vizCount': '{count} viz',

  // ============ about ============
  'about.eyebrow': 'About This Project',
  'about.title': 'About This Project',
  'about.desc':
    'A systematic frontend development learning platform centered on interactive visualization components, covering the complete knowledge system of frontend engineers.',
  'about.visionEyebrow': 'Vision',
  'about.visionTitle': 'Make Frontend Learning Interactive & Tangible',
  'about.visionDesc1':
    'Traditional frontend learning materials are text-heavy, making abstract concepts hard to grasp. This project pairs every knowledge point with an interactive demo through 13 visualization components, letting learners build intuition through "seeing" and "operating".',
  'about.visionDesc2':
    '25 modules cover the complete path from HTML basics to interview prep, with 420+ knowledge points progressing step-by-step. Each point is marked with a difficulty level for on-demand learning.',
  'about.techEyebrow': 'Tech Stack',
  'about.techTitle': 'Built with Modern Frontend Stack',
  'about.techReact': 'UI framework, function components + Hooks',
  'about.techTs': 'Type safety, complete type system',
  'about.techVite': 'Fast build & HMR',
  'about.techTailwind': 'Atomic CSS, design system implementation',
  'about.techRouter': 'Client-side routing, lazy loading',
  'about.techVitest': 'Unit & component testing',
  'about.designEyebrow': 'Design Language',
  'about.designTitle': 'Dark Design System',
  'about.designDesc':
    'The design language this project follows: near-black canvas (#0a0a0a) as the sole background, white outlined pill buttons as unified interactive elements, no shadows, no gradient backgrounds.',
  'about.designNoteTitle': 'Design Principles',
  'about.designNoteDesc':
    'Font weight 400 throughout; negative tracking + size hierarchy carry the emphasis role; GeistMono uppercase tracking labels as "code comment" style identifiers; the pill shape (9999px radius) is the unified form for all buttons; cards are 8px rounded rectangles with hairline borders, no shadows.',

  // ============ notFound ============
  'notFound.eyebrow': '404 / Not Found',
  'notFound.title': 'Page Not Found',
  'notFound.desc': "The page you're looking for doesn't exist. The link may be broken or mistyped.",
  'notFound.backHome': 'Back to Home',
  'notFound.browseModules': 'Browse Modules',

  // ============ progress ============
  'progress.eyebrow': 'LEARNING PROGRESS',
  'progress.title': 'Learning Progress',
  'progress.desc':
    'Persistent learning records based on the Spaced Repetition algorithm (SM-2), stored in your local browser.',
  'progress.visited': 'Visited',
  'progress.completed': 'Completed',
  'progress.due': 'Due',
  'progress.bookmarks': 'Bookmarks',
  'progress.dueTitle': 'Due for Review',
  'progress.dueEmpty':
    'No items due for review. After completing knowledge points, the next review will be scheduled by the SM-2 algorithm.',
  'progress.knowledgePoint': 'Knowledge Point {n}',
  'progress.overdue': '{n}d overdue',
  'progress.reviewCta': 'Review →',
  'progress.bookmarksTitle': 'Bookmarks ({n})',
  'progress.bookmarkPoint': 'KP #{n}',
  'progress.moduleProgress': 'Module Completion',
  'progress.dangerZone': 'Danger Zone',
  'progress.clearAll': 'Clear All Progress',
  'progress.confirmClear':
    'Are you sure you want to clear all learning progress? This action is irreversible.',

  // ============ search ============
  'search.ariaLabel': 'Global Search',
  'search.placeholder': 'Search modules or knowledge points…',
  'search.empty': 'No matching results',
  'search.hint': 'Type a keyword to search all 25 modules and knowledge points',
  'search.buildingIndex': '(Building index…)',
  'search.navHint': '↑↓ navigate · Enter open',
  'search.resultsCount': '{n} results',

  // ============ pointActions ============
  'pointActions.markComplete': 'Mark Complete',
  'pointActions.completed': 'Completed',
  'pointActions.bookmark': 'Bookmark',
  'pointActions.bookmarked': 'Bookmarked',
  'pointActions.unbookmark': 'Remove Bookmark',
  'pointActions.dueReview': 'Due',
  'pointActions.todayReview': 'Today',
  'pointActions.daysLaterReview': 'In {n}d',
  'pointActions.reviewTitle': 'Self-Rating',
  'pointActions.closeReview': 'Close Rating',
  'pointActions.q0': 'No recall',
  'pointActions.q2': 'Vague',
  'pointActions.q3': 'Struggled',
  'pointActions.q4': 'Mostly',
  'pointActions.q5': 'Perfect',
  'pointActions.reviewHint':
    'Lower rating → shorter next review interval (SM-2 algorithm).',
}
