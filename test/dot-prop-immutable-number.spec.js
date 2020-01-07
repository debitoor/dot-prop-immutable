const dotProp = require('../lib');

describe('dot-prop-immutable.number.spec.js', () => {

	const arr = [1, { a: false }];

	let result;
	describe('when have an array', () => {

		describe('when set prop using number as path', () => {

			before(() => {
				result = dotProp.set(arr, 1, 3);
			});

			it('should replace prop', () => {
				expect(result).to.eql([
					1,
					3
				]);
			});

			it('invariant', arrInvariant);
		});


		describe('when get prop using number as path', () => {

			before(() => {
				result = dotProp.get(arr, 1);
			});

			it('should get prop', () => {
				expect(result).to.eql({ a: false });
			});

			it('invariant', arrInvariant);
		});

		describe('when delete prop using number as path', () => {

			before(() => {
				result = dotProp.delete(arr, 1);
			});

			it('should delete prop', () => {
				expect(result).to.eql([
					1
				]);
			});
			it('invariant', arrInvariant);
		});
	});

	function arrInvariant() {
		expect(arr).to.eql(
			[1, { a: false }]
		);
	}
});


