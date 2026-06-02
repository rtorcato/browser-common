import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isNotificationSupported } from '.'

describe('notifications', () => {
	it('isNotificationSupported returns boolean', () => {
		expect(typeof isNotificationSupported()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
