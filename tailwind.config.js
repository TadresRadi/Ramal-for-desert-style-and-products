/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#faf8f2',
          100: '#f5f0e3',
          200: '#ebe0c7',
          300: '#dcc9a3',
          400: '#c9ad7e',
          500: '#b89660',
          600: '#a47d4a',
          700: '#89643d',
          800: '#705136',
          900: '#5c432f',
          950: '#312217',
        },
        desert: {
          50: '#fdf5ef',
          100: '#fbe8d9',
          200: '#f6cdb2',
          300: '#f0ab80',
          400: '#e8814d',
          500: '#e2632c',
          600: '#d34a21',
          700: '#af381d',
          800: '#8c2f1f',
          900: '#71291c',
          950: '#3d120c',
        },
        dune: {
          50: '#f9f6f1',
          100: '#f0ebe0',
          200: '#e0d5bf',
          300: '#cdb999',
          400: '#b99a72',
          500: '#ab8458',
          600: '#9e724c',
          700: '#845c40',
          800: '#6c4b38',
          900: '#583f30',
          950: '#2f2018',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'warm': '0 4px 20px -2px rgba(200, 150, 80, 0.15)',
        'glow': '0 0 20px rgba(232, 129, 77, 0.2)',
      },
    },
  },
  plugins: [],
}
