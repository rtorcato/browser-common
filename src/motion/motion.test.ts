import { describe, expect, it } from 'vitest'
import { isDeviceMotionAvailable } from '.'

describe('motion', () => {
	it('isDeviceMotionAvailable returns boolean', () => {
		expect(typeof isDeviceMotionAvailable()).toBe('boolean')
	})
})
