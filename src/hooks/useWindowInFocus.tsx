import React from 'react';

const useWindowInFocus = (): boolean => {
	const [isFocused, set_isFocused] = React.useState(true);
	React.useEffect((): (() => void) => {
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

export {useWindowInFocus};
export default useWindowInFocus;
