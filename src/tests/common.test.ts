// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('common (Web Worker environment)', () => {
	beforeEach(async () => {
		// Mock a Web Worker environment: navigator exists, window doesn't, process doesn't
		vi.stubGlobal('process', undefined)
		vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Web Worker)', language: 'en-US' })
		vi.stubGlobal('window', undefined)
	})

	afterEach(async () => {
		vi.unstubAllGlobals()
		// Reset module cache so the next test gets a fresh import
		vi.resetModules()
	})

	it('getUserAgent() and getBrowserLanguage() work with navigator in Web Worker', async () => {
		// Re-import after stubbing to get fresh module state
		const { getUserAgent, getBrowserLanguage } = await import('../common/index')
		expect(getUserAgent()).toBe('Mozilla/5.0 (Web Worker)')
		expect(getBrowserLanguage()).toBe('en-US')
	})
})
