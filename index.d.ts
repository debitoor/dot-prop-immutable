
function set(obj: any, prop: number | string, value: any): any;
function get(obj: any, prop: string | string[] | number, value?: any): any;
function toggle(obj: any, prop: number | string): any;
function merge(obj: any, prop: number | string, val: any): any;
function _delete(obj: any, prop: number | string): any;

declare const dotPropImmutable = {
	delete: _delete,
	set,
	get,
	toggle,
	merge
};

export = dotPropImmutable;