import { describe, expect, it } from 'vitest'
import { isPrintAvailable } from '.'

describe('print', () => {
	it('isPrintAvailable returns boolean', () => {
		expect(typeof isPrintAvailable()).toBe('boolean')
	})
})
