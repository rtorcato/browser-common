/**
 * Checks if localStorage is available in the current environment.
 * @returns {boolean} True if localStorage is available, false otherwise.
 * @example
 * ```ts
 * import { isLocalStorageAvailable } from '@rtorcato/browser-common/localstorage'
 * if (isLocalStorageAvailable()) loadPrefs()
 * ```
 */
export const isLocalStorageAvailable = (): boolean => {
	try {
		const testKey = '__ls_test__'
		window.localStorage.setItem(testKey, '1')
		window.localStorage.removeItem(testKey)
		return true
	} catch {
		return false
	}
}

/**
 * Sets a value in localStorage. Automatically stringifies objects.
 * @param {string} key - The key to set.
 * @param {unknown} value - The value to store.
 * @example
 * ```ts
 * import { setLocalStorage, getLocalStorage } from '@rtorcato/browser-common/localstorage'
 * setLocalStorage('prefs', { theme: 'dark' })
 * const prefs = getLocalStorage('prefs')
 * ```
 */

export const setLocalStorage = (key: string, value: unknown): void => {
	if (!isLocalStorageAvailable()) return
	window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Gets a value from localStorage and parses it as JSON.
 * Returns `unknown` — callers must narrow before use.
 * @param {string} key - The key to retrieve.
 * @returns {unknown | null} The parsed value, or null if not found or not available.
 * @example
 * ```ts
 * import { getLocalStorage } from '@rtorcato/browser-common/localstorage'
 * const value = getLocalStorage('prefs') as { theme: string } | null
 * ```
 */

export const getLocalStorage = (key: string): unknown | null => {
	if (!isLocalStorageAvailable()) return null
	const item = window.localStorage.getItem(key)
	try {
		return item === null ? null : JSON.parse(item)
	} catch {
		return item
	}
}

/**
 * Removes a value from localStorage.
 * @param {string} key - The key to remove.
 * @example
 * ```ts
 * import { removeLocalStorage } from '@rtorcato/browser-common/localstorage'
 * removeLocalStorage('prefs')
 * ```
 */
export const removeLocalStorage = (key: string): void => {
	if (!isLocalStorageAvailable()) return
	window.localStorage.removeItem(key)
}

/**
 * Clears all keys from localStorage.
 * @example
 * ```ts
 * import { clearLocalStorage } from '@rtorcato/browser-common/localstorage'
 * clearLocalStorage()
 * ```
 */
export const clearLocalStorage = (): void => {
	if (!isLocalStorageAvailable()) return
	window.localStorage.clear()
}
