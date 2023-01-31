/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#08dddd',
          light: '#08eaea',
          dark: '#07c5c5',
        },
        secondary: {
          main: '#07182c',
          light: '#0b2441',
          dark: '#040d18',
        },
      },
    },
  },
  plugins: [],
};
