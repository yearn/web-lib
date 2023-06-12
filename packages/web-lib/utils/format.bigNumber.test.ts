import {formatBigNumberOver10K, toNormalizedBN} from './format.bigNumber';

describe('format.bigNumber', (): void => {
	describe('toNormalizedBN()', (): void => {
		it('returns correct normalized and raw values for input with 0 decimals', (): void => {
			const {raw, normalized} = toNormalizedBN('1', 0);
			expect(raw.toString()).toBe('1');
			expect(normalized).toBe(1);
		});
	
		it('returns correct normalized and raw values for input', (): void => {
			const {raw, normalized} = toNormalizedBN('1012300000000000000', 18);
			expect(raw.toString()).toBe('1012300000000000000');
			expect(normalized).toBe(1.0123);
		});
	
		it('uses default number of decimals (18) when none is specified', (): void => {
			const {raw, normalized} = toNormalizedBN('1012300000000000000');
			expect(raw.toString()).toBe('1012300000000000000');
			expect(normalized).toBe(1.0123);
		});
	
		it('returns correct normalized and raw values for input of 0', (): void => {
			const {raw, normalized} = toNormalizedBN('0', 18);
			expect(raw.toString()).toBe('0');
			expect(normalized).toBe(0);
		});
	});

	describe('formatBigNumberOver10K()', () => {
		fit('formats big numbers over 10K without decimal points', () => {
			const bigNum = BigInt(10001) * BigInt(Math.pow(10, 18));
			console.log(bigNum);
			
			expect(formatBigNumberOver10K(bigNum)).toBe('10 001');
		});

		it('formats big numbers equal to 10K with decimal points', () => {
			const bigNum = BigInt(10000) * BigInt(Math.pow(10, 18));
			expect(formatBigNumberOver10K(bigNum)).toBe('10 000,00');
		});

		it('formats big numbers less than 10K with decimal points', () => {
			const bigNum = BigInt(9999) * BigInt(Math.pow(10, 18));
			expect(formatBigNumberOver10K(bigNum)).toBe('9 999,00');
		});

		it('returns 0,00 for 0n', () => {
			expect(formatBigNumberOver10K(0n)).toBe('0,00');
		});
	});
});
