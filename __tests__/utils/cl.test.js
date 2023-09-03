import { cl } from '../../src/utils/cl';
describe('cl', () => {
    it('returns an empty string when no arguments are passed', () => {
        expect(cl()).toEqual('');
    });
    it('returns a single class name when one argument is passed', () => {
        expect(cl('my-class')).toEqual('my-class');
    });
    it('returns multiple class names when multiple arguments are passed', () => {
        expect(cl('my-class', 'another-class')).toEqual('my-class another-class');
    });
    it('ignores falsy arguments', () => {
        expect(cl('my-class', null, undefined, '', 'another-class')).toEqual('my-class another-class');
    });
});
