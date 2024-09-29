import { mul, div, add, sub } from "./math"


export const addTo = (l: number) => (r: number) => add(l, r)
export const mulBy = (l: number) => (r: number) => mul(l, r)

export const subFrom = (minuend: number)    => (subtrahend: number) => sub(minuend, subtrahend)
export const subBY =   (subtrahend: number) => (minuend: number)    => sub(minuend, subtrahend)

export const divInto = (dividend: number) => (divisor: number)  => div(dividend, divisor)
export const divBy =   (divisor: number)  => (dividend: number) => div(dividend, divisor)