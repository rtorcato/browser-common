import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isSelectionApiAvailable } from '.'

describe('selectionapi', () => {
	it('isSelectionApiAvailable returns boolean', () => {
		expect(typeof isSelectionApiAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
