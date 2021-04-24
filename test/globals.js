const chai = require('chai');
global.expect = chai.expect;

global.baseObj = {
	a: 1,
	b: {
		x: 1,
		y: 2
	},
	c: [1, 2],
	'b.x': 10
};
global.baseArr = [
	1, { a: false }, { b: true }
];