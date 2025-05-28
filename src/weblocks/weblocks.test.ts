import { describe, expect, it, vi } from 'vitest'
import { isWebLocksSupported, withLock } from '.'

describe('weblocks', () => {
	it('should detect support for Web Locks API', () => {
		expect(typeof isWebLocksSupported()).toBe('boolean')
	})

	it('should throw if Web Locks API is not supported', async () => {
		const originalNavigator = globalThis.navigator
		// @ts-expect-error
		globalThis.navigator = undefined
		await expect(withLock('test', async () => 42)).rejects.toThrow('Web Locks API is not supported')
		globalThis.navigator = originalNavigator
	})

	it('should call callback if Web Locks API is supported', async () => {
		const callback = vi.fn(async () => 'result')
		const request = vi.fn((_name, cb) => cb())
		const fakeNavigator = { locks: { request } }
		const originalNavigator = globalThis.navigator
		// @ts-expect-error
		globalThis.navigator = fakeNavigator
		const result = await withLock('test', callback)
		expect(request).toHaveBeenCalledWith('test', expect.any(Function))
		expect(callback).toHaveBeenCalled()
		expect(result).toBe('result')
		globalThis.navigator = originalNavigator
	})
})
