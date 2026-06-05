import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isPrintAvailable } from '.'

describe('print', () => {
	it('isPrintAvailable returns boolean', () => {
		expect(typeof isPrintAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
