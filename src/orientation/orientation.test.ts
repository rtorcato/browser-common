import { describe, expect, it } from 'vitest'
import { isDeviceOrientationAvailable } from '.'

describe('orientation', () => {
	it('isDeviceOrientationAvailable returns boolean', () => {
		expect(typeof isDeviceOrientationAvailable()).toBe('boolean')
	})
})
