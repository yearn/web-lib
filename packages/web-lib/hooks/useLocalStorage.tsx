import React from 'react';
import {ethers} from 'ethers';

function useLocalStorage(key: string, initialValue: unknown): [unknown, (value: unknown) => void] {
	
	// State to store our value
	// Pass initial state function to React.useState so logic is only executed once
	const [storedValue, set_storedValue] = React.useState((): unknown => {
		try {
			if (typeof window === 'undefined') {
				return initialValue;
			}
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return item !== null ? JSON.parse(item, (_key: any, value: any): any => {
				if (value?.type === 'BigNumber') {
					return ethers.BigNumber.from(value);
				}
				return value;
			}) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.warn(error);
			return initialValue;
		}
	});

	// Return a wrapped version of React.useState's setter function that ...
	// ... persists the new value to localStorage.
	const set_value = (value: unknown): void => {
		try {
			// Allow value to be a function so we have same API as React.useState
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			// Save state
			set_storedValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.warn(error);
		}
	};

	return [storedValue, set_value];
}

export {useLocalStorage};
export default useLocalStorage;