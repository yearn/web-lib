import { toNormalizedBN } from "./format.bigNumber";

describe('toNormalizedBN', () => {
	it('returns correct normalized and raw values for input with 0 decimals', () => {
		const {raw, normalized} = toNormalizedBN('1', 0);
		expect(raw.toString()).toBe('1');
		expect(normalized).toBe(1);
	});
	
	it('returns correct normalized and raw values for input', () => {
		const {raw, normalized} = toNormalizedBN('1012300000000000000', 18);
		expect(raw.toString()).toBe('1012300000000000000');
		expect(normalized).toBe(1.0123);
	});
	
	it('uses default number of decimals (18) when none is specified', () => {
		const {raw, normalized} = toNormalizedBN('1012300000000000000');
		expect(raw.toString()).toBe('1012300000000000000');
		expect(normalized).toBe(1.0123);
	});
	
	it('returns correct normalized and raw values for input of 0', () => {
		const {raw, normalized} = toNormalizedBN('0', 18);
		expect(raw.toString()).toBe('0');
		expect(normalized).toBe(0);
	});	
})
