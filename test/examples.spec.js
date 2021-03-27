const dotProp = require('../lib');

describe('examples.spec.js', () => {

	describe('when get', () => {

		it('prop', () => {
			expect(dotProp.get({ foo: { bar: 'unicorn' } }, 'foo.bar')).to.eql('unicorn');
		});

		it('prop undefined', () => {
			expect(dotProp.get({ foo: { bar: 'a' } }, 'foo.notDefined.deep')).to.eql(undefined);
		});

		it('prop with dot', () => {
			expect(dotProp.get({ foo: { 'dot.dot': 'unicorn' } }, 'foo.dot\\.dot')).to.eql('unicorn');
		});

		it('use an array as get path', () => {
			expect(dotProp.get({ foo: { 'dot.dot': 'unicorn' } }, ['foo', 'dot.dot'])).to.eql('unicorn');
		});

		it('index', () => {
			expect(dotProp.get({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.1')).to.eql('white-unicorn');
		});

		it('index deep', () => {
			expect(dotProp.get({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.0.bar')).to.eql('gold-unicorn');
		});

		it('array index', () => {
			expect(dotProp.get([{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'], '0.bar')).to.eql('gold-unicorn');
		});

		it('prop as number', () => {
			expect(dotProp.get([{ foo: 'silver-unicorn' }], 0)).to.eql({ foo: 'silver-unicorn' });
		});

		it('index $end', () => {
			expect(dotProp.get({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.$end')).to.eql('silver-unicorn');
			expect(dotProp.get({ foo: [] }, 'foo.$end')).to.eql(undefined);
			expect(dotProp.set({ foo: [] }, 'foo.$end', 'bar')).to.eql({ foo: ['bar'] });
		});
	});

	describe('when set', () => {
		const obj = { foo: { bar: 'a' } };
		let obj1, obj2, obj3;

		describe('when prop', () => {

			before(() => {
				obj1 = dotProp.set(obj, 'foo.bar', 'b');
			});

			it('obj1', () => {
				expect(obj1).to.eql({ foo: { bar: 'b' } });
			});

			describe('when prop undefined', () => {

				before(() => {
					obj2 = dotProp.set(obj1, 'foo.baz', 'x');
				});

				it('obj2', () => {
					expect(obj2).to.eql({ foo: { bar: 'b', baz: 'x' } });
				});

				describe('when prop undefined', () => {

					before(() => {
						obj3 = dotProp.set(obj2, 'foo.dot\\.dot', 'unicorn');
					});

					it('obj3', () => {
						expect(obj3).to.eql({ foo: { bar: 'b', baz: 'x', 'dot.dot': 'unicorn' } });
					});

					it('obj !== obj1', () => {
						expect(obj).to.not.eql(obj1);
					});

					it('obj1 !== obj2', () => {
						expect(obj1).to.not.eql(obj2);
					});

					it('obj2 !== obj3', () => {
						expect(obj2).to.not.eql(obj3);
					});
				});
			});
		});

		it('Use an array as set path', () => {
			expect(dotProp.set({ foo: { bar: 'b', baz: 'x' } }, ['foo', 'dot.dot'], 'unicorn')).to.eql(
				{ foo: { bar: 'b', baz: 'x', 'dot.dot': 'unicorn' } }
			);
		});

		it('Setter where value is a function', () => {
			expect(dotProp.set(obj, 'foo.bar', v => v + 'bc')).to.eql(
				{ foo: { bar: 'abc' } }
			);
		});

		it('Index into array', () => {
			expect(dotProp.set({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.1', 'platin-unicorn')).to.eql(
				{ foo: [{ bar: 'gold-unicorn' }, 'platin-unicorn', 'silver-unicorn'] }
			);
		});

		it('Index into array deep', () => {
			expect(dotProp.set({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.0.bar', 'platin-unicorn')).to.eql(
				{ foo: [{ bar: 'platin-unicorn' }, 'white-unicorn', 'silver-unicorn'] }
			);
		});

		it('Array', () => {
			expect(dotProp.set([{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'], '0.bar', 'platin-unicorn')).to.eql(
				[{ bar: 'platin-unicorn' }, 'white-unicorn', 'silver-unicorn']
			);
		});

		it('Index into array', () => {
			expect(dotProp.set({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.$end', 'platin-unicorn')).to.eql(
				{ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'platin-unicorn'] }
			);
		});
	});

	describe('when setMany', function() {

		it('Sets a map of elements', function() {
			expect(dotProp.setMany({ foo: 0, bar: { baz: 1 } }, { foo: 2, 'bar.baz': 3 })).to.eql(
				{ foo: 2, bar: { baz: 3 } }
			);
		});

		it('Sets a map of elements un existent', function() {
			expect(dotProp.setMany({}, { foo: 2, 'bar.baz': 3 })).to.eql(
				{ foo: 2, bar: { baz: 3 } }
			);
		});
	});

	describe('when delete', () => {

		it('Array element by index', () => {
			expect(dotProp.delete({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.1')).to.eql(
				{ foo: [{ bar: 'gold-unicorn' }, 'silver-unicorn'] }
			);
		});

		it('Array element by $end', () => {
			expect(dotProp.delete({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.$end')).to.eql(
				{ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn'] }
			);
		});

		it('Out of array', () => {
			expect(dotProp.delete({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.10')).to.eql(
				{ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }
			);
		});

		it('Array indexed by a property', () => {
			try {
				dotProp.delete({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.bar');
			} catch (err) {
				expect(err.message).to.equal('Array index \'bar\' has to be an integer');
				expect(err).to.be.an('error');
			}
		});

		it('Deep prop', () => {
			expect(dotProp.delete({ foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] }, 'foo.0.bar')).to.eql(
				{ foo: [{}, 'white-unicorn', 'silver-unicorn'] }
			);
		});
	});
});
