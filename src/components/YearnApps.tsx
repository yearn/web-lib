import Image from 'next/image';

import {LogoYearn} from '../icons/LogoYearn';
import {VEYFI_DYFI_ADDRESS, YCRV_TOKEN_ADDRESS} from '../utils/constants';
import {ImageWithFallback} from './ImageWithFallback';

export const APPS = {
	V3: {
		name: 'V3 Vaults',
		href: 'https://yearn.fi/v3',
		pathCheck: 'yearn.fi/v3',
		icon: (
			<LogoYearn
				className={'size-8'}
				back={'text-pink-400'}
				front={'text-white'}
			/>
		)
	},
	Juiced: {
		name: 'Juiced Vaults',
		href: 'https://juiced.yearn.fi',
		pathCheck: 'juiced.yearn.fi',
		icon: (
			<Image
				className={'size-8'}
				src={'/juiced.png'}
				width={64}
				height={64}
				alt={'juiced'}
				loading={'eager'}
				priority
			/>
		)
	},
	Vaults: {
		name: 'Vaults',
		href: 'https://yearn.fi/vaults',
		pathCheck: 'yearn.fi/vaults',
		icon: (
			<LogoYearn
				className={'size-8'}
				back={'text-[#f472b6]'}
				front={'text-white'}
			/>
		)
	},
	yCRV: {
		name: 'yCRV',
		href: 'https://ycrv.yearn.fi',
		pathCheck: 'ycrv.yearn.fi',
		icon: (
			<ImageWithFallback
				alt={'yCRV'}
				className={'size-8'}
				width={64}
				height={64}
				src={`${process.env.SMOL_ASSETS_URL}/token/1/${YCRV_TOKEN_ADDRESS}/logo-128.png`}
				loading={'eager'}
				priority
			/>
		)
	},
	veYFI: {
		name: 'veYFI',
		href: 'https://veyfi.yearn.fi',
		pathCheck: 'veyfi.yearn.fi',
		icon: (
			<ImageWithFallback
				alt={'veYFI'}
				className={'size-8'}
				width={64}
				height={64}
				src={`${process.env.SMOL_ASSETS_URL}/token/1/${VEYFI_DYFI_ADDRESS}/logo-128.png`}
				loading={'eager'}
				priority
			/>
		)
	},
	yETH: {
		name: 'yETH',
		href: 'https://yeth.yearn.fi',
		pathCheck: 'yeth.yearn.fi',
		icon: (
			<ImageWithFallback
				alt={'yETH'}
				className={'size-8'}
				width={64}
				height={64}
				src={`${process.env.SMOL_ASSETS_URL}/token/1/0x1BED97CBC3c24A4fb5C069C6E311a967386131f7/logo-128.png`}
				loading={'eager'}
				priority
			/>
		)
	},
	yPrisma: {
		name: 'yPrisma',
		href: 'https://yprisma.yearn.fi',
		pathCheck: 'yprisma.yearn.fi',
		icon: (
			<ImageWithFallback
				priority
				src={`${process.env.SMOL_ASSETS_URL}/token/1/0xe3668873d944e4a949da05fc8bde419eff543882/logo-128.png`}
				className={'size-8'}
				width={64}
				height={64}
				alt={'yPrisma'}
			/>
		)
	},
	yBribe: {
		name: 'yBribe',
		href: 'https://ybribe.yearn.fi',
		pathCheck: 'ybribe.yearn.fi',
		icon: (
			<LogoYearn
				className={'size-8'}
				back={'text-neutral-900'}
				front={'text-neutral-0'}
			/>
		)
	},
	yFactory: {
		name: 'yFactory',
		href: 'https://factory.yearn.fi',
		pathCheck: 'factory.yearn.fi',
		icon: (
			<LogoYearn
				className={'size-8'}
				back={'text-neutral-900'}
				front={'text-neutral-0'}
			/>
		)
	}
};
