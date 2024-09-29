import { zipWith as zzzipwith } from "../fn/zip.js"
import { divBy, mulBy } from "../scalar/math/curry.js"
import { sum, mul as multiply, sub as subtract, square, avg } from "../scalar/math/math.js"
import { FArray } from "../types/array.js"
import { IntegerRange } from "../types/compile-time-math.js"


export type Dim = IntegerRange<10>

type NVec<N extends Dim> = FArray<N, number>

/**
 * Map components with a function
 */
export const map = <N extends Dim>(fn: (n: number, i: number) => number, vector: NVec<N>): NVec<N> =>
    vector.map(fn) as NVec<N>

const reduce = <N extends Dim>(fn: (a: number, c: number, i: number) => number, vector: NVec<N>, initial: number = 0): number =>
    vector.reduce(fn, initial)

const zipWith = <N extends Dim>(fn: (x: number, y: number) => number, xs: number[], ys: number[]) =>
    zzzipwith(fn, xs, ys) as NVec<N>


/**
 * Vector Addition. 
 * 
 * Calculates the sum of two vectors of N dimensions. Utilizes the `zipWith`
 * function to find the sum of each vector component. 
 * 
 * @typeParam {number} N the dimensionality of the vectors.
 * 
 * @param augend the first vector, the augend.
 * @param addend the second vector, the addend.
 * @returns sum of the provided vectors.
 */
export const add = <N extends Dim>(augend: NVec<N>, addend: NVec<N>): NVec<N> =>
    zipWith((a, b) => a + b, augend, addend)

/**
 * Subtraction. Calculates the difference between two vectors of N dimensions.
 * 
 * @param minuend the vector to subtract from.
 * @param subtrahend the vector to subtract from the minuend.
 * @returns the vector difference between the minuend and subtrahend.
 */
export const sub = <N extends Dim>(minuend: NVec<N>, subtrahend: NVec<N>): NVec<N> =>
    zipWith(subtract, minuend, subtrahend)

/**
 * Calculates the product of an N-dimensional vector and a scalar.
 * 
 * @param vector the vector-valued multiplicand.
 * @param scalar the scalar-valued multiplier.
 * @returns the product of the vector multiplicand and the scalar multiplier. 
 */
export const mul = <N extends Dim>(vector: NVec<N>, scalar: number): NVec<N> =>
    map(mulBy(scalar), vector)

/**
 * Calculates the quotient of an N-dimensional vector and a scalar.
 * 
 * @param vector the vector-valued dividend.
 * @param scalar the scalar-valued divisor.
 * @returns the quotient of a vector dividend and a scalar divisor.
 */
export const div = <N extends Dim>(vector: NVec<N>, scalar: number): NVec<N> =>
    map(divBy(scalar), vector)

/**
 * Calculates the dot product of two N-dimensional vectors.
 * 
 * @returns the dot product of N-Dim vectors l and r.
 */
export const dot = <N extends Dim>(ls: NVec<N>, rs: NVec<N>): number =>
    reduce((acc, cur, idx) => acc + cur * rs[idx], ls)

export const dot2 = <N extends Dim>(ls: NVec<N>, rs: NVec<N>): number =>
	sum(zipWith(multiply, ls, rs))

/**
 * Calculates the squared magnitude of an n-dimensional vector.
 * 
 * @param vector the vector whose squared magnitude will be found.
 * @returns the square of the magnitude of the provided N-Dimensional vector.
 */
export const magSquared = <N extends Dim>(vector: NVec<N>): number =>
    reduce((acc, val) => acc + val * val, vector)

export const magSquared2 = <N extends Dim>(vector: NVec<N>): number =>
    sum(map(square, vector))

/**
 * Calculates the magnitude of an n-dimensional vector.
 * 
 * @param vector the vector whose magnitude will be found.
 * @returns the magnitude of the provided N-Dimensional vector.
 */
export const magnitude = <N extends Dim>(vector: NVec<N>): number =>
    Math.sqrt(magSquared(vector))

/**
 * Calculates the unit vector of an n-dimensional vector.
 * 
 * @param vector the vector to calculate the unit vector from.
 * @returns the unit vector of the given n-dimensional vector.
 */
export const unit = <N extends Dim>(vector: NVec<N>): NVec<N> =>
    map(divBy(magnitude(vector)), vector)

/**
 * Calculates the angle between 2 n-dimensional vectors.
 * 
 * @param l one of the vectors
 * @param r the other vector
 * @returns the angle between the 2 provided n-dimensional vectors.
 */
export const angle = <N extends Dim>(l: NVec<N>, r: NVec<N>): number =>
    Math.acos(dot(l, r) / (magnitude(l) * magnitude(r)))

/**
 * Calculates the midpoint of 2 n-dimensional vectors.
 * 
 * @param ls one of the vectors
 * @param rs the other vector
 * @returns the midpoint of the 2 provided n-dimensional vectors.
 */
export const mid = <N extends Dim>(ls: NVec<N>, rs: NVec<N>): NVec<N> =>
	zipWith((l, r) => (l + r) / 2, ls, rs)

export const mid2 = <N extends Dim>(ls: NVec<N>, rs: NVec<N>): NVec<N> =>
	zipWith(avg, ls, rs)



