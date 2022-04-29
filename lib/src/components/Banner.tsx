import	React, {ReactElement}	from	'react';
import	IconChevron				from	'../icons/IconChevron';
import	IconCross				from	'../icons/IconCross';

type TBanner = {
	title?: string,
	image?: string | ReactElement,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactElement | ReactElement[],
	canClose?: boolean,
	onClose?: () => void,
	onClick?: React.MouseEventHandler
	variant?: 'default' | 'image' | 'split' | 'background'
	height?: string | number,
	className?: string,
	withControls?: boolean
}
type TDefaultVariant = {
	title?: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactElement | ReactElement[],
	variant?: 'default' | 'image' | 'split' | 'background',
	withControls?: boolean
}

function	SplitVariant({image}: {image: string}) {
	return (
		<div className={'w-full md:w-1/2 relative'}>
			<div
				className={'flex md:hidden overflow-hidden relative -mx-1 -mt-1 w-full h-full rounded-xl border-x-2 border-b-2 border-primary max-h-48'}
				style={{width: 'calc(100% + 8px)'}}>
				<div className={'rounded-lg image-align-middle'}>
					<img src={image} className={'w-full h-full object-cover'} loading={'eager'} />
				</div>
			</div>
			<div
				className={'hidden md:flex overflow-hidden -my-1 -ml-1 w-full h-full rounded-xl border-y-2 border-l-2 border-primary absolute'}
				style={{height: 'calc(100% + 8px)', width: 'calc(100% + 8px)'}}>
				<div
					style={{minWidth: 'calc(100% + 8px)'}}
					className={'rounded-lg image-align-middle w-full h-full -ml-1'}>
					<img src={image} className={'w-full h-full object-cover'} loading={'eager'} />
				</div>
			</div>
		</div>
	)
}

function	BackgroundVariant({image}: {image: string | ReactElement}) {
	return (
		<div className={'absolute inset-0 w-full h-full -ml-1 -z-10 img-gradient'} style={{minWidth: 'calc(100% + 8px)'}}>
			{typeof image === 'string'
				? <img src={image} className={'relative object-cover w-full h-full'} loading={'eager'} />
				: image
			}
		</div>
	)
}

function	DefaultVariant({variant, title, children, primaryButton, secondaryButton, withControls}: TDefaultVariant) {
	return (
		<div className={`p-4 md:p-6 flex-col ${variant === 'split' && 'w-full md:w-1/2'}`}>
			<h4 className={withControls ? 'mr-5 md:mr-0 mb-4 md:mb-6 text-inherit' : 'mb-4 md:mb-6 text-inherit'}>{title}</h4>
			<div className={'mb-4 md:mb-6 text-inherit'}>{children}</div>
			<div className={'flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4'}>
				{primaryButton}
				{secondaryButton}
			</div>
		</div>
	)
}

function	ImageVariant({image, height, onClick}: {height: string | number, image: string | ReactElement, onClick?: React.MouseEventHandler}) {
	return (
		<div className={'w-full h-full -ml-1 cursor-pointer'} style={{minWidth: 'calc(100% + 8px)'}} onClick={onClick}>
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
	withControls = false
}: TBanner): ReactElement {
	const	contentRef = React.useRef<HTMLDivElement | null | undefined>();
	const	defaultClassName = 'text-primary bg-secondary border-primary';
	const	backgroundClassName = 'bg-no-repeat bg-cover bg-center border-primary';
	const	imageClassName = 'border-primary bg-no-repeat bg-cover bg-center';
	const	bannerClassName = `${variant === 'image' ? imageClassName : variant === 'background' ? backgroundClassName : defaultClassName} ${className || ''}`;

	return (
		<div
			ref={contentRef as never}
			style={{height: withControls ? 'calc(100% + 30px)' : '100%'}}
			className={`w-full flex flex-col-reverse md:flex-row relative rounded-lg border-2 overflow-hidden ${withControls && variant !== 'image' ? 'pb-8 md:pb-0' : ''} ${bannerClassName}`}>

			{variant === 'image' ? (
				<ImageVariant image={image as string} onClick={onClick} height={height} />
			) : (
				<DefaultVariant
					withControls={withControls}
					variant={variant}
					title={title}
					children={children}
					primaryButton={primaryButton}
					secondaryButton={secondaryButton} />
				)
			}
			{variant === 'split' ? <SplitVariant image={image as string} /> : null}
			{variant === 'background' ? <BackgroundVariant image={image as string} /> : null}
		</div>
	);
}


export type	TBannerPagination = {
	children: ReactElement[],
	canClose?: boolean,
	paginationStyle?: string,
	onClose?: () => void
}

function	BannerControlable({children, onClose, canClose = true, paginationStyle}: TBannerPagination): ReactElement {
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
		<div className={`relative ${isVisible ? '' : 'hidden'}`}>
			{canClose ? <button onClick={onTryToClose} className={'absolute top-4 right-4 z-50'}>
				<IconCross className={`w-6 h-6 cursor-pointer ${paginationStyle ? paginationStyle : 'text-primary'}`} />
			</button> : null}

			{React.cloneElement(children[currentSlide], {withControls: true})}
			
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