import	React, {ReactElement}	from	'react';
import	useLocalStorage			from	'../hooks/useLocalStorage';


type TBanner = {
	children: ReactElement[] 
}

function	BannerPagination({
	children,
}: TBanner): ReactElement {

	const bannerIndex = useLocalStorage('bannerIndex', 0);

	return (
		<div>
			{children[bannerIndex]}
			<div className={'absolute bottom-4 right-4'}>
				<span>{'<'}</span>
				<span>{bannerIndex}/{children.length}</span>
				<span>{'>'}</span>
			</div>
		</div>
	);
}

export {BannerPagination};