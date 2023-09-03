/* eslint-disable @typescript-eslint/no-explicit-any */

import {isNumber} from './isNumber';

describe('isNumber', (): void => {
	it('should return true if the value is a number', (): void => {
		expect(isNumber(42)).toBe(true);
		expect(isNumber('42')).toBe(true);
		expect(isNumber('3.14')).toBe(true);
		expect(isNumber(0)).toBe(true);
	});

	it('should return false if the value is not a number', (): void => {
		expect(isNumber('hello')).toBe(false);
		expect(isNumber('')).toBe(false);
		expect(isNumber(null as any)).toBe(false);
		expect(isNumber(undefined as any)).toBe(false);
		expect(isNumber({} as any)).toBe(false);
		expect(isNumber([] as any)).toBe(false);
	});
});
