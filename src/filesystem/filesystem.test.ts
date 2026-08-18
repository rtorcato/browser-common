import { describe, expect, it } from 'vitest'
import { isFileSystemApiAvailable } from '.'

describe('filesystem', () => {
	it('isFileSystemApiAvailable returns boolean', () => {
		expect(typeof isFileSystemApiAvailable()).toBe('boolean')
	})
})
