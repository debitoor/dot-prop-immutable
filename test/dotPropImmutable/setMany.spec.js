const dotProp = require('../../lib');

describe('setMany.spec.js', () => {
	describe('when an object', () => {

	});
	describe('when an array', () => {
		it('Sets a map of elements', () => {
			expect(dotProp.setMany({ foo: 0, bar: { baz: 1 } }, { foo: 2, 'bar.baz': 3 })).to.eql(
				{ foo: 2, bar: { baz: 3 } }
			);
		});

		it('Sets a map of elements un existent', () => {
			expect(dotProp.setMany({}, { foo: 2, 'bar.baz': 3 })).to.eql(
				{ foo: 2, bar: { baz: 3 } }
			);
		});
	});
});