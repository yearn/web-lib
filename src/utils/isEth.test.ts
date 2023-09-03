import {ETH_TOKEN_ADDRESS} from './constants';
import {isEth} from './isEth';

describe('isEth function', (): void => {
	it('returns true for ETH_TOKEN_ADDRESS', (): void => {
		expect(isEth(ETH_TOKEN_ADDRESS)).toBe(true);
	});

	it('returns false for null', (): void => {
		expect(isEth(null)).toBe(false);
	});

	it('returns false for undefined', (): void => {
		expect(isEth(undefined)).toBe(false);
	});

	it('returns false for random string', (): void => {
		expect(isEth('random string')).toBe(false);
	});

	it('returns false for random ethereum address', (): void => {
		expect(isEth('0x627306090abab3a6e1400e9345bc60c78a8bef57')).toBe(false);
	});

	it('returns true for the string form of ETH_TOKEN_ADDRESS', (): void => {
		expect(isEth('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')).toBe(true);
	});
});
