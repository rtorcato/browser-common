/**
 * Checks if the Vibration API is available in the browser.
 * @returns {boolean}
 * @example
 * ```ts
 * import { isVibrationApiAvailable } from '@rtorcato/browser-common/vibrate'
 * if (isVibrationApiAvailable()) buzz()
 * ```
 */
export function isVibrationApiAvailable(): boolean {
	return typeof window !== 'undefined' && 'vibrate' in window.navigator
}

/**
 * Vibrates the device for the given pattern (if supported).
 * @param pattern A single duration (ms) or an array of durations (vibrate, pause, vibrate, ...).
 * @returns {boolean} True if vibration was triggered, false otherwise.
 * @example
 * ```ts
 * import { vibrate } from '@rtorcato/browser-common/vibrate'
 * vibrate([200, 100, 200])
 * ```
 */
export function vibrate(pattern: number | number[]): boolean {
	if (isVibrationApiAvailable()) {
		return window.navigator.vibrate(pattern)
	}
	return false
}

/**
 * Stops any ongoing vibration (if supported).
 * @returns {boolean} True if vibration was stopped, false otherwise.
 * @example
 * ```ts
 * import { stopVibration } from '@rtorcato/browser-common/vibrate'
 * stopVibration()
 * ```
 */
export function stopVibration(): boolean {
	return vibrate(0)
}

/**
 * Vibrates the device with a short pulse (default 200ms).
 * @param duration Duration in ms (default: 200).
 * @returns {boolean}
 * @example
 * ```ts
 * import { vibratePulse } from '@rtorcato/browser-common/vibrate'
 * vibratePulse(300)
 * ```
 */
export function vibratePulse(duration: number = 200): boolean {
	return vibrate(duration)
}

/**
 * Vibrates the device with a custom pattern for a notification effect.
 * @returns {boolean}
 * @example
 * ```ts
 * import { vibrateNotification } from '@rtorcato/browser-common/vibrate'
 * vibrateNotification()
 * ```
 */
export function vibrateNotification(): boolean {
	// Example: vibrate 100ms, pause 50ms, vibrate 100ms
	return vibrate([100, 50, 100])
}
