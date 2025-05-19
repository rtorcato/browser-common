/**
 * Requests the browser to enter fullscreen mode for a given element.
 * @param element The element to make fullscreen (defaults to document.documentElement).
 * @returns {Promise<void> | undefined} A promise that resolves when fullscreen is entered, or undefined if not supported.
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
 */
export function isFullscreen(): boolean | undefined {
	if (typeof document !== 'undefined') {
		return !!document.fullscreenElement
	}
	return undefined
}

/**
 * Adds a listener for fullscreen change events.
 * @param callback The callback to run on fullscreen change.
 * @returns {() => void} A function to remove the event listener.
 */
export function onFullscreenChange(callback: () => void): () => void {
	if (typeof document === 'undefined') return () => {}
	document.addEventListener('fullscreenchange', callback)
	return () => document.removeEventListener('fullscreenchange', callback)
}
