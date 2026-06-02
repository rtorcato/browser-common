import { describe, expect, it } from 'vitest'
import * as mod from '.'
import { isFileSystemApiAvailable } from '.'

describe('filesystem', () => {
	it('isFileSystemApiAvailable returns boolean', () => {
		expect(typeof isFileSystemApiAvailable()).toBe('boolean')
	})

	it('all exports are functions', () => {
		for (const [_name, value] of Object.entries(mod)) {
			expect(typeof value).toBe('function')
		}
	})
})
