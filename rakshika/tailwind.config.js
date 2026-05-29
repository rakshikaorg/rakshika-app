/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: '#e11d48',
        safe: '#10b981',
        dark: '#0f172a',
      }
    },
  },
  plugins: [],
}