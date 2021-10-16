const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    'src/**/*.ts'
  ],
  darkMode: "class",
  theme: {
    colors,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}