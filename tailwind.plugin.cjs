const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme');

function withOpacityValue(variable) {
	return ({opacityValue}) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`;
		}
		return `rgb(var(${variable}) / ${opacityValue})`;
	};
}

module.exports = {
	corePlugins: {
		ringColor: false,
		ring: false
	},
	safelist: [
		{
			pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
			variants: ['md']
		},	{
			pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
			variants: ['md']
		},
		{pattern: /(text|bg|border)-(background|surface|primary|secondary)-(variant)/},
		{pattern: /(text|bg|border)-(alert)-(warning|error|critical)-(primary|secondary)/},
		{pattern: /(text|bg|border)-(alert)-(warning)-(secondary)-(variant)/},
		{pattern: /(text|bg|border)-(icons)-(primary|variant)/},
		{pattern: /(text|bg|border)-(typo)-(primary|secondary)/},
		{pattern: /(text|bg|border)-(typo)-(primary|secondary)-(variant)/},
		{pattern: /(text|bg|border)-(off|disabled|dark)/},
		{pattern: /(text|bg|border)-(button)-(filled|outlined|disabled)-(primary|variant|text)/}
	],
	theme: {
		extends: {
			gridTemplateColumns: {
				'22': 'repeat(22, minmax(0, 1fr))'
			},
			fontFamily: {
				roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
				mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono]
			},
			width: {
				30: '7.5rem',
				33: '8.25rem',
				38: '9.5rem',
				42: '10.5rem',
				50: '12.5rem',
				55: '13.75rem'
			},
			height: {
				22: '5.5rem',
				30: '7.5rem'
			},
			maxWidth: {
				'xl': '552px',
				'4xl': '904px',
				'6xl': '1200px'
			},
			fontSize: {
				'xs': ['12px', '16px'],
				'sm': ['14px', '20px'],
				'base': ['16px', '24px'],
				'lg': ['20px', '32px'],
				'xl': ['24px', '32px'],
				'4xl': ['40px', '56px']
			},
			colors: {
				'white': '#FFFFFF',
				'transparent': 'transparent',
				'inherit': 'inherit',

				'background': withOpacityValue('--color-background'),
				'background-variant': withOpacityValue('--color-background-variant'),
				'surface': withOpacityValue('--color-surface'),
				'surface-variant': withOpacityValue('--color-surface-variant'),
				'primary': withOpacityValue('--color-primary'),
				'primary-variant': withOpacityValue('--color-primary-variant'),
				'secondary': withOpacityValue('--color-secondary'),
				'secondary-variant': withOpacityValue('--color-secondary-variant'),
				'disabled': withOpacityValue('--color-disabled'),
				'dark': withOpacityValue('--color-dark'),
			
				'alert-warning-primary': withOpacityValue('--color-alert-warning-primary'),
				'alert-warning-secondary': withOpacityValue('--color-alert-warning-secondary'),
				'alert-warning-secondary-variant': withOpacityValue('--color-alert-warning-secondary-variant'),
				'alert-error-primary': withOpacityValue('--color-alert-error-primary'),
				'alert-error-secondary': withOpacityValue('--color-alert-error-secondary'),
				'alert-critical-primary': withOpacityValue('--color-alert-critical-primary'),
				'alert-critical-secondary': withOpacityValue('--color-alert-critical-secondary'),
			
				'icons-primary': withOpacityValue('--color-icons-primary'),
				'icons-variant': withOpacityValue('--color-icons-variant'),
			
				'logo-background': withOpacityValue('--color-logo-background'),
				'logo-fill': withOpacityValue('--color-logo-fill'),
			
				'typo-primary': withOpacityValue('--color-typo-primary'),
				'typo-primary-variant': withOpacityValue('--color-typo-primary-variant'),
				'typo-secondary': withOpacityValue('--color-typo-secondary'),
				'typo-secondary-variant': withOpacityValue('--color-typo-secondary-variant'),
				'typo-off': withOpacityValue('--color-typo-off'),
			
				'button-filled-primary': withOpacityValue('--color-button-filled-primary'),
				'button-filled-variant': withOpacityValue('--color-button-filled-variant'),
				'button-filled-text': withOpacityValue('--color-button-filled-text'),
				'button-outlined-primary': withOpacityValue('--color-button-outlined-primary'),
				'button-outlined-variant': withOpacityValue('--color-button-outlined-variant'),
				'button-outlined-text': withOpacityValue('--color-button-outlined-text'),
				'button-disabled-primary': withOpacityValue('--color-button-disabled-primary'),
				'button-disabled-text': withOpacityValue('--color-button-disabled-text')
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		plugin(function ({ addBase, theme }) {
			addBase({
				'h1': {
					fontSize: theme('fontSize.xl'),
					fontWeight: theme('fontWeight.bold'),
					color: theme('colors.primary'),
			  	},
			  	'h4': {
					fontSize: theme('fontSize.lg'),
					fontWeight: theme('fontWeight.bold'),
					color: theme('colors.typo.primary'),
				},
			})
			// addComponents({
			//   '.card': {
			// 	backgroundColor: theme('colors.white'),
			// 	borderRadius: theme('borderRadius.lg'),
			// 	padding: theme('spacing.6'),
			// 	boxShadow: theme('boxShadow.xl'),
			//   }
			// })
			// addUtilities({
			//   '.content-auto': {
			// 	contentVisibility: 'auto',
			//   }
			// })
		})
	]
}