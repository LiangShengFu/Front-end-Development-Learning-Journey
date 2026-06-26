/**
 * 模块 24：数据结构与前端算法
 *
 * 严格遵循 docx/PROJECT_CONTENT.md 与 docx/模块二十四.md 设计文档：
 * - 18 个知识点（17 章节 + 1 小测验）
 * - 7 个新增算法可视化组件 + 5 个复用核心组件
 *
 * 适配到项目现有 React+TS+Vite 架构，使用 ModuleMeta 数据驱动：
 * - KP1 栈与队列（StackQueueVisualizer + LruCacheSimulator）
 * - KP2 链表（LinkedListStepper）
 * - KP3 树与二叉树（BinaryTreeWalker）
 * - KP5 哈希表（CompareTable 对象 vs Map）
 * - KP6 数据结构对比（CompareTable）
 * - KP7 排序算法（SortingRaceArena）
 * - KP8 搜索算法（BfsPathFinder + CodeStepper 二分查找）
 * - KP13 算法思想对比（ArchitectureDiagram）
 * - KP14 高频手写题（HandwritingChallenge）
 * - KP15 手写题分类汇总（Accordion）
 * - KP17 算法学习路径（Timeline）
 * - KP18 算法测验（QuizCard）
 *
 * 覆盖栈/队列/链表/树/图/哈希表、排序/搜索/DP/贪心/回溯、
 * 高频手写题、正则表达式等面试核心算法知识体系。
 */
import type { ModuleMeta } from '../lib/types'

export const dataStructureAlgorithmModule: ModuleMeta = {
  number: '24',
  title: '数据结构与前端算法',
  slug: 'data-structure-algorithm',
  stage: 'interview',
  stageLabel: '面试冲刺 · 第 1 模块',
  icon: '📚',
  summary: '栈队列链表树图、排序搜索、DP 贪心、高频手写题、正则表达式。',
  knowledgePointCount: 18,
  visualizationCount: 14,
  points: [
    // ========================================================================
    // 知识点 1：栈与队列
    // ========================================================================
    {
      order: 1,
      title: '栈与队列',
      difficulty: 2,
      visualizationType: 'stack-queue-visualizer',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: '栈（Stack）是后进先出（LIFO）的数据结构，队列（Queue）是先进先出（FIFO）。它们在前端有广泛应用：函数调用栈、撤销重做、事件循环任务队列、并发池控制等。',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'stack-queue-visualizer',
          data: {},
        },
        {
          id: 'p1-3',
          type: 'code',
          language: 'javascript',
          filename: 'Stack & Queue 实现',
          code: `// 栈：后进先出（LIFO）
class Stack {
  constructor() { this.items = []; }
  push(x) { this.items.push(x); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  get size() { return this.items.length; }
}

// 队列：先进先出（FIFO）—— 对象索引优化 O(1) dequeue
class Queue {
  constructor() { this.items = {}; this.head = 0; this.tail = 0; }
  enqueue(x) { this.items[this.tail++] = x; }
  dequeue() {
    if (this.head === this.tail) return undefined;
    const v = this.items[this.head];
    delete this.items[this.head++];
    return v;
  }
  get size() { return this.tail - this.head; }
}`,
        },
        {
          id: 'p1-4',
          type: 'callout',
          variant: 'tip',
          title: '前端应用场景',
          text: '栈：函数调用栈、括号匹配、表达式求值、撤销操作（undo stack）、浏览器后退。队列：事件循环任务队列、消息队列、Promise.then 回调、请求并发池控制。',
        },
        {
          id: 'p1-5',
          type: 'demo',
          visualizationType: 'lru-cache-simulator',
          data: { capacity: 3 },
        },
        {
          id: 'p1-6',
          type: 'code',
          language: 'javascript',
          filename: 'LRU 缓存实现（Map 插入序）',
          code: `// LRU 缓存：利用 Map 的插入顺序特性
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val); // 刷新为"最近使用"
    return val;
  }
  put(key, val) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, val);
    if (this.cache.size > this.capacity) {
      // keys().next().value 是最久未使用的
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 2：链表
    // ========================================================================
    {
      order: 2,
      title: '链表（单链表 / 双向链表 / 循环链表）',
      difficulty: 3,
      visualizationType: 'linked-list-stepper',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          lead: true,
          text: '链表是通过指针连接节点的线性数据结构。单链表每个节点指向下一个节点，双向链表可前后遍历，循环链表尾节点指向头节点。React Fiber 架构就是基于链表实现的。',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'linked-list-stepper',
          data: {
            reverseList: [1, 2, 3, 4, 5],
            cycleList: { values: [1, 2, 3, 4, 5, 6], cycleAt: 2 },
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'javascript',
          filename: '反转链表（三指针）+ 环形检测（Floyd）',
          code: `// 反转链表：prev / curr / next 三指针
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next; // 暂存 next
    curr.next = prev;       // 反转指向
    prev = curr;            // prev 前进
    curr = next;            // curr 前进
  }
  return prev; // 新头节点
}

// 环形检测：快慢指针（Floyd 判圈算法）
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;        // 慢指针走 1 步
    fast = fast.next.next;   // 快指针走 2 步
    if (slow === fast) return true; // 相遇则有环
  }
  return false;
}`,
        },
        {
          id: 'p2-4',
          type: 'callout',
          variant: 'info',
          title: 'React Fiber 与链表',
          text: 'React Fiber 节点通过 child / sibling / return 三个指针形成链表结构，使得渲染过程可中断、可恢复。理解链表是理解 Fiber 架构的基础。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：树与二叉树
    // ========================================================================
    {
      order: 3,
      title: '树与二叉树（遍历 / BST / 堆）',
      difficulty: 4,
      visualizationType: 'binary-tree-walker',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: '树是层次化的数据结构。二叉树每个节点最多两个子节点。四种遍历方式：前序（根→左→右）、中序（左→根→右）、后序（左→右→根）、层序（BFS）。DOM 树、组件树、路由树都是树结构。',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'binary-tree-walker',
          data: {
            tree: {
              val: 1,
              left: { val: 2, left: { val: 4 }, right: { val: 5 } },
              right: { val: 3, left: { val: 6 }, right: { val: 7 } },
            },
          },
        },
        {
          id: 'p3-3',
          type: 'code',
          language: 'javascript',
          filename: '二叉树四种遍历',
          code: `// 前序遍历（根→左→右）—— 递归
