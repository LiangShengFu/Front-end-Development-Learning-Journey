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

export type SortAlgorithm = 'bubble' | 'quick' | 'merge' | 'counting'

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
}
