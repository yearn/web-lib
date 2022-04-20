import	React, {ReactElement}			from	'react';
import	{Card, BannerEventAmsterdam}	from	'@yearn/web-lib/components';

function	ColorBox({color, name}: {color: string, name: string}): ReactElement {
	return (
		<div className={'flex flex-row space-x-2'}>
			<div className={`overflow-hidden relative aspect-square w-10 border border-background ${color}`} />
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
					<ColorBox color={'bg-background'} name={'--color-background'} />
					<ColorBox color={'bg-background-variant'} name={'--color-background-variant'} />
					<ColorBox color={'bg-surface'} name={'--color-surface'} />
					<ColorBox color={'bg-surface-variant'} name={'--color-surface-variant'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Main colors'}</h4>
					<ColorBox color={'bg-primary'} name={'--color-primary'} />
					<ColorBox color={'bg-primary-variant'} name={'--color-primary-variant'} />
					<ColorBox color={'bg-secondary'} name={'--color-secondary'} />
					<ColorBox color={'bg-secondary-variant'} name={'--color-secondary-variant'} />
				</div>
			</div>

			<div className={'grid grid-cols-3 w-full'}>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Typo'}</h4>
					<ColorBox color={'bg-typo-primary'} name={'--color-typo-primary'} />
					<ColorBox color={'bg-typo-primary-variant'} name={'--color-typo-primary-variant'} />
					<ColorBox color={'bg-typo-secondary'} name={'--color-typo-secondary'} />
					<ColorBox color={'bg-typo-secondary-variant'} name={'--color-typo-secondary-variant'} />
					<ColorBox color={'bg-typo-off'} name={'--color-typo-off'} />

				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Icons'}</h4>
					<ColorBox color={'bg-icons-primary'} name={'--color-icons-primary'} />
					<ColorBox color={'bg-icons-variant'} name={'--color-icons-variant'} />
				</div>
			</div>

			<div className={'grid grid-cols-3 w-full'}>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Button filled'}</h4>
					<ColorBox color={'bg-button-filled-primary'} name={'--color-button-filled-primary'} />
					<ColorBox color={'bg-button-filled-variant'} name={'--color-button-filled-variant'} />
					<ColorBox color={'bg-button-filled-text'} name={'--color-button-filled-text'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Button outlined'}</h4>
					<ColorBox color={'bg-button-outlined-primary'} name={'--color-button-outlined-primary'} />
					<ColorBox color={'bg-button-outlined-variant'} name={'--color-button-outlined-variant'} />
					<ColorBox color={'bg-button-outlined-text'} name={'--color-button-outlined-text'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Button Disabled'}</h4>
					<ColorBox color={'bg-button-disabled-primary'} name={'--color-button-disabled-primary'} />
					<ColorBox color={'bg-button-disabled-variant'} name={'--color-button-disabled-variant'} />
					<ColorBox color={'bg-button-disabled-text'} name={'--color-button-disabled-text'} />
				</div>
			</div>

			<div className={'grid grid-cols-3 w-full'}>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Warnings'}</h4>
					<ColorBox color={'bg-alert-warning-primary'} name={'--color-alert-warning-primary'} />
					<ColorBox color={'bg-alert-warning-secondary'} name={'--color-alert-warning-secondary'} />
					<ColorBox color={'bg-alert-warning-secondary-variant'} name={'--color-alert-warning-secondary-variant'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Errors'}</h4>
					<ColorBox color={'bg-alert-error-primary'} name={'--color-alert-error-primary'} />
					<ColorBox color={'bg-alert-error-secondary'} name={'--color-alert-error-secondary'} />
					<ColorBox color={'bg-alert-error-secondary-variant'} name={'--color-alert-error-secondary-variant'} />
				</div>
				<div className={'flex flex-col gap-2 w-full'}>
					<h4 className={'mb-2'}>{'Critical'}</h4>
					<ColorBox color={'bg-alert-critical-primary'} name={'--color-alert-critical-primary'} />
					<ColorBox color={'bg-alert-critical-secondary'} name={'--color-alert-critical-secondary'} />
					<ColorBox color={'bg-alert-critical-secondary-variant'} name={'--color-alert-critical-secondary-variant'} />
				</div>
			</div>

		</div>
	);
}

function	Index(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<div className={'mb-4'}>
				<BannerEventAmsterdam />
			</div>
			<Card>
				<ColorPaletteLight />
			</Card>
		</section>
	);
}

export default Index;
