/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
	presets: [
		require('./dist/tailwind.plugin.cjs')
	],
	content: [
		'./dist/layouts/**/*.{js,jsx,ts,tsx}',
		'./dist/components/**/*.{js,jsx,ts,tsx}',
		'./dist/contexts/**/*.{js,jsx,ts,tsx}',
		'./dist/icons/**/*.{js,jsx,ts,tsx}',
		'./dist/utils/**/*.{js,jsx,ts,tsx}',
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