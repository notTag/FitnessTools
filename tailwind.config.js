/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./src/**/*.{js,jsx,ts,tsx}",
"./public/index.html"
],
  theme: {
    extend: {
      colors: {
        'snes-button': '#A65E9A',
        'snes-button-hover': '#804070',
        'snes-grey': '#C4C4C4',
      },
    },
  },
  plugins: [],
}

