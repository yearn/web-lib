module.exports = {
	root: true,
	extends: ["../../packages/config/index.js"],
	parserOptions: {
		tsconfigRootDir: __dirname, // eslint-disable-line no-undef
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module',
		project: ['./tsconfig.json']
	}
};