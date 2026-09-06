/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        oxford: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#C7D9FE',
          600: '#1D4ED8',
          700: '#1E3A8A',
          800: '#172554',
          900: '#0F172A',
          950: '#020617',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        eucalyptus: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        parchment: {
          50: '#FDFBF7',
          100: '#FAF4E8',
          200: '#F3EAD7',
          300: '#E8DCBF',
          400: '#D7C49C',
          500: '#BF9E68',
        },
        espresso: {
          50: '#FBF9F7',
          100: '#F4ECE4',
          200: '#E6D7C7',
          600: '#684530',
          700: '#523422',
          800: '#3D2517',
          900: '#2A190F',
          950: '#180E08',
        },
        'vintage-navy': '#1B2E4B',
        'vintage-red': '#A33B2B',
      },
      fontFamily: {
        heading: ['Outfit', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        academy: ['Outfit', 'Playfair Display', 'Cinzel', 'serif'],
        vintage: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(15, 23, 42, 0.07), 0 10px 20px -2px rgba(15, 23, 42, 0.04)',
        'soft-lg': '0 10px 30px -5px rgba(15, 23, 42, 0.09), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
        'gold-glow': '0 0 30px -3px rgba(245, 158, 11, 0.4)',
        'blue-glow': '0 0 25px -4px rgba(30, 58, 138, 0.25)',
        'card-lift': '0 20px 40px -15px rgba(42, 25, 15, 0.12)',
        'dice': '0 10px 25px -3px rgba(217, 119, 6, 0.35), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'light-radial': 'radial-gradient(circle at 50% 0%, rgba(219, 234, 254, 0.5) 0%, rgba(255, 255, 255, 0) 70%)',
        'subtle-grid': "radial-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px)",
        'mesh-warm': "radial-gradient(at 0% 0%, rgba(254, 243, 199, 0.7) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(224, 235, 255, 0.6) 0px, transparent 50%)",
      }
    },
  },
  plugins: [],
};