function preorder(node, result = []) {
  if (!node) return result;
  result.push(node.val);
  preorder(node.left, result);
  preorder(node.right, result);
  return result;
}

// 中序遍历（左→根→右）—— BST 中序得到有序序列
function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left, result);
  result.push(node.val);
  inorder(node.right, result);
  return result;
}

// 层序遍历（BFS）—— 队列实现
function levelorder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`,
        },
        {
          id: 'p3-4',
          type: 'callout',
          variant: 'tip',
          title: '前端应用',
          text: 'DOM 树遍历（querySelectorAll）、Virtual DOM diff（树的同层比较）、React Fiber 树的深度优先遍历、路由配置树。理解树遍历是理解框架底层的关键。',
        },
      ],
    },

    // ========================================================================
    // 知识点 4：图的基础概念
    // ========================================================================
    {
      order: 4,
      title: '图的基础概念',
      difficulty: 4,
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: '图由顶点（Vertex）和边（Edge）组成，分为有向图和无向图。表示方法有邻接矩阵和邻接表。图的遍历有 DFS（深度优先）和 BFS（广度优先），BFS 可求无权图最短路径。',
        },
        {
          id: 'p4-2',
          type: 'code',
          language: 'javascript',
          filename: '邻接表 + DFS/BFS',
          code: `// 邻接表表示图
class Graph {
  constructor() { this.adj = new Map(); }
  addEdge(v, w) {
    if (!this.adj.has(v)) this.adj.set(v, []);
    if (!this.adj.has(w)) this.adj.set(w, []);
    this.adj.get(v).push(w);
    this.adj.get(w).push(v); // 无向图
  }

  // DFS 深度优先（递归）
  dfs(start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    for (const neighbor of this.adj.get(start) || []) {
      if (!visited.has(neighbor)) this.dfs(neighbor, visited);
    }
  }

