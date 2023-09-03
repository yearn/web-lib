/* eslint-disable @typescript-eslint/no-explicit-any */

import {amount, amountV2, assertValidNumber, defaultOptions, formatLocalAmount, formatNumberOver10K} from './format.number';

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
			expect(amount(121234567834.56, 2, 2, 20)).toBe(
				'121 234 567 834,56'
			);
		});

		it('should not apply ellipsis if displayDigits is not provided', (): void => {
			expect(amount(1234123456756789, 0, 0)).toBe(
				'1 234 123 456 756 789'
			);
		});

		it('should handle non-numeric input as 0', (): void => {
			expect(amount('not-a-number')).toBe('0,00');
		});

		it('should handle NaN input as 0', (): void => {
			expect(amount(NaN)).toBe('0,00');
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

	describe('assertValidNumber', (): void => {
		it('Undefined should fallback to default value', (): void => {
			expect(assertValidNumber(undefined, 22, '')).toBe(22);
		});
		it('Negative value should fallback to default value', (): void => {
			expect(assertValidNumber(-5, 10, '')).toBe(10);
		});
		it('Value greater than 18 should be limited to 18', (): void => {
			expect(assertValidNumber(20, 10, '')).toBe(18);
		});
		it('NaN value should fallback to default value', (): void => {
			expect(assertValidNumber(NaN, 10, '')).toBe(10);
		});
		it('Non-integer value should fallback to default value', (): void => {
			expect(assertValidNumber(10.5, 10, '')).toBe(10);
		});
		it('Valid value should be returned as is', (): void => {
			expect(assertValidNumber(15, 10, '')).toBe(15);
		});
		it('Undefined should fallback to default value (0)', (): void => {
			expect(assertValidNumber(undefined, 0, '')).toBe(0);
		});
		it('Zero value should be returned as is', (): void => {
			expect(assertValidNumber(0, 10, '')).toBe(0);
		});
		it('Value equal to the upper limit (18) should be returned as is', (): void => {
			expect(assertValidNumber(18, 10, '')).toBe(18);
		});
		it('Floating-point value within the range should fallback', (): void => {
			expect(assertValidNumber(17.5, 18, '')).toBe(18);
		});
		it('Value greater than 18 should be limited to 18', (): void => {
			expect(assertValidNumber(25, 10, '')).toBe(18);
		});
		it('Invalid value should fallback to default value', (): void => {
			expect(assertValidNumber('abc' as any, 10, '')).toBe(10);
		});
		it('Non-integer value should fallback to default value', (): void => {
			expect(assertValidNumber(10.7, 10, '')).toBe(10);
		});
		it('Floating-point value with zero decimal should be returned as is', (): void => {
			expect(assertValidNumber(10.0, 10, '')).toBe(10);
		});
		it('Negative value should fallback to default value', (): void => {
			expect(assertValidNumber(-20, 10, '')).toBe(10);
		});
		it('Value within the range should be returned as is', (): void => {
			expect(assertValidNumber(3, 10, '')).toBe(3);
		});
		it('Value within the range should be returned as is', (): void => {
			expect(assertValidNumber(7, 10, '')).toBe(7);
		});
		it('Value within the range should be returned as is', (): void => {
			expect(assertValidNumber(13, 10, '')).toBe(13);
		});
		it('Value equal to the upper limit (18) should be returned as is', (): void => {
			expect(assertValidNumber(18, 10, '')).toBe(18);
		});
		it('Negative value should fallback to default value', (): void => {
			expect(assertValidNumber(-1, 7, '')).toBe(7);
		});
		it('Floating-point value within the range should fallback', (): void => {
			expect(assertValidNumber(1.5, 10, '')).toBe(10);
		});
	});

	describe('formatLocalAmount', (): void => {
		it('Currency symbol should be displayed', (): void => {
			expect(
				formatLocalAmount(1234.5678, 2, '$', defaultOptions).normalize(
					'NFKC'
				)).toBe(
				'1 234,57 $');

		}
		);

		it('Currency symbol should be displayed', (): void => {
			expect(
				formatLocalAmount(1234.5678, 2, '$', defaultOptions).normalize(
					'NFKC'
				)).toBe(
				'1 234,57 $');

		}
		);

		it('USD currency symbol should be displayed', (): void => {
			expect(
				formatLocalAmount(
					1234.5678,
					2,
					'USD',
					defaultOptions
				).normalize('NFKC')).toBe(
				'1 234,57 $');

		}
		);

		it('DAI currency symbol should be displayed', (): void => {
			expect(
				formatLocalAmount(
					1234.5678,
					2,
					'DAI',
					defaultOptions
				).normalize('NFKC')).toBe(
				'1 234,57 DAI');

		}
		);

		it('Percent symbol should be displayed', (): void => {
			expect(
				formatLocalAmount(
					0.123,
					2,
					'PERCENT',
					defaultOptions
				).normalize('NFKC')).toBe(
				'12,30 %');

		}
		);
		it('Empty symbol should not affect formatting', (): void => {
			expect(
				formatLocalAmount(1234.5678, 2, '', defaultOptions).normalize(
					'NFKC'
				)).toBe(
				'1 234,57');
		});
		it('Empty symbol should not affect formatting', (): void => {
			expect(
				formatLocalAmount(1234.5678, 2, '', {
					shouldDisplaySymbol: false
				}).normalize('NFKC')).toBe(
				'1 234,568');

		}
		);
		it('Amount should be formatted in short notation', (): void => {
			expect(
				formatLocalAmount(12345.6789, 2, '$', defaultOptions).normalize(
					'NFKC'
				)).toBe(
				'12,35 k $');

		}
		);
		it('Amount should be formatted in short notation', (): void => {
			expect(
				formatLocalAmount(
					12345678.9,
					2,
					'USD',
					defaultOptions
				).normalize('NFKC')).toBe(
				'12,35 M $');

		}
		);
		it('Amount should be formatted with the specified number of decimals', (): void => {
			expect(
				formatLocalAmount(0.00000123, 8, '$', defaultOptions).normalize(
					'NFKC'
				)).toBe(
				'0,00000123 $');

		}
		);
		it('Amount should be formatted with the specified number of decimals', (): void => {
			expect(
				formatLocalAmount(
					0.00000000123,
					12,
					'USD',
					defaultOptions
				).normalize('NFKC')).toBe(
				'0,00000000123 $');

		}
		);
		it('Amount above 0.01 should be formatted as is', (): void => {
			expect(
				formatLocalAmount(0.01, 2, 'USD', defaultOptions).normalize(
					'NFKC'
				)).toBe(
				'0,01 $');

		}
		);
		it('Amount above 0.01 should be formatted as is', (): void => {
			expect(
				formatLocalAmount(0.001, 2, 'OPT', defaultOptions).normalize(
					'NFKC'
				)).toBe(
				'0,001 OPT');

		}
		);
		it('Amount should be formatted with the specified number of decimals', (): void => {
			expect(
				formatLocalAmount(
					0.000000000000123,
					18,
					'YFI',
					defaultOptions
				).normalize('NFKC')).toBe(
				'0,000000000000123 YFI');

		}
		);
		it("Amount should be 0,00 YFI when it's too small", (): void => {
			expect(
				formatLocalAmount(
					0.000000000000000000123,
					18,
					'YFI',
					defaultOptions
				).normalize('NFKC')).toBe(
				'0,00 YFI');

		}
		);
	});

	describe('is ok for amountV2', (): void => {
		it('Formatted amount with decimal places and currency symbol should be returned', (): void => {
			expect(
				amountV2({
					value: 1234.5678,
					decimals: 2,
					symbol: '$',
					options: defaultOptions
				}).normalize('NFKC')).toBe(
				'1 234,57 $');

		}
		);
		it('Formatted amount with decimal places and USD currency symbol should be returned', (): void => {
			expect(
				amountV2({
					value: 1234.5678,
					decimals: 2,
					symbol: 'USD',
					options: defaultOptions
				}).normalize('NFKC')).toBe(
				'1 234,57 $');

		}
		);
		it('Formatted amount with decimal places and EUR currency symbol should be returned', (): void => {
			expect(
				amountV2({
					value: 1234.5678,
					decimals: 2,
					symbol: 'DAI',
					options: defaultOptions
				}).normalize('NFKC')).toBe(
				'1 234,57 DAI');

		}
		);
		it('Formatted amount with decimal places and no currency symbol should be returned', (): void => {
			expect(
				amountV2({
					value: 1234.5678,
					decimals: 2,
					symbol: 'USD',
					options: {shouldDisplaySymbol: false}
				}).normalize('NFKC')).toBe(
				'1 234,57');

		}
		);
		it('Formatted amount with decimal places and percent symbol should be returned', (): void => {
			expect(
				amountV2({
					value: 1234.5678,
					decimals: 2,
					symbol: 'PERCENT',
					options: defaultOptions
				}).normalize('NFKC')).toBe(
				'> 500,00 %');

		}
		);
		it('Formatted amount with decimal places and no percent symbol should be returned', (): void => {
			expect(
				amountV2({
					value: 1234.5678,
					decimals: 2,
					symbol: 'PERCENT',
					options: {shouldDisplaySymbol: false}
				}).normalize('NFKC')).toBe(
				'1 234,57');

		}
		);
		it('Formatted zero amount with no symbol should be returned', (): void => {
			expect(
				amountV2({
					value: 0,
					decimals: 2,
					symbol: '',
					options: defaultOptions
				}).normalize('NFKC')).toBe(
				'0,00');

		}
		);
		it('Formatted infinity amount should be returned', (): void => {
			expect(
				amountV2({
					value: Infinity,
					decimals: 2,
					symbol: '$',
					options: defaultOptions
				}).normalize('NFKC')).toBe(
				'∞');

		}
		);
		it('Formatted BigInt amount with unit should be returned', (): void => {
			expect(
				amountV2({value: BigInt(123456789), decimals: 2, symbol: '$', options: defaultOptions}).normalize('NFKC')).toBe(
				'1,23 M $');

		}
		);
		it('Formatted NaN amount should return infinity', (): void => {
			expect(
				amountV2({
					value: NaN,
					decimals: 2,
					symbol: '$',
					options: defaultOptions
				}).normalize('NFKC')).toBe(
				'0,00 $');

		}
		);
		it('Formatted small amount with decimal places and no percent symbol should be returned', (): void => {
			expect(
				amountV2({
					value: 0.0000000012345678,
					decimals: 2,
					symbol: 'PERCENT',
					options: {shouldDisplaySymbol: false}
				}).normalize('NFKC')).toBe(
				'0,000000001235');

		}
		);
		it('Format small amount to 0,00 and no percent symbol should be returned', (): void => {
			expect(
				amountV2({
					value: 0.000000000000012345678,
					decimals: 2,
					symbol: 'PERCENT',
					options: {shouldDisplaySymbol: false}
				}).normalize('NFKC')).toBe(
				'0,00');

		}
		);
	});
});
