/**
 * Checks if the code is running in a browser environment.
 * @returns {boolean} True if running in a browser, false otherwise.
 */
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

/**
 * Returns the browser's user agent string, if available.
 * @returns {string | undefined} The user agent string or undefined if not in a browser.
 */
export const getUserAgent = (): string | undefined => {
	return typeof navigator !== 'undefined' ? navigator.userAgent : undefined
}

/**
 * Detects if the user is on a mobile device.
 * @returns {boolean} True if the user agent is a mobile device, false otherwise.
 */
export const isMobile = (): boolean => {
	return typeof navigator !== 'undefined'
		? /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		: false
}

/**
 * Returns the browser's preferred language, if available.
 * @returns {string | undefined} The preferred language or undefined if not in a browser.
 */
export const getBrowserLanguage = (): string | undefined => {
	return typeof navigator !== 'undefined' ? navigator.language : undefined
}
