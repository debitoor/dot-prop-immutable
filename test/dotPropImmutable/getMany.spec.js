const dotProp = require('../../lib');

describe('getMany.spec.js', () => {
	describe('when object', () => {
		describe('when object keys exist', () => {
			it('should return an an array of values', () => {
				const actual = dotProp.getMany(baseObj, ['a', 'b']);

				expect(actual).to.deep.equal([
					1,
					{
						x: 1,
						y: 2
					}
				]);
			});
		});
		describe('when empty object', () => {
			it('should return an array of undefined values', () => {
				const actual = dotProp.getMany({}, ['a', 'b']);

				expect(actual).to.deep.equal([
					undefined,
					undefined
				]);
			});
		});
		describe('when object key do not exist', () => {
			it('should return an array of undefined value', () => {
				const actual = dotProp.getMany(baseObj, ['foo']);

				expect(actual).to.deep.equal([undefined]);
			});
		});
	});
	describe('when array', () => {
		describe('when array[index] exist', () => {
			it('should return expected', () => {
				const actual = dotProp.getMany(baseArr, ['1.a']);

				expect(actual).to.deep.equal([false]);
			});
		});
		describe('when two array[index] exists', () => {
			it('should return expected', () => {
				const actual = dotProp.getMany(baseArr, ['1.a', '2.b']);

				expect(actual).to.deep.equal([false, true]);
			});
		});
		describe('when array index do not exist', () => {
			it('should return expected', () => {
				const actual = dotProp.getMany(baseArr, ['10']);

				expect(actual).to.deep.equal([undefined]);
			});
		});
	});
});