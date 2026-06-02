/**
 * Checks if the Idle Detection API is available in the browser.
 * @returns {boolean}
 */
export function isIdleDetectionApiAvailable(): boolean {
	return typeof window !== 'undefined' && 'IdleDetector' in window
}

/**
 * Registers a callback to be called when the browser is idle (using requestIdleCallback).
 * Falls back to setTimeout if not available.
 * @param callback The function to call when idle.
 * @param options Optional options for requestIdleCallback.
 * @returns {number} The callback ID (for cancellation).
 */
export function onIdle(
	callback: (deadline?: IdleDeadline) => void,
	options?: IdleRequestOptions
): number {
	if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
		return (window as Window).requestIdleCallback(callback, options)
	}
	// Fallback: call after 200ms
	return (window as Window).setTimeout(() => callback(), 200)
}

/**
 * Cancels an idle callback registered with onIdle.
 * @param id The callback ID returned by onIdle.
 */
export function cancelIdle(id: number): void {
	if ('cancelIdleCallback' in window) {
		window.cancelIdleCallback(id)
	} else {
		clearTimeout(id)
	}
}

/**
 * Uses the Idle Detection API to run a callback when the user/system is idle.
 * Requires permissions and a secure context.
 * @param onIdle Callback when idle.
 * @param onActive Optional callback when user becomes active.
 * @returns {Promise<IdleDetector | null>} The IdleDetector instance, or null if not available.
 */

// Minimal IdleDetector type definition for TypeScript
type IdleDetector = {
	addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
	start: (options: { threshold: number }) => Promise<void>
	userState: 'active' | 'idle'
	screenState: 'locked' | 'unlocked'
}

export async function detectIdle(
	onIdle: () => void,
	onActive?: () => void
): Promise<IdleDetector | null> {
	if (!isIdleDetectionApiAvailable()) return null
	// @ts-expect-error
	const detector = new window.IdleDetector()
	detector.addEventListener('change', () => {
		const { userState, screenState } = detector
		if (userState === 'idle' && screenState === 'unlocked') {
			onIdle()
		} else if (userState === 'active' && onActive) {
			onActive()
		}
	})
	await detector.start({ threshold: 60_000 }) // 1 minute
	return detector
}
