import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isBatteryApiAvailable } from '.'

describe('battery', () => {
	it('isBatteryApiAvailable returns boolean', () => {
		expect(typeof isBatteryApiAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
