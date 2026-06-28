/**
 * Module 07: TypeScript Core & Advanced (English version)
 *
 * Full English translation of typescript-core.ts.
 * Loaded by moduleRegistry when locale === 'en'.
 *
 * 19 knowledge points:
 * - KP1 TypeScript overview & core capabilities
 * - KP2-4 Basic types, type narrowing & guards, interface vs type
 * - KP5-8 Generics & constraints, generic inference, conditional types,
 *        built-in utility types
 * - KP9-12 infer, satisfies / const type params, mapped types, tsconfig
 * - KP13-16 API type safety, JS→TS migration, two hands-on sandboxes
 *        (hand-written utility types library / type-safe API parser)
 * - KP17-19 Interview questions, cheat sheet, quiz
 */
import type { ModuleMeta } from '../lib/types'

export const typescriptCoreModule: ModuleMeta = {
  number: '07',
  title: 'TypeScript Core & Advanced',
  slug: 'typescript-core',
  stage: 'prerequisites',
  stageLabel: 'Foundation · Module 7',
  icon: '07',
  summary:
    'Type system, generics, utility types, conditional types, mapped types, type guards, tsconfig.',
  knowledgePointCount: 19,
  visualizationCount: 18,
  points: [
    // ========================================================================
    // KP 1: TypeScript Overview & Core Capabilities
    // ========================================================================
    {
      order: 1,
      title: 'TypeScript Overview & Core Capabilities',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'ts-p1-1',
          type: 'paragraph',
          lead: true,
          text: 'TypeScript is a superset of JavaScript that adds a static type system. It performs type checking at compile time and outputs plain JavaScript after compilation. The type system is TypeScript\'s core competitive advantage — not "extra type annotations" but "an extra compile-time safety net".',
        },
        {
          id: 'ts-p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'core', label: 'TypeScript', group: 'core', weight: 3 },
              { id: 'basics', label: 'Basic Types', group: 'related', weight: 2 },
              { id: 'narrowing', label: 'Type Narrowing', group: 'related', weight: 2 },
              { id: 'generics', label: 'Generics', group: 'related', weight: 2 },
              { id: 'utility', label: 'Utility Types', group: 'related', weight: 2 },
              { id: 'config', label: 'Compiler Config', group: 'related', weight: 2 },
              { id: 'patterns', label: 'Type Patterns', group: 'related', weight: 2 },
              { id: 'string', label: 'string/number/boolean', group: 'detail' },
              { id: 'union', label: 'Union Type |', group: 'detail' },
              { id: 'type-guard', label: 'typeof / instanceof', group: 'detail' },
              { id: 'extends', label: 'extends Constraint', group: 'detail' },
              { id: 'partial', label: 'Partial/Required', group: 'detail' },
              { id: 'cond', label: 'Conditional extends ?', group: 'detail' },
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
          text: 'Core Value of TypeScript',
        },
        {
          id: 'ts-p1-4',
          type: 'list',
          ordered: true,
          items: [
            'Compile-time type checking: catches type errors before code runs, reducing production bugs',
            'Intelligent code completion: IDEs provide precise autocomplete and refactoring based on type info',
            'Self-documenting: type annotations are live API docs that error when out of date',
            'Maintainability at scale: the type system makes refactoring safer and code review more efficient',
            'Incremental adoption: gradually migrate .js → .ts without disrupting existing business',
          ],
        },
        {
          id: 'ts-p1-5',
          type: 'callout',
          variant: 'tip',
          title: 'TypeScript = JavaScript + Types',
          text: 'TypeScript is a superset of JavaScript; all valid JS code is valid TS code (it may have type errors). Types exist only at compile time — there is no TS type information at runtime. This is "type erasure".',
        },
      ],
    },

    // ========================================================================
    // KP 2: TypeScript Basic Types
    // ========================================================================
    {
      order: 2,
      title: 'TypeScript Basic Types',
      difficulty: 1,
      visualizationType: 'type-matrix-table',
      blocks: [
        {
          id: 'ts-p2-1',
          type: 'paragraph',
          text: 'TypeScript\'s basic types cover native JavaScript types plus TS extensions. Understanding the differences between any, unknown, never, and void is the first step toward type safety.',
        },
        {
          id: 'ts-p2-2',
          type: 'demo',
          visualizationType: 'type-matrix-table',
          data: {
            title: 'Core Type Comparison Matrix',
            rows: [
              {
                type: 'string',
                description: 'String type',
                assignable: 'yes',
                nullable: 'no',
                typeofResult: 'string',
                recommendation: '✅ One of the most common types',
                example: 'let name: string = "Alice"',
              },
              {
                type: 'number',
                description: 'Numeric type (int + float)',
                assignable: 'yes',
                nullable: 'no',
                typeofResult: 'number',
                recommendation: '✅ JS does not distinguish int/float',
                example: 'let age: number = 30',
              },
              {
                type: 'boolean',
                description: 'Boolean type',
                assignable: 'yes',
                nullable: 'no',
                typeofResult: 'boolean',
                recommendation: '✅ Beware of falsy values',
                example: 'let done: boolean = false',
              },
              {
                type: 'any',
                description: 'Any type that disables type checking',
                assignable: 'yes',
                nullable: 'yes',
                typeofResult: '— (checking disabled)',
                recommendation: '🚫 Avoid; use unknown instead',
                example: 'let x: any = 42\nx.foo() // no error!',
              },
              {
                type: 'unknown',
                description: 'Safe replacement for any',
                assignable: 'yes',
                nullable: 'yes',
                typeofResult: '— (needs narrowing)',
                recommendation: '✅ Safe alternative to any',
                example: 'let x: unknown = 42\nif (typeof x === "number") x++',
              },
              {
                type: 'never',
                description: 'A value that never exists',
                assignable: 'yes',
                nullable: 'no',
                typeofResult: 'never',
                recommendation: '✅ Exhaustiveness checks',
                example: 'function err(): never { throw Error() }',
              },
              {
                type: 'void',
                description: 'No return value',
                assignable: 'no',
                nullable: 'no',
                typeofResult: 'undefined',
                recommendation: '✅ Function return annotation',
                example: 'function log(msg: string): void { ... }',
              },
              {
                type: 'null/undefined',
                description: 'Null / undefined',
                assignable: 'conditional',
                nullable: 'yes',
                typeofResult: 'object/undefined',
                recommendation: '⚠ Strict after strictNullChecks',
                example: 'let x: string | null = null',
              },
            ],
          },
        },
        {
          id: 'ts-p2-3',
          type: 'heading',
          level: 3,
          text: 'Arrays, Tuples, and Enums',
        },
        {
          id: 'ts-p2-4',
          type: 'code',
          language: 'typescript',
          filename: 'Array / Tuple / Enum',
          code: `// Arrays: two equivalent forms
const nums: number[] = [1, 2, 3]
const strs: Array<string> = ['a', 'b']

// Tuples: fixed length + fixed types
const pair: [string, number] = ['age', 30]
const rgb: [number, number, number] = [255, 100, 50]

// Named tuples (TS 4.0+): members can be named
const user: [name: string, age: number] = ['Alice', 30]

// Enums: a set of named constants
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
const dir: Direction = Direction.Up

// const enum: inlined at compile time, no runtime cost
const enum Status { Active, Inactive }`,
        },
        {
          id: 'ts-p2-5',
          type: 'demo',
          visualizationType: 'ts-type-checker',
          data: {
            defaultCode: `// ✅ Type-safe code
type User = { name: string; age: number }

function createUser(name: string, age: number): User {
  return { name, age }
}

const user = createUser("Alice", 30)
console.log(user.name.toUpperCase())`,
            snippets: [
              {
                label: 'any abuse',
                code: `// ❌ Type-unsafe code
function getUser(id: any): any {
  const resp: any = fetch('/api/user/' + id)
  return resp.data.user
}

const user = getUser(42)
user.name!.toUpperCase() // non-null assertion, dangerous!`,
                description: 'Demonstrates any abuse',
              },
              {
                label: 'Type guard',
                code: `// ✅ Type-safe code
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
                description: 'Demonstrates correct use of type guards',
              },
              {
                label: 'Union narrowing',
                code: `// ✅ Union type narrowing
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
                description: 'Demonstrates exhaustiveness check on union types',
              },
              {
                label: 'Generic constraint',
                code: `// ✅ Generic constraint example
interface HasLength { length: number }

function longest<T extends HasLength>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

const result = longest([1, 2, 3], [4, 5, 6, 7])
console.log(result.length)`,
                description: 'Demonstrates the extends generic constraint',
              },
            ],
          },
        },
        {
          id: 'ts-p2-6',
          type: 'callout',
          variant: 'warning',
          title: 'any vs unknown',
          text: 'any disables all type checking; unknown is the safe replacement — values of type unknown cannot be used directly and must be narrowed first. This preserves type safety while keeping flexibility.',
        },
      ],
    },

    // ========================================================================
    // KP 3: Type Narrowing & Type Guards
    // ========================================================================
    {
      order: 3,
      title: 'Type Narrowing & Type Guards',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'ts-p3-1',
          type: 'paragraph',
          text: 'Type Narrowing is the process by which TypeScript automatically narrows a type\'s range based on control-flow analysis. Type Guards are helper functions that help the compiler narrow types.',
        },
        {
          id: 'ts-p3-2',
          type: 'heading',
          level: 3,
          text: 'Six Common Narrowing Approaches',
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
                title: 'typeof guard',
                content: 'typeof is the most basic type guard, used to distinguish JS primitive types. TS recognizes the type narrowing after typeof. Note that typeof null === "object" is a classic JS bug.',
                code: `function padLeft(value: string | number) {
  if (typeof value === 'number') {
    return ' '.repeat(value)  // value: number
  }
  return value.padStart(10)    // value: string
}`,
                codeLanguage: 'typescript',
              },
              {
                title: 'instanceof guard',
                content: 'instanceof checks whether an object is an instance of a class. Suitable for custom Error classes, Date, Map, and other types with clear prototype chains.',
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
                title: 'Custom type predicate (is)',
                content: 'When a function\'s return type is "x is Type", it becomes a type predicate. After the call, TS automatically narrows the type based on the return value. This is the most powerful guard form.',
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
                title: 'in operator narrowing',
                content: 'The in operator checks whether an object has a property; TS can narrow union types based on it. Suitable for general union narrowing outside discriminated unions.',
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
                title: 'Discriminated Union',
                content: 'Add the same literal property (e.g. kind) to each member of a union; TS can precisely narrow via switch/if. This is the recommended pattern for handling union types.',
                code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'square': return shape.size ** 2
    // No default — TS checks that all branches are handled
  }
}`,
                codeLanguage: 'typescript',
              },
              {
                title: 'assertNever exhaustiveness check',
                content: 'assertNever leverages the never type to ensure all union branches are handled. If a new member is added but not handled, a compile-time error is raised.',
                code: `function assertNever(x: never): never {
  throw new Error('Unexpected: ' + x)
}

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'square': return shape.size ** 2
    default: return assertNever(shape) // adding a new shape type errors at compile time
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
          title: 'When to use which guard',
          text: 'Use typeof for primitives, instanceof for class instances, in for object properties, discriminated union + switch for complex unions, and extract reusable judgment logic into custom predicate functions.',
        },
      ],
    },

    // ========================================================================
    // KP 4: interface vs type Comparison
    // ========================================================================
    {
      order: 4,
      title: 'interface vs type: Comparison & Choice',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ts-p4-1',
          type: 'paragraph',
          text: 'Both interface and type can define object shapes, but they differ in declaration merging, extension mechanism, and applicable scenarios. Understanding their capability boundaries is the foundation of TS type modeling.',
        },
        {
          id: 'ts-p4-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Feature',
            columns: ['interface', 'type'],
            highlightColumn: 0,
            rows: [
              { feature: 'Define object shape', values: ['✅', '✅'] },
              { feature: 'Declaration merging (auto-merge same-name)', values: ['✅', '❌'] },
              { feature: 'Extension mechanism', values: ['extends', '& (intersection type)'] },
              { feature: 'Union type |', values: ['❌ Cannot define directly', '✅ type A = B | C'] },
              { feature: 'Tuple', values: ['❌', '✅ type T = [string, number]'] },
              { feature: 'Function type', values: ['✅', '✅ type Fn = (x: number) => string'] },
              { feature: 'Mapped type', values: ['❌', '✅ type Mapped<T> = { [K in keyof T]: ... }'] },
              { feature: 'extends constraint', values: ['✅', '✅'] },
              { feature: 'Applicable scenarios', values: ['Object/class shape, public API', 'Union types, utility types, complex type computation'] },
            ],
          },
        },
        {
          id: 'ts-p4-3',
          type: 'heading',
          level: 3,
          text: 'Practical Selection Strategy',
        },
        {
          id: 'ts-p4-4',
          type: 'list',
          items: [
            'Prefer interface by default: define "data shapes" like object Props, DTOs, API responses. Declaration merging is an advantage — library interfaces can be extended by consumers.',
            'Use type for union types: type Status = "active" | "inactive" is type\'s natural advantage.',
            'Use type for utility types: mapped types (the internal implementation of Partial, Readonly) must use type.',
            'Team convention: pick one style for object shapes and stick with it to avoid cognitive overhead.',
          ],
        },
        {
          id: 'ts-p4-5',
          type: 'callout',
          variant: 'tip',
          title: 'Official TS stance',
          text: 'The official TypeScript handbook recommends preferring interface when possible and using type only for union/mapped/conditional types. In practice, most teams prefer using type uniformly (for consistency); both styles are fine — the key is consistency within the team.',
        },
      ],
    },

    // ========================================================================
    // KP 5: Generics Basics & Constraints
    // ========================================================================
    {
      order: 5,
      title: 'Generics Basics & Constraints (extends)',
      difficulty: 3,
      visualizationType: 'generic-constraint-flow',
      blocks: [
        {
          id: 'ts-p5-1',
          type: 'paragraph',
          text: 'Generics are the core capability of TypeScript\'s type system — they let functions, interfaces, and classes handle multiple types without losing type information. The extends constraint restricts a generic parameter to satisfy a specific shape.',
        },
        {
          id: 'ts-p5-2',
          type: 'code',
          language: 'typescript',
          filename: 'Generics Basics',
          code: `// === Generic function ===
function identity<T>(arg: T): T {
  return arg  // input type = output type
}

const num = identity(42)         // T = number
const str = identity('hello')    // T = string
// Automatic inference → no manual annotation needed

// === Generic constraint extends ===
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length)  // ✅ T definitely has length
  return arg
}

logLength([1, 2, 3])          // ✅ arrays have length
logLength('hello')            // ✅ strings have length
// logLength(42)              // ❌ number has no length

// === Generic interface ===
interface Repository<T> {
  getById(id: string): T
  getAll(): T[]
  create(item: T): T
}

// === Generic constraint between type parameters ===
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]  // K is definitely a valid key of T
}

const user = { name: 'Alice', age: 30 }
getProperty(user, 'name')  // ✅ returns string
// getProperty(user, 'email')  // ❌ 'email' is not a key of user`,
        },
        {
          id: 'ts-p5-3',
          type: 'demo',
          visualizationType: 'generic-constraint-flow',
          data: {
            title: 'Generic Constraint & Inference Flow',
            steps: [
              {
                step: 1,
                title: 'Generic parameter declaration',
                code: '<T extends HasLength>',
                description: 'Declare that T must satisfy the HasLength interface (have a length: number property)',
                highlight: 'input',
              },
              {
                step: 2,
                title: 'Function parameter binding',
                code: 'function longest<T>(a: T, b: T): T',
                description: 'Parameters a/b are both T. On call, TS infers T from arguments automatically',
                highlight: 'input',
              },
              {
                step: 3,
                title: 'Constraint check',
                code: 'T extends { length: number } → passes ✓',
                description: 'Argument type is verified against the constraint. number[] has length → passes; number has no length → compile error.',
                highlight: 'check',
              },
              {
                step: 4,
                title: 'Inference complete',
                code: 'longest([1,2,3], [4,5,6,7]) → T = number[]',
                description: 'Common type number[] is inferred from both args and assigned to T. Return type is number[].',
                highlight: 'resolve',
              },
              {
                step: 5,
                title: 'Return type determined',
                code: 'return value: number[] = T',
                description: 'Return type follows the inferred T; the caller can safely use all number[] methods.',
                highlight: 'resolve',
              },
            ],
          },
        },
        {
          id: 'ts-p5-4',
          type: 'callout',
          variant: 'tip',
          title: 'Generics best practices',
          text: '1) Use meaningful generic names (TItem over T); 2) prefer automatic inference over explicit annotation; 3) keep extends constraints precise (do not over-constrain); 4) use default generic parameters to reduce usage burden: <T = string>.',
        },
      ],
    },

    // ========================================================================
    // KP 6: Generic Inference Deep Dive
    // ========================================================================
    {
      order: 6,
      title: 'Generic Inference Deep Dive',
      difficulty: 4,
      visualizationType: 'type-inference-timeline',
      blocks: [
        {
          id: 'ts-p6-1',
          type: 'paragraph',
          text: 'TypeScript\'s type inference happens not only at generic function call sites but throughout variable declarations, function return values, contextual types, and more. Understanding the inference mechanism helps you write more concise type-safe code.',
        },
        {
          id: 'ts-p6-2',
          type: 'demo',
          visualizationType: 'type-inference-timeline',
          data: {
            title: 'Generic Inference Timeline',
            scenario: 'identity function inference',
            steps: [
              {
                step: 1,
                title: 'Argument passed at call site',
                status: 'start',
                code: 'const result = identity("hello")',
                description: 'identity is called with "hello". TS engine starts the inference flow.',
              },
              {
                step: 2,
                title: 'Generic placeholder match',
                status: 'constrain',
                code: 'function identity<T>(arg: T): T {\n  return arg\n}',
                description: 'The signature declares generic T. arg: T binds the parameter type to T.',
              },
              {
                step: 3,
                title: 'Infer T from argument',
                status: 'constrain',
                code: 'arg: T = "hello"\n→ T extends "hello"\n→ T = "hello"',
                description: 'T is inferred as the literal type "hello" from the argument. This is the most precise inference result.',
              },
              {
                step: 4,
                title: 'Inference result determined',
                status: 'resolve',
                code: 'T = "hello"\nresult: "hello"',
                description: 'Inference done! T is determined as a literal type. result gets a precise type instead of a broad string.',
              },
              {
                step: 5,
                title: 'Type safety verification',
                status: 'done',
                code: 'result.toUpperCase()  // ✅\nresult.length       // ✅\nresult.push(1)      // ❌',
                description: 'Precise types let TS verify all operations. The push error surfaces at compile time.',
              },
            ],
          },
        },
        {
          id: 'ts-p6-3',
          type: 'code',
          language: 'typescript',
          filename: 'Generic Inference Scenarios',
          code: `// 1. Infer return type from arguments
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn)
}
const strs = map([1, 2, 3], n => n.toString())
// T = number, U = string → strs: string[]

// 2. Contextual type inference
const handler: (e: MouseEvent) => void = (e) => {
  e.clientX  // e is automatically inferred as MouseEvent
}

// 3. Inference from constructor
class Container<T> {
  constructor(public value: T) {}
}
const c = new Container(42)  // T = number

// 4. satisfies constrains without widening (TS 4.9+)
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>
// palette.red stays [255, 0, 0] instead of string | number[]`,
        },
      ],
    },

    // ========================================================================
    // KP 7: Conditional Types
    // ========================================================================
    {
      order: 7,
      title: 'Conditional Types',
      difficulty: 4,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'ts-p7-1',
          type: 'paragraph',
          text: 'Conditional types are the "if-else" of TypeScript\'s type system. They branch at compile time based on type relationships — the core mechanism for building advanced utility types.',
        },
        {
          id: 'ts-p7-2',
          type: 'code',
          language: 'typescript',
          filename: 'Conditional Type Syntax',
          code: `// Basic syntax
type IsString<T> = T extends string ? 'yes' : 'no'
type A = IsString<string>   // 'yes'
type B = IsString<number>   // 'no'

// Distributive conditional types (naked type parameters auto-distribute)
type ToArray<T> = T extends unknown ? T[] : never
type C = ToArray<string | number>
// Equivalent to: ToArray<string> | ToArray<number>
//             → string[] | number[]

// Block distribution: wrap with []
type ToArrayNoDistribute<T> = [T] extends [unknown] ? T[] : never

// Conditional types + infer
type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never

// Recursive conditional types (TS 4.1+)
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
              '// Tests',
              'type A = IsArray<number[]>     // "array"',
              'type B = IsArray<string>       // "not array"',
              'type C = IsArray<number[] | string[]>  // "array"',
              '',
              '// Distributive conditional type',
              'type Filter<T, U> = T extends U ? T : never',
              'type D = Filter<"a" | "b" | "c", "a" | "c">  // "a" | "c"',
            ],
            language: 'typescript',
            steps: [
              {
                title: 'Conditional type syntax',
                description: 'T extends U ? X : Y — if T is assignable to U, return X; otherwise return Y. Implements conditional branching at the type level.',
                highlightLines: [1, 2],
              },
              {
                title: 'Single-type evaluation',
                description: 'number[] extends unknown[] is true → "array". string extends unknown[] is false → "not array".',
                highlightLines: [5, 6],
              },
              {
                title: 'Union distribution',
                description: 'Naked type parameters auto-distribute over unions: IsArray<A | B> → IsArray<A> | IsArray<B>. This is the core feature of distributive conditional types.',
                highlightLines: [7],
              },
              {
                title: 'In practice: Filter utility type',
                description: 'Filter<"a"|"b"|"c", "a"|"c"> distributes into Filter<"a", "a"|"c"> | Filter<"b", "a"|"c"> | Filter<"c", "a"|"c"> → "a" | never | "c" → "a" | "c". Perfectly implements union filtering.',
                highlightLines: [10, 11],
              },
              {
                title: 'Block distribution',
                description: 'Wrapping with [T] extends [U] blocks distribution: [string | number] extends [string] is a single evaluation, not distributed. Used when you need a holistic check.',
                highlightLines: [1, 2],
              },
            ],
          },
        },
        {
          id: 'ts-p7-4',
          type: 'callout',
          variant: 'warning',
          title: 'Distributive conditional type caveats',
          text: 'Only naked type parameters (directly before extends) distribute. Types wrapped in [] / {} / function parameters do not. never is dropped during distribution (never is the empty union); wrap with [] to work around this.',
        },
      ],
    },

    // ========================================================================
    // KP 8: Built-in Utility Types
    // ========================================================================
    {
      order: 8,
      title: 'Built-in Utility Types',
      difficulty: 3,
      visualizationType: 'type-transform-board',
      blocks: [
        {
          id: 'ts-p8-1',
          type: 'paragraph',
          text: 'TypeScript provides 20+ built-in utility types based on generics and mapped types that implement common type transformations. Mastering them is key to improving TS coding efficiency.',
        },
        {
          id: 'ts-p8-2',
          type: 'demo',
          visualizationType: 'type-transform-board',
          data: {
            title: 'Utility Types Transformer',
            sourceModel: {
              name: 'User',
              properties: [
                { name: 'id', type: 'number', required: true, description: 'Unique identifier' },
                { name: 'name', type: 'string', required: true, description: 'Username' },
                { name: 'email', type: 'string', required: true, description: 'Email' },
                { name: 'age', type: 'number | undefined', required: false, description: 'Age' },
                { name: 'role', type: "'admin' | 'user'", required: false, description: 'Role' },
              ],
            },
            transforms: [
              {
                name: 'Partial<User>',
                applies: 'All properties become optional',
                fn: 'Partial',
                description: 'All properties become optional. Commonly used for update operations.',
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
                applies: 'All properties become required',
                fn: 'Required',
                description: 'Removes all optional markers.',
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
                applies: 'All properties become readonly',
                fn: 'Readonly',
                description: 'Prevents properties from being reassigned.',
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
                applies: 'Select a subset of properties',
                fn: 'Pick',
                description: 'Selects specified properties from a type to form a new type.',
                resultProperties: [
                  { name: 'name', type: 'string', required: true },
                  { name: 'email', type: 'string', required: true },
                ],
              },
              {
                name: 'Omit<User, "id">',
                applies: 'Exclude specified properties',
                fn: 'Omit',
                description: 'Forms a new type by excluding specified properties.',
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
          filename: 'Common Utility Types Cheat Sheet',
          code: `// Property modifiers
Partial<T>      // all optional
Required<T>     // all required
Readonly<T>     // all readonly

// Property selection
Pick<T, K>      // pick specified properties
Omit<T, K>      // exclude specified properties

// Union operations
Extract<T, U>   // extract assignable to U
Exclude<T, U>   // exclude assignable to U
NonNullable<T>  // exclude null | undefined

// Function types
Parameters<T>   // extract parameter types (tuple)
ReturnType<T>   // extract return type
Awaited<T>      // recursively unwrap Promise

// String operations (TS 4.1+)
Uppercase<T>
Lowercase<T>
Capitalize<T>
Uncapitalize<T>`,
        },
      ],
    },

    // ========================================================================
    // KP 9: infer & Advanced Type Inference
    // ========================================================================
    {
      order: 9,
      title: 'infer & Advanced Type Inference',
      difficulty: 5,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'ts-p9-1',
          type: 'paragraph',
          text: 'The infer keyword declares a type variable to be inferred inside the extends clause of a conditional type, letting TypeScript "extract" sub-types from a type structure. It is the foundation for building advanced utility types.',
        },
        {
          id: 'ts-p9-2',
          type: 'code',
          language: 'typescript',
          filename: 'infer Core Usage',
          code: `// infer extracts function return type
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never

// infer extracts array element type
type ElementType<T> = T extends (infer E)[] ? E : never
type El = ElementType<string[]>  // string

// infer extracts inner Promise type
type Unwrap<T> = T extends Promise<infer U> ? Unwrap<U> : T
type P = Unwrap<Promise<Promise<number>>>  // number

// infer extracts the first function parameter
type FirstArg<T> = T extends (first: infer F, ...rest: unknown[]) => unknown ? F : never

// infer extracts template strings
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
            title: 'infer Inference Chain',
            flowDirection: 'top-down',
            layers: [
              {
                name: 'Conditional type trigger',
                description: 'T extends Pattern ? X : Y — when T matches Pattern, enter the X branch',
                components: [
                  { name: 'T extends (...args: any[]) => infer R', description: 'Check whether T is a function type' },
                  { name: 'Match succeeds', description: 'Enter the ? R branch; R is the inferred return type' },
                  { name: 'Match fails', description: 'Enter the : never branch; returns never' },
                ],
              },
              {
                name: 'infer position declaration',
                description: 'infer appears in the right-hand type of extends, declaring a type variable to be inferred',
                components: [
                  { name: 'Function return position', description: 'infer R at return type position → extracts return type' },
                  { name: 'Array element position', description: '(infer E)[] → extracts element type' },
                  { name: 'Promise wrapper', description: 'Promise<infer U> → extracts inner type' },
                ],
              },
              {
                name: 'Inference and collection',
                description: 'The TS compiler substitutes the actual type structure at the infer position and collects it into the type variable',
                components: [
                  { name: 'Covariant position', description: 'Return type, object property values → union type' },
                  { name: 'Contravariant position', description: 'Function parameter types → intersection type' },
                ],
              },
              {
                name: 'Use of inferred result',
                description: 'The type variable obtained via infer can be used in the true branch of the conditional type',
                components: [
                  { name: 'Direct return', description: 'R → the extracted type' },
                  { name: 'Recursive application', description: 'Promise<infer U> ? Unwrap<U> : T → recursively unwrap' },
                ],
              },
            ],
          },
        },
        {
          id: 'ts-p9-4',
          type: 'callout',
          variant: 'tip',
          title: 'Covariance & contravariance of infer',
          text: 'When the same type variable is inferred multiple times in covariant positions (return values) → you get a union type. In contravariant positions (parameters) → you get an intersection type. This is the core rule of type inference.',
        },
      ],
    },

    // ========================================================================
    // KP 10: satisfies / const type parameters
    // ========================================================================
    {
      order: 10,
      title: 'satisfies / const Type Parameters',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ts-p10-1',
          type: 'paragraph',
          text: 'TypeScript 4.9 introduced the satisfies operator and 5.0 introduced const type parameters. Together they solve two classic pain points of type annotation: type narrowing and literal preservation.',
        },
        {
          id: 'ts-p10-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Feature',
            columns: ['satisfies (TS 4.9+)', 'const type param (TS 5.0+)'],
            highlightColumn: 0,
            rows: [
              { feature: 'Syntax', values: ['expression satisfies Type', 'function f<const T>(x: T)'] },
              { feature: 'Problem solved', values: ['Type check + preserve literal types', 'Generic inference preserves literal types'] },
              { feature: 'Use case', values: ['Object/array literals', 'Generic function parameters'] },
              { feature: 'Type check', values: ['✅ Compile-time verification against Type', '✅ Compile-time constraint verification'] },
              { feature: 'Literal preservation', values: ['✅ Preserves most precise type', '✅ T inferred as literal, not widened'] },
              { feature: 'Required TS version', values: ['≥ 4.9', '≥ 5.0'] },
            ],
          },
        },
        {
          id: 'ts-p10-3',
          type: 'code',
          language: 'typescript',
          filename: 'satisfies vs const',
          code: `// satisfies: verify type without widening
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>

// palette.red type is still [255, 0, 0] (Tuple)
// not string | number[]
palette.red[0]  // ✅ 255

// Without satisfies, for comparison
const palette2: Record<string, string | number[]> = {
  red: [255, 0, 0],
}
// palette2.red is string | number[]
// palette2.red[0]  // ❌ error!

// const type parameter (generic inference preserves literals)
function useState<const T>(initial: T): [T, (v: T) => void] {
  return [initial, () => {}]
}
const [count, setCount] = useState(0)
// count is inferred as 0 (literal), not number`,
        },
        {
          id: 'ts-p10-4',
          type: 'callout',
          variant: 'tip',
          title: 'as const vs satisfies vs const generic',
          text: 'as const turns a value into a readonly literal type. satisfies verifies a type without changing type inference. const generic parameter lets a function infer a literal type at the call site. The three are complementary: as const for values, satisfies for verification, const generic for functions.',
        },
      ],
    },

    // ========================================================================
    // KP 11: Mapped Types & Template Literal Types
    // ========================================================================
    {
      order: 11,
      title: 'Mapped Types & Template Literal Types',
      difficulty: 3,
      blocks: [
        {
          id: 'ts-p11-1',
          type: 'paragraph',
          lead: true,
          text: 'Mapped Types iterate over each member of a union type to generate a new type. Template Literal Types concatenate strings at the type level. Combined, they enable powerful type transformations.',
        },
        {
          id: 'ts-p11-2',
          type: 'code',
          language: 'typescript',
          filename: 'Mapped Types + Template Literal Types',
          code: `// === Mapped types ===
// Syntax: [K in keyof T]: NewType

type Getters<T> = {
  [K in keyof T]: () => T[K]
}

interface User { name: string; age: number }
type UserGetters = Getters<User>
// { name: () => string; age: () => number }

// Key remapping (TS 4.1+)
type Getters2<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}
// { getName: () => string; getAge: () => number }

// Template literal types
type EventName<T extends string> = \`on\${Capitalize<T>}\`
type ClickEvent = EventName<'click'>  // 'onClick'

// Union types auto-distribute
type Alignment = 'left' | 'center' | 'right'
type AlignClass = \`text-\${Alignment}\`
// 'text-left' | 'text-center' | 'text-right'

// Mapped types + conditional types
type NonNullableProperties<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

// Keep only properties of a specific type
type PickByType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K]
}
type StringProps = PickByType<User, string>  // { name: string }`,
        },
        {
          id: 'ts-p11-3',
          type: 'callout',
          variant: 'tip',
          title: 'Practical scenarios',
          text: 'Mapped types are used for bulk type transformations (the foundation of Partial/Readonly implementations). Template literals are used for precise event names, CSS class names, and route paths. Key remapping (as) is used to rename properties while preserving value types.',
        },
      ],
    },

    // ========================================================================
    // KP 12: tsconfig Strict Mode & Compiler Configuration
    // ========================================================================
    {
      order: 12,
      title: 'tsconfig Strict Mode & Compiler Configuration',
      difficulty: 2,
      visualizationType: 'ts-config-playground',
      blocks: [
        {
          id: 'ts-p12-1',
          type: 'paragraph',
          text: 'tsconfig.json is the compiler configuration file for TypeScript projects. The strict option and its sub-options determine the strictness of type checking and directly affect project code quality.',
        },
        {
          id: 'ts-p12-2',
          type: 'demo',
          visualizationType: 'ts-config-playground',
          data: {
            title: 'tsconfig Strict Mode Configuration Panel',
            flags: [
              {
                key: 'strict',
                label: 'strict',
                description: 'Master switch: when enabled, automatically enables all sub-options',
                impact: 'type-check',
                isStrict: true,
                examples: { on: { code: '// all strict checks', message: 'Recommended' }, off: { code: '// loose mode', message: 'Not recommended' } },
              },
              {
                key: 'noImplicitAny',
                label: 'noImplicitAny',
                description: 'Forbid implicit any types. Recommended.',
                impact: 'type-check',
                isStrict: true,
                examples: { on: { code: 'function f(x) {} // ❌ error', message: 'Must annotate type explicitly' }, off: { code: 'function f(x) {} // any', message: 'Loses type safety' } },
              },
              {
                key: 'strictNullChecks',
                label: 'strictNullChecks',
                description: 'null/undefined cannot be assigned to other types arbitrarily. Strongly recommended.',
                impact: 'type-check',
                isStrict: true,
                examples: { on: { code: 'let s: string = null // ❌', message: 'Must use string | null' }, off: { code: 'let s: string = null // ✅', message: 'Runtime risk' } },
              },
              {
                key: 'strictFunctionTypes',
                label: 'strictFunctionTypes',
                description: 'Contravariance check for function parameter types. Recommended.',
                impact: 'type-check',
                isStrict: true,
                examples: { on: { code: 'parameter types strictly covariant', message: 'Safer callbacks' }, off: { code: 'bivariant parameters', message: 'May not match expectations' } },
              },
              {
                key: 'noUnusedLocals',
                label: 'noUnusedLocals',
                description: 'Detect unused local variables. Recommended.',
                impact: 'compile',
                isStrict: false,
                examples: { on: { code: 'const x = 1 // ❌ unused', message: 'Keep code clean' }, off: { code: 'allow unused variables', message: 'Redundant code' } },
              },
              {
                key: 'noUncheckedIndexedAccess',
                label: 'noUncheckedIndexedAccess',
                description: 'Index access returns T | undefined. Recommended (not a strict sub-option).',
                impact: 'type-check',
                isStrict: false,
                examples: { on: { code: 'arr[0] → T | undefined', message: 'Safer array access' }, off: { code: 'arr[0] → T', message: 'Possible out-of-bounds access' } },
              },
            ],
            defaultEnabled: ['strict', 'noImplicitAny', 'strictNullChecks', 'strictFunctionTypes'],
          },
        },
        {
          id: 'ts-p12-3',
          type: 'code',
          language: 'json',
          filename: 'Recommended tsconfig.json',
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
          title: 'New project recommendation',
          text: 'For new projects, enable strict: true directly. For legacy migrations, start with strict: false and gradually enable sub-options. tsc --noEmit only does type checking without emitting files, suitable for CI integration.',
        },
      ],
    },

    // ========================================================================
    // KP 13: API Type Safety in Practice
    // ========================================================================
    {
      order: 13,
      title: 'API Type Safety in Practice',
      difficulty: 3,
      visualizationType: 'api-typing-workbench',
      blocks: [
        {
          id: 'ts-p13-1',
          type: 'paragraph',
          text: 'Applying TypeScript\'s type system to API calls drastically reduces runtime errors. From untyped fetch to a fully generic request<T> wrapper, build a type-safe API layer step by step.',
        },
        {
          id: 'ts-p13-2',
          type: 'demo',
          visualizationType: 'api-typing-workbench',
          data: {
            title: 'API Type Safety Workbench',
            defaultScenario: 1,
            scenarios: [
              {
                name: 'Untyped',
                level: 'basic',
                unsafe: `// ❌ Untyped: completely unpredictable
function fetchUser(id) {
  return fetch('/api/user/' + id)
    .then(r => r.json())
}
const user = await fetchUser(42)
user.nme  // no error!`,
                safe: `// ✅ Basic type annotation
async function fetchUser(id: number): Promise<{name: string}> {
  const res = await fetch('/api/user/' + id)
  return res.json()
}
const user = await fetchUser(42)
user.nme  // ❌ TS error!`,
                description: 'First step from untyped to basic type annotation',
              },
              {
                name: 'Generic request<T>',
                level: 'generic',
                unsafe: `// ❌ Manually write types each time
async function getUsers() {
  const res = await fetch('/api/users')
  return res.json()  // any
}`,
                safe: `// ✅ Generic request<T>
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
                description: 'Generic request<T> wrapper',
              },
              {
                name: 'Full type constraint',
                level: 'full',
                unsafe: `// ❌ POST method has no type constraint
async function create(data) {
  return fetch('/api/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(r => r.json())
}`,
                safe: `// ✅ Full request/response typing
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
                description: 'Full request/response type constraint',
              },
            ],
          },
        },
        {
          id: 'ts-p13-3',
          type: 'callout',
          variant: 'tip',
          title: 'Type-driven development',
          text: 'Define DTOs (Data Transfer Objects) and API return types first, then write the implementation. Types are documentation — callers can learn what parameters are needed and what data is returned just by reading types.',
        },
      ],
    },

    // ========================================================================
    // KP 14: JS → TS Migration Strategy
    // ========================================================================
    {
      order: 14,
      title: 'JS → TS Migration Strategy',
      difficulty: 2,
      visualizationType: 'migration-planner',
      blocks: [
        {
          id: 'ts-p14-1',
          type: 'paragraph',
          text: 'Migrating a JavaScript project to TypeScript is an incremental process — you don\'t have to rewrite all code at once. A reasonable migration strategy achieves type safety with zero disruption and low risk.',
        },
        {
          id: 'ts-p14-2',
          type: 'demo',
          visualizationType: 'migration-planner',
          data: {
            title: 'JS → TS Incremental Migration Roadmap',
            stages: [
              {
                stage: 1,
                name: 'Add TS compiler',
                description: 'Install TypeScript and use allowJs: true to allow JS files to coexist',
                actions: ['npm install -D typescript', 'Create tsconfig.json', 'Add tsc --noEmit to CI'],
                benefit: 'Integrate TS toolchain with zero code changes',
                risk: 'low',
                estimatedTime: '1 hour',
              },
              {
                stage: 2,
                name: 'Gradually rename JS → TS',
                description: 'Start with utility functions and core modules',
                actions: ['Rename .js → .ts (start with utility functions)', 'Add basic type annotations', 'Use noImplicitAny: false during transition'],
                benefit: 'Core modules gain type safety and IDE intellisense',
                risk: 'low',
                estimatedTime: '1-2 weeks',
              },
              {
                stage: 3,
                name: 'Type declaration files',
                description: 'Create type declarations for third-party libraries and global variables',
                actions: ['Install @types/* packages', 'Write .d.ts for untyped libraries', 'Define global types and interfaces'],
                benefit: 'Full autocomplete and compile-time error reporting',
                risk: 'medium',
                estimatedTime: '1 week',
              },
              {
                stage: 4,
                name: 'Enable strict mode',
                description: 'Gradually enable strict sub-options and fix all type errors',
                actions: ['Enable strictNullChecks', 'Enable noImplicitAny', 'Fix type errors'],
                benefit: 'Highest level of type safety',
                risk: 'medium',
                estimatedTime: '2-4 weeks',
              },
              {
                stage: 5,
                name: 'Type optimization & refactoring',
                description: 'Leverage full type information to optimize architecture',
                actions: ['Replace any with concrete types', 'Introduce generics to reduce duplication', 'Use discriminated unions'],
                benefit: 'Significant improvement in code quality and maintainability',
                risk: 'low',
                estimatedTime: 'Ongoing',
              },
            ],
          },
        },
        {
          id: 'ts-p14-3',
          type: 'callout',
          variant: 'warning',
          title: 'Key migration principles',
          text: '1) Incremental — migrate one module at a time; 2) start from leaf nodes — migrate the least-depended-upon parts first; 3) run tsc --noEmit in CI to prevent regression; 4) allow any as a temporary solution but record it in the tech debt list.',
        },
      ],
    },

    // ========================================================================
    // KP 15: Hands-on — Hand-written Utility Types Library
    // ========================================================================
    {
      order: 15,
      title: 'Hands-on: Hand-written Utility Types Library',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'ts-p15-1',
          type: 'paragraph',
          lead: true,
          text: 'Utility types are the "Lego bricks" of TypeScript\'s type system. This practice ties together mapped types, conditional types, infer inference, and key remapping to implement four core utility types — Partial/Pick/Omit/ReturnType — from scratch, helping you understand the underlying principles of TS built-in utilities.',
        },
        {
          id: 'ts-p15-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this practice matters',
          text: '"Hand-write utility types" is a common interview question, and custom utility types (e.g. DeepPartial, GetOptional) in engineering can drastically reduce duplicated type code. Mastering the three pillars — mapped type [K in keyof T], conditional type extends ?, and infer — means mastering the core syntax of TS type programming.',
        },
        {
          id: 'ts-p15-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'typescript',
            hint: 'Implement four utility types in the skeleton below: use mapped types for MyPartial/MyPick, key remapping + conditional types for MyOmit, and infer for MyReturnType.',
            initialCode: `// Hands-on: Hand-written utility types library
// Goal: implement 4 core utility types to understand the three pillars of TS type programming

// === 1. MyPartial<T>: make all properties optional (mapped type + ?)
// TODO: type MyPartial<T> = { ... }
//   - Use [K in keyof T] to iterate keys
//   - Add ? modifier to each key, value type T[K]

// === 2. MyPick<T, K extends keyof T>: select specified keys
// TODO: type MyPick<T, K extends keyof T> = { ... }
//   - Use [P in K] to iterate selected keys
//   - Value type T[P]

// === 3. MyOmit<T, K>: exclude specified keys (key remapping + conditional type)
// TODO: type MyOmit<T, K extends keyof T> = { ... }
//   - Use [P in keyof T as P extends K ? never : P]: T[P]
//   - as remapping: when P belongs to K, remap to never (filtered out)

// === 4. MyReturnType<T>: get function return type (infer)
// TODO: type MyReturnType<T extends (...args: any[]) => any> = ...
//   - Constrain T to a function type
//   - Use T extends (...args: any[]) => infer R ? R : never to capture the return value

// === Verify (uncomment to self-test) ===
interface User { id: number; name: string; age: number }
// type PartialUser = MyPartial<User>          // { id?: number; name?: string; age?: number }
// type PickUser = MyPick<User, 'id' | 'name'> // { id: number; name: string }
// type OmitUser = MyOmit<User, 'age'>         // { id: number; name: number }
// type R = MyReturnType<() => string>         // string`,
            checks: [
              {
                description: 'MyPartial uses mapped type [K in keyof T] with ? modifier',
                pattern: 'MyPartial[\\s\\S]*?\\{\\s*\\[K in keyof T\\]\\?:\\s*T\\[K\\]',
                hint: 'MyPartial should be type MyPartial<T> = { [K in keyof T]?: T[K] }. The key is [K in keyof T] to iterate keys + ? to make properties optional.',
              },
              {
                description: 'MyPick constrains K extends keyof T and iterates with [P in K]',
                pattern: 'MyPick<T,\\s*K extends keyof T>[\\s\\S]*?\\{\\s*\\[P in K\\]:\\s*T\\[P\\]',
                hint: 'MyPick<T, K extends keyof T> = { [P in K]: T[P] }. K must be constrained to a subset of keyof T; [P in K] iterates the selected keys.',
              },
              {
                description: 'MyOmit uses key remapping as + conditional type to filter keys',
                pattern: 'MyOmit[\\s\\S]*?\\[P in keyof T as P extends K\\s*\\?\\s*never\\s*:\\s*P\\]',
                hint: 'MyOmit should be { [P in keyof T as P extends K ? never : P]: T[P] }. as remaps keys belonging to K to never; mapped types automatically filter never keys.',
              },
              {
                description: 'MyReturnType uses infer R to capture the function return type',
                pattern: 'MyReturnType[\\s\\S]*?extends\\s*\\([\\s\\S]*?\\)\\s*=>\\s*infer R\\s*\\?\\s*R\\s*:\\s*never',
                hint: 'MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never. infer R can only appear inside the extends clause of a conditional type.',
              },
              {
                description: 'MyReturnType\'s type parameter constrains T to a function type',
                pattern: 'MyReturnType<T extends \\(\\.\\.\\.[\\s\\S]*?\\)\\s*=>\\s*any>',
                hint: 'MyReturnType\'s generic parameter must be constrained to a function: T extends (...args: any[]) => any. Otherwise conditional matching cannot be applied to non-function types.',
              },
              {
                description: 'MyOmit\'s K is constrained to keyof T',
                pattern: 'MyOmit<T,\\s*K extends keyof T>',
                hint: 'MyOmit\'s K should be constrained as K extends keyof T to ensure only existing keys can be excluded (stricter than built-in Omit, which does not constrain K).',
              },
            ],
          },
        },
        {
          id: 'ts-p15-4',
          type: 'callout',
          variant: 'warning',
          title: 'Practice reflection',
          text: 'Built-in Omit does not constrain K to keyof T, so passing a non-existent key does not error (a design tradeoff). Hand-written MyOmit with K extends keyof T is stricter but inconsistent with built-in behavior. In engineering: library authors prefer compatibility with built-in behavior, while application code may add the constraint. Key remapping (as) is a TS 4.1+ feature; older projects should verify their version.',
        },
      ],
    },

    // ========================================================================
    // KP 16: Hands-on — Type-safe API Response Parser
    // ========================================================================
    {
      order: 16,
      title: 'Hands-on: Type-safe API Response Parser',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'ts-p16-1',
          type: 'paragraph',
          lead: true,
          text: 'Real-world API data cannot be trusted — fields may be missing or types may be wrong. This practice ties together generics, unknown, custom type guards, and error handling to build a type-safe API response parser that ensures type safety at both compile time and runtime.',
        },
        {
          id: 'ts-p16-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this practice matters',
          text: 'fetch/axios return any; asserting directly as User is a "trust the network" approach that crashes at runtime when the API changes. The correct approach is to declare unknown + validate layer by layer with type guards. This is a comprehensive application of any/unknown/type guards and the most common type-safety scenario in engineering.',
        },
        {
          id: 'ts-p16-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'typescript',
            hint: 'Implement in the skeleton below: generic fetchJson, unknown narrowing, custom type guard isUser, and error handling. The checklist on the right validates each item.',
            initialCode: `// Hands-on: Type-safe API response parser
// Goal: build a safe API parsing layer using generics + unknown + type guards

interface User {
  id: number
  name: string
  email: string
}

// === 1. Custom type guard: check whether an unknown value is a User
// TODO: function isUser(data: unknown): data is User { ... }
//   - First typeof data === 'object' && data !== null
//   - Then use 'id' in data / 'name' in data / 'email' in data to check key existence
//   - Use typeof to validate each field type (id is number, name/email are string)

// === 2. Generic fetchJson: request and return unknown (not any)
// TODO: async function fetchJson<T>(url: string): Promise<T> { ... }
//   - const res = await fetch(url)
//   - if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
//   - return await res.json() as T  // Note: json() returns any; asserting as T is the caller's responsibility to guard

// === 3. Safely get a User: fetch + guard + error handling
// TODO: async function getUser(id: number): Promise<User> { ... }
//   - const data = await fetchJson<unknown>(\`/api/users/\${id}\`)  // treat as unknown first
//   - if (!isUser(data)) throw new Error('Invalid user shape')
//   - return data  // data is now narrowed to User

// === 4. Batch fetch: Promise.all + guard filter
// TODO: async function getValidUsers(ids: number[]): Promise<User[]> { ... }
//   - const results = await Promise.all(ids.map(id => getUser(id).catch(() => null)))
//   - return results.filter((u): u is User => u !== null)`,
            checks: [
              {
                description: 'isUser is a custom type guard returning data is User',
                pattern: 'function isUser\\s*\\(\\s*data:\\s*unknown\\s*\\)\\s*:\\s*data is User',
                hint: 'The signature must be function isUser(data: unknown): data is User. "data is User" is a predicate return type that lets TS narrow data to User inside the if branch.',
              },
              {
                description: 'isUser uses typeof + in to check object structure and field types',
                pattern: "isUser[\\s\\S]*?typeof\\s+data\\s*===\\s*['\"]object['\"][\\s\\S]*?['\"]id['\"]\\s+in\\s+data",
                hint: 'First typeof data === "object" && data !== null (exclude null), then use "id" in data / "name" in data / "email" in data to check key existence, and finally typeof to validate field types (id is number, etc.).',
              },
              {
                description: 'fetchJson is a generic function <T> that returns Promise<T>',
                pattern: 'function fetchJson<T>\\s*\\(\\s*url:\\s*string\\s*\\)\\s*:\\s*Promise<T>',
                hint: 'fetchJson<T>(url: string): Promise<T>. Generic T lets the caller decide the expected type. Note res.json() returns any; using as T is an assertion, but real safety is provided by the caller\'s guard.',
              },
              {
                description: 'fetchJson checks res.ok and throws on error',
                pattern: '!res\\.ok[\\s\\S]*?throw',
                hint: 'HTTP errors must be handled explicitly: if (!res.ok) throw new Error(`HTTP ${res.status}`). fetch only rejects on network errors, not on 4xx/5xx.',
              },
              {
                description: 'getUser fetches as unknown first, then narrows with isUser guard',
                pattern: 'getUser[\\s\\S]*?fetchJson<unknown>[\\s\\S]*?isUser\\s*\\(',
                hint: 'getUser should const data = await fetchJson<unknown>(...) to treat as unknown first, then if (!isUser(data)) throw; after the guard passes, data is automatically narrowed to User. Do not directly fetchJson<User> to skip the guard.',
              },
              {
                description: 'getValidUsers uses type predicate filter (u): u is User to filter null',
                pattern: "filter\\s*\\(\\s*\\(u\\)\\s*:\\s*u is User\\s*=>\\s*u !== null\\s*\\)",
                hint: 'For batch scenarios, use Promise.all + catch to fall back to null, then filter((u): u is User => u !== null). The type predicate u is User tells TS that the filtered array is User[] rather than (User|null)[].',
              },
            ],
          },
        },
        {
          id: 'ts-p16-4',
          type: 'callout',
          variant: 'warning',
          title: 'Practice reflection',
          text: 'Hand-written guards are verbose and error-prone for large objects; in engineering, schema validation libraries like zod / io-ts / valibot are common — they perform runtime validation and automatically derive TS types from a single schema, benefiting both sides. This practice uses hand-written guards to understand the principles; in production, prefer schema libraries. Also, the as T in fetchJson is a "trust boundary" marker; real safety is at the guard layer.',
        },
      ],
    },

    // ========================================================================
    // Knowledge Point 17: TypeScript Interview Questions (Accordion)
    // ========================================================================
    {
      order: 17,
      title: 'TypeScript Interview Questions',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'ts-p17-1',
          type: 'paragraph',
          text: 'Curated high-frequency TypeScript interview questions, covering the type system, generics, utility types, and engineering practices. Click to expand and view the answer.',
        },
        {
          id: 'ts-p17-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: What is the difference between interface and type? When do you use which?',
                content: 'Main differences:\n1. interface supports declaration merging (same-name auto-merge); type does not.\n2. type can define union types and tuples; interface cannot.\n3. interface extends via extends; type composes via intersection &.\n\nPractices:\n- Prefer interface for object shapes (supports extension).\n- Use type for union types / tuples / utility types.\n- Teams should pick one style and stay consistent.',
              },
              {
                title: 'Q2: Difference between any and unknown?',
                content: 'Both accept any value, but differ in type safety.\n\nany:\n- Disables all type checks.\n- Assignable to any type; can access any property without errors.\n\nunknown:\n- The type-safe replacement for any.\n- Can be assigned to unknown, but unknown cannot be assigned to other types (except unknown and any).\n- Cannot access any property.\n\nTo use unknown you must first narrow it with type guards (typeof/instanceof/in/custom is functions).',
              },
              {
                title: 'Q3: What does the extends keyword mean in different contexts?',
                content: 'extends has three uses — same syntax, different compile-time behavior:\n\n1. Interface inheritance: interface A extends B.\n2. Generic constraint: T extends HasLength, restricting T to satisfy a shape.\n3. Conditional type: T extends U ? X : Y, branching on a type relation.',
              },
              {
                title: 'Q4: How are keyof and typeof used in the type system?',
                content: 'They serve different type-query scenarios:\n\nkeyof T:\n- Returns a union of all key names of type T.\n- A core tool for mapped types and generic constraints.\n\ntypeof (in type context):\n- Gets the type of a JS value (not the runtime typeof).\n\nCombined:\ntype Keys = keyof typeof obj gets the union of an object\'s key names.',
              },
              {
                title: 'Q5: What are distributive conditional types? How do you avoid them?',
                content: 'A naked type parameter T distributes inside the conditional type T extends U ? X : Y:\n\n- If T is a union A | B, the result is (A extends U ? X : Y) | (B extends U ? X : Y).\n\nHow to prevent distribution:\n- Wrap with [T] extends [U].\n- Or wrap with { t: T } extends { t: U }.',
              },
              {
                title: 'Q6: Which sub-options does TypeScript\'s strict mode include?',
                content: 'strict: true enables the following sub-options:\n\n- strictNullChecks: strict null checks\n- noImplicitAny: forbid implicit any\n- strictFunctionTypes: strict function type checks\n- strictBindCallApply\n- strictPropertyInitialization\n- noImplicitThis\n- alwaysStrict\n- useUnknownInCatchVariables',
              },
              {
                title: 'Q7: What is the never type for? When do you get never?',
                content: 'never means "a value that never occurs".\n\nTwo ways to obtain never:\n1. A function that never returns (throws, infinite loop).\n2. A union narrowed to exhaustion, the remaining branch.\n\nUses:\n1. Exhaustive check — in switch\'s default branch, assign to a never-typed variable; if a union member is unhandled, the compiler errors.\n2. Filter union types, e.g. Exclude<T, never>.\n3. Represent impossible states.\n\nProperty: never is a subtype of every type; assignable to any type.',
              },
              {
                title: 'Q8: What are covariance and contravariance? Are TS function parameters covariant or contravariant?',
                content: 'Covariance:\n- Subtype relationship matches the parameterized direction.\n- e.g. Dog[] is a subtype of Animal[].\n\nContravariance:\n- Direction reversed.\n- e.g. (x: Animal) => void is a subtype of (x: Dog) => void (a function with a wider parameter can substitute a function with a narrower one).\n\nIn TS:\n- Method parameters (method shorthand) default to bivariance (loose).\n- Ordinary function parameters are contravariant under strictFunctionTypes.\n\nThis is why strictFunctionTypes can catch callback parameter type errors.',
              },
              {
                title: 'Q9: How do you write function overloads? Why can\'t the implementation signature be called from outside?',
                content: 'Overload syntax:\n1. Write multiple overload signatures first (type only, no body).\n2. End with an implementation signature (has body; parameters use loose types like any).\n\nExternal calls can only match overload signatures; the implementation signature is invisible from outside.\n\nReason:\n- The implementation signature exists to provide a runtime implementation for the compiler.\n- Its parameter types are usually wider than any single overload (union), and exposing it directly would lose overload precision.\n\nNote: overload ordering — more specific types first, otherwise wider types match first.',
              },
              {
                title: 'Q10: What is as const for? How is it different from ordinary const?',
                content: 'They are completely different:\n\nconst:\n- Runtime: the variable cannot be reassigned.\n- But the type is still widened (const x = "hi" infers string).\n\nas const:\n- A type assertion: asserts the value to the narrowest literal type and makes everything readonly.\n- const x = "hi" as const infers "hi".\n- const arr = [1, 2] as const infers readonly [1, 2].\n\nUses:\n- Define constant unions\n- Precise object types\n- Combine with satisfies to preserve literals\n\nNote: as const is a compile-time behavior; it produces no runtime freezing.',
              },
              {
                title: 'Q11: What are the pitfalls of enum? Why is it not recommended?',
                content: 'enum pitfalls:\n1. Numeric enums generate reverse-mapping code (enum["A"]=0 and enum[0]="A"), increasing bundle size.\n2. Numeric enums are unsafe — any number is assignable to a numeric enum.\n3. const enum is not usable under isolatedModules, and different compilers (esbuild/swc) handle const enum inconsistently, possibly causing runtime errors.\n4. String enums are safe but verbose.\n\nRecommended alternatives:\n- Union literal types + as const, e.g. type Status = "active" | "inactive".',
              },
              {
                title: 'Q12: What is the essential difference between type assertion as and type guard (narrowing)?',
                content: 'Type assertion as:\n- "You tell the compiler what to believe."\n- No runtime check; the compiler does not verify whether the assertion holds.\n- Misuse defers errors to runtime.\n\nType guards (typeof/instanceof/in/custom is functions):\n- Real checks based on runtime values.\n- The compiler narrows types based on the check result — type safe.\n\nPrinciples:\n- Prefer type guards.\n- Use as only when you are sure it is safe and cannot be expressed with a guard (e.g. after parsing JSON with known structure), and ideally follow up with a runtime check.\n- unknown + guard is the safe pattern replacing any + as.',
              },
              {
                title: 'Q13 [Comparison]: What are the similarities and differences between Partial<T> and Readonly<T> in implementation?',
                content: 'Both are mapped types that iterate over keyof T:\n- Partial: makes each property optional (adds ?).\n- Readonly: makes each property readonly (adds readonly).\n\nImplementation:\n- type Partial<T> = { [K in keyof T]?: T[K] }\n- type Readonly<T> = { readonly [K in keyof T]: T[K] }\n\nSimilarities: both are based on the mapped type [K in keyof T] and do not change the property type itself.\n\nDifferences:\n- Different modifiers (? vs readonly).\n- Can be stacked: Readonly<Partial<T>>.\n\nTS 4.1+ also supports modifier addition/removal:\n- -readonly removes readonly\n- -? removes optional (Required\'s implementation)',
              },
              {
                title: 'Q14 [Comparison]: What is the relationship between Omit<T,K> and Pick<T,K>? Is Omit built-in or hand-written?',
                content: 'They are complementary:\n- Pick<T, K extends keyof T>: selects specified keys { [P in K]: T[P] }.\n- Omit<T, K>: excludes specified keys.\n\nOmit is built into TS:\n- Defined as Omit = Pick<T, Exclude<keyof T, K>>, i.e. "invert then Pick".\n- It is a combination of Pick + Exclude.\n\nNotes on hand-written Omit:\n- Using key remapping directly: { [P in keyof T as P extends K ? never : P]: T[P] } is more precise.\n- The built-in Omit does not constrain K to keyof T, so it may accept non-existent keys without error (a known design trade-off).\n\nPractices:\n- Omit suits "exclude a few fields".\n- Pick suits "select only a few fields".',
              },
              {
                title: 'Q15 [Scenario]: A JS project is being migrated to TS. How do you formulate a strategy that avoids impacting production?',
                content: 'Incremental migration strategy:\n1. Enable allowJs + checkJs so the TS compiler recognizes JS files first.\n2. Start with strict: false and enable sub-options one by one (noImplicitAny first, then strictNullChecks), to avoid thousands of errors blocking work at once.\n3. Migrate in dependency order: leaf modules (utility functions, type definitions) first, entry/business files last.\n4. Write .d.ts declarations or install @types for third-party libraries without types.\n5. Use // @ts-ignore / unknown to temporarily suppress high-risk errors, with TODO tracking.\n6. CI blocks new errors (tsc --noEmit) but allows existing ones.\n7. Add type tests for critical paths.\n\nPrinciple: type safety is a process, not a switch; protect the core data flow first.',
              },
              {
                title: 'Q16 [Scenario]: A team\'s TS project compiles slowly. How do you investigate and optimize?',
                content: 'Investigate and optimize in two phases.\n\nInvestigation:\n1. Run tsc --extendedDiagnostics to see check time / file count / type count, to find whether type expansion is slow or there are too many files.\n2. Check whether excessive any/assertions cause type inference to degrade.\n3. Check whether complex conditional/mapped types distribute on giant unions.\n4. Whether third-party .d.ts files are too large (e.g. full DOM lib).\n\nOptimization:\n1. Split with project references and incrementally compile sub-projects.\n2. isolatedModules + use esbuild/swc to transpile (only type stripping, no type checking); let tsc only do --noEmit type checks.\n3. Enable incremental + tsBuildInfoFile caching.\n4. Narrow union sizes; use branded types / enums to replace giant literal unions.\n5. Avoid any flowing back and polluting inference.\n\nTrade-off: the more precise the types, the slower the checks. Grade strictness by core/non-core.',
              },
              {
                title: 'Q17: What is the role of declaration files (.d.ts)? How do you write them for third-party libraries?',
                content: 'A .d.ts is a declaration file containing only types, no implementation; completely erased at runtime.\n\nCore roles:\n1. Provide types for pure JS libraries — installing @types/lodash adds type completion.\n2. Global type extension — declare global adds custom properties to window.\n3. Module declaration — declare module "*.css" lets imports recognize non-JS assets.\n\nWriting tips:\n- Triple-slash directive: /// <reference types="node" /> pulls in dependency types.\n- export the types of public APIs; do not expose internal implementations.\n- Pair with the "types" field in package.json pointing to the entry .d.ts.\n\nPitfall: declaration files can only contain types, not values; const x = 1 will error, you must use declare const x: number.',
              },
              {
                title: 'Q18: What is the difference between import type and a normal import? When to use it?',
                content: 'import type imports only types and produces no runtime code.\n\nDifferences:\n1. import type { User } from "./types" — completely erased after compilation, absent from output.\n2. Normal import { User } — if User is only a type it is still erased, but if it is a value (class/enum/const) it is preserved.\n3. import type is required under isolatedModules — some transpilers (esbuild/swc) compile file-by-file and cannot tell whether a symbol is a type or a value.\n\nWhen to use:\n- Prefer import type for type-only annotations; the intent is clearer.\n- Pair with verbatimModuleSyntax: true to force separating type imports from value imports.\n\nNote: a default-exported type can only be imported wholesale via import type; you cannot split it as import { type X } (unless using TS 4.5+ inline type modifier).',
              },
              {
                title: 'Q19: What is the difference between ES modules and namespace? Why prefer ES modules?',
                content: 'Both organize code, but the mechanisms are completely different.\n\nES modules:\n1. A file is a module; import/export explicitly declares dependencies.\n2. Compiles to standard formats (CommonJS/ESM), consistent with the runtime module system.\n3. Supports static analysis — tree-shaking, on-demand imports.\n\nnamespace:\n1. Defined via namespace Foo {} in global/file scope; accessed as Foo.x.\n2. Essentially compile-time object merging; at runtime it is a real object.\n3. Tends to pollute globals; dependencies are implicit.\n\nReasons to prefer ES modules:\n- Modern TS projects default to module: ESNext; namespace is a legacy approach.\n- namespace behaves inconsistently under isolatedModules and has poor cross-compiler compatibility.\n- Only the .d.ts global-type-extension scenario suits declare global / namespace.',
              },
              {
                title: 'Q20: What is the difference between index signature [key: string]: T and Record<string, T>?',
                content: 'Both express "an object whose keys are string and values are T", but differ in usage and constraints.\n\nIndex signature:\n- Syntax: interface Foo { [key: string]: T; name: string }.\n- Allows any string key; named properties must be compatible with the index value type.\n- Suits scenarios with non-fixed object shapes (e.g. cache tables).\n\nRecord<K, V>:\n- Syntax: type Foo = Record<string, T>; essentially the mapped type { [P in K]: V }.\n- Stricter — Record<"a"|"b", T> only allows specified keys.\n- Cannot mix in named properties; clearer for pure dictionary scenarios.\n\nChoose: Record<union, T> for fixed keys; index signature for open keys. Combine with keyof to get a key union.',
              },
              {
                title: 'Q21: What are tuple types and named tuples? When to use them?',
                content: 'A tuple is "a fixed-length array where each position has a fixed type".\n\nBasic tuple:\n- const pair: [string, number] = ["age", 30]; types constrained by position.\n- Access pair[0] infers string; pair[1] infers number.\n\nNamed tuple (TS 4.0+):\n- const user: [name: string, age: number] = ["Alice", 30].\n- Readability only; type behavior is identical to basic tuple.\n\nVariadic tuple (TS 4.0+):\n- type Tail<T extends any[]> = T extends [head: any, ...tail: infer R] ? R : never.\n- Use ...spread inside tuples to support concat type inference.\n\nUse cases: functions returning multiple values (e.g. useState returns [value, setter]), CSV row parsing, coordinate points. Avoid tuples at API boundaries — their meaning depends on position memory; objects are more readable.',
              },
              {
                title: 'Q22: What is the difference between the readonly modifier and ReadonlyArray<T>?',
                content: 'Both express "immutable", but operate at different levels.\n\nreadonly modifier (property level):\n- interface Foo { readonly id: number; name: string }.\n- Locks only a single property; name is still mutable.\n- Only prevents assignment, not deep mutation — obj.nested.x = 1 still works.\n\nReadonlyArray<T> / readonly T[] (array level):\n- const arr: readonly number[] = [1, 2, 3].\n- Forbids push/pop/splice and other mutation methods, but elements are still mutable (if they are objects).\n- Equivalent to ReadonlyArray<number>.\n\nDeep readonly: use Readonly<T> recursively or a custom DeepReadonly<T>. The const assertion (as const) is the simplest deep-readonly approach — turns the whole structure readonly + literal types.',
              },
              {
                title: 'Q23: What is the essential difference between optional chaining ?. and the non-null assertion !?',
                content: 'Optional chaining ?. is runtime-safe access; non-null assertion ! is a compile-time assumption.\n\nOptional chaining ?.:\n- obj?.foo checks at runtime whether obj is null/undefined; if so, short-circuits and returns undefined.\n- Type-wise obj?.foo infers T | undefined.\n- Type safe — no runtime crash.\n\nNon-null assertion !:\n- obj!.foo tells the compiler "I know obj is not null"; the compiler stops erroring.\n- No runtime check; if obj is actually null, it crashes.\n- Dangerous — defers an error from compile time to runtime.\n\nPrinciple: prefer ?., use ! only when you are sure the value is present (e.g. right after a typeof check) and ?. semantics don\'t fit. ?. chains can cascade: user?.address?.city?.length; any null layer short-circuits safely.',
              },
              {
                title: 'Q24: What is type widening? How do you control it?',
                content: 'Widening means a literal type is automatically relaxed to a wider base type.\n\nTypical cases:\n- const x = "hi" → type "hi" (no widening, because const is immutable).\n- let x = "hi" → type string (widened, because let is mutable).\n- const arr = [1, 2] → type number[] (element types widened, not tuple [1, 2]).\n- const obj = { x: 1 } → { x: number } (property value widened).\n\nControls:\n1. as const locks all literals to the narrowest type and adds readonly.\n2. Explicit annotation: const arr: [1, 2] = [1, 2].\n3. satisfies preserves literal inference: const palette = { red: [255,0,0] } satisfies Record<string, Color>; palette.red stays [255,0,0].\n\nWidening is TS\'s compromise for mutability; understanding it explains "why the inferred type is string instead of a literal".',
              },
              {
                title: 'Q25: What role does Control Flow Analysis (CFA) play in type narrowing?',
                content: 'CFA is the core mechanism by which TS automatically narrows types based on control flow.\n\nHow it works:\nWhen analyzing a function body, the compiler tracks each variable\'s current type at each position. It updates type state when it encounters conditional branches, assignments, and returns.\n\nCommon narrowings:\n1. if (typeof x === "string") → x: string inside the branch.\n2. After if (x === null) return, subsequent code removes null from x.\n3. Post-assignment narrowing: x = getString(); x becomes string.\n4. const assignment narrows to a literal; let widens.\n\nLimitations:\n- Type narrowing may be invalid after function calls — TS assumes functions have side effects and resets some narrowing.\n- Nested closures are not narrowed: if (x !== null) { setTimeout(() => x.foo()) } errors; use a const local variable to freeze.\n\nUnderstanding CFA explains "why the type widened again inside a callback".',
              },
              {
                title: 'Q26: What problem do Branded Types solve? How to implement them?',
                content: 'Branded types use a "phantom field" to add a distinguishing mark to structurally identical types, preventing misuse.\n\nProblem:\nUserId and OrderId are both numbers; TS\'s structural type system considers them interchangeable — passing the wrong ID doesn\'t error.\n\nImplementation:\n- type UserId = number & { readonly __brand: "UserId" }.\n- type OrderId = number & { readonly __brand: "OrderId" }.\n- Creation: function userId(n: number): UserId { return n as UserId }.\n- Usage: getUser(id: UserId) only accepts UserId; passing OrderId errors.\n\nZero runtime cost — the __brand field does not exist; it only matters at compile time. Suitable for IDs, tokens, latitude/longitude, and other "structurally identical but semantically different" types. Combine with type-fest\'s Brand utility to simplify definitions.',
              },
              {
                title: 'Q27: What are recursive types for? What are their limitations?',
                content: 'Recursive types self-reference, used to express tree/nested structures.\n\nTypical uses:\n1. JSON value: type Json = string | number | boolean | null | Json[] | { [k: string]: Json }.\n2. Deep readonly: type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }.\n3. Deep partial: type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }.\n4. Promise chain: type Unwrap<T> = T extends Promise<infer U> ? Unwrap<U> : T.\n\nLimitations:\n- Tail-call optimization (TS 4.5+): writing in tail-recursive form handles deeper nesting; otherwise stack overflow around 50 levels.\n- Type instantiation depth limit is about 1000; exceeding throws "Type instantiation is excessively deep".\n- Complex recursive types compile slowly; trade precision against compile performance.\n\nPractice: express tree data with recursive types, but avoid infinite depth — add a terminating branch to the recursion.',
              },
              {
                title: 'Q28: What are the practical applications of template literal types?',
                content: 'Template literal types use backticks to concatenate strings at the type level, producing strongly-typed strings.\n\nSyntax:\n- type EventName<T extends string> = `on${Capitalize<T>}`.\n- type Click = EventName<"click"> → "onClick".\n\nPractical applications:\n1. Event name mapping: type Listener<K extends keyof Events> = (e: Events[K]) => void; key constrained as `on${Capitalize<K>}`.\n2. CSS class union: type Align = "left" | "center" | "right"; type Class = `text-${Align}` → "text-left" | "text-center" | "text-right".\n3. Route paths: type Route = `/users/${number}/posts/${number}`.\n4. Combine with Uppercase/Lowercase/Uncapitalize for case transforms.\n5. Rename in key remapping: `[K in keyof T as `get${Capitalize<K>}`]`.\n\nLimitation: too many concatenation results can expand into a giant union, hurting compile performance.',
              },
              {
                title: 'Q29: How do you use mapped-type key remapping (as) and modifier add/remove (-?/-readonly)?',
                content: 'Both are advanced mapped-type capabilities, introduced in TS 4.1+.\n\nKey remapping as:\n- Syntax: { [K in keyof T as NewKey]: T[K] }.\n- Rename keys: `[K in keyof T as `get${Capitalize<string & K>}`]`.\n- Filter keys: [K in keyof T as K extends "id" ? never : K] excludes id (mapped types automatically skip never).\n\nModifier add/remove:\n- Add ?: { [K in keyof T]?: T[K] } (Partial implementation).\n- Remove ?: { [K in keyof T]-?: T[K] } (Required implementation).\n- Add readonly: { readonly [K in keyof T]: T[K] } (Readonly implementation).\n- Remove readonly: { -readonly [K in keyof T]: T[K] } (Mutable implementation).\n- Stackable: -readonly + -? can be removed together.\n\nComposition: key remapping + modifier add/remove gives custom utility types expressive power close to runtime map/filter.',
              },
              {
                title: 'Q30: How do you write function types, call signatures, and construct signatures?',
                content: 'Three ways to express "callable", with different use cases.\n\nFunction type literal:\n- type Fn = (x: number) => string — the most concise.\n- Best for standalone function type aliases.\n\nCall Signature:\n- interface Fn { (x: number): string; description: string }.\n- Used when the function itself has properties — in JS functions are objects and can carry properties.\n- After const f: Fn = ..., you can access f.description.\n\nConstruct Signature:\n- interface Ctor { new (x: number): Instance }.\n- Describes a class/constructor that can be new\'d.\n- Usage: function make(C: Ctor) { return new C(1) }.\n\nDistinction: call signature is for ordinary function calls fn(); construct signature is for new fn(). Combined with abstract classes and interfaces, it can constrain new-ability, a common DI pattern.',
              },
              {
                title: 'Q31: What are this types and ThisType for?',
                content: 'this types make the type of this inside methods explicit, avoiding type loss from dynamic this.\n\nthis type parameter:\n- class Builder { method(this: Builder) {...} } explicitly declares the this type.\n- Chaining: class Builder { add(): this { return this } }; after subclassing, return is the subclass type, not Builder.\n- Prevent misuse: function strict(this: User) {} binds the caller\'s type.\n\nThisType<T>:\n- A utility type that makes this inside an object literal infer as T.\n- Typical scenario: Vue2 methods/computed, where this points to the component instance.\n- Usage: const options = { methods: {...} } satisfies ThisType<MyComponent>.\n\nNote: this type in ordinary (non-method-shorthand) functions defaults to any; with noImplicitThis on it errors, requiring explicit annotation. Arrow functions have no own this and inherit from the outer scope.',
              },
              {
                title: 'Q32: How do you choose between abstract class and interface when describing object shapes?',
                content: 'Both define abstract contracts, but with different capability boundaries.\n\nabstract class:\n- Can contain implementation: abstract class Base { abstract name(): string; hello() { return "hi" } }.\n- Subclasses inherit via extends; single inheritance.\n- Provides default implementations + forces subclasses to implement abstract methods.\n- Exists at runtime (compiled to a real class).\n\ninterface:\n- Describes shape only, no implementation.\n- A class can implement multiple interfaces via implements.\n- Supports declaration merging.\n- Erased at runtime.\n\nChoice:\n- Need default implementation + force implementation of some methods → abstract class.\n- Only defining contract/shape, want multiple implementations, cross-library extension → interface.\n- TS recommendation: prefer interface when possible; abstract class extends JS class capabilities, and the runtime cost is real.\n- Duck-typing scenarios favor pure interfaces; OOP inheritance chains favor abstract classes.',
              },
              {
                title: 'Q33: What is the difference between access modifiers public/private/protected? Are they effective at runtime?',
                content: 'All three control class member accessibility, but they are compile-time features.\n\npublic (default): accessible anywhere.\nprivate: only inside the class; subclasses and external code cannot.\nprotected: inside the class and subclasses; external code cannot.\n\nRuntime ineffective:\n- TS\'s private/protected are erased after compilation; obj.privateField is still accessible at runtime.\n- For real runtime privacy, use ES2022 #field private fields: class Foo { #x = 1 }; compiled to true privacy, even Reflect cannot access.\n\nOther modifiers:\n- readonly: read-only; can be assigned inside the constructor.\n- static: static members, attached to the class.\n- #field vs private: # is runtime private and cannot be overridden by same-name inheritance; private is a compile-time convention.\n\nPractice: library internals use #field to prevent misuse; team collaboration can use private to express intent.',
              },
              {
                title: 'Q34: What is the current state and limitations of Decorators?',
                content: 'Decorators are syntax for annotating classes/methods/properties/parameters. TS 5.0 natively supports stage 3 decorators.\n\nTypes:\n1. Class decorator: @Component class Foo {} receives the constructor.\n2. Method decorator: @Log method() {} receives (target, key, descriptor).\n3. Property/parameter decorators: similar mechanisms.\n\nState:\n- TS 5.0+ defaults to stage 3 (the standard proposal), incompatible with the old experimentalDecorators.\n- Old decorators (emitDecoratorMetadata + experimentalDecorators) remain the default in mainstream frameworks like NestJS/TypeORM; migration takes time.\n- reflect-metadata provides type metadata, relying on old decorators.\n\nLimitations:\n- Decorators cannot change the decorated entity\'s type signature (need mixins or type inference).\n- Runtime order is fixed (bottom-up, methods→class); debugging requires understanding the execution order.\n\nPractice: new projects should prefer stage 3; legacy frameworks continue with old decorator configs; avoid mixing.',
              },
              {
                title: 'Q35: What is the const type parameter <const T> for? How does it differ from as const?',
                content: 'The const type parameter (TS 5.0+) makes a function\'s generic parameter infer as a literal type instead of widening.\n\nSyntax:\n- function tuple<const T>(arr: readonly T[]): T { return arr[0] }.\n- Calling tuple([1, 2, 3]) infers T as [1, 2, 3] (tuple literal), not number[].\n\nDifference from as const:\n- as const is a caller-side manual assertion: tuple([1,2,3] as const).\n- <const T> is the function author declaring "auto-infer as literal"; callers don\'t need to add as const each time.\n- The const type parameter is equivalent to auto-adding as const at the call site, better fitting API authors\' desire to control inference.\n\nScenarios:\n- Define precise unions: function flags<const T extends string>(...vals: T[]): T[].\n- Route tables / config tables: expect keys as literal unions, not string.\n\nNote: const type parameters make inference narrower; over-precision may cause assignment errors, so weigh it.',
              },
              {
                title: 'Q36: What is the difference between a structural and a nominal type system? Which one is TS?',
                content: 'The two are different philosophies of type equivalence.\n\nStructural:\n- If the structure matches, types are considered the same, regardless of name.\n- type A = { x: number }; type B = { x: number }; A and B are interchangeable.\n- TS is structural by default, derived from JS\'s duck-typing tradition.\n\nNominal:\n- The type is determined by name; same structure but different names are still different types.\n- Java/C#/Rust are nominal; stricter but less expressive.\n\nSimulating nominal in TS:\n- Branded types: type UserId = number & { __brand: "UserId" }.\n- unique symbol: use a unique symbol as the brand, more rigorous.\n- Class instances: class UserId { private _brand: unique symbol }; classes have a nominal flavor.\n\nImpact: structural typing makes composition flexible, but identically-structured IDs are easy to misuse; nominal typing is safer but verbose. Understanding this explains "why passing the wrong ID doesn\'t error".',
              },
              {
                title: 'Q37: How do you choose between type inference and explicit annotation?',
                content: 'Core principle: explicit annotation for public APIs, let inference handle internal implementations.\n\nExplicit annotation:\n1. Function return values — public APIs of libraries must be annotated; internal changes shouldn\'t drift the return type and break callers.\n2. Function parameters — parameter types are contracts and must be explicit.\n3. Complex generics — inference may be unintuitive; explicit annotation is clearer.\n4. Object literal assignments to variables — avoid widening; use const + explicit type or satisfies.\n\nRely on inference:\n1. Local variables const x = fn() — inferred type is the most precise.\n2. async function return values — Promise<T> inferred from return.\n3. Destructuring — let { name } = obj; just let inference work.\n\nAnti-patterns:\n- Repeating types on local variables (let x: number = 1) — redundant.\n- Using any instead of inference — loses precision.\n- Stubbornly relying on inference when the result is unintuitive — poor readability.\n\nBalance: judge by "can the caller see the type at a glance"; explicit at public boundaries, infer internally.',
              },
              {
                title: 'Q38: What is the difference between the satisfies operator and the as assertion?',
                content: 'satisfies verifies a type constraint but does not change inference; as forces an assertion and changes inference.\n\nsatisfies (TS 4.9+):\n- const palette = { red: [255, 0, 0] } satisfies Record<string, Color>.\n- Verifies the object conforms to Record<string, Color>, but palette.red still infers as [255, 0, 0] (precise literal).\n- Errors when the constraint fails — safe.\n\nas:\n- const palette = { red: [255, 0, 0] } as Record<string, Color>.\n- palette.red infers as Color (widened), losing literal precision.\n- Does not verify the real shape — may mis-assert.\n\nChoice:\n- Want to verify constraint + preserve precise inference → satisfies.\n- Want a forced cast (e.g. after JSON.parse) → as, but follow with runtime validation.\n- Narrow a union to a specific branch → type guard beats as.\n\nsatisfies is the best practice replacing the "explicit annotation + widening" compromise since TS 4.9.',
              },
              {
                title: 'Q39: How do you filter object properties by value type (PickByType)?',
                content: 'Use a mapped type + key remapping + conditional type to filter properties by value type.\n\nImplementation:\ntype PickByType<T, V> = {\n  [K in keyof T as T[K] extends V ? K : never]: T[K]\n}\n\nPrinciple:\n1. [K in keyof T] iterates all keys.\n2. as T[K] extends V ? K : never — if the value type is compatible with V, keep the key; otherwise remap to never.\n3. The mapped type automatically skips never keys, leaving only matching properties.\n\nUsage:\n- interface Config { port: number; host: string; debug: boolean }.\n- type StringProps = PickByType<Config, string> → { host: string }.\n- type NumberProps = PickByType<Config, number> → { port: number }.\n\nExtension: pair with NonNullable to filter optional properties — type Required<T> = { [K in keyof T]-?: T[K] }. This is the typical type-gymnastics pattern: key remapping + conditional type = type-level filter/map.',
              },
              {
                title: 'Q40: How do you implement DeepPartial and DeepReadonly? What are the pitfalls?',
                content: 'Both are recursive mapped types that make types deeply optional / readonly.\n\nDeepPartial:\ntype DeepPartial<T> = {\n  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]\n}\n\nDeepReadonly:\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]\n}\n\nPrinciple: recursive traversal; recurse on object types, stop on primitive types.\n\nPitfalls:\n1. Function types — T[K] extends object treats functions as objects and recurses, mishandling () => void. Add an exclusion: T[K] extends Function ? T[K] : ....\n2. Arrays — DeepReadonly<number[]> becomes { readonly [n: number]: number }, losing array methods. Special-case arrays: T extends readonly any[] ? ReadonlyArray<T[number]> : ....\n3. Circular references — self-referencing objects recurse infinitely; TS has a depth limit to protect you.\n\nPractice: use type-fest\'s DeepPartial/DeepReadonly in complex scenarios — edge cases are already handled.',
              },
              {
                title: 'Q41: How do Promise<T> and async/await types work?',
                content: 'async functions return Promise<T>; await unwraps a Promise.\n\nType rules:\n1. async function fn(): Promise<string> { return "hi" } — the return value is automatically wrapped in a Promise.\n2. async function fn(): Promise<string> { return Promise.resolve("hi") } — directly returning a Promise is flattened.\n3. const x: string = await fn() — await unwraps Promise<string> to string.\n4. Inside an async function, awaiting a non-Promise value — the value is returned as-is, type unchanged.\n\nPitfalls:\n1. Top-level await — only available in module context; errors in CommonJS.\n2. await must be inside async — using await in a normal function errors; use .then() or make it async.\n3. Promise chain types — Promise<T>.then<U>(cb) returns Promise<U>; if cb returns a Promise it is flattened.\n4. reject type — Promise\'s reject is any and cannot be typed; use a Result<T, E> pattern to wrap errors.\n\nPractice: async/await is syntactic sugar for Promise, with friendlier type inference; errors handled via try/catch.',
              },
              {
                title: 'Q42: What is the use of generic default values <T = string>?',
                content: 'Generic defaults let callers omit the type parameter, improving API ergonomics.\n\nSyntax:\n- interface Box<T = string> { value: T }.\n- Call const b: Box = { value: "hi" }; T defaults to string.\n- Explicit override: const b: Box<number> = { value: 1 }.\n\nRules:\n1. Type parameters with defaults can be omitted; those without must be supplied.\n2. A default cannot reference a type parameter declared later (must be declared first).\n3. The default must satisfy the parameter\'s extends constraint.\n\nScenarios:\n1. Config objects — interface Config<T = string> { items: T[] }; most use string.\n2. Utility types — type State<T = any> = { value: T }; loose default.\n3. React Props — interface Props<T = unknown>; generic components default to unknown.\n\nNote: defaults make APIs easier to use but may hide type imprecision — callers should pass explicit types rather than rely on defaults.',
              },
              {
                title: 'Q43: What are variadic tuple types ...args: [...T]? What problem do they solve?',
                content: 'Variadic tuples (TS 4.0+) let tuples support generic spread; they are key to function concat type inference.\n\nSyntax:\n- function concat<T extends readonly unknown[]>(...args: [...T]): T { return args }.\n- Calling concat(1, "a", true) infers T as [number, string, boolean].\n\nProblem solved:\n- In old TS, ...args: T[] could only infer an array, losing positional information.\n- Variadic tuples let ...args: [...T] preserve the precise type at each position.\n\nTypical applications:\n1. curry: function curry<T extends any[]>(...fn: T): (...args: T) => void.\n2. concat typing: function concat<A extends readonly unknown[], B extends readonly unknown[]>(a: A, b: B): [...A, ...B].\n3. useState: const [v, set] = useState<T>(init) returns [T, (v: T) => void].\n\nNote: variadic tuples can also spread in conditional types + infer — T extends [infer Head, ...infer Rest] ? Rest : [], enabling tuple-type recursion.',
              },
              {
                title: 'Q44: How do literal narrowing and as const work together in config scenarios?',
                content: 'as const asserts an object/array as the narrowest literal type — a key tool for typing configs.\n\nScenario: route tables / config tables expect keys as literal unions rather than string.\n\nExample:\nconst ROUTES = ["home", "about", "contact"] as const\n// Type: readonly ["home", "about", "contact"]\ntype Route = typeof ROUTES[number]\n// "home" | "about" | "contact"\n\nKey points:\n1. as const makes the array a tuple instead of string[], preserving element literal types.\n2. typeof ROUTES[number] takes the union of array element types.\n3. Applies to object literals too: const CONFIG = { port: 3000 } as const; port type is 3000, not number.\n4. Pair with satisfies to verify constraints: const CONFIG = { port: 3000 } satisfies Record<string, number>; CONFIG.port stays 3000.\n\nPitfall: as const makes everything readonly; runtime immutable; modification requires unfreezing via [...arr].',
              },
              {
                title: 'Q45 [Scenario]: A project depends on a third-party library with no type declarations. How do you handle it?',
                content: 'Handle by scenario; prefer existing community types, then hand-write a minimal declaration.\n\nSteps:\n1. Check @types — npm i -D @types/libname; most mainstream libraries have community-maintained .d.ts.\n2. Check the library\'s bundled types — look at package.json\'s "types" or "exports" field; newer libraries often bundle .d.ts.\n3. If neither, hand-write a minimal declaration:\n   - In src/types/global.d.ts write declare module "libname" { export function foo(x: number): string }.\n   - Only declare the APIs you use; unknown APIs default to any (narrow later).\n4. Incremental narrowing — after using it for a while, replace any with precise types, paired with unknown + type guards.\n\nPitfalls:\n- declare module as a whole any pollutes caller inference; be as precise as possible.\n- Global declaration files must be in tsconfig\'s include.\n- After library upgrades, types may change; periodically reconcile .d.ts with the actual API.\n\nPrinciple: types are incremental; get it running first, then refine — don\'t block the business.',
              },
              {
                title: 'Q46 [Scenario]: How do you organize shared types in a large monorepo?',
                content: 'Define centrally, sub-package by domain, avoid circular dependencies.\n\nStructure:\n1. types package — a standalone @repo/types package holding cross-package shared domain types (User/Order/DTO).\n2. Subdivide by domain — types/user.ts, types/order.ts; barrel-export via index.ts.\n3. Package-private types don\'t go into the shared package, to avoid pollution.\n\nPractices:\n1. project references — split via tsconfig references for incremental compilation on type changes.\n2. path mapping — configure @repo/types/* alias in tsconfig paths; no need to publish during development.\n3. Versioning — manage shared type packages with changeset/semantic-release to avoid breaking changes.\n4. No runtime dependency — the types package contains only types, no implementation, to avoid circular deps.\n\nPitfalls:\n- Type/schema drift — use zod/io-ts to generate types, single source of truth.\n- Circular dependency — A imports B\'s types, B imports A; extract the common subtype into a third file.\n- Compile performance — a giant types package slows whole-repo compiles; split into domain sub-packages.\n\nPrinciple: types are contracts; shared types should have versions and a change process, just like APIs.',
              },
              {
                title: 'Q47 [Comparison]: How do you choose among enum, union literal types, and as const objects?',
                content: 'All three express "a finite set of constants", but with different mechanisms and pitfalls.\n\nenum:\n- enum Color { Red, Blue } generates a runtime object; numeric enums have reverse mapping.\n- Pitfalls: bundle size growth, unsafe numeric enums, inconsistent const enum across compilers.\n- Suitable when you need a runtime object (iterate enum values).\n\nUnion literal types:\n- type Color = "red" | "blue"; erased at compile time, no runtime cost.\n- Safe — only the specified literals are assignable.\n- Drawback: cannot iterate like an object; pair with const COLORS = [...] as const.\n\nas const objects:\n- const COLORS = { Red: "red", Blue: "blue" } as const.\n- Combines runtime values (iterable) + type union (typeof COLORS[keyof typeof COLORS]).\n- Closest to enum but without enum pitfalls.\n\nRecommendation: new projects should prefer as const objects + union literals, balancing runtime and type safety; legacy enums can stay; avoid introducing const enum.',
              },
              {
                title: 'Q48 [Comparison]: How do type alias and interface differ in extension and performance?',
                content: 'Both define object shapes, but differ in extension mechanisms and compile behavior.\n\nExtension:\n- interface inherits via extends: interface B extends A {}; multiple inheritance allowed.\n- interface supports declaration merging — same names auto-merge; libraries can be extended by users.\n- type uses intersection &: type B = A & { x: number }; no declaration merging.\n- type can express union / tuple / mapped types; interface cannot.\n\nPerformance:\n- Large unions are best expressed with type; interface cannot define unions and would need workarounds.\n- interface declaration merging may produce unexpected merges in large projects (name conflicts).\n- Compile speed difference is usually negligible, but giant intersections & may be slower than extends.\n\nChoice:\n- Public API shape, want extension → interface.\n- Unions, tuples, utility types, complex type computations → type.\n- Pick one team style; mixing increases cognitive load.\n\nTS official advice: use interface when possible; use type only when you need its unique capabilities.',
              },
              {
                title: 'Q49 [Comparison]: How do you choose between generics and function overloads for "multiple type signatures"?',
                content: 'Both let a function handle multiple types, but differ in expressiveness and use cases.\n\nGenerics:\n- function id<T>(x: T): T { return x }; one signature covers all types.\n- Pros: precise types, less code, caller-side inference.\n- Limit: only suitable when the "implementation logic" is the same across type-parameter combinations; different logic needs overloads.\n- Best for: identity, map, containers, utility functions.\n\nFunction overloads:\n- function fn(x: string): number; function fn(x: number): string; multiple signatures + one implementation.\n- Pros: each parameter combination can return a different type; implementation can branch.\n- Limit: implementation signature is invisible externally; overload order is sensitive; higher maintenance cost.\n- Best for: APIs with complex parameter/return mappings and different branch logic.\n\nChoice:\n- Unified logic, only types vary → generics.\n- Logic branches, each returns a different type → overloads.\n- Start with generics, upgrade to overloads when branch implementations are needed.\n- Overload signatures should be ordered specific→broad, to avoid being matched first by wide types.',
              },
              {
                title: 'Q50 [Comprehensive]: What is the core philosophy of TypeScript type gymnastics? Where is the boundary?',
                content: 'Type gymnastics treats the type system as a programming language, implementing type-level computation.\n\nCore philosophy:\n1. Types as values — type parameters are like function parameters, conditional types like if, mapped types like map, infer like let.\n2. Recursion and pattern matching — T extends [infer H, ...infer R] ? f<H> + rec<R> : []; recursive traversal.\n3. Constraints as contracts — T extends Constraint limits the input shape and guarantees type safety.\n4. Composition over inheritance — small utility types compose into big ones, Partial<Omit<...>>.\n\nTypical results:\n- DeepPartial/DeepReadonly, GetOptional/GetRequired, Path<T> (path union), Join (string concatenation).\n- type-fest, ts-toolbelt and other libraries provide many ready-made utilities.\n\nBoundaries (when not to gymnast):\n1. Compile performance — recursive types distributing on large unions slow compilation; diagnose with tsc --extendedDiagnostics.\n2. Readability — over-gymnastic code is hard to maintain; the team needs consensus.\n3. Runtime useless — types are compile-time only; runtime validation still needs zod/io-ts.\n4. Inference limits — some types (e.g. reverse-deriving object key/value types) cannot be expressed in TS; need runtime solutions.\n\nPractice: use gymnastics to eliminate repetitive type code, but keep "good enough" restraint; balance type precision against maintenance cost.',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // Knowledge Point 18: TypeScript Cheat Sheet
    // ========================================================================
    {
      order: 18,
      title: 'TypeScript Cheat Sheet',
      difficulty: 1,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ts-p18-1',
          type: 'paragraph',
          text: 'Quick reference for TypeScript core concepts and common syntax. Covers basic types, generics, utility types, and compiler configuration.',
        },
        {
          id: 'ts-p18-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Category',
            columns: ['Syntax / Concept', 'Example'],
            rows: [
              { feature: 'Basic types', values: ['string / number / boolean / null / undefined / void / any / unknown / never', 'let n: number = 42'] },
              { feature: 'Arrays & tuples', values: ['T[] / Array<T> / [T1, T2]', 'const a: string[] = ["a"]'] },
              { feature: 'Union & intersection', values: ['| union / & intersection', 'type A = string | number'] },
              { feature: 'interface', values: ['interface Name { prop: T }', 'interface User { name: string }'] },
              { feature: 'type alias', values: ['type Name = T', 'type ID = string | number'] },
              { feature: 'Generics', values: ['<T> / <T extends Constraint>', 'function id<T>(x: T): T'] },
              { feature: 'Utility types', values: ['Partial / Required / Pick / Omit / Record / Exclude / Extract', 'type P = Partial<User>'] },
              { feature: 'Conditional types', values: ['T extends U ? X : Y', 'type IsStr<T> = T extends string ? true : false'] },
              { feature: 'infer', values: ['T extends (...args: any[]) => infer R ? R : never', 'ReturnType<T>'] },
              { feature: 'Mapped types', values: ['[K in keyof T]: NewType', 'type RO<T> = { readonly [K in keyof T]: T[K] }'] },
              { feature: 'Type guards', values: ['typeof / instanceof / in / is', 'function isCat(a: any): a is Cat'] },
              { feature: 'tsconfig', values: ['strict / target / module / paths', '{ "strict": true, "target": "ES2022" }'] },
              { feature: 'Declaration files', values: ['declare / .d.ts', 'declare module "*.css"'] },
              { feature: 'satisfies', values: ['expression satisfies Type', 'palette satisfies Record<string, Color>'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // Knowledge Point 19: TypeScript Quiz (QuizCard)
    // ========================================================================
    {
      order: 19,
      title: 'TypeScript Quiz',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'ts-p19-1',
          type: 'paragraph',
          text: 'Take the quiz below to check your mastery of TypeScript core concepts. Each question has a detailed explanation.',
        },
        {
          id: 'ts-p19-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '[Recall] Which type is the type-safe replacement for any?',
                options: ['never', 'void', 'unknown', 'undefined'],
                correctIndex: 2,
                explanation: 'unknown is the type-safe replacement for any. Values of type unknown cannot be used directly; you must first narrow the type (typeof, instanceof, custom guards) before operating on it. any disables type checks entirely.',
              },
              {
                question: '[Recall] What is interface\'s unique advantage over type?',
                options: ['Can define union types', 'Can define tuples', 'Declaration merging (same-name auto-merge)', 'Can use generics'],
                correctIndex: 2,
                explanation: 'Only interface supports declaration merging — same-name interfaces auto-merge their properties. This is very useful when extending third-party libraries or global types. Defining union types and tuples is type\'s unique advantage.',
              },
              {
                question: '[Understand] After enabling strictNullChecks, what happens to: let name: string = null?',
                options: ['Runs normally', 'Compile error: null is not assignable to string', 'Runtime error', 'Warning but no compile impact'],
                correctIndex: 1,
                explanation: 'With strictNullChecks on, null and undefined cannot be assigned to other types (string, number, etc.). You must use a union explicitly: let name: string | null = null. This is one of strict mode\'s core features.',
              },
              {
                question: '[Understand] Where is the infer keyword correctly used?',
                options: ['On the right side of a type alias', 'Inside the extends clause of a conditional type', 'In a function parameter position', 'In a variable type annotation'],
                correctIndex: 1,
                explanation: 'infer can only appear inside the extends clause of a conditional type (T extends U ? X : Y), used to declare a type variable to be inferred. e.g. T extends Promise<infer R> ? R : never.',
              },
              {
                question: '[Understand] Which statement about the generic constraint extends is correct?',
                options: [
                  'extends only works for interface inheritance',
                  'extends constrains the generic parameter to satisfy a specific shape',
                  'extends does not work in conditional types',
                  'extends can only constrain classes, not functions',
                ],
                correctIndex: 1,
                explanation: 'The generic constraint extends restricts the generic parameter to satisfy a specific type shape. e.g. <T extends HasLength> ensures T has a length property, which can be safely accessed inside the function body. Passing a type that doesn\'t satisfy the constraint is a compile error.',
              },
              {
                question: '[Apply] What does the satisfies operator (TS 4.9+) do?',
                options: [
                  'Forces a type cast',
                  'Verifies an expression conforms to a type while preserving the most precise inferred type',
                  'Creates a new type alias',
                  'Makes a type readonly',
                ],
                correctIndex: 1,
                explanation: 'satisfies verifies an expression conforms to a type constraint, but does not change TS\'s inference result. This means you get both type validation and precise literal inference. In const palette = { red: [255,0,0] } satisfies Record<string, Color>, palette.red is still [255,0,0], not Color.',
              },
              {
                question: '[Recall] Which operator in TS gets the union of all key names of an object?',
                options: ['typeof', 'keyof', 'infer', 'instanceof'],
                correctIndex: 1,
                explanation: 'keyof T returns the union of all key names of type T. typeof in type context gets the type of a JS value. Combine with type Keys = keyof typeof obj to get the key-name union of an object.',
              },
              {
                question: '[Understand] Which type represents "a value that never occurs" and can be used for exhaustive checks?',
                options: ['void', 'null', 'never', 'undefined'],
                correctIndex: 2,
                explanation: 'never represents a value that never occurs. In a switch\'s default branch, assigning to a never-typed variable produces a compile error if any union member is unhandled — that\'s an exhaustive check.',
              },
              {
                question: '[Apply] What does const x = "hi" as const infer as?',
                options: ['string', '"hi"', 'readonly string', 'unknown'],
                correctIndex: 1,
                explanation: 'as const asserts a value to the narrowest literal type. const x = "hi" as const infers "hi" (literal type), while a plain const x = "hi" infers string (type widened).',
              },
              {
                question: '[Compare] What is the key difference between any and unknown?',
                options: [
                  'They are identical',
                  'any disables checks and allows anything; unknown is safe and requires narrowing before use',
                  'unknown allows anything; any requires narrowing',
                  'any can only be assigned to any',
                ],
                correctIndex: 1,
                explanation: 'any disables all type checks; assignable to any type, any property accessible. unknown is the type-safe any — accepts any value, but cannot be operated on directly; you must narrow with type guards first. unknown cannot be assigned to any type other than unknown/any.',
              },
              {
                question: '[Compare] What is the relationship between Partial<T> and Required<T>?',
                options: [
                  'They are the same',
                  'Partial adds ?, Required removes ? (-?), they are inverses',
                  'Partial adds readonly, Required removes readonly',
                  'Partial selects keys, Required excludes keys',
                ],
                correctIndex: 1,
                explanation: 'Partial<T> = { [K in keyof T]?: T[K] } makes properties optional; Required<T> = { [K in keyof T]-?: T[K] } uses -? to remove the optional modifier. They are inverse operations. Readonly and -readonly work the same way.',
              },
              {
                question: '[Understand] Which statement about numeric enums is wrong?',
                options: [
                  'Generates reverse mapping code, increasing bundle size',
                  'Any number is assignable to a numeric enum (unsafe)',
                  'const enum works under isolatedModules',
                  'Recommended to replace with union literal types',
                ],
                correctIndex: 2,
                explanation: 'const enum is not usable under isolatedModules, and esbuild/swc and other compilers handle const enum inconsistently, possibly causing runtime errors. Numeric enums also have reverse mapping and type-safety issues, so type Status = "a" | "b" union literals are recommended.',
              },
              {
                question: '[Apply] Which is the correct way to hand-write ReturnType<T> (get a function\'s return type)?',
                options: [
                  'type ReturnType<T> = T',
                  'type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never',
                  'type ReturnType<T> = keyof T',
                  'type ReturnType<T> = T extends infer R ? R : never',
                ],
                correctIndex: 1,
                explanation: 'ReturnType uses a conditional type + infer: constrain T to a function, use infer R in the extends clause to capture the return type, take R if matched else never. infer can only appear inside the extends clause of a conditional type.',
              },
              {
                question: '[Scenario] After parsing JSON.parse(res), what is the best practice to safely access data.user.name?',
                options: [
                  'const r = JSON.parse(res) as any; r.data.user.name',
                  'const r: unknown = JSON.parse(res); narrow layer by layer with type guards before accessing',
                  'const r = JSON.parse(res); r.data.user.name (relying on implicit any)',
                  'const r = JSON.parse(res) as {data:{user:{name:string}}}; access directly',
                ],
                correctIndex: 1,
                explanation: 'JSON.parse returns any; directly asserting a specific type (option 4) skips runtime validation and crashes when the structure doesn\'t match. Safe approach: declare unknown, narrow layer by layer with type guards (typeof / object-validation library). unknown + guards is the safe pattern replacing any + as.',
              },
              {
                question: '[Understand] Distributive conditional type: what is the result of type T = (A | B) extends U ? X : Y?',
                options: [
                  '(A extends U ? X : Y) & (B extends U ? X : Y)',
                  '(A extends U ? X : Y) | (B extends U ? X : Y)',
                  'A | B extends U ? X : Y evaluated as a whole',
                  'Compile error',
                ],
                correctIndex: 1,
                explanation: 'A naked type parameter T distributes in a conditional type: the union A | B evaluates to (A extends U ? X : Y) | (B extends U ? X : Y). This is how Exclude/Extract are implemented. To avoid distribution, wrap with [T] extends [U].',
              },
              {
                question: '[Compare] What is the essential difference between the type assertion as and a type guard (like typeof)?',
                options: [
                  'Both are runtime checks',
                  'as is a compile-time assertion with no runtime check; type guards are real checks based on runtime values',
                  'as is safer than type guards',
                  'Type guards change runtime behavior',
                ],
                correctIndex: 1,
                explanation: 'as is "you tell the compiler what to believe" — no runtime validation; misuse defers errors to runtime. Type guards perform real checks based on runtime values; the compiler narrows types based on results, ensuring type safety. Prefer guards; when you must use as, follow up with runtime validation.',
              },
              {
                question: '[Apply] Which code triggers a strictFunctionTypes error?',
                options: [
                  'const fn: (x: Animal) => void = (x: Dog) => {} (ordinary function type)',
                  'const fn: (x: Dog) => void = (x: Dog) => {}',
                  'const fn = (x: Dog) => {}',
                  'interface Fn { (x: Dog): void } const f: Fn = (x: Animal) => {}',
                ],
                correctIndex: 0,
                explanation: 'Under strictFunctionTypes, ordinary function-type parameters are contravariant: a function with a narrower parameter (x:Dog)=>void cannot be assigned to a wider-parameter type (x:Animal)=>void, because the caller may pass a Cat. Option 4 uses method shorthand, which is bivariant and doesn\'t error — this is exactly the boundary strictFunctionTypes checks (ordinary function types only).',
              },
              {
                question: '[Understand] What is this syntax called: type Foo = { [K in keyof T]: T[K] }?',
                options: ['Conditional type', 'Mapped type', 'Template literal type', 'Intersection type'],
                correctIndex: 1,
                explanation: '[K in keyof T]: NewType is mapped-type syntax — iterates T\'s keys to produce a new type. Partial/Readonly/Pick are all based on mapped types. Key remapping (as) and modifier add/remove (-?/-readonly) extend its capabilities.',
              },
              {
                question: '[Scenario] A 100k-line legacy JS project is being migrated to TS. What should be the first step?',
                options: [
                  'Enable strict: true outright and fix everything',
                  'Enable allowJs + checkJs, start with strict: false, enable sub-options incrementally',
                  'Delete all JS and rewrite',
                  'Only migrate entry files',
                ],
                correctIndex: 1,
                explanation: 'Incremental migration: allowJs lets the compiler recognize JS; start with strict: false to avoid thousands of errors blocking work at once. Enable noImplicitAny first, then strictNullChecks; migrate in leaf-module → business-entry order; CI blocks new errors but allows existing ones. Type safety is a process, not a switch.',
              },
              {
                question: '[Comprehensive] Which statement about TS utility types is correct?',
                options: [
                  'Pick<T,K> excludes specified keys; Omit<T,K> selects specified keys',
                  'Omit = Pick + Exclude; the two are complementary',
                  'Record<K,V> is mapped-type syntax sugar but cannot iterate over unions',
                  'ReturnType is implemented with keyof',
                ],
                correctIndex: 1,
                explanation: 'Omit<T,K> is internally defined as Pick<T, Exclude<keyof T, K>>, i.e. "invert then Pick" — complementary to Pick. Pick selects; Omit excludes. Record<K,V> = { [P in K]: V } can iterate over union keys (when K is a union, generates a multi-key object). ReturnType uses infer, not keyof.',
              },
            ],
          },
        },
      ],
    },
  ],
}
