import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1280px' } },
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
          DEFAULT: 'rgb(var(--border-rgb) / 0.08)',
          strong: 'rgb(var(--border-rgb) / 0.18)'
        },
        brand: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#0e5aea', 700: '#1d4ed8',
          800: '#1e40af', 900: '#1e3a8a', 950: '#0b1f3a'
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['var(--font-fraunces)', 'Fraunces', 'New York', 'Iowan Old Style', 'Georgia', 'serif']
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
        'glow': '0 20px 40px -24px rgb(var(--border-rgb) / 0.20)',
        'card': '0 1px 2px rgb(var(--border-rgb) / 0.04), 0 20px 40px -28px rgb(var(--border-rgb) / 0.18)'
      },
      borderRadius: { xl: '12px', '2xl': '16px', '3xl': '24px' }
    }
  },
  plugins: []
};

export default config;
