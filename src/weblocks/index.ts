/**
 * Runs a callback while holding a named lock using the Web Locks API.
 * @param name - The name of the lock.
 * @param callback - The async function to run while holding the lock.
 * @returns The result of the callback.
 * @throws If the Web Locks API is not supported.
 * @example
 * ```ts
 * import { withLock } from '@rtorcato/browser-common/weblocks'
 * const result = await withLock('sync', async () => fetchAndStore())
 * ```
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
 * Checks if the Web Locks API is available in the current browser.
 * @example
 * ```ts
 * import { isWebLocksAvailable } from '@rtorcato/browser-common/weblocks'
 * if (isWebLocksAvailable()) acquireLock()
 * ```
 */
export function isWebLocksAvailable(): boolean {
	return typeof navigator !== 'undefined' && !!navigator.locks
}

/** @deprecated Use {@link isWebLocksAvailable} instead. Will be removed in the next major. */
export const isWebLocksSupported = isWebLocksAvailable
