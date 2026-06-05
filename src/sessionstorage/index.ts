/**
 * Checks if sessionStorage is available in the current environment.
 * @returns {boolean} True if sessionStorage is available, false otherwise.
 * @example
 * ```ts
 * import { isSessionStorageAvailable } from '@rtorcato/browser-common/sessionstorage'
 * if (isSessionStorageAvailable()) restoreState()
 * ```
 */
export const isSessionStorageAvailable = (): boolean => {
	try {
		const testKey = '__ss_test__'
		window.sessionStorage.setItem(testKey, '1')
		window.sessionStorage.removeItem(testKey)
		return true
	} catch {
		return false
	}
}

/**
 * Sets a value in sessionStorage. Automatically stringifies objects.
 * @param {string} key - The key to set.
 * @param {unknown} value - The value to store.
 * @example
 * ```ts
 * import { setSessionStorage, getSessionStorage } from '@rtorcato/browser-common/sessionstorage'
 * setSessionStorage('cart', { items: 3 })
 * const cart = getSessionStorage('cart')
 * ```
 */

export const setSessionStorage = (key: string, value: unknown): void => {
	if (!isSessionStorageAvailable()) return
	window.sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * Gets a value from sessionStorage and parses it as JSON.
 * Returns `unknown` — callers must narrow before use.
 * @param {string} key - The key to retrieve.
 * @returns {unknown | null} The parsed value, or null if not found or not available.
 * @example
 * ```ts
 * import { getSessionStorage } from '@rtorcato/browser-common/sessionstorage'
 * const cart = getSessionStorage('cart') as { items: number } | null
 * ```
 */

export const getSessionStorage = (key: string): unknown | null => {
	if (!isSessionStorageAvailable()) return null
	const item = window.sessionStorage.getItem(key)
	try {
		return item === null ? null : JSON.parse(item)
	} catch {
		return item
	}
}

/**
 * Removes a value from sessionStorage.
 * @param {string} key - The key to remove.
 * @example
 * ```ts
 * import { removeSessionStorage } from '@rtorcato/browser-common/sessionstorage'
 * removeSessionStorage('cart')
 * ```
 */
export const removeSessionStorage = (key: string): void => {
	if (!isSessionStorageAvailable()) return
	window.sessionStorage.removeItem(key)
}

/**
 * Clears all keys from sessionStorage.
 * @example
 * ```ts
 * import { clearSessionStorage } from '@rtorcato/browser-common/sessionstorage'
 * clearSessionStorage()
 * ```
 */
export const clearSessionStorage = (): void => {
	if (!isSessionStorageAvailable()) return
	window.sessionStorage.clear()
}
