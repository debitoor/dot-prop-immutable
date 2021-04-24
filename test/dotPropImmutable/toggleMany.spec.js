const { toggleMany } = require('../../lib');

describe.only('toggleMany.spec.js', () => {
	describe('when have an object', () => {
		describe('when ', () => {

		});
	});
	describe('when have an array', () => {
		describe('when array indexes exist', () => {
			it('should return expected', () => {
				const actual = toggleMany(baseArr, ['1.a', '2.b']);

				expect(actual).to.deep.equal([
					1,
					{ a: true },
					{ b: false }
				]);
			});
		});
		// TODO bug here - adding unexpected empty values and "true" to result array
		describe.skip('when array indexes dont exist', () => {
			it('should return expected', () => {
				const actual = toggleMany(baseArr, ['10']);

				expect(actual).to.deep.equal([
					1,
					{ a: false },
					{ b: true }
				]);
			});
		});
	});
});