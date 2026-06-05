import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isWebSocketAvailable } from '.'

describe('websockets', () => {
	it('isWebSocketAvailable returns boolean', () => {
		expect(typeof isWebSocketAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
