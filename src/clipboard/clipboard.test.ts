import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isClipboardApiAvailable } from '.'

describe('clipboard', () => {
	it('isClipboardApiAvailable returns boolean', () => {
		expect(typeof isClipboardApiAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
