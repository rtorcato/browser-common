/**
 * Checks if the Web Share API is available in the current browser.
 */
export function isWebShareAvailable(): boolean {
	return typeof navigator !== 'undefined' && !!navigator.share
}

/**
 * @deprecated Use {@link isWebShareAvailable} instead. Will be removed in the next major.
 */
export const isWebShareSupported = isWebShareAvailable

/**
 * Shares data using the Web Share API.
 * @param data - The data to share (title, text, url, files).
 * @returns A promise that resolves if sharing was successful.
 */
export async function share(data: ShareData): Promise<void> {
	if (!isWebShareAvailable()) {
		throw new Error('Web Share API is not supported in this browser.')
	}
	await navigator.share(data)
}

/**
 * Checks if the Web Share API supports sharing files.
 */
export function isFileShareAvailable(): boolean {
	return (
		typeof navigator !== 'undefined' &&
		!!navigator.canShare &&
		navigator.canShare({ files: [new File([], '')] })
	)
}

/**
 * @deprecated Use {@link isFileShareAvailable} instead. Will be removed in the next major.
 */
export const isFileShareSupported = isFileShareAvailable
