import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isServiceWorkerAvailable } from '.'

describe('serviceworkers', () => {
	it('isServiceWorkerAvailable returns boolean', () => {
		expect(typeof isServiceWorkerAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
