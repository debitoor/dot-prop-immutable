'use strict';

module.exports.set = function(obj, prop, value) {
	prop = typeof prop === 'string' ? propToArray(prop) : prop;

	var setPropImmutableRec = function(obj, prop, value, i) {
		var clone, head = prop[i];

		if (prop.length > i) {
			if (Array.isArray(obj)) {
				head = getArrayIndex(head, obj);
				clone = obj.slice();
			} else {
				clone = Object.assign({}, obj);
			}
			clone[head] = setPropImmutableRec(obj[head] !== undefined ? obj[head] : {}, prop, value, i + 1);
			return clone;
		}

		return typeof value === 'function' ? value(obj) : value;
	};

	return setPropImmutableRec(obj, prop, value, 0);
};

module.exports.get = function(obj, prop) {
	prop = typeof prop === 'string' ? propToArray(prop) : prop;

	for (var i = 0; i < prop.length; i++) {
		if (typeof obj !== 'object') {
			return undefined;
		}
		var head = prop[i];
		if (Array.isArray(obj) && head === '$end') {
			head = obj.length - 1;
		}
		obj = obj[head];
	}

	return obj;
};

module.exports.delete = function(obj, prop) {
	prop = typeof prop === 'string' ? propToArray(prop) : prop;

	var deletePropImmutableRec = function(obj, prop, i) {
		var clone, head = prop[i];

		if (typeof obj !== 'object' ||
			!Array.isArray(obj) && obj[head] === undefined ||
			Array.isArray(obj) && obj[getArrayIndex(head, obj)] === undefined) {

			return obj;
		}

		if (prop.length - 1 > i) {
			if (Array.isArray(obj)) {
				head = getArrayIndex(head, obj);
				clone = obj.slice();
			} else {
				clone = Object.assign({}, obj);
			}

			clone[head] = deletePropImmutableRec(obj[head], prop, i + 1);
			return clone;
		}

		if (Array.isArray(obj)) {
			head = getArrayIndex(head, obj);
			clone = [].concat(obj.slice(0, head), obj.slice(head + 1));
		} else {
			clone = Object.assign({}, obj);
			delete clone[head];
		}

		return clone;
	};

	return deletePropImmutableRec(obj, prop, 0);
};

function getArrayIndex(head, obj) {
	if (head === '$end') {
		head = obj.length - 1;
	}
	if (!/^\+?\d+$/.test(head)) {
		throw new Error(`Array index '${head}' has to be an integer`);
	}
	return parseInt(head);
}

function propToArray(prop) {
	return prop.replace(/\\\./g, '@').replace(/\./g, '*').replace(/@/g, '.').split('*');
}