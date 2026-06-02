import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isPerformanceApiAvailable } from '.'

describe('performance', () => {
	it('isPerformanceApiAvailable returns boolean', () => {
		expect(typeof isPerformanceApiAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
