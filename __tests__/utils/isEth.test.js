import { ETH_TOKEN_ADDRESS, isEth } from "../../src";
describe('isEth function', () => {
    it('returns true for ETH_TOKEN_ADDRESS', () => {
        expect(isEth(ETH_TOKEN_ADDRESS)).toBe(true);
    });
    it('returns false for null', () => {
        expect(isEth(null)).toBe(false);
    });
    it('returns false for undefined', () => {
        expect(isEth(undefined)).toBe(false);
    });
    it('returns false for random string', () => {
        expect(isEth('random string')).toBe(false);
    });
    it('returns false for random ethereum address', () => {
        expect(isEth('0x627306090abab3a6e1400e9345bc60c78a8bef57')).toBe(false);
    });
    it('returns true for the string form of ETH_TOKEN_ADDRESS', () => {
        expect(isEth('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')).toBe(true);
    });
});
