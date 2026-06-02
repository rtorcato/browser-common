/**
 * Checks if the Permissions API is available in the current environment.
 */
export function isPermissionsApiAvailable(): boolean {
	return typeof navigator !== 'undefined' && 'permissions' in navigator
}

/**
 * Queries the status of a given permission name (e.g., 'geolocation', 'notifications').
 * @param name The name of the permission to query.
 * @returns A promise resolving to the permission status ('granted', 'denied', or 'prompt'), or undefined if not supported.
 */
export async function queryPermission(name: PermissionName): Promise<PermissionState | undefined> {
	if (!isPermissionsApiAvailable()) return undefined
	try {
		const status = await navigator.permissions.query({ name })
		return status.state
	} catch {
		return undefined
	}
}

/**
 * Adds a change event listener to a permission status object.
 * @param status The PermissionStatus object.
 * @param callback The callback to run on change.
 * @returns A function to remove the event listener.
 */
export function onPermissionChange(status: PermissionStatus, callback: () => void): () => void {
	status.addEventListener('change', callback)
	return () => status.removeEventListener('change', callback)
}
