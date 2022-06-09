import	React, {ReactElement}	from	'react';
import	{Card}					from	'@yearn/web-lib/components';
import	DocIndex				from	'pages/doc/components/index';

export default DocIndex;

function	ColorBox({color, name}: {color: string, name: string}): ReactElement {
	return (
		<div className={'flex flex-row space-x-2'}>
			<div className={`overflow-hidden relative aspect-square w-10 border border-neutral-200 ${color}`} />
			<b className={'my-2 text-xs'}>{name}</b>
		</div>
	);
}

function	ColorPaletteLight(): ReactElement {
	return (
		<div className={'mb-10 space-y-8 w-full'}>
			<div className={'grid grid-cols-3 w-full'}>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Background & Surface'}</h4>
					<ColorBox color={'bg-neutral-200'} name={'--color-background'} />
					<ColorBox color={'bg-neutral-300'} name={'--color-background-variant'} />
					<ColorBox color={'bg-neutral-0'} name={'--color-surface'} />
					<ColorBox color={'bg-neutral-100'} name={'--color-surface-variant'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Main colors'}</h4>
					<ColorBox color={'bg-primary-500'} name={'--color-primary'} />
					<ColorBox color={'bg-primary-600'} name={'--color-primary-variant'} />
					<ColorBox color={'bg-primary-100'} name={'--color-secondary'} />
					<ColorBox color={'bg-primary-200'} name={'--color-secondary-variant'} />
				</div>
			</div>

			<div className={'grid grid-cols-3 w-full'}>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Typo'}</h4>
					<ColorBox color={'bg-neutral-700'} name={'--color-typo-primary'} />
					<ColorBox color={'bg-primary-500'} name={'--color-typo-primary-variant'} />
					<ColorBox color={'bg-neutral-500'} name={'--color-typo-secondary'} />
					<ColorBox color={'bg-neutral-600'} name={'--color-typo-secondary-variant'} />
					<ColorBox color={'bg-neutral-400'} name={'--color-typo-off'} />

				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Icons'}</h4>
					<ColorBox color={'bg-neutral-400'} name={'--color-icons-primary'} />
					<ColorBox color={'bg-neutral-500'} name={'--color-icons-variant'} />
				</div>
			</div>

			<div className={'grid grid-cols-3 w-full'}>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Button filled'}</h4>
					<ColorBox color={'bg-primary-500'} name={'--color-button-filled-primary'} />
					<ColorBox color={'bg-primary-600'} name={'--color-button-filled-variant'} />
					<ColorBox color={'bg-neutral-0'} name={'--color-button-filled-text'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Button outlined'}</h4>
					<ColorBox color={'bg-neutral-0'} name={'--color-button-outlined-primary'} />
					<ColorBox color={'bg-primary-100'} name={'--color-button-outlined-variant'} />
					<ColorBox color={'bg-primary-500'} name={'--color-button-outlined-text'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Button Disabled'}</h4>
					<ColorBox color={'bg-neutral-200'} name={'--color-button-disabled-primary'} />
					<ColorBox color={'bg-neutral-200'} name={'--color-button-disabled-variant'} />
					<ColorBox color={'bg-neutral-400'} name={'--color-button-disabled-text'} />
				</div>
			</div>

			<div className={'grid grid-cols-3 w-full'}>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Warnings'}</h4>
					<ColorBox color={'bg-support-yellow-900'} name={'--color-support-yellow-900'} />
					<ColorBox color={'bg-support-yellow-300'} name={'--color-support-yellow-300'} />
					<ColorBox color={'bg-support-yellow-200'} name={'--color-support-yellow-200'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Errors'}</h4>
					<ColorBox color={'bg-support-pink-900'} name={'--color-support-pink-900'} />
					<ColorBox color={'bg-support-pink-300'} name={'--color-support-pink-300'} />
					<ColorBox color={'bg-support-pink-200'} name={'--color-support-pink-200'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Critical'}</h4>
					<ColorBox color={'bg-support-red-900'} name={'--color-support-red-900'} />
					<ColorBox color={'bg-support-red-300'} name={'--color-support-red-300'} />
					<ColorBox color={'bg-support-red-200'} name={'--color-support-red-200'} />
				</div>
			</div>

		</div>
	);
}

function	Index(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<ColorPaletteLight />
			</Card>
		</section>
	);
}

export {Index};
