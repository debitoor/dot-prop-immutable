const dotProp = require('../lib');

describe('dot-prop-immutable.spec.js', () => {

	var obj = {
		a: 1,
		b: {
			x: 1,
			y: 2
		},
		c: [1, 2],
		'b.x': 10
	};

	var arr = [1, { a: false }];

	var arrWithUndefined = [1, undefined, 4];

	var result;

	describe('when set', () => {

		describe('when have an object', () => {

			describe('when set prop', () => {

				before(() => {
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

			describe('when set prop empty object', () => {

				before(() => {
					result = dotProp.set({}, 'b', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						b: 3
					});
				});
			});

			describe('when set prop empty path', () => {

				before(() => {
					result = dotProp.set({}, '', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						'': 3
					});
				});
			});

			describe('when set prop with function', () => {

				before(() => {
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

				before(() => {
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

				before(() => {
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

				before(() => {
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

				before(() => {
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

				before(() => {
					result = dotProp.set(obj, 'c.1.z.w', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2
						},
						c: [1, { z: { w: 3 } }],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when set array[index] out of index', () => {

				before(() => {
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

				before(() => {
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

			describe('when set array[index] and index not integer', () => {
				var error;

				before(() => {
					try {
						dotProp.set(obj, 'c.w', 3);
					} catch (err) {
						error = err;
					}
				});

				it('should throw an error', () => {
					expect(error.message).to.eql('Array index \'w\' has to be an integer');
				});

				it('invariant', objInvariant);
			});
		});

		describe('when have an array', () => {

			describe('when set array[index]', () => {

				before(() => {
					result = dotProp.set(arr, '0', 3);
				});

				it('should replace prop', () => {
					expect(result).to.eql(
						[3, { a: false }]
					);
				});

				it('invariant', arrInvariant);
			});

			describe('when set array[index] deep prop', () => {

				before(() => {
					result = dotProp.set(arr, '1.a', v => !v);
				});

				it('should replace prop', () => {
					expect(result).to.eql(
						[1, { a: true }]
					);
				});

				it('invariant', arrInvariant);
			});
		});
	});

	describe('when get', () => {

		describe('when have an object', () => {

			describe('when get prop', () => {

				it('should get prop', () => {
					expect(dotProp.get(obj, 'b')).to.eql({ x: 1, y: 2 });
				});
				it('should get prop default', () => {
					expect(dotProp.get(obj, 'd', 'default')).to.eql('default');
				});
			});

			describe('when get prop empty object', () => {

				it('should get prop', () => {
					expect(dotProp.get({}, 'b')).to.equal(undefined);
				});
				it('should get prop default', () => {
					expect(dotProp.get({}, 'b', 'default')).to.equal('default');
				});
			});

			describe('when get prop empty path', () => {

				it('should get prop', () => {
					expect(dotProp.get(obj, '')).to.equal(undefined);
				});
				it('should get prop default', () => {
					expect(dotProp.get(obj, '', 'default')).to.equal('default');
				});
			});

			describe('when get deep prop', () => {

				it('should get prop', () => {
					expect(dotProp.get(obj, 'b.x')).to.equal(1);
				});
				it('should get prop default', () => {
					expect(dotProp.get(obj, 'b.z', 'default')).to.equal('default');
				});
			});

			describe('when get dotted prop', () => {

				it('should get prop', () => {
					expect(dotProp.get(obj, 'b\\.x')).to.equal(10);
				});
				it('should get prop default', () => {
					expect(dotProp.get(obj, 'b\\.y', 'default')).to.equal('default');
				});
			});

			describe('when get deep prop not defined', () => {

				it('should return undefined', () => {
					expect(dotProp.get(obj, 'b.z.w')).to.equal(undefined);
				});

				it('should return the default value', () => {
					expect(dotProp.get(obj, 'b.z.w', 'something')).to.equal('something');
				});
			});

			describe('when get intermediate deep prop is null', () => {

				it('should return default value', () => {
					expect(dotProp.get({ b: { z: null } }, 'b.z.w')).to.equal(undefined);
					expect(dotProp.get({ b: { z: null } }, 'b.z.w', 'default')).to.equal('default');
				});
			});

			describe('when get array[index]', () => {

				it('should get index', () => {
					expect(dotProp.get(obj, 'c.0')).to.equal(1);
				});
				it('should get index default', () => {
					expect(dotProp.get(obj, 'c.2', 'default')).to.equal('default');
				});
			});

			describe('when get array[index] prop not defined', () => {

				it('should return undefined', () => {
					expect(dotProp.get(obj, 'c.1.z.w')).to.equal(undefined);
				});
				it('should return default', () => {
					expect(dotProp.get(obj, 'c.1.z.w', 'default')).to.equal('default');
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
				it('should return default', () => {
					expect(dotProp.get(obj, 'c.w', 'default')).to.equal('default');
				});
			});
		});

		describe('when have an array', () => {

			describe('when get array[index]', () => {

				it('should get index', () => {
					expect(dotProp.get(arr, '0')).to.equal(1);
				});
				it('should return default when index not present', () => {
					expect(dotProp.get(arr, '2', 'default')).to.equal('default');
				});
			});

			describe('when get array[index] deep prop', () => {

				it('should replace prop', () => {
					expect(dotProp.get(arr, '1.a')).to.equal(false);
				});
				it('should return default when not present', () => {
					expect(dotProp.get(arr, '1.b', 'default')).to.equal('default');
				});
			});

		});
	});

	describe('when delete', () => {

		describe('when have an object', () => {

			describe('when delete prop', () => {

				before(() => {
					result = dotProp.delete(obj, 'b');
				});

				it('should  prop', () => {
					expect(result).to.eql({
						a: 1,
						c: [1, 2],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when delete prop empty object', () => {

				before(() => {
					result = dotProp.delete({}, 'b');
				});

				it('should delete prop', () => {
					expect(result).to.eql({});
				});
			});

			describe('when delete prop empty path', () => {

				before(() => {
					result = dotProp.delete({}, '');
				});

				it('should delete prop', () => { });
			});

			describe('when delete deep prop', () => {

				before(() => {
					result = dotProp.delete(obj, 'b.x');
				});

				it('should delete prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							y: 2
						},
						c: [1, 2],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when delete deep prop not defined', () => {

				before(() => {
					result = dotProp.delete(obj, 'b.z.w');
				});

				it('should delete prop', () => {
					expect(result).to.eql({
						a: 1,
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

			describe('when delete deep prop is null', () => {

				before(() => {
					result = dotProp.delete({ b: { z: null } }, 'b.z.w');
				});

				it('should delete prop', () => {
					expect(result).to.eql({ b: { z: null } });
				});
			});

			describe('when delete array[index]', () => {

				before(() => {
					result = dotProp.delete(obj, 'c.0');
				});

				it('should delete prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2
						},
						c: [2],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when delete array[index] with function', () => {

				before(() => {
					result = dotProp.set(obj, 'c.0', v => v * 3);
				});

				it('should delete prop', () => {
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

			describe('when delete array[index] prop not defined', () => {

				before(() => {
					result = dotProp.delete(obj, 'c.1.z.w');
				});

				it('should delete prop', () => {
					expect(result).to.eql({
						a: 1,
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

			describe('when delete array[index] out of index', () => {

				before(() => {
					result = dotProp.delete(obj, 'c.3');
				});

				it('should delete prop', () => {
					expect(result).to.eql({
						a: 1,
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

			describe('when delete array[$end]', () => {

				before(() => {
					result = dotProp.delete(obj, 'c.$end');
				});

				it('should delete prop', () => {
					expect(result).to.eql({
						a: 1,
						b: {
							x: 1,
							y: 2
						},
						c: [1],
						'b.x': 10
					});
				});

				it('invariant', objInvariant);
			});

			describe('when delete array[index] and index not integer', () => {
				var error;

				before(() => {
					try {
						dotProp.delete(obj, 'c.w');
					} catch (err) {
						error = err;
					}
				});

				it('should throw an error', () => {
					expect(error.message).to.eql('Array index \'w\' has to be an integer');
				});

				it('invariant', objInvariant);
			});
		});

		describe('when have an array', () => {

			describe('when delete array[index]', () => {

				before(() => {
					result = dotProp.delete(arr, '0');
				});

				it('should delete prop', () => {
					expect(result).to.eql(
						[{ a: false }]
					);
				});

				it('invariant', arrInvariant);
			});

			describe('when delete array[index] deep prop', () => {

				before(() => {
					result = dotProp.delete(arr, '1.a');
				});

				it('should delete prop', () => {
					expect(result).to.eql(
						[1, {}]
					);
				});

				it('invariant', arrInvariant);
			});

			describe('when delete array[index] which element is undefined', () => {

				before(() => {
					result = dotProp.delete(arrWithUndefined, '1');
				});

				it('should delete the element', () => {
					expect(result).to.eql(
						[1, 4]
					);
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
			[1, { a: false }]
		);
	}
});


