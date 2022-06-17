/* eslint-disable no-undef */
const withTM = require('next-transpile-modules')(['@yearn-finance/web-lib']);
const dotenv = require('dotenv-webpack');

module.exports = withTM({
	experimental: {
		concurrentFeatures: true
	},
	plugins: [new dotenv()],
	images: {
		domains: [
			'rawcdn.githack.com'
		]
	},
	env: {
		/* 🔵 - Yearn Finance **************************************************
		** Stuff used for the SEO or some related elements, like the title, the
		** github url etc.
		** - WEBSITE_URI is used to display the og image and get the base URI
		** - WEBSITE_NAME is used as name displayed on the top of the tab in
		**   the browser.
		** - WEBSITE_TITLE should be the name of your website. It may be used
		**   by third parties to display your app name (coinbase for instance)
		** - WEBSITE_DESCRIPTION is used in the meta tags
		** - PROJECT_GITHUB_URL should be the link to your project on GitHub
		**********************************************************************/
		WEBSITE_URI: 'https://yearn.systems/',
		WEBSITE_NAME: 'yWeb',
		WEBSITE_TITLE: 'yWeb',
		WEBSITE_DESCRIPTION: 'Documentation for the Yearn Web Lib',
		PROJECT_GITHUB_URL: 'https://github.com/yearn/web-lib',

		/* 🔵 - Yearn Finance **************************************************
		** Some config used to control the behaviour of the web library. By
		** default, all of theses are set to false.
		** USE_WALLET: should we allow the user to connect a wallet via
		**             metamask or wallet connect?
		** USE_PRICES: should we fetch the prices for a list of tokens? If true
		**             the CG_IDS array should be populated with the tokens
		**             to fetch.
		** USE_PRICE_TRI_CRYPTO: should we fetch the special Tri Crypto token
		** 			   price? (require blockchain call)
		** USE_NETWORKS: indicate if the app should be able to change networks
		**********************************************************************/
		USE_WALLET: true,
		USE_PRICES: true,
		USE_PRICE_TRI_CRYPTO: false,
		USE_NETWORKS: true,
		CG_IDS: ['yearn-finance'],
		TOKENS: [
			['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18, 1]
		],

		/* 🔵 - Yearn Finance **************************************************
		** Config over the RPC
		**********************************************************************/
		WEB_SOCKET_URL: {
			1: process.env.WS_URL_MAINNET,
			250: process.env.WS_URL_FANTOM,
			42161: process.env.WS_URL_ARBITRUM
		},
		JSON_RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			250: process.env.RPC_URL_FANTOM,
			42161: process.env.RPC_URL_ARBITRUM
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		INFURA_KEY: process.env.INFURA_KEY
	}
});
