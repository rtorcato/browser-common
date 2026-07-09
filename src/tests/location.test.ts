// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getCurrentLocation,
	getHash,
	getPathname,
	getSearch,
	redirectTo,
	reloadPage,
} from '../location/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('location (browser present)', () => {
	it('reads href / pathname / search / hash', () => {
		vi.stubGlobal('window', {
			location: {
				href: 'https://e.com/home?q=1#top',
				pathname: '/home',
				search: '?q=1',
				hash: '#top',
			},
		})
		expect(getCurrentLocation()).toBe('https://e.com/home?q=1#top')
		expect(getPathname()).toBe('/home')
		expect(getSearch()).toBe('?q=1')
		expect(getHash()).toBe('#top')
	})

	it('redirectTo assigns location.href; reloadPage calls reload', () => {
		const reload = vi.fn()
		const location = { href: 'https://e.com/', reload }
		vi.stubGlobal('window', { location })
		redirectTo('/login')
		expect(location.href).toBe('/login')
		reloadPage()
		expect(reload).toHaveBeenCalled()
	})
})

describe('location (SSR / no window)', () => {
	it('getters return undefined and mutators no-op', () => {
		expect(getCurrentLocation()).toBeUndefined()
		expect(getPathname()).toBeUndefined()
		expect(getSearch()).toBeUndefined()
		expect(getHash()).toBeUndefined()
		expect(() => {
			redirectTo('/x')
			reloadPage()
		}).not.toThrow()
	})
})
