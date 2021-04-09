const dotProp = require('../lib');

const obj = {};
const arr = [];

describe('dot-prop-immutable-getMany.spec.js', () => {
	describe('when object', () => {
		describe('when object key exist', () => {
			it('should return expected object', () => {
				const actual = dotProp.getMany(obj, ['']);

				expect(actual).to.deep.equal({

				});
			});
		});
		describe('when object keys exist', () => {
			it('should return expected object', () => {
				const actual = dotProp.getMany(obj, ['']);

				expect(actual).to.deep.equal({

				});
			});
		});
		describe('when object key do not exist', () => {
			it('should return expected object', () => {
				const actual = dotProp.getMany(obj, ['']);

				expect(actual).to.deep.equal(null);
			});
		});
	});
	describe('when array', () => {
		describe('when array index exist', () => {
			it('should return expected object', () => {
				const actual = dotProp.getMany(arr);

				expect(actual).to.deep.equal({
				});
			});
		});
		describe('when array indexes exist', () => {
			it('should return expected object', () => {
				const actual = dotProp.getMany(arr);

				expect(actual).to.deep.equal({
				});
			});
		});
		describe('when array index do not exist', () => {
			it('should return expected object', () => {
				const actual = dotProp.getMany(arr);

				expect(actual).to.deep.equal(null);
			});
		});
	});
});