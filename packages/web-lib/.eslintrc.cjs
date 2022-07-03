module.exports = { // eslint-disable-line no-undef
	root: true,
	extends: ['../../packages/web-lib/config/eslintrc.cjs'],
	parserOptions: {
		tsconfigRootDir: __dirname, // eslint-disable-line no-undef
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module',
		project: ['./tsconfig.json', '*.cjs']
	}
};