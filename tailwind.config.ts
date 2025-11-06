import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        retro: {
          bg: '#0a0a0a',
          primary: '#00ff41',
          secondary: '#ff00ff',
          accent: '#00ffff',
          warning: '#ffff00',
          danger: '#ff0040',
          text: '#00ff41',
          border: '#00ff41',
        },
      },
      fontFamily: {
        retro: ['"Courier New"', 'Courier', 'monospace'],
      },
      animation: {
        'scan-line': 'scan-line 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'terminal-blink': 'terminal-blink 1s step-end infinite',
      },
      keyframes: {
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41',
          },
          '50%': { 
            boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
          },
        },
        'terminal-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
