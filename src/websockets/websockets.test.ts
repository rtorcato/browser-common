import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isWebSocketSupported } from '.'

describe('websockets', () => {
	it('isWebSocketSupported returns boolean', () => {
		expect(typeof isWebSocketSupported()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
