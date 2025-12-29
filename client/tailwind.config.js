/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFCFA',
          100: '#FAF6F0',
          200: '#F5EDE0',
          300: '#E8DBC8',
        },
        burgundy: {
          400: '#8B3A44',
          500: '#722F37',
          600: '#5C262D',
          700: '#461D23',
        },
        gold: {
          300: '#E0C04D',
          400: '#D4AF37',
          500: '#C9A227',
          600: '#A88B20',
        },
        ink: {
          600: '#4D3B2F',
          700: '#3D2B1F',
          800: '#2D1F16',
          900: '#1A120D',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Source Serif Pro"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'parchment': '0 2px 8px rgba(61, 43, 31, 0.08)',
        'parchment-lg': '0 4px 16px rgba(61, 43, 31, 0.12)',
      },
    },
  },
  plugins: [],
};
