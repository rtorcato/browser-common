/**
 * Checks if the Visual Viewport API is available in the current browser.
 * @example
 * ```ts
 * import { isVisualViewportAvailable } from '@rtorcato/browser-common/visualviewport'
 * if (isVisualViewportAvailable()) trackViewport()
 * ```
 */
export function isVisualViewportAvailable(): boolean {
	return typeof window !== 'undefined' && !!window.visualViewport
}

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
 * @example
 * ```ts
 * import { getVisualViewportInfo } from '@rtorcato/browser-common/visualviewport'
 * const info = getVisualViewportInfo()
 * console.log(info?.scale)
 * ```
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
 * @example
 * ```ts
 * import { onVisualViewportChange } from '@rtorcato/browser-common/visualviewport'
 * const off = onVisualViewportChange(() => updateLayout())
 * off()
 * ```
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
