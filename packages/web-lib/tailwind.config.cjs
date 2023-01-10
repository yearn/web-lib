const {join} = require('path');

module.exports = {
	presets: [
		require('./tailwind.plugin.cjs')
	],
	content: [
		'./pages/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./contexts/**/*.{js,jsx,ts,tsx}',
		join(__dirname, 'components', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'contexts', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'icons', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'utils', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'layouts', '*.{js,jsx,ts,tsx}')
	],
	plugins: []
};
