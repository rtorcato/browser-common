// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { isFileShareAvailable, isWebShareAvailable, share } from '../webshare/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('webshare', () => {
	it('isWebShareAvailable reflects navigator.share presence', () => {
		expect(isWebShareAvailable()).toBe(false)
		vi.stubGlobal('navigator', { share: () => Promise.resolve() })
		expect(isWebShareAvailable()).toBe(true)
	})

	it('share delegates to navigator.share with the given data', async () => {
		const shareFn = vi.fn().mockResolvedValue(undefined)
		vi.stubGlobal('navigator', { share: shareFn })
		const data = { title: 'Look', url: 'https://example.com' }
		await share(data)
		expect(shareFn).toHaveBeenCalledWith(data)
	})

	it('share rejects when unsupported', async () => {
		await expect(share({ title: 'x' })).rejects.toThrow('not supported')
	})

	it('isFileShareAvailable requires canShare to accept files', () => {
		vi.stubGlobal('navigator', { share: () => {}, canShare: () => true })
		expect(isFileShareAvailable()).toBe(true)
		vi.stubGlobal('navigator', { share: () => {}, canShare: () => false })
		expect(isFileShareAvailable()).toBe(false)
	})
})
