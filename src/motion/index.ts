/**
 * Checks if the DeviceMotion API is available in the browser.
 * @returns {boolean} True if DeviceMotionEvent is supported, false otherwise.
 */
export function isDeviceMotionAvailable(): boolean {
	return typeof window !== 'undefined' && 'DeviceMotionEvent' in window
}

/**
 * Adds a listener for device motion events.
 * @param callback The callback to run on device motion.
 * @returns {() => void} A function to remove the event listener.
 */
export function onDeviceMotion(callback: (event: DeviceMotionEvent) => void): () => void {
	if (!isDeviceMotionAvailable()) return () => {}
	window.addEventListener('devicemotion', callback)
	return () => window.removeEventListener('devicemotion', callback)
}

/**
 * Checks if the browser supports the Generic Sensor API for motion sensors.
 * @returns {boolean} True if supported, false otherwise.
 */
export function isGenericSensorApiAvailable(): boolean {
	return typeof window !== 'undefined' && 'LinearAccelerationSensor' in window
}

/**
 * Requests permission for motion and orientation events (iOS 13+).
 * @returns {Promise<'granted' | 'denied' | 'default'>} The permission state.
 */
export async function requestMotionPermission(): Promise<'granted' | 'denied' | 'default'> {
	// @ts-ignore
	if (
		typeof DeviceMotionEvent !== 'undefined' &&
		typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> })
			.requestPermission === 'function'
	) {
		// @ts-ignore
		return await DeviceMotionEvent.requestPermission()
	}
	return 'granted'
}
