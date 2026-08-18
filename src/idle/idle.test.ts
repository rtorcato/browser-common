import { describe, expect, it } from 'vitest'
import { isIdleDetectionApiAvailable } from '.'

describe('idle', () => {
	it('isIdleDetectionApiAvailable returns boolean', () => {
		expect(typeof isIdleDetectionApiAvailable()).toBe('boolean')
	})
})
