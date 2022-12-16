import {useState} from 'react';
import {BigNumber} from 'ethers';

type TSessionStorage<T> = readonly [T, (value: T | ((val: T) => T)) => void];

export function useSessionStorage<T>(key: string, initialValue: T): TSessionStorage<T> {
	const [storedValue, set_storedValue] = useState<T>((): T => {
		try {
			const item = window.sessionStorage.getItem(key);
			if (!item) {
				return initialValue;
			}

			return (
				JSON.parse(item, (_: string, value: T & { type?: string}): T | BigNumber => {
					if (value?.type === 'BigNumber') {
						return BigNumber.from(value);
					}
					return value;
				})
			);
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const set_value = (value: T | ((val: T) => T)): void => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			set_storedValue(valueToStore);
			window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};
	return [storedValue, set_value] as const;
}
