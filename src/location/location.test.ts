import { describe, expect, it } from 'vitest'
import * as mod from '.'

describe('location', () => {
	it('module imports without throwing', () => {
		expect(mod).toBeDefined()
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
