const dotProp = require('../../lib');

describe('deleteMany.spec.js', () => {
	describe('when provided one existent object key', () => {
		it('should delete the object key', () => {
			const actual = dotProp.deleteMany(baseObj, ['b']);

			expect(actual).to.deep.equal({
				a: 1,
				c: [1, 2],
				'b.x': 10
			});
		});
	});
	describe('when provided two existent object keys', () => {
		it('should delete the object keys', () => {
			const actual = dotProp.deleteMany(baseObj, ['a', 'b.x']);

			expect(actual).to.deep.equal({
				c: [1, 2],
				b: { y: 2 },
				'b.x': 10
			});
		});
	});
	describe('when provided two non-existent object keys', () => {
		it('should delete the object keys', () => {
			const actual = dotProp.deleteMany(baseObj, ['foo', 'bar']);

			expect(actual).to.deep.equal({
				a: 1,
				c: [1, 2],
				b: { x: 1, y: 2 },
				'b.x': 10
			});
		});
	});
});