/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: '#8B2635',
        'burgundy-light': '#A93F50',
        rose: '#C2748A',
        'rose-light': '#D4919F',
        'rose-dim': '#9B5A6A',
        cream: '#F5F0E8',
        'cream-muted': '#D9CEBD',
        blush: '#EDD5CA',
        gold: '#C9A87B',
        'gold-light': '#D9BC92',
        dark: '#0A0808',
        'dark-1': '#110D0D',
        'dark-2': '#180F0F',
        'dark-3': '#1E1515',
        'dark-4': '#261B1B',
        'dark-5': '#2E2020',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'ken-burns': 'ken-burns 20s ease-in-out infinite alternate',
        'fade-in': 'fade-in 1s ease forwards',
        'slide-up': 'slide-up 0.8s ease forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.05) translate(0, 0)' },
          '100%': { transform: 'scale(1.15) translate(-2%, -1%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
