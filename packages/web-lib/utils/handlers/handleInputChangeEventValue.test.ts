import { handleInputChangeEventValue } from './handleInputChangeEventValue';

describe('handleInputChangeEventValue', () => {
	it('returns correct normalized and raw values for input with no decimals', () => {
		const {raw, normalized} = handleInputChangeEventValue({value: '1', decimals: 18});
		expect(raw.toString()).toBe('1000000000000000000');
		expect(normalized).toBe('1');
	});

	it('returns correct normalized and raw values for input with decimals', () => {
		const {raw, normalized} = handleInputChangeEventValue({value: '10.123', decimals: 18});
		expect(raw.toString()).toBe('10123000000000000000');
		expect(normalized).toBe('10.123');
	});

	it('removes non-numeric characters from input', () => {
		const {raw, normalized} = handleInputChangeEventValue({value: '10a123b.30', decimals: 18});
		expect(raw.toString()).toBe('10123300000000000000000');
		expect(normalized).toBe('10123.30');
	});

	it('removes excess decimals from input', () => {
		const {raw, normalized} = handleInputChangeEventValue({value: '10.123456', decimals: 18});
		expect(raw.toString()).toBe('10123456000000000000');
		expect(normalized).toBe('10.123456');
	});

	it('returns 0 for empty input', () => {
		const {raw, normalized} = handleInputChangeEventValue({value: '', decimals: 18});
		expect(raw.toString()).toBe('0');
		expect(normalized).toBe('0');
	});

	it('replaces comma with period in input value', () => {
		const {raw, normalized} = handleInputChangeEventValue({value: '10,123', decimals: 18});
		expect(raw.toString()).toBe('10123000000000000000');
		expect(normalized).toBe('10.123');
	});

	it('throws error for invalid input', () => {
		expect(() => handleInputChangeEventValue({value: '10.123.456', decimals: 3})).toThrow('Invalid amount: 10.123.456');
	});
})
