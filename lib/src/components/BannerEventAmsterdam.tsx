import	React, {ReactElement}	from	'react';
import	{Button}				from	'./Button';
import	IconCross				from	'../icons/IconCross';

function	BannerEventAmsterdam(): ReactElement {
	const	[isClosed, set_isClosed] = React.useState(false);
	
	if (isClosed) {
		return <div />;
	}

	return (
		<div
			className={'transition-max-height duration-600'}>
			<div className={'flex flex-col-reverse md:flex-row overflow-hidden relative p-0 rounded-lg border-2 alertBanner--wrapper bg-secondary border-primary'}>
				<button
					onClick={() => set_isClosed(true)}
					className={'absolute top-4 right-4 z-50'}>
					<IconCross className={'w-6 h-6 cursor-pointer'} />
				</button>
				<div className={'p-4 md:p-6 mr-2 w-full'}>
					<h4 className={'mb-6 text-typo-primary-variant'}>{'Take the blue pill, and follow the bunny.'}</h4>
					<p className={'text-typo-primary-variant'}>{'At Eth Amsterdam, the most mind expanding drug you can take is the blue pill.'}</p>
					<p className={'block mt-4 text-typo-primary-variant'}>{'Find the bunny:'}</p>
					<div className={'mt-5'}>
						<Button as={'a'} href={'https://twitter.com/iearnfinance'} className={'w-full md:w-48'}>
							{'Follow @iearnfinance'}
						</Button>
					</div>
				</div>
				<div className={'w-full'}>
					<div
						className={'flex md:hidden overflow-hidden relative -mx-1 -mt-1 w-full h-full rounded-xl border-x-2 border-b-2 border-primary'}
						style={{width: 'calc(100% + 6px)'}}>
						<div className={'rounded-lg image-align-middle'}>
							<img src={'https://web.ycorpo.com/mommy-bunny.jpg'} height={248} width={512} loading={'eager'} />
						</div>
					</div>
					<div
						className={'hidden md:flex overflow-hidden relative -my-1 ml-1 w-full h-full rounded-xl border-y-2 border-l-2 border-primary'}
						style={{height: 'calc(100% + 6px)'}}>
						<div
							className={'h-[248px] rounded-lg image-align-middle'}>
							<img src={'https://web.ycorpo.com/mommy-bunny.jpg'} height={248} width={512} loading={'eager'} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export {BannerEventAmsterdam};