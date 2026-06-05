/**
 * Creates a ResizeObserver and starts observing the given element.
 * @param element The element to observe.
 * @param callback The callback to run when the element is resized.
 * @param options Optional ResizeObserver options.
 * @returns The created ResizeObserver instance.
 * @example
 * ```ts
 * import { observeResize, disconnectResizeObserver } from '@rtorcato/browser-common/resizeobserver'
 * const obs = observeResize(panel, (entries) => console.log(entries[0]?.contentRect))
 * disconnectResizeObserver(obs)
 * ```
 */
export function observeResize(
	element: Element,
	callback: ResizeObserverCallback,
	options?: ResizeObserverOptions
): ResizeObserver {
	const observer = new ResizeObserver(callback)
	observer.observe(element, options)
	return observer
}

/**
 * Disconnects a ResizeObserver, stopping all observations.
 * @param observer The ResizeObserver instance.
 * @example
 * ```ts
 * import { disconnectResizeObserver } from '@rtorcato/browser-common/resizeobserver'
 * disconnectResizeObserver(obs)
 * ```
 */
export function disconnectResizeObserver(observer: ResizeObserver): void {
	observer.disconnect()
}

/**
 * Utility to observe an element for resize once (fires callback only on first resize).
 * @param element The element to observe.
 * @param callback The callback to run on first resize.
 * @param options Optional ResizeObserver options.
 * @returns The created ResizeObserver instance.
 * @example
 * ```ts
 * import { observeResizeOnce } from '@rtorcato/browser-common/resizeobserver'
 * observeResizeOnce(panel, () => console.log('first resize'))
 * ```
 */
export function observeResizeOnce(
	element: Element,
	callback: ResizeObserverCallback,
	options?: ResizeObserverOptions
): ResizeObserver {
	const observer = new ResizeObserver((entries, obs) => {
		callback(entries, obs)
		obs.disconnect()
	})
	observer.observe(element, options)
	return observer
}
