/**
 * Checks if Service Workers are available in the current browser.
 * @returns {boolean} True if available, false otherwise.
 * @example
 * ```ts
 * import { isServiceWorkerAvailable } from '@rtorcato/browser-common/serviceworkers'
 * if (isServiceWorkerAvailable()) register()
 * ```
 */
export function isServiceWorkerAvailable(): boolean {
	return typeof navigator !== 'undefined' && 'serviceWorker' in navigator
}

/**
 * Registers a service worker script.
 * @param scriptUrl The URL of the service worker script.
 * @param options Optional ServiceWorkerRegistration options.
 * @returns {Promise<ServiceWorkerRegistration | undefined>} The registration or undefined if not supported.
 * @example
 * ```ts
 * import { registerServiceWorker } from '@rtorcato/browser-common/serviceworkers'
 * const reg = await registerServiceWorker('/sw.js', { scope: '/' })
 * ```
 */
export async function registerServiceWorker(
	scriptUrl: string,
	options?: RegistrationOptions
): Promise<ServiceWorkerRegistration | undefined> {
	if (!isServiceWorkerAvailable()) return undefined
	try {
		return await navigator.serviceWorker.register(scriptUrl, options)
	} catch {
		return undefined
	}
}

/**
 * Unregisters all service workers for the current origin.
 * @returns {Promise<boolean>} True if all were unregistered, false otherwise.
 * @example
 * ```ts
 * import { unregisterAllServiceWorkers } from '@rtorcato/browser-common/serviceworkers'
 * await unregisterAllServiceWorkers()
 * ```
 */
export async function unregisterAllServiceWorkers(): Promise<boolean> {
	if (!isServiceWorkerAvailable()) return false
	const regs = await navigator.serviceWorker.getRegistrations()
	await Promise.all(regs.map((reg) => reg.unregister()))
	return true
}

/**
 * Gets the current active service worker registration, if any.
 * @returns {Promise<ServiceWorkerRegistration | undefined>} The registration or undefined.
 * @example
 * ```ts
 * import { getServiceWorkerRegistration } from '@rtorcato/browser-common/serviceworkers'
 * const reg = await getServiceWorkerRegistration()
 * ```
 */
export async function getServiceWorkerRegistration(): Promise<
	ServiceWorkerRegistration | undefined
> {
	if (!isServiceWorkerAvailable()) return undefined
	return await navigator.serviceWorker.getRegistration()
}

/**
 * Sends a message to the active service worker.
 * @param message The message to send.
 * @returns {void}
 * @example
 * ```ts
 * import { postMessageToServiceWorker } from '@rtorcato/browser-common/serviceworkers'
 * postMessageToServiceWorker({ type: 'skipWaiting' })
 * ```
 */
export function postMessageToServiceWorker(message: unknown): void {
	if (isServiceWorkerAvailable() && navigator.serviceWorker.controller) {
		navigator.serviceWorker.controller.postMessage(message)
	}
}
