import { describe, expect, it } from 'vitest'
import { isVibrationApiAvailable } from '.'

describe('vibrate', () => {
	it('isVibrationApiAvailable returns boolean', () => {
		expect(typeof isVibrationApiAvailable()).toBe('boolean')
	})
})
