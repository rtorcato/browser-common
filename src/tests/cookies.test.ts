// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { deleteCookie, getAllCookies, getCookie, hasCookie, setCookie } from '../cookies/index'

// Node has no `document` — stub a minimal cookie jar that mirrors the bits of
// the `document.cookie` getter/setter contract this module depends on:
// the setter appends/overwrites one cookie; an `expires` in the past deletes.
function stubCookieJar() {
	const jar = new Map<string, string>()
	vi.stubGlobal('document', {
		get cookie() {
			return [...jar].map(([k, v]) => `${k}=${v}`).join('; ')
		},
		set cookie(str: string) {
			const [pair] = str.split(';')
			const eq = pair.indexOf('=')
			const key = pair.slice(0, eq).trim()
			const value = pair.slice(eq + 1).trim()
			const expires = str.match(/expires=([^;]+)/i)
			if (expires && new Date(expires[1]).getTime() < Date.now()) {
				jar.delete(key)
				return
			}
			jar.set(key, value)
		},
	})
}

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('cookies', () => {
	it('round-trips a value, URL-encoding special characters', () => {
		stubCookieJar()
		setCookie('theme', 'a b&c')
		expect(getCookie('theme')).toBe('a b&c')
		// stored form is encoded so it survives the cookie string grammar
		expect(document.cookie).toContain('theme=a%20b%26c')
	})

	it('getCookie returns null when the cookie is absent', () => {
		stubCookieJar()
		expect(getCookie('missing')).toBeNull()
	})

	it('hasCookie reflects presence', () => {
		stubCookieJar()
		expect(hasCookie('session')).toBe(false)
		setCookie('session', 'abc')
		expect(hasCookie('session')).toBe(true)
	})

	it('deleteCookie removes the cookie', () => {
		stubCookieJar()
		setCookie('token', 'xyz')
		deleteCookie('token')
		expect(getCookie('token')).toBeNull()
	})

	it('getAllCookies decodes every pair into an object', () => {
		stubCookieJar()
		setCookie('theme', 'dark')
		setCookie('lang', 'en')
		expect(getAllCookies()).toEqual({ theme: 'dark', lang: 'en' })
	})
})
