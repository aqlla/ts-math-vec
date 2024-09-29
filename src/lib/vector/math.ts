import { zipWith } from "../fn/zip.js"
import { FArray } from "../types/array.js"
import { IntegerRange } from "../types/compile-time-math.js"


export type Dim = IntegerRange<10>

/**
 * Map components with a function
 */
export const map = <N extends Dim>(fn, vector: FArray<N, number>): FArray<N, number> =>
    vector.map(fn) as FArray<N, number>

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
export const add = <N extends Dim>(augend: FArray<N, number>, addend: FArray<N, number>): FArray<N, number> =>
    zipWith((a, b) => a + b, augend, addend) as FArray<N, number>

/**
 * Subtraction. Calculates the difference between two vectors of N dimensions.
 * 
 * @param minuend the vector to subtract from.
 * @param subtrahend the vector to subtract from the minuend.
 * @returns the vector difference between the minuend and subtrahend.
 */
export const sub = <N extends Dim>(minuend: FArray<N, number>, subtrahend: FArray<N, number>): FArray<N, number> =>
    zipWith(
		(a, b) => a - b, 
		minuend, subtrahend
	) as FArray<N, number>

/**
 * Calculates the product of an N-dimensional vector and a scalar.
 * 
 * @param vector the vector-valued multiplicand.
 * @param scalar the scalar-valued multiplier.
 * @returns the product of the vector multiplicand and the scalar multiplier. 
 */
export const mul = <N extends Dim>(vector: FArray<N, number>, scalar: number): FArray<N, number> =>
    vector.map(component => component * scalar) as FArray<N, number>

/**
 * Calculates the quotient of an N-dimensional vector and a scalar.
 * 
 * @param vector the vector-valued dividend.
 * @param scalar the scalar-valued divisor.
 * @returns the quotient of a vector dividend and a scalar divisor.
 */
export const div = <N extends Dim>(vector: FArray<N, number>, scalar: number): FArray<N, number> => {
    if (scalar === 0) {
        // console.error("Div by 0")
        // console.log(vector)
    }
    return vector.map(component => component / scalar) as FArray<N, number>
}

/**
 * Calculates the dot product of two N-dimensional vectors.
 * 
 * @returns the dot product of N-Dim vectors l and r.
 */
export const dot = <N extends Dim>(ls: FArray<N, number>, rs: FArray<N, number>): number =>
    ls.reduce((acc, curr, index) => acc + curr * rs[index], 0)

/**
 * Calculates the squared magnitude of an n-dimensional vector.
 * 
 * @param vector the vector whose squared magnitude will be found.
 * @returns the square of the magnitude of the provided N-Dimensional vector.
 */
export const magnitudeSquared = <N extends Dim>(vector: FArray<N, number>): number =>
    vector.reduce((acc, val) => acc + val * val, 0)

/**
 * Calculates the magnitude of an n-dimensional vector.
 * 
 * @param vector the vector whose magnitude will be found.
 * @returns the magnitude of the provided N-Dimensional vector.
 */
export const magnitude = <N extends Dim>(vector: FArray<N, number>): number =>
    Math.sqrt(magnitudeSquared(vector))

/**
 * Calculates the unit vector of an n-dimensional vector.
 * 
 * @param vector the vector to calculate the unit vector from.
 * @returns the unit vector of the given n-dimensional vector.
 */
export const unit = <N extends Dim>(vector: FArray<N, number>): FArray<N, number> => {
    const mag = magnitude(vector)
    return vector.map(val => val / mag) as FArray<N, number>
}

/**
 * Calculates the angle between 2 n-dimensional vectors.
 * 
 * @param l one of the vectors
 * @param r the other vector
 * @returns the angle between the 2 provided n-dimensional vectors.
 */
export const angle = <N extends Dim>(l: FArray<N, number>, r: FArray<N, number>): number =>
    Math.acos(dot(l, r) / (magnitude(l) * magnitude(r)))

/**
 * Calculates the midpoint of 2 n-dimensional vectors.
 * 
 * @param ls one of the vectors
 * @param rs the other vector
 * @returns the midpoint of the 2 provided n-dimensional vectors.
 */
export const midpoint = <N extends Dim>(ls: FArray<N, number>, rs: FArray<N, number>): FArray<N, number> =>
	zipWith(
		(l, r) => (l + r) / 2, 
		ls, rs
	) as FArray<N, number>



