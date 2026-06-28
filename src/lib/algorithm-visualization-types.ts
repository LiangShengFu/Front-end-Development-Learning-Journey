/**
 * 算法可视化组件类型定义 - 模块 24
 *
 * 定义 7 种模块二十四专用算法可视化组件的类型和数据接口：
 * - StackQueueVisualizer：栈与队列可视化（LIFO / FIFO）
 * - LruCacheSimulator：LRU 缓存模拟器（Map 插入序特性）
 * - LinkedListStepper：链表操作步进器（反转 / 环形检测）
 * - BinaryTreeWalker：二叉树遍历动画（前/中/后序 + 层序）
 * - SortingRaceArena：排序算法竞技场（冒泡/快排/归并/计数）
 * - BfsPathFinder：BFS 最短路径探索器
 * - HandwritingChallenge：手写题挑战（边界条件验证）
 */

// ============================================================================
// 算法可视化组件类型联合
// ============================================================================

export type AlgorithmVisualizationType =
  | 'stack-queue-visualizer'
  | 'lru-cache-simulator'
  | 'linked-list-stepper'
  | 'binary-tree-walker'
  | 'sorting-race-arena'
  | 'bfs-path-finder'
  | 'handwriting-challenge'
  | 'heap-visualizer'
  | 'trie-visualizer'
  | 'union-find-visualizer'
  | 'divide-conquer-tree-visualizer'
  | 'string-algorithm-visualizer'
  | 'hash-table-visualizer'
  | 'binary-search-visualizer'
  | 'sliding-window-visualizer'
  | 'backtracking-tree-visualizer'
  | 'dynamic-programming-visualizer'

// ============================================================================
// StackQueueVisualizer — 栈与队列可视化
// ============================================================================

export interface StackQueueVisualizerData {
  /** 初始栈元素（可选） */
  initialStack?: number[]
  /** 初始队列元素（可选） */
  initialQueue?: number[]
  /** 颜色色板（可选，默认 8 色） */
  colors?: string[]
}

// ============================================================================
// LruCacheSimulator — LRU 缓存模拟器
// ============================================================================

export interface LruOperation {
  /** 操作类型 */
  type: 'get' | 'put'
  /** 键 */
  key: string
  /** 值（put 操作用） */
  value?: string
}

export interface LruCacheSimulatorData {
  /** 缓存容量，默认 3 */
  capacity?: number
  /** 预设操作序列（可选，不传则使用默认序列） */
  operations?: LruOperation[]
}

// ============================================================================
// LinkedListStepper — 链表操作步进器
// ============================================================================

export interface LinkedListStepperData {
  /** 反转演示的节点值，默认 [1, 2, 3, 4, 5] */
  reverseList?: number[]
  /** 环形检测的节点值 */
  cycleList?: {
    values: number[]
    /** 环入口索引（第几个节点开始成环） */
    cycleAt: number
  }
}

// ============================================================================
// BinaryTreeWalker — 二叉树遍历动画
// ============================================================================

export interface TreeNodeData {
  val: number
  left?: TreeNodeData
  right?: TreeNodeData
}

export interface BinaryTreeWalkerData {
  /** 预设二叉树结构（可选，默认 7 节点完全二叉树） */
  tree?: TreeNodeData
}

// ============================================================================
// SortingRaceArena — 排序算法竞技场
// ============================================================================

export type SortAlgorithm = 'bubble' | 'selection' | 'insertion' | 'quick' | 'merge' | 'counting'

export interface SortingRaceArenaData {
  /** 数组大小，默认 30 */
  arraySize?: number
  /** 参赛算法列表，默认全部 */
  algorithms?: SortAlgorithm[]
}

// ============================================================================
// BfsPathFinder — BFS 最短路径探索器
// ============================================================================

export interface BfsPathFinderData {
  /** 网格行列数，默认 10 */
  gridSize?: number
  /** 障碍物密度（0-1），默认 0.25 */
  obstacleDensity?: number
}

// ============================================================================
// HandwritingChallenge — 手写题挑战
// ============================================================================

export interface HandwritingTestCase {
  label: string
  input: string
  expected: string
}

export interface HandwritingProblem {
  id: string
  title: string
  description: string
  testCases: HandwritingTestCase[]
  solution: string
  keyPoints: string[]
}

export interface HandwritingChallengeData {
  problems: HandwritingProblem[]
}

// ============================================================================
// HeapVisualizer — 堆（优先队列）可视化
// ============================================================================

