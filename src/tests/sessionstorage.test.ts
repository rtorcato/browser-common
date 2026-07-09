// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	clearSessionStorage,
	getSessionStorage,
	isSessionStorageAvailable,
	removeSessionStorage,
	setSessionStorage,
} from '../sessionstorage/index'

// Node has no Web Storage — stub `window.sessionStorage` with a Map-backed
// fake that mirrors the string-only Storage contract the module relies on.
function fakeStorage() {
	const m = new Map<string, string>()
	return {
		getItem: (k: string) => (m.has(k) ? (m.get(k) as string) : null),
		setItem: (k: string, v: string) => {
			m.set(k, String(v))
		},
		removeItem: (k: string) => {
			m.delete(k)
		},
		clear: () => {
			m.clear()
		},
	}
}

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('sessionstorage (browser present)', () => {
	it('round-trips a JSON value', () => {
		vi.stubGlobal('window', { sessionStorage: fakeStorage() })
		setSessionStorage('cart', { items: 3 })
		expect(getSessionStorage('cart')).toEqual({ items: 3 })
	})

	it('returns null for a missing key', () => {
		vi.stubGlobal('window', { sessionStorage: fakeStorage() })
		expect(getSessionStorage('nope')).toBeNull()
	})

	it('falls back to the raw string when the stored value is not JSON', () => {
		const storage = fakeStorage()
		vi.stubGlobal('window', { sessionStorage: storage })
		storage.setItem('raw', 'not-json')
		expect(getSessionStorage('raw')).toBe('not-json')
	})

	it('remove deletes a single key; clear empties everything', () => {
		vi.stubGlobal('window', { sessionStorage: fakeStorage() })
		setSessionStorage('a', 1)
		setSessionStorage('b', 2)
		removeSessionStorage('a')
		expect(getSessionStorage('a')).toBeNull()
		expect(getSessionStorage('b')).toBe(2)
		clearSessionStorage()
		expect(getSessionStorage('b')).toBeNull()
	})

	it('isSessionStorageAvailable is true when storage works, false when it throws', () => {
		vi.stubGlobal('window', { sessionStorage: fakeStorage() })
		expect(isSessionStorageAvailable()).toBe(true)
		vi.stubGlobal('window', {
			sessionStorage: {
				setItem: () => {
					throw new Error('quota')
				},
				removeItem: () => {},
			},
		})
		expect(isSessionStorageAvailable()).toBe(false)
	})
})

describe('sessionstorage (SSR / no window)', () => {
	it('reports unavailable and no-ops without throwing', () => {
		expect(isSessionStorageAvailable()).toBe(false)
		expect(getSessionStorage('x')).toBeNull()
		expect(() => setSessionStorage('x', 1)).not.toThrow()
		expect(() => removeSessionStorage('x')).not.toThrow()
		expect(() => clearSessionStorage()).not.toThrow()
	})
})
