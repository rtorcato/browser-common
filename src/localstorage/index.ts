/**
 * Checks if localStorage is available in the current environment.
 * @returns {boolean} True if localStorage is available, false otherwise.
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
 * @param {any} value - The value to store.
 */

export const setLocalStorage = (key: string, value: any): void => {
	if (!isLocalStorageAvailable()) return
	window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Gets a value from localStorage and parses it as JSON.
 * @param {string} key - The key to retrieve.
 * @returns {any | null} The parsed value, or null if not found or not available.
 */

export const getLocalStorage = (key: string): any | null => {
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
 */
export const removeLocalStorage = (key: string): void => {
	if (!isLocalStorageAvailable()) return
	window.localStorage.removeItem(key)
}

/**
 * Clears all keys from localStorage.
 */
export const clearLocalStorage = (): void => {
	if (!isLocalStorageAvailable()) return
	window.localStorage.clear()
}
