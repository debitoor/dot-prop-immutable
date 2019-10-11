function getArrayIndex(theHead, obj) {
	let head = theHead;
	if (head === '$end') {
		head = Math.max(obj.length - 1, 0);
	}
	if (!/^\+?\d+$/.test(head)) {
		throw new Error(`Array index '${head}' has to be an integer`);
	}
	let newHead = parseInt(head, 10);
	if (newHead < 0) { newHead = 0; }
	if (newHead > obj.length) { newHead = obj.length; }
	return newHead;
}

function propToArray(prop) {
	return prop.split('.').reduce((ret, el, index, list) => {
		const last = index > 0 && list[index - 1];
		if (last && /(?:^|[^\\])\\$/.test(last)) {
			ret.pop();
			ret.push(`${last.slice(0, -1)}.${el}`);
		} else {
			ret.push(el);
		}
		return ret;
	}, []);
}

function isInt(str) {
	const reg = /^\d+$/g;
	return reg.test(str);
}

const setPropImmutableRec = (obj, prop, value, i) => {
	let clone;
	let head = prop[i];

	if (prop.length > i) {
		if (Array.isArray(obj)) {
			head = getArrayIndex(head, obj);
			clone = obj.slice();
		} else {
			clone = Object.assign({}, obj);
		}
		if (obj[head] === undefined) {
			const blah = isInt(head);
			if (blah) {
				if (!Array.isArray(clone)) {
					clone = [];
				}
				if (clone.length > 0) {
					for (let x = clone.length; x <= head; x += 1) {
						clone.push((x === head ? setPropImmutableRec({}, prop, value, i + 1) : undefined));
					}
				} else {
					clone.push(setPropImmutableRec({}, prop, value, i + 1));
				}
			} else {
				clone[head] = setPropImmutableRec({}, prop, value, i + 1);
			}
		} else {
			clone[head] = setPropImmutableRec(obj[head], prop, value, i + 1);
		}
		return clone;
	}

	return typeof value === 'function' ? value(obj) : value;
};

/**
 * Set a value by a dot path.
 * @param obj The object to evaluate.
 * @param prop The path to be set.
 * @param val The value to set.
 */
function set(obj, property, value) {
	let tempProp;
	if (typeof property === 'number') {
		tempProp = propToArray(property.toString());
	} else if (typeof property === 'string') {
		tempProp = propToArray(property);
	} else {
		tempProp = property;
	}
	const prop = tempProp;

	return setPropImmutableRec(obj, prop, value, 0);
}

/**
 * Get a value by a dot path.
 * @param obj The object to evaluate.
 * @param prop The path to value that should be returned.
 */
function get(theObj, property, value) {
	let obj = theObj;
	let tempProp;
	if (typeof property === 'number') {
		tempProp = propToArray(property.toString());
	} else if (typeof property === 'string') {
		tempProp = propToArray(property);
	} else {
		tempProp = property;
	}
	const prop = tempProp;


	for (let i = 0; i < prop.length; i += 1) {
		if (typeof obj !== 'object') {
			return value;
		}
		let head = prop[i];
		if (Array.isArray(obj) && head === '$end') {
			head = obj.length - 1;
		}
		obj = obj[head];
	}

	if (typeof obj === 'undefined') {
		return value;
	}

	return obj;
}

/**
 * Delete a property by a dot path.
 * If target container is an object, the property is deleted.
 * If target container is an array, the index is deleted.
 * If target container is undefined, nothing is deleted.
 * @param obj The object to evaluate.
 * @param prop The path to the property or index that should be deleted.
 */


const deletePropImmutableRec = (obj, prop, i) => {
	let clone; let
		head = prop[i];

	if (typeof obj !== 'object'
		|| (!Array.isArray(obj) && obj[head] === undefined)) {
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

function del(obj, property) {
	let tempProp;
	if (typeof property === 'number') {
		tempProp = propToArray(property.toString());
	} else if (typeof property === 'string') {
		tempProp = propToArray(property);
	} else {
		tempProp = property;
	}
	const prop = tempProp;


	return deletePropImmutableRec(obj, prop, 0);
}

/**
 * Toggles a value.  The target value is evaluated using Boolean(currentValue).
 * The result will always be a JSON boolean.
 * Be careful with strings as target value,
 * as "true" and "false" will toggle to false, but "0" will toggle to true.
 * Here is what Javascript considers false:
 * 0, -0, null, false, NaN, undefined, and the empty string ("")
 * @param obj The object to evaluate.
 * @param prop The path to the value.
 */
function toggle(obj, prop) {
	const curVal = get(obj, prop);
	return set(obj, prop, !curVal);
}

/**
 * Merges a value.  The target value must be an object, array, null, or undefined.
 * If target is an object, Object.assign({}, target, param) is used.
 * If target an array, target.concat(param) is used.
 * If target is null or undefined, the value is simply set.
 * @param obj The object to evaluate.
 * @param prop The path to the value.
 * @param val The value to merge into the target value.
 */
function merge(obj, prop, val) {
	const curVal = get(obj, prop);
	if (typeof curVal === 'object') {
		if (Array.isArray(curVal)) {
			return set(obj, prop, curVal.concat(val));
		} if (curVal === null) {
			return set(obj, prop, val);
		}

		const merged = Object.assign({}, curVal, val);
		return set(obj, prop, merged);
	} if (typeof curVal === 'undefined') {
		return set(obj, prop, val);
	}

	return obj;
}

module.exports = {
	set,
	get,
	delete: del,
	toggle,
	merge,
};
