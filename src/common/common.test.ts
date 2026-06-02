import { describe, expect, it } from 'vitest'
import { getBrowserLanguage, getUserAgent, isBrowser, isMobile } from '.'

describe('common', () => {
	it('isBrowser is a boolean', () => {
		expect(typeof isBrowser).toBe('boolean')
	})

	it('isMobile returns boolean', () => {
		expect(typeof isMobile()).toBe('boolean')
	})

	it('getUserAgent and getBrowserLanguage return strings or undefined', () => {
		expect(['string', 'undefined']).toContain(typeof getUserAgent())
		expect(['string', 'undefined']).toContain(typeof getBrowserLanguage())
	})
})
