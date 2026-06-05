/**
 * Sets a cookie in the browser.
 * @param name The cookie name.
 * @param value The cookie value.
 * @param days Number of days until the cookie expires (optional).
 * @param path The cookie path (default: '/').
 * @example
 * ```ts
 * import { setCookie } from '@rtorcato/browser-common/cookies'
 * setCookie('theme', 'dark', 30)
 * ```
 */
export function setCookie(name: string, value: string, days?: number, path = '/'): void {
	let expires = ''
	if (days !== undefined) {
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = `; expires=${date.toUTCString()}`
	}
	// biome-ignore lint/suspicious/noDocumentCookie: This module is the cookies wrapper — direct document.cookie is the API.
	document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=${path}`
}

/**
 * Gets a cookie value by name.
 * @param name The cookie name.
 * @returns The cookie value or null if not found.
 * @example
 * ```ts
 * import { getCookie } from '@rtorcato/browser-common/cookies'
 * const theme = getCookie('theme')
 * ```
 */
export function getCookie(name: string): string | null {
	const nameEQ = `${encodeURIComponent(name)}=`
	const ca = document.cookie.split(';')
	for (let c of ca) {
		c = c.trim()
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length))
	}
	return null
}

/**
 * Deletes a cookie by name.
 * @param name The cookie name.
 * @param path The cookie path (default: '/').
 * @example
 * ```ts
 * import { deleteCookie } from '@rtorcato/browser-common/cookies'
 * deleteCookie('theme')
 * ```
 */
export function deleteCookie(name: string, path = '/'): void {
	setCookie(name, '', -1, path)
}

/**
 * Checks if a cookie exists by name.
 * @param name The cookie name.
 * @returns True if the cookie exists, false otherwise.
 * @example
 * ```ts
 * import { hasCookie } from '@rtorcato/browser-common/cookies'
 * if (hasCookie('session')) refresh()
 * ```
 */
export function hasCookie(name: string): boolean {
	return getCookie(name) !== null
}

/**
 * Gets all cookies as an object.
 * @returns An object with cookie names and values.
 * @example
 * ```ts
 * import { getAllCookies } from '@rtorcato/browser-common/cookies'
 * const cookies = getAllCookies()
 * ```
 */
export function getAllCookies(): Record<string, string> {
	return document.cookie.split(';').reduce(
		(acc, c) => {
			const [key, ...v] = c.trim().split('=')
			if (key) acc[decodeURIComponent(key)] = decodeURIComponent(v.join('='))
			return acc
		},
		{} as Record<string, string>
	)
}
