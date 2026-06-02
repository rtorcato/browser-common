import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isLocalStorageAvailable } from '.'

describe('localstorage', () => {
	it('isLocalStorageAvailable returns boolean', () => {
		expect(typeof isLocalStorageAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
