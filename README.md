# Yearn Web Lib
Yearn web Lib is a library of standard components used through Yearn's Projects.    
This library is made for React projects with the idea to be light, efficient and easy to use.  
We are using React + Tailwindcss + ethersjs for the web3 package, and some contexts are available to correctly wrap your app.

## How to install
Run the following command:
```
yarn add @majorfi/web-lib
```

Your project will also need `React`, `React-Dom` and `TailwindCss`
```
yarn add react
yarn add react-dom
yarn add tailwindcss
```

You will need to generate a [Github Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), to create or update the `~/.npmrc` file with the following content:
```
registry=https://registry.npmjs.org/
@yearn:registry=https://npm.pkg.github.com
@majorfi:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_ACCESS_TOKEN
```
This will link all repo named `@yearn` you will install to the correct Yearn organization

## How to setup

#### Setup tsconfig
With TS config, you should add some paths to be sure to correctly link the web lib: 
```ts
	"baseUrl": ".",
	"paths": {
		"@majorfi/web-lib/components": ["./node_modules/@majorfi/web-lib/dist/components/index.js"],
		"@majorfi/web-lib/contexts": ["./node_modules/@majorfi/web-lib/dist/contexts/index.js"],
		"@majorfi/web-lib/hooks": ["./node_modules/@majorfi/web-lib/dist/hooks/index.js"],
		"@majorfi/web-lib/icons": ["./node_modules/@majorfi/web-lib/dist/icons/index.js"],
		"@majorfi/web-lib/utils": ["./node_modules/@majorfi/web-lib/dist/utils/index.js"],
	},
```

#### Import the CSS
Create a default `style.css` file in your project root, and add that in it:
```scss
/* This will load Tailwindcss + all the overwrite from Yearn lib */
@import '@majorfi/web-lib/dist/style.css';
```

Then, setup your `tailwind.config.js` file to enable detection of your style and prod optimization:
```js
const {join} = require('path');
module.exports = {
	presets: [
		require('@majorfi/web-lib/tailwind.plugin')
	],
	content: [
		join(__dirname, 'pages', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'icons', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'logo', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'strategies', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'vaults', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'node_modules', '@majorfi', 'web-lib', 'dist', 'layouts', '**', '*.js'),
		join(__dirname, 'node_modules', '@majorfi', 'web-lib', 'dist', 'components', '**', '*.js'),
		join(__dirname, 'node_modules', '@majorfi', 'web-lib', 'dist', 'contexts', '**', '*.js'),
		join(__dirname, 'node_modules', '@majorfi', 'web-lib', 'dist', 'icons', '**', '*.js'),
		join(__dirname, 'node_modules', '@majorfi', 'web-lib', 'dist', 'utils', '**', '*.js')
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
USE_PRICES: false,
USE_PRICE_TRI_CRYPTO: false,
CG_IDS: [
	'yearn-finance'
],
TOKENS: [
	['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18, 1]
],
RPC_URL: {
	1: process.env.RPC_URL_MAINNET,
	250: process.env.RPC_URL_FANTOM || 'https://rpc.ftm.tools',
	42161: process.env.RPC_URL_ARBITRUM || 'https://arbitrum.public-rpc.com'
}
```


## How to use
Usage is way simpler. You first need to wrap you app with the WithYearn context, and then you can use the components from the library.
```tsx
import	{WithYearn}		from	'@majorfi/web-lib';

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

## Subpackage
This repository is organised in subpackages: 

#### Components
> Having everything in one file is not great for both code splitting and organisation. The components folder is used to split the code and build some shared components that we will use in our app.
> Sections, aka a large part of the UI, can be put in here but should be prefixed with `Section` to be easy to recognise.
> Group of components for the same usage could be wrapped in a subfolder.
```tsx
import {Card, SearchBox, Switch, ...} from '@majorfi/web-lib/components';
```

#### Layouts
> The layouts folder is used to build the layout of the app. Layout have kind of the same objectif as components but are focused on the display of big section and parts of the UI.
```tsx
import {List, Header, Navbar, ...} from '@majorfi/web-lib/layouts';
```

#### Icons
> The icons folder is used to build the icons of the app. Icons are SVG files transformed in JSX/TSX components. They accept any props by default and the default fill color is set to `currentColor` to enable fill personalization
```tsx
import {Cross, AlertWarning, ...} from '@majorfi/web-lib/icons';
```

#### Contexts
> The contexts are what some users could know as `store`. With react you have some state managements that will trigger the re-render and store data in your app. Theses states can be send to children and used by children if required. This is nice but when you have a grand-x10-child, passing the state as prop is not the best idea.
> Contexts are a way to store share state across your app. A contexts is defined for one specific reason and it's best to keep the contexts for one use case: it's best to have one for the web3 management and one for the theme than on big mix.
> This is where the most of the logic will be done. We need to fetch some balances we will use in multiple places? Context! We need to get the account and web3 provider? Context!
```tsx
import {useUI, useWeb3, ...} from '@majorfi/web-lib/contexts';
```

#### Hooks
> Hooks are a bunch of state-management style helper designed to work with react and to perform some specific stuff out of the box. This can be something like `useLocalStorage`, `useIndexDB`, `useWindowInFocus`, etc.
> They should be independant from the app logic and should handle one specific case, not related to what the app is doing
```tsx
import {useClientEffect, useLocalStorage, ...} from '@majorfi/web-lib/hooks';
```

#### Utils
> The utils are just some basics helpers or logic we will used across our app. This can be some ABIs, this can be a function to sum an array of object, some reducer, etc.
```tsx
import {toAddress, format, parseMarkdown, ...} from '@majorfi/web-lib/utils';
```

## Pull request and review Conventions
- Each pull request mush have an explaination on why this PR is relevant.
- Commit should be signed.
- After a review, **one commits should fix one issue** at a time.
- All comments should be **resolved by the person who originally created the comment**.
- All comments should be **resolved before merging**.
- Any comments with feedback should be responded to by the author with a comment including the commit hash where the feedback has been resolved, or a reason with why it will not be addressed.
- PRs require one approving review by a contributor with write access before it can be merged.

