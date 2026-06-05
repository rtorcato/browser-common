import { describe, expect, it, vi } from 'vitest'
import { isFileShareAvailable, isWebShareAvailable, share } from '.'

const setNavigator = (value: unknown) => {
	Object.defineProperty(globalThis, 'navigator', {
		value,
		configurable: true,
		writable: true,
	})
}

describe('webshare', () => {
	it('should detect support for Web Share API', () => {
		expect(typeof isWebShareAvailable()).toBe('boolean')
	})

	it('should detect support for file sharing', () => {
		expect(typeof isFileShareAvailable()).toBe('boolean')
	})

	it('should throw if Web Share API is not supported', async () => {
		const originalNavigator = globalThis.navigator
		setNavigator(undefined)
		await expect(share({ title: 'Test' })).rejects.toThrow('Web Share API is not supported')
		setNavigator(originalNavigator)
	})

	it('should call navigator.share if supported', async () => {
		const shareMock = vi.fn().mockResolvedValue(undefined)
		const fakeNavigator = { share: shareMock }
		const originalNavigator = globalThis.navigator
		setNavigator(fakeNavigator)
		await share({ title: 'Test', text: 'Hello' })
		expect(shareMock).toHaveBeenCalledWith({ title: 'Test', text: 'Hello' })
		setNavigator(originalNavigator)
	})

	it('should detect file share support if canShare exists', () => {
		const fakeNavigator = {
			canShare: vi.fn(() => true),
			share: vi.fn(),
		}
		const originalNavigator = globalThis.navigator
		setNavigator(fakeNavigator)
		expect(isFileShareAvailable()).toBe(true)
		setNavigator(originalNavigator)
	})
})
