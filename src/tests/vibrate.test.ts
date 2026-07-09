// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	isVibrationApiAvailable,
	stopVibration,
	vibrate,
	vibrateNotification,
	vibratePulse,
} from '../vibrate/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubVibrate(impl: (p: number | number[]) => boolean = () => true) {
	const fn = vi.fn(impl)
	vi.stubGlobal('window', { navigator: { vibrate: fn } })
	return fn
}

describe('vibrate', () => {
	it('isVibrationApiAvailable reflects navigator.vibrate presence', () => {
		expect(isVibrationApiAvailable()).toBe(false)
		stubVibrate()
		expect(isVibrationApiAvailable()).toBe(true)
	})

	it('vibrate forwards the pattern and returns the API result', () => {
		const fn = stubVibrate(() => true)
		expect(vibrate([200, 100, 200])).toBe(true)
		expect(fn).toHaveBeenCalledWith([200, 100, 200])
	})

	it('returns false without triggering when unsupported', () => {
		expect(vibrate(200)).toBe(false)
	})

	it('convenience helpers map to the right patterns', () => {
		const fn = stubVibrate()
		vibratePulse(300)
		expect(fn).toHaveBeenLastCalledWith(300)
		stopVibration()
		expect(fn).toHaveBeenLastCalledWith(0)
		vibrateNotification()
		expect(fn).toHaveBeenLastCalledWith([100, 50, 100])
	})
})
