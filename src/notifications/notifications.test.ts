import { describe, expect, it } from 'vitest'
import { isNotificationAvailable } from '.'

describe('notifications', () => {
	it('isNotificationAvailable returns boolean', () => {
		expect(typeof isNotificationAvailable()).toBe('boolean')
	})
})
