module.exports = {
	root: true,
	extends: ["./packages/web-lib/config/index.js"],
	settings: {
		next: {
			rootDir: ["apps/*/"],
		},
	},
};
