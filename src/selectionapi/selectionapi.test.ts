import { describe, expect, it } from 'vitest'
import { isSelectionApiAvailable } from '.'

describe('selectionapi', () => {
	it('isSelectionApiAvailable returns boolean', () => {
		expect(typeof isSelectionApiAvailable()).toBe('boolean')
	})
})
