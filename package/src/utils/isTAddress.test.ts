import {isTAddress} from './isTAddress';

describe('isTAddress', (): void => {
	it('should return true for a valid TAddress', (): void => {
		const tAddress = '0xabcdef0123456789';
		expect(isTAddress(tAddress)).toBe(true);
	});

	it('should return false for an invalid TAddress', (): void => {
		const tAddress = 'abcdef0123456789';
		expect(isTAddress(tAddress)).toBe(false);
	});

	it('should return false for an empty string', (): void => {
		expect(isTAddress('')).toBe(false);
	});

	it('should return false for a null value', (): void => {
		expect(isTAddress(null)).toBe(false);
	});

	it('should return false for an undefined value', (): void => {
		expect(isTAddress(undefined)).toBe(false);
	});
});
