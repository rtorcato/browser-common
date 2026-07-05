/**
 * Checks if the DeviceMotion API is available in the browser.
 * @returns {boolean} True if DeviceMotionEvent is supported, false otherwise.
 * @example
 * ```ts
 * import { isDeviceMotionAvailable } from '@rtorcato/browser-common/motion'
 * if (isDeviceMotionAvailable()) listen()
 * ```
 */
export function isDeviceMotionAvailable(): boolean {
	return typeof window !== 'undefined' && 'DeviceMotionEvent' in window
}

/**
 * Adds a listener for device motion events.
 * @param callback The callback to run on device motion.
 * @returns {() => void} A function to remove the event listener.
 * @example
 * ```ts
 * import { onDeviceMotion } from '@rtorcato/browser-common/motion'
 * const off = onDeviceMotion((e) => console.log(e.acceleration))
 * off()
 * ```
 */
export function onDeviceMotion(callback: (event: DeviceMotionEvent) => void): () => void {
	if (!isDeviceMotionAvailable()) return () => {}
	window.addEventListener('devicemotion', callback)
	return () => window.removeEventListener('devicemotion', callback)
}

/**
 * Checks if the browser supports the Generic Sensor API for motion sensors.
 * @returns {boolean} True if supported, false otherwise.
 * @example
 * ```ts
 * import { isGenericSensorApiAvailable } from '@rtorcato/browser-common/motion'
 * if (isGenericSensorApiAvailable()) startSensor()
 * ```
 */
export function isGenericSensorApiAvailable(): boolean {
	return typeof window !== 'undefined' && 'LinearAccelerationSensor' in window
}

/**
 * Requests permission for motion and orientation events (iOS 13+).
 * @returns {Promise<'granted' | 'denied' | 'default'>} The permission state.
 * @remarks
 * Required on iOS Safari; must be called from a user gesture.
 * @example
 * ```ts
 * import { requestMotionPermission } from '@rtorcato/browser-common/motion'
 * button.addEventListener('click', async () => {
 *   if ((await requestMotionPermission()) === 'granted') listen()
 * })
 * ```
 */
export async function requestMotionPermission(): Promise<'granted' | 'denied' | 'default'> {
	if (
		typeof DeviceMotionEvent !== 'undefined' &&
		typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> })
			.requestPermission === 'function'
	) {
		// @ts-expect-error — DeviceMotionEvent.requestPermission not in lib.dom (iOS Safari only)
		return await DeviceMotionEvent.requestPermission()
	}
	return 'granted'
}
