/**
 * Creates a MutationObserver and starts observing the given element.
 * @param element The element to observe.
 * @param callback The callback to run when mutations occur.
 * @param options MutationObserver options.
 * @returns The created MutationObserver instance.
 */
export function observeMutations(
	element: Node,
	callback: MutationCallback,
	options: MutationObserverInit = { childList: true, subtree: true }
): MutationObserver {
	const observer = new MutationObserver(callback)
	observer.observe(element, options)
	return observer
}

/**
 * Disconnects a MutationObserver, stopping all observations.
 * @param observer The MutationObserver instance.
 */
export function disconnectMutationObserver(observer: MutationObserver): void {
	observer.disconnect()
}

/**
 * Utility to observe an element for mutations once (fires callback only on first mutation).
 * @param element The element to observe.
 * @param callback The callback to run on first mutation.
 * @param options MutationObserver options.
 * @returns The created MutationObserver instance.
 */
export function observeMutationOnce(
	element: Node,
	callback: MutationCallback,
	options: MutationObserverInit = { childList: true, subtree: true }
): MutationObserver {
	const observer = new MutationObserver((mutations, obs) => {
		callback(mutations, obs)
		obs.disconnect()
	})
	observer.observe(element, options)
	return observer
}
