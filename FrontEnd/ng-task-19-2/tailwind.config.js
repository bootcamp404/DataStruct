/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class', 'body.dark'],
  content: [ './src/**/*.{html,ts}' ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1176E1',
          dark: '#0D5CA8',
          light: '#4A9EFF'
        },
        secondary: {
          DEFAULT: '#20B26E',
          dark: '#1A8F5A',
          light: '#4DC88A'
        },
      },
    },
  },
  plugins: [],
}
