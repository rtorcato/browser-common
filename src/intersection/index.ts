/**
 * Creates an IntersectionObserver and starts observing the given element.
 * @param element The element to observe.
 * @param callback The callback to run when intersection changes.
 * @param options IntersectionObserver options.
 * @returns The created IntersectionObserver instance.
 * @example
 * ```ts
 * import { observeIntersection, disconnectIntersectionObserver } from '@rtorcato/browser-common/intersection'
 * const obs = observeIntersection(el, (entries) => entries.forEach((e) => console.log(e.isIntersecting)))
 * disconnectIntersectionObserver(obs)
 * ```
 */
export function observeIntersection(
	element: Element,
	callback: IntersectionObserverCallback,
	options?: IntersectionObserverInit
): IntersectionObserver {
	const observer = new IntersectionObserver(callback, options)
	observer.observe(element)
	return observer
}

/**
 * Stops observing the given element with the provided IntersectionObserver.
 * @param observer The IntersectionObserver instance.
 * @param element The element to unobserve.
 * @example
 * ```ts
 * import { unobserveIntersection } from '@rtorcato/browser-common/intersection'
 * unobserveIntersection(obs, el)
 * ```
 */
export function unobserveIntersection(observer: IntersectionObserver, element: Element): void {
	observer.unobserve(element)
}

/**
 * Disconnects the IntersectionObserver, stopping all observations.
 * @param observer The IntersectionObserver instance.
 * @example
 * ```ts
 * import { disconnectIntersectionObserver } from '@rtorcato/browser-common/intersection'
 * disconnectIntersectionObserver(obs)
 * ```
 */
export function disconnectIntersectionObserver(observer: IntersectionObserver): void {
	observer.disconnect()
}

/**
 * Utility to observe an element once (fires callback only on first intersection).
 * @param element The element to observe.
 * @param callback The callback to run on first intersection.
 * @param options IntersectionObserver options.
 * @returns The created IntersectionObserver instance.
 * @example
 * ```ts
 * import { observeOnce } from '@rtorcato/browser-common/intersection'
 * observeOnce(image, () => loadImage(image))
 * ```
 */
export function observeOnce(
	element: Element,
	callback: IntersectionObserverCallback,
	options?: IntersectionObserverInit
): IntersectionObserver {
	const observer = new IntersectionObserver((entries, obs) => {
		callback(entries, obs)
		obs.disconnect()
	}, options)
	observer.observe(element)
	return observer
}
