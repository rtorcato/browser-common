import { describe, expect, it } from 'vitest'
import { isServiceWorkerAvailable } from '.'

describe('serviceworkers', () => {
	it('isServiceWorkerAvailable returns boolean', () => {
		expect(typeof isServiceWorkerAvailable()).toBe('boolean')
	})
})
