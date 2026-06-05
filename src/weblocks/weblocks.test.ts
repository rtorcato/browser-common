import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isWebLocksAvailable } from '.'

describe('weblocks', () => {
	it('isWebLocksAvailable returns boolean', () => {
		expect(typeof isWebLocksAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
