/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#4ade80',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  
  plugins: [],
}

