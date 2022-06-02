const {join} = require('path');

module.exports = {
	presets: [
		require('./tailwind.plugin.cjs')
	],
	content: [
		'./pages/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		join(__dirname, '..', 'web-lib', 'layouts', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, '..', 'web-lib', 'components', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, '..', 'web-lib', 'contexts', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, '..', 'web-lib', 'icons', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, '..', 'web-lib', 'utils', '**', '*.{js,jsx,ts,tsx}')
	],
	plugins: []
};