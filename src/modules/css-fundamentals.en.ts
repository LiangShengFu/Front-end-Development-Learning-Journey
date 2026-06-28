/**
 * Module 02: CSS Fundamentals & Core Principles (English version)
 *
 * Full English translation of css-fundamentals.ts.
 * Loaded by moduleRegistry when locale === 'en'.
 */
import type { ModuleMeta } from '../lib/types'

export const cssFundamentalsModule: ModuleMeta = {
  number: '02',
  title: 'CSS Fundamentals & Core Principles',
  slug: 'css-fundamentals',
  stage: 'basics',
  stageLabel: 'Foundation · Module 2',
  icon: '02',
  summary:
    'Selectors, box model, Flex/Grid, positioning, stacking context, responsive design, and animations.',
  knowledgePointCount: 24,
  visualizationCount: 30,
  points: [
    // ========================================================================
    // KP 1: Ways to Include CSS
    // ========================================================================
    {
      order: 1,
      title: 'Ways to Include CSS',
      difficulty: 1,
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS (Cascading Style Sheets) is responsible for the visual presentation of web pages. Separating style from structure is a core principle of Web standards. CSS can be included in three ways, each with its own use cases.',
        },
        {
          id: 'p1-2',
          type: 'heading',
          level: 3,
          text: 'Three Ways to Include CSS',
        },
        {
          id: 'p1-3',
          type: 'code',
          language: 'html',
          filename: 'Comparison of the three inclusion methods',
          code: `<!-- 1. Inline: written directly in an element's style attribute -->
<p style="color: red; font-size: 16px;">Inline styled text</p>

<!-- 2. Internal: written inside a <style> tag within <head> -->
<style>
  p { color: blue; font-size: 16px; }
</style>

<!-- 3. External: linked via <link> to a separate .css file (recommended) -->
<link rel="stylesheet" href="styles.css" />`,
        },
        {
          id: 'p1-4',
          type: 'callout',
          variant: 'tip',
          title: 'Prefer external stylesheets',
          text: 'External stylesheets fully separate structure from style, can be reused across pages, and speed up subsequent loads once cached by the browser. Use inline styles only for one-off, dynamically computed overrides.',
        },
        {
          id: 'p1-5',
          type: 'heading',
          level: 3,
          text: '@import Imports',
        },
        {
          id: 'p1-6',
          type: 'code',
          language: 'css',
          code: `/* Import other CSS files inside a CSS file */
@import url('reset.css');
@import url('variables.css');

/* Note: @import must appear at the top of the file, otherwise it is ignored */
/* @import blocks parallel downloads; performance is worse than <link> — avoid heavy use */`,
        },
        {
          id: 'p1-7',
          type: 'list',
          items: [
            'Inline styles: highest priority, but not reusable and hard to maintain; not recommended.',
            'Internal styles: suitable for small per-page styles with no extra request.',
            'External styles: recommended approach — supports caching, reuse, and parallel downloads.',
            '@import: import inside CSS; poor performance — avoid.',
          ],
        },
      ],
    },

    // ========================================================================
    // KP 2: CSS History (Timeline)
    // ========================================================================
    {
      order: 2,
      title: 'CSS History',
      difficulty: 1,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p2-hist-1',
          type: 'paragraph',
          text: 'CSS has evolved from CSS 1 in 1996 to modern CSS today, passing through several major versions. Understanding this history helps explain the design motivation and best practices of current features.',
        },
        {
          id: 'p2-hist-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              {
                time: '1996',
                title: 'CSS 1',
                description: 'W3C recommendation. Basic selectors and properties; font/color/background/text styling.',
                status: 'done',
              },
              {
                time: '1998',
                title: 'CSS 2',
                description: 'Introduced positioning, ::before/::after pseudo-elements, table layout, media types.',
                status: 'done',
              },
              {
                time: '2011',
                title: 'CSS 2.1',
                description: 'A revision of CSS 2 that removed rarely used features; became the implementation baseline for browsers.',
                status: 'done',
              },
              {
                time: '2017',
                title: 'CSS3 Modularization',
                description: 'Flexbox, Grid layout, animations & transitions, border-radius/shadows/gradients.',
                status: 'done',
              },
              {
                time: '2023',
                title: 'Modern CSS',
                description: 'Container queries @container, CSS nesting, :has() parent selector, @layer cascade layers.',
                status: 'active',
              },
              {
                time: '2025',
                title: 'A New Era of CSS',
                description: 'View Transitions API, light-dark() native themes, color-mix() color blending, the Baseline standard.',
                status: 'active',
              },
            ],
          },
        },
        {
          id: 'p2-hist-3',
          type: 'callout',
          variant: 'tip',
          title: 'Modular Evolution',
          text: 'After CSS3 there is no longer a single big version; CSS advances as independent modules (Flexbox, Grid, Animations, etc., each iterating on its own). Modern CSS uses the Baseline standard to signal browser compatibility — developers can confidently use "Widely Available" features.',
        },
      ],
    },

    // ========================================================================
    // KP 3: Selector System (KnowledgeGraph + SelectorPlayground)
    // ========================================================================
    {
      order: 3,
      title: 'Selector System (10+ kinds of selectors)',
      difficulty: 2,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'A CSS selector is a pattern that matches HTML elements. Mastering the selector system is the foundation for precise style control. Selectors fall into five major categories, from basic to advanced.',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'basic', label: 'Basic Selectors', group: 'core', weight: 3 },
              { id: 'universal', label: 'Universal *', group: 'basic' },
              { id: 'type', label: 'Type div', group: 'basic' },
              { id: 'class', label: 'Class .box', group: 'basic' },
              { id: 'id', label: 'ID #app', group: 'basic' },
              { id: 'attr', label: 'Attribute [type]', group: 'basic' },
              { id: 'combinator', label: 'Combinators', group: 'core', weight: 3 },
              { id: 'descendant', label: 'Descendant A B', group: 'combinator' },
              { id: 'child', label: 'Child A>B', group: 'combinator' },
              { id: 'adjacent', label: 'Adjacent A+B', group: 'combinator' },
              { id: 'general', label: 'General sibling A~B', group: 'combinator' },
              { id: 'pseudo', label: 'Pseudo-classes & Pseudo-elements', group: 'core', weight: 3 },
              { id: 'pc-state', label: 'State :hover', group: 'pseudo' },
              { id: 'pc-struct', label: 'Structural :nth-child', group: 'pseudo' },
              { id: 'pc-not', label: 'Negation :not()', group: 'pseudo' },
              { id: 'pe', label: 'Pseudo-element ::before', group: 'pseudo' },
              { id: 'group', label: 'Grouping A, B', group: 'core', weight: 2 },
            ],
            edges: [
              { source: 'basic', target: 'universal' },
              { source: 'basic', target: 'type' },
              { source: 'basic', target: 'class' },
              { source: 'basic', target: 'id' },
              { source: 'basic', target: 'attr' },
              { source: 'combinator', target: 'descendant' },
              { source: 'combinator', target: 'child' },
              { source: 'combinator', target: 'adjacent' },
              { source: 'combinator', target: 'general' },
              { source: 'pseudo', target: 'pc-state' },
              { source: 'pseudo', target: 'pc-struct' },
              { source: 'pseudo', target: 'pc-not' },
              { source: 'pseudo', target: 'pe' },
            ],
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'css',
          filename: 'Selector examples',
          code: `/* Basic selectors */
* { margin: 0; }              /* universal selector */
div { display: block; }       /* type selector */
.card { padding: 16px; }      /* class selector */
#header { height: 60px; }     /* ID selector */
[type="text"] { border: 1px solid; } /* attribute selector */

/* Combinators */
.list .item { }      /* descendant: all .item inside .list */
.list > .item { }    /* child: direct child .item of .list */
h2 + p { }           /* adjacent sibling: the p right after h2 */
h2 ~ p { }           /* general sibling: all sibling p after h2 */

/* Pseudo-classes & pseudo-elements */
a:hover { color: red; }              /* state pseudo-class */
li:nth-child(odd) { }                /* structural pseudo-class */
input:not([disabled]) { }            /* negation pseudo-class */
p::before { content: ''; }           /* pseudo-element */

/* Grouping */
h1, h2, h3 { font-weight: bold; }`,
        },
        {
          id: 'p2-4',
          type: 'demo',
          visualizationType: 'selector-playground',
          data: {
            title: 'Selector Playground · Live Matching',
            defaultSelector: '.link',
            quickSelectors: ['div', '.link', '#header', '.item', 'a', 'div > .item', '.list .link', ':not(.item)'],
            sampleElements: [
              { tag: 'div', id: 'header', text: 'Header', indent: 0, block: true },
              { tag: 'div', classes: ['nav'], indent: 1, block: true },
              { tag: 'a', classes: ['link'], text: 'Home', indent: 2 },
              { tag: 'a', classes: ['link'], text: 'Products', indent: 2 },
              { tag: 'a', classes: ['link', 'active'], text: 'About', indent: 2 },
              { tag: 'div', classes: ['list'], indent: 1, block: true },
              { tag: 'div', classes: ['item'], text: 'Item 1', indent: 2, block: true },
              { tag: 'div', classes: ['item'], text: 'Item 2', indent: 2, block: true },
              { tag: 'span', classes: ['badge'], text: 'New', indent: 2 },
            ],
          },
        },
        {
          id: 'p2-5',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            title: 'Selector Categories Cheat Sheet',
            items: [
              {
                title: 'Basic Selectors',
                content: 'Universal *, type div, class .box, ID #app, attribute [type="text"]. Attribute selectors support fuzzy matching with ^=, $=, *=.',
              },
              {
                title: 'Combinators',
                content: 'Descendant A B, child A>B, adjacent sibling A+B, general sibling A~B. Combinators express structural relationships between elements.',
              },
              {
                title: 'Pseudo-classes (state & structural)',
                content: 'State pseudo-classes: :hover, :focus, :active, :checked. Structural pseudo-classes: :nth-child(n), :first-child, :last-child, :not(), :is(), :where().',
              },
              {
                title: 'Pseudo-elements',
                content: '::before, ::after, ::first-line, ::first-letter, ::selection. Pseudo-elements insert generated content or style specific text fragments.',
              },
              {
                title: 'Grouping Selectors',
                content: 'A, B, C separated by commas applies the same rule to multiple selectors. Native CSS nesting (2023+) lets you write nested rules directly inside a selector.',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 4: Selector Specificity Calculation (CodeStepper)
    // ========================================================================
    {
      order: 4,
      title: 'Selector Specificity Calculation',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          text: 'When multiple rules match the same element, the browser uses specificity to decide which rule applies. Specificity is expressed as a four-digit tuple (a, b, c, d), compared left to right.',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '#nav .item { color: red; }      /* (0,1,1,0) */',
              'div.item { color: blue; }       /* (0,0,1,1) */',
              '.item { color: green; }         /* (0,0,1,0) */',
              'div { color: gray; }            /* (0,0,0,1) */',
            ],
            language: 'css',
            steps: [
              {
                title: 'The four-digit specificity rule',
                description: 'a = inline style (style attribute) → 1, otherwise 0. b = number of ID selectors. c = number of classes, attributes, pseudo-classes. d = number of types and pseudo-elements. Universal * and inheritance do not count toward specificity.',
                highlightLines: [1, 2, 3, 4],
              },
              {
                title: '#nav .item → (0,1,1,0)',
                description: '1 ID (#nav) → b=1; 1 class (.item) → c=1. Highest specificity → color is red.',
                highlightLines: [1],
              },
              {
                title: 'div.item → (0,0,1,1)',
                description: '1 class (.item) → c=1; 1 type (div) → d=1. Second highest specificity.',
                highlightLines: [2],
              },
              {
                title: '.item → (0,0,1,0)',
                description: '1 class (.item) → c=1. Third highest specificity.',
                highlightLines: [3],
              },
              {
                title: 'div → (0,0,0,1)',
                description: '1 type (div) → d=1. Lowest specificity.',
                highlightLines: [4],
              },
              {
                title: '!important overrides everything',
                description: '!important breaks the normal specificity and forces the rule to apply. Avoid using it whenever possible — it is hard to maintain. Inline style + !important is the highest priority.',
                highlightLines: [1, 2, 3, 4],
              },
            ],
          },
        },
        {
          id: 'p3-3',
          type: 'callout',
          variant: 'warning',
          title: 'Comparison direction',
          text: 'Compare digit by digit from left to right; the larger left digit wins the whole comparison. (0,1,0,0) > (0,0,99,99) — a single ID selector beats any number of class selectors.',
        },
      ],
    },

    // ========================================================================
    // KP 5: Pseudo-classes & Pseudo-elements (CompareTable)
    // ========================================================================
    {
      order: 5,
      title: 'Pseudo-classes & Pseudo-elements',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          text: 'A pseudo-class is a selector that matches an element in a specific state; a pseudo-element creates a virtual element that does not exist in the document tree. The CSS3 spec uses a single colon for pseudo-classes and a double colon for pseudo-elements.',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Feature',
            columns: ['Pseudo-class (:)', 'Pseudo-element (::)'],
            rows: [
              { feature: 'Syntax', values: ['Single colon :hover', 'Double colon ::before'] },
              { feature: 'Purpose', values: ['Matches an existing element in a specific state', 'Creates a virtual element'] },
              { feature: 'In document tree', values: ['Element exists in the DOM', 'Element does not exist in the DOM'] },
              { feature: 'Count limit', values: ['An element can have multiple pseudo-classes', 'An element can have at most one ::before and one ::after'] },
              { feature: 'Common examples', values: [':hover :focus :nth-child :not() :first-child', '::before ::after ::first-line ::first-letter ::selection'] },
              { feature: 'Requires', values: ['No content property needed', 'content property (required for ::before/::after)'] },
            ],
            highlightColumn: 1,
          },
        },
        {
          id: 'p4-3',
          type: 'code',
          language: 'css',
          filename: 'Pseudo-class & pseudo-element examples',
          code: `/* Pseudo-classes: match state */
a:link { color: blue; }         /* unvisited link */
a:hover { color: red; }         /* mouse hover */
a:visited { color: purple; }    /* visited link */
input:focus { border-color: blue; } /* has focus */
li:nth-child(odd) { background: #f5f5f5; } /* odd rows */
li:not(:last-child) { border-bottom: 1px solid; } /* not the last item */

/* Pseudo-elements: create virtual elements */
.quote::before { content: '"'; color: gray; }     /* opening quote */
.quote::after { content: '"'; color: gray; }      /* closing quote */
p::first-line { font-weight: bold; }              /* bold first line */
p::first-letter { font-size: 2em; float: left; }  /* enlarged first letter */
::selection { background: yellow; }               /* selected text style */`,
        },
        {
          id: 'p4-4',
          type: 'callout',
          variant: 'note',
          title: 'Compatibility note',
          text: 'In the CSS2 era pseudo-elements also used a single colon (:before); the CSS3 spec changed it to a double colon to distinguish them. Modern browsers accept both forms for ::before, but the double colon is recommended.',
        },
      ],
    },

    // ========================================================================
    // KP 6: Box Model (BoxModel)
    // ========================================================================
    {
      order: 6,
      title: 'Box Model (standard/quirks box-sizing)',
      difficulty: 2,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          text: 'Every HTML element is a rectangular box made of four layers: content, padding, border, and margin. The box model determines how the element\'s dimensions are calculated.',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'CSS Box Model Structure',
            flowDirection: 'top-down',
            layers: [
              {
                name: 'margin (outer)',
                description: 'The transparent area outside the box that pushes adjacent elements away. Margin does not count toward the visible size of an element but affects layout spacing. Margins can be negative.',
                components: [
                  { name: 'margin-top', description: 'Top outer margin' },
                  { name: 'margin-right', description: 'Right outer margin' },
                  { name: 'margin-bottom', description: 'Bottom outer margin' },
                  { name: 'margin-left', description: 'Left outer margin' },
                ],
              },
              {
                name: 'border',
                description: 'The frame around the padding, defined by width, style, and color.',
                components: [
                  { name: 'border-width', description: 'Border thickness' },
                  { name: 'border-style', description: 'solid/dashed/dotted/none' },
                  { name: 'border-color', description: 'Border color' },
                ],
              },
              {
                name: 'padding (inner)',
                description: 'The transparent area between content and border. The padding background is the same as the content background.',
                components: [
                  { name: 'padding-top', description: 'Top inner padding' },
                  { name: 'padding-right', description: 'Right inner padding' },
                  { name: 'padding-bottom', description: 'Bottom inner padding' },
                  { name: 'padding-left', description: 'Left inner padding' },
                ],
              },
              {
                name: 'content',
                description: 'The core area of the box that displays actual content such as text and images. width/height apply to the content by default.',
                components: [
                  { name: 'width', description: 'Content width' },
                  { name: 'height', description: 'Content height' },
                ],
              },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'heading',
          level: 3,
          text: 'box-sizing: Two Box Models',
        },
        {
          id: 'p5-4',
          type: 'code',
          language: 'css',
          filename: 'box-sizing comparison',
          code: `/* Standard box model (default): width = content width */
.box-standard {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 1px solid;
  /* Actual occupied width = 200 + 20*2 + 1*2 = 242px */
}

/* Quirks (IE) box model: width = content + padding + border */
.box-border {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 1px solid;
  /* Actual occupied width = 200px (content shrinks to 158px) */
}

/* Globally recommended reset */
*, *::before, *::after {
  box-sizing: border-box;
}`,
        },
        {
          id: 'p5-5',
          type: 'callout',
          variant: 'tip',
          title: 'Prefer border-box',
          text: 'border-box makes width/height the final visible size of the element, which is more intuitive. Almost every modern project uses border-box in its global reset.',
        },
        {
          id: 'p5-6',
          type: 'demo',
          visualizationType: 'box-model',
          data: {
            title: 'Box Model Visualization · margin / border / padding / content',
            defaultSizing: 'content-box',
            defaultMargin: 20,
            defaultBorder: 8,
            defaultPadding: 16,
            defaultWidth: 200,
          },
        },
      ],
    },

    // ========================================================================
    // KP 7: BFC / IFC Formatting Contexts (Architecture)
    // ========================================================================
    {
      order: 7,
      title: 'BFC / IFC Formatting Contexts',
      difficulty: 4,
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: 'A Formatting Context is the fundamental rule of CSS visual rendering. BFC (Block Formatting Context) and IFC (Inline Formatting Context) determine how boxes are arranged inside a container and how they interact.',
        },
        {
          id: 'p6-2',
          type: 'heading',
          level: 3,
          text: 'BFC Triggers',
        },
        {
          id: 'p6-3',
          type: 'list',
          items: [
            'The root element <html> is itself a BFC',
            'float is not none (left / right / both)',
            'position is absolute or fixed',
            'display is inline-block / flex / grid / table-cell / flow-root',
            'overflow is not visible (hidden / auto / scroll)',
            'contain is layout / content / paint',
          ],
        },
        {
          id: 'p6-4',
          type: 'heading',
          level: 3,
          text: 'Core Properties of a BFC',
        },
        {
          id: 'p6-5',
          type: 'code',
          language: 'css',
          filename: 'BFC use cases',
          code: `/* 1. Clear floats: trigger a BFC on the parent so it wraps floating children */
.parent { overflow: hidden; } /* or display: flow-root; */

/* 2. Avoid margin collapse: vertical margins of adjacent block elements collapse; a BFC isolates them */
.sidebar { overflow: hidden; }

/* 3. Prevent text from wrapping around a float: BFC regions do not overlap with floats */
.main { overflow: hidden; } /* not covered by a sibling float */

/* Recommended: display: flow-root triggers a BFC with no side effects */
.container { display: flow-root; }`,
        },
        {
          id: 'p6-6',
          type: 'callout',
          variant: 'note',
          title: 'Margin collapse rules',
          text: 'Vertical margins of adjacent block elements collapse (the larger one wins). Triggering a BFC isolates the element and prevents collapse. Margin collapse can also happen between parent and child elements.',
        },
        {
          id: 'p6-7',
          type: 'heading',
          level: 3,
          text: 'IFC Overview',
        },
        {
          id: 'p6-8',
          type: 'paragraph',
          text: 'An IFC (Inline Formatting Context) manages the layout of inline elements. Inline elements arrange horizontally inside an IFC, align via vertical-align, and wrap automatically. line-height controls the line height.',
        },
        {
          id: 'p6-9',
          type: 'demo',
          visualizationType: 'display-type',
          data: {
            title: 'Display Type Comparison · inline / block / inline-block',
            defaultDisplay: 'inline-block',
          },
        },
      ],
    },

    // ========================================================================
    // KP 8: Flexbox Layout (FlexboxPlayground)
    // ========================================================================
    {
      order: 8,
      title: 'Flexbox Layout',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          text: 'Flexbox is a one-dimensional layout system that excels at arranging elements in a single row or column. It solves many pain points of float-based layouts and is the preferred modern layout tool.',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'css',
            hint: 'Modify CSS properties to observe how the Flex layout changes',
            initialCode: `/* Container properties */
.flex-container {
  display: flex;
  flex-direction: row;       /* row | row-reverse | column | column-reverse */
  justify-content: center;   /* flex-start | center | space-between | space-around | space-evenly */
  align-items: center;       /* flex-start | center | stretch | baseline */
  flex-wrap: nowrap;         /* nowrap | wrap | wrap-reverse */
  gap: 12px;
}

/* Item properties */
.flex-item {
  flex: 1;                   /* flex-grow | flex-shrink | flex-basis */
  /* flex: 0 1 auto; default value */
  /* flex: 1 1 0; equally divide the container */
  align-self: stretch;       /* override the container's align-items */
  order: 0;                  /* ordering; default 0 */
}`,
          },
        },
        {
          id: 'p7-3',
          type: 'heading',
          level: 3,
          text: 'Core Concepts',
        },
        {
          id: 'p7-4',
          type: 'list',
          items: [
            'Main axis: the direction defined by flex-direction; horizontal left-to-right by default.',
            'Cross axis: perpendicular to the main axis; vertical top-to-bottom by default.',
            'justify-content: controls alignment and spacing along the main axis.',
            'align-items: controls alignment along the cross axis.',
            'flex shorthand: flex-grow (grow), flex-shrink (shrink), flex-basis (base size).',
          ],
        },
        {
          id: 'p7-5',
          type: 'callout',
          variant: 'tip',
          title: 'What flex: 1 means',
          text: 'flex: 1 is equivalent to flex: 1 1 0%: the item can grow, can shrink, and its base size is 0. Multiple items with flex: 1 equally divide the container\'s remaining space.',
        },
        {
          id: 'p7-6',
          type: 'demo',
          visualizationType: 'flexbox-playground',
          data: {
            title: 'Flexbox Playground · Interactive demo of all properties',
            itemCount: 5,
            defaultDirection: 'row',
            defaultJustifyContent: 'flex-start',
            defaultAlignItems: 'flex-start',
            defaultGap: 8,
          },
        },
      ],
    },

    // ========================================================================
    // KP 9: Grid Layout (GridPlayground)
    // ========================================================================
    {
      order: 9,
      title: 'Grid Layout',
      difficulty: 3,
      visualizationType: 'grid-playground',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          text: 'CSS Grid is a two-dimensional layout system that can control both rows and columns at once. It is more powerful than Flexbox and is suited for complex page-level layouts. Flexbox is for one dimension; Grid is for two.',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'grid-playground',
          data: {
            title: 'Grid Playground · Interactive 2D layout demo',
            itemCount: 6,
            defaultColumns: 'repeat(3, 1fr)',
            defaultRows: 'auto',
            defaultGap: 8,
            defaultJustifyItems: 'stretch',
            defaultAlignItems: 'stretch',
          },
        },
        {
          id: 'p8-3',
          type: 'heading',
          level: 3,
          text: 'Common Units',
        },
        {
          id: 'p8-4',
          type: 'list',
          items: [
            'fr: fractional unit; divides the remaining space proportionally. 1fr 2fr means a 1:2 split.',
            'auto: automatic size; determined by content.',
            'minmax(min, max): a minimum/maximum constraint. minmax(200px, 1fr) means at least 200px and at most an equal share.',
            'repeat(n, size): repeats n times. repeat(auto-fill, 100px) fills automatically.',
          ],
        },
        {
          id: 'p8-5',
          type: 'callout',
          variant: 'tip',
          title: 'Responsive Grid in one line',
          text: 'grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) creates an automatic responsive card layout — no media queries needed.',
        },
      ],
    },

    // ========================================================================
    // KP 10: Positioning System (5 positions) (PositionPlayground)
    // ========================================================================
    {
      order: 10,
      title: 'Positioning System (5 positions)',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          text: 'The CSS position property controls how an element is positioned. Understanding the 5 position values and their reference frames is key to precise element placement.',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Feature',
            columns: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
            rows: [
              { feature: 'Default value', values: ['Yes', 'No', 'No', 'No', 'No'] },
              { feature: 'Out of normal flow', values: ['No', 'No', 'Yes', 'Yes', 'No (leaves flow when scrolling)'] },
              { feature: 'Reference frame', values: ['Normal flow position', 'Original position of itself', 'Nearest non-static ancestor', 'Viewport (browser window)', 'Nearest scrolling ancestor'] },
              { feature: 'top/right/bottom/left', values: ['Invalid', 'Offset from itself', 'Positioned relative to the reference frame', 'Positioned relative to the viewport', 'Behaves as relative before threshold, as fixed after'] },
              { feature: 'Affects other elements', values: ['In flow; occupies space', 'In flow; occupies space', 'Out of flow; no space', 'Out of flow; no space', 'In flow; occupies space'] },
              { feature: 'Typical use', values: ['Default layout', 'Nudge position / act as reference', 'Popovers / tooltips / icons', 'Fixed navbar / back-to-top', 'Sticky headers / sidebars'] },
            ],
          },
        },
        {
          id: 'p9-3',
          type: 'code',
          language: 'css',
          filename: 'Positioning examples',
          code: `/* relative: relative positioning; acts as reference for absolute */
.parent { position: relative; }

/* absolute: out of the document flow */
.tooltip {
  position: absolute;
  top: 100%;      /* relative to the parent's bottom */
  left: 50%;
  transform: translateX(-50%);
}

/* fixed: positioned relative to the viewport */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* sticky: acts as relative until threshold, then as fixed */
.table-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}`,
        },
        {
          id: 'p9-4',
          type: 'callout',
          variant: 'warning',
          title: 'Prerequisites for sticky',
          text: 'sticky works only when: 1) no ancestor has overflow: hidden/auto; 2) an ancestor is tall enough to scroll; 3) at least one of top/right/bottom/left is set.',
        },
        {
          id: 'p9-5',
          type: 'demo',
          visualizationType: 'position-playground',
          data: {
            title: 'Positioning Playground · Five position modes',
            defaultPosition: 'relative',
            defaultTop: 20,
            defaultLeft: 20,
            defaultZIndex: 1,
          },
        },
      ],
    },

    // ========================================================================
    // KP 11: Stacking Context (z-index) (CodeStepper)
    // ========================================================================
    {
      order: 11,
      title: 'Stacking Context (z-index)',
      difficulty: 4,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          text: 'A Stacking Context is the three-dimensional concept in CSS — the element layering on the z-axis. z-index is only compared within the same stacking context. Understanding stacking contexts is the key to solving "z-index not working" issues.',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '<div class="parent" style="z-index: 1;">',
              '  <div class="child" style="z-index: 999;"></div>',
              '</div>',
              '<div class="other" style="z-index: 2;"></div>',
              '',
              '/* .child\'s z-index:999 only applies inside .parent */',
              '/* .parent (z-index:1) < .other (z-index:2) */',
              '/* so .child is still below .other */',
            ],
            language: 'css',
            steps: [
              {
                title: 'Creating a stacking context',
                description: 'The following properties create a new stacking context: position is non-static with a non-auto z-index; opacity < 1; transform is not none; filter is not none; will-change; isolation: isolate.',
                highlightLines: [1, 4],
              },
              {
                title: 'z-index is compared only within the same context',
                description: '.parent creates a stacking context (z-index:1); .child\'s z-index:999 only applies inside .parent. When comparing outside, .parent participates as a whole.',
                highlightLines: [1, 2],
              },
              {
                title: 'The parent stacking context decides the overall level',
                description: '.parent (z-index:1) and .other (z-index:2) are compared in the same stacking context. 1 < 2, so .parent and all its children sit below .other.',
                highlightLines: [1, 4],
              },
              {
                title: 'A child cannot escape the parent stacking context',
                description: 'No matter how large .child\'s z-index is, it cannot exceed .other — because .child is trapped inside .parent\'s stacking context. This is the most common cause of "z-index not working".',
                highlightLines: [2, 4, 7],
              },
              {
                title: 'How to fix it',
                description: 'Option 1: raise .parent\'s z-index above 2. Option 2: remove the property that creates .parent\'s stacking context (e.g. drop transform). Option 3: restructure the DOM.',
                highlightLines: [1, 4],
              },
            ],
          },
        },
        {
          id: 'p10-3',
          type: 'callout',
          variant: 'warning',
          title: 'z-index troubleshooting checklist',
          text: '1) Check whether the element has position set; 2) Check whether an ancestor creates a stacking context; 3) Check the z-index comparison among siblings; 4) Check for implicit context-creating properties such as opacity/transform/filter.',
        },
      ],
    },

    // ========================================================================
    // KP 12: Responsive Basics & Media Queries (ResponsiveViewport)
    // ========================================================================
    {
      order: 12,
      title: 'Responsive Basics & Media Queries',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          text: 'Responsive design ensures a page works well across device sizes. Media queries are the core of responsive design — they apply different styles based on viewport conditions.',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Breakpoint',
            columns: ['Mobile', 'Tablet', 'Desktop', 'Large screen'],
            rows: [
              { feature: 'Typical width', values: ['< 640px', '640px - 1024px', '1024px - 1280px', '> 1280px'] },
              { feature: 'Tailwind prefix', values: ['Default (no prefix)', 'sm: / md:', 'lg: / xl:', '2xl:'] },
              { feature: 'Layout strategy', values: ['Single column stacked', 'Two/three columns', 'Multi-column grid', 'Fixed width centered'] },
              { feature: 'Base font size', values: ['14px base', '15px base', '16px base', '16px base'] },
              { feature: 'Navigation form', values: ['Hamburger menu', 'Bottom tab bar', 'Horizontal navbar', 'Horizontal navbar'] },
            ],
          },
        },
        {
          id: 'p11-3',
          type: 'code',
          language: 'css',
          filename: 'Media query syntax',
          code: `/* Basic syntax */
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}

/* Mobile-first (recommended): small to large */
.container { padding: 16px; }

@media (min-width: 640px) {
  .container { padding: 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 32px; }
}

/* Compound conditions */
@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar { display: block; }
}

/* Landscape orientation */
@media (orientation: landscape) { }

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body { background: #1a1a1a; color: #e5e5e5; }
}`,
        },
        {
          id: 'p11-4',
          type: 'callout',
          variant: 'tip',
          title: 'Mobile-first strategy',
          text: 'Prefer min-width media queries (overriding from small to large). Use mobile styles as the base and progressively enhance for larger screens. This aligns with progressive enhancement and lets mobile load less code.',
        },
        {
          id: 'p11-5',
          type: 'demo',
          visualizationType: 'responsive-viewport',
          data: {
            title: 'Responsive Viewport Demo · drag the width to see layout changes',
            defaultWidth: 320,
            minWidth: 280,
            maxWidth: 1160,
            presets: [
              { label: 'Phone', width: 320 },
              { label: 'Tablet', width: 768 },
              { label: 'Desktop', width: 1024 },
            ],
          },
        },
        {
          id: 'p11-6',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              {
                time: 'Phone',
                title: '< 640px',
                description: 'Single column layout; navigation collapses into a hamburger menu; font slightly smaller; touch targets ≥ 44px.',
                status: 'done',
              },
              {
                time: 'Tablet',
                title: '640px - 1024px',
                description: 'Two-column layout possible; navigation expands; sidebar optional; images scale to width.',
                status: 'done',
              },
              {
                time: 'Desktop',
                title: '1024px - 1440px',
                description: 'Multi-column layout; fixed sidebar; hover interactions available; content container has a max-width cap.',
                status: 'done',
              },
              {
                time: 'Large screen',
                title: '> 1440px',
                description: 'Content centered; max-width cap (e.g. 1200px) prevents overly long line lengths that hurt readability.',
                status: 'active',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 13: CSS Unit System (px/em/rem/vw/vh) (CompareTable)
    // ========================================================================
    {
      order: 13,
      title: 'CSS Unit System (px/em/rem/vw/vh)',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          text: 'CSS has absolute and relative units. Choosing the right unit is essential for responsive design and accessibility.',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Unit',
            columns: ['px', 'em', 'rem', 'vw/vh', '%'],
            rows: [
              { feature: 'Type', values: ['Absolute', 'Relative (parent font size)', 'Relative (root font size)', 'Relative (viewport)', 'Relative (parent size)'] },
              { feature: 'Reference', values: ['Physical pixel', 'Parent element font-size', 'html root element font-size', 'Viewport width/height', 'Parent element matching dimension'] },
              { feature: 'Nesting issue', values: ['None', 'Yes (compounds per level)', 'None', 'None', 'Yes'] },
              { feature: 'Responsiveness', values: ['Poor', 'Medium', 'Good', 'Good', 'Good'] },
              { feature: 'Recommended use', values: ['Borders / thin lines', 'Spacing inside a component', 'Font size / spacing / layout', 'Full-screen layout', 'Flexible layout'] },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'p12-3',
          type: 'code',
          language: 'css',
          filename: 'Unit usage tips',
          code: `/* rem: recommended for font sizes and spacing */
html { font-size: 16px; } /* root font size */
h1 { font-size: 2rem; }   /* 32px */
p { font-size: 1rem; }    /* 16px */
.section { padding: 1.5rem; } /* 24px */

/* em: good for relative scaling inside a component */
.button {
  font-size: 1rem;
  padding: 0.75em 1.5em;  /* relative to its own font size */
  border-radius: 0.25em;
}

/* vw/vh: full viewport */
.hero { height: 100vh; }       /* full screen height */
.title { font-size: 5vw; }     /* 5% of viewport width */

/* clamp(): responsive font size made easy */
h1 { font-size: clamp(1.5rem, 4vw, 3rem); } /* min 1.5rem, max 3rem */

/* %: flexible layout */
.col { width: 50%; }`,
        },
        {
          id: 'p12-4',
          type: 'callout',
          variant: 'tip',
          title: 'clamp() for responsive font sizes',
          text: 'clamp(min, preferred, max) takes the min on small screens, the max on large screens, and the preferred in between. One line gives you a fluid responsive font size with no media queries.',
        },
        {
          id: 'p12-5',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            title: 'Unit system cheat sheet',
            items: [
              {
                title: 'Absolute unit px',
                content: '1px = 1/96 inch. Fixed size; does not change with parent or viewport. Good for borders, thin lines, shadow offsets — anything that needs precise pixels. Poor at responsiveness.',
              },
              {
                title: 'Relative unit em',
                content: 'Relative to the parent\'s font-size. 1em = parent\'s font size. Compounds when nested and can spiral out of control. Good for relative scaling inside a component (button padding, icon size).',
              },
              {
                title: 'Relative unit rem (recommended)',
                content: 'Relative to the html root element\'s font-size. 1rem = root font size (default 16px). No nesting issues; consistent globally. Recommended for font sizes, spacing, and layout.',
              },
              {
                title: 'Viewport units vw/vh/vmin/vmax',
                content: '1vw = 1% of viewport width. vh works the same way. vmin takes the smaller edge; vmax takes the larger. Good for full-screen layouts, hero areas, viewport-driven font sizes.',
              },
              {
                title: 'Percentage %',
                content: 'Relative to the parent\'s matching dimension. width: 50% = half the parent\'s width. Note: padding/margin percentages are always relative to the parent\'s width (not height).',
              },
              {
                title: 'Functions clamp() / min() / max()',
                content: 'clamp(min, preferred, max) creates fluid responsiveness. min(a, b) picks the smaller value; max(a, b) picks the larger. Different units can be mixed and the browser picks automatically.',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 14: Animations & Transforms (AnimationPlayground)
    // ========================================================================
    {
      order: 14,
      title: 'Animations & Transforms',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          text: 'The CSS animation system has three core properties: transition, transform, and animation (keyframes). Together they make pages move and improve user experience.',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'css',
            hint: 'Modify animation properties and observe the transition',
            initialCode: `/* transition: animated transitions on state changes */
.button {
  transition: transform 0.3s ease, background 0.2s;
}
.button:hover {
  transform: scale(1.05);
  background: #1ed760;
}

/* transform: changes (no layout reflow; great performance) */
.card {
  transform: translate(10px, 20px) rotate(5deg) scale(1.1);
  transform-origin: center; /* transformation origin */
}

/* animation: keyframe animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.modal {
  animation: fadeIn 0.4s ease-out;
  /* animation: name duration timing-function delay iteration-count direction */
}`,
          },
        },
        {
          id: 'p13-3',
          type: 'heading',
          level: 3,
          text: 'transition vs animation',
        },
        {
          id: 'p13-4',
          type: 'list',
          items: [
            'transition: requires a trigger (e.g. :hover); only two keyframes (start and end); cannot pause mid-way.',
            'animation: can run automatically; supports multiple keyframes (@keyframes); can loop and pause.',
            'transform: translate/rotate/scale/skew; GPU-accelerated; no reflow; best performance.',
            'Avoid animating top/left/margin/width/height — they trigger reflow.',
          ],
        },
        {
          id: 'p13-5',
          type: 'callout',
          variant: 'tip',
          title: 'Performance tip',
          text: 'Animate only transform and opacity — they are handled by the compositor thread and do not trigger layout or paint. Pair with will-change: transform to hint the browser to optimize.',
        },
        {
          id: 'p13-6',
          type: 'demo',
          visualizationType: 'animation-playground',
          data: {
            title: 'Animation & Transition Playground · Transition & Animation',
            defaultMode: 'transition',
            defaultTransitionProperty: 'all',
            defaultTransitionDuration: 500,
            defaultTransitionTiming: 'ease',
            defaultKeyframe: 'spin',
            defaultAnimationDuration: 1000,
          },
        },
      ],
    },

    // ========================================================================
    // KP 15: CSS Variables & Custom Properties (Sandbox)
    // ========================================================================
    {
      order: 15,
      title: 'CSS Variables & Custom Properties',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          text: 'CSS custom properties (variables) start with -- and are referenced via var(). They give CSS dynamism and programmability, and are the foundation of theme switching and design tokens.',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'css',
            hint: 'Modify the variable values and watch the global styles change',
            initialCode: `:root {
  /* Design tokens */
  --color-primary: #1ed760;
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --spacing-unit: 8px;
  --radius: 6px;
  --font-size-base: 16px;
}

/* Use the variables */
.button {
  background: var(--color-primary);
  padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
  border-radius: var(--radius);
  font-size: var(--font-size-base);
  color: white;
}

/* Theme switch: override variables */
[data-theme="dark"] {
  --color-primary: #1ed760;
  --color-bg: #1a1a1a;
  --color-text: #e5e5e5;
}

/* With a fallback value */
color: var(--color-text, #333);`,
          },
        },
        {
          id: 'p14-3',
          type: 'heading',
          level: 3,
          text: 'CSS variables vs Sass variables',
        },
        {
          id: 'p14-4',
          type: 'list',
          items: [
            'CSS variables are evaluated at runtime; Sass variables are replaced at compile time.',
            'CSS variables can be modified dynamically by JS (element.style.setProperty); Sass cannot.',
            'CSS variables follow the cascade and can be overridden; Sass variables are static.',
            'CSS variables can be redefined inside media queries; Sass variables cannot.',
          ],
        },
        {
          id: 'p14-5',
          type: 'code',
          language: 'javascript',
          filename: 'Manipulating CSS variables from JS',
          code: `// Read a variable
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary')

// Set a variable (global)
document.documentElement.style.setProperty('--color-primary', '#ff0000')

// Set a variable (local)
element.style.setProperty('--spacing', '16px')`,
        },
      ],
    },

    // ========================================================================
    // KP 16: Inheritance & Inherited Properties (Accordion)
    // ========================================================================
    {
      order: 16,
      title: 'Inheritance & Inherited Properties',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          text: 'CSS inheritance means a child element automatically takes some property values from its parent. Not every property is inherited — knowing which ones are helps you write cleaner styles.',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0],
            items: [
              {
                title: 'Inherited properties',
                content: 'These properties pass from the parent to child elements unless the child explicitly overrides them. Set them once on body and they apply across the page.',
                code: `/* Text-related */
color, font, font-family, font-size, font-weight,
font-style, line-height, text-align, text-indent,
letter-spacing, word-spacing, white-space, direction

/* List-related */
list-style, list-style-type, list-style-position

/* Table-related */
border-collapse, border-spacing

/* Visibility */
visibility, cursor

/* Other */
quotes, content`,
              },
              {
                title: 'Non-inherited properties',
                content: 'These properties do not cascade to children. Each element needs to set them independently.',
                code: `/* Box model */
width, height, margin, padding, border

/* Background */
background, background-color, background-image

/* Positioning */
position, top, right, bottom, left, z-index

/* Layout */
display, float, clear, overflow

/* Other */
opacity, box-shadow, transform`,
              },
              {
                title: 'Keywords that control inheritance',
                content: 'CSS provides four keywords for precise control over inheritance behavior.',
                code: `/* inherit: force inheritance (even when not inherited by default) */
a { color: inherit; } /* links inherit the parent's color */

/* initial: reset to the CSS specification default */
div { display: initial; } /* reset to inline */

/* unset: inherited properties use inherit; non-inherited use initial */
* { all: unset; } /* clear all styles */

/* revert: reset to the browser default style */
button { all: revert; } /* restore the browser's default button style */`,
              },
              {
                title: 'The all property',
                content: 'The all property resets every property at once (except direction and unicode-bidi) and is often used for component isolation.',
                code: `/* Reset every style of a third-party component */
.widget {
  all: unset;       /* clear everything */
  all: initial;     /* reset to spec defaults */
  all: revert;      /* restore browser defaults */
}`,
              },
            ],
          },
        },
        {
          id: 'p15-3',
          type: 'callout',
          variant: 'tip',
          title: 'Leverage inheritance to write less',
          text: 'Set font-family, color, and line-height on body or the root container and children inherit them automatically. Avoid repeating these properties on every element.',
        },
      ],
    },

    // ========================================================================
    // KP 17: Float & Clearing Floats
    // ========================================================================
    {
      order: 17,
      title: 'Float & Clearing Floats',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          text: 'float was once the primary CSS layout mechanism and has now been replaced by Flex/Grid. However, understanding floats and how to clear them is still useful — they still have a place in cases like wrapping text around images.',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Clear-fix solution',
            columns: ['overflow: hidden', 'clearfix (::after)', 'display: flow-root', 'clear: both'],
            rows: [
              { feature: 'How it works', values: ['Triggers a BFC to wrap floats', 'Pseudo-element clears', 'Modern BFC approach', 'Adds an empty element after the float'] },
              { feature: 'Lines of code', values: ['1 line', '4-5 lines', '1 line', 'Extra HTML required'] },
              { feature: 'Side effects', values: ['May clip children', 'None', 'None', 'Extra DOM node'] },
              { feature: 'Compatibility', values: ['Universal', 'Universal', 'Not in IE11', 'Universal'] },
              { feature: 'Recommendation', values: ['Medium', 'High (compatibility scenarios)', 'High (modern projects)', 'Low'] },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'p16-3',
          type: 'code',
          language: 'css',
          filename: 'Clearing floats',
          code: `/* Option 1: overflow triggers a BFC (has side effects) */
.parent { overflow: hidden; }

/* Option 2: classic clearfix (recommended for compatibility) */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

/* Option 3: flow-root (modern recommendation) */
.parent { display: flow-root; }

/* Option 4: extra element (not recommended) */
<div style="clear: both;"></div>

/* A legitimate use of float: wrapping text around an image */
.article img {
  float: left;
  margin-right: 16px;
  margin-bottom: 8px;
}`,
        },
        {
          id: 'p16-4',
          type: 'callout',
          variant: 'note',
          title: 'float has left the layout stage',
          text: 'Modern layouts use Flex/Grid. float is now reserved for its original purpose — wrapping text around images. Do not use float for overall page layout anymore.',
        },
      ],
    },

    // ========================================================================
    // KP 18: Backgrounds & Gradients
    // ========================================================================
    {
      order: 18,
      title: 'Backgrounds & Gradients',
      difficulty: 2,
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS background properties control the background layer of an element. Backgrounds support solid colors, images, and gradients, and multiple layers can be stacked. Gradients are one of CSS\'s most powerful visual capabilities.',
        },
        {
          id: 'p17-2',
          type: 'code',
          language: 'css',
          filename: 'Background properties',
          code: `/* Background shorthand */
.box {
  background: #fff url('bg.png') no-repeat center/cover;
  /* equivalent to: */
  background-color: #fff;
  background-image: url('bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; /* cover fills | contain fits entirely */
}

/* Multiple layers (comma-separated; first layer is on top) */
.card {
  background:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), /* overlay mask */
    url('photo.jpg') center/cover;                       /* image layer */
}`,
        },
        {
          id: 'p17-3',
          type: 'heading',
          level: 3,
          text: 'Linear Gradients',
        },
        {
          id: 'p17-4',
          type: 'code',
          language: 'css',
          code: `/* Basic linear gradient */
background: linear-gradient(to right, #1ed760, #1a1a1a);
background: linear-gradient(90deg, #1ed760, #1a1a1a);

/* Multi-color gradient */
background: linear-gradient(to right, red, yellow, green);

/* Color stop positions */
background: linear-gradient(to right, #1ed760 0%, #1a1a1a 100%);
background: linear-gradient(45deg, #1ed760 20%, #1a1a1a 80%);

/* Repeating linear gradient */
background: repeating-linear-gradient(45deg, #1ed760, #1ed760 10px, #1a1a1a 10px, #1a1a1a 20px);`,
        },
        {
          id: 'p17-5',
          type: 'heading',
          level: 3,
          text: 'Radial & Conic Gradients',
        },
        {
          id: 'p17-6',
          type: 'code',
          language: 'css',
          code: `/* Radial gradient: from center outward */
background: radial-gradient(circle, #1ed760, #1a1a1a);
background: radial-gradient(circle at top left, #1ed760, #1a1a1a);
background: radial-gradient(circle 100px at 50% 50%, #1ed760, #1a1a1a);

/* Conic gradient: rotating around the center */
background: conic-gradient(from 0deg, red, yellow, green, blue, red);

/* Useful: checkerboard background */
background:
  conic-gradient(#ccc 25%, transparent 0 50%, #ccc 0 75%, transparent 0) 0 0/20px 20px;`,
        },
      ],
    },

    // ========================================================================
    // KP 19: Mastery Recommendations for CSS Topics (SkillBar)
    // ========================================================================
    {
      order: 19,
      title: 'Mastery Recommendations for CSS Topics',
      difficulty: 1,
      visualizationType: 'skillbar',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          text: 'CSS covers many topics, and they differ in frequency and importance. The recommendations below help you allocate your learning effort across the core knowledge points.',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'skillbar',
          data: {
            skills: [
              { name: 'Selectors & Specificity', level: 95, description: 'High frequency in daily work; must master' },
              { name: 'Box Model & box-sizing', level: 95, description: 'Layout foundation; must master' },
              { name: 'Flexbox Layout', level: 90, description: 'Modern layout first choice; must be fluent' },
              { name: 'Grid Layout', level: 85, description: '2D layout power tool; recommended' },
              { name: 'Positioning System', level: 85, description: 'Common in popovers / fixed nav; must be fluent' },
              { name: 'Responsive & Media Queries', level: 80, description: 'Essential for mobile; recommended fluency' },
              { name: 'CSS Variables', level: 75, description: 'Foundation of theming; recommended' },
              { name: 'Animations & Transforms', level: 70, description: 'Improves UX; learn on demand' },
              { name: 'BFC / Stacking Context', level: 60, description: 'For debugging; understanding the concept is enough' },
              { name: 'Gradients & Backgrounds', level: 55, description: 'Visual enhancement; look up as needed' },
            ],
          },
        },
        {
          id: 'p18-3',
          type: 'callout',
          variant: 'tip',
          title: 'Study advice',
          text: 'Master selectors, the box model, and Flexbox first — they cover 80% of daily layout needs. For BFC and stacking contexts, focus on understanding the concepts so you can troubleshoot when issues arise.',
        },
      ],
    },

    // ========================================================================
    // KP 20: Hands-on — Responsive Card Layout Page (task-driven assertion sandbox)
    // ========================================================================
    {
      order: 20,
      title: 'Hands-on: Responsive Card Layout Page',
      difficulty: 3,
      blocks: [
        {
          id: 'p20proj-1',
          type: 'paragraph',
          lead: true,
          text: 'We have studied selectors, the box model, Flex/Grid, responsive design, and the unit system — these are discrete building blocks. Now it is time to follow the "assembly blueprint" and put them together. This section is the first hands-on project: build a responsive card layout page from scratch. You will combine CSS variables (theme colors), Grid 2D layout, media-query responsiveness, and the unit system (rem/clamp). The sandbox on the right ships with a built-in "task checklist" — as you write code, it tells you in real time which items are not yet met and how to fix them. This is the key step from "understanding" to "being able to write".',
        },
        {
          id: 'p20proj-2',
          type: 'paragraph',
          text: 'Task requirements: use Grid to build a card grid (3 columns on desktop, 2 on tablet, 1 on mobile); define theme colors with CSS variables; give the cards rounded corners and shadows; use clamp() for the heading so the font size adapts.',
        },
        {
          id: 'p20proj-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Write HTML + inline CSS in the editor below. The task checklist validates your code in real time and gives hints — pass every item to complete the task. You can click "Reset" at any time to revert to the initial skeleton.',
            initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Responsive Card Layout</title>
  <style>
    /* Define theme colors with CSS variables */

    /* Card grid container: use Grid layout */

    /* Single card style: rounded corners + shadow */

    /* Heading: clamp for adaptive font size */

    /* Responsive: tablet 2 columns, mobile 1 column */

  </style>
</head>
<body>
  <h1>Card Layout</h1>
  <div class="grid">
    <article class="card">Card 1</article>
    <article class="card">Card 2</article>
    <article class="card">Card 3</article>
  </div>
</body>
</html>`,
            checks: [
              {
                description: 'Define CSS variables in :root (e.g. --primary)',
                pattern: ':root\\s*\\{[^}]*--[a-z]',
                hint: 'Define the theme color variable inside :root { --primary: #3366cc; }. CSS variables start with --; :root is the global scope.',
              },
              {
                description: 'Reference CSS variables with var()',
                pattern: 'var\\(--',
                hint: 'Reference the variable with var(--primary) instead of hard-coding the color. This is the key to theming.',
              },
              {
                description: 'Define the grid container with display: grid',
                pattern: 'display:\\s*grid',
                hint: 'Set display: grid on the grid container. Grid is suited for 2D layouts (controlling rows and columns at once) and is a better fit for card grids than Flex.',
              },
              {
                description: 'Define columns with grid-template-columns (using repeat/auto-fit/minmax)',
                pattern: 'grid-template-columns\\s*:\\s*[^;]*(repeat|auto-fit|minmax)',
                hint: 'Recommended: grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); — this single line creates an auto-responsive grid: more columns on wide screens, fewer on narrow ones, with no media queries.',
              },
              {
                description: 'Set grid spacing with gap',
                pattern: 'gap\\s*:\\s*\\d',
                hint: 'Use gap: 16px; for row and column spacing. gap replaces the old margin-based spacing and works for both Flex and Grid.',
              },
              {
                description: 'Cards have rounded corners (border-radius)',
                pattern: 'border-radius\\s*:\\s*\\d',
                hint: 'Add border-radius: 12px; to soften the look. Rounded corners are a foundational modern UI language.',
              },
              {
                description: 'Cards have a shadow (box-shadow)',
                pattern: 'box-shadow\\s*:',
                hint: 'Add box-shadow: 0 2px 8px rgba(0,0,0,0.1); to create depth. Shadows make cards "float".',
              },
              {
                description: 'Heading uses clamp() for adaptive font size',
                pattern: 'clamp\\s*\\(',
                hint: 'Use font-size: clamp(1.5rem, 4vw, 2.5rem); on the heading so the size flows from 1.5rem on small screens up to a 2.5rem cap on large ones.',
              },
              {
                description: 'Use @media media queries (or rely on auto-fit for implicit responsiveness)',
                pattern: '@media|minmax\\s*\\(\\s*\\d',
                hint: 'auto-fit + minmax already provides implicit responsiveness; you can also add an explicit @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }.',
              },
            ],
          },
        },
        {
          id: 'p20proj-4',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'It connects four chapters — Grid + Responsive + CSS Variables + Unit System — into a real artifact. When you finish, you will see that repeat(auto-fit, minmax(...)) achieves a media-query-free responsive grid in a single line — that is the power of modern CSS. This "assembly" experience is engineering thinking that memorizing properties cannot replace.',
        },
      ],
    },

    // ========================================================================
    // KP 21: Hands-on — Themed Navbar (task-driven assertion sandbox)
    // ========================================================================
    {
      order: 21,
      title: 'Hands-on: Themed Navbar',
      difficulty: 3,
      blocks: [
        {
          id: 'p21proj-1',
          type: 'paragraph',
          lead: true,
          text: 'The previous project was a display-type layout. Now we build an interactive one — a themed navbar that combines CSS variables (theme switching), the positioning system (sticky fixed), the stacking context (z-index layering), and Flexbox (arranging nav items). This is the second "blueprint": welding together the "Variables + Positioning + Stacking + Flex" chapters. As before, the sandbox\'s task checklist validates your code in real time and provides teaching feedback.',
        },
        {
          id: 'p21proj-2',
          type: 'paragraph',
          text: 'Task requirements: build a navbar fixed at the top, define theme colors with CSS variables (primary + hover), lay out nav items horizontally with Flexbox, fix it with position: sticky, ensure it is not covered by content using z-index, and add a hover transition animation.',
        },
        {
          id: 'p21proj-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Write the themed navbar HTML + CSS. The task checklist validates in real time — pass every item to complete the task. Focus on CSS variables, sticky positioning, and z-index layering.',
            initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Themed Navbar</title>
  <style>
    /* Define theme colors with CSS variables */

    /* Navbar: sticky fixed + z-index layering */

    /* Lay out nav items horizontally with Flexbox */

    /* Hover transition animation */

  </style>
</head>
<body>
  <nav class="navbar">
    <a href="#" class="nav-item">Home</a>
    <a href="#" class="nav-item">Articles</a>
    <a href="#" class="nav-item">About</a>
  </nav>
  <main style="height: 2000px;">Scroll the page to see the navbar stay fixed</main>
</body>
</html>`,
            checks: [
              {
                description: 'Define at least 2 CSS variables in :root (primary + hover)',
                pattern: ':root\\s*\\{[^}]*--[a-z][^}]*--[a-z]',
                hint: 'Define --primary and --primary-hover inside :root for easy theme switching. E.g. :root { --primary: #3366cc; --primary-hover: #2a5299; }',
              },
              {
                description: 'Reference CSS variables with var()',
                pattern: 'var\\(--',
                hint: 'Use var(--primary) for the navbar background or text color instead of hard-coding.',
              },
              {
                description: 'Fix the navbar with position: sticky',
                pattern: 'position:\\s*sticky',
                hint: 'Use position: sticky; top: 0; on the navbar to fix it at the top. sticky stays in flow and is better than fixed for navbars (does not cover content).',
              },
              {
                description: 'Pair sticky with top: 0',
                pattern: 'top:\\s*0',
                hint: 'sticky requires top: 0 to "stick" when scrolled to the top. Without a top value sticky does not take effect.',
              },
              {
                description: 'Lay out nav items horizontally with display: flex',
                pattern: 'display:\\s*flex',
                hint: 'Use display: flex; on the navbar to arrange .nav-item horizontally. Use gap for spacing and justify-content for alignment.',
              },
              {
                description: 'Use z-index to keep the navbar on the top layer',
                pattern: 'z-index\\s*:\\s*\\d',
                hint: 'Add z-index: 100; to the navbar so content does not cover it when scrolling. Note: z-index only works together with sticky/fixed (positioning must be set first).',
              },
              {
                description: 'Use transition for hover animation',
                pattern: 'transition\\s*:',
                hint: 'Add transition: background-color 0.2s, color 0.2s; to .nav-item so the hover state changes smoothly. transition is the "animation of state changes".',
              },
              {
                description: 'Nav items have a :hover state',
                pattern: ':hover\\s*\\{',
                hint: 'Define hover styles with .nav-item:hover { ... }, such as color change or underline. :hover is the foundation of interactive feedback.',
              },
            ],
          },
        },
        {
          id: 'p21proj-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection after the exercise: traps of sticky and stacking contexts',
          text: 'After this exercise, watch for two common traps: ① sticky not working — if an ancestor has overflow: hidden or insufficient height, sticky will not take effect; this is the most frequent "why won\'t it stick" issue; ② z-index not working — if the navbar\'s parent creates a new stacking context with a lower z-index, the child navbar cannot exceed the parent boundary no matter how large its z-index. When debugging, check overflow and stacking contexts along the parent chain first.',
        },
      ],
    },

    // ========================================================================
    // KP 22: Interview Questions
    // ========================================================================
    {
      order: 22,
      title: 'Interview Questions',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p22iv-1',
          type: 'paragraph',
          text: 'A curated set of high-frequency CSS fundamentals interview questions, covering selectors, the box model, layout, positioning, responsive design, animations, and other core topics. Click to expand and see the reference answer.',
        },
        {
          id: 'p22iv-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: How is CSS selector specificity calculated?',
                content: 'Specificity is a four-digit tuple (a, b, c, d):\n- a = inline style (1/0)\n- b = number of IDs\n- c = number of classes / pseudo-classes / attribute selectors\n- d = number of elements / pseudo-elements\n\nCompare digit by digit from left to right; e.g. (0,1,1,0) > (0,0,2,1). !important overrides everything. When specificity is equal, the later rule in source order wins.',
              },
              {
                title: 'Q2: What is the box model? How do standard and quirks (IE) modes differ?',
                content: 'Four layers: content → padding → border → margin.\n\nStandard (W3C):\n- width covers only content.\n- Actual occupied width = width + padding + border + margin.\n\nQuirks (IE):\n- width covers content + padding + border.\n- Actual occupied width = width + margin.\n\nUse box-sizing: border-box to switch to the IE model so width is the "visible width" — more intuitive. The recommended global reset is *{box-sizing:border-box}.',
              },
              {
                title: 'Q3: What is a BFC? How do you trigger it? What is it good for?',
                content: 'A BFC (Block Formatting Context) is an isolated rendering area whose internal elements do not affect the outside.\n\nTriggers:\n- float is not none\n- position: absolute / fixed\n- overflow is not visible\n- display: flow-root / flex / grid / etc.\n\nUse cases:\n1. Clearing floats — a BFC includes floating children when computing height.\n2. Avoiding margin collapse — different BFCs do not collapse.\n3. Preventing text from wrapping around a float — a BFC does not overlap with floats.\n\nThe modern recommendation is display:flow-root — it triggers a BFC with no side effects.',
              },
              {
                title: 'Q4: What causes margin collapse and how do you avoid it?',
                content: 'Collapse conditions:\n1. Adjacent block-level elements (siblings or parent/child) with vertical margins.\n2. Inside the same BFC.\n\nThe collapse takes the larger value (not the sum).\n\nAvoidance:\n1. Trigger a new BFC (overflow:hidden / display:flow-root).\n2. Separate with padding/border.\n3. Use Flex/Grid (children do not collapse).\n4. Insert an inline element or gap between them.\n\nNote: horizontal margins do not collapse; floated / absolutely positioned elements do not collapse.',
              },
              {
                title: 'Q5: Difference between Flexbox and Grid? When to use which?',
                content: 'They differ in dimensionality:\n\nFlexbox:\n- One-dimensional (one row or one column at a time).\n- Good for linear arrangement inside components: navbars, toolbars, button groups, form items.\n\nGrid:\n- Two-dimensional (rows and columns at once).\n- Good for overall page skeletons: header/main/footer, card grids, complex table layouts.\n\nBest used together: Grid for page skeleton, Flex for components.\n\nRule of thumb: a single row/column → Flex; a row/column grid → Grid.',
              },
              {
                title: 'Q6: Differences among the five position values? What triggers sticky?',
                content: 'Five values:\n1. static — default; in normal flow.\n2. relative — offset from its original position; in flow.\n3. absolute — relative to the nearest non-static ancestor; out of flow.\n4. fixed — relative to the viewport; out of flow.\n5. sticky — behaves as static before the threshold, as fixed after; stays in flow.\n\nsticky triggers:\n1. At least one of top/right/bottom/left must be set.\n2. No ancestor may have overflow:hidden/auto.\n3. The ancestor must be taller than the sticky element.\n\n90% of sticky failures come from ancestor overflow.',
              },
              {
                title: 'Q7: What is a stacking context? Why does z-index "not work"?',
                content: 'A stacking context is a container that defines an element\'s level on the Z-axis.\n\nCreation conditions:\n- position + z-index not auto\n- opacity < 1\n- transform / filter / perspective not none\n- position: fixed / sticky\n- will-change, etc.\n\nKey rule: z-index is compared only within the same stacking context. When a parent creates a stacking context, the child\'s z-index only applies inside the parent, and the parent participates as a single unit in the outer comparison.\n\nTroubleshooting: a z-index:999 child being covered by a z-index:1 element is usually caused by the parent having a lower stacking context — inspect the parent chain.',
              },
              {
                title: 'Q8: How do you vertically center an element?',
                content: 'Common methods:\n1. Flex: display:flex; align-items:center; justify-content:center; (recommended, simplest)\n2. Grid: display:grid; place-items:center; (shortest)\n3. Absolute + transform: position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); (good for known sizes)\n4. Absolute + margin:auto (needs width/height set)\n5. line-height (single-line text)\n6. table-cell + vertical-align (legacy)\n\nFlex/Grid are the modern defaults.',
              },
              {
                title: 'Q9: Core responsive design strategies? Mobile-first vs desktop-first?',
                content: 'Core strategies:\n1. Media queries @media (switch styles at breakpoints)\n2. Flexible layouts: Flex/Grid\n3. Responsive units: rem/em/vw/vh/%\n4. Responsive images: srcset/<picture>\n5. Functions: clamp()/min()/max()\n\nMobile-first: default styles target small screens; use min-width to enhance upward (progressive enhancement).\nDesktop-first: default styles target large screens; use max-width to scale downward.\n\nMobile-first is recommended — the default styles are leaner and it matches the "content-first" philosophy.',
              },
              {
                title: 'Q10: CSS variables vs Sass/Less variables?',
                content: 'CSS variables (--var):\n1. Dynamic at runtime; readable and writable from JS (getPropertyValue/setProperty).\n2. Follow inheritance and cascade rules.\n3. Native to the browser; no compilation needed.\n4. Can be redefined inside media queries for responsive behavior.\n\nSass/Less variables ($var / @var):\n1. Static at compile time; immutable after compilation.\n2. Do not follow inheritance.\n3. Require a preprocessor.\n\nModern projects prefer CSS variables; Sass variables are still useful for compile-time logic (e.g. loops that generate styles). The two can coexist.',
              },
              {
                title: 'Q11: Differences among em, rem, px, vw/vh? When to use which?',
                content: 'Unit comparison:\n- px: absolute; precise but does not scale.\n- em: relative to the parent\'s font-size; compounds when nested, easy to lose control.\n- rem: relative to the root html\'s font-size; globally adjustable; recommended for font sizes.\n- vw/vh: 1% of viewport width/height; good for full-screen layouts.\n- %: relative to the parent.\n- clamp(min, preferred, max): responsive font size.\n\nRecommendations:\n- Font sizes: rem (pair with html{font-size:62.5%} so 1rem=10px for easy math)\n- Spacing: px / rem\n- Full screen: vw/vh\n- Responsive font size: clamp()',
              },
              {
                title: 'Q12: Difference between transition and animation?',
                content: 'transition:\n- A transition between states (needs a trigger like :hover).\n- Only two keyframes (start and end); auto-fires.\n- Good for smooth "state A → B" switches (button hover).\n\nanimation:\n- Keyframe animation (@keyframes).\n- Supports multiple frames, auto-play, loop, and pause.\n- Good for continuous / complex animations (loading spinners, bounces).\n\nPerformance: prefer transform/opacity (GPU-accelerated); avoid animating width/height/top/left (triggers reflow).',
              },
              {
                title: 'Q13: Scenario — a page is janky; which CSS performance issues do you check?',
                content: 'CSS performance checklist:\n1. Properties that trigger reflow: avoid animating width/height/top/left/margin; use transform instead (repaint only).\n2. Complex selectors: avoid deep nesting (e.g. .a .b .c .d) — selectors match right-to-left, deeper is slower.\n3. Heavy shadows/filters: box-shadow/filter are GPU-heavy; large-scale use is jank-prone.\n4. will-change abuse: add it only on elements being animated, not globally.\n5. @import blocking: CSS loaded via @import is serial; switch to <link> for parallel loading.\n6. Missing contain / content-visibility for long lists.\n\nUse the DevTools Performance panel to locate the bottleneck.',
              },
              {
                title: 'Q14: Scenario — how would you refactor a float + clearfix layout and why?',
                content: 'Convert the float layout to Flexbox or Grid.\n\nReasons:\n1. float was designed for wrapping text around images; using it for layout is a "misuse" that needs clearfix hacks.\n2. Flex/Grid are designed for layout — no clearing needed, less code, more intuitive.\n3. Flex/Grid children do not have margin collapse, so behavior is more predictable.\n4. Flex/Grid support alignment / ordering / wrapping that float cannot.\n\nAfter the refactor, remove every clearfix, float, and clear rule.',
              },
              {
                title: 'Q15: Comparison — display:none vs visibility:hidden vs opacity:0?',
                content: 'Differences:\n\ndisplay:none:\n- Removed from the render tree; takes no space.\n- Not interactive.\n- Triggers reflow (both reflow and repaint).\n\nvisibility:hidden:\n- Keeps its space.\n- Not interactive.\n- Repaint only.\n\nopacity:0:\n- Keeps its space.\n- Still interactive (clickable!).\n- Repaint only; best performance.\n\nUse:\n1. Hide entirely: display:none.\n2. Hide with space preserved: visibility:hidden.\n3. Transparent transition: opacity:0 + transition.\n\nNote: an opacity:0 element still receives events — pair with pointer-events:none.',
              },
              {
                title: 'Q16: Comparison — pseudo-classes vs pseudo-elements? Examples of each.',
                content: 'Pseudo-classes (:): select elements in a particular state; single colon.\n- :hover (hover)\n- :focus (focus)\n- :first-child (first child)\n- :nth-child(n)\n\nPseudo-elements (::): create virtual elements not present in the DOM; double colon.\n- ::before / ::after (insert content before/after an element)\n- ::first-letter (first letter)\n- ::selection (selected text style)\n\nDifference: a pseudo-class selects a state of an existing element; a pseudo-element creates a new element. CSS3 specifies double colons for pseudo-elements and single colons for pseudo-classes (::before also accepts :before for compatibility).',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 23: Knowledge Point Cheat Sheet
    // ========================================================================
    {
      order: 23,
      title: 'Knowledge Point Cheat Sheet',
      difficulty: 1,
      blocks: [
        {
          id: 'p23cs-1',
          type: 'paragraph',
          text: 'A quick-reference cheat sheet for the core knowledge points of CSS fundamentals.',
        },
        {
          id: 'p23cs-2',
          type: 'table',
          caption: 'CSS Fundamentals Cheat Sheet',
          headers: ['Topic', 'Key points', 'Common properties / values'],
          rows: [
            ['Ways to include', 'External stylesheet preferred; separate style from structure', '<link> <style> style=""'],
            ['Selectors', 'Basic / combinators / pseudo-classes / pseudo-elements', '.class #id :hover ::before [attr]'],
            ['Specificity', 'Four-digit (a,b,c,d); !important overrides all', 'inline > ID > class > element'],
            ['Box model', 'content → padding → border → margin', 'box-sizing width padding border'],
            ['BFC', 'Isolated render area; clears floats / avoids margin collapse', 'overflow:hidden display:flow-root float'],
            ['Flexbox', '1D layout; main axis / cross axis', 'display:flex justify-content align-items flex:1'],
            ['Grid', '2D layout; controls rows and columns at once', 'display:grid grid-template-columns gap'],
            ['Positioning', 'static / relative / absolute / fixed / sticky', 'position top/right/bottom/left z-index'],
            ['Stacking context', 'z-index compares only within the same context', 'opacity<1 transform position+z-index'],
            ['Responsive', 'Media queries + flexible layout + responsive units', '@media clamp() vw/vh rem'],
            ['Units', 'px absolute / em relative-parent / rem relative-root / vw viewport', 'px em rem vw vh % clamp()'],
            ['Animations', 'transition for state changes / animation for keyframes', 'transition @keyframes animation transform'],
            ['CSS variables', 'Dynamic at runtime; readable/writable from JS', '--var: value; var(--var)'],
            ['Inheritance', 'Some properties inherit automatically (color/font, etc.)', 'inherit initial unset all'],
            ['Float', 'Has left the layout stage; replaced by Flex/Grid', 'float clear display:flow-root'],
          ],
        },
      ],
    },

    // ========================================================================
    // KP 24: CSS Quiz (QuizCard)
    // ========================================================================
    {
      order: 24,
      title: 'CSS Quiz',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          text: 'Use the quiz below to test your grasp of the core CSS concepts. Each question comes with a detailed explanation.',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'Which of the following selectors has the highest specificity?',
                options: [
                  '#nav .item',
                  'div.item:hover',
                  '.list > .item',
                  'nav div.item',
                ],
                correctIndex: 0,
                explanation: '#nav .item has specificity (0,1,1,0) — it contains one ID. The other options max out at (0,0,2,1) or (0,0,1,2), all lower than a single ID selector. One ID beats any number of classes.',
              },
              {
                question: 'Under box-sizing: border-box, an element with width: 200px, padding: 20px, border: 1px has what actual content width?',
                options: ['200px', '242px', '158px', '160px'],
                correctIndex: 2,
                explanation: 'Under border-box, width includes padding and border. Content width = 200 - 20*2 - 1*2 = 158px. The total occupied width is still 200px.',
              },
              {
                question: 'Which of the following properties creates a new stacking context?',
                options: [
                  'position: relative; z-index: auto;',
                  'opacity: 0.99;',
                  'overflow: hidden;',
                  'display: block;',
                ],
                correctIndex: 1,
                explanation: 'opacity less than 1 creates a new stacking context. position: relative only creates one when paired with a non-auto z-index. overflow and display: block do not create a stacking context.',
              },
              {
                question: 'What is the modern recommended way to clear floats?',
                options: [
                  'overflow: hidden',
                  'An extra empty element with clear: both',
                  'display: flow-root',
                  'float: clear',
                ],
                correctIndex: 2,
                explanation: 'display: flow-root is purpose-built to trigger a BFC with no side effects — the recommended modern approach. overflow: hidden may clip children; the empty-element approach needs extra DOM.',
              },
              {
                question: 'flex: 1 is equivalent to?',
                options: [
                  'flex: 1 1 auto',
                  'flex: 1 1 0%',
                  'flex: 0 1 1%',
                  'flex: 1 0 auto',
                ],
                correctIndex: 1,
                explanation: 'flex: 1 is equivalent to flex: 1 1 0% — flex-grow:1 (can grow), flex-shrink:1 (can shrink), flex-basis:0% (base size 0). Multiple items with flex:1 split the container space equally.',
              },
              {
                question: '[Understanding] Which statement about BFC (Block Formatting Context) is correct?',
                options: [
                  'Elements inside and outside a BFC affect each other\'s margins',
                  'A BFC region does not overlap with floating elements',
                  'Children inside a BFC leave the document flow',
                  'A float element is itself a BFC by default',
                ],
                correctIndex: 1,
                explanation: 'A BFC is an isolated render area whose internal elements do not affect the outside. Key properties: ① internal margins do not collapse with the outside; ② a BFC region does not overlap with floats (the basis of clearing floats); ③ floating children are included when computing height. Triggers: overflow not visible, float, position:absolute/fixed, display:flow-root, etc.',
              },
              {
                question: '[Understanding] Under the standard box model, an element with width:300px, padding:15px, border:5px occupies how much total width?',
                options: ['300px', '330px', '340px', '320px'],
                correctIndex: 2,
                explanation: 'In the standard model, width covers only content. Total width = 300 + left/right padding (15×2=30) + left/right border (5×2=10) = 340px. With box-sizing:border-box, the total width would be 300px (width includes padding + border).',
              },
              {
                question: '[Comparison] What is the core difference between Flexbox and Grid?',
                options: [
                  'Flex is 2D, Grid is 1D',
                  'Flex is 1D, Grid is 2D',
                  'They are identical, just different names',
                  'Flex is for responsive, Grid is for fixed layouts',
                ],
                correctIndex: 1,
                explanation: 'Flexbox is one-dimensional (one row or column at a time) — good for linear arrangements like navbars and toolbars. Grid is two-dimensional (rows and columns at once) — good for overall page skeletons and card grids. They are complementary and often used together: Grid for the page skeleton, Flex for components.',
              },
              {
                question: '[Comparison] Difference between em and rem?',
                options: [
                  'em is relative to the root, rem is relative to the parent',
                  'em is relative to the parent\'s font-size, rem is relative to the root html\'s font-size',
                  'Both are relative to the root',
                  'em is absolute, rem is relative',
                ],
                correctIndex: 1,
                explanation: 'em is relative to the parent\'s (or the element\'s own) font-size and compounds when nested, making it easy to lose control. rem is always relative to the root html\'s font-size — globally adjustable and more predictable. Use rem for font sizes and em for local scaling inside a component (e.g. aligning icons with text).',
              },
              {
                question: '[Application] To build a navbar fixed at the top that stays visible while scrolling, use?',
                options: [
                  'position: absolute; top: 0;',
                  'position: relative; top: 0;',
                  'position: sticky; top: 0;',
                  'position: static; top: 0;',
                ],
                correctIndex: 2,
                explanation: 'position: sticky "sticks" at top:0 when scrolled, is positioned relative to the nearest scrolling ancestor, and stays in the document flow (no layout shift) — the first choice for fixed navbars. absolute leaves the flow and disappears on scroll; relative/static cannot fix the element. sticky requires the parent to have no overflow:hidden and enough height.',
              },
              {
                question: '[Application] To make a paragraph\'s font size scale automatically (min 16px, preferred 4vw, max 24px) across screen widths, use?',
                options: [
                  'font-size: 4vw;',
                  'font-size: calc(16px + 4vw);',
                  'font-size: clamp(16px, 4vw, 24px);',
                  'font-size: min(16px, 4vw);',
                ],
                correctIndex: 2,
                explanation: 'clamp(min, preferred, max) lets the value flow within the range: 16px on small screens (no smaller than the min), 4vw in the middle, capped at 24px on large screens. This is the standard recipe for responsive font sizes and avoids text that is too large or too small at extreme widths.',
              },
              {
                question: '[Scenario] Two adjacent block elements have their vertical margins collapse (20px + 30px only shows 30px). How do you avoid this?',
                options: [
                  'Set display: inline on the elements',
                  'Trigger a BFC on one of them with overflow: hidden or display: flow-root',
                  'Increase the margin values',
                  'Use padding instead of margin (does not work)',
                ],
                correctIndex: 1,
                explanation: 'Margin collapse happens only between adjacent block-level elements inside the same BFC. Triggering a new BFC on one element (overflow:hidden / display:flow-root / float, etc.) puts them in different BFCs and the collapse disappears. Note: Flex/Grid children do not collapse, which is one more benefit of using Flex over traditional layouts.',
              },
              {
                question: '[Scenario] A child has z-index: 999 but is still covered by another element with z-index: 1. The most likely cause is?',
                options: [
                  'The z-index value is not large enough',
                  'The parent created a new stacking context, so the child\'s z-index only applies inside the parent\'s context',
                  'The browser does not support z-index',
                  'You need to add position: relative',
                ],
                correctIndex: 1,
                explanation: 'z-index is compared only within the same stacking context. If the parent creates a stacking context (e.g. opacity<1, transform, position+z-index), the child participates as a single stacking unit at the parent level — the child\'s z-index:999 cannot exceed the parent boundary. Troubleshoot: check who creates a stacking context along the parent chain.',
              },
              {
                question: '[Scenario] A mobile button\'s tap target is too small (< 44px). From a CSS perspective, what should you do?',
                options: [
                  'Only reduce font-size',
                  'Set min-height/min-width ≥ 44px and use padding to expand the tappable area',
                  'Use transform: scale to enlarge visually without changing the size',
                  'Add cursor: pointer',
                ],
                correctIndex: 1,
                explanation: 'WCAG recommends touch targets ≥ 44×44px (Apple HIG standard). Set min-height/min-width to guarantee the minimum size and use padding to expand the tappable area, not just the visual. transform: scale only scales visually and does not affect the layout click area. Also avoid using hover to trigger critical interactions on mobile (no mouse).',
              },
              {
                question: '[Comprehensive] Which statement about CSS variables (custom properties) is WRONG?',
                options: [
                  'You can define global variables in :root and reference them with var()',
                  'Variables participate in runtime computation and can be modified by JS',
                  'CSS variables follow inheritance rules and can be overridden in child elements',
                  'CSS variables must be declared starting with $',
                ],
                correctIndex: 3,
                explanation: 'CSS variables start with -- (e.g. --primary: #3366cc) and are referenced via var(--primary). $ is the variable syntax of preprocessors like Sass, not native CSS. CSS variables are dynamic at runtime, readable/writable from JS (getPropertyValue/setProperty), follow inheritance, and support fallback values var(--x, fallback).',
              },
            ],
          },
        },
        {
          id: 'p19-3',
          type: 'callout',
          variant: 'tip',
          title: 'Quiz complete',
          text: 'If you got everything right, you have mastered the core CSS concepts. For any misses, review the corresponding knowledge point in detail. The key to CSS is practice — write and debug a lot.',
        },
      ],
    },
  ],
}
