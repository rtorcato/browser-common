import { describe, expect, it, vi } from 'vitest'
import { getVisualViewportInfo, isVisualViewportSupported, onVisualViewportChange } from '.'

describe('visualviewport', () => {
	it('should detect support (runs in browser only)', () => {
		// This will be true in browsers that support the API
		expect(typeof isVisualViewportSupported()).toBe('boolean')
	})

	it('should return null or info for getVisualViewportInfo', () => {
		const info = getVisualViewportInfo()
		if (isVisualViewportSupported()) {
			expect(info).not.toBeNull()
			if (info) {
				expect(typeof info.width).toBe('number')
				expect(typeof info.height).toBe('number')
				expect(typeof info.scale).toBe('number')
			}
		} else {
			expect(info).toBeNull()
		}
	})

	it('should add and remove listeners without error', () => {
		const cb = vi.fn()
		const unsubscribe = onVisualViewportChange(cb)
		expect(typeof unsubscribe).toBe('function')
		unsubscribe()
	})
})
