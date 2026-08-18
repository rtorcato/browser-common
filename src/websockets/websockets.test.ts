import { describe, expect, it } from 'vitest'
import { isWebSocketAvailable } from '.'

describe('websockets', () => {
	it('isWebSocketAvailable returns boolean', () => {
		expect(typeof isWebSocketAvailable()).toBe('boolean')
	})
})
