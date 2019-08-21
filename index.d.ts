export namespace dotPropImmutable {
	export function set(): T;
	export function get(): T;
	export function remove(): T; // delete --> remove (reserved namespae)
	export function toggle(): T;
	export function merge(): T;
};