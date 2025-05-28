/**
 * Checks if the Web Share API is supported in the current browser.
 */
export function isWebShareSupported(): boolean {
	return typeof navigator !== 'undefined' && !!navigator.share
}

/**
 * Shares data using the Web Share API.
 * @param data - The data to share (title, text, url, files).
 * @returns A promise that resolves if sharing was successful.
 */
export async function share(data: ShareData): Promise<void> {
	if (!isWebShareSupported()) {
		throw new Error('Web Share API is not supported in this browser.')
	}
	await navigator.share(data)
}

/**
 * Checks if the Web Share API supports sharing files.
 */
export function isFileShareSupported(): boolean {
	return (
		typeof navigator !== 'undefined' &&
		!!navigator.canShare &&
		navigator.canShare({ files: [new File([], '')] })
	)
}
