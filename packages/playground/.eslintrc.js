module.exports = {
	'extends': ['../web-lib/.eslintrc.cjs'],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'tsconfigRootDir': __dirname,
		'ecmaVersion': 2022,
		'sourceType': 'module',
		'project': ['./tsconfig.json']
	}
};
