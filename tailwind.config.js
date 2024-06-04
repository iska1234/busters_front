/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme:{
    extend: {
      colors: {
        primary: {
          default: '#E2272C',
          light: '#ECEAE2',
          dark: '#23233A',
          fullDark: '#121215',
        },
        'background-gray': '#D0CFCD',
        'gray-icons': '#A8A9AD',
        'dark': '#1C1C1C',
      },
    },
  },
  plugins: [
]

}
