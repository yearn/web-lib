import	React, {ReactElement, ReactNode}	from	'react';
import	IconChevron							from	'../icons/IconChevron';
import	IconCross							from	'../icons/IconCross';
import type * as BannerTypes				from	'./Banner.d';

function	SplitVariant({image}: {image: string}) {
	return (
		<div className={'w-full md:w-1/2 relative'}>
			<div
				data-mobile
				className={'yearn--banner-split-wrapper'}
				style={{width: 'calc(100% + 8px)'}}>
				<div>
					<img
						src={image}
						className={'w-full h-full object-cover'}
						loading={'eager'} />
				</div>
			</div>
			<div
				data-desktop
				className={'yearn--banner-split-wrapper'}
				style={{height: 'calc(100% + 8px)', width: 'calc(100% + 8px)'}}>
				<div style={{minWidth: 'calc(100% + 8px)'}}>
					<img
						src={image}
						className={'w-full h-full object-cover'}
						loading={'eager'} />
				</div>
			</div>
		</div>
	)
}

function	BackgroundVariant({image}: {image: ReactNode}) {
	return (
		<div className={'absolute inset-0 w-full h-full -ml-1 img-gradient'} style={{minWidth: 'calc(100% + 8px)'}}>
			{typeof image === 'string'
				? <img
					src={image}
					className={'relative object-cover w-full h-full'}
					loading={'eager'} />
				: image
			}
		</div>
	)
}

function	DefaultVariant({title, children, primaryButton, secondaryButton}: BannerTypes.TDefaultVariant) {
	return (
		<div className={'yearn--banner-content-wrapper'}>
			<h4 className={'yearn--banner-content-title'}>{title}</h4>
			<div className={'yearn--banner-content-text'}>{children}</div>
			{primaryButton || secondaryButton ? <div className={'yearn--banner-content-buttons'}>
				{primaryButton}
				{secondaryButton}
			</div> : null}
		</div>
	)
}

function	ImageVariant({image, height, onClick}: {
	height: string | number,
	image: ReactNode,
	onClick?: React.MouseEventHandler
}) {
	return (
		<div
			className={'w-full h-full -ml-1 cursor-pointer'}
			style={{minWidth: 'calc(100% + 8px)'}}
			onClick={onClick}>
			{typeof image === 'string'
				? <img src={image} height={height} className={'relative object-cover w-full'} loading={'eager'} />
				: image
			}
		</div>
	)
}

function	BannerBase({
	title,
	children,
	primaryButton,
	secondaryButton,
	image,
	variant = 'default',
	onClick,
	height = 350,
	className = '',
}: BannerTypes.TBanner): ReactElement {
	const	contentRef = React.useRef<HTMLDivElement | null | undefined>();

	return (
		<div
			ref={contentRef as never}
			data-variant={variant}
			className={`yearn--banner ${className || ''}`}>
			{variant === 'image' ? (
				<ImageVariant
					image={image as string}
					onClick={onClick}
					height={height} />
			) : (
				<DefaultVariant
					title={title}
					children={children}
					primaryButton={primaryButton}
					secondaryButton={secondaryButton} />
				)
			}
			{variant === 'split' ? <SplitVariant image={image as string} /> : null}
			{variant === 'background' ? <BackgroundVariant image={image as ReactNode} /> : null}
		</div>
	);
}


function	BannerControlable({children, onClose, canClose = true, paginationStyle}: BannerTypes.TBannerPagination): ReactElement {
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
		<div
			className={'yearn--banner-with-controls'}
			style={isVisible ? {} : {display: 'none'}}>
			{canClose ? <button onClick={onTryToClose} className={'absolute top-4 right-4 z-50'}>
				<IconCross className={`w-6 h-6 cursor-pointer ${paginationStyle ? paginationStyle : 'text-primary'}`} />
			</button> : null}

			{React.cloneElement(children[currentSlide])}
			
			{children.length > 1 ? <div className={`flex absolute right-4 bottom-4 flex-row items-center space-x-2 z-50 ${paginationStyle ? paginationStyle : 'text-primary'}`}>
				{renderPreviousChevron()}
				<p className={'text-sm tabular-nums'}>{`${currentSlide + 1}/${(children as ReactElement[]).length}`}</p>
				{renderNextChevron()}
			</div> : null}
		</div>
	);
}

export const Banner = Object.assign(BannerBase, {
	WithControls: BannerControlable
});