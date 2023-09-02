import React, {createContext, Fragment, useCallback, useContext, useMemo, useRef} from 'react';
import {toast, ToastBar, Toaster} from 'react-hot-toast';
// eslint-disable-next-line import/no-named-as-default
import NProgress from 'nprogress';

import type {ReactElement} from 'react';
import type {Toast} from 'react-hot-toast';
import { IconCross } from '../icons/IconCross';
import { TUIOptions, TUIContext } from '../types/contexts';
import { deepMerge } from './utils';

const	defaultOptions: TUIOptions = {
	shouldUseDefaultToaster: true
};

const	UI = createContext<TUIContext>({
	toast,
	onLoadStart: NProgress.start,
	onLoadDone: NProgress.done
});

export const UIContextApp = ({children, options = defaultOptions}: {
	children: ReactElement,
	options?: TUIOptions
}): ReactElement => {
	const uiOptions = deepMerge(defaultOptions, options) as TUIOptions;
	const nsRefCount = useRef(0);

	function	renderToaster(): ReactElement {
		if (uiOptions.shouldUseDefaultToaster) {
			return (
				<Toaster
					containerClassName={'!z-[1000000]'}
					gutter={0}
					position={'bottom-center'}
					containerStyle={{
						zIndex: 1000000,
						width: '100%',
						bottom: 0,
						left: 0,
						right: 0
					}}
					toastOptions={{
						className: 'yearn--toast-options'
					}}>
					{(t: Toast): ReactElement => (
						<ToastBar toast={t} position={'bottom-center'}>
							{({icon, message}): ReactElement => (
								<>
									{icon}
									{message}
									{t.type !== 'loading' ? (
										<IconCross
											width={16}
											height={16}
											onClick={(): void => toast.dismiss(t.id)}
											className={'mr-3 cursor-pointer'} />
									) : null}
								</>
							)}
						</ToastBar>
					)}
				</Toaster>
			);
		}
		return <Fragment />;
	}

	const	onLoadStart = useCallback((): void => {
		if (nsRefCount.current === 0) {
			NProgress.start();
		}

		nsRefCount.current += 1;
	}, []);

	const	onLoadDone = useCallback((): void => {
		if (nsRefCount.current === 0) {
			NProgress.done();
			return;
		}
		nsRefCount.current -= 1;
		if (nsRefCount.current === 0) {
			NProgress.done();
		}
	}, []);

	/* 💙 - Yearn Finance *********************************************************************
	**	Render the UIContext with it's parameters.
	**	The parameters will be accessible to the children via the useUI hook.
	******************************************************************************************/
	const	contextValue = useMemo((): TUIContext => ({
		toast,
		onLoadStart,
		onLoadDone
	}), [onLoadStart, onLoadDone]);

	return (
		<UI.Provider value={contextValue}>
			{renderToaster()}
			{children}
		</UI.Provider>
	);
};

export const useUI = (): TUIContext => useContext(UI);
