import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: { center: true, padding: '1.25rem', screens: { '2xl': '1240px' } },
    extend: {
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--bg) / <alpha-value>)',
          soft: 'rgb(var(--bg-soft) / <alpha-value>)',
          card: 'rgb(var(--bg-card) / <alpha-value>)',
          elevated: 'rgb(var(--bg-elevated) / <alpha-value>)'
        },
        fg: {
          DEFAULT: 'rgb(var(--fg) / <alpha-value>)',
          dim: 'rgb(var(--fg-dim) / <alpha-value>)',
          muted: 'rgb(var(--fg-muted) / <alpha-value>)'
        },
        ink: {
          DEFAULT: 'rgb(var(--fg) / <alpha-value>)',
          dim: 'rgb(var(--fg-dim) / <alpha-value>)',
          muted: 'rgb(var(--fg-muted) / <alpha-value>)'
        },
        border: {
          DEFAULT: 'rgb(var(--border-rgb) / 0.10)',
          strong: 'rgb(var(--border-rgb) / 0.20)'
        },
        brand: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81'
        },
        cyan: { 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2' }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, rgb(var(--brand)) 0%, rgb(var(--brand-2)) 100%)'
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'pulse-soft': { '0%,100%': { opacity: '0.7' }, '50%': { opacity: '1' } }
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite'
      },
      boxShadow: {
        'glow': '0 0 0 1px rgb(var(--border-rgb) / 0.06), 0 30px 60px -30px rgb(var(--brand) / 0.45)',
        'card': '0 1px 0 rgb(var(--border-rgb) / 0.06) inset, 0 24px 60px -32px rgb(0 0 0 / 0.40)'
      },
      borderRadius: { xl: '14px', '2xl': '18px', '3xl': '24px' }
    }
  },
  plugins: []
};

export default config;
