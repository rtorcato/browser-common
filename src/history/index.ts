/**
 * Pushes a new entry onto the browser's history stack.
 * @param url The URL to push.
 * @param state Optional state object.
 * @param title Optional title (not widely used).
 * @example
 * ```ts
 * import { pushState } from '@rtorcato/browser-common/history'
 * pushState('/page/2', { page: 2 })
 * ```
 */
export function pushState(url: string, state: unknown = {}, title: string = ''): void {
	if (typeof window !== 'undefined' && window.history && window.history.pushState) {
		window.history.pushState(state, title, url)
	}
}

/**
 * Replaces the current entry on the browser's history stack.
 * @param url The URL to replace with.
 * @param state Optional state object.
 * @param title Optional title (not widely used).
 * @example
 * ```ts
 * import { replaceState } from '@rtorcato/browser-common/history'
 * replaceState('/login', { from: '/dashboard' })
 * ```
 */
export function replaceState(url: string, state: unknown = {}, title: string = ''): void {
	if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
		window.history.replaceState(state, title, url)
	}
}

/**
 * Navigates back in the browser's history.
 * @example
 * ```ts
 * import { goBack } from '@rtorcato/browser-common/history'
 * goBack()
 * ```
 */
export function goBack(): void {
	if (typeof window !== 'undefined' && window.history) {
		window.history.back()
	}
}

/**
 * Navigates forward in the browser's history.
 * @example
 * ```ts
 * import { goForward } from '@rtorcato/browser-common/history'
 * goForward()
 * ```
 */
export function goForward(): void {
	if (typeof window !== 'undefined' && window.history) {
		window.history.forward()
	}
}

/**
 * Navigates to a specific point in the browser's history.
 * @param delta The position in the history stack (e.g., -1 for back, 1 for forward).
 * @example
 * ```ts
 * import { go } from '@rtorcato/browser-common/history'
 * go(-2)
 * ```
 */
export function go(delta: number): void {
	if (typeof window !== 'undefined' && window.history) {
		window.history.go(delta)
	}
}

/**
 * Adds a listener for popstate events (when the active history entry changes).
 * @param callback The callback to run on popstate.
 * @returns {() => void} A function to remove the event listener.
 * @example
 * ```ts
 * import { onPopState } from '@rtorcato/browser-common/history'
 * const off = onPopState((e) => console.log(e.state))
 * off()
 * ```
 */
export function onPopState(callback: (event: PopStateEvent) => void): () => void {
	if (typeof window === 'undefined') return () => {}
	window.addEventListener('popstate', callback)
	return () => window.removeEventListener('popstate', callback)
}
