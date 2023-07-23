/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    gridTemplateColumns: {
      'cards': 'repeat(auto-fit, minmax(120px, auto))',
    },
    fontFamily: {
      'space2p': '"Press Start 2P", system-ui, Helvetica, Arial, sans-serif',
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

