var dotProp = require('..');

describe('dot-prop-immutable.merge.spec.js', function () {
	
	var obj = {
		a: 1,
		b: {
			x: 1,
			y: 2
		},
		c: [1, 2],
		d: null,
		'b.x': 10
	};
    
	var arr = [1, {a: [1, 2]}];

	var result;
	describe('when have an object', () => {

		describe('merge an object value into object', () => {

			before(function () {
				result = dotProp.merge(obj, 'b', {z: 3});
			});
		
			it('should merge prop', () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2,
						z: 3
					},
					c: [1, 2],
					d: null,
					'b.x': 10
				});
			});
			
			it('invariant', objInvariant);
        
		});

		describe('merge an array value into array', () => {

			before(function () {
				result = dotProp.merge(obj, 'c', [3, 4]);
			});

			it('should merge prop', () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: [1, 2, 3, 4],
					d: null,
					'b.x': 10
				});
			});

			it('invariant', objInvariant);

		});


		describe('merge an array value into array with index', () => {

			before(function () {
				result = dotProp.merge(obj, 'c', [3, 4], {index: 1});
			});

			it('should merge prop', () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: [1, 3, 4, 2],
					d: null,
					'b.x': 10
				});
			});

			it('invariant', objInvariant);

		});

		describe('merge an array value into array with index at end', () => {

			before(function () {
				result = dotProp.merge(obj, 'c', [3, 4], {index: 2});
			});

			it('should merge prop', () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: [1, 2, 3, 4],
					d: null,
					'b.x': 10
				});
			});

			it('invariant', objInvariant);

		});

		describe('merge an array value into array with index out of bounds', () => {

			before(function () {
				result = dotProp.merge(obj, 'c', [3, 4], {index: 3});
			});

			it('should merge prop', () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: [1, 2],
					d: null,
					'b.x': 10
				});
			});

			it('invariant', objInvariant);

		});

		describe('merge an object value into null', () => {

			before(function () {
				result = dotProp.merge(obj, 'd', {foo: 'bar'});
			});

			it('should merge prop', () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: [1, 2],
					d: {foo: 'bar'},
					'b.x': 10
				});
			});

			it('invariant', objInvariant);

		});

		describe('merge an object value into undefined', () => {

			before(function () {
				result = dotProp.merge(obj, 'z', {foo: 'bar'});
			});

			it('should merge prop', () => {
				expect(result).to.eql({
					a: 1,
					b: {
						x: 1,
						y: 2
					},
					c: [1, 2],
					d: null,
					z: {foo: 'bar'},
					'b.x': 10
				});
			});

			it('invariant', objInvariant);

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
			d: null,
			'b.x': 10
		});
	}

	function arrInvariant() {
		expect(arr).to.eql(
			[1, {a: [1, 2]}]
		);
	}
});


