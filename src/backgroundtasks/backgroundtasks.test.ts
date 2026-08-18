import { describe, expect, it } from 'vitest'
import { isBackgroundSyncAvailable } from '.'

describe('backgroundtasks', () => {
	it('isBackgroundSyncAvailable returns boolean', () => {
		expect(typeof isBackgroundSyncAvailable()).toBe('boolean')
	})
})
