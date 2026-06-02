import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isBackgroundSyncAvailable } from '.'

describe('backgroundtasks', () => {
	it('isBackgroundSyncAvailable returns boolean', () => {
		expect(typeof isBackgroundSyncAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
