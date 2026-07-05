/**
 * Checks if the Screen Capture API (`getDisplayMedia`) is available.
 * @returns {boolean} True if available, false otherwise.
 * @example
 * ```ts
 * import { isScreenCaptureAvailable } from '@rtorcato/browser-common/screencapture'
 * if (isScreenCaptureAvailable()) showShareButton()
 * ```
 */
export function isScreenCaptureAvailable(): boolean {
	return (
		typeof navigator !== 'undefined' &&
		!!navigator.mediaDevices &&
		typeof navigator.mediaDevices.getDisplayMedia === 'function'
	)
}

/**
 * Prompts the user to share a screen, window, or tab and returns the stream.
 * @param options Optional display-media constraints.
 * @returns A promise resolving to the captured MediaStream.
 * @throws If called where Screen Capture is unsupported.
 * @example
 * ```ts
 * import { getDisplayMedia } from '@rtorcato/browser-common/screencapture'
 * const stream = await getDisplayMedia({ video: true })
 * ```
 */
export function getDisplayMedia(options?: DisplayMediaStreamOptions): Promise<MediaStream> {
	if (!isScreenCaptureAvailable()) {
		throw new Error('getDisplayMedia requires a browser environment with Screen Capture support')
	}
	return navigator.mediaDevices.getDisplayMedia(options)
}
