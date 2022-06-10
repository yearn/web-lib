const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
const {colors, paddings} = require('./tailwind.theme.cjs');

function withOpacityValue(variable) {
	return ({opacityValue}) => {
		if (opacityValue === undefined) {
			return `hsl(var(${variable}))`;
		}
		return `hsl(var(${variable}) / ${opacityValue})`;
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
			'black': 'hsl(0, 0%, 0%)',
			'white': 'rgb(255, 255, 255)',
			'transparent': 'transparent',
			'inherit': 'inherit',

			'neutral-0': withOpacityValue('--color-neutral-0'),
			'neutral-100': withOpacityValue('--color-neutral-100'),
			'neutral-200': withOpacityValue('--color-neutral-200'),
			'neutral-300': withOpacityValue('--color-neutral-300'),
			'neutral-400': withOpacityValue('--color-neutral-400'),
			'neutral-500': withOpacityValue('--color-neutral-500'),
			'neutral-600': withOpacityValue('--color-neutral-600'),
			'neutral-700': withOpacityValue('--color-neutral-700'),
			'neutral-800': withOpacityValue('--color-neutral-800'),
			'neutral-900': withOpacityValue('--color-neutral-900'),
			'primary-100': withOpacityValue('--color-primary-100'),
			'primary-200': withOpacityValue('--color-primary-200'),
			'primary-500': withOpacityValue('--color-primary-500'),
			'primary-600': withOpacityValue('--color-primary-600'),
			'accent-500': withOpacityValue('--color-accent-500'),
			'accent-600': withOpacityValue('--color-accent-600'),

			'yellow-900': withOpacityValue('--color-yellow-900'),
			'yellow-300': withOpacityValue('--color-yellow-300'),
			'yellow-200': withOpacityValue('--color-yellow-200'),
			'pink-900': withOpacityValue('--color-pink-900'),
			'pink-300': withOpacityValue('--color-pink-300'),
			'pink-200': withOpacityValue('--color-pink-200'),
			'red-900': withOpacityValue('--color-red-900'),
			'red-300': withOpacityValue('--color-red-300'),
			'red-200': withOpacityValue('--color-red-200'),
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
				'intermediate': ['18px', '24px'],
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
		plugin(function ({addBase, addUtilities, theme}) {
			addBase({
				':root': {
					...colors,
					...paddings
				}
			});
			addUtilities({
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