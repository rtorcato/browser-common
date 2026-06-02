import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isSessionStorageAvailable } from '.'

describe('sessionstorage', () => {
	it('isSessionStorageAvailable returns boolean', () => {
		expect(typeof isSessionStorageAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
