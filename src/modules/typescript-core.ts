/**
 * 模块 07：TypeScript 核心与进阶
 *
 * 完整实现 19 个知识点，涵盖 TypeScript 基础类型、类型收窄、接口与类型别名、
 * 泛型约束、工具类型、条件类型、tsconfig 配置、API 类型安全、迁移策略、
 * 2 个综合实战沙盒（手写工具类型库 / 类型安全 API 解析器）、
 * 面试题、速查表和小测验。使用 18 个可视化组件辅助理解。
 */
import type { ModuleMeta } from '../lib/types'

export const typescriptCoreModule: ModuleMeta = {
  number: '07',
  title: 'TypeScript 核心与进阶',
  slug: 'typescript-core',
  stage: 'prerequisites',
  stageLabel: '通用前置 · 第 2 模块',
  icon: '07',
  summary: '类型系统、泛型、工具类型、条件类型、映射类型、类型守卫、tsconfig。',
  knowledgePointCount: 19,
  visualizationCount: 18,
  points: [
    // ========================================================================
    // 知识点 1：TypeScript 概述与核心能力（KnowledgeGraph）
    // ========================================================================
    {
      order: 1,
      title: 'TypeScript 概述与核心能力',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'ts-p1-1',
          type: 'paragraph',
          lead: true,
          text: 'TypeScript 是 JavaScript 的超集，添加了静态类型系统。它在编译时做类型检查，编译后输出纯 JavaScript。类型系统是 TypeScript 的核心竞争力——不是"多了类型标注"，而是"多了编译时安全网"。',
        },
        {
          id: 'ts-p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'core', label: 'TypeScript', group: 'core', weight: 3 },
              { id: 'basics', label: '基础类型', group: 'related', weight: 2 },
              { id: 'narrowing', label: '类型收窄', group: 'related', weight: 2 },
              { id: 'generics', label: '泛型', group: 'related', weight: 2 },
              { id: 'utility', label: '工具类型', group: 'related', weight: 2 },
              { id: 'config', label: '编译配置', group: 'related', weight: 2 },
              { id: 'patterns', label: '类型模式', group: 'related', weight: 2 },
              { id: 'string', label: 'string/number/boolean', group: 'detail' },
              { id: 'union', label: '联合类型 |', group: 'detail' },
              { id: 'type-guard', label: 'typeof / instanceof', group: 'detail' },
              { id: 'extends', label: 'extends 约束', group: 'detail' },
              { id: 'partial', label: 'Partial/Required', group: 'detail' },
              { id: 'cond', label: '条件类型 extends ?', group: 'detail' },
              { id: 'tsconfig2', label: 'tsconfig.json', group: 'detail' },
            ],
            edges: [
              { source: 'core', target: 'basics' },
              { source: 'core', target: 'narrowing' },
              { source: 'core', target: 'generics' },
              { source: 'core', target: 'utility' },
              { source: 'core', target: 'config' },
              { source: 'core', target: 'patterns' },
              { source: 'basics', target: 'string' },
              { source: 'basics', target: 'union' },
              { source: 'narrowing', target: 'type-guard' },
              { source: 'generics', target: 'extends' },
              { source: 'utility', target: 'partial' },
              { source: 'patterns', target: 'cond' },
              { source: 'config', target: 'tsconfig2' },
            ],
          },
        },
        {
          id: 'ts-p1-3',
          type: 'heading',
          level: 3,
          text: 'TypeScript 的核心价值',
        },
        {
          id: 'ts-p1-4',
          type: 'list',
          ordered: true,
          items: [
            '编译时类型检查：在代码运行前发现类型错误，减少线上 bug',
            '智能代码补全：IDE 可根据类型信息提供精确的自动补全和重构',
            '自文档化：类型标注就是活的 API 文档，过时即报错',
            '大型项目可维护性：类型系统让重构更安全、代码审查更高效',
            '渐进式采用：.js → .ts 逐步迁移，不中断现有业务',
          ],
        },
        {
          id: 'ts-p1-5',
          type: 'callout',
          variant: 'tip',
          title: 'TypeScript = JavaScript + 类型',
          text: 'TypeScript 是 JavaScript 的超集，所有合法的 JS 代码都是合法的 TS 代码（可能有类型错误）。类型只在编译时存在，运行时没有任何 TS 类型信息——这就是"类型擦除"。',
        },
      ],
    },

    // ========================================================================
    // 知识点 2：TypeScript 基础类型（TypeMatrixTable + TsTypeChecker）
    // ========================================================================
    {
      order: 2,
      title: 'TypeScript 基础类型',
      difficulty: 1,
      visualizationType: 'type-matrix-table',
      blocks: [
        {
          id: 'ts-p2-1',
          type: 'paragraph',
          text: 'TypeScript 的基础类型涵盖 JavaScript 原生类型和 TS 扩展类型。理解 any、unknown、never、void 的区别是类型安全的第一步。',
        },
        {
          id: 'ts-p2-2',
          type: 'demo',
          visualizationType: 'type-matrix-table',
          data: {
            title: '核心类型对比矩阵',
            rows: [
              {
                type: 'string',
                description: '字符串类型',
                assignable: 'yes',
                nullable: 'no',
                typeofResult: 'string',
                recommendation: '✅ 最常用类型之一',
                example: 'let name: string = "Alice"',
              },
              {
                type: 'number',
                description: '数字类型（整数 + 浮点）',
                assignable: 'yes',
                nullable: 'no',
                typeofResult: 'number',
                recommendation: '✅ JS 不区分 int/float',
                example: 'let age: number = 30',
              },
              {
                type: 'boolean',
                description: '布尔类型',
                assignable: 'yes',
                nullable: 'no',
                typeofResult: 'boolean',
                recommendation: '✅ 注意区分 falsy 值',
                example: 'let done: boolean = false',
              },
              {
                type: 'any',
                description: '关闭类型检查的任意类型',
                assignable: 'yes',
                nullable: 'yes',
                typeofResult: '—（关闭检查）',
                recommendation: '🚫 避免使用，用 unknown 替代',
                example: 'let x: any = 42\nx.foo() // 不报错！',
              },
              {
                type: 'unknown',
                description: '安全的 any 替代',
                assignable: 'yes',
                nullable: 'yes',
                typeofResult: '—（需收窄）',
                recommendation: '✅ any 的安全替代',
                example: 'let x: unknown = 42\nif (typeof x === "number") x++',
              },
              {
                type: 'never',
                description: '永远不存在的值',
                assignable: 'yes',
                nullable: 'no',
                typeofResult: 'never',
                recommendation: '✅ 穷尽性检查',
                example: 'function err(): never { throw Error() }',
              },
              {
                type: 'void',
                description: '无返回值',
                assignable: 'no',
                nullable: 'no',
                typeofResult: 'undefined',
                recommendation: '✅ 函数返回值标注',
                example: 'function log(msg: string): void { ... }',
              },
              {
                type: 'null/undefined',
                description: '空值 / 未定义',
                assignable: 'conditional',
                nullable: 'yes',
                typeofResult: 'object/undefined',
                recommendation: '⚠ strictNullChecks 后严格区分',
                example: 'let x: string | null = null',
              },
            ],
          },
        },
        {
          id: 'ts-p2-3',
          type: 'heading',
          level: 3,
          text: '数组、元组与枚举',
        },
        {
          id: 'ts-p2-4',
          type: 'code',
          language: 'typescript',
          filename: 'Array / Tuple / Enum',
          code: `// 数组：两种写法等价
const nums: number[] = [1, 2, 3]
const strs: Array<string> = ['a', 'b']

// 元组：固定长度 + 固定类型
const pair: [string, number] = ['age', 30]
const rgb: [number, number, number] = [255, 100, 50]

// 具名元组（TS 4.0+）：成员可命名
const user: [name: string, age: number] = ['Alice', 30]

// 枚举：命名常量集合
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
const dir: Direction = Direction.Up

// const 枚举：编译时内联，无运行时开销
const enum Status { Active, Inactive }`,
        },
        {
          id: 'ts-p2-5',
          type: 'demo',
          visualizationType: 'ts-type-checker',
          data: {
            defaultCode: `// ✅ 类型安全的代码
type User = { name: string; age: number }

function createUser(name: string, age: number): User {
  return { name, age }
}

const user = createUser("Alice", 30)
console.log(user.name.toUpperCase())`,
            snippets: [
              {
                label: 'any 滥用',
                code: `// ❌ 类型不安全的代码
function getUser(id: any): any {
  const resp: any = fetch('/api/user/' + id)
  return resp.data.user
}

const user = getUser(42)
user.name!.toUpperCase() // 非空断言，危险！`,
                description: '演示 any 类型滥用',
              },
              {
                label: '类型守卫',
                code: `// ✅ 类型安全的代码
type Result<T> = { data: T } | { error: string }

function isSuccess<T>(r: Result<T>): r is { data: T } {
  return 'data' in r
}

function getUser(id: number): Result<{ name: string }> {
  return { data: { name: 'Alice' } }
}

const result = getUser(42)
if (isSuccess(result)) {
  console.log(result.data.name)
}`,
                description: '演示类型守卫的正确使用',
              },
              {
                label: '联合类型收窄',
                code: `// ✅ 联合类型收窄
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rectangle':
      return shape.width * shape.height
  }
}`,
                description: '演示联合类型的穷尽性检查',
              },
              {
                label: '泛型约束',
                code: `// ✅ 泛型约束示例
interface HasLength { length: number }

function longest<T extends HasLength>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

const result = longest([1, 2, 3], [4, 5, 6, 7])
console.log(result.length)`,
                description: '演示泛型约束 extends 的用法',
              },
            ],
          },
        },
        {
          id: 'ts-p2-6',
          type: 'callout',
          variant: 'warning',
          title: 'any vs unknown 的选择',
          text: 'any 会关闭所有类型检查，unknown 是安全的替代：unknown 类型的值不能直接使用，必须先做类型收窄才能操作。这保留了类型安全，同时保持灵活性。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：类型收窄与类型守卫
    // ========================================================================
    {
      order: 3,
      title: '类型收窄与类型守卫',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'ts-p3-1',
          type: 'paragraph',
          text: '类型收窄（Type Narrowing）是 TypeScript 根据控制流分析自动缩小类型范围的过程。类型守卫（Type Guard）是帮助编译器收窄类型的工具函数。',
        },
        {
          id: 'ts-p3-2',
          type: 'heading',
          level: 3,
          text: '六种常见收窄方式',
        },
        {
          id: 'ts-p3-3',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: true,
            defaultOpen: [0],
            items: [
              {
                title: 'typeof 类型守卫',
                content: 'typeof 是最基础的类型守卫，用于区分 JS 原始类型。TS 能识别 typeof 后的类型收窄。注意 typeof null === "object"，这是一个经典的 JS bug。',
                code: `function padLeft(value: string | number) {
  if (typeof value === 'number') {
    return ' '.repeat(value)  // value: number
  }
  return value.padStart(10)    // value: string
}`,
                codeLanguage: 'typescript',
              },
              {
                title: 'instanceof 守卫',
                content: 'instanceof 用于检查对象是否为某个类的实例。适合自定义 Error 类、Date、Map 等原型链明确的类型。',
                code: `function handleError(err: Error | string) {
  if (err instanceof Error) {
    console.log(err.message)  // err: Error
  } else {
    console.log(err)           // err: string
  }
}`,
                codeLanguage: 'typescript',
              },
              {
                title: '自定义类型谓词（is）',
                content: '函数返回类型为 x is Type 时，该函数即为类型谓词。TS 会在调用后根据返回值自动收窄类型。这是最强大的守卫方式。',
                code: `interface Cat { meow(): void }
interface Dog { bark(): void }

function isCat(animal: Cat | Dog): animal is Cat {
  return 'meow' in animal
}

function handle(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow()  // animal: Cat
  } else {
    animal.bark()  // animal: Dog
  }
}`,
                codeLanguage: 'typescript',
              },
              {
                title: 'in 操作符收窄',
                content: 'in 操作符检查对象是否拥有某个属性，TS 能据此收窄联合类型。适合 discriminated union 之外的通用联合收窄。',
                code: `type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    animal.swim()  // animal: Fish
  } else {
    animal.fly()   // animal: Bird
  }
}`,
                codeLanguage: 'typescript',
              },
              {
                title: 'Discriminated Union（可辨识联合）',
                content: '给联合类型的每个成员添加相同的字面量属性（如 kind），TS 能通过 switch/if 精准收窄。这是最推荐的联合类型处理模式。',
                code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'square': return shape.size ** 2
    // 没写 default — TS 会检查所有分支是否处理
  }
}`,
                codeLanguage: 'typescript',
              },
              {
                title: 'assertNever 穷尽性检查',
                content: 'assertNever 利用 never 类型确保所有联合类型分支都被处理。如果新增了成员但未处理，编译时就会报错。',
                code: `function assertNever(x: never): never {
  throw new Error('Unexpected: ' + x)
}

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'square': return shape.size ** 2
    default: return assertNever(shape) // 如果新加 shape 类型会编译报错
  }
}`,
                codeLanguage: 'typescript',
              },
            ],
          },
        },
        {
          id: 'ts-p3-4',
          type: 'callout',
          variant: 'tip',
          title: '何时用哪种守卫',
          text: '原始类型用 typeof，类实例用 instanceof，对象属性用 in，复杂联合用 discriminated union + switch，需要复用的判断逻辑抽取为自定义谓词函数。',
        },
      ],
    },

    // ========================================================================
    // 知识点 4：interface vs type 对比（CompareTable）
    // ========================================================================
    {
      order: 4,
      title: 'interface vs type 对比与选择',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ts-p4-1',
          type: 'paragraph',
          text: 'interface 和 type 都可以定义对象形状，但在声明合并、扩展方式和适用场景上有重要差异。理解两者的能力边界是 TS 类型建模的基础。',
        },
        {
          id: 'ts-p4-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['interface', 'type'],
            highlightColumn: 0,
            rows: [
              { feature: '定义对象形状', values: ['✅', '✅'] },
              { feature: '声明合并（同名自动合并）', values: ['✅', '❌'] },
              { feature: '扩展方式', values: ['extends', '&（交叉类型）'] },
              { feature: '联合类型 |', values: ['❌ 不可直接定义', '✅ type A = B | C'] },
              { feature: '元组', values: ['❌', '✅ type T = [string, number]'] },
              { feature: '函数类型', values: ['✅', '✅ type Fn = (x: number) => string'] },
              { feature: '映射类型', values: ['❌', '✅ type Mapped<T> = { [K in keyof T]: ... }'] },
              { feature: ' extends约束', values: ['✅', '✅'] },
              { feature: '适用场景', values: ['对象/类的形状定义、公开 API', '联合类型、工具类型、复杂类型演算'] },
            ],
          },
        },
        {
          id: 'ts-p4-3',
          type: 'heading',
          level: 3,
          text: '实战选择策略',
        },
        {
          id: 'ts-p4-4',
          type: 'list',
          items: [
            '默认用 interface：定义对象 Props、DTO、API 响应等"数据的形状"。声明合并是优势——库的接口可被使用者扩展。',
            '用 type 定义联合类型：type Status = "active" | "inactive" 是 type 的天然优势。',
            '用 type 定义工具类型：映射类型（Partial、Readonly 的内部实现）必须用 type。',
            '团队约定：统一用一种定义对象形状，避免混用增加认知负担。',
          ],
        },
        {
          id: 'ts-p4-5',
          type: 'callout',
          variant: 'tip',
          title: 'TS 官方态度',
          text: 'TypeScript 官方手册推荐：能用 interface 的场景优先用 interface，需要用联合类型/映射类型/条件类型时才用 type。实际项目中多数团队偏好统一用 type（因为更一致），两种风格都可以，关键是团队内统一。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：泛型基础与约束（GenericConstraintFlow）
    // ========================================================================
    {
      order: 5,
      title: '泛型基础与约束（extends）',
      difficulty: 3,
      visualizationType: 'generic-constraint-flow',
      blocks: [
        {
          id: 'ts-p5-1',
          type: 'paragraph',
          text: '泛型（Generics）是 TypeScript 类型系统的核心能力——让函数、接口、类可以处理多种类型而不丢失类型信息。extends 约束限制泛型参数必须满足特定形状。',
        },
        {
          id: 'ts-p5-2',
          type: 'code',
          language: 'typescript',
          filename: '泛型基础',
          code: `// === 泛型函数 ===
function identity<T>(arg: T): T {
  return arg  // 输入类型 = 输出类型
}

const num = identity(42)         // T = number
const str = identity('hello')    // T = string
// 自动推断 → 无需手动指定

// === 泛型约束 extends ===
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length)  // ✅ T 一定有 length
  return arg
}

