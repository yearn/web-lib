'use client';

import {useEffect, useState} from 'react';

function useDebounce(value: unknown, delay: number): unknown {
	// State and setters for debounced value
	const [debouncedValue, set_debouncedValue] = useState(value);

	useEffect((): (() => void) => {
		// Update debounced value after delay
		const handler = setTimeout((): void => {
			set_debouncedValue(value);
		}, delay);

		// Cancel the timeout if value changes (also on delay change or unmount)
		// This is how we prevent debounced value from updating if value is changed ...
		// .. within the delay period. Timeout gets cleared and restarted.
		return (): void => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export {useDebounce};
export default useDebounce;