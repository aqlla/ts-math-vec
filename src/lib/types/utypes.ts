
// Placeholder type for unimplemented features or temporary typing.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any

export type Optional<T> = T | undefined


/**
 * Omits readonly constraint from a given type. Only performs shallow omission.
 * Helps to make immutability default by requiring explicit declaration for
 * mutability.
 * 
 * @typeParam T - the type from which the readonly constraint will be removed.
 */
export type Mut<T extends Readonly<unknown>> = {
	-readonly [key in keyof T]: T[key];
}
