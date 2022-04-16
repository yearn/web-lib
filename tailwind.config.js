/* eslint-disable @typescript-eslint/explicit-function-return-type */
const {join} = require('path');

module.exports = {
	presets: [
		require('./lib/src/tailwind.plugin.cjs')
	],
	content: [
		join(__dirname, 'pages', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'icons', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, '.', 'lib', 'src', 'layouts', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, '.', 'lib', 'src', 'components', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, '.', 'lib', 'src', 'contexts', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, '.', 'lib', 'src', 'icons', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, '.', 'lib', 'src', 'utils', '**', '*.{js,jsx,ts,tsx}')
	],
	themes: {
		extend: {
			height: {
				'inherit': 'inherit'
			}
		}
	},
	plugins: []
};