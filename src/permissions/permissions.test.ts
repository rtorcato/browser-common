import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isPermissionsApiAvailable } from '.'

describe('permissions', () => {
	it('isPermissionsApiAvailable returns boolean', () => {
		expect(typeof isPermissionsApiAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
