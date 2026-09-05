/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060913',
          900: '#0A0F1D',
          850: '#0F1629',
          800: '#141E38',
          700: '#1E2D54',
        },
        brand: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        accent: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-brand': '0 0 35px -5px rgba(245, 158, 11, 0.3)',
        'glow-accent': '0 0 35px -5px rgba(99, 102, 241, 0.3)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, rgba(6, 9, 19, 0) 70%)',
      }
    },
  },
  plugins: [],
};
