import {useState} from 'react';
import {ethers} from 'ethers';

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
	options?: {
		currentVersion?: number;
		previousVersion?: number;
		shouldMigratePreviousVersion?: boolean;
	}
): [T, React.Dispatch<React.SetStateAction<T>>] {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, set_storedValue] = useState<T>((): T => {
		const	_key = options?.currentVersion ? `${key}${options.currentVersion}` : key;
		try {
			if (typeof window === 'undefined') {
				return initialValue;
			}
			// Get from local storage by key
			const previousItem = window.localStorage.getItem(key);
			const item = window.localStorage.getItem(_key);

			if (previousItem && options?.shouldMigratePreviousVersion) {
				const resp = (
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					JSON.parse(previousItem, (_key: any, value: any): any => {
						if (value?.type === 'BigNumber') {
							return ethers.BigNumber.from(value);
						}
						return value;
					})
				);
				window.localStorage.setItem(_key, JSON.stringify(initialValue));
				window.localStorage.removeItem(key);
				return resp;
			} else if (item !== null) { // Parse stored json or if none return initialValue
				return (
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					JSON.parse(item, (_key: any, value: any): any => {
						if (value?.type === 'BigNumber') {
							return ethers.BigNumber.from(value);
						}
						return value;
					})
				);
			}
			//TODO: Should we do that ?
			// window.localStorage.setItem(key, JSON.stringify(initialValue));
			return initialValue;
		} catch (error) {
			// If error also return initialValue
			console.warn(error);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const set_value = (value: T | ((val: T) => T)): void => {
		const	_key = options?.currentVersion ? `${key}-${options.currentVersion}` : key;
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			// Save state
			set_storedValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(_key, JSON.stringify(valueToStore));
		} catch (error) {
			console.warn(error);
		}
	};

	return [storedValue, set_value];
}
