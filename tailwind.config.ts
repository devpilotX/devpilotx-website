import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: { center: true, padding: '1.25rem', screens: { '2xl': '1240px' } },
    extend: {
      colors: {
        bg: { DEFAULT: '#0a0a0f', soft: '#0e0e16', card: '#101019' },
        border: { DEFAULT: 'rgba(255,255,255,0.08)', strong: 'rgba(255,255,255,0.14)' },
        ink: { DEFAULT: '#e7e7ee', dim: '#a0a0b0', muted: '#6b6b7c' },
        brand: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81'
        },
        cyan: {
          400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2'
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      backgroundImage: {
        'mesh': 'radial-gradient(60% 50% at 20% 10%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(50% 40% at 80% 20%, rgba(6,182,212,0.22) 0%, transparent 60%), radial-gradient(40% 40% at 50% 90%, rgba(217,70,239,0.18) 0%, transparent 60%)',
        'grid': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)'
      },
      backgroundSize: { 'grid': '40px 40px' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'gradient-drift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        'shimmer': { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'pulse-soft': { '0%,100%': { opacity: '0.7' }, '50%': { opacity: '1' } }
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'gradient-drift': 'gradient-drift 10s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite'
      },
      boxShadow: {
        'glow': '0 0 0 1px rgba(255,255,255,0.06), 0 30px 60px -30px rgba(99,102,241,0.45)',
        'card': '0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 50px -30px rgba(0,0,0,0.6)'
      },
      borderRadius: { xl: '14px', '2xl': '18px', '3xl': '24px' }
    }
  },
  plugins: []
};

export default config;
