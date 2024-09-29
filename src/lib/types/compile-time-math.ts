import { ArrayKeys, BuildArray, Length } from "./array"

	
/**
 * Generate a rage of positive integers at compile time, from 0 to N. 
 * 
 * @typeParam {number} N - the max number in the inclusive range.
 */
export type IntegerRange<N extends CompileTimeInt> = 
	ArrayKeys<BuildArray<N, any>> extends `${infer R extends number}` ? R | N : never


type CompileTimeInt = IntegerRange<100>
	
/**
* Compile-time numeric addition.
* @typeParam Augend - The first number.
* @typeParam Addend - The second number.
*/
export type Add<Augend extends CompileTimeInt, Addend extends CompileTimeInt> =
	Length<[...BuildArray<Augend, any>, ...BuildArray<Addend, any>]>

/**
* Compile-time numeric subtraction.
* @typeParam Minuend - The number to subtract from.
* @typeParam Subtrahend - The number to subtract.
*/
export type Subtract<Minuend extends CompileTimeInt, Subtrahend extends CompileTimeInt> =
	BuildArray<Minuend, any> extends [...(infer U), ...BuildArray<Subtrahend, any>] ? Length<U> : never


