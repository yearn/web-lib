import	React, {ReactElement}	from	'react';
import	IconChevron				from	'../icons/IconChevron';
import	IconCross				from	'../icons/IconCross';


export type	TBannerPagination = {
	children: ReactElement[],
	canClose?: boolean,
	onClose?: () => void
}

function	BannerPagination({children, onClose, canClose = true}: TBannerPagination): ReactElement {
	const	[currentSlide, set_currentSlide] = React.useState(0);
	const	[isVisible, set_isVisible] = React.useState(true);

	function	onTryToClose(): void {
		if (onClose) {
			onClose();
		} else {
			set_isVisible(false);
		}
	}

	function	renderPreviousChevron(): ReactElement {
		if (currentSlide === 0)
			return (<IconChevron className={'w-4 h-4 opacity-50 cursor-not-allowed'} />);
		return (
			<IconChevron
				className={'w-4 h-4 cursor-pointer'}
				onClick={(): void => set_currentSlide(currentSlide - 1)} />
		);
	}

	function	renderNextChevron(): ReactElement {
		if (currentSlide === (children as ReactElement[]).length - 1)
			return (<IconChevron className={'w-4 h-4 opacity-50 rotate-180 cursor-not-allowed'} />);
		return (
			<IconChevron
				className={'w-4 h-4 rotate-180 cursor-pointer'}
				onClick={(): void => set_currentSlide(currentSlide + 1)} />
		);
	}

	return (
		<div className='relative'>
			{canClose ? <button onClick={onTryToClose} className={'absolute top-4 right-4 z-50'}>
				<IconCross className={'w-6 h-6 cursor-pointer'} />
			</button> : null}

			{children[currentSlide]}
			
			{children.length > 1 ? <div className={'flex absolute right-4 bottom-4 flex-row items-center space-x-2 z-50'}>
				{renderPreviousChevron()}
				<p className={'text-sm tabular-nums'}>{`${currentSlide + 1}/${(children as ReactElement[]).length}`}</p>
				{renderNextChevron()}
			</div> : null}
		</div>
	);
}

export {BannerPagination};