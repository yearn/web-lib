/* eslint-disable no-undef */
const withTM = require('next-transpile-modules')(['@yearn/web-lib']);
const dotenv = require('dotenv-webpack');

module.exports = withTM({
	experimental: {
		concurrentFeatures: true,
		esmExternals: 'loose'
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
		** USE_FEEDBACKS: should we enable the feedback button?
		**********************************************************************/
		USE_WALLET: true,
		USE_PRICES: true,
		USE_PRICE_TRI_CRYPTO: false,
		USE_FEEDBACKS: true,
		USE_NETWORKS: true,
		CG_IDS: ['yearn-finance'],
		TOKENS: [
			['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18, 1]
		],
		RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			250: process.env.RPC_URL_FANTOM || 'https://rpc.ftm.tools',
			42161: process.env.RPC_URL_ARBITRUM || 'https://arbitrum.public-rpc.com'
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY
	}
});
