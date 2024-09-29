import { head, isEmpty, tail } from "./utils";


/**
 * Applies a function to elements of multiple arrays in a zip-like fashion.
 *
 * @param fn - The function to apply.
 * @param xs - The arrays to zip.
 * @returns An array containing the results of applying `fn` to each set of elements from the input arrays.
 */
export const zipWith = <T extends unknown[], F extends (...args: T) => unknown>(
	// Function that combines elements
	fn: F, 
	// Arrays of elements corresponding to the types in tuple T
	...xs: { [K in keyof T]: T[K][] } 
): F extends (...args: T) => infer R ? R[] : never =>
	// If any array is empty, return an empty array
	xs.some(isEmpty)
		? [] as F extends (...args: T) => infer R ? R[] : never
		: [
			fn(...xs.map(head) as T),
			...zipWith(fn, ...xs.map(tail) as { [K in keyof T]: T[K][] })
		] as F extends (...args: T) => infer R ? R[] : never
