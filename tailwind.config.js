/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    gridTemplateColumns: {
      'cards': 'repeat(auto-fit, minmax(120px, 1fr))',
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [ require('daisyui') ],
  daisyui: {
    themes: ['business', 'retro'],
    darkTheme: "business",
    base: true,
    styled: true,
    util: true,
    logs: true,
  },
}

