import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './remotion/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#04081f',
        'bg-card': '#0a1230',
        arc: '#00d4ff',
        'arc-dim': '#0a4f6b',
        gold: '#ffb700',
        ink: '#e8f4ff',
        muted: '#7a8aa3',
      },
      fontFamily: {
        sans: ['"SF Pro Display"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        arc: '0 0 60px rgba(0, 212, 255, 0.4)',
        'arc-soft': '0 0 30px rgba(0, 212, 255, 0.15)',
      },
      animation: {
        'pulse-arc': 'pulse-arc 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-arc': {
          '0%, 100%': {opacity: '1', filter: 'drop-shadow(0 0 20px #00d4ff)'},
          '50%': {opacity: '0.85', filter: 'drop-shadow(0 0 40px #00d4ff)'},
        },
      },
    },
  },
  plugins: [],
};

export default config;