  // BFS 广度优先（队列）—— 可求最短路径
  bfs(start) {
    const visited = new Set([start]);
    const queue = [start];
    while (queue.length) {
      const v = queue.shift();
      console.log(v);
      for (const n of this.adj.get(v) || []) {
        if (!visited.has(n)) { visited.add(n); queue.push(n); }
      }
    }
  }
}`,
        },
        {
          id: 'p4-3',
          type: 'callout',
          variant: 'info',
          title: '前端图应用',
          text: '依赖关系分析（Webpack 模块依赖图）、社交网络关系、路由可达性分析、Monorepo 包依赖拓扑排序。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：哈希表
    // ========================================================================
    {
      order: 5,
      title: '哈希表',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: '哈希表通过哈希函数将键映射到存储位置，实现 O(1) 的增删改查。JavaScript 中对象和 Map 都是哈希表的实现，但有重要差异。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['Object', 'Map'],
            highlightColumn: 1,
            rows: [
              { feature: '键类型', values: ['仅 String/Symbol', '任意类型（含对象/函数）'] },
              { feature: '键顺序', values: ['不完全保证', '插入顺序（FIFO）'] },
              { feature: '大小获取', values: ['Object.keys().length', 'map.size'] },
              { feature: '迭代方式', values: ['需 Object.keys/entries', '可直接 for...of'] },
              { feature: '性能（频繁增删）', values: ['较差', '更优'] },
              { feature: 'JSON 序列化', values: ['支持', '不支持（需转换）'] },
              { feature: '原型链污染', values: ['有风险（__proto__）', '无'] },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'callout',
          variant: 'warning',
          title: '[object Object] 陷阱',
          text: '用对象作为普通对象的键时，会被 toString 为 "[object Object]"，导致所有对象键覆盖为同一个。应使用 Map 避免此问题。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：数据结构对比
    // ========================================================================
    {
      order: 6,
      title: '数据结构对比',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: '不同数据结构有不同的时间复杂度特征，选对数据结构是写出高效代码的前提。以下是核心数据结构的操作复杂度对比。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '操作',
            columns: ['数组', '链表', '哈希表', '栈/队列'],
            rows: [
              { feature: '访问（按索引）', values: ['O(1)', 'O(n)', '—', '—'] },
              { feature: '查找', values: ['O(n)', 'O(n)', 'O(1)', 'O(n)'] },
              { feature: '插入（头部）', values: ['O(n)', 'O(1)', 'O(1)', '—'] },
              { feature: '插入（尾部）', values: ['O(1)', 'O(1)', 'O(1)', 'O(1)'] },
              { feature: '删除', values: ['O(n)', 'O(1)', 'O(1)', 'O(1)'] },
              { feature: '内存占用', values: ['连续', '分散+指针', '分散+哈希', '取决于实现'] },
              { feature: '缓存友好度', values: ['高', '低', '中', '中'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 7：排序算法
    // ========================================================================
    {
      order: 7,
      title: '排序算法（冒泡 / 选择 / 插入 / 快排 / 归并 / 堆排）',
      difficulty: 3,
      visualizationType: 'sorting-race-arena',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: '排序是算法学习的入门经典。冒泡/选择/插入为 O(n²) 简单排序，快排/归并/堆排为 O(n log n) 高效排序。V8 的 Array.prototype.sort 在小数组用插入排序，大数组用 TimSort（归并+插入的混合）。',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'sorting-race-arena',
          data: { arraySize: 24, algorithms: ['bubble', 'quick', 'merge', 'counting'] },
        },
        {
          id: 'p7-3',
          type: 'code',
          language: 'javascript',
          filename: '快速排序 + 归并排序',
          code: `// 快速排序：分治 + 分区
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.slice(0, -1).filter(x => x < pivot);
  const right = arr.slice(0, -1).filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 归并排序：分治 + 合并（稳定排序）
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  // 合并两个有序数组
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
        },
        {
          id: 'p7-4',
          type: 'callout',
          variant: 'tip',
          title: '稳定性与选择建议',
          text: '稳定排序：冒泡、插入、归并。不稳定排序：选择、快排、堆排。需要稳定排序时选归并；一般场景选快排（平均最快）；内存受限选堆排（O(1) 空间）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 8：搜索算法（二分 / DFS / BFS）
    // ========================================================================
    {
      order: 8,
      title: '搜索算法（二分 / DFS / BFS）',
      difficulty: 3,
      visualizationType: 'bfs-path-finder',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: '二分查找要求数组有序，时间复杂度 O(log n)。BFS 用队列逐层搜索，适合求最短路径。DFS 用栈/递归深度搜索，适合穷举所有路径。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'bfs-path-finder',
          data: { gridSize: 10, obstacleDensity: 0.2 },
        },
        {
          id: 'p8-3',
          type: 'code',
          language: 'javascript',
          filename: '二分查找（防溢出写法）',
          code: `// 二分查找：left + (right - left) / 2 防止整数溢出
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1); // 位运算防溢出
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// BFS 最短路径（无权图）
function bfsShortestPath(graph, start, end) {
  const queue = [[start]];
  const visited = new Set([start]);
  while (queue.length) {
    const path = queue.shift();
    const node = path[path.length - 1];
    if (node === end) return path;
    for (const next of graph[node] || []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([...path, next]);
      }
    }
  }
  return null;
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 9：双指针 / 滑动窗口
    // ========================================================================
    {
      order: 9,
      title: '双指针 / 滑动窗口',
      difficulty: 3,
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: '双指针用两个指针协同遍历，常见有对撞指针（两端向中间）和快慢指针（同向不同速）。滑动窗口是双指针的变种，维护一个窗口在数组上滑动，适合子串/子数组问题。',
        },
        {
          id: 'p9-2',
          type: 'code',
          language: 'javascript',
          filename: '双指针 + 滑动窗口经典题',
          code: `// 两数之和（有序数组）—— 对撞指针
function twoSum(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}

// 无重复字符的最长子串 —— 滑动窗口
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left++]); // 收缩窗口
    }
    set.add(s[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}`,
        },
        {
          id: 'p9-3',
          type: 'callout',
          variant: 'tip',
          title: '滑动窗口模板',
          text: '滑动窗口核心：右指针扩张窗口直到不满足条件，左指针收缩窗口直到重新满足。用 Set/Map 维护窗口内元素，时间复杂度 O(n)。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：回溯算法
    // ========================================================================
    {
      order: 10,
      title: '回溯算法',
      difficulty: 4,
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: '回溯是 DFS 的应用，通过「选择→递归→撤销」穷举所有可能解。核心思想：在每一步做出选择，递归探索，如果发现不可行则撤销选择回退。适合排列、组合、子集、N 皇后等问题。',
        },
        {
          id: 'p10-2',
          type: 'code',
          language: 'javascript',
          filename: '全排列 + N 皇后',
          code: `// 全排列 —— 经典回溯
function permute(nums) {
  const result = [], path = [], used = new Array(nums.length).fill(false);
  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]); // 找到一个排列
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      path.push(nums[i]);     // 做选择
      used[i] = true;
      backtrack();            // 递归
      path.pop();             // 撤销选择
      used[i] = false;
    }
  }
  backtrack();
  return result;
}

