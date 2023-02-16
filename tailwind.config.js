/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      poppins: 'Poppins, sans-serif',
    },
    extend: {
      colors: {
        discord: {
          100: '#36393f',
          200: '#2f3136',
        },
        hyperlink: '#0cbc8b'
      },},
  },
  plugins: [],
};
