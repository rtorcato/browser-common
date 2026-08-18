import { describe, expect, it } from 'vitest'
import { isPerformanceApiAvailable } from '.'

describe('performance', () => {
	it('isPerformanceApiAvailable returns boolean', () => {
		expect(typeof isPerformanceApiAvailable()).toBe('boolean')
	})
})
