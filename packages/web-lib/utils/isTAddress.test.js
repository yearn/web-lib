import { isTAddress } from './isTAddress';
describe('isTAddress', () => {
    it('should return true for a valid TAddress', () => {
        const tAddress = '0xabcdef0123456789';
        expect(isTAddress(tAddress)).toBe(true);
    });
    it('should return false for an invalid TAddress', () => {
        const tAddress = 'abcdef0123456789';
        expect(isTAddress(tAddress)).toBe(false);
    });
    it('should return false for an empty string', () => {
        expect(isTAddress('')).toBe(false);
    });
    it('should return false for a null value', () => {
        expect(isTAddress(null)).toBe(false);
    });
    it('should return false for an undefined value', () => {
        expect(isTAddress(undefined)).toBe(false);
    });
});
