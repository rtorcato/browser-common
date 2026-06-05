import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { clearWatch, getCurrentPosition, isGeolocationAvailable, watchPosition } from '.'

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

const samplePosition = {
	coords: { latitude: 37.7749, longitude: -122.4194, accuracy: 10 },
	timestamp: 1234567890,
} as unknown as GeolocationPosition

describe('isGeolocationAvailable', () => {
	it('returns true when navigator.geolocation exists', () => {
		setNavigator({ geolocation: {} })
		expect(isGeolocationAvailable()).toBe(true)
	})

	it('returns false when navigator.geolocation is missing', () => {
		setNavigator({})
		expect(isGeolocationAvailable()).toBe(false)
	})
})

describe('getCurrentPosition', () => {
	it('resolves with the position returned by navigator.geolocation', async () => {
		const getCurrentPositionMock = vi.fn((success: PositionCallback) => success(samplePosition))
		setNavigator({ geolocation: { getCurrentPosition: getCurrentPositionMock } })

		await expect(getCurrentPosition()).resolves.toBe(samplePosition)
		expect(getCurrentPositionMock).toHaveBeenCalledOnce()
	})

	it('forwards options through to the underlying API', async () => {
		const options: PositionOptions = { enableHighAccuracy: true, timeout: 5000 }
		const getCurrentPositionMock = vi.fn((success: PositionCallback) => success(samplePosition))
		setNavigator({ geolocation: { getCurrentPosition: getCurrentPositionMock } })

		await getCurrentPosition(options)

		expect(getCurrentPositionMock).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			options
		)
	})

	it('rejects when the underlying API errors', async () => {
		const positionError = { code: 1, message: 'denied' } as GeolocationPositionError
		const getCurrentPositionMock = vi.fn(
			(_success: PositionCallback, error: PositionErrorCallback | undefined) =>
				error?.(positionError)
		)
		setNavigator({ geolocation: { getCurrentPosition: getCurrentPositionMock } })

		await expect(getCurrentPosition()).rejects.toBe(positionError)
	})

	it('rejects when geolocation API is unavailable', async () => {
		setNavigator({})
		await expect(getCurrentPosition()).rejects.toThrow('Geolocation is not available')
	})
})

describe('watchPosition', () => {
	it('returns the watch ID from navigator.geolocation.watchPosition', () => {
		const watchPositionMock = vi.fn(() => 42)
		setNavigator({ geolocation: { watchPosition: watchPositionMock } })

		const id = watchPosition(() => {})

		expect(id).toBe(42)
		expect(watchPositionMock).toHaveBeenCalledOnce()
	})

	it('returns undefined when geolocation API is unavailable', () => {
		setNavigator({})
		expect(watchPosition(() => {})).toBeUndefined()
	})
})

describe('clearWatch', () => {
	it('calls navigator.geolocation.clearWatch with the given id', () => {
		const clearWatchMock = vi.fn()
		setNavigator({ geolocation: { clearWatch: clearWatchMock } })

		clearWatch(7)

		expect(clearWatchMock).toHaveBeenCalledWith(7)
	})

	it('is a no-op when geolocation API is unavailable', () => {
		setNavigator({})
		expect(() => clearWatch(7)).not.toThrow()
	})
})
