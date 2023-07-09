import {amount, formatNumberOver10K} from './format.number';

describe('format.number', (): void => {
	describe('amount()', (): void => {
		beforeAll((): void => {
			// Mock the navigator to avoid environment inconsistencies
			Object.defineProperty(global, 'navigator', {
				value: {
					language: 'fr-FR'
				},
				configurable: true
			});
		});

		it('should format number correctly with default parameters', (): void => {
			expect(amount({amount: 1234.56})).toBe('1 234,56');
			expect(amount({amount: 0.0000012345678})).toBe('0,000001');
			expect(amount({amount: 0.0000000000015678})).toBe('0,000000000002');
			expect(amount({amount: 0.000000000000000015678})).toBe('0,00000000000000001568');
			expect(amount({amount: 0.000000000000000000000015678})).toBe('0,00'); // Too small to be displayed
		});

		it('should format string number correctly with default parameters', (): void => {
			expect(amount({amount: '1234.56'})).toBe('1 234,56');
			expect(amount({amount: '0.0000012345678'})).toBe('0,000001');
			expect(amount({amount: '0.0000000000015678'})).toBe('0,000000000002');
			expect(amount({amount: '0.000000000000000015678'})).toBe('0,00000000000000001568');
			expect(amount({amount: '0.000000000000000000000015678'})).toBe('0,00'); // Too small to be displayed
		});

		it('should format number with custom minimum and maximum fraction digits', (): void => {
			expect(amount({amount: 1234.5678, fractionDigits: {min: 3, max: 4}})).toBe('1 234,5678');
		});

		it('should handle maximumFractionDigits less than minimumFractionDigits', (): void => {
			expect(amount({amount: 1234.56, fractionDigits: {min: 3, max: 1}})).toBe('1 234,560');
		});

		it('should format number with ellipsis in the middle', (): void => {
			expect(amount({amount: 12345678912345678, fractionDigits: {min: 0, max: 0}, displayDigits: 12})).toBe('12 345...45 678');
		});

		it('should format number with decimal part and ellipsis in the middle', (): void => {
			expect(amount({amount: 123451234567.6789, fractionDigits: {min: 2, max: 2}, displayDigits: 10})).toBe('123 4...67,68');
		});

		it('should not apply ellipsis if displayDigits is larger than the formatted amount length', (): void => {
			expect(amount({amount: 121234567834.56, fractionDigits: {min: 2, max: 2}, displayDigits: 20})).toBe(
				'121 234 567 834,56'
			);
		});

		it('should not apply ellipsis if displayDigits is not provided', (): void => {
			expect(amount({amount: 1234123456756789, fractionDigits: {min: 0, max: 0}})).toBe(
				'1 234 123 456 756 789'
			);
		});

		it('should handle non-numeric input as 0', (): void => {
			expect(amount({amount: 'not-a-number'})).toBe('0,00');
		});

		it('should handle NaN input as 0', (): void => {
			expect(amount({amount: NaN})).toBe('0,00');
		});
	});

	describe('formatNumberOver10K()', (): void => {
		it('formats numbers over 10K without decimal points', (): void => {
			expect(formatNumberOver10K(10001)).toBe('10 001');
		});

		it('formats numbers equal to 10K without decimal points', (): void => {
			expect(formatNumberOver10K(10000)).toBe('10 000');
		});

		it('formats numbers less than 10K with decimal points', (): void => {
			expect(formatNumberOver10K(9999)).toBe('9 999,00');
		});

		it('returns empty string for 0', (): void => {
			expect(formatNumberOver10K(0)).toBe('0,00');
		});
	});
});
