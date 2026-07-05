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

type BackgroundFetchRegistration = any

/**
 * Checks if Background Tasks (Background Sync or Background Fetch) are available in the current environment.
 * @example
 * ```ts
 * import { isBackgroundSyncAvailable } from '@rtorcato/browser-common/backgroundtasks'
 * if (isBackgroundSyncAvailable()) registerSync()
 * ```
 */
export function isBackgroundSyncAvailable(): boolean {
	return typeof self !== 'undefined' && 'SyncManager' in self
}

/**
 * Checks if the Background Fetch API is available in the current environment.
 * @example
 * ```ts
 * import { isBackgroundFetchAvailable } from '@rtorcato/browser-common/backgroundtasks'
 * if (isBackgroundFetchAvailable()) queueDownload()
 * ```
 */
export function isBackgroundFetchAvailable(): boolean {
	return typeof self !== 'undefined' && 'BackgroundFetchManager' in self
}

/**
 * Registers a background sync task (if supported).
 * @param tag The sync event tag name.
 * @returns A promise that resolves when registered, or undefined if not supported.
 * @example
 * ```ts
 * import { registerBackgroundSync } from '@rtorcato/browser-common/backgroundtasks'
 * await registerBackgroundSync('sync-outbox')
 * ```
 */
export async function registerBackgroundSync(tag: string): Promise<void> {
	if (!isBackgroundSyncAvailable() || !('serviceWorker' in navigator)) return
	const registration = await navigator.serviceWorker.ready
	// @ts-expect-error — Background Sync (SyncManager) not in lib.dom (Chromium-only)
	await registration.sync.register(tag)
}

/**
 * Registers a background fetch task (if supported).
 * @param tag The fetch event tag name.
 * @param urls The URLs to fetch.
 * @param options Optional BackgroundFetchOptions.
 * @returns A promise that resolves to the BackgroundFetchRegistration, or undefined if not supported.
 * @example
 * ```ts
 * import { registerBackgroundFetch } from '@rtorcato/browser-common/backgroundtasks'
 * await registerBackgroundFetch('media', ['/video.mp4'], { title: 'Video' })
 * ```
 */
export async function registerBackgroundFetch(
	tag: string,
	urls: string[],
	options?: BackgroundFetchOptions
): Promise<BackgroundFetchRegistration | undefined> {
	if (!isBackgroundFetchAvailable() || !('serviceWorker' in navigator)) return undefined
	const registration = await navigator.serviceWorker.ready
	// @ts-expect-error — Background Fetch API not in lib.dom (Chromium-only)
	return registration.backgroundFetch.fetch(tag, urls, options)
}
