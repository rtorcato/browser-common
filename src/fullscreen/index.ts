/**
 * Requests the browser to enter fullscreen mode for a given element.
 * @param element The element to make fullscreen (defaults to document.documentElement).
 * @returns {Promise<void> | null} A promise that resolves when fullscreen is entered, or null if not supported.
 * @remarks
 * Must be called from a user gesture handler.
 * @example
 * ```ts
 * import { enterFullscreen } from '@rtorcato/browser-common/fullscreen'
 * button.addEventListener('click', () => enterFullscreen(video))
 * ```
 */
export function enterFullscreen(element?: HTMLElement): Promise<void> | null {
	if (typeof document !== 'undefined') {
		const el = element || document.documentElement
		if (el.requestFullscreen) {
			return el.requestFullscreen()
		}
	}
	return null
}

/**
 * Exits fullscreen mode if currently active.
 * @returns {Promise<void> | null} A promise that resolves when fullscreen is exited, or null if not supported.
 * @example
 * ```ts
 * import { exitFullscreen } from '@rtorcato/browser-common/fullscreen'
 * await exitFullscreen()
 * ```
 */
export function exitFullscreen(): Promise<void> | null {
	if (typeof document !== 'undefined' && document.exitFullscreen) {
		return document.exitFullscreen()
	}
	return null
}

/**
 * Checks if the browser is currently in fullscreen mode.
 * @returns {boolean} True if in fullscreen, false otherwise (including outside a browser).
 * @example
 * ```ts
 * import { isFullscreen } from '@rtorcato/browser-common/fullscreen'
 * if (isFullscreen()) showExitButton()
 * ```
 */
export function isFullscreen(): boolean {
	if (typeof document !== 'undefined') {
		return !!document.fullscreenElement
	}
	return false
}

/**
 * Adds a listener for fullscreen change events.
 * @param callback The callback to run on fullscreen change.
 * @returns {() => void} A function to remove the event listener.
 * @example
 * ```ts
 * import { onFullscreenChange } from '@rtorcato/browser-common/fullscreen'
 * const off = onFullscreenChange(() => console.log('changed'))
 * off()
 * ```
 */
export function onFullscreenChange(callback: () => void): () => void {
	if (typeof document === 'undefined') return () => {}
	document.addEventListener('fullscreenchange', callback)
	return () => document.removeEventListener('fullscreenchange', callback)
}
