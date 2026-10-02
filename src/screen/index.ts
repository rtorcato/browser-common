/**
 * Gets the current screen width in pixels.
 * @returns {number | null} The screen width, or null if not in a browser.
 * @example
 * ```ts
 * import { getScreenWidth } from '@rtorcato/browser-common/screen'
 * const w = getScreenWidth()
 * ```
 */
export function getScreenWidth(): number | null {
	if (typeof window !== 'undefined' && window.screen) {
		return window.screen.width
	}
	return null
}

/**
 * Gets the current screen height in pixels.
 * @returns {number | null} The screen height, or null if not in a browser.
 * @example
 * ```ts
 * import { getScreenHeight } from '@rtorcato/browser-common/screen'
 * const h = getScreenHeight()
 * ```
 */
export function getScreenHeight(): number | null {
	if (typeof window !== 'undefined' && window.screen) {
		return window.screen.height
	}
	return null
}

/**
 * Gets the current viewport width in pixels.
 * @returns {number | null} The viewport width, or null if not in a browser.
 * @example
 * ```ts
 * import { getViewportWidth } from '@rtorcato/browser-common/screen'
 * const w = getViewportWidth()
 * ```
 */
export function getViewportWidth(): number | null {
	if (typeof window !== 'undefined') {
		return window.innerWidth
	}
	return null
}

/**
 * Gets the current viewport height in pixels.
 * @returns {number | null} The viewport height, or null if not in a browser.
 * @example
 * ```ts
 * import { getViewportHeight } from '@rtorcato/browser-common/screen'
 * const h = getViewportHeight()
 * ```
 */
export function getViewportHeight(): number | null {
	if (typeof window !== 'undefined') {
		return window.innerHeight
	}
	return null
}

/**
 * Checks if the screen is currently in landscape orientation.
 * @returns {boolean} True if landscape, false if portrait or not in a browser.
 * @example
 * ```ts
 * import { isLandscape } from '@rtorcato/browser-common/screen'
 * if (isLandscape()) renderWide()
 * ```
 */
export function isLandscape(): boolean {
	if (typeof window !== 'undefined') {
		return window.innerWidth > window.innerHeight
	}
	return false
}

/**
 * Checks if the screen is currently in portrait orientation.
 * @returns {boolean} True if portrait, false if landscape or not in a browser.
 * @example
 * ```ts
 * import { isPortrait } from '@rtorcato/browser-common/screen'
 * if (isPortrait()) renderStacked()
 * ```
 */
export function isPortrait(): boolean {
	if (typeof window !== 'undefined') {
		return window.innerHeight >= window.innerWidth
	}
	return false
}
