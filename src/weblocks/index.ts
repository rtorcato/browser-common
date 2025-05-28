/**
 * Runs a callback while holding a named lock using the Web Locks API.
 * @param name - The name of the lock.
 * @param callback - The async function to run while holding the lock.
 * @returns The result of the callback.
 * @throws If the Web Locks API is not supported.
 */
export async function withLock<T>(name: string, callback: () => Promise<T>): Promise<T> {
	if (typeof navigator === 'undefined' || !navigator.locks) {
		throw new Error('Web Locks API is not supported in this browser.')
	}
	return navigator.locks.request(name, async () => {
		return callback()
	})
}

/**
 * Checks if the Web Locks API is supported in the current browser.
 */
export function isWebLocksSupported(): boolean {
	return typeof navigator !== 'undefined' && !!navigator.locks
}
