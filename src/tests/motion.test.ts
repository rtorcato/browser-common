// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	isDeviceMotionAvailable,
	isGenericSensorApiAvailable,
	onDeviceMotion,
	requestMotionPermission,
} from '../motion/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('motion', () => {
	it('availability guards reflect the relevant globals on window', () => {
		expect(isDeviceMotionAvailable()).toBe(false)
		expect(isGenericSensorApiAvailable()).toBe(false)
		vi.stubGlobal('window', { DeviceMotionEvent: class {}, LinearAccelerationSensor: class {} })
		expect(isDeviceMotionAvailable()).toBe(true)
		expect(isGenericSensorApiAvailable()).toBe(true)
	})

	it('onDeviceMotion wires and unwires the devicemotion event', () => {
		const add = vi.fn()
		const remove = vi.fn()
		vi.stubGlobal('window', {
			DeviceMotionEvent: class {},
			addEventListener: add,
			removeEventListener: remove,
		})
		const cb = () => {}
		const off = onDeviceMotion(cb)
		expect(add).toHaveBeenCalledWith('devicemotion', cb)
		off()
		expect(remove).toHaveBeenCalledWith('devicemotion', cb)
	})

	it('onDeviceMotion returns a safe no-op remover when unavailable', () => {
		expect(() => onDeviceMotion(() => {})()).not.toThrow()
	})

	it('requestMotionPermission defaults to granted, or forwards the iOS prompt', async () => {
		expect(await requestMotionPermission()).toBe('granted')
		vi.stubGlobal('DeviceMotionEvent', {
			requestPermission: () => Promise.resolve('denied'),
		})
		expect(await requestMotionPermission()).toBe('denied')
	})
})
