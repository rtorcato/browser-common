import { describe, expect, it, vi } from 'vitest'
import { isFileShareSupported, isWebShareSupported, share } from '.'

describe('webshare', () => {
	it('should detect support for Web Share API', () => {
		expect(typeof isWebShareSupported()).toBe('boolean')
	})

	it('should detect support for file sharing', () => {
		expect(typeof isFileShareSupported()).toBe('boolean')
	})

	it('should throw if Web Share API is not supported', async () => {
		const originalNavigator = globalThis.navigator
		// @ts-expect-error
		globalThis.navigator = undefined
		await expect(share({ title: 'Test' })).rejects.toThrow('Web Share API is not supported')
		globalThis.navigator = originalNavigator
	})

	it('should call navigator.share if supported', async () => {
		const shareMock = vi.fn().mockResolvedValue(undefined)
		const fakeNavigator = { share: shareMock }
		const originalNavigator = globalThis.navigator
		// @ts-expect-error
		globalThis.navigator = fakeNavigator
		await share({ title: 'Test', text: 'Hello' })
		expect(shareMock).toHaveBeenCalledWith({ title: 'Test', text: 'Hello' })
		globalThis.navigator = originalNavigator
	})

	it('should detect file share support if canShare exists', () => {
		const fakeNavigator = {
			canShare: vi.fn(() => true),
			share: vi.fn(),
		}
		const originalNavigator = globalThis.navigator
		// @ts-expect-error
		globalThis.navigator = fakeNavigator
		expect(isFileShareSupported()).toBe(true)
		globalThis.navigator = originalNavigator
	})
})
