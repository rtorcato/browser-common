import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isNotificationAvailable } from '.'

describe('notifications', () => {
	it('isNotificationAvailable returns boolean', () => {
		expect(typeof isNotificationAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
