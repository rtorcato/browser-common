import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isServiceWorkerSupported } from '.'

describe('serviceworkers', () => {
	it('isServiceWorkerSupported returns boolean', () => {
		expect(typeof isServiceWorkerSupported()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
