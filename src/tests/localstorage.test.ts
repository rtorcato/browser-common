// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	clearLocalStorage,
	getLocalStorage,
	isLocalStorageAvailable,
	removeLocalStorage,
	setLocalStorage,
} from '../localstorage/index'

// Node has no Web Storage — stub `window.localStorage` with a Map-backed
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

describe('localstorage (browser present)', () => {
	it('round-trips a JSON value', () => {
		vi.stubGlobal('window', { localStorage: fakeStorage() })
		setLocalStorage('prefs', { theme: 'dark' })
		expect(getLocalStorage('prefs')).toEqual({ theme: 'dark' })
	})

	it('returns null for a missing key', () => {
		vi.stubGlobal('window', { localStorage: fakeStorage() })
		expect(getLocalStorage('nope')).toBeNull()
	})

	it('falls back to the raw string when the stored value is not JSON', () => {
		const storage = fakeStorage()
		vi.stubGlobal('window', { localStorage: storage })
		storage.setItem('raw', 'not-json')
		expect(getLocalStorage('raw')).toBe('not-json')
	})

	it('remove deletes a single key; clear empties everything', () => {
		vi.stubGlobal('window', { localStorage: fakeStorage() })
		setLocalStorage('a', 1)
		setLocalStorage('b', 2)
		removeLocalStorage('a')
		expect(getLocalStorage('a')).toBeNull()
		expect(getLocalStorage('b')).toBe(2)
		clearLocalStorage()
		expect(getLocalStorage('b')).toBeNull()
	})

	it('isLocalStorageAvailable is true when storage works, false when it throws', () => {
		vi.stubGlobal('window', { localStorage: fakeStorage() })
		expect(isLocalStorageAvailable()).toBe(true)
		vi.stubGlobal('window', {
			localStorage: {
				setItem: () => {
					throw new Error('quota')
				},
				removeItem: () => {},
			},
		})
		expect(isLocalStorageAvailable()).toBe(false)
	})
})

describe('localstorage (SSR / no window)', () => {
	it('reports unavailable and no-ops without throwing', () => {
		expect(isLocalStorageAvailable()).toBe(false)
		expect(getLocalStorage('x')).toBeNull()
		expect(() => setLocalStorage('x', 1)).not.toThrow()
		expect(() => removeLocalStorage('x')).not.toThrow()
		expect(() => clearLocalStorage()).not.toThrow()
	})
})
