var dotProp = require('..');

describe('dot-prop-immutable.spec.js', function() {

	var obj = {
		a: 1,
		b: {
			x: 1,
			y: 2
		},
		c: [1, 2],
		'b.x': 10
	};

	var arr = [1, { b: 2}];

	var result;

	describe('when set', function() {

		describe('when have an object', () => {

			describe('when set prop', () => {

				before(function () {
					result = dotProp.set(obj, 'b', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						a: 1,
						b: 3,
						c: [1, 2],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set prop with function', () => {

				before(function () {
					result = dotProp.set(obj, 'a', v => v + 1);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						a: 2,
						b: {
							x: 1,
							y: 2
						},
						c: [1, 2],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set deep prop', () => {

				before(function () {
					result = dotProp.set(obj, 'b.x', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							x: 3,
							y: 2
						},
						c: [1, 2],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set deep prop not defined', () => {

				before(function () {
					result = dotProp.set(obj, 'b.z.w', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2,
							z: {
								w: 3
							}
						},
						c: [1, 2],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set array[index]', () => {

				before(function () {
					result = dotProp.set(obj, 'c.0', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2
						},
						c: [3, 2],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set array[index] with function', () => {

				before(function () {
					result = dotProp.set(obj, 'c.0', v => v * 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2
						},
						c: [3, 2],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set array[index] prop not defined', () => {

				before(function () {
					result = dotProp.set(obj, 'c.1.z.w', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2
						},
						c: [1, {z: {w: 3}}],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set array[index] out of index', () => {

				before(function () {
					result = dotProp.set(obj, 'c.3', 3);
				});

				it('should replace prop', () => {
					var c = [1, 2];
					c[3] = 3;
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2
						},
						c: c,
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set array[$end]', () => {

				before(function () {
					result = dotProp.set(obj, 'c.$end', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2
						},
						c: [1, 3],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set prop on array', () => {

				before(function () {
					result = dotProp.set(obj, 'c.w', 3);
				});

				it('should replace prop', () => {
					var c = [1, 2];
					c.w = 3;
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2
						},
						c: c,
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});
		});

		describe('when have an array', () => {

			describe('when set array[index]', () => {

				before(function () {
					result = dotProp.set(arr, '0', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql(
						[3, {b: 2}]
					);
				});

				it('invariant', arrInvariant);
			});

			describe('when set array[index] deep prop', () => {

				before(function () {
					result = dotProp.set(arr, '1.b', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql(
						[1, {b: 3}]
					);
				});

				it('invariant', arrInvariant);
			});

		});
	});

	describe('when get', function() {

		describe('when have an object', () => {

			describe('when get prop', () => {

				it('should get prop', () => {
					expect(dotProp.get(obj, 'b')).to.eql({ x: 1, y: 2 });
				});
			});

			describe('when get deep prop', () => {

				it('should get prop', () => {
					expect(dotProp.get(obj, 'b.x')).to.equal(1);
				});
			});

			describe('when get dotted prop', () => {

				it('should get prop', () => {
					expect(dotProp.get(obj, 'b\\.x')).to.equal(10);
				});
			});

			describe('when get deep prop not defined', () => {

				it('should return undefined', () => {
					expect(dotProp.get(obj, 'b.z.w')).to.equal(undefined);
				});
			});

			describe('when get array[index]', () => {

				it('should get index', () => {
					expect(dotProp.get(obj, 'c.0')).to.equal(1);
				});
			});

			describe('when get array[index] prop not defined', () => {

				it('should return undefined', () => {
					expect(dotProp.get(obj, 'c.1.z.w')).to.equal(undefined);
				});
			});

			describe('when get array[index] out of index', () => {

				it('should return undefined', () => {
					expect(dotProp.get(obj, 'c.3')).to.equal(undefined);
				});
			});

			describe('when get array[$end]', () => {

				it('should get end index', () => {
					expect(dotProp.get(obj, 'c.$end')).to.equal(2);
				});
			});

			describe('when get undefined prop on array', () => {

				it('should return undefined', () => {
					expect(dotProp.get(obj, 'c.w')).to.equal(undefined);
				});
			});
		});

		describe('when have an array', () => {

			describe('when get array[index]', () => {

				it('should get index', () => {
					expect(dotProp.get(arr, '0')).to.equal(1);
				});
			});

			describe('when get array[index] deep prop', () => {

				it('should replace prop', () => {
					expect(dotProp.get(arr, '1.b')).to.equal(2);
				});
			});

		});
	});

	function objInvariant() {
		expect(obj).to.eql({
			a: 1,
			b: {
				x: 1,
				y: 2
			},
			c: [1, 2],
			'b.x': 10
		});
	}

	function arrInvariant() {
		expect(arr).to.eql(
			[1, {b: 2}]
		);
	}
});


