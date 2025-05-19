/**
 * Checks if the Geolocation API is available in the browser.
 * @returns {boolean} True if geolocation is available, false otherwise.
 */
export function isGeolocationAvailable(): boolean {
	return typeof navigator !== 'undefined' && 'geolocation' in navigator
}

/**
 * Gets the current position using the browser's Geolocation API.
 * @param options Optional PositionOptions for geolocation.
 * @returns {Promise<GeolocationPosition>} Resolves with the position or rejects with an error.
 */
export function getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		if (!isGeolocationAvailable()) {
			reject(new Error('Geolocation is not available in this environment.'))
			return
		}
		navigator.geolocation.getCurrentPosition(resolve, reject, options)
	})
}

/**
 * Watches the user's position and calls the callback on each update.
 * @param success Callback for successful position update.
 * @param error Optional callback for errors.
 * @param options Optional PositionOptions for geolocation.
 * @returns {number | undefined} The watch ID, or undefined if not available.
 */
export function watchPosition(
	success: PositionCallback,
	error?: PositionErrorCallback,
	options?: PositionOptions
): number | undefined {
	if (!isGeolocationAvailable()) return undefined
	return navigator.geolocation.watchPosition(success, error, options)
}

/**
 * Clears a geolocation watch by its ID.
 * @param watchId The watch ID returned by watchPosition.
 */
export function clearWatch(watchId: number): void {
	if (isGeolocationAvailable()) {
		navigator.geolocation.clearWatch(watchId)
	}
}
