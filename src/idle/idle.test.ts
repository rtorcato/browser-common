import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isIdleDetectionApiAvailable } from '.'

describe('idle', () => {
	it('isIdleDetectionApiAvailable returns boolean', () => {
		expect(typeof isIdleDetectionApiAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
