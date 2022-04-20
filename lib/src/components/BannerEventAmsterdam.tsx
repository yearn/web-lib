import	React, {ReactElement}	from	'react';
import	{Button}				from	'./Button';

function	BannerEventAmsterdam(): ReactElement {
	return (
		<div
			className={'transition-max-height duration-600'}>
			<div className={'grid overflow-hidden relative grid-cols-2 p-0 rounded-lg border-2 alertBanner--wrapper bg-secondary border-primary'}>
				<div className={'p-6 mr-2'}>
					<h4 className={'mb-6 text-typo-primary-variant'}>{'Take the blue pill, and follow the bunny.'}</h4>
					<p className={'text-typo-primary-variant'}>{'At Eth Amsterdam, the most mind expanding drug you can take is the blue pill.'}</p>
					<p className={'block mt-4 text-typo-primary-variant'}>{'Find the bunny:'}</p>
					<div className={'mt-5'}>
						<Button as={'a'} href={'https://twitter.com/iearnfinance'} className={'w-48'}>
							{'Follow @iearnfinance'}
						</Button>
					</div>
				</div>
				<div
					className={'overflow-hidden relative -my-1 ml-1 w-full h-full rounded-xl border-y-2 border-l-2 border-primary'}
					style={{height: 'calc(100% + 6px)'}}>
					<div
						className={'h-[248px] rounded-lg image-align-middle'}>
						<img src={'https://web.ycorpo.com/mommy-bunny.jpg'} height={248} width={512} loading={'eager'} />
					</div>
				</div>
			</div>
		</div>
	);
}

export {BannerEventAmsterdam};