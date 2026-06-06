/**
 * Checks if the Pointer Events API is available in the current environment.
 * @example
 * ```ts
 * import { isPointerEventsAvailable } from '@rtorcato/browser-common/pointerevents'
 * if (isPointerEventsAvailable()) attachPointerHandlers()
 * ```
 */
export function isPointerEventsAvailable(): boolean {
	return typeof window !== 'undefined' && 'PointerEvent' in window
}

/**
 * Pointer event types that can be subscribed to via {@link onPointer}.
 */
export type PointerEventType =
	| 'pointerdown'
	| 'pointerup'
	| 'pointermove'
	| 'pointerover'
	| 'pointerout'
	| 'pointerenter'
	| 'pointerleave'
	| 'pointercancel'
	| 'gotpointercapture'
	| 'lostpointercapture'

/**
 * Attaches a pointer event listener to an element and returns an unsubscribe function.
 * @param element The element to listen on.
 * @param type The pointer event type (e.g., 'pointerdown', 'pointermove').
 * @param handler The event handler.
 * @param options Optional addEventListener options.
 * @returns A function that removes the listener when called.
 * @example
 * ```ts
 * import { onPointer } from '@rtorcato/browser-common/pointerevents'
 * const off = onPointer(canvas, 'pointerdown', (e) => draw(e.clientX, e.clientY))
 * off()
 * ```
 */
export function onPointer(
	element: Element | Window | Document,
	type: PointerEventType,
	handler: (event: PointerEvent) => void,
	options?: AddEventListenerOptions
): () => void {
	const wrapped = (e: Event) => handler(e as PointerEvent)
	element.addEventListener(type, wrapped, options)
	return () => element.removeEventListener(type, wrapped, options)
}

/**
 * Returns the input device type that produced a pointer event.
 * @param event The PointerEvent.
 * @returns 'mouse', 'pen', 'touch', or '' when unknown.
 * @example
 * ```ts
 * import { getPointerType } from '@rtorcato/browser-common/pointerevents'
 * canvas.addEventListener('pointerdown', (e) => {
 *   if (getPointerType(e) === 'pen') startStroke(e)
 * })
 * ```
 */
export function getPointerType(event: PointerEvent): 'mouse' | 'pen' | 'touch' | '' {
	const t = event.pointerType
	if (t === 'mouse' || t === 'pen' || t === 'touch') return t
	return ''
}

/**
 * Returns true if the pointer event is the primary pointer of its type.
 * Useful for ignoring duplicate touch contacts during multi-touch.
 * @param event The PointerEvent.
 * @example
 * ```ts
 * import { isPrimaryPointer } from '@rtorcato/browser-common/pointerevents'
 * el.addEventListener('pointerdown', (e) => { if (isPrimaryPointer(e)) startDrag(e) })
 * ```
 */
export function isPrimaryPointer(event: PointerEvent): boolean {
	return event.isPrimary === true
}
