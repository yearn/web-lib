const	lightTheme = {
	'--color-background': '244 247 251',
	'--color-background-variant': '224 234 255',
	'--color-surface': '255 255 255',
	'--color-surface-variant': '249 251 253',
	'--color-primary': '6 87 249',
	'--color-primary-variant': '0 74 223',
	'--color-secondary': '224 234 255',
	'--color-secondary-variant': '198 215 249',
	'--color-disabled': '206 213 227',
	'--color-dark': '20 20 20',
	
	'--color-alert-warning-primary': '255 138 0',
	'--color-alert-warning-secondary': '255 244 231',
	'--color-alert-warning-secondary-variant': '255 229 199',
	'--color-alert-error-primary': '231 0 125',
	'--color-alert-error-secondary': '255 232 244',
	'--color-alert-error-secondary-variant': '255 207 233',
	'--color-alert-critical-primary': '255 0 0',
	'--color-alert-critical-secondary': '255 228 228',
	'--color-alert-critical-secondary-variant': '255 206 206',

	'--color-icons-primary': '206 213 227',
	'--color-icons-variant': '71 85 112',
	'--color-typo-primary': '0 23 70',
	'--color-typo-primary-variant': '6 87 249',
	'--color-typo-secondary': '71 85 112',
	'--color-typo-secondary-variant': '50 59 78',
	'--color-typo-off': '206 213 227',
	'--color-button-filled-primary': '6 87 249',
	'--color-button-filled-variant': '0 74 223',
	'--color-button-filled-text': '255 255 255',
	'--color-button-outlined-primary': '255 255 255',
	'--color-button-outlined-variant': '224 234 255',
	'--color-button-outlined-text': '6 87 249',
	'--color-button-disabled-primary': '244 247 251',
	'--color-button-disabled-text': '206 213 227',
}
const	darkTheme = {
	'--color-background': '20 20 20',
	'--color-background-variant': '39 39 39',
	'--color-surface': '0 0 0',
	'--color-surface-variant': '25 25 25',
	'--color-primary': '255 255 255',
	'--color-primary-variant': '255 255 255',
	'--color-secondary': '39 39 39',
	'--color-secondary-variant': '32 32 32',
	'--color-disabled': '168 168 168',
	'--color-dark': '20 20 20',
	'--color-alert-warning-primary': '255 138 0',
	'--color-alert-warning-secondary': '255 244 231',
	'--color-alert-warning-secondary-variant': '255 229 199',
	'--color-alert-error-primary': '231 0 125',
	'--color-alert-error-secondary': '255 232 244',
	'--color-alert-error-secondary-variant': '255 207 233',
	'--color-alert-critical-primary': '255 0 0',
	'--color-alert-critical-secondary': '255 228 228',
	'--color-alert-critical-secondary-variant': '255 206 206',
	'--color-icons-primary': '168 168 168',
	'--color-icons-variant': '255 255 255',
	'--color-typo-primary': '255 255 255',
	'--color-typo-primary-variant': '255 255 255',
	'--color-typo-secondary': '168 168 168',
	'--color-typo-secondary-variant': '168 168 168',
	'--color-typo-off': '168 168 168',
	'--color-button-filled-primary': '6 87 249',
	'--color-button-filled-variant': '0 74 223',
	'--color-button-filled-text': '255 255 255',
	'--color-button-outlined-primary': '255 255 255',
	'--color-button-outlined-variant': '39 39 39',
	'--color-button-outlined-text': '255 255 255',
	'--color-button-disabled-primary': '20 20 20',
	'--color-button-disabled-text': '168 168 168'
}
const colors = {
	// ...lightTheme,
	'@media (prefers-color-scheme: light)': {
		...lightTheme,
	},
	'@media (prefers-color-scheme: dark)': {
		...darkTheme,
	},
	'& [data-theme="light"]': {
		...lightTheme,
	},
	'& [data-theme="dark"]': {
		...darkTheme
	}
};

//Not implemented yet
const paddings = {
	'--padding-none': '0rem', //0px | p-0
	'--padding-tightest': '0.125rem', //2px | p-0.5
	'--padding-tighter': '0.25rem', //4px | p-1
	'--padding-tight': '0.5rem', //8px | p-2
	'--padding-normal': '1rem', //16px | p-4
	'--padding-wide': '1.5rem', //24px | p-6
	'--padding-wider': '2rem', //32px | p-8
	'--padding-widest': '3rem' //48px | p-12
};


module.exports = {colors, paddings};
