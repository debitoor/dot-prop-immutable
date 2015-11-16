'use strict';

module.exports.set = function(obj, prop, value) {
	prop = typeof prop === 'string' ? propToArray(prop) : prop;

	var setPropImmutableRec = function(obj, prop, value, i) {
		var head = prop[i];

		if (prop.length !== i) {
			if (Array.isArray(obj)) {
				if (head === '$end') {
					head = obj.length - 1;
				}
				if (/^\+?\d+$/.test(head) && obj.length > head) {
					head = parseInt(head);
					return [].concat(obj.slice(0, head), setPropImmutableRec(obj[head] !== undefined ? obj[head] : {}, prop, value, i + 1), obj.slice(head + 1));
				} else {
					let clone = obj.slice();
					clone[head] = setPropImmutableRec(obj[head] !== undefined ? obj[head] : {}, prop, value, i + 1);
					return clone;
				}

			} else {
				return Object.assign({}, obj, {[head]: setPropImmutableRec(obj[head] !== undefined ? obj[head] : {}, prop, value, i + 1)});
			}
		}

		return typeof value === 'function' ? value(obj) : value;
	};

	return setPropImmutableRec(obj, prop, value, 0, null);
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

function propToArray(prop) {
	return prop.replace(/\\\./g, '@').replace(/\./g, '*').replace(/@/g, '.').split('*');
}