import { describe, expect, it } from 'vitest'
import { isBatteryApiAvailable } from '.'

describe('battery', () => {
	it('isBatteryApiAvailable returns boolean', () => {
		expect(typeof isBatteryApiAvailable()).toBe('boolean')
	})
})
