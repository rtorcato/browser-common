/**
 * Creates a ResizeObserver and starts observing the given element.
 * @param element The element to observe.
 * @param callback The callback to run when the element is resized.
 * @param options Optional ResizeObserver options.
 * @returns The created ResizeObserver instance.
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
