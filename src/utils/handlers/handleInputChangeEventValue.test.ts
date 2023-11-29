import {describe, expect, it} from 'bun:test';

import {handleInputChangeEventValue} from './handleInputChangeEventValue.js';

import type {TNormalizedBN} from '../format.bigNumber.js';

describe('handleInputChangeEventValue', (): void => {
	it('returns correct normalized and raw values for input with 0 decimals', (): void => {
		const {raw, normalized} = handleInputChangeEventValue('1', 0);
		expect(raw.toString()).toBe('1');
		expect(normalized).toBe('1');
	});

	it('uses default number of decimals (18) when none is specified', (): void => {
		const {raw, normalized} = handleInputChangeEventValue('1');
		expect(raw.toString()).toBe('1000000000000000000');
		expect(normalized).toBe('1');
	});

	it('returns correct normalized and raw values for input with decimals', (): void => {
		const {raw, normalized} = handleInputChangeEventValue('10.123', 18);
		expect(raw.toString()).toBe('10123000000000000000');
		expect(normalized).toBe('10.123');
	});

	it('removes non-numeric characters from input', (): void => {
		const {raw, normalized} = handleInputChangeEventValue('10a123b.30', 18);
		expect(raw.toString()).toBe('10123300000000000000000');
		expect(normalized).toBe('10123.30');
	});

	it('handles decimals correctly', (): void => {
		const {raw, normalized} = handleInputChangeEventValue('10.123456', 10);
		expect(raw.toString()).toBe('101234560000');
		expect(normalized).toBe('10.123456');
	});

	it('returns raw Zero and normalized empty string for empty input', (): void => {
		const {raw, normalized} = handleInputChangeEventValue('', 18);
		expect(raw.toString()).toBe('0');
		expect(normalized).toBe('');
	});

	it('replaces comma with period in input value', (): void => {
		const {raw, normalized} = handleInputChangeEventValue('10,123', 18);
		expect(raw.toString()).toBe('10123000000000000000');
		expect(normalized).toBe('10.123');
	});

	it('throws error for invalid input', (): void => {
		expect((): TNormalizedBN => handleInputChangeEventValue('10.123.456', 3)).toThrow('Invalid amount: 10.123.456');
	});
});
