import { describe, expect, it } from 'vitest'
import { isVisualViewportAvailable } from '.'

describe('visualviewport', () => {
	it('isVisualViewportAvailable returns boolean', () => {
		expect(typeof isVisualViewportAvailable()).toBe('boolean')
	})
})
