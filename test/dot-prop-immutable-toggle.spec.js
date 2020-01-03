const dotProp = require('../lib');

describe('dot-prop-immutable.toggle.spec.js', () => {

	const arr = [1, { a: false }];

	let result;
	describe('when have an array', () => {

		describe('toggle a value', () => {

			before(() => {
				result = dotProp.toggle(arr, '1.a');
			});


			it('should toggle prop', () => {
				expect(result).to.eql(
					[1, { a: true }]);
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


