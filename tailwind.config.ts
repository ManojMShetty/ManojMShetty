import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './remotion/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Pure black with subtle warm elevation tiers
        bg: {
          DEFAULT: '#000000',
          soft: '#070708',
          card: '#0a0a0c',
          elevated: '#101013',
          border: 'rgba(255,255,255,0.06)',
        },
        // Refined arc-blue: less neon, more sophisticated
        arc: {
          DEFAULT: '#7dd3fc',
          bright: '#bae6fd',
          dim: '#0c4a6e',
          deep: '#082f49',
          glow: 'rgba(125,211,252,0.3)',
        },
        // Warmer, more refined gold
        gold: {
          DEFAULT: '#fbbf24',
          dim: '#78350f',
        },
        // Off-white text — easier on the eyes than pure white
        ink: {
          DEFAULT: '#f5f5f7',
          soft: '#a1a1aa',
          muted: '#52525b',
          dim: '#27272a',
        },
        // Used sparingly as accent
        ember: '#fb7185',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Consolas', 'monospace'],
      },
      fontSize: {
        '8xl': ['8rem', {lineHeight: '0.92', letterSpacing: '-0.04em'}],
        '9xl': ['10rem', {lineHeight: '0.9', letterSpacing: '-0.05em'}],
        '10xl': ['12rem', {lineHeight: '0.88', letterSpacing: '-0.06em'}],
      },
      letterSpacing: {
        widest: '0.3em',
        ultra: '0.4em',
      },
      boxShadow: {
        // Premium elevation — subtle, multi-layer
        elev: '0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 60px -20px rgba(0,0,0,0.8), 0 8px 24px -12px rgba(0,0,0,0.5)',
        'elev-lg': '0 1px 0 rgba(255,255,255,0.06) inset, 0 40px 80px -24px rgba(0,0,0,0.9), 0 16px 40px -20px rgba(0,0,0,0.6)',
        arc: '0 0 80px -20px rgba(125,211,252,0.4)',
        'arc-tight': '0 0 40px -16px rgba(125,211,252,0.35)',
        glow: '0 30px 100px -30px rgba(125,211,252,0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        // Apple's standard easing
        'apple': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'apple-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'apple-in': 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      animation: {
        'fade-in': 'fade-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'float': 'float 7s ease-in-out infinite',
        'aurora': 'aurora 20s ease infinite',
      },
      keyframes: {
        'fade-in': {
          from: {opacity: '0', transform: 'translateY(24px)'},
          to: {opacity: '1', transform: 'translateY(0)'},
        },
        marquee: {
          from: {transform: 'translateX(0)'},
          to: {transform: 'translateX(-50%)'},
        },
        shimmer: {
          '0%, 100%': {opacity: '0.6'},
          '50%': {opacity: '1'},
        },
        float: {
          '0%, 100%': {transform: 'translateY(0)'},
          '50%': {transform: 'translateY(-14px)'},
        },
        aurora: {
          '0%, 100%': {transform: 'translate(0, 0) rotate(0deg)'},
          '50%': {transform: 'translate(30px, -30px) rotate(180deg)'},
        },
      },
    },
  },
  plugins: [],
};

export default config;
