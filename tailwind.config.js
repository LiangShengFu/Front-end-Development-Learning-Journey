/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand & Accent
        primary: '#ffffff',
        'on-primary': '#0a0a0a',
        ink: '#ffffff',
        'ink-hover': '#fafaf7',
        body: '#dadbdf',
        'body-mid': '#7d8187',
        mute: '#7d8187',
        // Surface
        canvas: '#0a0a0a',
        'canvas-soft': '#1a1c20',
        'canvas-card': '#191919',
        'canvas-mid': '#363a3f',
        'canvas-bg-inset': '#141518',
        'canvas-bg-hover': '#1f2125',
        hairline: '#212327',
        // Polarity-flipped soft surface (light bg, pairs with text-canvas)
        'ink-soft': '#fafaf7',
        // Brighter body text for code blocks / emphasis
        'body-hi': '#eaeaec',
        // Accents
        'accent-sunset': '#ff7a17',
        'accent-sunset-soft': '#ffc285',
        'accent-dusk': '#7c3aed',
        'accent-twilight': '#c4b5fd',
        'accent-breeze': '#a0c3ec',
        'accent-midnight': '#0d1726',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        'display-xl': ['96px', { lineHeight: '96px', letterSpacing: '-2.4px' }],
        'display-lg': ['72px', { lineHeight: '72px', letterSpacing: '-1.8px' }],
        'display-md': ['48px', { lineHeight: '48px', letterSpacing: '-1.2px' }],
        'display-sm': ['32px', { lineHeight: '36px', letterSpacing: '-0.6px' }],
        'display-xs': ['20px', { lineHeight: '28px' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        'body-md': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'caption-mono': ['14px', { lineHeight: '20px', letterSpacing: '1.4px' }],
        'caption-mono-sm': ['12px', { lineHeight: '16px', letterSpacing: '1.2px' }],
        'button-md': ['14px', { lineHeight: '20px' }],
      },
      spacing: {
        xxs: '2px',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
      borderRadius: {
        none: '0px',
        sm: '8px',
        pill: '9999px',
        full: '9999px',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