logLength([1, 2, 3])          // ✅ 数组有 length
logLength('hello')            // ✅ 字符串有 length
// logLength(42)              // ❌ number 没有 length

// === 泛型接口 ===
interface Repository<T> {
  getById(id: string): T
  getAll(): T[]
  create(item: T): T
}

// === 泛型约束——约束类型参数之间 ===
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]  // K 一定是 T 的合法 key
}

const user = { name: 'Alice', age: 30 }
getProperty(user, 'name')  // ✅ 返回 string
// getProperty(user, 'email')  // ❌ 'email' 不是 user 的 key`,
        },
        {
          id: 'ts-p5-3',
          type: 'demo',
          visualizationType: 'generic-constraint-flow',
          data: {
            title: '泛型约束与推断流程',
            steps: [
              {
                step: 1,
                title: '泛型参数声明',
                code: '<T extends HasLength>',
                description: '声明 T 必须满足 HasLength 接口（具备 length: number 属性）',
                highlight: 'input',
              },
              {
                step: 2,
                title: '函数参数绑定',
                code: 'function longest<T>(a: T, b: T): T',
                description: '参数 a/b 均为 T。调用时 TS 自动从实参推断 T 的具体类型',
                highlight: 'input',
              },
              {
                step: 3,
                title: '约束检查验证',
                code: 'T extends { length: number } → 检查通过 ✓',
                description: '实参类型被验证满足约束。number[] 有 length → 通过。number 无 length → 编译错误。',
                highlight: 'check',
              },
              {
                step: 4,
                title: '类型推断完成',
                code: 'longest([1,2,3], [4,5,6,7]) → T = number[]',
                description: '从两个参数中推断出共同类型 number[]，赋给 T。返回值即 number[]。',
                highlight: 'resolve',
              },
              {
                step: 5,
                title: '返回类型确定',
                code: '返回值: number[] = T',
                description: '返回类型跟随推断出的 T，调用方可安全使用 number[] 的所有方法。',
                highlight: 'resolve',
              },
            ],
          },
        },
        {
          id: 'ts-p5-4',
          type: 'callout',
          variant: 'tip',
          title: '泛型最佳实践',
          text: '1) 泛型名要有意义（TItem 优于 T）；2) 能用自动推断就不用显式指定；3) extends 约束要精确（不要过度约束）；4) 默认泛型参数减少使用负担：<T = string>。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：泛型推断深入（TypeInferenceTimeline）
    // ========================================================================
    {
      order: 6,
      title: '泛型推断深入',
      difficulty: 4,
      visualizationType: 'type-inference-timeline',
      blocks: [
        {
          id: 'ts-p6-1',
          type: 'paragraph',
          text: 'TypeScript 的类型推断不仅发生在泛型函数调用时，还贯穿于变量声明、函数返回值、上下文类型等场景。理解推断机制有助于写出更简洁的类型安全代码。',
        },
        {
          id: 'ts-p6-2',
          type: 'demo',
          visualizationType: 'type-inference-timeline',
          data: {
            title: '泛型推断时间线',
            scenario: 'identity 函数推断',
            steps: [
              {
                step: 1,
                title: '调用处传入实参',
                status: 'start',
                code: 'const result = identity("hello")',
                description: '函数 identity 被调用，传入 "hello"。TS 引擎开始推断流程。',
              },
              {
                step: 2,
                title: '泛型占位符匹配',
                status: 'constrain',
                code: 'function identity<T>(arg: T): T {\n  return arg\n}',
                description: '函数签名声明了泛型 T。arg: T 将参数类型绑定到 T。',
              },
              {
                step: 3,
                title: '从实参推断 T',
                status: 'constrain',
                code: 'arg: T = "hello"\n→ T extends "hello"\n→ T = "hello"',
                description: '从实参 "hello" 推断 T 为字面量类型 "hello"。这是最精确的推断结果。',
              },
              {
                step: 4,
                title: '推断结果确定',
                status: 'resolve',
                code: 'T = "hello"\nresult: "hello"',
                description: '推断完成！T 被确定为字面量类型。result 获得精确类型而非宽泛的 string。',
              },
              {
                step: 5,
                title: '类型安全验证',
                status: 'done',
                code: 'result.toUpperCase()  // ✅\nresult.length       // ✅\nresult.push(1)      // ❌',
                description: '精确类型使 TS 可验证所有操作。push 错误在编译时暴露。',
              },
            ],
          },
        },
        {
          id: 'ts-p6-3',
          type: 'code',
          language: 'typescript',
          filename: '泛型推断场景',
          code: `// 1. 从参数推断返回类型
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn)
}
const strs = map([1, 2, 3], n => n.toString())
// T = number, U = string → strs: string[]

// 2. 上下文类型推断
const handler: (e: MouseEvent) => void = (e) => {
  e.clientX  // e 自动推断为 MouseEvent
}

// 3. 从构造函数推断
class Container<T> {
  constructor(public value: T) {}
}
const c = new Container(42)  // T = number

// 4. satisfies 约束而不扩宽（TS 4.9+）
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>
// palette.red 仍是 [255, 0, 0] 而非 string | number[]`,
        },
      ],
    },

    // ========================================================================
    // 知识点 7：条件类型（CodeStepper）
    // ========================================================================
    {
      order: 7,
      title: '条件类型',
      difficulty: 4,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'ts-p7-1',
          type: 'paragraph',
          text: '条件类型是 TypeScript 类型系统的"if-else"。它根据类型关系在编译时做出分支选择，是构建高级工具类型的核心机制。',
        },
        {
          id: 'ts-p7-2',
          type: 'code',
          language: 'typescript',
          filename: '条件类型语法',
          code: `// 基础语法
type IsString<T> = T extends string ? 'yes' : 'no'
type A = IsString<string>   // 'yes'
type B = IsString<number>   // 'no'

// 分布式条件类型（裸类型参数自动分发）
type ToArray<T> = T extends unknown ? T[] : never
type C = ToArray<string | number>
// 等价于：ToArray<string> | ToArray<number>
//      → string[] | number[]

// 阻止分发：用 [] 包裹
type ToArrayNoDistribute<T> = [T] extends [unknown] ? T[] : never

// 条件类型 + infer
type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never

// 递归条件类型（TS 4.1+）
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K]
}`,
        },
        {
          id: 'ts-p7-3',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              'type IsArray<T> =',
              '  T extends unknown[] ? "array" : "not array"',
              '',
              '// 测试',
              'type A = IsArray<number[]>     // "array"',
              'type B = IsArray<string>       // "not array"',
              'type C = IsArray<number[] | string[]>  // "array"',
              '',
              '// 分布式条件类型',
              'type Filter<T, U> = T extends U ? T : never',
              'type D = Filter<"a" | "b" | "c", "a" | "c">  // "a" | "c"',
            ],
            language: 'typescript',
            steps: [
              {
                title: '条件类型语法',
                description: 'T extends U ? X : Y —— 如果 T 可赋值给 U，返回 X，否则返回 Y。在类型层面实现条件判断。',
                highlightLines: [1, 2],
              },
              {
                title: '单类型求值',
                description: 'number[] extends unknown[] 为 true，返回 "array"。string extends unknown[] 为 false，返回 "not array"。',
                highlightLines: [5, 6],
              },
              {
                title: '联合类型分发',
                description: '裸类型参数在联合类型上会自动分发：IsArray<A | B> → IsArray<A> | IsArray<B>。这是分布式条件类型的核心特性。',
                highlightLines: [7],
              },
              {
                title: '实战：Filter 工具类型',
                description: 'Filter<"a"|"b"|"c", "a"|"c"> 分发为 Filter<"a", "a"|"c"> | Filter<"b", "a"|"c"> | Filter<"c", "a"|"c"> → "a" | never | "c" → "a" | "c"。完美实现了联合类型的过滤。',
                highlightLines: [10, 11],
              },
              {
                title: '阻止分发',
                description: '用 [T] extends [U] 包裹可阻止分发：[string | number] extends [string] 是单次求值，不会分发。用于需要整体判断的场景。',
                highlightLines: [1, 2],
              },
            ],
          },
        },
        {
          id: 'ts-p7-4',
          type: 'callout',
          variant: 'warning',
          title: '分布式条件类型注意事项',
          text: '只有裸类型参数（直接写在 extends 前）才会分发。被 [] / {} / 函数参数包裹的类型不会分发。never 在分发时会被忽略（never 是空联合），可用 [] 包裹解决。',
        },
      ],
    },

    // ========================================================================
    // 知识点 8：内置工具类型（TypeTransformBoard）
    // ========================================================================
    {
      order: 8,
      title: '内置工具类型）',
      difficulty: 3,
      visualizationType: 'type-transform-board',
      blocks: [
        {
          id: 'ts-p8-1',
          type: 'paragraph',
          text: 'TypeScript 提供了 20+ 内置工具类型（Utility Types），基于泛型和映射类型实现常见的类型变换操作。掌握它们是提升 TS 编码效率的关键。',
        },
        {
          id: 'ts-p8-2',
          type: 'demo',
          visualizationType: 'type-transform-board',
          data: {
            title: 'Utility Types 类型转换器',
            sourceModel: {
              name: 'User',
              properties: [
                { name: 'id', type: 'number', required: true, description: '唯一标识' },
                { name: 'name', type: 'string', required: true, description: '用户名' },
                { name: 'email', type: 'string', required: true, description: '邮箱' },
                { name: 'age', type: 'number | undefined', required: false, description: '年龄' },
                { name: 'role', type: "'admin' | 'user'", required: false, description: '角色' },
              ],
            },
            transforms: [
              {
                name: 'Partial<User>',
                applies: '所有属性变为可选',
                fn: 'Partial',
                description: '所有属性变为可选。常用于更新操作。',
                resultProperties: [
                  { name: 'id', type: 'number', required: false },
                  { name: 'name', type: 'string', required: false },
                  { name: 'email', type: 'string', required: false },
                  { name: 'age', type: 'number | undefined', required: false },
                  { name: 'role', type: "'admin' | 'user' | undefined", required: false },
                ],
              },
              {
                name: 'Required<User>',
                applies: '所有属性变为必填',
                fn: 'Required',
                description: '移除所有可选标记。',
                resultProperties: [
                  { name: 'id', type: 'number', required: true },
                  { name: 'name', type: 'string', required: true },
                  { name: 'email', type: 'string', required: true },
                  { name: 'age', type: 'number', required: true },
                  { name: 'role', type: "'admin' | 'user'", required: true },
                ],
              },
              {
                name: 'Readonly<User>',
                applies: '所有属性变为只读',
                fn: 'Readonly',
                description: '防止属性被重新赋值。',
                resultProperties: [
                  { name: 'id', type: 'number', required: true },
                  { name: 'name', type: 'string', required: true },
                  { name: 'email', type: 'string', required: true },
                  { name: 'age', type: 'number | undefined', required: false },
                  { name: 'role', type: "'admin' | 'user' | undefined", required: false },
                ],
              },
              {
                name: 'Pick<User, "name" | "email">',
                applies: '选取指定属性子集',
                fn: 'Pick',
                description: '从类型中选取指定属性构成新类型。',
                resultProperties: [
                  { name: 'name', type: 'string', required: true },
                  { name: 'email', type: 'string', required: true },
                ],
              },
              {
                name: 'Omit<User, "id">',
                applies: '排除指定属性',
                fn: 'Omit',
                description: '排除指定属性后形成新类型。',
                resultProperties: [
                  { name: 'name', type: 'string', required: true },
                  { name: 'email', type: 'string', required: true },
                  { name: 'age', type: 'number | undefined', required: false },
                  { name: 'role', type: "'admin' | 'user' | undefined", required: false },
                ],
              },
            ],
          },
        },
        {
          id: 'ts-p8-3',
          type: 'code',
          language: 'typescript',
          filename: '常用工具类型速查',
          code: `// 属性修饰
Partial<T>      // 全部可选
Required<T>     // 全部必填
Readonly<T>     // 全部只读

// 属性选取
Pick<T, K>      // 选取指定属性
Omit<T, K>      // 排除指定属性

// 联合类型操作
Extract<T, U>   // 提取可赋值给 U 的
Exclude<T, U>   // 排除可赋值给 U 的
NonNullable<T>  // 排除 null | undefined

// 函数类型
Parameters<T>   // 提取函数参数类型（元组）
ReturnType<T>   // 提取函数返回类型
Awaited<T>      // 递归解开 Promise

// 字符串操作（TS 4.1+）
Uppercase<T>
Lowercase<T>
Capitalize<T>
Uncapitalize<T>`,
        },
      ],
    },

    // ========================================================================
    // 知识点 9：infer 与高级类型推断（ArchitectureDiagram）
    // ========================================================================
    {
      order: 9,
      title: 'infer 与高级类型推断',
      difficulty: 5,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'ts-p9-1',
          type: 'paragraph',
          text: 'infer 关键字在条件类型的 extends 子句中声明待推断的类型变量，让 TypeScript 从类型结构中"提取"出子类型。它是构建高级工具类型的基础。',
        },
        {
          id: 'ts-p9-2',
          type: 'code',
          language: 'typescript',
          filename: 'infer 核心用法',
          code: `// infer 提取函数返回类型
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never

// infer 提取数组元素类型
type ElementType<T> = T extends (infer E)[] ? E : never
type El = ElementType<string[]>  // string

// infer 提取 Promise 内层类型
type Unwrap<T> = T extends Promise<infer U> ? Unwrap<U> : T
type P = Unwrap<Promise<Promise<number>>>  // number

// infer 提取函数第一个参数
type FirstArg<T> = T extends (first: infer F, ...rest: unknown[]) => unknown ? F : never

// infer 提取模板字符串
type ParseRoute<T> = T extends \`/\${infer Segment}/\${infer Rest}\`
  ? { segment: Segment; rest: Rest }
  : never
type Route = ParseRoute<'/users/42'>  // { segment: 'users'; rest: '42' }`,
        },
        {
          id: 'ts-p9-3',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'infer 推断链路',
            flowDirection: 'top-down',
            layers: [
              {
                name: '条件类型触发',
                description: 'T extends Pattern ? X : Y — 当 T 匹配 Pattern 时进入 X 分支',
                components: [
                  { name: 'T extends (...args: any[]) => infer R', description: '检查 T 是否为函数类型' },
                  { name: '匹配成功', description: '进入 ? R 分支，R 为推断出的返回类型' },
                  { name: '匹配失败', description: '进入 : never 分支，返回 never' },
                ],
              },
              {
                name: 'infer 位置声明',
                description: 'infer 出现在 extends 的右侧类型中，声明一个待推断的类型变量',
                components: [
                  { name: '函数返回位置', description: 'infer R 在返回类型位置 → 提取返回类型' },
                  { name: '数组元素位置', description: '(infer E)[] → 提取元素类型' },
                  { name: 'Promise 包裹', description: 'Promise<infer U> → 提取内层类型' },
                ],
              },
              {
                name: '推断与收集',
                description: 'TypeScript 编译器将实际的类型结构代入 infer 位置，收集到类型变量中',
                components: [
                  { name: '协变位置', description: '返回类型、对象属性值 → 联合类型' },
                  { name: '逆变位置', description: '函数参数类型 → 交叉类型' },
                ],
              },
              {
                name: '推断结果使用',
                description: 'infer 得到的类型变量可在条件类型的 true 分支中使用',
                components: [
                  { name: '直接返回', description: 'R → 提取出的类型' },
                  { name: '递归应用', description: 'Promise<infer U> ? Unwrap<U> : T → 递归解开' },
                ],
              },
            ],
          },
        },
        {
          id: 'ts-p9-4',
          type: 'callout',
          variant: 'tip',
          title: 'infer 的协变与逆变',
          text: '同一个类型变量在协变位置（返回值）被 infer 多次 → 得到联合类型。在逆变位置（参数）被 infer 多次 → 得到交叉类型。这是类型推断的核心规则。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：satisfies / const 类型参数（CompareTable）
    // ========================================================================
    {
      order: 10,
      title: 'satisfies / const 类型参数',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ts-p10-1',
          type: 'paragraph',
          text: 'TypeScript 4.9 引入 satisfies 运算符，5.0 引入 const 类型参数。两者解决了类型标注的两个经典痛点：类型收窄与字面量保留。',
        },
        {
          id: 'ts-p10-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['satisfies（TS 4.9+）', 'const 类型参数（TS 5.0+）'],
            highlightColumn: 0,
            rows: [
              { feature: '语法', values: ['expression satisfies Type', 'function f<const T>(x: T)'] },
              { feature: '解决的问题', values: ['类型检查 + 保留字面量类型', '泛型推断保留字面量类型'] },
              { feature: '使用场景', values: ['对象/数组字面量', '泛型函数参数'] },
              { feature: '类型检查', values: ['✅ 编译时验证是否符合 Type', '✅ 编译时验证约束'] },
              { feature: '字面量保留', values: ['✅ 保留最精确类型', '✅ T 推断为字面量而非宽类型'] },
              { feature: '适用 TS 版本', values: ['≥ 4.9', '≥ 5.0'] },
            ],
          },
        },
        {
          id: 'ts-p10-3',
          type: 'code',
          language: 'typescript',
          filename: 'satisfies vs const',
          code: `// satisfies：验证类型但不扩宽
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>

// palette.red 类型仍是 [255, 0, 0]（Tuple）
// 而不是 string | number[]
palette.red[0]  // ✅ 255

// 不加 satisfies 对比
const palette2: Record<string, string | number[]> = {
  red: [255, 0, 0],
}
// palette2.red 是 string | number[]
// palette2.red[0]  // ❌ 报错！

// const 类型参数（泛型推断保留字面量）
function useState<const T>(initial: T): [T, (v: T) => void] {
  return [initial, () => {}]
}
const [count, setCount] = useState(0)
// count 推断为 0（字面量），不是 number`,
        },
        {
          id: 'ts-p10-4',
          type: 'callout',
          variant: 'tip',
          title: 'as const vs satisfies vs const 泛型',
          text: 'as const 将值变为只读的字面量类型。satisfies 验证类型但不改变类型推断。const 泛型参数让函数调用时推断出字面量。三者互补：as const 用于值，satisfies 用于验证，const 泛型用于函数。',
        },
      ],
    },

    // ========================================================================
    // 知识点 11：映射类型与模板字面量类型
    // ========================================================================
    {
      order: 11,
      title: '映射类型与模板字面量类型',
      difficulty: 3,
      blocks: [
        {
          id: 'ts-p11-1',
          type: 'paragraph',
          lead: true,
          text: '映射类型（Mapped Types）遍历联合类型的每个成员生成新类型。模板字面量类型（Template Literal Types）在类型层面拼接字符串。两者结合能实现强大的类型变换。',
        },
        {
          id: 'ts-p11-2',
          type: 'code',
          language: 'typescript',
          filename: '映射类型 + 模板字面量类型',
          code: `// === 映射类型 ===
// 语法：[K in keyof T]: NewType

type Getters<T> = {
  [K in keyof T]: () => T[K]
}

interface User { name: string; age: number }
type UserGetters = Getters<User>
// { name: () => string; age: () => number }

// 键重映射（TS 4.1+）
type Getters2<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}
// { getName: () => string; getAge: () => number }

// 模板字面量类型
type EventName<T extends string> = \`on\${Capitalize<T>}\`
type ClickEvent = EventName<'click'>  // 'onClick'

// 联合类型自动分发
type Alignment = 'left' | 'center' | 'right'
type AlignClass = \`text-\${Alignment}\`
// 'text-left' | 'text-center' | 'text-right'

// 映射类型 + 条件类型
type NonNullableProperties<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

// 仅保留特定类型的属性
type PickByType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K]
}
type StringProps = PickByType<User, string>  // { name: string }`,
        },
        {
          id: 'ts-p11-3',
          type: 'callout',
          variant: 'tip',
          title: '实用场景',
          text: '映射类型用于批量类型变换（Partial/Readonly 的实现基础）。模板字面量用于精确的事件名、CSS 类名、路由路径。键重映射（as）用于重命名属性的同时保留值的类型。',
        },
      ],
    },

    // ========================================================================
    // 知识点 12：tsconfig 严格模式（TsConfigPlayground）
    // ========================================================================
    {
      order: 12,
      title: 'tsconfig 严格模式与编译配置',
      difficulty: 2,
      visualizationType: 'ts-config-playground',
      blocks: [
        {
          id: 'ts-p12-1',
          type: 'paragraph',
          text: 'tsconfig.json 是 TypeScript 项目的编译配置文件。strict 选项及其子选项决定了类型检查的严格程度，直接影响项目代码质量。',
        },
        {
          id: 'ts-p12-2',
          type: 'demo',
          visualizationType: 'ts-config-playground',
          data: {
            title: 'tsconfig 严格模式配置面板',
            flags: [
              {
                key: 'strict',
                label: 'strict',
                description: '主开关：开启后将自动启用所有子选项',
                impact: 'type-check',
                isStrict: true,
                examples: { on: { code: '// 全部严格检查', message: '推荐开启' }, off: { code: '// 宽松模式', message: '不推荐' } },
              },
              {
                key: 'noImplicitAny',
                label: 'noImplicitAny',
                description: '禁止隐式 any 类型。推荐开启。',
                impact: 'type-check',
                isStrict: true,
                examples: { on: { code: 'function f(x) {} // ❌ 报错', message: '必须显式标注类型' }, off: { code: 'function f(x) {} // any', message: '失去类型安全' } },
              },
              {
                key: 'strictNullChecks',
                label: 'strictNullChecks',
                description: 'null/undefined 不能随意赋值给其他类型。强烈推荐开启。',
                impact: 'type-check',
                isStrict: true,
                examples: { on: { code: 'let s: string = null // ❌', message: '必须用 string | null' }, off: { code: 'let s: string = null // ✅', message: '运行时风险' } },
              },
              {
                key: 'strictFunctionTypes',
                label: 'strictFunctionTypes',
                description: '函数参数类型逆变检查。推荐开启。',
                impact: 'type-check',
                isStrict: true,
                examples: { on: { code: '参数类型严格协变', message: '更安全的回调' }, off: { code: '参数双变', message: '可能与预期不符' } },
              },
              {
                key: 'noUnusedLocals',
                label: 'noUnusedLocals',
                description: '检测未使用的局部变量。推荐开启。',
                impact: 'compile',
                isStrict: false,
                examples: { on: { code: 'const x = 1 // ❌未使用', message: '保持代码整洁' }, off: { code: '允许未使用变量', message: '存在冗余代码' } },
              },
              {
                key: 'noUncheckedIndexedAccess',
                label: 'noUncheckedIndexedAccess',
                description: '索引访问返回 T | undefined。推荐开启（非 strict 子项）。',
                impact: 'type-check',
                isStrict: false,
                examples: { on: { code: 'arr[0] → T | undefined', message: '更安全的数组访问' }, off: { code: 'arr[0] → T', message: '可能越界访问' } },
              },
            ],
            defaultEnabled: ['strict', 'noImplicitAny', 'strictNullChecks', 'strictFunctionTypes'],
          },
        },
        {
          id: 'ts-p12-3',
          type: 'code',
          language: 'json',
          filename: '推荐的 tsconfig.json',
          code: `{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}`,
        },
        {
          id: 'ts-p12-4',
          type: 'callout',
          variant: 'tip',
          title: '新项目推荐',
          text: '新项目直接开启 strict: true。迁移老项目可用 strict: false，然后逐步开启子项。tsc --noEmit 只做类型检查不输出文件，适合 CI 集成。',
        },
      ],
    },

    // ========================================================================
    // 知识点 13：API 类型安全实战（ApiTypingWorkbench）
    // ========================================================================
    {
      order: 13,
      title: 'API 类型安全实战',
      difficulty: 3,
      visualizationType: 'api-typing-workbench',
      blocks: [
        {
          id: 'ts-p13-1',
          type: 'paragraph',
          text: '将 TypeScript 类型系统应用到 API 调用中可以大幅减少运行时错误。从无类型的 fetch 到完整的泛型 request<T> 封装，逐步构建类型安全的 API 层。',
        },
        {
          id: 'ts-p13-2',
          type: 'demo',
          visualizationType: 'api-typing-workbench',
          data: {
            title: 'API 类型安全工作台',
            defaultScenario: 1,
            scenarios: [
              {
                name: '无类型',
                level: 'basic',
                unsafe: `// ❌ 无类型：完全不可预测
function fetchUser(id) {
  return fetch('/api/user/' + id)
    .then(r => r.json())
}
const user = await fetchUser(42)
user.nme  // 不报错！`,
                safe: `// ✅ 基础类型标注
async function fetchUser(id: number): Promise<{name: string}> {
  const res = await fetch('/api/user/' + id)
  return res.json()
}
const user = await fetchUser(42)
user.nme  // ❌ TS 报错！`,
                description: '从无类型到基础类型标注的第一步',
              },
              {
                name: '泛型 request<T>',
                level: 'generic',
                unsafe: `// ❌ 每次手写类型
async function getUsers() {
  const res = await fetch('/api/users')
  return res.json()  // any
}`,
                safe: `// ✅ 泛型 request<T>
interface ApiResponse<T> {
  code: number; data: T; message: string
}
async function request<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url)
  if (!res.ok) throw new Error()
  return res.json()
}
const { data } = await request<User[]>('/api/users')
// data: User[]`,
                description: '泛型 request<T> 封装',
              },
              {
                name: '完整类型约束',
                level: 'full',
                unsafe: `// ❌ POST 方法无类型约束
async function create(data) {
  return fetch('/api/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(r => r.json())
}`,
                safe: `// ✅ 完整请求类型
interface CreateUserDto {
  name: string; email: string; role: 'admin' | 'user'
}
async function post<T, R>(url: string, data: T): Promise<R> {
  return fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  }).then(r => r.json())
}
const result = await post<CreateUserDto, {id: number}>(
  '/api/users',
  {name: 'Alice', email: 'a@b.com', role: 'user'}
)`,
                description: '完整的请求/响应类型约束',
              },
            ],
          },
        },
        {
          id: 'ts-p13-3',
          type: 'callout',
          variant: 'tip',
          title: '类型驱动开发',
          text: '先定义 DTO（Data Transfer Object）和 API 返回类型，再写实现代码。类型即文档——接口调用方只看类型就能知道需要什么参数、返回什么数据。',
        },
      ],
    },

    // ========================================================================
    // 知识点 14：JS → TS 迁移策略（MigrationPlanner）
    // ========================================================================
    {
      order: 14,
      title: 'JS → TS 迁移策略',
      difficulty: 2,
      visualizationType: 'migration-planner',
      blocks: [
        {
          id: 'ts-p14-1',
          type: 'paragraph',
          text: '将 JavaScript 项目迁移到 TypeScript 是渐进式的过程——不需要一次性重写所有代码。合理的迁移策略可以零中断、低风险地实现类型安全。',
        },
        {
          id: 'ts-p14-2',
          type: 'demo',
          visualizationType: 'migration-planner',
          data: {
            title: 'JS → TS 渐进迁移路线图',
            stages: [
              {
                stage: 1,
                name: '添加 TS 编译器',
                description: '安装 TypeScript，用 allowJs: true 允许 JS 文件共存',
                actions: ['npm install -D typescript', '创建 tsconfig.json', '添加 tsc --noEmit 到 CI'],
                benefit: '零代码改动即可集成 TS 工具链',
                risk: 'low',
                estimatedTime: '1 小时',
              },
              {
                stage: 2,
                name: 'JS → TS 逐步重命名',
                description: '优先迁移工具函数和核心模块',
                actions: ['重命名 .js → .ts（从工具函数开始）', '添加基础类型标注', 'noImplicitAny: false 过渡'],
                benefit: '核心模块获得类型安全，IDE 智能提示',
                risk: 'low',
                estimatedTime: '1-2 周',
              },
              {
                stage: 3,
                name: '类型声明文件',
                description: '为第三方库和全局变量创建类型声明',
                actions: ['安装 @types/* 包', '为无类型库写 .d.ts', '定义全局类型和接口'],
                benefit: '完整的自动补全和编译错误提示',
                risk: 'medium',
                estimatedTime: '1 周',
              },
              {
                stage: 4,
                name: '开启严格模式',
                description: '逐步开启 strict 子项，修复所有类型错误',
                actions: ['开启 strictNullChecks', '开启 noImplicitAny', '修复类型错误'],
                benefit: '最高级别的类型安全',
                risk: 'medium',
                estimatedTime: '2-4 周',
              },
              {
                stage: 5,
                name: '类型优化与重构',
                description: '利用完整类型信息优化架构',
                actions: ['替换 any 为具体类型', '引入泛型减少重复', '使用 discriminated union'],
                benefit: '代码质量与可维护性大幅提升',
                risk: 'low',
                estimatedTime: '持续进行',
              },
            ],
          },
        },
        {
          id: 'ts-p14-3',
          type: 'callout',
          variant: 'warning',
          title: '迁移关键原则',
          text: '1) 渐进式——每次只迁移一个模块；2) 从叶子节点开始——先迁移被依赖最少的部分；3) CI 中跑 tsc --noEmit 防止退化；4) 允许 any 作为临时方案，但记录到技术债务清单。',
        },
      ],
    },

    // ========================================================================
    // 知识点 15：综合实战 —— 手写工具类型库（映射/条件/infer）
    // ========================================================================
    {
      order: 15,
      title: '综合实战：手写工具类型库',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'ts-p15-1',
          type: 'paragraph',
          lead: true,
          text: '工具类型是 TypeScript 类型系统的"乐高积木"。本实战串联映射类型、条件类型、infer 推断与键重映射，从零实现 Partial/Pick/Omit/ReturnType 四个核心工具类型，理解 TS 内置工具的底层原理。',
        },
        {
          id: 'ts-p15-2',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '面试常考"手写工具类型"，且工程中自定义工具类型（如 DeepPartial、GetOptional）能大幅减少重复类型代码。掌握映射类型 [K in keyof T]、条件类型 extends ?、infer 三大支柱，等于掌握了 TS 类型编程的核心语法。',
        },
        {
          id: 'ts-p15-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'typescript',
            hint: '在下方骨架中实现四个工具类型：用映射类型写 MyPartial/MyPick，用键重映射 + 条件类型写 MyOmit，用 infer 写 MyReturnType。',
            initialCode: `// 综合实战：手写工具类型库
// 目标：实现 4 个核心工具类型，理解 TS 类型编程三大支柱

// === 1. MyPartial<T>：所有属性变可选（映射类型 + ?）
// TODO: type MyPartial<T> = { ... }
//   - 用 [K in keyof T] 遍历键
//   - 每个键加 ? 修饰符，值类型 T[K]

// === 2. MyPick<T, K extends keyof T>：选取指定键
// TODO: type MyPick<T, K extends keyof T> = { ... }
//   - 用 [P in K] 遍历要选取的键
//   - 值类型 T[P]

// === 3. MyOmit<T, K>：排除指定键（键重映射 + 条件类型）
// TODO: type MyOmit<T, K extends keyof T> = { ... }
//   - 用 [P in keyof T as P extends K ? never : P]: T[P]
//   - as 重映射：P 属于 K 时映射为 never（被过滤）

// === 4. MyReturnType<T>：获取函数返回类型（infer）
// TODO: type MyReturnType<T extends (...args: any[]) => any> = ...
//   - 约束 T 为函数类型
//   - 用 T extends (...args: any[]) => infer R ? R : never 捕获返回值

// === 验证（取消注释自测）===
interface User { id: number; name: string; age: number }
// type PartialUser = MyPartial<User>          // { id?: number; name?: string; age?: number }
// type PickUser = MyPick<User, 'id' | 'name'> // { id: number; name: string }
// type OmitUser = MyOmit<User, 'age'>         // { id: number; name: number }
// type R = MyReturnType<() => string>         // string`,
            checks: [
              {
                description: 'MyPartial 使用映射类型 [K in keyof T] 加 ? 修饰符',
                pattern: 'MyPartial[\\s\\S]*?\\{\\s*\\[K in keyof T\\]\\?:\\s*T\\[K\\]',
                hint: 'MyPartial 应写成 type MyPartial<T> = { [K in keyof T]?: T[K] }。关键是 [K in keyof T] 遍历键 + ? 让属性可选。',
              },
              {
                description: 'MyPick 约束 K extends keyof T 并用 [P in K] 遍历',
                pattern: 'MyPick<T,\\s*K extends keyof T>[\\s\\S]*?\\{\\s*\\[P in K\\]:\\s*T\\[P\\]',
                hint: 'MyPick<T, K extends keyof T> = { [P in K]: T[P] }。K 必须约束为 keyof T 的子集，[P in K] 遍历选取的键。',
              },
              {
                description: 'MyOmit 用键重映射 as + 条件类型过滤键',
                pattern: 'MyOmit[\\s\\S]*?\\[P in keyof T as P extends K\\s*\\?\\s*never\\s*:\\s*P\\]',
                hint: 'MyOmit 应写成 { [P in keyof T as P extends K ? never : P]: T[P] }。as 把属于 K 的键重映射为 never，映射类型会自动过滤 never 键。',
              },
              {
                description: 'MyReturnType 用 infer R 捕获函数返回类型',
                pattern: 'MyReturnType[\\s\\S]*?extends\\s*\\([\\s\\S]*?\\)\\s*=>\\s*infer R\\s*\\?\\s*R\\s*:\\s*never',
                hint: 'MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never。infer R 只能出现在条件类型的 extends 子句中。',
              },
              {
                description: 'MyReturnType 的类型参数约束 T 为函数类型',
                pattern: 'MyReturnType<T extends \\(\\.\\.\\.[\\s\\S]*?\\)\\s*=>\\s*any>',
                hint: 'MyReturnType 的泛型参数必须约束为函数：T extends (...args: any[]) => any。否则无法对非函数类型做条件匹配。',
              },
              {
                description: 'MyOmit 的 K 约束为 keyof T',
                pattern: 'MyOmit<T,\\s*K extends keyof T>',
                hint: 'MyOmit 的 K 应约束为 K extends keyof T，确保只能排除实际存在的键（比内置 Omit 更严格，内置 Omit 不约束 K）。',
              },
            ],
          },
        },
        {
          id: 'ts-p15-4',
          type: 'callout',
          variant: 'warning',
          title: '实战反思',
          text: '内置 Omit 的 K 未约束为 keyof T，传不存在的键不报错（设计取舍）。手写 MyOmit 加 K extends keyof T 更严格但与内置行为不一致。工程中：库作者优先兼容内置行为，应用代码可加约束。键重映射（as）是 TS 4.1+ 特性，老项目需确认版本。',
        },
      ],
    },

    // ========================================================================
    // 知识点 16：综合实战 —— 类型安全的 API 响应解析器
    // ========================================================================
    {
      order: 16,
      title: '综合实战：类型安全的 API 响应解析器',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'ts-p16-1',
          type: 'paragraph',
          lead: true,
          text: '真实 API 返回的数据不可信——字段可能缺失、类型可能不符。本实战串联泛型、unknown、自定义类型守卫与错误处理，构建一个类型安全的 API 响应解析器，在编译期和运行时双重保障类型安全。',
        },
        {
          id: 'ts-p16-2',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: 'fetch/axios 返回 any，直接断言 as User 是"相信网络"的危险做法——接口变更时运行时崩溃。正确做法是声明 unknown + 类型守卫逐层校验。这是 any/unknown/类型守卫三个知识点的综合应用，也是工程中最常见的类型安全场景。',
        },
        {
          id: 'ts-p16-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'typescript',
            hint: '在下方骨架中实现：泛型 fetchJson、unknown 收窄、自定义类型守卫 isUser、错误处理。右侧检查清单逐项校验。',
            initialCode: `// 综合实战：类型安全的 API 响应解析器
// 目标：用泛型 + unknown + 类型守卫构建安全的 API 解析层

interface User {
  id: number
  name: string
  email: string
}

// === 1. 自定义类型守卫：判断未知值是否为 User
// TODO: function isUser(data: unknown): data is User { ... }
//   - 先 typeof data === 'object' && data !== null
//   - 再用 'id' in data / 'name' in data / 'email' in data 检查键存在
//   - 用 typeof 校验每个字段的类型（id 是 number、name/email 是 string）

// === 2. 泛型 fetchJson：请求并返回 unknown（而非 any）
// TODO: async function fetchJson<T>(url: string): Promise<T> { ... }
//   - const res = await fetch(url)
//   - if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
//   - return await res.json() as T  // 注意：json() 返回 any，断言为 T 由调用方守卫

// === 3. 安全获取 User：fetch + 守卫 + 错误处理
// TODO: async function getUser(id: number): Promise<User> { ... }
//   - const data = await fetchJson<unknown>(\`/api/users/\${id}\`)  // 先当 unknown
//   - if (!isUser(data)) throw new Error('Invalid user shape')
//   - return data  // 此处 data 已收窄为 User

// === 4. 批量获取：Promise.all + 守卫过滤
// TODO: async function getValidUsers(ids: number[]): Promise<User[]> { ... }
//   - const results = await Promise.all(ids.map(id => getUser(id).catch(() => null)))
//   - return results.filter((u): u is User => u !== null)`,
            checks: [
              {
                description: 'isUser 是返回 data is User 的自定义类型守卫',
                pattern: 'function isUser\\s*\\(\\s*data:\\s*unknown\\s*\\)\\s*:\\s*data is User',
                hint: '签名必须为 function isUser(data: unknown): data is User。"data is User" 是谓词返回类型，让 TS 在 if 分支内收窄 data 为 User。',
              },
              {
                description: 'isUser 内用 typeof + in 检查对象结构与字段类型',
                pattern: "isUser[\\s\\S]*?typeof\\s+data\\s*===\\s*['\"]object['\"][\\s\\S]*?['\"]id['\"]\\s+in\\s+data",
                hint: '先 typeof data === "object" && data !== null（排除 null），再用 "id" in data / "name" in data / "email" in data 检查键存在，最后 typeof 校验字段类型（id 为 number 等）。',
              },
              {
                description: 'fetchJson 是泛型函数 <T> 且返回 Promise<T>',
                pattern: 'function fetchJson<T>\\s*\\(\\s*url:\\s*string\\s*\\)\\s*:\\s*Promise<T>',
                hint: 'fetchJson<T>(url: string): Promise<T>。泛型 T 让调用方决定期望类型。注意 res.json() 返回 any，用 as T 断言但真实安全由调用方守卫保证。',
              },
              {
                description: 'fetchJson 内检查 res.ok 并抛错',
                pattern: '!res\\.ok[\\s\\S]*?throw',
                hint: 'HTTP 错误需显式处理：if (!res.ok) throw new Error(`HTTP ${res.status}`)。fetch 不会因 4xx/5xx 抛错，只有网络错误才 reject。',
              },
              {
                description: 'getUser 先按 unknown 请求再用 isUser 守卫收窄',
                pattern: 'getUser[\\s\\S]*?fetchJson<unknown>[\\s\\S]*?isUser\\s*\\(',
                hint: 'getUser 应 const data = await fetchJson<unknown>(...) 先当 unknown，再 if (!isUser(data)) throw，守卫通过后 data 自动收窄为 User。切勿直接 fetchJson<User> 跳过守卫。',
              },
              {
                description: 'getValidUsers 用类型谓词 filter (u): u is User 过滤 null',
                pattern: "filter\\s*\\(\\s*\\(u\\)\\s*:\\s*u is User\\s*=>\\s*u !== null\\s*\\)",
                hint: '批量场景用 Promise.all + catch 兜底返回 null，再 filter((u): u is User => u !== null)。类型谓词 u is User 让 TS 知道过滤后数组是 User[] 而非 (User|null)[]。',
              },
            ],
          },
        },
        {
          id: 'ts-p16-4',
          type: 'callout',
          variant: 'warning',
          title: '实战反思',
          text: '手写守卫在大对象时冗长且易漏字段，工程中常用 zod / io-ts / valibot 等 schema 校验库——既做运行时校验又自动推导 TS 类型，一份 schema 两端受益。本练习手写守卫是为了理解原理，生产环境优先 schema 库。另外 fetchJson 的 as T 是"信任边界"标记，真正的安全在守卫层。',
        },
      ],
    },

    // ========================================================================
    // 知识点 17：TypeScript 面试题（Accordion）
    // ========================================================================
    {
      order: 17,
      title: 'TypeScript 面试题精选',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'ts-p17-1',
          type: 'paragraph',
          text: '精选 TypeScript 高频面试题，涵盖类型系统、泛型、工具类型和工程实践。点击展开查看答案。',
        },
        {
          id: 'ts-p17-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: interface 和 type 的区别是什么？什么场景用哪个？',
                content: '主要区别：\n1. interface 支持声明合并（同名自动合并），type 不支持。\n2. type 可以定义联合类型和元组，interface 不能。\n3. interface 用 extends 扩展，type 用 & 交叉。\n\n实践：\n- 定义对象形状优先 interface（支持扩展）。\n- 联合类型/元组/工具类型用 type。\n- 团队内部统一一种风格即可。',
              },
              {
                title: 'Q2: any 和 unknown 的区别？',
                content: '两者都接受任意值，但类型安全度不同。\n\nany：\n- 关闭所有类型检查。\n- 可赋值给任何类型，也可访问任意属性而不报错。\n\nunknown：\n- 类型安全的 any 替代。\n- 可以赋值给 unknown，但 unknown 不能赋值给其他类型（除 unknown 和 any）。\n- 不能访问任何属性。\n\n使用 unknown 需用类型守卫（typeof/instanceof/in/自定义 is 函数）收窄后才能操作。',
              },
              {
                title: 'Q3: extends 关键字在不同上下文中的含义？',
                content: 'extends 有三个用途，语法相同但编译行为不同：\n\n1. 接口继承：interface A extends B。\n2. 泛型约束：T extends HasLength，限制 T 必须满足某个形状。\n3. 条件类型：T extends U ? X : Y，根据类型关系做分支判断。',
              },
              {
                title: 'Q4: keyof 和 typeof 在类型系统中的用法？',
                content: '两者用于不同的类型查询场景：\n\nkeyof T：\n- 获取类型 T 的所有键名组成的联合类型。\n- 是映射类型和泛型约束的核心工具。\n\ntypeof（类型上下文）：\n- 获取 JS 值的类型（不是运行时的 typeof）。\n\n结合使用：\ntype Keys = keyof typeof obj 获取对象的键名联合类型。',
              },
              {
                title: 'Q5: 什么是分布式条件类型？如何避免？',
                content: '裸类型参数 T 在条件类型 T extends U ? X : Y 中会分发：\n\n- 如果是联合类型 A | B，则求值为 (A extends U ? X : Y) | (B extends U ? X : Y)。\n\n避免分发的方法：\n- 用 [T] extends [U] 包裹。\n- 或用 { t: T } extends { t: U } 包裹。',
              },
              {
                title: 'Q6: TypeScript 的 strict 模式包含哪些子选项？',
                content: 'strict: true 开启以下子项：\n\n- strictNullChecks：严格空值检查\n- noImplicitAny：禁止隐式 any\n- strictFunctionTypes：严格函数类型检查\n- strictBindCallApply\n- strictPropertyInitialization\n- noImplicitThis\n- alwaysStrict\n- useUnknownInCatchVariables',
              },
              {
                title: 'Q7: never 类型有什么用？什么时候会得到 never？',
                content: 'never 表示"永不出现的值"。\n\n两种得到 never 的场景：\n1. 函数永不返回（抛错、无限循环）。\n2. 联合类型收窄到穷尽后剩余分支。\n\n用途：\n1. 穷尽检查（exhaustive check）——在 switch 的 default 分支赋值给 never 类型变量，若漏处理一个 union 成员则编译报错。\n2. 过滤联合类型，如 Exclude<T, never>。\n3. 表示不可能的状态。\n\n特性：never 是所有类型的子类型，可赋值给任何类型。',
              },
              {
                title: 'Q8: 协变与逆变是什么？TS 函数参数是协变还是逆变？',
                content: '协变（Covariance）：\n- 子类型关系与参数化方向一致。\n- 例：Dog[] 是 Animal[] 的子类型。\n\n逆变（Contravariance）：\n- 方向相反。\n- 例：(x: Animal) => void 是 (x: Dog) => void 的子类型（参数更宽的函数可替代参数更窄的）。\n\nTS 中的处理：\n- 方法参数（method shorthand）默认双变（bivariant，宽松）。\n- 普通函数参数在 strictFunctionTypes 下逆变。\n\n这就是 strictFunctionTypes 能捕获回调参数类型错误的原理。',
              },
              {
                title: 'Q9: 函数重载怎么写？实现签名为什么不能被外部调用？',
                content: '重载写法：\n1. 先写多个 overload signature（只有类型无函数体）。\n2. 最后写一个 implementation signature（含 body，参数用宽松类型如 any）。\n\n外部调用时只能匹配 overload signature，implementation signature 对外不可见。\n\n原因：\n- 实现签名是为编译器提供运行时实现。\n- 其参数类型通常比任意一个重载都宽（联合），直接暴露会失去重载的精确性。\n\n注意：重载顺序——更具体的类型放前面，否则会被宽类型先匹配。',
              },
              {
                title: 'Q10: as const 有什么用？和普通 const 有何区别？',
                content: '两者性质完全不同：\n\nconst：\n- 运行时变量不可重新赋值。\n- 但类型仍被拓宽（const x = "hi" 推断为 string）。\n\nas const：\n- 类型断言，把值断言为最窄的字面量类型并全部 readonly。\n- const x = "hi" as const 推断为 "hi"。\n- const arr = [1, 2] as const 推断为 readonly [1, 2]。\n\n用途：\n- 定义常量联合\n- 精确对象类型\n- 配合 satisfies 保留字面量\n\n注意：as const 是编译期行为，不产生运行时冻结。',
              },
              {
                title: 'Q11: 枚举（enum）有什么陷阱？为什么不推荐用？',
                content: 'enum 陷阱：\n1. 数字枚举会生成反向映射代码（enum["A"]=0 和 enum[0]="A"），增大体积。\n2. 数字枚举不安全——任何 number 都可赋值给数字枚举。\n3. const enum 在 isolatedModules 下不可用，且不同编译器（如 esbuild/swc）对 const enum 的处理不一致，可能运行时报错。\n4. 字符串枚举虽安全但写法冗长。\n\n推荐替代：\n- 联合字面量类型 + as const，如 type Status = "active" | "inactive"。',
              },
              {
                title: 'Q12: 类型断言 as 和类型守卫（narrowing）有什么本质区别？',
                content: '类型断言 as：\n- "你说什么编译器就信什么"。\n- 不做运行时检查，编译器不验证断言是否成立。\n- 错用会把错误推迟到运行时。\n\n类型守卫（typeof/instanceof/in/自定义 is 函数）：\n- 基于运行时值的真实检查。\n- 编译器根据检查结果收窄类型，类型安全。\n\n原则：\n- 优先用类型守卫。\n- 仅在确认安全且无法用守卫表达时（如解析 JSON 后已知结构）才用 as，且最好紧跟运行时校验。\n- unknown + 守卫是替代 any + as 的安全模式。',
              },
              {
                title: 'Q13 【对比题】: Partial<T> 和 Readonly<T> 在实现上有何异同？',
                content: '两者都是映射类型，遍历 keyof T：\n- Partial：把每个属性变可选（加 ?）。\n- Readonly：把每个属性变只读（加 readonly）。\n\n实现：\n- type Partial<T> = { [K in keyof T]?: T[K] }\n- type Readonly<T> = { readonly [K in keyof T]: T[K] }\n\n相同点：都基于映射类型 [K in keyof T]，不改变属性类型本身。\n\n不同点：\n- 修饰符不同（? vs readonly）。\n- 可叠加成 Readonly<Partial<T>>。\n\nTS 4.1+ 还支持修饰符增删：\n- -readonly 移除只读\n- -? 移除可选（Required 的实现）',
              },
              {
                title: 'Q14 【对比题】: Omit<T,K> 和 Pick<T,K> 的关系？Omit 是 TS 内置还是可手写？',
                content: '两者互补：\n- Pick<T, K extends keyof T>：选取指定键 { [P in K]: T[P] }。\n- Omit<T, K>：排除指定键。\n\nOmit 是 TS 内置：\n- 定义为 Omit = Pick<T, Exclude<keyof T, K>>，即"取反再 Pick"。\n- 是 Pick + Exclude 的组合。\n\n手写 Omit 注意点：\n- 直接 { [P in keyof T as P extends K ? never : P]: T[P] } 用键重映射更精确。\n- 内置 Omit 的 K 不约束为 keyof T，可能接受不存在的键而不报错（这是已知的设计取舍）。\n\n实践：\n- Omit 适合"排除少数字段"。\n- Pick 适合"只取少数字段"。',
              },
              {
                title: 'Q15 【场景题】: 一个 JS 项目要迁移到 TS，如何制定迁移策略避免影响线上？',
                content: '渐进式迁移策略：\n1. allowJs + checkJs 开启，先让 TS 编译器能识别 JS 文件。\n2. strict: false 起步，逐个开启子选项（先 noImplicitAny，再 strictNullChecks），避免一次性开 strict 导致几千个报错阻塞。\n3. 按依赖顺序迁移：叶子模块（工具函数、类型定义）先迁，入口/业务后迁。\n4. 为第三方无类型库写 .d.ts 声明或装 @types。\n5. 用 // @ts-ignore / unknown 临时压制高风险报错，加 TODO 跟进。\n6. CI 卡新增报错（tsc --noEmit）但允许存量。\n7. 关键路径补类型测试。\n\n原则：类型安全是过程不是开关，优先保护核心数据流。',
              },
              {
                title: 'Q16 【场景题】: 团队 TS 项目编译慢，如何排查与优化？',
                content: '排查与优化分两步走。\n\n排查：\n1. tsc --extendedDiagnostics 看检查时间/文件数/类型数，定位是类型展开慢还是文件多。\n2. 检查是否有大量 any/断言导致类型推断退化。\n3. 检查复杂条件类型/映射类型是否在巨型联合上分发。\n4. 第三方 .d.ts 是否过大（如完整 DOM lib）。\n\n优化：\n1. project references 拆分，按子项目增量编译。\n2. isolatedModules + 用 esbuild/swc 转译（只做类型剥离不做类型检查），tsc 仅做 --noEmit 类型检查。\n3. 开启 incremental + tsBuildInfoFile 缓存。\n4. 收窄联合规模，用品牌类型/枚举替代超大字面量联合。\n5. 避免 any 回流污染推断。\n\n权衡：类型越精确检查越慢，按核心/非核心分级严格度。',
              },
              {
                title: 'Q17: 声明文件 .d.ts 的作用是什么？如何为第三方库编写？',
                content: '.d.ts 是只含类型、不含实现的声明文件，运行时被完全擦除。\n\n核心作用：\n1. 为纯 JS 库提供类型——安装 @types/lodash 即获得类型补全。\n2. 全局类型扩展——declare global 给 window 加自定义属性。\n3. 模块声明——declare module "*.css" 让 import 能识别非 JS 资源。\n\n编写要点：\n- 三斜杠指令：/// <reference types="node" /> 引入依赖类型。\n- export 导出对外 API 的类型，内部实现不暴露。\n- 配合 package.json 的 "types" 字段指向入口 .d.ts。\n\n易错点：声明文件只能写类型不能写值，const x = 1 这种会报错，需用 declare const x: number。',
              },
              {
                title: 'Q18: import type 与普通 import 有何区别？何时使用？',
                content: 'import type 只引入类型，不产生运行时代码。\n\n区别：\n1. import type { User } from "./types"——编译后被完全擦除，不出现在产物里。\n2. 普通 import { User }——如果 User 只是类型也会被擦除，但若是值（class/enum/const）则保留。\n3. import type 在 isolatedModules 下必需——某些转译器（esbuild/swc）逐文件编译无法判断符号是类型还是值。\n\n何时使用：\n- 仅用于类型标注时优先 import type，语义更清晰。\n- 配合 verbatimModuleSyntax: true 强制区分类型导入与值导入。\n\n注意：默认导出的类型只能用 import type 整体导入，不能 import { type X } 拆分（除非 TS 4.5+ 的内联 type 修饰符）。',
              },
              {
                title: 'Q19: ES modules 与 namespace 有何区别？为什么推荐 ES modules？',
                content: '两者都是组织代码的方式，但机制完全不同。\n\nES modules：\n1. 文件即模块，import/export 显式声明依赖。\n2. 编译为 CommonJS/ESM 等标准格式，与运行时模块系统一致。\n3. 支持静态分析——tree-shaking、按需导入。\n\nnamespace：\n1. 用 namespace Foo {} 在全局/文件作用域定义命名空间，用 Foo.x 访问。\n2. 本质是编译期的对象合并，运行时是真实对象。\n3. 容易污染全局，依赖关系隐式。\n\n推荐 ES modules 的原因：\n- 现代 TS 项目默认 module: ESNext，namespace 是历史遗留方案。\n- namespace 在 isolatedModules 下行为不一致，跨编译器兼容性差。\n- 仅 .d.ts 全局类型扩展场景才适合用 declare global / namespace。',
              },
              {
                title: 'Q20: 索引签名 [key: string]: T 与 Record<string, T> 有何区别？',
                content: '两者都表达"键为 string、值为 T 的对象"，但用法和约束不同。\n\n索引签名：\n- 写法：interface Foo { [key: string]: T; name: string }。\n- 允许任意字符串键，且已具名属性的类型必须兼容索引值类型。\n- 适合对象形状不固定的场景（如缓存表）。\n\nRecord<K, V>：\n- 写法：type Foo = Record<string, T>，本质是映射类型 { [P in K]: V }。\n- 更严格——Record<"a"|"b", T> 只允许指定键。\n- 不允许混入具名属性，纯字典场景更清晰。\n\n选择：固定键用 Record<联合, T>，开放键用索引签名。两者结合 keyof 可获取键联合。',
              },
              {
                title: 'Q21: 元组类型与具名元组是什么？什么场景用？',
                content: '元组是"固定长度 + 每位固定类型"的数组。\n\n基础元组：\n- const pair: [string, number] = ["age", 30]，按位置约束类型。\n- 访问 pair[0] 推断为 string，pair[1] 为 number。\n\n具名元组（TS 4.0+）：\n- const user: [name: string, age: number] = ["Alice", 30]。\n- 仅为可读性，类型行为与基础元组一致。\n\n可变元组（TS 4.0+）：\n- type Tail<T extends any[]> = T extends [head: any, ...tail: infer R] ? R : never。\n- 用 ...spread 在元组中展开，支持 concat 类型推导。\n\n场景：函数返回多值（如 useState 返回 [value, setter]）、CSV 行解析、坐标点。避免在 API 边界用元组——结构含义靠位置记忆，对象更可读。',
              },
              {
                title: 'Q22: readonly 修饰符与 ReadonlyArray<T> 有何区别？',
                content: '两者都表达"不可变"，但作用层级不同。\n\nreadonly 修饰符（属性级）：\n- interface Foo { readonly id: number; name: string }。\n- 仅锁定单个属性，name 仍可改。\n- 只防赋值不防深层——obj.nested.x = 1 仍可改。\n\nReadonlyArray<T> / readonly T[]（数组级）：\n- const arr: readonly number[] = [1, 2, 3]。\n- 禁止 push/pop/splice 等变更方法，但元素仍可改（若元素是对象）。\n- 等价于 ReadonlyArray<number>。\n\n深只读：需用 Readonly<T> 递归或自定义 DeepReadonly<T>。const 断言（as const）是最简的深只读方式，把整个结构变 readonly + 字面量类型。',
              },
              {
                title: 'Q23: 可选链 ?. 与非空断言 ! 有何本质区别？',
                content: '可选链 ?. 是运行时安全访问，非空断言 ! 是编译期假设。\n\n可选链 ?.：\n- obj?.foo 在运行时检查 obj 是否 null/undefined，是则短路返回 undefined。\n- 类型上 obj?.foo 推断为 T | undefined。\n- 类型安全——运行时不会崩溃。\n\n非空断言 !：\n- obj!.foo 告诉编译器"我知道 obj 不是 null"，编译器不再报错。\n- 运行时无任何检查，若 obj 真为 null 则崩溃。\n- 危险——把错误从编译期推迟到运行时。\n\n选择原则：默认用 ?.，仅在确认值必存在（如刚做 typeof 检查后）且 ?. 语义不恰当时用 !。?. 链可级联：user?.address?.city?.length，任一层为空都安全短路。',
              },
              {
                title: 'Q24: 类型拓宽（widening）是什么？如何控制？',
                content: '拓宽指字面量类型被自动放宽为更宽的基础类型。\n\n典型场景：\n- const x = "hi" → 类型 "hi"（不拓宽，因 const 不可变）。\n- let x = "hi" → 类型 string（拓宽，因 let 可变）。\n- const arr = [1, 2] → 类型 number[]（元素类型拓宽，非元组 [1, 2]）。\n- const obj = { x: 1 } → { x: number }（属性值拓宽）。\n\n控制方式：\n1. as const 把字面量全部锁定为最窄类型，并加 readonly。\n2. 显式标注：const arr: [1, 2] = [1, 2]。\n3. satisfies 保留字面量推断：const palette = { red: [255,0,0] } satisfies Record<string, Color>，palette.red 仍是 [255,0,0]。\n\n拓宽是 TS 为可变性服务的折中，理解它才能解释"为何推断成 string 而非字面量"。',
              },
              {
                title: 'Q25: 控制流分析（CFA）在类型收窄中起什么作用？',
                content: 'CFA 是 TS 根据代码控制流自动收窄类型的核心机制。\n\n工作原理：\n编译器在分析函数体时，跟踪每个变量在每个位置的当前类型。遇到条件分支、赋值、return 时更新类型状态。\n\n常见收窄：\n1. if (typeof x === "string") 分支内 x: string。\n2. if (x === null) return 后，后续 x 去掉 null。\n3. 赋值后收窄：x = getString(); x 变 string。\n4. const 赋值收窄到字面量，let 拓宽。\n\n局限：\n- 函数调用后类型可能失效——TS 假设函数有副作用，会重置部分收窄。\n- 嵌套闭包不收窄：if (x !== null) { setTimeout(() => x.foo()) } 报错，需用 const 局部变量冻结。\n\n理解 CFA 才能解释"为何在回调里类型又变宽了"。',
              },
              {
                title: 'Q26: 品牌类型（Branded Types）解决什么问题？如何实现？',
                content: '品牌类型用"幽灵字段"给同结构类型加区分标识，防止误用。\n\n问题：\nUserId 和 OrderId 都是 number，TS 结构类型系统认为两者可互换——传错 ID 不报错。\n\n实现：\n- type UserId = number & { readonly __brand: "UserId" }。\n- type OrderId = number & { readonly __brand: "OrderId" }。\n- 创建：function userId(n: number): UserId { return n as UserId }。\n- 使用：getUser(id: UserId) 只接受 UserId，传 OrderId 报错。\n\n运行时无开销——__brand 字段不存在，只在编译期起作用。适合 ID、Token、经纬度等"同结构但语义不同"的类型。结合 type-fest 等库的 Brand 工具可简化定义。',
              },
              {
                title: 'Q27: 递归类型有什么用？有什么限制？',
                content: '递归类型让类型自引用，用于表达树形/嵌套结构。\n\n典型用例：\n1. JSON 值：type Json = string | number | boolean | null | Json[] | { [k: string]: Json }。\n2. 深只读：type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }。\n3. 深可选：type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }。\n4. Promise 链：type Unwrap<T> = T extends Promise<infer U> ? Unwrap<U> : T。\n\n限制：\n- 尾递归优化（TS 4.5+）：用尾递归写法可处理更深的嵌套，否则 50 层左右触发栈溢出报错。\n- 类型实例化深度上限约 1000，超出报"Type instantiation is excessively deep"。\n- 复杂递归类型编译慢，需权衡精确度与编译性能。\n\n实践：树形数据用递归类型表达，但避免无限深——给递归加终止分支。',
              },
              {
                title: 'Q28: 模板字面量类型有哪些实战应用？',
                content: '模板字面量类型用反引号在类型层拼接字符串，实现强类型字符串。\n\n语法：\n- type EventName<T extends string> = `on${Capitalize<T>}`。\n- type Click = EventName<"click"> → "onClick"。\n\n实战应用：\n1. 事件名映射：type Listener<K extends keyof Events> = (e: Events[K]) => void，键约束为 `on${Capitalize<K>}`。\n2. CSS 类名联合：type Align = "left" | "center" | "right"；type Class = `text-${Align}` → "text-left" | "text-center" | "text-right"。\n3. 路由路径：type Route = `/users/${number}/posts/${number}`。\n4. 配合 Uppercase/Lowercase/Uncapitalize 做大小写变换。\n5. 键重映射中重命名：`[K in keyof T as \`get${Capitalize<K>}\`]`。\n\n局限：拼接结果过多时会膨胀成超大联合，影响编译性能。',
              },
              {
                title: 'Q29: 映射类型的键重映射 as 与修饰符增删 -?/-readonly 怎么用？',
                content: '两者是映射类型的高级能力，TS 4.1+ 引入。\n\n键重映射 as：\n- 语法：{ [K in keyof T as NewKey]: T[K] }。\n- 重命名键：`[K in keyof T as \`get${Capitalize<string & K>}\`]`。\n- 过滤键：[K in keyof T as K extends "id" ? never : K] 把 id 排除（映射类型自动跳过 never）。\n\n修饰符增删：\n- 加 ?：{ [K in keyof T]?: T[K] }（Partial 实现）。\n- 删 ?：{ [K in keyof T]-?: T[K] }（Required 实现）。\n- 加 readonly：{ readonly [K in keyof T]: T[K] }（Readonly 实现）。\n- 删 readonly：{ -readonly [K in keyof T]: T[K] }（Mutable 实现）。\n- 可叠加：-readonly + -? 同时移除。\n\n组合能力：键重映射 + 修饰符增删让自定义工具类型表达力接近运行时 map/filter。',
              },
              {
                title: 'Q30: 函数类型、可调用签名与构造签名怎么写？',
                content: '三种表达"可调用"的方式，适用场景不同。\n\n函数类型字面量：\n- type Fn = (x: number) => string，最简洁。\n- 适合独立函数类型别名。\n\n可调用签名（Call Signature）：\n- interface Fn { (x: number): string; description: string }。\n- 函数本身带属性时用——JS 中函数是对象，可挂属性。\n- 调用 const f: Fn = ... 后能访问 f.description。\n\n构造签名（Construct Signature）：\n- interface Ctor { new (x: number): Instance }。\n- 描述可被 new 的类/构造函数。\n- 用法：function make(C: Ctor) { return new C(1) }。\n\n区分：可调用签名用于普通函数调用 fn()，构造签名用于 new fn()。抽象类与接口配合时可约束 new 能力，是依赖注入的常见模式。',
              },
              {
                title: 'Q31: this 类型与 ThisType 有什么用？',
                content: 'this 类型让方法内 this 的类型显式化，避免动态 this 导致类型丢失。\n\nthis 类型参数：\n- class Builder { method(this: Builder) {...} } 显式声明 this 类型。\n- 链式调用：class Builder { add(): this { return this } }，子类继承后返回子类类型而非 Builder。\n- 防误用：function strict(this: User) {} 绑定调用方类型。\n\nThisType<T>：\n- 工具类型，让对象字面量内 this 推断为 T。\n- 典型场景：Vue2 的 methods/computed 内 this 指向组件实例。\n- 用法：const options = { methods: {...} } satisfies ThisType<MyComponent>。\n\n注意：this 类型在普通函数（非方法简写）中默认为 any，开启 noImplicitThis 后会报错，需显式标注。箭头函数没有自己的 this，继承外层。',
              },
              {
                title: 'Q32: 抽象类 abstract 与接口在描述对象形状时如何选择？',
                content: '两者都能定义抽象契约，但能力边界不同。\n\n抽象类 abstract：\n- 可含实现：abstract class Base { abstract name(): string; hello() { return "hi" } }。\n- 子类用 extends 继承，单继承。\n- 提供默认实现 + 强制子类实现抽象方法。\n- 运行时存在（编译为真实 class）。\n\n接口 interface：\n- 只描述形状，不含实现。\n- 类用 implements 实现多个接口。\n- 支持声明合并。\n- 运行时擦除。\n\n选择：\n- 需要默认实现 + 强制实现某些方法 → 抽象类。\n- 仅定义契约/形状、希望多实现、跨库扩展 → 接口。\n- TS 推荐：能用接口就用接口，抽象类是 JS class 的能力扩展，运行时开销真实存在。\n- 鸭子类型场景纯接口更轻量，OOP 继承链场景抽象类更合适。',
              },
              {
                title: 'Q33: 访问修饰符 public/private/protected 有何区别？运行时有效吗？',
                content: '三者控制类成员的可访问性，但都是编译期特性。\n\npublic（默认）：任意位置可访问。\nprivate：仅类内部可访问，子类与外部都不行。\nprotected：类内部与子类可访问，外部不行。\n\n运行时无效：\n- TS 的 private/protected 编译后被擦除，运行时仍可访问 obj.privateField。\n- 真要运行时私有用 ES2022 的 #field 私有字段：class Foo { #x = 1 }，编译为真实私有，Reflect 也访问不到。\n\n其他修饰符：\n- readonly：只读，构造函数内可赋值。\n- static：静态成员，挂在类上。\n- #field vs private：# 是运行时私有且不可被同名继承覆盖，private 是编译期约定。\n\n实践：库的内部实现用 #field 防止误用，团队协作用 private 表达意图即可。',
              },
              {
                title: 'Q34: 装饰器（Decorators）的现状与限制是什么？',
                content: '装饰器是给类/方法/属性/参数加注解的语法，TS 5.0 起原生支持 stage 3 装饰器。\n\n类型：\n1. 类装饰器：@Component class Foo {} 接收构造函数。\n2. 方法装饰器：@Log method() {} 接收 (target, key, descriptor)。\n3. 属性/参数装饰器：类似机制。\n\n现状：\n- TS 5.0+ 默认 stage 3（标准提案），与旧 experimentalDecorators 不兼容。\n- 旧装饰器（emitDecoratorMetadata + experimentalDecorators）仍是 NestJS/TypeORM 等主流框架的默认，迁移需时。\n- reflect-metadata 提供类型元数据，依赖旧装饰器。\n\n限制：\n- 装饰器不能改变被装饰者的类型签名（需配合 mixin 或类型推断）。\n- 运行时顺序固定（自下而上、方法→类），调试需理解执行顺序。\n\n实践：新项目优先 stage 3，旧框架沿用旧装饰器配置，避免混用。',
              },
              {
                title: 'Q35: const 类型参数 <const T> 有什么用？和 as const 有何区别？',
                content: 'const 类型参数（TS 5.0+）让函数泛型参数推断为字面量类型而不拓宽。\n\n语法：\n- function tuple<const T>(arr: readonly T[]): T { return arr[0] }。\n- 调用 tuple([1, 2, 3]) 推断 T 为 [1, 2, 3]（元组字面量），而非 number[]。\n\n与 as const 区别：\n- as const 是调用方手动断言：tuple([1,2,3] as const)。\n- <const T> 是函数作者声明"自动推断为字面量"，调用方无需每次加 as const。\n- const 类型参数等价于在调用点自动加 as const，更符合 API 设计者控制推断的诉求。\n\n场景：\n- 定义精确联合：function flags<const T extends string>(...vals: T[]): T[]。\n- 路由表/配置表：期望键为字面量联合而非 string。\n\n注意：const 类型参数会让推断更窄，可能因过度精确导致赋值报错，需权衡。',
              },
              {
                title: 'Q36: 结构类型系统与名义类型系统有何区别？TS 是哪种？',
                content: '两者是类型等价判定的两种哲学。\n\n结构类型（Structural）：\n- 只要结构匹配即视为同类型，不看名字。\n- type A = { x: number }; type B = { x: number }; A 和 B 可互换。\n- TS 默认是结构类型，源自 JS 的鸭子类型传统。\n\n名义类型（Nominal）：\n- 类型由名字决定，同结构不同名仍视为不同类型。\n- Java/C#/Rust 是名义类型，更严格但表达力受限。\n\nTS 中模拟名义类型：\n- 品牌类型：type UserId = number & { __brand: "UserId" }。\n- unique symbol：用唯一符号做品牌，更严谨。\n- 类实例：class UserId { private _brand: unique symbol }，类天然有名义色彩。\n\n影响：结构类型让组合更灵活，但同结构 ID 易混用；名义类型更安全但啰嗦。理解这点才能解释"为何传错 ID 不报错"。',
              },
              {
                title: 'Q37: 类型推导与显式标注如何取舍？',
                content: '核心原则：公共 API 显式标注，内部实现让推导。\n\n显式标注的场景：\n1. 函数返回值——库的对外 API 必须标注，避免内部实现变更导致返回类型漂移影响调用方。\n2. 函数参数——参数类型是契约，必须显式。\n3. 复杂泛型——推导结果可能不直观，显式标注更清晰。\n4. 对象字面量赋值给变量——避免拓宽，const + 显式类型或 satisfies。\n\n依赖推导的场景：\n1. 局部变量 const x = fn()——推导出的类型最精确。\n2. async 函数返回值——Promise<T> 由 return 推导。\n3. 解构——let { name } = obj 推导即可。\n\n反模式：\n- 给局部变量重复写类型（let x: number = 1）——冗余。\n- 用 any 替代推导——丢失精度。\n- 推导结果不直观时仍固执依赖推导——可读性差。\n\n平衡：以"调用方能否一眼看懂类型"为准，公共边界显式，内部推导。',
              },
              {
                title: 'Q38: satisfies 运算符与类型断言 as 有何区别？',
                content: 'satisfies 验证类型约束但不改变推断，as 强制断言改变推断。\n\nsatisfies（TS 4.9+）：\n- const palette = { red: [255, 0, 0] } satisfies Record<string, Color>。\n- 验证对象符合 Record<string, Color>，但 palette.red 仍推断为 [255, 0, 0]（精确字面量）。\n- 不通过约束时报错，安全。\n\nas：\n- const palette = { red: [255, 0, 0] } as Record<string, Color>。\n- palette.red 推断为 Color（拓宽），丢失字面量精度。\n- 不验证对象真实形状，可能误断言。\n\n选择：\n- 想验证约束 + 保留精确推断 → satisfies。\n- 想强制类型转换（如 JSON.parse 后） → as，但应紧跟运行时校验。\n- 联合类型收窄到具体分支 → 类型守卫优于 as。\n\nsatisfies 是 TS 4.9 后替代"显式标注 + 拓宽"折中方案的最佳实践。',
              },
              {
                title: 'Q39: 如何根据值类型过滤对象的属性（PickByType）？',
                content: '用映射类型 + 键重映射 + 条件类型实现按值类型筛选属性。\n\n实现：\ntype PickByType<T, V> = {\n  [K in keyof T as T[K] extends V ? K : never]: T[K]\n}\n\n原理：\n1. [K in keyof T] 遍历所有键。\n2. as T[K] extends V ? K : never——若值类型兼容 V 则保留键名，否则重映射为 never。\n3. 映射类型自动跳过 never 键，最终只保留符合的属性。\n\n用法：\n- interface Config { port: number; host: string; debug: boolean }。\n- type StringProps = PickByType<Config, string> → { host: string }。\n- type NumberProps = PickByType<Config, number> → { port: number }。\n\n扩展：配合 NonNullable 可过滤可选属性——type Required<T> = { [K in keyof T]-?: T[K] }。这是类型体操的典型模式：键重映射 + 条件类型 = 类型层的 filter/map。',
              },
              {
                title: 'Q40: DeepPartial 与 DeepReadonly 如何实现？有何陷阱？',
                content: '两者是递归映射类型，让类型深层变可选/只读。\n\nDeepPartial：\ntype DeepPartial<T> = {\n  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]\n}\n\nDeepReadonly：\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]\n}\n\n原理：递归遍历，遇到对象类型继续递归，基础类型停止。\n\n陷阱：\n1. 函数类型——T[K] extends object 会把函数也当对象递归，导致 () => void 被错误处理。需加排除：T[K] extends Function ? T[K] : ...。\n2. 数组——DeepReadonly<number[]> 会变成 { readonly [n: number]: number }，丢失数组方法。需特殊处理数组：T extends readonly any[] ? ReadonlyArray<T[number]> : ...。\n3. 循环引用——对象自引用会无限递归，TS 有深度上限保护。\n\n实践：复杂场景用 type-fest 库的 DeepPartial/DeepReadonly，已处理边界情况。',
              },
              {
                title: 'Q41: Promise<T> 与 async/await 的类型如何工作？',
                content: 'async 函数返回 Promise<T>，await 解包 Promise。\n\n类型规则：\n1. async function fn(): Promise<string> { return "hi" }——return 的值自动包装为 Promise。\n2. async function fn(): Promise<string> { return Promise.resolve("hi") }——直接返回 Promise 会被展平。\n3. const x: string = await fn()——await 解包 Promise<string> 为 string。\n4. async 函数中 await 非 Promise 值——值原样返回，类型不变。\n\n陷阱：\n1. 顶层 await——仅在 module 上下文可用，CommonJS 报错。\n2. await 必在 async 内——普通函数用 await 会报错，需用 .then() 或改成 async。\n3. Promise 链类型——Promise<T>.then<U>(cb) 返回 Promise<U>，cb 返回 Promise 会被展平。\n4. reject 类型——Promise 的 reject 是 any，无法类型化错误，需用 Result<T, E> 模式封装。\n\n实践：async/await 是 Promise 的语法糖，类型推断更友好，错误用 try/catch 处理。',
              },
              {
                title: 'Q42: 泛型默认值 <T = string> 有什么用？',
                content: '泛型默认值让调用方可省略类型参数，提升 API 易用性。\n\n语法：\n- interface Box<T = string> { value: T }。\n- 调用 const b: Box = { value: "hi" }，T 默认为 string。\n- 显式覆盖：const b: Box<number> = { value: 1 }。\n\n规则：\n1. 有默认值的类型参数可省略，无默认值的必须传入。\n2. 默认值不能引用排在后面的类型参数（需在前声明）。\n3. 默认值需满足该参数的 extends 约束。\n\n场景：\n1. 配置对象——interface Config<T = string> { items: T[] }，多数用 string。\n2. 工具类型——type State<T = any> = { value: T }，宽松默认。\n3. React 组件 Props——interface Props<T = unknown>，泛型组件默认 unknown。\n\n注意：默认值让 API 更易用，但也可能隐藏类型不精确——调用方应明确传入类型而非依赖默认。',
              },
              {
                title: 'Q43: 可变元组类型 ...args: [...T] 是什么？解决什么问题？',
                content: '可变元组（TS 4.0+）让元组支持泛型展开，是函数 concat 类型推导的关键。\n\n语法：\n- function concat<T extends readonly unknown[]>(...args: [...T]): T { return args }。\n- 调用 concat(1, "a", true) 推断 T 为 [number, string, boolean]。\n\n解决的问题：\n- 旧 TS 中 ...args: T[] 只能推出数组，丢失位置信息。\n- 可变元组让 ...args: [...T] 保留每个位置的精确类型。\n\n典型应用：\n1. curry 函数：function curry<T extends any[]>(...fn: T): (...args: T) => void。\n2. concat 类型：function concat<A extends readonly unknown[], B extends readonly unknown[]>(a: A, b: B): [...A, ...B]。\n3. useState：const [v, set] = useState<T>(init) 返回 [T, (v: T) => void]。\n\n注意：可变元组在条件类型 + infer 中也能展开——T extends [infer Head, ...infer Rest] ? Rest : []，实现元组类型递归。',
              },
              {
                title: 'Q44: 字面量收窄与 as const 在配置场景如何配合？',
                content: 'as const 把对象/数组断言为最窄字面量类型，是配置类型化的关键工具。\n\n场景：路由表/配置表期望键为字面量联合而非 string。\n\n示例：\nconst ROUTES = ["home", "about", "contact"] as const\n// 类型：readonly ["home", "about", "contact"]\ntype Route = typeof ROUTES[number]\n// "home" | "about" | "contact"\n\n要点：\n1. as const 让数组变元组而非 string[]，元素类型保留字面量。\n2. typeof ROUTES[number] 取数组元素的联合类型。\n3. 对象字面量同样适用：const CONFIG = { port: 3000 } as const，port 类型为 3000 而非 number。\n4. 配合 satisfies 验证约束：const CONFIG = { port: 3000 } satisfies Record<string, number>，CONFIG.port 仍是 3000。\n\n陷阱：as const 让一切变 readonly，运行时不可变，修改需先 [...arr] 解冻。',
              },
              {
                title: 'Q45 【场景题】: 项目依赖的第三方库没有类型声明，如何处理？',
                content: '分场景处理，优先用社区已有类型，其次手写最小声明。\n\n步骤：\n1. 查 @types——npm i -D @types/libname，多数主流库有社区维护的 .d.ts。\n2. 查库自带类型——package.json 的 "types" 或 "exports" 字段，新版库多自带 .d.ts。\n3. 都没有则手写最小声明：\n   - 在 src/types/global.d.ts 写 declare module "libname" { export function foo(x: number): string }。\n   - 只声明用到的 API，未知 API 用 any 兜底（后续逐步收窄）。\n4. 渐进收窄——用一段时间后，把 any 替换为精确类型，配合 unknown + 类型守卫。\n\n易错点：\n- declare module 整体用 any 会污染调用方推断，应尽量精确。\n- 全局声明文件需在 tsconfig 的 include 内。\n- 库升级后类型可能变化，定期核对 .d.ts 与实际 API。\n\n原则：类型是渐进的，先跑起来再精确化，避免阻塞业务。',
              },
              {
                title: 'Q46 【场景题】: 大型 monorepo 中如何组织共享类型？',
                content: '集中定义、按域分包、避免循环依赖。\n\n结构：\n1. types 包——单独的 @repo/types 包，集中存放跨包共享的领域类型（User/Order/DTO）。\n2. 按域分文件——types/user.ts、types/order.ts，barrel 导出 index.ts。\n3. 包内私有类型不放共享包，避免污染。\n\n实践：\n1. project references——tsconfig 用 references 拆分，类型变更增量编译。\n2. path mapping——tsconfig paths 配置 @repo/types/* 别名，开发期无需发布。\n3. 版本策略——共享类型包用 changeset/semantic-release 管理，避免破坏性变更。\n4. 不依赖运行时——types 包只含类型不含实现，避免循环依赖。\n\n陷阱：\n- 类型与运行时 schema 漂移——用 zod/io-ts 生成类型，单源真理。\n- 循环依赖——A 引 B 的类型，B 又引 A，需提取公共子类型到第三方文件。\n- 编译性能——巨型 types 包拖慢全仓编译，按域拆子包。\n\n原则：类型即契约，共享类型应像 API 一样有版本与变更流程。',
              },
              {
                title: 'Q47 【对比题】: enum、联合字面量类型、as const 对象三者的取舍？',
                content: '三者都表达"有限常量集合"，但机制与陷阱不同。\n\nenum：\n- enum Color { Red, Blue } 生成运行时对象，数字枚举有反向映射。\n- 陷阱：体积增大、数字枚举不安全、const enum 跨编译器不一致。\n- 适合需要运行时对象（迭代枚举值）的场景。\n\n联合字面量类型：\n- type Color = "red" | "blue"，编译期擦除，无运行时开销。\n- 安全——只能赋值指定字面量。\n- 缺点：不能像对象一样迭代，需配合 const COLORS = [...] as const。\n\nas const 对象：\n- const COLORS = { Red: "red", Blue: "blue" } as const。\n- 兼顾运行时值（可迭代）+ 类型联合（typeof COLORS[keyof typeof COLORS]）。\n- 最接近 enum 但无 enum 陷阱。\n\n推荐：新项目优先 as const 对象 + 联合字面量，兼顾运行时与类型安全；遗留 enum 保留，避免引入 const enum。',
              },
              {
                title: 'Q48 【对比题】: type alias 与 interface 在扩展与性能上有何差异？',
                content: '两者定义对象形状能力相近，但扩展机制和编译表现不同。\n\n扩展机制：\n- interface 用 extends 继承：interface B extends A {}，可多继承。\n- interface 支持声明合并——同名自动合并，库可被使用者扩展。\n- type 用交叉 &：type B = A & { x: number }，无声明合并。\n- type 可表达联合/元组/映射类型，interface 不能。\n\n性能：\n- 大型联合用 type 表达，interface 因不能定义联合需绕路。\n- interface 声明合并可能在大型项目产生意外合并结果（同名冲突）。\n- 编译速度两者差异通常可忽略，但巨型交叉 & 可能比 extends 慢。\n\n选择：\n- 公开 API 形状、希望被扩展 → interface。\n- 联合、元组、工具类型、复杂类型演算 → type。\n- 团队统一一种风格即可，混用增加认知负担。\n\nTS 官方建议：能用 interface 就用 interface，需要 type 独有能力时才用 type。',
              },
              {
                title: 'Q49 【对比题】: 泛型与函数重载在表达"多类型签名"时如何取舍？',
                content: '两者都能让函数适配多种类型，但表达力与适用场景不同。\n\n泛型：\n- function id<T>(x: T): T { return x }，一个签名覆盖所有类型。\n- 优点：类型精确、代码少、调用方推断。\n- 局限：不同类型参数组合的"实现逻辑"相同时才适合，逻辑不同需重载。\n- 适合：identity、map、容器、工具函数。\n\n函数重载：\n- function fn(x: string): number; function fn(x: number): string; 多签名 + 一实现。\n- 优点：每种参数组合可返回不同类型，实现可分支处理。\n- 局限：实现签名对外不可见，重载顺序敏感，维护成本高。\n- 适合：参数与返回类型有复杂映射、各分支逻辑不同的 API。\n\n取舍：\n- 逻辑统一、仅类型变化 → 泛型。\n- 逻辑分叉、各分支返回类型不同 → 重载。\n- 可先用泛型，发现需要分支实现时再升级为重载。\n- 重载签名应从具体到宽泛排序，避免被宽类型先匹配。',
              },
              {
                title: 'Q50 【综合】: TypeScript 类型体操的核心理念是什么？边界在哪？',
                content: '类型体操是把类型系统当编程语言用，实现类型层的计算。\n\n核心理念：\n1. 类型即值——类型参数像函数参数，条件类型像 if，映射类型像 map，infer 像 let。\n2. 递归与模式匹配——T extends [infer H, ...infer R] ? f<H> + rec<R> : []，递归遍历。\n3. 约束即契约——T extends Constraint 限定输入形状，保证类型安全。\n4. 组合优于继承——小工具类型组合成大工具类型，Partial<Omit<...>>。\n\n典型成果：\n- DeepPartial/DeepReadonly、GetOptional/GetRequired、Path<T>（路径联合）、Join（字符串拼接）。\n- type-fest、ts-toolbelt 等库提供大量现成体操工具。\n\n边界（何时不该体操）：\n1. 编译性能——递归类型在大型联合上分发会拖慢编译，tsc --extendedDiagnostics 排查。\n2. 可读性——过度体操的代码难维护，团队需有共识。\n3. 运行时无效——类型只在编译期，运行时校验仍需 zod/io-ts。\n4. 推断极限——某些类型（如反向推导对象键值类型）TS 无法表达，需运行时方案。\n\n实践：用体操消除重复类型代码，但保留"够用即可"的克制，类型精确度与维护成本要平衡。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 18：TypeScript 速查表
    // ========================================================================
    {
      order: 18,
      title: 'TypeScript 速查表',
      difficulty: 1,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ts-p18-1',
          type: 'paragraph',
          text: 'TypeScript 核心概念与常用语法速查。涵盖基础类型、泛型、工具类型和编译配置的关键语法。',
        },
        {
          id: 'ts-p18-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '分类',
            columns: ['语法/概念', '示例'],
            rows: [
              { feature: '基础类型', values: ['string / number / boolean / null / undefined / void / any / unknown / never', 'let n: number = 42'] },
              { feature: '数组与元组', values: ['T[] / Array<T> / [T1, T2]', 'const a: string[] = ["a"]'] },
              { feature: '联合与交叉', values: ['| 联合 / & 交叉', 'type A = string | number'] },
              { feature: 'interface', values: ['interface Name { prop: T }', 'interface User { name: string }'] },
              { feature: 'type 别名', values: ['type Name = T', 'type ID = string | number'] },
              { feature: '泛型', values: ['<T> / <T extends Constraint>', 'function id<T>(x: T): T'] },
              { feature: '工具类型', values: ['Partial / Required / Pick / Omit / Record / Exclude / Extract', 'type P = Partial<User>'] },
              { feature: '条件类型', values: ['T extends U ? X : Y', 'type IsStr<T> = T extends string ? true : false'] },
              { feature: 'infer', values: ['T extends (...args: any[]) => infer R ? R : never', 'ReturnType<T>'] },
              { feature: '映射类型', values: ['[K in keyof T]: NewType', 'type RO<T> = { readonly [K in keyof T]: T[K] }'] },
              { feature: '类型守卫', values: ['typeof / instanceof / in / is', 'function isCat(a: any): a is Cat'] },
              { feature: 'tsconfig', values: ['strict / target / module / paths', '{ "strict": true, "target": "ES2022" }'] },
              { feature: '声明文件', values: ['declare / .d.ts', 'declare module "*.css"'] },
              { feature: 'satisfies', values: ['expression satisfies Type', 'palette satisfies Record<string, Color>'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 19：TypeScript 小测验（QuizCard）
    // ========================================================================
    {
      order: 19,
      title: 'TypeScript 小测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'ts-p19-1',
          type: 'paragraph',
          text: '通过以下测验检验你对 TypeScript 核心概念的掌握程度。每题附有详细解析。',
        },
        {
          id: 'ts-p19-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '【记忆】以下哪个类型是 any 的类型安全替代品？',
                options: ['never', 'void', 'unknown', 'undefined'],
                correctIndex: 2,
                explanation: 'unknown 是 any 的类型安全替代品。unknown 类型的值不能直接使用，必须先做类型收窄（typeof、instanceof、自定义守卫）才能操作。any 则完全关闭类型检查。',
              },
              {
                question: '【记忆】interface 相比 type 的独特优势是什么？',
                options: ['能定义联合类型', '能定义元组', '声明合并（同名自动合并）', '能使用泛型'],
                correctIndex: 2,
                explanation: '只有 interface 支持声明合并——同名的 interface 会自动合并属性。这在对第三方库或全局类型进行扩展时非常有用。type 定义联合类型和元组是 type 的独特优势。',
              },
              {
                question: '【理解】strictNullChecks 开启后，以下代码会怎样？\nlet name: string = null',
                options: ['正常运行', '编译报错：null 不能赋值给 string', '运行时错误', '警告但不影响编译'],
                correctIndex: 1,
                explanation: 'strictNullChecks 开启后，null 和 undefined 不能赋值给其他类型（string、number 等）。需要显式使用联合类型：let name: string | null = null。这是 strict 模式的核心功能之一。',
              },
              {
                question: '【理解】infer 关键字的正确使用位置是？',
                options: ['类型别名的右侧', '条件类型的 extends 子句中', '函数的参数位置', '变量的类型标注中'],
                correctIndex: 1,
                explanation: 'infer 只能在条件类型（T extends U ? X : Y）的 extends 子句中使用，用于声明待推断的类型变量。如 T extends Promise<infer R> ? R : never。',
              },
              {
                question: '【理解】以下关于泛型约束 extends 的说法，哪个是正确的？',
                options: [
                  'extends 只能用于 interface 继承',
                  'extends 约束让泛型参数必须满足特定形状',
                  'extends 在条件类型中不工作',
                  'extends 只能约束类不能约束函数',
                ],
                correctIndex: 1,
                explanation: '泛型约束 extends 限制泛型参数必须满足特定的类型形状。例如 <T extends HasLength> 确保 T 一定有 length 属性，函数体内可以安全访问它。如果传入不满足约束的类型，编译器会报错。',
              },
              {
                question: '【应用】satisfies 运算符（TS 4.9+）的作用是？',
                options: [
                  '强制类型转换',
                  '验证表达式是否符合某个类型，同时保留最精确的推断类型',
                  '创建新的类型别名',
                  '将类型变为只读',
                ],
                correctIndex: 1,
                explanation: 'satisfies 验证表达式是否符合类型约束，但不改变 TS 的类型推断结果。这意味着可以同时获得类型验证和精确的字面量类型推断。const palette = { red: [255,0,0] } satisfies Record<string, Color> 中 palette.red 类型仍是 [255,0,0] 而非 Color。',
              },
              {
                question: '【记忆】TS 中获取对象所有键名联合类型的操作符是？',
                options: ['typeof', 'keyof', 'infer', 'instanceof'],
                correctIndex: 1,
                explanation: 'keyof T 获取类型 T 的所有键名组成的联合类型。typeof 在类型上下文获取 JS 值的类型。结合 type Keys = keyof typeof obj 可获取对象的键名联合。',
              },
              {
                question: '【理解】以下哪个类型表示"永不出现的值"，可用于穷尽检查？',
                options: ['void', 'null', 'never', 'undefined'],
                correctIndex: 2,
                explanation: 'never 表示永不出现的值。在 switch 的 default 分支把值赋给 never 类型变量，若漏处理联合的一个成员则编译报错，这就是穷尽检查（exhaustive check）。',
              },
              {
                question: '【应用】const x = "hi" as const 推断出的类型是？',
                options: ['string', '"hi"', 'readonly string', 'unknown'],
                correctIndex: 1,
                explanation: 'as const 把值断言为最窄的字面量类型。const x = "hi" as const 推断为 "hi"（字面量类型），而普通 const x = "hi" 推断为 string（类型被拓宽）。',
              },
              {
                question: '【对比】any 和 unknown 的关键区别是？',
                options: [
                  '两者完全相同',
                  'any 关闭检查可任意操作，unknown 安全需收窄后才能操作',
                  'unknown 可任意操作，any 需收窄',
                  'any 只能赋值给 any',
                ],
                correctIndex: 1,
                explanation: 'any 关闭所有类型检查，可赋值给任何类型也可访问任意属性。unknown 是类型安全的 any——可接受任何值，但不能直接操作，必须先用类型守卫收窄。unknown 不能赋值给除 unknown/any 外的类型。',
              },
              {
                question: '【对比】Partial<T> 和 Required<T> 的关系是？',
                options: [
                  '两者相同',
                  'Partial 加 ?，Required 移除 ?（-?），互为逆操作',
                  'Partial 加 readonly，Required 移除 readonly',
                  'Partial 选取键，Required 排除键',
                ],
                correctIndex: 1,
                explanation: 'Partial<T> = { [K in keyof T]?: T[K] } 把属性变可选；Required<T> = { [K in keyof T]-?: T[K] } 用 -? 移除可选修饰符。两者互为逆操作。Readonly 与 -readonly 同理。',
              },
              {
                question: '【理解】关于数字枚举，以下说法错误的是？',
                options: [
                  '会生成反向映射代码增大体积',
                  '任何 number 都可赋值给数字枚举（不安全）',
                  'const enum 在 isolatedModules 下可用',
                  '推荐用联合字面量类型替代',
                ],
                correctIndex: 2,
                explanation: 'const enum 在 isolatedModules 下不可用，且 esbuild/swc 等编译器对 const enum 处理不一致可能运行时报错。数字枚举还有反向映射和类型不安全问题，故推荐 type Status = "a" | "b" 联合字面量替代。',
              },
              {
                question: '【应用】手写 ReturnType<T>（获取函数返回类型）的正确写法是？',
                options: [
                  'type ReturnType<T> = T',
                  'type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never',
                  'type ReturnType<T> = keyof T',
                  'type ReturnType<T> = T extends infer R ? R : never',
                ],
                correctIndex: 1,
                explanation: 'ReturnType 用条件类型 + infer：约束 T 为函数，在 extends 子句用 infer R 捕获返回类型，匹配则取 R 否则 never。infer 只能出现在条件类型的 extends 子句中。',
              },
              {
                question: '【场景】解析 JSON.parse(res) 后想安全访问 data.user.name，最佳实践是？',
                options: [
                  'const r = JSON.parse(res) as any; r.data.user.name',
                  'const r: unknown = JSON.parse(res); 用类型守卫逐层收窄后再访问',
                  'const r = JSON.parse(res); r.data.user.name（依赖隐式 any）',
                  'const r = JSON.parse(res) as {data:{user:{name:string}}}; 直接访问',
                ],
                correctIndex: 1,
                explanation: 'JSON.parse 返回 any，直接断言为具体类型（选项4）跳过运行时校验，结构不符时运行时崩溃。安全做法：声明 unknown，用类型守卫（typeof/对象校验库）逐层收窄。unknown + 守卫是替代 any + as 的安全模式。',
              },
              {
                question: '【理解】分布式条件类型：type T = (A | B) extends U ? X : Y 的求值结果是？',
                options: [
                  '(A extends U ? X : Y) & (B extends U ? X : Y)',
                  '(A extends U ? X : Y) | (B extends U ? X : Y)',
                  'A | B extends U ? X : Y 整体判断',
                  '编译错误',
                ],
                correctIndex: 1,
                explanation: '裸类型参数 T 在条件类型中会分发：联合类型 A | B 求值为 (A extends U ? X : Y) | (B extends U ? X : Y)。这就是 Exclude/Extract 的实现原理。避免分发用 [T] extends [U] 包裹。',
              },
              {
                question: '【对比】类型断言 as 和类型守卫（如 typeof）的本质区别是？',
                options: [
                  '两者都是运行时检查',
                  'as 是编译期断言不做运行时检查，类型守卫基于运行时值真实检查',
                  'as 比 类型守卫更安全',
                  '类型守卫会改变运行时行为',
                ],
                correctIndex: 1,
                explanation: 'as 是"你说什么编译器就信什么"，不做运行时验证，错用会把错误推迟到运行时。类型守卫基于运行时值真实检查，编译器据结果收窄类型，类型安全。优先用守卫，确需 as 时应紧跟运行时校验。',
              },
              {
                question: '【应用】以下哪段代码会触发 strictFunctionTypes 报错？',
                options: [
                  'const fn: (x: Animal) => void = (x: Dog) => {}（普通函数类型）',
                  'const fn: (x: Dog) => void = (x: Dog) => {}',
                  'const fn = (x: Dog) => {}',
                  'interface Fn { (x: Dog): void } const f: Fn = (x: Animal) => {}',
                ],
                correctIndex: 0,
                explanation: 'strictFunctionTypes 下普通函数类型参数逆变：参数更窄的函数 (x:Dog)=>void 不能赋给参数更宽的 (x:Animal)=>void，因为调用方可能传 Cat。选项4 用方法简写（method shorthand）是双变故不报错，这正是 strictFunctionTypes 只查普通函数类型的边界。',
              },
              {
                question: '【理解】type Foo = { [K in keyof T]: T[K] } 这种语法叫什么？',
                options: ['条件类型', '映射类型', '模板字面量类型', '交叉类型'],
                correctIndex: 1,
                explanation: '[K in keyof T]: NewType 是映射类型语法，遍历 T 的键生成新类型。Partial/Readonly/Pick 都基于映射类型。键重映射（as）和修饰符增删（-?/-readonly）是其扩展能力。',
              },
              {
                question: '【场景】一个 10 万行 JS 老项目要迁 TS，第一步最该做什么？',
                options: [
                  '直接开启 strict: true 全量修复',
                  'allowJs + checkJs 开启，strict: false 起步逐项开启子选项',
                  '删除所有 JS 重写',
                  '只迁入口文件',
                ],
                correctIndex: 1,
                explanation: '渐进式迁移：allowJs 让编译器识别 JS，strict: false 起步避免一次性几千报错阻塞。先开 noImplicitAny 再开 strictNullChecks，按叶子模块→业务入口顺序迁移，CI 卡新增允许存量。类型安全是过程不是开关。',
              },
              {
                question: '【综合】关于 TS 工具类型，以下说法正确的是？',
                options: [
                  'Pick<T,K> 排除指定键，Omit<T,K> 选取指定键',
                  'Omit = Pick + Exclude，二者互补',
                  'Record<K,V> 是映射类型的语法糖但不可遍历联合',
                  'ReturnType 用 keyof 实现',
                ],
                correctIndex: 1,
                explanation: 'Omit<T,K> 内置定义为 Pick<T, Exclude<keyof T, K>>，即"取反再 Pick"，与 Pick 互补。Pick 选取、Omit 排除。Record<K,V> = { [P in K]: V } 可遍历联合键（K 为联合时生成多键对象）。ReturnType 用 infer 实现非 keyof。',
              },
            ],
          },
        },
      ],
    },
  ],
}
