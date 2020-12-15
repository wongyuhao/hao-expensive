const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    ...defaultTheme,
    extend: {
      colors:{
        gray: colors.trueGray
      },
    },
  },
  variants: {
    extend: {},
  },
  
  plugins: [],
}
