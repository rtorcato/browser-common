/**
 * Checks if the Touch Events API is available in the current environment.
 * @example
 * ```ts
 * import { isTouchEventsAvailable } from '@rtorcato/browser-common/touchevents'
 * if (isTouchEventsAvailable()) enableTouchGestures()
 * ```
 */
export function isTouchEventsAvailable(): boolean {
	return typeof window !== 'undefined' && 'TouchEvent' in window
}

/**
 * Touch event types that can be subscribed to via {@link onTouch}.
 */
export type TouchEventType = 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel'

/**
 * Attaches a touch event listener to an element and returns an unsubscribe function.
 * @param element The element to listen on.
 * @param type The touch event type.
 * @param handler The event handler.
 * @param options Optional addEventListener options. Pass `{ passive: false }` if you need to call `preventDefault()`.
 * @returns A function that removes the listener when called.
 * @example
 * ```ts
 * import { onTouch } from '@rtorcato/browser-common/touchevents'
 * const off = onTouch(slider, 'touchmove', (e) => updateSlider(e), { passive: true })
 * off()
 * ```
 */
export function onTouch(
	element: Element | Window | Document,
	type: TouchEventType,
	handler: (event: TouchEvent) => void,
	options?: AddEventListenerOptions
): () => void {
	const wrapped = (e: Event) => handler(e as TouchEvent)
	element.addEventListener(type, wrapped, options)
	return () => element.removeEventListener(type, wrapped, options)
}

/**
 * A simple {x, y} pair extracted from a Touch.
 */
export interface TouchPoint {
	x: number
	y: number
}

/**
 * Returns the client-coordinate points for every currently active touch on the event.
 * Reads from `event.touches` — every contact still on the screen — not `targetTouches`
 * or `changedTouches`.
 * @param event The TouchEvent.
 * @example
 * ```ts
 * import { getTouchPoints } from '@rtorcato/browser-common/touchevents'
 * canvas.addEventListener('touchmove', (e) => {
 *   const points = getTouchPoints(e)
 *   points.forEach((p) => drawDot(p.x, p.y))
 * })
 * ```
 */
export function getTouchPoints(event: TouchEvent): TouchPoint[] {
	const points: TouchPoint[] = []
	for (let i = 0; i < event.touches.length; i++) {
		const t = event.touches[i]
		if (t) points.push({ x: t.clientX, y: t.clientY })
	}
	return points
}

/**
 * Returns the number of currently active touches on the event.
 * Reads from `event.touches.length` — every contact still on the screen — not
 * `targetTouches` or `changedTouches`.
 * @param event The TouchEvent.
 * @example
 * ```ts
 * import { getTouchCount } from '@rtorcato/browser-common/touchevents'
 * canvas.addEventListener('touchstart', (e) => {
 *   if (getTouchCount(e) === 2) startPinch(e)
 * })
 * ```
 */
export function getTouchCount(event: TouchEvent): number {
	return event.touches.length
}
