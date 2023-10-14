/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
        sm: '1rem',
        md: '2rem',
      },
    },
    fontFamily: {
      poppins: 'Poppins, sans-serif',
      'roboto-mono': 'Roboto Mono, sans-serif',
    },
    extend: {
      colors: {
        palette: {
          100: '#ffffff',
          200: '#fefefe',
          300: '#b9bbbe',
          400: '#8e9297',
          500: '#4f545c',
          600: '#36393f',
          700: '#2f3136',
          800: '#292b2f',
          900: '#202225',
        },
        hyperlink: '#0cbc8b',
      },
      listStyleType: {
        'disclosure-closed': 'disclosure-closed',
      },
    },
  },
  plugins: [],
};
