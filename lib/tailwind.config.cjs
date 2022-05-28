/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
	presets: [
		require('./src/tailwind.plugin.cjs')
	],
	content: [
		'./src/layouts/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
		'./src/contexts/**/*.{js,jsx,ts,tsx}',
		'./src/icons/**/*.{js,jsx,ts,tsx}',
		'./src/utils/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			height: {
				'inherit': 'inherit'
			}
		}
	},
	plugins: []
};