

// Basic arithmetic functions
const add = (l: number, r: number) => l + r
const sub = (l: number, r: number) => l - r
const mul = (l: number, r: number) => l * r
const div = (l: number, r: number) => l / r


export const curry = {
	addTo: (l: number) => (r: number) => add(l, r),
	mulBy: (l: number) => (r: number) => mul(l, r),

	subFrom: (minuend: number)    => (subtrahend: number) => sub(minuend, subtrahend),
	subBY:   (subtrahend: number) => (minuend: number)    => sub(minuend, subtrahend),

	divInto: (dividend: number) => (divisor: number)  => div(dividend, divisor),
	divBy:   (divisor: number)  => (dividend: number) => div(dividend, divisor),
} as const



