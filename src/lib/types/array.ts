
/**
 * Defines a strongly-typed immutable tuple.
 *
 * @typeParam T - Array to define the types of the elements in the tuple, 
 * in order.
 */
export type Tuple<T extends unknown[]> = readonly [...T]


/**
 * Defines a typed fixed length array.
 *
 * @typeParam {number} Length - The length of the array.
 * @typeParam TItem - The type of items in the array, defaults to number.
 */
export type FixedArray<Len extends number, TItem extends unknown> =
    readonly [TItem, ...readonly TItem[]] & { readonly length: Len }


/**
 * Extracts the element type from an array.
 *
 * @typeParam T - The array to infer the element type from.
 */
export type ElementType<T extends unknown[]> = 
	T extends (infer U)[] ? U : never


/**
 * Represents the length of an array.
 *
 * @typeParam Arr - The array to determine the length of.
 */
export type Length<Arr extends unknown[]> =
    Arr extends { readonly length: infer Len } ? Len : never

  
/**
 * Constructs a homogenous tuple of a specified length.
 *
 * @typeParam {number} Len - The length of the array to construct.
 * @typeParam T - The type of elements in the tuple.
 * @typeParam Acc - Accumulator for recursive construction, defaults to an empty array.
 */
export type BuildArray<Len extends number, T extends unknown, Acc extends readonly T[] = []> =
	Acc extends { length: Len } ? Acc : BuildArray<Len, T, [...Acc, T]>

export type FArray<Len extends number, T> = Array<T> & FixedArray<Len, T>




/**
* Splits an array into two parts at a specified index.
*
* @typeParam Source - The array to split.
* @typeParam {number} N - The index at which to split.
* @typeParam Accumulator - An internal accumulator for recursion; defaults to an empty array.
* @returns Array where the first element is the first N elements of the source, and the second element is the remainder.
*/
export type Split<Source, N extends number, Acc extends readonly unknown[] = readonly []> =
	Acc['length'] extends N 
		? [Acc, Source] 
		: Source extends readonly [infer First, ...infer Rest] 
			? Split<readonly [...Rest], N, readonly [...Acc, First]> 
			: [Acc, Source]


/**
* Extracts the first `N` elements from an array.
*
* @typeParam T - The source array type.
* @typeParam {number} N - The number of elements to extract.
*/
export type Take<T extends readonly unknown[], N extends number> = 
	Split<T, N>[0]


/**
* Drops the first `N` elements from an array.
*
* @typeParam T - The source array type.
* @typeParam {number} N - The number of elements to drop.
*/
export type Drop<T extends readonly unknown[], N extends number> = 
	Split<T, N>[1];

	
// Get array indices without the array methods.
export type ArrayKeys<Arr extends unknown[]> = 
	Exclude<keyof Arr, keyof unknown[]>