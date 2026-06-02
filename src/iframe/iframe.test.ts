import { describe, expect, it } from 'vitest'
import * as mod from '.'

describe('iframe', () => {
	it('module imports without throwing', () => {
		expect(mod).toBeDefined()
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
