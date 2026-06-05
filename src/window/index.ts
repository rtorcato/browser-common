/**
 * Opens a new browser window or tab with the given URL.
 * @param url The URL to open.
 * @param target The target window name (e.g., '_blank', '_self').
 * @param features Optional features string (e.g., 'width=600,height=400').
 * @returns {Window | null} The window object or null if blocked.
 * @example
 * ```ts
 * import { openWindow } from '@rtorcato/browser-common/window'
 * openWindow('https://example.com', '_blank')
 * ```
 */
export function openWindow(
	url: string,
	target: string = '_blank',
	features?: string
): Window | null {
	return window.open(url, target, features)
}

/**
 * Closes the current browser window (if allowed).
 * @example
 * ```ts
 * import { closeWindow } from '@rtorcato/browser-common/window'
 * closeWindow()
 * ```
 */
export function closeWindow(): void {
	window.close()
}

/**
 * Focuses the current browser window.
 * @example
 * ```ts
 * import { focusWindow } from '@rtorcato/browser-common/window'
 * focusWindow()
 * ```
 */
export function focusWindow(): void {
	window.focus()
}

/**
 * Blurs (removes focus from) the current browser window.
 * @example
 * ```ts
 * import { blurWindow } from '@rtorcato/browser-common/window'
 * blurWindow()
 * ```
 */
export function blurWindow(): void {
	window.blur()
}

/**
 * Scrolls the window to the top.
 * @param behavior The scroll behavior ('auto' or 'smooth').
 * @example
 * ```ts
 * import { scrollToTop } from '@rtorcato/browser-common/window'
 * scrollToTop('smooth')
 * ```
 */
export function scrollToTop(behavior: ScrollBehavior = 'auto'): void {
	window.scrollTo({ top: 0, behavior })
}

/**
 * Scrolls the window to the bottom.
 * @param behavior The scroll behavior ('auto' or 'smooth').
 * @example
 * ```ts
 * import { scrollToBottom } from '@rtorcato/browser-common/window'
 * scrollToBottom('smooth')
 * ```
 */
export function scrollToBottom(behavior: ScrollBehavior = 'auto'): void {
	window.scrollTo({ top: document.body.scrollHeight, behavior })
}

/**
 * Reloads the current browser window.
 * @param forceReload If true, reloads from the server instead of cache.
 * @example
 * ```ts
 * import { reloadWindow } from '@rtorcato/browser-common/window'
 * reloadWindow()
 * ```
 */
export function reloadWindow(): void {
	window.location.reload()
}

/**
 * Gets the current window size.
 * @returns {{ width: number; height: number }} The window's width and height.
 * @example
 * ```ts
 * import { getWindowSize } from '@rtorcato/browser-common/window'
 * const { width, height } = getWindowSize()
 * ```
 */
export function getWindowSize(): { width: number; height: number } {
	return { width: window.innerWidth, height: window.innerHeight }
}

/**
 * Adds a listener for window resize events.
 * @param callback The callback to run on resize.
 * @returns {() => void} A function to remove the event listener.
 * @example
 * ```ts
 * import { onWindowResize } from '@rtorcato/browser-common/window'
 * const off = onWindowResize(() => console.log(window.innerWidth))
 * off()
 * ```
 */
export function onWindowResize(callback: () => void): () => void {
	window.addEventListener('resize', callback)
	return () => window.removeEventListener('resize', callback)
}