export interface HeapVisualizerData {
  /** 初始堆元素（可选，默认 [5, 2, 7, 1, 9, 3]） */
  initialHeap?: number[]
  /** 堆类型，默认 min-heap */
  heapType?: 'min-heap' | 'max-heap'
}

// ============================================================================
// TrieVisualizer — Trie 字典树可视化
// ============================================================================

export interface TrieVisualizerData {
  /** 预设插入的单词列表（可选，默认 ['app','apple','apply','bat','bath']） */
  words?: string[]
}

// ============================================================================
// UnionFindVisualizer — 并查集可视化
// ============================================================================

export interface UnionFindEdge {
  /** 节点 u */
  u: number
  /** 节点 v */
  v: number
}

export interface UnionFindVisualizerData {
  /** 节点数量，默认 8 */
  nodeCount?: number
  /** 预设的 union 边序列（可选） */
  edges?: UnionFindEdge[]
}

// ============================================================================
// DivideConquerTreeVisualizer — 分治算法可视化
// ============================================================================

export type DivideConquerExample = 'merge-sort' | 'pow' | 'max-subarray'

export interface DivideConquerTreeVisualizerData {
  /** 演示示例，默认 merge-sort */
  example?: DivideConquerExample
  /** 输入数组（merge-sort / max-subarray 用），默认 [3, 1, 4, 1, 5, 9, 2, 6] */
  inputArray?: number[]
  /** 底数（pow 用），默认 2 */
  base?: number
  /** 指数（pow 用），默认 10 */
  exponent?: number
}

// ============================================================================
// StringAlgorithmVisualizer — 字符串专项算法可视化
// ============================================================================

export type StringAlgorithmMode = 'reverse' | 'palindrome' | 'longest-palindrome' | 'kmp'

export interface StringAlgorithmVisualizerData {
  /** 演示模式，默认 reverse */
  mode?: StringAlgorithmMode
  /** 输入字符串（可选） */
  text?: string
  /** KMP 模式串（kmp 模式用） */
  pattern?: string
}

// ============================================================================
// HashTableVisualizer — 哈希表可视化
// ============================================================================

export interface HashTableVisualizerData {
  /** 桶数量，默认 7 */
  bucketCount?: number
  /** 哈希函数模式，默认 modulo */
  hashMode?: 'modulo' | 'murmur'
  /** 冲突解决策略，默认 chaining */
  strategy?: 'chaining' | 'linear-probing'
  /** 预设插入的键列表（可选） */
  keys?: string[]
}

// ============================================================================
// BinarySearchVisualizer — 二分查找可视化
// ============================================================================

export type BinarySearchVariant = 'classic' | 'lower-bound' | 'upper-bound' | 'rotated'

export interface BinarySearchVisualizerData {
  /** 输入数组（须有序，rotated 模式可为旋转数组），默认 [1,3,5,7,9,11,13,15,17,19] */
  array?: number[]
  /** 查找目标值，默认 11 */
  target?: number
  /** 二分变体，默认 classic */
  variant?: BinarySearchVariant
}

// ============================================================================
// SlidingWindowVisualizer — 滑动窗口可视化
// ============================================================================

export type SlidingWindowProblem = 'max-sum-k' | 'longest-substring' | 'min-window'

export interface SlidingWindowVisualizerData {
  /** 演示题目，默认 max-sum-k */
  problem?: SlidingWindowProblem
  /** 输入数组（max-sum-k 用） */
  array?: number[]
  /** 输入字符串（longest-substring / min-window 用） */
  text?: string
  /** 窗口大小 k（max-sum-k 用），默认 3 */
  k?: number
}

// ============================================================================
// BacktrackingTreeVisualizer — 回溯算法可视化
// ============================================================================

export type BacktrackingProblem = 'permutations' | 'n-queens' | 'subsets'

export interface BacktrackingTreeVisualizerData {
  /** 演示题目，默认 permutations */
  problem?: BacktrackingProblem
  /** 输入 n（permutations: n 个数字 1..n；n-queens: n×n 棋盘；subsets: 集合 {1..n}） */
  n?: number
}

// ============================================================================
// DynamicProgrammingVisualizer — 动态规划可视化
// ============================================================================

export type DPProblem = 'climbing-stairs' | 'lcs' | 'knapsack01'

