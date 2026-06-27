/**
 * 模块 24：数据结构与前端算法
 *
 * 按「基础前置 → 核心数据结构 → 算法思想 → 前端专项 → 面试实战」分层递进编排：
 * - 30 个知识点（6 篇 + 速查 + 面试题 + 测验）
 * - 16 个可视化演示（7 算法专属组件 + 9 复用核心组件）
 *
 * 六篇结构：
 * - 第一篇 前置基础（KP2-KP3）：JS 底层认知 + 复杂度分析
 * - 第二篇 基础数据结构（KP4-KP6）：栈队列 / 链表 / 数组哈希
 * - 第三篇 进阶数据结构（KP7-KP11）：树 / 堆 / 图 / Trie / 并查集
 * - 第四篇 核心算法思想（KP12-KP19）：排序 / 查找 / 双指针 / 回溯 / 分治 / 贪心 / DP / 位运算
 * - 第五篇 前端专项算法（KP20-KP24）：手写题 / 浏览器渲染 / 框架算法 / 业务场景 / 字符串
 * - 第六篇 面试与实战（KP25-KP27）：刷题路线 / 答题方法论 / 易错点汇总
 *
 * 每个知识点统一遵循「核心原理 → 代码实现 → 复杂度分析 → 前端场景 → 边界易错 → 典型例题」结构。
 */
import type { ModuleMeta } from '../lib/types'

export const dataStructureAlgorithmModule: ModuleMeta = {
  number: '24',
  title: '数据结构与前端算法',
  slug: 'data-structure-algorithm',
  stage: 'interview',
  stageLabel: '面试冲刺 · 第 1 模块',
  icon: '24',
  summary: '栈队列链表树图堆、Trie 并查集、排序查找 DP 贪心回溯、前端手写题与框架算法原理。',
  knowledgePointCount: 30,
  visualizationCount: 16,
  points: [
    // ========================================================================
    // 知识点 1：数据结构与算法总览
    // ========================================================================
    {
      order: 1,
      title: '数据结构与算法总览',
      difficulty: 1,
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: '本模块按「基础前置 → 核心数据结构 → 算法思想 → 前端专项 → 面试实战」五层阶梯编排，每个知识点统一遵循「核心原理 → 代码实现 → 复杂度分析 → 前端场景 → 边界易错 → 典型例题」六步结构，深度绑定 JavaScript 语言特性与前端业务场景。',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'base', label: '前置基础', group: 'base', weight: 3 },
              { id: 'complexity', label: '复杂度分析', group: 'base', weight: 2 },
              { id: 'ds', label: '数据结构', group: 'ds', weight: 3 },
              { id: 'stack', label: '栈/队列', group: 'ds', weight: 2 },
              { id: 'linked', label: '链表', group: 'ds', weight: 2 },
              { id: 'hash', label: '哈希表', group: 'ds', weight: 2 },
              { id: 'tree', label: '树/堆', group: 'ds', weight: 2 },
              { id: 'graph', label: '图/Trie/并查集', group: 'ds', weight: 2 },
              { id: 'algo', label: '算法思想', group: 'algo', weight: 3 },
              { id: 'sort', label: '排序/查找', group: 'algo', weight: 2 },
              { id: 'dp', label: 'DP/贪心/回溯', group: 'algo', weight: 2 },
              { id: 'fe', label: '前端专项', group: 'fe', weight: 3 },
              { id: 'handwrite', label: '手写题', group: 'fe', weight: 2 },
              { id: 'framework', label: '框架算法', group: 'fe', weight: 2 },
              { id: 'interview', label: '面试实战', group: 'fe', weight: 2 },
            ],
            edges: [
              { source: 'base', target: 'complexity' },
              { source: 'base', target: 'ds' },
              { source: 'ds', target: 'stack' },
              { source: 'ds', target: 'linked' },
              { source: 'ds', target: 'hash' },
              { source: 'ds', target: 'tree' },
              { source: 'ds', target: 'graph' },
              { source: 'ds', target: 'algo' },
              { source: 'algo', target: 'sort' },
              { source: 'algo', target: 'dp' },
              { source: 'algo', target: 'fe' },
              { source: 'fe', target: 'handwrite' },
              { source: 'fe', target: 'framework' },
              { source: 'fe', target: 'interview' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'callout',
          variant: 'tip',
          title: '学习路线建议',
          text: '按篇顺序学习：先打牢复杂度分析基础（决定你能否评估解法优劣），再掌握核心数据结构（这是所有算法的载体），然后逐个攻克算法思想，最后回到前端场景把通用算法焊到业务里。每篇配套典型例题，形成「学 → 练 → 面」闭环。',
        },
      ],
    },

    // ========================================================================
    // 第一篇：前置基础篇
    // ========================================================================

    // ------------------------------------------------------------------------
    // 知识点 2：JavaScript 底层认知基础
    // ------------------------------------------------------------------------
    {
      order: 2,
      title: 'JavaScript 底层认知基础',
      difficulty: 1,
      isNew: true,
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          lead: true,
          text: '理解数据结构前，先搞清 JS 的内存模型与调用栈运行逻辑——这决定了为什么 shift/unshift 慢、为什么递归会爆栈、为什么引用类型赋值会互相影响。',
        },
        {
          id: 'p2-2',
          type: 'heading',
          level: 3,
          text: '内存模型：栈内存 vs 堆内存',
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'javascript',
          filename: '值类型 vs 引用类型的存储差异',
          code: `// 值类型（primitive）：存在栈内存，赋值是拷贝
let a = 10
let b = a
b = 20
console.log(a) // 10 —— 互不影响

// 引用类型（reference）：对象本体在堆，栈中存的是引用地址
let obj1 = { count: 1 }
let obj2 = obj1 // 拷贝的是地址，指向同一个堆对象
obj2.count = 99
console.log(obj1.count) // 99 —— 同一个对象！

// 数组也是引用类型
const arr1 = [1, 2, 3]
const arr2 = arr1
arr2.push(4)
console.log(arr1) // [1, 2, 3, 4]`,
        },
        {
          id: 'p2-4',
          type: 'heading',
          level: 3,
          text: '调用栈模型：执行上下文的栈式运行',
        },
        {
          id: 'p2-5',
          type: 'paragraph',
          text: 'JS 引擎用调用栈（Call Stack）管理执行上下文：每调用一个函数就压入一个栈帧，函数返回时弹出。作用域链也是栈式查找——内层作用域先找，找不到向外层找，直到全局。递归过深会导致栈溢出（Maximum call stack size exceeded），这是后续用迭代替代递归的根因。',
        },
        {
          id: 'p2-6',
          type: 'heading',
          level: 3,
          text: 'JS 数组特性与原生方法复杂度',
        },
        {
          id: 'p2-7',
          type: 'table',
          caption: 'JS 数组原生方法时间复杂度',
          headers: ['方法', '时间复杂度', '说明'],
          rows: [
            ['push / pop', 'O(1)', '尾部操作，不移动其它元素'],
            ['unshift / shift', 'O(n)', '头部操作，所有元素要移位'],
            ['splice', 'O(n)', '中间增删，后续元素移位'],
            ['slice', 'O(n)', '返回新数组，拷贝指定区间'],
            ['indexOf / includes', 'O(n)', '线性扫描'],
            ['sort', 'O(n log n)', 'V8 用 TimSort'],
          ],
        },
        {
          id: 'p2-8',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: 'shift/unshift 是 O(n)——大数组头部增删会卡顿，队列应用对象索引替代数组。引用类型赋值是地址拷贝，修改副本会影响原对象，深拷贝需递归或 structuredClone。const 声明数组仍可 push——const 冻结的是绑定不是值。',
        },
        {
          id: 'p2-9',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '函数调用栈溢出（递归爆栈）、深拷贝场景（引用类型地址共享）、数组性能优化（用对象索引实现 O(1) 队列）、React 状态更新不可变（新对象触发重渲染）。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 3：算法复杂度分析基础
    // ------------------------------------------------------------------------
    {
      order: 3,
      title: '算法复杂度分析基础',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: '复杂度分析是评估算法优劣的标尺。大 O 表示法描述输入规模 n 趋于无穷时，算法时间/空间增长的上界，忽略常数与低阶项。',
        },
        {
          id: 'p3-2',
          type: 'heading',
          level: 3,
          text: '大 O 表示法与常见复杂度',
        },
        {
          id: 'p3-3',
          type: 'table',
          caption: '常见时间复杂度排序（由快到慢）',
          headers: ['复杂度', '名称', '典型场景', 'n=10⁶ 时运算次数'],
          rows: [
            ['O(1)', '常数', '哈希表查找', '1'],
            ['O(log n)', '对数', '二分查找', '20'],
            ['O(n)', '线性', '数组遍历', '10⁶'],
            ['O(n log n)', '线性对数', '排序', '2×10⁷'],
            ['O(n²)', '平方', '冒泡排序', '10¹²（超时）'],
            ['O(2ⁿ)', '指数', '暴力递归', '天文数字'],
          ],
        },
        {
          id: 'p3-4',
          type: 'code',
          language: 'javascript',
          filename: '复杂度分析示例',
          code: `// O(1) — 与 n 无关
function access(arr, i) { return arr[i] }

// O(log n) — 每次折半
function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1
  while (l <= r) {
    const mid = (l + r) >> 1
    if (arr[mid] === target) return mid
    arr[mid] < target ? l = mid + 1 : r = mid - 1
  }
  return -1
}

// O(n) — 单层循环
function sum(arr) { return arr.reduce((a, b) => a + b, 0) }

// O(n²) — 嵌套循环
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length - i - 1; j++)
      if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
}

// O(2ⁿ) — 递归斐波那契（无记忆化）
function fib(n) { return n < 2 ? n : fib(n-1) + fib(n-2) }`,
        },
        {
          id: 'p3-5',
          type: 'heading',
          level: 3,
          text: '空间复杂度：递归栈与辅助空间',
        },
        {
          id: 'p3-6',
          type: 'paragraph',
          text: '空间复杂度计算额外使用的内存：递归深度就是栈空间 O(depth)，新建数组/哈希表是辅助空间。递归斐波那契空间 O(n)（栈深度），归并排序空间 O(n)（临时数组），原地快排空间 O(log n)（栈深度）。',
        },
        {
          id: 'p3-7',
          type: 'callout',
          variant: 'tip',
          title: '优化核心思路',
          text: '空间换时间：用哈希表缓存结果（记忆化搜索降 O(2ⁿ)→O(n)）。降维优化：二维 DP 压缩为一维滚动数组。双指针化简：嵌套循环 O(n²) 用对撞指针降到 O(n)。',
        },
        {
          id: 'p3-8',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '大 O 是上界不是精确值——O(2n) 和 O(n) 同阶。最差/平均/最优可能不同：快排最差 O(n²) 但平均 O(n log n)。面试时主动说清你分析的是哪种情况。',
        },
      ],
    },

    // ========================================================================
    // 第二篇：基础数据结构篇
    // ========================================================================

    // ------------------------------------------------------------------------
    // 知识点 4：栈与队列
    // ------------------------------------------------------------------------
    {
      order: 4,
      title: '栈与队列',
      difficulty: 2,
      visualizationType: 'stack-queue-visualizer',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: '栈（LIFO 后进先出）与队列（FIFO 先进先出）是最基础的两类线性结构，前端从函数调用栈到事件循环任务队列都离不开它们。',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'stack-queue-visualizer',
          data: {
            initialStack: [10, 20, 30],
            initialQueue: [1, 2, 3],
          },
        },
        {
          id: 'p4-3',
          type: 'code',
          language: 'javascript',
          filename: '栈与队列的高效实现',
          code: `// 栈：基于数组，push/pop 均为 O(1)
class Stack {
  #items = []
  push(x) { this.#items.push(x) }
  pop() { return this.#items.pop() }
  peek() { return this.#items[this.#items.length - 1] }
  isEmpty() { return this.#items.length === 0 }
}

// 队列：用对象索引而非数组，避免 shift() 的 O(n)
class Queue {
  #items = {}
  #head = 0
  #tail = 0
  enqueue(x) { this.#items[this.#tail++] = x }
  dequeue() {
    if (this.#head === this.#tail) return undefined
    const v = this.#items[this.#head]
    delete this.#items[this.#head++]
    return v
  }
  isEmpty() { return this.#head === this.#tail }
}

// 单调栈模板：求下一个更大元素
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1)
  const stack = [] // 存下标，栈内对应值单调递减
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      result[stack.pop()] = nums[i]
    }
    stack.push(i)
  }
  return result
}`,
        },
        {
          id: 'p4-4',
          type: 'heading',
          level: 3,
          text: '衍生结构：单调栈 / 单调队列 / 循环队列',
        },
        {
          id: 'p4-5',
          type: 'list',
          items: [
            '单调栈：栈内元素单调，用于「下一个更大/更小」类问题，O(n) 一次遍历',
            '单调队列：队列内单调，用于滑动窗口最值，deque 维护',
            '循环队列：用数组 + 取模实现，front/rear 指针循环复用空间',
          ],
        },
        {
          id: 'p4-6',
          type: 'table',
          caption: '栈与队列各操作复杂度',
          headers: ['操作', '栈', '队列', '单调栈'],
          rows: [
            ['入', 'O(1)', 'O(1)', 'O(1) 均摊'],
            ['出', 'O(1)', 'O(1) 对象实现', 'O(1) 均摊'],
            ['查顶/队首', 'O(1)', 'O(1)', 'O(1)'],
            ['查找', 'O(n)', 'O(n)', '—'],
          ],
        },
        {
          id: 'p4-7',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '函数调用栈（递归=栈）、浏览器前进后退（双栈）、括号匹配/表达式求值（栈）、事件循环宏微任务队列（队列）、请求限流/并发池（队列）。',
        },
        {
          id: 'p4-8',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '空栈 pop 返回 undefined 需判空；数组 shift 是 O(n) 不能做队列；单调栈比较时用严格 < 还是 <= 决定是否保留相等元素；循环队列判满条件是 (rear+1)%capacity === front。',
        },
        {
          id: 'p4-9',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC20 有效括号 / LC155 最小栈 / LC739 每日温度（单调栈）/ LC239 滑动窗口最大值（单调队列）/ LC622 设计循环队列。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 5：链表
    // ------------------------------------------------------------------------
    {
      order: 5,
      title: '链表',
      difficulty: 2,
      visualizationType: 'linked-list-stepper',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: '链表通过指针连接节点，插入删除 O(1) 但随机访问 O(n)。掌握虚拟头节点与快慢指针两大技巧，可解决 80% 链表题。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'linked-list-stepper',
          data: {},
        },
        {
          id: 'p5-3',
          type: 'code',
          language: 'javascript',
          filename: '链表实现与核心算法模板',
          code: `// 单链表节点
class ListNode {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}

// 虚拟头节点：统一处理头部的增删，避免特殊判断
function removeElements(head, val) {
  const dummy = new ListNode(0, head)
  let cur = dummy
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next
    else cur = cur.next
  }
  return dummy.next
}

// 快慢指针：判环
function hasCycle(head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}

// 快慢指针：找中点（快的走2步，慢的走1步）
function findMiddle(head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow // 奇数中点，偶数第二个中点
}

// 反转链表（迭代）
function reverseList(head) {
  let prev = null, cur = head
  while (cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}

// 合并两个有序链表
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0)
  let cur = dummy
  while (l1 && l2) {
    if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next }
    else { cur.next = l2; l2 = l2.next }
    cur = cur.next
  }
  cur.next = l1 || l2
  return dummy.next
}`,
        },
        {
          id: 'p5-4',
          type: 'table',
          caption: '链表各操作复杂度',
          headers: ['操作', '单链表', '双向链表'],
          rows: [
            ['头插/头删', 'O(1)', 'O(1)'],
            ['尾插', 'O(n) 无尾指针 / O(1) 有', 'O(1) 有尾指针'],
            ['中间增删（已知节点）', '删 O(n) 需前驱 / 增 O(1)', 'O(1)'],
            ['随机访问', 'O(n)', 'O(n)'],
            ['查找', 'O(n)', 'O(n)'],
          ],
        },
        {
          id: 'p5-5',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '浏览器历史记录（双向链表）、LRU 缓存底层（双向链表+哈希表）、React Fiber 架构（链表化 Fiber 树）、撤销重做。',
        },
        {
          id: 'p5-6',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '空链表/单节点/尾节点三种边界必须单独验证。指针断裂：反转时先存 next 再改指针，否则丢链。快慢指针判环时 fast 必须能走两步（while fast && fast.next）。',
        },
        {
          id: 'p5-7',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC206 反转链表 / LC21 合并两个有序链表 / LC141 环形链表 / LC876 链表的中间结点 / LC19 删除倒数第N个节点 / LC160 相交链表。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 6：数组与哈希表
    // ------------------------------------------------------------------------
    {
      order: 6,
      title: '数组与哈希表',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: '数组支持 O(1) 随机访问但插入删除 O(n)；哈希表通过哈希函数实现 O(1) 平均查找。JS 的 Object/Map/Set/WeakMap 各有适用场景。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['Object', 'Map', 'Set', 'WeakMap'],
            rows: [
              { feature: '键类型', values: ['string/Symbol', '任意类型', '任意类型', '仅对象'] },
              { feature: '有序性', values: ['无序', '插入序', '插入序', '无序'] },
              { feature: '长度', values: ['手动统计', 'map.size', 'set.size', 'wm.size 不可枚举'] },
              { feature: '遍历', values: ['for...in / Object.keys', 'for...of', 'for...of', '不可遍历'] },
              { feature: 'GC 友好', values: ['否', '否', '否', '是（弱引用）'] },
              { feature: '查找复杂度', values: ['O(1)', 'O(1)', 'O(1)', 'O(1)'] },
            ],
          },
        },
        {
          id: 'p6-3',
          type: 'heading',
          level: 3,
          text: '哈希表核心原理',
        },
        {
          id: 'p6-4',
          type: 'paragraph',
          text: '哈希表通过哈希函数把 key 映射到数组下标，实现 O(1) 查找。当不同 key 映射到同一下标时发生哈希冲突，解决方法：拉链法（链表/数组存冲突项）或开放寻址法（线性探测找下一个空位）。负载因子 = 元素数/桶数，超过阈值触发扩容+重哈希。',
        },
        {
          id: 'p6-5',
          type: 'code',
          language: 'javascript',
          filename: '哈希表应用：频次统计与两数之和',
          code: `// 两数之和：用 Map 把 O(n²) 暴力降到 O(n)
function twoSum(nums, target) {
  const map = new Map() // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (map.has(complement)) return [map.get(complement), i]
    map.set(nums[i], i)
  }
  return []
}

// 频次统计 + 排序
function topKFrequent(nums, k) {
  const freq = new Map()
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1)
  // 桶排序：频次做下标
  const buckets = []
  for (const [num, count] of freq) {
    (buckets[count] ||= []).push(num)
  }
  const result = []
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i]) result.push(...buckets[i])
  }
  return result
}`,
        },
        {
          id: 'p6-6',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '频次统计（字符出现次数）、数据去重（Set）、路由映射（path→component）、缓存表（Map 存组件实例）、WeakMap 存 DOM 节点关联数据（不阻碍 GC）。',
        },
        {
          id: 'p6-7',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: 'Object 键会被转字符串（obj[0] 和 obj["0"] 相同）。Map 用对象做键时是引用相等，不是深比较。WeakMap 不可遍历、无 size。NaN 在 Set 中只存在一个（NaN===NaN 为 false 但 Set 去重）。',
        },
        {
          id: 'p6-8',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC1 两数之和 / LC347 前K个高频元素 / LC128 最长连续序列 / LC49 字母异位词分组 / LC146 LRU 缓存。',
        },
      ],
    },

    // ========================================================================
    // 第三篇：进阶数据结构篇
    // ========================================================================

    // ------------------------------------------------------------------------
    // 知识点 7：树与二叉树
    // ------------------------------------------------------------------------
    {
      order: 7,
      title: '树与二叉树',
      difficulty: 3,
      visualizationType: 'binary-tree-walker',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: '树是层次化数据结构，前端 DOM 树、虚拟 DOM 树、菜单目录树都是树形。二叉树遍历是递归思维的入门，掌握 DFS（前/中/后序）与 BFS（层序）两套模板即可解题。',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'binary-tree-walker',
          data: {},
        },
        {
          id: 'p7-3',
          type: 'code',
          language: 'javascript',
          filename: '二叉树遍历：递归 + 迭代统一模板',
          code: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right
  }
}

