/**
 * Gets the current browser location (window.location.href).
 * @returns {string | undefined} The current URL, or undefined if not in a browser.
 */
export function getCurrentLocation(): string | undefined {
	if (typeof window !== 'undefined' && window.location) {
		return window.location.href
	}
	return undefined
}

/**
 * Redirects the browser to a new URL.
 * @param url The URL to redirect to.
 */
export function redirectTo(url: string): void {
	if (typeof window !== 'undefined' && window.location) {
		window.location.href = url
	}
}

/**
 * Reloads the current page.
 */
export function reloadPage(): void {
	if (typeof window !== 'undefined' && window.location) {
		window.location.reload()
	}
}

/**
 * Gets the current pathname from the browser location.
 * @returns {string | undefined} The pathname, or undefined if not in a browser.
 */
export function getPathname(): string | undefined {
	if (typeof window !== 'undefined' && window.location) {
		return window.location.pathname
	}
	return undefined
}

/**
 * Gets the current search (query string) from the browser location.
 * @returns {string | undefined} The search string, or undefined if not in a browser.
 */
export function getSearch(): string | undefined {
	if (typeof window !== 'undefined' && window.location) {
		return window.location.search
	}
	return undefined
}

/**
 * Gets the current hash from the browser location.
 * @returns {string | undefined} The hash string, or undefined if not in a browser.
 */
export function getHash(): string | undefined {
	if (typeof window !== 'undefined' && window.location) {
		return window.location.hash
	}
	return undefined
}
