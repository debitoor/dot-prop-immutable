const dotProp = require('../lib');

describe('dot-prop-immutable-number.spec.js', () => {
	describe('when provided one existent object key', () => {
		let actualObject;
		before(() => {
			const inputObject = {
				a: 1,
				b: {
					foo: true
				},
				c: [1, 2],
				'b.x': 10
			};
			actualObject = dotProp.deleteMany(inputObject, ['b']);
		});
		it('should delete the object key', () => {
			expect(actualObject).to.deep.equal({
				a: 1,
				c: [1, 2],
				'b.x': 10
			});
		});
	});
	describe('when provided two existent object key', () => {
		let actualObject;
		before(() => {
			const inputObject = {
				a: 1,
				b: {
					foo: true
				},
				c: [1, 2],
				'b.x': 10
			};
			actualObject = dotProp.deleteMany(inputObject, ['b', 'b.x']);
		});
		it('should delete the object keys', () => {
			expect(actualObject).to.deep.equal({
				a: 1,
				c: [1, 2]
			});
		});
	});
});