

// Basic arithmetic functions
export const add = (l: number, r: number) => l + r
export const sub = (l: number, r: number) => l - r
export const mul = (l: number, r: number) => l * r
export const div = (l: number, r: number) => l / r

export const square = (n: number) => n * n

export const sum = (ns: number[]) => ns.reduce(add, 0)

export const avg = (...ns: number[]) => sum(ns) / ns.length
