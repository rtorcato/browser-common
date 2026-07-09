// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	isBackgroundFetchAvailable,
	isBackgroundSyncAvailable,
	registerBackgroundFetch,
	registerBackgroundSync,
} from '../backgroundtasks/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('backgroundtasks availability guards', () => {
	it('reflect the presence of SyncManager / BackgroundFetchManager on self', () => {
		expect(isBackgroundSyncAvailable()).toBe(false)
		expect(isBackgroundFetchAvailable()).toBe(false)
		vi.stubGlobal('self', { SyncManager: class {}, BackgroundFetchManager: class {} })
		expect(isBackgroundSyncAvailable()).toBe(true)
		expect(isBackgroundFetchAvailable()).toBe(true)
	})
})

describe('registerBackgroundSync', () => {
	it('registers the tag via the ready service worker when supported', async () => {
		const register = vi.fn().mockResolvedValue(undefined)
		vi.stubGlobal('self', { SyncManager: class {} })
		vi.stubGlobal('navigator', {
			serviceWorker: { ready: Promise.resolve({ sync: { register } }) },
		})
		await registerBackgroundSync('sync-outbox')
		expect(register).toHaveBeenCalledWith('sync-outbox')
	})

	it('no-ops when the API is unavailable', async () => {
		vi.stubGlobal('navigator', {})
		await expect(registerBackgroundSync('x')).resolves.toBeUndefined()
	})
})

describe('registerBackgroundFetch', () => {
	it('fetches via the ready service worker and returns the registration', async () => {
		const registration = { id: 'media' }
		const fetch = vi.fn().mockResolvedValue(registration)
		vi.stubGlobal('self', { BackgroundFetchManager: class {} })
		vi.stubGlobal('navigator', {
			serviceWorker: { ready: Promise.resolve({ backgroundFetch: { fetch } }) },
		})
		const result = await registerBackgroundFetch('media', ['/video.mp4'], { title: 'Video' })
		expect(fetch).toHaveBeenCalledWith('media', ['/video.mp4'], { title: 'Video' })
		expect(result).toBe(registration)
	})

	it('returns undefined when the API is unavailable', async () => {
		vi.stubGlobal('navigator', {})
		await expect(registerBackgroundFetch('x', ['/a'])).resolves.toBeUndefined()
	})
})
