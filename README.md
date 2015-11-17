# dot-prop-immutable [![Build Status](https://travis-ci.org/debitoor/dot-prop-immutable.svg)](https://travis-ci.org/debitoor/dot-prop-immutable)

Immutable version of dot-prop with some extensions. The immutable part is inspired by React Immutability Helpers.

	npm install dot-prop-immutable

In this implementation the setter does not mutate the input object but returns a new object.
For efficiency the returned object is not a deep clone of the original, but a shallow copy of the objects in the mutated path.


## Usage

Access a nested property by a dot path

```javascript
var dotProp = require('dot-prop-immutable');

// Getter
dotProp.get({foo: {bar: 'unicorn'}}, 'foo.bar')
//=> 'unicorn'

dotProp.get({foo: {bar: 'a'}}, 'foo.notDefined.deep')
//=> undefined

dotProp.get({foo: {'dot.dot': 'unicorn'}}, 'foo.dot\\.dot')
//=> 'unicorn'
```


or use a property array as a path.

```javascript
// Use an array as get path
dotProp.get({foo: {'dot.dot': 'unicorn'}}, ['foo', 'dot.dot'])
//=> 'unicorn'
```


It is also possible to index into array where the special index `$end` refers to the last element of the array.

```javascript
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
```


Modify a nested property by a dot path

```javascript
// Setter
var obj = {foo: {bar: 'a'}};

var obj1 = dotProp.set(obj, 'foo.bar', 'b');
//obj1 => {foo: {bar: 'b'}}

var obj2 = dotProp.set(obj1 , 'foo.baz', 'x');
//obj2 => {foo: {bar: 'b', baz: 'x'}}

var obj3 = dotProp.set({foo: {bar: 'b', baz: 'x'}}, 'foo.dot\\.dot', 'unicorn');
//obj3 => {foo: {bar: 'b', baz: 'x', 'dot.dot': 'unicorn'}}
```

where `obj`, `obj1`, `obj2`, `obj3` all are different objects.

```javascript
// Use an array as set path
dotProp.set({foo: {bar: 'b', baz: 'x'}}, ['foo', 'dot.dot'], 'unicorn')
//=> {foo: {bar: 'b', baz: 'x', 'dot.dot': 'unicorn'}}
```


Use a function to modify the selected property, where first argument is the old value.

```javascript
// Setter where value is a function (get and set current value)
dotProp.set({foo: {bar: 'a'}}, 'foo.bar', v => v + 'bc')
//=> {foo: {bar: 'abc'}}
```


Modidify a nested array

```javascript
// Index into array
dotProp.set({foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']}, 'foo.1', 'platin-unicorn')
//=> {foo: [{bar: 'gold-unicorn'}, 'platin-unicorn', 'silver-unicorn']}

dotProp.set({foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']}, 'foo.0.bar', 'platin-unicorn')
//=> {foo: [{bar: 'platin-unicorn'}, 'white-unicorn', 'silver-unicorn']}

dotProp.set([{bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn'], '0.bar', 'platin-unicorn')
//=> [{bar: 'platin-unicorn'}, 'white-unicorn', 'silver-unicorn']

// Index into array with $end
dotProp.set({foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']}, 'foo.$end', 'platin-unicorn')
//=> {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'platin-unicorn']}

```

## License

[MIT](http://opensource.org/licenses/MIT)
