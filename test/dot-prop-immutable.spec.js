var dotProp = require('..');

describe('dot-prop-immutable.spec.js', function() {

	var obj = {
		a: 1,
		b: {
			x: 1,
			y: 2
		},
		c: [1, 2]
	};

	var arr = [1, { b: 2}];

	var result;

	describe('when have an object', () => {

		describe('when set prop', () => {

			before(function() {
				result = dotProp.set(obj, 'b', 3);
			});

			it('should replace prop', () => {
				expect(result).to.eql({
					a: 1,
					b: 3,
					c: [1, 2]
				});
			});

			it('invariant', objInvariant);
		});

		describe('when set prop with function', () => {

			before(function() {
				result = dotProp.set(obj, 'a', v => v + 1);
			});

			it('should replace prop', () => {
				expect(result).to.eql({
					a: 2,
					b: {
						x: 1,
						y: 2
					},
					c: [1, 2]
				});
			});

			it('invariant', objInvariant);
		});

		describe('when set deep prop', () => {

			before(function() {
				result = dotProp.set(obj, 'b.x', 3);
			});

			it('should replace prop',  () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 3,
						y: 2
					},
					c: [1, 2]
				});
			});

			it('invariant', objInvariant);
		});

		describe('when set deep prop not defined', () => {

			before(function() {
				result = dotProp.set(obj, 'b.z.w', 3);
			});

			it('should replace prop',  () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2,
						z: {
							w: 3
						}
					},
					c: [1, 2]
				});
			});

			it('invariant', objInvariant);
		});

		describe('when set array[index]', () => {

			before(function() {
				result = dotProp.set(obj, 'c.0', 3);
			});

			it('should replace prop',  () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: [3, 2]
				});
			});

			it('invariant', objInvariant);
		});

		describe('when set array[index] with function', () => {

			before(function() {
				result = dotProp.set(obj, 'c.0', v => v * 3);
			});

			it('should replace prop',  () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: [3, 2]
				});
			});

			it('invariant', objInvariant);
		});

		describe('when set array[index] prop not defined', () => {

			before(function() {
				result = dotProp.set(obj, 'c.1.z.w', 3);
			});

			it('should replace prop',  () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: [1, { z: { w: 3}}]
				});
			});

			it('invariant', objInvariant);
		});

		describe('when set array[index] out of index', () => {

			before(function() {
				result = dotProp.set(obj, 'c.3', 3);
			});

			it('should replace prop',  () => {
				var c = [1, 2];
				c[3] = 3;
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: c
				});
			});

			it('invariant', objInvariant);
		});

		describe('when set prop on array', () => {

			before(function() {
				result = dotProp.set(obj, 'c.w', 3);
			});

			it('should replace prop',  () => {
				var c = [1, 2];
				c.w = 3;
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: c
				});
			});

			it('invariant', objInvariant);
		});
	});

	describe('when set array[index]', () => {

		before(function() {
			result = dotProp.set(arr, '0', 3);
		});

		it('should replace prop', () => {
			expect(result).to.eql(
				[3, { b: 2}]
			);
		});

		it('invariant', arrInvariant);
	});

	describe('when set array[index] deep prop', () => {

		before(function() {
			result = dotProp.set(arr, '1.b', 3);
		});

		it('should replace prop', () => {
			expect(result).to.eql(
				[1, { b: 3}]
			);
		});

		it('invariant', arrInvariant);
	});

	function objInvariant() {
		expect(obj).to.eql({
			a: 1,
			b: {
				x: 1,
				y: 2
			},
			c: [1, 2]
		});
	}

	function arrInvariant() {
		expect(arr).to.eql(
			[1, { b: 2}]
		);
	}
});


