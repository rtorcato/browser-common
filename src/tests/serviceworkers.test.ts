// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getServiceWorkerRegistration,
	isServiceWorkerAvailable,
	postMessageToServiceWorker,
	registerServiceWorker,
	unregisterAllServiceWorkers,
} from '../serviceworkers/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('serviceworkers', () => {
	it('isServiceWorkerAvailable reflects navigator.serviceWorker presence', () => {
		expect(isServiceWorkerAvailable()).toBe(false)
		vi.stubGlobal('navigator', { serviceWorker: {} })
		expect(isServiceWorkerAvailable()).toBe(true)
	})

	it('registerServiceWorker returns the registration', async () => {
		const reg = { scope: '/' }
		const register = vi.fn().mockResolvedValue(reg)
		vi.stubGlobal('navigator', { serviceWorker: { register } })
		expect(await registerServiceWorker('/sw.js', { scope: '/' })).toBe(reg)
		expect(register).toHaveBeenCalledWith('/sw.js', { scope: '/' })
	})

	it('registerServiceWorker swallows failures and returns undefined', async () => {
		vi.stubGlobal('navigator', {
			serviceWorker: { register: () => Promise.reject(new Error('boom')) },
		})
		expect(await registerServiceWorker('/sw.js')).toBeUndefined()
	})

	it('registerServiceWorker returns undefined when unsupported', async () => {
		expect(await registerServiceWorker('/sw.js')).toBeUndefined()
	})

	it('unregisterAllServiceWorkers unregisters every registration', async () => {
		const a = { unregister: vi.fn().mockResolvedValue(true) }
		const b = { unregister: vi.fn().mockResolvedValue(true) }
		vi.stubGlobal('navigator', {
			serviceWorker: { getRegistrations: vi.fn().mockResolvedValue([a, b]) },
		})
		expect(await unregisterAllServiceWorkers()).toBe(true)
		expect(a.unregister).toHaveBeenCalled()
		expect(b.unregister).toHaveBeenCalled()
	})

	it('getServiceWorkerRegistration returns the active registration', async () => {
		const reg = { scope: '/' }
		vi.stubGlobal('navigator', {
			serviceWorker: { getRegistration: vi.fn().mockResolvedValue(reg) },
		})
		expect(await getServiceWorkerRegistration()).toBe(reg)
	})

	it('postMessageToServiceWorker posts via the active controller', () => {
		const postMessage = vi.fn()
		vi.stubGlobal('navigator', { serviceWorker: { controller: { postMessage } } })
		postMessageToServiceWorker({ type: 'skipWaiting' })
		expect(postMessage).toHaveBeenCalledWith({ type: 'skipWaiting' })
	})
})
