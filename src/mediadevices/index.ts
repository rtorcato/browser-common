/**
 * Checks if the MediaDevices API is available in the browser.
 * @returns {boolean} True if MediaDevices is available, false otherwise.
 * @example
 * ```ts
 * import { isMediaDevicesAvailable } from '@rtorcato/browser-common/mediadevices'
 * if (isMediaDevicesAvailable()) startCamera()
 * ```
 */
export function isMediaDevicesAvailable(): boolean {
	return typeof navigator !== 'undefined' && !!navigator.mediaDevices
}

/**
 * Gets a list of available media input and output devices.
 * @returns {Promise<MediaDeviceInfo[]>} A promise that resolves to an array of MediaDeviceInfo objects.
 * @example
 * ```ts
 * import { getMediaDevices } from '@rtorcato/browser-common/mediadevices'
 * const devices = await getMediaDevices()
 * const cams = devices.filter((d) => d.kind === 'videoinput')
 * ```
 */
export async function getMediaDevices(): Promise<MediaDeviceInfo[]> {
	if (!isMediaDevicesAvailable()) return []
	return await navigator.mediaDevices.enumerateDevices()
}

/**
 * Requests access to the user's camera and/or microphone.
 * @param constraints MediaStreamConstraints for audio/video.
 * @returns {Promise<MediaStream>} A promise that resolves to a MediaStream.
 * @remarks
 * Requires HTTPS, user permission, and a user gesture.
 * @example
 * ```ts
 * import { getUserMedia, stopMediaStream } from '@rtorcato/browser-common/mediadevices'
 * const stream = await getUserMedia({ video: true, audio: true })
 * stopMediaStream(stream)
 * ```
 */
export async function getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
	if (!isMediaDevicesAvailable()) throw new Error('MediaDevices API not available')
	return await navigator.mediaDevices.getUserMedia(constraints)
}

/**
 * Stops all tracks in a given MediaStream.
 * @param stream The MediaStream to stop.
 * @example
 * ```ts
 * import { stopMediaStream } from '@rtorcato/browser-common/mediadevices'
 * stopMediaStream(stream)
 * ```
 */
export function stopMediaStream(stream: MediaStream): void {
	for (const track of stream.getTracks()) {
		track.stop()
	}
}

/**
 * Checks if the browser supports media device permissions API.
 * @returns {boolean} True if permissions API is available, false otherwise.
 * @example
 * ```ts
 * import { isPermissionsApiAvailable } from '@rtorcato/browser-common/mediadevices'
 * if (isPermissionsApiAvailable()) checkCameraPerm()
 * ```
 */
export function isPermissionsApiAvailable(): boolean {
	return typeof navigator !== 'undefined' && 'permissions' in navigator
}

/**
 * Checks the permission status for a given media device (e.g., 'camera', 'microphone').
 * @param name The permission name ('camera' | 'microphone').
 * @returns {Promise<PermissionStatus | undefined>} The permission status, or undefined if not available.
 * @example
 * ```ts
 * import { getMediaPermissionStatus } from '@rtorcato/browser-common/mediadevices'
 * const status = await getMediaPermissionStatus('camera')
 * console.log(status?.state)
 * ```
 */
export async function getMediaPermissionStatus(
	name: 'camera' | 'microphone'
): Promise<PermissionStatus | undefined> {
	if (!isPermissionsApiAvailable()) return undefined
	try {
		return await navigator.permissions.query({ name })
	} catch {
		return undefined
	}
}
