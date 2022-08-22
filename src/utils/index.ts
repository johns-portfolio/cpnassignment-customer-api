export const toPromise = <T>(value: T): Promise<T> =>
	new Promise((resolve) => resolve(value))
