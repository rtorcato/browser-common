import { describe, expect, it } from 'vitest'
import { isPermissionsApiAvailable } from '.'

describe('permissions', () => {
	it('isPermissionsApiAvailable returns boolean', () => {
		expect(typeof isPermissionsApiAvailable()).toBe('boolean')
	})
})
