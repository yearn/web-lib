import	React, {ReactElement}	from	'react';
import	IconCross				from	'../icons/IconCross';
import	useLocalStorage			from	'../hooks/useLocalStorage';


type TBanner = {
	id: string,
	title?: string,
	image?: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactElement | ReactElement[],
	canClose?: boolean,
	onClose?: () => void,
	onClick?: () => void,
	variant?: 'default' | 'image' | 'split' | 'background'
}
type TDefaultVariant = {
	title?: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactElement | ReactElement[],
	variant?: 'default' | 'image' | 'split' | 'background'
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

function	BackgroundVariant({image}: {image: string}) {
	return (
		<div className={'absolute inset-0 w-full h-full -ml-1 -z-10 img-gradient'} style={{minWidth: 'calc(100% + 8px)'}}>
			<img src={image} className={'relative object-cover w-full h-full'} />
		</div>
	)
}

function	DefaultVariant({variant, title, children, primaryButton, secondaryButton}: TDefaultVariant) {
	return (
		<div className={`p-4 md:p-6 flex-col ${variant === 'split' && 'w-full md:w-1/2'}`}>
			<h4 className={'mb-4 md:mb-6 text-inherit'}>{title}</h4>
			<div className={'mb-4 md:mb-6 text-inherit'}>{children}</div>
			<div className={'flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4'}>
				{primaryButton}
				{secondaryButton}
			</div>
		</div>
	)
}

function	ImageVariant({image}: {image: string}) {
	return (
		<div className={'w-full h-full -ml-1'} style={{minWidth: 'calc(100% + 8px)'}}>
			<img src={image} className={'relative object-cover w-full h-full'} />
		</div>
	)
}

function	Banner({
	id,
	title,
	children,
	primaryButton,
	secondaryButton,
	image,
	variant = 'default',
	canClose = true,
	onClose
}: TBanner): ReactElement {
	const	contentRef = React.useRef<HTMLDivElement | null | undefined>();
	const	[shouldRender, set_shouldRender] = useLocalStorage(id, true) as [boolean, (b: boolean) => void];
	const	[isVisible, set_isVisible] = React.useState(true);
	const	[contentHeight, set_contentHeight] = React.useState(330);
	const	defaultClassName = 'text-primary bg-secondary border-primary';
	const	backgroundClassName = 'text-surface bg-no-repeat bg-cover bg-center border-primary';
	const	imageClassName = 'text-surface border-primary bg-no-repeat bg-cover bg-center';
	const	bannerClassName = variant === 'image' ? imageClassName : variant === 'background' ? backgroundClassName : defaultClassName;

	React.useEffect((): void => {
		if (!isVisible) {
			setTimeout((): void => set_shouldRender(false), 650);
		}
	}, [isVisible]);

	React.useEffect((): void => {
		if (contentRef.current) {
			//get height of dom
			set_contentHeight((contentRef.current.clientHeight) + 4);

		}
	}, [contentRef])

	function	onTryToClose(): void {
		if (onClose) {
			onClose();
		} else {
			set_isVisible(false);
		}
	}

	if (!shouldRender && canClose) {
		return <div />;
	}
	return (
		<div
			className={'transition-max-height overflow-hidden duration-600'}
			style={{maxHeight: isVisible ? contentHeight : 0}}>
			<div
				ref={contentRef as never}
				className={`w-full flex flex-col-reverse md:flex-row relative rounded-lg border-2 overflow-hidden ${bannerClassName}`}>

				{canClose ? (
					<button onClick={onTryToClose} className={'absolute top-4 right-4'}>
						<IconCross className={'w-6 h-6 cursor-pointer'} />
					</button>
				) : null}

				{variant === 'image' ? (
					<ImageVariant image={image as string} />
				) : (
					<DefaultVariant
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
		</div>
	);
}

export {Banner};