export interface DynamicProgrammingVisualizerData {
  /** 演示题目，默认 climbing-stairs */
  problem?: DPProblem
  /** 爬楼梯阶数（climbing-stairs 用），默认 5 */
  n?: number
  /** LCS 的两个字符串，默认 ['abcde', 'ace'] */
  text1?: string
  text2?: string
  /** 0-1 背包容量，默认 4 */
  capacity?: number
  /** 0-1 背包物品重量，默认 [1, 3, 4] */
  weights?: number[]
  /** 0-1 背包物品价值，默认 [15, 20, 30] */
  values?: number[]
}

// ============================================================================
// 可视化组件元数据
// ============================================================================

export const algorithmVisualizationMeta: Record<
  AlgorithmVisualizationType,
  { type: AlgorithmVisualizationType; label: string; identifier: string; purpose: string }
> = {
  'stack-queue-visualizer': {
    type: 'stack-queue-visualizer',
    label: '栈与队列可视化',
    identifier: 'stack-queue-visualizer',
    purpose: 'LIFO vs FIFO 交互演示',
  },
  'lru-cache-simulator': {
    type: 'lru-cache-simulator',
    label: 'LRU 缓存模拟器',
    identifier: 'lru-cache-simulator',
    purpose: 'Map 插入序与淘汰策略',
  },
  'linked-list-stepper': {
    type: 'linked-list-stepper',
    label: '链表操作步进器',
    identifier: 'linked-list-stepper',
    purpose: '反转链表 / 环形检测动画',
  },
  'binary-tree-walker': {
    type: 'binary-tree-walker',
    label: '二叉树遍历动画',
    identifier: 'binary-tree-walker',
    purpose: '前/中/后序 + 层序遍历',
  },
  'sorting-race-arena': {
    type: 'sorting-race-arena',
    label: '排序算法竞技场',
    identifier: 'sorting-race-arena',
    purpose: '四种排序算法对比动画',
  },
  'bfs-path-finder': {
    type: 'bfs-path-finder',
    label: 'BFS 路径探索器',
    identifier: 'bfs-path-finder',
    purpose: '广度优先最短路径搜索',
  },
  'handwriting-challenge': {
    type: 'handwriting-challenge',
    label: '手写题挑战',
    identifier: 'handwriting-challenge',
    purpose: '高频手写题边界条件验证',
  },
  'heap-visualizer': {
    type: 'heap-visualizer',
    label: '堆可视化',
    identifier: 'heap-visualizer',
    purpose: '完全二叉树 + 上浮下沉动画',
  },
  'trie-visualizer': {
    type: 'trie-visualizer',
    label: 'Trie 字典树可视化',
    identifier: 'trie-visualizer',
    purpose: '前缀共享 / 插入搜索动画',
  },
  'union-find-visualizer': {
    type: 'union-find-visualizer',
    label: '并查集可视化',
    identifier: 'union-find-visualizer',
    purpose: '路径压缩 + 按秩合并',
  },
  'divide-conquer-tree-visualizer': {
    type: 'divide-conquer-tree-visualizer',
    label: '分治递归树可视化',
    identifier: 'divide-conquer-tree-visualizer',
    purpose: '分解→解决→合并三阶段',
  },
  'string-algorithm-visualizer': {
    type: 'string-algorithm-visualizer',
    label: '字符串算法可视化',
    identifier: 'string-algorithm-visualizer',
    purpose: '反转 / 回文 / KMP 动画',
  },
  'hash-table-visualizer': {
    type: 'hash-table-visualizer',
    label: '哈希表可视化',
    identifier: 'hash-table-visualizer',
    purpose: '哈希函数 + 冲突解决动画',
  },
  'binary-search-visualizer': {
    type: 'binary-search-visualizer',
    label: '二分查找可视化',
    identifier: 'binary-search-visualizer',
    purpose: '经典 / 边界 / 旋转数组二分',
  },
  'sliding-window-visualizer': {
    type: 'sliding-window-visualizer',
    label: '滑动窗口可视化',
    identifier: 'sliding-window-visualizer',
    purpose: '定长 / 不定长窗口收缩',
  },
  'backtracking-tree-visualizer': {
    type: 'backtracking-tree-visualizer',
    label: '回溯搜索树可视化',
    identifier: 'backtracking-tree-visualizer',
    purpose: '全排列 / N 皇后 / 子集剪枝',
  },
  'dynamic-programming-visualizer': {
    type: 'dynamic-programming-visualizer',
    label: '动态规划可视化',
    identifier: 'dynamic-programming-visualizer',
    purpose: '一维/二维/背包 DP 状态转移动画',
  },
}
