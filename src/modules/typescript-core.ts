/**
 * 模块 07：TypeScript 核心与进阶
 *
 * 完整实现 17 个知识点，涵盖 TypeScript 基础类型、类型收窄、接口与类型别名、
 * 泛型约束、工具类型、条件类型、tsconfig 配置、API 类型安全、迁移策略、
 * 面试题、速查表和小测验。使用 16 个可视化组件辅助理解。
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
  knowledgePointCount: 17,
  visualizationCount: 16,
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
      difficulty: 4,
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
    // 知识点 15：TypeScript 面试题（Accordion）
    // ========================================================================
    {
      order: 15,
      title: 'TypeScript 面试题精选',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'ts-p15-1',
          type: 'paragraph',
          text: '精选 TypeScript 高频面试题，涵盖类型系统、泛型、工具类型和工程实践。点击展开查看答案。',
        },
        {
          id: 'ts-p15-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: 'Q1: interface 和 type 的区别是什么？什么场景用哪个？',
                content: '主要区别：1) interface 支持声明合并（同名自动合并），type 不支持；2) type 可以定义联合类型和元组，interface 不能；3) interface 用 extends 扩展，type 用 & 交叉。实践：定义对象形状优先 interface（支持扩展），联合类型/元组/工具类型用 type。团队内部统一一种风格即可。',
              },
              {
                title: 'Q2: any 和 unknown 的区别？',
                content: 'any 会关闭所有类型检查，可以赋值给任何类型，也可以访问任意属性而不报错。unknown 是类型安全的 any 替代——可以赋值给 unknown，但 unknown 不能赋值给其他类型（除 unknown 和 any），也不能访问任何属性。使用 unknown 需要用类型守卫收窄后才能操作。',
              },
              {
                title: 'Q3: extends 关键字在不同上下文中的含义？',
                content: 'extends 有三个用途：1) 接口继承——interface A extends B；2) 泛型约束——T extends HasLength，限制 T 必须满足某个形状；3) 条件类型——T extends U ? X : Y，根据类型关系做分支判断。三者在语法上相同但编译行为完全不同。',
              },
              {
                title: 'Q4: keyof 和 typeof 在类型系统中的用法？',
                content: 'keyof T 获取类型 T 的所有键名组成的联合类型。typeof 在类型上下文中获取 JS 值的类型（不是运行时的 typeof）。结合使用：type Keys = keyof typeof obj 获取对象的键名联合类型。keyof 是映射类型和泛型约束的核心工具。',
              },
              {
                title: 'Q5: 什么是分布式条件类型？如何避免？',
                content: '裸类型参数 T 在条件类型 T extends U ? X : Y 中会分发：如果是联合类型 A | B，则求值为 (A extends U ? X : Y) | (B extends U ? X : Y)。避免分发的方法：用 [T] extends [U] 或 { t: T } extends { t: U } 包裹。',
              },
              {
                title: 'Q6: TypeScript 的 strict 模式包含哪些子选项？',
                content: 'strict: true 开启以下子项：strictNullChecks（严格空值检查）、noImplicitAny（禁止隐式 any）、strictFunctionTypes（严格函数类型检查）、strictBindCallApply、strictPropertyInitialization、noImplicitThis、alwaysStrict、useUnknownInCatchVariables。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 16：TypeScript 速查表
    // ========================================================================
    {
      order: 16,
      title: 'TypeScript 速查表',
      difficulty: 1,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ts-p16-1',
          type: 'paragraph',
          text: 'TypeScript 核心概念与常用语法速查。涵盖基础类型、泛型、工具类型和编译配置的关键语法。',
        },
        {
          id: 'ts-p16-2',
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
    // 知识点 17：TypeScript 小测验（QuizCard）
    // ========================================================================
    {
      order: 17,
      title: 'TypeScript 小测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'ts-p17-1',
          type: 'paragraph',
          text: '通过以下测验检验你对 TypeScript 核心概念的掌握程度。每题附有详细解析。',
        },
        {
          id: 'ts-p17-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '以下哪个类型是 any 的类型安全替代品？',
                options: ['never', 'void', 'unknown', 'undefined'],
                correctIndex: 2,
                explanation: 'unknown 是 any 的类型安全替代品。unknown 类型的值不能直接使用，必须先做类型收窄（typeof、instanceof、自定义守卫）才能操作。any 则完全关闭类型检查。',
              },
              {
                question: 'interface 相比 type 的独特优势是什么？',
                options: ['能定义联合类型', '能定义元组', '声明合并（同名自动合并）', '能使用泛型'],
                correctIndex: 2,
                explanation: '只有 interface 支持声明合并——同名的 interface 会自动合并属性。这在对第三方库或全局类型进行扩展时非常有用。type 定义联合类型和元组是 type 的独特优势。',
              },
              {
                question: 'strictNullChecks 开启后，以下代码会怎样？\nlet name: string = null',
                options: ['正常运行', '编译报错：null 不能赋值给 string', '运行时错误', '警告但不影响编译'],
                correctIndex: 1,
                explanation: 'strictNullChecks 开启后，null 和 undefined 不能赋值给其他类型（string、number 等）。需要显式使用联合类型：let name: string | null = null。这是 strict 模式的核心功能之一。',
              },
              {
                question: 'infer 关键字的正确使用位置是？',
                options: ['类型别名的右侧', '条件类型的 extends 子句中', '函数的参数位置', '变量的类型标注中'],
                correctIndex: 1,
                explanation: 'infer 只能在条件类型（T extends U ? X : Y）的 extends 子句中使用，用于声明待推断的类型变量。如 T extends Promise<infer R> ? R : never。',
              },
              {
                question: '以下关于泛型约束 extends 的说法，哪个是正确的？',
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
                question: 'satisfies 运算符（TS 4.9+）的作用是？',
                options: [
                  '强制类型转换',
                  '验证表达式是否符合某个类型，同时保留最精确的推断类型',
                  '创建新的类型别名',
                  '将类型变为只读',
                ],
                correctIndex: 1,
                explanation: 'satisfies 验证表达式是否符合类型约束，但不改变 TS 的类型推断结果。这意味着可以同时获得类型验证和精确的字面量类型推断。const palette = { red: [255,0,0] } satisfies Record<string, Color> 中 palette.red 类型仍是 [255,0,0] 而非 Color。',
              },
            ],
          },
        },
      ],
    },
  ],
}
