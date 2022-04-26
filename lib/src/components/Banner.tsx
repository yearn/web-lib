import	React, {ReactElement}	from	'react';
import	IconCross				from	'../icons/IconCross';
import	useLocalStorage			from	'../hooks/useLocalStorage';


type TBanner = {
	id: string,
	title?: string,
	image?: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children: ReactElement | ReactElement[],
	canClose?: boolean,
	onClose?: () => void,
	onClick?: () => void,
	maxHeight?: string,
	variant?: 'default' | 'image' | 'split' | 'background'
}

function	Banner({
	id,
	title,
	children,
	primaryButton,
	secondaryButton,
	image,
	variant = 'default',
	maxHeight = 'max-h-[300px]',
	canClose = true,
	onClose
}: TBanner): ReactElement {
	const	[shouldRender, set_shouldRender] = useLocalStorage(id, true) as [boolean, (b: boolean) => void];
	const	[isVisible, set_isVisible] = React.useState(true);
	const	defaultClassName = 'text-primary bg-secondary border-primary';
	const	imageClassName = 'text-surface border-primary';

	// interpolating url in the string explodes everything and I don't know why, url should be ${image} (and image url is correct) but compiler complains
	const	backgroundClassName = `text-surface bg-no-repeat bg-cover bg-center border-primary bg-[url('https://s3-alpha-sig.figma.com/img/b829/4b75/53c36559b3a9d6b32c7dce0d538df530?Expires=1652054400&Signature=Yj4zLkEg3Du4T9nw8NVyqk-ytYa130MIlG79ZuFqYMyNLHW1wTI3OuQ~FTBbkzRRfNQmOOLSDz09j3YJH-RxUJv1ihvXxDn2Ln5tsJwGzWQl2ngxhcFNjhabyj3Dd8EQeB-qv6FMD1IhvnbgfbzVOv4i8sY4iQhpS00CJLebj~gr1enEmgUffFSeb0xrYbW5z~vGD7MJu2hMx9tjIu0bkOGrjzE4BribeVgi4ZOrs8bP9RNo7X4IjDC1Z8~dJ3mBBEIYgb2fuxJA54oybxWffzyhPVyTPMov6L1jaz6v6zZ5LIW~-JihfkfXCOp~zdYv4FV0ZFh8AQWf~gRNFZUqRQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA')]`;
	
	const	bannerClassName = variant === 'image' ? imageClassName : variant === 'background' ? backgroundClassName : defaultClassName;

	React.useEffect((): void => {
		if (!isVisible) {
			setTimeout((): void => set_shouldRender(false), 650);
		}
	}, [isVisible]);

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
			className={`transition-max-height overflow-hidden duration-600 ${isVisible ? maxHeight : 'max-h-0'}`}>
			<div className={`Banner--wrapper flex relative rounded-lg border-2 overflow-hidden ${bannerClassName} ${variant === 'image' && "bg-no-repeat bg-cover bg-center bg-[url('https://s3-alpha-sig.figma.com/img/51a1/2fe5/7e3ce66410a263a2c114465d9983e44c?Expires=1652054400&Signature=M75j71LEDL-7A95sBpXcuAXLZ~H06v0GyWZgZEfuA~-aX4Ouc3V6brvl-B0-WL5rU8-mDRGaIk2TnYx-FnZN-NYg5vMCT1FT~ehpUA~XN5emO~zPY~7N-AJbhIPxEX9OI137ysqsQs72~RuBPoNfyJRaGY92SFPBV~ity3xcI-~evMzP3h3UDUU~VctTGlbDIl7wSXOr~S1PTesgClzh-9nVBxyVrTB2eUW~-L6wK765CwfLJHjw8rWjKO8D336O9dJ0mU7vQShq2rr6tgS0EA~evYLMf-3JWl5cBKea6GGALcqebJIlGC6PxkSwQ27SVe0mtr8zZXX8~WwOpdRzvg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA')]"}`}>
				<div className={`p-6 flex-col ${variant === 'split' && 'w-1/2'}`}>
					{canClose ? (
						<button onClick={onTryToClose} className={'absolute top-4 right-4'}>
							<IconCross className={'w-6 h-6 cursor-pointer'} />
						</button>
					) : null}
					{variant === 'image'
						? <pre className={'mb-6 text-inherit text-4xl'}>{title}</pre>
						: <h4 className={'mb-6 text-inherit'}>{title}</h4>
					}

					{variant === 'image'
						? <pre className={'mb-6 text-inherit text-2xl'}>{children}</pre>
						: <div className={'mb-6 text-inherit'}>{children}</div>
					}
					
					<div className={'flex'}>
						<div className={'mr-4'}>{primaryButton}</div>
						{secondaryButton}
					</div>
				</div>
				{variant === 'split' &&
					<div className={`flex-col w-1/2 bg-no-repeat bg-cover bg-center bg-[url('https://s3-alpha-sig.figma.com/img/b829/4b75/53c36559b3a9d6b32c7dce0d538df530?Expires=1652054400&Signature=Yj4zLkEg3Du4T9nw8NVyqk-ytYa130MIlG79ZuFqYMyNLHW1wTI3OuQ~FTBbkzRRfNQmOOLSDz09j3YJH-RxUJv1ihvXxDn2Ln5tsJwGzWQl2ngxhcFNjhabyj3Dd8EQeB-qv6FMD1IhvnbgfbzVOv4i8sY4iQhpS00CJLebj~gr1enEmgUffFSeb0xrYbW5z~vGD7MJu2hMx9tjIu0bkOGrjzE4BribeVgi4ZOrs8bP9RNo7X4IjDC1Z8~dJ3mBBEIYgb2fuxJA54oybxWffzyhPVyTPMov6L1jaz6v6zZ5LIW~-JihfkfXCOp~zdYv4FV0ZFh8AQWf~gRNFZUqRQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA')]`}>
					</div>
				}
			</div>
		</div>
	);
}

export {Banner};