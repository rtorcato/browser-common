/**
 * Type definition for BackgroundFetchOptions.
 * Adjust properties as needed based on your requirements and browser support.
 */
type BackgroundFetchOptions = {
	icons?: Array<{ sizes: string; src: string; type: string }>
	title?: string
	downloadTotal?: number
}

/**
 * Minimal type definition for BackgroundFetchRegistration.
 * Extend as needed based on your requirements and browser support.
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type BackgroundFetchRegistration = any

/**
 * Checks if Background Tasks (Background Sync or Background Fetch) are available in the current environment.
 */
export function isBackgroundSyncAvailable(): boolean {
	return typeof self !== 'undefined' && 'SyncManager' in self
}

export function isBackgroundFetchAvailable(): boolean {
	return typeof self !== 'undefined' && 'BackgroundFetchManager' in self
}

/**
 * Registers a background sync task (if supported).
 * @param tag The sync event tag name.
 * @returns A promise that resolves when registered, or undefined if not supported.
 */
export async function registerBackgroundSync(tag: string): Promise<void> {
	if (!isBackgroundSyncAvailable() || !('serviceWorker' in navigator)) return
	const registration = await navigator.serviceWorker.ready
	// @ts-ignore
	await registration.sync.register(tag)
}

/**
 * Registers a background fetch task (if supported).
 * @param tag The fetch event tag name.
 * @param urls The URLs to fetch.
 * @param options Optional BackgroundFetchOptions.
 * @returns A promise that resolves to the BackgroundFetchRegistration, or undefined if not supported.
 */
export async function registerBackgroundFetch(
	tag: string,
	urls: string[],
	options?: BackgroundFetchOptions
): Promise<BackgroundFetchRegistration | undefined> {
	if (!isBackgroundFetchAvailable() || !('serviceWorker' in navigator)) return undefined
	const registration = await navigator.serviceWorker.ready
	// @ts-ignore
	return registration.backgroundFetch.fetch(tag, urls, options)
}
