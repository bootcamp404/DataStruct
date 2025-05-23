/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Activa el modo oscuro basado en clase 'dark'
  content: [
    "./src/**/*.{html,ts}", // Escanea tus archivos Angular para clases Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