// 回溯模板
function backtrack(path, choices) {
  if (满足结束条件) {
    result.push([...path]);
    return;
  }
  for (const choice of choices) {
    做选择;     // path.push(choice)
    backtrack(path, 新的choices);
    撤销选择;   // path.pop()
  }
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 11：动态规划
    // ========================================================================
    {
      order: 11,
      title: '动态规划',
      difficulty: 5,
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: '动态规划（DP）将问题分解为重叠子问题，通过状态转移方程递推求解。核心要素：状态定义、状态转移方程、初始条件、边界条件。适合最优化问题（最大值/最小值/方案数）。',
        },
        {
          id: 'p11-2',
          type: 'code',
          language: 'javascript',
          filename: 'DP 经典：爬楼梯 + 最长递增子序列',
          code: `// 爬楼梯 —— 一维 DP
function climbStairs(n) {
  if (n <= 2) return n;
  const dp = [1, 2];
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // 状态转移
  }
  return dp[n - 1];
}

// 最长递增子序列（LIS）—— O(n²) DP
function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}

// 0-1 背包 —— 二维 DP
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]; // 不选第 i 个
      if (w >= weights[i - 1]) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}`,
        },
        {
          id: 'p11-3',
          type: 'callout',
          variant: 'tip',
          title: 'DP 解题步骤',
          text: '1. 定义状态（dp[i] 的含义）2. 写出状态转移方程 3. 确定初始条件和边界 4. 确定计算顺序（自底向上）5. 可选：空间优化（滚动数组）',
        },
      ],
    },

    // ========================================================================
    // 知识点 12：贪心 / 分治 / 位运算
    // ========================================================================
    {
      order: 12,
      title: '贪心 / 分治 / 位运算',
      difficulty: 4,
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: '贪心算法每步选当前最优解，不保证全局最优但高效。分治将问题分解为独立子问题分别求解再合并（归并排序）。位运算直接操作二进制位，常用于状态压缩和性能优化。',
        },
        {
          id: 'p12-2',
          type: 'code',
          language: 'javascript',
          filename: '贪心 + 分治 + 位运算',
          code: `// 贪心：找零钱（适用特定币种）
function coinChange(coins, amount) {
  coins.sort((a, b) => b - a); // 从大到小
  let count = 0;
  for (const coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      count++;
    }
  }
  return amount === 0 ? count : -1;
}

// 分治：最大子数组和
function maxSubArray(nums) {
  function divide(left, right) {
    if (left === right) return nums[left];
    const mid = (left + right) >> 1;
    const leftMax = divide(left, mid);
    const rightMax = divide(mid + 1, right);
    // 跨中点的最大和
    let lSum = 0, lMax = -Infinity, rSum = 0, rMax = -Infinity;
    for (let i = mid; i >= left; i--) { lSum += nums[i]; lMax = Math.max(lMax, lSum); }
    for (let i = mid + 1; i <= right; i++) { rSum += nums[i]; rMax = Math.max(rMax, rSum); }
    return Math.max(leftMax, rightMax, lMax + rMax);
  }
  return divide(0, nums.length - 1);
}

// 位运算：判断 2 的幂
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0; // 2 的幂只有一个 1
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 13：算法思想对比
    // ========================================================================
    {
      order: 13,
      title: '算法思想对比',
      difficulty: 3,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: '分治、贪心、DP、回溯是四大算法思想，各有适用场景。理解它们的异同是面试高频考点。',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: '四大算法思想对比',
            flowDirection: 'top-down',
            layers: [
              {
                name: '分治（Divide & Conquer）',
                description: '将问题分解为独立子问题，分别求解后合并',
                components: [
                  { name: '适用场景', description: '子问题独立（归并排序、快速排序）' },
                  { name: '时间复杂度', description: 'O(n log n) 典型' },
                  { name: '代表问题', description: '归并排序、快速幂、最近点对' },
                ],
              },
              {
                name: '贪心（Greedy）',
                description: '每步选局部最优，期望得到全局最优',
                components: [
                  { name: '适用场景', description: '问题有贪心选择性质' },
                  { name: '时间复杂度', description: 'O(n log n)（排序+贪心）' },
                  { name: '代表问题', description: 'Huffman 编码、最小生成树、跳跃游戏' },
                ],
              },
              {
                name: '动态规划（DP）',
                description: '将问题分解为重叠子问题，记忆化避免重复计算',
                components: [
                  { name: '适用场景', description: '子问题重叠 + 最优子结构' },
                  { name: '时间复杂度', description: 'O(n²) / O(n × m) 典型' },
                  { name: '代表问题', description: '背包、LIS、编辑距离、最长公共子序列' },
                ],
              },
              {
                name: '回溯（Backtracking）',
                description: 'DFS 穷举所有可能，不满足时撤销回退',
                components: [
                  { name: '适用场景', description: '求所有解 / 排列组合' },
                  { name: '时间复杂度', description: 'O(2ⁿ) / O(n!) 指数级' },
                  { name: '代表问题', description: '全排列、N 皇后、子集、组合总和' },
                ],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 14：高频手写题
    // ========================================================================
    {
      order: 14,
      title: '高频手写题（防抖 / 节流 / 深拷贝 / Promise / 发布订阅 / 虚拟列表）',
      difficulty: 3,
      visualizationType: 'handwriting-challenge',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: '前端面试手写题覆盖并发控制、深拷贝、发布订阅等高频考点。关键在于边界条件处理：空值、循环引用、并发竞态。',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'handwriting-challenge',
          data: {
            problems: [
              {
                id: 'promise-concurrency',
                title: 'Promise 并发控制',
                description: '实现一个并发限制函数，最多同时执行 limit 个异步任务，完成一个补一个，最终返回所有结果。',
                testCases: [
                  { label: '正常场景', input: 'limitConcurrency([task1, task2, task3, task4, task5], 2)', expected: '所有任务结果按原始顺序返回，任意时刻最多 2 个任务执行' },
                  { label: '空数组', input: 'limitConcurrency([], 3)', expected: '立即返回 []' },
                  { label: 'limit=1', input: 'limitConcurrency([task1, task2, task3], 1)', expected: '串行执行，按顺序返回' },
                  { label: 'limit >= tasks.length', input: 'limitConcurrency([task1, task2], 5)', expected: '全部并行执行' },
                ],
                solution: `async function limitConcurrency(tasks, limit) {
  const results = new Array(tasks.length);
  const executing = new Set();
  let index = 0;

  async function run(i) {
    results[i] = await tasks[i]();
  }

  for (let i = 0; i < tasks.length; i++) {
    const promise = run(i);
    executing.add(promise);
    promise.finally(() => executing.delete(promise));

    if (executing.size >= limit) {
      await Promise.race(executing); // 等最快完成的
    }
  }
  await Promise.all(executing); // 等待剩余
  return results;
}`,
                keyPoints: ['Set 追踪执行中的 Promise', 'Promise.race 等最快完成', 'finally 清理已完成', '保持结果顺序'],
              },
              {
                id: 'deep-clone',
                title: '深拷贝',
                description: '实现一个深拷贝函数，处理对象、数组、日期、正则、循环引用，支持特殊对象类型。',
                testCases: [
                  { label: '普通对象', input: 'deepClone({ a: 1, b: { c: 2 } })', expected: '深拷贝，修改副本不影响原对象' },
                  { label: '循环引用', input: 'const obj = { a: 1 }; obj.self = obj; deepClone(obj)', expected: '不报栈溢出，clone.self === clone' },
                  { label: '日期对象', input: 'deepClone(new Date("2024-01-01"))', expected: '返回新的 Date 实例，值相同' },
                  { label: '数组', input: 'deepClone([1, [2, [3]]])', expected: '返回新数组，嵌套结构完整拷贝' },
                ],
                solution: `function deepClone(obj, cache = new WeakMap()) {
  // 基本类型和 null/undefined
  if (obj === null || typeof obj !== 'object') return obj;
  // 循环引用检测
  if (cache.has(obj)) return cache.get(obj);
  // 日期
  if (obj instanceof Date) return new Date(obj.getTime());
  // 正则
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  // 数组或对象
  const clone = Array.isArray(obj) ? [] : {};
  cache.set(obj, clone); // 先缓存再递归（防循环引用）
  for (const key of Reflect.ownKeys(obj)) {
    clone[key] = deepClone(obj[key], cache);
  }
  return clone;
}`,
                keyPoints: ['WeakMap 解决循环引用', '处理 Date/RegExp 特殊对象', '先缓存再递归', 'Reflect.ownKeys 含 Symbol'],
              },
              {
                id: 'event-emitter',
                title: 'EventEmitter 发布订阅',
                description: '实现一个事件发射器，支持 on/emit/off/once 方法。注意 off 时遍历副本防止索引错乱。',
                testCases: [
                  { label: '基本订阅', input: 'const ee = new EventEmitter(); ee.on("test", fn); ee.emit("test", data)', expected: 'fn 被调用，接收 data 参数' },
                  { label: 'once 只触发一次', input: 'ee.once("test", fn); ee.emit("test"); ee.emit("test")', expected: 'fn 只被调用一次' },
                  { label: 'off 取消订阅', input: 'ee.on("test", fn); ee.off("test", fn); ee.emit("test")', expected: 'fn 不被调用' },
                  { label: '多次 emit', input: 'ee.on("test", fn); ee.emit("test"); ee.emit("test")', expected: 'fn 被调用 2 次' },
                ],
                solution: `class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(event, fn) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(fn);
    return () => this.off(event, fn); // 返回取消订阅函数
  }
  once(event, fn) {
    const wrapper = (...args) => {
      fn(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
  emit(event, ...args) {
    const fns = this.events.get(event);
    if (!fns) return;
    // 遍历副本，防止 once 内部 off 导致索引错乱
    [...fns].forEach(fn => fn(...args));
  }
  off(event, fn) {
    const fns = this.events.get(event);
    if (!fns) return;
    this.events.set(event, fns.filter(f => f !== fn));
  }
}`,
                keyPoints: ['Map 存储事件回调', 'once 用 wrapper 包装后 off', 'emit 遍历副本防索引错乱', 'on 返回取消函数'],
              },
              {
                id: 'array-flatten',
                title: '数组扁平化 + 去重',
                description: '将嵌套数组扁平化为一维，并去重排序。',
                testCases: [
                  { label: '基本扁平化', input: 'flattenUnique([1, [2, [3, 4]], 2])', expected: '[1, 2, 3, 4]' },
                  { label: '多层嵌套', input: 'flattenUnique([1, [2, [3, [4, [5]]]]])', expected: '[1, 2, 3, 4, 5]' },
                  { label: '空数组', input: 'flattenUnique([])', expected: '[]' },
                  { label: '全相同', input: 'flattenUnique([1, 1, [1, [1]]])', expected: '[1]' },
                ],
                solution: `function flattenUnique(arr) {
  // 递归扁平化
  const flat = arr.reduce((acc, val) =>
    acc.concat(Array.isArray(val) ? flattenUnique(val) : val), []);
  // 去重 + 排序
  return [...new Set(flat)].sort((a, b) => a - b);
}

// 迭代写法（用栈）
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  return result;
}`,
                keyPoints: ['reduce 递归扁平化', 'Set 去重', 'sort 排序', '迭代写法用栈防栈溢出'],
              },
              {
                id: 'list-to-tree',
                title: '列表转树结构',
                description: '将扁平的列表（带 id 和 parentId）转换为树形结构，要求 O(n) 时间复杂度。',
                testCases: [
                  { label: '基本转换', input: 'listToTree([{id:1,parentId:0},{id:2,parentId:1}])', expected: '[{id:1, children:[{id:2}]}]' },
                  { label: '多根节点', input: 'listToTree([{id:1,parentId:0},{id:2,parentId:0}])', expected: '两个根节点的树数组' },
                  { label: '空列表', input: 'listToTree([])', expected: '[]' },
                  { label: '深层嵌套', input: '3 层嵌套列表', expected: '正确构建 3 层 children' },
                ],
                solution: `function listToTree(items, rootId = 0) {
  const map = new Map(); // id -> node（带 children）
  const result = [];

  // 第一遍：建立 id -> node 映射
  for (const item of items) {
    map.set(item.id, { ...item, children: [] });
  }

  // 第二遍：根据 parentId 挂载到父节点的 children
  for (const item of items) {
    const node = map.get(item.id);
    if (item.parentId === rootId) {
      result.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) parent.children.push(node);
    }
  }
  return result;
}`,
                keyPoints: ['Map 索引实现 O(n)', '两遍遍历：先建映射再挂载', 'rootId 判断根节点', '处理孤儿节点'],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 15：手写题分类汇总
    // ========================================================================
    {
      order: 15,
      title: '手写题分类汇总',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: '前端高频手写题按类别整理，涵盖函数增强、异步控制、数据处理、DOM 操作四大类。',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: false,
            defaultOpen: [0],
            items: [
              {
                title: '函数增强类（防抖 / 节流 / 柯里化）',
                content: '防抖：n 秒后再执行，n 秒内再次触发则重新计时。节流：n 秒内只执行一次。柯里化：将多参数函数转为逐个接收参数的函数链。',
                code: `// 防抖：延迟执行，重复触发重新计时
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流：固定频率执行
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}`,
                codeLanguage: 'javascript',
              },
              {
                title: '异步控制类（Promise / 并发 / 重试）',
                content: 'Promise.all / race / allSettled 实现，并发控制，请求重试，超时处理。',
                code: `// Promise.all：全部成功才成功
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val;
        if (++count === promises.length) resolve(results);
      }, reject);
    });
  });
};`,
                codeLanguage: 'javascript',
              },
              {
                title: '数据处理类（深拷贝 / 扁平化 / 去重）',
                content: '深拷贝（循环引用）、数组扁平化、对象合并、深比较 isEqual。',
                code: `// 深比较
function isEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object' || a === null || b === null) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(k => isEqual(a[k], b[k]));
}`,
                codeLanguage: 'javascript',
              },
              {
                title: 'DOM 操作类（虚拟列表 / 懒加载 / 事件委托）',
                content: '虚拟列表（可视区域渲染）、图片懒加载（IntersectionObserver）、事件委托。',
                code: `// 事件委托
document.querySelector('#list').addEventListener('click', (e) => {
  const item = e.target.closest('.item');
  if (item) {
    console.log('clicked:', item.dataset.id);
  }
});`,
                codeLanguage: 'javascript',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 16：正则表达式
    // ========================================================================
    {
      order: 16,
      title: '正则表达式',
      difficulty: 3,
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: '正则表达式是文本处理的利器。掌握元字符、量词、分组、零宽断言、贪婪/非贪婪匹配，能解决邮箱验证、URL 解析、模板替换等问题。',
        },
        {
          id: 'p16-2',
          type: 'code',
          language: 'javascript',
          filename: '常用正则表达式',
          code: `// 邮箱
const email = /^[\\w.-]+@[\\w-]+(\\.[\\w-]+)+$/

// 手机号
const phone = /^1[3-9]\\d{9}$/

// URL
const url = /^https?:\\/\\/[\\w.-]+(:\\d+)?(\\/[\\w./?%&=-]*)?$/

