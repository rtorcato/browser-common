import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isGeolocationAvailable } from '.'

describe('geolocation', () => {
	it('isGeolocationAvailable returns boolean', () => {
		expect(typeof isGeolocationAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
