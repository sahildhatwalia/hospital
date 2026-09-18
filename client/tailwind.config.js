/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nexline: {
          navy: '#070F2B',
          blue: '#0A2463',
          cyan: '#00D4FF',
          emerald: '#10B981',
          crimson: '#EF4444',
          card: 'rgba(15, 28, 77, 0.65)',
        },
        primary: {
          DEFAULT: '#0A2463',
          hover: '#071A47',
          bg: '#EBF3FF',
          text: '#0A2463',
        },
        accent: {
          DEFAULT: '#00D4FF',
          glow: 'rgba(0, 212, 255, 0.25)',
        },
        secondary: {
          DEFAULT: '#00D4FF',
          hover: '#00B4D8',
          bg: '#E0F7FA',
          text: '#00838F',
        },
        danger: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          bg: '#FEE2E2',
          text: '#991B1B',
        },
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          bg: '#FEF3C7',
          text: '#92400E',
        },
        success: {
          DEFAULT: '#10B981',
          hover: '#059669',
          bg: '#D1FAE5',
          text: '#065F46',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          dark: '#070F2B',
          darkCard: '#0F1C4D',
          darkBorder: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.08)',
        'cyan-glow': '0 0 25px rgba(0, 212, 255, 0.35)',
        'crimson-glow': '0 0 25px rgba(239, 68, 68, 0.35)',
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
