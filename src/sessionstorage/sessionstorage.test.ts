import { describe, expect, it } from 'vitest'
import { isSessionStorageAvailable } from '.'

describe('sessionstorage', () => {
	it('isSessionStorageAvailable returns boolean', () => {
		expect(typeof isSessionStorageAvailable()).toBe('boolean')
	})
})
