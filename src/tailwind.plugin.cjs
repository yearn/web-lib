/* eslint-disable @typescript-eslint/explicit-function-return-type */

const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
const {colors, paddings} = require('./tailwind.theme.cjs');

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
	theme: {
		fontFamily: {
			roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
			mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono]
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
			'alert-error-secondary-variant': withOpacityValue('--color-alert-error-secondary-variant'),
			'alert-critical-primary': withOpacityValue('--color-alert-critical-primary'),
			'alert-critical-secondary': withOpacityValue('--color-alert-critical-secondary'),
			'alert-critical-secondary-variant': withOpacityValue('--color-alert-critical-secondary-variant'),

			'icons-primary': withOpacityValue('--color-icons-primary'),
			'icons-variant': withOpacityValue('--color-icons-variant'),
		
			'typo-primary': withOpacityValue('--color-typo-primary'),
			'typo-primary-variant': withOpacityValue('--color-typo-primary-variant'),
			'typo-secondary': withOpacityValue('--color-typo-secondary'),
			'typo-secondary-variant': withOpacityValue('--color-typo-secondary-variant'),
			'typo-off': withOpacityValue('--color-typo-off'),
		
			// Button filled
			'button-filled-primary': withOpacityValue('--color-button-filled-primary'),
			'button-filled-variant': withOpacityValue('--color-button-filled-variant'),
			'button-filled-text': withOpacityValue('--color-button-filled-text'),

			// Button outlined
			'button-outlined-primary': withOpacityValue('--color-button-outlined-primary'),
			'button-outlined-variant': withOpacityValue('--color-button-outlined-variant'),
			'button-outlined-text': withOpacityValue('--color-button-outlined-text'),

			// Button disabled
			'button-disabled-primary': withOpacityValue('--color-button-disabled-primary'),
			'button-disabled-variant': withOpacityValue('--color-button-disabled-primary'),
			'button-disabled-text': withOpacityValue('--color-button-disabled-text')
		},
		extend: {
			gridTemplateColumns: {
				'22': 'repeat(22, minmax(0, 1fr))'
			},
			spacing: {
				'none': 'var(--padding-none)',
				'tightest': 'var(--padding-tightest)',
				'tighter': 'var(--padding-tighter)',
				'tight': 'var(--padding-tight)',
				'normal': 'var(--padding-normal)',
				'wide': 'var(--padding-wide)',
				'wider': 'var(--padding-wider)',
				'widest': 'var(--padding-widest)'
			},
			width: {
				'inherit': 'inherit'
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
			transitionProperty: {
				'max-height': 'max-height'
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		plugin(function ({addBase, addComponents, addUtilities, theme}) {
			addBase({
				':root': {
					...colors,
					...paddings
				},
				'html': {
					marginLeft: 'calc(100vw - 100%)'
				},
				'body': {
					color: theme('colors.typo-primary')
				},
				'h1': {
					fontSize: theme('fontSize.xl'),
					fontWeight: theme('fontWeight.bold'),
					color: theme('colors.primary')
				},
				'h4': {
					fontSize: theme('fontSize.lg'),
					fontWeight: theme('fontWeight.bold'),
					color: theme('colors.typo-primary')
				},
				'button': {
					cursor: theme('cursor.pointer'),
					paddingLeft: theme('spacing.3'),
					paddingRight: theme('spacing.3'),
					height: theme('height.8'),
					borderRadius: theme('borderRadius.lg'),
					fontSize: theme('fontSize.base'),
					lineHeight: theme('lineHeight.base'),
					transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
					transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
					transitionDuration: '150ms',
					'&:disabled': {
						cursor: theme('cursor.not-allowed')
					}
				},
				'input': {
					'&::placeholder': {
						color: theme('colors.typo-off')
					}
				},
				'textarea': {
					'&::placeholder': {
						color: theme('colors.typo-off')
					}
				}
			});
			addComponents({
				'#__next': {
					width: theme('width.full'),
					height: theme('width.full')
				},
				'.inline-dl': {
					display: 'flex',
					flexDirection: 'column',
					padding: theme('spacing.6'),
					boxShadow: theme('boxShadow.xl')
				},
				'.link': {
					color: theme('colors.primary'),
					textDecoration: 'underline',
					cursor: theme('cursor.pointer'),
					transitionProperty: 'color',
					transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
					transitionDuration: '150ms',
					'&:hover': {
						color: theme('colors.primary-variant')
					}
				},
				'.button': {
					cursor: theme('cursor.pointer'),
					paddingLeft: theme('spacing.3'),
					paddingRight: theme('spacing.3'),
					height: theme('height.8'),
					borderRadius: theme('borderRadius.lg'),
					fontSize: theme('fontSize.base'),
					lineHeight: theme('lineHeight.base'),
					transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
					transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
					transitionDuration: '150ms',
					'&:disabled': {
						cursor: theme('cursor.not-allowed')
					}
				},
				'.button-filled': {
					color: theme('colors.button-filled-text'),
					backgroundColor: theme('colors.button-filled-primary'),
					fontWeight: theme('fontWeight.bold'),
					'&:hover': {
						backgroundColor: theme('colors.button-filled-variant')
					},
					'&:disabled': {
						backgroundColor: theme('colors.button-disabled-primary'),
						color: theme('colors.button-disabled-text'),
						'&:hover': {
							backgroundColor: theme('colors.button-disabled-primary')
						}
					}
				},
				'.button-light': {
					color: theme('colors.primary'),
					backgroundColor: theme('colors.button-outlined-variant'),
					'&:hover': {
						backgroundColor: theme('colors.secondary-variant')
					},
					'&:disabled': {
						backgroundColor: theme('colors.button-disabled-primary'),
						color: theme('colors.button-disabled-text'),
						'&:hover': {
							backgroundColor: theme('colors.button-disabled-primary')
						}
					}
				},
				'.button-outline': {
					color: theme('colors.primary'),
					borderWidth: 1,
					borderColor: theme('colors.primary'),
					backgroundColor: 'transparent',
					'&:hover': {
						backgroundColor: theme('colors.button-outlined-variant')
					},
					'&:disabled': {
						color: theme('colors.button-disabled-text'),
						borderColor: theme('colors.button-disabled-text'),
						'&:hover': {
							backgroundColor: 'transparent'
						}
					}
				}
			});
			addUtilities({
				'.flex-center': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				},
				'.cell-end': {
					justifyContent: 'flex-end',
					textAlign: 'right',
					color: theme('colors.typo-primary')
				},
				'.cell-start': {
					justifyContent: 'flex-start',
					textAlign: 'left',
					color: theme('colors.typo-primary')
				},
				'.scrollbar-none': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				}
			});
		})
	]
};