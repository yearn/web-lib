import {useEffect, useState} from 'react';

export const useWindowInFocus = (): boolean => {
	const [isFocused, set_isFocused] = useState(true);
	useEffect((): (() => void) => {
		const onFocus = (): void => set_isFocused(true);
		const onBlur = (): void => set_isFocused(false);

		window.addEventListener('focus', onFocus);
		window.addEventListener('blur', onBlur);

		return (): void => {
			window.removeEventListener('focus', onFocus);
			window.removeEventListener('blur', onBlur);
		};
	}, []);

	return isFocused;
};
