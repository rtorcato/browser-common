// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { isWebLocksAvailable, withLock } from '../weblocks/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('weblocks', () => {
	it('isWebLocksAvailable reflects navigator.locks presence', () => {
		expect(isWebLocksAvailable()).toBe(false)
		vi.stubGlobal('navigator', { locks: { request: () => {} } })
		expect(isWebLocksAvailable()).toBe(true)
	})

	it('withLock requests the named lock and returns the callback result', async () => {
		const request = vi.fn((_name: string, cb: () => Promise<unknown>) => cb())
		vi.stubGlobal('navigator', { locks: { request } })
		const result = await withLock('sync', async () => 'done')
		expect(request).toHaveBeenCalledWith('sync', expect.any(Function))
		expect(result).toBe('done')
	})

	it('withLock throws when the API is unsupported', async () => {
		await expect(withLock('x', async () => 1)).rejects.toThrow('not supported')
	})
})
