
export const none = Symbol('none')

export type None = typeof none

export class Maybe<T> {
	constructor(private value: T | None) {}

	static just<T>(value: T): Maybe<T> {
		if (value === null || value === undefined) {
			return Maybe.none<T>()
		}

		return new Maybe<T>(value)
	}

	static none<T>(): Maybe<T> {
		return new Maybe<T>(none)
	}

	static from<T>(value: T): Maybe<T> {
		return Maybe.just(value)
	}

	public map<U>(f: (value: T) => U): Maybe<U> {
		if (this.value === none) {
			return Maybe.none<U>()
		}

		return Maybe.just<U>(f(this.value))
	}

	public match<U>({ just, none }: { just: (value: T) => U; none: () => U }): U {
		if (this.value === none) { 
			return none()
		}

		return just(this.value as T)
	}

	public flatMap<U>(f: (value: T) => Maybe<U>): Maybe<U> {
		if (this.value === none) {
			return Maybe.none<U>()
		}

		return f(this.value)
	}
}