/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/example/src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-primeui')
  ],
}