// 身份证（18位）
const idCard = /^\\d{17}[\\dXx]$/

// 替换：驼峰转下划线
'camelCase'.replace(/([A-Z])/g, '_$1').toLowerCase() // "camel_case"

// 匹配：提取所有数字
'abc123def456'.match(/\\d+/g) // ["123", "456"]

// 零宽断言：匹配 price 后面的数字
'price: 100'.match(/(?<=price:\\s)\\d+/) // ["100"]`,
        },
        {
          id: 'p16-3',
          type: 'callout',
          variant: 'tip',
          title: '贪婪 vs 非贪婪',
          text: '默认贪婪（尽可能多匹配），加 ? 变非贪婪（尽可能少匹配）。如 "aaaa".match(/a+/) 得到 "aaaa"，而 /a+?/ 得到 "a"。',
        },
      ],
    },

    // ========================================================================
    // 知识点 17：算法学习路径
    // ========================================================================
    {
      order: 17,
      title: '算法学习路径',
      difficulty: 1,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: '前端算法学习不必追求 ACM 难度，聚焦面试高频题型即可。以下是由浅入深的学习路径建议。',
        },
        {
          id: 'p17-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '阶段 1', title: '数据结构基础', description: '数组、链表、栈、队列、哈希表的操作和复杂度', status: 'done' },
              { time: '阶段 2', title: '排序与搜索', description: '冒泡/快排/归并排序，二分查找，DFS/BFS 遍历', status: 'done' },
              { time: '阶段 3', title: '树与图', description: '二叉树遍历、BST、堆、图的邻接表表示和遍历', status: 'active' },
              { time: '阶段 4', title: '算法思想', description: '双指针、滑动窗口、回溯、贪心、分治、动态规划', status: 'pending' },
              { time: '阶段 5', title: '高频手写题', description: '防抖节流、深拷贝、Promise 并发、发布订阅、虚拟列表', status: 'pending' },
              { time: '阶段 6', title: '面试实战', description: 'LeetCode 热题 100，按类型刷题，总结模板和套路', status: 'pending' },
            ],
          },
        },
        {
          id: 'p17-3',
          type: 'callout',
          variant: 'tip',
          title: '学习建议',
          text: '前端面试算法题以 Easy-Medium 为主。重点掌握：数组操作、字符串处理、树遍历、DP 基础、手写题。每道题先理解再默写，注意边界条件。',
        },
      ],
    },

    // ========================================================================
    // 知识点 18：算法测验
    // ========================================================================
    {
      order: 18,
      title: '算法测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: '通过 10 道精选测验题检验对数据结构与算法的掌握程度，覆盖栈队列、LRU、链表、树遍历、Map、排序、二分、BFS、深拷贝、EventEmitter。',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '栈和队列的主要区别是什么？',
                options: ['栈是 LIFO，队列是 FIFO', '栈是 FIFO，队列是 LIFO', '两者都是 LIFO', '两者都是 FIFO'],
                correctIndex: 0,
                explanation: '栈（Stack）后进先出 LIFO，队列（Queue）先进先出 FIFO。栈的 push/pop 操作同一端，队列的 enqueue/dequeue 操作不同端。',
              },
              {
                question: 'LRU 缓存利用了 JavaScript Map 的什么特性？',
                options: ['Map 的键可以是任意类型', 'Map 保持键的插入顺序', 'Map 的查找是 O(1)', 'Map 支持 for...of 迭代'],
                correctIndex: 1,
                explanation: 'LRU 需要淘汰"最久未使用"的元素。Map 保持插入顺序，keys().next().value 返回最早插入的键。get 时先 delete 再 set 即可刷新到"最近使用"。',
              },
              {
                question: '反转链表需要几个指针？',
                options: ['1 个（curr）', '2 个（curr 和 next）', '3 个（prev、curr、next）', '4 个'],
                correctIndex: 2,
                explanation: '反转链表需要 prev（已反转部分的头）、curr（当前处理节点）、next（暂存下一个节点）三个指针。每步：保存 next → curr.next 指向 prev → prev/curr 前进。',
              },
              {
                question: '二叉树的中序遍历顺序是？',
                options: ['根→左→右', '左→根→右', '左→右→根', '层序逐层'],
                correctIndex: 1,
                explanation: '中序遍历：左子树→根节点→右子树。BST（二叉搜索树）的中序遍历结果是有序序列，这是 BST 的重要性质。',
              },
              {
                question: '关于 Object 和 Map 的区别，以下哪个是错误的？',
                options: ['Map 的键可以是任意类型', 'Map 保持插入顺序', 'Map 的 size 属性获取大小', 'Object 的键可以是任意类型'],
                correctIndex: 3,
                explanation: 'Object 的键只能是 String 或 Symbol，其他类型会被 toString 转换。Map 的键可以是任意类型（包括对象、函数）。这是 Map 相比 Object 的重要优势。',
              },
              {
                question: '快速排序的平均时间复杂度是？',
                options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
                correctIndex: 1,
                explanation: '快速排序平均时间复杂度 O(n log n)，最坏情况 O(n²)（已排序数组+取最后元素为 pivot）。空间复杂度 O(log n)（递归栈）。不稳定排序。',
              },
              {
                question: '二分查找的前提条件是什么？',
                options: ['数组长度为偶数', '数组必须有序', '数组元素为整数', '数组无重复元素'],
                correctIndex: 1,
                explanation: '二分查找要求数组有序。每次比较中间元素，将搜索范围缩小一半，时间复杂度 O(log n)。注意 mid = left + (right - left) / 2 防止整数溢出。',
              },
              {
                question: 'BFS（广度优先搜索）通常使用什么数据结构？',
                options: ['栈', '队列', '堆', '哈希表'],
                correctIndex: 1,
                explanation: 'BFS 使用队列实现，逐层扩展。从起点出发，将邻居入队，出队时访问并继续扩展。BFS 可求无权图的最短路径（首次到达即最短）。',
              },
              {
                question: '深拷贝解决循环引用的关键是？',
                options: ['使用 JSON.parse(JSON.stringify)', '使用 WeakMap 缓存已拷贝对象', '限制递归深度', '使用 try-catch'],
                correctIndex: 1,
                explanation: '深拷贝遇到循环引用（obj.self = obj）时，递归会无限循环栈溢出。用 WeakMap 缓存已拷贝的对象，递归前检查是否已拷贝，已拷贝则直接返回缓存引用。',
              },
              {
                question: 'EventEmitter 的 emit 方法为什么要遍历回调数组的副本？',
                options: ['提高性能', '防止 once 回调 off 时索引错乱', '支持异步执行', '避免内存泄漏'],
                correctIndex: 1,
                explanation: 'once 注册的回调在触发后会 off 自身。如果直接遍历原数组，遍历过程中 off 会修改数组长度/索引，导致跳过后续回调。遍历副本 [...fns] 可避免此问题。',
              },
            ],
          },
        },
      ],
    },
  ],
}
