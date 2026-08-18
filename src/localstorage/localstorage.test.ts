import { describe, expect, it } from 'vitest'
import { isLocalStorageAvailable } from '.'

describe('localstorage', () => {
	it('isLocalStorageAvailable returns boolean', () => {
		expect(typeof isLocalStorageAvailable()).toBe('boolean')
	})
})