// DFS 递归三件套
function preorder(root) { // 前序：根左右
  if (!root) return []
  return [root.val, ...preorder(root.left), ...preorder(root.right)]
}
function inorder(root) { // 中序：左根右（BST 得到有序序列）
  if (!root) return []
  return [...inorder(root.left), root.val, ...inorder(root.right)]
}
function postorder(root) { // 后序：左右根
  if (!root) return []
  return [...postorder(root.left), ...postorder(root.right), root.val]
}

// BFS 层序遍历
function levelOrder(root) {
  if (!root) return []
  const result = []
  const queue = [root]
  while (queue.length) {
    const level = []
    const size = queue.length
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}

// 迭代统一模板（用 null 标记访问时机）
function preorderIterative(root) {
  if (!root) return []
  const result = [], stack = [root]
  while (stack.length) {
    const node = stack.pop()
    result.push(node.val)
    if (node.right) stack.push(node.right) // 先压右
    if (node.left) stack.push(node.left)   // 后压左（先弹出）
  }
  return result
}

// BST 验证：中序必须严格递增
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true
  if (root.val <= min || root.val >= max) return false
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max)
}`,
        },
        {
          id: 'p7-4',
          type: 'table',
          caption: '二叉树遍历复杂度',
          headers: ['遍历', '时间', '空间（递归栈）', '特点'],
          rows: [
            ['前/中/后序', 'O(n)', 'O(h)', 'h=树高，平衡 O(log n)，链状 O(n)'],
            ['层序 BFS', 'O(n)', 'O(w)', 'w=最大宽度，最宽层节点数'],
            ['BST 查找/增删', 'O(log n) 平衡', 'O(h)', '最差退化为链表 O(n)'],
          ],
        },
        {
          id: 'p7-5',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: 'DOM 树遍历（querySelectorAll 用的是 BFS）、虚拟 DOM 树 Diff、菜单/目录树渲染、路由树匹配、AST 语法树遍历（Babel/ESLint）。',
        },
        {
          id: 'p7-6',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '空树（root=null）必须单独处理。叶子节点判断是 !node.left && !node.right。递归深度过大爆栈——树退化为链表时改用迭代。BST 中序遍历得有序序列是核心性质。',
        },
        {
          id: 'p7-7',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC144/94/145 前/中/后序遍历 / LC102 层序遍历 / LC104 二叉树最大深度 / LC226 翻转二叉树 / LC98 验证 BST / LC236 最近公共祖先。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 8：堆（优先队列）
    // ------------------------------------------------------------------------
    {
      order: 8,
      title: '堆（优先队列）',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: '堆是完全二叉树 + 堆序性：大顶堆父≥子，小顶堆父≤子。用数组存储（下标 i 的父节点在 (i-1)/2），堆顶即最值，适合 TopK 与优先级调度。',
        },
        {
          id: 'p8-2',
          type: 'code',
          language: 'javascript',
          filename: '最小堆实现',
          code: `class MinHeap {
  #heap = []
  get size() { return this.#heap.length }
  isEmpty() { return this.#heap.length === 0 }
  peek() { return this.#heap[0] }

  // 上浮：插入后与父比较，小则交换
  #siftUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1
      if (this.#heap[i] >= this.#heap[parent]) break
      ;[this.#heap[i], this.#heap[parent]] = [this.#heap[parent], this.#heap[i]]
      i = parent
    }
  }
  // 下沉：删除堆顶后，与较小子节点交换
  #siftDown(i) {
    const n = this.#heap.length
    while (true) {
      const l = 2 * i + 1, r = 2 * i + 2
      let smallest = i
      if (l < n && this.#heap[l] < this.#heap[smallest]) smallest = l
      if (r < n && this.#heap[r] < this.#heap[smallest]) smallest = r
      if (smallest === i) break
      ;[this.#heap[i], this.#heap[smallest]] = [this.#heap[smallest], this.#heap[i]]
      i = smallest
    }
  }
  push(val) {
    this.#heap.push(val)
    this.#siftUp(this.#heap.length - 1)
  }
  pop() {
    const top = this.#heap[0]
    const last = this.#heap.pop()
    if (this.#heap.length) {
      this.#heap[0] = last
      this.#siftDown(0)
    }
    return top
  }
}

// TopK 问题：维护大小为 K 的最小堆，堆顶即第 K 大
function findKthLargest(nums, k) {
  const heap = new MinHeap()
  for (const n of nums) {
    heap.push(n)
    if (heap.size > k) heap.pop() // 超过 K 个就弹出最小的
  }
  return heap.peek() // 堆顶是第 K 大
}`,
        },
        {
          id: 'p8-3',
          type: 'table',
          caption: '堆各操作复杂度',
          headers: ['操作', '时间复杂度', '说明'],
          rows: [
            ['peek 查看堆顶', 'O(1)', '直接取数组首元素'],
            ['push 插入', 'O(log n)', '上浮最多到根'],
            ['pop 删除堆顶', 'O(log n)', '下沉最多到叶'],
            ['建堆', 'O(n)', '从最后一个非叶节点起下沉'],
            ['堆排序', 'O(n log n)', '建堆 + n 次 pop'],
          ],
        },
        {
          id: 'p8-4',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: 'TopK 问题（热门搜索词）、任务优先级调度、React 任务调度队列（小顶堆按优先级取任务）、合并 K 个有序链表、数据流中位数（大顶堆+小顶堆）。',
        },
        {
          id: 'p8-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '下标映射：i 的父是 (i-1)>>1，左子 2i+1，右子 2i+2（0-based）。堆空时 pop 返回 undefined。大顶堆求第 K 小/小顶堆求第 K 大别搞反。JS 没有原生堆，需手写或用第三方库。',
        },
        {
          id: 'p8-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC215 数组中的第K个最大元素 / LC347 前K个高频元素 / LC295 数据流的中位数 / LC23 合并K个升序链表 / LC703 数据流中的第K大元素。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 9：图
    // ------------------------------------------------------------------------
    {
      order: 9,
      title: '图',
      difficulty: 3,
      visualizationType: 'bfs-path-finder',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: '图由顶点和边组成，表示多对多关系。前端模块依赖图、组件依赖图、路由导航都是图。掌握邻接表存储 + DFS/BFS 遍历 + 拓扑排序即可覆盖高频图题。',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'bfs-path-finder',
          data: { gridSize: 10, obstacleDensity: 0.25 },
        },
        {
          id: 'p9-3',
          type: 'code',
          language: 'javascript',
          filename: '图的邻接表 + DFS/BFS + 拓扑排序',
          code: `// 邻接表表示法（比邻接矩阵省空间：O(V+E) vs O(V²)）
class Graph {
  constructor(vertices) {
    this.adj = new Map()
    for (const v of vertices) this.adj.set(v, [])
  }
  addEdge(u, v) { this.adj.get(u).push(v) }
}

// DFS 递归（遍历/连通性）
function dfs(graph, start) {
  const visited = new Set()
  const result = []
  const traverse = (node) => {
    visited.add(node)
    result.push(node)
    for (const neighbor of graph.adj.get(node)) {
      if (!visited.has(neighbor)) traverse(neighbor)
    }
  }
  traverse(start)
  return result
}

// BFS 迭代（最短路径/层序）
function bfs(graph, start) {
  const visited = new Set([start])
  const queue = [start]
  const result = []
  while (queue.length) {
    const node = queue.shift()
    result.push(node)
    for (const neighbor of graph.adj.get(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }
  return result
}

// 拓扑排序（Kahn 算法，仅适用 DAG 有向无环图）
function topologicalSort(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0)
  const adj = Array.from({ length: numCourses }, () => [])
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course)
    inDegree[course]++
  }
  const queue = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i) // 入度为0的先入队
  }
  const order = []
  while (queue.length) {
    const course = queue.shift()
    order.push(course)
    for (const next of adj[course]) {
      if (--inDegree[next] === 0) queue.push(next)
    }
  }
  return order.length === numCourses ? order : [] // 有环返回空
}`,
        },
        {
          id: 'p9-4',
          type: 'table',
          caption: '图算法复杂度（V=顶点数, E=边数）',
          headers: ['算法', '时间', '空间', '适用'],
          rows: [
            ['DFS', 'O(V+E)', 'O(V) 递归栈', '连通性/环检测/路径'],
            ['BFS', 'O(V+E)', 'O(V) 队列', '最短路径(无权)/层序'],
            ['拓扑排序', 'O(V+E)', 'O(V+E)', 'DAG 依赖排序'],
            ['邻接矩阵存储', '—', 'O(V²)', '稠密图'],
            ['邻接表存储', '—', 'O(V+E)', '稀疏图（常用）'],
          ],
        },
        {
          id: 'p9-5',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '模块依赖图（webpack 打包排序用拓扑）、组件依赖图（按依赖顺序渲染）、路由导航图（最短路径）、npm 包依赖分析（环检测报循环依赖）。',
        },
        {
          id: 'p9-6',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '环会导致 DFS 死循环——必须用 visited 标记。有向图判环可用拓扑排序（结果长度≠顶点数则有环）或 DFS 三色标记法。BFS 求最短路径只适用于无权图，有权图用 Dijkstra。',
        },
        {
          id: 'p9-7',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC200 岛屿数量 / LC207 课程表（拓扑排序）/ LC210 课程表II / LC133 克隆图 / LC994 腐烂的橘子（BFS）。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 10：Trie 字典树
    // ------------------------------------------------------------------------
    {
      order: 10,
      title: 'Trie 字典树',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: 'Trie（前缀树）是专门处理字符串前缀匹配的树形结构。公共前缀共享节点，前缀查询 O(L) 且与数据量无关，适合自动补全与路由匹配。',
        },
        {
          id: 'p10-2',
          type: 'code',
          language: 'javascript',
          filename: 'Trie 实现',
          code: `class TrieNode {
  constructor() {
    this.children = {} // 字符 -> TrieNode
    this.isEnd = false  // 标记单词结尾
  }
}

class Trie {
  constructor() { this.root = new TrieNode() }

  // 插入单词：O(L)，L=单词长度
  insert(word) {
    let node = this.root
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode()
      node = node.children[ch]
    }
    node.isEnd = true
  }

  // 精确查询：O(L)
  search(word) {
    let node = this.root
    for (const ch of word) {
      if (!node.children[ch]) return false
      node = node.children[ch]
    }
    return node.isEnd
  }

  // 前缀查询：O(L)，Trie 的核心优势
  startsWith(prefix) {
    let node = this.root
    for (const ch of prefix) {
      if (!node.children[ch]) return false
      node = node.children[ch]
    }
    return true
  }
}`,
        },
        {
          id: 'p10-3',
          type: 'table',
          caption: 'Trie 复杂度（L=字符串长度）',
          headers: ['操作', '时间', '空间'],
          rows: [
            ['插入', 'O(L)', 'O(L) 新节点'],
            ['查询', 'O(L)', 'O(1)'],
            ['前缀匹配', 'O(L)', 'O(1)'],
            ['对比哈希表查询', 'O(1) 但无前缀', '—'],
          ],
        },
        {
          id: 'p10-4',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '路由前缀匹配（/api/users/:id）、输入框自动补全/联想、关键词搜索高亮、敏感词过滤、IDE 路径自动补全。',
        },
        {
          id: 'p10-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: 'search 和 startsWith 的区别：前者要求 isEnd=true（完整单词），后者只要求路径存在。空字符串插入只设 root.isEnd。用 Map 存 children 比数组省空间（数组需 26 槽）。',
        },
        {
          id: 'p10-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC208 实现 Trie / LC211 添加与搜索单词 / LC212 单词搜索II / LC648 单词替换 / LC139 单词拆分。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 11：并查集
    // ------------------------------------------------------------------------
    {
      order: 11,
      title: '并查集',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: '并查集（Union-Find）专门处理「连通性判断」与「集合合并」。近 O(1) 的查找与合并，适合动态连通性问题。',
        },
        {
          id: 'p11-2',
          type: 'code',
          language: 'javascript',
          filename: '并查集实现（含路径压缩）',
          code: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i) // 初始各自为根
    this.rank = new Array(n).fill(1) // 按秩合并优化
    this.count = n // 连通分量数
  }

  // 查找根节点（路径压缩：查找时把链路压平）
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]) // 递归压缩
    }
    return this.parent[x]
  }

  // 合并两个集合（按秩合并：矮树挂高树）
  union(x, y) {
    const rootX = this.find(x)
    const rootY = this.find(y)
    if (rootX === rootY) return false // 已连通
    // rank 小的挂到 rank 大的下面
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX
    } else {
      this.parent[rootY] = rootX
      this.rank[rootX]++
    }
    this.count--
    return true
  }

  // 判断是否连通
  connected(x, y) { return this.find(x) === this.find(y) }
}

// 岛屿数量：并查集解法
function numIslands(grid) {
  if (!grid.length) return 0
  const rows = grid.length, cols = grid[0].length
  const uf = new UnionFind(rows * cols)
  let water = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '0') { water++; continue }
      // 只需向右、向下合并（避免重复）
      if (c + 1 < cols && grid[r][c+1] === '1') uf.union(r*cols+c, r*cols+c+1)
      if (r + 1 < rows && grid[r+1][c] === '1') uf.union(r*cols+c, (r+1)*cols+c)
    }
  }
  return uf.count - water // 总分量 - 水格子数 = 岛屿数
}`,
        },
        {
          id: 'p11-3',
          type: 'table',
          caption: '并查集复杂度',
          headers: ['操作', '时间', '说明'],
          rows: [
            ['find 查找', 'O(α(n)) ≈ O(1)', 'α 是反阿克曼函数，n≤10⁸⁰ 时 α<5'],
            ['union 合并', 'O(α(n)) ≈ O(1)', '含路径压缩+按秩合并'],
            ['初始化', 'O(n)', '每个元素初始化为自身根'],
          ],
        },
        {
          id: 'p11-4',
          type: 'callout',
          variant: 'tip',
          title: '适用场景',
          text: '岛屿问题（网格连通性）、连通分量计数、朋友圈/社交网络分组、动态连通性判断、最小生成树（Kruskal 算法）。',
        },
        {
          id: 'p11-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '初始化时 parent[i]=i（自己是自己的根）。路径压缩必须用递归或循环把中间节点直接指向根，否则退化为 O(n)。按秩合并时相同 rank 合并后 rank 才 +1。',
        },
        {
          id: 'p11-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC200 岛屿数量 / LC547 省份数量 / LC684 冗余连接 / LC128 最长连续序列 / LC990 等式方程的可满足性。',
        },
      ],
    },

    // ========================================================================
    // 第四篇：核心算法思想篇
    // ========================================================================

    // ------------------------------------------------------------------------
    // 知识点 12：排序算法
    // ------------------------------------------------------------------------
    {
      order: 12,
      title: '排序算法',
      difficulty: 3,
      visualizationType: 'sorting-race-arena',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: '排序是算法入门必修。比较类排序（冒泡/选择/插入/快排/归并/堆排）是面试重点，掌握每种原理+复杂度+稳定性，能根据场景选型。',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'sorting-race-arena',
          data: {},
        },
        {
          id: 'p12-3',
          type: 'code',
          language: 'javascript',
          filename: '六大排序算法实现',
          code: `// 冒泡：相邻比较，每轮把最大冒到末尾
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        ;[arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        swapped = true
      }
    }
    if (!swapped) break // 优化：已有序提前退出
  }
  return arr
}

// 快排：选基准 partition，小的放左大的放右
function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return arr
  const pivot = arr[lo]
  let i = lo, j = hi
  while (i < j) {
    while (i < j && arr[j] >= pivot) j--
    while (i < j && arr[i] <= pivot) i++
    if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  ;[arr[lo], arr[i]] = [arr[i], arr[lo]]
  quickSort(arr, lo, i - 1)
  quickSort(arr, i + 1, hi)
  return arr
}

// 归并：分治拆到单元素，再有序合并
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const mid = arr.length >> 1
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}
function merge(l, r) {
  const result = []
  let i = 0, j = 0
  while (i < l.length && j < r.length) {
    l[i] <= r[j] ? result.push(l[i++]) : result.push(r[j++])
  }
  return result.concat(l.slice(i), r.slice(j))
}`,
        },
        {
          id: 'p12-4',
          type: 'table',
          caption: '六大排序算法横向对比',
          headers: ['算法', '平均时间', '最差', '空间', '稳定'],
          rows: [
            ['冒泡', 'O(n²)', 'O(n²)', 'O(1)', '稳定'],
            ['选择', 'O(n²)', 'O(n²)', 'O(1)', '不稳定'],
            ['插入', 'O(n²)', 'O(n²)', 'O(1)', '稳定'],
            ['快排', 'O(n log n)', 'O(n²)', 'O(log n)', '不稳定'],
            ['归并', 'O(n log n)', 'O(n log n)', 'O(n)', '稳定'],
            ['堆排', 'O(n log n)', 'O(n log n)', 'O(1)', '不稳定'],
          ],
        },
        {
          id: 'p12-5',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: 'Array.sort() 底层：V8 用 TimSort（归并+插入混合，稳定 O(n log n)）。列表多字段排序（先按次要字段排，再按主要字段稳定排序）。大数据量用快排/归并，小数据量用插入排序（常数小）。',
        },
        {
          id: 'p12-6',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '快排基准选最左元素时，已有序数组退化为 O(n²)——用随机基准或三数取中优化。归并需 O(n) 额外空间。稳定性：相等元素排序后相对位置不变，是选择排序和快排的短板。',
        },
        {
          id: 'p12-7',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC912 排序数组 / LC215 第K个最大元素 / LC56 合并区间 / LC179 最大数 / LC147 链表插入排序。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 13：查找算法
    // ------------------------------------------------------------------------
    {
      order: 13,
      title: '查找算法',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: '二分查找是 O(log n) 的搜索利器，前提是数据有序。掌握左边界、右边界、旋转数组三种变体，以及区间开闭的边界技巧。',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            language: 'javascript',
            lines: [
              'function binarySearch(arr, target) {',
              '  let left = 0, right = arr.length - 1',
              '  while (left <= right) {',
              '    const mid = left + ((right - left) >> 1)',
              '    if (arr[mid] === target) return mid',
              '    else if (arr[mid] < target) left = mid + 1',
              '    else right = mid - 1',
              '  }',
              '  return -1',
              '}',
            ],
            steps: [
              { title: '初始化', description: 'left=0, right=len-1，闭区间 [left, right]', highlightLines: [2] },
              { title: '取中点', description: 'mid = left + (right-left)>>1，防溢出', highlightLines: [4] },
              { title: '命中', description: 'arr[mid]===target，返回 mid', highlightLines: [5] },
              { title: '目标更大', description: 'left = mid+1，去右半找', highlightLines: [6] },
              { title: '目标更小', description: 'right = mid-1，去左半找', highlightLines: [7] },
              { title: '未找到', description: 'left > right 退出，返回 -1', highlightLines: [9] },
            ],
          },
        },
        {
          id: 'p13-3',
          type: 'code',
          language: 'javascript',
          filename: '二分查找三种变体',
          code: `// 基础二分（闭区间 [l, r]）
function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1
  while (l <= r) {
    const mid = l + ((r - l) >> 1) // 防 (l+r) 溢出
    if (arr[mid] === target) return mid
    arr[mid] < target ? l = mid + 1 : r = mid - 1
  }
  return -1
}

// 左边界：找第一个 >= target 的位置
function lowerBound(arr, target) {
  let l = 0, r = arr.length // 左闭右开 [l, r)
  while (l < r) {
    const mid = l + ((r - l) >> 1)
    arr[mid] < target ? l = mid + 1 : r = mid
  }
  return l // l == r，即插入位置
}

// 右边界：找最后一个 <= target 的位置
function upperBound(arr, target) {
  let l = 0, r = arr.length
  while (l < r) {
    const mid = l + ((r - l) >> 1)
    arr[mid] <= target ? l = mid + 1 : r = mid
  }
  return l - 1
}

// 旋转数组查找（如 [4,5,6,7,0,1,2]）
function searchRotated(arr, target) {
  let l = 0, r = arr.length - 1
  while (l <= r) {
    const mid = (l + r) >> 1
    if (arr[mid] === target) return mid
    // 判断哪半边有序
    if (arr[l] <= arr[mid]) { // 左半有序
      if (arr[l] <= target && target < arr[mid]) r = mid - 1
      else l = mid + 1
    } else { // 右半有序
      if (arr[mid] < target && target <= arr[r]) l = mid + 1
      else r = mid - 1
    }
  }
  return -1
}`,
        },
        {
          id: 'p13-4',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '有序数据查找（用户列表按 ID 排序后查找）、二分分页定位、虚拟列表滚动定位（二分找可视区起始索引）、插入排序找插入位置。',
        },
        {
          id: 'p13-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '死循环：l=mid 而非 l=mid+1 会死循环（因为 mid 向下取整）。mid 计算用 l+((r-l)>>1) 防 l+r 溢出。闭区间用 l<=r，开区间用 l<r。旋转数组关键是判断哪半边有序。',
        },
        {
          id: 'p13-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC704 二分查找 / LC34 在排序数组中查找元素的第一个和最后一个位置 / LC33 搜索旋转排序数组 / LC35 搜索插入位置 / LC153 寻找旋转排序数组中的最小值。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 14：双指针与滑动窗口
    // ------------------------------------------------------------------------
    {
      order: 14,
      title: '双指针与滑动窗口',
      difficulty: 3,
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: '双指针把嵌套循环 O(n²) 降到 O(n)，是数组/字符串题的高频技巧。滑动窗口是双指针的进阶，专门解决子数组/子串连续区间问题。',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            language: 'javascript',
            lines: [
              'function minWindow(s, t) {',
              '  const need = new Map()',
              '  for (const c of t) need.set(c, (need.get(c)||0)+1)',
              '  let l = 0, r = 0, valid = 0, start = 0, minLen = Infinity',
              '  const win = new Map()',
              '  while (r < s.length) {',
              '    const c = s[r++]',
              '    if (need.has(c)) {',
              '      win.set(c, (win.get(c)||0)+1)',
              '      if (win.get(c) === need.get(c)) valid++',
              '    }',
              '    while (valid === need.size) {',
              '      if (r - l < minLen) { start = l; minLen = r - l }',
              '      const d = s[l++]',
              '      if (need.has(d)) {',
              '        if (win.get(d) === need.get(d)) valid--',
              '        win.set(d, win.get(d)-1)',
              '      }',
              '    }',
              '  }',
              '  return minLen === Infinity ? "" : s.slice(start, start+minLen)',
              '}',
            ],
            steps: [
              { title: '初始化', description: 'need 统计 t 中字符频次，win 记录窗口内字符', highlightLines: [2, 4, 5] },
              { title: '扩大右边界', description: 'right 右移纳入新字符 c', highlightLines: [7] },
              { title: '更新窗口', description: '命中 need 时累加 win，达到需要量则 valid++', highlightLines: [8, 9, 10] },
              { title: '收缩左边界', description: 'valid===need.size 时窗口已满足，尝试左移 left', highlightLines: [12] },
              { title: '记录最短', description: '当前窗口更短则更新 start/minLen', highlightLines: [13] },
              { title: '移除左字符', description: 'left 右移丢掉 d，命中 need 时同步 valid 与 win', highlightLines: [14, 15, 16, 17] },
              { title: '返回结果', description: '未找到返回空串', highlightLines: [20] },
            ],
          },
        },
        {
          id: 'p14-3',
          type: 'code',
          language: 'javascript',
          filename: '双指针与滑动窗口模板',
          code: `// 对撞指针：两数之和（有序数组）
function twoSumSorted(nums, target) {
  let l = 0, r = nums.length - 1
  while (l < r) {
    const sum = nums[l] + nums[r]
    if (sum === target) return [l, r]
    sum < target ? l++ : r--
  }
  return []
}

// 快慢指针：移除元素（原地）
function removeElement(nums, val) {
  let slow = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) nums[slow++] = nums[fast]
  }
  return slow // 新长度
}

// 滑动窗口模板：最小覆盖子串
function minWindow(s, t) {
  const need = new Map()
  for (const c of t) need.set(c, (need.get(c) || 0) + 1)
  let left = 0, right = 0, valid = 0
  let start = 0, minLen = Infinity
  const window = new Map()
  while (right < s.length) {
    // 扩大右边界
    const c = s[right++]
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1)
      if (window.get(c) === need.get(c)) valid++
    }
    // 收缩左边界：窗口已满足
    while (valid === need.size) {
      if (right - left < minLen) {
        start = left
        minLen = right - left
      }
      const d = s[left++]
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid--
        window.set(d, window.get(d) - 1)
      }
    }
  }
  return minLen === Infinity ? '' : s.slice(start, start + minLen)
}`,
        },
        {
          id: 'p14-4',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '对撞指针用于有序数据两两匹配（颜色配对、版本号比较）。滑动窗口用于请求限流（窗口内最多 N 个请求）、连续日志统计、字符串匹配（URL 参数解析、模板变量提取）。',
        },
        {
          id: 'p14-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '窗口收缩条件用 valid===need.size 而非 window.size===need.size（重复字符算一次会错）。左指针移动后必须同步移除 win 计数，且 valid-- 必须在 win 减少之前判断。空串/单字符/全相同字符是高频踩坑点。',
        },
        {
          id: 'p14-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC1 两数之和 / LC27 移除元素 / LC76 最小覆盖子串 / LC3 无重复字符的最长子串 / LC438 找到字符串中所有字母异位词 / LC239 滑动窗口最大值。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 15：回溯与 DFS/BFS
    // ------------------------------------------------------------------------
    {
      order: 15,
      title: '回溯与 DFS/BFS',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: '回溯本质是「决策树」的深度优先遍历，核心三要素：路径（已选）、选择列表（当前可选项）、终止条件。掌握通用模板后，组合/排列/子集/分割/棋盘五类题型一通百通。',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            language: 'javascript',
            lines: [
              'function permute(nums) {',
              '  const res = [], path = [], used = []',
              '  function backtrack() {',
              '    if (path.length === nums.length) {',
              '      res.push([...path])',
              '      return',
              '    }',
              '    for (let i = 0; i < nums.length; i++) {',
              '      if (used[i]) continue',
              '      path.push(nums[i])',
              '      used[i] = true',
              '      backtrack()',
              '      path.pop()',
              '      used[i] = false',
              '    }',
              '  }',
              '  backtrack()',
              '  return res',
              '}',
            ],
            steps: [
              { title: '入口', description: 'path/used 初始化，进入 backtrack', highlightLines: [3] },
              { title: '终止条件', description: 'path 长度等于 nums 长度，拷贝入 res', highlightLines: [4, 5, 6] },
              { title: '遍历选择', description: '对每个未使用元素做选择', highlightLines: [9, 10] },
              { title: '做选择', description: 'push 进 path，标记 used', highlightLines: [11, 12] },
              { title: '递归', description: '进入下一层决策', highlightLines: [13] },
              { title: '撤销选择', description: 'pop 出 path，取消 used —— 回溯核心', highlightLines: [14, 15] },
            ],
          },
        },
        {
          id: 'p15-3',
          type: 'code',
          language: 'javascript',
          filename: '回溯通用模板与典型题型',
          code: `// 通用回溯模板
function backtrack(path, choices) {
  if (满足终止条件) {
    result.push([...path]) // 必须拷贝
    return
  }
  for (const choice of choices) {
    path.push(choice)        // 做选择
    backtrack(path, 新choices) // 递归
    path.pop()               // 撤销选择
  }
}

// 组合：从 1..n 选 k 个
function combine(n, k) {
  const res = []
  const dfs = (start, path) => {
    if (path.length === k) { res.push([...path]); return }
    for (let i = start; i <= n; i++) {
      path.push(i)
      dfs(i + 1, path)
      path.pop()
    }
  }
  dfs(1, [])
  return res
}

// 子集（含重复元素去重）
function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b)
  const res = []
  const dfs = (start, path) => {
    res.push([...path])
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue // 同层去重
      path.push(nums[i])
      dfs(i + 1, path)
      path.pop()
    }
  }
  dfs(0, [])
  return res
}

// BFS 模板：层序遍历（队列）
function bfs(root) {
  const queue = [root], res = []
  while (queue.length) {
    const levelSize = queue.length
    const level = []
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res.push(level)
  }
  return res
}`,
        },
        {
          id: 'p15-4',
          type: 'table',
          caption: 'DFS 与 BFS 对比',
          headers: ['维度', 'DFS', 'BFS'],
          rows: [
            ['数据结构', '栈（递归调用栈）', '队列'],
            ['空间复杂度', 'O(h) 树高', 'O(w) 最大宽度'],
            ['最短路径', '不保证', '无权图保证最短'],
            ['适用场景', '全排列/组合/子集/迷宫', '层序/最短路径/连通性'],
            ['JS 实现', '递归或显式栈', 'queue.shift() 或双指针'],
          ],
        },
        {
          id: 'p15-5',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '组件树深度遍历（找特定节点）、菜单/路由树展开、迷宫/地图寻路（BFS 最短路径）、表单全组合枚举、依赖图检测（拓扑排序 DFS 版）。React/Vue 的 reconcile 也是树 DFS。',
        },
        {
          id: 'p15-6',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: 'path 入 res 必须拷贝（[...path]），否则后续 pop 会清空。重复元素去重：先排序，同层遇到 nums[i]===nums[i-1] 且 i>start 跳过。矩阵 DFS 必须标记 visited，否则死循环。终止条件遗漏导致栈溢出。',
        },
        {
          id: 'p15-7',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC46 全排列 / LC39 组合总和 / LC78 子集 / LC22 括号生成 / LC79 单词搜索 / LC200 岛屿数量 / LC102 二叉树层序遍历。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 16：分治算法
    // ------------------------------------------------------------------------
    {
      order: 16,
      title: '分治算法',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: '分治三步走：分解（拆成子问题）→ 解决（递归处理）→ 合并（合并子结果）。归并排序、快排、二分查找都是分治经典。前端常用于大任务拆分与时间分片渲染。',
        },
        {
          id: 'p16-2',
          type: 'code',
          language: 'javascript',
          filename: '分治经典：归并排序 + Pow(x,n)',
          code: `// 归并排序：分治 + 合并
function mergeSort(arr) {
  if (arr.length <= 1) return arr // 解决：单元素天然有序
  const mid = arr.length >> 1     // 分解
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)       // 合并
}
function merge(l, r) {
  const res = []
  let i = 0, j = 0
  while (i < l.length && j < r.length) {
    l[i] <= r[j] ? res.push(l[i++]) : res.push(r[j++])
  }
  return res.concat(l.slice(i), r.slice(j))
}

// 快速排序：分治 + 原地
function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return arr
  const p = partition(arr, lo, hi)
  quickSort(arr, lo, p - 1)
  quickSort(arr, p + 1, hi)
  return arr
}

// Pow(x, n)：分治降维 O(log n)
function myPow(x, n) {
  if (n === 0) return 1
  if (n < 0) return 1 / myPow(x, -n)
  const half = myPow(x, n >> 1)
  return n % 2 ? half * half * x : half * half
}

// 多数元素：分治法 O(n log n)
function majorityElement(nums) {
  const divide = (lo, hi) => {
    if (lo === hi) return nums[lo]
    const mid = (lo + hi) >> 1
    const left = divide(lo, mid)
    const right = divide(mid + 1, hi)
    if (left === right) return left
    const countL = countInRange(nums, left, lo, hi)
    const countR = countInRange(nums, right, lo, hi)
    return countL > countR ? left : right
  }
  return divide(0, nums.length - 1)
}`,
        },
        {
          id: 'p16-3',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '大任务拆分：渲染 10w 条数据时拆成多个 chunk 分帧渲染。归并思想用于有序列表合并（多页数据合并排序）。时间分片（requestIdleCallback + 分治）避免长任务阻塞主线程。',
        },
        {
          id: 'p16-4',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '分治必须有 base case（n<=1）否则无限递归。子问题必须独立不重叠（重叠用 DP）。合并阶段复杂度决定整体：归并 O(n) 合并造就 O(n log n)，快排 O(n) partition 造就 O(n log n)。',
        },
        {
          id: 'p16-5',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC169 多数元素 / LC53 最大子数组和（分治版）/ LC23 合并 K 个排序链表 / LC14 最长公共前缀 / LC241 为运算表达式设计优先级。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 17：贪心算法
    // ------------------------------------------------------------------------
    {
      order: 17,
      title: '贪心算法',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: '贪心每一步选「当前最优」，期望得到全局最优。适用前提：问题具有贪心选择性质（局部最优能推导全局最优）和最优子结构。不满足时只能用 DP。',
        },
        {
          id: 'p17-2',
          type: 'code',
          language: 'javascript',
          filename: '贪心经典题型',
          code: `// 区间调度：选最多互不重叠区间
function eraseOverlap(intervals) {
  intervals.sort((a, b) => a[1] - b[1]) // 按结束时间排序
  let count = 1, end = intervals[0][1]
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= end) { // 不重叠
      count++
      end = intervals[i][1]
    }
  }
  return intervals.length - count // 需移除的数量
}

// 跳跃游戏：能否到达终点
function canJump(nums) {
  let maxReach = 0
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false // 跳不到 i
    maxReach = Math.max(maxReach, i + nums[i])
  }
  return true
}

// 跳跃游戏 II：最少跳跃次数
function jump(nums) {
  let jumps = 0, curEnd = 0, farthest = 0
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i])
    if (i === curEnd) {
      jumps++
      curEnd = farthest
    }
  }
  return jumps
}

// 分发糖果：贪心两次遍历
function candy(ratings) {
  const n = ratings.length
  const c = new Array(n).fill(1)
  for (let i = 1; i < n; i++)      // 从左到右
    if (ratings[i] > ratings[i-1]) c[i] = c[i-1] + 1
  for (let i = n - 2; i >= 0; i--) // 从右到左
    if (ratings[i] > ratings[i+1]) c[i] = Math.max(c[i], c[i+1] + 1)
  return c.reduce((a, b) => a + b, 0)
}`,
        },
        {
          id: 'p17-3',
          type: 'callout',
          variant: 'tip',
          title: '与动态规划的核心区别',
          text: '贪心：每步选当前最优，不可撤销，O(n log n)（排序）或 O(n)。DP：枚举所有状态转移，O(n²) 或更高。能用贪心就别用 DP——但必须证明贪心选择性质。区间问题常按端点排序后贪心，背包问题只能 DP（贪心按性价比会错）。',
        },
        {
          id: 'p17-4',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '任务调度（按截止时间贪心）、资源分配（CPU 时间片）、路由懒加载预取策略（贪心预取最可能访问的）、缓存淘汰（LRU 是贪心策略）。区间合并用于日程合并、时间段冲突检测。',
        },
        {
          id: 'p17-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '区间问题排序关键字选错就全错——选 end 而非 start（保证留更多空间）。贪心不成立时（如 0-1 背包）必须转 DP。跳跃游戏的 maxReach 必须每轮更新，i>maxReach 才返回 false。',
        },
        {
          id: 'p17-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC455 分发饼干 / LC435 无重叠区间 / LC55 跳跃游戏 / LC45 跳跃游戏 II / LC135 分发糖果 / LC406 根据身高重建队列。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 18：动态规划（DP）
    // ------------------------------------------------------------------------
    {
      order: 18,
      title: '动态规划（DP）',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: 'DP 五步法：① dp 数组定义 ② 递推公式 ③ 初始化 ④ 遍历顺序 ⑤ 举例推导验证。核心三特性：最优子结构、重叠子问题、无后效性。从斐波那契到背包，掌握模板即可解 80% 的 DP 题。',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            language: 'javascript',
            lines: [
              '// 最长递增子序列 LIS：O(n log n) 二分',
              'function lengthOfLIS(nums) {',
              '  const tails = [] // tails[i] = 长度为 i+1 的最小尾元素',
              '  for (const x of nums) {',
              '    let l = 0, r = tails.length',
              '    while (l < r) {',
              '      const m = (l + r) >> 1',
              '      tails[m] < x ? l = m + 1 : r = m',
              '    }',
              '    tails[l] = x',
              '  }',
              '  return tails.length',
              '}',
            ],
            steps: [
              { title: '初始化', description: 'tails 数组空，存各长度最小尾', highlightLines: [3] },
              { title: '遍历 nums', description: '对每个 x 二分查找位置', highlightLines: [4, 5, 6] },
              { title: '二分', description: '找第一个 >= x 的位置 l', highlightLines: [7, 8] },
              { title: '替换', description: 'tails[l]=x：比尾大则追加，否则替换该位', highlightLines: [10] },
              { title: '结果', description: 'tails 长度即 LIS 长度', highlightLines: [12] },
            ],
          },
        },
        {
          id: 'p18-3',
          type: 'code',
          language: 'javascript',
          filename: 'DP 五大经典题型',
          code: `// 1. 斐波那契模型：爬楼梯（滚动数组优化空间 O(1)）
function climbStairs(n) {
  if (n <= 2) return n
  let prev = 1, cur = 2
  for (let i = 3; i <= n; i++) [prev, cur] = [cur, prev + cur]
  return cur
}

// 2. 打家劫舍：不能偷相邻
function rob(nums) {
  let prev = 0, cur = 0
  for (const x of nums) {
    const next = Math.max(cur, prev + x)
    prev = cur
    cur = next
  }
  return cur
}

// 3. 最长递增子序列 LIS：O(n²) 通用版
function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1)
  for (let i = 0; i < nums.length; i++)
    for (let j = 0; j < i; j++)
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1)
  return Math.max(...dp)
}

// 4. 最长公共子序列 LCS
function longestCommonSubsequence(t1, t2) {
  const m = t1.length, n = t2.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = t1[i-1] === t2[j-1]
        ? dp[i-1][j-1] + 1
        : Math.max(dp[i-1][j], dp[i][j-1])
  return dp[m][n]
}

// 5. 0-1 背包：容量 W 下最大价值
function knapsack01(W, weights, values) {
  const dp = new Array(W + 1).fill(0)
  for (let i = 0; i < weights.length; i++)
    for (let w = W; w >= weights[i]; w--) // 逆序避免重复选
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i])
  return dp[W]
}`,
        },
        {
          id: 'p18-4',
          type: 'table',
          caption: 'DP 优化技巧对比',
          headers: ['技巧', '空间', '适用场景', '关键点'],
          rows: [
            ['原始二维 DP', 'O(m·n)', 'LCS/编辑距离', 'dp[i][j] 依赖左/上/左上'],
            ['滚动数组', 'O(n)', '可压缩为 1 行', '只依赖前一行'],
            ['状态压缩', 'O(1)', '斐波那契/打家劫舍', '只依赖前 1-2 项'],
            ['记忆化搜索', 'O(n) 栈', '树形/区间 DP', '递归 + 缓存'],
          ],
        },
        {
          id: 'p18-5',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: 'LIS 与 Vue3 Diff 算法：Vue3 用 LIS 求最长递增子序列，使需要移动的节点最少（DOM 移动是最贵的操作）。字符串 DP 用于编辑距离（拼写纠错、Git diff）。背包问题用于资源分配（预算下的功能取舍）。',
        },
        {
          id: 'p18-6',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '初始化错误：dp[0] 不能无脑设 0（如最大值题应设 -Infinity）。遍历顺序：0-1 背包逆序（防重复选），完全背包顺序（允许重复）。二维 DP 下标从 1 开始可省去边界判断。LCS 必须画表格推导。',
        },
        {
          id: 'p18-7',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC70 爬楼梯 / LC198 打家劫舍 / LC300 最长递增子序列 / LC1143 最长公共子序列 / LC322 零钱兑换 / LC416 分割等和子集 / LC72 编辑距离 / LC188 买卖股票最佳时机 IV。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 19：位运算
    // ------------------------------------------------------------------------
    {
      order: 19,
      title: '位运算',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          lead: true,
          text: '位运算直接操作二进制位，常用于状态压缩与性能优化。JS 中 32 位整数运算（& | ^ ~ << >>），注意 >>> 是无符号右移。掌握高频技巧即可应对 90% 题目。',
        },
        {
          id: 'p19-2',
          type: 'code',
          language: 'javascript',
          filename: '位运算高频技巧',
          code: `// 基础运算符
// & 与 | 或 ^ 异或 ~ 非 << 左移 >> 右移 >>> 无符号右移

// 判断奇偶（比 %2 快）
const isOdd = (n) => (n & 1) === 1

// 判断 2 的幂（只有一个 1）
const isPowerOfTwo = (n) => n > 0 && (n & (n - 1)) === 0

// 二进制中 1 的个数（Brian Kernighan 算法）
function hammingWeight(n) {
  let count = 0
  while (n) {
    n &= n - 1 // 消去最低位的 1
    count++
  }
  return count
}

// 只出现一次的数字（其他都出现两次）
function singleNumber(nums) {
  return nums.reduce((a, b) => a ^ b, 0)
}

// 不用临时变量交换两数
let a = 1, b = 2
a ^= b; b ^= a; a ^= b // 现在 a=2, b=1

// 缺失数字：0..n 中缺一个
function missingNumber(nums) {
  let res = nums.length
  for (let i = 0; i < nums.length; i++) res ^= i ^ nums[i]
  return res
}

// 位掩码：权限控制
const PERMISSIONS = { READ: 1, WRITE: 2, EXEC: 4, ADMIN: 8 }
function hasPermission(userPerm, perm) {
  return (userPerm & perm) === perm
}
function grantPermission(userPerm, perm) {
  return userPerm | perm
}
function revokePermission(userPerm, perm) {
  return userPerm & ~perm
}`,
        },
        {
          id: 'p19-3',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '权限控制（Linux 风格 rwx=7，前端 RBAC 用位掩码压缩多权限）。多状态标记（一个数存 32 个布尔，节省内存）。Vue3 的 PatchFlag 用位运算标记节点变化类型。性能优化：位运算比乘除快 10 倍（V8 已优化，但极端场景仍有效）。',
        },
        {
          id: 'p19-4',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: 'JS 位运算强制转 32 位有符号整数，超过 2³¹ 会出错（大数用 BigInt）。~n = -(n+1)（注意取反规律）。>>> 0 可快速转无符号整数（用于颜色值、哈希）。负数右移 >> 是算术右移（高位补 1），>>> 是逻辑右移（高位补 0）。',
        },
        {
          id: 'p19-5',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC136 只出现一次的数字 / LC191 位 1 的个数 / LC231 2 的幂 / LC338 比特位计数 / LC461 汉明距离 / LC268 缺失数字 / LC78 子集（位运算版）。',
        },
      ],
    },

    // ========================================================================
    // 第五篇：前端专项算法篇
    // ========================================================================

    // ------------------------------------------------------------------------
    // 知识点 20：JavaScript 高频手写算法
    // ------------------------------------------------------------------------
    {
      order: 20,
      title: 'JavaScript 高频手写算法',
      difficulty: 3,
      isNew: true,
      visualizationType: 'handwriting-challenge',
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          lead: true,
          text: '前端面试手写题是算法与语言特性的结合。掌握工具类（防抖节流/深拷贝/扁平化）、缓存类（LRU/LFU）、并发控制（Promise 限流）、函数式（柯里化/compose），并理解边界与原理。',
        },
        {
          id: 'p20-2',
          type: 'demo',
          visualizationType: 'handwriting-challenge',
          data: {
            problems: [
              {
                id: 'debounce',
                title: '防抖 debounce',
                description: '触发后等待 wait 毫秒无新触发才执行，常用于搜索框输入。',
                testCases: [
                  { label: '基础调用', input: 'debounce(fn, 300)', expected: '返回新函数，连续调用只执行最后一次' },
                  { label: '立即执行版', input: 'debounce(fn, 300, { leading: true })', expected: '首次立即执行，后续等待' },
                ],
                solution: `function debounce(fn, wait, { leading = false } = {}) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    if (leading && !timer) fn.apply(this, args)
    timer = setTimeout(() => {
      if (!leading) fn.apply(this, args)
      timer = null
    }, wait)
  }
}`,
                keyPoints: ['闭包保存 timer', 'clearTimeout 清除上一次', 'this/args 透传', 'leading 选项控制首调'],
              },
              {
                id: 'deepclone',
                title: '深拷贝（循环引用+特殊类型）',
                description: '处理对象、数组、Date、RegExp、Map、Set，并解决循环引用。',
                testCases: [
                  { label: '基本对象', input: 'deepClone({a:1, b:{c:2}})', expected: '深拷贝，互不影响' },
                  { label: '循环引用', input: 'const a={}; a.self=a; deepClone(a)', expected: '不爆栈，self 指向拷贝自身' },
                ],
                solution: `function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (hash.has(obj)) return hash.get(obj) // 解循环
  const clone = Array.isArray(obj) ? [] : {}
  hash.set(obj, clone)
  Reflect.ownKeys(obj).forEach(k => {
    clone[k] = deepClone(obj[k], hash)
  })
  return clone
}`,
                keyPoints: ['WeakMap 解循环引用', '递归终止于原始值', 'Date/RegExp 特殊处理', 'Reflect.ownKeys 含 Symbol'],
              },
              {
                id: 'promise-limit',
                title: 'Promise 并发限制',
                description: '限制同时执行的 Promise 数量为 limit，常用于批量请求。',
                testCases: [
                  { label: '基础限流', input: 'limit(tasks, 3)', expected: '同时最多 3 个 task 执行' },
                  { label: '结果保序', input: 'limit(tasks, 2)', expected: '返回结果顺序与 tasks 一致' },
                ],
                solution: `async function limit(tasks, limit) {
  const results = new Array(tasks.length)
  let i = 0
  async function run() {
    while (i < tasks.length) {
      const idx = i++
      try {
        results[idx] = await tasks[idx]()
      } catch (e) {
        results[idx] = e
      }
    }
  }
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, run)
  await Promise.all(workers)
  return results
}`,
                keyPoints: ['i++ 抢占任务索引', 'worker 数量等于 limit', '结果按原 idx 保序', '错误捕获存入数组'],
              },
              {
                id: 'curry',
                title: '柯里化 curry',
                description: '将 f(a,b,c) 转为 f(a)(b)(c)，参数足够时执行。',
                testCases: [
                  { label: '固定参数', input: 'curry(add)(1)(2)(3)', expected: 'add(1,2,3)=6' },
                  { label: '占位符', input: 'curry(add, _)(_,2)(1)(3)', expected: '支持占位' },
                ],
                solution: `function curry(fn, placeholder) {
  return function curried(...args) {
    // 1. 已收集满（考虑占位）
    const fullArgs = fn.length
    const realCount = args.filter(a => a !== placeholder).length
    // 简化版：参数够就调用
    if (args.length >= fullArgs && !args.includes(placeholder)) {
      return fn.apply(this, args)
    }
    // 2. 否则继续收集
    return function (...next) {
      const merged = args.map(a => a === placeholder ? next.shift() ?? placeholder : a)
      return curried.apply(this, [...merged, ...next])
    }
  }
}`,
                keyPoints: ['闭包累积参数', 'fn.length 判断参数足够', '占位符需合并填充', 'this 透传'],
              },
            ],
          },
        },
        {
          id: 'p20-3',
          type: 'code',
          language: 'javascript',
          filename: 'LRU 缓存 + 数组扁平化去重',
          code: `// LRU 缓存：Map 的 keys() 维护插入序
class LRUCache {
  constructor(capacity) { this.capacity = capacity; this.cache = new Map() }
  get(key) {
    if (!this.cache.has(key)) return -1
    const val = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, val) // 重新插入置末尾（最新）
    return val
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key)
    this.cache.set(key, value)
    if (this.cache.size > this.capacity) {
      // 删除最旧：keys().next().value 即首个（最旧）
      this.cache.delete(this.cache.keys().next().value)
    }
  }
}

// 数组扁平化（迭代版，避免递归爆栈）
function flatten(arr, depth = Infinity) {
  const stack = [...arr.map(item => [item, depth])]
  const result = []
  while (stack.length) {
    const [item, d] = stack.pop()
    if (Array.isArray(item) && d > 0) {
      stack.push(...item.map(i => [i, d - 1]))
    } else {
      result.push(item)
    }
  }
  return result.reverse()
}

// 数组去重（保留首次出现位置）
function unique(arr) {
  const seen = new Set()
  return arr.filter(x => seen.has(x) ? false : seen.add(x), true)
}

// compose / pipe：右到左 / 左到右
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)`,
        },
        {
          id: 'p20-4',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '防抖节流用于输入/resize/scroll。深拷贝用于状态快照、配置克隆。LRU 用于 keep-alive 缓存、接口缓存。Promise 限流用于批量上传、爬虫并发控制。compose/pipe 用于中间件、Redux applyMiddleware。',
        },
        {
          id: 'p20-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '防抖 leading 模式下 timer 状态需重置。深拷贝循环引用必须用 WeakMap（不会内存泄漏）。Promise 限流 i++ 必须同步执行（否则竞态）。LRU 删除最旧用 keys().next() 而非数组下标。柯里化占位符合并顺序易错。',
        },
        {
          id: 'p20-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC146 LRU 缓存 / LC460 LFU 缓存 / LC2631 树形结构扁平化 / 手写 debounce/throttle/curry/compose/Promise.all/Promise.race/Promise.allSettled。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 21：浏览器与渲染相关算法
    // ------------------------------------------------------------------------
    {
      order: 21,
      title: '浏览器与渲染相关算法',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p21-1',
          type: 'paragraph',
          lead: true,
          text: '前端必须理解浏览器内部算法：事件循环（宏微任务调度）、垃圾回收（标记清除/分代回收）、调度算法（rAF/rIC 时间分片）。这些决定了你的代码何时执行、内存何时释放、渲染是否流畅。',
        },
        {
          id: 'p21-2',
          type: 'code',
          language: 'javascript',
          filename: '事件循环 + 调度算法模拟',
          code: `// 事件循环简化模型
const macroTaskQueue = []   // setTimeout/setInterval/UI 事件/I/O
const microTaskQueue = []   // Promise.then/queueMicrotask/MutationObserver

function eventLoop() {
  while (true) {
    // 1. 执行一个宏任务
    const task = macroTaskQueue.shift()
    if (task) task()
    // 2. 清空所有微任务（每轮宏任务后必须清空）
    while (microTaskQueue.length) {
      microTaskQueue.shift()()
    }
    // 3. 判断是否需要渲染（rAF 在渲染前）
    if (needsRender()) {
      runAnimationFrames()       // requestAnimationFrame 回调
      render()                    // 浏览器渲染
    }
  }
}

// requestAnimationFrame：在下次重绘前调用
function smoothScroll(target) {
  const start = window.scrollY
  const distance = target - start
  const duration = 300
  let startTime
  function step(now) {
    if (!startTime) startTime = now
    const progress = Math.min((now - startTime) / duration, 1)
    // easeInOutQuad 缓动
    const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress
    window.scrollTo(0, start + distance * eased)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// requestIdleCallback：浏览器空闲时执行
function processLargeData(items) {
  return new Promise(resolve => {
    let i = 0
    function workChunk(deadline) {
      // deadline.timeRemaining() 返回剩余空闲时间
      while (i < items.length && deadline.timeRemaining() > 0) {
        processItem(items[i++])
      }
      if (i < items.length) {
        requestIdleCallback(workChunk)
      } else {
        resolve()
      }
    }
    requestIdleCallback(workChunk)
  })
}`,
        },
        {
          id: 'p21-3',
          type: 'table',
          caption: '浏览器调度 API 对比',
          headers: ['API', '触发时机', '适用场景', '注意事项'],
          rows: [
            ['setTimeout(fn,0)', '下个宏任务', '延后到下轮', '最少 4ms 嵌套限制'],
            ['Promise.then', '当前微任务', '异步但快', '会阻塞渲染'],
            ['queueMicrotask', '当前微任务', '替代 Promise', '语义更清晰'],
            ['requestAnimationFrame', '渲染前', '动画', '隐藏 tab 不触发'],
            ['requestIdleCallback', '空闲时', '低优先任务', '有 deadline 限时'],
          ],
        },
        {
          id: 'p21-4',
          type: 'callout',
          variant: 'tip',
          title: '垃圾回收算法',
          text: 'V8 分代回收：新生代（Scavenge 算法，from/to 半区复制）存活周期短，老生代（标记清除 + 标记整理）存活久。引用计数已被淘汰（循环引用无法回收）。WeakMap/WeakSet 不参与引用计数，适合缓存场景。',
        },
        {
          id: 'p21-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '微任务会阻塞渲染——Promise.resolve().then 死循环会让页面卡死。rAF 隐藏标签页会暂停，setTimeout 不会。requestIdleCallback 兼容性差，React18 自己实现了 MessageChannel 版本的调度器。',
        },
        {
          id: 'p21-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: '手写 Promise/A+ / 实现 async/await（generator + autoRunner）/ 解释 Event Loop 输出顺序 / setTimeout vs Promise 输出题 / rAF 实现进度条 / 长列表分帧渲染。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 22：前端框架核心算法原理
    // ------------------------------------------------------------------------
    {
      order: 22,
      title: '前端框架核心算法原理',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p22-1',
          type: 'paragraph',
          lead: true,
          text: '框架内部藏着大量经典算法：Vue/React 的 Diff（双端对比 + LIS）、Fiber 架构（链表化 + 可中断 + 优先级调度）、路由匹配（前缀匹配 + Trie 树）。理解这些能把通用算法焊到工程里。',
        },
        {
          id: 'p22-2',
          type: 'code',
          language: 'javascript',
          filename: 'Vue3 Diff 核心算法（双端 + LIS）',
          code: `// Vue3 Diff：旧节点 [a,b,c,d,e] → 新节点 [a,c,b,d,f]
// 1. 头尾双向同步：相同前缀/后缀直接 patch
// 2. 中间乱序段：用最长递增子序列 LIS 确定无需移动的节点

function diffChildren(c1, c2) {
  let i = 0
  let e1 = c1.length - 1
  let e2 = c2.length - 1
  // 1. 头部同步
  while (i <= e1 && i <= e2 && sameVNode(c1[i], c2[i])) i++
  // 2. 尾部同步
  while (i <= e1 && i <= e2 && sameVNode(c1[e1], c2[e2])) { e1--; e2-- }
  // 3. 新节点多 → 挂载新增
  if (i > e1) {
    for (let j = i; j <= e2; j++) mount(c2[j])
    return
  }
  // 4. 旧节点多 → 卸载多余
  if (i > e2) {
    for (let j = i; j <= e1; j++) unmount(c1[j])
    return
  }
  // 5. 中间乱序：建新→旧位置 Map
  const s1 = i, s2 = i
  const keyToNewIndex = new Map()
  for (let j = s2; j <= e2; j++) keyToNewIndex.set(c2[j].key, j)
  const newIndexToOldIndex = new Array(e2 - s2 + 1).fill(0)
  let moved = false, maxNewIndex = 0
  for (let j = s1; j <= e1; j++) {
    const newIndex = keyToNewIndex.get(c1[j].key)
    if (newIndex === undefined) {
      unmount(c1[j]) // 旧节点不存在于新 → 卸载
    } else {
      newIndexToOldIndex[newIndex - s2] = j + 1 // +1 区分 0（表示新增）
      if (newIndex < maxNewIndex) moved = true
      else maxNewIndex = newIndex
      patch(c1[j], c2[newIndex])
    }
  }
  // 6. 移动 + 挂载：用 LIS 求「无需移动」的旧节点
  const increasingIdx = moved ? getSequence(newIndexToOldIndex) : []
  let k = increasingIdx.length - 1
  for (let j = e2 - s2; j >= 0; j--) {
    if (newIndexToOldIndex[j] === 0) {
      mount(c2[s2 + j]) // 新节点
    } else if (moved && (k < 0 || j !== increasingIdx[k])) {
      move(c2[s2 + j]) // 不在 LIS 中 → 需要移动
    } else {
      k-- // 在 LIS 中 → 不动
    }
  }
}

// 最长递增子序列：返回索引数组（非长度）
function getSequence(arr) {
  const p = arr.slice() // 前驱指针
  const result = [0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) continue
    const last = result[result.length - 1]
    if (arr[i] > arr[last]) {
      p[i] = last
      result.push(i)
      continue
    }
    // 二分找位置
    let l = 0, r = result.length - 1
    while (l < r) {
      const m = (l + r) >> 1
      arr[result[m]] < arr[i] ? l = m + 1 : r = m
    }
    if (arr[i] < arr[result[l]]) {
      if (l > 0) p[i] = result[l - 1]
      result[l] = i
    }
  }
  // 回溯还原序列
  let u = result.length - 1, v = result[u]
  while (u > 0) { v = p[v]; result[--u] = v }
  return result
}`,
        },
        {
          id: 'p22-3',
          type: 'code',
          language: 'javascript',
          filename: 'Fiber 链表化 + 路由前缀匹配',
          code: `// React Fiber：把树拍平为可中断的链表
// 每个节点有 child/sibling/return 三个指针
function createFiber(element, parent) {
  return {
    element,
    parent,
    child: null,
    sibling: null,
    alternate: null, // 双缓冲：指向旧 Fiber
  }
}

// Fiber 工作循环：可被 shouldYield 打断
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

// 路由前缀匹配：Trie 树
class RouteTrie {
  constructor() { this.children = {}; this.handler = null }
  insert(path, handler) {
    let node = this
    for (const seg of path.split('/').filter(Boolean)) {
      node = node.children[seg] || (node.children[seg] = new RouteTrie())
    }
    node.handler = handler
  }
  match(url) {
    let node = this
    const params = {}
    for (const seg of url.split('/').filter(Boolean)) {
      // 精确匹配优先，其次动态参数 :id
      if (node.children[seg]) node = node.children[seg]
      else {
        const dynamic = Object.keys(node.children).find(k => k.startsWith(':'))
        if (!dynamic) return null
        params[dynamic.slice(1)] = seg
        node = node.children[dynamic]
      }
    }
    return node.handler ? { handler: node.handler, params } : null
  }
}`,
        },
        {
          id: 'p22-4',
          type: 'callout',
          variant: 'tip',
          title: '框架算法映射',
          text: 'Vue3 Diff = 双端对比 + LIS（减少 DOM 移动）。React Fiber = 链表 + 可中断 + 时间分片（解决大组件树卡顿）。Vue PatchFlag = 位运算标记动态节点。Vue3 静态提升 = 编译期优化（绕过 Diff）。路由匹配 = Trie + 动态参数。',
        },
        {
          id: 'p22-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: 'Vue3 Diff 的 newIndexToOldIndex 用 0 表示「新增」（必须 +1 区分）。LIS 求的是索引序列而非长度。Fiber 中断后必须能恢复（alternate 双缓冲）。路由匹配顺序：静态路径 > 动态 :id > 通配 *。',
        },
        {
          id: 'p22-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: '手写 Vue3 Diff（双端 + LIS）/ 实现 React Fiber 工作循环 / 路由 Trie 树匹配 / 实现 keep-alive LRU / 实现响应式 reactive（Proxy + 依赖收集）。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 23：业务场景算法
    // ------------------------------------------------------------------------
    {
      order: 23,
      title: '业务场景算法',
      difficulty: 3,
      isNew: true,
      blocks: [
        {
          id: 'p23-1',
          type: 'paragraph',
          lead: true,
          text: '前端业务高频算法：大数据渲染（虚拟列表/懒加载/时间分片）、树结构处理（数组转树/扁平化/筛选）、字符串处理（URL 解析/模板字符串）。这些是日常开发与面试都必考的实战题。',
        },
        {
          id: 'p23-2',
          type: 'code',
          language: 'javascript',
          filename: '虚拟列表 + 数组转树',
          code: `// 虚拟列表：只渲染可视区域
function getVisibleRange(scrollTop, viewportHeight, itemHeight, total) {
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 3) // 缓冲 3 项
  const visibleCount = Math.ceil(viewportHeight / itemHeight) + 6
  const end = Math.min(total - 1, start + visibleCount)
  return { start, end, offsetY: start * itemHeight }
}

// 组件实现核心
function VirtualList({ items, itemHeight, viewportHeight }) {
  const [scrollTop, setScrollTop] = useState(0)
  const { start, end, offsetY } = getVisibleRange(
    scrollTop, viewportHeight, itemHeight, items.length
  )
  return (
    <div onScroll={e => setScrollTop(e.target.scrollTop)} style={{ height: viewportHeight, overflow: 'auto' }}>
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {items.slice(start, end + 1).map((item, i) => (
            <div key={start + i} style={{ height: itemHeight }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 数组转树：O(n) 一次遍历（不用递归）
function arrayToTree(items) {
  const map = new Map()
  const roots = []
  // 1. 先建 Map
  items.forEach(item => map.set(item.id, { ...item, children: [] }))
  // 2. 再挂载到父节点
  items.forEach(item => {
    if (item.parentId == null) {
      roots.push(map.get(item.id))
    } else {
      const parent = map.get(item.parentId)
      if (parent) parent.children.push(map.get(item.id))
    }
  })
  return roots
}

// 树扁平化：DFS 拍平为数组
function treeToArray(tree) {
  const result = []
  const stack = [...tree]
  while (stack.length) {
    const node = stack.pop()
    const { children, ...rest } = node
    result.push(rest)
    if (children) stack.push(...children)
  }
  return result
}

// 树筛选：保留命中节点路径（祖先链不能丢）
function filterTree(tree, predicate) {
  return tree
    .map(node => {
      const newNode = { ...node }
      if (node.children) {
        newNode.children = filterTree(node.children, predicate)
      }
      return newNode
    })
    .filter(node => predicate(node) || (node.children && node.children.length > 0))
}`,
        },
        {
          id: 'p23-3',
          type: 'code',
          language: 'javascript',
          filename: 'URL 解析 + 模板字符串',
          code: `// URL 解析（不依赖 URL API，兼容特殊场景）
function parseUrl(url) {
  const result = { protocol: '', host: '', pathname: '', query: {}, hash: '' }
  // 1. hash
  const hashIdx = url.indexOf('#')
  if (hashIdx !== -1) {
    result.hash = url.slice(hashIdx + 1)
    url = url.slice(0, hashIdx)
  }
  // 2. query
  const queryIdx = url.indexOf('?')
  if (queryIdx !== -1) {
    const queryStr = url.slice(queryIdx + 1)
    queryStr.split('&').forEach(pair => {
      const [k, v] = pair.split('=')
      result.query[decodeURIComponent(k)] = decodeURIComponent(v || '')
    })
    url = url.slice(0, queryIdx)
  }
  // 3. protocol
  const protoIdx = url.indexOf('://')
  if (protoIdx !== -1) {
    result.protocol = url.slice(0, protoIdx)
    url = url.slice(protoIdx + 3)
  }
  // 4. host + pathname
  const slashIdx = url.indexOf('/')
  if (slashIdx === -1) {
    result.host = url
    result.pathname = '/'
  } else {
    result.host = url.slice(0, slashIdx)
    result.pathname = url.slice(slashIdx)
  }
  return result
}

// 模板字符串：{{ name }} 占位符替换
function renderTemplate(template, data) {
  return template.replace(/\\{\\{\\s*(.+?)\\s*\\}\\}/g, (match, key) => {
    // 支持 a.b.c 路径
    const value = key.split('.').reduce((obj, k) => obj?.[k], data)
    return value == null ? '' : String(value)
  })
}

// querystring 序列化
function stringifyQuery(obj) {
  return Object.entries(obj)
    .filter(([_, v]) => v != null)
    .map(([k, v]) => \`\${encodeURIComponent(k)}=\${encodeURIComponent(v)}\`)
    .join('&')
}`,
        },
        {
          id: 'p23-4',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '虚拟列表：长表格/聊天记录/商品列表（10w+ 数据）。数组转树：菜单/部门/分类/评论嵌套。树扁平化：树形数据提交后端。URL 解析：路由参数提取、埋点上报。模板渲染：富文本变量填充、国际化占位符。',
        },
        {
          id: 'p23-5',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: '虚拟列表 itemHeight 必须固定（动态高度需预估 + 测量）。数组转树必须两遍遍历（先 Map 后挂载，否则父子顺序错乱）。树筛选保留路径：祖先不命中但有子命中也保留。URL 解析注意编码、空值、数组参数（?a=1&a=2）。',
        },
        {
          id: 'p23-6',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: '实现虚拟列表 / 数组转树 / 树扁平化 / 树筛选 / 树深度计算 / URL 解析 / 模板字符串渲染 / querystring 解析与序列化 / 大文件分片上传。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 24：字符串专项算法
    // ------------------------------------------------------------------------
    {
      order: 24,
      title: '字符串专项算法',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p24-1',
          type: 'paragraph',
          lead: true,
          text: '字符串是前端最高频的数据类型。掌握反转、回文、替换等基础操作，以及双指针/滑动窗口在字符串上的应用，KMP 了解即可。前端场景：表单校验、富文本处理、关键词匹配。',
        },
        {
          id: 'p24-2',
          type: 'code',
          language: 'javascript',
          filename: '字符串高频算法',
          code: `// 反转字符串（原地，双指针）
function reverseString(s) {
  let l = 0, r = s.length - 1
  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]]
    l++; r--
  }
  return s
}

// 回文判断（只考虑字母数字，忽略大小写）
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '')
  let l = 0, r = s.length - 1
  while (l < r) {
    if (s[l] !== s[r]) return false
    l++; r--
  }
  return true
}

// 最长回文子串：中心扩展法 O(n²)
function longestPalindrome(s) {
  let start = 0, maxLen = 1
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) { start = l; maxLen = r - l + 1 }
      l--; r++
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i)     // 奇数中心
    expand(i, i + 1) // 偶数中心
  }
  return s.slice(start, start + maxLen)
}

// 异位词判断：频次统计
function isAnagram(s, t) {
  if (s.length !== t.length) return false
  const count = new Map()
  for (const c of s) count.set(c, (count.get(c) || 0) + 1)
  for (const c of t) {
    if (!count.has(c)) return false
    count.set(c, count.get(c) - 1)
    if (count.get(c) < 0) return false
  }
  return true
}

// KMP 字符串匹配：next 数组 + 匹配（了解级）
function kmp(text, pattern) {
  const next = buildNext(pattern)
  let i = 0, j = 0
  while (i < text.length && j < pattern.length) {
    if (j === -1 || text[i] === pattern[j]) { i++; j++ }
    else j = next[j]
  }
  return j === pattern.length ? i - j : -1
}
function buildNext(p) {
  const next = [-1]
  let i = 0, j = -1
  while (i < p.length - 1) {
    if (j === -1 || p[i] === p[j]) next[++i] = ++j
    else j = next[j]
  }
  return next
}`,
        },
        {
          id: 'p24-3',
          type: 'callout',
          variant: 'tip',
          title: '前端落地场景',
          text: '表单校验（手机号/邮箱/密码强度正则）。富文本处理（标签剥离、emoji 长度计算用 Array.from）。关键词匹配与高亮（split + 拼接）。URL slug 生成（去除特殊字符、空格转 -）。字符串模板编译（mustache 语法）。',
        },
        {
          id: 'p24-4',
          type: 'callout',
          variant: 'warning',
          title: '边界与易错点',
          text: 'JS 字符串不可变，s[i]=x 无效，必须用 split/join 或数组操作。emoji/中文长度问题：str.length 是 UTF-16 单元数，emoji 可能占 2，用 [...str].length 取字符数。正则的贪婪/非贪婪模式易错。KMP 的 next 数组下标含义统一才能写对。',
        },
        {
          id: 'p24-5',
          type: 'callout',
          variant: 'note',
          title: '典型例题',
          text: 'LC344 反转字符串 / LC125 验证回文 / LC5 最长回文子串 / LC242 有效的字母异位词 / LC28 实现 strStr() / LC14 最长公共前缀 / LC151 反转字符串里的单词。',
        },
      ],
    },

    // ========================================================================
    // 第六篇：面试与实战体系篇
    // ========================================================================

    // ------------------------------------------------------------------------
    // 知识点 25：分阶段刷题路线
    // ------------------------------------------------------------------------
    {
      order: 25,
      title: '分阶段刷题路线',
      difficulty: 1,
      isNew: true,
      blocks: [
        {
          id: 'p25-1',
          type: 'paragraph',
          lead: true,
          text: '刷题不在多在精。按入门→进阶→冲刺三阶段，每阶段聚焦核心题型，配合前端高频题号清单。每题先 30 分钟独立思考，再看题解总结模板，3 天后重写验证。',
        },
        {
          id: 'p25-2',
          type: 'table',
          caption: '三阶段刷题路线',
          headers: ['阶段', '目标', '核心题型', '建议题量'],
          rows: [
            ['入门', '熟悉基础数据结构', '数组/字符串/哈希/栈队列/链表基础', '50 题'],
            ['进阶', '掌握算法思想', '树/回溯/贪心/基础 DP/双指针/二分', '80 题'],
            ['冲刺', '面试高频压轴', '图/DP 进阶/手写题/中等压轴/Hard 精选', '50 题'],
          ],
        },
        {
          id: 'p25-3',
          type: 'table',
          caption: '前端高频 LeetCode 题号清单',
          headers: ['类型', '题号与名称', '难度', '前端关联'],
          rows: [
            ['数组哈希', 'LC1 两数之和 / LC49 字母异位词分组', '简单/中等', '数据聚合'],
            ['双指针', 'LC15 三数之和 / LC42 接雨水', '中等/困难', '滑动窗口限流'],
            ['链表', 'LC206 反转链表 / LC141 环形链表 / LC21 合并有序链表', '简单/简单/简单', 'LRU 缓存'],
            ['栈队列', 'LC20 有效括号 / LC155 最小栈 / LC232 用栈实现队列', '简单/简单/简单', '调用栈/任务队列'],
            ['树', 'LC104 二叉树最大深度 / LC102 层序遍历 / LC236 最近公共祖先', '简单/中等/中等', 'DOM 遍历'],
            ['回溯', 'LC46 全排列 / LC39 组合总和 / LC78 子集', '中等/中等/中等', '决策枚举'],
            ['DP', 'LC70 爬楼梯 / LC300 LIS / LC322 零钱兑换 / LC72 编辑距离', '简单/中等/中等/中等', 'Vue3 Diff'],
            ['图', 'LC200 岛屿数量 / LC207 课程表 / LC133 克隆图', '中等/中等/中等', '依赖图'],
            ['手写', 'LC146 LRU / LC460 LFU / LC380 O(1) 插入删除随机', '中等/困难/中等', '缓存/随机算法'],
          ],
        },
        {
          id: 'p25-4',
          type: 'callout',
          variant: 'tip',
          title: '刷题方法论',
          text: '1. 同题型集中刷（一次掌握一个模板）2. 错题本记录思路而非代码 3. 3 天后重写不看答案 4. 一题多解（暴力→优化→最优）5. 模拟面试讲思路（训练表达能力）。LeetCode 50/100/Hot 100 是必刷清单。',
        },
        {
          id: 'p25-5',
          type: 'callout',
          variant: 'warning',
          title: '常见误区',
          text: '只刷 Hard 不刷 Easy（基础不牢）。只看题解不写代码（眼高手低）。追求题量不总结模板（不会举一反三）。忽视前端手写题（面试更常考手写）。刷完不复盘（隔月全忘）。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 26：面试答题方法论
    // ------------------------------------------------------------------------
    {
      order: 26,
      title: '面试答题方法论',
      difficulty: 1,
      isNew: true,
      blocks: [
        {
          id: 'p26-1',
          type: 'paragraph',
          lead: true,
          text: '面试考的不是「能不能 AC」，而是「思考过程是否清晰」。四步答题法：理解题意 → 讲解思路 → 代码实现 → 复杂度分析。优化推导：暴力解 → 基础优化 → 最优解，展现递进思维。',
        },
        {
          id: 'p26-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            language: 'text',
            lines: [
              '题目：给定数组和目标值，返回两数之和的下标',
              '',
              '【步骤 1：理解题意】',
              '  - 输入：nums = [2,7,11,15], target = 9',
              '  - 输出：[0,1]（nums[0]+nums[1]=9）',
              '  - 确认：每个输入恰有一个解，不能复用同一元素',
              '',
              '【步骤 2：讲解思路（递进式）】',
              '  - 暴力：双重循环枚举 O(n²)',
              '  - 优化：哈希表存已遍历值 O(n) 一次遍历',
              '  - 选用哈希表方案：空间换时间',
              '',
              '【步骤 3：代码实现】',
              '  const map = new Map()',
              '  for (let i = 0; i < nums.length; i++) {',
              '    const need = target - nums[i]',
              '    if (map.has(need)) return [map.get(need), i]',
              '    map.set(nums[i], i)',
              '  }',
              '',
              '【步骤 4：复杂度分析】',
              '  - 时间 O(n)：一次遍历',
              '  - 空间 O(n)：哈希表最坏存 n 个',
              '  - 边界：空数组返回 []，无解返回 []',
            ],
            steps: [
              { title: '理解题意', description: '复述题目，举例子，确认边界与假设', highlightLines: [3, 4, 5, 6] },
              { title: '讲解思路', description: '从暴力开始，逐步优化，讲清取舍', highlightLines: [9, 10, 11, 12] },
              { title: '代码实现', description: '先写骨架再填逻辑，变量命名清晰', highlightLines: [15, 16, 17, 18, 19, 20] },
              { title: '复杂度分析', description: '主动说时间/空间，并讨论边界', highlightLines: [23, 24, 25, 26] },
            ],
          },
        },
        {
          id: 'p26-3',
          type: 'table',
          caption: '面试常见题型答题模板',
          headers: ['题型', '切入思路', '优化方向', '易加分点'],
          rows: [
            ['数组/字符串', '暴力双循环', '哈希表/双指针/滑动窗口', '主动说边界（空/单/重复）'],
            ['链表', '画图模拟', '虚拟头节点/快慢指针', '强调指针断裂风险'],
            ['树', '递归（DFS）', '迭代栈/BFS 层序', '讨论递归爆栈场景'],
            ['DP', '画状态转移表', '滚动数组/状态压缩', '说清初始化与遍历顺序'],
            ['手写题', '先写基础版', '补边界/补选项', '提性能/兼容性考量'],
          ],
        },
        {
          id: 'p26-4',
          type: 'callout',
          variant: 'tip',
          title: '加分动作',
          text: '1. 写代码前先用例子走一遍（边讲边画）2. 变量命名有意义（不用 a/b/c）3. 边界主动讨论（空/单元素/极值）4. 写完用例子验证 5. 主动说复杂度并提优化方向 6. 提前端落地场景。',
        },
        {
          id: 'p26-5',
          type: 'callout',
          variant: 'warning',
          title: '扣分动作',
          text: '沉默 5 分钟不说话（面试官无法判断思路）。直接写最优解不解释（显得背题）。卡住不求助（应该问「能否给个提示」）。代码不缩进/无注释。忽略边界条件。回答「会用 sort 但不说复杂度」。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 27：全域易错点汇总
    // ------------------------------------------------------------------------
    {
      order: 27,
      title: '全域易错点汇总',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p27-1',
          type: 'paragraph',
          lead: true,
          text: '算法题 80% 的 bug 来自边界与语言特性坑。汇总 JavaScript 语言坑、算法通用边界错误、复杂度分析误区三大类，刷题前过一遍能少踩一半坑。',
        },
        {
          id: 'p27-2',
          type: 'table',
          caption: 'JavaScript 语言坑',
          headers: ['坑点', '错误示例', '正确做法', '原因'],
          rows: [
            ['引用类型赋值', 'const a=b; a.x=1 // b 也变', '深拷贝或解构', '对象赋值是引用'],
            ['数组方法副作用', 'arr.sort() // 原数组变了', 'arr.slice().sort()', 'sort 原地修改'],
            ['sort 默认字典序', '[10,2,9].sort() // [10,2,9]', 'sort((a,b)=>a-b)', '默认转字符串排序'],
            ['递归爆栈', '递归深度 1w 报错', '改迭代或尾递归', '调用栈上限 ~1w'],
            ['浮点精度', '0.1+0.2!==0.3', '乘以 10 转整数', 'IEEE 754 精度'],
            ['== 隐式转换', '0==[] // true', '用 ===', '类型强制转换'],
            ['map/set 引用键', 'new Map().set({},1) 两次', '用字符串键', '对象键按引用比较'],
          ],
        },
        {
          id: 'p27-3',
          type: 'table',
          caption: '算法通用边界错误',
          headers: ['错误', '场景', '修复'],
          rows: [
            ['空数组未判', 'arr[0] 访问 undefined', 'if (!arr.length) return'],
            ['单元素漏处理', 'n=1 时返回错', '单独处理 n<=1'],
            ['极值初始化', 'max=0 但全是负数', 'max=-Infinity'],
            ['重复元素去重', '排列 [1,1] 重复', 'sort + 同层跳过 nums[i]===nums[i-1]'],
            ['visited 未标记', '图/矩阵 DFS 死循环', '进入即标记，回溯撤销'],
            ['整数溢出', 'n*m 超 2³¹', '用 BigInt 或 Number'],
            ['区间边界', '左闭右开 vs 左闭右闭混用', '统一约定并注释'],
          ],
        },
        {
          id: 'p27-4',
          type: 'table',
          caption: '复杂度分析误区',
          headers: ['误区', '错误认知', '正确分析'],
          rows: [
            ['忽略递归栈空间', '归并排序空间 O(1)', '空间 O(n)（临时数组 + log n 栈）'],
            ['混淆平均与最差', '快排 O(n log n)', '平均 O(n log n)，最差 O(n²)'],
            ['忽视隐式遍历', 'O(n) 但内层有 shift', 'shift O(n)，实际 O(n²)'],
            ['哈希表当 O(1)', '以为所有操作 O(1)', '最差哈希冲突 O(n)，平均 O(1)'],
            ['忽略常数因子', 'O(n) 一定比 O(n log n) 快', 'n 小时 O(n log n) 可能更快'],
          ],
        },
        {
          id: 'p27-5',
          type: 'callout',
          variant: 'tip',
          title: '调试三步法',
          text: '1. 用最小用例走查（手画每步变量）2. 加 console.log 在关键节点打印 3. 二分注释定位 bug。LeetCode 用「执行结果」看用例，本地用断言自动测试。卡超过 30 分钟就看题解，别死磕。',
        },
        {
          id: 'p27-6',
          type: 'callout',
          variant: 'warning',
          title: '面试防坑清单',
          text: '写代码前先问：输入范围？是否有序？有无重复？空输入怎么返回？JS 特别注意：sort 必须传比较函数、对象/数组传引用需拷贝、递归深度超 1w 改迭代、浮点用整数运算避免精度问题。',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 28：数据结构与算法速查表
    // ------------------------------------------------------------------------
    {
      order: 28,
      title: '数据结构与算法速查表',
      difficulty: 1,
      isNew: true,
      blocks: [
        {
          id: 'p28-1',
          type: 'paragraph',
          lead: true,
          text: '考前一晚冲刺速查：数据结构操作复杂度、排序算法对比、算法思想一句话定义。背熟这张表，面试被问复杂度时脱口而出。',
        },
        {
          id: 'p28-2',
          type: 'demo',
          visualizationType: 'flipcard',
          data: {
            cards: [
              { front: '数组随机访问', frontSub: 'Array', back: 'O(1) 按下标访问；插入/删除 O(n) 需移动元素' },
              { front: '链表插入删除', frontSub: 'Linked List', back: 'O(1) 已知节点时；查找 O(n) 必须遍历' },
              { front: '哈希表查找', frontSub: 'Hash Table', back: '平均 O(1)，最差 O(n)（哈希冲突）；空间换时间' },
              { front: '二叉搜索树', frontSub: 'BST', back: '查找/插入/删除 O(log n) 平均，O(n) 最差（退化成链表）' },
              { front: '堆的插入/删除', frontSub: 'Heap', back: 'O(log n) 上浮/下沉；建堆 O(n)；取堆顶 O(1)' },
              { front: '快排', frontSub: 'Quick Sort', back: '平均 O(n log n)，最差 O(n²)；不稳定；空间 O(log n) 栈' },
              { front: '归并排序', frontSub: 'Merge Sort', back: 'O(n log n) 稳定；空间 O(n)；适合链表与外部排序' },
              { front: '二分查找', frontSub: 'Binary Search', back: 'O(log n)；前提有序；注意区间开闭与边界' },
              { front: 'DFS / BFS', frontSub: 'Graph Traversal', back: '时间 O(V+E)；DFS 空间 O(h) 栈，BFS 空间 O(w) 队列' },
              { front: '动态规划', frontSub: 'DP', back: '最优子结构 + 重叠子问题；五步法：定义/递推/初始化/顺序/推导' },
              { front: '回溯', frontSub: 'Backtracking', back: '决策树 DFS；三要素：路径/选择/终止；模板 path.push→递归→pop' },
              { front: '滑动窗口', frontSub: 'Sliding Window', back: 'O(n)；左右指针维护连续区间；valid 满足则收缩左边界' },
            ],
          },
        },
        {
          id: 'p28-3',
          type: 'table',
          caption: '数据结构操作复杂度速查',
          headers: ['结构', '访问', '查找', '插入', '删除', '空间'],
          rows: [
            ['数组', 'O(1)', 'O(n)', 'O(n)', 'O(n)', 'O(n)'],
            ['链表', 'O(n)', 'O(n)', 'O(1)', 'O(1)', 'O(n)'],
            ['哈希表', '—', 'O(1)', 'O(1)', 'O(1)', 'O(n)'],
            ['BST（平衡）', 'O(log n)', 'O(log n)', 'O(log n)', 'O(log n)', 'O(n)'],
            ['堆', 'O(1) 堆顶', 'O(n)', 'O(log n)', 'O(log n)', 'O(n)'],
            ['Trie', '—', 'O(m) m=键长', 'O(m)', 'O(m)', 'O(总字符数)'],
          ],
        },
        {
          id: 'p28-4',
          type: 'table',
          caption: '算法思想一句话',
          headers: ['思想', '核心', '适用场景', '代表题'],
          rows: [
            ['双指针', '两指针协同遍历', '有序数组/链表', 'LC15 三数之和'],
            ['滑动窗口', '左右指针维护区间', '子数组/子串', 'LC76 最小覆盖子串'],
            ['二分', '每次折半', '有序搜索', 'LC33 旋转数组'],
            ['回溯', '决策树 DFS + 撤销', '组合/排列/子集', 'LC46 全排列'],
            ['分治', '分解→解决→合并', '可拆分独立子问题', 'LC23 合并 K 链表'],
            ['贪心', '局部最优→全局', '有贪心选择性质', 'LC55 跳跃游戏'],
            ['DP', '状态转移+缓存', '重叠子问题+最优子结构', 'LC300 LIS'],
            ['位运算', '二进制位操作', '状态压缩/权限', 'LC136 只出现一次'],
          ],
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 29：面试题精选
    // ------------------------------------------------------------------------
    {
      order: 29,
      title: '面试题精选',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p29-1',
          type: 'paragraph',
          lead: true,
          text: '前端算法面试高频题精选 30 题，覆盖原理/对比/场景/手写四类。flashcard 模式翻转看答案，先尝试自答再核对。',
        },
        {
          id: 'p29-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: true,
            defaultMode: 'flashcard',
            defaultOpen: [],
            items: [
              {
                title: 'Q1: JS 数组的 shift/unshift 为什么是 O(n)？如何优化队列？',
                content: '原因：\n\n- JS 数组底层是动态数组（哈希表 + 连续索引），shift/unshift 需要把所有后续元素下标整体移动一位。\n- 时间 O(n)，频繁头插尾删性能差。\n\n优化队列：\n\n1. 基于对象 + head/tail 指针：O(1) 出队入队。\n2. 循环队列：定长数组 + 取模运算，无元素移动。\n3. 双栈队列：入队栈 + 出队栈，均摊 O(1)。',
              },
              {
                title: 'Q2: 哈希表为什么平均 O(1)？哈希冲突怎么解决？',
                content: 'O(1) 原因：\n\n- 哈希函数把 key 映射到数组下标，访问数组下标是 O(1)。\n- 理想情况下每个桶只有 1 个元素，查找常数时间。\n\n冲突解决：\n\n1. 链地址法：每个桶挂链表（Java HashMap），冲突多时转红黑树。\n2. 开放地址法：冲突后探测下一个空位（线性探测/二次探测/双重哈希）。\n3. 扩容：load factor > 0.75 时翻倍 + 重哈希。\n\n最差 O(n)：所有 key 哈希到同一桶（恶意构造输入）。',
              },
              {
                title: 'Q3: 快排为什么最差 O(n²)？怎么优化？',
                content: '最差场景：\n\n- 基准选最左/最右且数组已有序，每次 partition 只分出 1 个元素，递归深度 n，总 O(n²)。\n\n优化：\n\n1. 随机基准：随机选 pivot，期望 O(n log n)。\n2. 三数取中：取 arr[lo]/arr[mid]/arr[hi] 的中位数作基准。\n3. 小数组转插入排序：n < 10 时插入更快（常数小）。\n4. 三路快排：把等于 pivot 的单独分一组，避免大量重复元素退化。\n\nV8 的 Array.sort 用 TimSort（归并+插入），不用快排。',
              },
              {
                title: 'Q4: 二叉树前中后序遍历的迭代实现思路？',
                content: '前序（根左右）：\n\n- 栈，先压右再压左（出栈即左先）。\n\n中序（左根右）：\n\n- 一路向左压栈，到叶子后弹出访问，再转向右子树。\n\n后序（左右根）：\n\n- 前序变体：根右左（先压左再压右），最后反转结果。\n- 或用统一迭代模板：栈中存 null 标记访问时机。\n\n统一迭代模板：\n```\nstack.push(root)\nwhile (stack.length) {\n  const node = stack.pop()\n  if (!node) { res.push(stack.pop().val); continue }\n  // 按「逆序」压栈，中间插入 null 标记\n  // 后序：右左中 → 压 中(null) 右 左\n}\n```',
              },
              {
                title: 'Q5: BFS 为什么能找最短路径？DFS 不行？',
                content: 'BFS 找最短路径：\n\n- BFS 按层扩展，第一次访问到目标时经过的边数最少（无权图最短）。\n- 因为先访问距离 1 的所有点，再访问距离 2 的，天然按距离排序。\n\nDFS 不行：\n\n- DFS 一条路走到底，可能绕远路才到目标，第一次到的不一定最短。\n- DFS 找所有路径后取最短也行，但效率远低于 BFS。\n\n有权图最短路径：Dijkstra（优先队列 BFS）/ Bellman-Ford（允许负权）。',
              },
              {
                title: 'Q6 【对比题】: 动态规划与贪心的本质区别？',
                content: '贪心：\n\n- 每步选当前最优，不可撤销。\n- 要求问题有「贪心选择性质」（局部最优能推导全局最优）。\n- 不要求枚举所有状态，效率高 O(n log n) 或 O(n)。\n- 例子：跳跃游戏、区间调度。\n\nDP：\n\n- 枚举所有状态转移，从子问题最优推导全局最优。\n- 要求「最优子结构」+「重叠子问题」。\n- 效率较低 O(n²) 或更高，但能解贪心不能解的问题。\n- 例子：0-1 背包（贪心按性价比会错）、LCS、编辑距离。\n\n判断：能用贪心证明就用贪心，证明不了就用 DP。',
              },
              {
                title: 'Q7: 0-1 背包为什么用逆序遍历？完全背包用顺序？',
                content: '0-1 背包逆序：\n\n- 每个物品只能选一次，dp[w] 依赖上一轮的 dp[w-weights[i]]（未选过当前物品）。\n- 逆序保证计算 dp[w] 时 dp[w-weights[i]] 还是上一轮的值。\n- 顺序会导致同一物品被选多次（变成完全背包）。\n\n完全背包顺序：\n\n- 每个物品可选无限次，dp[w] 依赖本轮已更新的 dp[w-weights[i]]（已选过当前物品还可再选）。\n- 顺序遍历让 dp[w-weights[i]] 先被更新，dp[w] 累加含当前物品的方案。\n\n口诀：0-1 逆序防重复，完全顺序允重复。',
              },
              {
                title: 'Q8 【对比题】: LRU 与 LFU 的区别？为什么 LRU 更常用？',
                content: 'LRU（Least Recently Used）：\n\n- 淘汰最久未访问的。\n- 实现：Map（插入序）或双向链表 + 哈希表。\n- get/put O(1)。\n\nLFU（Least Frequently Used）：\n\n- 淘汰访问次数最少的（次数相同再按 LRU）。\n- 实现：两个哈希表（频次→节点链表 + key→节点）。\n- get/put O(log n) 或 O(1)（复杂）。\n\nLRU 更常用原因：\n\n1. 实现简单，常数小。\n2. 局部性原理：近期访问的更可能再被访问。\n3. LFU 的「频率」可能过时（旧热点不再访问但次数高）。\n\nVue keep-alive、Redis 缓存默认都用 LRU。',
              },
              {
                title: 'Q9 【场景题】: Vue3 Diff 为什么要用 LIS（最长递增子序列）？',
                content: '原因：\n\n- Diff 的核心目标是「最小化 DOM 操作」，DOM 移动比 patch 更贵。\n- 旧节点在新列表中的相对顺序，如果有递增段，说明这些节点相对位置不变，无需移动。\n- LIS 就是找最长的「相对顺序不变」的节点集合，剩余节点才需要移动。\n\n例子：\n- 旧 [a,b,c,d,e] → 新 [a,c,b,d,f]\n- b,c 在新列表中位置反转，但 a,d 相对顺序不变。\n- LIS 求 [a,d] 无需移动，只移动 b,c，挂载 f，卸载 e。\n\nVue3 比 Vue2（双端对比）更优：能处理中间乱序段。',
              },
              {
                title: 'Q10 【对比题】: 防抖与节流的区别？分别用于什么场景？',
                content: '区别：\n\n- 防抖 debounce：连续触发只在最后一次后等待 wait 才执行（合并多次为一次）。\n- 节流 throttle：每 wait 毫秒最多执行一次（稀释执行频率）。\n\n场景：\n\n- 防抖：搜索框输入（停止输入才查询）、表单字段校验、resize 末态。\n- 节流：scroll 滚动加载、mousemove 拖拽、按钮防连点。\n\n实现关键：\n\n- 防抖：clearTimeout + setTimeout，每次触发都重置定时器。\n- 节流：记录上次执行时间，当前时间 - 上次 >= wait 才执行。',
              },
              {
                title: 'Q11: 深拷贝为什么必须用 WeakMap？',
                content: '原因：\n\n1. 解决循环引用：对象属性引用自身或祖先，递归会无限循环爆栈。WeakMap 记录已拷贝对象，遇到引用直接返回缓存拷贝。\n2. 内存不泄漏：WeakMap 对键是弱引用，原始对象被 GC 时对应条目自动清除。用 Map 会强引用导致内存泄漏。\n3. 性能：WeakMap 查找 O(1)，比遍历数组找已拷贝对象快。\n\n注意：\n\n- WeakMap 键必须是对象，原始值不需要缓存。\n- 拷贝 Date/RegExp/Map/Set 需特殊处理。\n- 函数一般不深拷贝（直接引用即可）。',
              },
              {
                title: 'Q12: Promise 限流为什么要用 worker 模式？',
                content: '原因：\n\n- 简单递归 + 计数器实现，任务完成回调里递归调用下一个，逻辑复杂易错。\n- worker 模式：启动 limit 个 worker，每个 worker 循环抢任务（i++），完成后继续抢。\n- 优势：\n  1. 并发数严格等于 limit。\n  2. 任务索引同步自增，无竞态。\n  3. 结果按原 idx 保序存入数组。\n  4. await Promise.all(workers) 一行等待全部完成。\n\n关键：i++ 必须在 await 之前（同步执行），否则多个 worker 会抢到同一索引。',
              },
              {
                title: 'Q13 【场景题】: 虚拟列表为什么必须固定 itemHeight？动态高度怎么做？',
                content: '固定高度原因：\n\n- start/end/offsetY 都靠 itemHeight 直接计算，O(1)。\n- 滚动时无需重新测量，性能稳定。\n\n动态高度方案：\n\n1. 预估高度：初始用 estimateHeight，渲染后测量真实高度更新缓存。\n2. 位置缓存：维护 positions 数组存每个项的 offsetTop，二分查找 start。\n3. 增量更新：滚动时只更新可视区项的精确高度。\n4. 滚动条修正：totalHeight 用缓存累加，避免滚动条跳动。\n\n库：react-window（固定）/ react-virtualized（动态）/ vue-virtual-scroller。',
              },
              {
                title: 'Q14 【场景题】: 数组转树为什么不能一次遍历？',
                content: '可以一次遍历，但两遍更清晰：\n\n两遍法（推荐）：\n\n1. 第一遍：建 Map（id → node），所有节点先入 Map。\n2. 第二遍：遍历原数组，把每个节点挂到 parentId 对应的父节点 children。\n\n一次遍历的问题：\n\n- 子节点可能先于父节点出现，挂载时父节点还没建。\n- 需要额外维护「待挂载」队列，遇到父节点时补挂。\n- 逻辑复杂，性能差异可忽略。\n\n时间复杂度：两遍法 O(n)，比递归 O(n²) 快。',
              },
              {
                title: 'Q15: KMP 相比暴力匹配优势在哪？为什么前端面试只要求了解？',
                content: '优势：\n\n- 暴力匹配最差 O(n·m)（每次失败回退主串指针）。\n- KMP 利用 next 数组（模式串的最长公共前后缀），失败时主串不回退，模式串跳到 next[j]，O(n+m)。\n\n前端只要求了解的原因：\n\n1. 业务中正则表达式已覆盖 99% 字符串匹配需求。\n2. KMP 面试出现频率低（除非面基础架构/搜索团队）。\n3. next 数组构建容易写错，性价比低。\n4. 前端更看重手写题（防抖/深拷贝/Promise）与框架算法（Diff/Fiber）。\n\n建议：理解原理 + 记住模板，能讲清 next 数组含义即可。',
              },
              {
                title: 'Q16: 如何用栈实现队列？为什么需要两个栈？',
                content: '思路：\n\n- 队列 FIFO，栈 LIFO，单个栈无法反转顺序。\n- 两个栈：inStack（入队栈）+ outStack（出队栈）。\n\n操作：\n\n- push(x)：直接压入 inStack，O(1)。\n- pop()：若 outStack 空，把 inStack 全部弹出压入 outStack（反转顺序），再弹出 outStack 顶。均摊 O(1)。\n- peek()：同 pop 但不弹出。\n\n均摊 O(1) 分析：\n\n- 每个元素最多被压入/弹出各 2 次（inStack 1 次 + outStack 1 次），总操作 O(4n)，均摊 O(1)。\n\nLC232 用栈实现队列。',
              },
              {
                title: 'Q17: 单调栈解决什么问题？通用模板？',
                content: '适用问题：\n\n- 找「下一个更大/更小元素」。\n- 例：每日温度（下一个更高温度在几天后）、下一个更大元素 II。\n\n通用模板：\n```\nfunction nextGreater(nums) {\n  const res = new Array(nums.length).fill(-1)\n  const stack = [] // 单调递减栈（栈底到栈顶递减）\n  for (let i = 0; i < nums.length; i++) {\n    while (stack.length && nums[stack[stack.length-1]] < nums[i]) {\n      const top = stack.pop()\n      res[top] = nums[i] // top 的下一个更大元素是 nums[i]\n    }\n    stack.push(i)\n  }\n  return res\n}\n```\n\n关键：栈存索引而非值，便于回填结果。',
              },
              {
                title: 'Q18: 并查集的路径压缩与按秩合并？',
                content: '并查集：判断连通性，O(α(n)) 近似 O(1)。\n\n路径压缩：\n```\nfind(x) {\n  if (parent[x] !== x) parent[x] = find(parent[x])\n  return parent[x]\n}\n```\n- 查找时把路径上所有节点直接挂到根，下次 O(1)。\n\n按秩合并：\n```\nunion(x, y) {\n  const px = find(x), py = find(y)\n  if (rank[px] < rank[py]) parent[px] = py\n  else if (rank[px] > rank[py]) parent[py] = px\n  else { parent[py] = px; rank[px]++ }\n}\n```\n- 小树挂大树，避免链式退化。\n\n两者结合：均摊 O(α(n)) ≈ O(1)，几乎不可能再快。',
              },
              {
                title: 'Q19 【对比题】: 堆与二叉搜索树的区别？为什么 TopK 用堆？',
                content: '区别：\n\n- BST：左 < 根 < 右，查找任意值 O(log n)，可中序遍历得有序序列。\n- 堆：完全二叉树 + 父子大小关系（大顶堆父>子），只能取堆顶 O(1)，查找任意值 O(n)。\n\nTopK 用堆的原因：\n\n- 维护大小为 K 的最小堆，遍历数组时比堆顶大的才入堆。\n- 时间 O(n log K)，空间 O(K)。\n- 对比排序 O(n log n) + O(n)：堆更快且省空间。\n- 对比快速选择 O(n) 平均：快选虽快但无法处理数据流（堆可流式处理）。\n\n场景：热门商品 Top10、实时排行榜、React 任务优先级调度。',
              },
              {
                title: 'Q20: 滑动窗口最大值为什么用单调队列？',
                content: '问题：\n\n- 滑动窗口求每窗口最大值，朴素法 O(n·k)。\n- 用堆需删除非堆顶元素（懒删除），实现复杂。\n\n单调队列：\n```\nfunction maxSlidingWindow(nums, k) {\n  const res = [], q = [] // 存索引，队首是当前窗口最大\n  for (let i = 0; i < nums.length; i++) {\n    // 1. 队首出窗口\n    while (q.length && q[0] <= i - k) q.shift()\n    // 2. 队尾比当前小则弹出（保持单调递减）\n    while (q.length && nums[q[q.length-1]] <= nums[i]) q.pop()\n    q.push(i)\n    // 3. 窗口形成后记录队首\n    if (i >= k - 1) res.push(nums[q[0]])\n  }\n  return res\n}\n```\n\n时间 O(n)（每个元素入队出队各一次），空间 O(k)。',
              },
              {
                title: 'Q21 【对比题】: Trie 字典树相比哈希表的优势？',
                content: 'Trie 优势：\n\n1. 前缀匹配：找所有以「app」开头的词（autocomplete），哈希表做不到。\n2. 共享前缀：存储 "apple" + "app" 只用一份 "app" 节点，省空间。\n3. 字典序遍历：DFS Trie 得到有序结果，无需排序。\n4. 最长前缀匹配：路由匹配（/api/user/:id）天然适配。\n\n哈希表优势：\n\n1. 精确查找 O(1)（Trie 是 O(m)，m=键长）。\n2. 实现简单，常数小。\n3. 不限键类型（Trie 只适合字符串）。\n\n场景：路由（Vue Router/Express）、输入联想、IP 路由表、拼写检查。',
              },
              {
                title: 'Q22 【对比题】: 图的邻接矩阵与邻接表怎么选？',
                content: '邻接矩阵：\n\n- 二维数组 graph[i][j] 表示边权。\n- 空间 O(V²)，稠密图适用。\n- 查边 O(1)，遍历邻接点 O(V)（要扫一行）。\n\n邻接表：\n\n- 数组 + 链表（或 Map），graph[i] 存 i 的邻接点列表。\n- 空间 O(V+E)，稀疏图适用（实际多数是稀疏图）。\n- 查边 O(deg(i))，遍历邻接点 O(deg(i))。\n\n选择：\n\n- 稠密图（E ≈ V²）：矩阵，如完全图、社交关系。\n- 稀疏图（E << V²）：邻接表，如网页链接、依赖图。\n- 前端场景（依赖图、组件树）几乎都是稀疏图，用邻接表。',
              },
              {
                title: 'Q23: 拓扑排序的本质？只能用 DFS 吗？',
                content: '本质：\n\n- 给有向无环图（DAG）的节点排成线性顺序，使所有边的方向一致。\n- 应用：任务依赖（先修课程、构建顺序、模块加载）。\n\n实现：\n\n1. DFS 后序逆序：递归访问，节点出栈时加入结果，最后反转。\n2. BFS（Kahn 算法）：维护入度数组，入度 0 的入队，弹出时把邻接点入度 -1，新的 0 入队。\n\n检测环：\n\n- DFS：三色标记（白/灰/黑），遇到灰节点说明有环。\n- BFS：若结果长度 < 节点数，说明有环（环内节点入度永远不为 0）。\n\n场景：Webpack 模块依赖图、Vue 组件依赖、Monorepo 任务调度（turbo）。',
              },
              {
                title: 'Q24 【场景题】: 时间分片（requestIdleCallback）为什么不能用于动画？',
                content: '原因：\n\n1. 触发时机不稳定：只在浏览器空闲时触发，繁忙时可能几十毫秒不调用，动画卡顿。\n2. 优先级低：会被任何用户输入/渲染任务抢占。\n3. 隐藏标签页不触发：切到后台动画会停。\n4. deadline 限制：单次回调最多 50ms，长动画需要切片。\n\n动画应该用 requestAnimationFrame：\n\n1. 与浏览器渲染节拍对齐（每帧 16.67ms）。\n2. 保证流畅（60fps）。\n3. 隐藏标签页自动暂停（省电）。\n\nrIC 适合：日志上报、数据预处理、长列表分帧渲染、低优先级计算。',
              },
              {
                title: 'Q25 【对比题】: 归并排序与快速排序的取舍？',
                content: '归并排序：\n\n- 稳定排序，时间恒定 O(n log n)（最差也是）。\n- 需要额外 O(n) 空间（非原地）。\n- 适合链表排序、外部排序（大文件分块归并）。\n\n快速排序：\n\n- 不稳定（最差 O(n²)，随机化后期望 O(n log n)）。\n- 原地排序，空间 O(log n)（递归栈）。\n- 常数因子小，实际比归并快。\n- 适合内存数组排序。\n\n选择：\n\n- 需要稳定性 → 归并（Java 对象排序用 TimSort 即归并变体）。\n- 追求速度 + 原地 → 快排（C++ std::sort 即快排变体）。\n- V8 的 Array.sort 用 TimSort（归并 + 插入），兼顾稳定与性能。',
              },
              {
                title: 'Q26: 二分查找的边界条件怎么写才不会死循环？',
                content: '核心：明确「循环不变量」——区间 [left, right] 的含义。\n\n左闭右闭 [left, right]：\n\n- while (left <= right)，因为 right 是合法候选。\n- mid = (left + right) >> 1。\n- 找目标：命中返回；目标小则 right = mid - 1；目标大则 left = mid + 1。\n- 退出时 left > right，left 即插入位置。\n\n左闭右开 [left, right)：\n\n- while (left < right)，因为 right 不是合法候选。\n- 找目标：目标小则 right = mid；目标大则 left = mid + 1。\n- 退出时 left === right，left 即答案。\n\n防死循环要点：\n\n- mid = left + (right - left) / 2 防溢出。\n- 缩小区间必须让 left 或 right 至少移动一位（left = mid + 1 或 right = mid - 1），否则区间不变死循环。\n\n应用：查找插入位置（LC35）、查找第一个/最后一个（LC34）。',
              },
              {
                title: 'Q27: 位运算有哪些常用技巧与前端场景？',
                content: '常用技巧：\n\n1. 判奇偶：n & 1，0 偶 1 奇，比 % 2 快。\n2. 交换两数：a ^= b; b ^= a; a ^= b，无需临时变量。\n3. 乘除 2：n << 1 等价 n * 2，n >> 1 等价 n / 2（正数）。\n4. 清最低位的 1：n & (n - 1)，用于统计 1 的个数（Brian Kernighan 法）。\n5. 取最低位的 1：n & -n，等价 n & (~n + 1)，用于树状数组。\n6. 异或去重：a ^ a = 0，a ^ 0 = a，找唯一出现一次的数。\n\n前端场景：\n\n- 权限位掩码：const PERM = { READ: 1, WRITE: 2, EXEC: 4 }，has = perm & PERM.READ。\n- React fibers 的 flags：Placement | Update | ChildDeletion 用位运算合并判断。\n- Webpack 的 module.id 与 chunk 关系用 bitmask。\n\n注意：JS 位运算操作 32 位有符号整数，大数（>2^31）会出错。',
              },
              {
                title: 'Q28 【场景题】: 千万级数据的前端渲染如何用算法优化？',
                content: '问题拆解：\n\n- 千万级数据无法一次性渲染（DOM 节点上限 + 内存 + 渲染阻塞）。\n- 核心思路：只渲染可视区 + 按需加载。\n\n优化方案：\n\n1. 虚拟列表（必选）：只渲染可视区 + 上下缓冲区（约 20-50 个 DOM），O(可视项数) 而非 O(数据量)。\n2. 分页/无限滚动：后端分批返回，IntersectionObserver 触发加载，避免前端持有全量数据。\n3. 时间分片：用 requestIdleCallback 把非紧急计算（排序/过滤）分帧执行，避免长任务阻塞交互。\n4. Web Worker：大数据排序/聚合放 Worker，主线程只负责渲染。\n5. 增量更新：数据变更时用 key diff（React key / Vue :key）只更新变化的项，避免全量重渲染。\n\n落地：react-window（固定高度）+ 后端分页 + Web Worker 排序，可流畅渲染 100 万+ 项。',
              },
              {
                title: 'Q29 【场景题】: 如何设计一个带 TTL 过期的 LRU 缓存？',
                content: '需求：\n\n- LRU 淘汰最久未访问。\n- TTL 到期自动失效。\n- get/put 尽量 O(1)。\n\n数据结构：\n\n1. Map（插入序）：LRU 部分用 Map，访问时 delete + set 移到末尾，淘汰删首个。\n2. 过期队列：每个 entry 存 expireAt 时间戳，配合 setTimeout 或惰性删除。\n3. 惰性删除：get 时检查 expireAt，过期则 delete 并返回 -1，不主动扫描。\n4. 主动清理（可选）：setInterval 定期扫描清理过期项，避免内存堆积。\n\n实现要点：\n\n- Map 的 keys().next() 拿最旧 key，O(1) 淘汰。\n- TTL 用惰性删除省 CPU，主动清理省内存，两者结合。\n- 并发安全：JS 单线程无锁，但异步操作中需注意竞态。\n\n场景：接口缓存（5 分钟 TTL + 100 条 LRU）、图片缓存、计算结果缓存。',
              },
              {
                title: 'Q30 【综合】: 面试遇到没见过的算法题如何拆解？',
                content: '通用拆解框架（5 步法）：\n\n1. 读题 + 举例：\n- 主动举 2-3 组样例（含边界：空、单元素、全相同、超大规模）。\n- 确认输入输出与边界条件，避免理解偏差白写。\n\n2. 暴力法先出：\n- 先说最直观的 O(n²) 暴力解，保证正确性。\n- 再分析瓶颈（重复计算 / 全量遍历），针对性优化。\n\n3. 识别模式：\n- 求「最值」→ DP / 贪心 / 回溯。\n- 求「所有方案」→ 回溯 / DFS。\n- 求「连续子数组」→ 滑动窗口 / 前缀和。\n- 求「有序找值」→ 二分。\n- 求「前 K 个」→ 堆 / 快速选择。\n- 求「连通性」→ 并查集 / BFS / DFS。\n\n4. 编码 + 口述：\n- 边写边讲思路，变量名清晰，处理边界。\n- 复杂度分析主动说（时间 + 空间）。\n\n5. 测试 + 优化：\n- 用样例跑一遍，验证正确性。\n- 主动提优化方向（空间压缩、常数优化）。\n\n心法：面试官看重的是「拆解能力」而非「背过原题」，先暴力再优化比憋着不出强。',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // 知识点 30：小测验
    // ------------------------------------------------------------------------
    {
      order: 30,
      title: '小测验',
      difficulty: 2,
      isNew: true,
      blocks: [
        {
          id: 'p30-1',
          type: 'paragraph',
          lead: true,
          text: '20 道精选小测题，覆盖核心数据结构、算法思想、前端场景、边界易错四类。每题标注梯度：记忆/理解/应用/对比/场景/综合。先自答再展开解析。',
        },
        {
          id: 'p30-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '【记忆】下列数据结构中，访问时间复杂度为 O(1) 的是？',
                options: ['数组按下标', '链表按下标', '哈希表查找', 'BST 查找'],
                correctIndex: 0,
                explanation: '数组按下标 O(1)；链表按下标 O(n)；哈希表查找平均 O(1) 但不是「访问」；BST 查找 O(log n)。',
              },
              {
                question: '【记忆】快排的平均时间复杂度是？',
                options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
                correctIndex: 1,
                explanation: '快排平均 O(n log n)，最差 O(n²)（已有序 + 选最左基准）。',
              },
              {
                question: '【理解】JS 数组 shift() 的时间复杂度是？',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                correctIndex: 2,
                explanation: 'shift 需要把所有后续元素下标前移一位，O(n)。unshift 同理。频繁头操作应改用对象+指针或循环队列。',
              },
              {
                question: '【理解】哈希表最差情况下查找复杂度是？',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                correctIndex: 2,
                explanation: '所有 key 哈希冲突到同一桶时退化成链表查找，O(n)。恶意构造输入可触发（哈希碰撞攻击）。',
              },
              {
                question: '【理解】二分查找的前提条件是？',
                options: ['数组无序', '数组有序', '数组长度为 2 的幂', '数组元素唯一'],
                correctIndex: 1,
                explanation: '二分查找要求有序，每次折半排除一半。无序需先排序 O(n log n) 再查 O(log n)。',
              },
              {
                question: '【应用】LC146 LRU 缓存，最适合的底层数据结构是？',
                options: ['数组', '普通对象', 'Map', 'Set'],
                correctIndex: 2,
                explanation: 'Map 的 keys() 维护插入序，keys().next().value 即最旧，O(1) 淘汰。结合 delete/set 可 O(1) get/put。',
              },
              {
                question: '【应用】实现「滑动窗口最大值」最优算法是？',
                options: ['暴力 O(n·k)', '堆 O(n log k)', '单调队列 O(n)', '排序 O(n log n)'],
                correctIndex: 2,
                explanation: '单调队列保持队首是当前窗口最大，每个元素入队出队各一次，O(n)。',
              },
              {
                question: '【应用】Vue3 Diff 算法用了哪个经典算法减少 DOM 移动？',
                options: ['最长公共子序列 LCS', '最长递增子序列 LIS', '最短路径 Dijkstra', '拓扑排序'],
                correctIndex: 1,
                explanation: 'LIS 求旧节点在新列表中相对位置递增的最长段，这些节点无需移动，只移动剩余节点。',
              },
              {
                question: '【对比】快排与归并排序的稳定性差异？',
                options: ['都快排稳定', '都稳定', '快排不稳定，归并稳定', '快排稳定，归并不稳定'],
                correctIndex: 2,
                explanation: '快排 partition 会打乱相等元素顺序（不稳定）；归并合并时相等元素保持原序（稳定）。稳定排序用于多字段排序。',
              },
              {
                question: '【对比】DFS 与 BFS 的空间复杂度差异？',
                options: ['DFS 更省', 'BFS 更省', '相同', '取决于树形'],
                correctIndex: 3,
                explanation: 'DFS 空间 O(h) 树高，BFS 空间 O(w) 树宽。瘦高树 DFS 省，矮宽树 BFS 省。一般树 DFS 更省（h < w）。',
              },
              {
                question: '【对比】0-1 背包与完全背包的遍历顺序差异？',
                options: ['都顺序', '都逆序', '0-1 逆序，完全顺序', '0-1 顺序，完全逆序'],
                correctIndex: 2,
                explanation: '0-1 逆序防重复选（每个物品只能选一次）；完全顺序允许重复选（无限件）。口诀：0-1 逆序防重复，完全顺序允重复。',
              },
              {
                question: '【场景】前端实现「搜索框输入停止才查询」应使用？',
                options: ['节流 throttle', '防抖 debounce', 'setTimeout 一次', 'setInterval'],
                correctIndex: 1,
                explanation: '防抖：连续输入只在最后一次后等待 wait 才执行，合并多次为一次。节流是固定频率执行，不适合「停才查」场景。',
              },
              {
                question: '【场景】前端长列表渲染 10w 条数据，最佳方案是？',
                options: ['分页 + 懒加载', '虚拟列表', 'requestIdleCallback 分帧', '直接 v-for'],
                correctIndex: 1,
                explanation: '虚拟列表只渲染可视区域，DOM 节点数固定（几十个），滚动时动态替换。10w 条数据用虚拟列表能保持 60fps。',
              },
              {
                question: '【场景】Vue keep-alive 缓存组件实例，底层使用？',
                options: ['FIFO 队列', 'LRU 缓存', 'LFU 缓存', 'Map'],
                correctIndex: 1,
                explanation: 'keep-alive 默认 LRU（最近最少使用），超过 max 时淘汰最久未访问的组件实例。',
              },
              {
                question: '【场景】Webpack 分析模块依赖图用的算法是？',
                options: ['Dijkstra 最短路径', '拓扑排序', 'Kruskal 最小生成树', 'Floyd 多源最短'],
                correctIndex: 1,
                explanation: '模块依赖是有向无环图（DAG），拓扑排序确定构建顺序，同时检测循环依赖（环）。',
              },
              {
                question: '【综合】给定 [3,1,4,1,5,9,2,6]，LIS 长度是？',
                options: ['3', '4', '5', '6'],
                correctIndex: 1,
                explanation: 'LIS 可为 [1,4,5,9] 或 [1,4,5,6]，长度均为 4。注意重复的 1 只算一次，序列严格递增。',
              },
              {
                question: '【综合】深度为 5 的满二叉树（根深度为 1），节点总数是？',
                options: ['15', '31', '63', '32'],
                correctIndex: 1,
                explanation: '满二叉树深度 k（根为 1）节点数 2^k - 1。深度 5 → 2^5 - 1 = 31。若根深度为 0 则是 63，本题按根为 1。',
              },
              {
                question: '【综合】栈的入栈顺序 1,2,3,4,5，出栈顺序不可能是？',
                options: ['5,4,3,2,1', '4,5,3,2,1', '3,2,1,4,5', '1,2,3,4,5', '4,3,5,1,2'],
                correctIndex: 4,
                explanation: '4,3,5,1,2 不可能：出 4,3 后栈中还剩 1,2（2 在顶），要出 5 必须先入 5，然后栈为 1,2,5，出 5 后栈 1,2，必须先出 2 才能出 1，不可能得到 ...,1,2。',
              },
              {
                question: '【综合】Promise 限流实现中，worker 数量应该等于？',
                options: ['任务总数', 'limit 值', 'CPU 核数', '任意'],
                correctIndex: 1,
                explanation: 'worker 数 = limit，每个 worker 循环抢任务（i++ 同步自增），保证同时最多 limit 个任务执行。worker 多了浪费，少了达不到限流上限。',
              },
              {
                question: '【综合】下列哪种排序算法是稳定的？',
                options: ['快排', '堆排', '归并', '选择'],
                correctIndex: 2,
                explanation: '稳定排序：冒泡、插入、归并。不稳定：选择、快排、堆排。稳定性能保证多字段排序时次要字段不被打乱。',
              },
            ],
          },
        },
      ],
    },
  ],
}