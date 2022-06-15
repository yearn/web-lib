# Yearn Web Lib
![](../../.github/og.jpeg)


Yearn web Lib is a library of standard components used through Yearn's Projects.    
This library is made for React projects with the idea to be light, efficient and easy to use.  
We are using React + Tailwindcss + ethersjs for the web3 package, and some contexts are available to correctly wrap your app.

Please check @yearn/web-template for documentation and usage.

The stack used for this project is the following:
- 🚀 [Next](https://nextjs.org) — JavaScript library for user interfaces
- ▲ [Vercel](https://vercel.com) — Cloud deployment platform
- 🏎 [Turborepo](https://turborepo.org) — High-performance build system for Monorepos
- 🛠 [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild
- 📄 [TypeScript](https://www.typescriptlang.org/) for static type checking
- 💄 [ESLint](https://eslint.org/) for code linting
- ⚙️ [GitHub Actions](https://github.com/changesets/action) for fully automated package publishing

This repo is mirrored on [NPM](https://www.npmjs.com/package/@yearn-finance/web-lib).

### Install
```sh
yarn add @yearn-finance/web-lib #from npm
```

### Useful Commands
- `yarn build` - Build all packages including the Storybook site
- `yarn dev` - Run all packages locally and preview with Storybook
- `yarn lint` - Lint all packages
- `yarn changeset` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)


### Apps & Packages
This Turborepo includes the following packages and applications:

- `apps/docs`: Component documentation site, also playground
- `packages/web-lib`: Actual library for Yearn's projects

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Yarn Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-W` workspaces flag with `yarn add`.


### Releasing
When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the publish script will run. This will:
- Deploy the `app/dosc` app to [Vercel](https://vercel.com)
- Publish the `@yearn/web-lib` package to the Github Registry
- Publish the `@yearn-finance/web-lib` package to [npm](https://www.npmjs.com/)

In order to trigger a new version of the web-lib, the commit message **MUST** start with one of the following:
- `patch:` - This will trigger a new patch version of the web-lib
- `minor:` - This will trigger a new minor version of the web-lib
- `major:` - This will trigger a new major version of the web-lib

We recommand you to use [bump](https://github.com/JS-DevTools/version-bump-prompt) to generate a new version number for each release, with the following commands:
```bash
bump -a -p -c "patch: " #for a patch version, [-a] is for [git commit -a], [-p] is for [git push] and [-c] is for [git commit -m].
bump -a -p -c "minor: " #for a minor version, [-a] is for [git commit -a], [-p] is for [git push] and [-c] is for [git commit -m].
bump -a -p -c "major: " #for a major version, [-a] is for [git commit -a], [-p] is for [git push] and [-c] is for [git commit -m].
```

Release will only occurs on `main` branch, only via an authorized member of Yearn of via the Github Action.

### How to setup

#### Setup tsconfig
With TS config, you should add some paths to be sure to correctly link the web lib: 
```ts
	"baseUrl": ".",
	"paths": {
		"@yearn-finance/web-lib/components": ["./node_modules/@yearn-finance/web-lib/dist/components"],
		"@yearn-finance/web-lib/layouts": ["./node_modules/@yearn-finance/web-lib/dist/layouts"],
		"@yearn-finance/web-lib/contexts": ["./node_modules/@yearn-finance/web-lib/dist/contexts"],
		"@yearn-finance/web-lib/hooks": ["./node_modules/@yearn-finance/web-lib/dist/hooks"],
		"@yearn-finance/web-lib/icons": ["./node_modules/@yearn-finance/web-lib/dist/icons"],
		"@yearn-finance/web-lib/utils": ["./node_modules/@yearn-finance/web-lib/dist/utils"],
	},
```

#### Import the CSS
Create a default `style.css` file in your project root, and add that in it:
```scss
/* This will load Tailwindcss + all the overwrite from Yearn lib */
@import '@yearn-finance/web-lib/dist/style.css';
```

Then, setup your `tailwind.config.js` file to enable detection of your style and prod optimization:
```js
const {join} = require('path');
module.exports = {
	presets: [
		require('@yearn-finance/web-lib/tailwind.plugin')
	],
	content: [
		join(__dirname, 'pages', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'icons', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'logo', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'strategies', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'vaults', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'layouts', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'components', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'contexts', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'icons', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'utils', '**', '*.js')
	],
	.....
};
```


#### Setup the env
Ensure your env are set. Here is the list of the stuff to set:
```bash
WEBSITE_URI: 'https://my-web3-app.major.farm',
WEBSITE_NAME: 'My awesome yWeb3 app',
WEBSITE_TITLE: 'My awesome yWeb3 app',
WEBSITE_DESCRIPTION: 'Welcome to my awesome Yearn Web3 app. This is a super description that will be used for the SEO stuffs',
PROJECT_GITHUB_URL: 'https://github.com/me/yweb3-awesome',

USE_WALLET: true,
USE_PRICES: false,
USE_PRICE_TRI_CRYPTO: false,
USE_FEEDBACKS: true,

CG_IDS: ['yearn-finance'],
TOKENS: [['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18, 1]],
RPC_URL: {
	1: process.env.RPC_URL_MAINNET,
	250: process.env.RPC_URL_FANTOM || 'https://rpc.ftm.tools',
	42161: process.env.RPC_URL_ARBITRUM || 'https://arbitrum.public-rpc.com'
},

# Only if feedbacks is true
FEEBACKS_TYPE: 'github',
LINEAR_OAUTH_TOKEN: process.env.LINEAR_OAUTH_TOKEN,
LINEAR_TEAM_ID: process.env.LINEAR_TEAM_ID,
LINEAR_PROJECT_NAME: process.env.LINEAR_PROJECT_NAME,
GITHUB_AUTH_TOKEN: process.env.GITHUB_AUTH_TOKEN,
GITHUB_PROJECT_OWNER: process.env.GITHUB_PROJECT_OWNER,
GITHUB_PROJECT_REPO: process.env.GITHUB_PROJECT_REPO
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
