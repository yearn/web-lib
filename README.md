# Yearn Web Lib
![](../../.github/og.jpeg)


Yearn web Lib is a library of standard components used through Yearn's Projects.    
This library is made for React projects with the idea to be light, efficient and easy to use.  
We are using React + Tailwindcss + ethersjs for the web3 package, and some contexts are available to correctly wrap your app.

Please check @yearn/web-template for documentation and usage.

The stack used for this project is the following:
- 🚀 [Next](https://nextjs.org) — JavaScript library for user interfaces
- ▲ [Vercel](https://vercel.com) — Cloud deployment platform
- 🏎 [Lerna](https://lerna.js.org/) — Workspace management
- 🛠 [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild
- 📄 [TypeScript](https://www.typescriptlang.org/) for static type checking
- 💄 [ESLint](https://eslint.org/) for code linting
- ⚙️ [GitHub Actions](https://github.com/changesets/action) for fully automated package publishing

This repo is mirrored on [NPM](https://www.npmjs.com/package/@yearn-finance/web-lib).

### Install
```sh
yarn add @yearn-finance/web-lib
```

### Useful Commands
- `yarn dev` - Run all packages locally

### Apps & Packages
The following packages and applications are available

- `package/docs`: Documentation site for the library
- `package/playground`: A playground for testing components
- `packages/web-lib`: Actual library for Yearn's projects

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).


### Releasing
When running `yarn build` in the `package/web-lib` folder, the library will be bumped to the next minor version, the code will be compiled and the various files will be copied in the `package/web-lib/dist` folder.  
From there the library can be published to NPM via the `yarn publish ./dist` command.

### How to setup

#### Import the CSS
Create a default `style.css` file in your project root, and add that in it:
```scss
/* This will load Tailwindcss + all the overwrite from Yearn lib */
@import '@yearn-finance/web-lib/style.next.css';
```

Then, setup your `tailwind.config.js` file to enable detection of your style and prod optimization:
```js
const {join} = require('path');
module.exports = {
	presets: [require('@yearn-finance/web-lib/config/tailwind.plugin.cjs')],
	content: [
		join(__dirname, 'pages', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'icons', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'utils', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'layouts', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'components', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'contexts', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'icons', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'utils', '**', '*.js')
	],
	.....
};
```

Finally, you can import the Eslint config in your `.eslintrc.js` file:
```js
module.exports = {
	'extends': ['./node_modules/@yearn-finance/web-lib/.eslintrc.cjs'],
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

```


#### Setup the env
Ensure your env are set. Here is the list of the stuff to set:
```bash
WEB_SOCKET_URL: {
	1: process.env.WS_URL_MAINNET,
	10: process.env.WS_URL_OPTIMISM,
	250: process.env.WS_URL_FANTOM,
	42161: process.env.WS_URL_ARBITRUM
},
JSON_RPC_URL: {
	1: process.env.RPC_URL_MAINNET,
	10: process.env.RPC_URL_OPTIMISM,
	250: process.env.RPC_URL_FANTOM,
	42161: process.env.RPC_URL_ARBITRUM
},
ALCHEMY_KEY: process.env.ALCHEMY_KEY,
INFURA_KEY: process.env.INFURA_KEY
```


## How to use
Usage is way simpler. You first need to wrap you app with the WithYearn context, and then you can use the components from the library.
```tsx
import	{WithYearn}		from	'@yearn-finance/web-lib/contexts';

function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps} = props;
	
	return (
		<WithYearn>
			<AppWrapper
				Component={Component}
				pageProps={pageProps} />
		</WithYearn>
	);
}
```
