// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getScreenOrientationType,
	isDeviceOrientationAvailable,
	lockScreenOrientation,
	onDeviceOrientation,
	unlockScreenOrientation,
} from '../orientation/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubOrientation(over: Record<string, unknown> = {}) {
	const add = vi.fn()
	const remove = vi.fn()
	const lock = vi.fn().mockResolvedValue(undefined)
	const unlock = vi.fn()
	vi.stubGlobal('window', {
		DeviceOrientationEvent: class {},
		addEventListener: add,
		removeEventListener: remove,
		screen: { orientation: { type: 'portrait-primary', lock, unlock } },
		...over,
	})
	return { add, remove, lock, unlock }
}

describe('orientation', () => {
	it('isDeviceOrientationAvailable reflects the global', () => {
		expect(isDeviceOrientationAvailable()).toBe(false)
		stubOrientation()
		expect(isDeviceOrientationAvailable()).toBe(true)
	})

	it('onDeviceOrientation wires and unwires the deviceorientation event', () => {
		const { add, remove } = stubOrientation()
		const cb = () => {}
		const off = onDeviceOrientation(cb)
		expect(add).toHaveBeenCalledWith('deviceorientation', cb)
		off()
		expect(remove).toHaveBeenCalledWith('deviceorientation', cb)
	})

	it('reads, locks, and unlocks the screen orientation', () => {
		const { lock, unlock } = stubOrientation()
		expect(getScreenOrientationType()).toBe('portrait-primary')
		lockScreenOrientation('landscape-primary')
		expect(lock).toHaveBeenCalledWith('landscape-primary')
		unlockScreenOrientation()
		expect(unlock).toHaveBeenCalled()
	})

	it('orientation helpers no-op / return undefined without window', () => {
		expect(getScreenOrientationType()).toBeUndefined()
		expect(lockScreenOrientation('any')).toBeUndefined()
		expect(() => unlockScreenOrientation()).not.toThrow()
	})
})
