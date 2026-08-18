import { describe, expect, it } from 'vitest'
import { isWebLocksAvailable } from '.'

describe('weblocks', () => {
	it('isWebLocksAvailable returns boolean', () => {
		expect(typeof isWebLocksAvailable()).toBe('boolean')
	})
})
