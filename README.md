# dot-prop-immutable

Immutable version of dot-prop with some extensions. The immutable part is inspired by React Immutability Helpers.

	npm install dot-prop-immutable

In this implementation the setter does not mutate the input object but returns a new object.
For efficiency the returned object is not a deep clone of the original, but a shallow copy of the objects in the mutated patch and will reuse the rest.


## Usage

```javascript
var dotProp = require('dot-prop-immutable');

// Getter
dotProp.get({foo: {bar: 'unicorn'}}, 'foo.bar')
//=> 'unicorn'

dotProp.get({foo: {bar: 'a'}}, 'foo.notDefined.deep')
//=> undefined

dotProp.get({foo: {'dot.dot': 'unicorn'}}, 'foo.dot\\.dot')
//=> 'unicorn'


// Index into array
dotProp.get({foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']}, 'foo.1')
//=> 'white-unicorn'

dotProp.get({foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']}, 'foo.0.bar')
//=> 'gold-unicorn'

dotProp.get([{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn'], '0.bar')
//=> 'gold-unicorn'

// Index into array with $end
dotProp.get({foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']}, 'foo.$end')
//=> 'silver-unicorn'


// Setter
var obj = {foo: {bar: 'a'}};

var obj1 = dotProp.set(obj, 'foo.bar', 'b');
//obj1 => {foo: {bar: 'b'}}

var obj2 = dotProp.set(obj1 , 'foo.baz', 'x');
//obj2 => {foo: {bar: 'b', baz: 'x'}}

var obj3 = dotProp.set({foo: {bar: 'b', baz: 'x'}}, 'foo.dot\\.dot', 'unicorn');
//obj3 => {foo: {bar: 'a', baz: 'x', 'dot.dot': 'unicorn'}}

// where obj, obj1, obj2, obj3 all are different objects.


// Setter where value is a function (get and set current value)
dotProp.set(obj, 'foo.bar', v => v + 'bc')
//=> {foo: {bar: 'abc'}}


// Index into array
dotProp.set({foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']}, 'foo.1', 'platin-unicorn') <--- does not work
//=> {foo: [{ bar: 'gold-unicorn'}, 'platin-unicorn', 'silver-unicorn']}

dotProp.set({foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']}, 'foo.0.bar', 'platin-unicorn')
//=> {foo: [{ bar: 'platin-unicorn'}, 'white-unicorn', 'silver-unicorn']}

dotProp.set([{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn'], '0.bar', 'platin-unicorn')
//=> [{ bar: 'platin-unicorn'}, 'white-unicorn', 'silver-unicorn']

// Index into array with $end
dotProp.set({foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']}, 'foo.$end', 'platin-unicorn')
//=> {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'platin-unicorn']}

```

## License

[MIT](http://opensource.org/licenses/MIT)
