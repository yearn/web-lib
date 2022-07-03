const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')('postcss-nesting'),
	require('autoprefixer'),
    tailwindcss('./config/tailwind.config.cjs')
  ]
}