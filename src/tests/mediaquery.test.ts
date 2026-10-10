// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	isMediaQueryAvailable,
	matchesMedia,
	onMediaQueryChange,
	prefersDarkMode,
	prefersReducedMotion,
} from '../mediaquery/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubMatchMedia(matching: string[] = []) {
	const mql = { addEventListener: vi.fn(), removeEventListener: vi.fn() }
	const matchMedia = vi.fn((query: string) => ({ ...mql, matches: matching.includes(query) }))
	vi.stubGlobal('window', { matchMedia })
	return { matchMedia, mql }
}

describe('mediaquery', () => {
	it('isMediaQueryAvailable reflects window.matchMedia presence', () => {
		expect(isMediaQueryAvailable()).toBe(false)
		vi.stubGlobal('window', {})
		expect(isMediaQueryAvailable()).toBe(false)
		stubMatchMedia()
		expect(isMediaQueryAvailable()).toBe(true)
	})

	it('matchesMedia returns the query result', () => {
		const { matchMedia } = stubMatchMedia(['(min-width: 768px)'])
		expect(matchesMedia('(min-width: 768px)')).toBe(true)
		expect(matchesMedia('(max-width: 10px)')).toBe(false)
		expect(matchMedia).toHaveBeenCalledWith('(min-width: 768px)')
	})

	it('prefersDarkMode / prefersReducedMotion query the user preferences', () => {
		stubMatchMedia(['(prefers-color-scheme: dark)'])
		expect(prefersDarkMode()).toBe(true)
		expect(prefersReducedMotion()).toBe(false)
		stubMatchMedia(['(prefers-reduced-motion: reduce)'])
		expect(prefersDarkMode()).toBe(false)
		expect(prefersReducedMotion()).toBe(true)
	})

	it('returns null when matchMedia is unavailable', () => {
		expect(matchesMedia('(min-width: 768px)')).toBeNull()
		expect(prefersDarkMode()).toBeNull()
		expect(prefersReducedMotion()).toBeNull()
	})

	it('onMediaQueryChange passes matches and removes the same listener', () => {
		const { mql } = stubMatchMedia()
		const cb = vi.fn()
		const off = onMediaQueryChange('(min-width: 768px)', cb)

		expect(mql.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
		const handler = mql.addEventListener.mock.calls[0][1]
		handler({ matches: true })
		expect(cb).toHaveBeenCalledWith(true)

		off()
		expect(mql.removeEventListener).toHaveBeenCalledWith('change', handler)
	})

	it('onMediaQueryChange returns a safe no-op remover when unavailable', () => {
		expect(() => onMediaQueryChange('(min-width: 768px)', () => {})()).not.toThrow()
	})
})
