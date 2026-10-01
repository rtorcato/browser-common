/**
 * Checks if the DeviceOrientation API is available in the browser.
 * @returns {boolean} True if DeviceOrientationEvent is supported, false otherwise.
 * @example
 * ```ts
 * import { isDeviceOrientationAvailable } from '@rtorcato/browser-common/orientation'
 * if (isDeviceOrientationAvailable()) listen()
 * ```
 */
export function isDeviceOrientationAvailable(): boolean {
	return typeof window !== 'undefined' && 'DeviceOrientationEvent' in window
}

/**
 * Adds a listener for device orientation changes.
 * @param callback The callback to run on orientation change.
 * @returns {() => void} A function to remove the event listener.
 * @example
 * ```ts
 * import { onDeviceOrientation } from '@rtorcato/browser-common/orientation'
 * const off = onDeviceOrientation((e) => console.log(e.alpha, e.beta, e.gamma))
 * off()
 * ```
 */
export function onDeviceOrientation(callback: (event: DeviceOrientationEvent) => void): () => void {
	if (!isDeviceOrientationAvailable()) return () => {}
	window.addEventListener('deviceorientation', callback)
	return () => window.removeEventListener('deviceorientation', callback)
}

/**
 * Gets the current screen orientation type (e.g., 'portrait-primary', 'landscape-primary').
 * @returns {string | undefined} The orientation type, or undefined if not available.
 * @example
 * ```ts
 * import { getScreenOrientationType } from '@rtorcato/browser-common/orientation'
 * const type = getScreenOrientationType()
 * ```
 */
export function getScreenOrientationType(): string | undefined {
	if (typeof window !== 'undefined' && window.screen && 'orientation' in window.screen) {
		return window.screen.orientation.type
	}
	return undefined
}

/**
 * Orientation values accepted by `screen.orientation.lock()`. Declared locally because
 * `OrientationLockType` is missing from some TypeScript `lib.dom` versions.
 */
export type OrientationLockType =
	| 'any'
	| 'natural'
	| 'landscape'
	| 'portrait'
	| 'portrait-primary'
	| 'portrait-secondary'
	| 'landscape-primary'
	| 'landscape-secondary'

/** `ScreenOrientation` narrowed to `lock`, which some `lib.dom` versions omit. */
type LockableOrientation = { lock?: (type: OrientationLockType) => Promise<void> }

/**
 * Locks the screen orientation to a specific type (if supported).
 * @param type The orientation type (e.g., 'portrait-primary', 'landscape-primary').
 * @returns {Promise<void> | undefined} A promise that resolves when locked, or undefined if not supported.
 * @example
 * ```ts
 * import { lockScreenOrientation } from '@rtorcato/browser-common/orientation'
 * await lockScreenOrientation('landscape-primary')
 * ```
 */
export function lockScreenOrientation(type: OrientationLockType): Promise<void> | undefined {
	if (typeof window === 'undefined' || !window.screen || !('orientation' in window.screen)) {
		return undefined
	}
	const orientation = window.screen.orientation as unknown as LockableOrientation
	return typeof orientation.lock === 'function' ? orientation.lock(type) : undefined
}

/**
 * Unlocks the screen orientation (if supported).
 * @returns {void}
 * @example
 * ```ts
 * import { unlockScreenOrientation } from '@rtorcato/browser-common/orientation'
 * unlockScreenOrientation()
 * ```
 */
export function unlockScreenOrientation(): void {
	if (
		typeof window !== 'undefined' &&
		window.screen &&
		'orientation' in window.screen &&
		typeof window.screen.orientation.unlock === 'function'
	) {
		window.screen.orientation.unlock()
	}
}
