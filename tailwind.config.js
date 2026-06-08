/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ford: {
          blue: '#003476',
          dark: '#000d1a',
          darker: '#001a3a',
          accent: '#4a9eff',
          silver: '#c8d0db',
        }
      },
      fontFamily: {
        condensed: ['Barlow Condensed', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
