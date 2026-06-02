import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isVibrationApiAvailable } from '.'

describe('vibrate', () => {
	it('isVibrationApiAvailable returns boolean', () => {
		expect(typeof isVibrationApiAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
