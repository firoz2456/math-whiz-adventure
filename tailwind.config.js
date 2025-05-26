/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rounded: ['Quicksand', 'sans-serif'],
      },
      animation: {
        'bounce-once': 'bounce 1s ease-in-out 1',
      },
    },
  },
  plugins: [],
};