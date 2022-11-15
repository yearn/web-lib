/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Source: https://github.com/craig1123/react-recipes/blob/master/src/useInterval.js
// _inspired by_ https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import {useEffect, useRef} from 'react';

export function useInterval(callback: () => void, delay = 1000, runOnLoad = false, effectDependencies = [] as any): void {
	const savedCallback = useRef<any>();

	useEffect((): void => {
		if (runOnLoad) {
			callback();
		}
	}, [...effectDependencies]);

	// Remember the latest callback.
	useEffect((): void => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect((): any => {
		if (delay !== null) {
			const id = setInterval((): void => savedCallback.current(), delay);
			return () => clearInterval(id);
		}
	}, [delay, ...effectDependencies]);
}
