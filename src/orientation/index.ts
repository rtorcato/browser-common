/**
 * Checks if the DeviceOrientation API is available in the browser.
 * @returns {boolean} True if DeviceOrientationEvent is supported, false otherwise.
 */
export function isDeviceOrientationAvailable(): boolean {
	return typeof window !== 'undefined' && 'DeviceOrientationEvent' in window
}

/**
 * Adds a listener for device orientation changes.
 * @param callback The callback to run on orientation change.
 * @returns {() => void} A function to remove the event listener.
 */
export function onDeviceOrientation(callback: (event: DeviceOrientationEvent) => void): () => void {
	if (!isDeviceOrientationAvailable()) return () => {}
	window.addEventListener('deviceorientation', callback)
	return () => window.removeEventListener('deviceorientation', callback)
}

/**
 * Gets the current screen orientation type (e.g., 'portrait-primary', 'landscape-primary').
 * @returns {string | undefined} The orientation type, or undefined if not available.
 */
export function getScreenOrientationType(): string | undefined {
	if (typeof window !== 'undefined' && window.screen && 'orientation' in window.screen) {
		return window.screen.orientation.type
	}
	return undefined
}

/**
 * Locks the screen orientation to a specific type (if supported).
 * @param type The orientation type (e.g., 'portrait-primary', 'landscape-primary').
 * @returns {Promise<void> | undefined} A promise that resolves when locked, or undefined if not supported.
 */
export function lockScreenOrientation(type: OrientationLockType): Promise<void> | undefined {
	if (
		typeof window !== 'undefined' &&
		window.screen &&
		'orientation' in window.screen &&
		typeof window.screen.orientation.lock === 'function'
	) {
		return window.screen.orientation.lock(type)
	}
	return undefined
}

/**
 * Unlocks the screen orientation (if supported).
 * @returns {void}
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
