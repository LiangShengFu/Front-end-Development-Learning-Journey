/**
 * Module 06: CSS Engineering & Styling Solutions (English version)
 *
 * Full English translation of css-engineering.ts.
 * Loaded by moduleRegistry when locale === 'en'.
 *
 * 21 knowledge points:
 * - KP1 Styling solution timeline
 * - KP2-4 Sass preprocessor (variables, nesting, Mixin/Function/extend)
 * - KP5-6 Tailwind CSS core usage & theme config
 * - KP7-12 Responsive breakpoints, CSS Modules, CSS-in-JS, PostCSS,
 *        UI component libraries, CSS architecture (BEM/ITCSS/SMACSS)
 * - KP13-16 CSS variables & theming, container queries, @layer, knowledge graph
 * - KP17-18 Hands-on: BEM card refactor + Tailwind responsive navbar
 * - KP19-21 Interview questions, cheat sheet, quiz
 */
import type { ModuleMeta } from '../lib/types'

export const cssEngineeringModule: ModuleMeta = {
  number: '06',
  title: 'CSS Engineering & Styling Solutions',
  slug: 'css-engineering',
  stage: 'prerequisites',
  stageLabel: 'Foundation · Module 6',
  icon: '06',
  summary:
    'Sass/Less, Tailwind, CSS Modules, CSS-in-JS, PostCSS, CSS architecture, container queries, @layer.',
  knowledgePointCount: 21,
  visualizationCount: 12,
  points: [
    // ========================================================================
    // KP 1: Evolution of Styling Solutions
    // ========================================================================
    {
      order: 1,
      title: 'Evolution of Styling Solutions',
      difficulty: 1,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS styling solutions have evolved from raw inline styles and external stylesheets through preprocessors (Sass/Less), atomic frameworks (Tailwind), CSS-in-JS, and CSS Modules, to modern container queries and @layer. Understanding this progression helps with choosing the right approach.',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'horizontal',
            items: [
              { time: 'Stage 1', title: 'Native CSS', description: 'Inline, internal, and external stylesheets. Simple but lacks variables, nesting, and reuse — hard to maintain in large projects.', status: 'done' },
              { time: 'Stage 2', title: 'Preprocessors', description: 'Sass/Less bring variables, nesting, Mixins, and extend. Improve reuse but require a compile step and have no runtime variables.', status: 'done' },
              { time: 'Stage 3', title: 'Naming conventions', description: 'BEM/ITCSS/SMACSS methodologies. Solve naming conflicts and style reuse, but rely on manual discipline.', status: 'done' },
              { time: 'Stage 4', title: 'CSS Modules', description: 'Auto-generate unique class names to fully solve naming conflicts. Compile-time local scope, but weak cross-component reuse.', status: 'done' },
              { time: 'Stage 5', title: 'CSS-in-JS', description: 'styled-components/emotion put styles in JS and support dynamic theming. Runtime overhead and complex SSR.', status: 'active' },
              { time: 'Stage 6', title: 'Atomic CSS', description: 'Tailwind/Windi are utility-first, constrain the design system, and ship a tiny bundle. Learning curve and verbose class names.', status: 'active' },
              { time: 'Stage 7', title: 'Modern CSS', description: 'Container queries (@container), @layer cascade layers, CSS variables, :has() selector. Native capabilities reduce reliance on tooling.', status: 'pending' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'callout',
          variant: 'tip',
          title: 'No silver bullet',
          text: 'Each approach has trade-offs: native CSS suits small projects, Tailwind suits rapid development, CSS Modules suits component-based projects, and CSS-in-JS suits highly dynamic theming. Choose based on the team, project scale, and performance requirements.',
        },
      ],
    },

    // ========================================================================
    // KP 2: Sass/Less Preprocessors
    // ========================================================================
    {
      order: 2,
      title: 'Sass/Less Preprocessors',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'Sass (SCSS) is the most popular CSS preprocessor. It provides variables, nesting, Mixins, extend, and functions, and compiles to native CSS. Less has a similar syntax but is implemented in JavaScript.',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Sass compile demo: variables, nesting, and Mixin in action',
            initialCode: `<!-- Compiled CSS output (see the code block for the Sass source) -->
<style>
  /* Equivalent Sass:
   * $primary: #3b82f6;
   * .btn {
   *   background: $primary;
   *   &:hover { background: darken($primary, 10%); }
   * }
   */
  .btn {
    padding: 8px 16px;
    border-radius: 6px;
    background: #3b82f6;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn:hover { background: #2563eb; }
  .btn-secondary {
    background: #6b7280;
  }
  .btn-secondary:hover { background: #4b5563; }
</style>

<button class="btn">Primary button</button>
<button class="btn btn-secondary">Secondary button</button>`,
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'scss',
          filename: 'Sass syntax',
          code: `// === Sass variables ===
$primary-color: #3b82f6;
$spacing-unit: 8px;
$breakpoint-md: 768px;

// === Nesting ===
.navbar {
  display: flex;
  padding: $spacing-unit * 2;

  // & refers to the parent selector
  &__item {
    margin-left: $spacing-unit;
    color: white;

    &:hover { color: $primary-color; }
    &--active { font-weight: bold; }
  }
}

// === Mixin (reusable style block) ===
@mixin button-variant($bg) {
  background: $bg;
  &:hover { background: darken($bg, 10%); }
  &:active { background: darken($bg, 20%); }
}

.btn-primary { @include button-variant($primary-color); }
.btn-danger { @include button-variant(#ef4444); }

// === Extend (@extend) ===
%card-base {
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.info-card { @extend %card-base; background: white; }
.error-card { @extend %card-base; background: #fef2f2; }

// === Functions and loops ===
@for $i from 1 through 12 {
  .col-#{$i} { width: percentage($i / 12); }
}

// === Conditionals and loops ===
@mixin respond-to($breakpoint) {
  @if $breakpoint == md { @media (min-width: 768px) { @content; } }
  @else if $breakpoint == lg { @media (min-width: 1024px) { @content; } }
}

.container {
  width: 100%;
  @include respond-to(md) { max-width: 720px; }
  @include respond-to(lg) { max-width: 960px; }
}`,
        },
        {
          id: 'p2-4',
          type: 'callout',
          variant: 'warning',
          title: 'The @extend trap',
          text: '@extend produces grouped selectors (.a, .b) and can cause selector explosion. Prefer Mixins in complex cases — slightly more output but more controllable. Dart Sass no longer recommends @extend.',
        },
      ],
    },

    // ========================================================================
    // KP 3: Sass Variables & Nesting
    // ========================================================================
    {
      order: 3,
      title: 'Sass Variables & Nesting',
      difficulty: 2,
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          text: 'Variables and nesting are the two most-used Sass features. Variables unify theme colors, spacing, and breakpoints; nesting mirrors the DOM hierarchy, but going too deep inflates selector specificity and hurts maintainability.',
        },
        {
          id: 'p3-2',
          type: 'code',
          language: 'scss',
          filename: 'Variables and nesting best practices',
          code: `// === Variable organization ===
// Group by category; use semantic prefixes
$color-primary: #3b82f6;
$color-success: #10b981;
$color-warning: #f59e0b;
$color-danger: #ef4444;

$space-1: 4px;
$space-2: 8px;
$space-3: 16px;
$space-4: 24px;
$space-5: 32px;

$font-sm: 12px;
$font-base: 14px;
$font-lg: 16px;
$font-xl: 20px;

// === Sass Maps (structured variables) ===
$theme: (
  primary: #3b82f6,
  secondary: #6b7280,
  success: #10b981,
);

// Read with map-get
.button { background: map-get($theme, primary); }

// === Nesting depth control (no more than 3 levels) ===
// ✗ Too deep (avoid)
.nav > .nav__list > .nav__item > .nav__link > span {
  color: red;
}

// ✓ Recommended: flatten
.nav__link-text {
  color: red;
}

// ✓ Reasonable nesting (2-3 levels)
.card {
  padding: 16px;

  &__title { font-size: 18px; }
  &__body { margin-top: 8px; }

  &--highlight {
    border: 2px solid $color-primary;

    .card__title { color: $color-primary; }
  }
}

// === Local variables (!default) ===
// Allow consumers to override the default
$primary: blue !default;
.button { background: $primary; }

// Consumers can define their own $primary before importing`,
        },
        {
          id: 'p3-3',
          type: 'list',
          items: [
            'Variable naming: category prefixes ($color-/$space-/$font-), semantic',
            'Structure: use Sass Maps for related variables (theme colors, breakpoints)',
            'Nesting depth: keep it under 3 levels to avoid high specificity',
            'BEM + nesting: use & to build BEM modifiers (&--active)',
            '!default: libraries/themes let consumers override defaults',
            'Modularity: use @use/@forward instead of @import (Dart Sass)',
          ],
        },
      ],
    },

    // ========================================================================
    // KP 4: Sass Mixin / Function / Extend
    // ========================================================================
    {
      order: 4,
      title: 'Sass Mixin / Function / Extend',
      difficulty: 3,
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          text: 'Mixins reuse style blocks, Functions return values, and @extend inherits selectors. Together they are Sass\u2019s core code-reuse mechanisms; using them well dramatically reduces repetition.',
        },
        {
          id: 'p4-2',
          type: 'code',
          language: 'scss',
          filename: 'Mixin / Function / Extend',
          code: `// === Mixin: reusable style block (may take args) ===
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@mixin truncate($line: 1) {
  @if $line == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $line;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@mixin respond-to($bp) {
  @media (min-width: $bp) { @content; }
}

// Usage
.modal { @include absolute-center; }
.title { @include truncate(2); }
.sidebar {
  width: 100%;
  @include respond-to(768px) {
    width: 250px;
  };
}

// === Function: returns a value ===
@function rem($px) {
  @return $px / 16px * 1rem;
}

@function color-yiq($color) {
  $r: red($color);
  $g: green($color);
  $b: blue($color);
  $yiq: (($r * 299) + ($g * 587) + ($b * 114)) / 1000;
  @if $yiq >= 150 { @return #000; }
  @else { @return #fff; }
}

// Usage
.text { font-size: rem(20px); }  // 1.25rem
.btn-primary {
  background: #3b82f6;
  color: color-yiq(#3b82f6);  // auto-pick black/white text
}

// === @extend: inherit a selector ===
// Share base styles
.message {
  padding: 10px;
  border-radius: 4px;
}

.message-error {
  @extend .message;
  background: #fef2f2;
  color: #ef4444;
}

// === Placeholder selector % (unused styles are not output) ===
%card-base {
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-card { @extend %card-base; }
.user-card { @extend %card-base; }`,
        },
        {
          id: 'p4-3',
          type: 'callout',
          variant: 'tip',
          title: 'Mixin vs Extend',
          text: 'Use Mixins when you need parameters; use @extend for pure shared styles. But @extend produces grouped selectors that can leak into unexpected places — prefer Mixins in complex cases. Dart Sass has optimized @extend performance, but use it with care.',
        },
      ],
    },

    // ========================================================================
    // KP 5: Tailwind CSS — Core Usage
    // ========================================================================
    {
      order: 5,
      title: 'Tailwind CSS — Core Usage',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          text: 'Tailwind CSS follows a utility-first philosophy: atomic utility classes are composed directly in HTML, with no need to write custom CSS. The config file constrains the design system and guarantees visual consistency.',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Tailwind utility classes live preview: button, card, badge, form, layout',
            initialCode: `<!-- Tailwind utility class composition (CDN-style demo) -->
<style>
  .bg-blue-500 { background-color: #3b82f6; }
  .bg-green-500 { background-color: #10b981; }
  .bg-gray-100 { background-color: #f3f4f6; }
  .text-white { color: white; }
  .text-blue-600 { color: #2563eb; }
  .px-4 { padding-left: 16px; padding-right: 16px; }
  .py-2 { padding-top: 8px; padding-bottom: 8px; }
  .p-4 { padding: 16px; }
  .rounded { border-radius: 4px; }
  .rounded-lg { border-radius: 8px; }
  .font-bold { font-weight: 700; }
  .text-sm { font-size: 14px; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .gap-2 { gap: 8px; }
  .shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .border { border: 1px solid #e5e7eb; }
  .mt-4 { margin-top: 16px; }
  .hover\\:bg-blue-600:hover { background-color: #2563eb; }
</style>

<!-- Button -->
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click me
</button>

<!-- Card -->
<div class="bg-gray-100 p-4 rounded-lg shadow mt-4">
  <div class="font-bold text-blue-600">Tailwind card</div>
  <div class="text-sm">Compose utility classes — no custom CSS needed</div>
</div>

<!-- Badge + Flex layout -->
<div class="flex items-center gap-2 mt-4">
  <span class="bg-green-500 text-white px-2 py-1 rounded text-sm">Active</span>
  <span class="border px-2 py-1 rounded text-sm">Pending</span>
</div>`,
          },
        },
        {
          id: 'p5-3',
          type: 'code',
          language: 'html',
          filename: 'Tailwind responsive & state variants',
          code: `<!-- Responsive prefixes: sm: md: lg: xl: (mobile-first) -->
<div class="w-full md:w-1/2 lg:w-1/3">
  Full width on mobile, 1/2 on tablet, 1/3 on desktop
</div>

<!-- State variants -->
<button class="bg-blue-500 hover:bg-blue-600 focus:ring-2 active:bg-blue-700">
  Hover / focus / active
</button>

<!-- Dark mode -->
<div class="bg-white dark:bg-gray-800 dark:text-white">
  Light/dark adaptive
</div>

<!-- Common utility cheatsheet -->
<!--
Layout: flex grid block inline-flex items-center justify-center gap-4
Spacing: p-4 px-4 py-2 m-4 mt-2 mx-auto space-y-4
Size:    w-full h-screen max-w-7xl w-1/2
Color:   bg-blue-500 text-white border-gray-200
Radius:  rounded rounded-lg rounded-full rounded-xl
Shadow:  shadow shadow-md shadow-lg
Text:    text-sm font-bold text-center truncate
Trans:   transition duration-200 ease-in-out
-->`,
        },
        {
          id: 'p5-4',
          type: 'callout',
          variant: 'tip',
          title: 'Utility-first advantages',
          text: 'No need to name CSS classes, a constrained design system (unified colors/spacing), small CSS footprint (on-demand generation), and clear context (styles visible in HTML). Drawbacks: verbose class names, learning curve, and the need for a team style guide.',
        },
      ],
    },

    // ========================================================================
    // KP 6: Tailwind Custom Theme Configuration
    // ========================================================================
    {
      order: 6,
      title: 'Tailwind Custom Theme Configuration',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          text: 'Customize the theme via tailwind.config.js: extend colors, spacing, fonts, and breakpoints. Tailwind v4 recommends CSS variables for a simpler, more flexible config.',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '// tailwind.config.js',
              'module.exports = {',
              '  // 1. Extend the theme',
              '  theme: {',
              '    extend: {',
              '      colors: {',
              '        primary: "#3b82f6",',
              '        brand: {',
              '          light: "#60a5fa",',
              '          DEFAULT: "#3b82f6",',
              '          dark: "#2563eb",',
              '        },',
              '      },',
              '      spacing: {',
              '        18: "4.5rem",  // 72px',
              '      },',
              '      fontFamily: {',
              '        sans: ["Inter", "sans-serif"],',
              '      },',
              '    },',
              '  },',
              '  // 2. Dark mode strategy',
              '  darkMode: "class",',
              '  // 3. Content scanning (on-demand generation)',
              '  content: [',
              '    "./src/**/*.{js,ts,jsx,tsx}",',
              '  ],',
              '  // 4. Custom plugins',
              '  plugins: [',
              '    require("@tailwindcss/forms"),',
              '  ],',
              '};',
            ],
            language: 'javascript',
            steps: [
              {
                title: 'Extend the theme (extend)',
                description: 'theme.extend appends to the default theme without overwriting existing values. colors.brand.DEFAULT makes bg-brand work; brand.light makes bg-brand-light work.',
                highlightLines: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
              },
              {
                title: 'Custom spacing',
                description: 'spacing affects every spacing utility (p-/m-/gap-/w-/h-). spacing.18 generates p-18, m-18, w-18, and so on.',
                highlightLines: [19, 20, 21, 22],
              },
              {
                title: 'Dark mode strategy',
                description: 'darkMode: "class" toggles dark mode via a .dark class (must be managed manually). "media" follows system preference. "selector" (v3.4+) is similar to class but more flexible.',
                highlightLines: [26],
              },
              {
                title: 'Content scanning (on-demand)',
                description: 'content lists the files to scan; Tailwind only generates the utilities actually used, keeping the bundle small. Make sure to include every file that uses Tailwind classes.',
                highlightLines: [27, 28, 29, 30, 31],
              },
              {
                title: 'Plugin extension',
                description: 'plugins add official or third-party plugins — e.g. @tailwindcss/forms for form styles, @tailwindcss/typography for rich-text styles.',
                highlightLines: [32, 33, 34, 35, 36],
              },
            ],
          },
        },
        {
          id: 'p6-3',
          type: 'code',
          language: 'css',
          filename: 'Tailwind v4 CSS variable config',
          code: `/* Tailwind v4 recommended: CSS variables, no JS config file */
/* src/styles.css */
@import "tailwindcss";

/* Custom theme variables */
@theme {
  --color-primary: #3b82f6;
  --color-brand-light: #60a5fa;
  --color-brand-dark: #2563eb;

  --spacing-18: 4.5rem;

  --font-sans: "Inter", sans-serif;

  --breakpoint-3xl: 1920px;
}

/* Usage: auto-generates bg-primary, text-brand-light, etc. */
/* <button class="bg-primary text-white p-18">v4 config</button> */

/* Dark mode: CSS variable override */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-primary: #60a5fa;
  }
}`,
        },
      ],
    },

    // ========================================================================
    // KP 7: Responsive Breakpoint System
    // ========================================================================
    {
      order: 7,
      title: 'Responsive Breakpoint System',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          text: 'Tailwind uses a mobile-first strategy: default styles target mobile, and sm:/md:/lg:/xl:/2xl: prefixes override for larger screens. Understanding the breakpoint system is the foundation of responsive development.',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Breakpoint',
            columns: ['sm', 'md', 'lg', 'xl', '2xl'],
            rows: [
              { feature: 'Min width', values: ['640px', '768px', '1024px', '1280px', '1536px'] },
              { feature: 'Device', values: ['Large phone', 'Tablet', 'Laptop', 'Desktop', 'Wide screen'] },
              { feature: 'CSS media query', values: ['min-width: 640px', 'min-width: 768px', 'min-width: 1024px', 'min-width: 1280px', 'min-width: 1536px'] },
              { feature: 'Typical layout', values: ['Single column', '2 columns', '3 columns', 'Sidebar + main', 'Wide layout'] },
            ],
          },
        },
        {
          id: 'p7-3',
          type: 'code',
          language: 'html',
          filename: 'Mobile-first responsive',
          code: `<!-- Mobile-first: default mobile, layer up for larger screens -->
<!-- 1 column on mobile → 2 on tablet → 3 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-blue-100 p-4">Card 1</div>
  <div class="bg-blue-100 p-4">Card 2</div>
  <div class="bg-blue-100 p-4">Card 3</div>
</div>

<!-- Hide / show -->
<div class="block md:hidden">Mobile only</div>
<div class="hidden md:block">Tablet and up</div>

<!-- Responsive font size -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">
  Responsive heading
</h1>

<!-- Responsive spacing -->
<main class="px-4 md:px-8 lg:px-16">
  Content area
</main>

<!-- Custom breakpoints (tailwind.config.js) -->
<!--
module.exports = {
  theme: {
    screens: {
      xs: "475px",   // small phone
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      3xl: "1920px", // ultra-wide
    }
  }
}
-->
<div class="grid grid-cols-2 xs:grid-cols-3 3xl:grid-cols-6">
  Custom breakpoints
</div>`,
        },
        {
          id: 'p7-4',
          type: 'callout',
          variant: 'warning',
          title: 'Mobile-first vs Desktop-first',
          text: 'Tailwind defaults to mobile-first (min-width media queries). For desktop-first (max-width), customize the config or use the max-sm:/max-md: prefixes (v3.2+). Keep the strategy consistent within a project.',
        },
      ],
    },

    // ========================================================================
    // KP 8: CSS Modules
    // ========================================================================
    {
      order: 8,
      title: 'CSS Modules',
      difficulty: 2,
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          text: 'CSS Modules add a unique hash to class names at compile time, providing local scope and completely solving naming conflicts. Modern frameworks like Next.js and Vite support them natively.',
        },
        {
          id: 'p8-2',
          type: 'code',
          language: 'tsx',
          filename: 'CSS Modules usage',
          code: `// Button.module.css
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
}
.primary { composes: btn; background: #3b82f6; }
.danger { composes: btn; background: #ef4444; }

// Button.tsx
import styles from './Button.module.css'

export function Button({ variant = 'primary', children }) {
  // styles.primary compiles to Button_primary__a1b2c
  return <button className={styles[variant]}>{children}</button>
}

// composes composes styles (similar to @extend)
// .primary { composes: btn; ... }
// Resulting className="Button_btn__a1b2 Button_primary__d3e4"

// Global class (:global)
:global(.reset) {
  margin: 0;
  padding: 0;
}

// Define a CSS variable (overridable by parent)
.card {
  --card-padding: 16px;
  padding: var(--card-padding);
}
// Parent: <div style={{ '--card-padding': '24px' }}>`,
        },
        {
          id: 'p8-3',
          type: 'list',
          items: [
            'Local scope: class names auto-hashed, no naming conflicts',
            'composes: compose other styles, similar to Sass @extend',
            ':global: define global classes (reset, third-party styles)',
            'CSS variables: dynamically override via the style prop for theming',
            'TypeScript: declare the *.module.css module type',
            'Native support in Vite/Next.js — no extra config',
          ],
        },
        {
          id: 'p8-4',
          type: 'callout',
          variant: 'tip',
          title: 'CSS Modules vs Tailwind',
          text: 'CSS Modules suits scenarios that need semantic class names (complex components, team collaboration). Tailwind suits rapid development and design-system constraints. They can be mixed: Tailwind for layout, CSS Modules for complex components.',
        },
      ],
    },

    // ========================================================================
    // KP 9: CSS-in-JS
    // ========================================================================
    {
      order: 9,
      title: 'CSS-in-JS (styled-components/emotion)',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          text: 'CSS-in-JS writes styles inside JavaScript, supporting dynamic themes, props-driven styles, and auto-prefixing. Representative libraries: styled-components, emotion, Stitches. Runtime solutions have performance overhead; zero-runtime CSS-in-JS (Linaria/vanilla-extract) is the trend.',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Aspect',
            columns: ['styled-components', 'emotion', 'Stitches', 'vanilla-extract'],
            rows: [
              { feature: 'Type', values: ['Runtime', 'Runtime', 'Runtime', 'Zero-Runtime'] },
              { feature: 'API style', values: ['Template literal', 'Template/Object', 'Object', 'Object'] },
              { feature: 'Performance', values: ['Medium', 'Medium', 'Good', 'Excellent (compile time)'] },
              { feature: 'SSR support', values: ['Needs config', 'Good', 'Good', 'Excellent'] },
              { feature: 'TypeScript', values: ['Fair', 'Good', 'Excellent', 'Excellent'] },
              { feature: 'Bundle size', values: ['Large', 'Medium', 'Small', 'Small (on-demand)'] },
              { feature: 'Theming', values: ['ThemeProvider', 'ThemeProvider', 'createTheme', 'createTheme'] },
            ],
            highlightColumn: 3,
          },
        },
        {
          id: 'p9-3',
          type: 'code',
          language: 'tsx',
          filename: 'styled-components and emotion',
          code: `// === styled-components ===
import styled, { css } from 'styled-components'

const Button = styled.button\`
  padding: 8px 16px;
  border-radius: 6px;
  background: \${props => props.variant === 'primary' ? '#3b82f6' : '#6b7280'};
  color: white;

  \${props => props.size === 'lg' && css\`
    padding: 12px 24px;
    font-size: 18px;
  \`}

  &:hover { opacity: 0.9; }
\`

// Theme
const theme = {
  colors: { primary: '#3b82f6', danger: '#ef4444' }
}
<ThemeProvider theme={theme}>
  <Button variant="primary">Button</Button>
</ThemeProvider>

// === emotion ===
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Button = styled.button\`
  background: \${props => props.theme.colors.primary};
\`

// Object syntax (type-safe)
const card = css({
  padding: 16,
  borderRadius: 8,
  background: 'white'
})

// === vanilla-extract (Zero-Runtime) ===
// styles.css.ts
import { style, createTheme } from '@vanilla-extract/css'

export const button = style({
  padding: '8px 16px',
  borderRadius: 6,
  background: 'blue'
})

// Usage
import { button } from './styles.css'
<button className={button}>Button</button>`,
        },
        {
          id: 'p9-4',
          type: 'callout',
          variant: 'warning',
          title: 'React 18 + CSS-in-JS',
          text: 'Runtime CSS-in-JS (styled-components/emotion) has compatibility issues under React 18 concurrent rendering (style injection timing). Migrating to zero-runtime (vanilla-extract/Linaria) or CSS Modules/Tailwind is recommended.',
        },
      ],
    },

    // ========================================================================
    // KP 10: PostCSS Ecosystem
    // ========================================================================
    {
      order: 10,
      title: 'PostCSS Ecosystem (autoprefixer/cssnano)',
      difficulty: 2,
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          text: 'PostCSS is a CSS post-processor that transforms CSS via plugins. autoprefixer adds browser prefixes automatically, cssnano minifies CSS, and postcss-preset-env enables future CSS syntax.',
        },
        {
          id: 'p10-2',
          type: 'code',
          language: 'javascript',
          filename: 'PostCSS config',
          code: `// postcss.config.js
module.exports = {
  plugins: [
    // 1. Auto-add browser prefixes
    require('autoprefixer')({
      overrideBrowserslist: ['> 1%', 'last 2 versions']
    }),

    // 2. Enable future CSS syntax (by stage)
    require('postcss-preset-env')({
      stage: 2,  // 0-4, lower is more stable
      features: {
        'nesting-rules': true,  // native nesting
        'custom-properties': true  // CSS variables
      }
    }),

    // 3. CSS minification (production)
    require('cssnano')({
      preset: 'default'
    })
  ]
}

// === autoprefixer effect ===
// Input:
// .flex { display: flex; user-select: none; }

// Output (per browserslist):
// .flex {
//   display: -webkit-box;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// }

// === Tailwind is built on PostCSS ===
// Tailwind itself is a PostCSS plugin
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}

// === browserslist config ===
// package.json or .browserslistrc
{
  "browserslist": [
    "> 1%",           // global usage > 1%
    "last 2 versions", // last 2 versions of each browser
    "not dead",       // exclude unsupported browsers
    "not ie 11"       // exclude IE 11
  ]
}`,
        },
        {
          id: 'p10-3',
          type: 'list',
          items: [
            'autoprefixer: adds -webkit-/-ms- prefixes based on browserslist',
            'cssnano: minifies CSS (removes comments, whitespace, duplicate rules)',
            'postcss-preset-env: enables future CSS syntax by stage',
            'postcss-import: inlines @import, merges multiple CSS files',
            'postcss-nested: native nesting syntax (Sass-style)',
            'Tailwind itself is a PostCSS plugin — built on the PostCSS ecosystem',
          ],
        },
      ],
    },

    // ========================================================================
    // KP 11: UI Component Library Selection
    // ========================================================================
    {
      order: 11,
      title: 'UI Component Library Selection',
      difficulty: 1,
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          text: 'UI component libraries provide prebuilt components (button/form/dialog) to speed up development. React ecosystem: Ant Design/Material-UI/Chakra UI. Selection should weigh design style, size, customizability, and maintenance activity.',
        },
        {
          id: 'p11-2',
          type: 'code',
          language: 'tsx',
          filename: 'Popular UI libraries',
          code: `// === Ant Design (enterprise-grade, China-friendly) ===
import { Button, Form, Input, Table } from 'antd'
<Button type="primary" size="large">Button</Button>
// Pros: rich components, powerful forms, thorough Chinese docs
// Size: large (supports on-demand import)
// Best for: mid/back-office systems

// === Material-UI (Google design) ===
import { Button, TextField, Card } from '@mui/material'
<Button variant="contained" color="primary">Button</Button>
// Pros: Material Design spec, strong theming
// Size: large (supports Tree-shaking)
// Best for: international projects, Material style

// === Chakra UI (developer-friendly) ===
import { Button, Box, VStack } from '@chakra-ui/react'
<Button colorScheme="blue" size="md">Button</Button>
// Pros: style props (like Tailwind), great a11y
// Size: medium
// Best for: rapid prototyping, SSR projects

// === Radix UI + Tailwind (Headless) ===
import * as Dialog from '@radix-ui/react-dialog'
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content className="bg-white p-4 rounded">
    <Dialog.Title>Title</Dialog.Title>
  </Dialog.Content>
</Dialog.Root>
// Pros: unstyled (Headless), excellent a11y
// Size: small (on-demand)
// Best for: custom design systems, shadcn/ui pattern`,
        },
        {
          id: 'p11-3',
          type: 'list',
          items: [
            'Ant Design: enterprise mid/back-office, rich components, China-friendly',
            'Material-UI: Google Material spec, international projects',
            'Chakra UI: developer-friendly, style props + a11y',
            'Radix UI: Headless components, paired with Tailwind for custom styles',
            'shadcn/ui: based on Radix + Tailwind, copy source into your project',
            'Selection factors: design style, size, customizability, a11y, maintenance activity',
          ],
        },
        {
          id: 'p11-4',
          type: 'callout',
          variant: 'tip',
          title: 'Headless trend',
          text: 'The modern trend is Headless UI (Radix/Headless UI) + Tailwind: only behavior and a11y are provided, styling is fully custom. shadcn/ui mainstreamed this — component source is copied into the project for full control.',
        },
      ],
    },

    // ========================================================================
    // KP 12: CSS Architecture (BEM/ITCSS/SMACSS)
    // ========================================================================
    {
      order: 12,
      title: 'CSS Architecture (BEM/ITCSS/SMACSS)',
      difficulty: 3,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          text: 'Large projects need architectural methodologies for CSS. BEM provides naming conventions, ITCSS layered management, and SMACSS rule categorization. The three can be combined to improve maintainability.',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'CSS architecture methodologies compared',
            layers: [
              {
                name: 'BEM (naming convention)',
                description: 'Block__Element--Modifier',
                components: [
                  { name: 'Block', description: 'independent block (.card)' },
                  { name: 'Element', description: 'part of a block (.card__title)' },
                  { name: 'Modifier', description: 'state variant (.card--highlight)' },
                ],
              },
              {
                name: 'ITCSS (layered management)',
                description: 'from generic to specific, 7-layer inverted triangle',
                components: [
                  { name: 'Settings', description: 'variables, config ($color-primary)' },
                  { name: 'Tools', description: 'Mixin, Function' },
                  { name: 'Generic', description: 'Reset, Normalize' },
                  { name: 'Elements', description: 'HTML element styles (a, button)' },
                  { name: 'Objects', description: 'appearance-free layout patterns (.o-container)' },
                  { name: 'Components', description: 'UI components (.c-card)' },
                  { name: 'Utilities', description: 'utility classes (.u-text-center)' },
                ],
              },
              {
                name: 'SMACSS (rule categorization)',
                description: '5 categories of style rules',
                components: [
                  { name: 'Base', description: 'element default styles (reset)' },
                  { name: 'Layout', description: 'layout structure (.l-header)' },
                  { name: 'Module', description: 'reusable components (.modal)' },
                  { name: 'State', description: 'state classes (.is-active, .is-hidden)' },
                  { name: 'Theme', description: 'theme styles (.theme-dark)' },
                ],
              },
            ],
            flowDirection: 'top-down',
          },
        },
        {
          id: 'p12-3',
          type: 'code',
          language: 'scss',
          filename: 'BEM naming in practice',
          code: `// === BEM naming convention ===
// Block: independent reusable component
.card {
  padding: 16px;
  border-radius: 8px;

  // Element: part of the block (double underscore)
  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  &__body {
    margin-top: 8px;
  }

  &__footer {
    margin-top: 16px;
    text-align: right;
  }

  // Modifier: state variant (double hyphen)
  &--highlight {
    border: 2px solid blue;
  }

  &--compact {
    padding: 8px;

    .card__title { font-size: 14px; }
  }
}

// === ITCSS file organization ===
// styles/
// ├── settings/      variables
// ├── tools/         Mixin/Function
// ├── generic/       Reset
// ├── elements/      element styles
// ├── objects/       layout (.o-container)
// ├── components/    components (.c-card)
// └── utilities/     utility classes (.u-text-center)

// === SMACSS state classes ===
.tab {
  display: inline-block;
  padding: 8px 16px;
}
.tab.is-active {
  background: blue;
  color: white;
}
// JS toggle: element.classList.toggle('is-active')`,
        },
        {
          id: 'p12-4',
          type: 'callout',
          variant: 'tip',
          title: 'Combining methodologies',
          text: 'BEM gives naming, ITCSS gives layering, SMACSS gives categorization. Real projects often combine them: ITCSS layers + BEM naming + SMACSS state classes. With CSS Modules/Tailwind, the methodologies become more of a mental model.',
        },
      ],
    },

    // ========================================================================
    // KP 13: CSS Variables & Theming
    // ========================================================================
    {
      order: 13,
      title: 'CSS Variables & Theming',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          text: 'CSS custom properties (variables) are a major native CSS enhancement. Unlike Sass variables, CSS variables take effect at runtime — themes can be switched dynamically without recompiling.',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'CSS variable theming: toggle light/dark via the data-theme attribute',
            initialCode: `<!-- CSS variable theme switching -->
<style>
  :root {
    --color-bg: #ffffff;
    --color-text: #1f2937;
    --color-primary: #3b82f6;
    --color-border: #e5e7eb;
    --space-md: 16px;
  }

  [data-theme="dark"] {
    --color-bg: #1f2937;
    --color-text: #f3f4f6;
    --color-primary: #60a5fa;
    --color-border: #374151;
  }

  body {
    background: var(--color-bg);
    color: var(--color-text);
    padding: 24px;
    transition: background 0.3s, color 0.3s;
  }

  .card {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: var(--space-md);
    margin-bottom: 16px;
  }

  .btn {
    background: var(--color-primary);
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .toggle {
    margin-bottom: 16px;
  }
</style>

<div class="toggle">
  <button class="btn" onclick="
    const cur = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = cur === 'dark' ? '' : 'dark';
  ">Toggle theme</button>
</div>

<div class="card">
  <h3>CSS variable theme demo</h3>
  <p>Click the button to toggle light/dark. All colors are driven by CSS variables.</p>
</div>`,
          },
        },
        {
          id: 'p13-3',
          type: 'code',
          language: 'css',
          filename: 'CSS variables advanced',
          code: `/* === Define and use === */
:root {
  --color-primary: #3b82f6;
  --spacing: 16px;
  --radius: 8px;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing);
  border-radius: var(--radius);
}

/* === Fallback === */
.button {
  /* If --color-primary is undefined, use #007bff */
  background: var(--color-primary, #007bff);
}

/* === JS manipulation === */
// Read
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary')

// Set
document.documentElement.style.setProperty('--color-primary', '#ef4444')

/* === Responsive variables (different values per breakpoint) === */
:root {
  --container-width: 100%;
}
@media (min-width: 768px) {
  :root {
    --container-width: 720px;
  }
}
@media (min-width: 1024px) {
  :root {
    --container-width: 960px;
  }
}
.container { width: var(--container-width); }

/* === Component-level variables (overridable by parent) === */
.card {
  --card-padding: 16px;  /* default */
  padding: var(--card-padding);
}
/* Parent override */
.hero .card {
  --card-padding: 32px;
}`,
        },
        {
          id: 'p13-4',
          type: 'callout',
          variant: 'tip',
          title: 'CSS variables vs Sass variables',
          text: 'Sass variables are fixed at compile time and cannot change at runtime. CSS variables take effect at runtime and support dynamic theme switching, JS manipulation, and responsive adaptation. Modern theme systems prefer CSS variables; Sass variables are best for compile-time constants.',
        },
      ],
    },

    // ========================================================================
    // KP 14: Container Queries (@container)
    // ========================================================================
    {
      order: 14,
      title: 'Container Queries (@container)',
      difficulty: 3,
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          text: 'Container queries apply styles based on the parent container\u2019s width (not the viewport), enabling true component-level responsiveness. Components can adapt to any placement without depending on viewport breakpoints.',
        },
        {
          id: 'p14-2',
          type: 'code',
          language: 'css',
          filename: '@container usage',
          code: `/* === Basic usage === */
/* 1. Declare a container */
.sidebar {
  container-type: inline-size;
  /* or shorthand: container: sidebar / inline-size; */
}

/* 2. Apply styles based on container width */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

@container (max-width: 399px) {
  .card {
    display: block;
  }
}

/* === Named containers === */
.layout {
  container: layout / inline-size;
}

@container layout (min-width: 768px) {
  .sidebar { width: 250px; }
}

/* === Container query units === */
/* cqw/cqh/cqi/cqb/cqmin/cqmax (1cqw = 1% of container width) */
.title {
  font-size: 5cqi;  /* 5% of container width */
}

/* === Practical: component-level responsive === */
.card-container {
  container-type: inline-size;
}

.card {
  display: flex;
  flex-direction: column;
}

@container (min-width: 500px) {
  .card {
    flex-direction: row;
  }
  .card__image {
    width: 200px;
  }
}

@container (min-width: 800px) {
  .card__title {
    font-size: 24px;
  }
}`,
        },
        {
          id: 'p14-3',
          type: 'callout',
          variant: 'tip',
          title: 'Container queries vs Media queries',
          text: 'Media queries are viewport-based: a component looks the same regardless of where it lives. Container queries are parent-based: a component adapts to available space. Use container queries for reusable components (design systems, card libraries); use media queries for page-level layout.',
        },
        {
          id: 'p14-4',
          type: 'callout',
          variant: 'warning',
          title: 'Browser compatibility',
          text: '@container is supported by all major browsers since 2023. container-type creates a new containing block and formatting context — be aware of its effect on child layout. The size type requires explicit container dimensions.',
        },
      ],
    },

    // ========================================================================
    // KP 15: @layer Cascade Layers
    // ========================================================================
    {
      order: 15,
      title: '@layer Cascade Layers',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          text: '@layer declares cascade layers for explicit control of style priority. A rule in a lower-priority layer is overridden by a rule in a higher-priority layer even if its specificity is higher. It solves the pain of overriding third-party library styles.',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '/* 1. Declare layers (order decides priority; later wins) */',
              '@layer reset, base, components, utilities;',
              '',
              '/* 2. reset layer (lowest priority) */',
              '@layer reset {',
              '  * { margin: 0; padding: 0; box-sizing: border-box; }',
              '  body { font-family: sans-serif; }',
              '}',
              '',
              '/* 3. base layer (element styles) */',
              '@layer base {',
              '  a { color: blue; }',
              '  button { padding: 8px; }',
              '}',
              '',
              '/* 4. components layer (component styles) */',
              '@layer components {',
              '  .btn { background: blue; color: white; }',
              '  .card { border-radius: 8px; }',
              '}',
              '',
              '/* 5. utilities layer (highest priority) */',
              '@layer utilities {',
              '  .hidden { display: none; }',
              '  .text-center { text-align: center; }',
              '}',
              '',
              '/* Unlayered styles have the highest priority */',
              '.emergency { color: red !important; }',
            ],
            language: 'css',
            steps: [
              {
                title: 'Layer declaration order',
                description: '@layer reset, base, components, utilities; — the declaration order decides priority; later layers win. reset is lowest, utilities is highest.',
                highlightLines: [2],
              },
              {
                title: 'reset layer (lowest)',
                description: 'Holds global resets. Even * { margin: 0 } with low specificity stays inside reset and will not override other layers.',
                highlightLines: [5, 6, 7, 8],
              },
              {
                title: 'base layer',
                description: 'Base element styles (a, button). Overrides reset-layer props but is overridden by components.',
                highlightLines: [11, 12, 13, 14, 15],
              },
              {
                title: 'components layer',
                description: 'Component styles (.btn, .card). Higher priority than base — safely override defaults without raising specificity.',
                highlightLines: [18, 19, 20, 21, 22],
              },
              {
                title: 'utilities layer (highest)',
                description: 'Utility classes (.hidden, .text-center). Highest priority — always override components without !important.',
                highlightLines: [25, 26, 27, 28, 29],
              },
              {
                title: 'Unlayered styles',
                description: 'Unlayered styles beat every layer. Useful for hotfixes but avoid heavy use — it breaks the layer model.',
                highlightLines: [32],
              },
            ],
          },
        },
        {
          id: 'p15-3',
          type: 'callout',
          variant: 'tip',
          title: 'What @layer solves',
          text: 'Override third-party library styles without !important or inflated specificity: put the library in a low-priority layer and your styles in a high-priority layer — coverage is natural. Tailwind v4 already adopts the @layer architecture.',
        },
      ],
    },

    // ========================================================================
    // KP 16: CSS Engineering Knowledge Graph
    // ========================================================================
    {
      order: 16,
      title: 'CSS Engineering Knowledge Graph',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS engineering covers preprocessors, atomic frameworks, CSS Modules, CSS-in-JS, PostCSS, architectural methodologies, and modern CSS features. Understanding each approach\u2019s positioning and use case is key to good selection.',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'css-eng', label: 'CSS Engineering', group: 0 },
              { id: 'preprocess', label: 'Preprocessors', group: 1 },
              { id: 'sass', label: 'Sass/Less', group: 1 },
              { id: 'atomic', label: 'Atomic', group: 1 },
              { id: 'tailwind', label: 'Tailwind', group: 1 },
              { id: 'modules', label: 'CSS Modules', group: 1 },
              { id: 'cinjs', label: 'CSS-in-JS', group: 1 },
              { id: 'postcss', label: 'PostCSS', group: 1 },
              { id: 'arch', label: 'CSS Architecture', group: 1 },
              { id: 'bem', label: 'BEM/ITCSS/SMACSS', group: 2 },
              { id: 'modern', label: 'Modern CSS', group: 1 },
              { id: 'container', label: '@container', group: 2 },
              { id: 'layer', label: '@layer', group: 2 },
              { id: 'var', label: 'CSS Variables', group: 2 },
              { id: 'has', label: ':has()', group: 2 },
            ],
            edges: [
              { source: 'css-eng', target: 'preprocess' },
              { source: 'css-eng', target: 'atomic' },
              { source: 'css-eng', target: 'modules' },
              { source: 'css-eng', target: 'cinjs' },
              { source: 'css-eng', target: 'postcss' },
              { source: 'css-eng', target: 'arch' },
              { source: 'css-eng', target: 'modern' },
              { source: 'preprocess', target: 'sass' },
              { source: 'atomic', target: 'tailwind' },
              { source: 'arch', target: 'bem' },
              { source: 'modern', target: 'container' },
              { source: 'modern', target: 'layer' },
              { source: 'modern', target: 'var' },
              { source: 'modern', target: 'has' },
            ],
          },
        },
        {
          id: 'p16-3',
          type: 'list',
          items: [
            'Preprocessors (Sass/Less): variables, nesting, Mixins — compile-time enhancements',
            'Atomic (Tailwind): utility-first, constrains the design system, on-demand generation',
            'CSS Modules: local scope, compile-time hashed class names',
            'CSS-in-JS: styles in JS, dynamic theming, runtime/zero-runtime variants',
            'PostCSS: CSS post-processor — autoprefixer/cssnano/preset-env',
            'CSS architecture: BEM naming, ITCSS layering, SMACSS categorization',
            'Modern CSS: container queries @container, @layer cascade layers, CSS variables',
            'UI libraries: Ant Design/MUI/Chakra/Radix (Headless)',
          ],
        },
        {
          id: 'p16-4',
          type: 'callout',
          variant: 'tip',
          title: 'Selection decision tree',
          text: 'Small project → native CSS; mid/back-office → Ant Design + CSS Modules; rapid prototype → Tailwind + Chakra; design system → Radix + Tailwind (shadcn/ui); highly dynamic theming → CSS variables + zero-runtime CSS-in-JS.',
        },
        {
          id: 'p16-5',
          type: 'callout',
          variant: 'info',
          title: 'Modern trends',
          text: 'Native CSS capabilities (container queries, @layer, :has(), CSS variables) are reducing reliance on preprocessors. Tailwind + Headless UI + CSS variables is the mainstream combo, balancing dev efficiency, performance, and accessibility.',
        },
      ],
    },

    // ========================================================================
    // Knowledge Point 17: Comprehensive Practice - BEM Card Refactor
    // ========================================================================
    {
      order: 17,
      title: 'Comprehensive Practice: Refactoring Card Component with BEM Naming',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: 'BEM (Block__Element--Modifier) is the most foundational naming convention in CSS engineering. This practice ties together BEM naming, CSS variable theming, and modifier reuse to build a reusable, themeable card component — moving from "works" to "maintainable".',
        },
        {
          id: 'p17-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'Naming collisions are the number-one pain point in CSS engineering. BEM uses Block__Element--Modifier to explicitly express hierarchy and state, making class names self-documenting, conflict-free, and easy to reuse. Mastering BEM is a prerequisite for understanding the value of CSS Modules\' automatic hashing, and is the lowest common denominator for team collaboration.',
        },
        {
          id: 'p17-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Implement a BEM card in the skeleton below: .card block, .card__title/.card__body elements, .card--featured modifier, with CSS variables for theming.',
            initialCode: `<!-- Comprehensive practice: BEM card refactor -->
<!-- Goal: refactor the card with BEM, support featured modifier + CSS variable theming -->

<style>
  :root {
    /* TODO: define theme variables like --card-bg / --card-border / --card-accent */
  }

  /* TODO: .card block styles (padding, border, radius, background) */
  /* TODO: .card__title element styles */
  /* TODO: .card__body element styles */
  /* TODO: .card--featured modifier (override accent color, add shadow) */
</style>

<!-- TODO: render two cards, one normal and one with the card--featured modifier -->
<!-- <article class="card">...</article> -->
<!-- <article class="card card--featured">...</article> -->
`,
            checks: [
              {
                description: 'Define .card block styles',
                pattern: '\\.card\\s*\\{',
                hint: 'A BEM Block is an independent reusable unit. Define .card { ... } as the container styles (padding/border/radius/background).',
              },
              {
                description: 'Use __ to name elements (card__title / card__body)',
                pattern: 'card__title|card__body',
                hint: 'BEM elements use Block__Element naming, e.g. .card__title, .card__body — they represent sub-parts of a block and cannot be used standalone.',
              },
              {
                description: 'Use -- to name modifiers (card--featured)',
                pattern: 'card--featured',
                hint: 'BEM modifiers use Block--Modifier naming, e.g. .card--featured represents a "featured" variant of the card, overriding block styles (color, shadow, etc.).',
              },
              {
                description: 'Use CSS variables for theme colors',
                pattern: '--[a-z-]+\\s*:',
                hint: 'Define variables like --card-bg, --card-border, --card-accent in :root, and reference them with var() in style blocks for easy theme switching.',
              },
              {
                description: 'Override theme variables via var() in the modifier',
                pattern: 'card--featured[\\s\\S]*--card-accent|--accent',
                hint: '.card--featured should override --card-accent (and similar) variables rather than hardcoding colors, so the modifier follows the theme system.',
              },
              {
                description: 'Combine BEM class names correctly in HTML',
                pattern: 'class="card[\\s"\\S]*card--featured',
                hint: 'In HTML, the modifier must appear together with the block name: class="card card--featured" (a modifier cannot be used without its block).',
              },
            ],
          },
        },
        {
          id: 'p17-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection: the limits of BEM',
          text: 'BEM resolves naming collisions but relies on manual compliance; deep nesting (.block__element1__element2) is an anti-pattern. Modern projects replace hand-written BEM with CSS Modules\' automatic hashing (compile-time uniqueness) or Tailwind\'s atomic classes (no naming). Still, understanding BEM remains the foundation for team conventions and design-system naming, and it is fully compatible with CSS variables and CSS Modules.',
        },
      ],
    },

    // ========================================================================
    // Knowledge Point 18: Comprehensive Practice - Tailwind Responsive Navbar
    // ========================================================================
    {
      order: 18,
      title: 'Comprehensive Practice: Building a Responsive Navbar with Tailwind',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: 'Tailwind is currently the most popular atomic CSS solution. This practice ties together mobile-first responsive breakpoints (sm/md/lg), flexbox layout, hover/dark variants, and the color system to build a navbar that expands on desktop and collapses on mobile.',
        },
        {
          id: 'p18-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'Responsiveness is a front-end must-have, and Tailwind\'s mobile-first breakpoints (sm/md/lg/xl) are its core productivity feature. Writing one by hand clarifies "how breakpoint prefixes work", "dark-mode strategy", and "flex layout composition" — the key step from "knowing class names" to "designing responsive systems". In production, Tailwind + Headless UI is the foundation of mainstream stacks like shadcn/ui.',
        },
        {
          id: 'p18-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Implement a responsive navbar in the skeleton below: collapsed vertically by default (mobile), expanded horizontally at md: and above, with hover and dark variants.',
            initialCode: `<!-- Comprehensive practice: Tailwind responsive navbar -->
<!-- Goal: vertical collapse on mobile, horizontal expand at md:, dark-mode support -->

<nav class="...">
  <!-- TODO: Logo area -->
  <!-- TODO: nav link list (default vertical flex-col, horizontal md:flex-row at md:) -->
  <!-- TODO: link hover variant (hover:text-blue-500) -->
  <!-- TODO: dark mode variant (dark:text-gray-200) -->
</nav>
`,
            checks: [
              {
                description: 'Use mobile-first responsive breakpoint md:',
                pattern: 'md:',
                hint: 'Tailwind is mobile-first: default styles target the smallest screen, and the md: prefix (min-width: 768px) targets tablets and above. You should see breakpoint classes like md:flex-row or md:flex.',
              },
              {
                description: 'Default styles target mobile (vertical layout)',
                pattern: 'flex-col|flex\\s+flex-col',
                hint: 'The default (no breakpoint prefix) should be a vertical layout for mobile: class includes flex flex-col; desktop overrides it with md:flex-row for horizontal.',
              },
              {
                description: 'Use hover variant for interactive feedback',
                pattern: 'hover:',
                hint: 'Nav links should have hover feedback like hover:text-xxx or hover:bg-xxx; Tailwind implements this with the hover: prefix.',
              },
              {
                description: 'Use dark variant for dark mode support',
                pattern: 'dark:',
                hint: 'Include dark-mode classes like dark:bg-xxx / dark:text-xxx, combined with the Tailwind config darkMode:"class" strategy for switching.',
              },
              {
                description: 'Use flex layout composition',
                pattern: 'flex\\s|items-center|justify-between',
                hint: 'Navbar layout uses flex + items-center + justify-between: logo and links are aligned at both ends and vertically centered.',
              },
              {
                description: 'Use semantic tags for nav links',
                pattern: '<a\\s|<nav',
                hint: 'Wrap navigation in <nav> and use <a> tags (not divs) for links to ensure accessibility and SEO.',
              },
            ],
          },
        },
        {
          id: 'p18-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection: trade-offs of atomic CSS',
          text: 'Tailwind\'s verbose class names (class="flex items-center...") are the main criticism, but thanks to its constrained design system (fixed colors/spacing/font sizes) it actually improves consistency. Production tip: extract complex components via @apply or wrap them (e.g. shadcn/ui) to avoid repeated class names; for dark mode, the class strategy (manual toggle) is recommended over the media strategy (follows the system) so users can choose.',
        },
      ],
    },

    // ========================================================================
    // Knowledge Point 19: Interview Questions
    // ========================================================================
    {
      order: 19,
      title: 'Interview Questions',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          text: 'High-frequency CSS engineering interview topics: preprocessors, atomic CSS, CSS Modules, CSS-in-JS, CSS architecture, and modern CSS features. Understanding the positioning and trade-offs of each approach matters more than memorizing conclusions.',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            title: 'High-Frequency Interview Questions (with Scenario / Comparison questions)',
            items: [
              {
                title: 'Q1: The evolution of CSS styling approaches and the core problem each stage solves',
                content:
                  'The evolution of CSS styling approaches is essentially about solving the previous stage\'s pain points.\n\n' +
                  '1. Native CSS: separated style from structure, but lacked variables and reuse mechanisms.\n' +
                  '2. Preprocessors (Sass/Less): introduced variables, nesting, and Mixins, enhancing expressiveness at compile time.\n' +
                  '3. Naming conventions (BEM): solved naming collisions by convention, but relied on manual compliance.\n' +
                  '4. CSS Modules: compile-time automatic class-name hashing, eliminating naming collisions entirely.\n' +
                  '5. CSS-in-JS: couples styles with components, supports dynamic theming, but brings runtime overhead.\n' +
                  '6. Atomic CSS (Tailwind): utility-first, constrains the design system, generates on demand.\n' +
                  '7. Modern CSS (@container, @layer, CSS variables): native capability enhancements, reducing reliance on tooling.\n\n' +
                  'Conclusion: each stage makes up for the previous one\'s shortcomings; understanding this thread matters more than memorizing conclusions.',
              },
              {
                title: 'Q2: Differences between Sass variables and CSS variables',
                content:
                  'The two have different positioning and are not a replacement for each other.\n\n' +
                  'Sass variables:\n' +
                  '- Determined at compile time as static values; disappear after compilation (become literal values);\n' +
                  '- Cannot be modified at runtime;\n' +
                  '- Support multiple data types: colors, numbers, lists, maps;\n' +
                  '- Scope is split into global and local (block-level).\n\n' +
                  'CSS variables:\n' +
                  '- Custom properties that take effect at runtime;\n' +
                  '- Can be manipulated by JS (getPropertyValue / setProperty), media queries, or parent overrides;\n' +
                  '- Inherit down the DOM tree;\n' +
                  '- Support fallback: var(--x, fallback).\n\n' +
                  'Selection: use CSS variables for runtime theme switching; use Sass variables for complex compile-time computation (loops, functions). Modern projects usually use CSS variables for themes and Sass variables for compile-time constants.',
              },
              {
                title: 'Q3: Differences between @mixin and @extend, and how to choose',
                content:
                  'Both reuse styles, but their mechanism and output differ.\n\n' +
                  '@mixin: reuses style blocks, supports parameters, outputs to every usage site (duplicated output, slightly larger size).\n' +
                  '@extend: inherits selectors, generating grouped selectors (.a, .b share styles) without duplication, but may cause selector explosion.\n\n' +
                  'Selection principles:\n' +
                  '- Use Mixin when parameters are needed, e.g. @include button-variant($color);\n' +
                  '- Use extend for pure shared styles with controllable selectors;\n' +
                  '- Prefer Mixin in complex scenarios or when selector explosion is a concern.\n\n' +
                  'Trend: Dart Sass has de-emphasized @extend; the community leans toward Mixin + placeholder classes.',
              },
              {
                title: 'Q4: Tailwind\'s core philosophy and applicable scenarios',
                content:
                  'Core philosophy: Utility-first. Tailwind provides atomic utility classes like bg-blue-500, p-4, flex that you compose directly in HTML without writing custom CSS.\n\n' +
                  'Advantages:\n' +
                  '1. Constrains the design system (unified colors, spacing, font sizes);\n' +
                  '2. On-demand generation (PurgeCSS removes unused classes, small bundle);\n' +
                  '3. No naming collisions;\n' +
                  '4. Easy theme switching and dark mode.\n\n' +
                  'Disadvantages: verbose class names, learning curve, reduced HTML readability.\n\n' +
                  'Applicable: mid/back-office, rapid prototypes, projects with strong design-system constraints.\n' +
                  'Not applicable: highly custom visuals, strong semantic-class requirements, teams resistant to atomic CSS.',
              },
              {
                title: 'Q5: Tailwind\'s responsive breakpoint mechanism',
                content:
                  'Tailwind adopts a mobile-first strategy: default styles target the smallest screen, and breakpoint prefixes upgrade for min-width.\n\n' +
                  'Default breakpoints:\n' +
                  '- sm = 640px\n' +
                  '- md = 768px\n' +
                  '- lg = 1024px\n' +
                  '- xl = 1280px\n' +
                  '- 2xl = 1536px\n\n' +
                  'Example: class="flex-col md:flex-row" means vertical on mobile, horizontal at md and above.\n\n' +
                  'Customization: override in tailwind.config.js theme.screens.\n' +
                  'Note: max-* prefixes (e.g. max-md:) target max-width, a desktop-first approach rarely used in modern projects.',
              },
              {
                title: 'Q6: How CSS Modules work',
                content:
                  'CSS Modules add a unique hash to class names at compile time (e.g. .btn → .Button_btn__a1b2c), implementing local scope and completely solving naming collisions.\n\n' +
                  'File naming convention: *.module.css.\n' +
                  'Compiled output: class names are replaced with hashed forms; CSS and JS each maintain a mapping.\n\n' +
                  'Core capabilities:\n' +
                  '- composes: btn can reuse other styles (similar to @extend);\n' +
                  '- :global(.reset) can define global class names.\n\n' +
                  'Toolchain: Vite/Next.js support it natively; TypeScript needs *.module.css module type declarations.\n\n' +
                  'Advantages: compile-time uniqueness, zero runtime, decoupled from frameworks.\n' +
                  'Disadvantages: weaker cross-component reuse (needs composes or CSS variables).',
              },
              {
                title: 'Q7: Runtime vs zero-runtime CSS-in-JS comparison',
                content:
                  'Both write styles into JS, but the execution timing and cost differ.\n\n' +
                  'Runtime (styled-components, emotion):\n' +
                  '- Dynamically generates class names and style sheets in the browser;\n' +
                  '- Supports fully dynamic themes (props-driven);\n' +
                  '- Cost: runtime overhead ~10–30KB, SSR is more complex (needs style-sheet extraction).\n\n' +
                  'Zero-runtime (Vanilla Extract, Linaria, Panda CSS):\n' +
                  '- Generates static CSS at compile time, no runtime overhead;\n' +
                  '- Dynamic themes are limited (must use CSS variables to pass values).\n\n' +
                  'Trend: under React 18 concurrent rendering, runtime solutions are criticized for hook-call-order issues; the community is shifting to zero-runtime or Tailwind.\n\n' +
                  'Selection: use zero-runtime for SSR or performance-sensitive scenarios; runtime is acceptable for fully dynamic styles but evaluate carefully.',
              },
              {
                title: 'Q8: PostCSS\'s role and typical plugins',
                content:
                  'PostCSS is a CSS post-processor (not a preprocessor) that uses JS plugins to transform the CSS AST.\n\n' +
                  'Typical plugins:\n' +
                  '- autoprefixer: automatically adds browser prefixes;\n' +
                  '- cssnano: minifies CSS;\n' +
                  '- postcss-preset-env: uses future CSS syntax and automatically downgrades;\n' +
                  '- tailwindcss: Tailwind itself is a PostCSS plugin;\n' +
                  '- postcss-modules: implements CSS Modules.\n\n' +
                  'Difference from Sass: Sass enhances syntax (variables, nesting, Mixins); PostCSS transforms existing CSS (prefixes, downgrades, optimization).\n\n' +
                  'Status: PostCSS is a de-facto standard in modern projects; Tailwind and autoprefixer are both built on it. Configured in postcss.config.js.',
              },
              {
                title: 'Q9: BEM naming syntax, pros and cons',
                content:
                  'Syntax: Block__Element--Modifier.\n\n' +
                  '- Block: independent reusable unit, e.g. .card;\n' +
                  '- Element: a sub-part of a block, e.g. .card__title;\n' +
                  '- Modifier: a state variant of a block or element, e.g. .card--featured, .card__title--large.\n\n' +
                  'Note: in HTML the modifier must appear together with the block name, e.g. class="card card--featured".\n\n' +
                  'Advantages: self-documenting class names, zero naming collisions, expresses hierarchy and state, easy to reuse.\n' +
                  'Disadvantages: verbose class names; deep nesting is an anti-pattern (.block__e1__e2 is wrong); relies on manual compliance.\n\n' +
                  'Modern alternatives: CSS Modules automatic hashing, Tailwind atomic classes (no naming). But BEM remains the foundation for team conventions and design-system naming.',
              },
              {
                title: 'Q10: The layering philosophy of ITCSS and SMACSS',
                content:
                  'Both organize large-project styles with the idea of "layering + constrained dependency direction".\n\n' +
                  'ITCSS (Inverted Triangle CSS), 7 layers from generic to specific:\n' +
                  '1. Settings/Tokens: variables;\n' +
                  '2. Tools: Mixin/Function;\n' +
                  '3. Generic: reset/normalize;\n' +
                  '4. Elements: tag styles;\n' +
                  '5. Objects: non-visual layout classes;\n' +
                  '6. Components: component styles;\n' +
                  '7. Utilities: utility classes.\n' +
                  'Rule: lower layers may use upper layers, not the reverse.\n\n' +
                  'SMACSS (Scalable Modular CSS), 5 categories:\n' +
                  'Base (tag styles), Layout (layout), Module (components), State (state classes .is-active), Theme (themes).\n\n' +
                  'Modern evolution: with CSS Modules/Tailwind, the layering idea mainly lives in the tokens layer (CSS variables) and the component layer.',
              },
              {
                title: 'Q11: Differences between container queries @container and media queries @media',
                content:
                  '@media is based on viewport width; components behave the same in different positions (cannot sense the container), suitable for page-level responsiveness.\n' +
                  '@container is based on the parent container width; components adapt to available space, suitable for reusable components.\n\n' +
                  'Usage:\n' +
                  '1. Parent declares container-type: inline-size;\n' +
                  '2. Child uses @container (min-width: 400px) { ... }.\n\n' +
                  'Advantages: component-level responsiveness, truly decouples components from page layout.\n' +
                  'Disadvantages: newer compatibility (mainstream browsers since 2023); older projects need a polyfill.\n\n' +
                  'Selection: use container queries for reusable components (cards, sidebars, tables); use media queries for overall page layout.',
              },
              {
                title: 'Q12: The role and usage of @layer cascade layers',
                content:
                  '@layer declares cascade layers to explicitly control style priority. Declaration order determines priority: layers declared later have higher priority.\n\n' +
                  'Example: in @layer reset, base, components, utilities; the utilities layer has the highest priority, overriding other layers even with lower specificity.\n\n' +
                  'Main uses:\n' +
                  '1. Override third-party library styles without !important;\n' +
                  '2. Organize style architecture (reset/base/components/utilities);\n' +
                  '3. Solve style-override problems.\n\n' +
                  'Note: styles not declared in any layer have higher priority than all layers ("unlayered styles" are strongest).\n\n' +
                  'Compatibility: supported by mainstream browsers since 2022. Prefer @layer over !important when overriding third-party styles.',
              },
              {
                title: 'Q13: How CSS variables implement theme switching',
                content:
                  'Principle: CSS variables (custom properties) take effect at runtime and can be manipulated by JS and overridden by selectors.\n\n' +
                  'Steps:\n' +
                  '1. Define default variables in :root (--color-bg, --color-text, etc.);\n' +
                  '2. Override variable values with [data-theme="dark"] or .dark selectors;\n' +
                  '3. Reference variables with var() in styles.\n\n' +
                  'Switching: JS sets document.documentElement.dataset.theme = "dark", or classList.toggle("dark").\n\n' +
                  'Advantages: zero runtime overhead (pure CSS), instant switching, SSR-friendly, works with Tailwind\'s dark: variant.\n\n' +
                  'Note: variables inherit the DOM tree; component-level variables can be overridden by parents (e.g. .hero { --card-padding: 32px }); the fallback syntax var(--x, #fff) guards against undefined variables.',
              },
              {
                title: 'Q14: CSS scoping and style isolation approaches',
                content:
                  'Five common approaches, each with different isolation strength and use cases.\n\n' +
                  '1. Shadow DOM: native Web Components isolation; styles and subtree are fully encapsulated (cannot be penetrated except via ::part).\n' +
                  '2. CSS Modules: compile-time hashed class names; logical isolation (still a global style sheet, but class names are unique).\n' +
                  '3. CSS-in-JS: runtime-generated unique class names (styled-components) or scoped containers (emotion css={...}).\n' +
                  '4. @scope (new): native CSS scoping; @scope (.card) { ... } limits the scope.\n' +
                  '5. iframe: physical isolation, but communication and style injection are complex.\n\n' +
                  'Selection: Shadow DOM for Web Components; CSS Modules or CSS-in-JS for React components; @scope for style-isolation experiments (newer compatibility).',
              },
              {
                title: 'Q15: CSS performance optimization approaches',
                content:
                  'Four dimensions: selectors, reflow/repaint, size, and loading.\n\n' +
                  '1. Reduce selector complexity: avoid deep nesting (.a .b .c .d), universal selectors (*), and excessive attribute selectors.\n' +
                  '2. Reduce reflow/repaint: use transform/opacity instead of top/left/width (triggers compositing instead of reflow); batch style changes via class toggles; take elements out of flow (display:none) before operating.\n' +
                  '3. Reduce stylesheet size: PurgeCSS/Tailwind on-demand generation removes unused classes; cssnano minification; replace @import with <link> (avoids serial loading).\n' +
                  '4. Inline critical CSS: above-the-fold styles inline in <head>; non-critical CSS loaded asynchronously.\n' +
                  '5. CSS containment: contain: layout paint isolates reflow scope.\n' +
                  '6. Use will-change sparingly to hint the browser (do not abuse).',
              },
              {
                title: 'Q16: The role and pitfalls of will-change',
                content:
                  'will-change: transform hints the browser that an element is about to change, enabling ahead-of-time optimization (creating a compositing layer, pre-allocating resources); commonly used on animated or dragged elements to improve smoothness.\n\n' +
                  'Common pitfalls:\n' +
                  '1. Abuse causes memory blow-up (every will-change element creates a compositing layer);\n' +
                  '2. Keeping will-change long-term wastes resources (remove it after the change ends);\n' +
                  '3. No need for will-change when already animating with transform (the browser already optimizes).\n\n' +
                  'Correct usage: set it right before the animation starts (e.g. on hover) and remove it after; or set it long-term only on frequently animated elements.\n\n' +
                  'Alternative: CSS containment (contain) isolates reflow scope and is lighter-weight.',
              },
              {
                title: 'Q17: CSS Houdini capabilities and limitations',
                content:
                  'CSS Houdini lets JS directly manipulate the CSS engine, extending CSS capabilities.\n\n' +
                  'Main APIs:\n' +
                  '1. Paint API: custom painting, e.g. bubble arrows, complex backgrounds;\n' +
                  '2. Layout API: custom layouts, e.g. masonry waterfall;\n' +
                  '3. Properties & Values API: register custom property types, e.g. @property --angle { syntax: "<angle>"; ... } lets variables participate in animations;\n' +
                  '4. Worklet: runs custom rendering logic in a separate thread.\n\n' +
                  'Advantages: breaks through native CSS limits, excellent performance (separate thread).\n' +
                  'Limitations: poor compatibility (Chrome is good; Safari/Firefox partial), rarely used in production.\n\n' +
                  'Practical subset: @property is the most useful part, already used in advanced animations (e.g. gradient-angle animation).',
              },
              {
                title: 'Q18: The role and use cases of the :has() selector',
                content:
                  ':has() is a "relational selector" (often called the parent selector) that lets CSS select a parent based on child state.\n\n' +
                  'Examples:\n' +
                  '- .card:has(img) selects .card that contains an img;\n' +
                  '- .form:has(input:invalid) highlights a form with invalid input.\n\n' +
                  'Typical scenarios:\n' +
                  '1. Style a parent based on child state (previously required JS);\n' +
                  '2. Implement complex conditional styles (e.g. "a p whose previous sibling is an h1 gets margin").\n\n' +
                  'Compatibility: supported by mainstream browsers since 2023.\n' +
                  'Note: use cautiously in performance-sensitive scenarios (requires backtracking checks), but browsers have optimized it. :has() is the biggest enhancement to CSS selectors in recent years and can replace a lot of JS interaction logic.',
              },
              {
                title: 'Q19: CSS debugging techniques',
                content:
                  'Using DevTools panels well greatly improves troubleshooting efficiency.\n\n' +
                  '1. Elements panel: edit styles live, view computed values (Computed), visualize the box model.\n' +
                  '2. Pseudo-class debugging: click :hov in the Styles panel to trigger :hover/:focus without real interaction.\n' +
                  '3. Selector specificity: the Styles panel shows overridden rules (struck through) to diagnose why styles don\'t apply.\n' +
                  '4. Cascade-layer debugging: @layer order affects priority; use the Layers panel to inspect.\n' +
                  '5. Unapplied-style diagnosis: check selector spelling, specificity, layer order, !important abuse, CSS Modules hashing, Tailwind class spelling.\n' +
                  '6. Performance: the Performance panel shows Layout/Recalculate Style time, locating reflow/repaint hotspots.\n' +
                  '7. CSS Overview panel: aggregates colors, font sizes, contrast to find design-system inconsistencies.',
              },
              {
                title: 'Q20: CSS style override priority rules',
                content:
                  'Priority from low to high: browser default styles → user styles (browser settings) → author styles (developer CSS).\n\n' +
                  'Rules within author styles:\n' +
                  '1. !important takes precedence over normal rules;\n' +
                  '2. Cascade layers (@layer): unlayered > later-declared layer > earlier-declared layer;\n' +
                  '3. Specificity: inline style > ID > class/attribute/pseudo-class > element/pseudo-element (compute a,b,c,d);\n' +
                  '4. Source order: later rules override earlier ones.\n\n' +
                  'Notes:\n' +
                  '- !important disrupts normal cascading; prefer @layer or adjusting specificity;\n' +
                  '- CSS Modules hashing doesn\'t affect specificity (still a class selector);\n' +
                  '- Inline style can be overridden by !important but not by normal rules.',
              },
              {
                title: 'Q21: CSS loading and render blocking',
                content:
                  'CSS is a render-blocking resource: the browser waits for the CSSOM to be built before rendering, to avoid FOUC (flash of unstyled content).\n\n' +
                  'Optimization techniques:\n' +
                  '1. Inline critical CSS into <head> (above-the-fold styles);\n' +
                  '2. Load non-critical CSS asynchronously (media="print" onload="this.media=\'all\'" or preload);\n' +
                  '3. Reduce CSS size (PurgeCSS, minification);\n' +
                  '4. Avoid @import (serial loading; use <link> for parallel loading);\n' +
                  '5. preload critical CSS (<link rel="preload" as="style">).\n\n' +
                  'Note: JS execution waits for the CSSOM (because JS may read styles), so CSS blocking rendering also indirectly blocks JS. SSR projects especially must control above-the-fold CSS size.',
              },
              {
                title: 'Q22: The relationship between CSS and SEO/accessibility',
                content:
                  'CSS engineering should front-load SEO and accessibility standards into design tokens.\n\n' +
                  'SEO:\n' +
                  '1. Semantic tags (<nav>, <main>, <article>) beat div + class, helping search engines understand structure;\n' +
                  '2. Hide content with .visually-hidden (clip/position) instead of display:none (the latter is not indexed);\n' +
                  '3. Place critical content early in the DOM (CSS positioning adjusts visual order without affecting DOM order).\n\n' +
                  'Accessibility:\n' +
                  '1. Color contrast (WCAG AA: text 4.5:1, large text 3:1);\n' +
                  '2. :focus-visible shows focus outline (don\'t outline:none without a replacement);\n' +
                  '3. Respect prefers-reduced-motion for animations;\n' +
                  '4. Mind contrast in dark mode.',
              },
              {
                title: 'Q23: CSS implementation approaches for design systems',
                content:
                  'A Design System includes tokens, components, and guidelines; the core of its CSS implementation is the tokens layer.\n\n' +
                  'Tokens approaches:\n' +
                  '1. CSS variables as tokens (--color-primary, --space-md, --radius), switchable at runtime;\n' +
                  '2. Sass/Less variables as compile-time tokens (colors, font sizes), static after compilation;\n' +
                  '3. Tailwind config as tokens (theme.extend.colors/spacing), constraining the design system;\n' +
                  '4. Style Dictionary for cross-platform tokens (shared across Web/iOS/Android).\n\n' +
                  'Component layer: CSS Modules, CSS-in-JS, or Tailwind component classes.\n\n' +
                  'Modern mainstream combo: CSS variables for theme tokens + Tailwind for utility classes + shadcn/ui for the component layer (based on Radix Headless + Tailwind).',
              },
              {
                title: 'Q24: Tailwind\'s @apply directive',
                content:
                  '@apply reuses Tailwind utility classes inside CSS, e.g.:\n' +
                  '.btn { @apply bg-blue-500 text-white p-4 rounded; }\n\n' +
                  'Main uses:\n' +
                  '1. Extract repeated utility-class combinations into semantic class names (component classes);\n' +
                  '2. Apply Tailwind inside third-party library styles;\n' +
                  '3. Combine with CSS variables for themeable components.\n\n' +
                  'Controversy: overusing @apply loses Tailwind\'s "no naming" advantage, regressing to traditional semantic class names.\n\n' +
                  'Community advice: simple combinations may use @apply; for complex logic, write utility classes directly. @apply fits the component-encapsulation layer (e.g. .btn-primary), not business pages.\n\n' +
                  'Note: @apply cannot apply special directives like @screen or @variant; Tailwind v4 adjusted @apply semantics.',
              },
              {
                title: 'Q25: CSS Modules composes usage',
                content:
                  'composes reuses other class styles, similar to Sass @extend, but scoped to the module.\n\n' +
                  'Usage:\n' +
                  '1. Same file: .primary { composes: btn; background: blue; }\n' +
                  '2. Cross-file: composes: btn from "./button.module.css";\n\n' +
                  'Compiled class-name combination: class="Button_btn__a1b2 Button_primary__d3e4", styles stack.\n\n' +
                  'Advantages: compile-time uniqueness, no runtime, decoupled from frameworks.\n\n' +
                  'Comparison:\n' +
                  '- vs @extend: composes is module-scoped (not cross-file unless explicit import); @extend is global (prone to selector explosion);\n' +
                  '- vs Tailwind: composes keeps semantic class names; Tailwind is atomic classes with no naming.',
              },
              {
                title: 'Q26 【Scenario】: Migrating an old project from Sass to Tailwind — how to assess and execute',
                content:
                  'First assess feasibility, then migrate gradually.\n\n' +
                  'Assessment:\n' +
                  '1. Project size and team familiarity (team resistance leads to failure);\n' +
                  '2. Whether the existing design system is constrained (free-form Sass colors are hard to migrate);\n' +
                  '3. Component reuse level (high reuse suits Tailwind\'s constraints).\n\n' +
                  'Execution steps:\n' +
                  '1. Migrate gradually, avoid a big-bang rewrite (new pages use Tailwind; old pages keep Sass);\n' +
                  '2. Configure tailwind.config.js to map existing design tokens (map colors to Sass variable values);\n' +
                  '3. Extract repeated utility-class combinations into component classes (@apply);\n' +
                  '4. Use PurgeCSS to remove unused styles from old Sass files;\n' +
                  '5. Team training and code review.\n\n' +
                  'Risks: verbose class names reduce readability, design-system drift, compatibility with CSS Modules (mixing).\n' +
                  'Rollback plan: keep Sass; use Tailwind only for new projects.',
              },
              {
                title: 'Q27 【Scenario】: Above-the-fold LCP is slow, traced to CSS blocking — how to optimize',
                content:
                  'First troubleshoot and locate, then optimize in a targeted way.\n\n' +
                  'Troubleshooting:\n' +
                  '1. DevTools Network: check CSS loading order and size;\n' +
                  '2. Performance: check render-blocking time (CSSOM build time);\n' +
                  '3. Lighthouse: check the LCP element and blocking resources.\n\n' +
                  'Optimization:\n' +
                  '1. Inline critical CSS (above-the-fold styles) into <head> <style>, removing the block;\n' +
                  '2. Load non-critical CSS asynchronously (media="print" onload, preload);\n' +
                  '3. Minify CSS (cssnano), remove unused styles (PurgeCSS);\n' +
                  '4. Avoid @import (serial loading; use <link> for parallel);\n' +
                  '5. Split CSS by route;\n' +
                  '6. preload critical CSS (<link rel="preload" as="style">);\n' +
                  '7. Reduce selector complexity to speed up CSSOM parsing.\n\n' +
                  'Verify: Lighthouse LCP < 2.5s; Coverage tool shows unused-CSS ratio.',
              },
              {
                title: 'Q28 【Comparison】: CSS Modules vs CSS-in-JS',
                content:
                  'Both achieve style isolation, but with different mechanisms and costs.\n\n' +
                  'CSS Modules:\n' +
                  '- Compile-time hashed class names, zero runtime;\n' +
                  '- Decoupled from frameworks (Vue/React/native all supported), SSR-friendly;\n' +
                  '- Disadvantage: dynamic themes need CSS variables; weaker cross-component reuse (composes).\n\n' +
                  'CSS-in-JS:\n' +
                  '- Splits into runtime (styled-components) and zero-runtime (Vanilla Extract);\n' +
                  '- Couples styles with components, supports fully dynamic themes (props-driven), TypeScript type-safe;\n' +
                  '- Disadvantage: runtime solutions have performance overhead and SSR complexity; criticized under React 18 concurrent rendering.\n\n' +
                  'Selection: use CSS Modules for SSR/performance-sensitive scenarios; use zero-runtime CSS-in-JS for fully dynamic styles (e.g. color changes via props); either works for static projects, but CSS Modules are lighter.',
              },
              {
                title: 'Q29 【Comparison】: Tailwind vs traditional BEM + Sass',
                content:
                  'The two represent different styling philosophies.\n\n' +
                  'Tailwind:\n' +
                  '- Atomic classes with no naming, constrains the design system, on-demand generation with small size, convenient mobile-first responsiveness;\n' +
                  '- Disadvantage: verbose class names, poor HTML readability, learning curve, strong constraints may limit creativity.\n\n' +
                  'BEM + Sass:\n' +
                  '- Semantic class names are readable; Sass provides variables/nesting/Mixins for expressiveness; teams are familiar;\n' +
                  '- Disadvantage: naming relies on manual compliance and is collision-prone; large style size (write what you use); weak design-system constraints.\n\n' +
                  'Selection: Tailwind for rapid development/mid-back office/design-system constraints; BEM + Sass for complex visuals/teams resistant to atomic CSS/strong semantic needs.\n\n' +
                  'Modern practice: the two can mix — Tailwind for layout and atoms, BEM for complex components, Sass variables for compile-time constants.',
              },
              {
                title: 'Q30 【Comparison】: Media queries @media vs container queries @container',
                content:
                  'The two have different reference frames, which determine their applicable layers.\n\n' +
                  '@media:\n' +
                  '- Based on viewport width (min-width: 768px), a single global reference;\n' +
                  '- Components behave the same in different positions;\n' +
                  '- Advantages: good compatibility (IE9+), simple;\n' +
                  '- Disadvantage: cannot sense the container; components look the same in a narrow sidebar and a wide main area.\n\n' +
                  '@container:\n' +
                  '- Based on parent container width (requires container-type: inline-size first);\n' +
                  '- Components adapt to available space;\n' +
                  '- Advantages: component-level responsiveness, truly decouples components from page layout, reusable;\n' +
                  '- Disadvantages: newer compatibility (mainstream since 2023), requires explicit container-type.\n\n' +
                  'Selection: container queries for reusable components (cards, tables, sidebars); media queries for overall page layout; the two can be used together.',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // Knowledge Point 20: Cheat Sheet
    // ========================================================================
    {
      order: 20,
      title: 'Cheat Sheet',
      difficulty: 1,
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          lead: true,
          text: 'A condensed reference of core syntax and key points across CSS engineering approaches for quick review.',
        },
        {
          id: 'p20-2',
          type: 'table',
          caption: 'CSS Engineering Core Cheat Sheet',
          headers: ['Topic', 'Core Syntax / API', 'Key Points'],
          rows: [
            ['Sass variable', '$primary: #3b82f6;', 'Determined at compile time; supports color/number/list/map; block-level scope'],
            ['CSS variable', '--color-primary: #3b82f6; var(--color-primary)', 'Runtime; manipulable by JS & selector overrides; inherits DOM tree'],
            ['Sass nesting', '.card { &__title { } }', '& references the parent selector; avoid deep nesting (>3 levels is an anti-pattern)'],
            ['Sass Mixin', '@mixin name($arg) { } @include name(x);', 'Reuses style blocks with parameters; outputs to every usage site'],
            ['Sass extend', '%base { } .a { @extend %base; }', 'Inherits selector generating a group (.a, .b); prone to selector explosion'],
            ['BEM', '.block__element--modifier', 'Block = independent unit; __Element = sub-part; --Modifier = state variant'],
            ['Tailwind breakpoints', 'sm: md: lg: xl: 2xl: (640/768/1024/1280/1536)', 'Mobile-first; default targets smallest screen; prefixes target min-width'],
            ['Tailwind variants', 'hover: focus: dark: group-hover:', 'Variant prefixes for interaction/state/dark mode; stackable hover:dark:bg-x'],
            ['Tailwind @apply', '.btn { @apply bg-blue-500 p-4; }', 'Reuse utility classes inside CSS; fits component encapsulation; do not abuse'],
            ['CSS Modules', '*.module.css; .btn hashed to Button_btn__a1b2', 'Compile-time auto-hashing; composes for reuse; :global for global classes'],
            ['CSS-in-JS', 'styled.button`color: red` (runtime)', 'Styles coupled with components; supports dynamic themes; complex SSR'],
            ['Zero-Runtime', 'Vanilla Extract/Linaria/Panda CSS', 'Generates static CSS at compile time; no runtime overhead; limited dynamic theming'],
            ['PostCSS', 'postcss.config.js + plugins', 'CSS post-processor; autoprefixer/cssnano/preset-env'],
            ['autoprefixer', 'auto-adds -webkit-/-moz- prefixes', 'Based on browserslist; no need to hand-write prefixes'],
            ['@container', 'container-type: inline-size; @container (min-width: 400px)', 'Based on parent container width; component-level responsiveness; mainstream since 2023'],
            ['@layer', '@layer reset, base, components;', 'Explicitly controls priority; later-declared layer wins; unlayered styles are strongest'],
            [':has()', '.card:has(img) { }', 'Parent selector (relational selector); selects parent based on child state'],
            ['CSS variable theming', ':root { --x } [data-theme="dark"] { --x }', 'Switch data-theme or class to switch themes; zero runtime'],
            ['composes', '.primary { composes: btn; }', 'Reuse styles within CSS Modules; compiles to class-name combination'],
            ['prefers-color-scheme', '@media (prefers-color-scheme: dark)', 'Follows system dark mode; can combine with class strategy for manual toggle'],
            ['contain', 'contain: layout paint style;', 'Isolates reflow/repaint scope; performance optimization; will-change alternative'],
          ],
        },
      ],
    },

    // ========================================================================
    // Knowledge Point 21: CSS Engineering Quiz
    // ========================================================================
    {
      order: 21,
      title: 'CSS Engineering Quiz',
      difficulty: 3,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p21-1',
          type: 'paragraph',
          lead: true,
          text: 'Consolidate CSS engineering core knowledge with these 20 questions covering Sass, Tailwind, CSS Modules, CSS-in-JS, CSS architecture, and modern CSS features, across three difficulty tiers: recall / understanding / application.',
        },
        {
          id: 'p21-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '[Recall] What is the design philosophy of Tailwind CSS?',
                options: [
                  'Component-first, providing prebuilt components',
                  'Utility-first, providing atomic utility classes',
                  'OOCSS, separating structure from skin',
                  'BEM, a strict naming convention',
                ],
                correctIndex: 1,
                explanation: 'Tailwind adopts a utility-first philosophy, providing atomic utility classes like bg-blue-500 and p-4 that you compose directly in HTML without writing custom CSS.',
              },
              {
                question: '[Recall] What is the main difference between @extend and @mixin in Sass?',
                options: [
                  '@extend supports parameters, @mixin does not',
                  '@mixin reuses style blocks (with parameters), @extend inherits selectors',
                  '@extend has better performance, @mixin is deprecated',
                  'The two are completely equivalent and interchangeable',
                ],
                correctIndex: 1,
                explanation: '@mixin reuses style blocks and supports parameters, outputting to every usage site; @extend inherits selectors, generating grouped selectors (.a, .b). Use Mixin when parameters are needed; use extend for pure shared styles.',
              },
              {
                question: '[Recall] How do CSS Modules solve naming collisions?',
                options: [
                  'Using the BEM naming convention',
                  'Adding a unique hash to class names at compile time',
                  'Dynamically generating class names via JavaScript',
                  'Using CSS variables to isolate scope',
                ],
                correctIndex: 1,
                explanation: 'CSS Modules add a unique hash to class names at compile time (e.g. Button_primary__a1b2c), implementing local scope and completely solving naming collisions without manual naming conventions.',
              },
              {
                question: '[Recall] In Tailwind\'s mobile-first responsiveness, what min-width does the md: prefix correspond to?',
                options: ['640px', '768px', '1024px', '1280px'],
                correctIndex: 1,
                explanation: 'Tailwind default breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px. md: corresponds to min-width: 768px, targeting tablets.',
              },
              {
                question: '[Recall] What is the key difference between CSS variables and Sass variables?',
                options: [
                  'CSS variables perform better',
                  'CSS variables take effect at runtime; Sass variables are determined at compile time',
                  'Sass variables support more data types',
                  'CSS variables need a browser plugin',
                ],
                correctIndex: 1,
                explanation: 'Sass variables are determined at compile time as static values and cannot be modified at runtime. CSS variables (custom properties) take effect at runtime, can be manipulated by JS and media queries, enabling dynamic theme switching.',
              },
              {
                question: '[Recall] What is the main purpose of @layer cascade layers?',
                options: [
                  'Compress CSS file size',
                  'Automatically add browser prefixes',
                  'Explicitly control style priority to solve override problems',
                  'Implement modular CSS imports',
                ],
                correctIndex: 2,
                explanation: '@layer declares cascade layers to explicitly control priority. A rule in a lower-priority layer is overridden by a higher-priority layer even with higher specificity, letting you override third-party styles without !important.',
              },
              {
                question: '[Recall] In the BEM convention, what does .card__title--active represent?',
                options: [
                  'The active modifier of the card component\'s title element',
                  'The active element of the card component',
                  'The card modifier of the title component',
                  'The title element of the active component',
                ],
                correctIndex: 0,
                explanation: 'BEM format is Block__Element--Modifier. In .card__title--active, card is the Block, title is the Element, and active is the Modifier.',
              },
              {
                question: '[Recall] What is the core difference between container queries @container and media queries @media?',
                options: [
                  'Container queries perform better',
                  'Container queries are based on parent container width; media queries on viewport width',
                  'Container queries support more conditions',
                  'Media queries are deprecated; use container queries',
                ],
                correctIndex: 1,
                explanation: 'Media queries are based on viewport width, so components behave the same in different positions. Container queries are based on parent container width, letting components adapt to available space — true component-level responsiveness, ideal for reusable components.',
              },
              {
                question: '[Understanding] What is the essential difference between PostCSS and Sass?',
                options: [
                  'PostCSS is a preprocessor; Sass is a post-processor',
                  'PostCSS is a post-processor that transforms the CSS AST; Sass is a preprocessor that enhances syntax',
                  'Both are preprocessors with different syntax',
                  'PostCSS only minifies; Sass only adds prefixes',
                ],
                correctIndex: 1,
                explanation: 'Sass enhances syntax (variables/nesting/Mixins) and generates new CSS; PostCSS is a post-processor that transforms the existing CSS AST (prefixes/downgrades/optimization). PostCSS is a de-facto standard in modern projects; autoprefixer and Tailwind are both built on it.',
              },
              {
                question: '[Understanding] What is the main difference between runtime and zero-runtime CSS-in-JS?',
                options: [
                  'Runtime solutions have smaller size',
                  'Zero-runtime generates static CSS at compile time with no runtime overhead but limited dynamic theming',
                  'Zero-runtime solutions are deprecated',
                  'Runtime solutions do not support dynamic themes',
                ],
                correctIndex: 1,
                explanation: 'Runtime solutions (styled-components) generate styles dynamically in the browser, supporting fully dynamic themes but with overhead; zero-runtime (Vanilla Extract) generates static CSS at compile time with no overhead, but dynamic theming needs CSS variables.',
              },
              {
                question: '[Understanding] What is the fundamental difference between Tailwind\'s mobile-first and desktop-first approaches?',
                options: [
                  'Mobile-first defaults styles to the smallest screen; breakpoint prefixes upgrade for min-width',
                  'Mobile-first only supports phones, not desktop',
                  'Mobile-first has smaller size',
                  'Desktop-first performs better',
                ],
                correctIndex: 0,
                explanation: 'Mobile-first: default styles target the smallest screen; the md: prefix (min-width: 768px) upgrades for tablets and above. Desktop-first is the opposite — defaults target desktop, max-md: downgrades for max-width. Modern projects mainly use mobile-first.',
              },
              {
                question: '[Understanding] What is the key difference between CSS Modules composes and Sass @extend?',
                options: [
                  'composes is global; @extend is module-scoped',
                  'composes is module-scoped (unless explicit import); @extend is global and prone to selector explosion',
                  'composes does not support cross-file; @extend does',
                  'The two are completely equivalent',
                ],
                correctIndex: 1,
                explanation: 'composes is scoped to the module (unless explicit from import) and compiles to a class-name combination; @extend is global, generating grouped selectors (.a, .b) and is prone to selector explosion. composes is safer and more controllable.',
              },
              {
                question: '[Understanding] What is the priority relationship between "unlayered styles" and "layered styles" in @layer?',
                options: [
                  'Unlayered styles have the lowest priority',
                  'Unlayered styles have the highest priority, overriding all layers',
                  'Both have equal priority',
                  'It depends on declaration order',
                ],
                correctIndex: 1,
                explanation: 'In @layer, styles not declared in any layer ("unlayered styles") have the highest priority, overriding all layered styles. Among layered styles, later-declared layers have higher priority than earlier-declared ones. This is a key rule of @layer.',
              },
              {
                question: '[Understanding] What is the layering philosophy of ITCSS?',
                options: [
                  'Layered from specific to generic; upper layers depend on lower',
                  'Layered from generic to specific (Settings→Tools→Generic→Elements→Objects→Components→Utilities); lower layers may use upper',
                  'No layering; all styles are equal',
                  'Only two layers: base and components',
                ],
                correctIndex: 1,
                explanation: 'ITCSS (Inverted Triangle CSS) has 7 layers from generic to specific: Settings/Tokens → Tools → Generic → Elements → Objects → Components → Utilities. Lower layers may use upper layers, not the reverse.',
              },
              {
                question: '[Application] Which scenario is best suited for container queries @container?',
                options: [
                  'Overall page layout changing with the viewport',
                  'A reusable card component adapting to different container widths',
                  'Theme color switching',
                  'Compressing CSS size',
                ],
                correctIndex: 1,
                explanation: 'Container queries are based on parent container width, ideal for reusable components (cards, tables, sidebars) adapting to different positions. Use media queries for overall page layout; CSS variables for theme switching; PostCSS for compression.',
              },
              {
                question: '[Application] What is the best approach to implement dark-mode switching?',
                options: [
                  'Define two themes with Sass variables and switch at compile time',
                  'Use CSS variables + [data-theme="dark"] selector override; JS toggles the data attribute',
                  'Force-override all styles with @media',
                  'Force-switch colors with !important',
                ],
                correctIndex: 1,
                explanation: 'CSS variables take effect at runtime; :root defines defaults, [data-theme="dark"] overrides values, styles reference var(). JS toggles document.documentElement.dataset.theme for instant switching with zero runtime overhead and SSR friendliness.',
              },
              {
                question: '[Application] What is the best practice to override third-party library styles without polluting the global scope?',
                options: [
                  'Force-override with !important',
                  'Declare cascade layers with @layer and put overrides in a higher-priority layer',
                  'Delete the third-party stylesheet',
                  'Override with inline styles',
                ],
                correctIndex: 1,
                explanation: '@layer explicitly controls priority; placing overrides in a higher-priority layer overrides third-party styles even with lower specificity, without !important. Note unlayered styles have the highest priority; if the third-party is unlayered, put overrides unlayered or in a higher layer.',
              },
              {
                question: '[Application] In CSS Modules, what is the correct syntax to reuse the .btn style from another file?',
                options: [
                  '.primary { @extend btn; }',
                  '.primary { composes: btn from "./button.module.css"; }',
                  'import btn from "./button.module.css"',
                  '.primary { @apply btn; }',
                ],
                correctIndex: 1,
                explanation: 'Cross-file composes syntax: composes: btn from "./button.module.css"; compiles to a class-name combination (Button_btn__a1b2 Button_primary__d3e4). Same-file uses composes: btn;. @extend is Sass; @apply is Tailwind.',
              },
              {
                question: '[Comparison] What is the core difference between CSS Modules and CSS-in-JS?',
                options: [
                  'CSS Modules have runtime overhead; CSS-in-JS does not',
                  'CSS Modules compile-time hashing with zero runtime; CSS-in-JS runtime supports fully dynamic themes',
                  'The two are completely equivalent',
                  'CSS Modules only support Vue; CSS-in-JS only supports React',
                ],
                correctIndex: 1,
                explanation: 'CSS Modules hash class names at compile time with zero runtime, decoupled from frameworks, SSR-friendly, but dynamic theming needs CSS variables. CSS-in-JS runtime (styled-components) supports props-driven fully dynamic themes but has overhead and SSR complexity.',
              },
              {
                question: '[Comparison] What is the core difference between media queries @media and container queries @container?',
                options: [
                  'Media queries are based on viewport width; container queries on parent container width',
                  'Media queries perform better',
                  'Container queries are deprecated',
                  'The two are completely equivalent',
                ],
                correctIndex: 0,
                explanation: '@media is based on viewport width, so components behave the same in different positions, suitable for page-level responsiveness. @container is based on parent container width (requires container-type: inline-size), letting components adapt to available space, suitable for reusable components. The two can be used together.',
              },
            ],
          },
        },
      ],
    },
  ],
}
