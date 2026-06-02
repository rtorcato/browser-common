import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isWebLocksSupported } from '.'

describe('weblocks', () => {
	it('isWebLocksSupported returns boolean', () => {
		expect(typeof isWebLocksSupported()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
