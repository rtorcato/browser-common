/**
 * Gets the current screen width in pixels.
 * @returns {number | undefined} The screen width, or undefined if not in a browser.
 * @example
 * ```ts
 * import { getScreenWidth } from '@rtorcato/browser-common/screen'
 * const w = getScreenWidth()
 * ```
 */
export function getScreenWidth(): number | undefined {
	if (typeof window !== 'undefined' && window.screen) {
		return window.screen.width
	}
	return undefined
}

/**
 * Gets the current screen height in pixels.
 * @returns {number | undefined} The screen height, or undefined if not in a browser.
 * @example
 * ```ts
 * import { getScreenHeight } from '@rtorcato/browser-common/screen'
 * const h = getScreenHeight()
 * ```
 */
export function getScreenHeight(): number | undefined {
	if (typeof window !== 'undefined' && window.screen) {
		return window.screen.height
	}
	return undefined
}

/**
 * Gets the current viewport width in pixels.
 * @returns {number | undefined} The viewport width, or undefined if not in a browser.
 * @example
 * ```ts
 * import { getViewportWidth } from '@rtorcato/browser-common/screen'
 * const w = getViewportWidth()
 * ```
 */
export function getViewportWidth(): number | undefined {
	if (typeof window !== 'undefined') {
		return window.innerWidth
	}
	return undefined
}

/**
 * Gets the current viewport height in pixels.
 * @returns {number | undefined} The viewport height, or undefined if not in a browser.
 * @example
 * ```ts
 * import { getViewportHeight } from '@rtorcato/browser-common/screen'
 * const h = getViewportHeight()
 * ```
 */
export function getViewportHeight(): number | undefined {
	if (typeof window !== 'undefined') {
		return window.innerHeight
	}
	return undefined
}

/**
 * Checks if the screen is currently in landscape orientation.
 * @returns {boolean | undefined} True if landscape, false if portrait, undefined if not in a browser.
 * @example
 * ```ts
 * import { isLandscape } from '@rtorcato/browser-common/screen'
 * if (isLandscape()) renderWide()
 * ```
 */
export function isLandscape(): boolean | undefined {
	if (typeof window !== 'undefined') {
		return window.innerWidth > window.innerHeight
	}
	return undefined
}

/**
 * Checks if the screen is currently in portrait orientation.
 * @returns {boolean | undefined} True if portrait, false if landscape, undefined if not in a browser.
 * @example
 * ```ts
 * import { isPortrait } from '@rtorcato/browser-common/screen'
 * if (isPortrait()) renderStacked()
 * ```
 */
export function isPortrait(): boolean | undefined {
	if (typeof window !== 'undefined') {
		return window.innerHeight >= window.innerWidth
	}
	return undefined
}

/**
 * Requests the browser to enter fullscreen mode for a given element.
 * @param element The element to make fullscreen (defaults to document.documentElement).
 * @returns {Promise<void> | undefined} A promise that resolves when fullscreen is entered, or undefined if not supported.
 * @example
 * ```ts
 * import { enterFullscreen } from '@rtorcato/browser-common/screen'
 * button.addEventListener('click', () => enterFullscreen())
 * ```
 */
export function enterFullscreen(element?: HTMLElement): Promise<void> | undefined {
	if (typeof document !== 'undefined') {
		const el = element || document.documentElement
		if (el.requestFullscreen) {
			return el.requestFullscreen()
		}
	}
	return undefined
}

/**
 * Exits fullscreen mode if currently active.
 * @returns {Promise<void> | undefined} A promise that resolves when fullscreen is exited, or undefined if not supported.
 * @example
 * ```ts
 * import { exitFullscreen } from '@rtorcato/browser-common/screen'
 * await exitFullscreen()
 * ```
 */
export function exitFullscreen(): Promise<void> | undefined {
	if (typeof document !== 'undefined' && document.exitFullscreen) {
		return document.exitFullscreen()
	}
	return undefined
}

/**
 * Checks if the browser is currently in fullscreen mode.
 * @returns {boolean | undefined} True if in fullscreen, false otherwise, or undefined if not in a browser.
 * @example
 * ```ts
 * import { isFullscreen } from '@rtorcato/browser-common/screen'
 * if (isFullscreen()) showExitHint()
 * ```
 */
export function isFullscreen(): boolean | undefined {
	if (typeof document !== 'undefined') {
		return !!document.fullscreenElement
	}
	return undefined
}
