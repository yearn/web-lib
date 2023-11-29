import {describe, expect, it} from 'bun:test';

import {cl} from './cl.js';

describe('cl', (): void => {
	it('returns an empty string when no arguments are passed', (): void => {
		expect(cl()).toEqual('');
	});

	it('returns a single class name when one argument is passed', (): void => {
		expect(cl('my-class')).toEqual('my-class');
	});

	it('returns multiple class names when multiple arguments are passed', (): void => {
		expect(cl('my-class', 'another-class')).toEqual('my-class another-class');
	});

	it('ignores falsy arguments', (): void => {
		expect(cl('my-class', null, undefined, '', 'another-class')).toEqual('my-class another-class');
	});
});
