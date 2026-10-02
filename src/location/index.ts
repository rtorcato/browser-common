/**
 * Gets the current browser location (window.location.href).
 * @returns {string | null} The current URL, or null if not in a browser.
 * @example
 * ```ts
 * import { getCurrentLocation } from '@rtorcato/browser-common/location'
 * const url = getCurrentLocation()
 * ```
 */
export function getCurrentLocation(): string | null {
	if (typeof window !== 'undefined' && window.location) {
		return window.location.href
	}
	return null
}

/**
 * Redirects the browser to a new URL.
 * @param url The URL to redirect to.
 * @example
 * ```ts
 * import { redirectTo } from '@rtorcato/browser-common/location'
 * redirectTo('/login')
 * ```
 */
export function redirectTo(url: string): void {
	if (typeof window !== 'undefined' && window.location) {
		window.location.href = url
	}
}

/**
 * Reloads the current page.
 * @example
 * ```ts
 * import { reloadPage } from '@rtorcato/browser-common/location'
 * reloadPage()
 * ```
 */
export function reloadPage(): void {
	if (typeof window !== 'undefined' && window.location) {
		window.location.reload()
	}
}

/**
 * Gets the current pathname from the browser location.
 * @returns {string | null} The pathname, or null if not in a browser.
 * @example
 * ```ts
 * import { getPathname } from '@rtorcato/browser-common/location'
 * if (getPathname() === '/home') showHome()
 * ```
 */
export function getPathname(): string | null {
	if (typeof window !== 'undefined' && window.location) {
		return window.location.pathname
	}
	return null
}

/**
 * Gets the current search (query string) from the browser location.
 * @returns {string | null} The search string, or null if not in a browser.
 * @example
 * ```ts
 * import { getSearch } from '@rtorcato/browser-common/location'
 * const qs = getSearch()
 * ```
 */
export function getSearch(): string | null {
	if (typeof window !== 'undefined' && window.location) {
		return window.location.search
	}
	return null
}

/**
 * Gets the current hash from the browser location.
 * @returns {string | null} The hash string, or null if not in a browser.
 * @example
 * ```ts
 * import { getHash } from '@rtorcato/browser-common/location'
 * const hash = getHash()
 * ```
 */
export function getHash(): string | null {
	if (typeof window !== 'undefined' && window.location) {
		return window.location.hash
	}
	return null
}
