import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
	getMediaDevices,
	getMediaPermissionStatus,
	getUserMedia,
	isMediaDevicesAvailable,
	isPermissionsApiAvailable,
	stopMediaStream,
} from '.'

const setNavigator = (value: unknown) => {
	Object.defineProperty(globalThis, 'navigator', {
		value,
		configurable: true,
		writable: true,
	})
}

let originalNavigator: Navigator | undefined

beforeEach(() => {
	originalNavigator = globalThis.navigator
})

afterEach(() => {
	setNavigator(originalNavigator)
})

describe('isMediaDevicesAvailable', () => {
	it('returns true when navigator.mediaDevices exists', () => {
		setNavigator({ mediaDevices: {} })
		expect(isMediaDevicesAvailable()).toBe(true)
	})

	it('returns false when missing', () => {
		setNavigator({})
		expect(isMediaDevicesAvailable()).toBe(false)
	})
})

describe('getMediaDevices', () => {
	it('returns the devices array from enumerateDevices', async () => {
		const devices = [
			{ deviceId: 'cam1', kind: 'videoinput', label: 'Camera 1' },
		] as MediaDeviceInfo[]
		const enumerateDevices = vi.fn().mockResolvedValue(devices)
		setNavigator({ mediaDevices: { enumerateDevices } })

		expect(await getMediaDevices()).toBe(devices)
		expect(enumerateDevices).toHaveBeenCalledOnce()
	})

	it('returns [] when mediaDevices is unavailable', async () => {
		setNavigator({})
		expect(await getMediaDevices()).toEqual([])
	})
})

describe('getUserMedia', () => {
	it('calls getUserMedia with the given constraints and returns the stream', async () => {
		const stream = {} as MediaStream
		const getUserMediaMock = vi.fn().mockResolvedValue(stream)
		setNavigator({ mediaDevices: { getUserMedia: getUserMediaMock } })

		const constraints: MediaStreamConstraints = { audio: true, video: false }
		expect(await getUserMedia(constraints)).toBe(stream)
		expect(getUserMediaMock).toHaveBeenCalledWith(constraints)
	})

	it('throws when mediaDevices is unavailable', async () => {
		setNavigator({})
		await expect(getUserMedia({ audio: true })).rejects.toThrow('MediaDevices API not available')
	})
})

describe('stopMediaStream', () => {
	it('calls stop() on every track in the stream', () => {
		const stops = [vi.fn(), vi.fn(), vi.fn()]
		const tracks = stops.map((stop) => ({ stop }) as unknown as MediaStreamTrack)
		const stream = { getTracks: () => tracks } as unknown as MediaStream

		stopMediaStream(stream)

		for (const stop of stops) {
			expect(stop).toHaveBeenCalledOnce()
		}
	})

	it('is a no-op for an empty track list', () => {
		const stream = { getTracks: () => [] } as unknown as MediaStream
		expect(() => stopMediaStream(stream)).not.toThrow()
	})
})

describe('isPermissionsApiAvailable', () => {
	it('returns true when navigator.permissions exists', () => {
		setNavigator({ permissions: {} })
		expect(isPermissionsApiAvailable()).toBe(true)
	})

	it('returns false when missing', () => {
		setNavigator({})
		expect(isPermissionsApiAvailable()).toBe(false)
	})
})

describe('getMediaPermissionStatus', () => {
	it('queries permissions API with the given name and returns the status', async () => {
		const status = { state: 'granted' } as PermissionStatus
		const query = vi.fn().mockResolvedValue(status)
		setNavigator({ permissions: { query } })

		expect(await getMediaPermissionStatus('camera')).toBe(status)
		expect(query).toHaveBeenCalledWith({ name: 'camera' })
	})

	it('returns undefined when permissions API is unavailable', async () => {
		setNavigator({})
		expect(await getMediaPermissionStatus('microphone')).toBeUndefined()
	})

	it('returns undefined when query rejects (unsupported name)', async () => {
		const query = vi.fn().mockRejectedValue(new TypeError('camera not supported'))
		setNavigator({ permissions: { query } })

		expect(await getMediaPermissionStatus('camera')).toBeUndefined()
	})
})
