import React, {cloneElement, useState} from 'react';
import IconChevron from '@yearn-finance/web-lib/icons/IconChevron';
import IconCross from '@yearn-finance/web-lib/icons/IconCross';

import type {ReactElement, ReactNode} from 'react';

export type TBanner = {
	title: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children: ReactNode,
} & React.ComponentPropsWithoutRef<'div'>

export type TDefaultVariant = {
	title?: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactNode
}

export type	TBannerPagination = {
	children: ReactElement[],
	canClose?: boolean,
	onClose?: () => void
}

function	BannerBase(props: TBanner): ReactElement {
	const {title, children, primaryButton, secondaryButton} = props;

	return (
		<div className={`yearn--banner ${props.className || ''}`}>
			<div className={'yearn--banner-content-wrapper'}>
				<h4 className={'yearn--banner-content-title'}>{title}</h4>
				<div className={'yearn--banner-content-text'}>{children}</div>
				{primaryButton || secondaryButton ? (
					<div className={'yearn--banner-content-buttons'}>
						{primaryButton}
						{secondaryButton}
					</div>
				) : null}
			</div>
		</div>
	);
}


function	BannerControlable(props: TBannerPagination): ReactElement {
	const	{children, onClose, canClose = true} = props;
	const	[currentSlide, set_currentSlide] = useState(0);
	const	[isVisible, set_isVisible] = useState(true);

	function	onTryToClose(): void {
		if (onClose) {
			onClose();
		} else {
			set_isVisible(false);
		}
	}

	function	renderPreviousChevron(): ReactElement {
		if (currentSlide === 0) {
			return (<IconChevron className={'h-4 w-4 cursor-not-allowed opacity-50'} />);
		}
		return (
			<IconChevron
				className={'h-4 w-4 cursor-pointer'}
				onClick={(): void => set_currentSlide(currentSlide - 1)} />
		);
	}

	function	renderNextChevron(): ReactElement {
		if (currentSlide === (children as ReactElement[]).length - 1) {
			return (<IconChevron className={'h-4 w-4 rotate-180 cursor-not-allowed opacity-50'} />);
		}
		return (
			<IconChevron
				className={'h-4 w-4 rotate-180 cursor-pointer'}
				onClick={(): void => set_currentSlide(currentSlide + 1)} />
		);
	}

	return (
		<div
			className={'yearn--banner-with-controls'}
			style={isVisible ? {} : {display: 'none'}}>
			{canClose ? (
				<button onClick={onTryToClose} className={'absolute top-4 right-4 z-50'}>
					<IconCross className={'yearn--banner-with-controls-icons-cross'} />
				</button>
			) : null}

			{cloneElement(children[currentSlide])}
			
			{children.length > 1 ? (
				<div className={'yearn--banner-with-controls-pagination'}>
					{renderPreviousChevron()}
					<p className={'text-sm tabular-nums'}>{`${currentSlide + 1}/${(children as ReactElement[]).length}`}</p>
					{renderNextChevron()}
				</div>
			) : null}
		</div>
	);
}

export const Banner = Object.assign(BannerBase, {
	WithControls: BannerControlable
});
