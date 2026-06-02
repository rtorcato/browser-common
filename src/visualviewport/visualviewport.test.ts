import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isVisualViewportSupported } from '.'

describe('visualviewport', () => {
	it('isVisualViewportSupported returns boolean', () => {
		expect(typeof isVisualViewportSupported()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
