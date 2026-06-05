/**
 * Checks if the Visual Viewport API is available in the current browser.
 */
export function isVisualViewportAvailable(): boolean {
	return typeof window !== 'undefined' && !!window.visualViewport
}

/** @deprecated Use {@link isVisualViewportAvailable} instead. Will be removed in the next major. */
export const isVisualViewportSupported = isVisualViewportAvailable

/**
 * Information about the current visual viewport.
 */
export interface VisualViewportInfo {
	offsetLeft: number
	offsetTop: number
	width: number
	height: number
	scale: number
}

/**
 * Gets the current visual viewport's properties, or null if not supported.
 */
export function getVisualViewportInfo(): VisualViewportInfo | null {
	if (!isVisualViewportAvailable() || !window.visualViewport) return null
	const v = window.visualViewport
	return {
		offsetLeft: v.offsetLeft,
		offsetTop: v.offsetTop,
		width: v.width,
		height: v.height,
		scale: v.scale,
	}
}

/**
 * Adds listeners for visual viewport resize and scroll events.
 * Returns a function to remove the listeners.
 * @param callback - Function to call on resize or scroll.
 */
export function onVisualViewportChange(callback: () => void): () => void {
	if (!isVisualViewportAvailable() || !window.visualViewport) return () => {}
	const v = window.visualViewport
	v.addEventListener('resize', callback)
	v.addEventListener('scroll', callback)
	return () => {
		v.removeEventListener('resize', callback)
		v.removeEventListener('scroll', callback)
	}
}
