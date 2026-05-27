import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './remotion/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#03060f',
          soft: '#070d1f',
          card: '#0a1230',
          border: 'rgba(255,255,255,0.08)',
        },
        arc: {
          DEFAULT: '#00d4ff',
          dim: '#0a4f6b',
          glow: 'rgba(0,212,255,0.4)',
        },
        gold: {
          DEFAULT: '#ffb700',
          dim: '#6b4e00',
        },
        ink: {
          DEFAULT: '#e8f4ff',
          soft: '#a8b8cc',
          muted: '#5d6b85',
        },
        ember: '#ff5a3c',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Consolas', 'monospace'],
      },
      fontSize: {
        '8xl': ['8rem', {lineHeight: '0.95', letterSpacing: '-0.04em'}],
        '9xl': ['10rem', {lineHeight: '0.92', letterSpacing: '-0.05em'}],
        '10xl': ['12rem', {lineHeight: '0.9', letterSpacing: '-0.06em'}],
      },
      boxShadow: {
        arc: '0 0 60px rgba(0, 212, 255, 0.5)',
        'arc-soft': '0 0 30px rgba(0, 212, 255, 0.2)',
        'arc-inner': 'inset 0 0 30px rgba(0, 212, 255, 0.1)',
        glow: '0 20px 80px -20px rgba(0, 212, 255, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 35s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          from: {opacity: '0', transform: 'translateY(20px)'},
          to: {opacity: '1', transform: 'translateY(0)'},
        },
        marquee: {
          from: {transform: 'translateX(0)'},
          to: {transform: 'translateX(-50%)'},
        },
        shimmer: {
          '0%, 100%': {opacity: '0.5'},
          '50%': {opacity: '1'},
        },
        float: {
          '0%, 100%': {transform: 'translateY(0)'},
          '50%': {transform: 'translateY(-12px)'},
        },
      },
    },
  },
  plugins: [],
};

export default config;
