/**
 * Checks if the Web Animations API (`Element.animate`) is available.
 * @returns {boolean} True if available, false otherwise.
 * @example
 * ```ts
 * import { isWebAnimationsAvailable } from '@rtorcato/browser-common/webanimations'
 * if (isWebAnimationsAvailable()) fadeIn(el)
 * ```
 */
export function isWebAnimationsAvailable(): boolean {
	return typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function'
}

/**
 * Animates an element imperatively via the Web Animations API.
 * @param element The element to animate.
 * @param keyframes The keyframes (array or property-indexed object).
 * @param options Timing options (duration number or KeyframeAnimationOptions).
 * @returns The running Animation, or null if the API is unavailable.
 * @example
 * ```ts
 * import { animateElement } from '@rtorcato/browser-common/webanimations'
 * const anim = animateElement(el, [{ opacity: 0 }, { opacity: 1 }], 300)
 * await anim?.finished
 * ```
 */
export function animateElement(
	element: Element,
	keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
	options?: number | KeyframeAnimationOptions
): Animation | null {
	if (!isWebAnimationsAvailable()) return null
	return element.animate(keyframes, options)
}
