/**
 * Checks if the Page Visibility API is available in the current environment.
 * @returns {boolean} True if `document.visibilityState` exists, false otherwise.
 * @example
 * ```ts
 * import { isVisibilityAvailable } from '@rtorcato/browser-common/visibility'
 * if (isVisibilityAvailable()) pauseWhenHidden()
 * ```
 */
export function isVisibilityAvailable(): boolean {
	return typeof document !== 'undefined' && 'visibilityState' in document
}

/**
 * Gets the page's current visibility state, or null if unsupported.
 * @returns `'visible'` or `'hidden'`, or null where the Page Visibility API is unavailable.
 * @example
 * ```ts
 * import { getVisibilityState } from '@rtorcato/browser-common/visibility'
 * console.log(getVisibilityState()) // 'visible'
 * ```
 */
export function getVisibilityState(): DocumentVisibilityState | null {
	return isVisibilityAvailable() ? document.visibilityState : null
}

/**
 * Checks whether the page is currently visible.
 * @returns True if visible, false if hidden, or null where the Page Visibility API is unavailable.
 * @example
 * ```ts
 * import { isPageVisible } from '@rtorcato/browser-common/visibility'
 * if (isPageVisible()) refreshData()
 * ```
 */
export function isPageVisible(): boolean | null {
	const state = getVisibilityState()
	return state === null ? null : state === 'visible'
}

/**
 * Listens for page visibility changes.
 * @param callback Called with the new visibility state on each `visibilitychange` event.
 * @returns A function that removes the listener (a no-op where unsupported).
 * @example
 * ```ts
 * import { onVisibilityChange } from '@rtorcato/browser-common/visibility'
 * const off = onVisibilityChange((state) => (state === 'hidden' ? pause() : resume()))
 * off()
 * ```
 */
export function onVisibilityChange(callback: (state: DocumentVisibilityState) => void): () => void {
	if (!isVisibilityAvailable()) return () => {}
	const handler = () => callback(document.visibilityState)
	document.addEventListener('visibilitychange', handler)
	return () => document.removeEventListener('visibilitychange', handler)
}
