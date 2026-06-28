/**
 * Module 01: HTML Fundamentals (English version)
 *
 * Full English translation of html-fundamentals.ts.
 * Loaded by moduleRegistry when locale === 'en'.
 */
import type { ModuleMeta } from '../lib/types'

export const htmlFundamentalsModule: ModuleMeta = {
  number: '01',
  title: 'HTML Fundamentals',
  slug: 'html-fundamentals',
  stage: 'basics',
  stageLabel: 'Foundation · Module 1',
  icon: '01',
  summary:
    'HTML document structure, semantic tags, forms, accessibility, and HTML5 APIs.',
  knowledgePointCount: 24,
  visualizationCount: 27,
  points: [
    // ========================================================================
    // KP 1: HTML Definition & Purpose
    // ========================================================================
    {
      order: 1,
      title: 'HTML Definition & Purpose',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'HTML (HyperText Markup Language) is the standard markup language for building Web pages. It describes the structure and content of a page, which browsers parse and render into what users see.',
        },
        {
          id: 'p1-kg',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'html', label: 'HTML Core', group: 'core', weight: 3 },
              { id: 'semantic', label: 'Semantic Tags', group: 'related', weight: 2 },
              { id: 'form', label: 'Form Elements', group: 'related', weight: 2 },
              { id: 'table', label: 'Tables', group: 'related', weight: 2 },
              { id: 'a11y', label: 'Accessibility (a11y)', group: 'related', weight: 2 },
              { id: 'media', label: 'Multimedia', group: 'related', weight: 2 },
              { id: 'api', label: 'HTML5 APIs', group: 'related', weight: 2 },
              { id: 'path', label: 'Paths & Links', group: 'detail' },
            ],
            edges: [
              { source: 'html', target: 'semantic', label: 'structure' },
              { source: 'html', target: 'form', label: 'input' },
              { source: 'html', target: 'table', label: 'data' },
              { source: 'html', target: 'a11y', label: 'inclusion' },
              { source: 'html', target: 'media', label: 'rich media' },
              { source: 'html', target: 'api', label: 'capabilities' },
              { source: 'html', target: 'path', label: 'navigation' },
            ],
          },
        },
        {
          id: 'p1-2',
          type: 'heading',
          level: 3,
          text: 'Understanding the Three Keywords',
        },
        {
          id: 'p1-3',
          type: 'list',
          items: [
            'HyperText: the ability to jump to other documents or resources via links, going beyond plain text.',
            'Markup: a set of tags used to annotate content, telling the browser how to present it.',
            'Language: HTML is a formalized markup language with strict syntax (maintained by W3C / WHATWG).',
          ],
        },
        {
          id: 'p1-4',
          type: 'callout',
          variant: 'note',
          title: 'HTML Is Not a Programming Language',
          text: 'HTML is a markup language, not a programming language — it has no variables, loops, or conditionals. Its job is to "describe what content is," not "how to compute." Logic is handled by JavaScript; styling by CSS.',
        },
        {
          id: 'p1-5',
          type: 'heading',
          level: 3,
          text: 'Core Roles of HTML',
        },
        {
          id: 'p1-6',
          type: 'list',
          ordered: true,
          items: [
            'Define document structure: how titles, paragraphs, lists, and tables are organized.',
            'Carry hyperlinks: enable navigation between pages and resources.',
            'Embed multimedia: images, video, audio, Canvas, SVG.',
            'Build forms: collect user input and submit it to a server.',
            'Provide semantic information: let browsers, search engines, and assistive tech understand content meaning.',
          ],
        },
      ],
    },

    // ========================================================================
    // KP 2: HTML Element Structure (CodeStepper)
    // ========================================================================
    {
      order: 2,
      title: 'HTML Element Structure (Opening / Content / Closing)',
      difficulty: 1,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'An HTML element consists of three parts: an opening tag, content, and a closing tag. Tags are wrapped in angle brackets, and the closing tag adds a slash before the tag name.',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: ['<p class="greeting">Hello, HTML!</p>'],
            language: 'html',
            steps: [
              {
                title: 'Opening Tag',
                description:
                  '<p> is the opening tag, made of angle brackets wrapping the tag name. The name "p" indicates a paragraph element. The opening tag may also contain attributes.',
                highlightLines: [1],
              },
              {
                title: 'Attribute',
                description:
                  'class="greeting" is an attribute, written inside the opening tag in name="value" form. It attaches extra info to the element. Here "class" identifies the element for CSS/JS selection.',
                highlightLines: [1],
              },
              {
                title: 'Content',
                description:
                  'Hello, HTML! is the element content, placed between the opening and closing tags. Content can be text or nested elements.',
                highlightLines: [1],
              },
              {
                title: 'Closing Tag',
                description:
                  '</p> is the closing tag, with a slash before the tag name. Every element with content needs a closing tag. A few elements (like <br>, <img>) are self-closing and have no closing tag.',
                highlightLines: [1],
              },
            ],
          },
        },
        {
          id: 'p2-3',
          type: 'callout',
          variant: 'tip',
          title: 'Void Elements',
          text: 'Some elements have no content and no closing tag — these are called void elements, e.g. <br>, <hr>, <img>, <input>, <meta>, <link>. In HTML5 you may write <br> or <br/>, both are equivalent.',
        },
        {
          id: 'p2-4',
          type: 'demo',
          visualizationType: 'element-anatomy',
          data: {
            tag: 'a',
            content: 'Click here',
            attributes: [
              { name: 'href', value: 'https://example.com', description: 'Specifies the link target URL' },
              { name: 'target', value: '_blank', description: 'Opens the link in a new tab' },
              { name: 'rel', value: 'noopener', description: 'Security attribute preventing the new page from accessing window.opener' },
            ],
            isVoid: false,
            parts: {
              openingTag: 'Opening tag <a>, includes the element name and attributes',
              content: 'Element content — the visible link text',
              closingTag: 'Closing tag </a>, marks the end of the element',
            },
          },
        },
      ],
    },

    // ========================================================================
    // KP 3: HTML Document Structure (ArchitectureDiagram)
    // ========================================================================
    {
      order: 3,
      title: 'HTML Document Structure (head/body)',
      difficulty: 2,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: 'In the previous section we broke down the three-part structure of a single element. But an element can\'t exist in isolation — it must live inside a complete document. An HTML document is like a letter: the envelope (<!DOCTYPE> + <html>) declares "this is an HTML5 letter, written in this language"; the header (<head>) carries metadata, title, and encoding that the recipient doesn\'t see; the body (<body>) is what people actually read. This section covers the standard skeleton and the two most critical — and most overlooked — meta declarations in <head>.',
        },
        {
          id: 'p3-1b',
          type: 'paragraph',
          text: 'A complete HTML document consists of a <!DOCTYPE> declaration, an <html> root element, a <head> section, and a <body>. The head provides metadata; the body carries visible content.',
        },
        {
          id: 'p3-2',
          type: 'code',
          language: 'html',
          filename: 'document.html',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>Page content</p>
  </body>
</html>`,
        },
        {
          id: 'p3-code-parse',
          type: 'paragraph',
          text: 'Code walkthrough: the first line <!DOCTYPE html> is a "mode switch" for the browser — with it, the browser enters Standards Mode; without it, the browser enters Quirks Mode (the box model is computed the old IE way, where width includes padding and border, causing layout chaos — so always include it). The lang attribute on <html> isn\'t decorative: screen readers use it to pick the right pronunciation engine, and search engines use it to detect page language. In <head>, <meta charset="UTF-8"> must appear within the first 1024 bytes, otherwise encoding sniffing may corrupt text. <meta name="viewport" ...> is critical for mobile — explained in detail next.',
        },
        {
          id: 'p3-viewport-parse',
          type: 'callout',
          variant: 'tip',
          title: 'meta viewport — field by field',
          text: 'In content="width=device-width, initial-scale=1.0": width=device-width means "set the viewport width to the device\'s physical width" (phones default to a 980px viewport, which shrinks the page to fit, making text unreadably small); initial-scale=1.0 means initial zoom is 1 (no zoom in or out). You can also add maximum-scale/minimum-scale to limit zoom range, or user-scalable=no to disable zoom (but this harms accessibility — use with caution). Without this line, your responsive CSS media queries will all fail because the browser pretends the viewport is 980px.',
        },
        {
          id: 'p3-defer-async',
          type: 'callout',
          variant: 'note',
          title: 'How to place scripts: defer vs async and user perception',
          text: 'A <script> in <head> blocks page rendering — users see "white screen for a few seconds, then everything appears at once." Two async loading strategies solve this: ① defer: download does not block parsing, execution happens after HTML parsing completes, in order — users see "page renders fully first, then scripts quietly take effect"; suitable for business scripts with dependencies. ② async: executes immediately when download completes (pausing parsing) — users see "page rendering hiccups midway"; execution order is not guaranteed; suitable for independent stats/ad scripts. In short: business scripts use defer at the end of <head>; independent scripts use async. Plain <script> at the end of <body> also works, but delays first interactive paint.',
        },
        {
          id: 'p3-3',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'HTML Document Structure',
            flowDirection: 'top-down',
            layers: [
              {
                name: 'DOCTYPE declaration',
                description: 'Tells the browser to parse the document using HTML5 standards',
                components: [{ name: '<!DOCTYPE html>', description: 'HTML5 Standards Mode declaration' }],
              },
              {
                name: 'Root element <html>',
                description: 'Root of the entire document; the lang attribute declares the document language',
                components: [
                  { name: 'lang attribute', description: 'Declares document language; aids SEO and screen readers' },
                ],
              },
              {
                name: 'Head <head>',
                description: 'Document metadata; not visible to users',
                components: [
                  { name: '<meta charset>', description: 'Character encoding declaration' },
                  { name: '<meta viewport>', description: 'Mobile viewport configuration' },
                  { name: '<title>', description: 'Page title; shown in the browser tab' },
                  { name: '<link>', description: 'External resources (CSS, icons)' },
                  { name: '<style>', description: 'Inline styles' },
                ],
              },
              {
                name: 'Body <body>',
                description: 'All user-visible content',
                components: [
                  { name: 'Semantic tags', description: 'header/nav/main/section/article etc.' },
                  { name: 'Text content', description: 'h1-h6, p, ul/ol, table etc.' },
                  { name: 'Multimedia', description: 'img/video/audio/canvas/svg' },
                  { name: 'Interactive elements', description: 'form/input/button/a etc.' },
                ],
              },
            ],
          },
        },
        {
          id: 'p3-4',
          type: 'callout',
          variant: 'info',
          title: 'viewport meta',
          text: '<meta name="viewport" content="width=device-width, initial-scale=1.0"> is a key declaration for mobile adaptation. Without it, mobile pages will be displayed scaled down. This is a must-have for responsive design.',
        },
        {
          id: 'p3-5',
          type: 'demo',
          visualizationType: 'dom-tree',
          data: {
            title: 'HTML Document Structure',
            root: {
              tag: 'html',
              desc: 'Root element',
              children: [
                {
                  tag: 'head',
                  desc: 'Metadata',
                  children: [
                    { tag: 'meta', attrs: [{ name: 'charset', value: 'UTF-8' }] },
                    { tag: 'title', desc: 'Page title' },
                  ],
                },
                {
                  tag: 'body',
                  desc: 'Document body',
                  children: [
                    { tag: 'header', desc: 'Page header' },
                    { tag: 'main', desc: 'Main content' },
                    { tag: 'footer', desc: 'Page footer' },
                  ],
                },
              ],
            },
          },
        },
        {
          id: 'p3-sandbox',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Structure sandbox: modify the HTML below and run it to see live rendering and DOM structure.',
            initialCode: `<div class="card">
  <h2>Card Title</h2>
  <p>This is card content.</p>
  <button>Click me</button>
</div>`,
          },
        },
      ],
    },

    // ========================================================================
    // KP 4: Common HTML Element Categories (CompareTable)
    // ========================================================================
    {
      order: 4,
      title: 'Common HTML Element Categories',
      difficulty: 1,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: 'In the last section we built the document skeleton (head/body). What goes inside? HTML offers over a hundred tags — overwhelming at first, but they actually fall into a few categories by responsibility: some handle content sectioning (section/article), some handle text (p/h1), some handle forms (input), some handle multimedia (img/video). This section walks through them by category to build a "tag panorama." You don\'t need to memorize — just remember "what each category is responsible for," and look up specific tags when needed.',
        },
        {
          id: 'p4-1b',
          type: 'paragraph',
          text: 'HTML elements are categorized by function into root elements, metadata, content sectioning, text content, inline text, images and multimedia, embedded content, forms, tables, and interactive elements.',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Element Category',
            columns: ['Purpose', 'Representative Elements', 'Block-level'],
            rows: [
              { feature: 'Root', values: ['Document root node', '<html>', 'Yes'] },
              { feature: 'Metadata', values: ['Document configuration', '<head> <title> <meta> <link>', 'No'] },
              { feature: 'Content sectioning', values: ['Page structure division', '<header> <nav> <main> <footer>', 'Yes'] },
              { feature: 'Headings', values: ['Heading hierarchy', '<h1> ~ <h6>', 'Yes'] },
              { feature: 'Text content', values: ['Paragraphs and lists', '<p> <ul> <ol> <blockquote>', 'Yes'] },
              { feature: 'Inline text', values: ['Inline text markup', '<a> <strong> <em> <span> <code>', 'No'] },
              { feature: 'Multimedia', values: ['Images, audio, video', '<img> <video> <audio>', 'Yes'] },
              { feature: 'Forms', values: ['User input', '<form> <input> <button> <select>', 'Yes'] },
              { feature: 'Tables', values: ['Tabular data', '<table> <tr> <td> <th>', 'Yes'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 5: Block vs Inline vs Inline-Block
    // ========================================================================
    {
      order: 5,
      title: 'Block vs Inline vs Inline-Block',
      difficulty: 2,
      visualizationType: 'flipcard',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: 'In the previous section we examined HTML\'s attribute system. But after writing tags you\'ll notice: some tags automatically break to a new line and occupy the whole row, while others squeeze together — the "director" behind this is the normal flow. The normal flow is the browser\'s default element layout rule: block elements stack vertically like books on a shelf; inline elements flow horizontally like characters in a sentence. Understanding the normal flow is the starting point for understanding all layout, and it\'s what later CSS layouts (Flex/Grid) will "break" and "reorganize."',
        },
        {
          id: 'p5-1b',
          type: 'paragraph',
          text: 'HTML elements fall into three display categories by behavior: block, inline, and inline-block. This determines how they take up space and arrange side-by-side with other elements.',
        },
        {
          id: 'p5-2',
          type: 'table',
          caption: 'Comparison of Three Display Types',
          headers: ['Property', 'Block', 'Inline', 'Inline-block'],
          rows: [
            ['Line break', 'Yes (new line)', 'No', 'No'],
            ['Width/Height', 'Settable', 'Not settable', 'Settable'],
            ['Default width', 'Parent container width', 'Content width', 'Content width'],
            ['margin/padding', 'All four sides', 'Horizontal only; vertical doesn\'t take space', 'All four sides'],
            ['Representative elements', 'div p h1 ul', 'span a strong em', 'img input button'],
          ],
        },
        {
          id: 'p5-flip',
          type: 'demo',
          visualizationType: 'flipcard',
          data: {
            cards: [
              {
                front: 'Block',
                frontSub: 'Owns the whole line',
                back: 'div / p / h1-h6 / ul / section etc. occupy a full line, support width/height, default width equals parent container width.',
              },
              {
                front: 'Inline',
                frontSub: 'Side by side',
                back: 'span / a / strong / em etc. flow side by side, cannot have width/height set; width/height determined by content.',
              },
              {
                front: 'Inline-block',
                frontSub: 'Side by side + settable size',
                back: 'img / input / button etc. flow side by side and support width/height; combines block and inline traits.',
              },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'callout',
          variant: 'warning',
          title: 'HTML5 No Longer Uses block/inline Classification',
          text: 'The HTML5 spec removes the block/inline element classification, replacing it with Content Models. However, CSS\'s display property still uses block/inline/inline-block concepts; in practice we still use this to reason about layout behavior.',
        },
        {
          id: 'p5-4',
          type: 'code',
          language: 'html',
          code: `<!-- Block: each on its own line -->
<div style="background:#333">Block element 1</div>
<div style="background:#444">Block element 2</div>

<!-- Inline: side by side, width/height not settable -->
<span style="background:#333">Inline 1</span>
<span style="background:#444">Inline 2</span>

<!-- Inline-block: side by side, width/height settable -->
<button style="width:120px">Button 1</button>
<button style="width:120px">Button 2</button>`,
        },
        {
          id: 'p5-code-parse',
          type: 'paragraph',
          text: 'Code walkthrough: the two <div>s each occupy a full line, stacking top to bottom — that\'s the block "line break" trait. The two <span>s sit next to each other on one line, separated only by a space, and even setting width on a span has no effect — that\'s inline\'s "no width/height." The two <button>s are also side by side, but width:120px takes effect — that\'s inline-block\'s combined advantage. In everyday layout, nav buttons and icon buttons often rely on inline-block.',
        },
        {
          id: 'p5-misconception',
          type: 'callout',
          variant: 'warning',
          title: 'Common Misconceptions',
          text: 'Misconception 1: "Inline elements ignoring width/height is a bug." It\'s not a bug — it\'s the spec: inline element dimensions are determined by content. To force a size, use display:inline-block or block. Misconception 2: "Use <br> to break inline elements to a new line." <br> is a semantic text-level line break, not a layout tool. For layout, use CSS (display/flex); otherwise responsive layouts break.',
        },
        {
          id: 'p5-box-model',
          type: 'callout',
          variant: 'tip',
          title: 'Underlying principle: box model computation',
          text: 'The block vs inline difference is essentially how the box model is processed on each. Every element is a rectangle with four layers from inside out: content → padding → border → margin. In standards mode, CSS width includes only content; the actual occupied width = width + left/right padding + left/right border + left/right margin. For block boxes, all four layers take effect and can stretch the parent. For inline boxes, only the "horizontal direction" takes effect — left/right padding/margin push neighbors, but top/bottom padding/margin don\'t affect line height (don\'t push adjacent lines apart), and top/bottom borders are drawn but don\'t take layout space. This is why setting padding-top on a <span> appears "ineffective" — it\'s drawn but takes no space. Understanding this explains many "weird" CSS layout phenomena.',
        },
      ],
    },

    // ========================================================================
    // KP 6: HTML Attribute System (Accordion)
    // ========================================================================
    {
      order: 6,
      title: 'HTML Attribute System (id/class/data-/aria-)',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: 'In the last section we examined the "three-part" structure of elements. But a tag name alone isn\'t enough — there may be dozens of the same tag (say <div>), so how do we tell them apart? How do we style a specific div? How do we store data on it for JS? That\'s where attributes come in. Attributes are written inside the opening tag in name="value" form, attaching "extra info." This section covers four commonly used attribute families: id (unique ID), class (class name), data-* (custom data escape hatch), and aria-* (accessibility patch).',
        },
        {
          id: 'p6-1b',
          type: 'paragraph',
          text: 'HTML attributes attach extra info to elements. Core attributes include universal attributes (id/class/style), data attributes (data-*), accessibility attributes (aria-*), and event attributes (on*).',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: 'id attribute — globally unique identifier',
                content:
                  'id is a unique identifier for an element on a page. Each id value must be unique within the document. Used for: anchors (#id navigation), JS selection (getElementById), CSS targeting (#id). It is the most "targeted" way to point at one specific element.',
                code: '<div id="header">Page Header</div>\n<a href="#header">Back to top</a>\n<script>document.getElementById("header")</script>',
                codeLanguage: 'html',
              },
              {
                title: 'class attribute — reusable tag',
                content:
                  'class is a reusable label; multiple elements can share the same class, and one element can have multiple classes (space-separated). Used for: CSS class selectors (.btn), JS selection (getElementsByClassName / querySelectorAll). It is the workhorse of styling.',
                code: '<button class="btn btn-primary">Submit</button>\n<div class="card highlight"></div>',
                codeLanguage: 'html',
              },
              {
                title: 'data-* attributes — custom data storage',
                content:
                  'data-* lets you store custom data on elements for JS to read. The part after data- is the key; you read it via dataset in JS. Suitable for "config data attached to a DOM node" (e.g. user-id, item-index). Avoid storing large amounts of data — use state management for that.',
                code: '<div data-user-id="42" data-role="admin">Alice</div>\n<script>\n  const el = document.querySelector("[data-user-id]");\n  console.log(el.dataset.userId); // "42"\n</script>',
                codeLanguage: 'html',
              },
              {
                title: 'aria-* attributes — accessibility patches',
                content:
                  'aria-* (Accessible Rich Internet Applications) adds semantic info for assistive tech when native HTML isn\'t enough. Common: aria-label (readable name), aria-hidden (hide from AT), aria-expanded (expanded state), aria-live (live region). "If you can use native HTML, don\'t use ARIA" — ARIA is a supplement, not a replacement.',
                code: '<button aria-label="Close dialog">×</button>\n<div role="alert" aria-live="assertive">Saved</div>',
                codeLanguage: 'html',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 7: HTML Version Evolution (Timeline)
    // ========================================================================
    {
      order: 7,
      title: 'HTML Version Evolution',
      difficulty: 1,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: 'HTML isn\'t a static standard — it has evolved over 30 years. Understanding this evolution helps you understand why HTML is the way it is today: why some tags are deprecated, why the DOCTYPE is so short, why "HTML5" is technically no longer a version number. The timeline below shows the major milestones.',
        },
        {
          id: 'p7-timeline',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'horizontal',
            items: [
              {
                time: '1991',
                title: 'HTML 1.0',
                description:
                  'Tim Berners-Lee publishes the first HTML proposal. Supports basic tags like headings, paragraphs, links. No forms, no tables, no CSS.',
                status: 'done',
              },
              {
                time: '1995',
                title: 'HTML 2.0',
                description: 'IETF releases HTML 2.0 as the first official standard. Adds forms, tables, image maps.',
                status: 'done',
              },
              {
                time: '1997',
                title: 'HTML 3.2',
                description: 'W3C takes over. Adds scripting, frames, tables. Still presentation-oriented (font, bgcolor).',
                status: 'done',
              },
              {
                time: '1999',
                title: 'HTML 4.01',
                description: 'Separates structure and presentation; deprecates font/center. CSS becomes the standard for styling.',
                status: 'done',
              },
              {
                time: '2000',
                title: 'XHTML 1.0',
                description: 'HTML reformulated as XML. Strict syntax (all tags must close, lowercase). Failed due to compatibility issues.',
                status: 'done',
              },
              {
                time: '2014',
                title: 'HTML5',
                description:
                  'W3C officially releases HTML5. Adds semantic tags (header/nav/article), Canvas, video/audio, form types, Web Storage, Web Workers. Removes presentational tags (font/center/frame).',
                status: 'done',
              },
              {
                time: '2019-present',
                title: 'HTML Living Standard',
                description: 'W3C and WHATWG collaborate; HTML enters the "living standard" era, continuously evolving. New features like dialog, popover, container queries.',
                status: 'active',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 8: Semantic Tags (8 Core Tags)
    // ========================================================================
    {
      order: 8,
      title: 'Semantic Tags (8 Core Tags)',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Earlier we built pages with div/span, but div is a "universal container" — it says nothing, like a book where every page just says "content." Semantic tags "label content correctly": header is the page header, nav is navigation, article is an article. Why bother? Because search engines, screen readers, and even yourself six months later need tags to understand "what is this block." Semantics turns HTML from "viewable" into "readable."',
        },
        {
          id: 'p8-1b',
          type: 'paragraph',
          text: 'HTML5 introduced a set of semantic tags that let structure itself express content meaning, rather than relying on div + class. Semantics is critical for SEO, accessibility, and maintainability.',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Semantic Tag',
            columns: ['Purpose', 'Use Case'],
            highlightColumn: 1,
            rows: [
              { feature: '<header>', values: ['Page header / section header', 'Top of page, top of article, top of section'] },
              { feature: '<nav>', values: ['Navigation link area', 'Main nav, breadcrumbs, pagination'] },
              { feature: '<main>', values: ['Main content', 'Page body; one per page'] },
              { feature: '<article>', values: ['Independent, complete content', 'Article, comment, card'] },
              { feature: '<section>', values: ['Content section', 'Thematic grouping; usually has a heading'] },
              { feature: '<aside>', values: ['Sidebar content', 'Sidebar, related recommendations, ads'] },
              { feature: '<footer>', values: ['Page footer / section footer', 'Copyright, contact, related links'] },
              { feature: '<figure>/<figcaption>', values: ['Figure + caption', 'Illustration, code sample, chart and its title'] },
            ],
          },
        },
        {
          id: 'p8-3',
          type: 'code',
          language: 'html',
          filename: 'semantic-layout.html',
          code: `<body>
  <header>
    <nav><!-- Main navigation --></nav>
  </header>
  <main>
    <article>
      <h1>Article Title</h1>
      <section>
        <h2>First Section</h2>
        <p>Body content...</p>
      </section>
    </article>
    <aside><!-- Sidebar recommendations --></aside>
  </main>
  <footer><!-- Copyright info --></footer>
</body>`,
        },
        {
          id: 'p8-code-parse',
          type: 'paragraph',
          text: 'Code walkthrough: in this skeleton, <header> wraps the page top and nav, <main> is the page body (only one per page), <article> represents an independent article, <section> subdivides the article by theme and must have a heading, <aside> is auxiliary content related to the body (sidebar recommendations), <footer> holds copyright info. Note there are no classes anywhere — yet anyone reading the code can see the structure at a glance. That\'s the readability payoff of semantics.',
        },
        {
          id: 'p8-misconception',
          type: 'callout',
          variant: 'warning',
          title: 'Common Misconception',
          text: 'Myth: "Semantic = just swap div for header/nav/footer." Wrong. Semantics requires the tag to match the content\'s nature: stuffing an independent article into <section>, or stuffing nav links into <aside>, is misuse. The test is "can this content stand on its own / does it match the tag\'s definition," not "does it look similar positionally." Also, <section> must contain a heading (h1-h6); otherwise use a div directly.',
        },
      ],
    },

    // ========================================================================
    // KP 9: Semantic Text Elements (FlipCard)
    // ========================================================================
    {
      order: 9,
      title: 'Semantic Text Elements (em/strong/blockquote etc.)',
      difficulty: 2,
      visualizationType: 'flipcard',
      blocks: [
        {
          id: 'p9sem-1',
          type: 'paragraph',
          text: 'Besides structural semantic tags, HTML provides a set of inline semantic text elements for marking emphasis, quotations, terms, superscript/subscript, etc., letting text carry semantics rather than relying only on styling.',
        },
        {
          id: 'p9sem-2',
          type: 'demo',
          visualizationType: 'flipcard',
          data: {
            cards: [
              {
                front: 'em vs i',
                frontSub: 'Emphasis vs Italic',
                back: '<em> indicates semantic emphasis (screen readers change intonation); <i> is purely visual italic (terms, foreign words). Both render as italic, but em carries semantics.',
              },
              {
                front: 'strong vs b',
                frontSub: 'Important vs Bold',
                back: '<strong> indicates content importance (screen readers emphasize); <b> is purely visual bold (e.g. keywords). Both render as bold, but strong carries semantics.',
              },
              {
                front: 'blockquote vs q',
                frontSub: 'Block quote vs Inline quote',
                back: '<blockquote> for block-level quotes (with indent); <q> for inline short quotes (auto quotes). Both can use the cite attribute to mark source.',
              },
              {
                front: 'abbr',
                frontSub: 'Abbreviation',
                back: '<abbr title="HyperText Markup Language">HTML</abbr> marks an abbreviation; hover shows full form; helps screen readers pronounce correctly.',
              },
              {
                front: 'sup / sub',
                frontSub: 'Superscript / Subscript',
                back: '<sup> for superscript (e.g. x², footnotes); <sub> for subscript (e.g. H₂O, chemical formulas). Used in math and chemistry.',
              },
              {
                front: 'code vs s',
                frontSub: 'Code vs Strikethrough',
                back: '<code> marks code snippets (monospace); <s> marks content no longer relevant or deleted (strikethrough); <del> marks deleted document edits.',
              },
            ],
          },
        },
        {
          id: 'p9sem-3',
          type: 'callout',
          variant: 'tip',
          title: 'Semantics First, Styling Second',
          text: 'When choosing text tags, prioritize semantics over appearance: use em/strong for emphasis, blockquote/q for quotes, abbr/cite for terms. Appearance belongs to CSS — don\'t use <b>/<i> just to bold or italicize.',
        },
      ],
    },

    // ========================================================================
    // KP 10: Semantic vs Non-Semantic Comparison
    // ========================================================================
    {
      order: 10,
      title: 'Semantic vs Non-Semantic Comparison',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: 'In the last section we met 8 semantic tags and text elements. You might ask: doesn\'t <div class="header"> achieve the same effect as <header>? Functionally yes, but the difference is "who can read it." Imagine a visually impaired user browsing your page with a screen reader: encountering <header>, the screen reader announces "header region, press shortcut to skip"; encountering <div class="header">, it just says "div" — the user neither knows it\'s a header nor can quickly skip past it. This section uses a comparison table to show the real gap in readability, SEO, and accessibility.',
        },
        {
          id: 'p9-1b',
          type: 'paragraph',
          text: 'Non-semantic uses generic div/span containers; semantic uses meaningful tags. They are functionally equivalent but differ markedly in readability, SEO, and accessibility.',
        },
        {
          id: 'p9-screenreader',
          type: 'callout',
          variant: 'note',
          title: 'Real scenario: how screen readers announce',
          text: 'Take a "Submit" button written two ways; fire up NVDA and Tab to focus it, listen to the difference:\n① Non-semantic: <div class="btn" onclick="submit()">Submit</div> — screen reader says: "Submit, group" (treats it as a generic container; doesn\'t announce clickable; Enter doesn\'t trigger; keyboard users can\'t use it).\n② Semantic: <button type="submit">Submit</button> — screen reader says: "Submit, button" (clearly announces button; Tab focuses; Enter/Space triggers; focus ring auto-displays).\nNow navigation: links wrapped in <div class="nav"> force screen-reader users to Tab through every link to skip past; wrapped in <nav>, the screen reader announces "navigation region" and users can jump to main content with one shortcut. That\'s the real value of semantics — it\'s not for sighted users; it\'s for machines and assistive tech.',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Dimension',
            columns: ['Non-semantic (div)', 'Semantic (header/nav/...)'],
            highlightColumn: 2,
            rows: [
              { feature: 'Readability', values: ['Must infer meaning from class names', 'Tag itself is the meaning'] },
              { feature: 'SEO', values: ['Search engines struggle to parse structure', 'Search engines understand content weight'] },
              { feature: 'Accessibility', values: ['Needs extra aria attributes', 'Native screen-reader support'] },
              { feature: 'Code volume', values: ['Lots of class naming needed', 'Tag is structure; fewer classes'] },
              { feature: 'Maintainability', values: ['Structure meaning not obvious', 'Structure at a glance'] },
              { feature: 'Use case', values: ['When no semantic tag fits', 'Use semantic tags first'] },
            ],
          },
        },
        {
          id: 'p9-3',
          type: 'callout',
          variant: 'tip',
          title: 'Semantic Principle',
          text: 'Prefer semantic tags; only use div (layout container) or span (inline text wrapper) when no suitable semantic tag exists. Don\'t be semantic for semantics\' sake — a simple button should be <button>, not <div role="button">.',
        },
        {
          id: 'p9-4',
          type: 'demo',
          visualizationType: 'semantic-compare',
          data: {
            title: 'Semantic Implementation of a Navigation Bar',
            good: {
              label: 'Semantic',
              tags: [
                { tag: '<nav>', reason: 'Semantic navigation region' },
                { tag: '<ul>', reason: 'List structure' },
                { tag: '<li>', reason: 'List item' },
                { tag: '<a>', reason: 'Link element' },
              ],
              description: 'Using semantic tags, screen readers can identify the navigation structure; SEO-friendly.',
            },
            bad: {
              label: 'Non-semantic',
              tags: [
                { tag: '<div>', reason: 'No-semantics container' },
                { tag: '<span>', reason: 'No-semantics inline element' },
              ],
              description: 'All div/span; cannot express structural semantics; poor accessibility.',
            },
          },
        },
      ],
    },

    // ========================================================================
    // KP 11: Form Elements & Validation (Sandbox)
    // ========================================================================
    {
      order: 11,
      title: 'Form Elements & Validation',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: 'We\'ve built the page skeleton and grasped semantics. But pages are mostly "one-way display" — when you need user input (registration, login, order submission), you need forms. Forms are the entry point for the front-end to "converse" with users: they collect input, validate legality, then hand data to the server. HTML5 gave forms native validation: without writing JS, attributes like required, min, pattern let the browser automatically reject invalid input. This section shows how to use these attributes and why they cannot replace server-side validation.',
        },
        {
          id: 'p10-1b',
          type: 'paragraph',
          text: 'Forms are the core mechanism for collecting user input. HTML5 provides rich input types, native validation attributes, and the Constraint Validation API.',
        },
        {
          id: 'p10-2',
          type: 'code',
          language: 'html',
          filename: 'form.html',
          code: `<form novalidate>
  <!-- type="email" lets the browser validate email format; required means cannot be empty -->
  <input type="email" required placeholder="Email" />

  <!-- minlength/maxlength limit character count; password 8-20 chars -->
  <input type="password" minlength="8" maxlength="20" required />

  <!-- type="number" pops a numeric keypad; min/max set range; step controls increment -->
  <input type="number" min="0" max="150" step="1" value="18" />

  <!-- pattern constrains format with regex; title is shown on validation failure -->
  <input type="text" pattern="[A-Za-z]{3,}" title="At least 3 letters" />

  <!-- select dropdown: an empty option with value="" combined with required forces a choice -->
  <select required>
    <option value="">Please select</option>
    <option value="us">United States</option>
  </select>

  <button type="submit">Submit</button>
</form>`,
        },
        {
          id: 'p10-code-parse',
          type: 'paragraph',
          text: 'Code walkthrough: the outer <form novalidate> tells the browser "don\'t auto-validate first" — typically used when you want JS to take over validation. Each input\'s type determines the keyboard and basic validation (email checks for @; number checks numeric). required is the "must-fill switch"; minlength/maxlength/min/max/pattern are "constraints" — combined, they can block most invalid input without JS. Note <select required> must have a placeholder option with value="", otherwise the user can submit without selecting.',
        },
        {
          id: 'p10-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Use the Constraint Validation API to inspect the form. Modify the code and run it to see results.',
            initialCode: `// Constraint Validation API example
const form = {
  email: 'user@example.com',
  age: 25,
};

// Simulate validation
function validate(data) {
  const errors = [];
  if (!data.email || !/^[^@]+@[^@]+/.test(data.email)) {
    errors.push('Invalid email format');
  }
  if (!data.age || data.age < 0 || data.age > 150) {
    errors.push('Age must be between 0 and 150');
  }
  return errors;
}

const errors = validate(form);
if (errors.length === 0) {
  console.log('[Validation passed]');
  console.log('Data:', form);
} else {
  console.log('[Validation failed]:');
  errors.forEach(e => console.log('  -', e));
}`,
          },
        },
        {
          id: 'p10-4',
          type: 'callout',
          variant: 'warning',
          title: 'Front-end Validation Cannot Replace Back-end Validation',
          text: 'HTML5 native validation can be bypassed via novalidate or JS. Any front-end validation only improves UX; real data validation must happen on the server to defend against malicious requests.',
        },
        {
          id: 'p10-5',
          type: 'demo',
          visualizationType: 'form-playground',
          data: {
            title: 'User Registration Form',
            fields: [
              { type: 'text', label: 'Username', name: 'username', placeholder: 'Enter username', required: true },
              { type: 'email', label: 'Email', name: 'email', placeholder: 'user@example.com', required: true },
              { type: 'password', label: 'Password', name: 'password', required: true },
              {
                type: 'select',
                label: 'Role',
                name: 'role',
                options: ['Developer', 'Designer', 'Product Manager'],
              },
            ],
            submitLabel: 'Register',
          },
        },
      ],
    },

    // ========================================================================
    // KP 12: HTML5 Input Types Overview
    // ========================================================================
    {
      order: 12,
      title: 'HTML5 Input Types Overview',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: 'In the last section we used required/pattern for form validation. But half of the form experience is "input" itself — how to let users type less and err less. HTML5 added 20+ input types: date pops a calendar, color pops a color picker, range pops a slider, tel pops a numeric keypad on mobile. The benefits aren\'t just UI — more importantly, mobile keyboard adaptation and native validation. Without writing a line of JS, the browser optimizes the experience for you.',
        },
        {
          id: 'p11-1b',
          type: 'paragraph',
          text: 'HTML5 greatly expanded input types, from the original text/password to 20+ types covering date, color, range, file, etc., with built-in native validation and mobile keyboard adaptation.',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: true,
            items: [
              {
                title: 'Text — text / password / search / url / email / tel',
                content: 'Basic text input. email/url have built-in format validation; tel triggers a numeric keypad on mobile; search has a clear button in some browsers.',
                code: '<input type="email" required />\n<input type="tel" pattern="[0-9]{11}" />',
                codeLanguage: 'html',
              },
              {
                title: 'Numeric — number / range',
                content: 'number for numeric input; supports min/max/step. range is a slider picker, suited for range values.',
                code: '<input type="number" min="0" max="100" step="0.1" />\n<input type="range" min="0" max="100" value="50" />',
                codeLanguage: 'html',
              },
              {
                title: 'Date & time — date / time / datetime-local / month / week',
                content: 'Native date picker, no JS library required. datetime-local picks date and time; month/week pick month/week. Browser UIs vary slightly.',
                code: '<input type="date" />\n<input type="datetime-local" />\n<input type="month" />',
                codeLanguage: 'html',
              },
              {
                title: 'Selection — checkbox / radio / color / file',
                content: 'checkbox for multi-select; radio for single-select (same name groups them); color for color picker; file for upload (accept restricts type, multiple for multi-select).',
                code: '<input type="checkbox" checked />\n<input type="radio" name="gender" />\n<input type="color" value="#ff7a17" />\n<input type="file" accept="image/*" multiple />',
                codeLanguage: 'html',
              },
              {
                title: 'Special — hidden / submit / button / reset / image',
                content: 'hidden stores data without displaying; submit/button/reset are button variants; image uses an image as the submit button.',
                code: '<input type="hidden" name="id" value="42" />\n<input type="submit" value="Submit" />\n<input type="image" src="submit.png" alt="Submit" />',
                codeLanguage: 'html',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 13: Tables
    // ========================================================================
    {
      order: 13,
      title: 'Tables',
      difficulty: 1,
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          text: 'HTML tables display tabular data with rows and columns. Use <table> for genuine tabular data; avoid using them for layout (a practice from the 1990s).',
        },
        {
          id: 'p13-2',
          type: 'code',
          language: 'html',
          code: `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>28</td>
      <td>Engineer</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>32</td>
      <td>Designer</td>
    </tr>
  </tbody>
</table>`,
        },
        {
          id: 'p13-3',
          type: 'callout',
          variant: 'tip',
          title: 'When to use tables',
          text: 'Use tables for genuine tabular data (data grids, comparison matrices, schedules). Never use them for page layout — that\'s what CSS Flex/Grid is for. Modern screen readers navigate tables via headers/scope, so always include <th> with scope="col" or scope="row" for accessibility.',
        },
      ],
    },

    // ========================================================================
    // KP 14: Accessibility Overview (POUR)
    // ========================================================================
    {
      order: 14,
      title: 'Accessibility Overview (POUR)',
      difficulty: 2,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: 'We\'ve mentioned "semantics helps accessibility" several times, but what is accessibility (a11y)? Imagine real users: a visually impaired programmer "listening" to your page with a screen reader; a user with hand tremors who can only use the keyboard Tab key and can\'t precisely click a mouse; a color-blind user who can\'t tell red from green and misses any error indicated only by color; a user looking at their phone in bright sunlight, where low contrast means they see nothing. Accessibility isn\'t "special features for the blind" — it\'s about letting everyone, including people with disabilities, older adults, and those temporarily injured, use your page. WCAG (Web Content Accessibility Guidelines) is the international accessibility standard; its core POUR four principles are the framework for evaluating "can everyone actually use your page."',
        },
        {
          id: 'p14-1b',
          type: 'paragraph',
          text: 'WCAG (Web Content Accessibility Guidelines) is the international standard for accessibility. Its core POUR four principles are the foundational framework for evaluating web content accessibility.',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              {
                time: 'P',
                title: 'Perceivable',
                description:
                  'Information and UI must be perceivable by users. Unperceivable content doesn\'t exist. User story: a visually impaired user can\'t see an image, but a screen reader can read the alt text, letting them "hear" the image; a deaf user can\'t hear video audio, but captions let them understand. If images have no alt and videos have no captions, that content "doesn\'t exist" for these users.',
                status: 'done',
              },
              {
                time: 'O',
                title: 'Operable',
                description:
                  'UI elements must be operable. Don\'t depend only on the mouse — all functionality should be reachable via keyboard. User story: a user with hand tremors can\'t click precisely, so they Tab through focus and press Enter to confirm. If your button is <div onclick>, Tab can\'t reach it — this feature is "locked" for them.',
                status: 'done',
              },
              {
                time: 'U',
                title: 'Understandable',
                description:
                  'Content and operation must be understandable. Use clear language; provide error feedback for input; behavior should be predictable. User story: an older adult enters the wrong email; if you only show a red border (they may not see the color clearly), they\'ll be confused about why they can\'t submit. Change to red border + text "Please enter a valid email" and they\'ll know how to fix it.',
                status: 'done',
              },
              {
                time: 'R',
                title: 'Robust',
                description:
                  'Content must be reliably parseable by various user agents (including assistive tech). User story: screen reader versions vary; if your HTML nesting is wrong or ARIA is misused, different screen readers may announce totally different things. Standard HTML + correct ARIA ensures "the same page, all tools can read it correctly."',
                status: 'active',
              },
            ],
          },
        },
        {
          id: 'p14-3',
          type: 'callout',
          variant: 'note',
          title: 'WCAG Levels',
          text: 'Each WCAG criterion has three levels: A, AA, AAA. A is the minimum; AA is the mainstream industry target (most regulations require it); AAA is the highest. Commercial projects usually target AA.',
        },
        {
          id: 'p14-4',
          type: 'demo',
          visualizationType: 'a11y-checklist',
          data: {
            title: 'Accessibility Best Practices',
            items: [
              {
                title: 'Provide alt text for images',
                description: 'All img elements should have an alt attribute describing the image.',
                code: '<img src="logo.png" alt="Company logo">',
                defaultChecked: true,
              },
              {
                title: 'Use semantic tags',
                description: 'Prefer nav, main, article etc. over div.',
                code: '<nav>...</nav> instead of <div class="nav">',
                defaultChecked: true,
              },
              {
                title: 'Associate labels with form controls',
                description: 'Every form control should have an associated label element.',
                code: '<label for="email">Email</label>\n<input id="email" type="email">',
              },
              {
                title: 'Ensure color contrast',
                description: 'Text-to-background contrast should meet WCAG AA (4.5:1).',
              },
              {
                title: 'Keyboard accessibility',
                description: 'All interactive elements should be operable via keyboard (Tab/Enter/Space).',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 15: Links, Paths & URLs
    // ========================================================================
    {
      order: 15,
      title: 'Links, Paths & URLs',
      difficulty: 2,
      blocks: [
        {
          id: 'p15-link-1',
          type: 'paragraph',
          lead: true,
          text: 'Hyperlinks are what make the Web a "web" — without them, pages would be isolated documents. The <a> tag with href attribute creates links; the value of href can be an absolute URL, a relative path, an anchor (#id), or a protocol URL (mailto:, tel:). Understanding path types is essential when structuring a multi-page site.',
        },
        {
          id: 'p15-link-2',
          type: 'code',
          language: 'html',
          code: `<!-- Absolute URL: full address with protocol + domain -->
<a href="https://example.com/page">Absolute link</a>

<!-- Relative path: relative to current page -->
<a href="about.html">Relative link (same folder)</a>
<a href="../blog/post.html">Parent folder</a>
<a href="/contact">Root-relative path</a>

<!-- Anchor: jump within page -->
<a href="#section-2">Jump to section</a>

<!-- Protocol URLs -->
<a href="mailto:hello@example.com">Email</a>
<a href="tel:+18001234567">Phone</a>

<!-- download attribute: triggers download -->
<a href="report.pdf" download>Download PDF</a>

<!-- target="_blank" + rel="noopener": open in new tab safely -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External link
</a>`,
        },
        {
          id: 'p15-link-3',
          type: 'callout',
          variant: 'warning',
          title: 'Security: always add rel="noopener" for target="_blank"',
          text: 'When using target="_blank", the new page can access window.opener and potentially redirect your original tab to a phishing page. Adding rel="noopener" (or rel="noopener noreferrer" for older browsers) prevents this. Modern browsers default to this behavior, but always include it for compatibility.',
        },
        {
          id: 'p15-link-4',
          type: 'callout',
          variant: 'tip',
          title: 'src vs href',
          text: 'src (Source): replaces the current element (img/script/iframe); the browser pauses parsing to fetch it — blocks. href (Hypertext Reference): establishes a link relationship (a/link); the browser fetches in parallel — does not block. Conclusion: src blocks; href does not.',
        },
      ],
    },

    // ========================================================================
    // KP 16: ARIA Attributes
    // ========================================================================
    {
      order: 16,
      title: 'ARIA Attributes',
      difficulty: 3,
      blocks: [
        {
          id: 'p16-aria-1',
          type: 'paragraph',
          lead: true,
          text: 'In the last section we used the WCAG POUR framework to understand the four accessibility principles. But sometimes native HTML semantics aren\'t enough — e.g. you build a custom Tab switcher, modal dialog, dropdown menu, and these "rich interactive components" have no ready-made HTML tag. That\'s where ARIA (Accessible Rich Internet Applications) comes in: it\'s a set of extra attributes that add semantics to elements "with a div\'s face but a button\'s job," letting screen readers know "this is a button," "this dialog is open," "this option is selected."',
        },
        {
          id: 'p16-aria-1b',
          type: 'paragraph',
          text: 'ARIA (Accessible Rich Internet Applications) supplements semantic info for dynamic web apps. Use it when native HTML semantics are insufficient, so assistive tech understands a component\'s role, state, and properties.',
        },
        {
          id: 'p16-aria-2',
          type: 'heading',
          level: 3,
          text: 'Three Dimensions of ARIA',
        },
        {
          id: 'p16-aria-3',
          type: 'list',
          items: [
            'role — Role definition: tells assistive tech what this is. E.g. role="button", role="dialog", role="tablist".',
            'aria-* states — Dynamic state: e.g. aria-expanded (expanded), aria-checked (checked), aria-hidden (hidden).',
            'aria-* properties — Static properties: e.g. aria-label (label), aria-describedby (description), aria-live (live region).',
          ],
        },
        {
          id: 'p16-aria-4',
          type: 'code',
          language: 'html',
          code: `<!-- Simulated button (when no native button) -->
<div role="button" tabindex="0" aria-pressed="false"
     aria-label="Toggle menu" onclick="toggle()">
  Menu
</div>

<!-- Modal dialog -->
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">Confirm Delete</h2>
  <p>This action cannot be undone</p>
</div>

<!-- Live notification -->
<div role="alert" aria-live="assertive">
  Saved successfully
</div>

<!-- Tab component -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Tab 2</button>
</div>
<div role="tabpanel" id="panel-1">Content 1</div>`,
        },
        {
          id: 'p16-aria-parse',
          type: 'paragraph',
          text: 'Code walkthrough: the first example uses <div role="button"> to simulate a button — role tells the screen reader "this is a button," tabindex="0" lets it be Tab-focusable, aria-pressed indicates pressed state, aria-label provides a readable name. The second modal dialog uses role="dialog" + aria-modal="true" to indicate "this is a focusable popup," and aria-labelledby points to the title so the screen reader can announce it. The third role="alert" is a live region — when content changes, the screen reader immediately announces "Saved successfully." Finally, the Tab component uses aria-selected to mark the current tab, and aria-controls to associate the panel it controls — so keyboard and screen-reader users can switch smoothly.',
        },
        {
          id: 'p16-aria-5',
          type: 'callout',
          variant: 'warning',
          title: 'First Rule of ARIA',
          text: 'If you can use a native HTML element or attribute to achieve the desired semantics and accessibility, don\'t use ARIA. E.g. use <button> instead of <div role="button">. ARIA is a supplement, not a replacement.',
        },
      ],
    },

    // ========================================================================
    // KP 17: Multimedia video/audio
    // ========================================================================
    {
      order: 17,
      title: 'Multimedia: video/audio',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p17-media-1',
          type: 'paragraph',
          lead: true,
          text: 'We\'ve built the document skeleton and learned to collect input via forms. But a text-only page is dull — we need images, video, and audio to carry richer information. Why cover media after the "skeleton"? Because media is the bulkiest part of a page — an unoptimized image may be larger than the entire HTML, directly slowing first paint. This section looks at how HTML embeds media and how video/audio attributes balance "experience" vs "performance."',
        },
        {
          id: 'p17-media-1b',
          type: 'paragraph',
          text: 'HTML5 natively supports video and audio playback, no plugins like Flash needed. video/audio elements provide playback control APIs and support multiple formats.',
        },
        {
          id: 'p17-media-2',
          type: 'code',
          language: 'html',
          code: `<!-- Video -->
<video
  src="movie.mp4"
  width="640"
  controls
  poster="cover.jpg"
  preload="metadata"
>
  Your browser does not support the video tag.
</video>

<!-- Multi-source video (cross-browser compatibility) -->
<video controls>
  <source src="movie.webm" type="video/webm" />
  <source src="movie.mp4" type="video/mp4" />
  <track src="subtitles.vtt" kind="subtitles"
         srclang="en" label="English subtitles" />
</video>

<!-- Audio -->
<audio controls>
  <source src="audio.ogg" type="audio/ogg" />
  <source src="audio.mp3" type="audio/mpeg" />
</audio>`,
        },
        {
          id: 'p17-media-parse',
          type: 'paragraph',
          text: 'Code walkthrough: the first video uses a single src; controls shows playback controls; poster is the "cover image" (shown before video loads); preload="metadata" means only metadata is preloaded (not the whole video, saving bandwidth). The second video uses multiple <source> elements — the browser picks the first decodable format from top to bottom (WebM is smaller but old Safari doesn\'t support it, so fall back to MP4). <track> references a subtitle file; kind="subtitles" means subtitles; srclang specifies language — this is the realization of the "Perceivable" principle from the previous section. Audio <audio> works the same way, just without video.',
        },
        {
          id: 'p17-picture-intro',
          type: 'paragraph',
          text: 'Beyond video and audio, images are the bulkiest media resource. A single high-res image may be 2MB; loading it on a phone makes first paint unbearably slow. <img> only takes one fixed image; <picture> + srcset lets the browser "pick the right image for the situation" — small images for phones, high-res for Retina screens, compressed WebP for supporting browsers. This is the core of responsive images. Beginners often struggle with srcset descriptors; let\'s break them down line by line.',
        },
        {
          id: 'p17-picture-code',
          type: 'code',
          language: 'html',
          filename: 'responsive-image.html',
          code: `<!-- Approach 1: srcset + pixel density descriptors (1x/2x) -->
<img
  src="photo.jpg"
  srcset="photo.jpg 1x, photo@2x.jpg 2x, photo@3x.jpg 3x"
  alt="Sample image"
/>
<!-- 1x screen uses photo.jpg; 2x Retina uses photo@2x.jpg for clarity -->

<!-- Approach 2: srcset + width descriptor (w) + sizes -->
<img
  src="photo.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Sample image"
/>
<!-- Browser picks the best width version based on viewport + sizes -->

<!-- Approach 3: <picture> art direction + format fallback -->
<picture>
  <source media="(max-width: 600px)" srcset="mobile.jpg" />
  <source type="image/webp" srcset="photo.webp" />
  <img src="photo.jpg" alt="Sample image" />
</picture>
<!-- Phone uses mobile.jpg (different crop); webp-supported uses webp (smaller); else jpg -->`,
        },
        {
          id: 'p17-picture-parse',
          type: 'paragraph',
          text: 'Code walkthrough — this is the part that needs careful reading:\n• Approach 1\'s 1x/2x/3x are "pixel density descriptors," corresponding to the screen\'s devicePixelRatio. A normal display is 1x (one CSS pixel = one physical pixel); iPhone is 2x or 3x (one CSS pixel = 2~3 physical pixels), so Retina needs 2x pixel images for clarity. The browser detects screen density and picks.\n• Approach 2\'s 400w/800w/1200w are "width descriptors"; w means "this image is 400 pixels wide." But the browser doesn\'t know how big you\'ll display it — sizes tells it: sizes="(max-width: 600px) 100vw, 50vw" means "when viewport ≤ 600px, image takes full width (100vw); otherwise half (50vw)." The browser combines viewport width + devicePixelRatio + sizes to pick the closest image, avoiding wasted bandwidth on oversized downloads.\n• Approach 3\'s <picture> uses <source>\'s media for art direction (entirely different images for phone/desktop, e.g. vertical crop on mobile) and type for format fallback (webp is 30% smaller than jpg but old browsers don\'t support it; put it first, unsupported browsers skip automatically). The final <img> is the fallback, used when no source matches, and must have alt.\nMnemonic: density adaptation uses 1x/2x; size adaptation uses w + sizes; format/composition adaptation uses <picture> + source.',
        },
        {
          id: 'p17-media-3',
          type: 'table',
          caption: 'Common Attributes',
          headers: ['Attribute', 'Purpose', 'Default'],
          rows: [
            ['controls', 'Show playback controls', 'false'],
            ['autoplay', 'Auto-play (most browsers now block)', 'false'],
            ['loop', 'Loop playback', 'false'],
            ['muted', 'Muted', 'false'],
            ['poster', 'Video cover image (video only)', '—'],
            ['preload', 'Preload strategy: none/metadata/auto', 'metadata'],
          ],
        },
        {
          id: 'p17-media-4',
          type: 'callout',
          variant: 'warning',
          title: 'autoplay Restrictions',
          text: 'Modern browsers block autoplay with sound; you must set muted for autoplay to work. This improves UX and avoids noise harassment. Don\'t rely on autoplay in design.',
        },
      ],
    },

    // ========================================================================
    // KP 18: Canvas & SVG Overview
    // ========================================================================
    {
      order: 18,
      title: 'Canvas & SVG Overview',
      difficulty: 1,
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: 'In the last section we embedded "ready-made" media via img/video. But sometimes you want to "draw on the fly" — a dynamic chart, an interactive icon, a signature pad. HTML5 offers two paths: Canvas (use JS to draw a bitmap pixel by pixel; once drawn, it\'s a single image) and SVG (use XML tags to declare a vector graphic; each shape is a DOM node). This section shows the essential difference and when to choose which — choosing wrong leads to performance issues or maintenance nightmares.',
        },
        {
          id: 'p18-2',
          type: 'table',
          caption: 'Canvas vs SVG',
          headers: ['Dimension', 'Canvas', 'SVG'],
          rows: [
            ['Type', 'Bitmap', 'Vector'],
            ['Resolution', 'Pixel-based; scales poorly', 'Resolution-independent; scales infinitely'],
            ['DOM', 'Single <canvas> element', 'Each shape is a DOM node'],
            ['Event handling', 'Manual hit testing', 'Native DOM events per shape'],
            ['Performance', 'Great for many objects/animation', 'Slows with many nodes'],
            ['Use case', 'Games, complex animations, image processing', 'Icons, charts, diagrams, interactive graphics'],
          ],
        },
        {
          id: 'p18-3',
          type: 'code',
          language: 'html',
          code: `<!-- Canvas: draw via JS -->
<canvas id="c" width="200" height="200"></canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  ctx.fillStyle = '#ff7a17';
  ctx.fillRect(10, 10, 150, 100);
</script>

<!-- SVG: declare via XML -->
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="150" height="100" fill="#ff7a17" />
</svg>`,
        },
        {
          id: 'p18-4',
          type: 'callout',
          variant: 'tip',
          title: 'How to choose',
          text: 'Use Canvas when: many objects, high-frequency animation, real-time rendering (games, particle systems, image processing). Use SVG when: few objects, need for individual interactivity, must scale crisply at any size (icons, charts, diagrams, maps). For accessible data visualizations, SVG is usually preferred — screen readers can read each shape\'s title/desc.',
        },
      ],
    },

    // ========================================================================
    // KP 19: HTML5 API Capability Map
    // ========================================================================
    {
      order: 19,
      title: 'HTML5 API Capability Map',
      difficulty: 2,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: 'Everything so far has been about "tags" — using tags to describe content and structure. But modern web pages need to store data (shopping cart), do real-time communication (chat), get location (maps), work offline (PWA)… tags alone are far from enough. The real power of HTML5 is the set of Web APIs it brings: localStorage for data, WebSocket for real-time communication, Geolocation for positioning, Web Worker for multithreading, Service Worker for offline caching. This section uses a knowledge graph to overview these capabilities, building a panorama of "what the browser can do natively" — when you face a requirement, first ask whether a native API can save you a third-party library.',
        },
        {
          id: 'p18-1b',
          type: 'paragraph',
          text: 'HTML5 is not just tags; it is a set of Web APIs that give the browser native capabilities: storage, communication, device access, graphics, offline, and more.',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'html5', label: 'HTML5 API', group: 'core', weight: 2 },
              { id: 'storage', label: 'Storage', group: 'related' },
              { id: 'comm', label: 'Communication', group: 'related' },
              { id: 'device', label: 'Device', group: 'related' },
              { id: 'graphics', label: 'Graphics', group: 'related' },
              { id: 'offline', label: 'Offline', group: 'related' },
              { id: 'localstorage', label: 'localStorage', group: 'detail' },
              { id: 'sessionstorage', label: 'sessionStorage', group: 'detail' },
              { id: 'indexeddb', label: 'IndexedDB', group: 'detail' },
              { id: 'websocket', label: 'WebSocket', group: 'detail' },
              { id: 'webrtc', label: 'WebRTC', group: 'detail' },
              { id: 'geo', label: 'Geolocation', group: 'detail' },
              { id: 'media', label: 'MediaDevices', group: 'detail' },
              { id: 'canvas', label: 'Canvas', group: 'detail' },
              { id: 'svg', label: 'SVG', group: 'detail' },
              { id: 'webgl', label: 'WebGL', group: 'detail' },
              { id: 'sw', label: 'Service Worker', group: 'detail' },
            ],
            edges: [
              { source: 'html5', target: 'storage' },
              { source: 'html5', target: 'comm' },
              { source: 'html5', target: 'device' },
              { source: 'html5', target: 'graphics' },
              { source: 'html5', target: 'offline' },
              { source: 'storage', target: 'localstorage' },
              { source: 'storage', target: 'sessionstorage' },
              { source: 'storage', target: 'indexeddb' },
              { source: 'comm', target: 'websocket' },
              { source: 'comm', target: 'webrtc' },
              { source: 'device', target: 'geo' },
              { source: 'device', target: 'media' },
              { source: 'graphics', target: 'canvas' },
              { source: 'graphics', target: 'svg' },
              { source: 'graphics', target: 'webgl' },
              { source: 'offline', target: 'sw' },
            ],
          },
        },
        {
          id: 'p18-3',
          type: 'demo',
          visualizationType: 'api-card',
          data: {
            title: 'HTML5 API Capability Map',
            hint: 'Click a card to view API details, key methods, and typical use cases.',
            cards: [
              { id: 'canvas', icon: '🎨', name: 'Canvas', tag: '2D Drawing' },
              { id: 'workers', icon: '⚙️', name: 'Web Workers', tag: 'Multithreading' },
              { id: 'websocket', icon: '🔌', name: 'WebSocket', tag: 'Real-time' },
              { id: 'geo', icon: '📍', name: 'Geolocation', tag: 'Location' },
              { id: 'drag', icon: '✋', name: 'Drag & Drop', tag: 'Drag' },
              { id: 'picture', icon: '🖼️', name: 'picture', tag: 'Responsive Image' },
              { id: 'dialog', icon: '💬', name: 'dialog', tag: 'Native Dialog' },
              { id: 'details', icon: '📋', name: 'details', tag: 'Collapse Panel' },
            ],
            details: {
              canvas: {
                title: 'Canvas — 2D Graphics Drawing',
                html: '<b>Purpose:</b> Pixel-level 2D graphics drawing, suitable for charts, games, image processing<br><b>Key methods:</b> <code>getContext("2d")</code> <code>fillRect()</code> <code>arc()</code> <code>fillText()</code><br><b>Note:</b> Canvas is a bitmap and loses quality when scaled; SVG is a vector graphic and does not<br><b>Typical scenarios:</b> Data visualization charts, 2D games, image filters, signature pads',
              },
              workers: {
                title: 'Web Workers — Background Thread Computing',
                html: '<b>Purpose:</b> Execute expensive computation in a separate thread without blocking the UI main thread<br><b>Key methods:</b> <code>new Worker("file.js")</code> <code>postMessage()</code> <code>onmessage</code><br><b>Limitation:</b> Cannot manipulate DOM, cannot access window/document objects<br><b>Typical scenarios:</b> Large dataset sorting, image processing, encryption, complex math',
              },
              websocket: {
                title: 'WebSocket — Full-duplex Real-time Communication',
                html: '<b>Purpose:</b> Establish a persistent two-way connection suitable for real-time data push<br><b>Key methods:</b> <code>new WebSocket("wss://...")</code> <code>send()</code> <code>onmessage</code> <code>close()</code><br><b>vs HTTP polling:</b> One handshake for a persistent connection, low latency and low overhead<br><b>Typical scenarios:</b> Chat apps, real-time collaboration, stock quotes, multiplayer games',
              },
              geo: {
                title: 'Geolocation — Get Geographic Location',
                html: '<b>Purpose:</b> Get the user\'s latitude/longitude, supports one-shot and continuous watching<br><b>Key methods:</b> <code>getCurrentPosition()</code> <code>watchPosition()</code> <code>clearWatch()</code><br><b>Prerequisite:</b> Requires HTTPS + user permission; be mindful of privacy compliance<br><b>Typical scenarios:</b> Map navigation, nearby search, location check-in, weather lookup',
              },
              drag: {
                title: 'Drag & Drop — Native Drag Interaction',
                html: '<b>Purpose:</b> Implement drag-to-sort, file upload, and other interactions without a third-party library<br><b>Key properties/events:</b> <code>draggable="true"</code> <code>dragstart</code> <code>dragover</code> <code>drop</code> <code>dataTransfer</code><br><b>Note:</b> dragover must call <code>preventDefault()</code> for drop to fire<br><b>Typical scenarios:</b> File drag-upload, kanban drag-sort, image drag-arrange',
              },
              picture: {
                title: 'picture — Responsive Images',
                html: '<b>Purpose:</b> Load different images based on screen size and format support<br><b>Key elements:</b> <code>&lt;picture&gt;</code> <code>&lt;source&gt;</code> <code>srcset</code> <code>media</code> <code>type</code><br><b>Advantages:</b> Art direction (different compositions per size) + format fallback (webp → jpg)<br><b>Typical scenarios:</b> Mobile small/desktop large images, WebP priority, Retina screen adaptation',
              },
              dialog: {
                title: 'dialog — Native Dialog',
                html: '<b>Purpose:</b> Native modal/non-modal dialog without JS for backdrop and focus management<br><b>Key methods:</b> <code>showModal()</code> (modal) <code>show()</code> (non-modal) <code>close()</code> <code>returnValue</code><br><b>Features:</b> Built-in ESC close, focus trap, <code>::backdrop</code> pseudo-element<br><b>Typical scenarios:</b> Confirmation dialog, form popup, info prompt, image preview',
              },
              details: {
                title: 'details/summary — Native Collapsible Panel',
                html: '<b>Purpose:</b> Collapsible content region without JavaScript<br><b>Key elements/attributes:</b> <code>&lt;details&gt;</code> <code>&lt;summary&gt;</code> <code>open</code> attribute<br><b>Features:</b> Clicking summary toggles expand/collapse automatically; <code>open</code> attribute is expanded by default<br><b>Typical scenarios:</b> FAQ pages, settings panels, sidebar collapse, code collapse',
              },
            },
          },
        },
      ],
    },

    // ========================================================================
    // KP 20: URL Structure Analysis
    // ========================================================================
    {
      order: 20,
      title: 'URL Structure Analysis',
      difficulty: 1,
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          lead: true,
          text: 'We have covered HTML tags, documents, and APIs. But every Web resource — pages, images, endpoints — is located by one thing: the URL. Every frontend task ultimately depends on it: route navigation (/users/123), API requests (https://api.example.com/v1/list?page=2), SEO (canonical URL structure), even the href of an <a>. This section breaks a URL apart like unpacking a parcel: what each of scheme, host, port, path, query, and fragment is, and how to assemble and parse them in frontend development.',
        },
        {
          id: 'p19-1b',
          type: 'paragraph',
          text: 'A URL (Uniform Resource Locator) is the address of a Web resource. Understanding URL structure is essential for frontend routing, API calls, and SEO.',
        },
        {
          id: 'p19-2',
          type: 'code',
          language: 'text',
          code: `https://user:pass@www.example.com:8080/path/to/page?name=html&lang=zh#section1
  |       |     |        |         |    |            |              |
  |       |     |        |         |    |            |              └─ fragment (anchor)
  |       |     |        |         |    |            └─ query (search params)
  |       |     |        |         |    └─ path
  |       |     |        |         └─ port
  |       |     |        └─ host
  |       |     └─ password (deprecated, not recommended)
  |       └─ username
  └─ scheme (protocol)`,
        },
        {
          id: 'p19-3',
          type: 'table',
          caption: 'URL Parts Explained',
          headers: ['Part', 'Name', 'Example', 'Description'],
          rows: [
            ['scheme', 'Protocol', 'https', 'http / https / ftp / ws, etc.'],
            ['host', 'Host name', 'www.example.com', 'Domain or IP'],
            ['port', 'Port', '8080', 'http defaults to 80, https to 443'],
            ['path', 'Path', '/path/to/page', 'Resource path on the server'],
            ['query', 'Query params', '?name=html&lang=zh', 'Key-value pairs, separated by &'],
            ['fragment', 'Anchor', '#section1', 'In-page position; not sent to the server'],
          ],
        },
        {
          id: 'p19-4',
          type: 'callout',
          variant: 'tip',
          title: 'URL API',
          text: 'Modern browsers provide a URL constructor for easy parsing: new URL("https://example.com/path?q=1") returns an object with protocol / host / pathname / search / hash and other properties.',
        },
        {
          id: 'p19-5',
          type: 'demo',
          visualizationType: 'path-parser',
          data: {
            defaultUrl: 'https://example.com/path/to/page?name=hello&age=25#section',
            examples: [
              'https://example.com/path/to/page?name=hello&age=25#section',
              'http://localhost:3000/api/users?id=123',
              'https://developer.mozilla.org/en-US/docs/Web/HTML',
            ],
            hint: 'Type a URL to parse its components in real time',
          },
        },
      ],
    },

    // ========================================================================
    // KP 21: Practical Case — Accessible Registration Form
    // ========================================================================
    {
      order: 21,
      title: 'Practical Case: Accessible Registration Form',
      difficulty: 3,
      blocks: [
        {
          id: 'p21case-1',
          type: 'paragraph',
          text: 'Combine fieldset/legend grouping, label association, aria-describedby hints, and aria-required marking to build a registration form friendly to assistive technologies.',
        },
        {
          id: 'p21case-2',
          type: 'code',
          language: 'html',
          filename: 'accessible-register.html',
          code: `<form action="/register" method="post" novalidate>
  <fieldset>
    <legend>Account Information</legend>
    <div>
      <label for="username">Username <span aria-hidden="true">*</span></label>
      <input id="username" name="username" type="text"
             required aria-required="true"
             aria-describedby="username-hint" />
      <small id="username-hint">3-20 characters; letters, digits, and underscores only</small>
    </div>
    <div>
      <label for="email">Email <span aria-hidden="true">*</span></label>
      <input id="email" name="email" type="email"
             required aria-required="true"
             aria-describedby="email-hint" />
      <small id="email-hint">Used to receive the verification email</small>
    </div>
  </fieldset>
  <fieldset>
    <legend>Security Settings</legend>
    <div>
      <label for="password">Password</label>
      <input id="password" name="password" type="password"
             minlength="8" required aria-required="true" />
    </div>
    <div>
      <label for="confirm">Confirm Password</label>
      <input id="confirm" name="confirm" type="password" required />
    </div>
  </fieldset>
  <button type="submit">Register</button>
</form>`,
        },
        {
          id: 'p21case-3',
          type: 'callout',
          variant: 'tip',
          title: 'Accessible Form Essentials',
          text: 'Use fieldset/legend for semantic grouping; label[for] to associate with inputs; aria-describedby to link hint text; aria-required to mark required fields; novalidate to disable native validation so you can implement custom validation logic.',
        },
      ],
    },

    // ========================================================================
    // KP 22: Comprehensive Practice — Build a Blog Article Page (task-oriented, assert sandbox)
    // ========================================================================
    {
      order: 22,
      title: 'Comprehensive Practice: Build a Blog Article Page',
      difficulty: 2,
      blocks: [
        {
          id: 'p21proj-1',
          type: 'paragraph',
          lead: true,
          text: 'We have learned document structure, semantic tags, and multimedia — these are discrete building blocks. Now it\'s time to follow a "blueprint" and assemble them. This section is the first comprehensive practice: build a blog article page from scratch. You will combine head metadata, a semantic skeleton (header/nav/main/article/aside/footer), and responsive images with alt. The sandbox on the right ships with a "task checklist" — as you write code it tells you in real time which items are missing and how to fix them. This is the key step from "understanding" to "being able to write".',
        },
        {
          id: 'p21proj-2',
          type: 'paragraph',
          text: 'Task requirements: use semantic tags to lay out a complete article page skeleton, including a header with navigation, the main article (title + body + an image with alt), an aside with related recommendations, and a footer with copyright. The head must include character encoding and the mobile viewport.',
        },
        {
          id: 'p21proj-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Write the HTML for the blog article page in the editor below. The task checklist will validate your code in real time and give hints — pass every item to complete the task. Click "Reset" any time to return to the initial skeleton.',
            initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Add character encoding and mobile viewport -->

  <title>My First Blog Post</title>
</head>
<body>
  <!-- Header + Navigation -->

  <main>
    <!-- Article: title + body + image -->

  </main>

  <!-- Aside with related recommendations -->

  <!-- Footer copyright -->

</body>
</html>`,
            checks: [
              {
                description: 'Declare character encoding <meta charset="UTF-8"> in head',
                pattern: '<meta\\s+charset=["\']?utf-8["\']?',
                hint: 'Add <meta charset="UTF-8" /> inside <head> to prevent garbled characters. Note charset must appear within the first 1024 bytes.',
              },
              {
                description: 'Configure mobile viewport <meta name="viewport" ...>',
                pattern: '<meta\\s+name=["\']viewport["\'][^>]*width=device-width',
                hint: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0" /> — otherwise mobile will shrink the page.',
              },
              {
                description: 'Use a semantic <header>',
                pattern: '<header[\\s>]',
                hint: 'Wrap the page top with <header> instead of <div class="header">. Semantics let screen readers identify the header region.',
              },
              {
                description: 'Wrap navigation with <nav>',
                pattern: '<nav[\\s>]',
                hint: 'Use <nav> for the navigation links region. Screen readers announce "navigation region" and users can skip directly to the main content.',
              },
              {
                description: 'Use <main> as the page main content (and only one)',
                pattern: '<main[\\s>]',
                hint: 'Wrap main content with <main>; only one per page. It tells assistive tech "this is the core content".',
              },
              {
                description: 'Wrap the article content with <article>',
                pattern: '<article[\\s>]',
                hint: 'The article itself is independently distributable content; wrap it with <article> containing a heading (h1/h2) and body.',
              },
              {
                description: 'Include an image inside the article with an alt attribute (accessibility)',
                pattern: '<img[^>]*\\salt=["\'][^"\']+["\']',
                hint: 'Use <img> and always write alt (describing the image). Images without alt "do not exist" for visually impaired users, violating the WCAG perceivable principle.',
              },
              {
                description: 'Use <aside> for the related sidebar',
                pattern: '<aside[\\s>]',
                hint: 'Content related to but not central (sidebar recommendations, ads) goes in <aside>.',
              },
              {
                description: 'Use <footer> for the page footer',
                pattern: '<footer[\\s>]',
                hint: 'Wrap closing content like copyright and contact info with <footer>.',
              },
            ],
          },
        },
        {
          id: 'p21proj-4',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'It chains "document structure + semantic tags + multimedia accessibility" into a real artifact. Once done you\'ll see: semantics are not abstract rules but concrete actions that make a page "machine-readable"; alt is not just an attribute but the only way visually impaired users "see" an image. This "assembly" experience is engineering thinking that memorizing tags alone cannot replace.',
        },
      ],
    },

    // ========================================================================
    // KP 23: Comprehensive Practice — Validated Registration Form (task-oriented, assert sandbox)
    // ========================================================================
    {
      order: 23,
      title: 'Comprehensive Practice: Validated Registration Form',
      difficulty: 2,
      blocks: [
        {
          id: 'p21b-1',
          type: 'paragraph',
          lead: true,
          text: 'The previous practice built a display-oriented page. Now let\'s build an interactive one — a registration form with validation, combining form controls, native validation attributes, and accessible form practices (label association, required marking). This is the second "blueprint": welding together "forms + validation + accessibility". As before, the sandbox checklist validates your code in real time with teaching feedback.',
        },
        {
          id: 'p21b-2',
          type: 'paragraph',
          text: 'Task requirements: implement a registration form with a username (required), email (required + format validation), password (required + at least 8 chars), a role select dropdown, and a submit button. Every input must be associated with a label, and required fields must be marked.',
        },
        {
          id: 'p21b-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: 'Write the HTML for a validated registration form. The checklist validates your code in real time — pass every item to complete. Focus on label association and native validation attributes.',
            initialCode: `<form>
  <!-- Username: required -->

  <!-- Email: required + format validation -->

  <!-- Password: required + at least 8 chars -->

  <!-- Role dropdown -->

  <!-- Submit button -->

</form>`,
            checks: [
              {
                description: 'Wrap the form with <form>',
                pattern: '<form[\\s>]',
                hint: 'All form controls must be inside a <form> to be submitted and validated together.',
              },
              {
                description: 'Username input type="text" and required',
                pattern: '<input[^>]*type=["\']text["\'][^>]*required',
                hint: 'Use <input type="text" required> for the username. required makes the browser block empty submissions. Note: required must be inside the input tag.',
              },
              {
                description: 'Email input type="email" and required',
                pattern: '<input[^>]*type=["\']email["\'][^>]*required',
                hint: 'Use <input type="email" required> for the email. type="email" makes the browser validate the email format (must contain @); mobile will also show a keyboard with @.',
              },
              {
                description: 'Password input type="password" with minlength="8" and required',
                pattern: '<input[^>]*type=["\']password["\'][^>]*(minlength=["\']8["\']|required)',
                hint: 'Use <input type="password" minlength="8" required> for the password. minlength sets the minimum character count. Make sure both minlength and required are present.',
              },
              {
                description: 'Use a <select> dropdown (with a placeholder empty option)',
                pattern: '<select[\\s>]',
                hint: 'Use <select> for role selection, with <option value="">Please select</option> as a placeholder, plus required to force a choice.',
              },
              {
                description: 'Use a <button type="submit"> submit button',
                pattern: '<button[^>]*type=["\']submit["\']',
                hint: 'Use <button type="submit"> for submission — not <div onclick> or <input type="submit">. <button> natively supports keyboard interaction and screen-reader semantics.',
              },
              {
                description: 'Associate every input with <label for> (accessibility)',
                pattern: '<label[^>]*for=["\'][a-zA-Z0-9_-]+["\']',
                hint: 'Pair each input with a <label for="id"> where for matches the input id. Clicking the label focuses the input; screen readers announce "what this field is".',
              },
              {
                description: 'At least one input has aria-required or required marking it as required',
                pattern: 'aria-required=["\'](?:true|false)["\']|required',
                hint: 'Besides required, you can add aria-required="true" so screen readers explicitly announce "required". Native required already implies this — pick one.',
              },
            ],
          },
        },
        {
          id: 'p21b-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection: the boundary of frontend validation',
          text: 'After finishing this exercise remember: all of the validation above (required / minlength / type) is only a "user experience layer" of interception — malicious users can bypass it with novalidate or by directly using Postman. In a real project, this same form must be validated again on the backend. Frontend validation "helps normal users avoid mistakes"; backend validation "ensures data security". Both are indispensable.',
        },
      ],
    },

    // ========================================================================
    // KP 24: Interview Questions
    // ========================================================================
    {
      order: 24,
      title: 'Interview Questions',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p22iv-1',
          type: 'paragraph',
          text: 'Hand-picked high-frequency HTML fundamentals interview questions, covering both concept understanding and practical application. Click to expand and see the reference answer.',
        },
        {
          id: 'p22iv-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: What is HTML semantic markup and why does it matter?',
                content: 'Semantic markup means using meaningful tags (such as header/nav/main/article) to describe content structure, rather than meaningless divs.\n\nWhy it matters:\n1. Improves SEO — search engines can understand content weight.\n2. Improves accessibility — screen readers can navigate.\n3. Enhances readability and maintainability.\n4. Easier team collaboration.',
              },
              {
                title: 'Q2: Difference between src and href?',
                content: 'Both reference external resources, but their loading behavior differs.\n\nsrc (Source):\n- Replaces the current element, e.g. img/script/iframe.\n- The browser pauses parsing to load the resource; it blocks the document.\n\nhref (Hypertext Reference):\n- Establishes a link relationship, e.g. a/link.\n- The browser loads in parallel; non-blocking.\n\nConclusion: src blocks; href does not.',
              },
              {
                title: 'Q3: Difference between defer and async on a script tag?',
                content: 'Both download scripts asynchronously, but execution timing differs.\n\ndefer:\n- Download does not block HTML parsing.\n- Execution waits until HTML parsing finishes; runs in order.\n- Suitable for scripts with dependencies.\n\nasync:\n- Download does not block.\n- Executes immediately when download finishes (pausing HTML parsing).\n- Execution order is not guaranteed.\n- Suitable for independent scripts like analytics.',
              },
              {
                title: 'Q4: What offline storage options does HTML5 offer?',
                content: 'Common options, each with its own use case:\n1. localStorage — 5-10MB, permanent storage.\n2. sessionStorage — 5-10MB, cleared when the tab closes.\n3. IndexedDB — large structured data, async API.\n4. Cookie — 4KB, sent with requests.\n5. Cache API — paired with Service Worker for PWA offline caching.',
              },
              {
                title: 'Q5: What is DOCTYPE and what happens if you omit it?',
                content: '<!DOCTYPE html> declares the document as HTML5 and triggers Standards Mode.\n\nWithout it, the browser enters Quirks Mode:\n- Renders by legacy rules.\n- Causes anomalies in box model, layout, and more.\n\nConclusion: always put DOCTYPE on the first line of the document.',
              },
              {
                title: 'Q6: What does meta viewport do?',
                content: '<meta name="viewport" content="width=device-width, initial-scale=1"> tells mobile browsers:\n- Use the device width as the viewport width.\n- Set initial zoom to 1.\n\nWithout it, mobile pages are scaled down (default 980px viewport). It is a mandatory configuration for responsive design.',
              },
              {
                title: 'Q7: What is the normal flow? How do block and inline elements differ in it?',
                content: 'The normal flow is the browser\'s default element layout rule: elements are arranged by HTML order and by their display traits.\n\nBlock elements (div/p/h1):\n- Take a whole row; stack top to bottom.\n- Width and height can be set.\n\nInline elements (span/a/strong):\n- Arrange left to right within a row.\n- Width/height determined by content; vertical margin/padding does not affect line height.\n\nUnderstanding the normal flow is the foundation for all CSS layout — Flex/Grid are essentially "escaping or reorganizing" the flow.',
              },
              {
                title: 'Q8: Describe the box model. How do Standards Mode and Quirks Mode (IE box model) differ?',
                content: 'The box model has four layers inside out: content → padding → border → margin.\n\nStandards Mode (W3C):\n- CSS width covers only content.\n- Actual occupied width = width + left/right padding + left/right border + left/right margin.\n\nQuirks Mode (IE box model):\n- width includes content + padding + border.\n- Actual occupied width = width + left/right margin.\n\nModern development can switch to the IE box model with box-sizing: border-box, where width means "visible width" — more intuitive.',
              },
              {
                title: 'Q9: What native HTML5 form validations exist? Why can\'t they replace backend validation?',
                content: 'Native validations include:\n1. required — required field.\n2. type validation — email/number/url auto-validates format.\n3. min/max/step — numeric range.\n4. minlength/maxlength — length.\n5. pattern — regex.\n\nCan be disabled with novalidate.\n\nWhy they cannot replace backend validation:\n1. Frontend validation can be bypassed with novalidate or JS.\n2. Requests can bypass the browser (curl/Postman).\n3. Malicious users may tamper with data.\n\nFrontend validation only improves UX; real data validation must happen on the server.',
              },
              {
                title: 'Q10: What are the WCAG POUR principles of accessibility? Give examples.',
                content: 'The four POUR principles:\n1. Perceivable — content can be perceived (images need alt, videos need captions).\n2. Operable — all interactions can be done with the keyboard (don\'t rely on the mouse only; use <button> not <div onclick>).\n3. Understandable — clear language, explicit error messages, predictable behavior.\n4. Robust — parseable by various assistive technologies (standard HTML + correct ARIA).\n\nCore idea: accessibility is not "special features for the blind" — it lets everyone (including the disabled, elderly, and temporarily injured) use the web.',
              },
              {
                title: 'Q11: ARIA usage principles? When to use it and when not?',
                content: 'First rule of ARIA: if you can use native HTML, don\'t use ARIA.\n\nUse it for: rich interactive components with no native HTML equivalent:\n- Tab switching (role="tab").\n- Modal dialog (role="dialog").\n- Live alerts (role="alert").\n\nDon\'t use it when:\n- You can use <button> instead of <div role="button"> — native button has keyboard, focus, and screen-reader support.\n- You duplicate native semantics (e.g. <button role="button">).\n- You add a role without implementing keyboard behavior.\n\nMisuse brings greater maintenance cost and accessibility regressions.',
              },
              {
                title: 'Q12: How to make responsive images? Difference between srcset 1x/2x and w descriptors?',
                content: 'Three approaches:\n1. srcset + density descriptors (1x/2x/3x): choose by devicePixelRatio; Retina screens get HD.\n2. srcset + width descriptors (400w/800w) + sizes: choose by viewport width + display size to save bandwidth.\n3. <picture> + <source>: art direction via media (different composition per device) and format fallback via type (webp→jpg).\n\nDifference:\n- 1x/2x cares only about screen density.\n- w + sizes cares about actual display size.\n- <picture> can swap completely different images by condition.\n\nThe three can be combined.',
              },
              {
                title: 'Q13: Differences between inline, block, and inline-block elements? Give examples of void elements.',
                content: 'Three display traits:\n\nBlock (div/p/h1/ul/table): takes a whole row, width/height settable, default width 100%.\nInline (span/a/strong/em): no line break, size by content, vertical margin/padding does not affect layout.\nInline-block (button/input/img): no line break, width/height settable.\n\nVoid elements have no content and no closing tag: <br>, <hr>, <img>, <input>, <meta>, <link>, <source>, <track>.\n\nNote: <img> is inline-block (a replaced element), behaving like inline-block.',
              },
              {
                title: 'Q14: Scenario — the page loads slowly and interactions lag. What HTML-level issues would you check?',
                content: 'HTML-level checks:\n1. Script position: plain <script> in <head> blocks rendering. Use defer (business scripts) or async (independent scripts), or move to end of body.\n2. Resource size: large uncompressed images, no responsive images (srcset/<picture>); mobile may load desktop-size images.\n3. No lazy loading: add loading="lazy" to <img> and <iframe>.\n4. CSS blocking: <link rel="stylesheet"> blocks rendering. Inline critical CSS; load non-critical CSS async.\n5. Resources uncompressed or without CDN.\n6. preload/prefetch for critical resources.\n\nStart from the Network panel to find the slowest resources.',
              },
              {
                title: 'Q15: Scenario — how would you refactor a navbar built entirely with <div>? Why?',
                content: 'Change <div class="nav"> to <nav>, and use <ul><li><a> structure for the links inside.\n\nWhy:\n1. <nav> lets screen readers identify the "navigation region"; users can skip it to reach the main content.\n2. <ul> conveys "list" semantics; screen readers announce "list, N items".\n3. <a> is a native link — Tab can focus it and Enter activates it; <div onclick> is not keyboard-reachable.\n\nAfter refactoring also:\n- Add aria-label="Main navigation" (to distinguish multiple navs).\n- Mark the current page link with aria-current="page".',
              },
              {
                title: 'Q16: Compare — <b>/<strong>, <i>/<em>, <br>/<p>: what are the differences?',
                content: '<b> vs <strong>:\n- <b> is purely visual bold (no semantics).\n- <strong> means "important" (semantic; screen readers emphasize it), with higher SEO weight.\n\nLikewise <i> is just italic; <em> means "emphasis".\n\n<br> vs <p>:\n- <br> is an in-text line break (for poems, addresses).\n- <p> is a paragraph (block-level; semantically an independent paragraph).\n\nCommon beginner mistake: using <br><br> to create paragraph spacing — should use <p> + CSS margin.\n\nPrinciple: when semantics are available, don\'t rely on style-only tags.',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 25: Knowledge Point Cheat Sheet
    // ========================================================================
    {
      order: 25,
      title: 'Knowledge Point Cheat Sheet',
      difficulty: 1,
      blocks: [
        {
          id: 'p23cs-1',
          type: 'paragraph',
          text: 'A quick reference for the core knowledge points of HTML fundamentals — review key concepts and usage fast.',
        },
        {
          id: 'p23cs-2',
          type: 'table',
          caption: 'HTML Fundamentals Cheat Sheet',
          headers: ['Topic', 'Key Points', 'Common Tags / Attributes'],
          rows: [
            ['Document structure', 'DOCTYPE + html + head + body', '<!DOCTYPE> <html> <head> <body>'],
            ['Metadata', 'Encoding, viewport, title', '<meta charset> <meta viewport> <title>'],
            ['Semantic structure', 'Replace div with semantic tags', '<header> <nav> <main> <article> <section> <aside> <footer>'],
            ['Text semantics', 'Emphasis, quotes, terms', '<em> <strong> <blockquote> <q> <abbr> <code>'],
            ['Forms', 'User input and validation', '<form> <input> <select> <textarea> <button>'],
            ['Input types', '20+ native types', 'text email password number date color range file'],
            ['Tables', 'Two-dimensional data', '<table> <thead> <tbody> <tr> <th> <td>'],
            ['Description lists', 'Term-description pairs', '<dl> <dt> <dd>'],
            ['Multimedia', 'Native audio/video playback', '<video> <audio> <source> <track>'],
            ['Graphics', 'Canvas bitmap vs SVG vector', '<canvas> <svg>'],
            ['Accessibility', 'WCAG POUR four principles', 'alt aria-* role tabindex <label>'],
            ['HTML5 APIs', 'Storage / communication / device / graphics', 'localStorage WebSocket Geolocation Worker'],
            ['Paths', 'Absolute / relative / anchor', '<a href> <img src>'],
            ['Void elements', 'No closing tag', '<br> <hr> <img> <input> <meta> <link>'],
            ['Global attributes', 'Available on all elements', 'id class style data-* aria-* hidden'],
          ],
        },
      ],
    },

    // ========================================================================
    // KP 26: Quiz — HTML Fundamentals (QuizCard)
    // ========================================================================
    {
      order: 26,
      title: 'Quiz: HTML Fundamentals',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          text: 'Take this quiz to check your grasp of HTML fundamentals. Each wrong answer reveals an explanation to help you fill the gaps.',
        },
        {
          id: 'p20-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'Which type does the <br> tag belong to?',
                options: ['Block element', 'Inline element', 'Void element (self-closing)', 'Form element'],
                correctIndex: 2,
                explanation: '<br> is a void element — it has no content and needs no closing tag. Similar tags include <hr>, <img>, <input>, <meta>, <link>.',
              },
              {
                question: 'Which tag defines the main title of a document?',
                options: ['<head>', '<header>', '<h1>', '<title>'],
                correctIndex: 2,
                explanation: '<h1> is the page main heading; only one per page is recommended. <title> is the browser tab title (inside head); <header> is a semantic header region; <head> is the document head.',
              },
              {
                question: 'Which statement about semantic tags is WRONG?',
                options: [
                  'Semantic tags improve SEO',
                  'Semantic tags improve accessibility',
                  'You should completely replace semantic tags with div',
                  'nav is used for navigation link regions',
                ],
                correctIndex: 2,
                explanation: 'The value of semantic tags is exactly what div cannot provide: SEO, accessibility, readability. Prefer semantic tags; use div only when no suitable semantic tag exists.',
              },
              {
                question: 'What is the first rule of ARIA?',
                options: [
                  'Every element must have ARIA attributes',
                  'If you can use native HTML, don\'t use ARIA',
                  'ARIA can replace all HTML semantics',
                  'ARIA is only for form elements',
                ],
                correctIndex: 1,
                explanation: 'First rule of ARIA: if a native HTML element or attribute can provide the needed semantics, don\'t use ARIA. ARIA is a supplement, not a replacement. Use <button> instead of <div role="button">.',
              },
              {
                question: 'Which input type triggers a numeric keyboard on mobile?',
                options: ['type="text"', 'type="tel"', 'type="password"', 'type="email"'],
                correctIndex: 1,
                explanation: 'type="tel" triggers a numeric keyboard (with # and *) on mobile, suitable for phone numbers. type="number" also shows a numeric keyboard with a decimal point. type="email" shows a keyboard with @.',
              },
              {
                question: 'Which statement about the HTML5 video element is correct?',
                options: [
                  'autoplay can unconditionally auto-play videos with sound',
                  'poster sets the video cover image',
                  'A video element can only have one source',
                  'video does not support captions',
                ],
                correctIndex: 1,
                explanation: 'poster specifies the cover image shown before the video loads. Modern browsers block autoplay with sound (need muted). A video can contain multiple source elements for format compatibility and use <track> for captions.',
              },
              {
                question: '[Understanding] Which description of the normal flow is correct?',
                options: [
                  'Block elements arrange left to right by default',
                  'Inline elements\' vertical margin pushes adjacent lines apart',
                  'Block elements take a whole row and stack top to bottom by default',
                  'The normal flow only affects inline elements, not block elements',
                ],
                correctIndex: 2,
                explanation: 'In the normal flow, block elements take a whole row and stack top to bottom; width/height settable. Inline elements arrange left to right; vertical margin/padding does not affect line height (does not push adjacent lines). This is why margin-top on a <span> "seems to do nothing".',
              },
              {
                question: '[Understanding] In the standard box model, an element has width:100px, padding:10px, border:2px. What is the actual occupied width?',
                options: ['100px', '112px', '124px', '110px'],
                correctIndex: 2,
                explanation: 'In Standards Mode, width covers only content. Actual width = width(100) + left/right padding(10×2=20) + left/right border(2×2=4) = 124px. With box-sizing:border-box, width includes padding+border, so actual width = 100 + left/right margin.',
              },
              {
                question: '[Application] Mobile page text appears too small and scaled down. Which head declaration is most likely missing?',
                options: [
                  '<meta charset="UTF-8">',
                  '<meta name="viewport" content="width=device-width, initial-scale=1">',
                  '<!DOCTYPE html>',
                  '<title>',
                ],
                correctIndex: 1,
                explanation: 'Without meta viewport, mobile browsers default to a 980px viewport and shrink the page to fit, making text tiny. Adding width=device-width sets the viewport to the device width so responsive design works.',
              },
              {
                question: '[Application] Which option is correct for keyboard accessibility?',
                options: [
                  '<div class="btn" onclick="save()">Save</div>',
                  '<span class="btn" onclick="save()">Save</span>',
                  '<button type="button" onclick="save()">Save</button>',
                  '<a href="javascript:save()">Save</a>',
                ],
                correctIndex: 2,
                explanation: '<button> natively supports Tab focus, Enter/Space activation, and screen-reader "button" announcement. <div onclick>/<span onclick> are not keyboard-reachable; <a href="javascript:"> has wrong semantics and broken keyboard behavior. First accessibility principle: use native interactive elements.',
              },
              {
                question: '[Compare] To display a high-resolution image on a Retina screen, which srcset descriptor should you use?',
                options: [
                  'srcset="img.jpg 400w"',
                  'srcset="img.jpg 1x, img@2x.jpg 2x"',
                  'srcset="img.jpg 100%"',
                  'sizes="2x"',
                ],
                correctIndex: 1,
                explanation: '1x/2x/3x are pixel-density descriptors; the image is chosen by devicePixelRatio. A Retina screen (2x) picks img@2x.jpg. The w descriptor (400w) selects by image actual width and must be paired with sizes for display size.',
              },
              {
                question: '[Compare] What is the core difference between <strong> and <b>?',
                options: [
                  '<strong> is bold; <b> is not',
                  '<strong> means semantic "important"; <b> is just visual bold with no semantics',
                  '<strong> is block; <b> is inline',
                  'They are identical',
                ],
                correctIndex: 1,
                explanation: '<strong> semantically means "important"; screen readers emphasize it and SEO weight is higher. <b> is just visual bold, no semantics. Likewise <em> (emphasis) vs <i> (italic). Principle: use semantic tags for meaning; leave pure styling to CSS.',
              },
              {
                question: '[Scenario] After the user submits a form, the backend reports "invalid email format", but the frontend already used type="email". The most likely cause?',
                options: [
                  'type="email" did not take effect',
                  'Frontend validation can be bypassed; the backend must validate independently',
                  'The browser does not support type="email"',
                  'The form has no name attribute',
                ],
                correctIndex: 1,
                explanation: 'Frontend validation (including type="email") can be bypassed with novalidate or by constructing the request directly. Frontend validation is only for UX; real data validation must happen on the backend. This is a security principle.',
              },
              {
                question: '[Scenario] You want a video to auto-play on mobile without errors. The correct approach?',
                options: [
                  'Just add the autoplay attribute',
                  'Add both autoplay and muted attributes',
                  'Add autoplay and loop attributes',
                  'Add autoplay and controls attributes',
                ],
                correctIndex: 1,
                explanation: 'Modern browsers block autoplay with sound (to avoid noise harassment); you must also set muted for autoplay to work. This is a UX policy — do not rely on autoplay as a core interaction in design.',
              },
              {
                question: '[Comprehensive] Which statement about <picture> + <source> is WRONG?',
                options: [
                  'Use the media attribute for art direction (different images per screen)',
                  'Use the type attribute for format fallback (webp → jpg)',
                  '<picture> must contain an <img> as fallback',
                  '<picture> can completely replace <img> without alt',
                ],
                correctIndex: 3,
                explanation: '<picture> must contain an <img> as fallback (shown when no <source> matches), and the <img> must have alt for accessibility. <picture> itself does not remove the accessibility obligation of <img>.',
              },
            ],
          },
        },
      ],
    },
  ],
}
