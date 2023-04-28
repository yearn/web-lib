import {amount} from './format.number';

describe('amount', (): void => {
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
		expect(amount(1234.56)).toBe('1 234,56');
	});

	it('should format string number correctly with default parameters', (): void => {
		expect(amount('1234.56')).toBe('1 234,56');
	});

	it('should format number with custom minimum and maximum fraction digits', (): void => {
		expect(amount(1234.5678, 3, 4)).toBe('1 234,5678');
	});

	it('should handle maximumFractionDigits less than minimumFractionDigits', (): void => {
		expect(amount(1234.56, 3, 1)).toBe('1 234,560');
	});

	it('should format number with ellipsis in the middle', (): void => {
		expect(amount(12345678912345678, 0, 0, 12)).toBe('12 345...45 678');
	});

	it('should format number with decimal part and ellipsis in the middle', (): void => {
		expect(amount(123451234567.6789, 2, 2, 10)).toBe('123 4...67,68');
	});

	it('should not apply ellipsis if displayDigits is larger than the formatted amount length', (): void => {
		expect(amount(121234567834.56, 2, 2, 20)).toBe('121 234 567 834,56');
	});

	it('should not apply ellipsis if displayDigits is not provided', (): void => {
		expect(amount(1234123456756789, 0, 0)).toBe('1 234 123 456 756 789');
	});

	it('should handle non-numeric input as 0', (): void => {
		expect(amount('not-a-number')).toBe('0,00');
	});

	it('should handle NaN input as 0', (): void => {
		expect(amount(NaN)).toBe('0,00');
	});
});
