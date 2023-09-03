import {isZero} from './isZero';

describe('isZero function', (): void => {
	test('returns false when no argument given', (): void => {
		expect(isZero()).toBe(false);
	});

	test.each([
		[0, true],
		['0', true],
		['0.0', true],
		['0,0', true],
		['000', true],
		[0n, true],
		[`${0}`, true],
		[' 0 ', true],
		[' 0.00 ', true],
		['-0', true],
		[null, false],
		[undefined, false],
		[-1, false],
		['1', false],
		[1, false],
		['-1', false],
		['0.1', false],
		[1n, false],
		['abc', false],
		[NaN, false],
		['', false],
		['  ', false]
	])('isZero(%p) should return %s', (input, expected): void => {
		expect(isZero(input)).toBe(expected);
	});
});
