import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isVisualViewportAvailable } from '.'

describe('visualviewport', () => {
	it('isVisualViewportAvailable returns boolean', () => {
		expect(typeof isVisualViewportAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
