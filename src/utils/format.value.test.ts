import {describe, expect, test} from 'bun:test';

import {formatCounterValue, formatCounterValueRaw} from './format.value.js';

describe('counterValue and counterValueRaw', (): void => {
	test('returns $0,00 and empty string when amount or price are missing', (): void => {
		expect(formatCounterValue(0, 100)).toBe('$0,00');
		expect(formatCounterValue(100, 0)).toBe('$0,00');
		expect(formatCounterValueRaw(0, 100)).toBe('');
		expect(formatCounterValueRaw(100, 0)).toBe('');
	});

	test('returns correct formatted counter value with two decimal places when value is less than or equal to 10000', (): void => {
		expect(formatCounterValue(10, 100)).toBe('$1 000,00');
		expect(formatCounterValueRaw(10, 100)).toBe('1 000,00');
	});

	test('returns correct formatted counter value without decimal places when value is greater than 10000', (): void => {
		expect(formatCounterValue(200, 100)).toBe('$20 000');
		expect(formatCounterValueRaw(200, 100)).toBe('20 000');
	});

	test('handles invalid input strings', (): void => {
		expect(formatCounterValue('invalid', 100)).toBe('$0,00');
		expect(formatCounterValueRaw('invalid', 100)).toBe('0,00');
	});
});
