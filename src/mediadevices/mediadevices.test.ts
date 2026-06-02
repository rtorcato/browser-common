import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isMediaDevicesAvailable } from '.'

describe('mediadevices', () => {
	it('isMediaDevicesAvailable returns boolean', () => {
		expect(typeof isMediaDevicesAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
