// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getBrowserLanguage, getUserAgent } from '../common/index'

describe('common', () => {
	describe('in Web Worker (navigator present, no window)', () => {
		beforeEach(() => {
			// Mock a Web Worker environment: navigator exists, window doesn't, Node process doesn't
			vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Web Worker)', language: 'en-US' })
			vi.stubGlobal('window', undefined)
			vi.stubGlobal('globalThis', {
				navigator: { userAgent: 'Mozilla/5.0 (Web Worker)', language: 'en-US' },
				process: undefined,
			})
		})

		afterEach(() => {
			vi.unstubAllGlobals()
		})

		it('getUserAgent() returns the real user agent', () => {
			expect(getUserAgent()).toBe('Mozilla/5.0 (Web Worker)')
		})

		it('getBrowserLanguage() returns the real language', () => {
			expect(getBrowserLanguage()).toBe('en-US')
		})
	})
})
