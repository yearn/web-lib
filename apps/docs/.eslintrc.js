module.exports = { // eslint-disable-line no-undef
	root: true,
	extends: [
		'../../packages/web-lib/config/eslintrc.cjs',
		'plugin:@next/next/recommended'
	],
	parserOptions: {
		tsconfigRootDir: __dirname, // eslint-disable-line no-undef
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module',
		project: ['./tsconfig.json', '*.js']
	}
};